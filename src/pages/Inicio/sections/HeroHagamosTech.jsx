import React from 'react';
import { useNavigate } from 'react-router-dom';
import useModalStore from '../../../store/useModalStore';
import FondoTech from '../../../components/fondos/FondoTech';

const HERO_CARDS = [
    { id: 'tecnologia', icon: 'fa-microchip', title: 'Tecnología', desc: 'Desarrollo, sistemas, automatización e IA.' },
    { id: 'academia', icon: 'fa-graduation-cap', title: 'Academia', desc: 'Proyectos, simulaciones y recursos educativos.' },
    { id: 'negocios', icon: 'fa-store', title: 'Negocios', desc: 'Digitalización, páginas web y automatización.' },
    { id: 'personalizado', icon: 'fa-lightbulb', title: 'Soluciones a medida', desc: '¿No sabés qué necesitás? Contanos el problema.' },
];

const HeroHagamosTech = () => {
    const navigate = useNavigate();
    const openModal = useModalStore((state) => state.openModal);

    return (
        <section
            className="relative overflow-hidden pt-28 sm:pt-32 pb-16 lg:pb-24 bg-[#0A0A0A] border-b border-[#A3E635]/15"
            id="home"
        >
            <FondoTech />

            <div className="container mx-auto px-6 lg:px-12 xl:px-16 relative z-10 max-w-[1440px] w-full">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

                    {/* Left Column - Message */}
                    <div className="lg:col-span-6 flex flex-col gap-7 text-center lg:text-left items-center lg:items-start justify-center animate-fade-in-up">

                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#A3E635]/10 border border-[#A3E635]/30 text-[#A3E635] text-[11px] font-black uppercase tracking-[0.18em]">
                            <i className="fas fa-bolt"></i> Soluciones digitales y tecnológicas
                        </span>

                        <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-[3.7rem] font-black font-heading text-white leading-[1.12] tracking-tight">
                            <span className="block">¿Tenés una idea, un</span>
                            <span className="block">problema o una</span>
                            <span className="relative inline-block text-[#A3E635]">
                                necesidad?
                                <svg
                                    className="absolute w-full h-3 -bottom-1.5 left-0 z-[-1] text-[#A3E635] drop-shadow-[0_0_10px_rgba(163,230,53,0.55)]"
                                    viewBox="0 0 200 12" preserveAspectRatio="none"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                ><path d="M8,8 C22,5 38,7.5 55,7.5 C130,7.5 165,7.5 188,7.5 C194,7.5 198,6 196,7.5"
                                    stroke="currentColor"
                                    strokeWidth="7"
                                    strokeLinecap="round"
                                />
                                </svg>
                            </span>
                            <span className="block text-white">Hagámoslo.</span>
                        </h1>

                        <p className="text-white/70 font-medium max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
                            Soluciones <strong className="text-white">tecnológicas</strong>, <strong className="text-white">digitales</strong> y <strong className="text-white">académicas</strong> para <strong className="text-white">cualquier tipo de cliente</strong> y <strong className="text-white">cualquier necesidad</strong>. No necesitás saber qué tecnología usar: contanos qué querés lograr.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 mt-2 w-full sm:w-auto items-center justify-center lg:justify-start">
                            <button
                                onClick={() => openModal('contactModal')}
                                className="group flex items-center justify-center gap-3 w-full sm:w-[260px] h-12 px-6 bg-[#A3E635] hover:bg-[#84CC16] text-[#0A0A0A] rounded-full shadow-lg shadow-[#A3E635]/25 hover:shadow-[#A3E635]/40 hover:-translate-y-0.5 transition-all duration-300 text-[11px] font-black uppercase tracking-[0.14em] cursor-pointer whitespace-nowrap"
                            >
                                <i className="fas fa-comment-dots text-[14px] flex-shrink-0"></i>
                                <span>Contanos qué necesitás</span>
                            </button>

                            <button
                                onClick={() => {
                                    const el = document.getElementById('flujo');
                                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                    else { navigate('/'); setTimeout(() => document.getElementById('flujo')?.scrollIntoView({ behavior: 'smooth' }), 120); }
                                }}
                                className="group flex items-center justify-center gap-3 w-full sm:w-[210px] h-12 px-6 bg-transparent hover:bg-white/5 text-white font-black text-[11px] uppercase tracking-[0.14em] rounded-full border border-white/20 hover:border-[#A3E635]/50 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer whitespace-nowrap"
                            >
                                <i className="fas fa-diagram-project text-[13px] flex-shrink-0 text-[#A3E635]"></i>
                                <span>Cómo trabajamos</span>
                            </button>
                        </div>

                        <div className="flex items-center gap-3 pt-2 opacity-85">
                            <div className="flex -space-x-1.5">
                                <div className="w-5.5 h-5.5 rounded-full bg-[#0A0A0A] border border-[#A3E635]/40 flex items-center justify-center text-[9px] text-[#A3E635] shadow-sm">
                                    <i className="fas fa-star"></i>
                                </div>
                                <div className="w-5.5 h-5.5 rounded-full bg-[#0A0A0A] border border-[#A3E635]/40 flex items-center justify-center text-[9px] text-[#A3E635] shadow-sm">
                                    <i className="fas fa-lightbulb"></i>
                                </div>
                                <div className="w-5.5 h-5.5 rounded-full bg-[#0A0A0A] border border-[#A3E635]/40 flex items-center justify-center text-[9px] text-[#A3E635] shadow-sm">
                                    <i className="fas fa-check"></i>
                                </div>
                            </div>
                            <span className="text-[9px] font-black text-white/60 uppercase tracking-widest leading-none">
                                Convertimos necesidades en soluciones reales
                            </span>
                        </div>
                    </div>

                    {/* Right Column - Solution cards grid */}
                    <div className="lg:col-span-6 relative w-full flex items-center justify-center mt-8 lg:mt-0">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-xl">
                            {HERO_CARDS.map((card, i) => (
                                <div
                                    key={card.id}
                                    id={card.id}
                                    className="group relative rounded-3xl p-6 bg-white/[0.03] border border-white/10 hover:border-[#A3E635]/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(163,230,53,0.12)] backdrop-blur-sm"
                                    style={{ animationDelay: `${i * 0.1}s` }}
                                >
                                    <div className="w-12 h-12 rounded-2xl bg-[#A3E635]/10 border border-[#A3E635]/20 flex items-center justify-center text-[#A3E635] text-lg mb-4 transition-colors group-hover:bg-[#A3E635] group-hover:text-[#0A0A0A]">
                                        <i className={`fas ${card.icon}`}></i>
                                    </div>
                                    <h3 className="text-white font-black text-lg mb-1.5">{card.title}</h3>
                                    <p className="text-white/60 text-sm font-medium leading-snug">{card.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default HeroHagamosTech;
