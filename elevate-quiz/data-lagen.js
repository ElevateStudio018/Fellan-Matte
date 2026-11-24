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
& .fld{flex:0 0 auto}
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

  const hdr = `<div class="hd"><span class="nv"><span>Tjänster</span><span class="on">Om oss</span><span>Kontakt</span></span></div>`;
  const hdrCss = '& .hd{display:flex;align-items:center;justify-content:flex-start;gap:12px;background:var(--box);border-radius:10px;height:56px;padding:0 16px;overflow:hidden;border:1px solid var(--sline)}& .lg{font-weight:800}& .nv{display:flex;gap:18px;font-size:14px;font-weight:500;height:100%;align-items:center;white-space:nowrap}& .nv span{display:flex;align-items:center;height:100%;position:relative}';
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
    ['Prick under texten', '& .on{color:var(--sink);font-weight:700;position:relative}& .on::after{content:"";position:absolute;bottom:3px;left:50%;width:4px;height:4px;margin-left:-2px;border-radius:50%;background:var(--sink)}'],
    ['Linje överst', '& .on{color:var(--sink);font-weight:700;box-shadow:inset 0 2px 0 var(--sink)}']
  ], { css: '& .bn{display:flex;background:#fff;border:1px solid var(--sline);border-radius:12px;overflow:hidden}& .b{flex:1;display:flex;flex-direction:column;align-items:center;gap:2px;padding:8px 2px 12px;font-size:11px;color:var(--smuted);min-width:0}& .bi{display:grid;place-items:center;width:48px;height:28px;border-radius:999px}' });

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

  /* =====================================================================
     LADDNING: SPINNER, PUNKTER, PROGRESS
     ===================================================================== */
  grp('laddning', 'Laddning');

  const spinCss = (s = 32, t = 3, col = 'var(--brand)', track = '#E1E4E8', dur = .8) =>
    `& .sp{display:inline-block;width:${s}px;height:${s}px;border-radius:50%;border:${t}px solid ${track};border-top-color:${col};animation:&&k ${dur}s linear infinite;flex:0 0 auto}@keyframes &&k{to{transform:rotate(360deg)}}`;
  const SP = '<span class="sp" role="img" aria-label="Laddar"></span>';
  const stage = (inner, t = 'Laddar') => `<div class="stg"><div class="lx-cap">${t}</div><div class="row" style="justify-content:center;min-height:70px">${inner}</div></div>`;
  const stgCss = '& .stg{display:flex;flex-direction:column;gap:8px}';

  const dots8 = `<span class="d8" role="img" aria-label="Laddar">${Array.from({ length: 8 }, (_, k) => `<i style="transform:rotate(${k * 45}deg);opacity:${((k + 1) / 8).toFixed(2)}"></i>`).join('')}</span>`;
  const bars12 = `<span class="b12" role="img" aria-label="Laddar">${Array.from({ length: 12 }, (_, k) => `<i style="transform:rotate(${k * 30}deg);opacity:${((k + 1) / 12).toFixed(2)}"></i>`).join('')}</span>`;
  Q('lad-spinner-stil', 'Vilken stil ska spinnern ha?', [
    ['Ring med spår och båge', stage(SP), stgCss + spinCss()],
    ['Båge utan spår', stage(SP), stgCss + spinCss(32, 3, 'var(--brand)', 'transparent') + '& .sp{border-right-color:var(--brand);border-bottom-color:var(--brand)}'],
    ['Prickar i cirkel', stage(dots8), stgCss + '& .d8{position:relative;width:32px;height:32px;animation:&&k .9s steps(8) infinite}& .d8 i{position:absolute;left:13px;top:0;width:6px;height:6px;border-radius:50%;background:var(--brand);transform-origin:3px 16px}@keyframes &&k{to{transform:rotate(360deg)}}'],
    ['Streck i cirkel', stage(bars12), stgCss + '& .b12{position:relative;width:32px;height:32px;animation:&&k 1s steps(12) infinite}& .b12 i{position:absolute;left:14.5px;top:0;width:3px;height:9px;border-radius:2px;background:var(--brand);transform-origin:1.5px 16px}@keyframes &&k{to{transform:rotate(360deg)}}']
  ]);

  Q('lad-spinner-tjocklek', 'Hur tjock ska spinnerns linje vara?', [2, 3, 4, 6].map(t => [`${t} px`, stage(SP), stgCss + spinCss(36, t)]));

  const spc = (s) => `<div class="lx-card" style="align-items:center;justify-content:center;min-height:130px;gap:10px"><span class="sp" role="img" aria-label="Laddar"></span></div>`;
  Q('lad-spinner-storlek', 'Hur stor ska spinnern vara när en yta laddar?', [20, 32, 48].map(s => [`${s} px`, `<div class="lx-cap" style="margin-bottom:8px">Ett kort laddar</div>${spc(s)}`, spinCss(s, s > 40 ? 4 : 3)]));

  Q('lad-spinner-fart', 'Hur snabbt ska spinnern snurra?', [
    ['Snabbt (0,6 s per varv)', stage(SP), stgCss + spinCss(32, 3, 'var(--brand)', '#E1E4E8', .6)],
    ['Medel (1 s per varv)', stage(SP), stgCss + spinCss(32, 3, 'var(--brand)', '#E1E4E8', 1)],
    ['Lugnt (1,6 s per varv)', stage(SP), stgCss + spinCss(32, 3, 'var(--brand)', '#E1E4E8', 1.6)]
  ]);

  Q('lad-spinner-farg', 'Vilken färg ska spinnern ha?', [
    ['Märkesfärg', stage(SP), stgCss + spinCss()],
    ['Mörkgrå', stage(SP), stgCss + spinCss(32, 3, '#3F4348')],
    ['Ljusgrå', stage(SP), stgCss + spinCss(32, 3, '#9AA0A6', '#ECEDEE')]
  ]);

  Q('lad-spinner-text', 'Ska spinnern ha text bredvid sig?', [
    ['Bara spinner', stage(SP), stgCss + spinCss(28)],
    ['Text under: ”Laddar…”', stage(`<div class="stack" style="align-items:center;gap:10px">${SP}<span class="small muted">Laddar…</span></div>`), stgCss + spinCss(28)],
    ['Text bredvid: ”Laddar…”', stage(`<div class="row" style="gap:10px">${SP}<span class="small muted">Laddar…</span></div>`), stgCss + spinCss(22, 2.5)]
  ]);

  const d3 = `<span class="d3" role="img" aria-label="Laddar"><i></i><i style="animation-delay:.15s"></i><i style="animation-delay:.3s"></i></span>`;
  const d3Css = '& .d3{display:inline-flex;gap:6px;align-items:center;height:24px}& .d3 i{width:9px;height:9px;border-radius:50%;background:var(--brand);display:block;animation:&&k 1s infinite ease-in-out}';
  Q('lad-punkter', 'Hur ska tre laddpunkter röra sig?', [
    ['Pulserar (tonar)', stage(d3), stgCss + d3Css + '@keyframes &&k{0%,80%,100%{opacity:.25}40%{opacity:1}}'],
    ['Studsar', stage(d3), stgCss + d3Css + '@keyframes &&k{0%,80%,100%{transform:translateY(0)}40%{transform:translateY(-7px)}}'],
    ['Växer och krymper', stage(d3), stgCss + d3Css + '@keyframes &&k{0%,80%,100%{transform:scale(.55)}40%{transform:scale(1)}}']
  ]);

  const smallCtx = (ind) => `<div class="lx-cap" style="margin-bottom:10px">Liten yta laddar</div><div class="lx-card" style="flex-direction:row;align-items:center;gap:10px"><span style="flex:1;font-size:14px">Leveranstid</span>${ind}</div>`;
  Q('lad-liten', 'Vilken indikator ska användas när en liten del laddar?', [
    ['Liten spinner', smallCtx(SP), spinCss(18, 2.5)],
    ['Tre punkter', smallCtx(d3), d3Css.replace('width:9px;height:9px', 'width:6px;height:6px').replace('gap:6px', 'gap:4px') + '@keyframes &&k{0%,80%,100%{opacity:.25}40%{opacity:1}}'],
    ['Texten ”Laddar…”', smallCtx('<span class="small muted">Laddar…</span>'), ''],
    ['Grått skelettblock', smallCtx('<span style="display:block;width:64px;height:12px;border-radius:4px;background:#E3E5E7"></span>'), '']
  ]);

  const pbar = (w = 62) => `<div class="pb"><i style="width:${w}%"></i></div>`;
  const pCtx = (bar, extra = '') => `<div class="stack" style="gap:8px"><div class="row" style="justify-content:space-between"><span style="font-size:14px;font-weight:600">Laddar upp</span>${extra}</div>${bar}</div>`;
  Q('lad-progress-stil', 'Hur ska en progressbar se ut?', [
    ['Tunn linje (2 px)', pCtx(pbar()), '& .pb{height:2px;background:#E3E5E7}& .pb i{display:block;height:100%;background:var(--brand)}'],
    ['Rundad stapel (6 px)', pCtx(pbar()), '& .pb{height:6px;background:#E3E5E7;border-radius:999px;overflow:hidden}& .pb i{display:block;height:100%;background:var(--brand);border-radius:999px}'],
    ['Tjock stapel med procent', pCtx(pbar(), '<span class="small" style="font-variant-numeric:tabular-nums">62 %</span>'), '& .pb{height:10px;background:#E3E5E7;border-radius:999px;overflow:hidden}& .pb i{display:block;height:100%;background:var(--brand);border-radius:999px}'],
    ['Segmenterad i steg', pCtx('<div class="sg"><i class="on"></i><i class="on"></i><i class="on"></i><i></i><i></i></div>'), '& .sg{display:flex;gap:4px}& .sg i{flex:1;height:6px;border-radius:3px;background:#E3E5E7;display:block}& .sg i.on{background:var(--brand)}']
  ]);

  Q('lad-progress-hojd', 'Hur hög ska en progressbar vara?', [2, 4, 8].map(h => [`${h} px`, pCtx(pbar()), `& .pb{height:${h}px;background:#E3E5E7;border-radius:999px;overflow:hidden}& .pb i{display:block;height:100%;background:var(--brand);border-radius:999px}`]));

  Q('lad-progress-ande', 'Ska progressbarens ändar vara runda eller raka?', [
    ['Runda ändar', pCtx(pbar()), '& .pb{height:8px;background:#E3E5E7;border-radius:999px;overflow:hidden}& .pb i{display:block;height:100%;background:var(--brand);border-radius:999px}'],
    ['Raka ändar', pCtx(pbar()), '& .pb{height:8px;background:#E3E5E7;overflow:hidden}& .pb i{display:block;height:100%;background:var(--brand)}']
  ]);

  const pbI = `<div class="pb"><i></i></div>`;
  const pbIB = '& .pb{position:relative;height:6px;background:#E3E5E7;border-radius:999px;overflow:hidden}& .pb i{position:absolute;top:0;bottom:0;display:block;background:var(--brand);border-radius:999px}';
  Q('lad-progress-obestamd', 'Hur ska en progressbar se ut när tiden är okänd?', [
    ['En bit glider fram och tillbaka', pCtx(pbI), pbIB + '& .pb i{width:35%;animation:&&k 1.4s infinite ease-in-out alternate}@keyframes &&k{from{left:0}to{left:65%}}'],
    ['En bit sveper i en riktning', pCtx(pbI), pbIB + '& .pb i{width:35%;animation:&&k 1.3s infinite cubic-bezier(.4,0,.2,1)}@keyframes &&k{from{left:-35%}to{left:100%}}'],
    ['Hela stapeln pulserar', pCtx(pbI), pbIB + '& .pb i{left:0;right:0;animation:&&k 1.4s infinite ease-in-out}@keyframes &&k{0%,100%{opacity:.25}50%{opacity:.9}}'],
    ['Randig stapel som rör sig', pCtx(pbI), pbIB + '& .pb i{left:0;right:0;background:repeating-linear-gradient(-45deg,var(--brand) 0 8px,#4B6A8C 8px 16px);background-size:22.6px 100%;animation:&&k .8s linear infinite}@keyframes &&k{to{background-position:22.6px 0}}']
  ]);

  Q('lad-progress-text', 'Vilken text ska stå vid en progressbar?', [
    ['Procent', pCtx(pbar(), '<span class="small" style="font-variant-numeric:tabular-nums">62 %</span>'), ''],
    ['Antal: ”3 av 5 filer”', pCtx(pbar(), '<span class="small" style="font-variant-numeric:tabular-nums">3 av 5 filer</span>'), ''],
    ['Tid kvar: ”ca 20 s kvar”', pCtx(pbar(), '<span class="small" style="font-variant-numeric:tabular-nums">ca 20 s kvar</span>'), ''],
    ['Ingen text', pCtx(pbar()), '']
  ], { css: '& .pb{height:6px;background:#E3E5E7;border-radius:999px;overflow:hidden}& .pb i{display:block;height:100%;background:var(--brand);border-radius:999px}' });

  const skl = '<div class="sk"><i style="width:40%;height:14px"></i><i></i><i style="width:85%"></i><div class="sr"><i></i><i></i></div></div>';
  const sklCss = '& .sk{padding:12px;display:flex;flex-direction:column;gap:9px}& .sk i{display:block;height:8px;border-radius:4px;background:#E6E7E8}& .sr{display:flex;gap:8px}& .sr i{flex:1;height:44px!important;border-radius:6px!important}';
  Q('lad-sida', 'Hur ska en hel sida visa att den laddar?', [
    ['Tunn linje överst', `<div class="lx-scr" style="height:170px">${fake(4)}<div class="tl"><i></i></div></div>`, '& .lx-fake{opacity:.5}& .tl{position:absolute;top:0;left:0;right:0;height:3px}& .tl i{display:block;height:100%;width:60%;background:var(--brand);animation:&&k 2s infinite ease-out}@keyframes &&k{from{width:5%}to{width:85%}}'],
    ['Spinner i mitten', `<div class="lx-scr" style="height:170px;display:grid;place-items:center">${SP}</div>`, spinCss(32)],
    ['Skelett av innehållet', `<div class="lx-scr" style="height:170px">${skl}</div>`, sklCss + '& .sk i{animation:&&k 1.4s infinite ease-in-out}@keyframes &&k{0%,100%{opacity:1}50%{opacity:.5}}']
  ]);

  QT('lad-fordrojning', 'När ska en laddindikator dyka upp?', ['Direkt', 'Först efter cirka 0,3 s', 'Först efter cirka 1 s']);

  /* =====================================================================
     SKELETT
     ===================================================================== */
  grp('skelett', 'Skelett');

  const skCard = `<div class="skc"><span class="im"></span><span class="ln" style="width:70%;height:12px"></span><span class="ln"></span><span class="ln" style="width:55%"></span></div>`;
  const skBase = (bg = '#E6E7E8', r = 4) => `& .skc{background:var(--box);border:1px solid var(--sline);border-radius:var(--rc);padding:12px;display:flex;flex-direction:column;gap:9px;max-width:240px}& .skc span{display:block;background:${bg};border-radius:${r}px;position:relative;overflow:hidden}& .im{aspect-ratio:16/9;border-radius:8px!important}& .ln{height:9px}`;
  const shimmer = (dur = 1.6) => `& .skc span::after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,transparent,rgba(255,255,255,.65),transparent);transform:translateX(-100%);animation:&&k ${dur}s infinite}@keyframes &&k{to{transform:translateX(100%)}}`;
  Q('ske-anim', 'Hur ska ett skelett röra sig medan det laddar?', [
    ['Glans som sveper över', skCard, skBase() + shimmer()],
    ['Pulserar (tonar)', skCard, skBase() + '& .skc span{animation:&&k 1.4s infinite ease-in-out}@keyframes &&k{0%,100%{opacity:1}50%{opacity:.45}}'],
    ['Står still', skCard, skBase()]
  ]);

  Q('ske-fart', 'Hur snabbt ska glansen svepa över skelettet?', [
    ['Snabbt (1 s)', skCard, skBase() + shimmer(1)],
    ['Medel (1,6 s)', skCard, skBase() + shimmer(1.6)],
    ['Lugnt (2,4 s)', skCard, skBase() + shimmer(2.4)]
  ]);

  Q('ske-ton', 'Vilken ton ska skelettblocken ha?', [
    ['Ljusgrå', skCard, skBase('#E6E7E8')],
    ['Mycket ljus grå', skCard, skBase('#F0F0EF')],
    ['Tonad märkesfärg', skCard, skBase('#E3E9EF')],
    ['Mörkare grå', skCard, skBase('#D5D7DA')]
  ]);

  Q('ske-rundning', 'Hur runda ska skelettets textrader vara?', [
    ['Nästan raka (2 px)', skCard, skBase('#E6E7E8', 2)],
    ['Lätt rundade (4 px)', skCard, skBase('#E6E7E8', 4)],
    ['Helt runda', skCard, skBase('#E6E7E8', 999)]
  ]);

  Q('ske-form', 'Hur noga ska skelettet likna innehållet som kommer?', [
    ['Exakt som det riktiga kortet', skCard, skBase()],
    ['Ett enda block per kort', '<div class="skc"><span class="one"></span></div>', skBase() + '& .one{height:170px;border-radius:8px!important}'],
    ['Bara textrader', '<div class="skc"><span class="ln" style="width:70%;height:12px"></span><span class="ln"></span><span class="ln"></span><span class="ln" style="width:55%"></span></div>', skBase()]
  ]);

  Q('ske-rader', 'Ska skelettets textrader vara olika långa?', [
    ['Olika långa, som riktig text', '<div class="skc"><span class="ln" style="width:92%"></span><span class="ln" style="width:100%"></span><span class="ln" style="width:78%"></span><span class="ln" style="width:48%"></span></div>', skBase()],
    ['Alla lika långa', '<div class="skc"><span class="ln"></span><span class="ln"></span><span class="ln"></span><span class="ln"></span></div>', skBase()]
  ]);

  Q('ske-bild', 'Hur ska en bild se ut innan den har laddat?', [
    ['Grått block', '<div class="bw"><span class="g"></span></div>', '& .g{display:block;aspect-ratio:4/3;background:#E6E7E8;border-radius:var(--rc)}& .bw{max-width:240px}'],
    ['Grått block med bildikon', `<div class="bw"><span class="g">${ico('image', 28, 1.6)}</span></div>`, '& .g{display:grid;place-items:center;aspect-ratio:4/3;background:#E6E7E8;border-radius:var(--rc);color:#9AA0A6}& .bw{max-width:240px}'],
    ['Suddig förhandsbild', '<div class="bw"><span class="g"><img src="img/skog-sjo.jpg" alt="Skog och sjö, suddig förhandsbild"></span></div>', '& .g{display:block;aspect-ratio:4/3;border-radius:var(--rc);overflow:hidden}& .g img{width:100%;height:100%;object-fit:cover;filter:blur(10px);transform:scale(1.15)}& .bw{max-width:240px}']
  ]);

  Q('ske-avatar', 'Vilken form ska skelettet ha för en profilbild?', [
    ['Rund', '<div class="ar"><span class="av"></span><div class="tx"><span style="width:70%"></span><span style="width:45%"></span></div></div>', '& .av{border-radius:50%}'],
    ['Rundad fyrkant', '<div class="ar"><span class="av"></span><div class="tx"><span style="width:70%"></span><span style="width:45%"></span></div></div>', '& .av{border-radius:10px}']
  ], { css: '& .ar{display:flex;gap:12px;align-items:center}& .av{width:48px;height:48px;background:#E6E7E8;flex:0 0 auto}& .tx{flex:1;display:flex;flex-direction:column;gap:8px}& .tx span{display:block;height:9px;border-radius:4px;background:#E6E7E8}' });

  /* =====================================================================
     LADDNING I KNAPP, KORT OCH SIDA
     ===================================================================== */
  grp('laddplats', 'Laddning i knapp, kort och lista');

  const lb = (inner) => `<div class="row" style="gap:16px">${cap('Vila', '<span class="sb">Skicka</span>')}${cap('Laddar', inner)}</div>`;
  const wsp = (s = 18) => spinCss(s, 2.5, '#fff', 'rgba(255,255,255,.35)');
  Q('ladk-knapp', 'Hur ska en knapp visa att den arbetar efter klick?', [
    ['Spinner ersätter texten', lb(`<span class="sb" style="min-width:104px">${SP}</span>`), wsp()],
    ['Spinner före ”Skickar…”', lb(`<span class="sb">${SP}Skickar…</span>`), wsp(16)],
    ['Bara texten ändras: ”Skickar…”', lb('<span class="sb">Skickar…</span>'), ''],
    ['Tunn stapel i knappens nederkant', lb('<span class="sb bb">Skicka<i></i></span>'), '& .bb{position:relative;overflow:hidden}& .bb i{position:absolute;left:0;bottom:0;height:3px;width:40%;background:rgba(255,255,255,.8);animation:&&k 1.2s infinite ease-in-out alternate}@keyframes &&k{from{left:-10%}to{left:70%}}']
  ]);

  Q('ladk-bredd', 'Ska knappen behålla sin bredd när den laddar?', [
    ['Behåller bredden', lb(`<span class="sb" style="width:104px;padding:0">${SP}</span>`), wsp()],
    ['Krymper till en rund knapp', lb(`<span class="sb" style="width:48px;padding:0;border-radius:999px">${SP}</span>`), wsp()]
  ]);

  Q('ladk-ton', 'Ska knappen blekna medan den laddar?', [
    ['Behåller full färg', lb(`<span class="sb">${SP}Skickar…</span>`), wsp(16)],
    ['Bleknar lite', lb(`<span class="sb" style="opacity:.7">${SP}Skickar…</span>`), wsp(16)]
  ]);

  const kc = (inner) => `<div class="lx-cap" style="margin-bottom:8px">Kortet uppdateras</div><div class="kc">${inner}</div>`;
  const kcCss = '& .kc{position:relative;background:var(--box);border:1px solid var(--sline);border-radius:var(--rc);padding:14px;display:flex;flex-direction:column;gap:6px;min-height:120px;max-width:260px}& .big{font-size:26px;font-weight:700;font-variant-numeric:tabular-nums}';
  const kcContent = '<span class="lx-cs">Bokningar i dag</span><span class="big">128</span><span class="lx-cs">+12 jämfört med i går</span>';
  Q('ladk-kort', 'Hur ska ett kort som uppdateras visa laddning?', [
    ['Skelett i stället för innehållet', kc('<span class="s" style="width:50%"></span><span class="s" style="width:35%;height:26px"></span><span class="s" style="width:70%"></span>'), kcCss + '& .s{display:block;height:10px;border-radius:4px;background:#E6E7E8;animation:&&k 1.4s infinite ease-in-out}@keyframes &&k{0%,100%{opacity:1}50%{opacity:.5}}'],
    ['Spinner i mitten', kc(`<div style="flex:1;display:grid;place-items:center">${SP}</div>`), kcCss + spinCss(26)],
    ['Gammalt innehåll blekt med spinner', kc(`<div class="ol">${kcContent}</div><span class="cs">${SP}</span>`), kcCss + spinCss(26) + '& .ol{display:flex;flex-direction:column;gap:6px;opacity:.35}& .cs{position:absolute;inset:0;display:grid;place-items:center}'],
    ['Liten spinner i hörnet', kc(`${kcContent}<span class="cs">${SP}</span>`), kcCss + spinCss(16, 2) + '& .cs{position:absolute;top:12px;right:12px}']
  ]);

  const lst = (end) => `<div class="ls"><div class="r"></div><div class="r"></div><div class="r"></div>${end}</div>`;
  const lstCss = '& .ls{display:flex;flex-direction:column;gap:8px;align-items:center}& .r{width:100%;height:30px;border-radius:8px;background:var(--box);border:1px solid var(--sline)}';
  Q('ladk-fler', 'Hur ska fler resultat laddas längst ned i en lista?', [
    ['Knapp ”Visa fler”', lst('<span class="sb2 lx-btnsm" style="margin-top:4px">Visa fler</span>'), lstCss],
    ['Laddar automatiskt med spinner', lst(`<span style="padding:8px">${SP}</span>`), lstCss + spinCss(22, 2.5)],
    ['Knapp som visar spinner när den klickats', lst(`<span class="sb2 lx-btnsm" style="margin-top:4px">${SP}Laddar…</span>`), lstCss + spinCss(14, 2)],
    ['Sidnummer under listan', lst('<span class="small" style="display:flex;gap:12px;margin-top:6px;font-weight:600"><b style="text-decoration:underline">1</b><span>2</span><span>3</span><span>Nästa</span></span>'), lstCss]
  ]);

  const ff = '<div class="stack" style="gap:10px"><div class="fld"><span class="lbl">Namn</span><span class="inp">Alex Andersson</span></div><div class="fld"><span class="lbl">E-post</span><span class="inp">alex@exempel.se</span></div></div>';
  Q('ladk-las', 'Ska formuläret låsas medan det sparas?', [
    ['Vit slöja över formuläret', `<div class="fw">${ff}<div class="veil">${SP}</div></div><div style="margin-top:12px"><span class="sb lx-btnsm">Sparar…</span></div>`, spinCss(26) + '& .fw{position:relative}& .veil{position:absolute;inset:-6px;background:rgba(255,255,255,.65);display:grid;place-items:center;border-radius:8px}'],
    ['Bara knappen visar laddning', `<div class="fw">${ff}</div><div style="margin-top:12px"><span class="sb lx-btnsm">${SP}Sparar…</span></div>`, spinCss(14, 2, '#fff', 'rgba(255,255,255,.35)')],
    ['Fälten blir grå medan det sparas', `<div class="fw g">${ff}</div><div style="margin-top:12px"><span class="sb lx-btnsm">${SP}Sparar…</span></div>`, spinCss(14, 2, '#fff', 'rgba(255,255,255,.35)') + '& .g .inp{background:#EEEFEF;color:#7A7F85;border-color:transparent}']
  ]);

  const up = (bar) => `<div class="uf"><span class="fi">${ico('file', 20)}</span><div class="tx"><span class="nm">Rapport.pdf</span>${bar}</div><span class="x">${ico('x', 16)}</span></div>`;
  const upCss = '& .uf{display:flex;align-items:center;gap:12px;background:var(--box);border:1px solid var(--sline);border-radius:10px;padding:12px}& .fi{color:var(--smuted);display:flex}& .tx{flex:1;min-width:0;display:flex;flex-direction:column;gap:6px}& .nm{font-size:14px;font-weight:600}& .x{color:var(--smuted);display:flex}';
  Q('ladk-uppladdning', 'Hur ska en fil som laddas upp visa förloppet?', [
    ['Stapel under filnamnet', up('<div class="pb"><i style="width:62%"></i></div>'), upCss + '& .pb{height:4px;background:#E3E5E7;border-radius:999px;overflow:hidden}& .pb i{display:block;height:100%;background:var(--brand)}'],
    ['Cirkel med procent', up('<span class="lx-cs">2,4 av 3,9 MB</span>').replace(`<span class="x">${ico('x', 16)}</span>`, '<span class="ci"><b>62</b></span>'), upCss + '& .ci{width:34px;height:34px;border-radius:50%;background:conic-gradient(var(--brand) 62%,#E3E5E7 0);display:grid;place-items:center}& .ci b{width:26px;height:26px;border-radius:50%;background:#fff;display:grid;place-items:center;font-size:10px;font-variant-numeric:tabular-nums}'],
    ['Bara procent i text', up('<span class="lx-cs" style="font-variant-numeric:tabular-nums">Laddar upp … 62 %</span>'), upCss],
    ['Raden fylls som bakgrund', up('<span class="lx-cs" style="font-variant-numeric:tabular-nums">62 %</span>'), upCss + '& .uf{background:linear-gradient(90deg,var(--tint) 62%,var(--box) 62%)}']
  ]);

  Q('ladk-langsam', 'Vad ska visas om laddningen tar ovanligt lång tid?', [
    ['Bara spinnern som vanligt', `<div class="lx-card" style="align-items:center;min-height:130px;justify-content:center;gap:10px">${SP}</div>`, spinCss(28)],
    ['Spinner och lugnande text', `<div class="lx-card" style="align-items:center;min-height:130px;justify-content:center;gap:10px;text-align:center">${SP}<span class="small muted">Det tar lite längre tid än vanligt …</span></div>`, spinCss(28)],
    ['Spinner, text och avbryt-länk', `<div class="lx-card" style="align-items:center;min-height:130px;justify-content:center;gap:8px;text-align:center">${SP}<span class="small muted">Det tar lite längre tid än vanligt …</span><span class="link small">Avbryt</span></div>`, spinCss(28)]
  ]);

  Q('ladk-bild', 'Hur ska en bild dyka upp när den har laddat?', [
    ['Tonar in mjukt', '<div class="lx-cap" style="margin-bottom:8px">Laddning upprepas</div><div class="bw"><img src="img/stugor-sjo.jpg" alt="Stugor vid en sjö"></div>', '& img{animation:&&k 3s infinite ease-out}@keyframes &&k{0%,25%{opacity:0}45%,100%{opacity:1}}'],
    ['Dyker upp direkt', '<div class="lx-cap" style="margin-bottom:8px">Laddning upprepas</div><div class="bw"><img src="img/stugor-sjo.jpg" alt="Stugor vid en sjö"></div>', '& img{animation:&&k 3s infinite steps(1)}@keyframes &&k{0%,25%{opacity:0}26%,100%{opacity:1}}'],
    ['Går från suddig till skarp', '<div class="lx-cap" style="margin-bottom:8px">Laddning upprepas</div><div class="bw"><img src="img/stugor-sjo.jpg" alt="Stugor vid en sjö"></div>', '& img{animation:&&k 3s infinite ease-out}@keyframes &&k{0%,25%{filter:blur(12px);transform:scale(1.1)}50%,100%{filter:blur(0);transform:scale(1)}}']
  ], { css: '& .bw{aspect-ratio:4/3;max-width:240px;background:#E6E7E8;border-radius:var(--rc);overflow:hidden}& .bw img{width:100%;height:100%;object-fit:cover}' });

  /* =====================================================================
     LYCKAT
     ===================================================================== */
  grp('lyckat', 'Lyckat');

  const OK = { fg: '#1E7A45', bg: '#E7F4EC', bd: '#1E7A45' };
  const toastBox = (t, st = '') => `<div class="lx-tst" style="${st}">${t}</div>`;
  const tstCss = '& .lx-tst{position:absolute;left:50%;transform:translateX(-50%);bottom:12px;display:flex;align-items:center;gap:8px;background:#1F2225;color:#fff;font-size:13px;font-weight:500;padding:9px 12px;border-radius:8px;width:max-content;max-width:calc(100% - 20px);line-height:1.3;box-shadow:0 6px 18px rgba(0,0,0,.2)}';
  Q('lyc-typ', 'Hur ska man bekräfta att något har sparats?', [
    ['Text vid knappen', `<div class="stack" style="gap:10px"><div class="fld"><span class="lbl">Visningsnamn</span><span class="inp">Alex</span></div><div class="row" style="gap:10px"><span class="sb lx-btnsm">Spara</span><span class="okt">${ico('check', 16, 2.6)}Sparat</span></div></div>`, '& .okt{display:inline-flex;align-items:center;gap:5px;color:#1E7A45;font-size:14px;font-weight:600}'],
    ['Toast som försvinner', scr(toastBox(`${ico('check', 16, 2.6)}Ändringarna är sparade`)), tstCss],
    ['Egen bekräftelsesida', `<div class="lx-scr" style="height:170px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;text-align:center;padding:12px"><span class="cc">${ico('check', 22, 2.6)}</span><b style="font-size:15px">Ändringarna är sparade</b><span class="link small">Tillbaka</span></div>`, '& .cc{width:40px;height:40px;border-radius:50%;background:#1E7A45;color:#fff;display:grid;place-items:center}']
  ]);

  const okBan = (c) => `<div class="ob" style="background:${c.bg};color:${c.fg}">${ico('checkc', 20)}<span>Dina ändringar är sparade.</span></div>`;
  Q('lyc-farg', 'Vilken färg ska en lyckad bekräftelse ha?', [
    ['Grön', okBan(OK)],
    ['Neutral grå', okBan({ bg: '#EEEFEF', fg: '#1A1C1E' })],
    ['Märkesfärg', okBan({ bg: '#E6EBF0', fg: '#24405E' })],
    ['Mörk platta', okBan({ bg: '#1F2225', fg: '#fff' })]
  ], { css: '& .ob{display:flex;align-items:center;gap:10px;padding:12px 14px;border-radius:10px;font-size:14px;font-weight:500}' });

  const drawCheck = `<svg class="dc" viewBox="0 0 52 52" aria-hidden="true"><circle cx="26" cy="26" r="24" fill="#1E7A45"/><path d="M15 27l7 7 15-16" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  const okPage = (icon) => `<div class="lx-cap" style="margin-bottom:8px">Upprepas</div><div class="op">${icon}<b>Bokningen är klar</b><span class="small muted">Bekräftelse skickas via e-post.</span></div>`;
  const opCss = '& .op{display:flex;flex-direction:column;align-items:center;gap:6px;text-align:center;background:var(--box);border-radius:12px;padding:20px 12px;border:1px solid var(--sline)}& .op b{font-size:16px}& .dc{width:52px;height:52px;margin-bottom:4px}';
  Q('lyc-bock-anim', 'Ska bocken i en bekräftelse animeras?', [
    ['Ja, bocken ritas fram', okPage(drawCheck), opCss + '& .dc path{stroke-dasharray:40;animation:&&k 3s infinite ease-out}& .dc circle{animation:&&c 3s infinite ease-out;transform-origin:center}@keyframes &&k{0%,20%{stroke-dashoffset:40}45%,100%{stroke-dashoffset:0}}@keyframes &&c{0%{transform:scale(.6);opacity:0}15%,100%{transform:scale(1);opacity:1}}'],
    ['Nej, bocken står still', okPage(drawCheck), opCss],
    ['Ingen bock alls', okPage(''), opCss]
  ]);

  const ck = (k) => k === 'fill' ? `<span class="ck f">${ico('check', 26, 3)}</span>` : k === 'ring' ? `<span class="ck r">${ico('check', 26, 2.6)}</span>` : k === 'tint' ? `<span class="ck t">${ico('check', 26, 2.8)}</span>` : `<span class="ck b">${ico('check', 40, 2.6)}</span>`;
  const ckCss = '& .ck{display:grid;place-items:center;width:56px;height:56px;border-radius:50%;color:#1E7A45}& .ck.f{background:#1E7A45;color:#fff}& .ck.r{border:2.5px solid #1E7A45}& .ck.t{background:#E7F4EC}';
  Q('lyc-bock-stil', 'Hur ska bocken i en bekräftelse se ut?', [
    ['Bock i fylld cirkel', okPage(ck('fill')).replace('<div class="lx-cap" style="margin-bottom:8px">Upprepas</div>', ''), opCss + ckCss],
    ['Bock i tonad cirkel', okPage(ck('tint')).replace('<div class="lx-cap" style="margin-bottom:8px">Upprepas</div>', ''), opCss + ckCss],
    ['Bock i ring', okPage(ck('ring')).replace('<div class="lx-cap" style="margin-bottom:8px">Upprepas</div>', ''), opCss + ckCss],
    ['Bara bocken', okPage(ck('bare')).replace('<div class="lx-cap" style="margin-bottom:8px">Upprepas</div>', ''), opCss + ckCss]
  ]);

  Q('lyc-bock-storlek', 'Hur stor ska bocken vara på en bekräftelsesida?', [40, 64, 96].map(s => [`${s} px`, `<div class="op"><span class="ck f" style="width:${s}px;height:${s}px">${ico('check', Math.round(s * .5), 3)}</span><b>Bokningen är klar</b><span class="small muted">Bekräftelse skickas via e-post.</span></div>`, opCss + ckCss]));

  const okMsg = `<div class="om">${ico('checkc', 18)}<span>Tack! Vi har tagit emot ditt meddelande.</span></div>`;
  Q('lyc-ruta', 'Hur ska ett lyckat meddelande på sidan se ut?', [
    ['Bara grön text med ikon', okMsg, '& .om{color:#1E7A45;padding:0}'],
    ['Tonad grön ruta', okMsg, '& .om{background:#E7F4EC;color:#14532D;border-radius:10px}& .om svg{color:#1E7A45}'],
    ['Kant till vänster', okMsg, '& .om{background:#F4FAF6;color:#14532D;border-left:4px solid #1E7A45;border-radius:4px}& .om svg{color:#1E7A45}'],
    ['Kant runt om', okMsg, '& .om{background:#fff;color:#14532D;border:1px solid #9BCDB0;border-radius:10px}& .om svg{color:#1E7A45}']
  ], { css: '& .om{display:flex;align-items:flex-start;gap:10px;padding:12px 14px;font-size:14px;font-weight:500;line-height:1.4}& .om svg{margin-top:1px}' });

  Q('lyc-helsida', 'Hur ska en bekräftelsesida vara upplagd?', [
    ['Centrerad: ikon, rubrik, knapp', `<div class="lx-scr pg c">${ck('fill')}<b class="h3 h">Bokningen är klar</b><span class="small muted">Bekräftelse skickas via e-post.</span><span class="sb lx-btnsm">Till startsidan</span></div>`, ckCss],
    ['Vänsterställd', `<div class="lx-scr pg l">${ck('fill')}<b class="h3 h">Bokningen är klar</b><span class="small muted">Bekräftelse skickas via e-post.</span><span class="sb lx-btnsm">Till startsidan</span></div>`, ckCss],
    ['Med sammanfattning under', `<div class="lx-scr pg c"><b class="h3 h">${ico('checkc', 20, 2.2, 'color:#1E7A45;vertical-align:-3px;margin-right:6px')}Bokningen är klar</b><div class="sum"><span>Datum</span><b>14 mars</b><span>Tid</span><b>10.00</b><span>Pris</span><b>495 kr</b></div><span class="sb lx-btnsm">Till startsidan</span></div>`, ckCss + '& .sum{display:grid;grid-template-columns:auto auto;gap:4px 18px;font-size:13px;text-align:left;background:var(--ground);padding:10px 14px;border-radius:8px}& .sum span{color:var(--smuted)}']
  ], { css: '& .pg{min-height:220px;display:flex;flex-direction:column;gap:8px;padding:18px;justify-content:center}& .pg.c{align-items:center;text-align:center}& .pg.l{align-items:flex-start}& .pg .ck{width:44px;height:44px}& .pg .sb{margin-top:6px}' });

  const sv = (inner) => `<div class="row" style="gap:16px">${cap('Före', '<span class="sb">Spara</span>')}${cap('Efter klick', inner)}</div>`;
  Q('lyc-knappbyte', 'Ska knappen själv visa att det lyckades?', [
    ['Blir grön: ”Sparat ✓”', sv(`<span class="sb" style="background:#1E7A45;border-color:#1E7A45">${ico('check', 18, 2.6)}Sparat</span>`)],
    ['Samma färg: ”Sparat ✓”', sv(`<span class="sb">${ico('check', 18, 2.6)}Sparat</span>`)],
    ['Oförändrad, text bredvid', sv(`<span class="row" style="gap:8px;flex-wrap:nowrap"><span class="sb">Spara</span><span style="color:#1E7A45;font-size:13px;font-weight:600">Sparat</span></span>`)]
  ]);

  const asv = (inner) => `<div class="ed"><span class="et">Namnlöst dokument</span>${inner}</div>`;
  Q('lyc-autospar', 'Hur ska automatisk sparning visas?', [
    ['Grå text ”Sparat”', asv('<span class="as">Sparat</span>')],
    ['Ikon och ”Sparat”', asv(`<span class="as">${ico('checkc', 15)}Sparat</span>`)],
    ['Tid: ”Sparat 14.32”', asv('<span class="as">Sparat 14.32</span>')],
    ['Bara en liten bock', asv(`<span class="as">${ico('check', 16, 2.4)}</span>`)]
  ], { css: '& .ed{display:flex;align-items:center;justify-content:space-between;gap:10px;background:var(--box);border:1px solid var(--sline);border-radius:10px;padding:12px 14px}& .et{font-weight:600;font-size:14px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0}& .as{display:inline-flex;align-items:center;gap:5px;color:var(--smuted);font-size:13px;white-space:nowrap}' });

  const vf = `<div class="fld" style="max-width:240px"><span class="lbl">E-post</span><span class="inp v">alex@exempel.se<span class="vk">${ico('check', 18, 2.6)}</span></span></div>`;
  Q('lyc-falt', 'Ska ett korrekt ifyllt fält markeras?', [
    ['Grön kant och bock', vf, '& .v{border-color:#1E7A45}& .vk{color:#1E7A45}'],
    ['Bara en grön bock', vf, '& .vk{color:#1E7A45}'],
    ['Ingen markering', vf, '& .vk{display:none}']
  ], { css: '& .vk{margin-left:auto;display:flex}' });

  const okp = (t, s) => `<div class="op">${ck('fill')}<b>${t}</b><span class="small muted">${s}</span></div>`;
  Q('lyc-rubrik', 'Vad ska rubriken på en bekräftelse säga?', [
    ['Kort tack: ”Tack!”', okp('Tack!', 'Vi hör av oss snart.')],
    ['Vad som hänt: ”Bokningen är klar”', okp('Bokningen är klar', 'Vi hör av oss snart.')],
    ['Med detalj: ”Vi ses 14 mars kl. 10”', okp('Vi ses 14 mars kl. 10', 'Bokningen är klar.')]
  ], { css: opCss + ckCss + '& .op .ck{width:44px;height:44px}' });

  Q('lyc-firande', 'Ska en stor bekräftelse ha en extra effekt?', [
    ['Ingen extra effekt', okPage(ck('fill')), opCss + ckCss],
    ['Bocken studsar in', okPage(ck('fill')), opCss + ckCss + '& .ck{animation:&&k 3s infinite}@keyframes &&k{0%{transform:scale(0)}12%{transform:scale(1.15)}20%,100%{transform:scale(1)}}'],
    ['Konfetti runt bocken', okPage(`<span class="cf">${ck('fill')}${Array.from({ length: 10 }, (_, k) => `<i style="--a:${k * 36}deg;background:${['#1E7A45', '#24405E', '#E0A100', '#D23F3F', '#2F6FB5'][k % 5]}"></i>`).join('')}</span>`), opCss + ckCss + '& .cf{position:relative;display:grid;place-items:center}& .cf i{position:absolute;width:6px;height:6px;border-radius:1px;left:25px;top:25px;transform:rotate(var(--a)) translateY(-40px);animation:&&k 3s infinite ease-out}@keyframes &&k{0%{transform:rotate(var(--a)) translateY(0);opacity:0}10%{opacity:1}40%{transform:rotate(var(--a)) translateY(-42px);opacity:1}60%,100%{transform:rotate(var(--a)) translateY(-46px);opacity:0}}']
  ]);

  QT('lyc-tid', 'Hur länge ska en kort bekräftelse som ”Sparat” synas?', ['Cirka 2 sekunder', 'Cirka 4 sekunder', 'Tills nästa ändring görs']);

  /* =====================================================================
     FEL
     ===================================================================== */
  grp('fel', 'Fel');

  const R = '#B3261E';
  const errFld = (msg = 'Skriv e-post som namn@exempel.se') => `<div class="fld" style="max-width:250px"><span class="lbl">E-post</span><span class="inp e">alex@exempel</span><span class="em">${msg}</span></div>`;
  const efCss = (c = R) => `& .e{border-color:${c}}& .em{color:${c};font-size:13px;display:flex;align-items:flex-start;gap:5px;line-height:1.35}`;
  Q('fel-typ', 'Hur ska ett fel i ett formulär visas?', [
    ['Under fältet', `<div class="stack" style="gap:12px">${errFld()}<span class="sb lx-btnsm" style="align-self:flex-start">Skicka</span></div>`, efCss()],
    ['Ruta överst i formuläret', `<div class="stack" style="gap:12px"><div class="bx">${ico('alert', 18)}<span>E-postadressen är inte komplett.</span></div><div class="fld" style="max-width:250px"><span class="lbl">E-post</span><span class="inp">alex@exempel</span></div><span class="sb lx-btnsm" style="align-self:flex-start">Skicka</span></div>`, '& .bx{display:flex;gap:8px;align-items:flex-start;background:#FCEBEA;color:#8C1D18;padding:10px 12px;border-radius:8px;font-size:13px;font-weight:500}'],
    ['Toast nederst', `<div class="lx-scr" style="height:200px;padding:14px"><div class="fld" style="max-width:250px"><span class="lbl">E-post</span><span class="inp">alex@exempel</span></div>${toastBox(`${ico('alert', 16)}E-postadressen är inte komplett`)}</div>`, tstCss + '& .lx-tst svg{color:#FF8A80}'],
    ['Under fältet och ruta överst', `<div class="stack" style="gap:12px"><div class="bx">${ico('alert', 18)}<span>Ett fält behöver rättas.</span></div>${errFld()}</div>`, efCss() + '& .bx{display:flex;gap:8px;align-items:flex-start;background:#FCEBEA;color:#8C1D18;padding:10px 12px;border-radius:8px;font-size:13px;font-weight:500}']
  ]);

  Q('fel-ikon', 'Ska felmeddelandet under ett fält ha en ikon?', [
    ['Med ikon', errFld(`${ico('alert', 15)}<span>Skriv e-post som namn@exempel.se</span>`), efCss()],
    ['Utan ikon', errFld(), efCss()]
  ]);

  Q('fel-ikonform', 'Vilken ikon ska användas för fel?', [
    ['Utropstecken i cirkel', errFld(`${ico('alert', 15)}<span>Skriv e-post som namn@exempel.se</span>`), efCss()],
    ['Varningstriangel', errFld(`${ico('tri', 15)}<span>Skriv e-post som namn@exempel.se</span>`), efCss()],
    ['Kryss i cirkel', errFld(`${ico('xc', 15)}<span>Skriv e-post som namn@exempel.se</span>`), efCss()],
    ['Fylld cirkel med utropstecken', errFld(`<svg class="ico" style="width:15px;height:15px" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="11" fill="currentColor"/><path d="M12 6.5v7M12 17.2h.01" stroke="#fff" stroke-width="2.6" stroke-linecap="round"/></svg><span>Skriv e-post som namn@exempel.se</span>`), efCss()]
  ], { css: '& .em svg{margin-top:2px}' });

  Q('fel-rod', 'Vilken röd ton ska fel ha?', [
    ['Mörkröd (#9B1C1C)', errFld(`${ico('alert', 15)}<span>Skriv e-post som namn@exempel.se</span>`), efCss('#9B1C1C')],
    ['Djupröd (#B3261E)', errFld(`${ico('alert', 15)}<span>Skriv e-post som namn@exempel.se</span>`), efCss('#B3261E')],
    ['Klarröd (#D92D20)', errFld(`${ico('alert', 15)}<span>Skriv e-post som namn@exempel.se</span>`), efCss('#D92D20')],
    ['Korallröd (#E5484D)', errFld(`${ico('alert', 15)}<span>Skriv e-post som namn@exempel.se</span>`), efCss('#E5484D')]
  ], { css: '& .em svg{margin-top:2px}' });

  Q('fel-falt', 'Hur ska själva fältet se ut när det har ett fel?', [
    ['Röd kant', errFld(), efCss()],
    ['Röd kant och tonad bakgrund', errFld(), efCss() + '& .e{background:#FDF3F2}'],
    ['Tjock röd kant (2 px)', errFld(), efCss() + '& .e{border-width:2px;padding:0 13px}'],
    ['Vanligt fält, bara röd text', errFld(), efCss() + '& .e{border-color:var(--sline)}']
  ]);

  Q('fel-plats', 'Var ska felmeddelandet sitta i förhållande till fältet?', [
    ['Under fältet', errFld('Skriv e-post som namn@exempel.se'), efCss()],
    ['Mellan etikett och fält', '<div class="fld" style="max-width:250px"><span class="lbl">E-post</span><span class="em">Skriv e-post som namn@exempel.se</span><span class="inp e">alex@exempel</span></div>', efCss()],
    ['Bredvid etiketten', '<div class="fld" style="max-width:250px"><span class="lbl" style="display:flex;justify-content:space-between;gap:8px">E-post<span class="em" style="font-weight:500">Inte komplett</span></span><span class="inp e">alex@exempel</span></div>', efCss()]
  ]);

  Q('fel-text-farg', 'Vilken färg ska texten i ett felmeddelande ha?', [
    ['Röd text', errFld(`${ico('alert', 15)}<span>Skriv e-post som namn@exempel.se</span>`), efCss()],
    ['Mörk text, röd ikon', errFld(`${ico('alert', 15)}<span>Skriv e-post som namn@exempel.se</span>`), efCss() + '& .em{color:var(--sink)}& .em svg{color:#B3261E}']
  ], { css: '& .em svg{margin-top:2px}' });

  Q('fel-falt-ikon', 'Ska ett fält med fel ha en ikon inne i fältet?', [
    ['Ja, ikon till höger i fältet', `<div class="fld" style="max-width:250px"><span class="lbl">E-post</span><span class="inp e">alex@exempel<span style="margin-left:auto;display:flex;color:${R}">${ico('alert', 18)}</span></span><span class="em">Skriv e-post som namn@exempel.se</span></div>`, efCss()],
    ['Nej, bara kant och text', errFld(), efCss()]
  ]);

  const sum = `<div class="es"><b>${ico('alert', 18)}Två saker behöver rättas</b><span class="link">E-post är inte komplett</span><span class="link">Telefon saknas</span></div>`;
  Q('fel-sammanfattning', 'Ska ett långt formulär samla alla fel i en lista överst?', [
    ['Ja, lista med länkar till fälten', `<div class="stack" style="gap:12px">${sum}${errFld()}</div>`, efCss() + '& .es{display:flex;flex-direction:column;gap:4px;border:2px solid #B3261E;border-radius:10px;padding:12px 14px;font-size:13px}& .es b{display:flex;gap:7px;align-items:center;color:#8C1D18;font-size:14px;margin-bottom:2px}& .es .link{color:#8C1D18;font-weight:500}'],
    ['Nej, bara fel vid varje fält', `<div class="stack" style="gap:12px">${errFld()}</div>`, efCss()]
  ]);

  const eb = `<div class="eb">${ico('alert', 20)}<div><b>Betalningen gick inte igenom</b><span>Kontrollera kortuppgifterna och försök igen.</span></div></div>`;
  Q('fel-ruta-stil', 'Hur ska en felruta på sidan se ut?', [
    ['Fylld röd', eb, '& .eb{background:#B3261E;color:#fff}'],
    ['Tonad röd', eb, '& .eb{background:#FCEBEA;color:#8C1D18}'],
    ['Kant till vänster', eb, '& .eb{background:#FDF5F4;color:#8C1D18;border-left:4px solid #B3261E;border-radius:4px}'],
    ['Kant runt om', eb, '& .eb{background:#fff;color:#8C1D18;border:1px solid #E8A9A5}']
  ], { css: '& .eb{display:flex;gap:10px;align-items:flex-start;padding:12px 14px;border-radius:10px;font-size:13px;line-height:1.4}& .eb b{display:block;font-size:14px;margin-bottom:2px}& .eb svg{margin-top:1px}' });

  Q('fel-skak', 'Ska fältet skaka till när man försöker skicka med fel?', [
    ['Ja, en kort skakning', `<div class="lx-cap" style="margin-bottom:8px">Upprepas</div>${errFld()}`, efCss() + '& .e{animation:&&k 2.4s infinite}@keyframes &&k{0%,30%{transform:none}33%{transform:translateX(-6px)}36%{transform:translateX(6px)}39%{transform:translateX(-4px)}42%{transform:translateX(3px)}45%,100%{transform:none}}'],
    ['Nej, ingen rörelse', `<div class="lx-cap" style="margin-bottom:8px">Upprepas</div>${errFld()}`, efCss()]
  ]);

  QT('fel-validering', 'När ska ett fält kontrolleras och visa fel?', ['När man lämnar fältet', 'Först när man skickar', 'Medan man skriver']);

  Q('fel-ordval', 'Hur ska felmeddelandet vara formulerat?', [
    ['Kort: ”Ogiltig e-post”', errFld('Ogiltig e-post'), efCss()],
    ['Hur man rättar: ”Skriv som namn@exempel.se”', errFld('Skriv e-post som namn@exempel.se'), efCss()],
    ['Vad som saknas: ”Domän saknas efter @”', errFld('Det saknas en domän efter @, till exempel .se'), efCss()]
  ]);

  const etst = (st, ic) => `<div class="et" style="${st}">${ic}<span>Kunde inte spara. Försök igen.</span></div>`;
  Q('fel-toast', 'Hur ska en fel-toast se ut?', [
    ['Fylld röd', etst('background:#B3261E;color:#fff', ico('alert', 18))],
    ['Mörk med röd ikon', etst('background:#1F2225;color:#fff', ico('alert', 18, 2, 'color:#FF8A80'))],
    ['Ljus med röd kant till vänster', etst('background:#fff;color:var(--sink);border-left:4px solid #B3261E', ico('alert', 18, 2, 'color:#B3261E'))],
    ['Tonad röd', etst('background:#FCEBEA;color:#8C1D18', ico('alert', 18))]
  ], { css: '& .et{display:flex;align-items:center;gap:10px;padding:12px 14px;border-radius:10px;font-size:14px;font-weight:500;box-shadow:0 8px 22px rgba(0,0,0,.16)}' });

  const p404 = (top) => `<div class="lx-scr f4">${top}<b class="h h3">Sidan finns inte</b><span class="small muted">Länken kan vara fel eller sidan flyttad.</span><span class="sb lx-btnsm">Till startsidan</span></div>`;
  Q('fel-404-stil', 'Hur ska en 404-sida se ut?', [
    ['Stor siffra 404', p404('<span class="big">404</span>')],
    ['Ikon i cirkel', p404(`<span class="ic">${ico('searchx', 28, 1.8)}</span>`)],
    ['Bara text', p404('<span class="small muted" style="font-weight:600">Fel 404</span>')]
  ], { css: '& .f4{min-height:230px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;text-align:center;padding:18px}& .big{font-size:64px;font-weight:800;letter-spacing:-.04em;line-height:1;color:var(--sink)}& .ic{width:60px;height:60px;border-radius:50%;background:var(--tint);color:var(--brand);display:grid;place-items:center}& .f4 .sb{margin-top:6px}' });

  const f4b = (inner) => `<div class="lx-scr f4"><b class="h h3">Sidan finns inte</b><span class="small muted">Länken kan vara fel eller sidan flyttad.</span>${inner}</div>`;
  Q('fel-404-hjalp', 'Vad ska en 404-sida erbjuda för att komma vidare?', [
    ['En knapp till startsidan', f4b('<span class="sb lx-btnsm">Till startsidan</span>')],
    ['Ett sökfält', f4b(`<span class="inp ph" style="width:100%;max-width:240px;gap:8px">${ico('search', 18)}Sök på sidan</span>`)],
    ['Populära länkar', f4b('<span class="ls"><span class="link">Tjänster</span><span class="link">Priser</span><span class="link">Kontakt</span></span>')],
    ['Knapp och sökfält', f4b(`<span class="inp ph" style="width:100%;max-width:240px;gap:8px">${ico('search', 18)}Sök på sidan</span><span class="sb lx-btnsm">Till startsidan</span>`)]
  ], { css: '& .f4{min-height:220px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;text-align:center;padding:18px}& .ls{display:flex;gap:14px;flex-wrap:wrap;justify-content:center;font-size:14px}' });

  const p500 = (inner) => `<div class="lx-scr f4"><span class="ic">${ico('tri', 26, 1.8)}</span><b class="h h3">Något gick fel</b><span class="small muted">Det är inte ditt fel. Vi tittar på det.</span>${inner}</div>`;
  Q('fel-500', 'Vad ska finnas på en sida för tekniskt fel?', [
    ['Knappen ”Försök igen”', p500(`<span class="sb lx-btnsm">${ico('refresh', 16)}Försök igen</span>`)],
    ['Försök igen och felkod', p500(`<span class="sb lx-btnsm">${ico('refresh', 16)}Försök igen</span><span class="lx-note">Felkod 500 · 14.32</span>`)],
    ['Bara länk till startsidan', p500('<span class="link small">Till startsidan</span>')]
  ], { css: '& .f4{min-height:230px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;text-align:center;padding:18px}& .ic{width:52px;height:52px;border-radius:50%;background:#FCEBEA;color:#B3261E;display:grid;place-items:center}' });

  /* =====================================================================
     VARNINGAR OCH INFO
     ===================================================================== */
  grp('varningar', 'Varningar och info');

  const WN = { fg: '#6B4100', bg: '#FFF4E0', bd: '#C77700', ic: '#B26A00' };
  const IN = { fg: '#163F6E', bg: '#E8F1FB', bd: '#2F6FB5', ic: '#2F6FB5' };
  const ban = (icon = 'tri', title = 'Din session går ut snart', text = 'Spara ditt arbete för att inte förlora något.', x = true) =>
    `<div class="bn"><span class="bi">${ico(icon, 20)}</span><div class="bt">${title ? `<b>${title}</b>` : ''}<span>${text}</span></div>${x ? `<span class="bx">${ico('x', 18)}</span>` : ''}</div>`;
  const banCss = (c) => `& .bn{display:flex;gap:10px;align-items:flex-start;padding:12px 14px;border-radius:10px;font-size:13px;line-height:1.4;color:${c.fg}}& .bt{flex:1;min-width:0}& .bt b{display:block;font-size:14px;margin-bottom:1px}& .bi{display:flex;color:${c.ic};margin-top:1px}& .bx{display:flex;opacity:.7;margin-top:1px}`;
  Q('var-stil', 'Hur ska en varningsbanner se ut?', [
    ['Fylld', ban(), banCss(WN) + `& .bn{background:${WN.bd};color:#fff}& .bi{color:#fff}`],
    ['Tonad', ban(), banCss(WN) + `& .bn{background:${WN.bg}}`],
    ['Kant till vänster', ban(), banCss(WN) + `& .bn{background:#FFFAF0;border-left:4px solid ${WN.bd};border-radius:4px}`],
    ['Kant runt om', ban(), banCss(WN) + `& .bn{background:#fff;border:1px solid #EBC58A}`]
  ]);

  Q('var-ikon', 'Ska varnings- och infobanners ha en ikon?', [
    ['Med ikon', ban(), banCss(WN) + `& .bn{background:${WN.bg}}`],
    ['Utan ikon', ban(), banCss(WN) + `& .bn{background:${WN.bg}}& .bi{display:none}`]
  ]);

  Q('var-ikonstil', 'Ska ikonen i en banner vara linje eller fylld?', [
    ['Linjeikon', ban(), banCss(WN) + `& .bn{background:${WN.bg}}`],
    ['Fylld ikon', ban().replace(ico('tri', 20), `<svg class="ico" style="width:20px;height:20px" viewBox="0 0 24 24" aria-hidden="true"><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" fill="currentColor"/><path d="M12 9v4M12 17h.01" stroke="#fff" stroke-width="2.2" stroke-linecap="round"/></svg>`), banCss(WN) + `& .bn{background:${WN.bg}}`]
  ]);

  Q('var-stang', 'Hur ska man kunna stänga en banner?', [
    ['Kryss till höger', ban(), banCss(IN) + `& .bn{background:${IN.bg}}`],
    ['Textlänk ”Stäng”', ban('info', 'Nya öppettider från 1 juni', 'Vi har öppet längre på torsdagar.', false).replace('</span></div></div>', '</span></div><span class="tl">Stäng</span></div>'), banCss(IN) + `& .bn{background:${IN.bg}}& .tl{font-weight:600;text-decoration:underline;text-underline-offset:3px;white-space:nowrap}`],
    ['Går inte att stänga', ban('info', 'Nya öppettider från 1 juni', 'Vi har öppet längre på torsdagar.', false), banCss(IN) + `& .bn{background:${IN.bg}}`]
  ], { css: '' });

  Q('var-farg', 'Vilken ton ska en varning ha?', [
    ['Bärnsten', ban(), banCss(WN) + `& .bn{background:${WN.bg}}`],
    ['Gul', ban(), banCss({ fg: '#5C4A00', ic: '#8A6D00' }) + '& .bn{background:#FEF7C3}'],
    ['Orange', ban(), banCss({ fg: '#7A2E0B', ic: '#C2410C' }) + '& .bn{background:#FFEDD5}']
  ]);

  const ib2 = ban('info', 'Nya öppettider från 1 juni', 'Vi har öppet längre på torsdagar.');
  Q('info-farg', 'Vilken ton ska en informationsbanner ha?', [
    ['Blå', ib2, banCss(IN) + `& .bn{background:${IN.bg}}`],
    ['Neutral grå', ib2, banCss({ fg: '#1A1C1E', ic: '#5D6166' }) + '& .bn{background:#EEEFEF}'],
    ['Märkesfärg tonad', ib2, banCss({ fg: '#1A3049', ic: '#24405E' }) + '& .bn{background:#E6EBF0}']
  ]);

  Q('var-rundning', 'Hur rund ska en banner vara?', [0, 6, 12].map(r => [`${r} px`, ban(), banCss(WN) + `& .bn{background:${WN.bg};border-radius:${r}px}`]));

  Q('var-kanttjocklek', 'Hur tjock ska kanten till vänster vara på en banner?', [3, 4, 6].map(t => [`${t} px`, ban(), banCss(WN) + `& .bn{background:#FFFAF0;border-left:${t}px solid ${WN.bd};border-radius:4px}`]));

  Q('var-rubrik', 'Ska en banner ha både rubrik och text?', [
    ['Rubrik och text', ban(), banCss(WN) + `& .bn{background:${WN.bg}}`],
    ['Kort rad, fet början', ban('tri', '', '<b style="display:inline;font-size:13px">Sessionen går ut snart.</b> Spara ditt arbete.'), banCss(WN) + `& .bn{background:${WN.bg}}`],
    ['Kort rad, bara text', ban('tri', '', 'Din session går ut snart. Spara ditt arbete.'), banCss(WN) + `& .bn{background:${WN.bg}}`]
  ]);

  Q('var-atgard', 'Hur ska en åtgärd i en banner se ut?', [
    ['Länk i texten', ban('tri', 'Din session går ut snart', 'Spara ditt arbete. <u style="font-weight:600;text-underline-offset:3px">Förläng sessionen</u>'), banCss(WN) + `& .bn{background:${WN.bg}}`],
    ['Liten knapp under texten', ban('tri', 'Din session går ut snart', 'Spara ditt arbete.<span style="display:block;margin-top:8px"><span class="sb2 lx-btnsm" style="height:32px;border-color:#6B4100;color:#6B4100">Förläng</span></span>'), banCss(WN) + `& .bn{background:${WN.bg}}`],
    ['Knapp till höger', ban('tri', 'Din session går ut snart', 'Spara ditt arbete.', false).replace('</span></div></div>', '</span></div><span class="sb lx-btnsm" style="height:32px;padding:0 12px;background:#6B4100;border-color:#6B4100">Förläng</span></div>'), banCss(WN) + `& .bn{background:${WN.bg};align-items:center}`]
  ]);

  Q('var-sidbanner', 'Hur ska en viktig banner överst på hela sajten se ut?', [
    ['Mörk rad över hela bredden', scr('<div class="tb">Vi har stängt 24–26 dec. <u>Läs mer</u><span class="x">×</span></div>', 150), '& .tb{position:absolute;left:0;right:0;top:0;background:#1A1C1E;color:#fff}'],
    ['Tonad rad över hela bredden', scr('<div class="tb">Vi har stängt 24–26 dec. <u>Läs mer</u><span class="x">×</span></div>', 150), `& .tb{position:absolute;left:0;right:0;top:0;background:${WN.bg};color:${WN.fg}}`],
    ['Flytande ruta under headern', scr('<div class="tb">Vi har stängt 24–26 dec. <u>Läs mer</u><span class="x">×</span></div>', 150), `& .tb{position:absolute;left:10px;right:10px;top:34px;background:#fff;color:var(--sink);border-radius:8px;box-shadow:0 6px 18px rgba(0,0,0,.14)}`]
  ], { css: '& .tb{font-size:12px;padding:8px 28px 8px 12px;text-align:center;line-height:1.35}& .tb u{font-weight:600}& .x{position:absolute;right:10px;top:50%;transform:translateY(-50%);font-size:15px}' });

  /* =====================================================================
     TOASTS
     ===================================================================== */
  grp('toasts', 'Toasts');

  const T = (txt = 'Ändringarna är sparade', icn = ico('checkc', 16), extra = '') => `<div class="ts">${icn}<span class="tt">${txt}</span>${extra}</div>`;
  const tCss = '& .ts{display:flex;align-items:center;gap:8px;background:#1F2225;color:#fff;font-size:13px;font-weight:500;padding:9px 12px;border-radius:8px;box-shadow:0 6px 18px rgba(0,0,0,.2);line-height:1.3;max-width:100%}& .tt{flex:1;min-width:0}';
  const tPos = (pos) => scr(`<div class="tp" style="${pos}">${T('Sparat')}</div>`, 170);
  Q('toa-plac', 'Var ska toasts dyka upp på dator?', [
    ['Överst i mitten', tPos('top:10px;left:50%;transform:translateX(-50%)')],
    ['Nere till höger', tPos('bottom:10px;right:10px')],
    ['Nere i mitten', tPos('bottom:10px;left:50%;transform:translateX(-50%)')],
    ['Överst till höger', tPos('top:10px;right:10px')]
  ], { css: tCss + '& .tp{position:absolute}& .ts{white-space:nowrap}' });

  const tPh = (pos) => phone(`<div class="tp" style="${pos}">${T()}</div>`, 280);
  Q('toa-mobil', 'Var ska toasts dyka upp på mobil?', [
    ['Överst', tPh('top:10px')],
    ['Nederst', tPh('bottom:10px')],
    ['Nederst, över hela bredden', tPh('bottom:0;left:0!important;right:0!important').replace('class="ts"', 'class="ts fw"')]
  ], { css: tCss + '& .tp{position:absolute;left:8px;right:8px}& .fw{border-radius:0}' });

  const tStyle = (st, ic = ico('checkc', 18)) => `<div class="ts" style="${st}">${ic}<span class="tt">Ändringarna är sparade</span></div>`;
  Q('toa-stil', 'Hur ska en toast se ut?', [
    ['Mörk', tStyle('')],
    ['Ljus med skugga', tStyle('background:#fff;color:var(--sink);box-shadow:0 8px 24px rgba(0,0,0,.14),0 0 0 1px var(--sline)', ico('checkc', 18, 2, 'color:#1E7A45'))],
    ['Färgad efter läge (grön)', tStyle('background:#1E7A45')],
    ['Ljus med färgad kant till vänster', tStyle('background:#fff;color:var(--sink);border-left:4px solid #1E7A45;box-shadow:0 8px 24px rgba(0,0,0,.14)', ico('checkc', 18, 2, 'color:#1E7A45'))]
  ], { css: tCss + '& .ts{padding:12px 14px;font-size:14px}' });

  Q('toa-ikon', 'Ska en toast ha en ikon?', [
    ['Med ikon', tStyle('')],
    ['Utan ikon', tStyle('').replace(ico('checkc', 18), '')]
  ], { css: tCss + '& .ts{padding:12px 14px;font-size:14px}' });

  const undoT = (u) => `<div class="ts"><span class="tt">Filen togs bort</span>${u}</div>`;
  Q('toa-angra', 'Hur ska knappen ”Ångra” i en toast se ut?', [
    ['Ljus färgad text', undoT('<span style="color:#9CC3F5;font-weight:700">Ångra</span>')],
    ['Vit understruken text', undoT('<span style="text-decoration:underline;text-underline-offset:3px;font-weight:600">Ångra</span>')],
    ['Liten knapp med kant', undoT('<span style="border:1px solid rgba(255,255,255,.45);border-radius:6px;padding:4px 10px;font-weight:600">Ångra</span>')],
    ['Ikon och text', undoT(`<span style="display:inline-flex;align-items:center;gap:5px;font-weight:600">${ico('undo', 15)}Ångra</span>`)]
  ], { css: tCss + '& .ts{padding:12px 14px;font-size:14px;gap:16px}' });

  const tTime = (s) => `<div class="lx-cap" style="margin-bottom:10px">Stapeln visar tiden</div><div class="ts tb"><span class="tt">Filen togs bort</span><span style="color:#9CC3F5;font-weight:700">Ångra</span><i class="bar"></i></div>`;
  Q('toa-tid', 'Hur länge ska en toast med ”Ångra” synas?', [
    ['3 sekunder', tTime(), '& .bar{animation:&&k 3s linear infinite}'],
    ['5 sekunder', tTime(), '& .bar{animation:&&k 5s linear infinite}'],
    ['8 sekunder', tTime(), '& .bar{animation:&&k 8s linear infinite}'],
    ['Tills man stänger den', `<div class="lx-cap" style="margin-bottom:10px">Stannar kvar</div><div class="ts"><span class="tt">Filen togs bort</span><span style="color:#9CC3F5;font-weight:700">Ångra</span>${ico('x', 16)}</div>`, '']
  ], { css: tCss + '& .ts{padding:12px 14px;font-size:14px;gap:16px;position:relative;overflow:hidden}& .bar{position:absolute;left:0;bottom:0;height:3px;width:100%;background:rgba(255,255,255,.6);transform-origin:left}@keyframes &&k{from{transform:scaleX(1)}to{transform:scaleX(0)}}' });

  Q('toa-kryss', 'Ska en toast ha ett stäng-kryss?', [
    ['Ja, alltid', `<div class="ts">${ico('checkc', 18)}<span class="tt">Ändringarna är sparade</span><span style="display:flex;opacity:.7">${ico('x', 16)}</span></div>`],
    ['Nej, den försvinner själv', `<div class="ts">${ico('checkc', 18)}<span class="tt">Ändringarna är sparade</span></div>`]
  ], { css: tCss + '& .ts{padding:12px 14px;font-size:14px}' });

  const stk = (inner) => `<div class="lx-scr" style="height:190px">${fake(4)}<div class="sk">${inner}</div></div>`;
  Q('toa-flera', 'Hur ska flera toasts visas samtidigt?', [
    ['Staplade under varandra', stk(`${T('Filen sparades')}${T('Filen delades')}${T('Länken kopierades')}`), '& .sk{position:absolute;right:10px;bottom:10px;left:10px;display:flex;flex-direction:column;gap:6px;align-items:flex-end}'],
    ['Bara den senaste syns', stk(T('Länken kopierades')), '& .sk{position:absolute;right:10px;bottom:10px;left:10px;display:flex;justify-content:flex-end}'],
    ['Hög som ligger omlott', stk(`<div class="h3x">${T('Filen sparades')}</div><div class="h2x">${T('Filen delades')}</div><div class="h1x">${T('Länken kopierades')}</div>`), '& .sk{position:absolute;right:10px;bottom:10px;width:min(200px,calc(100% - 20px));height:60px}& .sk>div{position:absolute;left:0;right:0;bottom:0}& .h3x{transform:translateY(-14px) scale(.88);opacity:.5}& .h2x{transform:translateY(-7px) scale(.94);opacity:.75}']
  ], { css: tCss + '& .ts{white-space:nowrap}' });

  const tIn = `<div class="lx-scr" style="height:150px">${fake(3)}<div class="tp">${T()}</div></div>`;
  Q('toa-in', 'Hur ska en toast komma in?', [
    ['Glider upp', tIn, '& .tp{animation:&&k 3s infinite}@keyframes &&k{0%,10%{transform:translateY(60px);opacity:0}22%,80%{transform:none;opacity:1}90%,100%{transform:translateY(60px);opacity:0}}'],
    ['Tonar in', tIn, '& .tp{animation:&&k 3s infinite}@keyframes &&k{0%,10%{opacity:0}22%,80%{opacity:1}90%,100%{opacity:0}}'],
    ['Växer fram', tIn, '& .tp{animation:&&k 3s infinite}@keyframes &&k{0%,10%{transform:scale(.85);opacity:0}22%,80%{transform:none;opacity:1}90%,100%{transform:scale(.85);opacity:0}}'],
    ['Dyker upp direkt', tIn, '& .tp{animation:&&k 3s infinite steps(1)}@keyframes &&k{0%,10%{opacity:0}11%,85%{opacity:1}86%,100%{opacity:0}}']
  ], { css: tCss + '& .tp{position:absolute;left:10px;right:10px;bottom:10px;display:flex;justify-content:center}& .ts{white-space:nowrap}' });

  /* =====================================================================
     DIALOGER OCH MODALER
     ===================================================================== */
  grp('dialoger', 'Dialoger och modaler');

  const dlgBody = (x = true) => `<div class="dg"><div class="dh"><b>Spara ändringar?</b>${x ? `<span class="dx">${ico('x', 16)}</span>` : ''}</div><p class="dp">Du har ändringar som inte är sparade.</p><div class="df"><span class="sb2 b2">Avbryt</span><span class="sb b1">Spara</span></div></div>`;
  const dCss = '& .ov{position:absolute;inset:0;background:rgba(15,18,22,.45);display:grid;place-items:center;padding:10px}& .dg{background:#fff;border-radius:12px;padding:14px;width:82%;max-width:100%;box-shadow:0 18px 40px rgba(0,0,0,.25);display:flex;flex-direction:column;gap:6px}& .dh{display:flex;justify-content:space-between;gap:8px;align-items:center}& .dh b{font-size:14px}& .dx{display:flex;color:var(--smuted)}& .dp{font-size:12px;color:var(--smuted);line-height:1.35}& .df{display:flex;gap:6px;justify-content:flex-end;margin-top:6px;flex-wrap:wrap}& .df span{height:30px;padding:0 11px;font-size:12px;border-radius:7px}';
  const D = (x = true, h = 200) => scr(`<div class="ov">${dlgBody(x)}</div>`, h);

  Q('dia-storlek', 'Hur bred ska en vanlig dialog vara?', [
    ['Smal (ca 400 px)', D(), '& .dg{width:58%}'],
    ['Medel (ca 560 px)', D(), '& .dg{width:78%}'],
    ['Bred (ca 720 px)', D(), '& .dg{width:96%}']
  ], { css: dCss });

  Q('dia-rundning', 'Hur rund ska en dialog vara?', [6, 12, 16, 24].map(r => [`${r} px`, D(), `& .dg{border-radius:${r}px}`]), { css: dCss });

  Q('dia-dimma', 'Hur mörk ska bakgrunden bakom en dialog vara?', [
    ['Svag (20 %)', D(), '& .ov{background:rgba(15,18,22,.2)}'],
    ['Medel (45 %)', D(), '& .ov{background:rgba(15,18,22,.45)}'],
    ['Stark (70 %)', D(), '& .ov{background:rgba(15,18,22,.7)}'],
    ['Ljus vit slöja', D(), '& .ov{background:rgba(255,255,255,.7)}& .dg{box-shadow:0 18px 40px rgba(0,0,0,.18),0 0 0 1px var(--sline)}']
  ], { css: dCss });

  Q('dia-blur', 'Ska bakgrunden bakom en dialog bli suddig?', [
    ['Ingen suddning', D(), '& .ov{background:rgba(15,18,22,.3)}'],
    ['Lätt suddig (3 px)', D(), '& .ov{background:rgba(15,18,22,.3);backdrop-filter:blur(3px);-webkit-backdrop-filter:blur(3px)}'],
    ['Tydligt suddig (8 px)', D(), '& .ov{background:rgba(15,18,22,.3);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px)}']
  ], { css: dCss });

  Q('dia-kryss', 'Ska en dialog ha ett stäng-kryss?', [
    ['Kryss uppe till höger', D()],
    ['Kryss i rund platta', D(), '& .dx{width:26px;height:26px;border-radius:50%;background:#EFEFED;display:grid;place-items:center;color:var(--sink)}'],
    ['Inget kryss, bara Avbryt', D(false)]
  ], { css: dCss });

  Q('dia-knappordning', 'I vilken ordning ska knapparna stå i en dialog?', [
    ['Avbryt vänster, Spara höger', D()],
    ['Spara vänster, Avbryt höger', D(), '& .df{flex-direction:row-reverse;justify-content:flex-start}'],
    ['Staplade, Spara överst', D(), '& .df{flex-direction:column-reverse}& .df span{width:100%}']
  ], { css: dCss });

  Q('dia-knappjustering', 'Hur ska dialogens knappar placeras?', [
    ['Till höger', D()],
    ['Delar hela bredden', D(), '& .df span{flex:1}'],
    ['Till vänster', D(), '& .df{justify-content:flex-start}']
  ], { css: dCss });

  Q('dia-fot', 'Ska dialogens knappar ligga i en egen fot?', [
    ['Samma yta som texten', D()],
    ['Grå fot med linje ovanför', D(), '& .dg{padding:14px 14px 0;overflow:hidden}& .df{margin:8px -14px 0;padding:10px 14px;background:#F4F4F2;border-top:1px solid var(--sline)}'],
    ['Linje ovanför, ingen färg', D(), '& .df{border-top:1px solid var(--sline);padding-top:10px;margin-top:8px}']
  ], { css: dCss });

  const mobDlg = (kind) => {
    const body = `<div class="mb ${kind}">${kind === 'sheet' ? '<i class="hd"></i>' : ''}<b>Välj tid</b><span class="r">09.00</span><span class="r">10.30</span><span class="r">13.00</span><span class="sb lx-btnsm" style="width:100%">Välj</span></div>`;
    return phone(`<div class="ov2">${body}</div>`, 300);
  };
  Q('dia-mobil', 'Hur ska en dialog visas på mobil?', [
    ['Centrerad ruta', mobDlg('mid')],
    ['Bottenark nerifrån', mobDlg('sheet')],
    ['Helskärm', mobDlg('full').replace('<b>Välj tid</b>', `<span class="fh"><span style="display:flex">${ico('x', 18)}</span><b>Välj tid</b></span>`)]
  ], { css: '& .ov2{position:absolute;inset:0;background:rgba(15,18,22,.45);display:flex;padding:10px}& .mb{background:#fff;display:flex;flex-direction:column;gap:6px;padding:14px;width:100%;font-size:13px}& .mb b{font-size:14px;margin-bottom:4px}& .r{padding:7px 10px;border:1px solid var(--sline);border-radius:7px}& .mid{margin:auto 0;border-radius:14px}& .sheet{margin-top:auto;border-radius:16px 16px 0 0;margin:auto -10px -10px}& .full{margin:-10px;border-radius:0}& .hd{display:block;width:34px;height:4px;border-radius:2px;background:#C9CCCF;margin:-4px auto 6px}& .fh{display:flex;gap:10px;align-items:center;margin-bottom:6px}& .fh b{margin:0!important}' });

  const det = `<b>Detaljer</b><span class="ln" style="width:80%"></span><span class="ln"></span><span class="ln" style="width:60%"></span><span class="sb lx-btnsm" style="margin-top:auto">Spara</span>`;
  Q('dia-utdrag', 'Hur ska en panel för att visa eller redigera detaljer öppnas på dator?', [
    ['Modal i mitten', scr(`<div class="ov"><div class="pn md">${det}</div></div>`, 200)],
    ['Utdragslåda från höger', scr(`<div class="ov"><div class="pn dr">${det}</div></div>`, 200)],
    ['Egen sida', `<div class="lx-scr pn pg" style="height:200px">${det.replace('<b>Detaljer</b>', '<span class="small muted">← Tillbaka</span><b>Detaljer</b>')}</div>`]
  ], { css: '& .ov{position:absolute;inset:0;background:rgba(15,18,22,.4);display:flex}& .pn{background:#fff;display:flex;flex-direction:column;gap:7px;padding:14px;font-size:13px}& .pn b{font-size:14px}& .ln{display:block;height:7px;border-radius:3px;background:#E3E5E7}& .md{margin:auto;width:70%;height:75%;border-radius:12px}& .dr{margin-left:auto;width:58%;height:100%;box-shadow:-10px 0 30px rgba(0,0,0,.18)}& .pg{border-radius:10px}& .pn .sb{align-self:flex-start}' });

  const sheet = (h) => phone(`<div class="ov2"><div class="sh">${h ? '<i class="hd"></i>' : ''}<div class="shh"><b>Filter</b>${h ? '' : `<span style="display:flex">${ico('x', 16)}</span>`}</div><span class="ln" style="width:70%"></span><span class="ln"></span><span class="ln" style="width:50%"></span></div></div>`, 280);
  Q('dia-handtag', 'Ska ett bottenark ha ett grepp-streck överst?', [
    ['Ja, grepp-streck', sheet(true)],
    ['Nej, stäng-kryss i stället', sheet(false)]
  ], { css: '& .ov2{position:absolute;inset:0;background:rgba(15,18,22,.45);display:flex;align-items:flex-end}& .sh{background:#fff;width:100%;border-radius:16px 16px 0 0;padding:12px 14px 22px;display:flex;flex-direction:column;gap:8px}& .hd{display:block;width:34px;height:4px;border-radius:2px;background:#C9CCCF;margin:0 auto 4px}& .shh{display:flex;justify-content:space-between;align-items:center}& .shh b{font-size:14px}& .ln{display:block;height:7px;border-radius:3px;background:#E3E5E7}' });

  Q('dia-in', 'Hur ska en dialog öppnas?', [
    ['Tonar in och växer lite', D(), '& .ov{animation:&&o 3s infinite}& .dg{animation:&&k 3s infinite}@keyframes &&o{0%,8%{opacity:0}18%,85%{opacity:1}95%,100%{opacity:0}}@keyframes &&k{0%,8%{transform:scale(.94)}20%,100%{transform:none}}'],
    ['Glider upp underifrån', D(), '& .ov{animation:&&o 3s infinite}& .dg{animation:&&k 3s infinite}@keyframes &&o{0%,8%{opacity:0}18%,85%{opacity:1}95%,100%{opacity:0}}@keyframes &&k{0%,8%{transform:translateY(30px)}22%,100%{transform:none}}'],
    ['Bara tonar in', D(), '& .ov{animation:&&o 3s infinite}@keyframes &&o{0%,8%{opacity:0}18%,85%{opacity:1}95%,100%{opacity:0}}'],
    ['Dyker upp direkt', D(), '& .ov{animation:&&o 3s infinite steps(1)}@keyframes &&o{0%,8%{opacity:0}9%,88%{opacity:1}89%,100%{opacity:0}}']
  ], { css: dCss });

  /* =====================================================================
     TOOLTIPS
     ===================================================================== */
  grp('tooltips', 'Tooltips');

  const tip = (txt = 'Kopiera länk') => `<div class="tw"><span class="tip">${txt}<i class="ar"></i></span><span class="lx-ib tg">${ico('share')}</span></div>`;
  const tipCss = (bg = '#1F2225', fg = '#fff', extra = '') => `& .tw{display:flex;flex-direction:column;align-items:center;gap:8px;padding-top:6px}& .tg{background:#fff;border:1px solid var(--sline)}& .tip{position:relative;background:${bg};color:${fg};font-size:12px;font-weight:500;padding:6px 9px;border-radius:6px;white-space:nowrap}& .ar{position:absolute;left:50%;bottom:-4px;width:8px;height:8px;margin-left:-4px;background:${bg};transform:rotate(45deg)}${extra}`;
  Q('tip-stil', 'Hur ska en tooltip se ut?', [
    ['Mörk', tip(), tipCss()],
    ['Ljus med kant och skugga', tip(), tipCss('#fff', 'var(--sink)', '& .tip{box-shadow:0 4px 14px rgba(0,0,0,.12),0 0 0 1px var(--sline)}& .ar{box-shadow:1px 1px 0 var(--sline)}')],
    ['Märkesfärg', tip(), tipCss('#24405E')]
  ]);

  Q('tip-pil', 'Ska en tooltip ha en liten pil mot det den förklarar?', [
    ['Med pil', tip(), tipCss()],
    ['Utan pil', tip(), tipCss('#1F2225', '#fff', '& .ar{display:none}')]
  ]);

  Q('tip-rundning', 'Hur rund ska en tooltip vara?', [
    ['Nästan rak (3 px)', tip(), tipCss('#1F2225', '#fff', '& .tip{border-radius:3px}')],
    ['Rundad (8 px)', tip(), tipCss('#1F2225', '#fff', '& .tip{border-radius:8px}')],
    ['Helt rund', tip(), tipCss('#1F2225', '#fff', '& .tip{border-radius:999px;padding:6px 12px}')]
  ]);

  Q('tip-plats', 'Var ska en tooltip helst dyka upp?', [
    ['Ovanför', tip(), tipCss()],
    ['Under', tip(), tipCss('#1F2225', '#fff', '& .tw{flex-direction:column-reverse}& .ar{bottom:auto;top:-4px}')],
    ['Till höger', tip(), tipCss('#1F2225', '#fff', '& .tw{flex-direction:row-reverse;justify-content:center;padding:14px 0}& .ar{left:-4px;top:50%;bottom:auto;margin:-4px 0 0}')]
  ]);

  const trig = (t) => `<p style="font-size:14px;display:flex;align-items:center;gap:6px;flex-wrap:wrap">Avgift tillkommer ${t}</p>`;
  Q('tip-utlosare', 'Hur ska det synas att det finns en förklaring att hämta?', [
    ['Info-ikon (i)', trig(`<span style="display:inline-flex;color:var(--smuted)">${ico('info', 17)}</span>`)],
    ['Frågetecken i cirkel', trig('<span style="display:inline-grid;place-items:center;width:17px;height:17px;border-radius:50%;border:1.5px solid var(--smuted);color:var(--smuted);font-size:11px;font-weight:700">?</span>')],
    ['Prickad understrykning', '<p style="font-size:14px">Avgift <span style="text-decoration:underline dotted;text-underline-offset:4px;text-decoration-thickness:1.5px">tillkommer</span></p>'],
    ['Liten textlänk ”Vad är det?”', trig('<span class="link small">Vad är det?</span>')]
  ]);

  const tDel = (d) => `<div class="lx-cap" style="margin-bottom:6px">Hover upprepas</div><div class="tw"><span class="tip">Kopiera länk<i class="ar"></i></span><span class="lx-ib tg">${ico('share')}</span></div>`;
  const tdk = (d) => {
    const C = 3000, a = 25, b = a + d / C * 100;
    return tipCss() + `& .tg{animation:&&g 3s infinite steps(1)}& .tip{animation:&&k 3s infinite}@keyframes &&g{0%,${a}%{background:#fff}${a + .1}%,85%{background:var(--tint)}86%,100%{background:#fff}}@keyframes &&k{0%,${b.toFixed(2)}%{opacity:0}${(b + 3).toFixed(2)}%,85%{opacity:1}88%,100%{opacity:0}}`;
  };
  Q('tip-fordrojning', 'Hur länge ska man hovra innan tooltipen visas?', [
    ['Direkt', tDel(), tdk(0)],
    ['Efter 0,3 s', tDel(), tdk(300)],
    ['Efter 0,7 s', tDel(), tdk(700)]
  ]);

  /* =====================================================================
     POPOVER-MENYER
     ===================================================================== */
  grp('popover', 'Popover-menyer');

  const pop = (ic = true, del = 'plain') => `<div class="pw"><span class="lx-ib tg">${ico('more')}</span><div class="lx-menu pm">${[['edit', 'Redigera'], ['copy', 'Duplicera'], ['share', 'Dela']].map(([i, t]) => `<span class="lx-mi">${ic ? ico(i, 17) : ''}${t}</span>`).join('')}${del === 'sep' ? '<i class="sep"></i>' : ''}<span class="lx-mi dl">${ic ? ico('trash', 17) : ''}Ta bort</span></div></div>`;
  const popCss = '& .pw{display:flex;flex-direction:column;align-items:flex-end;gap:6px;max-width:220px;margin-left:auto;margin-right:auto}& .tg{background:#fff;border:1px solid var(--sline);background:var(--tint)}& .pm{max-width:190px}& .sep{display:block;height:1px;background:var(--sline);margin:4px 2px}& .lx-mi{height:36px}';
  Q('pop-stil', 'Hur ska en popover-meny avgränsas mot sidan?', [
    ['Skugga och tunn kant', pop()],
    ['Bara skugga', pop(), '& .pm{box-shadow:0 10px 30px rgba(0,0,0,.16)}'],
    ['Bara kant', pop(), '& .pm{box-shadow:none;border:1px solid rgba(26,28,30,.22)}']
  ], { css: popCss });

  Q('pop-avstand', 'Hur långt från knappen ska menyn öppnas?', [
    ['Tätt intill (2 px)', pop(), '& .pw{gap:2px}'],
    ['6 px', pop(), '& .pw{gap:6px}'],
    ['12 px', pop(), '& .pw{gap:12px}']
  ], { css: popCss });

  Q('pop-ikoner', 'Ska valen i en popover-meny ha ikoner?', [
    ['Med ikoner', pop(true)],
    ['Bara text', pop(false)]
  ], { css: popCss });

  Q('pop-farlig', 'Hur ska ett farligt val som ”Ta bort” visas i menyn?', [
    ['Röd text', pop(true), '& .dl{color:#B3261E}'],
    ['Röd text och linje ovanför', pop(true, 'sep'), '& .dl{color:#B3261E}'],
    ['Som de andra valen', pop(true, 'sep')]
  ], { css: popCss });

  Q('pop-radhojd', 'Hur höga ska raderna i en popover-meny vara?', [32, 40, 48].map(h => [`${h} px`, pop(), `& .lx-mi{height:${h}px}`]), { css: popCss });

  /* =====================================================================
     BEKRÄFTA BORTTAGNING
     ===================================================================== */
  grp('borttagning', 'Bekräfta borttagning');

  const row = (end) => `<div class="rw"><span class="fi">${ico('file', 18)}</span><span class="nm">Offert.pdf</span>${end}</div>`;
  const rwCss = '& .rw{display:flex;align-items:center;gap:10px;background:#fff;border:1px solid var(--sline);border-radius:10px;padding:10px 12px;font-size:14px;min-height:54px}& .fi{display:flex;color:var(--smuted)}& .nm{flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}';
  const delDlg = (btn = '<span class="sb b1" style="background:#B3261E;border-color:#B3261E">Ta bort</span>', icon = '') => scr(`<div class="ov"><div class="dg">${icon}<div class="dh"><b>Ta bort Offert.pdf?</b></div><p class="dp">Filen tas bort för gott.</p><div class="df"><span class="sb2 b2">Avbryt</span>${btn}</div></div></div>`, 200);
  Q('del-monster', 'Hur ska man bekräfta att något tas bort?', [
    ['Dialog som frågar först', delDlg(), dCss],
    ['Tas bort direkt, toast med Ångra', `<div class="stack" style="gap:10px">${row('<span class="small muted">Borttagen</span>').replace('class="rw"', 'class="rw" style="opacity:.45"')}<div class="ts"><span class="tt">Offert.pdf togs bort</span><span style="color:#9CC3F5;font-weight:700">Ångra</span></div></div>`, rwCss + tCss + '& .ts{padding:11px 14px;font-size:13px;gap:14px}'],
    ['Bekräfta på plats i raden', row('<span class="small" style="white-space:nowrap">Säker?</span><span class="sb lx-btnsm" style="height:30px;padding:0 10px;font-size:13px;background:#B3261E;border-color:#B3261E">Ta bort</span>'), rwCss]
  ]);

  Q('del-knappfarg', 'Vilken färg ska knappen som bekräftar borttagning ha?', [
    ['Fylld röd', delDlg()],
    ['Röd kant och text', delDlg('<span class="sb2 b1" style="border-color:#B3261E;color:#B3261E">Ta bort</span>')],
    ['Mörk som vanlig primärknapp', delDlg('<span class="sb b1">Ta bort</span>')]
  ], { css: dCss });

  Q('del-knapptext', 'Vad ska det stå på knappen som bekräftar borttagning?', [
    ['”Ta bort”', delDlg()],
    ['”Ja, ta bort”', delDlg('<span class="sb b1" style="background:#B3261E;border-color:#B3261E">Ja, ta bort</span>')],
    ['”Ta bort filen”', delDlg('<span class="sb b1" style="background:#B3261E;border-color:#B3261E">Ta bort filen</span>')],
    ['”OK”', delDlg('<span class="sb b1" style="background:#B3261E;border-color:#B3261E">OK</span>')]
  ], { css: dCss });

  Q('del-skriv', 'Ska man behöva skriva in namnet för att ta bort något stort, som ett helt konto?', [
    ['Ja, skriv namnet först', scr(`<div class="ov"><div class="dg"><div class="dh"><b>Ta bort kontot?</b></div><p class="dp">Skriv <b style="color:var(--sink)">RADERA</b> för att bekräfta.</p><span class="inp ph" style="height:32px;font-size:12px">RADERA</span><div class="df"><span class="sb2 b2">Avbryt</span><span class="sb b1" style="background:#B3261E;border-color:#B3261E;opacity:.4">Ta bort</span></div></div></div>`, 210)],
    ['Nej, en dialog räcker', scr(`<div class="ov"><div class="dg"><div class="dh"><b>Ta bort kontot?</b></div><p class="dp">Allt innehåll tas bort för gott.</p><div class="df"><span class="sb2 b2">Avbryt</span><span class="sb b1" style="background:#B3261E;border-color:#B3261E">Ta bort</span></div></div></div>`, 210)]
  ], { css: dCss });

  Q('del-rad', 'Hur ska ”ta bort” se ut på en rad i en lista?', [
    ['Papperskorg-ikon', row(`<span class="lx-ib" style="width:34px;height:34px;color:var(--smuted)">${ico('trash', 18)}</span>`)],
    ['Textlänk ”Ta bort”', row('<span class="small" style="color:#B3261E;font-weight:600;text-decoration:underline;text-underline-offset:3px">Ta bort</span>')],
    ['Gömd i ⋯-meny', row(`<span class="lx-ib" style="width:34px;height:34px;color:var(--smuted)">${ico('more', 18)}</span>`)],
    ['Röd papperskorg-ikon', row(`<span class="lx-ib" style="width:34px;height:34px;color:#B3261E">${ico('trash', 18)}</span>`)]
  ], { css: rwCss });

  // SLUT-PÅ-GRUPPER

  window.QZ.part({ key: 'lagen', groups });
})();
