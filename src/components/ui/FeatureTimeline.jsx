import React from 'react';

const FeatureTimeline = ({ title, description, items = [], children }) => (
  <section className="relative isolate overflow-hidden px-6 py-14 sm:py-16">
    <div className="pointer-events-none absolute inset-x-0 top-0 h-full bg-[radial-gradient(ellipse_at_50%_18%,rgba(163,230,53,.065),transparent_58%)]" />
    <div className="relative z-10 mx-auto max-w-7xl">
      <header className="mx-auto mb-9 max-w-3xl text-center sm:mb-10">
        <h2 className="text-3xl font-black uppercase tracking-tight text-white md:text-5xl">{title}</h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm font-medium leading-relaxed text-slate-300/80 sm:text-base">{description}</p>
      </header>

      <div className="relative grid grid-cols-1 gap-3 rounded-[1.75rem] border border-white/[.08] bg-[#090c08]/55 p-3 shadow-[0_24px_70px_rgba(0,0,0,.18)] backdrop-blur-sm sm:p-4 md:grid-cols-3 md:gap-4">
        <div aria-hidden="true" className="absolute bottom-10 left-9 top-10 border-l border-dashed border-[#A3E635]/30 md:bottom-auto md:left-[16.66%] md:right-[16.66%] md:top-[44px] md:border-l-0 md:border-t" />
        {items.map((item, index) => (
          <article key={`${item.label}-${index}`} className="relative flex min-h-[96px] items-center gap-4 rounded-2xl border border-white/[.07] bg-[#0b0e09]/85 p-4 shadow-[0_12px_30px_rgba(0,0,0,.16)] md:min-h-0 md:flex-col md:gap-0 md:border-transparent md:bg-transparent md:p-3 md:text-center md:shadow-none">
            <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#A3E635]/60 bg-[#11150d] text-[#A3E635] shadow-[0_0_22px_rgba(163,230,53,.12)] [&>svg]:h-5 [&>svg]:w-5 md:h-14 md:w-14 md:rounded-[1.15rem] md:[&>svg]:h-6 md:[&>svg]:w-6">
              {item.icon}
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full border-2 border-[#0a0a0a] bg-[#A3E635] text-[9px] font-black text-[#0a0a0a]">{index + 1}</span>
            </div>
            <div className="min-w-0 md:mt-5">
              <h3 className="text-base font-black text-white sm:text-lg">{item.label}</h3>
              <p className="mt-1 text-sm font-medium leading-relaxed text-slate-300/75">{item.value}</p>
            </div>
          </article>
        ))}
      </div>
      {children && <div className="relative z-10 mt-16 sm:mt-20">{children}</div>}
    </div>
  </section>
);

export default FeatureTimeline;
