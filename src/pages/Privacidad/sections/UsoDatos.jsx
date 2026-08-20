import React from 'react';
import CircuitBackground from '../../../components/fondos/FondoSaltenas';

const USOS = [
    { icon: 'fa-motorcycle', titulo: 'Procesar tus pedidos', desc: 'Coordinamos la preparación y entrega de cada orden para que llegue calentita a tu puerta.', puntos: ['Confirmación de pedido', 'Coordinación de delivery', 'Historial de compras'], color: 'bg-[#FF4D00]' },
    { icon: 'fa-heart', titulo: 'Mejorar tu experiencia', desc: 'Recordamos tus sabores favoritos y te mostramos promos que realmente te interesan.', puntos: ['Recomendaciones', 'Promos personalizadas', 'Menú favorito'], color: 'bg-[#5D3A1F]' },
    { icon: 'fa-envelope', titulo: 'Comunicarnos con vos', desc: 'Te enviamos novedades, promociones y avisos importantes relacionados a tu cuenta.', puntos: ['Novedades', 'Promociones', 'Avisos de cuenta'], color: 'bg-[#8B4513]' },
    { icon: 'fa-chart-line', titulo: 'Mejorar el servicio', desc: 'Analizamos tendencias para optimizar menú, horarios y cobertura de nuestras sucursales.', puntos: ['Análisis de demanda', 'Optimización de menú', 'Nuevas sucursales'], color: 'bg-[#CC3D00]' },
];

const UsoDatos = () => {
    return (
        <div className="relative">
            <section className="relative z-10 py-4">
                <CircuitBackground />
                <div className="container mx-auto px-6 max-w-7xl relative z-20">
                    <div className="text-center mb-4 relative z-10">
                        <span className="inline-block py-1.5 px-4 rounded-full bg-[#8B4513]/10 text-[#8B4513] text-[10px] font-black tracking-widest uppercase mb-4 border border-[#8B4513]/20">
                            <i className="fas fa-gear text-[#8B4513] mr-1"></i> Cómo los Usamos
                        </span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading text-[#8B4513] mb-3 leading-tight">
                            Para qué usamos <span className="relative inline-block text-[#FF4D00]">
                                tus datos
                                <svg className="absolute w-full h-3 -bottom-1.5 left-0 z-[-1] text-amber-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.55)]" viewBox="0 0 200 12" preserveAspectRatio="none" fill="none"><path d="M8,8 C22,5 38,7.5 55,7.5 C130,7.5 165,7.5 188,7.5 C194,7.5 198,6 196,7.5" stroke="currentColor" strokeWidth="7" strokeLinecap="round"/></svg>
                            </span>
                        </h2>
                        <p className="text-[#1F2937] font-medium max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
                            Tus datos siempre trabajan para darte una mejor experiencia.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {USOS.map((uso, i) => (
                            <div key={i} className="relative bg-white rounded-[2rem] border border-orange-50 shadow-md overflow-hidden group hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                <div className={`absolute top-0 left-0 w-full h-1 ${uso.color}`}></div>
                                <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-[#FF4D00]/10 blur-2xl animate-float-slow pointer-events-none"></div>
                                <div className="absolute -bottom-12 -left-8 w-36 h-36 rounded-full bg-[#8B4513]/10 blur-2xl animate-float-medium pointer-events-none"></div>

                                <div className="relative z-10 p-6">
                                    <div className="flex items-start gap-4 mb-4">
                                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0 shadow-lg ${uso.color} text-white ring-2 ring-white group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300`}>
                                            <i className={`fas ${uso.icon}`}></i>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-black font-heading text-[#8B4513] leading-tight">{uso.titulo}</h3>
                                            <p className="text-xs text-[#374151] font-semibold mt-1 leading-relaxed">{uso.desc}</p>
                                        </div>
                                    </div>
                                    <div className="pt-4 border-t border-dashed border-orange-100 flex flex-wrap gap-1.5">
                                        {uso.puntos.map((punto, j) => (
                                            <span key={j} className="px-3 py-1.5 rounded-full bg-[#FFF6F6] text-[#8B4513] text-[10px] font-black uppercase tracking-wider border border-orange-100">
                                                <i className="fas fa-check text-[#FF4D00] text-[9px] mr-1"></i>{punto}
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
