import React from 'react';
import FondoTech from '../../components/fondos/FondoTech';
import PageHero from '../../components/func/MigasPan';
import MisionVision from './sections/MisionVision';
import Valores from './sections/Valores';
import VideosTikTok from './sections/VideosTikTok';
import ProcesoTrabajo from './sections/Historia';

const SobreNosotrosPagina = () => {
    return (
        <div id="team-page" className="relative min-h-screen overflow-hidden bg-[#050505] text-white">
            <div aria-hidden="true" className="pointer-events-none absolute left-[-10%] top-[5%] h-[28rem] w-[28rem] rounded-full bg-[#A3E635]/5 blur-[120px]"></div>
            <div aria-hidden="true" className="pointer-events-none absolute right-[-10%] top-[45%] h-[26rem] w-[26rem] rounded-full bg-[#84CC16]/5 blur-[130px]"></div>

            {/* --- SECTION 1: HISTORY / HERO --- */}
            <div className="relative z-10">
                <FondoTech />
                <PageHero
                    title="Somos"
                    highlight="HagamosTech"
                    description={(
                        <>
                            <strong>HagamosTech</strong> reúne desarrollo digital, diseño y acompañamiento académico. Revisamos cada solicitud para explicar su alcance y los siguientes pasos antes de comenzar.
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

            {/* --- SECTION 5: ORIGEN / HISTORIA --- */}
            <ProcesoTrabajo />
        </div>
    );
};

export default SobreNosotrosPagina;
