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
        ['Frostad remsa', { shade: 'none', pad: '0', body: `<div style="width:100%;background:rgba(0,0,0,.22);-webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px);padding:16px 20px;display:flex;flex-direction:column;gap:6px">${BODYW}</div>` }],
      ].map(([l, o]) => [l, scene(overlay({ img: 'stockholm', ratio: '4/5', ...o }))])),

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
    ],
  });
})();
