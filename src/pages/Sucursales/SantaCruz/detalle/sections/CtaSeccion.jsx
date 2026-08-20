import React from 'react';
import { Link } from 'react-router-dom';
import CircleParticles from '../../../../../components/fondos/ParticulasCirculares';

const CtaSeccion = ({ frase, telefono, whatsapp, mapaLink, gradiente = 'from-[#FF4D00] to-[#CC3D00]' }) => {
    return (
        <div className="relative">
            <section className="relative z-10 py-12">
                <div className="container mx-auto px-6 max-w-4xl text-center relative z-20">
                    <div className={`bg-gradient-to-r ${gradiente} rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden`}>
                        <CircleParticles count={16} colorScheme="dark" />
                        <div className="relative z-10">
                            <h3 className="text-3xl font-black font-heading text-white mb-3">Madrugá con Los Castores</h3>
                            <p className="text-white/90 font-semibold mb-6 max-w-lg mx-auto">{frase}</p>
                            <div className="flex flex-wrap justify-center gap-3">
                                <a href={`tel:${telefono}`} className="px-6 py-3 bg-white text-[#FF4D00] rounded-full font-black text-xs uppercase tracking-wider shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center gap-2"><i className="fas fa-phone"></i>{telefono}</a>
                                <a href="https://wa.me/59161320004" className="px-6 py-3 bg-[#111827] text-white rounded-full font-black text-xs uppercase tracking-wider shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center gap-2"><i className="fab fa-whatsapp"></i>{whatsapp}</a>
                                <a href={mapaLink} target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-white text-[#FF4D00] rounded-full font-black text-xs uppercase tracking-wider shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center gap-2"><i className="fas fa-map-marker-alt"></i>Google Maps</a>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6">
                        <Link to="/sucursales/santa-cruz" className="text-sm font-bold text-[#8B4513] hover:text-[#FF4D00] transition-colors"><i className="fas fa-arrow-left mr-1.5"></i>Volver a sucursales Santa Cruz</Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CtaSeccion;
