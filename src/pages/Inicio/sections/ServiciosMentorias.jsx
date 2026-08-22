import React from 'react';
import ServiciosCarousel from './components/ServiciosCarousel';

const items = [
    {
        id: 'mentorias-backend',
        name: 'Mentorías Backend',
        icon: 'fa-server',
        img: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=600&auto=format&fit=crop&q=60',
        category: 'Mentoría',
        pillLabel: 'CÓDIGO DE SERVIDOR',
        shortDesc: 'Aprende a diseñar arquitecturas escalables, APIs RESTful seguras y lógica compleja con Node.js, Python o Go.',
        stats: [
            { icon: 'fa-server', label: 'Stack', value: 'Backend' },
            { icon: 'fa-clock', label: 'Horario', value: 'Flexible' },
            { icon: 'fa-graduation-cap', label: 'Método', value: 'Práctico' }
        ],
        includes: [
            { icon: 'fa-code', label: 'Código Limpio' },
            { icon: 'fa-database', label: 'Modelado BD' },
            { icon: 'fa-shield', label: 'Seguridad' }
        ],
        cta: 'Agendar',
        ctaLink: '/contactanos',
        price: 'Consultar'
    },
    {
        id: 'mentorias-frontend',
        name: 'Mentorías Frontend',
        icon: 'fa-desktop',
        img: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600&auto=format&fit=crop&q=60',
        category: 'Mentoría',
        pillLabel: 'DISEÑO E INTERFAZ',
        shortDesc: 'Domina React, Vue, TypeScript y CSS moderno para construir interfaces de usuario nítidas, responsivas y veloces.',
        stats: [
            { icon: 'fa-code', label: 'Framework', value: 'React / Vue' },
            { icon: 'fa-mobile-screen', label: 'Enfoque', value: 'Responsivo' },
            { icon: 'fa-user-check', label: 'Feedback', value: 'Directo' }
        ],
        includes: [
            { icon: 'fa-desktop', label: 'Componentes' },
            { icon: 'fa-file-code', label: 'Estructura' },
            { icon: 'fa-fire', label: 'Vite / Tailwind' }
        ],
        cta: 'Agendar',
        ctaLink: '/contactanos',
        price: 'Consultar'
    },
    {
        id: 'asesoria-proyectos-grado',
        name: 'Proyectos de Grado',
        icon: 'fa-book-open',
        img: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&auto=format&fit=crop&q=60',
        category: 'Académico',
        pillLabel: 'TITULACIÓN PRO',
        shortDesc: 'Orientación metodológica y desarrollo del componente práctico tecnológico para defensas de grado de ingeniería.',
        stats: [
            { icon: 'fa-graduation-cap', label: 'Meta', value: 'Tesis / Grado' },
            { icon: 'fa-laptop-code', label: 'Parte', value: 'Técnica' },
            { icon: 'fa-circle-check', label: 'Estado', value: 'Aprobado' }
        ],
        includes: [
            { icon: 'fa-diagram-project', label: 'Arquitectura' },
            { icon: 'fa-folder-open', label: 'Entregables' },
            { icon: 'fa-chalkboard-user', label: 'Simulacros' }
        ],
        cta: 'Asesoría',
        ctaLink: '/contactanos',
        price: 'Cotizar'
    },
    {
        id: 'orientacion-carrera-ti',
        name: 'Orientación de Carrera',
        icon: 'fa-user-tie',
        img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&auto=format&fit=crop&q=60',
        category: 'Carrera TI',
        pillLabel: 'HOJA DE RUTA',
        shortDesc: 'Evaluación de habilidades y diseño de un plan de estudio guiado para insertarte en el mercado laboral tecnológico.',
        stats: [
            { icon: 'fa-map', label: 'Plan', value: 'Roadmaps' },
            { icon: 'fa-briefcase', label: 'Mercado', value: 'Nac / Int' },
            { icon: 'fa-lightbulb', label: 'Foco', value: 'Inserción' }
        ],
        includes: [
            { icon: 'fa-briefcase', label: 'CV / Portfolio' },
            { icon: 'fa-linkedin', label: 'Linkedin Setup' },
            { icon: 'fa-compass', label: 'Guía Continua' }
        ],
        cta: 'Agendar',
        ctaLink: '/contactanos',
        price: 'Consultar'
    },
    {
        id: 'preparacion-entrevistas',
        name: 'Entrevistas Técnicas',
        icon: 'fa-comments',
        img: 'https://images.unsplash.com/photo-1521791136364-728680d064be?w=600&auto=format&fit=crop&q=60',
        category: 'Carrera',
        pillLabel: 'LIVE CODING',
        shortDesc: 'Simulacros de entrevistas técnicas, desafíos de algoritmos (LeetCode) y retroalimentación para postulaciones.',
        stats: [
            { icon: 'fa-comments', label: 'Tipo', value: 'Simulacro' },
            { icon: 'fa-stopwatch', label: 'Tiempo', value: 'Foco' },
            { icon: 'fa-chalkboard-user', label: 'Tutor', value: 'Senior' }
        ],
        includes: [
            { icon: 'fa-code-branch', label: 'Git / Github' },
            { icon: 'fa-lightbulb', label: 'Algoritmos' },
            { icon: 'fa-clipboard-check', label: 'Feedback' }
        ],
        cta: 'Agendar',
        ctaLink: '/contactanos',
        price: 'Consultar'
    },
    {
        id: 'arquitectura-software-mentoria',
        name: 'Arquitectura de Software',
        icon: 'fa-network-wired',
        img: 'https://images.unsplash.com/photo-1606857521015-7f9fcf423740?w=600&auto=format&fit=crop&q=60',
        category: 'Mentoría',
        pillLabel: 'DISEÑO DE SISTEMAS',
        shortDesc: 'Aprende a diseñar sistemas con microservicios, bases de datos distribuidas y patrones de diseño modernos.',
        stats: [
            { icon: 'fa-network-wired', label: 'Patrón', value: 'Microservicios' },
            { icon: 'fa-shield', label: 'Enfoque', value: 'Escalabilidad' },
            { icon: 'fa-users', label: 'Destino', value: 'Enterprise' }
        ],
        includes: [
            { icon: 'fa-sitemap', label: 'Diagramas' },
            { icon: 'fa-folder-closed', label: 'Patrones' },
            { icon: 'fa-file-shield', label: 'Seguridad' }
        ],
        cta: 'Agendar',
        ctaLink: '/contactanos',
        price: 'Consultar'
    }
];

const ServiciosMentorias = () => {
    return <ServiciosCarousel items={items} />;
};

export default ServiciosMentorias;
