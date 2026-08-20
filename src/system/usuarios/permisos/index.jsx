import React from 'react';
import { BreadcrumbHeader } from '../../components/layouts/Sidebar';
import PermisosIndexView from '../../permisos/views/PermisosIndexView';

const Permisos = ({
  permisoForm,
  setPermisoForm,
  submitPermiso,
  permisosDisponibles
}) => {
  return (
    <div className="space-y-4 font-montserrat w-full">
      <BreadcrumbHeader
        icon="fas fa-key"
        breadcrumbs={['Sistema', 'Seguridad', 'Permisos']}
        title="Catálogo de Permisos del Sistema"
        subtitle="Defina y registre nuevos códigos de autorización para el control de accesos."
      />

      <PermisosIndexView
        permisoForm={permisoForm}
        setPermisoForm={setPermisoForm}
        submitPermiso={submitPermiso}
        permisosDisponibles={permisosDisponibles}
      />
    </div>
  );
};

export default Permisos;






















