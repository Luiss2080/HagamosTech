import React, { useState, useMemo, useEffect } from 'react';
import { BreadcrumbHeader } from '../components/layouts/Sidebar';
import Pagination from '../components/Pagination';
import UsuariosLista from './pages/lista';
import UsuarioCreateView from './pages/create';
import UsuarioEditView from './pages/edit';
import UsuarioShowView from './pages/show';
import DeleteModal from '../components/mod/delete';

const UsuariosRoles = ({
  usuarioForm,
  setUsuarioForm,
  submitUsuario,
  usuarios,
  roles,
  cambiarEstadoUsuario,
  usuarioEditando,
  setUsuarioEditando,
  cargarUsuarios,
  activeTab
}) => {
  const [currentView, setCurrentView] = useState('index');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [userSearch, setUserSearch] = useState('');
  const [searchCriterion, setSearchCriterion] = useState('general');
  const [sortPreset, setSortPreset] = useState('recientes');
  const [sortDirection, setSortDirection] = useState('desc');
  
  const [userDetail, setUserDetail] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);

  const usuariosFiltrados = useMemo(() => {
    let filtered = [...usuarios];
    if (userSearch.trim()) {
      const q = userSearch.toLowerCase();
      if (searchCriterion === 'nombre') {
        filtered = filtered.filter(u =>
          (u.nombre || '').toLowerCase().includes(q) ||
          (u.apellido || '').toLowerCase().includes(q)
        );
      } else if (searchCriterion === 'correo') {
        filtered = filtered.filter(u =>
          (u.correo || '').toLowerCase().includes(q)
        );
      } else {
        filtered = filtered.filter(u =>
          (u.nombre || '').toLowerCase().includes(q) ||
          (u.apellido || '').toLowerCase().includes(q) ||
          (u.usuario || '').toLowerCase().includes(q) ||
          (u.correo || '').toLowerCase().includes(q) ||
          (u.rolNombre || '').toLowerCase().includes(q)
        );
      }
    }

    filtered.sort((a, b) => {
      let comparison = 0;
      if (sortPreset === 'nombre_az') {
        const nameA = `${a.nombre || ''} ${a.apellido || ''}`.toLowerCase();
        const nameB = `${b.nombre || ''} ${b.apellido || ''}`.toLowerCase();
        comparison = nameA.localeCompare(nameB);
      } else {
        comparison = a.id - b.id;
      }
      return sortDirection === 'desc' ? -comparison : comparison;
    });

    return filtered;
  }, [usuarios, userSearch, searchCriterion, sortPreset, sortDirection]);

  const totalPages = Math.ceil(usuariosFiltrados.length / itemsPerPage) || 1;
  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return usuariosFiltrados.slice(start, start + itemsPerPage);
  }, [usuariosFiltrados, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [userSearch, searchCriterion, sortPreset, sortDirection, activeTab]);

  const handleStartCreate = () => {
    setUsuarioEditando(null);
    setUsuarioForm({
      usuario: '',
      nombre: '',
      apellido: '',
      numci: '',
      fenac: '',
      numtel: '',
      nomcol: '',
      correo: '',
      contrasena: '',
      rolId: '4'
    });
    setCurrentView('create');
  };

  const handleStartEdit = (u) => {
    setUsuarioEditando(u);
    setUsuarioForm({
      id: u.id,
      usuario: u.usuario || '',
      nombre: u.nombre || '',
      apellido: u.apellido || '',
      numci: u.numci || '',
      fenac: u.fenac ? (typeof u.fenac === 'string' ? u.fenac.slice(0, 10) : '') : '',
      numtel: u.numtel || '',
      nomcol: u.nomcol || '',
      correo: u.correo || '',
      contrasena: '',
      rolId: String(u.rolId || 4)
    });
    setCurrentView('edit');
  };

  const handleViewDetail = (u) => {
    setUserDetail(u);
    setCurrentView('show');
  };

  const handleBackToList = () => {
    if (cargarUsuarios) cargarUsuarios();
    setCurrentView('index');
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await submitUsuario(e);
    handleBackToList();
  };

  return (
    <div className="space-y-4 font-montserrat w-full">
      {currentView === 'index' && (
        <>
          <BreadcrumbHeader
            icon="fas fa-users"
            breadcrumbs={['Sistema', 'Seguridad', 'Usuarios']}
            title="Directorio de Usuarios"
            subtitle="Administre las cuentas del sistema, modifique datos de acceso y controle los estados."
            actionButtonText="Nuevo Usuario"
            onActionClick={handleStartCreate}
          />

          <UsuariosLista
            usuarios={usuarios}
            usuariosFiltrados={usuariosFiltrados}
            paginatedUsers={paginatedUsers}
            userSearch={userSearch}
            setUserSearch={setUserSearch}
            searchCriterion={searchCriterion}
            setSearchCriterion={setSearchCriterion}
            sortPreset={sortPreset}
            setSortPreset={setSortPreset}
            sortDirection={sortDirection}
            setSortDirection={setSortDirection}
            onViewDetail={handleViewDetail}
            onEdit={handleStartEdit}
            onDelete={(u) => setUserToDelete(u)}
            cambiarEstadoUsuario={cambiarEstadoUsuario}
            roles={roles}
            onStartCreate={handleStartCreate}
            onSearch={() => setCurrentPage(1)}
          />

          <div className="bg-white dark:bg-[#040408] dark:border-white/8 rounded-2xl p-5 shadow-xl dark:shadow-black/60 border border-slate-200/60 dark:border-white/5 border-l-4 border-l-[#E95A0C] text-center w-full">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={usuariosFiltrados.length}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
              itemLabel="usuarios"
            />
          </div>
        </>
      )}

      {currentView === 'create' && (
        <UsuarioCreateView
          usuarioForm={usuarioForm}
          setUsuarioForm={setUsuarioForm}
          submitUsuario={handleFormSubmit}
          onBackToList={handleBackToList}
          roles={roles}
        />
      )}

      {currentView === 'edit' && (
        <UsuarioEditView
          usuarioForm={usuarioForm}
          setUsuarioForm={setUsuarioForm}
          submitUsuario={handleFormSubmit}
          onBackToList={handleBackToList}
          roles={roles}
        />
      )}

      {currentView === 'show' && userDetail && (
        <UsuarioShowView
          user={userDetail}
          onBackToList={handleBackToList}
          onEdit={(u) => handleStartEdit(u)}
        />
      )}

      <DeleteModal
        isOpen={!!userToDelete}
        onClose={() => setUserToDelete(null)}
        onConfirm={async () => {
          if (userToDelete) {
            await cambiarEstadoUsuario(userToDelete.id, false);
            setUserToDelete(null);
          }
        }}
        title="¿Desactivar Cuenta de Usuario?"
        message="¿Está seguro de que desea desactivar esta cuenta? El usuario perderá temporalmente el acceso al panel administrativo."
        itemName={userToDelete ? `${userToDelete.nombre} ${userToDelete.apellido}` : ''}
        itemIcon="fas fa-user-lock"
      />
    </div>
  );
};

export default UsuariosRoles;






















