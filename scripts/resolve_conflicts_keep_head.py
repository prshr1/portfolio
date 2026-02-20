import io,sys
p='C:/Users/FoxtrotX146/OneDrive/Portfolio/package-lock.json'
# backup
import shutil
shutil.copy2(p,p+'.pre-resolve.bak')
with open(p,'r',encoding='utf-8-sig') as f:
    s=f.read()
lines = s.splitlines()
out_lines=[]
state='normal'
for line in lines:
    if line.startswith('<<<<<<<'):
        state='head'
        continue
    if line=='=======':
        if state=='head':
            state='skip'
            continue
    if line.startswith('>>>>>>>'):
        state='normal'
        continue
    if state in ('head','normal'):
        out_lines.append(line)
# write without BOM
with open(p,'w',encoding='utf-8') as f:
    f.write('\n'.join(out_lines)+('\n' if s.endswith('\n') else ''))
# validate JSON
import json
try:
    json.loads(open(p,'r',encoding='utf-8').read())
    print('RESOLVE_OK')
except Exception as e:
    print('RESOLVE_FAIL',str(e))
    # print surrounding context for first error
    try:
        import json
        json.loads(open(p,'r',encoding='utf-8').read())
    except Exception as e2:
        print('ERR',e2)
    sys.exit(2)
