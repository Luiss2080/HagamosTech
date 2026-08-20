import React from 'react';
import CircuitBackground from '../../../components/fondos/FondoSaltenas';
import CircleParticles from '../../../components/fondos/ParticulasCirculares';

const recursosData = [
    {
        title: "Pedidos Especiales",
        desc: "Cotiza salteñas para tus eventos, cumpleaños y reuniones corporativas.",
        icon: "fa-boxes-stacked",
        theme: {
            cardBg: "bg-[#FF4D00]",
            accentLine: "bg-[#5D3A1F]",
            iconBg: "bg-white/20",
            iconColor: "text-white",
            textColor: "text-white",
            descColor: "text-orange-100",
            borderColor: "border-[#FF4D00]",
            shadow: "shadow-2xl shadow-orange-500/20",
            buttonBg: "bg-white",
            buttonText: "text-[#FF4D00]",
            buttonHover: "hover:bg-[#5D3A1F] hover:text-white"
        },
        tags: [
            { label: "Eventos", icon: "fa-glass-cheers" },
            { label: "Por Mayor", icon: "fa-box" },
            { label: "Cumpleaños", icon: "fa-cake-candles" }
        ]
    },
    {
        title: "Atención al Cliente",
        desc: "Resolvemos tus dudas sobre horarios, sucursales y menú disponible.",
        icon: "fa-headset",
        theme: {
            cardBg: "bg-[#5D3A1F]",
            accentLine: "bg-[#FF4D00]",
            iconBg: "bg-white/10",
            iconColor: "text-[#FF4D00]",
            textColor: "text-white",
            descColor: "text-gray-300",
            borderColor: "border-[#5D3A1F]",
            shadow: "shadow-xl hover:shadow-2xl shadow-[#5D3A1F]/20",
            buttonBg: "bg-[#FF4D00]",
            buttonText: "text-white",
            buttonHover: "hover:bg-[#CC3D00] hover:text-white"
        },
        tags: [
            { label: "Menú", icon: "fa-utensils" },
            { label: "Horarios", icon: "fa-clock" },
            { label: "Sucursales", icon: "fa-store" }
        ]
    },
    {
        title: "Delivery Rápido",
        desc: "Consulta zonas de cobertura y pide tus salteñas calientes hasta tu puerta.",
        icon: "fa-motorcycle",
        theme: {
            cardBg: "bg-[#8B4513]",
            accentLine: "bg-[#FF4D00]",
            iconBg: "bg-white/20",
            iconColor: "text-white",
            textColor: "text-white",
            descColor: "text-white/90",
            borderColor: "border-[#8B4513]",
            shadow: "shadow-xl hover:shadow-2xl shadow-[#8B4513]/20",
            buttonBg: "bg-[#FF4D00]",
            buttonText: "text-white",
            buttonHover: "hover:bg-[#CC3D00] hover:text-white"
        },
        tags: [
            { label: "Cobertura", icon: "fa-map-location-dot" },
            { label: "Rápido", icon: "fa-bolt" },
            { label: "Caliente", icon: "fa-fire" }
        ]
    }
];

const Recursos = () => {
    return (
        <div className="relative">
            <section id="recursos" className="relative z-10 py-4">
                <CircuitBackground />
                <div className="container mx-auto px-6 max-w-6xl relative z-20">
                    <div className="text-center mb-4 relative z-10">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading text-[#8B4513] mb-4 leading-tight">
                            Recursos de <span className="relative inline-block px-2 text-[#FF4D00]">
                                Atención
                                <svg className="absolute w-full h-3 -bottom-1 left-0 z-[-1] text-slate-800 opacity-80" viewBox="0 0 200 9" fill="none"><path d="M2.00025 6.99997C25.7509 4.50435 65.2536 2.07897 197.994 4.4151" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                            </span>
                        </h2>
                        <p className="text-[#1F2937] font-medium max-w-3xl mx-auto text-base sm:text-lg leading-relaxed">Todo lo que necesitas saber para disfrutar del mejor sabor.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {recursosData.map((item, i) => (
                            <div key={i} className={`relative rounded-[2.5rem] p-8 md:p-10 transition-all duration-500 group overflow-hidden border ${item.theme.cardBg} ${item.theme.textColor} ${item.theme.shadow} ${item.theme.borderColor} hover:-translate-y-2 z-10`}>

                                {/* CircleParticles Background */}
                                <CircleParticles count={16} colorScheme="dark" />

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
                                                <span key={label} className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-white/70 text-[#5D3A1F] border border-white/80 inline-flex items-center gap-1.5">
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
        </div>
    );
};

export default Recursos;
