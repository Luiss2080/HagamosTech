import React, { useState, useEffect } from 'react';
import { BookOpen, Stethoscope, Laptop, Microscope, ArrowRight, CheckCircle2, Award, GraduationCap, ChevronRight, Binary, LineChart } from 'lucide-react';
import CircuitBackground from '../../../components/fondos/FondoParticulas';
import CircleParticles from '../../../components/fondos/ParticulasCirculares';
import TestimonialCarousel from '../../../components/carouseles/CarruselTestimonios';

const ACADEMIC_TOOLS = [
  { name: 'SPSS', icon: 'fa-solid fa-chart-pie', color: 'text-blue-500' },
  { name: 'MATLAB', icon: 'fa-solid fa-calculator', color: 'text-orange-500' },
  { name: 'LaTeX', icon: 'fa-solid fa-file-code', color: 'text-gray-400' },
  { name: 'Mendeley', icon: 'fa-solid fa-book-open', color: 'text-red-500' },
  { name: 'Python', icon: 'fa-brands fa-python', color: 'text-yellow-400' },
  { name: 'React', icon: 'fa-brands fa-react', color: 'text-cyan-400' },
  { name: 'R', icon: 'fa-solid fa-chart-line', color: 'text-indigo-400' },
  { name: 'AWS', icon: 'fa-brands fa-aws', color: 'text-orange-400' }
];

const METRICS = [
  { label: 'Rigor Académico', value: '100%', icon: <Award size={24} /> },
  { label: 'Proyectos Aprobados', value: '+200', icon: <CheckCircle2 size={24} /> },
  { label: 'Soporte Estudiantil', value: '24/7', icon: <Laptop size={24} /> }
];

const TESTIMONIOS = [
  { name: 'María G.', role: 'Estudiante de Medicina', text: 'El simulador de casos clínicos que programaron para mi tesis me aseguró la nota máxima. Increíble nivel de detalle teórico y visual.' },
  { name: 'Andrés F.', role: 'Ingeniería de Sistemas', text: 'Estaba bloqueado con el despliegue de mi arquitectura cloud para el proyecto final. HagamosTech no sólo lo hizo, me explicaron cada línea de código.' },
  { name: 'Dra. Elena V.', role: 'Docente Universitaria', text: 'He visto a mis alumnos presentar plataformas desarrolladas con su asesoría y el rigor técnico es impecable. Los recomiendo siempre.' }
];

const CompilerWindow = () => {
  const [text, setText] = useState('');
  const fullText = `[info] Iniciando entorno de simulación...\n[info] Cargando base de datos médica (1.2M registros)... OK\n[build] Compilando modelos anatómicos 3D... 100%\n[test] Verificando rigor metodológico (APA 7)... PASSED\n[success] Proyecto Universitario desplegado correctamente.\n> Listo para la defensa de tesis.`;
  
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setText(fullText.substring(0, i));
      i++;
      if (i > fullText.length) clearInterval(timer);
    }, 35);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto bg-[#0a0a0a] rounded-xl border border-neutral-800 shadow-2xl overflow-hidden mt-10 relative group">
      <div className="flex items-center px-4 py-2 bg-neutral-900 border-b border-neutral-800 gap-2">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
        <span className="ml-2 text-[10px] text-neutral-500 font-mono">tesis_workspace ~/simulador</span>
      </div>
      <div className="p-6 font-mono text-sm md:text-base text-[#A3E635] whitespace-pre-wrap h-[180px] text-left">
        {text}
        <span className="animate-pulse">_</span>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#A3E635]/5 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>
    </div>
  );
};

const ESPECIALIDADES = [
  {
    title: 'Ciencias de la Salud',
    desc: 'Recreamos escenarios clínicos virtuales y modelos anatómicos 3D para medicina y enfermería.',
    icon: <Stethoscope size={20} />,
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'Sistemas de Información',
    desc: 'Modelado de bases de datos y despliegue en servidores cloud AWS para ingeniería.',
    icon: <Laptop size={20} />,
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'Recursos Educativos e IA',
    desc: 'Plataformas E-Learning e Inteligencia Artificial para tutores virtuales.',
    icon: <Microscope size={20} />,
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'Defensas Interactivas',
    desc: 'Presentaciones de alto nivel técnico para impresionar a cualquier jurado.',
    icon: <BookOpen size={20} />,
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'Análisis Estadístico',
    desc: 'Procesamiento de datos y modelado con herramientas avanzadas para investigaciones.',
    icon: <LineChart size={20} />,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'Algoritmos y Lógica',
    desc: 'Desarrollo de algoritmos complejos para resolver problemas computacionales en tesis.',
    icon: <Binary size={20} />,
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80'
  }
];

const EspecialidadesGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[350px]">
      {ESPECIALIDADES.map((item, idx) => (
        <div key={idx} className="rounded-[2rem] bg-neutral-900/40 border border-neutral-800 hover:bg-neutral-900 transition-colors group overflow-hidden relative flex flex-col">
          <div className="h-1/2 w-full overflow-hidden relative">
             <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60" />
             <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/40 to-transparent"></div>
          </div>
          <div className="p-6 relative z-10 -mt-10 flex flex-col justify-end flex-grow">
            <div className="w-12 h-12 rounded-xl bg-[#A3E635] border border-[#A3E635] flex items-center justify-center text-black mb-4 group-hover:-rotate-12 transition-transform shadow-[0_0_15px_rgba(163,230,53,0.3)] relative z-20">
              {item.icon}
            </div>
            <h3 className="text-xl font-black text-white mb-2">{item.title}</h3>
            <p className="text-slate-400 text-sm font-medium">{item.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

const Academia = () => {
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
            <GraduationCap size={16} /> Excelencia Académica
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-6 animate-fade-in-up uppercase tracking-tighter" style={{ animationDelay: '0.1s' }}>
            Eleva tu <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A3E635] to-[#84CC16]">Proyecto Final</span>
          </h1>
          
          <p className="text-slate-400 text-lg max-w-2xl font-medium mb-10 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Desarrollo de software, simuladores médicos y ecosistemas de información diseñados específicamente para cumplir con el más alto rigor universitario y tesis de grado.
          </p>

          <div className="flex flex-wrap gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <a href="https://wa.me/59161320004?text=Hola,%20necesito%20ayuda%20con%20mi%20proyecto%20académico" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-[#A3E635] text-black font-black text-xs uppercase tracking-widest rounded-xl hover:bg-[#84CC16] transition-all hover:scale-105 shadow-lg shadow-[#A3E635]/20 flex items-center gap-2">
              Cotizar Proyecto <ChevronRight size={16} />
            </a>
          </div>

          <CompilerWindow />
        </div>
      </section>

      {/* STACK TECNOLÓGICO INFINITO */}
      <section className="py-10 border-y border-neutral-900 bg-neutral-950/50 z-10 relative">
        <div className="container mx-auto px-6">
          <p className="text-center text-xs font-black text-neutral-500 uppercase tracking-widest mb-6">Herramientas Académicas y Software</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-70">
            {ACADEMIC_TOOLS.map((tech, i) => (
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

      {/* BENTO BOX GRID SECTION */}
      <section className="py-24 z-10 relative px-6 bg-gradient-to-b from-transparent to-[#0a0a0a]">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight mb-4">
              Áreas de <span className="text-[#A3E635]">Especialidad</span>
            </h2>
            <p className="text-slate-400 font-medium max-w-2xl mx-auto">
              Nuestros desarrollos no son simples páginas, son simuladores, plataformas y algoritmos listos para ser sustentados frente a jurados exigentes.
            </p>
          </div>

          <EspecialidadesGrid />
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 relative z-10">
        <TestimonialCarousel testimonials={TESTIMONIOS.map((t, idx) => {
          const photos = [
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80',
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80',
            'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&h=150&q=80'
          ];
          return { ...t, image: photos[idx % photos.length] };
        })} />
      </section>

      {/* ACADEMIC CTA */}
      <section className="py-24 z-10 relative px-6 pb-32">
        <div className="container mx-auto max-w-5xl">
          <div className="p-12 md:p-24 rounded-[3rem] bg-[#A3E635] text-black text-center relative overflow-hidden group/cta hover:scale-[1.01] transition-all duration-500 shadow-[0_0_40px_rgba(163,230,53,0.15)] hover:shadow-[0_0_80px_rgba(163,230,53,0.3)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/40 via-transparent to-black/60 opacity-50 group-hover/cta:scale-110 transition-transform duration-1000"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/30 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover/cta:-translate-x-10 transition-transform duration-1000"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/20 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 group-hover/cta:translate-x-10 transition-transform duration-1000"></div>
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80')] opacity-[0.03] mix-blend-overlay object-cover pointer-events-none group-hover/cta:opacity-[0.08] transition-opacity duration-700"></div>
            
            <h2 className="text-5xl md:text-7xl font-black mb-6 relative z-10 uppercase tracking-tighter drop-shadow-lg leading-none">
              Asegúrate el 100/100
            </h2>
            <p className="text-lg md:text-2xl font-bold opacity-80 mb-12 max-w-3xl mx-auto relative z-10 leading-relaxed">
              No dejes tu sustentación al azar. Construyamos una herramienta tecnológica que deje a tu jurado sin palabras.
            </p>
            
            <a href="https://wa.me/59161320004" target="_blank" rel="noopener noreferrer" className="relative z-10 inline-flex items-center gap-4 px-10 md:px-14 py-6 bg-black text-[#A3E635] rounded-full font-black text-sm md:text-lg uppercase tracking-widest hover:scale-110 transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.7)] group/btn overflow-hidden">
              <span className="relative z-20">Solicitar Asesoría Gratuita</span>
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#A3E635]/20 flex items-center justify-center group-hover/btn:translate-x-2 transition-transform relative z-20">
                <ArrowRight size={20} className="md:w-6 md:h-6" />
              </div>
              <div className="absolute inset-0 bg-white opacity-0 group-hover/btn:opacity-10 transition-opacity z-10"></div>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Academia;
