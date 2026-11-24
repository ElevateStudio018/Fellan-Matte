/* Kvist & Fog: lediga tider, projektfilter och projektdetaljer. Ingenting skickas. */
(() => {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const fmtDay = d => d.toLocaleDateString('sv-SE', { weekday: 'long', day: 'numeric', month: 'long' });
  const isWeekend = d => d.getDay() === 0 || d.getDay() === 6;

  /* ---------- Dag och lediga tider (ux-val-dag, ux-val-tid) ---------- */
  const day = $('#b-dag');
  if (day) {
    const pad = n => String(n).padStart(2, '0');
    const iso = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
    const t = new Date(); t.setDate(t.getDate() + 1);
    const max = new Date(); max.setDate(max.getDate() + 60);
    day.min = iso(t); day.max = iso(max);
    const hint = $('[data-slot-hint]');
    const slots = $$('input[name="tid"]');
    const update = () => {
      const v = day.value;
      const d = v ? new Date(v + 'T12:00') : null;
      const weekend = d && isWeekend(d);
      const seed = d ? d.getDate() * 7 + d.getMonth() : 0;
      slots.forEach((s, i) => {
        const full = !d || weekend || ((seed + i * 3) % 5 === 0);
        s.disabled = full;
        const label = s.closest('.sn-slot');
        label.classList.toggle('is-full', !!d && full);
        $('[data-full]', label).textContent = d && full ? ' (fullbokad)' : '';
        if (full && s.checked) s.checked = false;
      });
      if (!d) hint.textContent = 'Välj en dag först, så ser du lediga tider.';
      else if (weekend) hint.textContent = 'Vi gör hembesök måndag till fredag.';
      else hint.textContent = `${slots.filter(s => !s.disabled).length} lediga tider ${fmtDay(d)}.`;
      /* Ett val i kalendern räknas som att lämna fältet: helgdag visas som fel direkt */
      if (d) day.dispatchEvent(new Event('blur'));
    };
    day.addEventListener('change', update);
    day.addEventListener('input', update);
    document.addEventListener('ev:step', e => { if (e.detail.step === 'tid') update(); });
  }

  /* Bekräftelsen upprepar valen */
  document.addEventListener('ev:step', e => {
    if (e.detail.step !== 'klart') return;
    const s = e.detail.state;
    const when = s.dag ? `${fmtDay(new Date(s.dag + 'T12:00'))} klockan ${s.tid}` : '';
    const map = { when, adress: [s.adress, s.postnr].filter(Boolean).join(', '), epost: s.epost };
    $$('[data-echo]').forEach(el => { if (map[el.dataset.echo]) el.textContent = map[el.dataset.echo]; });
  });

  /* ---------- Projekt: snabbval, Visa fler och detaljer i bottenark ---------- */
  const grid = $('[data-pgrid]');
  if (!grid) return;
  const cards = $$('.sn-pcard', grid);
  const chips = $$('[data-filter]');
  const count = $('[data-count]');
  const showing = $('[data-showing]');
  const more = $('[data-more]');
  let filter = new URLSearchParams(location.search).get('kategori') || 'alla';
  if (!chips.some(c => c.dataset.filter === filter)) filter = 'alla';
  let limit = 8;
  const render = () => {
    const match = cards.filter(c => filter === 'alla' || c.dataset.cat === filter);
    cards.forEach(c => { c.hidden = true; });
    match.slice(0, limit).forEach(c => { c.hidden = false; });
    const n = match.length;
    count.textContent = n === 1 ? '1 projekt' : `${n} projekt`;
    const shown = Math.min(limit, n);
    showing.textContent = `Visar ${shown} av ${n}`;
    more.hidden = shown >= n;
    showing.hidden = shown >= n;
    chips.forEach(c => c.setAttribute('aria-pressed', String(c.dataset.filter === filter)));
  };
  chips.forEach(c => c.addEventListener('click', () => { filter = c.dataset.filter; limit = 8; render(); }));
  more.addEventListener('click', () => {
    const before = cards.filter(c => !c.hidden).length;
    limit += 8; render();
    const first = cards.filter(c => !c.hidden)[before];
    if (first) $('button', first).focus();
  });
  render();

  const dlg = $('#projekt');
  let opener = null;
  const keys = { cat: 'cat', title: 't', place: 'place', dur: 'dur', text: 'text' };
  grid.addEventListener('click', e => {
    const card = e.target.closest('.sn-pcard');
    if (!card) return;
    const p = window.SN_PROJECTS[Number(card.dataset.i)];
    $$('[data-p]', dlg).forEach(el => { el.textContent = p[keys[el.dataset.p]]; });
    opener = $('button', card);
    dlg.showModal();
  });
  $('[data-pclose]', dlg).addEventListener('click', () => dlg.close());
  dlg.addEventListener('click', e => { if (e.target === dlg) dlg.close(); });
  dlg.addEventListener('close', () => { if (opener && !$('#boka[open]')) opener.focus(); });
  $('[data-p-book]', dlg).addEventListener('click', () => {
    dlg.close();
    const b = $('a[data-flow-open]');
    if (b) b.click();
  });
})();
