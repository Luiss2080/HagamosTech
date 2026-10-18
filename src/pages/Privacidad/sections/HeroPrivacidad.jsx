import React from 'react';
import PageHero from '../../../components/func/MigasPan';
import FondoTech from '../../../components/fondos/FondoTech';

const HeroPrivacidad = () => {
    return (
        <div className="relative z-10">
            <FondoTech />
            <PageHero
                title="Política de"
                highlight="Privacidad."
                description="Conocé qué información se usa al crear una cuenta, escribirnos o coordinar un servicio con HagamosTech."
            />
        </div>
    );
};

export default HeroPrivacidad;
