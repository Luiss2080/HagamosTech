import React from 'react';
import CircuitBackground from '../../../components/fondos/FondoTech';

const RESUMEN = [
    { icon: 'fa-shield-halved', titulo: 'Compromiso con tu privacidad', desc: 'Nunca vendemos tus datos personales a terceros. Tu información se usa solo para mejorar tu experiencia con nosotros.', color: 'bg-[#A3E635]' },
    { icon: 'fa-lock', titulo: 'Transparencia total', desc: 'Todo lo que hacemos con tus datos está explicado en esta página, en lenguaje simple y claro.', color: 'bg-[#0A0A0A]' },
    { icon: 'fa-user-shield', titulo: 'Control en tus manos', desc: 'Podés acceder, corregir o eliminar tus datos cuando quieras. Tus derechos están garantizados.', color: 'bg-[#171717]' },
    { icon: 'fa-file-shield', titulo: 'Actualización 2026', desc: 'Esta política se actualizó por última vez en enero de 2026. Te avisaremos ante cualquier cambio.', color: 'bg-[#84CC16]' },
];

const ResumenPrivacidad = () => {
    return (
        <div className="relative">
            <section className="relative z-10 py-4">
                <CircuitBackground />
                <div className="container mx-auto px-6 max-w-7xl relative z-20">
                    <div className="text-center mb-4 relative z-10">
                        <span className="inline-block py-1.5 px-4 rounded-full bg-[#A3E635]/10 text-[#A3E635] text-[10px] font-black tracking-widest uppercase mb-4 border border-[#A3E635]/20">
                            <i className="fas fa-check-double text-[#A3E635] mr-1"></i> Lo Esencial
                        </span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading text-[#171717] mb-3 leading-tight">
                            En resumen, te <span className="relative inline-block text-[#A3E635]">
                                protegemos
                                <svg className="absolute w-full h-3 -bottom-1.5 left-0 z-[-1] text-amber-500 drop-shadow-[0_0_8px_rgba(163,230,53,0.55)]" viewBox="0 0 200 12" preserveAspectRatio="none" fill="none"><path d="M8,8 C22,5 38,7.5 55,7.5 C130,7.5 165,7.5 188,7.5 C194,7.5 198,6 196,7.5" stroke="currentColor" strokeWidth="7" strokeLinecap="round"/></svg>
                            </span>
                        </h2>
                        <p className="text-[#1F2937] font-medium max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
                            Cuatro puntos clave que resumen nuestra postura sobre tus datos.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {RESUMEN.map((item, i) => (
                            <div key={i} className={`relative rounded-[2rem] p-6 transition-all duration-500 group overflow-hidden border hover:-translate-y-1.5 z-10 text-center ${item.color} text-white shadow-xl shadow-orange-950/10`}>
                                <div className="absolute top-0 left-0 w-full h-1 bg-white/40"></div>
                                {/* Orbes decorativos */}
                                <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-white/15 blur-2xl animate-float-slow pointer-events-none"></div>
                                <div className="absolute -bottom-12 -left-8 w-36 h-36 rounded-full bg-black/10 blur-2xl animate-float-medium pointer-events-none"></div>

                                <div className="relative z-10">
                                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-4 mx-auto bg-white/20 ring-1 ring-white/40 shadow-lg group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300">
                                        <i className={`fas ${item.icon}`}></i>
                                    </div>
                                    <h3 className="text-lg font-black mb-2 leading-tight">{item.titulo}</h3>
                                    <p className="text-xs font-medium opacity-90 leading-relaxed">{item.desc}</p>
                                    <div className="mt-4 pt-3 border-t border-white/25 inline-flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest opacity-80">
                                        <i className="fas fa-shield-halved text-[9px]"></i> HagamosTech
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ResumenPrivacidad;
