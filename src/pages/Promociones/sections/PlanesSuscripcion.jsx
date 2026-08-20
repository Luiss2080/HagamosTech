import React, { useState } from 'react';
import CircuitBackground from '../../../components/fondos/FondoSaltenas';

const MEMBRESIAS = [
    {
        name: 'Castor Bronce',
        desc: 'Para los que empiezan a disfrutar',
        priceMonthly: '50',
        priceAnnual: '40',
        badge: 'Básico',
        active: false,
        icon: 'fa-medal',
        benefits: [
            '2 salteñas gratis al mes',
            '10% en bebidas',
            'Puntos por cada compra',
            'Promos exclusivas',
        ],
        theme: {
            cardBg: 'bg-[#FF4D00]',
            accentLine: 'bg-[#5D3A1F]',
            iconBg: 'bg-white/20',
            checkBg: 'bg-white/20',
            checkColor: 'text-white',
            buttonBg: 'bg-white',
            buttonText: 'text-[#FF4D00]',
            buttonHover: 'hover:bg-[#5D3A1F] hover:text-white',
            borderColor: 'border-[#FF4D00]',
            shadow: 'shadow-xl hover:shadow-2xl shadow-orange-500/20',
        }
    },
    {
        name: 'Castor Plata',
        desc: 'Nuestro favorito para clientes frecuentes',
        priceMonthly: '120',
        priceAnnual: '96',
        badge: 'Más Popular',
        active: true,
        icon: 'fa-crown',
        benefits: [
            '6 salteñas gratis al mes',
            '15% en todo el menú',
            'Delivery gratis',
            'Puntos dobles',
            'Descuentos en combos',
        ],
        theme: {
            cardBg: 'bg-[#5D3A1F]',
            accentLine: 'bg-[#FF4D00]',
            iconBg: 'bg-white/10',
            checkBg: 'bg-white/10',
            checkColor: 'text-[#FF4D00]',
            buttonBg: 'bg-[#FF4D00]',
            buttonText: 'text-white',
            buttonHover: 'hover:bg-[#CC3D00] hover:text-white',
            borderColor: 'border-[#5D3A1F]',
            shadow: 'shadow-2xl shadow-[#5D3A1F]/25',
        }
    },
    {
        name: 'Castor Oro',
        desc: 'La experiencia premium completa',
        priceMonthly: '250',
        priceAnnual: '200',
        badge: 'Premium',
        active: false,
        icon: 'fa-gem',
        benefits: [
            '12 salteñas gratis al mes',
            '20% en todo el menú',
            'Delivery gratis ilimitado',
            'Mesa reservada prioritaria',
            'Degustaciones exclusivas',
            'Regalo de cumpleaños',
        ],
        theme: {
            cardBg: 'bg-[#8B4513]',
            accentLine: 'bg-[#FF4D00]',
            iconBg: 'bg-white/20',
            checkBg: 'bg-white/20',
            checkColor: 'text-white',
            buttonBg: 'bg-white',
            buttonText: 'text-[#8B4513]',
            buttonHover: 'hover:bg-[#FF4D00] hover:text-white',
            borderColor: 'border-[#8B4513]',
            shadow: 'shadow-xl hover:shadow-2xl shadow-[#8B4513]/25',
        }
    },
];

const PlanesSuscripcion = () => {
    const [isAnnual, setIsAnnual] = useState(false);

    return (
        <div className="relative">
            <section className="relative z-10 py-4">
                <CircuitBackground />
                <div className="container mx-auto px-6 max-w-7xl relative z-20">
                    <div className="text-center mb-4 relative z-10">
                        <span className="inline-block py-1.5 px-4 rounded-full bg-[#FF4D00]/10 text-[#FF4D00] text-[10px] font-black tracking-widest uppercase mb-4 border border-[#FF4D00]/20">
                            <i className="fas fa-user-check text-[#FF4D00] mr-1"></i> Membresía Castores
                        </span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading text-[#8B4513] mb-3 leading-tight">
                            Unite al <span className="relative inline-block text-[#FF4D00]">
                                club
                                <svg className="absolute w-full h-3 -bottom-1.5 left-0 z-[-1] text-amber-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.55)]" viewBox="0 0 200 12" preserveAspectRatio="none" fill="none"><path d="M8,8 C22,5 38,7.5 55,7.5 C130,7.5 165,7.5 188,7.5 C194,7.5 198,6 196,7.5" stroke="currentColor" strokeWidth="7" strokeLinecap="round"/></svg>
                            </span>
                        </h2>
                        <p className="text-[#1F2937] font-medium max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
                            Beneficios todos los días del año con ahorros reales en cada visita. Elegí tu plan y empezá a disfrutar de salteñas gratis, descuentos y mucho más.
                        </p>

                        <div className="inline-flex items-center gap-3 bg-white rounded-full p-1.5 border border-gray-100 shadow-sm mt-4">
                            <button onClick={() => setIsAnnual(false)} className={`px-5 py-2.5 rounded-full text-[11px] font-black uppercase tracking-wider transition-all ${!isAnnual ? 'bg-[#FF4D00] text-white shadow-md' : 'text-gray-500 hover:text-[#FF4D00]'}`}>Mensual</button>
                            <button onClick={() => setIsAnnual(true)} className={`px-5 py-2.5 rounded-full text-[11px] font-black uppercase tracking-wider transition-all ${isAnnual ? 'bg-[#FF4D00] text-white shadow-md' : 'text-gray-500 hover:text-[#FF4D00]'}`}>Anual <span className="ml-1 text-[9px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full">-20%</span></button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {MEMBRESIAS.map((plan, i) => (
                            <div key={i} className={`relative rounded-[2rem] p-6 sm:p-8 transition-all duration-500 group overflow-hidden border hover:-translate-y-1.5 z-10 text-center ${plan.active ? 'scale-105 shadow-2xl' : ''} ${plan.theme.cardBg} text-white ${plan.theme.borderColor} ${plan.theme.shadow}`}>
                                <div className="absolute top-0 left-0 w-full h-1 bg-white/40"></div>
                                <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-white/15 blur-2xl animate-float-slow pointer-events-none"></div>
                                <div className="absolute -bottom-12 -left-8 w-36 h-36 rounded-full bg-black/10 blur-2xl animate-float-medium pointer-events-none"></div>
                                <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-1.5 rounded-b-xl z-10 ${plan.theme.accentLine}`}></div>

                                {plan.active && (
                                    <div className="absolute -top-0.5 left-1/2 -translate-x-1/2 z-20">
                                        <span className="inline-block bg-white text-[#FF4D00] text-[8px] font-black uppercase tracking-wider px-4 py-1.5 rounded-b-xl shadow-lg">⭐ {plan.badge}</span>
                                    </div>
                                )}

                                <div className="relative z-10">
                                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-4 mx-auto ${plan.theme.iconBg}`}><i className={`fas ${plan.icon}`}></i></div>
                                    <h4 className="text-2xl font-black font-heading mb-1">{plan.name}</h4>
                                    <p className="text-xs font-medium opacity-80 mb-4">{plan.desc}</p>

                                    <div className="flex items-end justify-center gap-1 mb-4">
                                        <span className="text-lg font-black opacity-60">Bs.</span>
                                        <span className="text-5xl font-black font-heading leading-none">{isAnnual ? plan.priceAnnual : plan.priceMonthly}</span>
                                        <span className="text-xs font-black opacity-60 mb-1">/mes</span>
                                    </div>

                                    <div className="space-y-2 mb-6 text-left">
                                        {plan.benefits.map((ben, j) => (
                                            <div key={j} className="flex items-center gap-2">
                                                <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${plan.theme.checkBg}`}><i className={`fas fa-check text-[8px] ${plan.theme.checkColor}`}></i></div>
                                                <span className="text-[11px] font-semibold opacity-90">{ben}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <a href="https://wa.me/59161320004" target="_blank" rel="noopener noreferrer" className={`w-full py-3.5 rounded-full font-black text-[11px] uppercase tracking-[0.15em] flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all ${plan.theme.buttonBg} ${plan.theme.buttonText} ${plan.theme.buttonHover}`}>
                                        Elegir {plan.name} <i className="fas fa-arrow-right text-[10px]"></i>
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

export default PlanesSuscripcion;
