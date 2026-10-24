import { evaluate, format } from './calc.js';

export const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// Lätt markdown: **fet**, _kursiv_, radbrytningar. Matte renderas av KaTeX efteråt.
export const md = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/(^|\s)_(.+?)_(?=\s|$)/g, '$1<i>$2</i>');

export function renderMath(el) {
  if (!el || !window.renderMathInElement) return;
  window.renderMathInElement(el, {
    delimiters: [{ left: '$$', right: '$$', display: true }, { left: '$', right: '$', display: false }],
    throwOnError: false,
  });
}

export const $ = (sel, root = document) => root.querySelector(sel);

const MONTHS = ['jan', 'feb', 'mar', 'apr', 'maj', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec'];
const DAYS = ['sön', 'mån', 'tis', 'ons', 'tor', 'fre', 'lör'];
export const dateBox = (iso) => { const d = new Date(iso); return `<div class="date-box"><b>${d.getDate()}</b><span>${MONTHS[d.getMonth()]}</span></div>`; };
export const fmtDate = (iso) => { const d = new Date(iso); return `${DAYS[d.getDay()]} ${d.getDate()} ${MONTHS[d.getMonth()]} kl ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`; };
export const daysUntil = (iso) => Math.ceil((new Date(iso).setHours(0, 0, 0, 0) - new Date().setHours(0, 0, 0, 0)) / 864e5);
export const mins = (ms) => { const m = Math.max(0, Math.round(ms / 60000)); return m < 1 ? '<1 min' : m + ' min'; };
export const clock = (ms) => { const s = Math.max(0, Math.floor(ms / 1000)); return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`; };
export const hhmm = (ts) => { const d = new Date(ts); return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`; };
export const levelDots = (n) => `<span class="lvl" title="Nivå ${n}">${[1, 2, 3].map((i) => `<i class="${i <= n ? 'on' : ''}"></i>`).join('')}</span>`;

export function youtubeId(url) {
  const m = String(url || '').match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/);
  return m ? m[1] : null;
}

let toastTimer;
export function toast(text, ms = 3500) {
  let el = $('#toast');
  if (!el) { el = document.createElement('div'); el.id = 'toast'; el.className = 'toast'; document.body.appendChild(el); }
  el.textContent = text;
  el.classList.remove('hidden');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.add('hidden'), ms);
}

export function modal(html, onMount) {
  const layer = $('#layer');
  layer.innerHTML = `<div class="overlay" data-close-overlay><div class="sheet" role="dialog" aria-modal="true">${html}</div></div>`;
  const ov = layer.firstElementChild;
  ov.addEventListener('click', (e) => { if (e.target === ov || e.target.closest('[data-close]')) closeModal(); });
  renderMath(ov);
  onMount?.(ov.firstElementChild);
  return ov.firstElementChild;
}
export const closeModal = () => { $('#layer').innerHTML = ''; };

export function qrSvg(text, cell = 4) {
  if (!window.qrcode) return '';
  const q = window.qrcode(0, 'M');
  q.addData(text);
  q.make();
  return q.createSvgTag({ cellSize: cell, margin: 2, scalable: true });
}

// Kalkylator
export function calculator(mode) {
  let el = $('#calc');
  if (el) { el.remove(); return; }
  el = document.createElement('div');
  el.id = 'calc';
  el.className = 'calc';
  const basic = ['C', '(', ')', '÷', '7', '8', '9', '×', '4', '5', '6', '−', '1', '2', '3', '+', '0', ',', '⌫', '='];
  const sci = ['sin', 'cos', 'tan', '√', 'C', 'x²', '^', '(', ')', '÷', 'π', '7', '8', '9', '×', 'log', '4', '5', '6', '−', 'ln', '1', '2', '3', '+', '%', '0', ',', '⌫', '='];
  const keys = mode === 'sci' ? sci : basic;
  el.innerHTML = `<div class="calc-head"><span>Räknare ${mode === 'sci' ? '· vetenskaplig' : ''}</span><button class="btn sm ghost" data-x>Stäng</button></div>
    <div class="calc-screen"><div class="calc-expr"></div><div class="calc-val">0</div></div>
    <div class="calc-keys ${mode === 'sci' ? 'sci' : ''}">${keys.map((k) => `<button data-k="${k}" class="${'÷×−+^'.includes(k) ? 'op' : k === '=' ? 'eq' : ''}">${k}</button>`).join('')}</div>`;
  document.body.appendChild(el);
  let expr = '';
  const exprEl = $('.calc-expr', el);
  const valEl = $('.calc-val', el);
  const show = (v) => { exprEl.textContent = expr; valEl.textContent = v ?? (expr || '0'); };
  const press = (k) => {
    if (k === 'C') expr = '';
    else if (k === '⌫') expr = expr.slice(0, -1);
    else if (k === '=') {
      try { const r = format(evaluate(expr)); exprEl.textContent = expr + ' ='; valEl.textContent = r; expr = r; return; } catch { show('Fel'); return; }
    } else if (k === 'x²') expr += '^2';
    else if (['sin', 'cos', 'tan', 'log', 'ln', '√'].includes(k)) expr += k + '(';
    else expr += k;
    show();
  };
  el.addEventListener('click', (e) => {
    if (e.target.closest('[data-x]')) { el.remove(); return; }
    const b = e.target.closest('[data-k]');
    if (b) press(b.dataset.k);
  });
  el._key = (e) => {
    if (!document.body.contains(el) || /input|textarea/i.test(document.activeElement?.tagName)) return;
    const map = { '*': '×', '/': '÷', '-': '−', Enter: '=', Backspace: '⌫', Escape: 'C', '.': ',' };
    const k = map[e.key] || e.key;
    if (/^[0-9+()^%,]$/.test(k) || Object.values(map).includes(k)) { e.preventDefault(); press(k); }
  };
  document.addEventListener('keydown', el._key);
}
export const closeCalculator = () => $('#calc')?.remove();
