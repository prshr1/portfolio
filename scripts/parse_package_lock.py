import json, sys
p='C:/Users/FoxtrotX146/OneDrive/Portfolio/package-lock.json'
with open(p,'r',encoding='utf8') as f:
    s=f.read()
try:
    json.loads(s)
    print('JSON_OK')
except json.JSONDecodeError as e:
    print('JSON_ERROR', e.msg, 'at line', e.lineno, 'col', e.colno)
    lines=s.splitlines()
    ln=e.lineno
    start=max(1,ln-3)
    end=min(len(lines),ln+3)
    print('\n--- Surrounding lines ---')
    for i in range(start,end+1):
        prefix='>' if i==ln else ' '
        print(f"{prefix} {i}: {lines[i-1]}")
    sys.exit(2)
