import React from 'react';
import HeroContacto from './sections/HeroContacto';
import Ubicacion from './sections/Ubicacion';
import Recursos from './sections/Recursos';
import FormularioContacto from './sections/FormularioContacto';

const ContactoPagina = () => {
    return (
        <div id="support-page" className="relative overflow-hidden min-h-screen bg-[#fafafa]">
            {/* Organic Soft Blobs Background */}
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#FFF6F6] rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-orange-50 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute top-[40%] left-[20%] w-[40%] h-[40%] bg-orange-100/40 rounded-full blur-[120px] pointer-events-none"></div>

            {/* --- HERO SECTION --- */}
            <HeroContacto />

            {/* --- LOCATION SESSION --- */}
            <Ubicacion />

            {/* --- RESOURCES SESSION --- */}
            <Recursos />

            {/* --- FORMULARIO DE CONTACTO --- */}
            <FormularioContacto />
        </div>
    );
};

export default ContactoPagina;
