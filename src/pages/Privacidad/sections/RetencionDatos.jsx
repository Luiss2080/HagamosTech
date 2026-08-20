import React, { useState } from 'react';
import CircuitBackground from '../../../components/fondos/FondoTech';

const RETENCION = [
    { icon: 'fa-id-card', titulo: 'Datos de cuenta', detalle: 'Nombre, email y preferencias', duracion: 'Mientras tu cuenta esté activa', dias: 100, color: 'from-[#A3E635] to-[#84CC16]', nota: 'Se eliminan al cerrar tu cuenta.', items: ['Nombre y email', 'Preferencias', 'Configuración'] },
    { icon: 'fa-receipt', titulo: 'Historial de compras', detalle: 'Pedidos y facturas', duracion: '5 años (obligación fiscal)', dias: 75, color: 'from-[#0A0A0A] to-[#171717]', nota: 'Por requisito legal de facturación.', items: ['Pedidos', 'Facturas', 'NIT'] },
    { icon: 'fa-envelope', titulo: 'Comunicaciones', detalle: 'Emails y WhatsApp', duracion: '2 años', dias: 50, color: 'from-[#171717] to-[#6B3410]', nota: 'Se purgan automáticamente.', items: ['Emails', 'Chats', 'Alertas'] },
    { icon: 'fa-cookie-bite', titulo: 'Cookies', detalle: 'Preferencias de navegación', duracion: '30 días', dias: 25, color: 'from-[#84CC16] to-[#AA3000]', nota: 'Renovables con cada visita.', items: ['Preferencias', 'Sesión', 'Analítica'] },
];

const RetencionDatos = () => {
    const [active, setActive] = useState(0);
    const actual = RETENCION[active];

    return (
        <div className="relative">
            <section className="relative z-10 py-4">
                <CircuitBackground />
                <div className="container mx-auto px-6 max-w-7xl relative z-20">
                    <div className="text-center mb-4 relative z-10">
                        <span className="inline-block py-1.5 px-4 rounded-full bg-[#0A0A0A]/10 text-[#0A0A0A] text-[10px] font-black tracking-widest uppercase mb-4 border border-[#0A0A0A]/20">
                            <i className="fas fa-hourglass-half text-[#0A0A0A] mr-1"></i> Retención de Datos
                        </span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading text-[#171717] mb-3 leading-tight">
                            ¿Cuánto guardamos <span className="relative inline-block text-[#A3E635]">
                                tus datos?
                                <svg className="absolute w-full h-3 -bottom-1.5 left-0 z-[-1] text-amber-500 drop-shadow-[0_0_8px_rgba(163,230,53,0.55)]" viewBox="0 0 200 12" preserveAspectRatio="none" fill="none"><path d="M8,8 C22,5 38,7.5 55,7.5 C130,7.5 165,7.5 188,7.5 C194,7.5 198,6 196,7.5" stroke="currentColor" strokeWidth="7" strokeLinecap="round"/></svg>
                            </span>
                        </h2>
                        <p className="text-[#1F2937] font-medium max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
                            Tocá cada tipo de dato para ver por cuánto tiempo lo conservamos.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
                        {/* Selector (5 cols) */}
                        <div className="lg:col-span-5 flex flex-col gap-2.5">
                            {RETENCION.map((r, i) => {
                                const isActive = active === i;
                                return (
                                    <button
                                        key={i}
                                        onClick={() => setActive(i)}
                                        className={`relative flex items-center gap-3 p-3.5 rounded-2xl text-left transition-all duration-300 ${
                                            isActive ? 'bg-white shadow-lg shadow-orange-950/10 ring-2 ring-[#A3E635]/40 scale-[1.01]' : 'bg-white/60 border border-orange-50 hover:bg-white hover:shadow-md'
                                        }`}
                                    >
                                        <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${r.color} flex items-center justify-center text-white text-lg shrink-0 shadow-md group-hover:scale-105 transition-transform`}>
                                            <i className={`fas ${r.icon}`}></i>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className={`font-black text-sm ${isActive ? 'text-[#A3E635]' : 'text-[#111827]'}`}>{r.titulo}</p>
                                            <p className="text-[10px] text-slate-500 font-semibold truncate">{r.detalle}</p>
                                        </div>
                                        <div className="text-right shrink-0">
                                            <p className={`text-sm font-black font-heading ${isActive ? 'text-[#A3E635]' : 'text-[#171717]'}`}>{r.dias}%</p>
                                            <p className="text-[8px] font-black uppercase tracking-wider text-slate-400">duración</p>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Detalle (7 cols) */}
                        <div className="lg:col-span-7 bg-white rounded-[2rem] ring-1 ring-orange-100 shadow-xl shadow-orange-950/5 relative overflow-hidden flex flex-col">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#A3E635] via-[#171717] to-[#A3E635]"></div>
                            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[#A3E635]/10 blur-3xl animate-float-slow pointer-events-none"></div>
                            <div className="absolute -bottom-12 -left-8 w-44 h-44 rounded-full bg-[#0A0A0A]/10 blur-3xl animate-float-medium pointer-events-none"></div>

                            <div className="relative z-10 p-6 sm:p-8 flex flex-col flex-1">
                                <div className="flex items-center gap-4 mb-5 pb-4 border-b border-dashed border-orange-100">
                                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${actual.color} flex items-center justify-center text-white text-2xl shrink-0 shadow-lg`}>
                                        <i className={`fas ${actual.icon}`}></i>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-black font-heading text-[#111827]">{actual.titulo}</h3>
                                        <p className="text-[11px] text-slate-600 font-semibold">{actual.detalle}</p>
                                    </div>
                                    <span className="ml-auto inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFFFFF] text-[#171717] text-[9px] font-black uppercase tracking-widest border border-orange-100 shrink-0">
                                        <i className="fas fa-clock text-[#A3E635]"></i>{actual.duracion}
                                    </span>
                                </div>

                                {/* Barra de duración */}
                                <div className="mb-5">
                                    <div className="flex items-center justify-between text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1.5">
                                        <span><i className="fas fa-hourglass-start text-[#A3E635] mr-1"></i>Inicio</span>
                                        <span><i className="fas fa-hourglass-end text-[#A3E635] mr-1"></i>Purgado</span>
                                    </div>
                                    <div className="h-4 rounded-full bg-gray-100 overflow-hidden border border-orange-50">
                                        <div className={`h-full rounded-full bg-gradient-to-r ${actual.color} transition-all duration-700 relative`} style={{ width: `${actual.dias}%` }}>
                                            <span className="absolute inset-y-0 right-1 flex items-center text-[8px] font-black text-white">{actual.dias}%</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
                                    {actual.items.map((item, j) => (
                                        <span key={j} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FFFFFF] border border-orange-100 text-[#171717] text-[10px] font-black uppercase tracking-wider">
                                            <i className="fas fa-circle-check text-[#A3E635] text-[9px]"></i>{item}
                                        </span>
                                    ))}
                                </div>

                                <div className="mt-auto flex items-start gap-3 p-4 rounded-2xl bg-[#FFFFFF] border border-orange-100">
                                    <div className="w-8 h-8 rounded-lg bg-white border border-orange-100 text-[#A3E635] flex items-center justify-center shrink-0 shadow-sm">
                                        <i className="fas fa-info-circle text-sm"></i>
                                    </div>
                                    <p className="text-[12px] text-[#374151] font-semibold leading-relaxed">{actual.nota}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default RetencionDatos;
