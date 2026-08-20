import React from 'react';

const FondoTech = ({ hideWaves }) => {
    return (
        <div className="absolute inset-0 z-0 overflow-hidden bg-[#0A0A0A] pointer-events-none">
            {/* Soft Lime Orbs for depth */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#A3E635]/10 rounded-full blur-[80px] animate-float-slow"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#A3E635]/5 rounded-full blur-[100px] animate-float-medium"></div>
            <div className="absolute top-[40%] left-[60%] w-[30%] h-[30%] bg-[#84CC16]/10 rounded-full blur-[90px] animate-float-fast"></div>

            {/* Floating geometric shapes (abstract tech nodes) */}
            <svg className="absolute top-[15%] left-[10%] w-28 h-28 text-[#A3E635]/15 animate-float-slow" viewBox="0 0 200 200" fill="currentColor">
                <path d="M45.7,-76.4C58.9,-69.3,69.2,-55.9,78,-41.8C86.8,-27.7,94.2,-13.9,94.3,0.1C94.4,14.1,87.2,28.2,78.2,41.4C69.2,54.6,58.4,66.9,45.2,75.1C32,83.3,16,87.4,1.1,85.5C-13.7,83.7,-27.5,76,-40.4,67.6C-53.3,59.2,-65.4,50.1,-74.6,38.1C-83.8,26.1,-90.1,11.2,-91,-4.2C-91.9,-19.6,-87.4,-35.5,-77.8,-48.1C-68.2,-60.7,-53.5,-70,-39.1,-75.7C-24.7,-81.4,-12.3,-83.5,1.7,-86.4C15.7,-89.3,31.4,-93.1,45.7,-76.4Z" transform="translate(100 100)" />
            </svg>

            <svg className="absolute bottom-[20%] left-[15%] w-40 h-40 text-[#84CC16]/10 animate-float-medium" viewBox="0 0 200 200" fill="currentColor">
                <path d="M42.7,-73.4C56.2,-66.1,68.6,-54.6,76.6,-40.5C84.6,-26.4,88.2,-9.7,86.2,6.3C84.2,22.3,76.6,37.6,65.8,49.8C55,62,41,71.1,25.9,76.8C10.8,82.5,-5.4,84.8,-20.9,81.8C-36.4,78.8,-51.2,70.5,-63.3,58.8C-75.4,47.1,-84.8,32,-88.7,15.6C-92.6,-0.8,-91,-18.5,-83.5,-33.5C-76,-48.5,-62.6,-60.8,-47.9,-67.7C-33.2,-74.6,-16.6,-76.1,-0.1,-76C16.4,-75.9,32.8,-74.2,42.7,-73.4Z" transform="translate(100 100)" />
            </svg>

            <svg className="absolute top-[25%] right-[15%] w-20 h-20 text-[#A3E635]/15 animate-float-fast" viewBox="0 0 200 200" fill="currentColor">
                <path d="M51.5,-73.4C66.5,-64.4,78.3,-50.2,85.2,-34.1C92.1,-18,94.1,-0.1,90.3,16.4C86.5,32.9,76.9,48,63.9,59C50.9,70,34.5,76.9,17.7,81.1C0.9,85.3,-16.3,86.8,-32.4,82.3C-48.5,77.8,-63.5,67.3,-74.3,53.4C-85.1,39.5,-91.7,22.2,-93,-4.2C-94.3,-30.6,-90.3,-56.1,-76.9,-69.7C-63.5,-83.3,-40.7,-85.1,-21.9,-80C-3.1,-74.9,11.7,-63.1,25.2,-61.5C38.7,-59.9,51,-68.5,51.5,-73.4Z" transform="translate(100 100)" />
            </svg>

            {/* Micro details (glowing nodes) */}
            <div className="absolute top-[10%] left-[45%] w-2 h-2 rounded-full bg-[#A3E635]/60 animate-pulse-glow"></div>
            <div className="absolute top-[18%] left-[25%] w-1.5 h-1.5 rounded-full bg-[#A3E635]/50 animate-float-slow" style={{animationDelay: '0.3s'}}></div>
            <div className="absolute top-[22%] right-[22%] w-2 h-2 rounded-full bg-[#84CC16]/50 animate-pulse-glow" style={{animationDelay: '0.7s'}}></div>
            <div className="absolute top-[35%] left-[12%] w-1.5 h-1.5 rounded-full bg-[#A3E635]/60 animate-float-medium" style={{animationDelay: '1.1s'}}></div>
            <div className="absolute top-[40%] left-[30%] w-2 h-2 rounded-full bg-[#84CC16]/50 animate-pulse-glow"></div>
            <div className="absolute top-[48%] right-[12%] w-1.5 h-1.5 rounded-full bg-[#A3E635]/55 animate-float-fast" style={{animationDelay: '0.5s'}}></div>
            <div className="absolute top-[55%] left-[22%] w-2.5 h-2.5 rounded-full bg-[#84CC16]/45 animate-pulse-glow" style={{animationDelay: '1.3s'}}></div>
            <div className="absolute top-[60%] right-[35%] w-3 h-3 rounded-full bg-[#A3E635]/60 animate-pulse-glow" style={{animationDelay: '1s'}}></div>
            <div className="absolute bottom-[30%] left-[50%] w-1.5 h-1.5 rounded-full bg-[#84CC16]/50 animate-pulse-glow" style={{animationDelay: '0.5s'}}></div>
            <div className="absolute bottom-[20%] right-[15%] w-2 h-2 rounded-full bg-[#A3E635]/55 animate-float-slow" style={{animationDelay: '0.9s'}}></div>
            <div className="absolute bottom-[12%] left-[35%] w-1.5 h-1.5 rounded-full bg-[#A3E635]/60 animate-pulse-glow" style={{animationDelay: '1.7s'}}></div>
            <div className="absolute top-[20%] right-[40%] w-2.5 h-2.5 rounded-full bg-[#84CC16]/60 animate-float-fast" style={{animationDelay: '1.5s'}}></div>
            <div className="absolute bottom-[40%] right-[20%] w-1.5 h-1.5 rounded-full bg-[#A3E635]/60 animate-pulse-glow" style={{animationDelay: '2s'}}></div>
            <div className="absolute top-[70%] left-[60%] w-2 h-2 rounded-full bg-[#84CC16]/45 animate-float-medium" style={{animationDelay: '0.2s'}}></div>
            <div className="absolute top-[12%] right-[55%] w-1.5 h-1.5 rounded-full bg-[#A3E635]/60 animate-pulse-glow" style={{animationDelay: '2.2s'}}></div>

            {/* Grid pattern overlay for texture */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgxNjMsMjMwLDUzLDAuMDgpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-60 pointer-events-none mix-blend-screen"></div>

            {!hideWaves && (
                <>
                    <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] opacity-20">
                        <svg relative="true" viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-[calc(100%+1.3px)] h-[80px] block">
                            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-[#A3E635]"></path>
                        </svg>
                    </div>

                    <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] transform rotate-180 opacity-20">
                        <svg relative="true" viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-[calc(100%+1.3px)] h-[80px] block">
                            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-[#A3E635]"></path>
                        </svg>
                    </div>
                </>
            )}
        </div>
    );
};

export default FondoTech;
