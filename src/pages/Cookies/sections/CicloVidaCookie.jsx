import React from 'react';
import CircuitBackground from '../../../components/fondos/FondoTech';

const FASES = [
    { icon: 'fa-cookie-bite', titulo: 'Iniciás sesión', desc: 'Al autenticarte, la aplicación puede guardar una cookie para reconocer el acceso a tu cuenta.', duracion: 'Al usar la cuenta', color: 'bg-[#A3E635]', soft: 'bg-[#A3E635]/10 text-[#A3E635] border-[#A3E635]/25' },
    { icon: 'fa-person-walking', titulo: 'Se usa en la aplicación', desc: 'El navegador envía la cookie en las solicitudes necesarias para las funciones de cuenta.', duracion: 'Según el navegador', color: 'bg-[#0A0A0A]', soft: 'bg-[#0A0A0A]/10 text-[#0A0A0A] border-[#0A0A0A]/25' },
    { icon: 'fa-hard-drive', titulo: 'Se guardan preferencias', desc: 'Algunas opciones y datos del perfil se almacenan en sessionStorage o localStorage, que son distintos de las cookies.', duracion: 'Hasta cerrar o borrar', color: 'bg-[#171717]', soft: 'bg-[#171717]/10 text-[#171717] border-[#171717]/25' },
    { icon: 'fa-trash-can', titulo: 'Podés borrar los datos locales', desc: 'Desde la configuración del navegador podés borrar cookies y almacenamiento del sitio. Eso puede cerrar tu sesión o restablecer preferencias.', duracion: 'Desde tu navegador', color: 'bg-[#84CC16]', soft: 'bg-[#84CC16]/10 text-[#84CC16] border-[#84CC16]/25' },
];

const CicloVidaCookie = () => {
    return (
        <div className="relative">
            <section className="relative z-10 py-4">
                <CircuitBackground />
                <div className="container mx-auto px-6 max-w-7xl relative z-20">
                    <div className="text-center mb-4 relative z-10">
                        <span className="inline-block py-1.5 px-4 rounded-full bg-[#0A0A0A]/10 text-[#0A0A0A] text-[10px] font-black tracking-widest uppercase mb-4 border border-[#0A0A0A]/20">
                            <i className="fas fa-clock-rotate-left text-[#0A0A0A] mr-1"></i> Ciclo de Vida
                        </span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading text-[#171717] mb-3 leading-tight">
                            Tu navegador en <span className="relative inline-block text-[#A3E635]">
                                HagamosTech
                                <svg className="absolute w-full h-3 -bottom-1.5 left-0 z-[-1] text-amber-500 drop-shadow-[0_0_8px_rgba(163,230,53,0.55)]" viewBox="0 0 200 12" preserveAspectRatio="none" fill="none"><path d="M8,8 C22,5 38,7.5 55,7.5 C130,7.5 165,7.5 188,7.5 C194,7.5 198,6 196,7.5" stroke="currentColor" strokeWidth="7" strokeLinecap="round"/></svg>
                            </span>
                        </h2>
                        <p className="text-[#1F2937] font-medium max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
                            Qué ocurre con las cookies y el almacenamiento del navegador cuando usás el sitio.
                        </p>
                    </div>

                    <div className="relative">
                        {/* Línea conectora */}
                        <div className="absolute top-9 left-0 right-0 hidden md:block h-1 bg-gradient-to-r from-[#A3E635] via-[#0A0A0A] to-[#84CC16] opacity-30"></div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                            {FASES.map((fase, i) => (
                                <div key={i} className="relative text-center group">
                                    {/* Número */}
                                    <div className={`relative z-10 w-[72px] h-[72px] rounded-full ${fase.color} text-white flex items-center justify-center mx-auto mb-4 shadow-xl ring-4 ring-white transition-transform duration-300 group-hover:scale-110`}>
                                        <i className={`fas ${fase.icon} text-2xl`}></i>
                                        <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[#111827] text-white text-[10px] font-black flex items-center justify-center border-2 border-white">{i + 1}</span>
                                    </div>
                                    <div className="relative bg-white rounded-[1.5rem] p-5 border border-orange-50 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                                        <div className={`absolute top-0 left-0 w-full h-1 ${fase.color}`}></div>
                                        <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-[#A3E635]/10 blur-2xl animate-float-slow pointer-events-none"></div>
                                        <div className="relative z-10">
                                            <span className={`inline-block px-2.5 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${fase.soft} mb-2`}>
                                                <i className="fas fa-hourglass-half mr-1 text-[8px]"></i>{fase.duracion}
                                            </span>
                                            <h3 className="font-black text-[#111827] text-base mb-1">{fase.titulo}</h3>
                                            <p className="text-[11px] text-slate-600 font-semibold leading-relaxed">{fase.desc}</p>
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

export default CicloVidaCookie;
