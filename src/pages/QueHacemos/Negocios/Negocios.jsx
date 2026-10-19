import React from 'react';
import { 
  Store, ShoppingCart, TrendingUp, BarChart, ArrowRight, 
  CheckCircle2, Globe, Cpu, Users, Zap, ShieldCheck 
} from 'lucide-react';
import CircuitBackground from '../../../components/fondos/FondoParticulas';
import CircleParticles from '../../../components/fondos/ParticulasCirculares';
import TestimonialCarousel from '../../../components/carouseles/CarruselTestimonios';
import ProcessStepsCarousel from '../../../components/ui/ProcessStepsCarousel';
import ServiceCardsCarousel from '../../../components/ui/ServiceCardsCarousel';
import CenteredProjectCTA from '../../../components/ui/CenteredProjectCTA';
import ProjectPlanningSelector from '../../../components/ui/ProjectPlanningSelector';

const SOLUCIONES = [
  { title: 'Sitios web y tiendas online', desc: 'Páginas corporativas e institucionales, landing pages, portafolios, catálogos, blogs y tiendas con pedidos. Pagos y funciones especiales se revisan según viabilidad.', icon: <Globe size={24} />, image: '/img/08_Cards/negocios-web.webp', category: 'DESARROLLO WEB' },
  { title: 'Sistemas y software a medida', desc: 'Podemos evaluar sistemas de inventario, ventas, facturación, CRM, gestión académica, citas, asistencia y otras herramientas según requisitos y alcance.', icon: <Cpu size={24} />, image: '/img/08_Cards/negocios-software.webp', category: 'SOFTWARE' },
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
            Acompañamos a estudiantes y desarrollamos soluciones web, software y diseño para personas, emprendimientos, empresas e instituciones. Revisamos el alcance y conversamos alternativas según cada necesidad y posibilidades.
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
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight mb-4">
              Soluciones <span className="text-[#A3E635]">Integrales</span>
            </h2>
            <p className="text-slate-400 font-medium max-w-2xl mx-auto">
              Desde acompañamiento académico y diseño gráfico hasta páginas web y software: revisamos cada solicitud y conversamos alcance, etapas y alternativas.
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
