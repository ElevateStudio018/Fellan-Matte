/* Elevate designquiz, del Knappar (kn-).
   Frågorna byggs med små generatorer. Varje fråga visar samma knapp i varianter
   där bara den egenskap som frågan gäller skiljer sig. */
(function () {
  // ---------- Ikoner (24-rutnät, linje) ----------
  const I = {
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    arrowLong: '<path d="M3 12h18M16 7l5 5-5 5"/>',
    arrowL: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
    chev: '<path d="M9 6l6 6-6 6"/>',
    chevL: '<path d="M15 6l-6 6 6 6"/>',
    chevD: '<path d="M6 9l6 6 6-6"/>',
    diag: '<path d="M7 17L17 7M8 7h9v9"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    check: '<path d="M5 12.5l4.5 4.5L19 7"/>',
    x: '<path d="M6 6l12 12M18 6L6 18"/>',
    copy: '<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V6a2 2 0 0 1 2-2h9"/>',
    share: '<path d="M12 3v12M7 8l5-5 5 5"/><path d="M5 13v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6"/>',
    shareNodes: '<circle cx="18" cy="5" r="2.5"/><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="19" r="2.5"/><path d="M8.2 10.8l7.6-4.4M8.2 13.2l7.6 4.4"/>',
    shareArrow: '<path d="M14 5l7 7-7 7"/><path d="M21 12h-9a8 8 0 0 0-8 8"/>',
    heart: '<path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.2a4.3 4.3 0 0 1 7.5 2.6C19.5 15.4 12 20 12 20z"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    menu2: '<path d="M4 9h16M4 15h16"/>',
    more: '<circle cx="5" cy="12" r="1.4" fill="currentColor"/><circle cx="12" cy="12" r="1.4" fill="currentColor"/><circle cx="19" cy="12" r="1.4" fill="currentColor"/>',
    moreV: '<circle cx="12" cy="5" r="1.4" fill="currentColor"/><circle cx="12" cy="12" r="1.4" fill="currentColor"/><circle cx="12" cy="19" r="1.4" fill="currentColor"/>',
    cart: '<path d="M3 4h2.2l2.3 11h10.3L20 8H6.4"/><circle cx="9.5" cy="19.5" r="1.4"/><circle cx="17" cy="19.5" r="1.4"/>',
    bag: '<path d="M5 8h14l-1 12H6L5 8z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>',
    download: '<path d="M12 4v11M7 10l5 5 5-5M5 20h14"/>',
    ext: '<path d="M14 4h6v6M20 4l-9 9M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5"/>',
    trash: '<path d="M4 7h16M10 7V4h4v3M6 7l1 13h10l1-13M10 11v6M14 11v6"/>',
    lock: '<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
    cal: '<rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M9 3v4M15 3v4"/>',
    search: '<circle cx="11" cy="11" r="6.5"/><path d="M20 20l-4.2-4.2"/>',
    edit: '<path d="M4 20h4L19 9l-4-4L4 16v4z"/>',
    grid: '<rect x="4" y="4" width="7" height="7" rx="1"/><rect x="13" y="4" width="7" height="7" rx="1"/><rect x="4" y="13" width="7" height="7" rx="1"/><rect x="13" y="13" width="7" height="7" rx="1"/>',
    list: '<path d="M9 6h11M9 12h11M9 18h11"/><circle cx="4.5" cy="6" r="1" fill="currentColor"/><circle cx="4.5" cy="12" r="1" fill="currentColor"/><circle cx="4.5" cy="18" r="1" fill="currentColor"/>',
    filter: '<path d="M4 6h16M7 12h10M10 18h4"/>',
    bell: '<path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15L6 16z"/><path d="M10 20.5a2 2 0 0 0 4 0"/>',
    chat: '<path d="M4 5h16v11H9l-5 4V5z"/>',
    circleArrow: '<circle cx="12" cy="12" r="9"/><path d="M8 12h8M13 9l3 3-3 3"/>'
  };
  const svg = (n, s = 20, sw = 2, st = '') =>
    `<svg class="ico" style="width:${s}px;height:${s}px;${st}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;

  // ---------- Byggstenar ----------
  // Knapp: B('Text', 'inline-stil', 'extra klasser'). Grund: .sb (primär) eller .sb2 (kontur).
  const B = (t, st = '', cls = 'sb') => `<span class="${cls}"${st ? ` style="${st}"` : ''}>${t}</span>`;
  const T = t => `<span>${t}</span>`;
  // Neutral scen, centrerad.
  const S = (inner, st = '') => `<div class="pad" style="display:flex;flex-wrap:wrap;gap:12px;align-items:center;justify-content:center;min-height:130px;${st}">${inner}</div>`;
  // Minimal kortkontext: rubrik, rad text och knapp(ar).
  const C = (inner, pst = '', rst = '') => `<div class="pad"><div class="panel stack" style="gap:12px;${pst}"><p class="h h3">Rubrik som är kort</p><p class="muted small">En kort rad text som förklarar vad som händer härnäst.</p><div class="row" style="margin-top:4px;${rst}">${inner}</div></div></div>`;
  // Liten bildtext under ett exempel.
  const cap = t => `<span class="small muted" style="display:block;text-align:center;margin-top:8px;font-size:12px">${t}</span>`;
  const fig = (inner, t) => `<div style="display:flex;flex-direction:column;align-items:center;min-width:0">${inner}${cap(t)}</div>`;
  // Två lägen bredvid varandra, t.ex. Normal och Hover.
  const states = (list, st = '') => S(list.map(([t, h]) => fig(h, t)).join(''), 'gap:18px;' + st);
  // Mobilram (max 220 px bred).
  const phone = (inner, st = '') => `<div class="pad" style="display:flex;justify-content:center"><div style="width:100%;max-width:220px;border:6px solid #1A1C1E;border-radius:26px;background:var(--box);overflow:hidden;position:relative;${st}">${inner}</div></div>`;
  const phoneText = '<div style="padding:16px 14px 0"><p class="h h3" style="font-size:17px">Rubrik som är kort</p><p class="muted small" style="margin-top:6px">En kort rad text som förklarar vad som händer härnäst.</p></div>';
  // Foto med toning.
  const photo = (inner, img = 'stadsgata', shade = 'rgba(0,0,0,.38)', st = '') =>
    `<div style="position:relative;min-height:190px;display:flex;align-items:center;justify-content:center;padding:20px;${st}"><img src="img/${img}.jpg" alt="Foto som bakgrund" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;max-width:none"><div style="position:absolute;inset:0;background:${shade}"></div><div style="position:relative;display:flex;flex-wrap:wrap;gap:12px;justify-content:center;align-items:center">${inner}</div></div>`;
  // Mörk yta.
  const DARK = '#15191E';
  const dark = (inner, st = '') => S(inner, `background:${DARK};color:#fff;${st}`);
  // Stil med respekt för reducerad rörelse.
  const css = (cls, rules) => `<style>${rules}@media (prefers-reduced-motion: reduce){.${cls},.${cls} span,.${cls} svg,.${cls} i{animation:none!important;transition:none!important}}</style>`;
  // Fältattrapp.
  const F = (t = 'E-post', st = '') => `<span class="inp ph" style="flex:1 1 120px;min-width:0;${st}">${t}</span>`;
  // Spinner.
  const SPIN = (cls, s = 16, w = 2, col = 'currentColor', track = 'transparent') =>
    `<i class="${cls}-sp" style="display:inline-block;width:${s}px;height:${s}px;border-radius:50%;border:${w}px solid ${track};border-top-color:${col};border-right-color:${col === 'currentColor' ? 'currentColor' : col};flex:0 0 auto"></i>`;
  const spinCss = cls => `.${cls}-sp{animation:${cls}-r .8s linear infinite}@keyframes ${cls}-r{to{transform:rotate(360deg)}}`;

  // ---------- Frågor ----------
  const G = [];
  let cur = null;
  const group = (key, title) => { cur = { key, title, questions: [] }; G.push(cur); };
  const q = (id, text, opts, layout = 'grid') => {
    cur.questions.push({ id, q: text, layout, opts: opts.map(([l, h]) => (h === undefined ? { l } : { l, h })) });
  };

  /* ===================== Primärknapp: rundning ===================== */
  group('primar-rundning', 'Primärknapp: rundning');
  q('kn-rund-oversikt', 'Hur rund ska primärknappen vara?', [
    ['0 px (helt skarp)', S(B('Boka tid', 'border-radius:0'))],
    ['4 px rundning', S(B('Boka tid', 'border-radius:4px'))],
    ['8 px rundning', S(B('Boka tid', 'border-radius:8px'))],
    ['12 px rundning', S(B('Boka tid', 'border-radius:12px'))],
    ['Pill (helt rund)', S(B('Boka tid', 'border-radius:999px'))]
  ]);
  q('kn-rund-skarp', 'Om knappen ska vara nästan skarp: hur mycket rundning?', [
    ['0 px', S(B('Skicka', 'border-radius:0'))],
    ['2 px', S(B('Skicka', 'border-radius:2px'))],
    ['4 px', S(B('Skicka', 'border-radius:4px'))]
  ]);
  q('kn-rund-mellan', 'Om knappen ska ha mellanrundning: vilken?', [
    ['6 px', S(B('Skicka', 'border-radius:6px'))],
    ['8 px', S(B('Skicka', 'border-radius:8px'))],
    ['10 px', S(B('Skicka', 'border-radius:10px'))]
  ]);
  q('kn-rund-mjuk', 'Om knappen ska vara mjuk: hur rund?', [
    ['12 px', S(B('Skicka', 'border-radius:12px'))],
    ['16 px', S(B('Skicka', 'border-radius:16px'))],
    ['Pill', S(B('Skicka', 'border-radius:999px'))]
  ]);
  q('kn-rund-mot-kort', 'Hur ska knappens rundning förhålla sig till kortets (12 px)?', [
    ['Skarpare än kortet (4 px)', C(B('Fortsätt', 'border-radius:4px'))],
    ['Lite skarpare (8 px)', C(B('Fortsätt', 'border-radius:8px'))],
    ['Samma som kortet (12 px)', C(B('Fortsätt', 'border-radius:12px'))],
    ['Pill i rundat kort', C(B('Fortsätt', 'border-radius:999px'))]
  ]);
  q('kn-rund-mot-falt', 'Hur ska knapp och fält bredvid varandra vara rundade?', [
    ['Lika rundning (8 px)', S(F() + B('Skicka', 'border-radius:8px'), 'flex-wrap:nowrap;gap:8px')],
    ['Båda pill', S(F('E-post', 'border-radius:999px;padding:0 18px') + B('Skicka', 'border-radius:999px'), 'flex-wrap:nowrap;gap:8px')],
    ['Fält 8 px, knapp pill', S(F() + B('Skicka', 'border-radius:999px'), 'flex-wrap:nowrap;gap:8px')],
    ['Båda nästan skarpa (2 px)', S(F('E-post', 'border-radius:2px') + B('Skicka', 'border-radius:2px'), 'flex-wrap:nowrap;gap:8px')]
  ]);
  {
    const trio = r => S(
      B('Liten', `height:36px;padding:0 14px;font-size:13px;border-radius:${r[0]}`) +
      B('Mellan', `height:44px;padding:0 20px;font-size:15px;border-radius:${r[1]}`) +
      B('Stor', `height:56px;padding:0 28px;font-size:17px;border-radius:${r[2]}`), 'gap:10px');
    q('kn-rund-skalning', 'Ska rundningen ändras med knappens storlek?', [
      ['Samma 8 px i alla storlekar', trio(['8px', '8px', '8px'])],
      ['Rundning växer (6, 8, 12 px)', trio(['6px', '8px', '12px'])],
      ['Pill i alla storlekar', trio(['999px', '999px', '999px'])]
    ]);
  }
  q('kn-rund-ikonknapp', 'Hur ska en ikonknapp bredvid primärknappen vara formad?', [
    ['Ikonknapp rund (cirkel)', S(B('Lägg i varukorgen', 'border-radius:8px') + B(svg('heart'), 'width:48px;padding:0;border-radius:50%', 'sb2'), 'gap:8px')],
    ['Samma rundning som knappen', S(B('Lägg i varukorgen', 'border-radius:8px') + B(svg('heart'), 'width:48px;padding:0;border-radius:8px', 'sb2'), 'gap:8px')]
  ]);

  /* ===================== Primärknapp: höjd och utfyllnad ===================== */
  group('primar-storlek', 'Primärknapp: höjd och utfyllnad');
  q('kn-hojd', 'Hur hög ska en vanlig primärknapp vara?', [
    ['40 px hög', S(B('Boka tid', 'height:40px'))],
    ['44 px hög', S(B('Boka tid', 'height:44px'))],
    ['48 px hög', S(B('Boka tid', 'height:48px'))],
    ['52 px hög', S(B('Boka tid', 'height:52px'))],
    ['56 px hög', S(B('Boka tid', 'height:56px'))]
  ]);
  q('kn-hojd-liten', 'Hur hög ska en liten knapp vara (i rader och listor)?', [
    ['36 px', S(`<span class="small muted">Rad i en lista</span>` + B('Visa', 'height:36px;padding:0 16px;font-size:14px'))],
    ['40 px', S(`<span class="small muted">Rad i en lista</span>` + B('Visa', 'height:40px;padding:0 16px;font-size:14px'))],
    ['44 px', S(`<span class="small muted">Rad i en lista</span>` + B('Visa', 'height:44px;padding:0 16px;font-size:14px'))]
  ]);
  q('kn-hojd-stor', 'Hur hög ska en stor knapp vara (till exempel överst på en sida)?', [
    ['52 px', S(B('Boka tid', 'height:52px;padding:0 28px;font-size:16px'))],
    ['56 px', S(B('Boka tid', 'height:56px;padding:0 30px;font-size:16px'))],
    ['60 px', S(B('Boka tid', 'height:60px;padding:0 32px;font-size:16px'))]
  ]);
  q('kn-sidopad', 'Hur mycket utfyllnad på sidorna?', [
    ['16 px på sidorna', S(B('Boka tid', 'padding:0 16px'))],
    ['20 px på sidorna', S(B('Boka tid', 'padding:0 20px'))],
    ['24 px på sidorna', S(B('Boka tid', 'padding:0 24px'))],
    ['32 px på sidorna', S(B('Boka tid', 'padding:0 32px'))]
  ]);
  q('kn-sidopad-pill', 'Om knappen är pill: hur mycket utfyllnad på sidorna?', [
    ['20 px', S(B('Boka tid', 'border-radius:999px;padding:0 20px'))],
    ['28 px', S(B('Boka tid', 'border-radius:999px;padding:0 28px'))],
    ['36 px', S(B('Boka tid', 'border-radius:999px;padding:0 36px'))]
  ]);
  q('kn-minbredd', 'Hur bred ska en knapp med kort text vara?', [
    ['Bredd efter texten', S(B('OK') + B('Spara'), 'gap:10px')],
    ['Minst 96 px bred', S(B('OK', 'min-width:96px') + B('Spara', 'min-width:96px'), 'gap:10px')],
    ['Minst 140 px bred', S(B('OK', 'min-width:140px') + B('Spara', 'min-width:140px'), 'gap:10px')]
  ]);
  q('kn-mobil-hojd', 'Hur hög ska knappen vara på mobil?', [
    ['48 px, samma som dator', phone(phoneText + `<div style="padding:16px 14px 18px">${B('Boka tid', 'width:100%;height:48px')}</div>`)],
    ['52 px på mobil', phone(phoneText + `<div style="padding:16px 14px 18px">${B('Boka tid', 'width:100%;height:52px')}</div>`)],
    ['56 px på mobil', phone(phoneText + `<div style="padding:16px 14px 18px">${B('Boka tid', 'width:100%;height:56px')}</div>`)]
  ]);
  q('kn-hojd-falt', 'Hur ska knappen sitta ihop med ett fält?', [
    ['Lika höga, bredvid varandra', S(F() + B('Skicka'), 'flex-wrap:nowrap;gap:8px')],
    ['Knappen lägre än fältet', S(F() + B('Skicka', 'height:40px;padding:0 18px'), 'flex-wrap:nowrap;gap:8px')],
    ['Knappen inuti fältet', S(`<span class="inp" style="flex:1 1 auto;min-width:0;padding:0 5px 0 14px;height:52px;gap:8px"><span class="muted" style="flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis">E-post</span>${B('Skicka', 'height:40px;padding:0 16px;border-radius:6px')}</span>`)],
    ['Sammanfogade utan glapp', S(F('E-post', 'border-radius:8px 0 0 8px;border-right:0') + B('Skicka', 'border-radius:0 8px 8px 0'), 'flex-wrap:nowrap;gap:0')]
  ]);

  /* ===================== Primärknapp: text ===================== */
  group('primar-text', 'Primärknapp: text');
  q('kn-vikt', 'Hur tung ska knapptexten vara?', [
    ['Medium (500)', S(B('Boka tid', 'font-weight:500'))],
    ['Halvfet (600)', S(B('Boka tid', 'font-weight:600'))],
    ['Fet (700)', S(B('Boka tid', 'font-weight:700'))],
    ['Extrafet (800)', S(B('Boka tid', 'font-weight:800'))]
  ]);
  q('kn-textstorlek', 'Hur stor ska knapptexten vara?', [
    ['14 px', S(B('Boka tid', 'font-size:14px'))],
    ['15 px', S(B('Boka tid', 'font-size:15px'))],
    ['16 px', S(B('Boka tid', 'font-size:16px'))],
    ['17 px', S(B('Boka tid', 'font-size:17px'))]
  ]);
  q('kn-versaler', 'Hur ska knapptexten skrivas?', [
    ['Som en mening: Boka tid', S(B('Boka tid'))],
    ['Versal varje ord: Boka Tid', S(B('Boka Tid'))],
    ['Bara versaler: BOKA TID', S(B('Boka tid', 'text-transform:uppercase;font-size:13px;letter-spacing:.06em'))]
  ]);
  q('kn-versal-sparrning', 'Om texten har versaler: hur mycket spärrning?', [
    ['Ingen spärrning', S(B('Boka tid', 'text-transform:uppercase;font-size:13px;letter-spacing:0'))],
    ['Lätt (0,04 em)', S(B('Boka tid', 'text-transform:uppercase;font-size:13px;letter-spacing:.04em'))],
    ['Tydlig (0,08 em)', S(B('Boka tid', 'text-transform:uppercase;font-size:13px;letter-spacing:.08em'))],
    ['Bred (0,12 em)', S(B('Boka tid', 'text-transform:uppercase;font-size:13px;letter-spacing:.12em'))]
  ]);
  q('kn-versal-storlek', 'Om texten har versaler: hur stor?', [
    ['12 px versaler', S(B('Boka tid', 'text-transform:uppercase;font-size:12px;letter-spacing:.06em'))],
    ['13 px versaler', S(B('Boka tid', 'text-transform:uppercase;font-size:13px;letter-spacing:.06em'))],
    ['14 px versaler', S(B('Boka tid', 'text-transform:uppercase;font-size:14px;letter-spacing:.06em'))]
  ]);
  q('kn-sparrning-gemen', 'Hur ska spärrningen vara i vanlig knapptext?', [
    ['Lite tätare (−0,01 em)', S(B('Lägg i varukorgen', 'letter-spacing:-.01em'))],
    ['Normal (0)', S(B('Lägg i varukorgen', 'letter-spacing:0'))],
    ['Lite luftigare (0,02 em)', S(B('Lägg i varukorgen', 'letter-spacing:.02em'))]
  ]);
  q('kn-textlangd', 'Hur lång ska en knapptext vara?', [
    ['Ett ord: Skicka', C(B('Skicka'))],
    ['Verb och sak: Skicka förfrågan', C(B('Skicka förfrågan'))],
    ['Hel fras: Skicka din förfrågan nu', C(B('Skicka din förfrågan nu', 'white-space:normal;text-align:center;line-height:1.2'))]
  ]);
  q('kn-mobil-textstorlek', 'Hur stor ska knapptexten vara på mobil?', [
    ['15 px', phone(phoneText + `<div style="padding:16px 14px 18px">${B('Boka tid', 'width:100%;font-size:15px')}</div>`)],
    ['16 px', phone(phoneText + `<div style="padding:16px 14px 18px">${B('Boka tid', 'width:100%;font-size:16px')}</div>`)],
    ['17 px', phone(phoneText + `<div style="padding:16px 14px 18px">${B('Boka tid', 'width:100%;font-size:17px')}</div>`)]
  ]);
  q('kn-textbrytning', 'Vad händer när knapptexten inte får plats?', [
    ['Texten bryts till två rader', S(`<div style="width:170px;max-width:100%">${B('Lägg till i önskelistan', 'width:100%;height:auto;min-height:48px;padding:8px 16px;white-space:normal;text-align:center;line-height:1.25')}</div>`)],
    ['Texten kortas med …', S(`<div style="width:170px;max-width:100%">${B('<span style="overflow:hidden;text-overflow:ellipsis;min-width:0">Lägg till i önskelistan</span>', 'width:100%;padding:0 16px')}</div>`)],
    ['Knappen får bli bredare', S(B('Lägg till i önskelistan'))]
  ]);
  q('kn-textjust-full', 'Hur ska innehållet ligga i en knapp med full bredd?', [
    ['Centrerad text', S(`<div style="width:100%;max-width:240px">${B('Fortsätt', 'width:100%')}</div>`)],
    ['Centrerad text med pil', S(`<div style="width:100%;max-width:240px">${B(T('Fortsätt') + svg('arrow', 18), 'width:100%')}</div>`)],
    ['Text vänster, pil längst till höger', S(`<div style="width:100%;max-width:240px">${B(T('Fortsätt') + svg('arrow', 18), 'width:100%;justify-content:space-between;padding:0 18px')}</div>`)]
  ]);

  /* ===================== Primärknapp: ikon ===================== */
  group('primar-ikon', 'Primärknapp: ikon');
  q('kn-ikon-plats', 'Ska primärknappen ha en ikon?', [
    ['Ingen ikon', S(B('Fortsätt'))],
    ['Ikon före texten', S(B(svg('arrow', 18) + T('Fortsätt')))],
    ['Ikon efter texten', S(B(T('Fortsätt') + svg('arrow', 18)))]
  ]);
  q('kn-ikon-typ', 'Vilken ikon ska sitta efter texten?', [
    ['Pil →', S(B(T('Läs mer') + svg('arrow', 18)))],
    ['Chevron ›', S(B(T('Läs mer') + svg('chev', 18)))],
    ['Diagonal pil ↗', S(B(T('Läs mer') + svg('diag', 18)))],
    ['Lång tunn pil', S(B(T('Läs mer') + svg('arrowLong', 22, 1.6)))]
  ]);
  q('kn-ikon-plus', 'Hur ska en knapp för att lägga till något se ut?', [
    ['Plus före texten', S(B(svg('plus', 18) + T('Lägg till')))],
    ['Plus efter texten', S(B(T('Lägg till') + svg('plus', 18)))],
    ['Ingen ikon', S(B('Lägg till'))]
  ]);
  q('kn-ikon-storlek', 'Hur stor ska ikonen i knappen vara?', [
    ['16 px', S(B(T('Fortsätt') + svg('arrow', 16)))],
    ['18 px', S(B(T('Fortsätt') + svg('arrow', 18)))],
    ['20 px', S(B(T('Fortsätt') + svg('arrow', 20)))],
    ['24 px', S(B(T('Fortsätt') + svg('arrow', 24)))]
  ]);
  q('kn-ikon-avstand', 'Hur stort avstånd mellan text och ikon?', [
    ['4 px', S(B(T('Fortsätt') + svg('arrow', 18), 'gap:4px'))],
    ['6 px', S(B(T('Fortsätt') + svg('arrow', 18), 'gap:6px'))],
    ['8 px', S(B(T('Fortsätt') + svg('arrow', 18), 'gap:8px'))],
    ['12 px', S(B(T('Fortsätt') + svg('arrow', 18), 'gap:12px'))]
  ]);
  q('kn-ikon-linje', 'Hur tjock ska ikonlinjen i knappen vara?', [
    ['1,5 px linje', S(B(T('Fortsätt') + svg('arrow', 18, 1.5)))],
    ['2 px linje', S(B(T('Fortsätt') + svg('arrow', 18, 2)))],
    ['2,5 px linje', S(B(T('Fortsätt') + svg('arrow', 18, 2.5)))]
  ]);
  q('kn-ikon-behallare', 'Ska pilen stå fritt eller sitta i en egen form?', [
    ['Pilen står fritt', S(B(T('Fortsätt') + svg('arrow', 18)))],
    ['Pilen i en ljus cirkel', S(B(T('Fortsätt') + `<span style="display:inline-grid;place-items:center;width:30px;height:30px;border-radius:50%;background:rgba(255,255,255,.18)">${svg('arrow', 16)}</span>`, 'padding:0 8px 0 22px;gap:12px'))],
    ['Pilen i en vit cirkel', S(B(T('Fortsätt') + `<span style="display:inline-grid;place-items:center;width:32px;height:32px;border-radius:50%;background:#fff;color:var(--brand)">${svg('arrow', 16)}</span>`, 'padding:0 8px 0 22px;gap:12px'))],
    ['Pilen i en egen ruta', S(B(T('Fortsätt') + `<span style="display:inline-grid;place-items:center;align-self:stretch;width:44px;margin-right:-24px;border-left:1px solid rgba(255,255,255,.25)">${svg('arrow', 18)}</span>`, 'gap:20px'))]
  ]);
  q('kn-ikon-utfyllnad', 'Ska utfyllnaden vara mindre på ikonsidan?', [
    ['Lika utfyllnad båda sidor', S(B(T('Fortsätt') + svg('arrow', 18), 'padding:0 24px'))],
    ['Mindre utfyllnad vid ikonen', S(B(T('Fortsätt') + svg('arrow', 18), 'padding:0 18px 0 24px'))]
  ]);
  q('kn-ikon-varukorg', 'Vilken ikon ska knappen "Lägg i varukorgen" ha?', [
    ['Varukorg före texten', S(B(svg('cart', 18) + T('Lägg i varukorgen')))],
    ['Kasse före texten', S(B(svg('bag', 18) + T('Lägg i varukorgen')))],
    ['Plus före texten', S(B(svg('plus', 18) + T('Lägg i varukorgen')))],
    ['Ingen ikon', S(B('Lägg i varukorgen'))]
  ]);
  q('kn-ikon-nedladdning', 'Var ska ikonen sitta på en knapp för nedladdning?', [
    ['Nedåtpil före texten', S(B(svg('download', 18) + T('Ladda ner')))],
    ['Nedåtpil efter texten', S(B(T('Ladda ner') + svg('download', 18)))],
    ['Ingen ikon', S(B('Ladda ner'))]
  ]);
  q('kn-ikon-extern', 'Hur ska en knapp som öppnar en annan webbplats märkas?', [
    ['Diagonal pil ↗ efter', S(B(T('Öppna sidan') + svg('diag', 18)))],
    ['Ruta med pil efter', S(B(T('Öppna sidan') + svg('ext', 18)))],
    ['Ingen markering', S(B('Öppna sidan'))]
  ]);
  q('kn-ikon-farg', 'Vilken färg ska ikonen ha i en fylld knapp?', [
    ['Samma som texten', S(B(T('Fortsätt') + svg('arrow', 18)))],
    ['Lite svagare än texten', S(B(T('Fortsätt') + svg('arrow', 18, 2, 'opacity:.65')))],
    ['Ljust tonad', S(B(T('Fortsätt') + svg('arrow', 18, 2, 'color:#AFC3D8')))]
  ]);
  q('kn-ikon-tillbaka', 'Hur ska en Tillbaka-knapp se ut?', [
    ['Pil vänster före texten', S(B(svg('arrowL', 18) + T('Tillbaka'), '', 'sb2'))],
    ['Chevron vänster före texten', S(B(svg('chevL', 18) + T('Tillbaka'), '', 'sb2'))],
    ['Bara text', S(B('Tillbaka', '', 'sb2'))]
  ]);
  q('kn-ikon-full-placering', 'Var ska pilen sitta i en knapp med full bredd?', [
    ['Pilen direkt efter texten', S(`<div style="width:100%;max-width:240px">${B(T('Till kassan') + svg('arrow', 18), 'width:100%')}</div>`)],
    ['Pilen längst till höger', S(`<div style="width:100%;max-width:240px">${B(T('Till kassan') + svg('arrow', 18, 2, 'position:absolute;right:18px'), 'width:100%;position:relative')}</div>`)]
  ]);

  /* ===================== Primärknapp: fyllning, skugga, kant och bredd ===================== */
  group('primar-yta', 'Primärknapp: fyllning, skugga, kant och bredd');
  q('kn-fyllning', 'Hur ska primärknappen vara fylld?', [
    ['Hel fyllning', S(B('Boka tid'))],
    ['Svag gradient', S(B('Boka tid', 'background:linear-gradient(180deg,#2F5378,#1C3450);border-color:transparent'))],
    ['Ingen fyllning (bara kontur)', S(B('Boka tid', '', 'sb2'))]
  ]);
  q('kn-gradient-typ', 'Om knappen har gradient: vilken sort?', [
    ['Uppifrån och ner, svag', S(B('Boka tid', 'background:linear-gradient(180deg,#2F5378,#1C3450);border-color:transparent'))],
    ['Diagonal', S(B('Boka tid', 'background:linear-gradient(135deg,#355C86,#1A3049);border-color:transparent'))],
    ['Glans i övre halvan', S(B('Boka tid', 'background:linear-gradient(180deg,rgba(255,255,255,.16),rgba(255,255,255,0) 55%),var(--brand);border-color:transparent'))]
  ]);
  q('kn-skugga', 'Ska primärknappen ha skugga?', [
    ['Ingen skugga', S(B('Boka tid'))],
    ['Hårfin skugga', S(B('Boka tid', 'box-shadow:0 1px 2px rgba(16,24,40,.18)'))],
    ['Mjuk skugga', S(B('Boka tid', 'box-shadow:0 8px 18px -6px rgba(16,24,40,.38)'))],
    ['Hård skugga (3D)', S(B('Boka tid', 'box-shadow:0 4px 0 #0F1E30'))]
  ]);
  q('kn-skugga-styrka', 'Om skuggan är mjuk: hur stark?', [
    ['Svag', S(B('Boka tid', 'box-shadow:0 4px 10px -4px rgba(16,24,40,.22)'))],
    ['Mellan', S(B('Boka tid', 'box-shadow:0 8px 18px -6px rgba(16,24,40,.36)'))],
    ['Tydlig', S(B('Boka tid', 'box-shadow:0 14px 28px -8px rgba(16,24,40,.5)'))]
  ]);
  q('kn-skugga-ton', 'Vilken ton ska en mjuk knappskugga ha?', [
    ['Neutral grå skugga', S(B('Boka tid', 'box-shadow:0 10px 22px -8px rgba(0,0,0,.45)'))],
    ['Skugga tonad i knappens färg', S(B('Boka tid', 'box-shadow:0 10px 22px -8px rgba(36,64,94,.75)'))]
  ]);
  q('kn-3d-djup', 'Om knappen har hård 3D-skugga: hur djup?', [
    ['2 px djup', S(B('Boka tid', 'box-shadow:0 2px 0 #0F1E30'))],
    ['4 px djup', S(B('Boka tid', 'box-shadow:0 4px 0 #0F1E30'))],
    ['6 px djup', S(B('Boka tid', 'box-shadow:0 6px 0 #0F1E30'))]
  ]);
  q('kn-kant', 'Ska den fyllda knappen ha en kant?', [
    ['Ingen synlig kant', S(B('Boka tid'))],
    ['1 px mörkare kant', S(B('Boka tid', 'border:1px solid #0F1E30'))],
    ['2 px mörkare kant', S(B('Boka tid', 'border:2px solid #0F1E30'))],
    ['Ljus innerkant upptill', S(B('Boka tid', 'box-shadow:inset 0 1px 0 rgba(255,255,255,.28)'))]
  ]);
  q('kn-farg-primar', 'Vilken grundton ska primärknappen ha?', [
    ['Varumärkesfärgen', C(B('Boka tid'))],
    ['Nästan svart', C(B('Boka tid', 'background:#1A1C1E;border-color:#1A1C1E'))]
  ]);
  q('kn-textkontrast', 'Hur ska text och yta i primärknappen kontrastera?', [
    ['Vit text på mörk yta', S(B('Boka tid'))],
    ['Mörk text på ljus yta', S(B('Boka tid', 'background:#C9D6E3;border-color:#C9D6E3;color:#13253A'))],
    ['Vit text på mellanton', S(B('Boka tid', 'background:#46698F;border-color:#46698F'))]
  ]);
  q('kn-bredd', 'Hur bred ska primärknappen vara i ett kort?', [
    ['Efter innehållet', C(B('Fortsätt'))],
    ['Fast bredd (180 px)', C(B('Fortsätt', 'width:180px;max-width:100%'))],
    ['Full bredd', C(B('Fortsätt', 'width:100%'))]
  ]);
  q('kn-bredd-mobil', 'Hur bred ska en ensam knapp vara på mobil?', [
    ['Efter innehållet', phone(phoneText + `<div style="padding:16px 14px 18px">${B('Boka tid')}</div>`)],
    ['Full bredd', phone(phoneText + `<div style="padding:16px 14px 18px">${B('Boka tid', 'width:100%')}</div>`)]
  ]);
  {
    const form = (btn, al = 'stretch') => `<div class="pad"><div class="panel stack" style="gap:12px"><div class="fld" style="flex:none"><span class="lbl">Namn</span><span class="inp ph">Förnamn och efternamn</span></div><div class="fld" style="flex:none"><span class="lbl">E-post</span><span class="inp ph">namn@exempel.se</span></div><div style="display:flex;flex-direction:column;align-items:${al};margin-top:4px">${btn}</div></div></div>`;
    q('kn-bredd-formular', 'Hur ska skicka-knappen sitta under ett formulär?', [
      ['Full bredd', form(B('Skicka'))],
      ['Efter innehållet, vänster', form(B('Skicka'), 'flex-start')],
      ['Efter innehållet, höger', form(B('Skicka'), 'flex-end')]
    ]);
  }

  /* ===================== Sekundärknapp ===================== */
  group('sekundar', 'Sekundärknapp');
  {
    const P = B('Boka tid');
    const two = s => S(P + s, 'gap:10px');
    q('kn-sek-typ', 'Hur ska sekundärknappen se ut?', [
      ['Kontur', two(B('Läs mer', '', 'sb2'))],
      ['Tonad yta', two(B('Läs mer', 'background:var(--tint);border-color:var(--tint)', 'sb2'))],
      ['Grå yta', two(B('Läs mer', 'background:#E7E7E4;border-color:#E7E7E4;color:var(--sink)', 'sb2'))],
      ['Bara text', two(B('Läs mer', 'background:transparent;border-color:transparent;padding:0 12px', 'sb2'))]
    ]);
    q('kn-sek-kontur-tjocklek', 'Om sekundärknappen har kontur: hur tjock?', [
      ['1 px kontur', two(B('Läs mer', 'border-width:1px', 'sb2'))],
      ['1,5 px kontur', two(B('Läs mer', 'border-width:1.5px', 'sb2'))],
      ['2 px kontur', two(B('Läs mer', 'border-width:2px', 'sb2'))]
    ]);
    q('kn-sek-kontur-farg', 'Vilken färg ska konturknappen ha?', [
      ['Kant och text i knappfärg', two(B('Läs mer', 'border-width:1.5px', 'sb2'))],
      ['Grå kant, mörk text', two(B('Läs mer', 'border:1.5px solid rgba(26,28,30,.22);color:var(--sink)', 'sb2'))],
      ['Mörk kant och text', two(B('Läs mer', 'border:1.5px solid var(--sink);color:var(--sink)', 'sb2'))]
    ]);
    q('kn-sek-tonad-styrka', 'Om sekundärknappen är tonad: hur stark ton?', [
      ['Lätt ton', two(B('Läs mer', 'background:#EEF2F6;border-color:#EEF2F6', 'sb2'))],
      ['Mellan', two(B('Läs mer', 'background:#DCE3EA;border-color:#DCE3EA', 'sb2'))],
      ['Tydlig ton', two(B('Läs mer', 'background:#C6D3E0;border-color:#C6D3E0', 'sb2'))]
    ]);
    q('kn-sek-tonad-text', 'Vilken textfärg i den tonade sekundärknappen?', [
      ['Text i knappfärg', two(B('Läs mer', 'background:var(--tint);border-color:var(--tint)', 'sb2'))],
      ['Mörk text', two(B('Läs mer', 'background:var(--tint);border-color:var(--tint);color:var(--sink)', 'sb2'))]
    ]);
    q('kn-sek-gra', 'Om sekundärknappen är neutral: vilken yta?', [
      ['Ljusgrå yta', two(B('Läs mer', 'background:#ECECE9;border-color:#ECECE9;color:var(--sink)', 'sb2'))],
      ['Mellangrå yta', two(B('Läs mer', 'background:#DEDEDA;border-color:#DEDEDA;color:var(--sink)', 'sb2'))],
      ['Vit yta med hårfin kant', two(B('Läs mer', 'background:#fff;border:1px solid rgba(26,28,30,.16);color:var(--sink)', 'sb2'))],
      ['Vit yta med mjuk skugga', two(B('Läs mer', 'background:#fff;border-color:#fff;color:var(--sink);box-shadow:0 1px 3px rgba(16,24,40,.14)', 'sb2'))]
    ]);
    q('kn-sek-textknapp', 'Om sekundärknappen bara är text: hur markeras den?', [
      ['Utan understrykning', two(B('Läs mer', 'background:transparent;border-color:transparent;padding:0 12px', 'sb2'))],
      ['Med understrykning', two(B('Läs mer', 'background:transparent;border-color:transparent;padding:0 12px;text-decoration:underline;text-underline-offset:4px', 'sb2'))],
      ['Med pil efter', two(B(T('Läs mer') + svg('arrow', 18), 'background:transparent;border-color:transparent;padding:0 12px;gap:6px', 'sb2'))]
    ]);
    q('kn-sek-understrykning', 'Om textknappen är understruken: hur?', [
      ['Tunn, nära texten', two(B('Läs mer', 'background:transparent;border-color:transparent;padding:0 12px;text-decoration:underline;text-decoration-thickness:1px;text-underline-offset:2px', 'sb2'))],
      ['Tunn, med luft', two(B('Läs mer', 'background:transparent;border-color:transparent;padding:0 12px;text-decoration:underline;text-decoration-thickness:1px;text-underline-offset:5px', 'sb2'))],
      ['Tjock, med luft', two(B('Läs mer', 'background:transparent;border-color:transparent;padding:0 12px;text-decoration:underline;text-decoration-thickness:2px;text-underline-offset:5px', 'sb2'))]
    ]);
    q('kn-sek-vikt', 'Ska sekundärknappen ha samma textvikt som primärknappen?', [
      ['Samma vikt (600)', two(B('Läs mer', 'border-width:1.5px', 'sb2'))],
      ['Lättare (500)', two(B('Läs mer', 'border-width:1.5px;font-weight:500', 'sb2'))]
    ]);
    q('kn-sek-hojd', 'Ska sekundärknappen vara lika hög som primärknappen?', [
      ['Lika hög', two(B('Läs mer', 'border-width:1.5px', 'sb2'))],
      ['Lägre (40 px)', two(B('Läs mer', 'border-width:1.5px;height:40px;padding:0 18px', 'sb2'))]
    ]);
    q('kn-sek-ikon', 'Ska sekundärknappen ha en pil?', [
      ['Utan pil', two(B('Läs mer', 'border-width:1.5px', 'sb2'))],
      ['Med pil efter', two(B(T('Läs mer') + svg('arrow', 18), 'border-width:1.5px', 'sb2'))]
    ]);
  }
  {
    const P = B('Boka tid');
    const onWhite = s => `<div class="pad"><div class="panel" style="display:flex;flex-wrap:wrap;gap:10px;justify-content:center;padding:28px 18px">${P}${s}</div></div>`;
    q('kn-sek-pa-vitt', 'Hur ska sekundärknappen se ut på en vit yta?', [
      ['Kontur', onWhite(B('Läs mer', 'border-width:1.5px', 'sb2'))],
      ['Tonad yta', onWhite(B('Läs mer', 'background:var(--tint);border-color:var(--tint)', 'sb2'))],
      ['Grå yta', onWhite(B('Läs mer', 'background:#ECECE9;border-color:#ECECE9;color:var(--sink)', 'sb2'))]
    ]);
    q('kn-sek-pa-gra', 'Hur ska sekundärknappen se ut på en ljusgrå yta?', [
      ['Genomskinlig med kontur', S(P + B('Läs mer', 'border-width:1.5px', 'sb2'), 'gap:10px')],
      ['Vit yta med hårfin kant', S(P + B('Läs mer', 'background:#fff;border:1px solid rgba(26,28,30,.14)', 'sb2'), 'gap:10px')],
      ['Vit yta utan kant', S(P + B('Läs mer', 'background:#fff;border-color:#fff', 'sb2'), 'gap:10px')]
    ]);
    const ph = s => photo(B('Boka tid', 'background:#fff;border-color:#fff;color:var(--sink)') + s);
    q('kn-sek-spok-foto', 'Hur ska en sekundärknapp på foto se ut?', [
      ['Vit kontur 1,5 px', ph(B('Läs mer', 'border:1.5px solid #fff;color:#fff', 'sb2'))],
      ['Vit kontur 2 px', ph(B('Läs mer', 'border:2px solid #fff;color:#fff', 'sb2'))],
      ['Frostat glas', ph(B('Läs mer', 'border:1px solid rgba(255,255,255,.35);color:#fff;background:rgba(255,255,255,.16);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px)', 'sb2'))],
      ['Halvgenomskinlig mörk', ph(B('Läs mer', 'border-color:transparent;color:#fff;background:rgba(0,0,0,.45)', 'sb2'))]
    ], 'grid');
    q('kn-sek-spok-kant', 'Om spökknappen har kontur: hur synlig ska kanten vara?', [
      ['Helvit kant', ph(B('Läs mer', 'border:1.5px solid #fff;color:#fff', 'sb2'))],
      ['Halvgenomskinlig kant', ph(B('Läs mer', 'border:1.5px solid rgba(255,255,255,.5);color:#fff', 'sb2'))]
    ]);
  }

  /* ===================== Tertiär- och textlänkknappar ===================== */
  group('tertiar', 'Tertiär- och textlänkknappar');
  {
    const L = (inner, st = '') => `<span style="display:inline-flex;align-items:center;gap:6px;color:var(--brand);font-weight:600;font-size:15px;cursor:pointer;${st}">${inner}</span>`;
    const ctx = l => C(l);
    q('kn-ter-stil', 'Hur ska en tertiär handling som "Läs mer" se ut?', [
      ['Text med pil', ctx(L(T('Läs mer') + svg('arrow', 18)))],
      ['Understruken text', ctx(L('Läs mer', 'text-decoration:underline;text-underline-offset:4px'))],
      ['Färgad text utan dekor', ctx(L('Läs mer'))],
      ['Liten tonad knapp', ctx(B('Läs mer', 'height:34px;padding:0 12px;font-size:14px;background:var(--tint);border-color:var(--tint);border-radius:8px', 'sb2'))]
    ]);
    q('kn-ter-pil-typ', 'Vilken pil passar efter en textlänk?', [
      ['Pil →', ctx(L(T('Läs mer') + svg('arrow', 18)))],
      ['Chevron ›', ctx(L(T('Läs mer') + svg('chev', 18)))],
      ['Diagonal pil ↗', ctx(L(T('Läs mer') + svg('diag', 18)))],
      ['Pil i cirkel', ctx(L(T('Läs mer') + svg('circleArrow', 22, 1.6), 'gap:8px'))]
    ]);
    q('kn-ter-pil-avstand', 'Hur stort avstånd mellan länktext och pil?', [
      ['4 px', ctx(L(T('Läs mer') + svg('arrow', 18), 'gap:4px'))],
      ['6 px', ctx(L(T('Läs mer') + svg('arrow', 18), 'gap:6px'))],
      ['10 px', ctx(L(T('Läs mer') + svg('arrow', 18), 'gap:10px'))]
    ]);
    q('kn-ter-vikt', 'Hur tung ska texten i en textlänkknapp vara?', [
      ['Medium (500)', ctx(L(T('Läs mer') + svg('arrow', 18), 'font-weight:500'))],
      ['Halvfet (600)', ctx(L(T('Läs mer') + svg('arrow', 18), 'font-weight:600'))],
      ['Fet (700)', ctx(L(T('Läs mer') + svg('arrow', 18), 'font-weight:700'))]
    ]);
    q('kn-ter-storlek', 'Hur stor ska texten i en textlänkknapp vara?', [
      ['14 px', ctx(L(T('Läs mer') + svg('arrow', 16), 'font-size:14px'))],
      ['15 px', ctx(L(T('Läs mer') + svg('arrow', 18), 'font-size:15px'))],
      ['16 px', ctx(L(T('Läs mer') + svg('arrow', 18), 'font-size:16px'))]
    ]);
    q('kn-ter-farg', 'Vilken färg ska en textlänkknapp ha?', [
      ['Knappfärgen', ctx(L(T('Läs mer') + svg('arrow', 18)))],
      ['Mörk text', ctx(L(T('Läs mer') + svg('arrow', 18), 'color:var(--sink)'))],
      ['Grå text', ctx(L(T('Läs mer') + svg('arrow', 18), 'color:var(--smuted)'))]
    ]);
    q('kn-ter-understrykning', 'När ska en textlänkknapp vara understruken?', [
      ['Alltid', states([['Normal', L('Läs mer', 'text-decoration:underline;text-underline-offset:4px')], ['Hover', L('Läs mer', 'text-decoration:underline;text-underline-offset:4px;color:var(--brand-d)')]])],
      ['Bara vid hover', states([['Normal', L('Läs mer')], ['Hover', L('Läs mer', 'text-decoration:underline;text-underline-offset:4px')]])],
      ['Aldrig', states([['Normal', L('Läs mer')], ['Hover', L('Läs mer', 'color:var(--brand-d)')]])]
    ]);
    const card = (foot, extra = '') => `<div class="pad"><div class="panel stack" style="gap:8px;position:relative;${extra}"><p class="h h3">Rubrik som är kort</p><p class="muted small">Två rader text som beskriver innehållet i kortet kort och neutralt.</p>${foot}</div></div>`;
    q('kn-ter-i-kort', 'Hur ska "Läs mer" se ut längst ner i ett kort?', [
      ['Textlänk med pil', card(`<div style="margin-top:6px">${L(T('Läs mer') + svg('arrow', 18))}</div>`)],
      ['Liten konturknapp', card(`<div style="margin-top:6px">${B('Läs mer', 'height:38px;padding:0 16px;font-size:14px;border-width:1.5px', 'sb2')}</div>`)],
      ['Pilknapp i hörnet', card(`<span style="position:absolute;right:14px;bottom:14px;display:grid;place-items:center;width:36px;height:36px;border-radius:50%;background:var(--tint);color:var(--brand)">${svg('arrow', 18)}</span>`, 'padding-bottom:58px')]
    ]);
    q('kn-ter-versaler', 'Ska textlänkknappen skrivas med versaler?', [
      ['Vanlig text', ctx(L(T('Läs mer') + svg('arrow', 18)))],
      ['Små versaler med spärrning', ctx(L(T('Läs mer') + svg('arrow', 16), 'text-transform:uppercase;font-size:13px;letter-spacing:.08em'))]
    ]);
    q('kn-ter-avbryt', 'Hur ska "Avbryt" se ut bredvid "Spara"?', [
      ['Textknapp', S(B('Avbryt', 'background:transparent;border-color:transparent;padding:0 14px;color:var(--sink)', 'sb2') + B('Spara'), 'gap:8px;justify-content:flex-end')],
      ['Grå knapp', S(B('Avbryt', 'background:#ECECE9;border-color:#ECECE9;color:var(--sink)', 'sb2') + B('Spara'), 'gap:8px;justify-content:flex-end')],
      ['Konturknapp', S(B('Avbryt', 'border:1.5px solid rgba(26,28,30,.22);color:var(--sink)', 'sb2') + B('Spara'), 'gap:8px;justify-content:flex-end')]
    ]);
  }

  // --- FLER GRUPPER ---

  window.QZ.part({ key: 'knappar', groups: G });
})();
