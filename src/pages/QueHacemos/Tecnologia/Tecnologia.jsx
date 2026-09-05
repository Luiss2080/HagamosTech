import React, { useState, useEffect } from 'react';
import { Terminal, Code, Cpu, Database, Cloud, Zap, ArrowRight, ShieldCheck, Server, ChevronRight } from 'lucide-react';
import CircuitBackground from '../../../components/fondos/FondoParticulas';
import CircleParticles from '../../../components/fondos/ParticulasCirculares';
import { Link } from 'react-router-dom';
import TestimonialCarousel from '../../../components/carouseles/CarruselTestimonios';

const TECH_STACK = [
  { name: 'React', icon: 'fa-brands fa-react', color: 'text-cyan-400' },
  { name: 'Python', icon: 'fa-brands fa-python', color: 'text-yellow-400' },
  { name: 'Node.js', icon: 'fa-brands fa-node-js', color: 'text-green-500' },
  { name: 'AWS', icon: 'fa-brands fa-aws', color: 'text-orange-400' },
  { name: 'Docker', icon: 'fa-brands fa-docker', color: 'text-blue-500' },
  { name: 'MySQL', icon: 'fa-solid fa-database', color: 'text-indigo-400' },
  { name: 'GitHub', icon: 'fa-brands fa-github', color: 'text-white' },
  { name: 'Figma', icon: 'fa-brands fa-figma', color: 'text-pink-400' }
];

const METRICS = [
  { label: 'Uptime Garantizado', value: '99.9%', icon: <Zap size={24} /> },
  { label: 'Proyectos Escalables', value: '+50', icon: <Server size={24} /> },
  { label: 'Seguridad en Datos', value: 'Nivel 1', icon: <ShieldCheck size={24} /> }
];

const VERTICALS = [
  {
    title: 'Desarrollo Frontend & Web',
    desc: 'Interfaces reactivas de ultra baja latencia con React y Next.js. Enfocados en la conversión y UX.',
    icon: <Code size={32} className="text-[#A3E635]" />,
    tags: ['React', 'Tailwind', 'UX/UI']
  },
  {
    title: 'Arquitectura Backend',
    desc: 'Bases de datos relacionales y APIs robustas capaces de soportar miles de peticiones por segundo.',
    icon: <Database size={32} className="text-[#84CC16]" />,
    tags: ['Node.js', 'MySQL', 'APIs']
  },
  {
    title: 'Cloud & Automatización',
    desc: 'Despliegues serverless y contenedores Docker para escalabilidad infinita y cero caídas.',
    icon: <Cloud size={32} className="text-[#A3E635]" />,
    tags: ['AWS', 'Docker', 'Webhooks']
  },
  {
    title: 'Inteligencia Artificial',
    desc: 'Modelos predictivos, RAG y agentes autónomos integrados directamente en tus flujos de trabajo.',
    icon: <Cpu size={32} className="text-[#84CC16]" />,
    tags: ['Python', 'OpenAI', 'ML']
  }
];

const TESTIMONIOS = [
  { name: 'TechSolutions Corp', role: 'CTO', text: 'La arquitectura en la nube que implementaron redujo nuestros costos de servidores en un 40% y mejoró la velocidad.' },
  { name: 'StartUp Innova', role: 'Founder', text: 'El desarrollo de nuestro MVP fue rapidísimo. El código es limpio y altamente escalable para nuestras futuras rondas.' },
  { name: 'Agencia Digital', role: 'Director de Operaciones', text: 'Automatizaron nuestros CRMs con IA, ahora nuestro equipo de ventas se enfoca sólo en cerrar, no en hacer clics.' }
];

const TerminalWindow = () => {
  const [text, setText] = useState('');
  const fullText = `> Iniciando sistema HagamosTech...\n> Conectando a nodos globales... OK\n> Desplegando arquitectura cloud... OK\n> Entrenando modelo IA local... 100%\n> Sistema listo. ¿Qué vamos a construir hoy?\n$ `;
  
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
            Construimos ecosistemas digitales de alto rendimiento. Desde arquitecturas web robustas hasta agentes de inteligencia artificial y automatización empresarial avanzada.
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

      {/* METRICAS Y RENDIMIENTO */}
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
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {VERTICALS.map((v, idx) => (
              <div key={idx} className="p-8 md:p-10 rounded-[2rem] bg-neutral-900/50 border border-neutral-800 hover:bg-neutral-900 transition-all group overflow-hidden relative">
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#A3E635]/5 rounded-full blur-3xl group-hover:bg-[#A3E635]/10 transition-colors"></div>
                <div className="flex flex-col md:flex-row gap-6 items-start relative z-10">
                  <div className="w-16 h-16 shrink-0 rounded-2xl bg-neutral-950 border border-neutral-800 flex items-center justify-center shadow-lg group-hover:border-[#A3E635]/30 transition-colors">
                    {v.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-white mb-3">{v.title}</h3>
                    <p className="text-slate-400 font-medium leading-relaxed mb-6">{v.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {v.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 rounded-lg bg-neutral-950 border border-neutral-800 text-[10px] font-black uppercase tracking-wider text-slate-300">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA GIGANTE */}
      <section className="py-24 z-10 relative px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="p-12 md:p-20 rounded-[3rem] bg-[#A3E635] text-black text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-black via-transparent to-transparent"></div>
            <h2 className="text-4xl md:text-6xl font-black mb-6 relative z-10 uppercase tracking-tighter">
              El futuro de tu empresa se escribe en código.
            </h2>
            <p className="text-lg md:text-xl font-bold opacity-80 mb-10 max-w-2xl mx-auto relative z-10">
              Desarrollemos la solución tecnológica que tu negocio necesita para liderar el mercado mañana.
            </p>
            <a href="https://wa.me/59161320004" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-10 py-5 bg-black text-white rounded-full font-black text-sm uppercase tracking-widest hover:scale-105 transition-transform shadow-2xl relative z-10 hover:shadow-[#84CC16]/50">
              Hablar con un Ingeniero <Terminal size={18} />
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Tecnologia;
