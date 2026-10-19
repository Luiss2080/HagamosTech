// Mapa de metadatos por ruta (Spec 008).
// Se mantiene aislado de App.jsx para poder testearlo sin renderizar.

export const SEO_POR_DEFECTO = {
  title: 'HagamosTech | Soluciones digitales y tecnológicas',
  description:
    'HagamosTech ofrece acompañamiento académico, diseño y desarrollo web y de software según el alcance de cada proyecto.',
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
    description: 'Desarrollo de sistemas web y software a medida, evaluado según requisitos y viabilidad.',
  },
  {
    coincide: (p) => p.startsWith('/que-hacemos/academia'),
    title: 'Academia | HagamosTech',
    description: 'Mentorías y orientación para estudiantes de colegio, secundaria e instituto o universidad: tareas guiadas, informes, monografías y proyectos propios.',
  },
  {
    coincide: (p) => p.startsWith('/que-hacemos/negocios'),
    title: 'Negocios | HagamosTech',
    description: 'Diseño y desarrollo web para emprendimientos y empresas, con alcance conversado para cada proyecto.',
  },
  {
    coincide: (p) => p.startsWith('/que-hacemos/personalizado'),
    title: 'Soluciones personalizadas | HagamosTech',
    description: 'Evaluamos soluciones digitales, académicas o de diseño según requisitos, viabilidad y alcance.',
  },
  {
    coincide: (p) => p.startsWith('/servicios/desarrollo-web'),
    title: 'Desarrollo Web | HagamosTech',
    description: 'Sitios, portales, tiendas online, catálogos, plataformas y aplicaciones web definidos según cada proyecto.',
  },
  {
    coincide: (p) => p.startsWith('/servicios/sistemas-apps'),
    title: 'Sistemas y Apps | HagamosTech',
    description: 'Desarrollo de sistemas, software y bases de datos para necesidades comerciales e institucionales, según alcance y viabilidad.',
  },
  {
    coincide: (p) => p.startsWith('/servicios/inteligencia-artificial'),
    title: 'Soluciones digitales a medida | HagamosTech',
    description: 'Evaluación de soluciones web, software y herramientas digitales a medida.',
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
    title: 'Alternativas para tu proyecto | HagamosTech',
    description: 'Conversemos sobre acompañamiento académico, diseño y desarrollo digital según tu necesidad.',
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
    coincide: (p) => p.startsWith('/perfil/espacio'),
    title: 'Mi espacio personal | HagamosTech',
    description: 'Organizá proyectos, notas y recordatorios en tu cuenta privada.',
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
