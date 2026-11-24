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
  window.QZ.part({ key: 'farg', groups: [gPal] });
})();
