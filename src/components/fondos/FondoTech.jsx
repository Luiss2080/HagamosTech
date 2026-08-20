import React from 'react';

const FondoTech = ({ hideWaves }) => {
    return (
        <div className="absolute inset-0 z-0 overflow-hidden bg-[#050505] pointer-events-none">
            {/* Deep ambient gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(163,230,53,0.10),transparent_45%),radial-gradient(circle_at_80%_75%,rgba(132,204,22,0.08),transparent_45%),radial-gradient(circle_at_70%_15%,rgba(163,230,53,0.06),transparent_40%)]"></div>

            {/* Large glowing orbs */}
            <div className="absolute top-[-10%] left-[-8%] w-[46%] h-[46%] bg-[#A3E635]/15 rounded-full blur-[110px] animate-float-slow"></div>
            <div className="absolute bottom-[-12%] right-[-10%] w-[48%] h-[48%] bg-[#84CC16]/10 rounded-full blur-[130px] animate-float-medium"></div>

            {/* Circuit grid (very subtle) */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0OCIgaGVpZ2h0PSI0OCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDI0IEwgNDggMjQgTSAyNCAwIEwgMjQgNDgiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgxNjMsMjMwLDUzLDAuMDgpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-50 mix-blend-screen"></div>

            {/* Floating data particles (more, animated) */}
            <div className="absolute top-[10%] left-[10%] w-2 h-2 rounded-full bg-[#A3E635]/70 animate-pulse-glow"></div>
            <div className="absolute top-[16%] left-[28%] w-1.5 h-1.5 rounded-full bg-[#A3E635]/50 animate-float-fast" style={{animationDelay:'0.4s'}}></div>
            <div className="absolute top-[22%] left-[44%] w-2.5 h-2.5 rounded-full bg-[#A3E635]/60 animate-pulse-glow" style={{animationDelay:'0.8s'}}></div>
            <div className="absolute top-[14%] right-[24%] w-2 h-2 rounded-full bg-[#A3E635]/70 animate-float-medium" style={{animationDelay:'1.2s'}}></div>
            <div className="absolute top-[30%] right-[10%] w-1.5 h-1.5 rounded-full bg-[#84CC16]/60 animate-pulse-glow" style={{animationDelay:'0.6s'}}></div>
            <div className="absolute top-[38%] left-[14%] w-2 h-2 rounded-full bg-[#A3E635]/80 animate-float-slow" style={{animationDelay:'1.5s'}}></div>
            <div className="absolute top-[44%] left-[60%] w-1.5 h-1.5 rounded-full bg-[#A3E635]/50 animate-pulse-glow" style={{animationDelay:'0.3s'}}></div>
            <div className="absolute top-[52%] right-[18%] w-2.5 h-2.5 rounded-full bg-[#A3E635]/60 animate-float-fast" style={{animationDelay:'1s'}}></div>
            <div className="absolute top-[58%] left-[24%] w-2 h-2 rounded-full bg-[#84CC16]/60 animate-pulse-glow" style={{animationDelay:'1.8s'}}></div>
            <div className="absolute top-[64%] left-[46%] w-1.5 h-1.5 rounded-full bg-[#A3E635]/70 animate-float-medium" style={{animationDelay:'0.7s'}}></div>
            <div className="absolute top-[70%] right-[30%] w-2 h-2 rounded-full bg-[#A3E635]/60 animate-pulse-glow" style={{animationDelay:'1.3s'}}></div>
            <div className="absolute top-[76%] left-[16%] w-2.5 h-2.5 rounded-full bg-[#A3E635]/50 animate-float-slow" style={{animationDelay:'0.5s'}}></div>
            <div className="absolute top-[82%] right-[14%] w-1.5 h-1.5 rounded-full bg-[#84CC16]/60 animate-pulse-glow" style={{animationDelay:'1.6s'}}></div>
            <div className="absolute bottom-[12%] left-[38%] w-2 h-2 rounded-full bg-[#A3E635]/70 animate-float-fast" style={{animationDelay:'0.9s'}}></div>
            <div className="absolute bottom-[20%] right-[40%] w-2.5 h-2.5 rounded-full bg-[#A3E635]/55 animate-pulse-glow" style={{animationDelay:'0.2s'}}></div>
            <div className="absolute bottom-[28%] left-[58%] w-1.5 h-1.5 rounded-full bg-[#A3E635]/60 animate-float-medium" style={{animationDelay:'1.1s'}}></div>
            <div className="absolute bottom-[10%] left-[12%] w-2 h-2 rounded-full bg-[#84CC16]/50 animate-pulse-glow" style={{animationDelay:'1.4s'}}></div>
            <div className="absolute top-[26%] left-[72%] w-1.5 h-1.5 rounded-full bg-[#A3E635]/60 animate-float-slow" style={{animationDelay:'0.6s'}}></div>
            <div className="absolute top-[48%] right-[46%] w-2 h-2 rounded-full bg-[#A3E635]/55 animate-pulse-glow" style={{animationDelay:'1.7s'}}></div>

            {/* Scanline / raster effect */}
            <div className="absolute inset-0 opacity-[0.06] mix-blend-overlay"
                 style={{ backgroundImage: 'repeating-linear-gradient(0deg, #A3E635 0px, #A3E635 1px, transparent 1px, transparent 3px)' }}></div>

            {/* Faint perspective grid floor */}
            <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[160%] h-[420px] opacity-40"
                 style={{ backgroundImage: 'linear-gradient(#A3E63511 1px, transparent 1px), linear-gradient(90deg, #A3E63511 1px, transparent 1px)', backgroundSize: '48px 48px', transform: 'perspective(600px) rotateX(60deg)', webkitMaskImage: 'linear-gradient(to top, black, transparent)' }}></div>

            {!hideWaves && (
                <>
                    <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] opacity-30">
                        <svg relative="true" viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-[calc(100%+1.3px)] h-[80px] block">
                            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-[#0A0A0A]"></path>
                        </svg>
                    </div>
                </>
            )}
        </div>
    );
};

export default FondoTech;
