import React from 'react';
import HeroPromociones from './sections/HeroPromociones';
import VentajasCarrusel from './sections/VentajasCarrusel';
import PromoDestacada from './sections/PromoDestacada';
import CarruselOfertas from './sections/CarruselOfertas';
import PlanesSuscripcion from './sections/PlanesSuscripcion';
import CtaContacto from './sections/CtaContacto';

const PromocionesPagina = () => {
    return (
        <div id="promociones-page" className="relative overflow-hidden min-h-screen bg-[#fafafa]">
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#FFF6F6] rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-orange-50 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute top-[40%] left-[20%] w-[40%] h-[40%] bg-orange-100/40 rounded-full blur-[120px] pointer-events-none"></div>

            <HeroPromociones />
            <VentajasCarrusel />
            <PromoDestacada />
            <CarruselOfertas />
            <PlanesSuscripcion />
            <CtaContacto />
        </div>
    );
};

export default PromocionesPagina;
