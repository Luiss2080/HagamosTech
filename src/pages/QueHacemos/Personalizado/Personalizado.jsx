import React, { useState, useEffect } from 'react';
import FondoTech from '../../../components/fondos/FondoTech';
import ModernServiceGrid from '../../../components/ui/ModernServiceGrid';
import { Lightbulb, Code, ArrowRight, MessageSquare, Puzzle, Search, Wrench } from 'lucide-react';
import CircuitBackground from '../../../components/fondos/FondoParticulas';
import CircleParticles from '../../../components/fondos/ParticulasCirculares';
import TestimonialCTASection from '../../../components/ui/TestimonialCTASection';
import ProcessStepsCarousel from '../../../components/ui/ProcessStepsCarousel';
import TechToolsCarousel from '../../../components/ui/TechToolsCarousel';
import { HERRAMIENTAS_DESARROLLO } from '../../../data/herramientasCarruselData';

const TESTIMONIOS = [
  { name: 'Panel de gestión', role: 'Ejemplo orientativo', text: 'Necesito organizar información y consultar los datos que son importantes para mi proyecto.' },
  { name: 'Aplicación web', role: 'Ejemplo orientativo', text: 'Quiero conversar sobre una herramienta web y las funciones que podría incluir.' },
  { name: 'Mejora de sistema', role: 'Ejemplo orientativo', text: 'Busco revisar qué cambios son posibles en una aplicación existente según su estado y alcance.' }
];

const ChatAssistantWindow = () => {
  const [messages, setMessages] = useState([]);
  const fullConversation = [
    { role: 'user', text: 'Hola, necesito una herramienta web para registrar solicitudes y consultar su estado.' },
    { role: 'assistant', text: 'Podemos revisar quiénes la usarían y qué información necesitarían registrar.' },
    { role: 'user', text: 'También quisiera consultar el historial y filtrar la información.' },
    { role: 'assistant', text: 'Anotamos esas funciones para evaluar requisitos, alcance y viabilidad antes de conversar una propuesta.' }
  ];

  useEffect(() => {
    let timeoutId;
    let currentIndex = 0;
    
    const showNextMessage = () => {
      if (currentIndex < fullConversation.length) {
        setMessages(prev => {
          if (prev.length > currentIndex) return prev;
          return [...prev, fullConversation[currentIndex]];
        });
        currentIndex++;
        timeoutId = setTimeout(showNextMessage, 1500 + Math.random() * 1000);
      }
    };

    timeoutId = setTimeout(showNextMessage, 500);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto bg-[#0a0a0a] rounded-xl border border-neutral-800 shadow-2xl overflow-hidden mt-10 relative group h-[320px] flex flex-col">
      <div className="flex items-center px-4 py-3 bg-neutral-900 border-b border-neutral-800 gap-3">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <span className="text-xs font-black text-neutral-400 uppercase tracking-widest flex items-center gap-2">
          <MessageSquare size={14} className="text-[#A3E635]" /> Ejemplo de conversación sobre un proyecto
        </span>
      </div>
      
      <div className="p-6 flex-grow overflow-y-auto flex flex-col gap-4">
        {messages.map((másg, idx) => {
          if (!másg) return null;
          return (
            <div key={idx} className={`max-w-[85%] p-3 rounded-2xl text-sm ${
              másg.role === 'user' 
                ? 'bg-neutral-800 text-white self-end rounded-tr-sm border border-neutral-700' 
                : 'bg-[#A3E635]/10 text-[#A3E635] self-start rounded-tl-sm border border-[#A3E635]/20'
            } animate-fade-in-up`} style={{ animationDuration: '0.3s' }}>
              {másg.text}
            </div>
          );
        })}
        {messages.length < fullConversation.length && messages.length > 0 && (
          <div className="self-start text-neutral-500 flex gap-1 p-2">
            <span className="w-1.5 h-1.5 bg-neutral-500 rounded-full animate-bounce" style={{ animationDelay: '0más' }}></span>
            <span className="w-1.5 h-1.5 bg-neutral-500 rounded-full animate-bounce" style={{ animationDelay: '150más' }}></span>
            <span className="w-1.5 h-1.5 bg-neutral-500 rounded-full animate-bounce" style={{ animationDelay: '300más' }}></span>
          </div>
        )}
      </div>
      
      <div className="p-4 border-t border-neutral-800 bg-neutral-950 flex gap-3 items-center">
        <div className="flex-grow h-10 bg-neutral-900 rounded-full border border-neutral-800"></div>
        <div className="w-10 h-10 bg-[#A3E635] rounded-full flex items-center justify-center text-black shadow-lg">
          <ArrowRight size={16} />
        </div>
      </div>
    </div>
  );
};

const ProcessTimeline = () => {
  const steps = [
    { title: 'Conversamos la necesidad', desc: 'Revisamos el objetivo, las personas usuarias y el contexto de tu proyecto.', icon: <Search size={20} /> },
    { title: 'Definimos requisitos', desc: 'Acordamos las funciones, los datos y los perfiles que podrían formar parte de la solución.', icon: <Puzzle size={20} /> },
    { title: 'Desarrollamos lo acordado', desc: 'Trabajamos según el alcance, los entregables y las etapas definidos en la propuesta.', icon: <Code size={20} /> },
    { title: 'Presentamos la entrega', desc: 'Compartimos el resultado y las indicaciones de uso incluidas en el alcance acordado.', icon: <Wrench size={20} /> },
  ];

  return <ProcessStepsCarousel items={steps.map((step, index) => ({
    ...step,
    category: `Fase ${String(index + 1).padStart(2, '0')}`,
    image: ['/img/08_Cards/metodo-conversamos.webp', '/img/08_Cards/metodo-analizamos.webp', '/img/08_Cards/metodo-proponemos.webp', '/img/08_Cards/metodo-desarrollamos.webp'][index],
  }))} label="Proceso de desarrollo personalizado" />;
};

const PROJECTS = [
  {
    num: '01',
    category: 'MODULARES',
    firstPart: 'Proyectos',
    highlightPart: 'Especiales',
    desc: 'Si tienes una idea atípica o un módulo específico que agregar a tu sistema actual, diseñamos exactamente lo que necesitas.',
    icon: 'fa-puzzle-piece',
    images: ['/img/08_Cards/proyecto-personalizado-modulo.webp']
  },
  {
    num: '02',
    category: 'DISEÑO Y DESARROLLO',
    firstPart: 'Interfaces',
    highlightPart: 'y aplicaciones',
    desc: 'Evaluamos interfaces y aplicaciones web según las funciones, los datos y los perfiles de usuario que necesitás.',
    icon: 'fa-lightbulb',
    images: ['/img/08_Cards/proyecto-personalizado-app-web.webp']
  },
  {
    num: '03',
    category: 'HERRAMIENTAS DIGITALES',
    firstPart: 'Paneles',
    highlightPart: 'y herramientas',
    desc: 'Desarrollamos herramientas digitales para organizar información y apoyar tareas definidas dentro del alcance acordado.',
    icon: 'fa-users-gear',
    images: ['/img/08_Cards/proyecto-personalizado-herramienta.webp']
  },
  {
    num: '04',
    category: 'SISTEMAS EXISTENTES',
    firstPart: 'Revisión de',
    highlightPart: 'sistemas',
    desc: 'Evaluamos correcciones o mejoras posibles en sistemas existentes según su estado, disponibilidad y alcance.',
    icon: 'fa-server',
    images: ['/img/08_Cards/proyecto-personalizado-mantenimiento.webp']
  },
  {
    num: '05',
    category: 'DATOS',
    firstPart: 'Bases de',
    highlightPart: 'Datos',
    desc: 'Evaluamos estructura, consultas y reportes para bases de datos según los requisitos del sistema.',
    icon: 'fa-cloud',
    images: ['/img/08_Cards/proyecto-personalizado-base-datos.webp']
  },
  {
    num: '06',
    category: 'RESCATE',
    firstPart: 'Rescate de',
    highlightPart: 'Proyectos',
    desc: 'Podemos revisar un proyecto existente y conversar las mejoras posibles, sujeto a una evaluación previa del código y el alcance.',
    icon: 'fa-life-ring',
    images: ['/img/08_Cards/proyecto-personalizado-rescate.webp']
  }
];
const Personalizado = () => {
  return (
    <div className="dark relative overflow-hidden min-h-screen bg-[#050505] font-montserrat">
      <CircuitBackground />
      <CircleParticles colorScheme="dark" />
      
      {/* Luces Ambientales Tech */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[30%] bg-[#A3E635]/10 blur-[150px] pointer-events-none rounded-b-full"></div>

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 z-10 px-6">
        <FondoTech />
        <div className="container relative z-10 mx-auto max-w-7xl text-center flex flex-col items-center">
          
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#A3E635]/30 bg-[#A3E635]/10 text-xs font-black uppercase tracking-widest text-[#A3E635] mb-8 animate-fade-in-up">
            <Lightbulb size={16} /> Innovación a Medida
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-6 animate-fade-in-up uppercase tracking-tighter" style={{ animationDelay: '0.1s' }}>
            Soluciones digitales <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A3E635] to-[#84CC16]">para lo que necesitás</span>
          </h1>
          
          <p className="text-slate-400 text-lg max-w-2xl font-medium mb-10 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Revisamos necesidades digitales que no encajan en una solución estándar. Conversamos sobre funciones, usuarios, datos y viabilidad para definir un alcance posible.
          </p>

          <div className="flex flex-wrap gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <a href="https://wa.me/59161320004?text=Hola,%20tengo%20un%20proyecto%20o%20problema%20específico%20y%20necesito%20software%20a%20medida" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-[#A3E635] text-black font-black text-xs uppercase tracking-widest rounded-xl hover:bg-[#84CC16] transition-all hover:scale-105 shadow-lg shadow-[#A3E635]/20 flex items-center gap-2">
              Conversar sobre mi proyecto <ArrowRight size={16} />
            </a>
          </div>

          <ChatAssistantWindow />
        </div>
      </section>

      {/* STACK TECNOL�GICO INFINITO */}
      <section className="relative z-10 py-10 sm:py-14">
        <FondoTech />
        <div className="relative z-10">
          <TechToolsCarousel items={HERRAMIENTAS_DESARROLLO} label="Tecnologías y herramientas" description="Conocé recursos que pueden evaluarse para las funciones y el alcance de tu solución." />
        </div>
      </section>

      {/* BENTO BOX GRID SECTION */}
      <section className="py-24 z-10 relative px-6">
        <FondoTech />
        <div className="container relative z-10 mx-auto max-w-6xl">
          <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight mb-4">
              Soluciones <span className="text-[#A3E635]">a medida</span>
            </h2>
            <p className="text-slate-400 font-medium max-w-2xl mx-auto">
              Evaluamos herramientas internas, paneles, bases de datos y aplicaciones web o móviles según la necesidad, el alcance y la viabilidad.
            </p>
          </div>

          <ModernServiceGrid projects={PROJECTS} />
        </div>
      </section>
      
      {/* TIMELINE SECTION */}
      <section className="py-20 z-10 relative px-6 bg-gradient-to-b from-transparent to-[#0a0a0a]">
        <FondoTech />
         <div className="container relative z-10 mx-auto max-w-7xl">
          <header className="mx-auto mb-8 max-w-3xl text-center sm:mb-10">
            <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#A3E635]/25 bg-[#A3E635]/[.06] px-3 py-1.5 text-[10px] font-black uppercase tracking-[.2em] text-[#A3E635]">
              <Puzzle size={13} aria-hidden="true" /> Proceso a medida
            </span>
            <h2 className="text-3xl font-black uppercase tracking-tight text-white sm:text-4xl md:text-5xl">
              El proceso de <span className="text-[#A3E635]">creación</span>
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm font-medium leading-relaxed text-slate-300 sm:text-base">
                Conversamos sobre requisitos y alternativas antes de definir las etapas y entregables del desarrollo.
            </p>
          </header>
          <ProcessTimeline />
        </div>
      </section>

      {/* TESTIMONIALS */}
      <TestimonialCTASection
        testimonialTitle="Ideas de proyectos a medida"
        testimonialDescription="Ejemplos orientativos para definir objetivos, funciones y alcance. No representan testimonios ni resultados de clientes."
        testimonials={TESTIMONIOS.map((t, idx) => {
          const photos = [
            'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&h=150&q=80',
            'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&h=150&q=80',
            'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&h=150&q=80'
          ];
          return { ...t, image: photos[idx % photos.length] };
        })}
        cta={{
          title: 'Conversemos sobre una solución a tu medida.',
          description: 'Revisamos el objetivo, las funciones y el alcance para explorar una propuesta ajustada a tus posibilidades.',
          buttonLabel: 'Hablar del proyecto',
          href: 'https://wa.me/59161320004?text=Hola,%20quiero%20conversar%20sobre%20una%20solución%20a%20medida',
          eyebrow: 'SOLUCIONES PERSONALIZADAS',
          image: '/img/08_Cards/proyecto-personalizado-app-web.webp',
          imageAlt: 'Interfaz de una aplicación web a medida',
        }}
      />

    </div>
  );
};

export default Personalizado;
