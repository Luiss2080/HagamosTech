import React from 'react';
import { Link } from 'react-router-dom';
import FondoTech from '../../../components/fondos/FondoTech';

const AgendaNovedades = () => (
    <section className="relative z-10 overflow-hidden px-6 py-14 sm:py-20">
        <FondoTech />
        <div className="relative z-10 mx-auto max-w-5xl text-center">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#A3E635]/30 bg-[#A3E635]/10 px-4 py-2 text-[10px] font-black uppercase tracking-[.18em] text-[#A3E635]">
                <i className="fa-solid fa-calendar-check" aria-hidden="true" /> Coordinación directa
            </span>
            <h2 className="text-3xl font-black uppercase leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
                Consultá la <span className="text-[#A3E635]">disponibilidad</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm font-medium leading-relaxed text-slate-300 sm:text-base">
                La atención depende del servicio, la materia o el alcance del proyecto. Escribinos para conversar tu necesidad y revisar opciones.
            </p>

            <div className="mx-auto mt-8 flex max-w-3xl flex-col items-center justify-between gap-5 rounded-3xl border border-[#A3E635]/25 bg-[#0B0D09]/90 p-5 shadow-[0_20px_60px_rgba(0,0,0,.35)] sm:flex-row sm:p-7">
                <div className="flex items-center gap-4 text-left">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#A3E635] text-xl text-[#0A0A0A]">
                        <i className="fa-regular fa-comments" aria-hidden="true" />
                    </span>
                    <div>
                        <h3 className="font-black text-white">Cada consulta se coordina contigo</h3>
                        <p className="mt-1 text-sm leading-relaxed text-slate-400">Definimos disponibilidad y próximos pasos al conocer los detalles.</p>
                    </div>
                </div>
                <div className="flex w-full shrink-0 flex-col gap-3 sm:w-auto sm:flex-row">
                    <a href="https://wa.me/59161320004?text=Hola%2C%20quiero%20consultar%20disponibilidad%20para%20un%20servicio." target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#A3E635] px-6 py-3 text-xs font-black uppercase tracking-wider text-[#0A0A0A] transition hover:bg-[#84CC16]">
                        <i className="fa-brands fa-whatsapp text-base" aria-hidden="true" /> Consultar por WhatsApp
                    </a>
                    <Link to="/contactanos" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3 text-xs font-black uppercase tracking-wider text-white transition hover:border-[#A3E635] hover:text-[#A3E635]">
                        Más opciones <i className="fa-solid fa-arrow-right" aria-hidden="true" />
                    </Link>
                </div>
            </div>
        </div>
    </section>
);

export default AgendaNovedades;
