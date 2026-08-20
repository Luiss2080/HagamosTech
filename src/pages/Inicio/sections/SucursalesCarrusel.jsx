import React from 'react';

const sucursalesData = [
  { id: 'scz-1', city: 'Santa Cruz', regionBadge: 'SCZ', name: 'Equipetrol', address: 'Av. Cristóbal de Mendoza', phone: '3 3430197', schedule: 'Hasta la 1:30 p.m.', services: ['Consumo en el lugar', 'Para llevar'], mapLink: 'https://maps.app.goo.gl/L6pWgHan11aPfE4p7', img: '/img/10_sucursales/SantaCruz/01_Sucursal.png' },
  { id: 'scz-2', city: 'Santa Cruz', regionBadge: 'SCZ', name: '2do Anillo', address: 'Ubicación: 6R59+5W7', phone: '3 3391432', schedule: 'Hasta la 1:30 p.m.', services: ['Consumo en el lugar', 'Para llevar'], mapLink: 'https://maps.app.goo.gl/GYF5RyA9vtDnDJ9WA', img: '/img/10_sucursales/SantaCruz/02_Sucursal.png' },
  { id: 'scz-3', city: 'Santa Cruz', regionBadge: 'SCZ', name: 'Av. Piraí', address: 'Av. Piraí 344', phone: '3 3552038', schedule: '7:45 a.m. – 1:00 p.m.', services: ['Consumo en el lugar', 'Para llevar'], mapLink: 'https://maps.app.goo.gl/vyDVunvkBmjqjKbf7', img: '/img/10_sucursales/SantaCruz/03_Sucursal.png' },
  { id: 'scz-4', city: 'Santa Cruz', regionBadge: 'SCZ', name: 'Café Beni', address: 'Av. Beni 2160', phone: '+591 61320004', schedule: '7:00 a.m. – 2:00 p.m.', services: ['Consumo en el lugar', 'Cafetería Especial'], mapLink: 'https://maps.app.goo.gl/wwNLzMyyizWoJXBGA', img: '/img/10_sucursales/SantaCruz/04_Sucursal.png' },
  { id: 'cbb-1', city: 'Cochabamba', regionBadge: 'CBB', name: 'Recoleta', address: 'C. A. Padilla 541', phone: '4 4798010', schedule: 'Hasta las 3:00 p.m.', services: ['Consumo en el lugar', 'Para llevar'], mapLink: 'https://maps.app.goo.gl/wLX45LiJwESxNX6P8', img: '/img/10_sucursales/Cochabamba/01_Sucursal.png' },
  { id: 'cbb-2', city: 'Cochabamba', regionBadge: 'CBB', name: 'Prado', address: 'Av. Ballivián #790', phone: '4 4259585', schedule: 'Hasta las 3:00 p.m.', services: ['Consumo en el lugar', 'Para llevar'], mapLink: 'https://maps.app.goo.gl/cF6ADUQTcVJTfa8b9', img: '/img/10_sucursales/Cochabamba/02_Sucursal.png' },
  { id: 'cbb-3', city: 'Cochabamba', regionBadge: 'CBB', name: 'Centro', address: 'Ubicación JV73+Q2Q', phone: '4 4222789', schedule: 'Hasta las 3:00 p.m.', services: ['Consumo en el lugar', 'Para llevar'], mapLink: 'https://maps.app.goo.gl/wD2ZH6PJvbbMJAe87', img: '/img/10_sucursales/Cochabamba/03_Sucursal.png' },
  { id: 'cbb-4', city: 'Cochabamba', regionBadge: 'CBB', name: 'Simón López', address: 'Av. Simón López', phone: '4 4500292', schedule: 'Hasta las 3:00 p.m.', services: ['Consumo en el lugar', 'Para llevar'], mapLink: 'https://maps.app.goo.gl/2L4KujA1rQGMvgGQA', img: '/img/10_sucursales/Cochabamba/04_Sucursal.png' },
  { id: 'cbb-5', city: 'Cochabamba', regionBadge: 'CBB', name: '15 de Agosto', address: '15 de Agosto', phone: '4 4423596', schedule: 'Hasta las 3:00 p.m.', services: ['Consumo en el lugar', 'Para llevar'], mapLink: 'https://maps.app.goo.gl/oCanVtHB3bgvXcR76', img: '/img/10_sucursales/Cochabamba/05_Sucursal.png' },
  { id: 'cbb-6', city: 'Cochabamba', regionBadge: 'CBB', name: 'Beijing', address: 'Av. Beijing', phone: '69257952', schedule: 'Hasta las 3:00 p.m.', services: ['Consumo en el lugar', 'Para llevar'], mapLink: 'https://maps.app.goo.gl/adtLuPNNm7nEuxck7', img: '/img/10_sucursales/Cochabamba/06_Sucursal.png' },
  { id: 'oru-1', city: 'Oruro', regionBadge: 'ORU', name: 'Franquicia 1', address: 'Murguía 982', phone: '68929329', schedule: 'Hasta las 3:00 p.m.', services: ['Consumo en el lugar', 'Para llevar'], mapLink: 'https://maps.app.goo.gl/qEhwMp7xotXRgwum6', img: '/img/10_sucursales/Oruro/01_Sucursal.png' },
  { id: 'oru-2', city: 'Oruro', regionBadge: 'ORU', name: 'Centro Oruro', address: 'Potosí 318', phone: '72302533', schedule: 'Hasta la 1:30 p.m.', services: ['Consumo en el lugar', 'Para llevar'], mapLink: 'https://maps.app.goo.gl/Lk6ZDu2e43psPZa8A', img: '/img/10_sucursales/Oruro/02_Sucursal.png' },
];

const SucursalesCarrusel = ({ onOpenModal }) => {
    // Array duplicado para efecto infinito
    const row1 = [...sucursalesData, ...sucursalesData];

    const renderCard = (sucursal, index, globalIndex) => (
        <article
            key={`${sucursal.id}-${globalIndex}`}
            className="bg-white rounded-[20px] shadow-[0_8px_30px_rgba(0,0,0,0.12)] p-3.5 flex items-center gap-3 sm:gap-4 border-b-[5px] border-[#FF4D00] w-[290px] sm:w-[320px] shrink-0 transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(0,0,0,0.2)] relative"
        >
            {/* Adicional en el extremo superior derecho */}
            <div className="absolute top-2 right-2 bg-orange-100 text-[#FF4D00] text-[9px] font-black px-2 py-0.5 rounded-full border border-orange-200">
                {sucursal.regionBadge}
            </div>

            {/* Foto Sucursal */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center bg-orange-50 rounded-[14px] overflow-hidden shrink-0 border border-orange-100">
                <img 
                    src={sucursal.img} 
                    alt={sucursal.name} 
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" 
                    onError={(e) => { e.target.src = '/img/10_sucursales/SantaCruz/01_Sucursal.png'; }}
                />
            </div>

            {/* Divisor */}
            <div className="w-px h-20 bg-gradient-to-b from-transparent via-[#FF4D00]/30 to-transparent"></div>

            {/* Contenido */}
            <div className="flex flex-col flex-1 justify-between py-1">
                <div className="mb-2">
                    <div className="flex items-center gap-1.5 mb-1">
                        <span className="text-[#FF4D00] font-black text-[11px] sm:text-xs">0{index + 1}</span>
                        <h3 className="font-extrabold text-[#5D3A1F] text-[11px] sm:text-xs leading-tight truncate uppercase w-32 pr-4" title={sucursal.name}>
                            {sucursal.name}
                        </h3>
                    </div>
                    
                    <div className="flex items-center gap-1.5 mb-1.5">
                        <i className="fa-solid fa-map-marker-alt text-[#FF4D00] text-[9px] sm:text-[10px]"></i>
                        <span className="text-gray-500 font-bold text-[8px] sm:text-[9px] tracking-widest uppercase truncate">{sucursal.city}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                        <i className="fa-solid fa-clock text-[#FF4D00] text-[8px] sm:text-[9px]"></i>
                        <span className="text-gray-400 font-bold text-[8px] uppercase tracking-wider truncate">
                            {sucursal.schedule}
                        </span>
                    </div>
                </div>

                <button 
                    onClick={() => onOpenModal(sucursal)}
                    className="w-full bg-[#FF4D00] hover:bg-[#8B4513] text-white font-bold text-[9px] sm:text-[10px] py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition-colors shadow-sm mt-auto"
                >
                    VER DETALLES
                    <i className="fa-solid fa-arrow-up-right-from-square text-[9px]"></i>
                </button>
            </div>
        </article>
    );

    return (
        <section id="sucursales" className="w-full bg-[#FF4D00] py-4 sm:py-6 overflow-hidden relative z-10 flex items-center min-h-[160px]">
            {/* Animaciones y Fondo */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-black/10 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/3"></div>
                <div className="absolute top-10 left-20 w-32 h-32 bg-white/5 rounded-full blur-2xl animate-bounce" style={{ animationDuration: '3s' }}></div>
                <div className="absolute bottom-5 right-40 w-48 h-48 bg-black/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }}></div>
                {/* Patrón sutil */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNykiLz48L3N2Zz4=')] pointer-events-none opacity-50"></div>
            </div>

            {/* Edge Fades */}
            <div className="absolute top-0 left-0 h-full w-16 sm:w-32 bg-gradient-to-r from-[#FF4D00] to-transparent z-20 pointer-events-none"></div>
            <div className="absolute top-0 right-0 h-full w-16 sm:w-32 bg-gradient-to-l from-[#FF4D00] to-transparent z-20 pointer-events-none"></div>

            <style>{`
                @keyframes instMarqueeLeft {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .marquee-row-1 {
                    display: flex;
                    width: max-content;
                    animation: instMarqueeLeft 40s linear infinite;
                }
                .marquee-row-1:hover {
                    animation-play-state: paused;
                }
            `}</style>

            <div className="relative z-10 w-full flex flex-col">                
                {/* Row 1 (Moving Left) */}
                <div className="marquee-row-1 flex gap-5 sm:gap-6 px-4 py-2">
                    {row1.map((sucursal, i) => renderCard(sucursal, i % sucursalesData.length, `r1-${i}`))}
                </div>
            </div>
        </section>
    );
};

export default SucursalesCarrusel;
