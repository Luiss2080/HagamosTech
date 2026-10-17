// Mapa de metadatos por ruta (Spec 008).
// Se mantiene aislado de App.jsx para poder testearlo sin renderizar.

export const SEO_POR_DEFECTO = {
  title: 'HagamosTech | Soluciones digitales y tecnológicas',
  description:
    'HagamosTech ofrece acompañamiento académico, desarrollo web y software, diseño y soluciones digitales a medida.',
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
    description: 'Desarrollo de páginas web, sistemas y software según el alcance de cada proyecto.',
  },
  {
    coincide: (p) => p.startsWith('/que-hacemos/academia'),
    title: 'Academia | HagamosTech',
    description: 'Apoyo académico: proyectos, simuladores y recursos para estudiantes e instituciones.',
  },
  {
    coincide: (p) => p.startsWith('/que-hacemos/negocios'),
    title: 'Negocios | HagamosTech',
    description: 'Identidad visual, catálogos digitales y presencia web para emprendimientos.',
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
    description: 'Sistemas web y bases de datos según las necesidades y el alcance de cada proyecto.',
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
