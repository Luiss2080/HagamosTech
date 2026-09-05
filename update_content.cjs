const fs = require('fs');
const path = require('path');

const basePath = path.join(__dirname, 'src', 'pages', 'Servicios');

const imagesSet1 = "['https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80']";
const imagesSet2 = "['https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80']";
const imagesSet3 = "['https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1481481656886-90518be57416?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1512758117921-be3d65b16954?auto=format&fit=crop&w=800&q=80']";
const imagesSet4 = "['https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80']";
const imagesSet5 = "['https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=800&q=80']";

const categories = {
    'SistemasApps': {
        main: 'SistemasApps',
        recorrido: 'RecorridoSistemasApps',
        title: 'SISTEMAS Y APLICACIONES',
        desc: 'Desarrollamos soluciones de software a medida, aplicaciones móviles y sistemas web robustos que optimizan y escalan las operaciones de tu empresa.',
        incluye: 'Sistemas Web, Aplicaciones Móviles, APIs, Bases de Datos SQL, Dashboards Corporativos, Software a Medida, Arquitecturas Escalables y Mantenimiento de Servidores.',
        testimonios: `[
  { name: 'Roberto Castro', role: 'CEO, Logística Express', text: 'El sistema web a medida que construyeron optimizó toda nuestra cadena de suministros. Ya no perdemos datos y todo está sincronizado en la nube.' },
  { name: 'Elena Montes', role: 'Gerente, FitCenter', text: 'Nuestra app móvil y el sistema de gestión de gimnasio nos permite controlar membresías y rutinas sin esfuerzo. Es robusto y nunca se cae.' },
  { name: 'Javier Domínguez', role: 'CTO, EcoPlast Industrial', text: 'El soporte continuo y la arquitectura de base de datos que montaron en SQL Server revolucionaron nuestra forma de trabajar. 100% recomendados.' }
]`,
        projects: `[
  { num: '01', title: 'Paso 1: Contanos tu problema', desc: 'Levantamiento de requerimientos profundo para entender la lógica de tu negocio y evaluar la viabilidad técnica del sistema o app.', tags: ['Requerimientos', 'Lógica de Negocio', 'Viabilidad'], icon: 'fa-clipboard-list', images: ${imagesSet1} },
  { num: '02', title: 'Paso 2: Analizamos la Arquitectura', desc: 'Diseñamos la infraestructura tecnológica, normalizamos las bases de datos relacionales y estructuramos las APIs necesarias.', tags: ['SQL Server', 'APIs', 'Arquitectura'], icon: 'fa-server', images: ${imagesSet2} },
  { num: '03', title: 'Paso 3: Proponemos la Solución', desc: 'Te entregamos un plan de acción detallado, tiempos de entrega y definimos la metodología ágil para el desarrollo del software.', tags: ['Plan de Acción', 'Metodología Ágil', 'Roadmap'], icon: 'fa-map-signs', images: ${imagesSet3} },
  { num: '04', title: 'Paso 4: Hacemos el Software', desc: 'Desarrollamos el código backend y frontend a medida (Laravel, React, Node.js), creando herramientas robustas de nivel empresarial.', tags: ['Laravel', 'React', 'Desarrollo'], icon: 'fa-code', images: ${imagesSet4} },
  { num: '05', title: 'Paso 5: Entregamos y Mantenemos', desc: 'Desplegamos el sistema en entornos de producción seguros, aplicamos prácticas DevOps y te aseguramos mantenimiento continuo.', tags: ['DevOps', 'Producción', 'Mantenimiento'], icon: 'fa-rocket', images: ${imagesSet5} }
]`
    },
    'Automatizacion': {
        main: 'Automatizacion',
        recorrido: 'RecorridoAutomatizacion',
        title: 'AUTOMATIZACIÓN DE PROCESOS',
        desc: 'Conectamos tus herramientas y automatizamos flujos de trabajo repetitivos para reducir errores humanos, ahorrar tiempo y escalar tu negocio sin esfuerzo.',
        incluye: 'Integraciones API, CRMs, Automatización de Correos, Sistemas de Facturación, Webhooks, Optimización de Tareas Repetitivas y Bots de Respuesta.',
        testimonios: `[
  { name: 'Sofía Valdés', role: 'Directora de Ventas, InmoTech', text: 'Automatizamos la gestión de leads y correos. Lo que antes nos tomaba 10 horas semanales, ahora se hace solo en segundos. Increíble.' },
  { name: 'Martín Vargas', role: 'Propietario, Tienda Market', text: 'La conexión de nuestro CRM con el sistema de facturación nos salvó de innumerables errores humanos. Una inversión que se pagó sola.' },
  { name: 'Lucía Fernández', role: 'Coordinadora de RRHH', text: 'Los flujos de trabajo automatizados para la incorporación de personal nos han quitado un peso enorme de encima. Todo es mucho más ordenado.' }
]`,
        projects: `[
  { num: '01', title: 'Paso 1: Contanos tus cuellos de botella', desc: 'Realizamos una auditoría de tus procesos operativos actuales para identificar tareas repetitivas, manuales y propensas a errores.', tags: ['Auditoría', 'Procesos', 'Cuellos de botella'], icon: 'fa-search', images: ${imagesSet1} },
  { num: '02', title: 'Paso 2: Analizamos las Herramientas', desc: 'Evaluamos tu stack tecnológico actual (CRMs, ERPs, sistemas de facturación) para determinar las mejores rutas de integración.', tags: ['CRMs', 'Integración', 'Análisis'], icon: 'fa-tools', images: ${imagesSet2} },
  { num: '03', title: 'Paso 3: Proponemos el Flujo', desc: 'Mapeamos visualmente las automatizaciones propuestas, estimando la cantidad de tiempo y recursos que tu empresa ahorrará.', tags: ['Mapeo de Flujos', 'Optimización', 'ROI'], icon: 'fa-project-diagram', images: ${imagesSet3} },
  { num: '04', title: 'Paso 4: Hacemos la Integración', desc: 'Conectamos las plataformas mediante APIs y webhooks, programando scripts a medida para que las herramientas hablen entre sí.', tags: ['Webhooks', 'APIs', 'Scripts'], icon: 'fa-plug', images: ${imagesSet4} },
  { num: '05', title: 'Paso 5: Entregamos y Monitoreamos', desc: 'Hacemos pruebas de estrés del flujo automatizado y te entregamos un panel para monitorear las tareas operando 24/7 de forma autónoma.', tags: ['Monitoreo', 'Pruebas', '24/7'], icon: 'fa-chart-line', images: ${imagesSet5} }
]`
    },
    'InteligenciaArtificial': {
        main: 'InteligenciaArtificial',
        recorrido: 'RecorridoIA',
        title: 'INTELIGENCIA ARTIFICIAL',
        desc: 'Implementamos soluciones avanzadas de IA, desde repositorios de prompts y asistentes virtuales hasta modelos predictivos que potencian tus decisiones.',
        incluye: 'Asistentes Virtuales (Chatbots IA), Modelos Predictivos, Repositorios de Prompts Personalizados, Machine Learning, Integración de LLMs y Automatización Cognitiva.',
        testimonios: `[
  { name: 'Diego Ríos', role: 'Analista de Datos, FinCorp', text: 'Implementar modelos predictivos nos permitió adelantarnos a las tendencias del mercado. La precisión de la IA es asombrosa.' },
  { name: 'Valeria Cruz', role: 'Soporte al Cliente, TechSolutions', text: 'El asistente virtual impulsado por IA redujo nuestras consultas de soporte en un 60%. Aprende de nuestra documentación y responde como un humano.' },
  { name: 'Héctor Muñoz', role: 'Fundador, Creativa Agencia', text: 'El repositorio de prompts personalizados aceleró nuestra generación de contenido de forma brutal. Entendieron exactamente lo que necesitábamos.' }
]`,
        projects: `[
  { num: '01', title: 'Paso 1: Contanos tu visión', desc: 'Descubrimos juntos las oportunidades de aplicar Inteligencia Artificial en tu negocio, evaluando qué datos útiles tienes disponibles.', tags: ['Visión', 'Datos', 'Oportunidades'], icon: 'fa-eye', images: ${imagesSet1} },
  { num: '02', title: 'Paso 2: Analizamos la Viabilidad', desc: 'Estudiamos qué tecnologías de Machine Learning o Modelos de Lenguaje (LLMs) se adaptan mejor a tu necesidad específica.', tags: ['Machine Learning', 'LLMs', 'Viabilidad'], icon: 'fa-brain', images: ${imagesSet2} },
  { num: '03', title: 'Paso 3: Proponemos Modelos', desc: 'Te presentamos una estrategia de IA: desde repositorios de prompts corporativos hasta la creación de asistentes virtuales entrenados con tus datos.', tags: ['Estrategia', 'Prompts', 'Asistentes'], icon: 'fa-lightbulb', images: ${imagesSet3} },
  { num: '04', title: 'Paso 4: Hacemos el Desarrollo', desc: 'Integramos APIs de IA avanzadas, entrenamos modelos predictivos y conectamos las inteligencias a tus sistemas actuales.', tags: ['Integración IA', 'Modelos Predictivos', 'APIs'], icon: 'fa-microchip', images: ${imagesSet4} },
  { num: '05', title: 'Paso 5: Entregamos Resultados', desc: 'Desplegamos la solución inteligente, midiendo métricas de mejora reales y asegurando la escalabilidad del modelo en el tiempo.', tags: ['Despliegue', 'Métricas', 'Escalabilidad'], icon: 'fa-chart-pie', images: ${imagesSet5} }
]`
    },
    'Negocio': {
        main: 'Negocio',
        recorrido: 'RecorridoNegocio',
        title: 'PARA TU NEGOCIO',
        desc: 'Construimos la identidad visual de tu marca y te brindamos herramientas digitales para destacar en el mercado local y potenciar tus ventas.',
        incluye: 'Creación de Marca (Branding), Manual de Identidad Visual, Menús QR, Catálogos Digitales, Flyers Publicitarios, Configuración de WhatsApp Business y Estrategias Comerciales.',
        testimonios: `[
  { name: 'Camila Ortiz', role: 'Fundadora, EcoSnacks', text: 'Desde el logo hasta el menú QR, HagamosTech nos dio una identidad visual brutal que hizo destacar nuestro negocio desde el primer día.' },
  { name: 'Tomás Aguilar', role: 'Dueño, RestoBar El Faro', text: 'Las campañas de publicidad y el branding que diseñaron para nuestra inauguración llenaron el local. Su trabajo gráfico es de otro nivel.' },
  { name: 'Mariana López', role: 'Emprendedora Local', text: 'Me organizaron el WhatsApp Business y armaron un catálogo digital espectacular. Ahora atiendo a mis clientes mucho más rápido.' }
]`,
        projects: `[
  { num: '01', title: 'Paso 1: Contanos de tu emprendimiento', desc: 'Entendemos tu idea de negocio, tu público objetivo y los valores que quieres transmitir para establecer las bases de tu identidad digital.', tags: ['Emprendimiento', 'Público Objetivo', 'Identidad'], icon: 'fa-store', images: ${imagesSet1} },
  { num: '02', title: 'Paso 2: Analizamos tu Identidad', desc: 'Creamos tu Manual de Identidad Visual: definimos paletas de color, tipografías y construimos isologotipos de alto impacto.', tags: ['Branding', 'Manual de Marca', 'Diseño'], icon: 'fa-palette', images: ${imagesSet2} },
  { num: '03', title: 'Paso 3: Proponemos Materiales', desc: 'Te presentamos opciones gráficas y herramientas comerciales: menús QR, flyers para redes sociales o tarjetas de presentación.', tags: ['Material Gráfico', 'Menús QR', 'Publicidad'], icon: 'fa-bullhorn', images: ${imagesSet3} },
  { num: '04', title: 'Paso 4: Hacemos el Diseño y Configuración', desc: 'Maquetamos catálogos digitales, optimizamos tus redes sociales y configuramos WhatsApp Business para una gestión de clientes profesional.', tags: ['Catálogos', 'WhatsApp Business', 'Redes Sociales'], icon: 'fa-mobile-alt', images: ${imagesSet4} },
  { num: '05', title: 'Paso 5: Entregamos Listo para Vender', desc: 'Te entregamos todos los archivos en alta calidad (con fondos transparentes) y lanzamos tus campañas comerciales con resultados garantizados.', tags: ['Archivos HD', 'Lanzamiento', 'Ventas'], icon: 'fa-shopping-bag', images: ${imagesSet5} }
]`
    },
    'Academico': {
        main: 'Academico',
        recorrido: 'RecorridoAcademico',
        title: 'APOYO ACADÉMICO',
        desc: 'Asesoramos y estructuramos proyectos universitarios, presentaciones interactivas y simuladores virtuales para garantizar la máxima calificación.',
        incluye: 'Presentaciones Interactivas, Estructuración en Formato APA 7, Simuladores Educativos, Mapas Conceptuales, Asesoría en Código (Programación) y Corrección de Estilo.',
        testimonios: `[
  { name: 'Esteban Ramírez', role: 'Estudiante de Medicina', text: 'La presentación interactiva y los esquemas anatómicos que me diseñaron fueron la clave para sacar la máxima nota en mi defensa de tesis.' },
  { name: 'Prof. Ana Torres', role: 'Docente Universitaria', text: 'Los simuladores educativos y entornos virtuales han mejorado muchísimo la comprensión de mis alumnos en sistemas informáticos.' },
  { name: 'Felipe Guzmán', role: 'Tesista de Ingeniería', text: 'Su asesoría en formato APA 7 y lógica de programación estructurada me salvó el proyecto de grado. Muy rigurosos y profesionales.' }
]`,
        projects: `[
  { num: '01', title: 'Paso 1: Contanos tu proyecto', desc: 'Nos explicas de qué trata tu tesis, investigación o proyecto universitario y qué necesitas: documentación, simuladores o presentaciones.', tags: ['Tesis', 'Investigación', 'Requerimientos'], icon: 'fa-book-open', images: ${imagesSet1} },
  { num: '02', title: 'Paso 2: Analizamos el Rigor Académico', desc: 'Revisamos lineamientos universitarios, garantizamos formato APA 7 y estructuramos metodologías y marcos teóricos exactos.', tags: ['Formato APA 7', 'Rigor Académico', 'Metodología'], icon: 'fa-graduation-cap', images: ${imagesSet2} },
  { num: '03', title: 'Paso 3: Proponemos la Estructura', desc: 'Diseñamos diagramas conceptuales, líneas de tiempo, infografías complejas y prototipamos simuladores educativos a la medida.', tags: ['Diagramas', 'Simuladores', 'Estructuración'], icon: 'fa-project-diagram', images: ${imagesSet3} },
  { num: '04', title: 'Paso 4: Hacemos el Desarrollo', desc: 'Creamos presentaciones interactivas de alto nivel, asesoramos en código estructurado (si es informática) y redactamos correcciones de estilo.', tags: ['Presentaciones', 'Asesoría Código', 'Corrección'], icon: 'fa-laptop-code', images: ${imagesSet4} },
  { num: '05', title: 'Paso 5: Entregamos para la Defensa', desc: 'Te entregamos portadas académicas formales, documentos finales impecables y hacemos simulacros para prepararte para tu defensa.', tags: ['Defensas', 'Documento Final', 'Preparación'], icon: 'fa-award', images: ${imagesSet5} }
]`
    }
};

function replaceBlock(content, variableName, newArrayContent) {
    const searchString = "const " + variableName + " = [";
    const startIndex = content.indexOf(searchString);
    if (startIndex === -1) return content;
    
    let openCount = 0;
    let endIndex = -1;
    for (let i = startIndex + searchString.length - 1; i < content.length; i++) {
        if (content[i] === '[') openCount++;
        else if (content[i] === ']') {
            openCount--;
            if (openCount === 0) {
                endIndex = i;
                break;
            }
        }
    }
    
    if (endIndex !== -1) {
        return content.substring(0, startIndex) + "const " + variableName + " = " + newArrayContent + content.substring(endIndex + 1);
    }
    return content;
}

function replaceBetweenTags(content, startTag, endTag, newText) {
    const startIndex = content.indexOf(startTag);
    if (startIndex === -1) return content;
    const endIndex = content.indexOf(endTag, startIndex + startTag.length);
    if (endIndex === -1) return content;
    return content.substring(0, startIndex + startTag.length) + newText + content.substring(endIndex);
}

for (const [dir, data] of Object.entries(categories)) {
    const dirPath = path.join(basePath, dir);
    
    // Process Main file
    const mainFilePath = path.join(dirPath, data.main + ".jsx");
    if (fs.existsSync(mainFilePath)) {
        let mainContent = fs.readFileSync(mainFilePath, 'utf8');
        mainContent = replaceBlock(mainContent, 'TESTIMONIOS', data.testimonios);
        
        // Also replace the title and paragraph
        // The title is inside: className="text-4xl..."><span className="...">SERVICE</span>
        // Let's use string replace for the generic texts
        mainContent = mainContent.replace(/¿QUÉ ES ESTE.*?CÓMO AYUDA A TU EMPRESA\?/s, \`¿QUÉ ES \${data.title} Y CÓMO AYUDA A TU EMPRESA?\`);
        mainContent = mainContent.replace(/Diseñamos y desarrollamos sitios web profesionales que actúan como la carta de presentación digital de tu negocio: modernos, rápidos y fáciles de navegar, para dar a conocer tu marca ante todos./g, data.desc);
        mainContent = mainContent.replace(/Landing Pages, Sitios Corporativos, Tiendas Online, Catálogos, Blogs, Portafolios, Reservas, Restaurantes, Plataformas Educativas, Portales, Cursos, Directorios, Aplicaciones Web y Soluciones Personalizadas./g, data.incluye);
        
        fs.writeFileSync(mainFilePath, mainContent, 'utf8');
        console.log("Updated main in " + data.main + ".jsx");
    }

    // Process Recorrido file
    const recorridoFilePath = path.join(dirPath, data.recorrido + ".jsx");
    if (fs.existsSync(recorridoFilePath)) {
        let recorridoContent = fs.readFileSync(recorridoFilePath, 'utf8');
        recorridoContent = replaceBlock(recorridoContent, 'PROJECTS', data.projects);
        fs.writeFileSync(recorridoFilePath, recorridoContent, 'utf8');
        console.log("Updated recorrido in " + data.recorrido + ".jsx");
    }
}
