import React from 'react';
import CircleParticles from '../fondos/ParticulasCirculares';

const VideoPlayerModal = ({ isOpen, onClose, video }) => {
    if (!isOpen || !video) return null;

    const handleIframeLoad = () => {
        const iframe = document.getElementById("tiktok-modal-iframe");
        if (iframe && iframe.contentWindow) {
            iframe.contentWindow.postMessage({
                "x-tiktok-player": true,
                "type": "unMute"
            }, '*');
        }
    };

    return (
        <div id="videoModal" className="tyr-modal fixed inset-0 z-[110]" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-md transition-opacity duration-300 animate-fade-in" onClick={onClose}></div>
            
            <div 
                className="fixed inset-0 z-[111] overflow-y-auto"
                onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
            >
                <div 
                    className="flex min-h-screen items-center justify-center p-4 text-center sm:p-0"
                    onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
                >
                    <div className="relative w-full max-w-5xl transform overflow-hidden rounded-[2.5rem] bg-white text-left shadow-2xl transition-all sm:my-8 animate-modal-pop border border-gray-200">
                        
                        <button
                            onClick={onClose}
                            className="absolute top-5 right-5 z-[200] w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-red-50 dark:hover:bg-red-950/30 text-gray-500 hover:text-red-500 transition-all focus:outline-none cursor-pointer shadow-sm hover:shadow-md border border-gray-200"
                        >
                            <i className="fas fa-times text-lg"></i>
                        </button>

                        <div className="grid grid-cols-1 md:grid-cols-2 overflow-hidden">
                            
                            {/* Left Column: Red Brand Panel */}
                            <div className="relative hidden md:flex flex-col justify-center p-8 overflow-hidden bg-[#a41e22]">
                                <div className="absolute inset-0 z-0 pointer-events-none">
                                    <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-[#111827]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-black/30 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4"></div>
                                    <CircleParticles colorScheme="red" />
                                </div>

                                <div className="relative z-10 flex flex-col items-center text-center">
                                    <div className="mb-5 inline-flex items-center justify-center rounded-full bg-white/20 p-2.5 shadow-2xl ring-[0.5px] ring-white backdrop-blur-md">
                                        <img
                                            src="/img/02_Icons/04_avatar-whatsapp.png"
                                            alt="HAGAMOSTECH"
                                            loading="lazy"
                                            decoding="async"
                                            className="h-28 w-28 rounded-full object-contain bg-white"
                                        />
                                    </div>

                                    <h2 className="text-3xl font-black text-white leading-tight mb-2 tracking-tight drop-shadow-lg">
                                        Muestra en <span className="text-[#c5a059]">Video</span>
                                    </h2>
                                    
                                    <p className="text-sm text-white/80 font-medium max-w-sm leading-relaxed mb-5">
                                        {video.desc || "Descubre nuestras demostraciones de robÃ³tica, programaciÃ³n y soluciones de software explicadas de forma dinÃ¡mica y visual."}
                                    </p>

                                    <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#111827] border border-[#c5a059]/30 text-[#c5a059] text-xs font-black uppercase tracking-widest mb-5 shadow-lg">
                                        <span className="w-2 h-2 rounded-full bg-[#c5a059] animate-ping"></span> Contenido Exclusivo
                                    </div>

                                    <div className="grid grid-cols-2 gap-2.5 w-full max-w-sm mb-5">
                                        <div className="rounded-xl border border-[#c5a059]/30 bg-[#111827]/40 px-3 py-2 text-left backdrop-blur-sm">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-[#c5a059]">Robotica</p>
                                            <p className="text-sm font-bold text-white">Cursos y Kits</p>
                                        </div>
                                        <div className="rounded-xl border border-[#c5a059]/30 bg-[#111827]/40 px-3 py-2 text-left backdrop-blur-sm">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-[#c5a059]">Software</p>
                                            <p className="text-sm font-bold text-white">Web a Medida</p>
                                        </div>
                                    </div>

                                    <div className="w-full max-w-xs">
                                        <p className="text-[10px] font-bold text-white/80 uppercase tracking-widest mb-2.5">Seguinos en redes</p>
                                        <div className="grid grid-cols-2 gap-2">
                                            {[
                                                { label: 'TikTok', icon: 'fa-tiktok', link: 'https://www.tiktok.com/@hagamostech' },
                                                { label: 'Facebook', icon: 'fa-facebook-f', link: 'https://www.facebook.com/LOSHAGAMOSTECH?locale=es_LA' },
                                                { label: 'Instagram', icon: 'fa-instagram', link: 'https://www.instagram.com/hagamostech/' },
                                                { label: 'WhatsApp', icon: 'fa-whatsapp', link: 'https://wa.me/59161320004' },
                                            ].map((item) => (
                                                <a
                                                    key={item.label}
                                                    href={item.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="group cursor-pointer flex items-center justify-center gap-2 rounded-lg border border-[#c5a059]/20 bg-[#111827]/30 px-2.5 py-2.5 hover:bg-[#c5a059] transition-all duration-300 hover:border-[#c5a059] hover:shadow-lg hover:-translate-y-0.5"
                                                >
                                                    <div className="w-6 h-6 rounded bg-white/10 flex items-center justify-center transition-colors group-hover:bg-[#111827]">
                                                        <i className={`fab ${item.icon} text-white group-hover:text-[#c5a059] text-xs transition-colors`}></i>
                                                    </div>
                                                    <span className="font-bold text-white text-xs group-hover:text-[#111827] transition-colors">{item.label}</span>
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column: Video Player Panel */}
                            <div className="relative flex flex-col items-center justify-center bg-[#FFF6F6] p-8 min-h-[480px] sm:min-h-[540px]">
                                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                                    <div className="absolute -top-10 -right-10 w-56 h-56 bg-[#a41e22]/10 rounded-full blur-2xl"></div>
                                    <div className="absolute bottom-0 right-10 w-48 h-48 bg-[#a41e22]/10 rounded-full blur-2xl"></div>
                                    <CircleParticles colorScheme="light" />
                                </div>

                                {/* Smartphone Container */}
                                <div className="relative z-10 w-[260px] sm:w-[300px] aspect-[9/16] bg-black rounded-[2rem] overflow-hidden border-4 border-slate-950 shadow-2xl">
                                    <iframe
                                        id="tiktok-modal-iframe"
                                        src={`https://www.tiktok.com/player/v1/${video.tiktokId}?autoplay=1&mute=0&loop=1&music_info=0&description=0`}
                                        className="w-full h-full border-0 absolute inset-0 z-20"
                                        allow="autoplay; encrypted-media; picture-in-picture"
                                        title={video.title}
                                        onLoad={handleIframeLoad}
                                        allowFullScreen
                                    ></iframe>
                                </div>

                                {/* Video Title */}
                                <p className="relative z-10 mt-4 text-xs font-black uppercase tracking-widest text-gray-500">
                                    {video.title} <span className="text-[#a41e22]">- HAGAMOSTECH</span>
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoPlayerModal;
