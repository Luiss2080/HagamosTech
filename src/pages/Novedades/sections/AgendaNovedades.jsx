import React, { useState } from 'react';
import CircuitBackground from '../../../components/fondos/FondoTech';

const MESES = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

const DIAS_POR_MES = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const OFFSET_INICIO = [1, 4, 4, 0, 2, 5, 0, 3, 6, 1, 4, 6];

const EVENTOS_AGENDA = [
    { dia: 5, tipo: 'promo', titulo: 'Clínica de Proyectos', hora: 'Todo el día', lugar: 'Online / WhatsApp', icon: 'fa-tags', desc: 'Revisamos tu idea y te damos un presupuesto sin cargo.', extra: 'Cupos limitados por semana; agendá tu turno.' },
    { dia: 9, tipo: 'evento', titulo: 'Taller de React', hora: '18:00 – 20:00', lugar: 'Modalidad online', icon: 'fa-code', desc: 'Introducción práctica a React construyendo un proyecto real.', extra: 'Requisito: lógica de programación básica.' },
    { dia: 12, tipo: 'aniv', titulo: 'Aniversario HagamosTech', hora: '9:00 – 18:00', lugar: 'Online / presencial', icon: 'fa-birthday-cake', desc: 'Descuentos en packs, sorteos y consultoría gratuita.', extra: 'Promociones válidas únicamente por el día.' },
    { dia: 18, tipo: 'evento', titulo: 'Demo Day IA', hora: '16:00 – 18:00', lugar: 'Online', icon: 'fa-robot', desc: 'Mostramos asistentes y automatizaciones funcionando en vivo.', extra: 'Inscripción previa por WhatsApp.' },
    { dia: 20, tipo: 'evento', titulo: 'Hackathon Académico', hora: '10:00 – 17:00', lugar: 'Universidad aliada', icon: 'fa-trophy', desc: 'Equipos de estudiantes compiten resolviendo un reto tecnológico.', extra: 'Premios para los tres mejores equipos.' },
    { dia: 26, tipo: 'promo', titulo: 'Día del Cliente', hora: 'Todo el día', lugar: 'Online / WhatsApp', icon: 'fa-heart', desc: 'Descuentos y soporte prioritario para clientes activos.', extra: 'Beneficio exclusivo para clientes con soporte vigente.' },
];

const TIPO_INFO = {
    promo: { label: 'Promoción', bg: 'bg-[#A3E635]', text: 'text-[#A3E635]', soft: 'bg-[#A3E635]/10 border-[#A3E635]/25', gradient: 'from-[#A3E635] to-[#84CC16]', ring: 'ring-[#A3E635]/40', glow: 'shadow-[0_6px_20px_rgba(255,77,0,0.25)]' },
    evento: { label: 'Evento', bg: 'bg-[#171717]', text: 'text-slate-300', soft: 'bg-[#171717]/10 border-[#171717]/25', gradient: 'from-[#171717] to-[#452A16]', ring: 'ring-[#171717]/40', glow: 'shadow-[0_6px_20px_rgba(93,58,31,0.25)]' },
    aniv: { label: 'Aniversario', bg: 'bg-[#0A0A0A]', text: 'text-white', soft: 'bg-[#0A0A0A]/10 border-[#0A0A0A]/25', gradient: 'from-[#0A0A0A] to-[#6B3410]', ring: 'ring-[#0A0A0A]/40', glow: 'shadow-[0_6px_20px_rgba(139,69,19,0.25)]' },
};

const AgendaNovedades = () => {
    const [mesIndex, setMesIndex] = useState(8);
    const [selected, setSelected] = useState(12);

    const mes = MESES[mesIndex];
    const totalDias = DIAS_POR_MES[mesIndex];
    const eventos = mesIndex === 8 ? EVENTOS_AGENDA : [];

    const irMes = (delta) => setMesIndex(prev => (prev + delta + 12) % 12);
    const anterior = () => irMes(-1);
    const siguiente = () => irMes(1);

    const eventoSeleccionado = eventos.find(e => e.dia === selected);
    const tipo = eventoSeleccionado ? TIPO_INFO[eventoSeleccionado.tipo] : null;

    const hayEventos = eventos.length > 0;
    const diasConEvento = new Set(eventos.map(e => e.dia));
    const proximoEvento = eventos.length > 0
        ? [...eventos].sort((a, b) => a.dia - b.dia)[0]
        : null;

    return (
        <div className="relative">
            <section className="relative z-10 py-6">
                <CircuitBackground />
                <div className="container mx-auto px-6 max-w-7xl relative z-20">
                    <div className="text-center mb-4 relative z-10">
                        <span className="inline-block py-1.5 px-4 rounded-full bg-[#A3E635]/10 text-[#A3E635] text-[10px] font-black tracking-widest uppercase mb-3 border border-[#A3E635]/20">
                            <i className="fas fa-calendar-star text-[#A3E635] mr-1"></i> Agenda
                        </span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading text-white mb-2 leading-tight">
                            Agenda de <span className="relative inline-block text-[#A3E635]">
                                {mes}
                                <svg className="absolute w-full h-3 -bottom-1.5 left-0 z-[-1] text-lime-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.55)]" viewBox="0 0 200 12" preserveAspectRatio="none" fill="none">
                                    <path d="M8,8 C22,5 38,7.5 55,7.5 C130,7.5 165,7.5 188,7.5 C194,7.5 198,6 196,7.5" stroke="currentColor" strokeWidth="7" strokeLinecap="round"/>
                                </svg>
                            </span>
                        </h2>
                        <p className="text-slate-300 font-medium max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
                            Navegá por todo el año y tocá un día para ver talleres, demos y promociones.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">

                        {/* Calendario (65%) */}
                        <div className="lg:col-span-8 relative">
                            <div className="bg-[#111827] rounded-[2rem] ring-1 ring-white/10 shadow-xl shadow-black/30 relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#A3E635] via-[#0A0A0A] to-[#A3E635]"></div>
                                <div className="absolute top-6 -right-14 w-44 h-44 rounded-full bg-[#A3E635]/10 blur-3xl animate-float-slow pointer-events-none"></div>
                                <div className="absolute -bottom-16 -left-12 w-48 h-48 rounded-full bg-[#0A0A0A]/10 blur-3xl animate-float-medium pointer-events-none"></div>

                                {/* Encabezado del calendario */}
                                <div className="relative z-10 px-5 sm:px-6 pt-5 pb-4 border-b border-dashed border-white/10">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#A3E635] to-[#84CC16] text-white flex items-center justify-center shadow-lg shadow-lime-400/20/25">
                                                <i className="fas fa-calendar-days text-lg"></i>
                                            </div>
                                            <div>
                                                <h3 className="text-lg sm:text-xl font-black font-heading text-white leading-tight">{mes} 2026</h3>
                                                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Calendario mensual</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <span className="px-2.5 py-1 rounded-lg bg-[#A3E635]/10 text-[#A3E635] text-[8px] font-black uppercase tracking-wider border border-[#A3E635]/20">
                                                <i className="fas fa-calendar-check mr-1"></i>{eventos.length} eventos
                                            </span>
                                            <span className="px-2.5 py-1 rounded-lg bg-[#171717]/10 text-slate-300 text-[8px] font-black uppercase tracking-wider border border-[#171717]/20">
                                                {totalDias} días
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="relative z-10 px-5 sm:px-6 py-4">
                                    {/* Días de la semana */}
                                    <div className="grid grid-cols-7 gap-1 mb-1.5">
                                        {['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá', 'Do'].map((d, i) => (
                                            <span key={i} className={`text-center text-[9px] font-black uppercase tracking-wider ${i >= 5 ? 'text-[#A3E635]' : 'text-slate-400'}`}>{d}</span>
                                        ))}
                                    </div>

                                    {/* Grid de días */}
                                    <div className="grid grid-cols-7 gap-1">
                                        {Array.from({ length: OFFSET_INICIO[mesIndex] }).map((_, i) => <div key={`e${i}`}></div>)}
                                        {Array.from({ length: totalDias }, (_, i) => i + 1).map(dia => {
                                            const ev = eventos.find(e => e.dia === dia);
                                            const isSelected = selected === dia;
                                            const isHoy = mesIndex === 8 && dia === 12;
                                            const tipoEv = ev ? TIPO_INFO[ev.tipo] : null;
                                            const columna = (OFFSET_INICIO[mesIndex] + dia - 1) % 7;
                                            const esFinDeSemana = columna >= 5;
                                            return (
                                                <button
                                                    key={dia}
                                                    onClick={() => setSelected(dia)}
                                                    title={ev ? `${ev.titulo} · ${ev.hora}` : undefined}
                                                    className={`relative h-9 rounded-lg flex items-center justify-center text-[13px] font-black transition-all duration-200 ${
                                                        isSelected ? `bg-gradient-to-br ${tipoEv?.gradient || 'from-[#A3E635] to-[#84CC16]'} text-white shadow-md ${tipoEv?.glow || 'shadow-lime-400/20/30'} scale-105 z-10 ring-2 ring-offset-1 ${tipoEv?.ring || 'ring-[#A3E635]/40'}` :
                                                        ev ? `${tipoEv?.text} bg-[#111111] hover:bg-[#A3E635]/10 hover:scale-105 border border-white/10 cursor-pointer` :
                                                        isHoy ? 'bg-[#A3E635]/10 text-[#A3E635] border border-dashed border-[#A3E635]/40 hover:bg-[#A3E635]/15 hover:scale-105' :
                                                        esFinDeSemana ? 'text-slate-400/80 hover:bg-white/5 hover:scale-105' :
                                                        'text-slate-400 hover:bg-white/5 hover:scale-105'
                                                    }`}
                                                >
                                                    {dia}
                                                    {ev && (
                                                        <span className={`absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${isSelected ? 'bg-[#111827]' : tipoEv?.bg}`}></span>
                                                    )}
                                                </button>
                                            );
                                        })}
                                    </div>

                                    {/* Leyenda */}
                                    <div className="mt-4 pt-3 border-t border-dashed border-white/10 flex flex-wrap items-center justify-between gap-3">
                                        <div className="flex flex-wrap items-center gap-3">
                                            {Object.entries(TIPO_INFO).map(([key, info]) => (
                                                <span key={key} className="inline-flex items-center gap-1.5 text-[8px] font-black uppercase tracking-wider text-slate-300">
                                                    <span className={`w-2 h-2 rounded-full ${info.bg}`}></span>
                                                    {info.label}
                                                </span>
                                            ))}
                                            <span className="inline-flex items-center gap-1.5 text-[8px] font-black uppercase tracking-wider text-slate-300">
                                                <span className="w-2 h-2 rounded-full border border-dashed border-[#A3E635] bg-[#A3E635]/10"></span>
                                                Hoy
                                            </span>
                                        </div>
                                        {hayEventos && (
                                            <span className="inline-flex items-center gap-1.5 text-[8px] font-black uppercase tracking-wider text-slate-300">
                                                <i className="fas fa-fire text-[#A3E635]"></i> Siguiente: día {proximoEvento.dia}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Pie del calendario */}
                                <div className="relative z-10 px-5 sm:px-6 py-3 bg-[#0F0F0F] border-t border-white/10 flex items-center justify-between">
                                    <span className="inline-flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-white">
                                        <i className="fas fa-magnifying-glass-plus text-[#A3E635]"></i> Tocá un día
                                    </span>
                                    <span className="inline-flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-slate-400">
                                        <i className="fas fa-arrow-left text-[#A3E635]"></i> <i className="fas fa-arrow-right text-[#A3E635]"></i> Cambiar mes
                                    </span>
                                </div>
                            </div>

                            {/* Flechas fuera de la card */}
                            <button
                                onClick={anterior}
                                aria-label="Mes anterior"
                                className="absolute -left-4 sm:-left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-[#111827] shadow-xl shadow-black/10 border-2 border-white/10 text-white hover:bg-[#A3E635] hover:text-white hover:border-[#A3E635] hover:scale-110 active:scale-95 flex items-center justify-center transition-all duration-300 cursor-pointer group"
                            >
                                <i className="fas fa-chevron-left text-sm group-hover:-translate-x-0.5 transition-transform"></i>
                            </button>
                            <button
                                onClick={siguiente}
                                aria-label="Mes siguiente"
                                className="absolute -right-4 sm:-right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-[#111827] shadow-xl shadow-black/10 border-2 border-white/10 text-white hover:bg-[#A3E635] hover:text-white hover:border-[#A3E635] hover:scale-110 active:scale-95 flex items-center justify-center transition-all duration-300 cursor-pointer group"
                            >
                                <i className="fas fa-chevron-right text-sm group-hover:translate-x-0.5 transition-transform"></i>
                            </button>
                        </div>

                        {/* Detalle del evento (35%) */}
                        <div className="lg:col-span-4 bg-[#111827] rounded-[2rem] ring-1 ring-white/10 shadow-xl shadow-black/30 relative overflow-hidden flex flex-col">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#A3E635] via-[#0A0A0A] to-[#A3E635]"></div>
                            <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-[#A3E635]/10 blur-3xl animate-float-slow pointer-events-none"></div>
                            <div className="absolute -bottom-14 -left-10 w-44 h-44 rounded-full bg-[#171717]/10 blur-3xl animate-float-medium pointer-events-none"></div>

                            {eventoSeleccionado && tipo ? (
                                <div className="flex flex-col h-full relative z-10">
                                    {/* Cabecera */}
                                    <div className="px-5 pt-5 pb-4 border-b border-dashed border-white/10">
                                        <div className="flex items-center justify-between mb-3">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${tipo.soft}`}>
                                                <i className={`fas ${eventoSeleccionado.icon} text-[9px]`}></i>
                                                {tipo.label}
                                            </span>
                                            <span className="inline-flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-slate-300">
                                                <i className="fas fa-hourglass-half text-[#A3E635]"></i>{eventoSeleccionado.hora}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${tipo.gradient} flex flex-col items-center justify-center text-white shadow-lg shrink-0`}>
                                                <span className="text-xl font-black font-heading leading-none">{eventoSeleccionado.dia}</span>
                                                <span className="text-[7px] font-black uppercase tracking-widest">{mes.slice(0, 3)}</span>
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-black font-heading text-white leading-tight">{eventoSeleccionado.titulo}</h3>
                                                <p className="text-[10px] font-bold text-slate-300 mt-0.5">{mes} 2026</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Detalle */}
                                    <div className="px-5 py-4 space-y-2.5">
                                        <div className="flex items-center gap-3 p-2.5 rounded-xl bg-[#111111] border border-white/10">
                                            <div className="w-9 h-9 rounded-lg bg-[#111827] border border-white/10 text-[#A3E635] flex items-center justify-center shrink-0 shadow-sm">
                                                <i className="fas fa-map-marker-alt text-xs"></i>
                                            </div>
                                            <div>
                                                <p className="text-[8px] font-black uppercase tracking-widest text-slate-400">Lugar</p>
                                                <p className="text-[12px] font-bold text-white">{eventoSeleccionado.lugar}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3 p-2.5 rounded-xl bg-[#111111] border border-white/10">
                                            <div className="w-9 h-9 rounded-lg bg-[#111827] border border-white/10 text-[#A3E635] flex items-center justify-center shrink-0 shadow-sm">
                                                <i className="fas fa-clock text-xs"></i>
                                            </div>
                                            <div>
                                                <p className="text-[8px] font-black uppercase tracking-widest text-slate-400">Horario</p>
                                                <p className="text-[12px] font-bold text-white">{eventoSeleccionado.hora}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3 p-2.5 rounded-xl bg-[#111111] border border-white/10">
                                            <div className="w-9 h-9 rounded-lg bg-[#111827] border border-white/10 text-[#A3E635] flex items-center justify-center shrink-0 shadow-sm">
                                                <i className="fas fa-lightbulb text-xs"></i>
                                            </div>
                                            <div>
                                                <p className="text-[8px] font-black uppercase tracking-widest text-slate-400">Dato</p>
                                                <p className="text-[11px] font-semibold text-slate-300 leading-snug">{eventoSeleccionado.extra}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="px-5 pb-4">
                                        <p className="text-[12px] text-slate-300 font-medium leading-relaxed">{eventoSeleccionado.desc}</p>
                                    </div>

                                    {/* Acciones */}
                                    <div className="mt-auto px-5 py-4 border-t border-dashed border-white/10 bg-[#0F0F0F] grid grid-cols-2 gap-2.5">
                                        <a
                                            href="https://wa.me/59161320004"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center justify-center gap-2 py-2.5 rounded-full bg-[#25D366] hover:bg-[#1DA851] text-white font-black text-[9px] uppercase tracking-[0.15em] shadow-md shadow-green-500/20 hover:shadow-lg hover:-translate-y-0.5 active:scale-95 transition-all"
                                        >
                                            <i className="fab fa-whatsapp text-sm"></i> WhatsApp
                                        </a>
                                        <a
                                            href="tel:+59161320004"
                                            className="inline-flex items-center justify-center gap-2 py-2.5 rounded-full bg-[#A3E635] hover:bg-[#84CC16] text-white font-black text-[9px] uppercase tracking-[0.15em] shadow-md shadow-lime-400/20/20 hover:shadow-lg hover:-translate-y-0.5 active:scale-95 transition-all"
                                        >
                                            <i className="fas fa-phone text-xs"></i> Llamar
                                        </a>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-full text-center text-gray-400 relative z-10 px-6">
                                    <div className="w-16 h-16 rounded-2xl bg-[#111111] border border-white/10 flex items-center justify-center mb-3">
                                        <i className="fas fa-calendar-xmark text-2xl text-[#A3E635]"></i>
                                    </div>
                                    <p className="font-black uppercase tracking-widest text-sm text-white">Seleccioná un día</p>
                                    <p className="text-xs font-semibold mt-1">para ver el evento programado</p>
                                    {hayEventos && (
                                        <span className="inline-flex items-center gap-1.5 mt-4 px-3 py-1.5 rounded-full bg-[#111111] border border-white/10 text-[9px] font-black uppercase tracking-widest text-slate-300">
                                            <i className="fas fa-bolt text-[#A3E635]"></i> {diasConEvento.size} días con eventos
                                        </span>
                                    )}
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
};

export default AgendaNovedades;
