import React, { useEffect, useMemo, useState } from 'react';

const ProcessStepsCarousel = ({ items = [], label = 'Etapas del proceso', badgePrefix = 'Paso' }) => {
  const [visibleCards, setVisibleCards] = useState(3);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const updateVisibleCards = () => {
      if (window.innerWidth < 640) setVisibleCards(1);
      else if (window.innerWidth < 1024) setVisibleCards(2);
      else setVisibleCards(3);
    };
    updateVisibleCards();
    window.addEventListener('resize', updateVisibleCards);
    return () => window.removeEventListener('resize', updateVisibleCards);
  }, []);

  const cardsPerView = Math.min(visibleCards, Math.max(items.length, 1));
  const lastIndex = Math.max(0, items.length - cardsPerView);
  const trackWidth = items.length ? (items.length * 100) / cardsPerView : 100;
  const cardWidth = items.length ? 100 / items.length : 100;
  const visibleItems = useMemo(() => items.slice(currentIndex, currentIndex + cardsPerView), [items, currentIndex, cardsPerView]);

  useEffect(() => setCurrentIndex((index) => Math.min(index, lastIndex)), [lastIndex]);

  if (!items.length) return null;

  const pathPoints = visibleItems.map((_, index) => {
    const x = ((index + 0.5) / cardsPerView) * 100;
    const y = cardsPerView === 1 ? 48 : index % 2 === 0 ? 21 : 79;
    return `${x},${y}`;
  }).join(' ');

  return (
    <section className="mx-auto w-full max-w-7xl" aria-label={label}>
      <div className="relative overflow-hidden px-1 py-4 sm:px-3 sm:py-6">
        <svg className="pointer-events-none absolute inset-x-0 top-0 z-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <polyline points={pathPoints} fill="none" stroke="rgba(163,230,53,.58)" strokeWidth="0.6" strokeDasharray="1.5 1.2" vectorEffect="non-scaling-stroke" />
        </svg>
        <div
          className="relative z-10 flex items-stretch transition-transform duration-500 ease-out"
          style={{ width: `${trackWidth}%`, transform: `translateX(-${currentIndex * cardWidth}%)` }}
        >
          {items.map((item, index) => {
            const title = item.title || item.name || `${badgePrefix} ${index + 1}`;
            const icon = item.icon || ['fa-comments', 'fa-magnifying-glass', 'fa-file-signature', 'fa-code'][index % 4];
            const isSingle = cardsPerView === 1;
            const raised = !isSingle && (index % 2 === 1);

            return (
              <div key={`${title}-${index}`} className="relative flex px-2 py-3 sm:px-3 sm:py-5" style={{ width: `${cardWidth}%` }}>
                <article className={`group relative flex min-h-[320px] w-full flex-col overflow-hidden rounded-[1.6rem] border border-white/10 bg-[#10120E] shadow-[0_18px_50px_rgba(0,0,0,.3)] transition-all duration-500 hover:-translate-y-1 hover:border-[#A3E635]/60 hover:shadow-[0_20px_55px_rgba(163,230,53,.12)] ${raised ? 'sm:translate-y-8' : 'sm:-translate-y-3'}`}>
                  <div className="relative h-36 shrink-0 overflow-hidden bg-[#171A13] sm:h-40">
                    {item.image ? <img src={item.image} alt={`Imagen relacionada con ${title}`} loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" /> : <div role="img" aria-label={`Imagen relacionada con ${title}`} className="h-full w-full bg-[radial-gradient(ellipse_at_70%_30%,rgba(163,230,53,.36),transparent_40%),linear-gradient(135deg,#22291a,#090a08)]" />}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#10120E] via-black/10 to-black/20" />
                    <span className="absolute left-4 top-4 rounded-full border border-[#A3E635]/45 bg-[#0A0A0A]/85 px-3 py-1.5 text-[9px] font-black uppercase tracking-[.16em] text-[#A3E635] backdrop-blur">{item.category || `${badgePrefix} ${String(index + 1).padStart(2, '0')}`}</span>
                  </div>
                  <div className="relative flex flex-1 flex-col p-5 sm:p-6">
                    <div className="-mt-10 mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border-[3px] border-[#10120E] bg-[#A3E635] text-lg text-black shadow-[0_8px_24px_rgba(163,230,53,.22)]">
                      {typeof icon === 'string' ? <i className={`fa-solid ${icon}`} aria-hidden="true" /> : icon}
                    </div>
                    <h3 className="mb-2 text-lg font-extrabold leading-snug text-white transition-colors group-hover:text-[#A3E635] sm:text-xl">{title}</h3>
                    <p className="text-sm leading-relaxed text-slate-300/85">{item.desc || item.description}</p>
                    {item.tags?.length > 0 && <div className="mt-auto flex flex-wrap gap-2 pt-4">{item.tags.map((tag) => <span key={tag} className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-slate-300">{tag}</span>)}</div>}
                  </div>
                </article>
              </div>
            );
          })}
        </div>
        <div className="pointer-events-none absolute inset-0 z-20">
          {visibleItems.map((item, index) => <span key={`${item.title || item.name}-${index}`} className="absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-[#050505] bg-[#A3E635] shadow-[0_0_18px_rgba(163,230,53,.8)]" style={{ left: `${((index + 0.5) / cardsPerView) * 100}%`, top: `${cardsPerView === 1 ? 48 : index % 2 === 0 ? 21 : 79}%` }} />)}
        </div>
      </div>
      {lastIndex > 0 && <div className="mt-6 flex items-center justify-center gap-3" aria-label="Navegación de etapas">
        <button type="button" onClick={() => setCurrentIndex((index) => Math.max(0, index - 1))} disabled={currentIndex === 0} aria-label="Ver pasos anteriores" className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#A3E635]/30 bg-[#A3E635]/10 text-[#A3E635] transition hover:bg-[#A3E635] hover:text-black disabled:cursor-not-allowed disabled:opacity-40"><i className="fa-solid fa-chevron-left" aria-hidden="true" /></button>
        <div className="flex items-center gap-2" role="group" aria-label="Elegir paso">
          {Array.from({ length: lastIndex + 1 }, (_, index) => <button key={index} type="button" onClick={() => setCurrentIndex(index)} aria-label={`Mostrar pasos desde el ${index + 1}`} aria-current={currentIndex === index ? 'true' : undefined} className={`h-2 rounded-full transition-all ${currentIndex === index ? 'w-7 bg-[#A3E635]' : 'w-2 bg-neutral-600 hover:bg-[#A3E635]/60'}`} />)}
        </div>
        <button type="button" onClick={() => setCurrentIndex((index) => Math.min(lastIndex, index + 1))} disabled={currentIndex === lastIndex} aria-label="Ver más pasos" className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#A3E635]/30 bg-[#A3E635]/10 text-[#A3E635] transition hover:bg-[#A3E635] hover:text-black disabled:cursor-not-allowed disabled:opacity-40"><i className="fa-solid fa-chevron-right" aria-hidden="true" /></button>
      </div>}
    </section>
  );
};

export default ProcessStepsCarousel;
