import React, { useEffect, useRef } from 'react';
import TechToolCard from './TechToolCard';

const TechToolsCarousel = ({
  items = [],
  label = 'Herramientas del proyecto',
  description = 'Recursos que pueden evaluarse según los objetivos y el alcance acordado.',
  onDetails,
}) => {
  const trackRef = useRef(null);
  const animationFrameRef = useRef(null);
  const offsetRef = useRef(0);
  const targetOffsetRef = useRef(null);
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

    const measure = () => {
      halfWidthRef.current = track.scrollWidth / 2;
      applyOffset(normalizeOffset(offsetRef.current));
    };
    measure();
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(track);

    const animate = (timestamp) => {
      const elapsed = lastFrameRef.current ? timestamp - lastFrameRef.current : 0;
      lastFrameRef.current = timestamp;
      const halfWidth = halfWidthRef.current;

      if (isDraggingRef.current) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }
      if (targetOffsetRef.current !== null) {
        const distance = targetOffsetRef.current - offsetRef.current;
        const nextOffset = Math.abs(distance) < 0.5
          ? targetOffsetRef.current
          : offsetRef.current + distance * Math.min(elapsed / 260, 1);
        if (Math.abs(distance) < 0.5) {
          applyOffset(normalizeOffset(targetOffsetRef.current));
          targetOffsetRef.current = null;
        } else {
          applyOffset(nextOffset);
        }
      } else if (!isPausedRef.current && halfWidth) {
        applyOffset(normalizeOffset(offsetRef.current - (elapsed * halfWidth) / 40000));
      }
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(animationFrameRef.current);
      resizeObserver.disconnect();
    };
  }, []);

  const moveByCard = (direction) => {
    const card = trackRef.current?.querySelector('article');
    if (!card) return;
    const gap = parseFloat(getComputedStyle(card.parentElement).columnGap || '0');
    targetOffsetRef.current = offsetRef.current - direction * (card.getBoundingClientRect().width + gap);
    isPausedRef.current = false;
  };

  const handlePointerDown = (event) => {
    if ((event.pointerType === 'mouse' && event.button !== 0) || event.target.closest('button')) return;
    isDraggingRef.current = true;
    dragStartXRef.current = event.clientX;
    dragStartOffsetRef.current = offsetRef.current;
    targetOffsetRef.current = null;
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

  if (!items.length) return null;

  return (
    <div className="tech-tools-carousel relative flex w-full flex-col" role="region" aria-label={label}>
      <header className="relative z-10 mx-auto mb-6 max-w-3xl px-6 text-center">
        <h2 className="text-2xl font-black uppercase tracking-tight text-white sm:text-3xl">{label}</h2>
        <p className="mt-3 text-sm font-medium leading-relaxed text-slate-400 sm:text-base">{description}</p>
      </header>
      <button
        type="button"
        aria-label="Mostrar elemento anterior"
        onClick={() => moveByCard(-1)}
        className="absolute left-3 top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-[#84CC16] shadow-xl transition-all hover:scale-105 hover:bg-white active:scale-95 sm:left-6 sm:h-11 sm:w-11"
      >
        <i className="fa-solid fa-chevron-left text-sm" aria-hidden="true" />
      </button>
      <button
        type="button"
        aria-label="Mostrar siguiente elemento"
        onClick={() => moveByCard(1)}
        className="absolute right-3 top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-[#84CC16] shadow-xl transition-all hover:scale-105 hover:bg-white active:scale-95 sm:right-6 sm:h-11 sm:w-11"
      >
        <i className="fa-solid fa-chevron-right text-sm" aria-hidden="true" />
      </button>

      <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-16 bg-gradient-to-r from-[#080908] to-transparent sm:w-28" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-16 bg-gradient-to-l from-[#080908] to-transparent sm:w-28" />
      <div
        ref={trackRef}
        className="tech-tools-carousel__track flex w-max cursor-grab gap-5 px-4 [touch-action:pan-y] [user-select:none] active:cursor-grabbing sm:gap-6"
        role="group"
        aria-label={`Carrusel: ${label}`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onPointerEnter={() => { isPausedRef.current = true; }}
        onPointerLeave={() => { if (!isDraggingRef.current) isPausedRef.current = false; }}
      >
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 gap-5 sm:gap-6" aria-hidden={copy === 1 ? 'true' : undefined}>
            {items.map((item, index) => (
              <TechToolCard key={`${item.id || item.name}-${copy}-${index}`} item={item} index={index} onDetails={onDetails} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechToolsCarousel;
