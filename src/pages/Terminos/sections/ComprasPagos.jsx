import React from 'react';
import CircuitBackground from '../../../components/fondos/FondoSaltenas';

const POLITICAS = [
    { icon: 'fa-credit-card', titulo: 'Métodos de Pago', desc: 'Aceptamos efectivo, QR Simple, transferencia y POS próximamente. Todos los pagos se confirman antes de preparar el pedido.', color: 'bg-[#FF4D00]' },
    { icon: 'fa-rotate-left', titulo: 'Cancelaciones', desc: 'Podés cancelar gratis hasta 30 minutos antes de la entrega. Si cancelás después, podés retirar el pedido igual.', color: 'bg-[#5D3A1F]' },
    { icon: 'fa-receipt', titulo: 'Facturación', desc: 'Indicá tu NIT al hacer el pedido. Recibís comprobante digital y factura física en local al día siguiente.', color: 'bg-[#8B4513]' },
    { icon: 'fa-shield', titulo: 'Seguridad', desc: 'Tus datos de pago están cifrados y nunca se comparten con terceros. Los pagos se procesan por plataformas seguras.', color: 'bg-[#CC3D00]' },
];

const ComprasPagos = () => {
    return (
        <div className="relative">
            <section className="relative z-10 py-4">
                <CircuitBackground />
                <div className="container mx-auto px-6 max-w-7xl relative z-20">
                    <div className="text-center mb-4 relative z-10">
                        <span className="inline-block py-1.5 px-4 rounded-full bg-[#8B4513]/10 text-[#8B4513] text-[10px] font-black tracking-widest uppercase mb-4 border border-[#8B4513]/20">
                            <i className="fas fa-wallet text-[#8B4513] mr-1"></i> Compras y Pagos
                        </span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading text-[#8B4513] mb-3 leading-tight">
                            Políticas de <span className="relative inline-block text-[#FF4D00]">
                                compra
                                <svg className="absolute w-full h-3 -bottom-1.5 left-0 z-[-1] text-amber-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.55)]" viewBox="0 0 200 12" preserveAspectRatio="none" fill="none"><path d="M8,8 C22,5 38,7.5 55,7.5 C130,7.5 165,7.5 188,7.5 C194,7.5 198,6 196,7.5" stroke="currentColor" strokeWidth="7" strokeLinecap="round"/></svg>
                            </span>
                        </h2>
                        <p className="text-[#1F2937] font-medium max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
                            Así manejamos tus compras, pagos y facturación.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {POLITICAS.map((item, i) => (
                            <div key={i} className={`relative rounded-[2rem] p-6 transition-all duration-500 group overflow-hidden border hover:-translate-y-1.5 z-10 text-center ${item.color} text-white shadow-xl shadow-orange-950/10`}>
                                <div className="absolute top-0 left-0 w-full h-1 bg-white/40"></div>
                                {/* Orbes decorativos */}
                                <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-white/15 blur-2xl animate-float-slow pointer-events-none"></div>
                                <div className="absolute -bottom-12 -left-8 w-36 h-36 rounded-full bg-black/10 blur-2xl animate-float-medium pointer-events-none"></div>

                                <div className="relative z-10">
                                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-4 mx-auto bg-white/20 ring-1 ring-white/40 shadow-lg group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300">
                                        <i className={`fas ${item.icon}`}></i>
                                    </div>
                                    <h3 className="text-lg font-black mb-2 leading-tight">{item.titulo}</h3>
                                    <p className="text-xs font-medium opacity-90 leading-relaxed">{item.desc}</p>
                                    <div className="mt-4 pt-3 border-t border-white/25 inline-flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest opacity-80">
                                        <i className="fas fa-hand-holding-dollar text-[9px]"></i> Los Castores
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ComprasPagos;
