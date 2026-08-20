import React from 'react';
import PageHero from '../../../components/func/MigasPan';
import CircuitBackground from '../../../components/fondos/FondoSaltenas';

const HeroContacto = () => {
    return (
        <div className="relative z-10">
            <CircuitBackground />
            <PageHero
                title="Estamos aquí para"
                highlight="atenderte."
                description="En Los Castores te ofrecemos las mejores salteñas con el verdadero sabor tradicional. Esta sección te brinda asistencia directa para pedidos, reservas y atención al cliente."
            >
                <div className="flex flex-wrap justify-center gap-4">
                    {[
                        { label: 'Ubicacion', icon: 'fa-location-dot' },
                        { label: 'Menú', icon: 'fa-utensils' },
                        { label: 'Consultas', icon: 'fa-message' },
                        { label: 'Contacto', icon: 'fa-phone-volume' }
                    ].map((item, i) => (
                        <div key={i} className="group px-6 py-3 rounded-full border border-[#FF4D00]/20 bg-[#FF4D00] text-white font-black text-[11px] uppercase tracking-[0.15em] transition-all shadow-lg shadow-orange-500/20 hover:bg-[#CC3D00] hover:-translate-y-0.5 hover:shadow-orange-500/35 flex items-center gap-2 cursor-pointer">
                            <i className={`fas ${item.icon} text-white text-[11px]`}></i>
                            {item.label}
                            <i className="fas fa-chevron-right text-[10px] text-white transition-colors group-hover:translate-x-0.5"></i>
                        </div>
                    ))}
                </div>
            </PageHero>
        </div>
    );
};

export default HeroContacto;
