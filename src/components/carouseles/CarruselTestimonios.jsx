import React, { useState, useEffect, useRef } from 'react';
import { Star, Quote } from 'lucide-react';

const TestimonialCarousel = ({ testimonials }) => {
  const [currentIndex, setCurrentIndex] = useState(testimonials.length); // Start at the middle set
  const [visibleCards, setVisibleCards] = useState(4);
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
        setVisibleCards(4);
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
                  <div className="bg-white p-6 sm:p-7 rounded-[2rem] shadow-[0_10px_35px_rgba(0,0,0,0.04)] border border-slate-100/80 flex flex-col justify-between h-full min-h-[300px] hover:shadow-[0_20px_50px_rgba(164,30,34,0.12)] hover:-translate-y-1.5 hover:border-[#c5a059]/30 dark:hover:border-[#c5a059]/30 transition-all duration-500 relative group">
                    
                    {/* Glowing Accent Border on Hover */}
                    <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-[#a41e22] to-[#c5a059] rounded-b-[2rem] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>

                    {/* Top Decor: Quote & Stars */}
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={13} fill="currentColor" className="text-amber-500" />
                        ))}
                      </div>
                      <div className="w-8 h-8 rounded-full bg-[#a41e22]/5 flex items-center justify-center text-[#a41e22] group-hover:bg-[#a41e22] group-hover:text-white transition-all duration-300">
                        <Quote size={14} className="transform rotate-185" />
                      </div>
                    </div>

                    {/* Review text */}
                    <p className="text-slate-655 text-xs sm:text-[13px] font-bold leading-relaxed mb-6 flex-grow text-left italic">
                      "{t.text}"
                    </p>

                    {/* Person Metadata */}
                    <div className="flex items-center gap-3.5 border-t border-slate-100 pt-4 mt-auto">
                      <div className="w-11 h-11 rounded-full p-[2px] bg-gradient-to-tr from-[#a41e22] to-[#c5a059] shadow-md flex-shrink-0">
                        <div className="w-full h-full rounded-full overflow-hidden bg-white">
                          <img 
                            src={t.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(t.name)}&background=a41e22&color=fff`} 
                            alt={t.name}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                      </div>
                      <div className="text-left leading-tight">
                        <h4 className="text-[12px] font-black uppercase tracking-wider text-slate-800 mb-0.5">
                          {t.name}
                        </h4>
                        <p className="text-[9px] font-bold text-gray-500">
                          {t.role}
                        </p>
                      </div>
                    </div>
                  </div>
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
              className="absolute left-0 top-1/2 -translate-y-1/2 w-11 h-11 rounded-2xl bg-white/95 border border-neutral-200/60 shadow-xl flex items-center justify-center text-[#111827] transition-all z-20 hover:scale-110 active:scale-95 hover:bg-[#a41e22] hover:text-white dark:hover:bg-[#a41e22] hover:border-transparent"
              aria-label="Anterior"
            >
              <i className="fa-solid fa-chevron-left text-xs"></i>
            </button>
            <button
              onClick={handleNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 w-11 h-11 rounded-2xl bg-white/95 border border-neutral-200/60 shadow-xl flex items-center justify-center text-[#111827] transition-all z-20 hover:scale-110 active:scale-95 hover:bg-[#a41e22] hover:text-white dark:hover:bg-[#a41e22] hover:border-transparent"
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
                    ? 'w-7 bg-[#a41e22] shadow-sm shadow-amber-955/20'
                    : 'w-2 bg-neutral-300 hover:bg-neutral-400 dark:hover:bg-neutral-700'
                }`}
                aria-label={`Ir al slide ${idx + 1}`}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TestimonialCarousel;
