import React, { useState } from 'react';
import CircuitBackground from '../../../../components/fondos/FondoSaltenas';
import CircleParticles from '../../../../components/fondos/ParticulasCirculares';

const SUCURSALES_MAPS = [
  { id: 'scz-1', name: 'Equipetrol', fullName: 'Los Castores Equipetrol', address: 'Av. Cristóbal de Mendoza, esquina', phone: '3 3430197', schedule: 'Lun a Sáb · Hasta la 1:30 p.m.', services: 'Consumo en el lugar · Para llevar · Delivery', coords: '-17.7740,-63.1820', mapLink: 'https://maps.app.goo.gl/L6pWgHan11aPfE4p7' },
  { id: 'scz-2', name: '2do Anillo', fullName: 'Los Castores 2do Anillo', address: '6R59+5W7', phone: '3 3391432', schedule: 'Lun a Sáb · Hasta la 1:30 p.m.', services: 'Consumo en el lugar · Para llevar · Delivery', coords: '-17.7830,-63.1705', mapLink: 'https://maps.app.goo.gl/GYF5RyA9vtDnDJ9WA' },
  { id: 'scz-3', name: 'Av. Piraí', fullName: 'Salteñas Los Castores Av. Piraí', address: 'Av. Piraí 344', phone: '3 3552038', schedule: 'Lun a Sáb · 7:45 a.m. – 1:00 p.m.', services: 'Consumo en el lugar · Para llevar · Delivery', coords: '-17.7890,-63.1600', mapLink: 'https://maps.app.goo.gl/vyDVunvkBmjqjKbf7' },
  { id: 'scz-4', name: 'Café Beni', fullName: 'Los Castores Café Beni', address: 'Av. Beni 2160', phone: '+591 61320004', schedule: 'Lun a Sáb · 7:00 a.m. – 2:00 p.m.', services: 'Consumo en el lugar · Cafetería Especial', coords: '-17.7680,-63.1750', mapLink: 'https://maps.app.goo.gl/wwNLzMyyizWoJXBGA' }
];

const MapsSucursalesSCZ = () => {
    const [selected, setSelected] = useState(SUCURSALES_MAPS[0]);
    const activeIdx = SUCURSALES_MAPS.findIndex(s => s.id === selected.id);

    return (
        <section className="relative z-10 py-4">
            <CircuitBackground />
            <div className="w-full px-4 sm:px-8 md:px-16 relative z-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 items-center">
                    <div className="order-2 lg:order-1 lg:col-span-5 flex flex-col justify-center items-center h-full text-center">
                        <div className="mb-6">
                            <span className="inline-block py-1.5 px-4 rounded-full bg-[#FF4D00]/10 text-[#FF4D00] text-[10px] font-black tracking-widest uppercase mb-4 border border-[#FF4D00]/20">
                                <i className="fas fa-map-marked-alt text-[#FF4D00] mr-1"></i> Ubicación Interactiva
                            </span>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading text-[#8B4513] mb-4 leading-tight">
                                Encontranos en{' '}
                                <span className="relative inline-block px-2 text-[#FF4D00]">
                                    el mapa.
                                    <svg className="absolute w-full h-3 -bottom-1.5 left-0 z-[-1] text-amber-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.55)]" viewBox="0 0 200 12" preserveAspectRatio="none" fill="none"><path d="M8,8 C22,5 38,7.5 55,7.5 C130,7.5 165,7.5 188,7.5 C194,7.5 198,6 196,7.5" stroke="currentColor" strokeWidth="7" strokeLinecap="round" /></svg>
                                </span>
                            </h2>
                            <p className="text-[#1F2937] font-medium max-w-lg text-base sm:text-lg leading-relaxed">
                                Elegí la sucursal que te quede más cerca y trazá tu ruta al instante con Google Maps.
                            </p>
                        </div>

                        <div className="flex flex-wrap justify-center gap-2 mb-6">
                            {SUCURSALES_MAPS.map((s, i) => (
                                <button
                                    key={s.id}
                                    onClick={() => setSelected(s)}
                                    className={`px-4 py-2.5 rounded-full text-[10px] font-black uppercase tracking-wider transition-all duration-300 ${selected.id === s.id ? 'bg-[#FF4D00] text-white shadow-lg shadow-orange-500/30 scale-105' : 'bg-white text-slate-600 border border-slate-200 hover:border-[#FF4D00]/40 hover:text-[#FF4D00]'}`}
                                >
                                    <i className="fas fa-store mr-1.5"></i>
                                    SCZ 0{i + 1}
                                </button>
                            ))}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
                            <div className="relative p-4 rounded-3xl bg-[#FF4D00] text-white border-2 border-[#FF4D00] shadow-lg shadow-orange-500/20 hover:scale-105 transition-all duration-300 group overflow-hidden flex flex-col items-center justify-center text-center">
                                <CircleParticles count={10} colorScheme="dark" />
                                <div className="relative z-10 w-full flex flex-col items-center">
                                    <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/20 text-white shadow-sm mb-2.5 text-xl group-hover:rotate-6 transition-transform duration-300">
                                        <i className="fas fa-map-pin"></i>
                                    </div>
                                    <h4 className="font-black uppercase tracking-[0.2em] text-[8px] mb-1 opacity-90">Dirección</h4>
                                    <p className="text-xs font-black leading-tight tracking-wide">{selected.address}</p>
                                </div>
                            </div>
                            <div className="relative p-4 rounded-3xl bg-[#5D3A1F] text-white border-2 border-[#5D3A1F] shadow-lg shadow-[#5D3A1F]/20 hover:scale-105 transition-all duration-300 group overflow-hidden flex flex-col items-center justify-center text-center">
                                <CircleParticles count={10} colorScheme="dark" />
                                <div className="relative z-10 w-full flex flex-col items-center">
                                    <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/20 text-white shadow-sm mb-2.5 text-xl group-hover:rotate-6 transition-transform duration-300">
                                        <i className="fas fa-clock"></i>
                                    </div>
                                    <h4 className="font-black uppercase tracking-[0.2em] text-[8px] mb-1 opacity-90">Horario</h4>
                                    <p className="text-xs font-black leading-tight tracking-wide">{selected.schedule}</p>
                                </div>
                            </div>
                            <div className="relative p-4 rounded-3xl bg-[#FF4D00] text-white border-2 border-[#FF4D00] shadow-lg shadow-orange-500/20 hover:scale-105 transition-all duration-300 group overflow-hidden flex flex-col items-center justify-center text-center">
                                <CircleParticles count={10} colorScheme="dark" />
                                <div className="relative z-10 w-full flex flex-col items-center">
                                    <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/20 text-white shadow-sm mb-2.5 text-xl group-hover:rotate-6 transition-transform duration-300">
                                        <i className="fas fa-phone"></i>
                                    </div>
                                    <h4 className="font-black uppercase tracking-[0.2em] text-[8px] mb-1 opacity-90">Teléfono</h4>
                                    <p className="text-xs font-black leading-tight tracking-wide">{selected.phone}</p>
                                </div>
                            </div>
                            <div className="relative p-4 rounded-3xl bg-[#8B4513] text-white border-2 border-[#8B4513] shadow-lg shadow-[#8B4513]/20 hover:scale-105 transition-all duration-300 group overflow-hidden flex flex-col items-center justify-center text-center">
                                <CircleParticles count={10} colorScheme="dark" />
                                <div className="relative z-10 w-full flex flex-col items-center">
                                    <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/20 text-white shadow-sm mb-2.5 text-xl group-hover:rotate-6 transition-transform duration-300">
                                        <i className="fas fa-concierge-bell"></i>
                                    </div>
                                    <h4 className="font-black uppercase tracking-[0.2em] text-[8px] mb-1 opacity-90">Servicios</h4>
                                    <p className="text-[9px] font-bold leading-tight tracking-wide">{selected.services}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="order-1 lg:order-2 lg:col-span-7 h-[350px] sm:h-[500px] lg:h-[650px] rounded-[2rem] sm:rounded-[3rem] overflow-hidden shadow-2xl shadow-orange-950/15 border-4 border-white relative z-10 transform hover:scale-[1.005] transition-transform duration-500 group">
                        <div className="absolute top-6 right-6 z-30 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-white/50 animate-fade-in-up">
                            <div className="flex items-center gap-3">
                                <div>
                                    <p className="text-[10px] font-black uppercase text-gray-500 tracking-wider text-right">SCZ 0{activeIdx + 1}</p>
                                    <p className="text-sm font-bold text-[#8B4513] text-right">{selected.fullName}</p>
                                </div>
                                <div className="w-10 h-10 bg-[#FF4D00] rounded-full flex items-center justify-center text-white shadow-md">
                                    <i className="fas fa-store"></i>
                                </div>
                            </div>
                        </div>

                        <div className="absolute bottom-6 left-6 z-30 bg-[#5D3A1F] text-white px-6 py-3 rounded-full shadow-lg font-black text-xs uppercase tracking-widest border-2 border-white animate-bounce-slow">
                            <i className="fas fa-map-marker-alt mr-2 text-[#FF4D00]"></i> Te esperamos aquí
                        </div>

                        <div className="absolute top-6 left-6 z-30 bg-[#5D3A1F] text-white px-4 py-2 rounded-2xl shadow-lg border border-white/10">
                            <p className="text-[10px] font-black uppercase tracking-wider text-white/70">{selected.schedule}</p>
                            <p className="text-xs font-bold mt-1 flex items-center gap-2"><i className="fas fa-phone text-[#FF4D00]"></i> {selected.phone}</p>
                        </div>

                        <div className="absolute inset-0 bg-[#FF4D00]/10 pointer-events-none z-20 group-hover:opacity-0 transition-opacity duration-500"></div>

                        <iframe
                            key={selected.id}
                            src={`https://maps.google.com/maps?q=${selected.coords}&z=15&ie=UTF8&iwloc=&output=embed`}
                            width="100%"
                            height="100%"
                            style={{border:0}}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="grayscale group-hover:grayscale-0 transition-all duration-700 contrast-[1.1]"
                        ></iframe>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MapsSucursalesSCZ;
