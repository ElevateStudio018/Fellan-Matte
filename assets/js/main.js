/* Axel&Gren — liten, beroendefri JS. Sidan fungerar utan, det här är förbättringar. */

/* ---- Öppettider -----------------------------------------------------------
   Uppdatera listan inför varje säsong. Datum i formatet ÅÅÅÅ-MM-DD.
   Julöppet 2026: lördag och söndag vecka 48–51, kl. 11–15.               */
const SEASON = {
  name: 'Julöppet',
  open: '11:00',
  close: '15:00',
  days: [
    '2026-11-28', '2026-11-29',
    '2026-12-05', '2026-12-06',
    '2026-12-12', '2026-12-13',
    '2026-12-19', '2026-12-20',
  ],
};

const pad = (n) => String(n).padStart(2, '0');
const isoDate = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const at = (iso, hhmm) => new Date(`${iso}T${hhmm}:00`);
const weekday = new Intl.DateTimeFormat('sv-SE', { weekday: 'long' });
const dayMonth = new Intl.DateTimeFormat('sv-SE', { day: 'numeric', month: 'long' });
const hours = `${SEASON.open.slice(0, 2)}–${SEASON.close.slice(0, 2)}`;

function seasonState(now = new Date()) {
  const today = isoDate(now);
  if (SEASON.days.includes(today)) {
    if (now < at(today, SEASON.open)) return { state: 'soon', text: `Öppet idag kl. ${hours}. Välkommen!` };
    if (now < at(today, SEASON.close)) return { state: 'open', text: `Öppet just nu, till kl. ${SEASON.close.slice(0, 2)} idag` };
  }
  const next = SEASON.days.find((d) => at(d, SEASON.open) > now);
  if (next) {
    const d = at(next, SEASON.open);
    const when = isoDate(new Date(now.getTime() + 864e5)) === next ? 'i morgon' : `${weekday.format(d)} ${dayMonth.format(d)}`;
    return { state: 'soon', next, text: `${SEASON.name} · nästa öppetdag ${when}, kl. ${hours}` };
  }
  return { state: 'closed', text: 'Stängt för säsongen. Följ @axelochgren för nästa öppning' };
}

function renderStatus() {
  const s = seasonState();
  document.querySelectorAll('[data-status]').forEach((el) => {
    el.dataset.status = s.state;
    const t = el.querySelector('[data-status-text]');
    if (t) t.textContent = s.text;
  });

  // Markera passerade och nästa datum i kalendern (på Aktuellt)
  const now = new Date();
  let nextMarked = false;
  document.querySelectorAll('[data-dates] .date').forEach((el) => {
    const last = el.dataset.end;
    if (last && at(last, SEASON.close) < now) {
      el.classList.add('is-past');
    } else if (!nextMarked) {
      el.classList.add('is-next');
      nextMarked = true;
    }
  });
}

/* ---- Mobilmeny ---------------------------------------------------------- */
function initMenu() {
  const btn = document.querySelector('[data-menu-toggle]');
  const drawer = document.querySelector('[data-drawer]');
  if (!btn || !drawer) return;
  const label = btn.querySelector('.menu-toggle__label');
  const use = btn.querySelector('use');

  const set = (open) => {
    btn.setAttribute('aria-expanded', String(open));
    drawer.hidden = !open;
    label.textContent = open ? 'Stäng' : 'Meny';
    use.setAttribute('href', open ? '#i-close' : '#i-menu');
    document.body.style.overflow = open ? 'hidden' : '';
  };
  btn.addEventListener('click', () => set(btn.getAttribute('aria-expanded') !== 'true'));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !drawer.hidden) { set(false); btn.focus(); }
  });
  matchMedia('(min-width: 1081px)').addEventListener('change', (e) => e.matches && set(false));
}

/* ---- Sidhuvud får en linje när man scrollar ------------------------------ */
function initHeader() {
  const header = document.querySelector('[data-header]');
  if (!header) return;
  const onScroll = () => header.classList.toggle('is-scrolled', scrollY > 8);
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ---- Karusell ----------------------------------------------------------- */
function initFeeds() {
  document.querySelectorAll('[data-feed]').forEach((feed) => {
    const track = feed.querySelector('.feed__track');
    const prev = feed.querySelector('[data-prev]');
    const next = feed.querySelector('[data-next]');
    const bar = feed.querySelector('.feed__progress span');
    if (!track) return;

    const step = () => (track.querySelector('.feed__item')?.getBoundingClientRect().width || 300) + 24;
    const update = () => {
      const max = track.scrollWidth - track.clientWidth;
      const ratio = max > 0 ? track.scrollLeft / max : 1;
      const visible = max > 0 ? track.clientWidth / track.scrollWidth : 1;
      if (bar) {
        bar.style.width = `${Math.max(visible * 100, 20)}%`;
        bar.style.transform = `translateX(${ratio * (100 / Math.max(visible, .2) - 100)}%)`;
      }
      if (prev) prev.disabled = track.scrollLeft <= 2;
      if (next) next.disabled = track.scrollLeft >= max - 2;
      feed.querySelector('.feed__controls')?.toggleAttribute('hidden', max <= 2);
    };
    prev?.addEventListener('click', () => track.scrollBy({ left: -step(), behavior: 'smooth' }));
    next?.addEventListener('click', () => track.scrollBy({ left: step(), behavior: 'smooth' }));
    track.addEventListener('scroll', update, { passive: true });
    addEventListener('resize', update);
    update();
  });
}

/* ---- Kontaktformulär → e-post ------------------------------------------- */
function initContactForm() {
  const form = document.querySelector('[data-contact]');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const subject = data.get('subject') || 'Fråga via hemsidan';
    const body = `${data.get('message')}\n\n— ${data.get('name')}${data.get('email') ? ` (${data.get('email')})` : ''}`;
    location.href = `mailto:axelochgren@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    const note = form.querySelector('[data-form-note]');
    if (note) note.textContent = 'Ditt e-postprogram öppnas med meddelandet ifyllt. Tryck på skicka där.';
  });
}

/* ---- Mjuk inglidning ---------------------------------------------------- */
function initReveal() {
  const els = document.querySelectorAll('[data-reveal]');
  if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
    });
  }, { rootMargin: '0px 0px -8% 0px' });
  els.forEach((el) => {
    if (el.getBoundingClientRect().top < innerHeight) return; // redan i bild: visa direkt
    el.classList.add('reveal');
    io.observe(el);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });
  renderStatus();
  initMenu();
  initHeader();
  initFeeds();
  initContactForm();
  initReveal();
});
