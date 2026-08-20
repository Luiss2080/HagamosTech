import React, { useState, useEffect } from 'react';
import CircuitBackground from '../../../../components/fondos/FondoTech';
import CircleParticles from '../../../../components/fondos/ParticulasCirculares';

const VIDEOS = [
  { id: 1, tiktokId: '7659877880071015701', title: 'Nuestras Salteñas', views: 'Nuevo', desc: 'Disfrutá de las mejores salteñas en Santa Cruz, horneadas a diario con los mejores ingredientes.' },
  { id: 2, tiktokId: '7657645476270853396', title: 'Sabor Auténtico', views: 'Popular', desc: 'La receta original desde 1989 que sigue cautivando paladares en cada punto de venta.' },
  { id: 3, tiktokId: '7658450020575759637', title: 'Atención Cálida', views: 'Tendencia', desc: 'Conocé nuestro menú completo de salteñas, jugos naturales y bebidas calientes.' },
  { id: 4, tiktokId: '7657244089661951252', title: 'Calidad Superior', views: 'Nuevo', desc: 'Seleccionamos los insumos más frescos para brindarte un sabor realmente inconfundible.' },
  { id: 5, tiktokId: '7657627736713809172', title: 'El Horneado', views: 'Destacado', desc: 'El arte detrás de nuestra masa perfecta y el relleno jugoso al descubierto.' }
];

const VideosSucursalesSCZ = () => {
    const [orderedVideos, setOrderedVideos] = useState(VIDEOS);
    const [unmutedVideoId, setUnmutedVideoId] = useState(null);
    const [lastSelectedId, setLastSelectedId] = useState(null);
    const [modalVideo, setModalVideo] = useState(null);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (modalVideo) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = 'unset';
        return () => { document.body.style.overflow = 'unset'; };
    }, [modalVideo]);

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
            const iframe = document.getElementById(`tiktok-scz-${video.id}`);
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

    const handleIframeLoad = () => {
        const iframe = document.getElementById("tiktok-modal-scz-iframe");
        if (iframe && iframe.contentWindow) {
            iframe.contentWindow.postMessage({ "x-tiktok-player": true, "type": "unMute" }, '*');
        }
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
                `}} />
                <div className="w-full px-4 md:px-8 relative z-20">
                    <div className="text-center mb-4">
                        <span className="inline-block py-1.5 px-4 rounded-full bg-[#FF4D00]/10 text-[#FF4D00] text-[10px] font-black tracking-widest uppercase mb-4 border border-[#FF4D00]/20">
                            <i className="fab fa-tiktok text-[#FF4D00] mr-1"></i> TikTok Exclusivo
                        </span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading text-[#8B4513] mb-6 leading-tight">
                            Viví la experiencia{' '}
                            <span className="text-[#FF4D00] relative inline-block">
                                Santa Cruz.
                                <svg className="absolute w-full h-3 -bottom-1 left-0 z-[-1] text-amber-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.55)]" viewBox="0 0 200 12" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8,8 C22,5 38,7.5 55,7.5 C130,7.5 165,7.5 188,7.5 C194,7.5 198,6 196,7.5" stroke="currentColor" strokeWidth="7" strokeLinecap="round" /></svg>
                            </span>
                        </h2>
                        <p className="text-[#1F2937] font-medium max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
                            Recorré nuestras sucursales a través de videos exclusivos y sentí el ambiente único de cada espacio.
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
                                            const activeIframe = document.getElementById(`tiktok-scz-${video.id}`);
                                            if (activeIframe && activeIframe.contentWindow) {
                                                activeIframe.contentWindow.postMessage({ "x-tiktok-player": true, "type": "mute" }, '*');
                                            }
                                            setUnmutedVideoId(null);
                                            setModalVideo(video);
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
                                            <div className={`w-full bg-white rounded-[2.5rem] p-[5px] shadow-2xl transition-all duration-300 ${isActive ? 'ring-[3px] ring-[#FF4D00]/50 ring-offset-4 ring-offset-white cursor-pointer hover:ring-[#FF4D00]/70' : 'border-2 border-gray-100 hover:border-[#FF4D00]/40 hover:shadow-[#FF4D00]/20'}`}>
                                                <div className="aspect-[9/16] w-full rounded-[2.2rem] overflow-hidden relative shadow-inner flex items-center justify-center border border-white/10">
                                                    <iframe
                                                        id={`tiktok-scz-${video.id}`}
                                                        src={`https://www.tiktok.com/player/v1/${video.tiktokId}?autoplay=1&mute=${unmutedVideoId === video.id ? 0 : 1}&loop=1&music_info=0&description=0`}
                                                        className="w-full h-full border-0 absolute inset-0 z-20"
                                                        allow="autoplay; encrypted-media; picture-in-picture"
                                                        title={video.title}
                                                        loading="lazy"
                                                        allowFullScreen
                                                    ></iframe>
                                                    <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/20 pointer-events-none z-10"></div>
                                                    <div className="absolute left-4 top-4 z-30 bg-[#FF4D00] text-white px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider shadow-md flex items-center gap-2 border border-white/20">
                                                        <i className="fa-solid fa-play text-[8px]"></i> {video.views}
                                                    </div>
                                                    <div className="absolute right-4 top-4 z-30 w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/20 shadow-sm">
                                                        <i className="fab fa-tiktok text-sm"></i>
                                                    </div>
                                                    <div className="absolute left-4 bottom-4 z-30 right-4 flex items-end justify-between">
                                                        <button
                                                            type="button"
                                                            onClick={(e) => { e.stopPropagation(); setUnmutedVideoId(unmutedVideoId === video.id ? null : video.id); }}
                                                            className="inline-flex items-center gap-2 rounded-full bg-white/25 hover:bg-white/40 active:scale-95 transition-all backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 border border-white/20 cursor-pointer relative z-40 shadow-sm"
                                                        >
                                                            {unmutedVideoId === video.id ? (<><i className="fa-solid fa-volume-high"></i>Con sonido</>) : (<><i className="fa-solid fa-volume-xmark"></i>Sin sonido</>)}
                                                        </button>
                                                        <div className="w-8 h-8 rounded-full bg-[#5D3A1F]/90 text-white flex items-center justify-center border border-white/10 shadow-md">
                                                            <i className="fa-solid fa-bolt text-[11px]"></i>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="mt-4 px-2 pb-1">
                                                    <div className="flex items-center justify-between gap-2 mb-2">
                                                        <span className="inline-flex items-center gap-2 rounded-full bg-[#FF4D00]/10 text-[#FF4D00] px-3 py-1 text-[10px] font-black uppercase tracking-widest border border-[#FF4D00]/20">
                                                            <i className="fa-solid fa-bolt text-[9px]"></i> {video.views}
                                                        </span>
                                                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{video.title}</span>
                                                    </div>
                                                    <p className="text-slate-700 text-xs font-semibold leading-relaxed">{video.desc}</p>
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

            {/* Video Modal - estilo InicioSesionModal */}
            {modalVideo && (
                <div id="videoModalSCZ" className="tyr-modal fixed inset-0 z-[200]" aria-modal="true">
                    <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity duration-300" onClick={() => setModalVideo(null)}></div>
                    <div className="fixed inset-0 z-[201] overflow-y-auto" onClick={(e) => { if (e.target === e.currentTarget) setModalVideo(null); }}>
                        <div className="flex min-h-screen items-center justify-center p-4 text-center sm:p-0" onClick={(e) => { if (e.target === e.currentTarget) setModalVideo(null); }}>
                            <div className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto scrollbar-none transform overflow-hidden rounded-[2.5rem] bg-white text-left shadow-2xl transition-all sm:my-4 animate-modal-pop border border-gray-200">
                                
                                <button onClick={() => setModalVideo(null)} className="absolute top-6 right-6 z-[210] w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-red-50 text-gray-500 hover:text-red-500 transition-all shadow-sm hover:shadow-md border border-gray-200">
                                    <i className="fas fa-times text-xl"></i>
                                </button>

                                <div className="grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
                                    {/* Left: Brand Panel */}
                                    <div className="relative hidden lg:flex flex-col justify-center gap-6 p-6 lg:p-8 overflow-hidden bg-gradient-to-br from-[#FF4D00] to-[#D93D00]">
                                        <div className="absolute inset-0 z-0 pointer-events-none">
                                            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#111827]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                                            <div className="absolute bottom-0 left-0 w-[420px] h-[420px] bg-black/30 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4"></div>
                                            <CircleParticles colorScheme="red" />
                                        </div>
                                        <div className="relative z-10 flex flex-col items-center text-center">
                                            <div className="mb-5 inline-flex items-center justify-center rounded-full bg-white/20 p-2.5 shadow-2xl ring-[0.5px] ring-white backdrop-blur-md">
                                                <img src="/img/02_Logos/LogoModal.png" alt="HAGAMOSTECH" loading="lazy" decoding="async" className="h-40 w-40 rounded-full object-contain bg-white transition-transform duration-500 hover:scale-105 hover:-translate-y-2 hover:rotate-[5deg]" />
                                            </div>
                                            <h2 className="text-3xl font-black font-heading text-white leading-tight mb-2 tracking-tight drop-shadow-lg">
                                                {modalVideo.title}<br />
                                                <span className="text-white relative inline-block">
                                                    Santa Cruz
                                                    <svg className="absolute w-full h-2.5 -bottom-1 left-0 z-[-1] text-amber-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.55)]" viewBox="0 0 200 12" preserveAspectRatio="none" fill="none"><path d="M8,8 C22,5 38,7.5 55,7.5 C130,7.5 165,7.5 188,7.5 C194,7.5 198,6 196,7.5" stroke="currentColor" strokeWidth="7" strokeLinecap="round" /></svg>
                                                </span>
                                            </h2>
                                            <p className="text-sm text-white/90 font-medium max-w-sm leading-relaxed mb-6 drop-shadow-md">{modalVideo.desc}</p>
                                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 border border-white/30 text-white text-[10px] font-black uppercase tracking-widest mb-6 shadow-lg backdrop-blur-sm">
                                                <span className="w-2 h-2 rounded-full bg-white animate-ping"></span> Sucursales HAGAMOSTECH
                                            </div>
                                            <div className="grid grid-cols-2 gap-2 w-full max-w-sm mb-6">
                                                <div className="rounded-xl border border-white/20 bg-black/20 px-3 py-2 text-center backdrop-blur-sm">
                                                    <i className="fas fa-fire text-white/80 text-sm mb-1 block"></i>
                                                    <p className="text-[10px] font-extrabold text-white">{modalVideo.views}</p>
                                                </div>
                                                <div className="rounded-xl border border-white/20 bg-black/20 px-3 py-2 text-center backdrop-blur-sm">
                                                    <i className="fas fa-store-alt text-white/80 text-sm mb-1 block"></i>
                                                    <p className="text-[10px] font-extrabold text-white">HAGAMOSTECH</p>
                                                </div>
                                            </div>
                                            <div className="w-full mt-auto pt-4 flex flex-col items-center">
                                                <p className="text-[9px] font-black text-white/60 uppercase tracking-[0.2em] mb-2">Síguenos</p>
                                                <div className="flex justify-center gap-3">
                                                    {[
                                                        { icon: 'fa-tiktok', link: 'https://www.tiktok.com/@hagamostech' },
                                                        { icon: 'fa-facebook-f', link: 'https://www.facebook.com/HagamosTech' },
                                                        { icon: 'fa-instagram', link: 'https://www.instagram.com/hagamostech/' },
                                                        { icon: 'fa-whatsapp', link: 'https://wa.me/59161320004' },
                                                    ].map((item, i) => (
                                                        <a key={i} href={item.link} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-[#111827] hover:text-[#5D3A1F] transition-all duration-300 shadow-lg hover:-translate-y-1">
                                                            <i className={`fab ${item.icon} text-[13px]`}></i>
                                                        </a>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right: Video Panel */}
                                    <div className="relative flex flex-col items-center justify-center bg-[#FFF6F6] p-8 min-h-[480px] sm:min-h-[540px]">
                                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                                            <div className="absolute -top-10 -right-10 w-64 h-64 bg-[#FF4D00]/10 rounded-full blur-3xl"></div>
                                            <div className="absolute top-1/2 -left-10 w-40 h-40 bg-[#111827]/20 rounded-full blur-2xl"></div>
                                            <div className="absolute bottom-0 right-10 w-56 h-56 bg-[#FF4D00]/10 rounded-full blur-3xl"></div>
                                            <CircleParticles colorScheme="light" />
                                        </div>
                                        <div className="relative z-10 w-[260px] sm:w-[300px] aspect-[9/16] bg-black rounded-[2.5rem] overflow-hidden border-[6px] border-slate-800 shadow-2xl shadow-orange-950/20">
                                            <iframe
                                                id="tiktok-modal-scz-iframe"
                                                src={`https://www.tiktok.com/player/v1/${modalVideo.tiktokId}?autoplay=1&mute=0&loop=1&music_info=0&description=0`}
                                                className="w-full h-full border-0 absolute inset-0 z-20"
                                                allow="autoplay; encrypted-media; picture-in-picture"
                                                title={modalVideo.title}
                                                onLoad={handleIframeLoad}
                                                allowFullScreen
                                            ></iframe>
                                        </div>
                                        <p className="relative z-10 mt-5 text-xs font-black uppercase tracking-widest text-gray-500">
                                            <i className="fab fa-tiktok mr-1.5 text-[#FF4D00]"></i>
                                            {modalVideo.title} <span className="text-[#FF4D00]">- HAGAMOSTECH</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VideosSucursalesSCZ;
