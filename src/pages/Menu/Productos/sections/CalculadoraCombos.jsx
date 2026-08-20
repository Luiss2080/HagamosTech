import React, { useState } from 'react';
import CircleParticles from '../../../../components/fondos/ParticulasCirculares';
import SeccionProducto from '../shared/SeccionProducto';

const PERSONAS_OPCIONES = [2, 4, 6, 10];

const CALCULO = {
    2: { saltenas: 4, refrescos: 2, precio: 48 },
    4: { saltenas: 8, refrescos: 4, precio: 92 },
    6: { saltenas: 12, refrescos: 6, precio: 135 },
    10: { saltenas: 20, refrescos: 10, precio: 220 },
};

const CalculadoraCombos = () => {
    const [personas, setPersonas] = useState(4);
    const [incluirPostres, setIncluirPostres] = useState(true);

    const base = CALCULO[personas];
    const precioPostres = incluirPostres ? personas * 5 : 0;
    const total = base.precio + precioPostres;
    const precioNormal = base.saltenas * 8 + base.refrescos * 7 + precioPostres;

    const ahorro = Math.round(((precioNormal - total) / precioNormal) * 100);

    return (
        <SeccionProducto
            badge="Calculadora de Combos"
            badgeIcon="fa-calculator"
            titulo="Calculá tu"
            resaltado="combo"
            descripcion="Elegí cuántas personas van a comer y mirá cuánto ahorrás."
        >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                {/* Calculadora */}
                <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-md">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">1. ¿Cuántas personas?</p>
                    <div className="grid grid-cols-4 gap-3 mb-6">
                        {PERSONAS_OPCIONES.map((n, i) => (
                            <button key={i} onClick={() => setPersonas(n)} className={`relative p-4 rounded-2xl border-2 transition-all duration-300 ${personas === n ? 'border-[#FF4D00] bg-[#FFF6F6] shadow-md scale-[1.03]' : 'border-gray-100 hover:border-[#FF4D00]/30'}`}>
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg mx-auto mb-2 ${personas === n ? 'bg-[#FF4D00] text-white' : 'bg-[#FFF6F6] text-[#8B4513]'}`}><i className="fas fa-users"></i></div>
                                <p className="text-sm font-black text-[#111827] text-center">{n}</p>
                                <p className="text-[8px] font-black text-slate-400 uppercase tracking-wider text-center">personas</p>
                            </button>
                        ))}
                    </div>

                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">2. Extras</p>
                    <button onClick={() => setIncluirPostres(!incluirPostres)} className={`flex items-center gap-3 w-full p-4 rounded-2xl border-2 transition-all ${incluirPostres ? 'border-[#FF4D00] bg-[#FFF6F6]' : 'border-gray-100 hover:border-[#FF4D00]/30'}`}>
                        <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-lg shrink-0 ${incluirPostres ? 'bg-[#FF4D00] text-white' : 'bg-gray-100 text-gray-400'}`}><i className="fas fa-ice-cream"></i></div>
                        <div className="flex-1 text-left">
                            <p className="text-xs font-black text-[#111827]">Incluir postres</p>
                            <p className="text-[9px] text-slate-500 font-semibold">+ Bs. {personas * 5} · 1 sundae por persona</p>
                        </div>
                        <span className={`relative w-12 h-7 rounded-full transition-colors duration-300 ${incluirPostres ? 'bg-[#FF4D00]' : 'bg-gray-300'}`}>
                            <span className={`absolute top-0.5 w-6 h-6 rounded-full bg-white shadow-md transition-all duration-300 ${incluirPostres ? 'left-5.5' : 'left-0.5'}`}></span>
                        </span>
                    </button>
                </div>

                {/* Resultado */}
                <div className="relative">
                    <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white bg-gradient-to-br from-[#5D3A1F] to-[#452A16] min-h-[320px] flex flex-col justify-center p-8 text-white text-center">
                        <CircleParticles count={18} colorScheme="dark" />
                        <div className="relative z-10">
                            <div className="w-20 h-20 rounded-full bg-white/15 flex items-center justify-center text-4xl text-amber-300 mx-auto mb-4 shadow-xl">
                                <i className="fas fa-gift"></i>
                            </div>
                            <p className="text-[9px] font-black uppercase tracking-widest text-white/60 mb-1">Tu Combo</p>
                            <h3 className="text-2xl font-black font-heading mb-3">Para {personas} personas</h3>
                            <div className="flex justify-center gap-2 mb-4">
                                <span className="px-3 py-1.5 rounded-full bg-white/15 text-[11px] font-black border border-white/20"><i className="fas fa-drumstick-bite text-amber-300 mr-1"></i>{base.saltenas} salteñas</span>
                                <span className="px-3 py-1.5 rounded-full bg-white/15 text-[11px] font-black border border-white/20"><i className="fas fa-glass-water text-amber-300 mr-1"></i>{base.refrescos} refrescos</span>
                                {incluirPostres && <span className="px-3 py-1.5 rounded-full bg-white/15 text-[11px] font-black border border-white/20"><i className="fas fa-ice-cream text-amber-300 mr-1"></i>{personas} postres</span>}
                            </div>
                            <div className="flex items-center justify-center gap-3 mb-4">
                                <span className="text-lg font-black text-white/40 line-through">Bs. {precioNormal}</span>
                                <span className="text-4xl font-black font-heading text-amber-300">Bs. {total}</span>
                            </div>
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/20 text-green-300 text-[10px] font-black uppercase tracking-wider border border-green-400/30 mb-4">
                                <i className="fas fa-piggy-bank"></i> Ahorrás {ahorro}%
                            </div>
                            <div>
                                <a href="https://wa.me/59161320004" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF4D00] hover:bg-[#CC3D00] text-white rounded-full font-black text-[10px] uppercase tracking-[0.15em] shadow-lg transition-all">
                                    <i className="fab fa-whatsapp"></i> Reservar este combo
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </SeccionProducto>
    );
};

export default CalculadoraCombos;
