import React from 'react';
import PageHero from '../../../components/func/MigasPan';

const EncabezadoInstitucional = ({ title, description, icon = 'fa-circle-info' }) => (
    <PageHero
        paths={[{ label: 'Sobre nosotros', url: '/sobre-nosotros' }, { label: title }]}
        badgeText="HAGAMOSTECH"
        icon={icon}
        title={title}
        description={description}
        className="bg-[#050505] border-b border-white/10"
    />
);

export default EncabezadoInstitucional;
