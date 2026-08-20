import React from 'react';
import { Link } from 'react-router-dom';
import FondoTech from '../../../components/fondos/FondoTech';

const SOLUCIONES = [
    { icon: 'fa-microchip', label: 'Tecnología', color: 'bg-[#A3E635]' },
    { icon: 'fa-graduation-cap', label: 'Academia', color: 'bg-[#84CC16]' },
    { icon: 'fa-store', label: 'Negocios', color: 'bg-[#0A0A0A]' },
    { icon: 'fa-lightbulb', label: 'A medida', color: 'bg-[#171717]' },
];

const CtaCookies = () => {
    return (
        <div className="relative">
            <section className="relative z-10 py-10">
                <FondoTech />
                <div className="container mx-auto px-6 max-w-7xl relative z-20">
                    <div className="bg-gradient-to-br from-[#0A0A0A] via-[#171717] to-[#0A0A0A] rounded-[2.5rem] p-8 sm:p-10 text-center shadow-2xl shadow-black/30 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#A3E635] via-[#84CC16] to-[#A3E635]"></div>
                        <div className="absolute top-0 right-0 w-72 h-72 bg-[#A3E635]/15 rounded-full blur-[80px] pointer-events-none animate-float-slow"></div>
                        <div className="absolute bottom-0 left-0 w-72 h-72 bg-black/40 rounded-full blur-[80px] pointer-events-none animate-float-medium"></div>
                        <div className="absolute -top-8 -left-8 w-40 h-40 rounded-full bg-white/5 blur-2xl pointer-events-none"></div>

                        <div className="relative z-10">
                            <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mx-auto mb-4 shadow-xl animate-bounce-slow">
                                <i className="fas fa-cookie-bite text-2xl text-[#A3E635]"></i>
                            </div>

                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[9px] font-black uppercase tracking-widest text-[#A3E635] mb-3">
                                <i className="fas fa-circle-check text-[10px]"></i> Se acabó la teoría
                            </span>

                            <h2 className="text-3xl sm:text-4xl font-black font-heading text-white mb-3 leading-tight drop-shadow-lg">
                                ¿Cookies o <span className="relative inline-block text-[#A3E635]">
                                    soluciones?
                                    <svg className="absolute w-full h-3 -bottom-1.5 left-0 z-[-1] text-[#A3E635]/60" viewBox="0 0 200 12" preserveAspectRatio="none" fill="none"><path d="M8,8 C22,5 38,7.5 55,7.5 C130,7.5 165,7.5 188,7.5 C194,7.5 198,6 196,7.5" stroke="currentColor" strokeWidth="7" strokeLinecap="round"/></svg>
                                </span>
                            </h2>
                            <p className="text-white/85 font-semibold mb-5 max-w-lg mx-auto leading-relaxed">
                                Ahora que sabés todo sobre las cookies, contanos tu necesidad y convertimos tu idea en una solución real.
                            </p>

                            {/* Soluciones */}
                            <div className="flex flex-wrap justify-center gap-2 mb-5">
                                {SOLUCIONES.map((s, i) => (
                                    <span key={i} className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full ${s.color} text-white text-[9px] font-black uppercase tracking-wider shadow-md hover:-translate-y-0.5 transition-transform`}>
                                        <i className={`fas ${s.icon} text-[10px]`}></i> {s.label}
                                    </span>
                                ))}
                            </div>

                            {/* Botones */}
                            <div className="flex flex-wrap justify-center gap-3 mb-6">
                                <Link to="/contactanos" className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#A3E635] hover:bg-[#84CC16] text-[#0A0A0A] rounded-full font-black text-xs uppercase tracking-[0.15em] shadow-xl shadow-[#A3E635]/30 hover:shadow-2xl hover:-translate-y-1 active:scale-95 transition-all">
                                    <i className="fas fa-comment-dots text-lg"></i> Contanos qué necesitás
                                </Link>
                                <a href="https://wa.me/59161320004?text=Hola%20HagamosTech!%20Quiero%20una%20solución" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#25D366] hover:bg-[#1DA851] text-white rounded-full font-black text-xs uppercase tracking-[0.15em] shadow-xl hover:shadow-2xl hover:-translate-y-1 active:scale-95 transition-all">
                                    <i className="fab fa-whatsapp text-lg"></i> Escribir ahora
                                </a>
                            </div>

                            <div className="inline-flex items-center gap-1.5 text-white/70 text-[9px] font-black uppercase tracking-widest">
                                <i className="fas fa-rotate text-[#A3E635]"></i>Última actualización: enero 2026
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CtaCookies;
