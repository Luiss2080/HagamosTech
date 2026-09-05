import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const TECH_DETAILS = {
  'Laravel': { icon: 'fa-brands fa-laravel', color: 'text-rose-600 dark:text-rose-400', bg: 'bg-rose-50 dark:bg-rose-950/20', border: 'border-rose-100 dark:border-rose-900/30' },
  'MySQL': { icon: 'fa-solid fa-database', color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-950/20', border: 'border-blue-100 dark:border-blue-900/30' },
  'Docker': { icon: 'fa-brands fa-docker', color: 'text-sky-500 dark:text-sky-400', bg: 'bg-sky-50 dark:bg-sky-950/20', border: 'border-sky-100 dark:border-sky-900/30' },
  'AWS': { icon: 'fa-brands fa-aws', color: 'text-amber-500 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-950/20', border: 'border-amber-100 dark:border-amber-900/30' },
  'TypeScript': { icon: 'fa-solid fa-code', color: 'text-indigo-500 dark:text-indigo-400', bg: 'bg-indigo-50 dark:bg-indigo-950/20', border: 'border-indigo-100 dark:border-indigo-900/30' },
  'Git': { icon: 'fa-brands fa-git-alt', color: 'text-orange-600 dark:text-orange-500', bg: 'bg-orange-50 dark:bg-orange-950/20', border: 'border-orange-100 dark:border-orange-900/30' },
  'React': { icon: 'fa-brands fa-react', color: 'text-cyan-500 dark:text-cyan-450', bg: 'bg-cyan-50 dark:bg-cyan-950/20', border: 'border-cyan-100 dark:border-cyan-900/30' },
  'Node.js': { icon: 'fa-brands fa-node-js', color: 'text-green-600 dark:text-green-400', bg: 'bg-green-50 dark:bg-green-950/20', border: 'border-green-100 dark:border-green-900/30' },
  'Tailwind CSS': { icon: 'fa-solid fa-wind', color: 'text-teal-500 dark:text-teal-400', bg: 'bg-teal-50 dark:bg-teal-950/20', border: 'border-teal-100 dark:border-teal-900/30' },
  'Next.js': { icon: 'fa-solid fa-n', color: 'text-gray-800 dark:text-gray-200', bg: 'bg-gray-100 dark:bg-gray-800/40', border: 'border-gray-300 dark:border-gray-700/50' },
  'Stripe': { icon: 'fa-brands fa-stripe', color: 'text-indigo-600 dark:text-indigo-400', bg: 'bg-indigo-50 dark:bg-indigo-950/20', border: 'border-indigo-200 dark:border-indigo-900/30' },
  'Figma': { icon: 'fa-brands fa-figma', color: 'text-pink-500 dark:text-pink-400', bg: 'bg-pink-50 dark:bg-pink-950/20', border: 'border-pink-200 dark:border-pink-900/30' }
};

const PROJECTS = [
  {
    num: '01',
    category: 'E-COMMERCE',
    firstPart: 'Tienda Virtual',
    highlightPart: 'de Alta Conversión',
    desc: 'Plataforma de comercio electrónico diseñada para ventas masivas. Incluye pasarelas de pago (Stripe/PayPal), carrito dinámico, catálogo filtrable y panel de administración.',
    tags: ['React', 'Next.js', 'Tailwind CSS', 'Stripe', 'Node.js', 'AWS', 'MySQL', 'Git'],
    icon: 'fa-cart-shopping',
    images: [
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    num: '02',
    category: 'LANDING PAGE',
    firstPart: 'Página Web',
    highlightPart: 'Corporativa',
    desc: 'Sitio web moderno tipo One-Page enfocado en la presentación de servicios B2B. Optimizado para captación de leads, SEO técnico y velocidad de carga ultrarrápida.',
    tags: ['React', 'Tailwind CSS', 'Figma', 'Docker', 'AWS', 'Git'],
    icon: 'fa-building',
    images: [
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    num: '03',
    category: 'PORTFOLIO',
    firstPart: 'Catálogo de',
    highlightPart: 'Servicios',
    desc: 'Portal interactivo con galerías de imágenes y videos de alto rendimiento. Ideal para estudios de diseño, arquitectos o agencias creativas que necesitan exhibir su trabajo.',
    tags: ['React', 'Next.js', 'Tailwind CSS', 'TypeScript', 'AWS', 'Git'],
    icon: 'fa-images',
    images: [
      'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1481481656886-90518be57416?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1512758117921-be3d65b16954?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    num: '04',
    category: 'REAL ESTATE',
    firstPart: 'Portal',
    highlightPart: 'Inmobiliario',
    desc: 'Plataforma web dinámica para listar propiedades con filtros avanzados de búsqueda, mapas interactivos y sistema de reservas online. Diseño optimizado para retener leads y aumentar ventas de inmuebles.',
    tags: ['React', 'Next.js', 'Tailwind CSS', 'AWS', 'MySQL', 'Git'],
    icon: 'fa-house-building',
    images: [
      'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?auto=format&fit=crop&w=800&q=80'
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
    <div className="relative w-full aspect-[16/10] sm:aspect-[16/9.5] rounded-[2.2rem] overflow-hidden shadow-2xl border border-[#a41e22]/15 hover:border-[#c5a059]/30 bg-[#121212] group transition-all duration-500">
      <img
        src={images[index]}
        alt="Mockup de pantalla de proyecto"
        className="w-full h-full object-cover transition-all duration-550"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60"></div>
      
      {/* Controls: Styled as White Buttons */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-2xl bg-white/95 dark:bg-[#0a0a0a]/95 border border-neutral-200/60 dark:border-neutral-800 shadow-xl flex items-center justify-center text-[#111827] dark:text-white transition-all opacity-0 group-hover:opacity-100 hover:scale-110 active:scale-95 hover:bg-[#a41e22] hover:text-white z-20 cursor-pointer"
      >
        <ChevronLeft size={16} />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-2xl bg-white/95 dark:bg-[#0a0a0a]/95 border border-neutral-200/60 dark:border-neutral-800 shadow-xl flex items-center justify-center text-[#111827] dark:text-white transition-all opacity-0 group-hover:opacity-100 hover:scale-110 active:scale-95 hover:bg-[#a41e22] hover:text-white z-20 cursor-pointer"
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
              i === index ? 'w-6 bg-[#c5a059]' : 'bg-[#a41e22]/55'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

const RecorridoPaginasWeb = () => {
  return (
    <section className="py-20 relative overflow-hidden bg-transparent reveal">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-[#111827] dark:text-white mb-6 leading-none">
            Nuestro recorrido en <br />
            <span className="text-[#a41e22] dark:text-red-400 relative inline-block">
              Páginas Web.
              <svg className="absolute w-full h-4 -bottom-2 left-0 z-[-1] text-[#c5a059]" viewBox="0 0 200 9" fill="none"><path d="M2.00025 6.99997C25.7509 4.50435 65.2536 2.07897 197.994 4.4151" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 font-semibold leading-relaxed max-w-2xl mx-auto mb-8 text-center justify-center">
            Proyectos web diseñados a la medida. Innovación, velocidad y resultados reales para empresas de todos los tamaños.
          </p>
        </div>

        {/* Vertical interleaved list */}
        <div className="space-y-24 max-w-6xl mx-auto mt-16">
          {PROJECTS.map((p, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div
                key={p.num}
                className={`flex flex-col lg:flex-row items-center gap-10 lg:gap-16 ${
                  isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Text column */}
                <div className="w-full lg:w-1/2 text-center flex flex-col items-center justify-center gap-5">
                  
                  {/* Number, Icon, category tag, and Ver detalles row (Doble columna moderna) */}
                  <div className="flex items-center justify-between gap-5 w-full pb-4.5 border-b border-slate-100 dark:border-neutral-800 text-left">
                    {/* Columna Izquierda: Número & Icono */}
                    <div className="flex items-center gap-3.5">
                      <span className="text-3xl sm:text-4xl font-black text-[#a41e22] dark:text-red-500 select-none leading-none">
                        {p.num}
                      </span>
                      <div className="w-12 h-12 rounded-2xl bg-[#c5a059] border border-[#c5a059]/20 flex items-center justify-center text-lg text-[#111827] shadow-md shadow-[#c5a059]/10">
                        <i className={`fa-solid ${p.icon}`}></i>
                      </div>
                    </div>

                    {/* Columna Derecha: Título, Datos y Botón Ver Detalles */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between flex-1 gap-3 sm:gap-6 pl-4 border-l border-slate-150 dark:border-neutral-800 text-left">
                      <div className="flex flex-col">
                        <span className="text-xs sm:text-sm font-black text-[#c5a059] uppercase tracking-widest leading-none">
                          {p.category}
                        </span>
                        <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 mt-1 uppercase tracking-wider">
                          {p.tags.length} Tecnologías Implementadas
                        </span>
                      </div>
                      
                      <a
                        href={`https://wa.me/59161320004?text=Hola,%20quisiera%20más%20detalles%20sobre%20el%20desarrollo%20de%20un%20proyecto%20tipo%20${encodeURIComponent(p.category)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-2.5 rounded-xl bg-[#a41e22] text-white hover:bg-[#801015] border border-transparent text-[10px] font-black uppercase tracking-wider transition-all duration-300 flex items-center gap-2 group cursor-pointer shadow-md shadow-[#a41e22]/20 hover:shadow-[#a41e22]/35 hover:-translate-y-0.5 active:scale-95"
                      >
                        <span>Ver detalles</span>
                        <i className="fa-solid fa-arrow-up-right-from-square text-[9px] group-hover:translate-y-[-1px] group-hover:translate-x-[1px] transition-transform"></i>
                      </a>
                    </div>
                  </div>

                  {/* Split Title with signature combination: Dark, Red, and Gold underline */}
                  <h3 className="text-2xl sm:text-3xl font-black text-[#111827] dark:text-white leading-tight uppercase tracking-tight text-center w-full">
                    {p.firstPart} <br />
                    <span className="text-[#a41e22] dark:text-red-400 relative inline-block">
                      {p.highlightPart}
                      <svg className="absolute w-full h-3 -bottom-1.5 left-0 z-[-1] text-[#c5a059]" viewBox="0 0 200 9" fill="none"><path d="M2.00025 6.99997C25.7509 4.50435 65.2536 2.07897 197.994 4.4151" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>
                  </h3>

                  <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 font-bold leading-relaxed text-center max-w-md mx-auto">
                    {p.desc}
                  </p>

                  {/* Tech tools grid */}
                  <div className="flex flex-wrap justify-center gap-2 mt-2 w-full">
                    {p.tags.map((tag) => {
                      const t = TECH_DETAILS[tag] || { icon: 'fa-solid fa-code', color: 'text-slate-650', bg: 'bg-slate-50', border: 'border-slate-100' };
                      return (
                        <span
                          key={tag}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-[10px] font-black uppercase shadow-sm transition-all duration-300 hover:-translate-y-0.5 ${t.color} ${t.bg} ${t.border}`}
                        >
                          <i className={`${t.icon}`}></i>
                          {tag}
                        </span>
                      );
                    })}
                  </div>
                </div>

                {/* Media/Carousel column */}
                <div className="w-full lg:w-1/2">
                  <ProjectCarousel images={p.images} />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default RecorridoPaginasWeb;
