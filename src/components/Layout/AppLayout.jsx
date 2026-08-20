import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import useAuthStore from '../../store/useAutenticacionStore';
import ChatWhatsApp from '../Widgets/ChatWhatsApp';
import ChatAssistant from '../../chat/AsistenteChat';
import WidgetPedido from '../../system/components/widgets/WidgetPedido';
import WidgetCocina from '../../system/components/widgets/WidgetCocina';

const checkIsValidRoute = (path) => {
    // Exact static routes
    const exacts = [
      '/', '/condiciones', '/catalogo', '/store/home',
      '/sobre-nosotros', '/opiniones', '/contactanos', '/contacto',
      '/pago-movil', '/perfil', '/config', '/configuracion', '/perfil/compras',
      '/competencia/2023', '/competencia/2024', '/competencia/2025',
      '/competencia/2026',
      '/promociones', '/menu/saltenas', '/menu/cafe', '/menu/frapuccinos', '/menu/refrescos', '/menu/postres', '/menu/combos', '/novedades', '/sucursales', '/sucursales/santa-cruz', '/sucursales/santa-cruz/equipetrol', '/sucursales/santa-cruz/2do-anillo', '/sucursales/santa-cruz/av-pirai', '/sucursales/santa-cruz/cafe-beni', '/sucursales/cochabamba', '/sucursales/oruro', '/privacidad', '/terminos', '/cookies', '/servicios/delivery', '/servicios/mayor', '/servicios/eventos', '/servicios/corporativo', '/servicios/congeladas'
    ];
    if (exacts.includes(path)) return true;

    // Dynamic catalog slug: /catalogo/:slug
    if (path.startsWith('/catalogo/') && !path.startsWith('/catalogo/categoria/')) {
        const segment = path.replace('/catalogo/', '');
        if (segment && !segment.includes('/')) return true;
    }
    // Dynamic catalog category: /catalogo/categoria/:categoryId
    if (path.startsWith('/catalogo/categoria/')) {
        const segment = path.replace('/catalogo/categoria/', '');
        if (segment && !segment.includes('/')) return true;
    }

    // Dynamic dashboard tabs: /store/home/:tab
    if (path.startsWith('/store/home/')) {
        const segment = path.replace('/store/home/', '');
        if (segment && !segment.includes('/')) return true;
    }

    return false;
};

const AppLayout = ({ children }) => {
    const location = useLocation();
    const fetchProfile = useAuthStore((state) => state.fetchProfile);
    
    useEffect(() => {
        fetchProfile();
    }, [fetchProfile]);
    
    const isSystemPath = location.pathname.startsWith('/store/home');
    const hideHeaderFooter = isSystemPath;

    return (
        <div className="flex flex-col min-h-screen relative bg-slate-50">
            {!hideHeaderFooter && <Header />}
            <main className="flex-grow relative z-10">
                {children}
            </main>
            {!hideHeaderFooter && <Footer />}
            
            {/* Conditional Global Widgets */}
            {isSystemPath ? (
              <>
                <WidgetPedido />
                <WidgetCocina />
              </>
            ) : (
              <>
                <ChatWhatsApp />
                <ChatAssistant />
              </>
            )}
        </div>
    );
};

export default AppLayout;
