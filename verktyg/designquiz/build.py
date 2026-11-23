"""Builds quiz.html (everything inline, for publishing) and preview.html (linked files, for local testing)."""
import os

D = os.path.dirname(os.path.abspath(__file__))
DATA = ['data-detaljer-a.js', 'data-detaljer-b.js', 'data-sektioner.js', 'data-generellt.js', 'data-hero.js']


def read(name):
    with open(os.path.join(D, name), encoding='utf-8') as f:
        return f.read()


shell = read('shell.html')
base = read('base.css')
engine = read('engine.js')
present = [n for n in DATA if os.path.exists(os.path.join(D, n))]

inline_data = '\n'.join('<script>\n' + read(n).replace('</script', '<\\/script') + '\n</script>' for n in present)
out = shell.replace('/*BASE_CSS*/', base).replace('<!--DATA-->', inline_data).replace('/*ENGINE*/', engine)
with open(os.path.join(D, 'quiz.html'), 'w', encoding='utf-8') as f:
    f.write(out)

linked = shell.replace('<style>/*BASE_CSS*/</style>', '<link rel="stylesheet" href="base.css">') \
    .replace('<!--DATA-->', '\n'.join(f'<script src="{n}"></script>' for n in DATA)) \
    .replace('<script>/*ENGINE*/</script>', '<script src="engine.js"></script>')
with open(os.path.join(D, 'preview.html'), 'w', encoding='utf-8') as f:
    f.write('<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">\n' + linked)

print('built with', present, 'size', len(out))
