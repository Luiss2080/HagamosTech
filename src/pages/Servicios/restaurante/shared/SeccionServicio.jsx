import React from 'react';
import CircuitBackground from '../../../../components/fondos/FondoSaltenas';
import SectionHeader from './SectionHeader';

const SeccionServicio = ({ badge, badgeIcon, titulo, resaltado, descripcion, children, maxWidth = 'max-w-7xl' }) => {
    return (
        <div className="relative">
            <section className="relative z-10 py-4">
                <CircuitBackground />
                <div className={`container mx-auto px-6 ${maxWidth} relative z-20`}>
                    <SectionHeader
                        badge={badge}
                        badgeIcon={badgeIcon}
                        titulo={titulo}
                        resaltado={resaltado}
                        descripcion={descripcion}
                    />
                    <div className="mt-2">{children}</div>
                </div>
            </section>
        </div>
    );
};

export default SeccionServicio;
