import RecorridoSoluciones from '../components/RecorridoSoluciones';
import TestimonialCarousel from '../../../components/carouseles/CarruselTestimonios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Code, Award, ArrowRight, Star, ChevronLeft } from 'lucide-react';
import CircuitBackground from '../../../components/fondos/FondoParticulas';
import CircleParticles from '../../../components/fondos/ParticulasCirculares';
import Breadcrumb from '../../../components/func/MigasPan';

const CLIENTES = ['Rintisa', 'La Calera', 'Arca Continental', 'Urbano', 'Naltech', 'Grupo EFE'];

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
  { title: 'Análisis Multidispositivo', desc: 'Analizamos compatibilidades de pantalla (móviles, tablets) y diferentes versiones de Android SDK.' },
  { title: 'Jetpack Compose UI', desc: 'Diseñamos interfaces dinámicas y modulares con Jetpack Compose para agilizar el desarrollo.' },
  { title: 'Integración Core', desc: 'Conectamos bases de datos locales (Room DB) para persistencia sin conexión e integraciones nativas.' },
  { title: 'Herramientas Internas', desc: 'Compilamos paquetes APK/AAB y guiamos el proceso de publicación cumpliendo políticas de Google.' }
];

import { TESTIMONIOS_SOFTWARE as TESTIMONIOS } from '../../../data/testimonios';

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
  { icon: 'fa-android', label: 'Kotlin & Compose' },
  { icon: 'fa-database', label: 'Persistencia Offline Room' },
  { icon: 'fa-play', label: 'Google Play Release' },
  { icon: 'fa-microchip', label: 'Acceso a Sensores' }
];

const SolucionesMedida = () => {
  
  
  const [activeCard, setActiveCard] = useState('control'); 

  // Auto-play de testimonios
  

  

  

  return (
    <div className="relative overflow-hidden min-h-screen bg-white dark:bg-[#0a0a0a] font-montserrat">
      <CircuitBackground />
      <CircleParticles colorScheme="light" />

      {/* Red/Pink Square Grid Overlay */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06] pointer-events-none z-0" style={{
        backgroundImage: 'linear-gradient(to right, #a41e22 1px, transparent 1px), linear-gradient(to bottom, #a41e22 1px, transparent 1px)',
        backgroundSize: '24px 24px'
      }}></div>

      {/* Decorative Orbits */}
      <div className="absolute top-[12%] left-[-5%] w-80 h-80 rounded-full border border-[#a41e22]/10 pointer-events-none flex items-center justify-center z-0">
        <div className="w-60 h-60 rounded-full border border-[#c5a059]/10 border-dashed animate-spin" style={{ animationDuration: '100s' }}></div>
        <div className="absolute w-2 h-2 rounded-full bg-[#a41e22]/30 top-0 left-1/2"></div>
      </div>
      <div className="absolute top-[45%] right-[-5%] w-96 h-96 rounded-full border border-[#c5a059]/10 pointer-events-none flex items-center justify-center z-0">
        <div className="w-72 h-72 rounded-full border border-[#a41e22]/10 border-dashed animate-spin" style={{ animationDuration: '80s' }}></div>
      </div>

      

      {/* SECCIÓN 1: HERO */}
      <section className="relative overflow-hidden pt-20 pb-12" id="home">
        <div className="container mx-auto px-6 max-w-7xl relative z-10 flex flex-col items-center">
          
          <Breadcrumb
            paths={[{ label: 'Soluciones' }, { label: 'Soluciones Personalizadas' }]}
            badgeText="Soluciones Personalizadas — TECH HOME"
            icon="fa-mobile-screen-button"
            align="center"
          />

          <div className="flex flex-col xl:flex-row items-center xl:items-stretch gap-4 xl:-gap-8 justify-between w-full">
            
            {/* Left Column */}
            <div className="w-full xl:w-[35%] flex flex-col gap-5 text-center items-center xl:justify-center animate-slide-down">

              <h1 className="text-3xl sm:text-4xl lg:text-4xl xl:text-4xl font-black text-[#111827] dark:text-white leading-[1.1] tracking-tight uppercase">
                <span className="block">Soluciones</span>
                <span className="block whitespace-nowrap"><span className="text-[#a41e22] relative inline-block z-10">Personalizadas<svg className="absolute w-full h-4 -bottom-2 left-0 z-[-1] text-[#c5a059]" viewBox="0 0 200 9" fill="none"><path d="M2.00025 6.99997C25.7509 4.50435 65.2536 2.07897 197.994 4.4151" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/></svg></span></span>
              </h1>

              <p className="text-base sm:text-lg font-bold text-[#5c6f8f] dark:text-slate-300 leading-relaxed max-w-xl text-center">
                Soluciones tecnológicas a medida para necesidades específicas, sin límites de complejidad. Innovación real para transformar tus procesos.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-2 w-full sm:w-auto items-center justify-center">
                <button
                  onClick={() => window.openModal?.('contactModal')}
                  className="group relative overflow-hidden flex items-center justify-center gap-3 min-w-0 sm:min-w-[220px] w-full sm:w-auto h-12 px-6 bg-[#a41e22] hover:bg-[#801015] text-white rounded-full shadow-lg shadow-[#a41e22]/20 hover:shadow-[#a41e22]/35 hover:-translate-y-0.5 transition-all duration-300 border border-[#a41e22]/20 active:scale-95 text-[11px] font-black uppercase tracking-[0.14em]"
                >
                  <i className="fas fa-file-contract text-[14px]"></i>
                  <span className="whitespace-nowrap">Cotizar Servicio</span>
                  <i className="fas fa-arrow-right text-[11px] group-hover:translate-x-1 transition-transform"></i>
                  <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-700 ease-in-out"></div>
                </button>
                <button
                  onClick={() => window.openModal?.('contactModal')}
                  className="group relative overflow-hidden flex items-center justify-center gap-3 min-w-0 sm:min-w-[220px] w-full sm:w-auto h-12 px-6 bg-[#c5a059] border-2 border-[#c5a059] hover:bg-[#b08e4a] text-white hover:text-white rounded-full shadow-lg shadow-[#c5a059]/30 hover:-translate-y-0.5 transition-all duration-300 active:scale-95 text-[11px] font-black uppercase tracking-[0.14em]"
                >
                  <i className="fas fa-paper-plane text-[14px]"></i>
                  <span className="whitespace-nowrap">Contactar Asesor</span>
                  <i className="fas fa-arrow-right text-[11px] group-hover:translate-x-1 transition-transform"></i>
                  <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-700 ease-in-out"></div>
                </button>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 pt-4">
                <div className="flex gap-0.5 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className="fas fa-star text-xs" />
                  ))}
                </div>
                <span className="text-[10px] font-black text-gray-500 dark:text-slate-450 uppercase tracking-widest leading-none">+500 estudiantes y clientes confían en Tech Home</span>
              </div>

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#a41e22] to-[#7f1d1d] text-white border border-[#c5a059]/40 shadow-md">
                <i className="fas fa-tag text-[#c5a059]"></i>
                <span className="text-[9px] font-black uppercase tracking-wider">Según proyecto (Evaluación personalizada)</span>
              </div>
            </div>

            {/* Right Column: Central orbits & floating cards with image */}
            <div className="w-full xl:w-[52%] relative min-h-[280px] sm:min-h-[360px] md:min-h-[400px] lg:min-h-[440px] xl:min-h-[480px] flex items-center justify-center -mb-4 sm:mb-0">
              <div className="absolute top-[50%] left-[54%] -translate-x-1/2 -translate-y-[50%] w-[44%] sm:w-[48%] md:w-[52%] lg:w-[58%] xl:w-[58%] 2xl:w-[62%] aspect-square z-0 pointer-events-none flex items-center justify-center">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-[#c5a059] origin-right scale-x-[1.15]">
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
                    src="/img/07_Servicios/soluciones/SolucionesPersonalizadas.png"
                    alt="Apps Android"
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
                        <p className="text-xs font-black text-gray-800 dark:text-white">{card.title}</p>
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
            <h2 className="text-4xl md:text-6xl font-black text-[#111827] dark:text-white mb-6">
              Nuestro proceso, <br />
              <span className="text-[#a41e22] relative inline-block">
                desarrollo ágil.
                <svg className="absolute w-full h-4 -bottom-2 left-0 z-[-1] text-[#c5a059]" viewBox="0 0 200 9" fill="none"><path d="M2.00025 6.99997C25.7509 4.50435 65.2536 2.07897 197.994 4.4151" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-800 dark:text-neutral-300 font-bold leading-relaxed max-w-2xl mx-auto text-center">
              Construimos y optimizamos tu plataforma digital a través de etapas ágiles y orientadas a resultados de alto nivel.
            </p>
          </div>

          <div className="relative py-8">
            {/* Horizontal Line connecting steps (hidden on mobile) */}
            <div className="hidden md:block absolute top-18 left-16 right-16 h-0.5 border-t-2 border-dashed border-[#a41e22]/20 z-0"></div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10 max-w-6xl mx-auto">
              {PROCESO.map((step, idx) => {
                const stepIcons = ['fa-magnifying-glass', 'fa-palette', 'fa-code', 'fa-rocket'];
                const stepColors = ['text-[#a41e22]', 'text-[#0d1b3e]', 'text-amber-500', 'text-[#a41e22]'];
                const stepBgs = ['bg-red-50', 'bg-slate-50', 'bg-amber-50', 'bg-red-50'];
                return (
                  <div key={idx} className="flex flex-col items-center text-center group">
                    {/* Bubble containing step number and icon */}
                    <div className="relative mb-6">
                      <div className={'w-20 h-20 rounded-[1.6rem] ' + stepBgs[idx] + ' dark:bg-[#1a0808] border-4 border-white dark:border-[#0a0a0a] ring-1 ring-gray-100 dark:ring-[#a41e22]/20 flex items-center justify-center text-3xl shadow-lg ' + stepColors[idx] + ' group-hover:scale-105 transition-transform duration-500'}>
                        <i className={'fa-solid ' + stepIcons[idx]}></i>
                        <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-[#a41e22] text-white flex items-center justify-center text-[11px] font-black border-4 border-white dark:border-[#0a0a0a]">
                          0{(idx + 1)}
                        </div>
                      </div>
                    </div>
                    
                    {/* Text */}
                    <h3 className="text-base font-black text-[#111827] dark:text-white mb-2 group-hover:text-[#a41e22] dark:group-hover:text-red-400 transition-colors uppercase tracking-tight">
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-slate-400 font-bold leading-relaxed max-w-xs">
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
      <section className="py-12 relative overflow-hidden">
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 text-center flex flex-col items-center justify-center">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0d1b3e] dark:text-white uppercase leading-tight mb-6 tracking-tighter">
                ¿Qué es este <span className="text-[#a41e22] relative inline-block px-1">Servicio Premium<svg className="absolute w-full h-2.5 -bottom-2 left-0 z-[-1] text-[#c5a059]" viewBox="0 0 100 9" fill="none"><path d="M2 6.5C15 4.5 45 2 98 4" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/></svg></span> y cómo ayuda a tu empresa?
              </h2>
              
              <div className="space-y-6 text-[#5c6f8f] dark:text-slate-355 font-bold leading-relaxed text-sm sm:text-base max-w-2xl text-justify">
                <p>
                  Diseñamos soluciones tecnológicas a medida para necesidades específicas, integrando inteligencia artificial y transformación digital completa para llevar tu operación al siguiente nivel.
                </p>
                <p>
                  <span className="font-black uppercase tracking-widest text-[#a41e22] dark:text-red-400">Incluye: </span>
                  Automatización, Digitalización, Optimización operativa, Inteligencia Artificial, Dashboards, Paneles, Herramientas internas, Apps móviles, Nube y Transformación digital.
                </p>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="bg-[#1e1e1e] rounded-3xl shadow-2xl border border-neutral-800 overflow-hidden text-left relative group">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#a41e22] to-[#c5a059]"></div>
                
                <div className="bg-[#252526] p-3 flex items-center justify-between border-b border-neutral-900">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-red-500"></span>
                    <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                    <span className="w-3 h-3 rounded-full bg-green-500"></span>
                    <span className="text-[10px] text-slate-400 font-bold ml-2 font-mono">MainActivity.kt</span>
                  </div>
                  <Terminal size={14} className="text-slate-500" />
                </div>

                <div className="p-5 font-mono text-[10.5px] sm:text-[11.5px] leading-relaxed text-slate-300 overflow-x-auto select-none space-y-1">
                  <div>package com.techhome.app</div>
                  <div>import android.os.Bundle</div>
                  <div>import androidx.activity.ComponentActivity</div>
                  <div className="mt-2">class MainActivity : ComponentActivity() &#123;</div>
                  <div className="pl-4">override fun onCreate(savedInstanceState: Bundle?) &#123;</div>
                  <div className="pl-8">super.onCreate(savedInstanceState)</div>
                  <div className="pl-8">setContent &#123;</div>
                  <div className="pl-12">AndroidAppTheme &#123;</div>
                  <div className="pl-16">MainDashboardScreen()</div>
                  <div className="pl-12">&#125;</div>
                  <div className="pl-8">&#125;</div>
                  <div className="pl-4">&#125;</div>
                  <div>&#125;</div>
                </div>

                <div className="absolute top-1/2 -right-4 translate-y-[-50%] flex flex-col gap-3 z-20">
                  <div className="w-12 h-12 bg-white dark:bg-neutral-900 border border-slate-100 dark:border-neutral-800 rounded-2xl flex items-center justify-center text-[#a41e22] shadow-lg"><Code size={18} /></div>
                  <div className="w-12 h-12 bg-[#a41e22] rounded-2xl flex items-center justify-center text-white shadow-lg"><Award size={18} className="text-[#c5a059]" /></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN ADICIONAL: DEMOSTRACIÓN DE SOFTWARE */}
      <RecorridoSoluciones />

      {/* NUEVA SECCIÓN DE COMPARATIVA */}
      <section id="comparativa" className="py-12 relative overflow-hidden flex flex-col sm:justify-center min-h-0">
        <div className="w-full max-w-[1200px] xl:max-w-[1400px] mx-auto px-4 relative z-10 flex flex-col items-center">
          
          <div className="text-center mb-6 max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#111827] dark:text-white leading-[1.1] mb-6">
              ¿Cómo accedes al mercado móvil hoy <br className="hidden md:block" />
              <span className="relative inline-block px-2">
                <span className="relative z-10 text-[#a41e22] dark:text-red-400">y cómo quieres innovar?</span>
                <svg className="absolute w-full h-4 -bottom-1 left-0 z-0 text-[#111827] dark:text-[#a41e22]/40" viewBox="0 0 200 9" fill="none">
                  <path d="M2.00025 6.99997C25.7509 4.50435 65.2536 2.07897 197.994 4.4151" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </h2>
            <p className="text-base sm:text-lg text-gray-500 dark:text-slate-400 font-medium leading-relaxed max-w-2xl mx-auto mb-6">
              Compara el rendimiento de un sitio móvil estándar frente al desarrollo de una App nativa robusta en Android.
            </p>
            
            {/* Toggle Switch */}
            <div className="flex justify-center">
              <div className="inline-flex p-2 bg-white dark:bg-[#0a0a0a] rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-gray-100 dark:border-[#a41e22]/20 relative z-50 ring-4 ring-gray-50 dark:ring-black/10 scale-[0.85] sm:scale-90 md:scale-100 origin-center mx-auto">
                <div className={`absolute top-2 bottom-2 w-[calc(50%-8px)] rounded-full transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] shadow-lg
                  ${activeCard === 'chaos' ? 'left-2 bg-gradient-to-r from-red-500 to-red-600' : 'left-1/2 bg-gradient-to-r from-[#a41e22] to-[#7f1d1d]'}`}>
                </div>

                <button
                  onClick={() => setActiveCard('chaos')}
                  className={`relative z-10 px-4 sm:px-8 md:px-10 py-2 sm:py-2.5 rounded-full text-[9px] sm:text-xs md:text-sm font-black uppercase tracking-wider transition-colors duration-300 flex items-center gap-1.5 sm:gap-3 min-w-0 sm:min-w-[9.5rem] md:min-w-[12rem] justify-center whitespace-nowrap
                  ${activeCard === 'chaos' ? 'text-white' : 'text-gray-500 hover:text-red-655'}`}
                >
                  <i className="fa-solid fa-triangle-exclamation"></i> Sin Software a Medida
                </button>
                <button
                  onClick={() => setActiveCard('control')}
                  className={`relative z-10 px-4 sm:px-8 md:px-10 py-2 sm:py-2.5 rounded-full text-[9px] sm:text-xs md:text-sm font-black uppercase tracking-wider transition-colors duration-300 flex items-center gap-1.5 sm:gap-3 min-w-0 sm:min-w-[9.5rem] md:min-w-[12rem] justify-center whitespace-nowrap
                  ${activeCard === 'control' ? 'text-white' : 'text-gray-500 hover:text-[#7f1d1d]'}`}
                >
                  <i className="fa-solid fa-circle-check"></i> Con Software a Medida
                </button>
              </div>
            </div>
          </div>

          <div className="relative w-full max-w-[1400px] grid grid-cols-1 md:grid-cols-2 items-stretch justify-center gap-3 md:gap-4 lg:gap-8 perspective-[2500px] py-2 sm:py-8 px-2 sm:px-4">
            
            {/* Chaos Card */}
            <div
              onClick={() => setActiveCard('chaos')}
              className={`w-full min-w-0 md:transition-all md:duration-500 md:ease-[cubic-bezier(0.34,1.56,0.64,1)] cursor-pointer group relative rounded-[2.25rem] sm:rounded-[2.5rem] ${
                activeCard === 'chaos' ? 'flex' : 'hidden md:flex'
              } flex-col
                ${activeCard === 'chaos'
                  ? 'md:shadow-[0_30px_80px_-35px_rgba(220,38,38,0.35)] md:blur-0 md:opacity-100 md:scale-100 md:translate-y-0'
                  : 'md:shadow-[0_18px_45px_-28px_rgba(15,23,42,0.2)] md:hover:shadow-[0_22px_55px_-30px_rgba(15,23,42,0.28)] md:blur-[6px] md:opacity-40 md:scale-[0.93] md:translate-y-3'
                }`}
            >
              <div className={`bg-white dark:bg-[#0a0a0a] rounded-[2.25rem] sm:rounded-[2.5rem] w-full h-full md:min-h-[560px] lg:min-h-[600px] relative overflow-hidden flex flex-col border border-red-50 dark:border-[#a41e22]/10 shadow-[0_20px_60px_-15px_rgba(239,68,68,0.15)] transition-all duration-500 pb-3 sm:pb-4 md:pb-5
                ${activeCard === 'chaos' ? 'ring-4 ring-red-50 dark:ring-[#a41e22]/10' : ''}`}>
                
                <div className="bg-red-50/50 dark:bg-black/30 px-3 py-4 sm:px-4 sm:py-5 md:px-5 md:py-6 border-b border-red-50 dark:border-[#a41e22]/10 relative overflow-hidden">
                  <div className="relative z-10 flex flex-col gap-3">
                    <div className="flex justify-center">
                      <span className="inline-flex items-center gap-2 px-2.5 sm:px-3 py-1 bg-white dark:bg-[#0a0a0a] text-red-500 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-widest border border-red-100 dark:border-[#a41e22]/20 shadow-sm">
                        Sitio Web Móvil
                      </span>
                    </div>
                    <div className="flex items-center justify-center gap-3">
                      <h3 className="text-xl sm:text-2xl font-black text-gray-800 dark:text-white leading-none">
                        Sin Presencia Android
                      </h3>
                    </div>
                    <p className="text-center text-[11px] sm:text-sm text-red-500/80 font-semibold max-w-xl mx-auto">
                      Páginas web lentas, imposibilidad de trabajar sin conexión y sin acceso a sensores.
                    </p>
                  </div>
                </div>

                <div className="p-2 sm:p-3 md:p-4 relative flex-1 flex flex-col rounded-[2rem] sm:rounded-[2.25rem] overflow-hidden">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 relative z-10 w-full h-full content-start">
                    {[
                      { title: "Lag de Carga", icon: "fa-hourglass-half", desc: "El navegador móvil tarda en cargar" },
                      { title: "Sin Modo Offline", icon: "fa-wifi", desc: "Se cuelga al perder señal" },
                      { title: "No Sigue Material UI", icon: "fa-palette", desc: "Interfaz confusa y tosca" },
                      { title: "Consumo de Batería", icon: "fa-battery-empty", desc: "Excesivo por renderizado web" },
                      { title: "Sin Persistencia Local", icon: "fa-database", desc: "Pérdida de datos ingresados" },
                      { title: "Sin Notificaciones", icon: "fa-bell-slash", desc: "Nula retención del cliente" }
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="flex flex-row items-center justify-center p-2 sm:p-5 gap-2 sm:gap-5 rounded-xl sm:rounded-3xl bg-white dark:bg-black/35 border border-gray-100 dark:border-[#a41e22]/10 shadow-sm hover:bg-red-50 dark:hover:bg-[#a41e22]/5 transition-all duration-200 hover:-translate-y-1 hover:shadow-md group/item relative overflow-hidden h-full text-left"
                      >
                        <div className="w-9 h-9 sm:w-14 sm:h-14 rounded-2xl bg-gray-50 dark:bg-black/40 border border-gray-100 dark:border-white/5 flex items-center justify-center text-red-300 text-base sm:text-2xl group-hover/item:bg-white dark:group-hover/item:bg-[#0a0a0a] group-hover/item:text-red-500 transition-colors relative shrink-0">
                          <i className={`fa-solid ${item.icon}`}></i>
                          <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-red-100 dark:bg-red-950 border border-white dark:border-[#0a0a0a] flex items-center justify-center">
                            <i className="fa-solid fa-xmark text-[10px] text-red-500"></i>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-700 dark:text-white text-[11px] sm:text-base mb-1 leading-tight">{item.title}</h4>
                          <p className="text-[9px] sm:text-sm text-gray-500 dark:text-slate-400 font-medium leading-tight">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>

            {/* Control Card */}
            <div
              onClick={() => setActiveCard('control')}
              className={`w-full min-w-0 md:transition-all md:duration-500 md:ease-[cubic-bezier(0.34,1.56,0.64,1)] cursor-pointer group relative rounded-[2.25rem] sm:rounded-[2.5rem] ${
                activeCard === 'control' ? 'flex' : 'hidden md:flex'
              } flex-col
                ${activeCard === 'control'
                  ? 'md:shadow-[0_30px_80px_-35px_rgba(197,160,89,0.35)] md:blur-0 md:opacity-100 md:scale-100 md:translate-y-0'
                  : 'md:shadow-[0_18px_45px_-28px_rgba(15,23,42,0.2)] md:hover:shadow-[0_22px_55px_-30px_rgba(15,23,42,0.28)] md:blur-[6px] md:opacity-40 md:scale-[0.93] md:translate-y-3'
                }`}
            >
              <div className={`bg-gradient-to-br from-[#a41e22] to-[#7f1d1d] w-full h-full md:min-h-[560px] lg:min-h-[600px] relative overflow-hidden flex flex-col rounded-[2.25rem] sm:rounded-[2.5rem] shadow-2xl border border-white/20 transition-all duration-500 pb-3 sm:pb-4 md:pb-5
                ${activeCard === 'control' ? 'ring-4 ring-[#c5a059]/30' : ''}`}>
                
                <div className="bg-white/5 backdrop-blur-md px-3 py-4 sm:px-4 sm:py-5 md:px-5 md:py-6 border-b border-white/10 relative z-20 overflow-hidden">
                  <div className="relative z-10 flex flex-col gap-3">
                    <div className="flex justify-center">
                      <span className="inline-flex items-center gap-2 px-2.5 sm:px-3 py-1 bg-[#111827] text-[#c5a059] rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-widest shadow-[0_0_20px_rgba(197,160,89,0.3)] animate-pulse-slow">
                        Android Nativo Premium
                      </span>
                    </div>
                    <div className="flex items-center justify-center gap-3">
                      <h3 className="text-xl sm:text-2xl font-black text-white leading-none">
                        App Android Tech Home
                      </h3>
                    </div>
                    <p className="text-center text-[11px] sm:text-sm text-blue-50/90 font-semibold max-w-xl mx-auto">
                      Código nativo Kotlin, Jetpack Compose e inicio de sesión por huella dactilar.
                    </p>
                  </div>
                </div>

                <div className="p-2 sm:p-3 md:p-4 relative flex-1 flex flex-col rounded-[2rem] sm:rounded-[2.25rem] overflow-hidden">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 relative z-10 w-full h-full content-start">
                    {[
                      { title: "Rendimiento Kotlin", icon: "fa-gauge-high", desc: "Fluidez ultra-rápida nativa" },
                      { title: "Soporte Offline Completo", icon: "fa-wifi", desc: "Sincroniza al recuperar señal" },
                      { title: "Diseño Material 3", icon: "fa-wand-magic-sparkles", desc: "UX oficial de Google" },
                      { title: "Bajo Consumo de Batería", icon: "fa-battery-full", desc: "Optimización a bajo nivel" },
                      { title: "Room Local Database", icon: "fa-database", desc: "Datos seguros guardados localmente" },
                      { title: "Mensajes Push Activos", icon: "fa-bell", desc: "Reenganche automático" }
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="flex flex-row items-center justify-center p-2 sm:p-5 gap-2 sm:gap-5 rounded-xl sm:rounded-3xl bg-white/10 border border-white/5 shadow-lg backdrop-blur-md hover:bg-white/20 hover:scale-105 transition-all duration-300 hover:shadow-[0_0_25px_rgba(197,160,89,0.3)] group/item cursor-default relative h-full text-left"
                      >
                        <div className="w-9 h-9 sm:w-14 sm:h-14 rounded-2xl bg-[#111827] flex items-center justify-center text-[#c5a059] text-base sm:text-2xl shadow-lg group-hover/item:rotate-6 transition-transform relative shrink-0">
                          <i className={`fa-solid ${item.icon}`}></i>
                          <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-white border border-[#111827] flex items-center justify-center shadow-sm">
                            <i className="fa-solid fa-check text-[10px] text-[#a41e22]"></i>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-bold text-white text-[11px] sm:text-base mb-1 leading-tight">{item.title}</h4>
                          <p className="text-[9px] sm:text-sm text-blue-50 font-medium leading-tight">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECCIÓN 5: TESTIMONIOS */}
      <section className="py-12 relative overflow-hidden reveal">
        <div className="container mx-auto px-6 max-w-4xl text-center relative z-10">
          
          <h2 className="text-4xl md:text-6xl font-black text-[#111827] dark:text-white mb-6">
            Casos reales, <br />
            <span className="text-[#a41e22] relative inline-block">
              resultados comprobados.
              <svg className="absolute w-full h-4 -bottom-2 left-0 z-[-1] text-[#c5a059]" viewBox="0 0 200 9" fill="none"><path d="M2.00025 6.99997C25.7509 4.50435 65.2536 2.07897 197.994 4.4151" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-800 dark:text-neutral-300 font-bold leading-relaxed max-w-2xl mx-auto mb-10 text-center">
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

export default SolucionesMedida;
