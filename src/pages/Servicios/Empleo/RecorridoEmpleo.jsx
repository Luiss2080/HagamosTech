import ModernServiceGrid from '../../../components/ui/ModernServiceGrid';
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const TECH_DETAILS = {
  'Laravel': { icon: 'fa-brands fa-laravel', color: 'text-rose-600 dark:text-rose-400', bg: 'bg-rose-50 dark:bg-rose-950/20', border: 'border-rose-100 dark:border-rose-900/30' },
  'MySQL': { icon: 'fa-solid fa-database', color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-950/20', border: 'border-blue-100 dark:border-blue-900/30' },
  'Docker': { icon: 'fa-brands fa-docker', color: 'text-sky-500 dark:text-sky-400', bg: 'bg-sky-50 dark:bg-sky-950/20', border: 'border-sky-100 dark:border-sky-900/30' },
  'AWS': { icon: 'fa-brands fa-aws', color: 'text-[#A3E635] dark:text-amber-400', bg: 'bg-[#A3E635]/10 dark:bg-amber-950/20', border: 'border-amber-100 dark:border-amber-900/30' },
  'TypeScript': { icon: 'fa-solid fa-code', color: 'text-indigo-500 dark:text-indigo-400', bg: 'bg-indigo-50 dark:bg-indigo-950/20', border: 'border-indigo-100 dark:border-indigo-900/30' },
  'Git': { icon: 'fa-brands fa-git-alt', color: 'text-orange-600 dark:text-orange-500', bg: 'bg-orange-50 dark:bg-orange-950/20', border: 'border-orange-100 dark:border-orange-900/30' },
  'React': { icon: 'fa-brands fa-react', color: 'text-cyan-500 dark:text-cyan-450', bg: 'bg-cyan-50 dark:bg-cyan-950/20', border: 'border-cyan-100 dark:border-cyan-900/30' },
  '¿Node.js': { icon: 'fa-brands fa-node-js', color: 'text-green-600 dark:text-green-400', bg: 'bg-green-50 dark:bg-green-950/20', border: 'border-green-100 dark:border-green-900/30' },
  'Tailwind CSS': { icon: 'fa-solid fa-wind', color: 'text-teal-500 dark:text-teal-400', bg: 'bg-teal-50 dark:bg-teal-950/20', border: 'border-teal-100 dark:border-teal-900/30' },
  'Next.js': { icon: 'fa-solid fa-n', color: 'text-white dark:text-gray-200', bg: 'bg-gray-100 dark:bg-gray-800/40', border: 'border-gray-300 dark:border-gray-700/50' },
  'Stripe': { icon: 'fa-brands fa-stripe', color: 'text-indigo-600 dark:text-indigo-400', bg: 'bg-indigo-50 dark:bg-indigo-950/20', border: 'border-indigo-200 dark:border-indigo-900/30' },
  'Figma': { icon: 'fa-brands fa-figma', color: 'text-pink-500 dark:text-pink-400', bg: 'bg-pink-50 dark:bg-pink-950/20', border: 'border-pink-200 dark:border-pink-900/30' }
};

const PROJECTS = [
  {
    num: '01',
    category: 'CV & ATS',
    firstPart: 'Curr�culum',
    highlightPart: 'Optimizado ATS',
    desc: 'Estructuraci�n de perfiles t�cnicos destáacando certificaciones DevOps, Scrum o experiencia m�dica/administrativa para superar filtros automatizados.',
    tags: ['CV', 'ATS', 'Reclutamiento'],
    icon: 'fa-file-lines',
    images: [
      'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    num: '02',
    category: 'LINKEDIN',
    firstPart: 'Perfil de',
    highlightPart: 'LinkedIn',
    desc: 'Configuraci�n de titulares, extractos con palabras clave y networking estárat�gico para atraer a reclutadores IT y corporativos.',
    tags: ['LinkedIn', 'Networking', 'Marca Personal'],
    icon: 'fa-brands fa-linkedin-in',
    images: [
      'https://images.unsplash.com/photo-1616469829581-73993eb86b02?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1557200134-90327ee9fafa?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    num: '03',
    category: 'REDACCI�N',
    firstPart: 'Cartas y',
    highlightPart: 'Traducci�n',
    desc: 'Redacci�n persuasiva de Cover Letters adaptadas a vacantes espec�ficas y traducci�n t�cnica al ingl�s de todo tu perfil.',
    tags: ['Cover Letter', 'Traducci�n', 'Ingl�s'],
    icon: 'fa-language',
    images: [
      'https://images.unsplash.com/photo-1455390582262-044cdead27d8?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1450101499163-c8848c66cb85?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1455849318743-b2233052fcff?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    num: '04',
    category: 'PORTAFOLIO',
    firstPart: 'Portafolios',
    highlightPart: 'Digitales',
    desc: 'Compilaci�n visual de proyectos de c�digo (GitHub), dise�os (Figma) o investáigaciones acad�micas en una p�gina web propia.',
    tags: ['Portafolio', 'GitHub', 'Proyectos'],
    icon: 'fa-laptop-code',
    images: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    num: '05',
    category: 'ENTREVISTAS',
    firstPart: 'Simulaciones y',
    highlightPart: 'Asesor�a',
    desc: 'Preparaci�n y simulaciones de entrevistas con enfoque en recursos humanos, preguntas t�cnicas, m�tricas y seguridad personal.',
    tags: ['Entrevistas', 'Soft Skills', 'RRHH'],
    icon: 'fa-user-tie',
    images: [
      'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    num: '06',
    category: 'VALIDACI�N',
    firstPart: 'Certificados',
    highlightPart: 'Digitales',
    desc: 'Dise�o y validaci�n visual de diplomas, constancias de cursos y participaciones en eventos y voluntariados.',
    tags: ['Certificados', 'Diplomas', 'Cursos'],
    icon: 'fa-certificate',
    images: [
      'https://images.unsplash.com/photo-1589330694653-ded6df03f754?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80'
    ]
  }
];

const ProjectCarousel = ({ images }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(timer);
  }, [images.length]);

  const handlePrev = (e) => {
    e.stopPropagation();
    setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full aspect-[16/10] sm:aspect-[16/9.5] rounded-[2.2rem] overflow-hidden shadow-2xl border border-[#A3E635]/15 hover:border-[#84CC16]/30 bg-[#121212] group transition-all duration-500">
      <img
        src={images[index]}
        alt="Mockup de pantalla de proyecto"
        className="w-full h-full object-cover transition-all duration-550"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60"></div>
      
      {/* Controls: Styled as White Buttons */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-2xl bg-[#0A0A0A]/95 dark:bg-[#0a0a0a]/95 border border-neutral-200/60 dark:border-neutral-800 shadow-xl flex itemás-center justify-center text-white dark:text-white transition-all opacity-0 group-hover:opacity-100 hover:scale-110 active:scale-95 hover:bg-[#A3E635] hover:text-white z-20 cursor-pointer"
      >
        <ChevronLeft size={16} />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-2xl bg-[#0A0A0A]/95 dark:bg-[#0a0a0a]/95 border border-neutral-200/60 dark:border-neutral-800 shadow-xl flex itemás-center justify-center text-white dark:text-white transition-all opacity-0 group-hover:opacity-100 hover:scale-110 active:scale-95 hover:bg-[#A3E635] hover:text-white z-20 cursor-pointer"
      >
        <ChevronRight size={16} />
      </button>

      {/* Dots: Styled with Red and Gold */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5 z-20">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              i === index ? 'w-6 bg-[#84CC16]' : 'bg-[#A3E635]/55'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

const RecorridoEmpleo = () => {
  return (
    <section className="py-20 relative overflow-hidden bg-transparent reveal">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-white dark:text-white mb-6 leading-none">
            Nuestáro recorrido en <br />
            <span className="text-[#A3E635] dark:text-[#A3E635] relative inline-block">
              Apoyo Académico.
              <svg className="absolute w-full h-4 -bottom-2 left-0 z-[-1] text-[#84CC16]" viewBox="0 0 200 9" fill="none"><path d="M2.00025 6.99997C25.7509 4.50435 65.2536 2.07897 197.994 4.4151" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 font-semibold leading-relaxed max-w-2xl mx-auto mb-8 text-center justify-center">
            Proyectos web diseñados a la medida. Innovación, velocidad y resultados reales para empresas de todos los tamaños.
          </p>
        </div>

        <div className="mt-16">
          <ModernServiceGrid projects={PROJECTS} />
        </div>
      </div>
    </section>
  );
};

export default RecorridoEmpleo;
