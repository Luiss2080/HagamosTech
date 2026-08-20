import React from 'react';
import { useNavigate } from 'react-router-dom';
import useModalStore from '../../../store/useModalStore';
import FondoTech from '../../../components/fondos/FondoTech';

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

                        <h1
                            className="uppercase text-[2.4rem] leading-[1.02] sm:text-5xl md:text-5xl lg:text-6xl xl:text-[3.8rem] font-black font-heading text-white tracking-normal"
                            style={{ transform: 'scaleX(1.06)', transformOrigin: 'left center', WebkitTextStrokeWidth: '1.4px', WebkitTextStrokeColor: 'currentColor' }}
                        >
                            <span className="block">¿Idea, problema</span>
                            <span className="block">o necesidad?</span>
                            <span className="relative inline-block text-[#A3E635] drop-shadow-[0_0_25px_rgba(163,230,53,0.45)]">
                                Hagámoslo.
                                <svg
                                    className="absolute w-full h-3 -bottom-1.5 left-0 z-[-1] text-[#A3E635] drop-shadow-[0_0_10px_rgba(163,230,53,0.55)]"
                                    viewBox="0 0 220 12" preserveAspectRatio="none"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                ><path d="M8,8 C22,5 40,7.5 60,7.5 C150,7.5 185,7.5 208,7.5 C214,7.5 218,6 216,7.5"
                                    stroke="currentColor"
                                    strokeWidth="7"
                                    strokeLinecap="round"
                                />
                                </svg>
                            </span>
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

                    {/* Right Column - Visual tech hub */}
                    <div className="lg:col-span-6 relative w-full flex items-center justify-center mt-8 lg:mt-0">
                        <div className="relative w-full max-w-sm aspect-square">
                            <div className="absolute inset-0 bg-[#A3E635]/10 blur-3xl rounded-full"></div>

                            {/* Connection lines */}
                            <svg className="absolute inset-0 w-full h-full opacity-70" viewBox="0 0 100 100" preserveAspectRatio="none">
                                <line x1="50" y1="50" x2="50" y2="9" stroke="#A3E635" strokeWidth="0.5" strokeOpacity="0.35" />
                                <line x1="50" y1="50" x2="91" y2="50" stroke="#A3E635" strokeWidth="0.5" strokeOpacity="0.35" />
                                <line x1="50" y1="50" x2="50" y2="91" stroke="#A3E635" strokeWidth="0.5" strokeOpacity="0.35" />
                                <line x1="50" y1="50" x2="9" y2="50" stroke="#A3E635" strokeWidth="0.5" strokeOpacity="0.35" />
                            </svg>

                            {/* Center hub */}
                            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-[#0A0A0A] border-2 border-[#A3E635]/60 flex items-center justify-center text-[#A3E635] text-3xl shadow-[0_0_45px_rgba(163,230,53,0.45)] animate-pulse-glow">
                                <i className="fas fa-bolt"></i>
                            </div>

                            {/* Nodes */}
                            <div className="absolute left-1/2 top-[3%] -translate-x-1/2 w-16 h-16 rounded-2xl bg-[#0A0A0A] border border-[#A3E635]/40 flex items-center justify-center text-[#A3E635] text-xl shadow-[0_0_25px_rgba(163,230,53,0.25)] animate-float-slow">
                                <i className="fas fa-microchip"></i>
                            </div>
                            <div className="absolute right-[3%] top-1/2 -translate-y-1/2 w-16 h-16 rounded-2xl bg-[#0A0A0A] border border-[#A3E635]/40 flex items-center justify-center text-[#A3E635] text-xl shadow-[0_0_25px_rgba(163,230,53,0.25)] animate-float-medium" style={{ animationDelay: '0.8s' }}>
                                <i className="fas fa-graduation-cap"></i>
                            </div>
                            <div className="absolute left-1/2 bottom-[3%] -translate-x-1/2 w-16 h-16 rounded-2xl bg-[#0A0A0A] border border-[#A3E635]/40 flex items-center justify-center text-[#A3E635] text-xl shadow-[0_0_25px_rgba(163,230,53,0.25)] animate-float-slow" style={{ animationDelay: '1.4s' }}>
                                <i className="fas fa-store"></i>
                            </div>
                            <div className="absolute left-[3%] top-1/2 -translate-y-1/2 w-16 h-16 rounded-2xl bg-[#0A0A0A] border border-[#A3E635]/40 flex items-center justify-center text-[#A3E635] text-xl shadow-[0_0_25px_rgba(163,230,53,0.25)] animate-float-medium" style={{ animationDelay: '0.4s' }}>
                                <i className="fas fa-lightbulb"></i>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default HeroHagamosTech;
