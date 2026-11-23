window.QUIZ_DATA = window.QUIZ_DATA || [];
(function () {
  // ---------- Byggstenar ----------
  const svg = (d, sw = 2.2, s = 18) => `<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="width:${s}px;height:${s}px">${d}</svg>`;
  const ARROW = svg('<path d="M5 12h14M13 6l6 6-6 6"/>');
  const CHECK = svg('<path d="M5 12.5l4.5 4.5L19 7.5"/>', 2.4, 15);
  const WARN = svg('<path d="M12 3.5L21.5 20h-19L12 3.5zM12 10v4.5M12 17.5v.01"/>', 2, 18);
  const MENU = svg('<path d="M4 7h16M4 12h16M4 17h16"/>', 2.2, 20);
  const PHOTO = {
    skidor: ['img/vinter-skidor.jpg', 'Skidåkare vid en lift en vinterkväll', 'center 40%'],
    ovan: ['img/skidor-ovanifran.jpg', 'Två skidåkare i en ljus backe sedda ovanifrån', 'center'],
    fjall: ['img/fjallen.jpg', 'Snötäckt fjäll under blå himmel', 'center 60%'],
    stockholm: ['img/stockholm.jpg', 'Gamla stan i Stockholm sedd från vattnet', 'center'],
    kopenhamn: ['img/kopenhamn.jpg', 'Nyhavn i Köpenhamn med cyklister', 'center'],
    berlin: ['img/berlin.jpg', 'Brandenburger Tor i kvällsljus', 'center'],
    kupe: ['img/kupe.jpg', 'Två bäddade britsar i en tågkupé', 'center'],
  };
  const fld = (l, v, ph) => `<span class="fld"><span class="lbl">${l}</span><span class="inp${ph ? ' ph' : ''}">${v}</span></span>`;
  const F = { fran: fld('Från', 'Malmö C'), till: fld('Till', 'Välj station', true), ut: fld('Utresa', 'fre 5 dec'), hem: fld('Hemresa', 'Lägg till', true), pax: fld('Resenärer', '1 vuxen') };
  const BTNC = { brand: '', yellow: 'background:var(--accent);border-color:var(--accent);color:var(--sink)', dark: 'background:var(--sink);border-color:var(--sink)', white: 'background:#fff;border-color:#fff;color:var(--brand)' };
  const sok = (c = 'brand', extra = '') => `<span class="sb" style="${BTNC[c]};${extra}">Sök resa ${ARROW}</span>`;
  const TRUST = ['Ombokning fram till 24 h före avresa', 'Sms vid försening', 'Barn reser med upp till 80 % rabatt'];
  const trustRows = (color) => `<div class="hq-trust" style="color:${color}">${TRUST.map(t => `<span>${CHECK}${t}</span>`).join('')}</div>`;

  function booking(o = {}) {
    const { layout = 'cell', color = 'light', title = false, tabs = null, btn = color === 'green' ? 'yellow' : 'brand', btnPlace = 'cell', chips = null, trust = false, width = 560, keep = false } = o;
    let body;
    if (layout === 'search') {
      body = `<div class="row" style="flex-wrap:nowrap;gap:8px;background:var(--field);border-radius:999px;padding:5px 5px 5px 18px"><span style="flex:1;min-width:0;color:var(--smuted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">Vart vill du resa?</span>${sok(btn, 'height:44px')}</div>`;
    } else if (layout === 'row') {
      body = `<div class="hq-rowf">${F.fran}${F.till}${F.ut}${F.pax}${sok(btn)}</div>`;
    } else if (layout === 'one') {
      body = `<div class="hq-grid one">${F.fran}${F.till}${F.ut}${F.pax}</div>${sok(btn, 'width:100%')}`;
    } else if (btnPlace === 'cell') {
      body = `<div class="hq-grid${keep ? ' keep' : ''}">${F.fran}${F.till}${F.ut}${F.hem}${F.pax}${sok(btn)}</div>`;
    } else {
      const bs = btnPlace === 'full' ? 'width:100%' : btnPlace === 'right' ? 'align-self:flex-end' : 'align-self:flex-start';
      body = `<div class="hq-grid${keep ? ' keep' : ''}">${F.fran}${F.till}${F.ut}${F.pax}</div>${sok(btn, bs)}`;
    }
    const ttl = title ? `<p class="h h3" style="color:inherit">${title}</p>` : '';
    const tb = tabs ? `<div class="hq-tabs">${tabs.map((t, i) => `<span class="${i === 0 ? 'on' : ''}">${t}</span>`).join('')}</div>` : '';
    const ch = chips ? `<div class="row" style="gap:8px">${chips.map(c => `<span class="chip" style="height:30px;font-size:13px${color === 'green' ? ';background:rgba(255,255,255,.12);border-color:rgba(255,255,255,.3);color:#fff' : ''}">${c}</span>`).join('')}</div>` : '';
    const tr = trust ? `<div class="divider" style="${color !== 'light' ? 'background:rgba(255,255,255,.2)' : ''}"></div>${trustRows(color === 'light' ? 'var(--sink)' : '#fff')}` : '';
    return `<div class="hq-panel ${color === 'light' ? '' : color}" style="max-width:${width === 'full' ? '100%' : width + 'px'}">${ttl}${tb}${body}${ch}${tr}</div>`;
  }

  const OV = {
    bottom: a => `linear-gradient(180deg, rgba(0,0,0,${a * 0.15}) 0%, rgba(0,0,0,${a * 0.35}) 45%, rgba(0,0,0,${a}) 100%)`,
    even: a => `rgba(0,0,0,${a * 0.7})`,
    left: a => `linear-gradient(90deg, rgba(0,0,0,${a}) 0%, rgba(0,0,0,${a * 0.45}) 50%, rgba(0,0,0,0) 85%)`,
    green: a => `linear-gradient(180deg, rgba(18,59,37,${a * 0.35}) 0%, rgba(18,59,37,${a}) 100%)`,
    none: () => 'none',
  };
  const HDR = {
    solid: `<div class="hq-hdr" style="background:var(--box);color:var(--sink)"><span class="wm">Tågbolaget</span><nav><span style="color:var(--brand)">Boka resa</span><span>Min resa</span><span>Trafikinfo</span><span>Hjälp</span></nav></div>`,
    green: `<div class="hq-hdr" style="background:var(--brand);color:#fff"><span class="wm">Tågbolaget</span><nav><span>Boka resa</span><span>Min resa</span><span>Trafikinfo</span><span>Hjälp</span></nav></div>`,
    transparent: `<div class="hq-hdr" style="color:#fff;position:relative;z-index:1"><span class="wm">Tågbolaget</span><nav><span style="text-decoration:underline;text-underline-offset:6px;text-decoration-thickness:2px">Boka resa</span><span>Min resa</span><span>Trafikinfo</span><span>Hjälp</span></nav></div>`,
    mobileSolid: `<div class="hq-hdr" style="background:var(--box);color:var(--sink);flex-wrap:nowrap"><span class="wm" style="font-size:16px">Tågbolaget</span><span class="row" style="gap:6px;font-size:13px">${MENU}Meny</span></div>`,
    mobileTransparent: `<div class="hq-hdr" style="color:#fff;position:relative;z-index:1;flex-wrap:nowrap"><span class="wm" style="font-size:16px">Tågbolaget</span><span class="row" style="gap:6px;font-size:13px">${MENU}Meny</span></div>`,
  };
  const TRAFFIC = (style = 'background:#F7E3A6;color:var(--sink)') => `<div class="row" style="gap:10px;padding:10px clamp(18px,4%,40px);font-size:14px;flex-wrap:nowrap;${style}">${WARN}<span><strong>5 december:</strong> tåg 3943 går via västkusten på grund av banarbete.</span></div>`;

  // Huvudbyggaren. Standard = beställarens senaste val: vinterfotot, mörkläggning nertill, vit rubrik, bokningspanel under rubriken.
  function hero(o = {}) {
    const d = Object.assign({
      photo: 'skidor', pos: null, scale: 1, h: 470, ov: 'bottom', a: 0.6, vpos: 'end', align: 'left',
      title: 'Vart vill du resa?', size: 46, sub: 'Dagtåg och nattåg till Stockholm, Berlin, Köpenhamn och fjällen.', eyebrow: '', titleColor: '#fff', titleMax: '16ch',
      book: booking(), place: 'in', header: 'solid', traffic: 'top', extra: '', after: '', inset: false, shadow: false, mobile: false,
    }, o);
    const [src, alt, defPos] = PHOTO[d.photo];
    const center = d.align === 'center';
    const jc = { end: 'flex-end', center: 'center', start: 'flex-start' }[d.vpos];
    const ts = d.shadow ? 'text-shadow:0 2px 16px rgba(0,0,0,.55),0 1px 3px rgba(0,0,0,.45);' : '';
    const head = `${d.eyebrow ? `<span class="hq-eye" style="${ts}">${d.eyebrow}</span>` : ''}<p class="hq-ttl" style="font-size:${d.size}px;color:${d.titleColor};max-width:${d.titleMax};${ts}">${d.title}</p>${d.sub ? `<p class="hq-sub" style="${ts}${center ? 'margin:0 auto' : ''}">${d.sub}</p>` : ''}${d.extra}`;
    let content;
    if (d.place === 'right') {
      content = `<div class="row" style="gap:24px;align-items:flex-end;justify-content:space-between;width:100%"><div class="stack" style="gap:14px;flex:1 1 260px;min-width:0">${head}</div><div style="flex:1 1 300px;min-width:0;max-width:440px">${d.book}</div></div>`;
    } else if (d.place === 'in') {
      content = `<div class="stack" style="gap:14px;${center ? 'align-items:center;text-align:center' : ''}">${head}</div>${d.book ? `<div style="${center ? 'display:flex;justify-content:center' : ''};margin-top:6px">${d.book}</div>` : ''}`;
    } else {
      content = `<div class="stack" style="gap:14px;${center ? 'align-items:center;text-align:center' : ''}">${head}</div>`;
    }
    const isTransparent = d.header === 'transparent' || d.header === 'mobileTransparent';
    const heroEl = `<div class="hq" style="min-height:${d.h}px;${d.inset ? 'border-radius:var(--rc);' : ''}">
      <img class="hq-bg" src="${src}" alt="${alt}" style="object-position:${d.pos || defPos};${d.scale !== 1 ? `transform:scale(${d.scale});` : ''}">
      <div class="hq-ov" style="background:${OV[d.ov](d.a)}"></div>
      ${isTransparent ? HDR[d.header] : ''}
      ${d.traffic === 'in' ? `<div style="position:relative;z-index:1;padding:0 clamp(18px,4%,40px)"><div class="row" style="gap:10px;padding:8px 14px;font-size:13px;background:rgba(255,255,255,.92);color:var(--sink);border-radius:999px;display:inline-flex;flex-wrap:nowrap">${WARN}<span><strong>5 dec:</strong> tåg 3943 går via västkusten.</span></div></div>` : ''}
      <div class="hq-ct" style="justify-content:${jc}">${content}</div>
    </div>`;
    const below = d.place === 'overlap'
      ? `<div style="position:relative;z-index:2;margin-top:-70px;padding:0 clamp(18px,4%,40px) 24px">${d.book}</div>`
      : d.place === 'below' ? `<div style="padding:22px clamp(18px,4%,40px) 26px">${d.book}</div>` : '';
    const top = `${d.traffic === 'top' ? TRAFFIC() : ''}${!isTransparent && HDR[d.header] ? HDR[d.header] : ''}`;
    const inner = `${top}${d.inset ? `<div style="padding:0 clamp(12px,2.5%,24px)">${heroEl}</div>` : heroEl}${below}${d.traffic === 'below' ? TRAFFIC() : ''}${d.after}`;
    return d.mobile ? `<div class="hq-phone">${inner}</div>` : inner;
  }
  // Mobilvarianten: smal telefonram.
  const mob = (o = {}) => hero(Object.assign({ mobile: true, header: 'mobileSolid', traffic: 'none', size: 30, h: 360, titleMax: '100%', sub: 'Dagtåg och nattåg till Stockholm, Berlin och fjällen.', book: booking({ layout: 'one', width: 'full' }) }, o));

  const Q = (id, q, opts, layout = 'stack') => ({ id, q, layout, opts });
  const groups = [];
  const G = (key, title, questions) => groups.push({ key, title, questions });

  // ---------- Foto ----------
  G('hero-foto', 'Foto', [
    Q('h-motiv', 'Vilket motiv ska heron ha?', [
      { l: 'Människor i vintermiljö', h: hero() },
      { l: 'Landskap utan människor', h: hero({ photo: 'fjall' }) },
      { l: 'Stad från vattnet', h: hero({ photo: 'stockholm' }) },
      { l: 'Stadsliv med människor', h: hero({ photo: 'kopenhamn' }) },
    ]),
    Q('h-ljus', 'Hur ljust ska herofotot vara?', [
      { l: 'Ljust, mitt på dagen', h: hero({ photo: 'ovan', a: 0.55 }) },
      { l: 'Medel, skymning', h: hero() },
      { l: 'Mörkt, kväll', h: hero({ photo: 'berlin', a: 0.4 }) },
    ]),
    Q('h-beskarning', 'Hur ska fotot beskäras?', [
      { l: 'Vitt, mycket miljö', h: hero() },
      { l: 'Tätt, närmare motivet', h: hero({ scale: 1.5, pos: '75% 45%' }) },
    ]),
    Q('h-fokus', 'Var i bilden ska motivet ligga?', [
      { l: 'Till höger, text till vänster', h: hero({ pos: '30% 40%' }) },
      { l: 'Mitt bakom texten', h: hero({ pos: '55% 40%' }) },
    ]),
    Q('h-hojd', 'Hur hög ska heron vara på dator?', [
      { l: 'Låg, ca 380 px', h: hero({ h: 380, sub: '', book: booking({ layout: 'row', width: 'full' }) }) },
      { l: 'Medel, ca 470 px', h: hero() },
      { l: 'Hög, ca 600 px', h: hero({ h: 600 }) },
      { l: 'Nästan hela skärmen', h: hero({ h: 720 }) },
    ]),
    Q('h-morklaggning', 'Hur ska fotot mörkläggas så att texten syns?', [
      { l: 'Mörkare nertill', h: hero() },
      { l: 'Jämnt över hela', h: hero({ ov: 'even' }) },
      { l: 'Mörkare från vänster', h: hero({ ov: 'left', a: 0.7 }) },
      { l: 'Ingen, bara textskugga', h: hero({ ov: 'none', shadow: true }) },
    ]),
    Q('h-morkstyrka', 'Hur stark ska mörkläggningen vara?', [
      { l: 'Lätt', h: hero({ a: 0.4 }) },
      { l: 'Medel', h: hero({ a: 0.6 }) },
      { l: 'Stark', h: hero({ a: 0.82 }) },
    ]),
    Q('h-ton', 'Vilken ton ska mörkläggningen ha?', [
      { l: 'Neutral svart', h: hero() },
      { l: 'Grön ton', h: hero({ ov: 'green', a: 0.75 }) },
    ]),
    Q('h-ram', 'Hur ska heron ligga på sidan?', [
      { l: 'Kant till kant', h: hero() },
      { l: 'Rundad, med marginal', h: hero({ inset: true }) },
    ]),
    Q('h-antal-bilder', 'En bild eller flera?', [
      { l: 'En bild', h: hero() },
      { l: 'Bildspel med prickar', h: hero({ extra: `<div class="row" style="gap:6px;margin-top:4px">${[1, 0, 0, 0].map(on => `<span style="width:${on ? 22 : 8}px;height:8px;border-radius:999px;background:${on ? '#fff' : 'rgba(255,255,255,.5)'}"></span>`).join('')}</div>` }) },
      { l: 'Stor bild och två små', h: `${HDR.solid}<div style="display:grid;grid-template-columns:2fr 1fr;gap:8px;padding:8px"><div style="border-radius:var(--rc);overflow:hidden;min-width:0">${hero({ header: 'none', traffic: 'none', h: 440, sub: '', book: booking({ layout: 'one', width: 340 }) })}</div><div style="display:grid;gap:8px;min-width:0"><img src="img/fjallen.jpg" alt="Snötäckt fjäll" style="width:100%;height:100%;object-fit:cover;border-radius:var(--rc);min-height:120px"><img src="img/kopenhamn.jpg" alt="Nyhavn i Köpenhamn" style="width:100%;height:100%;object-fit:cover;border-radius:var(--rc);min-height:120px"></div></div>` },
    ]),
  ]);

  // ---------- Rubrik ----------
  G('hero-rubrik', 'Rubrik', [
    Q('h-rubriktext', 'Vad ska det stå i rubriken?', [
      { l: 'Vart vill du resa?', h: hero() },
      { l: 'Hej! Vart vill du resa?', h: hero({ title: 'Hej! Vart vill du resa?' }) },
      { l: 'Ta tåget till fjällen i vinter', h: hero({ title: 'Ta tåget till fjällen i vinter' }) },
      { l: 'Somna här. Vakna där.', h: hero({ title: 'Somna i Malmö. Vakna i fjällen.' }) },
    ]),
    Q('h-rubrikstorlek', 'Hur stor ska rubriken vara?', [36, 46, 58, 72].map(s => ({ l: `${s} px`, h: hero({ size: s, titleMax: s > 60 ? '12ch' : '16ch' }) }))),
    Q('h-rubrikvikt', 'Hur fet ska rubriken vara?', [700, 800, 900].map(w => ({ l: `Vikt ${w}`, h: hero({ title: `<span style="font-weight:${w}">Vart vill du resa?</span>` }) }))),
    Q('h-placering', 'Var i heron ska rubrik och bokning stå?', [
      { l: 'Nere till vänster', h: hero() },
      { l: 'Mitt till vänster', h: hero({ vpos: 'center' }) },
      { l: 'Uppe till vänster', h: hero({ vpos: 'start' }) },
      { l: 'Centrerat', h: hero({ align: 'center', vpos: 'center', titleMax: '100%' }) },
    ]),
    Q('h-underrubrik', 'Ska rubriken ha en underrubrik?', [
      { l: 'Ja', h: hero() },
      { l: 'Nej', h: hero({ sub: '' }) },
    ]),
    Q('h-underrubriktext', 'Vad ska underrubriken säga?', [
      { l: 'Vart tågen går', h: hero() },
      { l: 'Varför tåg', h: hero({ sub: 'Somna i ena stan och vakna mitt i den andra. Ingen kö, inget flyg.' }) },
      { l: 'Ett pris', h: hero({ sub: 'Dagtåg Malmö – Stockholm från 199 kr. Nattåg till Berlin från 399 kr.' }) },
      { l: 'Säsongen', h: hero({ sub: 'Fjälltågen går 16 dec – 25 apr. Transferbussen bokar du med biljetten.' }) },
    ]),
    Q('h-overrubrik', 'Ska det finnas något ovanför rubriken?', [
      { l: 'Inget', h: hero() },
      { l: 'Liten text', h: hero({ eyebrow: 'Vintersäsong 2026–2027' }) },
      { l: 'Etikett', h: hero({ eyebrow: '<span class="tag">Vinter: fjälltågen är tillbaka</span>' }) },
    ]),
    Q('h-rubrikbredd', 'Hur bred ska rubriken få vara?', [
      { l: 'Smal, två till tre rader', h: hero({ title: 'Ta tåget till fjällen i vinter', titleMax: '11ch' }) },
      { l: 'Bred, en till två rader', h: hero({ title: 'Ta tåget till fjällen i vinter', titleMax: '30ch' }) },
    ]),
    Q('h-rubrikfarg', 'Vilken färg ska rubriken ha?', [
      { l: 'Vit', h: hero() },
      { l: 'Havre', h: hero({ titleColor: '#F6F1E9' }) },
      { l: 'Vit med ett gult ord', h: hero({ title: 'Vart vill <span style="color:var(--accent)">du</span> resa?' }) },
    ]),
  ]);

  // ---------- Bokning ----------
  G('hero-bokning', 'Bokningsrutan', [
    Q('h-bokning-finns', 'Ska bokningen finnas i heron?', [
      { l: 'Ja, i heron', h: hero() },
      { l: 'Bara en knapp i heron', h: hero({ book: `<span class="sb" style="align-self:flex-start">Sök resa ${ARROW}</span>` }) },
      { l: 'Direkt under heron', h: hero({ place: 'below', book: booking({ title: 'Sök resa', width: 'full', layout: 'row' }), h: 400 }) },
    ]),
    Q('h-bokning-placering', 'Var ska bokningsrutan sitta?', [
      { l: 'Under rubriken', h: hero() },
      { l: 'Till höger om rubriken', h: hero({ place: 'right', book: booking({ width: 440 }) }) },
      { l: 'Över fotots nederkant', h: hero({ place: 'overlap', h: 400, book: booking({ width: 'full', layout: 'row', title: 'Sök resa' }) }) },
      { l: 'Under heron', h: hero({ place: 'below', h: 380, book: booking({ width: 'full', layout: 'row', title: 'Sök resa' }) }) },
    ]),
    Q('h-bokning-farg', 'Vilken färg ska bokningsrutan ha?', [
      { l: 'Ljus', h: hero() },
      { l: 'Grön', h: hero({ book: booking({ color: 'green' }) }) },
      { l: 'Mörk, halvgenomskinlig', h: hero({ book: booking({ color: 'dark' }) }) },
    ]),
    Q('h-bokning-bredd', 'Hur bred ska bokningsrutan vara?', [
      { l: 'Smal', h: hero({ book: booking({ width: 400, layout: 'one' }) }) },
      { l: 'Medel', h: hero() },
      { l: 'Full bredd', h: hero({ book: booking({ width: 'full', layout: 'row' }) }) },
    ]),
    Q('h-bokning-layout', 'Hur ska fälten ligga?', [
      { l: 'Två kolumner', h: hero() },
      { l: 'En kolumn', h: hero({ book: booking({ layout: 'one', width: 400 }) }) },
      { l: 'En rad', h: hero({ book: booking({ layout: 'row', width: 'full' }) }) },
      { l: 'Ett stort sökfält', h: hero({ book: booking({ layout: 'search', width: 520, chips: ['Malmö – Stockholm', 'Stockholm – Berlin', 'Malmö – Åre'] }) }) },
    ]),
    Q('h-bokning-rubrik', 'Ska bokningsrutan ha en egen rubrik?', [
      { l: 'Nej', h: hero() },
      { l: 'Ja, "Sök resa"', h: hero({ book: booking({ title: 'Sök resa' }) }) },
      { l: 'Rubriken inne i rutan', h: hero({ title: '', sub: '', size: 0, book: booking({ title: '<span style="font-size:26px;font-weight:800">Vart vill du resa?</span>' }) }) },
    ]),
    Q('h-bokning-flikar', 'Ska bokningsrutan ha flikar överst?', [
      { l: 'Inga flikar', h: hero() },
      { l: 'Tåg / Tåg och hotell / Grupp', h: hero({ book: booking({ tabs: ['Tåg', 'Tåg och hotell', 'Grupp'] }) }) },
      { l: 'Enkel / Tur och retur', h: hero({ book: booking({ tabs: ['Enkel', 'Tur och retur'] }) }) },
    ]),
    Q('h-bokning-knappfarg', 'Vilken färg ska sökknappen ha?', [
      { l: 'Grön', h: hero() },
      { l: 'Gul', h: hero({ book: booking({ btn: 'yellow' }) }) },
      { l: 'Mörk', h: hero({ book: booking({ btn: 'dark' }) }) },
    ]),
    Q('h-bokning-knappplats', 'Var ska sökknappen sitta?', [
      { l: 'Bredvid sista fältet', h: hero() },
      { l: 'Egen rad, full bredd', h: hero({ book: booking({ btnPlace: 'full' }) }) },
      { l: 'Egen rad, till vänster', h: hero({ book: booking({ btnPlace: 'left' }) }) },
      { l: 'Egen rad, till höger', h: hero({ book: booking({ btnPlace: 'right' }) }) },
    ]),
    Q('h-bokning-snabbval', 'Ska det finnas snabbval under fälten?', [
      { l: 'Inga snabbval', h: hero() },
      { l: 'Populära sträckor', h: hero({ book: booking({ chips: ['Malmö – Stockholm', 'Stockholm – Berlin', 'Malmö – Åre'] }) }) },
      { l: 'Senaste sökningar', h: hero({ book: booking({ chips: ['Senast: Malmö – Berlin, 12 dec'] }) }) },
    ]),
    Q('h-tillit', 'Var ska tillitsraderna (ombokning, sms, barnrabatt) stå?', [
      { l: 'I bokningsrutan', h: hero({ book: booking({ trust: true }) }) },
      { l: 'Under rutan, på fotot', h: hero({ book: booking() + `<div style="margin-top:12px">${trustRows('#fff')}</div>` }) },
      { l: 'Inte i heron', h: hero() },
    ]),
    Q('h-bokning-falt', 'Vilka fält ska synas direkt?', [
      { l: 'Från, Till, Utresa, Hemresa, Resenärer', h: hero() },
      { l: 'Från, Till, Utresa, Resenärer', h: hero({ book: booking({ btnPlace: 'right' }) }) },
      { l: 'Bara Från och Till', h: hero({ book: `<div class="hq-panel" style="max-width:560px"><div class="hq-grid">${F.fran}${F.till}</div><span class="sb" style="align-self:flex-start">Sök resa ${ARROW}</span></div>` }) },
    ]),
  ]);

  // ---------- Runt heron ----------
  G('hero-runt', 'Runt heron', [
    Q('h-header', 'Hur ska headern ovanför heron se ut?', [
      { l: 'Ljus, ovanför fotot', h: hero() },
      { l: 'Genomskinlig, på fotot', h: hero({ header: 'transparent' }) },
      { l: 'Grön, ovanför fotot', h: hero({ header: 'green' }) },
    ]),
    Q('h-trafikrad', 'Var ska trafikinformationen stå?', [
      { l: 'Gul rad överst', h: hero() },
      { l: 'Liten ruta på fotot', h: hero({ traffic: 'in' }) },
      { l: 'Rad under heron', h: hero({ traffic: 'below' }) },
    ]),
    Q('h-utan-bokning', 'På undersidor utan bokning (t.ex. Nattåg): vilka knappar i heron?', [
      { l: 'En knapp', h: hero({ photo: 'kupe', title: 'Somna i Stockholm. Vakna i Berlin.', sub: 'Egen kupé för två från 1 499 kr.', book: `<span class="sb" style="align-self:flex-start">Boka nattåg ${ARROW}</span>` }) },
      { l: 'Två knappar', h: hero({ photo: 'kupe', title: 'Somna i Stockholm. Vakna i Berlin.', sub: 'Egen kupé för två från 1 499 kr.', book: `<div class="row"><span class="sb">Boka nattåg ${ARROW}</span><span class="sb2" style="border-color:#fff;color:#fff">Se kupéerna</span></div>` }) },
      { l: 'Knapp och länk', h: hero({ photo: 'kupe', title: 'Somna i Stockholm. Vakna i Berlin.', sub: 'Egen kupé för två från 1 499 kr.', book: `<div class="row" style="gap:20px"><span class="sb">Boka nattåg ${ARROW}</span><span style="color:#fff;font-weight:600;text-decoration:underline;text-underline-offset:4px">Se kupéerna</span></div>` }) },
    ]),
    Q('h-sasong', 'Hur ska säsongen lyftas i heron?', [
      { l: 'Inte alls', h: hero() },
      { l: 'Etikett ovanför rubriken', h: hero({ eyebrow: '<span class="tag">Fjälltågen går 16 dec – 25 apr</span>' }) },
      { l: 'Länkkort i hörnet', h: hero({ place: 'right', book: booking({ width: 440 }), extra: `<div class="row" style="gap:12px;background:rgba(255,255,255,.95);color:var(--sink);border-radius:14px;padding:8px 14px 8px 8px;align-self:flex-start;flex-wrap:nowrap;margin-top:4px"><img src="img/fjallen.jpg" alt="" style="width:46px;height:46px;border-radius:10px;object-fit:cover"><span class="stack" style="gap:0"><strong style="font-size:14px">Fjälltågen är tillbaka</strong><span class="small" style="color:var(--brand);font-weight:600">Se vinterresor →</span></span></div>` }) },
    ]),
    Q('h-pris', 'Ska ett från-pris synas i heron?', [
      { l: 'Nej', h: hero() },
      { l: 'Ja, i underrubriken', h: hero({ sub: 'Dagtåg Malmö – Stockholm från 199 kr.' }) },
      { l: 'Ja, som pratbubbla', h: hero({ extra: `<span style="align-self:flex-start;background:var(--accent);color:var(--sink);border-radius:999px;padding:6px 14px;font-weight:700;font-size:14px">Nattåg till Berlin fr. 399 kr</span>` }) },
    ]),
  ]);

  // ---------- Mobil ----------
  G('hero-mobil', 'Mobil', [
    Q('h-mobil-upplagg', 'Hur ska heron se ut på mobilen?', [
      { l: 'Bokning på fotot', h: mob() },
      { l: 'Foto överst, bokning under', h: mob({ h: 230, place: 'below' }) },
      { l: 'Bokning över fotokanten', h: mob({ h: 260, place: 'overlap' }) },
    ], 'grid'),
    Q('h-mobil-rubrik', 'Hur stor ska rubriken vara på mobilen?', [26, 32, 38].map(s => ({ l: `${s} px`, h: mob({ size: s }) })), 'grid'),
    Q('h-mobil-underrubrik', 'Ska underrubriken synas på mobilen?', [
      { l: 'Ja', h: mob() },
      { l: 'Nej, bara rubrik', h: mob({ sub: '' }) },
    ], 'grid'),
    Q('h-mobil-header', 'Hur ska headern se ut på mobilen?', [
      { l: 'Ljus, ovanför fotot', h: mob() },
      { l: 'Genomskinlig, på fotot', h: mob({ header: 'mobileTransparent' }) },
    ], 'grid'),
  ]);

  window.QUIZ_DATA.push({ part: 'hero', groups });
})();
