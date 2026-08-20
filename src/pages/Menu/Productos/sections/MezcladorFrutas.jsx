import React, { useState } from 'react';
import CircleParticles from '../../../../components/fondos/ParticulasCirculares';
import SeccionProducto from '../shared/SeccionProducto';

const FRUTAS = [
    { nombre: 'Banana', icon: 'fa-apple-whole', color: 'bg-yellow-400', precio: 2 },
    { nombre: 'Papaya', icon: 'fa-seedling', color: 'bg-orange-400', precio: 2 },
    { nombre: 'Mango', icon: 'fa-mango', color: 'bg-amber-500', precio: 2.5 },
    { nombre: 'Fresa', icon: 'fa-strawberry', color: 'bg-red-500', precio: 3 },
    { nombre: 'Chirimoya', icon: 'fa-spa', color: 'bg-green-400', precio: 2.5 },
    { nombre: 'Naranja', icon: 'fa-sun', color: 'bg-orange-500', precio: 2 },
];

const MezcladorFrutas = () => {
    const [selected, setSelected] = useState([true, true, false, false, false, false]);
    const [conLeche, setConLeche] = useState(false);

    const toggleFruta = (i) => setSelected(prev => prev.map((v, j) => j === i ? !v : v));

    const frutasElegidas = FRUTAS.filter((_, i) => selected[i]);
    const totalFrutas = frutasElegidas.reduce((sum, f) => sum + f.precio, 0);
    const total = totalFrutas + (conLeche ? 2 : 0);

    const nombres = frutasElegidas.length ? frutasElegidas.map(f => f.nombre).join(' + ') : 'Elegí tus frutas';

    return (
        <SeccionProducto
            badge="Mezclador de Frutas"
            badgeIcon="fa-blender"
            titulo="Armá tu"
            resaltado="licuado"
            descripcion="Elegí tus frutas favoritas y creá tu licuado ideal."
        >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                {/* Selector */}
                <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-md">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">1. Elegí tus frutas</p>
                    <div className="grid grid-cols-3 gap-3 mb-6">
                        {FRUTAS.map((f, i) => (
                            <button key={i} onClick={() => toggleFruta(i)} className={`relative p-3 rounded-2xl border-2 transition-all duration-300 ${selected[i] ? 'border-[#FF4D00] bg-[#FFF6F6] shadow-md scale-[1.03]' : 'border-gray-100 hover:border-[#FF4D00]/30 opacity-60'}`}>
                                <div className={`w-10 h-10 rounded-xl ${f.color} flex items-center justify-center text-white text-lg mx-auto mb-2 shadow-sm`}><i className={`fas ${f.icon}`}></i></div>
                                <p className="text-[10px] font-black text-[#111827] text-center">{f.nombre}</p>
                                {selected[i] && <i className="fas fa-check absolute top-1.5 right-1.5 text-[#FF4D00] text-xs"></i>}
                            </button>
                        ))}
                    </div>

                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">2. Base del licuado</p>
                    <div className="grid grid-cols-2 gap-3">
                        <button onClick={() => setConLeche(false)} className={`flex items-center gap-2.5 p-3 rounded-2xl border-2 transition-all ${!conLeche ? 'border-[#FF4D00] bg-[#FFF6F6]' : 'border-gray-100 hover:border-[#FF4D00]/30'}`}>
                            <div className="w-9 h-9 rounded-lg bg-sky-400 flex items-center justify-center text-white text-base shrink-0"><i className="fas fa-glass-water"></i></div>
                            <div className="text-left"><p className="text-[10px] font-black text-[#111827]">Con Agua</p><p className="text-[8px] font-black text-[#FF4D00]">+ Bs. 0</p></div>
                        </button>
                        <button onClick={() => setConLeche(true)} className={`flex items-center gap-2.5 p-3 rounded-2xl border-2 transition-all ${conLeche ? 'border-[#FF4D00] bg-[#FFF6F6]' : 'border-gray-100 hover:border-[#FF4D00]/30'}`}>
                            <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 text-base shrink-0"><i className="fas fa-glass-water"></i></div>
                            <div className="text-left"><p className="text-[10px] font-black text-[#111827]">Con Leche</p><p className="text-[8px] font-black text-[#FF4D00]">+ Bs. 2</p></div>
                        </button>
                    </div>
                </div>

                {/* Resultado */}
                <div className="relative">
                    <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white bg-gradient-to-br from-[#FF4D00] to-[#CC3D00] min-h-[300px] flex flex-col items-center justify-center p-8 text-center">
                        <CircleParticles count={16} colorScheme="dark" />
                        <div className="relative z-10">
                            <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center text-4xl text-white mx-auto mb-4 shadow-xl animate-bounce-slow">
                                <i className="fas fa-blender"></i>
                            </div>
                            <p className="text-[9px] font-black uppercase tracking-widest text-white/70 mb-1">Tu Licuado</p>
                            <h3 className="text-2xl font-black font-heading text-white mb-1">{nombres}</h3>
                            <p className="text-white/80 text-sm font-semibold mb-4">Base: {conLeche ? 'Con leche' : 'Con agua'}</p>
                            <div className="flex flex-wrap justify-center gap-1.5 mb-4">
                                {frutasElegidas.map((f, i) => (
                                    <span key={i} className={`px-2.5 py-1 rounded-full ${f.color} text-white text-[9px] font-black uppercase tracking-wider`}><i className={`fas ${f.icon} mr-1`}></i>{f.nombre}</span>
                                ))}
                                {!frutasElegidas.length && <span className="text-white/70 text-xs font-semibold">Sin frutas seleccionadas</span>}
                            </div>
                            <div className="text-3xl font-black font-heading text-amber-300">Bs. {total}</div>
                        </div>
                    </div>
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2">
                        <a href="https://wa.me/59161320004" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#FF4D00] rounded-full font-black text-[10px] uppercase tracking-[0.15em] shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all">
                            <i className="fab fa-whatsapp"></i> Pedir mi licuado
                        </a>
                    </div>
                </div>
            </div>
        </SeccionProducto>
    );
};

export default MezcladorFrutas;
