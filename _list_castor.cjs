const fs = require('fs');
const path = require('path');
const ignore = new Set(['node_modules', 'dist', '.git', '.venv', 'pdf', 'coverage', '.agents']);
const root = 'C:\\laragon\\www\\HagamosTech';
const files = [];
function walk(dir) {
  let entries;
  try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch { return; }
  for (const e of entries) {
    if (ignore.has(e.name)) continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) { walk(full); }
    else {
      const ext = path.extname(e.name).toLowerCase();
      if (['.js', '.jsx', '.ts', '.tsx', '.php', '.html', '.md', '.json', '.env', '.example', '.sql', '.py', '.txt', '.prisma'].includes(ext) || e.name.startsWith('.env')) {
        try {
          const content = fs.readFileSync(full, 'utf8');
          if (/castor/i.test(content)) files.push(full);
        } catch {}
      }
    }
  }
}
walk(root);
const rel = files.map(f => f.replace(root + '\\', ''));
console.log('TOTAL: ' + rel.length);
console.log(rel.join('\n'));
