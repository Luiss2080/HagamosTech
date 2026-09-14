import React from 'react';
import HeroTerminos from './sections/HeroTerminos';
import ResumenTerminos from './sections/ResumenTerminos';
import AcuerdosUso from './sections/AcuerdosUso';
import ComprasPagos from './sections/ComprasPagos';

const TerminosPagina = () => {
    return (
        <div id="terminos-page" className="relative overflow-hidden min-h-screen bg-white">
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#A3E635]/5 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#0A0A0A]/5 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute top-[40%] left-[20%] w-[40%] h-[40%] bg-[#A3E635]/5 rounded-full blur-[120px] pointer-events-none"></div>

            <HeroTerminos />
            <ResumenTerminos />
            <AcuerdosUso />
            <ComprasPagos />
        </div>
    );
};

export default TerminosPagina;
