import React from 'react';
import PageHero from '../../../components/func/MigasPan';
import CircuitBackground from '../../../components/fondos/FondoSaltenas';

const HeroTerminos = () => {
    return (
        <div className="relative z-10">
            <CircuitBackground />
            <PageHero
                title="Términos de"
                highlight="Servicio."
                description="Las condiciones que rigen el uso de nuestro sitio web y todos los servicios que ofrecemos en HagamosTech."
            />
        </div>
    );
};

export default HeroTerminos;
