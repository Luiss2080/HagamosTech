import React from 'react';

const CATEGORIES = [
    {
        id: 'tecnologia',
        icon: 'fa-microchip',
        label: 'Tecnología',
        title: 'Soluciones tecnológicas',
        desc: 'Desarrollo y creación de soluciones digitales para personas, emprendimientos y empresas.',
        items: [
            'Desarrollo de páginas web',
            'Sistemas web y aplicaciones',
            'Automatización de procesos',
            'Integración de herramientas digitales',
            'Soluciones con inteligencia artificial',
            'Bases de datos y gestión',
            'Soporte y orientación tecnológica',
        ],
    },
    {
        id: 'academia',
        icon: 'fa-graduation-cap',
        label: 'Academia',
        title: 'Soluciones académicas',
        desc: 'Orientadas a estudiantes, docentes e instituciones educativas.',
        items: [
            'Desarrollo de proyectos académicos',
            'Simuladores educativos',
            'Presentaciones interactivas',
            'Diagramas y recursos digitales',
            'Proyectos de programación y redes',
            'Documentación técnica',
            'Herramientas y materiales educativos',
        ],
    },
    {
        id: 'negocios',
        icon: 'fa-store',
        label: 'Negocios',
        title: 'Soluciones para emprendimientos y negocios',
        desc: 'Ayudamos a los negocios a digitalizarse, aunque no sepan por dónde empezar.',
        items: [
            'Páginas web y catálogos digitales',
            'Sistemas de pedidos y formularios',
            'Gestión de clientes y automatización',
            'Presencia digital y redes sociales',
            'Identidad visual y landing pages',
            'Herramientas de gestión',
            'Integraciones con servicios digitales',
        ],
    },
    {
        id: 'personalizado',
        icon: 'fa-lightbulb',
        label: 'Soluciones personalizadas',
        title: 'Soluciones personalizadas',
        desc: 'No todo problema entra en una categoría. Trabajamos desde tu necesidad real.',
        items: [
            'Necesidad → Análisis',
            'Propuesta → Desarrollo',
            'Entrega con acompañamiento',
            'Sin saber tecnología de antemano',
            'Adaptado a tu contexto',
            'Cercano y humano',
        ],
    },
];

const QueHacemos = () => {
    return (
        <section id="que-hacemos" className="relative bg-white py-20 lg:py-28">
            <div className="container mx-auto px-6 lg:px-12 xl:px-16 max-w-[1280px]">
                <div className="text-center max-w-3xl mx-auto mb-14">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#A3E635]/10 border border-[#A3E635]/30 text-[#84CC16] text-[11px] font-black uppercase tracking-[0.18em] mb-5">
                        <i className="fas fa-layer-group"></i> ¿Qué hacemos?
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-[#0A0A0A] leading-tight">
                        Partimos de tu necesidad, <span className="text-[#84CC16]">no de un catálogo rígido</span>
                    </h2>
                    <p className="section-description mt-5 text-slate-600">
                        Contanos qué querés lograr. Nosotros analizamos y encontramos la mejor forma de hacerlo realidad con tecnología, creatividad y conocimiento.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {CATEGORIES.map((cat) => (
                        <div
                            key={cat.id}
                            id={cat.id}
                            className="group relative rounded-3xl p-8 bg-[#0A0A0A] border border-[#0A0A0A]/5 hover:border-[#A3E635]/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(163,230,53,0.12)] scroll-mt-28"
                        >
                            <div className="flex items-start gap-5">
                                <div className="w-14 h-14 rounded-2xl bg-[#A3E635]/10 border border-[#A3E635]/25 flex items-center justify-center text-[#A3E635] text-xl shrink-0 transition-colors group-hover:bg-[#A3E635] group-hover:text-[#0A0A0A]">
                                    <i className={`fas ${cat.icon}`}></i>
                                </div>
                                <div className="flex-1">
                                    <span className="text-[11px] font-black uppercase tracking-[0.18em] text-[#84CC16]">{cat.label}</span>
                                    <h3 className="text-white font-black text-xl lg:text-2xl mt-1 leading-tight">{cat.title}</h3>
                                    <p className="text-white/55 text-sm font-medium leading-relaxed mt-2">{cat.desc}</p>
                                </div>
                            </div>

                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 mt-6">
                                {cat.items.map((item, i) => (
                                    <li key={i} className="flex items-start gap-2.5 text-white/70 text-[13px] font-medium">
                                        <i className="fas fa-circle-check text-[#A3E635] text-[13px] mt-0.5 shrink-0"></i>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default QueHacemos;
