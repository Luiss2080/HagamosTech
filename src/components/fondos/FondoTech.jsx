import React from 'react';

const DOTS = [
    { top: '10%', left: '10%', size: 9, type: 'dot', color: '#A3E635', anim: 'animate-twinkle', delay: '0s' },
    { top: '16%', left: '28%', size: 7, type: 'square', color: '#A3E635', anim: 'animate-drift', delay: '0.5s' },
    { top: '22%', left: '44%', size: 11, type: 'dot', color: '#A3E635', anim: 'animate-twinkle', delay: '1s' },
    { top: '14%', right: '24%', size: 8, type: 'diamond', color: '#A3E635', anim: 'animate-drift', delay: '2s' },
    { top: '30%', right: '10%', size: 9, type: 'plus', color: '#84CC16', anim: 'animate-spin-slow', delay: '0.8s' },
    { top: '38%', left: '14%', size: 8, type: 'dot', color: '#A3E635', anim: 'animate-drift', delay: '1.4s' },
    { top: '44%', left: '60%', size: 9, type: 'ring', color: '#A3E635', anim: 'animate-ring-ping', delay: '0.3s' },
    { top: '52%', right: '18%', size: 11, type: 'dot', color: '#A3E635', anim: 'animate-drift', delay: '2.6s' },
    { top: '58%', left: '24%', size: 8, type: 'square', color: '#84CC16', anim: 'animate-twinkle', delay: '1.7s' },
    { top: '64%', left: '46%', size: 7, type: 'diamond', color: '#A3E635', anim: 'animate-drift', delay: '0.9s' },
    { top: '70%', right: '30%', size: 9, type: 'dot', color: '#A3E635', anim: 'animate-twinkle', delay: '2.2s' },
    { top: '76%', left: '16%', size: 11, type: 'plus', color: '#A3E635', anim: 'animate-spin-slow', delay: '1.1s' },
    { top: '82%', right: '14%', size: 7, type: 'dot', color: '#84CC16', anim: 'animate-twinkle', delay: '0.6s' },
    { bottom: '12%', left: '38%', size: 9, type: 'ring', color: '#A3E635', anim: 'animate-ring-ping', delay: '1.9s' },
    { bottom: '20%', right: '40%', size: 11, type: 'dot', color: '#A3E635', anim: 'animate-twinkle', delay: '0.2s' },
    { bottom: '28%', left: '58%', size: 7, type: 'square', color: '#A3E635', anim: 'animate-drift', delay: '2.4s' },
    { bottom: '10%', left: '12%', size: 8, type: 'diamond', color: '#84CC16', anim: 'animate-twinkle', delay: '1.5s' },
    { top: '26%', left: '72%', size: 7, type: 'dot', color: '#A3E635', anim: 'animate-drift', delay: '0.7s' },
    { top: '48%', right: '46%', size: 9, type: 'plus', color: '#A3E635', anim: 'animate-spin-slow', delay: '2.8s' },
    { top: '60%', right: '58%', size: 9, type: 'ring', color: '#84CC16', anim: 'animate-ring-ping', delay: '1.3s' },
    { top: '34%', left: '82%', size: 8, type: 'dot', color: '#A3E635', anim: 'animate-twinkle', delay: '1s' },
    { top: '88%', left: '60%', size: 7, type: 'square', color: '#A3E635', anim: 'animate-drift', delay: '0.4s' },
    { top: '6%', right: '55%', size: 8, type: 'diamond', color: '#A3E635', anim: 'animate-twinkle', delay: '2.1s' },
];

const Dot = ({ d }) => {
    const pos = { top: d.top, left: d.left, right: d.right, bottom: d.bottom, animationDelay: d.delay };
    const glow = { filter: `drop-shadow(0 0 6px ${d.color})` };

    if (d.type === 'ring') {
        return (
            <span
                className={`absolute rounded-full border-2 ${d.anim}`}
                style={{ ...pos, ...glow, width: d.size, height: d.size, borderColor: d.color }}
            ></span>
        );
    }
    if (d.type === 'plus') {
        return (
            <span
                className={`absolute flex items-center justify-center ${d.anim}`}
                style={{ ...pos, ...glow, width: d.size, height: d.size, color: d.color }}
            >
                <svg viewBox="0 0 10 10" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                    <path d="M5 1 V9 M1 5 H9" />
                </svg>
            </span>
        );
    }
    if (d.type === 'diamond') {
        return (
            <span
                className={`absolute ${d.anim}`}
                style={{ ...pos, ...glow, width: d.size, height: d.size, backgroundColor: d.color, clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}
            ></span>
        );
    }
    if (d.type === 'square') {
        return (
            <span
                className={`absolute rounded-xl ${d.anim}`}
                style={{ ...pos, ...glow, width: d.size, height: d.size, backgroundColor: d.color }}
            ></span>
        );
    }
    return (
        <span
            className={`absolute rounded-full ${d.anim}`}
            style={{ ...pos, ...glow, width: d.size, height: d.size, backgroundColor: d.color }}
        ></span>
    );
};

const FondoTech = ({ hideWaves }) => {
    return (
        <div className="absolute inset-0 z-0 overflow-hidden bg-[#050505] pointer-events-none">
            {/* Soft ambient glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(163,230,53,0.10),transparent_50%),radial-gradient(circle_at_75%_70%,rgba(132,204,22,0.08),transparent_50%)]"></div>

            {/* Circuit grid (cuadrícula) */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0OCIgaGVpZ2h0PSI0OCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDI0IEwgNDggMjQgTSAyNCAwIEwgMjQgNDgiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgxNjMsMjMwLDUzLDAuMTApIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-60 mix-blend-screen"></div>

            {/* Varied animated dots */}
            {DOTS.map((d, i) => (
                <Dot key={i} d={d} />
            ))}

            {!hideWaves && (
                <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] opacity-25">
                    <svg relative="true" viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-[calc(100%+1.3px)] h-[80px] block">
                        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-[#A3E635]"></path>
                    </svg>
                </div>
            )}
        </div>
    );
};

export default FondoTech;
