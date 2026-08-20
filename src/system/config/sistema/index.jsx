import React from 'react';
import { BreadcrumbHeader } from '../../components/layouts/Sidebar';
import EnDesarrollo from '../../components/EnDesarrollo';

const SistemaConfig = ({ setActiveTab }) => {
  return (
    <div className="space-y-4 font-montserrat w-full">
      <BreadcrumbHeader
        icon="fas fa-server"
        breadcrumbs={[
          { label: 'Sistema', onClick: () => setActiveTab && setActiveTab('inicio') },
          { label: 'Ajustes' },
          { label: 'Sistema' }
        ]}
        title="Información del Sistema"
        subtitle="Estado del servidor, base de datos y herramientas de mantenimiento."
      />
      <EnDesarrollo
        icon="fas fa-server"
        title="Información del Sistema"
        subtitle="Monitorea el estado del servidor, la base de datos y accede a herramientas de mantenimiento."
      />
    </div>
  );
};

export default SistemaConfig;






















