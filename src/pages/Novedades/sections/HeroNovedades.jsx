import React, { useState, useEffect, useCallback } from 'react';
import PageHero from '../../../components/func/MigasPan';
import CircuitBackground from '../../../components/fondos/FondoSaltenas';
import AnunciosTicker from './AnunciosTicker';

const NOTICIAS = [
    { id: 1, fecha: '28 Ago', categoria: 'Sucursales', icon: 'fa-store', titulo: 'Abrimos nueva sucursal en Oruro', resumen: 'La capital del folklore ya tiene su HagamosTech con dos puntos de atención para acercarte el sabor de siempre.', img: '/img/10_sucursales/Oruro/01_Sucursal.png', tag: 'NUEVO' },
    { id: 2, fecha: '15 Ago', categoria: 'Reconocimiento', icon: 'fa-trophy', titulo: 'Premio "Mejor Salteñería 2026"', resumen: 'Los lectores de la ciudad nos eligieron por quinto año consecutivo como la mejor salteñería de Santa Cruz.', img: '/img/10_sucursales/SantaCruz/01_Sucursal.png', tag: 'PREMIOS' },
    { id: 3, fecha: '02 Ago', categoria: 'Producción', icon: 'fa-fire-burner', titulo: 'Nuevo horno artesanal', resumen: 'Invertimos en un horno de ladrillo que aumenta nuestra capacidad de horneado manteniendo el sabor de siempre.', img: '/img/10_sucursales/SantaCruz/02_Sucursal.png', tag: 'INNOVACIÓN' },
    { id: 4, fecha: '20 Jul', categoria: 'Equipo', icon: 'fa-people-group', titulo: 'Nuevos integrantes al equipo', resumen: 'Más de 15 personas se sumaron a la familia HagamosTech para atenderte mejor en todas las sucursales.', img: '/img/10_sucursales/Cochabamba/01_Sucursal.png', tag: 'EQUIPO' },
    { id: 5, fecha: '05 Jul', categoria: 'Alianzas', icon: 'fa-handshake', titulo: 'Convenio con productores locales', resumen: 'Trabajamos directamente con granjas de la región para garantizar ingredientes frescos todos los días.', img: '/img/10_sucursales/Cochabamba/04_Sucursal.png', tag: 'ALIANZAS' },
    { id: 6, fecha: '18 Jun', categoria: 'Evento', icon: 'fa-music', titulo: 'Primer festival gastronómico', resumen: 'Participamos con un stand propio y nuestra salteña gigante, el hit de la feria. ¡Gracias a todos!', img: '/img/10_sucursales/Oruro/02_Sucursal.png', tag: 'EVENTO' },
];

const AUTOPLAY_MS = 6000;

const HeroNovedades = () => {
    const [current, setCurrent] = useState(0);
    const [paused, setPaused] = useState(false);
    const N = NOTICIAS.length;

    const next = useCallback(() => setCurrent(prev => (prev + 1) % N), [N]);
    const prev = useCallback(() => setCurrent(prev => (prev - 1 + N) % N), [N]);

    useEffect(() => {
        if (paused) return;
        const timer = setInterval(next, AUTOPLAY_MS);
        return () => clearInterval(timer);
    }, [next, paused]);

    const goTo = (idx) => setCurrent(idx);

    return (
        <div className="relative z-10">
            <CircuitBackground />

            {/* Hero compacto */}
            <PageHero
                title="Novedades de"
                highlight="HagamosTech."
                description="Enterate de todo lo nuevo: sabores de temporada, lanzamientos exclusivos, combos especiales y noticias de nuestra salteñería. Siempre hay algo fresco para probar."
                className="!pb-0"
            />

            {/* Marquee de Avisos Rápidos pantalla completa (bajo la descripción, sobre la card) */}
            <div className="relative z-20 mt-8 sm:mt-10 w-full">
                <AnunciosTicker compact />
            </div>

            {/* Slider full-screen de Avisos Rápidos */}
            <div className="container mx-auto px-6 max-w-7xl mt-6 pb-14 relative z-20">
                <div className="relative">
                <div
                    className="relative w-full rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white group"
                    style={{ height: 'min(78vh, 720px)' }}
                    onMouseEnter={() => setPaused(true)}
                    onMouseLeave={() => setPaused(false)}
                >
                    {NOTICIAS.map((n, i) => (
                        <div
                            key={n.id}
                            className={`absolute inset-0 transition-all duration-[900ms] ease-out ${i === current ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-105 z-0'}`}
                        >
                            {/* Imagen full-screen */}
                            <img src={n.img} alt={n.titulo} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/95 via-[#111827]/45 to-[#111827]/10"></div>

                            {/* Badge superior */}
                            <div className="absolute top-5 left-5 z-20 flex items-center gap-2">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FF4D00] text-white text-[9px] font-black uppercase tracking-widest shadow-lg shadow-orange-500/40">
                                    <i className={`fas ${n.icon} text-[9px]`}></i> {n.categoria}
                                </span>
                                <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-white/90 text-[9px] font-bold uppercase tracking-widest border border-white/25">
                                    <i className="fas fa-calendar-days text-amber-300"></i> {n.fecha}
                                </span>
                            </div>
                            <span className="absolute top-5 right-5 z-20 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md text-amber-300 text-[9px] font-black uppercase tracking-widest border border-white/20 shadow-lg">
                                {n.tag}
                            </span>

                            {/* Contenido */}
                            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 lg:p-14">
                                <div className="max-w-3xl">
                                    <div className="inline-flex items-center gap-2.5 mb-4 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
                                        <span className="w-6 h-6 rounded-full bg-[#FF4D00] flex items-center justify-center">
                                            <i className="fas fa-bullhorn text-[9px] text-white"></i>
                                        </span>
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-300">Aviso Rápido</span>
                                    </div>

                                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-black font-heading text-white leading-[1.15] drop-shadow-lg mb-3">
                                        <span className="relative inline-block">
                                            {n.titulo}
                                            <svg className="absolute w-full h-3 -bottom-2 left-0 z-[-1] text-amber-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.55)]" viewBox="0 0 200 12" preserveAspectRatio="none" fill="none">
                                                <path d="M8,8 C22,5 38,7.5 55,7.5 C130,7.5 165,7.5 188,7.5 C194,7.5 198,6 196,7.5" stroke="currentColor" strokeWidth="7" strokeLinecap="round"/>
                                            </svg>
                                        </span>
                                    </h2>

                                    <div className="w-16 h-1 rounded-full bg-gradient-to-r from-[#FF4D00] to-amber-400 mb-4"></div>

                                    <p className="text-white/90 font-medium max-w-2xl leading-relaxed text-sm sm:text-base mb-6">
                                        {n.resumen}
                                    </p>

                                    <div className="flex flex-wrap items-center gap-3">
                                        <a
                                            href="https://wa.me/59161320004"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center justify-center gap-2.5 min-w-[180px] px-6 py-3.5 bg-[#25D366] hover:bg-[#1DA851] text-white rounded-full font-black text-[11px] uppercase tracking-[0.15em] shadow-xl shadow-green-500/30 hover:shadow-2xl hover:-translate-y-0.5 active:scale-95 transition-all"
                                        >
                                            <i className="fab fa-whatsapp text-base"></i> WhatsApp
                                        </a>
                                        <a
                                            href="tel:+59161320004"
                                            className="inline-flex items-center justify-center gap-2.5 min-w-[180px] px-6 py-3.5 bg-[#FF4D00] hover:bg-[#CC3D00] text-white rounded-full font-black text-[11px] uppercase tracking-[0.15em] shadow-xl shadow-orange-500/30 hover:shadow-2xl hover:-translate-y-0.5 active:scale-95 transition-all"
                                        >
                                            <i className="fas fa-phone text-sm"></i> Llamar
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Contador y dots */}
                    <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 z-30 flex items-center gap-2">
                        <span className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-black/40 backdrop-blur-md text-white text-[11px] font-black tracking-widest border border-white/20 shadow-lg">
                            <i className="fas fa-image text-[#FF4D00] text-[10px]"></i>
                            {String(current + 1).padStart(2, '0')} / {String(N).padStart(2, '0')}
                        </span>
                    </div>
                    <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 px-3 py-2 rounded-full bg-black/30 backdrop-blur-md">
                        {NOTICIAS.map((n, i) => (
                            <button
                                key={n.id}
                                onClick={() => goTo(i)}
                                aria-label={`Ir a noticia ${i + 1}`}
                                className={`h-2 rounded-full transition-all duration-500 cursor-pointer ${i === current ? 'w-9 bg-[#FF4D00] shadow-[0_0_12px_rgba(255,77,0,0.7)]' : 'w-2 bg-white/40 hover:bg-white/80'}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Flechas fuera de la card */}
                <button
                    onClick={prev}
                    aria-label="Noticia anterior"
                    className="absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 z-30 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white shadow-xl shadow-black/10 border border-orange-100 text-[#8B4513] hover:bg-[#FF4D00] hover:text-white hover:border-[#FF4D00] hover:scale-110 active:scale-95 flex items-center justify-center transition-all duration-300 cursor-pointer group"
                >
                    <i className="fas fa-chevron-left text-sm sm:text-base group-hover:-translate-x-0.5 transition-transform"></i>
                </button>
                <button
                    onClick={next}
                    aria-label="Siguiente noticia"
                    className="absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 z-30 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white shadow-xl shadow-black/10 border border-orange-100 text-[#8B4513] hover:bg-[#FF4D00] hover:text-white hover:border-[#FF4D00] hover:scale-110 active:scale-95 flex items-center justify-center transition-all duration-300 cursor-pointer group"
                >
                    <i className="fas fa-chevron-right text-sm sm:text-base group-hover:translate-x-0.5 transition-transform"></i>
                </button>
                </div>
            </div>
        </div>
    );
};

export default HeroNovedades;
