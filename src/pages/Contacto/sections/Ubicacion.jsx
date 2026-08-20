import React from 'react';
import FondoTech from '../../../components/fondos/FondoTech';

const Ubicacion = () => {
    const infoCards = [
        { icon: "fa-map-pin", title: "Dirección", value: "Santa Cruz, Bolivia", theme: "bg-[#A3E635] text-[#0A0A0A]", iconBg: "bg-white/20 text-[#0A0A0A]", shadow: "shadow-[#A3E635]/20", border: "border-[#A3E635]" },
        { icon: "fa-clock", title: "Horario", value: "Lun - Vie: 9:00 - 18:00", theme: "bg-[#0A0A0A] text-white", iconBg: "bg-white/10 text-white", shadow: "shadow-black/20", border: "border-[#0A0A0A]" },
        { icon: "fa-phone", title: "Contacto", value: "+591 61320004", theme: "bg-[#A3E635] text-[#0A0A0A]", iconBg: "bg-white/20 text-[#0A0A0A]", shadow: "shadow-[#A3E635]/20", border: "border-[#A3E635]" },
        { icon: "fa-envelope", title: "Email", value: "contacto@hagamostech.bo", theme: "bg-[#0A0A0A] text-white", iconBg: "bg-white/10 text-white", shadow: "shadow-black/20", border: "border-[#0A0A0A]" }
    ];

    return (
        <section id="ubicación" className="relative z-10 py-4 border-t border-[#A3E635]/15">
            <FondoTech />
            <div className="w-full px-4 sm:px-8 md:px-16 relative z-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-12 items-center">

                    {/* Left: Info (5 cols) */}
                    <div className="order-2 lg:order-1 lg:col-span-5 flex flex-col justify-center items-center h-full text-center">
                        <div className="mb-8">
                            <span className="inline-block py-1.5 px-4 rounded-full bg-[#A3E635]/10 text-[#84CC16] text-[10px] font-black tracking-widest uppercase mb-4 border border-[#A3E635]/20">
                                <i className="fas fa-map-marked-alt text-[#84CC16] mr-1"></i> Punto de Atención
                            </span>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading text-white mb-4 leading-tight">
                                Encuéntranos en nuestra <br/>
                                <span className="relative inline-block px-2 text-[#84CC16]">
                                    sede central.
                                    <svg className="absolute w-full h-3 -bottom-1 left-0 z-[-1] text-[#A3E635] opacity-80" viewBox="0 0 200 9" fill="none"><path d="M2.00025 6.99997C25.7509 4.50435 65.2536 2.07897 197.994 4.4151" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                </span>
                            </h2>
                            <p className="text-white/70 font-medium max-w-lg text-base sm:text-lg leading-relaxed">
                                Visítanos o escríbenos para conversar sobre tu proyecto, idea o necesidad. Estamos para ayudarte a convertirla en una solución real.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                            {infoCards.map((item, i) => (
                                <div key={i} className={`relative p-5 rounded-3xl ${item.theme} border-2 ${item.border} shadow-lg ${item.shadow} hover:scale-105 transition-all duration-300 group overflow-hidden flex flex-col items-center justify-center text-center`}>

                                    <div className="relative z-10 w-full flex flex-col items-center">
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.iconBg} shadow-sm mb-3 text-2xl group-hover:rotate-6 transition-transform duration-300`}>
                                            <i className={`fas ${item.icon}`}></i>
                                        </div>
                                        <h4 className="font-black uppercase tracking-[0.2em] text-[9px] mb-1 opacity-90">{item.title}</h4>
                                        <p className="text-sm font-black leading-tight tracking-wide">{item.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Map (7 cols) */}
                    <div className="order-1 lg:order-2 lg:col-span-7 h-[350px] sm:h-[500px] lg:h-[650px] rounded-[2rem] sm:rounded-[3rem] overflow-hidden shadow-2xl shadow-black/15 border-4 border-white relative z-10 transform hover:scale-[1.005] transition-transform duration-500 group">

                        {/* Floating Elements on Map Container */}
                        <div className="absolute top-6 right-6 z-30 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-white/50 animate-fade-in-up">
                            <div className="flex items-center gap-3">
                                <div>
                                    <p className="text-[10px] font-black uppercase text-white/50 tracking-wider text-right">Oficina principal</p>
                                    <p className="text-sm font-bold text-[#0A0A0A] text-right">HagamosTech</p>
                                </div>
                                <div className="w-10 h-10 bg-[#A3E635] rounded-full flex items-center justify-center text-[#0A0A0A] shadow-md">
                                    <i className="fas fa-store"></i>
                                </div>
                            </div>
                        </div>

                        <div className="absolute bottom-6 left-6 z-30 bg-[#0A0A0A] text-white px-6 py-3 rounded-full shadow-lg font-black text-xs uppercase tracking-widest border-2 border-white animate-bounce-slow">
                            <i className="fas fa-map-marker-alt mr-2 text-[#A3E635]"></i> Te esperamos aquí
                        </div>

                        <div className="absolute top-6 left-6 z-30 bg-[#0A0A0A] text-white px-4 py-2 rounded-2xl shadow-lg border border-white/10">
                            <p className="text-[10px] font-black uppercase tracking-wider text-white/70">Proyectos y Consultas</p>
                            <p className="text-xs font-bold mt-1 flex items-center gap-2"><i className="fas fa-lightbulb text-[#A3E635]"></i> Ideas, problemas y soluciones</p>
                        </div>

                        {/* Map Overlay Logic */}
                        <div className="absolute inset-0 bg-[#A3E635]/10 pointer-events-none z-20 group-hover:opacity-0 transition-opacity duration-500"></div>

                        <iframe
                            src="https://maps.google.com/maps?q=-17.7813692,-63.1851308&z=14&ie=UTF8&iwloc=&output=embed"
                            width="100%"
                            height="100%"
                            style={{border:0}}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="grayscale group-hover:grayscale-0 transition-all duration-700 contrast-[1.1]"
                        ></iframe>
                    </div>

                </div>
            </div>

            {/* Ola de cierre (estilo FondoTech) */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] rotate-180 opacity-60 z-0">
                <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-[calc(100%+1.3px)] h-[80px] block">
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-[#A3E635]"></path>
                </svg>
            </div>
        </section>
    );
};

export default Ubicacion;
