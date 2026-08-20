import React from 'react';
import HeroSucursalesCBB from './sections/HeroSucursalesCBB';
import MapsSucursalesCBB from './sections/MapsSucursalesCBB';
import VideosSucursalesCBB from './sections/VideosSucursalesCBB';
import BeneficiosSucursalesCBB from './sections/BeneficiosSucursalesCBB';

const CochabambaSucursales = () => {
    return (
        <div id="sucursales-cbb-page" className="relative overflow-hidden min-h-screen bg-[#fafafa]">
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#FFF6F6] rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-orange-50 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute top-[40%] left-[20%] w-[40%] h-[40%] bg-orange-100/40 rounded-full blur-[120px] pointer-events-none"></div>

            <HeroSucursalesCBB />
            <MapsSucursalesCBB />
            <VideosSucursalesCBB />
            <BeneficiosSucursalesCBB />
        </div>
    );
};

export default CochabambaSucursales;
