import React from 'react';
import FondoTech from '../../../components/fondos/FondoTech';

const ProcesoTrabajo = () => {
    const steps = [
        {
            num: "1",
            title: "Una idea simple",
            desc: "HagamosTech nace de una idea sencilla: ¿tenés una necesidad? Hagámosla realidad. Sin catálogos rígidos, empezando siempre por el problema de la persona.",
            icon: "fa-lightbulb",
            color: "text-[#84CC16]",
            bg: "bg-[#A3E635]/10"
        },
        {
            num: "2",
            title: "Proyecto de dos personas",
            desc: "Comenzamos como un pequeño proyecto de dos personas resolviendo necesidades concretas con herramientas tecnológicas y digitales.",
            icon: "fa-users",
            color: "text-[#0A0A0A]",
            bg: "bg-[#0A0A0A]/5"
        },
        {
            num: "3",
            title: "De la necesidad a la solución",
            desc: "Cada caso se trabaja bajo el modelo: Necesidad → Análisis → Propuesta → Desarrollo → Entrega. El cliente explica qué quiere, nosotros encontramos cómo.",
            icon: "fa-diagram-project",
            color: "text-[#84CC16]",
            bg: "bg-[#A3E635]/10"
        },
        {
            num: "4",
            title: "Marca multidisciplinaria",
            desc: "Nuestra visión es convertirnos en una marca de soluciones digitales multidisciplinaria: desarrollo, IA, automatización, diseño, marketing, educación y más.",
            icon: "fa-rocket",
            color: "text-[#84CC16]",
            bg: "bg-[#A3E635]/10"
        }
    ];

    return (
        <section id="origen" className="pt-4 pb-0 relative overflow-hidden reveal scroll-mt-24">
            <FondoTech />

            <div className="absolute left-[50%] top-0 bottom-0 w-px bg-gray-100 hidden lg:block"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-8 max-w-4xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading text-[#0A0A0A] leading-tight">
                        Conoce el recorrido de <br/>
                        <span className="relative inline-block text-[#84CC16] z-10">
                            nuestro origen
                            <svg className="absolute w-full h-3 -bottom-1 left-0 z-[-1] text-[#A3E635] drop-shadow-[0_0_8px_rgba(163,230,53,0.55)]" viewBox="0 0 200 12" preserveAspectRatio="none" fill="none"><path d="M8,8 C22,5 38,7.5 55,7.5 C130,7.5 165,7.5 188,7.5 C194,7.5 198,6 196,7.5" stroke="currentColor" strokeWidth="7" strokeLinecap="round"  />
                            </svg>
                        </span>
                    </h2>
                    <p className="mt-4 text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto text-base sm:text-lg">
                        Un camino que empezó convirtiendo necesidades en soluciones reales, paso a paso, para todo tipo de personas y negocios.
                    </p>

                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 max-w-3xl mx-auto">
                        {[
                            { label: 'Necesidad', icon: 'fa-bullseye' },
                            { label: 'Análisis', icon: 'fa-magnifying-glass' },
                            { label: 'Innovación', icon: 'fa-lightbulb' },
                            { label: 'Expansión', icon: 'fa-earth-americas' },
                        ].map((item) => (
                            <div key={item.label} className="rounded-xl bg-[#0A0A0A] text-white shadow-sm px-3 py-2.5 flex items-center justify-center gap-2">
                                <i className={`fas ${item.icon} text-[#A3E635] text-xs`}></i>
                                <span className="text-[11px] font-black uppercase tracking-widest">{item.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="relative max-w-4xl mx-auto pb-6">
                    <div className="hidden lg:block absolute left-1/2 top-3 bottom-3 w-0.5 -translate-x-1/2 z-0 border-l-2 border-dashed border-[#A3E635]/45"></div>
                    <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 z-0 bg-gradient-to-b from-transparent via-[#84CC16] to-transparent opacity-20 blur-sm"></div>

                    {steps.map((step, index) => (
                        <div key={index} className="flex flex-col lg:flex-row items-center gap-5 lg:gap-12 mb-8 lg:mb-10 last:mb-0 group relative">

                            <div className={`hidden lg:block absolute top-1/2 h-0.5 bg-gray-100 z-0 ${index % 2 === 0 ? 'right-1/2 w-14 bg-gradient-to-l' : 'left-1/2 w-14 bg-gradient-to-r'} from-[#84CC16]/60 to-transparent`}></div>

                            <div className="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white border-4 border-[#84CC16] z-0 shadow-sm group-hover:scale-125 transition-transform duration-300"></div>

                            <div className="order-1 lg:order-2 relative z-10 shrink-0">
                                <div className={`w-20 h-20 md:w-22 md:h-22 rounded-[1.6rem] ${step.bg} ${step.color} flex items-center justify-center text-3xl shadow-lg shadow-gray-200/50 relative border-4 border-white ring-1 ring-gray-100 group-hover:scale-105 transition-transform duration-500`}>
                                    <i className={`fa-solid ${step.icon}`}></i>
                                    <div className="absolute -top-2 -right-4 w-12 h-6 rounded-full bg-[#A3E635] text-[#0A0A0A] flex items-center justify-center text-[9px] font-black border-[3px] border-white">
                                        {step.num}
                                    </div>
                                </div>
                            </div>

                            <div className={`order-2 ${index % 2 === 0 ? 'lg:order-1 lg:text-right' : 'lg:order-3 lg:text-left'} flex-1 text-center lg:text-inherit`}>
                                <h3 className="text-xl md:text-2xl font-black font-heading text-[#111827] mb-2 group-hover:text-[#84CC16] transition-colors">{step.title}</h3>
                                <p className="text-base text-gray-500 font-medium leading-relaxed max-w-md mx-auto lg:mx-0">
                                    {step.desc}
                                </p>
                            </div>

                            <div className={`order-3 ${index % 2 === 0 ? 'lg:order-3' : 'lg:order-1'} flex-1 hidden lg:block`}></div>

                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProcesoTrabajo;
