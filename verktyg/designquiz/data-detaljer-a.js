window.QUIZ_DATA = window.QUIZ_DATA || [];
(function () {
  // ---------- Byggstenar ----------
  const P = (inner, style = '') => `<div class="pad" style="${style}">${inner}</div>`;
  const TXT = 'Tåget går från Stockholm C 16.25 och är framme i Berlin 07.51. Du sparar en hotellnatt och kommer fram mitt i stan.';
  const head = (style, text = 'Vart vill du resa?', cls = 'h1') => P(`<p class="h ${cls}" style="${style}">${text}</p>`);
  const block = (hs = '', bs = '', es = '') => P(`<div class="stack" style="gap:8px"><span class="eyebrow" style="${es}">Nattåg</span><p class="h h2" style="${hs}">Somna i Stockholm. Vakna i Berlin.</p><p class="muted" style="${bs}">${TXT}</p></div>`);
  const svgEl = (inner, sw = 2, extra = '', cap = 'round') => `<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="${cap}" stroke-linejoin="${cap === 'round' ? 'round' : 'miter'}" aria-hidden="true" style="${extra}">${inner}</svg>`;
  const path = d => `<path d="${d}"/>`;
  const I = {
    arrow: path('M5 12h14M13 6l6 6-6 6'),
    chev: path('M9 6l6 6-6 6'),
    chevL: path('M15 6l-6 6 6 6'),
    chevD: path('M6 9l6 6 6-6'),
    upright: path('M7 17L17 7M8 7h9v9'),
    arrowL: path('M19 12H5M11 6l-6 6 6 6'),
    check: path('M5 12.5l4.5 4.5L19 7.5'),
    plus: path('M12 5v14M5 12h14'),
    swapV: path('M8 4v16M8 4L4 8M8 4l4 4M16 20V4M16 20l-4-4M16 20l4-4'),
    swapH: path('M4 8h16M4 8l4-4M4 8l4 4M20 16H4M20 16l-4-4M20 16l-4 4'),
    cycle: path('M20 12a8 8 0 0 1-13.7 5.7M4 12a8 8 0 0 1 13.7-5.7M18 3v4h-4M6 21v-4h4'),
    warn: path('M12 3.5L21.5 20h-19L12 3.5zM12 10v4.5M12 17.5v.01'),
    info: '<circle cx="12" cy="12" r="9"/>' + path('M12 11v6M12 7.5v.01'),
    excl: '<circle cx="12" cy="12" r="9"/>' + path('M12 7v6M12 16.5v.01'),
    msg: path('M4 5h16v11H9l-5 4V5z'),
    cal: path('M4 6h16v14H4zM4 10h16M8 3v4M16 3v4'),
    fork: path('M7 3v8M4.5 3v4.5a2.5 2.5 0 0 0 5 0V3M7 11v10M17 3c-2 0-3 2.2-3 5.5S15 13 17 13v8'),
    seat: path('M7 4v9h9M7 13v7M16 13v7M7 9h7a2 2 0 0 1 2 2v2'),
    bed: path('M3 19V8M3 15h18v4M21 15v-2a3 3 0 0 0-3-3h-7v5') + '<circle cx="7" cy="12" r="1.6"/>',
    door: path('M6 3h12v18H6zM14.5 12v.01'),
    menu3: path('M4 7h16M4 12h16M4 17h16'),
    menu2: path('M4 9h16M4 15h16'),
    menuU: path('M4 7h16M4 12h11M4 17h7'),
    search: '<circle cx="11" cy="11" r="6.5"/>' + path('M20 20l-4-4'),
    leaf: path('M5 19c0-8 6-14 14-14 0 8-6 14-14 14zM5 19l7-7'),
    cart: path('M3 4h2l2.4 11h10.2L20 8H6.5') + '<circle cx="9" cy="19" r="1.4"/><circle cx="17" cy="19" r="1.4"/>',
    ext: path('M14 4h6v6M20 4l-9 9M18 14v6H4V6h6'),
  };
  const ico = (k, sw = 2, extra = '', cap) => svgEl(I[k], sw, extra, cap);
  const btn = (t, style = '', after = '') => `<span class="sb" style="${style}">${t}${after}</span>`;
  const btn2 = (t, style = '', after = '') => `<span class="sb2" style="${style}">${t}${after}</span>`;
  const card = ({ img = 'img/berlin.jpg', top = '', eyebrow = '<span class="eyebrow">Nattåg</span>', title = 'Malmö – Berlin', meta = 'Somna i Malmö, framme 07.51', price = '<span class="price">fr. 399 kr <small>sittplats, enkel</small></span>', imgStyle = '', wrap = '' } = {}) =>
    P(`<div class="stack" style="gap:6px;max-width:260px;${wrap}"><div style="position:relative">${top}<img class="pic" src="${img}" alt="Brandenburger Tor i kvällsljus" style="${imgStyle}"></div>${eyebrow}<p class="h h3">${title}</p><p class="muted small">${meta}</p>${price}</div>`);
  const linkRow = inner => P(`<div class="row" style="justify-content:space-between"><p class="h h2" style="font-size:22px">Populära resor</p>${inner}</div>`);

  const groups = [];
  const G = (key, title, questions) => groups.push({ key, title, questions });

  // ---------- Typografi ----------
  G('typografi', 'Typografi', [
    { id: 'd-typsnitt-final-a', q: 'Vilket typsnitt känns mest rätt?', opts: [
      { l: 'Hanken Grotesk', h: block("font-family:'Hanken Grotesk'", "font-family:'Hanken Grotesk'") },
      { l: 'Nunito Sans', h: block("font-family:'Nunito Sans'", "font-family:'Nunito Sans'", "font-family:'Nunito Sans'") },
      { l: 'Archivo', h: block("font-family:'Archivo';font-weight:700", "font-family:'Archivo'", "font-family:'Archivo'") },
      { l: 'Manrope', h: block("font-family:'Manrope'", "font-family:'Manrope'", "font-family:'Manrope'") },
    ] },
    { id: 'd-typsnitt-final-b', q: 'Och av de här tre?', opts: [
      { l: 'Hanken Grotesk', h: block("font-family:'Hanken Grotesk'") },
      { l: 'Montserrat + Source Sans 3', h: block("font-family:'Montserrat';font-weight:700", "font-family:'Source Sans 3';font-size:16px", "font-family:'Source Sans 3'") },
      { l: 'Bricolage + Figtree', h: block("font-family:'Bricolage Grotesque';font-weight:700", "font-family:'Figtree'", "font-family:'Figtree'") },
    ] },
    { id: 'd-rubrikvikt', q: 'Hur kraftiga ska rubrikerna vara?', opts: [600, 700, 800, 900].map(w => ({ l: `Vikt ${w}`, h: head(`font-weight:${w}`) })) },
    { id: 'd-herostorlek', q: 'Hur stor ska rubriken i hero vara på dator?', layout: 'stack', opts: [36, 48, 60, 76].map(s => ({ l: `${s} px`, h: `<div class="pad" style="background:linear-gradient(180deg,rgba(0,0,0,.15),rgba(0,0,0,.55)),url(img/vinter-skidor.jpg) center/cover;padding:32px 24px"><p class="h" style="color:#fff;font-size:${s}px">Vart vill du resa?</p></div>` })) },
    { id: 'd-rubrik-sparr', q: 'Hur tätt ska bokstäverna i rubriker sitta?', opts: [['Mycket tätt', '-0.035em'], ['Lite tätt', '-0.015em'], ['Normalt', '0'], ['Luftigt', '0.015em']].map(([l, v]) => ({ l, h: head(`letter-spacing:${v}`, 'Somna i Stockholm. Vakna i Berlin.', 'h2') })) },
    { id: 'd-rubrik-radhojd', q: 'Hur tätt ska raderna i en rubrik på två rader sitta?', opts: [['Mycket tätt (1,0)', 1], ['Tätt (1,1)', 1.1], ['Normalt (1,2)', 1.2], ['Luftigt (1,3)', 1.3]].map(([l, v]) => ({ l, h: P(`<p class="h h1" style="line-height:${v};max-width:240px">Somna i Stockholm. Vakna i Berlin.</p>`) })) },
    { id: 'd-rubrik-versal', q: 'Hur ska rubriker skrivas?', opts: [
      { l: 'Som en vanlig mening', h: head('', 'Vart vill du resa?') },
      { l: 'VERSALER', h: head('text-transform:uppercase;letter-spacing:0.01em', 'Vart vill du resa?') },
      { l: 'Varje Ord Med Versal', h: head('', 'Vart Vill Du Resa?') },
    ] },
    { id: 'd-rubrik-justering', q: 'Var ska rubrik och text i sektioner stå?', opts: [
      { l: 'Vänsterställt', h: P(`<div class="stack" style="gap:6px"><p class="h h2">Populära resor</p><p class="muted">Dagtåg och nattåg till fyra städer.</p></div>`) },
      { l: 'Centrerat', h: P(`<div class="stack" style="gap:6px;text-align:center;align-items:center"><p class="h h2">Populära resor</p><p class="muted">Dagtåg och nattåg till fyra städer.</p></div>`) },
    ] },
    { id: 'd-rubrik-farg', q: 'Vilken färg ska rubrikerna ha?', opts: [
      { l: 'Nästan svart', h: head('color:#1F1C18', 'Somna i Stockholm.', 'h2') },
      { l: 'Varumärkesgrön', h: head('color:var(--brand)', 'Somna i Stockholm.', 'h2') },
      { l: 'Mörk skogsgrön', h: head('color:#123b25', 'Somna i Stockholm.', 'h2') },
    ] },
    { id: 'd-brodtext-storlek', q: 'Hur stor ska brödtexten vara?', opts: [15, 16, 17, 18].map(s => ({ l: `${s} px`, h: P(`<p style="font-size:${s}px">${TXT}</p>`) })) },
    { id: 'd-brodtext-radhojd', q: 'Hur luftigt ska brödtexten vara?', opts: [['Tätt (1,4)', 1.4], ['Normalt (1,5)', 1.5], ['Luftigt (1,65)', 1.65], ['Mycket luftigt (1,8)', 1.8]].map(([l, v]) => ({ l, h: P(`<p style="line-height:${v}">${TXT}</p>`) })) },
    { id: 'd-brodtext-farg', q: 'Vilken färg ska brödtexten ha?', opts: [
      { l: 'Nästan svart', h: P(`<p style="color:#1F1C18">${TXT}</p>`) },
      { l: 'Varm gråbrun', h: P(`<p style="color:#5E574D">${TXT}</p>`) },
      { l: 'Neutral grå', h: P(`<p style="color:#5f6368">${TXT}</p>`) },
    ] },
    { id: 'd-radlangd', q: 'Hur långa får textraderna vara?', layout: 'stack', opts: [['Korta, ca 45 tecken', 45], ['Mellan, ca 65 tecken', 65], ['Långa, ca 85 tecken', 85]].map(([l, v]) => ({ l, h: P(`<p style="max-width:${v}ch">${TXT} Nattåget har sittplatser, bäddplatser i delad kupé och egna kupéer för upp till sex personer. Frukost serveras till klockan 11.</p>`) })) },
    { id: 'd-overrubrik', q: 'Hur ska den lilla överrubriken ("Nattåg") se ut?', opts: [
      { l: 'Liten grå text', h: block('', '', '') },
      { l: 'VERSALER, spärrat', h: block('', '', 'text-transform:uppercase;letter-spacing:.09em;font-size:12px') },
      { l: 'Grön och fet', h: block('', '', 'color:var(--brand);font-weight:700') },
      { l: 'Som etikett', h: P(`<div class="stack" style="gap:8px"><span><span class="tag" style="background:var(--tint);color:var(--brand)">Nattåg</span></span><p class="h h2">Somna i Stockholm. Vakna i Berlin.</p><p class="muted">${TXT}</p></div>`) },
    ] },
    { id: 'd-overrubrik-finns', q: 'Ska sektioner ha en överrubrik ovanför rubriken?', opts: [
      { l: 'Ja, med överrubrik', h: block() },
      { l: 'Nej, bara rubrik', h: P(`<div class="stack" style="gap:8px"><p class="h h2">Somna i Stockholm. Vakna i Berlin.</p><p class="muted">${TXT}</p></div>`) },
    ] },
    { id: 'd-ingress', q: 'Hur ska ingressen under en stor rubrik se ut?', opts: [
      { l: 'Större och grå', h: P(`<div class="stack" style="gap:10px"><p class="h h1">Res med nattåg</p><p style="font-size:19px;color:var(--smuted);line-height:1.45">Somna i Malmö och vakna mitt i Berlin.</p></div>`) },
      { l: 'Större och svart', h: P(`<div class="stack" style="gap:10px"><p class="h h1">Res med nattåg</p><p style="font-size:19px;line-height:1.45">Somna i Malmö och vakna mitt i Berlin.</p></div>`) },
      { l: 'Som vanlig text', h: P(`<div class="stack" style="gap:10px"><p class="h h1">Res med nattåg</p><p class="muted">Somna i Malmö och vakna mitt i Berlin.</p></div>`) },
      { l: 'Ingen ingress', h: P(`<p class="h h1">Res med nattåg</p>`) },
    ] },
    { id: 'd-hierarki', q: 'Hur stor skillnad ska det vara mellan rubriknivåerna?', opts: [
      { l: 'Stor skillnad', h: P(`<div class="stack" style="gap:8px"><p class="h" style="font-size:34px">Nattåg</p><p class="h" style="font-size:18px">Egen kupé</p><p class="muted small">Hela kupén för er, upp till sex personer.</p></div>`) },
      { l: 'Måttlig skillnad', h: P(`<div class="stack" style="gap:8px"><p class="h" style="font-size:28px">Nattåg</p><p class="h" style="font-size:21px">Egen kupé</p><p class="muted small">Hela kupén för er, upp till sex personer.</p></div>`) },
      { l: 'Liten skillnad', h: P(`<div class="stack" style="gap:8px"><p class="h" style="font-size:24px">Nattåg</p><p class="h" style="font-size:20px">Egen kupé</p><p class="muted small">Hela kupén för er, upp till sex personer.</p></div>`) },
    ] },
    { id: 'd-siffror-tabell', q: 'Hur ska tider i en tidtabell radas upp?', opts: [
      { l: 'Lika breda siffror', h: P(`<div class="stack" style="gap:4px;font-variant-numeric:tabular-nums;font-size:17px;font-weight:600"><span>07.05</span><span>11.51</span><span>16.25</span><span>21.10</span></div>`) },
      { l: 'Naturlig bredd', h: P(`<div class="stack" style="gap:4px;font-variant-numeric:proportional-nums;font-size:17px;font-weight:600"><span>07.05</span><span>11.51</span><span>16.25</span><span>21.10</span></div>`) },
    ] },
    { id: 'd-tidformat', q: 'Hur ska klockslag skrivas?', opts: [['07.51', '07.51'], ['07:51', '07:51'], ['7.51', '7.51']].map(([l, t]) => ({ l, h: P(`<p class="h h3">Framme i Berlin ${t}</p>`) })) },
    { id: 'd-datumformat', q: 'Hur ska datum skrivas i bokningen?', opts: [['fre 5 dec', 'fre 5 dec'], ['5 december', '5 december'], ['Fredag 5 december', 'Fredag 5 december'], ['2026-12-05', '2026-12-05']].map(([l, t]) => ({ l, h: P(`<div class="fld"><span class="lbl">Utresa</span><span class="inp">${t}</span></div>`) })) },
    { id: 'd-stracka', q: 'Hur ska en sträcka skrivas?', opts: [['Malmö – Berlin', 'Malmö – Berlin'], ['Malmö → Berlin', 'Malmö → Berlin'], ['Malmö–Berlin', 'Malmö–Berlin'], ['Malmö till Berlin', 'Malmö till Berlin']].map(([l, t]) => ({ l, h: P(`<p class="h h2">${t}</p>`) })) },
    { id: 'd-lank-stil', q: 'Hur ska länkar i löptext se ut?', opts: [
      { l: 'Grön, understruken', h: P(`<p>Läs mer om <span style="color:var(--brand);font-weight:600;text-decoration:underline;text-underline-offset:3px">ombokning och avbokning</span> innan du reser.</p>`) },
      { l: 'Svart, understruken', h: P(`<p>Läs mer om <span style="font-weight:600;text-decoration:underline;text-underline-offset:3px">ombokning och avbokning</span> innan du reser.</p>`) },
      { l: 'Grön, ingen understrykning', h: P(`<p>Läs mer om <span style="color:var(--brand);font-weight:700">ombokning och avbokning</span> innan du reser.</p>`) },
      { l: 'Tjock färgad understrykning', h: P(`<p>Läs mer om <span style="font-weight:600;text-decoration:underline;text-decoration-color:var(--accent);text-decoration-thickness:3px;text-underline-offset:4px">ombokning och avbokning</span> innan du reser.</p>`) },
    ] },
    { id: 'd-betoning', q: 'Hur ska viktiga ord betonas i text?', opts: [
      { l: 'Fet stil', h: P(`<p>Ombokning går fram till <strong>24 timmar före avresa</strong>.</p>`) },
      { l: 'Grön färg', h: P(`<p>Ombokning går fram till <span style="color:var(--brand);font-weight:600">24 timmar före avresa</span>.</p>`) },
      { l: 'Ingen betoning', h: P(`<p>Ombokning går fram till 24 timmar före avresa.</p>`) },
    ] },
    { id: 'd-punktlista', q: 'Hur ska punktlistor se ut?', opts: [
      { l: 'Bockar', h: P(`<div class="stack" style="gap:8px">${['Egen kupé för upp till sex', 'Frukost till klockan 11', 'Sms vid försening'].map(t => `<span class="row" style="gap:8px;flex-wrap:nowrap"><span style="color:var(--brand)">${ico('check', 2.2)}</span>${t}</span>`).join('')}</div>`) },
      { l: 'Prickar', h: P(`<ul style="margin:0;padding-left:20px;display:grid;gap:8px"><li>Egen kupé för upp till sex</li><li>Frukost till klockan 11</li><li>Sms vid försening</li></ul>`) },
      { l: 'Gröna prickar', h: P(`<div class="stack" style="gap:8px">${['Egen kupé för upp till sex', 'Frukost till klockan 11', 'Sms vid försening'].map(t => `<span class="row" style="gap:10px;flex-wrap:nowrap"><span style="width:7px;height:7px;border-radius:50%;background:var(--brand);flex:0 0 auto"></span>${t}</span>`).join('')}</div>`) },
      { l: 'Streck', h: P(`<div class="stack" style="gap:8px">${['Egen kupé för upp till sex', 'Frukost till klockan 11', 'Sms vid försening'].map(t => `<span>– ${t}</span>`).join('')}</div>`) },
    ] },
    { id: 'd-citat', q: 'Hur ska ett citat från en resenär visas?', opts: [
      { l: 'Stort, med citattecken', h: P(`<div class="stack" style="gap:10px"><p class="h" style="font-size:22px;font-weight:700">”Vi somnade i Malmö och vaknade i Berlin. Bästa sättet att resa.”</p><span class="muted small">Anna, Lund</span></div>`) },
      { l: 'Med linje till vänster', h: P(`<div class="stack" style="gap:8px;border-left:3px solid var(--brand);padding-left:14px"><p style="font-size:17px">Vi somnade i Malmö och vaknade i Berlin. Bästa sättet att resa.</p><span class="muted small">Anna, Lund</span></div>`) },
      { l: 'I en ruta', h: P(`<div class="panel stack" style="gap:8px"><p style="font-size:16px">”Vi somnade i Malmö och vaknade i Berlin. Bästa sättet att resa.”</p><span class="muted small">Anna, Lund</span></div>`) },
    ] },
    { id: 'd-text-pa-foto', q: 'Hur ska vit text på foto bli läsbar?', opts: [
      { l: 'Mörkläggning nertill', h: `<div style="background:linear-gradient(180deg,rgba(0,0,0,0) 20%,rgba(0,0,0,.6)),url(img/vinter-skidor.jpg) center/cover;height:190px;display:flex;align-items:flex-end;padding:18px"><p class="h h2" style="color:#fff">Ta tåget till fjällen</p></div>` },
      { l: 'Jämn mörkläggning', h: `<div style="background:linear-gradient(rgba(0,0,0,.38),rgba(0,0,0,.38)),url(img/vinter-skidor.jpg) center/cover;height:190px;display:flex;align-items:flex-end;padding:18px"><p class="h h2" style="color:#fff">Ta tåget till fjällen</p></div>` },
      { l: 'Textskugga, ingen mörkläggning', h: `<div style="background:url(img/vinter-skidor.jpg) center/cover;height:190px;display:flex;align-items:flex-end;padding:18px"><p class="h h2" style="color:#fff;text-shadow:0 2px 14px rgba(0,0,0,.55),0 1px 3px rgba(0,0,0,.4)">Ta tåget till fjällen</p></div>` },
    ] },
    { id: 'd-stora-siffror', q: 'Hur ska fakta i siffror (restid, avgångar) visas?', opts: [
      { l: 'Stora och fetstilta', h: P(`<div class="row" style="gap:24px;align-items:flex-start">${[['7 h 26 min', 'Stockholm – Berlin'], ['365', 'avgångar per år']].map(([a, b]) => `<div class="stack" style="gap:2px"><span style="font-size:30px;font-weight:800;letter-spacing:-0.02em;line-height:1.1">${a}</span><span class="muted small">${b}</span></div>`).join('')}</div>`) },
      { l: 'Måttliga', h: P(`<div class="row" style="gap:24px;align-items:flex-start">${[['7 h 26 min', 'Stockholm – Berlin'], ['365', 'avgångar per år']].map(([a, b]) => `<div class="stack" style="gap:2px"><span style="font-size:20px;font-weight:700">${a}</span><span class="muted small">${b}</span></div>`).join('')}</div>`) },
      { l: 'I löptext', h: P(`<p>Restiden Stockholm – Berlin är <strong>7 h 26 min</strong>, och tåget går <strong>varje dag</strong> året runt.</p>`) },
    ] },
    { id: 'd-smatext', q: 'Hur ska småtext (villkor, förklaringar) se ut?', opts: [12, 13, 14].map(s => ({ l: `${s} px, grå`, h: P(`<div class="stack" style="gap:4px"><span class="price" style="font-size:20px">fr. 399 kr</span><span style="font-size:${s}px;color:var(--smuted)">Pris per person, enkel resa, sittplats. Gäller 2 nov – 17 dec.</span></div>`) })) },
  ]);

  // ---------- Knappar ----------
  const pair = (s1 = '', s2 = '', t1 = 'Sök resa', t2 = 'Läs mer', a1 = '', a2 = '') => P(`<div class="row">${btn(t1, s1, a1)}${btn2(t2, s2, a2)}</div>`);
  G('knappar', 'Knappar', [
    { id: 'd-knapp-hojd', q: 'Hur höga ska knapparna vara?', opts: [40, 44, 48, 56].map(h => ({ l: `${h} px`, h: pair(`height:${h}px`, `height:${h}px`) })) },
    { id: 'd-knapp-bredd', q: 'Hur mycket luft ska det vara på sidorna i knappen?', opts: [['Smalt', 16], ['Normalt', 24], ['Brett', 34]].map(([l, v]) => ({ l, h: pair(`padding:0 ${v}px`, `padding:0 ${v}px`) })) },
    { id: 'd-knapp-vikt', q: 'Hur fet ska texten i knappar vara?', opts: [500, 600, 700, 800].map(w => ({ l: `Vikt ${w}`, h: pair(`font-weight:${w}`, `font-weight:${w}`) })) },
    { id: 'd-knapp-textstorlek', q: 'Hur stor ska texten i knappar vara?', opts: [14, 15, 16, 17].map(s => ({ l: `${s} px`, h: pair(`font-size:${s}px`, `font-size:${s}px`) })) },
    { id: 'd-knapp-form', q: 'Vilken rundning ska knappar ha?', opts: [['Pill (helt rund)', '999px'], ['16 px', '16px'], ['12 px', '12px'], ['8 px', '8px']].map(([l, v]) => ({ l, h: pair(`border-radius:${v}`, `border-radius:${v}`) })) },
    { id: 'd-knapp-sekundar', q: 'Hur ska sekundärknappen se ut?', opts: [
      { l: 'Grön kontur', h: pair() },
      { l: 'Mörk kontur', h: pair('', 'border-color:var(--sink);color:var(--sink)') },
      { l: 'Tonad grön yta', h: pair('', 'border-color:transparent;background:var(--tint)') },
      { l: 'Vit med tunn kant', h: pair('', 'background:#fff;border:1px solid var(--sline);color:var(--sink)') },
    ] },
    { id: 'd-knapp-kontur', q: 'Hur tjock ska kanten på konturknappar vara?', opts: [['1 px', 1], ['1,5 px', 1.5], ['2 px', 2]].map(([l, v]) => ({ l, h: P(`<div class="row">${btn2('Läs mer', `border-width:${v}px`)}${btn2('Se hela menyn', `border-width:${v}px`)}</div>`) })) },
    { id: 'd-knapp-hover', q: 'Vad ska hända när man för musen över en knapp?', opts: [
      { l: 'Blir mörkare', h: P(`<div class="row"><span class="stack" style="gap:4px;align-items:center">${btn('Sök resa')}<span class="small muted">Vanlig</span></span><span class="stack" style="gap:4px;align-items:center">${btn('Sök resa', 'background:#123b25;border-color:#123b25')}<span class="small muted">Hovring</span></span></div>`) },
      { l: 'Blir ljusare', h: P(`<div class="row"><span class="stack" style="gap:4px;align-items:center">${btn('Sök resa')}<span class="small muted">Vanlig</span></span><span class="stack" style="gap:4px;align-items:center">${btn('Sök resa', 'background:#2a7a50;border-color:#2a7a50')}<span class="small muted">Hovring</span></span></div>`) },
      { l: 'Pilen flyttar sig', h: P(`<div class="row"><span class="stack" style="gap:4px;align-items:center">${btn('Sök resa', '', ico('arrow', 2.2, 'width:18px;height:18px'))}<span class="small muted">Vanlig</span></span><span class="stack" style="gap:4px;align-items:center">${btn('Sök resa', 'gap:12px', ico('arrow', 2.2, 'width:18px;height:18px'))}<span class="small muted">Hovring</span></span></div>`) },
      { l: 'Lyfts lite', h: P(`<div class="row"><span class="stack" style="gap:4px;align-items:center">${btn('Sök resa')}<span class="small muted">Vanlig</span></span><span class="stack" style="gap:4px;align-items:center">${btn('Sök resa', 'transform:translateY(-2px);box-shadow:0 6px 14px rgba(29,91,58,.28)')}<span class="small muted">Hovring</span></span></div>`) },
    ] },
    { id: 'd-knapp-fokus', q: 'Hur ska en knapp markeras när man tabbar till den med tangentbordet?', opts: [
      { l: 'Grön ring med mellanrum', h: P(btn('Sök resa', 'outline:3px solid var(--brand);outline-offset:3px')) },
      { l: 'Gul ring', h: P(btn('Sök resa', 'outline:3px solid var(--accent);outline-offset:2px')) },
      { l: 'Mörk ring tätt intill', h: P(btn('Sök resa', 'box-shadow:0 0 0 3px var(--sink)')) },
    ] },
    { id: 'd-knapp-inaktiv', q: 'Hur ska en knapp se ut när den inte går att trycka på?', opts: [
      { l: 'Grå', h: P(btn('Sök resa', 'background:#d8d3ca;border-color:#d8d3ca;color:#7b746a')) },
      { l: 'Blek grön', h: P(btn('Sök resa', 'opacity:.4')) },
      { l: 'Kontur, ingen fyllning', h: P(btn2('Sök resa', 'border-color:#c9c2b6;color:#9a9285')) },
    ] },
    { id: 'd-knapp-ikon', q: 'Ska huvudknappen ha en ikon?', opts: [
      { l: 'Pil efter texten', h: P(btn('Sök resa', '', ico('arrow', 2.2, 'width:18px;height:18px'))) },
      { l: 'Sökikon före texten', h: P(btn(ico('search', 2.2, 'width:18px;height:18px') + 'Sök resa')) },
      { l: 'Ingen ikon', h: P(btn('Sök resa')) },
    ] },
    { id: 'd-knapp-pil', q: 'Vilken pil i knappar?', opts: [
      { l: 'Pil →', h: P(btn('Sök resa', '', ico('arrow', 2.2, 'width:18px;height:18px'))) },
      { l: 'Chevron ›', h: P(btn('Sök resa', '', ico('chev', 2.4, 'width:18px;height:18px'))) },
      { l: 'Snett uppåt ↗', h: P(btn('Sök resa', '', ico('upright', 2.2, 'width:18px;height:18px'))) },
      { l: 'Pil i cirkel', h: P(btn('Sök resa', 'padding-right:6px', `<span style="display:inline-grid;place-items:center;width:34px;height:34px;border-radius:50%;background:#fff;color:var(--brand)">${ico('arrow', 2.2, 'width:16px;height:16px')}</span>`)) },
    ] },
    { id: 'd-knapptext-sok', q: 'Vad ska det stå på sökknappen i bokningen?', opts: ['Sök resa', 'Sök', 'Hitta resor', 'Visa resor'].map(t => ({ l: t, h: P(btn(t)) })) },
    { id: 'd-knapptext-kop', q: 'Vad ska det stå på knappen som tar en vidare till betalning?', opts: ['Gå till betalning', 'Fortsätt', 'Boka', 'Köp biljett'].map(t => ({ l: t, h: P(btn(t)) })) },
    { id: 'd-knapp-storlekar', q: 'Hur många knappstorlekar?', opts: [
      { l: 'En storlek överallt', h: P(`<div class="row">${btn('Sök resa')}${btn2('Välj resa')}</div>`) },
      { l: 'Stor och liten', h: P(`<div class="row">${btn('Sök resa', 'height:56px;font-size:17px;padding:0 28px')}${btn2('Välj resa', 'height:40px;font-size:14px;padding:0 16px')}</div>`) },
      { l: 'Stor, mellan och liten', h: P(`<div class="row">${btn('Sök resa', 'height:56px;font-size:17px;padding:0 28px')}${btn('Välj', 'height:48px')}${btn2('Mer', 'height:36px;font-size:13px;padding:0 14px')}</div>`) },
    ] },
    { id: 'd-knapp-mobil', q: 'Hur bred ska sökknappen vara i bokningsrutan på mobil?', opts: [
      { l: 'Naturlig bredd', h: P(`<div class="stack" style="max-width:240px"><div class="fld"><span class="lbl">Resenärer</span><span class="inp">1 vuxen</span></div>${btn('Sök resa', 'align-self:flex-start', ico('arrow', 2.2, 'width:18px;height:18px'))}</div>`) },
      { l: 'Full bredd', h: P(`<div class="stack" style="max-width:240px"><div class="fld"><span class="lbl">Resenärer</span><span class="inp">1 vuxen</span></div>${btn('Sök resa', 'width:100%', ico('arrow', 2.2, 'width:18px;height:18px'))}</div>`) },
    ] },
    { id: 'd-knapp-par', q: 'Hur ska två handlingar bredvid varandra se ut?', opts: [
      { l: 'Fylld och kontur', h: pair('', '', 'Boka nattåg', 'Läs mer') },
      { l: 'Fylld och textlänk', h: P(`<div class="row" style="gap:18px">${btn('Boka nattåg')}<span class="link">Läs mer</span></div>`) },
      { l: 'Fylld och textlänk med pil', h: P(`<div class="row" style="gap:18px">${btn('Boka nattåg')}<span class="link row" style="gap:6px;text-decoration:none">Läs mer ${ico('arrow', 2.2, 'width:16px;height:16px')}</span></div>`) },
    ] },
    { id: 'd-knapp-farg', q: 'Vilken färg ska huvudknappen ha?', opts: [
      { l: 'Varumärkesgrön', h: P(btn('Sök resa')) },
      { l: 'Nästan svart', h: P(btn('Sök resa', 'background:var(--sink);border-color:var(--sink)')) },
      { l: 'Gul med mörk text', h: P(btn('Sök resa', 'background:var(--accent);border-color:var(--accent);color:var(--sink)')) },
    ] },
    { id: 'd-knapp-pa-foto', q: 'Hur ska en knapp direkt på ett foto se ut?', opts: [
      { l: 'Grön', h: `<div style="background:linear-gradient(180deg,rgba(0,0,0,.05),rgba(0,0,0,.5)),url(img/vinter-skidor.jpg) center/cover;height:170px;display:flex;align-items:flex-end;padding:18px">${btn('Se vinterresor')}</div>` },
      { l: 'Vit med mörk text', h: `<div style="background:linear-gradient(180deg,rgba(0,0,0,.05),rgba(0,0,0,.5)),url(img/vinter-skidor.jpg) center/cover;height:170px;display:flex;align-items:flex-end;padding:18px">${btn('Se vinterresor', 'background:#fff;border-color:#fff;color:var(--sink)')}</div>` },
      { l: 'Vit kontur', h: `<div style="background:linear-gradient(180deg,rgba(0,0,0,.05),rgba(0,0,0,.5)),url(img/vinter-skidor.jpg) center/cover;height:170px;display:flex;align-items:flex-end;padding:18px">${btn2('Se vinterresor', 'border-color:#fff;color:#fff')}</div>` },
    ] },
    { id: 'd-ikonknapp', q: 'Hur ska små ikonknappar (t.ex. byt Från/Till) se ut?', opts: [
      { l: 'Cirkel med grön kant', h: P(`<span style="display:inline-grid;place-items:center;width:42px;height:42px;border-radius:50%;border:2px solid var(--brand);color:var(--brand);background:var(--box)">${ico('swapV', 2)}</span>`) },
      { l: 'Tonad cirkel', h: P(`<span style="display:inline-grid;place-items:center;width:42px;height:42px;border-radius:50%;background:var(--tint);color:var(--brand)">${ico('swapV', 2)}</span>`) },
      { l: 'Fylld grön cirkel', h: P(`<span style="display:inline-grid;place-items:center;width:42px;height:42px;border-radius:50%;background:var(--brand);color:#fff">${ico('swapV', 2)}</span>`) },
      { l: 'Bara ikonen', h: P(`<span style="display:inline-grid;place-items:center;width:42px;height:42px;color:var(--brand)">${ico('swapV', 2)}</span>`) },
    ] },
    { id: 'd-se-alla-lank', q: 'Hur ska länken "Alla destinationer" bredvid en rubrik se ut?', opts: [
      { l: 'Understruken med pil', h: linkRow(`<span class="link row" style="gap:6px">Alla destinationer ${ico('arrow', 2.2, 'width:16px;height:16px')}</span>`) },
      { l: 'Utan understrykning, med pil', h: linkRow(`<span class="row" style="gap:6px;color:var(--brand);font-weight:700">Alla destinationer ${ico('arrow', 2.2, 'width:16px;height:16px')}</span>`) },
      { l: 'Konturknapp', h: linkRow(btn2('Alla destinationer', 'height:40px;font-size:14px;padding:0 16px')) },
      { l: 'Pil i cirkel', h: linkRow(`<span class="row" style="gap:10px;font-weight:700">Alla destinationer <span style="display:inline-grid;place-items:center;width:32px;height:32px;border-radius:50%;background:var(--brand);color:#fff">${ico('arrow', 2.2, 'width:16px;height:16px')}</span></span>`) },
    ] },
    { id: 'd-knapp-laddar', q: 'Hur ska knappen visa att något laddar?', opts: [
      { l: 'Snurra i knappen', h: P(btn(`<span style="width:18px;height:18px;border-radius:50%;border:2.5px solid rgba(255,255,255,.35);border-top-color:#fff;display:inline-block"></span>Sök resa`)) },
      { l: 'Texten byts till "Söker…"', h: P(btn('Söker…')) },
      { l: 'Snurra och ny text', h: P(btn(`<span style="width:18px;height:18px;border-radius:50%;border:2.5px solid rgba(255,255,255,.35);border-top-color:#fff;display:inline-block"></span>Söker…`)) },
    ] },
    { id: 'd-segment', q: 'Hur ska valet Enkel / Tur och retur se ut?', opts: [
      { l: 'Segment i pill', h: P(`<div class="row" style="background:var(--field);border-radius:999px;padding:4px;gap:0;display:inline-flex"><span style="background:var(--box);border-radius:999px;padding:8px 16px;font-weight:600;font-size:14px">Enkel</span><span style="padding:8px 16px;font-weight:600;font-size:14px;color:var(--smuted)">Tur och retur</span></div>`) },
      { l: 'Understrukna flikar', h: P(`<div class="row" style="gap:20px;border-bottom:1px solid var(--sline)"><span style="padding:8px 0;font-weight:700;border-bottom:3px solid var(--brand);margin-bottom:-1px">Enkel</span><span style="padding:8px 0;font-weight:600;color:var(--smuted)">Tur och retur</span></div>`) },
      { l: 'Radioknappar', h: P(`<div class="row" style="gap:20px">${[['Enkel', true], ['Tur och retur', false]].map(([t, on]) => `<span class="row" style="gap:8px"><span style="width:20px;height:20px;border-radius:50%;border:2px solid ${on ? 'var(--brand)' : 'var(--sline)'};display:inline-grid;place-items:center">${on ? '<span style="width:10px;height:10px;border-radius:50%;background:var(--brand)"></span>' : ''}</span>${t}</span>`).join('')}</div>`) },
      { l: 'Två pill-knappar', h: P(`<div class="row" style="gap:8px"><span class="chip" style="background:var(--brand);color:#fff;border-color:var(--brand)">Enkel</span><span class="chip">Tur och retur</span></div>`) },
    ] },
    { id: 'd-sticky-mobil', q: 'Hur ska en fast bokningsknapp längst ner på mobilen se ut?', opts: [
      { l: 'Hel rad med pris', h: `<div style="height:170px;display:flex;flex-direction:column;justify-content:flex-end"><div class="row" style="justify-content:space-between;background:var(--box);padding:12px 16px;border-top:1px solid var(--sline);flex-wrap:nowrap"><span class="price">fr. 399 kr</span>${btn('Välj resa', 'height:44px')}</div></div>` },
      { l: 'Flytande pill', h: `<div style="height:170px;display:flex;align-items:flex-end;justify-content:center;padding-bottom:16px">${btn('Sök resa', 'box-shadow:0 6px 18px rgba(0,0,0,.18)', ico('arrow', 2.2, 'width:18px;height:18px'))}</div>` },
      { l: 'Ingen fast knapp', h: `<div class="pad" style="height:170px;display:flex;align-items:center"><p class="muted">Knappen finns bara i bokningsrutan högst upp.</p></div>` },
    ] },
  ]);

  // ---------- Pilar ----------
  const arrowLink = (a, text = 'Läs om nattåget') => P(`<span class="row" style="gap:6px;color:var(--brand);font-weight:700">${text} ${a}</span>`);
  G('pilar', 'Pilar', [
    { id: 'd-pil-typ', q: 'Vilken sorts pil i länkar?', opts: [
      { l: 'Rak pil →', h: arrowLink(ico('arrow', 2.2, 'width:18px;height:18px')) },
      { l: 'Chevron ›', h: arrowLink(ico('chev', 2.4, 'width:18px;height:18px')) },
      { l: 'Lång tunn pil ⟶', h: arrowLink(svgEl(path('M2 12h19M16 7l5 5-5 5'), 1.6, 'width:26px;height:18px')) },
      { l: 'Teckensnittets pil (→)', h: arrowLink('<span aria-hidden="true">→</span>') },
    ] },
    { id: 'd-pil-tjocklek', q: 'Hur tjocka ska pilar och ikoner vara?', opts: [[1.5, 'Tunn'], [2, 'Mellan'], [2.6, 'Kraftig']].map(([w, l]) => ({ l, h: P(`<div class="row" style="gap:16px;color:var(--brand)">${['arrow', 'chev', 'check', 'swapV'].map(k => ico(k, w, 'width:26px;height:26px')).join('')}</div>`) })) },
    { id: 'd-pil-andar', q: 'Ska pilarnas ändar vara rundade eller raka?', opts: [
      { l: 'Rundade', h: P(`<div class="row" style="gap:16px;color:var(--brand)">${['arrow', 'chev', 'check'].map(k => ico(k, 2.6, 'width:30px;height:30px')).join('')}</div>`) },
      { l: 'Raka', h: P(`<div class="row" style="gap:16px;color:var(--brand)">${['arrow', 'chev', 'check'].map(k => ico(k, 2.6, 'width:30px;height:30px', 'butt')).join('')}</div>`) },
    ] },
    { id: 'd-pil-placering', q: 'Var ska pilen sitta i en länk?', opts: [
      { l: 'Efter texten', h: arrowLink(ico('arrow', 2.2, 'width:18px;height:18px')) },
      { l: 'Före texten', h: P(`<span class="row" style="gap:6px;color:var(--brand);font-weight:700">${ico('arrow', 2.2, 'width:18px;height:18px')} Läs om nattåget</span>`) },
      { l: 'Ingen pil', h: P(`<span class="link">Läs om nattåget</span>`) },
    ] },
    { id: 'd-pil-extern', q: 'Hur ska en länk till en annan webbplats markeras?', opts: [
      { l: 'Snett uppåt ↗', h: arrowLink(ico('upright', 2.2, 'width:16px;height:16px'), 'Tyska järnvägens tidtabell') },
      { l: 'Ruta med pil', h: arrowLink(ico('ext', 2, 'width:16px;height:16px'), 'Tyska järnvägens tidtabell') },
      { l: 'Ingen markering', h: arrowLink('', 'Tyska järnvägens tidtabell') },
    ] },
    { id: 'd-pil-karusell', q: 'Hur ska bläddringsknapparna i en karusell se ut?', opts: [
      { l: 'Cirklar med kant', h: P(`<div class="row" style="gap:10px">${['chevL', 'chev'].map(k => `<span style="display:inline-grid;place-items:center;width:44px;height:44px;border-radius:50%;border:1.5px solid var(--sline);background:var(--box)">${ico(k, 2.2)}</span>`).join('')}</div>`) },
      { l: 'Fyllda gröna cirklar', h: P(`<div class="row" style="gap:10px">${['chevL', 'chev'].map(k => `<span style="display:inline-grid;place-items:center;width:44px;height:44px;border-radius:50%;background:var(--brand);color:#fff">${ico(k, 2.2)}</span>`).join('')}</div>`) },
      { l: 'Rundade rutor', h: P(`<div class="row" style="gap:10px">${['chevL', 'chev'].map(k => `<span style="display:inline-grid;place-items:center;width:44px;height:44px;border-radius:12px;background:var(--field)">${ico(k, 2.2)}</span>`).join('')}</div>`) },
      { l: 'Bara pilar', h: P(`<div class="row" style="gap:18px;color:var(--brand)">${['arrowL', 'arrow'].map(k => ico(k, 2.2, 'width:26px;height:26px')).join('')}</div>`) },
    ] },
    { id: 'd-pil-dragspel', q: 'Vilken symbol ska visa att en fråga i "Vanliga frågor" kan fällas ut?', opts: [
      { l: 'Chevron nedåt', h: P(`<div class="row" style="justify-content:space-between;border-bottom:1px solid var(--sline);padding:12px 0;flex-wrap:nowrap"><span style="font-weight:600">Behöver jag pass till Tyskland?</span>${ico('chevD', 2.2)}</div>`) },
      { l: 'Plus', h: P(`<div class="row" style="justify-content:space-between;border-bottom:1px solid var(--sline);padding:12px 0;flex-wrap:nowrap"><span style="font-weight:600">Behöver jag pass till Tyskland?</span>${ico('plus', 2.2)}</div>`) },
      { l: 'Plus i cirkel', h: P(`<div class="row" style="justify-content:space-between;border-bottom:1px solid var(--sline);padding:12px 0;flex-wrap:nowrap"><span style="font-weight:600">Behöver jag pass till Tyskland?</span><span style="display:inline-grid;place-items:center;width:30px;height:30px;border-radius:50%;background:var(--tint);color:var(--brand);flex:0 0 auto">${ico('plus', 2.2, 'width:16px;height:16px')}</span></div>`) },
    ] },
    { id: 'd-pil-rullgardin', q: 'Vilken pil i rullgardinsmenyer?', opts: [
      { l: 'Chevron nedåt', h: P(`<div class="fld"><span class="lbl">Komfort</span><span class="inp" style="justify-content:space-between">Sittplats ${ico('chevD', 2.2, 'width:18px;height:18px')}</span></div>`) },
      { l: 'Liten triangel', h: P(`<div class="fld"><span class="lbl">Komfort</span><span class="inp" style="justify-content:space-between">Sittplats <span style="font-size:11px">▼</span></span></div>`) },
      { l: 'Upp och ner', h: P(`<div class="fld"><span class="lbl">Komfort</span><span class="inp" style="justify-content:space-between">Sittplats ${svgEl(path('M8 10l4-4 4 4M8 14l4 4 4-4'), 2.2, 'width:18px;height:18px')}</span></div>`) },
    ] },
    { id: 'd-pil-tillbaka', q: 'Hur ska tillbaka-länken se ut?', opts: [
      { l: 'Pil och text', h: P(`<span class="row" style="gap:6px;font-weight:600">${ico('arrowL', 2.2, 'width:18px;height:18px')} Tillbaka</span>`) },
      { l: 'Chevron och text', h: P(`<span class="row" style="gap:4px;font-weight:600;color:var(--brand)">${ico('chevL', 2.4, 'width:18px;height:18px')} Tillbaka till sökresultat</span>`) },
      { l: 'Rund ikonknapp', h: P(`<span style="display:inline-grid;place-items:center;width:42px;height:42px;border-radius:50%;background:var(--field)">${ico('arrowL', 2.2)}</span>`) },
    ] },
    { id: 'd-pil-rutt', q: 'Hur ska en resa med byte visas?', opts: [
      { l: 'Pilar mellan städer', h: P(`<p style="font-weight:600">Malmö → Hamburg → Berlin</p>`) },
      { l: 'Linje med stationer', h: P(`<div class="row" style="gap:0;flex-wrap:nowrap;align-items:flex-start;max-width:260px">${['Malmö', 'Hamburg', 'Berlin'].map((s, i) => `<div style="flex:1;display:flex;flex-direction:column;gap:6px;align-items:${i === 0 ? 'flex-start' : i === 2 ? 'flex-end' : 'center'};position:relative"><span style="width:12px;height:12px;border-radius:50%;background:${i === 1 ? 'var(--box)' : 'var(--brand)'};border:2.5px solid var(--brand);position:relative;z-index:1"></span><span class="small" style="font-weight:600">${s}</span></div>`).join('')}</div><div style="height:2.5px;background:var(--brand);margin:-38px 6px 38px;max-width:248px"></div>`) },
      { l: 'Lodrät tidslinje', h: P(`<div class="stack" style="gap:0">${[['16.25', 'Stockholm C'], ['22.40', 'Hamburg Hbf'], ['07.51', 'Berlin Hbf']].map(([t, s], i) => `<div class="row" style="gap:12px;flex-wrap:nowrap;align-items:stretch"><span style="font-variant-numeric:tabular-nums;font-weight:700;width:44px">${t}</span><span style="display:flex;flex-direction:column;align-items:center;width:12px"><span style="width:12px;height:12px;border-radius:50%;border:2.5px solid var(--brand);background:${i === 1 ? 'var(--box)' : 'var(--brand)'}"></span>${i < 2 ? '<span style="flex:1;width:2.5px;background:var(--brand);min-height:16px"></span>' : ''}</span><span style="padding-bottom:10px">${s}</span></div>`).join('')}</div>`) },
    ] },
    { id: 'd-pil-byt', q: 'Vilken symbol ska byt-knappen mellan Från och Till ha?', opts: [
      { l: 'Pilar upp och ner', h: P(`<span style="display:inline-grid;place-items:center;width:44px;height:44px;border-radius:50%;border:2px solid var(--brand);color:var(--brand)">${ico('swapV', 2)}</span>`) },
      { l: 'Pilar åt sidorna', h: P(`<span style="display:inline-grid;place-items:center;width:44px;height:44px;border-radius:50%;border:2px solid var(--brand);color:var(--brand)">${ico('swapH', 2)}</span>`) },
      { l: 'Cirkelpilar', h: P(`<span style="display:inline-grid;place-items:center;width:44px;height:44px;border-radius:50%;border:2px solid var(--brand);color:var(--brand)">${ico('cycle', 2)}</span>`) },
    ] },
    { id: 'd-pil-storlek', q: 'Hur stor ska pilen vara i förhållande till texten?', opts: [['Mindre än texten', 13], ['Lika stor', 17], ['Större', 22]].map(([l, s]) => ({ l, h: arrowLink(ico('arrow', 2.2, `width:${s}px;height:${s}px`)) })) },
    { id: 'd-pil-kort', q: 'Ska kort ha en pil som visar att de är klickbara?', opts: [
      { l: 'Ingen pil', h: card() },
      { l: 'Pil bredvid rubriken', h: card({ title: `<span class="row" style="gap:6px">Malmö – Berlin ${ico('arrow', 2.2, 'width:18px;height:18px;color:var(--brand)')}</span>` }) },
      { l: 'Pil i cirkel på bilden', h: card({ top: `<span style="position:absolute;right:10px;bottom:10px;display:grid;place-items:center;width:36px;height:36px;border-radius:50%;background:#fff;color:var(--brand)">${ico('arrow', 2.2, 'width:18px;height:18px')}</span>` }) },
    ] },
    { id: 'd-pil-scroll', q: 'Ska heron visa att man kan scrolla vidare?', opts: [
      { l: 'Chevron nedåt', h: `<div style="background:linear-gradient(180deg,rgba(0,0,0,.05),rgba(0,0,0,.5)),url(img/vinter-skidor.jpg) center/cover;height:170px;display:flex;align-items:flex-end;justify-content:center;padding:14px;color:#fff">${ico('chevD', 2.4, 'width:28px;height:28px')}</div>` },
      { l: 'Text och pil', h: `<div style="background:linear-gradient(180deg,rgba(0,0,0,.05),rgba(0,0,0,.5)),url(img/vinter-skidor.jpg) center/cover;height:170px;display:flex;align-items:flex-end;justify-content:center;padding:14px;color:#fff;font-weight:600;gap:6px">Se mer ${ico('chevD', 2.4, 'width:18px;height:18px')}</div>` },
      { l: 'Ingen markering', h: `<div style="background:linear-gradient(180deg,rgba(0,0,0,.05),rgba(0,0,0,.5)),url(img/vinter-skidor.jpg) center/cover;height:170px"></div>` },
    ] },
  ]);

  // ---------- Ikoner ----------
  const trust = (mk) => P(`<div class="stack" style="gap:10px">${[['msg', 'Sms om tåget blir mer än 30 min försenat'], ['cal', 'Ombokning fram till 24 h före avresa'], ['fork', 'Restaurangvagn på de flesta avgångar']].map(([k, t]) => `<span class="row" style="gap:10px;flex-wrap:nowrap">${mk(k)}<span>${t}</span></span>`).join('')}</div>`);
  G('ikoner', 'Ikoner', [
    { id: 'd-ikon-stil', q: 'Vilken ikonstil?', opts: [
      { l: 'Linjer', h: P(`<div class="row" style="gap:18px;color:var(--brand)">${['seat', 'bed', 'fork', 'msg'].map(k => ico(k, 2, 'width:30px;height:30px')).join('')}</div>`) },
      { l: 'Fyllda', h: P(`<div class="row" style="gap:18px;color:var(--brand)">${['seat', 'bed', 'fork', 'msg'].map(k => svgEl(I[k], 2, 'width:30px;height:30px;fill:var(--tint)')).join('')}</div>`) },
      { l: 'Linjer i tonad cirkel', h: P(`<div class="row" style="gap:12px;color:var(--brand)">${['seat', 'bed', 'fork', 'msg'].map(k => `<span style="display:inline-grid;place-items:center;width:46px;height:46px;border-radius:50%;background:var(--tint)">${ico(k, 2, 'width:24px;height:24px')}</span>`).join('')}</div>`) },
    ] },
    { id: 'd-ikon-storlek', q: 'Hur stora ska ikoner vara i listor?', opts: [16, 20, 24].map(s => ({ l: `${s} px`, h: trust(k => `<span style="color:var(--brand);display:inline-flex">${ico(k, 2, `width:${s}px;height:${s}px`)}</span>`) })) },
    { id: 'd-ikon-farg', q: 'Vilken färg ska ikoner ha?', opts: [
      { l: 'Varumärkesgrön', h: trust(k => `<span style="color:var(--brand);display:inline-flex">${ico(k, 2)}</span>`) },
      { l: 'Samma som texten', h: trust(k => `<span style="color:var(--sink);display:inline-flex">${ico(k, 2)}</span>`) },
      { l: 'Grå', h: trust(k => `<span style="color:var(--smuted);display:inline-flex">${ico(k, 2)}</span>`) },
    ] },
    { id: 'd-ikon-bakgrund', q: 'Ska ikoner ha en bakgrundsform?', opts: [
      { l: 'Ingen bakgrund', h: trust(k => `<span style="color:var(--brand);display:inline-flex">${ico(k, 2)}</span>`) },
      { l: 'Tonad cirkel', h: trust(k => `<span style="display:inline-grid;place-items:center;width:36px;height:36px;border-radius:50%;background:var(--tint);color:var(--brand);flex:0 0 auto">${ico(k, 2, 'width:18px;height:18px')}</span>`) },
      { l: 'Tonad rundad ruta', h: trust(k => `<span style="display:inline-grid;place-items:center;width:36px;height:36px;border-radius:10px;background:var(--tint);color:var(--brand);flex:0 0 auto">${ico(k, 2, 'width:18px;height:18px')}</span>`) },
    ] },
    { id: 'd-ikon-etikett', q: 'Ska ikoner i menyer och verktyg alltid ha text?', opts: [
      { l: 'Alltid ikon och text', h: P(`<div class="row" style="gap:18px;font-weight:600;font-size:14px">${[['search', 'Sök'], ['cart', 'Varukorg'], ['msg', 'Hjälp']].map(([k, t]) => `<span class="row" style="gap:6px">${ico(k, 2, 'width:18px;height:18px')}${t}</span>`).join('')}</div>`) },
      { l: 'Text under ikonen', h: P(`<div class="row" style="gap:22px;font-weight:600;font-size:12px">${[['search', 'Sök'], ['cart', 'Varukorg'], ['msg', 'Hjälp']].map(([k, t]) => `<span class="stack" style="gap:3px;align-items:center">${ico(k, 2, 'width:22px;height:22px')}${t}</span>`).join('')}</div>`) },
      { l: 'Bara ikoner', h: P(`<div class="row" style="gap:22px">${['search', 'cart', 'msg'].map(k => ico(k, 2, 'width:22px;height:22px')).join('')}</div>`) },
    ] },
    { id: 'd-bock', q: 'Hur ska bockar i tillitsrader och listor se ut?', opts: [
      { l: 'Tunn bock', h: trust(() => `<span style="color:var(--brand);display:inline-flex">${ico('check', 2)}</span>`) },
      { l: 'Bock i fylld cirkel', h: trust(() => `<span style="display:inline-grid;place-items:center;width:22px;height:22px;border-radius:50%;background:var(--brand);color:#fff;flex:0 0 auto">${ico('check', 2.6, 'width:14px;height:14px')}</span>`) },
      { l: 'Bock i tonad cirkel', h: trust(() => `<span style="display:inline-grid;place-items:center;width:24px;height:24px;border-radius:50%;background:var(--tint);color:var(--brand);flex:0 0 auto">${ico('check', 2.6, 'width:14px;height:14px')}</span>`) },
    ] },
    { id: 'd-tillit-ikoner', q: 'Vilka symboler ska tillitsraderna under bokningen ha?', opts: [
      { l: 'Samma bock på alla', h: trust(() => `<span style="color:var(--brand);display:inline-flex">${ico('check', 2.2)}</span>`) },
      { l: 'Egen ikon per rad', h: trust(k => `<span style="color:var(--brand);display:inline-flex">${ico(k, 2)}</span>`) },
      { l: 'Inga symboler', h: P(`<div class="stack" style="gap:10px"><span>Sms om tåget blir mer än 30 min försenat</span><span>Ombokning fram till 24 h före avresa</span><span>Restaurangvagn på de flesta avgångar</span></div>`) },
    ] },
    { id: 'd-ikon-meny', q: 'Hur ska menyikonen på mobil se ut?', opts: [
      { l: 'Tre lika streck', h: P(`<span class="row" style="gap:8px;font-weight:600">${ico('menu3', 2.2, 'width:24px;height:24px')}Meny</span>`) },
      { l: 'Två streck', h: P(`<span class="row" style="gap:8px;font-weight:600">${ico('menu2', 2.2, 'width:24px;height:24px')}Meny</span>`) },
      { l: 'Streck med olika längd', h: P(`<span class="row" style="gap:8px;font-weight:600">${ico('menuU', 2.2, 'width:24px;height:24px')}Meny</span>`) },
    ] },
    { id: 'd-ikon-varning', q: 'Vilken symbol ska trafikvarningar ha?', opts: [
      { l: 'Varningstriangel', h: P(`<span class="row" style="gap:10px;flex-wrap:nowrap">${ico('warn', 2)}<span><strong>5 december:</strong> tåg 3943 går via västkusten.</span></span>`) },
      { l: 'i i cirkel', h: P(`<span class="row" style="gap:10px;flex-wrap:nowrap">${ico('info', 2)}<span><strong>5 december:</strong> tåg 3943 går via västkusten.</span></span>`) },
      { l: 'Utropstecken i cirkel', h: P(`<span class="row" style="gap:10px;flex-wrap:nowrap">${ico('excl', 2)}<span><strong>5 december:</strong> tåg 3943 går via västkusten.</span></span>`) },
    ] },
    { id: 'd-ikon-komfort', q: 'Ska komfortnivåerna ha ikoner?', opts: [
      { l: 'Med ikoner', h: P(`<div class="stack" style="gap:10px">${[['seat', 'Sittplats'], ['bed', 'Bäddplats i delad kupé'], ['door', 'Egen kupé']].map(([k, t]) => `<span class="row" style="gap:10px;font-weight:600;flex-wrap:nowrap"><span style="color:var(--brand);display:inline-flex">${ico(k, 2, 'width:24px;height:24px')}</span>${t}</span>`).join('')}</div>`) },
      { l: 'Utan ikoner', h: P(`<div class="stack" style="gap:10px">${['Sittplats', 'Bäddplats i delad kupé', 'Egen kupé'].map(t => `<span style="font-weight:600">${t}</span>`).join('')}</div>`) },
    ] },
    { id: 'd-ikon-klimat', q: 'Hur ska klimatfördelen med tåg visas?', opts: [
      { l: 'Etikett', h: P(`<div class="stack" style="gap:8px"><span><span class="tag" style="background:var(--tint);color:var(--brand)">${ico('leaf', 2.2, 'width:13px;height:13px')} Fossilfri el</span></span><p class="h h3">Malmö – Berlin</p></div>`) },
      { l: 'Ikon och text', h: P(`<div class="stack" style="gap:8px"><p class="h h3">Malmö – Berlin</p><span class="row small" style="gap:6px;color:var(--brand);font-weight:600">${ico('leaf', 2, 'width:16px;height:16px')} Tåget drivs med fossilfri el</span></div>`) },
      { l: 'Visas inte på kortet', h: P(`<div class="stack" style="gap:8px"><p class="h h3">Malmö – Berlin</p><span class="muted small">Somna i Malmö, framme 07.51</span></div>`) },
    ] },
  ]);

  // ---------- Etiketter ----------
  G('etiketter', 'Etiketter och filter', [
    { id: 'd-tag-form', q: 'Vilken form ska etiketter (som "Vinter") ha?', opts: [
      { l: 'Pill', h: P(`<span class="tag">Vinter</span>`) },
      { l: 'Rundad 6 px', h: P(`<span class="tag" style="border-radius:6px">Vinter</span>`) },
      { l: 'Bara färgad text', h: P(`<span style="color:#8a6400;font-weight:700;font-size:13px">Vinter</span>`) },
    ] },
    { id: 'd-tag-farg', q: 'Vilken färg ska etiketter ha?', opts: [
      { l: 'Gul', h: P(`<div class="row"><span class="tag">Vinter</span><span class="tag">Nyhet</span></div>`) },
      { l: 'Tonad grön', h: P(`<div class="row"><span class="tag" style="background:var(--tint);color:var(--brand)">Vinter</span><span class="tag" style="background:var(--tint);color:var(--brand)">Nyhet</span></div>`) },
      { l: 'Mörk', h: P(`<div class="row"><span class="tag" style="background:var(--sink);color:#fff">Vinter</span><span class="tag" style="background:var(--sink);color:#fff">Nyhet</span></div>`) },
      { l: 'Kontur', h: P(`<div class="row"><span class="tag" style="background:transparent;border:1.5px solid var(--sink)">Vinter</span><span class="tag" style="background:transparent;border:1.5px solid var(--sink)">Nyhet</span></div>`) },
    ] },
    { id: 'd-tag-storlek', q: 'Hur stora ska etiketter vara?', opts: [11, 12, 14].map(s => ({ l: `${s} px text`, h: P(`<span class="tag" style="font-size:${s}px;padding:${s > 12 ? '3px 11px' : '2px 9px'}">Vinter</span>`) })) },
    { id: 'd-tag-versal', q: 'Hur ska etiketter skrivas?', opts: [
      { l: 'Vanlig text', h: P(`<span class="tag">Vinter</span>`) },
      { l: 'VERSALER', h: P(`<span class="tag" style="text-transform:uppercase;letter-spacing:.06em;font-size:11px">Vinter</span>`) },
    ] },
    { id: 'd-tag-placering', q: 'Var ska etiketten sitta på ett kort?', opts: [
      { l: 'På bilden, uppe till vänster', h: card({ img: 'img/fjallen.jpg', top: '<span class="tag" style="position:absolute;left:10px;top:10px">Vinter</span>', title: 'Malmö – Åre', meta: '16 dec – 25 apr', price: '<span class="muted small">Se priser för din resa</span>' }) },
      { l: 'Bredvid typen under bilden', h: card({ img: 'img/fjallen.jpg', eyebrow: '<span class="row" style="gap:8px"><span class="eyebrow">Nattåg</span><span class="tag">Vinter</span></span>', title: 'Malmö – Åre', meta: '16 dec – 25 apr', price: '<span class="muted small">Se priser för din resa</span>' }) },
      { l: 'Ingen etikett', h: card({ img: 'img/fjallen.jpg', title: 'Malmö – Åre', meta: '16 dec – 25 apr', price: '<span class="muted small">Se priser för din resa</span>' }) },
    ] },
    { id: 'd-chip-stil', q: 'Hur ska filterknappar (Nattåg, Dagtåg, Fjällen) se ut?', opts: [
      { l: 'Kontur', h: P(`<div class="row" style="gap:8px">${['Alla', 'Nattåg', 'Dagtåg', 'Fjällen'].map((t, i) => `<span class="chip" style="${i === 0 ? 'background:var(--sink);color:#fff;border-color:var(--sink)' : ''}">${t}</span>`).join('')}</div>`) },
      { l: 'Tonad yta', h: P(`<div class="row" style="gap:8px">${['Alla', 'Nattåg', 'Dagtåg', 'Fjällen'].map((t, i) => `<span class="chip" style="border:0;background:${i === 0 ? 'var(--brand)' : 'var(--field)'};color:${i === 0 ? '#fff' : 'var(--sink)'}">${t}</span>`).join('')}</div>`) },
      { l: 'Understrukna ord', h: P(`<div class="row" style="gap:18px">${['Alla', 'Nattåg', 'Dagtåg', 'Fjällen'].map((t, i) => `<span style="font-weight:${i === 0 ? 700 : 500};padding-bottom:4px;border-bottom:${i === 0 ? '3px solid var(--brand)' : '3px solid transparent'}">${t}</span>`).join('')}</div>`) },
    ] },
    { id: 'd-chip-vald', q: 'Hur ska ett valt filter markeras?', opts: [
      { l: 'Fylld grön', h: P(`<div class="row" style="gap:8px"><span class="chip" style="background:var(--brand);color:#fff;border-color:var(--brand)">Nattåg</span><span class="chip">Dagtåg</span></div>`) },
      { l: 'Grön kant och bock', h: P(`<div class="row" style="gap:8px"><span class="chip" style="border:2px solid var(--brand);color:var(--brand);font-weight:700;gap:6px">${ico('check', 2.6, 'width:14px;height:14px')}Nattåg</span><span class="chip">Dagtåg</span></div>`) },
      { l: 'Fylld mörk', h: P(`<div class="row" style="gap:8px"><span class="chip" style="background:var(--sink);color:#fff;border-color:var(--sink)">Nattåg</span><span class="chip">Dagtåg</span></div>`) },
    ] },
    { id: 'd-badge', q: 'Hur ska en siffra på en ikon (t.ex. varukorgen) se ut?', opts: [
      { l: 'Grön', h: P(`<span style="position:relative;display:inline-flex">${ico('cart', 2, 'width:28px;height:28px')}<span style="position:absolute;right:-8px;top:-6px;min-width:20px;height:20px;border-radius:999px;background:var(--brand);color:#fff;font-size:12px;font-weight:700;display:grid;place-items:center;padding:0 5px">2</span></span>`) },
      { l: 'Röd', h: P(`<span style="position:relative;display:inline-flex">${ico('cart', 2, 'width:28px;height:28px')}<span style="position:absolute;right:-8px;top:-6px;min-width:20px;height:20px;border-radius:999px;background:var(--bad);color:#fff;font-size:12px;font-weight:700;display:grid;place-items:center;padding:0 5px">2</span></span>`) },
      { l: 'Gul', h: P(`<span style="position:relative;display:inline-flex">${ico('cart', 2, 'width:28px;height:28px')}<span style="position:absolute;right:-8px;top:-6px;min-width:20px;height:20px;border-radius:999px;background:var(--accent);color:var(--sink);font-size:12px;font-weight:700;display:grid;place-items:center;padding:0 5px">2</span></span>`) },
    ] },
    { id: 'd-etikett-nytt', q: 'Hur ska nya resor märkas?', opts: ['Ny', 'Nyhet', 'Ny sträcka', 'Nytt för 2027'].map(t => ({ l: t, h: P(`<div class="row" style="gap:8px"><span class="eyebrow">Nattåg</span><span class="tag">${t}</span></div><p class="h h3" style="margin-top:6px">Stockholm – Hamburg</p>`) })) },
    { id: 'd-etikett-antal', q: 'Hur många etiketter får ett kort ha?', opts: [
      { l: 'Högst en', h: card({ img: 'img/fjallen.jpg', eyebrow: '<span class="row" style="gap:8px"><span class="eyebrow">Nattåg</span><span class="tag">Vinter</span></span>', title: 'Malmö – Åre', meta: '16 dec – 25 apr', price: '<span class="muted small">Se priser för din resa</span>' }) },
      { l: 'Upp till tre', h: card({ img: 'img/fjallen.jpg', eyebrow: '<span class="row" style="gap:6px"><span class="eyebrow">Nattåg</span><span class="tag">Vinter</span><span class="tag" style="background:var(--tint);color:var(--brand)">Transfer ingår</span><span class="tag" style="background:var(--field)">Skidor</span></span>', title: 'Malmö – Åre', meta: '16 dec – 25 apr', price: '<span class="muted small">Se priser för din resa</span>' }) },
    ] },
  ]);

  // ---------- Priser ----------
  const priceCard = (price) => card({ price });
  G('priser', 'Priser', [
    { id: 'd-pris-format', q: 'Hur ska ett från-pris skrivas?', opts: [
      { l: 'fr. 399 kr', h: P(`<span class="price" style="font-size:20px">fr. 399 kr</span>`) },
      { l: 'Från 399 kr', h: P(`<span class="price" style="font-size:20px">Från 399 kr</span>`) },
      { l: '399:-', h: P(`<span class="price" style="font-size:20px">399:-</span>`) },
      { l: 'Från 399 kr, litet "från"', h: P(`<span class="price" style="font-size:20px"><small style="font-size:13px;font-weight:500">från</small> 399 kr</span>`) },
    ] },
    { id: 'd-pris-storlek', q: 'Hur framträdande ska priset vara på korten?', opts: [
      { l: 'Som texten', h: priceCard('<span class="price">fr. 399 kr <small>sittplats, enkel</small></span>') },
      { l: 'Större', h: priceCard('<span class="price" style="font-size:20px">fr. 399 kr <small>sittplats, enkel</small></span>') },
      { l: 'Mycket större', h: priceCard('<span class="price" style="font-size:26px;font-weight:800;letter-spacing:-0.01em">fr. 399 kr <small>sittplats, enkel</small></span>') },
    ] },
    { id: 'd-pris-farg', q: 'Vilken färg ska priset ha?', opts: [
      { l: 'Svart', h: priceCard('<span class="price" style="font-size:18px">fr. 399 kr <small>sittplats, enkel</small></span>') },
      { l: 'Varumärkesgrön', h: priceCard('<span class="price" style="font-size:18px;color:var(--brand)">fr. 399 kr <small>sittplats, enkel</small></span>') },
      { l: 'Röd', h: priceCard('<span class="price" style="font-size:18px;color:var(--bad)">fr. 399 kr <small>sittplats, enkel</small></span>') },
    ] },
    { id: 'd-pris-enhet', q: 'Var ska förklaringen ("sittplats, enkel") stå?', opts: [
      { l: 'Efter priset', h: priceCard('<span class="price" style="font-size:18px">fr. 399 kr <small>sittplats, enkel</small></span>') },
      { l: 'Under priset', h: priceCard('<span class="stack" style="gap:0"><span class="price" style="font-size:18px">fr. 399 kr</span><small class="muted small">sittplats, enkel</small></span>') },
      { l: 'Ingen förklaring', h: priceCard('<span class="price" style="font-size:18px">fr. 399 kr</span>') },
    ] },
    { id: 'd-pris-placering', q: 'Var på kortet ska priset sitta?', opts: [
      { l: 'Längst ner', h: card() },
      { l: 'Direkt under rubriken', h: P(`<div class="stack" style="gap:6px;max-width:260px"><img class="pic" src="img/berlin.jpg" alt="Brandenburger Tor i kvällsljus"><span class="eyebrow">Nattåg</span><p class="h h3">Malmö – Berlin</p><span class="price">fr. 399 kr <small>sittplats, enkel</small></span><p class="muted small">Somna i Malmö, framme 07.51</p></div>`) },
      { l: 'På bilden', h: card({ top: '<span style="position:absolute;left:10px;bottom:10px;background:var(--box);border-radius:999px;padding:4px 12px;font-weight:700;font-size:14px">fr. 399 kr</span>', price: '' }) },
    ] },
    { id: 'd-pris-tusental', q: 'Hur ska priser över tusen skrivas?', opts: [['1 499 kr', '1 499 kr'], ['1499 kr', '1499 kr'], ['1.499 kr', '1.499 kr']].map(([l, t]) => ({ l, h: P(`<span class="price" style="font-size:20px">fr. ${t}</span><p class="muted small">Egen kupé för två, Malmö – Berlin</p>`) })) },
    { id: 'd-pris-jamfor', q: 'Hur ska ett specialpris visas?', opts: [
      { l: 'Bara det nya priset', h: priceCard('<span class="price" style="font-size:18px">fr. 399 kr <small>sittplats, enkel</small></span>') },
      { l: 'Med "Specialpris" och datum', h: priceCard('<span class="stack" style="gap:2px"><span class="price" style="font-size:18px">fr. 399 kr <small>sittplats, enkel</small></span><span class="small" style="color:var(--brand);font-weight:600">Specialpris 2 nov – 17 dec</span></span>') },
      { l: 'Överstruket gammalt pris', h: priceCard('<span class="price" style="font-size:18px">fr. 399 kr <small style="text-decoration:line-through">549 kr</small></span>') },
    ] },
    { id: 'd-pris-person', q: 'Hur ska det framgå att priset gäller per person?', opts: [
      { l: '"per person"', h: P(`<span class="price" style="font-size:20px">fr. 399 kr <small>per person</small></span>`) },
      { l: '"/person"', h: P(`<span class="price" style="font-size:20px">fr. 399 kr<small>/person</small></span>`) },
      { l: 'Förklaras i småtext', h: P(`<span class="price" style="font-size:20px">fr. 399 kr</span><p class="muted small">Pris per person, enkel resa.</p>`) },
    ] },
    { id: 'd-pris-knapp', q: 'Ska priset stå i knappen?', opts: [
      { l: 'Pris bredvid knappen', h: P(`<div class="row" style="justify-content:space-between;max-width:280px"><span class="price" style="font-size:18px">399 kr</span>${btn('Välj', 'height:44px')}</div>`) },
      { l: 'Pris i knappen', h: P(btn('Välj · 399 kr', 'height:44px')) },
      { l: 'Pris ovanför knappen', h: P(`<div class="stack" style="gap:8px;align-items:flex-start"><span class="price" style="font-size:18px">399 kr</span>${btn('Välj', 'height:44px')}</div>`) },
    ] },
    { id: 'd-pris-totalt', q: 'Hur ska totalpriset visas i en bokningssammanfattning?', opts: [
      { l: 'Stort och fetstilt', h: P(`<div class="panel stack" style="gap:8px"><div class="row" style="justify-content:space-between"><span>2 vuxna, egen kupé</span><span>1 499 kr</span></div><div class="divider"></div><div class="row" style="justify-content:space-between;align-items:baseline"><span style="font-weight:700">Totalt</span><span style="font-size:26px;font-weight:800">1 499 kr</span></div></div>`) },
      { l: 'Som en vanlig rad, fet', h: P(`<div class="panel stack" style="gap:8px"><div class="row" style="justify-content:space-between"><span>2 vuxna, egen kupé</span><span>1 499 kr</span></div><div class="divider"></div><div class="row" style="justify-content:space-between;font-weight:700"><span>Totalt</span><span>1 499 kr</span></div></div>`) },
      { l: 'På grön yta', h: P(`<div class="panel stack" style="gap:8px;padding:0;overflow:hidden"><div class="row" style="justify-content:space-between;padding:14px 18px 6px"><span>2 vuxna, egen kupé</span><span>1 499 kr</span></div><div class="row" style="justify-content:space-between;align-items:baseline;background:var(--brand);color:#fff;padding:14px 18px"><span style="font-weight:700">Totalt</span><span style="font-size:22px;font-weight:800">1 499 kr</span></div></div>`) },
    ] },
  ]);

  window.QUIZ_DATA.push({ part: 'detaljer', groups });
})();
