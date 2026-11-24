/* Bryggans kök: designkoncept av Elevate Studio. Påhittad restaurang med exempeldata. */
(() => {
  'use strict';

  /* ---------- Ikoner (24-rutnät, linje, rundade ändar) ---------- */
  const P = {
    arrow: '<path d="M4 12h16M14 6l6 6-6 6"/>',
    back: '<path d="M20 12H4M10 6l-6 6 6 6"/>',
    close: '<path d="M6 6l12 12M18 6L6 18"/>',
    chevL: '<path d="M15 6l-6 6 6 6"/>',
    chevR: '<path d="M9 6l6 6-6 6"/>',
    chevD: '<path d="M6 9l6 6 6-6"/>',
    users: '<circle cx="9" cy="8.5" r="3.5"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><path d="M15.5 5.2a3.5 3.5 0 0 1 0 6.6M17.5 14.4c2 .8 3.5 2.9 3.5 5.6"/>',
    cal: '<rect x="3.5" y="5" width="17" height="15.5" rx="3"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    pin: '<path d="M12 21s-7-6.1-7-11.5a7 7 0 0 1 14 0C19 14.9 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
    check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
    checkCircle: '<circle cx="12" cy="12" r="9"/><path d="M7.8 12.3l2.9 2.9 5.5-5.6"/>',
    errorCircle: '<circle cx="12" cy="12" r="9"/><path d="M9 9l6 6M15 9l-6 6"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    phone: '<path d="M8.6 3.6 6.3 4.2A2.3 2.3 0 0 0 4.6 6.6c.5 7 5.8 12.3 12.8 12.8a2.3 2.3 0 0 0 2.4-1.7l.6-2.3a1.5 1.5 0 0 0-.8-1.7l-2.8-1.3a1.5 1.5 0 0 0-1.8.4l-1 1.3a11 11 0 0 1-4.3-4.3l1.3-1a1.5 1.5 0 0 0 .4-1.8L10.3 4.4a1.5 1.5 0 0 0-1.7-.8z"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>'
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

  /* ---------- Öppettider (exempel) ---------- */
  // Minuter efter midnatt. Index = getDay().
  const HOURS = {
    0: [[600, 900]],                 // söndag: brunch 10–15
    1: [[690, 840]],                 // måndag: lunch
    2: [[690, 840], [1020, 1380]],
    3: [[690, 840], [1020, 1380]],
    4: [[690, 840], [1020, 1380]],
    5: [[690, 840], [1020, 1380]],
    6: [[600, 840], [1020, 1380]]    // lördag: brunch och middag
  };
  function openStatus(now = new Date()) {
    const m = now.getHours() * 60 + now.getMinutes();
    const today = HOURS[now.getDay()];
    const cur = today.find(([a, b]) => m >= a && m < b);
    if (cur) return { open: true, text: `Öppet nu, till ${fmtTime(cur[1])}` };
    const next = today.find(([a]) => a > m);
    if (next) return { open: false, text: `Stängt just nu. Öppnar ${fmtTime(next[0])}` };
    for (let i = 1; i <= 7; i++) {
      const d = (now.getDay() + i) % 7;
      if (HOURS[d].length) return { open: false, text: `Stängt just nu. Öppnar ${i === 1 ? 'i morgon' : DAYS[d]} ${fmtTime(HOURS[d][0][0])}` };
    }
    return { open: false, text: 'Stängt' };
  }
  $$('[data-open-status]').forEach(el => {
    const s = openStatus();
    el.textContent = s.text;
    el.className = s.open ? 'ev-open' : 'ev-closed';
  });
  $$('.ev-hours tr[data-day]').forEach(tr => {
    if (Number(tr.dataset.day) === new Date().getDay()) {
      tr.classList.add('is-today');
      tr.querySelector('th').insertAdjacentHTML('beforeend', '<span class="ev-sr"> (i dag)</span>');
    }
  });

  /* ---------- Veckans lunch (exempel) ---------- */
  const LUNCH = {
    1: [['Fisk', 'Stekt sej med dillstuvad potatis och brynt smör', 'Sej från Fiskhamnen, potatis från Hönö.', 'G'],
        ['Kött', 'Kalops på högrev med inlagda rödbetor', 'Långkokt med kryddpeppar och lagerblad. Serveras med potatismos.', 'G'],
        ['Grönt', 'Pumpasoppa med rostade frön', 'Med surdegsbröd från vårt bageri och vispat smör.', 'V']],
    2: [['Fisk', 'Ugnsbakad torsk med räkor och pepparrot', 'Smörsås, handskalade räkor och kokt potatis.', 'G'],
        ['Kött', 'Wallenbergare med gröna ärtor', 'Kalvfärs, potatispuré, skirat smör och rårörda lingon.', ''],
        ['Grönt', 'Rödbetsbiff med getost och valnötter', 'Äppelsallad, pepparrotskräm och rostad potatis.', 'V G']],
    3: [['Fisk', 'Fiskgryta med musslor och saffran', 'Dagens fisk från västkusten, aioli och grillat bröd.', 'L'],
        ['Kött', 'Pannbiff med lök och gräddsås', 'Pressgurka, lingon och kokt potatis.', ''],
        ['Grönt', 'Svamprisotto med västerbottenost', 'Kantareller och trattkantareller från Bohuslän.', 'V G']],
    4: [['Fisk', 'Gravad lax med hovmästarsås', 'Dillpotatis och syltad gurka.', 'G'],
        ['Kött', 'Ärtsoppa med fläsk och pannkakor', 'Pannkakor med sylt och vispad grädde. Torsdag som det ska vara.', ''],
        ['Grönt', 'Ärtsoppa utan fläsk, med pannkakor', 'Samma soppa, kokad på grönsaksbuljong.', 'V']],
    5: [['Fisk', 'Friterad kolja med ärtpuré', 'Krispig ölsmet, remouladsås och citron.', 'L'],
        ['Kött', 'Högrevsburgare med cheddar', 'Picklad lök, rostad majonnäs och pommes.', ''],
        ['Grönt', 'Halloumiburgare med picklad lök', 'Rostad paprika, örtmajonnäs och pommes.', 'V']]
  };
  const MARK_TEXT = { G: 'glutenfri', L: 'laktosfri', V: 'vegetarisk' };
  const marksHtml = str => (str || '').split(' ').filter(Boolean)
    .map(k => `<span class="ev-mark" title="${cap(MARK_TEXT[k])}"><span aria-hidden="true">${k}</span><span class="ev-sr">${MARK_TEXT[k]}</span></span>`).join('');
  const dishHtml = ([kind, name, desc, marks], price) => `
    <li class="ev-dish" data-marks="${marks}">
      <span class="ev-dish__kind">${kind}</span>
      <span class="ev-dish__name">${name}</span>
      <span class="ev-dish__price ev-price">${price}</span>
      <span class="ev-dish__desc">${desc}</span>
      <span class="ev-dish__marks">${marksHtml(marks)}</span>
    </li>`;

  $$('.ev-dish__marks').forEach(el => {
    if (el.children.length) return;
    const m = el.textContent.trim();
    const row = el.closest('.ev-dish');
    if (row) row.dataset.marks = m;
    el.innerHTML = marksHtml(m);
  });

  /* ---------- Hero (ny): dagens lunch i den flytande rutan ---------- */
  const heroLunch = $('.rb-lunchcard');
  if (heroLunch) {
    const d = new Date().getDay();
    const set = (sel, html) => { const el = $(sel, heroLunch); if (el) el.innerHTML = html; };
    if (LUNCH[d]) {
      set('[data-hero-lunch-dish]', LUNCH[d][0][1]);
    } else {
      set('[data-hero-lunch-title]', 'Helgbrunch i dag');
      set('[data-hero-lunch-time]', d === 6 ? '10.00–14.00' : '10.00–15.00');
      set('[data-hero-lunch-dish]', 'Brunchbrickan med gravad lax och ägg från Tjörn');
      set('[data-hero-lunch-more]', 'Och två rätter till');
      set('[data-hero-lunch-price]', '245&nbsp;kr');
      const link = $('.ev-link', heroLunch);
      if (link) link.firstChild.textContent = 'Se brunchen';
    }
  }

  const lunchBox = $('[data-lunch]');
  if (lunchBox) {
    const now = new Date();
    const d = now.getDay();
    const title = $('[data-lunch-title]');
    const meta = $('[data-lunch-day]');
    if (LUNCH[d]) {
      lunchBox.innerHTML = LUNCH[d].map(x => dishHtml(x, '145&nbsp;kr')).join('');
      if (meta) meta.textContent = fmtDate(now);
    } else {
      if (title) title.textContent = 'Helgbrunch i dag';
      if (meta) meta.textContent = fmtDate(now);
      const note = $('[data-lunch-note]');
      if (note) note.textContent = d === 6 ? 'Brunch 10.00–14.00. Lunchen är tillbaka på måndag.' : 'Brunch 10.00–15.00. Lunchen är tillbaka i morgon.';
      lunchBox.innerHTML = [
        ['Brunch', 'Brunchbrickan', 'Surdegsbröd, ägg från Tjörn, gravad lax, ost, yoghurt med havtorn och en kardemummabulle.', ''],
        ['Brunch', 'Shakshuka med fetaost', 'Bakade ägg i tomat och paprika, grillat bröd.', 'V'],
        ['Brunch', 'Räksmörgås på surdeg', 'Handskalade räkor, ägg, majonnäs och dill.', 'L']
      ].map((x, i) => dishHtml(x, ['245&nbsp;kr', '165&nbsp;kr', '195&nbsp;kr'][i])).join('');
    }
  }
  const lunchWeek = $('[data-lunch-week]');
  if (lunchWeek) {
    lunchWeek.innerHTML = [1, 2, 3, 4, 5].map(d => `
      <section class="ev-menu-group" aria-labelledby="lunch-${d}">
        <h3 id="lunch-${d}">${cap(DAYS[d])}</h3>
        <ul class="ev-dishes">${LUNCH[d].map(x => dishHtml(x, '145&nbsp;kr')).join('')}</ul>
      </section>`).join('');
  }

  /* ---------- Mobilmeny (panel i helskärm) ---------- */
  const menuBtn = $('.ev-menubtn');
  if (menuBtn) {
    const links = $$('.ev-nav a').map(a => `<li><a href="${a.getAttribute('href')}"${a.hasAttribute('aria-current') ? ' aria-current="page"' : ''}${a.hasAttribute('data-boka') ? ' data-boka' : ''}>${a.textContent}${icon('arrow')}</a></li>`).join('');
    const dlg = document.createElement('dialog');
    dlg.className = 'ev-menu';
    dlg.setAttribute('aria-label', 'Meny');
    dlg.innerHTML = `
      <div class="ev-menu__top">
        <a class="ev-logo" href="index.html">Bryggans kök<b>.</b></a>
        <button class="ev-iconbtn" type="button" data-close aria-label="Stäng menyn">${icon('close')}</button>
      </div>
      <nav aria-label="Huvudmeny"><ul>${links}</ul></nav>
      <div class="ev-menu__foot">
        <p class="ev-iconline">${icon('phone', 'ev-icon--20')}<span><a href="tel:+4631123450" style="color:inherit">031-12 34 50</a>. Vi svarar 10–16.</span></p>
        <p class="ev-iconline">${icon('pin', 'ev-icon--20')}<span>Varvskajen 4, Eriksberg</span></p>
      </div>`;
    document.body.append(dlg);
    menuBtn.addEventListener('click', () => { dlg.showModal(); menuBtn.setAttribute('aria-expanded', 'true'); });
    dlg.addEventListener('close', () => { menuBtn.setAttribute('aria-expanded', 'false'); menuBtn.focus(); });
    dlg.addEventListener('click', e => {
      if (e.target.closest('[data-close]')) dlg.close();
      if (e.target.closest('[data-boka]')) dlg.close();
    });
  }

  /* ---------- Dragspel: en öppen i taget, första öppen ---------- */
  $$('.ev-faq').forEach(faq => {
    const btns = $$('.ev-faq__btn', faq);
    btns.forEach(btn => btn.addEventListener('click', () => {
      const open = btn.getAttribute('aria-expanded') === 'true';
      btns.forEach(b => { b.setAttribute('aria-expanded', 'false'); $('#' + b.getAttribute('aria-controls')).hidden = true; });
      if (!open) { btn.setAttribute('aria-expanded', 'true'); $('#' + btn.getAttribute('aria-controls')).hidden = false; }
    }));
  });

  /* ---------- Flikar (meny, paket) ---------- */
  function tabs(list, { onChange } = {}) {
    const tabsEls = $$('[role="tab"]', list);
    const select = (tab, focus) => {
      tabsEls.forEach(t => {
        const on = t === tab;
        t.setAttribute('aria-selected', on);
        t.tabIndex = on ? 0 : -1;
        const panel = document.getElementById(t.getAttribute('aria-controls'));
        if (panel) { panel.hidden = !on; panel.classList.toggle('is-active', on); }
      });
      if (focus) tab.focus();
      onChange && onChange(tab);
    };
    tabsEls.forEach((t, i) => {
      t.addEventListener('click', () => select(t));
      t.addEventListener('keydown', e => {
        let j = null;
        if (e.key === 'ArrowRight') j = (i + 1) % tabsEls.length;
        if (e.key === 'ArrowLeft') j = (i - 1 + tabsEls.length) % tabsEls.length;
        if (e.key === 'Home') j = 0;
        if (e.key === 'End') j = tabsEls.length - 1;
        if (j !== null) { e.preventDefault(); select(tabsEls[j], true); }
      });
    });
    return { select, tabs: tabsEls };
  }

  const filterChips = $$('[data-filter]');
  const menuTabs = $('[data-menu-tabs]');
  if (menuTabs) {
    const t = tabs(menuTabs, {
      onChange: tab => {
        const id = tab.getAttribute('aria-controls').replace('panel-', '');
        history.replaceState(null, '', '#' + id);
        applyFilter();
      }
    });
    const fromHash = location.hash.replace('#', '');
    const start = t.tabs.find(x => x.getAttribute('aria-controls') === 'panel-' + fromHash) || t.tabs[0];
    t.select(start);
    window.addEventListener('hashchange', () => {
      const h = location.hash.replace('#', '');
      const tab = t.tabs.find(x => x.getAttribute('aria-controls') === 'panel-' + h);
      if (tab) t.select(tab);
    });
  }

  /* Allergifilter: visa bara rätter som har alla valda märkningar */
  function applyFilter() {
    const active = filterChips.filter(c => c.getAttribute('aria-pressed') === 'true').map(c => c.dataset.filter);
    $$('.ev-menu-panel').forEach(panel => {
      let shown = 0, total = 0;
      $$('.ev-dish', panel).forEach(li => {
        if (li.hasAttribute('data-nofilter')) return;
        total++;
        const marks = (li.dataset.marks || '').split(' ');
        const ok = active.every(a => marks.includes(a));
        li.classList.toggle('is-hidden', !ok);
        if (ok) shown++;
      });
      $$('.ev-menu-group', panel).forEach(g => {
        const any = $$('.ev-dish', g).some(li => !li.classList.contains('is-hidden'));
        g.hidden = !any;
      });
      const empty = $('.ev-empty', panel);
      if (empty) empty.hidden = !(total && shown === 0);
    });
    const status = $('[data-filter-status]');
    if (status) {
      const panel = $('.ev-menu-panel:not([hidden])');
      const n = panel ? $$('.ev-dish:not(.is-hidden):not([data-nofilter])', panel).length : 0;
      status.textContent = active.length ? `Visar ${n} rätter som passar ditt filter.` : '';
    }
  }
  filterChips.forEach(c => c.addEventListener('click', () => {
    c.setAttribute('aria-pressed', c.getAttribute('aria-pressed') === 'true' ? 'false' : 'true');
    applyFilter();
  }));
  $$('[data-filter-clear]').forEach(b => b.addEventListener('click', () => {
    filterChips.forEach(c => c.setAttribute('aria-pressed', 'false'));
    applyFilter();
    filterChips[0] && filterChips[0].focus();
  }));

  const pkgTabs = $('[data-pkg-tabs]');
  if (pkgTabs) {
    const pkgs = $('.ev-pkgs');
    const mq = matchMedia('(min-width: 900px)');
    const t = tabs(pkgTabs);
    const sync = () => {
      pkgs.classList.toggle('is-tabbed', mq.matches);
      pkgTabs.classList.add('is-ready');
      if (mq.matches) {
        const cur = t.tabs.find(x => x.getAttribute('aria-selected') === 'true') || t.tabs[1];
        t.select(cur);
      } else {
        $$('.ev-pkg', pkgs).forEach(p => { p.hidden = false; });
      }
      $$('.ev-pkg', pkgs).forEach(p => {
        if (mq.matches) { p.setAttribute('role', 'tabpanel'); } else { p.removeAttribute('role'); }
      });
    };
    sync();
    mq.addEventListener('change', sync);
  }
  // Paketlänkar förväljer paketet i formuläret
  $$('[data-pick-pkg]').forEach(a => a.addEventListener('click', () => {
    const r = document.querySelector(`input[name="paket"][value="${a.dataset.pickPkg}"]`);
    if (r) { r.checked = true; r.dispatchEvent(new Event('change', { bubbles: true })); }
  }));

  /* ---------- Formulär: fel när man lämnar fältet (ux-fel-*) ---------- */
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
    if (el.type === 'number') {
      const n = Number(v);
      if (el.min && n < Number(el.min)) return `Ni behöver vara minst ${el.min} personer för ett privat sällskap.`;
      if (el.max && n > Number(el.max)) return `Vi tar emot högst ${el.max} gäster. Skriv ett lägre antal eller ring oss.`;
    }
    if (el.type === 'date' && el.min && v < el.min) return 'Välj ett datum från och med i dag.';
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
  function validator(root, { onValid, submit, missingEl } = {}) {
    const fields = () => $$('input, textarea, select', root).filter(f => f.type !== 'hidden' && f.type !== 'submit');
    const touched = new Set();
    const groupKey = f => f.type === 'radio' ? 'r:' + f.name : f;
    const uniq = () => { const seen = new Set(); return fields().filter(f => { const k = groupKey(f); if (seen.has(k)) return false; seen.add(k); return true; }); };
    const refresh = () => {
      const bad = uniq().filter(f => fieldError(f));
      if (submit) submit.setAttribute('aria-disabled', bad.length ? 'true' : 'false');
      if (missingEl) {
        const names = bad.map(f => f.dataset.name || (f.type === 'radio' ? f.closest('fieldset').dataset.name : 'fält'));
        missingEl.textContent = bad.length ? `Fyll i ${names.length > 1 ? names.slice(0, -1).join(', ') + ' och ' + names.at(-1) : names[0]} för att gå vidare.` : '';
        missingEl.hidden = !bad.length;
      }
      return bad;
    };
    root.addEventListener('focusout', e => {
      const f = e.target;
      if (!f.matches('input, textarea, select')) return;
      if (f.type === 'radio') {
        // Visa fel för gruppen först när fokus lämnar hela gruppen
        setTimeout(() => { if (!f.closest('fieldset').contains(document.activeElement)) { touched.add(groupKey(f)); showError(f, fieldError(f)); } }, 0);
        return;
      }
      if (f.value.trim() || touched.has(f)) { touched.add(f); showError(f, fieldError(f)); }
      else if (f.required) { touched.add(f); showError(f, fieldError(f)); }
    });
    root.addEventListener('input', e => {
      const f = e.target;
      if (touched.has(groupKey(f)) && f.getAttribute('aria-invalid') === 'true') showError(f, fieldError(f));
      refresh();
    });
    root.addEventListener('change', e => { const f = e.target; if (f.type === 'radio') showError(f, ''); refresh(); });
    const attempt = () => {
      const bad = refresh();
      if (bad.length) {
        bad.forEach(f => { touched.add(groupKey(f)); showError(f, fieldError(f)); });
        bad[0].focus();
        bad[0].scrollIntoView({ block: 'center', behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
        return false;
      }
      onValid && onValid();
      return true;
    };
    refresh();
    return { attempt, refresh };
  }

  $$('input[type="date"]').forEach(i => { i.min = isoDay(new Date()); });

  $$('form[data-validate]').forEach(form => {
    const submit = $('[type="submit"]', form);
    const v = validator(form, { submit, missingEl: $('.ev-form__missing', form) });
    form.addEventListener('submit', e => {
      e.preventDefault();
      if (!v.attempt()) return;
      submit.textContent = 'Skickar …';
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

  /* ---------- Bordsbokning ---------- */
  const STEPS = ['Gäster', 'Datum', 'Tid', 'Uppgifter', 'Bekräfta'];
  const state = { guests: null, date: null, time: null, name: '', phone: '', email: '', note: '', step: 1, returnTo: null };
  let dlg, opener, calMonth;

  function slotsFor(date) {
    const d = date.getDay();
    const groups = [];
    const range = (a, b) => { const r = []; for (let m = a; m <= b; m += 30) r.push(m); return r; };
    if (d >= 1 && d <= 5) groups.push({ name: 'Lunch', hint: '11.30–14.00', times: range(690, 810) });
    if (d === 6) groups.push({ name: 'Brunch', hint: '10.00–14.00', times: range(600, 780) });
    if (d === 0) groups.push({ name: 'Brunch', hint: '10.00–15.00', times: range(600, 840) });
    if (d >= 2 && d <= 6) groups.push({ name: 'Middag', hint: 'köket stänger 22.00', times: range(1020, 1290) });
    const now = new Date();
    const nowM = sameDay(date, now) ? now.getHours() * 60 + now.getMinutes() + 60 : -1;
    const seed = isoDay(date);
    groups.forEach(g => {
      g.slots = g.times.filter(t => t > nowM).map(t => {
        let h = 0;
        for (const c of seed + t + (state.guests > 4 ? 'x' : '')) h = (h * 31 + c.charCodeAt(0)) >>> 0;
        const busy = (d === 5 || d === 6) && t >= 1080 && t <= 1170;
        return { t, full: busy ? h % 5 !== 0 : h % 10 < 3 };
      });
    });
    return groups.filter(g => g.slots.length);
  }

  function buildDialog() {
    dlg = document.createElement('dialog');
    dlg.className = 'ev-dialog';
    dlg.setAttribute('aria-labelledby', 'boka-rubrik');
    dlg.innerHTML = `
      <div class="ev-dialog__grid">
        <div class="ev-dialog__main">
          <p id="boka-rubrik" class="ev-sr">Boka bord på Bryggans kök</p>
          <button class="ev-iconbtn ev-dialog__close" type="button" data-cancel aria-label="Avbryt bokningen">${icon('close')}</button>
          <div data-step-host></div>
          <div class="ev-dialog__foot">
            <div data-foot-action></div>
            <div class="ev-steps">
              <p class="ev-steps__count" aria-live="polite"></p>
              <ol class="ev-steps__list">${STEPS.map(s => `<li>${s}</li>`).join('')}</ol>
              <span class="ev-steps__dots" aria-hidden="true">${STEPS.map(() => '<i></i>').join('')}</span>
            </div>
          </div>
        </div>
        <aside class="ev-summary" aria-labelledby="boka-val">
          <h2 id="boka-val">Din bokning</h2>
          <dl>
            <div>${icon('users')}<span><dt>Gäster</dt><dd data-sum="guests"></dd></span></div>
            <div>${icon('cal')}<span><dt>Datum</dt><dd data-sum="date"></dd></span></div>
            <div>${icon('clock')}<span><dt>Tid</dt><dd data-sum="time"></dd></span></div>
          </dl>
          <p class="ev-summary__place">Bryggans kök, Varvskajen 4 i Eriksberg. Bordet är ditt i två timmar.</p>
        </aside>
      </div>`;
    document.body.append(dlg);
    dlg.addEventListener('click', e => {
      if (e.target.closest('[data-cancel]')) dlg.close();
      else if (e.target === dlg) dlg.close();   // klick på bakgrunden
    });
    dlg.addEventListener('close', () => {
      if (dlg.classList.contains('is-done')) reset();
      document.documentElement.style.overflow = '';
      if (location.hash === '#boka') history.replaceState(null, '', location.pathname + location.search);
      if (opener && document.contains(opener)) opener.focus();
    });
  }

  function reset() {
    Object.assign(state, { guests: null, date: null, time: null, name: '', phone: '', email: '', note: '', step: 1, returnTo: null });
    calMonth = null;
  }

  function openBooking(trigger) {
    if (!dlg) buildDialog();
    opener = trigger || document.activeElement;
    if (state.step === 6) reset();
    render();
    dlg.showModal();
    document.documentElement.style.overflow = 'hidden';
    focusHeading();
  }

  function focusHeading() {
    const h = $('[data-step-host] h2', dlg);
    if (h) { h.tabIndex = -1; h.focus(); }
  }

  function go(step) {
    state.step = step;
    render();
    focusHeading();
    const main = $('.ev-dialog__main', dlg);
    main.scrollTop = 0;
    $('.ev-dialog__grid', dlg).scrollTop = 0;
  }
  function next(from) {
    if (state.returnTo && from !== 2) { const r = state.returnTo; state.returnTo = null; go(r); return; }
    if (state.returnTo && from === 2) { go(3); return; }   // nytt datum kräver ny tid
    go(from + 1);
  }

  const backLink = () => `<button class="ev-link ev-link--back ev-step__back" type="button" data-back>${icon('back', 'ev-link__arrow')}Tillbaka</button>`;
  const arrowBtn = (text, attrs = '') => `<button class="ev-btn ev-btn--block" ${attrs}><span>${text}</span>${icon('arrow', 'ev-btn__arrow')}</button>`;

  function render() {
    const host = $('[data-step-host]', dlg);
    const foot = $('[data-foot-action]', dlg);
    const s = state.step;
    dlg.classList.toggle('is-final', s === 5);
    dlg.classList.toggle('is-done', s === 6);
    foot.innerHTML = '';

    // Sammanfattning
    $('[data-sum="guests"]', dlg).textContent = state.guests ? `${state.guests} ${state.guests === 1 ? 'person' : 'personer'}` : 'Inte valt';
    $('[data-sum="date"]', dlg).textContent = state.date ? fmtDate(state.date) : 'Inte valt';
    $('[data-sum="time"]', dlg).textContent = state.time != null ? `kl. ${fmtTime(state.time)}` : 'Inte valt';
    $$('[data-sum]', dlg).forEach(dd => dd.classList.toggle('is-empty', dd.textContent === 'Inte valt'));

    // Stegindikator
    if (s <= 5) {
      $('.ev-steps__count', dlg).textContent = `Steg ${s} av ${STEPS.length}`;
      $$('.ev-steps__list li', dlg).forEach((li, i) => { if (i === s - 1) li.setAttribute('aria-current', 'step'); else li.removeAttribute('aria-current'); });
      $$('.ev-steps__dots i', dlg).forEach((d, i) => d.classList.toggle('is-on', i === s - 1));
    } else {
      $('.ev-steps__count', dlg).textContent = '';
    }

    if (s === 1) {
      host.innerHTML = `
        <section class="ev-step">
          <h2>Hur många är ni?</h2>
          <p class="ev-hint">Det tar ungefär en minut att boka. Välj antal så går du vidare.</p>
          <div class="ev-step__body">
            <div class="ev-choices" role="group" aria-label="Antal gäster">
              ${[1, 2, 3, 4, 5, 6, 7, 8].map(n => `<button type="button" class="ev-choice" data-guests="${n}" aria-pressed="${state.guests === n}"><span class="ev-sr">${n === 1 ? '1 person' : n + ' personer'}</span><span aria-hidden="true">${n}</span></button>`).join('')}
            </div>
            <p class="ev-step__more">Är ni fler än 8? <a href="sallskap.html">Boka som sällskap</a>, så ordnar vi ett långbord.</p>
          </div>
        </section>`;
      $$('[data-guests]', host).forEach(b => b.addEventListener('click', () => {
        state.guests = Number(b.dataset.guests);
        if (state.time != null && state.date) {
          const still = slotsFor(state.date).some(g => g.slots.some(x => x.t === state.time && !x.full));
          if (!still) state.time = null;
        }
        if (state.returnTo && state.time == null) { state.returnTo = null; go(3); return; }
        next(1);
      }));
    }

    if (s === 2) {
      const today = new Date(); today.setHours(0, 0, 0, 0);
      const last = new Date(today); last.setDate(last.getDate() + 60);
      if (!calMonth) calMonth = new Date((state.date || today).getFullYear(), (state.date || today).getMonth(), 1);
      const y = calMonth.getFullYear(), m = calMonth.getMonth();
      const first = new Date(y, m, 1);
      const offset = (first.getDay() + 6) % 7;
      const daysIn = new Date(y, m + 1, 0).getDate();
      let cells = '';
      for (let i = 0; i < offset; i++) cells += '<td></td>';
      for (let day = 1; day <= daysIn; day++) {
        const dt = new Date(y, m, day);
        const off = dt < today || dt > last;
        const noSlots = !off && !slotsFor(dt).some(g => g.slots.some(x => !x.full));
        const sel = state.date && sameDay(dt, state.date);
        const lbl = `${fmtDate(dt)}${noSlots ? ', fullbokat' : ''}${sameDay(dt, today) ? ', i dag' : ''}`;
        cells += `<td><button type="button" data-date="${isoDay(dt)}" aria-label="${lbl}" aria-pressed="${!!sel}" class="${sameDay(dt, today) ? 'is-today' : ''}"${off || noSlots ? ' disabled' : ''}>${day}</button></td>`;
        if ((offset + day) % 7 === 0 && day < daysIn) cells += '</tr><tr>';
      }
      const prevOk = new Date(y, m, 1) > new Date(today.getFullYear(), today.getMonth(), 1);
      const nextOk = new Date(y, m + 1, 1) <= last;
      host.innerHTML = `
        <section class="ev-step">
          ${backLink()}
          <h2>Vilken dag vill du komma?</h2>
          <p class="ev-hint">Du kan boka upp till två månader framåt. Välj en dag så går du vidare.</p>
          <div class="ev-step__body ev-cal">
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
          </div>
        </section>`;
      $$('[data-month]', host).forEach(b => b.addEventListener('click', () => {
        if (b.getAttribute('aria-disabled') === 'true') return;
        calMonth = new Date(y, m + Number(b.dataset.month), 1);
        render();
        $(`[data-month="${b.dataset.month}"]`, dlg).focus();
      }));
      $$('[data-date]', host).forEach(b => b.addEventListener('click', () => {
        const [yy, mm, dd] = b.dataset.date.split('-').map(Number);
        const nd = new Date(yy, mm - 1, dd);
        if (!state.date || !sameDay(nd, state.date)) state.time = null;
        state.date = nd;
        next(2);
      }));
    }

    if (s === 3) {
      const groups = slotsFor(state.date);
      const anyFree = groups.some(g => g.slots.some(x => !x.full));
      host.innerHTML = `
        <section class="ev-step">
          ${backLink()}
          <h2>Vilken tid passar?</h2>
          <p class="ev-hint">${fmtDate(state.date)}, ${state.guests} ${state.guests === 1 ? 'person' : 'personer'}. Välj en ledig tid så går du vidare.</p>
          <div class="ev-step__body ev-times">
            ${anyFree ? groups.map(g => `
              <h3 id="tid-${g.name}">${g.name} <span>${g.hint}</span></h3>
              <div class="ev-timegrid" role="group" aria-labelledby="tid-${g.name}">
                ${g.slots.map(x => `<button type="button" class="ev-time" data-time="${x.t}" aria-pressed="${state.time === x.t}"${x.full ? ' disabled' : ''}>${fmtTime(x.t)}${x.full ? '<span class="ev-sr">, fullbokat</span>' : ''}</button>`).join('')}
              </div>`).join('') + `
              <div class="ev-times__legend" aria-hidden="true"><span><i></i>Ledig</span><span><i class="is-full"></i>Fullbokad</span></div>`
            : `<p>Alla bord är bokade den dagen. Välj en annan dag, eller ring oss på <a href="tel:+4631123450">031-12 34 50</a> så ser vi om något har blivit ledigt.</p>`}
            <p class="ev-step__more">Hittar du ingen tid? Vi sparar alltid några bord för gäster utan bokning.</p>
          </div>
        </section>`;
      $$('[data-time]', host).forEach(b => b.addEventListener('click', () => { state.time = Number(b.dataset.time); next(3); }));
    }

    if (s === 4) {
      host.innerHTML = `
        <section class="ev-step">
          ${backLink()}
          <h2>Vem bokar?</h2>
          <p class="ev-hint">Vi skickar bekräftelsen med sms och e-post.</p>
          <div class="ev-step__body ev-form" data-booking-form>
            <div class="ev-field"><label for="b-namn">Namn</label>
              <input class="ev-input" id="b-namn" name="namn" autocomplete="name" placeholder="Anna Svensson" required data-name="namn" data-error="Skriv ditt namn så vet vi vem bordet är till." value=""></div>
            <div class="ev-field"><label for="b-tel">Mobilnummer</label>
              <input class="ev-input" id="b-tel" name="tel" type="tel" inputmode="tel" autocomplete="tel" placeholder="070-123 45 67" required data-name="mobilnummer" data-error="Skriv ditt mobilnummer så att vi kan skicka bekräftelsen."></div>
            <div class="ev-field"><label for="b-epost">E-post</label>
              <input class="ev-input" id="b-epost" name="epost" type="email" autocomplete="email" placeholder="anna@exempel.se" required data-name="e-post" data-error="Skriv din e-postadress, till exempel anna@exempel.se."></div>
            <div class="ev-field"><label for="b-note">Önskemål <span class="ev-opt">(valfritt)</span></label>
              <textarea class="ev-input" id="b-note" name="note" rows="3" placeholder="Allergier, barnstol, födelsedag eller annat vi ska veta"></textarea></div>
          </div>
        </section>`;
      foot.innerHTML = `${arrowBtn('Fortsätt', 'type="button" data-continue aria-describedby="b-saknas"')}<p class="ev-form__missing" id="b-saknas"></p>`;
      const form = $('[data-booking-form]', host);
      $('#b-namn', host).value = state.name; $('#b-tel', host).value = state.phone; $('#b-epost', host).value = state.email; $('#b-note', host).value = state.note;
      const cont = $('[data-continue]', foot);
      const v = validator(form, { submit: cont, missingEl: $('#b-saknas', foot) });
      form.addEventListener('input', () => {
        state.name = $('#b-namn', host).value.trim(); state.phone = $('#b-tel', host).value.trim();
        state.email = $('#b-epost', host).value.trim(); state.note = $('#b-note', host).value.trim();
      });
      cont.addEventListener('click', () => { if (v.attempt()) next(4); });
      form.addEventListener('keydown', e => { if (e.key === 'Enter' && e.target.tagName === 'INPUT') { e.preventDefault(); cont.click(); } });
    }

    if (s === 5) {
      const row = (dt, dd, step, what) => `<div><dt>${dt}</dt><dd>${dd}</dd><button type="button" class="ev-link" data-edit="${step}">Ändra<span class="ev-sr"> ${what}</span></button></div>`;
      host.innerHTML = `
        <section class="ev-step">
          ${backLink()}
          <h2>Stämmer det här?</h2>
          <p class="ev-hint">Titta igenom bokningen innan du skickar den.</p>
          <div class="ev-step__body">
            <dl class="ev-review">
              ${row('Gäster', `${state.guests} ${state.guests === 1 ? 'person' : 'personer'}`, 1, 'antal gäster')}
              ${row('Datum', fmtDate(state.date), 2, 'datum')}
              ${row('Tid', `kl. ${fmtTime(state.time)}, bordet är ditt i två timmar`, 3, 'tid')}
              ${row('Uppgifter', `${esc(state.name)}<br><span style="font-weight:400">${esc(state.phone)} · ${esc(state.email)}</span>`, 4, 'uppgifter')}
              ${state.note ? row('Önskemål', `<span style="font-weight:400">${esc(state.note)}</span>`, 4, 'önskemål') : ''}
            </dl>
            <p class="ev-policy">Du kan avboka eller ändra fram till kl. 12.00 samma dag via länken i sms:et. Det kostar ingenting.</p>
          </div>
        </section>`;
      foot.innerHTML = arrowBtn('Boka bordet', 'type="button" data-confirm');
      $$('[data-edit]', host).forEach(b => b.addEventListener('click', () => { state.returnTo = 5; go(Number(b.dataset.edit)); }));
      $('[data-confirm]', foot).addEventListener('click', e => {
        const b = e.currentTarget;
        b.setAttribute('aria-disabled', 'true');
        b.querySelector('span').textContent = 'Bokar …';
        setTimeout(() => go(6), 600);
      });
    }

    if (s === 6) {
      const isLunch = state.time < 900;
      host.innerHTML = `
        <section class="ev-step" aria-live="polite">
          <svg class="ev-icon ev-icon--48 ev-draw" viewBox="0 0 24 24" aria-hidden="true" style="color:var(--ev-ok);margin-bottom:16px">${P.checkCircle}</svg>
          <h2>Bordet är bokat</h2>
          <p class="ev-hint" style="color:var(--ev-ink);font-size:16px;margin-top:12px">Välkommen ${fmtDate(state.date).toLowerCase()} kl. ${fmtTime(state.time)}, ${state.guests} ${state.guests === 1 ? 'person' : 'personer'}. Bekräftelsen skickas till ${esc(state.email)} och ${esc(state.phone)}.</p>
          <p class="ev-hint" style="margin-top:8px">Det här är ett designkoncept. Ingen bokning skickas på riktigt.</p>
        </section>`;
      foot.innerHTML = `<a class="ev-btn ev-btn--block" href="meny.html#${isLunch ? 'lunch' : (state.date.getDay() % 6 === 0 && state.time < 900 ? 'brunch' : 'middag')}"><span>Se menyn</span>${icon('arrow', 'ev-btn__arrow')}</a>`;
    }

    const back = $('[data-back]', host);
    if (back) back.addEventListener('click', () => { state.returnTo = null; go(s - 1); });
  }

  function esc(s) { return String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])); }

  document.addEventListener('click', e => {
    const t = e.target.closest('[data-boka]');
    if (!t) return;
    e.preventDefault();
    const menu = $('.ev-menu[open]');
    if (menu) menu.close();
    openBooking(t.closest('.ev-menu') ? menuBtn : t);
  });
  if (location.hash === '#boka') setTimeout(() => openBooking(null), 50);

  /* ---------- Fast list på desktop (ux-cta-folj-med) ---------- */
  const bar = $('.ev-stickybar');
  const anchor = $('[data-sticky-anchor]');
  const footer = $('.ev-footer');
  if (bar && anchor && 'IntersectionObserver' in window) {
    let pastAnchor = false, atFooter = false;
    const upd = () => {
      const on = pastAnchor && !atFooter;
      bar.classList.toggle('is-on', on);
      bar.inert = !on;
    };
    new IntersectionObserver(([en]) => { pastAnchor = !en.isIntersecting && en.boundingClientRect.top < 0; upd(); }).observe(anchor);
    if (footer) new IntersectionObserver(([en]) => { atFooter = en.isIntersecting; upd(); }).observe(footer);
    upd();
  }
})();
