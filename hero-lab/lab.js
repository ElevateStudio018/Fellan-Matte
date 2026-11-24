(() => {
  'use strict';

  const HEROES = [
    { file: '01-filmisk.html',        name: 'Filmisk',                    branch: 'Restaurang' },
    { file: '02-kinetisk.html',       name: 'Kinetisk typografi',         branch: 'Renovering' },
    { file: '03-jattetyp.html',       name: 'Jättetypografi med bild',    branch: 'Stugby' },
    { file: '04-parallax.html',       name: 'Parallax i lager',           branch: 'Hotell' },
    { file: '05-mask.html',           name: 'Delad skärm med mask',       branch: 'Tandvård' },
    { file: '06-marquee.html',        name: 'Marquee-band',               branch: 'Frisör' },
    { file: '07-bento.html',          name: 'Bento-rutnät',               branch: 'Bilverkstad' },
    { file: '08-morkt.html',          name: 'Mörk premium',               branch: 'Spa' },
    { file: '09-magasin.html',        name: 'Tidningsomslag',             branch: 'Mäklare' },
    { file: '10-produkt.html',        name: 'Svävande produkt',           branch: 'Skobutik' },
    { file: '11-mosaik.html',         name: 'Bildmosaik',                 branch: 'Möbler' },
    { file: '12-duotone.html',        name: 'Duotone',                    branch: 'Gym' },
    { file: '13-siffra.html',         name: 'Stor siffra',                branch: 'Elektriker' },
    { file: '14-stralkastare.html',   name: 'Strålkastare',               branch: 'Redovisning' },
    { file: '15-vagratt.html',        name: 'Vågrät rullning',            branch: 'Tågresor' },
    { file: '16-brutalist.html',      name: 'Brutalistisk',               branch: 'SaaS' },
    { file: '17-videokansla.html',    name: 'Video-känsla',               branch: 'Kafé' },
    { file: '18-dygnet.html',         name: 'Fri: dygnsrytm',             branch: 'Hudvård' }
  ];
  const KEY = 'elevate.heroLab.v1';
  const N = HEROES.length;

  const $ = (id) => document.getElementById(id);
  const frame = $('hero'), count = $('count'), nameEl = $('name');
  const like = $('like'), dislike = $('dislike'), comment = $('comment');
  const tally = $('tally'), toast = $('toast'), bar = document.querySelector('.bar');

  // ---- lagring (tål blockerad localStorage) ----
  let state = { current: 0, votes: {}, comments: {} };
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) state = Object.assign(state, JSON.parse(raw));
  } catch (e) { /* privat läge eller blockerat */ }
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {} };

  const pad = (n) => String(n).padStart(2, '0');
  const idOf = (i) => HEROES[i].file;

  // ---- kontrollradens höjd styr iframens höjd ----
  const setBar = () => document.documentElement.style.setProperty('--bar', bar.offsetHeight + 'px');
  new ResizeObserver(setBar).observe(bar);
  setBar();

  function render() {
    const i = state.current, h = HEROES[i], id = idOf(i);
    count.textContent = `${i + 1} / ${N}`;
    nameEl.textContent = `${pad(i + 1)} ${h.name} · ${h.branch}`;
    const v = state.votes[id];
    like.setAttribute('aria-pressed', String(v === 'like'));
    dislike.setAttribute('aria-pressed', String(v === 'dislike'));
    if (document.activeElement !== comment) comment.value = state.comments[id] || '';
    const rated = HEROES.filter((x) => state.votes[x.file]).length;
    tally.textContent = `${rated}/${N}`;
  }

  function go(i, push = true) {
    state.current = (i + N) % N;
    save();
    const h = HEROES[state.current];
    frame.title = `Hero ${state.current + 1}: ${h.name}, ${h.branch}`;
    frame.src = 'heroes/' + h.file;
    if (push) history.replaceState(null, '', '#' + (state.current + 1));
    comment.value = state.comments[idOf(state.current)] || '';
    render();
  }

  function vote(kind) {
    const id = idOf(state.current);
    state.votes[id] = state.votes[id] === kind ? undefined : kind;
    if (!state.votes[id]) delete state.votes[id];
    save(); render();
  }

  // ---- sammanfattning ----
  function summary() {
    const d = new Date().toLocaleDateString('sv-SE', { day: 'numeric', month: 'long', year: 'numeric' });
    const likes = HEROES.filter((h) => state.votes[h.file] === 'like').length;
    const nos = HEROES.filter((h) => state.votes[h.file] === 'dislike').length;
    const lines = [
      `Hero-labb, Elevate Studio: svar ${d}`,
      `Gillar ${likes} · Gillar inte ${nos} · Ej bedömda ${N - likes - nos}`,
      ''
    ];
    HEROES.forEach((h, i) => {
      const v = state.votes[h.file];
      const verdict = v === 'like' ? 'Gillar' : v === 'dislike' ? 'Gillar inte' : 'Ej bedömd';
      lines.push(`${pad(i + 1)} ${h.name} (${h.branch.toLowerCase()}): ${verdict}`);
      const c = (state.comments[h.file] || '').trim();
      if (c) lines.push(`    Kommentar: ${c}`);
    });
    return lines.join('\n');
  }

  let toastTimer;
  function say(msg) {
    toast.textContent = msg;
    toast.classList.add('is-on');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('is-on'), 2600);
  }

  function fallbackCopy(text) {
    const ta = $('fallbackText');
    ta.value = text;
    const dlg = $('fallback');
    if (dlg.showModal) dlg.showModal(); else dlg.setAttribute('open', '');
    ta.focus(); ta.select();
    try { if (document.execCommand('copy')) say('Svaren är kopierade'); } catch (e) {}
  }

  async function send() {
    const text = summary();
    try {
      if (!navigator.clipboard || !window.isSecureContext) throw new Error('no clipboard');
      await navigator.clipboard.writeText(text);
      say('Svaren är kopierade. Klistra in dem i ett mejl till oss.');
    } catch (e) {
      fallbackCopy(text);
    }
  }

  // ---- tangentbord (även när fokus ligger i heron) ----
  function onKey(e) {
    const t = e.target;
    if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
    if (e.altKey || e.ctrlKey || e.metaKey) return;
    if (e.key === 'ArrowRight') { e.preventDefault(); go(state.current + 1); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); go(state.current - 1); }
  }
  document.addEventListener('keydown', onKey);
  frame.addEventListener('load', () => {
    try { frame.contentWindow.document.addEventListener('keydown', onKey); } catch (e) {}
  });

  $('prev').addEventListener('click', () => go(state.current - 1));
  $('next').addEventListener('click', () => go(state.current + 1));
  like.addEventListener('click', () => vote('like'));
  dislike.addEventListener('click', () => vote('dislike'));
  $('send').addEventListener('click', send);
  comment.addEventListener('input', () => {
    const id = idOf(state.current), v = comment.value;
    if (v.trim()) state.comments[id] = v; else delete state.comments[id];
    save();
  });
  comment.addEventListener('keydown', (e) => { if (e.key === 'Enter') comment.blur(); });

  window.addEventListener('hashchange', () => {
    const n = parseInt(location.hash.slice(1), 10);
    if (n >= 1 && n <= N && n - 1 !== state.current) go(n - 1, false);
  });

  const fromHash = parseInt(location.hash.slice(1), 10);
  go(fromHash >= 1 && fromHash <= N ? fromHash - 1 : (state.current || 0) % N);
})();
