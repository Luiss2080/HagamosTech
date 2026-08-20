import React from 'react';
import PageHero from '../../../components/func/MigasPan';
import CircuitBackground from '../../../components/fondos/FondoSaltenas';

const HeroPrivacidad = () => {
    return (
        <div className="relative z-10">
            <CircuitBackground />
            <PageHero
                title="Política de"
                highlight="Privacidad."
                description="En Los Castores nos tomamos muy en serio la protección de tus datos personales. Conocé cómo recopilamos, usamos y protegemos tu información."
            />
        </div>
    );
};

export default HeroPrivacidad;
