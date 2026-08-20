import React from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../../../../components/func/MigasPan';
import CircuitBackground from '../../../../components/fondos/FondoTech';

const SUCURSALES = [
  { id: 'cbb-1', slug: 'recoleta', name: 'HagamosTech Recoleta', badge: 'CBB 01', address: 'C. A. Padilla 541', phone: '4 4798010', schedule: 'Hasta las 3:00 p.m.', services: ['Consumo', 'Llevar', 'WiFi', 'Terraza', 'Jugos', 'Delivery'], mapLink: 'https://maps.app.goo.gl/wLX45LiJwESxNX6P8', img: '/img/10_sucursales/Cochabamba/01_Sucursal.png', desc: 'Ubicada en la zona más tradicional de Cochabamba. Ambiente acogedor con la receta original que conquistó la ciudad.' },
  { id: 'cbb-2', slug: 'prado', name: 'HagamosTech Prado', badge: 'CBB 02', address: 'Av. Ballivián #790', phone: '4 4259585', schedule: 'Hasta las 3:00 p.m.', services: ['Consumo', 'Llevar', 'Delivery', 'WiFi', 'Bebidas', 'Rápido'], mapLink: 'https://maps.app.goo.gl/cF6ADUQTcVJTfa8b9', img: '/img/10_sucursales/Cochabamba/02_Sucursal.png', desc: 'Sobre la avenida más emblemática del Prado. El punto de encuentro favorito para disfrutar salteñas recién horneadas.' },
  { id: 'cbb-3', slug: 'centro', name: 'HagamosTech Centro', badge: 'CBB 03', address: 'JV73+Q2Q', phone: '4 4222789', schedule: 'Hasta las 3:00 p.m.', services: ['Consumo', 'Llevar', 'Delivery', 'Cafetería', 'Familiar', 'Pastelería'], mapLink: 'https://maps.app.goo.gl/wD2ZH6PJvbbMJAe87', img: '/img/10_sucursales/Cochabamba/03_Sucursal.png', desc: 'En pleno casco viejo de la ciudad. Perfecta para una pausa rápida con el auténtico sabor de siempre.' },
  { id: 'cbb-4', slug: 'simon-lopez', name: 'HagamosTech Simón López', badge: 'CBB 04', address: 'Av. Simón López', phone: '4 4500292', schedule: 'Hasta las 3:00 p.m.', services: ['Consumo', 'Llevar', 'Delivery', 'WiFi', 'Terraza', 'Jugos'], mapLink: 'https://maps.app.goo.gl/2L4KujA1rQGMvgGQA', img: '/img/10_sucursales/Cochabamba/04_Sucursal.png', desc: 'Zona norte de Cochabamba. Espacio amplio ideal para compartir en familia con todas las variedades de salteñas.' },
  { id: 'cbb-5', slug: '15-de-agosto', name: 'HagamosTech 15 de Agosto', badge: 'CBB 05', address: '15 de Agosto', phone: '4 4423596', schedule: 'Hasta las 3:00 p.m.', services: ['Consumo', 'Llevar', 'Delivery', 'Rápido', 'Bebidas', 'Familiar'], mapLink: 'https://maps.app.goo.gl/oCanVtHB3bgvXcR76', img: '/img/10_sucursales/Cochabamba/05_Sucursal.png', desc: 'Cerca de la zona comercial. Atención rápida y eficiente para que no pierdas ni un minuto de tu día.' },
  { id: 'cbb-6', slug: 'beijing', name: 'HagamosTech Beijing', badge: 'CBB 06', address: 'Av. Beijing', phone: '69257952', schedule: 'Hasta las 3:00 p.m.', services: ['Consumo', 'Llevar', 'Delivery', 'WiFi', 'Cafetería', 'Pastelería'], mapLink: 'https://maps.app.goo.gl/adtLuPNNm7nEuxck7', img: '/img/10_sucursales/Cochabamba/06_Sucursal.png', desc: 'La sucursal más reciente. Con opciones de cafetería y pastelería para complementar tu experiencia salteñera.' }
];

const HeroSucursalesCBB = () => {
    return (
        <div className="relative z-10">
            <CircuitBackground />
            <PageHero
                title="Sucursales en"
                highlight="Cochabamba."
                description="Seis puntos de atención distribuidos por toda la ciudad para que siempre tengas cerca el sabor que te encanta."
            >
                <div className="flex flex-wrap justify-center gap-3 mt-1">
                    {SUCURSALES.map((s) => (
                        <Link
                            key={s.id}
                            to={`/sucursales/cochabamba/${s.slug}`}
                            className="group px-5 py-2.5 rounded-full border border-[#FF4D00]/20 bg-[#FF4D00] text-white font-black text-[10px] sm:text-[11px] uppercase tracking-[0.14em] transition-all shadow-lg shadow-orange-500/20 hover:bg-[#CC3D00] hover:-translate-y-0.5 hover:shadow-orange-500/35 flex items-center gap-2 cursor-pointer"
                        >
                            <i className="fas fa-shop text-white text-[10px]"></i>
                            {s.slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
                            <i className="fas fa-arrow-right text-[9px] text-white transition-transform group-hover:translate-x-0.5"></i>
                        </Link>
                    ))}
                </div>
            </PageHero>

            <div className="container mx-auto px-6 max-w-7xl relative z-20 pb-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {SUCURSALES.map((sucursal) => (
                        <Link
                            key={sucursal.id}
                            to={`/sucursales/cochabamba/${sucursal.slug}`}
                            className="group relative bg-white rounded-[2rem] overflow-hidden shadow-md border border-gray-100 hover:shadow-xl hover:border-[#FF4D00]/30 transition-all duration-400 hover:-translate-y-1 flex flex-col cursor-pointer"
                        >
                            <div className="relative w-full h-44 overflow-hidden shrink-0">
                                <img src={sucursal.img} alt={sucursal.name} className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-105" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <div className="absolute top-2.5 left-2.5 bg-[#FF4D00] text-white text-[8px] font-black uppercase px-2.5 py-1 rounded-full tracking-widest shadow-md">{sucursal.badge}</div>
                            </div>

                            <div className="flex-1 p-4 flex flex-col justify-between">
                                <div className="text-center">
                                    <h3 className="text-base font-black font-heading text-[#8B4513] mb-1 leading-tight">{sucursal.name}</h3>
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

export default HeroSucursalesCBB;
