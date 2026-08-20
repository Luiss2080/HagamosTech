import React from 'react';
import { Link } from 'react-router-dom';
import CircuitBackground from '../../../components/fondos/FondoSaltenas';

const SABORES = [
    { icon: 'fa-drumstick-bite', label: 'Carne', color: 'bg-[#FF4D00]' },
    { icon: 'fa-egg', label: 'Pollo', color: 'bg-[#5D3A1F]' },
    { icon: 'fa-cheese', label: '4 Quesos', color: 'bg-[#8B4513]' },
    { icon: 'fa-leaf', label: 'Veggie', color: 'bg-[#4D7C0F]' },
];

const CtaCookies = () => {
    return (
        <div className="relative">
            <section className="relative z-10 py-10">
                <CircuitBackground />
                <div className="container mx-auto px-6 max-w-7xl relative z-20">
                    <div className="bg-gradient-to-br from-[#8B4513] via-[#5D3A1F] to-[#452A16] rounded-[2.5rem] p-8 sm:p-10 text-center shadow-2xl shadow-[#5D3A1F]/30 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FF4D00] via-amber-300 to-[#FF4D00]"></div>
                        <div className="absolute top-0 right-0 w-72 h-72 bg-[#FF4D00]/20 rounded-full blur-[80px] pointer-events-none animate-float-slow"></div>
                        <div className="absolute bottom-0 left-0 w-72 h-72 bg-black/20 rounded-full blur-[80px] pointer-events-none animate-float-medium"></div>
                        <div className="absolute -top-8 -left-8 w-40 h-40 rounded-full bg-white/10 blur-2xl pointer-events-none"></div>

                        <div className="relative z-10">
                            <div className="w-16 h-16 rounded-full bg-white/15 border border-white/25 flex items-center justify-center mx-auto mb-4 shadow-xl animate-bounce-slow">
                                <i className="fas fa-cookie-bite text-2xl text-amber-300"></i>
                            </div>

                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[9px] font-black uppercase tracking-widest text-amber-300 mb-3">
                                <i className="fas fa-fire text-[10px]"></i> Se acabó la teoría
                            </span>

                            <h2 className="text-3xl sm:text-4xl font-black font-heading text-white mb-3 leading-tight drop-shadow-lg">
                                ¿Cookies dulces o <span className="relative inline-block text-amber-300">
                                    salteñas?
                                    <svg className="absolute w-full h-3 -bottom-1.5 left-0 z-[-1] text-amber-300/60 drop-shadow-[0_0_8px_rgba(245,158,11,0.4)]" viewBox="0 0 200 12" preserveAspectRatio="none" fill="none"><path d="M8,8 C22,5 38,7.5 55,7.5 C130,7.5 165,7.5 188,7.5 C194,7.5 198,6 196,7.5" stroke="currentColor" strokeWidth="7" strokeLinecap="round"/></svg>
                                </span>
                            </h2>
                            <p className="text-white/85 font-semibold mb-5 max-w-lg mx-auto leading-relaxed">
                                Ahora que sabés todo sobre las cookies, dejá de leer y vení a probar las mejores salteñas de Santa Cruz.
                            </p>

                            {/* Sabores */}
                            <div className="flex flex-wrap justify-center gap-2 mb-5">
                                {SABORES.map((s, i) => (
                                    <span key={i} className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full ${s.color} text-white text-[9px] font-black uppercase tracking-wider shadow-md hover:-translate-y-0.5 transition-transform`}>
                                        <i className={`fas ${s.icon} text-[10px]`}></i> {s.label}
                                    </span>
                                ))}
                            </div>

                            {/* Botones */}
                            <div className="flex flex-wrap justify-center gap-3 mb-6">
                                <Link to="/menu/saltenas" className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#FF4D00] hover:bg-[#CC3D00] text-white rounded-full font-black text-xs uppercase tracking-[0.15em] shadow-xl shadow-orange-500/30 hover:shadow-2xl hover:-translate-y-1 active:scale-95 transition-all">
                                    <i className="fas fa-fire-burner text-lg"></i> Ver salteñas
                                </Link>
                                <a href="https://wa.me/59161320004?text=Hola%20Los%20HagamosTech!%20Quiero%20hacer%20un%20pedido" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#25D366] hover:bg-[#1DA851] text-white rounded-full font-black text-xs uppercase tracking-[0.15em] shadow-xl hover:shadow-2xl hover:-translate-y-1 active:scale-95 transition-all">
                                    <i className="fab fa-whatsapp text-lg"></i> Pedir ahora
                                </a>
                            </div>

                            <div className="inline-flex items-center gap-1.5 text-white/70 text-[9px] font-black uppercase tracking-widest">
                                <i className="fas fa-rotate text-amber-300"></i>Última actualización: enero 2026
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CtaCookies;
