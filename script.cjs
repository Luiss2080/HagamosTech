const fs = require('fs');
const path = require('path');

const PAGES = [
    {
        id: 'SistemasApps',
        dir: 'SistemasApps',
        route: '/servicios/sistemas-apps',
        headerId: 'srv-apps',
        title: 'Sistemas y Apps',
        desc: 'Diseño y desarrollo de aplicaciones móviles y plataformas web a medida para optimizar los procesos de tu empresa.',
        pill: 'Sistemas y Apps Profesionales — TECH HOME',
        fileIcon: 'App.tsx',
        image: '/img/07_Servicios/soluciones/SistemaApp.png',
        componentName: 'SistemasApps',
        recorridoName: 'RecorridoSistemasApps'
    },
    {
        id: 'Automatizacion',
        dir: 'Automatizacion',
        route: '/servicios/automatizacion',
        headerId: 'srv-auto',
        title: 'Automatización',
        desc: 'Optimizamos procesos empresariales y tareas repetitivas mediante automatización de flujos de trabajo.',
        pill: 'Automatización de Procesos — TECH HOME',
        fileIcon: 'automation.py',
        image: '/img/07_Servicios/soluciones/Automatizacion.png',
        componentName: 'Automatizacion',
        recorridoName: 'RecorridoAutomatizacion'
    },
    {
        id: 'InteligenciaArtificial',
        dir: 'InteligenciaArtificial',
        route: '/servicios/inteligencia-artificial',
        headerId: 'srv-ia',
        title: 'Inteligencia Artificial',
        desc: 'Implementamos IA y modelos de machine learning para transformar tus datos en decisiones estratégicas.',
        pill: 'Soluciones de IA — TECH HOME',
        fileIcon: 'model.py',
        image: '/img/07_Servicios/soluciones/IA.png',
        componentName: 'InteligenciaArtificial',
        recorridoName: 'RecorridoIA'
    },
    {
        id: 'Negocio',
        dir: 'Negocio',
        route: '/servicios/para-tu-negocio',
        headerId: 'srv-negocio',
        title: 'Para tu Negocio',
        desc: 'Digitalización completa, e-commerce, y presencia online integral para multiplicar tus ventas y alcance.',
        pill: 'Digitalización de Negocios — TECH HOME',
        fileIcon: 'business.config.js',
        image: '/img/07_Servicios/soluciones/Negocio.png',
        componentName: 'Negocio',
        recorridoName: 'RecorridoNegocio'
    },
    {
        id: 'Academico',
        dir: 'Academico',
        route: '/servicios/apoyo-academico',
        headerId: 'srv-academico',
        title: 'Apoyo Académico',
        desc: 'Proyectos universitarios, simuladores educativos y recursos académicos de alto nivel para estudiantes e instituciones.',
        pill: 'Soluciones Académicas — TECH HOME',
        fileIcon: 'simulador.js',
        image: '/img/07_Servicios/soluciones/Academico.png',
        componentName: 'Academico',
        recorridoName: 'RecorridoAcademico'
    }
];

const basePath = path.join(__dirname, 'src', 'pages', 'Servicios');
const templateMain = fs.readFileSync(path.join(basePath, 'DesarrolloWeb', 'PaginasWeb.jsx'), 'utf8');
const templateRecorrido = fs.readFileSync(path.join(basePath, 'DesarrolloWeb', 'RecorridoPaginasWeb.jsx'), 'utf8');

PAGES.forEach(page => {
    const dirPath = path.join(basePath, page.dir);
    if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });

    // Generate Main Page
    let newMain = templateMain
        .replace(/Páginas Web/g, page.title)
        .replace(/Diseño y desarrollo profesional de sitios web para cualquier tipo de cliente y necesidad\. Landing pages, tiendas virtuales, catálogos, blogs y mucho más, listos para posicionar tu marca\./g, page.desc)
        .replace(/Páginas Web Profesionales — TECH HOME/g, page.pill)
        .replace(/App\.js/g, page.fileIcon)
        .replace(/\/img\/07_Servicios\/soluciones\/PaginaWeb\.png/g, page.image)
        
        .replace(/RecorridoPaginasWeb/g, page.recorridoName).replace(/PaginasWeb/g, page.componentName);
    
    fs.writeFileSync(path.join(dirPath, `${page.componentName}.jsx`), newMain);

    // Generate Recorrido
    let newRecorrido = templateRecorrido
        .replace(/Páginas Web/g, page.title)
        .replace(/RecorridoPaginasWeb/g, page.recorridoName).replace(/PaginasWeb/g, page.componentName);
    
    fs.writeFileSync(path.join(dirPath, `${page.recorridoName}.jsx`), newRecorrido);
});

// Update App.jsx
let appPath = path.join(__dirname, 'src', 'app', 'App.jsx');
let appContent = fs.readFileSync(appPath, 'utf8');

let imports = PAGES.map(p => `import ${p.componentName} from '../pages/Servicios/${p.dir}/${p.componentName}';`).join('\n');
let routes = PAGES.map(p => `              <Route path="${p.route}" element={<${p.componentName} />} />`).join('\n');

appContent = appContent.replace("import PaginasWeb from '../pages/Servicios/DesarrolloWeb/PaginasWeb';", `import PaginasWeb from '../pages/Servicios/DesarrolloWeb/PaginasWeb';\n${imports}`);
appContent = appContent.replace('<Route path="/servicios/desarrollo-web" element={<PaginasWeb />} />', `<Route path="/servicios/desarrollo-web" element={<PaginasWeb />} />\n${routes}`);

fs.writeFileSync(appPath, appContent);

// Update Header.jsx
let headerPath = path.join(__dirname, 'src', 'components', 'Layout', 'Header.jsx');
let headerContent = fs.readFileSync(headerPath, 'utf8');

PAGES.forEach(page => {
    const regex = new RegExp(`{ id: '${page.headerId}', label: '${page.title}', desc: '(.*?)', target: '/#([^']+)', icon: '(.*?)' }`, 'g');
    headerContent = headerContent.replace(regex, `{ id: '${page.headerId}', label: '${page.title}', desc: '$1', target: '${page.route}', icon: '$3' }`);
});

fs.writeFileSync(headerPath, headerContent);

console.log("Done generating files and updating routes.");
