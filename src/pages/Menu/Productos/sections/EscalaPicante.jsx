import React, { useState } from 'react';
import CircleParticles from '../../../../components/fondos/ParticulasCirculares';
import SeccionProducto from '../shared/SeccionProducto';

const NIVELES = [
    { nivel: 'Dulce', rango: [0, 25], icon: 'fa-face-smile', color: 'bg-green-500', desc: 'El dulzor de la carne o pollo resalta por sí solo. Ideal para empezar.', img: '/img/05_Productos/Salteñas/Salteñas.png', nombre: 'Salteña Dulce' },
    { nivel: 'Suave', rango: [26, 50], icon: 'fa-face-grin', color: 'bg-[#FF4D00]', desc: 'Un toque apenas perceptible que acompaña sin quemar. Perfecta para el día a día.', img: '/img/05_Productos/Salteñas/PrecocidasCongeladas.png', nombre: 'Salteña Suave' },
    { nivel: 'Picante', rango: [51, 75], icon: 'fa-face-grin-stars', color: 'bg-[#CC3D00]', desc: 'El ají se nota bien pero no domina. Para paladares con experiencia.', img: '/img/05_Productos/Salteñas/PrecocidasCongeladasMax.png', nombre: 'Salteña Picante' },
    { nivel: 'Súper Picante', rango: [76, 100], icon: 'fa-fire', color: 'bg-red-600', desc: 'Solo para valientes. Ajíes seleccionados que desafían tu paladar al máximo.', img: '/img/05_Productos/Salteñas/CrudasCongeladas.png', nombre: 'Salteña Súper Picante' },
];

const EscalaPicante = () => {
    const [value, setValue] = useState(50);
    const actual = NIVELES.find(n => value >= n.rango[0] && value <= n.rango[1]) || NIVELES[0];
    const [flipped, setFlipped] = useState(false);

    return (
        <SeccionProducto
            badge="Encontrá tu Nivel"
            badgeIcon="fa-pepper-hot"
            titulo="¿Qué tan"
            resaltado="picante?"
            descripcion="Mové el control para descubrir cuál es tu salteña ideal."
        >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                {/* Slider */}
                <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-md">
                    <div className="text-center mb-6">
                        <div className={`w-20 h-20 rounded-full ${actual.color} text-white flex items-center justify-center text-4xl mx-auto mb-3 shadow-xl ring-4 ring-white transition-colors duration-500`}>
                            <i className={`fas ${actual.icon}`}></i>
                        </div>
                        <h3 className="text-2xl font-black font-heading text-[#8B4513]">{actual.nivel}</h3>
                        <p className="text-[11px] text-slate-500 font-semibold mt-1">{actual.desc}</p>
                    </div>

                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={value}
                        onChange={(e) => setValue(Number(e.target.value))}
                        className="w-full h-3 rounded-full appearance-none cursor-pointer"
                        style={{ background: 'linear-gradient(to right, #22c55e 0%, #FF4D00 50%, #dc2626 100%)' }}
                    />

                    <div className="flex justify-between mt-2 text-[9px] font-black uppercase tracking-wider text-slate-400">
                        <span>0 · Dulce</span>
                        <span>50 · Equilibrado</span>
                        <span>100 · Extremo</span>
                    </div>

                    <div className="flex justify-center gap-2 mt-6">
                        {NIVELES.map((n, i) => (
                            <button key={i} onClick={() => setValue(n.rango[0] + 12)} className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-wider transition-all ${actual.nivel === n.nivel ? 'bg-[#FF4D00] text-white shadow-md scale-105' : 'bg-[#FFF6F6] text-[#8B4513] border border-orange-100 hover:bg-[#FF4D00]/10'}`}>
                                {n.nivel}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Resultado con flip 3D */}
                <div className="flex justify-center" style={{ perspective: '1000px' }}>
                    <div className="w-full max-w-sm cursor-pointer" onClick={() => setFlipped(!flipped)} style={{ transformStyle: 'preserve-3d', transition: 'transform 0.7s cubic-bezier(0.4,0,0.2,1)', transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}>
                        {/* Frente */}
                        <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white" style={{ backfaceVisibility: 'hidden' }}>
                            <img src={actual.img} alt={actual.nombre} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-2 ${actual.color}`}>{actual.nivel}</span>
                                <h3 className="text-2xl font-black font-heading">{actual.nombre}</h3>
                                <p className="text-[11px] text-white/80 font-semibold mt-1">Tocá para ver el detalle</p>
                            </div>
                        </div>
                        {/* Dorso */}
                        <div className="absolute inset-0 rounded-[2.5rem] bg-white border-2 border-orange-100 p-8 flex flex-col items-center justify-center text-center shadow-xl" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                            <CircleParticles count={14} colorScheme="light" />
                            <div className="relative z-10">
                                <div className={`w-16 h-16 rounded-2xl ${actual.color} flex items-center justify-center text-white text-3xl mx-auto mb-4 shadow-lg`}><i className={`fas ${actual.icon}`}></i></div>
                                <h4 className="text-xl font-black font-heading text-[#8B4513] mb-2">{actual.nombre}</h4>
                                <p className="text-sm text-slate-500 font-semibold leading-relaxed">{actual.desc}</p>
                                <a href="https://wa.me/59161320004" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-4 px-6 py-2.5 bg-[#FF4D00] hover:bg-[#CC3D00] text-white rounded-full font-black text-[10px] uppercase tracking-[0.15em] shadow-lg transition-all">
                                    <i className="fab fa-whatsapp"></i> Pedir esta salteña
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </SeccionProducto>
    );
};

export default EscalaPicante;
