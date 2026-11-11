/* Rekenkern van de UWV-rekenhulp: pure functies, geen DOM.
 * Elke uitkomst geeft ook terug WELKE regel is toegepast (veld `regel`), zodat de UI kan uitleggen waarom.
 * Bedragen bruto, per kalendermaand, inclusief de vakantiegeldcomponent tenzij anders vermeld.
 */
(function (root) {
  'use strict';
  const R = (typeof module !== 'undefined' && module.exports) ? require('./rules.js') : root.UwvRules;
  const { PEILDATA, WIA } = R;

  const rond = (x) => Math.round(x * 100) / 100;

  // ---------- Datum en peildata ----------

  function regelsOp(datum) {
    let gevonden = null;
    for (const p of PEILDATA) if (p.vanaf <= datum) gevonden = p;
    return gevonden || PEILDATA[0];
  }

  function wiaMinimumloon(datum) {
    return rond(regelsOp(datum).refMinMaandloon * (1 + WIA.vakantietoeslagWml));
  }

  /** Indexeer een WIA-dagloon/maandloon van `vanDatum` naar `totDatum` (WIA art. 14).
   *  Het bedrag gaat mee met het referentieminimummaandloon. */
  function indexeer(bedrag, vanDatum, totDatum) {
    const eerste = PEILDATA[0].vanaf;
    const onvolledig = vanDatum < eerste;
    const van = regelsOp(vanDatum);
    const tot = regelsOp(totDatum);
    const stappen = PEILDATA
      .filter((p) => p.vanaf > van.vanaf && p.vanaf <= tot.vanaf)
      .map((p, i, arr) => {
        const vorige = i === 0 ? van : arr[i - 1];
        return { datum: p.vanaf, pct: Math.round((p.refMinMaandloon / vorige.refMinMaandloon - 1) * 10000) / 100 };
      });
    return {
      bedrag: rond(bedrag * tot.refMinMaandloon / van.refMinMaandloon),
      stappen,
      onvolledig, // true: bedrag is van vóór de oudste peildatum in rules.js, indexatie daarvoor ontbreekt
    };
  }

  // ---------- Inkomen ----------

  /** Inkomen per kalendermaand zoals UWV het voor de WIA telt (AIB 3:2, 4:1).
   *  - opgebouwd vakantiegeld telt elke maand mee, uitbetaling in mei niet
   *  - 4-wekenloon × 21,75/20, uurloon × uren × 4,35
   *  - eenmalige bonus telt in de maand van betaling
   */
  function wiaInkomen({
    bedrag = 0, periode = 'maand', urenPerWeek = 0,
    vakantiegeldPct = 0.08, allIn = false,
    eindejaarsOpbouwPct = 0, bonusDezeMaand = 0,
  }) {
    let basis;
    if (periode === 'uur') basis = bedrag * urenPerWeek * WIA.urenNaarMaand;
    else if (periode === '4weken') basis = bedrag * WIA.vierWekenNaarMaand;
    else basis = bedrag;
    const vakantiegeld = allIn ? 0 : basis * vakantiegeldPct;
    const eindejaars = basis * eindejaarsOpbouwPct;
    return {
      basis: rond(basis),
      vakantiegeld: rond(vakantiegeld),
      eindejaars: rond(eindejaars),
      bonus: rond(bonusDezeMaand),
      totaal: rond(basis + vakantiegeld + eindejaars + bonusDezeMaand),
    };
  }

  // ---------- Uitkering ----------

  function vuPercentage(aoPct) {
    if (aoPct < WIA.grensWga) return 0;
    const k = WIA.vuKlassen.find((c) => aoPct >= c.van && aoPct < c.tot);
    return k ? k.pct : WIA.vuKlassen[WIA.vuKlassen.length - 1].pct;
  }

  function aoKlasse(aoPct) {
    if (aoPct < WIA.grensWga) return '<35%';
    const k = WIA.vuKlassen.find((c) => aoPct >= c.van && aoPct < c.tot);
    return k ? (k.tot > 100 ? '80–100%' : `${k.van}–${k.tot}%`) : '80–100%';
  }

  /**
   * Bereken de WIA-uitkering voor één kalendermaand.
   * fase: 'IVA' | 'LGU' | 'FASE2'
   * wiaMaandloon: (geïndexeerd, gemaximeerd) WIA-maandloon
   * dagloonOngemax: optioneel; alleen nodig als je dagloon boven het maximum lag
   * inkomen: WIA-relevant inkomen deze maand (zie wiaInkomen)
   */
  function uitkering({
    fase, wiaMaandloon, inkomen = 0, datum,
    dagloonOngemax = null, aoPct = null, rvcMaand = null,
    geenInkomenseis = false, lguMaand = 3,
  }) {
    const regels = regelsOp(datum);
    const gemaxDagloon = Math.min(wiaMaandloon / WIA.maandFactor, regels.maxDagloon);
    const factor = dagloonOngemax ? Math.min(1, gemaxDagloon / dagloonOngemax) : 1;
    const naarMaand = (b) => ({ bedrag: rond(Math.max(0, b)), perMaandOpRekening: rond(Math.max(0, b) * (1 - WIA.vakantiegeldBreuk)) });

    if (fase === 'IVA') {
      const b = WIA.ivaPct * wiaMaandloon - WIA.ivaKorting * inkomen * factor;
      return { soort: 'IVA', ...naarMaand(b), regel: 'IVA = 75% × maandloon − 70% × inkomen (WIA art. 51–52)' };
    }

    if (fase === 'LGU') {
      const pct = lguMaand <= 2 ? WIA.lguPctEersteMaanden : WIA.lguPct;
      const b = pct * (wiaMaandloon - inkomen * factor);
      return {
        soort: 'LGU', ...naarMaand(b),
        regel: `LGU = ${pct * 100}% × (maandloon − inkomen) (WIA art. 61 lid 1). Geen 50%-regel in deze fase.`,
      };
    }

    // FASE2: loonaanvulling (LAU) of vervolguitkering (VU), per kalendermaand getoetst (art. 60)
    const H = Math.min(wiaMinimumloon(datum), wiaMaandloon);
    const vu = vuPercentage(aoPct) * H;
    const lauBovenRvc = WIA.lauPct * (wiaMaandloon - inkomen * factor);

    if (geenInkomenseis) {
      return { soort: 'LAU', ...naarMaand(lauBovenRvc), regel: 'Geen inkomenseis (RVC ≤ 20%): LAU = 70% × (maandloon − inkomen) (art. 61 lid 2)' };
    }
    const inkomenseis = WIA.inkomenseisFractie * rvcMaand;
    if (inkomen < inkomenseis) {
      return {
        soort: 'VU', ...naarMaand(vu), inkomenseis: rond(inkomenseis),
        regel: `Inkomen < 50% van RVC (€ ${rond(inkomenseis)}): vervolguitkering = ${rond(vuPercentage(aoPct) * 10000) / 100}% × minimumloon (art. 62). Je inkomen wordt niet verrekend.`,
      };
    }
    if (inkomen >= rvcMaand) {
      return {
        soort: 'LAU', ...naarMaand(lauBovenRvc), inkomenseis: rond(inkomenseis),
        regel: 'Inkomen ≥ RVC: LAU = 70% × (maandloon − inkomen) (art. 61 lid 2). Elke extra euro kost 70 cent uitkering.',
      };
    }
    let lau = WIA.lauPct * (wiaMaandloon - rvcMaand * factor);
    let regel = 'Inkomen tussen 50% en 100% van RVC: LAU = 70% × (maandloon − RVC) (art. 61 lid 4). Extra verdienen kost je hier niets.';
    if (lau < vu) {
      lau = Math.min(vu, lauBovenRvc);
      regel += ' Opgehoogd tot de vervolguitkering (art. 61 lid 5).';
    }
    return { soort: 'LAU', ...naarMaand(lau), inkomenseis: rond(inkomenseis), regel };
  }

  /** Reeks voor een grafiek: totaal bruto (inkomen + uitkering) bij oplopend inkomen. */
  function inkomensReeks(params, { van = 0, tot, stap = 25 }) {
    const out = [];
    for (let ink = van; ink <= tot + 1e-9; ink += stap) {
      const u = uitkering({ ...params, inkomen: ink });
      out.push({ inkomen: rond(ink), uitkering: u.bedrag, soort: u.soort, totaal: rond(ink + u.bedrag) });
    }
    return out;
  }

  // ---------- De 65%-grens ----------

  /**
   * Waar sta je ten opzichte van de 65%-grens (WIA art. 5 / 56 lid 3)?
   *
   * Werk je minder uren dan je maatman, dan wordt je feitelijke uurloon vermenigvuldigd met de
   * reductiefactor = feitelijk gewerkte uren / maatman-uren (Beleidsregel uurloonschatting 2008 art. 3;
   * CRvB 2015:1919 en 2024:1581). Let op: je ECHT gewerkte uren, niet de uren uit je FML.
   * In feite vergelijkt UWV dus je weekloon met dat van je maatman. Zie docs/research/14.
   *
   * Vakantiegeld telt mee zoals het wordt opgebouwd (Schattingsbesluit art. 11a). Standaard tellen we
   * 8% mee; dat is ook de voorzichtige kant.
   */
  function vijfenzestigCheck({
    maatmanPerUur, uurloon, uren, maatmanUren,
    vakantiegeldPct = 0.08, inclVakantiegeld = true, rvcPerUur = null,
  }) {
    const vg = inclVakantiegeld ? 1 + vakantiegeldPct : 1;
    const effectief = uurloon * vg;
    const red = uren && maatmanUren ? Math.min(1, uren / maatmanUren) : 1;
    const gecorrigeerd = effectief * red; // vergelijkbaar uurloon
    const pct = gecorrigeerd / maatmanPerUur;
    const aoFeitelijk = Math.max(0, (1 - pct) * 100);
    // Grens: het bruto uurloon (zoals op je loonstrook, excl. vakantiegeld) waarboven je > 65% zit
    const grensUurloon = (WIA.vijfenzestig * maatmanPerUur) / (vg * red);
    const grensUren = red < 1 ? (WIA.vijfenzestig * maatmanPerUur * maatmanUren) / effectief : null;

    let status;
    if (pct > WIA.vijfenzestig) status = 'boven65';
    else if (rvcPerUur != null && gecorrigeerd > rvcPerUur) status = 'bovenRvc';
    else status = 'veilig';

    return {
      reductiefactor: Math.round(red * 1000) / 1000,
      effectiefUurloon: rond(effectief),
      vergelijkbaarUurloon: rond(gecorrigeerd),
      pctVanMaatman: Math.round(pct * 10000) / 100,
      kaalPctVanMaatman: Math.round((effectief / maatmanPerUur) * 10000) / 100, // zonder urencorrectie, ter uitleg
      aoAlsUwvFeitelijkLoonNeemt: rond(aoFeitelijk),
      klasseAlsUwvFeitelijkLoonNeemt: aoKlasse(aoFeitelijk),
      grensUurloon: rond(grensUurloon),
      margePerUur: rond(grensUurloon - uurloon),
      // bij gelijk uurloon: vanaf hoeveel uur per week ga je over de grens? (> maatmanUren = nooit)
      grensUren: grensUren == null ? null : Math.round(grensUren * 10) / 10,
      praktischBeoordelenMogelijk: pct > WIA.praktischOndergrens,
      status,
      onzeker: 'Hoe UWV de toets "1 jaar meer dan 65%" (art. 56 lid 3) precies uitvoert, is niet gepubliceerd; waarschijnlijk op maandinkomen, wat op hetzelfde uitkomt zolang je niet meer uren werkt dan je maatman.',
    };
  }

  // ---------- Tijdlijn ----------

  function plusMaanden(datum, n) {
    const [j, m, d] = datum.split('-').map(Number);
    const t = new Date(Date.UTC(j, m - 1 + n, 1));
    const laatste = new Date(Date.UTC(t.getUTCFullYear(), t.getUTCMonth() + 1, 0)).getUTCDate();
    t.setUTCDate(Math.min(d, laatste));
    return t.toISOString().slice(0, 10);
  }

  /** Tot wanneer loopt je WGA als UWV vaststelt dat je < 35% AO bent? (WIA art. 56)
   *  reden: 'feitelijkWerk' (je verdient > 65%) → 1 jaar; 'theoretisch' → 2 maanden.
   *  Nooit vóór het einde van de LGU. */
  function eindeWga({ datumVaststelling, reden = 'feitelijkWerk', lguEinde = null }) {
    const n = reden === 'feitelijkWerk' ? WIA.uitloopNaFeitelijkWerk : WIA.uitloopNaHerbeoordeling;
    let einde = plusMaanden(datumVaststelling, n);
    if (lguEinde && lguEinde > einde) einde = lguEinde;
    return {
      einde,
      herlevingTot: plusMaanden(datumVaststelling, WIA.herlevingJaren * 12),
      regel: reden === 'feitelijkWerk'
        ? 'WIA art. 56 lid 3: je verdient met werk meer dan 65% → uitkering loopt nog maximaal 1 jaar door (niet vóór einde LGU).'
        : 'WIA art. 56 lid 2: < 35% AO na herbeoordeling → WGA eindigt 2 maanden later (niet vóór einde LGU).',
    };
  }

  const api = {
    regelsOp, wiaMinimumloon, indexeer, wiaInkomen, vuPercentage, aoKlasse,
    uitkering, inkomensReeks, vijfenzestigCheck, eindeWga, plusMaanden,
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.UwvEngine = api;
})(typeof window !== 'undefined' ? window : globalThis);
