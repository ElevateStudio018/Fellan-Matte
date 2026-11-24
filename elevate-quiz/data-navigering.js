/* Elevate designquiz: Navigering och menyer (nyckel navigering, prefix na-).
   Frågorna byggs med små generatorer. Varje alternativ får en unik klass (nv…)
   för sin egen CSS, och en gemensam grundstil med prefixet .nvb som är lika i alla alternativ. */
(function () {
  const NAV = ['Tjänster', 'Priser', 'Om oss', 'Kontakt'];
  let N = 0;
  const uid = () => 'nv' + (++N).toString(36);

  // ---------- Ikoner ----------
  const P = {
    menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
    menu2: '<path d="M4 9h16M4 15h16"/>',
    menuS: '<path d="M4 6h16M4 12h16M4 18h10"/>',
    x: '<path d="M6 6l12 12M18 6L6 18"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/>',
    phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
    chevD: '<path d="M6 9l6 6 6-6"/>',
    chevU: '<path d="M6 15l6-6 6 6"/>',
    chevR: '<path d="M9 6l6 6-6 6"/>',
    chevL: '<path d="M15 6l-6 6 6 6"/>',
    arrowR: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    arrowL: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
    arrowU: '<path d="M12 19V5M6 11l6-6 6 6"/>',
    home: '<path d="M4 11l8-7 8 7v9a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1z"/>',
    cal: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
    pin: '<path d="M12 21s-7-6.5-7-12a7 7 0 0 1 14 0c0 5.5-7 12-7 12z"/><circle cx="12" cy="9" r="2.5"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    grid: '<rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/>',
    tag: '<path d="M3 12V4h8l10 10-8 8z"/><circle cx="7.5" cy="8.5" r="1.5"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.5"/>',
    chat: '<path d="M4 5h16v11H9l-5 4z"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    minus: '<path d="M5 12h14"/>',
    camera: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5v.01"/>',
    play: '<rect x="2" y="5" width="20" height="14" rx="4"/><path d="M10 9l5 3-5 3z"/>',
    bubble: '<path d="M21 12a8 8 0 0 1-11.5 7.2L4 20l1-4.5A8 8 0 1 1 21 12z"/>',
    link: '<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>',
    star: '<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>',
    doc: '<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 16h6"/>',
    filter: '<path d="M4 6h16M7 12h10M10 18h4"/>',
    bag: '<path d="M5 8h14l-1 13H6z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>'
  };
  const ic = (k, s = 20, sw = 2, st = '') => `<svg class="ico" style="width:${s}px;height:${s}px${st ? ';' + st : ''}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[k]}</svg>`;
  const caret = (s = 12) => `<svg class="ico" style="width:${s}px;height:${s}px" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9h12l-6 7z" fill="currentColor"/></svg>`;
  const cursor = (st) => `<svg class="nvb-cur" style="${st}" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 3l13 8.5-5.6 1.2L10 18.5z" fill="#111" stroke="#fff" stroke-width="1.4" stroke-linejoin="round"/></svg>`;

  // ---------- Grundstil (lika i alla alternativ) ----------
  const BASE = `.nvb{container-type:inline-size;background:var(--ground);min-width:0;width:100%;text-align:left;position:relative}
.nvb a{color:inherit;text-decoration:none;cursor:default}
.nvb-h{display:flex;align-items:center;flex-wrap:wrap;gap:10px 28px;min-height:var(--hh,72px);padding:0 var(--hp,32px);background:var(--hbg,#fff);color:var(--hc,var(--sink));border-bottom:var(--hbd,1px solid var(--sline));box-shadow:var(--hsh,none);position:relative;z-index:3}
.nvb-logo{font-family:var(--fh);font-weight:800;font-size:var(--ls,20px);letter-spacing:-.02em;line-height:1;white-space:nowrap}
.nvb-m{display:flex;align-items:center;flex-wrap:wrap;gap:6px var(--mg,28px);font-size:var(--ms,15px);font-weight:var(--mw,500);color:var(--mc,inherit);min-width:0}
.nvb-m a{white-space:nowrap;position:relative;display:inline-flex;align-items:center;gap:4px}
.nvb-sp{flex:1 1 0;min-width:0}
.nvb-r{display:flex;align-items:center;gap:var(--rg,16px);flex-wrap:wrap;min-width:0}
.nvb-cta{height:var(--ch,40px);padding:0 18px;font-size:14px}
.nvb-lc,.nvb-cl{display:grid;grid-template-columns:1fr auto 1fr}
.nvb-lc>.nvb-r,.nvb-cl>.nvb-r{justify-self:end}.nvb-lc>.nvb-l,.nvb-cl>.nvb-l{justify-self:start}
.nvb-cl>.nvb-logo{justify-self:center}
.nvb-ul{flex-direction:column;align-items:stretch;gap:0;padding:0}
.nvb-ur{display:flex;align-items:center;gap:16px;min-height:var(--hh,72px);padding:0 var(--hp,32px);flex-wrap:wrap}
.nvb-un{display:flex;align-items:center;min-height:48px;padding:0 var(--hp,32px)}
.nvb-pg{padding:22px var(--hp,32px) 26px;display:flex;flex-direction:column;gap:6px}
.nvb-pg .h{font-size:24px}
.nvb-btn{display:inline-flex;align-items:center;justify-content:center;gap:6px;color:inherit;white-space:nowrap}
.nvb-cur{position:absolute;width:18px;height:18px;z-index:9;pointer-events:none}
.nvb-hero{position:relative;min-height:280px;display:flex;flex-direction:column;justify-content:flex-end;color:#fff}
.nvb-hero>.nvb-bg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;max-width:none}
.nvb-hero>.nvb-sh{position:absolute;inset:0;background:linear-gradient(0deg,rgba(0,0,0,.45),rgba(0,0,0,.05) 60%)}
.nvb-hero>.nvb-h{position:absolute;top:0;left:0;right:0}
.nvb-ht{position:relative;padding:28px var(--hp,32px)}
.nvb-ht .h{color:#fff;font-size:30px}
.nvb-ph{width:100%;max-width:228px;margin:16px auto;border:7px solid #1F2124;border-radius:30px;overflow:hidden;background:var(--ground);aspect-ratio:9/15.5;display:flex;flex-direction:column;position:relative;font-size:14px;container-type:normal}
.nvb-mh{display:flex;align-items:center;gap:10px;height:var(--mhh,56px);padding:0 14px;background:#fff;border-bottom:1px solid var(--sline);flex:0 0 auto;position:relative;z-index:2;color:var(--sink)}
.nvb-mh .nvb-logo{font-size:17px}.nvb-msp{flex:1 1 0;min-width:0}
.nvb-mb{flex:1;padding:18px 14px;display:flex;flex-direction:column;gap:9px;min-height:0}
.nvb-mb i{display:block;height:8px;border-radius:4px;background:#DCDEE1}
.nvb-mb .h{font-size:19px}
.nvb-two{display:grid;grid-template-columns:1fr 1fr;gap:16px;padding:16px}
.nvb-fr{border:1px solid var(--sline);border-radius:10px;overflow:hidden;background:#fff;min-width:0;display:flex;flex-direction:column}
.nvb-cap{font-size:12px;font-weight:600;color:var(--smuted);padding:0 2px 6px}
@container (max-width:680px){.nvb-h{padding:10px 16px;gap:10px 18px}.nvb-lc,.nvb-cl{display:flex}.nvb-m{order:9;flex-basis:100%}.nvb-sp{display:none}.nvb-r{margin-left:auto}.nvb-l{margin-left:0}.nvb-cl>.nvb-logo{order:-1}.nvb-cl>.nvb-l{order:2;flex-basis:100%}.nvb-cl .nvb-m{order:0;flex-basis:auto}.nvb-pg,.nvb-ht{padding-inline:16px}.nvb-ur,.nvb-un{padding-inline:16px}.nvb-ul{padding:0}.nvb-two{grid-template-columns:1fr}}`;

  // Ett alternativ: unik klass, egen CSS där & byts mot klassen.
  const opt = (inner, css = '', vars = '', cls = '') => {
    const u = uid();
    return `<style>${BASE}${css.replace(/&/g, '.' + u)}</style><div class="nvb ${u}${cls ? ' ' + cls : ''}"${vars ? ` style="${vars}"` : ''}>${inner}</div>`;
  };

  const LOGO = '<span class="nvb-logo">Företaget</span>';
  const CTA = '<span class="sb nvb-cta">Boka tid</span>';
  const PAGE = '<div class="nvb-pg"><p class="h">Rubrik på sidan</p><p class="muted">Kort text som visar var sidan börjar.</p></div>';
  const menu = (o = {}) => {
    const items = o.items || NAV;
    return `<nav class="nvb-m${o.mcls ? ' ' + o.mcls : ''}">${items.map((t, i) => `<a${i === o.on ? ' class="on"' : ''}>${o.pre ? o.pre(i) : ''}${t}${o.post ? o.post(i) : ''}</a>`).join('')}</nav>`;
  };

  // Header i full bredd. o.lay: lr, ll, lc, cl, ul, ulc. o.cta (false = ingen), o.extra före knappen.
  const head = (o = {}) => {
    const nav = o.nav !== undefined ? o.nav : menu(o);
    const logo = o.logo || LOGO;
    const cta = o.cta === false ? '' : (o.cta || CTA);
    const right = (o.extra || '') + cta;
    const R = right ? `<div class="nvb-r">${right}</div>` : '';
    const lay = o.lay || 'lr';
    let inner;
    if (lay === 'lr') inner = `${o.left || ''}${logo}<span class="nvb-sp"></span>${nav}${R}`;
    else if (lay === 'll') inner = `${logo}${nav}<span class="nvb-sp"></span>${R}`;
    else if (lay === 'lc') inner = `<div class="nvb-r nvb-l">${o.left || ''}${logo}</div>${nav}${R || '<span></span>'}`;
    else if (lay === 'cl') {
      const items = o.items || NAV;
      inner = `<div class="nvb-r nvb-l">${o.left !== undefined ? o.left : menu({ ...o, items: items.slice(0, 2) })}</div>${logo}<div class="nvb-r">${o.rightNav !== undefined ? o.rightNav : menu({ ...o, items: items.slice(2), on: o.on !== undefined ? o.on - 2 : undefined })}${right}</div>`;
    } else if (lay === 'ul' || lay === 'ulc') {
      const c = lay === 'ulc';
      inner = `<div class="nvb-ur" style="${c ? 'justify-content:center;position:relative' : ''}">${logo}${c ? '' : '<span class="nvb-sp"></span>'}${R && !c ? R : ''}</div><div class="nvb-un"${o.unStyle || c ? ` style="${c ? 'justify-content:center;' : ''}${o.unStyle || ''}"` : ''}>${nav}</div>`;
    }
    return `${o.top || ''}<header class="nvb-h nvb-${lay === 'ulc' ? 'ul' : lay}"${o.hstyle ? ` style="${o.hstyle}"` : ''}>${inner}</header>`;
  };
  // Header + sida
  const H = (o = {}) => opt(head(o) + (o.page === false ? '' : (o.page || PAGE)), o.css || '', o.vars || '', o.cls || '');
  // Header ovanpå foto
  const HERO = (o = {}, img = 'stadsgata', alt = 'Gata i en stad') =>
    `<div class="nvb-hero"><img class="nvb-bg" src="img/${img}.jpg" alt="${alt}">${o.noShade ? '' : '<div class="nvb-sh"></div>'}${o.over ? head(o) : ''}<div class="nvb-ht"><p class="h">Rubrik på sidan</p></div></div>`;

  // ---------- Mobil ----------
  const burger = (k = 'menu', s = 24, sw = 2) => `<span class="nvb-btn">${ic(k, s, sw)}</span>`;
  const mhead = (o = {}) => {
    const btn = o.btn !== undefined ? o.btn : burger();
    const left = o.leftBtn ? btn : '';
    const right = o.leftBtn ? (o.right || '') : `${o.right || ''}${btn}`;
    return `<div class="nvb-mh"${o.mstyle ? ` style="${o.mstyle}"` : ''}>${left}${o.logo || LOGO}<span class="nvb-msp"></span>${right}</div>`;
  };
  const MBODY = '<div class="nvb-mb"><p class="h">Rubrik på sidan</p><i style="width:92%"></i><i style="width:80%"></i><i style="width:86%"></i><i style="width:40%;height:34px;border-radius:8px;margin-top:6px;background:#C9CDD2"></i></div>';
  const phone = (inner, css = '', vars = '') => opt(`<div class="nvb-ph">${inner}</div>`, css, vars);
  const M = (o = {}) => phone(mhead(o) + (o.body || MBODY), o.css || '', o.vars || '');

  // ---------- Frågor ----------
  const G = [];
  let cur;
  const group = (key, title) => { cur = { key, title, questions: [] }; G.push(cur); };
  const q = (id, text, layout, opts) => cur.questions.push({ id: 'na-' + id, q: text, layout, opts: opts.map(([l, h]) => (h ? { l, h } : { l })) });
  const S = 'stack', GR = 'grid';
  const wbtn = '<span class="sb nvb-cta" style="background:#fff;border-color:#fff;color:var(--brand)">Boka tid</span>';

  /* ===== Header: layout ===== */
  group('header-layout', 'Header: layout');
  q('hl-layout', 'Hur ska headern vara uppbyggd?', S, [
    ['Logo vänster, meny höger', H({ lay: 'lr' })],
    ['Logo och meny vänster, knapp höger', H({ lay: 'll', vars: '--mg:28px' })],
    ['Logo vänster, meny i mitten', H({ lay: 'lc' })],
    ['Logo i mitten, meny på båda sidor', H({ lay: 'cl' })],
    ['Meny på egen rad under logon', H({ lay: 'ul' })]
  ]);
  q('hl-mittlogo', 'Om logon står i mitten, hur ska resten fördelas?', S, [
    ['Menyn delad på båda sidor', H({ lay: 'cl' })],
    ['Meny vänster, knapp höger', H({ lay: 'cl', left: menu(), rightNav: '' })],
    ['Menyknapp vänster, knapp höger', H({ lay: 'cl', left: `<span class="nvb-btn" style="font-weight:600;font-size:15px">${ic('menu', 22)}Meny</span>`, rightNav: '' })]
  ]);
  q('hl-under', 'Om menyn ligger på en egen rad, hur ska den ställas?', S, [
    ['Logo och meny vänsterställda', H({ lay: 'ul', unStyle: 'border-top:1px solid var(--sline)' })],
    ['Logo och meny centrerade', H({ lay: 'ulc', cta: false, unStyle: 'border-top:1px solid var(--sline)' })]
  ]);
  q('hl-under-rad', 'Hur ska menyraden under logon skiljas av?', S, [
    ['Ingen avgränsning', H({ lay: 'ul' })],
    ['Tunn linje mellan raderna', H({ lay: 'ul', unStyle: 'border-top:1px solid var(--sline)' })],
    ['Menyraden på ljusgrå yta', H({ lay: 'ul', unStyle: 'background:var(--ground);border-top:1px solid var(--sline)' })]
  ]);
  q('hl-marginal', 'Hur långt in från kanten ska headerns innehåll börja?', S, [
    ['16 px från kanten', H({ vars: '--hp:16px' })],
    ['40 px från kanten', H({ vars: '--hp:40px' })],
    ['Samma bredd som innehållet (max 960 px)', H({ css: '& .nvb-h,& .nvb-pg{padding-inline:max(16px,calc((100% - 960px) / 2))}' })]
  ]);
  q('hl-logostorlek', 'Hur stor ska ordlogon vara i headern?', S, [
    ['18 px', H({ vars: '--ls:18px' })],
    ['22 px', H({ vars: '--ls:22px' })],
    ['26 px', H({ vars: '--ls:26px' })]
  ]);
  q('hl-logoavstand', 'Hur stort avstånd ska det vara mellan logo och meny när båda står till vänster?', S, [
    ['32 px', H({ lay: 'll', hstyle: 'column-gap:32px' })],
    ['48 px', H({ lay: 'll', hstyle: 'column-gap:48px' })],
    ['72 px', H({ lay: 'll', hstyle: 'column-gap:72px' })]
  ]);

  /* ===== Header: höjd ===== */
  group('header-hojd', 'Header: höjd');
  q('hh-hojd', 'Hur hög ska headern vara på dator?', S, [56, 64, 72, 80, 96].map(h => [`${h} px hög`, H({ vars: `--hh:${h}px` })]));
  q('hh-mobil', 'Hur hög ska headern vara i mobilen?', GR, [48, 56, 64, 72].map(h => [`${h} px hög`, M({ vars: `--mhh:${h}px` })]));

  /* ===== Header: bakgrund ===== */
  group('header-bakgrund', 'Header: bakgrund');
  q('hb-ton', 'Vilken bakgrund ska headern ha?', S, [
    ['Vit', H({})],
    ['Samma ljusgrå som sidan', H({ vars: '--hbg:var(--ground)' })],
    ['Färgad (huvudfärgen)', H({ vars: '--hbg:var(--brand);--hc:#fff;--hbd:0', cta: wbtn })],
    ['Mörk', H({ vars: '--hbg:var(--sink);--hc:#fff;--hbd:0', cta: wbtn })]
  ]);
  q('hb-bild', 'Hur ska headern se ut när sidan börjar med en stor bild?', S, [
    ['Genomskinlig med vit text', opt(HERO({ over: true }), '', '--hbg:transparent;--hc:#fff;--hbd:0')],
    ['Vit header ovanför bilden', opt(head({}) + HERO({}))],
    ['Halvgenomskinlig mörk platta', opt(HERO({ over: true }), '', '--hbg:rgba(20,22,24,.55);--hc:#fff;--hbd:0')],
    ['Frostat glas med mörk text', opt(HERO({ over: true }), '& .nvb-h{backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px)}', '--hbg:rgba(255,255,255,.72);--hbd:0')]
  ]);
  q('hb-toning', 'Ska en genomskinlig header över bild ha en mörk toning bakom sig?', S, [
    ['Ingen extra toning', opt(HERO({ over: true }), '', '--hbg:transparent;--hc:#fff;--hbd:0')],
    ['Mörk toning uppifrån', opt(HERO({ over: true }), '', '--hbg:linear-gradient(180deg,rgba(0,0,0,.5),rgba(0,0,0,0));--hc:#fff;--hbd:0')]
  ]);
  q('hb-fargknapp', 'Vilken knapp ska sitta i en färgad header?', S, [
    ['Vit fylld knapp', H({ vars: '--hbg:var(--brand);--hc:#fff;--hbd:0', cta: wbtn })],
    ['Vit konturknapp', H({ vars: '--hbg:var(--brand);--hc:#fff;--hbd:0', cta: '<span class="sb2 nvb-cta" style="border-color:#fff;color:#fff">Boka tid</span>' })],
    ['Mörk fylld knapp', H({ vars: '--hbg:var(--brand);--hc:#fff;--hbd:0', cta: '<span class="sb nvb-cta" style="background:var(--sink);border-color:var(--sink)">Boka tid</span>' })]
  ]);
  q('hb-fargmeny', 'Hur ska menytexten se ut i en färgad header?', S, [
    ['Helvit på alla menyval', H({ vars: '--hbg:var(--brand);--hc:#fff;--hbd:0', cta: wbtn, on: 0 })],
    ['Svagare vit, aktiv sida helvit', H({ vars: '--hbg:var(--brand);--hc:#fff;--hbd:0', cta: wbtn, on: 0, css: '& .nvb-m a{color:rgba(255,255,255,.72)}& .nvb-m a.on{color:#fff}' })]
  ]);

  /* ===== Header: avgränsning ===== */
  group('header-avgransning', 'Header: avgränsning');
  const W = '--ground:#fff;';
  q('ha-typ', 'Hur ska headern skiljas från sidan under?', S, [
    ['Tunn linje', H({ vars: W })],
    ['Mjuk skugga', H({ vars: W + '--hbd:0;--hsh:0 4px 16px rgba(20,22,24,.08)' })],
    ['Ingen avgränsning', H({ vars: W + '--hbd:0' })],
    ['Linje och skugga', H({ vars: W + '--hsh:0 4px 16px rgba(20,22,24,.06)' })]
  ]);
  q('ha-linje', 'Hur stark ska linjen under headern vara?', S, [
    ['Mycket ljus linje', H({ vars: W + '--hbd:1px solid rgba(26,28,30,.07)' })],
    ['Ljusgrå linje', H({ vars: W + '--hbd:1px solid rgba(26,28,30,.16)' })],
    ['Mörkare grå linje', H({ vars: W + '--hbd:1px solid rgba(26,28,30,.32)' })]
  ]);
  q('ha-skugga', 'Hur tydlig ska skuggan under headern vara?', S, [
    ['Knappt synlig', H({ vars: W + '--hbd:0;--hsh:0 1px 4px rgba(20,22,24,.06)' })],
    ['Mjuk', H({ vars: W + '--hbd:0;--hsh:0 4px 16px rgba(20,22,24,.09)' })],
    ['Tydlig', H({ vars: W + '--hbd:0;--hsh:0 6px 22px rgba(20,22,24,.18)' })]
  ]);
  q('ha-linjebredd', 'Hur bred ska linjen under headern vara?', S, [
    ['Kant till kant', H({ vars: W, css: '& .nvb-h,& .nvb-pg{padding-inline:max(16px,calc((100% - 960px) / 2))}' })],
    ['Bara lika bred som innehållet', H({ vars: W + '--hbd:0', css: '& .nvb-h,& .nvb-pg{padding-inline:max(16px,calc((100% - 960px) / 2))}& .nvb-h::after{content:"";position:absolute;bottom:0;height:1px;background:var(--sline);left:max(16px,calc((100% - 960px) / 2));right:max(16px,calc((100% - 960px) / 2))}' })]
  ]);
  const FRAMECSS = '& .nvb-h{--hp:16px;min-height:52px;column-gap:18px}& .nvb-logo{font-size:16px}& .nvb-m{font-size:13px;--mg:16px}& .nvb-cta{height:32px;padding:0 12px;font-size:12px}& .nvb-pg{padding:16px}& .nvb-pg .h{font-size:17px}& .nvb-sc{font-size:13px;color:var(--smuted);padding:12px 16px}@container (max-width:680px){& .nvb-m{display:none}}';
  const twoStates = (a, b) => `<div class="nvb-two"><div><p class="nvb-cap">Överst på sidan</p><div class="nvb-fr">${a}</div></div><div><p class="nvb-cap">Efter scroll</p><div class="nvb-fr">${b}</div></div></div>`;
  const SCR = '<div class="nvb-sc">… sidans innehåll har scrollat förbi …</div>';
  q('ha-scroll', 'När ska avgränsningen under headern synas?', S, [
    ['Alltid linje', opt(twoStates(head({ items: NAV.slice(0, 3) }) + PAGE, head({ items: NAV.slice(0, 3) }) + SCR), FRAMECSS, W)],
    ['Linje först efter scroll', opt(twoStates(head({ items: NAV.slice(0, 3), hstyle: 'border-bottom-color:transparent' }) + PAGE, head({ items: NAV.slice(0, 3) }) + SCR), FRAMECSS, W)],
    ['Skugga först efter scroll', opt(twoStates(head({ items: NAV.slice(0, 3), hstyle: 'border-bottom-color:transparent' }) + PAGE, head({ items: NAV.slice(0, 3), hstyle: 'border-bottom-color:transparent;box-shadow:0 4px 16px rgba(20,22,24,.1)' }) + SCR), FRAMECSS, W)]
  ]);

  /* ===== Header: knapp ===== */
  group('header-knapp', 'Header: knapp');
  q('hc-finns', 'Ska headern ha en knapp?', S, [
    ['Ingen knapp', H({ cta: false })],
    ['Fylld knapp', H({})],
    ['Textlänk med pil', H({ cta: `<span class="nvb-btn" style="color:var(--brand);font-weight:600;font-size:15px">Boka tid ${ic('arrowR', 18)}</span>` })]
  ]);
  q('hc-stil', 'Vilken stil ska knappen i headern ha?', S, [
    ['Fylld i huvudfärgen', H({})],
    ['Kontur', H({ cta: '<span class="sb2 nvb-cta">Boka tid</span>' })],
    ['Ljust tonad', H({ cta: '<span class="sb nvb-cta" style="background:var(--tint);border-color:var(--tint);color:var(--brand)">Boka tid</span>' })],
    ['Mörk fylld', H({ cta: '<span class="sb nvb-cta" style="background:var(--sink);border-color:var(--sink)">Boka tid</span>' })]
  ]);
  q('hc-storlek', 'Hur hög ska knappen i headern vara?', S, [36, 40, 44, 48].map(h => [`${h} px hög`, H({ vars: `--ch:${h}px` })]));
  q('hc-rundning', 'Hur rund ska knappen i headern vara?', S, [
    ['4 px rundning', H({ vars: '--rb:4px' })],
    ['8 px rundning', H({ vars: '--rb:8px' })],
    ['Helt rund (pill)', H({ vars: '--rb:999px' })]
  ]);
  q('hc-avstand', 'Hur mycket luft ska det vara mellan menyn och knappen?', S, [16, 32, 56].map(g => [`${g} px`, H({ css: `& .nvb-r{margin-left:${g - 28}px}` })]));
  q('hc-avdelare', 'Ska knappen skiljas från menyn med en avdelare?', S, [
    ['Ingen avdelare', H({})],
    ['Tunt lodstreck före knappen', H({ extra: '<span style="width:1px;height:24px;background:var(--sline)"></span>', vars: '--rg:24px' })]
  ]);
  q('hc-tva', 'Hur många handlingar ska stå till höger i headern?', S, [
    ['En knapp', H({})],
    ['Textlänk och knapp', H({ extra: '<span style="font-weight:600;font-size:15px">Logga in</span>' })],
    ['Konturknapp och fylld knapp', H({ extra: '<span class="sb2 nvb-cta">Logga in</span>', vars: '--rg:10px' })]
  ]);
  q('hc-pil', 'Ska knappen i headern ha en ikon?', S, [
    ['Bara text', H({})],
    ['Pil efter texten', H({ cta: `<span class="sb nvb-cta">Boka tid ${ic('arrowR', 16)}</span>` })],
    ['Ikon före texten', H({ cta: `<span class="sb nvb-cta">${ic('cal', 16)} Boka tid</span>` })]
  ]);
  q('hc-mobil', 'Ska knappen synas i mobilens header?', GR, [
    ['Bara menyknappen', M({})],
    ['Liten knapp bredvid menyknappen', M({ right: '<span class="sb" style="height:34px;padding:0 12px;font-size:13px">Boka tid</span>' })],
    ['Ikonknapp bredvid menyknappen', M({ right: `<span class="nvb-btn" style="width:36px;height:36px;border-radius:999px;background:var(--brand);color:#fff">${ic('phone', 17)}</span>` })]
  ]);

  /* ===== Header: telefon och ikoner ===== */
  group('header-ikoner', 'Header: telefon och ikoner');
  const TEL = '08-123 456 78';
  q('hi-telefon', 'Ska telefonnumret synas i headern?', S, [
    ['Inget telefonnummer', H({})],
    ['Nummer med ikon', H({ extra: `<span class="nvb-btn" style="font-weight:600;font-size:15px">${ic('phone', 17)}${TEL}</span>` })],
    ['Bara telefonikon', H({ extra: `<span class="nvb-btn">${ic('phone', 20)}</span>` })],
    ['Nummer i ett fält ovanför', H({ top: `<div style="background:var(--ground);border-bottom:1px solid var(--sline);font-size:13px;display:flex;justify-content:flex-end;align-items:center;gap:6px;min-height:34px;padding:0 var(--hp,32px)">${ic('phone', 14)}${TEL}</div>` })]
  ]);
  q('hi-telstil', 'Hur ska telefonnumret i headern se ut?', S, [
    ['Vanlig text med ikon', H({ extra: `<span class="nvb-btn" style="font-size:15px">${ic('phone', 17)}${TEL}</span>` })],
    ['Fet text med ikon', H({ extra: `<span class="nvb-btn" style="font-size:15px;font-weight:700">${ic('phone', 17)}${TEL}</span>` })],
    ['Två rader: "Ring oss" över numret', H({ extra: `<span style="display:flex;flex-direction:column;line-height:1.2"><span class="small muted">Ring oss</span><b style="font-size:15px">${TEL}</b></span>` })],
    ['Som konturknapp', H({ extra: `<span class="sb2 nvb-cta">${ic('phone', 16)}${TEL}</span>`, vars: '--rg:10px' })]
  ]);
  const IC2 = (f) => f('search', 'Sök') + f('user', 'Konto');
  q('hi-ikontext', 'Ska ikonerna i headern ha text?', S, [
    ['Bara ikoner', H({ extra: IC2((k) => `<span class="nvb-btn">${ic(k, 20)}</span>`) })],
    ['Text under ikonen', H({ extra: IC2((k, t) => `<span class="nvb-btn" style="flex-direction:column;gap:2px;font-size:11px;font-weight:500">${ic(k, 20)}${t}</span>`) })],
    ['Text bredvid ikonen', H({ extra: IC2((k, t) => `<span class="nvb-btn" style="font-size:14px;font-weight:500">${ic(k, 18)}${t}</span>`) })]
  ]);
  q('hi-ikonstorlek', 'Hur stora ska ikonerna i headern vara?', S, [18, 20, 24].map(s => [`${s} px`, H({ extra: IC2((k) => `<span class="nvb-btn">${ic(k, s)}</span>`) })]));
  q('hi-ikonplatta', 'Ska ikonerna i headern ligga på en platta?', S, [
    ['Fri ikon', H({ extra: IC2((k) => `<span class="nvb-btn" style="width:40px;height:40px">${ic(k, 20)}</span>`), vars: '--rg:6px' })],
    ['Rund ljus platta', H({ extra: IC2((k) => `<span class="nvb-btn" style="width:40px;height:40px;border-radius:999px;background:var(--tint)">${ic(k, 20)}</span>`), vars: '--rg:8px' })],
    ['Rund kontur', H({ extra: IC2((k) => `<span class="nvb-btn" style="width:40px;height:40px;border-radius:999px;border:1px solid var(--sline)">${ic(k, 20)}</span>`), vars: '--rg:8px' })]
  ]);
  q('hi-sprak', 'Hur ska språkvalet se ut i headern?', S, [
    ['Inget språkval', H({})],
    ['"SV" med liten pil', H({ extra: `<span class="nvb-btn" style="font-weight:600;font-size:14px;gap:2px">SV${ic('chevD', 16)}</span>` })],
    ['Jordglob och SV', H({ extra: `<span class="nvb-btn" style="font-weight:600;font-size:14px">${ic('globe', 18)}SV</span>` })],
    ['"SV | EN" bredvid varandra', H({ extra: '<span style="font-size:14px;display:inline-flex;gap:6px"><b>SV</b><span class="muted">|</span><span class="muted">EN</span></span>' })]
  ]);

  /* ===== Menytext ===== */
  group('menytext', 'Menytext');
  q('mt-storlek', 'Hur stor ska menytexten vara?', S, [14, 15, 16, 17].map(s => [`${s} px`, H({ vars: `--ms:${s}px` })]));
  q('mt-vikt', 'Hur tung ska menytexten vara?', S, [[400, 'Normal (400)'], [500, 'Medium (500)'], [600, 'Halvfet (600)'], [700, 'Fet (700)']].map(([w, l]) => [l, H({ vars: `--mw:${w}` })]));
  q('mt-avstand', 'Hur stort avstånd ska det vara mellan menyvalen?', S, [20, 28, 36, 48].map(g => [`${g} px mellan`, H({ vars: `--mg:${g}px` })]));
  q('mt-versaler', 'Ska menytexten skrivas med versaler?', S, [
    ['Vanlig text', H({})],
    ['Versaler, 13 px, spärrade', H({ css: '& .nvb-m{text-transform:uppercase;font-size:13px;letter-spacing:.08em;font-weight:600}' })],
    ['Versaler, 15 px, lätt spärrade', H({ css: '& .nvb-m{text-transform:uppercase;letter-spacing:.04em}' })]
  ]);
  q('mt-farg', 'Vilken färg ska menytexten ha?', S, [
    ['Samma som brödtexten', H({})],
    ['Mörkgrå', H({ vars: '--mc:var(--smuted)' })],
    ['Huvudfärgen', H({ vars: '--mc:var(--brand)' })]
  ]);
  q('mt-avdelare', 'Ska det finnas avdelare mellan menyvalen?', S, [
    ['Inga avdelare', H({})],
    ['Tunna lodstreck', H({ css: '& .nvb-m a+a::before{content:"";position:absolute;left:-14px;top:50%;height:16px;margin-top:-8px;width:1px;background:var(--sline)}' })],
    ['Små prickar', H({ css: '& .nvb-m a+a::before{content:"";position:absolute;left:-16px;top:50%;width:4px;height:4px;margin-top:-2px;border-radius:50%;background:var(--smuted)}' })]
  ]);
  q('mt-ikoner', 'Ska menyvalen ha ikoner?', S, [
    ['Bara text', H({})],
    ['Liten ikon före texten', H({ pre: (i) => ic(['grid', 'tag', 'info', 'chat'][i], 17), vars: '--mg:28px', css: '& .nvb-m a{gap:7px}' })]
  ]);

  /*SLUT*/
  window.QZ.part({ key: 'navigering', groups: G });
})();
