import React, { useState } from 'react';
import { 
  Store, ShoppingCart, TrendingUp, BarChart, ArrowRight, 
  CheckCircle2, Globe, Cpu, Users, Zap, ShieldCheck 
} from 'lucide-react';
import CircuitBackground from '../../../components/fondos/FondoParticulas';
import CircleParticles from '../../../components/fondos/ParticulasCirculares';
import TestimonialCarousel from '../../../components/carouseles/CarruselTestimonios';
import ProcessStepsCarousel from '../../../components/ui/ProcessStepsCarousel';
import CenteredProjectCTA from '../../../components/ui/CenteredProjectCTA';

const PLANNING_OPTIONS = [
  { title: 'Alcance', subtitle: 'Qué necesitás resolver', icon: <Globe size={19} />, description: 'Aterrizamos el objetivo y las personas que usarán la solución para entender qué conviene incluir.', details: ['Objetivo del proyecto', 'Contenido y funciones', 'Personas usuarias'] },
  { title: 'Etapas', subtitle: 'Cómo organizar el trabajo', icon: <TrendingUp size={19} />, description: 'Ordenamos el trabajo en entregables que tengan sentido para el proyecto y para tu disponibilidad.', details: ['Prioridades iniciales', 'Entregas parciales', 'Revisiones coordinadas'] },
  { title: 'Requisitos', subtitle: 'Qué revisar antes de iniciar', icon: <ShieldCheck size={19} />, description: 'Revisamos los recursos y condiciones que pueden influir en la propuesta antes de confirmar su alcance.', details: ['Material disponible', 'Integraciones necesarias', 'Condiciones y presupuesto'] },
];

const ProjectPlanningSelector = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const selected = PLANNING_OPTIONS[activeIndex];

  return (
    <section className="relative mx-auto mt-14 w-full max-w-5xl rounded-[2rem] border border-[#A3E635]/25 bg-[#070907]/95 p-5 text-left shadow-[0_0_55px_rgba(163,230,53,.1)] sm:mt-16 sm:p-8" aria-label="Cómo definimos cada proyecto">
      <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#A3E635]/80 to-transparent" />
      <div className="mb-6 flex flex-col gap-2 text-center sm:mb-7">
        <span className="text-[9px] font-black uppercase tracking-[.2em] text-[#A3E635]">Cada proyecto se conversa</span>
        <h2 className="text-xl font-black text-white sm:text-2xl">¿Qué definimos juntos?</h2>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3" role="tablist" aria-label="Aspectos del proyecto">
        {PLANNING_OPTIONS.map((option, index) => (
          <button key={option.title} type="button" role="tab" id={`planning-tab-${index}`} aria-selected={activeIndex === index} aria-controls="planning-panel" onClick={() => setActiveIndex(index)} className={`group flex min-h-20 items-center gap-4 rounded-2xl border px-5 py-4 text-left transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A3E635] ${activeIndex === index ? 'border-[#A3E635]/70 bg-[#A3E635] text-[#080A06] shadow-[0_12px_30px_rgba(163,230,53,.16)]' : 'border-white/10 bg-white/[.035] text-white hover:border-[#A3E635]/45 hover:bg-[#A3E635]/[.07]'}`}>
            <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${activeIndex === index ? 'bg-black/10 text-black' : 'bg-[#A3E635]/10 text-[#A3E635]'}`}>{option.icon}</span>
            <span><span className="block text-sm font-black">{option.title}</span><span className={`mt-1 block text-[10px] font-semibold ${activeIndex === index ? 'text-black/65' : 'text-slate-400'}`}>{option.subtitle}</span></span>
          </button>
        ))}
      </div>
      <div id="planning-panel" role="tabpanel" aria-labelledby={`planning-tab-${activeIndex}`} className="mt-4 grid gap-5 rounded-2xl border border-white/[.08] bg-[#10120E] p-5 sm:grid-cols-[1fr_auto] sm:items-center sm:p-6">
        <div><h3 className="mb-2 text-lg font-black text-white">{selected.title}</h3><p className="max-w-2xl text-sm leading-relaxed text-slate-300">{selected.description}</p></div>
        <ul className="flex flex-wrap gap-2 sm:max-w-[360px] sm:justify-end">{selected.details.map((detail) => <li key={detail} className="rounded-full border border-[#A3E635]/20 bg-[#A3E635]/[.07] px-3 py-2 text-[10px] font-bold text-[#D7F7A8]">{detail}</li>)}</ul>
      </div>
    </section>
  );
};

const SOLUCIONES = [
  { title: 'Sitios web y catálogos', desc: 'Presencia digital para empresas, profesionales y emprendimientos.', icon: <Globe size={24} />, image: '/img/08_Cards/negocios-web.webp', category: 'DESARROLLO WEB' },
  { title: 'Software a medida', desc: 'Sistemas que se evalúan según requisitos, usuarios y datos.', icon: <Cpu size={24} />, image: '/img/08_Cards/negocios-software.webp', category: 'SOFTWARE' },
  { title: 'Identidad visual', desc: 'Recursos gráficos para presentar una marca o proyecto.', icon: <Store size={24} />, image: '/img/08_Cards/negocios-identidad.webp', category: 'DISEÑO' },
  { title: 'Acompañamiento académico', desc: 'Mentorías y orientación de acuerdo con materia y disponibilidad.', icon: <Users size={24} />, image: '/img/08_Cards/negocios-academico.webp', category: 'ACOMPAÑAMIENTO' }
];

const SolucionesGrid = () => {
  return <ServiceCardsCarousel items={SOLUCIONES} label="Soluciones para negocios" />;
};

const ProcessTimeline = () => {
  const steps = [
    { title: 'Conversamos sobre tu necesidad', desc: 'Entendemos el objetivo, las personas usuarias y el contexto del proyecto.', icon: <BarChart size={20} /> },
    { title: 'Definimos el alcance', desc: 'Revisamos opciones digitales, requisitos y viabilidad.', icon: <Store size={20} /> },
    { title: 'Acordamos una propuesta', desc: 'Detallamos entregables, etapas, tiempos y presupuesto para conversar.', icon: <Cpu size={20} /> },
    { title: 'Desarrollamos lo acordado', desc: 'Avanzamos con revisiones coordinadas y presentamos los entregables definidos.', icon: <TrendingUp size={20} /> },
  ];

  return <ProcessStepsCarousel items={steps.map((step, index) => ({
    ...step,
    category: `Paso ${String(index + 1).padStart(2, '0')}`,
    image: ['/img/08_Cards/metodo-conversamos.webp', '/img/08_Cards/metodo-analizamos.webp', '/img/08_Cards/metodo-proponemos.webp', '/img/08_Cards/metodo-desarrollamos.webp'][index],
  }))} label="Camino para desarrollar tu proyecto" />;
};

const TESTIMONIOS = [
  { name: 'Sitio web', role: 'Ejemplo orientativo', text: 'Quiero presentar mis servicios y recibir consultas desde una página web.' },
  { name: 'Catálogo digital', role: 'Ejemplo orientativo', text: 'Necesito organizar información de productos o servicios en un catálogo.' },
  { name: 'Sistema a medida', role: 'Ejemplo orientativo', text: 'Busco evaluar una herramienta digital según los requisitos de mi negocio.' }
];

const Negocios = () => {
  return (
    <div className="dark relative overflow-hidden min-h-screen bg-[#050505] font-montserrat">
      <CircuitBackground />
      <CircleParticles colorScheme="dark" />
      
      {/* Dynamic Grid Background for Tech feel */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none opacity-20"></div>
      
      <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[80%] h-[60%] bg-[#A3E635]/5 rounded-full blur-[150px] pointer-events-none"></div>

      {/* HERO SECTION - IMMERSIVE DASHBOARD */}
      <section className="relative pt-32 pb-10 z-10 px-6">
        <div className="container mx-auto max-w-7xl text-center flex flex-col items-center">
          
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#A3E635]/30 bg-[#A3E635]/10 text-xs font-black uppercase tracking-widest text-[#A3E635] mb-8 animate-fade-in-up">
            <Globe size={16} /> Ecosistema Corporativo
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-6 animate-fade-in-up uppercase tracking-tighter" style={{ animationDelay: '0.1s' }}>
            Soluciones para <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A3E635] via-yellow-300 to-[#84CC16]">Tu Proyecto</span>
          </h1>
          
          <p className="text-slate-400 text-base md:text-lg max-w-2xl font-medium mb-10 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Desarrollamos sitios web, software y recursos gráficos para emprendimientos y empresas. El alcance, las funciones y las condiciones se conversan según cada caso.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <a href="https://wa.me/59161320004?text=Hola,%20quiero%20digitalizar%20mi%20empresa" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-[#A3E635] text-black font-black text-xs uppercase tracking-widest rounded-xl hover:bg-[#84CC16] transition-all hover:scale-105 shadow-lg shadow-[#A3E635]/20 flex items-center justify-center gap-2">
              Consultar opciones <ArrowRight size={16} />
            </a>
          </div>

          <ProjectPlanningSelector />
        </div>
      </section>

      {/* BENTO BOX GRID SECTION */}
      <section className="py-24 z-10 relative px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight mb-4">
              Soluciones <span className="text-[#A3E635]">Integrales</span>
            </h2>
            <p className="text-slate-400 font-medium max-w-2xl mx-auto">
              Podemos evaluar los componentes que necesitás y acordar cuáles forman parte del proyecto.
            </p>
          </div>

          <SolucionesGrid />
        </div>
      </section>

      {/* TIMELINE SECTION */}
      <section className="py-24 z-10 relative px-6 bg-gradient-to-b from-transparent to-[#0a0a0a]">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            
            <div className="w-full lg:w-1/3 sticky top-32">
              <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-6">
                Tu Camino a la <br/> <span className="text-[#A3E635]">Digitalización</span>
              </h2>
              <p className="text-slate-400 font-medium mb-8">
              Conversamos sobre tus prioridades y revisamos soluciones digitales que puedan ajustarse al alcance y a los recursos disponibles.
              </p>
              <div className="p-6 rounded-2xl bg-[#A3E635]/10 border border-[#A3E635]/30">
                <h4 className="font-black text-white mb-2 flex items-center gap-2"><ShieldCheck className="text-[#A3E635]" size={20}/> Condiciones acordadas</h4>
                <p className="text-sm text-slate-400">Alcance, entregables, tiempos, ajustes y modalidad de seguimiento se conversan en la propuesta.</p>
              </div>
            </div>

            <div className="w-full lg:w-2/3">
              <ProcessTimeline />
            </div>

          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 relative z-10">
        <TestimonialCarousel testimonials={TESTIMONIOS.map((t, idx) => {
          const photos = [
            'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&h=150&q=80',
            'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=150&h=150&q=80',
            'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&h=150&q=80'
          ];
          return { ...t, image: photos[idx % photos.length] };
        })} />
      </section>

      <CenteredProjectCTA title="Tu proyecto digital empieza con una conversación." description="Contanos qué querés resolver y revisemos alternativas, alcance y condiciones según tus posibilidades." buttonLabel="Consultar opciones" href="https://wa.me/59161320004?text=Hola,%20quiero%20conversar%20sobre%20mi%20proyecto" />

    </div>
  );
};

export default Negocios;
