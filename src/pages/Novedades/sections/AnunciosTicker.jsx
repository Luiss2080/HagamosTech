import React from 'react';
import CircuitBackground from '../../../components/fondos/FondoTech';

const ANUNCIOS = [
    { titulo: 'Asistentes con IA', desc: 'Atención al cliente 24/7 para tu web o negocio.', img: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&auto=format&fit=crop&q=60', tag: 'IA' },
    { titulo: 'Soporte ampliado', desc: 'Te atendemos por WhatsApp de lunes a sábado.', img: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&auto=format&fit=crop&q=60', tag: 'SOPORTE' },
    { titulo: 'Taller de React', desc: 'Cupos abiertos para el próximo grupo.', img: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&auto=format&fit=crop&q=60', tag: 'ACADEMIA' },
    { titulo: 'Hosting y dominio', desc: 'Incluidos en los packs de páginas web.', img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&auto=format&fit=crop&q=60', tag: 'WEB' },
    { titulo: 'Automatización de procesos', desc: 'Conectá tus herramientas y ahorrá tiempo.', img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&auto=format&fit=crop&q=60', tag: 'PRODUCTO' },
    { titulo: 'Estamos contratando', desc: 'Buscamos desarrolladores frontend y backend.', img: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&auto=format&fit=crop&q=60', tag: 'TRABAJO' },
];

const TAG_STYLES = {
    IA: 'bg-[#0A0A0A]',
    SOPORTE: 'bg-[#A3E635]',
    ACADEMIA: 'bg-[#171717]',
    WEB: 'bg-[#84CC16]',
    PRODUCTO: 'bg-[#4D7C0F]',
    TRABAJO: 'bg-[#1d4ed8]',
};

const AnunciosTicker = ({ compact = false }) => {
    const row1 = [...ANUNCIOS, ...ANUNCIOS];

    const renderCard = (anuncio, index) => (
        <article key={`${anuncio.titulo}-${index}`} className="bg-[#111827] rounded-[20px] shadow-[0_8px_30px_rgba(0,0,0,0.12)] p-3.5 flex items-center gap-3 sm:gap-4 border-b-[5px] border-[#A3E635] w-[300px] sm:w-[340px] shrink-0 transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(0,0,0,0.2)] relative">
            {/* Badge tag */}
            <div className={`absolute top-2 right-2 ${TAG_STYLES[anuncio.tag] || 'bg-[#0A0A0A]'} text-white text-[8px] font-black px-2 py-0.5 rounded-full border border-white/20`}>
                {anuncio.tag}
            </div>

            {/* Imagen */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center bg-white/5 rounded-[14px] overflow-hidden shrink-0 border border-white/10">
                <img
                    src={anuncio.img}
                    alt={anuncio.titulo}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    onError={(e) => { e.target.src = '/img/03_Banners/Hero.png'; }}
                />
            </div>

            {/* Divisor */}
            <div className="w-px h-20 bg-gradient-to-b from-transparent via-[#A3E635]/30 to-transparent"></div>

            {/* Contenido */}
            <div className="flex flex-col flex-1 justify-between py-1">
                <div className="mb-2">
                    <div className="flex items-center gap-1.5 mb-1">
                        <span className="text-[#A3E635] font-black text-[11px]"><i className="fa-solid fa-bullhorn"></i></span>
                        <h3 className="font-extrabold text-slate-300 text-[11px] leading-tight uppercase w-40" title={anuncio.titulo}>
                            {anuncio.titulo}
                        </h3>
                    </div>
                    <p className="text-slate-400 font-bold text-[9px] leading-snug truncate w-40" title={anuncio.desc}>
                        {anuncio.desc}
                    </p>
                </div>
                <button className="w-full bg-[#A3E635] hover:bg-[#0A0A0A] text-white font-bold text-[9px] py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition-colors shadow-sm">
                    SABER MÁS
                    <i className="fa-solid fa-arrow-up-right-from-square text-[9px]"></i>
                </button>
            </div>
        </article>
    );

    if (compact) {
        return (
            <div className="relative w-full overflow-hidden z-10">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#A3E635]/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3"></div>
                    <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#171717]/10 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/3"></div>
                </div>

                <div className="absolute top-0 left-0 h-full w-12 sm:w-24 bg-gradient-to-r from-[#111111] to-transparent z-20 pointer-events-none"></div>
                <div className="absolute top-0 right-0 h-full w-12 sm:w-24 bg-gradient-to-l from-[#111111] to-transparent z-20 pointer-events-none"></div>

                <style>{`
                    @keyframes anunciosMarquee {
                        0% { transform: translateX(0); }
                        100% { transform: translateX(-50%); }
                    }
                    .marquee-anuncios {
                        display: flex;
                        width: max-content;
                        animation: anunciosMarquee 35s linear infinite;
                    }
                    .marquee-anuncios:hover {
                        animation-play-state: paused;
                    }
                `}</style>

                <div className="relative z-10 w-full">
                    <div className="marquee-anuncios flex gap-5 sm:gap-6 px-4 py-2">
                        {row1.map((anuncio, i) => renderCard(anuncio, i))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <section id="anuncios" className="relative w-full py-8 sm:py-10 overflow-hidden z-10">
            {/* Fondo de la web activo */}
            <CircuitBackground />

            {/* Fondo decorativo */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#A3E635]/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#171717]/10 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/3"></div>
            </div>

            {/* Título */}
            <div className="relative z-10 text-center mb-5 px-6">
                <span className="inline-block bg-[#A3E635]/10 text-[#A3E635] px-4 py-1.5 rounded-full text-[10px] font-black tracking-[0.2em] uppercase border border-[#A3E635]/25 backdrop-blur-sm">
                    <i className="fas fa-bullhorn mr-1.5 text-[#A3E635]"></i> Avisos Rápidos
                </span>
                <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-black font-heading mt-3 mb-3">
                    Enterate de <span className="relative inline-block text-[#A3E635]">
                        último momento
                        <svg className="absolute w-full h-3 -bottom-1.5 left-0 z-[-1] text-lime-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.55)]" viewBox="0 0 200 12" preserveAspectRatio="none" fill="none">
                            <path d="M8,8 C22,5 38,7.5 55,7.5 C130,7.5 165,7.5 188,7.5 C194,7.5 198,6 196,7.5" stroke="currentColor" strokeWidth="7" strokeLinecap="round"/>
                        </svg>
                    </span>
                </h2>
                <p className="text-slate-300 font-medium max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
                    Novedades y anuncios del momento: servicios nuevos, talleres, soporte y promociones al instante.
                </p>
            </div>

            {/* Edge Fades */}
            <div className="absolute top-0 left-0 h-full w-16 sm:w-32 bg-gradient-to-r from-[#111111] to-transparent z-20 pointer-events-none"></div>
            <div className="absolute top-0 right-0 h-full w-16 sm:w-32 bg-gradient-to-l from-[#111111] to-transparent z-20 pointer-events-none"></div>

            <style>{`
                @keyframes anunciosMarquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .marquee-anuncios {
                    display: flex;
                    width: max-content;
                    animation: anunciosMarquee 35s linear infinite;
                }
                .marquee-anuncios:hover {
                    animation-play-state: paused;
                }
            `}</style>

            <div className="relative z-10 w-full">
                <div className="marquee-anuncios flex gap-5 sm:gap-6 px-4 py-2">
                    {row1.map((anuncio, i) => renderCard(anuncio, i))}
                </div>
            </div>
        </section>
    );
};

export default AnunciosTicker;
