/* Account en versleutelde opslag voor de kleine websites.
 *
 * Het principe: de server kan je gegevens niet lezen.
 *   wachtwoord --PBKDF2(600.000×, zout)--> hoofdsleutel --HKDF--> inlogwaarde (gaat naar de server)
 *                                                       \--HKDF--> kluissleutel (blijft in de browser)
 *   datasleutel (willekeurig, AES-256-GCM) versleutelt je berekeningen; de server bewaart hem alleen
 *   ingepakt met de kluissleutel, en nog een keer ingepakt met je herstelcode.
 * Het wachtwoord zelf verlaat de browser dus nooit, en zonder wachtwoord of herstelcode is alles onleesbaar.
 *
 * Gebruik in een rekenhulp:  <script src="../shared/account.js" data-tool="uwv"></script>
 * Dat zet onder de kop een balk "Bewaar als…" die de invoer uit de link (location.hash) bewaart.
 * Dezelfde code draait in de tests van de API (node), vandaar de module.exports onderaan.
 */
(function (root) {
  'use strict';
  const C = root.crypto || require('node:crypto').webcrypto;
  const S = C.subtle;
  const KDF_ITER = 600000;
  const enc = new TextEncoder(), dec = new TextDecoder();

  // ---------- kleine hulpjes ----------
  const rnd = (n) => C.getRandomValues(new Uint8Array(n));
  const b64 = (buf) => {
    let s = ''; for (const b of new Uint8Array(buf)) s += String.fromCharCode(b);
    return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  };
  const unb64 = (str) => {
    const s = atob(String(str).replace(/-/g, '+').replace(/_/g, '/'));
    const u = new Uint8Array(s.length); for (let i = 0; i < s.length; i++) u[i] = s.charCodeAt(i);
    return u;
  };
  const B32 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
  const base32 = (bytes) => {
    let bits = 0, val = 0, out = '';
    for (const b of bytes) { val = (val << 8) | b; bits += 8; while (bits >= 5) { out += B32[(val >>> (bits - 5)) & 31]; bits -= 5; } }
    return bits ? out + B32[(val << (5 - bits)) & 31] : out;
  };
  const unbase32 = (str) => {
    let bits = 0, val = 0; const out = [];
    for (const ch of String(str).toUpperCase().replace(/[^A-Z2-7]/g, '')) {
      val = (val << 5) | B32.indexOf(ch); bits += 5;
      if (bits >= 8) { out.push((val >>> (bits - 8)) & 255); bits -= 8; }
    }
    return new Uint8Array(out);
  };
  const naam = (u) => String(u).trim().toLowerCase();

  // ---------- sleutels afleiden ----------
  async function hkdf(bytes, info, bits) {
    const k = await S.importKey('raw', bytes, 'HKDF', false, ['deriveBits']);
    return S.deriveBits({ name: 'HKDF', hash: 'SHA-256', salt: new Uint8Array(0), info: enc.encode(info) }, k, bits);
  }
  const aes = (raw, extractable = false) => S.importKey('raw', raw, 'AES-GCM', extractable, ['encrypt', 'decrypt']);
  /** Uit een geheim (hoofdsleutel of herstelcode): de waarde voor de server en de sleutel die de datasleutel inpakt. */
  async function splits(geheim, soort) {
    return { auth: b64(await hkdf(geheim, `kleinewebsites/${soort}/auth/v1`, 256)), kek: await aes(await hkdf(geheim, `kleinewebsites/${soort}/kek/v1`, 256)) };
  }
  async function vanWachtwoord(wachtwoord, zout, iter = KDF_ITER) {
    const k = await S.importKey('raw', enc.encode(String(wachtwoord).normalize('NFKC')), 'PBKDF2', false, ['deriveBits']);
    const hoofd = await S.deriveBits({ name: 'PBKDF2', hash: 'SHA-256', salt: unb64(zout), iterations: iter }, k, 256);
    return splits(hoofd, 'wachtwoord');
  }
  const vanHerstelcode = (code) => splits(unbase32(code), 'herstel');
  const nieuweHerstelcode = () => base32(rnd(20)).match(/.{4}/g).join('-'); // 160 bits, bv. ABCD-EFGH-…

  // ---------- versleutelen ----------
  async function versleutel(sleutel, bytes) {
    const iv = rnd(12), ct = new Uint8Array(await S.encrypt({ name: 'AES-GCM', iv }, sleutel, bytes));
    const uit = new Uint8Array(12 + ct.length); uit.set(iv); uit.set(ct, 12);
    return b64(uit);
  }
  async function ontsleutel(sleutel, tekst) {
    const b = unb64(tekst);
    return new Uint8Array(await S.decrypt({ name: 'AES-GCM', iv: b.slice(0, 12) }, sleutel, b.slice(12)));
  }
  const pakIn = (kek, ruw) => versleutel(kek, ruw);
  const pakUit = (kek, tekst) => ontsleutel(kek, tekst); // geeft de ruwe datasleutel
  const versleutelObject = async (sleutel, obj) => versleutel(sleutel, enc.encode(JSON.stringify(obj)));
  const ontsleutelObject = async (sleutel, tekst) => JSON.parse(dec.decode(await ontsleutel(sleutel, tekst)));

  const cryptoApi = { KDF_ITER, b64, unb64, base32, unbase32, rnd, naam, vanWachtwoord, vanHerstelcode, nieuweHerstelcode, aes, pakIn, pakUit, versleutelObject, ontsleutelObject };

  // ---------- wat de server moet weten bij registreren / nieuw wachtwoord ----------
  /** Alles voor een nieuw account. De datasleutel komt alleen ingepakt in het resultaat. */
  async function maakAccount(wachtwoord, iter) {
    const zout = b64(rnd(16)), ruw = rnd(32), herstelcode = nieuweHerstelcode();
    const w = await vanWachtwoord(wachtwoord, zout, iter), h = await vanHerstelcode(herstelcode);
    return {
      herstelcode, ruw,
      server: { salt: zout, authKey: w.auth, wrappedKey: await pakIn(w.kek, ruw), recAuth: h.auth, recWrappedKey: await pakIn(h.kek, ruw) },
    };
  }
  cryptoApi.maakAccount = maakAccount;

  // ---------- browser: sleutel bewaren, praten met de server ----------
  const inBrowser = typeof root.document !== 'undefined';
  const API = '/api';

  class Fout extends Error { constructor(code, status, extra) { super(code); this.code = code; this.status = status; Object.assign(this, extra); } }
  async function api(method, pad, body) {
    let r;
    try {
      r = await root.fetch(API + pad, { method, credentials: 'same-origin', cache: 'no-store',
        headers: body ? { 'Content-Type': 'application/json' } : {}, body: body ? JSON.stringify(body) : undefined });
    } catch { throw new Fout('offline', 0); }
    const data = (r.headers.get('content-type') || '').includes('json') ? await r.json() : {};
    if (!r.ok) throw new Fout(data.error || 'fout', r.status, data);
    return data;
  }

  // De datasleutel staat als niet-exporteerbare sleutel in IndexedDB: pagina's op dit domein kunnen ermee
  // versleutelen, maar de sleutel zelf is niet uit te lezen.
  function kluis(mode, fn) {
    return new Promise((ok, fout) => {
      const open = root.indexedDB.open('kleinewebsites', 1);
      open.onupgradeneeded = () => open.result.createObjectStore('kluis');
      open.onerror = () => fout(open.error);
      open.onsuccess = () => {
        const tx = open.result.transaction('kluis', mode), req = fn(tx.objectStore('kluis'));
        tx.oncomplete = () => { open.result.close(); ok(req && req.result); };
        tx.onerror = () => fout(tx.error);
      };
    });
  }
  const bewaarSleutel = async (ruw, gebruiker) => {
    const sleutel = await aes(ruw, false);
    return kluis('readwrite', (s) => s.put({ sleutel, gebruiker }, 'ik'));
  };
  const leesSleutel = () => kluis('readonly', (s) => s.get('ik')).catch(() => null);
  const wisSleutel = () => kluis('readwrite', (s) => s.delete('ik')).catch(() => null);

  const Account = {
    crypto: cryptoApi,
    Fout,

    /** Is de opslag er (API bereikbaar)? Bij een los geopend bestand of zonder API: false. */
    async beschikbaar() {
      if (!inBrowser || !/^https?:$/.test(root.location.protocol)) return false;
      try { await api('GET', '/health'); return true; } catch { return false; }
    },

    /** { gebruiker, totp, items } als je ingelogd bent én de sleutel in deze browser staat; anders null. */
    async sessie() {
      let ik;
      try { ik = await api('GET', '/me'); } catch (e) { if (e.status === 401) await wisSleutel(); return null; }
      const k = await leesSleutel();
      if (!k || !k.sleutel) { await api('POST', '/logout').catch(() => {}); return null; }
      return { ...ik, gebruiker: k.gebruiker };
    },

    async registreer({ gebruiker, wachtwoord, uitnodiging }) {
      const a = await maakAccount(wachtwoord);
      await api('POST', '/register', { username: naam(gebruiker), invite: String(uitnodiging).trim(), ...a.server });
      await bewaarSleutel(a.ruw, naam(gebruiker));
      return { herstelcode: a.herstelcode };
    },

    /** Geeft { totpNodig: true } als er nog een code van de authenticator bij moet. */
    async login({ gebruiker, wachtwoord, code }) {
      const u = naam(gebruiker);
      const pre = await api('POST', '/prelogin', { username: u });
      const w = await vanWachtwoord(wachtwoord, pre.salt, pre.iter);
      let r;
      try { r = await api('POST', '/login', { username: u, authKey: w.auth, code: code ? String(code).trim() : undefined }); }
      catch (e) { if (e.code === 'totp_nodig') return { totpNodig: true }; throw e; }
      await bewaarSleutel(await pakUit(w.kek, r.wrappedKey), u);
      return { ok: true };
    },

    async logout() { await api('POST', '/logout').catch(() => {}); await wisSleutel(); },

    // ----- berekeningen -----
    /** Alle bewaarde berekeningen, ontsleuteld: [{ id, tool, naam, staat, bewaard }]. */
    async lijst(tool) {
      const k = await leesSleutel(); if (!k || !k.sleutel) throw new Fout('niet_ingelogd', 401);
      const { items } = await api('GET', '/items');
      const uit = [];
      for (const it of items) {
        try { uit.push({ id: it.id, ...(await ontsleutelObject(k.sleutel, it.blob)) }); } catch { /* onleesbaar: overslaan */ }
      }
      return uit.filter((x) => !tool || x.tool === tool).sort((a, b) => (b.bewaard || 0) - (a.bewaard || 0));
    },
    async bewaar({ id, tool, naam: n, staat }) {
      const k = await leesSleutel(); if (!k || !k.sleutel) throw new Fout('niet_ingelogd', 401);
      id = id || C.randomUUID();
      await api('PUT', '/items/' + id, { blob: await versleutelObject(k.sleutel, { tool, naam: n, staat, bewaard: Date.now() }) });
      return id;
    },
    verwijder: (id) => api('DELETE', '/items/' + id),

    // ----- twee-factor -----
    async totpStart() { const k = await leesSleutel(); return api('POST', '/totp/setup', { label: k ? k.gebruiker : '' }); },
    totpAan: (code) => api('POST', '/totp/enable', { code: String(code).trim() }),
    async totpUit({ wachtwoord, code }) { return api('POST', '/totp/disable', { authKey: await this._auth(wachtwoord), code: String(code).trim() }); },

    // ----- wachtwoord, herstel, verwijderen -----
    async _vers(wachtwoord) {
      const k = await leesSleutel(); if (!k) throw new Fout('niet_ingelogd', 401);
      const pre = await api('POST', '/prelogin', { username: k.gebruiker });
      return { gebruiker: k.gebruiker, ...(await vanWachtwoord(wachtwoord, pre.salt, pre.iter)) };
    },
    async _auth(wachtwoord) { return (await this._vers(wachtwoord)).auth; },

    async wijzigWachtwoord({ oud, nieuw }) {
      const o = await this._vers(oud);
      const { wrappedKey } = await api('POST', '/key', { authKey: o.auth }); // bewijst meteen dat het oude wachtwoord klopt
      const ruw = await pakUit(o.kek, wrappedKey);
      const zout = b64(rnd(16)), n = await vanWachtwoord(nieuw, zout);
      await api('POST', '/password', { authKey: o.auth, newSalt: zout, newAuthKey: n.auth, newWrappedKey: await pakIn(n.kek, ruw) });
    },

    /** Wachtwoord kwijt: met de herstelcode een nieuw wachtwoord zetten. Twee-factor gaat uit; je krijgt een nieuwe herstelcode. */
    async herstel({ gebruiker, herstelcode, nieuw }) {
      const u = naam(gebruiker), h = await vanHerstelcode(herstelcode);
      const { recWrappedKey } = await api('POST', '/recover/start', { username: u, recAuth: h.auth });
      const ruw = await pakUit(h.kek, recWrappedKey);
      const zout = b64(rnd(16)), w = await vanWachtwoord(nieuw, zout);
      const nieuweCode = nieuweHerstelcode(), nh = await vanHerstelcode(nieuweCode);
      await api('POST', '/recover/finish', { username: u, recAuth: h.auth, salt: zout, authKey: w.auth, wrappedKey: await pakIn(w.kek, ruw),
        newRecAuth: nh.auth, newRecWrappedKey: await pakIn(nh.kek, ruw) });
      await bewaarSleutel(ruw, u);
      return { herstelcode: nieuweCode };
    },

    async verwijderAccount({ wachtwoord }) { await api('POST', '/account/delete', { authKey: await this._auth(wachtwoord) }); await wisSleutel(); },
  };

  // ---------- balk "Bewaar als…" in een rekenhulp ----------
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  async function balk(tool, accountUrl) {
    const kop = root.document.querySelector('.head');
    if (!kop || !(await Account.beschikbaar())) return;
    const el = root.document.createElement('div');
    el.className = 'info bewaar';
    el.hidden = true; // pas tonen als er iets in staat
    kop.after(el);
    const sessie = await Account.sessie();
    el.hidden = false;
    if (!sessie) {
      el.innerHTML = `<span>Wil je deze berekening bewaren? <a href="${accountUrl}">Log in of maak een account</a>. Alles wordt versleuteld opgeslagen: alleen jij kunt het lezen.</span>`;
      return;
    }
    el.innerHTML = `
      <form class="bewaar-rij" autocomplete="off">
        <label for="bw_naam">Bewaar als</label>
        <input id="bw_naam" maxlength="60" placeholder="bijv. huidige baan">
        <button class="knop" type="submit">Opslaan</button>
        <span class="bewaar-tussen"></span>
        <label for="bw_lijst">Mijn berekeningen</label>
        <select id="bw_lijst"></select>
        <button class="knop" type="button" data-open>Openen</button>
        <button class="knop" type="button" data-weg>Verwijderen</button>
      </form>
      <div class="bewaar-voet"><span id="bw_meld" aria-live="polite"></span><span>Ingelogd als <b>${esc(sessie.gebruiker)}</b> · <a href="${accountUrl}">account</a></span></div>`;
    const $ = (s) => el.querySelector(s), meld = (t) => { $('#bw_meld').textContent = t; };
    let items = [];
    const datum = (t) => new Date(t).toLocaleDateString('nl-NL', { day: 'numeric', month: 'short', year: 'numeric' });
    async function ververs(kies) {
      items = await Account.lijst(tool);
      $('#bw_lijst').innerHTML = items.length
        ? items.map((x) => `<option value="${esc(x.id)}">${esc(x.naam)} (${datum(x.bewaard)})</option>`).join('')
        : '<option value="">nog niets bewaard</option>';
      if (kies) $('#bw_lijst').value = kies;
      $('[data-open]').disabled = $('[data-weg]').disabled = !items.length;
    }
    const fout = (e) => meld(e.status === 401 ? 'Je bent uitgelogd. Log opnieuw in.' : e.code === 'te_veel' ? 'Je hebt het maximum aantal berekeningen bereikt; verwijder er eerst een.' : 'Dat lukte niet. Probeer het zo nog eens.');
    $('form').addEventListener('submit', async (e) => {
      e.preventDefault(); e.stopPropagation();
      const n = $('#bw_naam').value.trim();
      if (!n) { meld('Geef de berekening eerst een naam.'); $('#bw_naam').focus(); return; }
      try {
        const bestaand = items.find((x) => x.naam.toLowerCase() === n.toLowerCase());
        const id = await Account.bewaar({ id: bestaand && bestaand.id, tool, naam: n, staat: root.location.hash });
        await ververs(id);
        meld(bestaand ? `"${n}" is bijgewerkt.` : `"${n}" is bewaard.`);
      } catch (err) { fout(err); }
    });
    $('[data-open]').addEventListener('click', () => {
      const it = items.find((x) => x.id === $('#bw_lijst').value); if (!it) return;
      $('#bw_naam').value = it.naam;
      if (root.location.hash === it.staat) root.dispatchEvent(new Event('hashchange')); else root.location.hash = it.staat;
      meld(`"${it.naam}" is geopend.`);
    });
    $('[data-weg]').addEventListener('click', async () => {
      const it = items.find((x) => x.id === $('#bw_lijst').value); if (!it) return;
      if (!root.confirm(`"${it.naam}" verwijderen? Dit kan niet ongedaan worden gemaakt.`)) return;
      try { await Account.verwijder(it.id); await ververs(); meld(`"${it.naam}" is verwijderd.`); } catch (err) { fout(err); }
    });
    // typen in de balk is geen invoer voor de rekenhulp zelf
    el.addEventListener('input', (e) => e.stopPropagation());
    try { await ververs(); } catch (err) { fout(err); }
  }

  if (typeof module !== 'undefined' && module.exports) module.exports = cryptoApi;
  else {
    root.Account = Account;
    const script = root.document.currentScript;
    if (script && script.dataset.tool) {
      const start = () => balk(script.dataset.tool, script.dataset.account || '../account/').catch(() => {});
      if (root.document.readyState === 'loading') root.document.addEventListener('DOMContentLoaded', start); else start();
    }
  }
})(typeof window !== 'undefined' ? window : globalThis);
