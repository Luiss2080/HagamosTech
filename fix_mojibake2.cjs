const fs = require('fs');

const corruptedFiles = [
  'C:/laragon/www/HagamosTech/src/app/App.jsx',
  'C:/laragon/www/HagamosTech/src/components/Modales/ContactoModal.jsx',
  'C:/laragon/www/HagamosTech/src/components/Modales/InicioSesionModal.jsx',
  'C:/laragon/www/HagamosTech/src/components/Modales/VideoPlayerModal.jsx',
  'C:/laragon/www/HagamosTech/src/pages/QueHacemos/Personalizado/Personalizado.jsx',
  'C:/laragon/www/HagamosTech/src/pages/Servicios/DisenoGrafico/DisenoGrafico.jsx',
  'C:/laragon/www/HagamosTech/src/pages/Servicios/DisenoGrafico/RecorridoDiseno.jsx',
  'C:/laragon/www/HagamosTech/src/pages/Servicios/Empleo/Empleo.jsx',
  'C:/laragon/www/HagamosTech/src/pages/Servicios/Empleo/RecorridoEmpleo.jsx'
];

corruptedFiles.forEach(file => {
  try {
    let content = fs.readFileSync(file, 'utf8');
    
    // Check for 0xC3 character
    if (content.includes('\u00C3')) {
      const fixedContent = Buffer.from(content, 'latin1').toString('utf8');
      fs.writeFileSync(file, fixedContent, 'utf8');
      console.log('Fixed mojibake in', file);
    }
  } catch (err) {
    console.error('Error processing', file, err.message);
  }
});