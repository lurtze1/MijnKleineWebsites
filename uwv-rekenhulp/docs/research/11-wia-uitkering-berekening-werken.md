# 11 – WIA-uitkering: berekening, en wat werken en inkomen ermee doen

*Peildatum: 11 november 2026. Geldende wetteksten geraadpleegd op wetten.overheid.nl op 11-11-2026:*
*Wet WIA versie geldend vanaf 01-07-2026, Dagloonbesluit werknemersverzekeringen vanaf 01-01-2025, Algemeen inkomensbesluit socialezekerheidswetten (AIB) vanaf 01-07-2026, Schattingsbesluit arbeidsongeschiktheidswetten vanaf 01-07-2024, Toeslagenwet vanaf 01-07-2026.*

**Afbakening.** Dit document gaat over de WIA-specifieke berekening. Andere documenten behandelen de toegang, de keuring en de indeling in WGA of IVA, en ook het algemene maximumdagloon, het minimumloon en de loonheffing. Zie onder meer [02-hoogte-maandloon-bedragen.md](02-hoogte-maandloon-bedragen.md) voor het maximumdagloon, het minimumloon en de normen van de Toeslagenwet. Bedragen uit die domeinen staan hier alleen voor zover de rekenvoorbeelden ze nodig hebben.

**Betrouwbaarheidslabels**
- **[P]** bevestigd via een primaire bron (wettekst, Staatscourant, Staatsblad, uwv.nl, rijksoverheid/rijksfinancien).
- **[P-afgeleid]** zelf berekend uit primaire bedragen of regels. De berekening staat erbij.
- **[U]** UWV-interne werkinstructie of wetsuitleg (gepubliceerd PDF-document, vaak zonder datum). Het is wel UWV-beleid, maar het document kan verouderd zijn.
- **[S]** alleen een secundaire bron.
- **[O]** onzeker of niet geverifieerd.

**Primaire bronnen (afkortingen in dit document)**

| Afk. | Bron | URL | Geldig vanaf |
|---|---|---|---|
| WIA | Wet werk en inkomen naar arbeidsvermogen | https://wetten.overheid.nl/BWBR0019057/2026-07-01 | 01-07-2026 |
| DLB | Dagloonbesluit werknemersverzekeringen | https://wetten.overheid.nl/BWBR0033471/2025-01-01 | 01-01-2025 (toekomstige wijziging per 01-01-2028) |
| AIB | Algemeen inkomensbesluit socialezekerheidswetten | https://wetten.overheid.nl/BWBR0029368/2026-07-01 | 01-07-2026 |
| SB | Schattingsbesluit arbeidsongeschiktheidswetten | https://wetten.overheid.nl/BWBR0011478/2024-07-01 | 01-07-2024 |
| TW | Toeslagenwet | https://wetten.overheid.nl/BWBR0004043/2026-07-01 | 01-07-2026 |
| Stcrt-jul26 | Mededeling gewijzigde bedragen per 1 juli 2026 (Stcrt. 2026, 20221) | https://zoek.officielebekendmakingen.nl/stcrt-2026-20221.html | 01-07-2026 |
| Stcrt-jan26 | Mededeling gewijzigde bedragen per 1 januari 2026 (Stcrt. 2025, 43553) | https://zoek.officielebekendmakingen.nl/stcrt-2025-43553.html | 01-01-2026 |
| Stcrt-WML | Regeling minimumloon per 1 juli 2026 (Stcrt. 2026, 16505) | https://zoek.officielebekendmakingen.nl/stcrt-2026-16505.html | 01-07-2026 |
| Stcrt-premie | Regeling premiepercentages en maximumpremieloon 2026 (Stcrt. 2025, 42324) | https://zoek.officielebekendmakingen.nl/stcrt-2025-42324.html | 01-01-2026 |
| OWB-2027 | Ontwerpbegroting SZW 2027, memorie van toelichting | https://www.rijksfinancien.nl/memorie-van-toelichting/2027/OWB/XV | Prinsjesdag 2026 |
| UWV-LAU | uwv.nl loonaanvullingsuitkering | https://www.uwv.nl/nl/wia/wga/loonaanvullingsuitkering | geraadpleegd 11-11-2026 |
| UWV-LGU | uwv.nl loongerelateerde uitkering | https://www.uwv.nl/nl/wia/wga/loongerelateerde-uitkering | geraadpleegd 11-11-2026 |
| UWV-VU | uwv.nl vervolguitkering | https://www.uwv.nl/nl/wia/wga/vervolguitkering | geraadpleegd 11-11-2026 |
| UWV-einde | uwv.nl einde WIA-uitkering | https://www.uwv.nl/nl/wia/einde-wia | geraadpleegd 11-11-2026 |
| UWV-werken | uwv.nl werken naast WIA | https://www.uwv.nl/nl/werken-naast-uitkering/werken-naast-wia | geraadpleegd 11-11-2026 |
| UWV-inkomsten | uwv.nl welke inkomsten doorgeven (WIA) | https://www.uwv.nl/nl/inkomsten-doorgeven/wia-wao-waz-wajong-ziektewet-welke-inkomsten-doorgeven | geraadpleegd 11-11-2026 |
| UWV-WU-inkomen | UWV wetsuitleg "Wat is inkomen?" (PDF) | https://www.uwv.nl/assets-kai/files/11fac546-cca2-4828-a177-c74088f0488a/bijlage-2-hoofdstuk-handboek-uwv-wat-is-inkomen.pdf | geen datum [U] |
| UWV-WU-verrekenen | UWV wetsuitleg WIA verrekenen inkomsten / voorschot (PDF) | https://www.uwv.nl/assets-kai/files/d3935280-5a21-4c8d-8c46-ae8b26642769/wetsuitleg-wia-wia-waz-owajong-en-zw-1-geanonimiseerd.pdf | geen datum, voorbeelden uit 2016 [U] |

---

## 0. De kern: drie bedragen die mensen door elkaar halen

In de beslissingsbrief van UWV staan meestal drie bedragen. Ze lijken op elkaar maar zijn drie verschillende dingen.

| Begrip | Wat het is | Waarvoor gebruikt | Gemaximeerd? | Geïndexeerd met | Bron |
|---|---|---|---|---|---|
| **WIA-maandloon** (= WIA-dagloon × 21,75) | Je gemiddelde SV-loon (inclusief opgebouwd vakantiegeld) in het jaar vóór de **eerste ziektedag**, per werkdag | De **hoogte** van je uitkering: de 75%/70% van IVA, LGU en LAU, en het plafond voor de vervolguitkering | **Ja**, op het maximumdagloon | Minimumloon (1 januari en 1 juli) | WIA art. 13, 14; DLB art. 13, 16, 23 [P] |
| **Maatmaninkomen** | Wat je als gezonde werknemer verdiende, **per uur**, in je eigen werk (de "maatgevende arbeid"), ook in het refertejaar vóór de eerste ziektedag | De **vergelijkingsbasis** voor je arbeidsongeschiktheidspercentage | **Nee** (geen maximum in het Schattingsbesluit gevonden) [P, het ontbreken van een maximum is gecontroleerd in SB art. 7–8] | CAO-lonenindex van het CBS, tot het arbeidskundig onderzoek; daarna bevroren (behalve bij een hernieuwde vaststelling) | SB art. 7, 7a, 8 [P] |
| **Resterende verdiencapaciteit (RVC)** | Wat je volgens de arbeidsdeskundige **nog kunt verdienen** in passende functies, per uur en per maand | (1) het AO-% = (maatman − RVC) / maatman; (2) de **inkomenseis** (50% van de RVC); (3) de LAU-formule tussen 50% en 100% van de RVC | n.v.t. | **[O]** niet gevonden of en hoe de RVC tussentijds geïndexeerd wordt | WIA art. 60, 61; SB art. 9, 10 [P] |

**Waarom dit verwarrend is**
- Het AO-% wordt berekend met het **maatmaninkomen**, maar de uitkering met het **WIA-maandloon**. Die twee lopen uiteen door het maximum (alleen het WIA-maandloon heeft er een), door verschillende indexering, en doordat het maatmaninkomen alleen de "maatgevende arbeid" meetelt.
- De "65%-grens" in UWV-teksten ("u verdient weer 65% van uw oude loon") gaat over het **maatmaninkomen per uur**, niet over het WIA-maandloon (WIA art. 56 lid 3 [P]).
- De "50%-regel" (de inkomenseis) gaat over de **RVC per maand**, niet over het WIA-maandloon of het maatmaninkomen (WIA art. 60 lid 2 en 4 [P]).

**Voor de tool:** laat de gebruiker alle drie de bedragen apart invullen, uit de beslissingsbrief: WIA-maandloon (of dagloon × 21,75), RVC per maand, en AO-% (of de klasse). Leid ze niet uit elkaar af.

---

## 1. WIA-maandloon (dagloon × 21,75)

### 1.1 Uitleg in gewone taal
1. UWV neemt al je SV-loon (loon voor de werknemersverzekeringen) over **één jaar**: het **refertejaar**. Dat jaar eindigt op de laatste dag van het aangiftetijdvak (maand of 4 weken) **vóór het tijdvak waarin je ziek werd**. Het refertejaar ligt dus vóór je **eerste ziektedag**, niet vóór de WIA-ingangsdatum, die ongeveer 2 jaar later valt. [P] WIA art. 13 lid 1; DLB art. 13 lid 1.
2. Vakantiegeld telt mee als het **in dat jaar opgebouwde** vakantiegeld. Het in dat jaar *uitbetaalde* vakantiegeld gaat eraf en het *opgebouwde* komt erbij. Hetzelfde geldt voor een arbeidsvoorwaardenbedrag (bijvoorbeeld een 13e maand of een IKB-budget). [P] DLB art. 16 lid 1: dagloon = (A − B + C) / 261.
3. Dat totaal deel je door **261**. Dat is het dagloon. [P] DLB art. 16 lid 1 (D = 261).
4. Het dagloon is **gemaximeerd** op het maximumdagloon. [P] WIA art. 13 lid 1.
5. Is het minimumloon verhoogd tussen het einde van het refertejaar en de WIA-ingangsdatum, dan gaat het dagloon **mee omhoog in dezelfde mate**. Dat is de indexering bij de WIA-start. [P] DLB art. 23.
6. **Maandloon = 21,75 × dagloon.** Bij recht over een deel van de maand geldt: (werkdagen met recht / werkdagen in die maand) × 21,75 × dagloon, waarbij zaterdagen en zondagen niet meetellen. [P] WIA art. 13 lid 4.

Bijzonderheden [P, DLB]:
- Was je in het refertejaar (deels) ziek, met verlof of in staking, en kreeg je daardoor minder loon? Dan telt het loon van het laatste "normale" volledige tijdvak bij dezelfde werkgever vóór die periode, maar alleen als dat gunstiger is (DLB art. 17).
- Een uitkering in het refertejaar wordt teruggerekend naar 100%: uitkering × 100/70 (DLB art. 16 lid 3).
- Er is een dagloongarantie voor wie op 45+ is gaan werken en binnen 5 jaar opnieuw in de WIA komt (DLB art. 19). Ontstaat het recht later dan na de wachttijd, dan wordt het dagloon niet lager dan bij een tijdige start (DLB art. 21).

### 1.2 Harde cijfers

| Item | Waarde | Geldig | Bron |
|---|---|---|---|
| Deler dagloon | 261 | doorlopend | DLB art. 16 lid 1 [P] |
| Factor maandloon | 21,75 | doorlopend | WIA art. 13 lid 4 [P] |
| Maximumdagloon | € 304,25 | 01-01-2026 t/m 30-06-2026 | Stcrt-premie (79.409,25 / 261) [P] |
| Maximumdagloon | € 309,91 | vanaf 01-07-2026 | 304,25 × 1,0186 [P-afgeleid]. Indirect bevestigd: OWB-2027 noemt de maximale IVA € 5.055,41 = 0,75 × 21,75 × 309,91 [P]. Zie ook doc 02. |
| Maximum WIA-maandloon | € 6.740,54 | vanaf 01-07-2026 | 21,75 × 309,91 [P-afgeleid] |

### 1.3 Zit vakantiegeld in het WIA-maandloon?
**Ja.** Het dagloon bevat het in het refertejaar *opgebouwde* vakantiegeld (DLB art. 16, factor C) [P]. Daarom is de uitkering die UWV berekent "inclusief vakantiegeld". UWV betaalt daarvan maandelijks 100/108 uit en houdt 8/108 vast voor de uitbetaling in mei (zie §8).

---

## 2. IVA (volledig en duurzaam arbeidsongeschikt)

### 2.1 Hoogte
**IVA = 75% × WIA-maandloon** per kalendermaand. [P] WIA art. 51.

### 2.2 Werken naast de IVA
Per kalendermaand gaat er af: **0,7 × inkomen × (dagloon / ongemaximeerd dagloon)**. [P] WIA art. 52 lid 1.
- Zonder maximum (dagloon ≤ maximumdagloon) is de breuk 1. Elke bruto euro inkomen kost dan **70 cent** IVA.
- Komt het dagloon boven het maximum uit, dan wordt de korting verhoudingsgewijs kleiner.
- Verdien je 12 maanden aaneengesloten per maand **meer dan 20% van het maatmaninkomen per maand**, dan roept UWV je op voor een onderzoek of je nog volledig en duurzaam arbeidsongeschikt bent. [P] WIA art. 52 lid 2. (Lid 3 kent uitzonderingen voor groepen die bij ministeriële regeling zijn aangewezen. Die regeling is niet onderzocht [O].)
- Het inkomensbegrip is hetzelfde als bij de WGA: SV-loon met opgebouwd vakantiegeld (zie §6). [P] WIA art. 52 lid 4; AIB.

### 2.3 Vakantiegeld
De IVA-uitkering bevat 8/108 vakantiebijslag, die in mei wordt betaald (WIA art. 68) [P]. Zie §8.

### 2.4 Rekenvoorbeeld IVA
WIA-maandloon € 3.500 (niet gemaximeerd). Inkomen € 500 per maand.
- IVA = 0,75 × 3.500 = **€ 2.625,00**
- Korting = 0,7 × 500 = € 350,00, dus IVA wordt **€ 2.275,00**
- Totaal bruto: 2.275 + 500 = **€ 2.775,00** (inclusief vakantiegeldcomponent in de uitkering; zie §8)

Gemaximeerd voorbeeld: ongemaximeerd dagloon € 400, maximumdagloon € 309,91, dus maandloon € 6.740,54. Inkomen € 2.000.
- IVA = 0,75 × 6.740,54 = € 5.055,41
- Korting = 0,7 × 2.000 × 309,91/400 = € 1.084,69
- IVA = **€ 3.970,72** [P-afgeleid]

---

## 3. WGA fase 1: loongerelateerde uitkering (LGU)

### 3.1 Wie krijgt een LGU?
Alleen wie aan de **referte-eis** voldoet: in de 36 kalenderweken vóór de eerste dag na afloop van de loondoorbetaling of het ziekengeld, in minstens 26 weken minstens 1 arbeidsuur per week (of een van de WW-varianten). [P] WIA art. 54 lid 3, art. 58. Wie daar niet aan voldoet, gaat **direct naar fase 2** (LAU of vervolguitkering). [P] WIA art. 54 lid 4. Details over de toegang staan in het document van de collega.

### 3.2 Duur

| Regel | Bron |
|---|---|
| Minimaal 3, maximaal 24 maanden, vanaf de eerste dag van het recht | WIA art. 59 lid 1 [P] |
| 1 maand per kalenderjaar arbeidsverleden, voor de eerste 10 jaar | art. 59 lid 2a [P] |
| Boven 10 jaar: 1 maand per jaar arbeidsverleden vóór 2016, ½ maand per jaar na 2015. Halve maanden worden opgeteld; een losse halve maand = 15 kalenderdagen | art. 59 lid 2b [P] |
| Gebroken jaren vóór 2016 tellen als jaren na 2015; jaren na 2015 worden naar beneden afgerond | art. 59 lid 3–4 [P] |
| Verminderd met een direct daaraan voorafgaande IVA-duur (minimaal 1 jaar blijft over), en in bepaalde gevallen met eerder ontvangen WW | art. 59 lid 5–6 [P] |
| Het jaar waarin de uitkering ingaat telt niet mee | UWV-LGU [P] |
| Arbeidsverleden: jaren met ≥ 208 verloonde uren (vanaf 2013), ≥ 52 dagen (1998–2012), en fictief vanaf 18 jaar tot 1998 | WIA art. 15 [P] |

**De LGU loopt altijd de volledige duur, ook als je in die periode meer dan 65% verdient.** [P] UWV-einde. Zie §5 voor de gevolgen daarna.

### 3.3 Hoogte (formule)
Per kalendermaand [P] WIA art. 61 lid 1:
- **maand 1 en 2:** LGU = 0,75 × (WIA-maandloon − inkomen × C/D)
- **vanaf maand 3:** LGU = 0,70 × (WIA-maandloon − inkomen × C/D)
- C/D = gemaximeerd dagloon / ongemaximeerd dagloon (1 als het dagloon onder het maximum blijft).

**Gecontroleerd: het is 75% of 70% van het verschil** tussen het maandloon en het inkomen. Het is **niet** "maandloon × 70% − inkomen". Elke bruto euro die je verdient kost dus 70 cent LGU (75 cent in maand 1–2).

**Is er een grens waarboven iets anders gebeurt?** In de LGU-formule zelf niet: er is geen inkomenseis en geen 50%-regel. Wordt het inkomen × C/D ≥ het maandloon, dan is de uitkering nihil; het recht loopt door. Wél van belang:
- Verdien je in de LGU-periode **meer dan 65% van je maatmaninkomen per uur**, dan kan UWV je AO-% herzien (feitelijke arbeid, zie §5). De LGU loopt door tot de einddatum, maar daarna krijg je hooguit **1 jaar** LAU of VU (WIA art. 56 lid 3 [P]; UWV-einde [P]).

---

## 4. WGA fase 2: loonaanvullingsuitkering (LAU) of vervolguitkering (VU)

### 4.1 De inkomenseis ("50%-regel"), precies
- **Inkomenseis = 50% × RVC per maand.** Vastgesteld op de dag dat het WGA-recht ontstaat. [P] WIA art. 60 lid 2 en lid 4 (RVC "op maandbasis berekend").
- **Getoetst per kalendermaand**: verdien je in een kalendermaand een inkomen ≥ de inkomenseis, dan krijg je LAU, anders VU. [P] WIA art. 60 lid 1. UWV: "UWV bekijkt per maand of u recht heeft op een loonaanvullingsuitkering of een vervolguitkering." [P] UWV-LAU, UWV-VU.
- Je kunt dus **elke maand wisselen** tussen LAU en VU. Er staat in de wet geen wachttijd voor de wisseling op basis van inkomen. In de praktijk stelt UWV het definitief achteraf vast per beoordelingsperiode (zie §6.4).
- **De inkomenseis wordt herzien** pas nadat een wijziging in de RVC **2 kalendermaanden** heeft voortgeduurd. [P] art. 60 lid 2.
- **Geen inkomenseis** als je met arbeid **≤ 20% van je maatmaninkomen per uur** kunt verdienen (in de praktijk: AO 80–100% en "volledig arbeidsongeschikt maar niet duurzaam"). Dan krijg je altijd LAU. [P] art. 60 lid 1a, 2, 3. Gaat je RVC later boven 20%, dan blijft de inkomenseis nog **24 kalendermaanden** buiten toepassing (art. 60 lid 3) [P].
- Wat "inkomen" is: zie §6. Kort gezegd: SV-loon in die maand, met opgebouwd vakantiegeld in plaats van uitbetaald vakantiegeld (AIB art. 3:2, 4:1 lid 8) [P].

### 4.2 Loonaanvullingsuitkering (LAU), drie situaties
De **overblijvende verdiencapaciteit** = 2 × inkomenseis = de RVC per maand. [P] art. 61 lid 3.

| Inkomen in de maand | LAU per maand | Bron |
|---|---|---|
| **≥ RVC** (of er geldt geen inkomenseis) | **0,70 × (WIA-maandloon − inkomen × C/D)** | art. 61 lid 2 (verwijst naar lid 1 sub b) [P] |
| **≥ 50% RVC maar < RVC** | **0,70 × (WIA-maandloon − RVC × G/H)**, waarbij G/H = gemaximeerd / ongemaximeerd dagloon. Er wordt dus **de RVC** afgetrokken, niet je werkelijke inkomen. | art. 61 lid 4 [P] |
| idem, maar het bedrag hierboven is lager dan de VU (AO-percentage × minimumloon) | Verhoogd tot **VU-bedrag**, maar maximaal 0,70 × (WIA-maandloon − inkomen × C/D) | art. 61 lid 5 [P] |

UWV zegt hetzelfde in gewone taal: "Verdient u meer dan 50% maar minder dan 100% van dat bedrag: het bedrag uit de brief van UWV wordt van uw WIA-maandloon afgetrokken. Uw uitkering is ook 70% van wat overblijft." [P] UWV-LAU.

**Gevolg:** verdien je tussen 50% en 100% van de RVC, dan is de LAU vast. Elke extra euro inkomen komt dan volledig bovenop je totaal. Boven de RVC kost elke extra euro 70 cent LAU.

### 4.3 Vervolguitkering (VU)
**VU = uitkeringspercentage × H**, met H = **minimumloon per maand**, of het WIA-maandloon als dat lager is. [P] WIA art. 62 lid 1.

| AO-klasse | Uitkeringspercentage | VU per maand vanaf 01-07-2026 (H = € 2.523,96) |
|---|---|---|
| < 35% | 0% (geen WGA) | – |
| 35–45% | 28% | € 706,71 |
| 45–55% | 35% | € 883,39 |
| 55–65% | 42% | € 1.060,06 |
| 65–80% | 50,75% | € 1.280,91 |
| ≥ 80% | 70% | € 1.766,77 (in de praktijk niet relevant: wie ≥ 80% AO is heeft meestal geen inkomenseis en krijgt LAU) |

Bron van de percentages: WIA art. 61 lid 6 [P] en UWV-VU [P]. De VU-bedragen zijn [P-afgeleid]:
- "Minimumloon" in de WIA = referentiemaandloon (WML art. 8 lid 1 b) **plus 8% vakantietoeslag** (WIA art. 12 lid 1 b) [P].
- Referentiemaandloon per 01-07-2026 = € 2.337,00 (Stcrt-WML) [P], dus H = 2.337,00 × 1,08 = **€ 2.523,96**.
- **[O]:** er is geen UWV-publicatie gevonden die dit maandbedrag voor de VU letterlijk noemt. De afleiding volgt de wettekst.

Overige regels:
- Een wijziging van de AO-klasse werkt pas door nadat die **2 kalendermaanden** heeft geduurd. [P] art. 61 lid 7, art. 62 lid 4.
- Wie buiten NL/EU/EER/Zwitserland woont, krijgt een woonlandpercentage (max 100). [P] art. 62 lid 2.
- Het inkomen wordt **niet** van de VU afgetrokken: de VU hangt niet af van wat je verdient, zolang je onder de inkomenseis blijft. [P] art. 62 bevat geen inkomensverrekening.

### 4.4 Het "klif" bij de inkomenseis
Bij een inkomen net onder de inkomenseis krijg je VU, net erboven LAU. Het totale inkomen kan bij die grens **met honderden euro's springen**. Zie voorbeeld A (§10). De tool moet dit expliciet laten zien.

---

## 5. Wanneer verandert je AO-% door wat je verdient, en wanneer raak je de WGA kwijt?

### 5.1 Herbeoordeling op basis van feitelijk verdiende loon
- **Structurele regel:** het AO-% kan worden gebaseerd op de **arbeid die je feitelijk verricht**, als dat leidt tot een **lager** AO-% dan de theoretische functies. Dat geldt ook voor arbeid die je na het intreden van de arbeidsongeschiktheid bent gaan doen en die je aankunt. [P] SB art. 9 sub h en i.
- **Tijdelijke regel "Praktisch beoordelen" (art. 9a SB), in werking vanaf 1 juli 2024:** UWV vergelijkt het maatmaninkomen per uur met wat je **feitelijk verdient** in de arbeid die je na het intreden van de arbeidsongeschiktheid doet. Voorwaarden: de verzekeringsarts vindt die arbeid belastbaar, je verdient meer dan 20% van het maatmaninkomen, en het AO-% wordt er lager door. [P] SB art. 9a; Stb. 2024, 185 (https://zoek.officielebekendmakingen.nl/stb-2024-185.pdf). Art. 9a vervalt op een datum die bij KB wordt bepaald. Secundaire bronnen spreken van een duur van 3 jaar, tot 1 juli 2027 [S, O].
- **In gewone taal:** ga je structureel **meer verdienen dan je RVC**, dan kan UWV bij een herbeoordeling je feitelijke loon als nieuwe RVC nemen. Je AO-% daalt dan, en daarmee je klasse (VU-bedrag), je inkomenseis en de LAU-formule.
- **Wat de herbeoordeling start:** dat staat niet in de wet. UWV ziet loon via de polisadministratie. Werkgevers, eigenrisicodragers en verzekeraars kunnen een herbeoordeling aanvragen; sinds 1 april 2026 met een verplicht standaard aanvraagformulier [P] OWB-2027. Een automatische trigger "na X maanden boven RVC" is **niet gevonden** [O].

### 5.2 Wanneer eindigt de WGA?
| Situatie | Gevolg | Bron |
|---|---|---|
| AO < 35% na herbeoordeling, omdat UWV vindt dat je ≥ 65% kúnt verdienen | WGA eindigt **2 maanden** na de dag dat je niet meer gedeeltelijk arbeidsgeschikt bent, maar niet vóór het einde van de LGU | WIA art. 56 lid 2 [P]; UWV-einde [P] |
| AO < 35% **omdat je met arbeid feitelijk meer dan 65% van het maatmaninkomen per uur verdient** | WGA eindigt **1 jaar** later, maar niet vóór het einde van de LGU | WIA art. 56 lid 3 [P]; UWV-einde: "Daarna krijgt u maximaal 1 jaar een loonaanvullingsuitkering of vervolguitkering" [P] |
| Herleving | Wordt je binnen **5 jaar** weer ≥ 35% AO door dezelfde oorzaak, dan herleeft het recht (andere oorzaak: binnen 4 weken) | WIA art. 57 [P] |
| AOW-leeftijd | Einde | UWV-einde [P] |

**Voor de tool:** "65%" betekent hier **65% van het maatmaninkomen per uur** (art. 56 lid 3), niet van het WIA-maandloon. Werkt iemand minder uren dan vroeger, dan kan een hoog uurloon toch tot een AO < 35% leiden.

### 5.3 Wat als je meer gaat verdienen dan je RVC (zonder herbeoordeling)?
- Fase 2: je blijft LAU krijgen, met de formule 0,70 × (maandloon − inkomen). De LAU daalt met 70 cent per extra euro. Bij inkomen ≥ maandloon wordt de LAU nihil. [P] art. 61 lid 2.
- Het risico is de herbeoordeling (§5.1): RVC omhoog, AO-% omlaag, mogelijk een lagere klasse of geen WGA meer.

---

## 6. Inkomensverrekening per maand

### 6.1 Welk inkomen telt?
- **Werknemers:** het **SV-loon** (Wfsv art. 16) van de maand. Niet meegeteld: WIA/WW/ZW-uitkeringen zelf, TW-toeslag en werkgeversaanvullingen daarop. [P] AIB art. 3:2 lid 1 a.
- **Zelfstandigen / ROW:** belastbare winst (met ondernemersaftrek en MKB-vrijstelling) of resultaat, evenredig verdeeld over de maanden van het jaar. [P] AIB art. 3:2 lid 1 c–d, art. 4:1 lid 5.
- Het maximumpremieloon speelt **geen** rol: alle SV-loon telt. [U] UWV-WU-inkomen.
- Wat je wél en niet moet doorgeven (bijvoorbeeld vakantiegeld na einde contract: wel; transitievergoeding, partnerinkomen, PAWW: niet): [P] UWV-inkomsten.

### 6.2 Vakantiegeld van je (nieuwe) baan
- UWV neemt het **per maand opgebouwde vakantiegeld** mee als inkomen, **niet** het in mei uitbetaalde bedrag. Hetzelfde geldt voor een opgebouwd arbeidsvoorwaardenbedrag (13e maand/EPS, IKB). [P] AIB art. 4:1 lid 8 ("Het UWV neemt … het in een aangiftetijdvak opgebouwde bedrag aan vakantiebijslag … in aanmerking, waarbij het betaalde bedrag … niet in aanmerking wordt genomen"); [U] UWV-WU-inkomen: "SV-loon – uitbetaalde vakantietoeslag en eindejaarsuitkering + opgebouwde vakantietoeslag + opgebouwde eindejaarsuitkering. Dat bedrag kort je op de uitkering."
- **Gevolg voor de tool:** inkomen voor de WIA ≈ bruto maandsalaris **× 1,08** (bij 8% vakantiegeld), plus een maandelijks opgebouwde 13e maand als die een arbeidsvoorwaardenbedrag is. In mei is er dan **geen** piek.
- All-in-verloners (vakantiegeld elke maand uitbetaald): het zit al in het SV-loon. [U]

### 6.3 Bonus, 13e maand, eindejaarsuitkering
| Soort | Wanneer verrekend | Bron |
|---|---|---|
| Eenmalige bonus, winstuitkering of tantième (geen EPS/arbeidsvoorwaardenbedrag) | In het aangiftetijdvak waarin de werkgever die opgeeft, in principe de **maand van betaling** ("bonus 2012" betaald in januari 2013 telt in januari 2013) | AIB art. 4:1 lid 3 [P]; UWV-WU-inkomen [U] |
| 13e maand / eindejaarsuitkering met reservering (EPS, sinds 2022 "arbeidsvoorwaardenbedrag"), mits het recht niet afhangt van een onzekere gebeurtenis | **Per maand opgebouwd** bedrag | AIB art. 4:1 lid 8 [P]; UWV-WU-inkomen [U] |
| Eindejaarsuitkering onder voorwaarde (bijvoorbeeld alleen bij indiensttreding op 1 december, of winstafhankelijk) | Geen EPS, dus als eenmalige betaling in de maand van betaling | UWV-WU-inkomen [U] |
| Nabetaling over een periode vóór de uitkering (bijvoorbeeld uitbetaling van verlofdagen uit de wachttijd) | Wordt toegerekend aan die eerdere periode, dus **niet** verrekend | AIB art. 4:1 lid 7 [P]; UWV-WU-verrekenen [U] |

**Gevolg bij de LAU:** een bonus in één maand kan je die maand boven de RVC tillen. De LAU daalt dan in die maand met 70% van het deel boven de RVC. Zie voorbeeld D.

### 6.4 4-wekenloon versus maandloon
- Inkomen wordt **herleid tot een bedrag per kalendermaand**, met een maand van 21,75 dagen en een week van 5 dagen. [P] AIB art. 4:1 lid 1a en lid 2. (De WW-regel "4-wekenperiode telt in de maand waarin die eindigt" uit lid 9 geldt **alleen voor de WW**.)
- UWV-werkwijze: een 4-wekenperiode heeft 20 werkdagen. Het loon wordt naar rato van de werkdagen over de kalendermaanden verdeeld en daarna gecorrigeerd naar 21,75 dagen. Bij een vast 4-wekenloon geldt: **maandinkomen = 4-wekenloon × 21,75 / 20 = × 1,0875**. [U] UWV-WU-verrekenen ("Loon per 4 weken … 2000 x 21,75/20 = 2175").

### 6.5 Hoe en wanneer UWV verrekent (voorschot, achteraf, terugvordering)
- Sinds 1 april 2012 baseert UWV de WIA-uitkering in principe op een **geschat inkomen**. Je krijgt een **bruto voorschot** gedurende een beoordelingsperiode, in principe **6 maanden** (soms 3 of 12). Na afloop rekent UWV de hele periode **definitief af op basis van de polisadministratie** (of loonstroken). [U] UWV-WU-verrekenen. Grondslag: Awb titel 4.4 (voorschot); AIB art. 4:1 lid 6 (gemiddeld inkomen, herberekening per maximaal 12 maanden) [P].
- Per maand te veel of te weinig betaalde bedragen worden binnen de periode **gesaldeerd**. Alleen een netto teveel leidt tot een **terugvordering**, die met toekomstige uitkering wordt verrekend. [U]
- Op verzoek moet UWV **maandelijks** definitief afrekenen ("hebben we geen wettelijke grond om dat te weigeren"). [U]
- Polisgegevens zijn meestal pas eind van de **volgende maand** beschikbaar. [U]
- Wijzigingen in inkomsten moet je binnen 2 dagen doorgeven, inkomsten binnen 1 week. [P] UWV-inkomsten.
- Een UWV-verslag uit 2025 noemt dat UWV signalen uit de polisadministratie sneller wil gebruiken om voorschot of cyclus aan te passen bij wisselend inkomen [S, niet zelf gelezen].
- **[O]** De UWV-documenten [U] hebben geen datum. De beschreven werkwijze kan in 2026 zijn veranderd. Geen recentere publieke bron gevonden.

---

## 7. Toeslagenwet (TW) bij de WGA
- De WGA (en IVA) is een loondervingsuitkering. Ligt je (gezins)inkomen per dag onder de TW-norm, dan kan UWV aanvullen tot het sociaal minimum. [P] TW art. 2, 8.
- Normen per dag vanaf 01-07-2026 (TW, geconsolideerd): gehuwd/samenwonend € 107,45; alleenstaande 21+ zelfstandig wonend € 76,75; alleenstaande met meerderjarige medebewoner € 49,94. [P] TW art. 2. Zie de tabel in doc 02.
  - **Let op:** de HTML-versie van Stcrt. 2026, 20221 noemt bij art. 2 lid 2 b onder 1° "€ 67,75". De geconsolideerde wettekst en uwv.nl noemen € 76,75, en de waarde per 01-01-2026 was € 75,62 (Stcrt. 2025, 43553). Waarschijnlijk is € 67,75 een tikfout in de HTML-weergave [O].
- Partnerinkomen telt mee. Geen TW als je partner na 31-12-1971 geboren is, tenzij er een kind < 12 jaar in huis is. [P] TW art. 3, 6.
- De toeslag is gemaximeerd op het verschil tussen dagloon (zonder vakantiebijslag) en uitkering als je dagloon onder (een percentage van) het minimumloon lag. [P] TW art. 8a.
- Vrijlating van inkomen uit arbeid: 5% van het minimumloon + 30% van het meerdere, maximaal 15% van het minimumloon, gedurende maximaal 2 jaar. [P] TW art. 7. **[O]** De precieze toepassing op WGA-gerechtigden (bijvoorbeeld de start van de 2-jaarstermijn) is niet uitgezocht.
- **Relevantie:** de TW is vooral van belang bij de **vervolguitkering**. Die is (bij 55–65% AO) € 1.060,06 per maand, ruim onder het sociaal minimum voor een alleenstaande. De tool kan het beste een signaal geven ("je kunt mogelijk TW krijgen") en de TW niet exact berekenen.

---

## 8. Vakantiegeld over de WIA-uitkering
- De berekende uitkering bevat al vakantiegeld, want het dagloon bevat opgebouwd vakantiegeld (§1.3).
- UWV betaalt **8/108** van de uitkering als vakantiebijslag, jaarlijks **in mei**, over de voorafgaande maanden (of eerder als het recht eindigt). [P] WIA art. 68 lid 1. Bij een wijziging van het WML-vakantiepercentage verandert de breuk mee (lid 2).
- Dit geldt voor alle WIA-uitkeringen (IVA, LGU, LAU, VU). De VU is gebaseerd op "minimumloon inclusief vakantietoeslag" (WIA art. 12), dus ook daar zit het erin.
- **Maandelijkse uitbetaling = berekende uitkering × 100/108.** Voorbeeld: LGU € 2.450, dan maandelijks bruto **€ 2.268,52** uitbetaald en € 181,48 per maand gereserveerd voor mei. [P-afgeleid]
- **Voor de tool:** toon "bruto uitkering inclusief vakantiegeld" (de wettelijke uitkomst) en "bruto per maand op je rekening (excl. vakantiegeld)" apart. Doe hetzelfde met het salaris: SV-loon versus SV-loon + opgebouwd vakantiegeld.
- Daarnaast bestaat de tegemoetkoming arbeidsongeschikten, € 226,28 per jaar in 2026, uitbetaald in september (WIA art. 63a [P]; Stcrt-jan26 [P]), voor wie op 1 juli recht heeft op IVA of WGA bij 80–100% AO (OWB-2027 [P]). De afschaffing is uitgesteld naar 01-01-2029 (OWB-2027 [P]).

---

## 9. Indexering
- **Dagloon en WIA-maandloon** worden herzien op de dag waarop, en in de mate waarin, het referentieminimummaandloon (WML art. 8 lid 1 b) wordt herzien. Dat gebeurt op **1 januari en 1 juli**. Het percentage staat in de Staatscourant. Er komt geen nieuwe beschikking; UWV past het toe bij de eerstvolgende betaling. [P] WIA art. 14.
- Daardoor stijgen IVA, LGU en LAU mee. De **VU** stijgt mee via het minimumloon (H).
- **Vóór de WIA-start:** minimumloonverhogingen tussen het einde van het refertejaar en de WIA-ingangsdatum worden ook toegepast. [P] DLB art. 23.
- **Maatmaninkomen:** wordt tot het arbeidskundig onderzoek aangepast met de **CAO-lonenindex per uur** van het CBS (inclusief bijzondere beloningen). Daarna wordt het bij herzieningen niet meer aangepast, behalve bij een hernieuwde vaststelling. [P] SB art. 8.
- **RVC / inkomenseis:** **[O]** geen bron gevonden of en hoe deze tussentijds worden geïndexeerd. Dit is een open vraag.

| Indexatiedatum | % dagloonherziening (WIA art. 14) | Bron |
|---|---|---|
| 01-07-2025 | 2,46% (stijging minimumloon, genoemd in Stcrt. 2025, 42324) | [P, indirect] |
| 01-01-2026 | **2,16%** | Stcrt. 2025, 43553, onderdeel T [P] |
| 01-07-2026 | **1,86%** | Stcrt. 2026, 20221, onderdeel L [P] |
| 01-01-2027 | nog niet bekend (wordt eind 2026 gepubliceerd) | – |

Formule: `dagloon_nieuw = dagloon_oud × (1 + pct)`. Er is geen afrondingsregel voor het WIA-dagloon gevonden [O]. UWV rondt in de praktijk af op centen [aanname].

---

## 10. Rekenvoorbeelden

**Aannames voor alle voorbeelden (tenzij anders vermeld):** peildatum 1 juli 2026 of later; WIA-maandloon € 3.500 (onder het maximum, dus C/D = 1); "inkomen" = WIA-relevant inkomen per kalendermaand (SV-loon plus opgebouwd vakantiegeld); minimumloon WIA (H) = € 2.523,96. Alle bedragen bruto en inclusief de vakantiegeldcomponent van de uitkering (maandelijkse uitbetaling = × 100/108).

### Voorbeeld A: de opdracht (AO 60%, RVC € 1.400)
- AO 60%, dus klasse 55–65%, dus VU-percentage 42%: VU = 0,42 × 2.523,96 = **€ 1.060,06**
- Inkomenseis = 50% × 1.400 = **€ 700**

**LGU-fase (alleen als je aan de referte-eis voldoet)**

| Inkomen | LGU maand 1–2 (75%) | Totaal | LGU maand 3+ (70%) | Totaal |
|---|---|---|---|---|
| € 0 | 0,75 × 3.500 = € 2.625,00 | € 2.625,00 | 0,70 × 3.500 = € 2.450,00 | € 2.450,00 |
| € 600 | 0,75 × 2.900 = € 2.175,00 | € 2.775,00 | 0,70 × 2.900 = € 2.030,00 | € 2.630,00 |
| € 800 | 0,75 × 2.700 = € 2.025,00 | € 2.825,00 | 0,70 × 2.700 = € 1.890,00 | € 2.690,00 |
| € 1.600 | 0,75 × 1.900 = € 1.425,00 | € 3.025,00 | 0,70 × 1.900 = € 1.330,00 | € 2.930,00 |

**Fase 2 (na de LGU, of direct als je geen LGU krijgt)**

| Inkomen | Toets | Uitkering | Berekening | Totaal bruto |
|---|---|---|---|---|
| € 0 | < € 700, dus VU | € 1.060,06 | 0,42 × 2.523,96 | **€ 1.060,06** (+ mogelijk TW) |
| € 600 | < € 700, dus VU | € 1.060,06 | idem; inkomen wordt niet verrekend | **€ 1.660,06** |
| € 800 | ≥ 700 en < 1.400, dus LAU lid 4 | € 1.470,00 | 0,70 × (3.500 − **1.400**); check lid 5: 1.470 ≥ 1.060,06, dus geen ophoging | **€ 2.270,00** |
| € 1.600 | ≥ 1.400, dus LAU lid 2 | € 1.330,00 | 0,70 × (3.500 − 1.600) | **€ 2.930,00** |

Wat dit laat zien:
- **Klif bij € 700:** bij € 699 is het totaal 699 + 1.060,06 = € 1.759,06; bij € 700 is het 700 + 1.470 = € 2.170,00. Dat is een sprong van **€ 410,94**.
- Tussen € 700 en € 1.400 blijft de LAU vast op € 1.470. Elke extra euro telt volledig mee in je totaal.
- Boven € 1.400 kost elke extra euro 70 cent LAU. Bij € 1.600 is het totaal in fase 2 (€ 2.930) gelijk aan dat in de LGU-fase maand 3+.
- Een tooltekst kan zijn: "Je verdient € 800, dat is 77% minder dan je WIA-maandloon en 57% van je RVC. Na je LGU (einddatum: zie je brief) krijg je LAU, omdat je boven de inkomenseis van € 700 zit. Zak je in een maand onder € 700, dan krijg je die maand VU en daalt je totaal met € …"

### Voorbeeld B: 4-wekenloon en vakantiegeld (zelfde persoon)
Nieuwe baan: € 1.200 bruto per 4 weken, 8% vakantiegeld (in mei uitbetaald).
- Maandinkomen = 1.200 × 21,75 / 20 = € 1.305,00 [U]
- Plus opgebouwd vakantiegeld 8% = € 104,40, dus WIA-inkomen = **€ 1.409,40** [P AIB 4:1 lid 8]
- € 1.409,40 ≥ RVC € 1.400, dus LAU = 0,70 × (3.500 − 1.409,40) = **€ 1.463,42**. Totaal € 2.872,82.
- **Valkuil:** rekent iemand alleen met € 1.200 (zonder 21,75/20 en zonder vakantiegeld), dan denkt diegene "onder RVC, LAU = € 1.470". Het verschil is klein, maar bij inkomens rond de **inkomenseis** kan deze omrekening bepalen of je LAU of VU krijgt.
- In **mei** (uitbetaling vakantiegeld) is er **geen** extra verrekening: het opgebouwde vakantiegeld is al per maand meegeteld.

### Voorbeeld C: hoog loon boven het maximumdagloon (WGA, LGU-fase)
Ongemaximeerd dagloon € 400; maximumdagloon € 309,91, dus WIA-maandloon € 6.740,54. Inkomen € 2.000.
- LGU (70%) = 0,70 × (6.740,54 − 2.000 × 309,91/400) = 0,70 × (6.740,54 − 1.549,55) = **€ 3.633,69**
- Zonder de C/D-correctie zou het € 3.318,38 zijn. De wet voorkomt dus dat iemand boven het maximum dubbel wordt gekort.
- In fase 2 werkt de LAU-formule (lid 4) met RVC × G/H op dezelfde manier.

### Voorbeeld D: bonus in één maand (fase 2)
Zelfde persoon als in A. Vast inkomen € 800 per maand (LAU € 1.470). In december een eenmalige bonus van € 1.000 (geen EPS).
- December-inkomen € 1.800 ≥ RVC, dus LAU = 0,70 × (3.500 − 1.800) = **€ 1.190** (€ 280 lager dan normaal)
- De netto bonus-opbrengst in bruto termen: € 1.000 − € 280 = € 720
- Is de 13e maand een arbeidsvoorwaardenbedrag dat per maand wordt opgebouwd (bijvoorbeeld 8,33% per maand), dan telt UWV elke maand ≈ € 66,67 extra mee en is er geen december-piek. [P AIB 4:1 lid 8]

### Voorbeeld E: IVA met werk
Zie §2.4: maandloon € 3.500, inkomen € 500, dus IVA € 2.275 en totaal € 2.775.

### Voorbeeld F: 35–45% AO, geen werk, fase 2
AO 40%, dus VU = 0,28 × 2.523,96 = **€ 706,71**. Als dat (met partnerinkomen) onder het sociaal minimum blijft, is er mogelijk TW (§7).

---

## 11. Wijzigingen 2025–2027 (en verder) op deze onderdelen

| Onderwerp | Inhoud | Datum | Status | Bron |
|---|---|---|---|---|
| Praktisch beoordelen (SB art. 9a) | AO-% op basis van feitelijk verdiend loon | vanaf 01-07-2024; einde bij KB (secundair: 01-07-2027) | **Geldend recht** (tijdelijk) | Stb. 2024, 185 [P]; SB art. 9a [P]; einddatum [S] |
| Indexering daglonen | +2,16% (01-01-2026), +1,86% (01-07-2026) | zie data | Geldend | Stcrt-jan26, Stcrt-jul26 [P] |
| Verkorting WW-duur van 24 naar 12 maanden; daaraan gekoppeld kortere WGA-LGU | Maximale WW-duur naar 12 maanden. De begroting noemt hogere "WW- en loongerelateerde WGA-uitgaven" door het uitstel, dus de LGU loopt mee | uitgesteld naar **01-01-2029** | **Voornemen / wetsvoorstel** (niet aangenomen). Of en hoe WIA art. 59 wordt aangepast: **[O]** wettekst niet gezien | OWB-2027 [P]; secundair: uitstel en 18-maandenvariant [S] |
| Verlaging maximumdagloon met 20% | Eerder voornemen; **teruggedraaid** | n.v.t. | Kabinetsbesluit (Prinsjesdag 2026) | OWB-2027 [P] |
| Afschaffing tegemoetkoming arbeidsongeschikten (€ 226,28) | Afschaffing | uitgesteld naar **01-01-2029** | Voornemen / uitgesteld | OWB-2027 [P] |
| Afschaffing IVA en duurzaamheidscriterium | Coalitieakkoord: IVA en duurzaamheidscriterium afschaffen; eerst gesprek met sociale partners | geen datum | **Plan** (geen wetsvoorstel gevonden) | OWB-2027 [P] |
| Herbeoordelingen | Verplicht standaard aanvraagformulier voor WIA-herbeoordelingen van werkgevers, verzekeraars en private uitvoerders | sinds 01-04-2026 | Uitvoeringspraktijk | OWB-2027 [P] |
| Referte-eis WGA gelijktrekken met WW, geautomatiseerd beoordelen | Uitvoeringsvereenvoudiging | niet vermeld | Maatregel/plan | OWB-2027 [P] |
| Inkomstenverhouding (IKV) in de polisadministratie | Wijziging Dagloonbesluit/SUWI ("overgangsrecht invoering inkomstenverhouding", DLB art. 27f) | **01-01-2028** | Vastgesteld, nog niet in werking | DLB (wetten.overheid.nl: "Treedt in werking op 01-01-2028") [P]; achtergrond [S] |
| Toeslagenwet | Hervormingsagenda inkomensondersteuning, geen concreet voorstel | – | Plan | OWB-2027 [P] |
| Wetsvoorstel "toets op re-integratie-inspanningen en WIA-voorschotregeling" | Internetconsultatie gevonden, inhoud niet leesbaar opgehaald | ? | **[O]** | https://internetconsultatie.nl/wetsvoorstelwijzigingtoetsopreintegratieinspanningenenwiavoorschotregeling |

Geen wijzigingen gevonden in de WIA-uitkeringsformules zelf (art. 51, 52, 59–62, 68) met ingang van 2025, 2026 of 2027 [P: de geldende tekst per 01-07-2026 bevat de hierboven geciteerde formules]. Art. 15 (arbeidsverleden) heeft een "wijziging zonder datum inwerkingtreding" die niet is onderzocht [O].

---

## 12. Open vragen / onzekerheden

1. **Indexering van de RVC en de inkomenseis:** de wet regelt alleen indexering van het dagloon (art. 14) en van het maatmaninkomen tot het AD-onderzoek (SB art. 8). Of UWV de RVC per maand halfjaarlijks verhoogt (in de brief of in de praktijk) is niet gevonden. Dat bepaalt of de inkomenseis met de tijd meeloopt. Advies: laat de gebruiker de actuele RVC en inkomenseis uit de laatste UWV-brief invullen.
2. **Zit vakantiegeld in de RVC?** Het inkomen dat wordt getoetst bevat opgebouwd vakantiegeld (AIB 4:1 lid 8; SB art. 11a voor feitelijke inkomsten). Of de theoretische RVC uit de CBBS-functies ook 8% vakantiebijslag bevat, staat niet expliciet in de gevonden teksten (SB art. 10 lid 5: "loon in de zin van art. 16 Wfsv … gebruikelijk voor de functie"). Waarschijnlijk wel, maar dat is niet bevestigd.
3. **Minimumloon per maand voor de VU (€ 2.523,96):** afgeleid uit WIA art. 12 en het referentiemaandloon. Er is geen UWV-tabel gevonden die dit bedrag letterlijk noemt.
4. **Maximumdagloon per 01-07-2026 (€ 309,91):** berekend en indirect bevestigd (IVA-maximum in OWB-2027, doc 02 citeert uwv.nl). Niet zelf op uwv.nl gelezen.
5. **UWV-verrekenwerkwijze (voorschot 6 maanden, saldering, 4-wekenomrekening):** komt uit UWV-wetsuitleg-PDF's zonder datum (voorbeelden uit 2012–2016). Mogelijk is de werkwijze sindsdien aangepast. Een recentere publieke bron is niet gevonden.
6. **Automatische herbeoordeling bij inkomen boven de RVC:** geen wettelijke termijn of trigger gevonden, behalve het IVA-onderzoek na 12 maanden > 20% maatman (art. 52 lid 2).
7. **Toeslagenwet:** discrepantie tussen € 67,75 (Stcrt-HTML) en € 76,75 (geconsolideerde wet) voor alleenstaanden 21+. Waarschijnlijk een tikfout in de Stcrt-HTML; de authentieke PDF is niet gecontroleerd. De toepassing van de TW-vrijlating (art. 7) op de WGA is niet uitgezocht.
8. **Afschaffing IVA, verkorting LGU:** alleen plannen of voornemens; geen wettekst. De uiteindelijke maximale LGU-duur (12 of 18 maanden) en de ingangsdatum (2028 of 2029) zijn onzeker.
9. **Wekeneis versus jareneis:** OWB-2027 beschrijft voor de WGA-LGU een "jareneis (4 van 5 jaar ≥ 208 uur) voor verlengde uitkeringsduur". In de WIA-tekst (art. 58–59) is alleen de wekeneis en de arbeidsverledenberekening gezien. Dit hoort bij het toegangsonderzoek van de collega.
10. **Afrondingsregels** (dagloon, maandloon, uitkering): niet gevonden in de wet. UWV rondt waarschijnlijk af op centen [aanname].

---

## 13. Rekenregels voor de tool (pseudo-code)

```text
# ---------- Constanten (bijwerken per 1 jan / 1 jul) ----------
MAX_DAGLOON            = 309.91        # vanaf 2026-07-01  [P-afgeleid; 304.25 × 1.0186]
REF_MINIMUMMAANDLOON   = 2337.00       # WML art 8 lid 1 b, vanaf 2026-07-01 [P]
WIA_MINIMUMLOON_MAAND  = REF_MINIMUMMAANDLOON * 1.08   # = 2523.96, WIA art 12 lid 1 b
FACTOR_MAAND           = 21.75
VAKANTIE_BREUK         = 8/108         # WIA art 68
VU_PCT = [ (0,35,0.0), (35,45,0.28), (45,55,0.35), (55,65,0.42), (65,80,0.5075), (80,101,0.70) ]  # art 61 lid 6
INDEX = { "2026-01-01": 0.0216, "2026-07-01": 0.0186 }   # WIA art 14 [P]

# ---------- Invoer (uit beslissingsbrief + gebruiker) ----------
wia_maandloon      # of: wia_dagloon * 21.75  (gemaximeerd bedrag uit brief)
dagloon_ongemax    # optioneel; default = wia_maandloon/21.75  => factor 1
ao_pct             # arbeidsongeschiktheidspercentage (of klasse)
rvc_maand          # resterende verdiencapaciteit per maand (uit brief)
geen_inkomenseis   # true als RVC <= 20% maatman per uur (brief vermeldt dit / AO >= 80%)
fase               # 'IVA' | 'LGU' | 'NA_LGU'
lgu_maandnummer    # 1,2,3,... (alleen LGU)

# ---------- Stap 1: WIA-relevant inkomen per kalendermaand ----------
function inkomen_maand(bruto_salaris, periode, vakantiegeld_pct=0.08,
                       eps_maand_opbouw=0, eenmalige_bonus_deze_maand=0,
                       all_in=false):
    if periode == '4weken':
        basis = bruto_salaris * 21.75 / 20          # [U] UWV-werkwijze; AIB 4:1 lid 2
    else:
        basis = bruto_salaris
    vg = all_in ? 0 : basis * vakantiegeld_pct      # opgebouwd, niet uitbetaald (AIB 4:1 lid 8)
    return basis + vg + eps_maand_opbouw + eenmalige_bonus_deze_maand
    # NB: uitbetaald vakantiegeld in mei / uitbetaalde EPS NIET optellen.

factor = min(1, MAX_DAGLOON / dagloon_ongemax)        # C/D, B/C, G/H in de wet

# ---------- Stap 2: uitkering per maand (incl. vakantiegeldcomponent) ----------
function uitkering(fase, inkomen):
    if fase == 'IVA':                                  # art 51, 52
        return max(0, 0.75*wia_maandloon - 0.70*inkomen*factor)

    if fase == 'LGU':                                  # art 61 lid 1
        pct = (lgu_maandnummer <= 2) ? 0.75 : 0.70
        return max(0, pct*(wia_maandloon - inkomen*factor))

    if fase == 'NA_LGU':                               # art 60, 61, 62
        H   = min(WIA_MINIMUMLOON_MAAND, wia_maandloon)
        vu  = vu_pct(ao_pct) * H
        if geen_inkomenseis:
            return {soort:'LAU', bedrag:max(0, 0.70*(wia_maandloon - inkomen*factor))}
        inkomenseis = 0.5 * rvc_maand
        if inkomen < inkomenseis:
            return {soort:'VU', bedrag: vu}            # inkomen NIET verrekend
        if inkomen >= rvc_maand:
            return {soort:'LAU', bedrag:max(0, 0.70*(wia_maandloon - inkomen*factor))}  # lid 2
        # 50% <= inkomen < RVC
        lau = 0.70*(wia_maandloon - rvc_maand*factor)                               # lid 4
        if lau < vu:                                                                  # lid 5
            lau = min(vu, 0.70*(wia_maandloon - inkomen*factor))
        return {soort:'LAU', bedrag: max(0, lau)}

# ---------- Stap 3: presentatie ----------
totaal_bruto          = inkomen_excl_vakantiegeld_opbouw + uitkering      # wat binnenkomt (bij benadering)
uitkering_per_maand   = uitkering * 100/108          # maandelijkse betaling
vakantiegeld_mei      = som(uitkering over jun..mei) * 8/108
verschil_tov_maandloon_pct = 1 - inkomen / wia_maandloon
pct_van_rvc           = inkomen / rvc_maand

# ---------- Stap 4: signalen / waarschuwingen ----------
if fase=='NA_LGU' and !geen_inkomenseis and |inkomen - 0.5*rvc_maand| < 100:
    waarschuw("Je zit vlak bij de inkomenseis; één maand eronder = VU (klif van ≈ "
              + (0.70*(wia_maandloon - rvc_maand*factor) - vu + 0) + ")")
if inkomen > rvc_maand:
    info("Je verdient meer dan je RVC. UWV kan bij een herbeoordeling je feitelijke loon "
         "als RVC nemen (Schattingsbesluit art 9 sub h / art 9a) -> lager AO-%.")
if ao_pct_feitelijk(inkomen_per_uur, maatman_per_uur) < 35:   # alleen als gebruiker uurlonen invult
    info("Verdien je >65% van je maatmaninkomen per uur: WGA stopt 1 jaar na herbeoordeling "
         "(niet vóór einde LGU) – WIA art 56 lid 3.")
if fase=='IVA' and inkomen > 0.20*maatman_maand (12 mnd aaneengesloten):
    info("UWV roept je op voor onderzoek naar voortbestaan IVA (art 52 lid 2).")
if fase=='NA_LGU' and soort=='VU':
    info("Mogelijk recht op Toeslagenwet (aanvulling tot sociaal minimum) – partnerinkomen telt mee.")

# ---------- Stap 5: LGU-duur (indicatief; toegang = ander document) ----------
function lgu_duur_maanden(jaren_tot_2015, jaren_vanaf_2016):   # art 59
    totaal_jaren = jaren_tot_2015 + jaren_vanaf_2016
    if totaal_jaren <= 10: m = totaal_jaren
    else:
        # eerste 10 jaren: 1 mnd/jaar; daarboven: jaren <2016 1 mnd, jaren >=2016 0.5 mnd
        # Toewijzing welke jaren "de eerste 10" zijn: [O] – UWV-praktijk niet geverifieerd;
        # conservatief: eerst de jaren vóór 2016 als 'eerste 10' tellen.
        ...
    m = clamp(m, 3, 24)     # 0.5 maand = 15 kalenderdagen
    m -= eerdere_iva_duur / eerdere_ww_duur (art 59 lid 5-6)
    return m

# ---------- Indexering ----------
on 1 jan / 1 jul: wia_dagloon *= (1 + INDEX[datum]); WIA_MINIMUMLOON_MAAND herberekenen
# RVC / inkomenseis: NIET automatisch indexeren (onbekend) – laat gebruiker brief-bedrag invullen.
```

**Belangrijkste UX-teksten (feitelijk juist volgens de bronnen):**
- "Je WIA-maandloon is geen salaris. Het is het gemiddelde loon uit het jaar vóór je eerste ziektedag, inclusief opgebouwd vakantiegeld, gemaximeerd en geïndexeerd met het minimumloon."
- "In de eerste fase (LGU) krijg je 75%, en vanaf maand 3 70%, van het verschil tussen je WIA-maandloon en wat je verdient. Er is in die fase geen 50%-regel."
- "Na de LGU telt per kalendermaand: verdien je minstens de helft van je resterende verdiencapaciteit (inclusief opgebouwd vakantiegeld)? Dan krijg je de loonaanvulling. Anders krijg je de lagere vervolguitkering, die alleen van je AO-klasse en het minimumloon afhangt."
- "UWV betaalt je uitkering eerst als voorschot en rekent achteraf af met de loongegevens uit de polisadministratie. Te veel betaald is terugbetalen."
