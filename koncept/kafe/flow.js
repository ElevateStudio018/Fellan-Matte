/* Förbeställning i steg: produkt, antal, hämtning, uppgifter, bekräfta. Exempeldata. Ingenting skickas. */
(() => {
  'use strict';
  const flow = document.querySelector('[data-flow]');
  if (!flow) return;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const kr = n => `${n.toLocaleString('sv-SE')} kr`;
  const pad = n => String(n).padStart(2, '0');
  const iso = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const parse = s => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
  const DAYS = ['söndag', 'måndag', 'tisdag', 'onsdag', 'torsdag', 'fredag', 'lördag'];
  const MONTHS = ['januari', 'februari', 'mars', 'april', 'maj', 'juni', 'juli', 'augusti', 'september', 'oktober', 'november', 'december'];
  const nice = d => { const s = `${DAYS[d.getDay()]} ${d.getDate()} ${MONTHS[d.getMonth()]}`; return s[0].toUpperCase() + s.slice(1); };
  const icon = (n, c = '') => `<svg class="ev-icon ${c}" aria-hidden="true"><use href="img/ikoner.svg#${n}"/></svg>`;

  /* Sortiment (exempel). Tårtor: pris per storlek. Övrigt: pris per styck med minsta antal. */
  const P = {
    prinsess: { name: 'Prinsesstårta', cake: true, sizes: { 8: 395, 12: 545, 16: 695, 24: 995 } },
    kladd: { name: 'Kladdkakstårta med hallon', cake: true, sizes: { 8: 345, 12: 485, 16: 625, 24: 895 } },
    morot: { name: 'Morotstårta', cake: true, sizes: { 8: 375, 12: 525, 16: 675, 24: 965 } },
    mandel: { name: 'Mandeltårta, glutenfri', cake: true, sizes: { 8: 365, 12: 510, 16: 655, 24: 935 } },
    kardemumma: { name: 'Kardemummabullar', each: 30, min: 6, max: 60, unit: 'st' },
    kanel: { name: 'Kanelbullar', each: 28, min: 6, max: 60, unit: 'st' },
    lusse: { name: 'Lussekatter', each: 25, min: 6, max: 60, unit: 'st', from: '2026-12-01' },
    bricka: { name: 'Fikabricka för kontoret', each: 320, min: 1, max: 10, unit: 'brickor', unit1: 'bricka' },
    choklad: { name: 'Chokladbollar, glutenfria', each: 15, min: 10, max: 100, unit: 'st' },
    surdeg: { name: 'Surdegslimpa', each: 65, min: 1, max: 20, unit: 'st' },
    rag: { name: 'Rågbröd med frön', each: 58, min: 1, max: 20, unit: 'st' },
    croissant: { name: 'Smörcroissanter', each: 30, min: 4, max: 40, unit: 'st' }
  };
  const HOURS = { 0: [540, 900], 1: null, 2: [450, 1020], 3: [450, 1020], 4: [450, 1020], 5: [450, 1020], 6: [480, 960] };

  const ORDER = ['produkt', 'antal', 'hamtning', 'uppgifter', 'bekrafta'];
  const S = { produkt: null, storlek: null, text: '', antal: null, dag: '', tid: '', namn: '', telefon: '', epost: '', allergi: '' };
  let current = 'produkt', returnTo = null;

  const steps = Object.fromEntries($$('[data-step]', flow).map(s => [s.dataset.step, s]));
  const indicator = $('[data-steps]', flow);
  const summary = $('[data-summary]');

  const price = () => {
    const p = P[S.produkt]; if (!p) return 0;
    if (p.cake) return S.storlek ? p.sizes[S.storlek] : 0;
    return (S.antal || 0) * p.each;
  };
  const amountText = () => {
    const p = P[S.produkt]; if (!p) return '';
    if (p.cake) return S.storlek ? `${S.storlek} bitar` : '';
    return `${S.antal} ${S.antal === 1 && p.unit1 ? p.unit1 : p.unit}`;
  };
  const pickupText = () => S.dag && S.tid ? `${nice(parse(S.dag))}, ${S.tid}` : (S.dag ? nice(parse(S.dag)) : '');

  /* ---------- Navigering mellan steg ---------- */
  function go(step, { push = true, focus = true } = {}) {
    current = step;
    Object.entries(steps).forEach(([k, el]) => { el.hidden = k !== step; });
    const i = ORDER.indexOf(step);
    indicator.hidden = i < 0;
    if (i >= 0) {
      $('[data-steps-count]', indicator).textContent = `Steg ${i + 1} av ${ORDER.length}`;
      $$('.ev-steps__list li', indicator).forEach((li, n) => n === i ? li.setAttribute('aria-current', 'step') : li.removeAttribute('aria-current'));
      $$('.ev-steps__dots i', indicator).forEach((d, n) => d.classList.toggle('is-on', n === i));
    }
    if (step === 'antal') setupAmount();
    if (step === 'hamtning') setupPickup();
    if (step === 'uppgifter') gate();
    if (step === 'bekrafta') renderReview($('[data-review]'), true);
    summary.hidden = step === 'klart';
    if (push) history.pushState({ step }, '', '');
    window.scrollTo({ top: 0, behavior: 'instant' });
    if (focus) $('h1', steps[step]).focus({ preventScroll: true });
    renderSummary();
  }
  const next = from => {
    if (returnTo && from !== 'bekrafta') { const r = returnTo; returnTo = null; return go(r); }
    go(ORDER[ORDER.indexOf(from) + 1]);
  };
  window.addEventListener('popstate', e => {
    const step = e.state && e.state.step;
    if (!step || !steps[step] || current === 'klart') return;
    go(ORDER.indexOf(step) > 0 && !S.produkt ? 'produkt' : step, { push: false });
  });
  $$('[data-back]', flow).forEach(a => a.addEventListener('click', e => { e.preventDefault(); returnTo = null; history.back(); }));

  /* ---------- Steg 1: produkt, går direkt vidare ---------- */
  $('[data-auto="produkt"]').addEventListener('submit', e => {
    e.preventDefault();
    const btn = e.submitter; if (!btn) return;
    choose(btn.value);
    next('produkt');
  });
  function choose(id) {
    if (S.produkt !== id) { S.storlek = null; S.antal = null; if (S.dag && !dateOk(S.dag, id).ok) { S.dag = ''; S.tid = ''; } }
    S.produkt = id;
    $$('.ev-choice').forEach(b => b.classList.toggle('is-current', b.value === id));
  }

  /* ---------- Steg 2: storlek eller antal ---------- */
  const fAmount = $('[data-form="antal"]');
  const qtyOut = $('[data-qty-out]');
  function setupAmount() {
    const p = P[S.produkt];
    $('[data-sizes]').hidden = !p.cake;
    $('[data-tarttext]').hidden = !p.cake;
    $('[data-qtywrap]').hidden = !!p.cake;
    $('#storlek-fel').classList.remove('is-shown');
    if (p.cake) {
      $('[data-antal-title]').textContent = 'Hur stor ska tårtan vara?';
      $('[data-antal-hint]').textContent = `${p.name}. Priset gäller hela tårtan.`;
      $$('[data-sizeprice]').forEach(s => { s.textContent = kr(p.sizes[s.dataset.sizeprice]); });
      $$('input[name="storlek"]').forEach(r => { r.checked = String(S.storlek) === r.value; });
      $('#f-text').value = S.text;
    } else {
      $('[data-antal-title]').textContent = p.unit === 'brickor' ? 'Hur många brickor?' : 'Hur många vill du ha?';
      $('[data-antal-hint]').textContent = `${p.name}, ${kr(p.each)} ${p.unit1 ? 'per bricka' : 'styck'}.`;
      if (S.antal == null) S.antal = p.min;        // förifyllt med minsta antal, går att ändra
      $('[data-qty-name]').textContent = p.unit === 'brickor' ? 'Antal brickor' : 'Antal';
      $('[data-qty-unit]').textContent = p.min > 1 ? `Minst ${p.min} ${p.unit}` : `Högst ${p.max} ${p.unit}`;
      qtyRender();
    }
  }
  function qtyRender() {
    const p = P[S.produkt];
    qtyOut.textContent = S.antal;
    const [minus, plus] = $$('[data-qty]');
    minus.setAttribute('aria-disabled', String(S.antal <= p.min));
    plus.setAttribute('aria-disabled', String(S.antal >= p.max));
    minus.setAttribute('aria-label', `Färre, nu ${S.antal}`);
    plus.setAttribute('aria-label', `Fler, nu ${S.antal}`);
    renderSummary();
  }
  $$('[data-qty]').forEach(b => b.addEventListener('click', () => {
    const p = P[S.produkt];
    S.antal = Math.min(p.max, Math.max(p.min, S.antal + Number(b.dataset.qty)));
    qtyRender();
  }));
  $$('input[name="storlek"]').forEach(r => r.addEventListener('change', () => {
    S.storlek = Number(r.value); $('#storlek-fel').classList.remove('is-shown'); renderSummary();
  }));
  $('#f-text').addEventListener('input', e => { S.text = e.target.value.trim(); renderSummary(); });
  fAmount.addEventListener('submit', e => {
    e.preventDefault();
    if (P[S.produkt].cake && !S.storlek) {
      $('#storlek-fel').classList.add('is-shown');
      $('input[name="storlek"]').focus();
      return;
    }
    next('antal');
  });

  /* ---------- Steg 3: hämtning ---------- */
  const fPick = $('[data-form="hamtning"]');
  const dayIn = $('#f-dag');
  const timesBox = $('[data-times]');
  const today = new Date(); today.setHours(0, 0, 0, 0);
  function earliest(id = S.produkt) {
    const p = P[id];
    const d = new Date(today); d.setDate(d.getDate() + (p.cake ? 2 : 1));
    if (p.from && parse(p.from) > d) return parse(p.from);
    return d;
  }
  function dateOk(v, id = S.produkt) {
    if (!v) return { ok: false, msg: 'Välj vilken dag du vill hämta.' };
    const d = parse(v), min = earliest(id), p = P[id];
    if (d < min) {
      const why = p.from && parse(p.from) >= min ? `${p.name} finns från ${nice(parse(p.from)).toLowerCase()}.` : (p.cake ? 'Tårtor behöver beställas två dagar innan.' : 'Beställ senast dagen innan.');
      return { ok: false, msg: `${why} Välj ${nice(min).toLowerCase()} eller senare.` };
    }
    if (d.getDay() === 1) return { ok: false, msg: 'Vi har stängt på måndagar. Välj tisdag till söndag.' };
    const max = new Date(today); max.setDate(max.getDate() + 60);
    if (d > max) return { ok: false, msg: 'Vi tar emot beställningar 60 dagar framåt. Välj ett tidigare datum.' };
    return { ok: true };
  }
  function setupPickup() {
    const min = earliest();
    dayIn.min = iso(min);
    const max = new Date(today); max.setDate(max.getDate() + 60); dayIn.max = iso(max);
    dayIn.value = S.dag;
    $('[data-pickup-hint]').textContent = `Tidigast ${nice(min).toLowerCase()}. Vi har stängt på måndagar.`;
    renderTimes();
  }
  function showDayError(r) {
    const field = dayIn.closest('.ev-field');
    field.classList.toggle('is-error', !r.ok);
    if (r.ok) dayIn.removeAttribute('aria-invalid'); else { dayIn.setAttribute('aria-invalid', 'true'); $('[data-msg]', field).textContent = r.msg; }
  }
  function renderTimes() {
    $$('.ev-box, .kf-times-empty', timesBox).forEach(n => n.remove());
    const r = dateOk(S.dag);
    if (!r.ok) {
      timesBox.insertAdjacentHTML('beforeend', '<p class="kf-times-empty ev-muted ev-small">Välj en dag först, så visas lediga tider.</p>');
      return;
    }
    const d = parse(S.dag), [open, close] = HOURS[d.getDay()];
    const seed = d.getDate() * 7 + d.getMonth();
    for (let m = open + 30, n = 0; m <= close - 60; m += 30, n++) {
      const t = `${pad(Math.floor(m / 60))}.${pad(m % 60)}`;
      const full = (seed + n * 3) % 7 === 0;   // några tider är fullbokade (exempel)
      timesBox.insertAdjacentHTML('beforeend',
        `<label class="ev-box"><input type="radio" name="tid" value="${t}"${full ? ' disabled' : ''}${S.tid === t ? ' checked' : ''}><span>${t}${full ? '<span class="ev-sr">, fullbokad</span>' : ''}</span></label>`);
    }
    if (S.tid && !$(`input[value="${S.tid}"]:not(:disabled)`, timesBox)) S.tid = '';
  }
  dayIn.addEventListener('change', () => {
    S.dag = dayIn.value; const r = dateOk(S.dag);
    showDayError(r);
    if (!r.ok) S.tid = '';
    renderTimes(); renderSummary();
  });
  dayIn.addEventListener('blur', () => { if (dayIn.value) showDayError(dateOk(dayIn.value)); });
  timesBox.addEventListener('change', e => { if (e.target.name === 'tid') { S.tid = e.target.value; $('#tid-fel').classList.remove('is-shown'); renderSummary(); } });
  fPick.addEventListener('submit', e => {
    e.preventDefault();
    S.dag = dayIn.value;
    const r = dateOk(S.dag); showDayError(r);
    if (!r.ok) { dayIn.focus(); return; }
    if (!S.tid) { $('#tid-fel').classList.add('is-shown'); const f = $('input[name="tid"]:not(:disabled)', timesBox); if (f) f.focus(); return; }
    next('hamtning');
  });

  /* ---------- Steg 4: uppgifter. Grå knapp med aria-disabled och en rad om vad som saknas ---------- */
  const fInfo = $('[data-form="uppgifter"]');
  const infoBtn = $('button[type="submit"]', fInfo);
  function gate() {
    const missing = [];
    if (!EV.check($('#f-namn'))) missing.push('namn');
    if (!EV.check($('#f-tel'))) missing.push('mobilnummer');
    if (!EV.check($('#f-epost'))) missing.push('en giltig e-post');
    infoBtn.setAttribute('aria-disabled', String(missing.length > 0));
    $('[data-gate-text]').textContent = missing.length ? `Fyll i ${missing.join(' och ')} för att fortsätta.` : '';
  }
  EV.wire(fInfo, gate);
  fInfo.addEventListener('submit', e => {
    e.preventDefault();
    if (!EV.validateAll(fInfo)) return;
    S.namn = $('#f-namn').value.trim(); S.telefon = $('#f-tel').value.trim();
    S.epost = $('#f-epost').value.trim(); S.allergi = $('#f-allergi').value.trim();
    next('uppgifter');
  });

  /* ---------- Steg 5: bekräfta med Ändra-länkar ---------- */
  function renderReview(dl, edit) {
    const p = P[S.produkt];
    const rows = [
      ['Produkt', p.name, 'produkt'],
      [p.cake ? 'Storlek' : 'Antal', amountText(), 'antal'],
      ...(S.text ? [['Text på tårtan', `”${S.text}”`, 'antal']] : []),
      ['Hämtning', `${pickupText()}, Storgatan 14`, 'hamtning'],
      ['Hämtas av', [S.namn, S.telefon, S.epost].filter(Boolean).join(', '), 'uppgifter'],
      ...(S.allergi ? [['Allergier och önskemål', S.allergi, 'uppgifter']] : [])
    ];
    dl.innerHTML = rows.map(([k, v, step]) =>
      `<div><dt>${k}</dt><dd></dd>${edit ? `<a class="ev-link" href="#" data-edit="${step}">Ändra<span class="ev-sr"> ${k.toLowerCase()}</span></a>` : ''}</div>`).join('') +
      `<div class="ev-total"><dt>Att betala vid hämtning</dt><dd>${kr(price())}</dd></div>`;
    $$('dd', dl).forEach((dd, i) => { if (rows[i]) dd.textContent = rows[i][1]; });   // användartext som text, inte HTML
    $$('[data-edit]', dl).forEach(a => a.addEventListener('click', e => { e.preventDefault(); returnTo = 'bekrafta'; go(a.dataset.edit); }));
  }
  $('[data-form="bekrafta"]').addEventListener('submit', e => {
    e.preventDefault();
    $('[data-done-text]').textContent = `Vi skickar ett sms till ${S.telefon} inom en timme. Hämta i disken ${pickupText().toLowerCase()}.`;
    renderReview($('[data-done-review]'), false);
    history.replaceState({ step: 'klart' }, '', '');
    go('klart', { push: false });
  });

  /* ---------- Sammanfattning bredvid stegen ---------- */
  function renderSummary() {
    const list = $('[data-sum-list]'), empty = $('[data-sum-empty]');
    if (!S.produkt) { list.hidden = true; empty.hidden = false; return; }
    const rows = [['Produkt', P[S.produkt].name], [P[S.produkt].cake ? 'Storlek' : 'Antal', amountText() || 'Inte valt'], ['Hämtning', pickupText() || 'Inte valt']];
    list.innerHTML = rows.map(([k]) => `<div><dt>${k}</dt><dd></dd></div>`).join('') + (price() ? `<div class="ev-total"><dt>Totalt</dt><dd>${kr(price())}</dd></div>` : '');
    $$('dd', list).forEach((dd, i) => { if (rows[i]) dd.textContent = rows[i][1]; });
    list.hidden = false; empty.hidden = true;
  }

  /* ---------- Start: produkt från länken (förifyllt, går att ändra) ---------- */
  const pre = new URLSearchParams(location.search).get('produkt');
  history.replaceState({ step: 'produkt' }, '', '');
  if (pre && P[pre]) { choose(pre); go('antal', { focus: false }); }
  else go('produkt', { push: false, focus: false });
})();
