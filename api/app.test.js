'use strict';
// Draait de echte API tegen een tijdelijke database, met dezelfde cryptocode als de browser (shared/account.js).
//   cd api && npm install && node --test
const test = require('node:test');
const assert = require('node:assert/strict');
const http = require('node:http');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const crypto = require('node:crypto');
const { maakApp, totp, COOKIE } = require('./app.js');
const K = require('../shared/account.js');

const ITER = 1000; // de browser gebruikt 600.000; voor de test is dat alleen maar traag
let klok = Date.UTC(2026, 10, 17, 12);
const map = fs.mkdtempSync(path.join(os.tmpdir(), 'kw-'));
const dbPad = path.join(map, 'test.db'), dbSleutel = crypto.randomBytes(32).toString('hex');
const app = maakApp({ dbPad, dbSleutel, geheim: crypto.randomBytes(32).toString('hex'), nu: () => klok, argon: { memory: 64, passes: 1 }, limietFactor: 1000 });
const server = http.createServer(app.handler);
let basis;
test.before(() => new Promise((ok) => server.listen(0, '127.0.0.1', () => { basis = `http://127.0.0.1:${server.address().port}/api`; ok(); })));
test.after(() => { server.close(); app.sluit(); fs.rmSync(map, { recursive: true, force: true }); });

/** Een "browser": onthoudt de cookie. */
function klant() {
  let cookie = '';
  return async (method, pad, body, kop = {}) => {
    const r = await fetch(basis + pad, { method, headers: { ...(body ? { 'Content-Type': 'application/json' } : {}), ...(cookie ? { Cookie: cookie } : {}), ...kop }, body: body ? JSON.stringify(body) : undefined });
    const set = r.headers.get('set-cookie');
    if (set) cookie = set.split(';')[0].endsWith('=') ? '' : set.split(';')[0];
    return { status: r.status, set, ...(await r.json()) };
  };
}
async function registreer(c, username, wachtwoord) {
  const a = await K.maakAccount(wachtwoord, ITER);
  const r = await c('POST', '/register', { username, invite: app.nieuweUitnodiging(), ...a.server });
  return { r, ...a };
}
async function login(c, username, wachtwoord, code) {
  const pre = await c('POST', '/prelogin', { username });
  const w = await K.vanWachtwoord(wachtwoord, pre.salt, ITER);
  return { r: await c('POST', '/login', { username, authKey: w.auth, code }), w };
}
const totpNu = (geheim, verschuif = 0) => totp(Buffer.from(K.unbase32(geheim)), Math.floor(klok / 30e3) + verschuif);

test('TOTP volgt RFC 6238', () => {
  // testvector uit de RFC: geheim "12345678901234567890", T = 59 s → 94287082 (8 cijfers) → laatste 6: 287082
  assert.equal(totp(Buffer.from('12345678901234567890'), Math.floor(59 / 30)), '287082');
});

test('registreren, opslaan, uitloggen, inloggen en teruglezen', async () => {
  const c = klant();
  const { r, ruw } = await registreer(c, 'Jeffrey', 'correct paard batterij');
  assert.equal(r.status, 201);
  assert.match(r.set, new RegExp(`^${COOKIE}=.+HttpOnly; Secure; SameSite=Strict$`));

  const sleutel = await K.aes(ruw), id = crypto.randomUUID();
  const berekening = { tool: 'uwv', naam: 'huidige baan', staat: '#tab=grens&g_uurloon=20', bewaard: 1 };
  assert.equal((await c('PUT', '/items/' + id, { blob: await K.versleutelObject(sleutel, berekening) })).status, 200);
  assert.equal((await c('GET', '/me')).items, 1);
  await c('POST', '/logout');
  assert.equal((await c('GET', '/items')).status, 401);

  // inloggen is hoofdletterongevoelig; de datasleutel komt ingepakt terug en gaat alleen met het wachtwoord open
  const { r: l, w } = await login(c, 'jeffrey', 'correct paard batterij');
  assert.equal(l.status, 200);
  const terug = await K.aes(await K.pakUit(w.kek, l.wrappedKey));
  const { items } = await c('GET', '/items');
  assert.deepEqual(await K.ontsleutelObject(terug, items[0].blob), berekening);

  assert.equal((await c('DELETE', '/items/' + id)).status, 200);
  assert.equal((await c('GET', '/items')).items.length, 0);
});

test('de database bevat geen leesbare namen, wachtwoorden of inhoud', async () => {
  const c = klant();
  const { ruw } = await registreer(c, 'geheimenaam', 'geheimwachtwoord');
  await c('PUT', '/items/' + crypto.randomUUID(), { blob: await K.versleutelObject(await K.aes(ruw), { naam: 'geheimeinhoud' }) });
  const rijen = JSON.stringify([app.db.prepare('SELECT * FROM users').all(), app.db.prepare('SELECT * FROM items').all()]);
  for (const woord of ['geheimenaam', 'geheimwachtwoord', 'geheimeinhoud']) assert.ok(!rijen.includes(woord), woord);
  // en het bestand zelf is versleuteld: geen SQLite-kop, geen tabelnamen
  app.db.pragma('wal_checkpoint(TRUNCATE)');
  const bestand = fs.readFileSync(dbPad);
  assert.notEqual(bestand.subarray(0, 15).toString(), 'SQLite format 3');
  assert.ok(!bestand.includes('rec_wrapped_key'));
  // met een verkeerde sleutel gaat het niet open
  assert.throws(() => maakApp({ dbPad, dbSleutel: '0'.repeat(64), geheim: 'x'.repeat(40) }));
});

test('verkeerd wachtwoord, onbekende naam en het slot na 5 pogingen', async () => {
  const c = klant();
  await registreer(c, 'slotje', 'goed-wachtwoord');
  await c('POST', '/logout');
  assert.equal((await login(c, 'bestaatniet', 'x')).r.error, 'inloggen_mislukt');
  for (let i = 0; i < 5; i++) assert.equal((await login(c, 'slotje', 'fout')).r.error, 'inloggen_mislukt');
  const op = (await login(c, 'slotje', 'goed-wachtwoord')).r;
  assert.equal(op.status, 429); assert.equal(op.error, 'op_slot');
  klok += 31e3;
  assert.equal((await login(c, 'slotje', 'goed-wachtwoord')).r.status, 200);
  // prelogin verraadt niet of een naam bestaat: onbekende namen krijgen een vast (nep)zout
  const a = await c('POST', '/prelogin', { username: 'spook' }), b = await c('POST', '/prelogin', { username: 'spook' });
  assert.equal(a.salt, b.salt); assert.equal(a.salt.length, 22);
});

test('uitnodiging is verplicht en werkt één keer; een naam kan maar één keer', async () => {
  const c = klant(), a = await K.maakAccount('wachtwoord-1', ITER);
  assert.equal((await c('POST', '/register', { username: 'zonder', invite: 'AAAA-BBBB-CCCC-DDDD', ...a.server })).error, 'uitnodiging_ongeldig');
  const code = app.nieuweUitnodiging();
  assert.equal((await c('POST', '/register', { username: 'eerste', invite: code.toLowerCase(), ...a.server })).status, 201);
  assert.equal((await klant()('POST', '/register', { username: 'tweede', invite: code, ...a.server })).error, 'uitnodiging_ongeldig');
  assert.equal((await klant()('POST', '/register', { username: 'EERSTE', invite: app.nieuweUitnodiging(), ...a.server })).error, 'naam_bezet');
});

test('twee-factor: instellen, inloggen met code, geen hergebruik, reservecode, uitzetten', async () => {
  const c = klant();
  await registreer(c, 'tweefactor', 'wachtwoord-2fa');
  const s = await c('POST', '/totp/setup', { label: 'tweefactor' });
  assert.match(s.uri, /^otpauth:\/\/totp\/Kleine%20websites:tweefactor\?secret=[A-Z2-7]{32}&/);
  assert.match(s.qr, /^<svg/);
  assert.equal((await c('POST', '/totp/enable', { code: '000000' })).error, 'code_fout');
  const aan = await c('POST', '/totp/enable', { code: totpNu(s.geheim) });
  assert.equal(aan.reservecodes.length, 8);
  await c('POST', '/logout');

  assert.equal((await login(c, 'tweefactor', 'wachtwoord-2fa')).r.error, 'totp_nodig');
  assert.equal((await login(c, 'tweefactor', 'wachtwoord-2fa', totpNu(s.geheim))).r.error, 'code_fout', 'dezelfde code werkt geen tweede keer');
  klok += 30e3;
  assert.equal((await login(c, 'tweefactor', 'wachtwoord-2fa', totpNu(s.geheim))).r.status, 200);
  await c('POST', '/logout');
  assert.equal((await login(c, 'tweefactor', 'wachtwoord-2fa', aan.reservecodes[0])).r.status, 200);
  assert.equal((await c('GET', '/me')).reservecodes, 7);
  await c('POST', '/logout');
  assert.equal((await login(c, 'tweefactor', 'wachtwoord-2fa', aan.reservecodes[0])).r.error, 'code_fout', 'een reservecode werkt één keer');

  klok += 30e3;
  const { w } = await login(c, 'tweefactor', 'wachtwoord-2fa', totpNu(s.geheim));
  klok += 30e3;
  assert.equal((await c('POST', '/totp/disable', { authKey: w.auth, code: totpNu(s.geheim) })).status, 200);
  await c('POST', '/logout');
  assert.equal((await login(c, 'tweefactor', 'wachtwoord-2fa')).r.status, 200);
});

test('wachtwoord wijzigen: oude werkt niet meer, andere apparaten zijn uitgelogd, gegevens blijven leesbaar', async () => {
  const c = klant(), ander = klant();
  const { ruw } = await registreer(c, 'wisselaar', 'oud-wachtwoord');
  const id = crypto.randomUUID();
  await c('PUT', '/items/' + id, { blob: await K.versleutelObject(await K.aes(ruw), { naam: 'blijft' }) });
  await login(ander, 'wisselaar', 'oud-wachtwoord');

  const { w: oud } = await login(klant(), 'wisselaar', 'oud-wachtwoord');
  const { wrappedKey } = await c('POST', '/key', { authKey: oud.auth });
  const sleutelRuw = await K.pakUit(oud.kek, wrappedKey);
  const zout = K.b64(K.rnd(16)), nieuw = await K.vanWachtwoord('nieuw-wachtwoord', zout, ITER);
  assert.equal((await c('POST', '/password', { authKey: 'A'.repeat(43), newSalt: zout, newAuthKey: nieuw.auth, newWrappedKey: await K.pakIn(nieuw.kek, sleutelRuw) })).error, 'wachtwoord_fout');
  assert.equal((await c('POST', '/password', { authKey: oud.auth, newSalt: zout, newAuthKey: nieuw.auth, newWrappedKey: await K.pakIn(nieuw.kek, sleutelRuw) })).status, 200);

  assert.equal((await ander('GET', '/me')).status, 401);
  assert.equal((await c('GET', '/me')).status, 200);
  assert.equal((await login(klant(), 'wisselaar', 'oud-wachtwoord')).r.error, 'inloggen_mislukt');
  const n = klant(), { r, w } = await login(n, 'wisselaar', 'nieuw-wachtwoord');
  const sleutel = await K.aes(await K.pakUit(w.kek, r.wrappedKey));
  assert.equal((await K.ontsleutelObject(sleutel, (await n('GET', '/items')).items[0].blob)).naam, 'blijft');
});

test('herstelcode: nieuw wachtwoord, gegevens blijven leesbaar, twee-factor uit, oude code vervalt', async () => {
  const c = klant();
  const { ruw, herstelcode } = await registreer(c, 'vergeetachtig', 'vergeten-wachtwoord');
  await c('PUT', '/items/' + crypto.randomUUID(), { blob: await K.versleutelObject(await K.aes(ruw), { naam: 'gered' }) });
  const s = await c('POST', '/totp/setup', {}); await c('POST', '/totp/enable', { code: totpNu(s.geheim) });
  await c('POST', '/logout');

  const fout = await K.vanHerstelcode(K.nieuweHerstelcode());
  assert.equal((await c('POST', '/recover/start', { username: 'vergeetachtig', recAuth: fout.auth })).error, 'herstel_mislukt');

  const h = await K.vanHerstelcode(herstelcode.toLowerCase()); // overtypen in kleine letters mag
  const { recWrappedKey } = await c('POST', '/recover/start', { username: 'vergeetachtig', recAuth: h.auth });
  const sleutelRuw = await K.pakUit(h.kek, recWrappedKey);
  const zout = K.b64(K.rnd(16)), w = await K.vanWachtwoord('nieuw', zout, ITER), nh = await K.vanHerstelcode(K.nieuweHerstelcode());
  const klaar = await c('POST', '/recover/finish', { username: 'vergeetachtig', recAuth: h.auth, salt: zout, authKey: w.auth, wrappedKey: await K.pakIn(w.kek, sleutelRuw), newRecAuth: nh.auth, newRecWrappedKey: await K.pakIn(nh.kek, sleutelRuw) });
  assert.equal(klaar.status, 200);
  assert.equal((await c('GET', '/me')).totp, false);
  assert.equal((await K.ontsleutelObject(await K.aes(sleutelRuw), (await c('GET', '/items')).items[0].blob)).naam, 'gered');
  assert.equal((await c('POST', '/recover/start', { username: 'vergeetachtig', recAuth: h.auth })).error, 'herstel_mislukt');
  assert.equal((await login(klant(), 'vergeetachtig', 'nieuw')).r.status, 200);
});

test('alleen je eigen gegevens; account verwijderen ruimt alles op', async () => {
  const a = klant(), b = klant();
  const { ruw } = await registreer(a, 'anna', 'wachtwoord-anna');
  await registreer(b, 'bert', 'wachtwoord-bert');
  const id = crypto.randomUUID();
  await a('PUT', '/items/' + id, { blob: await K.versleutelObject(await K.aes(ruw), { naam: 'van anna' }) });
  assert.equal((await b('GET', '/items')).items.length, 0);
  await b('DELETE', '/items/' + id);
  assert.equal((await a('GET', '/items')).items.length, 1);

  const { w } = await login(klant(), 'anna', 'wachtwoord-anna');
  assert.equal((await a('POST', '/account/delete', { authKey: w.auth })).status, 200);
  assert.equal((await a('GET', '/me')).status, 401);
  assert.equal(app.db.prepare('SELECT COUNT(*) n FROM items WHERE id = ?').get(id).n, 0);
  assert.equal((await login(klant(), 'anna', 'wachtwoord-anna')).r.error, 'inloggen_mislukt');
});

test('invoer wordt gecontroleerd: herkomst, type, grootte', async () => {
  const c = klant();
  await registreer(c, 'streng', 'wachtwoord-streng');
  assert.equal((await c('POST', '/logout', {}, { Origin: 'https://kwaad.example' })).error, 'verkeerde_herkomst');
  assert.equal((await c('PUT', '/items/geen-uuid', { blob: 'A'.repeat(40) })).error, 'ongeldig');
  assert.equal((await c('PUT', '/items/' + crypto.randomUUID(), { blob: 'A'.repeat(30000) })).error, 'ongeldig');
  assert.equal((await c('PUT', '/items/' + crypto.randomUUID(), { blob: '<script>' + 'A'.repeat(40) })).error, 'ongeldig');
  const r = await fetch(basis + '/login', { method: 'POST', headers: { 'Content-Type': 'text/plain' }, body: '{}' });
  assert.equal(r.status, 415);
  assert.equal((await c('GET', '/bestaat-niet')).status, 404);
});

test('backup maakt een versleutelde kopie', async () => {
  const f = await app.backup(path.join(map, 'backup'));
  assert.ok(fs.statSync(f).size > 0);
  assert.notEqual(fs.readFileSync(f).subarray(0, 15).toString(), 'SQLite format 3');
});
