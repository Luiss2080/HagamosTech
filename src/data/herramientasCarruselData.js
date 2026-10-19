import { BRAND_LOGOS } from '../components/ui/TechToolCard';

const createTool = (name, tag, desc) => ({
  name,
  tag,
  desc,
  cardDescription: 'Uso según los requisitos del proyecto',
  logo: BRAND_LOGOS[name],
});

export const HERRAMIENTAS_DESARROLLO = [
  createTool('React', 'Frontend UI', 'Biblioteca para construir interfaces web interactivas.'),
  createTool('JavaScript', 'Lógica web', 'Lenguaje para crear interacciones y funciones web.'),
  createTool('TypeScript', 'Lógica tipada', 'Extensión tipada de JavaScript para organizar código.'),
  createTool('Vite', 'Herramientas web', 'Entorno de desarrollo y compilación para proyectos frontend.'),
  createTool('HTML5', 'Estructura web', 'Lenguaje de marcado para estructurar páginas web.'),
  createTool('CSS3', 'Estilos web', 'Tecnología para definir la presentación de interfaces web.'),
  createTool('Tailwind CSS', 'Diseño y estilo', 'Framework CSS para construir interfaces adaptables.'),
  createTool('Node.js', 'Aplicaciones', 'Entorno para desarrollar aplicaciones con JavaScript.'),
  createTool('MySQL', 'Base de datos', 'Sistema relacional para organizar y consultar datos.'),
  createTool('PostgreSQL', 'Base de datos', 'Sistema relacional para almacenar información de proyectos.'),
  createTool('Git', 'Control de versiones', 'Herramienta para registrar cambios en el código.'),
  createTool('GitHub', 'Repositorios', 'Plataforma para alojar y revisar código.'),
  createTool('Figma', 'Diseño UI/UX', 'Herramienta para diseñar y prototipar interfaces.'),
  createTool('Postman', 'Pruebas de API', 'Herramienta para revisar solicitudes e integraciones API.'),
];

export const HERRAMIENTAS_ACADEMICAS = [
  createTool('Microsoft Word', 'Documentos', 'Procesador de texto para redactar y dar formato a documentos.'),
  createTool('PowerPoint', 'Presentaciones', 'Herramienta para organizar contenido en exposiciones.'),
  createTool('Excel', 'Hojas de cálculo', 'Herramienta para organizar datos, fórmulas y tablas.'),
  createTool('Google Docs', 'Documentos', 'Editor colaborativo de documentos en línea.'),
  createTool('Google Sheets', 'Hojas de cálculo', 'Hojas de cálculo colaborativas en línea.'),
  createTool('Canva', 'Diseño visual', 'Herramienta para organizar piezas visuales y presentaciones.'),
  createTool('Zotero', 'Referencias', 'Gestor bibliográfico para organizar fuentes y citas.'),
  createTool('Mendeley', 'Referencias', 'Gestor de referencias para organizar bibliografía.'),
  createTool('LaTeX', 'Edición científica', 'Sistema de composición para documentos técnicos y académicos.'),
  createTool('SPSS', 'Análisis estadístico', 'Software para análisis estadístico de datos.'),
  createTool('MATLAB', 'Cálculo y simulación', 'Entorno de cálculo numérico y análisis técnico.'),
  createTool('Python', 'Programación', 'Lenguaje utilizado en programación y análisis de datos.'),
  createTool('RStudio', 'Análisis estadístico', 'Entorno de trabajo para proyectos con R.'),
  createTool('GeoGebra', 'Matemática', 'Herramienta para explorar conceptos y construcciones matemáticas.'),
  createTool('Desmos', 'Matemática', 'Calculadora gráfica para explorar funciones y ecuaciones.'),
  createTool('Cisco Packet Tracer', 'Redes', 'Simulador didáctico para explorar redes informáticas.'),
  createTool('draw.io', 'Diagramas', 'Herramienta para crear diagramas y esquemas.'),
  createTool('Visual Studio Code', 'Editor de código', 'Editor para trabajar con archivos y proyectos de programación.'),
];
