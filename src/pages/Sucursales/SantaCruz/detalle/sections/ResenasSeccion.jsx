import React from 'react';

const ResenasSeccion = ({ resenas, badge = 'Lo Que Dicen', titulo, resaltado }) => {
    return (
        <div className="relative">
            <section className="relative z-10 py-4">
                <div className="container mx-auto px-6 max-w-6xl relative z-20">
                    <div className="text-center mb-4 relative z-10">
                        <span className="inline-block py-1.5 px-4 rounded-full bg-[#5D3A1F]/10 text-[#5D3A1F] text-[10px] font-black tracking-widest uppercase mb-4 border border-[#5D3A1F]/20">
                            <i className="fas fa-star text-[#5D3A1F] mr-1"></i> {badge}
                        </span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading text-[#8B4513] mb-4 leading-tight">
                            {titulo} <span className="relative inline-block px-2 text-[#FF4D00]">
                                {resaltado}
                                <svg className="absolute w-full h-3 -bottom-1 left-0 z-[-1] text-slate-800 opacity-80" viewBox="0 0 200 9" fill="none"><path d="M2.00025 6.99997C25.7509 4.50435 65.2536 2.07897 197.994 4.4151" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                            </span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {resenas.map((r, i) => (
                            <div key={i} className="bg-[#FFF6F6] rounded-2xl p-5 border border-orange-100 hover:shadow-md transition-all duration-300">
                                <div className="flex items-center gap-0.5 mb-2">
                                    {[...Array(5)].map((_, j) => (<i key={j} className={`fas fa-star text-[10px] ${j < r.stars ? 'text-[#FF4D00]' : 'text-gray-200'}`}></i>))}
                                </div>
                                <p className="text-[11px] text-slate-600 font-semibold leading-relaxed mb-3">"{r.text}"</p>
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-[#FF4D00]/10 flex items-center justify-center text-[#FF4D00] font-black text-xs">{r.name.charAt(0)}</div>
                                    <div>
                                        <p className="text-[10px] font-black text-[#111827] uppercase tracking-wider">{r.name}</p>
                                        <span className="text-[8px] font-bold text-[#FF4D00] uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#FF4D00]/10">{r.tag}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ResenasSeccion;
