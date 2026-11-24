/* Elevate designquiz: Pilar och småbitar (nyckel pilar, prefix pi-).
   Frågorna byggs med små generatorer. Varje fråga visar samma detalj i varianter
   där bara den egenskap frågan gäller skiljer sig. */
(function () {
  // ---------- Ikoner ----------
  const PATHS = {
    arrow: 'M4 12h16|M14 6l6 6-6 6',
    arrowS: 'M5 12h14|M15 8l4 4-4 4',
    arrowL: 'M20 12H4|M10 6l-6 6 6 6',
    arrowD: 'M12 4v16|M6 14l6 6 6-6',
    arrowU: 'M12 20V4|M6 10l6-6 6 6',
    chev: 'M9 5l7 7-7 7',
    chevL: 'M15 5l-7 7 7 7',
    chevD: 'M5 9l7 7 7-7',
    chevU: 'M5 15l7-7 7 7',
    dchev: 'M5 6l6 6-6 6|M12 6l6 6-6 6',
    dchevD: 'M6 5l6 6 6-6|M6 12l6 6 6-6',
    diag: 'M7 17L17 7|M9 7h8v8',
    long: 'M2 12h35|M31 6l6 6-6 6',
    longD: 'M12 2v35|M6 31l6 6 6-6',
    plus: 'M12 5v14|M5 12h14',
    minus: 'M5 12h14',
    x: 'M6.5 6.5l11 11|M17.5 6.5l-11 11',
    check: 'M5 12.5l4.5 4.5L19 7.5',
    ext: 'M14 4h6v6|M20 4l-9 9|M19 14v4.5a1.5 1.5 0 0 1-1.5 1.5h-12A1.5 1.5 0 0 1 4 18.5v-12A1.5 1.5 0 0 1 5.5 5H10',
    updown: 'M7 9l5-5 5 5|M7 15l5 5 5-5',
    bag: 'M6 8h12l-1 12H7L6 8z|M9 8V6a3 3 0 0 1 6 0v2',
    bell: 'M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15L6 16z|M10 20.5a2 2 0 0 0 4 0',
    star: 'M12 3.5l2.6 5.3 5.9.9-4.25 4.1 1 5.8L12 16.9l-5.25 2.7 1-5.8L3.5 9.7l5.9-.9z',
    info: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z|M12 11v5|M12 7.5v.01',
    help: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z|M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6v.3|M12 17v.01',
    trash: 'M4 7h16|M9 7V5h6v2|M6 7l1 13h10l1-13',
    tag: 'M3 12V4h8l9 9-8 8-9-9z|M7.5 7.5v.01',
    pin: 'M12 21s-6-5.5-6-11a6 6 0 0 1 12 0c0 5.5-6 11-6 11z|M12 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4z',
    clock: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z|M12 7v5l3 2',
    cal: 'M4 6h16v14H4z|M4 10h16|M8 3v4|M16 3v4',
    bolt: 'M13 3L5 14h6l-1 7 8-11h-6l1-7z',
    dots: 'M5 12h.01|M12 12h.01|M19 12h.01'
  };
  const WIDE = { long: '0 0 40 24', longD: '0 0 24 40' };
  // a(namn, {s: storlek, w: linje i px, cap, join, fill, st: extra stil, c: färg})
  function a(k, o = {}) {
    const s = o.s || '1em', w = o.w == null ? 2 : o.w;
    const vb = WIDE[k] || '0 0 24 24';
    const wd = k === 'long' ? `calc(${s} * 1.67)` : s, ht = k === 'longD' ? `calc(${s} * 1.67)` : s;
    const filled = k === 'tri' || k === 'triD' || o.fill;
    let inner;
    if (k === 'tri') inner = '<path d="M8.5 5.5l9 6.5-9 6.5z"/>';
    else if (k === 'triD') inner = '<path d="M5.5 8.5l6.5 9 6.5-9z"/>';
    else inner = PATHS[k].split('|').map(d => `<path vector-effect="non-scaling-stroke" d="${d}"/>`).join('');
    const fill = k === 'tri' || k === 'triD' ? 'currentColor' : (o.fill || 'none');
    const stroke = k === 'tri' || k === 'triD' ? 'none' : 'currentColor';
    return `<svg viewBox="${vb}" fill="${fill}" stroke="${stroke}" stroke-width="${w}" stroke-linecap="${o.cap || 'round'}" stroke-linejoin="${o.join || 'round'}" aria-hidden="true" style="width:${wd};height:${ht};flex:0 0 auto;display:inline-block;vertical-align:middle${o.c ? ';color:' + o.c : ''}${o.st ? ';' + o.st : ''}">${inner}</svg>`;
  }

  // ---------- Små byggstenar ----------
  const pad = (x, st = '') => `<div class="pad"${st ? ` style="${st}"` : ''}>${x}</div>`;
  const cen = (x, st = '') => `<div class="pad" style="display:flex;justify-content:center;align-items:center;gap:14px;flex-wrap:wrap;${st}">${x}</div>`;
  const lk = (t, after = '', before = '', st = '') => `<span style="display:inline-flex;align-items:center;gap:6px;color:var(--brand);font-weight:600;${st}">${before}${t}${after}</span>`;
  const sb = (t, after = '', st = '', cls = 'sb') => `<span class="${cls}"${st ? ` style="${st}"` : ''}>${t}${after}</span>`;
  const panel = (x, st = '') => `<div class="panel"${st ? ` style="${st}"` : ''}>${x}</div>`;
  const box = (st = '') => `<div style="background:var(--accent);border-radius:var(--rc);aspect-ratio:4/3;${st}"></div>`;
  const line = (w = '100%', h = 10, st = '') => `<div style="height:${h}px;width:${w};max-width:100%;background:var(--accent);border-radius:4px;${st}"></div>`;
  const txt = 'Kort text som beskriver innehållet i två rader.';
  const Q = (id, q, opts, layout = 'grid') => ({ id, q, layout, opts: opts.map(([l, h]) => (h == null ? { l } : { l, h })) });
  const G = (key, title, questions) => ({ key, title, questions });
  const reduce = sel => `@media (prefers-reduced-motion: reduce){${sel}{animation:none!important;transition:none!important}}`;

  // Klickbart kort med rubrik och valfri detalj
  const card = (detail = '', st = '') => `<div class="pad"><div class="panel" style="position:relative;display:flex;flex-direction:column;gap:6px;${st}"><div class="h h3">Rubrik på kortet</div><p class="muted small">${txt}</p>${detail}</div></div>`;

  // Listrader med detalj till höger
  const rows = right => pad(`<div class="panel" style="padding:4px 16px">${['Inställningar', 'Betalning', 'Adress'].map((t, i) => `<div style="display:flex;align-items:center;justify-content:space-between;gap:12px;padding:12px 0;${i ? 'border-top:1px solid var(--sline)' : ''}"><span>${t}</span>${right}</div>`).join('')}</div>`);

  const groups = [];

  // =====================================================================
  // PILARNAS FORM
  // =====================================================================
  const forms = [
    ['Pil med skaft →', 'arrow'],
    ['Chevron ›', 'chev'],
    ['Triangel ▸', 'tri'],
    ['Dubbel chevron »', 'dchev'],
    ['Diagonal pil ↗', 'diag'],
    ['Lång tunn pil', 'long']
  ];
  groups.push(G('pil-form', 'Pilarnas form', [
    Q('pi-form-lasmer', 'Vilken pil ska sitta efter en "Läs mer"-länk?',
      forms.map(([l, k]) => [l, cen(lk('Läs mer', a(k, { s: k === 'long' ? '1em' : '1.05em', w: k === 'long' ? 1.25 : 2 })))])),
    Q('pi-form-knapp', 'Vilken pil ska sitta i en primärknapp?',
      [['Pil med skaft →', 'arrow'], ['Chevron ›', 'chev'], ['Lång tunn pil', 'long'], ['Diagonal pil ↗', 'diag'], ['Ingen pil', '']].map(([l, k]) => [l, cen(sb('Fortsätt', k ? a(k, { s: '18px', w: k === 'long' ? 1.5 : 2 }) : ''))])),
    Q('pi-form-lista', 'Vilken pil ska sitta till höger i en klickbar listrad?',
      [['Chevron ›', 'chev'], ['Pil med skaft →', 'arrow'], ['Triangel ▸', 'tri'], ['Ingen pil', '']].map(([l, k]) => [l, rows(k ? a(k, { s: '18px', c: 'var(--smuted)' }) : '')])),
    Q('pi-form-kort', 'Vilken pil ska visa att ett helt kort är klickbart?',
      [['Pil med skaft →', 'arrow'], ['Chevron ›', 'chev'], ['Diagonal pil ↗', 'diag'], ['Ingen pil', '']].map(([l, k]) => [l, card(k ? `<div style="position:absolute;top:18px;right:18px;color:var(--brand)">${a(k, { s: '20px' })}</div>` : '', 'padding-right:46px')])),
    Q('pi-form-huvud', 'Hur ska pilhuvudet se ut på en pil med skaft?', [
      ['Öppen vinkel, normal', 'M4 12h16|M14 6l6 6-6 6'],
      ['Liten öppen vinkel', 'M4 12h16|M16 8l4 4-4 4'],
      ['Stor öppen vinkel', 'M4 12h16|M12 4l8 8-8 8'],
      ['Fylld triangel', null]
    ].map(([l, d]) => {
      const svgx = d ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="width:56px;height:56px">${d.split('|').map(p => `<path vector-effect="non-scaling-stroke" d="${p}"/>`).join('')}</svg>`
        : `<svg viewBox="0 0 24 24" aria-hidden="true" style="width:56px;height:56px"><path d="M4 12h11" stroke="currentColor" stroke-width="2" stroke-linecap="round" vector-effect="non-scaling-stroke"/><path d="M14 7l7 5-7 5z" fill="currentColor"/></svg>`;
      return [l, cen(`<span style="color:var(--sink)">${svgx}</span>${lk('Läs mer', svgx.replace(/56px/g, '1.05em'))}`)];
    })),
    Q('pi-form-chevronvinkel', 'Hur spetsig ska en chevron vara?', [
      ['Trubbig chevron', 'M10 4l5 8-5 8'], ['Rät vinkel', 'M9 5l7 7-7 7'], ['Spetsig chevron', 'M8 8l8 4-8 4']
    ].map(([l, d]) => {
      const s = sz => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="width:${sz};height:${sz};flex:0 0 auto"><path vector-effect="non-scaling-stroke" d="${d}"/></svg>`;
      return [l, cen(`${s('52px')}<span style="display:inline-flex;align-items:center;gap:8px">Inställningar ${s('18px')}</span>`)];
    })),
    Q('pi-form-andar', 'Ska pilarnas linjeändar vara rundade eller raka?', [
      ['Rundade ändar', 'round', 'round'], ['Raka ändar och spetsiga hörn', 'butt', 'miter']
    ].map(([l, cap, join]) => [l, cen(`${a('arrow', { s: '52px', w: 3, cap, join })}${a('chev', { s: '52px', w: 3, cap, join })}${lk('Läs mer', a('arrow', { s: '1.05em', cap, join }))}`)])),
    Q('pi-form-tecken', 'Ska pilen vara ett tecken i typsnittet eller en ritad ikon?', [
      ['Typsnittets tecken →', lk('Läs mer', ' →', '', 'gap:0')],
      ['Ritad pil (ikon)', lk('Läs mer', a('arrow', { s: '1.05em' }))]
    ].map(([l, h]) => [l, cen(`<div class="stack" style="align-items:center;gap:14px">${h}<span class="sb">Fortsätt${h.includes('<svg') ? a('arrow', { s: '18px' }) : '<span>→</span>'}</span></div>`)])),
    Q('pi-form-langd', 'Hur lång ska pilen med skaft vara i en länk?', [
      ['Kort pil', 'M8 12h10|M14 8l4 4-4 4', '1.05em'],
      ['Normal pil', 'M4 12h16|M14 6l6 6-6 6', '1.05em'],
      ['Lång tunn pil', 'M2 12h35|M31 6l6 6-6 6', 'long']
    ].map(([l, d, s]) => {
      const vb = s === 'long' ? '0 0 40 24' : '0 0 24 24', w = s === 'long' ? 'calc(1.05em * 1.67)' : '1.05em';
      return [l, cen(lk('Se alla', `<svg viewBox="${vb}" fill="none" stroke="currentColor" stroke-width="${s === 'long' ? 1.25 : 2}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="width:${w};height:1.05em;flex:0 0 auto">${d.split('|').map(p => `<path vector-effect="non-scaling-stroke" d="${p}"/>`).join('')}</svg>`))];
    })),
    Q('pi-form-ring', 'Ska pilen i en länk ha en form runt sig?', [
      ['Bara pilen', ''],
      ['Pil i tunn ring', 'border:1.5px solid currentColor;border-radius:50%'],
      ['Pil i fylld cirkel', 'background:var(--brand);color:#fff;border-radius:50%'],
      ['Pil i rundad fyrkant', 'background:var(--brand);color:#fff;border-radius:7px']
    ].map(([l, st]) => [l, cen(lk('Läs mer', st ? `<span style="display:inline-grid;place-items:center;width:28px;height:28px;${st}">${a('arrow', { s: '15px' })}</span>` : a('arrow', { s: '1.05em' }), '', 'gap:10px'))])),
    Q('pi-form-ner', 'Hur ska en pil som uppmanar att scrolla ner se ut?',
      [['Chevron ner', 'chevD', '28px'], ['Pil med skaft ner', 'arrowD', '28px'], ['Dubbel chevron ner', 'dchevD', '28px'], ['Lång tunn pil ner', 'longD', '24px']].map(([l, k, s]) => [l, cen(`<div class="stack" style="align-items:center;gap:8px"><span class="small muted">Scrolla</span>${a(k, { s, w: k === 'longD' ? 1.25 : 2 })}</div>`)])),
    Q('pi-form-upp', 'Hur ska knappen "Till toppen" se ut?', [
      ['Rund knapp med pil upp', `<span style="display:inline-grid;place-items:center;width:44px;height:44px;border-radius:50%;background:var(--brand);color:#fff">${a('arrowU', { s: '20px' })}</span>`],
      ['Rund knapp med chevron upp', `<span style="display:inline-grid;place-items:center;width:44px;height:44px;border-radius:50%;background:var(--brand);color:#fff">${a('chevU', { s: '20px' })}</span>`],
      ['Rundad fyrkant med chevron', `<span style="display:inline-grid;place-items:center;width:44px;height:44px;border-radius:var(--rb);background:var(--brand);color:#fff">${a('chevU', { s: '20px' })}</span>`],
      ['Textlänk "Till toppen ↑"', lk('Till toppen', a('arrowU', { s: '1em' }))]
    ].map(([l, h]) => [l, pad(`<div style="display:flex;justify-content:flex-end;align-items:flex-end;min-height:90px">${h}</div>`)]))
  ]));

  // =====================================================================
  // TJOCKLEK OCH STORLEK
  // =====================================================================
  groups.push(G('pil-storlek', 'Pilarnas tjocklek och storlek', [
    Q('pi-tj-lank', 'Hur tjock ska pilen i en textlänk vara?',
      [['Tunn linje 1,25 px', 1.25], ['Normal linje 1,75 px', 1.75], ['Kraftig linje 2,5 px', 2.5]].map(([l, w]) => [l, cen(lk('Läs mer', a('arrow', { s: '1.05em', w })) + lk('Visa alla', a('chev', { s: '1.05em', w })))])),
    Q('pi-tj-knapp', 'Hur tjock ska pilen i en knapp vara?',
      [['Tunn linje 1,5 px', 1.5], ['Normal linje 2 px', 2], ['Kraftig linje 2,5 px', 2.5]].map(([l, w]) => [l, cen(sb('Fortsätt', a('arrow', { s: '18px', w })) + sb('Fortsätt', a('arrow', { s: '18px', w }), '', 'sb2'))])),
    Q('pi-tj-lankstorlek', 'Hur stor ska pilen vara jämfört med länktexten?',
      [['Mindre än texten', '0.8em'], ['Lika stor som texten', '1.05em'], ['Större än texten', '1.35em']].map(([l, s]) => [l, cen(lk('Läs mer', a('arrow', { s })))])),
    Q('pi-tj-listchevron', 'Hur stor ska chevronen i en listrad vara?',
      [['Liten 14 px', '14px'], ['Mellan 18 px', '18px'], ['Stor 22 px', '22px']].map(([l, s]) => [l, rows(a('chev', { s, c: 'var(--smuted)' }))])),
    Q('pi-tj-listfarg', 'Vilken färg ska chevronen i en listrad ha?',
      [['Samma som texten', 'var(--sink)'], ['Dämpad grå', 'var(--smuted)'], ['Ljusgrå', 'rgba(26,28,30,.32)'], ['Märkesfärgen', 'var(--brand)']].map(([l, c]) => [l, rows(a('chev', { s: '18px', c }))])),
    Q('pi-tj-avstand', 'Hur långt från texten ska pilen sitta?',
      [['Tätt, 4 px', 4], ['Normalt, 8 px', 8], ['Luftigt, 12 px', 12]].map(([l, g]) => [l, cen(`<div class="stack" style="align-items:center;gap:14px">${lk('Läs mer', a('arrow', { s: '1.05em' }), '', `gap:${g}px`)}${sb('Fortsätt', a('arrow', { s: '18px' }), `gap:${g}px`)}</div>`)])),
    Q('pi-tj-pilfarg', 'Vilken färg ska pilen i en textlänk ha?',
      [['Samma som länktexten', 'var(--brand)'], ['Mörk som brödtexten', 'var(--sink)'], ['Dämpad grå', 'var(--smuted)']].map(([l, c]) => [l, cen(lk('Läs mer', a('arrow', { s: '1.05em', c })))]))
  ]));

  // =====================================================================
  // PILAR I LÄNKAR OCH KNAPPAR
  // =====================================================================
  groups.push(G('pil-lankar', 'Pilar i länkar och knappar', [
    Q('pi-lank-placering', 'Var ska pilen sitta i en "Läs mer"-länk?', [
      ['Efter texten', lk('Läs mer', a('arrow', { s: '1.05em' }))],
      ['Före texten', lk('Läs mer', '', a('arrow', { s: '1.05em' }))],
      ['Ingen pil', lk('Läs mer')]
    ].map(([l, h]) => [l, pad(`<div class="stack"><div class="h h3">Rubrik på avsnittet</div><p class="muted">${txt}</p>${h}</div>`)])),
    Q('pi-lank-understrykning', 'Ska en "Läs mer"-länk med pil vara understruken?', [
      ['Ingen understrykning', 'text-decoration:none'],
      ['Bara texten understruken', 'text-decoration:underline;text-underline-offset:4px'],
      ['Linje under text och pil', 'border-bottom:1.5px solid currentColor;padding-bottom:3px']
    ].map(([l, st]) => [l, cen(st.startsWith('border') ? lk('Läs mer', a('arrow', { s: '1.05em' }), '', st) : `<span style="display:inline-flex;align-items:center;gap:6px;color:var(--brand);font-weight:600"><span style="${st}">Läs mer</span>${a('arrow', { s: '1.05em' })}</span>`)])),
    Q('pi-lank-versaler', 'Hur ska texten i en pil-länk skrivas?', [
      ['Vanlig skrift', ''],
      ['Versaler med spärrning', 'text-transform:uppercase;letter-spacing:.08em;font-size:13px']
    ].map(([l, st]) => [l, cen(lk('Läs mer', a('arrow', { s: '1.1em' }), '', st))])),
    Q('pi-lank-lista', 'Hur ska pilarna sitta i en lista med länkar?', [
      ['Pil längst till höger', 'end'], ['Pil direkt efter texten', 'after'], ['Pil före texten', 'before'], ['Ingen pil', 'none']
    ].map(([l, m]) => [l, pad(`<div class="panel" style="padding:4px 16px">${['Priser', 'Vanliga frågor', 'Kontakt'].map((t, i) => {
      const arr = a('arrow', { s: '1.05em' });
      const inner = m === 'end' ? `<span>${t}</span>${arr}` : m === 'after' ? `<span style="display:inline-flex;align-items:center;gap:6px">${t}${arr}</span>` : m === 'before' ? `<span style="display:inline-flex;align-items:center;gap:8px">${arr}${t}</span>` : `<span>${t}</span>`;
      return `<div style="display:flex;align-items:center;justify-content:space-between;gap:12px;padding:12px 0;color:var(--brand);font-weight:600;${i ? 'border-top:1px solid var(--sline)' : ''}">${inner}</div>`;
    }).join('')}</div>`)])),
    Q('pi-lank-lopande', 'Ska länkar inne i löptext ha en pil?', [
      ['Bara understrykning', '<span class="link">våra villkor</span>'],
      ['Understrykning och pil', `<span class="link">våra villkor</span><span style="color:var(--brand)"> ${a('arrow', { s: '.95em' })}</span>`],
      ['Pil utan understrykning', `<span style="color:var(--brand);font-weight:600">våra villkor ${a('arrow', { s: '.95em' })}</span>`]
    ].map(([l, h]) => [l, pad(`<p>Innan du bokar kan du läsa ${h} och hur avbokning går till.</p>`)])),
    Q('pi-knapp-placering', 'Var ska pilen sitta i en bred knapp?', [
      ['Direkt efter texten', sb('Fortsätt', a('arrow', { s: '18px' }), 'width:100%')],
      ['Längst till höger', sb('Fortsätt', a('arrow', { s: '18px' }), 'width:100%;justify-content:space-between')],
      ['Ingen pil', sb('Fortsätt', '', 'width:100%')]
    ].map(([l, h]) => [l, pad(h)])),
    Q('pi-knapp-sekundar', 'Vilka knappar ska ha pil när två sitter bredvid varandra?', [
      ['Båda knapparna', sb('Boka tid', a('arrow', { s: '18px' })) + sb('Läs mer', a('arrow', { s: '18px' }), '', 'sb2')],
      ['Bara primärknappen', sb('Boka tid', a('arrow', { s: '18px' })) + sb('Läs mer', '', '', 'sb2')],
      ['Bara sekundärknappen', sb('Boka tid') + sb('Läs mer', a('arrow', { s: '18px' }), '', 'sb2')],
      ['Ingen av dem', sb('Boka tid') + sb('Läs mer', '', '', 'sb2')]
    ].map(([l, h]) => [l, pad(`<div class="row">${h}</div>`)])),
    Q('pi-knapp-pildel', 'Hur ska pilen sitta i knappen?', [
      ['Pil direkt efter texten', sb('Fortsätt', a('arrow', { s: '18px' }))],
      ['Pil i egen cirkel i knappen', sb('Fortsätt', `<span style="display:inline-grid;place-items:center;width:32px;height:32px;border-radius:50%;background:#fff;color:var(--brand);margin-right:-16px">${a('arrow', { s: '16px' })}</span>`)],
      ['Pil i egen ruta bredvid', `<span style="display:inline-flex;gap:3px">${sb('Fortsätt', '', 'border-top-right-radius:3px;border-bottom-right-radius:3px')}${sb('', a('arrow', { s: '18px' }), 'padding:0;width:48px;border-top-left-radius:3px;border-bottom-left-radius:3px')}</span>`]
    ].map(([l, h]) => [l, cen(h)])),
    Q('pi-knapp-barapil', 'Hur ska skicka-knappen i ett sökfält se ut?', [
      ['Rund knapp med pil', `<span style="display:inline-grid;place-items:center;width:38px;height:38px;border-radius:50%;background:var(--brand);color:#fff;flex:0 0 auto">${a('arrow', { s: '18px' })}</span>`],
      ['Rundad fyrkant med pil', `<span style="display:inline-grid;place-items:center;width:38px;height:38px;border-radius:6px;background:var(--brand);color:#fff;flex:0 0 auto">${a('arrow', { s: '18px' })}</span>`],
      ['Bara pil utan bakgrund', `<span style="display:inline-grid;place-items:center;width:38px;height:38px;color:var(--brand);flex:0 0 auto">${a('arrow', { s: '20px' })}</span>`],
      ['Textknapp "Sök"', `<span class="sb" style="height:38px;padding:0 16px;font-size:14px;border-radius:6px">Sök</span>`]
    ].map(([l, h]) => [l, pad(`<div class="inp" style="padding:0 5px 0 14px;justify-content:space-between;gap:8px"><span class="muted" style="overflow:hidden;text-overflow:ellipsis">Sök</span>${h}</div>`)]))
  ]));

  // =====================================================================
  // KARUSELLKNAPPAR
  // =====================================================================
  // Rad med platshållarkort och två knappar. pos: 'sides' | 'top' | 'bottomc' | 'bottomr'
  const rb = (k, st, s = 40, ic = '18px') => `<span style="display:inline-grid;place-items:center;width:${s}px;height:${s}px;flex:0 0 auto;${st}">${a(k, { s: ic })}</span>`;
  const KB = {
    rundfylld: 'border-radius:50%;background:var(--box);color:var(--sink);box-shadow:0 1px 3px rgba(0,0,0,.14),0 2px 8px rgba(0,0,0,.06)',
    rundfyllning: 'border-radius:50%;background:var(--brand);color:#fff',
    fyrkant: 'border-radius:8px;background:var(--box);color:var(--sink);box-shadow:0 1px 3px rgba(0,0,0,.14),0 2px 8px rgba(0,0,0,.06)',
    kontur: 'border-radius:50%;border:1.5px solid var(--sline);color:var(--sink);background:transparent',
    bara: 'color:var(--sink)'
  };
  function kar(prev, next, pos = 'top') {
    const tiles = `<div style="display:flex;gap:10px;overflow:hidden">${box('flex:0 0 58%')}${box('flex:0 0 58%')}</div>`;
    const btns = `<div style="display:flex;gap:8px">${prev}${next}</div>`;
    if (pos === 'top') return pad(`<div class="stack" style="gap:12px"><div style="display:flex;justify-content:space-between;align-items:center;gap:8px"><div class="h h3">Rubrik</div>${btns}</div>${tiles}</div>`);
    if (pos === 'sides') return pad(`<div class="stack" style="gap:12px"><div class="h h3">Rubrik</div><div style="position:relative">${tiles}<div style="position:absolute;inset:0;display:flex;justify-content:space-between;align-items:center;padding:0 8px;pointer-events:none">${prev}${next}</div></div></div>`);
    const just = pos === 'bottomc' ? 'center' : 'flex-end';
    return pad(`<div class="stack" style="gap:12px"><div class="h h3">Rubrik</div>${tiles}<div style="display:flex;justify-content:${just}">${btns}</div></div>`);
  }
  const kpair = (st, s, ic, k = 'chev') => [rb(k === 'chev' ? 'chevL' : 'arrowL', st, s, ic), rb(k, st, s, ic)];
  groups.push(G('pil-karusell', 'Karusellknappar', [
    Q('pi-kar-form', 'Hur ska karusellens pilknappar se ut?', [
      ['Rund vit knapp med skugga', KB.rundfylld], ['Rund knapp i märkesfärg', KB.rundfyllning], ['Rundad fyrkant', KB.fyrkant], ['Rund konturknapp', KB.kontur], ['Bara pil utan bakgrund', KB.bara]
    ].map(([l, st]) => [l, kar(...kpair(st), 'top')])),
    Q('pi-kar-placering', 'Var ska karusellens pilknappar sitta?', [
      ['Över bilderna, på sidorna', 'sides'], ['Uppe till höger vid rubriken', 'top'], ['Under raden, i mitten', 'bottomc'], ['Under raden, till höger', 'bottomr']
    ].map(([l, p]) => [l, kar(...kpair(KB.rundfylld), p)])),
    Q('pi-kar-storlek', 'Hur stora ska karusellknapparna vara?',
      [['Små, 32 px', 32, '16px'], ['Mellan, 40 px', 40, '18px'], ['Stora, 48 px', 48, '20px']].map(([l, s, ic]) => [l, kar(...kpair(KB.rundfylld, s, ic), 'top')])),
    Q('pi-kar-pil', 'Vilken pil ska karusellknapparna ha?',
      [['Chevron ‹ ›', 'chev'], ['Pil med skaft ← →', 'arrow']].map(([l, k]) => [l, kar(...kpair(KB.rundfylld, 40, '18px', k), 'top')])),
    Q('pi-kar-inaktiv', 'Hur ska bakåtknappen se ut när karusellen står i början?', [
      ['Nedtonad', `<span style="opacity:.4;display:inline-flex">${rb('chevL', KB.rundfylld)}</span>`],
      ['Dold', ''],
      ['Lika tydlig som framåt', rb('chevL', KB.rundfylld)]
    ].map(([l, prev]) => [l, kar(prev, rb('chev', KB.rundfylld), 'top')])),
    Q('pi-kar-glapp', 'Hur nära varandra ska de två pilknapparna sitta?',
      [['Tätt ihop, 4 px', 4], ['Normalt, 8 px', 8], ['Luftigt, 16 px', 16]].map(([l, g]) => [l, kar(...kpair(KB.kontur), 'top').replace('display:flex;gap:8px', `display:flex;gap:${g}px`)])),
    Q('pi-kar-skugga', 'Hur ska pilknappar ovanpå en bild se ut?', [
      ['Vit knapp med skugga', 'background:#fff;color:var(--sink);box-shadow:0 2px 10px rgba(0,0,0,.25)'],
      ['Vit knapp utan skugga', 'background:#fff;color:var(--sink)'],
      ['Mörk genomskinlig knapp', 'background:rgba(0,0,0,.45);color:#fff'],
      ['Bara vit pil med skugga', 'color:#fff;filter:drop-shadow(0 1px 3px rgba(0,0,0,.6))']
    ].map(([l, st]) => [l, pad(`<div style="position:relative;border-radius:var(--rc);overflow:hidden"><img class="pic" src="img/stadsgata.jpg" alt="Gata i en stad" style="border-radius:0"><div style="position:absolute;inset:0;display:flex;justify-content:space-between;align-items:center;padding:0 10px">${rb('chevL', 'border-radius:50%;' + st)}${rb('chev', 'border-radius:50%;' + st)}</div></div>`)]))
  ]));

  // =====================================================================
  // DRAGSPEL OCH RULLGARDIN
  // =====================================================================
  const acc = (closedIcon, openIcon, left = false, st = '') => {
    const row = (t, ic, open) => `<div style="padding:14px 0;${st}"><div style="display:flex;align-items:center;gap:12px;${left ? '' : 'justify-content:space-between'};font-weight:600">${left ? ic + `<span>${t}</span>` : `<span>${t}</span>` + ic}</div>${open ? `<p class="muted small" style="margin-top:6px;${left ? 'padding-left:32px' : ''}">${txt}</p>` : ''}</div>`;
    return pad(`<div class="panel" style="padding:2px 16px">${row('Hur bokar jag?', openIcon, true)}<div class="divider"></div>${row('Kan jag avboka?', closedIcon, false)}</div>`);
  };
  const ic = (k, st = '') => `<span style="display:inline-grid;place-items:center;flex:0 0 auto;${st}">${a(k, { s: '20px' })}</span>`;
  groups.push(G('pil-dragspel', 'Dragspel och rullgardin', [
    Q('pi-drag-ikon', 'Vilken ikon ska ett dragspel ha?', [
      ['Chevron ner', 'chevD', 'chevU'], ['Plus och minus', 'plus', 'minus'], ['Pil med skaft ner', 'arrowD', 'arrowU'], ['Triangel', 'tri', 'triD']
    ].map(([l, c, o]) => [l, acc(ic(c), ic(o))])),
    Q('pi-drag-oppet', 'Hur ska ikonen visa att en rad är öppen?', [
      ['Chevron vänds uppåt', ic('chevD'), ic('chevU')],
      ['Plus blir minus', ic('plus'), ic('minus')],
      ['Plus vrids till kryss', ic('plus'), ic('x')],
      ['Chevron höger blir ner', ic('chev'), ic('chevD')]
    ].map(([l, c, o]) => [l, acc(c, o)])),
    Q('pi-drag-placering', 'Var ska dragspelets ikon sitta?',
      [['Till höger', false], ['Till vänster, före texten', true]].map(([l, left]) => [l, acc(ic('chevD'), ic('chevU'), left)])),
    Q('pi-drag-platta', 'Ska dragspelets ikon ha en form runt sig?', [
      ['Bara ikonen', ''],
      ['I tunn ring', 'width:30px;height:30px;border-radius:50%;border:1.5px solid var(--sline)'],
      ['I tonad cirkel', 'width:30px;height:30px;border-radius:50%;background:var(--tint);color:var(--brand)'],
      ['I rundad fyrkant', 'width:30px;height:30px;border-radius:7px;background:var(--tint);color:var(--brand)']
    ].map(([l, st]) => [l, acc(ic('plus', st), ic('minus', st))])),
    Q('pi-drag-rorelse', 'Hur ska chevronen röra sig när raden öppnas?', [
      ['Vrids mjukt 180°', 'pi-drag-rorelse-a', '@keyframes pi-drag-rorelse-a{0%,35%{transform:rotate(0)}50%,85%{transform:rotate(180deg)}100%{transform:rotate(0)}}', 'chevD'],
      ['Byter direkt utan rörelse', 'pi-drag-rorelse-b', '@keyframes pi-drag-rorelse-b{0%,49%{transform:rotate(0)}50%,99%{transform:rotate(180deg)}100%{transform:rotate(0)}}', 'chevD'],
      ['Vrids 90° från höger till ner', 'pi-drag-rorelse-c', '@keyframes pi-drag-rorelse-c{0%,35%{transform:rotate(0)}50%,85%{transform:rotate(90deg)}100%{transform:rotate(0)}}', 'chev']
    ].map(([l, c, kf, k]) => [l, `<style>${kf}.${c}{display:inline-grid;animation:${c} 2.8s ${c.endsWith('b') ? 'step-end' : 'cubic-bezier(.4,0,.2,1)'} infinite}${reduce('.' + c)}</style>` + pad(`<div class="panel" style="padding:14px 16px;display:flex;justify-content:space-between;align-items:center;font-weight:600"><span>Hur bokar jag?</span><span class="${c}">${a(k, { s: '20px' })}</span></div>`)])),
    Q('pi-rull-ikon', 'Vilken pil ska en rullgardinslista ha?', [
      ['Chevron ner', a('chevD', { s: '18px' })], ['Liten triangel', a('triD', { s: '14px' })], ['Dubbelpil upp och ner', a('updown', { s: '18px' })], ['Pil med skaft ner', a('arrowD', { s: '18px' })]
    ].map(([l, i]) => [l, pad(`<div class="fld"><span class="lbl">Antal personer</span><div class="inp" style="justify-content:space-between;gap:8px"><span>2 personer</span><span style="color:var(--smuted);display:inline-flex">${i}</span></div></div>`)])),
    Q('pi-rull-avskild', 'Ska pilen i rullgardinen vara avskild från texten?', [
      ['Bara pilen', ''], ['Med tunn avdelare', 'border-left:1px solid var(--sline);padding-left:12px;height:24px'], ['I egen grå ruta', 'background:var(--ground);margin-right:-14px;padding:0 14px;height:100%;border-left:1px solid var(--sline)']
    ].map(([l, st]) => [l, pad(`<div class="fld"><span class="lbl">Antal personer</span><div class="inp" style="justify-content:space-between;gap:8px"><span>2 personer</span><span style="color:var(--smuted);display:inline-flex;align-items:center;${st}">${a('chevD', { s: '18px' })}</span></div></div>`)])),
    Q('pi-rull-textmeny', 'Hur ska en liten rullgardin i löptext se ut, som "Sortera"?', [
      ['Text och chevron', `<span style="display:inline-flex;align-items:center;gap:4px;font-weight:600">Populärast ${a('chevD', { s: '16px' })}</span>`],
      ['Text, chevron och understrykning', `<span style="display:inline-flex;align-items:center;gap:4px;font-weight:600;border-bottom:1.5px solid currentColor">Populärast ${a('chevD', { s: '16px' })}</span>`],
      ['I en liten ruta med kant', `<span style="display:inline-flex;align-items:center;gap:6px;font-weight:600;border:1px solid var(--sline);border-radius:var(--rf);padding:5px 10px;background:var(--field)">Populärast ${a('chevD', { s: '16px' })}</span>`],
      ['I en pill med kant', `<span class="chip" style="gap:6px;font-weight:600">Populärast ${a('chevD', { s: '16px' })}</span>`]
    ].map(([l, h]) => [l, cen(`<span class="muted">Sortera:</span>${h}`, 'gap:8px')]))
  ]));

  // =====================================================================
  // TILLBAKA, EXTERN LÄNK, BRÖDSMULOR, STEG OCH VISA FLER
  // =====================================================================
  const crumbs = (sep, sepSt = 'color:var(--smuted)') => cen(`<nav style="display:flex;flex-wrap:wrap;align-items:center;gap:8px;font-size:14px"><span style="color:var(--brand)">Start</span><span style="${sepSt};display:inline-flex">${sep}</span><span style="color:var(--brand)">Tjänster</span><span style="${sepSt};display:inline-flex">${sep}</span><span style="font-weight:600">Rubrik</span></nav>`);
  groups.push(G('pil-nav', 'Tillbaka, externa länkar och brödsmulor', [
    Q('pi-tillbaka-form', 'Hur ska en "Tillbaka"-länk se ut?', [
      ['Chevron och text', lk('Tillbaka', '', a('chevL', { s: '1.05em' }), 'gap:4px')],
      ['Pil med skaft och text', lk('Tillbaka', '', a('arrowL', { s: '1.05em' }))],
      ['Pil i ring och text', lk('Tillbaka', '', `<span style="display:inline-grid;place-items:center;width:30px;height:30px;border-radius:50%;border:1.5px solid var(--sline)">${a('arrowL', { s: '15px' })}</span>`, 'gap:10px')],
      ['Bara text', lk('Tillbaka')]
    ].map(([l, h]) => [l, pad(`<div class="stack" style="gap:14px">${h}<div class="h h2">Rubrik på sidan</div></div>`)])),
    Q('pi-tillbaka-farg', 'Vilken färg ska "Tillbaka"-länken ha?', [
      ['Länkfärg', 'var(--brand)'], ['Mörk som texten', 'var(--sink)'], ['Dämpad grå', 'var(--smuted)']
    ].map(([l, c]) => [l, pad(`<div class="stack" style="gap:14px">${lk('Tillbaka', '', a('chevL', { s: '1.05em' }), `gap:4px;color:${c}`)}<div class="h h2">Rubrik på sidan</div></div>`)])),
    Q('pi-extern-ikon', 'Hur ska en länk till en annan webbplats markeras?', [
      ['Diagonal pil ↗', a('diag', { s: '.95em' })], ['Ruta med pil ut', a('ext', { s: '.95em' })], ['Pil med skaft →', a('arrow', { s: '.95em' })], ['Ingen markering', '']
    ].map(([l, i]) => [l, cen(`<div class="stack" style="gap:12px">${lk('Se karta', i, '', 'gap:5px')}<p>Läs mer i <span class="link">guiden${i ? ' ' + i : ''}</span>.</p></div>`)])),
    Q('pi-extern-storlek', 'Hur stor ska ikonen för extern länk vara?', [
      ['Liten och upphöjd', 'width:.7em;height:.7em;vertical-align:.35em'], ['Lika stor som texten', 'width:.95em;height:.95em;vertical-align:-.1em']
    ].map(([l, st]) => [l, pad(`<p>Läs mer i <span class="link">guiden</span><span style="color:var(--brand)"> ${a('diag', { s: '.95em', st })}</span> innan du bokar.</p>`)])),
    Q('pi-brod-tecken', 'Vilket tecken ska skilja brödsmulorna åt?', [
      ['Chevron ›', a('chev', { s: '14px' })], ['Snedstreck /', '/'], ['Pil →', a('arrow', { s: '14px' })], ['Punkt ·', '·']
    ].map(([l, s]) => [l, crumbs(s)])),
    Q('pi-brod-ton', 'Hur tydligt ska brödsmulornas skiljetecken synas?', [
      ['Lika mörkt som texten', 'color:var(--sink)'], ['Dämpad grå', 'color:var(--smuted)'], ['Mycket ljust', 'color:rgba(26,28,30,.3)']
    ].map(([l, st]) => [l, crumbs(a('chev', { s: '14px' }), st)])),
    Q('pi-steg-riktning', 'Hur ska ett stegflöde visa vägen mellan stegen?', [
      ['Chevron mellan stegen', 'chev'], ['Pil med skaft mellan', 'arrow'], ['Linje mellan stegen', 'line'], ['Pilformade block', 'blocks']
    ].map(([l, m]) => {
      const st = ['Välj', 'Uppgifter', 'Betala'];
      if (m === 'blocks') return [l, cen(`<div style="display:flex;width:100%;max-width:340px">${st.map((t, i) => `<span style="flex:1;min-width:0;text-align:center;font-size:13px;font-weight:600;padding:8px 6px 8px ${i ? 16 : 8}px;margin-left:${i ? -6 : 0}px;background:${i === 0 ? 'var(--brand)' : 'var(--tint)'};color:${i === 0 ? '#fff' : 'var(--sink)'};clip-path:polygon(0 0,calc(100% - 10px) 0,100% 50%,calc(100% - 10px) 100%,0 100%${i ? ',10px 50%' : ''})">${t}</span>`).join('')}</div>`)];
      const sep = m === 'line' ? '<span style="flex:1;min-width:12px;height:1px;background:var(--sline)"></span>' : `<span style="color:var(--smuted);display:inline-flex">${a(m, { s: '16px' })}</span>`;
      return [l, cen(`<div style="display:flex;align-items:center;gap:10px;font-size:14px;width:100%;max-width:340px;justify-content:center">${st.map((t, i) => `<span style="${i === 0 ? 'font-weight:700' : 'color:var(--smuted)'};white-space:nowrap">${t}</span>`).join(sep)}</div>`)];
    })),
    Q('pi-nasta-foreg', 'Hur ska "Föregående" och "Nästa" längst ner på en sida se ut?', [
      ['Pilar och text', `${lk('Föregående', '', a('arrowL', { s: '1.05em' }))}${lk('Nästa', a('arrow', { s: '1.05em' }))}`],
      ['Chevrons och text', `${lk('Föregående', '', a('chevL', { s: '1.05em' }), 'gap:3px')}${lk('Nästa', a('chev', { s: '1.05em' }), '', 'gap:3px')}`],
      ['Bara text', `${lk('Föregående')}${lk('Nästa')}`],
      ['Runda pilknappar', `${rb('arrowL', KB.kontur)}${rb('arrow', KB.kontur)}`]
    ].map(([l, h]) => [l, pad(`<div style="display:flex;justify-content:space-between;align-items:center;gap:10px;border-top:1px solid var(--sline);padding-top:16px">${h}</div>`)]))
  ]));

  // =====================================================================
  // PILENS RÖRELSE VID HOVER (visas som slinga)
  // =====================================================================
  // Varje alternativ: egen klass och keyframes. Slingan visar vila → hover → vila.
  const loop = (c, kf, dur = '2.4s', ease = 'cubic-bezier(.4,0,.2,1)') => `<style>@keyframes ${c}{${kf}}.${c}{display:inline-flex;animation:${c} ${dur} ${ease} infinite}${reduce('.' + c)}</style>`;
  const hoverNote = '<span class="small muted" style="display:block;text-align:center;margin-top:10px">Visar läget vid hover i en slinga</span>';
  groups.push(G('pil-hover', 'Pilens rörelse vid hover', [
    Q('pi-hv-lank', 'Hur ska pilen röra sig när man håller musen över "Läs mer"?', [
      ['Ingen rörelse', '', ''],
      ['Glider 4 px åt höger', 'pi-hv-lank-b', '0%,30%{transform:translateX(0)}45%,80%{transform:translateX(4px)}100%{transform:translateX(0)}'],
      ['Glider 8 px åt höger', 'pi-hv-lank-c', '0%,30%{transform:translateX(0)}45%,80%{transform:translateX(8px)}100%{transform:translateX(0)}'],
      ['Tonas in från dold', 'pi-hv-lank-d', '0%,30%{opacity:0;transform:translateX(-6px)}45%,80%{opacity:1;transform:translateX(0)}100%{opacity:0;transform:translateX(-6px)}']
    ].map(([l, c, kf]) => [l, (c ? loop(c, kf) : '') + cen(`<div style="text-align:center">${lk('Läs mer', `<span class="${c}" style="display:inline-flex">${a('arrow', { s: '1.05em' })}</span>`)}${hoverNote}</div>`)])),
    Q('pi-hv-skaft', 'Ska pilens skaft växa vid hover?', [
      ['Pilen står still', '', ''],
      ['Hela pilen flyttas', 'pi-hv-skaft-b', '0%,30%{transform:translateX(0)}45%,80%{transform:translateX(5px)}100%{transform:translateX(0)}'],
      ['Skaftet blir längre', 'pi-hv-skaft-c', '0%,30%{width:16px}45%,80%{width:26px}100%{width:16px}']
    ].map(([l, c, kf]) => {
      const arr = c === 'pi-hv-skaft-c'
        ? `<span class="${c}" style="position:relative;display:inline-block;height:16px;width:16px"><span style="position:absolute;left:0;right:1px;top:7px;height:2px;border-radius:2px;background:currentColor"></span><span style="position:absolute;right:1px;top:3px;width:9px;height:9px;border-top:2px solid currentColor;border-right:2px solid currentColor;border-radius:1px;transform:translate(0,.5px) rotate(45deg);transform-origin:center"></span></span>`
        : `<span class="${c}" style="display:inline-flex">${a('arrow', { s: '16px' })}</span>`;
      return [l, (c ? loop(c, kf) : '') + cen(`<div style="text-align:center">${lk('Se alla', arr)}${hoverNote}</div>`)];
    })),
    Q('pi-hv-knapp', 'Vad ska pilen i en knapp göra vid hover?', [
      ['Ingen rörelse', '', ''],
      ['Glider åt höger', 'pi-hv-knapp-b', '0%,30%{transform:translateX(0)}45%,80%{transform:translateX(4px)}100%{transform:translateX(0)}'],
      ['Glider ut och kommer tillbaka', 'pi-hv-knapp-c', '0%,30%{transform:translateX(0);opacity:1}40%{transform:translateX(14px);opacity:0}41%{transform:translateX(-14px);opacity:0}52%,100%{transform:translateX(0);opacity:1}'],
      ['Dyker upp vid hover', 'pi-hv-knapp-d', '0%,30%{max-width:0;opacity:0;margin-left:-8px}45%,80%{max-width:20px;opacity:1;margin-left:0}100%{max-width:0;opacity:0;margin-left:-8px}']
    ].map(([l, c, kf]) => [l, (c ? loop(c, kf) : '') + cen(`<div style="text-align:center">${sb('Fortsätt', `<span class="${c}" style="display:inline-flex;overflow:hidden">${a('arrow', { s: '18px' })}</span>`)}${hoverNote}</div>`)])),
    Q('pi-hv-hastighet', 'Hur snabbt ska pilen glida vid hover?', [
      ['Snabbt, 120 ms', 'pi-hv-hast-a', '.12s'], ['Mellan, 200 ms', 'pi-hv-hast-b', '.2s'], ['Långsamt, 350 ms', 'pi-hv-hast-c', '.35s']
    ].map(([l, c, d]) => {
      const ms = parseFloat(d) * 1000, T = 2400, p = v => (v / T * 100).toFixed(1) + '%';
      const kf = `0%,${p(800)}{transform:translateX(0)}${p(800 + ms)},${p(1800)}{transform:translateX(6px)}${p(1800 + ms)},100%{transform:translateX(0)}`;
      return [l, loop(c, kf, '2.4s', 'linear') + cen(`<div style="text-align:center">${lk('Läs mer', `<span class="${c}" style="display:inline-flex">${a('arrow', { s: '1.05em' })}</span>`)}${hoverNote}</div>`)];
    })),
    Q('pi-hv-kort', 'Vad ska hörnpilen på ett kort göra vid hover?', [
      ['Ingen rörelse', '', ''],
      ['Glider snett uppåt', 'pi-hv-kort-b', '0%,30%{transform:translate(0,0)}45%,80%{transform:translate(3px,-3px)}100%{transform:translate(0,0)}', 'diag'],
      ['Vrids från → till ↗', 'pi-hv-kort-c', '0%,30%{transform:rotate(0)}45%,80%{transform:rotate(-45deg)}100%{transform:rotate(0)}', 'arrow'],
      ['Ringen fylls i', 'pi-hv-kort-d', '0%,30%{background:transparent;color:var(--brand)}45%,80%{background:var(--brand);color:#fff}100%{background:transparent;color:var(--brand)}', 'diag']
    ].map(([l, c, kf, k = 'diag']) => {
      const ring = c === 'pi-hv-kort-d';
      return [l, (c ? loop(c, kf) : '') + card(`<div style="position:absolute;top:14px;right:14px;color:var(--brand)"><span class="${c}" style="display:inline-grid;place-items:center;width:30px;height:30px;border-radius:50%;${ring ? 'border:1.5px solid var(--brand)' : ''}">${a(k, { s: '18px' })}</span></div>`, 'padding-right:52px') + hoverNote];
    })),
    Q('pi-hv-karusell', 'Vad ska hända med en karusellknapp vid hover?', [
      ['Ingenting', '', ''],
      ['Bakgrunden mörknar', 'pi-hv-kar-b', '0%,30%{background:var(--box)}45%,80%{background:#E4E6E8}100%{background:var(--box)}'],
      ['Knappen fylls med märkesfärg', 'pi-hv-kar-c', '0%,30%{background:var(--box);color:var(--sink)}45%,80%{background:var(--brand);color:#fff}100%{background:var(--box);color:var(--sink)}'],
      ['Pilen glider lite', 'pi-hv-kar-d', '0%,30%{padding-left:0}45%,80%{padding-left:6px}100%{padding-left:0}']
    ].map(([l, c, kf]) => [l, (c ? loop(c, kf) : '') + cen(`<div style="display:flex;flex-direction:column;align-items:center"><div style="display:flex;gap:8px">${rb('chevL', KB.rundfylld)}<span class="${c}" style="display:inline-grid;place-items:center;width:40px;height:40px;${KB.rundfylld}">${a('chev', { s: '18px' })}</span></div>${hoverNote}</div>`)])),
    Q('pi-hv-tillbaka', 'Ska tillbakapilen röra sig vid hover?', [
      ['Ingen rörelse', '', ''],
      ['Glider åt vänster', 'pi-hv-tb-b', '0%,30%{transform:translateX(0)}45%,80%{transform:translateX(-4px)}100%{transform:translateX(0)}']
    ].map(([l, c, kf]) => [l, (c ? loop(c, kf) : '') + cen(`<div style="text-align:center">${lk('Tillbaka', '', `<span class="${c}" style="display:inline-flex">${a('arrowL', { s: '1.05em' })}</span>`)}${hoverNote}</div>`)])),
    Q('pi-hv-understrykning', 'Vad ska hända med texten i en pil-länk vid hover?', [
      ['Bara pilen rör sig', 'pi-hv-us-a', 'u0'],
      ['Understrykning dyker upp', 'pi-hv-us-b', 'u1'],
      ['Understrykning växer fram', 'pi-hv-us-c', 'u2']
    ].map(([l, c, m]) => {
      const arrC = c + '-p';
      const css = `<style>@keyframes ${arrC}{0%,30%{transform:translateX(0)}45%,80%{transform:translateX(4px)}100%{transform:translateX(0)}}.${arrC}{display:inline-flex;animation:${arrC} 2.4s cubic-bezier(.4,0,.2,1) infinite}`
        + (m === 'u1' ? `@keyframes ${c}{0%,37%{text-decoration-color:transparent}38%,80%{text-decoration-color:currentColor}81%,100%{text-decoration-color:transparent}}.${c}{text-decoration:underline;text-underline-offset:4px;animation:${c} 2.4s step-end infinite}` : '')
        + (m === 'u2' ? `@keyframes ${c}{0%,30%{background-size:0 1.5px}45%,80%{background-size:100% 1.5px}100%{background-size:0 1.5px}}.${c}{background:linear-gradient(currentColor,currentColor) left bottom/0 1.5px no-repeat;padding-bottom:2px;animation:${c} 2.4s cubic-bezier(.4,0,.2,1) infinite}` : '')
        + reduce(`.${c},.${arrC}`) + '</style>';
      return [l, css + cen(`<div><span style="display:inline-flex;align-items:center;gap:6px;color:var(--brand);font-weight:600"><span class="${c}">Läs mer</span><span class="${arrC}">${a('arrow', { s: '1.05em' })}</span></span>${hoverNote}</div>`)];
    }))
  ]));

  // =====================================================================
  // ETIKETTER OCH MÄRKEN
  // =====================================================================
  const BADGE = 'display:inline-flex;align-items:center;gap:5px;font-size:12px;font-weight:700;line-height:1;padding:5px 9px;white-space:nowrap;';
  const STY = {
    fylld: 'background:var(--brand);color:#fff;',
    tonad: 'background:var(--tint);color:var(--brand);',
    kontur: 'background:var(--box);color:var(--brand);box-shadow:inset 0 0 0 1px currentColor;',
    vit: 'background:#fff;color:var(--sink);'
  };
  const bdg = (t, st = '') => `<span style="${BADGE}border-radius:999px;${STY.fylld}${st}">${t}</span>`;
  // Produktkort med platshållarbild. tl = innehåll uppe till vänster på bilden osv.
  const pcard = ({ tl = '', tr = '', above = '', price = '', imgSt = '', inner = '' } = {}) => `<div class="pad"><div style="max-width:240px;margin:0 auto"><div style="position:relative;overflow:hidden;border-radius:var(--rc)">${box('border-radius:0;' + imgSt)}${tl ? `<div style="position:absolute;top:10px;left:10px;display:flex;gap:6px;flex-wrap:wrap">${tl}</div>` : ''}${tr ? `<div style="position:absolute;top:10px;right:10px">${tr}</div>` : ''}${inner}</div><div style="padding-top:10px;display:flex;flex-direction:column;gap:4px">${above}<div style="font-weight:600">Produktnamn</div><div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap"><span class="price">495 kr</span>${price}</div></div></div></div>`;
  groups.push(G('etiketter', 'Etiketter och märken', [
    Q('pi-et-form', 'Vilken form ska en etikett som "Nyhet" ha?', [
      ['Pill, helt rund', bdg('Nyhet')],
      ['Rundad fyrkant', bdg('Nyhet', 'border-radius:5px')],
      ['Skarpa hörn', bdg('Nyhet', 'border-radius:0')],
      ['Hörnband', 'band']
    ].map(([l, b]) => [l, b === 'band'
      ? pcard({ inner: `<div style="position:absolute;top:14px;left:-34px;width:120px;text-align:center;transform:rotate(-45deg);${BADGE}justify-content:center;${STY.fylld}">Nyhet</div>` })
      : pcard({ tl: b })])),
    Q('pi-et-stil', 'Hur ska en etikett vara färgad?', [
      ['Fylld', STY.fylld], ['Tonad', STY.tonad], ['Kontur', STY.kontur], ['Vit på bilden', STY.vit]
    ].map(([l, st]) => [l, pcard({ tl: `<span style="${BADGE}border-radius:999px;${st}">Populär</span>` })])),
    Q('pi-et-storlek', 'Hur stor ska etiketten vara?', [
      ['Liten, 11 px text', 'font-size:11px;padding:4px 7px'], ['Mellan, 12 px text', ''], ['Stor, 14 px text', 'font-size:14px;padding:6px 12px']
    ].map(([l, st]) => [l, pcard({ tl: bdg('Nyhet', st) })])),
    Q('pi-et-versaler', 'Ska texten i etiketter skrivas med versaler?', [
      ['Vanlig skrift', ''], ['Versaler med spärrning', 'text-transform:uppercase;letter-spacing:.07em;font-size:11px']
    ].map(([l, st]) => [l, pcard({ tl: bdg('Nyhet', st) })])),
    Q('pi-et-vikt', 'Hur fet ska texten i en etikett vara?', [
      ['Medium (500)', 'font-weight:500'], ['Halvfet (600)', 'font-weight:600'], ['Fet (700)', '']
    ].map(([l, st]) => [l, pcard({ tl: bdg('Nyhet', st) })])),
    Q('pi-et-luft', 'Hur mycket luft ska det vara i etiketten?', [
      ['Tät', 'padding:3px 6px'], ['Normal', ''], ['Luftig', 'padding:7px 13px']
    ].map(([l, st]) => [l, pcard({ tl: bdg('Nyhet', st) })])),
    Q('pi-et-placering', 'Var ska etiketten sitta på ett kort?', [
      ['Uppe till vänster på bilden', { tl: bdg('Nyhet') }],
      ['Uppe till höger på bilden', { tr: bdg('Nyhet') }],
      ['Ovanför namnet, under bilden', { above: `<div>${bdg('Nyhet')}</div>` }],
      ['Bredvid priset', { price: bdg('Nyhet') }]
    ].map(([l, o]) => [l, pcard(o)])),
    Q('pi-et-inset', 'Hur långt in från bildens hörn ska etiketten sitta?', [
      ['Nära kanten, 6 px', 6], ['Normalt, 10 px', 10], ['Luftigt, 16 px', 16]
    ].map(([l, n]) => [l, pcard({ inner: `<div style="position:absolute;top:${n}px;left:${n}px">${bdg('Nyhet')}</div>` })])),
    Q('pi-et-flera', 'Hur ska två etiketter på samma kort sitta?', [
      ['Bredvid varandra', 'row'], ['Under varandra', 'col'], ['Bara den viktigaste', 'one']
    ].map(([l, m]) => [l, pcard({ inner: `<div style="position:absolute;top:10px;left:10px;display:flex;gap:6px;${m === 'col' ? 'flex-direction:column;align-items:flex-start' : ''}">${bdg('Nyhet')}${m === 'one' ? '' : bdg('−20 %', 'background:var(--bad)')}</div>` })])),
    Q('pi-et-rabattfarg', 'Vilken färg ska en rabattetikett "−20 %" ha?', [
      ['Röd fylld', 'background:var(--bad);color:#fff'], ['Mörk fylld', 'background:var(--sink);color:#fff'], ['Märkesfärg', ''], ['Tonad röd', 'background:#FBE9E7;color:var(--bad)']
    ].map(([l, st]) => [l, pcard({ tl: bdg('−20 %', st) })])),
    Q('pi-et-rabattform', 'Hur ska en rabatt visas på ett kort?', [
      ['Pill på bilden', pcard({ tl: bdg('−20 %', 'background:var(--bad)') })],
      ['Rund klisterlapp på bilden', pcard({ tr: `<span style="display:inline-grid;place-items:center;width:46px;height:46px;border-radius:50%;background:var(--bad);color:#fff;font-size:13px;font-weight:800">−20%</span>` })],
      ['Rött pris och överstruket', pcard({ price: '<s class="muted small">620 kr</s>' }).replace('<span class="price">495 kr</span>', '<span class="price" style="color:var(--bad)">495 kr</span>')],
      ['Liten etikett bredvid priset', pcard({ price: bdg('−20 %', 'background:var(--bad);font-size:11px;padding:4px 7px') })]
    ]),
    Q('pi-et-slutsald', 'Hur ska "Slutsåld" visas på ett kort?', [
      ['Etikett och nedtonad bild', pcard({ tl: bdg('Slutsåld', 'background:var(--sink)'), imgSt: 'opacity:.45' })],
      ['Bara etikett', pcard({ tl: bdg('Slutsåld', 'background:var(--sink)') })],
      ['Band över bilden', pcard({ inner: `<div style="position:absolute;left:0;right:0;top:50%;transform:translateY(-50%);background:rgba(26,28,30,.78);color:#fff;text-align:center;font-weight:700;font-size:13px;padding:8px">Slutsåld</div>` })],
      ['Text vid priset', pcard({ price: '<span class="small" style="color:var(--bad);font-weight:600">Slutsåld</span>' })]
    ]),
    Q('pi-et-oppet', 'Hur ska "Öppet nu" visas som etikett?', [
      ['Grön prick och text', `<span style="display:inline-flex;align-items:center;gap:6px;font-size:13px;font-weight:600;color:var(--sink)"><span style="width:8px;height:8px;border-radius:50%;background:var(--ok)"></span>Öppet nu</span>`],
      ['Tonad grön pill', `<span style="${BADGE}border-radius:999px;background:#E3F1E8;color:var(--ok)">Öppet nu</span>`],
      ['Tonad pill med prick', `<span style="${BADGE}border-radius:999px;background:#E3F1E8;color:var(--ok)"><span style="width:6px;height:6px;border-radius:50%;background:currentColor"></span>Öppet nu</span>`],
      ['Fylld grön pill', `<span style="${BADGE}border-radius:999px;background:var(--ok);color:#fff">Öppet nu</span>`],
      ['Bara grön text', `<span style="font-size:13px;font-weight:600;color:var(--ok)">Öppet nu</span>`]
    ].map(([l, h]) => [l, pad(`<div class="panel stack" style="gap:6px"><div style="display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap"><span class="h h3">Rubrik</span>${h}</div><span class="muted small">Storgatan 12 · Stänger 18.00</span></div>`)])),
    Q('pi-et-ikon', 'Ska en etikett ha en liten ikon?', [
      ['Bara text', ''], ['Ikon före texten', a('bolt', { s: '12px', fill: 'currentColor', w: 0 })], ['Prick före texten', '<span style="width:6px;height:6px;border-radius:50%;background:currentColor"></span>']
    ].map(([l, i]) => [l, pcard({ tl: bdg(i + 'Populär') })])),
    Q('pi-et-pabild', 'Hur ska en etikett synas ovanpå ett foto?', [
      ['Vit etikett', STY.vit], ['Mörk etikett', 'background:var(--sink);color:#fff;'], ['Genomskinlig mörk', 'background:rgba(0,0,0,.45);color:#fff;backdrop-filter:blur(6px);'], ['Märkesfärg', STY.fylld]
    ].map(([l, st]) => [l, `<div class="pad"><div style="position:relative;max-width:240px;margin:0 auto"><img class="pic" src="img/vardagsrum.jpg" alt="Vardagsrum"><span style="position:absolute;top:10px;left:10px;${BADGE}border-radius:999px;${st}">Nyhet</span></div></div>`])),
    Q('pi-et-status', 'Hur ska statusetiketter i en lista se ut?', [
      ['Tonade färger', 'tonad'], ['Fyllda färger', 'fylld'], ['Kontur i färg', 'kontur'], ['Prick och text', 'prick']
    ].map(([l, m]) => {
      const st = [['Bekräftad', 'var(--ok)', '#E3F1E8'], ['Väntar', 'var(--warn)', '#F8EEDC'], ['Avbokad', 'var(--bad)', '#FBE9E7']];
      const one = ([t, c, bg]) => m === 'prick' ? `<span style="display:inline-flex;align-items:center;gap:6px;font-size:13px;font-weight:600"><span style="width:8px;height:8px;border-radius:50%;background:${c}"></span>${t}</span>`
        : `<span style="${BADGE}border-radius:999px;${m === 'tonad' ? `background:${bg};color:${c}` : m === 'fylld' ? `background:${c};color:#fff` : `color:${c};box-shadow:inset 0 0 0 1px ${c};background:var(--box)`}">${t}</span>`;
      return [l, pad(`<div class="panel" style="padding:4px 16px">${st.map((s, i) => `<div style="display:flex;justify-content:space-between;align-items:center;gap:8px;padding:10px 0;${i ? 'border-top:1px solid var(--sline)' : ''}"><span class="small">Bokning ${i + 1}</span>${one(s)}</div>`).join('')}</div>`)];
    })),
    Q('pi-et-tonkant', 'Ska tonade etiketter ha en kant?', [
      ['Utan kant', ''], ['Tunn kant i samma ton', 'box-shadow:inset 0 0 0 1px rgba(36,64,94,.25)']
    ].map(([l, st]) => [l, cen(['Nyhet', 'Populär', 'Tre kvar'].map(t => `<span style="${BADGE}border-radius:999px;${STY.tonad}${st}">${t}</span>`).join(''), 'gap:8px')])),
    Q('pi-et-meny', 'Hur ska "Ny" markeras bredvid en menypunkt?', [
      ['Liten pill efter texten', bdg('Ny', 'font-size:10px;padding:3px 6px')],
      ['Tonad pill efter texten', `<span style="${BADGE}border-radius:999px;${STY.tonad}font-size:10px;padding:3px 6px">Ny</span>`],
      ['Bara en prick', '<span style="width:7px;height:7px;border-radius:50%;background:var(--brand)"></span>'],
      ['Upphöjd text', '<sup style="font-size:10px;font-weight:700;color:var(--brand);align-self:flex-start">Ny</sup>']
    ].map(([l, b]) => [l, cen(`<div style="display:flex;gap:22px;font-weight:500;font-size:15px;flex-wrap:wrap"><span>Tjänster</span><span style="display:inline-flex;align-items:center;gap:6px">Priser${b}</span><span>Kontakt</span></div>`)]))
  ]));

  // =====================================================================
  // CHIPS OCH TAGGAR
  // =====================================================================
  // chipRow: tre chips där det andra är valt. off/on = stil för ovalt/valt chip.
  const CH = 'display:inline-flex;align-items:center;gap:6px;height:34px;padding:0 14px;border-radius:999px;font-size:14px;font-weight:500;white-space:nowrap;';
  const OFF = 'background:var(--box);border:1px solid var(--sline);color:var(--sink);';
  const ON = 'background:var(--brand);border:1px solid var(--brand);color:#fff;';
  const chipRow = (off = OFF, on = ON, extra = '', labels = ['Alla', 'Frukost', 'Lunch', 'Middag'], onIdx = [1], pre = () => '') =>
    cen(labels.map((t, i) => `<span style="${CH}${extra}${onIdx.includes(i) ? on : off}">${pre(i, onIdx.includes(i))}${t}</span>`).join(''), 'gap:8px');
  groups.push(G('chips', 'Chips och taggar', [
    Q('pi-chip-vald', 'Hur ska ett valt filterchip se ut?', [
      ['Fylld mörk', ON],
      ['Tonad med kant i märkesfärg', 'background:var(--tint);border:1px solid var(--brand);color:var(--brand);'],
      ['Tonad utan kant', 'background:var(--tint);border:1px solid var(--tint);color:var(--brand);'],
      ['Vit med tjock kant', 'background:var(--box);border:2px solid var(--brand);color:var(--brand);']
    ].map(([l, on]) => [l, chipRow(OFF, on)])),
    Q('pi-chip-ovald', 'Hur ska ovalda chips se ut?', [
      ['Vit med tunn kant', OFF], ['Grå yta utan kant', 'background:#ECEDEE;border:1px solid #ECEDEE;color:var(--sink);'], ['Genomskinlig med kant', 'background:transparent;border:1px solid var(--sline);color:var(--sink);']
    ].map(([l, off]) => [l, chipRow(off)])),
    Q('pi-chip-form', 'Vilken form ska chips ha?', [
      ['Pill, helt rund', '999px'], ['Rundade hörn, 8 px', '8px'], ['Lätt rundade, 4 px', '4px']
    ].map(([l, r]) => [l, chipRow(OFF, ON, `border-radius:${r};`)])),
    Q('pi-chip-storlek', 'Hur stora ska chips vara?', [
      ['Små, 28 px höga', 'height:28px;padding:0 11px;font-size:13px;'], ['Mellan, 34 px höga', ''], ['Stora, 40 px höga', 'height:40px;padding:0 17px;font-size:15px;']
    ].map(([l, ex]) => [l, chipRow(OFF, ON, ex)])),
    Q('pi-chip-kant', 'Hur tjock ska kanten på ovalda chips vara?', [
      ['Ingen kant', 'background:#ECEDEE;border:1px solid #ECEDEE;color:var(--sink);'], ['Tunn, 1 px', OFF], ['Tydlig, 1,5 px', 'background:var(--box);border:1.5px solid rgba(26,28,30,.3);color:var(--sink);']
    ].map(([l, off]) => [l, chipRow(off)])),
    Q('pi-chip-bock', 'Ska ett valt chip få en bock?', [
      ['Bock och fyllning', ON, true], ['Bara fyllning', ON, false], ['Bock och tonad yta', 'background:var(--tint);border:1px solid var(--tint);color:var(--brand);', true]
    ].map(([l, on, ck]) => [l, chipRow(OFF, on, '', undefined, [1], (i, sel) => sel && ck ? a('check', { s: '15px' }) : '')])),
    Q('pi-chip-kryss', 'Hur ska ett aktivt filter som går att ta bort se ut?', [
      ['Kryss efter texten', i => a('x', { s: '14px' })],
      ['Kryss i liten cirkel', i => `<span style="display:inline-grid;place-items:center;width:18px;height:18px;border-radius:50%;background:rgba(255,255,255,.22)">${a('x', { s: '11px', w: 2 })}</span>`],
      ['Kryss med avdelare', i => `<span style="width:1px;align-self:stretch;margin:8px 2px;background:rgba(255,255,255,.35)"></span>${a('x', { s: '14px' })}`],
      ['Inget kryss', i => '']
    ].map(([l, x]) => [l, cen(['Frukost', 'Under 500 kr'].map(t => `<span style="${CH}${ON}${l === 'Inget kryss' ? '' : 'padding-right:10px;'}">${t}${x()}</span>`).join('') + `<span style="font-size:14px;font-weight:600;color:var(--brand)">Rensa</span>`, 'gap:8px')])),
    Q('pi-chip-ikon', 'Ska chips ha en ikon före texten?', [
      ['Bara text', false], ['Ikon före texten', true]
    ].map(([l, on]) => [l, chipRow(OFF, ON, '', ['Nära mig', 'Idag', 'Prisklass'], [1], i => on ? a(['pin', 'cal', 'tag'][i], { s: '15px', w: 1.75 }) : '')])),
    Q('pi-chip-meny', 'Hur ska ett chip som öppnar en meny se ut?', [
      ['Chevron ner efter texten', a('chevD', { s: '15px' })], ['Liten triangel', a('triD', { s: '11px' })], ['Utan pil', '']
    ].map(([l, i]) => [l, cen(['Pris', 'Datum', 'Antal'].map(t => `<span style="${CH}${OFF}${i ? 'padding-right:11px;' : ''}">${t}${i}</span>`).join(''), 'gap:8px')])),
    Q('pi-chip-antal', 'Ska ett filterchip visa hur många träffar det ger?', [
      ['Utan antal', t => ''],
      ['Antal i parentes', (t, n) => `<span style="opacity:.6">(${n})</span>`],
      ['Antal i liten bubbla', (t, n, sel) => `<span style="font-size:11px;font-weight:700;line-height:1;padding:3px 6px;border-radius:999px;${sel ? 'background:rgba(255,255,255,.22)' : 'background:var(--tint);color:var(--brand)'}">${n}</span>`]
    ].map(([l, f]) => [l, cen([['Frukost', 12], ['Lunch', 8], ['Middag', 21]].map(([t, n], i) => `<span style="${CH}${i === 1 ? ON : OFF}">${t}${f(t, n, i === 1)}</span>`).join(''), 'gap:8px')])),
    Q('pi-chip-glapp', 'Hur tätt ska chips sitta?', [
      ['Tätt, 6 px', 6], ['Normalt, 8 px', 8], ['Luftigt, 12 px', 12]
    ].map(([l, g]) => [l, chipRow().replace('gap:8px', `gap:${g}px`)])),
    Q('pi-chip-mobil', 'Hur ska en lång rad med chips visas på mobil?', [
      ['Radbryts till flera rader', 'wrap'], ['En rad som går att svepa', 'scroll']
    ].map(([l, m]) => {
      const labels = ['Alla', 'Frukost', 'Lunch', 'Middag', 'Fika', 'Helg', 'Vegetariskt'];
      const items = labels.map((t, i) => `<span style="${CH}${i === 1 ? ON : OFF}flex:0 0 auto">${t}</span>`).join('');
      return [l, pad(`<div style="max-width:300px;margin:0 auto;position:relative">${m === 'wrap' ? `<div style="display:flex;flex-wrap:wrap;gap:8px">${items}</div>` : `<div style="display:flex;gap:8px;overflow:hidden">${items}</div><div style="position:absolute;top:0;right:0;bottom:0;width:48px;background:linear-gradient(90deg,transparent,var(--ground))"></div>`}</div>`)];
    })),
    Q('pi-tag-amne', 'Hur ska taggar (ämnesord) under en text se ut?', [
      ['Tonade pills', t => `<span class="tag">${t}</span>`],
      ['Små konturrutor', t => `<span style="font-size:12px;font-weight:500;padding:2px 8px;border:1px solid var(--sline);border-radius:4px">${t}</span>`],
      ['Grå rutor med skarpa hörn', t => `<span style="font-size:12px;font-weight:500;padding:3px 8px;background:#ECEDEE">${t}</span>`],
      ['Text med #', t => `<span style="font-size:13px;font-weight:600;color:var(--brand)">#${t.toLowerCase()}</span>`]
    ].map(([l, f]) => [l, pad(`<div class="stack"><div class="h h3">Rubrik på texten</div><p class="muted small">${txt}</p><div style="display:flex;flex-wrap:wrap;gap:6px;align-items:center">${['Guide', 'Vinter', 'Tips'].map(f).join('')}</div></div>`)]))
  ]));

  // =====================================================================
  // AVDELARE
  // =====================================================================
  const dvList = (dv, gap = 12) => pad(`<div class="panel" style="padding:6px 16px">${['Rad ett', 'Rad två', 'Rad tre'].map((t, i) => `${i ? dv : ''}<div style="display:flex;justify-content:space-between;padding:${gap}px 0"><span>${t}</span><span class="muted">495 kr</span></div>`).join('')}</div>`);
  const hr = st => `<div style="height:0;border-top:${st}"></div>`;
  groups.push(G('avdelare', 'Avdelare', [
    Q('pi-avd-tjocklek', 'Hur tjock ska en avdelande linje vara?', [
      ['Hårfin, 0,5 px', '0.5px solid var(--sline)'], ['Tunn, 1 px', '1px solid var(--sline)'], ['Tydlig, 2 px', '2px solid var(--sline)']
    ].map(([l, st]) => [l, dvList(hr(st))])),
    Q('pi-avd-ton', 'Hur mörk ska en avdelande linje vara?', [
      ['Mycket ljus', 'rgba(26,28,30,.07)'], ['Ljus', 'rgba(26,28,30,.16)'], ['Tydlig', 'rgba(26,28,30,.35)']
    ].map(([l, c]) => [l, dvList(hr('1px solid ' + c))])),
    Q('pi-avd-stil', 'Vilken sorts avdelare ska skilja rader åt?', [
      ['Heldragen linje', hr('1px solid var(--sline)'), 12], ['Streckad linje', hr('1px dashed rgba(26,28,30,.3)'), 12], ['Punktrad', hr('2px dotted rgba(26,28,30,.3)'), 12], ['Bara mellanrum', '', 16]
    ].map(([l, dv, g]) => [l, dvList(dv, g)])),
    Q('pi-avd-indrag', 'Hur bred ska avdelaren vara i en lista med ikoner?', [
      ['Hela bredden', 'full'], ['Börjar efter ikonen', 'inset'], ['Med luft på båda sidor', 'both']
    ].map(([l, m]) => [l, pad(`<div class="panel" style="padding:4px 0">${['Inställningar', 'Betalning', 'Adress'].map((t, i) => `${i ? `<div style="height:1px;background:var(--sline);margin:${m === 'full' ? '0' : m === 'inset' ? '0 0 0 50px' : '0 16px'}"></div>` : ''}<div style="display:flex;align-items:center;gap:14px;padding:12px 16px"><span style="width:20px;height:20px;border-radius:6px;background:var(--accent);flex:0 0 auto"></span><span>${t}</span></div>`).join('')}</div>`)])),
    Q('pi-avd-eller', 'Hur ska en "eller"-avdelare se ut?', [
      ['Linjer och "eller"', 'a'], ['Linjer och "ELLER"', 'b'], ['"eller" i en cirkel', 'c'], ['Bara ordet "eller"', 'd']
    ].map(([l, m]) => {
      const ln = '<span style="flex:1;height:1px;background:var(--sline)"></span>';
      const w = m === 'a' ? `${ln}<span class="small muted">eller</span>${ln}` : m === 'b' ? `${ln}<span style="font-size:11px;font-weight:700;letter-spacing:.08em;color:var(--smuted)">ELLER</span>${ln}` : m === 'c' ? `${ln}<span style="display:inline-grid;place-items:center;width:36px;height:36px;border-radius:50%;border:1px solid var(--sline);font-size:12px;color:var(--smuted);background:var(--box)">eller</span>${ln}` : '<span class="small muted" style="flex:1;text-align:center">eller</span>';
      return [l, pad(`<div class="stack" style="gap:14px">${sb('Fortsätt med e-post', '', 'width:100%')}<div style="display:flex;align-items:center;gap:12px">${w}</div>${sb('Logga in med kod', '', 'width:100%', 'sb2')}</div>`)];
    })),
    Q('pi-avd-zebra', 'Hur ska rader i en tabell eller prislista skiljas åt?', [
      ['Linje mellan raderna', 'line'], ['Varannan rad tonad', 'zebra'], ['Bara mellanrum', 'space']
    ].map(([l, m]) => [l, pad(`<div class="panel" style="padding:6px 8px">${['Klippning', 'Färgning', 'Styling', 'Tvätt'].map((t, i) => `<div style="display:flex;justify-content:space-between;padding:${m === 'space' ? 9 : 10}px 10px;${m === 'line' && i ? 'border-top:1px solid var(--sline);' : ''}${m === 'zebra' && i % 2 === 0 ? 'background:var(--ground);border-radius:6px;' : ''}"><span>${t}</span><span class="price">495 kr</span></div>`).join('')}</div>`)])),
    Q('pi-avd-sektion', 'Hur ska två avsnitt på en sida skiljas åt?', [
      ['Tunn linje', 'line'], ['Byte av bakgrundsfärg', 'bg'], ['Bara stort mellanrum', 'space']
    ].map(([l, m]) => {
      const sec = (bg, t) => `<div style="padding:22px 20px;${bg}"><div class="h h3">${t}</div><p class="muted small" style="margin-top:6px">${txt}</p></div>`;
      return [l, `<div style="background:var(--box)">${sec('', 'Första avsnittet')}${m === 'line' ? '<div style="height:1px;background:var(--sline);margin:0 20px"></div>' : m === 'space' ? '<div style="height:28px"></div>' : ''}${sec(m === 'bg' ? 'background:var(--ground)' : '', 'Andra avsnittet')}</div>`];
    }), 'stack'),
    Q('pi-avd-vertikal', 'Hur ska saker på samma rad skiljas åt?', [
      ['Lodrät linje', '<span style="width:1px;height:16px;background:var(--sline)"></span>'], ['Prick', '<span style="color:var(--smuted)">·</span>'], ['Bara mellanrum', '']
    ].map(([l, s]) => [l, cen(['08-123 456', 'Mån–fre 9–17', 'Storgatan 12'].map(t => `<span class="small">${t}</span>`).join(s || '<span style="width:6px"></span>'), 'gap:12px')])),
    Q('pi-avd-luft', 'Hur mycket luft ska det vara runt en avdelare?', [
      ['Tätt, 8 px', 8], ['Normalt, 12 px', 12], ['Luftigt, 18 px', 18]
    ].map(([l, g]) => [l, dvList(hr('1px solid var(--sline)'), g)]))
  ]));

  // =====================================================================
  // PUNKTER MELLAN METADATA
  // =====================================================================
  const meta = (sep, parts = ['12 maj', '5 min läsning', 'Guide'], st = '') => pad(`<div class="stack" style="gap:6px"><div class="h h3">Rubrik som är två rader lång i ett kort</div><div class="small muted" style="display:flex;flex-wrap:wrap;align-items:center;gap:${sep === '' ? '14px' : '8px'};${st}">${parts.map(x => x.startsWith('<') ? x : `<span>${x}</span>`).join(sep)}</div></div>`);
  groups.push(G('metadata', 'Punkter mellan metadata', [
    Q('pi-meta-tecken', 'Vilket tecken ska skilja metadata åt?', [
      ['Punkt ·', '<span>·</span>'], ['Lodstreck |', '<span style="opacity:.5">|</span>'], ['Snedstreck /', '<span style="opacity:.6">/</span>'], ['Tankstreck –', '<span>–</span>'], ['Bara mellanrum', '']
    ].map(([l, s]) => [l, meta(s)])),
    Q('pi-meta-ikoner', 'Ska metadata ha små ikoner?', [
      ['Text med punkter', 'dots'], ['Ikon före varje del', 'icons']
    ].map(([l, m]) => [l, m === 'dots' ? meta('<span>·</span>') : meta('', [['cal', '12 maj'], ['clock', '5 min läsning'], ['tag', 'Guide']].map(([k, t]) => `<span style="display:inline-flex;align-items:center;gap:5px">${a(k, { s: '14px', w: 1.5 })}${t}</span>`))])),
    Q('pi-meta-tecken-ton', 'Hur tydligt ska skiljetecknet synas?', [
      ['Lika mörkt som texten', 'opacity:1'], ['Ljusare än texten', 'opacity:.45']
    ].map(([l, st]) => [l, meta(`<span style="${st};font-weight:700">·</span>`)])),
    Q('pi-meta-avstand', 'Hur mycket luft ska det vara runt punkten?', [
      ['Tätt, 4 px', 4], ['Normalt, 8 px', 8], ['Luftigt, 12 px', 12]
    ].map(([l, g]) => [l, meta('<span>·</span>').replace('gap:8px', `gap:${g}px`)])),
    Q('pi-meta-betyg', 'Hur ska betyg och antal omdömen skrivas?', [
      ['4,8 (120)', `<span style="color:var(--sink);font-weight:600">4,8</span> <span>(120)</span>`],
      ['4,8 · 120 omdömen', `<span style="color:var(--sink);font-weight:600">4,8</span> <span>·</span> <span>120 omdömen</span>`],
      ['4,8 av 5, 120 omdömen', `<span style="color:var(--sink);font-weight:600">4,8 av 5</span><span>, 120 omdömen</span>`],
      ['4,8/5 (120)', `<span style="color:var(--sink);font-weight:600">4,8/5</span> <span>(120)</span>`]
    ].map(([l, h]) => [l, cen(`<span class="small muted" style="display:inline-flex;align-items:center;gap:4px">${a('star', { s: '15px', fill: 'currentColor', w: 0, c: 'var(--sink)' })}${h}</span>`)]))
  ]));

  // =====================================================================
  // STATUSPRICKAR
  // =====================================================================
  const dotLine = (dot, t = 'Öppet nu', rest = '· Stänger 18.00', tst = 'font-weight:600') => cen(`<span style="display:inline-flex;align-items:center;gap:8px;font-size:14px">${dot}<span style="${tst}">${t}</span><span class="muted">${rest}</span></span>`);
  const dot = (c = 'var(--ok)', s = 8, st = '') => `<span style="width:${s}px;height:${s}px;border-radius:50%;background:${c};flex:0 0 auto;display:inline-block;${st}"></span>`;
  groups.push(G('status', 'Statusprickar', [
    Q('pi-st-puls', 'Ska den gröna pricken för "Öppet nu" pulsera?', [
      ['Stilla prick', dot()],
      ['Stilla prick med ljus ring', dot('var(--ok)', 8, 'box-shadow:0 0 0 4px rgba(30,122,69,.18)')],
      ['Pulserande ring', `<style>@keyframes pi-st-puls-k{0%{box-shadow:0 0 0 0 rgba(30,122,69,.45)}70%,100%{box-shadow:0 0 0 8px rgba(30,122,69,0)}}.pi-st-puls-c{animation:pi-st-puls-k 1.8s ease-out infinite}${reduce('.pi-st-puls-c')}</style>` + dot('var(--ok)', 8).replace('display:inline-block;', 'display:inline-block;" class="pi-st-puls-c')],
      ['Hela pricken blinkar mjukt', `<style>@keyframes pi-st-blink-k{0%,100%{opacity:1}50%{opacity:.35}}.pi-st-blink-c{animation:pi-st-blink-k 1.8s ease-in-out infinite}${reduce('.pi-st-blink-c')}</style>` + dot('var(--ok)', 8).replace('display:inline-block;', 'display:inline-block;" class="pi-st-blink-c')]
    ].map(([l, d]) => [l, dotLine(d)])),
    Q('pi-st-storlek', 'Hur stor ska statuspricken vara?', [
      ['Liten, 6 px', 6], ['Mellan, 8 px', 8], ['Stor, 10 px', 10]
    ].map(([l, s]) => [l, dotLine(dot('var(--ok)', s))])),
    Q('pi-st-text', 'Vilken färg ska texten bredvid den gröna pricken ha?', [
      ['Grön som pricken', 'font-weight:600;color:var(--ok)'], ['Mörk som brödtexten', 'font-weight:600;color:var(--sink)'], ['Dämpad grå', 'font-weight:500;color:var(--smuted)']
    ].map(([l, st]) => [l, dotLine(dot(), 'Öppet nu', '· Stänger 18.00', st)])),
    Q('pi-st-stangt', 'Hur ska "Stängt" visas?', [
      ['Röd prick', dot('var(--bad)')], ['Grå prick', dot('rgba(26,28,30,.35)')], ['Orange prick', dot('#C77700')], ['Ingen prick', '']
    ].map(([l, d]) => [l, dotLine(d, 'Stängt', '· Öppnar 09.00')])),
    Q('pi-st-avatar', 'Var ska prick för "tillgänglig" sitta på en profilbild?', [
      ['Nere till höger med vit kant', 'br'], ['Uppe till höger med vit kant', 'tr'], ['Bredvid namnet', 'name']
    ].map(([l, m]) => {
      const av = `<span style="position:relative;display:inline-grid;place-items:center;width:44px;height:44px;border-radius:50%;background:var(--accent);color:var(--brand);font-weight:700;flex:0 0 auto">AL${m !== 'name' ? `<span style="position:absolute;${m === 'br' ? 'bottom:0' : 'top:0'};right:0;width:12px;height:12px;border-radius:50%;background:var(--ok);box-shadow:0 0 0 2px var(--ground)"></span>` : ''}</span>`;
      return [l, cen(`<div style="display:flex;align-items:center;gap:12px">${av}<div><div style="display:flex;align-items:center;gap:6px;font-weight:600">Anna L.${m === 'name' ? dot('var(--ok)') : ''}</div><div class="small muted">Tillgänglig idag</div></div></div>`)];
    })),
    Q('pi-st-ensam', 'Hur ska en prick visa status utan text, till exempel i en lista?', [
      ['Fylld prick', dot('var(--ok)', 9)], ['Ring utan fyllning', `<span style="width:10px;height:10px;border-radius:50%;border:2px solid var(--ok);display:inline-block"></span>`], ['Prick i ljus platta', `<span style="display:inline-grid;place-items:center;width:20px;height:20px;border-radius:50%;background:#E3F1E8">${dot('var(--ok)', 8)}</span>`]
    ].map(([l, d]) => [l, pad(`<div class="panel" style="padding:4px 16px">${['Rum 1', 'Rum 2', 'Rum 3'].map((t, i) => `<div style="display:flex;justify-content:space-between;align-items:center;padding:10px 0;${i ? 'border-top:1px solid var(--sline)' : ''}"><span>${t}</span>${i === 1 ? d.replace(/var\(--ok\)/g, 'rgba(26,28,30,.3)').replace('#E3F1E8', '#ECEDEE') : d}</div>`).join('')}</div>`)]))
  ]));

  // =====================================================================
  // RÄKNARE OCH BADGES
  // =====================================================================
  // icoBadge(ikon, badge-html, position)
  const icoWrap = (k, b, pos = 'top:-6px;right:-8px') => `<span style="position:relative;display:inline-grid;place-items:center;width:40px;height:40px;color:var(--sink)">${a(k, { s: '24px', w: 1.75 })}${b ? `<span style="position:absolute;${pos}">${b}</span>` : ''}</span>`;
  const cnt = (n = '3', st = '') => `<span style="display:inline-grid;place-items:center;min-width:18px;height:18px;padding:0 5px;border-radius:999px;background:var(--bad);color:#fff;font-size:11px;font-weight:700;line-height:1;font-variant-numeric:tabular-nums;${st}">${n}</span>`;
  const hdr = x => pad(`<div class="panel" style="display:flex;justify-content:space-between;align-items:center;padding:12px 16px"><span style="font-weight:700">Logga</span><div style="display:flex;gap:10px;align-items:center">${x}</div></div>`);
  groups.push(G('badges', 'Räknare och badges', [
    Q('pi-bd-form', 'Hur ska räknaren på kundvagnen se ut?', [
      ['Cirkel med siffra', icoWrap('bag', cnt('3', 'top:0'), 'top:2px;right:0')],
      ['Bara en prick', icoWrap('bag', `<span style="display:block;width:9px;height:9px;border-radius:50%;background:var(--bad)"></span>`, 'top:7px;right:7px')],
      ['Siffra bredvid ikonen', `<span style="display:inline-flex;align-items:center;gap:6px;font-weight:600">${a('bag', { s: '24px', w: 1.75 })}3</span>`],
      ['Rundad fyrkant med siffra', icoWrap('bag', cnt('3', 'border-radius:5px'), 'top:2px;right:0')]
    ].map(([l, h]) => [l, hdr(h)])),
    Q('pi-bd-position', 'Var ska räknaren sitta på ikonen?', [
      ['Överlappar hörnet', 'top:2px;right:0'], ['Utanför hörnet', 'top:-4px;right:-10px'], ['Nere till höger', 'bottom:2px;right:0']
    ].map(([l, p]) => [l, hdr(icoWrap('bag', cnt(), p))])),
    Q('pi-bd-storlek', 'Hur stor ska räknaren vara?', [
      ['Liten, 14 px', 'min-width:14px;height:14px;font-size:9px;padding:0 3px'], ['Mellan, 18 px', ''], ['Stor, 22 px', 'min-width:22px;height:22px;font-size:12px;padding:0 6px']
    ].map(([l, st]) => [l, hdr(icoWrap('bag', cnt('3', st), 'top:2px;right:0'))])),
    Q('pi-bd-farg', 'Vilken färg ska räknaren ha?', [
      ['Röd', 'background:var(--bad)'], ['Märkesfärg', 'background:var(--brand)'], ['Svart', 'background:var(--sink)'], ['Grön', 'background:var(--ok)']
    ].map(([l, st]) => [l, hdr(icoWrap('bag', cnt('3', st), 'top:2px;right:0'))])),
    Q('pi-bd-ring', 'Ska räknaren ha en ring mot ikonen bakom?', [
      ['Med ring i bakgrundsfärgen', 'box-shadow:0 0 0 2px var(--box)'], ['Utan ring', '']
    ].map(([l, st]) => [l, hdr(icoWrap('bag', cnt('3', st), 'top:2px;right:0') + icoWrap('bell', cnt('12', st), 'top:2px;right:-4px'))])),
    Q('pi-bd-notis', 'Hur ska olästa notiser visas på klockan?', [
      ['Prick utan siffra', `<span style="display:block;width:9px;height:9px;border-radius:50%;background:var(--bad);box-shadow:0 0 0 2px var(--box)"></span>`, 'top:8px;right:9px'],
      ['Siffra i cirkel', cnt('4'), 'top:2px;right:0']
    ].map(([l, b, p]) => [l, hdr(icoWrap('bell', b, p))])),
    Q('pi-bd-stora', 'Hur ska stora antal visas i en räknare?', [
      ['99+', '99+'], ['9+', '9+'], ['Exakt antal', '128']
    ].map(([l, n]) => [l, hdr(icoWrap('bell', cnt(n), 'top:2px;right:-6px'))])),
    Q('pi-bd-noll', 'Vad ska visas när kundvagnen är tom?', [
      ['Ingen räknare', ''], ['Grå nolla', cnt('0', 'background:#D9DBDE;color:var(--sink)')]
    ].map(([l, b]) => [l, hdr(icoWrap('bag', b, 'top:2px;right:0'))])),
    Q('pi-bd-meny', 'Hur ska antal visas i en meny eller flik?', [
      ['Tonad pill', n => `<span class="tag" style="padding:1px 7px">${n}</span>`],
      ['Fylld pill', n => `<span class="tag" style="padding:1px 7px;background:var(--brand);color:#fff">${n}</span>`],
      ['Siffra i parentes', n => `<span class="muted" style="font-weight:400">(${n})</span>`],
      ['Dämpad siffra', n => `<span class="muted" style="font-weight:500">${n}</span>`]
    ].map(([l, f]) => [l, pad(`<div class="panel" style="padding:6px">${[['Meddelanden', 3], ['Bokningar', 12], ['Arkiv', '']].map(([t, n], i) => `<div style="display:flex;justify-content:space-between;align-items:center;gap:8px;padding:9px 12px;border-radius:8px;font-weight:${i === 0 ? 600 : 500};${i === 0 ? 'background:var(--ground)' : ''}"><span>${t}</span>${n !== '' ? f(n) : ''}</div>`).join('')}</div>`)]))
  ]));

  // =====================================================================
  // SIFFROR I STEG
  // =====================================================================
  // steps(o): tre/fyra steg, steg 1 klart, steg 2 aktivt. o styr varje detalj.
  function steps(o = {}) {
    const n = o.n || 4, size = o.size || 32, labels = ['Välj', 'Uppgifter', 'Betala', 'Klart'].slice(0, n);
    const circ = (i) => {
      const done = i < 1, act = i === 1;
      const base = `display:inline-grid;place-items:center;width:${size}px;height:${size}px;flex:0 0 auto;font-size:${Math.round(size * .42)}px;font-weight:700;border-radius:${o.radius || '50%'};position:relative;z-index:1;`;
      let st, inner = String(i + 1);
      if (done) { st = o.doneSt || 'background:var(--brand);color:#fff;'; if (o.doneCheck !== false) inner = a('check', { s: Math.round(size * .5) + 'px', w: 2.25 }); }
      else if (act) st = o.actSt || 'background:var(--brand);color:#fff;';
      else st = o.nextSt || 'background:var(--box);color:var(--smuted);box-shadow:inset 0 0 0 1.5px var(--sline);';
      if (o.plain) { st = `color:${done || act ? 'var(--brand)' : 'var(--smuted)'};`; }
      return `<span style="${base}${st}">${inner}</span>`;
    };
    const lineSt = i => {
      if (o.line === 'none') return 'visibility:hidden';
      const filled = o.fillLine !== false && i < 1;
      const c = filled ? 'var(--brand)' : 'var(--sline)';
      return o.line === 'dashed' ? `border-top:2px dashed ${c};height:0` : `background:${c};height:2px`;
    };
    if (o.labels === 'side') return pad(`<div style="display:flex;flex-wrap:wrap;gap:10px 14px;align-items:center">${labels.map((t, i) => `<span style="display:inline-flex;align-items:center;gap:8px;font-size:13px;font-weight:${i === 1 ? 700 : 500};color:${i > 1 ? 'var(--smuted)' : 'var(--sink)'}">${circ(i)}${t}</span>`).join('')}</div>`);
    return pad(`<div style="display:flex;align-items:flex-start">${labels.map((t, i) => `<div style="flex:1;min-width:0;display:flex;flex-direction:column;align-items:center;gap:6px;position:relative">${i ? `<span style="position:absolute;top:${size / 2 - 1}px;right:calc(50% + ${size / 2 + 4}px);left:calc(-50% + ${size / 2 + 4}px);${lineSt(i - 1)}"></span>` : ''}${circ(i)}${o.labels === 'none' ? '' : `<span style="font-size:12px;font-weight:${i === 1 ? (o.actBold === false ? 500 : 700) : 500};color:${i > 1 ? 'var(--smuted)' : 'var(--sink)'};text-align:center;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100%">${t}</span>`}</div>`).join('')}</div>`);
  }
  groups.push(G('steg', 'Siffror i steg', [
    Q('pi-sg-form', 'Hur ska siffrorna i en stegvisare se ut?', [
      ['Fylld cirkel', {}],
      ['Konturcirkel', { actSt: 'background:var(--box);color:var(--brand);box-shadow:inset 0 0 0 2px var(--brand);', doneSt: 'background:var(--box);color:var(--brand);box-shadow:inset 0 0 0 2px var(--brand);' }],
      ['Rundad fyrkant', { radius: '8px' }],
      ['Bara siffran', { plain: true }]
    ].map(([l, o]) => [l, steps(o)])),
    Q('pi-sg-linje', 'Ska stegen förbindas med en linje?', [
      ['Heldragen linje', {}], ['Streckad linje', { line: 'dashed' }], ['Ingen linje', { line: 'none' }]
    ].map(([l, o]) => [l, steps(o)])),
    Q('pi-sg-klar', 'Hur ska ett klart steg visas?', [
      ['Bock i fylld cirkel', {}],
      ['Bock i grön cirkel', { doneSt: 'background:var(--ok);color:#fff;' }],
      ['Bock i tonad cirkel', { doneSt: 'background:var(--tint);color:var(--brand);' }],
      ['Siffran kvar, fylld', { doneCheck: false }]
    ].map(([l, o]) => [l, steps(o)])),
    Q('pi-sg-aktiv', 'Hur ska det aktiva steget markeras?', [
      ['Fylld cirkel', {}],
      ['Fylld med ljus ring runt', { actSt: 'background:var(--brand);color:#fff;box-shadow:0 0 0 4px rgba(36,64,94,.18);' }],
      ['Kontur i märkesfärg', { actSt: 'background:var(--box);color:var(--brand);box-shadow:inset 0 0 0 2px var(--brand);' }],
      ['Tonad cirkel', { actSt: 'background:var(--tint);color:var(--brand);' }]
    ].map(([l, o]) => [l, steps(o)])),
    Q('pi-sg-kommande', 'Hur ska kommande steg se ut?', [
      ['Grå kontur', {}], ['Grå fylld', { nextSt: 'background:#E4E6E8;color:var(--smuted);' }], ['Bara siffran i grått', { nextSt: 'background:transparent;color:var(--smuted);' }]
    ].map(([l, o]) => [l, steps(o)])),
    Q('pi-sg-storlek', 'Hur stora ska stegcirklarna vara?', [
      ['Små, 24 px', 24], ['Mellan, 32 px', 32], ['Stora, 40 px', 40]
    ].map(([l, s]) => [l, steps({ size: s })])),
    Q('pi-sg-etikett', 'Var ska stegens namn stå?', [
      ['Under siffran', {}], ['Bredvid siffran', { labels: 'side', n: 3 }], ['Inga namn', { labels: 'none' }]
    ].map(([l, o]) => [l, steps(o)])),
    Q('pi-sg-linjefyll', 'Ska linjen fyllas i fram till där man är?', [
      ['Fylls i upp till aktuellt steg', {}], ['Samma grå linje hela vägen', { fillLine: false }]
    ].map(([l, o]) => [l, steps(o)])),
    Q('pi-sg-mobil', 'Hur ska stegen visas på en smal skärm?', [
      ['Alla steg med siffror', steps({ labels: 'none' })],
      ['"Steg 2 av 4" och stapel', pad(`<div class="stack" style="gap:8px"><div style="display:flex;justify-content:space-between;font-size:13px"><span style="font-weight:700">Uppgifter</span><span class="muted">Steg 2 av 4</span></div><div style="height:4px;border-radius:4px;background:var(--sline)"><div style="width:50%;height:100%;border-radius:4px;background:var(--brand)"></div></div></div>`)],
      ['Segment per steg', pad(`<div class="stack" style="gap:8px"><div style="display:flex;justify-content:space-between;font-size:13px"><span style="font-weight:700">Uppgifter</span><span class="muted">Steg 2 av 4</span></div><div style="display:flex;gap:4px">${[1, 1, 0, 0].map(f => `<span style="flex:1;height:4px;border-radius:4px;background:${f ? 'var(--brand)' : 'var(--sline)'}"></span>`).join('')}</div></div>`)]
    ].map(([l, h]) => [l, `<div style="max-width:340px;margin:0 auto;width:100%">${h}</div>`]))
  ]));

  // =====================================================================
  // SIDINDIKATORER FÖR KARUSELL
  // =====================================================================
  // ind(o): rad med indikator för 5 bilder där bild 2 visas.
  function ind(o = {}) {
    const n = 5, cur = 1, s = o.s || 8, on = o.on || 'var(--sink)', off = o.off || 'rgba(26,28,30,.22)';
    const k = o.kind || 'dots';
    if (k === 'num') return `<span style="font-size:13px;font-weight:600;font-variant-numeric:tabular-nums;color:${o.numC || 'var(--sink)'};${o.numSt || ''}">${o.fmt || '2 / 5'}</span>`;
    if (k === 'bar') return `<span style="display:block;width:120px;max-width:100%;height:3px;border-radius:3px;background:${off}"><span style="display:block;width:40%;height:100%;border-radius:3px;background:${on};margin-left:20%"></span></span>`;
    return `<span style="display:inline-flex;align-items:center;gap:${o.gap || 6}px">${Array.from({ length: n }, (_, i) => {
      const act = i === cur;
      if (k === 'lines') return `<span style="width:${act ? 28 : 18}px;height:3px;border-radius:2px;background:${act ? on : off}"></span>`;
      const act2 = o.act || 'dark';
      let st = `width:${s}px;height:${s}px;border-radius:999px;background:${off};`;
      if (act) st = act2 === 'big' ? `width:${s + 4}px;height:${s + 4}px;border-radius:999px;background:${on};`
        : act2 === 'pill' ? `width:${s * 3}px;height:${s}px;border-radius:999px;background:${on};`
        : act2 === 'ring' ? `width:${s + 4}px;height:${s + 4}px;border-radius:999px;background:transparent;box-shadow:inset 0 0 0 1.5px ${on};`
        : `width:${s}px;height:${s}px;border-radius:999px;background:${on};`;
      return `<span style="${st}${o.shadow || ''}"></span>`;
    }).join('')}</span>`;
  }
  const slide = (indicator, just = 'center') => pad(`<div class="stack" style="gap:12px;max-width:300px;margin:0 auto;width:100%">${box()}<div style="display:flex;justify-content:${just}">${indicator}</div></div>`);
  groups.push(G('sidindikator', 'Sidindikatorer för karusell', [
    Q('pi-si-typ', 'Hur ska en karusell visa vilken bild man är på?', [
      ['Prickar', ind()], ['Streck', ind({ kind: 'lines' })], ['Siffror "2 / 5"', ind({ kind: 'num' })], ['Löpande stapel', ind({ kind: 'bar' })]
    ].map(([l, h]) => [l, slide(h)])),
    Q('pi-si-aktiv', 'Hur ska den aktiva pricken markeras?', [
      ['Mörkare, samma storlek', 'dark'], ['Större prick', 'big'], ['Utdragen till en pill', 'pill'], ['Ring runt', 'ring']
    ].map(([l, act]) => [l, slide(ind({ act }))])),
    Q('pi-si-storlek', 'Hur stora ska prickarna vara?', [
      ['Små, 6 px', 6], ['Mellan, 8 px', 8], ['Stora, 10 px', 10]
    ].map(([l, s]) => [l, slide(ind({ s, act: 'pill', gap: s * .75 }))])),
    Q('pi-si-placering', 'Var ska prickarna sitta?', [
      ['På bilden, nere i mitten', 'on'], ['Under bilden, i mitten', 'center'], ['Under bilden, till vänster', 'flex-start']
    ].map(([l, m]) => [l, pad(`<div class="stack" style="gap:12px;max-width:300px;margin:0 auto;width:100%"><div style="position:relative"><img class="pic" src="img/tradgard.jpg" alt="Trädgård">${m === 'on' ? `<div style="position:absolute;left:0;right:0;bottom:12px;display:flex;justify-content:center">${ind({ act: 'pill', on: '#fff', off: 'rgba(255,255,255,.55)' })}</div>` : ''}</div>${m === 'on' ? '' : `<div style="display:flex;justify-content:${m}">${ind({ act: 'pill' })}</div>`}</div>`)])),
    Q('pi-si-pabild', 'Hur ska prickarna synas ovanpå ett foto?', [
      ['Vita prickar', { on: '#fff', off: 'rgba(255,255,255,.55)' }, ''],
      ['Vita prickar med skugga', { on: '#fff', off: 'rgba(255,255,255,.6)', shadow: 'box-shadow:0 0 3px rgba(0,0,0,.45);' }, ''],
      ['Prickar i en mörk pill', { on: '#fff', off: 'rgba(255,255,255,.45)' }, 'background:rgba(0,0,0,.4);padding:6px 9px;border-radius:999px']
    ].map(([l, o, wrap]) => [l, pad(`<div style="position:relative;max-width:300px;margin:0 auto"><img class="pic" src="img/tradgard.jpg" alt="Trädgård"><div style="position:absolute;left:0;right:0;bottom:12px;display:flex;justify-content:center"><span style="display:inline-flex;${wrap}">${ind({ act: 'pill', ...o })}</span></div></div>`)])),
    Q('pi-si-siffror', 'Hur ska bildräknaren skrivas?', [
      ['2 / 5', '2 / 5'], ['2 av 5', '2 av 5'], ['02 — 05', '02 — 05'], ['2/5 i en mörk pill', 'pill']
    ].map(([l, f]) => [l, pad(`<div style="position:relative;max-width:300px;margin:0 auto">${box()}<div style="position:absolute;right:10px;bottom:10px">${f === 'pill' ? ind({ kind: 'num', fmt: '2/5', numC: '#fff', numSt: 'background:rgba(26,28,30,.6);padding:4px 9px;border-radius:999px;font-size:12px' }) : ind({ kind: 'num', fmt: f })}</div></div>`)]))
  ]));

  // =====================================================================
  // RULLNINGSLIST
  // =====================================================================
  const scrollRow = (bar, extra = '') => pad(`<div style="position:relative;max-width:340px;margin:0 auto"><div style="display:flex;gap:10px;overflow:hidden">${box('flex:0 0 42%')}${box('flex:0 0 42%')}${box('flex:0 0 42%')}</div>${extra}${bar}</div>`);
  const track = (h, thumb, trk, r) => `<div style="margin-top:10px;height:${h}px;border-radius:${r}px;background:${trk}"><div style="width:38%;height:100%;border-radius:${r}px;background:${thumb}"></div></div>`;
  groups.push(G('rullning', 'Rullningslist', [
    Q('pi-rl-synlig', 'Ska en vågrät rad med kort visa en rullningslist?', [
      ['Dold', ''], ['Tunn och diskret', track(4, 'rgba(26,28,30,.3)', 'transparent', 4)], ['Tydlig med spår', track(8, 'rgba(26,28,30,.4)', 'rgba(26,28,30,.08)', 8)]
    ].map(([l, b]) => [l, scrollRow(b)])),
    Q('pi-rl-ledtrad', 'Hur ska det synas att en rad går att rulla i sidled?', [
      ['Sista kortet sticker ut', ''],
      ['Kanten tonas ut', '<div style="position:absolute;top:0;right:0;width:60px;height:calc(100% - 0px);background:linear-gradient(90deg,transparent,var(--ground))"></div>'],
      ['Pilknapp på kanten', `<div style="position:absolute;top:0;bottom:0;right:6px;display:flex;align-items:center">${rb('chev', KB.rundfylld, 36, '16px')}</div>`],
      ['Synlig rullningslist', '']
    ].map(([l, ex]) => [l, scrollRow(l === 'Synlig rullningslist' ? track(4, 'rgba(26,28,30,.3)', 'rgba(26,28,30,.06)', 4) : '', ex)])),
    Q('pi-rl-lodrat', 'Hur ska rullningslisten i en lång lista eller meny se ut?', [
      ['Dold', ''], ['Tunn och rundad', 'width:4px;right:3px;border-radius:4px;background:rgba(26,28,30,.3)'], ['Bred med spår', 'width:8px;right:0;border-radius:0;background:rgba(26,28,30,.4);box-shadow:0 0 0 0']
    ].map(([l, st]) => [l, pad(`<div class="panel" style="position:relative;padding:4px 18px 4px 14px;height:150px;overflow:hidden">${l === 'Bred med spår' ? '<div style="position:absolute;top:0;bottom:0;right:0;width:8px;background:rgba(26,28,30,.06)"></div>' : ''}${st ? `<div style="position:absolute;top:10px;height:46px;${st}"></div>` : ''}${['Rad ett', 'Rad två', 'Rad tre', 'Rad fyra', 'Rad fem'].map((t, i) => `<div style="padding:8px 0;${i ? 'border-top:1px solid var(--sline)' : ''}">${t}</div>`).join('')}</div>`)]))
  ]));

  // =====================================================================
  // TOOLTIP-PILAR
  // =====================================================================
  // tip(o): bubbla ovanför en info-ikon. o.arrow = 0 | storlek, o.bg, o.r
  const tip = (o = {}) => {
    const bg = o.bg || 'var(--sink)', col = o.col || '#fff', ar = o.arrow == null ? 6 : o.arrow, r = o.r == null ? 6 : o.r;
    const side = o.side || 'top';
    const arrow = ar ? `<span style="position:absolute;${side === 'top' ? `left:50%;bottom:-${ar}px;transform:translateX(-50%);border-left:${ar}px solid transparent;border-right:${ar}px solid transparent;border-top:${ar}px solid ${bg}` : `top:50%;left:-${ar}px;transform:translateY(-50%);border-top:${ar}px solid transparent;border-bottom:${ar}px solid transparent;border-right:${ar}px solid ${bg}`}"></span>` : '';
    const bubble = `<span style="position:relative;display:inline-block;background:${bg};color:${col};font-size:13px;line-height:1.35;padding:7px 11px;border-radius:${r}px;max-width:200px;${o.shadow || ''}">Avgiften dras vid bokning${arrow}</span>`;
    const icon = `<span style="color:var(--smuted);display:inline-flex">${a('info', { s: '18px', w: 1.75 })}</span>`;
    const gap = (ar || 0) + (o.gap == null ? 4 : o.gap);
    if (side === 'right') return cen(`<span style="display:inline-flex;align-items:center;gap:${gap}px">${icon}${bubble}</span>`);
    return cen(`<span style="display:inline-flex;flex-direction:column;align-items:center;gap:${gap}px">${bubble}${icon}</span>`);
  };
  groups.push(G('tooltip', 'Tooltip-pilar', [
    Q('pi-tt-pil', 'Ska en tooltip ha en liten pil mot det den förklarar?', [
      ['Liten pil, 5 px', { arrow: 5 }], ['Större pil, 8 px', { arrow: 8 }], ['Ingen pil', { arrow: 0, gap: 6 }]
    ].map(([l, o]) => [l, tip(o)])),
    Q('pi-tt-rundning', 'Hur rund ska tooltipen vara?', [
      ['Skarp, 2 px', 2], ['Rundad, 6 px', 6], ['Mycket rund, 12 px', 12]
    ].map(([l, r]) => [l, tip({ r })])),
    Q('pi-tt-farg', 'Vilken färg ska tooltipen ha?', [
      ['Mörk med vit text', {}], ['Vit med skugga', { bg: '#fff', col: 'var(--sink)', shadow: 'box-shadow:0 2px 10px rgba(0,0,0,.14);' }], ['Märkesfärg', { bg: 'var(--brand)' }]
    ].map(([l, o]) => [l, tip(o)])),
    Q('pi-tt-sida', 'Var ska tooltipen helst visas?', [
      ['Ovanför', { side: 'top' }], ['Till höger', { side: 'right' }]
    ].map(([l, o]) => [l, tip(o)])),
    Q('pi-tt-utlosare', 'Vad ska visa att det finns en förklaring att hämta?', [
      ['i i en cirkel', `Avgift <span style="color:var(--smuted);display:inline-flex">${a('info', { s: '16px', w: 1.75 })}</span>`],
      ['? i en cirkel', `Avgift <span style="color:var(--smuted);display:inline-flex">${a('help', { s: '16px', w: 1.75 })}</span>`],
      ['Prickad understrykning', '<span style="text-decoration:underline dotted;text-underline-offset:4px;text-decoration-color:var(--smuted)">Avgift</span>']
    ].map(([l, h]) => [l, cen(`<div style="display:flex;justify-content:space-between;align-items:center;gap:20px;width:100%;max-width:240px"><span style="display:inline-flex;align-items:center;gap:6px">${h}</span><span class="price">49 kr</span></div>`)]))
  ]));

  // =====================================================================
  // CITATTECKEN SOM GRAFISK DETALJ
  // =====================================================================
  const qt = 'Det gick snabbt och smidigt, och allt var precis som utlovat.';
  const quoteBlock = (mark, o = {}) => pad(`<figure style="margin:0;position:relative;${o.wrap || ''}">${o.pos === 'bg' ? `<span aria-hidden="true" style="position:absolute;top:-34px;left:-6px;font-size:130px;line-height:1;font-weight:800;color:var(--tint);z-index:0">${mark}</span>` : o.pos === 'hang' ? `<span aria-hidden="true" style="position:absolute;left:0;top:-4px;font-size:40px;line-height:1;font-weight:800;color:var(--brand)">${mark}</span>` : (mark ? `<div aria-hidden="true" style="font-size:${o.size || 56}px;line-height:.8;height:${(o.size || 56) * .45}px;font-weight:800;color:${o.c || 'var(--brand)'}">${mark}</div>` : '')}<blockquote style="margin:0;position:relative;z-index:1;font-size:17px;font-weight:500;line-height:1.4;${o.qst || ''}">${o.inline ? o.inline[0] : ''}${qt}${o.inline ? o.inline[1] : ''}</blockquote><figcaption class="small muted" style="margin-top:10px;position:relative;z-index:1;${o.pos === 'hang' ? 'padding-left:28px' : ''}">Anna L.</figcaption></figure>`);
  groups.push(G('citat', 'Citattecken som grafisk detalj', [
    Q('pi-ct-stil', 'Hur ska ett citat markeras grafiskt?', [
      ['Stort citattecken ovanför', quoteBlock('”')],
      ['Vanliga citattecken i texten', quoteBlock('', { inline: ['”', '”'] })],
      ['Lodrät linje till vänster', quoteBlock('', { wrap: 'border-left:3px solid var(--brand);padding-left:16px' })],
      ['Ingen markering', quoteBlock('')]
    ]),
    Q('pi-ct-storlek', 'Hur stort ska det dekorativa citattecknet vara?', [
      ['Litet, 36 px', 36], ['Mellan, 56 px', 56], ['Stort, 88 px', 88]
    ].map(([l, s]) => [l, quoteBlock('”', { size: s })])),
    Q('pi-ct-farg', 'Vilken färg ska det stora citattecknet ha?', [
      ['Märkesfärg', 'var(--brand)'], ['Ljus ton', '#C9D3DD'], ['Samma som texten', 'var(--sink)']
    ].map(([l, c]) => [l, quoteBlock('”', { c })])),
    Q('pi-ct-tecken', 'Vilka citattecken ska användas?', [
      ['Svenska ”…”', ['”', '”']], ['Engelska “…”', ['“', '”']], ['Gåsögon »…«', ['»', '«']]
    ].map(([l, m]) => [l, quoteBlock('', { inline: m })])),
    Q('pi-ct-placering', 'Var ska det stora citattecknet sitta?', [
      ['Ovanför texten', quoteBlock('”')], ['Hängande i vänsterkanten', quoteBlock('”', { pos: 'hang', qst: 'padding-left:28px' })], ['Stort och ljust bakom texten', quoteBlock('”', { pos: 'bg', wrap: 'padding-top:16px' })]
    ])
  ]));

  // =====================================================================
  // UNDERSTRYKNINGAR OCH MARKERINGAR SOM DETALJ
  // =====================================================================
  const hl = (word, st, extra = '') => `<div class="pad"><div class="h h2">Allt du behöver på <span style="${st}">${word}</span>${extra}</div></div>`;
  const HL = {
    halva: 'background:linear-gradient(transparent 58%,var(--accent) 58%);padding:0 2px',
    tjock: 'text-decoration:underline;text-decoration-thickness:4px;text-underline-offset:6px;text-decoration-color:var(--brand)',
    farg: 'color:var(--brand)',
    ingen: ''
  };
  const squig = '<svg viewBox="0 0 120 12" preserveAspectRatio="none" aria-hidden="true" style="position:absolute;left:0;bottom:-8px;width:100%;height:10px"><path d="M2 8 C 30 2, 60 2, 118 6" fill="none" stroke="var(--brand)" stroke-width="3" stroke-linecap="round"/></svg>';
  groups.push(G('markering', 'Understrykningar och markeringar', [
    Q('pi-mk-stil', 'Hur ska ett nyckelord i en rubrik framhävas?', [
      ['Överstrykningsfärg bakom', HL.halva], ['Tjock understrykning', HL.tjock], ['Ordet i märkesfärg', HL.farg], ['Ingen markering', HL.ingen]
    ].map(([l, st]) => [l, hl('ett ställe', st)])),
    Q('pi-mk-hojd', 'Hur hög ska överstrykningsfärgen bakom ordet vara?', [
      ['Nedre tredjedelen', 'background:linear-gradient(transparent 68%,var(--accent) 68%);padding:0 2px'],
      ['Nedre halvan', HL.halva],
      ['Hela ordet', 'background:var(--accent);padding:0 4px;border-radius:3px']
    ].map(([l, st]) => [l, hl('ett ställe', st)])),
    Q('pi-mk-form', 'Vilken form ska understrykningen ha?', [
      ['Rak linje', 'position:relative;display:inline-block;box-shadow:inset 0 -3px 0 var(--brand)'], ['Handritad båge', 'position:relative;display:inline-block'], ['Rundad pill bakom', 'background:var(--tint);padding:0 10px;border-radius:999px']
    ].map(([l, st]) => [l, l === 'Handritad båge' ? `<div class="pad"><div class="h h2">Allt du behöver på <span style="${st}">ett ställe${squig}</span></div></div>` : hl('ett ställe', st)])),
    Q('pi-mk-tjocklek', 'Hur tjock ska en dekorativ understrykning vara?', [
      ['Tunn, 2 px', 2], ['Mellan, 4 px', 4], ['Kraftig, 7 px', 7]
    ].map(([l, t]) => [l, hl('ett ställe', `text-decoration:underline;text-decoration-thickness:${t}px;text-underline-offset:${t + 3}px;text-decoration-color:var(--brand)`)])),
    Q('pi-mk-mangd', 'Hur många ord får markeras i en rubrik?', [
      ['Ett eller två ord', 'one'], ['Hela rubriken', 'all']
    ].map(([l, m]) => [l, m === 'one' ? hl('ett ställe', HL.halva) : `<div class="pad"><div class="h h2"><span style="${HL.halva};-webkit-box-decoration-break:clone;box-decoration-break:clone">Allt du behöver på ett ställe</span></div></div>`]))
  ]));

  // =====================================================================
  // HÖRN OCH DETALJER PÅ KORT
  // =====================================================================
  const corner = (inner, pos = 'top:16px;right:16px') => card(inner ? `<div style="position:absolute;${pos};color:var(--brand)">${inner}</div>` : '', 'padding-right:56px');
  const plate = (k, st) => `<span style="display:inline-grid;place-items:center;width:32px;height:32px;${st}">${a(k, { s: '17px' })}</span>`;
  groups.push(G('korthorn', 'Hörn och detaljer på kort', [
    Q('pi-kh-detalj', 'Ska klickbara kort ha en detalj i hörnet?', [
      ['Diagonal pil ↗', plate('diag', '')], ['Pil →', plate('arrow', '')], ['Plus +', plate('plus', '')], ['Ingen detalj', '']
    ].map(([l, i]) => [l, corner(i)])),
    Q('pi-kh-platta', 'Hur ska pilen i kortets hörn se ut?', [
      ['Bara pilen', ''], ['I tunn ring', 'border-radius:50%;border:1.5px solid var(--sline)'], ['I tonad cirkel', 'border-radius:50%;background:var(--tint)'], ['I fylld cirkel', 'border-radius:50%;background:var(--brand);color:#fff'], ['I rundad fyrkant', 'border-radius:8px;background:var(--tint)']
    ].map(([l, st]) => [l, corner(plate('diag', st))])),
    Q('pi-kh-position', 'Var på kortet ska pilen sitta?', [
      ['Uppe till höger', 'top:16px;right:16px'], ['Nere till höger', 'bottom:16px;right:16px']
    ].map(([l, p]) => [l, corner(plate('diag', 'border-radius:50%;border:1.5px solid var(--sline)'), p)])),
    Q('pi-kh-signal', 'Hur ska ett kort visa att det går att klicka på?', [
      ['Pil i hörnet', corner(plate('arrow', 'border-radius:50%;border:1.5px solid var(--sline)'))],
      ['Länk "Läs mer →" längst ner', card(`<div style="margin-top:6px">${lk('Läs mer', a('arrow', { s: '1.05em' }))}</div>`)],
      ['Ingen synlig markering', card()]
    ])
  ]));

  // =====================================================================
  // "VISA MER"-LÄNKAR
  // =====================================================================
  const listItems = (n = 3) => Array.from({ length: n }, (_, i) => `<div style="display:flex;gap:12px;align-items:center">${box('width:44px;aspect-ratio:1;border-radius:8px;flex:0 0 auto')}<div style="flex:1;min-width:0" class="stack">${line('70%', 9)}${line('45%', 8)}</div></div>`).join('');
  groups.push(G('visamer', '"Visa mer"-länkar', [
    Q('pi-vm-form', 'Hur ska "Visa fler" under en lista se ut?', [
      ['Länk med chevron ner', `<div style="text-align:center">${lk('Visa fler', a('chevD', { s: '1.05em' }), '', 'gap:4px')}</div>`],
      ['Konturknapp i full bredd', sb('Visa fler', '', 'width:100%', 'sb2')],
      ['Konturknapp i mitten', `<div style="text-align:center">${sb('Visa fler', '', '', 'sb2')}</div>`],
      ['Länk med plus', `<div style="text-align:center">${lk('Visa fler', '', a('plus', { s: '1.05em' }), 'gap:4px')}</div>`]
    ].map(([l, h]) => [l, pad(`<div class="stack" style="gap:14px">${listItems()}<div style="margin-top:4px">${h}</div></div>`)])),
    Q('pi-vm-sealla', 'Var ska länken "Se alla" sitta för en rad med kort?', [
      ['Uppe till höger vid rubriken', 'top'], ['Under raden, i mitten', 'bottom'], ['Under raden, till vänster', 'left']
    ].map(([l, m]) => {
      const link = lk('Se alla', a('arrow', { s: '1.05em' }));
      const tiles = `<div style="display:flex;gap:10px">${box('flex:1')}${box('flex:1')}</div>`;
      return [l, pad(`<div class="stack" style="gap:12px">${m === 'top' ? `<div style="display:flex;justify-content:space-between;align-items:center;gap:8px"><span class="h h3">Rubrik</span>${link}</div>` : '<span class="h h3">Rubrik</span>'}${tiles}${m === 'bottom' ? `<div style="text-align:center">${link}</div>` : m === 'left' ? `<div>${link}</div>` : ''}</div>`)];
    })),
    Q('pi-vm-text', 'Vilken text ska knappen för fler resultat ha?', [
      ['Visa fler', 'Visa fler'], ['Visa mer', 'Visa mer'], ['Ladda fler', 'Ladda fler'], ['Se alla', 'Se alla']
    ].map(([l, t]) => [l, pad(`<div class="stack" style="gap:14px">${listItems(2)}<div style="text-align:center">${sb(t, '', '', 'sb2')}</div></div>`)])),
    Q('pi-vm-antal', 'Ska knappen visa hur många som är kvar?', [
      ['Utan antal', sb('Visa fler', '', '', 'sb2')],
      ['Antal i knappen', sb('Visa fler (24)', '', '', 'sb2')],
      ['"Visar 12 av 36" ovanför', `<div class="small muted" style="margin-bottom:8px">Visar 12 av 36</div>${sb('Visa fler', '', '', 'sb2')}`]
    ].map(([l, h]) => [l, pad(`<div class="stack" style="gap:14px">${listItems(2)}<div style="text-align:center">${h}</div></div>`)])),
    Q('pi-vm-langtext', 'Hur ska en avkortad text med "Läs mer" se ut?', [
      ['Tonas ut och länk under', 'fade'], ['Tre punkter och länk direkt efter', 'inline'], ['Klipps efter rader och knapp under', 'btn']
    ].map(([l, m]) => {
      const long = 'Här är en längre beskrivning som fortsätter över flera rader. Den berättar mer om innehållet och vad som ingår, och den blir för lång för att visas i sin helhet direkt.';
      const body = m === 'fade' ? `<div style="position:relative;max-height:68px;overflow:hidden"><p>${long}</p><div style="position:absolute;left:0;right:0;bottom:0;height:34px;background:linear-gradient(transparent,var(--ground))"></div></div><div style="margin-top:6px">${lk('Läs mer', a('chevD', { s: '1.05em' }), '', 'gap:4px')}</div>`
        : m === 'inline' ? `<p>Här är en längre beskrivning som fortsätter över flera rader. Den berättar mer om… <span style="color:var(--brand);font-weight:600">Läs mer</span></p>`
        : `<p style="display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden">${long}</p><div style="margin-top:10px">${sb('Läs mer', '', 'height:38px;font-size:14px;padding:0 16px', 'sb2')}</div>`;
      return [l, pad(body)];
    }))
  ]));

  // =====================================================================
  // ELLIPSIS OCH TRUNKERING
  // =====================================================================
  const longTitle = 'En rubrik som är för lång för att få plats på en eller två rader i ett smalt kort';
  const clamp = n => `display:-webkit-box;-webkit-line-clamp:${n};-webkit-box-orient:vertical;overflow:hidden`;
  const tcard = (titleSt, descSt = clamp(2)) => pad(`<div class="panel stack" style="gap:6px;max-width:240px;margin:0 auto"><div class="h h3" style="${titleSt}">${longTitle}</div><p class="muted small" style="${descSt}">${txt} Mer text om innehållet som fortsätter ytterligare en bit.</p></div>`);
  groups.push(G('trunkering', 'Ellipsis och trunkering', [
    Q('pi-tr-rubrik', 'Hur ska en för lång rubrik i ett kort kortas?', [
      ['En rad med …', 'white-space:nowrap;overflow:hidden;text-overflow:ellipsis'], ['Två rader med …', clamp(2)], ['Visa hela rubriken', '']
    ].map(([l, st]) => [l, tcard(st)])),
    Q('pi-tr-text', 'Hur många rader beskrivning ska ett kort visa?', [
      ['En rad', clamp(1)], ['Två rader', clamp(2)], ['Tre rader', clamp(3)]
    ].map(([l, st]) => [l, tcard(clamp(2), st)])),
    Q('pi-tr-slut', 'Hur ska avkortad text sluta?', [
      ['Tre punkter …', 'white-space:nowrap;overflow:hidden;text-overflow:ellipsis'],
      ['Tonas ut', 'white-space:nowrap;overflow:hidden;-webkit-mask-image:linear-gradient(90deg,#000 75%,transparent);mask-image:linear-gradient(90deg,#000 75%,transparent)'],
      ['Klipps rakt av', 'white-space:nowrap;overflow:hidden']
    ].map(([l, st]) => [l, pad(`<div class="panel" style="max-width:240px;margin:0 auto;padding:4px 16px">${['Storgatan 12, 111 22 Stockholm, ingång från gården', 'Lillvägen 4, 222 33 Göteborg, andra våningen'].map((t, i) => `<div style="padding:10px 0;${i ? 'border-top:1px solid var(--sline);' : ''}${st}">${t}</div>`).join('')}</div>`)])),
    Q('pi-tr-mitten', 'Var ska ett långt filnamn kortas?', [
      ['I slutet', 'Bokningsbekräftelse_mars_…'], ['I mitten', 'Bokningsbekr…_mars_2026.pdf'], ['Radbryts i stället', 'Bokningsbekräftelse_mars_ 2026.pdf']
    ].map(([l, t]) => [l, pad(`<div class="panel" style="display:flex;align-items:center;gap:12px;max-width:260px;margin:0 auto;padding:12px 14px"><span style="width:32px;height:38px;border-radius:5px;background:var(--accent);flex:0 0 auto"></span><div style="min-width:0"><div style="font-weight:600;font-size:14px;${l === 'Radbryts i stället' ? 'word-break:break-all' : 'white-space:nowrap'}">${t.replace('_ ', '_')}</div><div class="small muted">240 kB</div></div></div>`)])),
    Q('pi-tr-tabell', 'Hur ska långa namn i en smal lista visas?', [
      ['Kortas med …', 'white-space:nowrap;overflow:hidden;text-overflow:ellipsis'], ['Radbryts', '']
    ].map(([l, st]) => [l, pad(`<div class="panel" style="padding:4px 16px;max-width:260px;margin:0 auto">${['Anna Lindqvist Bergström', 'Erik Johansson', 'Maria Andersson-Karlsson'].map((t, i) => `<div style="display:flex;justify-content:space-between;gap:12px;padding:10px 0;${i ? 'border-top:1px solid var(--sline)' : ''}"><span style="min-width:0;${st}">${t}</span><span class="muted small" style="flex:0 0 auto">14.00</span></div>`).join('')}</div>`)]))
  ]));

  // =====================================================================
  // SKELETT-PLATSHÅLLARE
  // =====================================================================
  // skel(o): kort med bild och tre rader. o.r = rundning på rader, o.anim, o.c = färg
  const skel = (o = {}) => {
    const c = o.c || '#E4E6E8', r = o.r == null ? 6 : o.r, cls = o.cls || '';
    const bar = (w, h) => `<div class="${cls}" style="height:${h}px;width:${w};border-radius:${r}px;background:${c}"></div>`;
    return pad(`<div class="panel stack" style="gap:10px;max-width:240px;margin:0 auto"><div class="${cls}" style="aspect-ratio:16/9;border-radius:${o.imgR == null ? 8 : o.imgR}px;background:${c}"></div>${bar('80%', o.h || 14)}${bar('100%', o.h2 || 10)}${bar(o.last || '60%', o.h2 || 10)}</div>`);
  };
  groups.push(G('skelett', 'Skelett-platshållare', [
    Q('pi-sk-form', 'Vilken form ska skelettets textrader ha?', [
      ['Lätt rundade', { r: 3 }], ['Pill, helt runda', { r: 999 }], ['Raka hörn', { r: 0, imgR: 0 }]
    ].map(([l, o]) => [l, skel({ h: 18, h2: 14, ...o })])),
    Q('pi-sk-rorelse', 'Hur ska skelettet röra sig medan det laddar?', [
      ['Glans som sveper över', 'pi-sk-a'], ['Mjuk puls', 'pi-sk-b'], ['Stilla', '']
    ].map(([l, c]) => {
      const css = c === 'pi-sk-a' ? `<style>@keyframes pi-sk-a-k{0%{background-position:150% 0}100%{background-position:-50% 0}}.pi-sk-a{background:linear-gradient(90deg,#E4E6E8 30%,#F1F2F3 50%,#E4E6E8 70%)!important;background-size:250% 100%!important;animation:pi-sk-a-k 1.6s linear infinite}${reduce('.pi-sk-a')}</style>`
        : c === 'pi-sk-b' ? `<style>@keyframes pi-sk-b-k{0%,100%{opacity:1}50%{opacity:.45}}.pi-sk-b{animation:pi-sk-b-k 1.6s ease-in-out infinite}${reduce('.pi-sk-b')}</style>` : '';
      return [l, css + skel({ cls: c })];
    })),
    Q('pi-sk-farg', 'Hur mörkt ska skelettet vara?', [
      ['Mycket ljust', '#EEEFF0'], ['Ljusgrått', '#E4E6E8'], ['Tydligt grått', '#D3D6D9'], ['Tonat i märkesfärg', '#DCE3EA']
    ].map(([l, c]) => [l, skel({ c })])),
    Q('pi-sk-detalj', 'Hur detaljerat ska skelettet vara?', [
      ['Som innehållet, rad för rad', skel()],
      ['Bara ett grått block', pad('<div class="panel" style="max-width:240px;margin:0 auto;padding:0;overflow:hidden"><div style="height:200px;background:#E4E6E8"></div></div>')],
      ['Snurra i stället', `<style>@keyframes pi-sk-sp{to{transform:rotate(360deg)}}.pi-sk-sp{animation:pi-sk-sp .9s linear infinite}${reduce('.pi-sk-sp')}</style>` + pad('<div class="panel" style="max-width:240px;margin:0 auto;height:200px;display:grid;place-items:center"><span class="pi-sk-sp" style="width:28px;height:28px;border-radius:50%;border:3px solid #E4E6E8;border-top-color:var(--brand);display:block"></span></div>')]
    ]),
    Q('pi-sk-sistarad', 'Ska skelettets sista textrad vara kortare?', [
      ['Kortare sista rad', { last: '60%' }], ['Alla rader lika långa', { last: '100%' }]
    ].map(([l, o]) => [l, skel(o)]))
  ]));

  // =====================================================================
  // KVANTITETSVÄLJARE
  // =====================================================================
  // qty(o): − 1 + i olika utföranden.
  const qty = (o = {}) => {
    const h = o.h || 40, m = o.mode || 'box';
    const btn = (k, dis) => `<span style="display:inline-grid;place-items:center;width:${h}px;height:${h}px;flex:0 0 auto;${o.btnSt || ''}${m === 'sep' ? 'border-radius:50%;border:1px solid var(--sline);background:var(--box);' : ''}${m === 'filled' ? 'border-radius:50%;background:var(--tint);color:var(--brand);' : ''}${dis ? 'opacity:.35;' : ''}">${a(k, { s: Math.round(h * .42) + 'px' })}</span>`;
    const num = `<span style="min-width:${Math.round(h * .9)}px;text-align:center;font-weight:600;font-variant-numeric:tabular-nums;${o.lines ? `align-self:stretch;display:grid;place-items:center;border-left:1px solid var(--sline);border-right:1px solid var(--sline);` : ''}">1</span>`;
    const minus = o.minusIcon === 'trash' ? `<span style="display:inline-grid;place-items:center;width:${h}px;height:${h}px;flex:0 0 auto;${m === 'sep' ? 'border-radius:50%;border:1px solid var(--sline);background:var(--box);' : ''}">${a('trash', { s: Math.round(h * .42) + 'px', w: 1.75 })}</span>` : btn('minus', o.dim);
    const wrapSt = m === 'box' ? `border:1px solid var(--sline);border-radius:${o.r || 'var(--rf)'};background:var(--field);` : m === 'pill' ? 'border:1px solid var(--sline);border-radius:999px;background:var(--field);' : m === 'grey' ? `border-radius:${o.r || 'var(--rf)'};background:#ECEDEE;` : '';
    return `<span style="display:inline-flex;align-items:center;${m === 'sep' || m === 'filled' ? 'gap:6px;' : ''}${wrapSt}overflow:hidden">${minus}${num}${btn('plus')}</span>`;
  };
  const qrow = q => pad(`<div class="panel" style="display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap"><div><div style="font-weight:600">Produktnamn</div><div class="price small">495 kr</div></div>${q}</div>`);
  groups.push(G('kvantitet', 'Kvantitetsväljare', [
    Q('pi-kv-form', 'Hur ska väljaren för antal se ut?', [
      ['Ruta med kant runt allt', { mode: 'box' }], ['Pill med kant', { mode: 'pill' }], ['Separata runda knappar', { mode: 'sep' }], ['Grå yta utan kant', { mode: 'grey' }], ['Bara − och + utan ram', { mode: 'bare' }]
    ].map(([l, o]) => [l, qrow(qty(o))])),
    Q('pi-kv-storlek', 'Hur stor ska väljaren för antal vara?', [
      ['Liten, 32 px', 32], ['Mellan, 40 px', 40], ['Stor, 48 px', 48]
    ].map(([l, h]) => [l, qrow(qty({ h }))])),
    Q('pi-kv-avdelare', 'Ska siffran skiljas från knapparna med linjer?', [
      ['Utan linjer', {}], ['Med lodräta linjer', { lines: true }]
    ].map(([l, o]) => [l, qrow(qty(o))])),
    Q('pi-kv-minst', 'Hur ska minusknappen se ut när antalet är 1?', [
      ['Nedtonad', { dim: true }], ['Byts mot papperskorg', { minusIcon: 'trash' }], ['Som vanligt', {}]
    ].map(([l, o]) => [l, qrow(qty(o))])),
    Q('pi-kv-knappar', 'Hur ska plus- och minusknapparna se ut när de står fritt?', [
      ['Runda med kant', { mode: 'sep' }], ['Runda och tonade', { mode: 'filled' }], ['Bara tecknen', { mode: 'bare' }]
    ].map(([l, o]) => [l, qrow(qty(o))])),
    Q('pi-kv-tecken', 'Vilka tecken ska väljaren använda?', [
      ['Minus och plus', 'pm'], ['Pilar upp och ner', 'ud']
    ].map(([l, m]) => [l, qrow(m === 'pm' ? qty() : `<span style="display:inline-flex;align-items:stretch;border:1px solid var(--sline);border-radius:var(--rf);background:var(--field);overflow:hidden;height:40px"><span style="min-width:44px;display:grid;place-items:center;font-weight:600">1</span><span style="display:flex;flex-direction:column;border-left:1px solid var(--sline)"><span style="flex:1;display:grid;place-items:center;width:28px;border-bottom:1px solid var(--sline)">${a('chevU', { s: '13px' })}</span><span style="flex:1;display:grid;place-items:center;width:28px">${a('chevD', { s: '13px' })}</span></span></span>`)]))
  ]));

  // =====================================================================
  // STJÄRNOR
  // =====================================================================
  const STAR = {
    spetsig: 'M12 2.5l2.9 6.6 7.1.6-5.4 4.7 1.6 7-6.2-3.7-6.2 3.7 1.6-7L2 9.7l7.1-.6z',
    rundad: 'M11.1 3.4a1 1 0 0 1 1.8 0l2.2 4.6 5 .7a1 1 0 0 1 .6 1.7l-3.7 3.5.9 5a1 1 0 0 1-1.5 1.1L12 17.6 7.6 20a1 1 0 0 1-1.5-1.1l.9-5-3.7-3.5a1 1 0 0 1 .6-1.7l5-.7z',
    smal: 'M12 1.5l2.2 7.6H22l-6.3 4.6 2.4 7.8L12 16.7l-6.1 4.8 2.4-7.8L2 9.1h7.8z'
  };
  const starSvg = (d, s, fill, stroke = 'none', half = false, key = '') => half
    ? `<svg viewBox="0 0 24 24" aria-hidden="true" style="width:${s}px;height:${s}px;flex:0 0 auto"><path d="${d}" fill="${stroke === 'none' ? '#D9DBDE' : 'none'}" stroke="${stroke === 'none' ? 'none' : fill}" stroke-width="1.5"/><path d="${d}" fill="${fill}" style="clip-path:inset(0 50% 0 0)"/></svg>`
    : `<svg viewBox="0 0 24 24" aria-hidden="true" style="width:${s}px;height:${s}px;flex:0 0 auto"><path d="${d}" fill="${fill}" stroke="${stroke}" stroke-width="1.5" stroke-linejoin="round"/></svg>`;
  const stars = (o = {}) => {
    const d = STAR[o.form || 'rundad'], s = o.s || 18, c = o.c || '#E3A008', score = o.score == null ? 4 : o.score;
    const empty = o.empty || 'grey';
    return `<span style="display:inline-flex;align-items:center;gap:${o.gap == null ? 2 : o.gap}px">${[0, 1, 2, 3, 4].map(i => {
      if (i < Math.floor(score)) return starSvg(d, s, c);
      if (i < score) return starSvg(d, s, c, empty === 'outline' ? c : 'none', true);
      return empty === 'none' ? '' : empty === 'outline' ? starSvg(d, s, 'none', c) : starSvg(d, s, '#D9DBDE');
    }).join('')}</span>`;
  };
  const rate = (st, after = '<span class="small muted">4,0 (120)</span>') => cen(`<span style="display:inline-flex;align-items:center;gap:8px">${st}${after}</span>`);
  groups.push(G('stjarnor', 'Stjärnor', [
    Q('pi-sj-form', 'Vilken form ska betygsstjärnorna ha?', [
      ['Klassisk spetsig', 'spetsig'], ['Rundade spetsar', 'rundad'], ['Smala långa uddar', 'smal']
    ].map(([l, f]) => [l, rate(stars({ form: f, s: 22 }))])),
    Q('pi-sj-storlek', 'Hur stora ska stjärnorna vara i ett kort?', [
      ['Små, 14 px', 14], ['Mellan, 18 px', 18], ['Stora, 24 px', 24]
    ].map(([l, s]) => [l, rate(stars({ s }))])),
    Q('pi-sj-farg', 'Vilken färg ska fyllda stjärnor ha?', [
      ['Gul', '#E3A008'], ['Mörk som texten', 'var(--sink)'], ['Märkesfärg', 'var(--brand)']
    ].map(([l, c]) => [l, rate(stars({ c }))])),
    Q('pi-sj-tom', 'Hur ska tomma stjärnor se ut?', [
      ['Grå fyllda', 'grey'], ['Bara kontur', 'outline'], ['Visas inte', 'none']
    ].map(([l, e]) => [l, rate(stars({ empty: e, s: 20 }))])),
    Q('pi-sj-halv', 'Hur ska ett betyg som 4,5 visas?', [
      ['Halvfylld femte stjärna', rate(stars({ score: 4.5, s: 20 }), '<span class="small muted">4,5</span>')],
      ['Avrundat till hela stjärnor', rate(stars({ score: 5, s: 20 }), '<span class="small muted">4,5</span>')],
      ['En stjärna och siffran', rate(starSvg(STAR.rundad, 20, '#E3A008'), '<span style="font-weight:600">4,5</span><span class="small muted">(120)</span>')]
    ]),
    Q('pi-sj-avstand', 'Hur tätt ska stjärnorna sitta?', [
      ['Tätt, 0 px', 0], ['Normalt, 2 px', 2], ['Luftigt, 5 px', 5]
    ].map(([l, g]) => [l, rate(stars({ gap: g, s: 20 }))]))
  ]));

  // =====================================================================
  // PROGRESSBAR
  // =====================================================================
  const pbar = (o = {}) => {
    const h = o.h || 6, r = o.r == null ? 999 : o.r, fr = o.fr == null ? r : o.fr, trk = o.trk == null ? 'rgba(26,28,30,.1)' : o.trk;
    const bar = `<div style="position:relative;height:${h}px;border-radius:${r}px;background:${trk};${o.trkLine ? 'background:linear-gradient(transparent calc(50% - 1px),rgba(26,28,30,.22) calc(50% - 1px),rgba(26,28,30,.22) calc(50% + 0px),transparent calc(50% + 0px));' : ''}overflow:hidden"><div style="width:62%;height:100%;border-radius:${fr}px;background:var(--brand);${o.inside ? 'display:flex;align-items:center;justify-content:flex-end;padding-right:8px;color:#fff;font-size:11px;font-weight:700' : ''}">${o.inside ? '62 %' : ''}</div></div>`;
    const lab = o.lab || 'top';
    if (lab === 'top') return `<div class="stack" style="gap:8px"><div style="display:flex;justify-content:space-between;font-size:13px"><span style="font-weight:600">Uppladdning</span><span class="muted">62 %</span></div>${bar}</div>`;
    if (lab === 'end') return `<div class="stack" style="gap:8px"><span style="font-size:13px;font-weight:600">Uppladdning</span><div style="display:flex;align-items:center;gap:10px"><div style="flex:1">${bar}</div><span class="small muted">62 %</span></div></div>`;
    return `<div class="stack" style="gap:8px"><span style="font-size:13px;font-weight:600">Uppladdning</span>${bar}</div>`;
  };
  const pb = o => pad(`<div class="panel">${pbar(o)}</div>`);
  groups.push(G('progress', 'Progressbar', [
    Q('pi-pb-tjocklek', 'Hur tjock ska en progressbar vara?', [
      ['Hårfin, 2 px', 2], ['Tunn, 4 px', 4], ['Mellan, 8 px', 8], ['Tjock, 12 px', 12]
    ].map(([l, h]) => [l, pb({ h })])),
    Q('pi-pb-rundning', 'Hur ska progressbarens ändar se ut?', [
      ['Helt runda ändar', { r: 999 }], ['Lätt rundade', { r: 3 }], ['Raka ändar', { r: 0 }], ['Rundat spår, rak fyllning', { r: 999, fr: 0 }]
    ].map(([l, o]) => [l, pb({ h: 10, ...o })])),
    Q('pi-pb-spar', 'Hur ska den tomma delen av stapeln se ut?', [
      ['Ljusgrått spår', {}], ['Tonat spår', { trk: 'var(--tint)' }], ['Bara en tunn linje', { trk: 'transparent', trkLine: true }]
    ].map(([l, o]) => [l, pb({ h: 6, ...o })])),
    Q('pi-pb-etikett', 'Var ska procenten stå?', [
      ['Ovanför till höger', { lab: 'top' }], ['Efter stapeln', { lab: 'end' }], ['Inuti stapeln', { lab: 'none', inside: true, h: 18 }], ['Ingen procent', { lab: 'none' }]
    ].map(([l, o]) => [l, pb({ h: 6, ...o })])),
    Q('pi-pb-segment', 'Ska framsteg i ett flöde visas som en hel stapel eller i delar?', [
      ['Hel stapel', 'hel'], ['En del per steg', 'seg']
    ].map(([l, m]) => [l, pad(`<div class="panel stack" style="gap:8px"><div style="display:flex;justify-content:space-between;font-size:13px"><span style="font-weight:600">Uppgifter</span><span class="muted">Steg 2 av 4</span></div>${m === 'hel' ? '<div style="height:6px;border-radius:6px;background:rgba(26,28,30,.1)"><div style="width:50%;height:100%;border-radius:6px;background:var(--brand)"></div></div>' : `<div style="display:flex;gap:4px">${[1, 1, 0, 0].map(f => `<span style="flex:1;height:6px;border-radius:6px;background:${f ? 'var(--brand)' : 'rgba(26,28,30,.1)'}"></span>`).join('')}</div>`}</div>`)])),
    Q('pi-pb-cirkel', 'Ska framsteg visas som stapel eller ring?', [
      ['Rak stapel', 'bar'], ['Ring med procent', 'ring']
    ].map(([l, m]) => [l, m === 'bar' ? pb({ h: 6 }) : pad(`<div class="panel" style="display:flex;align-items:center;gap:14px"><svg viewBox="0 0 36 36" aria-hidden="true" style="width:52px;height:52px;flex:0 0 auto;transform:rotate(-90deg)"><circle cx="18" cy="18" r="15" fill="none" stroke="rgba(26,28,30,.1)" stroke-width="4"/><circle cx="18" cy="18" r="15" fill="none" stroke="var(--brand)" stroke-width="4" stroke-linecap="round" stroke-dasharray="58.4 94.2"/></svg><div><div style="font-size:13px;font-weight:600">Uppladdning</div><div class="small muted">62 %</div></div></div>`)]))
  ]));

  // =====================================================================
  // SMÅ GRAFISKA ACCENTER VID RUBRIKER
  // =====================================================================
  const head = (before = '', after = '', below = '', st = '') => pad(`<div class="stack" style="gap:10px;${st}">${before}<div class="h h2">Rubrik på avsnittet${after}</div>${below}<p class="muted">${txt}</p></div>`);
  const bar2 = (w, h, c = 'var(--brand)') => `<span style="display:block;width:${w}px;height:${h}px;border-radius:${h}px;background:${c}"></span>`;
  groups.push(G('accenter', 'Små grafiska accenter', [
    Q('pi-ac-rubrik', 'Ska rubriker ha en liten grafisk accent?', [
      ['Kort streck under rubriken', head('', '', bar2(40, 3))],
      ['Prick efter rubriken', head('', '<span style="color:var(--brand)">.</span>')],
      ['Kort streck ovanför', head(bar2(40, 3))],
      ['Ingen accent', head()]
    ]),
    Q('pi-ac-streck', 'Hur stort ska strecket under rubriken vara?', [
      ['Kort och tunt, 24 × 2 px', [24, 2]], ['Mellan, 40 × 3 px', [40, 3]], ['Långt och kraftigt, 64 × 4 px', [64, 4]]
    ].map(([l, [w, h]]) => [l, head('', '', bar2(w, h))])),
    Q('pi-ac-overrubrik', 'Ska överrubriken ha en liten detalj före?', [
      ['Kort streck före', `<span class="eyebrow" style="display:inline-flex;align-items:center;gap:8px">${bar2(20, 2, 'currentColor')}Om oss</span>`],
      ['Prick före', `<span class="eyebrow" style="display:inline-flex;align-items:center;gap:8px"><span style="width:6px;height:6px;border-radius:50%;background:var(--brand)"></span>Om oss</span>`],
      ['Nummer före', '<span class="eyebrow" style="display:inline-flex;align-items:center;gap:8px"><span style="color:var(--brand)">01</span>Om oss</span>'],
      ['Ingen detalj', '<span class="eyebrow">Om oss</span>']
    ].map(([l, e]) => [l, head(e)])),
    Q('pi-ac-lodrat', 'Ska en rubrik ha ett lodrätt streck till vänster?', [
      ['Med lodrätt streck', 'border-left:3px solid var(--brand);padding-left:14px'], ['Utan streck', '']
    ].map(([l, st]) => [l, head('', '', '', st)])),
    Q('pi-ac-farg', 'Vilken färg ska accenten vid rubriken ha?', [
      ['Märkesfärg', 'var(--brand)'], ['Samma som rubriken', 'var(--sink)'], ['Ljus ton', '#C9D3DD']
    ].map(([l, c]) => [l, head('', '', bar2(40, 3, c))]))
  ]));

  // =====================================================================
  // KOMPLETTERINGAR I BEFINTLIGA GRUPPER
  // =====================================================================
  const addTo = (key, ...qs) => groups.find(g => g.key === key).questions.push(...qs);

  addTo('pil-form', Q('pi-form-frantill', 'Vilket tecken ska stå mellan två platser eller tider, som "Malmö – Lund"?', [
    ['Pil med skaft →', a('arrow', { s: '1em', c: 'var(--smuted)' })], ['Lång tunn pil', a('long', { s: '1em', w: 1.25, c: 'var(--smuted)' })], ['Tankstreck –', '<span class="muted">–</span>'], ['Chevron ›', a('chev', { s: '1em', c: 'var(--smuted)' })]
  ].map(([l, s]) => [l, pad(`<div class="panel stack" style="gap:6px"><div style="display:flex;align-items:center;gap:8px;font-weight:700;font-size:17px;flex-wrap:wrap">Malmö${s}Lund</div><div class="small" style="display:flex;align-items:center;gap:6px">08.10${s}11.05</div></div>`)])));

  addTo('avdelare', Q('pi-avd-rubriklinje', 'Ska en liten rubrik över en grupp ha en linje bredvid sig?', [
    ['Linje efter rubriken', 'after'], ['Linje under rubriken', 'under'], ['Ingen linje', 'none']
  ].map(([l, m]) => {
    const t = '<span class="eyebrow" style="white-space:nowrap">Tillval</span>';
    const h = m === 'after' ? `<div style="display:flex;align-items:center;gap:12px">${t}<span style="flex:1;height:1px;background:var(--sline)"></span></div>`
      : m === 'under' ? `<div style="padding-bottom:8px;border-bottom:1px solid var(--sline)">${t}</div>` : `<div>${t}</div>`;
    return [l, pad(`<div class="stack" style="gap:10px">${h}${['Frukost', 'Sen utcheckning'].map(x => `<div style="display:flex;justify-content:space-between"><span>${x}</span><span class="muted">195 kr</span></div>`).join('')}</div>`)];
  })));

  addTo('metadata', Q('pi-meta-placering', 'Var ska metadata stå i ett kort?', [
    ['Ovanför rubriken', 'above'], ['Under rubriken', 'below']
  ].map(([l, m]) => {
    const md = '<div class="small muted" style="display:flex;gap:8px;flex-wrap:wrap"><span>12 maj</span><span>·</span><span>5 min läsning</span></div>';
    return [l, pad(`<div class="panel stack" style="gap:6px">${m === 'above' ? md : ''}<div class="h h3">Rubrik som är två rader lång i ett kort</div>${m === 'below' ? md : ''}<p class="muted small">${txt}</p></div>`)];
  })));

  addTo('steg', Q('pi-sg-lodrat', 'Hur ska numrerade steg i en lodrät lista se ut, som "Så går det till"?', [
    ['Siffror i cirklar med linje', 'line'], ['Siffror i cirklar utan linje', 'circ'], ['Stora siffror utan form', 'big'], ['Siffror i rundade fyrkanter', 'sq']
  ].map(([l, m]) => {
    const items = ['Välj tid', 'Fyll i uppgifter', 'Få bekräftelse'];
    const num = i => m === 'big' ? `<span style="font-size:26px;font-weight:800;color:var(--brand);line-height:1;width:28px;flex:0 0 auto">${i + 1}</span>`
      : `<span style="display:inline-grid;place-items:center;width:28px;height:28px;flex:0 0 auto;border-radius:${m === 'sq' ? '8px' : '50%'};background:var(--brand);color:#fff;font-size:13px;font-weight:700;position:relative;z-index:1">${i + 1}</span>`;
    return [l, pad(`<div class="stack" style="gap:0">${items.map((t, i) => `<div style="display:flex;gap:14px;position:relative;padding-bottom:${i < 2 ? 18 : 0}px">${m === 'line' && i < 2 ? '<span style="position:absolute;left:13px;top:28px;bottom:0;width:2px;background:var(--sline)"></span>' : ''}${num(i)}<div><div style="font-weight:600">${t}</div><div class="small muted">Kort förklaring av steget.</div></div></div>`).join('')}</div>`)];
  })));

  addTo('stjarnor', Q('pi-sj-satta', 'Hur ska stjärnorna se ut när man själv sätter betyg?', [
    ['Stora konturstjärnor', { s: 32, empty: 'outline', gap: 6 }], ['Stora grå stjärnor', { s: 32, empty: 'grey', gap: 6 }], ['Lika små som i visning', { s: 18, empty: 'grey' }]
  ].map(([l, o]) => [l, cen(`<div class="stack" style="gap:8px;align-items:center"><span style="font-weight:600">Hur var ditt besök?</span>${stars({ score: 3, ...o })}</div>`)])));

  addTo('progress', Q('pi-pb-farg', 'Vilken färg ska fyllnaden i en progressbar ha?', [
    ['Märkesfärg', 'var(--brand)'], ['Grön', 'var(--ok)'], ['Mörk som texten', 'var(--sink)']
  ].map(([l, c]) => [l, pb({ h: 6 }).replace('background:var(--brand);', `background:${c};`)])));

  window.QZ.part({ key: 'pilar', groups });
})();
