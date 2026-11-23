window.QUIZ_DATA = window.QUIZ_DATA || [];
(function () {
  // ===== Byggstenar =====
  const svg = (d, sw = 2.2, s = 18) => `<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="width:${s}px;height:${s}px">${d}</svg>`;
  const ARROW = svg('<path d="M5 12h14M13 6l6 6-6 6"/>');
  const SEARCH = svg('<circle cx="11" cy="11" r="6.5"/><path d="M20 20l-4-4"/>', 2.2, 19);
  const P = {
    skidor: ['img/vinter-skidor.jpg', 'Skidåkare vid en lift en vinterkväll', 'center 40%'],
    ovan: ['img/skidor-ovanifran.jpg', 'Två skidåkare i en ljus backe sedda ovanifrån', 'center'],
    fjall: ['img/fjallen.jpg', 'Snötäckt fjäll under blå himmel', 'center 65%'],
    stockholm: ['img/stockholm.jpg', 'Gamla stan i Stockholm sedd från vattnet', 'center'],
    kopenhamn: ['img/kopenhamn.jpg', 'Nyhavn i Köpenhamn med cyklister', 'center 60%'],
    berlin: ['img/berlin.jpg', 'Brandenburger Tor i kvällsljus', 'center 55%'],
    kupe: ['img/kupe.jpg', 'Två bäddade britsar i en tågkupé', 'center'],
    krogen: ['img/krogen-frukost.jpg', 'Frukost vid tågfönstret', 'center 70%'],
  };
  const img = (k, style = '') => `<img class="bg" src="${P[k][0]}" alt="${P[k][1]}" style="object-position:${P[k][2]};${style}">`;
  const BTN = {
    brand: '',
    white: 'background:#fff;border-color:#fff;color:var(--sink)',
    ghost: 'background:transparent;border-color:#fff;color:#fff',
    yellow: 'background:var(--accent);border-color:var(--accent);color:var(--sink)',
    havre: 'background:#F6F1E9;border-color:#F6F1E9;color:var(--brand)',
  };
  const pill = (t, k = 'brand', arrow = true) => `<span class="sb" style="${BTN[k]}">${t}${arrow ? ' ' + ARROW : ''}</span>`;
  const ghost = (t, k = 'brand') => k === 'white' ? `<span class="sb2" style="border-color:#fff;color:#fff">${t}</span>` : `<span class="sb2">${t}</span>`;
  const textlink = (t, color = '#fff') => `<span class="row" style="gap:6px;color:${color};font-weight:700;text-decoration:underline;text-underline-offset:5px;text-decoration-thickness:2px">${t}</span>`;
  const tag = (t, style = '') => `<span class="tag" style="align-self:flex-start;${style}">${t}</span>`;
  const eye = (t, color) => t ? `<span class="hx-eye" style="color:${color}">${t}</span>` : '';
  const sub = (t, color, extra = '') => t ? `<p class="hx-p" style="color:${color};${extra}">${t}</p>` : '';
  const SH = {
    soft: 'linear-gradient(180deg,rgba(0,0,0,.18),rgba(0,0,0,.32))',
    bottom: 'linear-gradient(180deg,rgba(0,0,0,.05) 0%,rgba(0,0,0,.25) 45%,rgba(0,0,0,.66) 100%)',
    left: 'linear-gradient(90deg,rgba(0,0,0,.6) 0%,rgba(0,0,0,.28) 50%,rgba(0,0,0,0) 85%)',
    top: 'linear-gradient(180deg,rgba(0,0,0,.55) 0%,rgba(0,0,0,.15) 45%,rgba(0,0,0,.05) 100%)',
  };
  const TINT = { gron: '#E3ECE6', havre: '#EFE7D8', gul: '#FBF0CF', rosa: '#F8E4E1', vit: '#FFFDF9' };

  // ===== Hero-koncept =====
  const T = {
    // Som SJ: stämningsfoto, kort fråga, en vit sökknapp.
    pillsearch: c => `<div class="hx"><div class="hx-photo" style="min-height:clamp(320px,44cqi,500px);justify-content:center;align-items:center;text-align:center">${img(c.photo)}<div class="sh" style="background:${SH.soft}"></div>
      <div class="hx-in" style="align-items:center">${eye(c.eyebrow, '#fff')}<p class="hx-t hx-m" style="color:#fff;max-width:18ch">${c.title}</p>${sub(c.sub, 'rgba(255,255,255,.95)', 'margin:0 auto')}<span class="hx-searchpill">${SEARCH}${c.cta || 'Sök resa'}</span></div></div></div>`,

    // Som SJ:s kampanjblock: färgyta med etikett, rubrik och knapp bredvid ett foto.
    split: c => `<div class="hx"><div class="hx-two" style="min-height:clamp(320px,40cqi,460px)">
      <div class="hx-in" style="background:${TINT[c.tint || 'gron']};justify-content:center;${c.center === false ? '' : 'align-items:center;text-align:center'}">${c.tag ? tag(c.tag, c.center === false ? '' : 'align-self:center') : ''}<p class="hx-t hx-s" style="max-width:20ch">${c.title}</p>${sub(c.sub, 'var(--sink)', c.center === false ? '' : 'margin:0 auto')}<div class="hx-acts" style="${c.center === false ? '' : 'justify-content:center'}">${pill(c.cta || 'Läs mer', c.btn || 'brand', false)}</div></div>
      <div class="hx-img" style="${c.flip ? 'order:-1' : ''}">${img(c.photo)}</div></div></div>`,

    // Stor redaktionell rubrik direkt på fotot, ingen ruta.
    editorial: c => `<div class="hx"><div class="hx-photo" style="min-height:clamp(380px,56cqi,640px);justify-content:flex-end">${img(c.photo)}<div class="sh" style="background:${SH.bottom}"></div>
      <div class="hx-in">${eye(c.eyebrow, 'rgba(255,255,255,.92)')}<p class="hx-t ${c.size || 'hx-xl'}" style="color:#fff;max-width:${c.max || '12ch'}">${c.title}</p>${sub(c.sub, 'rgba(255,255,255,.95)')}<div class="hx-acts">${pill(c.cta || 'Se resorna', 'white')}${c.link ? textlink(c.link) : ''}</div></div></div></div>`,

    // Rubrik på havre överst, bred rundad bild under.
    havretop: c => `<div class="hx"><div class="hx-in" style="padding-bottom:clamp(18px,3cqi,32px)">${eye(c.eyebrow, 'var(--brand)')}<p class="hx-t hx-l" style="max-width:15ch">${c.title}</p>${sub(c.sub, 'var(--smuted)')}<div class="hx-acts">${pill(c.cta || 'Sök resa')}${c.cta2 ? ghost(c.cta2) : ''}</div></div>
      <div style="padding:0 clamp(22px,5cqi,60px) clamp(22px,5cqi,60px)"><div class="hx-img" style="aspect-ratio:21/8;min-height:180px;border-radius:var(--rc)">${img(c.photo)}</div></div></div>`,

    // Text till vänster, kollage av tre foton till höger.
    collage: c => `<div class="hx"><div class="hx-two" style="align-items:center;gap:clamp(16px,3cqi,40px);padding:clamp(22px,5cqi,60px)">
      <div class="stack" style="gap:clamp(12px,1.8cqi,20px)">${eye(c.eyebrow, 'var(--brand)')}<p class="hx-t hx-l" style="max-width:13ch">${c.title}</p>${sub(c.sub, 'var(--smuted)')}<div class="hx-acts">${pill(c.cta || 'Se resorna')}</div></div>
      <div style="display:grid;grid-template-columns:1.25fr 1fr;grid-template-rows:1fr 1fr;gap:10px;height:clamp(260px,36cqi,420px)">
        <div class="hx-img" style="grid-row:span 2;border-radius:var(--rc);min-height:0">${img(c.photo)}</div>
        <div class="hx-img" style="border-radius:var(--rc);min-height:0">${img(c.photo2 || 'fjall')}</div>
        <div class="hx-img" style="border-radius:var(--rc);min-height:0">${img(c.photo3 || 'kupe')}</div></div></div></div>`,

    // Foto med ett litet vykort i hörnet ("Just nu").
    postcard: c => `<div class="hx"><div class="hx-photo" style="min-height:clamp(400px,50cqi,580px)">${img(c.photo)}<div class="sh" style="background:${SH.top}"></div>
      <div class="hx-in" style="flex:1;justify-content:space-between">
        <div class="stack" style="gap:clamp(12px,1.8cqi,18px)">${eye(c.eyebrow, '#fff')}<p class="hx-t hx-l" style="color:#fff;max-width:13ch">${c.title}</p>${c.cta ? `<div class="hx-acts">${pill(c.cta, 'white')}</div>` : ''}</div>
        <div class="row" style="align-self:flex-end;gap:12px;background:#fff;color:var(--sink);border-radius:18px;padding:10px 16px 10px 10px;max-width:340px;flex-wrap:nowrap">
          <div class="hx-img" style="width:72px;height:72px;min-height:0;border-radius:12px;flex:0 0 auto">${img(c.card.photo)}</div>
          <div class="stack" style="gap:3px;min-width:0">${c.card.tag ? tag(c.card.tag) : ''}<strong style="font-size:15px;line-height:1.25">${c.card.title}</strong><span class="row small" style="gap:4px;color:var(--brand);font-weight:700">${c.card.link} ${svg('<path d="M5 12h14M13 6l6 6-6 6"/>', 2.4, 14)}</span></div></div></div></div></div>`,

    // En biljett som bild bredvid rubriken.
    ticket: c => {
      const t = c.ticket;
      return `<div class="hx"><div class="hx-two" style="align-items:center;gap:clamp(18px,4cqi,48px);padding:clamp(26px,5.5cqi,64px)">
      <div class="stack" style="gap:clamp(12px,1.8cqi,20px)">${eye(c.eyebrow, 'var(--brand)')}<p class="hx-t hx-l" style="max-width:13ch">${c.title}</p>${sub(c.sub, 'var(--smuted)')}<div class="hx-acts">${pill(c.cta || 'Boka resa')}</div></div>
      <div style="display:flex;justify-content:center;padding:10px 0"><div style="position:relative;display:grid;grid-template-columns:1fr auto;background:#fff;border-radius:20px;width:100%;max-width:400px;transform:rotate(-2.5deg)">
        <div class="stack" style="gap:12px;padding:20px 20px 20px 22px;min-width:0">
          <span class="row" style="justify-content:space-between;font-size:13px;font-weight:700;color:var(--brand)"><span>${t.type}</span><span style="color:var(--smuted);font-weight:600">${t.date}</span></span>
          <div class="row" style="justify-content:space-between;flex-wrap:nowrap;gap:8px"><div class="stack" style="gap:0"><span style="font-size:clamp(26px,4cqi,34px);font-weight:800;letter-spacing:-0.02em;font-variant-numeric:tabular-nums">${t.dep}</span><span class="small muted">${t.from}</span></div>
            <span style="flex:1;height:2px;background:repeating-linear-gradient(90deg,var(--sline) 0 6px,transparent 6px 11px);min-width:20px"></span>
            <div class="stack" style="gap:0;text-align:right"><span style="font-size:clamp(26px,4cqi,34px);font-weight:800;letter-spacing:-0.02em;font-variant-numeric:tabular-nums">${t.arr}</span><span class="small muted">${t.to}</span></div></div>
          <span class="small" style="color:var(--smuted)">${t.extra}</span></div>
        <div style="border-left:2px dashed var(--sline);padding:20px 16px;display:flex;align-items:center;justify-content:center;background:var(--accent);border-radius:0 20px 20px 0"><span style="writing-mode:vertical-rl;transform:rotate(180deg);font-weight:800;font-size:14px;letter-spacing:.02em">${t.stub}</span></div>
        <span style="position:absolute;right:52px;top:-9px;width:18px;height:18px;border-radius:50%;background:var(--ground)"></span>
        <span style="position:absolute;right:52px;bottom:-9px;width:18px;height:18px;border-radius:50%;background:var(--ground)"></span>
      </div></div></div></div>`;
    },

    // Ruttlinje med stationer och tider på fotot.
    route: c => `<div class="hx"><div class="hx-photo" style="min-height:clamp(400px,50cqi,580px);justify-content:space-between">${img(c.photo)}<div class="sh" style="background:linear-gradient(180deg,rgba(0,0,0,.5) 0%,rgba(0,0,0,.12) 40%,rgba(0,0,0,.55) 100%)"></div>
      <div class="hx-in">${eye(c.eyebrow, '#fff')}<p class="hx-t hx-l" style="color:#fff;max-width:14ch">${c.title}</p>${sub(c.sub, 'rgba(255,255,255,.95)')}</div>
      <div class="hx-in" style="padding-top:0"><div style="position:relative;display:flex;justify-content:space-between;gap:8px;max-width:720px">
        <span style="position:absolute;left:8px;right:8px;top:7px;height:3px;background:rgba(255,255,255,.85);border-radius:2px"></span>
        ${c.stations.map(([time, name], i) => `<div class="stack" style="gap:6px;position:relative;align-items:${i === 0 ? 'flex-start' : i === c.stations.length - 1 ? 'flex-end' : 'center'};text-align:${i === 0 ? 'left' : i === c.stations.length - 1 ? 'right' : 'center'}"><span style="width:17px;height:17px;border-radius:50%;background:${i === 0 || i === c.stations.length - 1 ? 'var(--accent)' : '#fff'};border:3px solid #fff"></span>${time ? `<span style="font-weight:800;font-size:clamp(18px,2.4cqi,26px);font-variant-numeric:tabular-nums">${time}</span>` : ''}<span class="small" style="font-weight:600;color:rgba(255,255,255,.92)">${name}</span></div>`).join('')}
      </div><div class="hx-acts" style="margin-top:10px">${pill(c.cta || 'Boka resa', 'white')}</div></div></div></div>`,

    // Ett enda sökfält på fotot.
    field: c => `<div class="hx"><div class="hx-photo" style="min-height:clamp(380px,48cqi,560px);justify-content:center">${img(c.photo)}<div class="sh" style="background:${SH.left}"></div>
      <div class="hx-in">${eye(c.eyebrow, '#fff')}<p class="hx-t hx-l" style="color:#fff;max-width:13ch">${c.title}</p>${sub(c.sub, 'rgba(255,255,255,.95)')}<div class="hx-field"><span>${c.placeholder || 'Vart vill du resa?'}</span><span class="hx-round">${SEARCH}</span></div>${c.hint ? `<span class="small" style="color:rgba(255,255,255,.9)">${c.hint}</span>` : ''}</div></div></div>`,

    // Grön färgyta med foto i bågform, som ett tågfönster.
    green: c => `<div class="hx" style="background:var(--brand)"><div class="hx-two" style="align-items:center;gap:clamp(18px,4cqi,48px);padding:clamp(26px,5.5cqi,64px)">
      <div class="stack" style="gap:clamp(12px,1.8cqi,20px)">${eye(c.eyebrow, 'var(--accent)')}<p class="hx-t hx-l" style="color:#F6F1E9;max-width:13ch">${c.title}</p>${sub(c.sub, 'rgba(246,241,233,.9)')}<div class="hx-acts">${pill(c.cta || 'Läs mer', 'havre')}</div></div>
      <div class="hx-img" style="aspect-ratio:4/5;max-height:440px;min-height:240px;border-radius:999px 999px var(--rc) var(--rc);width:100%;max-width:360px;justify-self:center">${img(c.photo)}</div></div></div>`,

    // Tider eller ett pris som jätterubrik, typografin är bilden.
    bigtype: c => `<div class="hx"><div class="hx-two" style="align-items:center;gap:clamp(18px,4cqi,48px);padding:clamp(26px,5.5cqi,64px)">
      <div class="stack" style="gap:clamp(10px,1.6cqi,18px);min-width:0">${eye(c.eyebrow, 'var(--brand)')}
        <p class="hx-t" style="font-size:clamp(42px,6.6cqi,92px);letter-spacing:-0.04em;line-height:.95;color:var(--brand);font-variant-numeric:tabular-nums">${c.big}</p>
        <p style="font-weight:700;font-size:clamp(16px,1.9cqi,21px)">${c.bigSub}</p>${sub(c.sub, 'var(--smuted)')}<div class="hx-acts">${pill(c.cta || 'Boka resa')}</div></div>
      <div class="hx-img hx-hide-s" style="aspect-ratio:4/5;max-height:420px;border-radius:var(--rc)">${img(c.photo)}</div></div></div>`,

    // Genvägar som vita pills på fotot.
    chips: c => `<div class="hx"><div class="hx-photo" style="min-height:clamp(380px,48cqi,560px);justify-content:flex-end">${img(c.photo)}<div class="sh" style="background:${SH.bottom}"></div>
      <div class="hx-in">${eye(c.eyebrow, '#fff')}<p class="hx-t hx-l" style="color:#fff;max-width:14ch">${c.title}</p>${sub(c.sub, 'rgba(255,255,255,.95)')}<div class="hx-acts" style="gap:8px">${c.chips.map(x => `<span class="hx-wchip">${x}</span>`).join('')}</div></div></div></div>`,

    // Rubrik och tre fakta på fotot.
    facts: c => `<div class="hx"><div class="hx-photo" style="min-height:clamp(400px,52cqi,600px);justify-content:flex-end">${img(c.photo)}<div class="sh" style="background:${SH.bottom}"></div>
      <div class="hx-in">${eye(c.eyebrow, '#fff')}<p class="hx-t hx-l" style="color:#fff;max-width:14ch">${c.title}</p>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,150px),1fr));gap:14px;border-top:1px solid rgba(255,255,255,.4);padding-top:16px;margin-top:4px">${c.facts.map(([v, l]) => `<div class="stack" style="gap:2px"><span style="font-weight:800;font-size:clamp(22px,3cqi,34px);letter-spacing:-0.02em;line-height:1.1">${v}</span><span class="small" style="color:rgba(255,255,255,.9)">${l}</span></div>`).join('')}</div>
        ${c.cta ? `<div class="hx-acts">${pill(c.cta, 'white')}</div>` : ''}</div></div></div>`,

    // Panoramafoto med en nyhetsrad under.
    announce: c => `<div class="hx"><div class="hx-photo" style="min-height:clamp(320px,40cqi,470px);justify-content:flex-end">${img(c.photo)}<div class="sh" style="background:${SH.bottom}"></div>
      <div class="hx-in">${eye(c.eyebrow, '#fff')}<p class="hx-t hx-l" style="color:#fff;max-width:14ch">${c.title}</p>${c.cta ? `<div class="hx-acts">${pill(c.cta, 'white')}</div>` : ''}</div></div>
      <div class="row" style="gap:12px;padding:14px clamp(22px,5cqi,60px);background:${TINT[c.tint || 'gul']};justify-content:space-between">
        <span class="row" style="gap:10px;min-width:0">${c.news.tag ? tag(c.news.tag, 'background:var(--sink);color:#fff') : ''}<span style="font-weight:600">${c.news.text}</span></span><span class="row" style="gap:6px;color:var(--brand);font-weight:700">${c.news.link} ${ARROW}</span></div></div>`,

    // Foto i en ram som ett tågfönster, text bredvid.
    window: c => `<div class="hx"><div class="hx-two" style="align-items:center;gap:clamp(18px,4cqi,48px);padding:clamp(26px,5.5cqi,64px)">
      <div class="stack" style="gap:clamp(12px,1.8cqi,20px)">${eye(c.eyebrow, 'var(--brand)')}<p class="hx-t hx-l" style="max-width:12ch">${c.title}</p>${sub(c.sub, 'var(--smuted)')}<div class="hx-acts">${pill(c.cta || 'Se resorna')}${c.cta2 ? ghost(c.cta2) : ''}</div></div>
      <div style="background:#2E2A25;border-radius:clamp(36px,6cqi,64px);padding:clamp(10px,1.6cqi,16px);box-shadow:inset 0 0 0 3px #4a443d"><div class="hx-frame" style="position:relative;aspect-ratio:4/3;border-radius:clamp(28px,5cqi,52px);overflow:hidden">${img(c.photo)}<span style="position:absolute;inset:0;background:linear-gradient(115deg,rgba(255,255,255,.18) 0%,rgba(255,255,255,0) 35%)"></span></div></div></div></div>`,

    // Foto med en smal sökrad direkt under (enda formulärliknande varianten).
    quickbar: c => `<div class="hx"><div class="hx-photo" style="min-height:clamp(300px,38cqi,440px);justify-content:flex-end">${img(c.photo)}<div class="sh" style="background:${SH.bottom}"></div>
      <div class="hx-in" style="padding-bottom:clamp(44px,7cqi,80px)"><p class="hx-t hx-l" style="color:#fff;max-width:14ch">${c.title}</p>${sub(c.sub, 'rgba(255,255,255,.95)')}</div></div>
      <div style="padding:0 clamp(22px,5cqi,60px) clamp(20px,3cqi,32px);margin-top:-34px;position:relative"><div class="row" style="background:#fff;border-radius:999px;padding:6px 6px 6px 22px;gap:10px;flex-wrap:nowrap;max-width:720px">
        <span class="stack" style="gap:0;flex:1;min-width:0"><span class="small muted" style="font-weight:600">Från</span><span style="font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">Malmö C</span></span>
        <span style="width:1px;align-self:stretch;background:var(--sline)"></span>
        <span class="stack" style="gap:0;flex:1;min-width:0"><span class="small muted" style="font-weight:600">Till</span><span style="color:var(--smuted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">Välj station</span></span>
        ${pill('Sök', 'brand', false)}</div></div></div>`,
  };
  const phone = h => `<div class="hx-phone">${h}</div>`;

  // ===== Innehåll =====
  const C = {
    vardag: { photo: 'fjall', title: 'Vart vill du resa?', sub: 'Dagtåg och nattåg till Stockholm, Berlin, Köpenhamn och fjällen.' },
    semester: { photo: 'kopenhamn', title: 'Semestern börjar på tåget.', sub: 'Packa, kliv på och luta dig tillbaka. Till Berlin, Köpenhamn eller fjällen.' },
    vinter: { photo: 'ovan', eyebrow: 'Vinter 2026–2027', title: 'Vakna i fjällen.', sub: 'Fjälltågen går 16 dec – 25 apr. Transferbussen bokar du med biljetten.' },
    nattag: { photo: 'kupe', eyebrow: 'Nattåg', title: 'Somna i Stockholm. Vakna i Berlin.', sub: 'Egen kupé för två från 1 499 kr. Frukost till klockan 11.' },
    berlin: { photo: 'berlin', eyebrow: 'Berlin', title: 'Berlin, utan att flyga.', sub: 'Nattåg från Malmö från 399 kr. Framme 07.51 mitt i stan.' },
  };
  const BERLIN_ROUTE = [['16.25', 'Stockholm C'], ['', 'Malmö C'], ['', 'Hamburg'], ['07.51', 'Berlin Hbf']];
  const T_BERLIN = { type: 'Nattåg · Egen kupé', date: 'fre 5 dec', dep: '16.25', from: 'Stockholm C', arr: '07.51', to: 'Berlin Hbf', extra: 'Vagn 4 · Kupé 23 · Frukost ingår', stub: 'GOD NATT' };
  const T_FJALL = { type: 'Nattåg · Bäddplats', date: 'fre 19 dec', dep: '16.35', from: 'Malmö C', arr: '08.55', to: 'Storlien', extra: 'Vagn 6 · Plats 41 · Skidor i bagagevagnen', stub: 'VINTER' };
  const cardFjall = { photo: 'fjall', tag: 'Just nu', title: 'Fjälltågen går 16 dec – 25 apr', link: 'Se vinterresor' };
  const cardBerlin = { photo: 'berlin', tag: 'Specialpris', title: 'Nattåg till Berlin fr. 399 kr', link: 'Boka nattåg' };

  const Q = (id, q, opts, layout = 'stack') => ({ id, q, layout, opts });
  const groups = [];
  const G = (key, title, questions) => groups.push({ key, title, questions });

  // ===== Startsidan =====
  G('hero-start', 'Startsidan', [
    Q('h2-start-vardag', 'Vilken hero för startsidan en vanlig dag?', [
      { l: 'Foto och sökknapp (som SJ)', h: T.pillsearch(C.vardag) },
      { l: 'Stor rubrik på foto', h: T.editorial({ ...C.semester, photo: 'fjall', cta: 'Sök resa', link: 'Se alla resmål' }) },
      { l: 'Sökfält på fotot', h: T.field({ ...C.vardag, photo: 'kopenhamn', hint: 'Populärt nu: Malmö – Stockholm, Stockholm – Berlin' }) },
      { l: 'Foto med smal sökrad', h: T.quickbar({ ...C.vardag, photo: 'stockholm' }) },
    ]),
    Q('h2-start-semester', 'Vilken hero säger "semestern börjar här" bäst?', [
      { l: 'Stor rubrik på foto', h: T.editorial({ ...C.semester, link: 'Se alla resmål' }) },
      { l: 'Rubrik på havre, foto under', h: T.havretop({ ...C.semester, eyebrow: 'Sommar 2027', cta: 'Hitta din resa', cta2: 'Nattåg' }) },
      { l: 'Kollage', h: T.collage({ ...C.semester, photo2: 'fjall', photo3: 'berlin' }) },
      { l: 'Foto i tågfönster', h: T.window({ ...C.semester, title: 'Semestern börjar vid fönstret.', cta2: 'Se resmål' }) },
    ]),
    Q('h2-start-vinter', 'Vilken hero för startsidan på vintern?', [
      { l: 'Stor rubrik på foto', h: T.editorial({ ...C.vinter, cta: 'Se vinterresor' }) },
      { l: 'Delad: färgyta och foto', h: T.split({ ...C.vinter, tag: 'Fjälltågen är tillbaka', cta: 'Se vinterresor' }) },
      { l: 'Foto med vykort', h: T.postcard({ photo: 'skidor', eyebrow: 'Vinter', title: 'Ta tåget till skidbacken.', cta: 'Sök resa', card: { photo: 'fjall', tag: 'Ny säsong', title: 'Jämtland 16 dec – 25 apr', link: 'Se avgångar' } }) },
      { l: 'Biljett som bild', h: T.ticket({ ...C.vinter, title: 'Bädda i Skåne. Vakna i fjällen.', ticket: T_FJALL, cta: 'Se vinterresor' }) },
    ]),
    Q('h2-start-nattag', 'Om startsidan ska lyfta nattåget: vilken hero?', [
      { l: 'Ruttlinje på fotot', h: T.route({ ...C.nattag, photo: 'berlin', stations: BERLIN_ROUTE, cta: 'Boka nattåg' }) },
      { l: 'Tider som rubrik', h: T.bigtype({ eyebrow: 'Nattåg till Berlin', big: '16.25 → 07.51', bigSub: 'Stockholm C → Berlin Hbf', sub: 'Du sparar en hotellnatt och kommer fram mitt i stan.', photo: 'kupe', cta: 'Boka nattåg' }) },
      { l: 'Grön yta, foto i båge', h: T.green({ ...C.nattag, cta: 'Se kupéerna' }) },
      { l: 'Biljett som bild', h: T.ticket({ ...C.nattag, ticket: T_BERLIN, cta: 'Boka nattåg' }) },
    ]),
    Q('h2-start-tva', 'Startsidan har ett huvudbudskap och en nyhet. Hur?', [
      { l: 'Nyhetsrad under fotot', h: T.announce({ photo: 'fjall', title: 'Vart vill du resa?', cta: 'Sök resa', news: { tag: 'Nyhet', text: 'Fjälltågen går 16 dec – 25 apr.', link: 'Se avgångar' } }) },
      { l: 'Vykort i hörnet', h: T.postcard({ photo: 'stockholm', title: 'Vart vill du resa?', cta: 'Sök resa', card: cardFjall }) },
      { l: 'Två delade block efter varandra', h: T.pillsearch(C.vardag) + T.split({ ...C.vinter, tag: 'Fjälltågen är tillbaka', cta: 'Se vinterresor', tint: 'rosa' }) },
    ]),
    Q('h2-start-genvagar', 'Hur ska startsidan visa vart man kan åka?', [
      { l: 'Genvägar på fotot', h: T.chips({ photo: 'kopenhamn', title: 'Vart är du på väg?', sub: 'Välj en resa eller sök fritt.', chips: ['Nattåg till Berlin', 'Fjällen', 'Köpenhamn', 'Stockholm'] }) },
      { l: 'Kollage', h: T.collage({ eyebrow: 'Resmål', title: 'Fyra städer och fjällen.', sub: 'Dagtåg och nattåg, året runt.', photo: 'kopenhamn', photo2: 'fjall', photo3: 'berlin', cta: 'Se alla resmål' }) },
      { l: 'Foto och sökknapp', h: T.pillsearch({ photo: 'kopenhamn', title: 'Vart är du på väg?', cta: 'Sök resa' }) },
    ]),
    Q('h2-start-storstad', 'Vilken hero för storstadsresor?', [
      { l: 'Stor rubrik på foto', h: T.editorial({ photo: 'kopenhamn', eyebrow: 'Storstad', title: 'Storstad utan flyg.', sub: 'Köpenhamn, Berlin och Stockholm, mitt i stan.', cta: 'Se städerna' }) },
      { l: 'Kollage', h: T.collage({ eyebrow: 'Storstad', title: 'Storstad utan flyg.', sub: 'Kliv av mitt i stan, utan transfer.', photo: 'berlin', photo2: 'kopenhamn', photo3: 'stockholm' }) },
      { l: 'Ruttlinje på fotot', h: T.route({ photo: 'kopenhamn', eyebrow: 'Storstad', title: 'Tre städer på en linje.', stations: [['', 'Stockholm'], ['', 'Köpenhamn'], ['', 'Berlin']], cta: 'Se resorna' }) },
      { l: 'Sökfält på fotot', h: T.field({ photo: 'stockholm', title: 'Vilken stad blir det?', placeholder: 'Sök stad eller station' }) },
    ]),
    Q('h2-start-lugn', 'Vilken hero känns lugnast?', [
      { l: 'Foto i tågfönster', h: T.window({ photo: 'fjall', title: 'Utsikten ingår.', sub: 'Res genom Sverige med tid att titta ut.', cta: 'Sök resa' }) },
      { l: 'Rubrik på havre, foto under', h: T.havretop({ photo: 'fjall', title: 'Res i lugn och ro.', sub: 'Inga köer, ingen säkerhetskontroll. Bara du och utsikten.', cta: 'Sök resa' }) },
      { l: 'Foto och sökknapp', h: T.pillsearch({ photo: 'fjall', title: 'Res i lugn och ro.' }) },
    ]),
  ]);

  // ===== Undersidor =====
  G('hero-sidor', 'Undersidor', [
    Q('h2-sida-nattag', 'Hero för sidan om nattåget?', [
      { l: 'Grön yta, foto i båge', h: T.green({ ...C.nattag, title: 'Sov dig fram.', cta: 'Se kupéerna' }) },
      { l: 'Foto i tågfönster', h: T.window({ ...C.nattag, title: 'Sov dig fram.', cta: 'Boka nattåg', cta2: 'Se kupéerna' }) },
      { l: 'Rubrik och fakta på foto', h: T.facts({ photo: 'kupe', eyebrow: 'Nattåg', title: 'Sov dig fram.', facts: [['1 499 kr', 'egen kupé för två'], ['07.51', 'framme i Berlin'], ['Till kl 11', 'frukost ombord']], cta: 'Boka nattåg' }) },
      { l: 'Stor rubrik på foto', h: T.editorial({ ...C.nattag, title: 'Sov dig fram.', cta: 'Boka nattåg' }) },
    ]),
    Q('h2-sida-krogen', 'Hero för sidan om restaurangvagnen?', [
      { l: 'Delad: färgyta och foto', h: T.split({ photo: 'krogen', tag: 'Restaurangvagnen', title: 'Middag med utsikt.', sub: 'Varma rätter lagade i Skåne. Frukost till klockan 11.', cta: 'Se menyn', tint: 'havre' }) },
      { l: 'Foto i tågfönster', h: T.window({ photo: 'krogen', eyebrow: 'Restaurangvagnen', title: 'Middag med utsikt.', sub: 'Wallenbergare 169 kr. Boka bord när du köper biljetten.', cta: 'Se menyn' }) },
      { l: 'Grön yta, foto i båge', h: T.green({ photo: 'krogen', eyebrow: 'Restaurangvagnen', title: 'Middag med utsikt.', sub: 'Varma rätter lagade i Skåne.', cta: 'Se menyn' }) },
      { l: 'Pris som rubrik', h: T.bigtype({ eyebrow: 'Restaurangvagnen', big: '169 kr', bigSub: 'Wallenbergare med potatismos', sub: 'Varma rätter lagade i Skåne. Frukost till klockan 11.', photo: 'krogen', cta: 'Se hela menyn' }) },
    ]),
    Q('h2-sida-berlin', 'Hero för resmålet Berlin?', [
      { l: 'Stor rubrik på foto', h: T.editorial({ ...C.berlin, cta: 'Boka nattåg' }) },
      { l: 'Ruttlinje på fotot', h: T.route({ ...C.berlin, stations: [['', 'Malmö C'], ['', 'Hamburg'], ['07.51', 'Berlin Hbf']], cta: 'Boka nattåg' }) },
      { l: 'Biljett som bild', h: T.ticket({ ...C.berlin, ticket: T_BERLIN, cta: 'Boka nattåg' }) },
      { l: 'Delad: färgyta och foto', h: T.split({ ...C.berlin, tag: 'fr. 399 kr', cta: 'Boka nattåg', tint: 'gul' }) },
    ]),
    Q('h2-sida-kopenhamn', 'Hero för resmålet Köpenhamn?', [
      { l: 'Foto med vykort', h: T.postcard({ photo: 'kopenhamn', eyebrow: 'Köpenhamn', title: 'Köpenhamn på en dag.', cta: 'Boka resa', card: { photo: 'stockholm', tag: 'fr. 349 kr', title: 'Stockholm – Köpenhamn', link: 'Se avgångar' } }) },
      { l: 'Kollage', h: T.collage({ photo: 'kopenhamn', photo2: 'stockholm', photo3: 'krogen', eyebrow: 'Köpenhamn', title: 'Köpenhamn på en dag.', sub: 'Dagliga avgångar via Malmö, året runt.', cta: 'Boka resa' }) },
      { l: 'Pris som rubrik', h: T.bigtype({ eyebrow: 'Stockholm – Köpenhamn', big: '349 kr', bigSub: 'Dagliga avgångar via Malmö', sub: 'Kliv av mitt i stan och cykla vidare.', photo: 'kopenhamn', cta: 'Boka resa' }) },
      { l: 'Sökfält på fotot', h: T.field({ photo: 'kopenhamn', eyebrow: 'Köpenhamn', title: 'Köpenhamn på en dag.', placeholder: 'Varifrån reser du?' }) },
    ]),
    Q('h2-sida-fjallen', 'Hero för sidan om fjällen?', [
      { l: 'Foto i tågfönster', h: T.window({ photo: 'fjall', eyebrow: 'Fjällen', title: 'Kliv på i Malmö. Kliv av i fjällen.', cta: 'Se avgångar' }) },
      { l: 'Rubrik och fakta på foto', h: T.facts({ photo: 'ovan', eyebrow: 'Fjällen', title: 'Kliv av i fjällen.', facts: [['16 dec – 25 apr', 'vintersäsong'], ['08.55', 'framme i Storlien'], ['Ingår', 'skidor i bagaget']], cta: 'Se avgångar' }) },
      { l: 'Genvägar på fotot', h: T.chips({ photo: 'fjall', eyebrow: 'Fjällen', title: 'Vilket fjäll blir det?', chips: ['Åre', 'Storlien', 'Vemdalen', 'Alperna'] }) },
      { l: 'Stor rubrik på foto', h: T.editorial({ photo: 'ovan', eyebrow: 'Fjällen', title: 'Vakna i fjällen.', cta: 'Se avgångar' }) },
    ]),
    Q('h2-sida-vasaloppet', 'Hero för Vasaloppet 2027?', [
      { l: 'Delad: färgyta och foto', h: T.split({ photo: 'ovan', tag: 'Bokningen är öppen', title: 'Vasaloppet 2027', sub: 'Res till starten och hem igen med tåget.', cta: 'Boka resa', tint: 'gul' }) },
      { l: 'Nyhetsrad under fotot', h: T.announce({ photo: 'ovan', eyebrow: 'Vasaloppet 2027', title: 'Till starten med tåg.', cta: 'Boka resa', news: { tag: 'Öppet', text: 'Bokningen för Vasaloppet 2027 är öppen.', link: 'Läs mer' } }) },
      { l: 'Foto med vykort', h: T.postcard({ photo: 'skidor', eyebrow: 'Vasaloppet 2027', title: 'Till starten med tåg.', cta: 'Boka resa', card: { photo: 'ovan', tag: 'Öppet', title: 'Resa och transfer i en bokning', link: 'Så funkar det' } }) },
    ]),
    Q('h2-sida-alperna', 'Hero för skidresor till Alperna?', [
      { l: 'Ruttlinje på fotot', h: T.route({ photo: 'ovan', eyebrow: 'Alperna', title: 'Nattåg till Alperna.', sub: '18 dec – 14 mars.', stations: [['', 'Malmö C'], ['', 'Hamburg'], ['', 'Österrike']], cta: 'Se resorna' }) },
      { l: 'Biljett som bild', h: T.ticket({ eyebrow: 'Alperna', title: 'Somna i Malmö. Vakna i Alperna.', sub: 'Säsong 18 dec – 14 mars.', ticket: { ...T_FJALL, type: 'Nattåg · Liggplats', date: 'lör 10 jan', to: 'Österrike', arr: '—', extra: 'Skidor i bagagevagnen', stub: 'ALPERNA' }, cta: 'Se resorna' }) },
      { l: 'Stor rubrik på foto', h: T.editorial({ photo: 'skidor', eyebrow: 'Alperna', title: 'Alperna med nattåg.', sub: 'Säsong 18 dec – 14 mars.', cta: 'Se resorna' }) },
    ]),
    Q('h2-sida-rabatt', 'Hero för sidan om rabatter?', [
      { l: 'Delad: färgyta och foto', h: T.split({ photo: 'kopenhamn', tag: 'Upp till 80 %', title: 'Barn reser billigare.', sub: 'Barn under 16 år reser med upp till 80 % rabatt.', cta: 'Se rabatterna', tint: 'rosa' }) },
      { l: 'Procent som rubrik', h: T.bigtype({ eyebrow: 'Rabatter', big: '−80 %', bigSub: 'för barn under 16 år', sub: 'Studenter och pensionärer har också rabatt.', photo: 'kopenhamn', cta: 'Se rabatterna' }) },
      { l: 'Rubrik på havre, foto under', h: T.havretop({ photo: 'kopenhamn', eyebrow: 'Rabatter', title: 'Hela familjen, halva priset.', sub: 'Barn under 16 år reser med upp till 80 % rabatt.', cta: 'Se rabatterna' }) },
    ]),
    Q('h2-sida-presentkort', 'Hero för presentkort?', [
      { l: 'Biljett som bild', h: T.ticket({ eyebrow: 'Presentkort', title: 'Ge bort en resa.', sub: 'Välj belopp. Mottagaren väljer resmål.', ticket: { type: 'Presentkort', date: 'Giltigt 2 år', dep: '500', from: 'kronor', arr: '∞', to: 'resmål', extra: 'Till: någon som behöver komma bort', stub: 'GÅVA' }, cta: 'Köp presentkort' }) },
      { l: 'Grön yta, foto i båge', h: T.green({ photo: 'fjall', eyebrow: 'Presentkort', title: 'Ge bort en resa.', sub: 'Välj belopp. Mottagaren väljer resmål.', cta: 'Köp presentkort' }) },
      { l: 'Foto i tågfönster', h: T.window({ photo: 'kupe', eyebrow: 'Presentkort', title: 'Ge bort en utsikt.', sub: 'Välj belopp. Mottagaren väljer resmål.', cta: 'Köp presentkort' }) },
    ]),
    Q('h2-sida-hallbarhet', 'Hero för sidan om hållbarhet?', [
      { l: 'Rubrik och fakta på foto', h: T.facts({ photo: 'fjall', eyebrow: 'Hållbarhet', title: 'Det enkla klimatvalet.', facts: [['Fossilfri el', 'driver tåget'], ['Mitt i stan', 'från start till mål'], ['Ingen kö', 'till säkerhetskontroll']] }) },
      { l: 'Stor rubrik på foto', h: T.editorial({ photo: 'fjall', eyebrow: 'Hållbarhet', title: 'Det enkla klimatvalet.', cta: 'Läs mer' }) },
      { l: 'Grön yta, foto i båge', h: T.green({ photo: 'fjall', eyebrow: 'Hållbarhet', title: 'Det enkla klimatvalet.', sub: 'Tåget drivs med fossilfri el.', cta: 'Läs mer' }) },
      { l: 'Kollage', h: T.collage({ photo: 'fjall', photo2: 'ovan', photo3: 'kopenhamn', eyebrow: 'Hållbarhet', title: 'Det enkla klimatvalet.', sub: 'Tåget drivs med fossilfri el.', cta: 'Läs mer' }) },
    ]),
    Q('h2-sida-hjalp', 'Hero för kundservice?', [
      { l: 'Sökfält på fotot', h: T.field({ photo: 'stockholm', title: 'Hur kan vi hjälpa dig?', placeholder: 'Sök bland frågor och svar', hint: 'Vanligast: ombokning, bagage, försening' }) },
      { l: 'Genvägar på fotot', h: T.chips({ photo: 'stockholm', title: 'Hur kan vi hjälpa dig?', chips: ['Boka om', 'Försenat tåg', 'Bagage och cykel', 'Kontakta oss'] }) },
      { l: 'Rubrik på havre, foto under', h: T.havretop({ photo: 'stockholm', title: 'Hur kan vi hjälpa dig?', sub: 'De flesta svar finns här. Annars når du oss dygnet runt.', cta: 'Sök hjälp', cta2: 'Kontakta oss' }) },
    ]),
    Q('h2-sida-trafik', 'Hero för trafikinformation?', [
      { l: 'Sökfält på fotot', h: T.field({ photo: 'stockholm', title: 'Så går tågen just nu.', placeholder: 'Sök tågnummer eller station' }) },
      { l: 'Nyhetsrad under fotot', h: T.announce({ photo: 'stockholm', title: 'Så går tågen just nu.', news: { tag: '5 dec', text: 'Tåg 3943 går via västkusten på grund av banarbete.', link: 'Läs mer' } }) },
      { l: 'Delad: färgyta och foto', h: T.split({ photo: 'stockholm', tag: '1 störning', title: 'Så går tågen just nu.', sub: 'Tåg 3943 går via västkusten den 5 december.', cta: 'Se alla avgångar', tint: 'gul', center: false }) },
    ]),
    Q('h2-sida-grupp', 'Hero för gruppresor?', [
      { l: 'Delad: färgyta och foto', h: T.split({ photo: 'kupe', tag: 'Grupp', title: 'Hela kupén för er.', sub: 'Egen kupé för upp till sex personer.', cta: 'Begär pris', tint: 'gron', flip: true }) },
      { l: 'Foto i tågfönster', h: T.window({ photo: 'kopenhamn', eyebrow: 'Grupp', title: 'Res tillsammans.', sub: 'Klassresa, föreningen eller hela släkten.', cta: 'Begär pris' }) },
      { l: 'Kollage', h: T.collage({ photo: 'kupe', photo2: 'krogen', photo3: 'kopenhamn', eyebrow: 'Grupp', title: 'Res tillsammans.', sub: 'Egen kupé för upp till sex.', cta: 'Begär pris' }) },
    ]),
    Q('h2-sida-app', 'Hero för appen?', [
      { l: 'Grön yta, foto i båge', h: T.green({ photo: 'kopenhamn', eyebrow: 'Appen', title: 'Biljetten i fickan.', sub: 'Sms och notis om tåget blir försenat.', cta: 'Ladda ner appen' }) },
      { l: 'Rubrik på havre, foto under', h: T.havretop({ photo: 'kopenhamn', eyebrow: 'Appen', title: 'Biljetten i fickan.', sub: 'Sms och notis om tåget blir försenat.', cta: 'Ladda ner appen' }) },
      { l: 'Delad: färgyta och foto', h: T.split({ photo: 'kopenhamn', tag: 'Ny version', title: 'Biljetten i fickan.', sub: 'Sms och notis om tåget blir försenat.', cta: 'Ladda ner appen', tint: 'gron' }) },
    ]),
  ]);

  // ===== Kampanj och säsong =====
  G('hero-kampanj', 'Kampanj och säsong', [
    Q('h2-kamp-specialpris', 'Hero för ett specialpris (Berlin 399 kr, 2 nov – 17 dec)?', [
      { l: 'Delad: färgyta och foto', h: T.split({ photo: 'berlin', tag: 'Specialpris', title: 'Berlin för 399 kr.', sub: 'Sittplats Malmö – Berlin. Gäller 2 nov – 17 dec.', cta: 'Boka nu', tint: 'gul' }) },
      { l: 'Pris som rubrik', h: T.bigtype({ eyebrow: 'Specialpris till Berlin', big: '399 kr', bigSub: 'Malmö – Berlin, sittplats', sub: 'Gäller 2 nov – 17 dec.', photo: 'berlin', cta: 'Boka nu' }) },
      { l: 'Biljett som bild', h: T.ticket({ eyebrow: 'Specialpris', title: 'Berlin för 399 kr.', sub: 'Gäller 2 nov – 17 dec.', ticket: { ...T_BERLIN, type: 'Nattåg · Sittplats', from: 'Malmö C', dep: '22.10', stub: '399 KR' }, cta: 'Boka nu' }) },
      { l: 'Stor rubrik på foto', h: T.editorial({ photo: 'berlin', eyebrow: 'Specialpris 2 nov – 17 dec', title: 'Berlin för 399 kr.', cta: 'Boka nu' }) },
    ]),
    Q('h2-kamp-ny-stracka', 'Hero för en ny sträcka (Stockholm – Hamburg)?', [
      { l: 'Ruttlinje på fotot', h: T.route({ photo: 'stockholm', eyebrow: 'Ny sträcka', title: 'Nu går tåget till Hamburg.', stations: [['', 'Stockholm C'], ['', 'Malmö C'], ['', 'Köpenhamn'], ['', 'Hamburg']], cta: 'Se avgångar' }) },
      { l: 'Delad: färgyta och foto', h: T.split({ photo: 'stockholm', tag: 'Ny sträcka', title: 'Nu går tåget till Hamburg.', sub: 'Direkt från Stockholm, varje dag.', cta: 'Se avgångar', tint: 'gron' }) },
      { l: 'Nyhetsrad under fotot', h: T.announce({ photo: 'stockholm', title: 'Vart vill du resa?', cta: 'Sök resa', news: { tag: 'Ny sträcka', text: 'Nu går tåget hela vägen till Hamburg.', link: 'Se avgångar' }, tint: 'gron' }) },
      { l: 'Biljett som bild', h: T.ticket({ eyebrow: 'Ny sträcka', title: 'Nu går tåget till Hamburg.', sub: 'Direkt från Stockholm, varje dag.', ticket: { ...T_BERLIN, type: 'Dagtåg · Sittplats', to: 'Hamburg', arr: '—', extra: 'Ny sträcka', stub: 'HAMBURG' }, cta: 'Se avgångar' }) },
    ]),
    Q('h2-kamp-jul', 'Hero för julresor?', [
      { l: 'Stor rubrik på foto', h: T.editorial({ photo: 'skidor', eyebrow: 'Jul', title: 'Hem till jul.', sub: 'Boka tidigt, det blir fullt.', cta: 'Sök resa' }) },
      { l: 'Foto med vykort', h: T.postcard({ photo: 'stockholm', eyebrow: 'Jul', title: 'Hem till jul.', cta: 'Sök resa', card: { photo: 'krogen', tag: 'Ombord', title: 'Julmeny i restaurangvagnen', link: 'Se menyn' } }) },
      { l: 'Foto i tågfönster', h: T.window({ photo: 'skidor', eyebrow: 'Jul', title: 'Hem till jul.', sub: 'Boka tidigt, det blir fullt.', cta: 'Sök resa' }) },
    ]),
    Q('h2-kamp-sportlov', 'Hero för sportlovet?', [
      { l: 'Genvägar på fotot', h: T.chips({ photo: 'ovan', eyebrow: 'Sportlov', title: 'Sportlovet börjar i sovvagnen.', chips: ['Vecka 7', 'Vecka 8', 'Vecka 9', 'Vecka 10'] }) },
      { l: 'Rubrik och fakta på foto', h: T.facts({ photo: 'ovan', eyebrow: 'Sportlov', title: 'Sportlovet börjar i sovvagnen.', facts: [['−80 %', 'för barn under 16'], ['08.55', 'framme i Storlien'], ['Ingår', 'skidor i bagaget']], cta: 'Se avgångar' }) },
      { l: 'Delad: färgyta och foto', h: T.split({ photo: 'ovan', tag: 'Sportlov', title: 'Sportlovet börjar i sovvagnen.', sub: 'Barn reser med upp till 80 % rabatt.', cta: 'Se avgångar', tint: 'rosa' }) },
    ]),
    Q('h2-kamp-sommar', 'Hero för sommarresor?', [
      { l: 'Kollage', h: T.collage({ photo: 'kopenhamn', photo2: 'stockholm', photo3: 'fjall', eyebrow: 'Sommar', title: 'Sommaren på räls.', sub: 'Städer, skärgård och fjäll.', cta: 'Se resorna' }) },
      { l: 'Rubrik på havre, foto under', h: T.havretop({ photo: 'stockholm', eyebrow: 'Sommar', title: 'Sommaren på räls.', sub: 'Städer, skärgård och fjäll.', cta: 'Se resorna' }) },
      { l: 'Sökfält på fotot', h: T.field({ photo: 'kopenhamn', eyebrow: 'Sommar', title: 'Sommaren på räls.', placeholder: 'Vart vill du i sommar?' }) },
      { l: 'Foto med vykort', h: T.postcard({ photo: 'kopenhamn', eyebrow: 'Sommar', title: 'Sommaren på räls.', cta: 'Se resorna', card: { photo: 'fjall', tag: 'Tips', title: 'Fjällvandring med nattåg', link: 'Läs mer' } }) },
    ]),
    Q('h2-kamp-tidtabell', 'Hero för en ny tidtabell (14 december)?', [
      { l: 'Datum som rubrik', h: T.bigtype({ eyebrow: 'Ny tidtabell', big: '14 dec', bigSub: 'Nya tider på flera sträckor', sub: 'Kolla din resa innan du åker.', photo: 'stockholm', cta: 'Se nya tider' }) },
      { l: 'Nyhetsrad under fotot', h: T.announce({ photo: 'stockholm', title: 'Nya tider från 14 december.', cta: 'Se nya tider', news: { tag: 'Viktigt', text: 'Flera avgångar ändras den 14 december.', link: 'Se vilka' } }) },
      { l: 'Delad: färgyta och foto', h: T.split({ photo: 'stockholm', tag: '14 december', title: 'Ny tidtabell.', sub: 'Flera avgångar får nya tider.', cta: 'Se nya tider', tint: 'gul' }) },
    ]),
    Q('h2-kamp-helg', 'Hero för "en helg i Berlin"?', [
      { l: 'Ruttlinje på fotot', h: T.route({ photo: 'berlin', eyebrow: 'Helgresa', title: 'En helg i Berlin.', stations: [['Fre 16.25', 'Stockholm'], ['Lör 07.51', 'Berlin'], ['Sön kväll', 'Hem igen']], cta: 'Boka helgen' }) },
      { l: 'Kollage', h: T.collage({ photo: 'berlin', photo2: 'kupe', photo3: 'krogen', eyebrow: 'Helgresa', title: 'En helg i Berlin.', sub: 'Åk fredag kväll, vakna i Berlin.', cta: 'Boka helgen' }) },
      { l: 'Stor rubrik på foto', h: T.editorial({ photo: 'berlin', eyebrow: 'Helgresa', title: 'En helg i Berlin.', sub: 'Åk fredag kväll, vakna mitt i stan.', cta: 'Boka helgen' }) },
    ]),
    Q('h2-kamp-tidigt', 'Hero för "boka tidigt, res billigare"?', [
      { l: 'Biljett som bild', h: T.ticket({ eyebrow: 'Boka tidigt', title: 'Ju tidigare, desto billigare.', sub: 'Biljetterna släpps 90 dagar före avresa.', ticket: { ...T_BERLIN, stub: 'TIDIGT' }, cta: 'Sök resa' }) },
      { l: 'Rubrik på havre, foto under', h: T.havretop({ photo: 'stockholm', eyebrow: 'Boka tidigt', title: 'Ju tidigare, desto billigare.', sub: 'Biljetterna släpps 90 dagar före avresa.', cta: 'Sök resa' }) },
      { l: 'Foto och sökknapp', h: T.pillsearch({ photo: 'stockholm', eyebrow: 'Boka tidigt', title: 'Ju tidigare, desto billigare.', cta: 'Sök resa' }) },
    ]),
  ]);

  // ===== Stil i heron =====
  G('hero-stil', 'Stil i heron', [
    Q('h2-stil-bokning', 'Hur mycket bokning ska synas i heron på startsidan?', [
      { l: 'Bara en sökknapp', h: T.pillsearch(C.vardag) },
      { l: 'Ett sökfält', h: T.field({ ...C.vardag, photo: 'fjall' }) },
      { l: 'Smal sökrad under fotot', h: T.quickbar({ ...C.vardag }) },
      { l: 'Ingen, bara rubrik och knapp', h: T.editorial({ ...C.semester, photo: 'fjall', cta: 'Hitta din resa' }) },
    ]),
    Q('h2-stil-ton', 'Vilken ton ska rubriken ha?', [
      { l: 'Fråga', h: T.editorial({ photo: 'fjall', title: 'Vart vill du resa?', cta: 'Sök resa' }) },
      { l: 'Påstående', h: T.editorial({ photo: 'fjall', title: 'Semestern börjar på tåget.', cta: 'Sök resa' }) },
      { l: 'Uppmaning', h: T.editorial({ photo: 'fjall', title: 'Kliv på.', cta: 'Sök resa' }) },
      { l: 'Hälsning', h: T.editorial({ photo: 'fjall', title: 'Hej! Vart ska du?', cta: 'Sök resa' }) },
    ]),
    Q('h2-stil-form', 'Vilken form ska fotot ha?', [
      { l: 'Kant till kant', h: T.editorial({ ...C.semester, photo: 'fjall' }) },
      { l: 'Tågfönster', h: T.window({ ...C.semester, photo: 'fjall' }) },
      { l: 'Båge på grön yta', h: T.green({ ...C.semester, photo: 'fjall' }) },
      { l: 'Kollage', h: T.collage({ ...C.semester }) },
    ]),
    Q('h2-stil-textplats', 'Var ska texten stå i förhållande till fotot?', [
      { l: 'På fotot', h: T.editorial({ ...C.vinter }) },
      { l: 'Bredvid fotot', h: T.split({ ...C.vinter, tint: 'havre', center: false, cta: 'Se vinterresor' }) },
      { l: 'Ovanför fotot', h: T.havretop({ ...C.vinter, cta: 'Se vinterresor' }) },
    ]),
    Q('h2-stil-centrering', 'Centrerat som SJ, eller vänsterställt?', [
      { l: 'Centrerat', h: T.pillsearch(C.vardag) },
      { l: 'Vänsterställt', h: T.field(C.vardag) },
    ]),
    Q('h2-stil-nyhet', 'Hur ska en liten nyhet synas i heron?', [
      { l: 'Rad under fotot', h: T.announce({ photo: 'fjall', title: 'Vart vill du resa?', cta: 'Sök resa', news: { tag: 'Nyhet', text: 'Fjälltågen går 16 dec – 25 apr.', link: 'Se avgångar' } }) },
      { l: 'Vykort på fotot', h: T.postcard({ photo: 'fjall', title: 'Vart vill du resa?', cta: 'Sök resa', card: cardFjall }) },
      { l: 'Etikett ovanför rubriken', h: T.editorial({ photo: 'fjall', eyebrow: '<span class="tag">Nyhet: fjälltågen går 16 dec – 25 apr</span>', title: 'Vart vill du resa?', cta: 'Sök resa' }) },
      { l: 'Ingen nyhet i heron', h: T.editorial({ photo: 'fjall', title: 'Vart vill du resa?', cta: 'Sök resa' }) },
    ]),
    Q('h2-stil-ytfarg', 'Vilken färg ska textytan ha i delade block?', [
      { l: 'Ljusgrön', h: T.split({ ...C.vinter, tag: 'Fjälltågen är tillbaka', cta: 'Se vinterresor', tint: 'gron' }) },
      { l: 'Havre', h: T.split({ ...C.vinter, tag: 'Fjälltågen är tillbaka', cta: 'Se vinterresor', tint: 'havre' }) },
      { l: 'Ljusgul', h: T.split({ ...C.vinter, tag: 'Fjälltågen är tillbaka', cta: 'Se vinterresor', tint: 'gul' }) },
      { l: 'Ljusrosa (som SJ)', h: T.split({ ...C.vinter, tag: 'Fjälltågen är tillbaka', cta: 'Se vinterresor', tint: 'rosa' }) },
    ]),
    Q('h2-stil-grafik', 'Vilka grafiska element passar i heron?', [
      { l: 'Ruttlinje', h: T.route({ ...C.nattag, photo: 'berlin', stations: BERLIN_ROUTE }) },
      { l: 'Biljett', h: T.ticket({ ...C.nattag, ticket: T_BERLIN }) },
      { l: 'Tider som rubrik', h: T.bigtype({ eyebrow: 'Nattåg', big: '16.25 → 07.51', bigSub: 'Stockholm C → Berlin Hbf', photo: 'kupe' }) },
      { l: 'Inga, bara foto och text', h: T.editorial({ ...C.nattag, photo: 'berlin', size: 'hx-l', max: '14ch' }) },
    ]),
    Q('h2-stil-storlek', 'Hur stor ska rubriken vara när den står ensam på fotot?', [
      { l: 'Medel', h: T.editorial({ ...C.semester, photo: 'fjall', size: 'hx-m', max: '18ch' }) },
      { l: 'Stor', h: T.editorial({ ...C.semester, photo: 'fjall', size: 'hx-l', max: '14ch' }) },
      { l: 'Mycket stor', h: T.editorial({ ...C.semester, photo: 'fjall', size: 'hx-xl', max: '12ch' }) },
    ]),
    Q('h2-stil-mobil', 'Vilken hero fungerar bäst på mobilen?', [
      { l: 'Foto och sökknapp', h: phone(T.pillsearch(C.vardag)) },
      { l: 'Stor rubrik på foto', h: phone(T.editorial({ ...C.semester, photo: 'fjall' })) },
      { l: 'Delad: foto och färgyta', h: phone(T.split({ ...C.vinter, tag: 'Fjälltågen är tillbaka', cta: 'Se vinterresor', flip: true })) },
      { l: 'Foto i tågfönster', h: phone(T.window({ ...C.semester, photo: 'fjall', title: 'Utsikten ingår.' })) },
    ], 'grid'),
  ]);

  window.QUIZ_DATA.push({ part: 'hero', groups });
})();
