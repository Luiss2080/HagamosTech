import React, { useEffect, useState } from 'react';

const ModernServiceGrid = ({ projects = [] }) => {
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

  const itemCount = projects.length;
  const cardsPerView = Math.min(visibleCards, Math.max(itemCount, 1));
  const lastIndex = Math.max(0, itemCount - cardsPerView);
  const trackWidth = itemCount ? (itemCount * 100) / cardsPerView : 100;
  const cardWidth = itemCount ? 100 / itemCount : 100;
  const offset = currentIndex * cardWidth;

  useEffect(() => {
    setCurrentIndex((index) => Math.min(index, lastIndex));
  }, [lastIndex]);

  const goTo = (index) => setCurrentIndex(Math.min(Math.max(index, 0), lastIndex));

  return (
    <section className="w-full" aria-label="Servicios disponibles">
      <div className="relative overflow-hidden px-1 sm:px-3">
        <div
          className="flex items-stretch transition-transform duration-500 ease-out"
          style={{
            width: `${trackWidth}%`,
            transform: `translateX(-${offset}%)`,
          }}
        >
          {projects.map((project, index) => (
            <div key={`${project.num || project.title || 'solucion'}-${index}`} className="h-full px-2 sm:px-3" style={{ width: `${cardWidth}%` }}>
              <article className="group relative flex min-h-[380px] h-full flex-col overflow-hidden rounded-[2rem] border border-neutral-800 bg-neutral-900/40 shadow-[0_0_30px_rgba(0,0,0,0.5)] transition-all duration-500 hover:-translate-y-1 hover:border-[#A3E635]/50 hover:shadow-[#A3E635]/15">
                <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
                  <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/90 to-transparent" />
                  <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#0A0A0A]/60 via-transparent to-transparent" />
                  {project.images?.length > 0 && (
                    <img
                      src={project.images[index % project.images.length]}
                      alt=""
                      aria-hidden="true"
                      className="h-full w-full object-cover opacity-[0.24] mix-blend-screen transition-all duration-700 group-hover:scale-110 group-hover:opacity-[0.36]"
                    />
                  )}
                </div>

                <div className="relative z-10 flex h-full flex-col justify-between p-6 sm:p-8">
                  <div>
                    <div className="mb-8 flex items-start justify-between">
                      <span className="select-none bg-gradient-to-b from-white/20 to-transparent bg-clip-text text-5xl font-black text-transparent">
                        {project.num || `0${index + 1}`}
                      </span>
                      <span className="rounded-xl border border-white/10 bg-black/40 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-[#A3E635] backdrop-blur-md">
                        {project.category || (project.title ? project.title.split(':')[0] : '')}
                      </span>
                    </div>

                    <div className="mb-4">
                      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#A3E635] bg-[#A3E635] text-black shadow-[0_0_15px_rgba(163,230,53,0.3)] transition-all duration-300 group-hover:rotate-3 group-hover:scale-110">
                        <i className={`fa-solid ${project.icon || 'fa-star'} text-2xl`} aria-hidden="true" />
                      </div>
                      <h3 className="text-xl font-black uppercase leading-tight tracking-tight text-white sm:text-2xl">
                        {project.firstPart || (project.title ? project.title.split(':')[0] : '')}
                        <br className="hidden sm:block" />
                        <span className="text-[#A3E635]">
                          {project.highlightPart || (project.title ? project.title.split(':')[1] : '')}
                        </span>
                      </h3>
                    </div>

                    <p className="mb-8 text-sm font-medium leading-relaxed text-slate-400">{project.desc}</p>
                  </div>

                  <div className="mt-auto border-t border-neutral-800/60 pt-5">
                    <a
                      href={`https://wa.me/59161320004?text=Hola,%20quisiera%20más%20detalles%20sobre%20${encodeURIComponent(project.category || project.title || 'este servicio')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex w-full items-center justify-center gap-3 rounded-xl border border-[#A3E635] bg-[#A3E635] py-3.5 text-[11px] font-black uppercase tracking-[0.15em] text-black shadow-[0_0_15px_rgba(163,230,53,0.2)] transition-all duration-300 hover:border-[#84CC16] hover:bg-[#84CC16] hover:shadow-[0_0_25px_rgba(163,230,53,0.4)]"
                    >
                      <span>Ver detalles</span>
                      <i className="fa-solid fa-arrow-right text-[10px] transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>

      {lastIndex > 0 && (
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3" aria-label="Navegación de soluciones">
          <button
            type="button"
            onClick={() => goTo(currentIndex - 1)}
            disabled={currentIndex === 0}
            aria-label="Ver soluciones anteriores"
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#A3E635]/30 bg-[#A3E635]/10 text-[#A3E635] transition hover:bg-[#A3E635] hover:text-black disabled:cursor-not-allowed disabled:opacity-40"
          >
            <i className="fa-solid fa-chevron-left" aria-hidden="true" />
          </button>
          <div className="flex items-center gap-2" role="group" aria-label="Elegir grupo de soluciones">
            {Array.from({ length: lastIndex + 1 }, (_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => goTo(index)}
                aria-label={`Mostrar soluciones desde la tarjeta ${index + 1}`}
                aria-current={currentIndex === index ? 'true' : undefined}
                className={`h-2 rounded-full transition-all ${currentIndex === index ? 'w-7 bg-[#A3E635]' : 'w-2 bg-neutral-600 hover:bg-[#A3E635]/60'}`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => goTo(currentIndex + 1)}
            disabled={currentIndex === lastIndex}
            aria-label="Ver más soluciones"
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#A3E635]/30 bg-[#A3E635]/10 text-[#A3E635] transition hover:bg-[#A3E635] hover:text-black disabled:cursor-not-allowed disabled:opacity-40"
          >
            <i className="fa-solid fa-chevron-right" aria-hidden="true" />
          </button>
        </div>
      )}
    </section>
  );
};

export default ModernServiceGrid;
