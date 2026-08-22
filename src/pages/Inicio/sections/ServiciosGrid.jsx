import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FondoTech from '../../../components/fondos/FondoTech';

const WHATSAPP_URL = 'https://wa.me/59161320004';

const modules = [
    {
        id: 'cursos-robotica',
        name: 'Cursos de Robótica',
        icon: 'fa-graduation-cap',
        img: '/img/07_Servicios/03_icono-cursos-robotica.png',
        category: 'Educación',
        categoryGroup: 'educacion',
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
        id: 'cursos-virtuales',
        name: 'Cursos Virtuales',
        icon: 'fa-laptop',
        img: '/img/07_Servicios/02_icono-aulas-virtuales-lms.png',
        category: 'Educación Online',
        categoryGroup: 'educacion',
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
        id: 'herramientas-didacticas-robotica',
        name: 'Herramientas Didácticas',
        icon: 'fa-robot',
        img: '/img/07_Servicios/04_icono-herramientas-didacticas.png',
        category: 'Robótica Educativa',
        categoryGroup: 'educacion',
        pillLabel: 'RECURSOS PRO',
        shortDesc: 'Kits de robótica, guías y recursos pedagógicos ideales para el aprendizaje continuo de tecnología.',
        stats: [
            { icon: 'fa-puzzle-piece', label: 'Kits', value: 'Didácticos' },
            { icon: 'fa-book-open-reader', label: 'Guías', value: 'Prácticas' },
            { icon: 'fa-house-chimney', label: 'Uso', value: 'Casa/Aula' }
        ],
        includes: [
            { icon: 'fa-puzzle-piece', label: 'Kits' },
            { icon: 'fa-book-open', label: 'Guías' },
            { icon: 'fa-video', label: 'Videos' }
        ],
        cta: 'Explorar',
        ctaLink: '/catalogo',
        price: 'Catálogo'
    },
    {
        id: 'asesoria-proyectos',
        name: 'Asesoría en Proyectos',
        icon: 'fa-chalkboard-user',
        img: '/img/07_Servicios/01_icono-asesoria-proyectos.png',
        category: 'Mentoría',
        categoryGroup: 'educacion',
        pillLabel: 'ACOMPAÑAMIENTO',
        shortDesc: 'Apoyo y preparación técnica en proyectos científicos, ferias de ciencias y olimpiadas de robótica.',
        stats: [
            { icon: 'fa-trophy', label: 'Olimpiadas', value: 'Preparación' },
            { icon: 'fa-lightbulb', label: 'Proyectos', value: 'Medida' },
            { icon: 'fa-chalkboard-user', label: 'Mentoría', value: '1 a 1' }
        ],
        includes: [
            { icon: 'fa-clipboard-list', label: 'Plan' },
            { icon: 'fa-box-open', label: 'Material' },
            { icon: 'fa-headset', label: 'Soporte' }
        ],
        cta: 'Asesoría',
        ctaLink: '/contactanos',
        price: 'Cotizar'
    },
    {
        id: 'software-medida',
        name: 'Software a Medida',
        icon: 'fa-laptop-code',
        img: '/img/07_Servicios/07_icono-software-medida.png',
        category: 'Desarrollo',
        categoryGroup: 'desarrollo',
        pillLabel: 'PROYECTO CORPORATIVO',
        shortDesc: 'Diseño y desarrollo de aplicaciones móviles y plataformas web de alta escala optimizadas para tu negocio.',
        stats: [
            { icon: 'fa-mobile-screen', label: 'Apps', value: 'iOS/Android' },
            { icon: 'fa-globe', label: 'Web', value: 'Cloud' },
            { icon: 'fa-headset', label: 'Soporte', value: '1 año' }
        ],
        includes: [
            { icon: 'fa-pen-nib', label: 'UX / UI' },
            { icon: 'fa-code', label: 'Código' },
            { icon: 'fa-server', label: 'Hosting' }
        ],
        cta: 'Cotizar',
        ctaLink: '/soluciones/soluciones-a-medida',
        price: 'Presupuesto'
    },
    {
        id: 'soporte-software',
        name: 'Soporte y Mantenimiento',
        icon: 'fa-screwdriver-wrench',
        img: '/img/07_Servicios/08_icono-soporte-mantenimiento.png',
        category: 'Soporte',
        categoryGroup: 'desarrollo',
        pillLabel: 'MANTENIMIENTO PRO',
        shortDesc: 'Soporte preventivo y correctivo de bases de datos, APIs y sistemas de software en producción.',
        stats: [
            { icon: 'fa-server', label: 'Monitoreo', value: '24 / 7' },
            { icon: 'fa-shield-halved', label: 'Seguridad', value: 'Backup' },
            { icon: 'fa-screwdriver-wrench', label: 'Estado', value: 'Proactivo' }
        ],
        includes: [
            { icon: 'fa-cloud-arrow-up', label: 'Backup' },
            { icon: 'fa-rotate', label: 'Updates' },
            { icon: 'fa-file-lines', label: 'Reportes' }
        ],
        cta: 'Contratar',
        ctaLink: '/soluciones/soporte-actualizacion',
        price: 'Mensual'
    },
    {
        id: 'libros',
        name: 'Libros Escolares',
        icon: 'fa-book-open',
        img: '/img/07_Servicios/05_icono-libros-escolares.png',
        category: 'Editorial',
        categoryGroup: 'editorial',
        pillLabel: 'TEXTOS OFICIALES',
        shortDesc: 'Venta de material educativo oficial para primaria y secundaria alineado a la currícula escolar.',
        stats: [
            { icon: 'fa-book', label: 'Áreas', value: 'Todas' },
            { icon: 'fa-graduation-cap', label: 'Niveles', value: 'P / S' },
            { icon: 'fa-truck', label: 'Envío', value: 'Nacional' }
        ],
        includes: [
            { icon: 'fa-chalkboard-user', label: 'Guías' },
            { icon: 'fa-file-pdf', label: 'PDF' },
            { icon: 'fa-video', label: 'Videos' }
        ],
        cta: 'Ver catálogo',
        ctaLink: '/libros-thb',
        price: 'Desde 45 Bs'
    },
    {
        id: 'mentorias-tech',
        name: 'Mentorías Tecnológicas',
        icon: 'fa-user-tie',
        img: '/img/07_Servicios/06_icono-mentorias-tecnologicas.png',
        category: 'Orientación',
        categoryGroup: 'editorial',
        pillLabel: 'SESIÓN PERSONAL',
        shortDesc: 'Mentorías y clases individuales sobre programación avanzada, estructuración de bases de datos y robótica.',
        stats: [
            { icon: 'fa-user-tie', label: 'Tutoría', value: '1 a 1' },
            { icon: 'fa-code', label: 'Áreas', value: 'Fullstack' },
            { icon: 'fa-briefcase', label: 'Enfoque', value: 'Proyectos' }
        ],
        includes: [
            { icon: 'fa-map', label: 'Plan' },
            { icon: 'fa-folder-open', label: 'Recursos' },
            { icon: 'fa-network-wired', label: 'Networking' }
        ],
        cta: 'Agendar',
        ctaLink: '/contactanos',
        price: 'Consultar'
    }
];

const CATEGORIES = [
    { id: 'educacion', label: 'EDUCACIÓN Y ROBÓTICA' },
    { id: 'desarrollo', label: 'DESARROLLO DE SOFTWARE' },
    { id: 'editorial', label: 'MENTORÍAS Y EDITORIAL' }
];

const ServiciosGrid = () => {
    const [activeCategory, setActiveCategory] = useState('educacion');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [visibleCards, setVisibleCards] = useState(3);
    const containerRef = useRef(null);

    const filteredModules = modules.filter(m => m.categoryGroup === activeCategory);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width < 640) {
                setVisibleCards(1);
            } else if (width < 1024) {
                setVisibleCards(2);
            } else {
                setVisibleCards(3);
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handlePrev = () => {
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => Math.min(prev + 1, filteredModules.length - visibleCards));
    };

    const canPrev = currentIndex > 0;
    const canNext = currentIndex < (filteredModules.length - visibleCards);

    return (
        <section id="serviciosit" className="py-20 relative overflow-hidden bg-[#050505] border-t border-white/5">
            <FondoTech hideWaves={true} />

            <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-8 relative z-10 text-white">
                
                {/* Badge Superior */}
                <div className="flex justify-center mb-4">
                    <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#A3E635]/10 border border-[#A3E635]/30 text-[10px] font-black uppercase tracking-[0.2em] text-[#A3E635]">
                        NUESTROS SERVICIOS
                    </span>
                </div>

                {/* Título y Subtítulo estilo Hero */}
                <div className="text-center mb-10 max-w-3xl mx-auto">
                    <h2 className="text-4xl lg:text-5xl font-black text-white mb-6 leading-tight">
                        Soluciones que{' '}
                        <span className="relative inline-block px-2 text-[#A3E635]">
                            impulsan tu futuro
                            <svg className="absolute w-full h-3 -bottom-1 left-0 z-[-1] text-[#A3E635]/60 opacity-80" viewBox="0 0 200 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.00025 6.99997C25.7509 4.50435 65.2536 2.07897 197.994 4.4151" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </span>
                    </h2>
                    <p className="text-base sm:text-lg text-slate-400 font-medium leading-relaxed">
                        Formamos líderes en tecnología mediante programas educativos de alto nivel y servicios profesionales de desarrollo de software para empresas y emprendedores.
                    </p>
                </div>

                {/* Categorías (Tabs) */}
                <div className="flex flex-wrap items-center justify-center gap-3 mb-14">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => {
                                setActiveCategory(cat.id);
                                setCurrentIndex(0);
                            }}
                            className={`px-6 py-3 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                                activeCategory === cat.id
                                    ? 'bg-[#A3E635] text-[#0A0A0A] shadow-[0_4px_15px_rgba(163,230,53,0.3)] scale-105'
                                    : 'bg-[#111827]/70 text-slate-400 border border-white/5 hover:bg-[#1f2937] hover:text-white'
                            }`}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>

                {/* Contenedor del Carrusel */}
                <div className="relative w-full px-2 sm:px-12">
                    
                    {/* Botones de navegación del Carrusel */}
                    {filteredModules.length > visibleCards && (
                        <>
                            <button
                                onClick={handlePrev}
                                disabled={!canPrev}
                                className={`absolute left-0 top-1/2 -translate-y-1/2 w-11 h-11 rounded-2xl bg-black/80 border border-white/10 flex items-center justify-center text-white transition-all z-20 cursor-pointer ${
                                    canPrev ? 'hover:scale-105 hover:bg-[#A3E635] hover:text-[#0A0A0A] hover:border-transparent opacity-100' : 'opacity-30 cursor-not-allowed'
                                }`}
                                aria-label="Anterior"
                            >
                                <i className="fa-solid fa-chevron-left text-xs"></i>
                            </button>
                            <button
                                onClick={handleNext}
                                disabled={!canNext}
                                className={`absolute right-0 top-1/2 -translate-y-1/2 w-11 h-11 rounded-2xl bg-black/80 border border-white/10 flex items-center justify-center text-white transition-all z-20 cursor-pointer ${
                                    canNext ? 'hover:scale-105 hover:bg-[#A3E635] hover:text-[#0A0A0A] hover:border-transparent opacity-100' : 'opacity-30 cursor-not-allowed'
                                }`}
                                aria-label="Siguiente"
                            >
                                <i className="fa-solid fa-chevron-right text-xs"></i>
                            </button>
                        </>
                    )}

                    {/* Ventana de visualización */}
                    <div className="overflow-hidden py-4 w-full">
                        <div
                            ref={containerRef}
                            className="flex gap-6 transition-transform duration-500 ease-out"
                            style={{
                                transform: `translateX(-${currentIndex * (100 / visibleCards + 1.2)}%)`
                            }}
                        >
                            {filteredModules.map((module) => (
                                <div
                                    key={module.id}
                                    style={{
                                        width: `calc(${100 / visibleCards}% - ${(16 * (visibleCards - 1)) / visibleCards}px)`
                                    }}
                                    className="flex-shrink-0"
                                >
                                    <div className="group relative bg-[#111111] border border-white/10 rounded-[2.2rem] shadow-2xl hover:shadow-[0_15px_40px_rgba(163,230,53,0.12)] hover:border-[#A3E635]/40 transition-all duration-500 transform hover:-translate-y-2 overflow-hidden flex flex-col h-full ring-0 hover:ring-4 hover:ring-[#A3E635]/10">
                                        
                                        {/* Línea decorativa superior */}
                                        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#A3E635] via-[#84CC16] to-[#A3E635] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 z-50"></div>

                                        {/* Imagen de Cabecera (Crop redondeado) */}
                                        <div className="relative h-48 sm:h-52 w-full overflow-hidden rounded-t-[2.2rem] border-b border-white/5 bg-[#050505]">
                                            <img
                                                src={module.img}
                                                alt={module.name}
                                                loading="lazy"
                                                decoding="async"
                                                className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent opacity-80"></div>

                                            {/* Badge Categoría */}
                                            <div className="absolute top-4 left-4 z-20">
                                                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#A3E635] text-[#0A0A0A] text-[9px] font-black uppercase tracking-widest shadow-md">
                                                    {module.category}
                                                </span>
                                            </div>

                                            {/* Badge Estado */}
                                            <div className="absolute top-4 right-4 z-20">
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[9px] font-black uppercase tracking-widest text-white shadow-sm">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                                                    Activo
                                                </span>
                                            </div>
                                        </div>

                                        {/* Cuerpo */}
                                        <div className="p-5 flex-1 flex flex-col relative bg-[#111111]">
                                            
                                            {/* Icono flotante */}
                                            <div className="absolute -top-6 left-6 w-11 h-11 rounded-2xl bg-[#A3E635] shadow-xl shadow-black/30 flex items-center justify-center border-4 border-[#111111] ring-2 ring-[#A3E635]/40 z-30 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                                                <i className={`fa-solid ${module.icon} text-lg text-[#0A0A0A] drop-shadow-sm`}></i>
                                            </div>

                                            {/* Pill de Info */}
                                            <div className="mb-2.5 mt-2 flex justify-start">
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#A3E635]/10 text-[#A3E635] border border-[#A3E635]/20 text-[9px] font-black uppercase tracking-[0.14em]">
                                                    {module.pillLabel}
                                                </span>
                                            </div>

                                            {/* Título de Servicio */}
                                            <div className="mb-2">
                                                <h3 className="text-lg font-black text-white group-hover:text-[#A3E635] transition-colors leading-tight">
                                                    {module.name}
                                                </h3>
                                                <div className="w-12 h-[2px] bg-[#A3E635] rounded-full mt-2.5"></div>
                                            </div>

                                            {/* Descripción corta */}
                                            <p className="text-xs text-slate-400 leading-relaxed mb-4 min-h-[3rem] font-medium">
                                                {module.shortDesc}
                                            </p>

                                            {/* Ficha técnica con 3 características */}
                                            <div className="grid grid-cols-3 gap-1 py-2.5 border-y border-white/5 mb-4 text-center bg-white/[0.02] rounded-2xl">
                                                {module.stats.map((stat, idx) => (
                                                    <div key={idx} className={`flex flex-col items-center gap-1 ${idx === 1 ? 'border-x border-white/5' : ''}`}>
                                                        <div className="w-6 h-6 rounded-full bg-[#A3E635]/10 text-[#A3E635] flex items-center justify-center text-[10px]">
                                                            <i className={`fa-solid ${stat.icon}`}></i>
                                                        </div>
                                                        <div className="text-[7px] text-slate-500 font-black uppercase tracking-wider leading-tight">{stat.label}</div>
                                                        <div className="text-[9px] font-black text-white mt-0.5 leading-tight">{stat.value}</div>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Incluye (Badges/Pills) */}
                                            <div className="mb-4">
                                                <div className="flex items-center gap-1.5 flex-wrap">
                                                    {module.includes.map((item, idx) => (
                                                        <span key={idx} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#151515] text-[9px] font-bold text-slate-300 border border-white/5">
                                                            <i className="fa-solid fa-check text-[#A3E635] text-[8px]"></i>
                                                            <i className={`fa-solid ${item.icon} text-white text-[9px]`}></i>
                                                            {item.label}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Fila inferior de Precio & CTAs */}
                                            <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between gap-3">
                                                <div className="flex flex-col">
                                                    <span className="text-[7.5px] text-slate-500 font-black uppercase tracking-widest leading-none">PRECIO</span>
                                                    <span className="text-xs font-black text-white mt-0.5 leading-none">{module.price}</span>
                                                </div>

                                                <div className="flex items-center gap-2">
                                                    {/* WhatsApp CTA */}
                                                    <a
                                                        href={`${WHATSAPP_URL}?text=${encodeURIComponent(`Hola, quiero información sobre el servicio: ${module.name}`)}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="bg-[#25D366] hover:bg-[#22C55E] text-white flex items-center justify-center gap-1.5 p-2 rounded-xl text-[9px] font-black uppercase tracking-wider transition-colors cursor-pointer"
                                                        title="Contactar por WhatsApp"
                                                    >
                                                        <i className="fab fa-whatsapp text-[13px]"></i>
                                                        WhatsApp
                                                    </a>
                                                    {/* Detalles CTA */}
                                                    <Link
                                                        to={module.ctaLink}
                                                        className="bg-white hover:bg-white/90 text-[#0A0A0A] flex items-center justify-center gap-1.5 p-2 rounded-xl text-[9px] font-black uppercase tracking-wider transition-all hover:-translate-y-0.5 shadow-[0_4px_10px_rgba(255,255,255,0.1)] hover:shadow-[0_6px_15px_rgba(255,255,255,0.2)] cursor-pointer"
                                                    >
                                                        {module.cta}
                                                        <i className="fa-solid fa-arrow-right text-[9px]"></i>
                                                    </Link>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Indicadores de Puntos en la parte inferior */}
                    {filteredModules.length > visibleCards && (
                        <div className="flex justify-center items-center gap-2 mt-6">
                            {Array.from({ length: filteredModules.length - visibleCards + 1 }).map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentIndex(idx)}
                                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                                        currentIndex === idx
                                            ? 'w-7 bg-[#A3E635]'
                                            : 'w-2 bg-neutral-800 hover:bg-neutral-700'
                                    }`}
                                    aria-label={`Ir al slide ${idx + 1}`}
                                />
                            ))}
                        </div>
                    )}

                </div>

            </div>
        </section>
    );
};

export default ServiciosGrid;
