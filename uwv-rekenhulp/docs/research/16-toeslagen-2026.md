# 16 – Zorgtoeslag, huurtoeslag en Toeslagenwet (TW) bij loon + WIA, 2026

*Peildatum: 11 november 2026. Alle bronnen zijn geraadpleegd op 11-11-2026, tenzij anders vermeld.*

**Betrouwbaarheidslabels** (zelfde systematiek als doc 02 en 11)
- **[P]** primaire bron: wettekst op wetten.overheid.nl, Staatscourant, belastingdienst.nl (inclusief de PDF's "Berekening … 2026" van Dienst Toeslagen), uwv.nl, rijksoverheid.nl of open.overheid.nl (SZW).
- **[P-afgeleid]** zelf berekend uit primaire bedragen of regels. De berekening staat erbij.
- **[U]** UWV-handboek of werkinstructie (gepubliceerd, maar mogelijk verouderd).
- **[S]** alleen een secundaire bron.
- **[O]** onzeker, niet bevestigd of eigen interpretatie.

**Belangrijkste correctie vooraf.** De huurtoeslag is per **1 januari 2026 fundamenteel veranderd**. De oude basishuurformule (factor a × inkomen² + factor b × inkomen, art. 18–19 Wet op de huurtoeslag) is **vervallen per 01-01-2026** [P]. Daarvoor in de plaats komen een **vaste minimale basishuur per huishoudtype** en een **lineaire inkomensafhankelijke correctie** boven een inkomensijkpunt (27% of 22% per jaar, gedeeld door 12). Verder: servicekosten tellen niet meer mee, de huurgrens is geen uitsluitingsgrens meer, de jongerengrens ligt op 21 jaar (was 23), en er is geen apart ouderenregime meer in de berekening. Zie §2.

---

## 0. Kort overzicht 2026

| Onderdeel | Zorgtoeslag 2026 | Huurtoeslag 2026 |
|---|---|---|
| Inkomensbegrip | toetsingsinkomen (≈ verzamelinkomen), aanvrager + toeslagpartner | rekeninkomen = toetsingsinkomens van aanvrager + partner + medebewoners (kinderen < 23 pas boven € 6.218) |
| Maximale toeslag | € 1.550/jaar (≈ € 129/mnd) alleenstaand; € 2.963/jaar (≈ € 246/mnd) met partner | ca. € 523/mnd (1 persoon), € 525/mnd (2 personen), € 538/mnd (3+), bij huur ≥ € 932,93 [P-afgeleid] |
| Inkomensgrens | € 40.857 / € 51.142 | geen vaste grens; het bedrag wordt 0 bij ca. € 46.600 (1 p.), ca. € 60.000 (2 p.) of ca. € 60.700 (3+ p.), bij huur ≥ € 932,93 [P-afgeleid] |
| Vermogensgrens 1-1-2026 | € 146.011 / € 184.633 | € 38.479 per persoon (€ 76.958 met partner, + € 38.479 per medebewoner) |
| Minimum | geen toekenning onder € 24 per jaar (Awir art. 14 lid 5) | idem |

Toeslagenwet (UWV), normen per 1-7-2026 per dag / per maand (× 21,75): gehuwd/samenwonend € 107,45 / € 2.337,00; alleenstaande 21+ € 76,75 / € 1.669,31; kostendeler 21+ € 49,94 / € 1.086,20 [P].

---

## 1. Zorgtoeslag 2026

### 1.1 Formule [P]
Bronnen: Wet op de zorgtoeslag (BWBR0018451, versie vanaf 01-01-2026), art. 1 lid 1 f–h, art. 2, art. 3; Belastingdienst "Berekening zorgtoeslag 2026" (TG 082-1Z62FD, januari 2026), https://download.belastingdienst.nl/toeslagen/docs/berekening_zorgtoeslag_tg0821z62fd.pdf; Besluit tot wijziging percentages, Stcrt. 2025, 42977, https://zoek.officielebekendmakingen.nl/stcrt-2025-42977.html.

```
zorgtoeslag_jaar = standaardpremie × (1 of 2) − normpremie

normpremie (zonder toeslagpartner) = 1,912% × drempelinkomen + 13,73% × max(0, toetsingsinkomen − drempelinkomen)
normpremie (met toeslagpartner)    = 4,289% × drempelinkomen + 13,73% × max(0, gezamenlijk toetsingsinkomen − drempelinkomen)
```

| Parameter 2026 | Waarde | Label |
|---|---|---|
| Standaardpremie | € 2.119 (met partner 2 × = € 4.238) | [P] Belastingdienst-PDF |
| Drempelinkomen | € 29.736 | [P] Belastingdienst-PDF. Wettelijke definitie: 108% × 12 × bruto referentieminimummaandloon van januari (Wzt art. 1 lid 1 f). Controle: 1,08 × 12 × € 2.294,40 = € 29.735,42, afgerond € 29.736 [P-afgeleid] |
| % drempelinkomen zonder partner | 1,912% | [P] Wzt art. 2 lid 3; Stcrt. 2025, 42977 |
| % drempelinkomen met partner | 4,289% | [P] idem |
| % boven drempel (afbouw) | 13,730% (beide) | [P] idem |
| Maximale zorgtoeslag | € 1.550 per jaar (alleenstaand), € 2.963 per jaar (met partner) | [P] Belastingdienst-PDF, toeslagenkaart 2026 |
| Per maand | € 129 (berekend € 129,20) en € 246 (berekend € 246,89) | [P] voorbeeld 1 in de PDF: "129,20 (na afronding 129)"; partnerbedrag [P-afgeleid] |
| Maximaal toetsingsinkomen | € 40.857 (alleenstaand), € 51.142 (met partner) | [P] Belastingdienst-PDF, toeslagenkaart 2026 |
| Vermogensgrens op 1-1-2026 | € 146.011 (alleenstaand), € 184.633 (met partner, als het hele jaar dezelfde partner) | [P] Wzt art. 3 lid 1; PDF; toeslagenkaart 2026 |

Overige regels:
- Is de toeslagpartner geen verzekerde (bijvoorbeeld militair)? Dan is de aanspraak 50% van het berekende bedrag (Wzt art. 2 lid 4) [P].
- De aanspraak wordt per kalendermaand bepaald (Wzt art. 2 lid 5) [P]. Het jaarbedrag wordt rekenkundig afgerond op hele euro's, en een toeslag onder € 24 wordt niet toegekend (Awir art. 14 lid 4 en 5) [P]. Daaruit volgen precies de maximale inkomens van € 40.857 en € 51.142. Voorbeeld: bij € 40.857 is het resultaat € 23,54, afgerond € 24, dus nog recht. Bij € 40.858 is het € 23,40, afgerond € 23, dus geen recht [P-afgeleid].
- In de voorbeelden van de Belastingdienst wordt het maandbedrag naar beneden afgerond op hele euro's (129,20 → 129; 103,62 → 103) [P].
- Groene beleggingen tellen mee voor het vermogen [P].
- Vermogen = rendementsgrondslag box 3 op 1 januari (Wzt art. 3) [P].

### 1.2 Controletabel zorgtoeslag 2026 [P-afgeleid]
Berekend met de formule hierboven. De rijen € 19.000 (alleenstaand) en € 33.200 (partner, vóór de 50%-korting) komen exact overeen met de rekenvoorbeelden van de Belastingdienst (€ 1.550,45 en € 2.487,02).

| Toetsingsinkomen | Alleenstaand per jaar | per maand | Met partner per jaar | per maand |
|---|---|---|---|---|
| ≤ € 29.736 | € 1.550,45 | € 129,20 | € 2.962,62 | € 246,89 |
| € 30.000 | € 1.514,20 | € 126,18 | € 2.926,38 | € 243,86 |
| € 32.000 | € 1.239,60 | € 103,30 | € 2.651,78 | € 220,98 |
| € 34.000 | € 965,00 | € 80,42 | € 2.377,18 | € 198,10 |
| € 36.000 | € 690,40 | € 57,53 | € 2.102,58 | € 175,21 |
| € 38.000 | € 415,80 | € 34,65 | € 1.827,98 | € 152,33 |
| € 40.000 | € 141,20 | € 11,77 | € 1.553,38 | € 129,45 |
| € 40.857 | € 23,54 → € 24 | € 2 | € 1.435,71 | € 119,64 |
| € 41.000 | 0 | 0 | € 1.416,08 | € 118,01 |
| € 45.000 | 0 | 0 | € 866,88 | € 72,24 |
| € 50.000 | 0 | 0 | € 180,38 | € 15,03 |
| € 51.142 | 0 | 0 | € 23,58 → € 24 | € 2 |
| > € 51.142 | 0 | 0 | 0 | 0 |

Vuistregel: elke € 1.000 extra toetsingsinkomen boven € 29.736 kost € 137,30 per jaar (≈ € 11,44 per maand) zorgtoeslag.

### 1.3 Zorgtoeslag 2027 (nog niet definitief)
- **Percentages 2027**: 1,930% (zonder partner), 4,307% (met partner), 13,760% (afbouw). [P] Wzt art. 2 lid 3 in de toekomstige tekst geldend vanaf 01-01-2027 op wetten.overheid.nl (https://wetten.overheid.nl/BWBR0018451/2027-01-01).
- **Vermogensgrens 2027**: de wettekst per 01-01-2027 noemt € 116.103 en € 154.725, nog te indexeren met de tabelcorrectiefactor (art. 3 lid 2) [P]. Hart van Nederland (17-09-2026, op basis van de Prinsjesdagstukken) noemt € 119.122 en € 158.748 [S]. Dat past bij een indexatie van ≈ 2,6% [O].
- **Standaardpremie 2027, drempelinkomen 2027 en het maximum**: niet primair gevonden. Hart van Nederland noemt ongeveer € 140 per maand (alleenstaand), ongeveer € 268 per maand (partners), en inkomensgrenzen van ongeveer € 42.950 en € 54.150 [S]. https://www.hartvannederland.nl/economie/geld/artikelen/zorgtoeslag-2027-bedrag-inkomensgrens
- Het drempelinkomen 2027 volgt uit het referentieminimummaandloon per 1-1-2027 (× 12 × 1,08). Dat bedrag is nog niet gepubliceerd gevonden [O].

---

## 2. Huurtoeslag 2026

### 2.1 Wat is er veranderd (2025 → 2026) [P]
Bronnen: Wet op de huurtoeslag (BWBR0008659), versie geldend vanaf 01-01-2026; Belastingdienst "Huurtoeslag verandert vanaf 2026", https://www.belastingdienst.nl/wps/wcm/connect/nl/huurtoeslag/content/huurtoeslag-verandert-vanaf-2026; "Berekening huurtoeslag 2026" (TG 083-1Z62FD, versie juni 2026), https://download.belastingdienst.nl/toeslagen/docs/berekening_huurtoeslag_tg0831z62fd.pdf.

| Onderwerp | t/m 2025 | vanaf 2026 |
|---|---|---|
| Maximale huurgrens | uitsluitingsgrens (in 2025 € 900,07; jongeren € 477,20): bij een hogere huur geen recht | **geen uitsluiting meer**. Over het deel boven € 932,93 (jongeren < 21: € 498,20) wordt niets vergoed |
| Jongerengrens | < 23 jaar | **< 21 jaar** (de oudste bewoner bepaalt; < 18 in principe geen recht) |
| Servicekosten | max. 4 subsidiabele posten (tot € 48 per post) telden mee | **tellen niet meer mee**: de rekenhuur is de kale huur (+ standplaatshuur bij een woonwagen) |
| Basishuur | inkomensafhankelijk: a·Y² + b·Y, met minimum | **vast per huishoudtype** (€ 202,52 of € 200,71) |
| Inkomen | via de basishuurformule; geen harde inkomensgrens sinds 2020 | **lineaire correctie**: (rekeninkomen − ijkpunt) × 27% of 22% / 12 |
| Ouderen (AOW-leeftijd) | eigen factoren en norminkomen | geen apart rekenregime meer. In het rekenvoorbeeld van de Belastingdienst (Marina, 69 jaar) gelden dezelfde parameters [P]. Art. 14 (norminkomen inclusief ouderen) staat nog in de wet, maar wordt niet meer gebruikt in de berekening [O] |

Art. 18 en 19 Wet op de huurtoeslag (de oude a/b-factoren) zijn **vervallen per 01-01-2026** [P]. De Belastingdienst meldt dat ontvangers die eerder servicekosten opgaven hun herberekening 2026 "vanaf eind november" krijgen [P].

### 2.2 Parameters 2026 [P]

| Parameter | Waarde | Bron |
|---|---|---|
| Maximale huurgrens (rekenhuur-cap), iemand 21+ in huis of inwonend kind, of < 21 met handicap | **€ 932,93** | Wht art. 13 lid 1 a; PDF; toeslagenkaart 2026 |
| Maximale huurgrens, alle bewoners < 21 | **€ 498,20** | Wht art. 13 lid 1 b |
| Minimale basishuur, eenpersoonshuishouden | **€ 202,52** | PDF stap 2; VHN-parameters (normhuur € 250,67 − € 48,15) |
| Minimale basishuur, meerpersoonshuishouden | **€ 200,71** | idem (€ 248,86 − € 48,15) |
| Kwaliteitskortingsgrens (iedereen) | **€ 498,20** | Wht art. 20 lid 1 |
| Aftoppingsgrens 1–2 personen | **€ 713,02** | Wht art. 20 lid 2 a |
| Aftoppingsgrens 3+ personen | **€ 764,14** | Wht art. 20 lid 2 b |
| Vergoeding basishuur → kwaliteitskortingsgrens | **100%** | Wht art. 21 lid 1 a |
| Vergoeding kwaliteitskortingsgrens → aftoppingsgrens | **65%** | PDF; VHN; percentage bij AMvB (art. 21 lid 1 b) |
| Vergoeding aftoppingsgrens → huurgrens | **40%** | idem (art. 21 lid 1 c) |
| Boven de huurgrens | 0% | Wht art. 21 lid 1 d |
| Inkomensijkpunt (minimum-inkomensijkpunt), 1 persoon | **€ 23.425** | PDF stap 6; VHN ("inkomensgrens min. eigen bijdrage") |
| Inkomensijkpunt, 2+ personen | **€ 31.500** | idem |
| Afbouwpercentage, 1 persoon | **27%** (per jaar; /12 per maand) | Wht art. 21 lid 2 |
| Afbouwpercentage, 2+ personen | **22%** | idem |
| Vrijstelling inkomen inwonend kind < 23 (op 1-1) | **€ 6.218** per kind per jaar | Awir art. 7 lid 6; PDF |
| Vermogensgrens op 1-1-2026 | **€ 38.479** (aanvrager), **€ 76.958** (met partner), **€ 38.479 per medebewoner** | Awir art. 7 lid 3–4; PDF |
| Minimale toeslag | € 24 per jaar | Awir art. 14 lid 5 |

Overige parameterbron: Volkshuisvesting Nederland, "Huurtoeslagparameters" (tabel "Per 2026"), https://www.volkshuisvestingnederland.nl/onderwerpen/huren-en-wonen/inkomensgrenzen-huurprijsgrenzen-en-huurtoeslagparameters/huurtoeslagparameters [P].

Overige voorwaarden [P] (Wht art. 8, 9, 11; Awir):
- de huurder is 18+, alle bewoners staan in de BRP op het adres, en het gaat om een zelfstandige woonruimte (of een aangewezen onzelfstandige woonvorm);
- het inkomen van onderhuurders telt niet mee en zij tellen niet mee voor het huishouden;
- het vermogen van een partner of medebewoner telt alleen mee als die het hele jaar dezelfde partner of medebewoner was.

### 2.3 Rekenmethode 2026 (7 stappen van de Belastingdienst) [P]

```
1. rekenhuur  = min(kale huur [+ standplaatshuur], huurgrens)       huurgrens = 932,93 (of 498,20 als iedereen < 21)
2. basishuur  = 202,52 (1 persoon) | 200,71 (2+ personen)
3. kkg        = 498,20
4. aftopping  = 713,02 (1–2 personen) | 764,14 (3+ personen)       (n.v.t. als iedereen < 21)
5. rekeninkomen = Σ toetsingsinkomens van aanvrager, partner en medebewoners
                  (kind < 23 op 1-1: alleen het deel boven 6.218; negatief inkomen wordt verrekend, saldo ≥ 0)
6. correctie  = max(0, rekeninkomen − ijkpunt) × afbouw% / 12      ijkpunt 23.425 | 31.500 ; afbouw 27% | 22%
7. A = max(0, min(rekenhuur, kkg) − basishuur)                     × 100%
   B = max(0, min(rekenhuur, aftopping) − kkg)                     × 65%   (n.v.t. als iedereen < 21)
   C = max(0, rekenhuur − aftopping)                               × 40%   (n.v.t. als iedereen < 21)
   huurtoeslag per maand = floor(max(0, A + B + C − correctie))    (naar beneden afronden op hele euro's)
```

Verschil tussen huishoudtypes:
- **Eenpersoons**: basishuur € 202,52, aftopping € 713,02, ijkpunt € 23.425, afbouw 27%.
- **Meerpersoons (2)**: basishuur € 200,71, aftopping € 713,02, ijkpunt € 31.500, afbouw 22%.
- **Meerpersoons (3+)**: basishuur € 200,71, aftopping € 764,14, ijkpunt € 31.500, afbouw 22%.
- **Jongeren (iedereen < 21)**: huurgrens € 498,20, alleen deel A.
- **Ouderen**: geen apart regime in de 2026-berekening (zie §2.1).

Maximale huurtoeslag (huur ≥ € 932,93, inkomen ≤ ijkpunt) [P-afgeleid]: 1 persoon € 295,68 + € 139,63 + € 87,96 = **€ 523,28**; 2 personen € 297,49 + € 139,63 + € 87,96 = **€ 525,09**; 3+ personen € 297,49 + € 172,86 + € 67,52 = **€ 537,87**.
Het inkomen waarbij de toeslag 0 wordt (bij die maximale huur) [P-afgeleid]: 1 persoon ≈ € 46.680, 2 personen ≈ € 60.140, 3+ personen ≈ € 60.840. Bij een lagere huur ligt dat inkomen lager.

Controle tegen de rekenvoorbeelden van de Belastingdienst (eigen herberekening, klopt op de cent): Sem (20 jaar, huur € 600, inkomen € 22.000) → € 295; Demi en Sophie (3 personen, huur € 1.200, inkomen € 34.000) → € 492; Marina (69 jaar, huur € 710, inkomen € 29.000) → € 307 [P].

### 2.4 Controletabel huurtoeslag 2026 per maand (vóór afronding) [P-afgeleid]

| Rekeninkomen | 1 persoon, huur € 750 | 2 personen, huur € 750 | 1 persoon, huur ≥ € 932,93 |
|---|---|---|---|
| ≤ € 23.425 | € 450,11 | € 451,92 | € 523,28 |
| € 25.000 | € 414,67 | € 451,92 | € 487,84 |
| € 27.500 | € 358,42 | € 451,92 | € 431,59 |
| € 30.000 | € 302,17 | € 451,92 | € 375,34 |
| € 32.500 | € 245,92 | € 433,58 | € 319,09 |
| € 35.000 | € 189,67 | € 387,75 | € 262,84 |
| € 37.500 | € 133,42 | € 341,92 | € 206,59 |
| € 40.000 | € 77,17 | € 296,08 | € 150,34 |
| € 45.000 | 0 | € 204,42 | € 37,84 |
| € 50.000 | 0 | € 112,75 | 0 |

Vuistregel: boven het ijkpunt kost € 1.000 extra rekeninkomen € 22,50 per maand (1 persoon) of € 18,33 per maand (2+).

### 2.5 Rekenvoorbeeld huurtoeslag
Alleenstaande, 45 jaar, kale huur € 750 plus € 60 servicekosten. Rekeninkomen € 21.475 (zie het TW-voorbeeld in §3.7 en §4.3).
1. Rekenhuur = € 750 (servicekosten tellen niet mee; onder € 932,93).
2. Basishuur = € 202,52. 3. Kkg = € 498,20. 4. Aftopping = € 713,02.
5. Rekeninkomen = € 21.475, onder het ijkpunt € 23.425, dus 6. correctie = 0.
7. A = 498,20 − 202,52 = € 295,68; B = (713,02 − 498,20) × 65% = € 139,63; C = (750 − 713,02) × 40% = € 14,79.
   Totaal = € 450,10, dus **€ 450 per maand** [P-afgeleid].

Variant met loon + WGA, rekeninkomen € 32.544 (zie §4.3): correctie = (32.544 − 23.425) × 27% / 12 = € 205,18, dus 450,10 − 205,18 = **€ 244 per maand**.

### 2.6 Huurtoeslag 2027
Geen primaire publicatie van de parameters voor 2027 gevonden (Wht art. 27 lid 6: bekendmaking uiterlijk 1 november in de Staatscourant; voor 2026 publiceerde VHN/Rijksoverheid op 25-11-2025) [O]. Op wetten.overheid.nl bestaat (nog) geen toekomstige versie per 01-01-2027 van de Wet op de huurtoeslag. Indexering: de huurgrens en het norminkomen volgen de CPI, en de kkg, de aftoppingsgrenzen en de normhuur volgen de huurprijsontwikkeling (art. 27) [P].

---

## 3. Toeslagenwet (UWV) bij een WGA-uitkering

Bronnen: Toeslagenwet (BWBR0004043), versie geldend vanaf 01-07-2026, https://wetten.overheid.nl/BWBR0004043; Algemeen inkomensbesluit socialezekerheidswetten (AIB), versie vanaf 01-07-2026; Stcrt. 2026, 20221 (bedragen per 1-7-2026); Stcrt. 2025, 43553 (bedragen per 1-1-2026); SZW "Rekenregels per 1 juli 2026" (vastgesteld 05-06-2026), https://open.overheid.nl/details/83636b67-d57e-473c-b408-6ece1b406579; UWV sociaal minimum, https://www.uwv.nl/nl/toeslag/sociaal-minimum.

### 3.1 Wie kan TW krijgen bij de WGA?
- De WGA en IVA zijn een "loondervingsuitkering" (TW art. 1 lid 1 d: uitkering op grond van de Wet WIA) [P]. TW is dus mogelijk bij IVA, LGU, LAU en VU.
- 18+ en jonger dan de AOW-leeftijd; wonen in NL; < 21 en wonend bij de ouders geeft geen recht (art. 2 lid 3, 5, 6; art. 4a) [P].
- In de praktijk is de TW vooral relevant bij de **WGA-vervolguitkering** en bij een laag dagloon (parttime, laag loon).

### 3.2 Normen [P]

| Leefsituatie (TW art. 2) | per dag 1-1-2026 | per dag **1-7-2026** | per maand 1-7-2026 (× 21,75) |
|---|---|---|---|
| Gehuwd / samenwonend (art. 2 lid 1; ook art. 8 lid 1) | € 105,49 | **€ 107,45** | € 2.337,00 |
| Ongehuwd 21+, woont alleen of alleen met personen die niet als kostendeler tellen (lid 2 b 1°) | € 75,62 | **€ 76,75** | € 1.669,31 |
| Ongehuwd 20 jaar | € 58,94 | € 60,15 | € 1.308,26 |
| Ongehuwd 19 jaar | € 43,15 | € 44,02 | € 957,44 |
| Ongehuwd 18 jaar | € 35,25 | € 35,95 | € 781,91 |
| Kostendeler 21+ (lid 7: woont met een of meer meerderjarigen) | € 49,03 | **€ 49,94** | € 1.086,20 |

Bronnen per kolom: 1-1-2026 Stcrt. 2025, 43553, onderdeel S [P]; 1-7-2026 TW art. 2 (geconsolideerd), uwv.nl/sociaal-minimum, Stcrt. 2026, 20221 onderdeel K [P].
- **Tikfout in de Staatscourant**: in Stcrt. 2026, 20221 (HTML) staat bij art. 2 lid 2 b 1° "€ 67,75". De geconsolideerde wet en uwv.nl noemen € 76,75, en de reeks (75,62 → 76,75 = +1,49%) maakt € 76,75 aannemelijk [O]. Gebruik € 76,75.
- **Alleenstaande ouder**: de huidige TW kent **geen aparte norm** voor de alleenstaande ouder. Een alleenstaande ouder met minderjarige kinderen valt onder de alleenstaandennorm (lid 2), want minderjarigen tellen niet als kostendeler en kinderen jonger dan 27 evenmin (lid 9 a) [P]. De ouderkop loopt via het kindgebonden budget (Belastingdienst), niet via de TW. Historie (afschaffing van de vroegere 90%-norm) niet nagezocht [O].
- **Kostendelersnorm**: een medebewoner telt alleen mee als die 27+ is en geen commerciële huurder of kostganger met een schriftelijk contract is, en ook geen student met studiefinanciering of WTOS (lid 9) [P]. Het percentage is "50% voor alle relevante groepen" (SZW-rekenregels 1-7-2026) [P]. Dat is 50% van de netto gehuwdennorm, omgerekend naar bruto, dus niet 50% van € 107,45 [O].
- **Koppeling**: gehuwden = 100% van het bruto referentieminimummaandloon; alleenstaanden 21+ = 70% van het **netto** referentieminimummaandloon (omgerekend naar bruto); 18–20 jaar = 75% van het netto minimumjeugdloon (SZW-rekenregels 1-7-2026) [P].
- **Vakantiebijslag**: de normen zijn **exclusief** vakantiebijslag. Bewijs: de SZW-rekenregels noemen voor de Wajong/WAZ-grondslag "excl. vakantiegeld € 107,45", dus gelijk aan de gehuwdennorm. Verder is volgens AIB art. 2:5 vakantiebijslag geen inkomen voor de TW. Over de toeslag zelf krijg je **8% vakantiegeld**, uitbetaald in mei (rijksoverheid.nl) [P].
- **2027**: de normen per 1-1-2027 zijn nog niet gepubliceerd gevonden [O]. Het minimumuurloon per 1-1-2027 is € 15,29 (+2,05%) [P, zie doc 02]. Een indicatie van de gehuwdennorm is € 107,45 × 1,0205 ≈ € 109,65/dag [O].

### 3.3 Welk inkomen telt? [P]
- **TW art. 6**: gehuwde: inkomen uit arbeid + overig inkomen van **beiden**; ongehuwde: het eigen inkomen. Vermogen telt niet (uwv.nl) [P].
- **AIB hoofdstuk 2** geldt voor de TW (AIB art. 2:1) [P]:
  - inkomen uit arbeid = SV-loon (Wfsv art. 16), plus winst en resultaat uit overige werkzaamheden (art. 2:2);
  - overig inkomen = o.a. WW, WIA (WGA/IVA), ZW, Wajong, Anw, pensioen en de TW-toeslag zelf (art. 2:4);
  - **vakantiebijslag telt niet** (art. 2:5 lid 1). Is er geen aparte vakantiebijslag (bijvoorbeeld bij een all-in loon), dan telt 100/108 van het inkomen (lid 2–3);
  - UWV-handboek "Wat is inkomen": "Voor de Wajong en TW zien we VT niet als inkomen" [U].
- Inkomen wordt herleid tot een **bedrag per dag**: maand = 21,75 dagen, week = 5 dagen, jaar = 261 dagen (AIB art. 4:1 lid 1 b en lid 2) [P].
- **Gevolg voor de WGA**: de WGA-uitkering telt mee **exclusief** het vakantiegelddeel (8/108). Een VU van € 1.060,06 (inclusief vakantiegeld, zie doc 11 §4.3) telt dus mee als € 981,54 per maand, oftewel € 45,13 per dag [P-afgeleid].

### 3.4 Partnerregel (art. 3) [P, gecontroleerd]
> "Vanaf 1990 heeft een gehuwde wiens echtgenoot is geboren na 31 december 1971 geen recht op toeslag, tenzij tot zijn huishouden een eigen kind, aangehuwd kind of pleegkind behoort dat jonger is dan 12 jaar."

- "Gehuwd" omvat ook geregistreerd partnerschap en een gezamenlijke huishouding van ongehuwde meerderjarigen (art. 1 lid 2–5) [P].
- De regel is dus correct zoals gevraagd: partner geboren **na 31-12-1971** → geen TW, **tenzij** er een (eigen, aangehuwd of pleeg)kind **< 12 jaar** in het huishouden is.
- Bij recht: de toeslag is € 107,45 per dag min het gezamenlijke inkomen per dag (art. 8 lid 1).

### 3.5 Vrijlating van inkomen uit arbeid (art. 7) [P]
- Gedurende **maximaal 2 jaar** wordt van het **inkomen uit arbeid** buiten beschouwing gelaten: **5% van het minimumloon**, plus **30%** van het meerdere, met een maximum van **15% van het minimumloon** (art. 7 lid 1–2).
- "Minimumloon" in de TW = het WML-maandbedrag (art. 8 lid 1 b WML, dus het referentieminimummaandloon) / 21,75 (TW art. 1 lid 1 f) [P]. Per 1-7-2026: € 2.337,00 / 21,75 = € 107,45 per dag. Vrijlating minimaal € 5,37 per dag (bij € 5,37 arbeidsinkomen), maximaal **€ 16,12 per dag (€ 350,55 per maand)**. Het maximum wordt bereikt bij ≈ € 41,20 per dag (≈ € 896 per maand) arbeidsinkomen [P-afgeleid].
- Perioden met een ZW-uitkering tellen niet mee voor de 2 jaar (lid 3). Bij WW na 57,5 jaar geldt geen termijn (lid 4) [P].
- **Geldt dit bij de WGA?** De wettekst beperkt art. 7 niet tot een bepaalde loondervingsuitkering. Art. 7 geldt dus voor iedere TW-gerechtigde met inkomen uit arbeid, ook naast een WGA-uitkering [P-afgeleid]. AIB art. 2:10 c noemt bij de vrijlating alleen de ZW, WAZO en WW tijdens een lopend dienstverband. Dat gaat over de kwalificatie van die uitkeringen, niet over een uitsluiting van de WGA [P].
- **[O]**: wanneer de 2-jaarstermijn start (vanaf de eerste maand met arbeidsinkomen naast TW?), of die per dienstverband opnieuw start, en of de vrijlating ook geldt voor arbeidsinkomen van de partner. Niet in de wet gevonden; UWV-uitvoeringsbeleid niet gevonden.

### 3.6 Maximering op het dagloon (art. 8a) [P]
- De toeslag is ten hoogste het verschil tussen het **dagloon, het vervolgdagloon of de grondslag** waarnaar de loondervingsuitkering is berekend, en de loondervingsuitkering zelf. Dit geldt **alleen als** die grondslag lager is dan:
  - **100%** van het minimumloon (gehuwd, art. 2 lid 1),
  - **70%** van het minimumloon (alleenstaande, art. 2 lid 2),
  - **50%** van het minimumloon (kostendeler, art. 2 lid 7).
- Vakantiebijslag in het dagloon telt hierbij niet mee (art. 8a lid 2) [P].
- Het begrip "vervolgdagloon" verwijst naar art. 21b **WAO** (TW art. 1 lid 1 g) en niet naar de WIA [P]. Voor de WGA-VU is de grondslag waarschijnlijk H = minimumloon, of het WIA-maandloon als dat lager is (WIA art. 62) [O]. Bij H = minimumloon is de cap nooit bindend. Bij een laag WIA-maandloon kan de cap wel bindend zijn.
- UWV vat dit samen als "uitkering + toeslag samen nooit meer dan wat u verdiende voordat u de uitkering kreeg" (rijksoverheid.nl). Dat is een vereenvoudiging van art. 8a [P].

### 3.7 Rekenvoorbeeld: alleenstaande, WGA-VU € 1.060 bruto per maand, geen ander inkomen
Aanname A (meest waarschijnlijk): € 1.060 = de VU **inclusief** vakantiegeld (= 42% × € 2.523,96 bij 55–65% AO, doc 11 §4.3). Alleenstaand, 21+, woont alleen, peildatum 1-7-2026.

| Stap | Berekening | Uitkomst |
|---|---|---|
| 1. VU exclusief vakantiegeld | 1.060,06 × 100/108 | € 981,54 per maand |
| 2. Per dag | 981,54 / 21,75 | € 45,13 |
| 3. Norm alleenstaande | | € 76,75 per dag |
| 4. Toeslag per dag | 76,75 − 45,13 | **€ 31,62** |
| 5. Toeslag per maand (excl. VB) | 31,62 × 21,75 | **€ 687,77** |
| 6. Vakantiegeld over de toeslag (8%, in mei) | | € 55,02 per maand opgebouwd |
| 7. Art. 8a-cap | grondslag = minimumloon (≥ 70%), dus geen cap | n.v.t. |
| Totaal bruto per maand (exclusief vakantiegeld) | 981,54 + 687,77 | **€ 1.669,31** (= de norm) |
| Inclusief vakantiegeld | 1.060,06 + 742,79 | € 1.802,85 |

Aanname B: als € 1.060 het bedrag **exclusief** vakantiegeld is: 1.060 / 21,75 = € 48,74 per dag, toeslag = € 28,01 per dag = **€ 609,31 per maand** (+ 8% = € 658,06) [P-afgeleid]. De tool moet vragen of het bedrag op de beslissing inclusief of exclusief vakantiegeld is.

Periode 1-1 t/m 30-6-2026 (norm € 75,62; VU = 42% × € 2.294,40 × 1,08 = € 1.040,74): toeslag = 75,62 − 44,31 = € 31,31 per dag = € 681,09 per maand [P-afgeleid].

Variant met werk: dezelfde persoon verdient € 300 per maand bruto (SV-loon exclusief vakantiegeld) binnen de 2-jaarsperiode.
- Arbeid per dag = 300 / 21,75 = € 13,79. Vrijlating = 5,37 + 30% × (13,79 − 5,37) = € 7,90 (onder het max van € 16,12). Telt mee: € 5,89.
- Toeslag = 76,75 − 45,13 − 5,89 = € 25,73 per dag = **€ 559,58 per maand**.
- Totaal: 981,54 + 300 + 559,58 = € 1.841,12 (exclusief vakantiegeld). Dat is € 171,81 meer dan zonder werk [P-afgeleid].
- Let op: werken kan bij de VU ook gevolgen hebben voor de inkomenseis/LAU (doc 11 §4).

### 3.8 Correcties en aanvullingen op doc 02 §8 en doc 11 §7
1. **Doc 02 §8.2 "onzeker of de normen incl. of excl. vakantiebijslag zijn"** → opgelost: de normen zijn **exclusief** vakantiebijslag. Vakantiebijslag op loon of uitkering telt niet als inkomen (AIB art. 2:5), en over de toeslag komt 8% vakantiegeld [P].
2. **Doc 02 §8.2 "normen per 1-1-2026 niet gevonden"** → gevonden: € 105,49 / € 75,62 / € 58,94 / € 43,15 / € 35,25 / kostendeler € 49,03 (Stcrt. 2025, 43553, onderdeel S) [P].
3. **Doc 02 pseudo-code `gezinsinkomen_bruto_maand < norm`** → moet zijn: vergelijken **per dag** (/21,75), met inkomen **exclusief** vakantiegeld, na de **vrijlating van art. 7** op arbeidsinkomen. De dagloon-cap geldt alleen in de gevallen van art. 8a (dagloon < 100%, 70% of 50% van het WML), niet algemeen.
4. **Doc 02 §8.2 kostendeler "50%"**: het bedrag € 49,94 is niet 50% van € 107,45. Het is 50% binnen de netto-netto-systematiek [O]. Gebruik het vaste bedrag.
5. **Doc 11 §7 "VU € 1.060,06 ruim onder het sociaal minimum"** → klopt, maar de vergelijking moet met € 981,54 (exclusief vakantiegeld) tegen € 1.669,31: een TW van ≈ € 688 per maand. De tool kan dit dus wél redelijk exact berekenen, mits de leefsituatie bekend is.
6. **Doc 11 §7 art. 8a**: aanvullen met de percentages 100% (gehuwd), 70% (alleenstaand) en 50% (kostendeler), en de kanttekening dat "vervolgdagloon" naar de WAO verwijst.
7. **Doc 02/11 "alleenstaande ouder"**: geen aparte TW-norm (zie §3.2).

---

## 4. Toetsingsinkomen voor zorgtoeslag en huurtoeslag

### 4.1 Definitie [P]
- Toetsingsinkomen = "het op het berekeningsjaar betrekking hebbende inkomensgegeven" (Awir art. 8 lid 1). Dat is het **verzamelinkomen** (box 1 + 2 + 3, Wet IB 2001 art. 2.18; Awir art. 2 lid 1 j). Wie geen aangifte doet: het belastbare loon van de jaaropgaaf ("loon voor de loonheffing"/"fiscaal loon") (Belastingdienst) [P].
- Het gaat om het **hele kalenderjaar**, ook als je maar een deel van het jaar toeslag krijgt [P].
- **Telt mee** (Belastingdienst, "Het inkomen dat telt voor toeslagen"): loon (inclusief auto van de zaak), winst, uitkeringen (WW, bijstand, uitkering bij ziekte), pensioen, ontslagvergoeding en bijverdiensten [P]. De **WIA (WGA/IVA)** staat expliciet in de lijst van belastbare uitkeringen (Belastingdienst, Fiscale info 2026, §2.3.1) [P].
- **Telt niet mee**: zorgtoeslag, huurtoeslag, kinderopvangtoeslag, kindgebonden budget, studiefinanciering, kinderbijslag, kinderalimentatie en een teruggaaf inkomstenbelasting [P]. Een eenmalige vergoeding van UWV (WIA) telt niet als inkomen, maar kan wel vermogen worden (Belastingdienst) [P].

### 4.2 Telt een TW-toeslag mee? → **Ja**
- De TW-toeslag is een uitkering waarop loonheffing wordt ingehouden en die op de jaaropgaaf staat. De Belastingdienst noemt de "toeslag volgens de Toeslagenwet" in één rij met de WIA- en ZW-uitkeringen (nieuwsbericht 19-08-2026 over de arbeidskorting per 2027) [P]. Het is dus belastbaar loon (uit vroegere dienstbetrekking) in box 1, en daarmee onderdeel van het verzamelinkomen [P-afgeleid].
- Hetzelfde bericht zegt dat het afschaffen van de arbeidskorting op deze uitkeringen per 1-1-2027 "geen gevolgen [heeft] voor uw eventuele toeslagen" [P]. Het bruto inkomen verandert immers niet.
- Let op de naamsverwarring: de TW (UWV) heeft niets te maken met de zorg- en huurtoeslag (Dienst Toeslagen).

### 4.3 Jaarschatting maken uit maandbedragen
Regels:
1. Tel **bruto** bedragen die belast worden, **inclusief vakantiegeld** en eenmalige uitkeringen (13e maand, eindejaarsuitkering, bonus). Gebruik bij loon bij voorkeur het "loon voor de loonheffing" van de loonstrook. Dat is al verminderd met de werknemersbijdrage pensioen.
2. **WIA-uitkering**: neem het maandbedrag **inclusief** vakantiegeld × aantal maanden. Of: het uitbetaalde maandbedrag × 12 + de vakantiegelduitbetaling in mei.
3. **TW-toeslag**: maandbedrag × aantal maanden × 1,08.
4. Houd rekening met de **indexatie per 1 januari en 1 juli** (6 + 6 maanden) en met veranderingen in het jaar (start WIA, overgang LGU → VU/LAU, nieuwe baan).
5. Tel het inkomen van de **toeslagpartner** op (zorgtoeslag en huurtoeslag), en bij huurtoeslag ook dat van **medebewoners** (kinderen < 23 pas boven € 6.218).
6. Trek eventuele aftrekposten af (giften, specifieke zorgkosten, lijfrente). Tel box 3-voordeel en box 2 op (meestal 0 bij deze doelgroep). Een fiscalist kan dit preciezer; de tool kan het als optionele invoer opnemen [O].
7. Kasstelsel versus toerekening: fiscaal telt het moment van uitbetaling (vakantiegeld in mei loopt van juni tot mei). Bij een stabiele situatie is het verschil klein. Bij het begin of einde van een uitkering kan het verschil groter zijn [O].

**Voorbeeld 1 (§3.7, VU + TW, alleenstaand, heel 2026):**
- VU: 6 × € 1.040,74 + 6 × € 1.060,06 = € 12.604,81
- TW: (6 × € 681,09 + 6 × € 687,77) × 1,08 = € 8.870,21
- Toetsingsinkomen ≈ **€ 21.475** → zorgtoeslag maximaal € 1.550 per jaar = **€ 129 per maand**; huurtoeslag (huur € 750) **€ 450 per maand** (§2.5) [P-afgeleid].

**Voorbeeld 2 (loon + WGA, alleenstaand):** loon € 1.400 per maand bruto (excl. 8% vakantiegeld), WGA-LAU € 1.200 per maand (incl. vakantiegeld), heel 2026.
- Loon: 1.400 × 12 × 1,08 = € 18.144; WGA: 1.200 × 12 = € 14.400 → toetsingsinkomen ≈ **€ 32.544**.
- Zorgtoeslag: normpremie = 568,55 + 13,73% × (32.544 − 29.736) = € 954,09 → 2.119 − 954,09 = € 1.164,91 per jaar → **€ 97 per maand**.
- Huurtoeslag (huur € 750): 450,10 − 205,18 = **€ 244 per maand**.
- TW: (1.400 + 1.200/1,08) / 21,75 = € 115,46 per dag, meer dan € 76,75 → geen TW, ook na de vrijlating (max € 16,12) [P-afgeleid].

---

## Open vragen

1. **TW-vrijlating (art. 7)**: start en verloop van de 2-jaarstermijn, of die per baan opnieuw begint, en of de vrijlating ook op het arbeidsinkomen van de partner wordt toegepast. Niet gevonden in de wet of op uwv.nl [O].
2. **Art. 8a bij de WGA-VU**: welke "grondslag" UWV hanteert (H uit WIA art. 62, of het WIA-dagloon). Relevant bij een laag WIA-maandloon [O].
3. **Inclusief of exclusief vakantiegeld** op de WIA-beslissing: de tool moet dit vragen. Het TW-bedrag verschilt ≈ € 78 per maand (§3.7) [O].
4. **TW-normen per 1-1-2027** en het referentieminimummaandloon 2027: nog niet gepubliceerd gevonden [O].
5. **Zorgtoeslag 2027**: de standaardpremie en het drempelinkomen 2027 zijn nog niet primair bevestigd. De percentages (1,930/4,307/13,760%) staan wel in de wet [P]. Het maximum (≈ € 140/€ 268 per maand) en de vermogensgrenzen (€ 119.122/€ 158.748) zijn [S].
6. **Huurtoeslag 2027**: geen parameters gevonden [O].
7. **Art. 14 Wht (norminkomen inclusief ouderen)** staat nog in de wet. Gebruikt de Dienst Toeslagen dat nog ergens (bijvoorbeeld voor de huurgrens van woningen of een andere toets)? Niet gevonden. In de 2026-berekening speelt het geen rol [O].
8. **Kostendelersnorm TW**: de exacte afleiding van € 49,94 (netto-netto 50%) is niet nagerekend [O].
9. **Huurtoeslag-PDF versie juni 2026**: de tekst wijkt mogelijk af van de januari-versie (bijvoorbeeld na de servicekosten-herberekening). De parameters zijn gelijk aan de wettekst [P].
10. **Kas versus toerekening** bij vakantiegeld en nabetalingen in het toetsingsinkomen: voor de tool vereenvoudigd tot toerekening [O].

---

## Rekenregels voor de tool

```python
# ======================= CONSTANTEN 2026 =======================
# Zorgtoeslag [P]
ZT_STANDAARDPREMIE   = 2119.00
ZT_DREMPELINKOMEN    = 29736
ZT_PCT_ALLEEN        = 0.01912
ZT_PCT_PARTNER       = 0.04289
ZT_AFBOUW            = 0.13730
ZT_VERMOGEN          = {"alleen": 146011, "partner": 184633}
# 2027 (deels [S]/[O]): pct 0.01930 / 0.04307 / 0.13760; standaardpremie en drempel onbekend

# Huurtoeslag [P]
HT_HUURGRENS         = 932.93
HT_HUURGRENS_JONG    = 498.20        # alle bewoners < 21 (geen kind, geen handicap)
HT_BASISHUUR         = {1: 202.52, "meer": 200.71}
HT_KKG               = 498.20
HT_AFTOP             = {"1-2": 713.02, "3+": 764.14}
HT_IJKPUNT           = {1: 23425, "meer": 31500}
HT_AFBOUW            = {1: 0.27, "meer": 0.22}
HT_KIND_VRIJSTELLING = 6218          # kind < 23 op 1-1
HT_VERMOGEN_PP       = 38479         # partner samen 76958; + 38479 per medebewoner

AWIR_MIN_JAAR        = 24            # toeslag < € 24/jaar → 0 (na afronding op hele euro's)

# Toeslagenwet, per dag, excl. vakantiebijslag [P]
TW_NORM = {  # (vanaf 1-1-2026, vanaf 1-7-2026)
    "gehuwd":        (105.49, 107.45),
    "alleen_21plus": ( 75.62,  76.75),
    "alleen_20":     ( 58.94,  60.15),
    "alleen_19":     ( 43.15,  44.02),
    "alleen_18":     ( 35.25,  35.95),
    "kostendeler":   ( 49.03,  49.94),
}
TW_WML_DAG = (2294.40/21.75, 2337.00/21.75)   # minimumloon per dag (excl. VB)
TW_CAP_PCT = {"gehuwd": 1.00, "alleen": 0.70, "kostendeler": 0.50}
DAGEN_PER_MAAND = 21.75
VB = 0.08

# ======================= ZORGTOESLAG =======================
def zorgtoeslag_jaar(toetsingsinkomen_gezamenlijk, partner, partner_verzekerd=True, vermogen=0):
    if vermogen > ZT_VERMOGEN["partner" if partner else "alleen"]:
        return 0
    sp   = ZT_STANDAARDPREMIE * (2 if partner else 1)
    pct  = ZT_PCT_PARTNER if partner else ZT_PCT_ALLEEN
    norm = pct * ZT_DREMPELINKOMEN + ZT_AFBOUW * max(0, toetsingsinkomen_gezamenlijk - ZT_DREMPELINKOMEN)
    zt   = max(0, sp - norm)
    if partner and not partner_verzekerd:
        zt *= 0.5
    zt = round(zt)                       # Awir art. 14 lid 4
    return zt if zt >= AWIR_MIN_JAAR else 0
# per maand tonen: floor(zorgtoeslag_jaar / 12)  (Belastingdienst-voorbeelden ronden naar beneden af)

# ======================= HUURTOESLAG =======================
def huurtoeslag_maand(kale_huur, n_personen, alle_onder_21, rekeninkomen, vermogens):
    # kale_huur: zonder servicekosten (vanaf 2026); woonwagen: + standplaatshuur
    # rekeninkomen = som toetsingsinkomens aanvrager + partner + medebewoners
    #                (kind < 23 op 1-1: max(0, inkomen - 6218)); saldo >= 0
    # vermogens: [aanvrager(+partner samen), medebewoner1, ...] → elk afzonderlijk toetsen
    if vermogens_te_hoog(vermogens):
        return 0
    meer      = n_personen >= 2
    huurgrens = HT_HUURGRENS_JONG if alle_onder_21 else HT_HUURGRENS
    rekenhuur = min(kale_huur, huurgrens)
    basishuur = HT_BASISHUUR["meer" if meer else 1]
    A = max(0, min(rekenhuur, HT_KKG) - basishuur)
    if alle_onder_21:
        B = C = 0
    else:
        aftop = HT_AFTOP["3+" if n_personen >= 3 else "1-2"]
        B = max(0, min(rekenhuur, aftop) - HT_KKG) * 0.65
        C = max(0, rekenhuur - aftop) * 0.40
    ijk  = HT_IJKPUNT["meer" if meer else 1]
    pct  = HT_AFBOUW["meer" if meer else 1]
    corr = max(0, rekeninkomen - ijk) * pct / 12
    ht   = max(0, A + B + C - corr)
    return floor(ht) if ht * 12 >= AWIR_MIN_JAAR else 0
# Toon: "Over huur boven € 932,93 krijg je niets; servicekosten tellen niet mee."

# ======================= TOESLAGENWET (UWV) =======================
def tw_toeslag_maand(periode,               # 0 = jan–jun 2026, 1 = jul–dec 2026
                     leefsituatie,          # "gehuwd" | "alleen_21plus" | ... | "kostendeler"
                     partner_geboren_na_1971=False, kind_onder_12=False,
                     wia_maand_incl_vb=0.0,       # WGA/IVA-bedrag inclusief vakantiegeld
                     loon_maand_excl_vb=0.0,      # SV-loon eigen arbeid, excl. vakantiegeld
                     partner_loon_excl_vb=0.0, partner_overig_excl_vb=0.0,
                     binnen_2jr_vrijlating=True,
                     grondslag_dag_excl_vb=None):  # dagloon/H waarnaar de uitkering is berekend
    if leefsituatie == "gehuwd" and partner_geboren_na_1971 and not kind_onder_12:
        return 0                                         # TW art. 3
    norm = TW_NORM[leefsituatie][periode]
    wml  = TW_WML_DAG[periode]
    uitk_dag  = wia_maand_incl_vb / (1 + VB) / DAGEN_PER_MAAND     # AIB 2:5: VB telt niet
    arbeid    = loon_maand_excl_vb / DAGEN_PER_MAAND
    if binnen_2jr_vrijlating and arbeid > 0:                       # TW art. 7
        vrij   = min(0.05*wml + 0.30*max(0, arbeid - 0.05*wml), 0.15*wml)
        vrij   = min(vrij, arbeid)
        arbeid -= vrij
    partner = (partner_loon_excl_vb + partner_overig_excl_vb) / DAGEN_PER_MAAND if leefsituatie == "gehuwd" else 0
    toeslag_dag = max(0, norm - (uitk_dag + arbeid + partner))     # TW art. 8
    # art. 8a-cap
    if grondslag_dag_excl_vb is not None:
        cap_key = "gehuwd" if leefsituatie == "gehuwd" else ("kostendeler" if leefsituatie == "kostendeler" else "alleen")
        if grondslag_dag_excl_vb < TW_CAP_PCT[cap_key] * wml:
            toeslag_dag = min(toeslag_dag, max(0, grondslag_dag_excl_vb - uitk_dag))
    toeslag_maand = toeslag_dag * DAGEN_PER_MAAND
    return {"excl_vb": toeslag_maand, "vb_opbouw": toeslag_maand * VB}
# Controle: alleen_21plus, periode 1, VU 1060.06 → 687,77 excl. VB (+55,02 VB)

# ======================= TOETSINGSINKOMEN (jaarschatting) =======================
def toetsingsinkomen_schatting(maanden):
    # maanden: lijst van 12 dicts met bruto bedragen per kalendermaand
    totaal = 0
    for m in maanden:
        totaal += m.loon_lh_excl_vb * (1 + m.vb_pct_werkgever)    # loon voor de loonheffing + vakantiegeld
        totaal += m.eenmalig                                       # 13e maand, bonus, eindejaarsuitkering
        totaal += m.wia_incl_vb                                    # WIA telt mee
        totaal += m.tw_excl_vb * (1 + VB)                          # TW telt mee
        totaal += m.overig_belast                                  # WW, ZW, pensioen, freelance
    return max(0, totaal - aftrekposten + box3_voordeel)           # optionele invoer
# Zorgtoeslag: tel partner op. Huurtoeslag: tel partner + medebewoners op (kind < 23: boven 6218).
# Waarschuw: "toeslag = voorschot; definitief op basis van het echte verzamelinkomen → terugbetalen mogelijk".
# Volgorde in de tool: eerst WIA → dan TW (UWV) → dan het jaarinkomen inclusief TW → dan zorg- en huurtoeslag.
```

---

## Bronnenlijst (geraadpleegd 11-11-2026)

- Belastingdienst, Berekening zorgtoeslag 2026 (TG 082-1Z62FD, jan. 2026) – https://download.belastingdienst.nl/toeslagen/docs/berekening_zorgtoeslag_tg0821z62fd.pdf [P]
- Belastingdienst, Berekening huurtoeslag 2026 (TG 083-1Z62FD, juni 2026) – https://download.belastingdienst.nl/toeslagen/docs/berekening_huurtoeslag_tg0831z62fd.pdf [P]
- Belastingdienst, Toeslagenkaart 2026 (TG 710-1Z61PL, nov. 2025) – https://download.belastingdienst.nl/toeslagen/docs/toeslagenkaart_2025_tg7101z61pl.pdf [P]
- Belastingdienst, Huurtoeslag verandert vanaf 2026 – https://www.belastingdienst.nl/wps/wcm/connect/nl/huurtoeslag/content/huurtoeslag-verandert-vanaf-2026 [P]
- Belastingdienst, Hoeveel huurtoeslag krijg ik? – https://www.belastingdienst.nl/wps/wcm/connect/nl/huurtoeslag/content/hoeveel-huurtoeslag [P]
- Belastingdienst, Het inkomen dat telt voor toeslagen – https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/prive/toeslagen/hoe_werken_toeslagen/kan_ik_toeslag_krijgen/inkomen/ [P]
- Belastingdienst, Fiscale info 2026, Loon, pensioen, uitkeringen – https://www.belastingdienst.nl/wps/wcm/connect/fisin/fisin2026/loon_pensioen_uitkeringen_en_afkoopsommen [P]
- Belastingdienst, Geen arbeidskorting meer over bepaalde uitkeringen (19-08-2026) – https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/berichten/nieuws/geen-arbeidskorting-meer-over-bepaalde-uitkeringen [P]
- Wet op de zorgtoeslag (BWBR0018451), versie 01-01-2026 en toekomstige versie 01-01-2027 – https://wetten.overheid.nl/BWBR0018451/2026-01-01 , https://wetten.overheid.nl/BWBR0018451/2027-01-01 [P]
- Wet op de huurtoeslag (BWBR0008659), versie 01-01-2026 – https://wetten.overheid.nl/BWBR0008659/2026-01-01 [P]
- Algemene wet inkomensafhankelijke regelingen (BWBR0018472), versie 01-01-2026 – https://wetten.overheid.nl/BWBR0018472/2026-01-01 [P]
- Stcrt. 2025, 42977 (percentages zorgtoeslag 2026) – https://zoek.officielebekendmakingen.nl/stcrt-2025-42977.html [P]
- Volkshuisvesting Nederland, Huurtoeslagparameters (per 2026) – https://www.volkshuisvestingnederland.nl/onderwerpen/huren-en-wonen/inkomensgrenzen-huurprijsgrenzen-en-huurtoeslagparameters/huurtoeslagparameters [P]
- Rijksoverheid, Indexering inkomensgrenzen, huurprijsgrenzen en huurtoeslagparameters 2026 (25-11-2025) – https://www.rijksoverheid.nl/actueel/nieuws/2025/11/25/indexering-inkomensgrenzen-woningcorporaties-maximale-huurprijsgrenzen-en-huurtoeslagparameters-2026 [P, niet zelf geopend]
- Toeslagenwet (BWBR0004043), versie 01-07-2026 – https://wetten.overheid.nl/BWBR0004043 [P]
- Algemeen inkomensbesluit socialezekerheidswetten, versie 01-07-2026, art. 2:1–2:5, 2:10, 4:1 – https://wetten.overheid.nl/BWBR0029368 [P]
- Stcrt. 2025, 43553 (bedragen per 1-1-2026, onderdeel S Toeslagenwet) – https://zoek.officielebekendmakingen.nl/stcrt-2025-43553.html [P]
- Stcrt. 2026, 20221 (bedragen per 1-7-2026, onderdeel K Toeslagenwet) – https://zoek.officielebekendmakingen.nl/stcrt-2026-20221.html [P]
- SZW, Rekenregels per 1 juli 2026 (vastgesteld 05-06-2026) – https://open.overheid.nl/details/83636b67-d57e-473c-b408-6ece1b406579 [P]
- UWV, Sociaal minimum (vanaf 1-7-2026) – https://www.uwv.nl/nl/toeslag/sociaal-minimum [P]
- Rijksoverheid, Hoe hoog is de toeslag op mijn uitkering? – https://www.rijksoverheid.nl/onderwerpen/ww-uitkering/vraag-en-antwoord/hoe-hoog-is-de-toeslag-op-mijn-uitkering [P]
- UWV, Handboek "Wat is inkomen" – https://www.uwv.nl/assets-kai/files/0cd43b4f-8a16-4b68-a41b-d654ecfd20cc/handboek-wat-is-inkomen.pdf [U]
- Hart van Nederland, Zorgtoeslag 2027 (17-09-2026) – https://www.hartvannederland.nl/economie/geld/artikelen/zorgtoeslag-2027-bedrag-inkomensgrens [S]
