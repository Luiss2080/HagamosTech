import React from 'react';
import CircuitBackground from '../../../components/fondos/FondoTech';

const ContactoPrivacidad = () => {
    return (
        <div className="relative">
            <section className="relative z-10 py-10">
                <CircuitBackground />
                <div className="container mx-auto px-6 max-w-7xl relative z-20">
                    <div className="bg-gradient-to-br from-[#171717] via-[#0A0A0A] to-[#171717] rounded-[2.5rem] p-8 sm:p-10 shadow-2xl shadow-[#0A0A0A]/30 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#A3E635] via-amber-300 to-[#A3E635]"></div>
                        <div className="absolute top-0 right-0 w-72 h-72 bg-[#A3E635]/20 rounded-full blur-[80px] pointer-events-none animate-float-slow"></div>
                        <div className="absolute bottom-0 left-0 w-72 h-72 bg-black/20 rounded-full blur-[80px] pointer-events-none animate-float-medium"></div>
                        <div className="absolute -top-8 -left-8 w-40 h-40 rounded-full bg-white/10 blur-2xl pointer-events-none"></div>

                        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                            <div>
                                <span className="inline-block bg-white/10 text-[#FFE8D6] px-4 py-1.5 rounded-full text-[10px] font-black tracking-[0.2em] uppercase border border-white/15 mb-5">
                                    <i className="fas fa-headset mr-1.5 text-[#A3E635]"></i> DPO / Delegado de Datos
                                </span>
                                <h2 className="text-3xl sm:text-4xl font-black font-heading text-white mb-4 leading-tight drop-shadow">
                                    ¿Dudas sobre tus <span className="relative inline-block text-amber-300">
                                        datos?
                                        <svg className="absolute w-full h-3 -bottom-1.5 left-0 z-[-1] text-amber-300/60 drop-shadow-[0_0_8px_rgba(163,230,53,0.4)]" viewBox="0 0 200 12" preserveAspectRatio="none" fill="none"><path d="M8,8 C22,5 38,7.5 55,7.5 C130,7.5 165,7.5 188,7.5 C194,7.5 198,6 196,7.5" stroke="currentColor" strokeWidth="7" strokeLinecap="round"/></svg>
                                    </span>
                                </h2>
                                <p className="text-white/80 font-semibold leading-relaxed text-sm sm:text-base">
                                    Tenemos un equipo dedicado a atender tus consultas sobre privacidad. Escribinos y te respondemos a la brevedad.
                                </p>
                                <div className="mt-5 flex flex-wrap gap-2">
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-white/80 text-[9px] font-black uppercase tracking-widest">
                                        <i className="fas fa-lock text-amber-300"></i> Canal seguro
                                    </span>
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-white/80 text-[9px] font-black uppercase tracking-widest">
                                        <i className="fas fa-clock text-amber-300"></i> Respuesta en 24h
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-col gap-3">
                                <a href="https://wa.me/59161320004?text=Hola%20Los%20HagamosTech!%20Tengo%20una%20consulta%20sobre%20privacidad" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 bg-white/10 border border-white/15 rounded-2xl hover:bg-white/20 transition-colors group">
                                    <div className="w-12 h-12 rounded-xl bg-[#25D366] flex items-center justify-center text-white text-xl shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                                        <i className="fab fa-whatsapp"></i>
                                    </div>
                                    <div className="text-left">
                                        <p className="text-[9px] font-black uppercase tracking-widest text-white/60">WhatsApp</p>
                                        <p className="text-white font-black text-sm group-hover:text-amber-300 transition-colors">+591 61320004</p>
                                    </div>
                                    <i className="fas fa-arrow-right text-white/50 group-hover:translate-x-1 transition-transform ml-auto"></i>
                                </a>
                                <a href="mailto:privacidad@hagamostech.bo" className="flex items-center gap-4 p-4 bg-white/10 border border-white/15 rounded-2xl hover:bg-white/20 transition-colors group">
                                    <div className="w-12 h-12 rounded-xl bg-[#A3E635] flex items-center justify-center text-white text-xl shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                                        <i className="fas fa-envelope"></i>
                                    </div>
                                    <div className="text-left">
                                        <p className="text-[9px] font-black uppercase tracking-widest text-white/60">Email</p>
                                        <p className="text-white font-black text-sm group-hover:text-amber-300 transition-colors">privacidad@hagamostech.bo</p>
                                    </div>
                                    <i className="fas fa-arrow-right text-white/50 group-hover:translate-x-1 transition-transform ml-auto"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ContactoPrivacidad;
