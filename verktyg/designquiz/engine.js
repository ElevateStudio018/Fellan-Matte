(function () {
  const PART_META = [
    { key: 'detaljer', title: 'Detaljer' },
    { key: 'sektioner', title: 'Sektioner' },
    { key: 'generellt', title: 'Generellt' },
    { key: 'hero', title: 'Hero' },
  ];
  const NONE = 'Spelar ingen roll';
  const IMGS = window.QUIZ_IMGS || {};
  const fixImg = h => h.replace(/img\/([a-z0-9-]+\.jpg)/g, (m, f) => IMGS[f] || m);
  const LETTERS = 'ABCD';

  // ---------- Data ----------
  const parts = PART_META.map(m => ({ ...m, groups: [] }));
  for (const d of (window.QUIZ_DATA || [])) {
    const p = parts.find(x => x.key === d.part);
    if (p) p.groups.push(...d.groups);
  }
  const ORDER = { detaljer: ['typografi', 'knappar', 'pilar', 'ikoner', 'etiketter', 'priser', 'formular', 'navigering', 'bilder', 'ytor', 'status'] };
  for (const p of parts) {
    const o = ORDER[p.key];
    if (o) p.groups.sort((a, b) => (o.indexOf(a.key) + 1 || 99) - (o.indexOf(b.key) + 1 || 99));
    p.qs = p.groups.flatMap(g => g.questions.map(q => ({ ...q, group: g.title, part: p.key })));
  }
  const BY_ID = {};
  for (const p of parts) for (const q of p.qs) BY_ID[q.id] = q;

  // ---------- State ----------
  const answers = {}; // id -> [label, ...]
  const sel = id => { const v = answers[id]; return Array.isArray(v) ? v : (v ? [v] : []); };
  const body = (q, arr) => ({ svar: arr.join(' + '), val: arr, fraga: q.q, del: q.part, grupp: q.group });
  const notes = {};   // part -> text
  let partKey = 'detaljer';
  const pos = { detaljer: 0, sektioner: 0, generellt: 0, hero: 0 };
  let view = 'quiz';
  let col = null;
  const LS = 'designquiz-v1';
  function loadLocal() { try { const r = JSON.parse(localStorage.getItem(LS) || '{}'); Object.assign(answers, r.answers || {}); Object.assign(notes, r.notes || {}); if (r.partKey) partKey = r.partKey; Object.assign(pos, r.pos || {}); } catch {} }
  function saveLocal() { try { localStorage.setItem(LS, JSON.stringify({ answers, notes, partKey, pos })); } catch {} }
  const saveEl = document.getElementById('save');
  const setSave = t => { saveEl.textContent = t; };
  const chains = {};
  function persist(docId, body) {
    saveLocal();
    if (!col) return;
    chains[docId] = (chains[docId] || Promise.resolve()).then(() => {
      setSave('Sparar…');
      const ref = col.doc(docId);
      return body ? ref.set(body) : ref.delete();
    }).then(() => setSave('Sparat. Claude kan läsa dina svar.'))
      .catch(e => {
        if (e && e.code === 'invalid_argument') { col = null; setSave('Du kan inte spara här. Svaren finns bara i den här webbläsaren. Använd Kopiera svaren.'); }
        else setSave('Kunde inte spara just nu. Försök igen om en stund.');
      });
  }

  // ---------- Helpers ----------
  const $ = s => document.querySelector(s);
  function esc(s) { return String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])); }
  const part = () => parts.find(p => p.key === partKey);
  function answeredCount(p) { return p.qs.filter(q => sel(q.id).length).length; }

  function renderParts() {
    $('#parts').innerHTML = parts.map(p => `<button type="button" data-p="${p.key}" aria-pressed="${p.key === partKey}">${p.title}<span>${answeredCount(p)}/${p.qs.length}</span></button>`).join('');
    const p = part();
    $('#bar').style.width = p.qs.length ? (answeredCount(p) / p.qs.length * 100) + '%' : '0';
  }

  function renderQuestion() {
    const p = part();
    const main = $('#main');
    if (!p.qs.length) { main.innerHTML = `<div class="done"><h2>${p.title} laddas inte</h2><p>Den här delen saknar frågor.</p></div>`; return; }
    if (pos[partKey] >= p.qs.length) {
      main.innerHTML = `<div class="done"><h2>${p.title} är klar</h2><p>Du har svarat på ${answeredCount(p)} av ${p.qs.length} frågor. Du kan gå tillbaka och ändra, eller fortsätta med nästa del.</p>
        <div class="after" style="justify-content:center"><button type="button" class="btn" data-act="restart">Gå igenom igen</button><button type="button" class="btn" data-act="overview">Se översikt</button>${nextPart() ? `<button type="button" class="btn primary" data-act="nextpart">Fortsätt med ${nextPart().title}</button>` : ''}</div>
        <div class="note" style="margin:28px auto 0;text-align:left"><label for="note-${p.key}">Något mer om ${p.title.toLowerCase()}? (valfritt)</label><textarea id="note-${p.key}" data-note="${p.key}" placeholder="Skriv fritt, t.ex. vad som saknades eller vad som är viktigast.">${esc(notes[p.key] || '')}</textarea></div></div>`;
      return;
    }
    const q = p.qs[pos[partKey]];
    const n = pos[partKey] + 1;
    const cur = sel(q.id);
    const stack = q.layout === 'stack';
    const opts = q.opts.map((o, i) => `<div role="button" tabindex="0" class="qz-opt${o.h ? '' : ' qz-textonly'}" data-i="${i}" aria-pressed="${cur.includes(o.l)}">
        <div class="qz-render">${o.h ? `<div class="spec">${fixImg(o.h)}</div>` : ''}</div>
        <div class="qz-lab"><span class="qz-key">${LETTERS[i]}</span><span>${esc(o.l)}</span></div></div>`).join('');
    main.innerHTML = `<div class="qhead"><span>Fråga ${n} av ${p.qs.length}</span><span>${esc(q.group)}</span></div>
      <h1 class="qtext">${esc(q.q)}</h1>
      <p class="multi">Välj ett eller flera alternativ.</p>
      <div class="qz-opts${stack ? ' stack' : ''} n${q.opts.length}">${opts}</div>
      <div class="after">
        <button type="button" class="btn" data-act="prev"${n === 1 ? ' disabled' : ''}>← Föregående</button>
        <button type="button" class="btn" data-act="none" aria-pressed="${cur.includes(NONE)}">${NONE}</button>
        <button type="button" class="btn primary" data-act="skip">Nästa →</button>
        <span class="hint"><kbd>1</kbd>–<kbd>${q.opts.length}</kbd> välj en eller flera · <kbd>0</kbd> spelar ingen roll · <kbd>Enter</kbd> nästa</span>
      </div>`;
  }

  function renderOverview() {
    let html = '<div class="overview">';
    for (const p of parts) {
      html += `<h2>${p.title} · ${answeredCount(p)}/${p.qs.length}</h2><div class="olist">`;
      p.qs.forEach((q, i) => {
        const a = sel(q.id).join(' + ');
        html += `<button type="button" class="orow" data-jump="${p.key}:${i}"><span class="n">${i + 1}</span><span>${esc(q.q)}</span><span class="a${a ? '' : ' none'}">${a ? esc(a) : 'Inte besvarad'}</span></button>`;
      });
      html += '</div>';
    }
    $('#main').innerHTML = html + '</div>';
  }

  function render() {
    renderParts();
    $('#toggleView').textContent = view === 'quiz' ? 'Översikt' : 'Tillbaka till quizet';
    if (view === 'quiz') renderQuestion(); else renderOverview();
  }

  function nextPart() { const i = parts.findIndex(p => p.key === partKey); return parts.slice(i + 1).find(p => p.qs.length); }

  function choose(label) {
    const p = part(); const q = p.qs[pos[partKey]]; if (!q) return;
    let arr = sel(q.id).slice();
    if (label === NONE) arr = arr.includes(NONE) ? [] : [NONE];
    else {
      arr = arr.filter(x => x !== NONE);
      arr = arr.includes(label) ? arr.filter(x => x !== label) : [...arr, label];
      const order = q.opts.map(o => o.l);
      arr.sort((a, b) => order.indexOf(a) - order.indexOf(b));
    }
    if (arr.length) answers[q.id] = arr; else delete answers[q.id];
    persist(q.id, arr.length ? body(q, arr) : null);
    renderParts();
    document.querySelectorAll('.qz-opt').forEach(b => b.setAttribute('aria-pressed', String(arr.includes(b.querySelector('.qz-lab span:last-child').textContent))));
    const nb = document.querySelector('[data-act="none"]'); if (nb) nb.setAttribute('aria-pressed', String(arr.includes(NONE)));
  }
  function go(d) {
    const p = part();
    pos[partKey] = Math.max(0, Math.min(p.qs.length, pos[partKey] + d));
    saveLocal();
    render();
    window.scrollTo({ top: 0 });
  }

  // ---------- Events ----------
  $('#parts').addEventListener('click', e => {
    const b = e.target.closest('button[data-p]'); if (!b) return;
    partKey = b.dataset.p; view = 'quiz'; saveLocal(); render(); window.scrollTo({ top: 0 });
  });
  $('#toggleView').addEventListener('click', () => { view = view === 'quiz' ? 'overview' : 'quiz'; render(); window.scrollTo({ top: 0 }); });
  $('#main').addEventListener('click', e => {
    const o = e.target.closest('.qz-opt');
    if (o) { const q = part().qs[pos[partKey]]; return choose(q.opts[+o.dataset.i].l); }
    const a = e.target.closest('[data-act]');
    if (a) {
      const act = a.dataset.act;
      if (act === 'prev') go(-1);
      else if (act === 'skip') go(1);
      else if (act === 'none') choose(NONE);
      else if (act === 'restart') { pos[partKey] = 0; go(0); }
      else if (act === 'overview') { view = 'overview'; render(); }
      else if (act === 'nextpart') { partKey = nextPart().key; saveLocal(); render(); }
      return;
    }
    const j = e.target.closest('[data-jump]');
    if (j) { const [pk, i] = j.dataset.jump.split(':'); partKey = pk; pos[pk] = +i; view = 'quiz'; saveLocal(); render(); window.scrollTo({ top: 0 }); }
  });
  $('#main').addEventListener('change', e => {
    const t = e.target; if (!t.matches('textarea[data-note]')) return;
    const v = t.value.trim(); if ((notes[t.dataset.note] || '') === v) return;
    notes[t.dataset.note] = v;
    persist('anteckning-' + t.dataset.note, v ? { anteckning: v, del: t.dataset.note } : null);
  });
  document.addEventListener('keydown', e => {
    if ((e.key === 'Enter' || e.key === ' ') && e.target.classList && e.target.classList.contains('qz-opt')) { e.preventDefault(); e.target.click(); return; }
    if (view !== 'quiz' || e.target.matches('textarea, input')) return;
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    const q = part().qs[pos[partKey]];
    if (e.key === 'ArrowRight') { go(1); e.preventDefault(); }
    else if (e.key === 'ArrowLeft') { go(-1); e.preventDefault(); }
    else if (e.key === 'Enter' && !(e.target.closest && e.target.closest('button, a'))) { go(1); e.preventDefault(); }
    else if (q && e.key === '0') choose(NONE);
    else if (q && /^[1-4]$/.test(e.key) && q.opts[+e.key - 1]) choose(q.opts[+e.key - 1].l);
  });

  // ---------- Copy ----------
  function summary() {
    return parts.map(p => `## ${p.title} (${answeredCount(p)}/${p.qs.length})\n` +
      p.groups.map(g => `### ${g.title}\n` + g.questions.map(q => `- ${q.q} → ${sel(q.id).join(' + ') || '(inte besvarad)'}`).join('\n')).join('\n') +
      (notes[p.key] ? `\nAnteckning: ${notes[p.key]}` : '')).join('\n\n');
  }
  function toast(t) { const el = document.createElement('div'); el.className = 'toast'; el.setAttribute('role', 'status'); el.textContent = t; document.body.appendChild(el); setTimeout(() => el.remove(), 2200); }
  $('#copy').addEventListener('click', () => {
    const text = summary();
    const fallback = () => {
      let box = document.querySelector('.copybox');
      if (!box) { box = document.createElement('textarea'); box.className = 'copybox'; box.readOnly = true; document.querySelector('.save').appendChild(box); }
      box.value = text; box.focus(); box.select(); toast('Markerat. Kopiera med Ctrl+C eller ⌘C.');
    };
    try { navigator.clipboard.writeText(text).then(() => toast('Svaren är kopierade'), fallback); } catch { fallback(); }
  });

  // ---------- Boot ----------
  loadLocal();
  if (!parts.find(p => p.key === partKey)) partKey = 'detaljer';
  render();
  (async () => {
    let db = null;
    try { db = await window.claude?.use?.('db'); } catch { db = null; }
    if (!db) { setSave('Svaren sparas bara i den här webbläsaren. Använd Kopiera svaren och klistra in i chatten.'); return; }
    col = db.collection('quiz');
    let first = true;
    const timer = setTimeout(() => { if (first) setSave('Når inte lagringen ännu. Svaren sparas i webbläsaren så länge.'); }, 10000);
    col.onSnapshot(snap => {
      if (!snap.metadata || !snap.metadata.fromCache) clearTimeout(timer);
      const remote = {};
      for (const d of snap.docs) {
        const v = d.data() || {};
        if (BY_ID[d.id] && (Array.isArray(v.val) ? v.val.length : v.svar)) remote[d.id] = Array.isArray(v.val) ? v.val : [v.svar];
        if (d.id.startsWith('anteckning-') && v.anteckning) notes[d.id.slice(11)] = v.anteckning;
      }
      if (first) {
        first = false;
        for (const id of Object.keys(answers)) if (sel(id).length && !remote[id] && BY_ID[id]) persist(id, body(BY_ID[id], sel(id)));
      }
      for (const id of Object.keys(BY_ID)) { if (remote[id]) answers[id] = remote[id]; else if (!chains[id]) delete answers[id]; }
      saveLocal();
      if (!document.activeElement || !document.activeElement.matches('textarea')) render();
      setSave('Sparas automatiskt. Claude kan läsa dina svar.');
    }, () => { clearTimeout(timer); col = null; setSave('Lagringen svarar inte. Svaren sparas i den här webbläsaren. Använd Kopiera svaren.'); });
  })();
})();
