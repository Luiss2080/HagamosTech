import React from 'react';
import HeroPromociones from './sections/HeroPromociones';
import VentajasCarrusel from './sections/VentajasCarrusel';
import PromoDestacada from './sections/PromoDestacada';
import PlanesSuscripcion from './sections/PlanesSuscripcion';
import CtaContacto from './sections/CtaContacto';

const PromocionesPagina = () => {
    return (
        <div id="promociones-page" className="relative overflow-hidden min-h-screen bg-[#0A0A0A]">
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#111111] rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-white/5 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute top-[40%] left-[20%] w-[40%] h-[40%] bg-white/5 rounded-full blur-[120px] pointer-events-none"></div>

            <HeroPromociones />
            <VentajasCarrusel />
            <PromoDestacada />
            <PlanesSuscripcion />
            <CtaContacto />
        </div>
    );
};

export default PromocionesPagina;
