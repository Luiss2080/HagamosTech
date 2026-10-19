import React from 'react';

const ToolsMarquee = ({
  items = [],
  label = 'Herramientas del proyecto',
  description = 'Recursos que pueden evaluarse según los objetivos y el alcance acordado.',
}) => {
  if (!items.length) return null;

  return (
    <div className="relative overflow-hidden py-12" aria-label={label}>
      <div className="mx-auto mb-8 max-w-3xl px-6 text-center">
        <h2 className="text-2xl font-black uppercase tracking-tight text-white sm:text-3xl">
          {label}
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm font-medium leading-relaxed text-slate-400 sm:text-base">
          {description}
        </p>
      </div>

      <div className="tools-marquee relative overflow-hidden" role="group" aria-label={`Carrusel: ${label}`}>
        <div className="tools-marquee__track flex w-max hover:[animation-play-state:paused] focus-within:[animation-play-state:paused]">
          {[0, 1].map((group) => (
            <div
              key={group}
              className="flex shrink-0 gap-4 px-2 py-3"
              aria-hidden={group === 1 ? 'true' : undefined}
            >
              {items.map((tool, index) => (
                <article
                  key={`${tool.name}-${index}`}
                  className="flex min-h-[132px] w-[min(310px,84vw)] shrink-0 items-center gap-4 rounded-[20px] border border-neutral-100 border-b-[5px] border-b-[#A3E635] bg-white p-4 text-left shadow-[0_8px_30px_rgba(0,0,0,.16)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(0,0,0,.24)] sm:w-[340px] sm:p-5"
                >
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[14px] border border-gray-100 bg-gray-50 p-3 sm:h-[72px] sm:w-[72px]">
                    <i className={`${tool.icon} ${tool.color || 'text-[#84CC16]'} text-3xl`} aria-hidden="true" />
                  </div>
                  <div className="h-20 w-px shrink-0 bg-gradient-to-b from-transparent via-[#A3E635]/50 to-transparent" />
                  <div className="min-w-0 flex-1">
                    <div className="mb-2 flex items-start gap-2">
                      <span className="text-xs font-black text-[#84CC16]">{String(index + 1).padStart(2, '0')}</span>
                      <h3 className="line-clamp-2 text-sm font-extrabold leading-tight text-gray-800 sm:text-base">
                        {tool.name}
                      </h3>
                    </div>
                    <p className="text-[10px] font-bold uppercase tracking-[.14em] text-gray-500">
                      {tool.tag || 'Recurso tecnológico'}
                    </p>
                    <p className="mt-2 text-[10px] font-bold text-gray-400">
                      A evaluar según el proyecto
                    </p>
                  </div>
                </article>
              ))}
            </div>
          ))}
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
    </div>
  );
};

export default ToolsMarquee;
