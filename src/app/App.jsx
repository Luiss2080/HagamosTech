import React, { useCallback, useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import AppLayout from '../components/Layout/AppLayout';
import LoadingScreen from '../components/fondos/PantallaCarga';
import RastreadorActividad from '../components/func/RastreadorActividad';
import useAuthStore from '../store/useAutenticacionStore';
import Inicio from '../pages/Inicio/Inicio';
import HeroSaltenas from '../pages/Inicio/sections/HeroSaltenas';
import SucursalesCarrusel from '../pages/Inicio/sections/SucursalesCarrusel';
import Condiciones from '../pages/Condiciones/CondicionesPagina.jsx';
import PrivacidadPagina from '../pages/Privacidad/PrivacidadPagina';
import TerminosPagina from '../pages/Terminos/TerminosPagina';
import CookiesPagina from '../pages/Cookies/CookiesPagina';
import InicioSesionModal from '../components/Modales/InicioSesionModal';
import TerminosModal from '../components/Modales/TerminosModal';
import RegistroModal from '../components/Modales/RegistroModal';
import ContactoModal from '../components/Modales/ContactoModal';
import CarritoModal from '../store/carrito/CarritoModal';
import ToastCarrito from '../store/carrito/ToastCarrito';
import VideoPlayerModal from '../components/Modales/VideoPlayerModal';
import GuestModalsManager from '../components/Modales/GuestModalsManager';

import ChatWhatsApp from '../components/Widgets/ChatWhatsApp';
import ChatAssistant from '../chat/AsistenteChat';
import WidgetPedido from '../system/components/widgets/WidgetPedido';
import WidgetCocina from '../system/components/widgets/WidgetCocina';
import StoreHome from '../system/dashboard/admin/StoreHome';
import SobreNosotrosIndex from '../pages/SobreNosotros/Nosotros';
import Historia from '../pages/SobreNosotros/sections/Historia';
import MisionVision from '../pages/SobreNosotros/sections/MisionVision';
import Valores from '../pages/SobreNosotros/sections/Valores';
import VideosTikTok from '../pages/SobreNosotros/sections/VideosTikTok';
import PromocionesPagina from '../pages/Promociones/PromocionesPagina';
import SaltenasPagina from '../pages/Menu/Productos/SaltenasPagina';
import CafePagina from '../pages/Menu/Productos/CafePagina';
import FrapuccinosPagina from '../pages/Menu/Productos/FrapuccinosPagina';
import RefrescosPagina from '../pages/Menu/Productos/RefrescosPagina';
import PostresPagina from '../pages/Menu/Productos/PostresPagina';
import CombosPagina from '../pages/Menu/Productos/CombosPagina';
import DeliveryExpress from '../pages/Servicios/restaurante/DeliveryExpress';
import PedidosPorMayor from '../pages/Servicios/restaurante/PedidosPorMayor';
import EventosCatering from '../pages/Servicios/restaurante/EventosCatering';
import ServicioCorporativo from '../pages/Servicios/restaurante/ServicioCorporativo';
import SaltenasCongeladas from '../pages/Servicios/restaurante/SaltenasCongeladas';
import NovedadesPagina from '../pages/Novedades/NovedadesPagina';
import SantaCruzSucursales from '../pages/Sucursales/SantaCruz/SantaCruzSucursales';
import CochabambaSucursales from '../pages/Sucursales/Cochabamba/CochabambaSucursales';
import OruroSucursales from '../pages/Sucursales/Oruro/OruroSucursales';
import { DetailEquipetrol } from '../pages/Sucursales/SantaCruz/detalle/EquipetrolDetalle';
import { Detail2doAnillo } from '../pages/Sucursales/SantaCruz/detalle/2doAnilloDetalle';
import { DetailAvPirai } from '../pages/Sucursales/SantaCruz/detalle/AvPiraiDetalle';
import { DetailCafeBeni } from '../pages/Sucursales/SantaCruz/detalle/CafeBeniDetalle';
import ContactoPagina from '../pages/Contacto/Contacto';
import HeroContacto from '../pages/Contacto/sections/HeroContacto';
import FormularioContacto from '../pages/Contacto/sections/FormularioContacto';
import Recursos from '../pages/Contacto/sections/Recursos';
import Ubicacion from '../pages/Contacto/sections/Ubicacion';
import PagoMovil from '../store/catalogo/PagoMovil';
import CatalogoPagina from '../store/catalogo/CatalogoPagina';
import DetalleProducto from '../store/catalogo/Detalle/DetalleProducto';
import RecuperarContrasena from '../components/func/RecuperarContrasena';
import Error401 from '../pages/Errores/Error401';
import Error403 from '../pages/Errores/Error403';
import Error404 from '../pages/Errores/Error404';
import Error419 from '../pages/Errores/Error419';
import Error500 from '../pages/Errores/Error500';

// Importaciones de Perfil de Usuario
import PerfilPagina from '../pages/Perfil/PerfilPagina';
import ConfiguracionPagina from '../pages/Perfil/ConfiguracionPagina';
import HistorialComprasPagina from '../pages/Perfil/HistorialComprasPagina';

// Zustand Store de Modales
import useModalStore from '../store/useModalStore';

const LOGIN_MODAL_KEYS = new Set(['modal_login', 'loginModal']);
const REGISTER_MODAL_KEYS = new Set(['modal_register', 'startTrialModal', 'registerModal']);
const CONTACT_MODAL_KEYS = new Set(['modal_contact', 'contactModal', 'contactarModal', 'contactoModal']);

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [contentVisible, setContentVisible] = useState(false);
  const [openWidget, setOpenWidget] = useState(null);

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
      
      // Traducir nombre del modal según useModalStore.js
      let resolvedModalName = modalName;
      if (modalName === 'cardModal') resolvedModalName = 'cardModal'; // mapea a cardModal
      
      openModal(resolvedModalName, orderData);
    };

    window.addEventListener('loscatores-open-modal', handleOpenCustomModal);

    return () => {
        delete window.openModal;
        window.removeEventListener('loscatores-open-modal', handleOpenCustomModal);
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
      {isLoading && <LoadingScreen onComplete={handleLoadComplete} />}
      <div className={`transition-opacity duration-700 ease-out ${contentVisible ? 'opacity-100' : 'opacity-0'}`}>
          <AppLayout>
            <Routes>
              <Route path="/" element={<Inicio />} />
              <Route path="/inicio/hero" element={<HeroSaltenas />} />
              <Route path="/inicio/sucursales" element={<SucursalesCarrusel onOpenModal={() => {}} />} />
              <Route path="/servicios/delivery" element={<DeliveryExpress />} />
              <Route path="/servicios/mayor" element={<PedidosPorMayor />} />
              <Route path="/servicios/eventos" element={<EventosCatering />} />
              <Route path="/servicios/corporativo" element={<ServicioCorporativo />} />
              <Route path="/servicios/congeladas" element={<SaltenasCongeladas />} />
              <Route path="/condiciones" element={<Condiciones />} />
              <Route path="/privacidad" element={<PrivacidadPagina />} />
              <Route path="/terminos" element={<TerminosPagina />} />
              <Route path="/cookies" element={<CookiesPagina />} />
              <Route path="/store/home/:tab?" element={<StoreHome />} />
              <Route path="/sobre-nosotros" element={<SobreNosotrosIndex />} />
              <Route path="/sobre-nosotros/historia" element={<Historia />} />
              <Route path="/sobre-nosotros/mision-vision" element={<MisionVision />} />
              <Route path="/sobre-nosotros/valores" element={<Valores />} />
              <Route path="/sobre-nosotros/videos" element={<VideosTikTok />} />
              <Route path="/promociones" element={<PromocionesPagina />} />
              <Route path="/menu/saltenas" element={<SaltenasPagina />} />
              <Route path="/menu/cafe" element={<CafePagina />} />
              <Route path="/menu/frapuccinos" element={<FrapuccinosPagina />} />
              <Route path="/menu/refrescos" element={<RefrescosPagina />} />
              <Route path="/menu/postres" element={<PostresPagina />} />
              <Route path="/menu/combos" element={<CombosPagina />} />
              <Route path="/novedades" element={<NovedadesPagina />} />
              <Route path="/contactanos" element={<ContactoPagina />} />
              <Route path="/contacto/hero" element={<HeroContacto />} />
              <Route path="/contacto/formulario" element={<FormularioContacto />} />
              <Route path="/contacto/recursos" element={<Recursos />} />
              <Route path="/contacto/ubicacion" element={<Ubicacion />} />
              <Route path="/sucursales" element={<Navigate to="/sucursales/santa-cruz" replace />} />
              <Route path="/sucursales/santa-cruz" element={<SantaCruzSucursales />} />
              <Route path="/sucursales/santa-cruz/equipetrol" element={<DetailEquipetrol />} />
              <Route path="/sucursales/santa-cruz/2do-anillo" element={<Detail2doAnillo />} />
              <Route path="/sucursales/santa-cruz/av-pirai" element={<DetailAvPirai />} />
              <Route path="/sucursales/santa-cruz/cafe-beni" element={<DetailCafeBeni />} />
              <Route path="/sucursales/cochabamba" element={<CochabambaSucursales />} />
              <Route path="/sucursales/oruro" element={<OruroSucursales />} />
              <Route path="/pago-movil" element={<PagoMovil />} />
              <Route path="/catalogo" element={<CatalogoPagina />} />
              <Route path="/catalogo/:id" element={<DetalleProducto />} />
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

          <CarritoModal />

          <ToastCarrito />

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
