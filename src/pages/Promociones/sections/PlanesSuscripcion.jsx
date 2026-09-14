import React, { useState } from 'react';
import CircuitBackground from '../../../components/fondos/FondoTech';

const MEMBRESIAS = [
    {
        name: 'Soporte Esencial',
        desc: 'Para mantener tu web al día',
        priceMonthly: '250',
        priceAnnual: '200',
        badge: 'Básico',
        active: false,
        icon: 'fa-medal',
        benefits: [
            'Soporte por WhatsApp',
            'Actualizaciones de contenido',
            'Monitoreo mensual',
            'Backup semanal',
        ],
        theme: {
            cardBg: 'bg-[#111827]',
            accentLine: 'bg-[#A3E635]',
            iconBg: 'bg-white/20',
            checkBg: 'bg-white/20',
            checkColor: 'text-white',
            buttonBg: 'bg-[#111827]',
            buttonText: 'text-[#A3E635]',
            buttonHover: 'hover:bg-[#171717] hover:text-white',
            borderColor: 'border-[#A3E635]',
            shadow: 'shadow-xl hover:shadow-2xl shadow-lime-400/20/20',
        }
    },
    {
        name: 'Soporte Profesional',
        desc: 'Ideal para negocios en crecimiento',
        priceMonthly: '650',
        priceAnnual: '520',
        badge: 'Más Popular',
        active: true,
        icon: 'fa-crown',
        benefits: [
            'Todo lo del plan Esencial',
            'Hasta 8 h de cambios al mes',
            'Optimización de rendimiento',
            'Informe mensual',
            'Prioridad de respuesta',
        ],
        theme: {
            cardBg: 'bg-[#171717]',
            accentLine: 'bg-[#A3E635]',
            iconBg: 'bg-white/10',
            checkBg: 'bg-white/10',
            checkColor: 'text-[#A3E635]',
            buttonBg: 'bg-[#A3E635]',
            buttonText: 'text-[#0A0A0A]',
            buttonHover: 'hover:bg-[#84CC16] hover:text-white',
            borderColor: 'border-[#171717]',
            shadow: 'shadow-2xl shadow-[#171717]/25',
        }
    },
    {
        name: 'Soporte Empresa',
        desc: 'Para operaciones críticas',
        priceMonthly: '1200',
        priceAnnual: '960',
        badge: 'Premium',
        active: false,
        icon: 'fa-gem',
        benefits: [
            'Todo lo del plan Profesional',
            'Bolsa de 30 h de desarrollo',
            'Nuevas funcionalidades',
            'SLA de respuesta 4 h',
            'Asesoría estratégica',
            'Dashboard a medida',
        ],
        theme: {
            cardBg: 'bg-[#0A0A0A]',
            accentLine: 'bg-[#A3E635]',
            iconBg: 'bg-white/20',
            checkBg: 'bg-white/20',
            checkColor: 'text-white',
            buttonBg: 'bg-[#111827]',
            buttonText: 'text-white',
            buttonHover: 'hover:bg-[#A3E635] hover:text-[#0A0A0A]',
            borderColor: 'border-[#0A0A0A]',
            shadow: 'shadow-xl hover:shadow-2xl shadow-[#0A0A0A]/25',
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
                        <span className="inline-block py-1.5 px-4 rounded-full bg-[#A3E635]/10 text-[#A3E635] text-[10px] font-black tracking-widest uppercase mb-4 border border-[#A3E635]/20">
                            <i className="fas fa-user-check text-[#A3E635] mr-1"></i> Membresía HagamosTech
                        </span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading text-white mb-3 leading-tight">
                            Elegí tu <span className="relative inline-block text-[#A3E635]">
                                plan
                                <svg className="absolute w-full h-3 -bottom-1.5 left-0 z-[-1] text-lime-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.55)]" viewBox="0 0 200 12" preserveAspectRatio="none" fill="none"><path d="M8,8 C22,5 38,7.5 55,7.5 C130,7.5 165,7.5 188,7.5 C194,7.5 198,6 196,7.5" stroke="currentColor" strokeWidth="7" strokeLinecap="round"/></svg>
                            </span>
                        </h2>
                        <p className="text-slate-300 font-medium max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
                            Planes de soporte y evolución continua para que tu sitio o sistema esté siempre actualizado, seguro y funcionando. Elegí tu nivel y olvidate del mantenimiento.
                        </p>

                        <div className="inline-flex items-center gap-3 bg-[#111827] rounded-full p-1.5 border border-gray-100 shadow-sm mt-4">
                            <button onClick={() => setIsAnnual(false)} className={`px-5 py-2.5 rounded-full text-[11px] font-black uppercase tracking-wider transition-all ${!isAnnual ? 'bg-[#A3E635] text-[#0A0A0A] shadow-md' : 'text-slate-400 hover:text-[#A3E635]'}`}>Mensual</button>
                            <button onClick={() => setIsAnnual(true)} className={`px-5 py-2.5 rounded-full text-[11px] font-black uppercase tracking-wider transition-all ${isAnnual ? 'bg-[#A3E635] text-[#0A0A0A] shadow-md' : 'text-slate-400 hover:text-[#A3E635]'}`}>Anual <span className="ml-1 text-[9px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full">-20%</span></button>
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
                                        <span className="inline-block bg-[#111827] text-[#A3E635] text-[8px] font-black uppercase tracking-wider px-4 py-1.5 rounded-b-xl shadow-lg">⭐ {plan.badge}</span>
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
