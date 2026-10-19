import React from 'react';
import TechToolCard from './TechToolCard';

const ToolsMarquee = ({
  items = [],
  label = 'Herramientas del proyecto',
  description = 'Recursos que pueden evaluarse según los objetivos y el alcance acordado.',
}) => {
  if (!items.length) return null;

  return (
    <div className="relative overflow-hidden py-12" role="region" aria-label={label}>
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
                <TechToolCard key={`${tool.name}-${index}`} item={tool} index={index} />
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
