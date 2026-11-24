// Del: Ytor, kort och former (nyckel ytor, prefix yt-)
// Frågorna byggs med små generatorer. Varje fråga visar samma byggsten där bara en egenskap skiljer.
(function () {
  // ---------- Hjälpare ----------
  let N = 0;
  const uid = () => 'ytq' + (N++).toString(36);
  const BD = '1px solid rgba(26,28,30,.10)';
  const IMG = (n, ratio, st) => `<img src="img/${n}.jpg" alt="Exempelbild" style="width:100%;aspect-ratio:${ratio || '3/2'};object-fit:cover;display:block;${st || ''}">`;
  const ico = (d, st) => `<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="${st || ''}">${d}</svg>`;
  const I = {
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    arrowUR: '<path d="M7 17L17 7M8 7h9v9"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
    check: '<path d="M5 12l5 5 9-10"/>',
    chev: '<path d="M6 9l6 6 6-6"/>',
    chevR: '<path d="M9 6l6 6-6 6"/>',
    img: '<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="M21 16l-5-5-9 9"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/>',
  };
  const EB = '<span class="eyebrow">Etikett</span>';
  const H3 = '<p class="h h3">Rubrik som är två rader lång</p>';
  const H3s = '<p class="h h3">Rubrik</p>';
  const TX = '<p class="muted small">Kort beskrivande text på en eller två rader.</p>';
  const PR = '<p class="price">Från 495 kr</p>';
  const LNK = '<span class="link">Läs mer</span>';
  const BTN = '<span class="sb">Boka tid</span>';

  // Kort: o.r rundning, o.bg yta, o.bd kant, o.sh skugga, o.pad utfyllnad, o.img bildnamn, o.ratio, o.body, o.gap, o.st, o.cls
  function card(o = {}) {
    const r = o.r ?? '12px', bg = o.bg ?? 'var(--box)', bd = o.bd ?? BD, sh = o.sh ?? 'none', pad = o.pad ?? '20px';
    const body = o.body ?? (EB + H3 + TX);
    const im = o.img ? IMG(o.img, o.ratio, o.imgSt) : '';
    return `<div class="${o.cls || ''}" style="background:${bg};border-radius:${r};border:${bd};${sh ? 'box-shadow:' + sh + ';' : ''}overflow:hidden;display:flex;flex-direction:column;min-width:0;${o.st || ''}">${im}<div style="padding:${pad};display:flex;flex-direction:column;gap:${o.gap ?? '8px'};align-items:flex-start;flex:1;min-width:0">${body}</div></div>`;
  }
  // Scen: neutral bakgrund, centrerad byggsten med maxbredd
  const scene = (inner, o = {}) => `<div style="background:${o.bg || 'var(--ground)'};padding:${o.pad || '24px'};height:100%;display:flex;flex-direction:column;justify-content:center"><div style="width:100%;max-width:${o.mw || '260px'};margin:0 auto">${inner}</div></div>`;
  // Hover-växling: parts = [[delselektor, vila, hover], ...]. Animeras mellan lägena, statiskt hoverläge vid reducerad rörelse.
  function hov(p, parts) {
    let css = '', kf = '', rm = '';
    parts.forEach(([sub, rest, hover], i) => {
      const s = `.${p}${sub}`, k = `${p}k${i}`;
      css += `${s}{${rest};animation:${k} 3.6s ease-in-out infinite}`;
      kf += `@keyframes ${k}{0%,28%{${rest}}50%,78%{${hover}}100%{${rest}}}`;
      rm += `${s}{animation:none;${hover}}`;
    });
    return `<style>${css}${kf}@media (prefers-reduced-motion:reduce){${rm}}</style>`;
  }
  const phone = (inner, st) => `<div style="width:100%;max-width:220px;margin:0 auto;border:7px solid #1A1C1E;border-radius:30px;overflow:hidden;background:var(--ground);height:380px;position:relative;${st || ''}">${inner}</div>`;
  const Q = (id, q, opts, layout) => ({ id, q, layout: layout || 'grid', opts: opts.map(([l, h]) => (h === undefined ? { l } : { l, h })) });
  const px = n => (n === 999 ? 'Helt rund' : n + ' px');

  // ---------- Rundning ----------
  const rundning = [
    Q('yt-rund-kort', 'Hur runda ska korten vara?',
      [0, 4, 8, 12, 16, 24].map(n => [n ? n + ' px rundning' : '0 px, raka hörn', scene(card({ r: n + 'px', img: 'skog-sjo' }))])),

    Q('yt-rund-panel', 'Hur runda ska stora paneler och innehållsytor vara?',
      [0, 8, 16, 24, 32].map(n => [n ? 'Panel ' + n + ' px' : 'Panel 0 px, raka hörn', scene(card({ r: n + 'px', pad: '28px', body: '<p class="h h2">Rubrik för en sektion</p><p class="muted">En panel som rymmer flera rader innehåll och lite luft runt om.</p><p class="muted small">Ytterligare en rad text.</p>' }), { mw: '420px' })])),

    Q('yt-rund-bild', 'Hur runda ska fristående bilder vara?',
      [0, 4, 8, 16, 24].map(n => [n ? 'Bild ' + n + ' px' : 'Bild 0 px, raka hörn', scene(`<div class="stack">${IMG('stugor-sjo', '4/3', `border-radius:${n}px`)}<p class="muted small">Bildtext på en rad</p></div>`)])),

    Q('yt-rund-inre-bild', 'Hur rund ska en infälld bild vara i ett kort med 20 px rundning?',
      [[20, 'Samma som kortet (20 px)'], [10, 'Kortets minus luften (10 px)'], [4, 'Nästan rak (4 px)'], [0, 'Rak (0 px)']].map(([n, l]) => [l, scene(`<div style="background:var(--box);border:${BD};border-radius:20px;padding:10px">${IMG('skog-sjo', '3/2', `border-radius:${n}px`)}<div class="stack" style="padding:12px 8px 6px;gap:6px">${H3}${TX}</div></div>`)])),

    Q('yt-rund-knapp-kort', 'Hur ska knappens rundning förhålla sig till kortets?',
      [[16, 'Samma som kortet (16 px)'], [8, 'Mindre än kortet (8 px)'], [999, 'Helt rund knapp'], [0, 'Rak knapp (0 px)']].map(([n, l]) => [l, scene(card({ r: '16px', body: EB + H3 + TX + `<span class="sb" style="border-radius:${n}px;margin-top:6px">Boka tid</span>` }))])),

    Q('yt-rund-falt-panel', 'Hur runda ska fält vara i en panel med 16 px rundning?',
      [0, 4, 8, 12, 999].map(n => ['Fält ' + (n === 999 ? 'helt runda' : n + ' px'), scene(card({ r: '16px', gap: '12px', body: `<p class="h h3">Kontakt</p><div class="fld" style="width:100%"><span class="lbl">Namn</span><span class="inp ph" style="border-radius:${n}px">För- och efternamn</span></div><div class="fld" style="width:100%"><span class="lbl">E-post</span><span class="inp ph" style="border-radius:${n}px">namn@exempel.se</span></div>` }))])),

    Q('yt-rund-etikett', 'Hur runda ska etiketter (taggar) vara?',
      [[0, 'Raka hörn'], [3, '3 px'], [6, '6 px'], [999, 'Helt runda']].map(([n, l]) => [l, scene(card({ img: 'skog-sjo', body: `<div class="row" style="gap:6px"><span class="tag" style="border-radius:${n}px">Ny</span><span class="tag" style="border-radius:${n}px">Populär</span><span class="tag" style="border-radius:${n}px">3 dagar</span></div>` + H3 }))])),

    Q('yt-rund-dialog', 'Hur rund ska en dialogruta vara?',
      [0, 8, 12, 16, 24].map(n => ['Dialog ' + (n ? n + ' px' : '0 px, raka hörn'), `<div style="background:rgba(26,28,30,.5);padding:28px 20px;height:100%;display:flex;align-items:center;justify-content:center"><div style="background:var(--box);border-radius:${n}px;padding:22px;max-width:260px;width:100%;display:flex;flex-direction:column;gap:8px"><p class="h h3">Ta bort objektet?</p><p class="muted small">Det går inte att ångra efteråt.</p><div class="row" style="gap:8px;margin-top:8px;justify-content:flex-end"><span class="sb2" style="height:40px;padding:0 16px;font-size:14px">Avbryt</span><span class="sb" style="height:40px;padding:0 16px;font-size:14px">Ta bort</span></div></div></div>`])),

    Q('yt-rund-meny', 'Hur rund ska en rullgardinsmeny vara?',
      [0, 6, 10, 16].map(n => ['Meny ' + (n ? n + ' px' : '0 px, raka hörn'), scene(menu(n + 'px', '0 8px 24px rgba(26,28,30,.12)'), { mw: '230px' })])),

    Q('yt-rund-system', 'Ska rundningen vara lika på alla element eller olika per element?',
      [
        ['Allt 8 px', [8, 8, 8, 8]],
        ['Allt 16 px', [16, 16, 16, 16]],
        ['Kort 16 px, övriga 8 px', [16, 8, 8, 8]],
        ['Kort 12 px, knapp och tagg helt runda', [12, 999, 8, 999]],
        ['Kort 24, fält 12, knapp helt rund', [24, 999, 12, 999]],
        ['Allt raka hörn', [0, 0, 0, 0]],
      ].map(([l, [c, t, f, b]]) => [l, scene(card({ r: c + 'px', gap: '10px', body: `<span class="tag" style="border-radius:${t}px">Etikett</span><p class="h h3">Rubrik</p><span class="inp ph" style="width:100%;border-radius:${f}px">E-post</span><span class="sb" style="width:100%;border-radius:${b}px">Skicka</span>` }))])),

    Q('yt-rund-skala', 'Vilken rundningsskala ska systemet ha (liten, mellan, stor)?',
      [[2, 4, 8], [4, 8, 12], [4, 8, 16], [6, 12, 24], [8, 16, 32]].map(([s, m, l]) => [`${s} · ${m} · ${l} px`, scene(`<div style="display:flex;gap:10px;align-items:flex-end;flex-wrap:wrap;justify-content:center">${[[s, 'Tagg', 56, 34], [m, 'Kort', 78, 66], [l, 'Panel', 100, 90]].map(([r, t, w, h]) => `<div style="width:${w}px;height:${h}px;border-radius:${r}px;background:var(--box);border:1px solid rgba(26,28,30,.18);display:flex;align-items:flex-end;padding:6px 8px"><span class="small muted">${t}</span></div>`).join('')}</div>`)])),

    Q('yt-rund-miniatyr', 'Hur runda ska små miniatyrbilder i listor vara?',
      [[0, 'Raka hörn'], [4, '4 px'], [8, '8 px'], [999, 'Cirkel']].map(([n, l]) => [l, scene(card({ pad: '8px 16px', gap: '0', body: ['stugor-sjo', 'fjallen', 'stockholm'].map((im, i) => `<div style="display:flex;gap:12px;align-items:center;padding:10px 0;width:100%;${i ? 'border-top:1px solid rgba(26,28,30,.08)' : ''}"><img src="img/${im}.jpg" alt="Exempelbild" style="width:48px;height:48px;object-fit:cover;border-radius:${n === 999 ? '50%' : n + 'px'};flex:0 0 auto"><div style="min-width:0"><p style="font-weight:600;font-size:14px">Rubrik på en rad</p><p class="muted small">Kort text</p></div></div>`).join('') }))])),

    Q('yt-rund-inforuta', 'Hur rund ska en informationsruta i ett textflöde vara?',
      [0, 6, 12, 20].map(n => [n ? 'Inforuta ' + n + ' px' : 'Inforuta 0 px, raka hörn', scene(`<div class="stack" style="gap:12px"><p class="small muted">Ett stycke vanlig brödtext som står före rutan och ger sammanhang.</p><div style="display:flex;gap:10px;align-items:flex-start;background:var(--tint);color:var(--sink);border-radius:${n}px;padding:14px 16px">${ico(I.info, 'color:var(--brand);margin-top:1px')}<p class="small">Leveransen tar normalt två till tre arbetsdagar.</p></div><p class="small muted">Texten fortsätter efter rutan.</p></div>`, { bg: 'var(--box)' })])),

    Q('yt-rund-mobilkort', 'Hur ska kort ligga i mobilens bredd?',
      [
        ['Kant till kant, raka hörn', 0, 0, 0],
        ['Kant till kant med glipa', 0, 0, 8],
        ['Med 16 px marginal och 12 px rundning', 16, 12, 12],
      ].map(([l, m, r, g]) => [l, `<div style="padding:16px">${phone(`<div style="padding:${m}px;display:flex;flex-direction:column;gap:${g}px">${[0, 1].map(() => card({ r: r + 'px', bd: m ? BD : 'none', img: 'skog-sjo', ratio: '16/9', pad: '14px', gap: '4px', body: '<p class="h" style="font-size:16px">Rubrik på en rad</p><p class="muted small">Kort text</p>' })).join('')}</div>`)}</div>`])),

    Q('yt-rund-hornen', 'Ska alla hörn på ett kort ha samma rundning?',
      [
        ['Alla hörn lika (16 px)', '16px'],
        ['Bara övre hörnen rundade', '16px 16px 0 0'],
        ['Ett rakt hörn nere till vänster', '16px 16px 16px 0'],
        ['Diagonala hörn (bladform)', '24px 0 24px 0'],
      ].map(([l, r]) => [l, scene(card({ r, img: 'skog-sjo' }))])),

    Q('yt-rund-storlek', 'Ska små och stora kort ha samma rundning?',
      [
        ['Samma rundning (12 px) på alla', 12, 12],
        ['Mindre kort, mindre rundning (6/20 px)', 6, 20],
      ].map(([l, s, b]) => [l, scene(`<div style="display:flex;gap:12px;align-items:flex-start;flex-wrap:wrap">${card({ r: b + 'px', st: 'flex:1 1 150px', pad: '20px', body: '<span class="eyebrow">Stort kort</span><p class="h h3">Rubrik som är två rader lång</p><p class="muted small">Text på några rader.</p>' })}${card({ r: s + 'px', st: 'flex:0 1 96px', pad: '12px', gap: '2px', body: '<span class="small muted">Litet</span><p class="price">24</p>' })}</div>`, { mw: '340px' })])),

    Q('yt-rund-storbild', 'Hur rund ska en stor bild i sidans innehåll vara?',
      [0, 12, 24, 40].map(n => [n ? 'Stor bild ' + n + ' px' : 'Stor bild 0 px, raka hörn', `<div style="background:var(--box);padding:24px">${IMG('fjallen', 'auto', `height:190px;border-radius:${n}px`)}</div>`]), 'stack'),

    Q('yt-rund-lista', 'Hur rund ska en inramad lista eller tabell vara?',
      [0, 8, 12, 16].map(n => ['Lista ' + (n ? n + ' px' : '0 px, raka hörn'), scene(`<div style="background:var(--box);border:${BD};border-radius:${n}px;overflow:hidden">${['Rad ett', 'Rad två', 'Rad tre'].map((t, i) => `<div style="display:flex;justify-content:space-between;gap:10px;padding:14px 16px;${i ? 'border-top:1px solid rgba(26,28,30,.08)' : ''}"><span>${t}</span><span class="price">495 kr</span></div>`).join('')}</div>`)])),

    Q('yt-rund-bottenpanel', 'Hur runda ska övre hörnen på en panel som glider upp i mobilen vara?',
      [0, 12, 20, 28].map(n => [n ? 'Övre hörn ' + n + ' px' : 'Raka hörn', `<div style="padding:16px">${phone(`<div style="position:absolute;inset:0;background:rgba(26,28,30,.45)"></div><div style="position:absolute;left:0;right:0;bottom:0;background:var(--box);border-radius:${n}px ${n}px 0 0;padding:10px 16px 20px;display:flex;flex-direction:column;gap:10px"><div style="width:36px;height:4px;border-radius:2px;background:rgba(26,28,30,.2);margin:0 auto 4px"></div><p class="h h3">Filter</p><span class="inp ph">Välj kategori</span><span class="inp ph">Välj pris</span><span class="sb">Visa resultat</span></div>`)}</div>`])),
  ];

  // Meny som används i flera frågor
  function menu(r, sh, bd) {
    return `<div style="position:relative"><span class="inp" style="justify-content:space-between;gap:8px">Sortera ${ico(I.chev)}</span><div style="margin-top:6px;background:var(--box);border-radius:${r};border:${bd || BD};box-shadow:${sh};overflow:hidden;padding:4px 0">${['Senaste', 'Pris, lägst först', 'Pris, högst först', 'Populärast'].map((t, i) => `<div style="padding:10px 14px;font-size:14px;${i === 1 ? 'background:var(--tint);font-weight:600' : ''}">${t}</div>`).join('')}</div></div>`;
  }

  // ---------- Skuggor ----------
  const SH = {
    none: 'none',
    hair: '0 1px 2px rgba(26,28,30,.12)',
    soft: '0 12px 32px rgba(26,28,30,.10)',
    layer: '0 1px 2px rgba(26,28,30,.06),0 4px 8px rgba(26,28,30,.06),0 16px 32px rgba(26,28,30,.08)',
    hard: '5px 5px 0 rgba(26,28,30,.9)',
    color: '0 12px 28px -6px rgba(36,64,94,.38)',
  };
  const sc = (sh, extra = {}) => scene(card({ bd: 'none', sh, body: EB + H3 + TX + PR, ...extra }), { pad: '32px 28px' });
  const skuggor = [
    Q('yt-skugga-typ', 'Vilken sorts skugga ska kort ha?',
      [['Ingen skugga', SH.none], ['Hårfin skugga (0 1px)', SH.hair], ['Mjuk och diffus', SH.soft], ['Flera lager', SH.layer], ['Hård, förskjuten', SH.hard], ['Färgad skugga', SH.color]].map(([l, s]) => [l, sc(s)])),

    Q('yt-skugga-styrka', 'Hur stark ska en mjuk kortskugga vara?',
      [['Mycket svag (4 %)', .04], ['Svag (8 %)', .08], ['Tydlig (14 %)', .14], ['Kraftig (22 %)', .22]].map(([l, a]) => [l, sc(`0 10px 28px rgba(26,28,30,${a})`)])),

    Q('yt-skugga-spridning', 'Hur utspridd ska skuggan vara?',
      [['Skarp (4 px oskärpa)', 4], ['Lite mjuk (12 px)', 12], ['Mjuk (24 px)', 24], ['Mycket diffus (48 px)', 48]].map(([l, b]) => [l, sc(`0 8px ${b}px rgba(26,28,30,.13)`)])),

    Q('yt-skugga-riktning', 'Åt vilket håll ska skuggan falla?',
      [['Rakt nedåt', '0 12px 26px rgba(26,28,30,.13)'], ['Jämnt runt om', '0 0 30px rgba(26,28,30,.15)'], ['Snett nedåt höger', '10px 12px 26px rgba(26,28,30,.13)']].map(([l, s]) => [l, sc(s)])),

    Q('yt-skugga-hover', 'När ska kortet ha skugga? (alternativen växlar mellan vila och hover)',
      [
        ['Alltid, ingen ändring vid hover', SH.soft, SH.soft],
        ['Bara vid hover', '0 0 0 rgba(26,28,30,0)', '0 14px 34px rgba(26,28,30,.14)'],
        ['Svag alltid, starkare vid hover', SH.hair, '0 14px 34px rgba(26,28,30,.14)'],
        ['Aldrig skugga', 'none', 'none'],
      ].map(([l, a, b]) => { const p = uid(); return [l, hov(p, [['', 'box-shadow:' + a, 'box-shadow:' + b]]) + scene(card({ bd: 'none', sh: '', cls: p, body: EB + H3 + TX + PR }), { pad: '32px 28px' })]; })),

    Q('yt-skugga-meny', 'Hur stor skugga ska menyer och utfällda paneler ha?',
      [['Ingen skugga, bara kant', 'none'], ['Hårfin skugga', SH.hair], ['Mellanstor skugga', '0 8px 24px rgba(26,28,30,.12)'], ['Stor och diffus', '0 22px 50px rgba(26,28,30,.18)']].map(([l, s]) => [l, `<div style="background:var(--box);padding:24px;position:relative;height:100%"><div class="stack" style="gap:8px;opacity:.55">${'<div style="height:10px;border-radius:5px;background:rgba(26,28,30,.12)"></div>'.repeat(3)}</div><div style="position:relative;max-width:220px;margin:-18px auto 0">${menu('10px', s)}</div><div class="stack" style="gap:8px;opacity:.55;margin-top:14px">${'<div style="height:10px;border-radius:5px;background:rgba(26,28,30,.12)"></div>'.repeat(2)}</div></div>`])),

    Q('yt-skugga-bild', 'Ska fristående bilder ha skugga?',
      [['Ingen skugga', 'none'], ['Mjuk skugga', '0 14px 30px rgba(26,28,30,.2)'], ['Hård, förskjuten skugga', '8px 8px 0 rgba(26,28,30,.9)']].map(([l, s]) => [l, scene(IMG('stugor-sjo', '4/3', `border-radius:12px;box-shadow:${s}`), { pad: '32px 28px' })])),

    Q('yt-skugga-nivaer', 'Hur många skuggnivåer ska systemet ha?',
      [
        ['En nivå för allt', [SH.hair, SH.hair, SH.hair]],
        ['Två nivåer: kort, och flytande ytor', [SH.hair, '0 18px 40px rgba(26,28,30,.16)', '0 18px 40px rgba(26,28,30,.16)']],
        ['Tre nivåer: kort, meny, dialog', [SH.hair, '0 8px 20px rgba(26,28,30,.12)', '0 24px 56px rgba(26,28,30,.2)']],
      ].map(([l, s]) => [l, scene(`<div style="display:flex;gap:14px;justify-content:center;flex-wrap:wrap">${['Kort', 'Meny', 'Dialog'].map((t, i) => `<div style="width:70px;height:64px;border-radius:10px;background:var(--box);box-shadow:${s[i]};display:flex;align-items:flex-end;padding:7px 9px"><span class="small muted">${t}</span></div>`).join('')}</div>`, { pad: '40px 20px' })])),

    Q('yt-skugga-med-kant', 'Ska ett kort med skugga också ha en kant?',
      [['Bara skugga', 'none'], ['Skugga och ljus kant', '1px solid rgba(26,28,30,.08)'], ['Skugga och tydligare kant', '1px solid rgba(26,28,30,.2)']].map(([l, b]) => [l, scene(card({ bd: b, sh: '0 10px 26px rgba(26,28,30,.10)', body: EB + H3 + TX + PR }), { pad: '32px 28px', bg: 'var(--box)' })])),

    Q('yt-skugga-hard-storlek', 'Om kort får hård, förskjuten skugga: hur långt ska den förskjutas?',
      [2, 4, 8].map(n => [n + ' px förskjutning', scene(card({ bd: '1px solid #1A1C1E', sh: `${n}px ${n}px 0 #1A1C1E`, body: EB + H3 + TX + PR }), { pad: '32px 28px' })])),
  ];

  // ---------- Kanter ----------
  const kc = (bd, o = {}) => scene(card({ bd, body: EB + H3 + TX + PR, ...o }), { bg: o.page || 'var(--ground)' });
  const kanter = [
    Q('yt-kant-typ', 'Vilken kant ska kort ha?',
      [['Ingen kant', 'none'], ['1 px ljus kant', '1px solid rgba(26,28,30,.10)'], ['1 px mörk kant', '1px solid rgba(26,28,30,.75)'], ['2 px kant', '2px solid rgba(26,28,30,.18)'], ['Färgad kant', '1px solid var(--brand)']].map(([l, b]) => [l, kc(b)])),

    Q('yt-kant-styrka', 'Hur synlig ska en tunn kortkant vara?',
      [['Knappt synlig (6 %)', .06], ['Diskret (10 %)', .10], ['Tydlig (16 %)', .16], ['Markerad (26 %)', .26]].map(([l, a]) => [l, kc(`1px solid rgba(26,28,30,${a})`)])),

    Q('yt-kant-gra-sida', 'Hur ska kort skiljas från en ljusgrå sidbakgrund?',
      [['Vit yta, inget mer', 'none', 'none'], ['Vit yta och tunn kant', BD, 'none'], ['Vit yta och mjuk skugga', 'none', '0 8px 22px rgba(26,28,30,.08)']].map(([l, b, s]) => [l, kc(b, { sh: s })])),

    Q('yt-kant-vit-sida', 'Hur ska kort skiljas från en vit sidbakgrund?',
      [
        ['Tunn kant', { bd: BD }],
        ['Mjuk skugga', { bd: 'none', sh: '0 8px 24px rgba(26,28,30,.10)' }],
        ['Grå, tonad yta', { bd: 'none', bg: 'var(--ground)' }],
        ['Kant och skugga', { bd: BD, sh: '0 6px 18px rgba(26,28,30,.07)' }],
      ].map(([l, o]) => [l, scene(card({ body: EB + H3 + TX + PR, ...o }), { bg: '#fff', pad: '30px 26px' })])),

    Q('yt-kant-hover', 'Ska kantfärgen ändras när man hovrar över kortet? (alternativen växlar mellan vila och hover)',
      [
        ['Ingen ändring', 'rgba(26,28,30,.12)', 'rgba(26,28,30,.12)', '1px'],
        ['Mörkare grå kant', 'rgba(26,28,30,.12)', 'rgba(26,28,30,.5)', '1px'],
        ['Kant i accentfärg', 'rgba(26,28,30,.12)', '#24405E', '1px'],
      ].map(([l, a, b]) => { const p = uid(); return [l, hov(p, [['', 'border-color:' + a, 'border-color:' + b]]) + scene(card({ bd: '1px solid', cls: p, body: EB + H3 + TX + PR }))]; })),

    Q('yt-kant-vald', 'Hur ska ett valt kort markeras?',
      [
        ['2 px kant i accentfärg', 'border:2px solid var(--brand)', ''],
        ['Ring utanför kortet', 'border:1px solid var(--brand);box-shadow:0 0 0 3px rgba(36,64,94,.25)', ''],
        ['Tonad yta och kant', 'border:1px solid var(--brand);background:var(--tint)', ''],
        ['Bock i hörnet och kant', 'border:2px solid var(--brand)', 'check'],
      ].map(([l, sel, ex]) => [l, scene(`<div class="stack" style="gap:10px">${[0, 1].map(i => `<div style="position:relative;background:var(--box);border:1px solid rgba(26,28,30,.14);border-radius:12px;padding:14px 16px;display:flex;justify-content:space-between;gap:10px;align-items:center;${i ? sel : ''}"><div><p style="font-weight:600">Alternativ ${i ? 'B' : 'A'}</p><p class="muted small">Kort beskrivning</p></div><span class="price">${i ? '695' : '495'} kr</span>${i && ex ? `<span style="position:absolute;top:-8px;right:-8px;width:22px;height:22px;border-radius:50%;background:var(--brand);color:#fff;display:grid;place-items:center">${ico(I.check, 'width:14px;height:14px;stroke-width:3')}</span>` : ''}</div>`).join('')}</div>`)])),

    Q('yt-kant-inforuta', 'Hur ska en markerad ruta i texten avgränsas?',
      [
        ['Färgad vänsterkant', 'border-left:3px solid var(--brand);background:transparent'],
        ['Tunn kant runt om', `border:${BD};background:transparent`],
        ['Tonad yta utan kant', 'background:var(--tint)'],
        ['Tonad yta och vänsterkant', 'background:var(--tint);border-left:3px solid var(--brand)'],
      ].map(([l, s]) => [l, scene(`<div class="stack" style="gap:12px"><p class="small muted">Ett stycke vanlig brödtext som står före rutan.</p><div style="padding:14px 16px;border-radius:4px;${s}"><p style="font-weight:600;font-size:14px">Bra att veta</p><p class="small">Leveransen tar normalt två till tre arbetsdagar.</p></div><p class="small muted">Texten fortsätter efter rutan.</p></div>`, { bg: 'var(--box)' })])),

    Q('yt-kant-bild', 'Ska ljusa bilder få en hårfin kant mot vit yta?',
      [
        ['Ingen kant', ''],
        ['Hårfin inre kant', 'inset'],
        ['Tunn kant runt bilden', 'outer'],
      ].map(([l, k]) => [l, scene(`<div style="position:relative;border-radius:10px;overflow:hidden;${k === 'outer' ? 'border:1px solid rgba(26,28,30,.18)' : ''}">${IMG('produkt-hudvard', '1/1')}${k === 'inset' ? '<span style="position:absolute;inset:0;border-radius:10px;box-shadow:inset 0 0 0 1px rgba(26,28,30,.12)"></span>' : ''}</div><p style="font-weight:600;margin-top:10px">Rubrik på en rad</p><p class="price">Från 495 kr</p>`, { bg: '#fff', mw: '220px' })])),

    Q('yt-kant-kortfot', 'Hur ska kortets nederdel (pris och knapp) skiljas från innehållet?',
      [
        ['Tunn linje', 'line'],
        ['Tonad fotyta', 'tone'],
        ['Bara luft', 'air'],
      ].map(([l, k]) => [l, scene(`<div style="background:var(--box);border:${BD};border-radius:12px;overflow:hidden"><div style="padding:20px 20px ${k === 'air' ? '6px' : '16px'}" class="stack">${EB}${H3}${TX}</div><div style="padding:${k === 'air' ? '10px 20px 20px' : '14px 20px'};display:flex;justify-content:space-between;align-items:center;gap:10px;${k === 'line' ? 'border-top:1px solid rgba(26,28,30,.10)' : ''}${k === 'tone' ? 'background:var(--ground)' : ''}"><span class="price">Från 495 kr</span>${LNK}</div></div>`)])),

    Q('yt-kant-tomt', 'Hur ska ett tomt kort för "Lägg till" se ut?',
      [
        ['Streckad kant', 'border:2px dashed rgba(26,28,30,.25);background:transparent'],
        ['Heldragen ljus kant', `border:${BD};background:var(--box)`],
        ['Tonad yta utan kant', 'background:var(--tint)'],
        ['Streckad kant och tonad yta', 'border:2px dashed rgba(36,64,94,.35);background:var(--tint)'],
      ].map(([l, s]) => [l, scene(`<div style="border-radius:12px;min-height:170px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;color:var(--brand);${s}">${ico(I.plus, 'width:26px;height:26px')}<span style="font-weight:600">Lägg till</span></div>`)])),

    Q('yt-kant-lista', 'Hur ska en lista med objekt ramas in?',
      [
        ['En ram med linjer mellan raderna', 'frame'],
        ['Ett kort per rad', 'cards'],
        ['Bara linjer, ingen ram', 'lines'],
        ['Växlande tonade rader', 'zebra'],
      ].map(([l, k]) => {
        const rows = ['Rad ett', 'Rad två', 'Rad tre'].map((t, i) => {
          const st = k === 'cards' ? `background:var(--box);border:${BD};border-radius:10px` : k === 'zebra' ? (i % 2 ? '' : 'background:var(--box);border-radius:8px') : i ? 'border-top:1px solid rgba(26,28,30,.10)' : '';
          return `<div style="display:flex;justify-content:space-between;gap:10px;padding:13px 14px;${st}"><span>${t}</span><span class="muted small">Detalj</span></div>`;
        }).join('');
        const wrap = k === 'frame' ? `background:var(--box);border:${BD};border-radius:12px;overflow:hidden` : k === 'cards' ? 'display:flex;flex-direction:column;gap:8px' : '';
        return [l, scene(`<div style="${wrap}">${rows}</div>`)];
      })),

    Q('yt-kant-markering', 'Ska kort kunna ha en färgad markeringslinje?',
      [
        ['Ingen markeringslinje', ''],
        ['Färgad linje överst', 'border-top:4px solid var(--brand)'],
        ['Färgad linje till vänster', 'border-left:4px solid var(--brand)'],
      ].map(([l, s]) => [l, kc(BD, { st: s })])),
  ];

  window.QZ.part({
    key: 'ytor',
    groups: [
      { key: 'rundning', title: 'Rundning', questions: rundning },
      { key: 'skuggor', title: 'Skuggor', questions: skuggor },
      { key: 'kanter', title: 'Kanter', questions: kanter },
    ],
  });
})();
