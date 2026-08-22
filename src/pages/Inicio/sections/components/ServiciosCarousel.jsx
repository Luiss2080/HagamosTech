import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const WHATSAPP_URL = 'https://wa.me/59161320004';

const ServiciosCarousel = ({ items }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [visibleCards, setVisibleCards] = useState(3);
    const containerRef = useRef(null);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width < 640) {
                setVisibleCards(1);
            } else if (width < 1024) {
                setVisibleCards(2);
            } else {
                setVisibleCards(3);
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handlePrev = () => {
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => Math.min(prev + 1, items.length - visibleCards));
    };

    const canPrev = currentIndex > 0;
    const canNext = currentIndex < (items.length - visibleCards);

    return (
        <div className="relative w-full px-2 sm:px-12">
            
            {/* Controles de Navegación */}
            {items.length > visibleCards && (
                <>
                    <button
                        onClick={handlePrev}
                        disabled={!canPrev}
                        className={`absolute left-0 top-1/2 -translate-y-1/2 w-11 h-11 rounded-2xl bg-black/80 border border-white/10 flex items-center justify-center text-white transition-all z-20 cursor-pointer ${
                            canPrev ? 'hover:scale-105 hover:bg-[#A3E635] hover:text-[#0A0A0A] hover:border-transparent opacity-100' : 'opacity-30 cursor-not-allowed'
                        }`}
                        aria-label="Anterior"
                    >
                        <i className="fa-solid fa-chevron-left text-xs"></i>
                    </button>
                    <button
                        onClick={handleNext}
                        disabled={!canNext}
                        className={`absolute right-0 top-1/2 -translate-y-1/2 w-11 h-11 rounded-2xl bg-black/80 border border-white/10 flex items-center justify-center text-white transition-all z-20 cursor-pointer ${
                            canNext ? 'hover:scale-105 hover:bg-[#A3E635] hover:text-[#0A0A0A] hover:border-transparent opacity-100' : 'opacity-30 cursor-not-allowed'
                        }`}
                        aria-label="Siguiente"
                    >
                        <i className="fa-solid fa-chevron-right text-xs"></i>
                    </button>
                </>
            )}

            {/* Ventana de visualización */}
            <div className="overflow-hidden py-4 w-full">
                <div
                    ref={containerRef}
                    className="flex gap-6 transition-transform duration-500 ease-out"
                    style={{
                        transform: `translateX(-${currentIndex * (100 / visibleCards + 1.2)}%)`
                    }}
                >
                    {items.map((module, index) => {
                        // Alternancia de colores:
                        // 0, 3 -> Black Tech card
                        // 1, 4 -> White card
                        // 2, 5 -> Green/Lime card
                        const cardType = index % 3;
                        let cardBg = '';
                        let textTitle = '';
                        let textDesc = '';
                        let borderStyle = '';
                        let iconWrapperBg = '';
                        let iconColor = '';
                        let pillStyle = '';
                        let statsBg = '';
                        let statsText = '';
                        let badgeStyle = '';
                        let priceText = '';
                        let detailsBtnStyle = '';
                        let waBtnStyle = '';

                        if (cardType === 0) {
                            // Dark Tech Card
                            cardBg = 'bg-[#111111]';
                            textTitle = 'text-white group-hover:text-[#A3E635]';
                            textDesc = 'text-slate-400';
                            borderStyle = 'border-white/10 hover:border-[#A3E635]/40 hover:shadow-[0_15px_40px_rgba(163,230,53,0.12)] hover:ring-[#A3E635]/10';
                            iconWrapperBg = 'bg-[#A3E635] border-[#111111] ring-[#A3E635]/45';
                            iconColor = 'text-[#0A0A0A]';
                            pillStyle = 'bg-[#A3E635]/10 text-[#A3E635] border-[#A3E635]/20';
                            statsBg = 'bg-white/[0.02] border-white/5';
                            statsText = 'text-white';
                            badgeStyle = 'bg-[#151515] border-white/5 text-slate-350';
                            priceText = 'text-white';
                            detailsBtnStyle = 'bg-white hover:bg-white/90 text-[#0A0A0A]';
                            waBtnStyle = 'bg-[#25D366] hover:bg-[#22C55E] text-white';
                        } else if (cardType === 1) {
                            // White Card
                            cardBg = 'bg-white';
                            textTitle = 'text-[#0A0A0A] group-hover:text-[#84CC16]';
                            textDesc = 'text-slate-600';
                            borderStyle = 'border-neutral-200 hover:border-[#84CC16]/50 hover:shadow-[0_15px_40px_rgba(132,204,22,0.18)] hover:ring-[#84CC16]/10';
                            iconWrapperBg = 'bg-[#0A0A0A] border-white ring-[#0A0A0A]/20';
                            iconColor = 'text-white';
                            pillStyle = 'bg-[#0A0A0A]/5 text-[#0A0A0A] border-[#0A0A0A]/10';
                            statsBg = 'bg-neutral-100 border-neutral-200';
                            statsText = 'text-[#0A0A0A]';
                            badgeStyle = 'bg-neutral-150 border-neutral-200 text-slate-700';
                            priceText = 'text-[#0A0A0A]';
                            detailsBtnStyle = 'bg-[#0A0A0A] hover:bg-black text-white';
                            waBtnStyle = 'bg-[#25D366] hover:bg-[#22C55E] text-white';
                        } else {
                            // Green Card
                            cardBg = 'bg-[#A3E635]';
                            textTitle = 'text-[#0A0A0A] group-hover:text-[#0A0A0A]';
                            textDesc = 'text-[#0A0A0A]/80';
                            borderStyle = 'border-[#84CC16] hover:border-white/50 hover:shadow-[0_15px_40px_rgba(255,255,255,0.18)] hover:ring-white/10';
                            iconWrapperBg = 'bg-[#0A0A0A] border-[#A3E635] ring-white/20';
                            iconColor = 'text-white';
                            pillStyle = 'bg-[#0A0A0A]/10 text-[#0A0A0A] border-[#0A0A0A]/20';
                            statsBg = 'bg-white/25 border-white/20';
                            statsText = 'text-[#0A0A0A]';
                            badgeStyle = 'bg-white/30 border-white/10 text-[#0A0A0A]';
                            priceText = 'text-[#0A0A0A]';
                            detailsBtnStyle = 'bg-[#0A0A0A] hover:bg-black text-white';
                            waBtnStyle = 'bg-white hover:bg-white/95 text-[#0A0A0A]';
                        }

                        return (
                            <div
                                key={module.id}
                                style={{
                                    width: `calc(${100 / visibleCards}% - ${(16 * (visibleCards - 1)) / visibleCards}px)`
                                }}
                                className="flex-shrink-0"
                            >
                                <div className={`group relative ${cardBg} border rounded-[2.2rem] shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden flex flex-col h-full ring-0 hover:ring-4 ${borderStyle}`}>
                                    
                                    {/* Línea decorativa superior */}
                                    <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#A3E635] via-[#84CC16] to-[#A3E635] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 z-50"></div>

                                    {/* Imagen de Cabecera (Crop redondeado) */}
                                    <div className="relative h-48 sm:h-52 w-full overflow-hidden rounded-t-[2.2rem] border-b border-white/5 bg-[#050505]">
                                        <img
                                            src={module.img}
                                            alt={module.name}
                                            loading="lazy"
                                            decoding="async"
                                            className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-80"></div>

                                        {/* Badge Categoría */}
                                        <div className="absolute top-4 left-4 z-20">
                                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#A3E635] text-[#0A0A0A] text-[9px] font-black uppercase tracking-widest shadow-md">
                                                {module.category}
                                            </span>
                                        </div>

                                        {/* Badge Estado */}
                                        <div className="absolute top-4 right-4 z-20">
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[9px] font-black uppercase tracking-widest text-white shadow-sm">
                                                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                                                Activo
                                            </span>
                                        </div>
                                    </div>

                                    {/* Cuerpo - Centrado */}
                                    <div className="p-6 pt-8 flex-1 flex flex-col items-center text-center relative">
                                        
                                        {/* Icono flotante - Centrado */}
                                        <div className={`absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-2xl ${iconWrapperBg} shadow-xl flex items-center justify-center border-4 ring-2 z-30 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                                            <i className={`fa-solid ${module.icon} text-lg ${iconColor} drop-shadow-sm`}></i>
                                        </div>

                                        {/* Pill de Info - Centrado */}
                                        <div className="mb-3 flex justify-center w-full">
                                            <span className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-md text-[9px] font-black uppercase tracking-[0.14em] ${pillStyle}`}>
                                                {module.pillLabel}
                                            </span>
                                        </div>

                                        {/* Título de Servicio - Centrado */}
                                        <div className="mb-3 flex flex-col items-center">
                                            <h3 className={`text-xl font-black transition-colors leading-tight ${textTitle}`}>
                                                {module.name}
                                            </h3>
                                            <div className="w-10 h-[2.5px] bg-[#A3E635] rounded-full mt-2 group-hover:w-16 transition-all duration-300"></div>
                                        </div>

                                        {/* Descripción corta - Centrado */}
                                        <p className={`text-xs leading-relaxed mb-4 min-h-[3rem] font-medium ${textDesc}`}>
                                            {module.shortDesc}
                                        </p>

                                        {/* Ficha técnica con 3 características - Centrado */}
                                        <div className={`grid grid-cols-3 gap-1 py-2.5 border-y mb-5 w-full rounded-2xl ${statsBg}`}>
                                            {module.stats.map((stat, idx) => (
                                                <div key={idx} className={`flex flex-col items-center gap-1 ${idx === 1 ? 'border-x border-white/10' : ''}`}>
                                                    <div className="w-6 h-6 rounded-full bg-[#A3E635]/15 text-[#84CC16] flex items-center justify-center text-[10px] shadow-inner">
                                                        <i className={`fa-solid ${stat.icon}`}></i>
                                                    </div>
                                                    <div className="text-[7.5px] text-slate-500 font-black uppercase tracking-wider leading-tight">{stat.label}</div>
                                                    <div className={`text-[10px] font-black mt-0.5 leading-tight ${statsText}`}>{stat.value}</div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Incluye (Badges/Pills) - Centrado */}
                                        <div className="mb-5 w-full flex justify-center">
                                            <div className="flex items-center justify-center gap-1.5 flex-wrap">
                                                {module.includes.map((item, idx) => (
                                                    <span key={idx} className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[9px] font-bold border ${badgeStyle}`}>
                                                        <i className="fa-solid fa-check text-[#84CC16] text-[8px]"></i>
                                                        <i className={`fa-solid ${item.icon} text-[9px]`}></i>
                                                        {item.label}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Fila inferior de Precio & CTAs */}
                                        <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between gap-3 w-full">
                                            <div className="flex flex-col items-start">
                                                <span className="text-[7.5px] text-slate-500 font-black uppercase tracking-widest leading-none">PRECIO</span>
                                                <span className={`text-sm font-black mt-1 leading-none ${priceText}`}>{module.price}</span>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                {/* WhatsApp CTA */}
                                                <a
                                                    href={`${WHATSAPP_URL}?text=${encodeURIComponent(`Hola, quiero información sobre el servicio: ${module.name}`)}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-[9px] font-black uppercase tracking-wider transition-all duration-300 cursor-pointer shadow-md ${waBtnStyle}`}
                                                    title="Contactar por WhatsApp"
                                                >
                                                    <i className="fab fa-whatsapp text-[12px]"></i>
                                                    WhatsApp
                                                </a>
                                                {/* Detalles CTA */}
                                                <Link
                                                    to={module.ctaLink}
                                                    className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-[9px] font-black uppercase tracking-wider transition-all hover:-translate-y-0.5 shadow-md cursor-pointer ${detailsBtnStyle}`}
                                                >
                                                    {module.cta}
                                                    <i className="fa-solid fa-arrow-right text-[8px]"></i>
                                                </Link>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Indicadores de Puntos en la parte inferior */}
            {items.length > visibleCards && (
                <div className="flex justify-center items-center gap-2 mt-6">
                    {Array.from({ length: items.length - visibleCards + 1 }).map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentIndex(idx)}
                            className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                                currentIndex === idx
                                    ? 'w-7 bg-[#A3E635]'
                                    : 'w-2 bg-neutral-800 hover:bg-neutral-700'
                            }`}
                            aria-label={`Ir al slide ${idx + 1}`}
                        />
                    ))}
                </div>
            )}

        </div>
    );
};

export default ServiciosCarousel;
