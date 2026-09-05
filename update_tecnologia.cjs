const fs = require('fs');
const path = require('path');

const dirPath = 'src/pages/QueHacemos/Tecnologia';
const mainPath = path.join(dirPath, 'Tecnologia.jsx');
const recorridoPath = path.join(dirPath, 'RecorridoTecnologia.jsx');

let mainContent = fs.readFileSync(mainPath, 'utf8');

// Replace imports in Main
mainContent = mainContent.replace(/RecorridoPaginasWeb/g, 'RecorridoTecnologia');
mainContent = mainContent.replace(/PaginasWeb/g, 'Tecnologia');
mainContent = mainContent.replace(/import TrustedClients from '..\/..\/..\/components\/carouseles\/ClientesConfian';/g, "import TrustedClients from '../../../components/carouseles/ClientesConfian';");
// Adjust imports depth (from src/pages/QueHacemos/Tecnologia it is 3 levels up to src: ../../../)
// Wait, QueHacemos is inside src/pages. So src/pages/QueHacemos/Tecnologia is 3 levels deep.
// Servicios/DesarrolloWeb is ALSO 3 levels deep. So the imports are already perfectly fine!

// Replace generic text
mainContent = mainContent.replace(/¿QUÉ ES ESTE SERVICIO PREMIUM Y CÓMO AYUDA A TU EMPRESA\?/g, '¿QUÉ ES NUESTRA ÁREA DE TECNOLOGÍA Y CÓMO POTENCIA TU VISIÓN?');
mainContent = mainContent.replace(/Diseñamos y desarrollamos sitios web profesionales que actúan como la carta de presentación digital de tu negocio: modernos, rápidos y fáciles de navegar, para dar a conocer tu marca ante todos./g, 'En HagamosTech, integramos desarrollo a medida, sistemas robustos, automatización y soluciones de IA para transformar tu negocio. Llevamos tus ideas al mundo digital con arquitecturas de alto rendimiento.');
mainContent = mainContent.replace(/INCLUYE: Landing Pages, Sitios Corporativos, Tiendas Online, Catálogos, Blogs, Portafolios, Reservas, Restaurantes, Plataformas Educativas, Portales, Cursos, Directorios, Aplicaciones Web y Soluciones Personalizadas./g, 'INCLUYE: Desarrollo Web, Sistemas y Aplicaciones, Automatización de Procesos, Inteligencia Artificial, APIs, y Soluciones a Medida para transformar tu empresa.');

// Replace MetaTags
mainContent = mainContent.replace(/<MetaTags title="TECH HOME - Desarrollo Web" \/>/g, '<MetaTags title="HagamosTech - Tecnología" />');

// Replace floating code
mainContent = mainContent.replace(/const serviceData = {[\s\S]*?};/g, `const areaTecnologia = {
  nombre: "Desarrollo y Tecnología",
  enfoque: ["Web", "Sistemas", "Automatización", "IA"],
  stack: ["React", "Node", "Python", "AWS"],
  rendimiento: "Alta Escalabilidad",
  innovacion: true
};`);
mainContent = mainContent.replace(/<span className="text-[#A3E635]">export const<\/span> <span className="text-white">Servicio<\/span> = \(\) =&gt; {/g, '<span className="text-[#A3E635]">export const</span> <span className="text-white">Tecnologia</span> = () =&gt; {');
mainContent = mainContent.replace(/return &lt;DesarrolloWeb data=\{serviceData\} \/&gt;;/g, 'return &lt;SolucionTecnologica data={areaTecnologia} /&gt;;');

fs.writeFileSync(mainPath, mainContent);

// Process Recorrido
let recorridoContent = fs.readFileSync(recorridoPath, 'utf8');
recorridoContent = recorridoContent.replace(/RecorridoPaginasWeb/g, 'RecorridoTecnologia');
recorridoContent = recorridoContent.replace(/Nuestro recorrido en <br \/>/g, 'Nuestro enfoque en <br />');
recorridoContent = recorridoContent.replace(/Páginas Web\./g, 'Tecnología.');
recorridoContent = recorridoContent.replace(/const PROJECTS = \[[\s\S]*?\];/, `const PROJECTS = [
  { num: '01', title: 'Paso 1: Desarrollo Web y E-Commerce', desc: 'Construimos tiendas virtuales, landing pages corporativas y portafolios interactivos optimizados para máxima velocidad y captación de leads.', tags: ['React', 'Next.js', 'Tailwind CSS'], icon: 'fa-globe', images: ['https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&w=800&q=80'] },
  { num: '02', title: 'Paso 2: Sistemas y Aplicaciones', desc: 'Desarrollamos soluciones de software a medida y plataformas móviles que automatizan y escalan las operaciones de tu empresa sin límites.', tags: ['Sistemas', 'APIs', 'AWS'], icon: 'fa-server', images: ['https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=800&q=80'] },
  { num: '03', title: 'Paso 3: Automatización de Procesos', desc: 'Conectamos tus herramientas, CRMs y sistemas de facturación para eliminar tareas repetitivas y reducir el margen de error humano a cero.', tags: ['Automatización', 'Integración', 'Webhooks'], icon: 'fa-gears', images: ['https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1580894908361-9671951555ca?auto=format&fit=crop&w=800&q=80'] },
  { num: '04', title: 'Paso 4: Inteligencia Artificial', desc: 'Implementamos asistentes virtuales, modelos predictivos y repositorios de prompts personalizados que potencian la toma de decisiones en tu equipo.', tags: ['Machine Learning', 'Prompts', 'Chatbots'], icon: 'fa-brain', images: ['https://images.unsplash.com/photo-1515503240222-14c115c56f54?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80'] }
];`);
fs.writeFileSync(recorridoPath, recorridoContent);
