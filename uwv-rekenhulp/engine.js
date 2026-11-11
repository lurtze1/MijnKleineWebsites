/* Rekenkern van de UWV-rekenhulp: pure functies, geen DOM.
 * Elke uitkomst geeft ook terug welke regel is toegepast (`regel`), zodat de UI kan uitleggen waarom.
 * Bedragen bruto, per kalendermaand, inclusief de vakantiegeldcomponent tenzij anders vermeld.
 */
(function (root) {
  'use strict';
  const R = (typeof module !== 'undefined' && module.exports) ? require('./rules.js') : root.UwvRules;
  const { PEILDATA, WIA } = R;

  const rond = (x) => Math.round(x * 100) / 100;
  const pct2 = (x) => Math.round(x * 10000) / 100;
  const eur = (x) => '€ ' + rond(x).toLocaleString('nl-NL', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  // ---------- Peildata ----------

  function regelsOp(datum) {
    let gevonden = PEILDATA[0];
    for (const p of PEILDATA) if (p.vanaf <= datum) gevonden = p;
    return gevonden;
  }

  /** Zijn de bedragen voor deze datum bekend? Bedragen wijzigen op 1 jan en 1 jul. */
  function peildatumStatus(datum) {
    if (datum < PEILDATA[0].vanaf) return 'teVroeg';
    const laatste = PEILDATA[PEILDATA.length - 1].vanaf;
    const [j, m] = laatste.split('-').map(Number);
    const volgende = m < 7 ? `${j}-07-01` : `${j + 1}-01-01`;
    return datum >= volgende ? 'teLaat' : 'ok';
  }

  const maxMaandloon = (datum) => rond(regelsOp(datum).maxDagloon * WIA.maandFactor);
  const wiaMinimumloon = (datum) => rond(regelsOp(datum).refMinMaandloon * (1 + WIA.vakantietoeslagWml));

  /** Indexeer een WIA-maandloon van `vanDatum` naar `totDatum` (WIA art. 14), alleen vooruit,
   *  en nooit boven het maximum van `totDatum`. */
  function indexeer(bedrag, vanDatum, totDatum) {
    if (vanDatum > totDatum) return { bedrag, stappen: [], onvolledig: false, achteruit: true };
    const van = regelsOp(vanDatum), tot = regelsOp(totDatum);
    const stappen = [];
    let vorige = van;
    for (const p of PEILDATA) {
      if (p.vanaf > van.vanaf && p.vanaf <= tot.vanaf) {
        stappen.push({ datum: p.vanaf, pct: pct2(p.refMinMaandloon / vorige.refMinMaandloon - 1) });
        vorige = p;
      }
    }
    return {
      bedrag: Math.min(rond(bedrag * tot.refMinMaandloon / van.refMinMaandloon), maxMaandloon(totDatum)),
      stappen,
      onvolledig: vanDatum < PEILDATA[0].vanaf, // verhogingen van vóór de oudste peildatum ontbreken
      achteruit: false,
    };
  }

  // ---------- Inkomen ----------

  /** Inkomen per kalendermaand zoals UWV het voor de WIA telt (AIB 3:2, 4:1): opgebouwd vakantiegeld
   *  en eindejaars tellen elke maand mee, een eenmalige bonus in de maand van betaling. */
  function wiaInkomen({ bedrag = 0, periode = 'maand', urenPerWeek = 0, vakantiegeldPct = 0.08, allIn = false, eindejaarsOpbouwPct = 0, bonusDezeMaand = 0 }) {
    const basis = periode === 'uur' ? bedrag * urenPerWeek * WIA.urenNaarMaand
      : periode === '4weken' ? bedrag * WIA.vierWekenNaarMaand : bedrag;
    const vakantiegeld = allIn ? 0 : basis * vakantiegeldPct;
    const eindejaars = basis * eindejaarsOpbouwPct;
    return {
      basis: rond(basis), vakantiegeld: rond(vakantiegeld), eindejaars: rond(eindejaars), bonus: rond(bonusDezeMaand),
      totaal: rond(basis + vakantiegeld + eindejaars + bonusDezeMaand),
    };
  }

  // ---------- Uitkering ----------

  /** AO-klasse met vervolguitkeringspercentage (art. 61 lid 6). */
  function klasse(aoPct) {
    if (aoPct < WIA.grensWga) return { pct: 0, label: '<35%' };
    const k = WIA.vuKlassen.find((c) => aoPct < c.tot) || WIA.vuKlassen[WIA.vuKlassen.length - 1];
    return { pct: k.pct, label: k.tot > 100 ? '80–100%' : `${k.van}–${k.tot}%` };
  }

  /**
   * WIA-uitkering voor één kalendermaand.
   * fase: 'IVA' | 'LGU' | 'FASE2'. wiaMaandloon wordt begrensd op het maximum van `datum` (art. 13).
   * dagloonOngemax: alleen als je dagloon zonder maximum hoger lag (factor C/D in art. 52/61).
   */
  function uitkering({ fase, wiaMaandloon, inkomen = 0, datum, dagloonOngemax = null, aoPct = 0, rvcMaand = 0, geenInkomenseis = false, lguMaand = 3 }) {
    const ml = Math.min(wiaMaandloon, maxMaandloon(datum));
    const factor = dagloonOngemax ? Math.min(1, ml / WIA.maandFactor / dagloonOngemax) : 1;
    const uit = (soort, b, regel, extra = {}) => {
      const bedrag = rond(Math.max(0, b));
      return { soort, bedrag, perMaandOpRekening: rond(bedrag * (1 - WIA.vakantiegeldBreuk)), regel, maandloon: ml, ...extra };
    };

    if (fase === 'IVA') {
      return uit('IVA', WIA.ivaPct * ml - WIA.ivaKorting * inkomen * factor, 'IVA = 75% × WIA-maandloon − 70% × je inkomen (WIA art. 51–52).');
    }
    if (fase === 'LGU') {
      const p = lguMaand <= 2 ? WIA.lguPctEersteMaanden : WIA.lguPct;
      return uit('LGU', p * (ml - inkomen * factor), `LGU = ${p * 100}% × (WIA-maandloon − je inkomen) (WIA art. 61 lid 1). In deze fase is er geen 50%-regel.`);
    }

    // FASE2: per kalendermaand getoetst (art. 60)
    const H = Math.min(wiaMinimumloon(datum), ml);
    const k = klasse(aoPct);
    const vu = k.pct * H;
    const lauInkomen = WIA.lauPct * (ml - inkomen * factor);
    const vuTekst = `${pct2(k.pct).toLocaleString('nl-NL')}% × ${H < wiaMinimumloon(datum) ? 'je WIA-maandloon (lager dan het minimumloon)' : 'het minimumloon incl. vakantiegeld'}`;
    const extra = { vu: rond(vu), vuTekst, klasse: k.label };

    if (geenInkomenseis) {
      return uit('LAU', lauInkomen, 'Geen inkomenseis: LAU = 70% × (WIA-maandloon − je inkomen) (art. 61 lid 2).', extra);
    }
    const inkomenseis = rond(WIA.inkomenseisFractie * rvcMaand);
    extra.inkomenseis = inkomenseis;
    if (inkomen < inkomenseis) {
      return uit('VU', vu, `Je inkomen is lager dan 50% van je RVC (${eur(inkomenseis)}): vervolguitkering = ${vuTekst} (art. 62). Wat je verdient wordt niet verrekend.`, extra);
    }
    if (inkomen >= rvcMaand) {
      return uit('LAU', lauInkomen, 'Je inkomen is minstens je RVC: LAU = 70% × (WIA-maandloon − je inkomen) (art. 61 lid 2). Elke extra euro kost 70 cent uitkering.', extra);
    }
    let lau = WIA.lauPct * (ml - rvcMaand * factor);
    let regel = 'Je inkomen ligt tussen 50% en 100% van je RVC: LAU = 70% × (WIA-maandloon − RVC) (art. 61 lid 4). Extra verdienen kost je hier niets.';
    if (lau < vu) {
      lau = Math.min(vu, lauInkomen);
      regel += ' Opgehoogd richting de vervolguitkering (art. 61 lid 5).';
    }
    return uit('LAU', lau, regel, extra);
  }

  /** Reeks voor de grafiek: loon + uitkering bij oplopend inkomen, met exacte punten rond de inkomenseis. */
  function inkomensReeks(params, tot, stap) {
    const punten = [];
    for (let i = 0; i <= tot + 1e-9; i += stap) punten.push(i);
    if (params.fase === 'FASE2' && !params.geenInkomenseis && params.rvcMaand) {
      const eis = WIA.inkomenseisFractie * params.rvcMaand;
      punten.push(eis - 0.01, eis);
      punten.sort((a, b) => a - b);
    }
    return punten.map((ink) => {
      const u = uitkering({ ...params, inkomen: ink });
      return { inkomen: ink, uitkering: u.bedrag, soort: u.soort, totaal: ink + u.bedrag };
    });
  }

  // ---------- De 65%-grens ----------

  /**
   * Waar sta je ten opzichte van de 65%-grens (WIA art. 5 / 56 lid 3)?
   * Werk je minder uren dan je maatman, dan gaat je uurloon × (gewerkte uren / maatman-uren)
   * (Beleidsregel uurloonschatting 2008 art. 3; CRvB 2015:1919, 2024:1581). Zie docs/research/14.
   * Vakantiegeld en vaste eindejaars tellen mee zoals ze worden opgebouwd (Schattingsbesluit art. 11a).
   */
  function vijfenzestigCheck({ maatmanPerUur, maatmanUren, uurloon, uren, vakantiegeldPct = 0.08, eindejaarsPct = 0, rvcPerUur = null }) {
    const opslag = 1 + vakantiegeldPct + eindejaarsPct;
    const effectief = uurloon * opslag;
    const urenRatio = uren / maatmanUren;
    const red = Math.min(1, urenRatio);
    const pct = (effectief * red) / maatmanPerUur;
    // Meer uren dan de maatman: UWV toetst art. 56 lid 3 waarschijnlijk op maandinkomen [O, doc 14 §3.3].
    // Voorzichtig: toets op het hoogste van beide.
    const toetsPct = (effectief * urenRatio) / maatmanPerUur; // = weekloon / weekloon maatman
    const ondergrens = pct <= WIA.praktischOndergrens; // art. 9a lid 4: dan theoretische schatting

    let status = 'veilig';
    if (toetsPct > WIA.vijfenzestig) status = 'boven65';
    else if (rvcPerUur != null && effectief * red > rvcPerUur) status = 'bovenRvc';

    return {
      reductiefactor: Math.round(red * 1000) / 1000,
      opslagPct: pct2(opslag - 1),
      effectiefUurloon: rond(effectief),
      vergelijkbaarUurloon: rond(effectief * red),
      pctVanMaatman: pct2(pct),
      kaalPctVanMaatman: pct2(effectief / maatmanPerUur),
      // meer uren dan de maatman: toetst UWV mogelijk op maandinkomen [O]
      maandPctVanMaatman: urenRatio > 1 ? pct2(toetsPct) : null,
      ao: ondergrens ? null : rond(Math.max(0, (1 - pct) * 100)),
      klasse: ondergrens ? null : klasse(Math.max(0, (1 - pct) * 100)).label,
      // bruto uurloon excl. vakantiegeld waarboven je over de grens gaat, bij je huidige uren
      grensUurloon: rond((WIA.vijfenzestig * maatmanPerUur) / (opslag * urenRatio)),
      // uren per week waarboven je over de grens gaat, bij je huidige uurloon
      grensUren: Math.round(((WIA.vijfenzestig * maatmanPerUur * maatmanUren) / effectief) * 10) / 10,
      ondergrens,
      status,
    };
  }

  const api = { regelsOp, peildatumStatus, maxMaandloon, wiaMinimumloon, indexeer, wiaInkomen, klasse, uitkering, inkomensReeks, vijfenzestigCheck };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.UwvEngine = api;
})(typeof window !== 'undefined' ? window : globalThis);
