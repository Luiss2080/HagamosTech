import React from 'react';
import FondoTech from '../../components/fondos/FondoTech';
import PageHero from '../../components/func/MigasPan';
import MisionVision from './sections/MisionVision';
import Valores from './sections/Valores';
import VideosTikTok from './sections/VideosTikTok';
import ProcesoTrabajo from './sections/Historia';

const SobreNosotrosPagina = () => {
    return (
        <div id="team-page" className="relative min-h-screen overflow-hidden bg-[#050505]">
            {/* Presentación, misión y visión comparten una sola sección y un mismo fondo. */}
            <section className="relative z-10 isolate overflow-hidden pb-2">
                <FondoTech />
                <div className="relative z-10">
                    <PageHero
                        embedded
                        className="!pb-5 sm:!pb-7"
                        title="Somos"
                        highlight="HagamosTech"
                        description={(
                            <>
                                <strong>HagamosTech</strong> ofrece acompañamiento académico, diseño gráfico y desarrollo web y de software para personas, profesionales, emprendimientos, empresas e instituciones. Cada solicitud se revisa según el servicio, el alcance y la viabilidad.
                            </>
                        )}
                    />
                    <MisionVision embedded />
                </div>
            </section>

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
