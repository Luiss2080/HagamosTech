import React from 'react';
import HeroPrivacidad from './sections/HeroPrivacidad';
import ResumenPrivacidad from './sections/ResumenPrivacidad';
import DatosRecopilados from './sections/DatosRecopilados';
import RetencionDatos from './sections/RetencionDatos';
import UsoDatos from './sections/UsoDatos';
import DerechosUsuarios from './sections/DerechosUsuarios';
import ContactoPrivacidad from './sections/ContactoPrivacidad';

const PrivacidadPagina = () => {
    return (
        <div id="privacidad-page" className="relative overflow-hidden min-h-screen bg-[#fafafa]">
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#FFF6F6] rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-orange-50 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute top-[40%] left-[20%] w-[40%] h-[40%] bg-orange-100/40 rounded-full blur-[120px] pointer-events-none"></div>

            <HeroPrivacidad />
            <ResumenPrivacidad />
            <DatosRecopilados />
            <RetencionDatos />
            <UsoDatos />
            <DerechosUsuarios />
            <ContactoPrivacidad />
        </div>
    );
};

export default PrivacidadPagina;
