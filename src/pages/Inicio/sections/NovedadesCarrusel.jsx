import React, { useState, useEffect, useRef } from 'react';
import CircuitBackground from '../../../components/fondos/FondoParticulas';

const WHATSAPP_URL = 'https://wa.me/59161320004';

// Mapeador de iconos dinámicos para las características del includes de cada tarjeta
const getIconForInclude = (text) => {
  const t = text.toLowerCase().trim();
  if (t.includes('pdf') || t.includes('guía') || t.includes('digital') || t.includes('diapositiva') || t.includes('documento')) return 'fa-file-pdf';
  if (t.includes('video')) return 'fa-video';
  if (t.includes('proyecto')) return 'fa-diagram-project';
  if (t.includes('código') || t.includes('software') || t.includes('algoritmo') || t.includes('programación')) return 'fa-code';
  if (t.includes('soporte') || t.includes('mentoría')) return 'fa-headset';
  if (t.includes('simulación')) return 'fa-vr-cardboard';
  if (t.includes('ejercicio') || t.includes('pista')) return 'fa-gamepad';
  if (t.includes('diseño') || t.includes('modelo') || t.includes('cad')) return 'fa-bezier-curve';
  if (t.includes('certificado') || t.includes('certificación') || t.includes('trofeo') || t.includes('beca')) return 'fa-certificate';
  if (t.includes('kit')) return 'fa-box-open';
  if (t.includes('material') || t.includes('herramienta') || t.includes('cautín') || t.includes('estaño') || t.includes('placa') || t.includes('pcb') || t.includes('filamento')) return 'fa-screwdriver-wrench';
  if (t.includes('sensor')) return 'fa-microchip';
  if (t.includes('servo') || t.includes('motor')) return 'fa-gear';
  if (t.includes('robótica') || t.includes('robot') || t.includes('eco')) return 'fa-robot';
  if (t.includes('electrónica') || t.includes('componente') || t.includes('placa') || t.includes('solar') || t.includes('litio') || t.includes('batería') || t.includes('regulador') || t.includes('esp32') || t.includes('circuito')) return 'fa-bolt';
  if (t.includes('impresión')) return 'fa-print';
  if (t.includes('drone')) return 'fa-plane';
  if (t.includes('capacitación') || t.includes('aula') || t.includes('escuela')) return 'fa-chalkboard-user';
  return 'fa-circle-check';
};

// Datos de Novedades / Noticias de Tech Home Bolivia
const noticias = [
  {
    id: 'n1',
    title: 'Nueva Sucursal en Santa Cruz',
    desc: 'Inauguramos una moderna sede equipada con laboratorios de robótica y tecnología de última generación para todas las edades.',
    category: 'Sucursal',
    status: 'Nuevo',
    date: '25 de Junio, 2026',
    img: '/img/13_Noticias/06_noticia-archivo1.jpg',
    icon: 'fa-building-circle-check',
    specs: {
      col1: { label: 'Sede', value: 'Equipamiento Pro', icon: 'fa-map-location-dot' },
      col2: { label: 'Capacidad', value: '50+ alumnos', icon: 'fa-users' },
      col3: { label: 'Tecnología', value: 'Impresión 3D', icon: 'fa-microchip' }
    },
    includes: ['Robótica', 'Electrónica', 'Programación'],
    link: '/contactanos'
  },
  {
    id: 'n2',
    title: 'Kit de Robótica STEAM 2026',
    desc: 'Presentamos nuestro kit educativo oficial diseñado para competiciones de robótica, proyectos inteligentes y aprendizaje de IA.',
    category: 'Lanzamiento',
    status: 'Oficial',
    date: '20 de Junio, 2026',
    img: '/img/13_Noticias/07_noticia-archivo2.jpg',
    icon: 'fa-box-open',
    specs: {
      col1: { label: 'Componentes', value: '350+ piezas', icon: 'fa-puzzle-piece' },
      col2: { label: 'Conexión', value: 'Bluetooth & App', icon: 'fa-mobile-screen' },
      col3: { label: 'Edades', value: '+8 años', icon: 'fa-graduation-cap' }
    },
    includes: ['Sensores', 'Servomotores', 'Guía Digital'],
    link: '/libros-thb'
  },
  {
    id: 'n3',
    title: 'Convenio con 15 Colegios',
    desc: 'Firmamos alianzas estratégicas para implementar aulas virtuales personalizadas bajo plataforma LMS Moodle 4.5.',
    category: 'Alianza',
    status: 'Éxito',
    date: '15 de Junio, 2026',
    img: '/img/13_Noticias/08_noticia-archivo3.jpg',
    icon: 'fa-handshake',
    specs: {
      col1: { label: 'Convenios', value: '15+ Colegios', icon: 'fa-school' },
      col2: { label: 'Aulas', value: 'LMS Moodle', icon: 'fa-server' },
      col3: { label: 'Alumnos', value: '+5000 activos', icon: 'fa-users-line' }
    },
    includes: ['Capacitación', 'Soporte 24/7', 'Certificación'],
    link: '/contactanos'
  },
  {
    id: 'n4',
    title: 'Campeones Nacionales STEAM',
    desc: 'Estudiantes de nuestro Club de Innovación obtienen medalla de oro en la competencia nacional de robótica ecológica.',
    category: 'Logro',
    status: 'Victoria',
    date: '10 de Junio, 2026',
    img: '/img/13_Noticias/09_noticia-archivo4.jpg',
    icon: 'fa-trophy',
    specs: {
      col1: { label: 'Torneo', value: 'STEAM 2026', icon: 'fa-award' },
      col2: { label: 'Proyecto', value: 'EcoBot 2.0', icon: 'fa-robot' },
      col3: { label: 'Premio', value: 'Medalla de Oro', icon: 'fa-medal' }
    },
    includes: ['Trofeo Nacional', 'Beca de Innovación', 'Kits Avanzados'],
    link: '/contactanos'
  },
  {
    id: 'n5',
    title: 'Talleres Vacacionales de IA',
    desc: 'Ciclo vacacional práctico en Machine Learning, programación en Python, y creación de Chatbots con Inteligencia Artificial.',
    category: 'Talleres',
    status: 'Inscripción',
    date: '05 de Junio, 2026',
    img: '/img/13_Noticias/10_noticia-archivo5.jpeg',
    icon: 'fa-laptop-code',
    specs: {
      col1: { label: 'Duración', value: '4 Semanas', icon: 'fa-clock' },
      col2: { label: 'Contenido', value: 'Python & IA', icon: 'fa-code' },
      col3: { label: 'Proyecto', value: 'Agente Inteligente', icon: 'fa-brain' }
    },
    includes: ['Código Fuente', 'Certificado Oficial', 'Licencias Pro'],
    link: '/cursos-thb'
  }
];

// Componente Tarjeta de Noticia Individual
const NewsCard = ({ noticia, icon }) => {
  return (
    <div
      className="group relative bg-white dark:bg-[#0a0a0a] rounded-[2rem] shadow-lg shadow-gray-200/50 dark:shadow-black/50 hover:shadow-2xl hover:shadow-lime-950/15 transition-all duration-500 transform hover:-translate-y-2 overflow-hidden flex flex-col h-full border-2 border-[#bef264] dark:border-[#A3E635]/20 hover:border-[#84CC16] dark:hover:border-lime-500 ring-0 hover:ring-4 hover:ring-[#A3E635]/10"
    >
      {/* Línea decorativa superior reactiva al hover */}
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#A3E635] via-[#84CC16] to-[#A3E635] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 z-50"></div>

      {/* Badges flotantes sobre la cabecera */}
      <div className="absolute top-3 left-3 z-20">
        <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full bg-[#A3E635] text-white text-[9px] font-black uppercase tracking-widest shadow-md leading-none">
          {noticia.category}
        </span>
      </div>

      <div className="absolute top-3 right-3 z-20">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-black/45 backdrop-blur-md border border-white/20 text-[9px] font-black uppercase tracking-widest text-white shadow-sm leading-none">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
          {noticia.status}
        </span>
      </div>

      {/* Cabecera con imagen a tamaño completo (Full Bleed) */}
      <div className="relative h-48 sm:h-56 w-full overflow-hidden rounded-t-[2rem] border-b border-[#bef264] dark:border-[#A3E635]/15">
        <img
          src={noticia.img}
          alt={noticia.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          onError={(e) => {
            e.target.src = '/img/04_Banners/01_banner-hero.jpeg'; // fallback
          }}
        />
        {/* Degradado sutil en la parte inferior para integrar con el cuerpo */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/50 via-transparent to-transparent opacity-60"></div>
      </div>

      {/* Cuerpo de la tarjeta */}
      <div className="p-4 pt-4 flex-1 flex flex-col relative bg-gradient-to-b from-white dark:from-[#0a0a0a] via-[#fff5f5]/30 dark:via-[#0a0a0a] to-[#fef2f2]/40 dark:to-[#0a0a0a] rounded-b-[2rem]">
        
        {/* Cuadrícula de fondo */}
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04] pointer-events-none" style={{
          backgroundImage: 'radial-gradient(#A3E635 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}></div>

        {/* Icono flotante */}
        <div className="absolute -top-5 left-5 w-10 h-10 rounded-2xl bg-[#84CC16] dark:bg-[#A3E635] shadow-xl shadow-gray-900/20 flex items-center justify-center border-4 border-white dark:border-[#0a0a0a] ring-2 ring-[#84CC16]/40 dark:ring-[#A3E635]/40 z-30 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
          <i className={`fa-solid ${noticia.icon || icon} text-base text-[#111827] dark:text-white drop-shadow-sm`}></i>
        </div>

        {/* Punto parpadeante de estatus */}
        <div className="absolute top-3 right-4 flex items-center gap-1">
          <span className="flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-[#84CC16] dark:bg-lime-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#84CC16] dark:bg-lime-500"></span>
          </span>
        </div>

        {/* Chip de Fecha */}
        <div className="mb-1 flex justify-center">
          <span className="inline-flex items-center px-3 py-1 rounded-full border border-[#84CC16]/30 bg-lime-50/20 dark:bg-lime-950/10 text-[9px] font-black uppercase tracking-widest text-[#3f6212] dark:text-lime-400 shadow-sm leading-none">
            • {noticia.date} •
          </span>
        </div>

        {/* Título de Noticia */}
        <div className="relative flex flex-col items-center mb-0.5">
          <h3 className="text-sm sm:text-base font-black text-[#111827] dark:text-white group-hover:text-[#A3E635] dark:group-hover:text-lime-400 transition-colors leading-tight text-center px-2 min-h-[1.75rem] flex items-center">
            {noticia.title}
          </h3>
          {/* Línea decorativa roja y diamante dorado */}
          <div className="w-20 h-[2px] bg-[#A3E635]/70 dark:bg-lime-500/70 rounded-full relative mt-1 mb-0.5">
            <div className="absolute -top-[3px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-[#84CC16] rotate-45 border border-white dark:border-[#0a0a0a]"></div>
          </div>
        </div>

        {/* Descripción didáctica */}
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-1.5 text-center px-4 min-h-[1.5rem] font-medium">
          {noticia.desc}
        </p>

        {/* Ficha técnica con 3 características (Con recuadro/bordes) */}
        <div className="grid grid-cols-3 gap-1 py-1 border-y border-lime-100 dark:border-[#A3E635]/15 my-1 text-center bg-lime-50/20 dark:bg-neutral-900/10 rounded-xl relative z-10">
          <div className="flex flex-col items-center justify-center">
            <div className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 dark:bg-blue-950/20 dark:text-blue-400 flex items-center justify-center mb-1 shadow-inner border border-blue-100 dark:border-blue-900/20">
              <i className={`fa-solid ${noticia.specs.col1.icon} text-[11px]`}></i>
            </div>
            <span className="text-[8px] text-slate-400 font-black uppercase tracking-wider">{noticia.specs.col1.label}</span>
            <span className="text-[11px] font-black text-neutral-800 dark:text-neutral-200 mt-0.5 leading-tight">{noticia.specs.col1.value}</span>
          </div>
          <div className="border-x border-lime-100 dark:border-[#A3E635]/15 flex flex-col items-center justify-center">
            <div className="w-6 h-6 rounded-full bg-lime-50 text-amber-600 dark:bg-lime-950/20 dark:text-lime-400 flex items-center justify-center mb-1 shadow-inner border border-amber-100 dark:border-amber-900/20">
              <i className={`fa-solid ${noticia.specs.col2.icon} text-[11px]`}></i>
            </div>
            <span className="text-[8px] text-slate-400 font-black uppercase tracking-wider">{noticia.specs.col2.label}</span>
            <span className="text-[11px] font-black text-neutral-800 dark:text-neutral-200 mt-0.5 leading-tight">{noticia.specs.col2.value}</span>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="w-6 h-6 rounded-full bg-lime-50 text-red-600 dark:bg-lime-950/20 dark:text-lime-400 flex items-center justify-center mb-1 shadow-inner border border-lime-100 dark:border-lime-900/20">
              <i className={`fa-solid ${noticia.specs.col3.icon} text-[11px]`}></i>
            </div>
            <span className="text-[8px] text-slate-400 font-black uppercase tracking-wider">{noticia.specs.col3.label}</span>
            <span className="text-[11px] font-black text-neutral-800 dark:text-neutral-200 mt-0.5 leading-tight">{noticia.specs.col3.value}</span>
          </div>
        </div>

        {/* Incluye (mismo estilo de pills que ServiciosGrid) */}
        <div className="mb-1.5 px-1">
          <div className="flex items-center justify-center gap-1.5 flex-wrap">
            {noticia.includes.map((inc, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-neutral-200 dark:bg-neutral-800 text-[9px] font-bold text-neutral-800 dark:text-neutral-200 border border-neutral-300 dark:border-neutral-700"
              >
                <i className="fa-solid fa-check text-[#A3E635] text-[8px]"></i>
                <i className={`fa-solid ${getIconForInclude(inc)} text-[#111827] dark:text-white text-[9px]`}></i>
                {inc}
              </span>
            ))}
          </div>
        </div>

        {/* CTA (mismo estilo y proporción que ServiciosGrid) */}
        <div className="mt-auto pt-4 pb-2 px-1">
          <a
            href={`${WHATSAPP_URL}?text=${encodeURIComponent(`Hola, quiero saber más sobre: ${noticia.title}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#84CC16] group-hover:bg-[#A3E635] text-[#111827] group-hover:text-white rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider transition-all shadow-md shadow-lime-900/10"
          >
            <i className="fab fa-whatsapp text-base leading-none"></i>
            Saber más
            <i className="fa-solid fa-arrow-right text-[11px] group-hover:translate-x-0.5 transition-transform"></i>
          </a>
        </div>

      </div>
    </div>
  );
};

// Componente Principal Carrusel de Noticias con Desplazamiento Infinito Fiel sin Saltos Temporales
const NovedadesCarrusel = ({ icon = 'fa-newspaper' }) => {
  const [currentIndex, setCurrentIndex] = useState(noticias.length); // Iniciar en el grupo central
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
  // Triplicamos las noticias para la cinta de desplazamiento infinito
  const tripledNoticias = [...noticias, ...noticias, ...noticias];

  // Auto-play: avanza 1 card cada 4 segundos
  useEffect(() => {
    if (isPaused || N <= visibleCards) return;
    const interval = setInterval(() => {
      setTransitionEnabled(true);
      setCurrentIndex((prev) => prev + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, [isPaused, N, visibleCards]);

  // Handler del final de animación para el reset instantáneo
  const handleTransitionEnd = () => {
    if (currentIndex >= N * 2) {
      setTransitionEnabled(false);
      setCurrentIndex(currentIndex - N);
    } else if (currentIndex < N) {
      setTransitionEnabled(false);
      setCurrentIndex(currentIndex + N);
    }
  };

  // Reactivar transiciones después del salto instantáneo
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

  // Gestos táctiles
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

  // Medidas dinámicas para translateX
  const cardPercent = 100 / tripledNoticias.length;
  const trackWidthPercent = (tripledNoticias.length * 100) / visibleCards;

  return (
    <section id="noticias" className="py-8 relative overflow-visible bg-slate-50/50 dark:bg-black/10">
      <div className="pointer-events-none absolute top-0 left-0 w-[500px] h-[500px] bg-amber-100/30 rounded-full blur-3xl -translate-y-1/3 -translate-x-1/4"></div>
      <div className="pointer-events-none absolute bottom-0 right-0 w-[400px] h-[400px] bg-lime-100/30 rounded-full blur-3xl translate-y-1/3 translate-x-1/4"></div>

      <CircuitBackground />

      <div className="container mx-auto px-4 lg:px-6 relative z-10">
        {/* Título de la Sección de Noticias */}
        <div className="text-center mb-4 max-w-3xl mx-auto">
          <h2 className="text-4xl lg:text-5xl font-black text-[#111827] dark:text-white mb-6 leading-tight">
            Últimas{' '}
            <span className="relative inline-block px-2 text-[#A3E635] dark:text-lime-400">
              novedades y noticias
              <svg className="absolute w-full h-3 -bottom-1 left-0 z-[-1] text-[#84CC16] dark:text-[#A3E635]/60 opacity-80" viewBox="0 0 200 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.00025 6.99997C25.7509 4.50435 65.2536 2.07897 197.994 4.4151" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </h2>
          <p className="text-lg text-gray-500 dark:text-slate-400 font-medium leading-relaxed">
            Mantente al tanto de nuestros eventos, lanzamientos de productos, convenios educativos y los logros más recientes de nuestra comunidad.
          </p>
        </div>

        {/* Carrusel de Noticias */}
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

            {/* Controles de Flechas */}
            {canNavigate && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-11 h-11 rounded-2xl bg-white/95 dark:bg-[#0a0a0a]/95 border border-neutral-200/60 dark:border-neutral-800 shadow-xl flex items-center justify-center text-[#111827] dark:text-white transition-all z-20 hover:scale-110 active:scale-95 hover:bg-[#84CC16] hover:text-white dark:hover:bg-[#84CC16] hover:border-transparent"
                  aria-label="Anterior"
                >
                  <i className="fa-solid fa-chevron-left text-xs"></i>
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-0 top-1/2 -translate-y-1/2 w-11 h-11 rounded-2xl bg-white/95 dark:bg-[#0a0a0a]/95 border border-neutral-200/60 dark:border-neutral-800 shadow-xl flex items-center justify-center text-[#111827] dark:text-white transition-all z-20 hover:scale-110 active:scale-95 hover:bg-[#84CC16] hover:text-white dark:hover:bg-[#84CC16] hover:border-transparent"
                  aria-label="Siguiente"
                >
                  <i className="fa-solid fa-chevron-right text-xs"></i>
                </button>
              </>
            )}
          </div>

          {/* Indicadores de Paginación */}
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
                        ? 'w-7 bg-[#84CC16] shadow-sm shadow-lime-950/20'
                        : 'w-2 bg-neutral-350 dark:bg-neutral-800 hover:bg-neutral-450 dark:hover:bg-neutral-700'
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
