import React from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../../../../components/func/MigasPan';
import CircuitBackground from '../../../../components/fondos/FondoSaltenas';

const SUCURSALES = [
  { id: 'scz-1', slug: 'equipetrol', name: 'Los Castores Equipetrol', badge: 'SCZ 01', address: 'Av. Cristóbal de Mendoza, esquina', phone: '3 3430197', schedule: 'Abierto hasta la 1:30 p.m.', services: ['Consumo', 'Llevar', 'Delivery', 'WiFi', 'Terraza', 'Jugos'], mapLink: 'https://maps.app.goo.gl/L6pWgHan11aPfE4p7', img: '/img/10_sucursales/SantaCruz/01_Sucursal.png', desc: 'Nuestra sucursal insignia en el corazón de Equipetrol. Ambiente exclusivo con la mejor atención personalizada y delivery express a toda la zona norte.' },
  { id: 'scz-2', slug: '2do-anillo', name: 'Los Castores 2do Anillo', badge: 'SCZ 02', address: '6R59+5W7', phone: '3 3391432', schedule: 'Abierto hasta la 1:30 p.m.', services: ['Consumo', 'Llevar', 'Delivery', 'WiFi', 'Familiar', 'Bebidas'], mapLink: 'https://maps.app.goo.gl/GYF5RyA9vtDnDJ9WA', img: '/img/10_sucursales/SantaCruz/02_Sucursal.png', desc: 'Punto estratégico sobre la vía más transitada. Amplio espacio interior, ideal para grupos y familias.' },
  { id: 'scz-3', slug: 'av-pirai', name: 'Salteñas Los Castores Av. Piraí', badge: 'SCZ 03', address: 'Av. Piraí 344', phone: '3 3552038', schedule: '7:45 a.m. – 1:00 p.m.', services: ['Consumo', 'Llevar', 'Delivery', 'WiFi', 'Rápido', 'Jugos'], mapLink: 'https://maps.app.goo.gl/vyDVunvkBmjqjKbf7', img: '/img/10_sucursales/SantaCruz/03_Sucursal.png', desc: 'La sucursal de los madrugadores. Abre temprano para que arranques el día con la mejor salteña.' },
  { id: 'scz-4', slug: 'cafe-beni', name: 'Los Castores Café Beni', badge: 'SCZ 04', address: 'Av. Beni 2160', phone: '+591 61320004', schedule: '7:00 a.m. – 2:00 p.m.', services: ['Consumo', 'Cafetería', 'Llevar', 'Delivery', 'Terraza', 'Pastelería'], mapLink: 'https://maps.app.goo.gl/wwNLzMyyizWoJXBGA', img: '/img/10_sucursales/SantaCruz/04_Sucursal.png', desc: 'Experiencia gourmet. Salteñas artesanales acompañadas de café de especialidad en una terraza acogedora.' }
];

const HeroSucursalesSCZ = () => {
    return (
        <div className="relative z-10">
            <CircuitBackground />
            <PageHero
                title="Sucursales en"
                highlight="Santa Cruz."
                description="Cuatro puntos de atención repartidos estratégicamente para acercar el auténtico sabor tradicional a cada zona de la ciudad."
            >
                <div className="flex flex-wrap justify-center gap-3 mt-1">
                    {[
                        { slug: 'equipetrol', label: 'Equipetrol', icon: 'fa-location-dot' },
                        { slug: '2do-anillo', label: '2do Anillo', icon: 'fa-map-pin' },
                        { slug: 'av-pirai', label: 'Av. Piraí', icon: 'fa-road' },
                        { slug: 'cafe-beni', label: 'Av. Beni', icon: 'fa-mug-hot' }
                    ].map((item, i) => (
                        <Link
                            key={i}
                            to={`/sucursales/santa-cruz/${item.slug}`}
                            className="group px-5 py-2.5 rounded-full border border-[#FF4D00]/20 bg-[#FF4D00] text-white font-black text-[10px] sm:text-[11px] uppercase tracking-[0.14em] transition-all shadow-lg shadow-orange-500/20 hover:bg-[#CC3D00] hover:-translate-y-0.5 hover:shadow-orange-500/35 flex items-center gap-2 cursor-pointer"
                        >
                            <i className={`fas ${item.icon} text-white text-[10px]`}></i>
                            {item.label}
                            <i className="fas fa-arrow-right text-[9px] text-white transition-transform group-hover:translate-x-0.5"></i>
                        </Link>
                    ))}
                </div>
            </PageHero>

            <div className="container mx-auto px-6 max-w-7xl relative z-20 pb-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {SUCURSALES.map((sucursal) => (
                        <Link
                            key={sucursal.id}
                            to={`/sucursales/santa-cruz/${sucursal.slug}`}
                            className="group relative bg-white rounded-[2rem] overflow-hidden shadow-md border border-gray-100 hover:shadow-xl hover:border-[#FF4D00]/30 transition-all duration-400 hover:-translate-y-1 flex flex-col sm:flex-row cursor-pointer"
                        >
                            <div className="relative w-full sm:w-[40%] h-48 sm:h-auto overflow-hidden shrink-0">
                                <img src={sucursal.img} alt={sucursal.name} className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-105" />
                                <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-black/60 sm:from-black/40 sm:to-transparent to-transparent"></div>
                                <div className="absolute top-2.5 left-2.5 bg-[#FF4D00] text-white text-[8px] font-black uppercase px-2.5 py-1 rounded-full tracking-widest shadow-md">{sucursal.badge}</div>
                            </div>

                            <div className="flex-1 p-4 sm:p-5 flex flex-col justify-between">
                                <div className="text-center">
                                    <h3 className="text-lg font-black font-heading text-[#8B4513] mb-1 leading-tight">{sucursal.name}</h3>
                                    <p className="text-[11px] text-slate-500 font-semibold mb-4 leading-relaxed">{sucursal.desc}</p>

                                    <div className="grid grid-cols-3 gap-2 mb-4">
                                        <div className="flex flex-col items-center gap-1">
                                            <i className="fas fa-map-marker-alt text-[#FF4D00] text-sm"></i>
                                            <p className="text-[10px] font-extrabold text-[#111827] leading-tight text-center">{sucursal.address}</p>
                                        </div>
                                        <div className="flex flex-col items-center gap-1">
                                            <i className="fas fa-phone-alt text-[#FF4D00] text-sm"></i>
                                            <p className="text-[10px] font-extrabold text-[#111827] leading-tight text-center">{sucursal.phone}</p>
                                        </div>
                                        <div className="flex flex-col items-center gap-1">
                                            <i className="fas fa-clock text-[#FF4D00] text-sm"></i>
                                            <p className="text-[10px] font-extrabold text-[#111827] leading-tight text-center">{sucursal.schedule}</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-3 gap-1.5">
                                        {[...Array(6)].map((_, j) => {
                                            const srv = sucursal.services[j];
                                            if (!srv) return <div key={j} />;
                                            const icons = {
                                                'Consumo': 'fa-store-alt',
                                                'Llevar': 'fa-bag-shopping',
                                                'Delivery': 'fa-motorcycle',
                                                'Cafetería': 'fa-mug-hot',
                                                'WiFi': 'fa-wifi',
                                                'Terraza': 'fa-umbrella-beach',
                                                'Jugos': 'fa-blender',
                                                'Familiar': 'fa-users',
                                                'Bebidas': 'fa-glass-water',
                                                'Rápido': 'fa-bolt',
                                                'Pastelería': 'fa-cake-candles',
                                            };
                                            const icon = icons[srv] || 'fa-check-circle';
                                            return (
                                                <span key={j} className="text-[8px] font-black uppercase tracking-wider px-2 py-2 rounded-lg bg-[#FF4D00]/10 text-[#FF4D00] border border-[#FF4D00]/15 flex items-center justify-center gap-1.5">
                                                    <i className={`fas ${icon} text-[9px]`}></i>
                                                    {srv}
                                                </span>
                                            );
                                        })}
                                    </div>
                                </div>

                                <span
                                    className="w-full mt-4 py-2.5 rounded-full bg-[#FF4D00] group-hover:bg-[#CC3D00] text-white font-black text-[10px] uppercase tracking-[0.14em] flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 group-hover:shadow-orange-500/35 group-hover:-translate-y-0.5 transition-all duration-300"
                                >
                                    Ver sucursal
                                    <i className="fas fa-arrow-right text-[9px]"></i>
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HeroSucursalesSCZ;
