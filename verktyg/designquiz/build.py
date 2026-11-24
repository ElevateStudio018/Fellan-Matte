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

# Images are embedded as data URIs so they show in every viewer, without separate file requests.
import base64, glob, io, json
from PIL import Image
imgs = {}
for f in sorted(glob.glob(os.path.join(D, 'img', '*.jpg'))):
    im = Image.open(f).convert('RGB')
    w, h = im.size
    sc = min(1.0, 1000 / max(w, h))
    im = im.resize((int(w * sc), int(h * sc)), Image.LANCZOS)
    buf = io.BytesIO()
    im.save(buf, 'JPEG', quality=68, optimize=True, progressive=True)
    imgs[os.path.basename(f)] = 'data:image/jpeg;base64,' + base64.b64encode(buf.getvalue()).decode()
img_script = '<script>window.QUIZ_IMGS=' + json.dumps(imgs) + ';</script>'

inline_data = '\n'.join('<script>\n' + read(n).replace('</script', '<\\/script') + '\n</script>' for n in present)
out = shell.replace('/*BASE_CSS*/', base).replace('<!--DATA-->', img_script + '\n' + inline_data).replace('/*ENGINE*/', engine)
with open(os.path.join(D, 'quiz.html'), 'w', encoding='utf-8') as f:
    f.write(out)

linked = shell.replace('<style>/*BASE_CSS*/</style>', '<link rel="stylesheet" href="base.css">') \
    .replace('<!--DATA-->', img_script + '\n' + '\n'.join(f'<script src="{n}"></script>' for n in DATA)) \
    .replace('<script>/*ENGINE*/</script>', '<script src="engine.js"></script>')
with open(os.path.join(D, 'preview.html'), 'w', encoding='utf-8') as f:
    f.write('<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">\n' + linked)

print('built with', present, 'size', len(out))
