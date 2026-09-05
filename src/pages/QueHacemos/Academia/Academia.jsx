import React from 'react';
import { BookOpen, Stethoscope, Laptop, Microscope, ArrowRight, CheckCircle2, Award, GraduationCap } from 'lucide-react';
import CircuitBackground from '../../../components/fondos/FondoParticulas';
import CircleParticles from '../../../components/fondos/ParticulasCirculares';
import TestimonialCarousel from '../../../components/carouseles/CarruselTestimonios';

const ACADEMIC_SERVICES = [
  {
    title: 'Proyectos y Defensas de Tesis',
    desc: 'Desarrollamos simuladores, plataformas y presentaciones interactivas de alto nivel para tu sustentacin. Validacin técnica y formato APA 7 asegurado.',
    icon: <BookOpen className="text-[#A3E635]" size={28} />,
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
    tags: ['Simuladores', 'Tesis', 'Sustentacin']
  },
  {
    title: 'Ciencias de la Salud',
    desc: 'Recreamos escenarios clnicos virtuales, modelos anatmicos 3D y sistemas de gestin hospitalaria para estudiantes de medicina y enfermera.',
    icon: <Stethoscope className="text-[#A3E635]" size={28} />,
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
    tags: ['Medicina', 'Casos Clnicos', 'Software Mdico']
  },
  {
    title: 'Sistemas de Informacin',
    desc: 'Proyectos completos de ingeniera: desde el modelado de bases de datos hasta el despliegue funcional en servidores AWS o locales.',
    icon: <Laptop className="text-[#A3E635]" size={28} />,
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
    tags: ['Ingeniera', 'Bases de Datos', 'Arquitectura']
  },
  {
    title: 'Recursos Educativos e IA',
    desc: 'Integracin de inteligencia artificial para tutores virtuales, generacin de exmenes y plataformas E-Learning a medida.',
    icon: <Microscope className="text-[#A3E635]" size={28} />,
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
    tags: ['E-Learning', 'ChatGPT', 'Educacin']
  }
];

const STATS = [
  { value: '+200', label: 'Proyectos Aprobados' },
  { value: '100%', label: 'Rigor Acadmico' },
  { value: '24/7', label: 'Soporte Estudiantil' },
  { value: 'Top', label: 'Calidad Universitaria' }
];

const TESTIMONIOS = [
  { name: 'Mara G.', role: 'Estudiante de Medicina', text: 'El simulador de casos clnicos que programaron para mi tesis me asegur la nota mxima. Increble nivel de detalle terico y visual.' },
  { name: 'Andrs F.', role: 'Ingeniera de Sistemas', text: 'Estaba bloqueado con el despliegue de mi arquitectura cloud para el proyecto final. HagamosTech no slo lo hizo, me explicaron cada lnea de cdigo.' },
  { name: 'Dra. Elena V.', role: 'Docente Universitaria', text: 'He visto a mis alumnos presentar plataformas desarrolladas con su asesora y el rigor tcnico es impecable. Los recomiendo siempre.' }
];

const Academia = () => {
  return (
    <div className="dark relative overflow-hidden min-h-screen bg-[#050505] font-montserrat">
      <CircuitBackground />
      <CircleParticles colorScheme="dark" />
      
      {/* Background glow for hero */}
      <div className="absolute top-[-10%] right-[-5%] w-[60%] h-[50%] bg-[#A3E635]/10 rounded-full blur-[150px] pointer-events-none"></div>

      {/* HERO SECTION - Split Layout with Image */}
      <section className="relative pt-32 pb-20 z-10 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            
            {/* Left Content */}
            <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#A3E635]/30 bg-[#A3E635]/10 text-xs font-black uppercase tracking-widest text-[#A3E635] mb-6 animate-fade-in-up">
                <GraduationCap size={16} /> Excelencia Acadmica
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white leading-tight mb-6 animate-fade-in-up uppercase tracking-tighter" style={{ animationDelay: '0.1s' }}>
                Eleva tu <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A3E635] to-[#84CC16]">Proyecto Final</span>
              </h1>
              <p className="text-slate-400 text-base md:text-lg max-w-xl font-medium mb-10 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                Desarrollo de software, simuladores mdicos y ecosistemas de informacin diseados especficamente para cumplir con el más alto rigor universitario y tesis de grado.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                <a href="https://wa.me/59161320004?text=Hola,%20necesito%20ayuda%20con%20mi%20proyecto%20acadmico" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-[#A3E635] text-black font-black text-xs uppercase tracking-widest rounded-xl hover:bg-[#84CC16] transition-all hover:scale-105 shadow-lg shadow-[#A3E635]/20 flex items-center justify-center gap-2">
                  Cotizar Proyecto <ArrowRight size={16} />
                </a>
              </div>
              
              {/* Quick checks */}
              <div className="mt-8 flex flex-col gap-3 text-sm font-bold text-slate-300 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                <div className="flex items-center gap-2"><CheckCircle2 className="text-[#A3E635]" size={18} /> Metodologa gilde</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="text-[#A3E635]" size={18} /> Documentacin APA 7</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="text-[#A3E635]" size={18} /> Asesora para tu defensa</div>
              </div>
            </div>

            {/* Right Image */}
            <div className="w-full lg:w-1/2 animate-slide-left relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-neutral-800 group">
                <div className="absolute inset-0 bg-[#A3E635]/20 mix-blend-overlay group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none"></div>
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80" 
                  alt="Estudiantes universitarios trabajando en un proyecto" 
                  className="w-full h-[400px] md:h-[550px] object-cover hover:scale-105 transition-transform duration-700"
                />
                
                {/* Floating Badge */}
                <div className="absolute bottom-6 left-6 z-20 bg-black/80 backdrop-blur-md border border-neutral-700 p-4 rounded-2xl flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#A3E635] rounded-full flex items-center justify-center text-black">
                    <Award size={24} />
                  </div>
                  <div>
                    <p className="text-white font-black text-lg leading-none">100%</p>
                    <p className="text-slate-300 text-xs font-bold uppercase tracking-wider">Aprobacin</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS BANNER */}
      <section className="py-10 bg-neutral-900/50 border-y border-neutral-800 z-10 relative">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-neutral-800">
            {STATS.map((stat, i) => (
              <div key={i} className="text-center px-4">
                <h3 className="text-3xl md:text-5xl font-black text-[#A3E635] mb-1">{stat.value}</h3>
                <p className="text-xs md:text-sm font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ZIG-ZAG FEATURE CARDS WITH IMAGES */}
      <section className="py-24 z-10 relative px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight mb-4">
              reas de <span className="text-[#A3E635]">Especialidad</span>
            </h2>
            <p className="text-slate-400 font-medium max-w-2xl mx-auto">Nuestros desarrollos no son simples páginas, son simuladores, plataformas y algoritmos listos para ser sustentados frente a jurados exigentes.</p>
          </div>

          <div className="flex flex-col gap-24">
            {ACADEMIC_SERVICES.map((srv, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div key={idx} className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-10 md:gap-16`}>
                  
                  {/* Image side */}
                  <div className="w-full md:w-1/2 relative group">
                    <div className="absolute -inset-4 bg-[#A3E635]/10 rounded-[3rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <img 
                      src={srv.image} 
                      alt={srv.title} 
                      className="w-full h-[300px] md:h-[400px] object-cover rounded-[2rem] border border-neutral-800 shadow-2xl relative z-10"
                    />
                  </div>

                  {/* Text side */}
                  <div className="w-full md:w-1/2 flex flex-col items-start text-left">
                    <div className="w-14 h-14 rounded-2xl bg-[#A3E635]/10 border border-[#A3E635]/20 flex items-center justify-center mb-6">
                      {srv.icon}
                    </div>
                    <h3 className="text-2xl md:text-3xl font-black text-white mb-4">{srv.title}</h3>
                    <p className="text-slate-400 text-lg leading-relaxed mb-6">{srv.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {srv.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 bg-neutral-900 border border-neutral-800 text-slate-300 text-[10px] font-black uppercase tracking-wider rounded-lg">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
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
      <section className="py-20 z-10 relative px-6 pb-32">
        <div className="container mx-auto max-w-5xl">
          <div className="p-10 md:p-16 rounded-[3rem] bg-gradient-to-br from-neutral-900 to-black border border-neutral-800 text-center relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#A3E635] to-transparent opacity-50"></div>
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80')] opacity-5 mix-blend-overlay object-cover pointer-events-none group-hover:opacity-10 transition-opacity duration-700"></div>
            
            <h2 className="text-3xl md:text-5xl font-black mb-6 relative z-10 text-white uppercase tracking-tight">
              Asegrate el <span className="text-[#A3E635]">100/100</span>
            </h2>
            <p className="text-base md:text-lg font-medium text-slate-400 mb-10 max-w-xl mx-auto relative z-10">
              No dejes tu sustentacin al azar. Construyamos una herramienta tecnolgica que deje a tu jurado sin palabras.
            </p>
            <a href="https://wa.me/59161320004" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-10 py-5 bg-[#A3E635] text-black rounded-full font-black text-sm uppercase tracking-widest hover:bg-[#84CC16] hover:scale-105 transition-transform shadow-[0_0_30px_rgba(163,230,53,0.3)] relative z-10">
              Solicitar Asesora Gratuita <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Academia;
