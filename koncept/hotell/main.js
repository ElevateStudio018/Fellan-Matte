/* Hotell Sju Gränder: designkoncept av Elevate Studio. Påhittat hotell med exempeldata. Ingenting skickas. */
(() => {
  'use strict';

  const P = {
    arrow: '<path d="M4 12h16M14 6l6 6-6 6"/>',
    close: '<path d="M6 6l12 12M18 6L6 18"/>',
    chevL: '<path d="M15 6l-6 6 6 6"/>',
    chevR: '<path d="M9 6l6 6-6 6"/>',
    check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
    err: '<circle cx="12" cy="12" r="9"/><path d="M9 9l6 6M15 9l-6 6"/>',
    phone: '<path d="M8.6 3.6 6.3 4.2A2.3 2.3 0 0 0 4.6 6.6c.5 7 5.8 12.3 12.8 12.8a2.3 2.3 0 0 0 2.4-1.7l.6-2.3a1.5 1.5 0 0 0-.8-1.7l-2.8-1.3a1.5 1.5 0 0 0-1.8.4l-1 1.3a11 11 0 0 1-4.3-4.3l1.3-1a1.5 1.5 0 0 0 .4-1.8L10.3 4.4a1.5 1.5 0 0 0-1.7-.8z"/>',
    pin: '<path d="M12 21s-7-6.1-7-11.5a7 7 0 0 1 14 0C19 14.9 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
    area: '<rect x="4" y="4" width="16" height="16" rx="3"/><path d="M9 4v3M14 4v3M4 9h3M4 14h3"/>',
    users: '<circle cx="9" cy="8.5" r="3.5"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><path d="M15.5 5.2a3.5 3.5 0 0 1 0 6.6M17.5 14.4c2 .8 3.5 2.9 3.5 5.6"/>'
  };
  const icon = (n, cls = '') => `<svg class="ev-icon ${cls}" viewBox="0 0 24 24" aria-hidden="true">${P[n]}</svg>`;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const pad = n => String(n).padStart(2, '0');
  const iso = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const parseIso = s => { const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s || ''); return m ? new Date(+m[1], +m[2] - 1, +m[3]) : null; };
  const addDays = (d, n) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
  const today = (() => { const n = new Date(); return new Date(n.getFullYear(), n.getMonth(), n.getDate()); })();
  const DAY_S = ['sön', 'mån', 'tis', 'ons', 'tor', 'fre', 'lör'];
  const DAY_L = ['söndag', 'måndag', 'tisdag', 'onsdag', 'torsdag', 'fredag', 'lördag'];
  const MON = ['januari', 'februari', 'mars', 'april', 'maj', 'juni', 'juli', 'augusti', 'september', 'oktober', 'november', 'december'];
  const fmtShort = d => `${DAY_S[d.getDay()]} ${d.getDate()} ${MON[d.getMonth()].slice(0, 3)}`;
  const fmtLong = d => `${DAY_L[d.getDay()]} ${d.getDate()} ${MON[d.getMonth()]}`;
  const kr = n => `${Math.round(n).toLocaleString('sv-SE').replace(/\s/g, ' ')} kr`;
  const nightsBetween = (a, b) => Math.round((b - a) / 86400000);
  const plural = (n, one, many) => `${n} ${n === 1 ? one : many}`;

  /* ---------- Mobilmeny ---------- */
  const menuBtn = $('.ev-menubtn');
  if (menuBtn) {
    const links = $$('.ev-nav a').map(a => `<li><a href="${a.getAttribute('href')}"${a.hasAttribute('aria-current') ? ' aria-current="page"' : ''}>${a.textContent}${icon('arrow')}</a></li>`).join('');
    const dlg = document.createElement('dialog');
    dlg.className = 'ev-menu';
    dlg.setAttribute('aria-label', 'Meny');
    dlg.innerHTML = `
      <div class="ev-menu__top">
        <a class="ev-logo" href="index.html"><b>Sju Gränder</b><small>Hotell i Gamla stan</small></a>
        <button class="ev-iconbtn" type="button" data-close aria-label="Stäng menyn">${icon('close')}</button>
      </div>
      <nav aria-label="Huvudmeny"><ul>${links}</ul></nav>
      <div class="ev-menu__foot">
        <p class="ev-iconline">${icon('phone')}<span><a href="tel:+46100000000">010-000 00 00</a>. Receptionen svarar 07–23.</span></p>
        <p class="ev-iconline">${icon('pin')}<span>Tunnbindargränd 4, Gamla stan</span></p>
      </div>`;
    document.body.append(dlg);
    menuBtn.addEventListener('click', () => { dlg.showModal(); menuBtn.setAttribute('aria-expanded', 'true'); });
    dlg.addEventListener('close', () => { menuBtn.setAttribute('aria-expanded', 'false'); menuBtn.focus(); });
    dlg.addEventListener('click', e => { if (e.target.closest('[data-close]') || e.target.closest('nav a')) dlg.close(); });
  }

  /* ---------- Dragspel: första öppen, en i taget ---------- */
  $$('.ev-faq').forEach(faq => {
    const btns = $$('.ev-faq__btn', faq);
    btns.forEach(btn => btn.addEventListener('click', () => {
      const open = btn.getAttribute('aria-expanded') === 'true';
      btns.forEach(b => { b.setAttribute('aria-expanded', 'false'); document.getElementById(b.getAttribute('aria-controls')).hidden = true; });
      if (!open) { btn.setAttribute('aria-expanded', 'true'); document.getElementById(btn.getAttribute('aria-controls')).hidden = false; }
    }));
  });

  /* ---------- Fast list på desktop (ux-cta-folj-med) ---------- */
  const bar = $('.ev-stickybar');
  const anchor = $('[data-sticky-anchor]');
  if (bar && anchor && 'IntersectionObserver' in window) {
    let pastAnchor = false, atFooter = false;
    const update = () => { const on = pastAnchor && !atFooter; bar.classList.toggle('is-on', on); bar.inert = !on; };
    new IntersectionObserver(([e]) => { pastAnchor = !e.isIntersecting && e.boundingClientRect.top < 0; update(); }).observe(anchor);
    const foot = $('.ev-footer');
    if (foot) new IntersectionObserver(([e]) => { atFooter = e.isIntersecting; update(); }).observe(foot);
  }

  /* ---------- Fältvalidering (ux-fel-*) ---------- */
  function fieldError(input) {
    const v = input.value.trim();
    if (input.required && !v) return input.dataset.msg;
    if (v && input.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return input.dataset.msg;
    if (v && input.dataset.minDigits && v.replace(/\D/g, '').length < +input.dataset.minDigits) return input.dataset.msg;
    return '';
  }
  function showError(input, msg) {
    const box = document.getElementById(`${input.id}-fel`);
    if (!box) return;
    if (msg) {
      box.innerHTML = `${icon('err')}<span>${msg}</span>`;
      box.hidden = false;
      input.setAttribute('aria-invalid', 'true');
      input.setAttribute('aria-describedby', box.id);
    } else {
      box.hidden = true;
      input.removeAttribute('aria-invalid');
      input.removeAttribute('aria-describedby');
    }
  }
  function wireValidation(form, onChange) {
    const inputs = $$('input, textarea, select', form).filter(i => i.dataset.msg);
    inputs.forEach(i => {
      i.addEventListener('blur', () => { if (i.value.trim() || i.dataset.touched) showError(i, fieldError(i)); i.dataset.touched = '1'; onChange && onChange(); });
      i.addEventListener('input', () => { if (i.getAttribute('aria-invalid') === 'true') showError(i, fieldError(i)); onChange && onChange(); });
    });
    return {
      inputs,
      invalid: () => inputs.filter(i => fieldError(i)),
      showAll() {
        const bad = inputs.filter(i => { const m = fieldError(i); showError(i, m); return m; });
        if (bad.length) { bad[0].focus(); bad[0].scrollIntoView({ block: 'center', behavior: 'smooth' }); }
        return bad.length === 0;
      }
    };
  }
  const labelOf = i => (document.querySelector(`label[for="${i.id}"]`)?.childNodes[0].textContent || i.name).trim().toLowerCase();
  const listWords = arr => arr.length <= 1 ? arr.join('') : `${arr.slice(0, -1).join(', ')} och ${arr[arr.length - 1]}`;

  /* ---------- Kontaktformulär ---------- */
  const contact = $('[data-contact]');
  if (contact) {
    const btn = $('button[type="submit"]', contact);
    const missing = $('[data-missing]', contact);
    const update = () => {
      const bad = v.invalid();
      btn.setAttribute('aria-disabled', bad.length ? 'true' : 'false');
      missing.textContent = bad.length ? `Fyll i ${listWords(bad.map(labelOf))} för att skicka.` : 'Allt är ifyllt.';
    };
    const v = wireValidation(contact, update);
    contact.addEventListener('submit', e => {
      e.preventDefault();
      if (!v.showAll()) return;
      const done = $('[data-contact-done]');
      $('[data-done-email]', done).textContent = $('#k-epost').value.trim();
      contact.hidden = true; done.hidden = false; done.focus();
    });
    update();
  }

  /* ---------- Sökrutan i heron: förifyllda datum ---------- */
  const search = $('[data-search]');
  if (search) {
    const inEl = $('#s-in'), outEl = $('#s-ut');
    inEl.min = iso(today); inEl.value = iso(addDays(today, 1));
    outEl.min = iso(addDays(today, 2)); outEl.value = iso(addDays(today, 3));
    inEl.addEventListener('change', () => {
      const a = parseIso(inEl.value); if (!a) return;
      outEl.min = iso(addDays(a, 1));
      const b = parseIso(outEl.value);
      if (!b || b <= a) outEl.value = iso(addDays(a, 1));
    });
  }

  /* ================= Bokningsflödet ================= */
  const root = $('[data-booking]');
  if (!root) return;

  const ROOMS = [
    { id: 'lilla', name: 'Litet dubbelrum', size: 13, cap: 2, price: 1395, note: 'Mot gården' },
    { id: 'dubbel', name: 'Dubbelrum', size: 18, cap: 2, price: 1795, note: 'Mot gränden' },
    { id: 'horn', name: 'Hörnrum med badkar', size: 24, cap: 3, price: 2295, note: 'Två fönster', extraBed: 395 },
    { id: 'tak', name: 'Takrummet', size: 34, cap: 4, price: 3195, note: 'Frukost ingår', breakfast: true, fullWeekend: true }
  ];
  const ADDONS = [
    { id: 'frukost', name: 'Frukost', desc: 'I valvet varje morgon. Barn under sju år äter gratis.', unit: 'per vuxen och natt', price: 195, per: 'adultNight' },
    { id: 'sen', name: 'Sen utcheckning kl. 14', desc: 'Stanna tre timmar längre på avresedagen.', unit: 'en gång', price: 300, per: 'once' },
    { id: 'parkering', name: 'Parkering i garage', desc: 'Garaget vid Slussen, fyra minuter bort.', unit: 'per natt', price: 350, per: 'night' },
    { id: 'bubbel', name: 'Blommor och bubbel på rummet', desc: 'Säsongens blommor och en flaska alkoholfritt eller cava.', unit: 'en gång', price: 450, per: 'once' }
  ];

  const q = new URLSearchParams(location.search);
  const S = {
    step: 1,
    checkIn: null, checkOut: null,
    adults: Math.min(4, Math.max(1, +q.get('vuxna') || 2)), kids: 0,
    room: ROOMS.find(r => r.id === q.get('rum')) || null,
    addons: new Set(),
    viewMonth: null
  };
  const qi = parseIso(q.get('in')), qo = parseIso(q.get('ut'));
  if (qi && qi >= today) { S.checkIn = qi; if (qo && qo > qi && nightsBetween(qi, qo) <= 14) S.checkOut = qo; }
  S.viewMonth = new Date((S.checkIn || today).getFullYear(), (S.checkIn || today).getMonth(), 1);

  const STEP_NAMES = ['Datum', 'Rum', 'Tillval', 'Uppgifter', 'Bekräfta'];
  const TOTAL = 5;
  const nextBtn = $('[data-next]', root);
  const missing = $('[data-flow-missing]', root);
  const foot = $('[data-flow-foot]', root);
  const details = $('[data-details]', root);
  const terms = $('[data-terms]', root);
  const detailsV = wireValidation(details, () => updateFoot());

  const nights = () => (S.checkIn && S.checkOut ? nightsBetween(S.checkIn, S.checkOut) : 0);
  const weekendNights = () => { let n = 0; for (let i = 0; i < nights(); i++) { const d = addDays(S.checkIn, i).getDay(); if (d === 5 || d === 6) n++; } return n; };
  const guests = () => S.adults + S.kids;
  const roomCost = r => {
    if (!nights()) return 0;
    let c = r.price * nights() + 200 * weekendNights();
    if (r.extraBed && guests() > 2) c += r.extraBed * nights();
    return c;
  };
  const addonCost = a => a.per === 'adultNight' ? a.price * S.adults * nights() : a.per === 'night' ? a.price * nights() : a.price;
  const activeAddons = () => ADDONS.filter(a => S.addons.has(a.id) && !(a.id === 'frukost' && S.room?.breakfast));
  const total = () => (S.room ? roomCost(S.room) : 0) + activeAddons().reduce((s, a) => s + addonCost(a), 0);
  const guestText = () => [plural(S.adults, 'vuxen', 'vuxna'), S.kids ? plural(S.kids, 'barn', 'barn') : ''].filter(Boolean).join(' och ');
  const arrowSvg = icon('arrow');
  const datesHtml = () => S.checkIn && S.checkOut
    ? `<span class="ev-inline-route">${fmtShort(S.checkIn)}${arrowSvg}${fmtShort(S.checkOut)}</span><br><span style="font-weight:400">${plural(nights(), 'natt', 'nätter')}</span>`
    : '';
  const datesText = () => `${fmtLong(S.checkIn)} till ${fmtLong(S.checkOut)}, ${plural(nights(), 'natt', 'nätter')}`;

  /* --- Kalender med intervall --- */
  const cal = $('[data-cal]', root);
  const calStatus = $('[data-cal-status]', root);
  let focusDate = null;
  function renderCal(focus) {
    const y = S.viewMonth.getFullYear(), m = S.viewMonth.getMonth();
    const first = new Date(y, m, 1);
    const lead = (first.getDay() + 6) % 7;
    const days = new Date(y, m + 1, 0).getDate();
    const maxDate = addDays(today, 365);
    const atStart = y === today.getFullYear() && m === today.getMonth();
    const tabDate = focusDate && focusDate.getMonth() === m ? focusDate
      : (S.checkIn && S.checkIn.getMonth() === m && S.checkIn.getFullYear() === y ? S.checkIn : (atStart ? today : first));
    let rows = '', cells = '';
    for (let i = 0; i < lead; i++) cells += '<td></td>';
    for (let d = 1; d <= days; d++) {
      const date = new Date(y, m, d);
      const past = date < today || date > maxDate;
      const tooLong = S.checkIn && !S.checkOut && date > S.checkIn && nightsBetween(S.checkIn, date) > 14;
      const isStart = S.checkIn && +date === +S.checkIn;
      const isEnd = S.checkOut && +date === +S.checkOut;
      const inRange = S.checkIn && S.checkOut && date > S.checkIn && date < S.checkOut;
      const cls = [isStart && 'is-start', isEnd && 'is-end', inRange && 'is-range', isStart && !S.checkOut && 'is-end'].filter(Boolean).join(' ');
      const label = `${fmtLong(date)}${isStart ? ', incheckning' : ''}${isEnd ? ', utcheckning' : ''}${past ? ', inte bokningsbar' : ''}${tooLong ? ', längre än 14 nätter' : ''}`;
      cells += `<td class="${cls}"><button type="button" data-date="${iso(date)}" aria-label="${label}" ${isStart || isEnd ? 'aria-pressed="true"' : 'aria-pressed="false"'} ${past || tooLong ? 'disabled' : ''} tabindex="${+date === +tabDate ? 0 : -1}">${d}</button></td>`;
      if ((lead + d) % 7 === 0) { rows += `<tr>${cells}</tr>`; cells = ''; }
    }
    if (cells) rows += `<tr>${cells}</tr>`;
    cal.innerHTML = `
      <div class="ev-cal__head">
        <b id="cal-month" aria-live="polite">${MON[m].charAt(0).toUpperCase() + MON[m].slice(1)} ${y}</b>
        <div class="ev-cal__nav">
          <button type="button" data-cal-prev aria-label="Föregående månad" ${atStart ? 'aria-disabled="true"' : ''}>${icon('chevL')}</button>
          <button type="button" data-cal-next aria-label="Nästa månad">${icon('chevR')}</button>
        </div>
      </div>
      <table role="grid" aria-labelledby="cal-month">
        <thead><tr>${['Mån', 'Tis', 'Ons', 'Tor', 'Fre', 'Lör', 'Sön'].map((d, i) => `<th scope="col" abbr="${DAY_L[(i + 1) % 7]}">${d}</th>`).join('')}</tr></thead>
        <tbody>${rows}</tbody>
      </table>`;
    if (!tabDate || tabDate.getMonth() !== m) { const b = $('button[data-date]:not(:disabled)', cal); if (b) b.tabIndex = 0; }
    if (focus) { const b = $(`button[data-date="${iso(focus)}"]`, cal); if (b) b.focus(); }
  }
  function calStatusText() {
    if (!S.checkIn) return 'Välj incheckningsdag.';
    if (!S.checkOut) return `Incheckning ${fmtLong(S.checkIn)}. Välj utcheckningsdag.`;
    return `${datesText().charAt(0).toUpperCase() + datesText().slice(1)}.`;
  }
  cal.addEventListener('click', e => {
    if (e.target.closest('[data-cal-prev]')) {
      if (e.target.closest('[aria-disabled="true"]')) return;
      S.viewMonth = new Date(S.viewMonth.getFullYear(), S.viewMonth.getMonth() - 1, 1); focusDate = null; renderCal(); return;
    }
    if (e.target.closest('[data-cal-next]')) { S.viewMonth = new Date(S.viewMonth.getFullYear(), S.viewMonth.getMonth() + 1, 1); focusDate = null; renderCal(); return; }
    const b = e.target.closest('button[data-date]');
    if (!b || b.disabled) return;
    const d = parseIso(b.dataset.date);
    if (!S.checkIn || S.checkOut || d <= S.checkIn) { S.checkIn = d; S.checkOut = null; }
    else S.checkOut = d;
    focusDate = d;
    renderCal(d);
    calStatus.textContent = calStatusText();
    sync();
  });
  cal.addEventListener('keydown', e => {
    const b = e.target.closest('button[data-date]');
    if (!b) return;
    const moves = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 };
    if (!(e.key in moves)) return;
    e.preventDefault();
    const d = addDays(parseIso(b.dataset.date), moves[e.key]);
    if (d < today) return;
    focusDate = d;
    if (d.getMonth() !== S.viewMonth.getMonth()) S.viewMonth = new Date(d.getFullYear(), d.getMonth(), 1);
    renderCal(d);
  });

  /* --- Antal gäster --- */
  $$('[data-stepper]', root).forEach(st => {
    const key = st.dataset.stepper, min = +st.dataset.min, max = +st.dataset.max;
    const out = $('output', st), dec = $('[data-dec]', st), inc = $('[data-inc]', st);
    const paint = () => {
      out.textContent = S[key];
      dec.setAttribute('aria-disabled', S[key] <= min ? 'true' : 'false');
      inc.setAttribute('aria-disabled', S[key] >= max || guests() >= 4 ? 'true' : 'false');
    };
    st._paint = paint;
    dec.addEventListener('click', () => { if (S[key] > min) { S[key]--; $$('[data-stepper]', root).forEach(s => s._paint()); sync(); } });
    inc.addEventListener('click', () => { if (S[key] < max && guests() < 4) { S[key]++; $$('[data-stepper]', root).forEach(s => s._paint()); sync(); } });
    paint();
  });

  /* --- Rumsval (går vidare direkt) --- */
  const roomsBox = $('[data-rooms]', root);
  function renderRooms() {
    roomsBox.innerHTML = ROOMS.map(r => {
      const tooSmall = guests() > r.cap;
      const full = r.fullWeekend && weekendNights() > 0;
      const off = tooSmall || full;
      const pressed = S.room?.id === r.id;
      const priceHtml = full ? '<span class="ev-choice__full">Fullbokat dessa datum</span>'
        : tooSmall ? `<span class="ev-choice__full">Rymmer ${r.cap} gäster</span>`
        : `<span>${plural(nights(), 'natt', 'nätter')}<span class="ev-price">${kr(roomCost(r))}</span></span>${icon('arrow')}`;
      return `<button type="button" class="ev-choice" data-room="${r.id}" aria-pressed="${pressed}" ${off ? 'aria-disabled="true"' : ''}>
        <b>${r.name}</b>
        <span class="ev-meta"><span>${icon('area')}${r.size} m²</span><span>${icon('users')}${r.cap === 2 ? '1–2' : `1–${r.cap}`} gäster</span><span>${r.note}</span></span>
        <span class="ev-choice__price">${priceHtml}</span>
      </button>`;
    }).join('');
  }
  roomsBox.addEventListener('click', e => {
    const b = e.target.closest('[data-room]');
    if (!b || b.getAttribute('aria-disabled') === 'true') return;
    S.room = ROOMS.find(r => r.id === b.dataset.room);
    renderRooms();
    sync();
    go(3);
  });

  /* --- Tillval (flerval) --- */
  const addonsBox = $('[data-addons]', root);
  function renderAddons() {
    addonsBox.innerHTML = ADDONS.map(a => {
      const included = a.id === 'frukost' && S.room?.breakfast;
      const priceText = included ? 'Ingår' : a.per === 'once' ? kr(a.price) : `${kr(addonCost(a))}`;
      const desc = included ? 'Ingår redan i takrummet.' : `${a.desc} ${a.per === 'once' ? '' : `${kr(a.price)} ${a.unit}.`}`;
      return `<label class="ev-addon">
        <input type="checkbox" value="${a.id}" ${S.addons.has(a.id) && !included ? 'checked' : ''} ${included ? 'disabled' : ''}>
        <span class="ev-addon__box" aria-hidden="true">${icon('check')}</span>
        <b>${a.name}</b>
        <span class="ev-price">${priceText}</span>
        <small>${desc}</small>
      </label>`;
    }).join('');
  }
  addonsBox.addEventListener('change', e => {
    const i = e.target.closest('input'); if (!i) return;
    i.checked ? S.addons.add(i.value) : S.addons.delete(i.value);
    sync();
  });

  /* --- Granska --- */
  const reviewRows = (withEdit) => {
    const f = n => $(`[name="${n}"]`, details).value.trim();
    const rows = [
      ['Datum', datesText(), 1],
      ['Gäster', guestText(), 1],
      ['Rum', S.room ? S.room.name : '', 2],
      ['Tillval', activeAddons().map(a => a.name).join(', ') || (S.room?.breakfast ? 'Frukost ingår' : 'Inga'), 3],
      ['Kontakt', `${f('fornamn')} ${f('efternamn')}, ${f('epost')}, ${f('mobil')}`, 4]
    ];
    if (f('ankomst')) rows.push(['Ankomst', f('ankomst'), 4]);
    if (f('onskemal')) rows.push(['Önskemål', f('onskemal').replace(/</g, '&lt;'), 4]);
    return rows.map(([k, v, s]) => `<div><dt>${k}</dt><dd>${v}</dd>${withEdit ? `<button type="button" class="ev-link" data-edit="${s}">Ändra<span class="ev-sr"> ${k.toLowerCase()}</span></button>` : ''}</div>`).join('');
  };
  function renderReview() {
    $('[data-review]', root).innerHTML = reviewRows(true);
    const t = total();
    const lines = [[`${S.room.name}, ${plural(nights(), 'natt', 'nätter')}`, roomCost(S.room)], ...activeAddons().map(a => [a.name, addonCost(a)])];
    $('[data-total]', root).innerHTML = lines.map(([k, v]) => `<div><dt>${k}</dt><dd>${kr(v)}</dd></div>`).join('')
      + `<div class="is-sum"><dt>Totalt att betala på hotellet</dt><dd>${kr(t)}</dd></div>`
      + `<div><dt>varav moms 12 %</dt><dd>${kr(t - t / 1.12)}</dd></div>`;
  }
  $('[data-review]', root).addEventListener('click', e => { const b = e.target.closest('[data-edit]'); if (b) go(+b.dataset.edit); });

  /* --- Sammanfattning --- */
  function renderSummary() {
    const set = (k, html) => { const el = $(`[data-sum="${k}"]`, root); el.innerHTML = html || el.dataset.empty; el.classList.toggle('is-empty', !html); };
    $$('[data-sum]', root).forEach(el => { if (el.dataset.empty === undefined) el.dataset.empty = el.textContent; });
    set('dates', datesHtml());
    set('guests', guestText());
    set('room', S.room ? S.room.name : '');
    set('addons', activeAddons().map(a => a.name).join(', ') || (S.room?.breakfast ? 'Frukost ingår' : ''));
    $('[data-sum="total"]', root).textContent = S.room && nights() ? kr(total()) : '–';
  }

  /* --- Fot: knapp, saknas-rad, stegindikator --- */
  function stepProblem() {
    if (S.step === 1) {
      if (!S.checkIn) return 'Välj incheckningsdag för att fortsätta.';
      if (!S.checkOut) return 'Välj utcheckningsdag för att fortsätta.';
    }
    if (S.step === 4) {
      const bad = detailsV.invalid();
      if (bad.length) return `Fyll i ${listWords(bad.map(labelOf))} för att fortsätta.`;
    }
    if (S.step === 5 && !terms.checked) return 'Godkänn avbokningsvillkoren för att bekräfta.';
    return '';
  }
  function updateFoot() {
    const p = stepProblem();
    nextBtn.hidden = S.step === 2;
    nextBtn.setAttribute('aria-disabled', p ? 'true' : 'false');
    $('span', nextBtn).textContent = S.step === 5 ? 'Bekräfta bokning' : (S.step === 3 && !activeAddons().length ? 'Fortsätt utan tillval' : 'Fortsätt');
    missing.textContent = S.step === 2 ? '' : p;
    missing.hidden = !missing.textContent;
    $('[data-steps-count]', root).textContent = `Steg ${S.step} av ${TOTAL}`;
    $$('.ev-steps__list li', root).forEach((li, i) => i === S.step - 1 ? li.setAttribute('aria-current', 'step') : li.removeAttribute('aria-current'));
    $$('.ev-steps__dots i', root).forEach((d, i) => d.classList.toggle('is-on', i === S.step - 1));
  }
  function sync() {
    // Ett rum som inte längre passar avmarkeras
    if (S.room && (guests() > S.room.cap || (S.room.fullWeekend && weekendNights() > 0))) S.room = null;
    renderSummary();
    updateFoot();
  }

  function go(n, { focus = true } = {}) {
    S.step = n;
    $$('[data-step]', root).forEach(s => { s.hidden = +s.dataset.step !== n; });
    if (n === 2) renderRooms();
    if (n === 3) renderAddons();
    if (n === 5) { terms.checked = false; renderReview(); }
    root.classList.toggle('is-final', n === 5);
    sync();
    document.title = `${STEP_NAMES[n - 1]} – Boka rum – Hotell Sju Gränder`;
    if (focus) {
      const h = $(`[data-step="${n}"] h1`, root);
      root.scrollIntoView({ block: 'start', behavior: 'instant' });
      h.focus({ preventScroll: true });
    }
  }

  nextBtn.addEventListener('click', () => {
    if (nextBtn.getAttribute('aria-disabled') === 'true') {
      if (S.step === 4) detailsV.showAll();
      else if (S.step === 5) terms.focus();
      else if (S.step === 1) $('button[data-date][tabindex="0"]', cal)?.focus();
      missing.hidden = false;
      return;
    }
    if (S.step < 5) { go(S.step + 1); return; }
    finish();
  });
  details.addEventListener('submit', e => { e.preventDefault(); nextBtn.click(); });
  terms.addEventListener('change', updateFoot);
  $$('[data-back]', root).forEach(b => b.addEventListener('click', () => go(S.step - 1)));

  function finish() {
    const confirm = $('[data-confirm]', root);
    $('[data-bookno]', confirm).textContent = `SG-${String(40000 + Math.floor(Math.random() * 9999))}`;
    $('[data-confirm-email]', confirm).textContent = $('[name="epost"]', details).value.trim();
    $('[data-confirm-review]', confirm).innerHTML = reviewRows(false) + `<div><dt>Att betala vid incheckning</dt><dd>${kr(total())}</dd></div>`;
    $$('[data-step]', root).forEach(s => { s.hidden = true; });
    foot.hidden = true;
    $('[data-flow-close]', root).hidden = true;
    root.classList.add('is-done');
    confirm.hidden = false;
    document.title = 'Rummet är bokat – Hotell Sju Gränder';
    root.scrollIntoView({ block: 'start', behavior: 'instant' });
    $('h1', confirm).focus({ preventScroll: true });
  }

  renderCal();
  calStatus.textContent = calStatusText();
  go(1, { focus: false });
})();
