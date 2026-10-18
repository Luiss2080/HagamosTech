import React, { useState, useEffect } from 'react';
import { Terminal, Code, Cpu, Database, Cloud, Zap, ArrowRight, ShieldCheck, Server, ChevronRight } from 'lucide-react';
import CircuitBackground from '../../../components/fondos/FondoParticulas';
import CircleParticles from '../../../components/fondos/ParticulasCirculares';
import { Link } from 'react-router-dom';
import TestimonialCarousel from '../../../components/carouseles/CarruselTestimonios';
import ServiceCardsCarousel from '../../../components/ui/ServiceCardsCarousel';

const TECH_STACK = [
  { name: 'React', icon: 'fa-brands fa-react', color: 'text-cyan-400' },
  { name: 'Python', icon: 'fa-brands fa-python', color: 'text-yellow-400' },
  { name: 'Node.js', icon: 'fa-brands fa-node-js', color: 'text-green-500' },
  { name: 'MySQL', icon: 'fa-solid fa-database', color: 'text-indigo-400' },
  { name: 'GitHub', icon: 'fa-brands fa-github', color: 'text-white' },
  { name: 'Figma', icon: 'fa-brands fa-figma', color: 'text-pink-400' }
];

const METRICS = [
  { label: 'Alcance', value: 'A definir', icon: <Zap size={24} /> },
  { label: 'Etapas', value: 'A acordar', icon: <Server size={24} /> },
  { label: 'Requisitos', value: 'A revisar', icon: <ShieldCheck size={24} /> }
];

const VERTICALS = [
  {
    title: 'Desarrollo web',
    desc: 'Sitios y aplicaciones web planteados según objetivos, contenido, funciones y requisitos acordados.',
    icon: <Code size={32} className="text-[#A3E635]" />,
    tags: ['React', 'Tailwind', 'UX/UI'],
    image: '/img/07_Servicios/soluciones/hero-web-v2.webp',
    category: 'WEB'
  },
  {
    title: 'Sistemas y software',
    desc: 'Sistemas a medida y estructuras de datos revisados según necesidades y viabilidad.',
    icon: <Database size={32} className="text-[#84CC16]" />,
    tags: ['Node.js', 'MySQL', 'APIs'],
    image: '/img/07_Servicios/soluciones/hero-sistemas-v2.webp',
    category: 'SOFTWARE'
  },
  {
    title: 'Interfaces y aplicaciones web',
    desc: 'Diseño de interfaces y herramientas digitales; alojamiento y operación de servidores no forman parte de la oferta.',
    icon: <Cloud size={32} className="text-[#A3E635]" />,
    tags: ['Diseño', 'Interfaces', 'Web'],
    image: '/img/07_Servicios/soluciones/hero-ia-v2.webp',
    category: 'INTERFACES'
  },
  {
    title: 'Soluciones personalizadas',
    desc: 'Evaluamos necesidades digitales para proponer un alcance posible y conversarlo antes de iniciar.',
    icon: <Cpu size={32} className="text-[#84CC16]" />,
    tags: ['Requisitos', 'Propuesta', 'Desarrollo'],
    image: '/img/07_Servicios/soluciones/hero-soluciones-v2.webp',
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
        <div className="container mx-auto max-w-7xl text-center flex flex-col items-center">
          
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#A3E635]/30 bg-[#A3E635]/10 text-xs font-black uppercase tracking-widest text-[#A3E635] mb-8 animate-fade-in-up">
            <i className="fa-solid fa-microchip"></i> Núcleo Tecnológico
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-6 animate-fade-in-up uppercase tracking-tighter" style={{ animationDelay: '0.1s' }}>
            Innovación en <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A3E635] to-[#84CC16]">Código Puro</span>
          </h1>
          
          <p className="text-slate-400 text-lg max-w-2xl font-medium mb-10 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Desarrollamos sitios web y software a medida, además de recursos de diseño y acompañamiento académico. Revisamos cada solicitud según su alcance y viabilidad.
          </p>

          <div className="flex flex-wrap gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <a href="https://wa.me/59161320004?text=Hola,%20busco%20una%20solución%20tecnológica%20avanzada" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-[#A3E635] text-black font-black text-xs uppercase tracking-widest rounded-xl hover:bg-[#84CC16] transition-all hover:scale-105 shadow-lg shadow-[#A3E635]/20 flex items-center gap-2">
              Iniciar Proyecto <ChevronRight size={16} />
            </a>
          </div>

          <TerminalWindow />
        </div>
      </section>

      {/* STACK TECNOLÓGICO INFINITO */}
      <section className="py-10 border-y border-neutral-900 bg-neutral-950/50 z-10 relative">
        <div className="container mx-auto px-6">
          <p className="text-center text-xs font-black text-neutral-500 uppercase tracking-widest mb-6">Stack Tecnológico y Herramientas</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-70">
            {TECH_STACK.map((tech, i) => (
              <div key={i} className={`flex items-center gap-2 text-xl md:text-2xl font-bold ${tech.color} grayscale hover:grayscale-0 transition-all cursor-default`}>
                <i className={tech.icon}></i>
                <span className="text-sm tracking-wider">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ALCANCE Y REQUISITOS */}
      <section className="py-24 z-10 relative px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {METRICS.map((m, i) => (
              <div key={i} className="p-8 rounded-3xl bg-neutral-900/40 border border-neutral-800 flex flex-col items-center text-center gap-4 hover:border-[#A3E635]/40 transition-colors group">
                <div className="w-16 h-16 rounded-2xl bg-[#A3E635]/10 flex items-center justify-center text-[#A3E635] group-hover:scale-110 transition-transform">
                  {m.icon}
                </div>
                <div>
                  <h3 className="text-4xl font-black text-white mb-2">{m.value}</h3>
                  <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest">{m.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VERTICALES DE TECNOLOGÍA */}
      <section className="py-20 z-10 relative px-6 bg-gradient-to-b from-transparent to-[#0a0a0a]">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-3xl md:text-5xl font-black text-white text-center mb-16 uppercase tracking-tight">
            Nuestras <span className="text-[#A3E635]">Verticales</span>
          </h2>
          
          <ServiceCardsCarousel items={VERTICALS} label="Áreas de tecnología" />
        </div>
      </section>

      {/* CTA GIGANTE */}
      <section className="py-24 z-10 relative px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="p-12 md:p-24 rounded-[3rem] bg-[#A3E635] text-black text-center relative overflow-hidden group/cta hover:scale-[1.01] transition-all duration-500 shadow-[0_0_40px_rgba(163,230,53,0.15)] hover:shadow-[0_0_80px_rgba(163,230,53,0.3)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/40 via-transparent to-black/60 opacity-50 group-hover/cta:scale-110 transition-transform duration-1000"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/30 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover/cta:-translate-x-10 transition-transform duration-1000"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/20 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 group-hover/cta:translate-x-10 transition-transform duration-1000"></div>
            
            <h2 className="text-5xl md:text-7xl font-black mb-6 relative z-10 uppercase tracking-tighter drop-shadow-lg leading-none">
              El futuro de tu empresa se escribe en código.
            </h2>
            <p className="text-lg md:text-2xl font-bold opacity-80 mb-12 max-w-3xl mx-auto relative z-10 leading-relaxed">
              Contanos qué necesitás y conversemos las alternativas que se ajustan a tu proyecto.
            </p>
            
            <a href="https://wa.me/59161320004" target="_blank" rel="noopener noreferrer" className="relative z-10 inline-flex items-center gap-4 px-10 md:px-14 py-6 bg-black text-[#A3E635] rounded-full font-black text-sm md:text-lg uppercase tracking-widest hover:scale-110 transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.7)] group/btn overflow-hidden">
              <span className="relative z-20">Consultar un proyecto</span>
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#A3E635]/20 flex items-center justify-center group-hover/btn:translate-x-2 transition-transform relative z-20">
                <Terminal size={20} className="md:w-6 md:h-6" />
              </div>
              <div className="absolute inset-0 bg-white opacity-0 group-hover/btn:opacity-10 transition-opacity z-10"></div>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Tecnologia;
