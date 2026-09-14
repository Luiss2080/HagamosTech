import React from 'react';
import FondoTech from '../../../components/fondos/FondoTech';

const USOS = [
    { icon: 'fa-lightbulb', titulo: 'Procesar tus solicitudes', desc: 'Coordinamos el análisis y desarrollo de cada proyecto para entregarte la solución que necesitás.', puntos: ['Confirmación de solicitud', 'Seguimiento del proyecto', 'Historial de consultas'], color: 'bg-[#A3E635]' },
    { icon: 'fa-heart', titulo: 'Mejorar tu experiencia', desc: 'Recordamos tus preferencias y te mostramos recursos y soluciones que realmente te interesan.', puntos: ['Recomendaciones', 'Recursos personalizados', 'Proyectos favoritos'], color: 'bg-[#84CC16]' },
    { icon: 'fa-envelope', titulo: 'Comunicarnos con vos', desc: 'Te enviamos novedades, avisos y actualizaciones relacionadas a tu cuenta y tus proyectos.', puntos: ['Novedades', 'Actualizaciones', 'Avisos de cuenta'], color: 'bg-[#0A0A0A]' },
    { icon: 'fa-chart-line', titulo: 'Mejorar el servicio', desc: 'Analizamos tendencias para optimizar nuestras soluciones, tiempos y cobertura de atención.', puntos: ['Análisis de demanda', 'Optimización de servicios', 'Nuevas soluciones'], color: 'bg-[#171717]' },
];

const UsoDatos = () => {
    return (
        <div className="relative">
            <section className="relative z-10 py-4">
                <FondoTech />
                <div className="container mx-auto px-6 max-w-7xl relative z-20">
                    <div className="text-center mb-4 relative z-10">
                        <span className="inline-block py-1.5 px-4 rounded-full bg-[#A3E635]/10 text-[#84CC16] text-[10px] font-black tracking-widest uppercase mb-4 border border-[#A3E635]/20">
                            <i className="fas fa-gear text-[#84CC16] mr-1"></i> Cómo los Usamos
                        </span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading text-[#0A0A0A] mb-3 leading-tight">
                            Para qué usamos <span className="relative inline-block text-[#84CC16]">
                                tus datos
                                <svg className="absolute w-full h-3 -bottom-1.5 left-0 z-[-1] text-[#A3E635] drop-shadow-[0_0_8px_rgba(163,230,53,0.55)]" viewBox="0 0 200 12" preserveAspectRatio="none" fill="none"><path d="M8,8 C22,5 38,7.5 55,7.5 C130,7.5 165,7.5 188,7.5 C194,7.5 198,6 196,7.5" stroke="currentColor" strokeWidth="7" strokeLinecap="round"/></svg>
                            </span>
                        </h2>
                        <p className="text-slate-600 font-medium max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
                            Tus datos siempre trabajan para darte una mejor experiencia.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {USOS.map((uso, i) => (
                            <div key={i} className="relative bg-white rounded-[2rem] border border-gray-100 shadow-md overflow-hidden group hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                <div className={`absolute top-0 left-0 w-full h-1 ${uso.color}`}></div>
                                <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-[#A3E635]/10 blur-2xl animate-float-slow pointer-events-none"></div>
                                <div className="absolute -bottom-12 -left-8 w-36 h-36 rounded-full bg-[#0A0A0A]/5 blur-2xl animate-float-medium pointer-events-none"></div>

                                <div className="relative z-10 p-6">
                                    <div className="flex items-start gap-4 mb-4">
                                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0 shadow-lg ${uso.color} text-white ring-2 ring-white group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300`}>
                                            <i className={`fas ${uso.icon}`}></i>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-black font-heading text-[#0A0A0A] leading-tight">{uso.titulo}</h3>
                                            <p className="text-xs text-slate-600 font-semibold mt-1 leading-relaxed">{uso.desc}</p>
                                        </div>
                                    </div>
                                    <div className="pt-4 border-t border-dashed border-gray-100 flex flex-wrap gap-1.5">
                                        {uso.puntos.map((punto, j) => (
                                            <span key={j} className="px-3 py-1.5 rounded-full bg-[#A3E635]/10 text-[#0A0A0A] text-[10px] font-black uppercase tracking-wider border border-[#A3E635]/20">
                                                <i className="fas fa-check text-[#84CC16] text-[9px] mr-1"></i>{punto}
                                            </span>
                                        ))}
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

export default UsoDatos;
