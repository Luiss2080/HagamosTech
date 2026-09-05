import React, { useState, useEffect, useRef } from 'react';
import FondoTech from '../../../components/fondos/FondoTech';

const WHATSAPP_URL = 'https://wa.me/59161320004';

// Mapeador de iconos dinámicos para las características
const getIconForInclude = (text) => {
  const t = text.toLowerCase().trim();
  if (t.includes('pdf') || t.includes('guía') || t.includes('digital') || t.includes('diapositiva') || t.includes('documento')) return 'fa-file-pdf';
  if (t.includes('video')) return 'fa-video';
  if (t.includes('proyecto')) return 'fa-diagram-project';
  if (t.includes('código') || t.includes('software') || t.includes('algoritmo') || t.includes('programación')) return 'fa-code';
  if (t.includes('soporte') || t.includes('mentoría')) return 'fa-headset';
  if (t.includes('simulación')) return 'fa-vr-cardboard';
  if (t.includes('ejercicio')) return 'fa-gamepad';
  if (t.includes('diseño') || t.includes('modelo')) return 'fa-bezier-curve';
  if (t.includes('certificado') || t.includes('certificación') || t.includes('trofeo')) return 'fa-certificate';
  if (t.includes('kit') || t.includes('guías')) return 'fa-box-open';
  if (t.includes('material') || t.includes('herramienta') || t.includes('circuito')) return 'fa-screwdriver-wrench';
  return 'fa-circle-check';
};

// Datos de Novedades libres de robótica y alineados al contexto
const noticias = [
  {
    id: 'n1',
    title: 'Plataforma de Mentorías',
    desc: 'Lanzamos un nuevo entorno web interactivo para agendar sesiones uno a uno en Frontend y Backend.',
    category: 'Lanzamiento',
    status: 'Activo',
    date: '25 de Junio, 2026',
    img: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=600&auto=format&fit=crop&q=60',
    icon: 'fa-globe',
    specs: {
      col1: { label: 'Soporte', value: '1 a 1', icon: 'fa-user-tie' },
      col2: { label: 'Temas', value: 'JS / Python', icon: 'fa-code' },
      col3: { label: 'Acceso', value: '24/7 Portal', icon: 'fa-server' }
    },
    includes: ['Mentoría', 'Código', 'Soporte'],
    link: '/contactanos'
  },
  {
    id: 'n2',
    title: 'Webinar de IA Aplicada',
    desc: 'Participa en nuestro webinar práctico sobre APIs de OpenAI, Gemini y creación de Chatbots.',
    category: 'Webinar',
    status: 'Registro',
    date: '20 de Junio, 2026',
    img: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?w=600&auto=format&fit=crop&q=60',
    icon: 'fa-brain',
    specs: {
      col1: { label: 'Duración', value: '4 Sesiones', icon: 'fa-clock' },
      col2: { label: 'Stack', value: 'Gemini API', icon: 'fa-robot' },
      col3: { label: 'Modalidad', value: 'Online', icon: 'fa-laptop' }
    },
    includes: ['Código', 'Video', 'Certificado'],
    link: '/contactanos'
  },
  {
    id: 'n3',
    title: 'Convenio de Digitalización',
    desc: 'Firmamos alianzas para digitalizar más de 20 emprendimientos locales con catálogos web y contacto directo a WhatsApp.',
    category: 'Alianza',
    status: 'Éxito',
    date: '15 de Junio, 2026',
    img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=60',
    icon: 'fa-handshake',
    specs: {
      col1: { label: 'Negocios', value: '20+ PYMES', icon: 'fa-briefcase' },
      col2: { label: 'Solución', value: 'Catálogos', icon: 'fa-list-check' },
      col3: { label: 'Línea', value: 'WhatsApp', icon: 'fa-message' }
    },
    includes: ['Proyecto', 'Diseño', 'Soporte'],
    link: '/contactanos'
  },
  {
    id: 'n4',
    title: 'Guías de Lógica y Código',
    desc: 'Presentamos oficialmente nuestros cuadernos de trabajo interactivos y diapositivas de lógica para colegios.',
    category: 'Recursos',
    status: 'Nuevo',
    date: '10 de Junio, 2026',
    img: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&auto=format&fit=crop&q=60',
    icon: 'fa-book',
    specs: {
      col1: { label: 'Formato', value: 'PDF / Slides', icon: 'fa-file-pdf' },
      col2: { label: 'Temario', value: 'Algoritmos', icon: 'fa-diagram-project' },
      col3: { label: 'Nivel', value: 'Primaria/Sec', icon: 'fa-graduation-cap' }
    },
    includes: ['Guías', 'PDF', 'Material'],
    link: '/contactanos'
  },
  {
    id: 'n5',
    title: 'Webinars de Automatización',
    desc: 'Ciclo de charlas gratuitas sobre cómo automatizar tareas repetitivas de oficina y bases de datos usando Python.',
    category: 'Webinar',
    status: 'Libre',
    date: '05 de Junio, 2026',
    img: 'https://images.unsplash.com/photo-1600132806608-231446b2e7af?w=600&auto=format&fit=crop&q=60',
    icon: 'fa-gears',
    specs: {
      col1: { label: 'Acceso', value: 'Libre', icon: 'fa-circle-play' },
      col2: { label: 'Tema', value: 'Python Scripts', icon: 'fa-code' },
      col3: { label: 'Grabación', value: 'Incluida', icon: 'fa-video' }
    },
    includes: ['Código', 'Video', 'Documento'],
    link: '/contactanos'
  }
];

// Componente Tarjeta de Noticia (Mismo diseño exacto que Servicios)
const NewsCard = ({ noticia, icon }) => {
  return (
    <div className="group relative bg-[#111111] border border-white/10 rounded-[2.2rem] shadow-2xl hover:shadow-[0_15px_40px_rgba(163,230,53,0.12)] hover:border-[#A3E635]/40 transition-all duration-500 transform hover:-translate-y-2 overflow-hidden flex flex-col h-full ring-0 hover:ring-4 hover:ring-[#A3E635]/10">
      
      {/* Línea decorativa superior */}
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#A3E635] via-[#84CC16] to-[#A3E635] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 z-50"></div>

      {/* Cabecera con Imagen */}
      <div className="relative h-48 sm:h-52 w-full overflow-hidden rounded-t-[2.2rem] border-b border-white/5 bg-[#050505]">
        <img
          src={noticia.img}
          alt={noticia.title}
          className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600&auto=format&fit=crop&q=60';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-80"></div>

        {/* Badge Categoría */}
        <div className="absolute top-4 left-4 z-20">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#A3E635] text-[#0A0A0A] text-[9px] font-black uppercase tracking-widest shadow-md">
            {noticia.category}
          </span>
        </div>

        {/* Badge Estado */}
        <div className="absolute top-4 right-4 z-20">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[9px] font-black uppercase tracking-widest text-white shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
            {noticia.status}
          </span>
        </div>
      </div>

      {/* Cuerpo - Centrado */}
      <div className="p-6 pt-8 flex-1 flex flex-col items-center text-center relative bg-[#111111]">
        
        {/* Icono flotante - Centrado */}
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-2xl bg-[#A3E635] border-[#111111] ring-2 ring-[#A3E635]/45 shadow-xl flex items-center justify-center border-4 z-30 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
          <i className={`fa-solid ${noticia.icon || icon} text-lg text-[#0A0A0A] drop-shadow-sm`}></i>
        </div>

        {/* Pill de Info - Centrado */}
        <div className="mb-3 flex justify-center w-full">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-md text-[9px] font-black uppercase tracking-[0.14em] bg-[#A3E635]/10 text-[#A3E635] border border-[#A3E635]/20">
            NOVEDAD
          </span>
        </div>

        {/* Título de Noticia - Centrado */}
        <div className="mb-3 flex flex-col items-center">
          <h3 className="text-xl font-black text-white group-hover:text-[#A3E635] transition-colors leading-tight">
            {noticia.title}
          </h3>
          <div className="w-10 h-[2.5px] bg-[#A3E635] rounded-full mt-2 group-hover:w-16 transition-all duration-300"></div>
        </div>

        {/* Descripción corta - Centrado */}
        <p className="text-xs text-slate-400 leading-relaxed mb-4 min-h-[3rem] font-medium">
          {noticia.desc}
        </p>

        {/* Ficha técnica con 3 características - Centrado */}
        <div className="grid grid-cols-3 gap-1 py-2.5 border-y border-white/5 mb-5 w-full rounded-2xl bg-white/[0.02]">
          <div className="flex flex-col items-center justify-center">
            <div className="w-6 h-6 rounded-full bg-[#A3E635]/15 text-[#84CC16] flex items-center justify-center text-[10px] shadow-inner mb-1">
              <i className={`fa-solid ${noticia.specs.col1.icon} text-[10px]`}></i>
            </div>
            <span className="text-[7.5px] text-slate-500 font-black uppercase tracking-wider leading-tight">{noticia.specs.col1.label}</span>
            <span className="text-[10px] font-black text-white mt-0.5 leading-tight">{noticia.specs.col1.value}</span>
          </div>
          <div className="border-x border-white/10 flex flex-col items-center justify-center">
            <div className="w-6 h-6 rounded-full bg-[#A3E635]/15 text-[#84CC16] flex items-center justify-center text-[10px] shadow-inner mb-1">
              <i className={`fa-solid ${noticia.specs.col2.icon} text-[10px]`}></i>
            </div>
            <span className="text-[7.5px] text-slate-500 font-black uppercase tracking-wider leading-tight">{noticia.specs.col2.label}</span>
            <span className="text-[10px] font-black text-white mt-0.5 leading-tight">{noticia.specs.col2.value}</span>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="w-6 h-6 rounded-full bg-[#A3E635]/15 text-[#84CC16] flex items-center justify-center text-[10px] shadow-inner mb-1">
              <i className={`fa-solid ${noticia.specs.col3.icon} text-[10px]`}></i>
            </div>
            <span className="text-[7.5px] text-slate-500 font-black uppercase tracking-wider leading-tight">{noticia.specs.col3.label}</span>
            <span className="text-[10px] font-black text-white mt-0.5 leading-tight">{noticia.specs.col3.value}</span>
          </div>
        </div>

        {/* Incluye (Badges/Pills) - Centrado */}
        <div className="mb-5 w-full flex justify-center">
          <div className="flex items-center justify-center gap-1.5 flex-wrap">
            {noticia.includes.map((inc, i) => (
              <span key={i} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[9px] font-bold border bg-[#151515] border-white/5 text-slate-350">
                <i className="fa-solid fa-check text-[#84CC16] text-[8px]"></i>
                <i className={`fa-solid ${getIconForInclude(inc)} text-[9px]`}></i>
                {inc}
              </span>
            ))}
          </div>
        </div>

        {/* Fila inferior de Fecha & CTAs */}
        <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between gap-3 w-full">
          <div className="flex flex-col items-start">
            <span className="text-[7.5px] text-slate-500 font-black uppercase tracking-widest leading-none">FECHA</span>
            <span className="text-[10px] font-black mt-1 leading-none text-white">{noticia.date}</span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={`${WHATSAPP_URL}?text=${encodeURIComponent(`Hola, quiero saber más sobre: ${noticia.title}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-[9px] font-black uppercase tracking-wider transition-all duration-300 cursor-pointer shadow-md bg-[#25D366] hover:bg-[#22C55E] text-white"
            >
              <i className="fab fa-whatsapp text-[12px]"></i>
              Saber más
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

// Componente Principal
const NovedadesCarrusel = ({ icon = 'fa-newspaper' }) => {
  const [currentIndex, setCurrentIndex] = useState(noticias.length);
  const [visibleCards, setVisibleCards] = useState(4);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setVisibleCards(1);
      } else if (width < 1024) {
        setVisibleCards(2);
      } else {
        setVisibleCards(4);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const N = noticias.length;
  const tripledNoticias = [...noticias, ...noticias, ...noticias];

  useEffect(() => {
    if (isPaused || N <= visibleCards) return;
    const interval = setInterval(() => {
      setTransitionEnabled(true);
      setCurrentIndex((prev) => prev + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, [isPaused, N, visibleCards]);

  const handleTransitionEnd = () => {
    if (currentIndex >= N * 2) {
      setTransitionEnabled(false);
      setCurrentIndex(currentIndex - N);
    } else if (currentIndex < N) {
      setTransitionEnabled(false);
      setCurrentIndex(currentIndex + N);
    }
  };

  useEffect(() => {
    if (!transitionEnabled) {
      const timer = setTimeout(() => {
        setTransitionEnabled(true);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [transitionEnabled]);

  const handlePrev = () => {
    setTransitionEnabled(true);
    setCurrentIndex((prev) => prev - 1);
  };

  const handleNext = () => {
    setTransitionEnabled(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
  };

  const canNavigate = N > visibleCards;
  const cardPercent = 100 / tripledNoticias.length;
  const trackWidthPercent = (tripledNoticias.length * 100) / visibleCards;

  return (
    <section id="noticias" className="py-16 relative overflow-hidden bg-[#050505] border-t border-white/5">
      <FondoTech hideWaves={true} />

      <div className="container mx-auto px-4 lg:px-6 relative z-10 text-white">
        
        <div className="text-center mb-4 max-w-3xl mx-auto">
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-6 leading-tight">
            Últimas{' '}
            <span className="relative inline-block px-2 text-[#A3E635]">
              novedades y noticias
              <svg className="absolute w-full h-3 -bottom-1 left-0 z-[-1] text-[#A3E635]/60 opacity-80" viewBox="0 0 200 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.00025 6.99997C25.7509 4.50435 65.2536 2.07897 197.994 4.4151" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </h2>
          <p className="text-lg text-slate-400 font-medium leading-relaxed">
            Mantente al tanto de nuestros eventos, lanzamientos de productos, convenios educativos y los logros más recientes de nuestra comunidad.
          </p>
        </div>

        <div 
          className="relative w-full overflow-hidden py-4 px-1 sm:px-4"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div 
            className="w-full relative px-2 sm:px-8"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="overflow-hidden py-4">
              <div
                className={`flex items-stretch ${transitionEnabled ? 'transition-transform duration-500 ease-in-out' : ''}`}
                onTransitionEnd={handleTransitionEnd}
                style={{ 
                  width: `${trackWidthPercent}%`,
                  transform: `translateX(-${currentIndex * cardPercent}%)`
                }}
              >
                {tripledNoticias.map((noticia, idx) => (
                  <div
                    key={`${noticia.id}-${idx}`}
                    style={{ width: `${cardPercent}%` }}
                    className="px-3 sm:px-4 h-full"
                  >
                    <NewsCard noticia={noticia} icon={icon} />
                  </div>
                ))}
              </div>
            </div>

            {canNavigate && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-11 h-11 rounded-2xl bg-black/80 border border-white/10 flex items-center justify-center text-white transition-all z-20 cursor-pointer hover:scale-105 hover:bg-[#A3E635] hover:text-[#0A0A0A] hover:border-transparent opacity-100"
                  aria-label="Anterior"
                >
                  <i className="fa-solid fa-chevron-left text-xs"></i>
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-0 top-1/2 -translate-y-1/2 w-11 h-11 rounded-2xl bg-black/80 border border-white/10 flex items-center justify-center text-white transition-all z-20 cursor-pointer hover:scale-105 hover:bg-[#A3E635] hover:text-[#0A0A0A] hover:border-transparent opacity-100"
                  aria-label="Siguiente"
                >
                  <i className="fa-solid fa-chevron-right text-xs"></i>
                </button>
              </>
            )}
          </div>

          {canNavigate && (
            <div className="flex justify-center items-center gap-2 mt-6">
              {Array.from({ length: N }).map((_, idx) => {
                const activeIdx = (currentIndex - N + N) % N;
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      setTransitionEnabled(true);
                      setCurrentIndex(N + idx);
                    }}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      activeIdx === idx
                        ? 'w-7 bg-[#A3E635]'
                        : 'w-2 bg-neutral-800 hover:bg-neutral-700'
                    }`}
                    aria-label={`Ir al slide ${idx + 1}`}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default NovedadesCarrusel;
