import React from 'react';
import { Link } from 'react-router-dom';
import CircuitBackground from '../../../components/fondos/FondoParticulas';

const ServiciosGrid = () => {
    const modules = [
        {
            id: 'cursos-robotica',
            name: 'Cursos de Robótica',
            icon: 'fa-graduation-cap',
            img: '/img/07_Servicios/03_icono-cursos-robotica.png',
            category: 'Educación',
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
            ctaLink: '/cursos/presenciales'
        },
        {
            id: 'libros',
            name: 'Libros Escolares',
            icon: 'fa-book-open',
            img: '/img/07_Servicios/05_icono-libros-escolares.png',
            category: 'Editorial',
            shortDesc: 'Material educativo oficial para primaria y secundaria en todas las áreas de estudio.',
            stats: [
                { icon: 'fa-book', label: 'Áreas', value: 'Todas' },
                { icon: 'fa-graduation-cap', label: 'Niveles', value: 'P / S' },
                { icon: 'fa-truck', label: 'Envío', value: 'Nacional' }
            ],
            includes: [
                { icon: 'fa-chalkboard-user', label: 'Guía docente' },
                { icon: 'fa-file-pdf', label: 'PDF' },
                { icon: 'fa-video', label: 'Videos' }
            ],
            cta: 'Ver catálogo',
            ctaLink: '/libros-thb'
        },
        {
            id: 'software-medida',
            name: 'Software a Medida',
            icon: 'fa-laptop-code',
            img: '/img/07_Servicios/07_icono-software-medida.png',
            category: 'Desarrollo',
            shortDesc: 'Aplicaciones móviles y plataformas web escalables adaptadas a tu negocio.',
            stats: [
                { icon: 'fa-mobile-screen', label: 'Apps', value: 'iOS / Android' },
                { icon: 'fa-globe', label: 'Web', value: 'Cloud' },
                { icon: 'fa-headset', label: 'Soporte', value: '1 año' }
            ],
            includes: [
                { icon: 'fa-pen-nib', label: 'UX / UI' },
                { icon: 'fa-code', label: 'Código' },
                { icon: 'fa-server', label: 'Hosting' }
            ],
            cta: 'Cotizar',
            ctaLink: '/soluciones/soluciones-a-medida'
        },
        {
            id: 'asesoria-proyectos',
            name: 'Asesoría en Proyectos',
            icon: 'fa-chalkboard-user',
            img: '/img/07_Servicios/01_icono-asesoria-proyectos.png',
            category: 'Mentoría',
            shortDesc: 'Acompañamiento en proyectos científicos, ferias de ciencias y olimpiadas de robótica.',
            stats: [
                { icon: 'fa-trophy', label: 'Olimpiadas', value: 'Preparación' },
                { icon: 'fa-lightbulb', label: 'Proyectos', value: 'Personalizados' },
                { icon: 'fa-chalkboard-user', label: 'Mentoría', value: '1 a 1' }
            ],
            includes: [
                { icon: 'fa-clipboard-list', label: 'Plan' },
                { icon: 'fa-box-open', label: 'Material' },
                { icon: 'fa-headset', label: 'Soporte' }
            ],
            cta: 'Asesoría',
            ctaLink: '/contactanos'
        },
        {
            id: 'cursos-virtuales',
            name: 'Cursos Virtuales',
            icon: 'fa-laptop',
            img: '/img/07_Servicios/02_icono-aulas-virtuales-lms.png',
            category: 'Educación Online',
            shortDesc: 'Cursos virtuales de robótica y programación para estudiantes y docentes, con acceso desde cualquier lugar.',
            stats: [
                { icon: 'fa-laptop', label: 'Modalidad', value: '100% Online' },
                { icon: 'fa-users-rectangle', label: 'Niveles', value: 'Básico a Avanzado' },
                { icon: 'fa-clock', label: 'Horarios', value: 'Flexibles' }
            ],
            includes: [
                { icon: 'fa-graduation-cap', label: 'Cursos' },
                { icon: 'fa-file-certificate', label: 'Certificado' },
                { icon: 'fa-headset', label: 'Soporte' }
            ],
            cta: 'Inscribirme',
            ctaLink: '/cursos/online'
        },
        {
            id: 'soporte-software',
            name: 'Soporte y Mantenimiento',
            icon: 'fa-screwdriver-wrench',
            img: '/img/07_Servicios/08_icono-soporte-mantenimiento.png',
            category: 'Soporte',
            shortDesc: 'Mantenimiento preventivo y correctivo para plataformas, bases de datos y apps.',
            stats: [
                { icon: 'fa-server', label: 'Monitoreo', value: '24 / 7' },
                { icon: 'fa-shield-halved', label: 'Seguridad', value: 'Backup' },
                { icon: 'fa-screwdriver-wrench', label: 'Mantenimiento', value: 'Proactivo' }
            ],
            includes: [
                { icon: 'fa-cloud-arrow-up', label: 'Backup' },
                { icon: 'fa-rotate', label: 'Updates' },
                { icon: 'fa-file-lines', label: 'Reportes' }
            ],
            cta: 'Contratar',
            ctaLink: '/soluciones/soporte-actualizacion'
        },
        {
            id: 'mentorias-tech',
            name: 'Mentorías Tecnológicas',
            icon: 'fa-user-tie',
            img: '/img/07_Servicios/06_icono-mentorias-tecnologicas.png',
            category: 'Orientación',
            shortDesc: 'Sesiones individuales de mentoría en programación, circuitos y productos tech.',
            stats: [
                { icon: 'fa-user-tie', label: 'Mentoría', value: '1 a 1' },
                { icon: 'fa-code', label: 'Áreas', value: 'Tech' },
                { icon: 'fa-briefcase', label: 'Portafolio', value: 'Profesional' }
            ],
            includes: [
                { icon: 'fa-map', label: 'Plan' },
                { icon: 'fa-folder-open', label: 'Recursos' },
                { icon: 'fa-network-wired', label: 'Networking' }
            ],
            cta: 'Agendar',
            ctaLink: '/contactanos'
        },
        {
            id: 'herramientas-didacticas-robotica',
            name: 'Herramientas Didácticas',
            icon: 'fa-robot',
            img: '/img/07_Servicios/04_icono-herramientas-didacticas.png',
            category: 'Robótica Educativa',
            shortDesc: 'Kits, guías y recursos pedagógicos para aprendizaje continuo de robótica.',
            stats: [
                { icon: 'fa-puzzle-piece', label: 'Kits', value: 'Didácticos' },
                { icon: 'fa-book-open-reader', label: 'Guías', value: 'Prácticas' },
                { icon: 'fa-house-chimney', label: 'Uso', value: 'Casa / Aula' }
            ],
            includes: [
                { icon: 'fa-puzzle-piece', label: 'Kits' },
                { icon: 'fa-book-open', label: 'Guías' },
                { icon: 'fa-video', label: 'Videos' }
            ],
            cta: 'Explorar',
            ctaLink: '/catalogo'
        },
    ];

    return (
        <section id="serviciosit" className="py-8 relative overflow-visible">
            <div className="pointer-events-none absolute top-0 right-0 w-[600px] h-[600px] bg-lime-100/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
            <div className="pointer-events-none absolute bottom-10 left-0 w-[320px] h-[320px] bg-gray-100/40 rounded-full blur-3xl -translate-x-1/4"></div>

            <CircuitBackground />

            <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-8 relative z-10">
                <div className="text-center mb-4 max-w-3xl mx-auto">
                    <h2 className="text-3xl lg:text-4xl font-black text-[#111827] dark:text-white mb-6 leading-tight">
                        Soluciones que{' '}
                        <span className="relative inline-block px-2 text-[#A3E635] dark:text-lime-400">
                            impulsan tu futuro
                            <svg className="absolute w-full h-3 -bottom-1 left-0 z-[-1] text-[#84CC16] dark:text-[#A3E635]/60 opacity-80" viewBox="0 0 200 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.00025 6.99997C25.7509 4.50435 65.2536 2.07897 197.994 4.4151" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </span>
                    </h2>
                    <p className="text-lg text-gray-500 dark:text-slate-400 font-medium leading-relaxed">
                        Formamos líderes en tecnología mediante programas educativos de alto nivel y servicios profesionales de desarrollo de software para empresas y emprendedores.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-20">
                    {modules.map((module) => (
                        <Link
                            to={module.ctaLink}
                            key={module.id}
                            className="group relative bg-white dark:bg-[#0a0a0a] rounded-[2rem] shadow-lg shadow-gray-200/50 dark:shadow-black/50 hover:shadow-2xl hover:shadow-lime-950/15 transition-all duration-500 transform hover:-translate-y-2 overflow-hidden flex flex-col h-full border-2 border-[#bef264] dark:border-[#A3E635]/20 hover:border-[#84CC16] dark:hover:border-lime-500 ring-0 hover:ring-4 hover:ring-[#A3E635]/10"
                        >
                            {/* Línea decorativa superior */}
                            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#A3E635] via-[#84CC16] to-[#A3E635] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 z-50"></div>

                            {/* Header con imagen */}
                            <div className="relative h-48 sm:h-56 overflow-hidden bg-slate-950 rounded-t-[2rem] border-b border-[#bef264] dark:border-[#A3E635]/15">
                                <img
                                    src={module.img}
                                    alt={module.name}
                                    loading="lazy"
                                    decoding="async"
                                    className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#0a0a0a] via-white/30 dark:via-[#0a0a0a]/40 to-transparent"></div>

                                {/* Badge categoría */}
                                <div className="absolute top-3 left-3 z-20">
                                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#A3E635] text-white text-[9px] font-black uppercase tracking-widest shadow-md">
                                        {module.category}
                                    </span>
                                </div>

                                {/* Badge estado */}
                                <div className="absolute top-3 right-3 z-20">
                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-[9px] font-black uppercase tracking-widest text-white shadow-sm">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                                        Activo
                                    </span>
                                </div>
                            </div>

                            {/* Cuerpo */}
                            <div className="p-4 pt-4 flex-1 flex flex-col relative bg-gradient-to-b from-white dark:from-[#0a0a0a] via-[#fff5f5]/30 dark:via-[#0a0a0a] to-[#fef2f2]/40 dark:to-[#0a0a0a] rounded-b-[2rem]">

                                {/* Icono flotante */}
                                <div className="absolute -top-5 left-5 w-10 h-10 rounded-2xl bg-[#84CC16] dark:bg-[#A3E635] shadow-xl shadow-gray-900/20 flex items-center justify-center border-4 border-white dark:border-[#0a0a0a] ring-2 ring-[#84CC16]/40 dark:ring-[#A3E635]/40 z-30 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                                    <i className={`fa-solid ${module.icon} text-base text-[#111827] dark:text-white drop-shadow-sm`}></i>
                                </div>

                                {/* Punto parpadeante */}
                                <div className="absolute top-3 right-4 flex items-center gap-1">
                                    <span className="flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-[#84CC16] dark:bg-lime-500 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#84CC16] dark:bg-lime-500"></span>
                                    </span>
                                </div>

                                {/* Tech Home */}
                                <div className="mb-1 flex justify-center">
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#A3E635] text-white border border-white dark:border-white/10 shadow-sm text-[9px] font-black uppercase tracking-[0.14em]">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#84CC16] dark:bg-lime-400"></span>
                                        Tech Home
                                    </span>
                                </div>

                                {/* Título con decoración */}
                                <div className="relative flex flex-col items-center mb-0.5">
                                    <h3 className="text-sm sm:text-base font-black text-[#111827] dark:text-white group-hover:text-[#A3E635] dark:group-hover:text-lime-400 transition-colors leading-tight text-center px-1">
                                        {module.name}
                                    </h3>
                                    <div className="w-16 h-[2px] bg-[#A3E635]/70 dark:bg-lime-500/70 rounded-full relative mt-1 mb-0.5">
                                        <div className="absolute -top-[3px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-[#84CC16] rotate-45 border border-white dark:border-[#0a0a0a]"></div>
                                    </div>
                                </div>

                                {/* Descripción corta */}
                                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-1.5 text-center px-1 font-medium">
                                    {module.shortDesc}
                                </p>

                                {/* Ficha técnica */}
                                <div className="grid grid-cols-3 gap-1 py-1 border-y border-lime-100 dark:border-[#A3E635]/15 mb-1.5 text-center bg-lime-50/20 dark:bg-neutral-900/10 rounded-xl">
                                    {module.stats.map((stat, idx) => (
                                        <div key={idx} className={`flex flex-col items-center gap-1 ${idx === 1 ? 'border-x border-lime-100 dark:border-[#A3E635]/15' : ''}`}>
                                            <div className="w-6 h-6 rounded-full bg-[#A3E635]/10 text-[#A3E635] dark:bg-lime-500/15 dark:text-lime-400 flex items-center justify-center text-[10px]">
                                                <i className={`fa-solid ${stat.icon}`}></i>
                                            </div>
                                            <div className="text-[7px] text-slate-400 font-black uppercase tracking-wider leading-tight">{stat.label}</div>
                                            <div className="text-[10px] font-black text-neutral-800 dark:text-neutral-200 leading-tight">{stat.value}</div>
                                        </div>
                                    ))}
                                </div>

                                {/* Incluye */}
                                <div className="mb-1.5 px-1">
                                    <div className="text-[8px] font-black uppercase tracking-widest text-slate-400 mb-0.5 text-center">Incluye</div>
                                    <div className="flex items-center justify-center gap-1.5 flex-wrap">
                                        {module.includes.map((item, idx) => (
                                            <span key={idx} className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-neutral-200 dark:bg-neutral-800 text-[9px] font-bold text-neutral-800 dark:text-neutral-200 border border-neutral-300 dark:border-neutral-700">
                                                <i className="fa-solid fa-check text-[#A3E635] text-[8px]"></i>
                                                <i className={`fa-solid ${item.icon} text-[#111827] dark:text-white text-[9px]`}></i>
                                                {item.label}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* CTA */}
                                <div className="mt-auto pt-4 pb-2 px-1">
                                    <span className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#84CC16] group-hover:bg-[#A3E635] text-[#111827] group-hover:text-white rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider transition-all shadow-md shadow-lime-900/10">
                                        <i className={`fa-solid ${module.icon}`}></i>
                                        {module.cta}
                                        <i className="fa-solid fa-arrow-right text-[11px] group-hover:translate-x-0.5 transition-transform"></i>
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServiciosGrid;
