import React from 'react';
import CircuitBackground from '../../../components/fondos/FondoTech';

const PromoDestacada = () => {
    const combos = [
        { nombre: 'Combo Pacata', precio: 'Bs. 18', normal: 'Bs. 22', img: '/img/05_Productos/Salteñas/ComboPacata.png', desc: 'Salteña + refresco + postre casero. La mejor combinación para tu media mañana.', color: 'bg-[#FF4D00]' },
        { nombre: 'Desayuno HagamosTech', precio: 'Bs. 15', normal: 'Bs. 19', img: '/img/05_Productos/Combos/Desayuno.png', desc: 'Salteña + café o chocolatada + tostada con mantequilla. Arrancá el día con energía.', color: 'bg-[#5D3A1F]' },
        { nombre: 'Salteñas con Tostada', precio: 'Bs. 20', normal: 'Bs. 25', img: '/img/05_Productos/Combos/SalteñasConTostada.png', desc: '2 salteñas surtidas + tostada grande + jugo natural. Ideal para compartir.', color: 'bg-[#8B4513]' },
    ];

    return (
        <div className="relative">
            <section className="relative z-10 py-4">
                <div className="container mx-auto px-6 max-w-7xl relative z-20">
                    <div className="text-center mb-4 relative z-10">
                        <span className="inline-block py-1.5 px-4 rounded-full bg-[#FF4D00]/10 text-[#FF4D00] text-[10px] font-black tracking-widest uppercase mb-4 border border-[#FF4D00]/20">
                            <i className="fas fa-fire text-[#FF4D00] mr-1"></i> Promo del Día
                        </span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading text-[#8B4513] mb-3 leading-tight">
                            Combos que <span className="relative inline-block text-[#FF4D00]">
                                enamoran
                                <svg className="absolute w-full h-3 -bottom-1.5 left-0 z-[-1] text-amber-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.55)]" viewBox="0 0 200 12" preserveAspectRatio="none" fill="none"><path d="M8,8 C22,5 38,7.5 55,7.5 C130,7.5 165,7.5 188,7.5 C194,7.5 198,6 196,7.5" stroke="currentColor" strokeWidth="7" strokeLinecap="round"/></svg>
                            </span>
                        </h2>
                        <p className="text-[#1F2937] font-medium max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
                            Ofertas limitadas por día con la mejor relación precio-calidad. Pedí el tuyo antes de que se agote y disfrutá el sabor de siempre.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {combos.map((combo, i) => (
                            <div key={i} className={`relative rounded-[2rem] p-6 transition-all duration-500 group overflow-hidden border hover:-translate-y-1.5 z-10 text-center ${combo.color} text-white shadow-xl shadow-orange-950/10`}>
                                <div className="absolute top-0 left-0 w-full h-1 bg-white/40"></div>
                                {/* Orbes decorativos */}
                                <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-white/15 blur-2xl animate-float-slow pointer-events-none"></div>
                                <div className="absolute -bottom-12 -left-8 w-36 h-36 rounded-full bg-black/10 blur-2xl animate-float-medium pointer-events-none"></div>

                                {/* Badge descuento */}
                                <div className="absolute top-4 right-4 z-10 bg-white/20 backdrop-blur-sm text-white px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider border border-white/25">
                                    -{Math.round((1 - combo.precio.replace('Bs. ', '') / combo.normal.replace('Bs. ', '')) * 100)}%
                                </div>

                                <div className="relative z-10">
                                    <div className="w-28 h-28 mx-auto mb-4 overflow-hidden rounded-full border-4 border-white/30 shadow-lg group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-500">
                                        <img src={combo.img} alt={combo.nombre} className="w-full h-full object-cover" />
                                    </div>
                                    <h4 className="text-xl font-black mb-1 leading-tight">{combo.nombre}</h4>
                                    <p className="text-xs font-medium opacity-85 leading-relaxed mb-3">{combo.desc}</p>
                                    <div className="flex items-center justify-center gap-2 mb-4">
                                        <span className="text-sm font-black opacity-50 line-through">{combo.normal}</span>
                                        <span className="text-3xl font-black font-heading">{combo.precio}</span>
                                    </div>
                                    <a href="https://wa.me/59161320004" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 w-full justify-center py-3 rounded-full bg-white text-[#FF4D00] font-black text-[10px] uppercase tracking-[0.15em] shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-95 transition-all">
                                        <i className="fab fa-whatsapp"></i> Pedir este combo
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PromoDestacada;
