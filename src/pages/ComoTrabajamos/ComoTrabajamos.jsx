import React from 'react';
import { useNavigate } from 'react-router-dom';
import FondoTech from '../../components/fondos/FondoTech';
import ProcessStepsCarousel from '../../components/ui/ProcessStepsCarousel';

const stepsData = [
    {
        num: "01",
        title: "Contanos",
        desc: "Explicamos tu necesidad, dificultad, problema o la idea que querés llevar a cabo. No necesitás tecnicismos, solo contanos tu objetivo.",
        icon: "fa-comments",
        image: '/img/08_Cards/metodo-conversamos.webp',
        category: 'PASO 01',
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
        desc: "Revisamos requisitos, funciones y viabilidad para identificar opciones que puedan responder a tu necesidad.",
        icon: "fa-magnifying-glass-chart",
        image: '/img/08_Cards/metodo-analizamos.webp',
        category: 'PASO 02',
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
        desc: "Acordamos alcance, entregables, etapas, tiempos estimados y presupuesto, conversando alternativas según tu situación.",
        icon: "fa-file-signature",
        image: '/img/08_Cards/metodo-proponemos.webp',
        category: 'PASO 03',
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
        desc: "Trabajamos sobre los entregables acordados y coordinamos las revisiones definidas para el proyecto.",
        icon: "fa-code",
        image: '/img/08_Cards/metodo-desarrollamos.webp',
        category: 'PASO 04',
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
        desc: "Presentamos los entregables acordados y las indicaciones de uso incluidas en la propuesta.",
        icon: "fa-circle-check",
        image: '/img/08_Cards/metodo-entregamos.webp',
        category: 'PASO 05',
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
                <FondoTech />
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
                        No necesitás llegar con una solución técnica definida. Contanos qué querés conseguir y revisamos opciones, alcance y etapas para avanzar.
                    </p>
                </div>
            </section>

            {/* --- TIMELINE/CARDS SECTION --- */}
            <section className="relative z-10 overflow-hidden py-20">
                <FondoTech />
                <div className="container mx-auto px-6 max-w-7xl relative z-20">
                    <header className="mx-auto mb-8 max-w-3xl text-center sm:mb-10">
                        <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#A3E635]/25 bg-[#A3E635]/[0.06] px-3 py-1.5 text-[10px] font-black uppercase tracking-[.2em] text-[#A3E635]">
                            Un proceso claro y conversado
                        </span>
                        <h2 className="text-3xl font-black uppercase leading-tight tracking-tight text-white sm:text-4xl">
                            De la idea a una <span className="text-[#A3E635]">propuesta concreta</span>
                        </h2>
                        <p className="mx-auto mt-4 max-w-2xl text-sm font-medium leading-relaxed text-slate-400 sm:text-base">
                            Avanzamos paso a paso: revisamos lo que necesitás, definimos qué incluye el trabajo y coordinamos cada entrega.
                        </p>
                    </header>
                    <ProcessStepsCarousel items={stepsData} label="Nuestra metodología de trabajo" />
                </div>
            </section>

            {/* --- CTA BOTTOM SECTION --- */}
            <section className="relative z-10 overflow-hidden border-t border-white/5 py-16">
                <FondoTech />
                <div className="container mx-auto px-6 max-w-4xl text-center relative z-20">
                    <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#A3E635]/25 bg-[#A3E635]/[0.06] px-3 py-1.5 text-[10px] font-black uppercase tracking-[.2em] text-[#A3E635]">Siguiente paso</span>
                    <h2 className="text-2xl sm:text-3xl font-black text-white mb-4">Conversemos sobre lo que necesitás.</h2>
                    <p className="text-xs sm:text-sm text-slate-400 font-medium mb-8 max-w-lg mx-auto">
                        Contanos tu objetivo y revisamos alternativas, alcance y condiciones de acuerdo con tu proyecto y tus posibilidades.
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

