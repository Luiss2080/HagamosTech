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
  'AtracciN': 'Atracción',
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
  'comunicacin': 'comunicación',
  'MIGRACIN': 'MIGRACIÓN',
  'produccin': 'producción'
};

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;
    
    // We will find all instances of replacement char (0xFFFD)
    // To do this reliably, we can just replace ''
    Object.keys(dict).forEach(key => {
      const searchKey = key.replace(/[áéíóúñÁÉÍÓÚÑ]/g, '');
      content = content.split(searchKey).join(dict[key]);
    });

    if (content !== original) {
      fs.writeFileSync(file, content, 'utf8');
      console.log('Fixed words in', file);
    }
  }
});