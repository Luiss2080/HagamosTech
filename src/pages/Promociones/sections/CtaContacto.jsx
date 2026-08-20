import React from 'react';
import CircuitBackground from '../../../components/fondos/FondoSaltenas';

const CtaContacto = () => {
    return (
        <div className="relative">
            <section id="contacto" className="relative z-10 py-12">
                <CircuitBackground />
                <div className="container mx-auto px-6 max-w-7xl relative z-20">
                    <div className="bg-gradient-to-br from-[#FF4D00] via-[#CC3D00] to-[#8B4513] rounded-[2.5rem] p-8 sm:p-12 text-center shadow-2xl shadow-orange-500/25 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-white/40 via-amber-300 to-white/40"></div>
                        <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-[60px] pointer-events-none animate-float-slow"></div>
                        <div className="absolute bottom-0 left-0 w-72 h-72 bg-black/10 rounded-full blur-[60px] pointer-events-none animate-float-medium"></div>
                        <div className="absolute -top-8 -left-8 w-40 h-40 rounded-full bg-white/10 blur-2xl pointer-events-none"></div>

                        <div className="relative z-10">
                            <div className="w-16 h-16 rounded-full bg-white/15 border border-white/25 flex items-center justify-center mx-auto mb-4 shadow-xl animate-bounce-slow">
                                <i className="fas fa-fire text-2xl text-amber-300"></i>
                            </div>

                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-white px-4 py-1.5 text-[10px] font-black tracking-[0.2em] uppercase border border-white/25 backdrop-blur-sm mb-3">
                                <i className="fas fa-bolt mr-1.5 text-amber-300"></i> Aprovechá hoy
                            </span>

                            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black font-heading text-white mb-4 leading-[1.05] tracking-tight drop-shadow-lg">
                                TU SABOR FAVORITO <br />
                                <span className="relative inline-block text-amber-300">
                                    EN PROMOCIÓN.
                                    <svg className="absolute w-full h-3 -bottom-1.5 left-0 z-[-1] text-amber-300/60 drop-shadow-[0_0_8px_rgba(245,158,11,0.4)]" viewBox="0 0 200 12" preserveAspectRatio="none" fill="none"><path d="M8,8 C22,5 38,7.5 55,7.5 C130,7.5 165,7.5 188,7.5 C194,7.5 198,6 196,7.5" stroke="currentColor" strokeWidth="7" strokeLinecap="round"/></svg>
                                </span>
                            </h2>

                            <p className="text-white/90 text-base sm:text-lg md:text-xl mb-8 max-w-2xl mx-auto font-semibold leading-relaxed">
                                Combos, membresías y ofertas por mayor con la mejor calidad de Santa Cruz. Llamanos, escribinos o pedí tu delivery.
                            </p>

                            <div className="flex flex-wrap justify-center gap-3">
                                <a href="https://wa.me/59161320004" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 px-8 py-4 bg-[#25D366] hover:bg-[#1DA851] text-white rounded-full font-black text-xs uppercase tracking-[0.15em] shadow-xl hover:shadow-2xl hover:-translate-y-1 active:scale-95 transition-all duration-300">
                                    <i className="fab fa-whatsapp text-xl"></i> Pedir por WhatsApp
                                </a>
                                <a href="tel:+59161320004" className="inline-flex items-center gap-2.5 px-8 py-4 bg-white text-[#FF4D00] rounded-full font-black text-xs uppercase tracking-[0.15em] shadow-xl hover:shadow-2xl hover:-translate-y-1 active:scale-95 transition-all duration-300">
                                    <i className="fas fa-phone text-lg"></i> +591 61320004
                                </a>
                            </div>

                            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-white/70">
                                <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest"><i className="fas fa-bolt text-amber-300 text-lg"></i> Promos diarias</div>
                                <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest"><i className="fas fa-certificate text-amber-300 text-lg"></i> Calidad garantizada</div>
                                <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest"><i className="fas fa-shield-alt text-amber-300 text-lg"></i> Sabor desde 1989</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CtaContacto;
