import React from 'react';

const ProcesoSeccion = ({ pasos, badge = 'Así Trabajamos', titulo, resaltado }) => {
    return (
        <div className="relative">
            <section className="relative z-10 py-4">
                <div className="container mx-auto px-6 max-w-6xl relative z-20">
                    <div className="text-center mb-4 relative z-10">
                        <span className="inline-block py-1.5 px-4 rounded-full bg-[#FF4D00]/10 text-[#FF4D00] text-[10px] font-black tracking-widest uppercase mb-4 border border-[#FF4D00]/20">
                            <i className="fas fa-arrow-right-arrow-left text-[#FF4D00] mr-1"></i> {badge}
                        </span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading text-[#8B4513] mb-4 leading-tight">
                            {titulo} <span className="relative inline-block px-2 text-[#FF4D00]">
                                {resaltado}
                                <svg className="absolute w-full h-3 -bottom-1 left-0 z-[-1] text-slate-800 opacity-80" viewBox="0 0 200 9" fill="none"><path d="M2.00025 6.99997C25.7509 4.50435 65.2536 2.07897 197.994 4.4151" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                            </span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {pasos.map((p, i) => (
                            <div key={i} className="relative text-center group">
                                <div className={`w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl text-white relative z-10 shadow-lg ${i % 2 === 0 ? 'bg-[#FF4D00] shadow-orange-500/30' : 'bg-[#5D3A1F] shadow-[#5D3A1F]/30'} group-hover:scale-110 transition-transform duration-300`}>
                                    <i className={`fas ${p.icon}`}></i>
                                </div>
                                <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[120px] font-black text-gray-100 select-none z-0 hidden sm:block">{p.step}</span>
                                <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm relative z-10">
                                    <p className="text-[9px] font-black uppercase tracking-widest text-[#FF4D00] mb-1">{p.step} — {p.title}</p>
                                    <p className="text-[11px] text-slate-500 font-semibold leading-relaxed">{p.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ProcesoSeccion;
