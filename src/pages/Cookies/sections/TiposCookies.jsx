import React, { useState } from 'react';
import CircuitBackground from '../../../components/fondos/FondoTech';

const TIPOS = [
    { icon: 'fa-lock', titulo: 'Sesión', frontal: 'Mantiene tu inicio de sesión', detalle: 'La aplicación usa una cookie de sesión para reconocer la autenticación mientras utilizás tu cuenta.', ejemplos: ['Cuenta', 'Sesión', 'Autenticación'], estado: 'ESENCIAL' },
    { icon: 'fa-magic-wand-sparkles', titulo: 'Almacenamiento local', frontal: 'Preferencias en tu navegador', detalle: 'Algunas preferencias del perfil pueden guardarse en el almacenamiento local del navegador.', ejemplos: ['Preferencias', 'Perfil', 'Navegador'], estado: 'LOCAL' },
    { icon: 'fa-chart-line', titulo: 'Analítica', frontal: 'Uso analítico no declarado', detalle: 'Esta página no afirma que el sitio mida navegación o visitas con cookies analíticas.', ejemplos: ['Uso por confirmar', 'Sin métricas publicadas'], estado: 'NO DECLARADO' },
    { icon: 'fa-bullhorn', titulo: 'Publicidad', frontal: 'Publicidad no declarada', detalle: 'No se afirma que el sitio personalice anuncios o promociones según hábitos de navegación.', ejemplos: ['Sin segmentación declarada', 'Control del navegador'], estado: 'NO DECLARADO' },
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
                            <button
                                key={i}
                                type="button"
                                onClick={() => toggleFlip(i)}
                                aria-pressed={Boolean(flipped[i])}
                                aria-label={`${tipo.titulo}: ${flipped[i] ? 'ocultar detalle' : 'ver detalle'}`}
                                className="relative h-64 w-full rounded-[1.75rem] text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#A3E635]"
                                style={{ transformStyle: 'preserve-3d', transition: 'transform 0.7s cubic-bezier(0.4,0,0.2,1)', transform: flipped[i] ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
                            >
                                {/* Frente */}
                                <div className="absolute inset-0 rounded-[1.75rem] border border-[#A3E635]/25 bg-[#0c100a] p-6 flex flex-col items-center justify-center text-center text-white shadow-xl overflow-hidden" style={{ backfaceVisibility: 'hidden' }}>
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-1 rounded-full bg-[#A3E635]"></div>
                                    <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-[#A3E635]/10 blur-2xl pointer-events-none"></div>
                                    <div className="relative z-10">
                                        <div className="w-14 h-14 rounded-2xl bg-[#A3E635]/10 text-[#A3E635] ring-1 ring-[#A3E635]/30 flex items-center justify-center text-2xl mx-auto mb-4">
                                            <i className={`fas ${tipo.icon}`}></i>
                                        </div>
                                        <h3 className="text-xl font-black font-heading mb-2">{tipo.titulo}</h3>
                                        <p className="text-sm font-medium text-slate-300">{tipo.frontal}</p>
                                        <span className="inline-flex items-center gap-1.5 mt-4 px-3 py-1.5 rounded-full bg-[#A3E635]/10 text-[9px] font-black uppercase tracking-wider text-[#B7F34B] border border-[#A3E635]/20">
                                            <i className="fas fa-circle-info"></i> {tipo.estado}
                                        </span>
                                    </div>
                                </div>
                                {/* Dorso */}
                                <div className="absolute inset-0 rounded-[1.75rem] bg-[#0c100a] border border-[#A3E635]/30 p-6 flex flex-col justify-center shadow-xl" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#A3E635] via-[#171717] to-[#A3E635] opacity-70"></div>
                                    <div className="relative z-10">
                                        <div className="w-12 h-12 rounded-2xl bg-[#A3E635]/10 flex items-center justify-center text-[#A3E635] text-xl mx-auto mb-3"><i className={`fas ${tipo.icon}`}></i></div>
                                        <h4 className="text-center font-black text-white text-sm mb-2">{tipo.titulo}</h4>
                                        <p className="text-center text-[11px] text-slate-300 font-semibold leading-relaxed mb-3">{tipo.detalle}</p>
                                        <div className="flex flex-wrap justify-center gap-1.5">
                                            {tipo.ejemplos.map((ej, j) => (
                                                <span key={j} className="px-2.5 py-1 rounded-full bg-[#A3E635]/10 text-[#D9F99D] text-[9px] font-black uppercase tracking-wider border border-[#A3E635]/20">{ej}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default TiposCookies;
