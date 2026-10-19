import React, { useEffect, useRef, useState } from 'react';
import TechToolCard, { BRAND_LOGOS } from './TechToolCard';

const TechToolsCarousel = ({
  items = [],
  label = 'Herramientas del proyecto',
  description = 'Recursos que pueden evaluarse según los objetivos y el alcance acordado.',
  onDetails,
}) => {
  const [selectedTool, setSelectedTool] = useState(null);
  const trackRef = useRef(null);
  const animationFrameRef = useRef(null);
  const offsetRef = useRef(0);
  const halfWidthRef = useRef(0);
  const lastFrameRef = useRef(0);
  const isPausedRef = useRef(false);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartOffsetRef = useRef(0);

  const applyOffset = (offset) => {
    offsetRef.current = offset;
    if (trackRef.current) trackRef.current.style.transform = `translate3d(${offset}px, 0, 0)`;
  };

  const normalizeOffset = (offset) => {
    const halfWidth = halfWidthRef.current;
    if (!halfWidth) return offset;
    let normalized = offset % halfWidth;
    if (normalized > 0) normalized -= halfWidth;
    return normalized;
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;
    const motionPreference = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    if (motionPreference) isPausedRef.current = motionPreference.matches;
    const updateMotionPreference = () => {
      if (motionPreference) isPausedRef.current = motionPreference.matches;
    };
    motionPreference?.addEventListener?.('change', updateMotionPreference);

    const measure = () => {
      halfWidthRef.current = track.scrollWidth / 2;
      applyOffset(normalizeOffset(offsetRef.current));
    };
    measure();
    const resizeObserver = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(measure);
    resizeObserver?.observe(track);
    if (!resizeObserver) window.addEventListener('resize', measure);

    const animate = (timestamp) => {
      const elapsed = lastFrameRef.current ? timestamp - lastFrameRef.current : 0;
      lastFrameRef.current = timestamp;
      const halfWidth = halfWidthRef.current;

      if (isDraggingRef.current) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }
      if (!isPausedRef.current && halfWidth) {
        applyOffset(normalizeOffset(offsetRef.current - (elapsed * halfWidth) / 65000));
      }
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    if (typeof requestAnimationFrame === 'function') animationFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (typeof cancelAnimationFrame === 'function') cancelAnimationFrame(animationFrameRef.current);
      resizeObserver?.disconnect();
      if (!resizeObserver) window.removeEventListener('resize', measure);
      motionPreference?.removeEventListener?.('change', updateMotionPreference);
    };
  }, []);

  useEffect(() => {
    if (!selectedTool) return undefined;
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setSelectedTool(null);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [selectedTool]);

  const handlePointerDown = (event) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    isDraggingRef.current = true;
    dragStartXRef.current = event.clientX;
    dragStartOffsetRef.current = offsetRef.current;
    event.currentTarget.setPointerCapture?.(event.pointerId);
  };

  const handlePointerMove = (event) => {
    if (isDraggingRef.current) applyOffset(normalizeOffset(dragStartOffsetRef.current + event.clientX - dragStartXRef.current));
  };

  const handlePointerUp = (event) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    event.currentTarget.releasePointerCapture?.(event.pointerId);
  };

  const handleKeyDown = (event) => {
    if (!['ArrowLeft', 'ArrowRight'].includes(event.key) || event.target.closest('button')) return;
    const card = trackRef.current?.querySelector('article');
    if (!card) return;
    event.preventDefault();
    const gap = parseFloat(getComputedStyle(card.parentElement).columnGap || '0');
    const direction = event.key === 'ArrowRight' ? -1 : 1;
    applyOffset(normalizeOffset(offsetRef.current + direction * (card.getBoundingClientRect().width + gap)));
    isPausedRef.current = false;
  };

  const showDetails = (item) => {
    if (onDetails) onDetails(item);
    else setSelectedTool(item);
  };

  if (!items.length) return null;

  return (
    <div className="tech-tools-carousel relative flex w-full flex-col" role="region" aria-label={label}>
      <header className="relative z-10 mx-auto mb-9 max-w-3xl px-6 text-center sm:mb-12">
        <h2 className="text-2xl font-black uppercase tracking-tight text-white sm:text-3xl">{label}</h2>
        <p className="mt-3 text-sm font-medium leading-relaxed text-slate-400 sm:text-base">{description}</p>
      </header>
      <div
        ref={trackRef}
        className="tech-tools-carousel__track flex w-max cursor-grab gap-5 px-4 [touch-action:pan-y] [user-select:none] active:cursor-grabbing sm:gap-6"
        role="group"
        aria-label={`Carrusel: ${label}`}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onPointerEnter={() => { isPausedRef.current = true; }}
        onPointerLeave={() => { if (!isDraggingRef.current) isPausedRef.current = false; }}
      >
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 gap-5 sm:gap-6" aria-hidden={copy === 1 ? 'true' : undefined} inert={copy === 1}>
            {items.map((item, index) => (
              <TechToolCard key={`${item.id || item.name}-${copy}-${index}`} item={item} index={index} onDetails={showDetails} />
            ))}
          </div>
        ))}
      </div>
      {selectedTool && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm" onClick={() => setSelectedTool(null)}>
          <div role="dialog" aria-modal="true" aria-labelledby="tool-details-title" className="relative w-full max-w-md rounded-3xl border border-[#A3E635]/35 bg-[#0B0D09] p-7 text-center shadow-[0_24px_80px_rgba(0,0,0,.55)]" onClick={(event) => event.stopPropagation()}>
            <button type="button" aria-label="Cerrar detalles" onClick={() => setSelectedTool(null)} className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-[#A3E635] hover:text-black">
              <i className="fa-solid fa-xmark" aria-hidden="true" />
            </button>
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white p-3">
              {(selectedTool.logo || BRAND_LOGOS[selectedTool.name]) && <img src={selectedTool.logo || BRAND_LOGOS[selectedTool.name]} alt="" className="max-h-full max-w-full object-contain" onError={(event) => { event.currentTarget.hidden = true; event.currentTarget.nextElementSibling.hidden = false; }} />}
              <span hidden={Boolean(selectedTool.logo || BRAND_LOGOS[selectedTool.name])} className="font-black text-slate-700">{selectedTool.name.slice(0, 3)}</span>
            </div>
            <p className="mb-2 text-[10px] font-black uppercase tracking-[.18em] text-[#A3E635]">{selectedTool.tag || 'Recurso tecnológico'}</p>
            <h3 id="tool-details-title" className="text-2xl font-black text-white">{selectedTool.name}</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">{selectedTool.desc || selectedTool.cardDescription || 'Su uso se define según los requisitos, el alcance y la viabilidad del proyecto.'}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TechToolsCarousel;
