import React from 'react';
import ServiciosCarousel from './components/ServiciosCarousel';

const items = [
    {
        id: 'cursos-programacion-web',
        name: 'Cursos de Código',
        icon: 'fa-code',
        img: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=60',
        category: 'Academia',
        pillLabel: 'APRENDIZAJE PRÁCTICO',
        shortDesc: 'Aprende programación desde cero en Python, JavaScript o bases de datos, con proyectos y casos prácticos reales.',
        stats: [
            { icon: 'fa-users', label: 'Público', value: '12+ años' },
            { icon: 'fa-layer-group', label: 'Niveles', value: 'Básico a Pro' },
            { icon: 'fa-clock', label: 'Horas', value: '24 Horas' }
        ],
        includes: [
            { icon: 'fa-code-branch', label: 'Repositorios' },
            { icon: 'fa-book-open', label: 'Material' },
            { icon: 'fa-certificate', label: 'Certificado' }
        ],
        cta: 'Inscribirme',
        ctaLink: '/cursos/programacion',
        price: 'Consultar'
    },
    {
        id: 'simuladores-didacticos',
        name: 'Simuladores Web',
        icon: 'fa-cubes',
        img: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&auto=format&fit=crop&q=60',
        category: 'Recursos',
        pillLabel: 'ENTORNOS INTERACTIVOS',
        shortDesc: 'Desarrollo de simulaciones y entornos web interactivos para apoyar explicaciones complejas de física, química y matemáticas.',
        stats: [
            { icon: 'fa-compass', label: 'Foco', value: 'Interactividad' },
            { icon: 'fa-laptop-code', label: 'Tecnología', value: 'JS / Three.js' },
            { icon: 'fa-school', label: 'Destino', value: 'Colegios' }
        ],
        includes: [
            { icon: 'fa-desktop', label: 'Web UI' },
            { icon: 'fa-circle-play', label: 'Interactivos' },
            { icon: 'fa-file-lines', label: 'Instrucciones' }
        ],
        cta: 'Explorar',
        ctaLink: '/catalogo',
        price: 'Personalizado'
    },
    {
        id: 'asesoria-defensas',
        name: 'Apoyo a Proyectos',
        icon: 'fa-graduation-cap',
        img: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&auto=format&fit=crop&q=60',
        category: 'Académico',
        pillLabel: 'TUTORÍA ESPECIALIZADA',
        shortDesc: 'Orientación para estructurar, formatear y preparar la defensa de proyectos técnicos de software y programación.',
        stats: [
            { icon: 'fa-trophy', label: 'Foco', value: 'Presentación' },
            { icon: 'fa-lightbulb', label: 'Estructura', value: 'A Medida' },
            { icon: 'fa-user-graduate', label: 'Tutorías', value: '1 a 1' }
        ],
        includes: [
            { icon: 'fa-clipboard-list', label: 'Plan de Trabajo' },
            { icon: 'fa-file-pdf', label: 'Diapositivas' },
            { icon: 'fa-award', label: 'Aprobación' }
        ],
        cta: 'Asesoría',
        ctaLink: '/contactanos',
        price: 'Cotizar'
    },
    {
        id: 'recursos-digitales-educacion',
        name: 'Recursos Digitales',
        icon: 'fa-folder-open',
        img: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=600&auto=format&fit=crop&q=60',
        category: 'Contenido',
        pillLabel: 'MATERIAL COMPLEMENTARIO',
        shortDesc: 'Diseño de recursos educativos digitales, guías en PDF interactivo y bancos de preguntas para docentes.',
        stats: [
            { icon: 'fa-file-pdf', label: 'Formato', value: 'Interactivos' },
            { icon: 'fa-book-open', label: 'Temarios', value: 'Personalizados' },
            { icon: 'fa-truck', label: 'Envío', value: 'Digital' }
        ],
        includes: [
            { icon: 'fa-qrcode', label: 'Enlaces QR' },
            { icon: 'fa-image', text: 'Infografías' },
            { icon: 'fa-star', label: 'Plantillas' }
        ],
        cta: 'Ver catálogo',
        ctaLink: '/libros-thb',
        price: 'Desde 25 Bs'
    },
    {
        id: 'capacitacion-docentes-tics',
        name: 'Formación en TICs',
        icon: 'fa-chalkboard-user',
        img: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&auto=format&fit=crop&q=60',
        category: 'Formación',
        pillLabel: 'DOCENTE DIGITAL',
        shortDesc: 'Capacitación para docentes y educadores en el manejo de plataformas LMS, aulas virtuales y herramientas de evaluación.',
        stats: [
            { icon: 'fa-users', label: 'Destinado', value: 'Profesores' },
            { icon: 'fa-laptop-file', label: 'Plataforma', value: 'Moodle / Meet' },
            { icon: 'fa-certificate', label: 'Valor', value: 'Curricular' }
        ],
        includes: [
            { icon: 'fa-graduation-cap', label: 'Clases Grabadas' },
            { icon: 'fa-folder-open', label: 'Plantillas' },
            { icon: 'fa-chalkboard', label: 'Recursos' }
        ],
        cta: 'Inscribirme',
        ctaLink: '/contactanos',
        price: 'Consultar'
    },
    {
        id: 'talleres-herramientas-digitales',
        name: 'Talleres Tecnológicos',
        icon: 'fa-desktop',
        img: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&auto=format&fit=crop&q=60',
        category: 'Academia',
        pillLabel: 'TALLERES CORTOS',
        shortDesc: 'Talleres cortos prácticos sobre diseño de presentaciones interactivas, bases de datos y lógica computacional.',
        stats: [
            { icon: 'fa-clock', label: 'Duración', value: '8 Horas' },
            { icon: 'fa-layer-group', label: 'Temas', value: 'Prácticos' },
            { icon: 'fa-user-check', label: 'Tutor', value: 'En Vivo' }
        ],
        includes: [
            { icon: 'fa-clipboard-question', label: 'Prácticas' },
            { icon: 'fa-file-lines', label: 'Guías' },
            { icon: 'fa-medal', label: 'Insignia' }
        ],
        cta: 'Detalles',
        ctaLink: '/contactanos',
        price: '50 Bs'
    }
];

const ServiciosAcademia = () => {
    return <ServiciosCarousel items={items} />;
};

export default ServiciosAcademia;
