# Mijn kleine websites

Losse, kleine websites. Elke map is één site met een eigen `index.html`, zonder build-stap of dependencies.

| Site | Wat het is |
|---|---|
| [`uwv-rekenhulp/`](uwv-rekenhulp/) | Rekenhulp voor de WIA (WGA/IVA) en Ziektewet. Hoe dicht zit je bij de 65%-grens, wat krijg je per maand bij werken naast je uitkering, en hoe zitten no-riskpolis en doelgroepregister in elkaar. Met uitleg bij elk veld en bronnen in `docs/research/`. Rekentests: `node --test uwv-rekenhulp/engine.test.js`. |
| [`rekentrainer/`](rekentrainer/) | Oefenen voor het rekenexamen 3F (mbo). Steeds nieuwe sommen in de vier examendomeinen (getallen, verhoudingen, meten & meetkunde, verbanden), met uitleg per stap en een onderwerpkiezer. |

## Zelf draaien

Open een `index.html` direct in de browser, of serveer een map met een willekeurige webserver, bijvoorbeeld:

```bash
docker run -d -p 8088:80 -v "$PWD/rekentrainer:/usr/share/nginx/html:ro" nginx:alpine
```
