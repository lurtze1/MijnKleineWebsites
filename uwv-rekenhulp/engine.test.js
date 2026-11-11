// Rekenvoorbeelden uit docs/research/11 §10, 13 en 14 als tests. Draaien: node --test uwv-rekenhulp/engine.test.js
const test = require('node:test');
const assert = require('node:assert/strict');
const E = require('./engine.js');

const D = '2026-11-11';
const A = { wiaMaandloon: 3500, aoPct: 60, rvcMaand: 1400, datum: D };

test('minimumloon WIA en maximum per 1-7-2026', () => {
  assert.equal(E.wiaMinimumloon(D), 2523.96);
  assert.equal(E.maxMaandloon(D), 6740.54);
});

test('peildatumstatus', () => {
  assert.equal(E.peildatumStatus('2024-12-31'), 'teVroeg');
  assert.equal(E.peildatumStatus(D), 'ok');
  assert.equal(E.peildatumStatus('2027-01-01'), 'teLaat');
});

test('AO-klassen', () => {
  assert.deepEqual(E.klasse(34.99), { pct: 0, label: '<35%' });
  assert.equal(E.klasse(35).pct, 0.28);
  assert.equal(E.klasse(60).pct, 0.42);
  assert.deepEqual(E.klasse(65), { pct: 0.5075, label: '65–80%' });
  assert.deepEqual(E.klasse(100), { pct: 0.70, label: '80–100%' });
});

test('Voorbeeld A, LGU', () => {
  const lgu = (inkomen, lguMaand) => E.uitkering({ ...A, fase: 'LGU', inkomen, lguMaand }).bedrag;
  assert.equal(lgu(0, 1), 2625);
  assert.equal(lgu(600, 1), 2175);
  assert.equal(lgu(0, 3), 2450);
  assert.equal(lgu(800, 3), 1890);
  assert.equal(lgu(1600, 3), 1330);
});

test('Voorbeeld A, fase 2 met klif bij de inkomenseis', () => {
  const f2 = (inkomen) => E.uitkering({ ...A, fase: 'FASE2', inkomen });
  for (const [ink, soort, bedrag] of [[0, 'VU', 1060.06], [699, 'VU', 1060.06], [700, 'LAU', 1470], [800, 'LAU', 1470], [1600, 'LAU', 1330]]) {
    assert.deepEqual([f2(ink).soort, f2(ink).bedrag], [soort, bedrag], `inkomen ${ink}`);
  }
  assert.equal(Math.round((700 + f2(700).bedrag - 699 - f2(699).bedrag) * 100) / 100, 410.94);
});

test('Voorbeeld B: 4-wekenloon + vakantiegeld', () => {
  const ink = E.wiaInkomen({ bedrag: 1200, periode: '4weken' });
  assert.equal(ink.basis, 1305);
  assert.equal(ink.totaal, 1409.4);
  assert.equal(E.uitkering({ ...A, fase: 'FASE2', inkomen: ink.totaal }).bedrag, 1463.42);
});

test('Voorbeeld C: dagloon boven maximum', () => {
  assert.equal(E.uitkering({ fase: 'LGU', wiaMaandloon: 6740.54, dagloonOngemax: 400, inkomen: 2000, datum: D }).bedrag, 3633.69);
});

test('WIA-maandloon boven maximum wordt begrensd', () => {
  assert.equal(E.uitkering({ fase: 'LGU', wiaMaandloon: 8000, inkomen: 0, datum: D }).bedrag, 4718.38);
});

test('Voorbeelden D, E, F en LAU lid 5', () => {
  assert.equal(E.uitkering({ ...A, fase: 'FASE2', inkomen: 1800 }).bedrag, 1190);
  assert.equal(E.uitkering({ fase: 'IVA', wiaMaandloon: 3500, inkomen: 500, datum: D }).bedrag, 2275);
  assert.equal(E.uitkering({ wiaMaandloon: 3500, aoPct: 40, rvcMaand: 2000, datum: D, fase: 'FASE2', inkomen: 0 }).bedrag, 706.71);
  // LAU lid 4 = 0,7 × 800 = 560 < VU 1280,91 → min(VU, 0,7 × (2600 − 1000)) = 1120
  assert.equal(E.uitkering({ wiaMaandloon: 2600, aoPct: 70, rvcMaand: 1800, datum: D, fase: 'FASE2', inkomen: 1000 }).bedrag, 1120);
});

test('indexering: vooruit, begrensd, niet achteruit', () => {
  const r = E.indexeer(3000, '2025-08-01', D);
  assert.deepEqual(r.stappen.map((s) => s.pct), [2.16, 1.86]);
  assert.equal(r.bedrag, Math.round(3000 * 2337 / 2245.8 * 100) / 100);
  assert.equal(E.indexeer(3000, '2023-05-01', D).onvolledig, true);
  assert.equal(E.indexeer(290.67 * 21.75, '2025-01-01', D).bedrag, 6740.54);
  const terug = E.indexeer(3000, '2026-08-01', '2025-03-01');
  assert.equal(terug.bedrag, 3000);
  assert.equal(terug.achteruit, true);
});

test('65%-check zonder urenverschil', () => {
  let c = E.vijfenzestigCheck({ maatmanPerUur: 25, maatmanUren: 40, uurloon: 15, uren: 40 });
  assert.equal(c.pctVanMaatman, 64.8);
  assert.equal(c.status, 'veilig');
  assert.equal(c.grensUurloon, 15.05);
  c = E.vijfenzestigCheck({ maatmanPerUur: 25, maatmanUren: 40, uurloon: 16, uren: 40 });
  assert.equal(c.status, 'boven65');
  assert.equal(c.klasse, '<35%');
  // 8,33% eindejaars erbij tilt 64,8% over de grens (review-bevinding 4)
  c = E.vijfenzestigCheck({ maatmanPerUur: 25, maatmanUren: 40, uurloon: 15, uren: 40, eindejaarsPct: 0.0833 });
  assert.equal(c.status, 'boven65');
  c = E.vijfenzestigCheck({ maatmanPerUur: 25, maatmanUren: 40, uurloon: 12, uren: 40, rvcPerUur: 10 });
  assert.equal(c.status, 'bovenRvc');
});

test('65%-check met minder uren (reductiefactor, doc 14)', () => {
  let c = E.vijfenzestigCheck({ maatmanPerUur: 25, maatmanUren: 40, uurloon: 20, uren: 20, vakantiegeldPct: 0 });
  assert.equal(c.reductiefactor, 0.5);
  assert.equal(c.pctVanMaatman, 40);
  assert.equal(c.kaalPctVanMaatman, 80);
  assert.equal(c.ao, 60);
  assert.equal(c.grensUurloon, 32.5);
  c = E.vijfenzestigCheck({ maatmanPerUur: 25, maatmanUren: 40, uurloon: 20, uren: 20 });
  assert.equal(c.pctVanMaatman, 43.2);
  assert.equal(c.grensUurloon, 30.09);
  assert.equal(c.grensUren, 30.1);
});

test('65%-check: meer uren dan maatman en 20%-ondergrens', () => {
  const c = E.vijfenzestigCheck({ maatmanPerUur: 25, maatmanUren: 32, uurloon: 15, uren: 40 });
  assert.equal(c.pctVanMaatman, 64.8);
  assert.equal(c.maandPctVanMaatman, 81);
  assert.equal(c.status, 'boven65'); // voorzichtig: maandvergelijking telt
  assert.equal(c.grensUurloon, 12.04);
  const laag = E.vijfenzestigCheck({ maatmanPerUur: 25, maatmanUren: 40, uurloon: 15, uren: 10 });
  assert.equal(laag.ondergrens, true);
  assert.equal(laag.ao, null);
});

test('netto 2026 (doc 15): loon 1.600 + WGA 1.470', () => {
  const n = E.netto({ loonMaand: 1600, uitkeringMaand: 1470 });
  assert.equal(n.belastingJaar, 7270.31);
  assert.equal(n.nettoMaandGemiddeld, 2464.14);
  const beide = E.netto({ loonMaand: 1600, uitkeringMaand: 1470, lhkUwv: true });
  assert.ok(beide.bijbetalenJaar > n.bijbetalenJaar + 2500, 'korting bij beide betalers → veel bijbetalen');
});

test('netto 2026 (doc 15): alleen WGA 1.060', () => {
  assert.equal(E.netto({ uitkeringMaand: 1060, lhkUwv: true }).nettoMaandGemiddeld, 940.63);
});

test('toeslagen 2026 (doc 16): alleenstaande met VU 1.060,06, huur 750', () => {
  assert.equal(E.toeslagenwet({ datum: D, uitkeringInclVb: 1060.06 }).bedrag, 687.78); // doc 16: 687,77 (afronding)
  assert.equal(E.zorgtoeslag({ jaarinkomen: 21475 }), 129);
  assert.equal(E.huurtoeslag({ kaleHuur: 750, personen: 1, rekeninkomen: 21475 }), 450);
  assert.equal(E.toeslagenwet({ datum: D, leefsituatie: 'gehuwd', partnerNa1971: true, uitkeringInclVb: 1000 }).bedrag, 0);
  assert.equal(E.zorgtoeslag({ jaarinkomen: 60000 }), 0);
});
