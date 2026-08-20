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
                description="En HagamosTech nos tomamos muy en serio la protección de tus datos personales. Conocé cómo recopilamos, usamos y protegemos tu información."
            />
        </div>
    );
};

export default HeroPrivacidad;
