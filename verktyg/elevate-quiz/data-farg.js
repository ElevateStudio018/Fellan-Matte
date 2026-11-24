/* Elevate designquiz, del Färg och ytor (farg). */
(function () {
  // ---------- Hjälpfunktioner (delade av alla frågor i delen Färg och ytor) ----------
  const css = s => `<style>${s}</style>`;
  const sv = o => Object.entries(o).filter(([, v]) => v != null).map(([k, v]) => `--${k}:${v}`).join(';');
  const I = {
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
    phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',
    cal: '<rect x="3.5" y="5" width="17" height="15.5" rx="2"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',
    clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
    pin: '<path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.3"/>',
    mail: '<rect x="3" y="5.5" width="18" height="13" rx="2"/><path d="M3.5 7l8.5 6 8.5-6"/>',
    star: '<path d="M12 3.5l2.6 5.3 5.8.8-4.2 4.1 1 5.8L12 16.8l-5.2 2.7 1-5.8-4.2-4.1 5.8-.8z"/>',
    cart: '<path d="M3 4h2.5l2.2 11h10.6l2-8H6.6"/><circle cx="9.5" cy="19.5" r="1.3"/><circle cx="17" cy="19.5" r="1.3"/>',
    user: '<circle cx="12" cy="8.5" r="3.8"/><path d="M4.5 20c1.2-3.8 4-5.5 7.5-5.5s6.3 1.7 7.5 5.5"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5.5M12 7.6v.2"/>',
    alert: '<path d="M12 4l9 16H3z"/><path d="M12 10v4.5M12 17.4v.2"/>',
    x: '<circle cx="12" cy="12" r="9"/><path d="M9 9l6 6M15 9l-6 6"/>',
    ok: '<circle cx="12" cy="12" r="9"/><path d="M8 12.3l2.7 2.7L16 9.5"/>',
    search: '<circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/>',
    heart: '<path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.3a4.3 4.3 0 0 1 7.5 2.5C19.5 15.4 12 20 12 20z"/>',
    tool: '<path d="M14.5 6.5a4 4 0 0 0 5 5L12 19a2.1 2.1 0 0 1-3-3l7.5-7.5"/><path d="M14.5 6.5L17 4l3 3-2.5 2.5"/>',
    home: '<path d="M4 11l8-6.5 8 6.5"/><path d="M6 9.5V20h12V9.5"/><path d="M10 20v-5h4v5"/>',
    bolt: '<path d="M13 3L5 13.5h6L10 21l8-10.5h-6z"/>',
    leaf: '<path d="M5 19c0-8 5-13 14-14 0 9-5 14-13 14"/><path d="M5 19c3-4 6-6.5 9-8"/>',
    cup: '<path d="M5 9h11v5a5 5 0 0 1-5 5h-1a5 5 0 0 1-5-5z"/><path d="M16 10.5h1.5a2.5 2.5 0 0 1 0 5H16M8 3.5v2.5M11.5 3.5v2.5"/>',
    scissors: '<circle cx="6.5" cy="7" r="2.5"/><circle cx="6.5" cy="17" r="2.5"/><path d="M8.6 8.4L20 17M8.6 15.6L20 7"/>',
    tooth: '<path d="M8 4c-2.5 0-4 2-4 4.5 0 3 1.5 4.5 2 7 .4 2.3 1 4.5 2.2 4.5 1.5 0 1.4-4.5 3.8-4.5s2.3 4.5 3.8 4.5c1.2 0 1.8-2.2 2.2-4.5.5-2.5 2-4 2-7C20 6 18.5 4 16 4c-1.8 0-2.6 1-4 1s-2.2-1-4-1z"/>',
    car: '<path d="M4 16v-4l2-5h12l2 5v4"/><path d="M3.5 16h17v2.5h-17zM4.5 12h15"/><circle cx="7.5" cy="14" r=".6"/><circle cx="16.5" cy="14" r=".6"/>',
    bed: '<path d="M3 18V7M3 13h18v5M21 13a3 3 0 0 0-3-3h-7v3"/><circle cx="7" cy="10.5" r="1.6"/>',
    dumbbell: '<path d="M6.5 7v10M17.5 7v10M3.5 9.5v5M20.5 9.5v5M6.5 12h11"/>',
    key: '<circle cx="8" cy="15" r="4"/><path d="M11 12l8-8M16 7l2.5 2.5"/>',
    chart: '<path d="M4 20V4M4 20h16"/><path d="M8 16v-4M12 16V8M16 16v-6"/>',
    spark: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M6 18l2.5-2.5M15.5 8.5L18 6"/>',
    shield: '<path d="M12 3l7 3v5.5c0 4.5-3 8-7 9.5-4-1.5-7-5-7-9.5V6z"/><path d="M9 12l2 2 4-4"/>',
    truck: '<path d="M3 6.5h11v9H3zM14 9.5h4l3 3v3h-7"/><circle cx="7" cy="17.5" r="1.7"/><circle cx="17.5" cy="17.5" r="1.7"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    minus: '<path d="M5 12h14"/>',
    chev: '<path d="M9 6l6 6-6 6"/>',
    down: '<path d="M6 9l6 6 6-6"/>',
    tag: '<path d="M3.5 12.5V4h8.5l8.5 8.5-8 8z"/><circle cx="8" cy="8.5" r="1.3"/>',
    gift: '<rect x="4" y="9" width="16" height="11" rx="1"/><path d="M3 9h18M12 9v11M12 9C10 4 6.5 5 7.5 7.5 8.3 9 12 9 12 9zM12 9c2-5 5.5-4 4.5-1.5C15.7 9 12 9 12 9z"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2.5v2.5M12 19v2.5M2.5 12H5M19 12h2.5M5.3 5.3l1.8 1.8M16.9 16.9l1.8 1.8M5.3 18.7l1.8-1.8M16.9 7.1l1.8-1.8"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>',
    fb: '<path d="M14 8h3V4.5h-3a4 4 0 0 0-4 4V11H7.5v3.5H10V21h3.5v-6.5h3l.5-3.5h-3.5V8.5A.5.5 0 0 1 14 8z"/>',
    ig: '<rect x="4" y="4" width="16" height="16" rx="4.5"/><circle cx="12" cy="12" r="3.6"/><path d="M16.8 7.2v.1"/>',
    li: '<rect x="4" y="4" width="16" height="16" rx="2.5"/><path d="M8 10.5V16M8 7.8v.1M11.5 16v-5.5M11.5 13c0-1.8 1-2.6 2.3-2.6s2.2.8 2.2 2.6V16"/>',
  };
  const ic = (n, cls = 'ico', sw = 2) => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;
  const img = (n, alt, cls = 'pic', style = '') => `<img class="${cls}" src="img/${n}.jpg" alt="${alt}"${style ? ` style="${style}"` : ''}>`;

  // Paletter. bink = text på primärfärg, logo = färg för logotyp/rubrikaccent på ljus yta.
  const P = {
    marin: { brand: '#1F3A5F', d: '#152A46', ground: '#F6F6F3', tint: '#E3E9F1', sink: '#151A21', muted: '#57606B' },
    marinsand: { brand: '#1F3A5F', d: '#152A46', ground: '#F6F2EA', tint: '#EBE3D5', sink: '#18191B', muted: '#5E5A53', acc: '#B68A4E' },
    skog: { brand: '#25553C', d: '#1A3F2C', ground: '#F5F5F0', tint: '#E1EADF', sink: '#172019', muted: '#58635A' },
    skoghavre: { brand: '#25553C', d: '#1A3F2C', ground: '#F4EFE6', tint: '#E6E6D6', sink: '#1B1E19', muted: '#5D5F55' },
    petrol: { brand: '#0E5A63', d: '#0A434A', ground: '#F3F6F6', tint: '#DBE9EA', sink: '#122022', muted: '#526568' },
    tegel: { brand: '#A3442A', d: '#80331E', ground: '#FAF6F1', tint: '#F1DFD3', sink: '#291C17', muted: '#6B5C54' },
    terrakotta: { brand: '#9C4F33', d: '#7D3E27', ground: '#F7F1E8', tint: '#EEDDCB', sink: '#2A2019', muted: '#6B5F55' },
    plommon: { brand: '#5D2A4D', d: '#461F3A', ground: '#F8F5F6', tint: '#ECDFE7', sink: '#221920', muted: '#665963' },
    svart: { brand: '#161616', d: '#000000', ground: '#F7F7F5', tint: '#EAEAE6', sink: '#161616', muted: '#5D5D5A' },
    svartvit: { brand: '#111111', d: '#000000', ground: '#FFFFFF', tint: '#F1F1EF', sink: '#111111', muted: '#5C5C5C' },
    svarthavre: { brand: '#1A1917', d: '#000000', ground: '#F3EEE6', tint: '#E7DFD2', sink: '#1A1917', muted: '#5F5A52' },
    svartgul: { brand: '#161616', d: '#000000', ground: '#F7F7F4', tint: '#FBEFC4', sink: '#161616', muted: '#5D5D5A', acc: '#F2C230' },
    svartguld: { brand: '#171614', d: '#000000', ground: '#F7F4EE', tint: '#EFE6D3', sink: '#171614', muted: '#5F5A50', acc: '#A9842F' },
    senap: { brand: '#CF9B1F', d: '#A77B12', bink: '#1C1A15', ground: '#FAF7EE', tint: '#F4E8C6', sink: '#1C1A15', muted: '#5F594C', logo: '#1C1A15', dk: '#2B261C' },
    korall: { brand: '#BA4029', d: '#97321D', ground: '#FBF7F4', tint: '#F7E0D8', sink: '#231916', muted: '#695A55' },
    oxblod: { brand: '#6D1F2B', d: '#521621', ground: '#F8F4EF', tint: '#EEDFDC', sink: '#221819', muted: '#685A5A' },
    salvia: { brand: '#4B6852', d: '#3A5240', ground: '#F6F6F1', tint: '#E2E9E0', sink: '#1B211C', muted: '#5B645D' },
    bla: { brand: '#2350C2', d: '#1A3E9C', ground: '#F6F7FA', tint: '#E2E9F9', sink: '#141A27', muted: '#565E6E' },
    ultramarin: { brand: '#2F3FD0', d: '#2231A8', ground: '#FFFFFF', tint: '#E8EAFB', sink: '#121427', muted: '#585B70' },
    ocean: { brand: '#1B5B94', d: '#134574', ground: '#F5F7F9', tint: '#DFE9F3', sink: '#131C25', muted: '#55616D' },
    grafit: { brand: '#2E343A', d: '#1E2226', ground: '#F5F5F4', tint: '#E6E8EA', sink: '#1A1D20', muted: '#5A6066' },
    grafitgron: { brand: '#2E343A', d: '#1E2226', ground: '#F5F5F4', tint: '#DDEFE3', sink: '#1A1D20', muted: '#5A6066', acc: '#2E8B57' },
    pudder: { brand: '#9C4F5C', d: '#7F3E4A', ground: '#FBF6F4', tint: '#F3E2E1', sink: '#271B1D', muted: '#6C5C5E' },
    brun: { brand: '#6A4A33', d: '#533926', ground: '#FAF6F0', tint: '#EEE3D6', sink: '#241C16', muted: '#675C52' },
    orange: { brand: '#AB4810', d: '#8A390A', ground: '#FAF7F3', tint: '#F6E2D3', sink: '#21180F', muted: '#665B52' },
    rod: { brand: '#B3221F', d: '#901A17', ground: '#F7F7F6', tint: '#F6DEDC', sink: '#1B1A1A', muted: '#5E5C5B' },
    klubbgron: { brand: '#1C7039', d: '#14572B', ground: '#F5F7F4', tint: '#DDEEDF', sink: '#161D18', muted: '#56625A' },
    klubbbla: { brand: '#1F4FA0', d: '#173D7E', ground: '#F5F7FA', tint: '#DEE7F5', sink: '#141A24', muted: '#55606F', acc: '#F2C230' },
    mint: { brand: '#13756D', d: '#0D5A54', ground: '#F4F8F7', tint: '#D8EFEB', sink: '#13201F', muted: '#536664' },
    marinorange: { brand: '#1F3A5F', d: '#152A46', ground: '#F6F6F3', tint: '#FBE4D3', sink: '#151A21', muted: '#57606B', acc: '#D9682B' },
  };
  const pv = (p, x = {}) => sv(Object.assign({ brand: p.brand, 'brand-d': p.d, bink: p.bink || '#fff', ground: p.ground, box: p.box || '#fff', tint: p.tint, sink: p.sink, smuted: p.muted, sline: p.line || 'rgba(20,20,20,.12)', 'fa-logo': p.logo || p.brand, 'fa-acc': p.acc || p.brand, 'fa-dk': p.dk || p.d }, x));

  // Liten webbsida i en palett: header, hero på tonad yta, två kort, mörkt band och färgremsa.
  const PG = css(`.fa-pg{flex:1;display:flex;flex-direction:column;min-width:0;background:var(--ground);color:var(--sink)}
.fa-pg-nav{display:flex;align-items:center;gap:12px;padding:11px 16px;background:var(--box);border-bottom:1px solid var(--sline);min-width:0}
.fa-pg-logo{font-weight:800;font-size:14px;letter-spacing:-.01em;color:var(--fa-logo);flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.fa-pg-l{font-size:12px;color:var(--smuted);white-space:nowrap}
.fa-pg-nb{font-size:12px;font-weight:600;background:var(--brand);color:var(--bink);padding:6px 11px;border-radius:var(--rb);white-space:nowrap}
.fa-pg-hero{background:var(--tint);padding:22px 16px 20px;display:flex;flex-direction:column;gap:9px;align-items:flex-start}
.fa-pg-hero .h{font-size:23px}
.fa-pg-p{font-size:13px;color:var(--smuted);max-width:40ch}
.fa-pg-tag{font-size:11px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--sink);display:inline-flex;align-items:center;gap:7px}
.fa-pg-tag::before{content:"";width:16px;height:3px;border-radius:2px;background:var(--fa-acc)}
.fa-pg .sb,.fa-pg .sb2{height:38px;font-size:13px;padding:0 15px}
.fa-pg-cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(104px,1fr));gap:10px;padding:14px 16px 16px}
.fa-pg-card{background:var(--box);border:1px solid var(--sline);border-radius:var(--rc);padding:12px;display:flex;flex-direction:column;gap:3px;min-width:0;font-size:13px}
.fa-pg-card .ico{color:var(--brand);margin-bottom:4px}
.fa-pg-card b{font-size:14px}
.fa-pg-foot{background:var(--fa-dk);color:#fff;font-size:12px;padding:10px 16px;display:flex;gap:8px;align-items:center;margin-top:auto}
.fa-pg-sw{display:flex;height:9px}.fa-pg-sw i{flex:1}
@container (max-width:300px){.fa-pg-l{display:none}}
.fa-pg-w{container-type:inline-size;flex:1;display:flex;flex-direction:column}`);
  const page = (p, c, x) => `${PG}<div class="fa-pg-w"><div class="fa-pg" style="${pv(p, x)}">
<div class="fa-pg-nav"><span class="fa-pg-logo">${c.logo}</span><span class="fa-pg-l">${c.n1 || 'Tjänster'}</span><span class="fa-pg-l">${c.n2 || 'Om oss'}</span><span class="fa-pg-nb">${c.nb || 'Kontakt'}</span></div>
<div class="fa-pg-hero"><span class="fa-pg-tag">${c.tag}</span><p class="h">${c.h}</p><p class="fa-pg-p">${c.p}</p><div class="row" style="gap:8px"><span class="sb">${c.cta}</span><span class="sb2">${c.cta2}</span></div></div>
<div class="fa-pg-cards">${c.cards.map(k => `<div class="fa-pg-card">${ic(k[0])}<b>${k[1]}</b><span class="muted">${k[2]}</span></div>`).join('')}</div>
<div class="fa-pg-foot">${ic(c.fi || 'clock', 'ico', 2)}<span>${c.foot}</span></div>
<div class="fa-pg-sw"><i style="background:var(--brand)"></i><i style="background:var(--fa-dk)"></i><i style="background:var(--fa-acc)"></i><i style="background:var(--tint)"></i><i style="background:var(--ground)"></i><i style="background:var(--sink)"></i></div>
</div></div>`;
  const palQ = (id, q, c, list) => ({ id, q, layout: 'grid', opts: list.map(([l, k, x]) => ({ l, h: page(P[k], c, x) })) });

  // Neutral liten sida (utgångsläget) med valfria variabler och extra innehåll.
  const box = (inner, style = '', cls = '') => `<div class="pad ${cls}" style="flex:1;display:flex;flex-direction:column;justify-content:center;gap:12px;min-width:0;${style}">${inner}</div>`;
  const cardC = (o = {}) => `<div class="panel" style="${o.s || ''}"><div class="stack" style="gap:6px">${o.tag ? `<span class="tag" style="align-self:flex-start">${o.tag}</span>` : ''}<p class="h h3">${o.t || 'Badrumsrenovering'}</p><p class="small muted">${o.d || 'Från rivning till kakel. Fast pris efter hembesök.'}</p>${o.price ? `<p class="price">${o.price}</p>` : ''}${o.foot || ''}</div></div>`;
  // ---------- Grupp: hela paletter per bransch ----------
  const C = {
    restaurang: { logo: 'Bryggans kök', n1: 'Meny', n2: 'Om oss', nb: 'Boka bord', tag: 'Säsongsmeny', h: 'Mat från skärgården, lagad över öppen eld', p: 'Lunch vardagar 11–14. Middag tisdag till lördag.', cta: 'Boka bord', cta2: 'Se menyn', cards: [['cal', 'Lunch 145 kr', 'Dagens fisk eller grönt'], ['star', 'Fyra rätter', 'Kvällsmeny 695 kr']], foot: 'Öppet idag 11–22 · Strandvägen 4' },
    kafe: { logo: 'Kafé Linnea', n1: 'Meny', n2: 'Bageriet', nb: 'Hitta hit', tag: 'Nybakat varje morgon', h: 'Surdeg, kardemumma och riktigt kaffe', p: 'Frukost från 07.30. Beställ tårta två dagar innan.', cta: 'Beställ tårta', cta2: 'Veckans bröd', cards: [['cup', 'Frukost 95 kr', 'Gröt, macka och kaffe'], ['heart', 'Tårtor', 'Från 395 kr för 8 bitar']], foot: 'Öppet idag 07.30–17 · Linnégatan 12', fi: 'clock' },
    bageri: { logo: 'Bageri Mjölnaren', n1: 'Sortiment', n2: 'Om oss', nb: 'Förbeställ', tag: 'Stenugnsbakat', h: 'Bröd som får ta den tid det tar', p: 'Långjäst surdeg och bullar bakade på svenskt mjöl.', cta: 'Förbeställ bröd', cta2: 'Se sortiment', cards: [['leaf', 'Rågsurdeg', '68 kr · 900 g'], ['heart', 'Kanelbulle', '32 kr · fredagar 25 kr']], foot: 'Öppet tis–lör 07–15 · Kvarngatan 3' },
    snickare: { logo: 'Lindqvist Snickeri', n1: 'Tjänster', n2: 'Projekt', nb: 'Begär offert', tag: 'Snickare i Uppsala sedan 1998', h: 'Platsbyggt, renoverat och gjort ordentligt', p: 'Kök, trappor och inredning. ROT-avdrag direkt på fakturan.', cta: 'Begär offert', cta2: 'Se projekt', cards: [['home', 'Kök', 'Platsbyggt efter mått'], ['tool', 'Renovering', 'Fönster, dörrar, golv']], foot: 'Svar inom en arbetsdag · 018-24 66 10', fi: 'phone' },
    bygg: { logo: 'Lindqvist Bygg', n1: 'Tjänster', n2: 'Referenser', nb: 'Kontakta oss', tag: 'Totalentreprenad', h: 'Vi bygger om, till och nytt i hela Mälardalen', p: 'Fast pris, egen projektledare och tio års garanti.', cta: 'Boka hembesök', cta2: 'Referenser', cards: [['home', 'Tillbyggnad', 'Från ritning till nyckel'], ['shield', 'Garanti', '10 år på allt vi bygger']], foot: 'Ring 021-41 20 00 · Vardagar 07–16', fi: 'phone' },
    el: { logo: 'Ström & Ljus El', n1: 'Tjänster', n2: 'Priser', nb: 'Ring oss', tag: 'Auktoriserad elinstallatör', h: 'Elen fixad. Samma vecka, till fast pris.', p: 'Laddboxar, solceller, felsökning och nya uttag.', cta: 'Få prisförslag', cta2: 'Se priser', cards: [['bolt', 'Laddbox', 'Från 12 900 kr efter avdrag'], ['tool', 'Felsökning', '895 kr första timmen']], foot: 'Jour dygnet runt · 08-410 22 33', fi: 'phone' },
    frisor: { logo: 'Salong Nova', n1: 'Behandlingar', n2: 'Frisörer', nb: 'Boka tid', tag: 'Frisör på Södermalm', h: 'Klippning, färg och tid för dig', p: 'Boka online dygnet runt. Avboka senast 24 timmar innan.', cta: 'Boka tid', cta2: 'Prislista', cards: [['scissors', 'Klippning', 'Från 650 kr · 45 min'], ['spark', 'Slingor', 'Från 1 450 kr · 2 tim']], foot: 'Lediga tider idag 14.15 och 16.30', fi: 'cal' },
    spa: { logo: 'Ljung Hud & Spa', n1: 'Behandlingar', n2: 'Presentkort', nb: 'Boka', tag: 'Hudvård och massage', h: 'En timme som bara är din', p: 'Ansiktsbehandlingar, massage och hudanalys.', cta: 'Boka behandling', cta2: 'Presentkort', cards: [['leaf', 'Ansikte 60 min', '995 kr'], ['heart', 'Massage 50 min', '850 kr']], foot: 'Öppet idag 10–19 · Ljunggatan 8' },
    klinik: { logo: 'Kliniken Vasa', n1: 'Behandlingar', n2: 'Personal', nb: 'Boka tid', tag: 'Fysioterapi och rehab', h: 'Hjälp med smärta, skador och rörlighet', p: 'Legitimerade fysioterapeuter. Ingen remiss behövs.', cta: 'Boka besök', cta2: 'Våra behandlingar', cards: [['shield', 'Nybesök', '60 min · 400 kr frikort'], ['user', 'Rehab', 'Individuellt program']], foot: 'Telefontid vardagar 08–10 · 08-55 12 30', fi: 'phone' },
    tand: { logo: 'Tandvården Ekbacken', n1: 'Behandlingar', n2: 'Priser', nb: 'Boka tid', tag: 'Tandläkare i Lund', h: 'Trygg tandvård för hela familjen', p: 'Vi tar emot nya patienter. Akuttider varje vardag.', cta: 'Boka undersökning', cta2: 'Prislista', cards: [['tooth', 'Undersökning', 'Från 995 kr'], ['spark', 'Tandblekning', '3 450 kr']], foot: 'Akut tandvärk? Ring 046-12 34 50', fi: 'phone' },
    konsult: { logo: 'Berg & Ek Redovisning', n1: 'Tjänster', n2: 'Om oss', nb: 'Kontakta oss', tag: 'Auktoriserade redovisningskonsulter', h: 'Ordning på ekonomin, så att du kan driva bolaget', p: 'Bokföring, bokslut och rådgivning för små aktiebolag.', cta: 'Boka möte', cta2: 'Våra paket', cards: [['chart', 'Löpande', 'Från 2 400 kr/mån'], ['shield', 'Bokslut', 'Fast pris per år']], foot: 'Kontor i Göteborg och Borås · 031-70 80 90', fi: 'pin' },
    byra: { logo: 'Studio Kvarn', n1: 'Arbeten', n2: 'Byrån', nb: 'Starta ett projekt', tag: 'Varumärke och webb', h: 'Vi bygger varumärken som håller i tio år', p: 'Strategi, identitet och digitala produkter för växande bolag.', cta: 'Starta ett projekt', cta2: 'Se arbeten', cards: [['spark', 'Identitet', 'Logotyp, typografi, färg'], ['globe', 'Webb', 'Design och utveckling']], foot: 'Malmö · hej@studiokvarn.se', fi: 'mail' },
    inredning: { logo: 'Hemma Interiör', n1: 'Möbler', n2: 'Belysning', nb: 'Varukorg', tag: 'Nyheter för hösten', h: 'Möbler och textil för ett lugnare hem', p: 'Fri frakt över 799 kr. 60 dagars öppet köp.', cta: 'Handla nyheter', cta2: 'Inspiration', cards: [['home', 'Fåtölj Ebba', '6 495 kr'], ['star', 'Pläd i ull', '895 kr']], foot: 'Fri frakt över 799 kr · Leverans 2–4 dagar', fi: 'truck' },
    friluft: { logo: 'Nordtrail', n1: 'Herr', n2: 'Dam', nb: 'Varukorg', tag: 'Ny kollektion', h: 'Utrustning för långa dagar i fjällen', p: 'Testat av guider i Abisko. Fri retur i 30 dagar.', cta: 'Handla nu', cta2: 'Packlistor', cards: [['leaf', 'Skaljacka Vidd', '3 299 kr'], ['star', 'Ryggsäck 38 l', '1 799 kr']], foot: 'Fri frakt över 599 kr · Fri retur', fi: 'truck' },
    hotell: { logo: 'Hotell Strandvillan', n1: 'Rum', n2: 'Restaurang', nb: 'Boka rum', tag: 'Vid havet i Båstad', h: 'Ett litet hotell med utsikt över Laholmsbukten', p: 'Tjugotvå rum, egen strand och frukost till klockan elva.', cta: 'Boka rum', cta2: 'Se rummen', cards: [['bed', 'Dubbelrum', 'Från 1 890 kr/natt'], ['cup', 'Frukost', 'Ingår alltid']], foot: 'Incheckning från 15 · 0431-36 50 00', fi: 'phone' },
    resor: { logo: 'Fjällresor Norr', n1: 'Resor', n2: 'Boende', nb: 'Boka resa', tag: 'Guidade fjällturer', h: 'Vandra Kungsleden med guide och packning fixad', p: 'Fem dagar, små grupper och boende i fjällstugor.', cta: 'Se avgångar', cta2: 'Så funkar det', cards: [['pin', 'Abisko–Nikkaluokta', '5 dagar · 8 900 kr'], ['cal', 'Avgångar', 'Juli och augusti']], foot: 'Få platser kvar för juli', fi: 'cal' },
    gym: { logo: 'Kraftverket Gym', n1: 'Pass', n2: 'Priser', nb: 'Bli medlem', tag: 'Öppet 05–23 alla dagar', h: 'Träna starkare. Utan bindningstid.', p: 'Fria vikter, gruppass och personlig träning.', cta: 'Bli medlem', cta2: 'Schema', cards: [['dumbbell', 'Gym', '349 kr/mån'], ['user', 'PT-timme', '695 kr']], foot: 'Första veckan gratis', fi: 'star' },
    verkstad: { logo: 'Motorverket', n1: 'Service', n2: 'Priser', nb: 'Boka service', tag: 'Bilverkstad i Västerås', h: 'Service och reparationer för alla bilmärken', p: 'Fast pris innan vi börjar. Lånebil ingår.', cta: 'Boka service', cta2: 'Se priser', cards: [['car', 'Service', 'Från 2 195 kr'], ['tool', 'Däckbyte', '495 kr inkl. tvätt']], foot: 'Vardagar 07–17 · 021-13 70 70', fi: 'phone' },
    fastighet: { logo: 'Ekmans Fastighet', n1: 'Till salu', n2: 'Sälja', nb: 'Värdera bostad', tag: 'Mäklare i Stockholm', h: 'Vi säljer ditt hem med omsorg och rätt pris', p: 'Kostnadsfri värdering och egen mäklare hela vägen.', cta: 'Boka värdering', cta2: 'Till salu', cards: [['home', 'Villa Saltsjöbaden', '8 950 000 kr'], ['key', 'Lägenhet Vasastan', '4 250 000 kr']], foot: '1 240 sålda bostäder sedan 2012', fi: 'star' },
    forening: { logo: 'Sjöbo IF', n1: 'Lag', n2: 'Kalender', nb: 'Bli medlem', tag: 'Fotboll för alla åldrar', h: 'Spela, träna och höra till', p: 'Över 400 aktiva i 24 lag. Nya spelare är alltid välkomna.', cta: 'Bli medlem', cta2: 'Hitta ditt lag', cards: [['cal', 'Lördag 14.00', 'A-lag mot Tomelilla'], ['user', 'Knattefotboll', 'Födda 2019–2020']], foot: 'Medlemsavgift 300 kr per år', fi: 'heart' },
    stad: { logo: 'Rent & Klart', n1: 'Tjänster', n2: 'Priser', nb: 'Boka städning', tag: 'Hemstädning i Göteborg', h: 'Kom hem till rent. Varannan vecka eller en gång.', p: 'Samma städare varje gång. RUT-avdrag direkt.', cta: 'Få pris direkt', cta2: 'Så går det till', cards: [['home', 'Hemstädning', 'Från 249 kr/tim efter RUT'], ['spark', 'Flyttstäd', 'Fast pris efter yta']], foot: 'Nöjd-garanti · 4,8 av 5 i snitt', fi: 'star' },
    tradgard: { logo: 'Grönt & Skönt', n1: 'Tjänster', n2: 'Projekt', nb: 'Kontakt', tag: 'Trädgårdsanläggning', h: 'Trädgårdar som blir vackrare för varje år', p: 'Plantering, stenläggning och skötsel året runt.', cta: 'Boka platsbesök', cta2: 'Se projekt', cards: [['leaf', 'Anläggning', 'Rabatter, gräs, häckar'], ['home', 'Stenläggning', 'Uteplatser och gångar']], foot: 'Vi arbetar i Skåne och Halland', fi: 'pin' },
  };
  const gPal = {
    key: 'paletter', title: 'Hela paletter per bransch', questions: [
      palQ('fa-pal-restaurang', 'Vilken palett passar bäst för en restaurang?', C.restaurang, [['Tegel på benvit', 'tegel'], ['Skogsgrön på havre', 'skoghavre'], ['Svart och vitt', 'svartvit'], ['Oxblod på kräm', 'oxblod']]),
      palQ('fa-pal-kafe', 'Vilken palett passar bäst för ett kafé?', C.kafe, [['Senap och kol', 'senap'], ['Salvia på benvit', 'salvia'], ['Terrakotta på havre', 'terrakotta'], ['Marin på sand', 'marinsand']]),
      palQ('fa-pal-bageri', 'Vilken palett passar bäst för ett bageri?', C.bageri, [['Varm brun', 'brun'], ['Pudderrosa', 'pudder'], ['Skogsgrön på havre', 'skoghavre'], ['Svart på havre', 'svarthavre']]),
      palQ('fa-pal-snickare', 'Vilken palett passar bäst för en snickare?', C.snickare, [['Skogsgrön', 'skog'], ['Marinblå', 'marin'], ['Tegel', 'tegel'], ['Svart med gul accent', 'svartgul']]),
      palQ('fa-pal-bygg', 'Vilken palett passar bäst för ett byggföretag?', C.bygg, [['Svart med gul accent', 'svartgul'], ['Marin med orange accent', 'marinorange'], ['Grafit', 'grafit'], ['Petrol', 'petrol']]),
      palQ('fa-pal-el', 'Vilken palett passar bäst för en elektriker?', C.el, [['Klarblå', 'bla'], ['Svart med gul accent', 'svartgul'], ['Grafit med grön accent', 'grafitgron'], ['Petrol', 'petrol']]),
      palQ('fa-pal-frisor', 'Vilken palett passar bäst för en frisörsalong?', C.frisor, [['Svart och vitt', 'svartvit'], ['Plommon', 'plommon'], ['Pudderrosa', 'pudder'], ['Salvia', 'salvia']]),
      palQ('fa-pal-spa', 'Vilken palett passar bäst för hudvård och spa?', C.spa, [['Salvia', 'salvia'], ['Terrakotta på havre', 'terrakotta'], ['Plommon', 'plommon'], ['Petrol', 'petrol']]),
      palQ('fa-pal-klinik', 'Vilken palett passar bäst för en klinik?', C.klinik, [['Petrol', 'petrol'], ['Marinblå', 'marin'], ['Skogsgrön', 'skog'], ['Klarblå', 'bla']]),
      palQ('fa-pal-tand', 'Vilken palett passar bäst för en tandläkare?', C.tand, [['Klarblå', 'bla'], ['Mintgrön', 'mint'], ['Marinblå', 'marin'], ['Korall', 'korall']]),
      palQ('fa-pal-konsult', 'Vilken palett passar bäst för en redovisningsbyrå?', C.konsult, [['Marinblå', 'marin'], ['Svart och vitt', 'svartvit'], ['Skogsgrön', 'skog'], ['Plommon', 'plommon']]),
      palQ('fa-pal-byra', 'Vilken palett passar bäst för en designbyrå?', C.byra, [['Svart och vitt', 'svartvit'], ['Ultramarin på vitt', 'ultramarin'], ['Korall', 'korall'], ['Senap och kol', 'senap']]),
      palQ('fa-pal-inredning', 'Vilken palett passar bäst för en inredningsbutik?', C.inredning, [['Svart på havre', 'svarthavre'], ['Tegel', 'tegel'], ['Salvia', 'salvia'], ['Marin på sand', 'marinsand']]),
      palQ('fa-pal-friluft', 'Vilken palett passar bäst för en friluftsbutik?', C.friluft, [['Skogsgrön', 'skog'], ['Bränd orange', 'orange'], ['Svart och vitt', 'svartvit'], ['Petrol', 'petrol']]),
      palQ('fa-pal-hotell', 'Vilken palett passar bäst för ett hotell vid havet?', C.hotell, [['Marin på sand', 'marinsand'], ['Skogsgrön på havre', 'skoghavre'], ['Oxblod på kräm', 'oxblod'], ['Svart med guld', 'svartguld']]),
      palQ('fa-pal-resor', 'Vilken palett passar bäst för en researrangör?', C.resor, [['Petrol', 'petrol'], ['Skogsgrön', 'skog'], ['Havsblå', 'ocean'], ['Tegel', 'tegel']]),
      palQ('fa-pal-gym', 'Vilken palett passar bäst för ett gym?', C.gym, [['Svart med gul accent', 'svartgul'], ['Signalröd', 'rod'], ['Klarblå', 'bla'], ['Grafit', 'grafit']]),
      palQ('fa-pal-verkstad', 'Vilken palett passar bäst för en bilverkstad?', C.verkstad, [['Signalröd', 'rod'], ['Marinblå', 'marin'], ['Svart med gul accent', 'svartgul'], ['Petrol', 'petrol']]),
      palQ('fa-pal-fastighet', 'Vilken palett passar bäst för en fastighetsmäklare?', C.fastighet, [['Marinblå', 'marin'], ['Skogsgrön', 'skog'], ['Svart med guld', 'svartguld'], ['Plommon', 'plommon']]),
      palQ('fa-pal-forening', 'Vilken palett passar bäst för en idrottsförening?', C.forening, [['Klubbgrön', 'klubbgron'], ['Klubbblå med gul', 'klubbbla'], ['Signalröd', 'rod'], ['Svart med gul accent', 'svartgul']]),
      palQ('fa-pal-stad', 'Vilken palett passar bäst för en städfirma?', C.stad, [['Klarblå', 'bla'], ['Mintgrön', 'mint'], ['Petrol', 'petrol'], ['Marinblå', 'marin']]),
      palQ('fa-pal-tradgard', 'Vilken palett passar bäst för en trädgårdsfirma?', C.tradgard, [['Skogsgrön', 'skog'], ['Salvia', 'salvia'], ['Senap och kol', 'senap'], ['Terrakotta', 'terrakotta']]),
    ]
  };
  // ---------- Neutrala sektionsinnehåll för många branscher ----------
  const N = {
    klinik: { eye: 'Kliniken Vasa', h: 'Behandlingar för rygg, nacke och knä', p: 'Legitimerade fysioterapeuter. Ingen remiss behövs.', c: [['Nybesök', '60 min · 400 kr'], ['Återbesök', '30 min · 250 kr']], cta: 'Boka besök' },
    konsult: { eye: 'Berg & Ek Redovisning', h: 'Bokföring som bara fungerar', p: 'Fast månadspris och en egen konsult som svarar samma dag.', c: [['Bas', '2 400 kr/mån'], ['Plus', '3 900 kr/mån']], cta: 'Boka möte' },
    restaurang: { eye: 'Bryggans kök', h: 'Veckans lunch vid vattnet', p: 'Serveras vardagar 11–14. Kaffe och kaka ingår.', c: [['Rimmad torsk', '145 kr'], ['Svamprisotto', '135 kr']], cta: 'Boka bord' },
    hotell: { eye: 'Hotell Strandvillan', h: 'Rum med utsikt över havet', p: 'Frukost ingår alltid. Fri parkering för gäster.', c: [['Dubbelrum', 'Från 1 890 kr'], ['Svit', 'Från 3 400 kr']], cta: 'Boka rum' },
    bygg: { eye: 'Lindqvist Bygg', h: 'Badrum, kök och tillbyggnader', p: 'Fast pris efter hembesök och tio års garanti.', c: [['Badrum', 'Från 189 000 kr'], ['Kök', 'Från 145 000 kr']], cta: 'Boka hembesök' },
    frisor: { eye: 'Salong Nova', h: 'Klippning och färg på Södermalm', p: 'Boka online dygnet runt, välj din frisör.', c: [['Klippning', 'Från 650 kr'], ['Slingor', 'Från 1 450 kr']], cta: 'Boka tid' },
    gym: { eye: 'Kraftverket Gym', h: 'Träna utan bindningstid', p: 'Öppet 05–23 alla dagar. Första veckan gratis.', c: [['Gym', '349 kr/mån'], ['Gym + pass', '449 kr/mån']], cta: 'Bli medlem' },
    tand: { eye: 'Tandvården Ekbacken', h: 'Trygg tandvård i Lund', p: 'Vi tar emot nya patienter och har akuttider varje dag.', c: [['Undersökning', 'Från 995 kr'], ['Tandblekning', '3 450 kr']], cta: 'Boka tid' },
    fastighet: { eye: 'Ekmans Fastighet', h: 'Sälj med rätt mäklare', p: 'Kostnadsfri värdering inom 48 timmar.', c: [['Villa', 'Arvode 1,5 %'], ['Lägenhet', 'Arvode 1,8 %']], cta: 'Boka värdering' },
    verkstad: { eye: 'Motorverket', h: 'Service för alla bilmärken', p: 'Fast pris innan vi börjar och lånebil ingår.', c: [['Service', 'Från 2 195 kr'], ['Däckbyte', '495 kr']], cta: 'Boka service' },
    forening: { eye: 'Sjöbo IF', h: 'Hitta ditt lag', p: 'Fotboll för alla åldrar, från knatte till veteran.', c: [['Knatte', 'Födda 2019–2020'], ['Dam och herr', 'Seriespel']], cta: 'Bli medlem' },
    ehandel: { eye: 'Hemma Interiör', h: 'Nytt i butiken', p: 'Fri frakt över 799 kr och 60 dagars öppet köp.', c: [['Fåtölj Ebba', '6 495 kr'], ['Pläd i ull', '895 kr']], cta: 'Handla nu' },
  };
  // Sektion: eyebrow, rubrik, text, två kort och knapp. o.bg/o.card/o.ink styr ytor.
  const SEC = css(`.fa-sec{display:flex;flex-direction:column;gap:10px;padding:20px;min-width:0}
.fa-sec .h{font-size:20px}.fa-sec-p{font-size:13px;color:var(--smuted)}
.fa-sec-c{display:grid;grid-template-columns:repeat(auto-fit,minmax(100px,1fr));gap:10px}
.fa-sec-k{background:var(--box);border-radius:var(--rc);padding:12px;display:flex;flex-direction:column;gap:2px;font-size:13px;min-width:0}
.fa-sec-k b{font-size:14px}
.fa-sec .sb{height:40px;font-size:14px;padding:0 16px;align-self:flex-start}`);
  const sec = (c, o = {}) => `${o.nocss ? '' : SEC}<div class="fa-sec" style="background:${o.bg || 'var(--ground)'};${o.s || ''}"><span class="eyebrow"${o.eyeS ? ` style="${o.eyeS}"` : ''}>${c.eye}</span><p class="h"${o.hS ? ` style="${o.hS}"` : ''}>${c.h}</p><p class="fa-sec-p"${o.pS ? ` style="${o.pS}"` : ''}>${c.p}</p>${o.nocards ? '' : `<div class="fa-sec-c">${c.c.map(k => `<div class="fa-sec-k" style="${o.card || ''}"><b>${k[0]}</b><span class="muted">${k[1]}</span></div>`).join('')}</div>`}${o.nocta ? '' : `<span class="sb"${o.ctaS ? ` style="${o.ctaS}"` : ''}>${c.cta}</span>`}</div>`;
  const wrap = (inner, style = '') => `<div style="flex:1;display:flex;flex-direction:column;min-width:0;${style}">${inner}</div>`;
  const DARK = 'color:#fff;--sink:#fff;--smuted:rgba(255,255,255,.72);--box:rgba(255,255,255,.08)';

  const gBg = {
    key: 'bakgrunder', title: 'Bakgrunder', questions: [
      { id: 'fa-bg-sida', q: 'Vilken sidbakgrund ska vara standard?', layout: 'grid', opts: [
        ['Ren vit', '#FFFFFF', 'border:1px solid var(--sline)'], ['Benvit', '#FAF9F6', 'border:1px solid var(--sline)'], ['Varm havre', '#F3EEE5', ''], ['Kall ljusgrå', '#F1F3F5', '']
      ].map(([l, bg, card]) => ({ l, h: wrap(sec(N.klinik, { bg, card }), `background:${bg}`) })) },
      { id: 'fa-bg-kort', q: 'Hur ska kort skilja sig från bakgrunden?', layout: 'grid', opts: [
        { l: 'Vita kort på ljusgrå sida', h: wrap(sec(N.konsult, { bg: '#F2F3F4' })) },
        { l: 'Vita kort med kant på vit sida', h: wrap(sec(N.konsult, { bg: '#fff', card: 'border:1px solid var(--sline)' })) },
        { l: 'Grå kort på vit sida', h: wrap(sec(N.konsult, { bg: '#fff', card: 'background:#F2F3F4' })) },
        { l: 'Tonade kort på vit sida', h: wrap(sec(N.konsult, { bg: '#fff', card: 'background:var(--tint)' })) },
      ] },
      { id: 'fa-bg-tonad', q: 'Får hela sidans bakgrund tonas i varumärkesfärgen?', layout: 'grid', opts: [
        { l: 'Nej, neutral bakgrund', h: wrap(sec(N.tand, { bg: '#F6F6F4' }), sv({ brand: '#1B5B94' })) },
        { l: 'Ja, svagt tonad', h: wrap(sec(N.tand, { bg: '#EFF4F9' }), sv({ brand: '#1B5B94' })) },
        { l: 'Ja, tydligt tonad', h: wrap(sec(N.tand, { bg: '#DCE8F3' }), sv({ brand: '#1B5B94' })) },
      ] },
      { id: 'fa-bg-vaxling', q: 'Hur ska sektioner växla bakgrund nedåt på sidan?', layout: 'grid', opts: [
        ['Samma bakgrund rakt igenom', ['#fff', '#fff', '#fff']],
        ['Vit och benvit varannan', ['#fff', '#F5F3EE', '#fff']],
        ['Vit och tonad varannan', ['#fff', 'var(--tint)', '#fff']],
        ['Vit med en mörk sektion', ['#fff', 'var(--brand)', '#fff']],
      ].map(([l, bgs]) => ({ l, h: wrap(css('.fa-bgv{padding:14px 16px;display:flex;flex-direction:column;gap:6px}.fa-bgv i{display:block;height:7px;border-radius:4px;background:currentColor;opacity:.22}.fa-bgv b{font-size:14px}') + [['Våra rum', 'i'], ['Restaurangen', 'i'], ['Hitta hit', 'i']].map((s, i) => `<div class="fa-bgv" style="background:${bgs[i]};${bgs[i] === 'var(--brand)' ? 'color:#fff' : ''}"><span class="small" style="opacity:.75">Hotell Strandvillan</span><b>${s[0]}</b><i style="width:90%"></i><i style="width:70%"></i>${i === 1 ? '<span class="sb" style="height:34px;font-size:13px;padding:0 12px;align-self:flex-start;' + (bgs[i] === 'var(--brand)' ? 'background:#fff;color:var(--brand);border-color:#fff' : '') + '">Boka bord</span>' : ''}</div>`).join(''), 'border:1px solid var(--sline)') })) },
      { id: 'fa-bg-avgransning', q: 'Hur avgränsas två sektioner med samma bakgrund?', layout: 'grid', opts: [
        ['Bara luft emellan', ''], ['Hårfin linje', 'border-top:1px solid var(--sline)'], ['Kort linje i mitten', 'linje'],
      ].map(([l, b]) => ({ l, h: wrap(css('.fa-av{padding:16px 18px;display:flex;flex-direction:column;gap:6px}.fa-av b{font-size:15px}.fa-av i{display:block;height:7px;border-radius:4px;background:var(--sink);opacity:.14}') + `<div class="fa-av"><span class="eyebrow">Lindqvist Bygg</span><b>Så går det till</b><i style="width:92%"></i><i style="width:74%"></i></div>${b === 'linje' ? '<div style="display:flex;justify-content:center;padding:10px 0"><span style="width:48px;height:2px;background:var(--sline)"></span></div>' : `<div style="height:${b ? 14 : 28}px"></div><div style="${b}"></div>`}<div class="fa-av" style="padding-top:${b ? 18 : 6}px"><span class="eyebrow">Referenser</span><b>Det säger kunderna</b><i style="width:88%"></i><i style="width:64%"></i></div>`, 'background:#fff') })) },
      { id: 'fa-bg-hero-utan-foto', q: 'Vilken bakgrund ska en hero utan foto ha?', layout: 'grid', opts: [
        ['Samma som sidan', '#F6F6F4', ''], ['Ljus ton av varumärket', 'var(--tint)', ''], ['Varumärkesfärgen', 'var(--brand)', DARK], ['Mörk neutral', '#17191C', DARK],
      ].map(([l, bg, ink]) => ({ l, h: wrap(css('.fa-hb{padding:28px 20px;display:flex;flex-direction:column;gap:10px;flex:1;justify-content:center}.fa-hb .h{font-size:24px}') + `<div class="fa-hb" style="background:${bg};${ink}"><span class="eyebrow">Berg & Ek Redovisning</span><p class="h">Ordning på ekonomin varje månad</p><p class="small muted">Bokföring och bokslut för små aktiebolag.</p><div class="row"><span class="sb" style="${ink ? 'background:#fff;color:#1A1C1E;border-color:#fff' : ''}">Boka möte</span></div></div>`) })) },
      { id: 'fa-bg-sidfot', q: 'Vilken bakgrund ska sidfoten ha?', layout: 'grid', opts: [
        ['Samma som sidan, med linje', '#F6F6F4', 'border-top:1px solid var(--sline)', false], ['Ljus tonad', 'var(--tint)', '', false], ['Varumärkesfärgen mörk', 'var(--brand-d)', '', true], ['Nästan svart', '#16181B', '', true],
      ].map(([l, bg, bt, dk]) => ({ l, h: wrap(css('.fa-ft{padding:18px;display:grid;grid-template-columns:repeat(auto-fit,minmax(100px,1fr));gap:12px;font-size:13px}.fa-ft b{display:block;margin-bottom:4px;font-size:13px}.fa-ft span{display:block;opacity:.75}') + `<div style="flex:1;background:#F6F6F4;padding:16px"><p class="small muted">… sidans innehåll</p></div><div class="fa-ft" style="background:${bg};${bt};${dk ? 'color:#fff' : ''}"><div><b>Kafé Linnea</b><span>Linnégatan 12</span><span>413 04 Göteborg</span></div><div><b>Öppettider</b><span>Mån–fre 07.30–17</span><span>Lör–sön 09–16</span></div></div>`) })) },
      { id: 'fa-bg-header', q: 'Vilken bakgrund ska headern ha?', layout: 'grid', opts: [
        ['Vit med hårfin linje', 'background:#fff;border-bottom:1px solid var(--sline)', ''], ['Samma som sidan, utan linje', 'background:#F6F6F4', ''], ['Varumärkesfärgen', 'background:var(--brand)', 'dk'], ['Mörk neutral', 'background:#16181B', 'dk'],
      ].map(([l, s, dk]) => ({ l, h: wrap(css('.fa-hd{display:flex;align-items:center;gap:14px;padding:14px 16px;font-size:13px}.fa-hd b{font-size:15px;flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.fa-hd .sb{height:34px;font-size:13px;padding:0 12px}') + `<div class="fa-hd" style="${s};${dk ? 'color:#fff' : ''}"><b>Salong Nova</b><span style="opacity:.8">Priser</span><span class="sb" style="${dk ? 'background:#fff;color:#1A1C1E;border-color:#fff' : ''}">Boka tid</span></div><div style="background:#F6F6F4;padding:22px 16px;flex:1" class="stack"><p class="h h3">Klippning och färg</p><p class="small muted">Boka online dygnet runt.</p></div>`) })) },
      { id: 'fa-bg-cta-band', q: 'Hur ska ett avslutande band med uppmaning se ut?', layout: 'grid', opts: [
        ['Fyllt med varumärkesfärgen', 'background:var(--brand)', true], ['Ljus ton av varumärket', 'background:var(--tint)', false], ['Mörk neutral', 'background:#16181B', true], ['Ingen yta, bara linje över', 'background:#fff;border-top:1px solid var(--sline)', false],
      ].map(([l, s, dk]) => ({ l, h: wrap(`<div style="flex:1;display:flex;flex-direction:column;justify-content:center;gap:10px;padding:26px 20px;${s};${dk ? 'color:#fff' : ''}"><p class="h h3" style="${dk ? 'color:#fff' : ''}">Dags för service?</p><p class="small" style="opacity:.8">Boka tid online. Lånebil ingår alltid.</p><div class="row"><span class="sb" style="${dk ? 'background:#fff;color:#1A1C1E;border-color:#fff' : ''}">Boka service</span><span class="small" style="opacity:.85">eller ring 021-13 70 70</span></div></div>`, 'background:#fff') })) },
      { id: 'fa-bg-formular', q: 'Vilken yta ska ett kontaktformulär ligga på?', layout: 'grid', opts: [
        ['Direkt på sidan', '#fff', 'transparent', ''], ['I en vit panel på grå sida', '#F2F3F4', '#fff', ''], ['I en tonad panel', '#fff', 'var(--tint)', ''],
      ].map(([l, page, panel]) => ({ l, h: wrap(`<div style="background:${page};padding:16px;flex:1;display:flex"><div style="background:${panel};border-radius:var(--rc);padding:${panel === 'transparent' ? '4px' : '16px'};flex:1;display:flex;flex-direction:column;gap:10px"><p class="h h3">Begär offert</p><div class="fld"><span class="lbl">Namn</span><span class="inp ph">Anna Berg</span></div><div class="fld"><span class="lbl">Telefon</span><span class="inp ph">070-123 45 67</span></div><span class="sb" style="align-self:flex-start">Skicka</span></div></div>`) })) },
      { id: 'fa-bg-neutral-ton', q: 'Vilken grundton ska de neutrala ytorna ha?', layout: 'grid', opts: [
        ['Varm grå', ['#F5F3EF', '#E9E5DE', '#7A736A', '#2A2622']], ['Ren grå', ['#F4F4F4', '#E6E6E6', '#6E6E6E', '#1E1E1E']], ['Kall grå', ['#F2F4F6', '#E3E7EB', '#68707A', '#1A1E23']],
      ].map(([l, c]) => ({ l, h: wrap(`<div style="background:${c[0]};padding:16px;flex:1;display:flex;flex-direction:column;gap:10px;--sink:${c[3]};--smuted:${c[2]}"><div class="row" style="gap:6px">${c.map(x => `<span style="width:26px;height:26px;border-radius:6px;background:${x};border:1px solid rgba(0,0,0,.08)"></span>`).join('')}</div><div style="background:#fff;border-radius:var(--rc);padding:14px;display:flex;flex-direction:column;gap:4px"><span class="eyebrow">Ekmans Fastighet</span><p class="h h3">Villa i Saltsjöbaden</p><p class="small muted">6 rum · 182 m² · Visning söndag</p></div><div style="background:${c[1]};border-radius:var(--rc);padding:10px 14px;font-size:13px;color:${c[3]}">Utgångspris 8 950 000 kr</div></div>`) })) },
      { id: 'fa-bg-produkt', q: 'Vilken bakgrund ska produktbilder i en webbutik stå på?', layout: 'grid', opts: [
        ['Vit', '#FFFFFF'], ['Ljusgrå', '#F1F1F0'], ['Varm beige', '#EFE9E0'], ['Tonad efter varumärket', '#E6EBF0'],
      ].map(([l, bg]) => ({ l, h: wrap(css('.fa-pr{display:grid;grid-template-columns:1fr 1fr;gap:10px;padding:14px}.fa-pr-i{aspect-ratio:1;border-radius:var(--rc);display:grid;place-items:center}.fa-pr-i svg{width:46%;height:46%;color:#3A3530}.fa-pr p{font-size:13px;margin-top:6px}') + `<div class="fa-pr"><div><div class="fa-pr-i" style="background:${bg};${bg === '#FFFFFF' ? 'border:1px solid var(--sline)' : ''}"><svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M10 30h28v6H10zM13 30V20a11 11 0 0 1 22 0v10M10 36v5M38 36v5"/></svg></div><p><b>Fåtölj Ebba</b><br><span class="muted">6 495 kr</span></p></div><div><div class="fa-pr-i" style="background:${bg};${bg === '#FFFFFF' ? 'border:1px solid var(--sline)' : ''}"><svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M18 8h12l6 14H12zM24 22v16M16 40h16"/></svg></div><p><b>Lampa Vilma</b><br><span class="muted">1 295 kr</span></p></div></div>`, 'background:#fff') })) },
      { id: 'fa-bg-utvald-plan', q: 'Hur ska det rekommenderade priskortet framhävas?', layout: 'grid', opts: [
        ['Tonad bakgrund', 'background:var(--tint)', false], ['Fyllt med varumärkesfärgen', 'background:var(--brand);color:#fff', true], ['Kant i varumärkesfärgen', 'background:#fff;box-shadow:inset 0 0 0 2px var(--brand)', false], ['Mörk neutral', 'background:#17191C;color:#fff', true],
      ].map(([l, s, dk]) => ({ l, h: wrap(css('.fa-up{display:grid;grid-template-columns:1fr 1fr;gap:8px;padding:14px;flex:1}.fa-up>div{border-radius:var(--rc);padding:12px;display:flex;flex-direction:column;gap:4px;font-size:12px;min-width:0}.fa-up b{font-size:14px}.fa-up .price{font-size:17px}') + `<div class="fa-up"><div style="background:#fff;border:1px solid var(--sline)"><b>Gym</b><span class="price">349 kr</span><span class="muted">per månad</span></div><div style="${s}"><span class="tag" style="align-self:flex-start;${dk ? 'background:rgba(255,255,255,.18);color:#fff' : ''}">Populärast</span><b>Gym + pass</b><span class="price">449 kr</span><span style="opacity:.75">per månad</span></div></div>`, 'background:#F6F6F4') })) },
      { id: 'fa-bg-mork-sektion', q: 'Får en mörk sektion bryta av en ljus sida?', layout: 'grid', opts: [
        ['Nej, hela sidan ljus', 'none'], ['Ja, i varumärkesfärgen', 'var(--brand)'], ['Ja, i nästan svart', '#16181B'],
      ].map(([l, bg]) => ({ l, h: wrap(css('.fa-ms{padding:14px 16px;display:flex;flex-direction:column;gap:5px}.fa-ms b{font-size:14px}.fa-ms i{display:block;height:6px;border-radius:3px;background:currentColor;opacity:.2}') + `<div class="fa-ms" style="background:#fff"><b>Våra tjänster</b><i style="width:86%"></i><i style="width:60%"></i></div><div class="fa-ms" style="background:${bg === 'none' ? '#F5F4F1' : bg};${bg === 'none' ? '' : 'color:#fff'}"><span class="small" style="opacity:.75">Siffror</span><div class="row" style="gap:18px"><span><b style="font-size:20px">1 240</b><br><span class="small" style="opacity:.75">sålda hem</span></span><span><b style="font-size:20px">4,9</b><br><span class="small" style="opacity:.75">i betyg</span></span></div></div><div class="fa-ms" style="background:#fff"><b>Kontakta oss</b><i style="width:80%"></i><i style="width:52%"></i></div>`, 'border:1px solid var(--sline)') })) },
    ]
  };
  // ---------- Grupp: textfärg ----------
  const ART = (o = {}) => `<div class="pad" style="flex:1;display:flex;flex-direction:column;justify-content:center;gap:9px;background:${o.bg || '#fff'};${o.s || ''}"><span class="eyebrow" style="${o.eye || ''}">${o.e || 'Kliniken Vasa'}</span><p class="h h2" style="${o.h || ''}">${o.t || 'Ont i ryggen efter vintern?'}</p><p style="${o.p || ''}">${o.b || 'De flesta ryggbesvär går över med rätt träning. Vi hjälper dig att komma igång igen, med ett program som passar din vardag.'}</p><p class="small muted" style="${o.m || ''}">${o.mt || 'Publicerad 12 mars · 3 min läsning'}</p></div>`;
  const gText = {
    key: 'textfarg', title: 'Textfärg', questions: [
      { id: 'fa-tx-brodtext', q: 'Vilken färg ska brödtexten ha?', layout: 'grid', opts: [
        ['Ren svart', '#000000'], ['Nästan svart', '#1A1C1E'], ['Mjuk grafit', '#33373C'], ['Varm mörkbrun', '#2B2521'],
      ].map(([l, c]) => ({ l: `${l} (${c})`, h: ART({ s: `--sink:${c};color:${c}` }) })) },
      { id: 'fa-tx-rubrik', q: 'Vilken färg ska rubrikerna ha?', layout: 'grid', opts: [
        { l: 'Samma som brödtexten', h: ART({ e: 'Lindqvist Bygg', t: 'Så renoverar vi ditt badrum', b: 'Vi river, bygger och kaklar, och du har en kontaktperson hela vägen.', mt: 'Tre veckor i snitt' }) },
        { l: 'Varumärkesfärgen', h: ART({ e: 'Lindqvist Bygg', t: 'Så renoverar vi ditt badrum', b: 'Vi river, bygger och kaklar, och du har en kontaktperson hela vägen.', mt: 'Tre veckor i snitt', h: 'color:var(--brand)' }) },
        { l: 'Mörk ton av varumärket', h: ART({ e: 'Lindqvist Bygg', t: 'Så renoverar vi ditt badrum', b: 'Vi river, bygger och kaklar, och du har en kontaktperson hela vägen.', mt: 'Tre veckor i snitt', h: 'color:#16263A' }) },
      ] },
      { id: 'fa-tx-sekundar', q: 'Hur ljus får sekundär text vara?', layout: 'grid', opts: [
        ['Mörkgrå (#4A4E54)', '#4A4E54'], ['Mellangrå (#5D6166)', '#5D6166'], ['Ljusgrå (#80858B)', '#80858B'],
      ].map(([l, c]) => ({ l, h: `<div class="pad stack" style="flex:1;justify-content:center;background:#fff"><div class="row" style="justify-content:space-between"><b>Dubbelrum med havsutsikt</b><span class="price">1 890 kr</span></div><p class="small" style="color:${c}">22 m² · Dubbelsäng · Balkong mot väster</p><p class="small" style="color:${c}">Frukost ingår. Avboka kostnadsfritt till dagen innan.</p><div class="divider"></div><div class="row" style="justify-content:space-between"><b>Familjerum</b><span class="price">2 490 kr</span></div><p class="small" style="color:${c}">30 m² · Fyra bäddar · Uteplats</p></div>` })) },
      { id: 'fa-tx-eyebrow', q: 'Vilken färg ska den lilla överrubriken ha?', layout: 'grid', opts: [
        ['Grå', 'color:var(--smuted)'], ['Varumärkesfärgen', 'color:var(--brand)'], ['Accentfärg', 'color:#A3442A'], ['Svart med versaler', 'color:var(--sink);text-transform:uppercase;letter-spacing:.08em;font-size:12px'],
      ].map(([l, s]) => ({ l, h: ART({ e: 'Hudvård', t: 'Ansiktsbehandling för torr vinterhud', b: 'Djuprengöring, mask och massage. Avslutas med råd för din hudtyp.', mt: '60 min · 995 kr', eye: s }) })) },
      { id: 'fa-tx-pris', q: 'Vilken färg ska priser ha?', layout: 'grid', opts: [
        ['Samma som texten', ''], ['Varumärkesfärgen', 'color:var(--brand)'], ['Grå och mindre', 'color:var(--smuted);font-weight:500;font-size:14px'],
      ].map(([l, s]) => ({ l, h: `<div class="pad stack" style="flex:1;justify-content:center;background:#fff;gap:12px">${[['Klippning kort hår', '45 min', '650 kr'], ['Klippning långt hår', '60 min', '790 kr'], ['Färg och klippning', '2 tim', '1 650 kr']].map(r => `<div class="row" style="justify-content:space-between;flex-wrap:nowrap"><span style="min-width:0"><b>${r[0]}</b><br><span class="small muted">${r[1]}</span></span><span class="price" style="white-space:nowrap;${s}">${r[2]}</span></div>`).join('<div class="divider"></div>')}</div>` })) },
      { id: 'fa-tx-ord-i-rubrik', q: 'Får ett ord i en stor rubrik färgas?', layout: 'grid', opts: [
        ['Nej, hela rubriken i samma färg', 'Kom hem till <span>rent</span>, varje vecka', ''], ['Ja, ett ord i varumärkesfärgen', 'Kom hem till <span style="color:var(--brand)">rent</span>, varje vecka', ''], ['Ja, med färgad understrykning', 'Kom hem till <span style="text-decoration:underline;text-decoration-color:#4FA3A0;text-decoration-thickness:4px;text-underline-offset:5px">rent</span>, varje vecka', ''], ['Ja, med tonad markering bakom', 'Kom hem till <span style="background:linear-gradient(transparent 55%,#CFE9E6 55%);padding:0 2px">rent</span>, varje vecka', ''],
      ].map(([l, t]) => ({ l, h: `<div class="pad stack" style="flex:1;justify-content:center;background:#fff;gap:10px;--brand:#13756D"><span class="eyebrow">Rent & Klart</span><p class="h" style="font-size:30px">${t}</p><p class="small muted">Hemstädning i Göteborg. RUT-avdrag direkt.</p></div>` })) },
      { id: 'fa-tx-pa-tonad', q: 'Vilken textfärg på en tonad yta?', layout: 'grid', opts: [
        ['Vanlig mörk text', '', ''], ['Mörk ton av ytans färg', 'color:#123B3F', 'color:#2F5458'],
      ].map(([l, h, p]) => ({ l, h: `<div class="pad stack" style="flex:1;justify-content:center;background:#DBE9EA;gap:8px"><span class="eyebrow" style="${p}">Fjällresor Norr</span><p class="h h2" style="${h}">Så packar du för fem dagar på leden</p><p style="${h}">Lätt ryggsäck, ull närmast kroppen och skor som är ingångna. Resten fixar vi.</p><p class="small" style="${p || 'color:var(--smuted)'}">Packlista att skriva ut</p></div>` })) },
      { id: 'fa-tx-citat', q: 'Hur ska citat i omdömen färgsättas?', layout: 'grid', opts: [
        ['Allt i vanlig textfärg', '', ''], ['Citattecken i varumärkesfärgen', 'q', ''], ['Citatet i varumärkesfärgen', '', 'color:var(--brand)'], ['Citatet i grått', '', 'color:var(--smuted)'],
      ].map(([l, mark, s]) => ({ l, h: `<div class="pad stack" style="flex:1;justify-content:center;background:#fff;gap:10px;--brand:#25553C">${mark ? '<span style="font-size:46px;line-height:.6;height:22px;color:var(--brand);font-weight:800;font-family:Georgia,serif">&ldquo;</span>' : ''}<p style="font-size:18px;font-weight:500;line-height:1.4;${s}">Rabatterna blev precis som vi drömt om, och de har skött dem i tre år nu.</p><p class="small"><b>Maria Holm</b> <span class="muted">· Villaägare i Höllviken</span></p></div>` })) },
    ]
  };

  // ---------- Grupp: accentfärgens användning ----------
  const ACC = '#C2551A';
  const gAcc = {
    key: 'accent', title: 'Accentfärgens användning', questions: [
      { id: 'fa-ac-var', q: 'Var får varumärkesfärgen synas?', layout: 'grid', opts: [
        { l: 'Bara på knappar', k: 0 }, { l: 'Knappar och länkar', k: 1 }, { l: 'Även ikoner och överrubriker', k: 2 }, { l: 'Även rubriker och ytor', k: 3 },
      ].map(({ l, k }) => ({ l, h: `<div class="pad stack" style="flex:1;justify-content:center;gap:10px;background:${k > 2 ? 'var(--tint)' : '#fff'};--brand:#0E5A63;--tint:#DBE9EA"><span class="eyebrow" style="${k > 1 ? 'color:var(--brand)' : ''}">Kliniken Vasa</span><p class="h h3" style="${k > 2 ? 'color:var(--brand)' : ''}">Fysioterapi utan remiss</p><div class="row" style="gap:8px;font-size:14px"><span style="color:${k > 1 ? 'var(--brand)' : 'var(--sink)'};display:inline-flex">${ic('clock')}</span>Tider samma vecka</div><div class="row" style="gap:8px;font-size:14px"><span style="color:${k > 1 ? 'var(--brand)' : 'var(--sink)'};display:inline-flex">${ic('shield')}</span>Legitimerad personal</div><div class="row"><span class="sb">Boka besök</span><span class="${k > 0 ? 'link' : ''}" style="${k > 0 ? '' : 'text-decoration:underline;text-underline-offset:3px;font-weight:600'}">Priser</span></div></div>` })) },
      { id: 'fa-ac-mangd', q: 'Hur mycket av sidan får vara i varumärkesfärgen?', layout: 'grid', opts: [
        ['Lite, runt 5 %', 0], ['Måttligt, runt 15 %', 1], ['Mycket, runt 30 %', 2],
      ].map(([l, k]) => ({ l, h: wrap(css('.fa-am i{display:block;height:6px;border-radius:3px;background:currentColor;opacity:.2}') + `<div class="fa-am" style="--brand:#25553C;display:flex;flex-direction:column;flex:1"><div style="display:flex;align-items:center;gap:8px;padding:10px 14px;background:${k > 1 ? 'var(--brand)' : '#fff'};color:${k > 1 ? '#fff' : 'var(--sink)'};border-bottom:1px solid var(--sline)"><b style="flex:1;font-size:13px">Grönt & Skönt</b><span class="sb" style="height:28px;font-size:12px;padding:0 10px;${k > 1 ? 'background:#fff;color:var(--brand);border-color:#fff' : ''}">Kontakt</span></div><div style="padding:16px 14px;display:flex;flex-direction:column;gap:7px;background:${k > 0 ? '#E1EADF' : '#fff'}"><b style="font-size:17px">Trädgårdar som växer med åren</b><i style="width:90%"></i><i style="width:66%"></i><span class="sb" style="height:32px;font-size:12px;padding:0 12px;align-self:flex-start">Boka platsbesök</span></div><div style="padding:12px 14px;display:grid;grid-template-columns:1fr 1fr;gap:8px;background:#fff">${['Anläggning', 'Skötsel'].map(t => `<div style="border:1px solid var(--sline);border-radius:8px;padding:10px;font-size:12px"><span style="color:${k > 0 ? 'var(--brand)' : 'var(--sink)'};display:block">${ic('leaf')}</span><b>${t}</b></div>`).join('')}</div><div style="padding:12px 14px;background:${k > 1 ? 'var(--brand)' : k > 0 ? 'var(--brand-d)' : '#F2F2F0'};color:${k > 0 ? '#fff' : 'var(--sink)'};font-size:12px;margin-top:auto">Skåne och Halland · 040-12 34 56</div></div>`, '') })) },
      { id: 'fa-ac-andra-farg', q: 'Behövs en andra accentfärg utöver huvudfärgen?', layout: 'grid', opts: [
        { l: 'Nej, bara huvudfärgen', a: 'var(--brand)', t: 'var(--tint)' }, { l: 'Ja, en varm kontrastfärg', a: '#C98A2B', t: '#F6E7CC' }, { l: 'Ja, en ljus ton av huvudfärgen', a: '#7FA3C9', t: '#E3ECF6' },
      ].map(({ l, a, t }) => ({ l, h: `<div class="pad stack" style="flex:1;justify-content:center;gap:10px;background:#fff"><div class="row" style="gap:8px"><span class="tag" style="background:${t};color:${a === 'var(--brand)' ? 'var(--brand)' : '#1A1C1E'}">Nyhet</span><span class="small muted">Hotell Strandvillan</span></div><p class="h h3">Vinterpaket med middag</p><div class="row" style="gap:8px;font-size:14px"><span style="color:${a};display:inline-flex">${ic('star')}</span><span><b>4,8</b> <span class="muted">av 312 gäster</span></span></div><div style="height:4px;border-radius:2px;background:#ECECEA"><div style="width:72%;height:100%;border-radius:2px;background:${a}"></div></div><div class="row"><span class="sb">Boka paket</span><span class="link">Se rummen</span></div></div>` })) },
      { id: 'fa-ac-storlek', q: 'I vilken storlek ska accentfärgen användas?', layout: 'grid', opts: [
        ['Små detaljer: linjer och prickar', 0], ['Mellan: knappar och ikoner', 1], ['Stora ytor: hela block', 2],
      ].map(([l, k]) => ({ l, h: `<div class="pad stack" style="flex:1;justify-content:center;gap:10px;background:#fff;--brand:#A3442A;--tint:#F1DFD3">${k === 2 ? `<div style="background:var(--brand);color:#fff;border-radius:var(--rc);padding:16px;display:flex;flex-direction:column;gap:6px"><b style="font-size:17px">Lunch vardagar 11–14</b><span class="small" style="opacity:.85">Dagens fisk 145 kr</span></div>` : `<div style="display:flex;flex-direction:column;gap:6px;${k === 0 ? 'border-left:3px solid var(--brand);padding-left:12px' : ''}"><b style="font-size:17px">Lunch vardagar 11–14</b><span class="small muted">Dagens fisk 145 kr</span></div>`}<div class="row" style="gap:8px;font-size:14px">${k === 0 ? '<span style="width:8px;height:8px;border-radius:50%;background:var(--brand)"></span>' : `<span style="color:${k === 1 ? 'var(--brand)' : 'var(--sink)'};display:inline-flex">${ic('clock')}</span>`}Öppet idag till 22</div><div class="row"><span class="sb" style="${k === 0 ? 'background:#1A1C1E;border-color:#1A1C1E' : ''}">Boka bord</span></div></div>` })) },
      { id: 'fa-ac-rubriklinje', q: 'Ska rubriker ha en färgad linje?', layout: 'grid', opts: [
        ['Ingen linje', ''], ['Kort linje ovanför', 'top'], ['Kort linje under', 'under'], ['Linje till vänster', 'left'],
      ].map(([l, k]) => ({ l, h: `<div class="pad stack" style="flex:1;justify-content:center;gap:10px;background:#fff;--brand:#1F3A5F">${k === 'top' ? '<span style="width:36px;height:3px;background:var(--brand);border-radius:2px"></span>' : ''}<p class="h h2" style="${k === 'left' ? 'border-left:4px solid var(--brand);padding-left:12px' : ''}">Våra tjänster</p>${k === 'under' ? '<span style="width:36px;height:3px;background:var(--brand);border-radius:2px"></span>' : ''}<p class="muted">Bokföring, löner och bokslut för små aktiebolag i Västsverige.</p></div>` })) },
      { id: 'fa-ac-ikonplatta', q: 'Hur ska tjänsteikoner färgsättas?', layout: 'grid', opts: [
        ['Ikon i varumärkesfärg på tonad platta', 'background:var(--tint);color:var(--brand)'], ['Vit ikon på fylld platta', 'background:var(--brand);color:#fff'], ['Ikon i varumärkesfärg, ingen platta', 'color:var(--brand);width:auto;height:auto'], ['Svart ikon, ingen platta', 'color:var(--sink);width:auto;height:auto'],
      ].map(([l, s]) => ({ l, h: `<div class="pad" style="flex:1;display:grid;grid-template-columns:1fr 1fr;gap:14px;align-content:center;background:#fff;--brand:#1B5B94;--tint:#DFE9F3">${[['tooth', 'Undersökning'], ['spark', 'Blekning'], ['shield', 'Akuttider'], ['user', 'Barntandvård']].map(([i, t]) => `<div class="stack" style="gap:6px"><span style="display:grid;place-items:center;width:40px;height:40px;border-radius:10px;${s}">${ic(i)}</span><b style="font-size:14px">${t}</b></div>`).join('')}</div>` })) },
      { id: 'fa-ac-siffror', q: 'Vilken färg ska stora nyckeltal ha?', layout: 'grid', opts: [
        ['Svart', 'var(--sink)'], ['Varumärkesfärgen', 'var(--brand)'], ['Accentfärg', ACC],
      ].map(([l, c]) => ({ l, h: `<div class="pad" style="flex:1;display:grid;grid-template-columns:1fr 1fr;gap:16px;align-content:center;background:#fff;--brand:#1F3A5F">${[['1 240', 'sålda bostäder'], ['4,9', 'snittbetyg'], ['18 dgr', 'snittid till försäljning'], ['12', 'mäklare']].map(([n, t]) => `<div><p style="font-size:28px;font-weight:800;letter-spacing:-.02em;line-height:1.1;color:${c}">${n}</p><p class="small muted">${t}</p></div>`).join('')}</div>` })) },
      { id: 'fa-ac-etikett', q: 'Hur ska en etikett som "Nyhet" se ut?', layout: 'grid', opts: [
        ['Tonad med färgad text', 'background:var(--tint);color:var(--brand)'], ['Fylld i varumärkesfärgen', 'background:var(--brand);color:#fff'], ['Kontur', 'background:transparent;color:var(--brand);box-shadow:inset 0 0 0 1px var(--brand)'], ['Svart', 'background:#1A1C1E;color:#fff'],
      ].map(([l, s]) => ({ l, h: `<div class="pad stack" style="flex:1;justify-content:center;gap:10px;background:#fff;--brand:#25553C;--tint:#E1EADF"><div style="position:relative;aspect-ratio:16/9;border-radius:var(--rc);background:#E9E6DF;display:grid;place-items:center;color:#8A857B">${ic('leaf', 'ico', 1.5)}<span class="tag" style="position:absolute;top:10px;left:10px;${s}">Nyhet</span></div><b>Skaljacka Vidd</b><span class="price">3 299 kr</span></div>` })) },
      { id: 'fa-ac-steg', q: 'Hur ska numrerade steg markeras?', layout: 'grid', opts: [
        ['Fylld cirkel', 'background:var(--brand);color:#fff'], ['Tonad cirkel', 'background:var(--tint);color:var(--brand)'], ['Kontur', 'box-shadow:inset 0 0 0 2px var(--brand);color:var(--brand)'], ['Bara siffran i färg', 'color:var(--brand);font-size:22px;width:auto'],
      ].map(([l, s]) => ({ l, h: `<div class="pad stack" style="flex:1;justify-content:center;gap:12px;background:#fff;--brand:#0E5A63;--tint:#DBE9EA">${[['Boka hembesök', 'Vi kommer ut och mäter.'], ['Få fast pris', 'Offert inom tre dagar.'], ['Vi bygger', 'En kontakt hela vägen.']].map(([t, d], i) => `<div class="row" style="flex-wrap:nowrap;align-items:flex-start"><span style="display:grid;place-items:center;width:32px;height:32px;border-radius:50%;font-weight:800;font-size:14px;flex:0 0 auto;${s}">${i + 1}</span><span><b>${t}</b><br><span class="small muted">${d}</span></span></div>`).join('')}</div>` })) },
      { id: 'fa-ac-kortkant', q: 'Får kort ha en färgad kant som markering?', layout: 'grid', opts: [
        ['Nej, inga färgade kanter', ''], ['Färgad kant överst', 'border-top:3px solid var(--brand)'], ['Färgad kant till vänster', 'border-left:3px solid var(--brand)'],
      ].map(([l, s]) => ({ l, h: `<div class="pad" style="flex:1;display:grid;grid-template-columns:1fr 1fr;gap:10px;align-content:center;background:#F2F3F4;--brand:#5D2A4D">${[['Ansikte', '60 min · 995 kr'], ['Massage', '50 min · 850 kr']].map(([t, d]) => `<div class="panel" style="padding:14px;${s}"><b>${t}</b><p class="small muted">${d}</p></div>`).join('')}</div>` })) },
      { id: 'fa-ac-cta-kontrast', q: 'Ska köpknappen ha samma färg som varumärket?', layout: 'grid', opts: [
        ['Samma som varumärket', 'var(--brand)', '#fff'], ['En kontrasterande varm färg', '#D2652A', '#fff'], ['Svart', '#161616', '#fff'],
      ].map(([l, b, t]) => ({ l, h: `<div style="flex:1;display:flex;flex-direction:column;--brand:#1F3A5F"><div style="display:flex;align-items:center;gap:10px;padding:12px 16px;background:#fff;border-bottom:1px solid var(--sline)"><b style="color:var(--brand);flex:1;font-size:14px">Fjällresor Norr</b><span class="small muted">Resor</span></div><div class="pad stack" style="background:var(--tint);gap:8px;flex:1;justify-content:center"><span class="eyebrow" style="color:var(--brand)">5 dagar · 8 900 kr</span><p class="h h3">Kungsleden med guide</p><p class="small muted">Avgångar i juli och augusti.</p><span class="sb" style="align-self:flex-start;background:${b};border-color:${b};color:${t}">Boka plats</span></div></div>` })) },
      { id: 'fa-ac-bockar', q: 'Vilken färg ska bockar i en lista ha?', layout: 'grid', opts: [
        ['Varumärkesfärgen', 'color:var(--brand)'], ['Grön', 'color:#1E7A45'], ['Svart', 'color:var(--sink)'], ['Bock i tonad cirkel', 'color:var(--brand);background:var(--tint);border-radius:50%;padding:3px;width:22px;height:22px'],
      ].map(([l, s]) => ({ l, h: `<div class="pad stack" style="flex:1;justify-content:center;gap:10px;background:#fff;--brand:#1F3A5F"><b>Det här ingår</b>${['Löpande bokföring', 'Momsdeklaration', 'Bokslut och årsredovisning', 'Egen konsult'].map(t => `<div class="row" style="gap:10px;font-size:14px;flex-wrap:nowrap"><svg class="ico" style="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I.check}</svg>${t}</div>`).join('')}</div>` })) },
    ]
  };
  window.QZ.part({ key: 'farg', groups: [gPal,gBg,gText,gAcc] });
})();
