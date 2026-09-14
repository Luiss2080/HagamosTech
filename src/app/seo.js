// Mapa de metadatos por ruta (Spec 008).
// Se mantiene aislado de App.jsx para poder testearlo sin renderizar.

export const SEO_POR_DEFECTO = {
  title: 'HagamosTech | Soluciones digitales y tecnológicas',
  description:
    'HagamosTech transforma problemas, necesidades e ideas en soluciones reales: web, software, diseño, automatización e inteligencia artificial.',
};

const REGLAS = [
  {
    coincide: (p) => p === '/' || p === '',
    title: 'HagamosTech | Soluciones digitales y tecnológicas',
    description: SEO_POR_DEFECTO.description,
  },
  {
    coincide: (p) => p.startsWith('/que-hacemos/tecnologia'),
    title: 'Tecnología | HagamosTech',
    description: 'Desarrollo web, sistemas, automatización e inteligencia artificial a medida.',
  },
  {
    coincide: (p) => p.startsWith('/que-hacemos/academia'),
    title: 'Academia | HagamosTech',
    description: 'Apoyo académico: proyectos, simuladores y recursos para estudiantes e instituciones.',
  },
  {
    coincide: (p) => p.startsWith('/que-hacemos/negocios'),
    title: 'Negocios | HagamosTech',
    description: 'Digitalización, páginas web y automatización para emprendedores y pymes.',
  },
  {
    coincide: (p) => p.startsWith('/que-hacemos/personalizado'),
    title: 'Soluciones personalizadas | HagamosTech',
    description: 'Contanos tu problema y lo resolvemos con tecnología a medida.',
  },
  {
    coincide: (p) => p.startsWith('/servicios/desarrollo-web'),
    title: 'Desarrollo Web | HagamosTech',
    description: 'Páginas web empresariales, landing pages y tiendas online.',
  },
  {
    coincide: (p) => p.startsWith('/servicios/sistemas-apps'),
    title: 'Sistemas y Apps | HagamosTech',
    description: 'Sistemas de gestión y aplicaciones a medida para tu negocio.',
  },
  {
    coincide: (p) => p.startsWith('/servicios/automatizacion'),
    title: 'Automatización | HagamosTech',
    description: 'Automatizamos procesos y conectamos tus herramientas.',
  },
  {
    coincide: (p) => p.startsWith('/servicios/inteligencia-artificial'),
    title: 'Inteligencia Artificial | HagamosTech',
    description: 'Asistentes, análisis predictivo e integración de IA.',
  },
  {
    coincide: (p) => p.startsWith('/servicios/para-tu-negocio'),
    title: 'Soluciones para tu negocio | HagamosTech',
    description: 'Presencia online, digitalización y herramientas para tu empresa.',
  },
  {
    coincide: (p) => p.startsWith('/servicios/apoyo-academico'),
    title: 'Apoyo académico | HagamosTech',
    description: 'Proyectos, documentación y simuladores para el ámbito académico.',
  },
  {
    coincide: (p) => p.startsWith('/servicios/empleo'),
    title: 'Empleo | HagamosTech',
    description: 'CV optimizado ATS, LinkedIn, portafolios y preparación de entrevistas.',
  },
  {
    coincide: (p) => p.startsWith('/servicios/diseno-grafico'),
    title: 'Diseño Gráfico | HagamosTech',
    description: 'Identidad visual, branding, flyers y retoque fotográfico.',
  },
  {
    coincide: (p) => p.startsWith('/promociones'),
    title: 'Promociones y planes | HagamosTech',
    description: 'Packs y planes de soporte para potenciar tu proyecto.',
  },
  {
    coincide: (p) => p.startsWith('/novedades'),
    title: 'Novedades | HagamosTech',
    description: 'Lanzamientos, talleres, logros y avisos de HagamosTech.',
  },
  {
    coincide: (p) => p.startsWith('/como-trabajamos'),
    title: 'Cómo trabajamos | HagamosTech',
    description: 'Nuestro proceso para transformar tu necesidad en una solución.',
  },
  {
    coincide: (p) => p.startsWith('/contactanos') || p.startsWith('/contacto'),
    title: 'Contacto | HagamosTech',
    description: 'Escribinos y te armamos una propuesta a medida.',
  },
  {
    coincide: (p) => p.startsWith('/sobre-nosotros'),
    title: 'Sobre nosotros | HagamosTech',
    description: 'Historia, misión, visión y valores de HagamosTech.',
  },
  {
    coincide: (p) => p.startsWith('/perfil') || p.startsWith('/configuracion'),
    title: 'Mi cuenta | HagamosTech',
    description: 'Gestioná tu perfil, preferencias y seguridad.',
  },
  {
    coincide: (p) => p.startsWith('/errors/'),
    title: 'Error | HagamosTech',
    description: 'Ocurrió un problema al cargar la página.',
  },
];

export function tituloParaRuta(pathname = '/') {
  const regla = REGLAS.find((r) => r.coincide(pathname));
  return regla ? { title: regla.title, description: regla.description } : SEO_POR_DEFECTO;
}

export default tituloParaRuta;
