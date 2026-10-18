import React from 'react';
import CircuitBackground from '../../../components/fondos/FondoTech';

const ALMACENAMIENTO = [
    {
        icon: 'fa-key',
        titulo: 'Cookie de autenticación',
        estado: 'Se usa al iniciar sesión',
        detalle: 'Permite que las funciones de cuenta reconozcan tu acceso.',
        color: 'bg-[#A3E635]',
    },
    {
        icon: 'fa-window-maximize',
        titulo: 'Almacenamiento de sesión',
        estado: 'Temporal en el navegador',
        detalle: 'La sesión guarda el token, la actividad y datos del perfil mientras usás la cuenta.',
        color: 'bg-[#0A0A0A]',
    },
    {
        icon: 'fa-sliders',
        titulo: 'Almacenamiento local',
        estado: 'Hasta que lo borres',
        detalle: 'Puede guardar preferencias visuales y la foto de perfil en este navegador.',
        color: 'bg-[#171717]',
    },
    {
        icon: 'fa-chart-line',
        titulo: 'Analítica y publicidad',
        estado: 'No detectadas en la aplicación',
        detalle: 'No encontramos herramientas de analítica ni píxeles publicitarios en el código revisado.',
        color: 'bg-[#84CC16]',
    },
];

const GestorConsentimiento = () => (
    <div className="relative">
        <section className="relative z-10 py-4">
            <CircuitBackground />
            <div className="container mx-auto px-6 max-w-7xl relative z-20">
                <div className="text-center mb-4 relative z-10">
                    <span className="inline-block py-1.5 px-4 rounded-full bg-[#A3E635]/10 text-[#A3E635] text-[10px] font-black tracking-widest uppercase mb-4 border border-[#A3E635]/20">
                        <i className="fas fa-circle-info text-[#A3E635] mr-1"></i> Información del navegador
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading text-[#171717] mb-3 leading-tight">
                        Qué guarda <span className="relative inline-block text-[#A3E635]">este sitio</span>
                    </h2>
                    <p className="text-[#1F2937] font-medium max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
                        El panel muestra las tecnologías que usa la aplicación. No ofrece controles de consentimiento porque no se detectaron categorías opcionales de seguimiento.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
                    <div className="lg:col-span-5">
                        <div className="bg-white rounded-[2rem] ring-1 ring-orange-100 shadow-xl shadow-orange-950/5 relative overflow-hidden h-full flex flex-col">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#A3E635] via-[#171717] to-[#A3E635]"></div>
                            <div className="relative z-10 p-6 flex flex-col flex-1">
                                <div className="flex flex-col items-center text-center mb-5 pb-4 border-b border-dashed border-orange-100">
                                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#A3E635] to-[#84CC16] text-white flex items-center justify-center text-3xl shadow-lg shadow-orange-500/25 mb-3">
                                        <i className="fas fa-cookie-bite"></i>
                                    </div>
                                    <h3 className="text-sm font-black font-heading text-[#171717]">Uso actual</h3>
                                    <p className="text-[11px] text-slate-500 font-semibold mt-1">Sesión de cuenta y preferencias del navegador</p>
                                </div>

                                <div className="mb-4 rounded-2xl bg-[#FFFDF9] border border-orange-100 p-4">
                                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Cookie de cuenta</p>
                                    <p className="mt-1 text-sm font-bold text-[#111827]">Se crea al autenticarte</p>
                                    <p className="mt-1 text-[11px] text-slate-600 leading-relaxed">Si no usás una cuenta, las funciones de autenticación no se activan.</p>
                                </div>

                                <p className="mt-auto text-[11px] text-[#374151] font-semibold leading-relaxed text-center">
                                    Podés borrar las cookies y los datos locales desde la configuración del navegador. Al hacerlo, podrías cerrar tu sesión o restablecer preferencias.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-7">
                        <div className="bg-white rounded-[2rem] ring-1 ring-orange-100 shadow-xl shadow-orange-950/5 relative overflow-hidden h-full">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#A3E635] via-[#171717] to-[#A3E635] opacity-70"></div>
                            <div className="relative z-10 p-5 sm:p-6">
                                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-dashed border-orange-100">
                                    <div className="w-10 h-10 rounded-xl bg-[#A3E635]/10 text-[#A3E635] flex items-center justify-center shadow-sm">
                                        <i className="fas fa-cookie-bite text-lg"></i>
                                    </div>
                                    <div>
                                        <p className="text-sm font-black font-heading text-[#171717] leading-tight">Cookies y almacenamiento</p>
                                        <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Funciones observadas en la aplicación</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-2.5">
                                    {ALMACENAMIENTO.map((item) => (
                                        <article key={item.titulo} className="flex items-center gap-4 p-4 rounded-2xl border bg-[#FFFDF9] border-orange-100 shadow-sm">
                                            <div className={`w-12 h-12 rounded-2xl ${item.color} text-white flex items-center justify-center text-xl shrink-0 shadow-lg`}>
                                                <i className={`fas ${item.icon}`}></i>
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex flex-wrap items-center gap-2">
                                                    <h3 className="font-black text-[#111827] text-sm">{item.titulo}</h3>
                                                    <span className="px-2 py-0.5 rounded-full bg-[#A3E635]/10 text-[#171717] border border-[#A3E635]/20 text-[8px] font-black uppercase tracking-wider">{item.estado}</span>
                                                </div>
                                                <p className="text-[11px] text-slate-600 font-semibold mt-0.5">{item.detalle}</p>
                                            </div>
                                        </article>
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

export default GestorConsentimiento;
