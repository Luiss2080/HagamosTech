import React, { useState, useEffect } from 'react';
import CircuitBackground from '../../../../../components/fondos/FondoTech';

const GaleriaSeccion = ({ imagenes, badge = 'Nuestra Galería', titulo, resaltado, descripcion }) => {
    const [galleryIdx, setGalleryIdx] = useState(0);
    const [rotateDeg, setRotateDeg] = useState(0);

    useEffect(() => {
        const t = setInterval(() => setGalleryIdx(prev => (prev + 1) % imagenes.length), 3500);
        return () => clearInterval(t);
    }, [imagenes.length]);

    const handleSpin = () => setRotateDeg(prev => prev + 360);

    return (
        <div className="relative">
            <section className="relative z-10 py-4">
                <div className="container mx-auto px-6 max-w-6xl relative z-20">
                    <div className="text-center mb-4 relative z-10">
                        <span className="inline-block py-1.5 px-4 rounded-full bg-[#5D3A1F]/10 text-[#5D3A1F] text-[10px] font-black tracking-widest uppercase mb-4 border border-[#5D3A1F]/20">
                            <i className="fas fa-images text-[#5D3A1F] mr-1"></i> {badge}
                        </span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading text-[#8B4513] mb-4 leading-tight">
                            {titulo} <span className="relative inline-block px-2 text-[#FF4D00]">
                                {resaltado}
                                <svg className="absolute w-full h-3 -bottom-1 left-0 z-[-1] text-slate-800 opacity-80" viewBox="0 0 200 9" fill="none"><path d="M2.00025 6.99997C25.7509 4.50435 65.2536 2.07897 197.994 4.4151" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                            </span>
                        </h2>
                        {descripcion && (
                            <p className="text-[#1F2937] font-medium max-w-3xl mx-auto text-base sm:text-lg leading-relaxed">{descripcion}</p>
                        )}
                    </div>

                    <div className="bg-white rounded-[2.5rem] p-8 sm:p-12 shadow-xl border border-gray-100 relative overflow-hidden">
                        <CircuitBackground />
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative z-20">
                            <div>
                                <p className="text-slate-600 font-semibold mb-4 leading-relaxed">Las imágenes rotan solas cada 3.5 segundos, o hacé click en la foto para girarla 360°. Usá los botones para elegir tu favorita.</p>
                                <div className="flex gap-2 flex-wrap">
                                    {imagenes.map((_, i) => (
                                        <button key={i} onClick={() => setGalleryIdx(i)} className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-wider transition-all ${i === galleryIdx ? 'bg-[#FF4D00] text-white' : 'bg-white border border-gray-200 text-slate-500 hover:border-[#FF4D00]'}`}>Foto {i + 1}</button>
                                    ))}
                                </div>
                            </div>
                            <div className="flex flex-col items-center gap-4">
                                <div className="relative w-full h-60 sm:h-72 rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white cursor-pointer" onClick={handleSpin} style={{ perspective: '1000px' }}>
                                    <div className="w-full h-full transition-transform duration-700 ease-out" style={{ transform: `rotateY(${rotateDeg}deg)` }}>
                                        <img src={imagenes[galleryIdx]} alt="Galería" className="w-full h-full object-cover" style={{ backfaceVisibility: 'hidden' }} />
                                    </div>
                                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                                        {imagenes.map((_, i) => (<button key={i} onClick={(e) => { e.stopPropagation(); setGalleryIdx(i); }} className={`w-2.5 h-2.5 rounded-full transition-all ${i === galleryIdx ? 'bg-[#FF4D00] scale-125' : 'bg-white/70'}`} />))}
                                    </div>
                                </div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400"><i className="fas fa-hand-pointer mr-1 text-[#FF4D00]"></i>Click en la imagen para girar</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default GaleriaSeccion;
