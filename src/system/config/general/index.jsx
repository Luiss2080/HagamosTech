import React from 'react';
import { BreadcrumbHeader } from '../../components/layouts/Sidebar';
import EnDesarrollo from '../../components/EnDesarrollo';

const GeneralConfig = ({ setActiveTab }) => {
  return (
    <div className="space-y-4 font-montserrat w-full">
      <BreadcrumbHeader
        icon="fas fa-cog"
        breadcrumbs={[
          { label: 'Sistema', onClick: () => setActiveTab && setActiveTab('inicio') },
          { label: 'Ajustes' },
          { label: 'General' }
        ]}
        title="Configuración General"
        subtitle="Parámetros globales del sistema y preferencias de la plataforma."
      />
      <EnDesarrollo
        icon="fas fa-sliders"
        title="Configuración General"
        subtitle="Personaliza los parámetros globales, preferencias y apariencia del sistema."
      />
    </div>
  );
};

export default GeneralConfig;






















