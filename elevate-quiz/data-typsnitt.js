/* Elevate designquiz: del Typsnitt (ts-).
   Vilka typsnitt som ska och aldrig ska användas till rubriker, brödtext, siffror,
   knappar, fält, etiketter och små texter. Varje fråga visar samma text i olika
   typsnitt (eller samma typsnitt i olika vikter, bredder och varianter). */
(function () {
  // ---------- Familjer ----------
  const SERIF = ['Fraunces', 'Playfair Display', 'Lora', 'Source Serif 4', 'DM Serif Display', 'Instrument Serif', 'Newsreader', 'Libre Caslon Text', 'EB Garamond', 'Cormorant'];
  const MONO = ['JetBrains Mono', 'IBM Plex Mono', 'DM Mono', 'Geist Mono'];
  const ff = n => `'${n}', ${SERIF.includes(n) ? 'Georgia, serif' : MONO.includes(n) ? 'ui-monospace, monospace' : 'system-ui, sans-serif'}`;
  // Rubrikvikt per familj när frågan inte gäller vikten. Sans 700, serifer sin naturliga rubrikvikt.
  const HW = { 'Fraunces': 600, 'Playfair Display': 700, 'Lora': 600, 'Source Serif 4': 600, 'DM Serif Display': 400, 'Instrument Serif': 400, 'Newsreader': 500, 'Libre Caslon Text': 700, 'EB Garamond': 500, 'Cormorant': 600 };
  const hw = n => HW[n] || 700;
  const st = (n, w) => `font-family:${ff(n)};font-weight:${w}`;

  // ---------- Texter (neutrala, identiska i alla alternativ) ----------
  const HT = [
    ['Rubrik på', 'två rader'],
    ['Allt samlat', 'på ett ställe'],
    ['Kom igång', 'på en minut'],
    ['Enkelt att', 'komma igång'],
    ['Tydligt och', 'lätt att läsa'],
    ['Se hur det', 'fungerar'],
    ['Planera din', 'nästa vecka'],
    ['Mer tid för', 'det viktiga'],
  ];
  const SHORT = 'En kort brödtext under rubriken, på en eller två rader.';
  const PARA = 'Det här är ett vanligt stycke brödtext. Det ska vara lätt att läsa, även när texten blir lite längre och fortsätter över flera rader.';

  // ---------- Byggstenar ----------
  // Rubrik på två rader, ibland med kort brödtext (i grundtypsnittet) under.
  function head(n, t, o = {}) {
    const w = o.w || hw(n);
    const size = o.size || 'clamp(26px, 11cqi, 40px)';
    return `<div class="pad" style="container-type:inline-size"><p class="h" style="${st(n, w)};font-size:${size};${o.style || ''}">${t[0]}<br>${t[1]}</p>${o.body ? `<p class="muted" style="margin-top:12px;max-width:34ch">${o.bodyText || SHORT}</p>` : ''}</div>`;
  }
  const opt = (l, h) => ({ l, h });
  const fontOpts = (fams, render) => fams.map(n => opt(n, render(n)));
  const Q = (id, q, opts, layout = 'grid') => ({ id: 'ts-' + id, q, layout, opts });
  const pad2 = i => String(i + 1).padStart(2, '0');

  const groups = [];

  // =====================================================================
  // 1. Rubriker: sans, tre omgångar där varje familj möter olika motståndare
  // =====================================================================
  const SANS_ROUNDS = [
    // Omgång A: liknande familjer mot varandra
    ['Inter', 'Geist', 'Hanken Grotesk', 'Public Sans', 'Instrument Sans'],
    ['Schibsted Grotesk', 'Onest', 'Work Sans', 'Albert Sans', 'Archivo'],
    ['IBM Plex Sans', 'Roboto', 'Open Sans', 'Source Sans 3', 'Lato', 'Nunito Sans'],
    ['DM Sans', 'Manrope', 'Figtree', 'Plus Jakarta Sans', 'Outfit'],
    ['Sora', 'Montserrat', 'Poppins', 'Urbanist', 'Lexend'],
    ['Red Hat Display', 'Raleway', 'Rubik', 'Epilogue'],
    ['Space Grotesk', 'Bricolage Grotesque', 'Syne', 'Unbounded'],
    // Omgång B: blandat
    ['Inter', 'Onest', 'Lexend', 'Red Hat Display', 'Space Grotesk'],
    ['Geist', 'Work Sans', 'IBM Plex Sans', 'Raleway', 'Bricolage Grotesque'],
    ['Hanken Grotesk', 'Albert Sans', 'Roboto', 'DM Sans', 'Syne'],
    ['Public Sans', 'Archivo', 'Open Sans', 'Manrope', 'Sora'],
    ['Instrument Sans', 'Source Sans 3', 'Figtree', 'Montserrat', 'Epilogue'],
    ['Schibsted Grotesk', 'Lato', 'Plus Jakarta Sans', 'Poppins', 'Unbounded'],
    ['Nunito Sans', 'Outfit', 'Urbanist', 'Rubik'],
    // Omgång C: nya motståndare igen
    ['Figtree', 'Rubik', 'Raleway', 'Sora', 'Nunito Sans'],
    ['Instrument Sans', 'Unbounded', 'Manrope', 'Onest', 'Roboto'],
    ['IBM Plex Sans', 'Syne', 'Public Sans', 'Schibsted Grotesk', 'Space Grotesk'],
    ['Open Sans', 'Poppins', 'Red Hat Display', 'Hanken Grotesk', 'Outfit'],
    ['Geist', 'Albert Sans', 'Plus Jakarta Sans', 'Source Sans 3', 'Urbanist'],
    ['Lexend', 'Archivo', 'Bricolage Grotesque', 'Epilogue', 'Lato'],
    ['Inter', 'DM Sans', 'Work Sans', 'Montserrat'],
  ];
  groups.push({
    key: 'rubrik-sans', title: 'Rubriktypsnitt: sans',
    questions: SANS_ROUNDS.map((fams, i) => Q(`rubrik-sans-${pad2(i)}`,
      `Rubriker, omgång ${i + 1} av ${SANS_ROUNDS.length}: vilket typsnitt är bäst?`,
      fontOpts(fams, n => head(n, HT[i % HT.length], { body: i % 3 === 1 })))),
  });

  // =====================================================================
  // 2. Rubriker: serif, och serif mot sans
  // =====================================================================
  const SERIF_ROUNDS = [
    ['Fraunces', 'Playfair Display', 'DM Serif Display', 'Instrument Serif', 'Cormorant'],
    ['Lora', 'Source Serif 4', 'Newsreader', 'Libre Caslon Text', 'EB Garamond'],
    ['Playfair Display', 'Lora', 'Libre Caslon Text', 'Cormorant', 'Fraunces'],
    ['EB Garamond', 'Newsreader', 'Source Serif 4', 'DM Serif Display', 'Instrument Serif'],
    ['Instrument Serif', 'Lora', 'Source Serif 4', 'Libre Caslon Text', 'Cormorant'],
    ['Playfair Display', 'DM Serif Display', 'EB Garamond', 'Fraunces', 'Newsreader'],
  ];
  groups.push({
    key: 'rubrik-serif', title: 'Rubriktypsnitt: serif',
    questions: SERIF_ROUNDS.map((fams, i) => Q(`rubrik-serif-${pad2(i)}`,
      `Serif-rubriker, omgång ${i + 1} av ${SERIF_ROUNDS.length}: vilken är bäst?`,
      fontOpts(fams, n => head(n, HT[(i + 3) % HT.length], { body: i % 2 === 0 })))),
  });

  const MIX_ROUNDS = [
    ['Inter', 'Fraunces', 'Geist', 'Instrument Serif', 'Cormorant'],
    ['Manrope', 'Playfair Display', 'Plus Jakarta Sans', 'Newsreader', 'Space Grotesk'],
    ['Figtree', 'Source Serif 4', 'Hanken Grotesk', 'DM Serif Display', 'Bricolage Grotesque'],
    ['Schibsted Grotesk', 'Lora', 'Instrument Sans', 'EB Garamond', 'Libre Caslon Text'],
  ];
  groups.push({
    key: 'rubrik-blandat', title: 'Rubriktypsnitt: sans mot serif',
    questions: MIX_ROUNDS.map((fams, i) => Q(`rubrik-blandat-${pad2(i)}`,
      `Sans mot serif, omgång ${i + 1} av ${MIX_ROUNDS.length}: vilken rubrik är bäst?`,
      fontOpts(fams, n => head(n, HT[(i + 5) % HT.length], { body: true })))),
  });

  // =====================================================================
  // 3. Rubriker: vilka ska aldrig användas
  // =====================================================================
  const NEVER_ROUNDS = [
    ['Inter', 'Nunito Sans', 'DM Sans', 'Plus Jakarta Sans', 'Montserrat'],
    ['Geist', 'Red Hat Display', 'Lexend', 'Hanken Grotesk', 'Unbounded'],
    ['Work Sans', 'Albert Sans', 'Space Grotesk', 'Fraunces', 'Urbanist'],
    ['Cormorant', 'Syne', 'DM Serif Display', 'Roboto', 'Libre Caslon Text'],
    ['Open Sans', 'Outfit', 'Source Serif 4', 'Instrument Serif', 'IBM Plex Sans'],
    ['Bricolage Grotesque', 'Public Sans', 'Newsreader', 'Lora', 'Figtree'],
    ['Playfair Display', 'Manrope', 'Epilogue', 'Lato', 'Instrument Sans'],
    ['Rubik', 'Schibsted Grotesk', 'Archivo', 'Source Sans 3', 'Sora'],
    ['Onest', 'Raleway', 'Poppins', 'EB Garamond'],
  ];
  groups.push({
    key: 'rubrik-aldrig', title: 'Rubriktypsnitt: aldrig',
    questions: NEVER_ROUNDS.map((fams, i) => Q(`rubrik-aldrig-${pad2(i)}`,
      `Vilken av de här ska aldrig användas till rubriker? (${i + 1} av ${NEVER_ROUNDS.length})`,
      fontOpts(fams, n => head(n, HT[(i + 1) % HT.length])))),
  });

  // =====================================================================
  // 4. Brödtext: stycke på 3–4 rader i 16 px
  // =====================================================================
  function para(n, o = {}) {
    return `<div class="pad"><p style="${st(n, o.w || 400)};font-size:16px;line-height:1.55;max-width:36ch;${o.style || ''}">${o.text || PARA}</p></div>`;
  }
  const BODY_ROUNDS = [
    ['DM Sans', 'Public Sans', 'Geist', 'Instrument Sans'],
    ['Lexend', 'Epilogue', 'Outfit', 'Libre Caslon Text'],
    ['Sora', 'Urbanist', 'Source Sans 3', 'Raleway'],
    ['Space Grotesk', 'Poppins', 'IBM Plex Sans', 'Onest'],
    ['Plus Jakarta Sans', 'Albert Sans', 'Work Sans', 'Schibsted Grotesk'],
    ['Rubik', 'Hanken Grotesk', 'Inter', 'Lato'],
    ['EB Garamond', 'Fraunces', 'Lora', 'Open Sans'],
    ['Nunito Sans', 'Roboto', 'Montserrat', 'Archivo'],
    ['Source Serif 4', 'Figtree', 'Manrope', 'Newsreader'],
    ['Figtree', 'Urbanist', 'Libre Caslon Text', 'Schibsted Grotesk'],
    ['EB Garamond', 'Outfit', 'Archivo', 'Poppins'],
    ['Public Sans', 'Roboto', 'Source Sans 3', 'Work Sans'],
    ['Source Serif 4', 'Rubik', 'Lexend', 'Open Sans'],
    ['Albert Sans', 'Manrope', 'Geist', 'Raleway'],
    ['Newsreader', 'Plus Jakarta Sans', 'Space Grotesk', 'Montserrat'],
    ['DM Sans', 'Onest', 'Hanken Grotesk', 'Nunito Sans'],
    ['Inter', 'Fraunces', 'Sora', 'Instrument Sans'],
    ['Lato', 'IBM Plex Sans', 'Epilogue', 'Lora'],
  ];
  const BODY_NEVER = [
    ['Poppins', 'Montserrat', 'Raleway', 'Lexend', 'Urbanist', 'Space Grotesk'],
    ['EB Garamond', 'Fraunces', 'Sora', 'Epilogue', 'Rubik', 'Outfit'],
    ['Lato', 'Open Sans', 'Roboto', 'Nunito Sans', 'Libre Caslon Text', 'Archivo'],
  ];
  groups.push({
    key: 'brodtext', title: 'Brödtexttypsnitt',
    questions: [
      ...BODY_ROUNDS.map((fams, i) => Q(`brodtext-${pad2(i)}`,
        `Brödtext, omgång ${i + 1} av ${BODY_ROUNDS.length}: vilket stycke är lättast och trevligast att läsa?`,
        fontOpts(fams, n => para(n)))),
      ...BODY_NEVER.map((fams, i) => Q(`brodtext-aldrig-${pad2(i)}`,
        `Vilken av de här ska aldrig användas till brödtext? (${i + 1} av ${BODY_NEVER.length})`,
        fontOpts(fams, n => para(n)))),
    ],
  });

  // =====================================================================
  // 5. Siffror och priser
  // =====================================================================
  const price = n => `<div class="pad"><p class="muted small">Från</p><p style="${st(n, hw(n))};font-size:36px;line-height:1.1;letter-spacing:-0.01em;margin-top:2px">1&nbsp;495&nbsp;kr</p><p class="muted small" style="margin-top:6px">per månad</p></div>`;
  const PRICE_ROUNDS = [
    ['Inter', 'Geist', 'DM Sans', 'Manrope', 'Plus Jakarta Sans'],
    ['Space Grotesk', 'Sora', 'Outfit', 'Figtree', 'Bricolage Grotesque'],
    ['IBM Plex Sans', 'Roboto', 'Archivo', 'Schibsted Grotesk', 'Hanken Grotesk'],
    ['Montserrat', 'Poppins', 'Raleway', 'Instrument Sans', 'Onest'],
    ['Fraunces', 'Playfair Display', 'Source Serif 4', 'Newsreader', 'DM Serif Display'],
  ];
  const plist = n => {
    const rows = [['Liten', '495'], ['Mellan', '1&nbsp;495'], ['Stor', '11&nbsp;900']];
    return `<div class="pad"><div class="stack" style="gap:0">${rows.map((r, i) => `${i ? '<hr class="divider">' : ''}<div style="display:flex;justify-content:space-between;align-items:baseline;gap:12px;padding:10px 0"><span>${r[0]}</span><span style="${st(n, 600)};font-size:17px;white-space:nowrap">${r[1]}&nbsp;kr</span></div>`).join('')}</div></div>`;
  };
  const timetable = n => {
    const rows = [['07:42', '11:18', '3 h 36 min'], ['08:15', '12:04', '3 h 49 min'], ['10:30', '13:55', '3 h 25 min'], ['13:05', '16:41', '3 h 36 min']];
    const c = `font-family:${ff(n)};font-variant-numeric:tabular-nums`;
    return `<div class="pad"><div style="display:grid;grid-template-columns:auto auto 1fr;gap:8px 14px;align-items:baseline;font-size:15px;${c}"><span class="small muted" style="${c}">Avgår</span><span class="small muted" style="${c}">Framme</span><span class="small muted" style="${c};text-align:right">Restid</span>${rows.map(r => `<span style="font-weight:600">${r[0]}</span><span>${r[1]}</span><span class="muted" style="text-align:right;white-space:nowrap">${r[2]}</span>`).join('')}</div></div>`;
  };
  const TIME_ROUNDS = [
    ['Inter', 'Roboto', 'IBM Plex Sans', 'Source Sans 3', 'Public Sans'],
    ['DM Sans', 'Manrope', 'Geist', 'Work Sans', 'Figtree'],
    ['Space Grotesk', 'Archivo', 'Plus Jakarta Sans', 'Hanken Grotesk', 'Instrument Sans'],
  ];
  const stats = n => `<div class="pad" style="container-type:inline-size"><div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">${[['98&nbsp;%', 'svarar inom ett dygn'], ['4,8', 'i snittbetyg']].map(s => `<div style="min-width:0"><p style="${st(n, hw(n))};font-size:clamp(30px,15cqi,48px);line-height:1;letter-spacing:-0.02em;white-space:nowrap">${s[0]}</p><p class="small muted" style="margin-top:6px">${s[1]}</p></div>`).join('')}</div></div>`;
  const STAT_ROUNDS = [
    ['Inter', 'Manrope', 'DM Sans', 'Geist', 'Plus Jakarta Sans'],
    ['Space Grotesk', 'Sora', 'Outfit', 'Bricolage Grotesque', 'Unbounded'],
    ['Fraunces', 'Playfair Display', 'Instrument Serif', 'DM Serif Display', 'Inter'],
  ];
  const digits = n => `<div class="pad"><p style="${st(n, 500)};font-size:30px;line-height:1.2;letter-spacing:0.01em">0123456789</p><p style="${st(n, 400)};font-size:16px;margin-top:8px">Ordernummer 1170 4196, kl. 11:17</p></div>`;
  groups.push({
    key: 'siffror', title: 'Siffror och priser',
    questions: [
      ...PRICE_ROUNDS.map((fams, i) => Q(`pris-${pad2(i)}`,
        `Pris, omgång ${i + 1} av ${PRICE_ROUNDS.length}: vilket typsnitt ska ”1 495 kr” ha?`,
        fontOpts(fams, n => price(n)))),
      Q('pris-lista', 'Vilket typsnitt ska priserna i en lista ha?',
        fontOpts(['Inter', 'Geist', 'DM Sans', 'Manrope', 'Space Grotesk'], plist)),
      ...TIME_ROUNDS.map((fams, i) => Q(`tidtabell-${pad2(i)}`,
        `Tidtabell, omgång ${i + 1} av ${TIME_ROUNDS.length}: vilket typsnitt är tydligast?`,
        fontOpts(fams, timetable))),
      ...STAT_ROUNDS.map((fams, i) => Q(`statistik-${pad2(i)}`,
        `Stora siffror i statistik, omgång ${i + 1} av ${STAT_ROUNDS.length}: vilket typsnitt?`,
        fontOpts(fams, stats))),
      Q('siffror-form', 'Vilka siffror är tydligast att läsa?',
        fontOpts(['Inter', 'Space Grotesk', 'IBM Plex Sans', 'Raleway', 'Sora'], digits)),
    ],
  });

  // =====================================================================
  // 6. Knapp- och menytext
  // =====================================================================
  const btns = (n, w = 600) => `<div class="pad"><div class="row"><span class="sb" style="${st(n, w)}">Boka tid</span><span class="sb2" style="${st(n, w)}">Läs mer</span></div></div>`;
  const BTN_ROUNDS = [
    ['Inter', 'DM Sans', 'Manrope', 'Figtree', 'Plus Jakarta Sans'],
    ['Geist', 'Space Grotesk', 'Outfit', 'Montserrat', 'Poppins'],
    ['Work Sans', 'IBM Plex Sans', 'Instrument Sans', 'Schibsted Grotesk', 'Hanken Grotesk'],
    ['Onest', 'Sora', 'Archivo', 'Roboto', 'Open Sans'],
  ];
  const menu = (n, w = 500) => `<div class="pad"><div class="panel" style="display:flex;flex-wrap:wrap;gap:8px 22px;align-items:center;${st(n, w)};font-size:15px"><span style="color:var(--brand);text-decoration:underline;text-underline-offset:6px;text-decoration-thickness:2px">Start</span><span>Tjänster</span><span>Priser</span><span>Kontakt</span></div></div>`;
  const MENU_ROUNDS = [
    ['Inter', 'DM Sans', 'Manrope', 'Geist', 'Figtree'],
    ['Plus Jakarta Sans', 'Space Grotesk', 'Outfit', 'Montserrat', 'Poppins'],
    ['IBM Plex Sans', 'Instrument Sans', 'Schibsted Grotesk', 'Hanken Grotesk', 'Work Sans'],
    ['Onest', 'Sora', 'Archivo', 'Public Sans', 'Albert Sans'],
  ];
  // Knapp under en rubrik och en text: rubrikens eller brödtextens typsnitt?
  const btnCtx = (hf, bf) => `<div class="pad"><p class="h h2" style="${st(hf, hw(hf))}">Rubrik på<br>två rader</p><p class="muted" style="margin:10px 0 16px">${SHORT}</p><span class="sb" style="${st(bf, bf === hf && SERIF.includes(hf) ? hw(hf) : 600)}">Boka tid</span></div>`;
  groups.push({
    key: 'knapp-meny', title: 'Knapp- och menytext',
    questions: [
      ...BTN_ROUNDS.map((fams, i) => Q(`knapp-${pad2(i)}`,
        `Knapptext, omgång ${i + 1} av ${BTN_ROUNDS.length}: vilket typsnitt passar bäst i knappar?`,
        fontOpts(fams, n => btns(n)))),
      ...MENU_ROUNDS.map((fams, i) => Q(`meny-${pad2(i)}`,
        `Menytext, omgång ${i + 1} av ${MENU_ROUNDS.length}: vilket typsnitt passar bäst i menyn?`,
        fontOpts(fams, n => menu(n)))),
      Q('knapp-serifrubrik', 'Rubriken är serif. Vilket typsnitt ska knappen ha?', [
        opt('Knapp i brödtextens sans (Inter)', btnCtx('Fraunces', 'Inter')),
        opt('Knapp i rubrikens serif (Fraunces)', btnCtx('Fraunces', 'Fraunces')),
      ]),
      Q('knapp-sansrubrik', 'Rubriken har ett eget sans-typsnitt. Vilket ska knappen ha?', [
        opt('Knapp i brödtextens typsnitt (Inter)', btnCtx('Space Grotesk', 'Inter')),
        opt('Knapp i rubrikens typsnitt (Space Grotesk)', btnCtx('Space Grotesk', 'Space Grotesk')),
      ]),
    ],
  });

  // =====================================================================
  // Typsnitt som delen laddar
  // =====================================================================
  const FONTS = [
    'Inter:wght@400..800', 'DM Sans:wght@400..800', 'Manrope:wght@400..800', 'Figtree:wght@400..800',
    'Plus Jakarta Sans:wght@400..800', 'Work Sans:wght@400..800', 'IBM Plex Sans:wght@400..700', 'Space Grotesk:wght@400..700',
    'Sora:wght@400..800', 'Outfit:wght@400..800', 'Archivo:wdth,wght@62..125,400..800', 'Montserrat:wght@400..800',
    'Hanken Grotesk:wght@400..800', 'Instrument Sans:wdth,wght@75..100,400..700', 'Schibsted Grotesk:wght@400..800', 'Onest:wght@400..800',
    'Bricolage Grotesque:opsz,wdth,wght@12..96,75..100,400..800', 'Geist:wght@400..800', 'Public Sans:wght@400..800', 'Rubik:wght@400..800',
    'Lexend:wght@400..800', 'Poppins:wght@400;500;600;700;800', 'Raleway:wght@400..800', 'Nunito Sans:wght@400..800',
    'Open Sans:wght@400..800', 'Roboto:wdth,wght@75..100,400..800', 'Lato:wght@400;700;900', 'Source Sans 3:wght@400..800',
    'Albert Sans:wght@400..800', 'Urbanist:wght@400..800', 'Red Hat Display:wght@400..800', 'Epilogue:wght@400..800',
    'Syne:wght@400..800', 'Unbounded:wght@400..800',
    'Fraunces:opsz,wght@9..144,400..800', 'Playfair Display:wght@400..800', 'Lora:wght@400..700', 'Source Serif 4:opsz,wght@8..60,400..800',
    'DM Serif Display', 'Instrument Serif', 'Newsreader:opsz,wght@6..72,400..700', 'Libre Caslon Text:wght@400;700',
    'EB Garamond:wght@400..800', 'Cormorant:wght@400..700',
    'JetBrains Mono:wght@400..700', 'IBM Plex Mono:wght@400;500;600', 'DM Mono:wght@400;500', 'Geist Mono:wght@400..600',
  ];

  window.QZ.part({ key: 'typsnitt', fonts: FONTS, groups });
})();
