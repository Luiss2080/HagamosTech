import React from 'react';
import ServiciosCarousel from './components/ServiciosCarousel';

const items = [
    {
        id: 'cursos-robotica-presencial',
        name: 'Cursos de Robótica',
        icon: 'fa-graduation-cap',
        img: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&auto=format&fit=crop&q=60',
        category: 'Educación',
        pillLabel: 'APRENDIZAJE PRÁCTICO',
        shortDesc: 'Clases prácticas de robótica para todas las edades, desarrollando creatividad y pensamiento lógico.',
        stats: [
            { icon: 'fa-users', label: 'Edades', value: '6+ años' },
            { icon: 'fa-layer-group', label: 'Niveles', value: '3 niveles' },
            { icon: 'fa-clock', label: 'Modalidad', value: 'Presencial' }
        ],
        includes: [
            { icon: 'fa-puzzle-piece', label: 'Kits' },
            { icon: 'fa-book', label: 'Material' },
            { icon: 'fa-certificate', label: 'Certificado' }
        ],
        cta: 'Inscribirme',
        ctaLink: '/cursos/presenciales',
        price: 'Consultar'
    },
    {
        id: 'cursos-robotica-virtual',
        name: 'Robótica Virtual',
        icon: 'fa-laptop',
        img: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=60',
        category: 'Educación Online',
        pillLabel: '100% REMOTO',
        shortDesc: 'Cursos virtuales de robótica y programación para estudiantes y docentes, con acceso desde cualquier lugar.',
        stats: [
            { icon: 'fa-laptop', label: 'Modalidad', value: 'Online' },
            { icon: 'fa-users-rectangle', label: 'Niveles', value: 'Todos' },
            { icon: 'fa-clock', label: 'Horarios', value: 'Flexibles' }
        ],
        includes: [
            { icon: 'fa-graduation-cap', label: 'Cursos' },
            { icon: 'fa-file-signature', label: 'Diploma' },
            { icon: 'fa-headset', label: 'Soporte' }
        ],
        cta: 'Inscribirme',
        ctaLink: '/cursos/online',
        price: 'Consultar'
    },
    {
        id: 'herramientas-steam',
        name: 'Herramientas STEAM',
        icon: 'fa-robot',
        img: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&auto=format&fit=crop&q=60',
        category: 'Tecnología Educativa',
        pillLabel: 'EQUIPAMIENTO PRO',
        shortDesc: 'Dotación de kits tecnológicos y software interactivo para laboratorios escolares y makerspaces.',
        stats: [
            { icon: 'fa-puzzle-piece', label: 'Hardware', value: 'Arduino/Esp' },
            { icon: 'fa-gears', label: 'Software', value: 'Interact' },
            { icon: 'fa-school', label: 'Destino', value: 'Aulas' }
        ],
        includes: [
            { icon: 'fa-laptop-code', label: 'LMS' },
            { icon: 'fa-microchip', label: 'Placas' },
            { icon: 'fa-screwdriver-wrench', label: 'Guías' }
        ],
        cta: 'Explorar',
        ctaLink: '/catalogo',
        price: 'Catálogo'
    },
    {
        id: 'preparacion-olimpiadas',
        name: 'Apoyo a Olimpiadas',
        icon: 'fa-trophy',
        img: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&auto=format&fit=crop&q=60',
        category: 'Mentoría',
        pillLabel: 'COMPETICIÓN',
        shortDesc: 'Acompañamiento especializado en el desarrollo de proyectos y entrenamiento para olimpiadas de robótica.',
        stats: [
            { icon: 'fa-trophy', label: 'Foco', value: 'Competición' },
            { icon: 'fa-lightbulb', label: 'Proyectos', value: 'A Medida' },
            { icon: 'fa-user-graduate', label: 'Sesiones', value: '1 a 1' }
        ],
        includes: [
            { icon: 'fa-clipboard-list', label: 'Plan' },
            { icon: 'fa-cubes', label: 'Materiales' },
            { icon: 'fa-award', label: 'Premios' }
        ],
        cta: 'Asesoría',
        ctaLink: '/contactanos',
        price: 'Cotizar'
    },
    {
        id: 'talleres-electronica',
        name: 'Talleres de Electrónica',
        icon: 'fa-bolt',
        img: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=600&auto=format&fit=crop&q=60',
        category: 'Educación STEAM',
        pillLabel: 'CIRCUITOS Y CÓDIGO',
        shortDesc: 'Iniciación práctica en diseño de circuitos, soldadura segura y programación básica de sensores.',
        stats: [
            { icon: 'fa-plug', label: 'Temas', value: 'Circuitos' },
            { icon: 'fa-layer-group', label: 'Nivel', value: 'Básico/Int' },
            { icon: 'fa-clock', label: 'Duración', value: '12 Horas' }
        ],
        includes: [
            { icon: 'fa-tools', label: 'Kit Componentes' },
            { icon: 'fa-file-lines', label: 'Guía' },
            { icon: 'fa-medal', label: 'Insignia' }
        ],
        cta: 'Detalles',
        ctaLink: '/contactanos',
        price: '45 Bs'
    },
    {
        id: 'capacitacion-docente',
        name: 'Capacitación Docente',
        icon: 'fa-chalkboard-user',
        img: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&auto=format&fit=crop&q=60',
        category: 'Formación',
        pillLabel: 'DOCENTE 4.0',
        shortDesc: 'Formación metodológica para profesores en herramientas y recursos didácticos de robótica escolar.',
        stats: [
            { icon: 'fa-users', label: 'Foco', value: 'Docentes' },
            { icon: 'fa-book-open', label: 'Currículo', value: 'Boliviano' },
            { icon: 'fa-certificate', label: 'Valor', value: 'Curricular' }
        ],
        includes: [
            { icon: 'fa-graduation-cap', label: 'Módulos' },
            { icon: 'fa-folder-open', label: 'Plantillas' },
            { icon: 'fa-chalkboard', label: 'E-learning' }
        ],
        cta: 'Inscribirme',
        ctaLink: '/contactanos',
        price: 'Consultar'
    }
];

const ServiciosEducacion = () => {
    return <ServiciosCarousel items={items} />;
};

export default ServiciosEducacion;
