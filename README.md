# Mijn kleine websites

Losse, kleine websites. Elke map is één site met een eigen `index.html`, zonder build-stap of dependencies.

| Site | Wat het is |
|---|---|
| [`rekentrainer/`](rekentrainer/) | Oefenen voor het rekenexamen 3F (mbo). Steeds nieuwe sommen in de vier examendomeinen (getallen, verhoudingen, meten & meetkunde, verbanden), met uitleg per stap en een onderwerpkiezer. |

## Zelf draaien

Open een `index.html` direct in de browser, of serveer een map met een willekeurige webserver, bijvoorbeeld:

```bash
docker run -d -p 8088:80 -v "$PWD/rekentrainer:/usr/share/nginx/html:ro" nginx:alpine
```
