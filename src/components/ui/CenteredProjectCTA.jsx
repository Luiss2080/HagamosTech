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
  image,
  imageAlt = 'Vista representativa de una solución digital',
  embedded = false,
}) => {
  const SectionWrapper = embedded ? 'div' : 'section';

  return (
  <SectionWrapper className={`${embedded ? 'mt-10 sm:mt-12' : 'relative z-10 overflow-hidden px-5 py-10 sm:px-6 sm:py-14'}`}>
    {!embedded && <FondoTech />}
    <div className="group/cta relative mx-auto grid max-w-6xl items-center gap-6 overflow-hidden rounded-[2rem] border border-white/40 bg-gradient-to-br from-[#B8F34D] via-[#A3E635] to-[#8FD322] px-6 py-7 text-[#101407] shadow-[0_18px_65px_rgba(163,230,53,.2)] transition-shadow duration-300 hover:shadow-[0_24px_80px_rgba(163,230,53,.3)] sm:gap-8 sm:rounded-[2.5rem] sm:px-10 sm:py-9 lg:grid-cols-[1.1fr_.9fr] lg:px-12">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(16,20,7,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(16,20,7,.12)_1px,transparent_1px)] [background-size:34px_34px]" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-28 h-64 w-64 rounded-full border border-black/10 transition-transform duration-700 group-hover/cta:translate-x-3 group-hover/cta:translate-y-3 sm:h-80 sm:w-80" />
      <div className="relative z-10 max-w-3xl">
          <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-black/15 bg-black/[0.06] px-3 py-1.5 text-[9px] font-black uppercase tracking-[.19em] text-black/70 sm:mb-4 sm:text-[10px]">
            <Sparkles size={13} aria-hidden="true" />{eyebrow}
          </span>
          <h2 className="text-3xl font-black uppercase leading-[1.02] tracking-[-.045em] text-[#111407] [&_span]:text-[#111407] sm:text-4xl md:text-5xl">{title}</h2>
          <p className="mt-3 max-w-2xl text-sm font-semibold leading-relaxed text-[#26320F]/85 sm:mt-4 sm:text-base">{description}</p>
          {chips.length > 0 && (
            <ul className="mt-4 flex flex-wrap gap-2 sm:mt-5">
              {chips.map((chip) => (
                <li key={chip} className="rounded-full border border-black/10 bg-white/25 px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-wider text-[#27320F]/80 sm:text-[10px]">{chip}</li>
              ))}
            </ul>
          )}
          <a href={href} target="_blank" rel="noopener noreferrer" className="group/btn mt-5 inline-flex min-h-14 items-center justify-center gap-4 rounded-full bg-[#090B06] px-6 py-3 text-[10px] font-black uppercase tracking-[.12em] text-[#B7F34D] shadow-[0_12px_30px_rgba(0,0,0,.22)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#171C0D] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-black sm:min-h-16 sm:px-8 sm:text-xs">
          <span>{buttonLabel}</span>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#A3E635]/15 transition-transform group-hover/btn:translate-x-1 sm:h-10 sm:w-10">
            <ArrowRight size={18} aria-hidden="true" />
          </span>
        </a>
      </div>
      {image && (
        <div className="relative z-10 h-48 overflow-hidden rounded-[1.5rem] border border-black/15 bg-[#26320F] shadow-[0_14px_32px_rgba(0,0,0,.18)] sm:h-56 lg:h-full lg:min-h-64">
          <img src={image} alt={imageAlt} loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-700 group-hover/cta:scale-[1.03]" />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/5" />
        </div>
      )}
    </div>
  </SectionWrapper>
  );
};

export default CenteredProjectCTA;
