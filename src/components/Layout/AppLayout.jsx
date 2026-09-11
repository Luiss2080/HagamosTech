import React, { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import useAuthStore from '../../store/useAutenticacionStore';
import ChatWhatsApp from '../Widgets/ChatWhatsApp';
import ChatAssistant from '../../chat/AsistenteChat';

const AppLayout = ({ children }) => {
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
