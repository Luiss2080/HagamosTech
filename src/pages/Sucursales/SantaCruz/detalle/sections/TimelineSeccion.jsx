import React from 'react';
import CircuitBackground from '../../../../../components/fondos/FondoSaltenas';

const TimelineSeccion = ({ eventos, badge = 'Nuestra Historia', titulo, resaltado }) => {
    return (
        <div className="relative">
            <section className="relative z-10 py-4">
                <CircuitBackground />
                <div className="container mx-auto px-6 max-w-4xl relative z-20">
                    <div className="text-center mb-4 relative z-10">
                        <span className="inline-block py-1.5 px-4 rounded-full bg-[#8B4513]/10 text-[#8B4513] text-[10px] font-black tracking-widest uppercase mb-4 border border-[#8B4513]/20">
                            <i className="fas fa-clock-rotate-left text-[#8B4513] mr-1"></i> {badge}
                        </span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading text-[#8B4513] mb-4 leading-tight">
                            {titulo} <span className="relative inline-block px-2 text-[#FF4D00]">
                                {resaltado}
                                <svg className="absolute w-full h-3 -bottom-1 left-0 z-[-1] text-slate-800 opacity-80" viewBox="0 0 200 9" fill="none"><path d="M2.00025 6.99997C25.7509 4.50435 65.2536 2.07897 197.994 4.4151" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                            </span>
                        </h2>
                    </div>

                    <div className="relative">
                        <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#FF4D00] via-[#5D3A1F] to-[#FF4D00] -translate-x-1/2 hidden sm:block"></div>
                        {eventos.map((item, i) => (
                            <div key={i} className={`relative flex items-start gap-4 sm:gap-8 mb-6 sm:mb-8 ${i % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}>
                                <div className={`hidden sm:flex flex-1 ${i % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                                    <div className="bg-[#FFF6F6] rounded-2xl p-4 max-w-xs border border-orange-100 shadow-sm">
                                        <p className="text-[10px] font-black text-[#FF4D00] uppercase tracking-wider mb-1">{item.year}</p>
                                        <h4 className="text-sm font-black text-[#111827] mb-1">{item.title}</h4>
                                        <p className="text-[11px] text-slate-500 font-semibold">{item.desc}</p>
                                    </div>
                                </div>
                                <div className="relative z-10 flex items-center justify-center shrink-0">
                                    <div className="w-10 h-10 rounded-full bg-[#FF4D00] text-white flex items-center justify-center text-sm shadow-md shadow-orange-500/30 sm:absolute sm:left-1/2 sm:-translate-x-1/2"><i className="fas fa-circle text-[6px]"></i></div>
                                </div>
                                <div className="flex-1 sm:hidden"></div>
                                <div className="sm:hidden bg-[#FFF6F6] rounded-2xl p-3 border border-orange-100 shadow-sm flex-1">
                                    <p className="text-[10px] font-black text-[#FF4D00] uppercase tracking-wider mb-1">{item.year}</p>
                                    <h4 className="text-sm font-black text-[#111827] mb-1">{item.title}</h4>
                                    <p className="text-[11px] text-slate-500 font-semibold">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default TimelineSeccion;
