import React from 'react';
import CircuitBackground from '../../../components/fondos/FondoTech';

const PromoDestacada = () => {
    const combos = [
        { nombre: 'Pack Landing Page', precio: 'Bs. 990', normal: 'Bs. 1300', img: 'https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?w=600&auto=format&fit=crop&q=60', desc: 'Landing de alta conversión con formulario de contacto, SEO básico y hosting por 1 año.', color: 'bg-[#111827]' },
        { nombre: 'Pack Automatización', precio: 'Bs. 1490', normal: 'Bs. 1900', img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=60', desc: 'Automatizamos tareas repetitivas y conectamos tus herramientas, formularios y correos.', color: 'bg-[#171717]' },
        { nombre: 'Pack Identidad + Web', precio: 'Bs. 1990', normal: 'Bs. 2600', img: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&auto=format&fit=crop&q=60', desc: 'Logo, manual de marca y sitio web corporativo listo para publicar.', color: 'bg-[#0A0A0A]' },
    ];

    return (
        <div className="relative">
            <section className="relative z-10 py-4">
                <div className="container mx-auto px-6 max-w-7xl relative z-20">
                    <div className="text-center mb-4 relative z-10">
                        <span className="inline-block py-1.5 px-4 rounded-full bg-[#A3E635]/10 text-[#A3E635] text-[10px] font-black tracking-widest uppercase mb-4 border border-[#A3E635]/20">
                            <i className="fas fa-fire text-[#A3E635] mr-1"></i> Promo del Mes
                        </span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading text-white mb-3 leading-tight">
                            Packs que <span className="relative inline-block text-[#A3E635]">
                                impulsan
                                <svg className="absolute w-full h-3 -bottom-1.5 left-0 z-[-1] text-lime-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.55)]" viewBox="0 0 200 12" preserveAspectRatio="none" fill="none"><path d="M8,8 C22,5 38,7.5 55,7.5 C130,7.5 165,7.5 188,7.5 C194,7.5 198,6 196,7.5" stroke="currentColor" strokeWidth="7" strokeLinecap="round"/></svg>
                            </span>
                        </h2>
                        <p className="text-slate-300 font-medium max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
                            Ofertas por tiempo limitado para arrancar tu proyecto: web, automatización e identidad reunidas a precio de pack.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {combos.map((combo, i) => (
                            <div key={i} className={`relative rounded-[2rem] p-6 transition-all duration-500 group overflow-hidden border hover:-translate-y-1.5 z-10 text-center ${combo.color} text-white shadow-xl shadow-black/30/10`}>
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
                                    <a href="https://wa.me/59161320004" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 w-full justify-center py-3 rounded-full bg-[#111827] text-[#A3E635] font-black text-[10px] uppercase tracking-[0.15em] shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-95 transition-all">
                                        <i className="fab fa-whatsapp"></i> Solicitar este pack
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
