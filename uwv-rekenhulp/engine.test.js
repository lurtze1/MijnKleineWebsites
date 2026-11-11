// Rekenvoorbeelden uit docs/research/11 §10 en doc 13 als tests. Draaien: node --test uwv-rekenhulp/
const test = require('node:test');
const assert = require('node:assert/strict');
const E = require('./engine.js');

const D = '2026-11-11';
const A = { wiaMaandloon: 3500, aoPct: 60, rvcMaand: 1400, datum: D };

test('minimumloon WIA per 1-7-2026 = 2.337,00 × 1,08', () => {
  assert.equal(E.wiaMinimumloon(D), 2523.96);
});

test('VU-klassen', () => {
  assert.equal(E.vuPercentage(34.99), 0);
  assert.equal(E.vuPercentage(35), 0.28);
  assert.equal(E.vuPercentage(60), 0.42);
  assert.equal(E.vuPercentage(65), 0.5075);
  assert.equal(E.vuPercentage(100), 0.70);
});

test('Voorbeeld A, LGU', () => {
  const lgu = (inkomen, lguMaand) => E.uitkering({ ...A, fase: 'LGU', inkomen, lguMaand }).bedrag;
  assert.equal(lgu(0, 1), 2625);
  assert.equal(lgu(600, 1), 2175);
  assert.equal(lgu(0, 3), 2450);
  assert.equal(lgu(800, 3), 1890);
  assert.equal(lgu(1600, 3), 1330);
});

test('Voorbeeld A, fase 2 (LAU/VU)', () => {
  const f2 = (inkomen) => E.uitkering({ ...A, fase: 'FASE2', inkomen });
  assert.deepEqual([f2(0).soort, f2(0).bedrag], ['VU', 1060.06]);
  assert.deepEqual([f2(600).soort, f2(600).bedrag], ['VU', 1060.06]);
  assert.deepEqual([f2(699).soort, f2(699).bedrag], ['VU', 1060.06]);
  assert.deepEqual([f2(700).soort, f2(700).bedrag], ['LAU', 1470]);
  assert.deepEqual([f2(800).soort, f2(800).bedrag], ['LAU', 1470]);
  assert.deepEqual([f2(1600).soort, f2(1600).bedrag], ['LAU', 1330]);
  // klif bij de inkomenseis
  assert.equal(Math.round((700 + f2(700).bedrag - 699 - f2(699).bedrag) * 100) / 100, 410.94);
});

test('Voorbeeld B: 4-wekenloon + vakantiegeld', () => {
  const ink = E.wiaInkomen({ bedrag: 1200, periode: '4weken' });
  assert.equal(ink.basis, 1305);
  assert.equal(ink.totaal, 1409.4);
  assert.equal(E.uitkering({ ...A, fase: 'FASE2', inkomen: ink.totaal }).bedrag, 1463.42);
});

test('Voorbeeld C: dagloon boven maximum', () => {
  const r = E.uitkering({ fase: 'LGU', wiaMaandloon: 6740.54, dagloonOngemax: 400, inkomen: 2000, datum: D });
  assert.equal(r.bedrag, 3633.69);
});

test('Voorbeeld D: bonus in één maand', () => {
  assert.equal(E.uitkering({ ...A, fase: 'FASE2', inkomen: 1800 }).bedrag, 1190);
});

test('Voorbeeld E: IVA met werk', () => {
  assert.equal(E.uitkering({ fase: 'IVA', wiaMaandloon: 3500, inkomen: 500, datum: D }).bedrag, 2275);
});

test('Voorbeeld F: 40% AO zonder werk', () => {
  assert.equal(E.uitkering({ wiaMaandloon: 3500, aoPct: 40, rvcMaand: 2000, datum: D, fase: 'FASE2', inkomen: 0 }).bedrag, 706.71);
});

test('LAU lid 5: ophogen tot VU als LAU lager uitvalt', () => {
  // maandloon 2600, RVC 1800, AO 70%: LAU lid 4 = 0,7 × 800 = 560 < VU 0,5075 × 2523,96 = 1280,91
  // → min(VU, 0,7 × (2600 − 1000)) = min(1280,91, 1120) = 1120
  const r = E.uitkering({ wiaMaandloon: 2600, aoPct: 70, rvcMaand: 1800, datum: D, fase: 'FASE2', inkomen: 1000 });
  assert.equal(r.bedrag, 1120);
});

test('indexering WIA-maandloon volgt referentieminimummaandloon', () => {
  const r = E.indexeer(3000, '2025-08-01', '2026-11-11');
  assert.deepEqual(r.stappen.map((s) => s.pct), [2.16, 1.86]);
  assert.equal(r.bedrag, Math.round(3000 * 2337 / 2245.8 * 100) / 100);
  assert.equal(r.onvolledig, false);
  assert.equal(E.indexeer(3000, '2023-05-01', D).onvolledig, true);
});

test('65%-check', () => {
  // maatman € 25/u, nu € 15/u excl. vakantiegeld → 16,20 incl. → 64,8%: net onder
  let c = E.vijfenzestigCheck({ maatmanPerUur: 25, uurloon: 15 });
  assert.equal(c.pctVanMaatman, 64.8);
  assert.equal(c.status, 'veilig');
  assert.equal(c.grensUurloon, 15.05);
  // € 16/u → 17,28 → 69,12% → boven grens
  c = E.vijfenzestigCheck({ maatmanPerUur: 25, uurloon: 16 });
  assert.equal(c.status, 'boven65');
  assert.equal(c.klasseAlsUwvFeitelijkLoonNeemt, '<35%');
  // zonder vakantiegeld: 64%
  c = E.vijfenzestigCheck({ maatmanPerUur: 25, uurloon: 16, inclVakantiegeld: false });
  assert.equal(c.pctVanMaatman, 64);
  // boven RVC maar onder 65%
  c = E.vijfenzestigCheck({ maatmanPerUur: 25, uurloon: 12, rvcPerUur: 10 });
  assert.equal(c.status, 'bovenRvc');
});

test('65%-check met minder uren (reductiefactor, doc 14)', () => {
  // doc 14: maatman € 25 × 40 u, werkt 20 u tegen € 20 → AO 60%, grens € 32,50 (zonder vakantiegeld)
  let c = E.vijfenzestigCheck({ maatmanPerUur: 25, maatmanUren: 40, uurloon: 20, uren: 20, inclVakantiegeld: false });
  assert.equal(c.reductiefactor, 0.5);
  assert.equal(c.pctVanMaatman, 40);
  assert.equal(c.kaalPctVanMaatman, 80);
  assert.equal(c.aoAlsUwvFeitelijkLoonNeemt, 60);
  assert.equal(c.grensUurloon, 32.5);
  assert.equal(c.status, 'veilig');
  // met 8% vakantiegeld
  c = E.vijfenzestigCheck({ maatmanPerUur: 25, maatmanUren: 40, uurloon: 20, uren: 20 });
  assert.equal(c.pctVanMaatman, 43.2);
  assert.equal(c.grensUurloon, 30.09);
  assert.equal(c.grensUren, 30.1);
  // meer uren dan maatman: geen 'bonus', factor max 1
  c = E.vijfenzestigCheck({ maatmanPerUur: 25, maatmanUren: 40, uurloon: 16, uren: 45 });
  assert.equal(c.reductiefactor, 1);
  assert.equal(c.status, 'boven65');
});

test('einde WGA na vaststelling < 35%', () => {
  assert.equal(E.eindeWga({ datumVaststelling: '2026-03-31' }).einde, '2027-03-31');
  assert.equal(E.eindeWga({ datumVaststelling: '2026-03-31', reden: 'theoretisch' }).einde, '2026-05-31');
  assert.equal(E.eindeWga({ datumVaststelling: '2026-03-31', lguEinde: '2027-09-01' }).einde, '2027-09-01');
});
