import React from 'react';
import { BreadcrumbHeader } from '../../components/layouts/Sidebar';
import EnDesarrollo from '../../components/EnDesarrollo';

const PerfilConfig = ({ setActiveTab }) => {
  return (
    <div className="space-y-4 font-montserrat w-full">
      <BreadcrumbHeader
        icon="fas fa-id-card"
        breadcrumbs={[
          { label: 'Sistema', onClick: () => setActiveTab && setActiveTab('inicio') },
          { label: 'Ajustes' },
          { label: 'Perfil' }
        ]}
        title="Mi Perfil"
        subtitle="Información personal y configuración de la cuenta del usuario."
      />
      <EnDesarrollo
        icon="fas fa-user-circle"
        title="Mi Perfil"
        subtitle="Administra tu información personal, cambia tu contraseña y personaliza tu experiencia."
      />
    </div>
  );
};

export default PerfilConfig;






















