import React from 'react';
import ServiciosCarousel from './components/ServiciosCarousel';

const items = [
    {
        id: 'apps-web',
        name: 'Aplicaciones Web',
        icon: 'fa-globe',
        img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=60',
        category: 'Desarrollo',
        pillLabel: 'NUBE Y ESCALA',
        shortDesc: 'Construcción de portales web interactivos, e-commerce robustos y dashboards de administración a medida.',
        stats: [
            { icon: 'fa-server', label: 'Stack', value: 'MERN / PHP' },
            { icon: 'fa-gauge', label: 'Carga', value: 'Ultra Rápida' },
            { icon: 'fa-shield', label: 'Seguridad', value: 'SSL / Cloud' }
        ],
        includes: [
            { icon: 'fa-code', label: 'Código Limpio' },
            { icon: 'fa-chart-simple', label: 'SEO Básico' },
            { icon: 'fa-database', label: 'Base de Datos' }
        ],
        cta: 'Cotizar',
        ctaLink: '/soluciones/soluciones-a-medida',
        price: 'Presupuesto'
    },
    {
        id: 'apps-moviles',
        name: 'Desarrollo Móvil',
        icon: 'fa-mobile-screen',
        img: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&auto=format&fit=crop&q=60',
        category: 'Apps Móviles',
        pillLabel: 'IOS & ANDROID',
        shortDesc: 'Diseño y desarrollo de aplicaciones híbridas y nativas publicadas directamente en Google Play y App Store.',
        stats: [
            { icon: 'fa-mobile-retro', label: 'Framework', value: 'React Native' },
            { icon: 'fa-cloud', label: 'Servicios', value: 'Firebase/APIs' },
            { icon: 'fa-check-double', label: 'Publicación', value: 'Incluida' }
        ],
        includes: [
            { icon: 'fa-paint-roller', label: 'UI / UX' },
            { icon: 'fa-bell', label: 'Notificaciones' },
            { icon: 'fa-circle-play', label: 'Stores' }
        ],
        cta: 'Cotizar',
        ctaLink: '/soluciones/soluciones-a-medida',
        price: 'Consultar'
    },
    {
        id: 'integracion-ia',
        name: 'Integración de IA',
        icon: 'fa-brain',
        img: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?w=600&auto=format&fit=crop&q=60',
        category: 'Innovación',
        pillLabel: 'AUTOMATIZACIÓN',
        shortDesc: 'Implementación de modelos de procesamiento de lenguaje natural, bots automatizados e inteligencia artificial.',
        stats: [
            { icon: 'fa-robot', label: 'Motores', value: 'OpenAI / Gemini' },
            { icon: 'fa-comments', label: 'Flujo', value: 'Chatbots' },
            { icon: 'fa-key', label: 'Integración', value: 'APIs' }
        ],
        includes: [
            { icon: 'fa-network-wired', label: 'Lógica IA' },
            { icon: 'fa-clock', label: 'Respuestas' },
            { icon: 'fa-chart-pie', label: 'Analíticas' }
        ],
        cta: 'Cotizar',
        ctaLink: '/soluciones/soluciones-a-medida',
        price: 'Personalizado'
    },
    {
        id: 'mantenimiento-soporte',
        name: 'Soporte de Software',
        icon: 'fa-screwdriver-wrench',
        img: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?w=600&auto=format&fit=crop&q=60',
        category: 'Soporte',
        pillLabel: 'MANTENIMIENTO PRO',
        shortDesc: 'Mantenimiento preventivo, corrección de fallos y actualización de sistemas legados en producción.',
        stats: [
            { icon: 'fa-headset', label: 'Soporte', value: 'Preventivo' },
            { icon: 'fa-gauge-high', label: 'Monitoreo', value: '24 / 7' },
            { icon: 'fa-shield-halved', label: 'Backups', value: 'Periódicos' }
        ],
        includes: [
            { icon: 'fa-file-lines', label: 'Informes' },
            { icon: 'fa-rotate', label: 'Updates' },
            { icon: 'fa-user-shield', label: 'Seguridad' }
        ],
        cta: 'Contratar',
        ctaLink: '/soluciones/soporte-actualizacion',
        price: 'Mensual'
    },
    {
        id: 'optimizacion-bd',
        name: 'Optimización de BD',
        icon: 'fa-database',
        img: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=600&auto=format&fit=crop&q=60',
        category: 'Bases de Datos',
        pillLabel: 'ALTO RENDIMIENTO',
        shortDesc: 'Refactorización de consultas lentas, indexación y escalabilidad para bases de datos relacionales y NoSQL.',
        stats: [
            { icon: 'fa-database', label: 'Motor', value: 'MySQL / Mongo' },
            { icon: 'fa-clock-rotate-left', label: 'Latencia', value: 'Baja' },
            { icon: 'fa-server', label: 'Estructura', value: 'Consistente' }
        ],
        includes: [
            { icon: 'fa-diagram-project', label: 'Esquema BD' },
            { icon: 'fa-magnifying-glass', label: 'Auditoría' },
            { icon: 'fa-cloud-arrow-up', label: 'Copias Cloud' }
        ],
        cta: 'Cotizar',
        ctaLink: '/soluciones/soluciones-a-medida',
        price: 'Consultar'
    },
    {
        id: 'devops-cloud',
        name: 'DevOps & Cloud',
        icon: 'fa-cloud-arrow-up',
        img: 'https://images.unsplash.com/photo-1600132806608-231446b2e7af?w=600&auto=format&fit=crop&q=60',
        category: 'Infraestructura',
        pillLabel: 'DESPLIEGUE CLOUD',
        shortDesc: 'Configuración de servidores en AWS, Google Cloud y DigitalOcean con pipelines CI/CD automatizados.',
        stats: [
            { icon: 'fa-server', label: 'Nube', value: 'AWS / GCP' },
            { icon: 'fa-shuffle', label: 'CI / CD', value: 'Github Actions' },
            { icon: 'fa-box-open', label: 'Contenedores', value: 'Docker' }
        ],
        includes: [
            { icon: 'fa-globe', label: 'DNS Setup' },
            { icon: 'fa-lock', label: 'Certificados SSL' },
            { icon: 'fa-chart-line', label: 'Logs' }
        ],
        cta: 'Cotizar',
        ctaLink: '/soluciones/soluciones-a-medida',
        price: 'Presupuesto'
    }
];

const ServiciosDesarrollo = () => {
    return <ServiciosCarousel items={items} />;
};

export default ServiciosDesarrollo;
