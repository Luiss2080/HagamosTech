import React, { useState } from 'react';
import CircuitBackground from '../../../components/fondos/FondoSaltenas';

const FLUJO = [
    {
        icon: 'fa-mobile-screen-button',
        titulo: 'Tu Dispositivo',
        etiqueta: 'Origen',
        desc: 'Navegás y aceptás las cookies desde tu navegador.',
        detalle: 'La cookie se guarda de forma local en tu equipo.',
        chips: ['Navegación', 'Aceptación', 'Local'],
        stat: 'Local',
        statIcon: 'fa-laptop',
        color: 'bg-[#A3E635]'
    },
    {
        icon: 'fa-globe',
        titulo: 'Nuestro Servidor',
        etiqueta: 'Tránsito',
        desc: 'Guardamos tus preferencias para identificarte.',
        detalle: 'Tu cookie se asocia a tus preferencias.',
        chips: ['Identificación', 'Sesión', 'Segura'],
        stat: 'Cifrado',
        statIcon: 'fa-lock',
        color: 'bg-[#0A0A0A]'
    },
    {
        icon: 'fa-database',
        titulo: 'Base de Datos',
        etiqueta: 'Almacenamiento',
        desc: 'Los datos se almacenan cifrados y seguros.',
        detalle: 'Nada se comparte con terceros.',
        chips: ['Cifrado', 'Privacidad', 'Protegido'],
        stat: 'Seguro',
        statIcon: 'fa-shield-halved',
        color: 'bg-[#171717]'
    },
    {
        icon: 'fa-chart-simple',
        titulo: 'Análisis Anónimo',
        etiqueta: 'Destino',
        desc: 'Usamos la información para mejorar el servicio.',
        detalle: 'Datos agregados, nunca personales.',
        chips: ['Anónimo', 'Optimización', 'Mejora'],
        stat: 'Anónimo',
        statIcon: 'fa-user-secret',
        color: 'bg-[#84CC16]'
    },
];

const MapaFlujoCookies = () => {
    const [activo, setActivo] = useState(0);
    const nodo = FLUJO[activo];

    return (
        <div className="relative">
            <section className="relative z-10 py-4">
                <CircuitBackground />
                <div className="container mx-auto px-6 max-w-7xl relative z-20">
                    <div className="text-center mb-4 relative z-10">
                        <span className="inline-block py-1.5 px-4 rounded-full bg-[#171717]/10 text-[#171717] text-[10px] font-black tracking-widest uppercase mb-4 border border-[#171717]/20">
                            <i className="fas fa-network-wired text-[#171717] mr-1"></i> Cómo Viajan los Datos
                        </span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading text-[#171717] mb-3 leading-tight">
                            El <span className="relative inline-block text-[#A3E635]">
                                recorrido
                                <svg className="absolute w-full h-3 -bottom-1.5 left-0 z-[-1] text-amber-500 drop-shadow-[0_0_8px_rgba(163,230,53,0.55)]" viewBox="0 0 200 12" preserveAspectRatio="none" fill="none"><path d="M8,8 C22,5 38,7.5 55,7.5 C130,7.5 165,7.5 188,7.5 C194,7.5 198,6 196,7.5" stroke="currentColor" strokeWidth="7" strokeLinecap="round"/></svg>
                            </span>
                        </h2>
                        <p className="text-[#1F2937] font-medium max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
                            Tocá cada nodo para recorrer el viaje de tus datos.
                        </p>
                    </div>

                    <div className="bg-white rounded-[2rem] ring-1 ring-orange-100 shadow-xl shadow-orange-950/5 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#A3E635] via-[#171717] to-[#A3E635]"></div>
                        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[#A3E635]/10 blur-3xl animate-float-slow pointer-events-none"></div>

                        <div className="relative z-10 p-5 sm:p-7">
                            {/* Nodos circulares clickeables */}
                            <div className="relative">
                                <div className="absolute top-8 left-[8%] right-[8%] hidden md:block h-1 bg-gradient-to-r from-[#A3E635] via-[#171717] to-[#84CC16] opacity-30"></div>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {FLUJO.map((n, i) => {
                                        const isActive = activo === i;
                                        return (
                                            <button
                                                key={i}
                                                onClick={() => setActivo(i)}
                                                className="relative flex flex-col items-center gap-2 group"
                                            >
                                                <div className={`relative z-10 w-16 h-16 rounded-full ${n.color} text-white flex items-center justify-center shadow-xl ring-4 ring-white transition-all duration-300 group-hover:scale-110 ${isActive ? 'scale-110 ring-[#A3E635]/40 shadow-orange-500/30' : 'opacity-70 group-hover:opacity-100'}`}>
                                                    <i className={`fas ${n.icon} text-xl`}></i>
                                                    <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[#111827] text-white text-[10px] font-black flex items-center justify-center border-2 border-white">{i + 1}</span>
                                                </div>
                                                <span className={`text-[10px] font-black tracking-wide text-center leading-tight transition-colors ${isActive ? 'text-[#A3E635]' : 'text-slate-500 group-hover:text-[#171717]'}`}>
                                                    {n.titulo}
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Panel de detalle del paso activo */}
                            <div key={activo} className={`relative mt-6 rounded-[1.5rem] overflow-hidden ${nodo.color} text-white shadow-lg animate-fade-in`}>
                                <div className="absolute top-0 left-0 w-full h-1 bg-white/40"></div>
                                <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/15 blur-3xl animate-float-slow pointer-events-none"></div>
                                <div className="absolute -bottom-12 -left-8 w-44 h-44 rounded-full bg-black/10 blur-3xl animate-float-medium pointer-events-none"></div>

                                <div className="relative z-10 p-5 sm:p-7">
                                    {/* Cabecera */}
                                    <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/25">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-2xl bg-white/20 ring-1 ring-white/40 flex items-center justify-center text-xl shadow-lg shrink-0">
                                                <i className={`fas ${nodo.icon}`}></i>
                                            </div>
                                            <div>
                                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/15 border border-white/25 text-[8px] font-black uppercase tracking-widest mb-1">
                                                    <i className="fas fa-flag text-amber-300 text-[8px]"></i>{nodo.etiqueta}
                                                </span>
                                                <h3 className="text-lg font-black font-heading leading-tight">{nodo.titulo}</h3>
                                            </div>
                                        </div>
                                        <span className="text-[10px] font-black uppercase tracking-widest opacity-80">
                                            Paso {activo + 1}/{FLUJO.length}
                                        </span>
                                    </div>

                                    {/* Tres columnas centradas */}
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
                                        {/* Col 1: descripción */}
                                        <div className="text-center">
                                            <div className="w-9 h-9 rounded-xl bg-white/15 border border-white/25 flex items-center justify-center mx-auto mb-2">
                                                <i className="fas fa-comment-dots text-amber-300 text-sm"></i>
                                            </div>
                                            <p className="text-[9px] font-black uppercase tracking-widest opacity-70 mb-1">Qué pasa</p>
                                            <p className="text-[12px] font-semibold text-white/95 leading-snug">{nodo.desc}</p>
                                        </div>

                                        {/* Col 2: detalle */}
                                        <div className="text-center border-t sm:border-t-0 sm:border-x border-white/20 pt-4 sm:pt-0 sm:px-4">
                                            <div className="w-9 h-9 rounded-xl bg-white/15 border border-white/25 flex items-center justify-center mx-auto mb-2">
                                                <i className="fas fa-lightbulb text-amber-300 text-sm"></i>
                                            </div>
                                            <p className="text-[9px] font-black uppercase tracking-widest opacity-70 mb-1">Dato clave</p>
                                            <p className="text-[12px] font-semibold text-white/95 leading-snug">{nodo.detalle}</p>
                                        </div>

                                        {/* Col 3: estado */}
                                        <div className="text-center">
                                            <div className="w-9 h-9 rounded-xl bg-white/15 border border-white/25 flex items-center justify-center mx-auto mb-2">
                                                <i className={`fas ${nodo.statIcon} text-amber-300 text-sm`}></i>
                                            </div>
                                            <p className="text-[9px] font-black uppercase tracking-widest opacity-70 mb-1">Estado</p>
                                            <p className="text-[12px] font-black uppercase tracking-wider leading-snug">{nodo.stat}</p>
                                        </div>
                                    </div>

                                    {/* Pie: chips */}
                                    <div className="flex flex-wrap justify-center gap-1.5 pt-4 border-t border-white/25">
                                        {nodo.chips.map((chip, j) => (
                                            <span key={j} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 border border-white/25 text-[8px] font-black uppercase tracking-wider">
                                                <i className="fas fa-check text-amber-300 text-[8px]"></i>{chip}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default MapaFlujoCookies;
