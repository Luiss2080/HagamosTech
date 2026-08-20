import React, { useState, useMemo, useEffect } from 'react';
import { BreadcrumbHeader } from '../components/layouts/Sidebar';
import Pagination from '../components/Pagination';
import KpiCard from '../components/KpiCard';
import SucursalesLista from './pages/lista';
import SucursalCreateView from './pages/create';
import SucursalEditView from './pages/edit';
import SucursalShowView from './pages/show';
import DeleteModal from '../components/mod/delete';

const FORM_VACIO = { nombre: '', ciudad: '', direccion: '', telefono: '', horario: '', servicios: '', activo: true };

const Sucursales = ({ setActiveTab, useSucursales, initialView = 'index' }) => {
  const { sucursales, cargarSucursales, crearSucursal, editarSucursal, eliminarSucursal } = useSucursales();

  const [currentView, setCurrentView] = useState(initialView);
  const [form, setForm] = useState(FORM_VACIO);
  const [editando, setEditando] = useState(null);
  const [buscar, setBuscar] = useState('');
  const [ciudad, setCiudad] = useState('todas');
  const [estado, setEstado] = useState('todos');
  const [currentPage, setCurrentPage] = useState(1);
  const [detalle, setDetalle] = useState(null);
  const [aEliminar, setAEliminar] = useState(null);
  const itemsPerPage = 10;

  useEffect(() => {
    cargarSucursales();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { if (initialView) setCurrentView(initialView); }, [initialView]);
  useEffect(() => { setCurrentPage(1); }, [buscar, ciudad, estado]);

  const set = (campo, valor) => setForm(prev => ({ ...prev, [campo]: valor }));

  const filtradas = useMemo(() => {
    let list = [...sucursales];
    const term = buscar.toLowerCase().trim();
    if (term) list = list.filter(s => (s.nombre || '').toLowerCase().includes(term) || (s.direccion || '').toLowerCase().includes(term) || (s.telefono || '').toLowerCase().includes(term));
    if (ciudad !== 'todas') list = list.filter(s => s.ciudad === ciudad);
    if (estado === 'activo') list = list.filter(s => s.activo);
    if (estado === 'inactivo') list = list.filter(s => !s.activo);
    return list;
  }, [sucursales, buscar, ciudad, estado]);

  const totalPages = Math.ceil(filtradas.length / itemsPerPage) || 1;
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filtradas.slice(start, start + itemsPerPage);
  }, [filtradas, currentPage]);

  const volver = () => { cargarSucursales(); setCurrentView('index'); };

  const handleCreate = async (e) => {
    e.preventDefault();
    const res = await crearSucursal(form);
    if (res.ok) { setForm(FORM_VACIO); volver(); } else alert(res.mensaje || 'No se pudo registrar');
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    const res = await editarSucursal(editando.id, form);
    if (res.ok) { setForm(FORM_VACIO); setEditando(null); volver(); } else alert(res.mensaje || 'No se pudo actualizar');
  };

  const startEdit = (s) => {
    setEditando(s);
    setForm({ id: s.id, nombre: s.nombre || '', ciudad: s.ciudad || '', direccion: s.direccion || '', telefono: s.telefono || '', horario: s.horario || '', servicios: s.servicios || '', activo: s.activo !== false });
    setCurrentView('edit');
  };

  const startCreate = () => { setEditando(null); setForm(FORM_VACIO); setCurrentView('create'); };

  const porCiudad = [...new Set(sucursales.map(s => s.ciudad))].length;

  return (
    <div className="space-y-4 font-montserrat w-full">
      {currentView === 'index' && (
        <>
          <BreadcrumbHeader
            icon="fas fa-store"
            breadcrumbs={[
              { label: 'Operaciones', onClick: () => setActiveTab && setActiveTab('inicio') },
              { label: 'Sucursales' }
            ]}
            title="Gestión de Sucursales"
            subtitle="Administre los puntos de venta de la salteñería en Santa Cruz, Cochabamba y Oruro."
            actionButtonText="Nueva Sucursal"
            onActionClick={startCreate}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <KpiCard
              icon="fas fa-store"
              number={sucursales.length}
              title="Sucursales"
              trend={{ text: '+12%', icon: 'fas fa-arrow-up', cls: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50' }}
              details={[{ icon: 'fas fa-location-dot', text: 'Red de locales', color: 'text-[#E95A0C]' }]}
              bubble="bg-[#E95A0C]"
              border="border-l-[#E95A0C]"
            />
            <KpiCard
              icon="fas fa-city"
              number={porCiudad}
              title="Ciudades"
              details={[{ icon: 'fas fa-map-location-dot', text: 'SCZ · CBB · ORU', color: 'text-sky-500' }]}
              bubble="bg-gradient-to-br from-sky-500 to-indigo-500"
              border="border-l-sky-500"
            />
            <KpiCard
              icon="fas fa-circle-check"
              number={sucursales.filter(s => s.activo).length}
              title="Activas"
              trend={{ text: '+5%', icon: 'fas fa-arrow-up', cls: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50' }}
              details={[{ icon: 'fas fa-circle-info', text: 'Operando hoy', color: 'text-emerald-500' }]}
              bubble="bg-gradient-to-br from-emerald-500 to-teal-500"
              border="border-l-emerald-500"
            />
            <KpiCard
              icon="fas fa-circle-xmark"
              number={sucursales.filter(s => !s.activo).length}
              title="Inactivas"
              details={[{ icon: 'fas fa-pause', text: 'Desactivadas', color: 'text-red-500' }]}
              bubble="bg-gradient-to-br from-red-500 to-rose-600"
              border="border-l-red-500"
            />
          </div>

          <SucursalesLista
            sucursalesFiltradas={filtradas}
            paginated={paginated}
            onVer={(s) => { setDetalle(s); setCurrentView('show'); }}
            onEditar={startEdit}
            onEliminar={(s) => setAEliminar(s)}
            buscar={buscar}
            setBuscar={setBuscar}
            ciudad={ciudad}
            setCiudad={setCiudad}
            estado={estado}
            setEstado={setEstado}
          />

          <div className="bg-white dark:bg-[#040408] rounded-2xl p-5 shadow-xl dark:shadow-black/60 border border-slate-200/60 dark:border-white/5 border-l-4 border-l-[#E95A0C] text-center w-full">
            <Pagination currentPage={currentPage} totalPages={totalPages} totalItems={filtradas.length} itemsPerPage={itemsPerPage} onPageChange={setCurrentPage} itemLabel="sucursales" />
          </div>
        </>
      )}

      {currentView === 'create' && <SucursalCreateView form={form} set={set} onBackToList={volver} onSubmit={handleCreate} />}
      {currentView === 'edit' && <SucursalEditView form={form} set={set} onBackToList={volver} onSubmit={handleEdit} />}
      {currentView === 'show' && detalle && <SucursalShowView sucursal={detalle} onBackToList={volver} />}

      <DeleteModal
        isOpen={!!aEliminar}
        onClose={() => setAEliminar(null)}
        onConfirm={async () => {
          if (aEliminar) {
            const res = await eliminarSucursal(aEliminar.id);
            setAEliminar(null);
            if (res && res.mensaje) alert(res.mensaje);
          }
        }}
        title="¿Eliminar Sucursal?"
        message="Si la sucursal tiene movimientos o stock asociado se desactivará en lugar de eliminar."
        itemName={aEliminar?.nombre}
        itemIcon="fas fa-store"
      />
    </div>
  );
};

export default Sucursales;