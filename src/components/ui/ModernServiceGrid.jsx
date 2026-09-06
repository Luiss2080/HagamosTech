import React from 'react';

const ModernServiceGrid = ({ projects }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
      {projects.map((p, index) => (
        <div
          key={index}
          className="group relative rounded-[2rem] overflow-hidden bg-neutral-900/40 border border-neutral-800 hover:border-[#A3E635]/50 transition-all duration-500 shadow-[0_0_30px_rgba(0,0,0,0.5)] hover:shadow-[#A3E635]/15 flex flex-col min-h-[380px] hover:-translate-y-1"
        >
          {/* Background Image with Gradient Overlay */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/90 to-transparent z-10"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/60 via-transparent to-transparent z-10"></div>
            {p.images && p.images[0] && (
              <img
                src={p.images[0]}
                alt={p.category || p.title}
                className="w-full h-full object-cover opacity-[0.15] group-hover:opacity-[0.25] group-hover:scale-110 transition-all duration-700 mix-blend-screen"
              />
            )}
          </div>

          {/* Content Wrapper */}
          <div className="relative z-10 p-6 sm:p-8 flex flex-col h-full justify-between">
            <div>
              {/* Header Row: Num & Category Tag */}
              <div className="flex justify-between items-start mb-8">
                <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white/20 to-transparent select-none">
                  {p.num || `0${index + 1}`}
                </span>
                <div className="px-3 py-1.5 bg-black/40 backdrop-blur-md border border-white/10 rounded-xl">
                  <span className="text-[10px] font-black text-[#A3E635] uppercase tracking-widest">
                    {p.category || (p.title ? p.title.split(":")[0] : "")}
                  </span>
                </div>
              </div>

              {/* Icon & Title */}
              <div className="mb-4">
                <div className="w-14 h-14 rounded-2xl bg-black/60 backdrop-blur-md border border-neutral-800 flex items-center justify-center text-[#A3E635] mb-5 group-hover:bg-[#A3E635] group-hover:text-black group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                  <i className={`fa-solid ${p.icon || 'fa-star'} text-2xl`}></i>
                </div>
                
                <h3 className="text-xl sm:text-2xl font-black text-white leading-tight uppercase tracking-tight">
                  {p.firstPart || (p.title ? p.title.split(":")[0] : "")} <br className="hidden sm:block" />
                  <span className="text-[#A3E635]">
                    {p.highlightPart || (p.title ? p.title.split(":")[1] : "")}
                  </span>
                </h3>
              </div>

              {/* Description */}
              <p className="text-slate-400 text-sm font-medium leading-relaxed mb-8">
                {p.desc}
              </p>
            </div>

            {/* CTA Button */}
            <div className="pt-5 border-t border-neutral-800/60 mt-auto">
              <a
                href={`https://wa.me/59161320004?text=Hola,%20quisiera%20más%20detalles%20sobre%20${encodeURIComponent(p.category || p.title || 'este servicio')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-xl bg-black/40 hover:bg-[#A3E635] text-white hover:text-black border border-neutral-800 hover:border-[#A3E635] text-[11px] font-black uppercase tracking-[0.15em] transition-all duration-300 flex items-center justify-center gap-3 backdrop-blur-sm shadow-md"
              >
                <span>Ver detalles</span>
                <i className="fa-solid fa-arrow-right text-[10px] group-hover/btn:translate-x-1 transition-transform"></i>
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ModernServiceGrid;
