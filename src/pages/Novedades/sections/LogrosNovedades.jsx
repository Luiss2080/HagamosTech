import React from 'react';
import CircuitBackground from '../../../components/fondos/FondoTech';

const LOGROS = [
    { year: '2026', icon: 'fa-trophy', titulo: 'Reconocimiento a la innovación', desc: 'Premiados a nivel regional por nuestros proyectos de IA y automatización para pymes.', color: 'bg-[#A3E635]', soft: 'bg-[#A3E635]/10 text-[#A3E635] border-[#A3E635]/25', badge: 'bg-[#A3E635]', feats: [{ icon: 'fa-award', label: 'Premio regional', chip: 'bg-[#A3E635]/10 text-[#A3E635] border-[#A3E635]/25' }, { icon: 'fa-users', label: 'Votación del sector', chip: 'bg-white/5 text-white border-white/10' }] },
    { year: '2024', icon: 'fa-rocket', titulo: '+120 proyectos entregados', desc: 'Cinco años construyendo soluciones web, sistemas y automatizaciones para clientes de toda Bolivia.', color: 'bg-[#171717]', soft: 'bg-[#171717]/10 text-slate-300 border-[#171717]/25', badge: 'bg-[#171717]', feats: [{ icon: 'fa-diagram-project', label: '120+ proyectos', chip: 'bg-[#171717]/10 text-slate-300 border-[#171717]/25' }, { icon: 'fa-calendar', label: '5 años', chip: 'bg-white/5 text-white border-white/10' }] },
    { year: '2022', icon: 'fa-graduation-cap', titulo: 'Acompañamiento académico', desc: 'Acompañamos a más de 300 estudiantes en sus proyectos de desarrollo web, lógica y uso de IA.', color: 'bg-[#0A0A0A]', soft: 'bg-[#0A0A0A]/10 text-white border-[#0A0A0A]/25', badge: 'bg-[#0A0A0A]', feats: [{ icon: 'fa-user-graduate', label: '300+ estudiantes', chip: 'bg-[#0A0A0A]/10 text-white border-[#0A0A0A]/25' }, { icon: 'fa-diagram-project', label: 'Proyectos', chip: 'bg-white/5 text-white border-white/10' }] },
    { year: '2020', icon: 'fa-certificate', titulo: 'Nace HagamosTech', desc: 'Arrancamos con una idea simple: resolver necesidades reales con tecnología, sin vueltas.', color: 'bg-[#84CC16]', soft: 'bg-[#84CC16]/10 text-[#84CC16] border-[#84CC16]/25', badge: 'bg-[#84CC16]', feats: [{ icon: 'fa-seedling', label: 'Fundación', chip: 'bg-[#84CC16]/10 text-[#84CC16] border-[#84CC16]/25' }, { icon: 'fa-handshake', label: 'Primeros clientes', chip: 'bg-white/5 text-white border-white/10' }] },
];

const LogrosNovedades = () => {
    return (
        <div className="relative">
            <section className="relative z-10 py-6">
                <CircuitBackground />
                <div className="container mx-auto px-6 max-w-7xl relative z-20">
                    <div className="text-center mb-5 relative z-10">
                        <span className="inline-block py-1.5 px-4 rounded-full bg-[#171717]/10 text-slate-300 text-[10px] font-black tracking-widest uppercase mb-4 border border-[#171717]/20">
                            <i className="fas fa-medal text-slate-300 mr-1"></i> Nuestros Logros
                        </span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading text-white mb-3 leading-tight">
                            Hitos que nos <span className="relative inline-block text-[#A3E635]">
                                enorgullecen
                                <svg className="absolute w-full h-3 -bottom-1.5 left-0 z-[-1] text-lime-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.55)]" viewBox="0 0 200 12" preserveAspectRatio="none" fill="none">
                                    <path d="M8,8 C22,5 38,7.5 55,7.5 C130,7.5 165,7.5 188,7.5 C194,7.5 198,6 196,7.5" stroke="currentColor" strokeWidth="7" strokeLinecap="round"/>
                                </svg>
                            </span>
                        </h2>
                        <p className="text-slate-300 font-medium max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
                            Un recorrido por los momentos que marcaron nuestra historia.
                        </p>
                    </div>

                    {/* Timeline horizontal */}
                    <div className="relative">
                        {/* Línea conectora */}
                        <div className="hidden md:block absolute top-[22px] left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-[#A3E635]/30 via-[#0A0A0A]/40 to-[#A3E635]/30"></div>

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
                                    <div className="relative bg-[#111827] rounded-2xl p-4 border border-white/10 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden text-center">
                                        <div className={`absolute top-0 left-0 w-full h-1 ${l.color}`}></div>

                                        {/* Orbes decorativos suaves */}
                                        <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-[#A3E635]/10 blur-2xl animate-float-slow pointer-events-none"></div>
                                        <div className="absolute -bottom-10 -left-6 w-28 h-28 rounded-full bg-[#0A0A0A]/10 blur-2xl animate-float-medium pointer-events-none"></div>

                                        <div className="relative z-10">
                                            <div className="flex items-center justify-center gap-1.5 mb-2">
                                                <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-black tracking-widest ${l.soft}`}>
                                                    <i className="fas fa-calendar-days mr-0.5"></i>{l.year}
                                                </span>
                                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#111111] text-white text-[9px] font-black tracking-widest border border-white/10">
                                                    <i className="fas fa-medal mr-0.5"></i>Logro #{i + 1}
                                                </span>
                                            </div>
                                            <h3 className="text-sm font-black font-heading text-white leading-tight mb-1.5">{l.titulo}</h3>
                                            <p className="text-[10.5px] text-slate-300 font-medium leading-relaxed mb-2.5">{l.desc}</p>

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
