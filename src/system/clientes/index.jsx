import React, { useState, useMemo, useEffect } from 'react';
import { BreadcrumbHeader } from '../components/layouts/Sidebar';
import Pagination from '../components/Pagination';
import ClientesLista from './pages/lista';
import ClienteCreateView from './pages/create';
import ClienteEditView from './pages/edit';
import ClienteShowView from './pages/show';
import DeleteModal from '../components/mod/delete';

const Clientes = ({
  clienteForm,
  setClienteForm,
  submitCliente,
  eliminarCliente,
  clientes,
  buscarCliente,
  setBuscarCliente,
  cargarClientes,
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

  const [clienteDetail, setClienteDetail] = useState(null);
  const [clienteToDelete, setClienteToDelete] = useState(null);

  const handleViewDetail = (c) => {
    setClienteDetail(c);
    setCurrentView('show');
  };

  useEffect(() => {
    if (initialView) {
      setCurrentView(initialView);
    }
  }, [initialView]);

  useEffect(() => {
    setCurrentPage(1);
  }, [buscarCliente, searchCriterion, sortPreset, sortDirection, activeTab]);

  // Convierte los datos del contacto JSON de manera segura
  const parsedClientes = useMemo(() => {
    if (!clientes || !Array.isArray(clientes)) return [];
    return clientes.map(c => {
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
  }, [clientes]);

  // Filtra los clientes dependiendo del tab activo (colegios o clientes naturales)
  const clientesFiltrados = useMemo(() => {
    const isColegiosTab = activeTab === 'colegios';
    const filtered = parsedClientes.filter(c => {
      if (!c || !c.nombre) return false;
      const esJuridico = !!(c.parsed.nit || c.nombre.toLowerCase().includes('colegio') || c.nombre.toLowerCase().includes('s.r.l.'));
      return isColegiosTab ? esJuridico : !esJuridico;
    });

    let result = filtered;
    if (buscarCliente && buscarCliente.trim()) {
      const term = buscarCliente.toLowerCase();
      if (searchCriterion === 'nombre') {
        result = filtered.filter(c => c.nombre && c.nombre.toLowerCase().includes(term));
      } else if (searchCriterion === 'documento') {
        result = filtered.filter(c => (c.parsed.documento || '').toLowerCase().includes(term));
      } else {
        result = filtered.filter(c =>
          (c.nombre && c.nombre.toLowerCase().includes(term)) ||
          (c.parsed.documento || '').toLowerCase().includes(term) ||
          (c.parsed.correo || '').toLowerCase().includes(term)
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
  }, [parsedClientes, buscarCliente, searchCriterion, activeTab, sortPreset, sortDirection]);

  const totalPages = Math.ceil(clientesFiltrados.length / itemsPerPage) || 1;
  const paginatedClients = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return clientesFiltrados.slice(start, start + itemsPerPage);
  }, [clientesFiltrados, currentPage]);

  const handleStartEdit = (client) => {
    if (!client) return;
    setClienteForm({
      id: client.id,
      tipoCliente: client.parsed?.tipoCliente || (activeTab === 'colegios' ? 'JURIDICO' : 'NATURAL'),
      nombre: client.nombre || '',
      correo: client.parsed?.correo || '',
      telefono: client.parsed?.telefono || '',
      direccion: client.parsed?.direccion || '',
      documento: client.parsed?.documento || client.parsed?.nit || '',
      complemento: client.parsed?.complemento || '',
      ciudad: client.parsed?.ciudad || 'La Paz',
      rubro: client.parsed?.rubro || 'Educación',
      estado: client.parsed?.estado || 'Activo',
      observaciones: client.parsed?.observaciones || ''
    });
    setCurrentView('edit');
  };

  const handleStartCreate = () => {
    setClienteForm({
      tipoCliente: activeTab === 'colegios' ? 'JURIDICO' : 'NATURAL',
      nombre: '',
      correo: '',
      telefono: '',
      direccion: '',
      documento: '',
      complemento: '',
      ciudad: 'La Paz',
      rubro: activeTab === 'colegios' ? 'Educacion' : 'Particular',
      estado: 'Activo',
      observaciones: ''
    });
    setCurrentView('create');
  };

  const handleBackToList = () => {
    cargarClientes();
    if (activeTab === 'registrar-cliente' && setActiveTab) {
      setActiveTab('clientes');
    }
    setCurrentView('index');
  };

  const handleFormSubmit = async (e) => {
    await submitCliente(e);
    handleBackToList();
  };

  const isColegiosTab = activeTab === 'colegios';

  return (
    <div className="space-y-4 font-montserrat w-full">
      
      {currentView === 'index' && (
        <>
          <BreadcrumbHeader
            icon={isColegiosTab ? "fas fa-school" : "fas fa-address-book"}
            breadcrumbs={[
              { label: 'Sistema', onClick: () => setActiveTab && setActiveTab('inicio') },
              { label: 'Comercial' },
              { label: isColegiosTab ? 'Colegios' : 'Clientes' }
            ]}
            title={isColegiosTab ? "Directorio General de Colegios" : "Directorio General de Clientes"}
            subtitle={isColegiosTab ? "Consulte, administre y cree las fichas comerciales de colegios y clientes jurídicos." : "Consulte, administre y cree las fichas comerciales de clientes naturales."}
            actionButtonText={isColegiosTab ? "Registrar Colegio" : "Registrar Cliente"}
            onActionClick={handleStartCreate}
          />

          <ClientesLista
            clientesFiltrados={clientesFiltrados}
            paginatedClients={paginatedClients}
            onViewDetail={handleViewDetail}
            onEdit={handleStartEdit}
            onDelete={(c) => setClienteToDelete(c)}
            buscarCliente={buscarCliente}
            setBuscarCliente={setBuscarCliente}
            searchCriterion={searchCriterion}
            setSearchCriterion={setSearchCriterion}
            sortPreset={sortPreset}
            setSortPreset={setSortPreset}
            sortDirection={sortDirection}
            setSortDirection={setSortDirection}
            onSearch={() => setCurrentPage(1)}
            onNavigateToJuridico={() => setActiveTab && setActiveTab('colegios')}
            isColegiosTab={isColegiosTab}
            onNavigateToNatural={() => setActiveTab && setActiveTab('clientes')}
          />

          <div className="bg-white dark:bg-[#040408] dark:border-white/8 rounded-2xl p-5 shadow-xl dark:shadow-black/60 border border-slate-200/60 dark:border-white/5 border-l-4 border-l-[#E95A0C] text-center w-full">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={clientesFiltrados.length}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
              itemLabel={isColegiosTab ? "colegios" : "clientes"}
            />
          </div>
        </>
      )}

      {currentView === 'create' && (
        <ClienteCreateView
          clienteForm={clienteForm}
          setClienteForm={setClienteForm}
          submitCliente={handleFormSubmit}
          onBackToList={handleBackToList}
          activeTab={activeTab}
        />
      )}

      {currentView === 'edit' && (
        <ClienteEditView
          clienteForm={clienteForm}
          setClienteForm={setClienteForm}
          submitCliente={handleFormSubmit}
          onBackToList={handleBackToList}
          activeTab={activeTab}
        />
      )}

      {currentView === 'show' && clienteDetail && (
        <ClienteShowView
          client={clienteDetail}
          onBackToList={handleBackToList}
          onEdit={(c) => handleStartEdit(c)}
          activeTab={activeTab}
        />
      )}

      <DeleteModal
        isOpen={!!clienteToDelete}
        onClose={() => setClienteToDelete(null)}
        onConfirm={async () => {
          if (clienteToDelete) {
            await eliminarCliente(clienteToDelete);
            setClienteToDelete(null);
          }
        }}
        title={isColegiosTab ? "¿Eliminar Registro de Colegio?" : "¿Eliminar Registro de Cliente?"}
        message="¿Está completamente seguro de que desea dar de baja a este cliente? Se desvinculará de las carpetas de ventas y registros activos."
        itemName={clienteToDelete?.nombre}
        itemIcon={isColegiosTab ? "fas fa-school" : "fas fa-user"}
      />

    </div>
  );
};

export default Clientes;






















