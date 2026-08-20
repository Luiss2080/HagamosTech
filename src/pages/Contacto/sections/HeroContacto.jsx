import React from 'react';
import PageHero from '../../../components/func/MigasPan';
import FondoTech from '../../../components/fondos/FondoTech';

const HeroContacto = () => {
    return (
        <div className="relative z-10">
            <FondoTech />
            <PageHero
                title="Contanos qué"
                highlight="necesitás."
                description="No hace falta que sepas de tecnología. Explicanos tu idea, problema o necesidad y nosotros encontramos la mejor forma de resolverla. Esta sección te brinda asistencia directa para consultas, proyectos y soporte."
            >
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
            </PageHero>
        </div>
    );
};

export default HeroContacto;
