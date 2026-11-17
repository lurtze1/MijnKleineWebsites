/* Accountpagina: inloggen, account maken, herstellen, twee-factor en beheer. De cryptografie en de
   gesprekken met de server zitten in ../shared/account.js. Dit bestand staat los (niet inline), zodat de
   pagina een strenge Content-Security-Policy kan hebben: alleen scripts van dit domein. */
(function () {
  'use strict';
  const A = window.Account;
  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const SITES = { uwv: ['UWV-rekenhulp', '../uwv-rekenhulp/'], verduurzamen: ['Verduurzamen in Hardenberg', '../verduurzamen-hardenberg/'] };

  const FOUTEN = {
    offline: 'De server is niet bereikbaar. Probeer het zo nog eens.',
    inloggen_mislukt: 'Gebruikersnaam of wachtwoord klopt niet.',
    code_fout: 'Die code klopt niet (meer). Wacht op een nieuwe code in je app en probeer het opnieuw.',
    wachtwoord_fout: 'Het wachtwoord klopt niet.',
    uitnodiging_ongeldig: 'Die uitnodigingscode is niet geldig of al gebruikt.',
    naam_bezet: 'Die gebruikersnaam is al in gebruik. Kies een andere.',
    naam_ongeldig: 'Een gebruikersnaam is 3 tot 40 tekens.',
    herstel_mislukt: 'Gebruikersnaam of herstelcode klopt niet.',
    niet_ingelogd: 'Je bent uitgelogd. Log opnieuw in.',
    serverfout: 'Er ging iets mis op de server. Probeer het zo nog eens.',
  };
  const wacht = (e) => (e.wachtSeconden > 90 ? Math.ceil(e.wachtSeconden / 60) + ' minuten' : (e.wachtSeconden || 30) + ' seconden');
  const tekst = (e) => (e.code === 'op_slot' ? `Te veel mislukte pogingen. Dit account zit ${wacht(e)} op slot.`
    : e.code === 'te_vaak' ? `Te veel pogingen achter elkaar. Probeer het over ${wacht(e)} opnieuw.`
    : FOUTEN[e.code] || 'Dat lukte niet. Probeer het zo nog eens.');

  function meld(id, soort, kop, toelichting) {
    const el = $(id); el.hidden = false; el.className = 'fb ' + soort;
    el.innerHTML = esc(kop) + (toelichting ? ` <span>${esc(toelichting)}</span>` : '');
  }
  const stil = (id) => { $(id).hidden = true; };
  /** Formulier afhandelen: knop uit tijdens het rekenen (sleutel afleiden duurt even), fouten in het meldvak. */
  function formulier(id, fb, fn) {
    $(id).addEventListener('submit', async (e) => {
      e.preventDefault();
      const knop = $(id).querySelector('[type=submit]'), was = knop.textContent;
      knop.disabled = true; knop.textContent = 'Bezig…'; stil(fb);
      try { await fn(); } catch (err) { if (!(err instanceof A.Fout)) console.error(err); meld(fb, 'no', tekst(err)); }
      knop.disabled = false; knop.textContent = was;
    });
  }
  const zelfde = (a, b, fb) => { if ($(a).value !== $(b).value) { meld(fb, 'no', 'De twee wachtwoorden zijn niet gelijk.'); return false; } return true; };

  // ---------- tabs ----------
  let sessie = null;
  function toon(tab) {
    $('app').dataset.dom = tab;
    document.querySelectorAll('section[data-tab]').forEach((s) => (s.hidden = s.dataset.tab !== tab));
    document.querySelectorAll('#topics button').forEach((b) => b.setAttribute('aria-selected', String(b.dataset.t === tab)));
    $('topics').hidden = tab === 'account';
    $('herstelvak').hidden = true;
  }
  $('topics').addEventListener('click', (e) => { const b = e.target.closest('button'); if (b) toon(b.dataset.t); });

  /** Na registreren of herstellen: eerst de herstelcode laten bewaren, dan pas verder. */
  function toonHerstelcode(code) {
    document.querySelectorAll('section[data-tab]').forEach((s) => (s.hidden = true));
    $('topics').hidden = true; $('herstelvak').hidden = false;
    $('herstelcode').textContent = code; $('herstel_ok').checked = false; $('herstel_verder').disabled = true;
  }
  $('herstel_ok').addEventListener('change', () => { $('herstel_verder').disabled = !$('herstel_ok').checked; });
  $('herstel_kopie').addEventListener('click', async () => { try { await navigator.clipboard.writeText($('herstelcode').textContent); $('herstel_kopie').textContent = 'Gekopieerd'; } catch { /* dan overtypen */ } });
  $('herstel_verder').addEventListener('click', () => { $('herstelcode').textContent = ''; start(); });

  // ---------- inloggen, account maken, herstellen ----------
  formulier('f_in', 'in_fb', async () => {
    const r = await A.login({ gebruiker: $('in_naam').value, wachtwoord: $('in_ww').value, code: $('in_codevak').hidden ? '' : $('in_code').value });
    if (r.totpNodig) { $('in_codevak').hidden = false; $('in_code').focus(); meld('in_fb', 'warn', 'Vul de code uit je authenticator-app in.'); return; }
    $('f_in').reset(); $('in_codevak').hidden = true;
    await start();
  });
  formulier('f_nieuw', 'n_fb', async () => {
    if (!zelfde('n_ww', 'n_ww2', 'n_fb')) return;
    const r = await A.registreer({ gebruiker: $('n_naam').value, wachtwoord: $('n_ww').value, uitnodiging: $('n_code').value });
    $('f_nieuw').reset(); toonHerstelcode(r.herstelcode);
  });
  formulier('f_kwijt', 'k_fb', async () => {
    if (!zelfde('k_ww', 'k_ww2', 'k_fb')) return;
    const r = await A.herstel({ gebruiker: $('k_naam').value, herstelcode: $('k_code').value, nieuw: $('k_ww').value });
    $('f_kwijt').reset(); toonHerstelcode(r.herstelcode);
  });

  // ---------- ingelogd ----------
  let items = [];
  async function toonItems() {
    items = await A.lijst();
    const datum = (t) => new Date(t).toLocaleDateString('nl-NL', { day: 'numeric', month: 'short', year: 'numeric' });
    $('a_items').innerHTML = '<thead><tr><th>Naam</th><th>Rekenhulp</th><th>Bewaard</th><th></th></tr></thead><tbody>' + (items.length
      ? items.map((x) => {
        const s = SITES[x.tool], hash = String(x.staat || '').startsWith('#') ? x.staat : '';
        return `<tr><th>${s ? `<a href="${s[1]}${esc(hash)}">${esc(x.naam)}</a>` : esc(x.naam)}</th><td>${esc(s ? s[0] : x.tool)}</td><td>${datum(x.bewaard)}</td><td class="r"><button class="lnk" data-weg="${esc(x.id)}" type="button">verwijder</button></td></tr>`;
      }).join('')
      : '<tr><td colspan="4">Nog niets bewaard.</td></tr>') + '</tbody>';
  }
  $('a_items').addEventListener('click', async (e) => {
    const b = e.target.closest('[data-weg]'); if (!b) return;
    const it = items.find((x) => x.id === b.dataset.weg);
    if (!it || !confirm(`"${it.naam}" verwijderen? Dit kan niet ongedaan worden gemaakt.`)) return;
    try { await A.verwijder(it.id); await toonItems(); } catch (err) { meld('a_fb', 'no', tekst(err)); }
  });
  $('a_export').addEventListener('click', () => {
    const blob = new Blob([JSON.stringify({ gebruiker: sessie.gebruiker, gedownload: new Date().toISOString(), berekeningen: items }, null, 2)], { type: 'application/json' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'mijn-berekeningen.json'; a.click(); URL.revokeObjectURL(a.href);
  });

  // ---------- twee-factor ----------
  function toonTweeFactor() {
    const tf = $('tf');
    if (sessie.totp) {
      tf.innerHTML = `<div class="fb ok">Twee-factor staat aan. <span>Bij het inloggen is een code uit je app nodig. Je hebt nog ${sessie.reservecodes} reservecodes.</span></div>
        <form id="f_tfuit" class="rij"><div class="field"><input id="tf_ww" type="password" autocomplete="current-password" placeholder="wachtwoord" aria-label="Wachtwoord" required></div>
        <div class="field"><input id="tf_code" inputmode="numeric" autocomplete="one-time-code" placeholder="code uit je app" aria-label="Code uit je app" required></div>
        <button class="knop" type="submit">Zet twee-factor uit</button></form><div class="fb" id="tf_fb" hidden aria-live="polite"></div>`;
      formulier('f_tfuit', 'tf_fb', async () => { await A.totpUit({ wachtwoord: $('tf_ww').value, code: $('tf_code').value }); await start(); meld('a_fb', 'warn', 'Twee-factor staat uit.'); });
      return;
    }
    tf.innerHTML = `<p>Met twee-factor heb je bij het inloggen naast je wachtwoord een code van 6 cijfers nodig uit een app op je telefoon (bijvoorbeeld Aegis, Google Authenticator of je wachtwoordmanager).</p>
      <div class="rij"><button class="knop" id="tf_start" type="button">Stel twee-factor in</button></div><div class="fb" id="tf_fb" hidden aria-live="polite"></div>`;
    $('tf_start').addEventListener('click', async () => {
      try {
        const s = await A.totpStart();
        tf.innerHTML = `<p><b>1.</b> Scan deze code met je authenticator-app, of typ de sleutel over:</p>
          <div class="qr">${s.qr}</div><div class="code">${esc(s.geheim.match(/.{4}/g).join(' '))}</div>
          <p class="hint">Op je telefoon? <a href="${esc(s.uri)}">Open direct in je app</a>.</p>
          <p><b>2.</b> Typ de code van 6 cijfers die de app nu laat zien:</p>
          <form id="f_tfaan" class="rij"><div class="field"><input id="tf_code" inputmode="numeric" autocomplete="one-time-code" pattern="[0-9]{6}" maxlength="6" aria-label="Code van 6 cijfers" required></div><button class="knop" type="submit">Zet twee-factor aan</button></form>
          <div class="fb" id="tf_fb" hidden aria-live="polite"></div>`;
        formulier('f_tfaan', 'tf_fb', async () => {
          const r = await A.totpAan($('tf_code').value);
          sessie.totp = true;
          tf.innerHTML = `<div class="fb ok">Twee-factor staat aan.</div>
            <p><b>Bewaar deze 8 reservecodes.</b> Je ziet ze maar één keer. Elke code werkt één keer, voor als je je telefoon niet bij de hand hebt.</p>
            <div class="codes">${r.reservecodes.map((c) => `<span>${esc(c)}</span>`).join('')}</div>
            <div class="rij"><button class="knop" id="tf_klaar" type="button">Ik heb ze bewaard</button></div>`;
          $('tf_klaar').addEventListener('click', start);
        });
        $('tf_code').focus();
      } catch (err) { meld('tf_fb', 'no', tekst(err)); }
    });
  }

  // ---------- wachtwoord, verwijderen, uitloggen ----------
  formulier('f_ww', 'w_fb', async () => {
    if (!zelfde('w_nieuw', 'w_nieuw2', 'w_fb')) return;
    await A.wijzigWachtwoord({ oud: $('w_oud').value, nieuw: $('w_nieuw').value });
    $('f_ww').reset(); meld('w_fb', 'ok', 'Je wachtwoord is gewijzigd.', 'Andere apparaten zijn uitgelogd.');
  });
  formulier('f_weg', 'x_fb', async () => {
    if (!confirm('Je account en alle bewaarde berekeningen definitief verwijderen?')) return;
    await A.verwijderAccount({ wachtwoord: $('x_ww').value });
    $('f_weg').reset(); await start(); meld('in_fb', 'warn', 'Je account is verwijderd.');
  });
  $('uitloggen').addEventListener('click', async () => { await A.logout(); await start(); });

  // ---------- begin ----------
  async function start() {
    if (!(await A.beschikbaar())) { $('geen').hidden = false; $('topics').hidden = true; document.querySelectorAll('section[data-tab]').forEach((s) => (s.hidden = true)); return; }
    sessie = await A.sessie();
    $('wie').innerHTML = sessie ? `Ingelogd als <b>${esc(sessie.gebruiker)}</b>` : '';
    if (!sessie) { toon(location.hash === '#nieuw' ? 'nieuw' : location.hash === '#kwijt' ? 'kwijt' : 'in'); return; }
    toon('account'); stil('a_fb');
    toonTweeFactor();
    try { await toonItems(); } catch (err) { meld('a_fb', 'no', tekst(err)); }
  }
  start();
})();
