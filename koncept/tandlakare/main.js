/* Lindgårdens tandvård: designkoncept av Elevate Studio. Påhittad klinik med exempeldata. */
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

  /* ================= Lindgårdens tandvård ================= */
  initOpenStatus({ 0: [], 1: [[450, 1080]], 2: [[450, 1080]], 3: [[450, 1080]], 4: [[450, 1080]], 5: [[450, 900]], 6: [[540, 780]] });

  /* ---------- Boka undersökning: dialog, bottenark på mobil ---------- */
  const TREAT = {
    ny: [
      { id: 'us-ny', name: 'Undersökning för nya patienter', dur: 60, price: '1 095 kr', desc: 'Röntgen, munhälsa och en plan för dina tänder' },
      { id: 'akut', name: 'Akut tandvärk', dur: 30, price: 'från 650 kr', desc: 'Tider i dag och de närmaste dagarna' },
      { id: 'hyg', name: 'Tandhygienist', dur: 45, price: '895 kr', desc: 'Tandsten, polering och råd för hemmet' },
      { id: 'blek', name: 'Rådgivning om blekning', dur: 20, price: '0 kr', desc: 'Vi tittar på om blekning passar dig' }
    ],
    bef: [
      { id: 'us', name: 'Undersökning', dur: 45, price: '895 kr', desc: 'Återkommande kontroll, röntgen vid behov' },
      { id: 'akut', name: 'Akut tandvärk', dur: 30, price: 'från 650 kr', desc: 'Tider i dag och de närmaste dagarna' },
      { id: 'hyg', name: 'Tandhygienist', dur: 45, price: '895 kr', desc: 'Tandsten, polering och råd för hemmet' },
      { id: 'lag', name: 'Lagning', dur: 45, price: 'från 950 kr', desc: 'När tandläkaren redan har sett vad som behöver lagas' }
    ]
  };
  const STEPS = ['Patient', 'Behandling', 'Tid', 'Uppgifter', 'Bekräfta'];
  const blank = () => ({ patient: null, treat: null, date: null, time: null, name: '', pnr: '', phone: '', email: '', note: '', nervous: false, step: 1, returnTo: null });
  let st = blank();
  let dlg, opener, calMonth;
  const treatObj = () => st.treat && TREAT[st.patient].find(t => t.id === st.treat);

  function isOpenDay(d) {
    const wd = d.getDay();
    if (wd === 0) return false;
    if (st.treat === 'akut') {
      const lim = new Date(); lim.setHours(0, 0, 0, 0); lim.setDate(lim.getDate() + 3);
      return d <= lim;
    }
    if (wd === 6) return false;
    return slots(d).some(g => g.slots.some(x => !x.full));
  }
  function slots(date) {
    const wd = date.getDay();
    const end = wd === 5 ? 870 : wd === 6 ? 750 : 1050;
    const start = wd === 6 ? 540 : 450;
    const step = 30;
    const now = new Date();
    const nowM = sameDay(date, now) ? now.getHours() * 60 + now.getMinutes() + 45 : -1;
    const all = [];
    for (let m = start; m <= end - (treatObj() ? treatObj().dur : 30) + 30; m += step) if (m > nowM) all.push(m);
    const seed = isoDay(date) + st.treat;
    const mark = t => {
      const h = hash(seed + t);
      const daysOut = (date - now) / 864e5;
      return { t, full: daysOut < 7 && st.treat !== 'akut' ? h % 10 < 7 : h % 10 < 4 };
    };
    const am = all.filter(t => t < 720).map(mark), pm = all.filter(t => t >= 720).map(mark);
    return [{ name: 'Förmiddag', slots: am }, { name: 'Eftermiddag', slots: pm }].filter(g => g.slots.length);
  }

  function build() {
    dlg = document.createElement('dialog');
    dlg.className = 'ev-dialog';
    dlg.setAttribute('aria-labelledby', 'boka-titel');
    dlg.innerHTML = `
      <div class="ev-dialog__grid">
        <div class="ev-dialog__main">
          <p id="boka-titel" class="ev-sr">Boka tid hos Lindgårdens tandvård</p>
          <button class="ev-iconbtn ev-dialog__close" type="button" data-cancel aria-label="Avbryt bokningen">${icon('close')}</button>
          <div class="ev-step" data-host></div>
          <div class="ev-flowfoot"><div data-foot></div>${stepsHtml(STEPS)}</div>
        </div>
        <aside class="ev-summary" aria-labelledby="sum-rubrik">
          <h2 id="sum-rubrik">Din bokning</h2>
          <dl>
            <div>${icon('user')}<span><dt>Patient</dt><dd data-sum="patient"></dd></span></div>
            <div>${icon('clipboard')}<span><dt>Behandling</dt><dd data-sum="treat"></dd></span></div>
            <div>${icon('cal')}<span><dt>Dag</dt><dd data-sum="date"></dd></span></div>
            <div>${icon('clock')}<span><dt>Tid</dt><dd data-sum="time"></dd></span></div>
          </dl>
          <p class="ev-summary__place">Lindgårdsgatan 12, Västerås. Avboka utan kostnad senast 24 timmar innan.</p>
        </aside>
      </div>`;
    document.body.append(dlg);
    dlg.addEventListener('click', e => { if (e.target.closest('[data-cancel]') || e.target === dlg) dlg.close(); });
    dlg.addEventListener('close', () => {
      if (st.step === 6) { st = blank(); calMonth = null; }
      document.documentElement.style.overflow = '';
      if (location.hash === '#boka') history.replaceState(null, '', location.pathname + location.search);
      if (opener && document.contains(opener)) opener.focus();
    });
  }

  function open(trigger) {
    if (!dlg) build();
    opener = trigger;
    render();
    dlg.showModal();
    document.documentElement.style.overflow = 'hidden';
    focusHead();
  }
  function focusHead() { const h = $('[data-host] h2', dlg); if (h) { h.tabIndex = -1; h.focus(); } }
  function go(n) {
    st.step = n; render(); focusHead();
    $('.ev-dialog__main', dlg).scrollTop = 0; $('.ev-dialog__grid', dlg).scrollTop = 0;
  }
  function next(from) {
    if (st.returnTo) {
      if ((from === 1 || from === 2) && st.time == null) { go(from + 1); return; }
      const r = st.returnTo; st.returnTo = null; go(r); return;
    }
    go(from + 1);
  }

  function render() {
    const host = $('[data-host]', dlg), foot = $('[data-foot]', dlg), s = st.step;
    dlg.classList.toggle('is-final', s === 5);
    dlg.classList.toggle('is-done', s === 6);
    foot.innerHTML = '';
    setSteps(dlg, s, STEPS.length);
    const T = treatObj();
    const sum = { patient: st.patient ? (st.patient === 'ny' ? 'Ny patient' : 'Har varit här förut') : '', treat: T ? T.name : '', date: st.date ? fmtDate(st.date) : '', time: st.time != null ? `kl. ${fmtTime(st.time)}` : '' };
    Object.entries(sum).forEach(([k, v]) => { const dd = $(`[data-sum="${k}"]`, dlg); dd.textContent = v || 'Inte valt'; dd.classList.toggle('is-empty', !v); });

    if (s === 1) {
      host.innerHTML = `
        <h2>Har du varit hos oss förut?</h2>
        <p class="ev-hint">Det tar ungefär två minuter att boka. Välj ett alternativ så går du vidare.</p>
        <div class="ev-step__body ev-options">
          <button type="button" class="ev-option" data-patient="ny" aria-pressed="${st.patient === 'ny'}"><span class="ev-option__text"><b>Nej, jag är ny patient</b><small>Du får en längre första undersökning med röntgen</small></span>${icon('arrow')}</button>
          <button type="button" class="ev-option" data-patient="bef" aria-pressed="${st.patient === 'bef'}"><span class="ev-option__text"><b>Ja, jag har varit här</b><small>Vi hittar din journal med ditt personnummer</small></span>${icon('arrow')}</button>
        </div>
        <p class="ev-step__more">Har du ont just nu? Ring <a href="tel:+46100000000">010-000 00 00</a> före klockan 10 så får du en tid i dag.</p>`;
      $$('[data-patient]', host).forEach(b => b.addEventListener('click', () => {
        if (st.patient !== b.dataset.patient) { st.treat = null; st.time = null; }
        st.patient = b.dataset.patient; next(1);
      }));
    }

    if (s === 2) {
      host.innerHTML = `
        ${backLink()}
        <h2>Vad vill du boka?</h2>
        <p class="ev-hint">Priset gäller innan tandvårdsbidraget dras av. Välj en behandling så går du vidare.</p>
        <div class="ev-step__body ev-options">
          ${TREAT[st.patient].map(t => `<button type="button" class="ev-option" data-treat="${t.id}" aria-pressed="${st.treat === t.id}"><span class="ev-option__text"><b>${t.name}</b><small>${t.desc}. ${t.dur} minuter</small></span><span class="ev-option__price">${t.price.replace(' kr', '&nbsp;kr')}</span>${icon('arrow')}</button>`).join('')}
        </div>
        <p class="ev-step__more">Vill du boka något annat, till exempel en krona? <a href="kontakt.html">Skriv till oss</a> så hör vi av oss.</p>`;
      $$('[data-treat]', host).forEach(b => b.addEventListener('click', () => {
        if (st.treat !== b.dataset.treat) { st.time = null; if (st.date && !isOpenDay(st.date)) st.date = null; }
        st.treat = b.dataset.treat; next(2);
      }));
    }

    if (s === 3) {
      const today = new Date(); today.setHours(0, 0, 0, 0);
      if (!calMonth) calMonth = new Date((st.date || today).getFullYear(), (st.date || today).getMonth(), 1);
      const groups = st.date ? slots(st.date) : [];
      host.innerHTML = `
        ${backLink()}
        <h2>När passar det?</h2>
        <p class="ev-hint">${T.name}, ${T.dur} minuter. Välj en dag och sedan en ledig tid, så går du vidare.</p>
        <div class="ev-step__body">
          ${calendarHtml(calMonth, st.date, { isOpen: isOpenDay, maxDays: 75 })}
          <div class="ev-times" data-times ${st.date ? '' : 'hidden'} aria-live="polite">
            ${st.date ? `<p class="ev-label" style="margin-bottom:12px">${fmtDate(st.date)}</p>` + groups.map((g, gi) => `
              <h3 id="tg-${gi}">${g.name}</h3>
              <div class="ev-timegrid" role="group" aria-labelledby="tg-${gi}">
                ${g.slots.map(x => `<button type="button" class="ev-time" data-time="${x.t}" aria-pressed="${st.time === x.t}"${x.full ? ' disabled' : ''}>${fmtTime(x.t)}${x.full ? '<span class="ev-sr">, bokad</span>' : ''}</button>`).join('')}
              </div>`).join('') : ''}
          </div>
        </div>`;
      $$('[data-month]', host).forEach(b => b.addEventListener('click', () => {
        if (b.getAttribute('aria-disabled') === 'true') return;
        calMonth = new Date(calMonth.getFullYear(), calMonth.getMonth() + Number(b.dataset.month), 1);
        render(); $(`[data-month="${b.dataset.month}"]`, dlg).focus();
      }));
      $$('[data-date]', host).forEach(b => b.addEventListener('click', () => {
        const [y, m, d] = b.dataset.date.split('-').map(Number);
        const nd = new Date(y, m - 1, d);
        if (!st.date || !sameDay(nd, st.date)) st.time = null;
        st.date = nd; render();
        const first = $('[data-time]:not(:disabled)', dlg);
        const times = $('[data-times]', dlg);
        if (first) { first.focus({ preventScroll: true }); times.scrollIntoView({ block: 'nearest', behavior: reduced() ? 'auto' : 'smooth' }); }
      }));
      $$('[data-time]', host).forEach(b => b.addEventListener('click', () => { st.time = Number(b.dataset.time); next(3); }));
    }

    if (s === 4) {
      const ny = st.patient === 'ny';
      host.innerHTML = `
        ${backLink()}
        <h2>Dina uppgifter</h2>
        <p class="ev-hint">${ny ? 'Vi skapar en journal åt dig och skickar bekräftelsen med sms.' : 'Vi hittar din journal med personnumret och skickar bekräftelsen med sms.'}</p>
        <div class="ev-step__body ev-form" data-form>
          <div class="ev-field"><label for="b-namn">Namn</label><input class="ev-input" id="b-namn" autocomplete="name" placeholder="Anna Svensson" required data-name="namn" data-error="Skriv ditt namn."></div>
          <div class="ev-field"><label for="b-pnr">Personnummer</label><input class="ev-input" id="b-pnr" inputmode="numeric" autocomplete="off" placeholder="19850412-1234" required data-type="pnr" data-name="personnummer" data-error="Skriv ditt personnummer med tolv siffror, till exempel 19850412-1234."></div>
          <div class="ev-form__row">
            <div class="ev-field"><label for="b-tel">Mobil</label><input class="ev-input" id="b-tel" type="tel" inputmode="tel" autocomplete="tel" placeholder="070-123 45 67" required data-name="mobil" data-error="Skriv ditt mobilnummer så att vi kan skicka bekräftelsen."></div>
            <div class="ev-field"><label for="b-epost">E-post <span class="ev-opt">(valfritt)</span></label><input class="ev-input" id="b-epost" type="email" autocomplete="email" placeholder="anna@exempel.se" data-name="e-post"></div>
          </div>
          <label class="ev-radiocard" style="align-items:center"><input type="checkbox" id="b-nerv"><span style="color:var(--ev-ink)"><b>Jag är nervös inför besöket</b>Vi bokar 75 minuter till samma pris och börjar med att prata.</span></label>
          <div class="ev-field"><label for="b-note">Något vi bör veta <span class="ev-opt">(valfritt)</span></label><textarea class="ev-input" id="b-note" rows="3" placeholder="Till exempel var det gör ont, eller att du behöver tolk"></textarea></div>
        </div>`;
      foot.innerHTML = `${arrowBtn('Fortsätt', 'type="button" data-continue aria-describedby="b-saknas"')}<p class="ev-form__missing" id="b-saknas"></p>`;
      const form = $('[data-form]', host);
      const F = { name: '#b-namn', pnr: '#b-pnr', phone: '#b-tel', email: '#b-epost', note: '#b-note' };
      Object.entries(F).forEach(([k, sel]) => { $(sel, host).value = st[k]; });
      $('#b-nerv', host).checked = st.nervous;
      const cont = $('[data-continue]', foot);
      const v = validator(form, { submit: cont, missingEl: $('#b-saknas', foot) });
      form.addEventListener('input', () => { Object.entries(F).forEach(([k, sel]) => { st[k] = $(sel, host).value.trim(); }); });
      form.addEventListener('change', () => { st.nervous = $('#b-nerv', host).checked; });
      cont.addEventListener('click', () => { if (v.attempt()) next(4); });
      form.addEventListener('keydown', e => { if (e.key === 'Enter' && e.target.tagName === 'INPUT' && e.target.type !== 'checkbox') { e.preventDefault(); cont.click(); } });
    }

    if (s === 5) {
      const dur = st.nervous && T.id.startsWith('us') ? 75 : T.dur;
      const row = (dt, dd, step, what) => `<div><dt>${dt}</dt><dd>${dd}</dd><button type="button" class="ev-link" data-edit="${step}">Ändra<span class="ev-sr"> ${what}</span></button></div>`;
      host.innerHTML = `
        ${backLink()}
        <h2>Stämmer det här?</h2>
        <p class="ev-hint">Titta igenom bokningen innan du bokar.</p>
        <div class="ev-step__body">
          <dl class="ev-review">
            ${row('Patient', st.patient === 'ny' ? 'Ny patient' : 'Har varit här förut', 1, 'patient')}
            ${row('Behandling', `${T.name} <span>· ${dur} minuter · ${T.price.replace(' kr', '&nbsp;kr')}</span>`, 2, 'behandling')}
            ${row('Tid', `${fmtDate(st.date)} kl. ${fmtTime(st.time)}`, 3, 'tid')}
            ${row('Uppgifter', `${esc(st.name)}<br><span>${esc(st.pnr)} · ${esc(st.phone)}${st.email ? ' · ' + esc(st.email) : ''}</span>`, 4, 'uppgifter')}
            ${st.nervous || st.note ? row('Att tänka på', `<span>${[st.nervous ? 'Nervös inför besöket' : '', esc(st.note)].filter(Boolean).join('. ')}</span>`, 4, 'önskemål') : ''}
          </dl>
          <p class="ev-policy">Avboka utan kostnad senast 24 timmar innan via länken i sms:et. Avbokar du senare tar vi ut 400&nbsp;kr.</p>
        </div>`;
      foot.innerHTML = arrowBtn('Boka tiden', 'type="button" data-confirm');
      $$('[data-edit]', host).forEach(b => b.addEventListener('click', () => { st.returnTo = 5; go(Number(b.dataset.edit)); }));
      $('[data-confirm]', foot).addEventListener('click', e => {
        const b = e.currentTarget;
        b.style.minWidth = b.offsetWidth + 'px';
        b.setAttribute('aria-disabled', 'true');
        b.querySelector('span').textContent = 'Bokar …';
        setTimeout(() => go(6), 600);
      });
    }

    if (s === 6) {
      host.innerHTML = `
        <div aria-live="polite">
          <svg class="ev-icon ev-icon--48 ev-draw" viewBox="0 0 24 24" aria-hidden="true" style="color:var(--ev-ok);margin-bottom:16px">${P.checkCircle}</svg>
          <h2>Tiden är bokad</h2>
          <p style="margin-top:12px">${T.name}, ${fmtDate(st.date).toLowerCase()} kl. ${fmtTime(st.time)}. Bekräftelsen skickas med sms till ${esc(st.phone)}.</p>
          <p class="ev-hint" style="margin-top:8px">Kom gärna fem minuter innan. Det här är ett designkoncept, så ingen bokning har skickats.</p>
        </div>`;
      foot.innerHTML = `<a class="ev-btn ev-btn--block" href="kontakt.html#hitta"><span>Se hur du hittar hit</span>${icon('arrow', 'ev-btn__arrow')}</a>`;
    }

    const back = $('[data-back]', host);
    if (back) back.addEventListener('click', () => { st.returnTo = null; go(s - 1); });
  }

  document.addEventListener('click', e => {
    const t = e.target.closest('[data-boka]');
    if (!t) return;
    e.preventDefault();
    const menu = $('.ev-menu[open]');
    if (menu) { menu.dataset.keepFocus = '1'; menu.close(); }
    open(menu ? menuBtn : t);
  });
  if (location.hash === '#boka') setTimeout(() => open(null), 50);
})();
