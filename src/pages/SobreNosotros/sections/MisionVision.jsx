import React from 'react';
import FondoTech from '../../../components/fondos/FondoTech';
import CircleParticles from '../../../components/fondos/ParticulasCirculares';

const MisionVision = () => {
    return (
        <div id="mision" className="relative scroll-mt-24">
            <section className="relative z-10 py-4">
                <FondoTech />
                <div className="container mx-auto px-6 max-w-7xl relative z-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-8">

                        {/* Mission Card */}
                        <div className="bg-gradient-to-br from-[#0A0A0A] via-[#171717] to-[#0A0A0A] rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-7 md:p-10 shadow-2xl shadow-black/20 border border-[#A3E635]/20 relative overflow-hidden group hover:-translate-y-1.5 transition-transform duration-500 flex flex-col items-center text-center justify-between min-h-[360px] text-white">
                            <CircleParticles count={12} colorScheme="dark" />
                            <div className="absolute -top-16 -right-16 w-56 h-56 bg-[#A3E635]/25 rounded-full blur-[70px] pointer-events-none"></div>

                            <div className="relative z-10 flex flex-col items-center">
                                <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#A3E635]/10 text-[#A3E635] border border-[#A3E635]/20 text-[10px] font-black uppercase tracking-[0.22em] mb-5 shadow-sm backdrop-blur-md">
                                    <i className="fas fa-bullseye"></i> Nuestra Misión
                                </div>

                                <h2 className="uppercase text-3xl md:text-4xl lg:text-5xl font-black font-heading text-white mb-5 leading-[1.05] tracking-tight">
                                    Tu necesidad, <br/><span className="text-[#A3E635]">nuestra solución.</span>
                                </h2>

                                <p className="text-white/90 font-semibold leading-relaxed text-sm md:text-[15px] mb-6 max-w-lg mx-auto">
                                    Convertir problemas, necesidades e ideas en soluciones reales con tecnología, creatividad y conocimiento. No importa quién seas ni qué sepas de tecnología: analizamos tu caso y encontramos el camino.
                                </p>

                                <div className="flex justify-center gap-3 mt-1">
                                    <div className="w-10 h-10 rounded-2xl bg-[#A3E635]/20 text-[#A3E635] flex items-center justify-center text-lg shadow-sm rotate-3 hover:rotate-6 transition-transform border border-[#A3E635]/20"><i className="fas fa-lightbulb"></i></div>
                                    <div className="w-10 h-10 rounded-2xl bg-[#A3E635] text-[#0A0A0A] flex items-center justify-center text-lg shadow-sm -rotate-3 hover:-rotate-6 transition-transform"><i className="fas fa-handshake"></i></div>
                                    <div className="w-10 h-10 rounded-2xl bg-[#A3E635]/20 text-[#A3E635] flex items-center justify-center text-lg shadow-sm rotate-3 hover:rotate-6 transition-transform border border-[#A3E635]/20"><i className="fas fa-star"></i></div>
                                </div>
                            </div>

                            <div className="absolute -bottom-8 -left-8 text-white/10 text-8xl transform rotate-12 group-hover:scale-110 transition-transform duration-700 pointer-events-none">
                                <i className="fas fa-bullseye"></i>
                            </div>
                        </div>

                        {/* Vision Card */}
                        <div className="bg-[#A3E635] rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-7 md:p-10 shadow-2xl shadow-[#A3E635]/20 border border-white/10 relative overflow-hidden group hover:-translate-y-1.5 transition-transform duration-500 text-[#0A0A0A] flex flex-col items-center text-center justify-between min-h-[360px]">
                            <CircleParticles count={12} colorScheme="light" />
                            <div className="absolute -bottom-16 -left-16 w-72 h-72 bg-[#0A0A0A] rounded-full blur-[80px] opacity-15 pointer-events-none"></div>

                            <div className="relative z-10 flex flex-col items-center">
                                <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#0A0A0A]/10 text-[#0A0A0A] border border-[#0A0A0A]/10 text-[10px] font-black uppercase tracking-[0.22em] mb-5 shadow-sm backdrop-blur-md">
                                    <i className="fas fa-eye"></i> Nuestra Visión
                                </div>

                                <h2 className="uppercase text-3xl md:text-4xl lg:text-5xl font-black font-heading text-[#0A0A0A] mb-5 leading-[1.05] tracking-tight">
                                    La puerta a lo <br/><span className="text-[#171717]">digital.</span>
                                </h2>

                                <p className="text-[#0A0A0A]/80 font-semibold leading-relaxed text-sm md:text-[15px] mb-6 opacity-95 max-w-lg mx-auto">
                                    Ser la marca de soluciones digitales multidisciplinaria a la que cualquier persona, estudiante, emprendedor o empresa acude para resolver lo que necesite, sin importar el tamaño ni la complejidad.
                                </p>

                                <div className="flex justify-center gap-3 mt-1">
                                    <div className="w-10 h-10 rounded-2xl bg-[#0A0A0A]/15 text-[#0A0A0A] flex items-center justify-center text-lg shadow-sm rotate-3 hover:rotate-6 transition-transform backdrop-blur-md"><i className="fas fa-globe"></i></div>
                                    <div className="w-10 h-10 rounded-2xl bg-[#0A0A0A] text-[#A3E635] flex items-center justify-center text-lg shadow-sm -rotate-3 hover:-rotate-6 transition-transform"><i className="fas fa-rocket"></i></div>
                                    <div className="w-10 h-10 rounded-2xl bg-[#0A0A0A]/15 text-[#0A0A0A] flex items-center justify-center text-lg shadow-sm rotate-3 hover:rotate-6 transition-transform backdrop-blur-md"><i className="fas fa-users"></i></div>
                                </div>
                            </div>

                            <div className="absolute -bottom-8 -right-8 text-[#0A0A0A]/10 text-8xl transform -rotate-12 group-hover:scale-110 transition-transform duration-700 pointer-events-none">
                                <i className="fas fa-eye"></i>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
};

export default MisionVision;
