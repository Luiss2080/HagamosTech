import React from 'react';
import HeroContacto from './sections/HeroContacto';
import Ubicacion from './sections/Ubicacion';
import Recursos from './sections/Recursos';
import FormularioContacto from './sections/FormularioContacto';

const ContactoPagina = () => {
    return (
        <div id="support-page" className="relative overflow-hidden min-h-screen bg-[#050505]">
            {/* Organic Soft Blobs Background (tech) */}
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#A3E635]/10 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#84CC16]/10 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute top-[40%] left-[20%] w-[40%] h-[40%] bg-[#A3E635]/5 rounded-full blur-[140px] pointer-events-none"></div>

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
