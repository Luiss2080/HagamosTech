import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import CircuitBackground from '../../../components/fondos/FondoSaltenas';
import Breadcrumb from '../../../components/func/MigasPan';

const originalHighlights = [
    {
        id: 'sabor',
        title: 'Sabor',
        highlight: 'Tradicional',
        desc: 'Desde 1989 horneamos salteñas con la receta original que conquistó Santa Cruz. Cada bocado conserva el sabor auténtico que nos hizo famosos.',
        icon: 'fa-fire-burner',
        badge: 'Receta desde 1989',
        color: "bg-[#FF4D00]",
        textColor: "text-white",
        iconColor: "text-[#FF4D00] bg-white",
        badgeColor: "bg-white/20 text-white border-white/10",
        features: [
            { icon: 'fa-scroll', text: 'Receta Original' },
            { icon: 'fa-drumstick-bite', text: 'Masa Crocante' },
            { icon: 'fa-drumstick-bite', text: 'Relleno Jugoso' },
            { icon: 'fa-medal', text: '35+ Años' }
        ]
    },
    {
        id: 'frescos',
        title: 'Ingredientes',
        highlight: 'Frescos',
        desc: 'Seleccionamos cada insumo diariamente. Nada se recicla ni se recalienta: todo se prepara en el día para garantizar un sabor inigualable.',
        icon: 'fa-leaf',
        badge: '100% Fresco',
        color: "bg-[#5D3A1F]",
        textColor: "text-white",
        iconColor: "text-[#5D3A1F] bg-[#FF4D00]",
        badgeColor: "bg-white/10 text-[#FF4D00] border-[#FF4D00]/20",
        borderColor: "border-[#FF4D00]/20",
        features: [
            { icon: 'fa-seedling', text: 'Insumos del Día' },
            { icon: 'fa-clock', text: 'Horneado 4am' },
            { icon: 'fa-xmark', text: 'Sin Recalentar' },
            { icon: 'fa-check-double', text: 'Calidad Diaria' }
        ]
    },
    {
        id: 'delivery',
        title: 'Delivery',
        highlight: 'Rápido',
        desc: 'Llevamos tus salteñas calentitas hasta tu puerta en menos de 30 minutos. Cobertura en toda la zona urbana de Santa Cruz.',
        icon: 'fa-motorcycle',
        badge: 'Entrega Express',
        color: "bg-[#FF4D00]",
        textColor: "text-white",
        iconColor: "text-[#FF4D00] bg-white",
        badgeColor: "bg-white/20 text-white border-white/10",
        features: [
            { icon: 'fa-bolt', text: 'Menos de 30 min' },
            { icon: 'fa-map-location-dot', text: 'Toda la ciudad' },
            { icon: 'fa-fire', text: 'Siempre caliente' },
            { icon: 'fa-clock', text: 'Seguimiento en vivo' }
        ]
    },
    {
        id: 'calidad',
        title: 'Calidad',
        highlight: 'Garantizada',
        desc: 'Miles de clientes avalan nuestro producto y servicio. Salteñas hechas con dedicación, cariño y los más altos estándares de higiene.',
        icon: 'fa-shield-halved',
        badge: 'Confianza Total',
        color: "bg-white",
        textColor: "text-[#111827]",
        iconColor: "text-[#FF4D00] bg-[#5D3A1F]",
        badgeColor: "bg-orange-50 text-[#FF4D00] border-[#FF4D00]/20",
        borderColor: "border-[#FF4D00]/30",
        features: [
            { icon: 'fa-star', text: '4.9 ★ Valorado' },
            { icon: 'fa-shield-halved', text: 'Higiene Certificada' },
            { icon: 'fa-users', text: 'Miles de Clientes' },
            { icon: 'fa-chart-line', text: 'Confianza Total' }
        ]
    },
    {
        id: 'atencion',
        title: 'Atención',
        highlight: 'Personalizada',
        desc: 'Te recibimos con una sonrisa en cada sucursal. Sos parte de la familia Los Castores y así te hacemos sentir en cada visita.',
        icon: 'fa-user-tie',
        badge: 'Trato Familiar',
        color: "bg-[#8B4513]",
        textColor: "text-white",
        iconColor: "text-[#8B4513] bg-[#FF4D00]",
        badgeColor: "bg-white/10 text-[#FF4D00] border-[#FF4D00]/20",
        borderColor: "border-[#FF4D00]/20",
        features: [
            { icon: 'fa-user', text: 'Trato Cercano' },
            { icon: 'fa-compass', text: 'Te Guiamos' },
            { icon: 'fa-heart', text: 'Como en Casa' },
            { icon: 'fa-infinity', text: 'Clientes de por vida' }
        ]
    }
];

const VentajasCarrusel = () => {
    const CLONE_COUNT = originalHighlights.length;
    const ANIMATION_DURATION_MS = 700;
    const FAILSAFE_BUFFER_MS = 500;

    const highlights = useMemo(() => [
        ...originalHighlights,
        ...originalHighlights,
        ...originalHighlights
    ], []);

    const [currentIndex, setCurrentIndex] = useState(CLONE_COUNT);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [isAutoplaying, setIsAutoplaying] = useState(true);
    const [cardWidth, setCardWidth] = useState(800);
    const [isMobile, setIsMobile] = useState(false);

    const trackRef = useRef(null);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width < 480) {
                setCardWidth(width * 0.9);
                setIsMobile(true);
            } else if (width < 768) {
                setCardWidth(width * 0.95);
                setIsMobile(true);
            } else if (width < 1280) {
                setCardWidth(width * 0.82);
                setIsMobile(false);
            } else {
                setCardWidth(920);
                setIsMobile(false);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const GAP = 8;

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

    const handleTransitionEnd = (e) => {
        if (e.target !== trackRef.current || e.propertyName !== 'transform') return;

        setIsTransitioning(false);

        if (currentIndex >= highlights.length - CLONE_COUNT) {
            setCurrentIndex(CLONE_COUNT + (currentIndex - (highlights.length - CLONE_COUNT)));
        } else if (currentIndex < CLONE_COUNT) {
            setCurrentIndex(currentIndex + originalHighlights.length);
        }
    };

    useEffect(() => {
        if (!isTransitioning) return;
        const timeout = setTimeout(() => {
            setIsTransitioning(false);
            if (currentIndex >= highlights.length - CLONE_COUNT) {
                setCurrentIndex(CLONE_COUNT + (currentIndex - (highlights.length - CLONE_COUNT)));
            } else if (currentIndex < CLONE_COUNT) {
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
        CLONE_COUNT,
    ]);

    const startAutoplay = useCallback(() => setIsAutoplaying(true), []);
    const stopAutoplay = useCallback(() => setIsAutoplaying(false), []);

    return (
        <section id="promociones" className="py-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-orange-200/20 rounded-full blur-[100px] animate-pulse-slow"></div>
                <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[#5D3A1F]/10 rounded-full blur-[100px] animate-pulse-slow delay-1000"></div>
            </div>

            <CircuitBackground />

            <style>{`
                .perspective-card { perspective: 1200px; }
                .rotate-card { transition: all 0.7s cubic-bezier(0.25, 1, 0.5, 1); }
                @keyframes progress { from { width: 0; } to { width: 100%; } }
            `}</style>

            <div className="relative z-10 w-full pt-10 sm:pt-14">

                {/* --- Header --- */}
                <div className="container mx-auto px-4 sm:px-6 text-center max-w-5xl mb-4">
                    <Breadcrumb
                        paths={[{ label: 'Promociones' }]}
                        badgeText="Ventajas Oficiales — LOS CASTORES"
                        icon="fa-tags"
                        align="center"
                    />
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#8B4513] leading-tight mb-5 sm:mb-6 tracking-tighter">
                        Por qué elegir <br />
                        <span className="relative inline-block px-2">
                            <span className="relative z-10 text-[#FF4D00]">Los Castores</span>
                            <svg className="absolute w-full h-3 -bottom-1 left-0 z-0 text-amber-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.55)]" viewBox="0 0 200 12" preserveAspectRatio="none" fill="none"><path d="M8,8 C22,5 38,7.5 55,7.5 C130,7.5 165,7.5 188,7.5 C194,7.5 198,6 196,7.5" stroke="currentColor" strokeWidth="7" strokeLinecap="round" /></svg>
                        </span>
                    </h2>
                    <p className="text-[#1F2937] font-medium max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
                        Descubrí todo lo que hace especial a Los Castores: sabor tradicional, ingredientes frescos, delivery rápido y una atención que te hace sentir parte de la familia.
                    </p>
                </div>

                {/* --- Carousel Track --- */}
                <div className="w-full relative overflow-visible h-auto py-3 sm:py-6 perspective-[2000px]">

                    {/* Navigation Arrows (Desktop) */}
                    <div className="hidden lg:block">
                        <button
                            type="button"
                            aria-label="Anterior"
                            onClick={prev}
                            className="absolute left-[5%] top-1/2 -translate-y-1/2 w-14 h-14 rounded-2xl bg-white/90 backdrop-blur-md text-[#8B4513] shadow-xl shadow-orange-950/15 flex items-center justify-center transition-all z-30 hover:scale-110 hover:bg-[#FF4D00] hover:text-white border border-[#FF4D00]/20"
                        >
                            <i className="fa-solid fa-arrow-left text-xl"></i>
                        </button>
                        <button
                            type="button"
                            aria-label="Siguiente"
                            onClick={next}
                            className="absolute right-[5%] top-1/2 -translate-y-1/2 w-14 h-14 rounded-2xl bg-white/90 backdrop-blur-md text-[#8B4513] shadow-xl shadow-orange-950/15 flex items-center justify-center transition-all z-30 hover:scale-110 hover:bg-[#FF4D00] hover:text-white border border-[#FF4D00]/20"
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
                            const isActive = item === highlights[currentIndex];

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
                                opacity = 0.5;
                                blur = '3px';
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
                                    <div className={`rotate-card h-auto min-h-[300px] sm:min-h-[330px] md:min-h-[355px] rounded-[2rem] sm:rounded-[2.6rem] p-4 sm:p-6 md:p-7 ${item.color} ${item.textColor} shadow-2xl shadow-orange-950/15 relative overflow-hidden flex flex-col md:flex-row items-center gap-4 sm:gap-6 group border-2 ${item.borderColor || 'border-[#ffe08a]/75 ring-1 ring-black/5'} ${item.color === 'bg-white' ? 'ring-2 ring-[#FF4D00]/20 shadow-[inset_0_0_0_1px_rgba(17,24,39,0.08)]' : ''} hover:shadow-[#FF4D00]/15`}>

                                        {/* Rich Pattern & Gloss */}
                                        <div
                                            className="absolute inset-0"
                                            style={{
                                                opacity: item.color === 'bg-white' ? 0.16 : 0.12,
                                                backgroundImage: item.color === 'bg-white'
                                                    ? 'radial-gradient(#FF4D00 1.8px, transparent 1.8px)'
                                                    : 'radial-gradient(currentColor 2px, transparent 2px)',
                                                backgroundSize: item.color === 'bg-white' ? '26px 26px' : '30px 30px'
                                            }}
                                        ></div>
                                        {(item.id === 'delivery' || item.id === 'frescos' || item.id === 'atencion') && (
                                            <div className="absolute inset-0 bg-black/10 pointer-events-none"></div>
                                        )}
                                        <div className="absolute -inset-full bg-gradient-to-r from-transparent via-white/10 to-transparent rotate-45 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 pointer-events-none"></div>

                                        {/* Content */}
                                        <div className="relative z-10 flex-1 flex flex-col items-center text-center h-full justify-center">
                                            <div className={`inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-widest border mb-4 sm:mb-6 backdrop-blur-md shadow-lg ${item.badgeColor} transform transition-transform group-hover:scale-105`}>
                                                <i className="fa-solid fa-star animate-spin-slow"></i> {item.badge}
                                            </div>

                                            <h3 className="text-3xl sm:text-4xl md:text-[3.3rem] font-black font-heading mb-2 sm:mb-4 leading-[1.05] drop-shadow-sm">
                                                {item.title} <br />
                                                <span className={`relative inline-block ${item.textColor === 'text-white' ? 'text-white' : 'text-[#FF4D00]'}`}>{item.highlight}</span>
                                            </h3>

                                            <p className={`text-sm sm:text-base md:text-lg font-semibold leading-relaxed mb-3 sm:mb-5 max-w-md ${item.textColor === 'text-white' ? 'text-white/90' : 'text-slate-600'}`}>
                                                {item.desc}
                                            </p>

                                            <div className="grid grid-cols-2 gap-2 w-full max-w-[560px] mx-auto">
                                                {item.features && item.features.map((feature, fIdx) => (
                                                    <span key={fIdx} className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-[11px] font-bold border text-center ${item.textColor === 'text-white' ? 'bg-white/18 text-white border-white/45' : 'bg-[#5D3A1F]/5 text-[#111827] border-[#5D3A1F]/20'}`}>
                                                        <i className={`fa-solid ${feature.icon} text-[10px] opacity-80`}></i>
                                                        {feature.text}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Huge Icon Graphic */}
                                        <div className="relative z-10 w-full md:w-5/12 flex items-center justify-center">
                                            <div className={`w-20 h-20 sm:w-28 sm:h-28 md:w-44 md:h-44 rounded-[2rem] sm:rounded-[2.5rem] md:rounded-[3rem] flex items-center justify-center shadow-2xl ${item.iconColor} transition-all group-hover:scale-110 group-hover:rotate-6 duration-700 relative ring-4 sm:ring-6 md:ring-8 ring-white/20 backdrop-blur-sm border border-white/40`}>
                                                <div className="absolute -top-3 -right-3 sm:-top-5 sm:-right-5 md:-top-8 md:-right-8 w-8 h-8 sm:w-11 sm:h-11 md:w-16 md:h-16 bg-[#FF4D00] rounded-lg sm:rounded-2xl md:rounded-3xl flex items-center justify-center text-white text-sm sm:text-lg md:text-2xl font-bold shadow-xl animate-bounce-slow rotate-12 z-20 border-4 border-white">
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
                    <div className="flex justify-between items-center max-w-xs mx-auto mt-4 sm:mt-8 bg-white/90 backdrop-blur-md p-2 rounded-full shadow-xl border border-[#FF4D00]/20">
                        <button
                            onClick={prev}
                            aria-label="Anterior"
                            className="w-9 h-9 sm:w-12 sm:h-12 rounded-full flex items-center justify-center hover:bg-[#FF4D00] hover:text-white transition-colors text-[#8B4513]"
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
                                                    ? 'w-16 h-2 bg-[#FF4D00]'
                                                    : 'w-2.5 h-2.5 bg-gray-400 hover:bg-gray-500'
                                            }`}
                                        >
                                            {index === activeDotIndex && isAutoplaying && !isTransitioning && (
                                                <span
                                                    className="absolute top-0 left-0 h-full bg-[#5D3A1F] rounded-full"
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
                            className="w-9 h-9 sm:w-12 sm:h-12 rounded-full flex items-center justify-center hover:bg-[#FF4D00] hover:text-white transition-colors text-[#8B4513]"
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
