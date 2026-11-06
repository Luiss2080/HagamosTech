import React from 'react';
import CircuitBackground from '../../../components/fondos/FondoTech';

const AREAS_TRABAJO = [
    { year: '01', icon: 'fa-globe', titulo: 'Páginas y plataformas web', desc: 'Un sitio institucional, un portal educativo y un catálogo tienen objetivos distintos; el propósito determina su estructura y funciones.', color: 'bg-[#A3E635]', soft: 'bg-[#A3E635]/10 text-[#A3E635] border-[#A3E635]/25', badge: 'bg-[#A3E635]', feats: [{ icon: 'fa-bullseye', label: 'Objetivo y público', chip: 'bg-[#A3E635]/10 text-[#A3E635] border-[#A3E635]/25' }, { icon: 'fa-mobile-screen', label: 'Diseño adaptable', chip: 'bg-white/5 text-white border-white/10' }] },
    { year: '02', icon: 'fa-code', titulo: 'Sistemas de gestión', desc: 'Se revisan las tareas, perfiles, datos y reportes que necesita cada organización antes de plantear un sistema.', color: 'bg-[#171717]', soft: 'bg-[#171717]/10 text-slate-300 border-[#171717]/25', badge: 'bg-[#171717]', feats: [{ icon: 'fa-users', label: 'Roles de usuario', chip: 'bg-[#171717]/10 text-slate-300 border-[#171717]/25' }, { icon: 'fa-database', label: 'Datos y reportes', chip: 'bg-white/5 text-white border-white/10' }] },
    { year: '03', icon: 'fa-graduation-cap', titulo: 'Acompañamiento académico', desc: 'La guía cambia según la materia, la consigna y el nivel; el estudiante desarrolla y presenta su propio trabajo.', color: 'bg-[#0A0A0A]', soft: 'bg-[#0A0A0A]/10 text-white border-[#0A0A0A]/25', badge: 'bg-[#0A0A0A]', feats: [{ icon: 'fa-school', label: 'Pauta de entrega', chip: 'bg-[#0A0A0A]/10 text-white border-[#0A0A0A]/25' }, { icon: 'fa-user-graduate', label: 'Autoría del estudiante', chip: 'bg-white/5 text-white border-white/10' }] },
    { year: '04', icon: 'fa-palette', titulo: 'Identidad y piezas de difusión', desc: 'El canal y el formato orientan si se necesita identidad visual, una pieza para redes o un catálogo de productos.', color: 'bg-[#84CC16]', soft: 'bg-[#84CC16]/10 text-[#84CC16] border-[#84CC16]/25', badge: 'bg-[#84CC16]', feats: [{ icon: 'fa-rectangle-ad', label: 'Uso digital o impreso', chip: 'bg-[#84CC16]/10 text-[#84CC16] border-[#84CC16]/25' }, { icon: 'fa-pen-nib', label: 'Recursos de marca', chip: 'bg-white/5 text-white border-white/10' }] },
];

const LogrosNovedades = () => {
    return (
        <div className="relative">
            <section className="relative z-10 py-6">
                <CircuitBackground />
                <div className="container mx-auto px-6 max-w-7xl relative z-20">
                    <div className="text-center mb-5 relative z-10">
                        <span className="inline-block py-1.5 px-4 rounded-full bg-[#171717]/10 text-slate-300 text-[10px] font-black tracking-widest uppercase mb-4 border border-[#171717]/20">
                            <i className="fas fa-medal text-slate-300 mr-1"></i> Ejemplos de alcance
                        </span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading text-white mb-3 leading-tight">
                            Proyectos con <span className="relative inline-block text-[#A3E635]">
                                distintos objetivos
                                <svg className="absolute w-full h-3 -bottom-1.5 left-0 z-[-1] text-lime-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.55)]" viewBox="0 0 200 12" preserveAspectRatio="none" fill="none">
                                    <path d="M8,8 C22,5 38,7.5 55,7.5 C130,7.5 165,7.5 188,7.5 C194,7.5 198,6 196,7.5" stroke="currentColor" strokeWidth="7" strokeLinecap="round"/>
                                </svg>
                            </span>
                        </h2>
                        <p className="text-slate-300 font-medium max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
                            Cada categoría plantea preguntas distintas para precisar contenido, funciones, nivel de apoyo o formato.
                        </p>
                    </div>

                    {/* Timeline horizontal */}
                    <div className="relative">
                        {/* Línea conectora */}
                        <div className="hidden md:block absolute top-[22px] left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-[#A3E635]/30 via-[#0A0A0A]/40 to-[#A3E635]/30"></div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {AREAS_TRABAJO.map((l, i) => (
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
                                                    <i className="fas fa-hashtag mr-0.5"></i>{l.year}
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
