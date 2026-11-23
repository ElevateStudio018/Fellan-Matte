// Visits each site once on desktop and mobile, measures objective weaknesses and takes screenshots.
// No consent clicks and no bot-detection workarounds; blocked sites are just reported as blocked.
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const sites = JSON.parse(fs.readFileSync(path.join(__dirname, 'sites.json'), 'utf8'));
const OUT = path.join(__dirname, 'shots');
fs.mkdirSync(OUT, { recursive: true });

async function measure(b, s, mobile) {
  const ctx = await b.newContext(mobile
    ? { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 1, locale: 'sv-SE' }
    : { viewport: { width: 1440, height: 900 }, locale: 'sv-SE' });
  const p = await ctx.newPage();
  const r = { ok: false };
  try {
    const t0 = Date.now();
    const resp = await p.goto(s.url, { waitUntil: 'load', timeout: 45000 });
    r.loadMs = Date.now() - t0;
    r.status = resp ? resp.status() : null;
    await p.waitForTimeout(3000);
    r.title = await p.title();
    if (/just a moment|access denied|security checkpoint|attention required/i.test(r.title)) { r.blocked = true; throw new Error('blocked'); }
    Object.assign(r, await p.evaluate(() => {
      const res = performance.getEntriesByType('resource');
      const nav = performance.getEntriesByType('navigation')[0] || {};
      const bytes = res.reduce((a, e) => a + (e.transferSize || 0), 0) + (nav.transferSize || 0);
      const txt = document.body ? document.body.innerText : '';
      const years = [...txt.matchAll(/(?:©|copyright)\s*(?:\d{4}\s*[-–]\s*)?(\d{4})/gi)].map(m => +m[1]);
      const gen = document.querySelector('meta[name=generator]');
      const imgs = [...document.images];
      const html = document.documentElement.outerHTML;
      const cms = /wp-content|wp-includes/.test(html) ? 'WordPress' : /sitevision/i.test(html) ? 'Sitevision' : /joomla/i.test(html) ? 'Joomla' : /wix\.com|wixstatic/.test(html) ? 'Wix' : /squarespace/.test(html) ? 'Squarespace' : /episerver|optimizely/i.test(html) ? 'Optimizely' : /umbraco/i.test(html) ? 'Umbraco' : /webflow/i.test(html) ? 'Webflow' : /next\/static|__NEXT_DATA__/.test(html) ? 'Next.js' : '';
      const bodyFont = parseFloat(getComputedStyle(document.body).fontSize);
      return {
        viewportMeta: !!document.querySelector('meta[name=viewport]'),
        scrollW: document.documentElement.scrollWidth,
        requests: res.length + 1,
        kb: Math.round(bytes / 1024),
        domReadyMs: Math.round(nav.domContentLoadedEventEnd || 0),
        copyright: years.length ? Math.max(...years) : null,
        generator: gen ? gen.content.slice(0, 40) : '',
        cms,
        jquery: window.jQuery && window.jQuery.fn ? window.jQuery.fn.jquery : '',
        imgNoAlt: imgs.filter(i => !i.hasAttribute('alt')).length,
        imgs: imgs.length,
        bodyFont,
        flash: /swf|flash/i.test(html) && /<object|<embed/i.test(html),
        tables: document.querySelectorAll('table[width], td[bgcolor], font').length,
        https: location.protocol === 'https:',
        finalUrl: location.href.slice(0, 80),
        lang: document.documentElement.lang || '',
        h1: document.querySelectorAll('h1').length,
      };
    }));
    await p.screenshot({ path: path.join(OUT, `${s.id}-${mobile ? 'm' : 'd'}.jpg`), type: 'jpeg', quality: 70, clip: { x: 0, y: 0, width: mobile ? 390 : 1440, height: mobile ? 844 : 900 } });
    r.ok = true;
  } catch (e) { r.error = e.message.split('\n')[0].slice(0, 90); }
  await ctx.close();
  return r;
}

(async () => {
  const proxy = process.env.HTTPS_PROXY ? { server: process.env.HTTPS_PROXY } : undefined;
  const b = await chromium.launch({ proxy });
  const out = {};
  const queue = [...sites];
  await Promise.all([0, 1, 2, 3, 4].map(async () => {
    while (queue.length) {
      const s = queue.shift();
      const d = await measure(b, s, false);
      const m = d.ok ? await measure(b, s, true) : { ok: false };
      out[s.id] = { ...s, d, m };
      console.log((d.ok ? 'OK  ' : 'NO  ') + s.id + (d.error ? ' ' + d.error : ''));
    }
  }));
  fs.writeFileSync(path.join(__dirname, 'results.json'), JSON.stringify(out, null, 1));
  await b.close();
})();
