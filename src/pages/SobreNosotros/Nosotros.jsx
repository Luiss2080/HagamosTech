import React from 'react';
import FondoTech from '../../components/fondos/FondoTech';
import PageHero from '../../components/func/MigasPan';
import MisionVision from './sections/MisionVision';
import Valores from './sections/Valores';
import VideosTikTok from './sections/VideosTikTok';
import ProcesoTrabajo from './sections/Historia';

const SobreNosotrosPagina = () => {
    return (
        <div id="team-page" className="relative overflow-hidden min-h-screen bg-white">
            {/* Organic Soft Blobs Background */}
            <div className="absolute top-[-5%] left-[-10%] w-[50%] h-[50%] bg-[#A3E635]/5 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute top-[30%] right-[-10%] w-[40%] h-[40%] bg-[#0A0A0A]/5 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-[10%] left-[20%] w-[45%] h-[45%] bg-[#A3E635]/5 rounded-full blur-[140px] pointer-events-none"></div>

            {/* --- SECTION 1: HISTORY / HERO --- */}
            <div className="relative z-10">
                <FondoTech />
                <PageHero
                    title="Somos"
                    highlight="HagamosTech"
                    description={(
                        <>
                            <strong>HagamosTech</strong> es una iniciativa de soluciones digitales, tecnológicas, académicas y empresariales. Trabajamos con <strong>cualquier tipo de cliente</strong> para resolver <strong>cualquier tipo de necesidad</strong> mediante tecnología, creatividad y conocimiento.
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
