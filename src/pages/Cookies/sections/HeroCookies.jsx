import React from 'react';
import PageHero from '../../../components/func/MigasPan';
import CircuitBackground from '../../../components/fondos/FondoTech';

const HeroCookies = () => {
    return (
        <div className="relative z-10">
            <CircuitBackground />
            <PageHero
                title="Política de"
                highlight="Cookies."
                description="Te contamos qué almacenamiento usa HagamosTech para el acceso a tu cuenta y las preferencias del navegador."
            />
        </div>
    );
};

export default HeroCookies;
