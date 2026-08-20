import React from 'react';

const SectionHeader = ({ badge, badgeIcon, titulo, resaltado, descripcion }) => {
    return (
        <div className="text-center mb-4 relative z-10">
            <span className="inline-block py-1.5 px-4 rounded-full bg-[#FF4D00]/10 text-[#FF4D00] text-[10px] font-black tracking-widest uppercase mb-4 border border-[#FF4D00]/20">
                <i className={`fas ${badgeIcon || 'fa-star'} text-[#FF4D00] mr-1`}></i> {badge}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading text-[#8B4513] mb-3 leading-tight">
                {titulo} <span className="relative inline-block text-[#FF4D00]">
                    {resaltado}
                    <svg className="absolute w-full h-3 -bottom-1.5 left-0 z-[-1] text-amber-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.55)]" viewBox="0 0 200 12" preserveAspectRatio="none" fill="none"><path d="M8,8 C22,5 38,7.5 55,7.5 C130,7.5 165,7.5 188,7.5 C194,7.5 198,6 196,7.5" stroke="currentColor" strokeWidth="7" strokeLinecap="round"/></svg>
                </span>
            </h2>
            {descripcion && (
                <p className="text-[#1F2937] font-medium max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">{descripcion}</p>
            )}
        </div>
    );
};

export default SectionHeader;
