import React from 'react';

const DOTS = [
    // Top-left area
    { top: '5%', left: '8%', size: 7, type: 'dot', color: '#A3E635', anim: 'animate-drift', delay: '0s', duration: '14s' },
    { top: '12%', left: '15%', size: 5, type: 'dot', color: '#A3E635', anim: 'animate-drift', delay: '1s', duration: '18s' },
    { top: '8%', left: '22%', size: 6, type: 'dot', color: '#84CC16', anim: 'animate-drift', delay: '3s', duration: '16s' },
    { top: '20%', left: '10%', size: 7, type: 'dot', color: '#A3E635', anim: 'animate-drift', delay: '2s', duration: '12s' },
    { top: '15%', left: '28%', size: 6, type: 'dot', color: '#A3E635', anim: 'animate-drift', delay: '0.5s', duration: '20s' },
    
    // Top-right area
    { top: '6%', right: '12%', size: 7, type: 'dot', color: '#A3E635', anim: 'animate-drift', delay: '1.5s', duration: '15s' },
    { top: '14%', right: '20%', size: 6, type: 'dot', color: '#84CC16', anim: 'animate-drift', delay: '0.2s', duration: '13s' },
    { top: '9%', right: '28%', size: 5, type: 'dot', color: '#A3E635', anim: 'animate-drift', delay: '2.5s', duration: '17s' },
    { top: '22%', right: '15%', size: 8, type: 'dot', color: '#A3E635', anim: 'animate-drift', delay: '4s', duration: '19s' },
    { top: '18%', right: '32%', size: 6, type: 'dot', color: '#A3E635', anim: 'animate-drift', delay: '1s', duration: '14s' },

    // Middle area
    { top: '30%', left: '18%', size: 6, type: 'dot', color: '#A3E635', anim: 'animate-drift', delay: '0.8s', duration: '16s' },
    { top: '35%', left: '32%', size: 7, type: 'dot', color: '#84CC16', anim: 'animate-drift', delay: '2.1s', duration: '15s' },
    { top: '28%', right: '25%', size: 5, type: 'dot', color: '#A3E635', anim: 'animate-drift', delay: '3.2s', duration: '18s' },
    { top: '38%', right: '14%', size: 8, type: 'dot', color: '#A3E635', anim: 'animate-drift', delay: '1.4s', duration: '13s' },
    { top: '42%', left: '5%', size: 6, type: 'dot', color: '#A3E635', anim: 'animate-drift', delay: '0.3s', duration: '21s' },
    { top: '45%', right: '8%', size: 7, type: 'dot', color: '#84CC16', anim: 'animate-drift', delay: '2.7s', duration: '16s' },

    // Center area
    { top: '48%', left: '48%', size: 6, type: 'dot', color: '#A3E635', anim: 'animate-drift', delay: '1.2s', duration: '17s' },
    { top: '40%', left: '58%', size: 5, type: 'dot', color: '#A3E635', anim: 'animate-drift', delay: '3.5s', duration: '19s' },
    { top: '52%', left: '38%', size: 7, type: 'dot', color: '#84CC16', anim: 'animate-drift', delay: '0.6s', duration: '14s' },
    { top: '55%', right: '42%', size: 6, type: 'dot', color: '#A3E635', anim: 'animate-drift', delay: '2.4s', duration: '15s' },

    // Bottom-left area
    { bottom: '8%', left: '10%', size: 7, type: 'dot', color: '#A3E635', anim: 'animate-drift', delay: '0.9s', duration: '18s' },
    { bottom: '15%', left: '18%', size: 6, type: 'dot', color: '#84CC16', anim: 'animate-drift', delay: '3.1s', duration: '13s' },
    { bottom: '22%', left: '26%', size: 5, type: 'dot', color: '#A3E635', anim: 'animate-drift', delay: '1.8s', duration: '16s' },
    { bottom: '12%', left: '32%', size: 8, type: 'dot', color: '#A3E635', anim: 'animate-drift', delay: '2.2s', duration: '15s' },
    { bottom: '28%', left: '14%', size: 6, type: 'dot', color: '#A3E635', anim: 'animate-drift', delay: '0.4s', duration: '19s' },

    // Bottom-right area
    { bottom: '10%', right: '12%', size: 6, type: 'dot', color: '#84CC16', anim: 'animate-drift', delay: '1.7s', duration: '14s' },
    { bottom: '18%', right: '22%', size: 7, type: 'dot', color: '#A3E635', anim: 'animate-drift', delay: '3.4s', duration: '16s' },
    { bottom: '6%', right: '28%', size: 5, type: 'dot', color: '#A3E635', anim: 'animate-drift', delay: '0.8s', duration: '20s' },
    { bottom: '25%', right: '16%', size: 8, type: 'dot', color: '#A3E635', anim: 'animate-drift', delay: '2.9s', duration: '17s' },
    { bottom: '20%', right: '30%', size: 6, type: 'dot', color: '#84CC16', anim: 'animate-drift', delay: '1.1s', duration: '15s' },

    // Extra fill dots for higher density and movement
    { top: '15%', left: '50%', size: 5, type: 'dot', color: '#A3E635', anim: 'animate-drift', delay: '2s', duration: '18s' },
    { top: '25%', left: '65%', size: 6, type: 'dot', color: '#A3E635', anim: 'animate-drift', delay: '0.5s', duration: '14s' },
    { top: '35%', right: '50%', size: 6, type: 'dot', color: '#84CC16', anim: 'animate-drift', delay: '3s', duration: '16s' },
    { top: '65%', left: '12%', size: 7, type: 'dot', color: '#A3E635', anim: 'animate-drift', delay: '1.5s', duration: '15s' },
    { top: '72%', left: '28%', size: 5, type: 'dot', color: '#A3E635', anim: 'animate-drift', delay: '2.8s', duration: '17s' },
    { top: '80%', right: '25%', size: 6, type: 'dot', color: '#84CC16', anim: 'animate-drift', delay: '0.6s', duration: '13s' },
    { top: '85%', right: '48%', size: 7, type: 'dot', color: '#A3E635', anim: 'animate-drift', delay: '2.3s', duration: '19s' },
    { top: '75%', left: '55%', size: 5, type: 'dot', color: '#A3E635', anim: 'animate-drift', delay: '1.3s', duration: '21s' },
    { bottom: '30%', right: '50%', size: 6, type: 'dot', color: '#84CC16', anim: 'animate-drift', delay: '3.7s', duration: '15s' },
    { bottom: '35%', left: '42%', size: 6, type: 'dot', color: '#A3E635', anim: 'animate-drift', delay: '0.1s', duration: '14s' }
];

const Dot = ({ d }) => {
    const pos = { 
        top: d.top, 
        left: d.left, 
        right: d.right, 
        bottom: d.bottom, 
        animationDelay: d.delay, 
        animationDuration: d.duration || '12s' 
    };
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
