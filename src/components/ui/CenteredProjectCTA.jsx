import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import FondoTech from '../fondos/FondoTech';

const CenteredProjectCTA = ({
  title,
  description,
  buttonLabel = 'Consultar mi proyecto',
  href = 'https://wa.me/59161320004',
  eyebrow = 'HAGAMOSTECH · CONVERSEMOS',
  chips = [],
}) => (
  <section className="relative z-10 overflow-hidden px-5 py-10 sm:px-6 sm:py-14">
    <FondoTech />
    <div className="group/cta relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-white/40 bg-gradient-to-br from-[#B8F34D] via-[#A3E635] to-[#8FD322] px-6 py-8 text-[#101407] shadow-[0_18px_65px_rgba(163,230,53,.2)] transition-shadow duration-300 hover:shadow-[0_24px_80px_rgba(163,230,53,.3)] sm:rounded-[2.5rem] sm:px-10 sm:py-10 lg:px-14">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(16,20,7,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(16,20,7,.12)_1px,transparent_1px)] [background-size:34px_34px]" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-28 h-64 w-64 rounded-full border border-black/10 transition-transform duration-700 group-hover/cta:translate-x-3 group-hover/cta:translate-y-3 sm:h-80 sm:w-80" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-5 -top-16 h-48 w-48 rounded-full border border-black/10 sm:h-64 sm:w-64" />
      <div className="relative z-10 grid items-center gap-6 lg:grid-cols-[1fr_auto] lg:gap-10">
        <div className="max-w-3xl">
          <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-black/15 bg-black/[0.06] px-3 py-1.5 text-[9px] font-black uppercase tracking-[.19em] text-black/70 sm:mb-4 sm:text-[10px]">
            <Sparkles size={13} aria-hidden="true" />{eyebrow}
          </span>
          <h2 className="text-3xl font-black uppercase leading-[1.02] tracking-[-.045em] text-[#111407] sm:text-4xl md:text-5xl">{title}</h2>
          <p className="mt-3 max-w-2xl text-sm font-semibold leading-relaxed text-[#26320F]/85 sm:mt-4 sm:text-base">{description}</p>
          {chips.length > 0 && (
            <ul className="mt-4 flex flex-wrap gap-2 sm:mt-5">
              {chips.map((chip) => (
                <li key={chip} className="rounded-full border border-black/10 bg-white/25 px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-wider text-[#27320F]/80 sm:text-[10px]">{chip}</li>
              ))}
            </ul>
          )}
        </div>
        <a href={href} target="_blank" rel="noopener noreferrer" className="group/btn inline-flex min-h-14 items-center justify-center gap-4 self-center rounded-full bg-[#090B06] px-6 py-3 text-[10px] font-black uppercase tracking-[.12em] text-[#B7F34D] shadow-[0_12px_30px_rgba(0,0,0,.22)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#171C0D] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-black sm:min-h-16 sm:px-8 sm:text-xs">
          <span>{buttonLabel}</span>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#A3E635]/15 transition-transform group-hover/btn:translate-x-1 sm:h-10 sm:w-10">
            <ArrowRight size={18} aria-hidden="true" />
          </span>
        </a>
      </div>
    </div>
  </section>
);

export default CenteredProjectCTA;
