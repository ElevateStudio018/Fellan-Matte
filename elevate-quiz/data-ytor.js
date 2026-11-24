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

  // ---------- Fler hjälpare ----------
  // Bild som bakgrund med text på: o.img, o.ratio, o.shade (CSS-bakgrund för mörkläggning), o.pos (flex-end|flex-start|center), o.body, o.r, o.center
  function overlay(o = {}) {
    return `<div style="position:relative;border-radius:${o.r ?? '12px'};overflow:hidden;aspect-ratio:${o.ratio || '4/5'};display:flex;flex-direction:column;justify-content:${o.pos || 'flex-end'};--sink:#fff;--smuted:rgba(255,255,255,.82);color:#fff;${o.st || ''}"><img src="img/${o.img || 'skog-sjo'}.jpg" alt="Exempelbild" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;max-width:none;${o.imgSt || ''}"><div style="position:absolute;inset:0;background:${o.shade ?? 'linear-gradient(180deg,rgba(0,0,0,0) 35%,rgba(0,0,0,.68))'}"></div><div style="position:relative;padding:${o.pad || '20px'};display:flex;flex-direction:column;gap:6px;${o.center ? 'align-items:center;text-align:center' : 'align-items:flex-start'}">${o.body ?? (EB + '<p class="h h3">Rubrik som är två rader lång</p>')}</div></div>`;
  }
  // Liggande kort: o.w bildbredd, o.mode (fill|inset|mini), o.body
  function hcard(o = {}) {
    const body = o.body ?? (EB + '<p class="h h3">Rubrik på en rad</p>' + TX);
    const m = o.mode || 'fill';
    const im = m === 'fill'
      ? `<img src="img/${o.img || 'skog-sjo'}.jpg" alt="Exempelbild" style="width:${o.w || '40%'};flex:0 0 ${o.w || '40%'};object-fit:cover;align-self:stretch;min-height:100%">`
      : `<img src="img/${o.img || 'skog-sjo'}.jpg" alt="Exempelbild" style="width:${m === 'mini' ? 56 : 92}px;height:${m === 'mini' ? 56 : 92}px;flex:0 0 auto;object-fit:cover;border-radius:${m === 'mini' ? 8 : 10}px;margin:14px 0 14px 14px">`;
    return `<div style="display:flex;background:var(--box);border:${BD};border-radius:12px;overflow:hidden;min-width:0;align-items:${m === 'fill' ? 'stretch' : 'center'}">${im}<div style="padding:16px;display:flex;flex-direction:column;gap:6px;min-width:0;flex:1">${body}</div></div>`;
  }
  const TAG = '<span class="tag">Etikett</span>';
  const ICO_CAL = '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>';
  const ICO_CLK = '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>';
  const ICO_LAY = '<path d="M12 3l9 5-9 5-9-5 9-5z"/><path d="M3 13l9 5 9-5"/>';
  const smallBtn = (t, st) => `<span class="sb" style="height:40px;padding:0 16px;font-size:14px;${st || ''}">${t}</span>`;

  // ---------- Kortets yta ----------
  const yta = [
    Q('yt-yta-kort', 'Vilken yta ska kort ha?',
      [
        ['Vit yta på grå sida', 'var(--ground)', { bg: 'var(--box)', bd: 'none' }],
        ['Grå yta på vit sida', '#fff', { bg: 'var(--ground)', bd: 'none' }],
        ['Tonad yta på vit sida', '#fff', { bg: 'var(--tint)', bd: 'none' }],
        ['Ingen yta, bara bild och text', '#fff', { bg: 'transparent', bd: 'none', r: '0', pad: '14px 0 0', imgSt: 'border-radius:12px' }],
      ].map(([l, page, o]) => [l, scene(card({ img: 'skog-sjo', body: EB + H3 + TX, ...o }), { bg: page })])),

    Q('yt-yta-sida', 'Vilken bakgrund ska sidan ha bakom vita kort?',
      [['Vit (#FFFFFF)', '#FFFFFF'], ['Benvit (#F6F6F4)', '#F6F6F4'], ['Ljusgrå (#EEF0F2)', '#EEF0F2'], ['Svagt tonad (#E6EBF0)', '#E6EBF0']].map(([l, c]) => [l, scene(`<p class="h h3" style="margin-bottom:12px">Rubrik för sektionen</p><div style="display:flex;gap:10px;flex-wrap:wrap">${[0, 1].map(() => card({ pad: '14px', gap: '4px', st: 'flex:1 1 120px', body: '<p class="h" style="font-size:16px">Rubrik</p><p class="muted small">Kort text på två rader här.</p>' })).join('')}</div>`, { bg: c, mw: '340px' })])),

    Q('yt-yta-ton', 'Om kort får en tonad yta: hur stark ska tonen vara?',
      [['Svag ton (4 %)', 4], ['Tydlig ton (8 %)', 8], ['Stark ton (14 %)', 14]].map(([l, n]) => [l, scene(card({ bd: 'none', bg: `color-mix(in srgb, var(--brand) ${n}%, #fff)`, body: EB + H3 + TX + PR }), { bg: '#fff' })])),

    Q('yt-yta-inre', 'Hur ska en ruta inuti ett kort markeras?',
      [
        ['Nedsänkt med inre skugga', 'box-shadow:inset 0 1px 4px rgba(26,28,30,.16)'],
        ['Grå yta', 'background:var(--ground)'],
        ['Tunn kant', `border:${BD}`],
        ['Tonad yta', 'background:var(--tint)'],
      ].map(([l, s]) => [l, scene(card({ gap: '10px', body: `<p class="h h3">Sammanfattning</p><p class="muted small">Kort text om innehållet.</p><div style="width:100%;border-radius:8px;padding:12px 14px;display:flex;justify-content:space-between;gap:10px;${s}"><span class="small">3 st</span><span class="price">1 485 kr</span></div>` }))])),

    Q('yt-yta-utvald', 'Hur ska ett utvalt kort skilja sig från de andra?',
      [
        ['Mörk yta', 'background:var(--brand);border-color:var(--brand);--sink:#fff;--smuted:rgba(255,255,255,.75);color:#fff', ''],
        ['Tonad yta', 'background:var(--tint);border-color:var(--tint)', ''],
        ['Kant i accentfärg', 'border:2px solid var(--brand)', ''],
        ['Starkare skugga', 'border-color:transparent;box-shadow:0 14px 32px rgba(26,28,30,.16)', ''],
        ['Bara en etikett ovanför', '', 'tag'],
      ].map(([l, s, ex]) => [l, scene(`<div style="display:flex;gap:10px;align-items:flex-end;flex-wrap:wrap">${[0, 1].map(i => `<div style="flex:1 1 100px;min-width:0;display:flex;flex-direction:column;gap:6px">${ex && i ? '<span class="tag" style="align-self:flex-start">Populär</span>' : ''}<div style="background:var(--box);border:${BD};border-radius:12px;padding:16px;display:flex;flex-direction:column;gap:4px;${i ? s : ''}"><span class="eyebrow">${i ? 'Plus' : 'Bas'}</span><p class="h h3">${i ? '695' : '495'} kr</p><p class="muted small">per månad</p></div></div>`).join('')}</div>`, { mw: '300px' })])),

    Q('yt-yta-tonad-sektion', 'Hur ska kort se ut när de ligger på en tonad sektion?',
      [
        ['Vit yta', { bg: 'var(--box)', bd: 'none' }],
        ['Ingen yta, bara bild och text', { bg: 'transparent', bd: 'none', r: '0', pad: '14px 0 0', imgSt: 'border-radius:12px' }],
        ['Bara en kant, ingen yta', { bg: 'transparent', bd: '1px solid rgba(36,64,94,.25)' }],
      ].map(([l, o]) => [l, scene(card({ img: 'skog-sjo', body: EB + H3 + TX, ...o }), { bg: 'var(--tint)' })])),

    Q('yt-yta-sidopanel', 'Hur ska en sidopanel bredvid innehållet se ut?',
      [
        ['Kort med kant', `background:var(--box);border:${BD};border-radius:12px;padding:20px`],
        ['Grå yta', 'background:var(--ground);border-radius:12px;padding:20px'],
        ['Bara en linje till vänster', 'border-left:1px solid rgba(26,28,30,.14);padding:4px 0 4px 24px'],
        ['Kort med skugga', 'background:var(--box);border-radius:12px;padding:20px;box-shadow:0 10px 30px rgba(26,28,30,.10)'],
      ].map(([l, s]) => [l, `<div style="background:#fff;padding:24px;display:flex;gap:28px;flex-wrap:wrap;align-items:flex-start"><div style="flex:2 1 260px;min-width:0" class="stack"><p class="h h2">Rubrik för innehållet</p><p class="muted">Huvudinnehållet står till vänster och kan vara flera stycken långt. Det här är ett exempel på brödtext.</p><p class="muted">Ett andra stycke med lite mer text för att visa hur ytan bredvid förhåller sig.</p></div><div style="flex:1 1 220px;min-width:0;display:flex;flex-direction:column;gap:10px;${s}"><p class="h h3">Sammanfattning</p><div style="display:flex;justify-content:space-between"><span class="muted">Delsumma</span><span>990 kr</span></div><div style="display:flex;justify-content:space-between"><span class="muted">Frakt</span><span>49 kr</span></div><div class="divider"></div><div style="display:flex;justify-content:space-between"><span style="font-weight:600">Totalt</span><span class="price">1 039 kr</span></div><span class="sb" style="margin-top:6px">Fortsätt</span></div></div>`]), 'stack'),
  ];

  // ---------- Kortets uppbyggnad ----------
  const H3one = '<p class="h h3">Rubrik på en rad</p>';
  const uppbyggnad = [
    Q('yt-upp-bild', 'Var ska bilden sitta i ett kort?',
      [
        ['Bild överst', card({ img: 'skog-sjo', body: EB + H3one + TX })],
        ['Bild till vänster', hcard({ body: EB + H3one + TX })],
        ['Bild som bakgrund med text på', overlay({ ratio: '4/4', body: EB + H3one + '<p class="small" style="color:rgba(255,255,255,.85)">Kort beskrivande text på en eller två rader.</p>' })],
        ['Ingen bild', card({ body: EB + H3one + TX })],
      ].map(([l, h]) => [l, scene(h, { mw: '300px' })])),

    Q('yt-upp-utfyllnad', 'Hur mycket luft ska det vara inuti kortet?',
      [12, 16, 20, 24, 32].map(n => [n + ' px utfyllnad', scene(card({ img: 'skog-sjo', pad: n + 'px', body: EB + H3 + TX + PR }))])),

    Q('yt-upp-bild-luft', 'Ska bilden gå ut i kortets kanter eller ligga infälld?',
      [
        ['Utfallande till kanterna', card({ img: 'skog-sjo', body: EB + H3 + TX })],
        ['Infälld med 8 px luft', `<div style="background:var(--box);border:${BD};border-radius:12px;padding:8px">${IMG('skog-sjo', '3/2', 'border-radius:8px')}<div class="stack" style="gap:8px;padding:12px 12px 12px">${EB}${H3}${TX}</div></div>`],
        ['Infälld med 20 px luft', `<div style="background:var(--box);border:${BD};border-radius:12px;padding:20px">${IMG('skog-sjo', '3/2', 'border-radius:8px')}<div class="stack" style="gap:8px;padding-top:16px">${EB}${H3}${TX}</div></div>`],
      ].map(([l, h]) => [l, scene(h)])),

    Q('yt-upp-etikett', 'Var ska kortets etikett sitta?',
      [
        ['Ovanför rubriken', 'above'], ['På bilden, uppe till vänster', 'img'], ['Under rubriken', 'below'], ['Ingen etikett', 'none'],
      ].map(([l, k]) => [l, scene(`<div style="background:var(--box);border:${BD};border-radius:12px;overflow:hidden"><div style="position:relative">${IMG('skog-sjo')}${k === 'img' ? '<span class="tag" style="position:absolute;top:12px;left:12px;background:#fff">Etikett</span>' : ''}</div><div style="padding:20px;display:flex;flex-direction:column;gap:8px;align-items:flex-start">${k === 'above' ? TAG : ''}${H3}${k === 'below' ? TAG : ''}${TX}</div></div>`)])),

    Q('yt-upp-pris', 'Var ska priset sitta i kortet?',
      [
        ['Direkt under rubriken', 'under'], ['Nederst, länk till höger', 'foot'], ['Bredvid rubriken, till höger', 'side'], ['På bilden', 'img'],
      ].map(([l, k]) => {
        const pr = '<span class="price" style="white-space:nowrap">495 kr</span>';
        return [l, scene(`<div style="background:var(--box);border:${BD};border-radius:12px;overflow:hidden"><div style="position:relative">${IMG('skog-sjo')}${k === 'img' ? `<span style="position:absolute;left:12px;bottom:12px;background:#fff;border-radius:999px;padding:4px 12px">${pr}</span>` : ''}</div><div style="padding:20px;display:flex;flex-direction:column;gap:8px">${k === 'side' ? `<div style="display:flex;justify-content:space-between;gap:12px;align-items:flex-start">${H3}${pr}</div>` : H3}${k === 'under' ? pr : ''}${TX}${k === 'foot' ? `<div style="display:flex;justify-content:space-between;align-items:center;gap:10px;margin-top:4px">${pr}${LNK}</div>` : `<div style="margin-top:4px">${LNK}</div>`}</div></div>`)];
      })),

    Q('yt-upp-ordning', 'I vilken ordning ska innehållet stå i kortet?',
      [
        ['Etikett, rubrik, text, pris, knapp', ['t', 'h', 'x', 'p', 'b']],
        ['Etikett, rubrik, pris, text, knapp', ['t', 'h', 'p', 'x', 'b']],
        ['Rubrik, text, etikett, pris, knapp', ['h', 'x', 't', 'p', 'b']],
        ['Pris, rubrik, text, etikett, knapp', ['p', 'h', 'x', 't', 'b']],
      ].map(([l, ord]) => { const m = { t: TAG, h: H3, x: TX, p: PR, b: smallBtn('Boka tid', 'margin-top:4px') }; return [l, scene(card({ img: 'skog-sjo', ratio: '16/9', body: ord.map(k => m[k]).join('') }))]; })),

    Q('yt-upp-cta', 'Hur ska kortet leda vidare?',
      [
        ['Knapp', smallBtn('Läs mer', 'margin-top:4px')],
        ['Textlänk', `<span class="link" style="margin-top:4px">Läs mer</span>`],
        ['Pil-ikon', `<span style="margin-top:4px;color:var(--brand)">${ico(I.arrow, 'width:24px;height:24px')}</span>`],
        ['Inget, hela kortet är klickbart', ''],
      ].map(([l, f]) => [l, scene(card({ img: 'skog-sjo', body: EB + H3 + TX + f }))])),

    Q('yt-upp-knapp-bredd', 'Hur bred ska knappen vara i ett kort?',
      [['Full bredd', 'width:100%;margin-top:6px'], ['Efter texten i knappen', 'margin-top:6px']].map(([l, s]) => [l, scene(card({ img: 'skog-sjo', body: EB + H3 + TX + `<span class="sb" style="${s}">Boka tid</span>` }))])),

    Q('yt-upp-knapptyp', 'Vilken sorts knapp ska sitta i ett kort?',
      [
        ['Fylld knapp', '<span class="sb" style="margin-top:6px">Boka tid</span>'],
        ['Konturknapp', '<span class="sb2" style="margin-top:6px">Boka tid</span>'],
        ['Tonad knapp', '<span class="sb" style="margin-top:6px;background:var(--tint);border-color:var(--tint);color:var(--brand)">Boka tid</span>'],
      ].map(([l, b]) => [l, scene(card({ img: 'skog-sjo', body: EB + H3 + TX + b }))])),

    Q('yt-upp-klickbar', 'Om hela kortet är klickbart: hur ska det synas?',
      [
        ['Pil uppe till höger', 'ur'], ['Rund pilknapp nere till höger', 'circle'], ['Understruken rubrik', 'under'], ['Inget extra tecken', 'none'],
      ].map(([l, k]) => [l, scene(`<div style="position:relative;background:var(--box);border:${BD};border-radius:12px;overflow:hidden">${IMG('skog-sjo')}<div style="padding:20px;display:flex;flex-direction:column;gap:8px;position:relative">${EB}${k === 'under' ? H3.replace('class="h h3"', 'class="h h3" style="text-decoration:underline;text-underline-offset:4px;text-decoration-thickness:2px"') : H3}${TX}${k === 'ur' ? `<span style="position:absolute;top:18px;right:18px;color:var(--sink)">${ico(I.arrowUR)}</span>` : ''}${k === 'circle' ? `<span style="align-self:flex-end;width:38px;height:38px;border-radius:50%;background:var(--tint);color:var(--brand);display:grid;place-items:center">${ico(I.arrow, 'width:18px;height:18px')}</span>` : ''}</div></div>`)])),

    Q('yt-upp-hover', 'Vad ska hända när man hovrar över ett kort? (alternativen växlar mellan vila och hover)',
      [
        ['Kortet lyfts', [['', 'transform:translateY(0);box-shadow:0 0 0 rgba(26,28,30,0)', 'transform:translateY(-6px);box-shadow:0 14px 30px rgba(26,28,30,.14)']], {}],
        ['Skuggan växer', [['', 'box-shadow:0 0 0 rgba(26,28,30,0)', 'box-shadow:0 14px 30px rgba(26,28,30,.14)']], {}],
        ['Bilden zoomar', [[' img', 'transform:scale(1)', 'transform:scale(1.07)']], {}],
        ['Kanten får accentfärg', [['', 'border-color:rgba(26,28,30,.12)', 'border-color:#24405E']], { bd: '1px solid' }],
        ['Ytan tonas', [['', 'background-color:#fff', 'background-color:#E6EBF0']], { bg: '' }],
        ['Ingen förändring', [], {}],
      ].map(([l, parts, o]) => { const p = uid(); return [l, (parts.length ? hov(p, parts) : '') + scene(cardZ({ cls: p, ...o }), { pad: '30px 24px' })]; })),

    Q('yt-upp-lyft', 'Om kortet lyfts vid hover: hur mycket? (alternativen växlar mellan vila och hover)',
      [2, 4, 8].map(n => { const p = uid(); return ['Lyft ' + n + ' px', hov(p, [['', 'transform:translateY(0);box-shadow:0 1px 2px rgba(26,28,30,.08)', `transform:translateY(-${n}px);box-shadow:0 ${n + 6}px ${n * 3 + 12}px rgba(26,28,30,.13)`]]) + scene(cardZ({ cls: p, bd: 'none' }), { pad: '30px 24px' })]; })),

    Q('yt-upp-zoom', 'Om bilden zoomar vid hover: hur mycket? (alternativen växlar mellan vila och hover)',
      [['Knappt märkbart (3 %)', 1.03], ['Tydligt (6 %)', 1.06], ['Kraftigt (12 %)', 1.12]].map(([l, z]) => { const p = uid(); return [l, hov(p, [[' img', 'transform:scale(1)', `transform:scale(${z})`]]) + scene(cardZ({ cls: p }), { pad: '30px 24px' })]; })),

    Q('yt-upp-textmangd', 'Hur mycket text ska ett kort visa?',
      [
        ['Bara rubrik', ''],
        ['Rubrik och en rad text', 1],
        ['Rubrik och tre rader, sedan avklippt', 3],
      ].map(([l, n]) => [l, scene(card({ img: 'skog-sjo', body: EB + H3 + (n ? `<p class="muted small" style="display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:${n};overflow:hidden">Kort beskrivande text som fortsätter över flera rader och ger mer sammanhang om innehållet innan den klipps av här.</p>` : '') + LNK }))])),

    Q('yt-upp-meta', 'Var ska metadata som datum och lästid stå?',
      [
        ['Ovanför rubriken', 'top'], ['Under texten', 'bottom'], ['I kortets fot, med ikoner', 'foot'],
      ].map(([l, k]) => {
        const meta = '<span class="small muted">12 mars · 5 min</span>';
        const foot = `<div style="display:flex;gap:16px;width:100%;border-top:1px solid rgba(26,28,30,.10);padding-top:12px;margin-top:4px" class="small muted"><span style="display:inline-flex;gap:6px;align-items:center">${ico(ICO_CAL, 'width:16px;height:16px')}12 mars</span><span style="display:inline-flex;gap:6px;align-items:center">${ico(ICO_CLK, 'width:16px;height:16px')}5 min</span></div>`;
        return [l, scene(card({ img: 'skog-sjo', body: (k === 'top' ? meta : '') + H3 + TX + (k === 'bottom' ? meta : '') + (k === 'foot' ? foot : '') }))];
      })),

    Q('yt-upp-ikonkort', 'Hur ska ikonen sitta i ett kort utan bild?',
      [
        ['Fri ikon', `<span style="color:var(--brand)">${ico(ICO_LAY, 'width:28px;height:28px')}</span>${H3s}`],
        ['Ikon i tonad fyrkant', `<span style="width:44px;height:44px;border-radius:10px;background:var(--tint);color:var(--brand);display:grid;place-items:center">${ico(ICO_LAY, 'width:22px;height:22px')}</span>${H3s}`],
        ['Ikon i tonad cirkel', `<span style="width:44px;height:44px;border-radius:50%;background:var(--tint);color:var(--brand);display:grid;place-items:center">${ico(ICO_LAY, 'width:22px;height:22px')}</span>${H3s}`],
        ['Ikon bredvid rubriken', `<div style="display:flex;gap:10px;align-items:center"><span style="color:var(--brand);display:flex">${ico(ICO_LAY, 'width:24px;height:24px')}</span>${H3s}</div>`],
      ].map(([l, top]) => [l, scene(card({ gap: '10px', body: top + TX }))])),

    Q('yt-upp-justering', 'Ska kortets innehåll vara vänsterställt eller centrerat?',
      [['Vänsterställt', false], ['Centrerat', true]].map(([l, c]) => [l, scene(card({ img: 'skog-sjo', st: c ? 'text-align:center' : '', body: `<div style="display:flex;flex-direction:column;gap:8px;width:100%;align-items:${c ? 'center' : 'flex-start'}">${EB}${H3}${TX}${LNK}</div>` }))])),

    Q('yt-upp-mobil', 'Hur ska en lista med kort visas i mobilen?',
      [
        ['Stående kort, bild överst', 'v'], ['Liggande rader, bild till vänster', 'h'], ['Textrader med pil', 't'],
      ].map(([l, k]) => {
        const items = [0, 1, 2, 3].map(() => k === 'v'
          ? card({ img: 'skog-sjo', ratio: '16/9', pad: '12px 14px', gap: '2px', body: '<p style="font-weight:600">Rubrik på en rad</p><p class="muted small">Kort text</p>' })
          : k === 'h'
            ? `<div style="display:flex;gap:12px;align-items:center;background:var(--box);border:${BD};border-radius:12px;padding:8px"><img src="img/skog-sjo.jpg" alt="Exempelbild" style="width:64px;height:64px;object-fit:cover;border-radius:8px;flex:0 0 auto"><div style="min-width:0"><p style="font-weight:600">Rubrik på en rad</p><p class="muted small">Kort text</p></div></div>`
            : `<div style="display:flex;justify-content:space-between;align-items:center;gap:10px;background:var(--box);border:${BD};border-radius:12px;padding:14px"><div><p style="font-weight:600">Rubrik på en rad</p><p class="muted small">Kort text</p></div>${ico(I.chevR, 'color:var(--smuted)')}</div>`).join('');
        return [l, `<div style="padding:16px">${phone(`<div style="padding:12px;display:flex;flex-direction:column;gap:10px">${items}</div>`)}</div>`];
      })),

    Q('yt-upp-inre-avstand', 'Hur tätt ska raderna i ett kort stå?',
      [['Tätt (4 px mellan)', 4], ['Mellan (8 px)', 8], ['Luftigt (14 px)', 14]].map(([l, g]) => [l, scene(card({ img: 'skog-sjo', gap: g + 'px', body: EB + H3 + TX + PR }))])),

    Q('yt-upp-liggande-bredd', 'Hur bred ska bilden vara i ett liggande kort?',
      [['En tredjedel', '33%'], ['Två femtedelar', '40%'], ['Halva kortet', '50%']].map(([l, w]) => [l, scene(hcard({ w }), { mw: '340px' })])),

    Q('yt-upp-liggande-bild', 'Hur ska bilden sitta i ett liggande kort?',
      [['Fyller hela höjden', 'fill'], ['Infälld med luft runt', 'inset'], ['Liten miniatyr', 'mini']].map(([l, m]) => [l, scene(hcard({ mode: m, w: '36%' }), { mw: '340px' })])),

    Q('yt-upp-siffra', 'Hur ska ett kort med en nyckelsiffra byggas?',
      [
        ['Stor siffra överst, etikett under', 'num'],
        ['Etikett överst, siffra under', 'lab'],
        ['Ikon till vänster om siffra och etikett', 'ico'],
      ].map(([l, k]) => [l, scene(`<div style="display:flex;gap:10px;flex-wrap:wrap">${[['1 240', 'Antal besök'], ['98 %', 'Andel klara']].map(([n, t]) => {
        const num = `<p style="font-size:30px;font-weight:700;line-height:1.05;font-variant-numeric:tabular-nums">${n}</p>`, lab = `<p class="small muted">${t}</p>`;
        const inner = k === 'num' ? num + lab : k === 'lab' ? lab + num : `<div style="display:flex;gap:12px;align-items:center"><span style="width:40px;height:40px;border-radius:10px;background:var(--tint);color:var(--brand);display:grid;place-items:center;flex:0 0 auto">${ico(ICO_LAY)}</span><div>${num.replace('30px', '24px')}${lab}</div></div>`;
        return `<div style="flex:1 1 120px;min-width:0;background:var(--box);border:${BD};border-radius:12px;padding:16px;display:flex;flex-direction:column;gap:4px">${inner}</div>`;
      }).join('')}</div>`, { mw: '340px' })])),

    Q('yt-upp-utfyllnad-mobil', 'Hur mycket luft ska kort ha inuti i mobilen?',
      [12, 16, 20].map(n => [n + ' px utfyllnad i mobilen', `<div style="padding:16px">${phone(`<div style="padding:12px;display:flex;flex-direction:column;gap:10px">${[0, 1].map(() => card({ img: 'skog-sjo', ratio: '16/9', pad: n + 'px', gap: '4px', body: '<span class="eyebrow">Etikett</span><p class="h" style="font-size:17px">Rubrik som är två rader lång</p><p class="price">Från 495 kr</p>' })).join('')}</div>`)}</div>`])),
  ];
  // Kort med bild i egen ram (för zoom vid hover)
  function cardZ(o = {}) {
    return `<div class="${o.cls || ''}" style="${o.bg === '' ? '' : 'background:var(--box);'}border-radius:12px;border:${o.bd ?? BD};overflow:hidden;display:flex;flex-direction:column"><div style="overflow:hidden">${IMG('skog-sjo')}</div><div style="padding:20px;display:flex;flex-direction:column;gap:8px">${EB}${H3}${TX}</div></div>`;
  }

  // ---------- Bildformat ----------
  const IMGS = ['skog-sjo', 'stugor-sjo', 'fjallen', 'stockholm', 'vardagsrum', 'kopenhamn', 'tag-hostskog', 'station-vinter'];
  const RAT = [['1:1', '1/1'], ['4:3', '4/3'], ['3:2', '3/2'], ['16:9', '16/9'], ['4:5', '4/5']];
  const format = [
    Q('yt-format-kort', 'Vilket bildformat ska kort ha?',
      RAT.map(([l, r]) => ['Format ' + l, scene(card({ img: 'stugor-sjo', ratio: r, body: EB + H3 + TX }))])),

    Q('yt-format-produkt', 'Vilket format ska produktbilder i kort ha?',
      [['Kvadratisk (1:1)', '1/1'], ['Stående (4:5)', '4/5'], ['Stående (3:4)', '3/4']].map(([l, r]) => [l, scene(card({ img: 'produkt-stol', ratio: r, pad: '14px 2px 0', bd: 'none', bg: 'transparent', r: '0', imgSt: 'border-radius:10px', gap: '2px', body: '<p style="font-weight:600">Produktnamn</p><p class="price">1 495 kr</p>' }), { mw: '220px' })])),

    Q('yt-format-stort', 'Vilket format ska bilden ha i ett stort, utvalt kort?',
      [['Bred (16:9)', '16/9'], ['Extra bred (21:9)', '21/9'], ['Klassisk (3:2)', '3/2']].map(([l, r]) => [l, `<div style="background:var(--ground);padding:24px">${card({ img: 'fjallen', ratio: r, st: 'max-width:640px;margin:0 auto', pad: '24px', body: EB + '<p class="h h2">Rubrik för ett utvalt kort</p>' + TX })}</div>`]), 'stack'),

    Q('yt-format-mobil', 'Vilket bildformat ska kort ha i mobilen?',
      [['16:9 i mobilen', '16/9'], ['4:3 i mobilen', '4/3'], ['1:1 i mobilen', '1/1']].map(([l, r]) => [l, `<div style="padding:16px">${phone(`<div style="padding:12px;display:flex;flex-direction:column;gap:10px">${[0, 1].map(i => card({ img: IMGS[i], ratio: r, pad: '12px 14px', gap: '2px', body: '<p style="font-weight:600">Rubrik på en rad</p><p class="muted small">Kort text</p>' })).join('')}</div>`)}</div>`])),

    Q('yt-format-galleri', 'Vilket format ska miniatyrer i ett bildgalleri ha?',
      [['Kvadratiska', '1/1'], ['Liggande (4:3)', '4/3'], ['Stående (3:4)', '3/4']].map(([l, r]) => [l, scene(`<div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px">${IMGS.slice(0, 6).map(n => `<img src="img/${n}.jpg" alt="Exempelbild" style="width:100%;aspect-ratio:${r};object-fit:cover;border-radius:6px">`).join('')}</div>`)])),

    Q('yt-format-person', 'Vilket format ska porträtt i personkort ha?',
      [['Kvadratiskt (1:1)', '1/1'], ['Stående (4:5)', '4/5'], ['Högt stående (3:4)', '3/4']].map(([l, r]) => [l, scene(`<div style="display:flex;gap:10px">${['portratt-1', 'portratt-2'].map((n, i) => `<div style="flex:1 1 0;min-width:0">${IMG(n, r, 'border-radius:10px;object-position:center 25%')}<p style="font-weight:600;margin-top:8px">${i ? 'Namn Efternamn' : 'Förnamn Namn'}</p><p class="muted small">Roll</p></div>`).join('')}</div>`)])),
  ];

  // ---------- Bildbehandling ----------
  function treat(k, n) {
    const im = n || 'stugor-sjo';
    if (k === 'none') return IMG(im, '4/3', 'border-radius:10px');
    if (k === 'gray') return IMG(im, '4/3', 'border-radius:10px;filter:grayscale(1)');
    if (k === 'duo') return `<div style="background:var(--brand);border-radius:10px;overflow:hidden">${IMG(im, '4/3', 'filter:grayscale(1) contrast(1.1);mix-blend-mode:screen')}</div>`;
    if (k === 'frame') return `<div style="background:#fff;padding:10px;border-radius:4px;box-shadow:0 4px 16px rgba(26,28,30,.10)">${IMG(im, '4/3')}</div>`;
    const sh = k === 'dim' ? 'rgba(0,0,0,.28)' : 'linear-gradient(180deg,rgba(0,0,0,0) 45%,rgba(0,0,0,.6))';
    return `<div style="position:relative;border-radius:10px;overflow:hidden">${IMG(im, '4/3')}<span style="position:absolute;inset:0;background:${sh}"></span></div>`;
  }
  const behandling = [
    Q('yt-bild-behandling', 'Hur ska bilder behandlas?',
      [['Ingen behandling', 'none'], ['Lätt mörkläggning', 'dim'], ['Gradient nedtill', 'grad'], ['Duotone i accentfärg', 'duo'], ['Gråskala', 'gray'], ['Vit ram (passepartout)', 'frame']].map(([l, k]) => [l, scene(treat(k))])),

    Q('yt-bild-gradient-ton', 'Om bilden har en gradient under texten: vilken ton ska den tona mot?',
      [
        ['Mot svart', 'linear-gradient(180deg,rgba(0,0,0,0) 35%,rgba(0,0,0,.7))', true],
        ['Mot accentfärgen', 'linear-gradient(180deg,rgba(36,64,94,0) 35%,rgba(36,64,94,.9))', true],
        ['Mot sidans bakgrund', 'linear-gradient(180deg,rgba(246,246,244,0) 35%,rgba(246,246,244,1) 92%)', false],
      ].map(([l, g, w]) => [l, scene(overlay({ img: 'fjallen', ratio: '4/5', shade: g, r: '10px', st: w ? '' : '--sink:#1A1C1E;--smuted:#5D6166;color:#1A1C1E' }))])),

    Q('yt-bild-gra-hover', 'Ska bilder vara i färg hela tiden? (alternativen växlar mellan vila och hover)',
      [['Färg hela tiden', false], ['Gråskala, färg vid hover', true]].map(([l, a]) => { const p = uid(); return [l, (a ? hov(p, [[' img', 'filter:grayscale(1)', 'filter:grayscale(0)']]) : '') + scene(card({ cls: p, img: 'stugor-sjo', body: EB + H3 + TX }))]; })),

    Q('yt-bild-hover-ton', 'Ska bilden ändra ton när man hovrar? (alternativen växlar mellan vila och hover)',
      [['Mörknar lite', 'rgba(0,0,0,.22)'], ['Ljusnar lite', 'rgba(255,255,255,.22)'], ['Ingen ändring', '']].map(([l, c]) => { const p = uid(); return [l, (c ? hov(p, [[' .sh', 'background:rgba(0,0,0,0)', 'background:' + c]]) : '') + scene(`<div class="${p}" style="background:var(--box);border:${BD};border-radius:12px;overflow:hidden"><div style="position:relative">${IMG('stugor-sjo')}<span class="sh" style="position:absolute;inset:0"></span></div><div style="padding:20px" class="stack">${EB}${H3}</div></div>`)]; })),

    Q('yt-bild-bildtext', 'Var ska en bildtext stå?',
      [['Under bilden', 'under'], ['På bilden, nertill', 'on'], ['Ingen bildtext', 'none']].map(([l, k]) => [l, scene(k === 'on'
        ? `<div style="position:relative;border-radius:10px;overflow:hidden">${IMG('stockholm', '4/3')}<span class="small" style="position:absolute;left:0;right:0;bottom:0;padding:24px 12px 10px;color:#fff;background:linear-gradient(180deg,rgba(0,0,0,0),rgba(0,0,0,.6))">Bildtext på en rad</span></div>`
        : `<div class="stack" style="gap:8px">${IMG('stockholm', '4/3', 'border-radius:10px')}${k === 'under' ? '<p class="small muted">Bildtext på en rad</p>' : ''}</div>`, { bg: 'var(--box)' })])),

    Q('yt-bild-platshallare', 'Hur ska en bild som saknas eller laddar visas?',
      [
        ['Grå yta', 'background:#E4E5E3', ''],
        ['Grå yta med bildikon', 'background:#E4E5E3;color:rgba(26,28,30,.35)', 'ico'],
        ['Tonad yta med bildikon', 'background:var(--tint);color:rgba(36,64,94,.45)', 'ico'],
        ['Randig yta', 'background:repeating-linear-gradient(135deg,#ECEDEB 0 10px,#E2E3E1 10px 20px)', ''],
      ].map(([l, s, k]) => [l, scene(card({ body: EB + H3 + TX, st: '', imgSt: '' }).replace('<div style="padding:20px', `<div style="aspect-ratio:3/2;display:grid;place-items:center;${s}">${k ? ico(I.img, 'width:34px;height:34px;stroke-width:1.5') : ''}</div><div style="padding:20px`))])),
  ];

  // ---------- Text på bild ----------
  const BODYW = EB + '<p class="h h3">Rubrik som är två rader lång</p>';
  const textpabild = [
    Q('yt-tpb-placering', 'Var ska texten ligga på en bild?',
      [['Nere till vänster', 'flex-end', false], ['Centrerad', 'center', true], ['Uppe till vänster', 'flex-start', false]].map(([l, pos, c]) => [l, scene(overlay({ img: 'stockholm', ratio: '4/5', shade: 'rgba(0,0,0,.38)', pos, center: c }))])),

    Q('yt-tpb-skydd', 'Hur ska texten skyddas så att den syns mot bilden?',
      [
        ['Mörkläggning av hela bilden', { shade: 'rgba(0,0,0,.42)' }],
        ['Gradient nedtill', {}],
        ['Mörk ruta bakom texten', { shade: 'none', pad: '14px', body: `<div style="background:rgba(0,0,0,.6);border-radius:8px;padding:14px;display:flex;flex-direction:column;gap:6px">${BODYW}</div>` }],
        ['Bara skugga på texten', { shade: 'none', body: `<div style="text-shadow:0 1px 3px rgba(0,0,0,.7),0 0 14px rgba(0,0,0,.35);display:flex;flex-direction:column;gap:6px">${BODYW}</div>` }],
        ['Frostad remsa', { shade: 'none', pad: '0', body: `<div style="width:100%;background:rgba(0,0,0,.22);-webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px);border-radius:0 0 12px 12px;padding:16px 20px;display:flex;flex-direction:column;gap:6px">${BODYW}</div>` }],
      ].map(([l, o]) => [l, scene(overlay({ img: 'kopenhamn', ratio: '4/5', ...o }))])),

    Q('yt-tpb-mork', 'Hur mycket ska en bild mörkläggas bakom vit text?',
      [['Lite (15 %)', .15], ['Måttligt (30 %)', .3], ['Tydligt (45 %)', .45], ['Kraftigt (60 %)', .6]].map(([l, a]) => [l, scene(overlay({ img: 'fjallen', ratio: '4/5', shade: `rgba(0,0,0,${a})`, pos: 'center', center: true }))])),

    Q('yt-tpb-gradient', 'Hur högt upp ska gradienten bakom texten gå?',
      [['Nedersta tredjedelen', 'linear-gradient(180deg,rgba(0,0,0,0) 62%,rgba(0,0,0,.72))'], ['Halva bilden', 'linear-gradient(180deg,rgba(0,0,0,0) 45%,rgba(0,0,0,.72))'], ['Hela bilden', 'linear-gradient(180deg,rgba(0,0,0,0),rgba(0,0,0,.72))']].map(([l, g]) => [l, scene(overlay({ img: 'fjallen', ratio: '4/5', shade: g }))])),

    Q('yt-tpb-ruta', 'Om texten ligger i en ruta vid bilden: hur ska rutan se ut?',
      [
        ['Vit ruta på bilden', overlay({ img: 'stockholm', ratio: '4/5', shade: 'none', pad: '14px', body: `<div style="background:#fff;border-radius:10px;padding:16px;display:flex;flex-direction:column;gap:6px;--sink:#1A1C1E;--smuted:#5D6166;color:#1A1C1E">${EB}${H3}</div>` })],
        ['Mörk halvgenomskinlig ruta', overlay({ img: 'stockholm', ratio: '4/5', shade: 'none', pad: '14px', body: `<div style="background:rgba(20,22,24,.68);border-radius:10px;padding:16px;display:flex;flex-direction:column;gap:6px">${BODYW}</div>` })],
        ['Vit ruta som går ut under bilden', `<div>${IMG('stockholm', '4/4', 'border-radius:12px')}<div style="position:relative;margin:-56px 14px 0;background:#fff;border-radius:10px;padding:16px;display:flex;flex-direction:column;gap:6px;box-shadow:0 8px 22px rgba(26,28,30,.12)">${EB}${H3}</div></div>`],
      ].map(([l, h]) => [l, scene(h)])),

    Q('yt-tpb-knapp', 'Hur ska en knapp på en bild se ut?',
      [
        ['Vit fylld knapp', '<span class="sb" style="background:#fff;border-color:#fff;color:#1A1C1E">Läs mer</span>'],
        ['Vit konturknapp', '<span class="sb2" style="border-color:#fff;color:#fff">Läs mer</span>'],
        ['Knapp i accentfärg', '<span class="sb">Läs mer</span>'],
      ].map(([l, b]) => [l, scene(overlay({ img: 'fjallen', ratio: '4/5', body: BODYW + `<div style="margin-top:8px">${b}</div>` }))])),

    Q('yt-tpb-hover', 'Ska texten på bildkort alltid synas? (alternativen växlar mellan vila och hover)',
      [['Alltid synlig', false], ['Visas först vid hover', true]].map(([l, a]) => {
        const p = uid();
        const css = a ? hov(p, [[' .tx', 'opacity:0;transform:translateY(10px)', 'opacity:1;transform:translateY(0)'], [' .sh', 'opacity:0', 'opacity:1']]) : '';
        return [l, css + scene(`<div class="${p}" style="position:relative;border-radius:12px;overflow:hidden;aspect-ratio:4/5;display:flex;flex-direction:column;justify-content:flex-end;--sink:#fff;--smuted:rgba(255,255,255,.82);color:#fff"><img src="img/stockholm.jpg" alt="Exempelbild" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover"><span class="sh" style="position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,0) 35%,rgba(0,0,0,.68))"></span><div class="tx" style="position:relative;padding:20px;display:flex;flex-direction:column;gap:6px">${BODYW}</div></div>`)];
      })),

    Q('yt-tpb-etikett', 'Hur ska en etikett på en bild se ut?',
      [
        ['Vit etikett', 'background:#fff;color:#1A1C1E'],
        ['Mörk halvgenomskinlig', 'background:rgba(0,0,0,.55);color:#fff'],
        ['Frostad etikett', 'background:rgba(255,255,255,.28);-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);color:#fff'],
        ['Etikett i accentfärg', 'background:var(--brand);color:#fff'],
      ].map(([l, s]) => [l, scene(`<div style="background:var(--box);border:${BD};border-radius:12px;overflow:hidden"><div style="position:relative">${IMG('fjallen')}<span class="tag" style="position:absolute;top:12px;left:12px;${s}">Etikett</span></div><div style="padding:20px" class="stack">${H3}${TX}</div></div>`)])),
  ];

  // ---------- Bildramar ----------
  const ramar = [
    Q('yt-ram-stil', 'Ska bilder ha en ram?',
      [
        ['Ingen ram', IMG('stugor-sjo', '4/3')],
        ['Vit passepartout och skugga', `<div style="background:#fff;padding:12px;box-shadow:0 6px 18px rgba(26,28,30,.10)">${IMG('stugor-sjo', '4/3')}</div>`],
        ['Tunn linje med luft', `<div style="border:1px solid rgba(26,28,30,.8);padding:8px">${IMG('stugor-sjo', '4/3')}</div>`],
        ['Förskjuten linjeram bakom', `<div style="position:relative;margin:0 12px 12px 0"><span style="position:absolute;inset:0;transform:translate(12px,12px);border:1.5px solid var(--brand)"></span><div style="position:relative">${IMG('stugor-sjo', '4/3')}</div></div>`],
        ['Förskjuten tonad platta bakom', `<div style="position:relative;margin:0 12px 12px 0"><span style="position:absolute;inset:0;transform:translate(12px,12px);background:var(--tint)"></span><div style="position:relative">${IMG('stugor-sjo', '4/3')}</div></div>`],
      ].map(([l, h]) => [l, scene(h, { pad: '28px' })])),

    Q('yt-ram-passepartout', 'Om bilder får en vit passepartout: hur bred ska den vara?',
      [6, 12, 20].map(n => [n + ' px vit kant', scene(`<div style="background:#fff;padding:${n}px;box-shadow:0 6px 18px rgba(26,28,30,.10)">${IMG('stugor-sjo', '4/3')}</div>`, { pad: '28px' })])),

    Q('yt-ram-produkt', 'Hur ska produktbilder ligga i ett kort?',
      [
        ['Bilden fyller kortets topp', 'fill'],
        ['På en tonad platta med luft', 'tint'],
        ['På en vit platta med kant', 'white'],
      ].map(([l, k]) => [l, scene(`<div class="stack" style="gap:10px">${k === 'fill' ? IMG('produkt-sko', '1/1', 'border-radius:10px') : `<div style="border-radius:10px;padding:18px;${k === 'tint' ? 'background:var(--tint)' : `background:#fff;border:${BD}`}">${IMG('produkt-sko', '1/1', 'border-radius:6px')}</div>`}<div><p style="font-weight:600">Produktnamn</p><p class="price">1 495 kr</p></div></div>`, { mw: '220px' })])),

    Q('yt-ram-galleri', 'Hur ska bilder i ett galleri avgränsas från varandra?',
      [
        ['Tätt, 2 px glipa och raka hörn', 'gap:2px', ''],
        ['12 px glipa och rundade hörn', 'gap:12px', 'border-radius:8px'],
        ['Var bild i egen vit ram', 'gap:12px', 'frame'],
      ].map(([l, g, s]) => [l, scene(`<div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));${g}">${IMGS.slice(0, 6).map(n => s === 'frame' ? `<div style="background:#fff;padding:5px;box-shadow:0 2px 8px rgba(26,28,30,.10)"><img src="img/${n}.jpg" alt="Exempelbild" style="width:100%;aspect-ratio:1/1;object-fit:cover"></div>` : `<img src="img/${n}.jpg" alt="Exempelbild" style="width:100%;aspect-ratio:1/1;object-fit:cover;${s}">`).join('')}</div>`)])),
  ];

  // ---------- Rutnät och avstånd ----------
  const mc = (n, o = {}) => card({ img: n, ratio: o.ratio || '4/3', pad: '14px', gap: '4px', st: o.st || '', body: o.body || '<p style="font-weight:600;font-size:15px">Rubrik</p><p class="muted small">Kort text</p>' });
  const page = (inner, mw) => `<div style="background:var(--ground);padding:24px"><div style="max-width:${mw || '760px'};margin:0 auto">${inner}</div></div>`;
  const TXT = ['Kort text.', 'En längre text som går över flera rader och gör kortet högre än de andra.', 'Text på två rader i det här kortet.'];
  const rutnat = [
    Q('yt-rut-gap', 'Hur stort ska avståndet mellan korten vara?',
      [8, 16, 24, 32].map(n => [n + ' px mellan korten', page(`<div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:${n}px">${IMGS.slice(0, 3).map(i => mc(i)).join('')}</div>`)]), 'stack'),

    Q('yt-rut-antal', 'Hur många kort ska stå per rad på en dator?',
      [2, 3, 4].map(n => [n + ' kort per rad', page(`<div style="display:grid;grid-template-columns:repeat(${n},minmax(0,1fr));gap:16px">${IMGS.slice(0, n).map(i => mc(i, { body: '<p style="font-weight:600;font-size:14px">Rubrik</p>' })).join('')}</div>`, '1000px')]), 'stack'),

    Q('yt-rut-mobil', 'Hur ska kort radas upp i mobilen?',
      [['En kolumn', 1], ['Två kolumner', 2], ['Vågrät rad som scrollas', 0]].map(([l, n]) => [l, `<div style="padding:16px">${phone(n
        ? `<div style="padding:12px;display:grid;grid-template-columns:repeat(${n},minmax(0,1fr));gap:10px">${IMGS.slice(0, n * 2 + (n === 1 ? 0 : 2)).map(i => mc(i, { ratio: n === 1 ? '16/9' : '1/1', body: '<p style="font-weight:600;font-size:14px">Rubrik</p><p class="muted small">Kort text</p>' })).join('')}</div>`
        : `<div style="padding:12px 0 12px 12px"><p class="h h3" style="margin-bottom:10px">Rubrik</p><div style="display:flex;gap:10px;overflow:hidden">${IMGS.slice(0, 3).map(i => mc(i, { ratio: '4/5', st: 'flex:0 0 78%', body: '<p style="font-weight:600;font-size:14px">Rubrik</p><p class="muted small">Kort text</p>' })).join('')}</div><p class="h h3" style="margin:16px 0 10px">Rubrik</p><div style="display:flex;gap:10px;overflow:hidden">${IMGS.slice(3, 6).map(i => mc(i, { ratio: '16/9', st: 'flex:0 0 78%' })).join('')}</div></div>`)}</div>`])),

    Q('yt-rut-hojd', 'Ska kort i samma rad vara lika höga?',
      [
        ['Lika höga kort', 'eq'], ['Naturlig höjd, linjerade upptill', 'nat'], ['Förskjutet rutnät (masonry)', 'mas'],
      ].map(([l, k]) => {
        if (k === 'mas') {
          const R = ['4/5', '4/3', '1/1', '16/9', '3/4', '3/2'];
          return [l, page(`<div style="columns:3 150px;column-gap:16px">${IMGS.slice(0, 6).map((i, j) => `<div style="break-inside:avoid;margin-bottom:16px">${mc(i, { ratio: R[j], body: `<p style="font-weight:600;font-size:15px">Rubrik</p><p class="muted small">${TXT[j % 3]}</p>` })}</div>`).join('')}</div>`)];
        }
        return [l, page(`<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:16px;align-items:${k === 'eq' ? 'stretch' : 'start'}">${IMGS.slice(0, 3).map((i, j) => mc(i, { body: `<p style="font-weight:600;font-size:15px">Rubrik</p><p class="muted small">${TXT[j]}</p>` })).join('')}</div>`)];
      }), 'stack'),

    Q('yt-rut-knapp-linje', 'Var ska knappen hamna när korten har olika mycket text?',
      [['I linje längst ner i alla kort', true], ['Direkt efter texten', false]].map(([l, b]) => [l, page(`<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:16px">${IMGS.slice(0, 3).map((i, j) => mc(i, { body: `<p style="font-weight:600;font-size:15px">Rubrik</p><p class="muted small">${TXT[j]}</p><span class="sb2" style="height:40px;padding:0 16px;font-size:14px;${b ? 'margin-top:auto' : 'margin-top:6px'}">Läs mer</span>` })).join('')}</div>`)]), 'stack'),

    Q('yt-rut-storlekar', 'Ska alla kort i ett rutnät vara lika stora?',
      [['Alla lika stora', 'eq'], ['Första kortet dubbelt så stort', 'big'], ['Blandade storlekar (bento)', 'bento']].map(([l, k]) => {
        const tile = (i, st) => `<div style="position:relative;border-radius:12px;overflow:hidden;min-height:110px;${st || ''}"><img src="img/${IMGS[i]}.jpg" alt="Exempelbild" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover"><span style="position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,0) 50%,rgba(0,0,0,.55))"></span><span style="position:absolute;left:12px;bottom:10px;color:#fff;font-weight:600;font-size:14px">Rubrik</span></div>`;
        const g = k === 'eq'
          ? `<div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px">${[0, 1, 2, 3, 4, 5].map(i => tile(i)).join('')}</div>`
          : k === 'big'
            ? `<div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));grid-auto-rows:110px;gap:12px">${tile(0, 'grid-column:span 2;grid-row:span 2')}${[1, 2, 3, 4, 5].map(i => tile(i)).join('')}</div>`
            : `<div style="display:grid;grid-template-columns:repeat(4,minmax(0,1fr));grid-auto-rows:110px;gap:12px">${tile(0, 'grid-column:span 2;grid-row:span 2')}${tile(1, 'grid-column:span 2')}${tile(2)}${tile(3)}${tile(4, 'grid-column:span 3')}${tile(5)}</div>`;
        return [l, page(g)];
      }), 'stack'),

    Q('yt-rut-radavstand', 'Ska avståndet mellan raderna vara samma som mellan kolumnerna?',
      [['Samma avstånd åt alla håll', '16px 16px'], ['Större avstånd mellan raderna', '40px 16px']].map(([l, g]) => [l, page(`<div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:${g}">${IMGS.slice(0, 6).map(i => mc(i, { ratio: '16/9', body: '<p style="font-weight:600;font-size:14px">Rubrik</p><p class="muted small">Kort text</p>' })).join('')}</div>`)]), 'stack'),

    Q('yt-rut-avgransning', 'Hur ska korten i ett rutnät avgränsas från varandra?',
      [['Separata kort med mellanrum', 'gap'], ['Ett rutnät med delade linjer', 'lines'], ['Ingen yta, bara luft', 'air']].map(([l, k]) => {
        const cell = (i) => `<div style="${k === 'gap' ? `background:var(--box);border:${BD};border-radius:12px;` : k === 'lines' ? 'background:var(--box);' : ''}padding:${k === 'air' ? '0' : '18px'};display:flex;flex-direction:column;gap:8px"><span style="color:var(--brand)">${ico(ICO_LAY)}</span><p style="font-weight:600">Rubrik ${i + 1}</p><p class="muted small">Kort text på två rader om innehållet.</p></div>`;
        const wrap = k === 'gap' ? 'gap:16px' : k === 'lines' ? `gap:1px;background:rgba(26,28,30,.12);border:1px solid rgba(26,28,30,.12);border-radius:12px;overflow:hidden` : 'gap:28px 24px';
        return [l, page(`<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));${wrap}">${[0, 1, 2, 3, 4, 5].map(cell).join('')}</div>`)];
      }), 'stack'),
  ];

  // ---------- Paneler och sektioner ----------
  const tiles3 = (n = 3, st) => `<div style="display:grid;grid-template-columns:repeat(${n},minmax(0,1fr));gap:10px">${Array.from({ length: n }, (_, i) => `<div style="background:var(--box);border:${BD};border-radius:10px;padding:12px;${st || ''}"><p style="font-weight:600;font-size:14px">Rubrik ${i + 1}</p><p class="muted small">Kort text</p></div>`).join('')}</div>`;
  const secHead = (t, w) => `<p class="h h3"${w ? ' style="color:#fff"' : ''}>${t || 'Rubrik för sektionen'}</p><p class="small" style="color:${w ? 'rgba(255,255,255,.75)' : 'var(--smuted)'};margin:4px 0 14px">En rad som förklarar sektionen.</p>`;
  const sec = (bg, inner, st) => `<div style="background:${bg};padding:28px 24px;${st || ''}"><div style="max-width:680px;margin:0 auto">${inner}</div></div>`;
  const sektioner = [
    Q('yt-sek-bredd', 'Hur ska en sektion med egen bakgrund ligga på sidan?',
      [
        ['Band i full bredd', sec('#fff', secHead('Föregående sektion')) + sec('var(--ground)', secHead() + tiles3())],
        ['Inramad, rundad panel', sec('#fff', secHead('Föregående sektion')) + `<div style="background:#fff;padding:0 16px 16px"><div style="background:var(--ground);border-radius:24px;padding:28px 24px"><div style="max-width:680px;margin:0 auto">${secHead() + tiles3()}</div></div></div>`],
        ['Ingen egen bakgrund', sec('#fff', secHead('Föregående sektion')) + sec('#fff', secHead() + tiles3())],
      ], 'stack'),

    Q('yt-sek-rundning', 'Hur runda ska inramade sektionspaneler vara?',
      [0, 16, 24, 32, 48].map(n => [n ? 'Sektionspanel ' + n + ' px' : 'Raka hörn', `<div style="background:#fff;padding:16px;height:100%"><div style="background:var(--ground);border-radius:${n}px;padding:28px 22px">${secHead()}${tiles3(2)}</div></div>`])),

    Q('yt-sek-separation', 'Hur ska sektioner skiljas från varandra?',
      [
        ['Växlande bakgrund', ['#fff', 'var(--ground)', '#fff'], ''],
        ['Tunn linje mellan sektionerna', ['#fff', '#fff', '#fff'], 'line'],
        ['Bara luft', ['#fff', '#fff', '#fff'], 'air'],
      ].map(([l, bgs, k]) => [l, bgs.map((b, i) => sec(b, (k === 'line' && i ? '<div class="divider" style="margin:-28px 0 28px"></div>' : '') + secHead('Sektion ' + (i + 1)), k === 'air' ? 'padding:40px 24px' : '')).join('')]), 'stack'),

    Q('yt-sek-luft', 'Hur mycket luft ska det vara mellan sektioner på en dator?',
      [48, 80, 120].map(n => [n + ' px mellan sektioner', `<div style="background:#fff;padding:24px"><div style="max-width:680px;margin:0 auto;display:flex;flex-direction:column;gap:${n}px"><div>${secHead('Sektion 1')}${tiles3()}</div><div>${secHead('Sektion 2')}${tiles3()}</div></div></div>`]), 'stack'),

    Q('yt-sek-vaxling', 'Vilka ytor ska växla när sektioner har olika bakgrund?',
      [
        ['Vit och benvit', ['#fff', '#F6F6F4'], false],
        ['Vit och svagt tonad', ['#fff', 'var(--tint)'], false],
        ['Vit och mörk', ['#fff', '#1A1C1E'], true],
      ].map(([l, [a, b], dark]) => [l, sec(a, secHead('Sektion 1')) + sec(b, secHead('Sektion 2', dark)) + sec(a, secHead('Sektion 3'))]), 'stack'),

    Q('yt-sek-cta', 'Hur ska en uppmaningsruta längst ner på sidan se ut?',
      [
        ['Band i accentfärg, full bredd', 'band'], ['Rundad panel i accentfärg', 'panel'], ['Tonad, rundad panel', 'tint'], ['Panel med tunn kant', 'line'],
      ].map(([l, k]) => {
        const dark = k === 'band' || k === 'panel';
        const inner = `<p class="h h3" style="${dark ? 'color:#fff' : ''}">Redo att börja?</p><p class="small" style="color:${dark ? 'rgba(255,255,255,.8)' : 'var(--smuted)'};margin:4px 0 14px">En kort rad text om nästa steg.</p><span class="sb" style="${dark ? 'background:#fff;border-color:#fff;color:var(--brand)' : ''}">Kom igång</span>`;
        const box = k === 'band' ? `<div style="background:var(--brand);padding:28px 24px">${inner}</div>`
          : `<div style="padding:0 16px"><div style="border-radius:20px;padding:28px 24px;${k === 'panel' ? 'background:var(--brand)' : k === 'tint' ? 'background:var(--tint)' : `border:${BD}`}">${inner}</div></div>`;
        return [l, `<div style="background:#fff;padding:20px 0;height:100%;display:flex;flex-direction:column;justify-content:center">${box}</div>`];
      })),

    Q('yt-sek-mobilmarginal', 'Hur långt från skärmkanten ska en inramad panel ligga i mobilen?',
      [[0, 'Kant till kant'], [8, '8 px från kanten'], [16, '16 px från kanten']].map(([m, l]) => [l, `<div style="padding:16px">${phone(`<div style="background:#fff;height:100%;padding:16px 0"><div style="padding:0 16px 16px"><p class="h h3">Rubrik</p><p class="muted small">Text som står direkt på sidan.</p></div><div style="margin:0 ${m}px;background:var(--ground);border-radius:${m ? 16 : 0}px;padding:20px 16px">${secHead()}${tiles3(1)}</div></div>`)}</div>`])),

    Q('yt-sek-overlapp', 'Får kort ligga över kanten mellan två sektioner?',
      [['Nej, korten ligger under bandet', false], ['Ja, korten går in över bandets kant', true]].map(([l, o]) => [l, `<div style="background:#fff"><div style="background:var(--tint);padding:32px 24px ${o ? '72px' : '32px'}"><div style="max-width:680px;margin:0 auto"><p class="h h2">Rubrik för sidan</p><p class="muted" style="margin-top:6px">En kort ingress under rubriken.</p></div></div><div style="max-width:728px;margin:${o ? '-48px' : '24px'} auto 0;padding:0 24px 28px">${tiles3(3, 'padding:16px;min-height:90px;' + (o ? 'box-shadow:0 8px 20px rgba(26,28,30,.08)' : ''))}</div></div>`]), 'stack'),

    Q('yt-sek-mork', 'Får enstaka sektioner vara mörka på en ljus sida?',
      [['Nej, alla sektioner ljusa', false], ['Ja, en mörk sektion som betoning', true]].map(([l, d]) => [l, sec('#fff', secHead('Sektion 1')) + sec(d ? '#1A1C1E' : 'var(--ground)', secHead('Sektion 2', d) + tiles3(3, d ? 'background:#26282B;border-color:#33363A;--sink:#fff;--smuted:rgba(255,255,255,.7);color:#fff' : '')) + sec('#fff', secHead('Sektion 3'))]), 'stack'),

    Q('yt-sek-linje', 'Om sektioner skiljs med en linje: hur lång ska linjen vara?',
      [['Hela sidans bredd', 'full'], ['Innehållets bredd', 'content'], ['Kort linje i mitten', 'short']].map(([l, k]) => [l, `<div style="background:#fff;padding:22px 0;height:100%">${['Sektion 1', 'Sektion 2'].map((t, i) => `${i ? (k === 'full' ? '<div class="divider" style="margin:22px 0"></div>' : k === 'content' ? '<div style="padding:0 22px"><div class="divider" style="margin:22px 0"></div></div>' : '<div style="width:48px;height:2px;background:rgba(26,28,30,.25);margin:22px auto"></div>') : ''}<div style="padding:0 22px">${secHead(t)}</div>`).join('')}</div>`])),

    Q('yt-sek-staplade', 'Ska sektioner kunna staplas som ark med rundade övre hörn?',
      [['Nej, raka övergångar', false], ['Ja, varje sektion har rundade övre hörn', true]].map(([l, r]) => [l, '<div style="background:#fff;height:100%">' + ['#fff', 'var(--ground)', 'var(--tint)'].map((b, i) => `<div style="background:${b};padding:24px 22px 40px;${r && i ? 'border-radius:28px 28px 0 0;margin-top:-20px;position:relative' : ''}">${secHead('Sektion ' + (i + 1))}</div>`).join('') + '</div>'])),

    Q('yt-sek-inre-luft', 'Hur mycket luft ska en inramad sektionspanel ha inuti?',
      [24, 40, 64].map(n => [n + ' px inre luft', `<div style="background:#fff;padding:16px"><div style="background:var(--ground);border-radius:24px;padding:${n}px"><div style="max-width:680px;margin:0 auto">${secHead()}${tiles3()}</div></div></div>`]), 'stack'),

    Q('yt-sek-kortgrupp', 'Ska en grupp kort ligga i en gemensam panel?',
      [['Korten direkt på sidan', false], ['Korten i en gemensam grå panel', true]].map(([l, p]) => [l, `<div style="background:#fff;padding:24px"><div style="max-width:720px;margin:0 auto">${secHead()}<div style="${p ? 'background:var(--ground);border-radius:20px;padding:16px' : ''}">${tiles3(3, 'min-height:80px')}</div></div></div>`]), 'stack'),

    Q('yt-sek-kort-mork', 'Hur ska kort se ut på en mörk sektion?',
      [
        ['Vita kort', 'background:#fff;border:0;--sink:#1A1C1E;--smuted:#5D6166;color:#1A1C1E'],
        ['Något ljusare mörka kort', 'background:#26282B;border:1px solid #33363A'],
        ['Bara en tunn ljus kant', 'background:transparent;border:1px solid rgba(255,255,255,.18)'],
      ].map(([l, s]) => [l, `<div style="background:#1A1C1E;padding:24px;height:100%;--sink:#fff;--smuted:rgba(255,255,255,.7);color:#fff">${secHead('Rubrik', true)}<div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px">${[1, 2].map(i => `<div style="border-radius:10px;padding:14px;${s}"><p style="font-weight:600;font-size:14px">Rubrik ${i}</p><p class="small" style="color:var(--smuted)">Kort text</p></div>`).join('')}</div></div>`])),
  ];

  // ---------- Maxbredd och marginaler ----------
  const wire = (st) => `<div style="${st || ''}"><div style="height:12px;width:40%;border-radius:6px;background:rgba(26,28,30,.55);margin-bottom:10px"></div><div style="height:8px;width:70%;border-radius:4px;background:rgba(26,28,30,.18);margin-bottom:14px"></div><div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px">${'<div style="aspect-ratio:4/3;border-radius:6px;background:#fff;border:1px solid rgba(26,28,30,.12)"></div>'.repeat(3)}</div></div>`;
  const browser = (inner, bg) => `<div style="padding:20px;background:var(--box)"><div style="border:1px solid rgba(26,28,30,.18);border-radius:10px;overflow:hidden"><div style="height:22px;background:#E9EAE8;display:flex;align-items:center;gap:5px;padding:0 9px">${'<span style="width:7px;height:7px;border-radius:50%;background:rgba(26,28,30,.25)"></span>'.repeat(3)}</div><div style="background:${bg || 'var(--ground)'};padding:24px 0">${inner}</div></div></div>`;
  const PARA = '<p class="muted">Brödtext som visar hur långa raderna blir. Med en lagom radlängd är texten lätt att följa från rad till rad, och ögat hittar tillbaka till början av nästa rad utan problem.</p>';
  const maxbredd = [
    Q('yt-max-innehall', 'Hur bred får innehållet bli på en stor skärm (1440 px)?',
      [['Max 960 px', 66.7], ['Max 1140 px', 79], ['Max 1280 px', 89], ['Nästan full bredd (24 px marginal)', 96.7]].map(([l, p]) => [l, browser(wire(`width:${p}%;margin:0 auto`))]), 'stack'),

    Q('yt-max-mobilmarginal', 'Hur stor ska sidmarginalen vara i mobilen?',
      [12, 16, 20, 24].map(n => [n + ' px sidmarginal', `<div style="padding:16px">${phone(`<div style="background:#fff;height:100%;padding:18px ${n}px;display:flex;flex-direction:column;gap:10px"><p class="h h3">Rubrik som är två rader lång</p><p class="muted small">Brödtext i mobilen som visar hur nära kanten raderna går.</p>${card({ img: 'skog-sjo', ratio: '16/9', pad: '12px', gap: '2px', body: '<p style="font-weight:600">Rubrik</p><p class="muted small">Kort text</p>' })}</div>`)}</div>`])),

    Q('yt-max-datormarginal', 'Hur stor ska sidmarginalen vara på en dator när innehållet fyller bredden?',
      [24, 48, 96].map(n => [n + ' px sidmarginal', `<div style="background:var(--ground);padding:24px ${n}px">${wire()}</div>`]), 'stack'),

    Q('yt-max-text', 'Hur bred ska en textspalt vara jämfört med resten av innehållet?',
      [['Smal textspalt (cirka 65 tecken)', true], ['Text i hela innehållsbredden', false]].map(([l, n]) => [l, `<div style="background:#fff;padding:28px 24px"><div style="max-width:900px;margin:0 auto"><div style="${n ? 'max-width:62ch' : ''}" class="stack"><p class="h h2">Rubrik för en artikel</p>${PARA}${PARA}</div></div></div>`]), 'stack'),

    Q('yt-max-bild', 'Hur bred ska en bild i en textspalt vara?',
      [['Lika bred som texten', 'col'], ['Bredare än texten', 'wide'], ['Hela sidans bredd', 'full']].map(([l, k]) => [l, `<div style="background:#fff;padding:28px 0"><div style="max-width:560px;margin:0 auto;padding:0 24px">${PARA}</div><div style="margin:18px auto;${k === 'col' ? 'max-width:560px;padding:0 24px' : k === 'wide' ? 'max-width:820px;padding:0 24px' : ''}">${IMG('fjallen', 'auto', `height:200px;${k === 'full' ? '' : 'border-radius:10px'}`)}</div><div style="max-width:560px;margin:0 auto;padding:0 24px">${PARA}</div></div>`]), 'stack'),

    Q('yt-max-ultrabred', 'Hur ska sidan se ut på en mycket bred skärm?',
      [['Bakgrunder i full bredd, innehåll centrerat', false], ['Hela sidan i en centrerad ruta', true]].map(([l, box]) => [l, `<div style="padding:20px;background:var(--box)"><div style="border:1px solid rgba(26,28,30,.18);border-radius:10px;overflow:hidden;background:${box ? '#D9DBD8' : '#fff'}"><div style="${box ? 'max-width:62%;margin:0 auto;background:#fff' : ''}"><div style="background:var(--ground);padding:20px 0"><div style="width:${box ? '88%' : '55%'};margin:0 auto">${wire()}</div></div><div style="padding:20px 0"><div style="width:${box ? '88%' : '55%'};margin:0 auto">${wire()}</div></div></div></div></div>`]), 'stack'),

    Q('yt-max-panelbredd', 'Hur bred ska en fristående panel (till exempel inloggning) vara?',
      [360, 440, 560].map(n => [n + ' px bred panel', `<div style="background:var(--ground);padding:28px 16px"><div style="max-width:${n}px;margin:0 auto;background:var(--box);border:${BD};border-radius:16px;padding:24px;display:flex;flex-direction:column;gap:12px"><p class="h h3">Logga in</p><div class="fld"><span class="lbl">E-post</span><span class="inp ph">namn@exempel.se</span></div><div class="fld"><span class="lbl">Lösenord</span><span class="inp ph">••••••••</span></div><span class="sb">Fortsätt</span></div></div>`]), 'stack'),

    Q('yt-max-dialogbredd', 'Hur bred ska en vanlig dialogruta vara?',
      [400, 480, 560].map(n => [n + ' px bred dialog', `<div style="background:rgba(26,28,30,.5);padding:32px 16px"><div style="max-width:${n}px;margin:0 auto;background:var(--box);border-radius:12px;padding:24px;display:flex;flex-direction:column;gap:8px"><p class="h h3">Spara ändringarna?</p><p class="muted">Du har ändringar som inte är sparade. Vill du spara dem innan du lämnar sidan?</p><div class="row" style="justify-content:flex-end;margin-top:10px;gap:8px"><span class="sb2" style="height:40px;padding:0 16px;font-size:14px">Avbryt</span><span class="sb" style="height:40px;padding:0 16px;font-size:14px">Spara</span></div></div></div>`]), 'stack'),
  ];

  // ---------- Djup och glas ----------
  const glassBox = (bg, blur, extra) => `<div style="background:${bg};${blur ? `-webkit-backdrop-filter:blur(${blur}px);backdrop-filter:blur(${blur}px);` : ''}border-radius:12px;padding:16px;display:flex;flex-direction:column;gap:4px;${extra || ''}"><span class="eyebrow">Etikett</span><p class="h h3">Rubrik på en rad</p><p class="small" style="color:var(--smuted)">Kort text på panelen.</p></div>`;
  const onImg = (box, n) => `<div style="position:relative;border-radius:12px;overflow:hidden;aspect-ratio:4/5;display:flex;flex-direction:column;justify-content:flex-end;padding:14px"><img src="img/${n || 'tag-rapsfalt'}.jpg" alt="Exempelbild" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover"><div style="position:relative">${box}</div></div>`;
  const glas = [
    Q('yt-glas-panel', 'Ska paneler som ligger på bilder vara av frostat glas?',
      [
        ['Ja, frostat glas', glassBox('rgba(255,255,255,.5)', 16)],
        ['Nej, solid vit panel', glassBox('#fff', 0)],
        ['Halvgenomskinlig utan oskärpa', glassBox('rgba(255,255,255,.78)', 0)],
      ].map(([l, b]) => [l, scene(onImg(b))])),

    Q('yt-glas-styrka', 'Om glas används: hur stark ska oskärpan vara?',
      [['Lätt (4 px)', 4], ['Mellan (12 px)', 12], ['Kraftig (24 px)', 24]].map(([l, b]) => [l, scene(onImg(glassBox('rgba(255,255,255,.4)', b)))])),

    Q('yt-glas-ton', 'Om glas används: hur ska glaset vara tonat?',
      [
        ['Ljust, tydligt vitt (60 %)', glassBox('rgba(255,255,255,.6)', 14)],
        ['Ljust, mest genomskinligt (25 %)', glassBox('rgba(255,255,255,.25)', 14, '--sink:#fff;--smuted:rgba(255,255,255,.85);color:#fff')],
        ['Mörkt glas', glassBox('rgba(20,22,24,.38)', 14, '--sink:#fff;--smuted:rgba(255,255,255,.8);color:#fff')],
      ].map(([l, b]) => [l, scene(onImg(b))])),

    Q('yt-glas-kant', 'Ska glaspaneler ha en ljus kant?',
      [['Ingen kant', ''], ['Tunn ljus kant', 'border:1px solid rgba(255,255,255,.7)']].map(([l, k]) => [l, scene(onImg(glassBox('rgba(255,255,255,.4)', 14, k), 'kopenhamn'))])),

    Q('yt-glas-sidhuvud', 'Hur ska ett fast sidhuvud se ut när innehåll scrollar under det?',
      [
        ['Frostat glas', 'background:rgba(255,255,255,.62);-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px)'],
        ['Solid vit', 'background:#fff'],
        ['Solid vit med linje', 'background:#fff;border-bottom:1px solid rgba(26,28,30,.12)'],
      ].map(([l, s]) => [l, scene(`<div style="position:relative;border-radius:12px;overflow:hidden;border:${BD};background:#fff;height:300px"><div style="position:absolute;inset:0;padding:30px 14px 14px;display:flex;flex-direction:column;gap:10px">${IMG('kopenhamn', '4/3', 'border-radius:8px')}<p class="h h3">Rubrik</p></div><div style="position:absolute;top:0;left:0;right:0;height:52px;display:flex;align-items:center;justify-content:space-between;padding:0 14px;${s}"><span style="font-weight:700">Logotyp</span>${ico('<path d="M4 7h16M4 12h16M4 17h16"/>')}</div></div>`)])),

    Q('yt-glas-anvandning', 'Var får frostat glas användas?',
      [['Aldrig'], ['Bara på paneler över bilder och video'], ['Även i fasta sidhuvuden och menyer'], ['Fritt på kort och paneler']]),
  ];

  // ---------- Former ----------
  const TINT = '#E6EBF0';
  const edge = (k, h) => {
    const top = `<div style="background:${TINT};padding:32px 24px ${k === 'rak' ? 32 : 24}px;${k === 'diag' ? `clip-path:polygon(0 0,100% 0,100% calc(100% - ${h || 48}px),0 100%);padding-bottom:${(h || 48) + 24}px` : ''}${k === 'bage' ? 'border-radius:0 0 50% 50% / 0 0 56px 56px;padding-bottom:56px' : ''}"><div style="max-width:680px;margin:0 auto"><p class="h h2">Rubrik för sektionen</p><p class="muted" style="margin-top:6px">En kort text under rubriken.</p></div></div>`;
    const waves = {
      vag: '<path d="M0 0H1200V30C1000 66 800 -6 600 30S200 66 0 30Z"/>',
      hog: '<path d="M0 0H1200V20C950 110 650 -40 400 50S100 70 0 40Z"/>',
      sma: '<path d="M0 0H1200V24' + Array.from({ length: 8 }, (_, i) => `Q${1200 - i * 150 - 75} ${i % 2 ? 0 : 48} ${1200 - (i + 1) * 150} 24`).join('') + 'Z"/>',
    };
    const svg = waves[k] ? `<svg viewBox="0 0 1200 ${k === 'hog' ? 90 : 60}" preserveAspectRatio="none" aria-hidden="true" style="display:block;width:100%;height:${k === 'hog' ? 70 : k === 'sma' ? 28 : 44}px;margin-top:-1px" fill="${TINT}">${waves[k]}</svg>` : '';
    return `<div style="background:#fff">${top}${svg}<div style="padding:24px"><div style="max-width:680px;margin:0 auto">${tiles3()}</div></div></div>`;
  };
  const former = [
    Q('yt-form-sektionskant', 'Hur ska kanten mellan två sektioner se ut?',
      [['Rak kant', 'rak'], ['Diagonal kant', 'diag'], ['Vågig kant', 'vag'], ['Bågformad kant', 'bage']].map(([l, k]) => [l, edge(k)]), 'stack'),

    Q('yt-form-diagonal', 'Om sektionskanten är diagonal: hur brant ska den vara?',
      [['Svag lutning', 24], ['Tydlig lutning', 48], ['Brant lutning', 96]].map(([l, h]) => [l, edge('diag', h)]), 'stack'),

    Q('yt-form-vag', 'Om sektionskanten är vågig: hur ska vågen se ut?',
      [['Låg, lång våg', 'vag'], ['Hög våg', 'hog'], ['Flera små vågor', 'sma']].map(([l, k]) => [l, edge(k)]), 'stack'),

    Q('yt-form-dekor', 'Ska bilder ha dekorativa former bakom sig?',
      [
        ['Ingen dekor', ''],
        ['Mjuk blobb bakom', `<span style="position:absolute;width:78%;height:78%;right:-10%;bottom:-12%;background:${TINT};border-radius:58% 42% 52% 48% / 46% 56% 44% 54%"></span>`],
        ['Cirkel bakom', `<span style="position:absolute;width:62%;aspect-ratio:1;right:-12%;top:-14%;background:${TINT};border-radius:50%"></span>`],
        ['Prickrutnät i hörnet', '<span style="position:absolute;width:46%;height:46%;left:-9%;bottom:-11%;background-image:radial-gradient(rgba(36,64,94,.45) 1.6px,transparent 1.8px);background-size:12px 12px"></span>'],
      ].map(([l, d]) => [l, scene(`<div style="position:relative;margin:18px">${d}<div style="position:relative">${IMG('stugor-sjo', '4/3', 'border-radius:12px')}</div></div>`, { bg: '#fff' })])),

    Q('yt-form-bildform', 'Vilka former får fristående bilder ha?',
      [
        ['Rektangel', 'border-radius:12px;aspect-ratio:4/5'],
        ['Båge upptill', 'border-radius:999px 999px 12px 12px;aspect-ratio:4/5'],
        ['Cirkel', 'border-radius:50%;aspect-ratio:1/1'],
        ['Kapsel', 'border-radius:999px;aspect-ratio:3/5'],
        ['Organisk form', 'border-radius:62% 38% 46% 54% / 55% 45% 55% 45%;aspect-ratio:1/1'],
      ].map(([l, s]) => [l, scene(`<img src="img/portratt-2.jpg" alt="Exempelbild" style="width:100%;max-width:190px;margin:0 auto;object-fit:cover;display:block;${s}">`, { bg: '#fff' })])),

    Q('yt-form-horn', 'Vilken hörnform ska kort ha?',
      [
        ['Rundade hörn', 'border-radius:14px'],
        ['Avfasade hörn', 'clip-path:polygon(14px 0,calc(100% - 14px) 0,100% 14px,100% calc(100% - 14px),calc(100% - 14px) 100%,14px 100%,0 calc(100% - 14px),0 14px)'],
        ['Ett utskuret hörn', 'clip-path:polygon(0 0,calc(100% - 28px) 0,100% 28px,100% 100%,0 100%)'],
        ['Raka hörn', 'border-radius:0'],
      ].map(([l, s]) => [l, scene(`<div style="background:var(--box);${s};overflow:hidden">${IMG('skog-sjo')}<div style="padding:20px" class="stack">${EB}${H3}${TX}</div></div>`)])),

    Q('yt-form-linjer', 'Får sektioner ha dekorativa linjer?',
      [
        ['Inga linjer', ''],
        ['Tunna bågar', `<svg viewBox="0 0 200 200" aria-hidden="true" style="position:absolute;right:-40px;top:-40px;width:200px;height:200px" fill="none" stroke="rgba(36,64,94,.28)" stroke-width="1.2"><circle cx="150" cy="50" r="40"/><circle cx="150" cy="50" r="70"/><circle cx="150" cy="50" r="100"/></svg>`],
        ['Raka, tunna linjer', '<span style="position:absolute;inset:0;background-image:linear-gradient(90deg,rgba(36,64,94,.12) 1px,transparent 1px);background-size:64px 100%"></span>'],
      ].map(([l, d]) => [l, `<div style="position:relative;overflow:hidden;background:var(--ground);padding:36px 24px;height:100%">${d}<div style="position:relative;max-width:420px"><span class="eyebrow">Etikett</span><p class="h h2" style="margin-top:6px">Rubrik för sektionen</p><p class="muted" style="margin-top:8px">En kort text under rubriken som beskriver innehållet.</p></div></div>`])),

    Q('yt-form-bildutfall', 'Får en bild sticka ut utanför sin panel?',
      [['Nej, bilden ligger inuti panelen', false], ['Ja, bilden sticker upp ovanför panelen', true]].map(([l, o]) => [l, scene(`<div style="background:${TINT};border-radius:16px;padding:${o ? '0 18px 18px' : '18px'};margin-top:${o ? '34px' : '0'}"><div style="${o ? 'margin-top:-34px' : ''}">${IMG('produkt-stol', '4/3', 'border-radius:12px')}</div><div class="stack" style="gap:6px;padding-top:14px">${H3s}${TX}</div></div>`, { bg: '#fff' })])),

    Q('yt-form-bildkant', 'Hur ska bildens nederkant se ut i ett kort?',
      [
        ['Rak', ''],
        ['Svagt böjd', 'clip-path:ellipse(85% 100% at 50% 0)'],
        ['Diagonal', 'clip-path:polygon(0 0,100% 0,100% 82%,0 100%)'],
      ].map(([l, s]) => [l, scene(`<div style="background:var(--box);border:${BD};border-radius:12px;overflow:hidden">${IMG('skog-sjo', '3/2', s)}<div style="padding:16px 20px 20px" class="stack">${EB}${H3}${TX}</div></div>`)])),
  ];

  // ---------- Avatarer ----------
  const PP = ['portratt-1', 'portratt-2', 'portratt-3'];
  const ava = (n, size, st) => `<img src="img/${n}.jpg" alt="Exempelbild" style="width:${size}px;height:${size}px;object-fit:cover;object-position:center 25%;flex:0 0 auto;${st || ''}">`;
  const comment = (n, size, st, i) => `<div style="display:flex;gap:12px;align-items:flex-start;${i ? 'padding-top:12px;border-top:1px solid rgba(26,28,30,.08)' : ''}">${ava(n, size, st)}<div style="min-width:0"><p style="font-weight:600;font-size:14px">Förnamn Efternamn</p><p class="muted small">Kort kommentar på en rad.</p></div></div>`;
  const avatarer = [
    Q('yt-ava-form', 'Vilken form ska avatarer ha?',
      [['Cirkel', '50%'], ['Rundad fyrkant (12 px)', '12px'], ['Lätt rundad (6 px)', '6px'], ['Fyrkant', '0']].map(([l, r]) => [l, scene(card({ gap: '12px', body: PP.map((n, i) => comment(n, 44, 'border-radius:' + r, i)).join('') }))])),

    Q('yt-ava-ram', 'Ska avatarer ha en ram?',
      [
        ['Ingen ram', ''],
        ['Vit ring', 'box-shadow:0 0 0 3px #fff'],
        ['Tunn grå linje', 'box-shadow:0 0 0 1px rgba(26,28,30,.18)'],
        ['Ring i accentfärg med glipa', 'box-shadow:0 0 0 2px #fff,0 0 0 4px var(--brand)'],
      ].map(([l, s]) => [l, scene(`<div style="display:flex;gap:18px;justify-content:center;align-items:center;padding:10px 0">${PP.map(n => ava(n, 56, 'border-radius:50%;' + s)).join('')}</div>`, { bg: 'var(--tint)' })])),

    Q('yt-ava-initialer', 'Hur ska en avatar utan bild se ut?',
      [
        ['Initialer på tonad yta', 'background:var(--tint);color:var(--brand)', 'AE'],
        ['Vita initialer på accentfärg', 'background:var(--brand);color:#fff', 'AE'],
        ['Grå figurikon', 'background:#E4E5E3;color:rgba(26,28,30,.45)', 'ico'],
        ['Mörka initialer på grått', 'background:#E4E5E3;color:var(--sink)', 'AE'],
      ].map(([l, s, t]) => [l, scene(card({ gap: '12px', body: [0, 1].map(i => `<div style="display:flex;gap:12px;align-items:center;${i ? 'padding-top:12px;border-top:1px solid rgba(26,28,30,.08)' : ''}">${i ? ava('portratt-1', 44, 'border-radius:50%') : `<span style="width:44px;height:44px;border-radius:50%;display:grid;place-items:center;font-weight:700;font-size:15px;flex:0 0 auto;${s}">${t === 'ico' ? ico(I.user, 'width:22px;height:22px') : t}</span>`}<div><p style="font-weight:600;font-size:14px">${i ? 'Förnamn Efternamn' : 'Anna Ek'}</p><p class="muted small">Kort kommentar</p></div></div>`).join('') }))])),

    Q('yt-ava-grupp', 'Hur ska en grupp avatarer visas?',
      [['Överlappande med vit ring', 'ring'], ['Överlappande utan ring', 'plain'], ['Bredvid varandra', 'gap'], ['Överlappande och antal', 'count']].map(([l, k]) => [l, scene(`<div style="display:flex;align-items:center;justify-content:center;${k === 'gap' ? 'gap:6px' : ''}">${PP.map((n, i) => ava(n, 44, `border-radius:50%;${k !== 'gap' && i ? 'margin-left:-12px;' : ''}${k === 'ring' || k === 'count' ? 'box-shadow:0 0 0 3px #fff;' : ''}position:relative`)).join('')}${k === 'count' ? '<span style="width:44px;height:44px;border-radius:50%;margin-left:-12px;box-shadow:0 0 0 3px #fff;background:var(--tint);color:var(--brand);display:grid;place-items:center;font-weight:700;font-size:14px;position:relative">+5</span>' : ''}</div><p class="small muted" style="text-align:center;margin-top:12px">8 personer deltar</p>`, { bg: '#fff' })])),

    Q('yt-ava-storlek', 'Hur stora ska avatarer vara i en lista?',
      [32, 40, 48].map(n => [n + ' px avatar', scene(card({ gap: '12px', body: PP.map((p, i) => comment(p, n, 'border-radius:50%', i)).join('') }))])),

    Q('yt-ava-profil', 'Vilken form ska en stor profilbild ha?',
      [['Cirkel', 'border-radius:50%;aspect-ratio:1/1;max-width:170px'], ['Rundad kvadrat', 'border-radius:16px;aspect-ratio:1/1;max-width:170px'], ['Stående rektangel (4:5)', 'border-radius:12px;aspect-ratio:4/5;max-width:170px']].map(([l, s]) => [l, scene(`<div style="display:flex;flex-direction:column;align-items:center;gap:10px;text-align:center"><img src="img/portratt-3.jpg" alt="Exempelbild" style="width:100%;object-fit:cover;object-position:center 25%;${s}"><div><p class="h h3">Förnamn Efternamn</p><p class="muted small">Roll</p></div></div>`, { bg: '#fff' })])),

    Q('yt-ava-citat', 'Var ska avataren sitta i ett citatkort?',
      [['Stor avatar överst', 'top'], ['Liten avatar bredvid namnet nederst', 'bottom'], ['Ingen avatar', 'none']].map(([l, k]) => [l, scene(card({ gap: '12px', body: `${k === 'top' ? ava('portratt-2', 56, 'border-radius:50%') : ''}<p style="font-size:16px;line-height:1.5">”Ett kort citat på två eller tre rader som beskriver en upplevelse.”</p><div style="display:flex;gap:10px;align-items:center">${k === 'bottom' ? ava('portratt-2', 36, 'border-radius:50%') : ''}<div><p style="font-weight:600;font-size:14px">Förnamn Efternamn</p><p class="muted small">Roll</p></div></div>` }))])),

    Q('yt-ava-status', 'Hur ska en status (till exempel tillgänglig) visas på en avatar?',
      [['Ingen statusmarkering', ''], ['Prick nere till höger', 'dot'], ['Ring runt avataren', 'ring']].map(([l, k]) => [l, scene(`<div style="display:flex;gap:14px;align-items:center"><span style="position:relative;display:inline-block">${ava('portratt-1', 52, 'border-radius:50%;' + (k === 'ring' ? 'box-shadow:0 0 0 2px #fff,0 0 0 4px #1E7A45' : ''))}${k === 'dot' ? '<span style="position:absolute;right:0;bottom:0;width:14px;height:14px;border-radius:50%;background:#1E7A45;box-shadow:0 0 0 2px #fff"></span>' : ''}</span><div><p style="font-weight:600">Förnamn Efternamn</p><p class="muted small">Tillgänglig</p></div></div>`, { bg: '#fff' })])),

    Q('yt-ava-omslag', 'Hur ska avataren sitta i ett profilkort?',
      [['Över omslagsbildens kant', 'over'], ['Under omslagsbilden', 'under'], ['Utan omslagsbild', 'none']].map(([l, k]) => [l, scene(`<div style="background:var(--box);border:${BD};border-radius:12px;overflow:hidden">${k !== 'none' ? IMG('fjallen', '3/1') : ''}<div style="padding:${k === 'over' ? '0 20px 20px' : '20px'};display:flex;flex-direction:column;gap:10px;align-items:flex-start">${ava('portratt-3', 64, 'border-radius:50%;' + (k === 'over' ? 'margin-top:-32px;box-shadow:0 0 0 4px #fff' : ''))}<div><p class="h h3">Förnamn Efternamn</p><p class="muted small">Roll och ort</p></div></div></div>`)])),
  ];

  // ---------- Mönster och textur ----------
  const grain = a => `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 ${a} 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E")`;
  const PAT = {
    none: '',
    grain: `background-image:${grain(.1)}`,
    dots: 'background-image:radial-gradient(rgba(36,64,94,.22) 1.2px,transparent 1.5px);background-size:16px 16px',
    grid: 'background-image:linear-gradient(rgba(36,64,94,.08) 1px,transparent 1px),linear-gradient(90deg,rgba(36,64,94,.08) 1px,transparent 1px);background-size:24px 24px',
    diag: 'background-image:repeating-linear-gradient(135deg,rgba(36,64,94,.07) 0 1px,transparent 1px 10px)',
  };
  const patPanel = (pat, extra) => { const p = uid(); return `<style>.${p}{background-color:var(--ground);${pat}}</style><div class="${p}" style="padding:40px 24px;height:100%;display:flex;flex-direction:column;justify-content:center;${extra || ''}"><span class="eyebrow">Etikett</span><p class="h h2" style="margin-top:6px">Rubrik för sektionen</p><p class="muted" style="margin-top:8px">En kort text under rubriken.</p><div style="margin-top:16px">${card({ pad: '14px', gap: '2px', body: '<p style="font-weight:600">Ett kort på ytan</p><p class="muted small">Kort text</p>' })}</div></div>`; };
  const textur = [
    Q('yt-tex-yta', 'Ska stora ytor ha mönster eller textur?',
      [['Ingen textur', 'none'], ['Korn', 'grain'], ['Prickar', 'dots'], ['Rutnät', 'grid'], ['Diagonala linjer', 'diag']].map(([l, k]) => [l, patPanel(PAT[k])])),

    Q('yt-tex-korn', 'Om ytor får korn: hur tydligt?',
      [['Knappt synligt', .06], ['Tydligt', .12], ['Kraftigt', .22]].map(([l, a]) => [l, patPanel(`background-image:${grain(a)}`)])),

    Q('yt-tex-prickar', 'Om ytor får prickar: hur tätt?',
      [12, 20, 32].map(n => ['Prickar var ' + n + ':e px', patPanel(`background-image:radial-gradient(rgba(36,64,94,.24) 1.2px,transparent 1.5px);background-size:${n}px ${n}px`)])),

    Q('yt-tex-var', 'Var får mönster förekomma?',
      [['Ingenstans', 'none'], ['Bara i uppmaningsrutan', 'cta'], ['På en hel sektion', 'sec'], ['På hela sidans bakgrund', 'page']].map(([l, k]) => {
        const p = uid(), dots = PAT.dots;
        const cls = w => (k === w ? p : '');
        return [l, `<style>.${p}{${dots}}</style><div class="${cls('page')}" style="background-color:#fff;padding:0 0 18px"><div style="padding:24px">${secHead('Sektion 1')}${tiles3()}</div><div class="${cls('sec')}" style="background-color:var(--ground);padding:24px">${secHead('Sektion 2')}${tiles3()}</div><div style="padding:18px 24px 0"><div class="${cls('cta')}" style="background-color:var(--tint);border-radius:16px;padding:22px"><p class="h h3">Redo att börja?</p><span class="sb" style="margin-top:12px">Kom igång</span></div></div></div>`];
      }), 'stack'),

    Q('yt-tex-tona', 'Ska mönster tona ut eller täcka ytan jämnt?',
      [['Jämnt över hela ytan', ''], ['Tonar ut mot ena hörnet', 'mask']].map(([l, k]) => { const p = uid(); return [l, `<style>.${p}{position:relative;background:var(--ground);overflow:hidden}.${p}::before{content:"";position:absolute;inset:0;${PAT.dots};${k ? '-webkit-mask-image:radial-gradient(circle at 100% 0,#000,transparent 70%);mask-image:radial-gradient(circle at 100% 0,#000,transparent 70%)' : ''}}</style><div class="${p}" style="padding:40px 24px;height:100%"><div style="position:relative"><span class="eyebrow">Etikett</span><p class="h h2" style="margin-top:6px">Rubrik för sektionen</p><p class="muted" style="margin-top:8px">En kort text under rubriken.</p></div></div>`]; })),
  ];

  // ---------- Gradienter ----------
  const gradPanel = (bg, extra) => `<div style="background:${bg};padding:40px 24px;height:100%;display:flex;flex-direction:column;justify-content:center;${extra || ''}"><span class="eyebrow">Etikett</span><p class="h h2" style="margin-top:6px">Rubrik för sektionen</p><p class="muted" style="margin-top:8px">En kort text under rubriken.</p><span class="sb" style="margin-top:16px;align-self:flex-start">Läs mer</span></div>`;
  const gradienter = [
    Q('yt-grad-yta', 'Ska stora ytor ha gradient?',
      [
        ['Ingen gradient', 'var(--ground)'],
        ['Subtil gradient', 'linear-gradient(180deg,#FFFFFF,#ECEEEF)'],
        ['Tydlig gradient', 'linear-gradient(180deg,#E6EBF0,color-mix(in srgb,#24405E 30%,#fff))'],
        ['Radiell glöd i hörnet', 'radial-gradient(circle at 0 0,color-mix(in srgb,#24405E 22%,#fff),transparent 60%),var(--ground)'],
      ].map(([l, g]) => [l, gradPanel(g)])),

    Q('yt-grad-kort', 'Ska kort ha gradient på ytan?',
      [
        ['Platt vit yta', 'var(--box)'],
        ['Subtil gradient uppifrån', 'linear-gradient(180deg,#FFFFFF,#F1F3F5)'],
        ['Glöd i ett hörn', 'radial-gradient(circle at 100% 0,#DCE3EA,transparent 55%),#fff'],
      ].map(([l, g]) => [l, scene(card({ bg: g, body: EB + H3 + TX + PR }))])),

    Q('yt-grad-riktning', 'Om en yta får tydlig gradient: åt vilket håll?',
      [
        ['Uppifrån och ned', 'linear-gradient(180deg,#E6EBF0,color-mix(in srgb,#24405E 32%,#fff))'],
        ['Diagonalt', 'linear-gradient(135deg,#E6EBF0,color-mix(in srgb,#24405E 32%,#fff))'],
        ['Radiellt från mitten', 'radial-gradient(circle at 50% 40%,#E6EBF0,color-mix(in srgb,#24405E 32%,#fff))'],
      ].map(([l, g]) => [l, gradPanel(g)])),

    Q('yt-grad-kant', 'Får kort ha en kant med gradient?',
      [
        ['Enfärgad tunn kant', `border:${BD}`],
        ['Kant med gradient', 'border:1.5px solid transparent;background:linear-gradient(#fff,#fff) padding-box,linear-gradient(135deg,#24405E,rgba(36,64,94,.1)) border-box'],
      ].map(([l, s]) => [l, scene(`<div style="border-radius:12px;padding:20px;display:flex;flex-direction:column;gap:8px;background:#fff;${s}">${EB}${H3}${TX}${PR}</div>`)])),

    Q('yt-grad-overgang', 'Hur ska övergången mellan två sektionsbakgrunder se ut?',
      [['Skarp kant', false], ['Mjuk övergång med gradient', true]].map(([l, soft]) => [l, `<div style="background:${soft ? 'linear-gradient(180deg,#fff 0,#fff 30%,var(--tint) 62%,var(--tint) 100%)' : 'linear-gradient(180deg,#fff 0,#fff 46%,var(--tint) 46%,var(--tint) 100%)'}">${sec('transparent', secHead('Sektion 1'))}<div style="height:40px"></div>${sec('transparent', secHead('Sektion 2') + tiles3())}</div>`]), 'stack'),
  ];

  // ---------- Mörkt läge ----------
  const DK = '--sink:#F2F2F0;--smuted:rgba(242,242,240,.64);color:#F2F2F0;';
  const dscene = (inner, bg, o = {}) => `<div style="background:${bg || '#121212'};${DK}padding:${o.pad || '26px 24px'};height:100%;display:flex;flex-direction:column;justify-content:center"><div style="width:100%;max-width:${o.mw || '260px'};margin:0 auto">${inner}</div></div>`;
  const dcard = (st, o = {}) => `<div style="border-radius:12px;overflow:hidden;display:flex;flex-direction:column;${st}">${o.img ? IMG(o.img, '3/2', o.imgSt) : ''}<div style="padding:20px;display:flex;flex-direction:column;gap:8px">${EB}${H3}${TX}${o.foot || ''}</div></div>`;
  const mix = (p, bg) => `color-mix(in srgb,#fff ${p}%,${bg})`;
  const morkt = [
    Q('yt-mork-bakgrund', 'Hur mörk ska sidans bakgrund vara i mörkt läge?',
      [['Helt svart (#000000)', '#000000'], ['Nästan svart (#121212)', '#121212'], ['Mörkgrå (#1A1C1E)', '#1A1C1E'], ['Blåsvart (#0F1720)', '#0F1720']].map(([l, c]) => [l, dscene(dcard(`background:${mix(7, c)}`), c)])),

    Q('yt-mork-kort', 'Hur ska kort skiljas från bakgrunden i mörkt läge?',
      [
        ['Ljusare yta', `background:${mix(7, '#121212')}`],
        ['Bara en tunn kant', 'border:1px solid rgba(255,255,255,.14)'],
        ['Ljusare yta och kant', `background:${mix(7, '#121212')};border:1px solid rgba(255,255,255,.10)`],
      ].map(([l, s]) => [l, dscene(dcard(s))])),

    Q('yt-mork-hojning', 'Hur mycket ljusare ska ett kort vara än bakgrunden i mörkt läge?',
      [['Lite ljusare (+4 %)', 4], ['Tydligt ljusare (+8 %)', 8], ['Mycket ljusare (+13 %)', 13]].map(([l, p]) => [l, dscene(dcard(`background:${mix(p, '#121212')}`))])),

    Q('yt-mork-kant', 'Hur synlig ska en kortkant vara i mörkt läge?',
      [['Knappt synlig (6 %)', .06], ['Diskret (12 %)', .12], ['Tydlig (20 %)', .2]].map(([l, a]) => [l, dscene(dcard(`background:${mix(5, '#121212')};border:1px solid rgba(255,255,255,${a})`))])),

    Q('yt-mork-bild', 'Ska bilder dämpas i mörkt läge?',
      [['Oförändrade', ''], ['Lätt dämpade (10 %)', 'filter:brightness(.9)'], ['Tydligt dämpade (20 %)', 'filter:brightness(.8)']].map(([l, f]) => [l, dscene(dcard(`background:${mix(7, '#121212')}`, { img: 'stugor-sjo', imgSt: f }))])),

    Q('yt-mork-skugga', 'Hur ska djup visas i mörkt läge?',
      [
        ['Ingen skugga', `background:${mix(7, '#121212')}`],
        ['Djup svart skugga', `background:${mix(7, '#121212')};box-shadow:0 16px 36px rgba(0,0,0,.6)`],
        ['Ljus överkant', `background:${mix(7, '#121212')};box-shadow:inset 0 1px 0 rgba(255,255,255,.12)`],
      ].map(([l, s]) => [l, dscene(dcard(s), '#121212', { pad: '32px 24px' })])),

    Q('yt-mork-sektioner', 'Hur ska sektioner skiljas åt i mörkt läge?',
      [['Ljusare band', 'band'], ['Tunn linje', 'line'], ['Bara luft', 'air']].map(([l, k]) => [l, `<div style="background:#121212;${DK}">${[0, 1, 2].map(i => `<div style="padding:${k === 'air' ? '36px' : '26px'} 24px;${k === 'band' && i === 1 ? `background:${mix(5, '#121212')};` : ''}${k === 'line' && i ? 'border-top:1px solid rgba(255,255,255,.12);' : ''}"><div style="max-width:680px;margin:0 auto"><p class="h h3">Sektion ${i + 1}</p><p class="small" style="color:var(--smuted);margin-top:4px">En rad som förklarar sektionen.</p></div></div>`).join('')}</div>`]), 'stack'),

    Q('yt-mork-dialog', 'Hur ska en dialog se ut i mörkt läge?',
      [
        ['Ljusare yta än sidan', `background:${mix(11, '#121212')}`],
        ['Samma ton som sidan, med kant', 'background:#121212;border:1px solid rgba(255,255,255,.16)'],
      ].map(([l, s]) => [l, `<div style="background:#121212;${DK}padding:20px;height:100%;position:relative"><div style="opacity:.5" class="stack"><p class="h h3">Sidans innehåll</p><p class="small" style="color:var(--smuted)">Text som ligger bakom dialogen.</p></div><div style="position:absolute;inset:0;background:rgba(0,0,0,.55)"></div><div style="position:relative;margin:18px auto 0;max-width:260px;border-radius:12px;padding:20px;display:flex;flex-direction:column;gap:8px;${s}"><p class="h h3">Ta bort objektet?</p><p class="small" style="color:var(--smuted)">Det går inte att ångra efteråt.</p><div class="row" style="justify-content:flex-end;gap:8px;margin-top:8px"><span class="sb2" style="height:38px;padding:0 14px;font-size:14px;border-color:rgba(255,255,255,.3);color:#F2F2F0">Avbryt</span><span class="sb" style="height:38px;padding:0 14px;font-size:14px;background:#F2F2F0;border-color:#F2F2F0;color:#121212">Ta bort</span></div></div></div>`])),

    Q('yt-mork-ton', 'Ska mörka ytor vara neutralt grå eller svagt tonade?',
      [['Neutralt grå', ['#121212', '#1E1F21']], ['Svagt tonade mot accentfärgen', ['#10151C', '#1A222D']]].map(([l, [bg, c]]) => [l, dscene(dcard(`background:${c}`), bg)])),

    Q('yt-mork-inforuta', 'Hur ska en markerad ruta se ut i mörkt läge?',
      [['Tonad med accentfärg', 'background:rgba(120,160,210,.14)'], ['Ljusare grå', `background:${mix(8, '#121212')}`], ['Bara en ljus kant', 'border:1px solid rgba(255,255,255,.18)']].map(([l, s]) => [l, dscene(`<div class="stack" style="gap:12px"><p class="small" style="color:var(--smuted)">Ett stycke brödtext före rutan.</p><div style="display:flex;gap:10px;align-items:flex-start;border-radius:8px;padding:14px 16px;${s}">${ico(I.info, 'color:#9DB8D8;margin-top:1px')}<p class="small">Leveransen tar normalt två till tre arbetsdagar.</p></div><p class="small" style="color:var(--smuted)">Texten fortsätter efter rutan.</p></div>`)])),
  ];

  // ---------- Tillägg i tidigare grupper ----------
  skuggor.push(
    Q('yt-skugga-ton', 'Vilken ton ska skuggorna ha?',
      [['Neutral grå', 'rgba(26,28,30,.14)'], ['Tonad mot accentfärgen', 'rgba(36,64,94,.24)']].map(([l, c]) => [l, sc(`0 12px 30px ${c}`)])),

    Q('yt-skugga-djup', 'Hur mycket djup ska gränssnittet ha överlag?',
      [
        ['Platt: inga skuggor, bara kanter', [BD, 'none', 'none']],
        ['Lätt djup: hårfina skuggor', ['1px solid rgba(26,28,30,.06)', SH.hair, '0 6px 16px rgba(26,28,30,.10)']],
        ['Tydligt djup: mjuka skuggor', ['none', '0 10px 26px rgba(26,28,30,.10)', '0 18px 40px rgba(26,28,30,.16)']],
      ].map(([l, [b, c, m]]) => [l, scene(`<div style="display:flex;flex-direction:column;gap:12px"><div style="background:#fff;border:${b};box-shadow:${c};border-radius:10px;height:40px;display:flex;align-items:center;justify-content:space-between;padding:0 12px"><span style="font-weight:700;font-size:14px">Logotyp</span>${ico('<path d="M4 7h16M4 12h16M4 17h16"/>', 'width:18px;height:18px')}</div><div style="position:relative">${card({ bd: b, sh: c, pad: '16px', gap: '6px', body: H3s + TX })}<div style="position:absolute;right:12px;top:52px;width:130px;background:#fff;border-radius:10px;border:${b === 'none' ? 'none' : BD};box-shadow:${m};padding:4px 0">${['Redigera', 'Dela', 'Ta bort'].map(t => `<div style="padding:7px 12px;font-size:13px">${t}</div>`).join('')}</div></div></div>`, { pad: '28px 24px' })])),
  );

  sektioner.push(
    Q('yt-sek-rubrik', 'Hur ska en sektionsrubrik placeras över ett kortrutnät?',
      [['Vänsterställd', 'left'], ['Centrerad', 'center'], ['Vänster, med länk till höger', 'link']].map(([l, k]) => [l, `<div style="background:#fff;padding:28px 24px"><div style="max-width:720px;margin:0 auto"><div style="display:flex;justify-content:space-between;align-items:flex-end;gap:12px;flex-wrap:wrap;margin-bottom:16px;${k === 'center' ? 'flex-direction:column;align-items:center;text-align:center' : ''}"><div><p class="h h2">Rubrik för sektionen</p><p class="muted" style="margin-top:4px">En rad som förklarar sektionen.</p></div>${k === 'link' ? '<span class="link">Visa alla</span>' : ''}</div>${tiles3(3, 'min-height:80px')}</div></div>`]), 'stack'),

    Q('yt-sek-bildsektion', 'Hur ska en sektion med bakgrundsbild ligga på sidan?',
      [['Bilden i full bredd', false], ['Bilden i en inramad, rundad panel', true]].map(([l, p]) => [l, `<div style="background:#fff;padding:${p ? '16px' : '0'}">${overlay({ img: 'fjallen', ratio: 'auto', r: p ? '24px' : '0', st: 'min-height:260px', shade: 'rgba(0,0,0,.35)', pos: 'center', pad: '32px', body: '<p class="h h2">Rubrik för sektionen</p><p style="color:rgba(255,255,255,.88)">En kort text ovanpå bilden.</p>' })}</div>`]), 'stack'),
  );

  rutnat.push(
    Q('yt-rut-sista-rad', 'Hur ska en ofullständig sista rad med kort placeras?',
      [['Vänsterställd', 'flex-start', false], ['Centrerad', 'center', false], ['Korten sträcks ut över raden', 'flex-start', true]].map(([l, j, grow]) => [l, page(`<div style="display:flex;flex-wrap:wrap;gap:16px;justify-content:${j}">${IMGS.slice(0, 5).map(i => mc(i, { ratio: '16/9', st: `flex:${grow ? '1 1' : '0 0'} calc((100% - 32px) / 3)` })).join('')}</div>`)]), 'stack'),

    Q('yt-rut-karusell', 'Hur ska en vågrät rad med kort se ut på en dator?',
      [['Hela kort och pilar', false], ['Nästa kort skymtar i kanten', true]].map(([l, peek]) => [l, `<div style="background:var(--ground);padding:24px 0 24px 24px;overflow:hidden"><div style="display:flex;justify-content:space-between;align-items:center;padding-right:24px;margin-bottom:14px"><p class="h h3">Rubrik</p>${peek ? '' : `<div style="display:flex;gap:8px">${['<path d="M15 6l-6 6 6 6"/>', I.chevR].map(d => `<span style="width:36px;height:36px;border-radius:50%;border:${BD};background:#fff;display:grid;place-items:center">${ico(d, 'width:18px;height:18px')}</span>`).join('')}</div>`}</div><div style="display:flex;gap:16px;${peek ? '' : 'padding-right:24px'}">${IMGS.slice(0, 4).map(i => mc(i, { st: `flex:0 0 ${peek ? 'calc((100% - 48px) / 3.4)' : 'calc((100% - 32px) / 3)'}` })).join('')}</div></div>`]), 'stack'),

    Q('yt-rut-scrollkant', 'Hur ska kanten på en vågrät rad som går att scrolla se ut?',
      [['Rak avskärning', false], ['Tonar ut mot kanten', true]].map(([l, f]) => [l, scene(`<div style="display:flex;gap:10px;overflow:hidden;${f ? '-webkit-mask-image:linear-gradient(90deg,#000 70%,transparent);mask-image:linear-gradient(90deg,#000 70%,transparent)' : ''}">${IMGS.slice(0, 3).map(i => mc(i, { ratio: '1/1', st: 'flex:0 0 46%' })).join('')}</div>`, { mw: '320px' })])),
  );

  ramar.push(
    Q('yt-ram-staplade', 'Får bildgrupper visas som staplade, lätt vridna foton?',
      [['Nej, bilder bredvid varandra', false], ['Ja, staplade och lätt vridna', true]].map(([l, st]) => [l, scene(st
        ? `<div style="position:relative;height:220px">${[['-6deg', '4%', '18px'], ['4deg', '30%', '6px'], ['-1deg', '17%', '40px']].map(([r, x, y], i) => `<div style="position:absolute;left:${x};top:${y};width:62%;background:#fff;padding:6px 6px 18px;box-shadow:0 6px 16px rgba(26,28,30,.16);transform:rotate(${r})"><img src="img/${IMGS[i]}.jpg" alt="Exempelbild" style="width:100%;aspect-ratio:1/1;object-fit:cover"></div>`).join('')}</div>`
        : `<div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px">${IMGS.slice(0, 3).map(i => `<img src="img/${i}.jpg" alt="Exempelbild" style="width:100%;aspect-ratio:1/1;object-fit:cover;border-radius:8px">`).join('')}</div>`, { bg: '#fff' })])),
  );

  // ---------- Flytande ytor ----------
  const behind = `<div style="padding:18px" class="stack"><p class="h h3">Sidans innehåll</p><p class="small muted">Text som ligger bakom.</p>${IMG('skog-sjo', '16/9', 'border-radius:8px')}</div>`;
  const dlg = (pad, extra) => `<div style="position:relative;background:var(--box);border-radius:12px;padding:${pad || 22}px;display:flex;flex-direction:column;gap:8px;max-width:250px;width:100%;box-shadow:0 18px 40px rgba(26,28,30,.18)">${extra || ''}<p class="h h3">Spara ändringarna?</p><p class="muted small">Du har ändringar som inte är sparade.</p><div class="row" style="gap:8px;margin-top:8px;justify-content:flex-end"><span class="sb2" style="height:38px;padding:0 14px;font-size:14px">Avbryt</span><span class="sb" style="height:38px;padding:0 14px;font-size:14px">Spara</span></div></div>`;
  const overlayScene = (bd, inner) => `<div style="position:relative;background:#fff;height:100%;min-height:300px">${behind}<div style="position:absolute;inset:0;${bd}"></div><div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;padding:16px">${inner}</div></div>`;
  const HEART = '<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>';
  const flytande = [
    Q('yt-flyt-bakgrund', 'Hur ska bakgrunden bakom en dialog se ut?',
      [['Mörk, 40 %', 'background:rgba(26,28,30,.4)'], ['Mörk, 65 %', 'background:rgba(26,28,30,.65)'], ['Ljus, 70 %', 'background:rgba(255,255,255,.72)'], ['Mörk med oskärpa', 'background:rgba(26,28,30,.32);-webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px)']].map(([l, b]) => [l, overlayScene(b, dlg())])),

    Q('yt-flyt-dialog-luft', 'Hur mycket luft ska en dialog ha inuti?',
      [16, 24, 32].map(n => [n + ' px utfyllnad', overlayScene('background:rgba(26,28,30,.45)', dlg(n))])),

    Q('yt-flyt-stang', 'Ska en dialog ha en stängknapp i hörnet?',
      [
        ['Ett X uppe till höger', `<span style="position:absolute;top:14px;right:14px;color:var(--smuted)">${ico('<path d="M6 6l12 12M18 6L6 18"/>', 'width:18px;height:18px')}</span>`],
        ['Ett X i en grå cirkel', `<span style="position:absolute;top:12px;right:12px;width:30px;height:30px;border-radius:50%;background:var(--ground);display:grid;place-items:center">${ico('<path d="M6 6l12 12M18 6L6 18"/>', 'width:16px;height:16px')}</span>`],
        ['Ingen stängknapp, bara knapparna', ''],
      ].map(([l, x]) => [l, overlayScene('background:rgba(26,28,30,.45)', dlg(22, x))])),

    Q('yt-flyt-tooltip', 'Hur ska en tooltip-yta se ut?',
      [['Mörk ruta', 'background:#1A1C1E;color:#fff'], ['Vit ruta med skugga', `background:#fff;color:var(--sink);border:${BD};box-shadow:0 8px 20px rgba(26,28,30,.12)`], ['Ruta i accentfärg', 'background:var(--brand);color:#fff']].map(([l, s]) => [l, scene(`<div style="display:flex;flex-direction:column;align-items:flex-start;gap:8px"><div style="font-size:13px;line-height:1.4;padding:8px 11px;border-radius:8px;max-width:210px;${s}">Visas när man håller muspekaren över ikonen.</div><span style="display:inline-flex;gap:6px;align-items:center;font-weight:600;margin-left:8px">Leveranstid ${ico(I.info, 'width:18px;height:18px;color:var(--smuted)')}</span></div>`, { bg: '#fff' })])),

    Q('yt-flyt-pil', 'Ska utfällda paneler ha en liten pil mot knappen de hör till?',
      [['Med pil', true], ['Utan pil', false]].map(([l, a]) => [l, scene(`<span class="sb2" style="height:40px;padding:0 16px;font-size:14px">Filter ${ico(I.chev, 'width:16px;height:16px')}</span><div style="position:relative;margin-top:${a ? 12 : 8}px;background:#fff;border:${BD};border-radius:10px;box-shadow:0 10px 26px rgba(26,28,30,.12);padding:14px">${a ? `<span style="position:absolute;top:-7px;left:28px;width:12px;height:12px;background:#fff;border-left:${BD};border-top:${BD};transform:rotate(45deg)"></span>` : ''}<p style="font-weight:600;font-size:14px">Visa endast</p><div class="stack" style="gap:6px;margin-top:8px">${['Tillgängliga', 'Nyheter'].map(t => `<span class="small" style="display:flex;gap:8px;align-items:center"><span style="width:16px;height:16px;border-radius:4px;border:1.5px solid rgba(26,28,30,.35)"></span>${t}</span>`).join('')}</div></div>`, { bg: 'var(--box)' })])),

    Q('yt-flyt-handtag', 'Hur ska en panel som glider upp i mobilen visa att den kan stängas?',
      [['Draghandtag överst', 'h'], ['Stängknapp (X)', 'x'], ['Både handtag och X', 'hx']].map(([l, k]) => [l, `<div style="padding:16px">${phone(`<div style="position:absolute;inset:0;background:rgba(26,28,30,.45)"></div><div style="position:absolute;left:0;right:0;bottom:0;background:var(--box);border-radius:20px 20px 0 0;padding:${k === 'x' ? 16 : 10}px 16px 20px;display:flex;flex-direction:column;gap:10px">${k.includes('h') ? '<div style="width:36px;height:4px;border-radius:2px;background:rgba(26,28,30,.2);margin:0 auto 4px"></div>' : ''}<div style="display:flex;justify-content:space-between;align-items:center"><p class="h h3">Filter</p>${k.includes('x') ? ico('<path d="M6 6l12 12M18 6L6 18"/>', 'color:var(--smuted)') : ''}</div><span class="inp ph">Välj kategori</span><span class="inp ph">Välj pris</span><span class="sb">Visa resultat</span></div>`)}</div>`])),

    Q('yt-flyt-mobilbar', 'Hur ska en fast knappbalk längst ner i mobilen avgränsas?',
      [['Skugga uppåt', 'background:#fff;box-shadow:0 -6px 18px rgba(26,28,30,.10)'], ['Tunn linje', 'background:#fff;border-top:1px solid rgba(26,28,30,.12)'], ['Frostat glas', 'background:rgba(255,255,255,.7);-webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px)']].map(([l, s]) => [l, `<div style="padding:16px">${phone(`<div style="padding:12px;display:flex;flex-direction:column;gap:10px;background:#fff;height:100%">${IMG('kopenhamn', '4/3', 'border-radius:10px')}<p class="h h3">Rubrik</p><p class="muted small">Text som scrollar under balken.</p>${IMG('stugor-sjo', '4/3', 'border-radius:10px')}</div><div style="position:absolute;left:0;right:0;bottom:0;padding:12px 14px;display:flex;justify-content:space-between;align-items:center;gap:10px;${s}"><span class="price">495 kr</span><span class="sb" style="height:42px;padding:0 18px">Boka</span></div>`)}</div>`])),

    Q('yt-flyt-menyrad', 'Hur ska den markerade raden i en meny se ut?',
      [['Tonad rad i hela bredden', 'full'], ['Infälld, rundad tonad rad', 'inset'], ['Bara fet text och bock', 'bold']].map(([l, k]) => [l, scene(`<div style="background:#fff;border:${BD};border-radius:10px;box-shadow:0 8px 24px rgba(26,28,30,.12);padding:${k === 'inset' ? '6px' : '4px 0'}">${['Senaste', 'Pris, lägst först', 'Populärast'].map((t, i) => `<div style="display:flex;justify-content:space-between;align-items:center;padding:10px 14px;font-size:14px;${i === 1 ? (k === 'full' ? 'background:var(--tint);font-weight:600' : k === 'inset' ? 'background:var(--tint);border-radius:6px;font-weight:600' : 'font-weight:700') : ''}">${t}${i === 1 && k === 'bold' ? ico(I.check, 'width:16px;height:16px;color:var(--brand)') : ''}</div>`).join('')}</div>`, { mw: '230px' })])),
  ];

  // ---------- Listor och tabeller ----------
  const TROWS = [['Rad ett', '12 mars', '495 kr'], ['Rad två', '14 mars', '1 290 kr'], ['Rad tre', '20 mars', '320 kr']];
  const listor = [
    Q('yt-lista-tabellhuvud', 'Hur ska rubrikraden i en tabell se ut?',
      [['Tonad rubrikrad', 'background:var(--ground)'], ['Bara en tydlig linje under', 'border-bottom:2px solid rgba(26,28,30,.7)'], ['Ingen avgränsning', '']].map(([l, s]) => [l, scene(`<div style="background:#fff;border:${BD};border-radius:10px;overflow:hidden;font-size:14px">${[['Namn', 'Datum', 'Belopp'], ...TROWS].map((r, i) => `<div style="display:grid;grid-template-columns:1.2fr 1fr 1fr;gap:8px;padding:11px 14px;${i ? (i > 1 ? 'border-top:1px solid rgba(26,28,30,.08)' : '') : 'font-weight:600;font-size:13px;' + s}">${r.map((c, j) => `<span style="${j === 2 ? 'text-align:right' : ''}">${c}</span>`).join('')}</div>`).join('')}</div>`, { mw: '320px' })])),

    Q('yt-lista-radhojd', 'Hur höga ska rader i en lista vara?',
      [40, 52, 64].map(n => [n + ' px höga rader', scene(`<div style="background:#fff;border:${BD};border-radius:10px;overflow:hidden">${TROWS.map((r, i) => `<div style="height:${n}px;display:flex;align-items:center;justify-content:space-between;padding:0 14px;${i ? 'border-top:1px solid rgba(26,28,30,.08)' : ''}"><span>${r[0]}</span><span class="price">${r[2]}</span></div>`).join('')}</div>`)])),

    Q('yt-lista-avdelare', 'Hur långa ska linjerna mellan rader med bild vara?',
      [['Hela radens bredd', 'full'], ['Från texten (indragna)', 'inset'], ['Inga linjer', 'none']].map(([l, k]) => [l, scene(`<div style="background:#fff;border:${BD};border-radius:10px;overflow:hidden">${PP.map((n, i) => `<div style="display:flex;gap:12px;align-items:center;padding-left:14px;${i && k === 'full' ? 'border-top:1px solid rgba(26,28,30,.10)' : ''}">${ava(n, 40, 'border-radius:50%')}<div style="flex:1;min-width:0;padding:12px 14px 12px 0;${i && k === 'inset' ? 'border-top:1px solid rgba(26,28,30,.10)' : ''}"><p style="font-weight:600;font-size:14px">Förnamn Efternamn</p><p class="muted small">Kort text</p></div></div>`).join('')}</div>`)])),
  ];

  // ---------- Kortvarianter ----------
  const kortvarianter = [
    Q('yt-kv-rubrik-bild', 'Ska rubriken stå ovanför eller under bilden i ett kort?',
      [['Under bilden', false], ['Ovanför bilden', true]].map(([l, a]) => [l, scene(`<div style="background:var(--box);border:${BD};border-radius:12px;overflow:hidden">${a ? `<div style="padding:18px 20px 14px" class="stack">${EB}${H3}</div>${IMG('skog-sjo')}<div style="padding:14px 20px 18px">${TX}</div>` : `${IMG('skog-sjo')}<div style="padding:18px 20px" class="stack">${EB}${H3}${TX}</div>`}</div>`)])),

    Q('yt-kv-tva-knappar', 'Hur ska ett kort med två handlingar byggas?',
      [
        ['Två knappar bredvid varandra', `<div class="row" style="gap:8px;margin-top:6px">${smallBtn('Boka tid')}<span class="sb2" style="height:40px;padding:0 16px;font-size:14px">Läs mer</span></div>`],
        ['Knapp och textlänk', `<div class="row" style="gap:16px;margin-top:6px">${smallBtn('Boka tid')}<span class="link">Läs mer</span></div>`],
        ['Knapp och ikonknapp', `<div class="row" style="gap:8px;margin-top:6px">${smallBtn('Boka tid', 'flex:1')}<span style="width:40px;height:40px;border-radius:10px;border:2px solid var(--brand);color:var(--brand);display:grid;place-items:center">${ico(HEART, 'width:18px;height:18px')}</span></div>`],
      ].map(([l, f]) => [l, scene(card({ img: 'skog-sjo', body: EB + H3 + TX + `<div style="width:100%">${f}</div>` }))])),

    Q('yt-kv-pris', 'Hur ska ett priskort byggas?',
      [['Allt på samma yta', 'flat'], ['Tonad överdel med namn och pris', 'tint'], ['Mörk överdel', 'dark']].map(([l, k]) => {
        const top = `<span class="eyebrow">Plus</span><p class="h h2">695 kr</p><p class="small" style="color:var(--smuted)">per månad</p>`;
        const list = ['Första fördelen', 'Andra fördelen', 'Tredje fördelen'].map(t => `<p class="small" style="display:flex;gap:8px;align-items:center">${ico(I.check, 'width:16px;height:16px;color:var(--brand)')}${t}</p>`).join('');
        return [l, scene(`<div style="background:var(--box);border:${BD};border-radius:12px;overflow:hidden"><div style="padding:20px 20px ${k === 'flat' ? '6px' : '18px'};display:flex;flex-direction:column;gap:2px;${k === 'tint' ? 'background:var(--tint)' : k === 'dark' ? 'background:var(--brand);--sink:#fff;--smuted:rgba(255,255,255,.75);color:#fff' : ''}">${top}</div><div style="padding:16px 20px 20px;display:flex;flex-direction:column;gap:8px">${list}<span class="sb" style="margin-top:8px">Välj</span></div></div>`)];
      })),

    Q('yt-kv-person', 'Hur ska ett personkort byggas?',
      [['Foto överst i hela bredden', 'top'], ['Rund bild, centrerat', 'round'], ['Liten bild till vänster', 'left']].map(([l, k]) => [l, scene(k === 'top'
        ? `<div style="background:var(--box);border:${BD};border-radius:12px;overflow:hidden">${IMG('portratt-1', '4/3', 'object-position:center 25%')}<div style="padding:16px 18px"><p class="h h3">Förnamn Efternamn</p><p class="muted small">Roll</p></div></div>`
        : k === 'round'
          ? `<div style="background:var(--box);border:${BD};border-radius:12px;padding:24px 18px;display:flex;flex-direction:column;align-items:center;text-align:center;gap:10px">${ava('portratt-1', 96, 'border-radius:50%')}<div><p class="h h3">Förnamn Efternamn</p><p class="muted small">Roll</p></div></div>`
          : `<div style="background:var(--box);border:${BD};border-radius:12px;padding:14px;display:flex;gap:14px;align-items:center">${ava('portratt-1', 64, 'border-radius:10px')}<div><p class="h h3">Förnamn Efternamn</p><p class="muted small">Roll</p></div></div>`)])),

    Q('yt-kv-steg', 'Hur ska numrerade stegkort se ut?',
      [['Stor siffra överst', 'big'], ['Siffra i en cirkel', 'circle'], ['"Steg 1" som etikett', 'eyebrow'], ['Ingen siffra', 'none']].map(([l, k]) => [l, scene(`<div style="display:flex;gap:10px;flex-wrap:wrap">${[1, 2].map(n => `<div style="flex:1 1 110px;min-width:0;background:var(--box);border:${BD};border-radius:12px;padding:16px;display:flex;flex-direction:column;gap:6px;align-items:flex-start">${k === 'big' ? `<span style="font-size:30px;font-weight:700;line-height:1;color:var(--brand)">0${n}</span>` : k === 'circle' ? `<span style="width:30px;height:30px;border-radius:50%;background:var(--tint);color:var(--brand);display:grid;place-items:center;font-weight:700;font-size:14px">${n}</span>` : k === 'eyebrow' ? `<span class="eyebrow">Steg ${n}</span>` : ''}<p style="font-weight:600">Rubrik</p><p class="muted small">Kort text om steget.</p></div>`).join('')}</div>`, { mw: '320px' })])),

    Q('yt-kv-favorit', 'Hur ska en favoritknapp på ett bildkort se ut?',
      [['Vit cirkel med hjärta', 'circle'], ['Fritt hjärta med skugga', 'plain'], ['Ingen favoritknapp', 'none']].map(([l, k]) => [l, scene(`<div style="background:var(--box);border:${BD};border-radius:12px;overflow:hidden"><div style="position:relative">${IMG('produkt-stol', '1/1')}${k === 'circle' ? `<span style="position:absolute;top:10px;right:10px;width:34px;height:34px;border-radius:50%;background:#fff;display:grid;place-items:center;color:var(--sink)">${ico(HEART, 'width:18px;height:18px')}</span>` : k === 'plain' ? `<span style="position:absolute;top:12px;right:12px;color:#fff;filter:drop-shadow(0 1px 2px rgba(0,0,0,.5))">${ico(HEART, 'width:24px;height:24px')}</span>` : ''}</div><div style="padding:14px 16px"><p style="font-weight:600">Produktnamn</p><p class="price">1 495 kr</p></div></div>`, { mw: '220px' })])),

    Q('yt-kv-kategori', 'Hur ska rutor för kategorier se ut?',
      [['Bild med text under', 'below'], ['Text på bilden', 'on'], ['Ikon på tonad ruta', 'icon']].map(([l, k]) => [l, scene(`<div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px">${['Kategori ett', 'Kategori två', 'Kategori tre', 'Kategori fyra'].map((t, i) => k === 'below'
        ? `<div>${IMG(IMGS[i], '4/3', 'border-radius:10px')}<p style="font-weight:600;font-size:14px;margin-top:6px">${t}</p></div>`
        : k === 'on'
          ? `<div style="position:relative;border-radius:10px;overflow:hidden;aspect-ratio:4/3"><img src="img/${IMGS[i]}.jpg" alt="Exempelbild" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover"><span style="position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,0) 40%,rgba(0,0,0,.6))"></span><span style="position:absolute;left:10px;bottom:8px;color:#fff;font-weight:600;font-size:14px">${t}</span></div>`
          : `<div style="background:var(--tint);border-radius:10px;padding:14px;display:flex;flex-direction:column;gap:8px;color:var(--brand)">${ico(ICO_LAY)}<span style="font-weight:600;font-size:14px;color:var(--sink)">${t}</span></div>`).join('')}</div>`)])),

    Q('yt-kv-datum', 'Hur ska ett datum visas på ett kort?',
      [['Datumruta till vänster', 'tile'], ['Datummärke på bilden', 'img'], ['Som textrad över rubriken', 'text']].map(([l, k]) => {
        const tile = st => `<span style="display:flex;flex-direction:column;align-items:center;justify-content:center;width:52px;height:56px;border-radius:10px;flex:0 0 auto;${st}"><span style="font-size:20px;font-weight:700;line-height:1">12</span><span style="font-size:12px;font-weight:600">mars</span></span>`;
        return [l, scene(`<div style="background:var(--box);border:${BD};border-radius:12px;overflow:hidden"><div style="position:relative">${IMG('stockholm', '16/9')}${k === 'img' ? `<span style="position:absolute;top:10px;left:10px">${tile('background:#fff;color:var(--sink)')}</span>` : ''}</div><div style="padding:16px 18px;display:flex;gap:14px;align-items:flex-start">${k === 'tile' ? tile('background:var(--tint);color:var(--brand)') : ''}<div class="stack" style="gap:4px">${k === 'text' ? '<span class="small" style="font-weight:600;color:var(--brand)">12 mars · 18.00</span>' : ''}<p class="h h3">Rubrik på en rad</p><p class="muted small">Kort text om tillfället.</p></div></div></div>`)];
      })),

    Q('yt-kv-citat', 'Hur ska ett citatkort se ut?',
      [['Stort citattecken', 'mark'], ['Linje till vänster', 'line'], ['Enkelt, utan markering', 'plain']].map(([l, k]) => [l, scene(`<div style="background:var(--box);border:${BD};border-radius:12px;padding:20px;display:flex;flex-direction:column;gap:12px">${k === 'mark' ? '<span style="font-size:54px;line-height:.6;height:26px;color:var(--brand);font-weight:700">“</span>' : ''}<p style="font-size:16px;line-height:1.5;${k === 'line' ? 'border-left:3px solid var(--brand);padding-left:14px' : ''}">Ett kort citat på två eller tre rader som beskriver en upplevelse.</p><div style="display:flex;gap:10px;align-items:center">${ava('portratt-2', 36, 'border-radius:50%')}<div><p style="font-weight:600;font-size:14px">Förnamn Efternamn</p><p class="muted small">Roll</p></div></div></div>`)])),

    Q('yt-kv-formular', 'Ska ett formulär ligga i en panel?',
      [['I ett vitt kort på grå sida', 'card'], ['Direkt på sidan', 'page'], ['I en tonad panel', 'tint']].map(([l, k]) => [l, `<div style="background:${k === 'card' ? 'var(--ground)' : '#fff'};padding:24px;height:100%"><div style="max-width:300px;margin:0 auto;display:flex;flex-direction:column;gap:12px;${k === 'card' ? `background:#fff;border:${BD};border-radius:14px;padding:20px` : k === 'tint' ? 'background:var(--tint);border-radius:14px;padding:20px' : ''}"><p class="h h3">Kontakta oss</p><div class="fld"><span class="lbl">Namn</span><span class="inp ph">För- och efternamn</span></div><div class="fld"><span class="lbl">E-post</span><span class="inp ph">namn@exempel.se</span></div><span class="sb">Skicka</span></div></div>`])),

    Q('yt-kv-video', 'Hur ska en uppspelningsknapp på en bild se ut?',
      [['Vit cirkel', 'white'], ['Mörk halvgenomskinlig cirkel', 'dark'], ['Liten ikon och speltid i hörnet', 'corner']].map(([l, k]) => [l, scene(`<div style="position:relative;border-radius:12px;overflow:hidden">${IMG('fjallen-vandring', '16/9')}${k === 'corner'
        ? `<span style="position:absolute;left:10px;bottom:10px;display:inline-flex;gap:6px;align-items:center;background:rgba(0,0,0,.6);color:#fff;border-radius:999px;padding:4px 10px 4px 8px;font-size:12px;font-weight:600"><svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>2:14</span>`
        : `<span style="position:absolute;inset:0;display:grid;place-items:center"><span style="width:56px;height:56px;border-radius:50%;display:grid;place-items:center;${k === 'white' ? 'background:#fff;color:#1A1C1E' : 'background:rgba(0,0,0,.5);color:#fff;-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px)'}"><svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true" style="margin-left:3px"><path d="M8 5v14l11-7z"/></svg></span></span>`}</div><p style="font-weight:600;margin-top:10px">Rubrik på en rad</p>`)])),

    Q('yt-kv-avsandare', 'Ska artikelkort visa vem som skrivit?',
      [['Avatar och namn', 'ava'], ['Bara namn i text', 'name'], ['Ingen avsändare', 'none']].map(([l, k]) => [l, scene(card({ img: 'stockholm', body: EB + H3 + TX + (k === 'ava' ? `<div style="display:flex;gap:10px;align-items:center;margin-top:6px">${ava('portratt-3', 32, 'border-radius:50%')}<div><p style="font-weight:600;font-size:13px">Förnamn Efternamn</p><p class="muted small">12 mars</p></div></div>` : k === 'name' ? '<p class="small muted" style="margin-top:4px">Förnamn Efternamn · 12 mars</p>' : '') }))])),
  ];

  window.QZ.part({
    key: 'ytor',
    groups: [
      { key: 'rundning', title: 'Rundning', questions: rundning },
      { key: 'skuggor', title: 'Skuggor', questions: skuggor },
      { key: 'kanter', title: 'Kanter', questions: kanter },
      { key: 'yta', title: 'Kortets yta', questions: yta },
      { key: 'uppbyggnad', title: 'Kortets uppbyggnad', questions: uppbyggnad },
      { key: 'format', title: 'Bildformat i kort', questions: format },
      { key: 'behandling', title: 'Bildbehandling', questions: behandling },
      { key: 'textpabild', title: 'Text på bild', questions: textpabild },
      { key: 'ramar', title: 'Bildramar', questions: ramar },
      { key: 'rutnat', title: 'Rutnät och avstånd', questions: rutnat },
      { key: 'sektioner', title: 'Paneler och sektioner', questions: sektioner },
      { key: 'maxbredd', title: 'Maxbredd och marginaler', questions: maxbredd },
      { key: 'glas', title: 'Djup och glas', questions: glas },
      { key: 'former', title: 'Former', questions: former },
      { key: 'avatarer', title: 'Avatarer', questions: avatarer },
      { key: 'textur', title: 'Mönster och textur', questions: textur },
      { key: 'gradienter', title: 'Gradienter', questions: gradienter },
      { key: 'morkt', title: 'Ytor i mörkt läge', questions: morkt },
      { key: 'kortvarianter', title: 'Kortvarianter', questions: kortvarianter },
      { key: 'flytande', title: 'Flytande ytor', questions: flytande },
      { key: 'listor', title: 'Listor och tabeller', questions: listor },
    ],
  });
})();
