/* Elevate designquiz, del: Lägen och återkoppling (nyckel lagen, prefix la-).
   Frågorna byggs med små generatorer. Varje alternativ får en egen klass
   (la-<fråga>-<n>) och en egen <style> där & ersätts med den klassen och
   && med klassnamnet utan punkt (för keyframes). */
(function () {
  'use strict';

  /* ---------- Ikoner ---------- */
  const IP = {
    check: '<path d="M20 6 9 17l-5-5"/>',
    x: '<path d="M18 6 6 18M6 6l12 12"/>',
    info: '<circle cx="12" cy="12" r="9.5"/><path d="M12 16.5v-5M12 7.8h.01"/>',
    alert: '<circle cx="12" cy="12" r="9.5"/><path d="M12 7.5v5M12 16.3h.01"/>',
    tri: '<path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><path d="M12 9v4M12 17h.01"/>',
    xc: '<circle cx="12" cy="12" r="9.5"/><path d="m15 9-6 6M9 9l6 6"/>',
    checkc: '<circle cx="12" cy="12" r="9.5"/><path d="m8 12.2 2.8 2.8L16.2 9.5"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
    searchx: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5M8.8 8.8l4.4 4.4M13.2 8.8l-4.4 4.4"/>',
    copy: '<rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1"/>',
    trash: '<path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6M10 11v6M14 11v6"/>',
    cart: '<circle cx="9" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/><path d="M2 3h3l2.7 12.4a2 2 0 0 0 2 1.6h8.6a2 2 0 0 0 2-1.6L22 7H6"/>',
    heart: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8z"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    more: '<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>',
    edit: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>',
    inbox: '<path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.5 5.1 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.5-6.9A2 2 0 0 0 16.8 4H7.2a2 2 0 0 0-1.7 1.1z"/>',
    folder: '<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
    wifioff: '<path d="M2 2l20 20M8.5 16.4a5 5 0 0 1 7 0M5 12.9a10 10 0 0 1 5.2-2.8M19 12.9a10 10 0 0 0-2.2-1.6M2 8.8a15 15 0 0 1 4.2-2.7M22 8.8a15 15 0 0 0-11.3-3.7M12 20h.01"/>',
    cloudoff: '<path d="M2 2l20 20M5.8 5.8A7 7 0 0 0 7 19h11M21.4 15.9A4.5 4.5 0 0 0 17.5 10h-1.3A7 7 0 0 0 9.4 4.4"/>',
    file: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/>',
    home: '<path d="M3 11 12 4l9 7"/><path d="M5 10v10h14V10"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
    bell: '<path d="M6 8a6 6 0 1 1 12 0c0 7 3 8 3 8H3s3-1 3-8M10.3 20a2 2 0 0 0 3.4 0"/>',
    lock: '<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
    refresh: '<path d="M21 12a9 9 0 1 1-2.6-6.4L21 8"/><path d="M21 3v5h-5"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    minus: '<path d="M5 12h14"/>',
    chev: '<path d="m6 9 6 6 6-6"/>',
    chevr: '<path d="m9 6 6 6-6 6"/>',
    image: '<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="m21 16-5-5L5 20"/>',
    imageoff: '<path d="M2 2l20 20M10.4 4H19a2 2 0 0 1 2 2v8.6M21 18.4V18M3 6v12a2 2 0 0 0 2 2h12"/><path d="m3 16 5-5 3 3"/>',
    share: '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4"/>',
    download: '<path d="M12 3v12M7 10l5 5 5-5M4 21h16"/>',
    star: '<path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1 6.2L12 17.3 6.5 20.2l1-6.2L3 9.6l6.2-.9z"/>',
    cal: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
    cookie: '<path d="M21 12a9 9 0 1 1-9-9 3 3 0 0 0 3 3 3 3 0 0 0 3 3 3 3 0 0 0 3 3z"/><path d="M8.5 9.5h.01M15.5 15.5h.01M9.5 15h.01M12 12h.01"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 0 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 0 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 0 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 0 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
    eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
    filter: '<path d="M3 5h18M6 12h12M10 19h4"/>',
    undo: '<path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11"/>',
    pointer: '<path d="M4 3l7 17 2.5-7.5L21 10z"/>',
    hand: '<path d="M9 11V5a1.5 1.5 0 0 1 3 0v5M12 10V4a1.5 1.5 0 0 1 3 0v6M15 10V6a1.5 1.5 0 0 1 3 0v8a7 7 0 0 1-7 7h-.5a6 6 0 0 1-4.8-2.4L3.5 15a1.6 1.6 0 0 1 2.4-2.1L9 15V9.5a1.5 1.5 0 0 1 3 0"/>',
    grid: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>'
  };
  const ico = (n, s = 20, sw = 2, st = '') =>
    `<svg class="ico" style="width:${s}px;height:${s}px${st ? ';' + st : ''}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${IP[n]}</svg>`;
  const icoF = (n, s = 20, st = '') =>
    `<svg class="ico" style="width:${s}px;height:${s}px${st ? ';' + st : ''}" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1" stroke-linejoin="round" aria-hidden="true">${IP[n]}</svg>`;

  /* ---------- Gemensamma hjälpklasser (lx-) ---------- */
  const BASE = `
& .lx-pair{display:grid;gap:12px;grid-template-columns:repeat(auto-fit,minmax(var(--pw,96px),1fr))}
& .lx-cell{min-width:0;display:flex;flex-direction:column;gap:8px}
& .lx-cap{font-size:11px;font-weight:600;color:var(--smuted);letter-spacing:.05em;text-transform:uppercase;line-height:1.2}
& .lx-stage{display:flex;align-items:center;min-height:44px;min-width:0}
& .lx-card{background:var(--box);border:1px solid var(--sline);border-radius:var(--rc);padding:14px;display:flex;flex-direction:column;gap:4px;min-width:0;width:100%}
& .lx-ct{font-weight:700;font-size:15px;line-height:1.25}
& .lx-cs{font-size:13px;color:var(--smuted);line-height:1.35}
& .lx-menu{background:var(--box);border-radius:10px;box-shadow:0 8px 24px rgba(0,0,0,.10),0 0 0 1px var(--sline);padding:6px;display:flex;flex-direction:column;gap:2px;min-width:0;width:100%;max-width:220px}
& .lx-mi{display:flex;align-items:center;gap:10px;height:38px;padding:0 10px;border-radius:6px;font-size:14px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0}
& .lx-scr{position:relative;overflow:hidden;border-radius:10px;background:var(--box);border:1px solid var(--sline);width:100%;min-width:0}
& .lx-fake{padding:12px;display:flex;flex-direction:column;gap:8px}
& .lx-fake i{display:block;height:7px;border-radius:3px;background:#E3E5E7}
& .lx-fake i.lx-hb{height:12px;background:var(--accent);margin-bottom:4px}
& .lx-fake .lx-bl{display:flex;gap:8px}
& .lx-fake .lx-bl i{flex:1;height:40px;background:var(--tint);border-radius:6px}
& .lx-phone{width:100%;max-width:190px;margin:0 auto;border-radius:22px;border:6px solid #202326;overflow:hidden;position:relative;background:var(--box)}
& .lx-note{font-size:12px;color:var(--smuted);line-height:1.35}
& .lx-ib{display:inline-grid;place-items:center;width:40px;height:40px;border-radius:10px;color:var(--sink);flex:0 0 auto}
& .lx-btnsm{height:36px;padding:0 14px;font-size:14px}
`;
  const fake = (n = 3) => `<div class="lx-fake"><i class="lx-hb"></i><i style="width:62%"></i><i style="width:88%"></i>${n > 2 ? '<i style="width:74%"></i><div class="lx-bl"><i></i><i></i><i></i></div>' : ''}${n > 3 ? '<i style="width:80%"></i><i style="width:56%"></i>' : ''}</div>`;
  const scr = (inner, h = 170, st = '') => `<div class="lx-scr" style="height:${h}px${st ? ';' + st : ''}">${fake(4)}${inner}</div>`;
  const phone = (inner, h = 300) => `<div class="lx-phone" style="height:${h}px">${fake(4)}${inner}</div>`;
  const pair = (a, b, la = 'Vila', lb = 'Hover', pw) =>
    `<div class="lx-pair"${pw ? ` style="--pw:${pw}px"` : ''}><div class="lx-cell"><div class="lx-cap">${la}</div><div class="lx-stage">${a}</div></div><div class="lx-cell hv"><div class="lx-cap">${lb}</div><div class="lx-stage">${b === undefined ? a : b}</div></div></div>`;
  const cap = (t, inner) => `<div class="lx-cell"><div class="lx-cap">${t}</div><div class="lx-stage">${inner}</div></div>`;
  const card = (t = 'Rubrik', s = 'Kort text om innehållet.', extra = '') => `<div class="lx-card"><span class="lx-ct">${t}</span><span class="lx-cs">${s}</span>${extra}</div>`;

  /* Loop mellan två lägen: övergången tar d ms i en cykel på C ms. */
  const loop = (d, from, to, C = 2400, back) => {
    const a = 30, b = a + d / C * 100, c = 75, e = c + (back === undefined ? d : back) / C * 100;
    return `@keyframes &&k{0%,${a}%{${from}}${b.toFixed(2)}%,${c}%{${to}}${Math.min(e, 99.9).toFixed(2)}%,100%{${from}}}`;
  };

  /* ---------- Byggare ---------- */
  const groups = [];
  let G = null;
  const grp = (key, title) => { G = { key, title, questions: [] }; groups.push(G); };
  const RM = `@media (prefers-reduced-motion: reduce){&,& *,& *::before,& *::after{animation:none!important;transition:none!important}}`;
  function Q(id, q, opts, o = {}) {
    G.questions.push({
      id: 'la-' + id, q, layout: o.layout || 'grid',
      opts: opts.map((x, i) => {
        const cls = `la-${id}-${i}`;
        let css = BASE + (o.css || '') + (x[2] || '');
        if (/animation|transition/.test(css)) css += RM;
        css = css.replace(/&&/g, cls).replace(/&/g, '.' + cls);
        const pad = o.pad === false ? '' : ' pad';
        return { l: x[0], h: `<style>${css}</style><div class="${cls}${pad}"${o.st ? ` style="${o.st}"` : ''}>${x[1]}</div>` };
      })
    });
  }
  /* Samma html i alla alternativ, bara css skiljer. */
  const QC = (id, q, html, opts, o = {}) => Q(id, q, opts.map(x => [x[0], typeof html === 'function' ? html(x) : html, x[1]]), o);
  /* Etikett utan bild (principfrågor). */
  function QT(id, q, labels) {
    G.questions.push({ id: 'la-' + id, q, layout: 'grid', opts: labels.map(l => ({ l })) });
  }

  /* =====================================================================
     HOVER
     ===================================================================== */
  grp('hover', 'Hover');

  const para = `<p style="font-size:14px">Läs mer om <span class="link">villkoren</span> innan du bokar.</p>`;
  QC('hov-lank', 'Vad ska hända när man hovrar en länk i löptext?', pair(para, para, 'Vila', 'Hover', 200), [
    ['Understrykningen försvinner', '& .hv .link{text-decoration:none}'],
    ['Understrykningen blir tjockare', '& .hv .link{text-decoration-thickness:2.5px}'],
    ['Färgen mörknar', '& .hv .link{color:#0F1D2C}'],
    ['Tonad bakgrund bakom ordet', '& .hv .link{background:var(--tint);border-radius:3px;box-shadow:0 0 0 2px var(--tint)}'],
    ['Ingen förändring', '']
  ]);

  QC('hov-lank-vila', 'Ska länkar i löptext vara understrukna även i vila?', pair(para, para, 'Vila', 'Hover', 200), [
    ['Alltid understrukna', ''],
    ['Understrykning bara vid hover', '& .link{text-decoration:none}& .hv .link{text-decoration:underline}'],
    ['Aldrig understrykning, bara färg', '& .link{text-decoration:none}& .hv .link{color:#0F1D2C}']
  ]);

  const nav = `<div class="row" style="gap:18px;font-size:14px;font-weight:500;flex-wrap:nowrap"><span class="ni">Tjänster</span><span class="ni on">Om oss</span><span class="ni">Kontakt</span></div>`;
  QC('hov-meny', 'Hur ska ett menyval i headern reagera på hover?', pair(nav, nav, 'Vila', 'Hover på ”Om oss”', 220), [
    ['Byter färg', '& .hv .on{color:var(--brand)}& .ni{color:var(--smuted)}'],
    ['Linje under', '& .ni{position:relative;padding:4px 0}& .hv .on{box-shadow:inset 0 -2px 0 var(--sink)}'],
    ['Tonad platta bakom', '& .ni{padding:6px 10px;border-radius:8px;margin:0 -10px}& .hv .on{background:var(--tint)}'],
    ['Ingen förändring', '']
  ], { css: '& .lx-pair .row{gap:18px}' });

  const navA = `<div class="row" style="gap:18px;font-size:14px;font-weight:500;flex-wrap:nowrap"><span>Tjänster</span><span class="ul">Om oss</span><span>Kontakt</span></div>`;
  const ulBase = '& .ul{position:relative;padding:4px 0}& .ul::after{content:"";position:absolute;left:0;right:0;bottom:0;height:2px;background:var(--sink)}';
  QC('hov-meny-linje', 'Hur ska linjen under ett menyval dyka upp vid hover?', `<div class="lx-cap" style="margin-bottom:12px">Hover upprepas</div>${navA}`, [
    ['Visas direkt', ulBase + '& .ul::after{animation:&&k 2.4s infinite steps(1)}' + '@keyframes &&k{0%,30%{opacity:0}31%,75%{opacity:1}76%,100%{opacity:0}}'],
    ['Växer från vänster', ulBase + '& .ul::after{transform-origin:left;animation:&&k 2.4s infinite ease-out}' + loop(250, 'transform:scaleX(0)', 'transform:scaleX(1)')],
    ['Växer från mitten', ulBase + '& .ul::after{transform-origin:center;animation:&&k 2.4s infinite ease-out}' + loop(250, 'transform:scaleX(0)', 'transform:scaleX(1)')],
    ['Tonar in', ulBase + '& .ul::after{animation:&&k 2.4s infinite ease-out}' + loop(250, 'opacity:0', 'opacity:1')]
  ]);

  const dd = `<div class="lx-menu"><span class="lx-mi">Redigera</span><span class="lx-mi on">Duplicera</span><span class="lx-mi">Flytta</span><span class="lx-mi">Arkivera</span></div>`;
  QC('hov-dropdown', 'Hur ska ett val i en rullgardinsmeny se ut vid hover?', `<div class="lx-cap" style="margin-bottom:10px">”Duplicera” hovras</div>${dd}`, [
    ['Ljusgrå bakgrund', '& .on{background:#EFEFED}'],
    ['Tonad märkesfärg', '& .on{background:var(--tint);color:var(--brand)}'],
    ['Fylld märkesfärg, vit text', '& .on{background:var(--brand);color:#fff}'],
    ['Bara textfärgen ändras', '& .on{color:var(--brand);font-weight:600}']
  ]);

  const c1 = card('Rubrik', 'Två rader text om innehållet.');
  QC('hov-kort', 'Vad ska hända när man hovrar ett klickbart kort?', pair(c1, c1, 'Vila', 'Hover', 120), [
    ['Lyfts med skugga', '& .hv .lx-card{transform:translateY(-4px);box-shadow:0 10px 24px rgba(0,0,0,.12)}'],
    ['Bara skugga', '& .hv .lx-card{box-shadow:0 10px 24px rgba(0,0,0,.12)}'],
    ['Kanten mörknar', '& .hv .lx-card{border-color:var(--sink)}'],
    ['Bakgrunden tonas', '& .hv .lx-card{background:var(--tint)}'],
    ['Ingen förändring', '']
  ], { css: '& .lx-stage{min-height:110px}' });

  const ghost = `<div style="position:relative;width:100%"><div style="position:absolute;inset:0;border:1.5px dashed var(--sline);border-radius:var(--rc)"></div>${c1}</div>`;
  QC('hov-kort-lyft', 'Hur högt ska ett kort lyftas vid hover?', pair(c1, ghost, 'Vila', 'Hover (streck = vila)', 120), [
    ['2 px', '& .hv .lx-card{transform:translateY(-2px);box-shadow:0 8px 20px rgba(0,0,0,.10)}'],
    ['4 px', '& .hv .lx-card{transform:translateY(-4px);box-shadow:0 8px 20px rgba(0,0,0,.10)}'],
    ['8 px', '& .hv .lx-card{transform:translateY(-8px);box-shadow:0 8px 20px rgba(0,0,0,.10)}']
  ], { css: '& .lx-stage{min-height:120px;padding-top:8px}& .lx-card{position:relative}' });

  QC('hov-kort-skugga', 'Hur stark ska skuggan vara på ett hovrat kort?', pair(c1, c1, 'Vila', 'Hover', 120), [
    ['Svag', '& .hv .lx-card{box-shadow:0 4px 12px rgba(0,0,0,.06)}'],
    ['Medel', '& .hv .lx-card{box-shadow:0 10px 24px rgba(0,0,0,.12)}'],
    ['Stark', '& .hv .lx-card{box-shadow:0 18px 40px rgba(0,0,0,.22)}']
  ], { css: '& .lx-stage{min-height:110px}& .lx-card{border-color:transparent}' });

  const ic = `<div class="lx-card" style="padding:0;overflow:hidden"><div class="iw"><img src="img/stugor-sjo.jpg" alt="Stugor vid en sjö"></div><div style="padding:10px 12px"><span class="lx-ct" style="font-size:14px">Rubrik</span></div></div>`;
  QC('hov-bild', 'Vad ska hända med bilden när man hovrar ett kort med bild?', pair(ic, ic, 'Vila', 'Hover', 110), [
    ['Zoomar svagt (4 %)', '& .hv img{transform:scale(1.04)}'],
    ['Zoomar tydligt (10 %)', '& .hv img{transform:scale(1.10)}'],
    ['Mörknar lite', '& .hv img{filter:brightness(.8)}'],
    ['Ingen förändring', '']
  ], { css: '& .iw{overflow:hidden;aspect-ratio:4/3}& .iw img{width:100%;height:100%;object-fit:cover}' });

  const btn = `<span class="sb">Boka tid</span>`;
  QC('hov-knapp', 'Hur ska primärknappen ändras vid hover?', pair(btn, btn, 'Vila', 'Hover', 120), [
    ['Mörknar', '& .hv .sb{background:#172A3D;border-color:#172A3D}'],
    ['Ljusnar', '& .hv .sb{background:#3A5A7C;border-color:#3A5A7C}'],
    ['Lyfts med skugga', '& .hv .sb{transform:translateY(-2px);box-shadow:0 6px 16px rgba(36,64,94,.35)}'],
    ['Ingen förändring', '']
  ]);

  QC('hov-knapp-mork', 'Hur mycket ska primärknappen mörkna vid hover?', pair(btn, btn, 'Vila', 'Hover', 120), [
    ['Lite (10 %)', '& .hv .sb{background:#203A55;border-color:#203A55}'],
    ['Tydligt (20 %)', '& .hv .sb{background:#1D334B;border-color:#1D334B}'],
    ['Mycket (35 %)', '& .hv .sb{background:#172A3D;border-color:#172A3D}']
  ]);

  const btn2 = `<span class="sb2">Läs mer</span>`;
  QC('hov-knapp2', 'Hur ska en sekundärknapp med kant ändras vid hover?', pair(btn2, btn2, 'Vila', 'Hover', 120), [
    ['Fylls med märkesfärg', '& .hv .sb2{background:var(--brand);color:#fff}'],
    ['Tonad bakgrund', '& .hv .sb2{background:var(--tint)}'],
    ['Kanten mörknar', '& .sb2{border-color:var(--sline)}& .hv .sb2{border-color:var(--sink)}'],
    ['Ingen förändring', '']
  ]);

  const tbtn = `<span class="tb">${ico('plus', 18)}Lägg till</span>`;
  QC('hov-textknapp', 'Hur ska en textknapp utan ram reagera på hover?', pair(tbtn, tbtn, 'Vila', 'Hover', 120), [
    ['Tonad platta bakom', '& .hv .tb{background:var(--tint)}'],
    ['Texten stryks under', '& .hv .tb{text-decoration:underline;text-underline-offset:3px}'],
    ['Färgen mörknar', '& .hv .tb{color:#0F1D2C}'],
    ['Ingen förändring', '']
  ], { css: '& .tb{display:inline-flex;align-items:center;gap:6px;height:40px;padding:0 12px;margin-left:-12px;border-radius:var(--rb);color:var(--brand);font-weight:600;font-size:15px}' });

  const ib = `<div class="row" style="gap:6px"><span class="lx-ib a">${ico('edit')}</span><span class="lx-ib">${ico('share')}</span><span class="lx-ib">${ico('trash')}</span></div>`;
  QC('hov-ikonknapp', 'Hur ska en ikonknapp reagera på hover?', pair(ib, ib, 'Vila', 'Hover på första', 140), [
    ['Rund tonad platta', '& .lx-ib{border-radius:50%}& .hv .a{background:var(--tint);color:var(--brand)}'],
    ['Rundad fyrkantig platta', '& .hv .a{background:var(--tint);color:var(--brand)}'],
    ['Bara ikonfärgen ändras', '& .lx-ib{color:var(--smuted)}& .hv .a{color:var(--brand)}'],
    ['Ingen förändring', '']
  ]);

  const rows = `<div class="lst"><div class="r">Dokument.pdf<span class="m">2 MB</span></div><div class="r on">Bilder.zip<span class="m">14 MB</span></div><div class="r">Anteckningar<span class="m">8 kB</span></div></div>`;
  QC('hov-listrad', 'Hur ska en rad i en lista eller tabell markeras vid hover?', `<div class="lx-cap" style="margin-bottom:8px">Mittenraden hovras</div>${rows}`, [
    ['Tonad bakgrund', '& .on{background:#F1F1EF}'],
    ['Linje till vänster', '& .on{box-shadow:inset 3px 0 0 var(--brand)}'],
    ['Pil visas till höger', '& .on .m::after{content:"→";margin-left:10px;color:var(--brand);font-weight:700}'],
    ['Ingen förändring', '']
  ], { css: '& .lst{background:var(--box);border:1px solid var(--sline);border-radius:10px;overflow:hidden}& .r{display:flex;justify-content:space-between;gap:10px;padding:11px 14px;font-size:14px;border-top:1px solid var(--sline)}& .r:first-child{border-top:0}& .m{color:var(--smuted);font-size:13px;white-space:nowrap}' });

  const pl = `<span class="pl">Läs mer <span class="ar">${ico('arrow', 18)}</span></span>`;
  QC('hov-pil', 'Ska pilen i en länk röra sig vid hover?', pair(pl, pl, 'Vila', 'Hover', 110), [
    ['Pilen glider 4 px åt höger', '& .hv .ar{transform:translateX(4px)}'],
    ['Pilen står still', ''],
    ['Pilen syns först vid hover', '& .ar{opacity:0}& .hv .ar{opacity:1}']
  ], { css: '& .pl{display:inline-flex;align-items:center;gap:6px;color:var(--brand);font-weight:600}& .ar{display:inline-flex}' });

  const chips = `<div class="row" style="gap:8px;flex-wrap:nowrap"><span class="chip a">Ny</span><span class="chip">Populär</span></div>`;
  QC('hov-chip', 'Hur ska ett filterchip reagera på hover?', pair(chips, chips, 'Vila', 'Hover på ”Ny”', 150), [
    ['Kanten mörknar', '& .hv .a{border-color:var(--sink)}'],
    ['Tonad bakgrund', '& .hv .a{background:var(--tint)}'],
    ['Ingen förändring', '']
  ]);

  const ct = card('Rubrik på kortet', 'Kort text om innehållet.');
  QC('hov-kortrubrik', 'Ska kortets rubrik strykas under när kortet hovras?', pair(ct, ct, 'Vila', 'Hover', 120), [
    ['Ja, rubriken stryks under', '& .hv .lx-ct{text-decoration:underline;text-underline-offset:3px}'],
    ['Nej, rubriken är oförändrad', '']
  ], { css: '& .lx-stage{min-height:100px}' });

  /* Hastighet: loopar mellan vila och hover. */
  const spd = (sel, from, to, ds) => ds.map(d => [`${d} ms`, `& ${sel}{animation:&&k 2.4s infinite ease-out}` + loop(d, from, to)]);
  QC('hov-tid-knapp', 'Hur snabbt ska knappens hover-effekt gå?', `<div class="lx-cap" style="margin-bottom:12px">Hover upprepas</div>${btn}`,
    spd('.sb', 'background:#24405E;border-color:#24405E', 'background:#172A3D;border-color:#172A3D', [100, 200, 400]));
  QC('hov-tid-kort', 'Hur snabbt ska ett kort lyftas vid hover?', `<div class="lx-cap" style="margin-bottom:12px">Hover upprepas</div><div style="max-width:200px">${c1}</div>`,
    spd('.lx-card', 'transform:none;box-shadow:0 0 0 rgba(0,0,0,0)', 'transform:translateY(-4px);box-shadow:0 10px 24px rgba(0,0,0,.12)', [100, 200, 400]), { css: '&.pad{padding-top:28px}' });
  QC('hov-tid-bild', 'Hur snabbt ska bilden zooma vid hover?', `<div class="lx-cap" style="margin-bottom:12px">Hover upprepas</div><div style="max-width:200px">${ic}</div>`,
    spd('img', 'transform:scale(1)', 'transform:scale(1.08)', [200, 400, 800]), { css: '& .iw{overflow:hidden;aspect-ratio:4/3}& .iw img{width:100%;height:100%;object-fit:cover}' });

  const track = `<div class="lx-cap" style="margin-bottom:12px">Hover upprepas (400 ms)</div><div class="tr"><span class="dot"></span></div>`;
  const trCss = '& .tr{position:relative;height:28px;background:var(--box);border:1px solid var(--sline);border-radius:999px}& .dot{position:absolute;top:3px;left:3px;width:20px;height:20px;border-radius:50%;background:var(--brand)}';
  QC('hov-kurva', 'Vilken rörelsekurva ska hover-effekter ha?', track, [
    ['Jämn (linear)', trCss + '& .dot{animation:&&k 2.4s infinite linear}' + loop(400, 'left:3px', 'left:calc(100% - 23px)')],
    ['Mjuk inbromsning (ease-out)', trCss + '& .dot{animation:&&k 2.4s infinite cubic-bezier(.2,.8,.2,1)}' + loop(400, 'left:3px', 'left:calc(100% - 23px)')],
    ['Mjuk start och stopp', trCss + '& .dot{animation:&&k 2.4s infinite ease-in-out}' + loop(400, 'left:3px', 'left:calc(100% - 23px)')]
  ]);

  QC('hov-tillbaka', 'Hur snabbt ska hover-effekten gå tillbaka när musen lämnar?', `<div class="lx-cap" style="margin-bottom:12px">Hover upprepas</div>${btn}`, [
    ['Lika snabbt som in (200 ms)', '& .sb{animation:&&k 2.4s infinite ease-out}' + loop(200, 'background:#24405E;border-color:#24405E', 'background:#172A3D;border-color:#172A3D', 2400, 200)],
    ['Långsammare tillbaka (500 ms)', '& .sb{animation:&&k 2.4s infinite ease-out}' + loop(200, 'background:#24405E;border-color:#24405E', 'background:#172A3D;border-color:#172A3D', 2400, 500)],
    ['Direkt tillbaka', '& .sb{animation:&&k 2.4s infinite ease-out}' + loop(200, 'background:#24405E;border-color:#24405E', 'background:#172A3D;border-color:#172A3D', 2400, 10)]
  ]);

  const cur = (n, t) => `<div class="cc"><div class="lx-card" style="max-width:150px">${'<span class="lx-ct">Rubrik</span><span class="lx-cs">Klickbart kort</span>'}</div><span class="cu">${n === 'hand' ? `<svg viewBox="0 0 24 24" style="width:26px;height:26px" aria-hidden="true"><path d="${'M9 11V5a1.5 1.5 0 0 1 3 0v5M12 10V4a1.5 1.5 0 0 1 3 0v6M15 10V6a1.5 1.5 0 0 1 3 0v8a7 7 0 0 1-7 7h-.5a6 6 0 0 1-4.8-2.4L3.5 15a1.6 1.6 0 0 1 2.4-2.1L9 15V9.5a1.5 1.5 0 0 1 3 0'}" fill="#fff" stroke="#111" stroke-width="1.4" stroke-linejoin="round"/></svg>` : `<svg viewBox="0 0 24 24" style="width:24px;height:24px" aria-hidden="true"><path d="M5 3l14 9-6.5 1.2L9 19z" fill="#111" stroke="#fff" stroke-width="1.4" stroke-linejoin="round"/></svg>`}</span></div>`;
  Q('hov-markor', 'Vilken muspekare ska klickbara kort ha?', [
    ['Hand', cur('hand')],
    ['Vanlig pil', cur('pil')]
  ], { css: '& .cc{position:relative;padding:4px 0 18px}& .cu{position:absolute;left:96px;top:34px;display:block}' });

  QT('hov-touch', 'Hur ska hover-effekter hanteras på pekskärmar?', ['Stängs av på pekskärm', 'Visas kort när man trycker', 'Samma som på dator']);

  /* =====================================================================
     FOKUS FÖR TANGENTBORD
     ===================================================================== */
  grp('fokus', 'Fokus för tangentbord');

  const fset = `<div class="row" style="gap:18px"><span class="sb f">Boka tid</span><span class="link f2">Läs mer</span></div>`;
  const ring = (c, w = 2, off = 2, extra = '') => `& .f{outline:${w}px solid ${c};outline-offset:${off}px}& .f2{outline:${w}px solid ${c};outline-offset:${off}px;border-radius:3px}${extra}`;
  QC('fok-farg', 'Vilken färg ska fokusringen ha?', `<div class="lx-cap" style="margin-bottom:12px">Med fokus</div>${fset}`, [
    ['Märkesfärg (marinblå)', ring('#24405E')],
    ['Svart', ring('#111111')],
    ['Klarblå', ring('#1F6FEB')],
    ['Dubbel: vit innanför mörk', '& .f,& .f2{outline:none;box-shadow:0 0 0 2px #fff,0 0 0 4px #111}& .f2{border-radius:3px}']
  ], { css: '&.pad{padding:24px}' });

  QC('fok-tjocklek', 'Hur tjock ska fokusringen vara?', `<div class="lx-cap" style="margin-bottom:12px">Med fokus</div>${fset}`, [
    ['1 px', ring('#24405E', 1)], ['2 px', ring('#24405E', 2)], ['3 px', ring('#24405E', 3)], ['4 px', ring('#24405E', 4)]
  ]);

  QC('fok-avstand', 'Hur långt från knappen ska fokusringen sitta?', `<div class="lx-cap" style="margin-bottom:12px">Med fokus</div>${fset}`, [
    ['Tätt intill (0 px)', ring('#24405E', 2, 0)], ['2 px luft', ring('#24405E', 2, 2)], ['4 px luft', ring('#24405E', 2, 4)]
  ]);

  QC('fok-form', 'Vilken form ska fokusringen ha?', `<div class="lx-cap" style="margin-bottom:12px">Med fokus</div><span class="sb f">Boka tid</span>`, [
    ['Följer knappens rundning', '& .f{outline:2px solid #24405E;outline-offset:2px}'],
    ['Rak rektangel', '& .f{position:relative;overflow:visible}& .f::after{content:"";position:absolute;inset:-5px;border:2px solid #24405E}'],
    ['Inuti knappen', '& .f{box-shadow:inset 0 0 0 2px #24405E,inset 0 0 0 4px #fff}'],
    ['Mjuk glöd', '& .f{box-shadow:0 0 0 4px rgba(36,64,94,.28)}']
  ]);

  QC('fok-stil', 'Ska fokusringen vara hel, streckad eller prickad?', `<div class="lx-cap" style="margin-bottom:12px">Med fokus</div>${fset}`, [
    ['Hel linje', ring('#24405E')],
    ['Streckad', '& .f,& .f2{outline:2px dashed #24405E;outline-offset:2px}& .f2{border-radius:3px}'],
    ['Prickad', '& .f,& .f2{outline:2px dotted #24405E;outline-offset:2px}& .f2{border-radius:3px}']
  ]);

  const dark = `<div class="dk"><div class="lx-cap" style="margin-bottom:12px;color:#B9C0C8">Med fokus, mörk yta</div><div class="row" style="gap:18px"><span class="sb f" style="background:#fff;color:#1A1C1E;border-color:#fff">Boka tid</span><span class="f2" style="color:#fff;text-decoration:underline;text-underline-offset:3px;font-weight:600">Läs mer</span></div></div>`;
  QC('fok-mork', 'Hur ska fokusringen se ut på en mörk yta?', dark, [
    ['Vit', ring('#ffffff')],
    ['Gul', ring('#FFD43B')],
    ['Ljusblå', ring('#8AB4F8')],
    ['Dubbel: mörk innanför vit', '& .f,& .f2{outline:none;box-shadow:0 0 0 2px #1A1C1E,0 0 0 4px #fff}& .f2{border-radius:3px}']
  ], { pad: false, css: '& .dk{background:#1A1C1E;padding:24px}' });

  const photo = `<div class="ph"><img src="img/fjallen.jpg" alt="Fjällandskap"><div class="in"><span class="lx-cap" style="color:#fff">Med fokus, på foto</span><span class="sb f" style="background:#fff;color:#1A1C1E;border-color:#fff">Boka tid</span></div></div>`;
  QC('fok-foto', 'Hur ska fokusringen se ut ovanpå ett foto?', photo, [
    ['Vit ring', '& .f{outline:2px solid #fff;outline-offset:3px}'],
    ['Dubbel: svart och vit', '& .f{box-shadow:0 0 0 3px #111,0 0 0 5px #fff}'],
    ['Märkesfärg', '& .f{outline:3px solid #24405E;outline-offset:2px}']
  ], { pad: false, css: '& .ph{position:relative;min-height:170px;display:flex}& .ph img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}& .in{position:relative;padding:20px;display:flex;flex-direction:column;gap:14px;justify-content:flex-end;align-items:flex-start;width:100%;background:linear-gradient(transparent,rgba(0,0,0,.35))}' });

  const fld = `<div class="fld" style="max-width:240px"><span class="lbl">E-post</span><span class="inp ph f">namn@exempel.se</span></div>`;
  QC('fok-falt', 'Hur ska ett textfält se ut när det har fokus?', `<div class="lx-cap" style="margin-bottom:10px">Med fokus</div>${fld}`, [
    ['Kanten blir märkesfärgad', '& .f{border-color:var(--brand)}'],
    ['Kant och mjuk ring runt', '& .f{border-color:var(--brand);box-shadow:0 0 0 3px rgba(36,64,94,.18)}'],
    ['Tjockare kant (2 px)', '& .f{border:2px solid var(--brand);padding:0 13px}'],
    ['Ring utanför med luft', '& .f{outline:2px solid var(--brand);outline-offset:2px}']
  ]);

  const lp = `<p style="font-size:14px">Läs mer om <span class="link f">villkoren</span> innan du bokar.</p>`;
  QC('fok-lank', 'Hur ska en länk i löptext visa fokus?', `<div class="lx-cap" style="margin-bottom:10px">Med fokus</div>${lp}`, [
    ['Ring runt ordet', '& .f{outline:2px solid #24405E;outline-offset:2px;border-radius:2px}'],
    ['Gul markering bakom', '& .f{background:#FFD43B;color:#1A1C1E;box-shadow:0 0 0 2px #FFD43B;text-decoration-thickness:2px}'],
    ['Tjock understrykning', '& .f{text-decoration-thickness:3px}'],
    ['Tonad platta bakom', '& .f{background:var(--tint);box-shadow:0 0 0 3px var(--tint);border-radius:2px}']
  ]);

  QC('fok-kort', 'Hur ska ett klickbart kort visa fokus?', `<div class="lx-cap" style="margin-bottom:10px">Med fokus</div><div style="max-width:220px">${c1}</div>`, [
    ['Ring utanför kortet', '& .lx-card{outline:2px solid #24405E;outline-offset:3px}'],
    ['Kanten byter färg', '& .lx-card{border:2px solid #24405E;padding:13px}'],
    ['Samma som hover (lyft)', '& .lx-card{transform:translateY(-4px);box-shadow:0 10px 24px rgba(0,0,0,.12)}']
  ]);

  const cb = `<span class="cbx"><span class="bx">${ico('check', 14, 3)}</span><span class="tx">Kom ihåg mig</span></span>`;
  QC('fok-kryss', 'Var ska fokusringen sitta på en kryssruta?', `<div class="lx-cap" style="margin-bottom:12px">Med fokus</div>${cb}`, [
    ['Runt bara rutan', '& .bx{outline:2px solid #24405E;outline-offset:2px}'],
    ['Runt ruta och text', '& .cbx{outline:2px solid #24405E;outline-offset:4px;border-radius:6px}']
  ], { css: '& .cbx{display:inline-flex;align-items:center;gap:10px;font-size:15px}& .bx{width:20px;height:20px;border-radius:5px;background:var(--brand);color:#fff;display:inline-grid;place-items:center}' });

  QC('fok-ikonknapp', 'Vilken form ska fokus ha på en rund ikonknapp?', `<div class="lx-cap" style="margin-bottom:12px">Med fokus</div><div class="row"><span class="lx-ib f">${ico('heart')}</span><span class="lx-ib">${ico('share')}</span></div>`, [
    ['Rund ring', '& .lx-ib{border-radius:50%}& .f{outline:2px solid #24405E;outline-offset:2px}'],
    ['Rundad fyrkant', '& .lx-ib{border-radius:50%}& .f{position:relative}& .f::after{content:"";position:absolute;inset:-4px;border:2px solid #24405E;border-radius:10px}']
  ]);

  QC('fok-meny', 'Hur ska ett val i en meny visa fokus när man stegar med piltangenter?', `<div class="lx-cap" style="margin-bottom:10px">”Duplicera” har fokus</div>${dd}`, [
    ['Tonad bakgrund (som hover)', '& .on{background:var(--tint);color:var(--brand)}'],
    ['Ring inuti raden', '& .on{box-shadow:inset 0 0 0 2px #24405E}'],
    ['Linje till vänster', '& .on{box-shadow:inset 3px 0 0 #24405E;border-radius:0 6px 6px 0;background:#F4F5F6}']
  ]);

  const tabs = `<div class="tabs"><span class="t on">Översikt</span><span class="t f">Detaljer</span><span class="t">Historik</span></div>`;
  QC('fok-flik', 'Hur ska en flik visa fokus?', `<div class="lx-cap" style="margin-bottom:10px">”Detaljer” har fokus</div>${tabs}`, [
    ['Ring runt fliken', '& .f{outline:2px solid #24405E;outline-offset:-2px;border-radius:6px}'],
    ['Tonad platta', '& .f{background:var(--tint);border-radius:6px 6px 0 0}'],
    ['Streckad linje under texten', '& .f{text-decoration:underline dashed;text-underline-offset:5px;text-decoration-thickness:2px}']
  ], { css: '& .tabs{display:flex;gap:2px;border-bottom:1px solid var(--sline);font-size:14px;font-weight:600;overflow:hidden}& .t{padding:10px 10px;color:var(--smuted);white-space:nowrap}& .t.on{color:var(--sink);box-shadow:inset 0 -2px 0 var(--sink)}' });

  QC('fok-hoppa', 'Hur ska länken ”Hoppa till innehållet” se ut när den får fokus?', scr('<span class="sk">Hoppa till innehållet</span>', 150), [
    ['Mörk platta uppe till vänster', '& .sk{background:#1A1C1E;color:#fff;border-radius:8px}'],
    ['Ljus platta med ring', '& .sk{background:#fff;color:var(--brand);border-radius:8px;outline:2px solid var(--brand);outline-offset:2px;box-shadow:0 4px 12px rgba(0,0,0,.12)}'],
    ['Stapel över hela bredden', '& .sk{left:0!important;right:0;top:0!important;background:var(--brand);color:#fff;text-align:center;border-radius:0}']
  ], { css: '& .sk{position:absolute;left:10px;top:10px;padding:9px 14px;font-size:13px;font-weight:600;text-decoration:underline;text-underline-offset:3px}' });

  QC('fok-anim', 'Ska fokusringen dyka upp direkt eller växa in?', `<div class="lx-cap" style="margin-bottom:12px">Fokus upprepas</div><span class="sb">Boka tid</span>`, [
    ['Direkt', '& .sb{animation:&&k 2.4s infinite steps(1)}@keyframes &&k{0%,30%{box-shadow:0 0 0 0 transparent}31%,75%{box-shadow:0 0 0 2px #fff,0 0 0 4px #24405E}76%,100%{box-shadow:0 0 0 0 transparent}}'],
    ['Växer in snabbt (120 ms)', '& .sb{animation:&&k 2.4s infinite ease-out}' + loop(120, 'box-shadow:0 0 0 0 #fff,0 0 0 8px rgba(36,64,94,0)', 'box-shadow:0 0 0 2px #fff,0 0 0 4px #24405E', 2400, 10)]
  ]);

  QT('fok-mus', 'När ska fokusringen synas?', ['Bara vid tangentbord', 'Även när man klickar med mus']);

  /* =====================================================================
     VALD OCH AKTIV
     ===================================================================== */
  grp('vald', 'Vald och aktiv');

  const sel = `<div class="lx-menu" style="max-width:240px"><span class="lx-mi">Standard</span><span class="lx-mi on"><span class="tk">${ico('check', 18, 2.4)}</span><span class="tx">Express</span></span><span class="lx-mi">Hämta själv</span></div>`;
  const selBase = '& .tk{display:none;color:var(--brand)}& .on .tx{flex:1}';
  QC('val-lista', 'Hur ska det valda alternativet i en lista markeras?', `<div class="lx-cap" style="margin-bottom:10px">”Express” är vald</div>${sel}`, [
    ['Tonad bakgrund', selBase + '& .on{background:var(--tint);color:var(--brand);font-weight:600}'],
    ['Linje till vänster', selBase + '& .on{box-shadow:inset 3px 0 0 var(--brand);border-radius:0 6px 6px 0;font-weight:600}'],
    ['Bock till höger', '& .tk{color:var(--brand);order:2;display:inline-flex}& .on .tx{flex:1}& .on{font-weight:600}'],
    ['Fylld märkesfärg', selBase + '& .on{background:var(--brand);color:#fff;font-weight:600}']
  ]);

  QC('val-bock', 'Var ska bocken sitta på ett valt listalternativ?', `<div class="lx-cap" style="margin-bottom:10px">”Express” är vald</div>${sel}`, [
    ['Bock till vänster', '& .tk{display:inline-flex;color:var(--brand)}& .on{background:var(--tint);font-weight:600}'],
    ['Bock till höger', '& .tk{display:inline-flex;color:var(--brand);order:2}& .on .tx{flex:1}& .on{background:var(--tint);font-weight:600}'],
    ['Ingen bock, bara tonad rad', '& .tk{display:none}& .on{background:var(--tint);font-weight:600}']
  ]);

  const hdr = `<div class="hd"><span class="lg">Logo</span><span class="nv"><span>Tjänster</span><span class="on">Om oss</span><span>Kontakt</span></span></div>`;
  const hdrCss = '& .hd{display:flex;align-items:center;justify-content:space-between;gap:12px;background:var(--box);border-radius:10px;height:56px;padding:0 14px;border:1px solid var(--sline)}& .lg{font-weight:800}& .nv{display:flex;gap:14px;font-size:14px;font-weight:500;height:100%;align-items:center;white-space:nowrap}& .nv span{display:flex;align-items:center;height:100%;position:relative}';
  QC('val-meny-aktiv', 'Hur ska den aktiva sidan visas i menyn?', `<div class="lx-cap" style="margin-bottom:10px">Du är på ”Om oss”</div>${hdr}`, [
    ['Linje under', hdrCss + '& .on::after{content:"";position:absolute;left:0;right:0;bottom:12px;height:2px;background:var(--sink)}'],
    ['Fet text', hdrCss + '& .nv span{color:var(--smuted)}& .nv .on{color:var(--sink);font-weight:700}'],
    ['Märkesfärgad text', hdrCss + '& .on{color:var(--brand);font-weight:600}'],
    ['Tonad platta', hdrCss + '& .nv .on{height:32px;padding:0 10px;margin:0 -10px;border-radius:8px;background:var(--tint)}']
  ], { css: '& .nv span{color:var(--sink)}' });

  QC('val-linje-tjocklek', 'Hur tjock ska linjen under det aktiva menyvalet vara?', `<div class="lx-cap" style="margin-bottom:10px">Du är på ”Om oss”</div>${hdr}`,
    [2, 3, 4].map(t => [`${t} px`, hdrCss + `& .on::after{content:"";position:absolute;left:0;right:0;bottom:12px;height:${t}px;background:var(--sink);border-radius:${t > 2 ? t / 2 : 0}px}`]));

  QC('val-linje-plats', 'Var ska linjen under det aktiva menyvalet sitta?', `<div class="lx-cap" style="margin-bottom:10px">Du är på ”Om oss”</div>${hdr}`, [
    ['Tätt under texten', hdrCss + '& .on::after{content:"";position:absolute;left:0;right:0;bottom:14px;height:2px;background:var(--sink)}'],
    ['I headerns nederkant', hdrCss + '& .on::after{content:"";position:absolute;left:0;right:0;bottom:0;height:2px;background:var(--sink)}']
  ]);

  const rc = (on) => `<div class="rc${on ? ' on' : ''}"><span class="rd"></span><span class="ok">${ico('check', 14, 3)}</span><span class="lx-ct" style="font-size:14px">${on ? 'Medel' : 'Liten'}</span><span class="lx-cs">${on ? '495 kr' : '295 kr'}</span></div>`;
  const rcs = `<div class="rcs">${rc(0)}${rc(1)}</div>`;
  const rcBase = '& .rcs{display:grid;grid-template-columns:1fr 1fr;gap:10px}& .rc{position:relative;background:var(--box);border:1px solid var(--sline);border-radius:var(--rc);padding:14px;display:flex;flex-direction:column;gap:2px;min-width:0}& .rd,& .ok{display:none}';
  QC('val-kort', 'Hur ska ett valt kort se ut när man väljer mellan alternativ?', `<div class="lx-cap" style="margin-bottom:10px">”Medel” är vald</div>${rcs}`, [
    ['Tjock kant i märkesfärg', rcBase + '& .rc.on{border:2px solid var(--brand);padding:13px}'],
    ['Kant och bock i hörnet', rcBase + '& .rc.on{border:2px solid var(--brand);padding:13px}& .on .ok{display:grid;place-items:center;position:absolute;top:8px;right:8px;width:20px;height:20px;border-radius:50%;background:var(--brand);color:#fff}'],
    ['Tonad bakgrund och kant', rcBase + '& .rc.on{border-color:var(--brand);background:var(--tint)}'],
    ['Radioknapp i hörnet', rcBase + '& .rd{display:block;position:absolute;top:10px;right:10px;width:18px;height:18px;border-radius:50%;border:2px solid var(--sline)}& .on .rd{border:5px solid var(--brand)}& .rc.on{border-color:var(--brand)}']
  ]);

  QC('val-kort-tom', 'Ska kort som inte är valda visa en tom radioknapp?', `<div class="lx-cap" style="margin-bottom:10px">”Medel” är vald</div>${rcs}`, [
    ['Ja, tom ring på ovalda', rcBase + '& .rd{display:block;position:absolute;top:10px;right:10px;width:18px;height:18px;border-radius:50%;border:2px solid #9AA0A6}& .on .rd{border:5px solid var(--brand)}& .rc.on{border:2px solid var(--brand);padding:13px}'],
    ['Nej, bara det valda markeras', rcBase + '& .on .rd{display:block;position:absolute;top:10px;right:10px;width:18px;height:18px;border-radius:50%;border:5px solid var(--brand)}& .rc.on{border:2px solid var(--brand);padding:13px}']
  ]);

  const chs = `<div class="row" style="gap:8px"><span class="chip on"><span class="ck">${ico('check', 14, 3)}</span>Ny</span><span class="chip">Populär</span><span class="chip">Rea</span></div>`;
  QC('val-chip', 'Hur ska ett valt filterchip se ut?', `<div class="lx-cap" style="margin-bottom:10px">”Ny” är valt</div>${chs}`, [
    ['Fyllt mörkt', '& .ck{display:none}& .on{background:var(--sink);color:#fff;border-color:var(--sink)}'],
    ['Tonat med färgad kant', '& .ck{display:none}& .on{background:var(--tint);color:var(--brand);border-color:var(--brand)}'],
    ['Kant och bock', '& .ck{display:inline-flex;margin-right:5px;margin-left:-3px}& .on{border:1.5px solid var(--sink);font-weight:600}'],
    ['Fyllt med märkesfärg', '& .ck{display:none}& .on{background:var(--brand);color:#fff;border-color:var(--brand)}']
  ]);

  const seg = `<div class="sg"><span>Dag</span><span class="on">Vecka</span><span>Månad</span></div>`;
  QC('val-segment', 'Hur ska det valda läget i en segmenterad växlare se ut?', `<div class="lx-cap" style="margin-bottom:10px">”Vecka” är vald</div>${seg}`, [
    ['Vit platta på grå botten', '& .sg{background:#ECECEA;padding:3px;border-radius:10px}& .on{background:#fff;box-shadow:0 1px 3px rgba(0,0,0,.15);border-radius:8px}'],
    ['Fylld märkesfärg', '& .sg{border:1px solid var(--sline);border-radius:10px;overflow:hidden;background:#fff}& .sg span+span{border-left:1px solid var(--sline)}& .on{background:var(--brand);color:#fff}'],
    ['Linje under', '& .sg{border-bottom:1px solid var(--sline)}& .on{box-shadow:inset 0 -2px 0 var(--sink)}& .sg span{color:var(--smuted)}& .sg .on{color:var(--sink)}']
  ], { css: '& .sg{display:flex;max-width:260px}& .sg span{flex:1;text-align:center;font-size:14px;font-weight:600;padding:8px 6px;white-space:nowrap}' });

  QC('val-flik', 'Hur ska den aktiva fliken se ut?', `<div class="lx-cap" style="margin-bottom:10px">”Översikt” är aktiv</div><div class="tabs"><span class="t on">Översikt</span><span class="t">Detaljer</span><span class="t">Historik</span></div>`, [
    ['Linje under', '& .on{color:var(--sink);box-shadow:inset 0 -2px 0 var(--sink)}'],
    ['Tonad platta', '& .tabs{border-bottom:0;gap:4px}& .on{color:var(--brand);background:var(--tint);border-radius:8px}'],
    ['Kortflik med ram', '& .tabs{overflow:visible}& .on{color:var(--sink);background:var(--box);border:1px solid var(--sline);border-bottom-color:var(--box);border-radius:8px 8px 0 0;margin-bottom:-1px}'],
    ['Fylld mörk platta', '& .tabs{border-bottom:0;gap:4px}& .on{color:#fff;background:var(--sink);border-radius:999px}']
  ], { css: '& .tabs{display:flex;gap:2px;border-bottom:1px solid var(--sline);font-size:14px;font-weight:600}& .t{padding:9px 12px;color:var(--smuted);white-space:nowrap}' });

  const pg = `<div class="pg"><span>${ico('chevr', 16, 2, 'transform:scaleX(-1)')}</span><span>1</span><span class="on">2</span><span>3</span><span>4</span><span>${ico('chevr', 16)}</span></div>`;
  QC('val-sidnr', 'Hur ska den aktuella sidan i sidnumreringen markeras?', `<div class="lx-cap" style="margin-bottom:10px">Sida 2 visas</div>${pg}`, [
    ['Fylld ruta', '& .on{background:var(--brand);color:#fff}'],
    ['Ruta med kant', '& .on{border:1.5px solid var(--sink)}'],
    ['Fet siffra med linje under', '& .on{font-weight:800;color:var(--sink);box-shadow:inset 0 -2px 0 var(--sink);border-radius:0}'],
    ['Tonad ruta', '& .on{background:var(--tint);color:var(--brand)}']
  ], { css: '& .pg{display:flex;gap:4px;flex-wrap:wrap}& .pg span{display:inline-grid;place-items:center;min-width:36px;height:36px;border-radius:8px;font-size:14px;font-weight:600;color:var(--smuted)}' });

  const sbm = `<div class="sm"><span class="it">${ico('home', 18)}Översikt</span><span class="it on">${ico('folder', 18)}Projekt</span><span class="it">${ico('settings', 18)}Inställningar</span></div>`;
  QC('val-sidomeny', 'Hur ska det aktiva valet i en sidomeny markeras?', `<div class="lx-cap" style="margin-bottom:10px">”Projekt” är aktivt</div>${sbm}`, [
    ['Tonad platta', '& .on{background:var(--tint);color:var(--brand)}'],
    ['Linje till vänster', '& .on{box-shadow:inset 3px 0 0 var(--brand);color:var(--brand);border-radius:0}'],
    ['Bara fet text och mörk ikon', '& .it{color:var(--smuted)}& .it.on{color:var(--sink);font-weight:700}'],
    ['Fylld märkesfärg', '& .on{background:var(--brand);color:#fff}']
  ], { css: '& .sm{display:flex;flex-direction:column;gap:2px;max-width:220px;background:var(--box);padding:8px;border-radius:12px;border:1px solid var(--sline)}& .it{display:flex;align-items:center;gap:10px;height:38px;padding:0 10px;border-radius:8px;font-size:14px;font-weight:500;white-space:nowrap}' });

  QC('val-tryck', 'Vad ska hända med en knapp i ögonblicket den trycks ned?', pair(btn, btn, 'Vila', 'Nedtryckt', 120), [
    ['Krymper lite (97 %)', '& .hv .sb{transform:scale(.97)}'],
    ['Mörknar ännu mer', '& .hv .sb{background:#101E2C;border-color:#101E2C}'],
    ['Flyttas ned 1 px', '& .hv .sb{transform:translateY(1px)}'],
    ['Ingen förändring', '']
  ]);

  const fav = (on) => `<span class="fv${on ? ' on' : ''}">${on ? icoF('heart', 20) : ico('heart', 20)}</span>`;
  QC('val-favorit', 'Hur ska en favoritknapp se ut när den är påslagen?', pair(fav(0), fav(1), 'Av', 'På', 90), [
    ['Fylld i märkesfärg', '& .on{color:var(--brand)}'],
    ['Fylld i röd', '& .on{color:#D23F3F}'],
    ['Fylld mörk', '& .on{color:var(--sink)}'],
    ['Platta bakom ikonen', '& .fv{border-radius:50%}& .on{background:var(--tint);color:var(--brand)}']
  ], { css: '& .fv{display:inline-grid;place-items:center;width:42px;height:42px;border-radius:50%;border:1px solid var(--sline);background:#fff;color:var(--sink)}' });

  const sz = `<div class="sz"><span>S</span><span class="on">M</span><span>L</span><span>XL</span></div>`;
  QC('val-storlek', 'Hur ska vald storlek eller variant markeras?', `<div class="lx-cap" style="margin-bottom:10px">M är vald</div>${sz}`, [
    ['Fylld mörk', '& .on{background:var(--sink);color:#fff;border-color:var(--sink)}'],
    ['Tjock kant (2 px)', '& .on{border:2px solid var(--sink)}'],
    ['Tonad med färgad kant', '& .on{background:var(--tint);border-color:var(--brand);color:var(--brand)}']
  ], { css: '& .sz{display:flex;gap:8px;flex-wrap:wrap}& .sz span{display:inline-grid;place-items:center;min-width:46px;height:44px;padding:0 10px;border-radius:8px;border:1px solid var(--sline);background:#fff;font-weight:600;font-size:14px}' });

  const cal = `<div class="cl">${['M', 'T', 'O', 'T', 'F', 'L', 'S'].map(d => `<b>${d}</b>`).join('')}${[10, 11, 12, 13, 14, 15, 16].map(d => `<span${d === 13 ? ' class="on"' : ''}>${d}</span>`).join('')}</div>`;
  QC('val-datum', 'Hur ska valt datum i en kalender se ut?', `<div class="lx-cap" style="margin-bottom:10px">13 är valt</div>${cal}`, [
    ['Fylld cirkel', '& .on{background:var(--brand);color:#fff;border-radius:50%}'],
    ['Fylld rundad ruta', '& .on{background:var(--brand);color:#fff;border-radius:8px}'],
    ['Ring runt siffran', '& .on{box-shadow:inset 0 0 0 2px var(--brand);border-radius:50%;font-weight:700}']
  ], { css: '& .cl{display:grid;grid-template-columns:repeat(7,1fr);gap:4px;max-width:260px;text-align:center}& .cl b{font-size:11px;color:var(--smuted);font-weight:600}& .cl span{display:grid;place-items:center;aspect-ratio:1;font-size:14px;font-variant-numeric:tabular-nums;max-width:36px;width:100%;justify-self:center}' });

  const bn = `<div class="bn"><span class="b on"><span class="bi">${ico('home', 20)}</span>Hem</span><span class="b"><span class="bi">${ico('search', 20)}</span>Sök</span><span class="b"><span class="bi">${ico('heart', 20)}</span>Sparade</span><span class="b"><span class="bi">${ico('user', 20)}</span>Konto</span></div>`;
  QC('val-bottennav', 'Hur ska det aktiva valet i en bottenmeny på mobil se ut?', `<div class="lx-cap" style="margin-bottom:10px">”Hem” är aktivt</div>${bn}`, [
    ['Färgad ikon och text', '& .on{color:var(--brand);font-weight:700}'],
    ['Platta bakom ikonen', '& .on{color:var(--sink);font-weight:700}& .on .bi{background:var(--tint)}'],
    ['Prick under texten', '& .on{color:var(--sink);font-weight:700;position:relative}& .on::after{content:"";position:absolute;bottom:-1px;left:50%;width:4px;height:4px;margin-left:-2px;border-radius:50%;background:var(--sink)}'],
    ['Linje överst', '& .on{color:var(--sink);font-weight:700;box-shadow:inset 0 2px 0 var(--sink)}']
  ], { css: '& .bn{display:flex;background:#fff;border:1px solid var(--sline);border-radius:12px;overflow:hidden}& .b{flex:1;display:flex;flex-direction:column;align-items:center;gap:2px;padding:8px 2px 9px;font-size:11px;color:var(--smuted);min-width:0}& .bi{display:grid;place-items:center;width:48px;height:28px;border-radius:999px}' });

  const tr = (on, t, d) => `<div class="tr${on ? ' on' : ''}"><span class="bx">${on ? ico('check', 12, 3.2) : ''}</span><span class="nm">${t}</span><span class="dt">${d}</span></div>`;
  QC('val-tabellrad', 'Hur ska en markerad rad i en tabell se ut?', `<div class="lx-cap" style="margin-bottom:8px">Andra raden är markerad</div><div class="tb">${tr(0, 'Offert', '12 mars')}${tr(1, 'Faktura', '14 mars')}${tr(0, 'Kvitto', '20 mars')}</div>`, [
    ['Tonad märkesfärg', '& .tr.on{background:var(--tint)}'],
    ['Linje till vänster', '& .tr.on{box-shadow:inset 3px 0 0 var(--brand)}'],
    ['Bara bocken i rutan', '']
  ], { css: '& .tb{background:#fff;border:1px solid var(--sline);border-radius:10px;overflow:hidden}& .tr{display:flex;align-items:center;gap:10px;padding:10px 12px;font-size:14px;border-top:1px solid var(--sline)}& .tr:first-child{border-top:0}& .nm{flex:1;min-width:0}& .dt{color:var(--smuted);font-size:13px;white-space:nowrap}& .bx{width:18px;height:18px;border-radius:4px;border:1.5px solid #9AA0A6;display:grid;place-items:center;color:#fff;flex:0 0 auto}& .on .bx{background:var(--brand);border-color:var(--brand)}' });

  /* =====================================================================
     INAKTIV OCH AVSTÄNGD
     ===================================================================== */
  grp('inaktiv', 'Inaktiv och avstängd');

  const dis2 = `<div class="row" style="gap:16px">${cap('Aktiv', '<span class="sb">Skicka</span>')}${cap('Inaktiv', '<span class="sb d">Skicka</span>')}</div>`;
  QC('ina-knapp', 'Hur ska en inaktiv primärknapp se ut?', dis2, [
    ['Grå platta, grå text', '& .d{background:#E2E3E4;border-color:#E2E3E4;color:#8B9096}'],
    ['Blek märkesfärg', '& .d{opacity:.4}'],
    ['Bara grå kantlinje', '& .d{background:transparent;border-color:#C9CCCF;color:#9AA0A6}']
  ]);

  QC('ina-opacitet', 'Hur blek ska en inaktiv knapp vara?', dis2, [
    ['Lite blek (60 % synlig)', '& .d{opacity:.6}'],
    ['Halvblek (45 % synlig)', '& .d{opacity:.45}'],
    ['Mycket blek (30 % synlig)', '& .d{opacity:.3}']
  ]);

  const formMini = (extra) => `<div class="stack" style="gap:12px;max-width:260px"><div class="fld"><span class="lbl">E-post</span><span class="inp ph">namn@exempel.se</span></div>${extra}</div>`;
  Q('ina-forklara', 'Vad ska hända med skicka-knappen innan formuläret är ifyllt?', [
    ['Inaktiv utan förklaring', formMini('<span class="sb" style="background:#E2E3E4;border-color:#E2E3E4;color:#8B9096;align-self:flex-start">Skicka</span>')],
    ['Inaktiv med förklaring under', formMini('<div class="stack" style="gap:6px"><span class="sb" style="background:#E2E3E4;border-color:#E2E3E4;color:#8B9096;align-self:flex-start">Skicka</span><span class="lx-note">Fyll i e-post för att skicka.</span></div>')],
    ['Alltid aktiv, fel visas vid klick', formMini('<span class="sb" style="align-self:flex-start">Skicka</span>')]
  ]);

  const dfld = `<div class="fld" style="max-width:240px"><span class="lbl">Kundnummer</span><span class="inp d">10482<span class="lk">${ico('lock', 16)}</span></span></div>`;
  QC('ina-falt', 'Hur ska ett inaktivt textfält se ut?', dfld, [
    ['Grå bakgrund', '& .lk{display:none}& .d{background:#EEEFEF;color:#7A7F85;border-color:transparent}'],
    ['Streckad kant', '& .lk{display:none}& .d{border-style:dashed;color:#7A7F85;background:transparent}'],
    ['Blekt (halvt synligt)', '& .lk{display:none}& .fld{opacity:.45}'],
    ['Grå bakgrund och lås', '& .lk{display:inline-flex;margin-left:auto;color:#8B9096}& .d{background:#EEEFEF;color:#7A7F85;border-color:transparent}']
  ]);

  QC('ina-skrivskydd', 'Hur ska ett skrivskyddat fält (går att läsa, inte ändra) se ut?', `<div class="fld" style="max-width:240px"><span class="lbl">Kundnummer</span><span class="inp r">10482<span class="lk">${ico('lock', 16)}</span></span></div>`, [
    ['Som vanlig text utan ram', '& .lk{display:none}& .r{border-color:transparent;background:transparent;padding:0;height:auto}'],
    ['Grå bakgrund, mörk text', '& .lk{display:none}& .r{background:#F0F0EE;border-color:transparent}'],
    ['Vanligt fält med lås-ikon', '& .lk{display:inline-flex;margin-left:auto;color:#8B9096}']
  ]);

  const dis2b = `<div class="row" style="gap:16px">${cap('Aktiv', '<span class="sb2">Avbryt</span>')}${cap('Inaktiv', '<span class="sb2 d">Avbryt</span>')}</div>`;
  QC('ina-sekundar', 'Hur ska en inaktiv sekundärknapp med kant se ut?', dis2b, [
    ['Grå kant, grå text', '& .d{border-color:#D3D5D8;color:#9AA0A6}'],
    ['Blek', '& .d{opacity:.4}'],
    ['Grå platta utan kant', '& .d{background:#EEEFEF;border-color:#EEEFEF;color:#9AA0A6}']
  ]);

  const opts5 = `<div class="lx-cap" style="margin-bottom:10px">L är slut</div><div class="sz"><span>S</span><span>M</span><span class="x">L</span><span>XL</span></div>`;
  QC('ina-val', 'Hur ska ett alternativ som inte går att välja (t.ex. slutsåld storlek) se ut?', opts5, [
    ['Grå text', '& .x{color:#B0B4B8;background:#F6F6F4}'],
    ['Överstruken', '& .x{color:#9AA0A6;text-decoration:line-through}'],
    ['Diagonalt streck över rutan', '& .x{color:#9AA0A6;background:linear-gradient(to top right,transparent calc(50% - 1px),#C3C6CA calc(50% - 1px),#C3C6CA calc(50% + 1px),transparent calc(50% + 1px))}'],
    ['Streckad kant', '& .x{color:#9AA0A6;border-style:dashed}']
  ], { css: '& .sz{display:flex;gap:8px;flex-wrap:wrap}& .sz span{display:inline-grid;place-items:center;min-width:46px;height:44px;padding:0 10px;border-radius:8px;border:1px solid var(--sline);background:#fff;font-weight:600;font-size:14px}' });

  const dmenu = `<div class="lx-menu"><span class="lx-mi">${ico('edit', 18)}Redigera</span><span class="lx-mi x">${ico('share', 18)}<span class="t">Dela</span><span class="lk">${ico('lock', 15)}</span></span><span class="lx-mi">${ico('download', 18)}Ladda ner</span></div>`;
  QC('ina-menyval', 'Hur ska ett menyval som inte går att använda visas?', `<div class="lx-cap" style="margin-bottom:10px">”Dela” går inte just nu</div>${dmenu}`, [
    ['Grå text och ikon', '& .lk{display:none}& .x{color:#A6AAAF}'],
    ['Grå med lås till höger', '& .lk{display:inline-flex;margin-left:auto}& .x .t{flex:1}& .x{color:#A6AAAF}'],
    ['Döljs helt', '& .x{display:none}']
  ]);

  const dcb = `<div class="stack" style="gap:12px">${['Aktiv', 'Inaktiv, ikryssad', 'Inaktiv, tom'].map((t, i) => `<span class="cbx${i ? ' d' : ''}"><span class="bx${i < 2 ? ' on' : ''}">${i < 2 ? ico('check', 13, 3.2) : ''}</span>${t}</span>`).join('')}</div>`;
  QC('ina-kryss', 'Hur ska inaktiva kryssrutor se ut?', dcb, [
    ['Grå ruta och grå text', '& .d{color:#9AA0A6}& .d .bx{background:#E6E7E8;border-color:#D3D5D8;color:#9AA0A6}'],
    ['Blekt (halvt synligt)', '& .d{opacity:.45}'],
    ['Streckad ruta', '& .d{color:#9AA0A6}& .d .bx{border-style:dashed;background:#fff;border-color:#9AA0A6;color:#9AA0A6}']
  ], { css: '& .cbx{display:inline-flex;align-items:center;gap:10px;font-size:14px}& .bx{width:20px;height:20px;border-radius:5px;border:1.5px solid #8B9096;display:inline-grid;place-items:center;color:#fff;background:#fff}& .bx.on{background:var(--brand);border-color:var(--brand)}' });

  QC('ina-flik', 'Hur ska en flik som inte går att öppna visas?', `<div class="lx-cap" style="margin-bottom:10px">”Historik” är inte tillgänglig</div><div class="tabs"><span class="t on">Översikt</span><span class="t">Detaljer</span><span class="t x">Historik</span></div>`, [
    ['Grå text', '& .x{color:#B0B4B8}'],
    ['Grå text med lås', '& .x{color:#B0B4B8}& .x::after{content:"";display:inline-block;width:9px;height:9px;margin-left:6px;border:1.5px solid currentColor;border-radius:2px;vertical-align:0}'],
    ['Döljs helt', '& .x{display:none}']
  ], { css: '& .tabs{display:flex;gap:2px;border-bottom:1px solid var(--sline);font-size:14px;font-weight:600}& .t{padding:9px 12px;color:var(--smuted);white-space:nowrap}& .on{color:var(--sink);box-shadow:inset 0 -2px 0 var(--sink)}' });

  QT('ina-markor', 'Vilken muspekare ska inaktiva knappar ha?', ['Förbudsskylt (not-allowed)', 'Vanlig pil', 'Hand som vanligt']);

  // SLUT-PÅ-GRUPPER

  window.QZ.part({ key: 'lagen', groups });
})();
