import React, { useState } from 'react';
import FondoTech from '../../../components/fondos/FondoTech';

const ACUERDOS = [
    {
        icon: 'fa-user-check',
        titulo: 'Uso del sitio web',
        ejemplo: 'Cómo podés usar nuestra plataforma.',
        detalles: 'Este sitio es para uso personal y no comercial. Podés navegar, explorar nuestras soluciones y enviar solicitudes de proyectos. Prohibido copiar, reproducir o explotar comercialmente nuestro contenido sin autorización.',
        items: ['Uso personal', 'Explorar soluciones', 'Enviar solicitudes', 'Prohibida la copia'],
        color: 'bg-[#A3E635]',
        soft: 'bg-[#A3E635]/10 text-[#84CC16] border-[#A3E635]/25'
    },
    {
        icon: 'fa-lightbulb',
        titulo: 'Solicitudes y Disponibilidad',
        ejemplo: 'Cómo funcionan los proyectos.',
        detalles: 'Las solicitudes se confirman según el alcance acordado y la disponibilidad de agendas. Cada proyecto se analiza y propone junto con vos, por lo que los tiempos pueden variar según la complejidad.',
        items: ['Confirmación previa', 'Análisis conjunto', 'Alcance definido', 'Tiempo variable'],
        color: 'bg-[#84CC16]',
        soft: 'bg-[#84CC16]/10 text-[#84CC16] border-[#84CC16]/25'
    },
    {
        icon: 'fa-headset',
        titulo: 'Atención y Entrega',
        ejemplo: 'Condiciones de la atención.',
        detalles: 'Atendemos de forma remota y presencial en Santa Cruz. Los tiempos estimados son orientativos. La solución debe ser recibida por quien contrató el servicio para la respectiva capacitación.',
        items: ['Cobertura remota', 'Tiempo estimado', 'Entrega y capacitación', 'Recepción responsable'],
        color: 'bg-[#0A0A0A]',
        soft: 'bg-[#0A0A0A]/5 text-[#0A0A0A] border-[#0A0A0A]/15'
    },
    {
        icon: 'fa-mobile-screen-button',
        titulo: 'Cuenta de Usuario',
        ejemplo: 'Responsabilidades de tu cuenta.',
        detalles: 'Sos responsable de mantener la confidencialidad de tus credenciales de acceso. Cualquier actividad realizada con tu cuenta es tu responsabilidad. Podés eliminar tu cuenta cuando quieras.',
        items: ['Credenciales seguras', 'Responsabilidad propia', 'Eliminación libre', 'Soporte 24/7'],
        color: 'bg-[#171717]',
        soft: 'bg-[#171717]/5 text-[#171717] border-[#171717]/15'
    },
];

const AcuerdosUso = () => {
    const [abierta, setAbierta] = useState(null);

    return (
        <div className="relative">
            <section className="relative z-10 py-4">
                <FondoTech />
                <div className="container mx-auto px-6 max-w-7xl relative z-20">
                    <div className="text-center mb-4 relative z-10">
                        <span className="inline-block py-1.5 px-4 rounded-full bg-[#A3E635]/10 text-[#84CC16] text-[10px] font-black tracking-widest uppercase mb-4 border border-[#A3E635]/20">
                            <i className="fas fa-file-contract text-[#84CC16] mr-1"></i> Acuerdos de Uso
                        </span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading text-[#0A0A0A] mb-3 leading-tight">
                            Condiciones <span className="relative inline-block text-[#84CC16]">
                                generales
                                <svg className="absolute w-full h-3 -bottom-1.5 left-0 z-[-1] text-[#A3E635] drop-shadow-[0_0_8px_rgba(163,230,53,0.55)]" viewBox="0 0 200 12" preserveAspectRatio="none" fill="none"><path d="M8,8 C22,5 38,7.5 55,7.5 C130,7.5 165,7.5 188,7.5 C194,7.5 198,6 196,7.5" stroke="currentColor" strokeWidth="7" strokeLinecap="round"/></svg>
                            </span>
                        </h2>
                        <p className="text-slate-600 font-medium max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
                            Tocá cada cláusula para conocer los detalles de uso del servicio.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
                        {/* Columna izquierda: resumen visual */}
                        <div className="lg:col-span-4 flex flex-col gap-4">
                            <div className="bg-white rounded-[2rem] ring-1 ring-gray-100 shadow-xl shadow-black/5 relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#A3E635] via-[#84CC16] to-[#A3E635]"></div>
                                <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-[#A3E635]/10 blur-3xl animate-float-slow pointer-events-none"></div>

                                <div className="relative z-10 p-5">
                                    <div className="flex items-center gap-3 mb-4 pb-3 border-b border-dashed border-gray-100">
                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#A3E635] to-[#84CC16] text-[#0A0A0A] flex items-center justify-center shadow-lg">
                                            <i className="fas fa-file-contract text-lg"></i>
                                        </div>
                                        <div>
                                            <p className="text-sm font-black font-heading text-[#0A0A0A] leading-tight">Contrato de Servicio</p>
                                            <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">4 cláusulas vigentes</p>
                                        </div>
                                    </div>

                                    {/* Índice de cláusulas */}
                                    <div className="space-y-2">
                                        {ACUERDOS.map((cl, i) => {
                                            const isOpen = abierta === i;
                                            return (
                                                <button
                                                    key={i}
                                                    onClick={() => setAbierta(isOpen ? null : i)}
                                                    className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-all duration-300 ${isOpen ? `${cl.soft} shadow-sm scale-[1.01]` : 'bg-white border-gray-100 hover:border-gray-200 hover:bg-[#F8FAF5]'}`}
                                                >
                                                    <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-xs shrink-0 ${isOpen ? `${cl.color} text-white shadow-md` : 'bg-[#A3E635]/10 text-[#84CC16]'}`}>
                                                        {i + 1}
                                                    </span>
                                                    <div className="flex-1 min-w-0">
                                                        <p className={`text-[11px] font-black truncate ${isOpen ? 'text-[#84CC16]' : 'text-[#111827]'}`}>{cl.titulo}</p>
                                                        <p className="text-[8px] font-black uppercase tracking-widest text-slate-400">{cl.ejemplo}</p>
                                                    </div>
                                                    <i className={`fas fa-chevron-right text-[9px] ${isOpen ? 'rotate-90' : 'text-slate-300'} transition-all`}></i>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* Columna derecha: cláusulas desplegables de color */}
                        <div className="lg:col-span-8 flex flex-col gap-3">
                            {ACUERDOS.map((cl, i) => {
                                const isOpen = abierta === i;
                                return (
                                    <div key={i} className={`relative rounded-[2rem] overflow-hidden transition-all duration-300 ${isOpen ? 'bg-white shadow-xl ring-2 ring-[#A3E635]/20' : 'bg-white ring-1 ring-gray-100 shadow-md hover:shadow-lg'}`}>
                                        <div className={`absolute top-0 left-0 w-full h-1 ${cl.color}`}></div>
                                        <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-[#A3E635]/10 blur-3xl animate-float-slow pointer-events-none"></div>

                                        <button onClick={() => setAbierta(isOpen ? null : i)} className="relative w-full flex items-center gap-4 p-5 text-left cursor-pointer">
                                            <div className={`w-12 h-12 rounded-2xl ${cl.color} text-white flex items-center justify-center text-lg shrink-0 shadow-lg transition-transform ${isOpen ? 'scale-110 -rotate-6' : ''}`}>
                                                <i className={`fas ${cl.icon}`}></i>
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    <h3 className="font-black text-[#111827] text-sm sm:text-base">{cl.titulo}</h3>
                                                    <span className={`px-2 py-0.5 rounded-full text-[7px] font-black uppercase tracking-widest ${isOpen ? `${cl.color} text-white` : cl.soft}`}>
                                                        {isOpen ? 'Abierta' : 'Cláusula ' + (i + 1)}
                                                    </span>
                                                </div>
                                                <p className="text-[11px] text-slate-600 font-semibold">{cl.ejemplo}</p>
                                            </div>
                                            <span className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all ${isOpen ? `${cl.color} text-white border-transparent rotate-180` : 'border-gray-100 text-[#84CC16]'}`}>
                                                <i className="fas fa-chevron-down text-[10px]"></i>
                                            </span>
                                        </button>

                                        {isOpen && (
                                            <div className="relative px-5 pb-5 pl-[76px] animate-fade-in">
                                                <div className="mb-3 border-t border-dashed border-gray-100 pt-3">
                                                    <p className="text-[12px] text-slate-600 font-semibold leading-relaxed">{cl.detalles}</p>
                                                </div>
                                                <div className="flex flex-wrap gap-1.5">
                                                    {cl.items.map((item, j) => (
                                                        <span key={j} className="px-3 py-1 rounded-full bg-[#A3E635]/10 text-[#0A0A0A] text-[10px] font-black uppercase tracking-wider border border-[#A3E635]/20">
                                                            <i className="fas fa-circle-check text-[#84CC16] text-[9px] mr-1"></i>{item}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Fila completa: Sabías que... */}
                    <div className="mt-5">
                        <div className="bg-gradient-to-r from-[#0A0A0A] via-[#171717] to-[#0A0A0A] rounded-[2rem] relative overflow-hidden shadow-xl shadow-black/25">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#A3E635] via-[#84CC16] to-[#A3E635]"></div>
                            <div className="absolute -top-10 right-[10%] w-40 h-40 rounded-full bg-[#A3E635]/20 blur-3xl animate-float-slow pointer-events-none"></div>
                            <div className="absolute -bottom-12 left-[10%] w-44 h-44 rounded-full bg-black/15 blur-3xl animate-float-medium pointer-events-none"></div>

                            <div className="relative z-10 px-6 sm:px-8 py-6 flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                                <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0 shadow-lg">
                                    <i className="fas fa-circle-info text-[#A3E635] text-xl"></i>
                                </div>
                                <div className="flex-1 text-center sm:text-left">
                                    <p className="text-[11px] font-black uppercase tracking-widest text-[#A3E635] mb-1">Sabías que...</p>
                                    <p className="text-[13px] text-white/90 font-semibold leading-relaxed">
                                        Al enviar tu primera solicitud aceptás automáticamente estas condiciones. Podés consultarlas cuando quieras desde esta página.
                                    </p>
                                </div>
                                <span className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/10 border border-white/20 text-[9px] font-black uppercase tracking-widest text-[#A3E635] shrink-0">
                                    <i className="fas fa-stamp text-[10px]"></i> Aceptación automática
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AcuerdosUso;
