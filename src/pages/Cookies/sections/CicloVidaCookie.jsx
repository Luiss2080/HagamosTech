import React from 'react';
import CircuitBackground from '../../../components/fondos/FondoSaltenas';

const FASES = [
    { icon: 'fa-cookie-bite', titulo: 'Se crea', desc: 'Cuando visitás el sitio por primera vez, el navegador guarda una cookie pequeña.', duracion: 'Milisegundos', color: 'bg-[#FF4D00]', soft: 'bg-[#FF4D00]/10 text-[#FF4D00] border-[#FF4D00]/25' },
    { icon: 'fa-person-walking', titulo: 'Viaja contigo', desc: 'Cada vez que navegás, la cookie viaja con tus peticiones para identificarte.', duracion: 'Mientras navegás', color: 'bg-[#5D3A1F]', soft: 'bg-[#5D3A1F]/10 text-[#5D3A1F] border-[#5D3A1F]/25' },
    { icon: 'fa-rotate', titulo: 'Se renueva', desc: 'Con cada visita se actualiza la fecha de expiración. Sigue vigente mientras vuelvas.', duracion: '30 días', color: 'bg-[#8B4513]', soft: 'bg-[#8B4513]/10 text-[#8B4513] border-[#8B4513]/25' },
    { icon: 'fa-hourglass-end', titulo: 'Expira', desc: 'Si no visitás el sitio en mucho tiempo, la cookie se borra automáticamente.', duracion: 'Automático', color: 'bg-[#CC3D00]', soft: 'bg-[#CC3D00]/10 text-[#CC3D00] border-[#CC3D00]/25' },
];

const CicloVidaCookie = () => {
    return (
        <div className="relative">
            <section className="relative z-10 py-4">
                <CircuitBackground />
                <div className="container mx-auto px-6 max-w-7xl relative z-20">
                    <div className="text-center mb-4 relative z-10">
                        <span className="inline-block py-1.5 px-4 rounded-full bg-[#5D3A1F]/10 text-[#5D3A1F] text-[10px] font-black tracking-widest uppercase mb-4 border border-[#5D3A1F]/20">
                            <i className="fas fa-clock-rotate-left text-[#5D3A1F] mr-1"></i> Ciclo de Vida
                        </span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading text-[#8B4513] mb-3 leading-tight">
                            El viaje de una <span className="relative inline-block text-[#FF4D00]">
                                cookie
                                <svg className="absolute w-full h-3 -bottom-1.5 left-0 z-[-1] text-amber-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.55)]" viewBox="0 0 200 12" preserveAspectRatio="none" fill="none"><path d="M8,8 C22,5 38,7.5 55,7.5 C130,7.5 165,7.5 188,7.5 C194,7.5 198,6 196,7.5" stroke="currentColor" strokeWidth="7" strokeLinecap="round"/></svg>
                            </span>
                        </h2>
                        <p className="text-[#1F2937] font-medium max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
                            Cuatro etapas que atraviesa cada cookie desde que se crea hasta que expira.
                        </p>
                    </div>

                    <div className="relative">
                        {/* Línea conectora */}
                        <div className="absolute top-9 left-0 right-0 hidden md:block h-1 bg-gradient-to-r from-[#FF4D00] via-[#5D3A1F] to-[#CC3D00] opacity-30"></div>

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
                                        <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-[#FF4D00]/10 blur-2xl animate-float-slow pointer-events-none"></div>
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
