'use strict';
/* API voor accounts en versleutelde opslag.
 *
 * Wat de server NIET heeft: wachtwoorden, gebruikersnamen, e-mailadressen, IP-adressen en de inhoud van
 * berekeningen. Wat er wel in de database staat:
 *   users     een willekeurig id, HMAC van de gebruikersnaam, Argon2id-hash van de inlogwaarde, de ingepakte
 *             datasleutel (alleen te openen met het wachtwoord of de herstelcode) en het TOTP-geheim (versleuteld)
 *   items     versleutelde blokken; de server weet niet eens van welke rekenhulp ze zijn
 *   sessions  SHA-256 van het sessie-token
 * Het databasebestand zelf is daarbovenop versleuteld met SQLCipher (DB_KEY).
 * Het protocol aan de browserkant staat in shared/account.js.
 */
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const Database = require('better-sqlite3-multiple-ciphers');
const QRCode = require('qrcode');

const DAG = 86400e3;
const SESSIE_MS = 30 * DAG;
const COOKIE = '__Host-kw';
const MAX_BODY = 64 * 1024, MAX_BLOB = 24 * 1024, MAX_ITEMS = 200;
const KDF_ITER = 600000; // moet gelijk zijn aan shared/account.js
const B32 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';

class Fout extends Error { constructor(status, code, extra) { super(code); this.status = status; this.code = code; this.extra = extra; } }
const base32 = (buf) => { let bits = 0, val = 0, out = ''; for (const b of buf) { val = (val << 8) | b; bits += 8; while (bits >= 5) { out += B32[(val >>> (bits - 5)) & 31]; bits -= 5; } } return bits ? out + B32[(val << (5 - bits)) & 31] : out; };
const isB64 = (s, min, max) => typeof s === 'string' && s.length >= min && s.length <= max && /^[A-Za-z0-9_-]+$/.test(s);
const gelijk = (a, b) => a.length === b.length && crypto.timingSafeEqual(a, b);

/** TOTP volgens RFC 6238 (SHA-1, 6 cijfers, 30 seconden): wat authenticator-apps verwachten. */
function totp(geheim, stap) {
  const teller = Buffer.alloc(8); teller.writeBigUInt64BE(BigInt(stap));
  const h = crypto.createHmac('sha1', geheim).update(teller).digest(), o = h[19] & 15;
  return String((h.readUInt32BE(o) & 0x7fffffff) % 1e6).padStart(6, '0');
}

function maakApp({ dbPad, dbSleutel, geheim, nu = () => Date.now(), argon = { memory: 19456, passes: 2 }, log = () => {}, limietFactor = 1 }) {
  if (!/^[0-9a-f]{64}$/i.test(dbSleutel || '')) throw new Error('DB_KEY moet 64 hex-tekens zijn');
  if (!geheim || geheim.length < 32) throw new Error('SERVER_SECRET ontbreekt of is te kort');

  // ---------- database ----------
  const db = new Database(dbPad);
  db.pragma("cipher='sqlcipher'"); db.pragma('legacy=4');
  db.pragma(`key="x'${dbSleutel}'"`);
  db.pragma('journal_mode = WAL'); db.pragma('foreign_keys = ON'); db.pragma('secure_delete = ON');
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY, user_hash BLOB NOT NULL UNIQUE, salt TEXT NOT NULL, auth_hash TEXT NOT NULL,
      wrapped_key TEXT NOT NULL, rec_auth_hash BLOB NOT NULL, rec_wrapped_key TEXT NOT NULL,
      totp_secret BLOB, totp_aan INTEGER NOT NULL DEFAULT 0, totp_stap INTEGER NOT NULL DEFAULT 0,
      mislukt INTEGER NOT NULL DEFAULT 0, op_slot_tot INTEGER NOT NULL DEFAULT 0, aangemaakt INTEGER NOT NULL
    ) STRICT;
    CREATE TABLE IF NOT EXISTS sessions (token_hash BLOB PRIMARY KEY, user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE, verloopt INTEGER NOT NULL) STRICT;
    CREATE TABLE IF NOT EXISTS items (id TEXT NOT NULL, user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE, blob TEXT NOT NULL, PRIMARY KEY (user_id, id)) STRICT;
    CREATE TABLE IF NOT EXISTS backup_codes (user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE, code_hash BLOB NOT NULL, PRIMARY KEY (user_id, code_hash)) STRICT;
    CREATE TABLE IF NOT EXISTS invites (code_hash BLOB PRIMARY KEY, over INTEGER NOT NULL) STRICT;
  `);
  const q = (sql) => db.prepare(sql);

  // ---------- sleutels van de server ----------
  const sub = (info) => Buffer.from(crypto.hkdfSync('sha256', geheim, Buffer.alloc(0), info, 32));
  const peper = sub('kleinewebsites/peper'), totpSleutel = sub('kleinewebsites/totp'), nepSleutel = sub('kleinewebsites/nepzout');
  const hmac = (tekst) => crypto.createHmac('sha256', peper).update(tekst).digest();
  const gebruikerHash = (naam) => hmac('gebruiker:' + String(naam).trim().toLowerCase());
  const sha = (buf) => crypto.createHash('sha256').update(buf).digest();

  // Argon2id over de inlogwaarde uit de browser. Die waarde is zelf al een afgeleide van het wachtwoord.
  const argon2 = (bericht, nonce) => new Promise((ok, fout) => crypto.argon2('argon2id',
    { message: bericht, nonce, parallelism: 1, tagLength: 32, memory: argon.memory, passes: argon.passes }, (e, uit) => (e ? fout(e) : ok(Buffer.from(uit)))));
  async function hashAuth(authKey) {
    const nonce = crypto.randomBytes(16);
    return ['argon2id', argon.memory, argon.passes, nonce.toString('base64url'), (await argon2(Buffer.from(authKey, 'base64url'), nonce)).toString('base64url')].join('$');
  }
  async function klopt(authKey, opgeslagen) {
    const [, m, t, nonce, hash] = opgeslagen.split('$');
    const uit = await new Promise((ok, fout) => crypto.argon2('argon2id', { message: Buffer.from(authKey, 'base64url'), nonce: Buffer.from(nonce, 'base64url'), parallelism: 1, tagLength: 32, memory: +m, passes: +t }, (e, r) => (e ? fout(e) : ok(Buffer.from(r)))));
    return gelijk(uit, Buffer.from(hash, 'base64url'));
  }
  let nepHash; // voor onbekende gebruikers: even lang rekenen, zodat de tijd niets verraadt

  const slotTotp = (geheimBytes) => { const iv = crypto.randomBytes(12), c = crypto.createCipheriv('aes-256-gcm', totpSleutel, iv); const ct = Buffer.concat([c.update(geheimBytes), c.final()]); return Buffer.concat([iv, c.getAuthTag(), ct]); };
  const openTotp = (b) => { const d = crypto.createDecipheriv('aes-256-gcm', totpSleutel, b.subarray(0, 12)); d.setAuthTag(b.subarray(12, 28)); return Buffer.concat([d.update(b.subarray(28)), d.final()]); };

  // ---------- begrenzen ----------
  // In het geheugen en alleen om te tellen: adressen worden nergens opgeslagen of gelogd.
  const tellers = new Map();
  function rem(soort, sleutel, max, ms) {
    const k = soort + ':' + sleutel, t = nu(); let e = tellers.get(k);
    if (!e || e.tot < t) { e = { n: 0, tot: t + ms }; tellers.set(k, e); }
    if (++e.n > max * limietFactor) throw new Fout(429, 'te_vaak', { wachtSeconden: Math.ceil((e.tot - t) / 1000) });
  }
  const opruimen = () => { const t = nu(); for (const [k, e] of tellers) if (e.tot < t) tellers.delete(k); q('DELETE FROM sessions WHERE verloopt < ?').run(t); };

  /** Mislukte poging op een account: vanaf de 5e steeds langer op slot (30 s, 1 min, … tot 15 min). */
  function mislukt(u) {
    const n = u.mislukt + 1, slot = n >= 5 ? nu() + Math.min(15 * 60e3, 30e3 * 2 ** (n - 5)) : 0;
    q('UPDATE users SET mislukt = ?, op_slot_tot = ? WHERE id = ?').run(n, slot, u.id);
  }
  const gelukt = (u) => { if (u.mislukt) q('UPDATE users SET mislukt = 0, op_slot_tot = 0 WHERE id = ?').run(u.id); };
  function nietOpSlot(u) { if (u.op_slot_tot > nu()) throw new Fout(429, 'op_slot', { wachtSeconden: Math.ceil((u.op_slot_tot - nu()) / 1000) }); }

  // ---------- sessies ----------
  function nieuweSessie(res, userId) {
    const token = crypto.randomBytes(32);
    q('INSERT INTO sessions (token_hash, user_id, verloopt) VALUES (?, ?, ?)').run(sha(token), userId, nu() + SESSIE_MS);
    res.setHeader('Set-Cookie', `${COOKIE}=${token.toString('base64url')}; Path=/; Max-Age=${SESSIE_MS / 1000}; HttpOnly; Secure; SameSite=Strict`);
  }
  const wisCookie = (res) => res.setHeader('Set-Cookie', `${COOKIE}=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Strict`);
  function tokenUit(req) {
    const m = (req.headers.cookie || '').match(new RegExp('(?:^|;\\s*)' + COOKIE + '=([A-Za-z0-9_-]{20,})'));
    return m ? Buffer.from(m[1], 'base64url') : null;
  }
  function ingelogd(req) {
    const token = tokenUit(req); if (!token) throw new Fout(401, 'niet_ingelogd');
    const s = q('SELECT user_id, verloopt FROM sessions WHERE token_hash = ?').get(sha(token));
    if (!s || s.verloopt < nu()) throw new Fout(401, 'niet_ingelogd');
    return q('SELECT * FROM users WHERE id = ?').get(s.user_id);
  }

  // ---------- twee-factor ----------
  /** Klopt de code? Accepteert de vorige/volgende 30 seconden, en elke code maar één keer. */
  function totpKlopt(u, code) {
    if (!/^\d{6}$/.test(code)) return false;
    const geheimBytes = openTotp(u.totp_secret), stap = Math.floor(nu() / 30e3);
    for (const s of [stap, stap - 1, stap + 1]) {
      if (s > u.totp_stap && gelijk(Buffer.from(totp(geheimBytes, s)), Buffer.from(code))) {
        q('UPDATE users SET totp_stap = ? WHERE id = ?').run(s, u.id); return true;
      }
    }
    return false;
  }
  /** Authenticator-code of een eenmalige reservecode. */
  function tweedeFactor(u, code) {
    code = String(code || '').trim();
    if (totpKlopt(u, code)) return true;
    const h = hmac('reserve:' + code.toUpperCase().replace(/[^A-Z2-7]/g, ''));
    return q('DELETE FROM backup_codes WHERE user_id = ? AND code_hash = ?').run(u.id, h).changes === 1;
  }

  /** Voor gevoelige handelingen: opnieuw de inlogwaarde uit het wachtwoord. */
  async function bevestig(u, authKey) {
    if (!isB64(authKey, 40, 50)) throw new Fout(400, 'ongeldig');
    nietOpSlot(u);
    if (!(await klopt(authKey, u.auth_hash))) { mislukt(u); throw new Fout(403, 'wachtwoord_fout'); }
    gelukt(u);
  }

  const accountVelden = (b) => isB64(b.salt, 16, 32) && isB64(b.authKey, 40, 50) && isB64(b.wrappedKey, 70, 100);

  // ---------- routes ----------
  const routes = {
    'GET /health': async () => ({ ok: true }),

    // Het zout is nodig om in de browser de sleutel af te leiden. Onbekende namen krijgen een vast nep-zout,
    // zodat je hiermee niet kunt nagaan welke namen bestaan.
    'POST /prelogin': async (req, b) => {
      rem('pre', req.adres, 60, 5 * 60e3);
      if (typeof b.username !== 'string') throw new Fout(400, 'ongeldig');
      const h = gebruikerHash(b.username), u = q('SELECT salt FROM users WHERE user_hash = ?').get(h);
      return { salt: u ? u.salt : crypto.createHmac('sha256', nepSleutel).update(h).digest().subarray(0, 16).toString('base64url'), iter: KDF_ITER };
    },

    'POST /register': async (req, b, res) => {
      rem('reg', req.adres, 10, 60 * 60e3);
      if (typeof b.username !== 'string' || !/^[^\s].{1,38}[^\s]$/.test(b.username.trim())) throw new Fout(400, 'naam_ongeldig');
      if (!accountVelden(b) || !isB64(b.recAuth, 40, 50) || !isB64(b.recWrappedKey, 70, 100)) throw new Fout(400, 'ongeldig');
      const code = hmac('uitnodiging:' + String(b.invite || '').trim().toUpperCase().replace(/[^A-Z2-7]/g, ''));
      const authHash = await hashAuth(b.authKey), id = crypto.randomUUID();
      db.transaction(() => {
        // Eerst de uitnodiging, zodat je zonder geldige code niet kunt aftasten welke namen bezet zijn.
        if (q('UPDATE invites SET over = over - 1 WHERE code_hash = ? AND over > 0').run(code).changes !== 1) throw new Fout(403, 'uitnodiging_ongeldig');
        if (q('SELECT 1 FROM users WHERE user_hash = ?').get(gebruikerHash(b.username))) throw new Fout(409, 'naam_bezet');
        q(`INSERT INTO users (id, user_hash, salt, auth_hash, wrapped_key, rec_auth_hash, rec_wrapped_key, aangemaakt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`)
          .run(id, gebruikerHash(b.username), b.salt, authHash, b.wrappedKey, hmac('herstel:' + b.recAuth), b.recWrappedKey, Math.floor(nu() / DAG) * DAG);
        q('DELETE FROM invites WHERE over <= 0').run();
      })();
      nieuweSessie(res, id);
      return { ok: true };
    },

    'POST /login': async (req, b, res) => {
      rem('login', req.adres, 30, 5 * 60e3);
      if (typeof b.username !== 'string' || !isB64(b.authKey, 40, 50)) throw new Fout(400, 'ongeldig');
      const u = q('SELECT * FROM users WHERE user_hash = ?').get(gebruikerHash(b.username));
      if (!u) { nepHash = nepHash || (await hashAuth(crypto.randomBytes(32).toString('base64url'))); await klopt(b.authKey, nepHash); throw new Fout(403, 'inloggen_mislukt'); }
      nietOpSlot(u);
      if (!(await klopt(b.authKey, u.auth_hash))) { mislukt(u); throw new Fout(403, 'inloggen_mislukt'); }
      if (u.totp_aan) {
        if (!b.code) throw new Fout(401, 'totp_nodig');
        if (!tweedeFactor(u, b.code)) { mislukt(u); throw new Fout(403, 'code_fout'); }
      }
      gelukt(u);
      nieuweSessie(res, u.id);
      return { wrappedKey: u.wrapped_key, totp: !!u.totp_aan };
    },

    'POST /logout': async (req, b, res) => {
      const token = tokenUit(req); if (token) q('DELETE FROM sessions WHERE token_hash = ?').run(sha(token));
      wisCookie(res); return { ok: true };
    },

    'GET /me': async (req) => {
      const u = ingelogd(req);
      return { totp: !!u.totp_aan, items: q('SELECT COUNT(*) n FROM items WHERE user_id = ?').get(u.id).n, reservecodes: q('SELECT COUNT(*) n FROM backup_codes WHERE user_id = ?').get(u.id).n };
    },

    /** De ingepakte datasleutel opnieuw ophalen (nodig bij wachtwoord wijzigen); alleen met het wachtwoord. */
    'POST /key': async (req, b) => { const u = ingelogd(req); await bevestig(u, b.authKey); return { wrappedKey: u.wrapped_key }; },

    'GET /items': async (req) => ({ items: q('SELECT id, blob FROM items WHERE user_id = ?').all(ingelogd(req).id) }),

    'PUT /items/:id': async (req, b) => {
      const u = ingelogd(req);
      if (!/^[0-9a-f-]{36}$/.test(req.id) || !isB64(b.blob, 30, MAX_BLOB)) throw new Fout(400, 'ongeldig');
      const bestaat = q('SELECT 1 FROM items WHERE user_id = ? AND id = ?').get(u.id, req.id);
      if (!bestaat && q('SELECT COUNT(*) n FROM items WHERE user_id = ?').get(u.id).n >= MAX_ITEMS) throw new Fout(409, 'te_veel');
      q('INSERT INTO items (id, user_id, blob) VALUES (?, ?, ?) ON CONFLICT (user_id, id) DO UPDATE SET blob = excluded.blob').run(req.id, u.id, b.blob);
      return { ok: true };
    },

    'DELETE /items/:id': async (req) => { q('DELETE FROM items WHERE user_id = ? AND id = ?').run(ingelogd(req).id, req.id); return { ok: true }; },

    // ----- twee-factor -----
    'POST /totp/setup': async (req, b) => {
      const u = ingelogd(req);
      if (u.totp_aan) throw new Fout(409, 'totp_al_aan');
      const geheimBytes = crypto.randomBytes(20), geheimTekst = base32(geheimBytes);
      q('UPDATE users SET totp_secret = ?, totp_stap = 0 WHERE id = ?').run(slotTotp(geheimBytes), u.id);
      const label = encodeURIComponent(String(b.label || 'account').slice(0, 40)); // alleen voor de QR-code, wordt niet bewaard
      const uri = `otpauth://totp/Kleine%20websites:${label}?secret=${geheimTekst}&issuer=Kleine%20websites&algorithm=SHA1&digits=6&period=30`;
      return { geheim: geheimTekst, uri, qr: await QRCode.toString(uri, { type: 'svg', margin: 1, errorCorrectionLevel: 'M' }) };
    },

    'POST /totp/enable': async (req, b) => {
      const u = ingelogd(req);
      if (u.totp_aan) throw new Fout(409, 'totp_al_aan');
      if (!u.totp_secret) throw new Fout(409, 'eerst_instellen');
      rem('totp', u.id, 10, 5 * 60e3);
      if (!totpKlopt(u, String(b.code || '').trim())) throw new Fout(403, 'code_fout');
      const codes = Array.from({ length: 8 }, () => base32(crypto.randomBytes(7)).slice(0, 10));
      db.transaction(() => {
        q('UPDATE users SET totp_aan = 1 WHERE id = ?').run(u.id);
        q('DELETE FROM backup_codes WHERE user_id = ?').run(u.id);
        for (const c of codes) q('INSERT INTO backup_codes (user_id, code_hash) VALUES (?, ?)').run(u.id, hmac('reserve:' + c));
      })();
      return { reservecodes: codes.map((c) => c.slice(0, 5) + '-' + c.slice(5)) };
    },

    'POST /totp/disable': async (req, b) => {
      const u = ingelogd(req);
      if (!u.totp_aan) throw new Fout(409, 'totp_staat_uit');
      await bevestig(u, b.authKey);
      if (!tweedeFactor(u, b.code)) { mislukt(u); throw new Fout(403, 'code_fout'); }
      db.transaction(() => { q('UPDATE users SET totp_aan = 0, totp_secret = NULL, totp_stap = 0 WHERE id = ?').run(u.id); q('DELETE FROM backup_codes WHERE user_id = ?').run(u.id); })();
      return { ok: true };
    },

    // ----- wachtwoord, herstel, verwijderen -----
    'POST /password': async (req, b, res) => {
      const u = ingelogd(req);
      if (!isB64(b.newSalt, 16, 32) || !isB64(b.newAuthKey, 40, 50) || !isB64(b.newWrappedKey, 70, 100)) throw new Fout(400, 'ongeldig');
      await bevestig(u, b.authKey);
      const authHash = await hashAuth(b.newAuthKey);
      db.transaction(() => { q('UPDATE users SET salt = ?, auth_hash = ?, wrapped_key = ? WHERE id = ?').run(b.newSalt, authHash, b.newWrappedKey, u.id); q('DELETE FROM sessions WHERE user_id = ?').run(u.id); })();
      nieuweSessie(res, u.id); // andere apparaten zijn uitgelogd, dit apparaat blijft ingelogd
      return { ok: true };
    },

    'POST /recover/start': async (req, b) => ({ recWrappedKey: herstelGebruiker(req, b).rec_wrapped_key }),

    'POST /recover/finish': async (req, b, res) => {
      if (!accountVelden(b) || !isB64(b.newRecAuth, 40, 50) || !isB64(b.newRecWrappedKey, 70, 100)) throw new Fout(400, 'ongeldig');
      const u = herstelGebruiker(req, b), authHash = await hashAuth(b.authKey);
      db.transaction(() => {
        q(`UPDATE users SET salt = ?, auth_hash = ?, wrapped_key = ?, rec_auth_hash = ?, rec_wrapped_key = ?, totp_aan = 0, totp_secret = NULL, totp_stap = 0, mislukt = 0, op_slot_tot = 0 WHERE id = ?`)
          .run(b.salt, authHash, b.wrappedKey, hmac('herstel:' + b.newRecAuth), b.newRecWrappedKey, u.id);
        q('DELETE FROM backup_codes WHERE user_id = ?').run(u.id); q('DELETE FROM sessions WHERE user_id = ?').run(u.id);
      })();
      nieuweSessie(res, u.id);
      return { ok: true };
    },

    'POST /account/delete': async (req, b, res) => {
      const u = ingelogd(req); await bevestig(u, b.authKey);
      q('DELETE FROM users WHERE id = ?').run(u.id); // items, sessies en reservecodes gaan mee (ON DELETE CASCADE)
      wisCookie(res); return { ok: true };
    },
  };

  /** De herstelcode is 160 bits willekeurig; een HMAC volstaat, raden is kansloos. Toch begrensd. */
  function herstelGebruiker(req, b) {
    rem('herstel', req.adres, 10, 15 * 60e3);
    if (typeof b.username !== 'string' || !isB64(b.recAuth, 40, 50)) throw new Fout(400, 'ongeldig');
    const u = q('SELECT * FROM users WHERE user_hash = ?').get(gebruikerHash(b.username));
    if (!u || !gelijk(Buffer.from(u.rec_auth_hash), hmac('herstel:' + b.recAuth))) throw new Fout(403, 'herstel_mislukt');
    return u;
  }

  // ---------- http ----------
  async function handler(req, res) {
    res.setHeader('Cache-Control', 'no-store'); res.setHeader('Content-Type', 'application/json; charset=utf-8'); res.setHeader('X-Content-Type-Options', 'nosniff');
    let status = 200, uit;
    try {
      const pad = new URL(req.url, 'http://x').pathname.replace(/^\/api/, '');
      let sleutel = `${req.method} ${pad}`;
      const m = pad.match(/^\/items\/([^/]+)$/); if (m) { req.id = m[1]; sleutel = `${req.method} /items/:id`; }
      const route = routes[sleutel]; if (!route) throw new Fout(404, 'bestaat_niet');
      // Alleen om te begrenzen; zie rem(). Achter Cloudflare staat het adres van de bezoeker in deze kop.
      req.adres = req.headers['cf-connecting-ip'] || req.headers['x-real-ip'] || req.socket.remoteAddress || '?';
      rem('alles', req.adres, 600, 5 * 60e3);
      let body = {};
      if (req.method !== 'GET') {
        // Geen verzoeken vanaf andere sites: de cookie is SameSite=Strict, en dit is de tweede grendel.
        const origin = req.headers.origin;
        if (origin && new URL(origin).host !== req.headers.host) throw new Fout(403, 'verkeerde_herkomst');
        if (req.method !== 'DELETE') {
          const stukken = []; let n = 0;
          for await (const s of req) { n += s.length; if (n > MAX_BODY) throw new Fout(413, 'te_groot'); stukken.push(s); }
          // Alleen JSON: een formulier op een andere site kan dat type niet versturen.
          if (n && !(req.headers['content-type'] || '').startsWith('application/json')) throw new Fout(415, 'alleen_json');
          try { body = JSON.parse(Buffer.concat(stukken).toString('utf8') || '{}'); } catch { throw new Fout(400, 'ongeldig'); }
          if (!body || typeof body !== 'object' || Array.isArray(body)) throw new Fout(400, 'ongeldig');
        }
      }
      uit = await route(req, body, res);
      if (sleutel === 'POST /register') status = 201;
    } catch (e) {
      if (e instanceof Fout) { status = e.status; uit = { error: e.code, ...e.extra }; }
      else { status = 500; uit = { error: 'serverfout' }; log('fout', req.method, String(req.url).split('?')[0], e && e.message); }
    }
    res.statusCode = status; res.end(JSON.stringify(uit));
  }

  // ---------- beheer ----------
  /** Nieuwe uitnodigingscode (zie cli.js). De code zelf wordt niet bewaard, alleen een HMAC. */
  function nieuweUitnodiging(aantal = 1) {
    const code = base32(crypto.randomBytes(10));
    q('INSERT INTO invites (code_hash, over) VALUES (?, ?)').run(hmac('uitnodiging:' + code), aantal);
    return code.match(/.{4}/g).join('-');
  }
  const stats = () => ({
    accounts: q('SELECT COUNT(*) n FROM users').get().n, metTweeFactor: q('SELECT COUNT(*) n FROM users WHERE totp_aan = 1').get().n,
    berekeningen: q('SELECT COUNT(*) n FROM items').get().n, sessies: q('SELECT COUNT(*) n FROM sessions').get().n, openUitnodigingen: q('SELECT COALESCE(SUM(over), 0) n FROM invites').get().n,
  });
  /** Versleutelde kopie naast de database; de laatste 7 blijven staan. */
  async function backup(map) {
    fs.mkdirSync(map, { recursive: true });
    const doel = path.join(map, `kleinewebsites-${new Date(nu()).toISOString().slice(0, 10)}.db`);
    fs.rmSync(doel, { force: true });
    q('VACUUM INTO ?').run(doel); // de kopie is met dezelfde sleutel versleuteld (db.backup() kan dat niet)
    const oud = fs.readdirSync(map).filter((f) => /^kleinewebsites-\d{4}-\d\d-\d\d\.db$/.test(f)).sort().slice(0, -7);
    for (const f of oud) fs.rmSync(path.join(map, f));
    return doel;
  }

  return { handler, db, nieuweUitnodiging, stats, backup, opruimen, sluit: () => db.close() };
}

module.exports = { maakApp, totp, base32, COOKIE };
