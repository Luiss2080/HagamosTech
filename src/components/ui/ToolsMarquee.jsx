import React from 'react';

const ToolsMarquee = ({ items = [], label = 'Herramientas que pueden aplicarse según el proyecto' }) => {
  if (!items.length) return null;
  return (
    <section className="relative overflow-hidden border-y border-white/[.06] bg-[#080908]/85 py-8" aria-label={label}>
      <p className="mb-5 text-center text-[10px] font-black uppercase tracking-[.22em] text-slate-400">{label}</p>
      <div className="tools-marquee relative overflow-hidden" role="group" aria-label="Carrusel de herramientas">
        <div className="tools-marquee__track flex w-max hover:[animation-play-state:paused] focus-within:[animation-play-state:paused]">
          {[0, 1].map((group) => <div key={group} className="flex shrink-0 gap-3 px-3" aria-hidden={group === 1 ? 'true' : undefined}>
            {items.map((tool, index) => <span key={`${tool.name}-${index}`} className="inline-flex min-h-12 items-center gap-3 rounded-full border border-white/10 bg-[#111410] px-5 text-xs font-bold text-slate-200 shadow-[0_8px_24px_rgba(0,0,0,.2)] transition hover:border-[#A3E635]/50 hover:bg-[#A3E635]/10 hover:text-white">
              <i className={`${tool.icon} ${tool.color || 'text-[#A3E635]'} text-base`} aria-hidden="true" />{tool.name}
            </span>)}
          </div>)}
        </div>
      </div>
      <style>{`
        @keyframes tools-marquee-scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .tools-marquee__track { animation: tools-marquee-scroll 42s linear infinite; }
        .tools-marquee:hover .tools-marquee__track, .tools-marquee:focus-within .tools-marquee__track { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) { .tools-marquee__track { animation: none; margin-inline: auto; flex-wrap: wrap; justify-content: center; width: 100%; } .tools-marquee__track > [aria-hidden="true"] { display: none; } }
      `}</style>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#080908] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#080908] to-transparent" />
    </section>
  );
};

export default ToolsMarquee;
