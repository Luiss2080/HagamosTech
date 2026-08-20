import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import CircleParticles from '../../components/fondos/ParticulasCirculares'; // Note the relative path

const ModalSucursal = ({ sucursal, onClose }) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        if (sucursal) {
            document.body.style.overflow = 'hidden';
        }
        return () => { document.body.style.overflow = 'unset'; }
    }, [sucursal]);

    if (!sucursal || !mounted) return null;

    // Derived properties from sucursal
    const { name, address, phone, schedule, services, mapLink, img, city, regionBadge } = sucursal;

    return createPortal(
        <div className="tyr-modal fixed inset-0 z-[99999]" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-gray-900/70 backdrop-blur-md transition-opacity duration-300" onClick={onClose}></div>
            
            <div 
                className="fixed inset-0 z-[100000] overflow-y-auto"
                onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
            >
                <div 
                    className="flex min-h-screen items-center justify-center p-2 sm:p-4 text-center"
                    onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
                >
                    <div className="relative w-full max-w-5xl transform overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] bg-white text-left shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all sm:my-8 animate-modal-pop border border-orange-100">
                        
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-[200] w-10 h-10 flex items-center justify-center rounded-full bg-white hover:bg-orange-50 text-gray-800 hover:text-[#FF4D00] transition-all focus:outline-none cursor-pointer shadow-lg hover:shadow-xl hover:scale-110 border border-gray-100"
                        >
                            <i className="fas fa-times text-xl"></i>
                        </button>
                        
                        <div className="flex flex-col lg:flex-row h-[90vh] max-h-[750px] w-full">
                            
                            {/* LEFT PANEL - ORANGE THEME (Like InicioSesionModal) */}
                            <div className="relative w-full lg:w-[45%] flex flex-col items-center justify-center p-6 lg:p-10 overflow-hidden bg-gradient-to-b from-[#FF4D00] via-[#E64500] to-[#CC3D00] shrink-0 rounded-t-[2rem] sm:rounded-t-[2.5rem] lg:rounded-tr-none lg:rounded-l-[2.5rem]">
                                    {/* Decoraciones de Fondo */}
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/20 rounded-full blur-2xl translate-y-1/3 -translate-x-1/4"></div>
                                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNykiLz48L3N2Zz4=')] opacity-30"></div>
                                    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-l-[2rem] sm:rounded-l-[2.5rem]">
                                        <CircleParticles colorScheme="light" />
                                    </div>

                                <div className="relative z-10 flex flex-col items-center text-center h-max w-full mx-auto mt-6">
                                    
                                    {/* Logo / Mascot (Assuming LogoModal.png) */}
                                    <div className="mb-4 inline-flex items-center justify-center rounded-full bg-white/10 p-2 shadow-2xl ring-1 ring-white/20 backdrop-blur-md">
                                        <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-full border-[4px] border-white/20 p-2.5 bg-white shadow-xl flex items-center justify-center relative">
                                            <div className="absolute inset-0 rounded-full border border-orange-500/10 scale-105"></div>
                                            <div className="w-full h-full rounded-full bg-white flex items-center justify-center p-2">
                                                <img src="/img/02_Logos/LogoModal.png" alt="HagamosTech" className="max-w-full max-h-full object-contain drop-shadow-md" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Titles */}
                                    <div className="mb-2">
                                        <span className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-white/20 text-white text-[10px] font-black uppercase tracking-widest shadow-sm mb-3">
                                            SUCURSAL {regionBadge}
                                        </span>
                                        <h2 className="text-3xl lg:text-4xl font-black text-white leading-tight mb-2 tracking-tight drop-shadow-lg break-words">
                                            {name.split(' ').map((word, i, arr) => (
                                                i === arr.length - 1 ? (
                                                    <span key={i} className="text-[#FFE8D6] relative inline-block mx-1">
                                                        {word}
                                                        <svg className="absolute w-full h-2 -bottom-1 left-0 z-[-1] text-amber-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.55)]" viewBox="0 0 200 12" preserveAspectRatio="none" fill="none"><path d="M8,8 C22,5 38,7.5 55,7.5 C130,7.5 165,7.5 188,7.5 C194,7.5 198,6 196,7.5" stroke="currentColor" strokeWidth="7" strokeLinecap="round"  /></svg>
                                                    </span>
                                                ) : <span key={i} className="mx-1">{word}</span>
                                            ))}
                                        </h2>
                                    </div>
                                    
                                    <p className="text-[13px] text-white/90 font-medium leading-relaxed mb-6 drop-shadow-md max-w-[280px]">
                                        Visítanos en nuestra sucursal de {city} y disfruta de las mejores salteñas tradicionales.
                                    </p>

                                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 border border-white/30 text-white text-[10px] font-black uppercase tracking-widest mb-6 shadow-lg backdrop-blur-sm mt-2">
                                        <span className="w-2 h-2 rounded-full bg-white animate-ping"></span> Pedidos HAGAMOSTECH
                                    </div>

                                    {/* Services Grid (4 boxes like Login) */}
                                    <div className="grid grid-cols-2 gap-2 w-full max-w-sm mb-6">
                                        <div className="rounded-xl border border-white/20 bg-black/20 px-3 py-2 text-left backdrop-blur-sm">
                                            <p className="text-[9px] font-black uppercase tracking-widest text-[#FFF5EC]"><i className="fas fa-utensils mr-1"></i> Menú</p>
                                            <p className="text-xs font-bold text-white">Salteñas</p>
                                        </div>
                                        <div className="rounded-xl border border-white/20 bg-black/20 px-3 py-2 text-left backdrop-blur-sm">
                                            <p className="text-[9px] font-black uppercase tracking-widest text-[#FFF5EC]"><i className="fas fa-cake-candles mr-1"></i> Postres</p>
                                            <p className="text-xs font-bold text-white">Caseros y Helados</p>
                                        </div>
                                        <div className="rounded-xl border border-white/20 bg-black/20 px-3 py-2 text-left backdrop-blur-sm">
                                            <p className="text-[9px] font-black uppercase tracking-widest text-[#FFF5EC]"><i className="fas fa-mug-hot mr-1"></i> Bebidas</p>
                                            <p className="text-xs font-bold text-white">Gaseosas y Jugos</p>
                                        </div>
                                        <div className="rounded-xl border border-white/20 bg-black/20 px-3 py-2 text-left backdrop-blur-sm">
                                            <p className="text-[9px] font-black uppercase tracking-widest text-[#FFF5EC]"><i className="fas fa-martini-glass-citrus mr-1"></i> Refrescos</p>
                                            <p className="text-xs font-bold text-white">Naturales y Cafés</p>
                                        </div>
                                    </div>
                                    
                                    {/* Social Connect */}
                                    <div className="w-full mt-auto pt-4 pb-2">
                                        <p className="text-[9px] font-black text-white/70 uppercase tracking-[0.2em] mb-3">CONECTA CON NOSOTROS</p>
                                        <div className="flex justify-center gap-3">
                                            <a href="https://www.facebook.com/LosHagamosTechSC" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-[#FF4D00] transition-all shadow-lg hover:-translate-y-1"><i className="fab fa-facebook-f text-sm"></i></a>
                                            <a href="https://www.instagram.com/hagamostech/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-[#FF4D00] transition-all shadow-lg hover:-translate-y-1"><i className="fab fa-instagram text-sm"></i></a>
                                            <a href="https://www.tiktok.com/@hagamostech" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-[#FF4D00] transition-all shadow-lg hover:-translate-y-1"><i className="fab fa-tiktok text-sm"></i></a>
                                            <a href="https://wa.me/59161320004" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-[#FF4D00] transition-all shadow-lg hover:-translate-y-1"><i className="fab fa-whatsapp text-sm"></i></a>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            {/* RIGHT PANEL - LIGHT THEME */}
                            <div className="relative w-full lg:w-[55%] flex flex-col justify-start h-full bg-[#FFF6F6] p-5 lg:p-6 overflow-y-auto scrollbar-thin scrollbar-thumb-orange-300 scrollbar-track-transparent rounded-b-[2rem] sm:rounded-b-[2.5rem] lg:rounded-bl-none lg:rounded-r-[2.5rem]">
                                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                                    <div className="absolute -top-10 -right-10 w-64 h-64 bg-[#FF4D00]/10 rounded-full blur-3xl"></div>
                                    <div className="absolute top-1/2 -left-10 w-40 h-40 bg-[#111827]/20 rounded-full blur-2xl"></div>
                                    <div className="absolute bottom-0 right-10 w-56 h-56 bg-[#FF4D00]/10 rounded-full blur-3xl"></div>
                                    <CircleParticles colorScheme="light" />
                                </div>
                                
                                <div className="relative z-10 w-full max-w-[540px] mx-auto py-4">
                                    {/* 1. Galería y Ubicación */}
                                    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm mb-3.5">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-[#FF4D00]">
                                                <i className="fas fa-image text-lg"></i>
                                            </div>
                                            <h3 className="text-[15px] font-black uppercase tracking-widest text-[#111827]">Ubicación y Galería</h3>
                                        </div>
                                        
                                        <div className="w-full h-40 sm:h-48 rounded-xl overflow-hidden shadow-sm border border-gray-100 relative group bg-gray-100 mb-3">
                                            <img src={img} alt={name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" onError={(e) => e.target.src = '/img/10_sucursales/SantaCruz/01_Sucursal.png'} />
                                            <div className="absolute top-2 left-2 bg-white/95 backdrop-blur-sm px-2 py-1 rounded-md flex items-center gap-1.5 shadow-sm border border-gray-100">
                                                <i className="fas fa-camera text-[#FF4D00] text-[9px]"></i>
                                                <span className="text-[9px] font-bold text-gray-800 uppercase tracking-wide">Galería Oficial</span>
                                            </div>
                                            <div className="absolute bottom-0 left-0 bg-[#FFF5EC] px-4 py-2 rounded-tr-xl shadow-[2px_-2px_10px_rgba(0,0,0,0.1)] flex items-center gap-2">
                                                <i className="fas fa-leaf text-[#5D3A1F] text-sm"></i>
                                                <div className="flex flex-col">
                                                    <span className="text-[14px] font-black text-[#5D3A1F] leading-none">Top</span>
                                                    <span className="text-[7px] font-bold text-[#FF4D00] uppercase tracking-widest leading-none">Calidad</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* 2. Small Cards Grid (Horario, Contacto, Estado) */}
                                    <div className="mb-3.5 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                                        <div className="rounded-xl bg-white border border-gray-100 px-3 py-3 text-center shadow-sm">
                                            <div className="w-8 h-8 mx-auto mb-1.5 rounded-lg bg-red-50 border border-red-100 text-[#FF4D00] flex items-center justify-center">
                                                <i className="fas fa-clock text-xs"></i>
                                            </div>
                                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-0.5">Horario</p>
                                            <p className="text-sm font-extrabold text-[#111827] truncate" title={schedule}>{schedule.split(' ')[0] || schedule}</p>
                                        </div>
                                        <div className="rounded-xl bg-white border border-gray-100 px-3 py-3 text-center shadow-sm">
                                            <div className="w-8 h-8 mx-auto mb-1.5 rounded-lg bg-red-50 border border-red-100 text-[#FF4D00] flex items-center justify-center">
                                                <i className="fas fa-phone text-xs"></i>
                                            </div>
                                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-0.5">Contacto</p>
                                            <p className="text-sm font-extrabold text-[#111827] truncate" title={phone}>{phone}</p>
                                        </div>
                                        <div className="rounded-xl bg-white border border-gray-100 px-3 py-3 text-center shadow-sm">
                                            <div className="w-8 h-8 mx-auto mb-1.5 rounded-lg bg-green-50 border border-green-100 text-green-500 flex items-center justify-center">
                                                <i className="fas fa-door-open text-xs"></i>
                                            </div>
                                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-0.5">Estado</p>
                                            <p className="text-sm font-extrabold text-[#111827]">Abierto Hoy</p>
                                        </div>
                                    </div>

                                    {/* 3. Sobre la Sucursal */}
                                    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm mb-3.5">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-[#FF4D00]">
                                                <i className="fas fa-info-circle text-lg"></i>
                                            </div>
                                            <h3 className="text-[15px] font-black uppercase tracking-widest text-[#111827]">Sobre la Sucursal</h3>
                                        </div>
                                        <p className="text-[13px] text-gray-500 font-medium leading-relaxed">
                                            Visítanos en nuestra sucursal de <strong className="text-[#FF4D00]">{name}</strong> y disfruta del verdadero sabor tradicional. Horneamos nuestras salteñas diariamente con los mejores ingredientes para alegrar tus mañanas.
                                        </p>
                                    </div>

                                    {/* 4. Servicios Disponibles */}
                                    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm mb-3.5">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-[#FF4D00]">
                                                <i className="fas fa-concierge-bell text-lg"></i>
                                            </div>
                                            <h3 className="text-[15px] font-black uppercase tracking-widest text-[#111827]">Servicios Disponibles</h3>
                                        </div>
                                        <p className="text-[13px] text-gray-500 font-medium leading-relaxed">
                                            En esta sucursal te ofrecemos: <strong className="text-gray-700">{services.join(', ')}</strong>. Todo preparado con la mejor calidad de HagamosTech.
                                        </p>
                                    </div>

                                    {/* Google Maps Action Button */}
                                    <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                                        <a 
                                            href={mapLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full py-3.5 px-6 bg-[#8B4513] text-white font-black text-xs sm:text-sm uppercase tracking-widest rounded-xl shadow-lg shadow-[#8B4513]/20 hover:shadow-[#8B4513]/40 hover:-translate-y-0.5 hover:bg-[#5D3A1F] transition-all duration-300 flex items-center justify-center gap-3 group relative overflow-hidden"
                                        >
                                            <span className="relative z-10">Cómo llegar en Google Maps</span>
                                            <div className="w-6 h-6 bg-white/10 rounded-full flex items-center justify-center group-hover:translate-x-1 transition-all duration-300 relative z-10">
                                                <i className="fas fa-location-arrow text-white text-xs"></i>
                                            </div>
                                        </a>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default ModalSucursal;
