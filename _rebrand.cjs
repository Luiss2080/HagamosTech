const fs = require('fs');
const path = require('path');
const ignore = new Set(['node_modules', 'dist', '.git', '.venv', 'pdf', 'coverage', '.agents']);
const root = 'C:\\laragon\\www\\HagamosTech';

const replacements = [
  [/castores fieles/gi, 'clientes fieles'],
  [/castorense/gi, 'HagamosTech'],
  [/castores\.salteneria/gi, 'hagamostech'],
  [/castores\.scz/gi, 'hagamostech'],
  [/castoresscz/gi, 'hagamostech'],
  [/@loscastores\.bo/gi, '@hagamostech.bo'],
  [/loscastores\.bo/gi, 'hagamostech.bo'],
  [/loscastores\.com/gi, 'hagamostech.com'],
  [/[Ll]osCastoresSCZ/g, 'HagamosTech'],
  [/Los Castores/g, 'HagamosTech'],
  [/LOS CASTORES/g, 'HAGAMOSTECH'],
  [/los castores/g, 'HagamosTech'],
  [/CASTORES/g, 'HAGAMOSTECH'],
  [/Castores/g, 'HagamosTech'],
  [/Castor/g, 'HagamosTech'],
  [/castores/g, 'HagamosTech'],
];

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
      const isEnv = e.name.startsWith('.env');
      if (['.js', '.jsx', '.ts', '.tsx', '.php', '.html', '.md', '.json', '.sql', '.py', '.txt', '.prisma'].includes(ext) || isEnv) {
        files.push(full);
      }
    }
  }
}
walk(root);

let changed = 0;
for (const f of files) {
  let buf;
  try { buf = fs.readFileSync(f); } catch { continue; }
  const hasBOM = buf.length >= 3 && buf[0] === 0xEF && buf[1] === 0xBB && buf[2] === 0xBF;
  let content = buf.toString('utf8');
  if (hasBOM) content = content.slice(1);
  let modified = false;
  for (const [re, sub] of replacements) {
    if (re.test(content)) { content = content.replace(re, sub); modified = true; }
  }
  if (modified) {
    changed++;
    const out = hasBOM ? '﻿' + content : content;
    fs.writeFileSync(f, out, 'utf8');
  }
}
console.log('Archivos modificados: ' + changed + ' de ' + files.length + ' revisados');
