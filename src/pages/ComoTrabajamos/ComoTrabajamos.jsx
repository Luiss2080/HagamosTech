import React from 'react';
import { useNavigate } from 'react-router-dom';
import FondoTech from '../../components/fondos/FondoTech';
import CircleParticles from '../../components/fondos/ParticulasCirculares';

const stepsData = [
    {
        num: "01",
        title: "Contanos",
        desc: "Explicamos tu necesidad, dificultad, problema o la idea que querés llevar a cabo. No necesitás tecnicismos, solo contanos tu objetivo.",
        icon: "fa-comments",
        theme: {
            cardBg: "bg-[#A3E635]",
            textColor: "text-[#0A0A0A]",
            descColor: "text-[#0A0A0A]/85",
            iconBg: "bg-[#0A0A0A]/10",
            iconColor: "text-[#0A0A0A]",
            badgeBg: "bg-[#0A0A0A] text-white",
            border: "border-[#84CC16]",
            shadow: "shadow-2xl shadow-[#A3E635]/25"
        }
    },
    {
        num: "02",
        title: "Analizamos",
        desc: "Estudiamos a fondo tu caso, determinamos qué herramientas tecnológicas y metodologías se adaptan mejor a tu necesidad real y definimos el camino.",
        icon: "fa-magnifying-glass-chart",
        theme: {
            cardBg: "bg-white",
            textColor: "text-[#0A0A0A]",
            descColor: "text-slate-600",
            iconBg: "bg-[#A3E635]/15",
            iconColor: "text-[#84CC16]",
            badgeBg: "bg-[#A3E635] text-[#0A0A0A]",
            border: "border-neutral-200",
            shadow: "shadow-2xl shadow-neutral-200/50"
        }
    },
    {
        num: "03",
        title: "Proponemos",
        desc: "Planteamos una propuesta clara con el alcance, tecnologías recomendadas, tiempos de entrega estimados y presupuesto transparente sin sorpresas.",
        icon: "fa-file-signature",
        theme: {
            cardBg: "bg-[#111111]",
            textColor: "text-white",
            descColor: "text-slate-400",
            iconBg: "bg-white/[0.04]",
            iconColor: "text-[#A3E635]",
            badgeBg: "bg-[#A3E635] text-[#0A0A0A]",
            border: "border-white/10",
            shadow: "shadow-2xl shadow-black/20"
        }
    },
    {
        num: "04",
        title: "Hacemos",
        desc: "Nuestro equipo se encarga del desarrollo, diseño y la construcción de tu solución, manteniéndote informado de los avances de manera constante.",
        icon: "fa-code",
        theme: {
            cardBg: "bg-[#A3E635]",
            textColor: "text-[#0A0A0A]",
            descColor: "text-[#0A0A0A]/85",
            iconBg: "bg-[#0A0A0A]/10",
            iconColor: "text-[#0A0A0A]",
            badgeBg: "bg-[#0A0A0A] text-white",
            border: "border-[#84CC16]",
            shadow: "shadow-2xl shadow-[#A3E635]/25"
        }
    },
    {
        num: "05",
        title: "Entregamos",
        desc: "Te entregamos la solución completamente funcional, lista para usar y con las pautas necesarias para que puedas gestionarla sin depender de nadie.",
        icon: "fa-circle-check",
        theme: {
            cardBg: "bg-white",
            textColor: "text-[#0A0A0A]",
            descColor: "text-slate-600",
            iconBg: "bg-[#A3E635]/15",
            iconColor: "text-[#84CC16]",
            badgeBg: "bg-[#A3E635] text-[#0A0A0A]",
            border: "border-neutral-200",
            shadow: "shadow-2xl shadow-neutral-200/50"
        }
    }
];

const ComoTrabajamos = () => {
    const navigate = useNavigate();

    return (
        <div id="how-we-work-page" className="relative overflow-hidden min-h-screen bg-[#050505] text-white">
            {/* Blobs de Fondo */}
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#A3E635]/10 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#84CC16]/10 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute top-[40%] left-[20%] w-[40%] h-[40%] bg-[#A3E635]/5 rounded-full blur-[140px] pointer-events-none"></div>

            {/* --- HERO SECTION --- */}
            <section className="relative z-10 pt-24 pb-16 border-b border-white/5">
                <FondoTech hideWaves={true} />
                <div className="container mx-auto px-6 max-w-5xl text-center relative z-20">
                    <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#A3E635]/10 border border-[#A3E635]/30 text-[10px] font-black uppercase tracking-[0.2em] text-[#A3E635] mb-6">
                        NUESTRA METODOLOGÍA
                    </span>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-black font-heading text-white leading-tight mb-6">
                        ¿Tenés una necesidad? <br />
                        <span className="relative inline-block px-2 text-[#84CC16]">
                            Hagámosla realidad.
                            <svg className="absolute w-full h-4 -bottom-1 left-0 z-[-1] text-[#A3E635]" viewBox="0 0 200 9" fill="none">
                                <path d="M2.00025 6.99997C25.7509 4.50435 65.2536 2.07897 197.994 4.4151" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </span>
                    </h1>
                    <p className="text-base sm:text-lg text-slate-400 font-medium leading-relaxed max-w-2xl mx-auto">
                        No necesitás saber de programación ni qué herramientas implementar. Simplemente contanos tu objetivo o problema, y nosotros nos encargamos de trazar el camino y construir la solución.
                    </p>
                </div>
            </section>

            {/* --- TIMELINE/CARDS SECTION --- */}
            <section className="relative z-10 py-20">
                <div className="container mx-auto px-6 max-w-7xl relative z-20">
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 justify-center">
                        {stepsData.map((step, idx) => (
                            <div 
                                key={idx} 
                                className={`relative rounded-[2.5rem] p-8 transition-all duration-500 group overflow-hidden border-2 ${step.theme.cardBg} ${step.theme.textColor} ${step.theme.shadow} ${step.theme.border} hover:-translate-y-2 z-10 flex flex-col justify-between min-h-[300px]`}
                            >
                                {/* Partículas de fondo para tarjetas oscuras */}
                                {step.theme.cardBg === 'bg-[#111111]' && (
                                    <div className="absolute inset-0 z-0 opacity-40">
                                        <CircleParticles count={6} colorScheme="dark" />
                                    </div>
                                )}

                                <div className="relative z-10 flex flex-col items-center text-center">
                                    {/* Icono flotante centrado */}
                                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl shadow-sm mb-6 ${step.theme.iconBg} ${step.theme.iconColor} group-hover:scale-110 transition-transform duration-300`}>
                                        <i className={`fas ${step.icon}`}></i>
                                    </div>

                                    {/* Número del paso */}
                                    <div className="absolute top-0 right-0 z-30">
                                        <span className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-[10px] font-black tracking-widest ${step.theme.badgeBg}`}>
                                            PASO {step.num}
                                        </span>
                                    </div>

                                    {/* Título y Descripción */}
                                    <h3 className="text-2xl font-black mb-3 tracking-tight leading-none uppercase">{step.title}</h3>
                                    <p className={`text-xs font-semibold leading-relaxed ${step.theme.descColor}`}>{step.desc}</p>
                                </div>
                            </div>
                        ))}

                        {/* Tarjeta CTA final dentro de la grilla */}
                        <div 
                            className="relative rounded-[2.5rem] p-8 transition-all duration-500 group overflow-hidden border-2 border-dashed border-[#A3E635]/30 bg-transparent text-white hover:border-[#A3E635] hover:-translate-y-2 z-10 flex flex-col justify-center items-center text-center min-h-[300px]"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-[#A3E635]/10 text-[#A3E635] flex items-center justify-center text-2xl mb-6 border border-[#A3E635]/20 animate-pulse">
                                <i className="fas fa-circle-question"></i>
                            </div>
                            <h3 className="text-xl font-black mb-3 tracking-tight leading-none text-[#A3E635]">¿Tenés una idea?</h3>
                            <p className="text-xs text-slate-400 font-semibold leading-relaxed mb-6">
                                Empecemos hoy mismo a trabajar en tu propuesta personalizada.
                            </p>
                            <button
                                onClick={() => navigate('/contactanos')}
                                className="px-5 py-2.5 rounded-full bg-[#A3E635] text-[#0A0A0A] font-black text-[10px] uppercase tracking-wider transition-all duration-300 hover:scale-105 hover:bg-[#84CC16] cursor-pointer shadow-lg shadow-[#A3E635]/15"
                            >
                                Contanos qué necesitás
                            </button>
                        </div>
                    </div>

                </div>
            </section>

            {/* --- CTA BOTTOM SECTION --- */}
            <section className="relative z-10 py-16 bg-[#111111]/45 border-t border-white/5">
                <div className="container mx-auto px-6 max-w-4xl text-center relative z-20">
                    <h2 className="text-2xl sm:text-3xl font-black text-white mb-4">Vos ponés la necesidad. Nosotros el camino.</h2>
                    <p className="text-xs sm:text-sm text-slate-400 font-medium mb-8 max-w-lg mx-auto">
                        HagamosTech es un espacio multidisciplinario creado para resolver de forma cercana y profesional. Escribinos sin compromiso.
                    </p>
                    <button
                        onClick={() => navigate('/contactanos')}
                        className="px-8 py-3 rounded-full bg-[#A3E635] text-[#0A0A0A] font-black text-xs uppercase tracking-wider transition-all duration-300 hover:scale-105 hover:bg-[#84CC16] cursor-pointer shadow-lg shadow-[#A3E635]/20"
                    >
                        Comenzar Ahora <i className="fa-solid fa-arrow-right ml-2 text-[10px]"></i>
                    </button>
                </div>
            </section>
        </div>
    );
};

export default ComoTrabajamos;
