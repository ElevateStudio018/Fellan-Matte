/* Elevate designquiz: Knappar och interaktion (nyckel knappar, prefix kn-).
   Varje alternativ får automatiskt en omslutande klass kn-<id>-<n>; i h står %P för den
   klassen och %Q för frågans id. Egen CSS skrivs alltid under .%P så att inget läcker.
   Hover-lägen visas både statiskt (Vanlig / Hover) och live när man håller över rutan
   (.opt:hover), eftersom själva renderingen inte tar emot muspekaren. */
(function () {
  'use strict';

  // ---------- Ikoner ----------
  const P = {
    arrow: '<path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>',
    arrowL: '<path d="M19 12H5"/><path d="m11 6-6 6 6 6"/>',
    arrowUp: '<path d="M12 19V5"/><path d="m6 11 6-6 6 6"/>',
    arrowUR: '<path d="M7 17 17 7"/><path d="M8 7h9v9"/>',
    chev: '<path d="m9 6 6 6-6 6"/>',
    chevL: '<path d="m15 6-6 6 6 6"/>',
    chevD: '<path d="m6 9 6 6 6-6"/>',
    chevU: '<path d="m6 15 6-6 6 6"/>',
    cal: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
    check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
    x: '<path d="M6 6l12 12M18 6 6 18"/>',
    copy: '<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M15 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h3"/>',
    share: '<path d="M12 3v12"/><path d="m7 8 5-5 5 5"/><path d="M5 13v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6"/>',
    nodes: '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4"/>',
    phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
    chat: '<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.4A8 8 0 1 1 21 12z"/>',
    cart: '<circle cx="9" cy="20" r="1.5"/><circle cx="17" cy="20" r="1.5"/><path d="M3 4h2l2.4 11h11l2-8H6.2"/>',
    bag: '<path d="M5 8h14l-1 13H6L5 8z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    minus: '<path d="M5 12h14"/>',
    heart: '<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>',
    star: '<path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1 6.2L12 17.3 6.5 20.2l1-6.2L3 9.6l6.2-.9z"/>',
    bookmark: '<path d="M6 3h12v18l-6-4-6 4z"/>',
    trash: '<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
    pin: '<path d="M12 21s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12z"/><circle cx="12" cy="9" r="2.5"/>',
    download: '<path d="M12 4v11"/><path d="m7 10 5 5 5-5"/><path d="M5 20h14"/>',
    play: '<path d="M8 5.5v13l10.5-6.5z" fill="currentColor"/>',
    lock: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
    filter: '<path d="M4 6h16M7 12h10M10 18h4"/>',
    grid: '<rect x="4" y="4" width="7" height="7" rx="1"/><rect x="13" y="4" width="7" height="7" rx="1"/><rect x="4" y="13" width="7" height="7" rx="1"/><rect x="13" y="13" width="7" height="7" rx="1"/>',
    list: '<path d="M9 6h11M9 12h11M9 18h11M4.5 6h.01M4.5 12h.01M4.5 18h.01"/>',
    link: '<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>',
    ig: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/>',
    fb: '<path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8z"/>',
    li: '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 11v6M8 7.5v.01M12 17v-6M12 13.5a2.5 2.5 0 0 1 5 0V17"/>',
    sort: '<path d="M7 4v16M3 16l4 4 4-4M17 20V4M13 8l4-4 4 4"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
    retry: '<path d="M20 11a8 8 0 1 0-2.3 5.7"/><path d="M20 5v6h-6"/>',
    file: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/>',
    send: '<path d="M21 3 10 14"/><path d="m21 3-7 18-4-7-7-4z"/>',
    alert: '<circle cx="12" cy="12" r="9"/><path d="M12 7v6M12 16.5h.01"/>'
  };
  const ic = (n, s, st) => `<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"${s || st ? ` style="${s ? `width:${s}px;height:${s}px;` : ''}${st || ''}"` : ''}>${P[n]}</svg>`;
  // Fylld ikon (hjärta, stjärna, bokmärke)
  const icf = (n, s, st) => ic(n, s, st).replace('fill="none"', 'fill="currentColor"');

  // ---------- Byggstenar ----------
  const b = (t, st, c) => `<span class="${c || 'sb'}"${st ? ` style="${st}"` : ''}>${t}</span>`;
  const b2 = (t, st) => b(t, st, 'sb2');
  const lk = (t, st) => `<span class="link"${st ? ` style="${st}"` : ''}>${t}</span>`;
  const css = s => `<style>${s}</style>`;
  const pad = (h, st) => `<div class="pad"${st ? ` style="${st}"` : ''}>${h}</div>`;
  const cap = t => `<span class="small muted">${t}</span>`;
  // Kort med sammanhang: { eye, t, p, mid, a, st }
  const card = o => `<div class="pad"><div class="panel stack" style="gap:14px${o.st ? ';' + o.st : ''}"><div class="stack" style="gap:4px">${o.eye ? `<div class="eyebrow">${o.eye}</div>` : ''}<div class="h h3">${o.t}</div>${o.p ? `<p class="muted small">${o.p}</p>` : ''}</div>${o.mid || ''}${o.a != null ? `<div class="row"${o.ast ? ` style="${o.ast}"` : ''}>${o.a}</div>` : ''}</div></div>`;
  // Vanlig / Hover sida vid sida
  const pair = (a, z, la, lz) => `<div class="pad"><div class="row" style="gap:18px 22px;justify-content:center;align-items:flex-start">${[[a, la || 'Vanlig'], [z, lz || 'Hover']].map(([h, l]) => `<div class="stack" style="align-items:center;gap:8px;min-width:0">${h}${cap(l)}</div>`).join('')}</div></div>`;
  // Foto med toning
  const photo = (img, alt, inner, h, sh) => `<div class="hx"><div class="hx-photo" style="min-height:${h || 250}px"><img class="bg" src="img/${img}.jpg" alt="${alt}"><div class="sh" style="background:${sh || 'linear-gradient(180deg,rgba(10,12,14,.05) 20%,rgba(10,12,14,.62))'}"></div><div class="hx-in" style="margin-top:auto">${inner}</div></div></div>`;
  // Grå textrader
  const bars = (n, c) => Array.from({ length: n }, (_, i) => `<div style="height:6px;border-radius:3px;background:${c || '#E2E2DE'};width:${[94, 82, 88, 62, 76][i % 5]}%"></div>`).join('');
  // Mobil
  const phone = (inner, over, bg) => `<div style="padding:16px 12px;display:flex;justify-content:center"><div style="position:relative;width:100%;max-width:210px;height:340px;border:6px solid #1F1C18;border-radius:28px;overflow:hidden;background:${bg || '#fff'};display:flex;flex-direction:column">${inner}${over || ''}</div></div>`;
  const mhead = (name, right) => `<div style="display:flex;align-items:center;justify-content:space-between;gap:8px;padding:10px 12px;border-bottom:1px solid var(--sline);flex:0 0 auto"><b style="font-size:12px;letter-spacing:-.01em;white-space:nowrap">${name}</b><span style="display:flex;align-items:center;gap:8px">${right || ''}${ic('menu', 16)}</span></div>`;
  const mimg = (img, alt) => img ? `<img src="img/${img}.jpg" alt="${alt}" style="width:100%;height:92px;object-fit:cover;border-radius:8px">` : '<div style="height:92px;border-radius:8px;background:linear-gradient(135deg,#DCE3EA,#C7D2DC)"></div>';
  const mbody = (o) => `<div style="padding:12px;display:flex;flex-direction:column;gap:9px;min-height:0">${mimg(o.img, o.alt)}<div style="font-weight:700;font-size:15px;line-height:1.2;letter-spacing:-.01em">${o.t}</div>${bars(2)}${o.btn || ''}${bars(o.n || 5)}</div>`;
  // Liten knapp i mobilen
  const mb = (t, st) => b(t, 'height:40px;font-size:13px;padding:0 14px;' + (st || ''));
  // Produktbild utan foto: mjuk yta med en enkel vas
  const prod = (bg, h, c) => `<div style="height:${h || 140}px;border-radius:10px;background:${bg || '#ECE7DF'};display:flex;align-items:flex-end;justify-content:center;position:relative;overflow:hidden"><div style="width:30%;max-width:70px;height:62%;background:${c || '#C8B597'};border-radius:46% 46% 14px 14px;margin-bottom:12%"></div></div>`;
  // Dialog
  const dlg = (title, text, acts, extra) => `<div class="pad" style="background:#DADBD8"><div class="panel stack" style="gap:14px;box-shadow:0 12px 32px -12px rgba(0,0,0,.35);position:relative">${extra || ''}<div class="stack" style="gap:4px"><div class="h h3">${title}</div><p class="muted small">${text}</p></div>${acts}</div></div>`;
  const RM = sel => `@media (prefers-reduced-motion: reduce){${sel}{animation:none!important;transition:none!important}}`;

  // ---------- Frågor ----------
  const Q = (id, q, layout, opts) => ({
    id: 'kn-' + id, q, layout,
    opts: opts.map(([l, h], i) => h == null ? { l } : { l, h: `<div class="kn-${id}-${i}" style="flex:1;display:flex;flex-direction:column;justify-content:center;min-width:0">${h.replace(/%P/g, `kn-${id}-${i}`).replace(/%Q/g, 'kn-' + id)}</div>` })
  });
  const G = [];
  const group = (key, title, questions) => G.push({ key, title, questions });

  // =====================================================================
  // 1. Primärknappen
  // =====================================================================
  group('primar', 'Primärknappen', [
    Q('pr-rundning', 'Hur rundad ska primärknappen vara?', 'grid',
      [[0, 'Skarpa hörn (0 px)'], [4, '4 px rundning'], [8, '8 px rundning'], [12, '12 px rundning'], [999, 'Helt rund (pill)']].map(([r, l]) =>
        [l, card({ eye: 'Salong Nova', t: 'Klippning och färg', p: 'Lediga tider redan den här veckan.', a: b('Boka tid', `border-radius:${r}px`) })])),

    Q('pr-hojd', 'Hur hög ska en vanlig primärknapp vara?', 'grid',
      [40, 44, 48, 56].map(h => [`${h} px hög`, card({ eye: 'Lindqvist Bygg', t: 'Renovering av badrum', p: 'Fast pris efter kostnadsfritt hembesök.', a: b('Begär offert', `height:${h}px`) })])),

    Q('pr-sidoluft', 'Hur mycket luft ska knappen ha till vänster och höger om texten?', 'grid',
      [[16, 'Smal sidoluft (16 px)'], [24, 'Mellan sidoluft (24 px)'], [36, 'Bred sidoluft (36 px)']].map(([p, l]) =>
        [l, card({ eye: 'Kliniken Vasa', t: 'Fysioterapi', p: 'Ingen remiss behövs. Besök inom en vecka.', a: b('Boka besök', `padding:0 ${p}px`) })])),

    Q('pr-vikt', 'Hur tung ska texten i knappen vara?', 'grid',
      [[500, 'Medium (500)'], [600, 'Halvfet (600)'], [700, 'Fet (700)']].map(([w, l]) =>
        [l, card({ eye: 'Kafé Linnea', t: 'Tårtor till helgen', p: 'Beställ senast torsdag för hämtning lördag.', a: b('Beställ tårta', `font-weight:${w}`) })])),

    Q('pr-textstorlek', 'Hur stor ska texten i en vanlig knapp vara?', 'grid',
      [14, 15, 16, 17].map(s => [`${s} px text`, card({ eye: 'Hotell Strandgården', t: 'Dubbelrum med havsutsikt', p: 'Frukost och parkering ingår.', a: b('Boka rum', `font-size:${s}px`) })])),

    Q('pr-versaler', 'Ska knapptexten skrivas med versaler?', 'grid', [
      ['Vanlig text', card({ eye: 'Bryggans kök', t: 'Middag vid vattnet', p: 'Öppet onsdag till lördag från 17.', a: b('Boka bord') })],
      ['Versaler, lätt spärrade', card({ eye: 'Bryggans kök', t: 'Middag vid vattnet', p: 'Öppet onsdag till lördag från 17.', a: b('Boka bord', 'text-transform:uppercase;letter-spacing:.05em;font-size:14px') })],
      ['Små versaler, tydligt spärrade', card({ eye: 'Bryggans kök', t: 'Middag vid vattnet', p: 'Öppet onsdag till lördag från 17.', a: b('Boka bord', 'text-transform:uppercase;letter-spacing:.12em;font-size:12px;font-weight:700') })]
    ]),

    Q('pr-bredd', 'Hur bred ska primärknappen vara i ett kort på dator?', 'grid', [
      ['Efter texten', card({ eye: 'Norrsken Redovisning', t: 'Bokslut och deklaration', p: 'Fast månadspris för små aktiebolag.', a: b('Boka ett samtal') })],
      ['Minst 180 px bred', card({ eye: 'Norrsken Redovisning', t: 'Bokslut och deklaration', p: 'Fast månadspris för små aktiebolag.', a: b('Boka ett samtal', 'min-width:180px') })],
      ['Full bredd i kortet', card({ eye: 'Norrsken Redovisning', t: 'Bokslut och deklaration', p: 'Fast månadspris för små aktiebolag.', a: b('Boka ett samtal', 'width:100%') })]
    ]),

    Q('pr-bredd-mobil', 'Hur bred ska huvudknappen vara på mobil?', 'grid', [
      ['Efter texten på mobil', phone(mhead('Salong Nova') + mbody({ t: 'Klipp, färg och styling i Vasastan', btn: mb('Boka tid', 'align-self:flex-start') }))],
      ['Full bredd på mobil', phone(mhead('Salong Nova') + mbody({ t: 'Klipp, färg och styling i Vasastan', btn: mb('Boka tid', 'width:100%') }))]
    ]),

    Q('pr-ikon', 'Ska primärknappen ha en ikon?', 'grid', [
      ['Ingen ikon', card({ eye: 'Bergs Bilverkstad', t: 'Service och däckbyte', p: 'Vi har lånebil om du behöver.', a: b('Boka service') })],
      ['Ikon före texten', card({ eye: 'Bergs Bilverkstad', t: 'Service och däckbyte', p: 'Vi har lånebil om du behöver.', a: b(ic('cal', 18) + 'Boka service') })],
      ['Pil efter texten', card({ eye: 'Bergs Bilverkstad', t: 'Service och däckbyte', p: 'Vi har lånebil om du behöver.', a: b('Boka service' + ic('arrow', 18)) })]
    ]),

    Q('pr-pil', 'Om knappen har en pil, vilken sort?', 'grid', [
      ['Rak pil →', card({ eye: 'Nordtrail', t: 'Vandring i Jämtlandsfjällen', p: 'Sex dagar med guide, från 8 900 kr.', a: b('Se resor' + ic('arrow', 18)) })],
      ['Chevron ›', card({ eye: 'Nordtrail', t: 'Vandring i Jämtlandsfjällen', p: 'Sex dagar med guide, från 8 900 kr.', a: b('Se resor' + ic('chev', 18)) })],
      ['Diagonal pil ↗', card({ eye: 'Nordtrail', t: 'Vandring i Jämtlandsfjällen', p: 'Sex dagar med guide, från 8 900 kr.', a: b('Se resor' + ic('arrowUR', 18)) })],
      ['Pil i egen cirkel', card({ eye: 'Nordtrail', t: 'Vandring i Jämtlandsfjällen', p: 'Sex dagar med guide, från 8 900 kr.', a: b('Se resor' + `<span style="display:inline-grid;place-items:center;width:30px;height:30px;border-radius:50%;background:rgba(255,255,255,.16);margin-right:-14px">${ic('arrow', 16)}</span>`, 'gap:12px') })]
    ]),

    Q('pr-ikonavstand', 'Hur långt ska det vara mellan text och ikon i knappen?', 'grid',
      [6, 8, 12].map(g => [`${g} px mellan text och ikon`, pad(`<div class="stack" style="gap:12px;align-items:flex-start">${b('Se lediga tider' + ic('arrow', 18), `gap:${g}px`)}${b(ic('phone', 18) + 'Ring oss', `gap:${g}px`)}</div>`)])),

    Q('pr-skugga', 'Ska primärknappen ha skugga?', 'grid', [
      ['Ingen skugga', card({ eye: 'Kraftverket Gym', t: 'Prova på en vecka', p: 'Gruppträning och gym ingår.', a: b('Prova gratis') })],
      ['Liten mjuk skugga', card({ eye: 'Kraftverket Gym', t: 'Prova på en vecka', p: 'Gruppträning och gym ingår.', a: b('Prova gratis', 'box-shadow:0 1px 2px rgba(0,0,0,.14),0 3px 8px rgba(0,0,0,.10)') })],
      ['Färgad, större skugga', card({ eye: 'Kraftverket Gym', t: 'Prova på en vecka', p: 'Gruppträning och gym ingår.', a: b('Prova gratis', 'box-shadow:0 10px 22px -8px rgba(36,64,94,.65)') })]
    ]),

    Q('pr-yta', 'Ska knappens yta vara helt platt eller ha lite djup?', 'grid', [
      ['Platt fyllning', pad(b('Begär offert', 'height:52px;padding:0 28px'), 'display:flex;justify-content:center')],
      ['Svag toning uppifrån', pad(b('Begär offert', 'height:52px;padding:0 28px;background:linear-gradient(180deg,#30547A,#1E3852);border-color:#1E3852'), 'display:flex;justify-content:center')],
      ['Ljus kant upptill, mörk nedtill', pad(b('Begär offert', 'height:52px;padding:0 28px;border-color:#1A3049;box-shadow:inset 0 1px 0 rgba(255,255,255,.22),inset 0 -2px 0 rgba(0,0,0,.18),0 1px 2px rgba(0,0,0,.2)'), 'display:flex;justify-content:center')]
    ]),

    Q('pr-farg', 'Vilken färg ska huvudknappen ha när varumärket är grönt?', 'grid',
      [['Varumärkets grön', '#2F5D50', '#fff'], ['Nästan svart', '#1A1C1E', '#fff'], ['Varm kontrastfärg', '#B8542C', '#fff'], ['Ljus accent med mörk text', '#EEC35A', '#1A1C1E']].map(([l, c, t]) =>
        [l, `<div style="--tint:#E2ECE7">${card({ eye: '<span style="color:#2F5D50">Kafé Linnea</span>', t: 'Surdeg, bullar och tårtor', p: 'Bakat varje morgon i Majorna.', mid: '<div class="row" style="gap:6px"><span class="tag" style="color:#2F5D50">Ekologiskt</span><span class="tag" style="color:#2F5D50">Glutenfritt finns</span></div>', a: b('Beställ tårta', `background:${c};border-color:${c};color:${t}`) })}</div>`])),

    Q('pr-en-per-vy', 'Hur många fyllda primärknappar får synas samtidigt i en sektion?', 'stack', (() => {
      const items = [['Kök', 'Från planering till färdigt kök.'], ['Badrum', 'Våtrum med intyg och garanti.'], ['Tillbyggnad', 'Bygglov, grund och stomme.']];
      const sec = (head, cardAct) => `<div class="pad stack" style="gap:16px"><div class="row" style="justify-content:space-between;align-items:flex-end"><div class="stack" style="gap:2px"><div class="eyebrow">Lindqvist Bygg</div><div class="h h2">Våra tjänster</div></div>${head}</div><div class="row" style="align-items:stretch">${items.map(([t, p]) => `<div class="panel stack" style="flex:1 1 170px;gap:10px;min-width:0"><div class="h h3">${t}</div><p class="muted small">${p}</p><div style="margin-top:auto">${cardAct}</div></div>`).join('')}</div></div>`;
      return [
        ['En enda primärknapp', sec(b('Begär offert'), lk('Läs mer'))],
        ['Primärknapp i varje kort', sec('', b('Begär offert', 'height:42px;font-size:14px;padding:0 16px'))],
        ['En primär, konturknappar i korten', sec(b('Begär offert'), b2('Läs mer', 'height:42px;font-size:14px;padding:0 16px'))]
      ];
    })()),

    Q('pr-placering-kort', 'Var i ett tjänstekort ska knappen sitta?', 'grid', (() => {
      const top = '<div class="stack" style="gap:4px"><div class="h h3">Färg och klippning</div><p class="muted small">Inklusive tvätt och styling. 2 timmar.</p></div>';
      const pr = '<div class="price" style="font-size:18px">1 450 kr</div>';
      const wrap = inner => `<div class="pad"><div class="panel stack" style="gap:14px">${inner}</div></div>`;
      return [
        ['Under texten, vänster', wrap(top + pr + `<div>${b('Boka tid')}</div>`)],
        ['Längst ner, full bredd', wrap(top + pr + b('Boka tid', 'width:100%'))],
        ['Pris till vänster, knapp till höger', wrap(top + `<div class="row" style="justify-content:space-between">${pr}${b('Boka tid')}</div>`)]
      ];
    })()),

    Q('pr-pris', 'Hur ska pris och bokningsknapp höra ihop?', 'grid', [
      ['Priset i knappen', card({ eye: 'Studio Lumi', t: 'Ansiktsbehandling 60 min', p: 'Rengöring, peeling, mask och massage.', a: b('Boka · 895 kr') })],
      ['Priset bredvid knappen', card({ eye: 'Studio Lumi', t: 'Ansiktsbehandling 60 min', p: 'Rengöring, peeling, mask och massage.', a: b('Boka') + '<span class="price" style="font-size:17px">895 kr</span>' })],
      ['Priset ovanför knappen', card({ eye: 'Studio Lumi', t: 'Ansiktsbehandling 60 min', p: 'Rengöring, peeling, mask och massage.', mid: '<div class="price" style="font-size:20px">895 kr</div>', a: b('Boka') })]
    ]),

    Q('pr-undertext', 'Ska knappen ha en kort undertext?', 'grid', [
      ['Ingen undertext', card({ eye: 'Ström & Co El', t: 'Elinstallation i hemmet', p: 'Auktoriserade elektriker i hela Uppsala.', a: b('Få offert') })],
      ['Undertext inne i knappen', card({ eye: 'Ström & Co El', t: 'Elinstallation i hemmet', p: 'Auktoriserade elektriker i hela Uppsala.', a: b('<span>Få offert</span><span style="font-size:12px;font-weight:500;opacity:.8">Svar inom 24 timmar</span>', 'flex-direction:column;gap:3px;height:auto;padding:10px 24px') })],
      ['Undertext under knappen', card({ eye: 'Ström & Co El', t: 'Elinstallation i hemmet', p: 'Auktoriserade elektriker i hela Uppsala.', a: `<div class="stack" style="gap:8px;align-items:flex-start">${b('Få offert')}<span class="small muted">Svar inom 24 timmar</span></div>` })]
    ]),

    Q('pr-hero-storlek', 'Ska knappen i hero vara större än knapparna längre ner?', 'grid',
      [[48, 15, 24, 'Samma storlek (48 px)'], [56, 16, 30, 'Lite större (56 px)'], [64, 18, 36, 'Mycket större (64 px)']].map(([h, f, p, l]) =>
        [l, photo('stugor-sjo', 'Röda stugor vid en sjö', `<div class="hx-t hx-s">Stugor vid sjön</div><div class="hx-acts">${b('Boka stuga', `height:${h}px;font-size:${f}px;padding:0 ${p}px;background:#fff;border-color:#fff;color:#1A1C1E`)}</div>`, 270)])),

    Q('pr-justering', 'Hur ska text och pil ligga i en knapp med full bredd?', 'grid', [
      ['Text och pil centrerat', pad(`<div class="stack" style="gap:10px;max-width:240px;margin:0 auto">${b('Se lediga tider' + ic('arrow', 18), 'width:100%')}${b('Hitta hit' + ic('arrow', 18), 'width:100%;background:transparent;color:var(--brand)')}</div>`)],
      ['Text vänster, pil höger', pad(`<div class="stack" style="gap:10px;max-width:240px;margin:0 auto">${b('Se lediga tider' + ic('arrow', 18), 'width:100%;justify-content:space-between;padding:0 18px')}${b('Hitta hit' + ic('arrow', 18), 'width:100%;justify-content:space-between;padding:0 18px;background:transparent;color:var(--brand)')}</div>`)]
    ]),

    Q('pr-lang-text', 'Vad ska hända när knapptexten är för lång för mobilen?', 'grid', [
      ['Texten radbryts i knappen', pad(`<div style="max-width:220px;margin:0 auto" class="stack">${cap('Mobil, 220 px')}${b('Boka kostnadsfri hembesiktning', 'white-space:normal;height:auto;min-height:48px;padding:10px 20px;line-height:1.25;text-align:center;width:100%')}</div>`)],
      ['Kortare text', pad(`<div style="max-width:220px;margin:0 auto" class="stack">${cap('Mobil, 220 px')}${b('Boka hembesiktning', 'width:100%')}</div>`)],
      ['Mindre text på en rad', pad(`<div style="max-width:220px;margin:0 auto" class="stack">${cap('Mobil, 220 px')}${b('Boka kostnadsfri hembesiktning', 'font-size:12.5px;padding:0 10px;width:100%')}</div>`)]
    ])
  ]);

  window.QZ.part({ key: 'knappar', groups: G });
})();
