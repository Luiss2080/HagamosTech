import React from 'react';
import CircuitBackground from '../../../components/fondos/FondoSaltenas';

const LOGROS = [
    { year: '2026', icon: 'fa-trophy', titulo: 'Mejor Salteñería 5 años seguidos', desc: 'Reconocidos por votación popular como la mejor salteñería de Santa Cruz por quinta vez consecutiva.', color: 'bg-[#FF4D00]', soft: 'bg-[#FF4D00]/10 text-[#FF4D00] border-[#FF4D00]/25', badge: 'bg-[#FF4D00]', feats: [{ icon: 'fa-award', label: '5 años seguidos', chip: 'bg-[#FF4D00]/10 text-[#FF4D00] border-[#FF4D00]/25' }, { icon: 'fa-users', label: 'Votación popular', chip: 'bg-orange-50 text-[#8B4513] border-orange-100' }] },
    { year: '2024', icon: 'fa-store', titulo: '12 sucursales en 3 ciudades', desc: 'Cerramos el año con presencia en Santa Cruz, Cochabamba y Oruro, superando todas las metas de expansión.', color: 'bg-[#5D3A1F]', soft: 'bg-[#5D3A1F]/10 text-[#5D3A1F] border-[#5D3A1F]/25', badge: 'bg-[#5D3A1F]', feats: [{ icon: 'fa-store', label: '12 sucursales', chip: 'bg-[#5D3A1F]/10 text-[#5D3A1F] border-[#5D3A1F]/25' }, { icon: 'fa-city', label: '3 ciudades', chip: 'bg-orange-50 text-[#8B4513] border-orange-100' }] },
    { year: '2022', icon: 'fa-utensils', titulo: 'Campeones de la Feria Gastronómica', desc: 'Nuestra salteña gigante de 1.5 metros fue elegida como el mejor plato del festival gastronómico nacional.', color: 'bg-[#8B4513]', soft: 'bg-[#8B4513]/10 text-[#8B4513] border-[#8B4513]/25', badge: 'bg-[#8B4513]', feats: [{ icon: 'fa-ruler-horizontal', label: 'Salteña de 1.5 m', chip: 'bg-[#8B4513]/10 text-[#8B4513] border-[#8B4513]/25' }, { icon: 'fa-medal', label: 'Mejor plato', chip: 'bg-orange-50 text-[#8B4513] border-orange-100' }] },
    { year: '2019', icon: 'fa-certificate', titulo: 'Certificación de Calidad Alimentaria', desc: 'Obtuvimos la certificación de buenas prácticas de manufactura y manipulación de alimentos.', color: 'bg-[#CC3D00]', soft: 'bg-[#CC3D00]/10 text-[#CC3D00] border-[#CC3D00]/25', badge: 'bg-[#CC3D00]', feats: [{ icon: 'fa-certificate', label: 'Calidad certificada', chip: 'bg-[#CC3D00]/10 text-[#CC3D00] border-[#CC3D00]/25' }, { icon: 'fa-shield-halved', label: 'BPM aprobado', chip: 'bg-orange-50 text-[#8B4513] border-orange-100' }] },
];

const LogrosNovedades = () => {
    return (
        <div className="relative">
            <section className="relative z-10 py-6">
                <CircuitBackground />
                <div className="container mx-auto px-6 max-w-7xl relative z-20">
                    <div className="text-center mb-5 relative z-10">
                        <span className="inline-block py-1.5 px-4 rounded-full bg-[#5D3A1F]/10 text-[#5D3A1F] text-[10px] font-black tracking-widest uppercase mb-4 border border-[#5D3A1F]/20">
                            <i className="fas fa-medal text-[#5D3A1F] mr-1"></i> Nuestros Logros
                        </span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading text-[#8B4513] mb-3 leading-tight">
                            Hitos que nos <span className="relative inline-block text-[#FF4D00]">
                                enorgullecen
                                <svg className="absolute w-full h-3 -bottom-1.5 left-0 z-[-1] text-amber-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.55)]" viewBox="0 0 200 12" preserveAspectRatio="none" fill="none">
                                    <path d="M8,8 C22,5 38,7.5 55,7.5 C130,7.5 165,7.5 188,7.5 C194,7.5 198,6 196,7.5" stroke="currentColor" strokeWidth="7" strokeLinecap="round"/>
                                </svg>
                            </span>
                        </h2>
                        <p className="text-[#1F2937] font-medium max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
                            Un recorrido por los momentos que marcaron nuestra historia.
                        </p>
                    </div>

                    {/* Timeline horizontal */}
                    <div className="relative">
                        {/* Línea conectora */}
                        <div className="hidden md:block absolute top-[22px] left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-[#FF4D00]/30 via-[#8B4513]/40 to-[#FF4D00]/30"></div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {LOGROS.map((l, i) => (
                                <div key={i} className="relative group">
                                    {/* Nodo */}
                                    <div className="relative z-10 mb-3 flex justify-center">
                                        <div className={`w-11 h-11 rounded-2xl ${l.color} text-white flex items-center justify-center text-lg shadow-lg ring-4 ring-white border-2 border-white transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6`}>
                                            <i className={`fas ${l.icon}`}></i>
                                        </div>
                                    </div>

                                    {/* Card */}
                                    <div className="relative bg-white rounded-2xl p-4 border border-orange-50 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden text-center">
                                        <div className={`absolute top-0 left-0 w-full h-1 ${l.color}`}></div>

                                        {/* Orbes decorativos suaves */}
                                        <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-[#FF4D00]/10 blur-2xl animate-float-slow pointer-events-none"></div>
                                        <div className="absolute -bottom-10 -left-6 w-28 h-28 rounded-full bg-[#8B4513]/10 blur-2xl animate-float-medium pointer-events-none"></div>

                                        <div className="relative z-10">
                                            <div className="flex items-center justify-center gap-1.5 mb-2">
                                                <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-black tracking-widest ${l.soft}`}>
                                                    <i className="fas fa-calendar-days mr-0.5"></i>{l.year}
                                                </span>
                                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FFF6F6] text-[#8B4513] text-[9px] font-black tracking-widest border border-orange-100">
                                                    <i className="fas fa-medal mr-0.5"></i>Logro #{i + 1}
                                                </span>
                                            </div>
                                            <h3 className="text-sm font-black font-heading text-[#8B4513] leading-tight mb-1.5">{l.titulo}</h3>
                                            <p className="text-[10.5px] text-slate-600 font-medium leading-relaxed mb-2.5">{l.desc}</p>

                                            {/* Características con icono */}
                                            <div className="grid grid-cols-2 gap-1.5">
                                                {l.feats.map((f, j) => (
                                                    <div key={j} className={`flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-lg border ${f.chip}`}>
                                                        <i className={`fas ${f.icon} text-[10px]`}></i>
                                                        <span className="text-[8.5px] font-black uppercase tracking-wide leading-tight">{f.label}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LogrosNovedades;
