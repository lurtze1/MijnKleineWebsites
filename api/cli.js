'use strict';
// Beheer vanaf de server:
//   docker compose exec api node cli.js uitnodiging        één code voor één account
//   docker compose exec api node cli.js uitnodiging 5      één code die 5 keer werkt
//   docker compose exec api node cli.js stats              aantallen (meer valt er niet te zien: alles is versleuteld)
const path = require('node:path');
const { maakApp } = require('./app.js');
process.umask(0o077); // database en kopieën alleen leesbaar voor deze gebruiker

const app = maakApp({ dbPad: path.join(process.env.DATA_DIR || '/data', 'kleinewebsites.db'), dbSleutel: process.env.DB_KEY, geheim: process.env.SERVER_SECRET });
const [cmd, arg] = process.argv.slice(2);
if (cmd === 'uitnodiging') {
  const n = Math.max(1, Math.min(100, parseInt(arg, 10) || 1));
  console.log(`Uitnodigingscode (${n}× te gebruiken): ${app.nieuweUitnodiging(n)}`);
} else if (cmd === 'stats') {
  console.log(app.stats());
} else {
  console.log('Gebruik: node cli.js uitnodiging [aantal] | stats');
  process.exitCode = 1;
}
app.sluit();
