import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div className="group relative bg-white rounded-[2.5rem] shadow-lg shadow-orange-100/50 hover:shadow-2xl hover:shadow-orange-500/15 transition-all duration-500 hover:-translate-y-1.5 overflow-hidden flex flex-col sm:flex-row h-full border-2 border-orange-50 hover:border-[#FF4D00]/30">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FF4D00] via-[#8B3A13] to-[#FF4D00] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 z-50"></div>

      {/* Left: Image */}
      <div className="relative w-full sm:w-[38%] h-48 sm:h-auto overflow-hidden shrink-0 bg-[#fef6f2]">
        <img src={product.coverImg} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-black/50 sm:from-black/30 sm:to-transparent to-transparent"></div>

        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#FF4D00] text-white text-[8px] font-black uppercase tracking-wider shadow-md">
            <i className="fas fa-star text-[7px]"></i> HAGAMOSTECH
          </span>
        </div>

        <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#5D3A1F]/85 backdrop-blur-sm text-white text-[8px] font-black uppercase tracking-wider border border-white/15">
            <i className={`fa-solid ${product.icon} text-[#FF4D00] text-[7px]`}></i> {product.type || 'Clásico'}
          </span>
        </div>

        <div className="absolute bottom-3 right-3 w-10 h-10 rounded-xl bg-[#FF4D00] flex items-center justify-center shadow-lg border-2 border-white/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
          <i className={`fa-solid ${product.icon} text-white text-sm`}></i>
        </div>
      </div>

      {/* Right: Content */}
      <div className="flex-1 p-4 sm:p-5 flex flex-col relative">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#FF4D00]/10 text-[#FF4D00] text-[8px] font-black uppercase tracking-[0.15em] border border-[#FF4D00]/15">
              {product.subtitle}
            </span>
            <span className="text-[9px] font-black text-[#5D3A1F] uppercase tracking-wider flex items-center gap-1">
              <i className="fas fa-fire text-[#FF4D00] text-[8px]"></i> {product.type || 'Clásico'}
            </span>
          </div>

          {(() => {
            const words = product.name.trim().split(' ');
            const last = words.pop();
            const rest = words.join(' ');
            return (
              <h3 className="text-center text-sm sm:text-base font-black font-heading text-[#8B4513] leading-tight mb-0.5">
                {rest}{' '}
                <span className="relative inline-block text-[#FF4D00]">
                  {last}
                  <svg className="absolute w-full h-[6px] -bottom-0.5 left-0 text-amber-500 drop-shadow-[0_0_5px_rgba(245,158,11,0.4)]" viewBox="0 0 100 6" preserveAspectRatio="none" fill="none"><path d="M4,4 C20,1.5 50,4 96,3.5" stroke="currentColor" strokeWidth="5" strokeLinecap="round" /></svg>
                </span>
              </h3>
            );
          })()}

          <p className="text-center text-[11px] text-[#1F2937] font-medium leading-relaxed mb-3 px-1 mt-2">
            {product.desc}
          </p>

          {/* Includes tags */}
          {product.includes && (
            <div className="flex flex-wrap justify-center gap-1 mb-3">
              {product.includes.map((inc, i) => (
                <span key={i} className="inline-flex items-center gap-1 text-[7px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#8B4513]/5 text-[#8B4513] border border-[#8B4513]/10">
                  <i className="fas fa-circle-check text-[#FF4D00] text-[6px]"></i> {inc}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-4 gap-2 py-2.5 border-y border-orange-100 my-2">
          <div className="text-center">
            <i className="fas fa-weight-scale text-[#FF4D00]/70 text-[10px] mb-0.5 block"></i>
            <span className="text-[7px] font-black uppercase tracking-wider text-slate-400 block">Tamaño</span>
            <span className="text-[10px] font-black text-[#0d1b3e] mt-0.5 block">{product.size || 'Regular'}</span>
          </div>
          <div className="text-center border-x border-orange-100">
            <i className="fas fa-clock text-[#FF4D00]/70 text-[10px] mb-0.5 block"></i>
            <span className="text-[7px] font-black uppercase tracking-wider text-slate-400 block">Disponible</span>
            <span className="text-[10px] font-black text-green-600 mt-0.5 block">Ahora</span>
          </div>
          <div className="text-center border-r border-orange-100">
            <i className={`fa-solid ${product.icon} text-[#FF4D00]/70 text-[10px] mb-0.5 block`}></i>
            <span className="text-[7px] font-black uppercase tracking-wider text-slate-400 block">Tipo</span>
            <span className="text-[10px] font-black text-[#0d1b3e] mt-0.5 block">{product.type || 'Clásico'}</span>
          </div>
          <div className="text-center">
            <i className="fas fa-star text-amber-400 text-[10px] mb-0.5 block"></i>
            <span className="text-[7px] font-black uppercase tracking-wider text-slate-400 block">Rating</span>
            <span className="text-[10px] font-black text-[#0d1b3e] mt-0.5 block">4.9 ★</span>
          </div>
        </div>

        {/* Bottom: Price + Actions */}
        <div className="flex items-center justify-between gap-2 pt-3">
          <div className="hidden sm:block">
            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block leading-none">Precio</span>
            <span className="text-xl font-black text-[#FF4D00] leading-none">{product.price}</span>
          </div>

          <div className="flex items-center gap-1.5 w-full sm:w-auto">
            <a href="https://wa.me/59161320004" target="_blank" rel="noopener noreferrer" className="flex-1 sm:flex-none px-3 py-2.5 bg-[#25D366] hover:bg-[#1ebd59] text-white rounded-xl text-[8px] font-black uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-sm hover:shadow-md hover:-translate-y-0.5">
              <i className="fab fa-whatsapp text-[10px]"></i>
              Delivery
            </a>
            <Link to="/catalogo" className="flex-1 sm:flex-none px-3 py-2.5 bg-[#FF4D00] hover:bg-[#CC3D00] text-white rounded-xl text-[8px] font-black uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-sm hover:shadow-md hover:-translate-y-0.5 shadow-orange-500/20">
              <i className="fas fa-shopping-cart text-[9px]"></i>
              Comprar
            </Link>
            <Link to="/menu/saltenas" className="flex-1 sm:flex-none px-3 py-2.5 bg-[#8B4513] hover:bg-[#5D3A1F] text-white rounded-xl text-[8px] font-black uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-sm hover:shadow-md hover:-translate-y-0.5">
              <i className="fas fa-utensils text-[9px]"></i>
              Menú
            </Link>
          </div>
        </div>

        {/* Ghost icon */}
        <div className="absolute -bottom-3 -right-3 text-[#FF4D00]/5 text-5xl transform -rotate-12 pointer-events-none hidden sm:block">
          <i className={`fas ${product.icon}`}></i>
        </div>
      </div>
    </div>
  );
};

const CarruselProductos = ({ products }) => {
  const [currentIndex, setCurrentIndex] = useState(products.length);
  const [visibleCards, setVisibleCards] = useState(3);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      // Fixed integer values based on screen size
      // 1700px breakpoint ensures all laptops and standard desktops show 2 cards
      if (w < 860) setVisibleCards(1);
      else if (w < 1700) setVisibleCards(2);
      else setVisibleCards(3);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const N = products.length;
  const tripledProducts = [...products, ...products, ...products];

  useEffect(() => {
    if (isPaused || N <= Math.floor(visibleCards)) return;
    const interval = setInterval(() => {
      setTransitionEnabled(true);
      setCurrentIndex(prev => prev + 1);
    }, 3500);
    return () => clearInterval(interval);
  }, [isPaused, N, visibleCards]);

  const handleTransitionEnd = () => {
    if (currentIndex >= N * 2) { setTransitionEnabled(false); setCurrentIndex(currentIndex - N); }
    else if (currentIndex < N) { setTransitionEnabled(false); setCurrentIndex(currentIndex + N); }
  };

  useEffect(() => {
    if (!transitionEnabled) { const t = setTimeout(() => setTransitionEnabled(true), 50); return () => clearTimeout(t); }
  }, [transitionEnabled]);

  const prev = () => { setTransitionEnabled(true); setCurrentIndex(p => p - 1); };
  const next = () => { setTransitionEnabled(true); setCurrentIndex(p => p + 1); };

  const cardPercent = 100 / tripledProducts.length;
  const trackWidthPercent = (tripledProducts.length * 100) / visibleCards;

  return (
    <div className="relative w-full py-4 px-2 sm:px-14"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="w-full relative overflow-hidden">
        <div className="overflow-hidden py-4 px-1">
          <div
            className={`flex ${transitionEnabled ? 'transition-transform duration-500 ease-in-out' : ''}`}
            onTransitionEnd={handleTransitionEnd}
            style={{ width: `${trackWidthPercent}%`, transform: `translateX(-${currentIndex * cardPercent}%)` }}
          >
            {tripledProducts.map((product, index) => (
              <div key={`${product.id}-${index}`} style={{ width: `${cardPercent}%` }} className="px-3 sm:px-4 flex-shrink-0">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>

        {N > Math.floor(visibleCards) && (
          <>
            <button onClick={prev} className="absolute left-0 sm:left-1 top-1/2 -translate-y-1/2 z-20 group/btn shadow-lg rounded-full" aria-label="Anterior">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white border border-orange-100 group-hover/btn:bg-[#FF4D00] group-hover/btn:border-[#FF4D00] flex items-center justify-center text-[#8B4513] group-hover/btn:text-white transition-all duration-300 shadow-sm">
                <i className="fa-solid fa-chevron-left pr-0.5 text-base sm:text-lg"></i>
              </div>
            </button>
            <button onClick={next} className="absolute right-0 sm:right-1 top-1/2 -translate-y-1/2 z-20 group/btn shadow-lg rounded-full" aria-label="Siguiente">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white border border-orange-100 group-hover/btn:bg-[#FF4D00] group-hover/btn:border-[#FF4D00] flex items-center justify-center text-[#8B4513] group-hover/btn:text-white transition-all duration-300 shadow-sm">
                <i className="fa-solid fa-chevron-right pl-0.5 text-base sm:text-lg"></i>
              </div>
            </button>
          </>
        )}
      </div>

      {N > Math.floor(visibleCards) && (
        <div className="flex justify-center items-center gap-1.5 mt-3">
          {Array.from({ length: N }).map((_, idx) => {
            const activeIdx = (currentIndex - N + N) % N;
            return (
              <button key={idx} onClick={() => { setTransitionEnabled(true); setCurrentIndex(N + idx); }}
                className={`h-1.5 rounded-full transition-all duration-300 ${activeIdx === idx ? 'w-5 bg-[#5D3A1F]' : 'w-1.5 bg-[#5D3A1F]/25 hover:bg-[#5D3A1F]/50'}`}
                aria-label={`Ir al slide ${idx + 1}`} />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CarruselProductos;
