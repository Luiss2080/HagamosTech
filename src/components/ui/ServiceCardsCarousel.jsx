import React, { useEffect, useState } from 'react';

const PROCESS_IMAGES = [
  'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=900&q=80',
];

const DEFAULT_ICONS = ['fa-magnifying-glass', 'fa-palette', 'fa-code', 'fa-rocket'];

const ServiceCardsCarousel = ({ items = [], label = 'Tarjetas de servicios' }) => {
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

  useEffect(() => {
    setCurrentIndex((index) => Math.min(index, lastIndex));
  }, [lastIndex]);

  if (!items.length) return null;

  return (
    <section className="mx-auto w-full max-w-6xl" aria-label={label}>
      <div className="relative overflow-hidden px-1 sm:px-3">
        <div
          className="flex items-stretch transition-transform duration-500 ease-out"
          style={{
            width: `${trackWidth}%`,
            transform: `translateX(-${currentIndex * cardWidth}%)`,
          }}
        >
          {items.map((item, index) => {
            const icon = item.icon || DEFAULT_ICONS[index % DEFAULT_ICONS.length];
            const image = item.image || PROCESS_IMAGES[index % PROCESS_IMAGES.length];
            const title = item.title || item.name || `Etapa ${index + 1}`;

            return (
              <div
                key={`${title}-${index}`}
                className="h-full px-2 sm:px-3"
                style={{ width: `${cardWidth}%` }}
              >
                <article className="group relative flex h-full min-h-[370px] flex-col overflow-hidden rounded-[2rem] border border-neutral-800 bg-[#111111] shadow-[0_0_30px_rgba(0,0,0,0.35)] transition-all duration-500 hover:-translate-y-1 hover:border-[#A3E635]/50 hover:shadow-[0_15px_40px_rgba(163,230,53,0.14)]">
                  <div className="relative h-48 shrink-0 overflow-hidden bg-neutral-900 sm:h-52">
                    <img
                      src={image}
                      alt={`Imagen relacionada con ${title}`}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-black/10 to-transparent" />
                    <span className="absolute left-4 top-4 rounded-full border border-[#A3E635]/40 bg-black/70 px-3 py-1 text-[9px] font-black uppercase tracking-[0.16em] text-[#A3E635] backdrop-blur">
                      {item.category || `Etapa 0${index + 1}`}
                    </span>
                  </div>

                  <div className="relative flex flex-1 flex-col p-6 sm:p-7">
                    <div className="-mt-11 mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border-4 border-[#111111] bg-[#A3E635] text-xl text-black shadow-[0_0_20px_rgba(163,230,53,0.28)] transition-transform duration-300 group-hover:rotate-3 group-hover:scale-105">
                      {typeof icon === 'string' ? <i className={`fa-solid ${icon}`} aria-hidden="true" /> : icon}
                    </div>
                    <h3 className="mb-3 text-lg font-black uppercase leading-tight tracking-tight text-white transition-colors group-hover:text-[#A3E635] sm:text-xl">
                      {title}
                    </h3>
                    <p className="text-sm font-medium leading-relaxed text-slate-400">
                      {item.desc || item.description}
                    </p>
                    {item.tags?.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {item.tags.map((tag) => (
                          <span key={tag} className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-slate-300">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </article>
              </div>
            );
          })}
        </div>
      </div>

      {lastIndex > 0 && (
        <div className="mt-6 flex items-center justify-center gap-3" aria-label="Navegación de tarjetas">
          <button
            type="button"
            onClick={() => setCurrentIndex((index) => Math.max(0, index - 1))}
            disabled={currentIndex === 0}
            aria-label="Ver tarjetas anteriores"
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#A3E635]/30 bg-[#A3E635]/10 text-[#A3E635] transition hover:bg-[#A3E635] hover:text-black disabled:cursor-not-allowed disabled:opacity-40"
          >
            <i className="fa-solid fa-chevron-left" aria-hidden="true" />
          </button>
          <div className="flex items-center gap-2" role="group" aria-label="Elegir tarjeta">
            {Array.from({ length: lastIndex + 1 }, (_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setCurrentIndex(index)}
                aria-label={`Mostrar tarjetas desde la ${index + 1}`}
                aria-current={currentIndex === index ? 'true' : undefined}
                className={`h-2 rounded-full transition-all ${currentIndex === index ? 'w-7 bg-[#A3E635]' : 'w-2 bg-neutral-600 hover:bg-[#A3E635]/60'}`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => setCurrentIndex((index) => Math.min(lastIndex, index + 1))}
            disabled={currentIndex === lastIndex}
            aria-label="Ver más tarjetas"
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#A3E635]/30 bg-[#A3E635]/10 text-[#A3E635] transition hover:bg-[#A3E635] hover:text-black disabled:cursor-not-allowed disabled:opacity-40"
          >
            <i className="fa-solid fa-chevron-right" aria-hidden="true" />
          </button>
        </div>
      )}
    </section>
  );
};

export default ServiceCardsCarousel;
