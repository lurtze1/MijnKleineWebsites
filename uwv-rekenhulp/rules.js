/* Regels en bedragen voor de UWV-rekenhulp.
 *
 * Alles wat per datum verandert (of kan veranderen) staat hier, met bron.
 * Nieuwe bedragen? Voeg een regel toe aan PEILDATA met de ingangsdatum. Verander geen oude regels.
 * Onderzoek met volledige bronvermelding: docs/research/.
 *
 * Gewoon script (geen ES module), zodat index.html ook werkt als je het direct opent (file://).
 */
(function (root) {
  'use strict';

  // Bedragen die op 1 januari en 1 juli wijzigen.
  // refMinMaandloon = bruto referentieminimummaandloon 21+ (WML art. 8 lid 1 b). Daaruit volgen:
  //   - de indexatie van WIA-dagloon / WIA-maandloon (WIA art. 14)
  //   - het "minimumloon" voor de WGA-vervolguitkering = refMinMaandloon × 1,08 (WIA art. 12 lid 1 b)
  const PEILDATA = [
    {
      vanaf: '2025-01-01',
      maxDagloon: 290.67,          // [P] doc 02 §3
      refMinMaandloon: 2191.80,    // [S] doc 02 §7.3
      minUurloon21: 14.06,         // [P] doc 02 §7
    },
    {
      vanaf: '2025-07-01',
      maxDagloon: 297.82,          // [S] doc 02 §3, klopt met +2,46%
      refMinMaandloon: 2245.80,    // [P*] doc 02 §7.3
      minUurloon21: 14.40,
    },
    {
      vanaf: '2026-01-01',
      maxDagloon: 304.25,          // [P] doc 02 §3
      refMinMaandloon: 2294.40,    // [P*] doc 02 §7.3 (+2,16%, Stcrt. 2025, 43553)
      minUurloon21: 14.71,
    },
    {
      vanaf: '2026-07-01',
      maxDagloon: 309.91,          // [P] uwv.nl, doc 13
      refMinMaandloon: 2337.00,    // [P] Stcrt. 2026, 16505 (+1,86%, Stcrt. 2026, 20221)
      minUurloon21: 14.99,
    },
    // 2027-01-01: minUurloon21 15,29 is bekend [P], maar refMinMaandloon en maxDagloon
    // nog niet (stand 11-11-2026). Toevoegen zodra SZW de rekenregels publiceert.
  ];

  const WIA = {
    maandFactor: 21.75,              // dagloon → maandloon (DLB / WIA art. 13)
    urenNaarMaand: 52.2 / 12,        // = 4,35; uurloon × uren/week → per maand (CBBS §2.3.9; AIB 21,75/5)
    vierWekenNaarMaand: 21.75 / 20,  // 4-wekenloon → maand (UWV-werkwijze, AIB 4:1)
    vakantiegeldBreuk: 8 / 108,      // deel van de uitkering dat in mei wordt uitbetaald (WIA art. 68)
    vakantietoeslagWml: 0.08,        // WIA art. 12 lid 1 b

    ivaPct: 0.75,                    // art. 51
    ivaKorting: 0.70,                // art. 52 lid 1
    lguPctEersteMaanden: 0.75,       // art. 61 lid 1 (maand 1 en 2)
    lguPct: 0.70,                    // art. 61 lid 1 (vanaf maand 3)
    lauPct: 0.70,                    // art. 61 lid 2 en 4
    inkomenseisFractie: 0.5,         // art. 60: 50% van de RVC per maand

    // Vervolguitkering: % van minimumloon (incl. 8%) per AO-klasse. Art. 61 lid 6.
    vuKlassen: [
      { van: 35, tot: 45, pct: 0.28 },
      { van: 45, tot: 55, pct: 0.35 },
      { van: 55, tot: 65, pct: 0.42 },
      { van: 65, tot: 80, pct: 0.5075 },
      { van: 80, tot: 101, pct: 0.70 },
    ],

    grensWga: 35,                    // AO < 35%: geen WGA (art. 5)
    grensIva: 80,                    // AO ≥ 80% + duurzaam: IVA (art. 4)
    vijfenzestig: 0.65,              // meer dan 65% van maatman per uur verdienen → AO < 35%
    praktischOndergrens: 0.20,       // art. 9a lid 4 Schattingsbesluit: ≤ 20% → gewone beoordeling
    ivaOnderzoekGrens: 0.20,         // art. 52 lid 2: 12 mnd > 20% maatman per maand → onderzoek IVA
    uitloopNaFeitelijkWerk: 12,      // maanden, art. 56 lid 3
    uitloopNaHerbeoordeling: 2,      // maanden, art. 56 lid 2
    wijzigingVertraging: 2,          // kalendermaanden, art. 60 lid 2 / 61 lid 7
    herlevingJaren: 5,               // art. 57
    praktischBeoordelenTot: '2027-07-01', // [S/O] art. 9a vervalt bij KB; secundair: ~1-7-2027
  };

  const ZW = {
    pct: 0.70,                       // ZW art. 29
    maxWeken: 104,
    wachtdagen: 2,
    ezwbNaWeken: 52,                 // Eerstejaars ZW-beoordeling
    ezwbGrens: 0.65,                 // ZW stopt als je MEER dan 65% van maatman kunt verdienen (art. 19aa)
  };

  const NO_RISK = {
    pct: 0.70,
    pctEersteJaarOpVerzoek: 1.00,    // max. het werkelijk doorbetaalde loon (art. 29b)
    jarenBijWia: 5,                  // WIA vóór/tijdens dienstverband, ook 35-min
    onbeperktVoor: ['Wajong', 'Wsw', 'beschut werk', 'doelgroepregister', 'WIW/ID-baan'],
    meldenBinnenWeken: 6,
  };

  const LKV_2026 = {
    arbeidsgehandicapt: { perUur: 3.05, maxPerJaar: 6000, jaren: 3 },
    banenafspraak: { perUur: 1.01, maxPerJaar: 2000, jaren: null }, // zolang in dienst
    herplaatsen: { perUur: 3.05, maxPerJaar: 6000, jaren: 1 },
  };

  const api = { PEILDATA, WIA, ZW, NO_RISK, LKV_2026 };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.UwvRules = api;
})(typeof window !== 'undefined' ? window : globalThis);
