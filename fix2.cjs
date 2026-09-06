const fs = require('fs');

const affected = [
  'c:/laragon/www/HagamosTech/src/pages/QueHacemos/Personalizado/Personalizado.jsx',
  'c:/laragon/www/HagamosTech/src/pages/Servicios/Empleo/Empleo.jsx',
  'c:/laragon/www/HagamosTech/src/pages/Servicios/Empleo/RecorridoEmpleo.jsx',
  'c:/laragon/www/HagamosTech/src/pages/Servicios/DisenoGrafico/DisenoGrafico.jsx',
  'c:/laragon/www/HagamosTech/src/pages/Servicios/DisenoGrafico/RecorridoDiseno.jsx',
  'c:/laragon/www/HagamosTech/src/app/App.jsx'
];

affected.forEach(file => {
  try {
    const buf = fs.readFileSync(file);
    // If we see 0x00 bytes, it's likely UTF-16LE
    if (buf.indexOf(0x00) !== -1) {
      let content = buf.toString('utf16le');
      // If the first char is BOM, remove it
      if (content.charCodeAt(0) === 0xFEFF) {
        content = content.substring(1);
      }
      fs.writeFileSync(file, content, 'utf8');
      console.log('Fixed encoding for', file);
    }
  } catch(e) {
      console.log(e);
  }
});
