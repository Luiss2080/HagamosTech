import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import useAuthStore from '../../store/useAutenticacionStore';
import ChatWhatsApp from '../Widgets/ChatWhatsApp';
import ChatAssistant from '../../chat/AsistenteChat';

const checkIsValidRoute = (path) => {
    // Exact static routes
    const exacts = [
      '/', '/condiciones', '/catalogo',
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

    return false;
};

const AppLayout = ({ children }) => {
    const location = useLocation();
    const fetchProfile = useAuthStore((state) => state.fetchProfile);
    
    useEffect(() => {
        fetchProfile();
    }, [fetchProfile]);
    
    return (
        <div className="flex flex-col min-h-screen relative bg-slate-50">
            {/* Fondo tecnológico global: rejilla + nodos verde lima */}
            <div className="fixed inset-0 z-[1] pointer-events-none overflow-hidden bg-white">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0OCIgaGVpZ2h0PSI0OCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDI0IEwgNDggMjQgTSAyNCAwIEwgMjQgNDgiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgxNjMsMjMwLDUzLDAuMDcpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')]"></div>
                <div className="absolute top-[-10%] left-[-10%] w-[45%] h-[45%] bg-[#A3E635]/5 rounded-full blur-[100px] pointer-events-none"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[45%] h-[45%] bg-[#84CC16]/5 rounded-full blur-[100px] pointer-events-none"></div>
            </div>
            <Header />
            <main className="flex-grow relative z-10">
                {children}
            </main>
            <Footer />
            
            {/* Widgets globales */}
            <ChatWhatsApp />
            <ChatAssistant />
        </div>
    );
};

export default AppLayout;
