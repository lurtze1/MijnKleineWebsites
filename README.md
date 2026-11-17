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

Een `index.html` direct in de browser openen werkt ook. Voor accounts en bewaren heb je de API nodig:

```bash
cd api && npm install && node dev.js     # http://localhost:8088, met een wegwerp-database en een uitnodigingscode
```

## Accounts en bewaren

In de UWV-rekenhulp en bij verduurzamen kun je een berekening bewaren onder een naam en later terughalen. Dat loopt via `account/` (inloggen, account maken, twee-factor, beheer), `shared/account.js` (versleuteling in de browser) en `api/` (een kleine Node-server met een SQLite-database).

Het uitgangspunt: **de server kan de gegevens niet lezen.**

- De browser leidt uit het wachtwoord een sleutel af (PBKDF2, 600.000 rondes) en versleutelt elke berekening met AES-256-GCM. De server bewaart alleen die blokken en weet niet eens bij welke rekenhulp ze horen.
- Het wachtwoord wordt nooit verstuurd. De server krijgt een afgeleide inlogwaarde en bewaart daar een Argon2id-hash van.
- Geen e-mailadres. De gebruikersnaam staat alleen als HMAC in de database. Er worden geen IP-adressen bewaard of gelogd.
- Wachtwoord kwijt = gegevens kwijt, tenzij je de herstelcode nog hebt die je bij het aanmaken krijgt.
- Twee-factor is TOTP (authenticator-app) met 8 eenmalige reservecodes.
- Het databasebestand is daarbovenop versleuteld met SQLCipher. Die sleutel staat op dezelfde server (`/opt/stacks/.kleinewebsites/env`), dus dat helpt alleen tegen een gestolen bestand of back-up.
- SQLite kent geen database-gebruikers. In plaats daarvan draait de API als gewone gebruiker in een container zonder schrijfbaar bestandssysteem of extra rechten, en staat de database op een eigen volume buiten de webmap, zonder poort naar buiten.

Beheer, op de server in `/opt/stacks/rekenen`:

```bash
docker compose exec api node cli.js uitnodiging      # code voor één nieuw account
docker compose exec api node cli.js uitnodiging 5    # code die 5 keer werkt
docker compose exec api node cli.js stats            # aantallen; meer valt er niet te zien
```

Twee dingen om te bewaren buiten de server:

- **`/opt/stacks/.kleinewebsites/env`** (`DB_KEY`, `SERVER_SECRET`). `deploy/pull.sh` maakt hem de eerste keer aan, buiten de webmap van nginx. Zonder `DB_KEY` is de database onleesbaar; zonder `SERVER_SECRET` kan niemand meer inloggen.
- **De database**: volume `rekenen_data`, met elke dag een versleutelde kopie in `backup/` (de laatste 7). Die kopieën staan op dezelfde schijf; kopieer ze af en toe ergens anders heen.

Tests: `node --test api/app.test.js` (draait de echte API met dezelfde cryptocode als de browser).

## Online zetten

Online zetten is **pushen naar `main`**. De server kijkt elke minuut of `main` veranderd is en rolt dan zelf uit. Wil je niet op de timer wachten, of eerst de rekentests draaien:

```powershell
.\deploy.ps1
```

Hoe het op de server zit:

- De Dockge-stack `/opt/stacks/rekenen` is een git-clone van deze repo; `compose.yaml` in de root is dus de stack (nginx op poort 8088, daarachter de Cloudflare-tunnel).
- `deploy/kleinewebsites-pull.timer` start elke minuut `deploy/pull.sh`: `git fetch`, en bij een nieuwe commit `git reset --hard origin/main`, `docker compose up -d --build` en nginx herladen. Log: `journalctl -u kleinewebsites-pull.service`.
- `deploy/nginx/default.conf` is de nginx-configuratie. De webroot is de hele repo; `.git`, `.env`, `deploy/`, de broncode in `api/` en tests worden niet geserveerd. `/api/` gaat door naar de api-container.
- Server opnieuw inrichten: `deploy/setup-server.sh` (eenmalig).

Een nieuwe site toevoegen: map maken, `../shared/site.css` laden en een vak op de startpagina zetten.
