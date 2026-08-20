import React from 'react';
import { BreadcrumbHeader } from '../../components/layouts/Sidebar';
import MatrizPermisosView from '../../permisos/views/MatrizPermisosView';

const MatrizPermisos = ({
  permisos,
  matrizPermisos,
  togglePermisoRol
}) => {
  return (
    <div className="space-y-4 font-montserrat w-full">
      <BreadcrumbHeader
        icon="fas fa-table-cells"
        breadcrumbs={['Sistema', 'Seguridad', 'Matriz de Accesos']}
        title="Matriz de Asignación Rol - Permisos"
        subtitle="Conceda o revoque facultades operativas marcando las casillas por cada rol."
      />

      <MatrizPermisosView
        permisos={permisos}
        matrizPermisos={matrizPermisos}
        togglePermisoRol={togglePermisoRol}
      />
    </div>
  );
};

export default MatrizPermisos;






















