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
                        Atendemos a <strong>todo tipo de cliente</strong> —estudiantes, emprendedores, pequeños negocios, empresas o personas particulares— para resolver <strong>cualquier necesidad digital o tecnológica</strong>. Contanos qué querés lograr y nosotros analizamos y encontramos la mejor forma de hacerlo realidad.
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

const STEPS = [
    {
        num: '01',
        icon: 'fa-comment-dots',
        title: 'Contanos',
        desc: 'Explicás tu necesidad, problema o idea. No hace falta saber de tecnología.',
    },
    {
        num: '02',
        icon: 'fa-magnifying-glass',
        title: 'Analizamos',
        desc: 'Estudiamos qué necesita realmente tu proyecto y definimos el camino.',
    },
    {
        num: '03',
        icon: 'fa-lightbulb',
        title: 'Proponemos',
        desc: 'Planteamos una solución clara: alcance, propuesta y metodología de trabajo.',
    },
    {
        num: '04',
        icon: 'fa-screwdriver-wrench',
        title: 'Hacemos',
        desc: 'Desarrollamos y construimos la solución paso a paso, con vos.',
    },
    {
        num: '05',
        icon: 'fa-circle-check',
        title: 'Entregamos',
        desc: 'Recibís el resultado y las indicaciones necesarias para usarlo.',
    },
];

const FlujoTrabajo = () => {
    return (
        <section id="flujo" className="relative bg-[#0A0A0A] py-20 lg:py-28 border-y border-[#A3E635]/15 scroll-mt-24">
            <div className="container mx-auto px-6 lg:px-12 xl:px-16 max-w-[1280px]">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#A3E635]/10 border border-[#A3E635]/30 text-[#A3E635] text-[11px] font-black uppercase tracking-[0.18em] mb-5">
                        <i className="fas fa-diagram-project"></i> Cómo trabajamos
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-white leading-tight">
                        De tu problema a la <span className="text-[#A3E635]">solución real</span>
                    </h2>
                    <p className="text-white/60 mt-5 text-base sm:text-lg font-medium leading-relaxed">
                        Trabajamos en cinco pasos sencillos. “Hagamos” es una invitación: vos tenés la necesidad, la hacemos juntos.
                    </p>
                </div>

                <div className="relative">
                    <div className="hidden lg:block absolute top-[44px] left-[8%] right-[8%] h-[2px] bg-gradient-to-r from-[#A3E635]/10 via-[#A3E635]/40 to-[#A3E635]/10"></div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                        {STEPS.map((step) => (
                            <div key={step.num} className="relative flex flex-col items-center text-center group">
                                <div className="relative z-10 w-[88px] h-[88px] rounded-full bg-[#0A0A0A] border-2 border-[#A3E635]/40 flex items-center justify-center mb-5 transition-all duration-300 group-hover:border-[#A3E635] group-hover:bg-[#A3E635] group-hover:scale-105">
                                    <span className="absolute -top-3 -left-2 text-[11px] font-black text-[#A3E635] bg-[#0A0A0A] border border-[#A3E635]/40 rounded-full px-2 py-0.5 group-hover:text-[#0A0A0A] group-hover:bg-[#A3E635] transition-colors">
                                        {step.num}
                                    </span>
                                    <i className={`fas ${step.icon} text-2xl text-[#A3E635] group-hover:text-[#0A0A0A] transition-colors`}></i>
                                </div>
                                <h3 className="text-white font-black text-lg mb-2">{step.title}</h3>
                                <p className="text-white/55 text-sm font-medium leading-snug max-w-[200px]">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export { QueHacemos, FlujoTrabajo };
export default QueHacemos;
