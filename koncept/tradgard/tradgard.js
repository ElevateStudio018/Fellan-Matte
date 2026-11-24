/* Hagby Trädgård: beställning av trädgårdsskötsel i en dialog (bottenark på mobil). Exempelpriser, ingenting skickas. */
(() => {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const ERR = '<svg class="ev-icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M9 9l6 6M15 9l-6 6"/></svg>';
  const OK = '<svg class="ev-icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M7.8 12.3l2.9 2.9 5.5-5.6"/></svg>';
  const kr = n => Math.round(n).toLocaleString('sv-SE').replace(/\s/g, ' ') + ' kr';
  const AREA = /^3[56]\d\s?\d{2}$/;
  const fmtPost = v => { const d = v.replace(/\D/g, ''); return d.length === 5 ? d.slice(0, 3) + ' ' + d.slice(3) : v.trim(); };

  const SIZES = { s: ['Under 500 m²', 1], m: ['500–1 000 m²', 1.35], l: ['1 000–2 000 m²', 1.8], xl: ['Över 2 000 m²', 2.4] };
  const PLANS = { gras: ['Gräs', 590], sasong: ['Säsong', 990], helar: ['Helår', 1390] };
  const ADDONS = { hack: ['Extra häckklippning', 190], frukt: ['Beskärning av fruktträd', 150], mossa: ['Gödsling och mossbehandling', 90], bort: ['Bortforsling av trädgårdsavfall', 120] };
  const monthly = (plan, size, addons = []) => Math.round(PLANS[plan][1] * SIZES[size][1] / 10) * 10 + addons.reduce((s, k) => s + ADDONS[k][1], 0);

  const dlg = $('#bestall');
  if (!dlg) return;
  const state = { size: null, plan: null, addons: [], post: '', contact: null };
  let opener = null;

  function setIntro() {
    const intro = $('[data-intro]', dlg);
    if (state.post && AREA.test(state.post)) {
      intro.classList.add('is-ok');
      intro.innerHTML = OK + `<span>Vi kommer till ${fmtPost(state.post)}. Det tar ungefär tre minuter att beställa.</span>`;
    } else {
      intro.classList.remove('is-ok');
      intro.innerHTML = '<svg class="ev-icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg><span>Tar ungefär tre minuter. Ingen bindningstid.</span>';
    }
  }

  function go(n, focus = true) {
    $$('[data-step]', dlg).forEach(s => { s.hidden = Number(s.dataset.step) !== n; });
    dlg.classList.toggle('is-final', n === 5);
    dlg.classList.toggle('is-done', n === 6);
    const ind = $('[data-indicator]', dlg);
    ind.hidden = n > 5;
    $('[data-count]', ind).textContent = `Steg ${Math.min(n, 5)} av 5`;
    $$('.ev-steps__list li', ind).forEach((li, i) => i === n - 1 ? li.setAttribute('aria-current', 'step') : li.removeAttribute('aria-current'));
    $$('.ev-steps__dots i', ind).forEach((d, i) => d.classList.toggle('is-on', i === n - 1));
    dlg.setAttribute('aria-labelledby', `st${n}-h`);
    render();
    const main = $('.ev-dialog__main', dlg);
    main.scrollTop = 0; $('.ev-dialog__grid', dlg).scrollTop = 0;
    if (focus) $(`#st${n}-h`).focus();
  }

  function render() {
    $$('[data-size]', dlg).forEach(b => b.setAttribute('aria-pressed', String(b.dataset.size === state.size)));
    $$('[data-plan-pick]', dlg).forEach(b => {
      b.setAttribute('aria-pressed', String(b.dataset.planPick === state.plan));
      if (state.size) $(`[data-plan-price="${b.dataset.planPick}"]`, b).textContent = kr(monthly(b.dataset.planPick, state.size)) + '/mån';
    });
    const total = state.size && state.plan ? kr(monthly(state.plan, state.size, state.addons)) : '';
    $$('[data-total]', dlg).forEach(t => { t.textContent = total; });
    const addonText = state.addons.length ? state.addons.map(k => ADDONS[k][0]).join(', ') : '';
    const sum = (k, v, e) => { const d = $(`[data-sum="${k}"]`, dlg); d.textContent = v || e; d.classList.toggle('is-empty', !v); };
    sum('size', state.size && SIZES[state.size][0], 'Inte valt än');
    sum('plan', state.plan && PLANS[state.plan][0], 'Inte valt än');
    sum('addons', addonText, 'Inga');
    $('[data-sum-total]', dlg).hidden = !total;
    if (state.size && state.plan) {
      $('[data-rv="size"]', dlg).textContent = SIZES[state.size][0];
      $('[data-rv="plan"]', dlg).textContent = PLANS[state.plan][0];
      $('[data-rv="addons"]', dlg).textContent = (addonText || 'Inga tillval') + '. Första besöket: ' + $('#t-start').value + '.';
    }
    if (state.contact) $('[data-rv="contact"]', dlg).textContent = state.contact;
  }

  function open(trigger) {
    opener = trigger || document.activeElement;
    const menu = $('.ev-menu[open]');
    if (menu) menu.close();
    if (trigger && trigger.dataset.plan) state.plan = trigger.dataset.plan;
    setIntro();
    dlg.showModal();
    go(1);
  }

  document.addEventListener('click', e => {
    const t = e.target.closest('[data-order]');
    if (t) { e.preventDefault(); open(t); }
  });
  $$('[data-close]', dlg).forEach(b => b.addEventListener('click', () => dlg.close()));
  dlg.addEventListener('click', e => { if (e.target === dlg) dlg.close(); });  // klick på bakgrunden
  dlg.addEventListener('close', () => {
    if (!$('[data-step="6"]', dlg).hidden) resetAll();
    if (opener && document.contains(opener)) opener.focus();
  });

  function resetAll() {
    Object.assign(state, { size: null, plan: null, addons: [], contact: null });
    $$('[data-addons] input', dlg).forEach(i => { i.checked = false; });
    $('[data-contact]', dlg).reset();
    if (state.post) $('#t-post').value = fmtPost(state.post);
  }

  $$('[data-size]', dlg).forEach(b => b.addEventListener('click', () => { state.size = b.dataset.size; go(2); }));
  $$('[data-plan-pick]', dlg).forEach(b => b.addEventListener('click', () => { state.plan = b.dataset.planPick; go(3); }));
  $$('[data-addons] input', dlg).forEach(c => c.addEventListener('change', () => { state.addons = $$('[data-addons] input:checked', dlg).map(i => i.value); render(); }));
  $('#t-start').addEventListener('change', render);
  dlg.addEventListener('click', e => {
    const b = e.target.closest('[data-go]');
    if (!b) return;
    const to = Number(b.dataset.go);
    if (to >= 2 && !state.size) return go(1);
    if (to >= 3 && !state.plan) return go(2);
    if (to >= 5 && !state.contact) return go(4);
    go(to);
  });
  evValidate($('[data-contact]', dlg), {
    onValid: d => {
      state.contact = `${String(d.get('namn')).trim()}, ${String(d.get('adress')).trim()}, ${fmtPost(String(d.get('postnummer')))}. ${String(d.get('telefon')).trim()}`;
      state.first = String(d.get('namn')).trim().split(/\s+/)[0];
      state.mail = String(d.get('epost')).trim();
      go(5);
    }
  });
  $('[data-confirm]', dlg).addEventListener('click', () => {
    $('[data-done-name]', dlg).textContent = state.first ? ', ' + state.first : '';
    $('[data-done-mail]', dlg).textContent = state.mail;
    go(6);
  });

  /* ---------- Heroformulär: postnummer kollas innan dialogen öppnas ---------- */
  const hero = $('[data-heroform]');
  if (hero) {
    const inp = $('input', hero);
    const err = msg => {
      let e = $('#hero-post-fel');
      if (!e) { e = document.createElement('p'); e.className = 'ev-error'; e.id = 'hero-post-fel'; inp.closest('.ev-field').after(e); inp.setAttribute('aria-describedby', e.id); }
      e.hidden = !msg; e.innerHTML = msg ? ERR + '<span>' + msg + '</span>' : '';
      msg ? inp.setAttribute('aria-invalid', 'true') : inp.removeAttribute('aria-invalid');
    };
    const check = () => {
      const v = inp.value.trim();
      if (!v) return '';
      if (!/^\d{3}\s?\d{2}$/.test(v)) return 'Skriv postnumret med fem siffror, till exempel 352 36.';
      if (!AREA.test(v)) return 'Dit kör vi tyvärr inte. Vi kör i postnummer som börjar på 35 och 36. Ring 010-000 00 00 så hjälper vi dig hitta någon.';
      return '';
    };
    inp.addEventListener('blur', () => err(check()));
    inp.addEventListener('input', () => { if (inp.getAttribute('aria-invalid')) err(check()); });
    hero.addEventListener('submit', e => {
      e.preventDefault();
      const m = check();
      if (m) { err(m); inp.focus(); return; }
      state.post = inp.value.trim();
      if (state.post) $('#t-post').value = fmtPost(state.post);
      open(hero.querySelector('button'));
    });
  }

  // Länk med #bestall öppnar dialogen direkt
  if (location.hash === '#bestall') open();
})();
