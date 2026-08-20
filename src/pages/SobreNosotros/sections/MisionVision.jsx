import React from 'react';
import CircuitBackground from '../../../components/fondos/FondoSaltenas';
import CircleParticles from '../../../components/fondos/ParticulasCirculares';

const MisionVision = () => {
    return (
        <div className="relative">
            <section className="relative z-10 py-4">
                <CircuitBackground />
                <div className="container mx-auto px-6 max-w-7xl relative z-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-8">

                        {/* Mission Card */}
                        <div className="bg-gradient-to-br from-[#FF4D00] via-[#E64500] to-[#CC3D00] rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-7 md:p-10 shadow-2xl shadow-orange-950/20 border border-white/10 relative overflow-hidden group hover:-translate-y-1.5 transition-transform duration-500 flex flex-col items-center text-center justify-between min-h-[360px] text-white">
                            <CircleParticles count={12} colorScheme="dark" />
                            <div className="absolute -top-16 -right-16 w-56 h-56 bg-white/25 rounded-full blur-[70px] pointer-events-none"></div>

                            <div className="relative z-10 flex flex-col items-center">
                                <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/20 text-white border border-white/20 text-[10px] font-black uppercase tracking-[0.22em] mb-5 shadow-sm backdrop-blur-md">
                                    <i className="fas fa-bullseye"></i> Nuestra Misión
                                </div>

                                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black font-heading text-white mb-5 leading-[0.95] tracking-tight">
                                    Sabor y calidad <br/><span className="text-[#5D3A1F]">inigualable.</span>
                                </h2>

                                <p className="text-white/90 font-semibold leading-relaxed text-sm md:text-[15px] mb-6 max-w-lg mx-auto">
                                    Somos una empresa de comida rápida en constante desarrollo y crecimiento, capaz de satisfacer los paladares más exigentes. Trabajamos cada día para que nuestro producto y servicio sean de la máxima calidad.
                                </p>

                                <div className="flex justify-center gap-3 mt-1">
                                    <div className="w-10 h-10 rounded-2xl bg-white/30 text-white flex items-center justify-center text-lg shadow-sm rotate-3 hover:rotate-6 transition-transform border border-white/10"><i className="fas fa-utensils"></i></div>
                                    <div className="w-10 h-10 rounded-2xl bg-[#5D3A1F] text-white flex items-center justify-center text-lg shadow-sm -rotate-3 hover:-rotate-6 transition-transform"><i className="fas fa-heart"></i></div>
                                    <div className="w-10 h-10 rounded-2xl bg-white/30 text-white flex items-center justify-center text-lg shadow-sm rotate-3 hover:rotate-6 transition-transform border border-white/10"><i className="fas fa-star"></i></div>
                                </div>
                            </div>

                            <div className="absolute -bottom-8 -left-8 text-white/10 text-8xl transform rotate-12 group-hover:scale-110 transition-transform duration-700 pointer-events-none">
                                <i className="fas fa-bullseye"></i>
                            </div>
                        </div>

                        {/* Vision Card */}
                        <div className="bg-[#5D3A1F] rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-7 md:p-10 shadow-2xl shadow-orange-950/15 border border-white/10 relative overflow-hidden group hover:-translate-y-1.5 transition-transform duration-500 text-white flex flex-col items-center text-center justify-between min-h-[360px]">
                            <CircleParticles count={12} colorScheme="dark" />
                            <div className="absolute -bottom-16 -left-16 w-72 h-72 bg-[#FF4D00] rounded-full blur-[80px] opacity-25 pointer-events-none"></div>

                            <div className="relative z-10 flex flex-col items-center">
                                <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/15 text-white border border-white/15 text-[10px] font-black uppercase tracking-[0.22em] mb-5 shadow-sm backdrop-blur-md">
                                    <i className="fas fa-eye"></i> Nuestra Visión
                                </div>

                                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black font-heading text-white mb-5 leading-[0.95] tracking-tight">
                                    Líderes en el <br/><span className="text-[#FF4D00]">mercado.</span>
                                </h2>

                                <p className="text-white/90 font-semibold leading-relaxed text-sm md:text-[15px] mb-6 opacity-95 max-w-lg mx-auto">
                                    Ser una empresa industrial en el rubro de la gastronomía, líder en el mercado nacional con proyección internacional, certificada por la excelencia de sus productos y la atención a sus clientes.
                                </p>

                                <div className="flex justify-center gap-3 mt-1">
                                    <div className="w-10 h-10 rounded-2xl bg-white/20 text-white flex items-center justify-center text-lg shadow-sm rotate-3 hover:rotate-6 transition-transform backdrop-blur-md"><i className="fas fa-globe"></i></div>
                                    <div className="w-10 h-10 rounded-2xl bg-[#FF4D00] text-white flex items-center justify-center text-lg shadow-sm -rotate-3 hover:-rotate-6 transition-transform"><i className="fas fa-certificate"></i></div>
                                    <div className="w-10 h-10 rounded-2xl bg-white/20 text-white flex items-center justify-center text-lg shadow-sm rotate-3 hover:rotate-6 transition-transform backdrop-blur-md"><i className="fas fa-users"></i></div>
                                </div>
                            </div>

                            <div className="absolute -bottom-8 -right-8 text-white/5 text-8xl transform -rotate-12 group-hover:scale-110 transition-transform duration-700 pointer-events-none">
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
