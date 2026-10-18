import React from 'react';
import FondoTech from '../../../components/fondos/FondoTech';
import EncabezadoInstitucional from './EncabezadoInstitucional';

const MisionVision = ({ standalone = false }) => (
    <div id="mision" className="relative scroll-mt-24 bg-[#050505] text-white">
        {standalone && (
            <EncabezadoInstitucional
                title="Propósito y rumbo"
                description="El propósito resume el alcance que ofrecemos hoy; el rumbo expresa cómo queremos presentarlo y acompañarlo."
                icon="fa-compass"
            />
        )}
        <section aria-label="Propósito y rumbo de HagamosTech" className="relative z-10 overflow-hidden border-t border-white/5 py-14 sm:py-20">
            <FondoTech hideWaves />
            <div className="container relative z-10 mx-auto grid max-w-6xl gap-5 px-6 md:grid-cols-2 md:gap-7">
                <article className="relative overflow-hidden rounded-[2rem] border border-[#A3E635]/25 bg-gradient-to-br from-[#111111] to-[#050505] p-7 shadow-xl sm:p-9">
                    <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#A3E635]/30 bg-[#A3E635]/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-[#A3E635]">
                        <i className="fas fa-bullseye" aria-hidden="true" /> Nuestro propósito
                    </span>
                    <h2 className="mb-4 text-2xl font-black leading-tight text-white sm:text-3xl">Acompañar necesidades reales.</h2>
                    <p className="text-sm font-medium leading-relaxed text-slate-300 sm:text-base">
                        Reunimos desarrollo digital, diseño y acompañamiento académico para estudiantes, profesionales, emprendimientos e instituciones, de acuerdo con el alcance de cada servicio.
                    </p>
                    <div aria-hidden="true" className="pointer-events-none absolute -bottom-12 -right-8 text-8xl text-[#A3E635]/10"><i className="fas fa-bullseye" /></div>
                </article>

                <article className="relative overflow-hidden rounded-[2rem] border border-[#A3E635]/30 bg-[#A3E635] p-7 text-[#0A0A0A] shadow-xl shadow-[#A3E635]/10 sm:p-9">
                    <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/5 px-4 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-[#0A0A0A]">
                        <i className="fas fa-compass" aria-hidden="true" /> Nuestro rumbo
                    </span>
                    <h2 className="mb-4 text-2xl font-black leading-tight sm:text-3xl">Comunicar con claridad y trabajar con alcance acordado.</h2>
                    <p className="text-sm font-semibold leading-relaxed text-[#0A0A0A]/80 sm:text-base">
                        Queremos que cada persona entienda qué alternativa puede solicitar, qué información necesitamos y qué pasos se acuerdan antes de iniciar.
                    </p>
                    <div aria-hidden="true" className="pointer-events-none absolute -bottom-12 -right-8 text-8xl text-black/10"><i className="fas fa-compass" /></div>
                </article>
            </div>
        </section>
    </div>
);

export default MisionVision;
