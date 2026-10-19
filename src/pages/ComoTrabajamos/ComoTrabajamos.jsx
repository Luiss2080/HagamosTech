import React from 'react';
import FondoTech from '../../components/fondos/FondoTech';
import CircuitBackground from '../../components/fondos/FondoParticulas';
import CircleParticles from '../../components/fondos/ParticulasCirculares';
import CenteredProjectCTA from '../../components/ui/CenteredProjectCTA';
import { ArrowDown, ArrowRight, BadgeCheck, Code2, FileText, MessageCircle, Search, ShieldCheck, Sparkles } from 'lucide-react';

const STEPS = [
  {
    title: 'Contanos qué necesitás',
    description: 'Compartinos tu objetivo, problema o idea. No necesitás conocer términos técnicos.',
    icon: MessageCircle,
    accent: '01',
  },
  {
    title: 'Revisamos alternativas',
    description: 'Aclaramos requisitos, funciones y viabilidad para identificar opciones posibles.',
    icon: Search,
    accent: '02',
  },
  {
    title: 'Acordamos la propuesta',
    description: 'Definimos alcance, entregables, etapas, tiempos estimados y presupuesto.',
    icon: FileText,
    accent: '03',
  },
  {
    title: 'Desarrollamos y entregamos',
    description: 'Trabajamos sobre lo acordado, coordinamos revisiones y compartimos los entregables.',
    icon: Code2,
    accent: '04',
  },
];

const ComoTrabajamos = () => (
  <main id="how-we-work-page" className="relative isolate min-h-screen overflow-hidden bg-[#050505] font-montserrat text-white">
    <CircuitBackground />
    <CircleParticles colorScheme="dark" />
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-0 bg-[linear-gradient(to_right,#8080800d_1px,transparent_1px),linear-gradient(to_bottom,#8080800d_1px,transparent_1px)] bg-[size:52px_52px]" />

    <section className="relative z-10 px-6 pb-16 pt-28 sm:pb-20 sm:pt-36">
      <FondoTech hideWaves />
      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center text-center">
        <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#A3E635]/30 bg-[#A3E635]/[.08] px-4 py-2 text-[10px] font-black uppercase tracking-[.2em] text-[#A3E635]">
          <Sparkles size={14} aria-hidden="true" /> Nuestra metodología
        </span>
        <h1 className="max-w-4xl text-4xl font-black uppercase leading-[1.03] tracking-[-.045em] text-white sm:text-6xl md:text-7xl">
          De tu idea a una <span className="text-[#A3E635]">solución digital</span>
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-sm font-medium leading-relaxed text-slate-300 sm:mt-6 sm:text-lg">
          Conversamos sobre lo que necesitás, definimos un alcance posible y coordinamos cada etapa contigo.
        </p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-2.5 text-[10px] font-bold text-slate-300 sm:gap-3 sm:text-xs">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[.04] px-3 py-2"><MessageCircle size={14} className="text-[#A3E635]" aria-hidden="true" /> Sin tecnicismos</span>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[.04] px-3 py-2"><ShieldCheck size={14} className="text-[#A3E635]" aria-hidden="true" /> Alcance conversado</span>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[.04] px-3 py-2"><BadgeCheck size={14} className="text-[#A3E635]" aria-hidden="true" /> Etapas claras</span>
        </div>
        <a href="#metodologia-pasos" className="mt-8 inline-flex min-h-12 items-center gap-3 rounded-full bg-[#A3E635] px-6 py-3 text-[10px] font-black uppercase tracking-[.14em] text-[#090B06] shadow-[0_12px_36px_rgba(163,230,53,.18)] transition hover:-translate-y-0.5 hover:bg-[#B7F34D] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#A3E635] sm:text-xs">
          Ver los cuatro pasos <ArrowDown size={16} aria-hidden="true" />
        </a>
      </div>
    </section>

    <section id="metodologia-pasos" className="relative z-10 overflow-hidden px-5 py-14 sm:px-6 sm:py-16">
      <FondoTech />
      <div className="relative z-10 mx-auto max-w-7xl">
        <header className="mx-auto max-w-3xl text-center">
          <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#A3E635]/25 bg-[#A3E635]/[.06] px-3 py-1.5 text-[9px] font-black uppercase tracking-[.2em] text-[#A3E635] sm:text-[10px]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#A3E635]" /> Un proceso claro y conversado
          </span>
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-5xl">
            En 4 simples <span className="text-[#A3E635]">pasos</span>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm font-medium leading-relaxed text-slate-300/85 sm:text-base">
            Desde la primera conversación hasta la entrega de lo acordado.
          </p>
        </header>

        <div className="relative mx-auto mt-10 max-w-6xl sm:mt-12">
          <div aria-hidden="true" className="absolute bottom-12 left-[27px] top-10 border-l border-dashed border-[#A3E635]/35 sm:hidden" />
          <div aria-hidden="true" className="absolute left-[12.5%] right-[12.5%] top-[30px] hidden border-t border-dashed border-[#A3E635]/40 lg:block" />
          <ol aria-label="Pasos de nuestra metodología" className="relative grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-x-5 sm:gap-y-7 lg:grid-cols-4 lg:gap-5">
            {STEPS.map(({ title, description, icon: Icon, accent }) => (
            <li key={accent} className="relative flex min-w-0 items-start gap-4 sm:block">
              <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-[#A3E635]/60 bg-[#10150A] text-[#A3E635] shadow-[0_0_26px_rgba(163,230,53,.14)] sm:mx-auto sm:h-16 sm:w-16 sm:rounded-full sm:border-[3px] sm:bg-[#11150d]">
                <Icon size={24} strokeWidth={2.2} aria-hidden="true" />
                <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full border-2 border-[#070907] bg-[#A3E635] text-[9px] font-black text-[#090B06]">{accent}</span>
              </div>
              <article className="min-w-0 flex-1 rounded-2xl border border-white/[.09] bg-[#0b0e09]/90 p-4 shadow-[0_14px_38px_rgba(0,0,0,.22)] transition duration-300 hover:-translate-y-1 hover:border-[#A3E635]/35 sm:mt-5 sm:min-h-44 sm:p-5 lg:mt-6">
                <div className="mb-2 flex items-center justify-between gap-3">
                  <span className="text-[9px] font-black uppercase tracking-[.18em] text-[#A3E635]">Paso {accent}</span>
                  <span aria-hidden="true" className="h-px flex-1 bg-gradient-to-r from-[#A3E635]/30 to-transparent" />
                </div>
                <h3 className="text-base font-extrabold leading-snug text-white sm:text-lg">{title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-300/85 sm:text-sm">{description}</p>
              </article>
            </li>
            ))}
          </ol>
        </div>

        <p className="mx-auto mt-6 inline-flex w-full items-center justify-center gap-2 text-center text-[10px] font-semibold text-slate-400 sm:mt-8 sm:text-xs">
          <ShieldCheck size={15} className="shrink-0 text-[#A3E635]" aria-hidden="true" />
          El alcance y las condiciones se conversan antes de iniciar.
        </p>
      </div>
    </section>

    <section className="relative z-10 px-5 py-8 sm:px-6 sm:py-10">
      <CenteredProjectCTA
        title={<>Tu proyecto empieza con una <span>conversación.</span></>}
        description="Contanos tu objetivo. Revisamos alternativas y conversamos un alcance adecuado para tu proyecto."
        buttonLabel="Conversemos"
        href="https://wa.me/59161320004?text=Hola,%20quiero%20conversar%20sobre%20mi%20proyecto"
        eyebrow="HAGAMOSTECH · CONVERSEMOS"
        chips={['Desarrollo web', 'Software a medida', 'Diseño y tecnología']}
        image="/img/08_Cards/metodo-desarrollamos.webp"
        imageAlt="Equipo revisando una solución digital en desarrollo"
      />
    </section>
  </main>
);

export default ComoTrabajamos;
