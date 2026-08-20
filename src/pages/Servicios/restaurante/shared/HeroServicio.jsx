import React from 'react';
import PageHero from '../../../../components/func/MigasPan';
import CircuitBackground from '../../../../components/fondos/FondoSaltenas';

const HeroServicio = ({ titulo, resaltado, descripcion }) => {
    return (
        <div className="relative z-10">
            <CircuitBackground />
            <PageHero title={titulo} highlight={resaltado} description={descripcion} />
        </div>
    );
};

export default HeroServicio;
