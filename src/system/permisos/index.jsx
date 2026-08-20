import React, { useState, useMemo, useEffect } from 'react';
import { BreadcrumbHeader } from '../components/layouts/Sidebar';
import Pagination from '../components/Pagination';
import PermisosLista from './pages/lista';
import PermisoCreateView from './pages/create';
import PermisoEditView from './pages/edit';
import PermisoShowView from './pages/show';
import DeleteModal from '../components/mod/delete';
import { filtrarPorCategoria } from './constantes';

const Permisos = ({
  permisoForm,
  setPermisoForm,
  submitPermiso,
  eliminarPermiso,
  permisosDisponibles = [],
  cargarPermisos,
  initialView = 'index',
  setActiveTab,
  activeTab,
  permisoEditando,
  setPermisoEditando,
  matrizPermisos = []
}) => {
  const [currentView, setCurrentView] = useState(initialView);
  const [buscarPermiso, setBuscarPermiso] = useState('');
  const [searchCriterion, setSearchCriterion] = useState('general');
  const [sortPreset, setSortPreset] = useState('recientes');
  const [sortDirection, setSortDirection] = useState('desc');
  const [categoria, setCategoria] = useState('todas');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [permisoDetail, setPermisoDetail] = useState(null);
  const [permisoToDelete, setPermisoToDelete] = useState(null);

  const handleViewDetail = (p) => {
    setPermisoDetail(p);
    setCurrentView('show');
  };

  useEffect(() => {
    if (initialView) {
      setCurrentView(initialView);
    }
  }, [initialView]);

  useEffect(() => {
    setCurrentPage(1);
  }, [buscarPermiso, searchCriterion, sortPreset, sortDirection, categoria, activeTab]);

  // Filtra los permisos según los criterios de búsqueda y categoría local
  const permisosFiltrados = useMemo(() => {
    if (!permisosDisponibles || !Array.isArray(permisosDisponibles)) return [];
    let filtered = [...permisosDisponibles];
    if (buscarPermiso && buscarPermiso.trim()) {
      const term = buscarPermiso.toLowerCase();
      filtered = filtered.filter(p => p.nombre && p.nombre.toLowerCase().includes(term));
    }
    filtered = filtrarPorCategoria(filtered, categoria);

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
  }, [permisosDisponibles, buscarPermiso, categoria, sortPreset, sortDirection]);

  const totalPages = Math.ceil(permisosFiltrados.length / itemsPerPage) || 1;
  const paginatedPermisos = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return permisosFiltrados.slice(start, start + itemsPerPage);
  }, [permisosFiltrados, currentPage]);

  const handleStartEdit = (p) => {
    if (!p) return;
    setPermisoEditando(p);
    setPermisoForm({
      id: p.id,
      nombre: p.nombre || ''
    });
    setCurrentView('edit');
  };

  const handleStartCreate = () => {
    setPermisoEditando(null);
    setPermisoForm({
      nombre: ''
    });
    setCurrentView('create');
  };

  const handleBackToList = () => {
    if (cargarPermisos) cargarPermisos();
    setCurrentView('index');
  };

  const handleFormSubmit = async (e) => {
    await submitPermiso(e);
    handleBackToList();
  };

  return (
    <div className="space-y-4 font-montserrat w-full">
      {currentView === 'index' && (
        <>
          <BreadcrumbHeader
            icon="fas fa-key"
            breadcrumbs={[
              { label: 'Sistema', onClick: () => setActiveTab && setActiveTab('inicio') },
              { label: 'Seguridad' },
              { label: 'Permisos' }
            ]}
            title="Catálogo General de Permisos"
            subtitle="Consulte, cree, edite y administre las llaves de seguridad y accesos operativos del sistema."
            actionButtonText="Nuevo Permiso"
            onActionClick={handleStartCreate}
          />

          <PermisosLista
            permisosFiltrados={permisosFiltrados}
            paginatedPermisos={paginatedPermisos}
            onViewDetail={handleViewDetail}
            onEdit={handleStartEdit}
            onDelete={(p) => setPermisoToDelete(p)}
            categoria={categoria}
            setCategoria={setCategoria}
            buscarPermiso={buscarPermiso}
            setBuscarPermiso={setBuscarPermiso}
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
              totalItems={permisosFiltrados.length}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
              itemLabel="permisos"
            />
          </div>
        </>
      )}

      {currentView === 'create' && (
        <PermisoCreateView
          permisoForm={permisoForm}
          setPermisoForm={setPermisoForm}
          submitPermiso={handleFormSubmit}
          onBackToList={handleBackToList}
        />
      )}

      {currentView === 'edit' && (
        <PermisoEditView
          permisoForm={permisoForm}
          setPermisoForm={setPermisoForm}
          submitPermiso={handleFormSubmit}
          onBackToList={handleBackToList}
        />
      )}

      {currentView === 'show' && permisoDetail && (
        <PermisoShowView
          permiso={permisoDetail}
          onBackToList={handleBackToList}
          onEdit={(p) => handleStartEdit(p)}
          matrizPermisos={matrizPermisos}
        />
      )}

      <DeleteModal
        isOpen={!!permisoToDelete}
        onClose={() => setPermisoToDelete(null)}
        onConfirm={async () => {
          if (permisoToDelete) {
            await eliminarPermiso(permisoToDelete.id);
            setPermisoToDelete(null);
            if (cargarPermisos) cargarPermisos();
          }
        }}
        title="¿Eliminar Permiso del Sistema?"
        message="¿Está completamente seguro de que desea eliminar este permiso? Se desvinculará de todos los roles asociados."
        itemName={permisoToDelete?.nombre}
        itemIcon="fas fa-key"
      />
    </div>
  );
};

export default Permisos;






















