import React, { useState, useEffect, useRef } from 'react';
import CircuitBackground from '../../../components/fondos/FondoSaltenas';
import CircleParticles from '../../../components/fondos/ParticulasCirculares';

const teamValues = [
    {
        name: 'Tradición',
        role: 'Nuestro Pilar',
        desc: 'Mantenemos intacta nuestra receta original desde 1989, preservando el verdadero sabor de la auténtica salteña boliviana.',
        icon: 'fa-book-open'
    },
    {
        name: 'Calidad Suprema',
        role: 'Nuestra Promesa',
        desc: 'Seleccionamos los mejores y más frescos ingredientes para garantizar que cada salteña cumpla con los estándares más altos.',
        icon: 'fa-star'
    },
    {
        name: 'Atención al Cliente',
        role: 'Nuestro Servicio',
        desc: 'Nos esforzamos por brindar una experiencia cálida y acogedora en cada una de nuestras sucursales y puntos de atención.',
        icon: 'fa-heart'
    },
    {
        name: 'Higiene y Seguridad',
        role: 'Nuestro Compromiso',
        desc: 'Nuestros procesos de producción cumplen con las más estrictas normativas de inocuidad alimentaria y limpieza.',
        icon: 'fa-pump-soap'
    },
    {
        name: 'Innovación',
        role: 'Nuestra Visión',
        desc: 'Siempre estamos en constante desarrollo para sorprenderte con nuevos sabores y mejorar nuestros servicios día a día.',
        icon: 'fa-lightbulb'
    }
];

const Valores = () => {
    const [currentCard, setCurrentCard] = useState(0);
    const [isSnapping, setIsSnapping] = useState(false);
    const cardRef = useRef(0);

    const cardsPerView = 3;

    useEffect(() => { cardRef.current = currentCard; }, [currentCard]);

    useEffect(() => {
        const timer = setInterval(() => {
            const next = cardRef.current + 1;
            if (next > teamValues.length) {
                setIsSnapping(true);
                setCurrentCard(0);
                setTimeout(() => setIsSnapping(false), 50);
            } else {
                setCurrentCard(next);
            }
        }, 3000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="relative">
            <section className="relative z-10 py-4 reveal">
                <CircuitBackground />
                <div className="container mx-auto px-6 max-w-screen-2xl relative z-20">
                    <div className="text-center mb-4">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading text-[#8B4513] mb-6 leading-tight">
                            Tradición y Calidad, <br/>
                            <span className="text-[#FF4D00] relative">
                                nuestra pasión.
                                <svg className="absolute w-full h-3 -bottom-1 left-0 z-[-1] text-amber-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.55)]" viewBox="0 0 200 12" preserveAspectRatio="none" fill="none"><path d="M8,8 C22,5 38,7.5 55,7.5 C130,7.5 165,7.5 188,7.5 C194,7.5 198,6 196,7.5" stroke="currentColor" strokeWidth="7" strokeLinecap="round" /></svg>
                            </span>
                        </h2>
                        <p className="text-[#1F2937] font-medium max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
                            Nuestros valores nos definen y nos impulsan cada día a entregar el mejor producto, combinando la receta original con la mejor atención.
                        </p>
                    </div>

                    <div className="overflow-hidden max-w-7xl mx-auto">
                        <div
                            className={`flex ${isSnapping ? '' : 'transition-transform duration-700 ease-in-out'}`}
                            style={{ transform: `translateX(-${currentCard * (100 / cardsPerView)}%)` }}
                        >
                            {[...teamValues, ...teamValues].map((member, index) => (
                                <div key={index}
                                    className="group min-w-0 px-2 w-full"
                                    style={{ flex: `0 0 ${100 / cardsPerView}%` }}
                                >
                                    <div className="bg-white rounded-[2.5rem] p-0 flex flex-col items-center text-center relative overflow-hidden transition-all duration-700 hover:shadow-2xl hover:shadow-[#FF4D00]/20 border border-gray-100/50 hover:-translate-y-2 h-full w-full">
                                        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-br from-[#FF4D00] to-[#CC3D00] overflow-hidden">
                                            <CircleParticles count={8} colorScheme="dark" />
                                            <div className="absolute bottom-0 left-0 right-0 h-10 bg-white rounded-t-[50%] transform translate-y-1/2 scale-x-150"></div>
                                        </div>

                                        <div className="absolute top-4 left-4 text-3xl text-white font-black select-none z-0">#</div>
                                        <div className="absolute top-4 right-4 text-4xl sm:text-5xl md:text-6xl text-white font-black font-heading select-none z-0">
                                            {(index % teamValues.length) + 1}
                                        </div>

                                        <div className="relative w-36 h-36 mb-4 z-10 mt-12">
                                            <div className="absolute inset-0 rounded-full border-[6px] border-white shadow-xl group-hover:scale-105 transition-transform duration-500 overflow-hidden bg-white">
                                                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#FFF6F6] via-white to-[#FFF6F6] text-[#FF4D00]">
                                                    <i className={`fas ${member.icon} text-[4.5rem] sm:text-[5rem] opacity-90`}></i>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="relative z-10 w-full flex flex-col items-center flex-grow px-4">
                                            <span className="inline-block py-1 px-4 rounded-full bg-[#FF4D00]/10 text-[#FF4D00] text-[10px] font-black uppercase tracking-widest mb-3">
                                                {member.role}
                                            </span>
                                            <h3 className="text-xl font-black font-heading text-[#8B4513] mb-2 group-hover:text-[#FF4D00] transition-colors leading-tight">{member.name}</h3>
                                            <p className="text-[13px] text-[#2b3a55] font-semibold leading-relaxed mb-8 px-2">
                                                {member.desc}
                                            </p>

                                            <div className="mt-auto pb-8 pt-4 flex justify-center gap-3 w-full">
                                                {[
                                                    { icon: member.icon, bg: 'bg-[#FF4D00] text-white' },
                                                    { icon: 'fa-heart', bg: 'bg-[#5D3A1F] text-white' },
                                                    { icon: 'fa-star', bg: 'bg-[#FF4D00] text-white' },
                                                    { icon: 'fa-check', bg: 'bg-[#5D3A1F] text-white' }
                                                ].map((f, fi) => (
                                                    <div key={fi} className={`w-9 h-9 rounded-full flex items-center justify-center shadow-sm transition-transform group-hover:scale-110 ${f.bg}`}>
                                                        <i className={`fas ${f.icon} text-[13px]`}></i>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-center gap-2 mt-6">
                        {teamValues.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentCard(index)}
                                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                                    currentCard % teamValues.length === index
                                        ? 'bg-[#FF4D00] w-6'
                                        : 'bg-gray-300 hover:bg-gray-400'
                                }`}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Valores;
