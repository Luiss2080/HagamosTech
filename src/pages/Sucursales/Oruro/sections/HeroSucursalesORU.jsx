import React from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../../../../components/func/MigasPan';
import CircuitBackground from '../../../../components/fondos/FondoSaltenas';

const SUCURSALES = [
  { id: 'oru-1', slug: 'franquicia-1', name: 'HagamosTech Franquicia 1', badge: 'ORU 01', address: 'Murguía 982', phone: '68929329', schedule: 'Hasta las 3:00 p.m.', services: ['Consumo', 'Llevar', 'Delivery', 'WiFi', 'Jugos', 'Familiar'], mapLink: 'https://maps.app.goo.gl/qEhwMp7xotXRgwum6', img: '/img/10_sucursales/Oruro/01_Sucursal.png', desc: 'Nuestra primera sucursal en Oruro. Llevamos el auténtico sabor tradicional a la tierra del folklore con la misma receta de siempre.' },
  { id: 'oru-2', slug: 'centro-oruro', name: 'HagamosTech Centro Oruro', badge: 'ORU 02', address: 'Potosí 318', phone: '72302533', schedule: 'Hasta la 1:30 p.m.', services: ['Consumo', 'Llevar', 'Delivery', 'Cafetería', 'Bebidas', 'Rápido'], mapLink: 'https://maps.app.goo.gl/Lk6ZDu2e43psPZa8A', img: '/img/10_sucursales/Oruro/02_Sucursal.png', desc: 'En pleno centro de la ciudad. Cerca de todo, perfecta para una pausa con las salteñas más ricas rumbo al mercado o la plaza.' }
];

const HeroSucursalesORU = () => {
    return (
        <div className="relative z-10">
            <CircuitBackground />
            <PageHero
                title="Sucursales en"
                highlight="Oruro."
                description="Dos puntos de atención en la capital del folklore para que disfrutes del verdadero sabor de HagamosTech."
            >
                <div className="flex flex-wrap justify-center gap-3 mt-1">
                    {SUCURSALES.map((s) => (
                        <Link
                            key={s.id}
                            to={`/sucursales/oruro/${s.slug}`}
                            className="group px-5 py-2.5 rounded-full border border-[#FF4D00]/20 bg-[#FF4D00] text-white font-black text-[10px] sm:text-[11px] uppercase tracking-[0.14em] transition-all shadow-lg shadow-orange-500/20 hover:bg-[#CC3D00] hover:-translate-y-0.5 hover:shadow-orange-500/35 flex items-center gap-2 cursor-pointer"
                        >
                            <i className="fas fa-store text-white text-[10px]"></i>
                            {s.name.split(' ').slice(2).join(' ')}
                            <i className="fas fa-arrow-right text-[9px] text-white transition-transform group-hover:translate-x-0.5"></i>
                        </Link>
                    ))}
                </div>
            </PageHero>

            <div className="container mx-auto px-6 max-w-5xl relative z-20 pb-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {SUCURSALES.map((sucursal) => (
                        <Link
                            key={sucursal.id}
                            to={`/sucursales/oruro/${sucursal.slug}`}
                            className="group relative bg-white rounded-[2rem] overflow-hidden shadow-md border border-gray-100 hover:shadow-xl hover:border-[#FF4D00]/30 transition-all duration-400 hover:-translate-y-1 flex flex-col sm:flex-row cursor-pointer"
                        >
                            <div className="relative w-full sm:w-[45%] h-48 sm:h-auto overflow-hidden shrink-0">
                                <img src={sucursal.img} alt={sucursal.name} className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-105" />
                                <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-black/60 sm:from-black/40 sm:to-transparent to-transparent"></div>
                                <div className="absolute top-2.5 left-2.5 bg-[#8B4513] text-white text-[8px] font-black uppercase px-2.5 py-1 rounded-full tracking-widest shadow-md">{sucursal.badge}</div>
                            </div>

                            <div className="flex-1 p-4 sm:p-5 flex flex-col justify-between">
                                <div className="text-center">
                                    <h3 className="text-lg font-black font-heading text-[#8B4513] mb-1 leading-tight">{sucursal.name}</h3>
                                    <p className="text-[11px] text-slate-500 font-semibold mb-4 leading-relaxed">{sucursal.desc}</p>

                                    <div className="grid grid-cols-3 gap-2 mb-4">
                                        <div className="flex flex-col items-center gap-1">
                                            <i className="fas fa-map-marker-alt text-[#8B4513] text-sm"></i>
                                            <p className="text-[10px] font-extrabold text-[#111827] leading-tight text-center">{sucursal.address}</p>
                                        </div>
                                        <div className="flex flex-col items-center gap-1">
                                            <i className="fas fa-phone-alt text-[#8B4513] text-sm"></i>
                                            <p className="text-[10px] font-extrabold text-[#111827] leading-tight text-center">{sucursal.phone}</p>
                                        </div>
                                        <div className="flex flex-col items-center gap-1">
                                            <i className="fas fa-clock text-[#8B4513] text-sm"></i>
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
                                                'Jugos': 'fa-blender',
                                                'Familiar': 'fa-users',
                                                'Bebidas': 'fa-glass-water',
                                                'Rápido': 'fa-bolt',
                                            };
                                            const icon = icons[srv] || 'fa-check-circle';
                                            return (
                                                <span key={j} className="text-[8px] font-black uppercase tracking-wider px-2 py-2 rounded-lg bg-[#8B4513]/10 text-[#8B4513] border border-[#8B4513]/15 flex items-center justify-center gap-1.5">
                                                    <i className={`fas ${icon} text-[9px]`}></i>
                                                    {srv}
                                                </span>
                                            );
                                        })}
                                    </div>
                                </div>

                                <span
                                    className="w-full mt-4 py-2.5 rounded-full bg-[#8B4513] group-hover:bg-[#6B3410] text-white font-black text-[10px] uppercase tracking-[0.14em] flex items-center justify-center gap-2 shadow-lg shadow-[#8B4513]/20 group-hover:shadow-[#8B4513]/35 group-hover:-translate-y-0.5 transition-all duration-300"
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

export default HeroSucursalesORU;
