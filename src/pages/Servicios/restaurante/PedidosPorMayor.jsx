import React, { useState } from 'react';
import HeroServicio from './shared/HeroServicio';
import SeccionServicio from './shared/SeccionServicio';
import BeneficiosServicio from './shared/BeneficiosServicio';
import CtaServicio from './shared/CtaServicio';

const CANTIDADES = [
    { cantidad: '12', precio: 'Bs. 88', dcto: '8%', color: 'bg-[#FF4D00]', icon: 'fa-box' },
    { cantidad: '24', precio: 'Bs. 168', dcto: '12%', color: 'bg-[#5D3A1F]', icon: 'fa-cubes' },
    { cantidad: '50', precio: 'Bs. 335', dcto: '16%', color: 'bg-[#8B4513]', icon: 'fa-boxes-stacked' },
    { cantidad: '100+', precio: 'Cotización', dcto: 'Hasta 20%', color: 'bg-[#CC3D00]', icon: 'fa-warehouse' },
];

const PedidosPorMayor = () => {
    const [cantidad, setCantidad] = useState(24);
    const precios = { 12: 88, 24: 168, 50: 335 };

    const calcular = () => {
        if (precios[cantidad]) return precios[cantidad];
        return 0;
    };

    const ahorro = cantidad ? Math.round((1 - calcular() / (cantidad * 8)) * 100) : 0;

    return (
        <div className="relative overflow-hidden min-h-screen bg-[#fafafa]">
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#FFF6F6] rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-orange-50 rounded-full blur-[100px] pointer-events-none"></div>

            <HeroServicio
                titulo="Pedidos"
                resaltado="por Mayor."
                descripcion="Salteñas al por mayor para revendedores, negocios y emprendedores. Precios especiales según la cantidad."
            />

            {/* Tabla de precios interactiva */}
            <SeccionServicio
                badge="Precios por Cantidad"
                badgeIcon="fa-boxes-stacked"
                titulo="Comprá en"
                resaltado="grande"
                descripcion="Elegí tu cantidad y mirá cuánto ahorrás. Precios cada vez más bajos por volumen."
            >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
                    {/* Selector (7 cols) */}
                    <div className="lg:col-span-7 bg-white rounded-[2rem] ring-1 ring-orange-100 shadow-xl shadow-orange-950/5 p-6 sm:p-7 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FF4D00] via-[#8B4513] to-[#FF4D00]"></div>
                        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[#FF4D00]/10 blur-3xl animate-float-slow pointer-events-none"></div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-4">
                                <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#FF4D00] to-[#CC3D00] text-white flex items-center justify-center shadow-md">
                                    <i className="fas fa-box-open text-sm"></i>
                                </span>
                                <div>
                                    <p className="text-sm font-black font-heading text-[#8B4513] leading-tight">Elegí tu cantidad</p>
                                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Paso 1 · Seleccioná tu pedido</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
                                {CANTIDADES.map((c, i) => {
                                    const activa = c.cantidad === '100+' ? cantidad >= 100 : cantidad === parseInt(c.cantidad);
                                    return (
                                        <button
                                            key={i}
                                            onClick={() => setCantidad(c.cantidad === '100+' ? 100 : parseInt(c.cantidad))}
                                            className={`relative rounded-2xl border-2 p-3 text-center transition-all duration-300 overflow-hidden ${activa ? `${c.color} border-transparent text-white shadow-lg scale-[1.03]` : 'border-orange-50 bg-[#FFFDF9] hover:border-[#FF4D00]/40 hover:shadow-md'}`}
                                        >
                                            <div className="absolute -top-6 -right-6 w-16 h-16 rounded-full bg-white/15 blur-xl pointer-events-none"></div>
                                            <span className={`w-9 h-9 rounded-xl flex items-center justify-center mx-auto mb-2 ${activa ? 'bg-white/20 text-white' : 'bg-[#FFF6F6] text-[#FF4D00]'}`}>
                                                <i className={`fas ${c.icon} text-sm`}></i>
                                            </span>
                                            <p className={`text-xl font-black font-heading ${activa ? 'text-white' : 'text-[#8B4513]'}`}>{c.cantidad}</p>
                                            <p className={`text-[8px] font-black uppercase tracking-wider ${activa ? 'text-white/80' : 'text-slate-400'}`}>salteñas</p>
                                            <span className={`inline-block mt-1.5 px-2 py-0.5 rounded-full text-[8px] font-black ${activa ? 'bg-white/20 text-amber-300' : `${c.color} text-white`}`}>{c.dcto}</span>
                                        </button>
                                    );
                                })}
                            </div>

                            <div className="flex items-center gap-2 mb-3">
                                <span className="w-7 h-7 rounded-lg bg-[#FF4D00]/10 text-[#FF4D00] flex items-center justify-center">
                                    <i className="fas fa-piggy-bank text-[11px]"></i>
                                </span>
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Tu ahorro</p>
                            </div>
                            <div className="p-4 rounded-2xl bg-[#FFF6F6] border border-orange-100 flex items-center justify-between">
                                <div>
                                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-500">Precio unitario</p>
                                    <p className="text-xl font-black font-heading text-[#8B4513]">Bs. {calcular() ? (calcular() / cantidad).toFixed(1) : '—'}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-500">Ahorrás</p>
                                    <p className="text-2xl font-black font-heading text-[#FF4D00]">{ahorro}%</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Resultado (5 cols) */}
                    <div className="lg:col-span-5 relative">
                        <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white bg-gradient-to-br from-[#5D3A1F] to-[#452A16] min-h-[300px] flex flex-col justify-center p-8 text-white text-center h-full">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FF4D00] via-amber-300 to-[#FF4D00]"></div>
                            <div className="absolute top-0 right-0 w-56 h-56 bg-[#FF4D00]/20 rounded-full blur-[80px] pointer-events-none animate-float-slow"></div>
                            <div className="absolute bottom-0 left-0 w-56 h-56 bg-black/20 rounded-full blur-[80px] pointer-events-none animate-float-medium"></div>
                            <div className="relative z-10">
                                <div className="w-20 h-20 rounded-full bg-white/15 border border-white/25 flex items-center justify-center text-4xl text-amber-300 mx-auto mb-4 shadow-xl animate-bounce-slow">
                                    <i className="fas fa-box-open"></i>
                                </div>
                                <p className="text-[9px] font-black uppercase tracking-widest text-white/60 mb-1">Tu pedido por mayor</p>
                                <h3 className="text-3xl font-black font-heading mb-2">{cantidad} salteñas</h3>
                                <div className="flex items-center justify-center gap-3 mb-4">
                                    <span className="text-xl font-black text-white/40 line-through">Bs. {cantidad * 8}</span>
                                    <span className="text-4xl font-black font-heading text-amber-300">Bs. {calcular()}</span>
                                </div>
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/20 text-green-300 text-[10px] font-black uppercase tracking-wider border border-green-400/30 mb-5">
                                    <i className="fas fa-piggy-bank"></i> Ahorrás {ahorro}%
                                </div>
                                <div>
                                    <a href="https://wa.me/59161320004" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF4D00] hover:bg-[#CC3D00] text-white rounded-full font-black text-[10px] uppercase tracking-[0.15em] shadow-lg transition-all hover:-translate-y-0.5 active:scale-95">
                                        <i className="fab fa-whatsapp"></i> Cotizar pedido
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </SeccionServicio>

            <BeneficiosServicio
                beneficios={[
                    { icon: 'fa-hand-holding-dollar', titulo: 'Mejor precio', desc: 'Hasta 20% de descuento según la cantidad.' },
                    { icon: 'fa-truck-fast', titulo: 'Entrega coordinada', desc: 'Programamos la entrega para cuando la necesites.' },
                    { icon: 'fa-receipt', titulo: 'Facturación', desc: 'Emitimos factura con NIT para tu negocio.' },
                    { icon: 'fa-handshake', titulo: 'Atención personal', desc: 'Un asesor dedicado para tus pedidos recurrentes.' },
                ]}
                badge="Ventajas"
                titulo="Para tu"
                resaltado="negocio"
            />

            <CtaServicio
                frase="¿Tenés un negocio o querés revender? Cotizá tu pedido por mayor ahora y empezá a ahorrar desde la primera compra."
                gradiente="from-[#8B4513] via-[#5D3A1F] to-[#452A16]"
                whatsappTexto="Hola Los Castores! Quiero cotizar un pedido por mayor"
                badges={[
                    { icon: 'fa-tag', label: 'Hasta 20% OFF', color: 'bg-[#FF4D00]' },
                    { icon: 'fa-receipt', label: 'Factura con NIT', color: 'bg-[#5D3A1F]' },
                    { icon: 'fa-truck-fast', label: 'Entrega coordinada', color: 'bg-[#8B4513]' },
                ]}
            />
        </div>
    );
};

export default PedidosPorMayor;
