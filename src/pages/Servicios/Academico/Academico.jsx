import RecorridoAcademico from './RecorridoAcademico';
import TestimonialCarousel from '../../../components/carouseles/CarruselTestimonios';
import React from 'react';
import { Link } from 'react-router-dom';
import { Terminal, Code, Award, ArrowRight, Star, ChevronLeft } from 'lucide-react';
import CircuitBackground from '../../../components/fondos/FondoParticulas';
import CircleParticles from '../../../components/fondos/ParticulasCirculares';
import Breadcrumb from '../../../components/func/MigasPan';

const CLIENTES = ['Rintisa', 'La Calera', 'Texfina', 'Tai Loy', 'Auna', 'Daryza', 'Nexa'];

const BRANDS = [
  { name: 'Libros Escolares', tag: 'Primaria y Secundaria', icon: 'fa-book-open' },
  { name: 'Colegios Aliados', tag: 'Alianzas Estratégicas', icon: 'fa-school' },
  { name: 'React / Web', tag: 'Desarrollo de Software', icon: 'fa-laptop-code' },
  { name: 'iOS & Android', tag: 'Desarrollo de Software', icon: 'fa-mobile-screen-button' },
  { name: 'Scratch', tag: 'Cursos de Robótica', icon: 'fa-shapes' },
  { name: 'LEGO Education', tag: 'Cursos de Robótica', icon: 'fa-puzzle-piece' },
  { name: 'Python', tag: 'Cursos de Robótica', icon: 'fa-code' }
];

const PROCESO = [
  { title: 'Planificación', desc: 'Analizamos tu identidad de marca, competidores y metas de marketing para estructurar el sitemap óóptimo.' },
  { title: 'Diseño UX/UI', desc: 'Diseñamos mockups visuales interactivos alineados a tu marca, garantizando una usabilidad excepcional.' },
  { title: 'Programación', desc: 'Codificamos con tecnologías modernas (React, Vite, CSS) para asegurar velocidad extrema y SEO óóptimo.' },
  { title: 'Lanzamiento', desc: 'Desplegamos en servidores seguros en la nube, optimizamos caché y realizamos indexación en Google.' }
];

const TESTIMONIOS = [
  { name: 'Esteban Ramírez', role: 'Estudiante de Medicina', text: 'La presentación interactiva y los esquemas anatómicos que me diseñaron fueron la clave para sacar la máxima nota en mi defensa de tesis.' },
  { name: 'Prof. Ana Torres', role: 'Docente Universitaria', text: 'Los simuladores educativos y entornos virtuales han mejorado muchísimo la comprensión de mis alumnos en sistemas informáticos.' },
  { name: 'Felipe Guzmán', role: 'Tesista de Ingeniería', text: 'Su asesoría en formato APA 7 y lógica de programación estructurada me salvó el proyecto de grado. Muy rigurosos y profesionales.' }
];

import TrustedClients from '../../../components/carouseles/ClientesConfian';


const FLOATING_CARDS = [
  {
    key: 'tiktok',
    title: 'TikTok',
    subtitle: 'Conecta con',
    icon: 'fab fa-tiktok',
    accent: '#111827',
    iconBackground: '#111827',
    url: 'https://www.tiktok.com/@techhomebolivia',
    positionClass: 'top-[8%] sm:top-[12%] md:top-[16%] lg:top-[14%] left-[0.5%] sm:left-[1%] md:left-[1.5%] lg:left-[2%] xl:left-[3%] 2xl:left-[4%]',
    scaleClass: 'origin-top-left scale-[0.75] sm:scale-[0.85] md:scale-[0.95] lg:scale-[1.0] xl:scale-[1.05] 2xl:scale-[1.1]',
    animationClass: 'animate-float-slow',
  },
  {
    key: 'youtube',
    title: 'YouTube',
    subtitle: 'Conecta con',
    icon: 'fab fa-youtube',
    accent: '#FF0000',
    iconBackground: '#FF0000',
    url: 'https://www.youtube.com/@TechHomeBolivia',
    positionClass: 'top-[8%] sm:top-[12%] md:top-[16%] lg:top-[14%] right-[0.5%] sm:right-[1%] md:right-[1.5%] lg:right-[2%] xl:right-[3%] 2xl:right-[4%]',
    scaleClass: 'origin-top-right scale-[0.75] sm:scale-[0.85] md:scale-[0.95] lg:scale-[1.0] xl:scale-[1.05] 2xl:scale-[1.1]',
    animationClass: 'animate-float-medium',
  },
  {
    key: 'facebook',
    title: 'Facebook',
    subtitle: 'Conecta con',
    icon: 'fab fa-facebook',
    accent: '#1877F2',
    iconBackground: '#1877F2',
    url: 'https://www.facebook.com/TECHHOMEERTA?locale=es_LA',
    positionClass: 'bottom-[8%] sm:bottom-[10%] md:bottom-[12%] lg:bottom-[10%] right-[0.5%] sm:right-[1%] md:right-[1.5%] lg:right-[2%] xl:right-[3%] 2xl:right-[4%]',
    scaleClass: 'origin-bottom-right scale-[0.75] sm:scale-[0.85] md:scale-[0.95] lg:scale-[1.0] xl:scale-[1.05] 2xl:scale-[1.1]',
    animationClass: 'animate-float-fast',
  },
  {
    key: 'instagram',
    title: 'Instagram',
    subtitle: 'Conecta con',
    icon: 'fab fa-instagram',
    accent: '#E4405F',
    iconBackground: 'linear-gradient(45deg, #F58529, #DD2A7B, #8134AF, #515BD4)',
    url: 'https://www.instagram.com/techhomebolivia/',
    positionClass: 'bottom-[8%] sm:bottom-[10%] md:bottom-[12%] lg:bottom-[10%] left-[0.5%] sm:left-[1%] md:left-[1.5%] lg:left-[2%] xl:left-[3%] 2xl:left-[4%]',
    scaleClass: 'origin-bottom-left scale-[0.75] sm:scale-[0.85] md:scale-[0.95] lg:scale-[1.0] xl:scale-[1.05] 2xl:scale-[1.1]',
    animationClass: 'animate-float-slow',
  },
];

const VALUE_POINTS = [
  { icon: 'fa-globe', label: 'Páginas Modernas' },
  { icon: 'fa-gauge-high', label: 'Velocidad de Carga <1s' },
  { icon: 'fa-magnifying-glass', label: 'SEO Google Ready' },
  { icon: 'fa-shield', label: 'Certificado SSL Incluido' }
];

const Academico = () => {
  
  
  // Auto-play de testimonios
  

  

  

  return (
    <div className="dark relative overflow-hidden min-h-screen bg-[#050505] font-montserrat">
      <CircuitBackground />
      <CircleParticles colorScheme="dark" />

      {/* Organic Soft Blobs Background (tech) */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#A3E635]/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#84CC16]/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-[40%] left-[20%] w-[40%] h-[40%] bg-[#A3E635]/5 rounded-full blur-[140px] pointer-events-none"></div>

      {/* Decorative Orbits */}
      <div className="absolute top-[12%] left-[-5%] w-80 h-80 rounded-full border border-[#A3E635]/10 pointer-events-none flex items-center justify-center z-0">
        <div className="w-60 h-60 rounded-full border border-[#84CC16]/10 border-dashed animate-spin" style={{ animationDuration: '100s' }}></div>
        <div className="absolute w-2 h-2 rounded-full bg-[#A3E635]/30 top-0 left-1/2"></div>
      </div>
      <div className="absolute top-[45%] right-[-5%] w-96 h-96 rounded-full border border-[#84CC16]/10 pointer-events-none flex items-center justify-center z-0">
        <div className="w-72 h-72 rounded-full border border-[#A3E635]/10 border-dashed animate-spin" style={{ animationDuration: '80s' }}></div>
      </div>

      

      {/* SECCIÓN 1: HERO */}
      <section className="relative overflow-hidden pt-28 sm:pt-32 pb-12" id="home">
        <div className="container mx-auto px-6 max-w-7xl relative z-10 flex flex-col items-center">
          
          {/* ---- Migas de pan en estilo tech (discreto) ---- */}
          <div className="flex items-center gap-2 mb-5">
              <span className="inline-flex items-center px-4 py-1.5 rounded-full border border-[#A3E635]/45 bg-[#A3E635]/10 text-[9.5px] font-black uppercase tracking-widest text-[#A3E635] shadow-sm leading-none">
                  <i className="fa-solid fa-laptop-code mr-1.5"></i> Apoyo Académico Profesionales — HagamosTech
              </span>
          </div>

          <div className="flex flex-col xl:flex-row items-center xl:items-stretch gap-4 xl:-gap-8 justify-between w-full">
            
            {/* Left Column */}
            <div className="w-full xl:w-[35%] flex flex-col gap-5 text-center items-center xl:justify-center animate-slide-down">
              
              <h1 className="text-3xl sm:text-4xl lg:text-4xl xl:text-4xl font-black text-white dark:text-white leading-[1.1] tracking-tight uppercase">
                <span className="block">Sector Académico</span>
                <span className="block whitespace-nowrap">de alto rigor <span className="text-[#A3E635] relative inline-block z-10">premium.<svg className="absolute w-full h-4 -bottom-2 left-0 z-[-1] text-[#84CC16]" viewBox="0 0 200 9" fill="none"><path d="M2.00025 6.99997C25.7509 4.50435 65.2536 2.07897 197.994 4.4151" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/></svg></span></span>
              </h1>

              <p className="text-base sm:text-lg font-bold text-slate-300 dark:text-slate-300 leading-relaxed max-w-xl text-center">
                Orientado a estudiantes universitarios, docentes e instituciones que requieren estructurar, simular y presentar proyectos con alto rigor académico en áreas complejas.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-2 w-full sm:w-auto items-center justify-center">
                <a
                  href="https://wa.me/59161320004?text=Hola,%20quisiera%20cotizar%20el%20desarrollo%20de%20una%20página%20web"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden flex items-center justify-center gap-3 min-w-0 sm:min-w-[220px] w-full sm:w-auto h-12 px-6 bg-[#A3E635] hover:bg-[#84CC16] text-white rounded-full shadow-lg shadow-[#A3E635]/20 hover:shadow-[#A3E635]/35 hover:-translate-y-0.5 transition-all duration-300 border border-[#A3E635]/20 active:scale-95 text-[11px] font-black uppercase tracking-[0.14em]"
                >
                  <i className="fas fa-file-contract text-[14px]"></i>
                  <span className="whitespace-nowrap">Cotizar Servicio</span>
                  <i className="fas fa-arrow-right text-[11px] group-hover:translate-x-1 transition-transform"></i>
                  <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-700 ease-in-out"></div>
                </a>
                <a
                  href="https://wa.me/59161320004?text=Hola,%20quisiera%20asesoría%20sobre%20el%20desarrollo%20de%20una%20página%20web"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden flex items-center justify-center gap-3 min-w-0 sm:min-w-[220px] w-full sm:w-auto h-12 px-6 bg-[#84CC16] border-2 border-[#84CC16] hover:bg-[#b08e4a] text-white hover:text-white rounded-full shadow-lg shadow-[#84CC16]/30 hover:-translate-y-0.5 transition-all duration-300 active:scale-95 text-[11px] font-black uppercase tracking-[0.14em]"
                >
                  <i className="fas fa-paper-plane text-[14px]"></i>
                  <span className="whitespace-nowrap">Contactar Asesor</span>
                  <i className="fas fa-arrow-right text-[11px] group-hover:translate-x-1 transition-transform"></i>
                  <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-700 ease-in-out"></div>
                </a>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 pt-4">
                <div className="flex gap-0.5 text-[#A3E635]">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className="fas fa-star text-xs" />
                  ))}
                </div>
                <span className="text-[10px] font-black text-slate-400 dark:text-slate-450 uppercase tracking-widest leading-none">+500 estudiantes y clientes confían en HagamosTech</span>
              </div>

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#A3E635] to-[#7f1d1d] text-white border border-[#84CC16]/40 shadow-md">
                <i className="fas fa-tag text-[#84CC16]"></i>
                <span className="text-[9px] font-black uppercase tracking-wider">Pago único o por fases + Mantenimiento mensual</span>
              </div>
            </div>

            {/* Right Column: Central orbits with image */}
            <div className="w-full xl:w-[52%] relative min-h-[280px] sm:min-h-[360px] md:min-h-[400px] lg:min-h-[440px] xl:min-h-[480px] flex items-center justify-center -mb-4 sm:mb-0">
              <div className="absolute top-[50%] left-[54%] -translate-x-1/2 -translate-y-[50%] w-[44%] sm:w-[48%] md:w-[52%] lg:w-[58%] xl:w-[58%] 2xl:w-[62%] aspect-square z-0 pointer-events-none flex items-center justify-center">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-[#84CC16] origin-right scale-x-[1.15]">
                  <path fill="currentColor" d="M37.9,-63.2C50.9,-54.6,64.6,-47.5,73.8,-36.8C83,-26.1,87.7,-11.8,85.6,1.4C83.5,14.6,74.5,26.7,65.2,38.3C55.8,49.9,46.1,61,34.5,67.6C22.9,74.2,9.4,76.3,-2.8,81.1C-15,85.9,-25.9,93.4,-35.1,89.5C-44.3,85.6,-51.7,70.3,-60.7,58.3C-69.8,46.3,-80.5,37.6,-84.3,27.1C-88.1,16.6,-85,4.3,-81.2,-7.1C-77.4,-18.5,-72.9,-29,-65.4,-37.9C-57.9,-46.8,-47.3,-54.1,-36.6,-59.5C-25.9,-64.9,-15.1,-68.4,-3.2,-62.9C8.7,-57.4,24.9,-71.8,37.9,-63.2Z" transform="translate(100 100) scale(1.1) skewX(-5)" />
                </svg>
              </div>

              <div className="relative z-10 w-full max-w-[420px] sm:max-w-[540px] md:max-w-[620px] lg:max-w-[680px] xl:max-w-[740px] 2xl:max-w-[820px] ml-auto animate-fade-in-up delay-200 group/hero flex items-center justify-center mt-6 sm:mt-8">
                <div className="absolute -inset-[8%] -z-10 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(197,160,89,0.25)_0%,rgba(164,30,34,0.12)_45%,transparent_75%)] blur-xl"></div>
                <div
                  className="transition-transform duration-700 ease-out group-hover/hero:scale-[1.03] flex items-center justify-center"
                  style={{
                    WebkitMaskImage: 'linear-gradient(to right, transparent, black 4%, black 96%, transparent), linear-gradient(to bottom, transparent, black 4%, black 96%, transparent)',
                    maskImage: 'linear-gradient(to right, transparent, black 4%, black 96%, transparent), linear-gradient(to bottom, transparent, black 4%, black 96%, transparent)',
                    WebkitMaskComposite: 'source-in',
                    maskComposite: 'intersect'
                  }}
                >
                  <img
                    src="/img/07_Servicios/soluciones/academico.jpg"
                    alt="EdTech y Académico"
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                    className="w-full h-auto object-contain rounded-3xl scale-[0.75] sm:scale-[0.82] md:scale-[0.9] lg:scale-[0.95] xl:scale-[1] 2xl:scale-[1.05]"
                  />
                </div>
              </div>

              {/* Floating Social Cards */}
              {FLOATING_CARDS.map((card) => (
                <a
                  key={card.key}
                  href={card.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`absolute ${card.positionClass} z-20 ${card.animationClass}`}
                >
                  <div className={`transform ${card.scaleClass}`}>
                    <div
                      className="glass-card w-[130px] sm:w-[155px] md:w-[175px] px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl flex items-center gap-2 sm:gap-3 hover:scale-105 transition-transform border-l-4 cursor-pointer"
                      style={{ borderColor: card.accent }}
                    >
                      <div
                        className="w-7 h-7 sm:w-8 sm:h-8 flex-shrink-0 rounded-lg flex items-center justify-center text-sm shadow-inner"
                        style={{ background: card.iconBackground, color: 'white' }}
                      >
                        <i className={card.icon}></i>
                      </div>
                      <div className="leading-tight flex-1 text-left">
                        <p className="text-[8px] font-bold uppercase text-slate-600 dark:text-slate-450">{card.subtitle}</p>
                        <p className="text-xs font-black text-white dark:text-white">{card.title}</p>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>

          </div>
        </div>
      </section>
      
      {/* SECCIÓN 2: CLIENTES */}
      <TrustedClients />

      {/* SECCIÓN 3: PROCESO */}
      <section className="py-12 relative overflow-hidden reveal">
        <div className="container mx-auto px-6 max-w-7xl relative z-10 text-left">
          
          
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-4xl md:text-6xl font-black text-white dark:text-white mb-6">
              Nuestro proceso, <br />
              <span className="text-[#A3E635] relative inline-block">
                desarrollo ágil.
                <svg className="absolute w-full h-4 -bottom-2 left-0 z-[-1] text-[#84CC16]" viewBox="0 0 200 9" fill="none"><path d="M2.00025 6.99997C25.7509 4.50435 65.2536 2.07897 197.994 4.4151" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 dark:text-neutral-300 font-bold leading-relaxed max-w-2xl mx-auto text-center">
              Construimos y optimizamos tu plataforma digital a través de etapas ágiles y orientadas a resultados de alto nivel.
            </p>
          </div>

          <div className="relative py-8">
            {/* Horizontal Line connecting steps (hidden on mobile) */}
            <div className="hidden md:block absolute top-18 left-16 right-16 h-0.5 border-t-2 border-dashed border-[#A3E635]/20 z-0"></div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10 max-w-6xl mx-auto">
              {PROCESO.map((step, idx) => {
                const stepIcons = ['fa-magnifying-glass', 'fa-palette', 'fa-code', 'fa-rocket'];
                const stepColors = ['text-[#A3E635]', 'text-white', 'text-[#A3E635]', 'text-[#A3E635]'];
                const stepBgs = ['bg-[#A3E635]/10', 'bg-neutral-900/40', 'bg-[#A3E635]/10', 'bg-[#A3E635]/10'];
                return (
                  <div key={idx} className="flex flex-col items-center text-center group">
                    {/* Bubble containing step number and icon */}
                    <div className="relative mb-6">
                      <div className={'w-20 h-20 rounded-[1.6rem] ' + stepBgs[idx] + ' dark:bg-[#1a0808] border-4 border-white dark:border-[#0a0a0a] ring-1 ring-gray-100 dark:ring-[#A3E635]/20 flex items-center justify-center text-3xl shadow-lg ' + stepColors[idx] + ' group-hover:scale-105 transition-transform duration-500'}>
                        <i className={'fa-solid ' + stepIcons[idx]}></i>
                        <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-[#A3E635] text-white flex items-center justify-center text-[11px] font-black border-4 border-white dark:border-[#0a0a0a]">
                          0{(idx + 1)}
                        </div>
                      </div>
                    </div>
                    
                    {/* Text */}
                    <h3 className="text-base font-black text-white dark:text-white mb-2 group-hover:text-[#A3E635] dark:group-hover:text-[#A3E635] transition-colors uppercase tracking-tight">
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400 dark:text-slate-400 font-bold leading-relaxed max-w-xs">
                      {step.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN 4: EXPLICACIÓN Y MOCKUP */}
      <section className="py-12 relative overflow-hidden reveal overflow-hidden">
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 text-center flex flex-col items-center justify-center">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white dark:text-white uppercase leading-tight mb-6 tracking-tighter">
                ¿A QUIÉN ESTÁ DIRIGIDO Y QUÉ INCLUYE?
              </h2>

              <div className="space-y-5 text-slate-300 dark:text-slate-355 font-bold leading-relaxed text-sm sm:text-base max-w-2xl text-justify">
                <p>
                  Soluciones orientadas a estudiantes, docentes e instituciones que requieren estructurar, simular y presentar proyectos académicos rigurosos (medicina, sistemas, RRHH).
                </p>
                <p>
                  <span className="font-black uppercase tracking-widest text-[#A3E635] dark:text-[#A3E635]">Servicios Específicos: </span>
                  Presentaciones Interactivas, Formato APA 7, Infografías y Diagramas, Mapas Conceptuales, Simuladores Educativos y Apoyo en Programación.
                </p>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="bg-[#1e1e1e] rounded-3xl shadow-2xl border border-neutral-800 overflow-hidden text-left relative group">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#A3E635] to-[#84CC16]"></div>
                
                <div className="bg-[#252526] p-3 flex items-center justify-between border-b border-neutral-900">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-[#A3E635]/100"></span>
                    <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                    <span className="w-3 h-3 rounded-full bg-green-500"></span>
                    <span className="text-[10px] text-slate-400 font-bold ml-2 font-mono">simulador.js</span>
                  </div>
                  <Terminal size={14} className="text-slate-500" />
                </div>

                <div className="p-5 font-mono text-[10.5px] sm:text-[11.5px] leading-relaxed text-slate-300 overflow-x-auto select-none space-y-1">
                  <div>import React from "react";</div>
                  <div>import &#123; MetaTags &#125; from "./seo";</div>
                  <div className="mt-2">export const Academico = () =&gt; &#123;</div>
                  <div className="pl-4">return (</div>
                  <div className="pl-8">&lt;div className="corporate-layout"&gt;</div>
                  <div className="pl-12">&lt;MetaTags title="HagamosTech — Apoyo Académico" /&gt;</div>
                  <div className="pl-12">&lt;HeroSection theme="premium" /&gt;</div>
                  <div className="pl-12">&lt;ServicesGrid items=&#123;10&#125; /&gt;</div>
                  <div className="pl-8">&lt;/div&gt;</div>
                  <div className="pl-4">);</div>
                  <div>&#125;;</div>
                </div>

                <div className="absolute top-1/2 -right-4 translate-y-[-50%] flex flex-col gap-3 z-20">
                  <div className="w-12 h-12 bg-neutral-900/50 dark:bg-neutral-900 border border-slate-100 dark:border-neutral-800 rounded-2xl flex items-center justify-center text-[#A3E635] shadow-lg"><Code size={18} /></div>
                  <div className="w-12 h-12 bg-[#A3E635] rounded-2xl flex items-center justify-center text-white shadow-lg"><Award size={18} className="text-[#84CC16]" /></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN ADICIONAL: DEMOSTRACIÓN DE SOFTWARE */}
      <RecorridoAcademico />

      {/* SECCIÓN 5: TESTIMONIOS */}
      <section className="py-12 relative overflow-hidden reveal">
        <div className="container mx-auto px-6 max-w-4xl text-center relative z-10">
          
          <h2 className="text-4xl md:text-6xl font-black text-white dark:text-white mb-6">
            Casos reales, <br />
            <span className="text-[#A3E635] relative inline-block">
              resultados comprobados.
              <svg className="absolute w-full h-4 -bottom-2 left-0 z-[-1] text-[#84CC16]" viewBox="0 0 200 9" fill="none"><path d="M2.00025 6.99997C25.7509 4.50435 65.2536 2.07897 197.994 4.4151" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300 dark:text-neutral-300 font-bold leading-relaxed max-w-2xl mx-auto mb-10 text-center">
            Opiniones y valoraciones de las empresas y líderes de marca que han transformado su operación digital gracias a nuestras soluciones de software.
          </p>
        </div>

        <TestimonialCarousel testimonials={TESTIMONIOS.map((t, idx) => {
          const photos = [
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80',
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80',
            'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&h=150&q=80',
            'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80',
            'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&h=150&q=80'
          ];
          return { ...t, image: photos[idx % photos.length] };
        })} />
      </section>
    </div>
  );
};

export default Academico;
