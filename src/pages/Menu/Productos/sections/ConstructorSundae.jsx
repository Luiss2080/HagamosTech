import React, { useState } from 'react';
import SeccionProducto from '../shared/SeccionProducto';

const SABORES = [
    { nombre: 'Chocolate', precio: 12, img: '/img/05_Productos/Postres/SundaChocolate.png', color: 'bg-[#8B4513]' },
    { nombre: 'Vainilla', precio: 10, img: '/img/05_Productos/Postres/SundaeVainilla.png', color: 'bg-[#FF4D00]' },
    { nombre: 'Mixto', precio: 14, img: '/img/05_Productos/Postres/SundaMixto.png', color: 'bg-[#5D3A1F]' },
];

const TOPPINGS = [
    { nombre: 'Salsa Chocolate', precio: 2, icon: 'fa-droplet' },
    { nombre: 'Cereza', precio: 1, icon: 'fa-circle' },
    { nombre: 'Galletitas', precio: 1.5, icon: 'fa-cookie' },
    { nombre: 'Crema', precio: 2, icon: 'fa-whipped-cream' },
];

const ConstructorSundae = () => {
    const [sabor, setSabor] = useState(0);
    const [toppings, setToppings] = useState([true, true, false, false]);

    const toggleTopping = (i) => setToppings(prev => prev.map((v, j) => j === i ? !v : v));

    const precioBase = SABORES[sabor].precio;
    const precioToppings = TOPPINGS.reduce((sum, t, i) => sum + (toppings[i] ? t.precio : 0), 0);
    const total = precioBase + precioToppings;

    return (
        <SeccionProducto
            badge="Constructor de Sundae"
            badgeIcon="fa-ice-cream"
            titulo="Creá tu"
            resaltado="sundae"
            descripcion="Elegí tu sabor y agregá toppings para armar tu postre ideal."
        >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                {/* Constructor */}
                <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-md">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">1. Elegí tu sabor</p>
                    <div className="grid grid-cols-3 gap-3 mb-6">
                        {SABORES.map((s, i) => (
                            <button key={i} onClick={() => setSabor(i)} className={`relative overflow-hidden rounded-2xl border-2 transition-all duration-300 ${sabor === i ? 'border-[#FF4D00] shadow-md scale-[1.03]' : 'border-gray-100 hover:border-[#FF4D00]/30'}`}>
                                <img src={s.img} alt={s.nombre} className="w-full h-20 object-cover" />
                                <div className={`p-2 text-center ${sabor === i ? 'bg-[#FFF6F6]' : 'bg-white'}`}>
                                    <p className="text-[10px] font-black text-[#111827]">{s.nombre}</p>
                                    <p className="text-[9px] font-black text-[#FF4D00]">Bs. {s.precio}</p>
                                </div>
                            </button>
                        ))}
                    </div>

                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">2. Agregá toppings</p>
                    <div className="grid grid-cols-2 gap-3">
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
                        <img src={SABORES[sabor].img} alt={SABORES[sabor].nombre} className="w-full h-80 object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#5D3A1F]/80 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                            <p className="text-[9px] font-black uppercase tracking-widest text-amber-300 mb-1">Tu Sundae</p>
                            <h3 className="text-2xl font-black font-heading mb-2">Sundae de {SABORES[sabor].nombre}</h3>
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
                </div>
            </div>
        </SeccionProducto>
    );
};

export default ConstructorSundae;
