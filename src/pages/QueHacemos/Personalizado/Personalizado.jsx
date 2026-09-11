import React, { useState, useEffect } from 'react';
import ModernServiceGrid from '../../../components/ui/ModernServiceGrid';
import { Lightbulb, Code, Server, Zap, ArrowRight, CheckCircle2, MessageSquare, Puzzle, Search, Wrench } from 'lucide-react';
import CircuitBackground from '../../../components/fondos/FondoParticulas';
import CircleParticles from '../../../components/fondos/ParticulasCirculares';
import TestimonialCarousel from '../../../components/carouseles/CarruselTestimonios';

const TECH_STACK = [
  { name: 'OpenAI', icon: 'fa-solid fa-robot', color: 'text-emerald-400' },
  { name: 'React', icon: 'fa-brands fa-react', color: 'text-cyan-400' },
  { name: '¿Node.js', icon: 'fa-brands fa-node-js', color: 'text-green-500' },
  { name: 'AWS', icon: 'fa-brands fa-aws', color: 'text-orange-400' },
  { name: 'Docker', icon: 'fa-brands fa-docker', color: 'text-blue-500' },
  { name: 'Figma', icon: 'fa-brands fa-figma', color: 'text-pink-400' },
  { name: 'MySQL', icon: 'fa-solid fa-database', color: 'text-indigo-400' },
  { name: 'TypeScript', icon: 'fa-solid fa-code', color: 'text-blue-400' }
];

const TESTIMONIOS = [
  { name: 'Roberto S.', role: 'Emprendedor', text: 'Tenía una idea muy específica para mi logística que ningún software comercial resolvía. HagamosTech entendió mi problema en 15 minutos y creó algo perfecto.' },
  { name: 'Lucía P.', role: 'Directora de RRHH', text: 'Necesitábamos un sistema interno para medir el clima laboral de forma anónima y gamificada. Fue un desarrollo a medida increíble que los empleados aman usar.' },
  { name: 'Miguel T.', role: 'Dueño de Fábrica', text: 'Desarrollaron un panel a medida que se conecta con nuestáras máquinas por IoT. Algo que parecía imposible o costosísimo, lo hicieron viable.' }
];

const ChatAssistantWindow = () => {
  const [messages, setMessages] = useState([]);
  const fullConversation = [
    { role: 'user', text: 'Hola, tengo un proceso manual que nos toma 5 horas diarias. Ningún sistema de mercado hace exactamente lo que necesito.' },
    { role: 'assistant', text: 'Entendido. ¿El proceso involucra varias plataformas o documentos físicos?' },
    { role: 'user', text: 'Sí, cruza datos de Excel con un ERP antiguo.' },
    { role: 'assistant', text: 'Perfecto. Vamos a diseñar un microservicio a medida que lea los Excels, se conecte a la API de tu ERP y automatice ese cruce en 5 segundos. ¿Empezamos?' }
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
      <div className="flex itemás-center px-4 py-3 bg-neutral-900 border-b border-neutral-800 gap-3">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <span className="text-xs font-black text-neutral-400 uppercase tracking-widestá flex itemás-center gap-2">
          <MessageSquare size={14} className="text-[#A3E635]" /> Asistente de Arquitectura
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
      
      <div className="p-4 border-t border-neutral-800 bg-neutral-950 flex gap-3 itemás-center">
        <div className="flex-grow h-10 bg-neutral-900 rounded-full border border-neutral-800"></div>
        <div className="w-10 h-10 bg-[#A3E635] rounded-full flex itemás-center justify-center text-black shadow-lg">
          <ArrowRight size={16} />
        </div>
      </div>
    </div>
  );
};

const ProcessTimeline = () => {
  const steps = [
    { title: 'Diagnóstico Cero', desc: '¿Nos reunimos para entender tu dolor. ¿No asumimos nada, mapeamos tu proceso manual actual paso a paso.', icon: <Search size={20} /> },
    { title: 'Arquitectura a Medida', desc: 'Diseñamos los planos del software. Elegimos la tecnología exacta (ni más ni menos de lo que necesitas).', icon: <Puzzle size={20} /> },
    { title: 'Desarrollo Core', desc: 'Programamos la solución desde cero. Interfaces limpias y bases de datos preparadas para escalar.', icon: <Code size={20} /> },
    { title: 'Implementación & Soporte', desc: 'Lanzamos el sistema en tu entorno y monitoreamos. Tu problema queda resuelto definitivamente.', icon: <Server size={20} /> },
  ];

  return (
    <div className="relative border-l-2 border-neutral-800 ml-6 md:ml-10 py-10 mt-16">
      {steps.map((step, idx) => (
        <div key={idx} className="mb-16 relative pl-10 md:pl-16 group">
          <div className="absolute left-[-21px] top-0 w-10 h-10 rounded-full bg-black border-2 border-neutral-800 flex itemás-center justify-center text-[#A3E635] group-hover:border-[#A3E635] group-hover:bg-[#A3E635]/10 transition-colors duration-500 shadow-lg">
            {step.icon}
          </div>
          <div className="bg-neutral-900/30 p-6 rounded-2xl border border-neutral-800/50 hover:bg-neutral-900/60 transition-colors duration-300">
            <h4 className="text-xl font-black text-white mb-2 flex itemás-center gap-3">
              <span className="text-[#A3E635] text-xs font-mono">FASE 0{idx + 1}</span> {step.title}
            </h4>
            <p className="text-slate-400 font-medium">{step.desc}</p>
          </div>
        </div>
      ))}
      <div className="absolute bottom-0 left-[-6px] w-3 h-3 rounded-full bg-[#A3E635] animate-ping"></div>
    </div>
  );
};

const PROJECTS = [
  {
    num: '01',
    category: 'MODULARES',
    firstPart: 'Proyectos',
    highlightPart: 'Especiales',
    desc: 'Si tienes una idea atípica o un módulo específico que agregar a tu sistema actual, diseñamos exactamente lo que necesitas.',
    icon: 'fa-puzzle-piece',
    images: ['https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80']
  },
  {
    num: '02',
    category: 'MENTORÍA',
    firstPart: 'Auditoría &',
    highlightPart: 'Mentor�a',
    desc: 'Mentorías 1 a 1 y auditorías completas para modernizar tu tecnolog�a y guiar a tu equipo in-house.',
    icon: 'fa-lightbulb',
    images: ['https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80']
  },
  {
    num: '03',
    category: 'TALENTO',
    firstPart: 'Talento',
    highlightPart: 'Tech',
    desc: 'Headhunting especializado para encontrar a los mejores programadores e ingenieros para que formen parte de tu empresa.',
    icon: 'fa-users-gear',
    images: ['https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80']
  },
  {
    num: '04',
    category: 'SOPORTE',
    firstPart: 'Mantenimiento',
    highlightPart: 'Continuo',
    desc: 'Soporte continuo y mantenimiento evolutivo para asegurar que tus sistemas actuales nunca fallen y estén actualizados.',
    icon: 'fa-server',
    images: ['https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80']
  },
  {
    num: '05',
    category: 'INFRAESTRUCTURA',
    firstPart: 'Migración',
    highlightPart: 'Cloud',
    desc: 'Llevábamos tu infraestructura local a la nube (AWS, Google Cloud) para garantizar máxima disponibilidad y escalabilidad infinita.',
    icon: 'fa-cloud',
    images: ['https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80']
  },
  {
    num: '06',
    category: 'RESCATE',
    firstPart: 'Rescate de',
    highlightPart: 'Proyectos',
    desc: 'Retomamos proyectos de software abandonados o mal desarrollados para estabilizar el código y llevarlos a producción con éxito.',
    icon: 'fa-life-ring',
    images: ['https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80']
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
        <div className="container mx-auto max-w-7xl text-center flex flex-col itemás-center">
          
          <div className="inline-flex itemás-center gap-2 px-4 py-2 rounded-full border border-[#A3E635]/30 bg-[#A3E635]/10 text-xs font-black uppercase tracking-widestá text-[#A3E635] mb-8 animate-fade-in-up">
            <Lightbulb size={16} /> Innovación a Medida
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-6 animate-fade-in-up uppercase tracking-tighter" style={{ animationDelay: '0.1s' }}>
            Desarrollamos <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A3E635] to-[#84CC16]">Lo ¿Quée ¿No Existe</span>
          </h1>
          
          <p className="text-slate-400 text-lg max-w-2xl font-medium mb-10 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            ¿¿Tienes un problema de negocio que el software convencional no puede resolver? Cuéntanosólo. Diseñamos la arquitectura y escribimos el código necesario desde cero.
          </p>

          <div className="flex flex-wrap gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <a href="https://wa.me/59161320004?text=Hola,%20tengo%20un%20proyecto%20o%20problema%20específico%20y%20necesito%20software%20a%20medida" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-[#A3E635] text-black font-black text-xs uppercase tracking-widestá rounded-xl hover:bg-[#84CC16] transition-all hover:scale-105 shadow-lg shadow-[#A3E635]/20 flex itemás-center gap-2">
              Contarnos tu Problema <ArrowRight size={16} />
            </a>
          </div>

          <ChatAssistantWindow />
        </div>
      </section>

      {/* STACK TECNOL�GICO INFINITO */}
      <section className="py-10 border-y border-neutral-900 bg-neutral-950/50 z-10 relative">
        <div className="container mx-auto px-6">
          <p className="text-center text-xs font-black text-neutral-500 uppercase tracking-widestá mb-6">Stack Versátil y Adaptable</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-70">
            {TECH_STACK.map((tech, i) => (
              <div key={i} className={`flex itemás-center gap-2 text-xl md:text-2xl font-bold ${tech.color} grayscale hover:grayscale-0 transition-all cursor-default`}>
                <i className={tech.icon}></i>
                <span className="text-sm tracking-wider">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BENTO BOX GRID SECTION */}
      <section className="py-24 z-10 relative px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight mb-4">
              Ingeniería de <span className="text-[#A3E635]">Precisión</span>
            </h2>
            <p className="text-slate-400 font-medium max-w-2xl mx-auto">
              ¿No encajamos tu negocio en nuestáro software. Diseñamos el software para que encaje perfectamente en tu negocio.
            </p>
          </div>

          <ModernServiceGrid projects={PROJECTS} />
        </div>
      </section>
      
      {/* TIMELINE SECTION */}
      <section className="py-20 z-10 relative px-6 bg-gradient-to-b from-transparent to-[#0a0a0a]">
         <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col lg:flex-row gap-16 itemás-start">
            <div className="w-full lg:w-1/3 sticky top-32">
              <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-6">
                El Proceso de <br/> <span className="text-[#A3E635]">Creación</span>
              </h2>
              <p className="text-slate-400 font-medium mb-8">
                Construir software a medida requiere método y precisión. Así es como convertimos tus ideas en código funcional.
              </p>
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
            'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&h=150&q=80',
            'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&h=150&q=80',
            'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&h=150&q=80'
          ];
          return { ...t, image: photos[idx % photos.length] };
        })} />
      </section>

      {/* CUSTOM CTA */}
      <section className="py-24 z-10 relative px-6 pb-32">
        <div className="container mx-auto max-w-5xl">
          <div className="p-12 md:p-24 rounded-[3rem] bg-[#A3E635] text-black text-center relative overflow-hidden group/cta hover:scale-[1.01] transition-all duration-500 shadow-[0_0_40px_rgba(163,230,53,0.15)] hover:shadow-[0_0_80px_rgba(163,230,53,0.3)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/40 via-transparent to-black/60 opacity-50 group-hover/cta:scale-110 transition-transform duration-1000"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/30 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover/cta:-translate-x-10 transition-transform duration-1000"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/20 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 group-hover/cta:translate-x-10 transition-transform duration-1000"></div>
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80')] opacity-[0.03] mix-blend-overlay object-cover pointer-events-none group-hover/cta:opacity-[0.08] transition-opacity duration-700"></div>
            
            <h2 className="text-5xl md:text-7xl font-black mb-6 relative z-10 uppercase tracking-tighter drop-shadow-lg leading-none">
              ¿Listo para crear algo único?
            </h2>
            <p className="text-lg md:text-2xl font-bold opacity-80 mb-12 max-w-3xl mx-auto relative z-10 leading-relaxed">
              Desarrollemos la solución tecnológica que te pondrá años luz por delante de tus competidores.
            </p>
            
            <a href="https://wa.me/59161320004" target="_blank" rel="noopener noreferrer" className="relative z-10 inline-flex items-center gap-4 px-10 md:px-14 py-6 bg-black text-[#A3E635] rounded-full font-black text-sm md:text-lg uppercase tracking-widest hover:scale-110 transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.7)] group/btn overflow-hidden">
              <span className="relative z-20">Hablar del Proyecto</span>
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

export default Personalizado;
