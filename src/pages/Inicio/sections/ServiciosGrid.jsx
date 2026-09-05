import React, { useState } from 'react';
import FondoTech from '../../../components/fondos/FondoTech';
import ServiciosCarousel from './components/ServiciosCarousel';
import { CATEGORIES, SERVICIOS_DATA } from '../../../data/serviciosData';

const ServiciosGrid = () => {
    const [activeCategory, setActiveCategory] = useState('estudiantes');

    const renderActiveCarousel = () => {
        const items = SERVICIOS_DATA[activeCategory] || [];
        return <ServiciosCarousel items={items} key={activeCategory} />;
    };

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
                        Ofrecemos soluciones digitales integrales, desarrollo de software a medida y soporte especializado 24/7 para empresas, emprendedores, estudiantes y profesionales.
                    </p>
                </div>

                {/* Categorías (Tabs) */}
                <div className="flex flex-wrap items-center justify-center gap-3 mb-14">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
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

                {/* Renderizado dinámico del carrusel por categoría */}
                <div className="relative w-full">
                    {renderActiveCarousel()}
                </div>

            </div>
        </section>
    );
};

export default ServiciosGrid;
