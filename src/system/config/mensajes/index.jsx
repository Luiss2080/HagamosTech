import React from 'react';
import { BreadcrumbHeader } from '../../components/layouts/Sidebar';
import EnDesarrollo from '../../components/EnDesarrollo';

const MensajesConfig = ({ setActiveTab }) => {
  return (
    <div className="space-y-4 font-montserrat w-full">
      <BreadcrumbHeader
        icon="fas fa-envelope"
        breadcrumbs={[
          { label: 'Sistema', onClick: () => setActiveTab && setActiveTab('inicio') },
          { label: 'Ajustes' },
          { label: 'Mensajes' }
        ]}
        title="Bandeja de Mensajes"
        subtitle="Consulte los mensajes y consultas enviadas desde el formulario de contacto del sitio."
      />
      <EnDesarrollo
        icon="fas fa-envelope-open-text"
        title="Bandeja de Mensajes"
        subtitle="Gestiona los mensajes recibidos desde el formulario de contacto y realiza seguimiento de consultas."
      />
    </div>
  );
};

export default MensajesConfig;






















