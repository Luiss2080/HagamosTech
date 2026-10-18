import React from 'react';
import FondoTech from '../../../components/fondos/FondoTech';

const HeroContacto = () => {
    return (
        <section
            className="relative overflow-hidden pt-28 sm:pt-32 pb-16 lg:pb-24 bg-[#0A0A0A] border-b border-[#A3E635]/15"
            id="contacto"
        >
            <FondoTech />

            <div className="container mx-auto px-6 lg:px-12 xl:px-16 relative z-10 max-w-5xl text-center flex flex-col items-center">

                {/* ---- Migas de pan en estilo tech (discreto) ---- */}
                <div className="flex items-center gap-2 mb-5">
                    <span className="inline-flex items-center px-4 py-1.5 rounded-full border border-[#A3E635]/45 bg-[#A3E635]/10 text-[9.5px] font-black uppercase tracking-widest text-[#A3E635] shadow-sm leading-none">
                        <i className="fa-solid fa-headset mr-1.5"></i> Contacto Oficial HAGAMOSTECH
                    </span>
                </div>

                <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-5xl xl:text-6xl font-black font-heading text-white leading-[1.15] tracking-tight mb-5 sm:mb-6">
                    Contanos qué{' '}
                    <span className="relative inline-block text-[#A3E635]">
                        necesitás.
                        <svg className="absolute w-full h-3 -bottom-1.5 left-0 z-[-1] text-[#A3E635] drop-shadow-[0_0_8px_rgba(163,230,53,0.55)]" viewBox="0 0 200 12" preserveAspectRatio="none" fill="none">
                            <path d="M8,8 C22,5 38,7.5 55,7.5 C130,7.5 165,7.5 188,7.5 C194,7.5 198,6 196,7.5" stroke="currentColor" strokeWidth="7" strokeLinecap="round"/>
                        </svg>
                    </span>
                </h1>

                <p className="text-white/70 font-medium max-w-2xl mx-auto text-base sm:text-lg leading-relaxed mb-8 sm:mb-10">
                    No hace falta que sepas de tecnología. Explicanos tu idea, problema o necesidad y nosotros encontramos la mejor forma de resolverla. Esta sección te brinda asistencia directa para consultas, proyectos y soporte.
                </p>

                {/* ---- Chips de categorías (misma estructura que antes) ---- */}
                <div className="flex flex-wrap justify-center gap-4">
                    {[
                        { label: 'Consultas', icon: 'fa-message' },
                        { label: 'Proyectos', icon: 'fa-diagram-project' },
                        { label: 'Soporte', icon: 'fa-headset' },
                        { label: 'Contacto', icon: 'fa-phone-volume' }
                    ].map((item, i) => (
                        <div key={i} className="group px-6 py-3 rounded-full border border-[#A3E635]/30 bg-[#A3E635]/10 text-[#A3E635] font-black text-[11px] uppercase tracking-[0.15em] transition-all shadow-lg shadow-[#A3E635]/10 hover:bg-[#A3E635] hover:text-[#0A0A0A] hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer">
                            <i className={`fas ${item.icon} text-[11px]`}></i>
                            {item.label}
                            <i className="fas fa-chevron-right text-[10px] transition-colors group-hover:translate-x-0.5"></i>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default HeroContacto;
