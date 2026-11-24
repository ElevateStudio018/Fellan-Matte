/* Elevate designquiz – del: Ikoner och symboler (nyckel symboler, id-prefix sy-).
   Alla ikoner ritas här som egen inline-SVG i ett 24-rutnät. Generatorn I() ritar
   samma ikon i olika stilar (linje, fylld, duotone, tvåfärgad, platt) så att bara
   den egenskap som frågan gäller skiljer mellan alternativen. */
(function () {
  'use strict';

  // ---------- Geometri ----------
  const r2 = n => Math.round(n * 100) / 100;
  const pt = (a, r, cx = 12, cy = 12) => { const t = a * Math.PI / 180; return r2(cx + r * Math.cos(t)) + ' ' + r2(cy + r * Math.sin(t)); };
  function gear(teeth = 8, ro = 10, ri = 7.3, tw = 8.5, bw = 13.5) {
    const step = 360 / teeth; let d = '';
    for (let i = 0; i < teeth; i++) {
      const a = i * step - 90;
      d += (i ? 'L' : 'M') + pt(a - bw, ri) + 'L' + pt(a - tw, ro) + 'L' + pt(a + tw, ro) + 'L' + pt(a + bw, ri) + 'A' + ri + ' ' + ri + ' 0 0 1 ' + pt(a + step - bw, ri);
    }
    return d + 'Z';
  }
  const STAR = []; for (let i = 0; i < 10; i++) STAR.push(pt(-90 + i * 36, i % 2 ? 4.1 : 9.6, 12, 12.7));
  function hgear() {
    let d = '', k = 0; const step = 45;
    const j = () => r2(Math.sin(++k * 12.9898) * 0.55);
    const q = (a, r) => { const t = a * Math.PI / 180; return r2(12 + r * Math.cos(t) + j()) + ' ' + r2(12 + r * Math.sin(t) + j()); };
    for (let i = 0; i < 8; i++) { const a = i * step - 90; d += (i ? 'L' : 'M') + q(a - 13.5, 7.3) + 'L' + q(a - 8.5, 10) + 'L' + q(a + 8.5, 10) + 'L' + q(a + 13.5, 7.3) + 'L' + q(a + 22.5, 7.1); }
    return d + 'Z';
  }
  const starAll = STAR.join(' ');
  const starHalf = [0, 9, 8, 7, 6, 5].map(i => STAR[i]).join(' ');

  // ---------- Ikoner ----------
  // Varje del: "<typ>[*]|<element utan slut>".
  // f = huvudform (linje, eller fylld i fyllda stilar), F = bara i fyllda stilar, L = bara i linjestilar,
  // k = detalj inuti formen (blir utskuren i fylld stil), K = utskuren yta, n = fristående linje,
  // d = punkt inuti formen, e = fristående punkt. * = accentdel i tvåfärgad stil.
  const HEART = 'M12 20s-7.5-4.6-9.2-9.3C1.7 7.6 3.6 4.5 7 4.5c2 0 3.6 1.1 5 3 1.4-1.9 3-3 5-3 3.4 0 5.3 3.1 4.2 6.2C19.5 15.4 12 20 12 20z';
  const PIN = 'M12 21.5s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12z';
  const BUBBLE = 'M21 12a8.5 8.5 0 0 1-12.4 7.6L3 21l1.7-5.6A8.5 8.5 0 1 1 21 12z';
  const TRI = 'M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z';
  const EYE = 'M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z';
  const PHONE = 'M5 3.5h3.2l1.6 4.5-2.2 1.5a11 11 0 0 0 6.9 6.9l1.5-2.2 4.5 1.6V19a2 2 0 0 1-2 2A17 17 0 0 1 3 5.5a2 2 0 0 1 2-2z';
  const TRAY = 'M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2';
  const CLOUD = 'M7 19a5 5 0 0 1-.9-9.9A6.5 6.5 0 0 1 18.6 9.6 4.7 4.7 0 0 1 17.5 19z';
  const C95 = 'circle cx="12" cy="12" r="9.5"';
  const ICONS = {
    home: ['f|path d="M9 21H3V10l9-7 9 7v11h-6"', 'K*|path d="M9 21v-6h6v6"'],
    'home-plain': ['f|path d="M3 10 12 3l9 7v11H3z"'],
    'home-chimney': ['f|path d="M9 21H3V10l9-7 4 3.1V4h3v4.4l2 1.6v11h-6"', 'K*|path d="M9 21v-6h6v6"'],
    'home-roof': ['n*|path d="M2 11 12 3l10 8"', 'f|path d="M5 9.4V21h14V9.4"'],
    search: ['n|circle cx="11" cy="11" r="7"', 'n*|path d="m20 20-4-4"'],
    'search-left': ['n|circle cx="13" cy="11" r="7"', 'n*|path d="m4 20 4-4"'],
    'search-long': ['n|circle cx="10" cy="10" r="6"', 'n*|path d="m21 21-6.8-6.8"'],
    'search-thick': ['n|circle cx="10.5" cy="10.5" r="7"', 'F*|path d="m15.6 14.2 5.6 5.6-1.4 1.4-5.6-5.6z"', 'L*|path d="m15.6 15.6 4.4 4.4"'],
    user: ['f*|circle cx="12" cy="8" r="4"', 'F|path d="M4 21a8 8 0 0 1 16 0z"', 'L|path d="M4 21a8 8 0 0 1 16 0"'],
    'user-circle': ['f|' + C95, 'k*|circle cx="12" cy="10" r="3.2"', 'k*|path d="M6.4 18.2a6.6 6.6 0 0 1 11.2 0"'],
    'user-bust': ['f|circle cx="12" cy="7.5" r="4.5"', 'f|path d="M3.5 21c0-4.7 3.8-7.5 8.5-7.5s8.5 2.8 8.5 7.5z"'],
    'user-square': ['f|rect x="3" y="3" width="18" height="18" rx="RX"', 'k*|circle cx="12" cy="10" r="3.2"', 'k*|path d="M6.5 20a6 6 0 0 1 11 0"'],
    heart: ['f|path d="' + HEART + '"'],
    'heart-round': ['f|path d="M12 20.5c-4.5-3-9.5-6.5-9.5-11A4.8 4.8 0 0 1 7.3 4.6c2 0 3.6 1.1 4.7 2.9 1.1-1.8 2.7-2.9 4.7-2.9a4.8 4.8 0 0 1 4.8 4.9c0 4.5-5 8-9.5 11z"'],
    'heart-sharp': ['f|path d="M12 21 3.3 12.3a4.9 4.9 0 0 1 7-7L12 7l1.7-1.7a4.9 4.9 0 0 1 7 7z"'],
    bell: ['f|path d="M6 9a6 6 0 0 1 12 0c0 6 2.5 8 2.5 8h-17S6 15 6 9z"', 'n*|path d="M10.2 20.5a2 2 0 0 0 3.6 0"'],
    mail: ['f|rect x="3" y="5" width="18" height="14" rx="RX"', 'k*|path d="m3.5 7 8.5 6 8.5-6"'],
    'mail-open': ['f|path d="M3 10v9a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-9l-9-6.5z"', 'k*|path d="m3.5 10.3 8.5 5.7 8.5-5.7"'],
    'mail-at': ['n|circle cx="12" cy="12" r="4"', 'n*|path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8"'],
    'mail-flap': ['f|rect x="3" y="5" width="18" height="14" rx="RX"', 'k*|path d="m3.5 6.5 8.5 7 8.5-7M3.8 18.3l6.4-5.4M20.2 18.3l-6.4-5.4"'],
    calendar: ['f|rect x="3" y="5" width="18" height="16" rx="RX"', 'n*|path d="M8 3v4M16 3v4"', 'k*|path d="M4 10h16"'],
    'calendar-dots': ['f|rect x="3" y="5" width="18" height="16" rx="RX"', 'n*|path d="M8 3v4M16 3v4"', 'k*|path d="M4 10h16"', 'd*|circle cx="8" cy="14" r="DR"', 'd*|circle cx="12" cy="14" r="DR"', 'd*|circle cx="16" cy="14" r="DR"', 'd*|circle cx="8" cy="17.5" r="DR"', 'd*|circle cx="12" cy="17.5" r="DR"'],
    'calendar-check': ['f|rect x="3" y="5" width="18" height="16" rx="RX"', 'n*|path d="M8 3v4M16 3v4"', 'k*|path d="M4 10h16M9 15.5l2 2 4-4"'],
    'calendar-plain': ['f|rect x="3" y="4" width="18" height="17" rx="RX"', 'k*|path d="M4 9.5h16"'],
    settings: ['f|path d="' + gear() + '"', 'k*|circle cx="12" cy="12" r="3"'],
    'settings-6': ['f|path d="' + gear(6, 10, 7.2, 10.5, 17) + '"', 'k*|circle cx="12" cy="12" r="3"'],
    sliders: ['n|path d="M4 7h9M18.5 7H20M4 17h2.5M12 17h8"', 'f*|circle cx="15.5" cy="7" r="2.5"', 'f*|circle cx="9" cy="17" r="2.5"'],
    'sliders-v': ['n|path d="M6 3v6M6 14v7M12 3v3M12 11v10M18 3v10M18 18v3"', 'f*|circle cx="6" cy="11.5" r="2.5"', 'f*|circle cx="12" cy="8.5" r="2.5"', 'f*|circle cx="18" cy="15.5" r="2.5"'],
    cart: ['n|path d="M2 3h2.6L7.4 16H19"', 'f|path d="M5.25 6H21l-1.6 7H6.75z"', 'f*|circle cx="9" cy="20" r="1.5"', 'f*|circle cx="17.5" cy="20" r="1.5"'],
    bag: ['f|path d="M5 8h14l1 13H4z"', 'n*|path d="M9 8V6a3 3 0 0 1 6 0v2"'],
    basket: ['f|path d="M3 10h18l-2 10H5z"', 'n*|path d="m7 10 3-6M17 10l-3-6"', 'k*|path d="M9.5 13.5v3M14.5 13.5v3"'],
    check: ['n|path d="M20 6 9 17l-5-5"'],
    'check-short': ['n|path d="m5 12.5 4.5 4.5L19 7.5"'],
    'check-circle': ['f|' + C95, 'k*|path d="m8 12.3 2.8 2.8 5.4-5.5"'],
    'check-square': ['f|rect x="3" y="3" width="18" height="18" rx="RX"', 'k*|path d="m8 12.3 2.8 2.8 5.4-5.5"'],
    x: ['n|path d="M18 6 6 18M6 6l12 12"'],
    'x-small': ['n|path d="M16 8l-8 8M8 8l8 8"'],
    'x-circle': ['f|' + C95, 'k*|path d="m15 9-6 6M9 9l6 6"'],
    'x-square': ['f|rect x="3" y="3" width="18" height="18" rx="RX"', 'k*|path d="m15 9-6 6M9 9l6 6"'],
    plus: ['n|path d="M12 5v14M5 12h14"'],
    minus: ['n|path d="M5 12h14"'],
    'plus-circle': ['f|' + C95, 'k*|path d="M12 8v8M8 12h8"'],
    'minus-circle': ['f|' + C95, 'k*|path d="M8 12h8"'],
    'plus-square': ['f|rect x="3.5" y="3.5" width="17" height="17" rx="RX"', 'k*|path d="M12 8v8M8 12h8"'],
    'minus-square': ['f|rect x="3.5" y="3.5" width="17" height="17" rx="RX"', 'k*|path d="M8 12h8"'],
    info: ['f|' + C95, 'k*|path d="M12 11v5.5"', 'd*|circle cx="12" cy="7.8" r="DR"'],
    'info-plain': ['n|path d="M10 10.5h2V19M9.5 19h5"', 'e*|circle cx="11.8" cy="5.8" r="DR"'],
    'info-square': ['f|rect x="3" y="3" width="18" height="18" rx="RX"', 'k*|path d="M12 11v5.5"', 'd*|circle cx="12" cy="7.8" r="DR"'],
    alert: ['f|path d="' + TRI + '"', 'k*|path d="M12 9v4.5"', 'd*|circle cx="12" cy="17" r="DR"'],
    'alert-circle': ['f|' + C95, 'k*|path d="M12 7.5v5.5"', 'd*|circle cx="12" cy="16.3" r="DR"'],
    'alert-diamond': ['f|path d="M10.6 2.6a2 2 0 0 1 2.8 0l8 8a2 2 0 0 1 0 2.8l-8 8a2 2 0 0 1-2.8 0l-8-8a2 2 0 0 1 0-2.8z"', 'k*|path d="M12 7.5v5.5"', 'd*|circle cx="12" cy="16.3" r="DR"'],
    octagon: ['f|path d="M8.1 2.5h7.8l5.6 5.6v7.8l-5.6 5.6H8.1l-5.6-5.6V8.1z"', 'k*|path d="m15 9-6 6M9 9l6 6"'],
    'octagon-alert': ['f|path d="M8.1 2.5h7.8l5.6 5.6v7.8l-5.6 5.6H8.1l-5.6-5.6V8.1z"', 'k*|path d="M12 7.5v5.5"', 'd*|circle cx="12" cy="16.3" r="DR"'],
    menu: ['n|path d="M4 6h16M4 12h16M4 18h16"'],
    'menu-2': ['n|path d="M4 9h16M4 15h16"'],
    'menu-short': ['n|path d="M4 6h16M4 12h16M4 18h10"'],
    'menu-right': ['n|path d="M4 6h16M10 12h10M7 18h13"'],
    'menu-dots': ['e|circle cx="5" cy="12" r="DL"', 'e|circle cx="12" cy="12" r="DL"', 'e|circle cx="19" cy="12" r="DL"'],
    'menu-grid': ['e|circle cx="6" cy="6" r="DL"', 'e|circle cx="12" cy="6" r="DL"', 'e|circle cx="18" cy="6" r="DL"', 'e|circle cx="6" cy="12" r="DL"', 'e|circle cx="12" cy="12" r="DL"', 'e|circle cx="18" cy="12" r="DL"', 'e|circle cx="6" cy="18" r="DL"', 'e|circle cx="12" cy="18" r="DL"', 'e|circle cx="18" cy="18" r="DL"'],
    pin: ['f|path d="' + PIN + '"', 'k*|circle cx="12" cy="9.5" r="2.6"'],
    'pin-plain': ['f|path d="' + PIN + '"'],
    'pin-dot': ['f|path d="' + PIN + '"', 'd*|circle cx="12" cy="9.5" r="2.3"'],
    'pin-round': ['f|circle cx="12" cy="9" r="6"', 'n*|path d="M12 15v7"', 'k*|circle cx="12" cy="9" r="2"'],
    phone: ['f|path d="' + PHONE + '"'],
    'phone-waves': ['f|path d="' + PHONE + '"', 'n*|path d="M14.5 3a6.5 6.5 0 0 1 6.5 6.5M14.5 6.5a3 3 0 0 1 3 3"'],
    mobile: ['f|rect x="6" y="2.5" width="12" height="19" rx="RX"', 'k*|path d="M11 18.5h2"'],
    'phone-circle': ['f|' + C95, 'K*|path d="M9 7.2h1.4l.8 2.2-1.1.8a5.6 5.6 0 0 0 3.3 3.3l.8-1.1 2.2.8V15a1 1 0 0 1-1 1A8 8 0 0 1 8 8.2a1 1 0 0 1 1-1z"'],
    clock: ['f|' + C95, 'k*|path d="M12 7v5l3.2 2"'],
    'clock-ticks': ['f|' + C95, 'k*|path d="M12 7.5V12l3 2"', 'k|path d="M12 3.8v.6M20.2 12h-.6M12 20.2v-.6M3.8 12h.6"'],
    'clock-plain': ['f|' + C95, 'k*|path d="M12 6.5V12h4"'],
    filter: ['f|path d="M3 4.5h18l-7 8.3V19l-4 2v-8.2z"'],
    'filter-lines': ['n|path d="M4 6h16M7 12h10M10 18h4"'],
    sort: ['n|path d="M7 4v16M3 8l4-4 4 4"', 'n*|path d="M17 20V4M21 16l-4 4-4-4"'],
    'sort-bars': ['n|path d="M4 6h16M4 12h11M4 18h6"'],
    'sort-chev': ['n|path d="m8 9 4-4 4 4"', 'n*|path d="m8 15 4 4 4-4"'],
    'sort-az': ['n|path d="M7 4v16M3 16l4 4 4-4"', 'n*|path d="M14 10V5.5a2 2 0 0 1 4 0V10M14 7.5h4M14 14h4.5L14 20h4.5"'],
    share: ['n*|path d="m8.3 10.7 7.4-4.3M8.3 13.3l7.4 4.3"', 'f|circle cx="18" cy="5" r="2.6"', 'f|circle cx="6" cy="12" r="2.6"', 'f|circle cx="18" cy="19" r="2.6"'],
    'share-box': ['n*|path d="M12 3v12M8 7l4-4 4 4"', 'n|path d="M7.5 10H6a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-9a1 1 0 0 0-1-1h-1.5"'],
    'share-arrow': ['n|path d="m14 5 7 7-7 7"', 'n*|path d="M21 12h-8a9 9 0 0 0-9 9"'],
    'share-plane': ['f|path d="M21.5 2.5 14.5 21.5l-3.6-8.4-8.4-3.6z"', 'k*|path d="m10.9 13.1 4.6-4.6"'],
    download: ['n*|path d="M12 3v12M7 10l5 5 5-5"', 'n|path d="' + TRAY + '"'],
    'download-plain': ['n|path d="M12 4v15M6 13l6 6 6-6"'],
    'download-line': ['n*|path d="M12 3v13M7 11l5 5 5-5"', 'n|path d="M5 21h14"'],
    'download-circle': ['f|' + C95, 'k*|path d="M12 7.5v8M8.5 12l3.5 3.5 3.5-3.5"'],
    'download-cloud': ['f|path d="' + CLOUD + '"', 'K*|path d="M12 11v6M9.5 14.5 12 17l2.5-2.5"'],
    upload: ['n*|path d="M12 15V3M7 8l5-5 5 5"', 'n|path d="' + TRAY + '"'],
    'upload-line': ['n*|path d="M12 21V8M7 13l5-5 5 5"', 'n|path d="M5 3h14"'],
    'upload-circle': ['f|' + C95, 'k*|path d="M12 16.5v-8M8.5 12l3.5-3.5 3.5 3.5"'],
    'upload-cloud': ['f|path d="' + CLOUD + '"', 'K*|path d="M12 17v-6M9.5 13.5 12 11l2.5 2.5"'],
    external: ['n*|path d="M14 4h6v6M20 4l-9 9"', 'n|path d="M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5"'],
    'external-arrow': ['n|path d="M7 17 17 7M8 7h9v9"'],
    'external-square': ['f|rect x="3" y="3" width="18" height="18" rx="RX"', 'k*|path d="m9.5 14.5 6-6M10 8.5h5.5V14"'],
    'external-small': ['n|path d="M9 6h9v9M18 6 6 18"'],
    lock: ['f|rect x="4" y="10.5" width="16" height="10.5" rx="RX"', 'n|path d="M8 10.5V7a4 4 0 0 1 8 0v3.5"', 'k*|path d="M12 14.5v3"'],
    'lock-open': ['f|rect x="4" y="10.5" width="16" height="10.5" rx="RX"', 'n|path d="M8 10.5V7a4 4 0 0 1 7.8-1.2"', 'k*|path d="M12 14.5v3"'],
    'lock-square': ['f|rect x="4" y="10.5" width="16" height="10.5" rx="RX"', 'n|path d="M7.5 10.5V3.5h9v7"', 'k*|path d="M12 14.5v3"'],
    'lock-keyhole': ['f|rect x="4" y="10" width="16" height="11" rx="RX"', 'n|path d="M7.5 10V7a4.5 4.5 0 0 1 9 0v3"', 'd*|circle cx="12" cy="14.6" r="1.6"', 'k*|path d="M12 15.5v2.5"'],
    shield: ['f|path d="M12 3 20 6v6c0 4.5-3.4 8-8 9-4.6-1-8-4.5-8-9V6z"', 'k*|path d="m8.8 12 2.2 2.2 4.2-4.2"'],
    eye: ['f|path d="' + EYE + '"', 'k*|circle cx="12" cy="12" r="3"'],
    'eye-off': ['f|path d="' + EYE + '"', 'k*|circle cx="12" cy="12" r="3"', 'K|path d="M3.5 3.5l17 17"', 'n*|path d="M3.5 3.5l17 17"'],
    'eye-closed': ['n|path d="M2.5 10s3.6 5.5 9.5 5.5 9.5-5.5 9.5-5.5"', 'n*|path d="m5.3 13.3-1.8 2.4M18.7 13.3l1.8 2.4M12 15.5v3M8.4 15l-1 2.8M15.6 15l1 2.8"'],
    'eye-round': ['f|path d="M2 12c2.4-4.3 5.8-6.5 10-6.5s7.6 2.2 10 6.5c-2.4 4.3-5.8 6.5-10 6.5S4.4 16.3 2 12z"', 'd*|circle cx="12" cy="12" r="3.2"'],
    trash: ['n|path d="M3 6h18M9 6V4h6v2"', 'f|path d="M5 6h14l-1 14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1z"', 'k*|path d="M10 10.5v6M14 10.5v6"'],
    'trash-plain': ['n|path d="M3 6h18M9 6V4h6v2"', 'f|path d="M5 6h14l-1 14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1z"'],
    'trash-bin': ['n|path d="M4 6h16"', 'f|path d="M6 6h12v14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1z"', 'k*|path d="M10 10v7M14 10v7"'],
    'trash-lid': ['n*|path d="M3.5 7.5 20 4M10 5.5l-.4-1.9 4.9-1 .4 1.9"', 'f|path d="M5 9h14l-1 11a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1z"'],
    edit: ['f|path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L8 18l-4 1 1-4z"', 'k*|path d="m14.5 5.5 3 3"'],
    'edit-line': ['f|path d="M14.5 3.5a2.12 2.12 0 0 1 3 3L7 17l-4 1 1-4z"', 'k*|path d="m12.5 5.5 3 3"', 'n*|path d="M12 21h9"'],
    'edit-square': ['n|path d="M11 4H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-6"', 'f*|path d="M17.5 2.5a2.12 2.12 0 0 1 3 3L12 14l-4 1 1-4z"'],
    'edit-pen': ['f|path d="m4 20 1-5L15.5 4.5l4 4L9 19z"', 'k*|path d="m13 7 4 4"', 'k|path d="m5 15 4 4"'],
    copy: ['f|rect x="8" y="8" width="13" height="13" rx="RX"', 'n*|path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"'],
    'copy-docs': ['n*|path d="M5 17V4a1 1 0 0 1 1-1h8"', 'f|path d="M9 7h7l4 4v9a1 1 0 0 1-1 1h-9a1 1 0 0 1-1-1z"', 'k|path d="M16 7v4h4"'],
    'copy-stack': ['n*|rect x="3" y="3" width="13" height="13" rx="RX"', 'f|rect x="8" y="8" width="13" height="13" rx="RX"'],
    chat: ['f|path d="' + BUBBLE + '"', 'd*|circle cx="8.8" cy="12" r="DR"', 'd*|circle cx="12.5" cy="12" r="DR"', 'd*|circle cx="16.2" cy="12" r="DR"'],
    'chat-plain': ['f|path d="' + BUBBLE + '"'],
    'chat-square': ['f|path d="M6 4h13a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H9l-5 4V6a2 2 0 0 1 2-2z"'],
    'chat-lines': ['f|path d="M6 4h13a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H9l-5 4V6a2 2 0 0 1 2-2z"', 'k*|path d="M8 9h9M8 12.5h5.5"'],
    'chat-two': ['n*|path d="M15 8V5a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v6l3-2.5h3"', 'f|path d="M10 10h10a2 2 0 0 1 2 2v9l-3-2.5h-9a2 2 0 0 1-2-2V12a2 2 0 0 1 2-2z"'],
    link: ['n|path d="M10 13.5a4.5 4.5 0 0 0 6.4.4l2.8-2.8a4.5 4.5 0 0 0-6.4-6.4l-1.6 1.6"', 'n*|path d="M14 10.5a4.5 4.5 0 0 0-6.4-.4l-2.8 2.8a4.5 4.5 0 0 0 6.4 6.4l1.6-1.6"'],
    'link-h': ['n|path d="M9.5 7.5H7a4.5 4.5 0 0 0 0 9h2.5M14.5 7.5H17a4.5 4.5 0 0 1 0 9h-2.5"', 'n*|path d="M8 12h8"'],
    'link-h-open': ['n|path d="M9.5 7.5H7a4.5 4.5 0 0 0 0 9h2.5M14.5 7.5H17a4.5 4.5 0 0 1 0 9h-2.5"'],
    'link-rings': ['n|rect x="2.5" y="8" width="11" height="8" rx="4"', 'n*|rect x="10.5" y="8" width="11" height="8" rx="4"'],
    star: ['f|polygon points="' + starAll + '"'],
    bookmark: ['f|path d="M6 3h12v18l-6-4.5L6 21z"'],
    grid: ['f|rect x="3.5" y="3.5" width="7" height="7" rx="RX"', 'f|rect x="13.5" y="3.5" width="7" height="7" rx="RX"', 'f|rect x="3.5" y="13.5" width="7" height="7" rx="RX"', 'f*|rect x="13.5" y="13.5" width="7" height="7" rx="RX"'],
    list: ['n|path d="M9 6h11M9 12h11M9 18h11"', 'e*|circle cx="4.5" cy="6" r="DL"', 'e*|circle cx="4.5" cy="12" r="DL"', 'e*|circle cx="4.5" cy="18" r="DL"'],
    refresh: ['n|path d="M20 11a8 8 0 0 0-14.9-3.5M4 13a8 8 0 0 0 14.9 3.5"', 'n*|path d="M4 3.5v4h4M20 20.5v-4h-4"'],
    'arrow-right': ['n|path d="M5 12h14"', 'n*|path d="m13 6 6 6-6 6"'],
    image: ['f|rect x="3" y="4" width="18" height="16" rx="RX"', 'k*|path d="m4 18 5-5 4 4 2.5-2.5L20 19"', 'd*|circle cx="15.5" cy="9" r="1.8"'],
    camera: ['f|path d="M4 7h3.2l1.6-2.5h6.4L16.8 7H20a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1z"', 'k*|circle cx="12" cy="13" r="3.6"'],
    globe: ['f|' + C95, 'k*|path d="M2.5 12h19M12 2.5c2.6 2.6 3.8 6 3.8 9.5s-1.2 6.9-3.8 9.5c-2.6-2.6-3.8-6-3.8-9.5S9.4 5.1 12 2.5z"'],
    bolt: ['f|path d="M13.5 2.5 4.5 13.5H12l-1.5 8 9-11H12z"'],
    package: ['f|path d="M4 8h16v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z"', 'n*|path d="M3 4h18v4H3z"', 'k*|path d="M10 12h4"'],
    layers: ['f|rect x="4" y="3.5" width="16" height="5" rx="RX"', 'f|rect x="4" y="10" width="16" height="5" rx="RX"', 'f*|rect x="4" y="16.5" width="16" height="4.5" rx="RX"'],
    doc: ['f|path d="M6 2.5h8l5 5V20a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 5 20V4a1.5 1.5 0 0 1 1-1.5z"', 'k|path d="M14 2.5V7.5h5"', 'k*|path d="M8.5 12.5h7M8.5 16h5"'],
    'iso-box': ['f|path d="m12 3 7.8 4.5v9L12 21l-7.8-4.5v-9z"', 'k*|path d="M4.4 7.6 12 12l7.6-4.4M12 12v8.8"'],
    'iso-layers': ['f|path d="M12 3.5 21 8.5l-9 5-9-5z"', 'n*|path d="m3 12.5 9 5 9-5M3 16.5l9 5 9-5"'],
    'iso-doc': ['f|path d="m3 13.5 10-6 8 4.5-10 6z"', 'n*|path d="m3 13.5v2.5l8 4.5 10-6v-2.5"', 'k|path d="m8.5 13 5-3M10.8 14.3l3.5-2.1"'],
    // Handritade varianter (bara linje)
    'h-home': ['n|path d="M2.2 10.8 12.3 2.8M11.6 2.9l10.1 8.3M4.2 9.6c-.3 3.9.1 7.8-.1 11.6M19.8 9.4c.4 4 0 7.9.2 11.9M3.4 21.1c5.8.3 11.7-.2 17.4.2M9.3 21c-.2-2.1.1-4.2-.1-6.1 1.9-.3 3.8.1 5.7-.1.2 2 0 4.1.1 6.1"'],
    'h-search': ['n|path d="M17.2 9.5c.6 3.9-2.2 7.6-6.3 8-4 .5-7.3-2.5-7.4-6.4C3.3 7.2 6.6 3.8 10.6 3.9c3.3.1 6 2.4 6.7 5.3.1.6-.6 1.4-1.4 1.6M15.2 15.6c1.7 1.5 3.4 3.3 5.3 5"'],
    'h-user': ['n|path d="M15.6 7.4c.5 2.3-1 4.6-3.4 5-2.3.4-4.4-1.2-4.6-3.5-.2-2.4 1.6-4.3 3.9-4.4 1.9-.1 3.5 1.1 4.2 2.6M3.9 21.2c-.4-4.4 3.3-8.1 8.2-8.1 4.6 0 8.3 3.4 8.1 8.3"'],
    'h-heart': ['n|path d="M12.1 7.4C10.8 5 8.4 3.9 6.3 4.6 3.6 5.5 2.4 8.4 3.4 11.2c1.4 3.9 5.6 6.6 8.7 8.6 3.4-2.2 7.9-5.3 8.8-9.4.6-2.8-1-5.6-3.8-6.1-2.3-.4-4.1.8-5.2 3.4"'],
    'h-bell': ['n|path d="M5.9 16.6c.6-2.4.1-5.2.6-7.8.6-3.2 3.1-5.5 5.9-5.4 3 .1 5.2 2.6 5.4 5.7.2 2.6-.2 5.4 1 7.6M3.1 17.2c6-.4 11.9.3 17.8-.2M10.1 20.1c.9 1.4 3 1.4 3.9-.1"'],
    'h-mail': ['n|path d="M2.4 5.4c6.4-.3 12.8.1 19.2-.2M3.1 4.6c-.2 4.9.2 9.9-.1 14.9M20.9 4.8c.3 4.8-.1 9.7.2 14.6M2.5 18.8c6.3.4 12.7-.2 19 .2M3.3 6.2c2.9 2.3 5.8 4.6 8.8 6.7 2.9-2.1 5.6-4.4 8.6-6.5"'],
    'h-calendar': ['n|path d="M2.5 5.6c6.3-.3 12.7.1 19-.2M3.2 4.8c-.2 5.4.2 10.8-.1 16.3M20.8 4.9c.3 5.3-.1 10.7.2 16.1M2.6 20.5c6.3.4 12.6-.2 18.9.3M8.1 2.6c-.1 1.6.1 3.1-.1 4.6M15.9 2.7c.2 1.5-.1 3 .1 4.5M3.6 10.1c5.6-.3 11.2.2 16.8-.2"'],
    'h-settings': ['n|path d="' + hgear() + '"', 'n|path d="M15 12.4c-.3 1.6-1.6 2.8-3.3 2.6-1.6-.2-2.8-1.7-2.6-3.3.2-1.6 1.7-2.8 3.3-2.6 1.4.2 2.4 1.2 2.6 2.4"'],
    // Detaljrika varianter
    'd-home': ['f|path d="M9 21H3V10l9-7 4 3.1V4h3v4.4l2 1.6v11h-6"', 'K*|path d="M9 21v-6h6v6"', 'k*|path d="M10.5 8.8h3v3h-3z"'],
    'd-search': ['n|circle cx="11" cy="11" r="7"', 'n*|path d="m20 20-4-4M7.6 9.6a3.6 3.6 0 0 1 2.6-2.4"'],
    'd-user': ['f*|circle cx="12" cy="8" r="4"', 'F|path d="M4 21a8 8 0 0 1 16 0z"', 'L|path d="M4 21a8 8 0 0 1 16 0"', 'k|path d="m9.5 13.4 2.5 3 2.5-3"'],
    'd-heart': ['f|path d="' + HEART + '"', 'k*|path d="M6.6 7.6a2.6 2.6 0 0 0-1.5 2.3"'],
    'd-bell': ['f|path d="M6 9a6 6 0 0 1 12 0c0 6 2.5 8 2.5 8h-17S6 15 6 9z"', 'n*|path d="M10.2 20.5a2 2 0 0 0 3.6 0M2.3 7.5A9 9 0 0 1 4.8 3.4M21.7 7.5a9 9 0 0 0-2.5-4.1"', 'k|path d="M6.5 13.5h11"'],
    'd-mail': ['f|rect x="3" y="5" width="18" height="14" rx="RX"', 'k*|path d="m3.5 7 8.5 6 8.5-6M3.8 18.3l6.4-5.2M20.2 18.3l-6.4-5.2"'],
    'd-calendar': ['f|rect x="3" y="5" width="18" height="16" rx="RX"', 'n*|path d="M8 3v4M16 3v4"', 'k*|path d="M4 10h16"', 'd*|circle cx="8" cy="14" r="DR"', 'd*|circle cx="12" cy="14" r="DR"', 'd*|circle cx="16" cy="14" r="DR"', 'd*|circle cx="8" cy="17.5" r="DR"', 'd*|circle cx="12" cy="17.5" r="DR"'],
    'd-settings': ['f|path d="' + gear() + '"', 'k*|circle cx="12" cy="12" r="3"', 'k|circle cx="12" cy="12" r="5.2"'],
    // Sociala former (förenklade, inga riktiga logotyper)
    'so-cam': ['f|rect x="3" y="3" width="18" height="18" rx="5.5"', 'k*|circle cx="12" cy="12" r="4"', 'd*|circle cx="17.2" cy="6.8" r="1.2"'],
    'so-f': ['n|path d="M15.5 3H13a3.5 3.5 0 0 0-3.5 3.5V21M6.5 10.5h8"'],
    'so-in': ['n|path d="M5 10v10M10.5 20V10M10.5 15a4 4 0 0 1 8 0v5"', 'e*|circle cx="5" cy="5.2" r="1.6"']
  };

  // ---------- Rendering av ikon ----------
  // o: s storlek px, w linje, st stil, c färg, c2 andrafärg, op duotone-täckning, k utskärningsfärg,
  //    cap, join, rx hörnradie, ns fast linjetjocklek oavsett storlek, gap öppna former, nok inga utskärningar, style
  function I(name, o = {}) {
    const def = ICONS[name]; if (!def) throw new Error('ikon saknas: ' + name);
    const s = o.s || 24, w = o.w != null ? o.w : 2, st = o.st || 'line';
    const C = o.c || 'currentColor';
    const C2 = o.c2 || (st === 'duo' ? C : st === 'flat' ? '#9DB0C4' : 'var(--brand)');
    const K = o.k || '#fff', op = o.op != null ? o.op : 0.2;
    const cap = o.cap || 'round', join = o.join || (cap === 'round' ? 'round' : 'miter');
    const rx = o.rx != null ? o.rx : 2;
    const dr = r2(Math.max(w * 0.62, 0.9)), dl = r2(Math.max(w * 0.8, 1.2));
    const ve = o.ns ? ' vector-effect="non-scaling-stroke"' : '';
    let out = '';
    for (const p of def) {
      const bar = p.indexOf('|'), k = p[0], acc = p[1] === '*';
      const t = p.slice(bar + 1).replace(/"RX"/g, '"' + rx + '"').replace(/"DR"/g, '"' + dr + '"').replace(/"DL"/g, '"' + dl + '"');
      const A = acc ? C2 : C;
      let a = null;
      if (st === 'line') {
        a = (k === 'F') ? null : (k === 'd' || k === 'e') ? `fill="${C}" stroke="none"` : `stroke="${C}"`;
      } else if (st === 'fill') {
        if (k === 'L') a = null;
        else if (k === 'f' || k === 'F') a = `fill="${C}" stroke="${C}"`;
        else if (k === 'k') a = o.nok ? null : `stroke="${K}"`;
        else if (k === 'K') a = o.nok ? null : `fill="${K}" stroke="${K}"`;
        else if (k === 'n') a = `stroke="${C}"`;
        else if (k === 'd') a = o.nok ? null : `fill="${K}" stroke="none"`;
        else a = `fill="${C}" stroke="none"`;
      } else if (st === 'duo') {
        if (k === 'F') a = `fill="${C2}" fill-opacity="${op}" stroke="none"`;
        else if (k === 'f') a = `fill="${C2}" fill-opacity="${op}" stroke="${C}"`;
        else if (k === 'd' || k === 'e') a = `fill="${C}" stroke="none"`;
        else a = `stroke="${C}"`;
      } else if (st === 'two') {
        if (k === 'F') a = null;
        else if (k === 'd' || k === 'e') a = `fill="${A}" stroke="none"`;
        else a = `stroke="${A}"`;
      } else if (st === 'flat') {
        if (k === 'L') a = null;
        else if (k === 'f' || k === 'F') a = `fill="${C2}" stroke="none"`;
        else if (k === 'd' || k === 'e') a = `fill="${C}" stroke="none"`;
        else if (k === 'K') a = `fill="${o.k || 'none'}" stroke="${C}"`;
        else a = `stroke="${C}"`;
      }
      if (a === null) continue;
      if (o.kw && (k === 'k' || k === 'K')) a += ` stroke-width="${o.kw}"`;
      const g = (o.gap && (k === 'f' || k === 'L')) ? ` pathLength="100" stroke-dasharray="87 13" stroke-dashoffset="${o.gap}"` : '';
      out += `<${t} ${a}${g}${ve}/>`;
    }
    const sty = `width:${s}px;height:${s}px;display:block;flex:0 0 auto;` + (o.style || '');
    return `<svg class="ico" viewBox="0 0 24 24" fill="none" stroke-width="${w}" stroke-linecap="${cap}" stroke-linejoin="${join}" aria-hidden="true" style="${sty}">${out}</svg>`;
  }

  // ---------- Små byggklossar ----------
  const fmt = n => String(n).replace('.', ',');
  const CSS = '<style>.syx-c{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;padding:24px 16px;min-width:0;color:var(--sink)}.syx-g{display:grid;grid-template-columns:repeat(4,auto);justify-content:center;gap:18px 26px;align-items:center}.syx-r{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:16px}.syx-l{display:flex;align-items:center;gap:8px;min-width:0}.syx-w{width:100%;max-width:300px;min-width:0}.syx-dark{background:#1A1C1E;color:#fff}</style>';
  const W = (inner, style = '') => CSS + `<div class="syx-c" style="${style}">${inner}</div>`;
  const sketch = (n, s = 32) => `<span style="position:relative;display:block;width:${s}px;height:${s}px">${I(n, { s, w: 1.8 })}${I(n, { s, w: 1.1, style: 'position:absolute;inset:0;transform:rotate(3deg) translate(0.7px,-0.5px);opacity:.75' })}</span>`;
  const SET8 = ['home', 'search', 'user', 'heart', 'bell', 'mail', 'calendar', 'settings'];
  const grid = (o = {}, names = SET8, gs = '') => `<div class="syx-g" style="${gs}">` + names.map(n => I(n, o)).join('') + '</div>';
  const row = (o = {}, names = SET8, gs = '') => `<div class="syx-r" style="${gs}">` + names.map(n => I(n, o)).join('') + '</div>';
  const O = (l, h) => (h == null ? { l } : { l, h });
  const Q = (id, q, opts, layout = 'grid') => ({ id: 'sy-' + id, q, layout, opts });
  const btn = (inner, st = '') => `<span class="sb" style="${st}">${inner}</span>`;
  const btn2 = (inner, st = '') => `<span class="sb2" style="${st}">${inner}</span>`;
  // Tabbar längst ner: items [ikon, etikett], f(ikon, aktiv) ger SVG
  const tabbar = (f, items = [['home', 'Hem'], ['search', 'Sök'], ['heart', 'Sparat'], ['user', 'Profil']], extra = '') =>
    `<div class="syx-w" style="display:flex;justify-content:space-around;background:var(--box);border:1px solid var(--sline);padding:9px 4px 7px;border-radius:14px;${extra}">` +
    items.map((it, i) => `<div style="display:flex;flex-direction:column;align-items:center;gap:3px;font-size:11px;line-height:1.2;font-weight:${i ? 500 : 600};color:${i ? 'var(--smuted)' : 'var(--sink)'};min-width:0">${f(it[0], i === 0)}<span>${it[1]}</span></div>`).join('') + '</div>';

  const G = [];

  // =====================================================================
  // 1. Linjetjocklek
  // =====================================================================
  G.push({ key: 'linjetjocklek', title: 'Linjetjocklek', questions: [
    Q('linje-24', 'Hur tjock ska linjen vara på ikoner i 24 px?',
      [1, 1.5, 2, 2.5, 3].map(w => O(fmt(w) + ' px linje', W(grid({ w }))))),
    Q('linje-24-fin', 'Vilken av de mellanliggande tjocklekarna är bäst i 24 px?',
      [1.25, 1.5, 1.75, 2].map(w => O(fmt(w) + ' px linje', W(grid({ w }))))),
    Q('linje-20', 'Hur tjock ska linjen vara på ikoner i 20 px?',
      [1.25, 1.5, 1.75, 2].map(w => O(fmt(w) + ' px linje i 20 px', W(grid({ w, s: 20, ns: 1 }))))),
    Q('linje-16', 'Hur tjock ska linjen vara på små ikoner i 16 px?',
      [1.25, 1.5, 2].map(w => O(fmt(w) + ' px linje i 16 px', W(grid({ w, s: 16, ns: 1 }, SET8, 'gap:16px 22px'))))),
    Q('linje-32', 'Hur tjock ska linjen vara på ikoner i 32 px?',
      [1.5, 2, 2.5, 3].map(w => O(fmt(w) + ' px linje i 32 px', W(grid({ w, s: 32, ns: 1 }, SET8, 'gap:18px 22px'))))),
    Q('linje-skala', 'Hur ska linjen bete sig när samma ikon visas i olika storlekar?', [
      ['Skalar med storleken', s => 2 * s / 24],
      ['Alltid 2 px', () => 2],
      ['Växer lite med storleken', s => ({ 16: 1.75, 24: 2, 32: 2.25, 48: 2.5 })[s]]
    ].map(([l, f]) => O(l, W(['home', 'bell'].map(n => `<div class="syx-r" style="align-items:flex-end;gap:14px">${[16, 24, 32, 48].map(s => I(n, { s, w: f(s), ns: 1 })).join('')}</div>`).join(''))))),
    Q('linje-brodtext', 'Vilken linje passar bäst bredvid brödtext i 15 px?',
      [1.25, 1.5, 1.75, 2].map(w => O(fmt(w) + ' px bredvid brödtext', W(`<div class="stack" style="gap:10px">${[['clock', 'Tar ungefär 20 minuter'], ['pin', 'Storgatan 12, plan 3'], ['calendar', 'Måndag till fredag']].map(([n, t]) => `<div class="syx-l">${I(n, { s: 20, w, ns: 1 })}<span>${t}</span></div>`).join('')}</div>`, 'align-items:flex-start')))),
    Q('linje-rubrik', 'Vilken linje passar bäst bredvid en fet rubrik?',
      [1.5, 2, 2.5].map(w => O(fmt(w) + ' px bredvid rubrik', W(`<div class="stack" style="gap:12px">${[['shield', 'Trygg betalning'], ['refresh', 'Fri retur i 30 dagar']].map(([n, t]) => `<div class="syx-l" style="gap:10px">${I(n, { s: 24, w })}<span class="h h3">${t}</span></div>`).join('')}</div>`, 'align-items:flex-start')))),
    Q('linje-knapp', 'Hur tjock ska ikonlinjen vara inne i en knapp?',
      [1.5, 2, 2.5].map(w => O(fmt(w) + ' px i knappen', W(`<div class="syx-r">${btn(I('download', { s: 20, w, ns: 1 }) + 'Ladda ner')}${btn2(I('share-box', { s: 20, w, ns: 1 }) + 'Dela')}</div>`)))),
    Q('linje-tabbar', 'Hur tjock ska linjen vara i en tabbar längst ner i mobilen?',
      [1.5, 1.75, 2, 2.5].map(w => O(fmt(w) + ' px i tabbaren', W(tabbar((n) => I(n, { w }))))) ),
    Q('linje-stor', 'Hur tjock ska linjen vara på stora ikoner i 48 px?',
      [1.5, 2, 2.5, 3].map(w => O(fmt(w) + ' px linje i 48 px', W(`<div class="syx-r" style="gap:22px">${['clock', 'shield', 'chat'].map(n => I(n, { s: 48, w, ns: 1 })).join('')}</div>`)))),
    Q('linje-mork', 'Hur tjock ska linjen vara på mörk bakgrund?',
      [1.5, 2, 2.5].map(w => O(fmt(w) + ' px på mörk yta', W(grid({ w }), 'background:#1A1C1E;color:#fff')))),
    Q('linje-falt', 'Hur tjock ska ikonen inne i ett fält vara?',
      [1.25, 1.5, 2].map(w => O(fmt(w) + ' px i fältet', W(`<div class="syx-w stack" style="gap:10px"><div class="inp ph" style="gap:10px">${I('search', { s: 20, w, ns: 1, style: 'color:var(--smuted)' })}Sök</div><div class="inp ph" style="gap:10px">${I('mail', { s: 20, w, ns: 1, style: 'color:var(--smuted)' })}E-post</div></div>`))))
  ]});

  // =====================================================================
  // 2. Ändar och hörn
  // =====================================================================
  const SETEND = ['check', 'x', 'plus', 'menu', 'search', 'download', 'external', 'sort'];
  const SETJOIN = ['check', 'home-plain', 'mail', 'alert', 'filter', 'external-arrow', 'bookmark', 'edit'];
  G.push({ key: 'andar-och-horn', title: 'Ändar och hörn', questions: [
    Q('ande-andar', 'Hur ska linjernas ändar se ut?', [
      ['Rundade ändar', 'round', 'round'], ['Raka, avskurna ändar', 'butt', 'round'], ['Raka, förlängda ändar', 'square', 'round']
    ].map(([l, cap, join]) => O(l, W(grid({ w: 2.25, s: 36, cap, join }, SETEND, 'gap:18px 22px'))))),
    Q('ande-horn', 'Hur ska hörnen där två linjer möts se ut?', [
      ['Rundade hörn', 'round'], ['Spetsiga hörn', 'miter'], ['Fasade hörn', 'bevel']
    ].map(([l, join]) => O(l, W(grid({ w: 2.25, s: 36, cap: 'round', join }, SETJOIN, 'gap:18px 22px'))))),
    Q('ande-paket', 'Vilken helhet ska ikonernas linjer ha?', [
      ['Allt rundat', 'round', 'round', 2], ['Allt rakt och spetsigt', 'butt', 'miter', 0], ['Rundade hörn, raka ändar', 'butt', 'round', 2]
    ].map(([l, cap, join, rx]) => O(l, W(grid({ w: 2, s: 36, cap, join, rx }, ['check', 'menu', 'mail', 'external', 'calendar', 'download', 'home-plain', 'x'], 'gap:18px 22px'))))),
    Q('ande-radie', 'Hur runda ska hörnen på rektangulära former i ikonerna vara?', [
      ['Skarpa hörn (0 px)', 0], ['1,5 px hörnradie', 1.5], ['3 px hörnradie', 3], ['5 px hörnradie', 5]
    ].map(([l, rx]) => O(l, W(grid({ rx, s: 28 }, ['mail', 'calendar', 'lock', 'mobile', 'plus-square', 'image', 'check-square', 'external-square'], 'gap:18px 22px'))))),
    Q('ande-fyllda', 'Hur ska hörnen på fyllda ikoner se ut?', [
      ['Spetsiga hörn', 'miter', 1], ['Lätt rundade hörn', 'round', 1.5], ['Tydligt rundade hörn', 'round', 3.2]
    ].map(([l, join, w]) => O(l, W(grid({ st: 'fill', s: 28, w, join, cap: join === 'miter' ? 'butt' : 'round' }, ['home', 'bell', 'star', 'alert', 'filter', 'bookmark', 'chat-square', 'bolt'], 'gap:18px 22px')))))
  ]});

  // =====================================================================
  // 3. Stilar
  // =====================================================================
  const STYLES = [['Linje', { st: 'line' }], ['Fylld (glyph)', { st: 'fill' }], ['Duotone (linje med ljus fyllning)', { st: 'duo', c2: 'var(--brand)', op: 0.18 }], ['Tvåfärgad linje', { st: 'two' }], ['Platt (fyllda ytor, ingen kontur)', { st: 'flat', c: 'var(--brand)' }]];
  const offDuo = (n, o = {}) => { const s = o.s || 24; return `<span style="position:relative;display:block;width:${s}px;height:${s}px;flex:0 0 auto">${I(n, { s, st: 'flat', c: 'none', c2: o.c2 || '#C9D5E2', style: 'position:absolute;left:' + (s / 10) + 'px;top:' + (s / 10) + 'px' })}${I(n, { s, w: o.w, style: 'position:absolute;left:0;top:0' })}</span>`; };
  G.push({ key: 'stilar', title: 'Stilar', questions: [
    Q('stil-grund', 'Vilken grundstil ska ikonerna ha?', STYLES.map(([l, o]) => O(l, W(grid(o))))),
    Q('stil-verktyg', 'Vilken stil ska ikonknappar i en verktygsrad ha?', [['Linje', { st: 'line' }], ['Fylld', { st: 'fill' }], ['Duotone', { st: 'duo', c2: 'var(--brand)', op: 0.18 }]].map(([l, o]) =>
      O(l, W(`<div class="row" style="gap:4px;background:var(--box);border:1px solid var(--sline);border-radius:10px;padding:4px;flex-wrap:wrap;justify-content:center">${['edit', 'copy', 'link', 'share', 'download', 'trash'].map(n => `<span style="display:grid;place-items:center;width:38px;height:38px">${I(n, { ...o, s: 20 })}</span>`).join('')}</div>`)))),
    Q('stil-duo-styrka', 'Hur stark ska fyllningen i duotone-ikoner vara?', [0.1, 0.2, 0.35].map(op => O('Fyllning ' + Math.round(op * 100) + ' %', W(grid({ st: 'duo', c2: 'var(--brand)', op }))))),
    Q('stil-duo-farg', 'Vilken färg ska fyllningen i duotone-ikoner ha?', [
      ['Linjens färg, ljust', 'var(--sink)', 0.14], ['Varumärkesfärg, ljust', 'var(--brand)', 0.22], ['Ljusgrå', '#9AA0A6', 0.35]
    ].map(([l, c2, op]) => O(l, W(grid({ st: 'duo', c2, op }))))),
    Q('stil-duo-forskjut', 'Var ska fyllningen sitta i duotone-ikoner?', [
      O('Exakt inom formen', W(grid({ s: 32, st: 'duo', c2: 'var(--brand)', op: 0.25 }))),
      O('Förskjuten snett nedåt', W(`<div class="syx-g">${SET8.map(n => offDuo(n, { s: 32, c2: '#BFCDDC' })).join('')}</div>`))
    ]),
    Q('stil-tvafarg', 'Vilken del ska ha accentfärgen i tvåfärgade ikoner?', [
      O('Detaljer i accentfärg', W(grid({ st: 'two', c: 'var(--sink)', c2: 'var(--brand)' }, ['search', 'user', 'bell', 'mail', 'calendar', 'settings', 'download', 'lock']))),
      O('Huvudform i accentfärg', W(grid({ st: 'two', c: 'var(--brand)', c2: 'var(--sink)' }, ['search', 'user', 'bell', 'mail', 'calendar', 'settings', 'download', 'lock']))),
      O('Detaljer i ljusare ton', W(grid({ st: 'two', c: 'var(--sink)', c2: '#8A9099' }, ['search', 'user', 'bell', 'mail', 'calendar', 'settings', 'download', 'lock'])))
    ]),
    Q('stil-platt-kontur', 'Ska platta ikoner ha en kontur?', [
      O('Platt utan kontur', W(grid({ st: 'flat', c: 'var(--brand)', c2: '#9DB0C4' }))),
      O('Platt med mörk kontur', W(grid({ st: 'duo', c: 'var(--brand)', c2: '#9DB0C4', op: 1 })))
    ]),
    Q('stil-glyph-detalj', 'Ska fyllda ikoner ha utskurna detaljer?', [
      O('Med utskurna detaljer', W(grid({ st: 'fill' }, ['home', 'user-circle', 'bell', 'mail', 'calendar', 'settings', 'lock', 'chat']))),
      O('Helt solid siluett', W(grid({ st: 'fill', nok: 1 }, ['home', 'user-circle', 'bell', 'mail', 'calendar', 'settings', 'lock', 'chat'])))
    ]),
    Q('stil-liten', 'Vilken stil fungerar bäst för små ikoner i 16 px?', [['Linje', { st: 'line' }], ['Fylld', { st: 'fill' }]].map(([l, o]) =>
      O(l + ' i 16 px', W(`<div class="stack" style="gap:8px">${[['clock', '20 min'], ['pin', 'Centrum'], ['star', '4,8 av 5'], ['user', '2 personer']].map(([n, t]) => `<div class="syx-l small" style="gap:6px">${I(n, { ...o, s: 16, w: 2 })}<span>${t}</span></div>`).join('')}</div>`, 'align-items:flex-start')))),
    Q('stil-stor', 'Vilken stil ska stora ikoner i 48 px ha?', [['Linje', { st: 'line', w: 2, ns: 1 }], ['Duotone', { st: 'duo', c2: 'var(--brand)', op: 0.18, w: 2, ns: 1 }], ['Fylld', { st: 'fill' }], ['Platt', { st: 'flat', c: 'var(--brand)', w: 2, ns: 1 }]].map(([l, o]) =>
      O(l + ' i 48 px', W(`<div class="syx-r" style="gap:22px">${['clock', 'shield', 'chat'].map(n => I(n, { ...o, s: 48 })).join('')}</div>`)))),
    Q('stil-mork', 'Vilken stil fungerar bäst på mörk bakgrund?', [['Linje', { st: 'line' }], ['Fylld', { st: 'fill', k: '#1A1C1E' }], ['Duotone', { st: 'duo', c2: '#fff', op: 0.22 }]].map(([l, o]) =>
      O(l + ' på mörk yta', W(grid(o), 'background:#1A1C1E;color:#fff')))),
    Q('stil-enhet', 'Ska samma ikonstil gälla för små och stora ikoner?', [
      ['Samma linjestil överallt', { st: 'line', w: 2, ns: 1 }], ['Duotone på de stora', { st: 'duo', c2: 'var(--brand)', op: 0.18, w: 2, ns: 1 }], ['Fyllt på de stora', { st: 'fill' }]
    ].map(([l, o]) => O(l, W(`<div class="row" style="gap:16px;justify-content:center">${['search', 'heart', 'user', 'cart'].map(n => I(n, { s: 20 })).join('')}</div><div class="divider" style="width:100%;max-width:240px"></div><div class="syx-r" style="gap:22px">${['clock', 'shield', 'refresh'].map(n => I(n, { ...o, s: 44 })).join('')}</div>`))))
  ]});

  // =====================================================================
  // 4. Stil efter läge
  // =====================================================================
  const sideMenu = (f) => `<div class="syx-w stack" style="gap:2px;background:var(--box);border-radius:12px;padding:8px;max-width:240px">${[['home', 'Översikt'], ['calendar', 'Bokningar'], ['mail', 'Meddelanden'], ['settings', 'Inställningar']].map(([n, t], i) => `<div class="syx-l" style="gap:10px;padding:8px 10px;border-radius:8px;font-size:14px;${i === 1 ? 'background:var(--tint);font-weight:600' : 'color:var(--smuted)'}">${f(n, i === 1)}<span>${t}</span></div>`).join('')}</div>`;
  const pair = (a, b, la = 'Av', lb = 'På') => `<div class="syx-r" style="gap:28px">${[[a, la], [b, lb]].map(([x, t]) => `<div style="display:flex;flex-direction:column;align-items:center;gap:6px">${x}<span class="small muted">${t}</span></div>`).join('')}</div>`;
  const ibtn = (icon, st = '') => `<span style="display:grid;place-items:center;width:44px;height:44px;border-radius:10px;${st}">${icon}</span>`;
  G.push({ key: 'stil-efter-lage', title: 'Stil efter läge', questions: [
    Q('lage-tabbar', 'Hur ska den aktiva fliken i tabbaren skilja sig från de andra?', [
      ['Aktiv fylld, övriga linje', (n, a) => I(n, { st: a ? 'fill' : 'line', style: a ? 'color:var(--sink)' : '' })],
      ['Alla linje, aktiv i färg', (n, a) => I(n, { style: a ? 'color:var(--brand)' : '' })],
      ['Alla linje, aktiv med tjockare linje', (n, a) => I(n, { w: a ? 2.5 : 1.75 })],
      ['Aktiv fylld och i färg', (n, a) => I(n, { st: a ? 'fill' : 'line', style: a ? 'color:var(--brand)' : '' })]
    ].map(([l, f]) => O(l, W(tabbar(f))))),
    Q('lage-sidomeny', 'Ska ikonen i en vald menyrad bytas till fylld?', [
      ['Vald rad får fylld ikon', (n, a) => I(n, { s: 20, st: a ? 'fill' : 'line', k: 'var(--tint)' })],
      ['Samma linjeikon i alla rader', (n) => I(n, { s: 20 })],
      ['Linjeikon, vald i varumärkesfärg', (n, a) => I(n, { s: 20, style: a ? 'color:var(--brand)' : '' })]
    ].map(([l, f]) => O(l, W(sideMenu(f))))),
    Q('lage-favorit', 'Hur ska en markerad favorit se ut?', [
      ['Fyllt hjärta i röd', I('heart', { s: 28, st: 'fill', c: '#C7362F' })],
      ['Fyllt hjärta i varumärkesfärg', I('heart', { s: 28, st: 'fill', c: 'var(--brand)' })],
      ['Fyllt hjärta i textfärg', I('heart', { s: 28, st: 'fill', c: 'var(--sink)' })],
      ['Linjehjärta i färg', I('heart', { s: 28, w: 2.25, c: '#C7362F' })]
    ].map(([l, on]) => O(l, W(pair(I('heart', { s: 28 }), on, 'Inte sparad', 'Sparad'))))),
    Q('lage-inaktiv', 'Hur ska en ikonknapp se ut när den inte går att använda?', [
      ['Halvgenomskinlig (40 %)', 'opacity:.4'], ['Ljusgrå ikon', 'color:#B4B8BD'], ['Grå ikon på grå platta', 'color:#9AA0A6;background:#ECEDEE']
    ].map(([l, st]) => O(l, W(`<div class="syx-r" style="gap:10px">${ibtn(I('edit', { s: 22 }), 'background:var(--box);border:1px solid var(--sline)')}${ibtn(I('copy', { s: 22 }), 'background:var(--box);border:1px solid var(--sline)')}${ibtn(I('trash', { s: 22 }), 'background:var(--box);border:1px solid var(--sline);' + st)}</div><span class="small muted">Den sista är avstängd</span>`)))),
    Q('lage-hover', 'Vad ska hända när muspekaren är över en ikonknapp?', [
      ['Rund ljus platta bakom', 'border-radius:50%;background:var(--tint)', ''],
      ['Rundad fyrkantig platta', 'border-radius:10px;background:var(--tint)', ''],
      ['Bara färgbyte på ikonen', '', 'color:var(--brand)'],
      ['Ikonen blir fylld', '', 'fill']
    ].map(([l, bg, ic]) => O(l, W(pair(ibtn(I('heart', { s: 22 })), ibtn(I('heart', { s: 22, st: ic === 'fill' ? 'fill' : 'line', style: ic === 'fill' ? '' : ic }), bg), 'Normal', 'Hovring'))))),
    Q('lage-vald-vaxel', 'Hur ska den valda ikonen i en vyväxlare (rutnät eller lista) markeras?', [
      ['Mörk platta, vit ikon', 'background:var(--brand);color:#fff', ''],
      ['Ljus tonad platta', 'background:var(--tint);color:var(--brand)', ''],
      ['Vit platta med skugga', 'background:#fff;box-shadow:0 1px 3px rgba(0,0,0,.15);color:var(--sink)', 'background:#ECEDEE'],
      ['Bara ikonens färg', 'color:var(--brand)', '']
    ].map(([l, on, wrap]) => O(l, W(`<div style="display:inline-flex;gap:4px;padding:4px;border-radius:12px;border:1px solid var(--sline);background:var(--box);${wrap}">${ibtn(I('grid', { s: 20 }), 'width:40px;height:36px;border-radius:8px;' + on)}${ibtn(I('list', { s: 20 }), 'width:40px;height:36px;border-radius:8px;color:var(--smuted)')}</div>`)))),
    Q('lage-aktiv-markor', 'Vilken markering ska den aktiva fliken i tabbaren ha utöver ikonen?', [
      ['Ingen extra markering', ''], ['Liten punkt under', 'dot'], ['Linje ovanför', 'bar'], ['Kapsel bakom ikonen', 'pill']
    ].map(([l, m]) => O(l, W(tabbar((n, a) => {
      const ic = I(n, { st: a ? 'fill' : 'line', k: a && m === 'pill' ? 'var(--tint)' : '#fff' });
      if (m === 'pill') return `<span style="display:grid;place-items:center;width:52px;height:28px;border-radius:999px;background:${a ? 'var(--tint)' : 'transparent'}">${ic}</span>`;
      if (!a || !m) return ic;
      if (m === 'bar') return `<span style="position:relative;display:block"><span style="position:absolute;left:-6px;right:-6px;top:-9px;height:3px;border-radius:0 0 3px 3px;background:var(--sink)"></span>${ic}</span>`;
      return `<span style="position:relative;display:block">${ic}<span style="position:absolute;left:50%;bottom:-23px;width:4px;height:4px;margin-left:-2px;border-radius:50%;background:var(--sink)"></span></span>`;
    })))))
  ]});

  // =====================================================================
  // 5. Storlek
  // =====================================================================
  const lines = (s, rows, ts = '', o = {}) => `<div class="stack" style="gap:10px">${rows.map(([n, t]) => `<div class="syx-l" style="${ts}">${I(n, { s, w: 1.75, ns: 1, ...o })}<span>${t}</span></div>`).join('')}</div>`;
  const ROWS3 = [['clock', 'Tar ungefär 20 minuter'], ['pin', 'Storgatan 12'], ['phone', '08-123 456 78']];
  G.push({ key: 'storlek', title: 'Storlek', questions: [
    Q('storlek-brodtext', 'Hur stor ska en ikon vara bredvid brödtext i 15 px?',
      [16, 20, 24].map(s => O(s + ' px bredvid brödtext', W(lines(s, ROWS3), 'align-items:flex-start')))),
    Q('storlek-smatext', 'Hur stor ska en ikon vara bredvid liten text i 13 px?',
      [14, 16, 20].map(s => O(s + ' px bredvid liten text', W(lines(s, [['clock', '20 min'], ['pin', 'Centrum'], ['user', '2 personer']], 'gap:6px;font-size:13px;color:var(--smuted)'), 'align-items:flex-start')))),
    Q('storlek-rubrik', 'Hur stor ska en ikon vara bredvid en mellanrubrik?',
      [20, 24, 32].map(s => O(s + ' px bredvid rubrik', W(`<div class="stack" style="gap:12px">${[['shield', 'Trygg betalning'], ['refresh', 'Fri retur']].map(([n, t]) => `<div class="syx-l" style="gap:10px">${I(n, { s, w: 2, ns: 1 })}<span class="h h3">${t}</span></div>`).join('')}</div>`, 'align-items:flex-start')))),
    Q('storlek-stor-rubrik', 'Hur stor ska en ikon vara ovanför en stor rubrik?',
      [24, 32, 40, 48].map(s => O(s + ' px ovanför rubrik', W(`<div class="stack" style="gap:12px">${I('chat', { s, w: 2, ns: 1 })}<span class="h h2">Rubrik som är två rader lång</span></div>`, 'align-items:flex-start')))),
    Q('storlek-knapp', 'Hur stor ska ikonen vara i en knapp?',
      [16, 20, 24].map(s => O(s + ' px i knappen', W(`<div class="syx-r">${btn(I('download', { s, w: 2, ns: 1 }) + 'Ladda ner')}${btn2(I('calendar', { s, w: 2, ns: 1 }) + 'Boka tid')}</div>`)))),
    Q('storlek-header', 'Hur stora ska ikonerna uppe till höger i sidhuvudet vara?',
      [20, 24, 28].map(s => O(s + ' px i sidhuvudet', W(`<div class="syx-w" style="display:flex;align-items:center;justify-content:space-between;gap:12px;background:var(--box);border-radius:12px;padding:12px 16px"><b style="font-size:17px">Logo</b><div class="row" style="gap:16px;flex-wrap:nowrap">${['search', 'user', 'cart'].map(n => I(n, { s, w: 2, ns: 1 })).join('')}</div></div>`)))),
    Q('storlek-tabbar', 'Hur stora ska ikonerna i tabbaren vara?',
      [20, 24, 28].map(s => O(s + ' px i tabbaren', W(tabbar(n => I(n, { s, w: 1.75, ns: 1 })))))),
    Q('storlek-lista', 'Hur stor ska bocken i en punktlista vara?',
      [16, 20, 24].map(s => O(s + ' px bock i listan', W(`<div class="stack" style="gap:8px">${['Fri frakt över 500 kr', 'Öppet köp i 30 dagar', 'Svar inom en dag'].map(t => `<div class="syx-l" style="gap:10px">${I('check', { s, w: 2, ns: 1, style: 'color:var(--brand)' })}<span>${t}</span></div>`).join('')}</div>`, 'align-items:flex-start')))),
    Q('storlek-falt', 'Hur stor ska ikonen i ett fält vara?',
      [16, 20, 24].map(s => O(s + ' px i fältet', W(`<div class="syx-w stack" style="gap:10px"><div class="inp ph" style="gap:10px">${I('search', { s, w: 1.75, ns: 1 })}Sök</div><div class="inp ph" style="gap:10px">${I('calendar', { s, w: 1.75, ns: 1 })}Välj datum</div></div>`)))),
    Q('storlek-klickyta', 'Hur stor ska klickytan runt en ensam ikonknapp vara?',
      [32, 40, 48].map(s => O('Klickyta ' + s + ' px', W(`<div class="row" style="gap:8px;justify-content:center">${['heart', 'share-box', 'x'].map(n => `<span style="display:grid;place-items:center;width:${s}px;height:${s}px;border-radius:50%;background:var(--tint)">${I(n, { s: 20 })}</span>`).join('')}</div><span class="small muted">Ytan visas tonad här</span>`)))),
    Q('storlek-kort', 'Hur stor ska ikonen vara överst i ett litet informationskort?',
      [24, 32, 40, 48].map(s => O(s + ' px i kortet', W(`<div class="panel syx-w stack" style="gap:8px;max-width:220px">${I('shield', { s, w: 2, ns: 1 })}<b>Trygg betalning</b><span class="small muted">Betala först när du fått varan.</span></div>`))))
  ]});

  // =====================================================================
  // 6. Färg
  // =====================================================================
  const GRAY = '#8A9099';
  G.push({ key: 'farg', title: 'Färg', questions: [
    Q('farg-brodtext', 'Vilken färg ska en ikon bredvid brödtext ha?', [
      ['Samma som texten', { c: 'var(--sink)' }], ['Varumärkesfärg', { c: 'var(--brand)' }], ['Grå', { c: 'var(--smuted)' }], ['Tvåton (text + accent)', { st: 'two', c: 'var(--sink)', c2: 'var(--brand)' }]
    ].map(([l, o]) => O(l, W(lines(20, [['clock', 'Tar ungefär 20 minuter'], ['pin', 'Storgatan 12'], ['calendar', 'Måndag till fredag']], '', o), 'align-items:flex-start')))),
    Q('farg-meta', 'Vilken färg ska ikon och text ha i en metarad under en rubrik?', [
      ['Grå ikon, grå text', 'var(--smuted)', 'var(--smuted)'], ['Grå ikon, mörk text', 'var(--smuted)', 'var(--sink)'], ['Varumärkesikon, mörk text', 'var(--brand)', 'var(--sink)'], ['Mörk ikon, mörk text', 'var(--sink)', 'var(--sink)']
    ].map(([l, ic, tc]) => O(l, W(`<div class="stack" style="gap:8px"><span class="h h3">Rubrik på ett kort</span><div class="row small" style="gap:14px;color:${tc}">${[['clock', '45 min'], ['pin', 'Centrum'], ['star', '4,8']].map(([n, t]) => `<span class="syx-l" style="gap:5px">${I(n, { s: 16, w: 2, ns: 1, style: 'color:' + ic })}${t}</span>`).join('')}</div></div>`, 'align-items:flex-start')))),
    Q('farg-lista', 'Vilken färg ska bockarna i en punktlista ha?', [
      ['Varumärkesfärg', 'var(--brand)'], ['Grön', 'var(--ok)'], ['Samma som texten', 'var(--sink)'], ['Grå', GRAY]
    ].map(([l, c]) => O(l, W(`<div class="stack" style="gap:8px">${['Fri frakt över 500 kr', 'Öppet köp i 30 dagar', 'Svar inom en dag'].map(t => `<div class="syx-l" style="gap:10px">${I('check', { s: 20, w: 2.25, c })}<span>${t}</span></div>`).join('')}</div>`, 'align-items:flex-start')))),
    Q('farg-header', 'Vilken färg ska ikonerna i sidhuvudet ha?', [
      ['Samma som texten', 'var(--sink)'], ['Varumärkesfärg', 'var(--brand)'], ['Grå', 'var(--smuted)']
    ].map(([l, c]) => O(l, W(`<div class="syx-w" style="display:flex;align-items:center;justify-content:space-between;gap:12px;background:var(--box);border-radius:12px;padding:12px 16px"><b style="font-size:17px">Logo</b><div class="row" style="gap:16px;flex-wrap:nowrap">${['search', 'user', 'cart'].map(n => I(n, { s: 22, c })).join('')}</div></div>`)))),
    Q('farg-falt', 'Vilken färg ska ikonen i ett fält ha?', [
      ['Grå som platshållaren', 'var(--smuted)'], ['Samma som texten', 'var(--sink)'], ['Varumärkesfärg', 'var(--brand)']
    ].map(([l, c]) => O(l, W(`<div class="syx-w stack" style="gap:10px"><div class="inp ph" style="gap:10px">${I('search', { s: 20, c })}Sök</div><div class="inp ph" style="gap:10px">${I('mail', { s: 20, c })}E-post</div></div>`)))),
    Q('farg-knapp2', 'Vilken färg ska ikonen i en sekundärknapp ha?', [
      ['Samma som knapptexten', ''], ['Mörk textfärg', 'var(--sink)'], ['Grå', GRAY]
    ].map(([l, c]) => O(l, W(`<div class="syx-r">${btn2(I('share-box', { s: 20, style: c ? 'color:' + c : '' }) + 'Dela')}${btn2(I('heart', { s: 20, style: c ? 'color:' + c : '' }) + 'Spara')}</div>`)))),
    Q('farg-status', 'Vilken färg ska statusikoner (info, varning, fel, klart) ha?', [
      ['Egen färg per status', ['var(--brand)', 'var(--warn)', 'var(--bad)', 'var(--ok)']],
      ['Alla i textfärg', ['var(--sink)', 'var(--sink)', 'var(--sink)', 'var(--sink)']],
      ['Bara fel och varning i färg', ['var(--sink)', 'var(--warn)', 'var(--bad)', 'var(--sink)']]
    ].map(([l, cs]) => O(l, W(`<div class="stack" style="gap:9px">${[['info', 'Leverans tar 2–3 dagar'], ['alert', 'Få platser kvar'], ['x-circle', 'Kortet nekades'], ['check-circle', 'Bokningen är klar']].map(([n, t], i) => `<div class="syx-l" style="gap:10px">${I(n, { s: 20, c: cs[i] })}<span>${t}</span></div>`).join('')}</div>`, 'align-items:flex-start')))),
    Q('farg-funktion', 'Vilken färg ska stora ikoner i ett funktionsrutnät ha?', [
      ['Varumärkesfärg', { c: 'var(--brand)' }], ['Samma som texten', { c: 'var(--sink)' }], ['Tvåton', { st: 'two', c: 'var(--sink)', c2: 'var(--brand)' }]
    ].map(([l, o]) => O(l, W(`<div class="syx-r" style="gap:22px">${['clock', 'shield', 'chat'].map(n => I(n, { s: 40, w: 2, ns: 1, ...o })).join('')}</div>`)))),
    Q('farg-mork', 'Vilken färg ska ikoner på mörk bakgrund ha?', [
      ['Vit', '#FFFFFF'], ['Ljusgrå', '#B8BCC2'], ['Ljus varumärkeston', '#A9C1DA']
    ].map(([l, c]) => O(l, W(grid({ c }), 'background:#1A1C1E')))),
    Q('farg-gra', 'Hur mörk ska den grå färgen för sekundära ikoner vara?', [
      ['Mörkgrå', '#5D6166'], ['Mellangrå', '#8A9099'], ['Ljusgrå', '#B0B5BA']
    ].map(([l, c]) => O(l, W(`<div class="stack" style="gap:8px;width:100%;max-width:240px">${[['Dokument.pdf', 'download'], ['Bild.jpg', 'download']].map(([t, n]) => `<div class="syx-l" style="justify-content:space-between;background:var(--box);border-radius:8px;padding:10px 12px"><span>${t}</span><span class="row" style="gap:12px;flex-wrap:nowrap">${I('edit', { s: 18, c })}${I(n, { s: 18, c })}${I('trash', { s: 18, c })}</span></div>`).join('')}</div>`))))
  ]});

  // =====================================================================
  // 7. Platta bakom ikonen
  // =====================================================================
  const SHAPE = { circle: '50%', rsq: '28%', sq: '3px', blob: '62% 38% 56% 44% / 44% 60% 40% 56%', none: '0' };
  function plate(n, o = {}) {
    const ps = o.ps || 48, is = o.is || Math.round(ps * 0.5), f = o.f || 'tint', sh = o.sh || 'circle';
    const br = o.br != null ? o.br : SHAPE[sh];
    let bg = 'transparent', col = 'var(--brand)', bd = '';
    if (f === 'solid') { bg = 'var(--brand)'; col = '#fff'; }
    else if (f === 'tint') bg = o.tint || 'var(--tint)';
    else if (f === 'line') { bd = `border:${o.bw || 1.5}px solid ${o.bc || 'var(--sline)'};`; bg = 'var(--box)'; }
    else if (f === 'tintline') { bg = o.tint || 'var(--tint)'; bd = `border:1.5px solid ${o.bc || 'rgba(36,64,94,.35)'};`; }
    if (sh === 'none') { bg = 'transparent'; bd = ''; }
    return `<span style="display:grid;place-items:center;flex:0 0 auto;width:${ps}px;height:${ps}px;border-radius:${br};background:${bg};color:${o.col || col};${bd}${o.ex || ''}">${I(n, { s: is, ...(o.io || {}) })}</span>`;
  }
  const plates = (o, names = ['clock', 'shield', 'chat', 'refresh'], gap = 12) => `<div class="syx-r" style="gap:${gap}px">${names.map(n => plate(n, o)).join('')}</div>`;
  const feat = (ic, t, d) => `<div class="syx-l" style="gap:14px;align-items:flex-start"><span style="flex:0 0 auto">${ic}</span><div class="stack" style="gap:2px;min-width:0"><b>${t}</b><span class="small muted">${d}</span></div></div>`;
  G.push({ key: 'platta', title: 'Platta bakom ikonen', questions: [
    Q('platta-form', 'Vilken form ska plattan bakom ikonen ha?', [
      ['Ingen platta', 'none'], ['Cirkel', 'circle'], ['Rundad fyrkant', 'rsq'], ['Fyrkant', 'sq'], ['Mjuk organisk form (blob)', 'blob']
    ].map(([l, sh]) => O(l, W(plates({ sh, ps: 46, is: 24 }))))),
    Q('platta-fyllning', 'Hur ska plattan vara fylld?', [
      ['Fylld i varumärkesfärg', 'solid'], ['Ljust tonad', 'tint'], ['Bara kant', 'line'], ['Tonad med kant', 'tintline']
    ].map(([l, f]) => O(l, W(plates({ f, ps: 46, is: 24, io: f === 'solid' ? {} : {} }))))),
    Q('platta-storlek', 'Hur stor ska plattan vara bredvid en rad med rubrik och text?', [40, 48, 56, 64].map(ps =>
      O(ps + ' px platta', W(`<div class="stack syx-w" style="gap:14px">${feat(plate('clock', { ps, is: 24 }), 'Snabb leverans', 'Skickas inom en dag.')}${feat(plate('shield', { ps, is: 24 }), 'Trygg betalning', 'Betala när varan kommit.')}</div>`, 'align-items:flex-start')))),
    Q('platta-andel', 'Hur stor ska ikonen vara inne i plattan?', [
      ['Ikon 40 % av plattan', 0.4], ['Ikon 50 % av plattan', 0.5], ['Ikon 60 % av plattan', 0.6]
    ].map(([l, k]) => O(l, W(plates({ ps: 56, is: Math.round(56 * k), io: { w: 2, ns: 1 } }, ['clock', 'shield', 'chat']))))),
    Q('platta-rundning', 'Hur rundad ska en fyrkantig platta vara?', [
      ['6 px rundning', '6px'], ['10 px rundning', '10px'], ['14 px rundning', '14px'], ['18 px rundning', '18px']
    ].map(([l, br]) => O(l, W(plates({ br, ps: 52, is: 26 }, ['clock', 'shield', 'chat']))))),
    Q('platta-ton', 'Hur stark ska tonen i en ljus platta vara?', [0.06, 0.12, 0.2].map(a =>
      O('Ton ' + Math.round(a * 100) + ' %', W(plates({ tint: `rgba(36,64,94,${a})`, ps: 48, is: 24 }))))),
    Q('platta-kant', 'Hur ska kanten på en platta med bara kant se ut?', [
      ['Tunn grå kant', 1, 'var(--sline)'], ['Tunn kant i varumärkesfärg', 1, 'var(--brand)'], ['Tjock grå kant', 2, 'rgba(26,28,30,.22)']
    ].map(([l, bw, bc]) => O(l, W(plates({ f: 'line', bw, bc, ps: 48, is: 24 }))))),
    Q('platta-fylld-ikon', 'Hur ska ikonen se ut på en fylld platta?', [
      ['Vit linjeikon', { c: '#fff' }], ['Vit fylld ikon', { c: '#fff', st: 'fill', k: 'var(--brand)' }], ['Ljust tonad linjeikon', { c: '#C9D6E4' }]
    ].map(([l, io]) => O(l, W(plates({ f: 'solid', ps: 48, is: 24, io })))) ),
    Q('platta-ikonstil', 'Vilken stil ska ikonen ha på en tonad platta?', [
      ['Linje', {}], ['Fylld', { st: 'fill', k: 'var(--tint)' }], ['Duotone', { st: 'duo', c2: 'var(--brand)', op: 0.22 }]
    ].map(([l, io]) => O(l, W(plates({ ps: 48, is: 24, io }))))),
    Q('platta-skugga', 'Ska en ljus platta ha skugga eller kant?', [
      ['Vit platta med skugga', 'background:#fff;box-shadow:0 2px 8px rgba(26,28,30,.12)'], ['Vit platta med kant', 'background:#fff;border:1px solid var(--sline)'], ['Tonad platta utan skugga', '']
    ].map(([l, ex]) => O(l, W(plates({ ps: 48, is: 24, ex, sh: 'rsq' }))))),
    Q('platta-kontakt', 'Hur ska ikonerna i en kontaktlista se ut?', [
      ['Bara ikonen', 'none'], ['Ikon i tonad cirkel', 'circle'], ['Ikon i tonad rundad fyrkant', 'rsq']
    ].map(([l, sh]) => O(l, W(`<div class="stack" style="gap:10px">${[['phone', '08-123 456 78'], ['mail', 'hej@exempel.se'], ['pin', 'Storgatan 12']].map(([n, t]) => `<div class="syx-l" style="gap:${sh === 'none' ? 10 : 12}px">${plate(n, { sh, ps: sh === 'none' ? 20 : 36, is: 18 })}<span>${t}</span></div>`).join('')}</div>`, 'align-items:flex-start')))),
    Q('platta-status', 'Hur ska ikonen i ett klart-meddelande se ut?', [
      ['Fylld grön cirkel, vit bock', plate('check', { ps: 40, is: 22, ex: 'background:var(--ok);color:#fff', io: { w: 2.5 } })],
      ['Ljusgrön cirkel, grön bock', plate('check', { ps: 40, is: 22, ex: 'background:#DDEFE3;color:var(--ok)', io: { w: 2.5 } })],
      ['Bock i cirkel utan platta', I('check-circle', { s: 26, c: 'var(--ok)' })]
    ].map(([l, ic]) => O(l, W(`<div class="panel syx-w" style="display:flex;gap:12px;align-items:center">${ic}<div class="stack" style="gap:0"><b>Bokningen är klar</b><span class="small muted">Vi har skickat en bekräftelse.</span></div></div>`))))
  ]});

  // =====================================================================
  // 8. Ikonspråk
  // =====================================================================
  G.push({ key: 'ikonsprak', title: 'Ikonspråk', questions: [
    Q('sprak-detalj', 'Hur detaljerade ska ikonerna vara?', [
      O('Enkla, få linjer', W(grid({ s: 32 }, SET8, 'gap:18px 22px'))),
      O('Detaljerade, fler linjer', W(grid({ s: 32 }, ['d-home', 'd-search', 'd-user', 'd-heart', 'd-bell', 'd-mail', 'd-calendar', 'd-settings'], 'gap:18px 22px')))
    ]),
    Q('sprak-geometrisk', 'Ska ikonerna vara geometriskt exakta eller handritade?', [
      O('Geometriska', W(grid({ s: 40 }, SET8, 'gap:18px 18px'))),
      O('Handritade', W(`<div class="syx-g" style="gap:18px 18px">${['h-home', 'h-search', 'h-user', 'h-heart', 'h-bell', 'h-mail', 'h-calendar', 'h-settings'].map(n => sketch(n, 40)).join('')}</div>`))
    ]),
    Q('sprak-perspektiv', 'Ska ikonerna ritas platt eller i perspektiv?', [
      O('Platt, rakt framifrån', W(row({ s: 44, w: 2, ns: 1 }, ['package', 'layers', 'doc'], 'gap:24px'))),
      O('Isometriskt perspektiv', W(row({ s: 44, w: 2, ns: 1 }, ['iso-box', 'iso-layers', 'iso-doc'], 'gap:24px')))
    ]),
    Q('sprak-oppna', 'Ska formerna vara slutna eller ha ett litet glapp?', [
      O('Slutna former', W(grid({ s: 32 }, ['home-plain', 'heart', 'bell', 'mail', 'calendar', 'chat-plain', 'bookmark', 'shield'], 'gap:18px 22px'))),
      O('Öppna former med glapp', W(grid({ s: 32, gap: 30 }, ['home-plain', 'heart', 'bell', 'mail', 'calendar', 'chat-plain', 'bookmark', 'shield'], 'gap:18px 22px')))
    ]),
    Q('sprak-forenkla', 'Ska ikonerna förenklas när de visas små (16 px)?', [
      O('Samma detaljer i 16 px', W(grid({ s: 16, w: 1.5, ns: 1 }, ['d-home', 'd-search', 'd-user', 'd-heart', 'd-bell', 'd-mail', 'd-calendar', 'd-settings'], 'gap:14px 20px'))),
      O('Förenklade i 16 px', W(grid({ s: 16, w: 1.5, ns: 1 }, SET8, 'gap:14px 20px')))
    ]),
    Q('sprak-grundform', 'Vilken grundform ska symboler i en ram ha?', [
      O('Runda ramar', W(grid({ s: 32 }, ['check-circle', 'x-circle', 'info', 'plus-circle', 'user-circle', 'download-circle', 'alert-circle', 'minus-circle'], 'gap:18px 22px'))),
      O('Fyrkantiga ramar', W(grid({ s: 32 }, ['check-square', 'x-square', 'info-square', 'plus-square', 'user-square', 'external-square', 'image', 'minus-square'], 'gap:18px 22px')))
    ])
  ]});

  // =====================================================================
  // 9. Specifika symboler
  // =====================================================================
  ICONS['more-v'] = ['e|circle cx="12" cy="5" r="DL"', 'e|circle cx="12" cy="12" r="DL"', 'e|circle cx="12" cy="19" r="DL"'];
  ICONS['more-circle'] = ['f|' + C95, 'd*|circle cx="7.8" cy="12" r="DR"', 'd*|circle cx="12" cy="12" r="DR"', 'd*|circle cx="16.2" cy="12" r="DR"'];
  const FAT = []; for (let i = 0; i < 10; i++) FAT.push(pt(-90 + i * 36, i % 2 ? 5.4 : 9.8, 12, 12.6));
  ICONS['star-fat'] = ['f|polygon points="' + FAT.join(' ') + '"'];
  ICONS['star-half-l'] = ['f|polygon points="' + starHalf + '"'];
  const symOpt = (name, o = {}, ctx = '') => W(`<div class="syx-r" style="gap:28px">${I(name, { s: 48, w: 2, ns: 1, ...o })}${I(name, { s: 24, ...o })}</div>` + (ctx ? `<div class="syx-l small" style="gap:6px">${I(name, { s: 18, ...o })}<span>${ctx}</span></div>` : ''), o.wrap || '');
  const symQ = (id, q, vars, ctx = '') => Q(id, q, vars.map(([l, n, o]) => O(l, symOpt(n, o || {}, ctx))));
  const RED = { c: 'var(--bad)' };

  G.push({ key: 'symboler-status', title: 'Symboler: status och tecken', questions: [
    symQ('sym-bock', 'Hur ska bocken se ut?', [['Ren bock', 'check'], ['Kort och bred bock', 'check-short'], ['Bock i cirkel', 'check-circle'], ['Bock i rundad fyrkant', 'check-square']], 'Sparat'),
    symQ('sym-kryss', 'Hur ska krysset för att stänga se ut?', [['Stort kryss', 'x'], ['Litet kryss', 'x-small'], ['Kryss i cirkel', 'x-circle'], ['Kryss i rundad fyrkant', 'x-square']], 'Stäng'),
    symQ('sym-info', 'Hur ska info-symbolen se ut?', [['i i cirkel', 'info'], ['Bara ett i', 'info-plain'], ['i i rundad fyrkant', 'info-square'], ['Fylld cirkel med i', 'info', { st: 'fill' }]], 'Mer information'),
    symQ('sym-varning', 'Hur ska varningssymbolen se ut?', [['Utropstecken i triangel', 'alert'], ['Utropstecken i cirkel', 'alert-circle'], ['Utropstecken i romb', 'alert-diamond'], ['Fylld triangel', 'alert', { st: 'fill' }]].map(v => [v[0], v[1], { c: 'var(--warn)', ...(v[2] || {}) }]), 'Få platser kvar'),
    symQ('sym-fel', 'Hur ska felsymbolen se ut?', [['Kryss i cirkel', 'x-circle', RED], ['Kryss i åttahörning', 'octagon', RED], ['Utropstecken i cirkel', 'alert-circle', RED], ['Utropstecken i åttahörning', 'octagon-alert', RED]], 'Något gick fel'),
    Q('sym-status-fylld', 'Ska statusikonerna i meddelanden vara fyllda eller linje?', [['Linje', { st: 'line' }], ['Fyllda', { st: 'fill' }], ['Duotone', { st: 'duo', op: 0.18 }]].map(([l, o]) =>
      O(l, W(`<div class="stack" style="gap:9px">${[['info', 'Leverans tar 2–3 dagar', 'var(--brand)'], ['alert', 'Få platser kvar', 'var(--warn)'], ['x-circle', 'Kortet nekades', 'var(--bad)'], ['check-circle', 'Bokningen är klar', 'var(--ok)']].map(([n, t, c]) => `<div class="syx-l" style="gap:10px">${I(n, { s: 22, c, ...o, c2: c })}<span>${t}</span></div>`).join('')}</div>`, 'align-items:flex-start')))),
    Q('sym-plusminus', 'Hur ska plus och minus i en antalsväljare se ut?', [['Rena tecken', 'plus', 'minus'], ['Tecken i cirkel', 'plus-circle', 'minus-circle'], ['Tecken i rundad fyrkant', 'plus-square', 'minus-square']].map(([l, p, m]) =>
      O(l, W(`<div class="row" style="gap:14px;flex-wrap:nowrap">${I(m, { s: 28 })}<b style="font-size:18px;min-width:18px;text-align:center">2</b>${I(p, { s: 28 })}</div>`)))),
    Q('sym-plus-lagg-till', 'Hur ska plus-symbolen för ”Lägg till” se ut?', [['Rent plus', 'plus'], ['Plus i cirkel', 'plus-circle'], ['Plus i fylld cirkel', 'plus-circle', { st: 'fill' }], ['Plus i rundad fyrkant', 'plus-square']].map(([l, n, o]) =>
      O(l, W(`<span class="link" style="display:inline-flex;align-items:center;gap:8px;text-decoration:none">${I(n, { s: 22, ...(o || {}) })}Lägg till adress</span>`))))
  ]});

  G.push({ key: 'symboler-handling', title: 'Symboler: handlingar', questions: [
    symQ('sym-sok', 'Hur ska förstoringsglaset för sök se ut?', [['Handtag nere till höger', 'search'], ['Handtag nere till vänster', 'search-left'], ['Litet glas, långt handtag', 'search-long'], ['Kraftigt handtag', 'search-thick']], 'Sök'),
    symQ('sym-meny', 'Hur ska menyikonen se ut?', [['Tre lika streck', 'menu'], ['Två streck', 'menu-2'], ['Kortare nedersta streck', 'menu-short'], ['Förskjutna streck', 'menu-right'], ['Tre punkter', 'menu-dots']], 'Meny'),
    symQ('sym-mer', 'Hur ska ikonen för ”fler val” se ut?', [['Tre punkter vågrätt', 'menu-dots'], ['Tre punkter lodrätt', 'more-v'], ['Tre punkter i cirkel', 'more-circle']], 'Fler val'),
    symQ('sym-filter', 'Hur ska filterikonen se ut?', [['Tratt', 'filter'], ['Vågräta reglage', 'sliders'], ['Lodräta reglage', 'sliders-v'], ['Allt kortare streck', 'filter-lines']], 'Filtrera'),
    symQ('sym-sortera', 'Hur ska sorteringsikonen se ut?', [['Pil upp och pil ner', 'sort'], ['Streck i fallande längd', 'sort-bars'], ['Två vinklar', 'sort-chev'], ['Pil med A–Z', 'sort-az']], 'Sortera'),
    symQ('sym-dela', 'Hur ska dela-ikonen se ut?', [['Tre punkter med linjer', 'share'], ['Pil upp ur ruta', 'share-box'], ['Böjd pil framåt', 'share-arrow'], ['Pappersflygplan', 'share-plane']], 'Dela'),
    symQ('sym-ladda-ner', 'Hur ska ikonen för att ladda ner se ut?', [['Pil ner i bricka', 'download'], ['Bara pil ner', 'download-plain'], ['Pil ner mot streck', 'download-line'], ['Pil i cirkel', 'download-circle'], ['Pil i moln', 'download-cloud']], 'Ladda ner'),
    symQ('sym-ladda-upp', 'Hur ska ikonen för uppladdning se ut?', [['Pil upp ur bricka', 'upload'], ['Pil upp från streck', 'upload-line'], ['Pil i cirkel', 'upload-circle'], ['Pil i moln', 'upload-cloud']], 'Ladda upp fil'),
    Q('sym-extern', 'Hur ska ikonen för extern länk se ut?', [['Pil ut ur ruta', 'external'], ['Diagonal pil', 'external-arrow'], ['Pil i ruta', 'external-square']].map(([l, n]) =>
      O(l, W(`<div class="syx-r" style="gap:28px">${I(n, { s: 48, w: 2, ns: 1 })}${I(n, { s: 24 })}</div><span class="link" style="display:inline-flex;align-items:center;gap:5px">Läs mer på webbplatsen${I(n, { s: 16, w: 2.25 })}</span>`)))),
    symQ('sym-redigera', 'Hur ska ikonen för att redigera se ut?', [['Penna', 'edit'], ['Penna med linje', 'edit-line'], ['Penna över ruta', 'edit-square'], ['Kantig penna', 'edit-pen']], 'Redigera'),
    symQ('sym-kopiera', 'Hur ska ikonen för att kopiera se ut?', [['Två rutor, bakre bruten', 'copy'], ['Två dokument', 'copy-docs'], ['Två hela överlappande rutor', 'copy-stack']], 'Kopiera'),
    symQ('sym-radera', 'Hur ska papperskorgen se ut?', [['Med lock och ränder', 'trash'], ['Med lock, utan ränder', 'trash-plain'], ['Rak hink med ränder', 'trash-bin'], ['Lock som lyfts', 'trash-lid']], 'Ta bort'),
    symQ('sym-installningar', 'Hur ska ikonen för inställningar se ut?', [['Kugghjul med 8 kuggar', 'settings'], ['Kugghjul med 6 kuggar', 'settings-6'], ['Reglage', 'sliders']], 'Inställningar'),
    symQ('sym-lank', 'Hur ska länkikonen se ut?', [['Kedja, diagonal', 'link'], ['Kedja, vågrät med streck', 'link-h'], ['Vågrät utan streck', 'link-h-open'], ['Två ringar', 'link-rings']], 'Kopiera länk'),
    Q('sym-oga', 'Vilket par ska visa och dölja lösenordet?', [
      ['Öga och överstruket öga', I('eye', { s: 20, c: 'var(--smuted)' }), I('eye-off', { s: 20, c: 'var(--smuted)' })],
      ['Öga och stängt öga', I('eye', { s: 20, c: 'var(--smuted)' }), I('eye-closed', { s: 20, c: 'var(--smuted)' })],
      ['Fyllt öga och överstruket', I('eye-round', { s: 20, c: 'var(--smuted)', st: 'fill' }), I('eye-off', { s: 20, c: 'var(--smuted)' })],
      ['Texten Visa och Dölj', '<span class="small" style="font-weight:600;color:var(--brand)">Visa</span>', '<span class="small" style="font-weight:600;color:var(--brand)">Dölj</span>']
    ].map(([l, a, b]) => O(l, W(`<div class="syx-w stack" style="gap:10px"><div class="inp" style="justify-content:space-between;gap:10px"><span>••••••••</span>${a}</div><div class="inp" style="justify-content:space-between;gap:10px"><span>hemligt123</span>${b}</div></div>`))))
  ]});

  const SC = '#D99A1E';
  const starW = (empty, s = 24) => {
    if (empty === 'outline') return I('star', { s, c: SC, w: 1.75 });
    if (empty === 'gray') return I('star', { s, st: 'fill', c: '#D5D8DC' });
    return I('star', { s, c: '#B0B5BA', w: 1.5 });
  };
  const halfStar = (empty, s = 24) => `<span style="position:relative;display:block;width:${s}px;height:${s}px">${starW(empty, s)}${I('star-half-l', { s, st: 'fill', c: SC, style: 'position:absolute;inset:0' })}</span>`;
  const full = (s = 24, c = SC) => I('star', { s, st: 'fill', c });
  G.push({ key: 'symboler-objekt', title: 'Symboler: objekt och personer', questions: [
    symQ('sym-anvandare', 'Hur ska användarikonen se ut?', [['Huvud och axlar', 'user'], ['Person i cirkel', 'user-circle'], ['Byst med sluten form', 'user-bust'], ['Person i rundad fyrkant', 'user-square']], 'Logga in'),
    symQ('sym-kundvagn', 'Vilken symbol ska användas för varukorgen?', [['Kundvagn', 'cart'], ['Kasse', 'bag'], ['Korg', 'basket']], 'Varukorg'),
    symQ('sym-hjarta', 'Hur ska hjärtat se ut?', [['Klassiskt hjärta', 'heart'], ['Runt och mjukt hjärta', 'heart-round'], ['Spetsigt, geometriskt hjärta', 'heart-sharp']], 'Spara'),
    Q('sym-stjarna-tom', 'Hur ska tomma stjärnor i ett betyg se ut?', [['Kontur i samma färg', 'outline'], ['Ljusgrå fylld', 'gray'], ['Ljusgrå kontur', 'light']].map(([l, e]) =>
      O(l, W(`<div class="row" style="gap:3px;flex-wrap:nowrap">${full()}${full()}${full()}${full()}${starW(e)}</div><span class="small muted">4 av 5</span>`)))),
    Q('sym-stjarna-halv', 'Hur ska ett halvt betyg (3,5) visas?', [
      O('Halvfylld stjärna', W(`<div class="row" style="gap:3px;flex-wrap:nowrap">${full()}${full()}${full()}${halfStar('gray')}${starW('gray')}</div><span class="small muted">3,5 av 5</span>`)),
      O('Halvfylld med kontur', W(`<div class="row" style="gap:3px;flex-wrap:nowrap">${full()}${full()}${full()}${halfStar('outline')}${starW('outline')}</div><span class="small muted">3,5 av 5</span>`)),
      O('En stjärna och siffra', W(`<div class="row" style="gap:6px;flex-wrap:nowrap">${full()}<b style="font-size:17px">3,5</b><span class="muted">(128)</span></div>`)),
      O('Avrundat till hela stjärnor', W(`<div class="row" style="gap:3px;flex-wrap:nowrap">${full()}${full()}${full()}${full()}${starW('gray')}</div><span class="small muted">3,5 av 5</span>`))
    ]),
    Q('sym-stjarna-form', 'Hur ska stjärnan vara formad?', [['Spetsiga uddar', 'star', { join: 'miter', cap: 'butt', w: 1 }], ['Rundade uddar', 'star', { w: 2.5 }], ['Bred och knubbig', 'star-fat', { w: 2 }]].map(([l, n, o]) =>
      O(l, W(`<div class="syx-r" style="gap:24px">${I(n, { s: 48, st: 'fill', c: SC, ...o })}${I(n, { s: 48, c: SC, ...o, w: Math.max(o.w, 1.5) })}</div><div class="row" style="gap:3px;flex-wrap:nowrap">${[1, 2, 3, 4, 5].map(() => I(n, { s: 20, st: 'fill', c: SC, ...o })).join('')}</div>`)))),
    Q('sym-stjarna-farg', 'Vilken färg ska betygsstjärnorna ha?', [['Gul', SC], ['Samma som texten', 'var(--sink)'], ['Varumärkesfärg', 'var(--brand)']].map(([l, c]) =>
      O(l, W(`<div class="row" style="gap:3px;flex-wrap:nowrap">${[1, 2, 3, 4].map(() => full(24, c)).join('')}${I('star', { s: 24, st: 'fill', c: '#D5D8DC' })}</div><span class="small muted">4 av 5</span>`)))),
    symQ('sym-plats', 'Hur ska platsmarkören se ut?', [['Nål med hål', 'pin'], ['Nål utan detalj', 'pin-plain'], ['Nål med fylld punkt', 'pin-dot'], ['Rund knappnål', 'pin-round']], 'Storgatan 12'),
    symQ('sym-telefon', 'Hur ska telefonikonen se ut?', [['Telefonlur', 'phone'], ['Lur med ljudvågor', 'phone-waves'], ['Mobiltelefon', 'mobile'], ['Lur i cirkel', 'phone-circle']], '08-123 456 78'),
    symQ('sym-mejl', 'Hur ska mejlikonen se ut?', [['Kuvert med flik', 'mail'], ['Kuvert med alla veck', 'mail-flap'], ['Öppet kuvert', 'mail-open'], ['Snabel-a', 'mail-at']], 'hej@exempel.se'),
    symQ('sym-klocka', 'Hur ska klockikonen se ut?', [['Två visare', 'clock'], ['Med timmarkeringar', 'clock-ticks'], ['Visare i rät vinkel', 'clock-plain']], 'Öppet 9–17'),
    symQ('sym-kalender', 'Hur ska kalenderikonen se ut?', [['Med ringar', 'calendar'], ['Med datumprickar', 'calendar-dots'], ['Med bock', 'calendar-check'], ['Utan ringar', 'calendar-plain']], 'Välj datum'),
    symQ('sym-hem', 'Hur ska hemikonen se ut?', [['Hus med dörr', 'home'], ['Hus utan dörr', 'home-plain'], ['Hus med skorsten', 'home-chimney'], ['Fristående tak', 'home-roof']], 'Startsida'),
    symQ('sym-las', 'Hur ska hänglåset se ut?', [['Rund bygel, streck', 'lock'], ['Kantig bygel', 'lock-square'], ['Rund bygel, nyckelhål', 'lock-keyhole']], 'Säker betalning'),
    symQ('sym-chatt', 'Hur ska chattikonen se ut?', [['Rund bubbla med punkter', 'chat'], ['Rund bubbla, tom', 'chat-plain'], ['Fyrkantig bubbla', 'chat-square'], ['Fyrkantig med textrader', 'chat-lines'], ['Två bubblor', 'chat-two']], 'Chatta med oss')
  ]});

  const SOC = [['so-cam', '#D6336C'], ['so-f', '#1877F2'], ['so-in', '#0A66C2']];
  const soc = (o) => `<div class="syx-r" style="gap:${o.gap || 14}px">${SOC.map(([n, col]) => {
    const c = o.color ? col : 'var(--sink)';
    if (!o.plate) return I(n, { s: o.s || 24, c, w: 2 });
    const ps = o.ps || 40, br = o.plate === 'circle' ? '50%' : o.plate === 'rsq' ? '28%' : '0';
    if (o.outline) return `<span style="display:grid;place-items:center;width:${ps}px;height:${ps}px;border-radius:${br};border:1.5px solid ${o.color ? col : 'var(--sline)'};color:${c}">${I(n, { s: Math.round(ps * 0.5), w: 2 })}</span>`;
    return `<span style="display:grid;place-items:center;width:${ps}px;height:${ps}px;border-radius:${br};background:${c};color:#fff">${I(n, { s: Math.round(ps * 0.5), w: 2, k: c })}</span>`;
  }).join('')}</div>`;
  G.push({ key: 'sociala', title: 'Sociala ikoner', questions: [
    Q('soc-farg', 'Ska sociala ikoner vara i en färg eller i nätverkens färger?', [
      ['Monokroma', { plate: 'circle' }], ['I nätverkens färger', { plate: 'circle', color: 1 }], ['Monokroma utan platta', {}], ['Färg utan platta', { color: 1 }]
    ].map(([l, o]) => O(l, W(soc(o))))),
    Q('soc-form', 'Vilken form ska plattan bakom sociala ikoner ha?', [
      ['Ingen platta', {}], ['Fylld cirkel', { plate: 'circle' }], ['Fylld rundad fyrkant', { plate: 'rsq' }], ['Cirkel med kant', { plate: 'circle', outline: 1 }]
    ].map(([l, o]) => O(l, W(soc(o))))),
    Q('soc-storlek', 'Hur stora ska sociala ikoner i sidfoten vara?', [20, 24, 32].map(s =>
      O(s + ' px i sidfoten', W(`<div class="syx-w stack" style="gap:12px;background:#1A1C1E;color:#fff;border-radius:12px;padding:18px"><span class="small" style="opacity:.7">Följ oss</span><div class="row" style="gap:16px">${SOC.map(([n]) => I(n, { s, w: 2, ns: 1, c: '#fff', k: '#1A1C1E' })).join('')}</div></div>`))))
  ]});

  // =====================================================================
  // 10. Ikon och text bredvid varandra
  // =====================================================================
  G.push({ key: 'ikon-och-text', title: 'Ikon och text bredvid varandra', questions: [
    Q('it-avstand', 'Hur stort ska avståndet mellan ikon och text vara?', [4, 6, 8, 12].map(g =>
      O(g + ' px avstånd', W(`<div class="stack" style="gap:10px">${ROWS3.map(([n, t]) => `<div class="syx-l" style="gap:${g}px">${I(n, { s: 20 })}<span>${t}</span></div>`).join('')}</div>`, 'align-items:flex-start')))),
    Q('it-linjering', 'Hur ska en ikon linjeras mot en textrad bredvid?', [
      ['Centrerad mot texten', 'align-items:center', ''], ['Överkanterna i linje', 'align-items:flex-start', ''], ['Ikonen vilar på baslinjen', 'align-items:flex-end', 'margin-bottom:4px']
    ].map(([l, al, m]) => O(l, W(`<div class="stack" style="gap:12px">${[['clock', 'Öppet 9–17'], ['pin', 'Storgatan 12']].map(([n, t]) => `<div style="display:flex;gap:8px;${al}">${I(n, { s: 24, style: m })}<span style="font-size:16px;line-height:1.3">${t}</span></div>`).join('')}</div>`, 'align-items:flex-start')))),
    Q('it-flerrad', 'Var ska ikonen sitta när texten bredvid är två rader?', [
      ['I linje med första raden', 'align-items:flex-start', 'margin-top:1px', 'row'], ['Centrerad mot hela texten', 'align-items:center', '', 'row'], ['Ovanför texten', 'flex-direction:column;align-items:flex-start', '', 'col']
    ].map(([l, al, m]) => O(l, W(`<div class="stack syx-w" style="gap:16px;max-width:240px">${[['shield', 'Betala först när varan har kommit fram till dig'], ['refresh', 'Fri retur i 30 dagar från leveransdagen']].map(([n, t]) => `<div style="display:flex;gap:10px;${al}">${I(n, { s: 20, style: m })}<span style="min-width:0">${t}</span></div>`).join('')}</div>`, 'align-items:flex-start')))),
    Q('it-rubrik-avstand', 'Hur stort ska avståndet mellan ikon och rubrik vara?', [8, 12, 16].map(g =>
      O(g + ' px till rubriken', W(`<div class="stack" style="gap:12px">${[['shield', 'Trygg betalning'], ['refresh', 'Fri retur']].map(([n, t]) => `<div class="syx-l" style="gap:${g}px">${I(n, { s: 24 })}<span class="h h3">${t}</span></div>`).join('')}</div>`, 'align-items:flex-start')))),
    Q('it-sida', 'Ska ikonen i en textlänk stå före eller efter texten?', [
      O('Ikonen före texten', W(`<div class="stack" style="gap:10px">${[['download', 'Ladda ner prislista'], ['mail', 'Skicka ett mejl']].map(([n, t]) => `<span class="link" style="display:inline-flex;align-items:center;gap:6px">${I(n, { s: 18 })}${t}</span>`).join('')}</div>`, 'align-items:flex-start')),
      O('Ikonen efter texten', W(`<div class="stack" style="gap:10px">${[['download', 'Ladda ner prislista'], ['mail', 'Skicka ett mejl']].map(([n, t]) => `<span class="link" style="display:inline-flex;align-items:center;gap:6px">${t}${I(n, { s: 18 })}</span>`).join('')}</div>`, 'align-items:flex-start'))
    ]),
    Q('it-meta-avstand', 'Hur långt ska det vara mellan flera ikon-och-text-par på samma rad?', [12, 16, 24].map(g =>
      O(g + ' px mellan paren', W(`<div class="row small" style="gap:${g}px;color:var(--smuted)">${[['clock', '45 min'], ['pin', 'Centrum'], ['user', '2 pers']].map(([n, t]) => `<span class="syx-l" style="gap:5px">${I(n, { s: 16 })}${t}</span>`).join('')}</div>`))))
  ]});

  // =====================================================================
  // 11. Ikoner i listor
  // =====================================================================
  const LI = ['Fri frakt över 500 kr', 'Öppet köp i 30 dagar', 'Svar inom en dag'];
  const mk = {
    'cirkel': plate('check', { ps: 20, is: 12, f: 'solid', io: { w: 3 } }),
    'ljus': plate('check', { ps: 20, is: 12, io: { w: 3 } }),
    'bock': I('check', { s: 18, w: 2.5, c: 'var(--brand)' }),
    'punkt': '<span style="display:block;width:6px;height:6px;border-radius:50%;background:var(--brand);margin:0 6px"></span>',
    'streck': '<span style="display:block;width:10px;height:2px;border-radius:2px;background:var(--brand);margin:0 4px"></span>'
  };
  const ulist = (m, items = LI, gap = 10) => `<div class="stack" style="gap:9px">${items.map(t => `<div class="syx-l" style="gap:${gap}px"><span style="display:grid;place-items:center;width:20px;flex:0 0 auto">${m}</span><span>${t}</span></div>`).join('')}</div>`;
  G.push({ key: 'listor', title: 'Ikoner i listor', questions: [
    Q('lista-markor', 'Vilken markör ska en punktlista med fördelar ha?', [
      ['Bock i fylld cirkel', 'cirkel'], ['Bock i ljus cirkel', 'ljus'], ['Ren bock', 'bock'], ['Punkt', 'punkt'], ['Kort streck', 'streck']
    ].map(([l, k]) => O(l, W(ulist(mk[k]), 'align-items:flex-start')))),
    Q('lista-bockcirkel', 'Hur ska cirkeln runt bocken i en lista se ut?', [
      ['Fylld cirkel, vit bock', plate('check', { ps: 20, is: 12, f: 'solid', io: { w: 3 } })],
      ['Ljust tonad cirkel', plate('check', { ps: 20, is: 12, io: { w: 3 } })],
      ['Cirkel med kant', I('check-circle', { s: 20, c: 'var(--brand)' })]
    ].map(([l, m]) => O(l, W(ulist(m), 'align-items:flex-start')))),
    Q('lista-negativ', 'Hur ska det som inte ingår visas i en jämförelselista?', [
      ['Grått kryss', I('x', { s: 16, w: 2.5, c: GRAY }), ''], ['Grått streck', I('minus', { s: 16, w: 2.5, c: GRAY }), ''], ['Rött kryss', I('x', { s: 16, w: 2.5, c: 'var(--bad)' }), ''], ['Grå överstruken text', '', 'text-decoration:line-through;']
    ].map(([l, ic, td]) => O(l, W(`<div class="stack" style="gap:9px">${LI.map((t, i) => `<div class="syx-l" style="gap:10px"><span style="display:grid;place-items:center;width:20px;flex:0 0 auto">${i < 2 ? mk.bock : ic}</span><span style="${i < 2 ? '' : td + 'color:var(--smuted)'}">${t}</span></div>`).join('')}</div>`, 'align-items:flex-start')))),
    Q('lista-olika', 'Ska varje rad i en fördelslista ha en egen ikon eller samma bock?', [
      O('Samma bock på alla rader', W(ulist(mk.bock), 'align-items:flex-start')),
      O('En egen ikon per rad', W(`<div class="stack" style="gap:9px">${[['package', LI[0]], ['refresh', LI[1]], ['chat', LI[2]]].map(([n, t]) => `<div class="syx-l" style="gap:10px">${I(n, { s: 20, c: 'var(--brand)' })}<span>${t}</span></div>`).join('')}</div>`, 'align-items:flex-start'))
    ]),
    Q('lista-kontakt', 'Ska kontaktuppgifter märkas med ikoner eller med ord?', [
      O('Ikoner', W(lines(20, [['phone', '08-123 456 78'], ['mail', 'hej@exempel.se'], ['pin', 'Storgatan 12']], 'gap:10px'), 'align-items:flex-start')),
      O('Ord som etikett', W(`<div class="stack" style="gap:8px">${[['Telefon', '08-123 456 78'], ['E-post', 'hej@exempel.se'], ['Adress', 'Storgatan 12']].map(([a, b]) => `<div><span class="small muted" style="display:inline-block;width:62px">${a}</span>${b}</div>`).join('')}</div>`, 'align-items:flex-start')),
      O('Både ikon och ord', W(`<div class="stack" style="gap:10px">${[['phone', 'Telefon', '08-123 456 78'], ['mail', 'E-post', 'hej@exempel.se']].map(([n, a, b]) => `<div class="syx-l" style="gap:10px;align-items:flex-start">${I(n, { s: 20, style: 'margin-top:2px' })}<div class="stack" style="gap:0"><span class="small muted">${a}</span><span>${b}</span></div></div>`).join('')}</div>`, 'align-items:flex-start'))
    ])
  ]});

  // =====================================================================
  // 12. Ikoner i knappar
  // =====================================================================
  G.push({ key: 'ikoner-i-knappar', title: 'Ikoner i knappar', questions: [
    Q('knapp-primar', 'Ska primärknappen ha en ikon?', [
      O('Utan ikon', W(`<div class="stack" style="gap:12px;align-items:center"><span class="muted small">Välj en tid som passar dig</span>${btn('Boka tid')}</div>`)),
      O('Med ikon', W(`<div class="stack" style="gap:12px;align-items:center"><span class="muted small">Välj en tid som passar dig</span>${btn(I('calendar', { s: 20 }) + 'Boka tid')}</div>`))
    ]),
    Q('knapp-sida', 'På vilken sida av texten ska ikonen i en knapp sitta?', [
      O('Ikonen till vänster', W(`<div class="syx-r">${btn(I('download', { s: 20 }) + 'Ladda ner')}${btn2(I('share-box', { s: 20 }) + 'Dela')}</div>`)),
      O('Ikonen till höger', W(`<div class="syx-r">${btn('Ladda ner' + I('download', { s: 20 }))}${btn2('Dela' + I('share-box', { s: 20 }))}</div>`))
    ]),
    Q('knapp-ikonknapp', 'Hur ska en knapp med bara en ikon se ut?', [
      ['Cirkel', 'border-radius:50%;background:var(--tint);color:var(--brand)'], ['Rundad fyrkant', 'border-radius:10px;background:var(--tint);color:var(--brand)'], ['Cirkel med kant', 'border-radius:50%;border:1px solid var(--sline);background:var(--box)'], ['Ingen bakgrund', '']
    ].map(([l, st]) => O(l, W(`<div class="row" style="gap:10px;justify-content:center">${['heart', 'share-box', 'x'].map(n => ibtn(I(n, { s: 20 }), st)).join('')}</div>`)))),
    Q('knapp-sekundar-etikett', 'Ska små åtgärdsknappar ha text eller bara ikon?', [
      O('Bara ikon', W(`<div class="row" style="gap:8px;justify-content:center">${['share-box', 'heart', 'copy'].map(n => ibtn(I(n, { s: 20 }), 'border:1px solid var(--sline);background:var(--box)')).join('')}</div>`)),
      O('Ikon och text', W(`<div class="row" style="gap:8px;justify-content:center">${[['share-box', 'Dela'], ['heart', 'Spara'], ['copy', 'Kopiera']].map(([n, t]) => `<span style="display:inline-flex;align-items:center;gap:6px;height:40px;padding:0 12px;border-radius:10px;border:1px solid var(--sline);background:var(--box);font-size:14px;font-weight:600">${I(n, { s: 18 })}${t}</span>`).join('')}</div>`)),
      O('Ikon med text under', W(`<div class="row" style="gap:16px;justify-content:center">${[['share-box', 'Dela'], ['heart', 'Spara'], ['copy', 'Kopiera']].map(([n, t]) => `<span style="display:flex;flex-direction:column;align-items:center;gap:4px;font-size:12px;font-weight:600">${ibtn(I(n, { s: 20 }), 'border:1px solid var(--sline);background:var(--box)')}${t}</span>`).join('')}</div>`))
    ]),
    Q('knapp-gap', 'Hur stort ska avståndet mellan ikon och text i en knapp vara?', [6, 8, 10, 12].map(g =>
      O(g + ' px i knappen', W(`<div class="syx-r">${btn(I('download', { s: 20 }) + 'Ladda ner', 'gap:' + g + 'px')}${btn2(I('calendar', { s: 20 }) + 'Boka tid', 'gap:' + g + 'px')}</div>`)))),
    Q('knapp-ikonfarg', 'Ska ikonen i en fylld knapp ha samma färg som texten?', [
      O('Samma färg som texten', W(`<div class="syx-r">${btn(I('download', { s: 20 }) + 'Ladda ner')}${btn(I('calendar', { s: 20 }) + 'Boka tid')}</div>`)),
      O('Lite ljusare än texten', W(`<div class="syx-r">${btn(I('download', { s: 20, style: 'opacity:.7' }) + 'Ladda ner')}${btn(I('calendar', { s: 20, style: 'opacity:.7' }) + 'Boka tid')}</div>`))
    ]),
    Q('knapp-liten', 'Ska små knappar (36 px höga) ha en ikon?', [
      O('Utan ikon', W(`<div class="syx-r">${btn('Lägg till', 'height:36px;padding:0 14px;font-size:14px')}${btn2('Filtrera', 'height:36px;padding:0 14px;font-size:14px')}</div>`)),
      O('Med ikon', W(`<div class="syx-r">${btn(I('plus', { s: 16, w: 2.25 }) + 'Lägg till', 'height:36px;padding:0 14px;font-size:14px;gap:6px')}${btn2(I('filter', { s: 16, w: 2 }) + 'Filtrera', 'height:36px;padding:0 14px;font-size:14px;gap:6px')}</div>`))
    ])
  ]});

  // =====================================================================
  // 13. Ikoner i navigering
  // =====================================================================
  const navItems = [['home', 'Hem'], ['package', 'Tjänster'], ['user', 'Om oss'], ['mail', 'Kontakt']];
  G.push({ key: 'ikoner-i-navigering', title: 'Ikoner i navigering', questions: [
    Q('nav-toppmeny', 'Ska länkarna i toppmenyn ha ikoner?', [
      O('Bara text', W(`<div class="row" style="gap:18px;font-size:14px;font-weight:600;justify-content:center">${navItems.map(([, t]) => `<span>${t}</span>`).join('')}</div>`)),
      O('Ikon och text', W(`<div class="row" style="gap:16px;font-size:14px;font-weight:600;justify-content:center">${navItems.map(([n, t]) => `<span class="syx-l" style="gap:6px">${I(n, { s: 18 })}${t}</span>`).join('')}</div>`))
    ]),
    Q('nav-tabbar', 'Vad ska tabbaren i mobilen visa?', [
      O('Ikon och text', W(tabbar((n, a) => I(n, { st: a ? 'fill' : 'line' })))),
      O('Bara ikon', W(`<div class="syx-w" style="display:flex;justify-content:space-around;background:var(--box);border:1px solid var(--sline);padding:14px 4px;border-radius:14px">${['home', 'search', 'heart', 'user'].map((n, i) => I(n, { st: i ? 'line' : 'fill', style: i ? 'color:var(--smuted)' : '' })).join('')}</div>`)),
      O('Bara text', W(`<div class="syx-w" style="display:flex;justify-content:space-around;background:var(--box);border:1px solid var(--sline);padding:14px 4px;border-radius:14px;font-size:13px">${['Hem', 'Sök', 'Sparat', 'Profil'].map((t, i) => `<span style="font-weight:${i ? 500 : 700};color:${i ? 'var(--smuted)' : 'var(--sink)'}">${t}</span>`).join('')}</div>`))
    ]),
    Q('nav-sidomeny', 'Ska sidomenyn ha ikoner?', [
      ['Ikon och text', (n, a) => I(n, { s: 20 }), true], ['Bara text', null, true]
    ].map(([l, f]) => O(l, W(f ? sideMenu(f) : sideMenu(() => ''))))),
    Q('nav-header-hoger', 'Hur ska åtgärderna uppe till höger i sidhuvudet visas?', [
      ['Bara ikoner', 'i'], ['Bara text', 't'], ['Ikon med text', 'it']
    ].map(([l, m]) => O(l, W(`<div class="syx-w" style="display:flex;align-items:center;justify-content:space-between;gap:10px;background:var(--box);border-radius:12px;padding:12px 14px"><b>Logo</b><div class="row" style="gap:14px;flex-wrap:nowrap;font-size:13px;font-weight:600">${[['search', 'Sök'], ['user', 'Konto'], ['cart', 'Korg']].map(([n, t]) => m === 'i' ? I(n, { s: 22 }) : m === 't' ? `<span>${t}</span>` : `<span class="syx-l" style="gap:4px">${I(n, { s: 18 })}${t}</span>`).join('')}</div></div>`)))),
    Q('nav-menyknapp', 'Hur ska menyknappen i mobilen se ut?', [
      ['Bara ikon', I('menu', { s: 24 })], ['Ikon och ordet Meny', `<span class="syx-l" style="gap:6px;font-weight:600;font-size:14px">${I('menu', { s: 22 })}Meny</span>`], ['Bara ordet Meny', '<span style="font-weight:600;font-size:14px">Meny</span>']
    ].map(([l, m]) => O(l, W(`<div class="syx-w" style="display:flex;align-items:center;justify-content:space-between;gap:10px;background:var(--box);border-radius:12px;padding:14px 16px"><b>Logo</b>${m}</div>`)))),
    Q('nav-markning', 'Hur ska antalet varor visas på varukorgsikonen?', [
      ['Siffra i liten cirkel', 'num'], ['Bara en prick', 'dot'], ['Siffra bredvid ikonen', 'side'], ['Siffra i större bricka', 'pill']
    ].map(([l, m]) => O(l, W(`<div class="row" style="gap:26px;justify-content:center">${['cart', 'bell'].map(n => {
      const ic = I(n, { s: 26 });
      if (m === 'side') return `<span class="syx-l" style="gap:4px;font-weight:700;font-size:14px">${ic}3</span>`;
      if (m === 'dot') return `<span style="position:relative;display:block">${ic}<span style="position:absolute;top:0;right:-1px;width:9px;height:9px;border-radius:50%;background:var(--bad);border:2px solid var(--ground)"></span></span>`;
      const big = m === 'pill';
      return `<span style="position:relative;display:block">${ic}<span style="position:absolute;top:${big ? -10 : -5}px;right:${big ? -15 : -7}px;min-width:${big ? 20 : 16}px;height:${big ? 20 : 16}px;padding:0 4px;border-radius:999px;background:var(--bad);color:#fff;font-size:${big ? 12 : 10}px;font-weight:700;display:grid;place-items:center;border:2px solid var(--ground);box-sizing:content-box;line-height:1">3</span></span>`;
    }).join('')}</div>`)))),
    Q('nav-rullgardin', 'Ska raderna i en rullgardinsmeny ha ikoner?', [
      O('Bara text', W(`<div class="panel syx-w stack" style="gap:2px;padding:6px;max-width:220px;box-shadow:0 4px 16px rgba(0,0,0,.08)">${['Min profil', 'Inställningar', 'Logga ut'].map(t => `<span style="padding:8px 10px;font-size:14px">${t}</span>`).join('')}</div>`)),
      O('Ikon och text', W(`<div class="panel syx-w stack" style="gap:2px;padding:6px;max-width:220px;box-shadow:0 4px 16px rgba(0,0,0,.08)">${[['user', 'Min profil'], ['settings', 'Inställningar'], ['external-arrow', 'Logga ut']].map(([n, t]) => `<span class="syx-l" style="gap:10px;padding:8px 10px;font-size:14px">${I(n, { s: 18, c: 'var(--smuted)' })}${t}</span>`).join('')}</div>`))
    ])
  ]});

  // =====================================================================
  // 14. Ikoner i funktionsrutnät
  // =====================================================================
  const FEAT = [['clock', 'Snabb leverans', 'Skickas inom en dag.'], ['shield', 'Trygg betalning', 'Betala när varan kommit.'], ['chat', 'Personlig service', 'Svar inom en timme.']];
  const fgrid = (icf, o = {}) => `<div class="stack syx-w" style="gap:20px;max-width:250px">${FEAT.slice(0, 2).map(([n, t, d]) => o.side
    ? `<div class="syx-l" style="gap:14px;align-items:flex-start">${icf(n)}<div class="stack" style="gap:2px;min-width:0"><b>${t}</b><span class="small muted">${d}</span></div></div>`
    : `<div class="stack" style="gap:10px;align-items:${o.center ? 'center;text-align:center' : 'flex-start'}">${icf(n)}<div class="stack" style="gap:2px;align-items:inherit"><b>${t}</b><span class="small muted">${d}</span></div></div>`).join('')}</div>`;
  G.push({ key: 'funktionsrutnat', title: 'Ikoner i funktionsrutnät', questions: [
    Q('rut-storlek', 'Hur stora ska ikonerna i ett funktionsrutnät vara?', [24, 32, 48].map(s =>
      O(s + ' px ikoner', W(fgrid(n => I(n, { s, w: 2, ns: 1, c: 'var(--brand)' })), 'align-items:flex-start')))),
    Q('rut-placering', 'Ska ikonen stå ovanför eller bredvid texten?', [
      O('Ovanför texten', W(fgrid(n => I(n, { s: 32, c: 'var(--brand)' })), 'align-items:flex-start')),
      O('Bredvid texten', W(fgrid(n => I(n, { s: 32, c: 'var(--brand)' }), { side: 1 }), 'align-items:flex-start'))
    ]),
    Q('rut-justering', 'Ska ikon och text i rutnätet vara vänsterställda eller centrerade?', [
      O('Vänsterställda', W(fgrid(n => I(n, { s: 32, c: 'var(--brand)' })), 'align-items:flex-start')),
      O('Centrerade', W(fgrid(n => I(n, { s: 32, c: 'var(--brand)' }), { center: 1 })))
    ]),
    Q('rut-platta', 'Ska ikonerna i rutnätet stå på en platta?', [
      ['Ingen platta', n => I(n, { s: 32, c: 'var(--brand)' })], ['Tonad cirkel', n => plate(n, { ps: 52, is: 26 })], ['Tonad rundad fyrkant', n => plate(n, { ps: 52, is: 26, sh: 'rsq' })], ['Fylld rundad fyrkant', n => plate(n, { ps: 52, is: 26, sh: 'rsq', f: 'solid' })]
    ].map(([l, f]) => O(l, W(fgrid(f), 'align-items:flex-start')))),
    Q('rut-stil', 'Vilken stil ska ikonerna i rutnätet ha?', [
      ['Linje', {}], ['Duotone', { st: 'duo', c2: 'var(--brand)', op: 0.2 }], ['Fylld', { st: 'fill' }], ['Tvåfärgad', { st: 'two', c: 'var(--sink)', c2: 'var(--brand)' }]
    ].map(([l, o]) => O(l, W(fgrid(n => I(n, { s: 36, w: 2, ns: 1, c: 'var(--brand)', ...o })), 'align-items:flex-start'))))
  ]});

  // =====================================================================
  // 15. Animerade ikoner
  // =====================================================================
  const RM = (cls) => `@media (prefers-reduced-motion: reduce){.${cls},.${cls} svg,.${cls} path,.${cls} span,.${cls} i{animation:none!important}}`;
  const CHK = (cls) => `<svg class="ico ${cls}" viewBox="0 0 24 24" fill="none" stroke="var(--ok)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="width:56px;height:56px;display:block"><circle cx="12" cy="12" r="9.5"/><path d="m8 12.3 2.8 2.8 5.4-5.5" pathLength="1" stroke-dasharray="1"/></svg>`;
  G.push({ key: 'animerade-ikoner', title: 'Animerade ikoner', questions: [
    Q('anim-grund', 'Ska ikoner som vill ha uppmärksamhet röra sig?', [
      O('Stilla ikon', W(`<div class="syx-r" style="gap:22px">${I('bell', { s: 36 })}${I('cart', { s: 36 })}</div><span class="small muted">Ny notis</span>`)),
      O('Kort rörelse ibland', W(`<style>.sya1 svg{animation:sya1w 2.6s ease-in-out infinite;transform-origin:50% 12%}@keyframes sya1w{0%,58%,100%{transform:rotate(0)}64%{transform:rotate(14deg)}70%{transform:rotate(-11deg)}76%{transform:rotate(7deg)}82%{transform:rotate(-4deg)}88%{transform:rotate(0)}}${RM('sya1')}</style><div class="syx-r sya1" style="gap:22px">${I('bell', { s: 36 })}${I('cart', { s: 36 })}</div><span class="small muted">Ny notis</span>`))
    ]),
    Q('anim-klar', 'Hur ska bocken visas när något är klart?', [
      O('Visas direkt', W(`${CHK('syb0')}<b>Klart!</b>`)),
      O('Ritas fram', W(`<style>.syb1 path{animation:syb1d 2.4s ease-out infinite}@keyframes syb1d{0%,10%{stroke-dashoffset:1}45%,100%{stroke-dashoffset:0}}${RM('syb1')}</style>${CHK('syb1')}<b>Klart!</b>`)),
      O('Poppar upp', W(`<style>.syb2{animation:syb2p 2.4s ease-out infinite}@keyframes syb2p{0%,10%{transform:scale(.4);opacity:0}28%{transform:scale(1.12);opacity:1}38%,100%{transform:scale(1)}}${RM('syb2')}</style>${CHK('syb2')}<b>Klart!</b>`))
    ]),
    Q('anim-hjarta', 'Hur ska hjärtat reagera när man sparar en favorit?', [
      O('Byts direkt', W(`<style>.syc0 .on{animation:syc0s 2.4s steps(1) infinite}@keyframes syc0s{0%{opacity:0}50%{opacity:1}}${RM('syc0')}</style><span class="syc0" style="position:relative;display:block;width:40px;height:40px">${I('heart', { s: 40 })}<span class="on" style="position:absolute;inset:0">${I('heart', { s: 40, st: 'fill', c: '#C7362F' })}</span></span>`)),
      O('Studsar till', W(`<style>.syc1 .on{animation:syc1s 2.4s ease-out infinite}@keyframes syc1s{0%,45%{opacity:0;transform:scale(.3)}60%{opacity:1;transform:scale(1.25)}72%,100%{opacity:1;transform:scale(1)}}${RM('syc1')}</style><span class="syc1" style="position:relative;display:block;width:40px;height:40px">${I('heart', { s: 40 })}<span class="on" style="position:absolute;inset:0">${I('heart', { s: 40, st: 'fill', c: '#C7362F' })}</span></span>`)),
      O('Tonar in mjukt', W(`<style>.syc2 .on{animation:syc2s 2.4s ease-in-out infinite}@keyframes syc2s{0%,30%{opacity:0}60%,100%{opacity:1}}${RM('syc2')}</style><span class="syc2" style="position:relative;display:block;width:40px;height:40px">${I('heart', { s: 40 })}<span class="on" style="position:absolute;inset:0">${I('heart', { s: 40, st: 'fill', c: '#C7362F' })}</span></span>`))
    ]),
    Q('anim-meny', 'Hur ska menyikonen bli ett kryss när menyn öppnas?', [
      O('Byts direkt', W(`<style>.syd0{position:relative;width:32px;height:32px}.syd0 span{position:absolute;inset:0}.syd0 .b{animation:syd0s 3s steps(1) infinite}@keyframes syd0s{0%{opacity:0}50%{opacity:1}}.syd0 .a{animation:syd0t 3s steps(1) infinite}@keyframes syd0t{0%{opacity:1}50%{opacity:0}}${RM('syd0')}</style><div class="syd0"><span class="a">${I('menu', { s: 32 })}</span><span class="b">${I('x', { s: 32 })}</span></div>`)),
      O('Strecken glider ihop till kryss', W(`<style>.syd1{position:relative;width:32px;height:32px}.syd1 i{position:absolute;left:5px;right:5px;height:2.7px;border-radius:2px;background:currentColor}.syd1 i:nth-child(1){top:7.5px;animation:syd1a 3s ease-in-out infinite}.syd1 i:nth-child(2){top:14.7px;animation:syd1b 3s ease-in-out infinite}.syd1 i:nth-child(3){top:21.8px;animation:syd1c 3s ease-in-out infinite}@keyframes syd1a{0%,30%,100%{transform:none}50%,80%{transform:translateY(7.2px) rotate(45deg)}}@keyframes syd1b{0%,30%,100%{opacity:1}45%,85%{opacity:0}}@keyframes syd1c{0%,30%,100%{transform:none}50%,80%{transform:translateY(-7.1px) rotate(-45deg)}}${RM('syd1')}</style><div class="syd1"><i></i><i></i><i></i></div>`))
    ]),
    Q('anim-funktion', 'Ska ikonerna i ett funktionsrutnät röra sig?', [
      O('Stilla', W(`<div class="syx-r" style="gap:22px">${['clock', 'shield', 'chat'].map(n => I(n, { s: 40, c: 'var(--brand)' })).join('')}</div>`)),
      O('Svävar lätt', W(`<style>.sye1 svg{animation:sye1f 3s ease-in-out infinite}.sye1 svg:nth-child(2){animation-delay:.4s}.sye1 svg:nth-child(3){animation-delay:.8s}@keyframes sye1f{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}${RM('sye1')}</style><div class="syx-r sye1" style="gap:22px">${['clock', 'shield', 'chat'].map(n => I(n, { s: 40, c: 'var(--brand)' })).join('')}</div>`)),
      O('Ritas fram en gång', W(`<style>.sye2 svg circle,.sye2 svg path{stroke-dasharray:100;animation:sye2d 3.2s ease-out infinite}@keyframes sye2d{0%{stroke-dashoffset:100}45%,100%{stroke-dashoffset:0}}${RM('sye2')}</style><div class="syx-r sye2" style="gap:22px">${['clock', 'shield', 'chat'].map(n => I(n, { s: 40, c: 'var(--brand)' }).replace(/\/>/g, ' pathLength="100"/>')).join('')}</div>`))
    ])
  ]});

  // =====================================================================
  // 16. Emoji som ikon
  // =====================================================================
  const EM = s => `<span style="font-size:${s}px;line-height:1;display:inline-block;width:${Math.round(s * 1.15)}px;text-align:center;flex:0 0 auto" aria-hidden="true">`;
  G.push({ key: 'emoji', title: 'Emoji som ikon', questions: [
    Q('emoji-lista', 'Får emoji användas som markör i listor?', [
      O('Ritad bock', W(ulist(mk.bock), 'align-items:flex-start')),
      O('Emoji-bock', W(`<div class="stack" style="gap:9px">${LI.map(t => `<div class="syx-l" style="gap:8px">${EM(16)}✅</span><span>${t}</span></div>`).join('')}</div>`, 'align-items:flex-start')),
      O('Olika emoji per rad', W(`<div class="stack" style="gap:9px">${[['📦', LI[0]], ['🔄', LI[1]], ['💬', LI[2]]].map(([e, t]) => `<div class="syx-l" style="gap:8px">${EM(16)}${e}</span><span>${t}</span></div>`).join('')}</div>`, 'align-items:flex-start'))
    ]),
    Q('emoji-funktion', 'Får emoji ersätta ikoner i ett funktionsrutnät?', [
      O('Ritade ikoner', W(fgrid(n => I(n, { s: 32, c: 'var(--brand)' })), 'align-items:flex-start')),
      O('Emoji', W(fgrid(n => EM(28) + ({ clock: '⏱️', shield: '🔒', chat: '💬' })[n] + '</span>'), 'align-items:flex-start'))
    ]),
    Q('emoji-rubrik', 'Får en rubrik inledas med emoji?', [
      O('Ingen symbol', W('<span class="h h2">Nyheter i veckan</span>', 'align-items:flex-start')),
      O('Emoji före rubriken', W('<span class="h h2">✨ Nyheter i veckan</span>', 'align-items:flex-start')),
      O('Ritad ikon före rubriken', W(`<span class="syx-l" style="gap:10px">${I('bolt', { s: 26, c: 'var(--brand)' })}<span class="h h2">Nyheter i veckan</span></span>`, 'align-items:flex-start'))
    ]),
    Q('emoji-knapp', 'Får knappar ha emoji?', [
      O('Ingen symbol', W(btn('Boka tid'))), O('Emoji i knappen', W(btn('📅 Boka tid'))), O('Ritad ikon i knappen', W(btn(I('calendar', { s: 20 }) + 'Boka tid')))
    ])
  ]});

  // =====================================================================
  // 17. Siffermarkörer
  // =====================================================================
  const num = (n, o = {}) => {
    const s = o.s || 32, sh = o.sh || 'circle', f = o.f || 'solid';
    const br = sh === 'circle' ? '50%' : sh === 'rsq' ? '28%' : sh === 'sq' ? '3px' : '0';
    let st = '';
    if (sh === 'none') st = `color:var(--brand);font-size:${Math.round(s * 0.7)}px;font-weight:700`;
    else if (f === 'solid') st = 'background:var(--brand);color:#fff';
    else if (f === 'tint') st = 'background:var(--tint);color:var(--brand)';
    else st = 'border:1.5px solid var(--brand);color:var(--brand)';
    const txt = o.fmt ? o.fmt(n) : n;
    return `<span style="display:grid;place-items:center;flex:0 0 auto;min-width:${s}px;height:${s}px;border-radius:${br};font-weight:700;font-size:${Math.round(s * 0.44)}px;font-variant-numeric:tabular-nums;line-height:1;${st}">${txt}</span>`;
  };
  const STEPS = [['Välj tid', 'Välj en dag och tid.'], ['Fyll i uppgifter', 'Namn och e-post.'], ['Bekräfta', 'Du får ett mejl.']];
  const steps = (mark, o = {}) => `<div class="stack syx-w" style="gap:${o.line ? 0 : 14}px;max-width:250px">${STEPS.map(([t, d], i) => `<div style="display:flex;gap:12px;align-items:stretch"><div style="display:flex;flex-direction:column;align-items:center">${mark(i + 1, i)}${o.line && i < 2 ? '<span style="flex:1;width:2px;min-height:14px;background:var(--sline);margin:4px 0"></span>' : ''}</div><div class="stack" style="gap:0;padding-bottom:${o.line && i < 2 ? 14 : 0}px;min-width:0"><b>${t}</b><span class="small muted">${d}</span></div></div>`).join('')}</div>`;
  G.push({ key: 'siffermarkorer', title: 'Siffermarkörer', questions: [
    Q('siffra-form', 'Vilken form ska siffran i en stegvis lista ha?', [
      ['Cirkel med siffra', 'circle'], ['Rundad fyrkant med siffra', 'rsq'], ['Fyrkant med siffra', 'sq'], ['Bara siffran', 'none']
    ].map(([l, sh]) => O(l, W(steps(n => num(n, { sh })), 'align-items:flex-start')))),
    Q('siffra-fyllning', 'Hur ska siffermarkören vara fylld?', [
      ['Fylld', 'solid'], ['Ljust tonad', 'tint'], ['Bara kant', 'line']
    ].map(([l, f]) => O(l, W(steps(n => num(n, { f })), 'align-items:flex-start')))),
    Q('siffra-storlek', 'Hur stor ska siffermarkören vara?', [24, 32, 40].map(s =>
      O(s + ' px markör', W(steps(n => num(n, { s })), 'align-items:flex-start')))),
    Q('siffra-format', 'Hur ska siffran skrivas?', [
      ['1', n => n], ['01', n => '0' + n], ['1.', n => n + '.']
    ].map(([l, fmt]) => O('Siffran som ' + l, W(steps(n => num(n, { fmt, sh: 'none', s: 36 })), 'align-items:flex-start')))),
    Q('siffra-linje', 'Ska stegen bindas ihop med en linje?', [
      O('Fristående steg', W(steps(n => num(n)), 'align-items:flex-start')),
      O('Steg med linje emellan', W(steps(n => num(n), { line: 1 }), 'align-items:flex-start'))
    ]),
    Q('siffra-klar', 'Hur ska ett avklarat steg markeras?', [
      ['Bock ersätter siffran', (n, i) => i === 0 ? plate('check', { ps: 32, is: 18, f: 'solid', io: { w: 2.75 } }) : num(n, { f: i === 1 ? 'solid' : 'line' })],
      ['Grön bock ersätter siffran', (n, i) => i === 0 ? plate('check', { ps: 32, is: 18, ex: 'background:var(--ok);color:#fff', io: { w: 2.75 } }) : num(n, { f: i === 1 ? 'solid' : 'line' })],
      ['Siffran står kvar', (n, i) => num(n, { f: i < 2 ? 'solid' : 'line' })]
    ].map(([l, f]) => O(l, W(steps(f, { line: 1 }), 'align-items:flex-start'))))
  ]});

  // =====================================================================
  // 18. Fler symboler och kompletteringar till grupperna ovan
  // =====================================================================
  Object.assign(ICONS, {
    'help-circle': ['f|' + C95, 'k*|path d="M9.3 9.3a2.8 2.8 0 0 1 5.4 1c0 1.9-2.7 2.4-2.7 4"', 'd*|circle cx="12" cy="17.3" r="DR"'],
    'help-plain': ['n|path d="M8.5 8a3.6 3.6 0 0 1 7 1c0 2.6-3.5 3-3.5 5.8"', 'e*|circle cx="12" cy="19.2" r="DR"'],
    'help-chat': ['f|path d="M6 4h13a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H9l-5 4V6a2 2 0 0 1 2-2z"', 'k*|path d="M10.3 8.3a2.2 2.2 0 0 1 4.2.8c0 1.4-2.2 1.8-2.2 3"', 'd*|circle cx="12.3" cy="14.4" r="DR"'],
    logout: ['n|path d="M9 21H5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h4"', 'n*|path d="m16 17 5-5-5-5M21 12H9"'],
    'logout-power': ['n*|path d="M12 3v8"', 'n|path d="M6.3 6.8a8 8 0 1 0 11.4 0"'],
    'logout-door': ['f|path d="M4 3h9v18H4z"', 'n*|path d="m16.5 8 4 4-4 4M20.5 12H10"'],
    'image-frame': ['f|rect x="3" y="4" width="18" height="16" rx="RX"', 'k*|path d="m4 18 6-7 4.5 5 2-2 3.5 3.5"'],
    truck: ['f|path d="M2.5 6h11v10h-11z"', 'f|path d="M13.5 9.5h4.2l3 3.3V16h-7.2z"', 'f*|circle cx="6.5" cy="18" r="1.9"', 'f*|circle cx="17" cy="18" r="1.9"'],
    card: ['f|rect x="2.5" y="5" width="19" height="14" rx="RX"', 'k*|path d="M3.5 9.5h17M6.5 15h3"'],
    'card-chip': ['f|rect x="2.5" y="5" width="19" height="14" rx="RX"', 'k*|path d="M6 9h4v3.2H6zM6 15.5h6"'],
    wallet: ['f|path d="M3 7h16a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"', 'n|path d="M3 7.5V6a2 2 0 0 1 2-2h11"', 'd*|circle cx="16.5" cy="13.5" r="DL"'],
    'refresh-one': ['n|path d="M20 12a8 8 0 1 1-2.6-5.9"', 'n*|path d="M20 3.5V8h-4.5"'],
    clip: ['n|path d="M20 11.5 12.4 19a4.9 4.9 0 0 1-7-7l8-8a3.3 3.3 0 0 1 4.6 4.6l-8 8a1.6 1.6 0 0 1-2.3-2.3l7.3-7.3"'],
    play: ['f|path d="M7 4.5v15l12-7.5z"'],
    'play-circle': ['f|' + C95, 'K*|path d="M10 8.4v7.2l5.6-3.6z"'],
    'so-f-solid': ['f|path d="M14 3h2.5v3.5h-1.8a1.2 1.2 0 0 0-1.2 1.2V10h3l-.5 3.5h-2.5V21H10v-7.5H7.5V10H10V7a4 4 0 0 1 4-4z"'],
    'so-in-solid': ['f|path d="M3.5 9h3.5v11.5H3.5z"', 'f|circle cx="5.25" cy="5.2" r="1.9"', 'f|path d="M9.5 9h3.3v1.6a4 4 0 0 1 3.4-1.8c2.9 0 4.3 1.8 4.3 5.1v6.6H17v-6c0-1.5-.6-2.4-1.9-2.4s-2.1 1-2.1 2.4v6H9.5z"']
  });
  const add = (key, ...qs) => G.find(g => g.key === key).questions.push(...qs);
  const hdr = (right) => `<div class="syx-w" style="display:flex;align-items:center;justify-content:space-between;gap:10px;background:var(--box);border-radius:12px;padding:12px 14px"><b>Logo</b>${right}</div>`;

  G.push({ key: 'symboler-fler', title: 'Symboler: fler', questions: [
    symQ('sym-notis', 'Hur ska notisklockan se ut?', [['Enkel klocka', 'bell'], ['Klocka med svängningslinjer', 'd-bell'], ['Fylld klocka', 'bell', { st: 'fill' }]], 'Notiser'),
    symQ('sym-spara', 'Vilken symbol ska betyda ”spara till senare”?', [['Hjärta', 'heart'], ['Bokmärke', 'bookmark'], ['Stjärna', 'star']], 'Spara'),
    symQ('sym-hjalp', 'Hur ska hjälpsymbolen se ut?', [['Frågetecken i cirkel', 'help-circle'], ['Bara frågetecken', 'help-plain'], ['Frågetecken i pratbubbla', 'help-chat']], 'Hjälp'),
    Q('sym-sprak', 'Hur ska språkväljaren i sidhuvudet se ut?', [
      ['Jordglob', I('globe', { s: 22 })], ['Jordglob och språkkod', `<span class="syx-l" style="gap:6px;font-weight:600;font-size:14px">${I('globe', { s: 20 })}SV</span>`], ['Bara språkkod', '<span style="font-weight:700;font-size:14px">SV</span>']
    ].map(([l, r]) => O(l, W(hdr(r))))),
    symQ('sym-logga-ut', 'Hur ska ikonen för att logga ut se ut?', [['Pil ut genom öppning', 'logout'], ['Strömknapp', 'logout-power'], ['Pil ut ur dörr', 'logout-door']], 'Logga ut'),
    symQ('sym-bild', 'Hur ska bildikonen se ut?', [['Ram med berg och sol', 'image'], ['Ram med berg', 'image-frame'], ['Kamera', 'camera']], 'Lägg till bild'),
    symQ('sym-leverans', 'Vilken symbol ska stå för leverans?', [['Paket framifrån', 'package'], ['Lastbil', 'truck'], ['Låda i perspektiv', 'iso-box']], 'Leverans 1–2 dagar'),
    symQ('sym-betala', 'Vilken symbol ska stå för betalning?', [['Kort med magnetremsa', 'card'], ['Kort med chip', 'card-chip'], ['Plånbok', 'wallet']], 'Betala med kort'),
    symQ('sym-uppdatera', 'Hur ska ikonen för att uppdatera se ut?', [['Två pilar i cirkel', 'refresh'], ['En pil i cirkel', 'refresh-one']], 'Uppdatera'),
    symQ('sym-bifoga', 'Hur ska ikonen för att bifoga fil se ut?', [['Gem snett', 'clip'], ['Gem upprätt', 'clip', { style: 'transform:rotate(45deg)' }], ['Plus', 'plus']], 'Bifoga fil'),
    symQ('sym-spela', 'Hur ska uppspelningsknappen för video se ut?', [['Spetsig triangel', 'play', { join: 'miter', cap: 'butt' }], ['Rundad triangel', 'play'], ['Triangel i cirkel', 'play-circle'], ['Fylld cirkel med triangel', 'play-circle', { st: 'fill' }]], 'Spela upp'),
    Q('sym-inloggad', 'Hur ska en inloggad användare visas i sidhuvudet?', [
      ['Initialer i cirkel', '<span style="display:grid;place-items:center;width:34px;height:34px;border-radius:50%;background:var(--brand);color:#fff;font-size:13px;font-weight:700">AB</span>'],
      ['Initialer i ljus cirkel', '<span style="display:grid;place-items:center;width:34px;height:34px;border-radius:50%;background:var(--tint);color:var(--brand);font-size:13px;font-weight:700">AB</span>'],
      ['Personikon i cirkel', I('user-circle', { s: 30 })], ['Personikon', I('user', { s: 24 })]
    ].map(([l, r]) => O(l, W(hdr(r))))),
    Q('sym-stjarna-storlek', 'Hur stora ska betygsstjärnor bredvid liten text vara?', [14, 16, 20].map(s =>
      O(s + ' px stjärnor', W(`<div class="syx-l" style="gap:6px"><span class="row" style="gap:2px;flex-wrap:nowrap">${[1, 2, 3, 4].map(() => full(s)).join('')}${starW('gray', s)}</span><span class="small muted">4,0 (128 omdömen)</span></div>`)))),
    Q('sym-rensa', 'Hur ska knappen som tömmer ett sökfält se ut?', [
      ['Grått kryss', I('x-small', { s: 22, w: 2.25, c: 'var(--smuted)' })], ['Kryss i grå cirkel', I('x-circle', { s: 20, st: 'fill', c: '#9AA0A6' })], ['Ordet Rensa', '<span class="small" style="font-weight:600;color:var(--brand)">Rensa</span>']
    ].map(([l, r]) => O(l, W(`<div class="inp syx-w" style="gap:10px;justify-content:space-between">${I('search', { s: 20, c: 'var(--smuted)' })}<span style="flex:1;min-width:0">Vinterjacka</span>${r}</div>`)))),
    Q('sym-info-etikett', 'Hur ska info-ikonen bredvid en fältetikett se ut?', [
      ['i i grå cirkel', I('info', { s: 16, c: 'var(--smuted)' })], ['Frågetecken i grå cirkel', I('help-circle', { s: 16, c: 'var(--smuted)' })], ['Liten fylld cirkel med i', I('info', { s: 15, st: 'fill', c: 'var(--smuted)' })]
    ].map(([l, ic]) => O(l, W(`<div class="fld syx-w" style="flex:none"><span class="lbl syx-l" style="gap:5px">Organisationsnummer${ic}</span><div class="inp ph">556677-8899</div></div>`)))),
    Q('sym-falt-ikon', 'Ska fält för e-post och lösenord ha en ikon till vänster?', [
      O('Utan ikon', W(`<div class="syx-w stack" style="gap:10px"><div class="inp ph">E-post</div><div class="inp ph">Lösenord</div></div>`)),
      O('Med ikon till vänster', W(`<div class="syx-w stack" style="gap:10px"><div class="inp ph" style="gap:10px">${I('mail', { s: 20 })}E-post</div><div class="inp ph" style="gap:10px">${I('lock', { s: 20 })}Lösenord</div></div>`))
    ])
  ]});

  add('stil-efter-lage',
    Q('lage-utfall', 'Hur ska plus-ikonen ändras när en rad fälls ut?', [
      ['Plus blir minus', I('plus', { s: 22 }), I('minus', { s: 22 })], ['Plus vrids till kryss', I('plus', { s: 22 }), I('plus', { s: 22, style: 'transform:rotate(45deg)' })], ['Ring med plus blir fylld minus', I('plus-circle', { s: 24 }), I('minus-circle', { s: 24, st: 'fill' })]
    ].map(([l, a, b]) => O(l, W(`<div class="syx-w stack" style="gap:0">${[['Hur lång är leveranstiden?', a], ['Kan jag ångra mitt köp?', b]].map(([t, ic], i) => `<div class="syx-l" style="justify-content:space-between;gap:12px;padding:12px 0;${i ? '' : 'border-bottom:1px solid var(--sline)'}"><b style="font-size:14px">${t}</b>${ic}</div>`).join('')}<span class="small muted">Den andra raden är utfälld</span></div>`)))),
    Q('lage-filter-aktiv', 'Hur ska filterknappen visa att filter är valda?', [
      ['Siffra bredvid ikonen', `${I('filter', { s: 18 })}Filter<span style="display:grid;place-items:center;min-width:20px;height:20px;border-radius:999px;background:var(--brand);color:#fff;font-size:11px;font-weight:700">2</span>`],
      ['Ikonen blir fylld', `${I('filter', { s: 18, st: 'fill' })}Filter`],
      ['Antal i texten', `${I('filter', { s: 18 })}Filter (2)`]
    ].map(([l, inner]) => O(l, W(`<span style="display:inline-flex;align-items:center;gap:8px;height:40px;padding:0 14px;border-radius:10px;border:1px solid var(--sline);background:var(--box);font-weight:600;font-size:14px">${inner}</span>`)))),
    Q('lage-kopierad', 'Vad ska hända med kopiera-ikonen när man har kopierat?', [
      ['Bock ersätter ikonen', I('check', { s: 20, c: 'var(--ok)' })], ['Bock och ordet Kopierat', `<span class="syx-l small" style="gap:4px;color:var(--ok);font-weight:600">${I('check', { s: 18 })}Kopierat</span>`], ['Ikonen är oförändrad', I('copy', { s: 20 })]
    ].map(([l, done]) => O(l, W(`<div class="syx-w stack" style="gap:8px">${[['Före', I('copy', { s: 20 })], ['Efter', done]].map(([t, ic]) => `<div class="inp" style="justify-content:space-between;gap:10px"><span style="min-width:0;overflow:hidden;text-overflow:ellipsis">exempel.se/abc123</span>${ic}</div>`).join('')}</div>`)))),
    Q('lage-chip-vald', 'Ska ett valt filterchip få en bock?', [
      ['Bock läggs till', true, 'background:var(--tint);border-color:var(--brand)'], ['Ingen bock, bara färg', false, 'background:var(--tint);border-color:var(--brand)'], ['Bock på mörk platta', true, 'background:var(--brand);border-color:var(--brand);color:#fff']
    ].map(([l, ck, st]) => O(l, W(`<div class="row" style="gap:8px;justify-content:center">${['Vegetariskt', 'Glutenfritt', 'Laktosfritt'].map((t, i) => `<span class="chip" style="gap:6px;${i === 0 ? st : ''}">${i === 0 && ck ? I('check', { s: 16, w: 2.5 }) : ''}${t}</span>`).join('')}</div>`))))
  );

  add('platta',
    Q('platta-avstand', 'Hur långt ska det vara mellan plattan och texten bredvid?', [12, 16, 20].map(g =>
      O(g + ' px till texten', W(`<div class="stack syx-w" style="gap:14px">${[['clock', 'Snabb leverans', 'Skickas inom en dag.'], ['shield', 'Trygg betalning', 'Betala när varan kommit.']].map(([n, t, d]) => `<div class="syx-l" style="gap:${g}px;align-items:flex-start">${plate(n, { ps: 44, is: 22 })}<div class="stack" style="gap:2px;min-width:0"><b>${t}</b><span class="small muted">${d}</span></div></div>`).join('')}</div>`, 'align-items:flex-start')))),
    Q('platta-kort', 'Var ska ikonplattan sitta i ett kort?', [
      ['Inne i kortet, uppe till vänster', 'in'], ['Sticker upp över kortets kant', 'over'], ['Centrerad överst', 'center']
    ].map(([l, m]) => O(l, W(`<div class="panel syx-w stack" style="gap:8px;max-width:220px;position:relative;${m === 'over' ? 'margin-top:22px;padding-top:34px' : ''}${m === 'center' ? 'align-items:center;text-align:center' : ''}">${m === 'over' ? `<span style="position:absolute;top:-22px;left:18px">${plate('shield', { ps: 44, is: 22, ex: 'box-shadow:0 0 0 4px var(--ground)' })}</span>` : plate('shield', { ps: 44, is: 22 })}<b>Trygg betalning</b><span class="small muted">Betala först när du fått varan.</span></div>`))))
  );

  add('storlek',
    Q('storlek-status', 'Hur stor ska ikonen i en meddelanderuta vara?', [16, 20, 24].map(s =>
      O(s + ' px i meddelandet', W(`<div class="syx-w" style="display:flex;gap:10px;align-items:flex-start;background:var(--tint);border-radius:10px;padding:12px 14px">${I('info', { s, w: 2, ns: 1, c: 'var(--brand)', style: 'margin-top:' + Math.max(0, (22 - s) / 2) + 'px' })}<span style="font-size:14px">Leveranser tar just nu 2–3 dagar.</span></div>`)))),
    Q('storlek-mobil', 'Ska ikoner vara större i mobilen än på datorn?', [
      ['Samma storlek', 20], ['Större i mobilen', 24]
    ].map(([l, m]) => O(l, W(`<div class="row" style="gap:18px;align-items:flex-end;justify-content:center">${[['Dator', 20, 'width:130px'], ['Mobil', m, 'width:100px']].map(([t, s, w]) => `<div class="stack" style="gap:6px;align-items:center"><div style="${w};max-width:100%;background:var(--box);border:1px solid var(--sline);border-radius:10px;padding:12px;display:flex;justify-content:space-around">${I('search', { s })}${I('user', { s })}${I('cart', { s })}</div><span class="small muted">${t} ${s} px</span></div>`).join('')}</div>`))))
  );

  add('farg',
    Q('farg-lank-ikon', 'Vilken färg ska ikonen i en textlänk ha?', [
      ['Samma som länken', 'var(--brand)'], ['Textfärg', 'var(--sink)'], ['Grå', 'var(--smuted)']
    ].map(([l, c]) => O(l, W(`<div class="stack" style="gap:10px">${[['download', 'Ladda ner prislista'], ['external', 'Läs mer på webbplatsen']].map(([n, t]) => `<span class="link" style="display:inline-flex;align-items:center;gap:6px">${I(n, { s: 18, c })}${t}</span>`).join('')}</div>`, 'align-items:flex-start'))))
  );

  add('siffermarkorer',
    Q('siffra-farg', 'Vilken färg ska siffermarkören ha?', [
      ['Varumärkesfärg', 'background:var(--brand);color:#fff'], ['Svart', 'background:var(--sink);color:#fff'], ['Grå kant, mörk siffra', 'border:1.5px solid var(--sline);color:var(--sink);background:var(--box)']
    ].map(([l, st]) => O(l, W(steps(n => num(n).replace('background:var(--brand);color:#fff', st)), 'align-items:flex-start')))),
    Q('siffra-vikt', 'Hur fet ska siffran i markören vara?', [500, 600, 800].map(wt =>
      O('Siffra i vikt ' + wt, W(steps(n => num(n, { f: 'tint' }).replace('font-weight:700', 'font-weight:' + wt)), 'align-items:flex-start'))))
  );

  add('emoji',
    Q('emoji-status', 'Får bekräftelser och meddelanden ha emoji?', [
      O('Ritad ikon', W(`<div class="panel syx-w" style="display:flex;gap:10px;align-items:center">${I('check-circle', { s: 22, c: 'var(--ok)' })}<b>Bokningen är klar</b></div>`)),
      O('Emoji', W(`<div class="panel syx-w" style="display:flex;gap:10px;align-items:center">${EM(20)}🎉</span><b>Bokningen är klar</b></div>`)),
      O('Ingen symbol', W('<div class="panel syx-w"><b>Bokningen är klar</b></div>'))
    ])
  );

  add('animerade-ikoner',
    Q('anim-hastighet', 'Hur snabb ska en ikonanimation vara?', [['Snabb (0,3 s)', 0.3], ['Mellan (0,6 s)', 0.6], ['Långsam (1,2 s)', 1.2]].map(([l, d], i) => {
      const c = 'syf' + i, tot = 2.6, p = Math.round(d / tot * 100);
      return O(l, W(`<style>.${c} path{animation:${c}d ${tot}s ease-out infinite}@keyframes ${c}d{0%{stroke-dashoffset:1}${p}%,100%{stroke-dashoffset:0}}${RM(c)}</style>${CHK(c)}<b>Klart!</b>`));
    }))
  );

  add('sociala',
    Q('soc-stil', 'Ska sociala ikoner ritas som linje eller fyllda?', [
      O('Linje', W(`<div class="syx-r" style="gap:18px">${I('so-cam', { s: 28 })}${I('so-f', { s: 28 })}${I('so-in', { s: 28 })}</div>`)),
      O('Fyllda', W(`<div class="syx-r" style="gap:18px">${I('so-cam', { s: 28, st: 'fill', k: 'var(--ground)' })}${I('so-f-solid', { s: 28, st: 'fill', w: 0.5 })}${I('so-in-solid', { s: 28, st: 'fill', w: 0.5 })}</div>`))
    ])
  );

  add('ikoner-i-knappar',
    Q('knapp-ikonstil', 'Ska ikonen i en knapp vara linje eller fylld?', [
      O('Linjeikon', W(`<div class="syx-r">${btn(I('calendar', { s: 20 }) + 'Boka tid')}${btn2(I('heart', { s: 20 }) + 'Spara')}</div>`)),
      O('Fylld ikon', W(`<div class="syx-r">${btn(I('calendar', { s: 20, st: 'fill', k: 'var(--brand)' }) + 'Boka tid')}${btn2(I('heart', { s: 20, st: 'fill' }) + 'Spara')}</div>`))
    ]),
    Q('knapp-flytande', 'Hur ska en flytande knapp för ”Ny” se ut i mobilen?', [
      ['Rund med plus', 'width:56px;border-radius:50%', ''], ['Rundad fyrkant med plus', 'width:56px;border-radius:16px', ''], ['Kapsel med plus och text', 'padding:0 20px 0 16px;border-radius:999px;gap:8px', 'Ny bokning']
    ].map(([l, st, t]) => O(l, W(`<div class="syx-w" style="position:relative;height:150px;background:var(--box);border:1px solid var(--sline);border-radius:14px;overflow:hidden"><div class="stack" style="gap:8px;padding:14px"><span style="height:10px;width:70%;background:var(--accent);border-radius:4px"></span><span style="height:10px;width:50%;background:var(--accent);border-radius:4px"></span></div><span style="position:absolute;right:14px;bottom:14px;display:inline-flex;align-items:center;justify-content:center;height:56px;background:var(--brand);color:#fff;font-weight:600;box-shadow:0 4px 12px rgba(0,0,0,.18);${st}">${I('plus', { s: 24, w: 2.25 })}${t}</span></div>`))))
  );

  add('ikoner-i-navigering',
    Q('nav-sok', 'Hur ska sök visas i sidhuvudet på datorn?', [
      ['Bara en sökikon', I('search', { s: 22 })], ['Fält med sökikon', `<span class="inp ph" style="height:38px;gap:8px;width:150px;max-width:100%;font-size:14px">${I('search', { s: 18 })}Sök</span>`], ['Sökikon och ordet Sök', `<span class="syx-l" style="gap:6px;font-weight:600;font-size:14px">${I('search', { s: 20 })}Sök</span>`]
    ].map(([l, r]) => O(l, W(hdr(r))))),
    Q('nav-brodsmula', 'Ska första steget i en brödsmula vara en hemikon?', [
      ['Hemikon', I('home', { s: 16 })], ['Ordet Start', '<span>Start</span>']
    ].map(([l, first]) => O(l, W(`<div class="row small" style="gap:8px;color:var(--smuted)">${first}<span>/</span><span>Tjänster</span><span>/</span><span style="color:var(--sink);font-weight:600">Boka tid</span></div>`))))
  );

  add('ikonsprak',
    Q('sprak-luft', 'Hur mycket av sin ruta ska ikonen fylla?', [['Fyller 18 av 24 px', 0.82], ['Fyller 20 av 24 px', 0.92], ['Fyller hela rutan', 1.05]].map(([l, k]) =>
      O(l, W(`<div class="syx-g" style="gap:10px 12px">${SET8.map(n => `<span style="display:grid;place-items:center;width:36px;height:36px;outline:1px dashed rgba(36,64,94,.3)">${I(n, { s: 36, style: 'transform:scale(' + k + ')' })}</span>`).join('')}</div><span class="small muted">Streckad ruta = ikonens yta</span>`)))),
    Q('sprak-skugga', 'Får ikoner ha en mjuk skugga?', [
      O('Ingen skugga', W(row({ s: 40, st: 'duo', c2: 'var(--brand)', op: 0.2, w: 2, ns: 1 }, ['clock', 'shield', 'chat'], 'gap:22px'))),
      O('Mjuk skugga under', W(row({ s: 40, st: 'duo', c2: 'var(--brand)', op: 0.2, w: 2, ns: 1, style: 'filter:drop-shadow(0 3px 3px rgba(26,28,30,.25))' }, ['clock', 'shield', 'chat'], 'gap:22px')))
    ])
  );

  add('stilar',
    Q('stil-utskuren', 'Hur tjocka ska de utskurna detaljerna i fyllda ikoner vara?', [1.5, 2, 2.75].map(kw =>
      O(fmt(kw) + ' px utskärning', W(grid({ st: 'fill', s: 32, kw }, ['home', 'user-circle', 'mail', 'calendar', 'lock', 'clock', 'info', 'check-circle'], 'gap:18px 22px')))))
  );

  add('listor',
    Q('lista-fil', 'Hur ska filer i en nedladdningslista märkas?', [
      ['Dokumentikon', n => I('doc', { s: 22, c: 'var(--smuted)' })], ['Filtyp som etikett', (n, t) => `<span style="display:grid;place-items:center;width:34px;height:22px;border-radius:5px;background:var(--tint);color:var(--brand);font-size:10px;font-weight:800">${t}</span>`], ['Ingen ikon', () => '']
    ].map(([l, f]) => O(l, W(`<div class="stack syx-w" style="gap:6px">${[['Prislista 2026', 'PDF'], ['Villkor', 'PDF'], ['Bokningsmall', 'XLS']].map(([t, ty]) => `<div class="syx-l" style="gap:10px;background:var(--box);border-radius:8px;padding:9px 12px">${f(t, ty)}<span style="flex:1;min-width:0">${t}</span>${I('download', { s: 18, c: 'var(--brand)' })}</div>`).join('')}</div>`))))
  );

  /* @@FLER@@ */

  window.QZ.part({ key: 'symboler', groups: G });
})();
