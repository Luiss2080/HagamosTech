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

                    {/* Right Column - Static representative visual */}
                    <div className="lg:col-span-6 relative w-full flex items-center justify-center mt-8 lg:mt-0">
                        <div className="relative w-full max-w-md">
                            <div className="absolute inset-0 bg-[#A3E635]/10 blur-3xl rounded-[2rem]"></div>

                            <div className="relative rounded-[2rem] bg-[#0A0A0A] border border-[#A3E635]/30 p-5 shadow-[0_0_50px_rgba(163,230,53,0.15)]">
                                {/* Window bar */}
                                <div className="flex items-center gap-2 mb-5">
                                    <span className="w-3 h-3 rounded-full bg-[#A3E635]/70"></span>
                                    <span className="w-3 h-3 rounded-full bg-white/20"></span>
                                    <span className="w-3 h-3 rounded-full bg-white/20"></span>
                                    <span className="ml-3 text-[11px] font-bold text-white/40 tracking-wide">hagamostech · soluciones</span>
                                </div>

                                {/* Content grid */}
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="rounded-xl bg-white/[0.04] border border-white/10 p-4 flex flex-col gap-2">
                                        <i className="fas fa-microchip text-[#A3E635] text-xl"></i>
                                        <span className="text-white text-sm font-black">Tecnología</span>
                                        <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden"><div className="h-full w-3/4 bg-[#A3E635] rounded-full"></div></div>
                                    </div>
                                    <div className="rounded-xl bg-white/[0.04] border border-white/10 p-4 flex flex-col gap-2">
                                        <i className="fas fa-graduation-cap text-[#A3E635] text-xl"></i>
                                        <span className="text-white text-sm font-black">Academia</span>
                                        <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden"><div className="h-full w-2/3 bg-[#A3E635] rounded-full"></div></div>
                                    </div>
                                    <div className="rounded-xl bg-white/[0.04] border border-white/10 p-4 flex flex-col gap-2">
                                        <i className="fas fa-store text-[#A3E635] text-xl"></i>
                                        <span className="text-white text-sm font-black">Negocios</span>
                                        <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden"><div className="h-full w-1/2 bg-[#A3E635] rounded-full"></div></div>
                                    </div>
                                    <div className="rounded-xl bg-white/[0.04] border border-white/10 p-4 flex flex-col gap-2">
                                        <i className="fas fa-lightbulb text-[#A3E635] text-xl"></i>
                                        <span className="text-white text-sm font-black">A medida</span>
                                        <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden"><div className="h-full w-5/6 bg-[#A3E635] rounded-full"></div></div>
                                    </div>
                                </div>

                                {/* Chart row */}
                                <div className="mt-4 rounded-xl bg-white/[0.04] border border-white/10 p-4 flex items-end gap-3 h-24">
                                    <div className="w-1/5 bg-[#A3E635]/30 rounded-t-md h-1/3"></div>
                                    <div className="w-1/5 bg-[#A3E635]/50 rounded-t-md h-1/2"></div>
                                    <div className="w-1/5 bg-[#A3E635]/70 rounded-t-md h-2/3"></div>
                                    <div className="w-1/5 bg-[#A3E635]/90 rounded-t-md h-5/6"></div>
                                    <div className="w-1/5 bg-[#A3E635] rounded-t-md h-full"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default HeroHagamosTech;
