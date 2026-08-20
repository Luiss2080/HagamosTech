import React from 'react';
import HeroSaltenas from './sections/HeroSaltenas';
import QueHacemos from './sections/QueHacemos';
import FlujoTrabajo from './sections/FlujoTrabajo';
import useModalStore from '../../store/useModalStore';

const Inicio = () => {
    const openModal = useModalStore((state) => state.openModal);

    return (
        <div id="app" className="relative overflow-hidden">
            <HeroSaltenas />
            <QueHacemos />
            <FlujoTrabajo />

            {/* CTA final */}
            <section className="relative bg-white py-20 lg:py-28">
                <div className="container mx-auto px-6 lg:px-12 xl:px-16 max-w-[1100px]">
                    <div className="relative overflow-hidden rounded-[2.5rem] bg-[#0A0A0A] border border-[#A3E635]/25 px-8 py-14 lg:px-16 text-center">
                        <div className="absolute top-[-30%] left-1/2 -translate-x-1/2 w-[420px] h-[420px] bg-[#A3E635]/10 rounded-full blur-[90px] pointer-events-none"></div>
                        <span className="relative inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#A3E635]/10 border border-[#A3E635]/30 text-[#A3E635] text-[11px] font-black uppercase tracking-[0.18em] mb-6">
                            <i className="fas fa-rocket"></i> HagamosTech
                        </span>
                        <h2 className="relative text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-white leading-tight max-w-3xl mx-auto">
                            “No necesitás saber qué solución tecnológica necesitás. Solo contanos qué problema tenés.”
                        </h2>
                        <p className="relative text-white/60 mt-5 text-base sm:text-lg font-medium max-w-2xl mx-auto">
                            Somos tu puerta de entrada a las soluciones digitales. Llegás con un problema y nos encargamos de encontrar el camino.
                        </p>
                        <div className="relative mt-9 flex flex-col sm:flex-row gap-4 items-center justify-center">
                            <button
                                onClick={() => openModal('contactModal')}
                                className="group flex items-center justify-center gap-3 w-full sm:w-auto h-12 px-7 bg-[#A3E635] hover:bg-[#84CC16] text-[#0A0A0A] rounded-full shadow-lg shadow-[#A3E635]/25 hover:shadow-[#A3E635]/40 hover:-translate-y-0.5 transition-all duration-300 text-[11px] font-black uppercase tracking-[0.14em] cursor-pointer whitespace-nowrap"
                            >
                                <i className="fas fa-comment-dots text-[14px]"></i>
                                <span>Contanos qué necesitás</span>
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Inicio;
