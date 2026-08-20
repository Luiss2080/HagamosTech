import React from 'react';
import HeroCookies from './sections/HeroCookies';
import GestorConsentimiento from './sections/GestorConsentimiento';
import CicloVidaCookie from './sections/CicloVidaCookie';
import MapaFlujoCookies from './sections/MapaFlujoCookies';
import TiposCookies from './sections/TiposCookies';
import CtaCookies from './sections/CtaCookies';

const CookiesPagina = () => {
    return (
        <div id="cookies-page" className="relative overflow-hidden min-h-screen bg-[#fafafa]">
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#FFF6F6] rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-orange-50 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute top-[40%] left-[20%] w-[40%] h-[40%] bg-orange-100/40 rounded-full blur-[120px] pointer-events-none"></div>

            <HeroCookies />
            <GestorConsentimiento />
            <CicloVidaCookie />
            <MapaFlujoCookies />
            <TiposCookies />
            <CtaCookies />
        </div>
    );
};

export default CookiesPagina;
