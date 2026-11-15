# Mijn kleine websites

Losse, kleine websites. Elke map is één site met een eigen `index.html`, zonder build-stap of dependencies. De startpagina (`index.html` in de root) linkt naar alle sites.

| Site | Wat het is |
|---|---|
| [`uwv-rekenhulp/`](uwv-rekenhulp/) | Rekenhulp voor de WIA (WGA/IVA) en Ziektewet. Hoe dicht zit je bij de 65%-grens, wat krijg je per maand bij werken naast je uitkering, en hoe zitten no-riskpolis en doelgroepregister in elkaar. Met uitleg bij elk veld en bronnen in `docs/research/`. Rekentests: `node --test uwv-rekenhulp/engine.test.js`. |
| [`verduurzamen-hardenberg/`](verduurzamen-hardenberg/) | Huis verduurzamen in de gemeente Hardenberg: stappenplan (isoleren → zonnepanelen → eigen stroom zelf gebruiken → hybride → batterij), subsidies (gemeente + ISDE), leningen (Warmtefonds), een rekenhulp voor de subsidiebedragen en de regels die eraan komen. Stand november 2026, met bronnen per onderdeel. |
| [`rekentrainer/`](rekentrainer/) | Oefenen voor het rekenexamen 3F (mbo). Steeds nieuwe sommen in de vier examendomeinen (getallen, verhoudingen, meten & meetkunde, verbanden), met uitleg per stap en een onderwerpkiezer. |

## Gedeelde stijl

Alle sites laden `shared/site.css` (de look: smalle kolom, topbalk, gekleurd vak, kopbalken, meldingen, formulieren). In het `<style>`-blok van een site staat alleen wat die site zelf nodig heeft, zoals de kleur per tab. Iets aan de look veranderen doe je dus in `shared/site.css`.

## Zelf draaien

De sites verwijzen naar `../shared/site.css`, dus serveer de **root** van de repo, niet een losse map:

```bash
npx serve .
```

Een `index.html` direct in de browser openen werkt ook.

## Online zetten

Online zetten is **pushen naar `main`**. De server kijkt elke minuut of `main` veranderd is en rolt dan zelf uit. Wil je niet op de timer wachten, of eerst de rekentests draaien:

```powershell
.\deploy.ps1
```

Hoe het op de server zit:

- De Dockge-stack `/opt/stacks/rekenen` is een git-clone van deze repo; `compose.yaml` in de root is dus de stack (nginx op poort 8088, daarachter de Cloudflare-tunnel).
- `deploy/kleinewebsites-pull.timer` start elke minuut `deploy/pull.sh`: `git fetch`, en bij een nieuwe commit `git reset --hard origin/main`, `docker compose up -d --build` en nginx herladen. Log: `journalctl -u kleinewebsites-pull.service`.
- `deploy/nginx/default.conf` is de nginx-configuratie. De webroot is de hele repo; `.git`, `deploy/` en tests worden niet geserveerd.
- Server opnieuw inrichten: `deploy/setup-server.sh` (eenmalig).

Een nieuwe site toevoegen: map maken, `../shared/site.css` laden en een vak op de startpagina zetten.
