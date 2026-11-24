/* Bokning av stuga i steg: datum, gäster, stuga, tillval, uppgifter, bekräfta. Exempeldata. Ingenting skickas. */
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
  const DAYS = ['sön', 'mån', 'tis', 'ons', 'tor', 'fre', 'lör'];
  const MONTHS = ['jan', 'feb', 'mars', 'april', 'maj', 'juni', 'juli', 'aug', 'sep', 'okt', 'nov', 'dec'];
  const short = d => `${DAYS[d.getDay()]} ${d.getDate()} ${MONTHS[d.getMonth()]}`;
  const icon = n => `<svg class="ev-icon" aria-hidden="true"><use href="img/ikoner.svg#${n}"/></svg>`;
  /* Text in som text. Pilen mellan datum ritas som SVG, inte som tecken (pi-form-tecken, pi-form-frantill). */
  const esc = t => String(t).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const put = (el, t) => { el.innerHTML = esc(t).replace(/ → /g, ' <svg class="ev-icon sb-to" aria-hidden="true"><use href="img/ikoner.svg#pil"/></svg><span class="ev-sr">till</span> '); };

  /* Stugor (exempel). Pris per natt: lågsäsong och högsäsong. */
  const C = {
    brygg: { name: 'Bryggstugan', beds: 2, rooms: '1 sovrum', pets: false, low: 1050, high: 1390 },
    sjo: { name: 'Sjöstugan', beds: 4, rooms: '1 sovrum och loft', pets: false, low: 1450, high: 1890 },
    gard: { name: 'Gårdsstugan', beds: 6, rooms: '3 sovrum', pets: true, low: 1750, high: 2290 },
    tall: { name: 'Tallbacken', beds: 8, rooms: '4 sovrum, egen bastu', pets: true, low: 2450, high: 3190 }
  };
  const EXTRAS = { kanot: ['Kanot eller sup', 450], bastu: ['Vedeldad bastu', 350], linne: ['Sänglinne och handdukar', 150], stad: ['Slutstädning', 795] };
  const PET_FEE = 200;
  const high = d => { const m = d.getMonth(), day = d.getDate(); return (m === 5 && day >= 15) || m === 6 || (m === 7 && day <= 15) || (m === 11 && day >= 20) || (m === 0 && day <= 6); };

  const ORDER = ['datum', 'gaster', 'stuga', 'tillval', 'uppgifter', 'bekrafta'];
  const S = { ankomst: '', avresa: '', vuxna: 2, barn: 0, hund: null, stuga: null, tillval: [], namn: '', epost: '', telefon: '', medd: '' };
  let current = 'datum', returnTo = null;
  const steps = Object.fromEntries($$('[data-step]', flow).map(s => [s.dataset.step, s]));
  const indicator = $('[data-steps]', flow);
  const summary = $('[data-summary]');
  const guests = () => S.vuxna + S.barn;

  const nights = () => (S.ankomst && S.avresa) ? Math.round((parse(S.avresa) - parse(S.ankomst)) / 864e5) : 0;
  function stayPrice(id) {
    const c = C[id]; if (!c || nights() < 1) return 0;
    let sum = 0; const d = parse(S.ankomst);
    for (let i = 0; i < nights(); i++) { sum += high(d) ? c.high : c.low; d.setDate(d.getDate() + 1); }
    return sum;
  }
  const extraPrice = k => k === 'linne' ? EXTRAS.linne[1] * guests() : EXTRAS[k][1];
  const total = () => stayPrice(S.stuga) + S.tillval.reduce((a, k) => a + extraPrice(k), 0) + (S.hund === 'ja' ? PET_FEE : 0);
  const datesText = () => S.ankomst && S.avresa ? `${short(parse(S.ankomst))} → ${short(parse(S.avresa))}, ${nights()} nätter` : '';
  const guestsText = () => `${S.vuxna} ${S.vuxna === 1 ? 'vuxen' : 'vuxna'}${S.barn ? `, ${S.barn} barn` : ''}${S.hund === 'ja' ? ', husdjur' : ''}`;

  /* ---------- Navigering ---------- */
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
    if (step === 'datum') setupDates();
    if (step === 'gaster') renderGuests();
    if (step === 'stuga') renderCabins();
    if (step === 'tillval') setupExtras();
    if (step === 'uppgifter') gate();
    if (step === 'bekrafta') renderReview($('[data-review]'), true);
    summary.hidden = step === 'klart';
    if (push) history.pushState({ step }, '', '');
    window.scrollTo({ top: 0, behavior: 'instant' });
    if (focus) $('h1', steps[step]).focus({ preventScroll: true });
    renderSummary();
  }
  const next = from => {
    if (returnTo && from !== 'bekrafta') {
      // Ändrade datum eller gäster kan göra stugan ogiltig: gå då via stugvalet
      if ((from === 'datum' || from === 'gaster') && S.stuga && !fits(S.stuga).ok) { S.stuga = null; return go('stuga'); }
      const r = returnTo; returnTo = null; return go(r);
    }
    go(ORDER[ORDER.indexOf(from) + 1]);
  };
  window.addEventListener('popstate', e => {
    const step = e.state && e.state.step;
    if (!step || !steps[step] || current === 'klart') return;
    go(ORDER.indexOf(step) > 0 && !nights() ? 'datum' : step, { push: false });
  });
  $$('[data-back]', flow).forEach(a => a.addEventListener('click', e => { e.preventDefault(); returnTo = null; history.back(); }));

  /* ---------- Steg 1: datum ---------- */
  const inA = $('#f-ankomst'), inB = $('#f-avresa');
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const maxDay = new Date(today); maxDay.setFullYear(maxDay.getFullYear() + 1);
  function setupDates() {
    inA.min = iso(today); inA.max = iso(maxDay);
    inA.value = S.ankomst; inB.value = S.avresa;
    minB(); nightsText();
  }
  function minB() { const d = inA.value ? parse(inA.value) : new Date(today); d.setDate(d.getDate() + 2); inB.min = iso(d); inB.max = iso(maxDay); }
  function checkA() {
    const v = inA.value;
    if (!v) return 'Välj vilken dag du kommer.';
    if (parse(v) < today) return 'Ankomsten kan inte vara bakåt i tiden. Välj i dag eller senare.';
    if (parse(v) > maxDay) return 'Vi tar emot bokningar ett år framåt. Välj ett tidigare datum.';
    return '';
  }
  function checkB() {
    const v = inB.value;
    if (!v) return 'Välj vilken dag du åker hem.';
    if (inA.value) {
      const n = Math.round((parse(v) - parse(inA.value)) / 864e5);
      if (n < 2) return 'Du bokar minst två nätter. Välj en avresa minst två dagar efter ankomsten.';
      if (n > 21) return 'Vill du stanna längre än tre veckor? Ring oss så hjälper vi dig.';
    }
    return '';
  }
  function showErr(input, msg) {
    const f = input.closest('.ev-field');
    f.classList.toggle('is-error', !!msg);
    if (msg) { input.setAttribute('aria-invalid', 'true'); $('[data-msg]', f).textContent = msg; } else input.removeAttribute('aria-invalid');
  }
  function nightsText() {
    const ok = !checkA() && !checkB();
    put($('[data-nights]'), ok ? `${Math.round((parse(inB.value) - parse(inA.value)) / 864e5)} nätter, ${short(parse(inA.value))} → ${short(parse(inB.value))}` : '');
  }
  inA.addEventListener('change', () => {
    minB();
    if (inA.value && (!inB.value || inB.value < inB.min)) { inB.value = inB.min; showErr(inB, ''); }   // förifyllt, går att ändra
    showErr(inA, checkA()); nightsText(); syncDates();
  });
  inB.addEventListener('change', () => { showErr(inB, checkB()); nightsText(); syncDates(); });
  [inA, inB].forEach(i => i.addEventListener('blur', () => { if (i.value) showErr(i, i === inA ? checkA() : checkB()); }));
  function syncDates() { if (!checkA() && !checkB()) { S.ankomst = inA.value; S.avresa = inB.value; } renderSummary(); }
  $('[data-form="datum"]').addEventListener('submit', e => {
    e.preventDefault();
    const a = checkA(), b = checkB();
    showErr(inA, a); showErr(inB, b);
    if (a) return inA.focus();
    if (b) return inB.focus();
    S.ankomst = inA.value; S.avresa = inB.value;
    next('datum');
  });

  /* ---------- Steg 2: gäster ---------- */
  const LIM = { vuxna: [1, 8], barn: [0, 6] };
  function renderGuests() {
    $$('[data-qty-row]').forEach(row => {
      const k = row.dataset.qtyRow, [min, max] = LIM[k];
      const total8 = guests() >= 8;
      $('output', row).textContent = S[k];
      const [minus, plus] = $$('[data-qty]', row);
      minus.setAttribute('aria-disabled', String(S[k] <= min));
      plus.setAttribute('aria-disabled', String(S[k] >= max || total8));
      const label = k === 'vuxna' ? 'vuxna' : 'barn';
      minus.setAttribute('aria-label', `Färre ${label}, nu ${S[k]}`);
      plus.setAttribute('aria-label', `Fler ${label}, nu ${S[k]}`);
    });
    $$('[data-yesno="hund"] button').forEach(b => b.setAttribute('aria-pressed', String(b.value === S.hund)));
    renderSummary();
  }
  $$('[data-qty-row]').forEach(row => $$('[data-qty]', row).forEach(b => b.addEventListener('click', () => {
    if (b.getAttribute('aria-disabled') === 'true') return;
    const k = row.dataset.qtyRow, [min, max] = LIM[k];
    S[k] = Math.min(max, Math.max(min, S[k] + Number(b.dataset.qty)));
    renderGuests();
  })));
  $$('[data-yesno="hund"] button').forEach(b => b.addEventListener('click', () => {
    S.hund = b.value; $('#hund-fel').classList.remove('is-shown'); renderGuests();
  }));
  $('[data-form="gaster"]').addEventListener('submit', e => {
    e.preventDefault();
    if (!S.hund) { $('#hund-fel').classList.add('is-shown'); $('[data-yesno="hund"] button').focus(); return; }
    next('gaster');
  });

  /* ---------- Steg 3: stuga, går direkt vidare ---------- */
  function fits(id) {
    const c = C[id];
    if (c.beds < guests()) return { ok: false, why: `Rymmer ${c.beds} gäster` };
    if (S.hund === 'ja' && !c.pets) return { ok: false, why: 'Husdjur är inte tillåtna här' };
    return { ok: true };
  }
  const cabinForm = $('[data-auto="stuga"]');
  function renderCabins() {
    if (S.stuga && !fits(S.stuga).ok) S.stuga = null;
    $('[data-cabin-hint]').textContent = `${nights()} nätter för ${guests()} ${guests() === 1 ? 'gäst' : 'gäster'}. Välj en stuga så går du vidare.`;
    const ids = Object.keys(C).sort((a, b) => fits(b).ok - fits(a).ok);
    cabinForm.innerHTML = ids.map(id => {
      const c = C[id], f = fits(id);
      return `<button class="ev-choice${S.stuga === id ? ' is-current' : ''}" name="stuga" value="${id}"${f.ok ? '' : ' aria-disabled="true"'}>
        <span class="ev-choice__name">${c.name}</span>
        <span class="ev-choice__price">${kr(stayPrice(id))}<small>${nights()} nätter</small></span>${icon('pil')}
        <span class="ev-choice__desc">${f.ok ? `${c.beds} bäddar, ${c.rooms}${c.pets ? ', husdjur tillåtna' : ''}` : f.why}</span></button>`;
    }).join('');
  }
  cabinForm.addEventListener('submit', e => {
    e.preventDefault();
    const b = e.submitter;
    if (!b || b.getAttribute('aria-disabled') === 'true') return;
    S.stuga = b.value;
    next('stuga');
  });

  /* ---------- Steg 4: tillval (inget förvalt) ---------- */
  function setupExtras() {
    $('[data-linne-price]').textContent = kr(extraPrice('linne'));
    $('[data-linne-desc]').textContent = `150 kr per person, ${guests()} ${guests() === 1 ? 'person' : 'personer'}.`;
    $$('input[name="tillval"]').forEach(i => { i.checked = S.tillval.includes(i.value); });
  }
  $$('input[name="tillval"]').forEach(i => i.addEventListener('change', () => {
    S.tillval = $$('input[name="tillval"]:checked').map(x => x.value); renderSummary();
  }));
  $('[data-form="tillval"]').addEventListener('submit', e => { e.preventDefault(); next('tillval'); });

  /* ---------- Steg 5: uppgifter ---------- */
  const fInfo = $('[data-form="uppgifter"]');
  const infoBtn = $('button[type="submit"]', fInfo);
  function gate() {
    const missing = [];
    if (!EV.check($('#f-namn'))) missing.push('namn');
    if (!EV.check($('#f-epost'))) missing.push('e-post');
    if (!EV.check($('#f-tel'))) missing.push('mobilnummer');
    infoBtn.setAttribute('aria-disabled', String(missing.length > 0));
    const list = missing.length > 1 ? `${missing.slice(0, -1).join(', ')} och ${missing.at(-1)}` : missing[0];
    $('[data-gate-text]').textContent = missing.length ? `Fyll i ${list} för att fortsätta.` : '';
  }
  EV.wire(fInfo, gate);
  fInfo.addEventListener('submit', e => {
    e.preventDefault();
    if (!EV.validateAll(fInfo)) return;
    S.namn = $('#f-namn').value.trim(); S.epost = $('#f-epost').value.trim();
    S.telefon = $('#f-tel').value.trim(); S.medd = $('#f-medd').value.trim();
    next('uppgifter');
  });

  /* ---------- Steg 6: bekräfta ---------- */
  function renderReview(dl, edit) {
    const rows = [
      ['Datum', datesText(), 'datum'],
      ['Gäster', guestsText(), 'gaster'],
      ['Stuga', `${C[S.stuga].name}, ${kr(stayPrice(S.stuga))}`, 'stuga'],
      ['Tillval', S.tillval.length ? S.tillval.map(k => `${EXTRAS[k][0]} ${kr(extraPrice(k))}`).join(', ') : 'Inga', 'tillval'],
      ...(S.hund === 'ja' ? [['Husdjur', kr(PET_FEE), 'gaster']] : []),
      ['Kontakt', [S.namn, S.epost, S.telefon].join(', '), 'uppgifter'],
      ...(S.medd ? [['Meddelande', S.medd, 'uppgifter']] : [])
    ];
    dl.innerHTML = rows.map(([k, , step]) =>
      `<div><dt>${k}</dt><dd></dd>${edit ? `<a class="ev-link" href="#" data-edit="${step}">Ändra<span class="ev-sr"> ${k.toLowerCase()}</span></a>` : ''}</div>`).join('') +
      `<div class="ev-total"><dt>Totalt</dt><dd>${kr(total())}</dd></div>`;
    $$('dd', dl).forEach((dd, i) => { if (rows[i]) put(dd, rows[i][1]); });
    $$('[data-edit]', dl).forEach(a => a.addEventListener('click', e => { e.preventDefault(); returnTo = 'bekrafta'; go(a.dataset.edit); }));
  }
  $('[data-form="bekrafta"]').addEventListener('submit', e => {
    e.preventDefault();
    $('[data-done-text]').textContent = `Bekräftelsen och koden till nyckelskåpet skickas till ${S.epost}. Välkommen ${short(parse(S.ankomst))} från 15.00.`;
    renderReview($('[data-done-review]'), false);
    history.replaceState({ step: 'klart' }, '', '');
    go('klart', { push: false });
  });

  /* ---------- Sammanfattning ---------- */
  function renderSummary() {
    const list = $('[data-sum-list]'), empty = $('[data-sum-empty]');
    if (!nights()) { list.hidden = true; empty.hidden = false; return; }
    const rows = [['Datum', datesText()], ['Gäster', guestsText()], ['Stuga', S.stuga ? C[S.stuga].name : 'Inte vald']];
    S.tillval.forEach(k => rows.push([EXTRAS[k][0], kr(extraPrice(k))]));
    if (S.hund === 'ja') rows.push(['Husdjur', kr(PET_FEE)]);
    list.innerHTML = rows.map(([k]) => `<div><dt>${k}</dt><dd></dd></div>`).join('') + (S.stuga ? `<div class="ev-total"><dt>Totalt</dt><dd>${kr(total())}</dd></div>` : '');
    $$('dd', list).forEach((dd, i) => { if (rows[i]) put(dd, rows[i][1]); });
    list.hidden = false; empty.hidden = true;
  }

  /* ---------- Start: värden från sökfältet eller stugsidan ---------- */
  const q = new URLSearchParams(location.search);
  const okDate = v => /^\d{4}-\d{2}-\d{2}$/.test(v || '');
  if (okDate(q.get('ankomst')) && parse(q.get('ankomst')) >= today) S.ankomst = q.get('ankomst');
  if (S.ankomst && okDate(q.get('avresa')) && q.get('avresa') > S.ankomst) S.avresa = q.get('avresa');
  const v = Number(q.get('vuxna')); if (v >= 1 && v <= 8) S.vuxna = v;
  const pre = q.get('stuga');
  history.replaceState({ step: 'datum' }, '', '');
  go('datum', { push: false, focus: false });
  if (pre && C[pre]) {
    // Stugan är vald från stugsidan. Den visas som vald när du kommer till stugsteget.
    S.stuga = pre;
    $('[data-sum-empty]').textContent = `${C[pre].name}. Välj datum så räknar vi priset.`;
  }
})();
