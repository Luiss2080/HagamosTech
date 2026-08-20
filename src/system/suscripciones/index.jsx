import React, { useState, useMemo, useEffect } from 'react';
import { BreadcrumbHeader } from '../components/layouts/Sidebar';
import Pagination from '../components/Pagination';
import SuscripcionsLista from './pages/lista';
import SuscripcionCreateView from './pages/create';
import SuscripcionEditView from './pages/edit';
import SuscripcionShowView from './pages/show';
import DeleteModal from '../components/mod/delete';

const Suscripciones = ({
  suscripcionForm,
  setSuscripcionForm,
  submitSuscripcion,
  eliminarSuscripcion,
  suscripciones,
  usuarios,
  buscarSuscripcion,
  setBuscarSuscripcion,
  cargarSuscripciones,
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

  const [suscripcionDetail, setSuscripcionDetail] = useState(null);
  const [suscripcionToDelete, setSuscripcionToDelete] = useState(null);

  const handleViewDetail = (suscripcion) => {
    setSuscripcionDetail(suscripcion);
    setCurrentView('show');
  };

  useEffect(() => {
    if (initialView) {
      setCurrentView(initialView);
    }
  }, [initialView]);

  useEffect(() => {
    setCurrentPage(1);
  }, [buscarSuscripcion, searchCriterion, sortPreset, sortDirection]);

  // Filtra las suscripciones
  const suscripcionesFiltradas = useMemo(() => {
    if (!suscripciones || !Array.isArray(suscripciones)) return [];
    
    let result = [...suscripciones];
    
    if (buscarSuscripcion && buscarSuscripcion.trim()) {
      const term = buscarSuscripcion.toLowerCase();
      if (searchCriterion === 'nombre') {
        result = result.filter(c => c.nombre && c.nombre.toLowerCase().includes(term));
      } else if (searchCriterion === 'correo') {
        result = result.filter(c => c.correo && c.correo.toLowerCase().includes(term));
      } else if (searchCriterion === 'estado') {
        result = result.filter(c => c.estado && c.estado.toLowerCase().includes(term));
      } else {
        result = result.filter(c =>
          (c.nombre && c.nombre.toLowerCase().includes(term)) ||
          (c.correo && c.correo.toLowerCase().includes(term)) ||
          (c.estado && c.estado.toLowerCase().includes(term))
        );
      }
    }

    // Ordenar dinámicamente
    result.sort((a, b) => {
      let comparison = 0;
      if (sortPreset === 'antiguos') {
        const nameA = (a.nombre || '').toLowerCase();
        const nameB = (b.nombre || '').toLowerCase();
        comparison = nameA.localeCompare(nameB);
      } else {
        comparison = a.id - b.id;
      }
      return sortDirection === 'desc' ? -comparison : comparison;
    });

    return result;
  }, [suscripciones, buscarSuscripcion, searchCriterion, sortPreset, sortDirection]);

  const totalPages = Math.ceil(suscripcionesFiltradas.length / itemsPerPage) || 1;
  const paginatedSuscripciones = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return suscripcionesFiltradas.slice(start, start + itemsPerPage);
  }, [suscripcionesFiltradas, currentPage]);

  const handleStartEdit = (suscripcion) => {
    if (!suscripcion) return;
    setSuscripcionForm({
      id: suscripcion.id,
      usuarioId: suscripcion.usuarioId || '',
      estado: suscripcion.estado || 'invitado',
      fechaFinPrueba: suscripcion.fechaFinPrueba || '',
      nombre: suscripcion.nombre || '',
      correo: suscripcion.correo || ''
    });
    setCurrentView('edit');
  };

  const handleStartCreate = () => {
    setSuscripcionForm({
      usuarioId: '',
      estado: 'invitado',
      diasPrueba: 3,
      nombre: '',
      correo: ''
    });
    setCurrentView('create');
  };

  const handleBackToList = () => {
    cargarSuscripciones();
    setCurrentView('index');
  };

  const handleFormSubmit = async (e) => {
    await submitSuscripcion(e);
    handleBackToList();
  };

  return (
    <div className="space-y-4 font-montserrat w-full">
      
      {currentView === 'index' && (
        <>
          <BreadcrumbHeader
            icon={"fas fa-id-card"}
            breadcrumbs={[
              { label: 'Sistema', onClick: () => setActiveTab && setActiveTab('inicio') },
              { label: 'Administración' },
              { label: 'Suscripciones' }
            ]}
            title={"Directorio de Suscripciones"}
            subtitle={"Gestione las suscripciones, accesos y periodos de prueba de los usuarios registrados."}
            actionButtonText={"Nueva Suscripción"}
            onActionClick={handleStartCreate}
          />

          <SuscripcionsLista
            suscripcionesFiltradas={suscripcionesFiltradas}
            paginatedSuscripciones={paginatedSuscripciones}
            onViewDetail={handleViewDetail}
            onEdit={handleStartEdit}
            onDelete={(c) => setSuscripcionToDelete(c)}
            buscarSuscripcion={buscarSuscripcion}
            setBuscarSuscripcion={setBuscarSuscripcion}
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
              totalItems={suscripcionesFiltradas.length}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
              itemLabel={"suscripciones"}
            />
          </div>
        </>
      )}

      {currentView === 'create' && (
        <SuscripcionCreateView
          suscripcionForm={suscripcionForm}
          setSuscripcionForm={setSuscripcionForm}
          submitSuscripcion={handleFormSubmit}
          onBackToList={handleBackToList}
          usuarios={usuarios}
        />
      )}

      {currentView === 'edit' && (
        <SuscripcionEditView
          suscripcionForm={suscripcionForm}
          setSuscripcionForm={setSuscripcionForm}
          submitSuscripcion={handleFormSubmit}
          onBackToList={handleBackToList}
          usuarios={usuarios}
        />
      )}

      {currentView === 'show' && suscripcionDetail && (
        <SuscripcionShowView
          suscripcion={suscripcionDetail}
          onBackToList={handleBackToList}
          onEdit={(c) => handleStartEdit(c)}
        />
      )}

      <DeleteModal
        isOpen={!!suscripcionToDelete}
        onClose={() => setSuscripcionToDelete(null)}
        onConfirm={async () => {
          if (suscripcionToDelete) {
            await eliminarSuscripcion(suscripcionToDelete);
            setSuscripcionToDelete(null);
          }
        }}
        title={"¿Finalizar periodo de invitado / Vencer suscripción?"}
        message={`¿Está completamente seguro de que desea marcar el estado de "${suscripcionToDelete?.nombre}" como vencido? Perderá el acceso restringido.`}
        itemName={suscripcionToDelete?.nombre}
        itemIcon={"fas fa-user-xmark"}
      />

    </div>
  );
};

export default Suscripciones;






















