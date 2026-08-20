import React, { useState } from 'react';
import SeccionProducto from '../shared/SeccionProducto';

const GRANOS = [
    { nombre: 'Caranavi', tipo: 'Lavado', notas: 'Chocolate, caramelo, nuez', tueste: 'Medio', color: 'from-[#8B4513] to-[#5D3010]', img: '/img/05_Productos/Cafe/Americano.png', icon: 'fa-mountain' },
    { nombre: 'Samaipata', tipo: 'Natural', notas: 'Frutas rojas, miel, floral', tueste: 'Claro', color: 'from-[#FF4D00] to-[#CC3D00]', img: '/img/05_Productos/Cafe/Capuccino.png', icon: 'fa-leaf' },
    { nombre: 'Blend HagamosTech', tipo: 'Honey', notas: 'Cacao, panela, fruta madura', tueste: 'Medio-Oscuro', color: 'from-[#5D3A1F] to-[#452A16]', img: '/img/05_Productos/Cafe/Mokaccino.png', icon: 'fa-fire' },
];

const CataCafe = () => {
    const [active, setActive] = useState(0);
    const grano = GRANOS[active];

    return (
        <SeccionProducto
            badge="Cata de Café"
            badgeIcon="fa-mug-hot"
            titulo="Descubrí tu"
            resaltado="grano"
            descripcion="Seleccioná el grano y explorá sus notas de cata."
        >
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 items-stretch">
                {/* Selector de granos */}
                <div className="lg:col-span-2 flex flex-col gap-2.5">
                    {GRANOS.map((g, i) => (
                        <button
                            key={i}
                            onClick={() => setActive(i)}
                            className={`relative flex items-center gap-3 p-4 rounded-2xl text-left transition-all duration-300 ${active === i ? 'bg-[#5D3A1F] text-white shadow-lg shadow-[#5D3A1F]/30 scale-[1.02]' : 'bg-white text-[#111827] border border-gray-100 hover:border-[#5D3A1F]/30 hover:shadow-md'}`}
                        >
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${g.color} flex items-center justify-center text-lg shrink-0 text-white shadow-md`}>
                                <i className={`fas ${g.icon}`}></i>
                            </div>
                            <div>
                                <p className={`font-black text-sm ${active === i ? 'text-white' : 'text-[#111827]'}`}>{g.nombre}</p>
                                <p className={`text-[9px] font-black uppercase tracking-widest ${active === i ? 'text-white/70' : 'text-gray-400'}`}>{g.tipo} · Tueste {g.tueste}</p>
                            </div>
                            {active === i && <i className="fas fa-check-circle text-amber-300 ml-auto"></i>}
                        </button>
                    ))}
                </div>

                {/* Detalle del grano */}
                <div className="lg:col-span-3 bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-md relative">
                    <div className="relative h-52 overflow-hidden">
                        <img src={grano.img} alt={grano.nombre} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#5D3A1F]/80 to-transparent"></div>
                        <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
                            <div>
                                <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-white text-[9px] font-black uppercase tracking-widest border border-white/25 mb-2">{grano.tipo}</span>
                                <h3 className="text-2xl font-black font-heading text-white">{grano.nombre}</h3>
                            </div>
                            <span className="px-4 py-2 rounded-full bg-amber-300 text-[#5D3A1F] text-[10px] font-black uppercase tracking-widest shadow-lg">Tueste {grano.tueste}</span>
                        </div>
                    </div>

                    <div className="p-6">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Notas de Cata</p>
                        <div className="flex flex-wrap gap-2 mb-5">
                            {grano.notas.split(', ').map((nota, j) => (
                                <span key={j} className="px-4 py-2 rounded-full bg-[#FFF6F6] text-[#8B4513] text-[11px] font-black uppercase tracking-wider border border-orange-100 flex items-center gap-1.5">
                                    <i className="fas fa-star text-amber-400 text-[9px]"></i> {nota}
                                </span>
                            ))}
                        </div>
                        <a href="https://wa.me/59161320004" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FF4D00] hover:bg-[#CC3D00] text-white font-black text-[10px] uppercase tracking-[0.15em] shadow-lg shadow-orange-500/20 transition-all">
                            <i className="fab fa-whatsapp"></i> Pedir café {grano.nombre}
                        </a>
                    </div>
                </div>
            </div>
        </SeccionProducto>
    );
};

export default CataCafe;
