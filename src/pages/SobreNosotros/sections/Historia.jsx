import React from 'react';
import { Link } from 'react-router-dom';
import FondoTech from '../../../components/fondos/FondoTech';
import EncabezadoInstitucional from './EncabezadoInstitucional';

const pasos = [
    { title: 'Nos contás', desc: 'Explicás la necesidad o el objetivo con tus propias palabras.', icon: 'fa-comments' },
    { title: 'Revisamos', desc: 'Analizamos si la solicitud corresponde a los servicios y qué información falta.', icon: 'fa-magnifying-glass' },
    { title: 'Acordamos', desc: 'Si es viable, definimos alcance, entregables, tiempos estimados y presupuesto antes de iniciar.', icon: 'fa-file-signature' },
    { title: 'Desarrollamos o acompañamos', desc: 'Realizamos el trabajo convenido según el servicio y el alcance acordado.', icon: 'fa-laptop-code' },
    { title: 'Presentamos lo acordado', desc: 'Compartimos el resultado o cierre del acompañamiento previsto para esa solicitud.', icon: 'fa-circle-check' },
];

const ProcesoTrabajo = ({ standalone = false }) => (
    <div id="origen" className="relative scroll-mt-24 bg-[#050505] text-white">
        {standalone && (
            <EncabezadoInstitucional
                title="Nuestro enfoque"
                description="Este es el enfoque que seguimos hoy para recibir solicitudes y acordar su alcance."
                icon="fa-diagram-project"
            />
        )}
        <section aria-labelledby="enfoque-title" className="relative overflow-hidden border-t border-white/5 py-14 sm:py-20">
            <FondoTech hideWaves />
            <div className="container relative z-10 mx-auto max-w-6xl px-6">
                <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-14">
                    <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#A3E635]/30 bg-[#A3E635]/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-[#A3E635]">
                        <i className="fas fa-diagram-project" aria-hidden="true" /> De la consulta al trabajo
                    </span>
                    <h2 id="enfoque-title" className="text-3xl font-black leading-tight text-white sm:text-4xl">Un proceso que empieza por escucharte</h2>
                    <p className="mt-4 text-sm font-medium leading-relaxed text-slate-400 sm:text-base">El detalle y la modalidad se ajustan a cada solicitud. Ningún proyecto empieza hasta acordar su alcance.</p>
                </div>

                <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {pasos.map((paso, index) => (
                        <li key={paso.title} className="relative rounded-3xl border border-white/10 bg-[#111111] p-6 sm:p-7">
                            <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#A3E635] text-lg text-[#0A0A0A]" aria-hidden="true">
                                <i className={`fas ${paso.icon}`} />
                            </span>
                            <p className="mb-2 text-[10px] font-black uppercase tracking-[0.18em] text-[#A3E635]">Paso {String(index + 1).padStart(2, '0')}</p>
                            <h3 className="mb-2 text-xl font-black text-white">{paso.title}</h3>
                            <p className="text-sm font-medium leading-relaxed text-slate-400">{paso.desc}</p>
                        </li>
                    ))}
                </ol>

                <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                    <Link to="/como-trabajamos" className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/20 px-6 py-3 text-xs font-black uppercase tracking-wider text-white transition-colors hover:border-[#A3E635] hover:text-[#A3E635] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A3E635]">Ver cómo trabajamos</Link>
                    <Link to="/contactanos" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#A3E635] px-6 py-3 text-xs font-black uppercase tracking-wider text-[#0A0A0A] transition-colors hover:bg-[#84CC16] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">Contanos tu idea <i className="fas fa-arrow-right" aria-hidden="true" /></Link>
                </div>
            </div>
        </section>
    </div>
);

export default ProcesoTrabajo;
