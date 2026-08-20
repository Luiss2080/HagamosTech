import React, { useState } from 'react';
import CircuitBackground from '../../../components/fondos/FondoSaltenas';

const TIPOS_COOKIES = [
    { id: 'esenciales', icon: 'fa-lock', titulo: 'Esenciales', desc: 'Necesarias para que el sitio funcione: carrito, sesión y seguridad.', color: 'bg-[#A3E635]', soft: 'bg-[#A3E635]/10 text-[#A3E635] border-[#A3E635]/25', obligatoria: true },
    { id: 'funcionales', icon: 'fa-magic-wand-sparkles', titulo: 'Funcionales', desc: 'Recuerdan tus preferencias: idioma, zona y configuración.', color: 'bg-[#0A0A0A]', soft: 'bg-[#0A0A0A]/5 text-[#0A0A0A] border-[#0A0A0A]/15', obligatoria: false },
    { id: 'analiticas', icon: 'fa-chart-line', titulo: 'Analíticas', desc: 'Nos ayudan a entender cómo usás el sitio para mejorarlo.', color: 'bg-[#171717]', soft: 'bg-[#171717]/10 text-[#171717] border-[#171717]/25', obligatoria: false },
    { id: 'publicidad', icon: 'fa-bullhorn', titulo: 'Publicidad', desc: 'Muestran promociones relevantes según tus gustos.', color: 'bg-[#84CC16]', soft: 'bg-[#84CC16]/10 text-[#84CC16] border-[#84CC16]/25', obligatoria: false },
];

const GestorConsentimiento = () => {
    const [estados, setEstados] = useState({ esenciales: true, funcionales: true, analiticas: false, publicidad: false });
    const [guardado, setGuardado] = useState(false);

    const toggle = (id) => {
        if (id === 'esenciales') return;
        setEstados(prev => ({ ...prev, [id]: !prev[id] }));
        setGuardado(false);
    };

    const aceptadas = Object.values(estados).filter(Boolean).length;
    const total = Object.keys(estados).length;
    const porcentaje = Math.round((aceptadas / total) * 100);

    const guardar = () => {
        setGuardado(true);
        setTimeout(() => setGuardado(false), 2500);
    };

    return (
        <div className="relative">
            <section className="relative z-10 py-4">
                <CircuitBackground />
                <div className="container mx-auto px-6 max-w-7xl relative z-20">
                    <div className="text-center mb-4 relative z-10">
                        <span className="inline-block py-1.5 px-4 rounded-full bg-[#A3E635]/10 text-[#A3E635] text-[10px] font-black tracking-widest uppercase mb-4 border border-[#A3E635]/20">
                            <i className="fas fa-sliders text-[#A3E635] mr-1"></i> Tu Panel de Control
                        </span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading text-[#171717] mb-3 leading-tight">
                            Gestioná tus <span className="relative inline-block text-[#A3E635]">
                                cookies
                                <svg className="absolute w-full h-3 -bottom-1.5 left-0 z-[-1] text-amber-500 drop-shadow-[0_0_8px_rgba(163,230,53,0.55)]" viewBox="0 0 200 12" preserveAspectRatio="none" fill="none"><path d="M8,8 C22,5 38,7.5 55,7.5 C130,7.5 165,7.5 188,7.5 C194,7.5 198,6 196,7.5" stroke="currentColor" strokeWidth="7" strokeLinecap="round"/></svg>
                            </span>
                        </h2>
                        <p className="text-[#1F2937] font-medium max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
                            Activá o desactivá cada tipo con un toque. Las esenciales no se pueden desactivar porque el sitio las necesita.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
                        {/* Barra de progreso */}
                        <div className="lg:col-span-5">
                            <div className="bg-white rounded-[2rem] ring-1 ring-orange-100 shadow-xl shadow-orange-950/5 relative overflow-hidden h-full flex flex-col">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#A3E635] via-[#171717] to-[#A3E635]"></div>
                                <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[#A3E635]/10 blur-3xl animate-float-slow pointer-events-none"></div>
                                <div className="absolute -bottom-12 -left-8 w-44 h-44 rounded-full bg-[#0A0A0A]/10 blur-3xl animate-float-medium pointer-events-none"></div>

                                <div className="relative z-10 p-6 flex flex-col flex-1">
                                    {/* Escudo de estado */}
                                    <div className="flex flex-col items-center text-center mb-5 pb-4 border-b border-dashed border-orange-100">
                                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#A3E635] to-[#84CC16] text-white flex items-center justify-center text-3xl shadow-lg shadow-orange-500/25 mb-3">
                                            <i className="fas fa-shield-halved"></i>
                                        </div>
                                        <h3 className="text-sm font-black font-heading text-[#171717]">Nivel de privacidad</h3>
                                        <p className="text-[10px] text-slate-500 font-semibold mt-1">{aceptadas} de {total} cookies activas</p>
                                    </div>

                                    {/* Porcentaje */}
                                    <div className="text-center mb-4">
                                        <span className="text-4xl font-black font-heading text-[#A3E635]">{porcentaje}%</span>
                                        <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mt-1">Tu control total</p>
                                    </div>

                                    <div className="mb-4">
                                        <div className="h-3.5 rounded-full bg-orange-100 overflow-hidden border border-orange-50">
                                            <div className="h-full rounded-full bg-gradient-to-r from-[#A3E635] to-[#171717] transition-all duration-700" style={{ width: `${porcentaje}%` }}></div>
                                        </div>
                                    </div>

                                    <p className="text-[11px] text-[#374151] font-semibold leading-relaxed mb-4 text-center">
                                        {porcentaje <= 50 ? 'Modo estricto: solo lo esencial. Tu privacidad es prioridad.' : porcentaje <= 75 ? 'Equilibrado: funciones esenciales y preferencias activas.' : 'Experiencia completa: todo activado para el mejor servicio.'}
                                    </p>

                                    {/* Estado actual */}
                                    <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#FFFFFF] border border-orange-100 mb-4">
                                        <div className="w-9 h-9 rounded-lg bg-white border border-orange-100 text-[#A3E635] flex items-center justify-center shrink-0">
                                            <i className="fas fa-circle-check text-sm"></i>
                                        </div>
                                        <div>
                                            <p className="text-[8px] font-black uppercase tracking-widest text-slate-400">Modo actual</p>
                                            <p className="text-[11px] font-black text-[#111827]">{porcentaje <= 50 ? 'Estricto' : porcentaje <= 75 ? 'Equilibrado' : 'Completo'}</p>
                                        </div>
                                    </div>

                                    <div className="mt-auto pt-4 border-t border-dashed border-orange-100 grid grid-cols-2 gap-2.5">
                                        <button onClick={guardar} className="inline-flex items-center justify-center gap-2 py-3 rounded-full bg-[#A3E635] hover:bg-[#84CC16] text-white font-black text-[9px] uppercase tracking-[0.15em] shadow-lg shadow-orange-500/20 hover:shadow-xl hover:-translate-y-0.5 active:scale-95 transition-all">
                                            <i className="fas fa-check text-xs"></i> Guardar
                                        </button>
                                        <button onClick={() => setEstados({ esenciales: true, funcionales: false, analiticas: false, publicidad: false })} className="inline-flex items-center justify-center gap-2 py-3 rounded-full bg-[#0A0A0A] hover:bg-[#171717] text-white font-black text-[9px] uppercase tracking-[0.15em] shadow-lg transition-all hover:-translate-y-0.5 active:scale-95">
                                            <i className="fas fa-shield-halved text-xs"></i> Solo esenciales
                                        </button>
                                    </div>

                                    {guardado && (
                                        <div className="mt-3">
                                            <div className="flex items-center gap-2 p-3 rounded-xl bg-green-50 border border-green-200 text-green-700 text-xs font-bold animate-fade-in">
                                                <i className="fas fa-circle-check"></i> ¡Preferencias guardadas!
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Switches */}
                        <div className="lg:col-span-7">
                            <div className="bg-white rounded-[2rem] ring-1 ring-orange-100 shadow-xl shadow-orange-950/5 relative overflow-hidden h-full">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#A3E635] via-[#171717] to-[#A3E635] opacity-70"></div>
                                <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[#0A0A0A]/10 blur-3xl animate-float-slow pointer-events-none"></div>

                                <div className="relative z-10 p-5 sm:p-6">
                                    <div className="flex items-center gap-3 mb-4 pb-3 border-b border-dashed border-orange-100">
                                        <div className="w-10 h-10 rounded-xl bg-[#A3E635]/10 text-[#A3E635] flex items-center justify-center shadow-sm">
                                            <i className="fas fa-cookie-bite text-lg"></i>
                                        </div>
                                        <div>
                                            <p className="text-sm font-black font-heading text-[#171717] leading-tight">Tipos de cookies</p>
                                            <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Personalizá tu experiencia</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-2.5">
                                        {TIPOS_COOKIES.map((c) => (
                                            <div key={c.id} className={`flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 ${estados[c.id] ? 'bg-[#FFFDF9] border-orange-100 shadow-sm' : 'bg-white border-orange-50'}`}>
                                                <div className={`w-12 h-12 rounded-2xl ${c.color} text-white flex items-center justify-center text-xl shrink-0 shadow-lg`}>
                                                    <i className={`fas ${c.icon}`}></i>
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2">
                                                        <h3 className="font-black text-[#111827] text-sm">{c.titulo}</h3>
                                                        <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-wider ${c.obligatoria ? 'bg-[#A3E635]/10 text-[#A3E635] border border-[#A3E635]/15' : c.soft}`}>
                                                            {c.obligatoria ? 'Siempre activas' : estados[c.id] ? 'Activa' : 'Inactiva'}
                                                        </span>
                                                    </div>
                                                    <p className="text-[11px] text-slate-600 font-semibold mt-0.5">{c.desc}</p>
                                                </div>
                                                <button
                                                    onClick={() => toggle(c.id)}
                                                    disabled={c.obligatoria}
                                                    className={`relative w-14 h-8 rounded-full transition-colors duration-300 shrink-0 ${estados[c.id] ? 'bg-[#A3E635]' : 'bg-gray-300'} ${c.obligatoria ? 'cursor-not-allowed opacity-90' : 'cursor-pointer'}`}
                                                    aria-label={`Toggle ${c.titulo}`}
                                                >
                                                    <span className={`absolute top-1 w-6 h-6 rounded-full bg-white shadow-md transition-all duration-300 ${estados[c.id] ? 'left-7' : 'left-1'}`}></span>
                                                </button>
                                            </div>
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

export default GestorConsentimiento;
