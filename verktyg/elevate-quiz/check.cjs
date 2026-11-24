// Kontroll av en eller flera datafiler: node check.cjs data-typografi.js [fler...]
// Kastar fel vid problem, skriver antal frågor per del annars.
const fs = require('fs'), path = require('path');
const D = __dirname;
const imgs = new Set(fs.readdirSync(path.join(D, 'img')).filter(f => f.endsWith('.jpg')));
const counts = {}; const ids = new Set(); const problems = [];
global.window = { QZ: { part(def) {
  counts[def.key] = counts[def.key] || 0;
  for (const g of def.groups) {
    if (!g.key || !g.title) problems.push('grupp saknar key/title');
    for (const q of g.questions) {
      counts[def.key]++;
      const where = `${def.key}/${q.id}`;
      if (!q.id || ids.has(q.id)) problems.push('dubblett eller saknat id: ' + where);
      ids.add(q.id);
      if (!q.q) problems.push('fråga saknar text: ' + where);
      if (!Array.isArray(q.opts) || q.opts.length < 2 || q.opts.length > 6) problems.push('2–6 alternativ krävs: ' + where);
      const labs = new Set();
      for (const o of q.opts || []) {
        if (!o.l) problems.push('alternativ saknar etikett: ' + where);
        if (labs.has(o.l)) problems.push('samma etikett två gånger: ' + where + ' ' + o.l);
        labs.add(o.l);
        if (o.l && o.l.length > 48) problems.push('etikett över 48 tecken: ' + where + ' ' + o.l);
        const h = o.h || '';
        if (/<script/i.test(h)) problems.push('script i h: ' + where);
        if (/\sid="/i.test(h)) problems.push('id-attribut i h: ' + where);
        if (/<form/i.test(h)) problems.push('form i h: ' + where);
        if (/(^|[}\s,])(body|html|\*)\s*\{/.test(h)) problems.push('global selektor: ' + where);
        for (const m of h.matchAll(/img\/([a-z0-9-]+\.jpg)/g)) if (!imgs.has(m[1])) problems.push('saknad bild ' + m[1] + ': ' + where);
        if (/https?:\/\//.test(h.replace(/http:\/\/www\.w3\.org\/2000\/svg/g, ''))) problems.push('extern resurs: ' + where);
      }
    }
  }
} } };
const vm = require('vm');
for (const f of process.argv.slice(2)) vm.runInNewContext(fs.readFileSync(path.resolve(f), 'utf8'), { window: global.window, console }, { filename: f });
if (problems.length) { console.error(problems.slice(0, 40).join('\n')); console.error(`${problems.length} problem`); process.exit(1); }
console.log(JSON.stringify(counts));
