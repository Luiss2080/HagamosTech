import React from 'react';
import SeccionServicio from './SeccionServicio';

const BeneficiosServicio = ({ beneficios, badge, titulo, resaltado }) => {
    return (
        <SeccionServicio
            badge={badge}
            badgeIcon="fa-circle-check"
            titulo={titulo}
            resaltado={resaltado}
        >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {beneficios.map((item, i) => (
                    <div key={i} className={`relative rounded-[2rem] p-6 transition-all duration-500 group overflow-hidden border hover:-translate-y-1.5 z-10 text-center ${i % 2 === 0 ? 'bg-[#FF4D00] text-white border-[#FF4D00] shadow-xl shadow-orange-500/20' : 'bg-[#5D3A1F] text-white border-[#5D3A1F] shadow-xl shadow-[#5D3A1F]/20'}`}>
                        <div className="absolute top-0 left-0 w-full h-1 bg-white/40"></div>
                        {/* Orbes decorativos */}
                        <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-white/15 blur-2xl animate-float-slow pointer-events-none"></div>
                        <div className="absolute -bottom-12 -left-8 w-36 h-36 rounded-full bg-black/10 blur-2xl animate-float-medium pointer-events-none"></div>
                        <div className="relative z-10">
                            <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-4 mx-auto bg-white/20 ring-1 ring-white/40 shadow-lg group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300">
                                <i className={`fas ${item.icon}`}></i>
                            </div>
                            <h4 className="text-lg font-black mb-2 leading-tight">{item.titulo}</h4>
                            <p className="text-xs font-medium opacity-90 leading-relaxed">{item.desc}</p>
                            <div className="mt-4 pt-3 border-t border-white/25 inline-flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest opacity-80">
                                <i className="fas fa-check-circle text-[9px]"></i> Incluido
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </SeccionServicio>
    );
};

export default BeneficiosServicio;
