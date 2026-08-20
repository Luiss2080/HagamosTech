import React from 'react';
import FondoTech from '../../../components/fondos/FondoTech';
import CircleParticles from '../../../components/fondos/ParticulasCirculares';

const recursosData = [
    {
        title: "Consultas de Proyectos",
        desc: "Contanos tu idea, problema o necesidad y te ayudamos a definir la mejor solución tecnológica.",
        icon: "fa-lightbulb",
        theme: {
            cardBg: "bg-[#A3E635]",
            accentLine: "bg-[#0A0A0A]",
            iconBg: "bg-white/20",
            iconColor: "text-[#0A0A0A]",
            textColor: "text-[#0A0A0A]",
            descColor: "text-[#0A0A0A]/80",
            borderColor: "border-[#A3E635]",
            shadow: "shadow-2xl shadow-[#A3E635]/20",
            buttonBg: "bg-[#0A0A0A]",
            buttonText: "text-white",
            buttonHover: "hover:bg-[#171717] hover:text-white"
        },
        tags: [
            { label: "Ideas", icon: "fa-lightbulb" },
            { label: "Análisis", icon: "fa-magnifying-glass" },
            { label: "Propuestas", icon: "fa-diagram-project" }
        ]
    },
    {
        title: "Atención y Soporte",
        desc: "Resolvemos tus dudas sobre tecnología, proyectos académicos y acompañamiento digital.",
        icon: "fa-headset",
        theme: {
            cardBg: "bg-[#0A0A0A]",
            accentLine: "bg-[#A3E635]",
            iconBg: "bg-white/10",
            iconColor: "text-[#A3E635]",
            textColor: "text-white",
            descColor: "text-gray-300",
            borderColor: "border-[#0A0A0A]",
            shadow: "shadow-xl hover:shadow-2xl shadow-black/20",
            buttonBg: "bg-[#A3E635]",
            buttonText: "text-[#0A0A0A]",
            buttonHover: "hover:bg-[#84CC16] hover:text-[#0A0A0A]"
        },
        tags: [
            { label: "Tecnología", icon: "fa-microchip" },
            { label: "Academia", icon: "fa-graduation-cap" },
            { label: "Soporte", icon: "fa-circle-question" }
        ]
    },
    {
        title: "Soluciones Rápidas",
        desc: "Desde una página web hasta la automatización de un proceso para tu negocio.",
        icon: "fa-bolt",
        theme: {
            cardBg: "bg-[#171717]",
            accentLine: "bg-[#A3E635]",
            iconBg: "bg-white/20",
            iconColor: "text-white",
            textColor: "text-white",
            descColor: "text-white/90",
            borderColor: "border-[#171717]",
            shadow: "shadow-xl hover:shadow-2xl shadow-black/20",
            buttonBg: "bg-[#A3E635]",
            buttonText: "text-[#0A0A0A]",
            buttonHover: "hover:bg-[#84CC16] hover:text-[#0A0A0A]"
        },
        tags: [
            { label: "Web", icon: "fa-globe" },
            { label: "Automatización", icon: "fa-gear" },
            { label: "IA", icon: "fa-robot" }
        ]
    }
];

const Recursos = () => {
    return (
        <div className="relative">
            <section id="recursos" className="relative z-10 py-4">
                <FondoTech />
                <div className="container mx-auto px-6 max-w-6xl relative z-20">
                    <div className="text-center mb-4 relative z-10">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading text-white mb-4 leading-tight">
                            Recursos de <span className="relative inline-block px-2 text-[#84CC16]">
                                Atención
                                <svg className="absolute w-full h-3 -bottom-1 left-0 z-[-1] text-[#A3E635] opacity-80" viewBox="0 0 200 9" fill="none"><path d="M2.00025 6.99997C25.7509 4.50435 65.2536 2.07897 197.994 4.4151" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                            </span>
                        </h2>
                        <p className="text-white/70 font-medium max-w-3xl mx-auto text-base sm:text-lg leading-relaxed">Todo lo que necesitás saber para empezar a convertir tu necesidad en solución.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {recursosData.map((item, i) => (
                                <div key={i} className={`relative rounded-[2.5rem] p-8 md:p-10 transition-all duration-500 group overflow-hidden border ${item.theme.cardBg} ${item.theme.textColor} ${item.theme.shadow} ${item.theme.borderColor} hover:-translate-y-2 z-10`}>

                                    {/* Top Accent Line */}
                                <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-1.5 rounded-b-xl z-10 ${item.theme.accentLine}`}></div>

                                <div className="relative z-10 flex flex-col h-full items-center text-center">

                                    {/* Icon Centered */}
                                    <div className={`w-20 h-20 rounded-3xl flex items-center justify-center text-3xl shadow-sm mb-8 ${item.theme.iconBg} ${item.theme.iconColor} group-hover:scale-110 transition-transform duration-300`}>
                                        <i className={`fas ${item.icon}`}></i>
                                    </div>

                                    <div className="absolute top-6 right-6 text-xs font-black uppercase tracking-widest opacity-70">
                                        <i className="fas fa-sparkles mr-1"></i> TOP
                                    </div>

                                    <h3 className="text-2xl font-black mb-4 tracking-tight leading-none">{item.title}</h3>
                                    <p className={`text-sm font-medium mb-8 leading-relaxed ${item.theme.descColor}`}>{item.desc}</p>

                                    <div className="flex flex-wrap justify-center gap-2 mb-6">
                                        {item.tags.map((tag) => {
                                            const label = typeof tag === 'string' ? tag : tag.label;
                                            const icon = typeof tag === 'string' ? null : tag.icon;

                                            return (
                                                <span key={label} className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-white/70 text-[#0A0A0A] border border-white/80 inline-flex items-center gap-1.5">
                                                    {icon && <i className={`fas ${icon} text-[10px]`}></i>}
                                                    {label}
                                                </span>
                                            );
                                        })}
                                    </div>

                                    <div className={`mt-auto w-full py-4 rounded-full font-black text-xs uppercase tracking-[0.15em] transition-all flex items-center justify-center gap-3 group/btn border-2 border-transparent ${item.theme.buttonBg} ${item.theme.buttonText} ${item.theme.buttonHover} shadow-lg shadow-black/10 hover:-translate-y-0.5 hover:shadow-xl`}>
                                        Explorar <i className="fa-solid fa-arrow-right group-hover/btn:translate-x-1 transition-transform"></i>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Ola de cierre (estilo FondoTech) */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] rotate-180 opacity-60 z-0">
                <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-[calc(100%+1.3px)] h-[80px] block">
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-[#A3E635]"></path>
                </svg>
            </div>
        </div>
    );
};

export default Recursos;
