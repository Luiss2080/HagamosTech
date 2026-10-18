import React from 'react';
import { useNavigate } from 'react-router-dom';
import FondoTech from '../../components/fondos/FondoTech';
import ServiceCardsCarousel from '../../components/ui/ServiceCardsCarousel';

const stepsData = [
    {
        num: "01",
        title: "Contanos",
        desc: "Explicamos tu necesidad, dificultad, problema o la idea que querés llevar a cabo. No necesitás tecnicismos, solo contanos tu objetivo.",
        icon: "fa-comments",
        image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=900&q=80',
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
        desc: "Estudiamos a fondo tu caso, determinamos qué herramientas tecnológicas y metodologías se adaptan mejor a tu necesidad real y definimos el camino.",
        icon: "fa-magnifying-glass-chart",
        image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=900&q=80',
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
        desc: "Planteamos una propuesta clara con el alcance, tecnologías recomendadas, tiempos de entrega estimados y presupuesto transparente sin sorpresas.",
        icon: "fa-file-signature",
        image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80',
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
        desc: "Nuestro equipo se encarga del desarrollo, diseño y la construcción de tu solución, manteniéndote informado de los avances de manera constante.",
        icon: "fa-code",
        image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80',
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
        desc: "Te entregamos la solución completamente funcional, lista para usar y con las pautas necesarias para que puedas gestionarla sin depender de nadie.",
        icon: "fa-circle-check",
        image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=900&q=80',
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
                    
                    <ServiceCardsCarousel items={stepsData} label="Nuestra metodología de trabajo" />

                    <div className="relative mt-8 overflow-hidden rounded-[2rem] border border-[#A3E635]/25 bg-[#111111] p-7 text-center sm:p-9">
                        <img src="/img/07_Servicios/soluciones/hero-soluciones-v2.webp" alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover opacity-20" />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/95 via-[#050505]/85 to-[#050505]/60" />
                        <div className="relative z-10 mx-auto max-w-2xl">
                            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-[#A3E635]/30 bg-[#A3E635]/10 text-xl text-[#A3E635]">
                                <i className="fas fa-circle-question" aria-hidden="true"></i>
                            </div>
                            <h3 className="mb-3 text-xl font-black tracking-tight text-white">¿Tenés una idea?</h3>
                            <p className="mb-6 text-sm font-medium leading-relaxed text-slate-300">
                                Empecemos hoy mismo a trabajar en tu propuesta personalizada.
                            </p>
                            <button
                                onClick={() => navigate('/contactanos')}
                                className="rounded-full bg-[#A3E635] px-6 py-3 text-[10px] font-black uppercase tracking-wider text-[#0A0A0A] shadow-lg shadow-[#A3E635]/15 transition-all duration-300 hover:scale-105 hover:bg-[#84CC16]"
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
                        HagamosTech es un espacio multidisciplinario creado para resolver de forma cercana y profesional. Escribinos con alternativas según tus posibilidades.
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
