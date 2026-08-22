import React from 'react';
import ServiciosCarousel from './components/ServiciosCarousel';

const items = [
    {
        id: 'libros-robotica-primaria',
        name: 'Libros Primaria',
        icon: 'fa-book-open',
        img: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&auto=format&fit=crop&q=60',
        category: 'Editorial',
        pillLabel: 'TEXTO ESCOLAR',
        shortDesc: 'Venta de material didáctico y libros interactivos oficiales de robótica diseñados especialmente para primaria.',
        stats: [
            { icon: 'fa-book', label: 'Área', value: 'Robótica' },
            { icon: 'fa-graduation-cap', label: 'Niveles', value: '1° a 6° Pri' },
            { icon: 'fa-truck', label: 'Envío', value: 'Nacional' }
        ],
        includes: [
            { icon: 'fa-puzzle-piece', label: 'Proyectos' },
            { icon: 'fa-desktop', label: 'Plataforma' },
            { icon: 'fa-chalkboard-user', label: 'Guía Docente' }
        ],
        cta: 'Ver catálogo',
        ctaLink: '/libros-thb',
        price: 'Desde 45 Bs'
    },
    {
        id: 'libros-robotica-secundaria',
        name: 'Libros Secundaria',
        icon: 'fa-book',
        img: 'https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?w=600&auto=format&fit=crop&q=60',
        category: 'Editorial',
        pillLabel: 'TEXTO OFICIAL',
        shortDesc: 'Libros avanzados de programación, Arduino, IoT y electrónica básica estructurados para secundaria.',
        stats: [
            { icon: 'fa-microchip', label: 'Foco', value: 'Arduino / IoT' },
            { icon: 'fa-graduation-cap', label: 'Niveles', value: '1° a 6° Sec' },
            { icon: 'fa-truck', label: 'Envío', value: 'Nacional' }
        ],
        includes: [
            { icon: 'fa-code-fork', label: 'Código Fuente' },
            { icon: 'fa-laptop', label: 'Simulador' },
            { icon: 'fa-file-signature', label: 'Ejercicios' }
        ],
        cta: 'Ver catálogo',
        ctaLink: '/libros-thb',
        price: 'Desde 55 Bs'
    },
    {
        id: 'guias-pedagogicas',
        name: 'Guías Pedagógicas',
        icon: 'fa-file-lines',
        img: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&auto=format&fit=crop&q=60',
        category: 'Recursos',
        pillLabel: 'MATERIAL DOCENTE',
        shortDesc: 'Guías de planificación curricular de robótica alineadas a las normativas del Ministerio de Educación.',
        stats: [
            { icon: 'fa-chalkboard-user', label: 'Foco', value: 'Planificación' },
            { icon: 'fa-file-circle-check', label: 'Alineación', value: 'Oficial' },
            { icon: 'fa-briefcase', label: 'Uso', value: 'Formatos' }
        ],
        includes: [
            { icon: 'fa-file-pdf', label: 'Plan Anual' },
            { icon: 'fa-file-signature', label: 'Evaluaciones' },
            { icon: 'fa-desktop', label: 'Soporte' }
        ],
        cta: 'Ver catálogo',
        ctaLink: '/libros-thb',
        price: 'Consultar'
    },
    {
        id: 'cuadernos-de-trabajo',
        name: 'Cuadernos de Trabajo',
        icon: 'fa-pen-clip',
        img: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=60',
        category: 'Editorial',
        pillLabel: 'PRACTICADORES',
        shortDesc: 'Cuadernillos prácticos para reforzar conocimientos en diagramación, lógica de bloques y armado de circuitos.',
        stats: [
            { icon: 'fa-pencil', label: 'Foco', value: 'Ejercitación' },
            { icon: 'fa-circle-dot', label: 'Nivel', value: 'Todos' },
            { icon: 'fa-truck', label: 'Envío', value: 'Nacional' }
        ],
        includes: [
            { icon: 'fa-scissors', label: 'Armables' },
            { icon: 'fa-qrcode', label: 'QR Enlaces' },
            { icon: 'fa-star', label: 'Stickers' }
        ],
        cta: 'Ver catálogo',
        ctaLink: '/libros-thb',
        price: 'Desde 35 Bs'
    },
    {
        id: 'recursos-digitales-editorial',
        name: 'Recursos Digitales',
        icon: 'fa-file-video',
        img: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=600&auto=format&fit=crop&q=60',
        category: 'Digital',
        pillLabel: 'MATERIAL COMPLEMENTARIO',
        shortDesc: 'Acceso a diapositivas dinámicas, videos explicativos y simuladores 3D interactivos vinculados a los libros.',
        stats: [
            { icon: 'fa-laptop-code', label: 'Acceso', value: 'Plataforma' },
            { icon: 'fa-video', label: 'Contenido', value: 'Audiovisual' },
            { icon: 'fa-rotate', label: 'Actualización', value: 'Anual' }
        ],
        includes: [
            { icon: 'fa-file-powerpoint', label: 'Slides' },
            { icon: 'fa-film', label: 'Animaciones' },
            { icon: 'fa-cloud', label: 'Descargas' }
        ],
        cta: 'Ver catálogo',
        ctaLink: '/libros-thb',
        price: 'Incluido'
    },
    {
        id: 'evaluaciones-modelos-robotica',
        name: 'Modelos de Evaluación',
        icon: 'fa-clipboard-question',
        img: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=600&auto=format&fit=crop&q=60',
        category: 'Evaluación',
        pillLabel: 'BANCO DE PREGUNTAS',
        shortDesc: 'Exámenes modelos y pruebas prácticas de lógica y robótica listas para aplicar a los estudiantes.',
        stats: [
            { icon: 'fa-clipboard-list', label: 'Banco', value: 'Preguntas' },
            { icon: 'fa-chart-simple', label: 'Métricas', value: 'Diseñadas' },
            { icon: 'fa-file-pdf', label: 'Formatos', value: 'Editables' }
        ],
        includes: [
            { icon: 'fa-file-word', label: 'Plantillas DOC' },
            { icon: 'fa-key', label: 'Respuestas' },
            { icon: 'fa-compass', label: 'Rúbricas' }
        ],
        cta: 'Ver catálogo',
        ctaLink: '/libros-thb',
        price: 'Consultar'
    }
];

const ServiciosEditorial = () => {
    return <ServiciosCarousel items={items} />;
};

export default ServiciosEditorial;
