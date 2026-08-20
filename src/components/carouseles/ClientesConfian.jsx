import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  ShougangLogo,
  ArcaContinentalLogo,
  UrbanoLogo,
  TexfinaLogo,
  TaiLoyLogo,
  RintisaLogo,
  AunaLogo,
  BsfLogo,
  DaryzaLogo,
  GrupoEfeLogo,
  NexaLogo,
  ColsoLogo
} from './LogosClientes';

const ROW1 = [
  { name: 'Shougang', logoComponent: ShougangLogo, industry: 'Log+â-¡stica y Transporte', icon: 'fa-truck-fast', metric: 'Eficiencia: +94%' },
  { name: 'Arca Continental', logoComponent: ArcaContinentalLogo, industry: 'Manufactura y Distribuci+â-¦n', icon: 'fa-warehouse', metric: 'Despliegue: 100%' },
  { name: 'Urbano', logoComponent: UrbanoLogo, industry: 'Tecnolog+â-¡a / Movilidad', icon: 'fa-dolly', metric: 'Env+â-¡os: +98%' },
  { name: 'Texfina', logoComponent: TexfinaLogo, industry: 'Corporativo', icon: 'fa-building', metric: 'Procesos: +95%' },
  { name: 'Tai Loy', logoComponent: TaiLoyLogo, industry: 'E-commerce', icon: 'fa-store', metric: 'Ventas: +120%' },
  { name: 'Rintisa', logoComponent: RintisaLogo, industry: 'Fintech', icon: 'fa-wallet', metric: 'Seguridad: 100%' }
];

const ROW2 = [
  { name: 'Auna', logoComponent: AunaLogo, industry: 'Salud', icon: 'fa-heart-pulse', metric: 'Atenci+â-¦n: +99%' },
  { name: 'BSF Almacenes', logoComponent: BsfLogo, industry: 'Corporativo', icon: 'fa-boxes-stacked', metric: 'Capacidad: +96%' },
  { name: 'Daryza', logoComponent: DaryzaLogo, industry: 'Consultor+â-¡a', icon: 'fa-user-tie', metric: 'Retorno: +93%' },
  { name: 'Grupo Efe', logoComponent: GrupoEfeLogo, industry: 'Tecnolog+â-¡a', icon: 'fa-laptop-code', metric: 'Sistemas: +97%' },
  { name: 'Nexa', logoComponent: NexaLogo, industry: 'TI y Consultor+â-¡a', icon: 'fa-network-wired', metric: 'Uptime: 99.9%' },
  { name: 'Colso', logoComponent: ColsoLogo, industry: 'Log+â-¡stica', icon: 'fa-truck-ramp-box', metric: 'Tiempos: -24%' }
];

const TrustedClients = () => {
  const marqueeRow1 = [...ROW1, ...ROW1, ...ROW1];
  const marqueeRow2 = [...ROW2, ...ROW2, ...ROW2];

  return (
    <section className="pt-0 pb-16 bg-transparent relative z-10 w-full overflow-hidden reveal">
      <style>{`
        @keyframes marqueeLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marqueeRight {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .marquee-track-left {
          display: flex;
          width: max-content;
          animation: marqueeLeft 38s linear infinite;
        }
        .marquee-track-right {
          display: flex;
          width: max-content;
          animation: marqueeRight 38s linear infinite;
        }
        .marquee-track-left:hover, .marquee-track-right:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Background radial glows for web style */}
      <div className="absolute top-[30%] left-[20%] w-[350px] h-[350px] bg-[#A3E635]/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[20%] right-[20%] w-[350px] h-[350px] bg-[#A3E635]/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="w-full relative">
        
        {/* Title */}
        <div className="text-center mb-4 px-6">
          <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-black text-white leading-none">
            Clientes y marcas que <span className="text-[#A3E635] relative inline-block">conf+â-¡an en nosotros<svg className="absolute w-full h-3 -bottom-1.5 left-0 z-[-1] text-[#A3E635] drop-shadow-[0_0_8px_rgba(163,230,53,0.55)]" viewBox="0 0 200 12" preserveAspectRatio="none" fill="none"><path d="M8,8 C22,5 38,7.5 55,7.5 C130,7.5 165,7.5 188,7.5 C194,7.5 198,6 196,7.5" stroke="currentColor" strokeWidth="7" strokeLinecap="round" /></svg></span>
          </h2>
        </div>

        {/* Description */}
        <div className="text-center max-w-3xl mx-auto mb-10 px-6">
          <p className="text-sm font-semibold text-white/60 leading-relaxed">
            Trabajamos junto a empresas l+â-¡deres de diferentes industrias, ayud+â-índolas a innovar, automatizar procesos y alcanzar sus objetivos con tecnolog+â-¡a.
          </p>
        </div>

        {/* Infinite Scrolling Track spanning Full Screen */}
        <div className="flex flex-col gap-6 w-full relative">
          
          {/* Gradient fade borders for screen edges */}
          <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-[#0A0A0A] to-transparent z-20 pointer-events-none"></div>
          <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-[#0A0A0A] to-transparent z-20 pointer-events-none"></div>

          {/* Left/Right Overlapping Arrow Buttons positioned on outer margins */}
          <button className="absolute left-4 top-[24%] z-30 w-11 h-11 rounded-full bg-white border border-slate-200 shadow-2xl flex items-center justify-center text-[#A3E635] hover:scale-105 transition-all">
            <ChevronLeft size={18} />
          </button>
          <button className="absolute right-4 top-[24%] z-30 w-11 h-11 rounded-full bg-white border border-slate-200 shadow-2xl flex items-center justify-center text-[#A3E635] hover:scale-105 transition-all">
            <ChevronRight size={18} />
          </button>

          <button className="absolute left-4 top-[76%] z-30 w-11 h-11 rounded-full bg-white border border-slate-200 shadow-2xl flex items-center justify-center text-[#A3E635] hover:scale-105 transition-all">
            <ChevronLeft size={18} />
          </button>
          <button className="absolute right-4 top-[76%] z-30 w-11 h-11 rounded-full bg-white border border-slate-200 shadow-2xl flex items-center justify-center text-[#A3E635] hover:scale-105 transition-all">
            <ChevronRight size={18} />
          </button>

          {/* Row 1: Scrolling Left */}
          <div className="w-full overflow-hidden px-1">
            <div className="marquee-track-left gap-5 sm:gap-6">
              {marqueeRow1.map((client, idx) => {
                const Logo = client.logoComponent;
                const indexNum = String((idx % ROW1.length) + 1).padStart(2, '0');
                return (
                  <div
                    key={`${client.name}-r1-${idx}`}
                    className="bg-white border border-slate-200/80 rounded-2xl p-3.5 shadow-[0_8px_30px_rgba(0,0,0,0.02)] dark:shadow-[0_15px_35px_rgba(0,0,0,0.3)] hover:border-[#A3E635]/50 hover:shadow-[0_0_20px_rgba(164,30,34,0.12)] hover:-translate-y-1 transition-all duration-300 flex flex-row items-center w-[305px] sm:w-[325px] h-[135px] shrink-0 relative overflow-hidden group text-left"
                  >
                    {/* Left Column: Larger Floating Logo (no boundary border) */}
                    <div className="w-[33%] h-full flex items-center justify-center flex-shrink-0 filter">
                      <div className="w-full h-full flex items-center justify-center transform scale-[0.82] group-hover:scale-[0.92] transition-transform duration-500">
                        <Logo />
                      </div>
                    </div>

                    {/* Highly visible, solid vertical separation line */}
                    <div className="h-[80%] w-[2px] bg-[#A3E635]/50 mx-2 flex-shrink-0 group-hover:bg-[#A3E635]/80 transition-colors duration-500" />

                    {/* Right Column: Tightly grouped & Centered Content */}
                    <div className="flex-1 h-full flex flex-col justify-between items-center text-center py-0.5">
                      <div className="flex flex-col items-center justify-center w-full gap-0.5 my-auto">
                        <div className="flex items-center justify-center gap-1.5 w-full">
                          <span className="text-[10px] font-black text-[#A3E635]">
                            {indexNum}
                          </span>
                          <h4 className="text-[12px] font-black uppercase text-slate-800 tracking-wide truncate max-w-[130px] leading-tight">
                            {client.name}
                          </h4>
                        </div>
                        
                        <div className="flex items-center justify-center gap-1 text-white/60 max-w-full leading-tight">
                          <i className={`fa-solid ${client.icon} text-[#A3E635] text-[8px]`}></i>
                          <span className="text-[9px] font-bold uppercase tracking-wider truncate max-w-[125px]">
                            {client.industry}
                          </span>
                        </div>
                        
                        <div className="flex items-center justify-center gap-1 mt-0.5 leading-tight">
                          <div className="flex text-[#A3E635] text-[8px]">
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                          </div>
                          <span className="text-[8px] font-black text-[#A3E635] uppercase tracking-wider">
                            {client.metric}
                          </span>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => window.openModal?.('contactModal')}
                        className="w-full py-1.5 rounded-lg bg-[#A3E635] text-white hover:bg-[#84CC16] border border-transparent text-[8.5px] font-black uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 shadow-md shadow-[#A3E635]/15 hover:-translate-y-0.5 active:scale-95 cursor-pointer"
                      >
                        <span>Ver detalles</span>
                        <i className="fa-solid fa-arrow-up-right-from-square text-[7.5px]"></i>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Row 2: Scrolling Right */}
          <div className="w-full overflow-hidden px-1">
            <div className="marquee-track-right gap-5 sm:gap-6">
              {marqueeRow2.map((client, idx) => {
                const Logo = client.logoComponent;
                const indexNum = String((idx % ROW2.length) + ROW1.length + 1).padStart(2, '0');
                return (
                  <div
                    key={`${client.name}-r2-${idx}`}
                    className="bg-white border border-slate-200/80 rounded-2xl p-3.5 shadow-[0_8px_30px_rgba(0,0,0,0.02)] dark:shadow-[0_15px_35px_rgba(0,0,0,0.3)] hover:border-[#A3E635]/50 hover:shadow-[0_0_20px_rgba(164,30,34,0.12)] hover:-translate-y-1 transition-all duration-300 flex flex-row items-center w-[305px] sm:w-[325px] h-[135px] shrink-0 relative overflow-hidden group text-left"
                  >
                    {/* Left Column: Larger Floating Logo (no boundary border) */}
                    <div className="w-[33%] h-full flex items-center justify-center flex-shrink-0 filter">
                      <div className="w-full h-full flex items-center justify-center transform scale-[0.82] group-hover:scale-[0.92] transition-transform duration-500">
                        <Logo />
                      </div>
                    </div>

                    {/* Highly visible, solid vertical separation line */}
                    <div className="h-[80%] w-[2px] bg-[#A3E635]/50 mx-2 flex-shrink-0 group-hover:bg-[#A3E635]/80 transition-colors duration-500" />

                    {/* Right Column: Tightly grouped & Centered Content */}
                    <div className="flex-1 h-full flex flex-col justify-between items-center text-center py-0.5">
                      <div className="flex flex-col items-center justify-center w-full gap-0.5 my-auto">
                        <div className="flex items-center justify-center gap-1.5 w-full">
                          <span className="text-[10px] font-black text-[#A3E635]">
                            {indexNum}
                          </span>
                          <h4 className="text-[12px] font-black uppercase text-slate-800 tracking-wide truncate max-w-[130px] leading-tight">
                            {client.name}
                          </h4>
                        </div>
                        
                        <div className="flex items-center justify-center gap-1 text-white/60 max-w-full leading-tight">
                          <i className={`fa-solid ${client.icon} text-[#A3E635] text-[8px]`}></i>
                          <span className="text-[9px] font-bold uppercase tracking-wider truncate max-w-[125px]">
                            {client.industry}
                          </span>
                        </div>
                        
                        <div className="flex items-center justify-center gap-1 mt-0.5 leading-tight">
                          <div className="flex text-[#A3E635] text-[8px]">
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                          </div>
                          <span className="text-[8px] font-black text-[#A3E635] uppercase tracking-wider">
                            {client.metric}
                          </span>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => window.openModal?.('contactModal')}
                        className="w-full py-1.5 rounded-lg bg-[#A3E635] text-white hover:bg-[#84CC16] border border-transparent text-[8.5px] font-black uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 shadow-md shadow-[#A3E635]/15 hover:-translate-y-0.5 active:scale-95 cursor-pointer"
                      >
                        <span>Ver detalles</span>
                        <i className="fa-solid fa-arrow-up-right-from-square text-[7.5px]"></i>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default TrustedClients;
