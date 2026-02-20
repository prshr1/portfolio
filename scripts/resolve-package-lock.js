const fs = require('fs');
const p = 'C:\\Users\\FoxtrotX146\\OneDrive\\Portfolio\\package-lock.json';
const bak = p + '.orig.bak';
try { fs.copyFileSync(p, bak); console.log('BACKUP_CREATED', bak); } catch (e) { console.error('BACKUP_FAIL', e.message); process.exit(3); }
let s = fs.readFileSync(p, 'utf8');
let out = '';
let i = 0;
while (true) {
  let start = s.indexOf('<<<<<<<', i);
  if (start === -1) { out += s.slice(i); break; }
  out += s.slice(i, start);
  let sep = s.indexOf('\n=======\n', start);
  if (sep === -1) {
    // Try without surrounding newlines
    sep = s.indexOf('=======', start);
    if (sep === -1) { out += s.slice(start); break; }
  }
  // head content starts after the newline following the <<<<<<< line
  let headLineEnd = s.indexOf('\n', start);
  if (headLineEnd === -1 || headLineEnd > sep) headLineEnd = start + ('<<<<<<<'.length);
  let headContent = s.slice(headLineEnd + 1, sep);
  out += headContent;
  let end = s.indexOf('\n>>>>>>>', sep);
  if (end === -1) end = s.indexOf('>>>>>>>', sep);
  if (end === -1) { i = sep; continue; }
  let endLineEnd = s.indexOf('\n', end);
  if (endLineEnd === -1) i = s.length; else i = endLineEnd + 1;
}
fs.writeFileSync(p, out, 'utf8');
try { JSON.parse(out); console.log('JSON_OK'); } catch (e) { console.error('JSON_ERROR', e.message); process.exit(2); }
