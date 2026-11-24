/* Elevate designquiz: motor.
   - manifest.js (byggs av build.py) listar delarna, deras filer och antal frågor.
   - En del laddas först när den öppnas: window.QZ.part({...}) från data-*.js.
   - Två val per fråga. Det första valet är huvudsvaret och väger tyngst. Det andra är ett andrahandsval.
   - Svaren sparas i webbläsaren (localStorage) och exporteras som text eller fil. */
(function () {
  const MAN = window.QZ_MANIFEST || { parts: [] };
  const LS = 'elevate-quiz-v1';
  const KEYS = '123456';
  const NONE = 'Spelar ingen roll';
  const NEITHER = 'Ingen av dem';
  const $ = s => document.querySelector(s);
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  // ---------- Delar ----------
  const parts = MAN.parts.map(m => ({ ...m, loaded: false, qs: [], groups: [] }));
  const byKey = k => parts.find(p => p.key === k);
  const pending = {};
  window.QZ = {
    part(def) {
      const p = byKey(def.key); if (!p) return;
      for (const g of def.groups || []) {
        p.groups.push(g);
        for (const q of g.questions) p.qs.push({ ...q, group: g.title });
      }
      if (def.fonts && def.fonts.length) loadFonts(def.fonts);
    },
  };
  const fontsLoaded = new Set();
  function loadFonts(list) {
    const fresh = list.filter(f => !fontsLoaded.has(f));
    if (!fresh.length) return;
    fresh.forEach(f => fontsLoaded.add(f));
    for (let i = 0; i < fresh.length; i += 12) {
      const l = document.createElement('link');
      l.rel = 'stylesheet';
      l.href = 'https://fonts.googleapis.com/css2?' + fresh.slice(i, i + 12).map(f => 'family=' + f.replace(/ /g, '+')).join('&') + '&display=swap';
      document.head.appendChild(l);
    }
  }
  function loadPart(p) {
    if (p.loaded) return Promise.resolve(p);
    if (pending[p.key]) return pending[p.key];
    pending[p.key] = p.files.reduce((chain, f) => chain.then(() => new Promise((res, rej) => {
      const s = document.createElement('script');
      s.src = f + '?v=' + (MAN.v || 1);
      s.onload = res; s.onerror = () => rej(new Error(f));
      document.body.appendChild(s);
    })), Promise.resolve()).then(() => { p.loaded = true; return p; });
    return pending[p.key];
  }

  // ---------- Tillstånd ----------
  // a[id] = { p: [i, j], l: [etikett1, etikett2], q, g, k } eller { x: NONE|NEITHER, q, g, k }
  let st = { a: {}, pos: {}, part: null, notes: {}, view: 'home' };
  try { Object.assign(st, JSON.parse(localStorage.getItem(LS) || '{}')); } catch {}
  st.a = st.a || {}; st.pos = st.pos || {}; st.notes = st.notes || {};
  const save = () => { try { localStorage.setItem(LS, JSON.stringify(st)); } catch {} };
  const answeredIn = k => Object.values(st.a).filter(v => v.k === k).length;
  const totalAnswered = () => Object.keys(st.a).length;
  const cur = () => byKey(st.part);

  // ---------- Rendering ----------
  function renderTop() {
    $('#total').textContent = `${totalAnswered()} av ${MAN.total || 0} besvarade`;
    $('#parts').innerHTML = parts.map(p => `<button type="button" data-p="${p.key}" aria-pressed="${st.view !== 'home' && p.key === st.part}">${esc(p.title)}<span>${answeredIn(p.key)}/${p.count}</span></button>`).join('');
    const p = cur();
    $('#bar').style.width = st.view === 'home' || !p ? (totalAnswered() / (MAN.total || 1) * 100) + '%' : (answeredIn(p.key) / (p.count || 1) * 100) + '%';
    $('#toggleView').hidden = st.view === 'home';
    $('#toggleView').textContent = st.view === 'overview' ? 'Tillbaka till frågorna' : 'Översikt';
  }

  function renderHome() {
    const first = parts.find(p => answeredIn(p.key) < p.count) || parts[0];
    $('#main').innerHTML = `<div class="intro">
      <h1>${MAN.total || 0} designfrågor</h1>
      <p>Svaren blir reglerna för Elevates UX-agent. Det finns inga rätt eller fel: välj det du själv tycker är bäst.</p>
      <ol>
        <li><b>Välj ett eller två alternativ.</b> Det du väljer först är ditt huvudsvar och väger överlägset tyngst. Det andra är ett andrahandsval.</li>
        <li><b>Klicka igen</b> för att ta bort ett val. Tar du bort förstahandsvalet blir andrahandsvalet ditt nya förstahandsval.</li>
        <li><b>Spelar ingen roll</b> eller <b>Ingen av dem</b> går också bra. Du kan hoppa över frågor.</li>
        <li><b>Tangentbord:</b> 1–6 väljer, 0 spelar ingen roll, N ingen av dem, Enter eller → nästa, ← föregående.</li>
        <li>Svaren sparas i den här webbläsaren. Tryck på <b>Skicka svaren</b> när du vill skicka dem till Claude, gärna en del i taget.</li>
      </ol>
      <button type="button" class="btn primary" data-open="${first ? first.key : ''}">${totalAnswered() ? 'Fortsätt' : 'Börja'} med ${esc(first ? first.title : '')}</button>
      <div class="pgrid">${parts.map(p => { const n = answeredIn(p.key); return `<button type="button" class="pcard" data-open="${p.key}"><b>${esc(p.title)}</b><span>${esc(p.desc || '')}</span><span>${n} av ${p.count} besvarade</span><div class="pbar"><i style="width:${p.count ? n / p.count * 100 : 0}%"></i></div></button>`; }).join('')}</div>
    </div>`;
  }

  function rankOf(q, i) { const v = st.a[q.id]; if (!v || !v.p) return 0; const r = v.p.indexOf(i); return r < 0 ? 0 : r + 1; }

  function renderQuestion() {
    const p = cur();
    const pos = st.pos[p.key] || 0;
    if (pos >= p.qs.length) {
      $('#main').innerHTML = `<div class="done"><h2>${esc(p.title)} är klar</h2><p>Du har svarat på ${answeredIn(p.key)} av ${p.qs.length} frågor. Skicka gärna den här delen till Claude nu, så blir det inte för mycket på en gång.</p>
        <div class="after"><button type="button" class="btn" data-act="restart">Gå igenom igen</button><button type="button" class="btn" data-act="firstopen">Nästa obesvarade</button><button type="button" class="btn" data-act="export">Skicka svaren</button>${nextPart() ? `<button type="button" class="btn primary" data-act="nextpart">Fortsätt med ${esc(nextPart().title)}</button>` : ''}</div>
        <div class="note"><label for="note-${p.key}">Något mer om ${esc(p.title.toLowerCase())}? (valfritt)</label><textarea id="note-${p.key}" data-note="${p.key}" placeholder="Till exempel vad som saknades eller vad som är viktigast för dig.">${esc(st.notes[p.key] || '')}</textarea></div></div>`;
      return;
    }
    const q = p.qs[pos];
    const v = st.a[q.id];
    const opts = q.opts.map((o, i) => {
      const r = rankOf(q, i);
      return `<div role="button" tabindex="0" class="opt${o.h ? '' : ' textonly'}" data-i="${i}" data-rank="${r}" aria-pressed="${r > 0}" aria-label="${esc(KEYS[i] + ': ' + o.l)}">
        <div class="render">${o.h ? `<div class="spec">${o.h}</div>` : ''}</div>
        <div class="lab"><span class="key">${KEYS[i]}</span><span class="lt">${esc(o.l)}</span>${r ? `<span class="rank">${r === 1 ? '1:a hand' : '2:a hand'}</span>` : ''}</div></div>`;
    }).join('');
    $('#main').innerHTML = `<div class="qhead"><span>Fråga ${pos + 1} av ${p.qs.length}</span><span>${esc(p.title)} · ${esc(q.group)}</span></div>
      <h1 class="qtext">${esc(q.q)}</h1>
      <p class="how">Välj ett eller två. <b>Första valet väger tyngst.</b></p>
      <div class="opts${q.layout === 'stack' ? ' stack' : ''} n${q.opts.length}">${opts}</div>
      <div class="after">
        <button type="button" class="btn" data-act="prev"${pos === 0 ? ' disabled' : ''}>← Föregående</button>
        <button type="button" class="btn" data-act="none" aria-pressed="${!!(v && v.x === NONE)}">${NONE}</button>
        <button type="button" class="btn" data-act="neither" aria-pressed="${!!(v && v.x === NEITHER)}">${NEITHER}</button>
        <button type="button" class="btn primary" data-act="next">Nästa →</button>
        <span class="hint"><kbd>1</kbd>–<kbd>${q.opts.length}</kbd> välj · <kbd>0</kbd> spelar ingen roll · <kbd>N</kbd> ingen av dem · <kbd>Enter</kbd> nästa</span>
      </div>`;
  }

  function renderOverview() {
    const p = cur();
    const rows = p.qs.map((q, i) => {
      const v = st.a[q.id];
      const a = !v ? '' : v.x ? v.x : v.l.map((l, j) => (j ? '2: ' : '1: ') + l).join(' · ');
      return `<button type="button" class="orow" data-jump="${i}"><span class="n">${i + 1}</span><span>${esc(q.q)}</span><span class="a${a ? '' : ' none'}">${a ? esc(a) : 'Inte besvarad'}</span></button>`;
    }).join('');
    $('#main').innerHTML = `<div class="overview"><h2>${esc(p.title)} · ${answeredIn(p.key)}/${p.qs.length}</h2><div class="olist">${rows}</div></div>`;
  }

  function render() {
    renderTop();
    if (st.view === 'home' || !cur()) return renderHome();
    const p = cur();
    if (!p.loaded) {
      $('#main').innerHTML = '<p class="loading">Laddar frågorna…</p>';
      loadPart(p).then(render).catch(() => { $('#main').innerHTML = '<p class="loading">Den här delen gick inte att ladda. Ladda om sidan.</p>'; });
      return;
    }
    if (st.view === 'overview') renderOverview(); else renderQuestion();
  }

  function nextPart() { const i = parts.findIndex(p => p.key === st.part); return parts.slice(i + 1).find(p => answeredIn(p.key) < p.count) || parts[i + 1]; }
  function open(k) { st.part = k; st.view = 'quiz'; save(); render(); window.scrollTo({ top: 0 }); }

  // ---------- Val ----------
  function record(q, v) {
    const p = cur();
    if (v) st.a[q.id] = { ...v, q: q.q, g: q.group, k: p.key }; else delete st.a[q.id];
    save();
  }
  let advanceTimer = null;
  function choose(i) {
    const q = cur().qs[st.pos[st.part] || 0]; if (!q || !q.opts[i]) return;
    const v = st.a[q.id];
    let picks = v && v.p ? v.p.slice() : [];
    if (picks.includes(i)) picks = picks.filter(x => x !== i);
    else if (picks.length < 2) picks.push(i);
    else picks[1] = i;
    record(q, picks.length ? { p: picks, l: picks.map(x => q.opts[x].l) } : null);
    clearTimeout(advanceTimer);
    renderTop(); renderQuestion();
    const el = document.querySelector(`.opt[data-i="${i}"]`); if (el) el.focus({ preventScroll: true });
    if (picks.length === 2) advanceTimer = setTimeout(() => go(1), 450);
  }
  function mark(x) {
    const q = cur().qs[st.pos[st.part] || 0]; if (!q) return;
    const v = st.a[q.id];
    const on = !(v && v.x === x);
    record(q, on ? { x } : null);
    renderTop(); renderQuestion();
    if (on) { clearTimeout(advanceTimer); advanceTimer = setTimeout(() => go(1), 300); }
  }
  function go(d) {
    clearTimeout(advanceTimer);
    const p = cur();
    st.pos[p.key] = Math.max(0, Math.min(p.qs.length, (st.pos[p.key] || 0) + d));
    save(); render(); window.scrollTo({ top: 0 });
  }
  function firstOpen() {
    const p = cur(); const i = p.qs.findIndex(q => !st.a[q.id]);
    st.pos[p.key] = i < 0 ? p.qs.length : i; st.view = 'quiz'; save(); render(); window.scrollTo({ top: 0 });
  }

  // ---------- Händelser ----------
  $('#parts').addEventListener('click', e => { const b = e.target.closest('button[data-p]'); if (b) open(b.dataset.p); });
  $('#home').addEventListener('click', () => { st.view = 'home'; save(); render(); window.scrollTo({ top: 0 }); });
  $('#toggleView').addEventListener('click', () => { st.view = st.view === 'overview' ? 'quiz' : 'overview'; save(); render(); window.scrollTo({ top: 0 }); });
  $('#main').addEventListener('click', e => {
    const op = e.target.closest('[data-open]'); if (op && op.dataset.open) return open(op.dataset.open);
    const o = e.target.closest('.opt'); if (o) { if (e.target.closest('.render')) e.preventDefault(); return choose(+o.dataset.i); }
    const a = e.target.closest('[data-act]');
    if (a) {
      const act = a.dataset.act;
      if (act === 'prev') go(-1);
      else if (act === 'next') go(1);
      else if (act === 'none') mark(NONE);
      else if (act === 'neither') mark(NEITHER);
      else if (act === 'restart') { st.pos[st.part] = 0; go(0); }
      else if (act === 'firstopen') firstOpen();
      else if (act === 'nextpart') open(nextPart().key);
      else if (act === 'export') openExport();
      return;
    }
    const j = e.target.closest('[data-jump]');
    if (j) { st.pos[st.part] = +j.dataset.jump; st.view = 'quiz'; save(); render(); window.scrollTo({ top: 0 }); }
  });
  $('#main').addEventListener('change', e => {
    const t = e.target; if (!t.matches('textarea[data-note]')) return;
    const v = t.value.trim(); if (v) st.notes[t.dataset.note] = v; else delete st.notes[t.dataset.note];
    save();
  });
  document.addEventListener('keydown', e => {
    if ($('#exportDlg').open) return;
    if ((e.key === 'Enter' || e.key === ' ') && e.target.classList && e.target.classList.contains('opt')) { e.preventDefault(); e.target.click(); return; }
    if (st.view !== 'quiz' || !cur() || !cur().loaded) return;
    if (e.target.matches('textarea, input, select')) return;
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    const q = cur().qs[st.pos[st.part] || 0];
    if (e.key === 'ArrowRight') { go(1); e.preventDefault(); }
    else if (e.key === 'ArrowLeft') { go(-1); e.preventDefault(); }
    else if (e.key === 'Enter' && !(e.target.closest && e.target.closest('button, a, label'))) { go(1); e.preventDefault(); }
    else if (q && e.key === '0') mark(NONE);
    else if (q && (e.key === 'n' || e.key === 'N')) mark(NEITHER);
    else if (q && /^[1-6]$/.test(e.key)) choose(+e.key - 1);
  });

  // ---------- Export och import ----------
  function asText(onlyKey) {
    const head = 'ELEVATE DESIGNQUIZ – SVAR\nFormat: [del › grupp] fråga → 1: förstahandsval (väger överlägset tyngst) · 2: andrahandsval\n';
    const out = [];
    for (const p of parts) {
      if (onlyKey && p.key !== onlyKey) continue;
      const items = Object.entries(st.a).filter(([, v]) => v.k === p.key);
      if (!items.length && !st.notes[p.key]) continue;
      out.push(`\n## ${p.title} (${items.length}/${p.count})`);
      for (const [id, v] of items) {
        const a = v.x ? v.x : v.l.map((l, j) => `${j + 1}: ${l}`).join(' · ');
        out.push(`[${v.g}] ${v.q} → ${a}  {${id}}`);
      }
      if (st.notes[p.key]) out.push(`Anteckning: ${st.notes[p.key]}`);
    }
    return head + out.join('\n');
  }
  function toast(t) { const el = document.createElement('div'); el.className = 'toast'; el.setAttribute('role', 'status'); el.textContent = t; document.body.appendChild(el); setTimeout(() => el.remove(), 2400); }
  function copy(text) {
    const box = $('#exportDlg textarea');
    const fallback = () => { box.hidden = false; box.value = text; box.focus(); box.select(); toast('Markerat. Kopiera med Ctrl+C eller ⌘C.'); };
    try { navigator.clipboard.writeText(text).then(() => toast('Kopierat. Klistra in i chatten.'), fallback); } catch { fallback(); }
  }
  function openExport() {
    const p = cur();
    $('#exportInfo').textContent = `Du har svarat på ${totalAnswered()} av ${MAN.total || 0} frågor.` + (p && st.view !== 'home' ? ` I ${p.title}: ${answeredIn(p.key)} av ${p.count}.` : '');
    $('#exportDlg [data-x="copy-part"]').hidden = !(p && st.view !== 'home');
    $('#exportDlg textarea').hidden = true;
    $('#exportDlg').showModal();
  }
  $('#exportBtn').addEventListener('click', openExport);
  $('#exportDlg').addEventListener('click', e => {
    const b = e.target.closest('[data-x]'); if (!b) return;
    const x = b.dataset.x;
    if (x === 'copy-all') copy(asText());
    else if (x === 'copy-part') copy(asText(st.part));
    else if (x === 'download') {
      const blob = new Blob([JSON.stringify({ quiz: 'elevate-designquiz', v: 1, saved: new Date().toISOString(), a: st.a, notes: st.notes, text: asText() }, null, 1)], { type: 'application/json' });
      const u = URL.createObjectURL(blob); const l = document.createElement('a');
      l.href = u; l.download = `elevate-designquiz-svar-${new Date().toISOString().slice(0, 10)}.json`; document.body.appendChild(l); l.click(); l.remove();
      setTimeout(() => URL.revokeObjectURL(u), 1000);
    } else if (x === 'close') $('#exportDlg').close();
  });
  $('#exportDlg').addEventListener('change', e => {
    const inp = e.target.closest('input[type="file"]'); if (!inp || !inp.files[0]) return;
    inp.files[0].text().then(t => {
      const d = JSON.parse(t);
      if (d.quiz !== 'elevate-designquiz' || !d.a) throw new Error('fel fil');
      Object.assign(st.a, d.a); Object.assign(st.notes, d.notes || {}); save(); render();
      toast(`Inläst: ${Object.keys(d.a).length} svar`);
    }).catch(() => toast('Filen kunde inte läsas in')).finally(() => { inp.value = ''; });
  });

  render();
})();
