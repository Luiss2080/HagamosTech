import React from 'react';
import { Link } from 'react-router-dom';
import FondoTech from '../../../components/fondos/FondoTech';
import EncabezadoInstitucional from './EncabezadoInstitucional';

const areas = [
    { title: 'Tecnología y desarrollo digital', desc: 'Conocé las opciones de desarrollo web y software que revisamos según cada proyecto.', to: '/que-hacemos/tecnologia', icon: 'fa-laptop-code' },
    { title: 'Acompañamiento académico', desc: 'Explorá el apoyo formativo disponible por nivel, materia y alcance.', to: '/que-hacemos/academia', icon: 'fa-graduation-cap' },
    { title: 'Diseño y emprendimientos', desc: 'Revisá recursos de diseño y presencia digital para proyectos y negocios.', to: '/que-hacemos/negocios', icon: 'fa-pen-nib' },
    { title: 'Solicitud personalizada', desc: 'Contanos una necesidad que no encuentres en estas áreas; evaluaremos si podemos abordarla.', to: '/que-hacemos/personalizado', icon: 'fa-lightbulb' },
];

const AreasTrabajo = ({ standalone = false }) => (
    <div id="areas-institucionales" className="relative bg-[#050505] text-white">
        {standalone && (
            <EncabezadoInstitucional
                title="Áreas que acompañamos"
                description="Conocé los caminos de orientación hacia los servicios vigentes de HagamosTech."
                icon="fa-layer-group"
            />
        )}
        <section aria-labelledby="areas-institucionales-title" className="relative overflow-hidden border-t border-white/5 py-14 sm:py-20">
            <FondoTech hideWaves />
            <div className="container relative z-10 mx-auto max-w-7xl px-6">
                <div className="mx-auto mb-9 max-w-3xl text-center sm:mb-12">
                    <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#A3E635]/30 bg-[#A3E635]/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-[#A3E635]">
                        <i className="fas fa-layer-group" aria-hidden="true" /> Nuestras áreas
                    </span>
                    <h2 id="areas-institucionales-title" className="text-3xl font-black leading-tight text-white sm:text-4xl">Explorá lo que hacemos</h2>
                    <p className="mt-4 text-sm font-medium leading-relaxed text-slate-400 sm:text-base">Estas áreas orientan la consulta; cada solicitud se evalúa antes de acordar alcance y condiciones.</p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                    {areas.map((area, index) => (
                        <Link key={area.to} to={area.to} className="group flex h-full items-start gap-4 rounded-3xl border border-white/10 bg-[#111111] p-6 transition-all hover:-translate-y-1 hover:border-[#A3E635]/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A3E635] sm:p-7">
                            <span aria-hidden="true" className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-lg ${index === 0 ? 'bg-[#A3E635] text-[#0A0A0A]' : 'bg-[#A3E635]/10 text-[#A3E635]'}`}>
                                <i className={`fas ${area.icon}`} />
                            </span>
                            <span className="min-w-0">
                                <span className="block text-lg font-black text-white transition-colors group-hover:text-[#A3E635]">{area.title}</span>
                                <span className="mt-2 block text-sm font-medium leading-relaxed text-slate-400">{area.desc}</span>
                                <span className="mt-4 inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.16em] text-[#A3E635]">Conocer el área <i className="fas fa-arrow-right transition-transform group-hover:translate-x-1" aria-hidden="true" /></span>
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    </div>
);

export default AreasTrabajo;
