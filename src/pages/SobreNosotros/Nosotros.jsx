import React from 'react';
import CircuitBackground from '../../components/fondos/FondoSaltenas';
import PageHero from '../../components/func/MigasPan';
import MisionVision from './sections/MisionVision';
import Valores from './sections/Valores';
import VideosTikTok from './sections/VideosTikTok';
import ProcesoTrabajo from './sections/Historia';

const SobreNosotrosPagina = () => {
    return (
        <div id="team-page" className="relative overflow-hidden min-h-screen bg-[#fafafa]">
            {/* Organic Soft Blobs Background */}
            <div className="absolute top-[-5%] left-[-10%] w-[50%] h-[50%] bg-[#FFF6F6] rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute top-[30%] right-[-10%] w-[40%] h-[40%] bg-orange-50 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-[10%] left-[20%] w-[45%] h-[45%] bg-orange-100/30 rounded-full blur-[140px] pointer-events-none"></div>

            {/* --- SECTION 1: HISTORY / HERO --- */}
            <div className="relative z-10">
                <CircuitBackground />
                <PageHero
                    title="Nuestra"
                    highlight="Historia"
                    description={(
                        <>
                            <strong>LOS CASTORES</strong> nace con el objetivo de llevar el verdadero sabor tradicional a tu mesa. Desde 1989, nos dedicamos a hornear las mejores salteñas bolivianas, alegrando las mañanas de miles de clientes.
                        </>
                    )}
                />
            </div>

            {/* --- SECTION 2: MISSION & VISION --- */}
            <MisionVision />

            {/* --- SECTION 3: VALORES --- */}
            <Valores />

            {/* --- SECTION 4: TIKTOK SHOWCASE --- */}
            <VideosTikTok />

            {/* --- SECTION 5: FLUJO DE TRABAJO / HISTORIA --- */}
            <ProcesoTrabajo />
        </div>
    );
};

export default SobreNosotrosPagina;
