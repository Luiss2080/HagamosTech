import React, { useState } from 'react';
import CircuitBackground from '../../../components/fondos/FondoTech';

const DERECHOS = [
    { icon: 'fa-eye', titulo: 'Acceso', desc: 'Pedí una copia de todos los datos personales que tenemos sobre vos. Te la entregamos en un formato simple y legible.', tiempo: '10 días hábiles' },
    { icon: 'fa-pen-to-square', titulo: 'Rectificación', desc: 'Si algún dato está desactualizado o es incorrecto, podés pedirnos que lo corrijamos de inmediato.', tiempo: '5 días hábiles' },
    { icon: 'fa-trash-can', titulo: 'Eliminación', desc: 'Podés solicitar la eliminación total de tus datos personales de nuestros sistemas en cualquier momento.', tiempo: '15 días hábiles' },
    { icon: 'fa-file-export', titulo: 'Portabilidad', desc: 'Tenés derecho a recibir tus datos en un formato que puedas llevar a otro proveedor de servicio.', tiempo: '10 días hábiles' },
];

const PASOS = [
    { icon: 'fa-pen', label: 'Solicitud', desc: 'Escribinos por WhatsApp o email indicando tu derecho.' },
    { icon: 'fa-id-card', label: 'Verificación', desc: 'Confirmamos tu identidad para proteger tus datos.' },
    { icon: 'fa-circle-check', label: 'Respuesta', desc: `Te respondemos en ${DERECHOS[0].tiempo} máximo.` },
];

const DerechosUsuarios = () => {
    const [active, setActive] = useState(0);

    return (
        <div className="relative">
            <section className="relative z-10 py-4">
                <CircuitBackground />
                <div className="container mx-auto px-6 max-w-7xl relative z-20">
                    <div className="text-center mb-4 relative z-10">
                        <span className="inline-block py-1.5 px-4 rounded-full bg-[#A3E635]/10 text-[#A3E635] text-[10px] font-black tracking-widest uppercase mb-4 border border-[#A3E635]/20">
                            <i className="fas fa-scale-balanced text-[#A3E635] mr-1"></i> Tus Derechos
                        </span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading text-[#171717] mb-3 leading-tight">
                            Tenés el <span className="relative inline-block text-[#A3E635]">
                                control
                                <svg className="absolute w-full h-3 -bottom-1.5 left-0 z-[-1] text-amber-500 drop-shadow-[0_0_8px_rgba(163,230,53,0.55)]" viewBox="0 0 200 12" preserveAspectRatio="none" fill="none"><path d="M8,8 C22,5 38,7.5 55,7.5 C130,7.5 165,7.5 188,7.5 C194,7.5 198,6 196,7.5" stroke="currentColor" strokeWidth="7" strokeLinecap="round"/></svg>
                            </span>
                        </h2>
                        <p className="text-[#1F2937] font-medium max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
                            Ejercé tus derechos sobre tus datos personales cuando quieras.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 items-stretch">
                        {/* Tabs */}
                        <div className="lg:col-span-2 flex lg:flex-col gap-2.5">
                            {DERECHOS.map((d, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActive(i)}
                                    className={`relative flex items-center gap-3 p-4 rounded-2xl text-left transition-all duration-300 overflow-hidden ${
                                        active === i ? 'bg-white text-[#111827] shadow-lg shadow-orange-950/10 ring-2 ring-[#A3E635]/40 scale-[1.01]' : 'bg-white/60 text-[#111827] border border-orange-50 hover:bg-white hover:shadow-md'
                                    }`}
                                >
                                    <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#A3E635] to-[#84CC16] transition-opacity duration-300" style={{ opacity: active === i ? 1 : 0 }}></div>
                                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-lg shrink-0 transition-colors ${active === i ? 'bg-[#A3E635] text-white shadow-md shadow-orange-500/30' : 'bg-[#FFFFFF] text-[#A3E635]'}`}>
                                        <i className={`fas ${d.icon}`}></i>
                                    </div>
                                    <div>
                                        <p className={`font-black text-sm ${active === i ? 'text-[#A3E635]' : 'text-[#111827]'}`}>{d.titulo}</p>
                                        <p className={`text-[9px] font-black uppercase tracking-widest ${active === i ? 'text-slate-500' : 'text-gray-400'}`}>
                                            <i className="fas fa-stopwatch text-[#A3E635] mr-1"></i>{d.tiempo}
                                        </p>
                                    </div>
                                    {active === i && (
                                        <i className="fas fa-chevron-right text-[#A3E635] text-xs ml-auto"></i>
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* Detalle */}
                        <div className="lg:col-span-3 relative rounded-[2rem] overflow-hidden ring-4 ring-white shadow-2xl group border border-orange-50">
                            <div className={`absolute inset-0 bg-gradient-to-br ${active % 2 === 0 ? 'from-[#A3E635] to-[#84CC16]' : 'from-[#0A0A0A] to-[#171717]'} transition-colors duration-500`}></div>
                            <div className="absolute top-0 left-0 w-full h-1 bg-white/40"></div>
                            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/15 blur-3xl animate-float-slow pointer-events-none"></div>
                            <div className="absolute -bottom-12 -left-8 w-44 h-44 rounded-full bg-black/15 blur-3xl animate-float-medium pointer-events-none"></div>

                            <div className="relative z-10 p-7 sm:p-9 text-white flex flex-col min-h-[320px]">
                                <div className="flex items-center gap-4 mb-5 pb-5 border-b border-white/20">
                                    <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center text-3xl ring-1 ring-white/40 shadow-lg group-hover:scale-110 transition-transform">
                                        <i className={`fas ${DERECHOS[active].icon}`}></i>
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-black font-heading">{DERECHOS[active].titulo}</h3>
                                        <span className="inline-block px-3 py-1 rounded-full bg-white/15 text-[9px] font-black uppercase tracking-widest mt-1">
                                            <i className="fas fa-stopwatch mr-1"></i>Respuesta en {DERECHOS[active].tiempo}
                                        </span>
                                    </div>
                                </div>

                                <p className="text-white/95 font-semibold leading-relaxed text-sm sm:text-base mb-6">
                                    {DERECHOS[active].desc}
                                </p>

                                {/* Pasos */}
                                <div className="grid grid-cols-3 gap-2 mb-6">
                                    {PASOS.map((p, i) => (
                                        <div key={i} className="bg-white/10 border border-white/20 rounded-xl p-3 text-center">
                                            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center mx-auto mb-1.5">
                                                <i className={`fas ${p.icon} text-sm`}></i>
                                            </div>
                                            <p className="text-[9px] font-black uppercase tracking-widest">{p.label}</p>
                                            <p className="text-[8.5px] font-semibold text-white/70 leading-snug mt-1 hidden sm:block">{p.desc}</p>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-auto">
                                    <a href="https://wa.me/59161320004?text=Hola%20Los%20HagamosTech!%20Quiero%20ejercer%20mi%20derecho%20de%20acceso%20a%20mis%20datos" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#A3E635] rounded-full font-black text-xs uppercase tracking-[0.15em] shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-95 transition-all">
                                        <i className="fab fa-whatsapp"></i> Ejercer este derecho
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default DerechosUsuarios;
