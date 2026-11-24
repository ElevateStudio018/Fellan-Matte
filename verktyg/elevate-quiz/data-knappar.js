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

  /* ===================== Primär och sekundär bredvid varandra ===================== */
  group('par', 'Primär och sekundär bredvid varandra');
  {
    const P = (st = '') => B('Boka tid', st);
    const Sk = (st = '') => B('Läs mer', 'border-width:1.5px;' + st, 'sb2');
    const TL = (st = '') => `<span style="display:inline-flex;align-items:center;gap:6px;color:var(--brand);font-weight:600;padding:0 6px;${st}">${T('Läs mer')}${svg('arrow', 18)}</span>`;
    q('kn-par-ordning', 'I vilken ordning ska primär och sekundär stå?', [
      ['Primär först, sekundär efter', C(P() + Sk(), '', 'gap:10px')],
      ['Sekundär först, primär sist', C(Sk() + P(), '', 'gap:10px')]
    ]);
    q('kn-par-avstand', 'Hur stort avstånd mellan knapparna?', [
      ['8 px', C(P() + Sk(), '', 'gap:8px')],
      ['12 px', C(P() + Sk(), '', 'gap:12px')],
      ['16 px', C(P() + Sk(), '', 'gap:16px')],
      ['24 px', C(P() + Sk(), '', 'gap:24px')]
    ]);
    q('kn-par-storlek', 'Hur ska storleken på sekundären förhålla sig till primären?', [
      ['Lika stora', C(P() + Sk(), '', 'gap:10px')],
      ['Sekundären mindre', C(P() + Sk('height:40px;padding:0 16px;font-size:14px'), '', 'gap:10px')],
      ['Sekundären som textlänk', C(P() + TL(), '', 'gap:14px')]
    ]);
    q('kn-par-bredd', 'Ska två knappar bredvid varandra vara lika breda?', [
      ['Bredd efter innehållet', C(B('Lägg i varukorgen') + Sk(), '', 'gap:10px')],
      ['Lika breda', C(B('Lägg i varukorgen', 'flex:1 1 0;min-width:0') + Sk('flex:1 1 0;min-width:0'), '', 'gap:10px;flex-wrap:nowrap')]
    ]);
    const dlg = foot => `<div class="pad"><div class="panel stack" style="gap:10px;box-shadow:0 10px 30px -10px rgba(16,24,40,.3)"><p class="h h3">Spara ändringarna?</p><p class="muted small">Du har ändringar som inte är sparade.</p>${foot}</div></div>`;
    const A = (st = '') => B('Avbryt', 'border:1.5px solid rgba(26,28,30,.22);color:var(--sink);' + st, 'sb2');
    q('kn-par-dialog', 'Hur ska knapparna stå i en dialogruta?', [
      ['Höger: Avbryt, sedan Spara', dlg(`<div class="row" style="justify-content:flex-end;gap:8px;margin-top:6px">${A()}${B('Spara')}</div>`)],
      ['Vänster: Spara, sedan Avbryt', dlg(`<div class="row" style="justify-content:flex-start;gap:8px;margin-top:6px">${B('Spara')}${A()}</div>`)],
      ['Delad bredd, lika stora', dlg(`<div style="display:flex;gap:8px;margin-top:6px">${A('flex:1 1 0;min-width:0;padding:0 10px')}${B('Spara', 'flex:1 1 0;min-width:0;padding:0 10px')}</div>`)],
      ['Staplade, Spara överst', dlg(`<div class="stack" style="gap:8px;margin-top:6px">${B('Spara', 'width:100%')}${A('width:100%')}</div>`)]
    ]);
    q('kn-par-tredje', 'Hur ska en tredje handling visas?', [
      ['Tre knappar i rad', C(P('padding:0 18px') + Sk('padding:0 18px') + B('Dela', 'border:1.5px solid rgba(26,28,30,.22);color:var(--sink);padding:0 18px', 'sb2'), '', 'gap:8px')],
      ['Tredje som textlänk', C(P() + Sk() + `<span style="color:var(--sink);font-weight:600;text-decoration:underline;text-underline-offset:4px;padding:0 4px">Dela</span>`, '', 'gap:10px')],
      ['Tredje i en meny (…)', C(P() + Sk() + B(svg('more'), 'width:48px;padding:0;border:1.5px solid rgba(26,28,30,.22);color:var(--sink)', 'sb2'), '', 'gap:8px')]
    ]);
    q('kn-par-ikon', 'Vilka knappar i paret ska ha pil?', [
      ['Ingen av dem', C(P() + Sk(), '', 'gap:10px')],
      ['Bara primären', C(B(T('Boka tid') + svg('arrow', 18)) + Sk(), '', 'gap:10px')],
      ['Båda', C(B(T('Boka tid') + svg('arrow', 18)) + B(T('Läs mer') + svg('arrow', 18), 'border-width:1.5px', 'sb2'), '', 'gap:10px')]
    ]);
    q('kn-par-eller', 'Ska det stå något mellan knapparna?', [
      ['Bara mellanrum', C(P() + Sk(), '', 'gap:12px')],
      ['Ordet "eller" mellan', C(P() + '<span class="small muted">eller</span>' + Sk(), '', 'gap:12px')]
    ]);
    const txt = gap => `<div class="pad"><div class="panel"><p class="h h3">Rubrik som är kort</p><p class="muted small" style="margin-top:8px">En kort rad text som förklarar vad som händer härnäst.</p><div class="row" style="margin-top:${gap}px;gap:10px">${P()}${Sk()}</div></div></div>`;
    q('kn-par-avstand-text', 'Hur stort avstånd mellan texten och knapparna?', [
      ['16 px', txt(16)],
      ['24 px', txt(24)],
      ['32 px', txt(32)]
    ]);
  }

  /* ===================== Stapling på mobil ===================== */
  group('mobil', 'Stapling på mobil');
  {
    const P = (st = '') => B('Boka tid', st);
    const Sk = (st = '') => B('Läs mer', 'border-width:1.5px;' + st, 'sb2');
    const foot = (inner, st = '') => phone(phoneText + `<div style="padding:16px 14px 18px;${st}">${inner}</div>`);
    q('kn-mob-stapling', 'Hur ska två knappar stå på mobil?', [
      ['Bredvid varandra, halva bredden', foot(`<div style="display:flex;gap:8px">${P('flex:1 1 0;min-width:0;padding:0 8px')}${Sk('flex:1 1 0;min-width:0;padding:0 8px')}</div>`)],
      ['Staplade, full bredd', foot(`<div class="stack" style="gap:10px">${P('width:100%')}${Sk('width:100%')}</div>`)],
      ['Primär full bredd, textlänk under', foot(`<div class="stack" style="gap:12px;align-items:center">${P('width:100%')}<span style="color:var(--brand);font-weight:600;text-decoration:underline;text-underline-offset:4px">Läs mer</span></div>`)],
      ['Bredvid varandra, efter innehåll', foot(`<div style="display:flex;gap:8px;flex-wrap:wrap">${P('padding:0 18px')}${Sk('padding:0 18px')}</div>`)]
    ]);
    q('kn-mob-ordning', 'Om knapparna staplas: vilken ska stå överst?', [
      ['Primären överst', foot(`<div class="stack" style="gap:10px">${P('width:100%')}${Sk('width:100%')}</div>`)],
      ['Primären underst', foot(`<div class="stack" style="gap:10px">${Sk('width:100%')}${P('width:100%')}</div>`)]
    ]);
    q('kn-mob-avstand', 'Hur stort avstånd mellan staplade knappar?', [
      ['8 px', foot(`<div class="stack" style="gap:8px">${P('width:100%')}${Sk('width:100%')}</div>`)],
      ['12 px', foot(`<div class="stack" style="gap:12px">${P('width:100%')}${Sk('width:100%')}</div>`)],
      ['16 px', foot(`<div class="stack" style="gap:16px">${P('width:100%')}${Sk('width:100%')}</div>`)]
    ]);
    q('kn-mob-justering', 'Om knappen inte har full bredd på mobil: var ska den stå?', [
      ['Vänsterställd', foot(`<div style="display:flex;justify-content:flex-start">${P()}</div>`)],
      ['Centrerad', foot(`<div style="display:flex;justify-content:center">${P()}</div>`)]
    ]);
    const mdlg = inner => phone(`<div style="background:rgba(16,24,40,.45);padding:120px 0 0;min-height:330px;display:flex;flex-direction:column;justify-content:flex-end"><div style="background:var(--box);border-radius:18px 18px 0 0;padding:18px 14px"><p class="h h3" style="font-size:17px">Spara ändringarna?</p><p class="muted small" style="margin:6px 0 14px">Du har ändringar som inte är sparade.</p>${inner}</div></div>`);
    const A = (st = '') => B('Avbryt', 'border:1.5px solid rgba(26,28,30,.22);color:var(--sink);' + st, 'sb2');
    q('kn-mob-dialog', 'Hur ska knapparna stå i en dialog på mobil?', [
      ['Staplade, Spara överst', mdlg(`<div class="stack" style="gap:8px">${B('Spara', 'width:100%')}${A('width:100%')}</div>`)],
      ['Bredvid varandra, lika breda', mdlg(`<div style="display:flex;gap:8px">${A('flex:1 1 0;min-width:0;padding:0 8px')}${B('Spara', 'flex:1 1 0;min-width:0;padding:0 8px')}</div>`)]
    ]);
  }

  /* ===================== Hover ===================== */
  group('hover', 'Hover');
  // Visar Normal och Hover statiskt. Normal-knappen reagerar också när musen är över rutan.
  const TR = 'transition:background-color .18s ease,box-shadow .18s ease,transform .18s ease,color .18s ease,border-color .18s ease,text-decoration-color .18s ease';
  const hov = (cls, mk, hovInline, hovRule, extra = '') =>
    css(cls, `.${cls}-l{${TR}}.${cls}-l svg{transition:transform .18s ease}.opt:hover .${cls}-l{${hovRule}}${extra}`) +
    states([['Normal', mk(`${cls}-l`, '')], ['Hover', mk('', hovInline)]]);
  {
    const P = (c, st) => B('Boka tid', st, 'sb ' + c);
    q('kn-hover-typ', 'Vad ska hända med primärknappen vid hover?', [
      ['Blir mörkare', hov('kn-hv1a', P, 'background:#13253A;border-color:#13253A', 'background:#13253A;border-color:#13253A')],
      ['Blir ljusare', hov('kn-hv1b', P, 'background:#3A5F86;border-color:#3A5F86', 'background:#3A5F86;border-color:#3A5F86')],
      ['Lyfts med skugga', hov('kn-hv1c', P, 'transform:translateY(-2px);box-shadow:0 8px 16px -6px rgba(16,24,40,.45)', 'transform:translateY(-2px);box-shadow:0 8px 16px -6px rgba(16,24,40,.45)')],
      ['Tonas lätt (90 %)', hov('kn-hv1d', P, 'opacity:.88', 'opacity:.88')]
    ]);
    q('kn-hover-styrka', 'Om knappen blir mörkare vid hover: hur mycket?', [
      ['Lite mörkare', hov('kn-hv2a', P, 'background:#1D3650;border-color:#1D3650', 'background:#1D3650;border-color:#1D3650')],
      ['Tydligt mörkare', hov('kn-hv2b', P, 'background:#10202F;border-color:#10202F', 'background:#10202F;border-color:#10202F')]
    ]);
    const PA = (c, st) => B(T('Fortsätt') + svg('arrow', 18, 2, st), '', 'sb ' + c);
    q('kn-hover-pil', 'Ska pilen röra sig vid hover?', [
      ['Pilen flyttar sig 3 px', hov('kn-hv3a', PA, 'transform:translateX(3px)', '', `.opt:hover .kn-hv3a-l svg{transform:translateX(3px)}`)],
      ['Pilen flyttar sig 6 px', hov('kn-hv3b', PA, 'transform:translateX(6px)', '', `.opt:hover .kn-hv3b-l svg{transform:translateX(6px)}`)],
      ['Pilen står still', hov('kn-hv3c', PA, '', '')]
    ]);
    const SK = (c, st) => B('Läs mer', 'border-width:1.5px;' + st, 'sb2 ' + c);
    q('kn-hover-sek', 'Vad ska hända med konturknappen vid hover?', [
      ['Fylls helt', hov('kn-hv4a', SK, 'background:var(--brand);color:#fff', 'background:var(--brand);color:#fff')],
      ['Får en tonad yta', hov('kn-hv4b', SK, 'background:var(--tint)', 'background:var(--tint)')],
      ['Kanten blir mörkare', hov('kn-hv4c', SK, 'border-color:#0F1E30;color:#0F1E30', 'border-color:#0F1E30;color:#0F1E30')]
    ]);
    const TX = (c, st, ist = '') => `<span class="${c}" style="display:inline-flex;align-items:center;gap:6px;color:var(--brand);font-weight:600;text-decoration:underline;text-decoration-color:transparent;text-underline-offset:4px;${st}">${T('Läs mer')}${svg('arrow', 18, 2, ist)}</span>`;
    q('kn-hover-text', 'Vad ska hända med en textlänkknapp vid hover?', [
      ['Understrykning visas', hov('kn-hv5a', TX, 'text-decoration-color:currentColor', 'text-decoration-color:currentColor')],
      ['Färgen mörknar', hov('kn-hv5b', TX, 'color:#0F1E30', 'color:#0F1E30')],
      ['Pilen flyttar sig', hov('kn-hv5c', (c, st) => TX(c, st, c ? '' : 'transform:translateX(4px)'), '', '', '.opt:hover .kn-hv5c-l svg{transform:translateX(4px)}')],
      ['Tonad bakgrund visas', hov('kn-hv5d', TX, 'background:var(--tint);border-radius:6px', 'background:var(--tint)', '.kn-hv5d-l{padding:6px 8px;margin:-6px -8px;border-radius:6px}')]
    ]);
    // Fart: spelas upp i loop så att skillnaden syns utan mus.
    const loop = (cls, ms) => {
      const c = 2600, t = (ms / c) * 100, a = 30, b = 75;
      return css(cls, `.${cls}{animation:${cls}-k ${c}ms linear infinite}@keyframes ${cls}-k{0%,${a}%{background:#24405E;border-color:#24405E}${(a + t).toFixed(1)}%,${b}%{background:#10202F;border-color:#10202F}${(b + t).toFixed(1)}%,100%{background:#24405E;border-color:#24405E}}`) +
        S(fig(B('Boka tid', '', 'sb ' + cls), 'Spelas upp i loop'));
    };
    q('kn-hover-fart', 'Hur snabbt ska knappen byta läge vid hover?', [
      ['Snabbt (100 ms)', loop('kn-hv6a', 100)],
      ['Mellan (200 ms)', loop('kn-hv6b', 200)],
      ['Långsamt (350 ms)', loop('kn-hv6c', 350)]
    ]);
    const sweep = (cls, kind) => {
      const c = 2800;
      let k;
      if (kind === 'fade') k = `@keyframes ${cls}-k{0%,30%{background-color:transparent;color:var(--brand)}40%,80%{background-color:var(--brand);color:#fff}90%,100%{background-color:transparent;color:var(--brand)}}.${cls}{animation:${cls}-k ${c}ms ease infinite}`;
      else if (kind === 'sweep') k = `@keyframes ${cls}-k{0%,30%{background-size:0% 100%;color:var(--brand)}42%,80%{background-size:100% 100%;color:#fff}92%,100%{background-size:0% 100%;color:var(--brand)}}.${cls}{background-image:linear-gradient(var(--brand),var(--brand));background-repeat:no-repeat;background-position:left center;animation:${cls}-k ${c}ms ease infinite}`;
      else k = `@keyframes ${cls}-k{0%,34.9%{background-color:transparent;color:var(--brand)}35%,84.9%{background-color:var(--brand);color:#fff}85%,100%{background-color:transparent;color:var(--brand)}}.${cls}{animation:${cls}-k ${c}ms linear infinite}`;
      return css(cls, k) + S(fig(B('Läs mer', 'border-width:1.5px', 'sb2 ' + cls), 'Spelas upp i loop'));
    };
    q('kn-hover-fyllning', 'Om konturknappen fylls vid hover: hur?', [
      ['Fyllningen tonar in', sweep('kn-hv7a', 'fade')],
      ['Fyllningen sveper in från vänster', sweep('kn-hv7b', 'sweep')],
      ['Direkt, utan övergång', sweep('kn-hv7c', 'snap')]
    ]);
    q('kn-hover-lyft', 'Om knappen lyfts vid hover: hur mycket?', [
      ['1 px', hov('kn-hv8a', P, 'transform:translateY(-1px);box-shadow:0 4px 10px -4px rgba(16,24,40,.4)', 'transform:translateY(-1px);box-shadow:0 4px 10px -4px rgba(16,24,40,.4)')],
      ['2 px', hov('kn-hv8b', P, 'transform:translateY(-2px);box-shadow:0 8px 16px -6px rgba(16,24,40,.45)', 'transform:translateY(-2px);box-shadow:0 8px 16px -6px rgba(16,24,40,.45)')],
      ['4 px', hov('kn-hv8c', P, 'transform:translateY(-4px);box-shadow:0 12px 22px -8px rgba(16,24,40,.5)', 'transform:translateY(-4px);box-shadow:0 12px 22px -8px rgba(16,24,40,.5)')]
    ]);
    const IK = (c, st) => `<span class="${c}" style="display:inline-grid;place-items:center;width:44px;height:44px;border-radius:50%;color:var(--smuted);${st}">${svg('heart', 22)}</span>`;
    q('kn-hover-ikonknapp', 'Vad ska hända med en ikonknapp vid hover?', [
      ['Grå rund bakgrund visas', hov('kn-hv9a', IK, 'background:rgba(26,28,30,.08);color:var(--sink)', 'background:rgba(26,28,30,.08);color:var(--sink)')],
      ['Ikonen mörknar', hov('kn-hv9b', IK, 'color:var(--sink)', 'color:var(--sink)')],
      ['Ikonen får knappfärg', hov('kn-hv9c', IK, 'color:var(--brand);background:var(--tint)', 'color:var(--brand);background:var(--tint)')]
    ]);
    const GH = (c, st) => B('Läs mer', 'border:1.5px solid #fff;color:#fff;background:transparent;' + st, 'sb2 ' + c);
    const phov = (cls, hin, hr) => css(cls, `.${cls}-l{${TR}}.opt:hover .${cls}-l{${hr}}`) + photo(fig(GH(`${cls}-l`, ''), '<span style="color:#fff">Normal</span>') + fig(GH('', hin), '<span style="color:#fff">Hover</span>'));
    q('kn-hover-foto', 'Vad ska hända med en spökknapp på foto vid hover?', [
      ['Fylls vit, texten blir mörk', phov('kn-hv10a', 'background:#fff;color:var(--sink)', 'background:#fff;color:var(--sink)')],
      ['Får en halvgenomskinlig vit yta', phov('kn-hv10b', 'background:rgba(255,255,255,.2)', 'background:rgba(255,255,255,.2)')],
      ['Får en mörk yta', phov('kn-hv10c', 'background:rgba(0,0,0,.4)', 'background:rgba(0,0,0,.4)')]
    ]);
  }

  /* ===================== Tryck och aktivt läge ===================== */
  group('tryck', 'Tryck och aktivt läge');
  {
    const pr = (cls, mk, inl, rule) => css(cls, `.${cls}-l{transition:transform .1s ease,box-shadow .1s ease,background-color .1s ease}.opt:active .${cls}-l{${rule}}`) +
      states([['Normal', mk(`${cls}-l`, '')], ['Nedtryckt', mk('', inl)]]);
    const P = (c, st) => B('Boka tid', st, 'sb ' + c);
    q('kn-tryck-typ', 'Hur ska knappen se ut när den trycks ner?', [
      ['Krymper lite', pr('kn-pr1a', P, 'transform:scale(.96)', 'transform:scale(.96)')],
      ['Blir ännu mörkare', pr('kn-pr1b', P, 'background:#0C1825;border-color:#0C1825', 'background:#0C1825;border-color:#0C1825')],
      ['Ser intryckt ut (innerskugga)', pr('kn-pr1c', P, 'box-shadow:inset 0 3px 6px rgba(0,0,0,.35)', 'box-shadow:inset 0 3px 6px rgba(0,0,0,.35)')],
      ['Ingen synlig skillnad', pr('kn-pr1d', P, '', '')]
    ]);
    q('kn-tryck-skala', 'Om knappen krymper vid tryck: hur mycket?', [
      ['Nästan inget (98 %)', pr('kn-pr2a', P, 'transform:scale(.98)', 'transform:scale(.98)')],
      ['Lite (96 %)', pr('kn-pr2b', P, 'transform:scale(.96)', 'transform:scale(.96)')],
      ['Tydligt (92 %)', pr('kn-pr2c', P, 'transform:scale(.92)', 'transform:scale(.92)')]
    ]);
    const P3 = (c, st) => B('Boka tid', 'box-shadow:0 4px 0 #0F1E30;' + st, 'sb ' + c);
    q('kn-tryck-3d', 'Om knappen har 3D-skugga: hur långt trycks den ner?', [
      ['Halvvägs (2 px)', pr('kn-pr3a', P3, 'transform:translateY(2px);box-shadow:0 2px 0 #0F1E30', 'transform:translateY(2px);box-shadow:0 2px 0 #0F1E30')],
      ['Hela vägen (4 px)', pr('kn-pr3b', P3, 'transform:translateY(4px);box-shadow:0 0 0 #0F1E30', 'transform:translateY(4px);box-shadow:0 0 0 #0F1E30')]
    ]);
    q('kn-aktiv-toggle', 'Hur ska en av/på-knapp som "Spara" se ut när den är vald?', [
      ['Fylls när den är vald', states([['Av', B(svg('heart', 18) + T('Spara'), 'border-width:1.5px', 'sb2')], ['På', B(svg('heart', 18, 2, 'fill:currentColor') + T('Sparad'))]])],
      ['Bara ikonen fylls', states([['Av', B(svg('heart', 18) + T('Spara'), 'border-width:1.5px', 'sb2')], ['På', B(svg('heart', 18, 2, 'fill:currentColor') + T('Sparad'), 'border-width:1.5px', 'sb2')]])],
      ['Tonad yta och bock', states([['Av', B(svg('heart', 18) + T('Spara'), 'border-width:1.5px', 'sb2')], ['På', B(svg('check', 18) + T('Sparad'), 'border-width:1.5px;background:var(--tint)', 'sb2')]])]
    ]);
    const chip = (t, on, mode) => {
      const base = 'height:38px;padding:0 14px;font-size:14px;border-radius:999px;';
      if (!on) return B(t, base + 'border:1px solid rgba(26,28,30,.2);color:var(--sink);background:#fff', 'sb2');
      if (mode === 'fill') return B(t, base + 'background:var(--sink);border:1px solid var(--sink);color:#fff', 'sb2');
      if (mode === 'tint') return B(t, base + 'background:var(--tint);border:1px solid var(--brand);color:var(--brand)', 'sb2');
      return B(svg('check', 16) + T(t), base + 'border:1px solid rgba(26,28,30,.2);color:var(--sink);background:#fff;gap:6px;padding-left:10px', 'sb2');
    };
    const row = mode => S(chip('Alla', false, mode) + chip('Lediga', true, mode) + chip('Idag', false, mode), 'gap:8px');
    q('kn-aktiv-filter', 'Hur ska den valda knappen i en rad filterknappar se ut?', [
      ['Mörk fylld', row('fill')],
      ['Tonad med kant', row('tint')],
      ['Bock före texten', row('check')]
    ]);
  }

  /* ===================== Fokusring ===================== */
  group('fokus', 'Fokusring');
  {
    const P = st => S(fig(B('Skicka', st), 'Fokus (tangentbord)'));
    const ring = (col, w = 2, off = 2, bg = 'var(--ground)') => `box-shadow:0 0 0 ${off}px ${bg},0 0 0 ${off + w}px ${col}`;
    q('kn-fokus-typ', 'Hur ska fokusringen på en knapp se ut?', [
      ['Ring med glapp', P(ring('var(--brand)', 2, 3))],
      ['Ring direkt mot kanten', P('box-shadow:0 0 0 3px #7C9CC0')],
      ['Inre vit ring', P('box-shadow:inset 0 0 0 2px #fff,0 0 0 2px var(--brand)')],
      ['Mjuk glöd', P('box-shadow:0 0 0 4px rgba(36,64,94,.3)')]
    ]);
    q('kn-fokus-farg', 'Vilken färg ska fokusringen ha?', [
      ['Samma som knappen', P(ring('var(--brand)', 2, 3))],
      ['Svart', P(ring('#000', 2, 3))],
      ['Klarblå', P(ring('#2563EB', 2, 3))],
      ['Gul/orange', P(ring('#E59A00', 2, 3))]
    ]);
    q('kn-fokus-tjocklek', 'Hur tjock ska fokusringen vara?', [
      ['2 px', P(ring('var(--brand)', 2, 3))],
      ['3 px', P(ring('var(--brand)', 3, 3))],
      ['4 px', P(ring('var(--brand)', 4, 3))]
    ]);
    q('kn-fokus-avstand', 'Hur stort glapp mellan knapp och fokusring?', [
      ['Inget glapp', P(ring('#7C9CC0', 3, 0))],
      ['2 px glapp', P(ring('var(--brand)', 2, 2))],
      ['4 px glapp', P(ring('var(--brand)', 2, 4))]
    ]);
    q('kn-fokus-form', 'Ska fokusringen följa knappens form?', [
      ['Följer knappens rundning', P(ring('var(--brand)', 2, 3))],
      ['Rak rektangel runt knappen', S(fig(`<span style="display:inline-flex;outline:2px solid var(--brand);outline-offset:3px;border-radius:0">${B('Skicka')}</span>`, 'Fokus (tangentbord)'))]
    ]);
    const SK = st => S(fig(B('Läs mer', 'border-width:1.5px;' + st, 'sb2'), 'Fokus (tangentbord)'));
    q('kn-fokus-sek', 'Hur ska en konturknapp visa fokus?', [
      ['Ring utanför kanten', SK(ring('var(--brand)', 2, 3))],
      ['Kanten blir tjockare', SK('border-width:3px')],
      ['Tonad yta och ring', SK('background:var(--tint);' + ring('var(--brand)', 2, 3))]
    ]);
    const DK = st => dark(fig(B('Skicka', 'background:#fff;border-color:#fff;color:var(--sink);' + st), '<span style="color:#C9CDD2">Fokus på mörk yta</span>'));
    q('kn-fokus-mork', 'Vilken fokusring på mörk yta?', [
      ['Vit ring', DK(ring('#fff', 2, 3, DARK))],
      ['Ljusblå ring', DK(ring('#7FB2FF', 2, 3, DARK))],
      ['Gul ring', DK(ring('#FFC94A', 2, 3, DARK))]
    ]);
    q('kn-fokus-dubbel', 'Ska fokusringen vara enkel eller dubbel?', [
      ['Enkel ring', P(ring('var(--brand)', 2, 3))],
      ['Dubbel ring (vit och mörk)', P('box-shadow:0 0 0 2px #fff,0 0 0 4px #1A1C1E')]
    ]);
    const TL = st => S(fig(`<span style="display:inline-flex;align-items:center;gap:6px;color:var(--brand);font-weight:600;${st}">${T('Läs mer')}${svg('arrow', 18)}</span>`, 'Fokus (tangentbord)'));
    q('kn-fokus-textlank', 'Hur ska en textlänkknapp visa fokus?', [
      ['Ring runt texten', TL('outline:2px solid var(--brand);outline-offset:4px;border-radius:4px')],
      ['Tjock understrykning', TL('text-decoration:underline;text-decoration-thickness:3px;text-underline-offset:5px')],
      ['Markerad bakgrund', TL('background:#FFE58A;color:var(--sink);padding:2px 6px;margin:-2px -6px;border-radius:4px')]
    ]);
    q('kn-fokus-synlig', 'När ska fokusringen synas?', [
      ['Bara vid tangentbord'],
      ['Även vid klick med mus'],
      ['Även vid tryck på mobil']
    ]);
  }

  /* ===================== Inaktiv knapp ===================== */
  group('inaktiv', 'Inaktiv knapp');
  {
    const two = (dis, en = B('Skicka')) => states([['Aktiv', en], ['Inaktiv', dis]]);
    q('kn-inaktiv-typ', 'Hur ska en inaktiv primärknapp se ut?', [
      ['Blekt (40 % synlig)', two(B('Skicka', 'opacity:.4;cursor:not-allowed'))],
      ['Grå yta och grå text', two(B('Skicka', 'background:#E3E3E0;border-color:#E3E3E0;color:#8E9297;cursor:not-allowed'))],
      ['Streckad kant, ingen fyllning', two(B('Skicka', 'background:transparent;border:1.5px dashed #A3A6AA;color:#8E9297;cursor:not-allowed'))]
    ]);
    q('kn-inaktiv-opacitet', 'Om den inaktiva knappen är blekt: hur blek?', [
      ['30 % synlig', two(B('Skicka', 'opacity:.3'))],
      ['45 % synlig', two(B('Skicka', 'opacity:.45'))],
      ['60 % synlig', two(B('Skicka', 'opacity:.6'))]
    ]);
    q('kn-inaktiv-gra', 'Om den inaktiva knappen är grå: vilken grå?', [
      ['Ljusgrå yta, grå text', two(B('Skicka', 'background:#E6E6E3;border-color:#E6E6E3;color:#93979C'))],
      ['Mellangrå yta, vit text', two(B('Skicka', 'background:#B4B7BB;border-color:#B4B7BB;color:#fff'))]
    ]);
    const SK = st => B('Läs mer', 'border-width:1.5px;' + st, 'sb2');
    q('kn-inaktiv-sek', 'Hur ska en inaktiv konturknapp se ut?', [
      ['Blekt', two(SK('opacity:.4'), SK(''))],
      ['Grå kant och grå text', two(SK('border-color:#CFD1D3;color:#9A9DA1'), SK(''))],
      ['Streckad grå kant', two(SK('border:1.5px dashed #B4B7BB;color:#9A9DA1'), SK(''))]
    ]);
    const dis = 'background:#E3E3E0;border-color:#E3E3E0;color:#8E9297';
    q('kn-inaktiv-forklaring', 'Ska det framgå varför knappen är inaktiv?', [
      ['Ingen förklaring', S(B('Skicka', dis))],
      ['Hjälptext under knappen', S(`<div class="stack" style="align-items:center;gap:8px">${B('Skicka', dis)}<span class="small muted">Fyll i e-post för att skicka</span></div>`)],
      ['Låsikon i knappen', S(B(svg('lock', 16) + T('Skicka'), dis))]
    ]);
    const form = (fieldExtra, btn) => `<div class="pad"><div class="panel stack" style="gap:12px"><div class="fld" style="flex:none"><span class="lbl">E-post</span><span class="inp ph" style="${fieldExtra}">namn@exempel.se</span>${fieldExtra ? '<span class="small" style="color:var(--bad)">Fyll i din e-post</span>' : ''}</div>${btn}</div></div>`;
    q('kn-inaktiv-princip', 'Ska knappen vara inaktiv tills formuläret är ifyllt?', [
      ['Inaktiv tills allt är ifyllt', form('', B('Skicka', dis + ';width:100%'))],
      ['Alltid aktiv, fel visas vid klick', form('border-color:var(--bad)', B('Skicka', 'width:100%'))]
    ]);
    q('kn-inaktiv-ikon', 'Vad händer med pilen när knappen är inaktiv?', [
      ['Pilen blir lika blek som texten', two(B(T('Fortsätt') + svg('arrow', 18), dis), B(T('Fortsätt') + svg('arrow', 18)))],
      ['Pilen döljs', two(B('Fortsätt', dis), B(T('Fortsätt') + svg('arrow', 18)))]
    ]);
  }

  /* ===================== Laddar ===================== */
  group('laddar', 'Laddar');
  {
    // Spinner: ring med lucka, ring med spår, punkter.
    const ringGap = (cls, s = 16) => `<i class="${cls}-sp" style="display:inline-block;width:${s}px;height:${s}px;border-radius:50%;border:2px solid currentColor;border-right-color:transparent;flex:0 0 auto"></i>`;
    const ringTrack = (cls, s = 16) => `<i class="${cls}-sp" style="display:inline-block;width:${s}px;height:${s}px;border-radius:50%;border:2px solid rgba(255,255,255,.3);border-top-color:#fff;flex:0 0 auto"></i>`;
    const thin = (cls, s = 16) => `<i class="${cls}-sp" style="display:inline-block;width:${s}px;height:${s}px;border-radius:50%;border:1.5px solid transparent;border-top-color:currentColor;flex:0 0 auto"></i>`;
    const dots = cls => `<span style="display:inline-flex;gap:4px;align-items:center">${[0, 1, 2].map(i => `<i class="${cls}-d" style="display:block;width:6px;height:6px;border-radius:50%;background:currentColor;animation-delay:${i * 0.16}s"></i>`).join('')}</span>`;
    const dotCss = cls => `.${cls}-d{animation:${cls}-b 1s ease-in-out infinite}@keyframes ${cls}-b{0%,80%,100%{opacity:.3;transform:scale(.8)}40%{opacity:1;transform:scale(1)}}`;
    const ld = (cls, inner, st = '') => css(cls, spinCss(cls) + dotCss(cls)) + S(B(inner, 'min-width:150px;' + st));
    q('kn-laddar-typ', 'Hur ska knappen visa att något laddar?', [
      ['Spinner och text "Skickar…"', ld('kn-ld1a', ringGap('kn-ld1a') + T('Skickar…'))],
      ['Bara spinner', ld('kn-ld1b', ringGap('kn-ld1b', 18))],
      ['Bara text "Skickar…"', ld('kn-ld1c', T('Skickar…'))],
      ['Tre punkter', ld('kn-ld1d', dots('kn-ld1d'))]
    ]);
    q('kn-laddar-plats', 'Var ska spinnern sitta?', [
      ['Före texten', ld('kn-ld2a', ringGap('kn-ld2a') + T('Skickar…'))],
      ['Efter texten', ld('kn-ld2b', T('Skickar…') + ringGap('kn-ld2b'))]
    ]);
    q('kn-laddar-spinner', 'Hur ska spinnern se ut?', [
      ['Ring med lucka', ld('kn-ld3a', ringGap('kn-ld3a') + T('Skickar…'))],
      ['Ring med svagt spår', ld('kn-ld3b', ringTrack('kn-ld3b') + T('Skickar…'))],
      ['Tunn båge', ld('kn-ld3c', thin('kn-ld3c') + T('Skickar…'))],
      ['Pulserande punkter', ld('kn-ld3d', dots('kn-ld3d') + T('Skickar…'), 'gap:10px')]
    ]);
    q('kn-laddar-bredd', 'Ska knappen behålla sin bredd när den laddar?', [
      ['Behåller bredden', css('kn-ld4a', spinCss('kn-ld4a')) + states([['Normal', B('Skicka förfrågan', 'width:190px')], ['Laddar', B(ringGap('kn-ld4a'), 'width:190px')]])],
      ['Bredden följer innehållet', css('kn-ld4b', spinCss('kn-ld4b')) + states([['Normal', B('Skicka förfrågan')], ['Laddar', B(ringGap('kn-ld4b'))]])]
    ]);
    q('kn-laddar-ton', 'Ska knappen tonas ner medan den laddar?', [
      ['Full färg', ld('kn-ld5a', ringGap('kn-ld5a') + T('Skickar…'))],
      ['Lätt nedtonad', ld('kn-ld5b', ringGap('kn-ld5b') + T('Skickar…'), 'opacity:.7')]
    ]);
    q('kn-laddar-progress', 'Ska knappen visa hur långt det har kommit?', [
      ['Nej, bara spinner', ld('kn-ld6a', ringGap('kn-ld6a') + T('Laddar upp…'))],
      ['Fyllnad i knappen', css('kn-ld6b', '.kn-ld6b-f{animation:kn-ld6b-k 3s ease-in-out infinite}@keyframes kn-ld6b-k{0%{width:5%}90%,100%{width:100%}}') + S(B(`<i class="kn-ld6b-f" style="position:absolute;left:0;top:0;bottom:0;width:60%;background:rgba(255,255,255,.18)"></i>` + T('Laddar upp… 60 %'), 'position:relative;overflow:hidden;min-width:190px'))],
      ['Tunn stapel under knappen', css('kn-ld6c', '.kn-ld6c-f{animation:kn-ld6c-k 3s ease-in-out infinite}@keyframes kn-ld6c-k{0%{width:5%}90%,100%{width:100%}}') + S(`<div class="stack" style="gap:8px;width:190px">${B(T('Laddar upp…'), 'width:100%')}<span style="display:block;height:4px;border-radius:2px;background:var(--accent);overflow:hidden"><i class="kn-ld6c-f" style="display:block;height:100%;width:60%;background:var(--brand)"></i></span></div>`)]
    ]);
    q('kn-laddar-text', 'Vilken text ska knappen ha medan den laddar?', [
      ['Skickar…', ld('kn-ld7a', ringGap('kn-ld7a') + T('Skickar…'))],
      ['Vänta…', ld('kn-ld7b', ringGap('kn-ld7b') + T('Vänta…'))],
      ['Samma text: Skicka', ld('kn-ld7c', ringGap('kn-ld7c') + T('Skicka'))]
    ]);
    q('kn-laddar-storlek', 'Hur stor ska spinnern vara?', [
      ['14 px', ld('kn-ld8a', ringGap('kn-ld8a', 14) + T('Skickar…'))],
      ['16 px', ld('kn-ld8b', ringGap('kn-ld8b', 16) + T('Skickar…'))],
      ['20 px', ld('kn-ld8c', ringGap('kn-ld8c', 20) + T('Skickar…'))]
    ]);
  }

  /* ===================== Klart ===================== */
  group('klart', 'Klart-läge');
  {
    const two = done => states([['Före', B('Skicka', 'min-width:150px')], ['Klart', done]]);
    const OK = 'background:var(--ok);border-color:var(--ok);min-width:150px';
    q('kn-klart-typ', 'Hur ska knappen visa att det gick bra?', [
      ['Bock och grön yta', two(B(svg('check', 18) + T('Skickat'), OK))],
      ['Bock, samma färg', two(B(svg('check', 18) + T('Skickat'), 'min-width:150px'))],
      ['Bara texten byts', two(B('Skickat', 'min-width:150px'))],
      ['Knappen byts mot en textrad', two(`<span style="display:inline-flex;align-items:center;gap:8px;height:48px;color:var(--ok);font-weight:600">${svg('check', 18)}${T('Tack, vi har fått det')}</span>`)]
    ]);
    q('kn-klart-gron', 'Hur grön ska klart-knappen vara?', [
      ['Helgrön yta', two(B(svg('check', 18) + T('Skickat'), OK))],
      ['Ljusgrön yta, grön text', two(B(svg('check', 18) + T('Skickat'), 'background:#DDF0E4;border-color:#DDF0E4;color:var(--ok);min-width:150px'))],
      ['Grön kontur', two(B(svg('check', 18) + T('Skickat'), 'background:transparent;border:1.5px solid var(--ok);color:var(--ok);min-width:150px'))]
    ]);
    q('kn-klart-text', 'Vilken text ska klart-knappen ha?', [
      ['Klart', S(B(svg('check', 18) + T('Klart'), OK))],
      ['Skickat', S(B(svg('check', 18) + T('Skickat'), OK))],
      ['Tack!', S(B(svg('check', 18) + T('Tack!'), OK))]
    ]);
    const chk = (cls, kind) => {
      let k;
      if (kind === 'draw') k = `.${cls}-c path{stroke-dasharray:22;animation:${cls}-k 2.4s ease infinite}@keyframes ${cls}-k{0%,15%{stroke-dashoffset:22}40%,100%{stroke-dashoffset:0}}`;
      else if (kind === 'fade') k = `.${cls}-c{animation:${cls}-k 2.4s ease infinite}@keyframes ${cls}-k{0%,15%{opacity:0;transform:scale(.6)}40%,100%{opacity:1;transform:scale(1)}}`;
      else k = `.${cls}-c{animation:${cls}-k 2.4s steps(1) infinite}@keyframes ${cls}-k{0%{opacity:0}15%,100%{opacity:1}}`;
      return css(cls, k) + S(fig(B(`<svg class="ico ${cls}-c" style="width:18px;height:18px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I.check}</svg>` + T('Skickat'), OK), 'Spelas upp i loop'));
    };
    q('kn-klart-anim', 'Hur ska bocken dyka upp?', [
      ['Bocken ritas fram', chk('kn-ok4a', 'draw')],
      ['Bocken tonar och växer in', chk('kn-ok4b', 'fade')],
      ['Bocken syns direkt', chk('kn-ok4c', 'snap')]
    ]);
    q('kn-klart-tid', 'Hur länge ska klart-läget stå kvar?', [
      ['Står kvar tills sidan byts'],
      ['Återgår efter cirka 2 sekunder'],
      ['Ersätts av ett meddelande ovanför']
    ]);
  }

  /* ===================== Storlekar ===================== */
  group('storlekar', 'Storlekar');
  {
    const set = (hs, fs = [13, 15, 17], pads = [14, 20, 28], lab = ['Liten', 'Mellan', 'Stor']) =>
      S(hs.map((h, i) => B(lab[i], `height:${h}px;font-size:${fs[i]}px;padding:0 ${pads[i]}px`)).join(''), 'gap:10px');
    q('kn-storl-steg', 'Vilka höjder ska liten, mellan och stor knapp ha?', [
      ['32, 40 och 48 px', set([32, 40, 48])],
      ['36, 44 och 52 px', set([36, 44, 52])],
      ['40, 48 och 56 px', set([40, 48, 56])]
    ]);
    q('kn-storl-antal', 'Hur många knappstorlekar ska finnas?', [
      ['Två (mellan och stor)', set([40, 48], [14, 15], [16, 24], ['Mellan', 'Stor'])],
      ['Tre (liten, mellan, stor)', set([36, 44, 52])],
      ['Fyra (extra liten till stor)', set([30, 36, 44, 52], [12, 13, 15, 17], [10, 14, 20, 28], ['XS', 'Liten', 'Mellan', 'Stor'])]
    ]);
    q('kn-storl-text', 'Ska textstorleken ändras med knappstorleken?', [
      ['Samma text (15 px) i alla', set([36, 44, 52], [15, 15, 15])],
      ['Texten växer (13, 15, 17 px)', set([36, 44, 52], [13, 15, 17])]
    ]);
    q('kn-storl-utfyllnad', 'Ska sidoutfyllnaden ändras med storleken?', [
      ['Utfyllnaden växer (14, 20, 28)', set([36, 44, 52], [13, 15, 17], [14, 20, 28])],
      ['Samma utfyllnad (20 px)', set([36, 44, 52], [13, 15, 17], [20, 20, 20])]
    ]);
    const rowItem = btn => `<div class="pad"><div class="panel" style="display:flex;align-items:center;gap:12px;padding:14px 16px"><div style="flex:1;min-width:0"><p style="font-weight:600">Rad i en lista</p><p class="small muted">Kort beskrivning</p></div>${btn}</div></div>`;
    q('kn-storl-liten-stil', 'Hur ska en liten knapp i en listrad se ut?', [
      ['Liten fylld', rowItem(B('Välj', 'height:34px;padding:0 14px;font-size:14px;border-radius:8px'))],
      ['Liten tonad', rowItem(B('Välj', 'height:34px;padding:0 14px;font-size:14px;border-radius:8px;background:var(--tint);border-color:var(--tint)', 'sb2'))],
      ['Liten kontur', rowItem(B('Välj', 'height:34px;padding:0 14px;font-size:14px;border-radius:8px;border-width:1.5px', 'sb2'))],
      ['Textlänk', rowItem('<span style="color:var(--brand);font-weight:600;font-size:14px">Välj</span>')]
    ]);
    const iset = sizes => S([['Liten', 36, 13, 14], ['Mellan', 44, 15, 20], ['Stor', 52, 17, 28]].map(([t, h, f, p], i) => B(T(t) + svg('arrow', sizes[i]), `height:${h}px;font-size:${f}px;padding:0 ${p}px`)).join(''), 'gap:10px');
    q('kn-storl-ikon', 'Ska ikonen växa med knappstorleken?', [
      ['Ikonen växer (16, 18, 22 px)', iset([16, 18, 22])],
      ['Samma ikon (18 px) i alla', iset([18, 18, 18])]
    ]);
  }

  /* ===================== Ikonknappar ===================== */
  group('ikonknappar', 'Ikonknappar');
  {
    const IB = (icon, st = '', is = 20) => `<span style="display:inline-grid;place-items:center;width:44px;height:44px;flex:0 0 auto;color:var(--sink);${st}">${svg(icon, is)}</span>`;
    const trio = st => S(IB('heart', st) + IB('share', st) + IB('more', st), 'gap:10px');
    const GR = 'background:rgba(26,28,30,.07);';
    q('kn-ik-form', 'Vilken form ska ikonknappar ha?', [
      ['Rund', trio(GR + 'border-radius:50%')],
      ['Rundad fyrkant', trio(GR + 'border-radius:10px')],
      ['Bara ikonen, ingen yta', trio('')]
    ]);
    q('kn-ik-storlek', 'Hur stor ska en ikonknapp vara?', [
      ['32 px', S([32, 32, 32].map((s, i) => IB(['heart', 'share', 'more'][i], GR + `border-radius:50%;width:${s}px;height:${s}px`, 18)).join(''), 'gap:10px')],
      ['40 px', S(['heart', 'share', 'more'].map(n => IB(n, GR + 'border-radius:50%;width:40px;height:40px')).join(''), 'gap:10px')],
      ['44 px', S(['heart', 'share', 'more'].map(n => IB(n, GR + 'border-radius:50%;width:44px;height:44px')).join(''), 'gap:10px')],
      ['48 px', S(['heart', 'share', 'more'].map(n => IB(n, GR + 'border-radius:50%;width:48px;height:48px')).join(''), 'gap:10px')]
    ]);
    q('kn-ik-bakgrund', 'Vilken yta ska en ikonknapp ha?', [
      ['Ingen yta', trio('border-radius:50%')],
      ['Ljusgrå yta', trio(GR + 'border-radius:50%')],
      ['Tonad yta i knappfärg', trio('background:var(--tint);color:var(--brand);border-radius:50%')],
      ['Vit yta med kant', trio('background:#fff;border:1px solid rgba(26,28,30,.14);border-radius:50%')],
      ['Fylld i knappfärg', trio('background:var(--brand);color:#fff;border-radius:50%')]
    ]);
    q('kn-ik-kant', 'Om ikonknappen är vit: vilken kant?', [
      ['Ingen kant', trio('background:#fff;border-radius:50%')],
      ['Hårfin grå kant', trio('background:#fff;border:1px solid rgba(26,28,30,.14);border-radius:50%')],
      ['1,5 px mörk kant', trio('background:#fff;border:1.5px solid var(--sink);border-radius:50%')]
    ]);
    const dlg = (x, head = true, outside = false) => `<div class="pad" style="padding-top:${outside ? 30 : 20}px"><div class="panel stack" style="gap:8px;position:relative;box-shadow:0 10px 30px -10px rgba(16,24,40,.3);padding-right:${head ? 60 : 18}px">${x}<p class="h h3">Rubrik i dialogen</p><p class="muted small">En kort rad text i dialogrutan.</p></div></div>`;
    const X = st => `<span style="position:absolute;top:10px;right:10px;display:inline-grid;place-items:center;width:36px;height:36px;color:var(--sink);${st}">${svg('x', 20)}</span>`;
    q('kn-ik-stang', 'Hur ska stäng-krysset i en dialog se ut?', [
      ['Bara krysset', dlg(X(''))],
      ['Kryss i grå cirkel', dlg(X(GR + 'border-radius:50%'))],
      ['Kryss i rundad fyrkant', dlg(X(GR + 'border-radius:8px'))],
      ['Text "Stäng" och kryss', dlg(`<span style="position:absolute;top:14px;right:12px;display:inline-flex;align-items:center;gap:4px;font-size:13px;font-weight:600">Stäng${svg('x', 16)}</span>`, true)]
    ]);
    q('kn-ik-stang-plats', 'Var ska stäng-krysset sitta?', [
      ['Inne i övre hörnet', dlg(X(GR + 'border-radius:50%'))],
      ['På rubrikraden', `<div class="pad"><div class="panel stack" style="gap:8px;box-shadow:0 10px 30px -10px rgba(16,24,40,.3)"><div style="display:flex;align-items:center;gap:10px;justify-content:space-between"><p class="h h3">Rubrik i dialogen</p><span style="display:inline-grid;place-items:center;width:36px;height:36px;border-radius:50%;flex:0 0 auto;${GR}">${svg('x', 20)}</span></div><p class="muted small">En kort rad text i dialogrutan.</p></div></div>`],
      ['Utanför, över hörnet', dlg(`<span style="position:absolute;top:-14px;right:-10px;display:inline-grid;place-items:center;width:36px;height:36px;border-radius:50%;background:#fff;box-shadow:0 2px 8px rgba(16,24,40,.25)">${svg('x', 18)}</span>`, false, true)]
    ]);
    q('kn-ik-stang-storlek', 'Hur stort ska krysset vara?', [
      ['16 px', dlg(`<span style="position:absolute;top:10px;right:10px;display:inline-grid;place-items:center;width:36px;height:36px;border-radius:50%;${GR}">${svg('x', 16)}</span>`)],
      ['20 px', dlg(`<span style="position:absolute;top:10px;right:10px;display:inline-grid;place-items:center;width:36px;height:36px;border-radius:50%;${GR}">${svg('x', 20)}</span>`)],
      ['24 px', dlg(`<span style="position:absolute;top:10px;right:10px;display:inline-grid;place-items:center;width:36px;height:36px;border-radius:50%;${GR}">${svg('x', 24)}</span>`)]
    ]);
    const field = btn => S(`<div style="display:flex;align-items:center;gap:8px;width:100%;max-width:240px;height:48px;padding:0 6px 0 14px;background:#fff;border:1px solid var(--sline);border-radius:8px"><span style="flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">exempel.se/abc123</span>${btn}</div>`);
    q('kn-ik-kopiera', 'Hur ska kopiera-knappen i ett fält se ut?', [
      ['Bara ikon', field(IB('copy', GR + 'border-radius:6px;width:36px;height:36px', 18))],
      ['Ikon och text', field(`<span style="display:inline-flex;align-items:center;gap:6px;height:36px;padding:0 10px;border-radius:6px;font-size:14px;font-weight:600;flex:0 0 auto;${GR}">${svg('copy', 16)}Kopiera</span>`)],
      ['Bara text', field(`<span style="display:inline-flex;align-items:center;height:36px;padding:0 10px;border-radius:6px;font-size:14px;font-weight:600;flex:0 0 auto;${GR}">Kopiera</span>`)]
    ]);
    q('kn-ik-kopierad', 'Hur ska det synas att något har kopierats?', [
      ['Ikonen byts mot en bock', field(IB('check', 'background:#DDF0E4;color:var(--ok);border-radius:6px;width:36px;height:36px', 18))],
      ['Texten blir "Kopierad"', field(`<span style="display:inline-flex;align-items:center;gap:6px;height:36px;padding:0 10px;border-radius:6px;font-size:14px;font-weight:600;flex:0 0 auto;background:#DDF0E4;color:var(--ok)">${svg('check', 16)}Kopierad</span>`)],
      ['Liten bubbla "Kopierad"', `<div style="padding-top:18px">${field(`<span style="position:relative;display:inline-grid">${IB('copy', GR + 'border-radius:6px;width:36px;height:36px', 18)}<span style="position:absolute;bottom:44px;right:-6px;background:var(--sink);color:#fff;font-size:12px;font-weight:600;padding:4px 8px;border-radius:6px;white-space:nowrap">Kopierad</span></span>`)}</div>`]
    ]);
    q('kn-ik-dela', 'Vilken ikon ska dela-knappen ha?', [
      ['Pil upp ur en låda', S(IB('share', GR + 'border-radius:50%') + '<span class="small muted">Dela</span>')],
      ['Tre noder', S(IB('shareNodes', GR + 'border-radius:50%') + '<span class="small muted">Dela</span>')],
      ['Böjd pil', S(IB('shareArrow', GR + 'border-radius:50%') + '<span class="small muted">Dela</span>')]
    ]);
    const pc = h => `<div class="pad"><div style="position:relative;max-width:230px;margin:0 auto"><img class="pic" src="img/produkt-stol.jpg" alt="Produktbild" style="aspect-ratio:1/1">${h}</div></div>`;
    q('kn-ik-favorit-bild', 'Hur ska favoritknappen på en bild se ut?', [
      ['Hjärta i vit cirkel', pc(`<span style="position:absolute;top:10px;right:10px;display:inline-grid;place-items:center;width:38px;height:38px;border-radius:50%;background:#fff;color:var(--sink)">${svg('heart', 20)}</span>`)],
      ['Bara hjärta med skugga', pc(`<span style="position:absolute;top:10px;right:10px;display:inline-grid;place-items:center;width:38px;height:38px;color:#fff;filter:drop-shadow(0 1px 3px rgba(0,0,0,.5))">${svg('heart', 24)}</span>`)],
      ['Hjärta i vit rundad fyrkant', pc(`<span style="position:absolute;top:10px;right:10px;display:inline-grid;place-items:center;width:38px;height:38px;border-radius:9px;background:#fff;color:var(--sink)">${svg('heart', 20)}</span>`)],
      ['Hjärta på frostat glas', pc(`<span style="position:absolute;top:10px;right:10px;display:inline-grid;place-items:center;width:38px;height:38px;border-radius:50%;background:rgba(255,255,255,.3);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);color:#fff">${svg('heart', 20)}</span>`)]
    ]);
    const fav = col => states([['Inte vald', IB('heart', 'background:#fff;border:1px solid rgba(26,28,30,.14);border-radius:50%', 22)], ['Vald', IB('heart', `background:#fff;border:1px solid rgba(26,28,30,.14);border-radius:50%;color:${col}`, 22).replace('fill="none"', `fill="${col}"`)]]);
    q('kn-ik-favorit-vald', 'Hur ska ett valt favorithjärta se ut?', [
      ['Fyllt rött', fav('#D92D3A')],
      ['Fyllt i knappfärg', fav('#24405E')],
      ['Fyllt svart', fav('#1A1C1E')]
    ]);
    const hdr = btn => `<div class="pad"><div class="panel" style="display:flex;align-items:center;justify-content:space-between;padding:10px 10px 10px 16px"><span style="font-weight:800">Logotyp</span>${btn}</div></div>`;
    const bars = (paths, w = 22) => `<svg class="ico" style="width:${w}px;height:${w}px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">${paths}</svg>`;
    const MB = inner => `<span style="display:inline-flex;align-items:center;gap:8px;height:44px;padding:0 11px;color:var(--sink);font-weight:600">${inner}</span>`;
    q('kn-ik-meny', 'Hur ska menyknappen se ut?', [
      ['Tre lika långa streck', hdr(MB(bars(I.menu)))],
      ['Två streck', hdr(MB(bars(I.menu2)))],
      ['Tre streck, olika långa', hdr(MB(bars('<path d="M4 7h16M4 12h11M4 17h16"/>')))],
      ['Ordet Meny och streck', hdr(MB(T('Meny') + bars(I.menu, 20)))]
    ]);
    q('kn-ik-mer', 'Hur ska knappen för fler val (…) se ut?', [
      ['Tre punkter vågrätt', S(IB('more', GR + 'border-radius:50%'))],
      ['Tre punkter lodrätt', S(IB('moreV', GR + 'border-radius:50%'))]
    ]);
    q('kn-ik-tooltip', 'Ska en ikonknapp visa en förklaring vid hover?', [
      ['Ja, liten bubbla med text', S(`<span style="position:relative;display:inline-grid;margin-top:34px">${IB('share', GR + 'border-radius:50%')}<span style="position:absolute;bottom:52px;left:50%;transform:translateX(-50%);background:var(--sink);color:#fff;font-size:12px;font-weight:600;padding:4px 8px;border-radius:6px;white-space:nowrap">Dela</span></span>`)],
      ['Nej, bara ikonen', S(`<span style="display:inline-grid;margin-top:34px">${IB('share', GR + 'border-radius:50%')}</span>`)],
      ['Text bredvid ikonen i stället', S(`<span style="display:inline-flex;align-items:center;gap:6px;height:44px;padding:0 14px 0 10px;border-radius:999px;font-weight:600;margin-top:34px;${GR}">${svg('share', 20)}Dela</span>`)]
    ]);
    q('kn-ik-ikonstorlek', 'Hur stor ska ikonen vara i en 44 px ikonknapp?', [
      ['16 px ikon', S(['heart', 'share', 'more'].map(n => IB(n, GR + 'border-radius:50%', 16)).join(''), 'gap:10px')],
      ['20 px ikon', S(['heart', 'share', 'more'].map(n => IB(n, GR + 'border-radius:50%', 20)).join(''), 'gap:10px')],
      ['24 px ikon', S(['heart', 'share', 'more'].map(n => IB(n, GR + 'border-radius:50%', 24)).join(''), 'gap:10px')]
    ]);
    const tb = ['edit', 'copy', 'share', 'trash'];
    q('kn-ik-verktygsrad', 'Hur ska flera ikonknappar i en rad grupperas?', [
      ['Sammanfogade med delare', S(`<span style="display:inline-flex;background:#fff;border:1px solid rgba(26,28,30,.14);border-radius:10px;overflow:hidden">${tb.map((n, i) => IB(n, i ? 'border-left:1px solid rgba(26,28,30,.12)' : '')).join('')}</span>`)],
      ['Separata, 4 px mellanrum', S(tb.map(n => IB(n, 'background:#fff;border:1px solid rgba(26,28,30,.14);border-radius:10px')).join(''), 'gap:4px')],
      ['Separata, 10 px mellanrum', S(tb.map(n => IB(n, 'background:#fff;border:1px solid rgba(26,28,30,.14);border-radius:10px')).join(''), 'gap:10px')],
      ['Bara ikoner utan ytor', S(tb.map(n => IB(n, '')).join(''), 'gap:4px')]
    ]);
  }

  /* ===================== Knappar på foto och mörk yta ===================== */
  group('foto-mork', 'Knappar på foto och mörk yta');
  {
    q('kn-foto-primar', 'Hur ska primärknappen se ut på ett foto?', [
      ['Fylld i knappfärg', photo(B('Boka tid'))],
      ['Vit med mörk text', photo(B('Boka tid', 'background:#fff;border-color:#fff;color:var(--sink)'))],
      ['Vit kontur (spökknapp)', photo(B('Boka tid', 'background:transparent;border:2px solid #fff;color:#fff'))]
    ]);
    q('kn-foto-toning', 'Hur mycket ska fotot tonas bakom knappen?', [
      ['Ingen toning', photo(B('Boka tid', 'background:#fff;border-color:#fff;color:var(--sink)'), 'stadsgata', 'transparent')],
      ['Lätt toning över allt', photo(B('Boka tid', 'background:#fff;border-color:#fff;color:var(--sink)'), 'stadsgata', 'rgba(0,0,0,.3)')],
      ['Mörk toning nedtill', photo(B('Boka tid', 'background:#fff;border-color:#fff;color:var(--sink)'), 'stadsgata', 'linear-gradient(180deg,rgba(0,0,0,0) 20%,rgba(0,0,0,.65))', 'align-items:flex-end')]
    ]);
    q('kn-foto-skugga', 'Ska en vit knapp på foto ha skugga?', [
      ['Ingen skugga', photo(B('Boka tid', 'background:#fff;border-color:#fff;color:var(--sink)'), 'skog-sjo', 'rgba(0,0,0,.15)')],
      ['Mjuk skugga', photo(B('Boka tid', 'background:#fff;border-color:#fff;color:var(--sink);box-shadow:0 8px 20px -6px rgba(0,0,0,.5)'), 'skog-sjo', 'rgba(0,0,0,.15)')]
    ]);
    q('kn-mork-primar', 'Hur ska primärknappen se ut på en mörk yta?', [
      ['Vit med mörk text', dark(B('Boka tid', 'background:#fff;border-color:#fff;color:var(--sink)'))],
      ['Ljus ton med mörk text', dark(B('Boka tid', 'background:#C9D6E3;border-color:#C9D6E3;color:#13253A'))],
      ['Knappfärgen som vanligt', dark(B('Boka tid'))],
      ['Knappfärgen med ljus kant', dark(B('Boka tid', 'border:1px solid rgba(255,255,255,.35)'))]
    ]);
    const W = B('Boka tid', 'background:#fff;border-color:#fff;color:var(--sink)');
    q('kn-mork-sek', 'Hur ska sekundärknappen se ut på en mörk yta?', [
      ['Vit kontur', dark(W + B('Läs mer', 'background:transparent;border:1.5px solid rgba(255,255,255,.8);color:#fff', 'sb2'), 'gap:10px')],
      ['Halvgenomskinlig vit yta', dark(W + B('Läs mer', 'background:rgba(255,255,255,.12);border-color:transparent;color:#fff', 'sb2'), 'gap:10px')],
      ['Vit textlänk med pil', dark(W + `<span style="display:inline-flex;align-items:center;gap:6px;color:#fff;font-weight:600;padding:0 8px">${T('Läs mer')}${svg('arrow', 18)}</span>`, 'gap:10px')]
    ]);
    q('kn-mork-inaktiv', 'Hur ska en inaktiv knapp se ut på mörk yta?', [
      ['Blekt vit (40 %)', dark(fig(B('Skicka', 'background:#fff;border-color:#fff;color:var(--sink);opacity:.4'), '<span style="color:#9AA0A6">Inaktiv</span>'))],
      ['Mörkgrå yta, grå text', dark(fig(B('Skicka', 'background:rgba(255,255,255,.1);border-color:transparent;color:rgba(255,255,255,.4)'), '<span style="color:#9AA0A6">Inaktiv</span>'))]
    ]);
  }

  /* ===================== Destruktiva knappar ===================== */
  group('destruktiv', 'Destruktiva knappar');
  {
    const R = '#B3261E';
    const red = (t = 'Ta bort', st = '') => B(t, `background:${R};border-color:${R};` + st);
    const redO = (t = 'Ta bort', st = '') => B(t, `background:transparent;border:1.5px solid ${R};color:${R};` + st, 'sb2');
    const redT = (t = 'Ta bort', st = '') => B(t, `background:transparent;border-color:transparent;color:${R};padding:0 12px;` + st, 'sb2');
    q('kn-dest-typ', 'Hur ska en knapp som tar bort något se ut?', [
      ['Röd fylld', S(red())],
      ['Röd kontur', S(redO())],
      ['Röd text', S(redT())]
    ]);
    const dlg = foot => `<div class="pad"><div class="panel stack" style="gap:10px;box-shadow:0 10px 30px -10px rgba(16,24,40,.3)"><p class="h h3">Ta bort filen?</p><p class="muted small">Det går inte att ångra.</p><div class="row" style="justify-content:flex-end;gap:8px;margin-top:6px">${foot}</div></div></div>`;
    const A = (st = '') => B('Avbryt', 'border:1.5px solid rgba(26,28,30,.22);color:var(--sink);' + st, 'sb2');
    q('kn-dest-dialog', 'Hur ska knapparna se ut i en dialog som tar bort något?', [
      ['Avbryt kontur, Ta bort röd', dlg(A() + red())],
      ['Avbryt text, Ta bort röd', dlg(B('Avbryt', 'background:transparent;border-color:transparent;color:var(--sink);padding:0 12px', 'sb2') + red())],
      ['Avbryt fylld, Ta bort röd kontur', dlg(B('Avbryt') + redO())]
    ]);
    q('kn-dest-ikon', 'Ska Ta bort-knappen ha en papperskorg?', [
      ['Med papperskorg', S(red(svg('trash', 18) + T('Ta bort')))],
      ['Utan ikon', S(red())]
    ]);
    q('kn-dest-ton', 'Vilken röd ska destruktiva knappar ha?', [
      ['Klar röd', S(B('Ta bort', 'background:#D92D20;border-color:#D92D20'))],
      ['Mellanröd', S(B('Ta bort', 'background:#B3261E;border-color:#B3261E'))],
      ['Mörkröd', S(B('Ta bort', 'background:#8C1D18;border-color:#8C1D18'))]
    ]);
    const rowItem = btn => `<div class="pad"><div class="panel" style="display:flex;align-items:center;gap:12px;padding:12px 12px 12px 16px"><div style="flex:1;min-width:0"><p style="font-weight:600">Dokument.pdf</p><p class="small muted">2,4 MB</p></div>${btn}</div></div>`;
    q('kn-dest-lista', 'Hur ska Ta bort se ut i en rad i en lista?', [
      ['Grå papperskorg', rowItem(`<span style="display:inline-grid;place-items:center;width:40px;height:40px;border-radius:50%;color:var(--smuted)">${svg('trash', 20)}</span>`)],
      ['Röd papperskorg', rowItem(`<span style="display:inline-grid;place-items:center;width:40px;height:40px;border-radius:50%;color:${R}">${svg('trash', 20)}</span>`)],
      ['Röd text "Ta bort"', rowItem(`<span style="color:${R};font-weight:600;font-size:14px">Ta bort</span>`)],
      ['Grå text "Ta bort"', rowItem(`<span style="color:var(--smuted);font-weight:600;font-size:14px;text-decoration:underline;text-underline-offset:3px">Ta bort</span>`)]
    ]);
    q('kn-dest-hover', 'Ska knappen vara röd hela tiden eller bara vid hover?', [
      ['Alltid röd', states([['Normal', redO()], ['Hover', redO('Ta bort', `background:#FBEAE9`)]])],
      ['Grå tills hover, sedan röd', states([['Normal', B('Ta bort', 'border:1.5px solid rgba(26,28,30,.22);color:var(--sink)', 'sb2')], ['Hover', redO('Ta bort', 'background:#FBEAE9')]])]
    ]);
    const box = inner => `<div class="pad"><div class="panel stack" style="gap:10px;box-shadow:0 6px 20px -10px rgba(16,24,40,.3)">${inner}</div></div>`;
    q('kn-dest-bekrafta', 'Hur ska en borttagning bekräftas?', [
      ['Dialog: "Är du säker?"', box(`<p style="font-weight:700">Ta bort filen?</p><p class="small muted">Det går inte att ångra.</p><div class="row" style="justify-content:flex-end;gap:8px">${A('height:40px;padding:0 14px')}${red('Ta bort', 'height:40px;padding:0 14px')}</div>`)],
      ['Ingen fråga, ångra-notis efteråt', `<div class="pad" style="display:flex;justify-content:center"><div style="display:flex;align-items:center;gap:14px;background:var(--sink);color:#fff;border-radius:10px;padding:12px 14px 12px 16px;max-width:100%"><span class="small">Filen togs bort</span><span style="font-weight:700;font-size:14px;color:#AFC8E4">Ångra</span></div></div>`],
      ['Skriv ordet för att bekräfta', box(`<p style="font-weight:700">Skriv TA BORT för att bekräfta</p><span class="inp ph" style="height:40px">TA BORT</span><div class="row" style="justify-content:flex-end;gap:8px">${red('Ta bort', 'height:40px;padding:0 14px;opacity:.45')}</div>`)]
    ]);
    q('kn-dest-text', 'Vilken text ska den destruktiva knappen ha?', [
      ['Ta bort', S(red('Ta bort'))],
      ['Radera', S(red('Radera'))],
      ['Verb och sak: Ta bort filen', S(red('Ta bort filen'))]
    ]);
  }

  /* ===================== Knapp med två rader ===================== */
  group('tva-rader', 'Knapp med två rader');
  {
    const two = (a, b, st = '', al = 'center') => B(`<span style="display:flex;flex-direction:column;align-items:${al};gap:2px;line-height:1.15">${a}${b}</span>`, 'height:auto;min-height:56px;padding:8px 24px;' + st);
    const sub = (t, st = '') => `<span style="font-size:13px;font-weight:500;opacity:.8;${st}">${t}</span>`;
    q('kn-2r-typ', 'Hur ska en knapp med pris visa priset?', [
      ['En rad: Boka · 495 kr', S(B('Boka tid · 495 kr'))],
      ['Två rader: text och pris', S(two(T('Boka tid'), sub('495 kr')))],
      ['Priset i en egen del', S(B(T('Boka tid') + `<span style="align-self:stretch;display:flex;align-items:center;padding-left:16px;margin-left:8px;border-left:1px solid rgba(255,255,255,.3)">495 kr</span>`))]
    ]);
    q('kn-2r-hierarki', 'Hur ska raderna i en tvåradsknapp förhålla sig?', [
      ['Andra raden mindre och lättare', S(two(T('Boka tid'), sub('495 kr')))],
      ['Lika stora rader', S(two(T('Boka tid'), `<span style="font-size:15px;font-weight:600">495 kr</span>`))],
      ['Liten rad överst, stor under', S(two(sub('Från 495 kr'), `<span style="font-size:16px;font-weight:700">Boka tid</span>`))]
    ]);
    q('kn-2r-hojd', 'Hur hög ska en tvåradsknapp vara?', [
      ['56 px', S(two(T('Boka tid'), sub('495 kr'), 'min-height:56px;padding:6px 24px'))],
      ['64 px', S(two(T('Boka tid'), sub('495 kr'), 'min-height:64px;padding:10px 24px'))]
    ]);
    q('kn-2r-justering', 'Hur ska innehållet ligga i en bred tvåradsknapp?', [
      ['Centrerat', S(`<div style="width:100%;max-width:240px">${two(T('Boka tid'), sub('495 kr'), 'width:100%')}</div>`)],
      ['Vänster, pil till höger', S(`<div style="width:100%;max-width:240px">${B(`<span style="display:flex;flex-direction:column;align-items:flex-start;gap:2px;line-height:1.15">${T('Boka tid')}${sub('495 kr')}</span>${svg('arrow', 18)}`, 'width:100%;height:auto;min-height:56px;padding:8px 18px;justify-content:space-between')}</div>`)]
    ]);
    q('kn-2r-pris-plats', 'Var ska priset stå i förhållande till knappen?', [
      ['I knappen', C(two(T('Boka tid'), sub('495 kr')))],
      ['Bredvid knappen', C(B('Boka tid') + '<span class="price" style="font-size:17px">495 kr</span>', '', 'gap:14px')],
      ['Ovanför knappen', `<div class="pad"><div class="panel stack" style="gap:10px"><p class="h h3">Rubrik som är kort</p><p class="price" style="font-size:20px">495 kr <small>per tillfälle</small></p><div>${B('Boka tid')}</div></div></div>`]
    ]);
  }

  /* ===================== Räknare och badge ===================== */
  group('badge', 'Knapp med räknare eller badge');
  {
    const IB = (inner, st = '') => `<span style="position:relative;display:inline-grid;place-items:center;width:44px;height:44px;border-radius:50%;background:rgba(26,28,30,.07);color:var(--sink);${st}">${svg('cart', 22)}${inner}</span>`;
    const bd = (t, st = '') => `<span style="position:absolute;top:-3px;right:-3px;min-width:18px;height:18px;padding:0 5px;border-radius:999px;background:#D92D3A;color:#fff;font-size:11px;font-weight:700;line-height:18px;text-align:center;font-variant-numeric:tabular-nums;${st}">${t}</span>`;
    q('kn-badge-typ', 'Hur ska en räknare i en textknapp visas?', [
      ['Siffra i parentes', S(B('Varukorg (3)', '', 'sb2'))],
      ['Siffra i en liten pill', S(B(T('Varukorg') + `<span style="display:inline-grid;place-items:center;min-width:22px;height:22px;padding:0 6px;border-radius:999px;background:var(--brand);color:#fff;font-size:12px">3</span>`, '', 'sb2'))],
      ['Badge i hörnet', S(B(T('Varukorg') + `<span style="position:absolute;top:-8px;right:-8px;display:inline-grid;place-items:center;min-width:22px;height:22px;padding:0 6px;border-radius:999px;background:#D92D3A;color:#fff;font-size:12px;box-shadow:0 0 0 2px var(--ground)">3</span>`, 'position:relative', 'sb2'))]
    ]);
    q('kn-badge-farg', 'Vilken färg ska räknaren på en ikonknapp ha?', [
      ['Röd', S(IB(bd('3')))],
      ['Knappfärgen', S(IB(bd('3', 'background:var(--brand)')))],
      ['Svart', S(IB(bd('3', 'background:#1A1C1E')))]
    ]);
    q('kn-badge-storlek', 'Hur stor ska räknaren vara?', [
      ['16 px', S(IB(bd('3', 'min-width:16px;height:16px;line-height:16px;font-size:10px;padding:0 4px')))],
      ['18 px', S(IB(bd('3')))],
      ['20 px', S(IB(bd('3', 'min-width:20px;height:20px;line-height:20px;font-size:12px')))]
    ]);
    q('kn-badge-ring', 'Ska räknaren ha en ring runt sig?', [
      ['Med ring i bakgrundsfärgen', S(IB(bd('3', 'box-shadow:0 0 0 2px var(--ground)')))],
      ['Utan ring', S(IB(bd('3')))]
    ]);
    q('kn-badge-plats', 'Var ska räknaren sitta på en ikonknapp?', [
      ['Överlappar hörnet', S(IB(bd('3', 'box-shadow:0 0 0 2px var(--ground)')))],
      ['Inne i knappen bredvid ikonen', S(`<span style="display:inline-flex;align-items:center;gap:6px;height:44px;padding:0 12px;border-radius:999px;background:rgba(26,28,30,.07);color:var(--sink);font-weight:700;font-size:14px">${svg('cart', 22)}3</span>`)]
    ]);
    q('kn-badge-max', 'Hur ska stora tal visas i räknaren?', [
      ['9+', S(IB(bd('9+', 'box-shadow:0 0 0 2px var(--ground)')))],
      ['99+', S(IB(bd('99+', 'box-shadow:0 0 0 2px var(--ground)')))],
      ['Exakt tal (128)', S(IB(bd('128', 'box-shadow:0 0 0 2px var(--ground)')))]
    ]);
    const bell = inner => `<span style="position:relative;display:inline-grid;place-items:center;width:44px;height:44px;border-radius:50%;background:rgba(26,28,30,.07);color:var(--sink)">${svg('bell', 22)}${inner}</span>`;
    q('kn-badge-prick', 'Hur ska nya notiser markeras på klockan?', [
      ['Siffra', S(bell(bd('3', 'box-shadow:0 0 0 2px var(--ground)')))],
      ['Bara en prick', S(bell('<span style="position:absolute;top:9px;right:10px;width:9px;height:9px;border-radius:50%;background:#D92D3A;box-shadow:0 0 0 2px var(--ground)"></span>'))]
    ]);
  }

  /* ===================== Flytande knapp och fast bottenknapp ===================== */
  group('fab', 'Flytande knapp och fast bottenknapp på mobil');
  {
    const lines = '<div style="padding:16px 14px;display:flex;flex-direction:column;gap:12px">' + [80, 60, 90, 70, 85, 55, 75].map(w => `<div style="height:10px;border-radius:5px;background:rgba(26,28,30,.09);width:${w}%"></div>`).join('') + '</div>';
    const scr = (fab, st = '') => phone(`<div style="min-height:300px;position:relative">${lines}${fab}</div>`, st);
    const fabEl = (st, inner = svg('plus', 24)) => `<span style="position:absolute;display:inline-flex;align-items:center;justify-content:center;gap:8px;background:var(--brand);color:#fff;font-weight:600;${st}">${inner}</span>`;
    const SH = 'box-shadow:0 8px 20px -6px rgba(16,24,40,.45);';
    q('kn-fab-form', 'Hur ska en flytande knapp se ut?', [
      ['Rund med ikon', scr(fabEl(SH + 'right:14px;bottom:14px;width:56px;height:56px;border-radius:50%'))],
      ['Utökad med text', scr(fabEl(SH + 'right:14px;bottom:14px;height:52px;padding:0 20px 0 16px;border-radius:999px', svg('plus', 20) + T('Ny')))],
      ['Rundad fyrkant', scr(fabEl(SH + 'right:14px;bottom:14px;width:56px;height:56px;border-radius:16px'))]
    ]);
    q('kn-fab-plats', 'Var ska den flytande knappen sitta?', [
      ['Nere till höger', scr(fabEl(SH + 'right:14px;bottom:14px;width:56px;height:56px;border-radius:50%'))],
      ['Nere i mitten', scr(fabEl(SH + 'left:50%;transform:translateX(-50%);bottom:14px;width:56px;height:56px;border-radius:50%'))]
    ]);
    q('kn-fab-skugga', 'Hur mycket skugga ska den flytande knappen ha?', [
      ['Ingen skugga', scr(fabEl('right:14px;bottom:14px;width:56px;height:56px;border-radius:50%'))],
      ['Mjuk skugga', scr(fabEl('box-shadow:0 6px 14px -6px rgba(16,24,40,.4);right:14px;bottom:14px;width:56px;height:56px;border-radius:50%'))],
      ['Tydlig skugga', scr(fabEl('box-shadow:0 12px 26px -6px rgba(16,24,40,.6);right:14px;bottom:14px;width:56px;height:56px;border-radius:50%'))]
    ]);
    q('kn-fab-storlek', 'Hur stor ska den flytande knappen vara?', [
      ['48 px', scr(fabEl(SH + 'right:14px;bottom:14px;width:48px;height:48px;border-radius:50%', svg('plus', 22)))],
      ['56 px', scr(fabEl(SH + 'right:14px;bottom:14px;width:56px;height:56px;border-radius:50%'))],
      ['64 px', scr(fabEl(SH + 'right:14px;bottom:14px;width:64px;height:64px;border-radius:50%', svg('plus', 26)))]
    ]);
    const bar = (inner, st) => `<div style="position:absolute;left:0;right:0;bottom:0;${st}">${inner}</div>`;
    q('kn-fast-stil', 'Hur ska en fast knapp längst ner på mobil se ut?', [
      ['Full bredd i vit list', scr(bar(B('Boka tid', 'width:100%'), 'background:#fff;padding:10px 12px 14px;box-shadow:0 -4px 14px -6px rgba(16,24,40,.2)'))],
      ['Kant till kant', scr(bar(B('Boka tid', 'width:100%;height:54px;border-radius:0'), ''))],
      ['Flytande pill med skugga', scr(bar(B('Boka tid', 'width:100%;border-radius:999px;' + SH), 'padding:0 14px 14px'))]
    ]);
    q('kn-fast-innehall', 'Vad ska den fasta bottenlisten innehålla?', [
      ['Bara knappen', scr(bar(B('Boka tid', 'width:100%'), 'background:#fff;padding:10px 12px 14px;box-shadow:0 -4px 14px -6px rgba(16,24,40,.2)'))],
      ['Pris och knapp', scr(bar(`<div style="display:flex;align-items:center;gap:10px"><div style="flex:0 0 auto;line-height:1.2"><span class="price" style="display:block">495 kr</span><span class="small muted" style="font-size:11px">per tillfälle</span></div>${B('Boka tid', 'flex:1;min-width:0;padding:0 10px')}</div>`, 'background:#fff;padding:10px 12px 14px;box-shadow:0 -4px 14px -6px rgba(16,24,40,.2)'))],
      ['Två knappar', scr(bar(`<div style="display:flex;gap:8px">${B(svg('heart', 20), 'width:48px;padding:0;flex:0 0 auto;border-width:1.5px', 'sb2')}${B('Boka tid', 'flex:1;min-width:0;padding:0 10px')}</div>`, 'background:#fff;padding:10px 12px 14px;box-shadow:0 -4px 14px -6px rgba(16,24,40,.2)'))]
    ]);
    q('kn-fast-list', 'Hur ska den fasta bottenlisten avgränsas?', [
      ['Vit list med skugga', scr(bar(B('Boka tid', 'width:100%'), 'background:#fff;padding:10px 12px 14px;box-shadow:0 -4px 14px -6px rgba(16,24,40,.25)'))],
      ['Vit list med kantlinje', scr(bar(B('Boka tid', 'width:100%'), 'background:#fff;padding:10px 12px 14px;border-top:1px solid var(--sline)'))],
      ['Ingen list, bara knappen', scr(bar(B('Boka tid', 'width:100%'), 'padding:0 12px 14px'))]
    ]);
  }

  /* ===================== Grupperade knappar och segment ===================== */
  group('grupper', 'Grupperade knappar och segmentknappar');
  {
    const opts3 = ['Dag', 'Vecka', 'Månad'];
    const seg = ({ track = 'background:rgba(26,28,30,.07);padding:3px;', r = 999, ri, h = 36, on, off = 'color:var(--smuted);', gap = 0, sep = '' }) =>
      S(`<span style="display:inline-flex;gap:${gap}px;border-radius:${r}px;${track}">${opts3.map((t, i) => `<span style="display:inline-flex;align-items:center;justify-content:center;height:${h}px;padding:0 16px;font-size:14px;font-weight:600;border-radius:${ri !== undefined ? ri : r}px;${i ? sep : ''}${i === 1 ? on : off}">${t}</span>`).join('')}</span>`);
    const WS = 'background:#fff;color:var(--sink);box-shadow:0 1px 3px rgba(16,24,40,.18);';
    q('kn-seg-stil', 'Hur ska en segmentknapp (växla mellan vyer) se ut?', [
      ['Grå skena, vit vald del', seg({ on: WS })],
      ['Sammanfogade konturknappar', seg({ track: 'border:1.5px solid var(--brand);overflow:hidden;', r: 10, ri: 0, h: 38, on: 'background:var(--brand);color:#fff;', off: 'color:var(--brand);', sep: 'border-left:1.5px solid var(--brand);' })],
      ['Separata pills', seg({ track: '', gap: 6, h: 36, on: 'background:var(--sink);color:#fff;', off: 'background:#fff;border:1px solid rgba(26,28,30,.16);color:var(--sink);' })]
    ]);
    q('kn-seg-vald', 'Hur ska det valda segmentet markeras?', [
      ['Vit yta med skugga', seg({ on: WS })],
      ['Fylld i knappfärg', seg({ on: 'background:var(--brand);color:#fff;' })],
      ['Understrykning', seg({ track: 'border-bottom:1px solid var(--sline);', r: 0, h: 40, on: 'color:var(--sink);box-shadow:inset 0 -2px 0 var(--brand);', off: 'color:var(--smuted);' })]
    ]);
    q('kn-seg-rundning', 'Hur rund ska segmentknappen vara?', [
      ['Pill', seg({ on: WS, r: 999 })],
      ['8 px', seg({ on: WS, r: 10, ri: 7 })],
      ['4 px', seg({ on: WS, r: 6, ri: 3 })]
    ]);
    q('kn-seg-hojd', 'Hur hög ska segmentknappen vara?', [
      ['32 px', seg({ on: WS, h: 26 })],
      ['38 px', seg({ on: WS, h: 32 })],
      ['44 px', seg({ on: WS, h: 38 })]
    ]);
    q('kn-seg-ikon', 'Ska segmenten för vyval ha ikoner?', [
      ['Ikon och text', S(`<span style="display:inline-flex;background:rgba(26,28,30,.07);padding:3px;border-radius:999px">${[['grid', 'Rutnät'], ['list', 'Lista']].map(([n, t], i) => `<span style="display:inline-flex;align-items:center;gap:6px;height:36px;padding:0 14px;border-radius:999px;font-size:14px;font-weight:600;${i ? 'color:var(--smuted)' : WS}">${svg(n, 18)}${t}</span>`).join('')}</span>`)],
      ['Bara text', S(`<span style="display:inline-flex;background:rgba(26,28,30,.07);padding:3px;border-radius:999px">${['Rutnät', 'Lista'].map((t, i) => `<span style="display:inline-flex;align-items:center;height:36px;padding:0 16px;border-radius:999px;font-size:14px;font-weight:600;${i ? 'color:var(--smuted)' : WS}">${t}</span>`).join('')}</span>`)],
      ['Bara ikon', S(`<span style="display:inline-flex;background:rgba(26,28,30,.07);padding:3px;border-radius:999px">${['grid', 'list'].map((n, i) => `<span style="display:inline-grid;place-items:center;width:40px;height:36px;border-radius:999px;${i ? 'color:var(--smuted)' : WS}">${svg(n, 18)}</span>`).join('')}</span>`)]
    ]);
    q('kn-split', 'Hur ska en knapp med fler val (rullgardin) se ut?', [
      ['Knapp och separat pildel', S(`<span style="display:inline-flex;gap:2px">${B('Spara', 'border-radius:10px 0 0 10px')}${B(svg('chevD', 18), 'border-radius:0 10px 10px 0;padding:0 12px')}</span>`)],
      ['Pil inne i knappen', S(B(T('Spara') + svg('chevD', 18)))],
      ['Knapp och egen menyknapp', S(B('Spara') + B(svg('chevD', 18), 'width:48px;padding:0;border-width:1.5px', 'sb2'), 'gap:8px')]
    ]);
  }

  /* ===================== Länk kontra knapp ===================== */
  group('lank-knapp', 'Länk kontra knapp');
  {
    q('kn-lk-navigera', 'Hur ska "Läs mer" som leder till en annan sida se ut?', [
      ['Textlänk med pil', C(`<span style="display:inline-flex;align-items:center;gap:6px;color:var(--brand);font-weight:600">${T('Läs mer')}${svg('arrow', 18)}</span>`)],
      ['Konturknapp', C(B('Läs mer', 'border-width:1.5px', 'sb2'))],
      ['Fylld knapp', C(B('Läs mer'))]
    ]);
    const list = foot => `<div class="pad"><div class="stack" style="gap:8px">${[1, 2, 3].map(() => '<div class="panel" style="padding:12px 14px;display:flex;gap:10px;align-items:center"><span style="width:34px;height:34px;border-radius:8px;background:var(--accent);flex:0 0 auto"></span><span style="flex:1;min-width:0"><span style="display:block;height:9px;width:70%;border-radius:5px;background:rgba(26,28,30,.15)"></span><span style="display:block;height:8px;width:45%;border-radius:5px;background:rgba(26,28,30,.08);margin-top:7px"></span></span></div>').join('')}<div style="display:flex;justify-content:center;margin-top:6px">${foot}</div></div></div>`;
    q('kn-lk-visa-fler', 'Hur ska "Visa fler" under en lista se ut?', [
      ['Konturknapp, centrerad', list(B('Visa fler', 'border-width:1.5px', 'sb2'))],
      ['Textlänk', list('<span style="color:var(--brand);font-weight:600;text-decoration:underline;text-underline-offset:4px;padding:10px">Visa fler</span>')],
      ['Grå knapp, full bredd', list(B('Visa fler', 'width:100%;background:#E7E7E4;border-color:#E7E7E4;color:var(--sink)', 'sb2'))]
    ], 'grid');
    const para = l => `<div class="pad"><p style="max-width:42ch">Det här är en vanlig rad löptext där det finns ${l} mitt i meningen, så att man ser hur den sticker ut.</p></div>`;
    q('kn-lk-i-text', 'Hur ska en länk inne i löptext se ut?', [
      ['Understruken i knappfärg', para('<span style="color:var(--brand);text-decoration:underline;text-underline-offset:3px">en länk</span>')],
      ['Färgad och halvfet, utan streck', para('<span style="color:var(--brand);font-weight:600">en länk</span>')],
      ['Understruken i textfärg', para('<span style="text-decoration:underline;text-underline-offset:3px;text-decoration-thickness:1px">en länk</span>')]
    ]);
    const cards = mk => `<div class="pad"><div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:10px">${[0, 1, 2].map(i => `<div class="panel stack" style="gap:8px"><p style="font-weight:700">Alternativ ${i + 1}</p><p class="small muted">Kort text om alternativet.</p><div style="margin-top:4px">${mk(i)}</div></div>`).join('')}</div></div>`;
    q('kn-lk-antal-primar', 'Hur många fyllda knappar får synas samtidigt?', [
      ['En fylld per kort', cards(() => B('Välj', 'height:40px;padding:0 16px'))],
      ['Bara en fylld, övriga kontur', cards(i => i === 1 ? B('Välj', 'height:40px;padding:0 16px') : B('Välj', 'height:40px;padding:0 16px;border-width:1.5px', 'sb2'))],
      ['Inga fyllda, bara konturer', cards(() => B('Välj', 'height:40px;padding:0 16px;border-width:1.5px', 'sb2'))]
    ], 'stack');
  }

  /* ===================== Animation vid klick ===================== */
  group('animation', 'Animation vid klick');
  {
    const C2 = 2200;
    const sc = (cls, kf, extra = '', inner = 'Boka tid', st = '') => css(cls, `.${cls}{animation:${cls}-k ${C2}ms ease infinite}@keyframes ${cls}-k{${kf}}${extra}`) + S(fig(B(inner, st, 'sb ' + cls), 'Spelas upp i loop'));
    const ripple = cls => css(cls, `.${cls}-r{position:absolute;left:50%;top:50%;width:160px;height:160px;margin:-80px 0 0 -80px;border-radius:50%;background:rgba(255,255,255,.35);animation:${cls}-k ${C2}ms ease-out infinite}@keyframes ${cls}-k{0%,40%{transform:scale(0);opacity:1}70%{transform:scale(1);opacity:0}100%{transform:scale(1);opacity:0}}`) +
      S(fig(B(`<i class="${cls}-r"></i>` + T('Boka tid'), 'position:relative;overflow:hidden'), 'Spelas upp i loop'));
    q('kn-anim-typ', 'Ska knappen röra sig när man klickar?', [
      ['Ingen animation', S(fig(B('Boka tid'), 'Ingen rörelse'))],
      ['Krymper och växer tillbaka', sc('kn-an1b', '0%,40%{transform:scale(1)}46%{transform:scale(.95)}56%,100%{transform:scale(1)}')],
      ['Ripple (våg från mitten)', ripple('kn-an1c')],
      ['Kort ljusblink', sc('kn-an1d', '0%,40%{background:#24405E}46%{background:#4A6F98}60%,100%{background:#24405E}')]
    ]);
    const spd = (cls, ms) => {
      const t = (ms / C2) * 100;
      return sc(cls, `0%,40%{transform:scale(1)}${(40 + t / 2).toFixed(1)}%{transform:scale(.95)}${(40 + t).toFixed(1)}%,100%{transform:scale(1)}`);
    };
    q('kn-anim-fart', 'Om knappen krymper vid klick: hur snabbt?', [
      ['Snabbt (120 ms)', spd('kn-an2a', 120)],
      ['Mellan (200 ms)', spd('kn-an2b', 200)],
      ['Långsamt (320 ms)', spd('kn-an2c', 320)]
    ]);
    q('kn-anim-studs', 'Ska knappen studsa tillbaka efter klick?', [
      ['Nej, tillbaka mjukt', sc('kn-an3a', '0%,40%{transform:scale(1)}46%{transform:scale(.95)}58%,100%{transform:scale(1)}')],
      ['Ja, en liten studs', sc('kn-an3b', '0%,40%{transform:scale(1)}46%{transform:scale(.94)}54%{transform:scale(1.03)}62%,100%{transform:scale(1)}')]
    ]);
  }

  // --- FLER GRUPPER ---

  window.QZ.part({ key: 'knappar', groups: G });
})();
