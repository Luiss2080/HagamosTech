export const CATEGORIES = [
    { id: 'estudiantes', label: 'ACOMPAÑAMIENTO ACADÉMICO' },
    { id: 'emprendedores', label: 'EMPRENDEDORES' },
    { id: 'empleo', label: 'EMPLEO' },
    { id: 'diseno', label: 'DISEÑO GRÁFICO' },
    { id: 'web', label: 'WEB Y E-COMMERCE' },
    { id: 'software', label: 'SOFTWARE' },
    { id: 'personalizado', label: 'A MEDIDA' }
];

export const SERVICIOS_DATA = {
    estudiantes: [
        {
            id: 'presentaciones',
            name: 'Presentaciones PowerPoint e Interactivas',
            icon: 'fa-file-powerpoint',
            img: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&auto=format&fit=crop&q=60',
            category: 'Académico',
            pillLabel: 'EXPOSICIONES',
            shortDesc: 'Organización visual de exposiciones, defensas, proyectos, clases y presentaciones académicas.',
            stats: [
                { icon: 'fa-headset', label: 'Soporte', value: 'A Coordinar' },
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
            name: 'Formato APA 7 y Documentación Técnica',
            icon: 'fa-book',
            img: 'https://images.unsplash.com/photo-1455390582262-044cdead2708?w=600&auto=format&fit=crop&q=60',
            category: 'Documentación',
            pillLabel: 'RIGOR ACADÉMICO',
            shortDesc: 'Orientación de estructura, formato, citas, referencias, tablas, figuras y documentación técnica según pauta.',
            stats: [
                { icon: 'fa-headset', label: 'Soporte', value: 'A Coordinar' },
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
            name: 'Infografías, Diagramas y Líneas de Tiempo',
            icon: 'fa-project-diagram',
            img: 'https://images.unsplash.com/photo-1543286386-713bdd548da4?w=600&auto=format&fit=crop&q=60',
            category: 'Visualización',
            pillLabel: 'ESQUEMAS',
            shortDesc: 'Recursos visuales para explicar temas, procesos y contenidos de estudio.',
            stats: [
                { icon: 'fa-headset', label: 'Soporte', value: 'A Coordinar' },
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
            name: 'Mapas Conceptuales y Portadas Académicas',
            icon: 'fa-network-wired',
            img: 'https://images.unsplash.com/photo-1503428593586-e225b39bddfe?w=600&auto=format&fit=crop&q=60',
            category: 'Síntesis',
            pillLabel: 'MARCO TEÓRICO',
            shortDesc: 'Síntesis visual de temas y preparación de portadas para trabajos.',
            stats: [
                { icon: 'fa-headset', label: 'Soporte', value: 'A Coordinar' },
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
            name: 'Simuladores Educativos y Proyectos de Redes',
            icon: 'fa-microchip',
            img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=60',
            category: 'Tecnología',
            pillLabel: 'ENTORNOS VIRTUALES',
            shortDesc: 'Orientación en simulaciones y proyectos tecnológicos educativos, según alcance.',
            stats: [
                { icon: 'fa-headset', label: 'Soporte', value: 'A Coordinar' },
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
            name: 'Apoyo en Proyectos de Programación',
            icon: 'fa-code',
            img: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=60',
            category: 'Software',
            pillLabel: 'CÓDIGO',
            shortDesc: 'Tutoría de algoritmos, lógica y comprensión de código.',
            stats: [
                { icon: 'fa-headset', label: 'Soporte', value: 'A Coordinar' },
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
        },
        {
            id: 'mentoria-apoyo-tareas',
            name: 'Mentorías Académicas y Apoyo en Tareas',
            icon: 'fa-chalkboard-user',
            img: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&auto=format&fit=crop&q=60',
            category: 'Acompañamiento',
            pillLabel: 'TUTORÍA',
            shortDesc: 'Explicación de contenidos, ejercicios guiados y apoyo en tareas de distintos niveles y materias disponibles.',
            stats: [
                { icon: 'fa-graduation-cap', label: 'Niveles', value: 'Escolar y Superior' },
                { icon: 'fa-user-group', label: 'Modalidad', value: 'A Coordinar' },
                { icon: 'fa-book-open', label: 'Enfoque', value: 'Aprendizaje' }
            ],
            includes: [
                { icon: 'fa-lightbulb', label: 'Explicación' },
                { icon: 'fa-list-check', label: 'Ejercicios' },
                { icon: 'fa-comments', label: 'Orientación' }
            ],
            cta: 'Consultar',
            ctaLink: '/contactanos',
            price: 'A Medida'
        },
        {
            id: 'informes-monografias',
            name: 'Acompañamiento en Informes y Monografías',
            icon: 'fa-file-lines',
            img: 'https://images.unsplash.com/photo-1455390582262-044cdead2708?w=600&auto=format&fit=crop&q=60',
            category: 'Documentación',
            pillLabel: 'ORIENTACIÓN',
            shortDesc: 'Guía para delimitar tema, organizar capítulos, revisar avances y preparar citas y referencias.',
            stats: [
                { icon: 'fa-book', label: 'Formato', value: 'Según pauta' },
                { icon: 'fa-spell-check', label: 'Revisión', value: 'A Coordinar' },
                { icon: 'fa-graduation-cap', label: 'Enfoque', value: 'Formativo' }
            ],
            includes: [
                { icon: 'fa-list-ol', label: 'Estructura' },
                { icon: 'fa-quote-right', label: 'Referencias' },
                { icon: 'fa-comments', label: 'Retroalimentación' }
            ],
            cta: 'Consultar',
            ctaLink: '/contactanos',
            price: 'A Medida'
        },
        {
            id: 'proyectos-socioformativos',
            name: 'Proyectos Socioformativos',
            icon: 'fa-people-group',
            img: 'https://images.unsplash.com/photo-1529390079861-591de354faf5?w=600&auto=format&fit=crop&q=60',
            category: 'Proyectos',
            pillLabel: 'ACOMPAÑAMIENTO',
            shortDesc: 'Orientación para definir problema, objetivos, actividades, evidencias, documentación y exposición del proyecto.',
            stats: [
                { icon: 'fa-users', label: 'Niveles', value: 'Colegio y Universidad' },
                { icon: 'fa-diagram-project', label: 'Proceso', value: 'Por Etapas' },
                { icon: 'fa-file-lines', label: 'Entrega', value: 'Documentada' }
            ],
            includes: [
                { icon: 'fa-bullseye', label: 'Objetivos' },
                { icon: 'fa-list-check', label: 'Plan de trabajo' },
                { icon: 'fa-presentation-screen', label: 'Presentación' }
            ],
            cta: 'Consultar',
            ctaLink: '/contactanos',
            price: 'A Medida'
        }
    ],
    emprendedores: [
        {
            id: 'creacion-marca',
            name: 'Creación de Marca y Branding Básico',
            icon: 'fa-lightbulb',
            img: 'https://images.unsplash.com/photo-1493612276216-ee3925520721?w=600&auto=format&fit=crop&q=60',
            category: 'Branding',
            pillLabel: 'IDENTIDAD',
            shortDesc: 'Desarrollo de identidad visual inicial para un negocio o proyecto.',
            stats: [
                { icon: 'fa-headset', label: 'Soporte', value: 'A Coordinar' },
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
            shortDesc: 'Reglas de uso para logotipo, colores y tipografía.',
            stats: [
                { icon: 'fa-headset', label: 'Soporte', value: 'A Coordinar' },
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
            name: 'Catálogos Digitales para Emprendimientos',
            icon: 'fa-qrcode',
            img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop&q=60',
            category: 'Digitalización',
            pillLabel: 'AGILIDAD',
            shortDesc: 'Presentación digital de productos o servicios.',
            stats: [
                { icon: 'fa-headset', label: 'Soporte', value: 'A Coordinar' },
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
            name: 'Publicidad para Promociones y Ofertas',
            icon: 'fa-bullhorn',
            img: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=600&auto=format&fit=crop&q=60',
            category: 'Marketing',
            pillLabel: 'PROMOCIONES',
            shortDesc: 'Piezas gráficas para comunicar campañas y ofertas.',
            stats: [
                { icon: 'fa-headset', label: 'Soporte', value: 'A Coordinar' },
                { icon: 'fa-pen-ruler', label: 'Diseño', value: 'A Medida' },
                { icon: 'fa-bolt', label: 'Ventas', value: 'Rápidas' }
            ],
            includes: [
                { icon: 'fa-tag', label: 'Campañas' },
                { icon: 'fa-share-nodes', label: 'Redes' },
                { icon: 'fa-eye', label: 'Atractivo' }
            ],
            cta: 'Consultar',
            ctaLink: '/contactanos',
            price: 'A Medida'
        },
        {
            id: 'publicidad-fechas',
            name: 'Publicidad para Fechas Especiales',
            icon: 'fa-calendar-star',
            img: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=600&auto=format&fit=crop&q=60',
            category: 'Marketing',
            pillLabel: 'TEMÁTICAS',
            shortDesc: 'Diseño de piezas para fechas y eventos comerciales.',
            stats: [
                { icon: 'fa-headset', label: 'Soporte', value: 'A Coordinar' },
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
    ],
    empleo: [
        {
            id: 'cv-ats',
            name: 'Currículum Profesional y CV Optimizado ATS',
            icon: 'fa-file-user',
            img: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&auto=format&fit=crop&q=60',
            category: 'Empleabilidad',
            pillLabel: 'CURRÍCULUM',
            shortDesc: 'Estructuración y presentación clara de experiencia y formación.',
            stats: [
                { icon: 'fa-headset', label: 'Soporte', value: 'A Coordinar' },
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
            name: 'Optimización de Perfil de LinkedIn',
            icon: 'fa-linkedin',
            img: 'https://images.unsplash.com/photo-1611944212129-29977ae1398c?w=600&auto=format&fit=crop&q=60',
            category: 'Networking',
            pillLabel: 'PERFIL DIGITAL',
            shortDesc: 'Mejora de titulares, extracto y presentación profesional.',
            stats: [
                { icon: 'fa-headset', label: 'Soporte', value: 'A Coordinar' },
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
            name: 'Cartas de Presentación y Traducción de CV',
            icon: 'fa-envelope-open-text',
            img: 'https://images.unsplash.com/photo-1554774853-719586f82d77?w=600&auto=format&fit=crop&q=60',
            category: 'Redacción',
            pillLabel: 'PERSUASIÓN',
            shortDesc: 'Preparación de documentos para postulaciones laborales.',
            stats: [
                { icon: 'fa-headset', label: 'Soporte', value: 'A Coordinar' },
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
            name: 'Portafolios Profesionales Digitales',
            icon: 'fa-folder-open',
            img: 'https://images.unsplash.com/photo-1481481600673-c6cb960f0896?w=600&auto=format&fit=crop&q=60',
            category: 'Exhibición',
            pillLabel: 'PROYECTOS',
            shortDesc: 'Organización de proyectos y trabajos en un portafolio digital.',
            stats: [
                { icon: 'fa-headset', label: 'Soporte', value: 'A Coordinar' },
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
            name: 'Preparación para Entrevistas y Asesoría Laboral',
            icon: 'fa-users',
            img: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&auto=format&fit=crop&q=60',
            category: 'Asesoría',
            pillLabel: 'SIMULACIONES',
            shortDesc: 'Práctica y orientación para procesos de selección.',
            stats: [
                { icon: 'fa-headset', label: 'Soporte', value: 'A Coordinar' },
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
            shortDesc: 'Diseño de certificados, constancias y reconocimientos.',
            stats: [
                { icon: 'fa-headset', label: 'Soporte', value: 'A Coordinar' },
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
            name: 'Logos e Identidad Visual (Isologotipos)',
            icon: 'fa-pen-nib',
            img: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&auto=format&fit=crop&q=60',
            category: 'Gráfico',
            pillLabel: 'MARCAS',
            shortDesc: 'Diseño de marca y sus versiones gráficas.',
            stats: [
                { icon: 'fa-headset', label: 'Soporte', value: 'A Coordinar' },
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
            name: 'Flyers, Banners, Pancartas y Redes Sociales',
            icon: 'fa-image',
            img: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&auto=format&fit=crop&q=60',
            category: 'Publicidad',
            pillLabel: 'REDES Y PRINT',
            shortDesc: 'Piezas para difusión digital, eventos e impresión.',
            stats: [
                { icon: 'fa-headset', label: 'Soporte', value: 'A Coordinar' },
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
            name: 'Packaging, Etiquetas y Catálogos Físicos',
            icon: 'fa-box-open',
            img: 'https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=600&auto=format&fit=crop&q=60',
            category: 'Producto',
            pillLabel: 'EMPAQUES',
            shortDesc: 'Diseño y maquetación de materiales de producto.',
            stats: [
                { icon: 'fa-headset', label: 'Soporte', value: 'A Coordinar' },
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
            name: 'Tarjetas de Presentación e Invitaciones',
            icon: 'fa-id-card',
            img: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=600&auto=format&fit=crop&q=60',
            category: 'Corporativo',
            pillLabel: 'PRESENTACIÓN',
            shortDesc: 'Material gráfico para contactos y eventos.',
            stats: [
                { icon: 'fa-headset', label: 'Soporte', value: 'A Coordinar' },
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
            name: 'Edición y Retoque Fotográfico',
            icon: 'fa-wand-magic-sparkles',
            img: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=600&auto=format&fit=crop&q=60',
            category: 'Retoque',
            pillLabel: 'FOTOGRAFÍA',
            shortDesc: 'Ajuste de color, limpieza y preparación de imágenes.',
            stats: [
                { icon: 'fa-headset', label: 'Soporte', value: 'A Coordinar' },
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
            shortDesc: 'Sitios corporativos, institucionales, educativos, inmobiliarios, de noticias, restaurantes u organizaciones; portales con secciones públicas o privadas según alcance.',
            stats: [
                { icon: 'fa-headset', label: 'Soporte', value: 'A Coordinar' },
                { icon: 'fa-pen-ruler', label: 'Desarrollo', value: 'A Medida' },
                { icon: 'fa-bolt', label: 'Carga', value: 'Rápida' }
            ],
            includes: [
                { icon: 'fa-sitemap', label: 'Secciones' },
                { icon: 'fa-mobile-screen', label: 'Responsive' },
                { icon: 'fa-magnifying-glass', label: 'SEO básico' }
            ],
            cta: 'Consultar',
            ctaLink: '/contactanos',
            price: 'A Medida'
        },
        {
            id: 'landing-pages',
            name: 'Landing Pages y Portafolios Personales',
            icon: 'fa-rocket',
            img: 'https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?w=600&auto=format&fit=crop&q=60',
            category: 'Conversión',
            pillLabel: 'LEADS',
            shortDesc: 'Páginas de campaña, presentación, captación de consultas o muestra de trabajos y proyectos.',
            stats: [
                { icon: 'fa-headset', label: 'Soporte', value: 'A Coordinar' },
                { icon: 'fa-pen-ruler', label: 'Diseño', value: 'A Medida' },
                { icon: 'fa-bullseye', label: 'Foco', value: 'Conversión' }
            ],
            includes: [
                { icon: 'fa-bullseye', label: 'Objetivo' },
                { icon: 'fa-mouse-pointer', label: 'Llamados' },
                { icon: 'fa-mobile-screen', label: 'Responsive' }
            ],
            cta: 'Consultar',
            ctaLink: '/contactanos',
            price: 'A Medida'
        },
        {
            id: 'tiendas-online',
            name: 'Tiendas Online Básicas y Sistemas de Pedidos',
            icon: 'fa-cart-shopping',
            img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&auto=format&fit=crop&q=60',
            category: 'E-commerce',
            pillLabel: 'VENTAS',
            shortDesc: 'Catálogos con carrito o pedidos; pagos en línea y sus proveedores se evalúan por separado antes de comprometerlos.',
            stats: [
                { icon: 'fa-headset', label: 'Soporte', value: 'A Coordinar' },
                { icon: 'fa-pen-ruler', label: 'Desarrollo', value: 'A Medida' },
                { icon: 'fa-credit-card', label: 'Pagos', value: 'A evaluar' }
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
            name: 'Catálogos Digitales Online y Blogs',
            icon: 'fa-blog',
            img: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&auto=format&fit=crop&q=60',
            category: 'Contenido',
            pillLabel: 'DINÁMICO',
            shortDesc: 'Catálogos, blogs, plataformas de cursos, directorios y comunidades con publicación organizada de contenido.',
            stats: [
                { icon: 'fa-headset', label: 'Soporte', value: 'A Coordinar' },
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
            name: 'Diseño UI/UX, Formularios y Web Responsive',
            icon: 'fa-mobile-screen-button',
            img: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&auto=format&fit=crop&q=60',
            category: 'Interfaces',
            pillLabel: 'RESPONSIVE',
            shortDesc: 'Investigación y diseño de experiencia, prototipos, formularios y adaptación a pantallas; puede aplicarse a aplicaciones web.',
            stats: [
                { icon: 'fa-headset', label: 'Soporte', value: 'A Coordinar' },
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
            name: 'Desarrollo de Sistemas Web y Software',
            icon: 'fa-laptop-code',
            img: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&auto=format&fit=crop&q=60',
            category: 'Desarrollo',
            pillLabel: 'A MEDIDA',
            shortDesc: 'Sistemas de inventario, ventas/POS, facturación, contabilidad, CRM, recursos humanos, gestión documental, asistencia, citas, gestión académica, clínicas, hoteles, gimnasios, talleres, transporte, logística, finanzas y producción; aplicaciones web y móviles según alcance y viabilidad.',
            stats: [
                { icon: 'fa-headset', label: 'Soporte', value: 'A Coordinar' },
                { icon: 'fa-pen-ruler', label: 'Código', value: 'A Medida' },
                { icon: 'fa-layer-group', label: 'Alcance', value: 'Por fases' }
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
            name: 'Diseño y Gestión de Bases de Datos',
            icon: 'fa-database',
            img: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=600&auto=format&fit=crop&q=60',
            category: 'Datos',
            pillLabel: 'ESTRUCTURA',
            shortDesc: 'Modelado de datos, consultas, reportes y estructura para sistemas; análisis de APIs e integración técnica entre plataformas cuando sea viable.',
            stats: [
                { icon: 'fa-headset', label: 'Soporte', value: 'A Coordinar' },
                { icon: 'fa-pen-ruler', label: 'Diseño', value: 'A Medida' },
                { icon: 'fa-server', label: 'Rendimiento', value: 'Óptimo' }
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
    ],
    personalizado: [
        {
            id: 'modelo-trabajo',
            name: 'Soluciones Personalizadas',
            icon: 'fa-handshake',
            img: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format&fit=crop&q=60',
            category: 'Exclusivo',
            pillLabel: 'CONTANOS TU PROBLEMA',
            shortDesc: 'Evaluación de necesidades digitales o académicas; se pueden analizar prototipos, paneles, dashboards, herramientas internas y aplicaciones web o móviles según alcance.',
            stats: [
                { icon: 'fa-headset', label: 'Soporte', value: 'A Coordinar' },
                { icon: 'fa-pen-ruler', label: 'Solución', value: 'Según alcance' },
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
