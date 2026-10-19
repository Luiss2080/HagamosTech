import React from 'react';
import FondoTech from '../fondos/FondoTech';

const FeatureTimeline = ({ title, description, items = [], children }) => (
  <section className="relative isolate overflow-hidden px-6 py-16 sm:py-20">
    <FondoTech />
    <div className="relative z-10 mx-auto max-w-7xl">
      <header className="mx-auto mb-12 max-w-3xl text-center">
        <h2 className="text-3xl font-black uppercase tracking-tight text-white md:text-5xl">{title}</h2>
        <p className="mt-4 text-sm font-medium leading-relaxed text-slate-400 sm:text-base">{description}</p>
      </header>

      <div className="relative grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-5">
        <div aria-hidden="true" className="absolute bottom-8 left-12 top-8 border-l-2 border-dashed border-[#A3E635]/50 md:bottom-auto md:left-[16.66%] md:right-[16.66%] md:top-7 md:border-l-0 md:border-t-2" />
        {items.map((item, index) => (
          <article key={`${item.label}-${index}`} className="relative flex items-center gap-5 rounded-2xl border border-white/10 bg-[#0b0d09]/90 p-5 shadow-[0_12px_36px_rgba(0,0,0,.2)] backdrop-blur-sm md:flex-col md:border-0 md:bg-transparent md:p-0 md:text-center md:shadow-none md:backdrop-blur-0">
            <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border-2 border-[#A3E635]/60 bg-[#11150d] text-[#A3E635] shadow-[0_0_24px_rgba(163,230,53,.14)] [&>svg]:h-6 [&>svg]:w-6">
              {item.icon}
              <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full border-2 border-[#0a0a0a] bg-[#A3E635] text-[10px] font-black text-[#0a0a0a]">{index + 1}</span>
            </div>
            <div className="min-w-0 md:mt-3">
              <h3 className="text-base font-black text-white sm:text-lg">{item.label}</h3>
              <p className="mt-1 text-sm font-medium leading-relaxed text-slate-400">{item.value}</p>
            </div>
          </article>
        ))}
      </div>
      {children && <div className="relative z-10 mt-16 sm:mt-20">{children}</div>}
    </div>
  </section>
);

export default FeatureTimeline;
