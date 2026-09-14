import React, { lazy, Suspense, useCallback, useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import AppLayout from '../components/Layout/AppLayout';
import LoadingScreen from '../components/fondos/PantallaCarga';
import RastreadorActividad from '../components/func/RastreadorActividad';
import useAuthStore from '../store/useAutenticacionStore';
import InicioSesionModal from '../components/Modales/InicioSesionModal';
import TerminosModal from '../components/Modales/TerminosModal';
import RegistroModal from '../components/Modales/RegistroModal';
import ContactoModal from '../components/Modales/ContactoModal';
import VideoPlayerModal from '../components/Modales/VideoPlayerModal';
import GuestModalsManager from '../components/Modales/GuestModalsManager';
import useModalStore from '../store/useModalStore';
import { tituloParaRuta } from './seo';

// Páginas cargadas de forma diferida (code-splitting) para reducir el bundle inicial.
const Inicio = lazy(() => import('../pages/Inicio/Inicio'));
const Tecnologia = lazy(() => import('../pages/QueHacemos/Tecnologia/Tecnologia'));
const Academia = lazy(() => import('../pages/QueHacemos/Academia/Academia'));
const NegociosQueHacemos = lazy(() => import('../pages/QueHacemos/Negocios/Negocios'));
const Personalizado = lazy(() => import('../pages/QueHacemos/Personalizado/Personalizado'));
const HeroHagamosTech = lazy(() => import('../pages/Inicio/sections/HeroHagamosTech'));
const Condiciones = lazy(() => import('../pages/Condiciones/CondicionesPagina.jsx'));
const PrivacidadPagina = lazy(() => import('../pages/Privacidad/PrivacidadPagina'));
const TerminosPagina = lazy(() => import('../pages/Terminos/TerminosPagina'));
const CookiesPagina = lazy(() => import('../pages/Cookies/CookiesPagina'));
const ComoTrabajamos = lazy(() => import('../pages/ComoTrabajamos/ComoTrabajamos'));
const SobreNosotrosIndex = lazy(() => import('../pages/SobreNosotros/Nosotros'));
const Historia = lazy(() => import('../pages/SobreNosotros/sections/Historia'));
const MisionVision = lazy(() => import('../pages/SobreNosotros/sections/MisionVision'));
const Valores = lazy(() => import('../pages/SobreNosotros/sections/Valores'));
const VideosTikTok = lazy(() => import('../pages/SobreNosotros/sections/VideosTikTok'));
const PromocionesPagina = lazy(() => import('../pages/Promociones/PromocionesPagina'));
const NovedadesPagina = lazy(() => import('../pages/Novedades/NovedadesPagina'));
const ContactoPagina = lazy(() => import('../pages/Contacto/Contacto'));
const HeroContacto = lazy(() => import('../pages/Contacto/sections/HeroContacto'));
const FormularioContacto = lazy(() => import('../pages/Contacto/sections/FormularioContacto'));
const Recursos = lazy(() => import('../pages/Contacto/sections/Recursos'));
const Ubicacion = lazy(() => import('../pages/Contacto/sections/Ubicacion'));
const PaginasWeb = lazy(() => import('../pages/Servicios/DesarrolloWeb/PaginasWeb'));
const SistemasApps = lazy(() => import('../pages/Servicios/SistemasApps/SistemasApps'));
const Automatizacion = lazy(() => import('../pages/Servicios/Automatizacion/Automatizacion'));
const InteligenciaArtificial = lazy(() => import('../pages/Servicios/InteligenciaArtificial/InteligenciaArtificial'));
const Negocio = lazy(() => import('../pages/Servicios/Negocio/Negocio'));
const Academico = lazy(() => import('../pages/Servicios/Academico/Academico'));
const Empleo = lazy(() => import('../pages/Servicios/Empleo/Empleo'));
const DisenoGrafico = lazy(() => import('../pages/Servicios/DisenoGrafico/DisenoGrafico'));
const RecuperarContrasena = lazy(() => import('../components/func/RecuperarContrasena'));
const PerfilPagina = lazy(() => import('../pages/Perfil/PerfilPagina'));
const ConfiguracionPagina = lazy(() => import('../pages/Perfil/ConfiguracionPagina'));
const HistorialComprasPagina = lazy(() => import('../pages/Perfil/HistorialComprasPagina'));
const Error401 = lazy(() => import('../pages/Errores/Error401'));
const Error403 = lazy(() => import('../pages/Errores/Error403'));
const Error404 = lazy(() => import('../pages/Errores/Error404'));
const Error419 = lazy(() => import('../pages/Errores/Error419'));
const Error500 = lazy(() => import('../pages/Errores/Error500'));

const LOGIN_MODAL_KEYS = new Set(['modal_login', 'loginModal']);
const REGISTER_MODAL_KEYS = new Set(['modal_register', 'startTrialModal', 'registerModal']);
const CONTACT_MODAL_KEYS = new Set(['modal_contact', 'contactModal', 'contactarModal', 'contactoModal']);

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [contentVisible, setContentVisible] = useState(false);

  const initSession = useAuthStore((s) => s.initSession);

  useEffect(() => {
    initSession();
  }, [initSession]);

  const {
    isLoginOpen,
    isRegisterOpen,
    isTermsOpen,
    isContactOpen,
    isVideoOpen,
    videoData,
    openModal,
    closeModal
  } = useModalStore();

  const handleLoadComplete = useCallback(() => {
    setIsLoading(false);
    setTimeout(() => setContentVisible(true), 50);
  }, []);

  useEffect(() => {
    window.openModal = (modalName) => {
        if (LOGIN_MODAL_KEYS.has(modalName)) {
          openModal('loginModal');
          return;
        }
        if (REGISTER_MODAL_KEYS.has(modalName)) {
          openModal('registerModal');
          return;
        }
        if (CONTACT_MODAL_KEYS.has(modalName)) {
          openModal('contactModal');
          return;
        }
        openModal(modalName);
    };

    // Registrar evento personalizado para abrir modales con orden (ej. desde PagoModal)
    const handleOpenCustomModal = (e) => {
      const detail = e.detail;
      const modalName = typeof detail === 'string' ? detail : detail.name;
      const orderData = typeof detail === 'object' ? detail : null;
      
      console.log("App | Evento personalizado recibido para abrir modal:", modalName, orderData);
      
      // Traducir nombre del modal segÃºn useModalStore.js
      let resolvedModalName = modalName;
      if (modalName === 'cardModal') resolvedModalName = 'cardModal'; // mapea a cardModal
      
      openModal(resolvedModalName, orderData);
    };

    window.addEventListener('hagamostech-open-modal', handleOpenCustomModal);

    return () => {
        delete window.openModal;
        window.removeEventListener('hagamostech-open-modal', handleOpenCustomModal);
    };
  }, [openModal]);

  useEffect(() => {
    const shouldOpen = localStorage.getItem('open_start_trial') === '1' || localStorage.getItem('open_login_modal') === '1';
    if (shouldOpen) {
      localStorage.removeItem('open_start_trial');
      localStorage.removeItem('open_login_modal');
      openModal('registerModal');
    }
  }, [openModal]);

  return (
    <Router>
      <ScrollToTop />
      <SeoRuta />
      {isLoading && <LoadingScreen onComplete={handleLoadComplete} />}
      <div className={`transition-opacity duration-700 ease-out ${contentVisible ? 'opacity-100' : 'opacity-0'}`}>
          <AppLayout>
            <Suspense fallback={<div className="min-h-[60vh]" aria-hidden="true" />}>
            <Routes>
          {/* Rutas Principales */}
          <Route path="/" element={<Inicio />} />
          <Route path="/que-hacemos/tecnologia" element={<Tecnologia />} />
          <Route path="/que-hacemos/academia" element={<Academia />} />
          <Route path="/que-hacemos/negocios" element={<NegociosQueHacemos />} />
          <Route path="/que-hacemos/personalizado" element={<Personalizado />} />
                <Route path="/inicio/hero" element={<HeroHagamosTech />} />
              <Route path="/servicios/desarrollo-web" element={<PaginasWeb />} />
              <Route path="/servicios/sistemas-apps" element={<SistemasApps />} />
              <Route path="/servicios/automatizacion" element={<Automatizacion />} />
              <Route path="/servicios/inteligencia-artificial" element={<InteligenciaArtificial />} />
              <Route path="/servicios/para-tu-negocio" element={<Negocio />} />
              <Route path="/servicios/apoyo-academico" element={<Academico />} />
              <Route path="/servicios/empleo" element={<Empleo />} />
              <Route path="/servicios/diseno-grafico" element={<DisenoGrafico />} />
              <Route path="/condiciones" element={<Condiciones />} />
              <Route path="/privacidad" element={<PrivacidadPagina />} />
              <Route path="/terminos" element={<TerminosPagina />} />
              <Route path="/cookies" element={<CookiesPagina />} />
              <Route path="/sobre-nosotros" element={<SobreNosotrosIndex />} />
              <Route path="/sobre-nosotros/historia" element={<Historia />} />
              <Route path="/sobre-nosotros/mision-vision" element={<MisionVision />} />
              <Route path="/sobre-nosotros/valores" element={<Valores />} />
              <Route path="/sobre-nosotros/videos" element={<VideosTikTok />} />
              <Route path="/promociones" element={<PromocionesPagina />} />
              <Route path="/como-trabajamos" element={<ComoTrabajamos />} />
              <Route path="/novedades" element={<NovedadesPagina />} />
              <Route path="/contactanos" element={<ContactoPagina />} />
              <Route path="/contacto/hero" element={<HeroContacto />} />
              <Route path="/contacto/formulario" element={<FormularioContacto />} />
              <Route path="/contacto/recursos" element={<Recursos />} />
              <Route path="/contacto/ubicacion" element={<Ubicacion />} />
              <Route path="/recuperar-contrasena" element={<RecuperarContrasena />} />

              {/* Rutas del Perfil de Usuario */}
              <Route path="/perfil" element={<PerfilPagina />} />
              <Route path="/configuracion" element={<ConfiguracionPagina />} />
              <Route path="/perfil/compras" element={<HistorialComprasPagina />} />

              {/* Error Pages Routing */}
              <Route path="/errors/401" element={<Error401 />} />
              <Route path="/errors/403" element={<Error403 />} />
              <Route path="/errors/404" element={<Error404 />} />
              <Route path="/errors/419" element={<Error419 />} />
              <Route path="/errors/500" element={<Error500 />} />

              {/* Fallback Route */}
              <Route path="*" element={<Error404 />} />
            </Routes>
            </Suspense>

          </AppLayout>

          {/* Renderizado Centralizado de Modales - fuera del AppLayout para estar por encima del Header */}
          <InicioSesionModal
            isOpen={isLoginOpen}
            onClose={() => closeModal('isLoginOpen')}
          />

          <TerminosModal
            isOpen={isTermsOpen}
            onClose={() => closeModal('isTermsOpen')}
          />

          <RegistroModal
            isOpen={isRegisterOpen}
            onClose={() => closeModal('isRegisterOpen')}
          />

          <ContactoModal
            isOpen={isContactOpen}
            onClose={() => closeModal('isContactOpen')}
          />

          <VideoPlayerModal
            isOpen={isVideoOpen}
            onClose={() => closeModal('isVideoOpen')}
            video={videoData}
          />
          <GuestModalsManager />
          <RastreadorActividad />
      </div>
    </Router>
  )
}
export default App;

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const targetId = hash.replace('#', '');
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname, hash]);

  useEffect(() => {
    let observer;
    
    const setupReveal = () => {
      // Apply initial reveal class to targets that don't have it explicitly but should
      const targets = document.querySelectorAll('section, .grid > a, .grid > div, .glass-card, .card, .modal-content, form');
      targets.forEach((el) => {
        if (
          el.closest('#home') || 
          el.id === 'home' || 
          el.classList.contains('no-reveal') || 
          el.closest('header') || 
          el.closest('nav') ||
          el.closest('.floating') ||
          el.classList.contains('floating') ||
          (el.className && typeof el.className === 'string' && (el.className.includes('animate-float') || el.className.includes('floating-card'))) ||
          el.closest('[class*="track"]') ||
          el.closest('.carrusel') ||
          el.closest('.carousel')
        ) {
          return;
        }
        el.classList.add('reveal');
      });

      observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            entry.target.dataset.revealed = "true";
          }
        });
      }, { threshold: 0.05, rootMargin: '0px 0px -30px 0px' });

      document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    };

    const timer = setTimeout(setupReveal, 300);

    // Robust fallback to catch React re-renders wiping out the class or minimizing window
    const fallbackInterval = setInterval(() => {
      const reveals = document.querySelectorAll('.reveal');
      reveals.forEach(el => {
        // If it was already revealed but lost the active class due to a re-render attribute reset
        if (el.dataset.revealed === "true" && !el.classList.contains('active')) {
          el.classList.add('active');
        }
        // If it's a new element or missed by the observer, ensure it is being observed
        if (observer && !el.classList.contains('active')) {
          observer.observe(el);
        }
      });
    }, 1000);

    const handleVisibility = () => {
      if (document.visibilityState === 'visible' && observer) {
        // Force a re-check of all un-activated elements when window is restored
        document.querySelectorAll('.reveal:not(.active)').forEach(el => observer.observe(el));
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibility);
    window.addEventListener('resize', handleVisibility);

    return () => {
      clearTimeout(timer);
      clearInterval(fallbackInterval);
      if (observer) observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('resize', handleVisibility);
    };
  }, [pathname]);

  return null;
};