import React, { useState, useEffect, useRef } from 'react';
import FondoTech from '../../../components/fondos/FondoTech';
import CircleParticles from '../../../components/fondos/ParticulasCirculares';

const teamValues = [
    {
        name: 'Cercanía',
        role: 'Nuestra esencia',
        desc: 'Hablamos claro y humano. No somos una empresa excesivamente corporativa: trabajamos con vos, no sobre vos.',
        icon: 'fa-handshake'
    },
    {
        name: 'Creatividad',
        role: 'Nuestra energía',
        desc: 'Buscamos la mejor forma de resolver tu necesidad, combinando tecnología, diseño e ideas nuevas.',
        icon: 'fa-paintbrush'
    },
    {
        name: 'Resolutividad',
        role: 'Nuestro compromiso',
        desc: 'No dejamos tu problema a medias. Analizamos, proponemos y construimos hasta entregarte la solución.',
        icon: 'fa-screwdriver-wrench'
    },
    {
        name: 'Modernidad',
        role: 'Nuestra imagen',
        desc: 'Negro, verde lima y blanco: una identidad moderna, tecnológica, creativa y cercana.',
        icon: 'fa-bolt'
    },
    {
        name: 'Accesibilidad',
        role: 'Nuestra puerta abierta',
        desc: 'No necesitás saber qué tecnología usar. Contanos el problema y nosotros encontramos el camino.',
        icon: 'fa-door-open'
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
        <div id="valores" className="relative scroll-mt-24">
            <section className="relative z-10 py-4 reveal">
                <FondoTech />
                <div className="container mx-auto px-6 max-w-screen-2xl relative z-20">
                    <div className="text-center mb-4">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading text-[#0A0A0A] mb-6 leading-tight">
                            Personalidad y <br/>
                            <span className="text-[#84CC16] relative">
                                valores.
                                <svg className="absolute w-full h-3 -bottom-1 left-0 z-[-1] text-[#A3E635] drop-shadow-[0_0_8px_rgba(163,230,53,0.55)]" viewBox="0 0 200 12" preserveAspectRatio="none" fill="none"><path d="M8,8 C22,5 38,7.5 55,7.5 C130,7.5 165,7.5 188,7.5 C194,7.5 198,6 196,7.5" stroke="currentColor" strokeWidth="7" strokeLinecap="round" /></svg>
                            </span>
                        </h2>
                        <p className="text-slate-600 font-medium max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
                            HagamosTech se comunica de forma sencilla y humana. Estos son los principios que nos definen y nos impulsan a resolver lo que sea necesario.
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
                                    <div className="bg-white rounded-[2.5rem] p-0 flex flex-col items-center text-center relative overflow-hidden transition-all duration-700 hover:shadow-2xl hover:shadow-[#A3E635]/20 border border-gray-100/50 hover:-translate-y-2 h-full w-full">
                                        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-br from-[#0A0A0A] to-[#171717] overflow-hidden">
                                            <CircleParticles count={8} colorScheme="dark" />
                                            <div className="absolute bottom-0 left-0 right-0 h-10 bg-white rounded-t-[50%] transform translate-y-1/2 scale-x-150"></div>
                                        </div>

                                        <div className="absolute top-4 left-4 text-3xl text-white font-black select-none z-0">#</div>
                                        <div className="absolute top-4 right-4 text-4xl sm:text-5xl md:text-6xl text-white font-black font-heading select-none z-0">
                                            {(index % teamValues.length) + 1}
                                        </div>

                                        <div className="relative w-36 h-36 mb-4 z-10 mt-12">
                                            <div className="absolute inset-0 rounded-full border-[6px] border-white shadow-xl group-hover:scale-105 transition-transform duration-500 overflow-hidden bg-white">
                                                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#F4FAE8] via-white to-[#F4FAE8] text-[#84CC16]">
                                                    <i className={`fas ${member.icon} text-[4.5rem] sm:text-[5rem] opacity-90`}></i>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="relative z-10 w-full flex flex-col items-center flex-grow px-4">
                                            <span className="inline-block py-1 px-4 rounded-full bg-[#A3E635]/10 text-[#84CC16] text-[10px] font-black uppercase tracking-widest mb-3">
                                                {member.role}
                                            </span>
                                            <h3 className="text-xl font-black font-heading text-[#0A0A0A] mb-2 group-hover:text-[#84CC16] transition-colors leading-tight">{member.name}</h3>
                                            <p className="text-[13px] text-slate-600 font-semibold leading-relaxed mb-8 px-2">
                                                {member.desc}
                                            </p>

                                            <div className="mt-auto pb-8 pt-4 flex justify-center gap-3 w-full">
                                                {[
                                                    { icon: member.icon, bg: 'bg-[#A3E635] text-[#0A0A0A]' },
                                                    { icon: 'fa-heart', bg: 'bg-[#0A0A0A] text-white' },
                                                    { icon: 'fa-star', bg: 'bg-[#A3E635] text-[#0A0A0A]' },
                                                    { icon: 'fa-check', bg: 'bg-[#0A0A0A] text-white' }
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
                                        ? 'bg-[#A3E635] w-6'
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
