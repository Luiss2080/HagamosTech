import React, { useState } from 'react';
import CircuitBackground from '../../../components/fondos/FondoSaltenas';

const ACUERDOS = [
    {
        icon: 'fa-user-check',
        titulo: 'Uso del sitio web',
        ejemplo: 'Cómo podés usar nuestra plataforma.',
        detalles: 'Este sitio es para uso personal y no comercial. Podés navegar, explorar el menú y realizar pedidos. Prohibido copiar, reproducir o explotar comercialmente nuestro contenido sin autorización.',
        items: ['Uso personal', 'Explorar menú', 'Realizar pedidos', 'Prohibida la copia'],
        color: 'bg-[#FF4D00]',
        soft: 'bg-[#FF4D00]/10 text-[#FF4D00] border-[#FF4D00]/25'
    },
    {
        icon: 'fa-drumstick-bite',
        titulo: 'Pedidos y Disponibilidad',
        ejemplo: 'Cómo funcionan los pedidos online.',
        detalles: 'Los pedidos se confirman según la disponibilidad del día. Todos nuestros productos se preparan de forma artesanal al momento, por lo que el tiempo de preparación puede variar según la demanda.',
        items: ['Confirmación previa', 'Disponibilidad diaria', 'Preparación artesanal', 'Tiempo variable'],
        color: 'bg-[#5D3A1F]',
        soft: 'bg-[#5D3A1F]/10 text-[#5D3A1F] border-[#5D3A1F]/25'
    },
    {
        icon: 'fa-motorcycle',
        titulo: 'Delivery y Entrega',
        ejemplo: 'Condiciones del servicio de envío.',
        detalles: 'El delivery cubre la zona urbana de Santa Cruz. Los tiempos estimados son orientativos y pueden variar por tráfico o clima. El pedido debe ser recibido por una persona mayor de edad.',
        items: ['Cobertura urbana', 'Tiempo estimado', 'Entrega segura', 'Recepción responsable'],
        color: 'bg-[#8B4513]',
        soft: 'bg-[#8B4513]/10 text-[#8B4513] border-[#8B4513]/25'
    },
    {
        icon: 'fa-mobile-screen-button',
        titulo: 'Cuenta de Usuario',
        ejemplo: 'Responsabilidades de tu cuenta.',
        detalles: 'Sos responsable de mantener la confidencialidad de tus credenciales de acceso. Cualquier actividad realizada con tu cuenta es tu responsabilidad. Podés eliminar tu cuenta cuando quieras.',
        items: ['Credenciales seguras', 'Responsabilidad propia', 'Eliminación libre', 'Soporte 24/7'],
        color: 'bg-[#CC3D00]',
        soft: 'bg-[#CC3D00]/10 text-[#CC3D00] border-[#CC3D00]/25'
    },
];

const AcuerdosUso = () => {
    const [abierta, setAbierta] = useState(null);

    return (
        <div className="relative">
            <section className="relative z-10 py-4">
                <CircuitBackground />
                <div className="container mx-auto px-6 max-w-7xl relative z-20">
                    <div className="text-center mb-4 relative z-10">
                        <span className="inline-block py-1.5 px-4 rounded-full bg-[#5D3A1F]/10 text-[#5D3A1F] text-[10px] font-black tracking-widest uppercase mb-4 border border-[#5D3A1F]/20">
                            <i className="fas fa-file-contract text-[#5D3A1F] mr-1"></i> Acuerdos de Uso
                        </span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading text-[#8B4513] mb-3 leading-tight">
                            Condiciones <span className="relative inline-block text-[#FF4D00]">
                                generales
                                <svg className="absolute w-full h-3 -bottom-1.5 left-0 z-[-1] text-amber-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.55)]" viewBox="0 0 200 12" preserveAspectRatio="none" fill="none"><path d="M8,8 C22,5 38,7.5 55,7.5 C130,7.5 165,7.5 188,7.5 C194,7.5 198,6 196,7.5" stroke="currentColor" strokeWidth="7" strokeLinecap="round"/></svg>
                            </span>
                        </h2>
                        <p className="text-[#1F2937] font-medium max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
                            Tocá cada cláusula para conocer los detalles de uso del servicio.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
                        {/* Columna izquierda: resumen visual */}
                        <div className="lg:col-span-4 flex flex-col gap-4">
                            <div className="bg-white rounded-[2rem] ring-1 ring-orange-100 shadow-xl shadow-orange-950/5 relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FF4D00] via-[#8B4513] to-[#FF4D00]"></div>
                                <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-[#FF4D00]/10 blur-3xl animate-float-slow pointer-events-none"></div>

                                <div className="relative z-10 p-5">
                                    <div className="flex items-center gap-3 mb-4 pb-3 border-b border-dashed border-orange-100">
                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF4D00] to-[#CC3D00] text-white flex items-center justify-center shadow-lg">
                                            <i className="fas fa-file-contract text-lg"></i>
                                        </div>
                                        <div>
                                            <p className="text-sm font-black font-heading text-[#8B4513] leading-tight">Contrato de Servicio</p>
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
                                                    className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-all duration-300 ${isOpen ? `${cl.soft} shadow-sm scale-[1.01]` : 'bg-white border-orange-50 hover:border-orange-100 hover:bg-[#FFFDF9]'}`}
                                                >
                                                    <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-xs shrink-0 ${isOpen ? `${cl.color} text-white shadow-md` : 'bg-[#FFF6F6] text-[#8B4513]'}`}>
                                                        {i + 1}
                                                    </span>
                                                    <div className="flex-1 min-w-0">
                                                        <p className={`text-[11px] font-black truncate ${isOpen ? 'text-[#FF4D00]' : 'text-[#111827]'}`}>{cl.titulo}</p>
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
                                    <div key={i} className={`relative rounded-[2rem] overflow-hidden transition-all duration-300 ${isOpen ? 'bg-white shadow-xl ring-2 ring-orange-100' : 'bg-white ring-1 ring-orange-100 shadow-md hover:shadow-lg'}`}>
                                        <div className={`absolute top-0 left-0 w-full h-1 ${cl.color}`}></div>
                                        <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-[#FF4D00]/10 blur-3xl animate-float-slow pointer-events-none"></div>

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
                                            <span className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all ${isOpen ? `${cl.color} text-white border-transparent rotate-180` : 'border-orange-100 text-[#FF4D00]'}`}>
                                                <i className="fas fa-chevron-down text-[10px]"></i>
                                            </span>
                                        </button>

                                        {isOpen && (
                                            <div className="relative px-5 pb-5 pl-[76px] animate-fade-in">
                                                <div className="mb-3 border-t border-dashed border-orange-100 pt-3">
                                                    <p className="text-[12px] text-[#374151] font-semibold leading-relaxed">{cl.detalles}</p>
                                                </div>
                                                <div className="flex flex-wrap gap-1.5">
                                                    {cl.items.map((item, j) => (
                                                        <span key={j} className="px-3 py-1 rounded-full bg-[#FFF6F6] text-[#8B4513] text-[10px] font-black uppercase tracking-wider border border-orange-100">
                                                            <i className="fas fa-circle-check text-[#FF4D00] text-[9px] mr-1"></i>{item}
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
                        <div className="bg-gradient-to-r from-[#8B4513] via-[#5D3A1F] to-[#452A16] rounded-[2rem] relative overflow-hidden shadow-xl shadow-[#5D3A1F]/25">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FF4D00] via-amber-300 to-[#FF4D00]"></div>
                            <div className="absolute -top-10 right-[10%] w-40 h-40 rounded-full bg-[#FF4D00]/20 blur-3xl animate-float-slow pointer-events-none"></div>
                            <div className="absolute -bottom-12 left-[10%] w-44 h-44 rounded-full bg-black/15 blur-3xl animate-float-medium pointer-events-none"></div>

                            <div className="relative z-10 px-6 sm:px-8 py-6 flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                                <div className="w-14 h-14 rounded-2xl bg-white/15 border border-white/25 flex items-center justify-center shrink-0 shadow-lg">
                                    <i className="fas fa-circle-info text-amber-300 text-xl"></i>
                                </div>
                                <div className="flex-1 text-center sm:text-left">
                                    <p className="text-[11px] font-black uppercase tracking-widest text-amber-300 mb-1">Sabías que...</p>
                                    <p className="text-[13px] text-white/90 font-semibold leading-relaxed">
                                        Al hacer tu primer pedido aceptás automáticamente estas condiciones. Podés consultarlas cuando quieras desde esta página.
                                    </p>
                                </div>
                                <span className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/10 border border-white/20 text-[9px] font-black uppercase tracking-widest text-amber-300 shrink-0">
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
