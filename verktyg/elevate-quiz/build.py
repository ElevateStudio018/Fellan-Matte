"""Skriver manifest.js utifrån parts.json och de data-*.js-filer som finns.
Datafiler: data-<delnyckel>.js eller data-<delnyckel>-<n>.js. Kör: python3 build.py"""
import glob, json, os, re, subprocess, time
D = os.path.dirname(os.path.abspath(__file__))
parts = json.load(open(os.path.join(D, 'parts.json'), encoding='utf-8'))
out, total = [], 0
for p in parts:
    files = sorted(os.path.basename(f) for f in glob.glob(os.path.join(D, f"data-{p['key']}*.js"))
                   if re.fullmatch(rf"data-{p['key']}(-\d+)?\.js", os.path.basename(f)))
    n = 0
    if files:
        r = subprocess.run(['node', os.path.join(D, 'check.cjs'), *[os.path.join(D, f) for f in files]], capture_output=True, text=True)
        if r.returncode:
            print('HOPPAR ÖVER', p['key'], '(inte klar eller har fel):', r.stderr.strip().splitlines()[-1:] )
            if os.environ.get('STRICT'): raise SystemExit(1)
            files = []
        else:
            n = json.loads(r.stdout).get(p['key'], 0)
    out.append({**p, 'files': files, 'count': n}); total += n
man = {'v': int(time.time()), 'total': total, 'parts': [x for x in out if x['count']]}
open(os.path.join(D, 'manifest.js'), 'w', encoding='utf-8').write('window.QZ_MANIFEST = ' + json.dumps(man, ensure_ascii=False, indent=1) + ';\n')
print('totalt', total, {x['key']: x['count'] for x in out})
