import React, { useState, useEffect, useRef } from 'react';
import { Lightbulb, Quote } from 'lucide-react';

const TestimonialCarousel = ({
  testimonials,
  title = 'Ideas para tu proyecto',
  description = 'Ejemplos orientativos; el alcance y la propuesta se definen para cada caso.',
}) => {
  const [currentIndex, setCurrentIndex] = useState(testimonials.length); // Start at the middle set
  const [visibleCards, setVisibleCards] = useState(3);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setVisibleCards(1);
      } else if (width < 768) {
        setVisibleCards(2);
      } else if (width < 1200) {
        setVisibleCards(3);
      } else {
        setVisibleCards(3);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const N = testimonials.length;
  // Triple the items to create a seamless infinite loop
  const tripledItems = [...testimonials, ...testimonials, ...testimonials];

  // Auto-play: scroll one card every 4.0 seconds
  useEffect(() => {
    if (isPaused || N <= visibleCards) return;
    const interval = setInterval(() => {
      setTransitionEnabled(true);
      setCurrentIndex((prev) => prev + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, [isPaused, N, visibleCards]);

  const handleTransitionEnd = () => {
    if (currentIndex >= N * 2) {
      setTransitionEnabled(false);
      setCurrentIndex(currentIndex - N);
    } else if (currentIndex < N) {
      setTransitionEnabled(false);
      setCurrentIndex(currentIndex + N);
    }
  };

  useEffect(() => {
    if (!transitionEnabled) {
      const timer = setTimeout(() => {
        setTransitionEnabled(true);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [transitionEnabled]);

  const handlePrev = () => {
    setTransitionEnabled(true);
    setCurrentIndex((prev) => prev - 1);
  };

  const handleNext = () => {
    setTransitionEnabled(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
  };

  const canNavigate = N > visibleCards;
  const cardPercent = 100 / tripledItems.length;
  const trackWidthPercent = (tripledItems.length * 100) / visibleCards;

  return (
    <div className="mx-auto w-full max-w-7xl">
      <header className="mx-auto mb-3 max-w-3xl px-6 text-center">
        <h2 className="text-3xl font-black uppercase leading-tight tracking-tight text-white sm:text-4xl">
          {title}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm font-medium leading-relaxed text-slate-400 sm:text-base">
          {description}
        </p>
      </header>
    <div 
      className="relative w-full overflow-hidden py-8 px-1 sm:px-4"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div 
        className="w-full relative px-2 sm:px-8"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="overflow-hidden py-4">
          <div
            className={`flex ${transitionEnabled ? 'transition-transform duration-500 ease-in-out' : ''}`}
            onTransitionEnd={handleTransitionEnd}
            style={{
              width: `${trackWidthPercent}%`,
              transform: `translateX(-${currentIndex * cardPercent}%)`
            }}
          >
            {tripledItems.map((t, idx) => {
              const uniqueKey = `${t.name}-${idx}`;
              return (
                <div
                  key={uniqueKey}
                  style={{ width: `${cardPercent}%` }}
                  className="px-3"
                >
                  <article className="overflow-hidden bg-gradient-to-br from-[#A3E635]/[0.12] via-[#11140d] to-[#090a08] p-6 sm:p-7 rounded-[2rem] shadow-[0_12px_40px_rgba(0,0,0,0.3)] border border-[#A3E635]/30 flex flex-col items-center justify-center text-center h-full min-h-[320px] hover:shadow-[0_20px_50px_rgba(163,230,53,0.18)] hover:-translate-y-1 hover:border-[#A3E635]/60 transition-all duration-300 relative group">
                    
                    {/* Glowing Accent Border on Hover */}
                    <div className="absolute inset-x-8 top-0 h-1 rounded-full bg-gradient-to-r from-[#A3E635] via-[#84CC16] to-transparent"></div>
                    <div className="absolute -right-12 -top-14 h-36 w-36 rounded-full bg-[#A3E635]/[0.08] blur-3xl pointer-events-none"></div>

                    {/* Indicador visual para ejemplos orientativos */}
                    <div className="mb-5 flex flex-col items-center gap-3">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#A3E635]/35 bg-[#A3E635]/10 text-[#A3E635] shadow-[0_0_28px_rgba(163,230,53,.12)] group-hover:bg-[#A3E635] group-hover:text-[#0A0A0A] transition-all duration-300">
                        <Quote size={25} aria-hidden="true" />
                      </div>
                      <span className="inline-flex items-center gap-1.5 text-[9px] font-black uppercase tracking-[0.16em] text-[#C9F88D]"><Lightbulb size={12} aria-hidden="true" /> {t.role || 'Ejemplo orientativo'}</span>
                    </div>

                    {/* Example text */}
                    <h3 className="text-white text-lg sm:text-xl font-black leading-snug">{t.name}</h3>
                    <p className="mt-3 mb-5 max-w-sm text-slate-200 text-sm sm:text-[15px] font-medium leading-relaxed">{t.text}</p>

                  </article>
                </div>
              );
            })}
          </div>
        </div>

        {/* Navigation Buttons */}
        {canNavigate && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 w-11 h-11 rounded-2xl bg-white/95 dark:bg-neutral-900/90 border border-[#A3E635]/40 shadow-xl flex items-center justify-center text-[#111827] dark:text-[#A3E635] transition-all z-20 hover:scale-110 active:scale-95 hover:bg-[#A3E635] hover:text-[#0A0A0A] dark:hover:bg-[#A3E635] hover:border-transparent"
              aria-label="Anterior"
            >
              <i className="fa-solid fa-chevron-left text-xs"></i>
            </button>
            <button
              onClick={handleNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 w-11 h-11 rounded-2xl bg-white/95 dark:bg-neutral-900/90 border border-[#A3E635]/40 shadow-xl flex items-center justify-center text-[#111827] dark:text-[#A3E635] transition-all z-20 hover:scale-110 active:scale-95 hover:bg-[#A3E635] hover:text-[#0A0A0A] dark:hover:bg-[#A3E635] hover:border-transparent"
              aria-label="Siguiente"
            >
              <i className="fa-solid fa-chevron-right text-xs"></i>
            </button>
          </>
        )}
      </div>

      {/* Pagination Indicators */}
      {canNavigate && (
        <div className="flex justify-center items-center gap-2 mt-6">
          {Array.from({ length: N }).map((_, idx) => {
            const activeIdx = (currentIndex - N + N) % N;
            return (
              <button
                key={idx}
                onClick={() => {
                  setTransitionEnabled(true);
                  setCurrentIndex(N + idx);
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeIdx === idx
                    ? 'w-7 bg-[#A3E635] shadow-sm shadow-amber-955/20'
                    : 'w-2 bg-neutral-300 hover:bg-neutral-400 dark:hover:bg-neutral-700'
                }`}
                aria-label={`Ir al slide ${idx + 1}`}
              />
            );
          })}
        </div>
      )}
    </div>
    </div>
  );
};

export default TestimonialCarousel;
