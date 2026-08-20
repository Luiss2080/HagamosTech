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

            {/* Ola de cierre de la página (estilo FondoTech) */}
            <div className="relative w-full overflow-hidden leading-[0] rotate-180 opacity-60 z-0">
                <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-[calc(100%+1.3px)] h-[80px] block">
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-[#A3E635]"></path>
                </svg>
            </div>
        </div>
    );
};

export default ContactoPagina;
