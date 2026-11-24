/* Stegvis fysio och rehab: designkoncept av Elevate Studio. Påhittad klinik med exempeldata. */
(() => {
  'use strict';

  /* ---------- Ikoner (24-rutnät, linje, rundade ändar, sy-*) ---------- */
  const P = {
    arrow: '<path d="M4 12h16M14 6l6 6-6 6"/>',
    back: '<path d="M20 12H4M10 6l-6 6 6 6"/>',
    close: '<path d="M6 6l12 12M18 6L6 18"/>',
    chevL: '<path d="M15 6l-6 6 6 6"/>',
    chevR: '<path d="M9 6l6 6-6 6"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4.5 20.5c0-4 3.4-6.5 7.5-6.5s7.5 2.5 7.5 6.5"/>',
    cal: '<rect x="3.5" y="5" width="17" height="15.5" rx="3"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    pin: '<path d="M12 21s-7-6.1-7-11.5a7 7 0 0 1 14 0C19 14.9 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
    check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
    checkCircle: '<circle cx="12" cy="12" r="9"/><path d="M7.8 12.3l2.9 2.9 5.5-5.6"/>',
    errorCircle: '<circle cx="12" cy="12" r="9"/><path d="M9 9l6 6M15 9l-6 6"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5.5M12 7.8h.01"/>',
    warn: '<path d="M10.3 4.3 2.9 17.5A2 2 0 0 0 4.6 20.5h14.8a2 2 0 0 0 1.7-3L13.7 4.3a2 2 0 0 0-3.4 0z"/><path d="M12 9.5v4.5M12 17.2h.01"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    clipboard: '<rect x="5" y="4.5" width="14" height="16.5" rx="3"/><path d="M9 4.5h6v3H9zM9 12h6M9 16h4"/>',
    phone: '<path d="M8.6 3.6 6.3 4.2A2.3 2.3 0 0 0 4.6 6.6c.5 7 5.8 12.3 12.8 12.8a2.3 2.3 0 0 0 2.4-1.7l.6-2.3a1.5 1.5 0 0 0-.8-1.7l-2.8-1.3a1.5 1.5 0 0 0-1.8.4l-1 1.3a11 11 0 0 1-4.3-4.3l1.3-1a1.5 1.5 0 0 0 .4-1.8L10.3 4.4a1.5 1.5 0 0 0-1.7-.8z"/>',
    search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5 20 20"/>'
  };
  const icon = (name, cls = '') => `<svg class="ev-icon ${cls}" viewBox="0 0 24 24" aria-hidden="true">${P[name]}</svg>`;

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const pad = n => String(n).padStart(2, '0');
  const fmtTime = m => `${pad(Math.floor(m / 60))}.${pad(m % 60)}`;
  const DAYS = ['söndag', 'måndag', 'tisdag', 'onsdag', 'torsdag', 'fredag', 'lördag'];
  const MONTHS = ['januari', 'februari', 'mars', 'april', 'maj', 'juni', 'juli', 'augusti', 'september', 'oktober', 'november', 'december'];
  const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
  const fmtDate = d => `${cap(DAYS[d.getDay()])} ${d.getDate()} ${MONTHS[d.getMonth()]}`;
  const sameDay = (a, b) => a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
  const isoDay = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hash = str => { let h = 0; for (const c of str) h = (h * 31 + c.charCodeAt(0)) >>> 0; return h; };

  /* ---------- Öppet nu (pi-et-oppet: bara grön text) ---------- */
  function initOpenStatus(HOURS) {
    const status = (now = new Date()) => {
      const m = now.getHours() * 60 + now.getMinutes();
      const today = HOURS[now.getDay()] || [];
      const cur = today.find(([a, b]) => m >= a && m < b);
      if (cur) return { open: true, text: `Öppet nu, till ${fmtTime(cur[1])}` };
      const next = today.find(([a]) => a > m);
      if (next) return { open: false, text: `Stängt just nu. Öppnar ${fmtTime(next[0])}` };
      for (let i = 1; i <= 7; i++) {
        const d = (now.getDay() + i) % 7;
        if ((HOURS[d] || []).length) return { open: false, text: `Stängt just nu. Öppnar ${i === 1 ? 'i morgon' : DAYS[d]} ${fmtTime(HOURS[d][0][0])}` };
      }
      return { open: false, text: 'Stängt' };
    };
    $$('[data-open-status]').forEach(el => { const s = status(); el.textContent = s.text; el.className = s.open ? 'ev-open' : 'ev-closed'; });
    $$('.ev-hours tr[data-day]').forEach(tr => {
      if (Number(tr.dataset.day) === new Date().getDay()) {
        tr.classList.add('is-today');
        tr.querySelector('th').insertAdjacentHTML('beforeend', '<span class="ev-sr"> (i dag)</span>');
      }
    });
  }

  /* ---------- Mobilmeny: panel i helskärm (standard) ---------- */
  const menuBtn = $('.ev-menubtn');
  if (menuBtn) {
    const logo = $('.ev-header .ev-logo').outerHTML;
    const links = $$('.ev-nav a').map(a => `<li><a href="${a.getAttribute('href')}"${a.hasAttribute('aria-current') ? ' aria-current="page"' : ''}${a.hasAttribute('data-boka') ? ' data-boka' : ''}>${a.textContent}${icon('arrow')}</a></li>`).join('');
    const foot = $('[data-menu-foot]');
    const dlg = document.createElement('dialog');
    dlg.className = 'ev-menu';
    dlg.setAttribute('aria-label', 'Meny');
    dlg.innerHTML = `
      <div class="ev-menu__top">${logo}<button class="ev-iconbtn" type="button" data-close aria-label="Stäng menyn">${icon('close')}</button></div>
      <nav aria-label="Huvudmeny"><ul>${links}</ul></nav>
      <div class="ev-menu__foot">${foot ? foot.innerHTML : ''}</div>`;
    document.body.append(dlg);
    menuBtn.addEventListener('click', () => { dlg.showModal(); menuBtn.setAttribute('aria-expanded', 'true'); });
    dlg.addEventListener('close', () => { menuBtn.setAttribute('aria-expanded', 'false'); if (!dlg.dataset.keepFocus) menuBtn.focus(); delete dlg.dataset.keepFocus; });
    dlg.addEventListener('click', e => {
      if (e.target.closest('[data-close]')) dlg.close();
      else if (e.target.closest('a[href*="#"]') && !e.target.closest('[data-boka]')) dlg.close();
    });
  }

  /* ---------- Dragspel: första öppen, en i taget (ux-faq-*) ---------- */
  $$('.ev-faq').forEach(faq => {
    const btns = $$('.ev-faq__btn', faq);
    btns.forEach(btn => btn.addEventListener('click', () => {
      const open = btn.getAttribute('aria-expanded') === 'true';
      btns.forEach(b => { b.setAttribute('aria-expanded', 'false'); $('#' + b.getAttribute('aria-controls')).hidden = true; });
      if (!open) { btn.setAttribute('aria-expanded', 'true'); $('#' + btn.getAttribute('aria-controls')).hidden = false; }
    }));
  });

  /* ---------- Flikar för paket på desktop, staplat på mobil (ux-pris-paket-layout, ux-pris-mobil) ---------- */
  const pkgTabs = $('[data-pkg-tabs]');
  if (pkgTabs) {
    const pkgs = $('.ev-pkgs');
    const tabsEls = $$('[role="tab"]', pkgTabs);
    const mq = matchMedia('(min-width: 900px)');
    const select = (tab, focus) => {
      tabsEls.forEach(t => {
        const on = t === tab;
        t.setAttribute('aria-selected', on);
        t.setAttribute('aria-pressed', on);
        t.tabIndex = on ? 0 : -1;
        const panel = document.getElementById(t.getAttribute('aria-controls'));
        panel.classList.toggle('is-active', on);
        if (mq.matches) panel.hidden = !on;
      });
      if (focus) tab.focus();
    };
    tabsEls.forEach((t, i) => {
      t.addEventListener('click', () => select(t));
      t.addEventListener('keydown', e => {
        let j = null;
        if (e.key === 'ArrowRight') j = (i + 1) % tabsEls.length;
        if (e.key === 'ArrowLeft') j = (i - 1 + tabsEls.length) % tabsEls.length;
        if (j !== null) { e.preventDefault(); select(tabsEls[j], true); }
      });
    });
    const sync = () => {
      pkgs.classList.toggle('is-tabbed', mq.matches);
      pkgTabs.classList.add('is-ready');
      $$('.ev-pkg', pkgs).forEach(p => { if (mq.matches) p.setAttribute('role', 'tabpanel'); else { p.removeAttribute('role'); p.hidden = false; } });
      if (mq.matches) select(tabsEls.find(x => x.getAttribute('aria-selected') === 'true') || tabsEls[1]);
    };
    sync();
    mq.addEventListener('change', sync);
  }

  /* ---------- Formulär: fel när man lämnar fältet och säger vad man ska göra (ux-fel-*) ---------- */
  function fieldError(el) {
    const v = el.value.trim();
    const label = el.dataset.name || 'fältet';
    if (el.type === 'radio') {
      const group = $$(`input[name="${el.name}"]`, el.form || document);
      return group.some(r => r.checked) ? '' : (el.closest('fieldset').dataset.error || 'Välj ett alternativ.');
    }
    if (el.required && !v) return el.dataset.error || `Fyll i ${label}.`;
    if (!v) return '';
    if (el.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return 'Skriv e-postadressen som namn@exempel.se.';
    if (el.type === 'tel' && v.replace(/[^\d]/g, '').length < 8) return 'Skriv telefonnumret med riktnummer, till exempel 070-123 45 67.';
    if (el.dataset.type === 'pnr' && !/^(\d{6}|\d{8})[-+]?\d{4}$/.test(v.replace(/\s/g, ''))) return 'Skriv personnumret med tolv siffror, till exempel 19850412-1234.';
    return '';
  }
  function showError(el, msg) {
    const box = el.type === 'radio' ? el.closest('fieldset') : el.closest('.ev-field');
    let err = $('.ev-error', box);
    if (!err) {
      err = document.createElement('p');
      err.className = 'ev-error';
      err.id = (el.id || el.name) + '-fel';
      box.append(err);
    }
    const targets = el.type === 'radio' ? $$(`input[name="${el.name}"]`, box) : [el];
    if (msg) {
      err.innerHTML = icon('errorCircle') + `<span>${msg}</span>`;
      err.hidden = false;
      targets.forEach(t => {
        t.setAttribute('aria-invalid', 'true');
        const ids = new Set((t.getAttribute('aria-describedby') || '').split(' ').filter(Boolean)); ids.add(err.id);
        t.setAttribute('aria-describedby', [...ids].join(' '));
      });
    } else {
      err.hidden = true;
      targets.forEach(t => t.removeAttribute('aria-invalid'));
    }
  }
  function validator(root, { submit, missingEl, extra } = {}) {
    const fields = () => $$('input, textarea, select', root).filter(f => f.type !== 'hidden' && f.type !== 'submit');
    const touched = new Set();
    const key = f => f.type === 'radio' ? 'r:' + f.name : f;
    const uniq = () => { const seen = new Set(); return fields().filter(f => { const k = key(f); if (seen.has(k)) return false; seen.add(k); return true; }); };
    const refresh = () => {
      const bad = uniq().filter(f => fieldError(f));
      const extraBad = extra ? extra.missing() : [];
      const names = [...bad.map(f => f.dataset.name || (f.type === 'radio' ? f.closest('fieldset').dataset.name : 'fältet')), ...extraBad.map(x => x.name)];
      if (submit) submit.setAttribute('aria-disabled', names.length ? 'true' : 'false');
      if (missingEl) {
        missingEl.textContent = names.length ? `Fyll i ${names.length > 1 ? names.slice(0, -1).join(', ') + ' och ' + names.at(-1) : names[0]} för att gå vidare.` : '';
      }
      return { bad, extraBad };
    };
    root.addEventListener('focusout', e => {
      const f = e.target;
      if (!f.matches('input, textarea, select')) return;
      if (f.type === 'radio') {
        setTimeout(() => { if (!f.closest('fieldset').contains(document.activeElement)) { touched.add(key(f)); showError(f, fieldError(f)); } }, 0);
        return;
      }
      if (f.value.trim() || f.required || touched.has(f)) { touched.add(f); showError(f, fieldError(f)); }
    });
    root.addEventListener('input', e => {
      const f = e.target;
      if (touched.has(key(f)) && f.getAttribute('aria-invalid') === 'true') showError(f, fieldError(f));
      refresh();
    });
    root.addEventListener('change', e => { if (e.target.type === 'radio') showError(e.target, ''); refresh(); });
    const attempt = () => {
      const { bad, extraBad } = refresh();
      if (extraBad.length || bad.length) {
        bad.forEach(f => { touched.add(key(f)); showError(f, fieldError(f)); });
        extraBad.forEach(x => x.show());
        const first = bad.length ? bad[0] : extraBad[0].el;
        first.focus();
        first.scrollIntoView({ block: 'center', behavior: reduced() ? 'auto' : 'smooth' });
        return false;
      }
      return true;
    };
    refresh();
    return { attempt, refresh };
  }

  $$('form[data-validate]').forEach(form => {
    const submit = $('[type="submit"]', form);
    const v = validator(form, { submit, missingEl: $('.ev-form__missing', form) });
    form.addEventListener('submit', e => {
      e.preventDefault();
      if (!v.attempt()) return;
      const w = submit.offsetWidth;
      submit.style.minWidth = w + 'px';
      submit.querySelector('span').textContent = 'Skickar …';
      setTimeout(() => {
        const done = document.getElementById(form.dataset.done);
        form.hidden = true;
        if (done) {
          const em = $('[data-echo-email]', done);
          const emailField = $('input[type="email"]', form);
          if (em && emailField) em.textContent = emailField.value.trim();
          done.hidden = false;
          const h = $('h2, h3', done);
          h.tabIndex = -1; h.focus();
        }
      }, 500);
    });
  });

  /* ---------- Fast list på desktop (ux-cta-folj-med) ---------- */
  const bar = $('.ev-stickybar');
  const anchor = $('[data-sticky-anchor]');
  const footer = $('.ev-footer');
  if (bar && anchor && 'IntersectionObserver' in window) {
    let past = false, atFooter = false;
    const upd = () => { const on = past && !atFooter; bar.classList.toggle('is-on', on); bar.inert = !on; };
    new IntersectionObserver(([en]) => { past = !en.isIntersecting && en.boundingClientRect.top < 0; upd(); }).observe(anchor);
    if (footer) new IntersectionObserver(([en]) => { atFooter = en.isIntersecting; upd(); }).observe(footer);
    upd();
  }

  /* ---------- Kalender (ux-val-dag) ---------- */
  function calendarHtml(month, selected, { isOpen, maxDays = 60 }) {
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const last = new Date(today); last.setDate(last.getDate() + maxDays);
    const y = month.getFullYear(), m = month.getMonth();
    const offset = (new Date(y, m, 1).getDay() + 6) % 7;
    const daysIn = new Date(y, m + 1, 0).getDate();
    let cells = '';
    for (let i = 0; i < offset; i++) cells += '<td></td>';
    for (let day = 1; day <= daysIn; day++) {
      const dt = new Date(y, m, day);
      const off = dt < today || dt > last || !isOpen(dt);
      const sel = selected && sameDay(dt, selected);
      const lbl = `${fmtDate(dt)}${off && dt >= today && dt <= last ? ', inga lediga tider' : ''}${sameDay(dt, today) ? ', i dag' : ''}`;
      cells += `<td><button type="button" data-date="${isoDay(dt)}" aria-label="${lbl}" aria-pressed="${!!sel}" class="${sameDay(dt, today) ? 'is-today' : ''}"${off ? ' disabled' : ''}>${day}</button></td>`;
      if ((offset + day) % 7 === 0 && day < daysIn) cells += '</tr><tr>';
    }
    const prevOk = new Date(y, m, 1) > new Date(today.getFullYear(), today.getMonth(), 1);
    const nextOk = new Date(y, m + 1, 1) <= last;
    return `
      <div class="ev-cal">
        <div class="ev-cal__head">
          <b aria-live="polite">${cap(MONTHS[m])} ${y}</b>
          <div class="ev-cal__nav">
            <button type="button" data-month="-1" aria-label="Föregående månad" aria-disabled="${!prevOk}">${icon('chevL')}</button>
            <button type="button" data-month="1" aria-label="Nästa månad" aria-disabled="${!nextOk}">${icon('chevR')}</button>
          </div>
        </div>
        <table aria-label="${cap(MONTHS[m])} ${y}">
          <thead><tr>${['Mån', 'Tis', 'Ons', 'Tor', 'Fre', 'Lör', 'Sön'].map((d, i) => `<th scope="col"><span aria-hidden="true">${d}</span><span class="ev-sr">${cap(DAYS[(i + 1) % 7])}</span></th>`).join('')}</tr></thead>
          <tbody><tr>${cells}</tr></tbody>
        </table>
      </div>`;
  }

  /* Stegindikator i flöden */
  function stepsHtml(names) {
    return `<div class="ev-steps">
      <p class="ev-steps__count" aria-live="polite"></p>
      <ol class="ev-steps__list">${names.map(s => `<li>${s}</li>`).join('')}</ol>
      <span class="ev-steps__dots" aria-hidden="true">${names.map(() => '<i></i>').join('')}</span>
    </div>`;
  }
  function setSteps(root, step, total) {
    const c = $('.ev-steps', root);
    if (!c) return;
    c.hidden = step > total;
    $('.ev-steps__count', c).textContent = step <= total ? `Steg ${step} av ${total}` : '';
    $$('.ev-steps__list li', c).forEach((li, i) => { if (i === step - 1) li.setAttribute('aria-current', 'step'); else li.removeAttribute('aria-current'); });
    $$('.ev-steps__dots i', c).forEach((d, i) => d.classList.toggle('is-on', i === step - 1));
  }
  const backLink = () => `<button class="ev-link ev-link--back ev-step__back" type="button" data-back>${icon('back', 'ev-link__arrow')}Tillbaka</button>`;
  const arrowBtn = (text, attrs = '') => `<button class="ev-btn ev-btn--block" ${attrs}><span>${text}</span>${icon('arrow', 'ev-btn__arrow')}</button>`;

  /* ================= Stegvis fysio och rehab ================= */
  initOpenStatus({ 0: [], 1: [[420, 1200]], 2: [[420, 1200]], 3: [[420, 1200]], 4: [[420, 1200]], 5: [[420, 1020]], 6: [[540, 840]] });

  const AREAS = [
    { id: 'rygg', name: 'Ryggbesvär', short: 'Rygg', kw: 'rygg ländrygg ischias ryggskott diskbråck svank' },
    { id: 'nacke', name: 'Nacke och axlar', short: 'Nacke', kw: 'nacke huvudvärk spänning whiplash käke skuldra' },
    { id: 'axel', name: 'Axel och arm', short: 'Axel', kw: 'axel arm armbåge tennisarmbåge handled' },
    { id: 'kna', name: 'Knä', short: 'Knä', kw: 'knä menisk korsband löparknä artros' },
    { id: 'hoft', name: 'Höft och ljumske', short: 'Höft', kw: 'höft ljumske artros säte' },
    { id: 'fot', name: 'Fot och vad', short: 'Fot', kw: 'fot vad hälsporre hälsena stukning fotled' },
    { id: 'idrott', name: 'Idrottsskador', short: 'Idrott', kw: 'idrott sport löpning fotboll träning skada' },
    { id: 'operation', name: 'Efter operation', short: 'Operation', kw: 'operation protes rehab efter' }
  ];
  const norm = s => s.toLowerCase().trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  function matches(q) {
    q = norm(q);
    if (!q) return [];
    const out = [];
    AREAS.forEach(a => {
      const words = (a.name + ' ' + a.kw).toLowerCase().split(/\s+/);
      const w = words.find(x => norm(x).startsWith(q));
      if (w) out.push({ a, word: w });
      else if (norm(a.name).includes(q)) out.push({ a, word: null });
    });
    return out;
  }

  /* ---------- Sök i heron: förslag och träffar, resten av ordet fetat (ux-sok-forslag) ---------- */
  const search = $('[data-search]');
  if (search) {
    const input = $('input', search), list = $('.ev-suggest', search);
    let items = [], active = -1;
    const close = () => { list.hidden = true; input.setAttribute('aria-expanded', 'false'); input.removeAttribute('aria-activedescendant'); active = -1; };
    const draw = () => {
      const q = input.value;
      items = matches(q);
      if (!norm(q)) { close(); return; }
      list.innerHTML = items.length
        ? items.map((m, i) => {
          const w = m.word || m.a.name.toLowerCase();
          const typed = esc(w.slice(0, norm(q).length)), rest = esc(w.slice(norm(q).length));
          return `<li role="option" id="fs-${i}" aria-selected="false" data-i="${i}"><span><span>${typed}</span><b>${rest}</b>${m.word && !norm(m.a.name).startsWith(norm(w)) ? ` <small>i ${esc(m.a.name.toLowerCase())}</small>` : ''}</span>${icon('arrow')}</li>`;
        }).join('')
        : `<li class="ev-suggest__empty" role="option" aria-disabled="true" aria-selected="false">Inga träffar. Tryck Sök för att se alla besvär.</li>`;
      list.hidden = false;
      input.setAttribute('aria-expanded', 'true');
      active = -1;
    };
    const goTo = m => { location.href = `besvar.html?q=${encodeURIComponent(input.value.trim())}#${m.a.id}`; };
    const setActive = i => {
      const lis = $$('li[data-i]', list);
      if (!lis.length) return;
      active = (i + lis.length) % lis.length;
      lis.forEach((li, j) => li.setAttribute('aria-selected', j === active));
      input.setAttribute('aria-activedescendant', lis[active].id);
    };
    input.addEventListener('input', draw);
    input.addEventListener('keydown', e => {
      if (e.key === 'ArrowDown') { e.preventDefault(); if (list.hidden) draw(); setActive(active + 1); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); setActive(active - 1); }
      else if (e.key === 'Escape') { close(); }
      else if (e.key === 'Enter' && active >= 0 && items[active]) { e.preventDefault(); goTo(items[active]); }
    });
    list.addEventListener('mousedown', e => { const li = e.target.closest('li[data-i]'); if (li) { e.preventDefault(); goTo(items[Number(li.dataset.i)]); } });
    input.addEventListener('blur', () => setTimeout(close, 100));
    search.addEventListener('submit', e => {
      const m = matches(input.value);
      if (m.length) { e.preventDefault(); goTo(m[0]); }
    });
  }

  /* Besvärssidan: visa vad sökningen gav (ux-sok-antal-traffar, ux-sok-inga-traffar) */
  const result = $('[data-search-result]');
  if (result) {
    const q = new URLSearchParams(location.search).get('q');
    if (q) {
      const m = matches(q);
      result.hidden = false;
      if (m.length) {
        result.innerHTML = `${icon('info')}<span>${m.length} ${m.length === 1 ? 'träff' : 'träffar'} på <b>”${esc(q)}”</b>: ${m.map(x => `<a href="#${x.a.id}">${esc(x.a.name)}</a>`).join(', ')}.</span>`;
      } else {
        const guess = AREAS.find(a => a.kw.split(' ').some(k => k[0] === norm(q)[0])) || AREAS[0];
        result.className = 'ev-notice ev-notice--warn';
        result.innerHTML = `${icon('warn')}<span>Inga träffar på <b>”${esc(q)}”</b>. Menade du <a href="#${guess.id}">${esc(guess.name.toLowerCase())}</a>? Alla besvär vi behandlar står nedan, eller ring <a href="tel:+46100000000">010-000 00 00</a>.</span>`;
      }
    }
  }

  /* ---------- Boka första besök med hälsodeklaration (egen sida) ---------- */
  const host = $('.ev-flowpage [data-host]');
  if (host) {
    const page = $('.ev-flowpage');
    const foot = $('[data-foot]', page);
    const STEPS = ['Besvär', 'Hälsa', 'Tid', 'Uppgifter', 'Bekräfta'];
    $('[data-steps]', page).outerHTML = stepsHtml(STEPS);
    const QS = [
      { id: 'q-natt', text: 'Har du ont även i vila eller på natten?', flag: false },
      { id: 'q-domn', text: 'Har du domningar, stickningar eller svaghet i armar eller ben?', flag: true },
      { id: 'q-feber', text: 'Har du feber eller gått ner i vikt utan att veta varför?', flag: true }
    ];
    const DUR = [['kort', 'Kortare än 6 veckor'], ['mellan', '6 veckor till 3 månader'], ['lang', 'Längre än 3 månader']];
    const PEOPLE = ['Sara Holm', 'Jonas Berg', 'Maria Öst'];
    const st = { area: null, dur: null, ans: {}, date: null, time: null, who: null, name: '', pnr: '', phone: '', email: '', note: '', step: 1, returnTo: null };
    const pre = new URLSearchParams(location.search).get('omrade');
    const areaObj = () => AREAS.find(a => a.id === st.area);
    const flagged = () => QS.filter(q => q.flag && st.ans[q.id] === 'ja');
    const healthDone = () => st.dur && QS.every(q => st.ans[q.id]);

    const isOpen = d => d.getDay() !== 0 && d.getDay() !== 6;
    function firstOpen() { const d = new Date(); d.setHours(0, 0, 0, 0); for (let i = 1; i < 30; i++) { const x = new Date(d); x.setDate(d.getDate() + i); if (isOpen(x)) return x; } return d; }
    function slotsFor(date) {
      const end = date.getDay() === 5 ? 960 : 1140;
      const out = [];
      for (let m = 420; m <= end; m += 60) {
        const h = hash(isoDay(date) + ':' + m) >>> 5;
        out.push({ t: m, who: PEOPLE[(h >>> 4) % 3], full: h % 10 < 5 });
      }
      return out;
    }

    function go(n) {
      st.step = n; render();
      const h = $('h2', host); if (h) { h.tabIndex = -1; h.focus({ preventScroll: true }); }
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
    function next(from) {
      if (st.returnTo) { const r = st.returnTo; st.returnTo = null; go(r); return; }
      go(from + 1);
    }

    function summary() {
      const set = (k, v, empty) => { const dd = $(`[data-sum="${k}"]`, page); dd.textContent = v || empty; dd.classList.toggle('is-empty', !v); };
      set('area', areaObj() && areaObj().name, 'Inte valt');
      set('health', healthDone() ? (flagged().length ? 'Ifylld, vi ringer dig innan' : 'Ifylld') : '', 'Inte ifylld');
      set('time', st.time != null ? `${fmtDate(st.date)} kl. ${fmtTime(st.time)}` : '', 'Inte valt');
      set('who', st.who, 'Inte valt');
    }

    function render() {
      const s = st.step;
      page.classList.toggle('is-done', s === 6);
      foot.innerHTML = '';
      setSteps(page, s, STEPS.length);
      summary();

      if (s === 1) {
        host.innerHTML = `
          <h2>Vad vill du ha hjälp med?</h2>
          <p class="ev-hint">Det tar ungefär tre minuter att boka, med några frågor om din hälsa. Välj det som ligger närmast så går du vidare.</p>
          <div class="ev-step__body ev-options">
            ${AREAS.map(a => `<button type="button" class="ev-option" data-area="${a.id}" aria-pressed="${st.area === a.id || (!st.area && pre === a.id)}"><span class="ev-option__text"><b>${a.name}</b></span>${icon('arrow')}</button>`).join('')}
          </div>
          <p class="ev-step__more">Något annat, till exempel yrsel eller bäckenbotten? <a href="tel:+46100000000">Ring oss</a> så bokar vi rätt person.</p>`;
        $$('[data-area]', host).forEach(b => b.addEventListener('click', () => { st.area = b.dataset.area; next(1); }));
      }

      if (s === 2) {
        host.innerHTML = `
          <button class="ev-link ev-link--back ev-step__back" type="button" data-back>${icon('back', 'ev-link__arrow')}Tillbaka</button>
          <h2>Några frågor om din hälsa</h2>
          <p class="ev-hint">Svaren hjälper fysioterapeuten att förbereda besöket. Bara den som behandlar dig kan läsa dem.</p>
          <div class="ev-step__body" data-form>
            <fieldset class="ev-fieldset" data-name="hur länge du haft besvären" data-error="Välj hur länge du har haft besvären.">
              <legend>Hur länge har du haft besvären?</legend>
              <div class="ev-radiocards">
                ${DUR.map(([v, t]) => `<label class="ev-radiocard"><input type="radio" name="dur" value="${v}"${st.dur === v ? ' checked' : ''}><b>${t}</b></label>`).join('')}
              </div>
            </fieldset>
            <div class="ev-qs">
              ${QS.map(q => `
                <div class="ev-yesno" role="group" aria-labelledby="${q.id}-t" data-q="${q.id}">
                  <p class="ev-yesno__q" id="${q.id}-t">${q.text}</p>
                  <div class="ev-yesno__btns">
                    <button type="button" class="ev-yn" data-ans="ja" aria-pressed="${st.ans[q.id] === 'ja'}">Ja</button>
                    <button type="button" class="ev-yn" data-ans="nej" aria-pressed="${st.ans[q.id] === 'nej'}">Nej</button>
                  </div>
                  <p class="ev-error" id="${q.id}-fel" hidden>${icon('errorCircle')}<span>Svara ja eller nej.</span></p>
                </div>`).join('')}
            </div>
            <div class="ev-notice ev-notice--warn" data-flag role="status" hidden style="margin-top:20px">${icon('warn')}<span><b>Prata gärna med vården först.</b> Ring 1177 för råd, eller 112 om det är akut. Du kan ändå boka, så ringer din fysioterapeut upp dig dagen före besöket.</span></div>
          </div>`;
        foot.innerHTML = `${arrowBtn('Fortsätt', 'type="button" data-continue aria-describedby="h-saknas"')}<p class="ev-form__missing" id="h-saknas"></p>`;
        const form = $('[data-form]', host);
        const cont = $('[data-continue]', foot);
        const flagBox = $('[data-flag]', host);
        const syncFlag = () => { flagBox.hidden = !flagged().length; };
        const qMissing = () => QS.filter(q => !st.ans[q.id]).map((q, i, arr) => ({
          name: `svar på ${arr.length} ${arr.length === 1 ? 'fråga' : 'frågor'}`,
          el: $(`[data-q="${q.id}"] .ev-yn`, host),
          show: () => { const g = $(`[data-q="${q.id}"]`, host); g.setAttribute('aria-invalid', 'true'); g.setAttribute('aria-describedby', `${q.id}-fel`); $(`#${q.id}-fel`, host).hidden = false; }
        }));
        const v = validator(form, { submit: cont, missingEl: $('#h-saknas', foot), extra: { missing: () => { const m = qMissing(); return m.length ? [{ ...m[0], show: () => m.forEach(x => x.show()) }] : []; } } });
        form.addEventListener('change', e => { if (e.target.name === 'dur') { st.dur = e.target.value; summary(); } });
        $$('.ev-yesno', host).forEach(g => $$('.ev-yn', g).forEach(b => b.addEventListener('click', () => {
          st.ans[g.dataset.q] = b.dataset.ans;
          $$('.ev-yn', g).forEach(x => x.setAttribute('aria-pressed', x === b));
          g.removeAttribute('aria-invalid'); $('.ev-error', g).hidden = true;
          syncFlag(); summary(); v.refresh();
        })));
        syncFlag();
        cont.addEventListener('click', () => { if (v.attempt()) next(2); });
      }

      if (s === 3) {
        if (!st.date) st.date = firstOpen();
        const today = new Date(); today.setHours(0, 0, 0, 0);
        const max = new Date(today); max.setDate(max.getDate() + 60);
        const sl = isOpen(st.date) ? slotsFor(st.date) : [];
        const free = sl.filter(x => !x.full).length;
        host.innerHTML = `
          <button class="ev-link ev-link--back ev-step__back" type="button" data-back>${icon('back', 'ev-link__arrow')}Tillbaka</button>
          <h2>När vill du komma?</h2>
          <p class="ev-hint">Första besöket tar 60 minuter. Välj en ledig tid så går du vidare.</p>
          <div class="ev-step__body">
            <div class="ev-field ev-datefield">
              <label for="b-dag">Dag</label>
              <input class="ev-input" id="b-dag" type="date" value="${isoDay(st.date)}" min="${isoDay(new Date(today.getTime() + 864e5))}" max="${isoDay(max)}" aria-describedby="b-dag-info">
              <p class="ev-field__hint" id="b-dag-info">${fmtDate(st.date)}. ${free ? `${free} lediga tider.` : 'Inga lediga tider den här dagen, välj en annan dag.'}</p>
            </div>
            <div class="ev-times" style="margin-top:24px" aria-live="polite">
              ${sl.length ? `<h3 id="tg">Lediga tider ${fmtDate(st.date).toLowerCase()}</h3>
              <div class="ev-timegrid" role="group" aria-labelledby="tg">
                ${sl.map(x => `<button type="button" class="ev-time" data-time="${x.t}" data-who="${x.who}" aria-pressed="${st.time === x.t && st.who === x.who}"${x.full ? ' disabled' : ''}>${fmtTime(x.t)}<small>${x.who.split(' ')[0]}</small>${x.full ? '<span class="ev-sr">, bokad</span>' : ''}</button>`).join('')}
              </div>` : ''}
            </div>
          </div>`;
        $('#b-dag', host).addEventListener('change', e => {
          const v = e.target.value;
          if (!v) return;
          const [y, m, d] = v.split('-').map(Number);
          st.date = new Date(y, m - 1, d); st.time = null; st.who = null;
          render(); $('#b-dag', host).focus();
        });
        $$('[data-time]', host).forEach(b => b.addEventListener('click', () => { st.time = Number(b.dataset.time); st.who = b.dataset.who; next(3); }));
      }

      if (s === 4) {
        host.innerHTML = `
          <button class="ev-link ev-link--back ev-step__back" type="button" data-back>${icon('back', 'ev-link__arrow')}Tillbaka</button>
          <h2>Dina uppgifter</h2>
          <p class="ev-hint">Vi behöver personnumret för journalen. Bekräftelsen kommer med sms och e-post.</p>
          <div class="ev-step__body ev-form" data-form>
            <div class="ev-field"><label for="u-namn">Namn</label><input class="ev-input" id="u-namn" autocomplete="name" placeholder="Anna Svensson" required data-name="namn" data-error="Skriv ditt namn."></div>
            <div class="ev-field"><label for="u-pnr">Personnummer</label><input class="ev-input" id="u-pnr" inputmode="numeric" autocomplete="off" placeholder="19850412-1234" required data-type="pnr" data-name="personnummer" data-error="Skriv ditt personnummer med tolv siffror, till exempel 19850412-1234."></div>
            <div class="ev-form__row">
              <div class="ev-field"><label for="u-tel">Mobil</label><input class="ev-input" id="u-tel" type="tel" inputmode="tel" autocomplete="tel" placeholder="070-123 45 67" required data-name="mobil" data-error="Skriv ditt mobilnummer så att vi kan skicka bekräftelsen."></div>
              <div class="ev-field"><label for="u-epost">E-post</label><input class="ev-input" id="u-epost" type="email" autocomplete="email" placeholder="anna@exempel.se" required data-name="e-post" data-error="Skriv din e-postadress, till exempel anna@exempel.se."></div>
            </div>
            <div class="ev-field"><label for="u-note">Berätta gärna mer <span class="ev-opt">(valfritt)</span></label><textarea class="ev-input" id="u-note" rows="3" placeholder="Till exempel när det började eller vad du vill kunna göra igen"></textarea></div>
          </div>`;
        foot.innerHTML = `${arrowBtn('Fortsätt', 'type="button" data-continue aria-describedby="u-saknas"')}<p class="ev-form__missing" id="u-saknas"></p>`;
        const F = { name: '#u-namn', pnr: '#u-pnr', phone: '#u-tel', email: '#u-epost', note: '#u-note' };
        Object.entries(F).forEach(([k, sel]) => { $(sel, host).value = st[k]; });
        const form = $('[data-form]', host), cont = $('[data-continue]', foot);
        const v = validator(form, { submit: cont, missingEl: $('#u-saknas', foot) });
        form.addEventListener('input', () => Object.entries(F).forEach(([k, sel]) => { st[k] = $(sel, host).value.trim(); }));
        cont.addEventListener('click', () => { if (v.attempt()) next(4); });
        form.addEventListener('keydown', e => { if (e.key === 'Enter' && e.target.tagName === 'INPUT') { e.preventDefault(); cont.click(); } });
      }

      if (s === 5) {
        const row = (dt, dd, step, what) => `<div><dt>${dt}</dt><dd>${dd}</dd><button type="button" class="ev-link" data-edit="${step}">Ändra<span class="ev-sr"> ${what}</span></button></div>`;
        const fl = flagged();
        host.innerHTML = `
          <button class="ev-link ev-link--back ev-step__back" type="button" data-back>${icon('back', 'ev-link__arrow')}Tillbaka</button>
          <h2>Stämmer det här?</h2>
          <p class="ev-hint">Titta igenom bokningen innan du bokar.</p>
          <div class="ev-step__body">
            <dl class="ev-review">
              ${row('Besvär', areaObj().name, 1, 'besvär')}
              ${row('Hälsodeklaration', `${DUR.find(d => d[0] === st.dur)[1]} <span>· ${fl.length ? 'ja på ' + fl.length + (fl.length === 1 ? ' fråga' : ' frågor') + ', vi ringer dig innan' : 'inga varningstecken'}</span>`, 2, 'hälsodeklaration')}
              ${row('Tid', `${fmtDate(st.date)} kl. ${fmtTime(st.time)} <span>· ${st.who}</span>`, 3, 'tid')}
              ${row('Uppgifter', `${esc(st.name)}<br><span>${esc(st.pnr)} · ${esc(st.phone)} · ${esc(st.email)}</span>`, 4, 'uppgifter')}
            </dl>
            <p class="ev-policy">Första besök, 60 minuter, 895&nbsp;kr. Du betalar efter besöket. Avboka utan kostnad senast 24 timmar innan via länken i sms:et.</p>
          </div>`;
        foot.innerHTML = arrowBtn('Boka besöket', 'type="button" data-confirm');
        $$('[data-edit]', host).forEach(b => b.addEventListener('click', () => { st.returnTo = 5; go(Number(b.dataset.edit)); }));
        $('[data-confirm]', foot).addEventListener('click', e => {
          const b = e.currentTarget;
          b.setAttribute('aria-disabled', 'true');
          b.querySelector('span').textContent = 'Bokar …';
          setTimeout(() => go(6), 600);
        });
      }

      if (s === 6) {
        host.innerHTML = `
          <div aria-live="polite">
            <svg class="ev-icon ev-icon--48 ev-draw" viewBox="0 0 24 24" aria-hidden="true" style="color:var(--ev-ok);margin-bottom:16px">${P.checkCircle}</svg>
            <h2>Ditt besök är bokat</h2>
            <p style="margin-top:12px">${fmtDate(st.date)} kl. ${fmtTime(st.time)} med ${st.who}. Bekräftelsen skickas till ${esc(st.email)} och ${esc(st.phone)}.</p>
            ${flagged().length ? '<p style="margin-top:8px">Eftersom du svarade ja på någon av hälsofrågorna ringer vi dig dagen före besöket.</p>' : ''}
            <p class="ev-hint" style="margin-top:8px">Ta med mjuka kläder. Det här är ett designkoncept, så ingen bokning har skickats.</p>
          </div>`;
        foot.innerHTML = `<a class="ev-btn ev-btn--block" href="index.html#hitta"><span>Se hur du hittar hit</span>${icon('arrow', 'ev-btn__arrow')}</a>`;
      }

      const back = $('[data-back]', host);
      if (back) back.addEventListener('click', () => { st.returnTo = null; go(s - 1); });
    }
    render();
  }
})();
