import React from 'react';
import useModalStore from '../../../store/useModalStore';

const SERVICIOS = [
    {
        icon: 'fa-code',
        title: 'Desarrollo de Software',
        desc: 'Aplicaciones web y móviles a medida, sistemas e integraciones con APIs.',
    },
    {
        icon: 'fa-robot',
        title: 'Automatización e IA',
        desc: 'Automatizamos procesos repetitivos e incorporamos inteligencia artificial.',
    },
    {
        icon: 'fa-graduation-cap',
        title: 'Apoyo Académico',
        desc: 'Proyectos, simulaciones, tesis y recursos educativos tecnológicos.',
    },
    {
        icon: 'fa-store',
        title: 'Soluciones para Negocios',
        desc: 'Digitalización, e-commerce, gestión y presencia profesional online.',
    },
    {
        icon: 'fa-globe',
        title: 'Páginas Web',
        desc: 'Sitios modernos, rápidos y optimizados para convertir visitas en clientes.',
    },
    {
        icon: 'fa-lightbulb',
        title: 'Consultoría Digital',
        desc: 'Te ayudamos a descubrir la mejor solución sin saber por dónde empezar.',
    },
];

const ServiciosInicio = () => {
    const openModal = useModalStore((state) => state.openModal);

    return (
        <section className="relative bg-[#0A0A0A] py-20 lg:py-28 border-t border-white/5">
            <div className="container mx-auto px-6 lg:px-12 xl:px-16 max-w-[1200px]">
                <div className="text-center mb-14">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#A3E635]/10 border border-[#A3E635]/30 text-[#A3E635] text-[11px] font-black uppercase tracking-[0.18em] mb-5">
                        <i className="fas fa-layer-group"></i> Lo que hacemos
                    </span>
                    <h2 className="uppercase text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-white leading-[1.05] tracking-tight">
                        Nuestros <span className="text-[#A3E635]">servicios</span>
                    </h2>
                    <p className="text-white/60 mt-4 text-base sm:text-lg font-medium max-w-2xl mx-auto">
                        Partimos de tu necesidad para entregar la solución tecnológica correcta, sin importar el tamaño de tu proyecto.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {SERVICIOS.map((s, i) => (
                        <button
                            key={s.title}
                            onClick={() => openModal('contactModal')}
                            className="group relative text-left rounded-3xl p-7 bg-white/[0.03] border border-white/10 hover:border-[#A3E635]/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_35px_rgba(163,230,53,0.12)] backdrop-blur-sm"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-[#A3E635]/10 border border-[#A3E635]/20 flex items-center justify-center text-[#A3E635] text-xl mb-5 transition-colors group-hover:bg-[#A3E635] group-hover:text-[#0A0A0A]">
                                <i className={`fas ${s.icon}`}></i>
                            </div>
                            <h3 className="text-white font-black text-xl mb-2">{s.title}</h3>
                            <p className="text-white/60 text-sm font-medium leading-relaxed">{s.desc}</p>
                            <span className="mt-4 inline-flex items-center gap-2 text-[#A3E635] text-[12px] font-black uppercase tracking-wider">
                                Contratar
                                <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
                            </span>
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServiciosInicio;
