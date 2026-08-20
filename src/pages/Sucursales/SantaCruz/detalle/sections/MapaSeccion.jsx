import React from 'react';
import CircuitBackground from '../../../../../components/fondos/FondoTech';

const MapaSeccion = ({ referencias, mapaSrc, badge = 'Cómo Llegar', titulo, resaltado }) => {
    return (
        <div className="relative">
            <section className="relative z-10 py-4">
                <div className="container mx-auto px-6 max-w-4xl relative z-20">
                    <div className="text-center mb-4 relative z-10">
                        <span className="inline-block py-1.5 px-4 rounded-full bg-[#FF4D00]/10 text-[#FF4D00] text-[10px] font-black tracking-widest uppercase mb-4 border border-[#FF4D00]/20">
                            <i className="fas fa-map-location-dot text-[#FF4D00] mr-1"></i> {badge}
                        </span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading text-[#8B4513] mb-4 leading-tight">
                            {titulo} <span className="relative inline-block px-2 text-[#FF4D00]">
                                {resaltado}
                                <svg className="absolute w-full h-3 -bottom-1 left-0 z-[-1] text-slate-800 opacity-80" viewBox="0 0 200 9" fill="none"><path d="M2.00025 6.99997C25.7509 4.50435 65.2536 2.07897 197.994 4.4151" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                            </span>
                        </h2>
                    </div>

                    <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-md relative overflow-hidden">
                        <CircuitBackground />
                        <div className="flex flex-wrap justify-center gap-2 mb-6 relative z-20">
                            {referencias.map((ref, i) => (
                                <span key={i} className="px-4 py-2 rounded-full bg-[#FFF6F6] text-[#111827] text-[10px] font-black uppercase tracking-wider border border-orange-100 flex items-center gap-1.5">
                                    <i className="fas fa-arrow-right text-[#FF4D00] text-[8px]"></i>{ref} → 2 min
                                </span>
                            ))}
                        </div>
                        <div className="h-48 rounded-2xl overflow-hidden shadow-inner border border-gray-100 relative z-20">
                            <iframe src={mapaSrc} width="100%" height="100%" style={{border:0}} loading="lazy" title="Mapa"></iframe>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default MapaSeccion;
