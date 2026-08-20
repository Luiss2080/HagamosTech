import React from 'react';
import PageHero from '../../../components/func/MigasPan';
import CircuitBackground from '../../../components/fondos/FondoSaltenas';

const HeroPromociones = () => {
    return (
        <div className="relative z-10">
            <CircuitBackground />
            <PageHero
                title="Aprovecha nuestras"
                highlight="promociones."
                description="Combos especiales, descuentos por mayor y ofertas de temporada para que disfrutes el verdadero sabor tradicional de HagamosTech al mejor precio."
            />
        </div>
    );
};

export default HeroPromociones;
