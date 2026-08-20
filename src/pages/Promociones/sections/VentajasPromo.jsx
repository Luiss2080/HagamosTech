import React from 'react';
import CircuitBackground from '../../../components/fondos/FondoTech';

const BENEFICIOS = [
    { icon: 'fa-truck-fast', title: 'Delivery Gratis', desc: 'En pedidos de 12+ salteñas dentro del 3er anillo. Llegan calentitas en menos de 30 minutos.', color: 'bg-[#FF4D00]' },
    { icon: 'fa-hand-holding-dollar', title: 'Precio al Por Mayor', desc: 'Descuentos de hasta el 20% en pedidos grandes para eventos, oficinas y celebraciones.', color: 'bg-[#5D3A1F]' },
    { icon: 'fa-calendar-check', title: 'Reserva Anticipada', desc: 'Reservá tu pedido con 24 horas de anticipación y asegurá disponibilidad garantizada.', color: 'bg-[#8B4513]' },
    { icon: 'fa-gift', title: 'Promos de Temporada', desc: 'Cada mes lanzamos combos especiales y promociones sorpresa para clientes frecuentes.', color: 'bg-[#CC3D00]' },
];

const STATS = [
    { num: '20%', label: 'Dcto. por mayor', color: 'from-[#FF4D00] to-[#CC3D00]' },
    { num: '30 min', label: 'Delivery', color: 'from-[#5D3A1F] to-[#452A16]' },
    { num: '24 hs', label: 'Reserva previa', color: 'from-[#8B4513] to-[#6B3410]' },
    { num: '4.9★', label: 'Satisfacción', color: 'from-[#CC3D00] to-[#AA3000]' },
];

const VentajasPromo = () => {
    return (
        <div className="relative">
            <section className="relative z-10 py-4">
                <CircuitBackground />
                <div className="container mx-auto px-6 max-w-7xl relative z-20">
                    <div className="text-center mb-4 relative z-10">
                        <span className="inline-block py-1.5 px-4 rounded-full bg-[#8B4513]/10 text-[#8B4513] text-[10px] font-black tracking-widest uppercase mb-4 border border-[#8B4513]/20">
                            <i className="fas fa-circle-check text-[#8B4513] mr-1"></i> Por Qué Aprovechar
                        </span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading text-[#8B4513] mb-3 leading-tight">
                            Beneficios para <span className="relative inline-block text-[#FF4D00]">
                                vos
                                <svg className="absolute w-full h-3 -bottom-1.5 left-0 z-[-1] text-amber-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.55)]" viewBox="0 0 200 12" preserveAspectRatio="none" fill="none"><path d="M8,8 C22,5 38,7.5 55,7.5 C130,7.5 165,7.5 188,7.5 C194,7.5 198,6 196,7.5" stroke="currentColor" strokeWidth="7" strokeLinecap="round"/></svg>
                            </span>
                        </h2>
                        <p className="text-[#1F2937] font-medium max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
                            Aprovechá cada beneficio pensado para que disfrutes más y pagues menos en cada visita a HagamosTech.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {BENEFICIOS.map((item, i) => (
                            <div key={i} className={`relative rounded-[2rem] p-6 transition-all duration-500 group overflow-hidden border hover:-translate-y-1.5 z-10 text-center ${item.color} text-white shadow-xl shadow-orange-950/10`}>
                                <div className="absolute top-0 left-0 w-full h-1 bg-white/40"></div>
                                <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-white/15 blur-2xl animate-float-slow pointer-events-none"></div>
                                <div className="absolute -bottom-12 -left-8 w-36 h-36 rounded-full bg-black/10 blur-2xl animate-float-medium pointer-events-none"></div>
                                <div className="relative z-10">
                                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-4 mx-auto bg-white/20 ring-1 ring-white/40 shadow-lg group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300">
                                        <i className={`fas ${item.icon}`}></i>
                                    </div>
                                    <h4 className="text-lg font-black mb-2 leading-tight">{item.title}</h4>
                                    <p className="text-xs font-medium opacity-90 leading-relaxed">{item.desc}</p>
                                    <div className="mt-4 pt-3 border-t border-white/25 inline-flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest opacity-80">
                                        <i className="fas fa-check-circle text-[9px]"></i> Incluido
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
                        {STATS.map((s, i) => (
                            <div key={i} className={`relative rounded-[2rem] p-5 bg-gradient-to-br ${s.color} text-white text-center overflow-hidden shadow-lg`}>
                                <div className="absolute top-0 left-0 w-full h-1 bg-white/40"></div>
                                <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-white/15 blur-2xl animate-float-slow pointer-events-none"></div>
                                <div className="relative z-10">
                                    <p className="text-2xl sm:text-3xl font-black font-heading mb-1">{s.num}</p>
                                    <p className="text-[9px] font-black uppercase tracking-widest opacity-80">{s.label}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default VentajasPromo;
