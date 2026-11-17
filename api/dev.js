'use strict';
// Lokaal uitproberen, zonder Docker:   cd api && npm install && node dev.js   →   http://localhost:8088
// Serveert de repo zoals nginx dat op de server doet, met de API op /api en een wegwerp-database.
// Alleen voor op je eigen computer: de sleutels hieronder zijn niet geheim.
const http = require('node:http');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { maakApp } = require('./app.js');

const root = path.resolve(__dirname, '..');
const dbPad = path.join(process.env.DEV_DATA || fs.mkdtempSync(path.join(os.tmpdir(), 'kw-dev-')), 'dev.db');
const app = maakApp({ dbPad, dbSleutel: 'de'.repeat(32), geheim: 'alleen-voor-lokaal-uitproberen-'.repeat(2), argon: { memory: 19456, passes: 2 }, log: console.log });
const TYPES = { '.html': 'text/html', '.css': 'text/css', '.js': 'application/javascript', '.md': 'text/plain', '.json': 'application/json', '.svg': 'image/svg+xml' };

http.createServer((req, res) => {
  const pad = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  if (pad.startsWith('/api/')) return app.handler(req, res);
  let f = path.join(root, pad);
  if (!f.startsWith(root) || /(^|[\\/])\.|[\\/](deploy|api|node_modules)[\\/]/.test(f.slice(root.length))) { res.statusCode = 404; return res.end('404'); }
  if (fs.existsSync(f) && fs.statSync(f).isDirectory()) {
    if (!pad.endsWith('/')) { res.statusCode = 301; res.setHeader('Location', pad + '/'); return res.end(); }
    f = path.join(f, 'index.html');
  }
  if (!fs.existsSync(f)) { res.statusCode = 404; return res.end('404'); }
  res.setHeader('Content-Type', (TYPES[path.extname(f)] || 'application/octet-stream') + '; charset=utf-8');
  res.setHeader('Cache-Control', 'no-cache');
  fs.createReadStream(f).pipe(res);
}).listen(process.env.PORT || 8088, () => {
  console.log(`http://localhost:${process.env.PORT || 8088}   (database: ${dbPad})`);
  console.log('Uitnodigingscode om een account te maken:', app.nieuweUitnodiging(20));
});
