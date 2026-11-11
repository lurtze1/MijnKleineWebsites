# 02 – Hoogte van de WW: dagloon, maandloon en bedragen

> Onderzoeksdatum: **11 november 2026**. Alle bedragen zijn **bruto**, tenzij anders vermeld.
> Betrouwbaarheidslabels:
> - **[P]** = bevestigd via primaire bron (wetten.overheid.nl, uwv.nl, rijksoverheid.nl, belastingdienst.nl, Staatscourant)
> - **[P\*]** = primair, maar via een letterlijke overname van een SZW-document door een derde (bv. AWVN-kopie van de SZW-rekenregels) of een overheidspagina die ik alleen samengevat kon lezen
> - **[S]** = alleen secundaire bron (vakmedia, adviesbureaus)
> - **[O]** = onzeker / niet geverifieerd / eigen afleiding

---

## 1. Het grote plaatje in 5 stappen

1. UWV bepaalt je **dagloon**: je SV-loon over een **referteperiode van 1 jaar**, inclusief het **opgebouwde** vakantiegeld en de opgebouwde eindejaarsuitkering/13e maand e.d. (arbeidsvoorwaardenbedrag, AVWB), gedeeld door **261** (of door het aantal "dagloondagen" als je niet het hele jaar loon had).
2. Het dagloon wordt begrensd op het **maximumdagloon** (per 1 juli 2026: **€ 309,91**).
3. **WW-maandloon = dagloon × 21,75** (bij een volledige kalendermaand).
4. **Bruto uitkering = 75%** van het maandloon in de eerste 2 maanden, daarna **70%** (min verrekende inkomsten).
5. Van dat bedrag wordt **8/108 gereserveerd als vakantiegeld** (uitbetaald in mei); de rest (100/108) wordt maandelijks uitbetaald, na inhouding van loonheffing.

Belangrijkste valkuil: **het WW-maandloon en het maximumdagloon zijn INCLUSIEF vakantiegeld.** Het bedrag dat je maandelijks ziet binnenkomen is dus kleiner dan "70% van je maandloon": het vakantiegeld-deel wordt eruit gehaald en apart in mei betaald. Zie §6.

---

## 2. Het WW-dagloon

### 2.1 Uitleg in gewone taal

UWV kijkt naar wat je verdiende in het jaar vóór je werkloos werd, maar **niet tot de dag van werkloosheid**: de periode stopt aan het eind van de **een-na-laatste** loonperiode (maand of 4 weken) vóór de periode waarin je werkloos werd. Werd je bijvoorbeeld werkloos op 1 november 2026 en had je maandloon, dan is de laatste volledige maand vóór november oktober; de een-na-laatste maand is september. De referteperiode loopt dan grofweg van 1 oktober 2025 t/m 30 september 2026. [P, interpretatie van art. 2 lid 1 Dagloonbesluit en UWV-uitleg; het exacte voorbeeld is eigen toepassing → O voor randgevallen]

Al het **SV-loon** (loon waarover premies werknemersverzekeringen worden betaald) bij **alle werkgevers** in die periode telt op. Vakantiegeld en AVWB (eindejaarsuitkering, 13e maand, IKB) worden "genormaliseerd": wat er in de periode **uitbetaald** is gaat eraf, en wat er in de periode **opgebouwd** is komt erbij. Zo maakt het niet uit of je vakantiegeld net vóór of net na de referteperiode is uitbetaald.

Dat totaal wordt gedeeld door **261** (gemiddeld aantal werkdagen ma–vr in een jaar). Had je niet het hele jaar loon, dan deel je door het aantal **dagloondagen** (alle dagen behalve za/zo) in de maanden/4-wekenperiodes waarover je werkgever loonaangifte deed.

### 2.2 Wettelijke formule (art. 5 lid 1 Dagloonbesluit werknemersverzekeringen)

```
dagloon = (A − B + C) / D
A = SV-loon in referteperiode bij alle werkgevers
B = in referteperiode uitbetaald vakantiegeld (uit opgebouwd bedrag) + uitbetalingen uit arbeidsvoorwaardenbedrag
C = in referteperiode opgebouwd vakantiegeld + opgebouwd arbeidsvoorwaardenbedrag
D = 261 bij een referteperiode van een heel jaar; anders het aantal dagloondagen
```
[P] Bron: Dagloonbesluit werknemersverzekeringen, BWBR0033471, art. 5, versie geldend vanaf 01-01-2025 (geraadpleegd 11-11-2026): https://wetten.overheid.nl/BWBR0033471

Wettelijke basis in de WW zelf: art. 1b lid 1 WW (dagloon = 1/261 deel van het loon in het jaar vóór het arbeidsurenverlies, gemaximeerd op het bedrag van art. 17 Wfsv). [P] https://wetten.overheid.nl/BWBR0004045/2026-07-01 (versie geldig 01-07-2026 t/m 07-10-2026; er is een nieuwere versie vanaf 08-10-2026 die ik niet op wijzigingen in art. 1b/47 heb gecontroleerd → [O])

### 2.3 Referteperiode – details (art. 2 Dagloonbesluit) [P]

| Situatie | Regel |
|---|---|
| Hoofdregel | 1 jaar, eindigend op de laatste dag van het **tweede aangiftetijdvak** vóór het aangiftetijdvak waarin het arbeidsurenverlies (werkloosheid) intreedt (lid 1). Aangiftetijdvak = maand of 4 weken (art. 1 onder a). |
| Eerder WW-recht binnen die periode | Referteperiode is korter: begint op de eerste werkloosheidsdag van dat eerdere recht (lid 2). |
| Geen loon / geen recht op loon in de referteperiode | Periode van begin dienstbetrekking tot arbeidsurenverlies (lid 4). |
| Dienstbetrekking begon ná de referteperiode | Periode eindigt op de dag vóór het arbeidsurenverlies (lid 6). |

UWV formuleert het voor de WW als: *"eindigt op de laatste dag van de een-na-laatste maand, of van de op een na laatste volledige 4-wekenperiode, vóór werkloosheid"*. [P] https://www.uwv.nl/nl/premies-bedragen/dagloon-berekenen (geraadpleegd 11-11-2026)

### 2.4 Welk loon telt mee?

| Looncomponent | Telt mee? | Toelichting | Betrouwbaarheid |
|---|---|---|---|
| Basissalaris | Ja | onderdeel SV-loon (art. 3 lid 1 Dagloonbesluit: "loon in de zin van artikel 16 van de Wfsv") | [P] |
| Vakantiegeld | Ja, **opgebouwd** bedrag in de referteperiode (niet het toevallig uitbetaalde bedrag) | B/C-correctie art. 5 | [P] |
| 13e maand, eindejaarsuitkering, IKB | Ja, als AVWB: **opgebouwd** bedrag in de referteperiode | UWV noemt deze expliciet als AVWB | [P] |
| Bonussen, overwerk, ploegentoeslag, onregelmatigheidstoeslag | Ja, voor zover SV-loon en genoten in de referteperiode | volgt uit "SV-loon"; niet als losse posten op UWV-pagina genoemd | [O] (logisch afgeleid, niet expliciet bevestigd) |
| Eerdere WW/WAO/WIA-uitkering, Toeslagenwet-toeslag | Nee | uitgesloten in art. 3 Dagloonbesluit | [P] |
| Ziekengeld (ZW) in de referteperiode | Ja, maar **opgehoogd naar 100%**: (100 × ziekengeld) / 70 (of het hogere uitkeringspercentage) | art. 5 lid 7 | [P] |
| Transitievergoeding / ontslagvergoeding | Valt in de praktijk buiten de referteperiode (die eindigt 2 loonperiodes vóór de werkloosheid). UWV: transitievergoeding hoeft je **niet door te geven** als inkomsten bij WW. Of een ontslagvergoeding SV-loon is (en dus theoretisch kan meetellen als die binnen de referteperiode valt) heb ik niet primair kunnen bevestigen. | https://www.uwv.nl/nl/ontslag/transitievergoeding | [P] voor "niet doorgeven"; [O] voor dagloon-effect |
| Latere loonsverhoging (na referteperiode) | Nee | UWV: "Een latere loonsverhoging wordt niet meegerekend." | [P] |

### 2.5 Maanden zonder loon, ziekte, verlof, zwangerschap

- **Maanden/4-wekenperiodes zonder loon** (behalve door verlof of staking): tellen niet mee in de deler. D = aantal dagloondagen in de periodes waarin wél loon was (art. 5 lid 4–5). [P]
- **Ziekte, (onbetaald) verlof of werkstaking met minder of geen loon**: voor die periode gebruikt UWV het loon uit de **laatste volledige ongestoorde loonperiode daarvóór** binnen de referteperiode (art. 6 lid 1); is die er niet, de eerstvolgende volledige periode erna (lid 2); anders het overeengekomen loon (lid 3). **Alleen als dat gunstiger is** – het mag niet tot een lager dagloon leiden (lid 4). [P]
- **Zwangerschap/bevallingsverlof**: niet expliciet in de door mij gelezen tekst van art. 6 aangetroffen. Een WAZO-uitkering via de werkgever is doorgaans SV-loon, maar dat heb ik niet primair geverifieerd. [O]
- **D = 0** (helemaal geen loon in de referteperiode): dagloon = overeengekomen loon in het tijdvak van werkloosheid / dagloondagen (of / 21,75 bij maandtijdvak) (art. 5 lid 6). [P]

### 2.6 Meerdere banen

- Het loon bij **alle werkgevers** in de referteperiode telt op in A (art. 5 lid 1). [P]
- Verlies je maar **één van meerdere banen**, dan speelt de WW-systematiek van arbeidsurenverlies en inkomstenverrekening (art. 47 WW, factor C/D). De precieze dagloonvaststelling bij gedeeltelijke werkloosheid valt buiten dit document → zie onderzoek "recht/urenverlies". [O]
- **Garantiedagloon / dagloongarantie**: word je opnieuw werkloos na een lager betaalde baan, dan kan UWV het oude (hogere) dagloon gebruiken als je minimaal 1 jaar bij de vorige werkgever werkte en er maximaal **54 weken** tussen zit (art. 12 Dagloonbesluit; UWV-pagina hoogte WW). [P] https://www.uwv.nl/nl/ww/hoogte-ww

### 2.7 Parttime

Het dagloon is een gemiddelde over 261 dagen, ook als je parttime werkte. Een parttimer heeft dus simpelweg een lager dagloon; er wordt niet per gewerkte dag gerekend. [P] (UWV dagloon-pagina)

### 2.8 Herziening (indexatie) en jongeren

- Het dagloon wordt **per 1 januari en 1 juli** verhoogd met hetzelfde percentage als het (referentie)minimum**maand**loon (art. 1b lid 7–9 WW). Dit gaat automatisch, zonder beschikking. [P]
  - Per 1 juli 2025: +2,46% [S, sociaalweb/SZW-uitkeringsbedragen]
  - Per 1 januari 2026: +2,16% [P\*, SZW-rekenregels jan 2026 via AWVN-kopie]
  - Per 1 juli 2026: +1,86% [S, rendement.nl/SZW-rekenregels juli 2026]
  - Per 1 januari 2027: het uur**loon** stijgt 2,05%; het percentage voor het referentieminimum**maand**loon (en dus de daglonen) heb ik **nog niet** gevonden. [O]
- Wordt het minimumloon herzien tussen het einde van de referteperiode en de eerste WW-dag, dan wordt het dagloon ook meteen met dat percentage verhoogd (art. 23 Dagloonbesluit). [P]
- **Jonger dan 21**: dagloon kan worden verhoogd, maximaal tot het bijbehorende minimumjeugdloon plus vakantiebijslag (art. 24 Dagloonbesluit). [P]
- **Geen minimumdagloon voor 21+**: de WW kent geen bodem; een te lage uitkering kan worden aangevuld via de Toeslagenwet (§8). [P voor bestaan TW; "geen minimumdagloon" is afgeleid uit het ontbreken ervan in WW/Dagloonbesluit → O-licht]

---

## 3. Maximumdagloon en maximum maandloon

### 3.1 Uitleg

Het maximumdagloon = het **maximumpremieloon werknemersverzekeringen / 261** per 1 januari, en wordt per 1 juli geïndexeerd met het minimumloon (art. 17–18 Wfsv). Het maximumdagloon is **inclusief vakantiegeld**. [P] (Staatscourant 2024, 38722 toelichting; UWV maximumdagloon-pagina)

### 3.2 Tabel

| Peildatum | Maximumdagloon | Max. WW-maandloon (× 21,75) | Max. bruto WW 75% (mnd 1–2) | Max. bruto WW 70% (vanaf mnd 3) | Bron / betrouwbaarheid |
|---|---|---|---|---|---|
| 1 jan 2025 | € 290,67 | € 6.322,07 | € 4.741,55 | € 4.425,45 | Stcrt. 2024, 38722 (toelichting: 1/261 × € 75.864,87) https://zoek.officielebekendmakingen.nl/stcrt-2024-38722.html [P] |
| 1 jul 2025 | € 297,82 | € 6.477,59 | € 4.858,19 | € 4.534,31 | sociaalweb.nl (overname SZW "Uitkeringsbedragen per 1 juli 2025"), ondernemenmetpersoneel.nl [S]; consistent met +2,46% indexatie [O-check: 290,67 × 1,0246 = 297,82 ✔] |
| 1 jan 2026 | € 304,25 | € 6.617,44 | € 4.963,08 | € 4.632,21 | SZW-rekenregels per 1 jan 2026 (AWVN-kopie) https://www.awvn.nl/app/uploads/2025/12/Rekenregels-januari-2026.pdf [P\*]; 79.409/261 = 304,25 ✔ |
| **1 jul 2026 (actueel)** | **€ 309,91** | **€ 6.740,54** | **€ 5.055,41** | **€ 4.718,38** | UWV https://www.uwv.nl/nl/maximumdagloon en https://www.uwv.nl/nl/ww/hoogte-ww (geraadpleegd 11-11-2026) [P] |
| 1 jan 2027 | **nog niet gepubliceerd** (op 11-11-2026 niet gevonden) | – | – | – | Rekenregels jan 2027 verschijnen doorgaans begin december. Ruwe schatting bij +2,05%: ± € 316 — **niet gebruiken als feit** [O] |

Maximumpremieloon (jaar): 2025 € 75.864; 2026 € 79.409 (geldt heel 2026, ook na 1 juli). [P] (Stcrt. 2024, 38722; SZW-rekenregels 2026)

**Beleidsontwikkeling [S]**: In de Voorjaarsnota 2026 / coalitieplannen staat een **beoogde verlaging van het maximumdagloon met 20%**, met invoering naar verwachting in **2029**. Nog geen wet. Bron: https://www.salarisvanmorgen.nl/2026/04/20/verlaging-maximumdagloon-antwoord-op-vragen-voorjaarsnota-2026/ (20-04-2026). Voor de tool: niet toepassen, wel eventueel als "let op, plannen" vermelden.

---

## 4. Van dagloon naar maandloon: factor 21,75

- **Volledige kalendermaand recht**: maandloon = **21,75 × dagloon** (art. 1b lid 2 onder a WW). 21,75 = 261 / 12 = gemiddeld aantal werkdagen per maand. [P]
- **Gedeeltelijke maand** (begin of einde WW midden in een maand): maandloon = **aantal werkdagen (ma–vr) met recht op uitkering × dagloon**; een kalenderweek telt als 5 werkdagen (art. 1b lid 2 onder b WW). [P]
- Het maandloon is, omdat het van het dagloon is afgeleid, **inclusief vakantietoeslag**. UWV: *"Omdat het maandloon een afgeleide is van het dagloon, is het maandloon een bedrag inclusief vakantietoeslag."* [P, via UWV-zoekresultaat; letterlijke tekst niet zelf op de pagina teruggevonden → P\*]

---

## 5. Uitkeringspercentages

Art. 47 lid 1 WW: de uitkering per **kalendermaand** bedraagt [P] https://wetten.overheid.nl/BWBR0004045/2026-07-01

```
eerste twee maanden waarin recht bestaat:  0,75 × (A − B × C/D) − E
vanaf de derde maand:                       0,70 × (A − B × C/D) − E
A = maandloon (dagloon × 21,75, of werkdagen × dagloon)
B = inkomen in de kalendermaand (bv. loon uit nieuw werk)
C = dagloon (gemaximeerd)
D = dagloon zonder maximering
E = 'inkomen in verband met arbeid' (volledig in mindering, geen vrijlating)
```

- C/D zorgt dat iemand boven het maximumdagloon niet dubbel gekort wordt bij bijverdiensten: inkomsten worden naar verhouding verrekend.
- Zonder inkomsten (B = 0, E = 0): **75% resp. 70% van het maandloon**. UWV bevestigt: eerste 2 maanden 75%, daarna 70%. [P] https://www.uwv.nl/nl/ww/hoogte-ww
- "Twee **maanden** waarin recht bestaat" – of een **gedeeltelijke eerste kalendermaand** als één van de twee maanden telt: wettekst suggereert ja (het is een kalendermaand waarin recht bestaat), maar niet expliciet bevestigd door UWV-tekst. [O]
- Minimale betaling: een uitkering wordt **niet betaald** als die per maand doorgaans minder is dan **1/8 van het minimumloon** (art. 41 WW). [P]

---

## 6. Vakantiegeld over de WW – inclusief of exclusief? (precies uitgelegd)

### 6.1 De regel

- Art. 33 lid 3 WW: UWV betaalt **jaarlijks in mei** een gedeelte van de uitkering als vakantiebijslag, over de voorafgaande maanden (of eerder als het recht eindigt). *"De vakantiebijslag bedraagt 8/108 van de uitkering."* Lid 5: betaling zonder beschikking. [P]
- UWV-wetsuitleg: *"De laatste berekening die plaatsvindt op het berekende uitkeringsbedrag is de reservering van de vakantiebijslag."* [P] (UWV Handboek Wetsuitleg WW/TW/IOW, hoofdstuk 327A.03, https://www.uwv.nl/assets-kai/files/a9d3bbeb-3933-4823-b1a9-98afe24baf69/bijlage-1-handboek-wetsuitleg-ww-tw-iow-hoofdstuk-3-van-uitkeringshoogte.pdf)
- UWV publiekspagina: *"Uw vakantiegeld is 8% van uw bruto-uitkering."* Bij einde uitkering: betaling *"uiterlijk 1 maand nadat uw uitkering is gestopt."* [P] https://www.uwv.nl/nl/vakantie/vakantiegeld

### 6.2 Hoe die twee formuleringen samenvallen

Stel de uitkering volgens art. 47 is U (= 70% × maandloon, **inclusief** vakantiegeld, want het maandloon is inclusief vakantiegeld).

```
gereserveerd vakantiegeld = U × 8/108
maandelijks uitbetaald (bruto) = U × 100/108
8% van het maandelijks uitbetaalde bedrag = U × 100/108 × 0,08 = U × 8/108   ✔ zelfde bedrag
```

Dus: "8% van je bruto-uitkering" (UWV-taal) = 8% bovenop het **maandelijks uitbetaalde** bruto bedrag = 8/108 van het **totale** WW-bedrag. Het WW-maandloon, het maximumdagloon en "70% van je maandloon" zijn allemaal **inclusief** vakantiegeld.

### 6.3 Veelgemaakte fout

"Ik verdiende € 4.000 per maand, dus krijg ik € 2.800 (70%) per maand." Fout om twee redenen:
1. Het WW-maandloon is niet je contractuele maandsalaris, maar (SV-jaarloon **inclusief** vakantiegeld en 13e maand) / 261 × 21,75. Met 8% vakantiegeld is dat ≈ € 4.000 × 12,96 / 12 = € 4.320 (bij 8% vakantiegeld, zonder 13e maand of andere toeslagen).
2. Van 70% daarvan (€ 3.024) wordt 8/108 gereserveerd → maandelijks bruto € 2.800, plus € 224 vakantiegeld per maand opgebouwd (in mei uitbetaald).
→ Toevallig komt dit dus terug op ≈ 70% van het kale salaris per maand + vakantiegeld in mei. [O – eigen rekenvoorbeeld, consistent met de regels hierboven]

### 6.4 Vakantiegeld van de oude werkgever

Vakantiegeld dat je na ontslag nog van je oude werkgever krijgt moet je doorgeven; UWV beoordeelt of het wordt verrekend. Vakantiegeld uit een nieuwe baan tijdens de WW wordt verrekend in de maand van ontvangst. [P] https://www.uwv.nl/nl/inkomsten-doorgeven/vakantiegeld-inkomsten-ww

---

## 7. Wettelijk minimumloon

### 7.1 Uitleg

Sinds 1 januari 2024 is er alleen nog een wettelijk **minimumuurloon**; er zijn geen vaste maand-, week- of dagbedragen meer. Een maandbedrag hangt af van je arbeidsduur. Daarnaast bestaat het **bruto referentieminimummaandloon**, dat SZW gebruikt voor uitkeringen (Toeslagenwet, indexatie daglonen). [P] https://www.rijksoverheid.nl/onderwerpen/minimumloon/bedragen-minimumloon/bedragen-minimumloon-2026

### 7.2 Minimumuurloon (bruto, excl. vakantiegeld)

| Leeftijd | 1 jan 2025 | 1 jul 2025 | 1 jan 2026 | 1 jul 2026 | **1 jan 2027** |
|---|---|---|---|---|---|
| 21+ | € 14,06 | € 14,40 | € 14,71 | **€ 14,99** | **€ 15,29** |
| 20 | € 11,25 | € 11,52 | € 11,77 | € 11,99 | € 13,38 |
| 19 | € 8,44 | € 8,64 | € 8,83 | € 8,99 | € 11,47 |
| 18 | € 7,03 | € 7,20 | € 7,36 | € 7,50 | € 9,56 |
| 17 | € 5,55 | € 5,69 | € 5,81 | € 5,92 | € 7,65 |
| 16 | € 4,85 | € 4,97 | € 5,07 | € 5,17 | € 6,12 |
| 15 | € 4,22 | € 4,32 | € 4,41 | € 4,50 | € 4,59 |
| Staffel 20/19/18/17/16/15 | 80/60/50/39,5/34,5/30% | idem | idem | idem | **87,5/75/62,5/50/40/30%** |

Bronnen:
- 2026 (jan + jul): rijksoverheid.nl bedragen-minimumloon-2026 [P] (geraadpleegd 11-11-2026); jan 2026 ook SZW-rekenregels [P\*].
- 1 jan 2027: rijksoverheid.nl https://www.rijksoverheid.nl/onderwerpen/minimumloon/bedragen-minimumloon/bedragen-minimumloon-2027 [P]; AWVN-bericht 30-10-2026 (indexatie 2,05%; geen aparte BBL-staffels meer) [S].
- 1 jul 2025: AWVN https://www.awvn.nl/wml/nieuws/minimumuurloon-op-1-juli-met-242-omhoog/ [S]; 21+ en 20 jaar bevestigd via rijksoverheid-zoekresultaat [P\*].
- 1 jan 2025: 21+ € 14,06 [P\*, Stcrt. 2024, 33625 via zoekresultaten]; jeugdbedragen [S] (taxence/mkbservicedesk; consistent met staffel).
- Rijksoverheid-pagina 2025 gaf bij ophalen 404 → 2025-jeugdlonen niet rechtstreeks primair geverifieerd.

### 7.3 Bruto referentieminimummaandloon (21+)

| Peildatum | Bedrag | Bron |
|---|---|---|
| 1 jan 2025 | € 2.191,80 | [S] zoekresultaten/SZW-regeling (niet zelf geopend) |
| 1 jul 2025 | € 2.245,80 | [P\*] genoemd in SZW-rekenregels jan 2026 ("per 1 juli 2025: € 2.245,80" via zoekresultaat) |
| 1 jan 2026 | € 2.294,40 | [P\*] SZW-rekenregels per 1 jan 2026 (AWVN-kopie) |
| 1 jul 2026 | € 2.337,00 | [P] = Toeslagenwet-norm gehuwden op uwv.nl/nl/toeslag/sociaal-minimum; [S] rendement.nl |
| 1 jan 2027 | **niet gevonden** | [O] |

**Indicatief minimummaandloon** (eigen berekening, [O]): uurloon × uren/week × 52/12. Bij 1 jul 2026, 21+: 38 u → € 2.468,35; 40 u → € 2.598,27; 36 u → € 2.338,44.

### 7.4 Rol van het minimumloon in de WW

- **Geen minimumdagloon** voor 21+ (zie §2.8). Voor <21: dagloon kan worden opgetrokken (art. 24 Dagloonbesluit).
- **Indexatie** van lopende daglonen en het maximumdagloon volgt het referentieminimummaandloon (§2.8).
- **Ondergrens betaling**: < 1/8 minimumloon per maand → geen betaling (art. 41 WW).
- **Toeslagenwet**: aanvulling tot sociaal minimum (§8).

---

## 8. Toeslagenwet (TW) – aanvulling tot het sociaal minimum

### 8.1 Voorwaarden [P] https://www.uwv.nl/nl/toeslag/wanneer-recht-op-toeslag

- 18 jaar of ouder en jonger dan AOW-leeftijd; wonen in NL (of verdragsland).
- Je ontvangt een UWV-uitkering (zoals WW).
- **Totale bruto (gezins)inkomen** lager dan het sociaal minimum. **Partnerinkomen telt mee**, vermogen/spaargeld niet.
- **Geen toeslag** als je getrouwd bent of samenwoont met een partner **geboren na 31 december 1971**, tenzij er een **kind jonger dan 12** bij je woont.
- Geen toeslag als je <21 bent en bij je ouders woont, of vrijwillig verzekerd bent.
- Toeslag = sociaal minimum − (gezins)inkomen. Was je inkomen vóór de WW al lager dan het sociaal minimum (bv. parttime), dan alleen aanvulling tot dat eerdere bruto inkomen; uitkering + toeslag nooit meer dan het dagloon.
- Je krijgt **8% vakantiegeld over de toeslag**; vakantiegeld van jou en je partner wordt niet verrekend met de toeslag.
- Aanvragen: op het WW-aanvraagformulier, of later via formulier "Aanvragen toeslag als u een WW-uitkering heeft". Wijzigingen binnen 1 week doorgeven.

### 8.2 Normbedragen sociaal minimum per 1 juli 2026 (bruto) [P] https://www.uwv.nl/nl/toeslag/sociaal-minimum

| Leefsituatie | Per dag | Per maand |
|---|---|---|
| Gehuwd/samenwonend, 18+ tot AOW | € 107,45 | € 2.337,00 |
| Alleenstaande 21+ | € 76,75 | € 1.669,31 |
| Alleenstaande woningdeler/kostendeler 21+ | € 49,94 | € 1.086,20 |
| Alleenstaande 20 jaar | € 60,15 | € 1.308,26 |
| Alleenstaande 19 jaar | € 44,02 | € 957,44 |
| Alleenstaande 18 jaar | € 35,95 | € 781,91 |

Koppeling (SZW-rekenregels jan 2026) [P\*]: gehuwden = 100% van het bruto referentieminimummaandloon; alleenstaanden 21+ = 70% van het **netto** referentieminimummaandloon (bruto omgerekend); kostendelersnorm 50% (medebewoners 27+).
Onzeker [O]: of deze normbedragen inclusief of exclusief vakantiebijslag zijn, en hoe de 8/108-reservering op de WW precies in de TW-vergelijking wordt meegenomen. Normbedragen per 1 jan 2025/1 jul 2025/1 jan 2026 niet gevonden in leesbare primaire vorm.

---

## 9. Bruto → netto (indicatief)

### 9.1 Regels

- UWV houdt **loonheffing** (loonbelasting + premie volksverzekeringen) in op de bruto uitkering. [P] UWV jaaropgaaf-uitleg
- Voor de WW wordt de **groene tabel** gebruikt (loon uit vroegere dienstbetrekking/uitkeringen): **geen arbeidskorting**. [S/P\*] (Handboek Loonheffingen via zoekresultaten)
- **Loonheffingskorting** (= algemene heffingskorting) alleen als je dat aan UWV doorgeeft, en maar bij één inhoudingsplichtige tegelijk. [P-algemeen fiscaal; specifiek UWV-formulering niet gelezen → O-licht]
- **Zvw-bijdrage**: UWV betaalt "meestal" de inkomensafhankelijke bijdrage Zvw zelf (op jaaropgaaf als "Werkgeversheffing Zvw"); niet ingehouden op de uitkering. [P] https://www.uwv.nl/nl/uitbetaling/jaaropgaaf/uitleg-jaaropgaaf
- Vakantiegeld in mei wordt belast via het tarief **bijzondere beloningen**, waardoor de inhouding in mei hoger lijkt; netto op jaarbasis is gelijk aan de jaarberekening hieronder (benadering). [O]

### 9.2 Tarieven box 1 (loonbelasting + premie volksverzekeringen)

**2026** [P] https://www.belastingdienst.nl/wps/wcm/connect/nl/voorlopige-aanslag/content/voorlopige-aanslag-tarieven-en-heffingskortingen

| Schijf | Inkomen | Onder AOW-leeftijd | AOW-leeftijd, geboren ≥ 1-1-1946 | AOW-leeftijd, geboren < 1946 |
|---|---|---|---|---|
| 1 | t/m € 38.883 (geb. <1946: t/m € 41.123) | 35,75% | 17,85% | 17,85% |
| 2 | € 38.883 – € 78.426 | 37,56% | 37,56% | 37,56% |
| 3 | > € 78.426 | 49,50% | 49,50% | 49,50% |

**2025** [P] https://www.belastingdienst.nl/wps/wcm/connect/nl/werk-en-inkomen/content/hoeveel-inkomstenbelasting-betalen en …/box_1/box_1

| Schijf | Inkomen | Onder AOW-leeftijd | AOW-leeftijd, geboren ≥ 1-1-1946 |
|---|---|---|---|
| 1 | t/m € 38.441 (geb. <1946: t/m € 40.502) | 35,82% | 17,92% |
| 2 | € 38.441 – € 76.817 | 37,48% | 37,48% |
| 3 | > € 76.817 | 49,50% | 49,50% |

Let op: wie in de loop van het jaar AOW-leeftijd bereikt heeft een maand-afhankelijk tarief schijf 1 (2025: 17,92% bij januari t/m 34,32% bij december) [P, fisin2025]. De WW eindigt bij AOW-leeftijd, dus voor de tool vrijwel alleen "onder AOW-leeftijd" relevant.

### 9.3 Algemene heffingskorting

| Jaar | Situatie | Max | Afbouw | Nul vanaf | Bron |
|---|---|---|---|---|---|
| 2025 | onder AOW | € 3.068 | 6,337% × (inkomen − € 28.406) | € 76.817 | [P] belastingdienst fisin2025/heffingskortingen |
| 2025 | heel jaar AOW | € 1.536 | 3,170% × (inkomen − € 28.406) | € 76.817 | [P] |
| 2026 | onder AOW | € 3.115 | 6,398% × (inkomen − € 29.736) | € 78.426 | [P] belastingdienst tabel AHK 2026 / voorlopige-aanslag-pagina |
| 2026 | heel jaar AOW | € 1.556 | 3,195% × (inkomen − € 29.736) | € 78.426 | [P] |

**Arbeidskorting: niet van toepassing op WW-uitkering** (groene tabel). Tarieven/AHK voor **2027 nog niet geverifieerd** [O] (Belastingplan 2027 is wel ingediend, maar niet onderzocht).

### 9.4 Rekenvoorbeeld (2026, indicatief)

Werknemer, 40 jaar, SV-loon in referteperiode € 52.200 (inclusief opgebouwd vakantiegeld, geen andere AVWB-correcties), hele jaar loon, werkloos in 2026, geen inkomsten, past loonheffingskorting toe bij UWV. Bedragen vóór indexatie.

```
dagloon      = 52.200 / 261           = € 200,00   (< max € 309,91)
maandloon    = 200,00 × 21,75         = € 4.350,00
maand 1–2    = 75% × 4.350            = € 3.262,50 bruto totaal
   waarvan vakantiegeld 8/108         = €   241,67 (naar mei)
   maandelijks bruto uitbetaald       = € 3.020,83
maand 3+     = 70% × 4.350            = € 3.045,00 bruto totaal
   waarvan vakantiegeld 8/108         = €   225,56
   maandelijks bruto uitbetaald       = € 2.819,44

Netto benadering op jaarbasis (2 mnd 75% + 10 mnd 70%, incl. vakantiegeld):
bruto jaar   = 2 × 3.262,50 + 10 × 3.045,00 = € 36.975,00
belasting    = 35,75% × 36.975         = € 13.218,56   (geheel in schijf 1)
AHK          = 3.115 − 6,398% × (36.975 − 29.736) = € 2.651,85
te betalen   = € 10.566,71
netto jaar   = € 26.408,29  → gemiddeld ± € 2.200 netto per maand incl. vakantiegeld-deel
```
Dit is een **benadering** (UWV gebruikt periodetabellen en het bijzonder tarief voor het vakantiegeld; werkelijk netto wijkt per maand af). UWV zelf geeft geen netto-schatting. [O – eigen berekening op basis van [P]-tarieven]

Rekenvoorbeeld boven het maximum (per 1 juli 2026): SV-jaarloon € 100.000 → dagloon 383,14 → gemaximeerd **€ 309,91** → maandloon € 6.740,54 → 70% = € 4.718,38 totaal, waarvan € 349,51 vakantiegeld en € 4.368,87 maandelijks bruto.

---

## 10. Uitbetaling: per maand of per 4 weken?

- *"Het UWV betaalt de uitkering in de regel per **kalendermaand achteraf**."* (art. 33 lid 1 WW) [P]
- UWV kan op verzoek of uit eigen beweging een **kortere periode** (bv. 4 weken/week) hanteren als je over die kortere periode loon ontving (art. 33 lid 2). [P]
- De hoogte wordt per **kalendermaand** vastgesteld (art. 47 WW); bij een deel van de maand: werkdagen × dagloon (art. 1b lid 2). [P]
- Inkomsten worden per kalendermaand verrekend op basis van het **feitelijke** inkomen in die maand (geen middeling). [P] (UWV wetsuitleg 327A)
- Vakantiegeld: in **mei** (art. 33 lid 3), of uiterlijk 1 maand na einde uitkering. [P]

---

## Open vragen / onzekerheden

1. **Maximumdagloon 1 januari 2027**: op 11-11-2026 nog niet gepubliceerd/gevonden. Ook het indexatiepercentage voor het referentieminimummaandloon per 1-1-2027 (uurloon: +2,05%) niet gevonden. Updaten zodra SZW de rekenregels jan 2027 publiceert (meestal begin december).
2. **1 juli 2025 maximumdagloon (€ 297,82)**: alleen via secundaire bronnen; wel rekenkundig consistent.
3. **WW-tekst na 08-10-2026**: er is een nieuwe consolidatie van de WW vanaf 08-10-2026; niet gecontroleerd of art. 1b/33/47 zijn gewijzigd.
4. **Eerste twee maanden 75%**: telt een gedeeltelijke eerste kalendermaand als volle "maand"? Wettekst wijst op ja; UWV-bevestiging ontbreekt.
5. **Zwangerschaps-/bevallingsverlof in de referteperiode**: geen expliciete regel gevonden in art. 6 Dagloonbesluit.
6. **Ontslag-/transitievergoeding en dagloon**: niet primair bevestigd of een ontslagvergoeding SV-loon is; valt in de praktijk meestal buiten de referteperiode.
7. **Toeslagenwet**: normbedragen per 1 jan 2025 t/m 1 jan 2026 niet gevonden; inclusief/exclusief vakantiebijslag en interactie met de 8/108-reservering niet bevestigd.
8. **Beoogde verlaging maximumdagloon met 20% (2029)**: plan, geen wet; alleen secundaire bron.
9. **Belastingtarieven 2027**: niet onderzocht/niet definitief.
10. **Bonussen/overwerk/ploegentoeslag**: tellen mee voor zover SV-loon – logisch, maar niet expliciet als losse post op een primaire pagina gevonden.

---

## Rekenregels voor de tool

```text
# ---------- Constanten (bruto; peildata) ----------
MAX_DAGLOON = {
  "2025-01-01": 290.67,   # [P]
  "2025-07-01": 297.82,   # [S]
  "2026-01-01": 304.25,   # [P*]
  "2026-07-01": 309.91,   # [P] actueel per 11-11-2026
  # "2027-01-01": TODO (nog niet gepubliceerd)
}
FACTOR_MAAND = 21.75
DELER_JAAR   = 261
VAKANTIE_BREUK = 8/108
PCT_EERSTE_2_MND = 0.75
PCT_DAARNA       = 0.70

MIN_UURLOON_21PLUS = {"2025-01-01":14.06,"2025-07-01":14.40,"2026-01-01":14.71,"2026-07-01":14.99,"2027-01-01":15.29}
REF_MIN_MAANDLOON  = {"2025-01-01":2191.80,"2025-07-01":2245.80,"2026-01-01":2294.40,"2026-07-01":2337.00}

# ---------- Referteperiode ----------
function referteperiode(eerste_ww_dag, aangiftetijdvak="maand"):
    T  = aangiftetijdvak dat eerste_ww_dag bevat
    eind = laatste dag van (T − 2)              # tweede tijdvak vóór T
    begin = eind − 1 jaar + 1 dag
    return [begin, eind]
    # uitzonderingen (eerder WW-recht, geen loon, korte dienstbetrekking) → tonen als "kan afwijken"

# ---------- Dagloon ----------
function dagloon(sv_loon_A, uitbetaald_vak_avwb_B, opgebouwd_vak_avwb_C,
                 aantal_dagloondagen_met_loon=None, peildatum):
    D = 261 if hele referteperiode loon else aantal_dagloondagen_met_loon   # dagloondagen = ma–vr
    dl_ongemax = (A - B + C) / D
    # ziekengeld in A eerst ophogen: ziekengeld*100/70
    dl = min(dl_ongemax, MAX_DAGLOON[geldend(peildatum)])
    return dl, dl_ongemax

# Vereenvoudigde gebruikersinvoer (benadering):
#   A−B+C ≈ bruto_maandsalaris × 12 × (1 + vakantiegeld_pct [default 0.08])
#           + 13e_maand + eindejaarsuitkering + gem. vaste toeslagen/overwerk × 12
#   dagloon ≈ dat / 261

# ---------- Indexatie lopend dagloon ----------
# Per 1-1 en 1-7: dagloon × (1 + index_refminmaandloon); 2025-07: +2,46%; 2026-01: +2,16%; 2026-07: +1,86%

# ---------- Maandloon ----------
function maandloon(dl, werkdagen_met_recht=None):
    if volledige kalendermaand: return dl × 21.75
    else:                       return dl × werkdagen_met_recht   # ma–vr

# ---------- Bruto uitkering per kalendermaand ----------
function uitkering(maandnummer_met_recht, ML, inkomen_B=0, dl, dl_ongemax, E=0):
    pct = 0.75 if maandnummer_met_recht <= 2 else 0.70
    U = pct × (ML − inkomen_B × dl / dl_ongemax) − E
    U = max(U, 0)
    if U < (1/8) × minimumloon_maand: U_uitbetaling = 0        # art. 41 WW (benadering)
    vakantiegeld_reservering = U × 8/108                        # betaald in mei
    bruto_maandelijks_uitbetaald = U × 100/108
    return U, bruto_maandelijks_uitbetaald, vakantiegeld_reservering

# ---------- Netto (indicatief, jaarbasis, onder AOW-leeftijd) ----------
function netto_jaar(bruto_jaar_incl_vakantiegeld, jaar, loonheffingskorting=True):
    if jaar == 2026: schijven = [(38883, .3575), (78426, .3756), (inf, .495)]
                     AHK = max(0, 3115 − 0.06398 × max(0, y − 29736)) if y < 78426 else 0
    if jaar == 2025: schijven = [(38441, .3582), (76817, .3748), (inf, .495)]
                     AHK = max(0, 3068 − 0.06337 × max(0, y − 28406)) if y < 76817 else 0
    heffing = progressief(y, schijven) − (AHK if loonheffingskorting else 0)
    # GEEN arbeidskorting; GEEN Zvw-inhouding (UWV betaalt werkgeversheffing)
    return y − max(heffing, 0)
# Toon altijd: "indicatie; werkelijke maandinhouding wijkt af (periodetabellen, bijzonder tarief mei)"

# ---------- Toeslagenwet-check (indicatief) ----------
function mogelijk_toeslag(leeftijd, partner, partner_geb_na_1971, kind_onder_12, gezinsinkomen_bruto_maand, norm):
    if partner and partner_geb_na_1971 and not kind_onder_12: return False
    return gezinsinkomen_bruto_maand < norm[leefsituatie]       # norm 1-7-2026: gehuwd 2337,00; alleenst. 21+ 1669,31
    # toeslag ≈ min(norm − gezinsinkomen, ruimte tot dagloon) ; +8% vakantiegeld
```

---

## Bronnenlijst (geraadpleegd 11-11-2026 tenzij anders vermeld)

- Werkloosheidswet (BWBR0004045), versie 01-07-2026 t/m 07-10-2026, art. 1b, 33, 41, 44, 47 – https://wetten.overheid.nl/BWBR0004045/2026-07-01
- Dagloonbesluit werknemersverzekeringen (BWBR0033471), versie vanaf 01-01-2025, art. 1–6, 12, 23, 24 – https://wetten.overheid.nl/BWBR0033471
- Staatscourant 2024, 38722 (maximumpremieloon 2025, toelichting maximumdagloon € 290,67) – https://zoek.officielebekendmakingen.nl/stcrt-2024-38722.html
- SZW Rekenregels per 1 januari 2026 (kopie AWVN) – https://www.awvn.nl/app/uploads/2025/12/Rekenregels-januari-2026.pdf
- Rendement, "Rekenregels per 1 juli 2026 bekendgemaakt" – https://www.rendement.nl/sociale-verzekeringen/nieuws/rekenregels-per-1-juli-2026-bekendgemaakt.html
- UWV maximumdagloon – https://www.uwv.nl/nl/maximumdagloon
- UWV hoogte WW – https://www.uwv.nl/nl/ww/hoogte-ww
- UWV dagloon berekenen – https://www.uwv.nl/nl/premies-bedragen/dagloon-berekenen
- UWV vakantiegeld – https://www.uwv.nl/nl/vakantie/vakantiegeld
- UWV vakantiegeld & inkomsten WW – https://www.uwv.nl/nl/inkomsten-doorgeven/vakantiegeld-inkomsten-ww
- UWV Handboek Wetsuitleg WW/TW/IOW 327A.03 – https://www.uwv.nl/assets-kai/files/a9d3bbeb-3933-4823-b1a9-98afe24baf69/bijlage-1-handboek-wetsuitleg-ww-tw-iow-hoofdstuk-3-van-uitkeringshoogte.pdf
- UWV sociaal minimum (per 1-7-2026) – https://www.uwv.nl/nl/toeslag/sociaal-minimum
- UWV wanneer recht op toeslag – https://www.uwv.nl/nl/toeslag/wanneer-recht-op-toeslag
- UWV transitievergoeding – https://www.uwv.nl/nl/ontslag/transitievergoeding
- UWV uitleg jaaropgaaf – https://www.uwv.nl/nl/uitbetaling/jaaropgaaf/uitleg-jaaropgaaf
- Rijksoverheid bedragen minimumloon 2026 – https://www.rijksoverheid.nl/onderwerpen/minimumloon/bedragen-minimumloon/bedragen-minimumloon-2026
- Rijksoverheid bedragen minimumloon 2027 – https://www.rijksoverheid.nl/onderwerpen/minimumloon/bedragen-minimumloon/bedragen-minimumloon-2027
- Rijksoverheid nieuws uitkeringsbedragen per 1 juli 2026 (11-06-2026) – https://www.rijksoverheid.nl/actueel/nieuws/2026/06/11/uitkeringsbedragen-per-1-juli-2026
- AWVN minimumloon 1 jan 2027 (30-10-2026) – https://www.awvn.nl/wml/nieuws/minimumloon-stijgt-naar-1529-euro-per-uur/
- AWVN minimumloon 1 jul 2025 – https://www.awvn.nl/wml/nieuws/minimumuurloon-op-1-juli-met-242-omhoog/
- Sociaalweb, Uitkeringsbedragen per 1 juli 2025 – https://sociaalweb.nl/wp-content/uploads/2025/06/Uitkeringsbedragenper1juli2025-2.pdf
- Salaris Vanmorgen, verlaging maximumdagloon (20-04-2026) – https://www.salarisvanmorgen.nl/2026/04/20/verlaging-maximumdagloon-antwoord-op-vragen-voorjaarsnota-2026/
- Belastingdienst tarieven/heffingskortingen 2026 – https://www.belastingdienst.nl/wps/wcm/connect/nl/voorlopige-aanslag/content/voorlopige-aanslag-tarieven-en-heffingskortingen
- Belastingdienst heffingskortingen 2025 – https://www.belastingdienst.nl/wps/wcm/connect/fisin/fisin2025/heffingskortingen
- Belastingdienst box 1 2025 – https://www.belastingdienst.nl/wps/wcm/connect/nl/werk-en-inkomen/content/hoeveel-inkomstenbelasting-betalen
