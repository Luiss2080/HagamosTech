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
                description="Las cookies nos ayudan a que tu experiencia sea más rápida y personalizada. Elegí cuáles querés aceptar: todo está en tus manos."
            />
        </div>
    );
};

export default HeroCookies;
