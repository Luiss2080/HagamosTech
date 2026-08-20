import React from 'react';

const NOVEDADES = [
    {
        tag: 'Producto',
        icon: 'fa-rocket',
        date: '12 Ago 2026',
        title: 'Lanzamos nuestra plataforma de automatización',
        desc: 'Centralizá tareas, conectá tus herramientas y dejá que la tecnología trabaje por vos.',
    },
    {
        tag: 'Comunidad',
        icon: 'fa-users',
        date: '28 Jul 2026',
        title: 'HagamosTech en el Congreso de Tecnología 2026',
        desc: 'Compartimos experiencias sobre digitalización para estudiantes y emprendedores.',
    },
    {
        tag: 'Tips',
        icon: 'fa-lightbulb',
        date: '15 Jul 2026',
        title: '5 formas de digitalizar tu negocio hoy',
        desc: 'Pequeños cambios con gran impacto: desde tu web hasta la atención al cliente.',
    },
];

const NovedadesInicio = () => {
    return (
        <section className="relative bg-white py-20 lg:py-28">
            <div className="container mx-auto px-6 lg:px-12 xl:px-16 max-w-[1200px]">
                <div className="text-center mb-14">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#A3E635]/10 border border-[#A3E635]/30 text-[#84CC16] text-[11px] font-black uppercase tracking-[0.18em] mb-5">
                        <i className="fas fa-newspaper"></i> Actualidad
                    </span>
                    <h2 className="uppercase text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-[#0A0A0A] leading-[1.05] tracking-tight">
                        Novedades y <span className="text-[#84CC16]">noticias</span>
                    </h2>
                    <p className="text-slate-500 mt-4 text-base sm:text-lg font-medium max-w-2xl mx-auto">
                        Lo último de HagamosTech: lanzamientos, eventos y consejos para aprovechar la tecnología.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {NOVEDADES.map((n) => (
                        <article
                            key={n.title}
                            className="group relative rounded-3xl overflow-hidden bg-white border border-slate-200 hover:border-[#A3E635]/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_35px_rgba(163,230,53,0.15)]"
                        >
                            <div className="h-36 bg-gradient-to-br from-[#0A0A0A] to-[#1a1a1a] relative flex items-center justify-center">
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(163,230,53,0.25),transparent_60%)]"></div>
                                <i className={`fas ${n.icon} text-[#A3E635] text-4xl relative`}></i>
                            </div>
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#A3E635]/10 text-[#84CC16] text-[10px] font-black uppercase tracking-wider">
                                        {n.tag}
                                    </span>
                                    <span className="text-[11px] font-bold text-slate-400">{n.date}</span>
                                </div>
                                <h3 className="text-[#0A0A0A] font-black text-lg leading-snug mb-2">{n.title}</h3>
                                <p className="text-slate-500 text-sm font-medium leading-relaxed">{n.desc}</p>
                                <span className="mt-4 inline-flex items-center gap-2 text-[#84CC16] text-[12px] font-black uppercase tracking-wider">
                                    Leer más
                                    <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
                                </span>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default NovedadesInicio;
