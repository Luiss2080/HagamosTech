import React from 'react';
import FondoTech from '../../../components/fondos/FondoTech';
import EncabezadoInstitucional from './EncabezadoInstitucional';

const principios = [
    { name: 'Claridad', desc: 'Explicamos el alcance, los límites y los próximos pasos antes de iniciar.', icon: 'fa-comment-dots' },
    { name: 'Colaboración', desc: 'Tomamos en cuenta el contexto y los objetivos de cada solicitud al revisar alternativas.', icon: 'fa-people-arrows-left-right' },
    { name: 'Responsabilidad', desc: 'Acordamos el alcance y las condiciones antes de comenzar el trabajo.', icon: 'fa-list-check' },
    { name: 'Creatividad', desc: 'Combinamos diseño y desarrollo cuando forman parte de una necesidad evaluada.', icon: 'fa-lightbulb' },
    { name: 'Acompañamiento', desc: 'En el apoyo académico, orientamos el proceso y cada estudiante desarrolla y presenta su trabajo.', icon: 'fa-graduation-cap' },
];

const Valores = ({ standalone = false }) => (
    <div id="valores" className="relative scroll-mt-24 bg-[#050505] text-white">
        {standalone && (
            <EncabezadoInstitucional
                title="Principios de trabajo"
                description="Así organizamos las consultas y acompañamos los servicios que forman parte del catálogo vigente."
                icon="fa-heart"
            />
        )}
        <section aria-labelledby="principios-title" className="relative z-10 overflow-hidden border-t border-white/5 py-14 sm:py-20">
            <FondoTech hideWaves />
            <div className="container relative z-10 mx-auto max-w-7xl px-6">
                <div className="mx-auto mb-9 max-w-3xl text-center sm:mb-12">
                    <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#A3E635]/30 bg-[#A3E635]/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-[#A3E635]">
                        <i className="fas fa-heart" aria-hidden="true" /> Cómo trabajamos
                    </span>
                    <h2 id="principios-title" className="text-3xl font-black leading-tight text-white sm:text-4xl">Principios que guían cada consulta</h2>
                    <p className="mt-4 text-sm font-medium leading-relaxed text-slate-400 sm:text-base">El alcance y la forma de trabajo se revisan según cada servicio y necesidad.</p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {principios.map((principio, index) => (
                        <article key={principio.name} className={`rounded-3xl border p-6 sm:p-7 ${index === 0 ? 'border-[#A3E635]/40 bg-[#A3E635] text-[#0A0A0A]' : 'border-white/10 bg-[#111111] text-white'}`}>
                            <div aria-hidden="true" className={`mb-5 flex h-12 w-12 items-center justify-center rounded-2xl text-xl ${index === 0 ? 'bg-black/10 text-[#0A0A0A]' : 'bg-[#A3E635]/10 text-[#A3E635]'}`}>
                                <i className={`fas ${principio.icon}`} />
                            </div>
                            <h3 className="mb-2 text-xl font-black">{principio.name}</h3>
                            <p className={`text-sm font-medium leading-relaxed ${index === 0 ? 'text-[#0A0A0A]/75' : 'text-slate-400'}`}>{principio.desc}</p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    </div>
);

export default Valores;
