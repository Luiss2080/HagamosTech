import React from 'react';
import PageHero from '../../../components/func/MigasPan';
import CircuitBackground from '../../../components/fondos/FondoTech';

const HeroPromociones = () => {
    return (
        <div className="relative z-10">
            <CircuitBackground />
            <PageHero
                title="Conversemos sobre"
                highlight="tu proyecto."
                description="Acompañamiento académico, diseño y desarrollo digital para personas, emprendimientos e instituciones. Revisamos tu necesidad y conversamos alternativas, alcance y presupuesto según tus posibilidades."
            />
        </div>
    );
};

export default HeroPromociones;
