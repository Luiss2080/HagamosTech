export const CATEGORIES = [
    { id: 'estudiantes', label: 'ESTUDIANTES' },
    { id: 'emprendedores', label: 'EMPRENDEDORES' },
    { id: 'empleo', label: 'EMPLEO' },
    { id: 'diseno', label: 'DISEÑO GRÁFICO' },
    { id: 'web', label: 'WEB Y E-COMMERCE' },
    { id: 'software', label: 'SOFTWARE' },
    { id: 'ia', label: 'IA Y AUTOMATIZACIÓN' },
    { id: 'personalizado', label: 'A MEDIDA' }
];

export const SERVICIOS_DATA = {
    estudiantes: [
        {
            id: 'presentaciones',
            name: 'Presentaciones Interactivas',
            icon: 'fa-file-powerpoint',
            img: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&auto=format&fit=crop&q=60',
            category: 'Académico',
            pillLabel: 'EXPOSICIONES',
            shortDesc: 'Defensas de tesis, exposiciones de ciencias de la salud, investigación médica o tecnología.',
            stats: [
                { icon: 'fa-headset', label: 'Soporte', value: '24/7' },
                { icon: 'fa-pen-ruler', label: 'Diseño', value: 'A Medida' },
                { icon: 'fa-graduation-cap', label: 'Foco', value: 'Universitario' }
            ],
            includes: [
                { icon: 'fa-desktop', label: 'Diseño Visual' },
                { icon: 'fa-check-circle', label: 'Aprobación' },
                { icon: 'fa-file-pdf', label: 'Exportación' }
            ],
            cta: 'Consultar',
            ctaLink: '/contactanos',
            price: 'A Medida'
        },
        {
            id: 'formato-apa',
            name: 'Formato APA 7 y Docs',
            icon: 'fa-book',
            img: 'https://images.unsplash.com/photo-1455390582262-044cdead2708?w=600&auto=format&fit=crop&q=60',
            category: 'Documentación',
            pillLabel: 'RIGOR ACADÉMICO',
            shortDesc: 'Estructuración de monografías, corrección de estilo y referencias bibliográficas exactas.',
            stats: [
                { icon: 'fa-headset', label: 'Soporte', value: '24/7' },
                { icon: 'fa-pen-ruler', label: 'Diseño', value: 'A Medida' },
                { icon: 'fa-spell-check', label: 'Calidad', value: 'Ortografía' }
            ],
            includes: [
                { icon: 'fa-list-ol', label: 'Índices' },
                { icon: 'fa-quote-right', label: 'Citas' },
                { icon: 'fa-file-word', label: 'Editable' }
            ],
            cta: 'Consultar',
            ctaLink: '/contactanos',
            price: 'A Medida'
        },
        {
            id: 'infografias-diagramas',
            name: 'Infografías y Diagramas',
            icon: 'fa-project-diagram',
            img: 'https://images.unsplash.com/photo-1543286386-713bdd548da4?w=600&auto=format&fit=crop&q=60',
            category: 'Visualización',
            pillLabel: 'ESQUEMAS',
            shortDesc: 'Esquemas anatómicos, flujos de bases de datos o diagramas de procesos de recursos humanos.',
            stats: [
                { icon: 'fa-headset', label: 'Soporte', value: '24/7' },
                { icon: 'fa-pen-ruler', label: 'Diseño', value: 'A Medida' },
                { icon: 'fa-image', label: 'Formato', value: 'Alta Res' }
            ],
            includes: [
                { icon: 'fa-sitemap', label: 'Flujos' },
                { icon: 'fa-eye', label: 'Visual' },
                { icon: 'fa-file-pdf', label: 'Imprimible' }
            ],
            cta: 'Consultar',
            ctaLink: '/contactanos',
            price: 'A Medida'
        },
        {
            id: 'mapas-conceptuales',
            name: 'Mapas Conceptuales',
            icon: 'fa-network-wired',
            img: 'https://images.unsplash.com/photo-1503428593586-e225b39bddfe?w=600&auto=format&fit=crop&q=60',
            category: 'Síntesis',
            pillLabel: 'MARCO TEÓRICO',
            shortDesc: 'Síntesis de marcos teóricos y diseño formal de carátulas para entrega de proyectos.',
            stats: [
                { icon: 'fa-headset', label: 'Soporte', value: '24/7' },
                { icon: 'fa-pen-ruler', label: 'Diseño', value: 'A Medida' },
                { icon: 'fa-book-open', label: 'Teoría', value: 'Precisa' }
            ],
            includes: [
                { icon: 'fa-compress', label: 'Resumen' },
                { icon: 'fa-layer-group', label: 'Niveles' },
                { icon: 'fa-file-image', label: 'Formatos' }
            ],
            cta: 'Consultar',
            ctaLink: '/contactanos',
            price: 'A Medida'
        },
        {
            id: 'simuladores-educativos',
            name: 'Simuladores y Redes',
            icon: 'fa-microchip',
            img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=60',
            category: 'Tecnología',
            pillLabel: 'ENTORNOS VIRTUALES',
            shortDesc: 'Entornos virtuales para pruebas de redes, robótica educativa o simulación de sistemas informáticos.',
            stats: [
                { icon: 'fa-headset', label: 'Soporte', value: '24/7' },
                { icon: 'fa-pen-ruler', label: 'Desarrollo', value: 'A Medida' },
                { icon: 'fa-server', label: 'Redes', value: 'Cisco/Otros' }
            ],
            includes: [
                { icon: 'fa-code-branch', label: 'Topologías' },
                { icon: 'fa-robot', label: 'Robótica' },
                { icon: 'fa-vial', label: 'Pruebas' }
            ],
            cta: 'Consultar',
            ctaLink: '/contactanos',
            price: 'A Medida'
        },
        {
            id: 'apoyo-programacion',
            name: 'Apoyo en Programación',
            icon: 'fa-code',
            img: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=60',
            category: 'Software',
            pillLabel: 'CÓDIGO',
            shortDesc: 'Asesoría en desarrollo de código estructurado, algoritmos y lógica computacional.',
            stats: [
                { icon: 'fa-headset', label: 'Soporte', value: '24/7' },
                { icon: 'fa-pen-ruler', label: 'Solución', value: 'A Medida' },
                { icon: 'fa-bug', label: 'Debug', value: 'Efectivo' }
            ],
            includes: [
                { icon: 'fa-terminal', label: 'Algoritmos' },
                { icon: 'fa-database', label: 'Bases Datos' },
                { icon: 'fa-check', label: 'Funcionamiento' }
            ],
            cta: 'Consultar',
            ctaLink: '/contactanos',
            price: 'A Medida'
        }
    ],
    emprendedores: [
        {
            id: 'creacion-marca',
            name: 'Creación de Marca',
            icon: 'fa-lightbulb',
            img: 'https://images.unsplash.com/photo-1493612276216-ee3925520721?w=600&auto=format&fit=crop&q=60',
            category: 'Branding',
            pillLabel: 'IDENTIDAD',
            shortDesc: 'Identidad para proyectos innovadores, como producción de snacks o reciclaje.',
            stats: [
                { icon: 'fa-headset', label: 'Soporte', value: '24/7' },
                { icon: 'fa-pen-ruler', label: 'Diseño', value: 'A Medida' },
                { icon: 'fa-star', label: 'Impacto', value: 'Visual' }
            ],
            includes: [
                { icon: 'fa-bezier-curve', label: 'Vectores' },
                { icon: 'fa-copyright', label: 'Original' },
                { icon: 'fa-file-export', label: 'Formatos' }
            ],
            cta: 'Consultar',
            ctaLink: '/contactanos',
            price: 'A Medida'
        },
        {
            id: 'manual-identidad',
            name: 'Manual de Identidad Visual',
            icon: 'fa-book-open-reader',
            img: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&auto=format&fit=crop&q=60',
            category: 'Branding',
            pillLabel: 'REGLAS VISUALES',
            shortDesc: 'Definición de paletas, tipografías y reglas de uso en proporciones 4x4.',
            stats: [
                { icon: 'fa-headset', label: 'Soporte', value: '24/7' },
                { icon: 'fa-pen-ruler', label: 'Diseño', value: 'A Medida' },
                { icon: 'fa-palette', label: 'Color', value: 'Exacto' }
            ],
            includes: [
                { icon: 'fa-font', label: 'Tipografía' },
                { icon: 'fa-ruler-combined', label: 'Proporciones' },
                { icon: 'fa-swatchbook', label: 'Paletas' }
            ],
            cta: 'Consultar',
            ctaLink: '/contactanos',
            price: 'A Medida'
        },
        {
            id: 'menus-qr',
            name: 'Menús QR y Catálogos',
            icon: 'fa-qrcode',
            img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop&q=60',
            category: 'Digitalización',
            pillLabel: 'AGILIDAD',
            shortDesc: 'Digitalización ágil para locales gastronómicos, tiendas de ropa o distribución.',
            stats: [
                { icon: 'fa-headset', label: 'Soporte', value: '24/7' },
                { icon: 'fa-pen-ruler', label: 'Diseño', value: 'A Medida' },
                { icon: 'fa-mobile-screen', label: 'Móvil', value: 'Optimizado' }
            ],
            includes: [
                { icon: 'fa-link', label: 'Enlaces' },
                { icon: 'fa-images', label: 'Fotos' },
                { icon: 'fa-print', label: 'Stickers QR' }
            ],
            cta: 'Consultar',
            ctaLink: '/contactanos',
            price: 'A Medida'
        },
        {
            id: 'publicidad-ofertas',
            name: 'Publicidad de Ofertas',
            icon: 'fa-bullhorn',
            img: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=600&auto=format&fit=crop&q=60',
            category: 'Marketing',
            pillLabel: 'PROMOCIONES',
            shortDesc: 'Diseño de campañas "Flash Sale", 2x1 o descuentos por inauguración.',
            stats: [
                { icon: 'fa-headset', label: 'Soporte', value: '24/7' },
                { icon: 'fa-pen-ruler', label: 'Diseño', value: 'A Medida' },
                { icon: 'fa-bolt', label: 'Ventas', value: 'Rápidas' }
            ],
            includes: [
                { icon: 'fa-tag', label: 'Descuentos' },
                { icon: 'fa-share-nodes', label: 'Redes' },
                { icon: 'fa-eye', label: 'Atractivo' }
            ],
            cta: 'Consultar',
            ctaLink: '/contactanos',
            price: 'A Medida'
        },
        {
            id: 'publicidad-fechas',
            name: 'Fechas Especiales',
            icon: 'fa-calendar-star',
            img: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=600&auto=format&fit=crop&q=60',
            category: 'Marketing',
            pillLabel: 'TEMÁTICAS',
            shortDesc: 'Campañas temáticas para Navidad, Black Friday o aniversarios comerciales.',
            stats: [
                { icon: 'fa-headset', label: 'Soporte', value: '24/7' },
                { icon: 'fa-pen-ruler', label: 'Diseño', value: 'A Medida' },
                { icon: 'fa-calendar-days', label: 'Eventos', value: 'Clave' }
            ],
            includes: [
                { icon: 'fa-gifts', label: 'Festivo' },
                { icon: 'fa-clock', label: 'Limitado' },
                { icon: 'fa-images', label: 'Banners' }
            ],
            cta: 'Consultar',
            ctaLink: '/contactanos',
            price: 'A Medida'
        },
        {
            id: 'gestion-clientes',
            name: 'Gestión de Clientes',
            icon: 'fa-users-gear',
            img: 'https://images.unsplash.com/photo-1552581234-26160f608093?w=600&auto=format&fit=crop&q=60',
            category: 'CRM',
            pillLabel: 'WHATSAPP BIZ',
            shortDesc: 'Configuración de WhatsApp Business, respuestas automáticas y organización de contactos.',
            stats: [
                { icon: 'fa-headset', label: 'Soporte', value: '24/7' },
                { icon: 'fa-pen-ruler', label: 'Configuración', value: 'A Medida' },
                { icon: 'fa-robot', label: 'Auto', value: 'Respuestas' }
            ],
            includes: [
                { icon: 'fa-whatsapp', label: 'Catálogo' },
                { icon: 'fa-message', label: 'Mensajes' },
                { icon: 'fa-address-book', label: 'Contactos' }
            ],
            cta: 'Consultar',
            ctaLink: '/contactanos',
            price: 'A Medida'
        }
    ],
    empleo: [
        {
            id: 'cv-ats',
            name: 'CV Optimizado ATS',
            icon: 'fa-file-user',
            img: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&auto=format&fit=crop&q=60',
            category: 'Empleabilidad',
            pillLabel: 'CURRÍCULUM',
            shortDesc: 'Estructuración de perfiles técnicos destacando certificaciones o experiencia.',
            stats: [
                { icon: 'fa-headset', label: 'Soporte', value: '24/7' },
                { icon: 'fa-pen-ruler', label: 'Diseño', value: 'A Medida' },
                { icon: 'fa-robot', label: 'Filtros', value: 'ATS' }
            ],
            includes: [
                { icon: 'fa-magnifying-glass', label: 'Keywords' },
                { icon: 'fa-file-pdf', label: 'Formatos' },
                { icon: 'fa-briefcase', label: 'Profesional' }
            ],
            cta: 'Consultar',
            ctaLink: '/contactanos',
            price: 'A Medida'
        },
        {
            id: 'perfil-linkedin',
            name: 'Optimización LinkedIn',
            icon: 'fa-linkedin',
            img: 'https://images.unsplash.com/photo-1611944212129-29977ae1398c?w=600&auto=format&fit=crop&q=60',
            category: 'Networking',
            pillLabel: 'PERFIL DIGITAL',
            shortDesc: 'Configuración de titulares, extractos con palabras clave y networking estratégico.',
            stats: [
                { icon: 'fa-headset', label: 'Soporte', value: '24/7' },
                { icon: 'fa-pen-ruler', label: 'Ajuste', value: 'A Medida' },
                { icon: 'fa-globe', label: 'Alcance', value: 'Global' }
            ],
            includes: [
                { icon: 'fa-heading', label: 'Titulares' },
                { icon: 'fa-align-left', label: 'Extracto' },
                { icon: 'fa-network-wired', label: 'Redes' }
            ],
            cta: 'Consultar',
            ctaLink: '/contactanos',
            price: 'A Medida'
        },
        {
            id: 'cartas-presentacion',
            name: 'Cartas y Traducción',
            icon: 'fa-envelope-open-text',
            img: 'https://images.unsplash.com/photo-1554774853-719586f82d77?w=600&auto=format&fit=crop&q=60',
            category: 'Redacción',
            pillLabel: 'PERSUASIÓN',
            shortDesc: 'Redacción persuasiva adaptada a vacantes específicas y traducción técnica al inglés.',
            stats: [
                { icon: 'fa-headset', label: 'Soporte', value: '24/7' },
                { icon: 'fa-pen-ruler', label: 'Redacción', value: 'A Medida' },
                { icon: 'fa-language', label: 'Idiomas', value: 'ES/EN' }
            ],
            includes: [
                { icon: 'fa-pen-nib', label: 'Copywriting' },
                { icon: 'fa-earth-americas', label: 'Inglés' },
                { icon: 'fa-bullseye', label: 'Target' }
            ],
            cta: 'Consultar',
            ctaLink: '/contactanos',
            price: 'A Medida'
        },
        {
            id: 'portafolios-digitales',
            name: 'Portafolios Digitales',
            icon: 'fa-folder-open',
            img: 'https://images.unsplash.com/photo-1481481600673-c6cb960f0896?w=600&auto=format&fit=crop&q=60',
            category: 'Exhibición',
            pillLabel: 'PROYECTOS',
            shortDesc: 'Compilación visual de proyectos de código, diseños o investigaciones.',
            stats: [
                { icon: 'fa-headset', label: 'Soporte', value: '24/7' },
                { icon: 'fa-pen-ruler', label: 'Diseño', value: 'A Medida' },
                { icon: 'fa-github', label: 'Plataformas', value: 'Integradas' }
            ],
            includes: [
                { icon: 'fa-laptop-code', label: 'Proyectos' },
                { icon: 'fa-link', label: 'Enlaces' },
                { icon: 'fa-eye', label: 'Visual' }
            ],
            cta: 'Consultar',
            ctaLink: '/contactanos',
            price: 'A Medida'
        },
        {
            id: 'entrevistas',
            name: 'Preparación Entrevistas',
            icon: 'fa-users',
            img: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&auto=format&fit=crop&q=60',
            category: 'Asesoría',
            pillLabel: 'SIMULACIONES',
            shortDesc: 'Simulaciones de entrevistas con enfoque en recursos humanos, métricas y seguridad.',
            stats: [
                { icon: 'fa-headset', label: 'Soporte', value: '24/7' },
                { icon: 'fa-pen-ruler', label: 'Guía', value: 'A Medida' },
                { icon: 'fa-comments', label: 'Práctica', value: 'En Vivo' }
            ],
            includes: [
                { icon: 'fa-clipboard-question', label: 'Preguntas' },
                { icon: 'fa-chart-line', label: 'Métricas' },
                { icon: 'fa-shield-halved', label: 'Seguridad' }
            ],
            cta: 'Consultar',
            ctaLink: '/contactanos',
            price: 'A Medida'
        },
        {
            id: 'certificados',
            name: 'Certificados Digitales',
            icon: 'fa-certificate',
            img: 'https://images.unsplash.com/photo-1523289217630-0dd16184af8e?w=600&auto=format&fit=crop&q=60',
            category: 'Validación',
            pillLabel: 'DIPLOMAS',
            shortDesc: 'Diseño y validación visual de diplomas, constancias y participaciones.',
            stats: [
                { icon: 'fa-headset', label: 'Soporte', value: '24/7' },
                { icon: 'fa-pen-ruler', label: 'Diseño', value: 'A Medida' },
                { icon: 'fa-check-double', label: 'Validación', value: 'Digital' }
            ],
            includes: [
                { icon: 'fa-award', label: 'Elegancia' },
                { icon: 'fa-qrcode', label: 'Verificable' },
                { icon: 'fa-print', label: 'Imprimible' }
            ],
            cta: 'Consultar',
            ctaLink: '/contactanos',
            price: 'A Medida'
        }
    ],
    diseno: [
        {
            id: 'logos-identidad',
            name: 'Logos e Identidad',
            icon: 'fa-pen-nib',
            img: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&auto=format&fit=crop&q=60',
            category: 'Gráfico',
            pillLabel: 'MARCAS',
            shortDesc: 'Creación de marcas para software, servicios técnicos o soluciones industriales.',
            stats: [
                { icon: 'fa-headset', label: 'Soporte', value: '24/7' },
                { icon: 'fa-pen-ruler', label: 'Diseño', value: 'A Medida' },
                { icon: 'fa-vector-square', label: 'Vectores', value: 'Originales' }
            ],
            includes: [
                { icon: 'fa-lightbulb', label: 'Concepto' },
                { icon: 'fa-bezier-curve', label: 'Trazos' },
                { icon: 'fa-file-export', label: 'Entregables' }
            ],
            cta: 'Consultar',
            ctaLink: '/contactanos',
            price: 'A Medida'
        },
        {
            id: 'flyers-banners',
            name: 'Flyers y Banners',
            icon: 'fa-image',
            img: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&auto=format&fit=crop&q=60',
            category: 'Publicidad',
            pillLabel: 'REDES Y PRINT',
            shortDesc: 'Gráficos publicitarios en formato cuadrado (4x4) y gran formato.',
            stats: [
                { icon: 'fa-headset', label: 'Soporte', value: '24/7' },
                { icon: 'fa-pen-ruler', label: 'Diseño', value: 'A Medida' },
                { icon: 'fa-expand', label: 'Tamaño', value: 'Adaptable' }
            ],
            includes: [
                { icon: 'fa-instagram', label: 'Social' },
                { icon: 'fa-print', label: 'Impresión' },
                { icon: 'fa-eye', label: 'Impacto' }
            ],
            cta: 'Consultar',
            ctaLink: '/contactanos',
            price: 'A Medida'
        },
        {
            id: 'packaging-catalogos',
            name: 'Packaging y Catálogos',
            icon: 'fa-box-open',
            img: 'https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=600&auto=format&fit=crop&q=60',
            category: 'Producto',
            pillLabel: 'EMPAQUES',
            shortDesc: 'Diseño de empaques de productos sostenibles y maquetación de catálogos impresos.',
            stats: [
                { icon: 'fa-headset', label: 'Soporte', value: '24/7' },
                { icon: 'fa-pen-ruler', label: 'Diseño', value: 'A Medida' },
                { icon: 'fa-leaf', label: 'Estilo', value: 'Sostenible' }
            ],
            includes: [
                { icon: 'fa-cube', label: 'Cajas' },
                { icon: 'fa-book', label: 'Catálogos' },
                { icon: 'fa-tags', label: 'Etiquetas' }
            ],
            cta: 'Consultar',
            ctaLink: '/contactanos',
            price: 'A Medida'
        },
        {
            id: 'tarjetas-invitaciones',
            name: 'Tarjetas e Invitaciones',
            icon: 'fa-id-card',
            img: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=600&auto=format&fit=crop&q=60',
            category: 'Corporativo',
            pillLabel: 'PRESENTACIÓN',
            shortDesc: 'Tarjetas corporativas elegantes, con opciones QR, e invitaciones a eventos.',
            stats: [
                { icon: 'fa-headset', label: 'Soporte', value: '24/7' },
                { icon: 'fa-pen-ruler', label: 'Diseño', value: 'A Medida' },
                { icon: 'fa-qrcode', label: 'Extras', value: 'QR Integrado' }
            ],
            includes: [
                { icon: 'fa-address-card', label: 'Tarjetas' },
                { icon: 'fa-envelope', label: 'Eventos' },
                { icon: 'fa-gem', label: 'Elegancia' }
            ],
            cta: 'Consultar',
            ctaLink: '/contactanos',
            price: 'A Medida'
        },
        {
            id: 'edicion-fotografica',
            name: 'Edición Fotográfica',
            icon: 'fa-wand-magic-sparkles',
            img: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=600&auto=format&fit=crop&q=60',
            category: 'Retoque',
            pillLabel: 'FOTOGRAFÍA',
            shortDesc: 'Mejora de calidad de imagen, corrección de color y eliminación de fondos.',
            stats: [
                { icon: 'fa-headset', label: 'Soporte', value: '24/7' },
                { icon: 'fa-pen-ruler', label: 'Edición', value: 'A Medida' },
                { icon: 'fa-palette', label: 'Color', value: 'Corrección' }
            ],
            includes: [
                { icon: 'fa-eraser', label: 'Fondos' },
                { icon: 'fa-sliders', label: 'Ajustes' },
                { icon: 'fa-image', label: 'Catálogos' }
            ],
            cta: 'Consultar',
            ctaLink: '/contactanos',
            price: 'A Medida'
        }
    ],
    web: [
        {
            id: 'paginas-web',
            name: 'Páginas Web Empresariales',
            icon: 'fa-globe',
            img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=60',
            category: 'Desarrollo Web',
            pillLabel: 'CORPORATIVO',
            shortDesc: 'Sitios corporativos completos para clínicas o empresas de tecnología.',
            stats: [
                { icon: 'fa-headset', label: 'Soporte', value: '24/7' },
                { icon: 'fa-pen-ruler', label: 'Desarrollo', value: 'A Medida' },
                { icon: 'fa-bolt', label: 'Carga', value: 'Rápida' }
            ],
            includes: [
                { icon: 'fa-server', label: 'Hosting' },
                { icon: 'fa-shield-halved', label: 'Seguridad' },
                { icon: 'fa-magnifying-glass', label: 'SEO' }
            ],
            cta: 'Consultar',
            ctaLink: '/contactanos',
            price: 'A Medida'
        },
        {
            id: 'landing-pages',
            name: 'Landing Pages',
            icon: 'fa-rocket',
            img: 'https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?w=600&auto=format&fit=crop&q=60',
            category: 'Conversión',
            pillLabel: 'LEADS',
            shortDesc: 'Páginas de aterrizaje de alta conversión para captar leads o mostrar trabajos.',
            stats: [
                { icon: 'fa-headset', label: 'Soporte', value: '24/7' },
                { icon: 'fa-pen-ruler', label: 'Diseño', value: 'A Medida' },
                { icon: 'fa-bullseye', label: 'Foco', value: 'Conversión' }
            ],
            includes: [
                { icon: 'fa-filter', label: 'Embudos' },
                { icon: 'fa-mouse-pointer', label: 'CTAs' },
                { icon: 'fa-chart-pie', label: 'Métricas' }
            ],
            cta: 'Consultar',
            ctaLink: '/contactanos',
            price: 'A Medida'
        },
        {
            id: 'tiendas-online',
            name: 'Tiendas Online',
            icon: 'fa-cart-shopping',
            img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&auto=format&fit=crop&q=60',
            category: 'E-commerce',
            pillLabel: 'VENTAS',
            shortDesc: 'E-commerce autogestionables con carritos e integración de pagos locales.',
            stats: [
                { icon: 'fa-headset', label: 'Soporte', value: '24/7' },
                { icon: 'fa-pen-ruler', label: 'Desarrollo', value: 'A Medida' },
                { icon: 'fa-credit-card', label: 'Pagos', value: 'Integrados' }
            ],
            includes: [
                { icon: 'fa-box', label: 'Productos' },
                { icon: 'fa-cash-register', label: 'Ventas' },
                { icon: 'fa-truck-fast', label: 'Envíos' }
            ],
            cta: 'Consultar',
            ctaLink: '/contactanos',
            price: 'A Medida'
        },
        {
            id: 'catalogos-blogs',
            name: 'Catálogos y Blogs',
            icon: 'fa-blog',
            img: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&auto=format&fit=crop&q=60',
            category: 'Contenido',
            pillLabel: 'DINÁMICO',
            shortDesc: 'Muestrarios de productos dinámicos y blogs optimizados para SEO orgánico.',
            stats: [
                { icon: 'fa-headset', label: 'Soporte', value: '24/7' },
                { icon: 'fa-pen-ruler', label: 'Diseño', value: 'A Medida' },
                { icon: 'fa-pen-nib', label: 'Contenido', value: 'Gestionable' }
            ],
            includes: [
                { icon: 'fa-newspaper', label: 'Artículos' },
                { icon: 'fa-images', label: 'Galerías' },
                { icon: 'fa-share-nodes', label: 'Social' }
            ],
            cta: 'Consultar',
            ctaLink: '/contactanos',
            price: 'A Medida'
        },
        {
            id: 'ui-ux-responsive',
            name: 'Diseño UI/UX',
            icon: 'fa-mobile-screen-button',
            img: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&auto=format&fit=crop&q=60',
            category: 'Interfaces',
            pillLabel: 'RESPONSIVE',
            shortDesc: 'Prototipado interactivo, encuestas digitales y adaptación a pantallas móviles.',
            stats: [
                { icon: 'fa-headset', label: 'Soporte', value: '24/7' },
                { icon: 'fa-pen-ruler', label: 'Diseño', value: 'A Medida' },
                { icon: 'fa-mobile', label: 'Mobile', value: 'First' }
            ],
            includes: [
                { icon: 'fa-figma', label: 'Prototipos' },
                { icon: 'fa-list-check', label: 'Formularios' },
                { icon: 'fa-users-viewfinder', label: 'UX' }
            ],
            cta: 'Consultar',
            ctaLink: '/contactanos',
            price: 'A Medida'
        }
    ],
    software: [
        {
            id: 'sistemas-web',
            name: 'Sistemas y Software',
            icon: 'fa-laptop-code',
            img: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&auto=format&fit=crop&q=60',
            category: 'Desarrollo',
            pillLabel: 'A MEDIDA',
            shortDesc: 'Creación de plataformas utilizando React y backends en Laravel/Blade.',
            stats: [
                { icon: 'fa-headset', label: 'Soporte', value: '24/7' },
                { icon: 'fa-pen-ruler', label: 'Código', value: 'A Medida' },
                { icon: 'fa-layer-group', label: 'Stack', value: 'Moderno' }
            ],
            includes: [
                { icon: 'fa-react', label: 'Frontend' },
                { icon: 'fa-php', label: 'Backend' },
                { icon: 'fa-gears', label: 'Lógica' }
            ],
            cta: 'Consultar',
            ctaLink: '/contactanos',
            price: 'A Medida'
        },
        {
            id: 'bases-datos',
            name: 'Bases de Datos',
            icon: 'fa-database',
            img: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=600&auto=format&fit=crop&q=60',
            category: 'Datos',
            pillLabel: 'ESTRUCTURA',
            shortDesc: 'Estructuración, normalización y mantenimiento de datos en SQL Server.',
            stats: [
                { icon: 'fa-headset', label: 'Soporte', value: '24/7' },
                { icon: 'fa-pen-ruler', label: 'Diseño', value: 'A Medida' },
                { icon: 'fa-server', label: 'Rendimiento', value: 'Óóptimo' }
            ],
            includes: [
                { icon: 'fa-table', label: 'Tablas' },
                { icon: 'fa-key', label: 'Relaciones' },
                { icon: 'fa-shield', label: 'Seguridad' }
            ],
            cta: 'Consultar',
            ctaLink: '/contactanos',
            price: 'A Medida'
        },
        {
            id: 'soporte-devops',
            name: 'Soporte y DevOps',
            icon: 'fa-server',
            img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&auto=format&fit=crop&q=60',
            category: 'Infraestructura',
            pillLabel: 'DESPLIEGUE',
            shortDesc: 'Mantenimiento de servidores, prácticas ágiles de despliegue y soporte continuo.',
            stats: [
                { icon: 'fa-headset', label: 'Soporte', value: '24/7' },
                { icon: 'fa-pen-ruler', label: 'Plan', value: 'A Medida' },
                { icon: 'fa-cloud', label: 'Cloud', value: 'AWS/Otros' }
            ],
            includes: [
                { icon: 'fa-infinity', label: 'CI/CD' },
                { icon: 'fa-network-wired', label: 'Redes' },
                { icon: 'fa-wrench', label: 'Mantenimiento' }
            ],
            cta: 'Consultar',
            ctaLink: '/contactanos',
            price: 'A Medida'
        }
    ],
    ia: [
        {
            id: 'integracion-ia',
            name: 'Integración de IA',
            icon: 'fa-brain',
            img: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&auto=format&fit=crop&q=60',
            category: 'Innovación',
            pillLabel: 'INTELIGENCIA',
            shortDesc: 'Implementación de repositorios de prompts, asistentes virtuales y análisis.',
            stats: [
                { icon: 'fa-headset', label: 'Soporte', value: '24/7' },
                { icon: 'fa-pen-ruler', label: 'Modelo', value: 'A Medida' },
                { icon: 'fa-robot', label: 'Agentes', value: 'Autónomos' }
            ],
            includes: [
                { icon: 'fa-comment-dots', label: 'Chatbots' },
                { icon: 'fa-chart-pie', label: 'Predictivo' },
                { icon: 'fa-code', label: 'API AI' }
            ],
            cta: 'Consultar',
            ctaLink: '/contactanos',
            price: 'A Medida'
        },
        {
            id: 'automatizacion',
            name: 'Automatización',
            icon: 'fa-gears',
            img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=60',
            category: 'Procesos',
            pillLabel: 'EFICIENCIA',
            shortDesc: 'Conexión de CRMs, sistemas de facturación y correos automáticos.',
            stats: [
                { icon: 'fa-headset', label: 'Soporte', value: '24/7' },
                { icon: 'fa-pen-ruler', label: 'Flujo', value: 'A Medida' },
                { icon: 'fa-bolt', label: 'Tiempo', value: 'Ahorrado' }
            ],
            includes: [
                { icon: 'fa-plug', label: 'Integraciones' },
                { icon: 'fa-envelope-open-text', label: 'Emails' },
                { icon: 'fa-chart-line', label: 'Productividad' }
            ],
            cta: 'Consultar',
            ctaLink: '/contactanos',
            price: 'A Medida'
        },
        {
            id: 'herramientas-productividad',
            name: 'Herramientas y Entornos',
            icon: 'fa-toolbox',
            img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&auto=format&fit=crop&q=60',
            category: 'Gestión',
            pillLabel: 'COLABORACIÓN',
            shortDesc: 'Configuración de entornos colaborativos y repositorios de código (GitHub).',
            stats: [
                { icon: 'fa-headset', label: 'Soporte', value: '24/7' },
                { icon: 'fa-pen-ruler', label: 'Setup', value: 'A Medida' },
                { icon: 'fa-users', label: 'Equipos', value: 'Conectados' }
            ],
            includes: [
                { icon: 'fa-github', label: 'Git' },
                { icon: 'fa-trello', label: 'Gestores' },
                { icon: 'fa-cloud-arrow-up', label: 'Nube' }
            ],
            cta: 'Consultar',
            ctaLink: '/contactanos',
            price: 'A Medida'
        }
    ],
    personalizado: [
        {
            id: 'modelo-trabajo',
            name: 'Soluciones a Medida',
            icon: 'fa-handshake',
            img: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format&fit=crop&q=60',
            category: 'Exclusivo',
            pillLabel: 'CONTANOS TU PROBLEMA',
            shortDesc: 'Aplicamos la filosofía: "Contanos tu problema, nosotros vemos cómo hacerlo."',
            stats: [
                { icon: 'fa-headset', label: 'Soporte', value: '24/7' },
                { icon: 'fa-pen-ruler', label: 'Solución', value: '100% A Medida' },
                { icon: 'fa-lock', label: 'Privacidad', value: 'Confidencial' }
            ],
            includes: [
                { icon: 'fa-magnifying-glass', label: 'Análisis' },
                { icon: 'fa-clipboard-check', label: 'Propuesta' },
                { icon: 'fa-rocket', label: 'Despliegue' }
            ],
            cta: 'Cuéntanos tu idea',
            ctaLink: '/contactanos',
            price: 'Cotizar'
        }
    ]
};
