import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useModalStore from '../../../store/useModalStore';
import CircuitBackground from '../../../components/fondos/FondoSaltenas';

const initialVideos = [
  {
    id: 1,
    tiktokId: '7659877880071015701',
    title: 'Nuestras Salteñas',
    views: 'Nuevo',
    desc: 'Disfruta de las mejores salteñas en Santa Cruz.',
  },
  {
    id: 2,
    tiktokId: '7657645476270853396',
    title: 'Sabor Tradicional',
    views: 'Popular',
    desc: 'Horneadas diariamente para alegrar tus mañanas.',
  },
  {
    id: 3,
    tiktokId: '7658450020575759637',
    title: 'Atención de Primera',
    views: 'Tendencia',
    desc: 'Ven y prueba nuestro menú completo de salteñas y jugos.',
  },
  {
    id: 4,
    tiktokId: '7657244089661951252',
    title: 'Calidad y Sabor',
    views: 'Nuevo',
    desc: 'HagamosTech te ofrece el verdadero sabor de Bolivia.',
  },
  {
    id: 5,
    tiktokId: '7657627736713809172',
    title: 'Visitantes Felices',
    views: 'Destacado',
    desc: 'Miles de clientes avalan nuestro producto y servicio.',
  },
];

const HeroSaltenas = () => {
    const navigate = useNavigate();
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

    const cardWidth = isMobile ? 170 : (isTablet ? 240 : 270);
    const cardMarginLeft = -cardWidth / 2;
    const xSpacing = isMobile ? 22 : (isTablet ? 75 : 120);
    const ySpacing = isMobile ? 6 : (isTablet ? 12 : 16);

    // Mute all other iframes and unmute the center one
    const handleVideoSelection = (newOrder, newCenterId) => {
        setOrderedVideos(newOrder);
        setLastSelectedId(newCenterId);

        // Send postMessage signals to control sound in embedded iframes
        newOrder.forEach((video) => {
            const iframe = document.getElementById(`tiktok-iframe-${video.id}`);
            if (iframe && iframe.contentWindow) {
                if (video.id === newCenterId) {
                    // Unmute the new center video
                    iframe.contentWindow.postMessage({
                        "x-tiktok-player": true,
                        "type": "unMute"
                    }, '*');
                    setUnmutedVideoId(newCenterId);
                } else {
                    // Mute all other videos
                    iframe.contentWindow.postMessage({
                        "x-tiktok-player": true,
                        "type": "mute"
                    }, '*');
                }
            }
        });
    };

    const toggleSoundButton = (e, videoId) => {
        e.stopPropagation();
        const iframe = document.getElementById(`tiktok-iframe-${videoId}`);
        if (iframe && iframe.contentWindow) {
            const isMuted = unmutedVideoId !== videoId;
            if (isMuted) {
                iframe.contentWindow.postMessage({
                    "x-tiktok-player": true,
                    "type": "unMute"
                }, '*');
                setUnmutedVideoId(videoId);
            } else {
                iframe.contentWindow.postMessage({
                    "x-tiktok-player": true,
                    "type": "mute"
                }, '*');
                setUnmutedVideoId(null);
            }
        }
    };

    return (
        <section 
            className="relative overflow-hidden pt-28 sm:pt-32 pb-8 bg-[#fafafa] border-b border-gray-100" 
            id="home"
        >
            {/* native circuit background particles */}
            <CircuitBackground />

            {/* self-contained Y-axis spin keyframes */}
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

            {/* Container taking full screen width potential */}
            <div className="container mx-auto px-6 lg:px-12 xl:px-16 relative z-10 max-w-[1440px] w-full">
                
                {/* stretch columns to occupy the same vertical height */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
                    
                    {/* Left Column - Centered vertically within full height */}
                    <div className="lg:col-span-5 flex flex-col gap-6 text-center lg:text-left items-center lg:items-start justify-center animate-fade-in-up">

                        {/* Title - Casing as requested */}
                        <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-5xl xl:text-6xl font-black font-heading text-[#8B4513] leading-[1.15] tracking-tight">
                            <span className="block font-black">Las mejores</span>
                            <span className="block font-black">salteñas que tu</span>
                            <span className="relative inline-block text-[#FF4D00] font-black">
                                paladar necesita
                                <svg 
                                    className="absolute w-full h-3 -bottom-1.5 left-0 z-[-1] text-amber-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.55)]" 
                                    viewBox="0 0 200 12" preserveAspectRatio="none" 
                                    fill="none" 
                                    xmlns="http://www.w3.org/2000/svg"
                                ><path d="M8,8 C22,5 38,7.5 55,7.5 C130,7.5 165,7.5 188,7.5 C194,7.5 198,6 196,7.5" 
                                        stroke="currentColor" 
                                        strokeWidth="7" 
                                        strokeLinecap="round" 
                                        
                                    />
                                </svg>
                            </span>
                        </h1>

                        {/* Description */}
                        <p className="text-[#1F2937] font-medium max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
                            <strong className="text-[#8B4513]">HagamosTech</strong> te ofrece el verdadero sabor tradicional, horneado diariamente con los mejores ingredientes para alegrar tus mañanas.
                        </p>

                        {/* Centered CTAs */}
                        <div className="flex flex-col sm:flex-row gap-4 mt-2 w-full sm:w-auto items-center justify-center lg:justify-start">
                            <button
                                onClick={() => navigate('/menu/saltenas')}
                                className="group flex items-center justify-center gap-3 w-full sm:w-[250px] h-12 px-6 bg-[#5D3A1F] hover:bg-[#452A16] text-white rounded-full shadow-lg shadow-[#5D3A1F]/20 hover:shadow-[#5D3A1F]/35 hover:-translate-y-0.5 transition-all duration-300 text-[11px] font-black uppercase tracking-[0.14em] cursor-pointer whitespace-nowrap"
                            >
                                <i className="fas fa-utensils text-[14px] flex-shrink-0"></i>
                                <span>Ver Nuestro Menú</span>
                            </button>

                            <button
                                onClick={() => navigate('/contacto')}
                                className="group flex items-center justify-center gap-3 w-full sm:w-[190px] h-12 px-6 bg-[#FF4D00] hover:bg-[#CC3D00] text-white font-black text-[11px] uppercase tracking-[0.14em] rounded-full shadow-lg shadow-orange-500/20 hover:shadow-orange-500/35 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer whitespace-nowrap"
                            >
                                <i className="fas fa-motorcycle text-[13px] flex-shrink-0"></i>
                                <span>Pedir Delivery</span>
                            </button>
                        </div>

                        {/* Social Proof */}
                        <div className="flex items-center gap-3 pt-2 opacity-85">
                            <div className="flex -space-x-1.5">
                                <div className="w-5.5 h-5.5 rounded-full bg-white flex items-center justify-center text-[9px] text-[#5D3A1F] border border-gray-100 shadow-sm">
                                    <i className="fas fa-star"></i>
                                </div>
                                <div className="w-5.5 h-5.5 rounded-full bg-white flex items-center justify-center text-[9px] text-orange-400 border border-gray-100 shadow-sm">
                                    <i className="fas fa-heart"></i>
                                </div>
                                <div className="w-5.5 h-5.5 rounded-full bg-white flex items-center justify-center text-[9px] text-orange-500 border border-gray-100 shadow-sm">
                                    <i className="fas fa-check"></i>
                                </div>
                            </div>
                            <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest leading-none">
                                Miles de clientes disfrutan el sabor de HagamosTech
                            </span>
                        </div>
                    </div>

                    {/* Right Column - Vertically centered group deck */}
                    <div className="lg:col-span-7 relative min-h-[420px] sm:min-h-[480px] md:min-h-[500px] flex items-center justify-center group/deck px-2 [perspective:1200px] [transform-style:preserve-3d] z-10 mt-8 lg:mt-0">
                        {orderedVideos.map((video, index) => {
                            const center = 2;
                            const offset = index - center;
                            const rotateDeg = offset * (isMobile ? 2.5 : 4.5);
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
                                            // Clicked active card again -> Open global Video Modal
                                            // Ensure this iframe gets muted before opening the modal
                                            const activeIframe = document.getElementById(`tiktok-iframe-${video.id}`);
                                            if (activeIframe && activeIframe.contentWindow) {
                                                activeIframe.contentWindow.postMessage({
                                                    "x-tiktok-player": true,
                                                    "type": "mute"
                                                }, '*');
                                            }
                                            setUnmutedVideoId(null);
                                            openModal('videoModal', video);
                                        }
                                    }}
                                    className="absolute outline-none cursor-pointer select-none"
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
                                        {/* Spin container inside absolute wrapper */}
                                        <div className={isActive && lastSelectedId === video.id ? 'animate-spin-lr' : ''} style={{ transformStyle: 'preserve-3d' }}>
                                            <div className={`w-full bg-white rounded-[2.5rem] p-3 shadow-2xl transition-all duration-300 ${
                                                isActive 
                                                    ? 'border-2 border-[#FF4D00] shadow-[0_0_25px_rgba(164,30,34,0.35)]' 
                                                    : 'border border-slate-100 hover:border-[#FF4D00]/40'
                                            }`}>
                                                
                                                {/* Aspect Ratio 9/16 Card Content */}
                                                <div className="aspect-[9/16] w-full rounded-[2rem] overflow-hidden relative shadow-inner flex items-center justify-center border border-white/5 bg-slate-900">
                                                    
                                                    {/* Iframe player with DOM ID */}
                                                    <iframe
                                                        id={`tiktok-iframe-${video.id}`}
                                                        src={`https://www.tiktok.com/player/v1/${video.tiktokId}?autoplay=1&mute=1&loop=1&music_info=0&description=0`}
                                                        className="w-full h-full border-0 absolute inset-0 z-20"
                                                        allow="autoplay; encrypted-media; picture-in-picture"
                                                        title={video.title}
                                                        loading="lazy"
                                                        allowFullScreen
                                                    ></iframe>
                                                    
                                                    <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/20 pointer-events-none z-10"></div>
                                                    
                                                    {/* Views/Category Badge */}
                                                    <div className="absolute left-4 top-4 z-30 bg-[#FF4D00] text-white px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider shadow-md flex items-center gap-1.5">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                                                        <span>{video.views}</span>
                                                    </div>
                                                    
                                                    {/* Watermark logo */}
                                                    <div className="absolute right-4 top-4 z-30 w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/10 shadow-sm">
                                                        <i className="fab fa-tiktok text-sm"></i>
                                                    </div>
                                                    
                                                    {/* Bottom controls */}
                                                    <div className="absolute left-4 bottom-4 z-30 right-4 flex items-end justify-between">
                                                        <button
                                                            type="button"
                                                            onClick={(e) => toggleSoundButton(e, video.id)}
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
                                                        <div className="w-8 h-8 rounded-full bg-slate-900/80 text-[#5D3A1F] flex items-center justify-center border border-white/10 shadow-md">
                                                            <i className="fa-solid fa-bolt text-[11px]"></i>
                                                        </div>
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    
                </div>
            </div>
        </section>
    );
};

export default HeroSaltenas;
