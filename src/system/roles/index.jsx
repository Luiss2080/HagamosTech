import React, { useState, useMemo, useEffect } from 'react';
import { BreadcrumbHeader } from '../components/layouts/Sidebar';
import Pagination from '../components/Pagination';
import RolesLista from './pages/lista';
import RolCreateView from './pages/create';
import RolEditView from './pages/edit';
import RolShowView from './pages/show';
import DeleteModal from '../components/mod/delete';

const Roles = ({
  rolForm,
  setRolForm,
  submitRol,
  eliminarRol,
  roles,
  cargarRoles,
  initialView = 'index',
  setActiveTab,
  activeTab,
  rolEditando,
  setRolEditando,
  usuarios,
  permisos
}) => {
  const [currentView, setCurrentView] = useState(initialView);
  const [buscarRol, setBuscarRol] = useState('');
  const [searchCriterion, setSearchCriterion] = useState('general');
  const [sortPreset, setSortPreset] = useState('recientes');
  const [sortDirection, setSortDirection] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [rolDetail, setRolDetail] = useState(null);
  const [rolToDelete, setRolToDelete] = useState(null);

  const handleViewDetail = (r) => {
    setRolDetail(r);
    setCurrentView('show');
  };

  useEffect(() => {
    if (initialView) {
      setCurrentView(initialView);
    }
  }, [initialView]);

  useEffect(() => {
    setCurrentPage(1);
  }, [buscarRol, searchCriterion, sortPreset, sortDirection, activeTab]);

  // Filtra los roles según los criterios de búsqueda local
  const rolesFiltrados = useMemo(() => {
    if (!roles || !Array.isArray(roles)) return [];
    let filtered = [...roles];
    if (buscarRol && buscarRol.trim()) {
      const term = buscarRol.toLowerCase();
      filtered = filtered.filter(r => r.nombre && r.nombre.toLowerCase().includes(term));
    }

    // Ordenar dinámicamente
    filtered.sort((a, b) => {
      let comparison = 0;
      if (sortPreset === 'nombre_az') {
        const nameA = (a.nombre || '').toLowerCase();
        const nameB = (b.nombre || '').toLowerCase();
        comparison = nameA.localeCompare(nameB);
      } else {
        comparison = a.id - b.id;
      }
      return sortDirection === 'desc' ? -comparison : comparison;
    });

    return filtered;
  }, [roles, buscarRol, searchCriterion, sortPreset, sortDirection]);

  const totalPages = Math.ceil(rolesFiltrados.length / itemsPerPage) || 1;
  const paginatedRoles = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return rolesFiltrados.slice(start, start + itemsPerPage);
  }, [rolesFiltrados, currentPage]);

  const handleStartEdit = (rol) => {
    if (!rol) return;
    setRolEditando(rol);
    setRolForm({
      id: rol.id,
      nombre: rol.nombre || '',
      permisoIds: (rol.detalleRolPermisos || []).map(drp => drp.fkIdP)
    });
    setCurrentView('edit');
  };

  const handleStartCreate = () => {
    setRolEditando(null);
    setRolForm({
      nombre: '',
      permisoIds: []
    });
    setCurrentView('create');
  };

  const handleBackToList = () => {
    if (cargarRoles) cargarRoles();
    setCurrentView('index');
  };

  const handleFormSubmit = async (e) => {
    await submitRol(e);
    handleBackToList();
  };

  return (
    <div className="space-y-4 font-montserrat w-full">
      {currentView === 'index' && (
        <>
          <BreadcrumbHeader
            icon="fas fa-user-shield"
            breadcrumbs={[
              { label: 'Sistema', onClick: () => setActiveTab && setActiveTab('inicio') },
              { label: 'Seguridad' },
              { label: 'Roles' }
            ]}
            title="Catálogo General de Roles"
            subtitle="Consulte, cree, edite y administre los roles de usuario y controle el acceso al sistema."
            actionButtonText="Nuevo Rol"
            onActionClick={handleStartCreate}
          />

          <RolesLista
            rolesFiltrados={rolesFiltrados}
            paginatedRoles={paginatedRoles}
            onViewDetail={handleViewDetail}
            onEdit={handleStartEdit}
            onDelete={(r) => setRolToDelete(r)}
            buscarRol={buscarRol}
            setBuscarRol={setBuscarRol}
            searchCriterion={searchCriterion}
            setSearchCriterion={setSearchCriterion}
            sortPreset={sortPreset}
            setSortPreset={setSortPreset}
            sortDirection={sortDirection}
            setSortDirection={setSortDirection}
            onSearch={() => setCurrentPage(1)}
          />

          <div className="bg-white dark:bg-[#040408] dark:border-white/8 rounded-2xl p-5 shadow-xl dark:shadow-black/60 border border-slate-200/60 dark:border-white/5 border-l-4 border-l-[#E95A0C] text-center w-full">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={rolesFiltrados.length}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
              itemLabel="roles"
            />
          </div>
        </>
      )}

      {currentView === 'create' && (
        <RolCreateView
          rolForm={rolForm}
          setRolForm={setRolForm}
          submitRol={handleFormSubmit}
          onBackToList={handleBackToList}
          permisos={permisos}
        />
      )}

      {currentView === 'edit' && (
        <RolEditView
          rolForm={rolForm}
          setRolForm={setRolForm}
          submitRol={handleFormSubmit}
          onBackToList={handleBackToList}
          permisos={permisos}
        />
      )}

      {currentView === 'show' && rolDetail && (
        <RolShowView
          rol={rolDetail}
          onBackToList={handleBackToList}
          onEdit={(r) => handleStartEdit(r)}
          usuarios={usuarios}
          permisos={permisos}
        />
      )}

      <DeleteModal
        isOpen={!!rolToDelete}
        onClose={() => setRolToDelete(null)}
        onConfirm={async () => {
          if (rolToDelete) {
            await eliminarRol(rolToDelete.id);
            setRolToDelete(null);
            if (cargarRoles) cargarRoles();
          }
        }}
        title="¿Eliminar Rol del Sistema?"
        message="¿Está completamente seguro de que desea eliminar este rol? Se desvinculará de los usuarios y accesos existentes."
        itemName={rolToDelete?.nombre}
        itemIcon="fas fa-user-tag"
      />
    </div>
  );
};

export default Roles;






















