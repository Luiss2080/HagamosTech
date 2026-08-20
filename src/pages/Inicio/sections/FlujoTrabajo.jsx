import React from 'react';

const STEPS = [
    {
        num: '01',
        icon: 'fa-comment-dots',
        title: 'Contanos',
        desc: 'Explicás tu necesidad, problema o idea. No hace falta saber de tecnología.',
    },
    {
        num: '02',
        icon: 'fa-magnifying-glass',
        title: 'Analizamos',
        desc: 'Estudiamos qué necesita realmente tu proyecto y definimos el camino.',
    },
    {
        num: '03',
        icon: 'fa-lightbulb',
        title: 'Proponemos',
        desc: 'Planteamos una solución clara: alcance, propuesta y metodología de trabajo.',
    },
    {
        num: '04',
        icon: 'fa-screwdriver-wrench',
        title: 'Hacemos',
        desc: 'Desarrollamos y construimos la solución paso a paso, con vos.',
    },
    {
        num: '05',
        icon: 'fa-circle-check',
        title: 'Entregamos',
        desc: 'Recibís el resultado y las indicaciones necesarias para usarlo.',
    },
];

const FlujoTrabajo = () => {
    return (
        <section id="flujo" className="relative bg-[#0A0A0A] py-20 lg:py-28 border-y border-[#A3E635]/15 scroll-mt-24">
            <div className="container mx-auto px-6 lg:px-12 xl:px-16 max-w-[1280px]">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#A3E635]/10 border border-[#A3E635]/30 text-[#A3E635] text-[11px] font-black uppercase tracking-[0.18em] mb-5">
                        <i className="fas fa-diagram-project"></i> Cómo trabajamos
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-white leading-tight">
                        De tu problema a la <span className="text-[#A3E635]">solución real</span>
                    </h2>
                    <p className="text-white/60 mt-5 text-base sm:text-lg font-medium leading-relaxed">
                        Trabajamos en cinco pasos sencillos. “Hagamos” es una invitación: vos tenés la necesidad, la hacemos juntos.
                    </p>
                </div>

                <div className="relative">
                    {/* Connecting line on desktop */}
                    <div className="hidden lg:block absolute top-[44px] left-[8%] right-[8%] h-[2px] bg-gradient-to-r from-[#A3E635]/10 via-[#A3E635]/40 to-[#A3E635]/10"></div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                        {STEPS.map((step) => (
                            <div key={step.num} className="relative flex flex-col items-center text-center group">
                                <div className="relative z-10 w-[88px] h-[88px] rounded-full bg-[#0A0A0A] border-2 border-[#A3E635]/40 flex items-center justify-center mb-5 transition-all duration-300 group-hover:border-[#A3E635] group-hover:bg-[#A3E635] group-hover:scale-105">
                                    <span className="absolute -top-3 -left-2 text-[11px] font-black text-[#A3E635] bg-[#0A0A0A] border border-[#A3E635]/40 rounded-full px-2 py-0.5 group-hover:text-[#0A0A0A] group-hover:bg-[#A3E635] transition-colors">
                                        {step.num}
                                    </span>
                                    <i className={`fas ${step.icon} text-2xl text-[#A3E635] group-hover:text-[#0A0A0A] transition-colors`}></i>
                                </div>
                                <h3 className="text-white font-black text-lg mb-2">{step.title}</h3>
                                <p className="text-white/55 text-sm font-medium leading-snug max-w-[200px]">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FlujoTrabajo;
