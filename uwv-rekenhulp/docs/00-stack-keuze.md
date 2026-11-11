# Stap 0 — Hoe bouwen we het?

## Besluit
De tool komt als eigen map **`uwv-rekenhulp/`** in de verzamelrepo [lurtze1/MijnKleineWebsites](https://github.com/lurtze1/MijnKleineWebsites), naast `rekentrainer/` en daar los van. Geen gedeelde code.

Die repo heeft een vaste conventie: **elke map is één site met een eigen `index.html`, zonder build-stap en zonder dependencies.** Daar sluiten we op aan, dus geen Vite/React. Het eerdere voorstel daarvoor is vervallen.

Look & feel: dezelfde als `rekentrainer/`, in de stijl van een forum uit 2008. Verdana, smalle kolom van 780px, een topbalk, grijze kopbalken, een gekleurd vak met gradient, klassieke knoppen en tabellen met afwisselende rijen. Elk onderdeel krijgt een eigen accentkleur via `data-*`-thema's, zoals daar per domein gebeurt (WIA/WGA, IVA, Ziektewet, no-risk/doelgroepregister).

## Uitgangspunten
1. **Privacy**: alles rekent in de browser. Geen backend en geen opslag buiten de browser van de bezoeker.
2. **Regels zijn data, geen code**: elk bedrag of percentage (maximum dagloon, minimumloon, 75/70%, WGA-klassen, duur, de 50%-regel enz.) staat in `rules.js` met `geldigVanaf` en een bron-URL. Verandert er iets, dan voeg je een nieuwe versie toe. Zo kan de tool ook rekenen met een peildatum ("wat als het 1 jan 2027 is").
3. **Uitleg is net zo belangrijk als de rekensom**: elk invoerveld heeft een tooltip. Elke uitkomst laat zien *waarom*: welke regel, welke formule en welke bron.
4. **Deelbaar**: de invoer staat in de URL-hash, dus je kunt een scenario als link doorsturen. Een "wis"-knop maakt alles leeg.

## Opbouw (zonder build-stap)
```
uwv-rekenhulp/
  index.html     UI + styling (look van rekentrainer)
  rules.js       bedragen/percentages per peildatum, met bronnen (ES module)
  engine.js      pure rekenfuncties, los van de UI (ES module)
  uitleg.js      begrippen en tooltipteksten
  engine.test.js rekenvoorbeelden uit het onderzoek als tests (`node --test`, geen dependencies)
```
Het onderzoek staat in `uwv-rekenhulp/docs/research/`. Het staat dus ook online, maar bevat alleen openbare bronnen. De lokale map `HoeDeFuckWerktHetUwv` is een checkout van MijnKleineWebsites op branch `uwv-rekenhulp`.

## Fasering
- **Stap 1**: onderzoek naar WIA (WGA/IVA), Ziektewet, no-riskpolis en doelgroepregister → `docs/research/`
- **Stap 2**: `rules.js` + `engine.js` + tests
- **Stap 3**: UI met invoer, tooltips, uitkomst met uitleg en "wat als"-scenario's
- **Stap 4**: toevoegen aan de README van MijnKleineWebsites en online zetten
