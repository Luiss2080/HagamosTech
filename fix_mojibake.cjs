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
    
    // Only attempt to fix if it actually contains the corruption symbol Ã (which is Latin-1 for 0xC3)
    if (content.includes('Ã')) {
      // Decode the incorrectly-encoded UTF-8 string into raw bytes using latin1,
      // then read those raw bytes back out as proper UTF-8
      const fixedContent = Buffer.from(content, 'latin1').toString('utf8');
      
      fs.writeFileSync(file, fixedContent, 'utf8');
      console.log('Fixed mojibake in', file);
    }
  } catch (err) {
    console.error('Error processing', file, err.message);
  }
});
