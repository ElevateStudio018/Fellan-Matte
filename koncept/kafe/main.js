/* Kardemumma: designkoncept av Elevate Studio. Påhittat företag med exempeldata. Ingenting skickas. */
(() => {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  /* ---------- Mobilmeny: <dialog> fångar fokus och stängs med Esc ---------- */
  const menu = $('#meny');
  const menuBtn = $('.ev-menubtn');
  if (menu && menuBtn) {
    menuBtn.addEventListener('click', () => { menu.showModal(); menuBtn.setAttribute('aria-expanded', 'true'); });
    menu.addEventListener('close', () => { menuBtn.setAttribute('aria-expanded', 'false'); menuBtn.focus(); });
    $$('[data-close]', menu).forEach(b => b.addEventListener('click', () => menu.close()));
    menu.addEventListener('click', e => { if (e.target === menu) menu.close(); });
    window.matchMedia('(min-width: 900px)').addEventListener('change', e => { if (e.matches && menu.open) menu.close(); });
  }

  /* ---------- Dragspel: en öppen i taget (ux-faq-flera-oppna), reserv för äldre webbläsare ---------- */
  $$('.ev-faq').forEach(faq => {
    faq.addEventListener('toggle', e => {
      if (!e.target.open) return;
      $$('details', faq).forEach(d => { if (d !== e.target) d.open = false; });
    }, true);
  });

  /* ---------- Följ med-list på desktop (ux-cta-folj-med) ---------- */
  const bar = $('[data-stickybar]');
  const anchor = $('[data-sticky-anchor]');
  if (bar && anchor && 'IntersectionObserver' in window) {
    const btn = $('a, button', bar);
    let pastHero = false, nearFooter = false;
    const update = () => {
      const show = pastHero && !nearFooter;
      bar.classList.toggle('is-shown', show);
      bar.setAttribute('aria-hidden', String(!show));
      btn.tabIndex = show ? 0 : -1;
      document.body.style.paddingBottom = show && window.innerWidth >= 900 ? '76px' : '';
    };
    new IntersectionObserver(([e]) => { pastHero = !e.isIntersecting && e.boundingClientRect.top < 0; update(); }).observe(anchor);
    const foot = $('.ev-footer');
    if (foot) new IntersectionObserver(([e]) => { nearFooter = e.isIntersecting; update(); }).observe(foot);
  }

  /* ---------- Öppet nu (pi-et-oppet: bara grön text) ---------- */
  const HOURS = { 0: [540, 900], 1: null, 2: [450, 1020], 3: [450, 1020], 4: [450, 1020], 5: [450, 1020], 6: [480, 960] };
  const DAYS = ['söndag', 'måndag', 'tisdag', 'onsdag', 'torsdag', 'fredag', 'lördag'];
  const hhmm = m => `${String(Math.floor(m / 60)).padStart(2, '0')}.${String(m % 60).padStart(2, '0')}`;
  const now = new Date();
  $$('[data-open-status]').forEach(el => {
    const m = now.getHours() * 60 + now.getMinutes();
    const t = HOURS[now.getDay()];
    if (t && m >= t[0] && m < t[1]) { el.className = 'kf-status ev-open'; el.textContent = `Öppet nu, till ${hhmm(t[1])}`; return; }
    let text;
    if (t && m < t[0]) text = `Stängt just nu. Öppnar ${hhmm(t[0])} i dag`;
    else for (let i = 1; i <= 7; i++) {
      const d = (now.getDay() + i) % 7;
      if (HOURS[d]) { text = `Stängt just nu. Öppnar ${i === 1 ? 'i morgon' : 'på ' + DAYS[d]} ${hhmm(HOURS[d][0])}`; break; }
    }
    el.className = 'kf-status ev-closed';
    el.textContent = text;
  });
  $$('[data-hours] li').forEach(li => { if (Number(li.dataset.day) === now.getDay()) li.setAttribute('aria-current', 'date'); });

  /* ---------- Sortiment: chips och Visa fler ---------- */
  const grid = $('[data-products]');
  if (grid) {
    const cards = $$('.ev-card', grid);
    const chips = $$('[data-filter]');
    const count = $('[data-count]');
    const moreWrap = $('[data-more-wrap]');
    const moreBtn = $('[data-more-btn]');
    let expanded = false, filter = 'alla';
    const render = () => {
      let shown = 0;
      cards.forEach(c => {
        const match = filter === 'alla' || c.dataset.cat.split(' ').includes(filter);
        const hide = !match || (filter === 'alla' && !expanded && c.hasAttribute('data-more'));
        c.hidden = hide;
        if (match) shown++;
      });
      count.textContent = `${shown} ${shown === 1 ? 'produkt' : 'produkter'}`;
      const visible = cards.filter(c => !c.hidden).length;
      moreWrap.hidden = visible >= shown;
      $('[data-more-count]').textContent = `Visar ${visible} av ${shown}`;
    };
    chips.forEach(ch => ch.addEventListener('click', () => {
      filter = ch.dataset.filter;
      chips.forEach(c => c.setAttribute('aria-pressed', String(c === ch)));
      render();
    }));
    moreBtn.addEventListener('click', () => {
      const firstNew = cards.find(c => c.hidden && c.hasAttribute('data-more'));
      expanded = true; render();
      if (firstNew) $('h3 a', firstNew).focus();
    });
    if (location.hash === '#brod') { const ch = chips.find(c => c.dataset.filter === 'brod'); if (ch) ch.click(); }
    render();
  }

  /* ---------- Validering: fel när man lämnar fältet (ux-fel-tidpunkt) ---------- */
  const rules = {
    email: v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v),
    tel: v => v.replace(/\D/g, '').length >= 8
  };
  function check(input) {
    const v = input.value.trim();
    let ok = true;
    if (input.required && !v) ok = false;
    else if (v && input.type === 'email') ok = rules.email(v);
    else if (v && input.dataset.type === 'tel') ok = rules.tel(v);
    return ok;
  }
  function show(input, ok) {
    const field = input.closest('.ev-field');
    if (!field) return;
    field.classList.toggle('is-error', !ok);
    if (ok) input.removeAttribute('aria-invalid'); else input.setAttribute('aria-invalid', 'true');
  }
  function wire(form, onChange) {
    $$('input, textarea', form).filter(i => i.closest('.ev-field') && (i.required || i.type === 'email' || i.dataset.type)).forEach(i => {
      i.addEventListener('input', () => { i.dataset.touched = '1'; if (i.closest('.is-error')) show(i, check(i)); if (onChange) onChange(); });
      i.addEventListener('blur', () => { if (i.dataset.touched || i.value) show(i, check(i)); });
    });
  }
  function validateAll(form) {
    const inputs = $$('input, textarea', form).filter(i => i.closest('.ev-field') && !i.closest('[hidden]') && (i.required || i.type === 'email' || i.dataset.type));
    let first = null;
    inputs.forEach(i => { const ok = check(i); show(i, ok); if (!ok && !first) first = i; });
    if (first) first.focus();   // vyn hoppar till första felet (ux-fel-forflyttning)
    return !first;
  }
  window.EV = { check, show, wire, validateAll };

  $$('form[data-validate]').forEach(form => {
    wire(form);
    form.addEventListener('submit', e => {
      e.preventDefault();
      if (!validateAll(form)) return;
      const sent = $('[data-sent]', form);
      const btn = $('button[type="submit"]', form);
      btn.innerHTML = '<span>Skickat</span><svg class="ev-icon" aria-hidden="true"><use href="img/ikoner.svg#bock"/></svg>';
      btn.setAttribute('aria-disabled', 'true');
      btn.classList.add('is-done');
      if (sent) { sent.hidden = false; }
    });
  });
})();
