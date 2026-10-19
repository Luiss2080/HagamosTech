import React, { useState } from 'react';
import { Globe, ShieldCheck, TrendingUp } from 'lucide-react';

const OPTIONS = [
  { title: 'Alcance', subtitle: 'Qué necesitás resolver', icon: <Globe size={19} />, description: 'Aterrizamos el objetivo y las personas que usarán la solución para entender qué conviene incluir.', details: ['Objetivo del proyecto', 'Contenido y funciones', 'Personas usuarias'] },
  { title: 'Etapas', subtitle: 'Cómo organizar el trabajo', icon: <TrendingUp size={19} />, description: 'Ordenamos el trabajo en entregables que tengan sentido para el proyecto y para tu disponibilidad.', details: ['Prioridades iniciales', 'Entregas parciales', 'Revisiones coordinadas'] },
  { title: 'Requisitos', subtitle: 'Qué revisar antes de iniciar', icon: <ShieldCheck size={19} />, description: 'Revisamos los recursos y condiciones que pueden influir en la propuesta antes de confirmar su alcance.', details: ['Material disponible', 'Integraciones necesarias', 'Condiciones y presupuesto'] },
];

const ProjectPlanningSelector = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const selected = OPTIONS[activeIndex];

  return (
    <section className="relative mx-auto mt-12 w-full max-w-5xl overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#090c08]/80 p-5 text-left shadow-[0_24px_80px_rgba(0,0,0,.28)] backdrop-blur-md sm:mt-14 sm:p-8" aria-label="Cómo definimos cada proyecto">
      <div aria-hidden="true" className="absolute inset-x-[8%] top-0 h-px bg-gradient-to-r from-transparent via-[#A3E635]/75 to-transparent" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-28 h-64 w-64 rounded-full bg-[#A3E635]/[.06] blur-3xl" />
      <header className="relative mb-6 flex flex-col gap-2 sm:mb-7">
        <span className="text-[9px] font-black uppercase tracking-[.2em] text-[#A3E635]">Cada proyecto se conversa</span>
        <h2 className="text-xl font-black text-white sm:text-2xl">¿Qué definimos juntos?</h2>
        <p className="max-w-2xl text-sm leading-relaxed text-slate-400">Acordamos el alcance, las etapas y los requisitos antes de iniciar.</p>
      </header>
      <div className="relative grid grid-cols-1 gap-2.5 sm:grid-cols-3" role="tablist" aria-label="Aspectos del proyecto">
        {OPTIONS.map((option, index) => (
          <button key={option.title} type="button" role="tab" id={`planning-tab-${index}`} aria-selected={activeIndex === index} aria-controls="planning-panel" onClick={() => setActiveIndex(index)} className={`group relative flex min-h-[76px] items-center gap-3.5 overflow-hidden rounded-2xl border px-4 py-3.5 text-left transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A3E635] ${activeIndex === index ? 'border-[#A3E635]/50 bg-[#A3E635]/[.12] text-white shadow-[inset_0_0_24px_rgba(163,230,53,.05)]' : 'border-white/[.09] bg-white/[.025] text-white hover:border-[#A3E635]/35 hover:bg-white/[.05]'}`}>
            <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-colors ${activeIndex === index ? 'border-[#A3E635]/45 bg-[#A3E635]/15 text-[#A3E635]' : 'border-white/[.07] bg-black/20 text-slate-300 group-hover:text-[#A3E635]'}`}>{option.icon}</span>
            <span><span className="block text-sm font-black">{option.title}</span><span className="mt-1 block text-[10px] font-semibold text-slate-400">{option.subtitle}</span></span>
            {activeIndex === index && <span aria-hidden="true" className="absolute inset-x-4 bottom-0 h-0.5 rounded-full bg-gradient-to-r from-transparent via-[#A3E635] to-transparent" />}
          </button>
        ))}
      </div>
      <div id="planning-panel" role="tabpanel" aria-labelledby={`planning-tab-${activeIndex}`} className="relative mt-3.5 grid gap-4 rounded-2xl border border-white/[.08] bg-black/20 p-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:p-5">
        <div className="flex items-start gap-3"><span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#A3E635]/10 text-[#A3E635] [&>svg]:h-4 [&>svg]:w-4">{selected.icon}</span><div><h3 className="text-sm font-black text-white">{selected.title}</h3><p className="mt-1 max-w-2xl text-xs leading-relaxed text-slate-300 sm:text-sm">{selected.description}</p></div></div>
        <ul className="flex flex-wrap gap-2 sm:max-w-[360px] sm:justify-end">{selected.details.map((detail) => <li key={detail} className="rounded-full border border-[#A3E635]/20 bg-[#A3E635]/[.06] px-3 py-1.5 text-[10px] font-bold text-[#D7F7A8]">{detail}</li>)}</ul>
      </div>
    </section>
  );
};

export default ProjectPlanningSelector;
