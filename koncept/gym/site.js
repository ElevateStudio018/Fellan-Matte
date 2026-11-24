/* Pulsverket: passchema, filter, medlemskap och flödet Bli medlem. Påhittade exempeldata. */
(() => {
  'use strict';
  const { $, $$, pad, isoDate, parseDate, fmtDate, kr, DAYS } = window.EV;
  const P = {
    arrow: '<path d="M4 12h16M14 6l6 6-6 6"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4.5 20.5c0-4 3.4-7 7.5-7s7.5 3 7.5 7"/>',
    pin: '<path d="M12 21s-7-6.1-7-11.5a7 7 0 0 1 14 0C19 14.9 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    cal: '<rect x="3.5" y="5" width="17" height="15.5" rx="3"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',
    check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
    close: '<path d="M6 6l12 12M18 6L6 18"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    chevD: '<path d="M6 9l6 6 6-6"/>'
  };
  const ic = (n, c = '') => `<svg class="ev-icon ${c}" viewBox="0 0 24 24" aria-hidden="true">${P[n]}</svg>`;
  const fmt = m => `${pad(Math.floor(m / 60))}.${pad(m % 60)}`;
  const cap1 = s => s.charAt(0).toUpperCase() + s.slice(1);

  /* ---------- Exempelschema ---------- */
  const TYPES = {
    spin45: { name: 'Spinning 45', cat: 'Cykel', dur: 45, lvl: 3, room: 'Cykelsalen', cap: 24, desc: 'Intervaller på cykel till musik. Du styr själv motståndet, så passet fungerar oavsett form.' },
    spin60: { name: 'Spinning 60', cat: 'Cykel', dur: 60, lvl: 3, room: 'Cykelsalen', cap: 24, desc: 'Längre cykelpass med backar och spurter. Ta med vattenflaska och handduk.' },
    hiit: { name: 'HIIT 30', cat: 'Kondition', dur: 30, lvl: 3, room: 'Sal 1', cap: 20, desc: 'Korta, hårda intervaller med egen kroppsvikt. Trettio minuter, sedan är du klar.' },
    cirkel: { name: 'Cirkelträning', cat: 'Kondition', dur: 50, lvl: 2, room: 'Sal 1', cap: 24, desc: 'Tolv stationer med styrka och kondition. Instruktören visar alla övningar och lättare varianter.' },
    core: { name: 'Core 30', cat: 'Styrka', dur: 30, lvl: 2, room: 'Sal 2', cap: 20, desc: 'Mage, rygg och säte på mattan. Passar bra efter ett gympass.' },
    stang: { name: 'Skivstång', cat: 'Styrka', dur: 55, lvl: 2, room: 'Sal 1', cap: 22, desc: 'Styrketräning med lätt skivstång till musik. Du väljer vikterna själv.' },
    kettle: { name: 'Kettlebell', cat: 'Styrka', dur: 45, lvl: 3, room: 'Sal 2', cap: 16, desc: 'Svingar, lyft och bärövningar med kettlebell. Teknik först, tempo sedan.' },
    senior: { name: 'Seniorstyrka', cat: 'Styrka', dur: 45, lvl: 1, room: 'Sal 2', cap: 18, desc: 'Lugn styrketräning för balans och rörlighet. Öppet för alla, oftast deltagare över 60.' },
    yin: { name: 'Yinyoga', cat: 'Yoga och rörlighet', dur: 60, lvl: 1, room: 'Sal 2', cap: 20, desc: 'Långsam yoga där du stannar länge i varje position. Bra för höfter och rygg.' },
    vinyasa: { name: 'Vinyasayoga', cat: 'Yoga och rörlighet', dur: 60, lvl: 2, room: 'Sal 2', cap: 20, desc: 'Flytande yoga där rörelserna följer andningen. Du behöver ingen erfarenhet.' },
    rorlighet: { name: 'Rörlighet', cat: 'Yoga och rörlighet', dur: 30, lvl: 1, room: 'Sal 2', cap: 20, desc: 'Trettio minuter stretch och rörlighet med foamroller.' },
    dans: { name: 'Dansfitness', cat: 'Dans', dur: 50, lvl: 2, room: 'Sal 1', cap: 26, desc: 'Enkla danssteg till pop och latin. Det gör inget om du kommer fel, det gör alla.' }
  };
  const COACH = ['Elin Åberg', 'Jonas Lind', 'Margareta Holm', 'Sara Nyström', 'Ahmed Karimi', 'Lisa Berg'];
  const WEEKDAY = [
    ['06.15', 'spin45', 1], ['07.00', 'hiit', 4], ['09.00', 'senior', 2], ['11.30', 'core', 0], ['12.00', 'cirkel', 4],
    ['16.30', 'rorlighet', 5], ['17.15', 'spin60', 1], ['17.30', 'stang', 3], ['18.30', 'vinyasa', 5], ['19.00', 'dans', 3]
  ];
  const ALT = { 2: { 3: 'kettle', 7: 'cirkel', 9: 'yin' }, 3: { 1: 'core', 6: 'spin45', 8: 'yin' }, 4: { 4: 'hiit', 7: 'kettle', 9: 'spin45' }, 5: { 3: 'stang', 8: 'yin', 9: 'hiit' } };
  const WEEKEND = [['08.00', 'spin60', 1], ['09.00', 'cirkel', 4], ['09.15', 'yin', 5], ['10.00', 'stang', 3], ['10.30', 'dans', 0], ['11.00', 'rorlighet', 2], ['16.00', 'vinyasa', 5]];
  const hash = s => { let h = 7; for (const c of s) h = (h * 31 + c.charCodeAt(0)) % 9973; return h; };

  function classesFor(dateIso) {
    const d = parseDate(dateIso); const wd = d.getDay();
    const base = (wd === 0 || wd === 6) ? WEEKEND : WEEKDAY.map((r, i) => (ALT[wd] && ALT[wd][i]) ? [r[0], ALT[wd][i], (r[2] + wd) % 6] : r);
    return base.map(([t, key, c]) => {
      const T = TYPES[key];
      const [h, m] = t.split('.').map(Number);
      const start = h * 60 + m;
      const id = `${dateIso}-${t.replace('.', '')}`;
      const r = hash(id + key);
      const booked = Math.min(T.cap, Math.round(T.cap * (0.35 + (r % 70) / 100)));
      return { id, date: dateIso, key, ...T, start, end: start + T.dur, coach: COACH[c], left: T.cap - booked,
        tod: start < 9 * 60 ? 'Morgon' : start < 16 * 60 ? 'Dagtid' : 'Kväll', int: ['Lugn', 'Medel', 'Hög'][T.lvl - 1] };
    });
  }
  const today = new Date();
  const todayIso = isoDate(today);
  const nowMin = today.getHours() * 60 + today.getMinutes();
  const addDays = n => { const d = new Date(today); d.setDate(d.getDate() + n); return isoDate(d); };
  const dayLabel = (iso, short = false) => {
    if (iso === todayIso) return 'I dag';
    if (iso === addDays(1)) return 'I morgon';
    const d = parseDate(iso);
    return short ? `${cap1(DAYS[d.getDay()].slice(0, 3))} ${d.getDate()}` : fmtDate(iso);
  };
  const status = c => c.left === 0 ? '<span class="ev-tag ev-tag--neutral">Fullt, köplats finns</span>'
    : c.left <= 5 ? `<span class="ev-tag ev-tag--warn">${c.left} ${c.left === 1 ? 'plats' : 'platser'} kvar</span>`
    : `<span class="ev-tag ev-tag--ok">${c.left} platser kvar</span>`;
  const row = (c, asLink, showDay) => `
    <li class="ev-class${c.left === 0 ? ' is-full' : ''}">
      <div class="ev-class__time">${fmt(c.start)}<small>${ic('arrow')}<span class="ev-sr">till </span>${fmt(c.end)}</small></div>
      <div class="ev-class__main">
        <div class="ev-class__name">${asLink ? `<a href="schema.html?dag=${c.date}&amp;pass=${c.id}">${c.name}</a>` : `<button type="button" data-pass="${c.id}" aria-haspopup="dialog">${c.name}</button>`}${status(c)}</div>
        <div class="ev-meta">${showDay ? `<span>${ic('cal')}${dayLabel(c.date)}</span>` : ''}<span>${ic('user')}${c.coach}</span><span>${ic('pin')}${c.room}</span><span class="ev-desktop-only">Intensitet: ${c.int.toLowerCase()}</span></div>
      </div>
      <span class="ev-class__go" aria-hidden="true">${ic('arrow')}</span>
    </li>`;

  /* ---------- Startsidan: snart på schemat ---------- */
  const up = $('[data-upcoming]');
  if (up) {
    let list = classesFor(todayIso).filter(c => c.start > nowMin);
    const more = classesFor(addDays(1));
    list = list.concat(more).slice(0, 5);
    up.innerHTML = list.map(c => row(c, true, true)).join('');
  }
  const open = $('[data-open-now]');
  if (open) {
    const h = today.getHours();
    if (h >= 5 && h < 23) { open.textContent = 'Öppet nu'; $('[data-open-detail]').textContent = 'till 23.00'; }
    else { open.textContent = 'Stängt'; open.className = 'ev-closed'; open.style.fontWeight = '600'; $('[data-open-detail]').textContent = 'öppnar 05.00'; }
  }
  const feats = $('[data-features]');
  if (feats && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { feats.classList.add('is-floating'); io.disconnect(); } }, { threshold: .4 });
    io.observe(feats);
  }

  /* ---------- Schema-sidan ---------- */
  const sched = $('[data-schedule]');
  if (sched) {
    const GROUPS = [
      { key: 'cat', label: 'Passtyp', opts: ['Kondition', 'Styrka', 'Cykel', 'Yoga och rörlighet', 'Dans'] },
      { key: 'tod', label: 'Tid på dagen', opts: ['Morgon', 'Dagtid', 'Kväll'], hint: { Morgon: 'före 09', Dagtid: '09–16', Kväll: 'efter 16' } },
      { key: 'int', label: 'Intensitet', opts: ['Lugn', 'Medel', 'Hög'] }
    ];
    const params = new URLSearchParams(location.search);
    const days = Array.from({ length: 7 }, (_, i) => addDays(i));
    let day = days.includes(params.get('dag')) ? params.get('dag') : todayIso;
    let sort = 'tid';
    let applied = { cat: new Set(), tod: new Set(), int: new Set() };
    let pending = null;
    const clone = f => ({ cat: new Set(f.cat), tod: new Set(f.tod), int: new Set(f.int) });
    const dayClasses = () => classesFor(day).filter(c => day !== todayIso || c.start > nowMin - 5);
    const match = (c, f, skip) => GROUPS.every(g => g.key === skip || !f[g.key].size || f[g.key].has(c[g.key]));
    const countWith = (f) => dayClasses().filter(c => match(c, f)).length;
    const optCount = (f, g, o) => dayClasses().filter(c => c[g] === o && match(c, f, g)).length;
    const nActive = f => f.cat.size + f.tod.size + f.int.size;

    // Dagar som snabbval (ux-filter-snabbval, pi-chip-*)
    const dayBar = $('[data-days]');
    dayBar.innerHTML = days.map(d => `<li><button type="button" class="ev-chip" data-day="${d}" aria-pressed="${d === day}">${dayLabel(d, true)}</button></li>`).join('');
    dayBar.addEventListener('click', e => { const b = e.target.closest('[data-day]'); if (!b) return; day = b.dataset.day; $$('[data-day]', dayBar).forEach(x => x.setAttribute('aria-pressed', String(x === b))); renderList(); });

    // Rullgardiner på desktop (ux-filter-placering) och sorteringsmeny (ux-sort-*)
    const drops = $$('.ev-drop');
    const closeAll = (except) => drops.forEach(d => { if (d === except) return; const b = $('.ev-dropbtn', d), p = $('.ev-pop', d); if (!p.hidden) { p.hidden = true; b.setAttribute('aria-expanded', 'false'); } });
    const optsHtml = (g, f) => `<div class="ev-opts" role="group" aria-label="${g.label}">${g.opts.map(o => { const n = optCount(f, g.key, o); const on = f[g.key].has(o); const dis = !n && !on;
      return `<button type="button" class="ev-opt-box" data-g="${g.key}" data-o="${o}" aria-pressed="${on}"${dis ? ' aria-disabled="true"' : ''}><span>${o}${g.hint ? `<br><small>${g.hint[o]}</small>` : ''}</span><small>${n}</small></button>`; }).join('')}</div>`;
    const showLabel = f => { const n = countWith(f); return `Visa ${n} ${n === 1 ? 'pass' : 'pass'}`; };
    function renderPop(drop) {
      const g = GROUPS.find(x => x.key === drop.dataset.group);
      $('.ev-pop', drop).innerHTML = `<div class="ev-sheet__top" style="padding:0 0 12px"><b>${g.label}</b><button type="button" class="ev-link" data-clear="${g.key}">Rensa</button></div>${optsHtml(g, pending)}<div class="ev-pop__foot"><button type="button" class="ev-btn ev-btn--sm" data-apply><span>${showLabel(pending)}</span>${ic('arrow', 'ev-btn__arrow')}</button></div>`;
    }
    drops.forEach(drop => {
      const btn = $('.ev-dropbtn', drop), pop = $('.ev-pop', drop);
      btn.addEventListener('click', () => {
        const opening = pop.hidden;
        closeAll(drop);
        if (opening) {
          if (drop.dataset.group) { pending = clone(applied); renderPop(drop); }
          pop.hidden = false; btn.setAttribute('aria-expanded', 'true');
          const first = $('button:not([aria-disabled="true"])', pop); first && first.focus();
        } else { pop.hidden = true; btn.setAttribute('aria-expanded', 'false'); }
      });
      pop.addEventListener('click', e => {
        const o = e.target.closest('.ev-opt-box'), clr = e.target.closest('[data-clear]'), ap = e.target.closest('[data-apply]'), si = e.target.closest('[data-sort]');
        if (o && o.getAttribute('aria-disabled') !== 'true') { const s = pending[o.dataset.g]; s.has(o.dataset.o) ? s.delete(o.dataset.o) : s.add(o.dataset.o); const k = o.dataset.o; renderPop(drop); $(`.ev-opt-box[data-o="${k}"]`, pop).focus(); }
        if (clr) { pending[clr.dataset.clear].clear(); renderPop(drop); $('[data-clear]', pop).focus(); }
        if (ap) { applied = pending; pop.hidden = true; btn.setAttribute('aria-expanded', 'false'); btn.focus(); renderList(); }
        if (si) { sort = si.dataset.sort; $$('[data-sort]', pop).forEach(x => x.setAttribute('aria-checked', String(x === si))); $('[data-sort-label]').textContent = si.textContent.trim(); pop.hidden = true; btn.setAttribute('aria-expanded', 'false'); btn.focus(); renderList(); }
      });
      drop.addEventListener('keydown', e => { if (e.key === 'Escape' && !pop.hidden) { pop.hidden = true; btn.setAttribute('aria-expanded', 'false'); btn.focus(); } });
    });
    document.addEventListener('click', e => { if (!e.composedPath().some(n => n.classList && n.classList.contains('ev-drop'))) closeAll(); });

    // Bottenark på mobil med alla grupper hopfällda (ux-filter-mobil, ux-filter-grupper)
    const sheet = $('#filterark');
    const sheetBody = $('[data-sheet-groups]', sheet);
    const sheetApply = $('[data-sheet-apply]', sheet);
    const openGroups = new Set();
    function renderSheet() {
      sheetBody.innerHTML = GROUPS.map(g => `<div class="ev-group"><button type="button" aria-expanded="${openGroups.has(g.key)}" aria-controls="grp-${g.key}" data-grp="${g.key}"><span>${g.label}${pending[g.key].size ? `<small>${pending[g.key].size} valda</small>` : ''}</span>${ic('plus')}</button><div class="ev-group__panel" id="grp-${g.key}"${openGroups.has(g.key) ? '' : ' hidden'}>${optsHtml(g, pending)}</div></div>`).join('');
      $('span', sheetApply).textContent = showLabel(pending);
    }
    $('[data-open-sheet]').addEventListener('click', () => { pending = clone(applied); renderSheet(); sheet.showModal(); });
    sheet.addEventListener('click', e => {
      if (e.target === sheet) { sheet.close(); return; }
      const grp = e.target.closest('[data-grp]'), o = e.target.closest('.ev-opt-box');
      if (grp) { const k = grp.dataset.grp; openGroups.has(k) ? openGroups.delete(k) : openGroups.add(k); renderSheet(); $(`[data-grp="${k}"]`, sheet).focus(); }
      if (o && o.getAttribute('aria-disabled') !== 'true') { const s = pending[o.dataset.g]; s.has(o.dataset.o) ? s.delete(o.dataset.o) : s.add(o.dataset.o); const k = o.dataset.o; renderSheet(); $(`.ev-opt-box[data-o="${k}"]`, sheet).focus(); }
      if (e.target.closest('[data-clear-all]')) { pending = { cat: new Set(), tod: new Set(), int: new Set() }; renderSheet(); }
      if (e.target.closest('[data-sheet-close]')) sheet.close();
    });
    sheetApply.addEventListener('click', () => { applied = pending; sheet.close(); renderList(); });

    // Aktiva filter som chips med kryss (pi-chip-kryss)
    const active = $('[data-active]');
    active.addEventListener('click', e => {
      const b = e.target.closest('[data-remove]'); if (b) { applied[b.dataset.g].delete(b.dataset.remove); renderList(); const n = $('[data-remove]', active) || $('[data-open-sheet]'); n && n.focus(); }
      if (e.target.closest('[data-clear-applied]')) { applied = { cat: new Set(), tod: new Set(), int: new Set() }; renderList(); $('[data-days] [aria-pressed="true"]').focus(); }
    });

    const list = $('[data-list]'), empty = $('[data-empty]'), count = $('[data-count]'), title = $('[data-daytitle]');
    function renderList() {
      let items = dayClasses().filter(c => match(c, applied));
      if (sort === 'lediga') items = items.slice().sort((a, b) => b.left - a.left || a.start - b.start);
      title.textContent = day === todayIso ? `I dag, ${fmtDate(day).toLowerCase()}` : day === addDays(1) ? `I morgon, ${fmtDate(day).toLowerCase()}` : fmtDate(day);
      list.innerHTML = items.map(c => row(c, false, false)).join('');
      empty.hidden = items.length > 0;
      count.textContent = `${items.length} pass`;
      GROUPS.forEach(g => { const b = $(`.ev-drop[data-group="${g.key}"] .ev-dropbtn`); const n = applied[g.key].size; $('span', b).textContent = n ? `${g.label} (${n})` : g.label; b.classList.toggle('is-active', n > 0); });
      const n = nActive(applied);
      $('[data-open-sheet] span').textContent = n ? `Filter (${n})` : 'Filter';
      active.innerHTML = n ? GROUPS.flatMap(g => [...applied[g.key]].map(o => `<button type="button" class="ev-chip" data-g="${g.key}" data-remove="${o}">${o}${ic('close')}<span class="ev-sr">, ta bort filtret</span></button>`)).join('') + '<button type="button" class="ev-link" data-clear-applied>Rensa alla</button>' : '';
      const u = new URL(location.href); u.searchParams.set('dag', day); u.searchParams.delete('pass'); history.replaceState(null, '', u);
    }
    $('[data-empty-clear]').addEventListener('click', () => { applied = { cat: new Set(), tod: new Set(), int: new Set() }; renderList(); });

    // Passdetaljer i dialog / bottenark
    const dlg = $('#passdialog'), body = $('[data-pass-body]', dlg);
    let opener = null;
    function openPass(id) {
      const c = classesFor(id.slice(0, 10)).find(x => x.id === id); if (!c) return;
      body.innerHTML = `
        <h2 id="pass-rubrik">${c.name}</h2>
        <div class="ev-passinfo">
          <div class="ev-meta"><span>${ic('cal')}${fmtDate(c.date)}</span><span>${ic('clock')}${fmt(c.start)} ${ic('arrow')}<span class="ev-sr">till</span> ${fmt(c.end)}</span><span>${ic('pin')}${c.room}</span><span>${ic('user')}${c.coach}</span></div>
          <p>${c.desc}</p>
          <p>Intensitet: <b style="font-weight:600">${c.int.toLowerCase()}</b> <span class="ev-level" aria-hidden="true">${[1, 2, 3].map(i => `<i class="${i <= c.lvl ? 'is-on' : ''}"></i>`).join('')}</span></p>
          <p>${status(c)}</p>
        </div>
        <div class="ev-actions" style="margin-top:24px"><button type="button" class="ev-btn ev-btn--block" data-book><span>${c.left ? 'Boka passet' : 'Ställ dig i kö'}</span>${ic('arrow', 'ev-btn__arrow')}</button></div>
        <p class="ev-hint" style="margin-top:12px" data-book-note>Du avbokar senast två timmar innan. Inte medlem än? <a class="ev-inline" href="bli-medlem.html">Bli medlem</a> på tre minuter.</p>`;
      dlg.showModal();
      $('h2', dlg).tabIndex = -1; $('h2', dlg).focus();
    }
    sched.addEventListener('click', e => { const b = e.target.closest('[data-pass]'); if (b) { opener = b; openPass(b.dataset.pass); } });
    dlg.addEventListener('click', e => {
      if (e.target === dlg || e.target.closest('[data-dlg-close]')) { dlg.close(); return; }
      const b = e.target.closest('[data-book]');
      if (b && !b.classList.contains('is-saved')) {
        const queue = $('span', b).textContent.includes('kö');
        b.classList.add('is-saved'); b.innerHTML = `<span>${queue ? 'Du står i kö' : 'Bokat'}</span>${ic('check')}`;
        $('[data-book-note]', dlg).textContent = queue ? 'Vi meddelar dig i appen om en plats blir ledig. Designkoncept: ingen bokning skickades.' : 'Platsen är din. Avboka senast två timmar innan. Designkoncept: ingen bokning skickades.';
      }
    });
    dlg.addEventListener('close', () => { if (opener && document.contains(opener)) opener.focus(); });

    renderList();
    if (params.get('pass')) {
      const id = params.get('pass');
      const b = $(`[data-pass="${id}"]`); opener = b; openPass(id);
    }
  }

  /* ---------- Medlemskap: flikar på desktop och bindningsreglage (ux-pris-*) ---------- */
  const pkgs = $('[data-pkgs]');
  if (pkgs) {
    const tabs = $('[data-pkgtabs]');
    const items = $$('.ev-pkg', pkgs);
    const select = (i, focus) => {
      items.forEach((p, j) => p.classList.toggle('is-active', j === i));
      $$('[role="tab"]', tabs).forEach((t, j) => { t.setAttribute('aria-selected', String(j === i)); t.tabIndex = j === i ? 0 : -1; if (j === i && focus) t.focus(); });
    };
    tabs.innerHTML = items.map((p, i) => `<button type="button" class="ev-chip" role="tab" id="tab-${p.id}" aria-controls="${p.id}">${$('h2', p).textContent}</button>`).join('');
    const mq = matchMedia('(min-width: 900px)');
    const setMode = () => {
      const on = mq.matches;
      pkgs.classList.toggle('is-tabbed', on); tabs.classList.add('is-ready');
      items.forEach((p, i) => { if (on) { p.setAttribute('role', 'tabpanel'); p.setAttribute('aria-labelledby', `tab-${p.id}`); } else { p.removeAttribute('role'); p.removeAttribute('aria-labelledby'); } });
    };
    mq.addEventListener('change', setMode); setMode();
    const hashIdx = items.findIndex(p => `#${p.id}` === location.hash);
    select(hashIdx >= 0 ? hashIdx : items.findIndex(p => p.classList.contains('ev-pkg--rec')));
    tabs.addEventListener('click', e => { const t = e.target.closest('[role="tab"]'); if (t) select($$('[role="tab"]', tabs).indexOf(t)); });
    tabs.addEventListener('keydown', e => {
      const ts = $$('[role="tab"]', tabs); const i = ts.indexOf(document.activeElement);
      if (e.key === 'ArrowRight') { e.preventDefault(); select((i + 1) % ts.length, true); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); select((i - 1 + ts.length) % ts.length, true); }
    });
  }
  // Reglaget för 12 månaders bindning (ux-pris-period), används på medlemskapssidan och i flödet
  const sw = $('[data-bindning]');
  const applyBind = on => {
    $$('[data-m]').forEach(el => { el.textContent = kr(on ? el.dataset.y : el.dataset.m); });
    $$('[data-was]').forEach(el => { el.hidden = !on; });
    $$('[data-join]').forEach(a => { const u = new URL(a.href, location.href); on ? u.searchParams.set('bindning', '12') : u.searchParams.delete('bindning'); a.href = u.pathname.split('/').pop() + u.search; });
  };
  if (sw) {
    sw.addEventListener('click', () => { const on = sw.getAttribute('aria-checked') !== 'true'; sw.setAttribute('aria-checked', String(on)); applyBind(on); sw.dispatchEvent(new CustomEvent('bind', { bubbles: true, detail: on })); });
  }

  /* ---------- Flödet Bli medlem ---------- */
  const PLANS = { dagtid: { name: 'Dagtid', m: 279, y: 249 }, gym: { name: 'Gym', m: 349, y: 319 }, grupp: { name: 'Gym och grupp', m: 449, y: 399 } };
  const priceOf = s => s.medlemskap ? (s.bindning ? PLANS[s.medlemskap].y : PLANS[s.medlemskap].m) : 0;
  if ($('[data-flow]')) {
    const startInput = $('#start');
    startInput.min = todayIso; startInput.max = addDays(60); startInput.value = todayIso;   // förifyllt, går att ändra (ux-exempel-forifyllt)
    let api = null;
    api = window.EV.flow({
      rows: [
        { label: 'Medlemskap', step: 0, value: s => s.medlemskap ? `${PLANS[s.medlemskap].name}, ${s.bindning ? '12 månaders bindning' : 'ingen bindning'}` : '' },
        { label: 'Namn', step: 1, value: s => [s.fornamn, s.efternamn].filter(Boolean).join(' ') },
        { label: 'E-post', step: 1, value: s => s.epost || '' },
        { label: 'Mobilnummer', step: 1, value: s => s.mobil || '' },
        { label: 'Startdag', step: 2, value: s => s.start ? (s.start === todayIso ? `I dag, ${fmtDate(s.start).toLowerCase()}` : fmtDate(s.start)) : '' },
        { label: 'Introduktion', step: 2, value: s => s.intro === 'ja' ? 'Ja, en tränare hör av sig' : s.intro === 'nej' ? 'Nej' : '' }
      ],
      total: s => s.medlemskap ? `<span>Per månad</span><span class="ev-price">${kr(priceOf(s))}</span>` : '',
      onRender(s) {
        const p = $('[data-pay]'); if (p && s.medlemskap) p.innerHTML = `Du betalar <b style="font-weight:600">${kr(priceOf(s))} i månaden</b> med autogiro. Första dragningen sker på startdagen${s.bindning ? ', och bindningstiden är 12 månader' : ', och du säger upp med en månads varsel'}.`;
      },
      prefill(params, a) {
        const t = params.get('typ');
        if (params.get('bindning') === '12') { sw.setAttribute('aria-checked', 'true'); applyBind(true); a.set('bindning', true); }
        if (t && PLANS[t]) { a.set('medlemskap', t, PLANS[t].name); a.go(1, false); }
        a.render();
      },
      onDone(s, done) {
        $('[data-done-title]', done).textContent = `Välkommen som medlem, ${s.fornamn}`;
        $('[data-done-text]', done).textContent = `Ditt medlemskap ${PLANS[s.medlemskap].name} gäller från ${s.start === todayIso ? 'i dag' : fmtDate(s.start).toLowerCase()}. Medlemskoden kommer i appen och till ${s.epost} samma morgon.`;
      }
    });
    sw.addEventListener('bind', e => { api.set('bindning', e.detail); api.render(); });
    // Priser på valknapparna följer reglaget
    $$('.ev-choice').forEach(b => { b.dataset.label = PLANS[b.value].name; });
  }
})();
