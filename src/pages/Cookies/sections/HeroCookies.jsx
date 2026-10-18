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
                description="La aplicación puede utilizar una cookie para mantener la sesión de tu cuenta. También puede guardar algunas preferencias en el navegador. Podés revisar o borrar estos datos desde la configuración de tu navegador."
            />
        </div>
    );
};

export default HeroCookies;
