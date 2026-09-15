import React, { useState, useEffect, useCallback } from 'react';
import PageHero from '../../../components/func/MigasPan';
import CircuitBackground from '../../../components/fondos/FondoTech';
import AnunciosTicker from './AnunciosTicker';

const NOTICIAS = [
    { id: 1, fecha: '10 Sep', categoria: 'Producto', icon: 'fa-robot', titulo: 'Nuevo asistente de IA para tu web', resumen: 'Integramos asistentes con inteligencia artificial que responden las consultas de tus clientes 24/7 y derivan a WhatsApp cuando hace falta.', img: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&auto=format&fit=crop&q=60', tag: 'NUEVO' },
    { id: 2, fecha: '02 Sep', categoria: 'Automatización', icon: 'fa-gears', titulo: 'Conectamos tu CRM con WhatsApp', resumen: 'Automatizamos el seguimiento de leads y las respuestas de primer contacto para que no pierdas ninguna oportunidad.', img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=60', tag: 'PRODUCTO' },
    { id: 3, fecha: '25 Ago', categoria: 'Academia', icon: 'fa-graduation-cap', titulo: 'Taller de React para estudiantes', resumen: 'Arranca el taller de desarrollo web con React: construís un proyecto real desde cero y con acompañamiento.', img: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&auto=format&fit=crop&q=60', tag: 'ACADEMIA' },
    { id: 4, fecha: '18 Ago', categoria: 'Reconocimiento', icon: 'fa-trophy', titulo: 'Premio a la innovación local', resumen: 'Nuestro sistema de gestión fue reconocido en la feria tecnológica regional por su impacto en pymes.', img: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&auto=format&fit=crop&q=60', tag: 'PREMIOS' },
    { id: 5, fecha: '05 Ago', categoria: 'Equipo', icon: 'fa-people-group', titulo: 'Sumamos desarrolladores al equipo', resumen: 'Ampliamos el equipo de desarrollo para responder a más proyectos en simultáneo sin perder calidad.', img: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&auto=format&fit=crop&q=60', tag: 'EQUIPO' },
    { id: 6, fecha: '22 Jul', categoria: 'Alianzas', icon: 'fa-handshake', titulo: 'Convenio con universidades', resumen: 'Firmamos acuerdos para prácticas profesionales y desarrollo de proyectos académicos con estudiantes.', img: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&auto=format&fit=crop&q=60', tag: 'ALIANZAS' },
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
                description="Enterate de lo nuevo: lanzamientos, talleres, logros y avisos de nuestros servicios de tecnología. Siempre hay algo nuevo para aprender o implementar."
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
                                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#A3E635] text-[#0A0A0A] text-[9px] font-black uppercase tracking-widest shadow-lg shadow-lime-400/20/40">
                                    <i className={`fas ${n.icon} text-[9px]`}></i> {n.categoria}
                                </span>
                                <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-white/90 text-[9px] font-bold uppercase tracking-widest border border-white/25">
                                    <i className="fas fa-calendar-days text-lime-300"></i> {n.fecha}
                                </span>
                            </div>
                            <span className="absolute top-5 right-5 z-20 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md text-lime-300 text-[9px] font-black uppercase tracking-widest border border-white/20 shadow-lg">
                                {n.tag}
                            </span>

                            {/* Contenido */}
                            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 lg:p-14">
                                <div className="max-w-3xl">
                                    <div className="inline-flex items-center gap-2.5 mb-4 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
                                        <span className="w-6 h-6 rounded-full bg-[#A3E635] flex items-center justify-center">
                                            <i className="fas fa-bullhorn text-[9px] text-white"></i>
                                        </span>
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-lime-300">Aviso Rápido</span>
                                    </div>

                                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-black font-heading text-white leading-[1.15] drop-shadow-lg mb-3">
                                        <span className="relative inline-block">
                                            {n.titulo}
                                            <svg className="absolute w-full h-3 -bottom-2 left-0 z-[-1] text-lime-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.55)]" viewBox="0 0 200 12" preserveAspectRatio="none" fill="none">
                                                <path d="M8,8 C22,5 38,7.5 55,7.5 C130,7.5 165,7.5 188,7.5 C194,7.5 198,6 196,7.5" stroke="currentColor" strokeWidth="7" strokeLinecap="round"/>
                                            </svg>
                                        </span>
                                    </h2>

                                    <div className="w-16 h-1 rounded-full bg-gradient-to-r from-[#A3E635] to-[#84CC16] mb-4"></div>

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
                                            className="inline-flex items-center justify-center gap-2.5 min-w-[180px] px-6 py-3.5 bg-[#A3E635] hover:bg-[#84CC16] text-[#0A0A0A] rounded-full font-black text-[11px] uppercase tracking-[0.15em] shadow-xl shadow-lime-400/20/30 hover:shadow-2xl hover:-translate-y-0.5 active:scale-95 transition-all"
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
                            <i className="fas fa-image text-[#A3E635] text-[10px]"></i>
                            {String(current + 1).padStart(2, '0')} / {String(N).padStart(2, '0')}
                        </span>
                    </div>
                    <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 px-3 py-2 rounded-full bg-black/30 backdrop-blur-md">
                        {NOTICIAS.map((n, i) => (
                            <button
                                key={n.id}
                                onClick={() => goTo(i)}
                                aria-label={`Ir a noticia ${i + 1}`}
                                className={`h-2 rounded-full transition-all duration-500 cursor-pointer ${i === current ? 'w-9 bg-[#A3E635] shadow-[0_0_12px_rgba(255,77,0,0.7)]' : 'w-2 bg-white/40 hover:bg-white/80'}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Flechas fuera de la card */}
                <button
                    onClick={prev}
                    aria-label="Noticia anterior"
                    className="absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 z-30 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#111827] shadow-xl shadow-black/10 border border-white/10 text-white hover:bg-[#A3E635] hover:text-white hover:border-[#A3E635] hover:scale-110 active:scale-95 flex items-center justify-center transition-all duration-300 cursor-pointer group"
                >
                    <i className="fas fa-chevron-left text-sm sm:text-base group-hover:-translate-x-0.5 transition-transform"></i>
                </button>
                <button
                    onClick={next}
                    aria-label="Siguiente noticia"
                    className="absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 z-30 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#111827] shadow-xl shadow-black/10 border border-white/10 text-white hover:bg-[#A3E635] hover:text-white hover:border-[#A3E635] hover:scale-110 active:scale-95 flex items-center justify-center transition-all duration-300 cursor-pointer group"
                >
                    <i className="fas fa-chevron-right text-sm sm:text-base group-hover:translate-x-0.5 transition-transform"></i>
                </button>
                </div>
            </div>
        </div>
    );
};

export default HeroNovedades;
