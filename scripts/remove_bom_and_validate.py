import json
p='C:/Users/FoxtrotX146/OneDrive/Portfolio/package-lock.json'
with open(p,'r',encoding='utf-8-sig') as f:
    s=f.read()
with open(p,'w',encoding='utf-8') as f:
    f.write(s)
try:
    json.loads(s)
    print('REWRITTEN_JSON_OK')
except Exception as e:
    print('REWRITTEN_JSON_ERROR', e)
    raise
