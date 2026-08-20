import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import CircuitBackground from '../../../components/fondos/FondoParticulas';

const originalHighlights = [
    {
        id: 'cursos',
        title: 'Robótica',
        highlight: 'Creativa',
        desc: 'Aprende programando robots reales desde el primer día, desarrollando habilidades del siglo XXI y el pensamiento lógico.',
        icon: 'fa-graduation-cap',
        badge: 'Cursos Prácticos',
        color: "bg-[#A3E635]",
        textColor: "text-white",
        iconColor: "text-[#A3E635] bg-white",
        badgeColor: "bg-white/20 text-white border-white/10",
        features: [
            { icon: 'fa-box-open', text: 'Kits Incluidos' },
            { icon: 'fa-users', text: 'Mentorías en Vivo' },
            { icon: 'fa-robot', text: 'Proyectos Reales' },
            { icon: 'fa-certificate', text: 'Certificación Oficial' }
        ]
    },
    {
        id: 'libros',
        title: 'Libros',
        highlight: 'Escolares',
        desc: 'Comercializamos libros educativos para nivel primario y secundario que cubren todas las áreas curriculares.',
        icon: 'fa-book-open',
        badge: 'Material Didáctico',
        color: "bg-[#111827]",
        textColor: "text-white",
        iconColor: "text-[#111827] bg-[#84CC16]",
        badgeColor: "bg-white/10 text-[#84CC16] border-[#84CC16]/20",
        borderColor: "border-[#A3E635]/20",
        features: [
            { icon: 'fa-school', text: 'Primaria y Secundaria' },
            { icon: 'fa-layer-group', text: 'Todas las Materias' },
            { icon: 'fa-book', text: 'Guías Pedagógicas' },
            { icon: 'fa-check-double', text: 'Alineado a la Currícula' }
        ]
    },
    {
        id: 'software',
        title: 'Software',
        highlight: 'a Medida',
        desc: 'Diseñamos y desarrollamos aplicaciones móviles y plataformas web adaptadas a tus necesidades comerciales.',
        icon: 'fa-laptop-code',
        badge: 'Desarrollo Profesional',
        color: "bg-[#A3E635]",
        textColor: "text-white",
        iconColor: "text-[#A3E635] bg-white",
        badgeColor: "bg-white/20 text-white border-white/10",
        features: [
            { icon: 'fa-code', text: 'Código Limpio' },
            { icon: 'fa-screwdriver-wrench', text: 'Soporte Continuo' },
            { icon: 'fa-paint-brush', text: 'Diseño Premium' },
            { icon: 'fa-cloud', text: 'Escalable en la Nube' }
        ]
    },
    {
        id: 'calidad',
        title: 'Calidad',
        highlight: 'Garantizada',
        desc: 'Tanto en nuestra educación como en nuestro software, ofrecemos los más altos estándares de calidad y soporte.',
        icon: 'fa-shield-halved',
        badge: 'Soporte Técnico 24/7',
        color: "bg-white",
        textColor: "text-[#111827]",
        iconColor: "text-[#A3E635] bg-[#111827]",
        badgeColor: "bg-lime-50 text-[#A3E635] border-[#A3E635]/20",
        borderColor: "border-[#84CC16]/30",
        features: [
            { icon: 'fa-bolt', text: 'Atención Prioritaria' },
            { icon: 'fa-shield-halved', text: 'Garantía de Software' },
            { icon: 'fa-user-graduate', text: 'Asesoría Experta' },
            { icon: 'fa-chart-line', text: 'Seguimiento Continuo' }
        ]
    },
    {
        id: 'mentorias',
        title: 'Mentoría',
        highlight: 'Personalizada',
        desc: 'Te guiamos paso a paso en tu camino de aprendizaje de robótica y desarrollo de software con tutores expertos.',
        icon: 'fa-user-tie',
        badge: 'Guía Experta',
        color: "bg-[#111827]",
        textColor: "text-white",
        iconColor: "text-[#111827] bg-[#84CC16]",
        badgeColor: "bg-white/10 text-[#84CC16] border-[#84CC16]/20",
        borderColor: "border-[#A3E635]/20",
        features: [
            { icon: 'fa-user', text: 'Clases 1 a 1' },
            { icon: 'fa-compass', text: 'Orientación Vocacional' },
            { icon: 'fa-flask', text: 'Proyectos de Ciencias' },
            { icon: 'fa-infinity', text: 'Acceso de por vida' }
        ]
    }
];

const VentajasCarrusel = () => {
    
    // --- Lógica del carrusel infinito ---
    const CLONE_COUNT = originalHighlights.length;
    const ANIMATION_DURATION_MS = 700;
    const FAILSAFE_BUFFER_MS = 500;
    
    // Se clona el arreglo 3 veces para permitir salto invisible (infinite loop).
    const highlights = useMemo(() => [
        ...originalHighlights, 
        ...originalHighlights,                     
        ...originalHighlights 
    ], []);

    const [currentIndex, setCurrentIndex] = useState(CLONE_COUNT); 
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [isAutoplaying, setIsAutoplaying] = useState(true); // Default to true
    const [cardWidth, setCardWidth] = useState(800);
    const [isMobile, setIsMobile] = useState(false);
    
    const trackRef = useRef(null);

    // Responsive: ajusta ancho de tarjeta sin recalcular layout pesado en cada frame.
    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width < 480) {
                setCardWidth(width * 0.9);
                setIsMobile(true);
            } else if (width < 768) {
                setCardWidth(width * 0.95); // Mobile
                setIsMobile(true);
            } else if (width < 1280) {
                setCardWidth(width * 0.82); // Tablet/Laptop
                setIsMobile(false);
            } else {
                setCardWidth(920); // Desktop
                setIsMobile(false);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const GAP = 8;

    // Normaliza índices para mantener el indicador/paginación en rango [0..N-1].
    const normalizeIndex = useCallback((index) => {
        const total = originalHighlights.length;
        return ((index % total) + total) % total;
    }, []);

    const activeDotIndex = normalizeIndex(currentIndex - CLONE_COUNT);

    const goTo = useCallback((index) => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setCurrentIndex(index);
    }, [isTransitioning]);

    const next = useCallback(() => {
        if (isTransitioning) return;
        goTo(currentIndex + 1);
    }, [currentIndex, goTo, isTransitioning]);

    const prev = useCallback(() => {
        if (isTransitioning) return;
        goTo(currentIndex - 1);
    }, [currentIndex, goTo, isTransitioning]);

    // Teletransporta sin animación al bloque central para conservar continuidad visual.
    const handleTransitionEnd = (e) => {
        if (e.target !== trackRef.current || e.propertyName !== 'transform') return;

        setIsTransitioning(false);

        if (currentIndex >= highlights.length - CLONE_COUNT) {
            setCurrentIndex(CLONE_COUNT + (currentIndex - (highlights.length - CLONE_COUNT)));
        } else if (currentIndex < CLONE_COUNT) {
            setCurrentIndex(currentIndex + originalHighlights.length);
        }
    };

    // Failsafe: evita bloqueo si el evento transitionend no dispara en ciertos navegadores.
    useEffect(() => {
        if (!isTransitioning) return;
        const timeout = setTimeout(() => {
             setIsTransitioning(false);
             // Failsafe Teleport: If we are out of bounds and event didn't fire, force jump now.
             if (currentIndex >= highlights.length - CLONE_COUNT) {
                 setCurrentIndex(CLONE_COUNT + (currentIndex - (highlights.length - CLONE_COUNT)));
             } 
             else if (currentIndex < CLONE_COUNT) {
                 setCurrentIndex(originalHighlights.length + currentIndex - CLONE_COUNT);
             }
        }, ANIMATION_DURATION_MS + FAILSAFE_BUFFER_MS);
        return () => clearTimeout(timeout);
    }, [
        ANIMATION_DURATION_MS,
        FAILSAFE_BUFFER_MS,
        isTransitioning,
        currentIndex,
        highlights.length,
        originalHighlights.length,
    ]);

    // CSS-Driven Autoplay Control
    const startAutoplay = useCallback(() => {
        setIsAutoplaying(true);
    }, []);

    const stopAutoplay = useCallback(() => {
        setIsAutoplaying(false);
    }, []);


    return (
        <section id="promociones" className="py-8 relative overflow-hidden">
            {/* --- Background Decor --- */}
            <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
                 <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-lime-100/20 rounded-full blur-[100px] animate-pulse-slow"></div>
                 <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[#84CC16]/10 rounded-full blur-[100px] animate-pulse-slow delay-1000"></div>
            </div>

            {/* --- 15 Floating Circles --- */}
            <CircuitBackground />

            <style>{`
                .perspective-card { perspective: 1200px; }
                .rotate-card { transition: all 0.7s cubic-bezier(0.25, 1, 0.5, 1); }
            `}</style>
            
            <div className="relative z-10 w-full pt-10 sm:pt-14">
                
                {/* --- Header --- */}
                <div className="container mx-auto px-4 sm:px-6 text-center max-w-5xl mb-4">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#111827] dark:text-white leading-tight mb-5 sm:mb-6 tracking-tighter">
                        Ventajas de trabajar con <br />
                        <span className="relative inline-block px-2">
                            <span className="relative z-10 text-[#A3E635] dark:text-lime-400">Tech Home</span>
                            <svg className="absolute w-full h-4 -bottom-2 left-0 z-0 text-[#84CC16]" viewBox="0 0 200 9" fill="none">
                                <path d="M2.00025 6.99997C25.7509 4.50435 65.2536 2.07897 197.994 4.4151" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </span>
                    </h2>
                    <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 font-semibold leading-relaxed max-w-3xl mx-auto">
                        Desarrolla tus habilidades tecnológicas y transforma tus ideas en resultados con una experiencia educativa, comercial y de software más clara, moderna y efectiva.
                    </p>


                </div>

                {/* --- Carousel Track (FULL IMMERSIVE) --- */}
                <div className="w-full relative overflow-visible h-auto py-3 sm:py-6 perspective-[2000px]">
                    
                    {/* Navigation Arrows (Fixed Position relative to screen) */}
                    <div className="hidden lg:block">
                        <button
                            type="button"
                            aria-label="Anterior"
                            onClick={prev}
                            className="absolute left-[5%] top-1/2 -translate-y-1/2 w-14 h-14 rounded-2xl bg-white/90 dark:bg-[#0a0a0a]/90 backdrop-blur-md text-[#111827] dark:text-slate-200 shadow-xl shadow-lime-950/15 flex items-center justify-center transition-all z-30 hover:scale-110 hover:bg-[#A3E635] dark:hover:bg-[#A3E635] hover:text-white border border-[#84CC16]/20 dark:border-[#A3E635]/25"
                        >
                            <i className="fa-solid fa-arrow-left text-xl"></i>
                        </button>
                        <button
                            type="button"
                            aria-label="Siguiente"
                            onClick={next}
                            className="absolute right-[5%] top-1/2 -translate-y-1/2 w-14 h-14 rounded-2xl bg-white/90 dark:bg-[#0a0a0a]/90 backdrop-blur-md text-[#111827] dark:text-slate-200 shadow-xl shadow-lime-950/15 flex items-center justify-center transition-all z-30 hover:scale-110 hover:bg-[#A3E635] dark:hover:bg-[#A3E635] hover:text-white border border-[#84CC16]/20 dark:border-[#A3E635]/25"
                        >
                            <i className="fa-solid fa-arrow-right text-xl"></i>
                        </button>
                    </div>

                    <div 
                        ref={trackRef}
                        className="flex items-center will-change-transform"
                        style={{
                            transform: `translateX(calc(-${currentIndex * (cardWidth + GAP)}px + 50vw - ${cardWidth / 2}px))`,
                            transition: isTransitioning ? 'transform 0.7s cubic-bezier(0.25, 1, 0.5, 1)' : 'none',
                            width: 'max-content'
                        }}
                        onTransitionEnd={handleTransitionEnd}
                        onMouseEnter={stopAutoplay}
                        onMouseLeave={startAutoplay}
                        onTouchStart={stopAutoplay}
                    >
                        {highlights.map((item, index) => {
                            // Se compara por referencia para evitar falsos activos en segmentos clonados.
                             const isActive = item === highlights[currentIndex];
                            
                            // Profundidad visual: la tarjeta activa mantiene foco y laterales se atenúan.
                            let scale = 0.8;
                            let opacity = 0.5;
                            let blur = '4px';
                            let zIndex = 10;

                            if (isActive) {
                                scale = 1;
                                opacity = 1;
                                blur = '0px';
                                zIndex = 30;
                            } else {
                                scale = 0.85;
                                opacity = 0.5; // Dimmed
                                blur = '3px'; // Blur effect
                                zIndex = 20;
                            }
                            if (isMobile) {
                                scale = isActive ? 1 : 0.98;
                                opacity = isActive ? 1 : 0;
                                blur = '0px';
                                zIndex = isActive ? 30 : 0;
                            }

                            return (
                                <div key={`${item.id}-${index}`} 
                                      className="shrink-0 transition-all duration-700 px-2 sm:px-3 md:px-4"
                                     style={{ 
                                         width: `${cardWidth}px`,
                                         transform: `scale(${scale})`,
                                         opacity: opacity,
                                         filter: `blur(${blur})`,
                                         zIndex: zIndex
                                     }}
                                >
                                    <div className={`rotate-card h-auto min-h-[300px] sm:min-h-[330px] md:min-h-[355px] rounded-[2rem] sm:rounded-[2.6rem] p-4 sm:p-6 md:p-7 ${item.color} dark:bg-[#0a0a0a] ${item.textColor} dark:text-white shadow-2xl shadow-lime-950/15 relative overflow-hidden flex flex-col md:flex-row items-center gap-4 sm:gap-6 group border-2 ${item.borderColor || 'border-[#A3E635]/75 dark:border-[#A3E635]/20 ring-1 ring-black/5 dark:ring-white/5'} ${item.color === 'bg-white' ? 'ring-2 ring-[#84CC16]/20 dark:ring-[#A3E635]/25 shadow-[inset_0_0_0_1px_rgba(17,24,39,0.08)] dark:shadow-none' : ''} hover:shadow-[#84CC16]/10`}>
                                            
                                            {/* Rich Pattern & Gloss */}
                                            <div
                                                className="absolute inset-0"
                                                style={{
                                                    opacity: item.color === 'bg-white' ? 0.16 : 0.12,
                                                    backgroundImage: item.color === 'bg-white'
                                                        ? 'radial-gradient(#84CC16 1.8px, transparent 1.8px)'
                                                        : 'radial-gradient(currentColor 2px, transparent 2px)',
                                                    backgroundSize: item.color === 'bg-white' ? '26px 26px' : '30px 30px'
                                                }}
                                            ></div>
                                            {(item.id === 'software' || item.id === 'cursos' || item.id === 'libros') && (
                                                <div className="absolute inset-0 bg-black/10 pointer-events-none"></div>
                                            )}
                                            <div className="absolute -inset-full bg-gradient-to-r from-transparent via-white/10 to-transparent rotate-45 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 pointer-events-none"></div>

                                            {/* Content */}
                                            <div className="relative z-10 flex-1 flex flex-col items-center text-center h-full justify-center">
                                                <div className={`inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-widest border mb-4 sm:mb-6 backdrop-blur-md shadow-lg ${item.badgeColor} transform transition-transform group-hover:scale-105`}>
                                                    <i className="fa-solid fa-star animate-spin-slow"></i> {item.badge}
                                                </div>
                                                
                                                <h3 className="text-3xl sm:text-4xl md:text-[3.3rem] font-black mb-2 sm:mb-4 leading-[1.05] drop-shadow-sm">
                                                    {item.title} <br />
                                                    <span className={`relative inline-block ${item.textColor === 'text-white' ? 'text-white' : 'text-[#111827] dark:text-lime-400'}`}>{item.highlight}</span>
                                                </h3>
                                                
                                                <p className={`text-sm sm:text-base md:text-lg font-semibold leading-relaxed mb-3 sm:mb-5 max-w-md ${item.textColor === 'text-white' ? 'text-white/92' : 'text-slate-600 dark:text-slate-350'}`}>
                                                    {item.desc}
                                                </p>

                                                <div className="grid grid-cols-2 gap-2 w-full max-w-[560px] mx-auto">
                                                    {item.features && item.features.map((feature, fIdx) => (
                                                        <span key={fIdx} className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-[11px] font-bold border text-center ${item.textColor === 'text-white' ? 'bg-white/18 text-white border-white/45' : 'bg-[#111827]/5 dark:bg-black/30 text-[#111827] dark:text-slate-300 border-[#111827]/20 dark:border-[#A3E635]/20'}`}>
                                                            <i className={`fa-solid ${feature.icon} text-[10px] opacity-80`}></i>
                                                            {feature.text}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Huge Icon Graphic */}
                                                <div className="relative z-10 w-full md:w-5/12 flex items-center justify-center">
                                                    <div className={`w-20 h-20 sm:w-28 sm:h-28 md:w-44 md:h-44 rounded-[2rem] sm:rounded-[2.5rem] md:rounded-[3rem] flex items-center justify-center shadow-2xl ${item.iconColor} dark:!bg-[#111827] transition-all group-hover:scale-110 group-hover:rotate-6 duration-700 relative ring-4 sm:ring-6 md:ring-8 ring-white/20 backdrop-blur-sm border border-white/40`}>
                                                    <div className="absolute -top-3 -right-3 sm:-top-5 sm:-right-5 md:-top-8 md:-right-8 w-8 h-8 sm:w-11 sm:h-11 md:w-16 md:h-16 bg-[#111827] dark:bg-[#A3E635] rounded-lg sm:rounded-2xl md:rounded-3xl flex items-center justify-center text-white text-sm sm:text-lg md:text-2xl font-bold shadow-xl animate-bounce-slow rotate-12 z-20 border-4 border-white dark:border-[#0a0a0a]">
                                                        <i className="fa-solid fa-check"></i>
                                                    </div>
                                                    <i className={`fa-solid ${item.icon} text-3xl sm:text-4xl md:text-7xl relative z-10 drop-shadow-lg`}></i>
                                                </div>
                                            </div>

                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    
                    {/* Custom Navigation (Bottom) */}
                    <div className="flex justify-between items-center max-w-xs mx-auto mt-4 sm:mt-8 bg-white/90 dark:bg-[#0a0a0a]/90 backdrop-blur-md p-2 rounded-full shadow-xl border border-[#84CC16]/20 dark:border-[#A3E635]/25">
                        <button
                            onClick={prev}
                            aria-label="Anterior"
                            className="w-9 h-9 sm:w-12 sm:h-12 rounded-full flex items-center justify-center hover:bg-[#A3E635] hover:text-white transition-colors text-[#111827] dark:text-slate-200"
                        >
                            <i className="fa-solid fa-angle-left"></i>
                        </button>
                        
                        <div className="flex gap-2">
                             {originalHighlights.map((_, index) => {
                            return (
                                <button
                                    key={index}
                                    type="button"
                                    aria-label={`Ir a ${originalHighlights[index].title} ${originalHighlights[index].highlight}`}
                                    aria-current={index === activeDotIndex ? 'true' : undefined}
                                    onClick={() => goTo(index + CLONE_COUNT)}
                                    className="relative flex items-center justify-center w-6 h-6 rounded-full overflow-visible"
                                >
                                    <span
                                        className={`relative rounded-full transition-all duration-500 ${
                                            index === activeDotIndex
                                                ? 'w-16 h-2 bg-[#A3E635]'
                                                : 'w-2.5 h-2.5 bg-gray-400 hover:bg-gray-500 dark:bg-slate-700'
                                        }`}
                                    >
                                        {index === activeDotIndex && isAutoplaying && !isTransitioning && (
                                            <span
                                                className="absolute top-0 left-0 h-full bg-[#111827] dark:bg-lime-400 rounded-full"
                                                style={{ 
                                                    width: '100%',
                                                    animation: 'progress 3s linear forwards'
                                                }}
                                                onAnimationEnd={() => {
                                                    next();
                                                }}
                                            ></span>
                                        )}
                                    </span>
                                </button>
                            );
                        })}
                        </div>

                        <button
                            onClick={next}
                            aria-label="Siguiente"
                            className="w-9 h-9 sm:w-12 sm:h-12 rounded-full flex items-center justify-center hover:bg-[#A3E635] hover:text-white transition-colors text-[#111827] dark:text-slate-200"
                        >
                            <i className="fa-solid fa-angle-right"></i>
                        </button>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default VentajasCarrusel;
