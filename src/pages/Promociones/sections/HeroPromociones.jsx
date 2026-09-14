import React from 'react';
import PageHero from '../../../components/func/MigasPan';
import CircuitBackground from '../../../components/fondos/FondoTech';

const HeroPromociones = () => {
    return (
        <div className="relative z-10">
            <CircuitBackground />
            <PageHero
                title="Aprovecha nuestras"
                highlight="promociones."
                description="Packs, planes de soporte y promociones pensadas para emprendedores, estudiantes y empresas: diseño, desarrollo web, automatización e IA a precio accesible."
            />
        </div>
    );
};

export default HeroPromociones;
