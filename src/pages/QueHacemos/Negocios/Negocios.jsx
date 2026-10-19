import React from 'react';
import FondoTech from '../../../components/fondos/FondoTech';
import { 
  Store, TrendingUp, BarChart, ArrowRight,
  Globe, Cpu, Users, ShieldCheck
} from 'lucide-react';
import CircuitBackground from '../../../components/fondos/FondoParticulas';
import CircleParticles from '../../../components/fondos/ParticulasCirculares';
import TestimonialCarousel from '../../../components/carouseles/CarruselTestimonios';
import ProcessStepsCarousel from '../../../components/ui/ProcessStepsCarousel';
import ServiceCardsCarousel from '../../../components/ui/ServiceCardsCarousel';
import ProjectPlanningSelector from '../../../components/ui/ProjectPlanningSelector';

const SOLUCIONES = [
  { title: 'Sitios, plataformas y tiendas online', desc: 'Sitios corporativos, portales educativos e institucionales, landing pages, catálogos, blogs, cursos, reservas, comunidades y tiendas con pedidos. Funciones y pagos se revisan según viabilidad.', icon: <Globe size={24} />, image: '/img/08_Cards/negocios-web.webp', category: 'DESARROLLO WEB' },
  { title: 'Sistemas y software a medida', desc: 'ERP, inventario, ventas/POS, facturación, CRM, gestión documental y sistemas para clínicas, hoteles, gimnasios, talleres, transporte o producción. Portales académicos pueden incluir perfiles, notas, inscripciones, pagos, comunicados, bibliotecas y aulas virtuales según alcance.', icon: <Cpu size={24} />, image: '/img/08_Cards/negocios-software.webp', category: 'SOFTWARE' },
  { title: 'Diseño gráfico e identidad', desc: 'Logos, identidad visual, flyers, banners, catálogos, tarjetas y piezas para difusión digital o impresión.', icon: <Store size={24} />, image: '/img/08_Cards/negocios-identidad.webp', category: 'DISEÑO' },
  { title: 'Acompañamiento académico', desc: 'Mentorías y orientación en tareas guiadas, informes, monografías y proyectos socioformativos, según materia y disponibilidad. Cada estudiante desarrolla su propio trabajo.', icon: <Users size={24} />, image: '/img/08_Cards/negocios-academico.webp', category: 'ACOMPAÑAMIENTO' }
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
  { name: 'Sitio web', role: 'Ejemplo de necesidad', text: 'Quiero presentar mi empresa, explicar mis servicios, mostrar trabajos y facilitar que las personas interesadas puedan consultarme.' },
  { name: 'Catálogo digital', role: 'Ejemplo de necesidad', text: 'Necesito ordenar mis productos o servicios por categorías, incluir descripciones claras y compartir el catálogo fácilmente con mis clientes.' },
  { name: 'Sistema a medida', role: 'Ejemplo de necesidad', text: 'Busco organizar información y tareas de mi negocio en una herramienta que responda a requisitos y funciones que podamos definir.' }
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
        <FondoTech />
        <div className="container mx-auto max-w-7xl text-center flex flex-col items-center">
          
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#A3E635]/30 bg-[#A3E635]/10 text-xs font-black uppercase tracking-widest text-[#A3E635] mb-8 animate-fade-in-up">
            <Globe size={16} /> Ecosistema Corporativo
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-6 animate-fade-in-up uppercase tracking-tighter" style={{ animationDelay: '0.1s' }}>
            Soluciones para <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A3E635] via-yellow-300 to-[#84CC16]">Tu Proyecto</span>
          </h1>
          
          <p className="text-slate-400 text-base md:text-lg max-w-2xl font-medium mb-10 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Desarrollamos páginas, tiendas, portales institucionales, aplicaciones y sistemas empresariales; también ofrecemos diseño gráfico y acompañamiento académico. Revisamos el alcance y conversamos alternativas según cada necesidad y posibilidades.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <a href="https://wa.me/59161320004?text=Hola,%20quiero%20consultar%20por%20un%20servicio%20de%20HagamosTech" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-[#A3E635] text-black font-black text-xs uppercase tracking-widest rounded-xl hover:bg-[#84CC16] transition-all hover:scale-105 shadow-lg shadow-[#A3E635]/20 flex items-center justify-center gap-2">
              Consultar opciones <ArrowRight size={16} />
            </a>
          </div>

          <ProjectPlanningSelector />
        </div>
      </section>

      {/* BENTO BOX GRID SECTION */}
      <section className="py-24 z-10 relative px-6">
        <FondoTech />
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight mb-4">
              Soluciones <span className="text-[#A3E635]">Integrales</span>
            </h2>
            <p className="text-slate-400 font-medium max-w-2xl mx-auto">
              Desde recursos académicos y diseño gráfico hasta plataformas web, aplicaciones móviles, sistemas de gestión, bases de datos e integraciones técnicas viables.
            </p>
          </div>

          <SolucionesGrid />
        </div>
      </section>

      {/* TIMELINE SECTION */}
      <section className="py-24 z-10 relative px-6 bg-gradient-to-b from-transparent to-[#0a0a0a]">
        <FondoTech />
        <div className="container mx-auto max-w-7xl">
          <div className="mb-8 grid items-end gap-6 lg:mb-10 lg:grid-cols-[1fr_1fr]">
            <div>
              <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#A3E635]/25 bg-[#A3E635]/[0.06] px-3 py-1.5 text-[10px] font-black uppercase tracking-[.2em] text-[#A3E635]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#A3E635]" /> Así trabajamos
              </span>
              <h2 className="text-3xl font-black uppercase leading-tight tracking-tight text-white sm:text-4xl">
                Tu camino a la <span className="text-[#A3E635]">digitalización</span>
              </h2>
            </div>
            <div className="lg:justify-self-end lg:max-w-xl">
              <p className="text-sm font-medium leading-relaxed text-slate-300 sm:text-base">
                Conversamos sobre tus prioridades y revisamos opciones que puedan ajustarse al alcance y a los recursos disponibles.
              </p>
              <div className="mt-4 flex items-start gap-3 border-l-2 border-[#A3E635]/70 pl-4 text-sm leading-relaxed text-slate-400">
                <ShieldCheck className="mt-0.5 shrink-0 text-[#A3E635]" size={18} aria-hidden="true" />
                <span>Entregables, etapas, tiempos, ajustes y modalidad de seguimiento se acuerdan en la propuesta.</span>
              </div>
            </div>
          </div>
          <ProcessTimeline />
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="relative z-10 overflow-hidden px-6 py-20 sm:py-24">
        <FondoTech />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-[min(900px,90vw)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#A3E635]/[0.06] blur-[100px]" />
        <div className="relative mx-auto max-w-7xl">
          <TestimonialCarousel title="Ideas de soluciones para empezar" description="Puntos de partida para adaptar cada propuesta al objetivo, las funciones y las posibilidades del proyecto. No son testimonios de clientes." testimonials={TESTIMONIOS.map((t, idx) => {
          const photos = [
            'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&h=150&q=80',
            'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=150&h=150&q=80',
            'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&h=150&q=80'
          ];
          return { ...t, image: photos[idx % photos.length] };
          })} />
        </div>
      </section>

      <section className="relative z-10 px-6 pb-24 pt-8 sm:pb-32">
        <FondoTech />
        <div className="group relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-white/10 bg-[#0B0D09] shadow-[0_28px_100px_rgba(0,0,0,.4)] sm:rounded-[2.5rem]">
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgba(163,230,53,.09),transparent_48%,rgba(163,230,53,.035))]" />
          <div className="pointer-events-none absolute -right-20 -top-36 h-96 w-96 rounded-full border border-[#A3E635]/10 transition-transform duration-700 group-hover:translate-x-4 group-hover:translate-y-4" />
          <div className="pointer-events-none absolute -right-4 -top-20 h-72 w-72 rounded-full border border-[#A3E635]/10" />
          <div className="relative grid items-center gap-10 px-7 py-10 sm:px-12 sm:py-14 lg:grid-cols-[1fr_auto] lg:px-16 lg:py-16">
            <div className="max-w-3xl">
              <span className="mb-5 inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[.22em] text-[#A3E635]">
                <span className="h-2 w-2 rounded-full bg-[#A3E635] shadow-[0_0_14px_rgba(163,230,53,.8)]" /> Hablemos de tu idea
              </span>
              <h2 className="text-3xl font-black uppercase leading-[1.05] tracking-tight text-white sm:text-5xl">
                ¿Qué necesitás <span className="text-[#A3E635]">resolver?</span>
              </h2>
              <p className="mt-5 max-w-2xl text-sm font-medium leading-relaxed text-slate-300 sm:text-base">
                Contanos tu objetivo. Revisamos alternativas de desarrollo, diseño o acompañamiento y conversamos alcance, etapas y presupuesto de acuerdo con tu situación.
              </p>
              <div className="mt-7 flex flex-wrap gap-2 text-[9px] font-extrabold uppercase tracking-wider text-slate-300 sm:text-[10px]">
                {['Desarrollo web', 'Software a medida', 'Diseño gráfico', 'Apoyo académico'].map((item) => (
                  <span key={item} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2">{item}</span>
                ))}
              </div>
            </div>
            <a href="https://wa.me/59161320004?text=Hola,%20quiero%20conversar%20sobre%20mi%20proyecto" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-14 items-center justify-center gap-3 self-center rounded-full bg-[#A3E635] px-7 py-4 text-xs font-black uppercase tracking-[.12em] text-black shadow-[0_12px_36px_rgba(163,230,53,.2)] transition-all hover:-translate-y-1 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#A3E635] sm:px-9">
              Consultar proyecto <ArrowRight size={17} aria-hidden="true" />
            </a>
          </div>
          <div className="h-1 w-full bg-gradient-to-r from-transparent via-[#A3E635] to-transparent opacity-70" />
        </div>
      </section>

    </div>
  );
};

export default Negocios;
