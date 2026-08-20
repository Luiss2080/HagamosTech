import React from 'react';
import HeroTerminos from './sections/HeroTerminos';
import ResumenTerminos from './sections/ResumenTerminos';
import AcuerdosUso from './sections/AcuerdosUso';
import ComprasPagos from './sections/ComprasPagos';

const TerminosPagina = () => {
    return (
        <div id="terminos-page" className="relative overflow-hidden min-h-screen bg-[#fafafa]">
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#FFF6F6] rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-orange-50 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute top-[40%] left-[20%] w-[40%] h-[40%] bg-orange-100/40 rounded-full blur-[120px] pointer-events-none"></div>

            <HeroTerminos />
            <ResumenTerminos />
            <AcuerdosUso />
            <ComprasPagos />
        </div>
    );
};

export default TerminosPagina;
