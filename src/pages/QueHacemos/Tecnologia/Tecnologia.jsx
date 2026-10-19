import React, { useState, useEffect } from 'react';
import FondoTech from '../../../components/fondos/FondoTech';
import { Terminal, Code, Cpu, Database, Zap, ArrowRight, ShieldCheck, Server, ChevronRight } from 'lucide-react';
import CircuitBackground from '../../../components/fondos/FondoParticulas';
import CircleParticles from '../../../components/fondos/ParticulasCirculares';
import { Link } from 'react-router-dom';
import TestimonialCarousel from '../../../components/carouseles/CarruselTestimonios';
import ServiceCardsCarousel from '../../../components/ui/ServiceCardsCarousel';
import ToolsMarquee from '../../../components/ui/ToolsMarquee';
import FeatureTimeline from '../../../components/ui/FeatureTimeline';
import CenteredProjectCTA from '../../../components/ui/CenteredProjectCTA';

const TECH_STACK = [
  { name: 'React', icon: 'fa-brands fa-react', color: 'text-cyan-400' },
  { name: 'JavaScript', icon: 'fa-brands fa-js', color: 'text-yellow-400' },
  { name: 'TypeScript', icon: 'fa-solid fa-code', color: 'text-blue-400' },
  { name: 'Vite', icon: 'fa-solid fa-bolt', color: 'text-violet-400' },
  { name: 'HTML5', icon: 'fa-brands fa-html5', color: 'text-orange-400' },
  { name: 'CSS3', icon: 'fa-brands fa-css3-alt', color: 'text-blue-400' },
  { name: 'Tailwind CSS', icon: 'fa-solid fa-wind', color: 'text-cyan-300' },
  { name: 'Node.js', icon: 'fa-brands fa-node-js', color: 'text-green-500' },
  { name: 'Express', icon: 'fa-solid fa-route', color: 'text-slate-300' },
  { name: 'MySQL', icon: 'fa-solid fa-database', color: 'text-indigo-400' },
  { name: 'Prisma', icon: 'fa-solid fa-diagram-project', color: 'text-teal-300' },
  { name: 'Zustand', icon: 'fa-solid fa-cubes', color: 'text-amber-300' },
  { name: 'REST API', icon: 'fa-solid fa-plug', color: 'text-emerald-300' },
  { name: 'Git', icon: 'fa-brands fa-git-alt', color: 'text-orange-400' },
  { name: 'GitHub', icon: 'fa-brands fa-github', color: 'text-white' },
  { name: 'Figma', icon: 'fa-brands fa-figma', color: 'text-pink-400' },
  { name: 'Postman', icon: 'fa-solid fa-paper-plane', color: 'text-orange-300' },
  { name: 'Vitest', icon: 'fa-solid fa-vial', color: 'text-lime-300' },
  { name: 'Playwright', icon: 'fa-solid fa-globe', color: 'text-green-300' }
];

const METRICS = [
  { label: 'Alcance', value: 'Según necesidad', icon: <Zap size={24} /> },
  { label: 'Modalidad', value: 'A conversar', icon: <Server size={24} /> },
  { label: 'Viabilidad', value: 'A revisar contigo', icon: <ShieldCheck size={24} /> }
];

const VERTICALS = [
  {
    title: 'Desarrollo web',
    desc: 'Sitios corporativos e institucionales, landing pages, tiendas, catálogos, blogs, reservas, cursos, portales, directorios, comunidades y aplicaciones web según alcance.',
    icon: <Code size={32} className="text-[#A3E635]" />,
    tags: ['React', 'Tailwind', 'UX/UI'],
    image: '/img/08_Cards/tecnologia-web.webp',
    category: 'WEB'
  },
  {
    title: 'Sistemas y software',
    desc: 'ERP, inventario, ventas/POS, facturación, CRM, gestión académica, citas, asistencia, bases de datos e integraciones por API sujetas a requisitos y viabilidad.',
    icon: <Database size={32} className="text-[#84CC16]" />,
    tags: ['Node.js', 'MySQL', 'APIs'],
    image: '/img/08_Cards/tecnologia-sistemas.webp',
    category: 'SOFTWARE'
  },
  {
    title: 'Aplicaciones y herramientas digitales',
    desc: 'Aplicaciones web o móviles, paneles, dashboards y funciones con IA. También evaluamos mejoras de software existente y definimos cada entrega por alcance.',
    icon: <Code size={32} className="text-[#A3E635]" />,
    tags: ['Web y móvil', 'Paneles', 'IA aplicada'],
    image: '/img/08_Cards/tecnologia-interfaces.webp',
    category: 'INTERFACES'
  },
  {
    title: 'Soluciones personalizadas',
    desc: 'Evaluamos integraciones técnicas y mantenimiento de software existente, además de nuevas soluciones digitales, según requisitos y viabilidad.',
    icon: <Cpu size={32} className="text-[#84CC16]" />,
    tags: ['Requisitos', 'Propuesta', 'Desarrollo'],
    image: '/img/08_Cards/tecnologia-personalizadas.webp',
    category: 'A MEDIDA'
  }
];

const TESTIMONIOS = [
  { name: 'Aplicación web', role: 'Ejemplo orientativo', text: 'Quiero evaluar una aplicación web para presentar y gestionar información de mi proyecto.' },
  { name: 'Solución digital', role: 'Ejemplo orientativo', text: 'Necesito conversar el alcance y las etapas de una solución digital para mi negocio.' },
  { name: 'Herramienta web', role: 'Ejemplo orientativo', text: 'Busco orientación para definir las funcionalidades y el contenido de una herramienta web.' }
];

const TerminalWindow = () => {
  const [text, setText] = useState('');
  const fullText = `> Ejemplo de flujo de trabajo\n> Conversando requisitos\n> Revisando alcance y viabilidad\n> Definiendo etapas y entregables\n> Este ejemplo no representa una ejecución ni resultado real\n$ `;
  
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setText(fullText.substring(0, i));
      i++;
      if (i > fullText.length) clearInterval(timer);
    }, 40);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto bg-[#0a0a0a] rounded-xl border border-neutral-800 shadow-2xl overflow-hidden mt-10 relative group">
      <div className="flex items-center px-4 py-2 bg-neutral-900 border-b border-neutral-800 gap-2">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
        <span className="ml-2 text-[10px] text-neutral-500 font-mono">hagamostech@server:~</span>
      </div>
      <div className="p-6 font-mono text-sm md:text-base text-[#A3E635] whitespace-pre-wrap h-[180px] text-left">
        {text}
        <span className="animate-pulse">_</span>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#A3E635]/5 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>
    </div>
  );
};

const Tecnologia = () => {
  return (
    <div className="dark relative overflow-hidden min-h-screen bg-[#050505] font-montserrat">
      <CircuitBackground />
      <CircleParticles colorScheme="dark" />
      
      {/* Luces Ambientales Tech */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[30%] bg-[#A3E635]/10 blur-[150px] pointer-events-none rounded-b-full"></div>

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 z-10 px-6">
        <FondoTech />
        <div className="container mx-auto max-w-7xl text-center flex flex-col items-center">
          
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#A3E635]/30 bg-[#A3E635]/10 text-xs font-black uppercase tracking-widest text-[#A3E635] mb-8 animate-fade-in-up">
            <i className="fa-solid fa-microchip"></i> Núcleo Tecnológico
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-6 animate-fade-in-up uppercase tracking-tighter" style={{ animationDelay: '0.1s' }}>
            Desarrollo web <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A3E635] to-[#84CC16]">y software a medida</span>
          </h1>
          
          <p className="text-slate-400 text-lg max-w-2xl font-medium mb-10 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Desarrollamos sitios web y software a medida, además de recursos de diseño y acompañamiento académico. Revisamos cada solicitud según su alcance y viabilidad.
          </p>

          <div className="flex flex-wrap gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <a href="https://wa.me/59161320004?text=Hola,%20busco%20una%20solución%20tecnológica%20avanzada" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-[#A3E635] text-black font-black text-xs uppercase tracking-widest rounded-xl hover:bg-[#84CC16] transition-all hover:scale-105 shadow-lg shadow-[#A3E635]/20 flex items-center gap-2">
              Consultar una solución <ChevronRight size={16} />
            </a>
          </div>

          <TerminalWindow />
        </div>
      </section>

      {/* STACK TECNOLÓGICO INFINITO */}
      <section className="relative z-10 py-10 sm:py-14">
        <FondoTech />
        <ToolsMarquee items={TECH_STACK} label="Tecnologías para tu solución" description="Revisamos qué herramientas pueden responder a los requisitos de cada proyecto." />
      </section>

      {/* ALCANCE Y REQUISITOS */}
      <FeatureTimeline
        items={METRICS}
        title="Condiciones de cada proyecto"
        description="Acordamos el alcance, la modalidad y la disponibilidad antes de definir el siguiente paso."
      >
        <header className="mx-auto mb-10 max-w-3xl text-center">
          <h2 className="text-3xl font-black uppercase tracking-tight text-white md:text-5xl">
            Qué podemos <span className="text-[#A3E635]">desarrollar</span>
          </h2>
          <p className="mt-4 text-sm font-medium leading-relaxed text-slate-400 sm:text-base">
            Revisamos cada alternativa según las funciones necesarias, el alcance y la viabilidad del proyecto.
          </p>
        </header>
        <ServiceCardsCarousel items={VERTICALS} label="Áreas de tecnología" />
      </FeatureTimeline>

      <section className="py-20 relative z-10">
        <FondoTech />
          <TestimonialCarousel title="Soluciones tecnológicas para cada necesidad" description="Exploramos ejemplos de desarrollo web, software y herramientas digitales. Los requisitos, el alcance y la viabilidad se revisan en cada proyecto." testimonials={TESTIMONIOS} />
      </section>

      <CenteredProjectCTA title="Tu próxima solución digital empieza con una conversación." description="Contanos qué necesitás. Revisamos alternativas, alcance y condiciones para tu proyecto." />

    </div>
  );
};

export default Tecnologia;
