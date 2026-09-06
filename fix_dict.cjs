const fs = require('fs');

const files = [
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

const dict = {
  'atpica': 'atípica',
  'mdulo': 'módulo',
  'especfico': 'específico',
  'diseamos': 'diseñamos',
  'MENTORA': 'MENTORÍA',
  'Auditora': 'Auditoría',
  'Mentoras': 'Mentorías',
  'Mentora': 'Mentoría',
  'tecnologa': 'tecnología',
  'estn': 'están',
  'mxima': 'máxima',
  'cdigo': 'código',
  'xito': 'éxito',
  'Diseo Grfico': 'Diseño Gráfico',
  'Diseo': 'Diseño',
  'Grfico': 'Gráfico',
  'Cuntanoslo': 'Cuéntanoslo',
  'INNOVACIN': 'INNOVACIÓN',
  'Atraccin': 'Atracción',
  'Currculum': 'Currículum',
  'Bsqueda': 'Búsqueda',
  'Preparacin': 'Preparación',
  'Entrenars': 'Entrenarás',
  'Diseos': 'Diseños',
  'Fotogrfico': 'Fotográfico',
  'Impresin': 'Impresión',
  'Post-Produccin': 'Post-Producción',
  'Presentacin': 'Presentación',
  'Edicin': 'Edición',
  'Catlogos': 'Catálogos',
  'Catlogo': 'Catálogo',
  'No': '¿No',
  'Cmo': '¿Cómo',
  'Tienes': '¿Tienes',
  'Trminos': 'Términos',
  'Condicin': 'Condición',
  'Condiciones': 'Condiciones', // no change
  'Poltica': 'Política',
  'Privacidad': 'Privacidad',
  'slo': 'sólo',
  'aqu': 'aquí',
  'profesin': 'profesión',
  'accin': 'acción',
  'ms': 'más',
  'est': 'está',
  'Inici': 'Inició',
  'Inicia sesin': 'Inicia sesión',
  'Sesin': 'Sesión',
  'Contrasea': 'Contraseña',
  'electrnico': 'electrónico',
  'telfono': 'teléfono',
  'compaa': 'compañía',
  'diseado': 'diseñado',
  'tamaos': 'tamaños',
  'nete': 'Únete',
  'Qu': '¿Qué',
  'hacis': 'hacéis',
  'sabs': 'sabés',
  'necesits': 'necesitás',
  'Llev': 'Llevá',
  'Acadmico': 'Académico',
  'vehculos': 'vehículos',
  'automatizacin': 'automatización',
  'visin': 'visión',
  'misin': 'misión',
  'comunicacin': 'comunicación'
};

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;
    
    // Check for ¿ missing a part
    content = content.replace(//g, match => {
        // We will just do full word replacement instead to be safe
        return match;
    });

    Object.keys(dict).forEach(key => {
      // global replace string
      content = content.split(key).join(dict[key]);
    });
    
    // Fallback for remaining  characters if they are known or just to see them
    if (content.includes('')) {
      console.log('WARNING: Still contains  in', file);
      // Let's print the context
      let idx = content.indexOf('');
      while (idx !== -1) {
        console.log('Context:', content.substring(Math.max(0, idx - 10), Math.min(content.length, idx + 10)));
        idx = content.indexOf('', idx + 1);
      }
    }

    if (content !== original) {
      fs.writeFileSync(file, content, 'utf8');
      console.log('Fixed words in', file);
    }
  }
});