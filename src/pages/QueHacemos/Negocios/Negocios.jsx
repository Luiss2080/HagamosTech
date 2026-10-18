import React from 'react';
import { 
  Store, ShoppingCart, TrendingUp, BarChart, ArrowRight, 
  CheckCircle2, Globe, Cpu, Users, Zap, ShieldCheck 
} from 'lucide-react';
import CircuitBackground from '../../../components/fondos/FondoParticulas';
import CircleParticles from '../../../components/fondos/ParticulasCirculares';
import TestimonialCarousel from '../../../components/carouseles/CarruselTestimonios';
import ServiceCardsCarousel from '../../../components/ui/ServiceCardsCarousel';

const DynamicDashboard = () => {
  const revenue = "A definir";
  const users = "A definir";
  const conversion = "A evaluar";


  return (
    <div className="relative w-full max-w-4xl mx-auto mt-16 p-1 rounded-[2rem] bg-gradient-to-br from-[#A3E635]/30 via-neutral-800 to-[#84CC16]/10 shadow-[0_0_50px_rgba(163,230,53,0.15)] animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
      <div className="bg-[#050505] rounded-[1.8rem] p-6 md:p-8 flex flex-col md:flex-row gap-6 items-center justify-between border border-neutral-900 overflow-hidden relative">
        <p className="absolute top-2 left-4 z-10 text-[9px] font-bold uppercase tracking-wider text-slate-500">Vista ilustrativa: indicadores ficticios, no son resultados de clientes.</p>
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#A3E635]/10 rounded-full blur-[80px] pointer-events-none"></div>
        
        {/* Metric 1 */}
        <div className="flex-1 text-center md:text-left z-10 w-full md:w-auto p-4 rounded-2xl bg-neutral-900/50 border border-neutral-800/50 hover:bg-neutral-900 hover:border-[#A3E635]/30 transition-all">
          <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-2 flex items-center justify-center md:justify-start gap-2">
            <TrendingUp size={14} className="text-[#A3E635]" /> Indicador a definir
          </p>
          <p className="text-3xl md:text-4xl font-black text-white font-mono">{revenue}</p>
        </div>

        {/* Metric 2 */}
        <div className="flex-1 text-center md:text-left z-10 w-full md:w-auto p-4 rounded-2xl bg-neutral-900/50 border border-neutral-800/50 hover:bg-neutral-900 hover:border-[#A3E635]/30 transition-all">
          <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-2 flex items-center justify-center md:justify-start gap-2">
            <Users size={14} className="text-[#A3E635]" /> Dato a definir
          </p>
          <p className="text-3xl md:text-4xl font-black text-white font-mono">{users}</p>
        </div>

        {/* Metric 3 */}
        <div className="flex-1 text-center md:text-left z-10 w-full md:w-auto p-4 rounded-2xl bg-neutral-900/50 border border-neutral-800/50 hover:bg-neutral-900 hover:border-[#A3E635]/30 transition-all">
          <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-2 flex items-center justify-center md:justify-start gap-2">
            <Zap size={14} className="text-[#A3E635]" /> Métrica por acordar
          </p>
          <p className="text-3xl md:text-4xl font-black text-[#A3E635] font-mono">{conversion}</p>
        </div>
      </div>
    </div>
  );
};

const SOLUCIONES = [
  { title: 'Sitios web y catálogos', desc: 'Presencia digital para empresas, profesionales y emprendimientos.', icon: <Globe size={24} />, image: '/img/07_Servicios/soluciones/hero-web-v2.webp', category: 'DESARROLLO WEB' },
  { title: 'Software a medida', desc: 'Sistemas que se evalúan según requisitos, usuarios y datos.', icon: <Cpu size={24} />, image: '/img/07_Servicios/soluciones/hero-sistemas-v2.webp', category: 'SOFTWARE' },
  { title: 'Identidad visual', desc: 'Recursos gráficos para presentar una marca o proyecto.', icon: <Store size={24} />, image: '/img/07_Servicios/soluciones/hero-diseno-v2.webp', category: 'DISEÑO' },
  { title: 'Acompañamiento académico', desc: 'Mentorías y orientación de acuerdo con materia y disponibilidad.', icon: <Users size={24} />, image: '/img/07_Servicios/soluciones/hero-academico-v2.webp', category: 'ACOMPAÑAMIENTO' }
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

  return (
    <div className="relative border-l-2 border-neutral-800 ml-6 md:ml-10 py-10">
      {steps.map((step, idx) => (
        <div key={idx} className="mb-16 relative pl-10 md:pl-16 group">
          <div className="absolute left-[-21px] top-0 w-10 h-10 rounded-full bg-black border-2 border-neutral-800 flex items-center justify-center text-[#A3E635] group-hover:border-[#A3E635] group-hover:bg-[#A3E635]/10 transition-colors duration-500 shadow-lg">
            {step.icon}
          </div>
          <div className="bg-neutral-900/30 p-6 rounded-2xl border border-neutral-800/50 hover:bg-neutral-900/60 transition-colors duration-300">
            <h4 className="text-xl font-black text-white mb-2 flex items-center gap-3">
              <span className="text-[#A3E635] text-xs font-mono">STEP 0{idx + 1}</span> {step.title}
            </h4>
            <p className="text-slate-400 font-medium">{step.desc}</p>
          </div>
        </div>
      ))}
      <div className="absolute bottom-0 left-[-6px] w-3 h-3 rounded-full bg-[#A3E635] animate-ping"></div>
    </div>
  );
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

          <DynamicDashboard />
        </div>
      </section>

      {/* METRICS ASIDE */}
      <section className="py-12 z-10 relative px-6 border-b border-neutral-900 bg-neutral-950/50">
        <div className="container mx-auto max-w-7xl">
           <div className="flex flex-wrap justify-center gap-10 md:gap-24 opacity-80">
              <div className="text-center">
                <h4 className="text-3xl font-black text-white">A medida</h4>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Ejemplo de solución</p>
              </div>
              <div className="text-center">
                <h4 className="text-3xl font-black text-white">A revisar</h4>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Alcance a definir</p>
              </div>
              <div className="text-center">
                <h4 className="text-3xl font-black text-white">A coordinar</h4>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Atención a coordinar</p>
              </div>
              <div className="text-center">
                <h4 className="text-3xl font-black text-white">Según alcance</h4>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Sujeto a evaluación</p>
              </div>
           </div>
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
                No vendemos código genérico. Construimos estrategias tangibles y sistemas que se acoplan perfectamente al ADN de tu empresa.
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

      {/* BUSINESS CTA */}
      <section className="py-20 z-10 relative px-6 pb-32">
        <div className="container mx-auto max-w-5xl">
          <div className="p-12 md:p-24 rounded-[3rem] bg-[#A3E635] text-black text-center relative overflow-hidden group/cta hover:scale-[1.01] transition-all duration-500 shadow-[0_0_40px_rgba(163,230,53,0.15)] hover:shadow-[0_0_80px_rgba(163,230,53,0.3)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/40 via-transparent to-black/60 opacity-50 group-hover/cta:scale-110 transition-transform duration-1000"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/30 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover/cta:-translate-x-10 transition-transform duration-1000"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/20 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 group-hover/cta:translate-x-10 transition-transform duration-1000"></div>
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80')] opacity-[0.03] mix-blend-overlay object-cover pointer-events-none group-hover/cta:opacity-[0.08] transition-opacity duration-700"></div>
            
            <h2 className="text-5xl md:text-7xl font-black mb-6 relative z-10 uppercase tracking-tighter drop-shadow-lg leading-none">
              Contanos qué <br className="hidden md:block" /> necesitás.
            </h2>
            <p className="text-lg md:text-2xl font-bold opacity-80 mb-12 max-w-3xl mx-auto relative z-10 leading-relaxed">
              Cada día sin digitalizar es un cliente que le regalas a la competencia. Moderniza tu empresa hoy mismo.
            </p>
            
            <a href="https://wa.me/59161320004?text=Hola,%20es%20hora%20de%20digitalizar%20mi%20negocio" target="_blank" rel="noopener noreferrer" className="relative z-10 inline-flex items-center gap-4 px-10 md:px-14 py-6 bg-black text-[#A3E635] rounded-full font-black text-sm md:text-lg uppercase tracking-widest hover:scale-110 transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.7)] group/btn overflow-hidden">
              <span className="relative z-20">Solicitar Presupuesto</span>
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#A3E635]/20 flex items-center justify-center group-hover/btn:translate-x-2 transition-transform relative z-20">
                <Zap size={20} className="md:w-6 md:h-6" />
              </div>
              <div className="absolute inset-0 bg-white opacity-0 group-hover/btn:opacity-10 transition-opacity z-10"></div>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Negocios;
