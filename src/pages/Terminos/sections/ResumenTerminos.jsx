import React from 'react';
import FondoTech from '../../../components/fondos/FondoTech';

const RESUMEN = [
    { icon: 'fa-file-signature', titulo: 'Uso informado', desc: 'Al navegar el sitio o enviar una solicitud, aceptás las condiciones de uso.', dato: 'CONDICIONES DE USO' },
    { icon: 'fa-lightbulb', titulo: 'Alcance conversado', desc: 'Definimos cada proyecto según la necesidad y la propuesta acordada.', dato: 'PROYECTOS A MEDIDA' },
    { icon: 'fa-hand-holding-dollar', titulo: 'Condiciones claras', desc: 'La modalidad y los pagos se acuerdan antes de iniciar el trabajo.', dato: 'ACUERDO PREVIO' },
    { icon: 'fa-rotate', titulo: 'Entregables definidos', desc: 'La propuesta especifica qué incluye el servicio y su seguimiento.', dato: 'PROPUESTA DEL SERVICIO' },
];

const ResumenTerminos = () => {
    return (
        <div className="relative">
            <section className="relative z-10 py-4">
                <FondoTech />
                <div className="container mx-auto px-6 max-w-7xl relative z-20">
                    <div className="text-center mb-4 relative z-10">
                        <span className="inline-block py-1.5 px-4 rounded-full bg-[#A3E635]/10 text-[#84CC16] text-[10px] font-black tracking-widest uppercase mb-4 border border-[#A3E635]/20">
                            <i className="fas fa-check-double text-[#84CC16] mr-1"></i> Lo Esencial
                        </span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading text-[#0A0A0A] mb-3 leading-tight">
                            En resumen, estas <span className="relative inline-block text-[#84CC16]">
                                reglas
                                <svg className="absolute w-full h-3 -bottom-1.5 left-0 z-[-1] text-[#A3E635] drop-shadow-[0_0_8px_rgba(163,230,53,0.55)]" viewBox="0 0 200 12" preserveAspectRatio="none" fill="none"><path d="M8,8 C22,5 38,7.5 55,7.5 C130,7.5 165,7.5 188,7.5 C194,7.5 198,6 196,7.5" stroke="currentColor" strokeWidth="7" strokeLinecap="round"/></svg>
                            </span>
                        </h2>
                        <p className="text-slate-600 font-medium max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
                            Cuatro puntos clave que resumen las condiciones de uso del servicio.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {RESUMEN.map((item, i) => (
                            <article key={i} className="relative rounded-[1.75rem] min-h-64 p-6 transition-all duration-300 group overflow-hidden border border-[#A3E635]/20 hover:border-[#A3E635]/50 hover:-translate-y-1 z-10 text-center bg-[#0c100a] text-white shadow-xl shadow-black/30">
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-1 rounded-full bg-[#A3E635]"></div>
                                <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-[#A3E635]/10 blur-2xl pointer-events-none"></div>
                                <div className="relative z-10">
                                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-4 mx-auto bg-[#A3E635]/10 text-[#A3E635] ring-1 ring-[#A3E635]/30 shadow-lg group-hover:scale-110 transition-transform duration-300">
                                        <i className={`fas ${item.icon}`}></i>
                                    </div>
                                    <h3 className="text-lg font-black mb-2 leading-tight text-white">{item.titulo}</h3>
                                    <p className="text-sm font-medium text-slate-300 leading-relaxed">{item.desc}</p>
                                    <div className="mt-4 pt-3 border-t border-[#A3E635]/20 inline-flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-[#B7F34B]">
                                        <i className="fas fa-circle-check text-[9px]"></i> {item.dato}
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ResumenTerminos;
