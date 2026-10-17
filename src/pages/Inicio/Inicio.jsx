import React from 'react';
import HeroHagamosTech from './sections/HeroHagamosTech';
import AreasTrabajo from './sections/AreasTrabajo';
import ServiciosGrid from './sections/ServiciosGrid';
import ProcesoTrabajo from './sections/ProcesoTrabajo';

const Inicio = () => {
    return (
        <div id="app" className="relative overflow-hidden">
            <HeroHagamosTech />

            <AreasTrabajo />

            <ServiciosGrid />

            <ProcesoTrabajo />
        </div>
    );
};

export default Inicio;
