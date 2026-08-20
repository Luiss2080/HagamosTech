import React, { useState } from 'react';
import CircuitBackground from '../../../components/fondos/FondoTech';

const TIPOS = [
    { icon: 'fa-lock', titulo: 'Esenciales', frontal: 'Las que hacen funcionar el sitio', detalle: 'Permiten el carrito, tu sesión y la seguridad. Sin ellas el sitio no funciona.', ejemplos: ['Carrito', 'Inicio de sesión', 'Seguridad'], color: 'from-[#A3E635] to-[#84CC16]' },
    { icon: 'fa-magic-wand-sparkles', titulo: 'Funcionales', frontal: 'Recuerdan lo que te gusta', detalle: 'Guardan tus preferencias para que cada visita sea más cómoda y personalizada.', ejemplos: ['Idioma', 'Zona', 'Sabores favoritos'], color: 'from-[#0A0A0A] to-[#171717]' },
    { icon: 'fa-chart-line', titulo: 'Analíticas', frontal: 'Nos ayudan a mejorar', detalle: 'Miden cómo usás el sitio de forma anónima para que podamos optimizarlo.', ejemplos: ['Páginas vistas', 'Tiempo de uso', 'Navegación'], color: 'from-[#171717] to-[#6B3410]' },
    { icon: 'fa-bullhorn', titulo: 'Publicidad', frontal: 'Te mostramos lo que te interesa', detalle: 'Personalizan las promociones y ofertas que ves según tus intereses y hábitos.', ejemplos: ['Promos', 'Ofertas', 'Contenido relevante'], color: 'from-[#84CC16] to-[#AA3000]' },
];

const TiposCookies = () => {
    const [flipped, setFlipped] = useState({});

    const toggleFlip = (i) => setFlipped(prev => ({ ...prev, [i]: !prev[i] }));

    return (
        <div className="relative">
            <section className="relative z-10 py-4">
                <CircuitBackground />
                <div className="container mx-auto px-6 max-w-7xl relative z-20">
                    <div className="text-center mb-4 relative z-10">
                        <span className="inline-block py-1.5 px-4 rounded-full bg-[#A3E635]/10 text-[#A3E635] text-[10px] font-black tracking-widest uppercase mb-4 border border-[#A3E635]/20">
                            <i className="fas fa-cookie text-[#A3E635] mr-1"></i> Tipos de Cookie
                        </span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading text-[#171717] mb-3 leading-tight">
                            Cada una tiene su <span className="relative inline-block text-[#A3E635]">
                                función
                                <svg className="absolute w-full h-3 -bottom-1.5 left-0 z-[-1] text-amber-500 drop-shadow-[0_0_8px_rgba(163,230,53,0.55)]" viewBox="0 0 200 12" preserveAspectRatio="none" fill="none"><path d="M8,8 C22,5 38,7.5 55,7.5 C130,7.5 165,7.5 188,7.5 C194,7.5 198,6 196,7.5" stroke="currentColor" strokeWidth="7" strokeLinecap="round"/></svg>
                            </span>
                        </h2>
                        <p className="text-[#1F2937] font-medium max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
                            Tocá cada tarjeta para descubrir qué hace cada tipo de cookie.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" style={{ perspective: '1200px' }}>
                        {TIPOS.map((tipo, i) => (
                            <div
                                key={i}
                                onClick={() => toggleFlip(i)}
                                className="relative h-64 cursor-pointer"
                                style={{ transformStyle: 'preserve-3d', transition: 'transform 0.7s cubic-bezier(0.4,0,0.2,1)', transform: flipped[i] ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
                            >
                                {/* Frente */}
                                <div className={`absolute inset-0 rounded-[2rem] bg-gradient-to-br ${tipo.color} p-6 flex flex-col items-center justify-center text-center text-white shadow-xl overflow-hidden`} style={{ backfaceVisibility: 'hidden' }}>
                                    <div className="absolute top-0 left-0 w-full h-1 bg-white/40"></div>
                                    <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-white/15 blur-2xl animate-float-slow pointer-events-none"></div>
                                    <div className="absolute -bottom-12 -left-8 w-36 h-36 rounded-full bg-black/10 blur-2xl animate-float-medium pointer-events-none"></div>
                                    <div className="relative z-10">
                                        <div className="w-16 h-16 rounded-2xl bg-white/20 ring-1 ring-white/40 flex items-center justify-center text-3xl mx-auto mb-4 group-hover:scale-110 transition-transform">
                                            <i className={`fas ${tipo.icon}`}></i>
                                        </div>
                                        <h3 className="text-xl font-black font-heading mb-2">{tipo.titulo}</h3>
                                        <p className="text-sm font-medium opacity-90">{tipo.frontal}</p>
                                        <span className="inline-flex items-center gap-1.5 mt-4 px-4 py-2 rounded-full bg-white/20 text-[10px] font-black uppercase tracking-wider border border-white/25">
                                            <i className="fas fa-hand-pointer"></i> Tocá para ver
                                        </span>
                                    </div>
                                </div>
                                {/* Dorso */}
                                <div className="absolute inset-0 rounded-[2rem] bg-white border-2 border-orange-100 p-6 flex flex-col justify-center shadow-xl" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#A3E635] via-[#171717] to-[#A3E635] opacity-70"></div>
                                    <div className="relative z-10">
                                        <div className="w-12 h-12 rounded-2xl bg-[#A3E635]/10 flex items-center justify-center text-[#A3E635] text-xl mx-auto mb-3"><i className={`fas ${tipo.icon}`}></i></div>
                                        <h4 className="text-center font-black text-[#111827] text-sm mb-2">{tipo.titulo}</h4>
                                        <p className="text-center text-[11px] text-slate-600 font-semibold leading-relaxed mb-3">{tipo.detalle}</p>
                                        <div className="flex flex-wrap justify-center gap-1.5">
                                            {tipo.ejemplos.map((ej, j) => (
                                                <span key={j} className="px-2.5 py-1 rounded-full bg-[#FFFFFF] text-[#171717] text-[9px] font-black uppercase tracking-wider border border-orange-100">{ej}</span>
                                            ))}
                                        </div>
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

export default TiposCookies;
