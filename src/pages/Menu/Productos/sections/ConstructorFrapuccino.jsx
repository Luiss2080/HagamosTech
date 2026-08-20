import React, { useState } from 'react';
import SeccionProducto from '../shared/SeccionProducto';

const BASES = [
    { nombre: 'Chocolate', precio: 18, icon: 'fa-mug-hot', img: '/img/05_Productos/Frapuccinos/FrapuccinoChocolate.png', color: 'bg-[#8B4513]' },
    { nombre: 'Dulce de Leche', precio: 18, icon: 'fa-ice-cream', img: '/img/05_Productos/Frapuccinos/FrapuccinoDulceDeLeche.png', color: 'bg-[#FF4D00]' },
    { nombre: 'Clásico', precio: 16, icon: 'fa-blender', img: '/img/05_Productos/Frapuccinos/FrapuccinoRegular.png', color: 'bg-[#5D3A1F]' },
];

const TOPPINGS = [
    { nombre: 'Crema Batida', precio: 2, icon: 'fa-whipped-cream' },
    { nombre: 'Chispas de Chocolate', precio: 2, icon: 'fa-candy-cane' },
    { nombre: 'Caramelo', precio: 1.5, icon: 'fa-droplet' },
    { nombre: 'Canela', precio: 0.5, icon: 'fa-mortar-pestle' },
];

const ConstructorFrapuccino = () => {
    const [base, setBase] = useState(0);
    const [toppings, setToppings] = useState([true, false, false, false]);

    const toggleTopping = (i) => setToppings(prev => prev.map((v, j) => j === i ? !v : v));

    const precioBase = BASES[base].precio;
    const precioToppings = TOPPINGS.reduce((sum, t, i) => sum + (toppings[i] ? t.precio : 0), 0);
    const total = precioBase + precioToppings;

    return (
        <SeccionProducto
            badge="Armá Tu Frapuccino"
            badgeIcon="fa-sliders"
            titulo="Creá tu"
            resaltado="combinación"
            descripcion="Elegí tu base, sumá toppings y mirá el precio calcularse en vivo."
        >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                {/* Constructor */}
                <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-md">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">1. Elegí tu base</p>
                    <div className="grid grid-cols-3 gap-3 mb-6">
                        {BASES.map((b, i) => (
                            <button key={i} onClick={() => setBase(i)} className={`relative p-3 rounded-2xl border-2 transition-all duration-300 ${base === i ? 'border-[#FF4D00] bg-[#FFF6F6] shadow-md scale-[1.03]' : 'border-gray-100 hover:border-[#FF4D00]/30'}`}>
                                <div className={`w-10 h-10 rounded-xl ${b.color} flex items-center justify-center text-white text-lg mx-auto mb-2`}><i className={`fas ${b.icon}`}></i></div>
                                <p className="text-[10px] font-black text-[#111827] text-center">{b.nombre}</p>
                                <p className="text-[9px] font-black text-[#FF4D00] text-center">Bs. {b.precio}</p>
                            </button>
                        ))}
                    </div>

                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">2. Agregá toppings</p>
                    <div className="grid grid-cols-2 gap-3 mb-6">
                        {TOPPINGS.map((t, i) => (
                            <button key={i} onClick={() => toggleTopping(i)} className={`flex items-center gap-2.5 p-3 rounded-2xl border-2 transition-all duration-300 ${toppings[i] ? 'border-[#FF4D00] bg-[#FFF6F6] shadow-sm' : 'border-gray-100 hover:border-[#FF4D00]/30 opacity-70'}`}>
                                <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-base shrink-0 ${toppings[i] ? 'bg-[#FF4D00] text-white' : 'bg-gray-100 text-gray-400'}`}><i className={`fas ${t.icon}`}></i></div>
                                <div className="text-left">
                                    <p className="text-[10px] font-black text-[#111827] leading-tight">{t.nombre}</p>
                                    <p className="text-[8px] font-black text-[#FF4D00]">+ Bs. {t.precio}</p>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Resultado */}
                <div className="relative">
                    <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white">
                        <img src={BASES[base].img} alt={BASES[base].nombre} className="w-full h-72 object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#5D3A1F]/80 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                            <p className="text-[9px] font-black uppercase tracking-widest text-amber-300 mb-1">Tu Frapuccino</p>
                            <h3 className="text-2xl font-black font-heading mb-2">{BASES[base].nombre}{toppings.some(Boolean) ? ' + extras' : ''}</h3>
                            <div className="flex flex-wrap gap-1.5 mb-3">
                                {TOPPINGS.map((t, i) => toppings[i] && (
                                    <span key={i} className="px-2.5 py-1 rounded-full bg-white/20 text-white text-[9px] font-black uppercase tracking-wider border border-white/25"><i className={`fas ${t.icon} mr-1 text-amber-300`}></i>{t.nombre}</span>
                                ))}
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-3xl font-black font-heading text-amber-300">Bs. {total}</span>
                                <a href="https://wa.me/59161320004" target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 bg-[#FF4D00] hover:bg-[#CC3D00] text-white rounded-full font-black text-[10px] uppercase tracking-[0.15em] shadow-lg transition-all">
                                    <i className="fab fa-whatsapp mr-1.5"></i>Pedir
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="absolute -top-4 -right-4 bg-white rounded-2xl p-3 shadow-xl border border-orange-100">
                        <p className="text-[8px] font-black uppercase tracking-widest text-slate-400 text-center">Total</p>
                        <p className="text-xl font-black font-heading text-[#FF4D00] text-center">Bs. {total}</p>
                    </div>
                </div>
            </div>
        </SeccionProducto>
    );
};

export default ConstructorFrapuccino;
