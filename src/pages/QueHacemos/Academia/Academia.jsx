import React, { useState, useEffect } from 'react';
import FondoTech from '../../../components/fondos/FondoTech';
import { BookOpen, Stethoscope, Laptop, Microscope, ArrowRight, CheckCircle2, Award, GraduationCap, ChevronRight, Binary, LineChart } from 'lucide-react';
import CircuitBackground from '../../../components/fondos/FondoParticulas';
import CircleParticles from '../../../components/fondos/ParticulasCirculares';
import TestimonialCTASection from '../../../components/ui/TestimonialCTASection';
import ServiceCardsCarousel from '../../../components/ui/ServiceCardsCarousel';
import TechToolsCarousel from '../../../components/ui/TechToolsCarousel';
import FeatureTimeline from '../../../components/ui/FeatureTimeline';
import { HERRAMIENTAS_ACADEMICAS } from '../../../data/herramientasCarruselData';

const METRICS = [
  { label: 'Alcance', value: 'Acordado', icon: <Award size={24} /> },
  { label: 'Modalidad', value: 'Flexible', icon: <CheckCircle2 size={24} /> },
  { label: 'Disponibilidad', value: 'A consultar', icon: <Laptop size={24} /> }
];

const TESTIMONIOS = [
  { name: 'Carpeta Escolar y Tareas', role: 'Secundaria y Primaria', text: 'Mi hijo tenía una carpeta escolar completa con resúmenes, esquemas visuales e infografías; el resultado fue claro y muy ordenado.' },
  { name: 'Proyectos de Informática y Redes', role: 'Educación Superior', text: 'Requería orientación para simular topologías de red y entender la lógica de algoritmos de programación para mi entrega práctica.' },
  { name: 'Investigación y Salud', role: 'Área Biomédica y Social', text: 'Me apoyaron con diagramas explicativos, líneas de tiempo y la adaptación estricta de tablas y figuras al formato APA 7 para mi investigación.' }
];

const FULL_TEXT = `[solicitud] Apoyo con tareas, trabajos escolares o universitarios\n[organización] Delimitamos tema, estructura y pauta (APA / escolar)\n[desarrollo] Elaboramos informes, diapositivas, trípticos o tesis\n[revisión] Revisamos avances y preparamos la exposición o entrega\n> Acompañamiento académico para colegio, instituto y universidad.`;

const CompilerWindow = () => {
  const [text, setText] = useState('');
  
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setText(FULL_TEXT.substring(0, i));
      i++;
      if (i > FULL_TEXT.length) clearInterval(timer);
    }, 35);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto bg-[#0a0a0a] rounded-xl border border-neutral-800 shadow-2xl overflow-hidden mt-10 relative group">
      <div className="flex items-center px-4 py-2 bg-neutral-900 border-b border-neutral-800 gap-2">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
        <span className="ml-2 text-[10px] text-neutral-500 font-mono">ejemplo_mentoria ~/estudio</span>
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
    title: 'Trabajos Escolares y Secundaria',
    desc: 'Trípticos, tareas guiadas, informes escolares, periódicos murales, carpetas y proyectos de feria para estudiantes de colegio y secundaria.',
    icon: <BookOpen size={20} />,
    image: '/img/08_Cards/academico-apoyo-escolar-v2.webp'
  },
  {
    title: 'Tesis, Monografías y Proyectos de Grado',
    desc: 'Asesoramiento y acompañamiento en delimitación de tema, marco teórico, metodología, estructura APA 7 y preparación de defensa para institutos y universidades.',
    icon: <GraduationCap size={20} />,
    image: '/img/08_Cards/academico-tesis-monografia-v2.webp'
  },
  {
    title: 'Informes Técnicos y Ensayos',
    desc: 'Elaboración y revisión guiada de informes de pasantía, prácticas, ensayos académicos y monografías con rigor y formato estandarizado.',
    icon: <Microscope size={20} />,
    image: '/img/08_Cards/academico-informes-tecnicos-v2.webp'
  },
  {
    title: 'Diapositivas y Presentaciones',
    desc: 'Organización visual de diapositivas interactivas en PowerPoint y Canva para exposiciones, clases, defensas de tesis y proyectos.',
    icon: <Stethoscope size={20} />,
    image: '/img/08_Cards/academico-presentaciones-v2.webp'
  },
  {
    title: 'Trípticos, Afiches e Infografías',
    desc: 'Diseño de trípticos, dípticos, esquemas, mapas conceptuales y líneas de tiempo para estructurar contenidos escolares y de estudio.',
    icon: <LineChart size={20} />,
    image: '/img/08_Cards/academico-triptico-feria-v2.webp'
  },
  {
    title: 'Proyectos Tecnológicos y Programación',
    desc: 'Tutoría en proyectos de grado, algoritmos, lógica, bases de datos y simuladores educativos según consigna.',
    icon: <Binary size={20} />,
    image: '/img/08_Cards/academico-programacion.webp'
  }
];

const EspecialidadesGrid = () => {
  return <ServiceCardsCarousel items={ESPECIALIDADES} label="Especialidades académicas" badgePrefix="Área" />;
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
        <FondoTech />
        <div className="container relative z-10 mx-auto max-w-7xl text-center flex flex-col items-center">
          
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#A3E635]/30 bg-[#A3E635]/10 text-xs font-black uppercase tracking-widest text-[#A3E635] mb-8 animate-fade-in-up">
            <GraduationCap size={16} /> Excelencia Académica
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-6 animate-fade-in-up uppercase tracking-tighter" style={{ animationDelay: '0.1s' }}>
            Acompañamiento <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A3E635] to-[#84CC16]">académico</span>
          </h1>
          
          <p className="text-slate-400 text-lg max-w-2xl font-medium mb-10 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Acompañamiento académico integral en todo tipo de trabajo escolar y formativo: informes, proyectos, tesis, monografías, presentaciones en diapositivas, trípticos y tareas para colegio, secundaria, instituto y universidad.
          </p>

          <div className="flex flex-wrap gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <a href="https://wa.me/59161320004?text=Hola,%20necesito%20ayuda%20con%20mi%20proyecto%20académico" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-[#A3E635] text-black font-black text-xs uppercase tracking-widest rounded-xl hover:bg-[#84CC16] transition-all hover:scale-105 shadow-lg shadow-[#A3E635]/20 flex items-center gap-2">
              Consultar acompañamiento <ChevronRight size={16} />
            </a>
          </div>

          <CompilerWindow />
        </div>
      </section>

      {/* STACK TECNOLÓGICO INFINITO */}
      <section className="relative z-10 py-10 sm:py-14">
        <FondoTech />
        <div className="relative z-10">
          <TechToolsCarousel items={HERRAMIENTAS_ACADEMICAS} label="Herramientas para el acompañamiento académico" description="La selección depende de la materia, la consigna y el tipo de orientación que necesites." />
        </div>
      </section>

      {/* METRICAS Y RENDIMIENTO */}
      <FeatureTimeline
        items={METRICS}
        title="Cómo acordamos el acompañamiento"
        description="Definimos la modalidad y disponibilidad en función de la materia, la consigna y el alcance conversado."
      >
        <header className="mx-auto mb-8 max-w-3xl text-center sm:mb-10">
          <h2 className="text-3xl font-black uppercase tracking-tight text-white md:text-5xl">
            Áreas de <span className="text-[#A3E635]">especialidad</span>
          </h2>
          <p className="mt-4 text-sm font-medium leading-relaxed text-slate-400 sm:text-base">
            Revisamos cada necesidad según la materia, el nivel, la consigna y la disponibilidad. La modalidad y el alcance se conversan antes de comenzar.
          </p>
        </header>
        <EspecialidadesGrid />
      </FeatureTimeline>

      {/* TESTIMONIALS */}
      <TestimonialCTASection
        testimonialTitle="Ejemplos de acompañamiento académico"
        testimonialDescription="Situaciones orientativas para conversar sobre materia, consigna y modalidad. No representan testimonios ni resultados de clientes."
        testimonials={TESTIMONIOS.map((t, idx) => {
          const photos = [
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80',
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80',
            'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&h=150&q=80'
          ];
          return { ...t, image: photos[idx % photos.length] };
        })}
        cta={{
          title: 'Avancemos con tu proyecto académico.',
          description: 'Contanos la materia o consigna. Revisamos una modalidad de orientación adecuada y disponible.',
          buttonLabel: 'Consultar acompañamiento',
          href: 'https://wa.me/59161320004?text=Hola,%20quiero%20consultar%20por%20acompañamiento%20académico',
          eyebrow: 'ACOMPAÑAMIENTO ACADÉMICO',
          image: '/img/08_Cards/academico-apoyo-escolar-v2.webp',
          imageAlt: 'Sesión de orientación académica',
        }}
      />

    </div>
  );
};

export default Academia;
