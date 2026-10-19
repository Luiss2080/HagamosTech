import React from 'react';
import { ArrowRight, Terminal } from 'lucide-react';

const CenteredProjectCTA = ({
  title,
  description,
  buttonLabel = 'Consultar mi proyecto',
  href = 'https://wa.me/59161320004',
  eyebrow = 'HAGAMOSTECH · CONVERSEMOS',
}) => (
  <section className="relative z-10 px-6 py-20 pb-28">
    <div className="group/cta relative mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] border border-[#C9FF70]/35 bg-[#A3E635] px-7 py-14 text-center text-[#080A06] shadow-[0_24px_90px_rgba(163,230,53,.17)] transition-shadow duration-500 hover:shadow-[0_28px_100px_rgba(163,230,53,.28)] sm:px-12 sm:py-20 md:rounded-[3rem] md:px-20 md:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(8,10,6,.055)_1px,transparent_1px),linear-gradient(90deg,rgba(8,10,6,.055)_1px,transparent_1px)] bg-[size:46px_46px] opacity-25 transition-opacity duration-500 group-hover/cta:opacity-50" />
      <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-white/35 blur-3xl transition-transform duration-700 group-hover/cta:translate-x-8 group-hover/cta:translate-y-5" />
      <div className="pointer-events-none absolute -bottom-40 -left-20 h-80 w-80 rounded-full bg-[#5E9F0D]/30 blur-3xl transition-transform duration-700 group-hover/cta:-translate-y-8" />
      <div className="relative z-10 mx-auto max-w-3xl">
        <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-black/15 bg-white/20 px-4 py-2 text-[9px] font-black uppercase tracking-[.2em] text-black/70">
          <span className="h-2 w-2 rounded-full bg-black/70" />{eyebrow}
        </span>
        <h2 className="mb-5 text-3xl font-black uppercase leading-[1.04] tracking-[-.04em] drop-shadow-[0_3px_2px_rgba(0,0,0,.12)] sm:text-5xl md:text-6xl">{title}</h2>
        <p className="mx-auto mb-9 max-w-2xl text-base font-semibold leading-relaxed text-black/75 sm:text-lg md:text-xl">{description}</p>
        <a href={href} target="_blank" rel="noopener noreferrer" className="group/btn inline-flex min-h-16 items-center gap-5 rounded-full bg-black px-7 py-3 text-xs font-black uppercase tracking-[.13em] text-[#A3E635] shadow-[0_18px_38px_rgba(0,0,0,.3)] transition-all duration-300 hover:-translate-y-1 hover:scale-[1.025] hover:bg-[#10140A] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-black sm:px-12 sm:text-sm">
          <span>{buttonLabel}</span>
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#A3E635]/15 transition-all group-hover/btn:translate-x-1 group-hover/btn:bg-[#A3E635]/25">
            <Terminal className="hidden sm:block" size={19} aria-hidden="true" />
            <ArrowRight className="sm:hidden" size={19} aria-hidden="true" />
          </span>
        </a>
      </div>
    </div>
  </section>
);

export default CenteredProjectCTA;
