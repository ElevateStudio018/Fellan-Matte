// Bygger de statiska sidorna: src/layout.html + src/pages/*.html -> ./*.html
// Varje sida börjar med en JSON-kommentar: <!--{"title": "...", "description": "...", "nav": "fika"}-->
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('.', import.meta.url).pathname;
const layout = readFileSync(join(root, 'src/layout.html'), 'utf8');
const icons = readFileSync(join(root, 'src/partials/icons.svg'), 'utf8');
const header = readFileSync(join(root, 'src/partials/header.html'), 'utf8');
const footer = readFileSync(join(root, 'src/partials/footer.html'), 'utf8');

const pages = readdirSync(join(root, 'src/pages')).filter((f) => f.endsWith('.html'));

for (const file of pages) {
  const raw = readFileSync(join(root, 'src/pages', file), 'utf8');
  const match = raw.match(/^<!--(\{[\s\S]*?\})-->\s*/);
  if (!match) throw new Error(`${file}: saknar JSON-huvud`);
  const meta = JSON.parse(match[1]);
  const body = raw.slice(match[0].length);

  // Markera aktiv länk i menyn
  const nav = header.replace(/data-nav="([^"]+)"/g, (_, key) =>
    key === meta.nav ? `data-nav="${key}" aria-current="page"` : `data-nav="${key}"`
  );

  const html = layout
    .replaceAll('{{title}}', meta.title)
    .replaceAll('{{description}}', meta.description)
    .replaceAll('{{path}}', file === 'index.html' ? '' : file)
    .replace('{{icons}}', icons)
    .replace('{{header}}', nav)
    .replace('{{footer}}', footer)
    .replace('{{content}}', body.trim());

  writeFileSync(join(root, file), html);
  console.log('byggde', file);
}
