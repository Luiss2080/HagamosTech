import React, { useState, useMemo, useEffect } from 'react';
import { BreadcrumbHeader } from '../components/layouts/Sidebar';
import Pagination from '../components/Pagination';
import ColegiosLista from './pages/lista';
import ColegioCreateView from './pages/create';
import ColegioEditView from './pages/edit';
import ColegioShowView from './pages/show';
import DeleteModal from '../components/mod/delete';

const Colegios = ({
  colegioForm,
  setColegioForm,
  submitColegio,
  eliminarColegio,
  colegios,
  buscarColegio,
  setBuscarColegio,
  cargarColegios,
  initialView = 'index',
  setActiveTab,
  activeTab
}) => {
  const [currentView, setCurrentView] = useState(initialView);
  const [searchCriterion, setSearchCriterion] = useState('general');
  const [sortPreset, setSortPreset] = useState('recientes');
  const [sortDirection, setSortDirection] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [colegioDetail, setColegioDetail] = useState(null);
  const [colegioToDelete, setColegioToDelete] = useState(null);

  const handleViewDetail = (c) => {
    setColegioDetail(c);
    setCurrentView('show');
  };

  useEffect(() => {
    if (initialView) {
      setCurrentView(initialView);
    }
  }, [initialView]);

  useEffect(() => {
    setCurrentPage(1);
  }, [buscarColegio, searchCriterion, sortPreset, sortDirection]);

  // Convierte los datos del contacto JSON de manera segura
  const parsedColegios = useMemo(() => {
    if (!colegios || !Array.isArray(colegios)) return [];
    return colegios.map(c => {
      if (!c) return { parsed: { correo: '', telefono: '', direccion: '', documento: '', nit: '' } };
      let parsed = { correo: '', telefono: '', direccion: '', documento: '', nit: '' };
      try {
        if (c.contacto) {
          const json = JSON.parse(c.contacto);
          parsed = { ...parsed, ...json };
        }
      } catch (e) {
        parsed.documento = c.contacto || 'N/A';
      }
      return { ...c, parsed };
    });
  }, [colegios]);

  // Filtra los colegios según los criterios de búsqueda local
  const colegiosFiltrados = useMemo(() => {
    let filtered = parsedColegios;
    if (buscarColegio && buscarColegio.trim()) {
      const term = buscarColegio.toLowerCase();
      if (searchCriterion === 'nombre') {
        filtered = parsedColegios.filter(c => c.nombre && c.nombre.toLowerCase().includes(term));
      } else {
        filtered = parsedColegios.filter(c =>
          (c.nombre && c.nombre.toLowerCase().includes(term)) ||
          (c.parsed.telefono || '').toLowerCase().includes(term) ||
          (c.parsed.direccion || '').toLowerCase().includes(term)
        );
      }
    }

    // Ordenar dinámicamente
    filtered = [...filtered];
    filtered.sort((a, b) => {
      let comparison = 0;
      if (sortPreset === 'recientes') {
        comparison = a.id - b.id;
      } else if (sortPreset === 'nombre_az') {
        const nameA = (a.nombre || '').toLowerCase();
        const nameB = (b.nombre || '').toLowerCase();
        comparison = nameA.localeCompare(nameB);
      }
      return sortDirection === 'desc' ? -comparison : comparison;
    });

    return filtered;
  }, [parsedColegios, buscarColegio, searchCriterion, sortPreset, sortDirection]);

  const totalPages = Math.ceil(colegiosFiltrados.length / itemsPerPage) || 1;
  const paginatedColegios = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return colegiosFiltrados.slice(start, start + itemsPerPage);
  }, [colegiosFiltrados, currentPage]);

  const handleStartEdit = (colegio) => {
    if (!colegio) return;
    setColegioForm({
      id: colegio.id,
      tipoCliente: 'JURIDICO',
      nombre: colegio.nombre || '',
      correo: colegio.parsed?.correo || '',
      telefono: colegio.parsed?.telefono || '',
      direccion: colegio.parsed?.direccion || '',
      documento: colegio.parsed?.documento || '',
      complemento: colegio.parsed?.complemento || '',
      ciudad: colegio.parsed?.ciudad || 'La Paz',
      rubro: colegio.parsed?.rubro || 'Educación',
      estado: colegio.parsed?.estado || 'Activo',
      observaciones: colegio.parsed?.observaciones || ''
    });
    setCurrentView('edit');
  };

  const handleStartCreate = () => {
    setColegioForm({
      tipoCliente: 'JURIDICO',
      nombre: '',
      correo: '',
      telefono: '',
      direccion: '',
      documento: '',
      complemento: '',
      ciudad: 'La Paz',
      rubro: 'Educación',
      estado: 'Activo',
      observaciones: ''
    });
    setCurrentView('create');
  };

  const handleBackToList = () => {
    cargarColegios();
    setCurrentView('index');
  };

  const handleFormSubmit = async (e) => {
    await submitColegio(e);
    handleBackToList();
  };

  return (
    <div className="space-y-4 font-montserrat w-full">
      
      {currentView === 'index' && (
        <>
          <BreadcrumbHeader
            icon="fas fa-school"
            breadcrumbs={[
              { label: 'Sistema', onClick: () => setActiveTab && setActiveTab('inicio') },
              { label: 'Comercial' },
              { label: 'Colegios' }
            ]}
            title="Directorio General de Colegios"
            subtitle="Consulte, administre y cree las fichas comerciales de colegios e instituciones asociadas."
            actionButtonText="Registrar Colegio"
            onActionClick={handleStartCreate}
          />

          <ColegiosLista
            colegiosFiltrados={colegiosFiltrados}
            paginatedColegios={paginatedColegios}
            onViewDetail={handleViewDetail}
            onEdit={handleStartEdit}
            onDelete={(c) => setColegioToDelete(c)}
            buscarColegio={buscarColegio}
            setBuscarColegio={setBuscarColegio}
            searchCriterion={searchCriterion}
            setSearchCriterion={setSearchCriterion}
            sortPreset={sortPreset}
            setSortPreset={setSortPreset}
            sortDirection={sortDirection}
            setSortDirection={setSortDirection}
            onSearch={() => setCurrentPage(1)}
            onNavigateToClientes={() => setActiveTab && setActiveTab('clientes')}
          />

          <div className="bg-white dark:bg-[#040408] dark:border-white/8 rounded-2xl p-5 shadow-xl dark:shadow-black/60 border border-slate-200/60 dark:border-white/5 border-l-4 border-l-[#E95A0C] text-center w-full">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={colegiosFiltrados.length}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
              itemLabel="colegios"
            />
          </div>
        </>
      )}

      {currentView === 'create' && (
        <ColegioCreateView
          colegioForm={colegioForm}
          setColegioForm={setColegioForm}
          submitColegio={handleFormSubmit}
          onBackToList={handleBackToList}
        />
      )}

      {currentView === 'edit' && (
        <ColegioEditView
          colegioForm={colegioForm}
          setColegioForm={setColegioForm}
          submitColegio={handleFormSubmit}
          onBackToList={handleBackToList}
        />
      )}

      {currentView === 'show' && colegioDetail && (
        <ColegioShowView
          colegio={colegioDetail}
          onBackToList={handleBackToList}
          onEdit={(c) => handleStartEdit(c)}
        />
      )}

      <DeleteModal
        isOpen={!!colegioToDelete}
        onClose={() => setColegioToDelete(null)}
        onConfirm={async () => {
          if (colegioToDelete) {
            await eliminarColegio(colegioToDelete);
            setColegioToDelete(null);
          }
        }}
        title="¿Eliminar Registro de Colegio?"
        message="¿Está completamente seguro de que desea dar de baja a este colegio? Se desvinculará de las carpetas de ventas y registros activos."
        itemName={colegioToDelete?.nombre}
        itemIcon="fas fa-school"
      />

    </div>
  );
};

export default Colegios;






















