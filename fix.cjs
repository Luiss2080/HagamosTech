const fs = require('fs');
const path = require('path');

// 1. Fix Recorrido closing divs
const dir = 'c:/laragon/www/HagamosTech/src/pages/Servicios';
const files = [];

const walkSync = (d) => {
  const list = fs.readdirSync(d);
  list.forEach(file => {
    const filePath = path.join(d, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      walkSync(filePath);
    } else {
      if (file.startsWith('Recorrido') && file.endsWith('.jsx')) {
        files.push(filePath);
      }
    }
  });
};
walkSync(dir);

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes('</section>') && !content.includes('</div>\n    </section>')) {
    content = content.replace('</section>', '</div>\n    </section>');
    fs.writeFileSync(file, content, 'utf8');
  }
});

// 2. Fix UTF-16 LE encoding on Personalizado, Empleo, DisenoGrafico and App.jsx just in case
const affected = [
  'c:/laragon/www/HagamosTech/src/pages/QueHacemos/Personalizado/Personalizado.jsx',
  'c:/laragon/www/HagamosTech/src/pages/Servicios/Empleo/Empleo.jsx',
  'c:/laragon/www/HagamosTech/src/pages/Servicios/DisenoGrafico/DisenoGrafico.jsx',
  'c:/laragon/www/HagamosTech/src/pages/Servicios/DisenoGrafico/RecorridoDiseno.jsx',
  'c:/laragon/www/HagamosTech/src/app/App.jsx'
];

affected.forEach(file => {
  try {
    const buf = fs.readFileSync(file);
    // If first two bytes are FF FE, it's UTF-16 LE BOM
    if (buf.length >= 2 && buf[0] === 0xFF && buf[1] === 0xFE) {
      const content = buf.toString('utf16le');
      fs.writeFileSync(file, content, 'utf8');
      console.log('Fixed encoding for', file);
    }
  } catch(e) {}
});

console.log('Fixes applied.');
