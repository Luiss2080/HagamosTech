const fs = require('fs');
let c = fs.readFileSync('update_content.cjs', 'utf8');
c = c.replace(/`¿QUÉ ES \$\{data\.title\} Y CÓMO AYUDA A TU EMPRESA\?`/g, "'¿QUÉ ES ' + data.title + ' Y CÓMO AYUDA A TU EMPRESA?'");
fs.writeFileSync('update_content.cjs', c);
