'use strict';
// Start de API. Instellingen komen uit de omgeving (/opt/stacks/.kleinewebsites/env, aangemaakt door deploy/pull.sh).
const http = require('node:http');
const path = require('node:path');
const { maakApp } = require('./app.js');
process.umask(0o077); // database en kopieën alleen leesbaar voor deze gebruiker

const DATA = process.env.DATA_DIR || '/data';
const log = (...a) => console.log(new Date().toISOString(), ...a); // nooit adressen of namen loggen
const app = maakApp({ dbPad: path.join(DATA, 'kleinewebsites.db'), dbSleutel: process.env.DB_KEY, geheim: process.env.SERVER_SECRET, log });

const server = http.createServer(app.handler);
server.requestTimeout = 15000; server.headersTimeout = 10000;
server.listen(process.env.PORT || 3000, () => log('api luistert op', server.address().port, JSON.stringify(app.stats())));

// Elk uur opruimen (verlopen sessies), elke dag een versleutelde kopie van de database.
const uur = setInterval(() => { try { app.opruimen(); } catch (e) { log('opruimen mislukt', e.message); } }, 3600e3);
const kopie = () => app.backup(path.join(DATA, 'backup')).then((f) => log('backup', path.basename(f)), (e) => log('backup mislukt', e.message));
const dag = setInterval(kopie, 86400e3); setTimeout(kopie, 60e3).unref();

for (const sig of ['SIGTERM', 'SIGINT']) process.on(sig, () => { clearInterval(uur); clearInterval(dag); server.close(() => { app.sluit(); process.exit(0); }); });
