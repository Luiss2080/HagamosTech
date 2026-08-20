import React, { useState, useEffect } from 'react';
import CircuitBackground from '../../../components/fondos/FondoTech';
import useModalStore from '../../../store/useModalStore';

const initialVideos = [
  {
    id: 1,
    tiktokId: '7659877880071015701',
    title: 'HagamosTech',
    views: 'Nuevo',
    desc: 'La marca que convierte problemas, necesidades e ideas en soluciones reales.',
    thumb: 'bg-[#A3E635]',
  },
  {
    id: 2,
    tiktokId: '7657645476270853396',
    title: 'Soluciones Digitales',
    views: 'Popular',
    desc: 'Tecnología, creatividad y conocimiento para cualquier tipo de cliente.',
    thumb: 'bg-[#111827]',
  },
  {
    id: 3,
    tiktokId: '7658450020575759637',
    title: 'Atención de Primera',
    views: 'Tendencia',
    desc: 'Contanos qué necesitás y nosotros vemos cómo hacerlo realidad.',
    thumb: 'bg-[#0A0A0A]',
  },
  {
    id: 4,
    tiktokId: '7657244089661951252',
    title: 'Nuestra Calidad',
    views: 'Nuevo',
    desc: 'Trabajamos desde tu necesidad real, sin catálogos rígidos.',
    thumb: 'bg-[#A3E635]',
  },
  {
    id: 5,
    tiktokId: '7657627736713809172',
    title: 'Hacelo juntos',
    views: 'Destacado',
    desc: '“Hagamos” es una invitación: vos tenés la necesidad, la hacemos juntos.',
    thumb: 'bg-[#171717]',
  },
];

const VideosTikTok = () => {
    const openModal = useModalStore((state) => state.openModal);
    const [orderedVideos, setOrderedVideos] = useState(initialVideos);
    const [unmutedVideoId, setUnmutedVideoId] = useState(null);
    const [lastSelectedId, setLastSelectedId] = useState(null);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const isMobile = windowWidth < 640;
    const isTablet = windowWidth >= 640 && windowWidth < 1024;

    const cardWidth = isMobile ? 190 : (isTablet ? 320 : 360);
    const cardMarginLeft = -cardWidth / 2;
    const xSpacing = isMobile ? 30 : (isTablet ? 130 : 230);
    const ySpacing = isMobile ? 6 : (isTablet ? 16 : 24);

    const handleVideoSelection = (newOrder, newCenterId) => {
        setOrderedVideos(newOrder);
        setLastSelectedId(newCenterId);
        newOrder.forEach((video) => {
            const iframe = document.getElementById(`tiktok-iframe-${video.id}`);
            if (iframe && iframe.contentWindow) {
                if (video.id === newCenterId) {
                    iframe.contentWindow.postMessage({ "x-tiktok-player": true, "type": "unMute" }, '*');
                    setUnmutedVideoId(newCenterId);
                } else {
                    iframe.contentWindow.postMessage({ "x-tiktok-player": true, "type": "mute" }, '*');
                }
            }
        });
    };

    return (
        <div className="relative">
            <section className="relative z-10 py-4 overflow-hidden">
                <CircuitBackground />
                <style dangerouslySetInnerHTML={{__html: `
                    @keyframes spinLeftToRight {
                        0% { transform: rotateY(-180deg); }
                        100% { transform: rotateY(0deg); }
                    }
                    .animate-spin-lr {
                        animation: spinLeftToRight 0.8s cubic-bezier(0.25, 0.8, 0.25, 1) forwards;
                    }
                    @keyframes fadeIn {
                        from { opacity: 0; }
                        to { opacity: 1; }
                    }
                    .animate-fade-in {
                        animation: fadeIn 0.25s ease-out forwards;
                    }
                `}} />
                <div className="w-full px-4 md:px-8 relative z-20">
                    {/* --- SECTION TITLE AND DESCRIPTION --- */}
                    <div className="text-center mb-4">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading text-[#0A0A0A] mb-6 leading-tight">
                            Nuestra esencia <br/>
                            <span className="text-[#84CC16] relative inline-block">
                                en Video.
                                <svg className="absolute w-full h-3 -bottom-1 left-0 z-[-1] text-[#A3E635] drop-shadow-[0_0_8px_rgba(163,230,53,0.55)]" viewBox="0 0 200 12" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8,8 C22,5 38,7.5 55,7.5 C130,7.5 165,7.5 188,7.5 C194,7.5 198,6 196,7.5" stroke="currentColor" strokeWidth="7" strokeLinecap="round"  />
                                </svg>
                            </span>
                        </h2>
                        <p className="text-slate-600 font-medium max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
                            Conoce más sobre HagamosTech: nuestra forma de trabajar, ejemplos de soluciones y el trabajo diario para llevar tu idea a la realidad.
                        </p>
                    </div>

                    <div className="relative min-h-[500px] sm:min-h-[640px] md:min-h-[780px] lg:min-h-[800px] pt-6 max-w-6xl mx-auto flex items-start justify-center group/deck px-4 [perspective:1200px] [transform-style:preserve-3d]">
                        {orderedVideos.map((video, index) => {
                            const center = 2;
                            const offset = index - center;
                            const rotateDeg = offset * (isMobile ? 2 : 4);
                            const translateX = offset * xSpacing;
                            const translateY = Math.abs(offset) * ySpacing;
                            const baseZ = 40 - Math.abs(offset);
                            const isActive = index === 2;
                            const scale = isActive ? 1 : 0.88;

                            return (
                                <div
                                    key={video.id}
                                    onClick={() => {
                                        if (index !== 2) {
                                            const newOrder = [...orderedVideos];
                                            const temp = newOrder[2];
                                            newOrder[2] = newOrder[index];
                                            newOrder[index] = temp;
                                            handleVideoSelection(newOrder, newOrder[2].id);
                                        } else {
                                            const activeIframe = document.getElementById(`tiktok-iframe-${video.id}`);
                                            if (activeIframe && activeIframe.contentWindow) {
                                                activeIframe.contentWindow.postMessage({ "x-tiktok-player": true, "type": "mute" }, '*');
                                            }
                                            setUnmutedVideoId(null);
                                            openModal('videoModal', video);
                                        }
                                    }}
                                    className="absolute outline-none cursor-pointer"
                                    style={{
                                        zIndex: 100 - Math.abs(offset),
                                        left: '50%',
                                        marginLeft: `${cardMarginLeft}px`,
                                        width: `${cardWidth}px`,
                                        transition: 'all 0.7s cubic-bezier(0.25, 0.8, 0.25, 1)',
                                    }}
                                >
                                    <div
                                        className="transform-gpu will-change-transform [backface-visibility:hidden] transition-[transform] duration-700 ease-[cubic-bezier(0.25,0.8,0.25,1)]"
                                        style={{
                                            transform: `translateX(${translateX}px) translateY(${translateY}px) rotate(${rotateDeg}deg) scale(${scale}) translateZ(${baseZ}px)`,
                                        }}
                                    >
                                        <div className={isActive && lastSelectedId === video.id ? 'animate-spin-lr' : ''} style={{ transformStyle: 'preserve-3d' }}>
                                            <div className={`w-full bg-white rounded-[2.5rem] p-4.5 shadow-2xl transition-all duration-300 ${isActive ? 'border-2 border-[#A3E635] shadow-[0_0_25px_rgba(163,230,53,0.35)]' : 'border border-gray-100 hover:border-[#A3E635]/40'}`}>
                                                <div className="aspect-[9/16] w-full rounded-[2rem] overflow-hidden relative shadow-inner flex items-center justify-center border border-white/10">
                                                <iframe
                                                    id={`tiktok-iframe-${video.id}`}
                                                    src={`https://www.tiktok.com/player/v1/${video.tiktokId}?autoplay=1&mute=${unmutedVideoId === video.id ? 0 : 1}&loop=1&music_info=0&description=0`}
                                                    className="w-full h-full border-0 absolute inset-0 z-20"
                                                    allow="autoplay; encrypted-media; picture-in-picture"
                                                    title={video.title}
                                                    loading="lazy"
                                                    allowFullScreen
                                                ></iframe>
                                                <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/20 pointer-events-none z-10"></div>
                                                <div className="absolute left-4 top-4 z-30 bg-[#A3E635] text-[#0A0A0A] px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider shadow-md flex items-center gap-2">
                                                    <i className="fa-solid fa-play text-[8px]"></i> {video.views}
                                                </div>
                                                <div className="absolute right-4 top-4 z-30 w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                                                    <i className="fab fa-tiktok text-sm"></i>
                                                </div>
                                                <div className="absolute left-4 bottom-4 z-30 right-4 flex items-end justify-between">
                                                    <button
                                                        type="button"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setUnmutedVideoId(unmutedVideoId === video.id ? null : video.id);
                                                        }}
                                                        className="inline-flex items-center gap-2 rounded-full bg-white/25 hover:bg-white/40 active:scale-95 transition-all backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 border border-white/15 cursor-pointer relative z-40"
                                                    >
                                                        {unmutedVideoId === video.id ? (
                                                            <>
                                                                <i className="fa-solid fa-volume-high"></i> Con sonido
                                                            </>
                                                        ) : (
                                                            <>
                                                                <i className="fa-solid fa-volume-xmark"></i> Sin sonido
                                                            </>
                                                        )}
                                                    </button>
                                                    <div className="w-8 h-8 rounded-full bg-[#0A0A0A]/90 text-white flex items-center justify-center border border-white/10 shadow-md">
                                                        <i className="fa-solid fa-bolt text-[11px]"></i>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mt-4 px-1">
                                                <div className="flex items-center justify-between gap-2 mb-2">
                                                    <span className="inline-flex items-center gap-2 rounded-full bg-[#A3E635]/10 text-[#84CC16] px-3 py-1 text-[10px] font-black uppercase tracking-widest">
                                                        <i className="fa-solid fa-bolt"></i> {video.views}
                                                    </span>
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Muestra en video</span>
                                                </div>
                                                <p className="text-slate-700 text-sm font-semibold leading-relaxed">{video.desc}</p>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default VideosTikTok;
