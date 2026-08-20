import React, { useState, useMemo, useEffect } from 'react';
import { BreadcrumbHeader } from '../components/layouts/Sidebar';
import Pagination from '../components/Pagination';
import KpiCard from '../components/KpiCard';
import HornoLista from './pages/lista';
import HornoCreateView from './pages/create';
import HornoEditView from './pages/edit';
import HornoShowView from './pages/show';
import DeleteModal from '../components/mod/delete';
import { TIPO_OPCIONES } from './constantes';

const FORM_VACIO = { tipo: 'produccion', productoId: '', sucursalId: '', cantidad: '', motivo: '', observaciones: '' };

const Horno = ({ productos = [], setActiveTab, useHorno, initialView = 'index' }) => {
  const { registros, sucursales, cargar, cargarSucursales, crear, editar, anular, eliminar } = useHorno();

  const [currentView, setCurrentView] = useState(initialView);
  const [form, setForm] = useState(FORM_VACIO);
  const [editando, setEditando] = useState(null);
  const [buscar, setBuscar] = useState('');
  const [tipo, setTipo] = useState('todos');
  const [sucursal, setSucursal] = useState('todas');
  const [currentPage, setCurrentPage] = useState(1);
  const [detalle, setDetalle] = useState(null);
  const [aEliminar, setAEliminar] = useState(null);
  const itemsPerPage = 10;

  useEffect(() => {
    cargar();
    cargarSucursales();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { if (initialView) setCurrentView(initialView); }, [initialView]);
  useEffect(() => { setCurrentPage(1); }, [buscar, tipo, sucursal]);

  const set = (campo, valor) => setForm(prev => ({ ...prev, [campo]: valor }));

  const filtrados = useMemo(() => {
    let list = [...registros];
    const term = buscar.toLowerCase().trim();
    if (term) list = list.filter(r => (r.codigo || '').toLowerCase().includes(term) || (r.producto?.nombre || '').toLowerCase().includes(term) || (r.motivo || '').toLowerCase().includes(term));
    if (tipo !== 'todos') list = list.filter(r => r.tipo === tipo);
    if (sucursal !== 'todas') list = list.filter(r => String(r.sucursalId) === String(sucursal));
    return list;
  }, [registros, buscar, tipo, sucursal]);

  const totalPages = Math.ceil(filtrados.length / itemsPerPage) || 1;
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filtrados.slice(start, start + itemsPerPage);
  }, [filtrados, currentPage]);

  const volver = () => { cargar(); setCurrentView('index'); setDetalle(null); };

  const handleCreate = async (e) => {
    e.preventDefault();
    const res = await crear(form);
    if (res.ok) { setForm(FORM_VACIO); volver(); } else alert(res.mensaje || 'No se pudo registrar');
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    const res = await editar(editando.id, form);
    if (res.ok) { setForm(FORM_VACIO); setEditando(null); volver(); } else alert(res.mensaje || 'No se pudo actualizar');
  };

  const startEdit = (r) => {
    setEditando(r);
    setForm({ id: r.id, tipo: r.tipo || 'produccion', productoId: String(r.productoId), sucursalId: String(r.sucursalId), cantidad: r.cantidad, motivo: r.motivo || '', observaciones: r.observaciones || '' });
    setCurrentView('edit');
  };

  const startCreate = () => { setEditando(null); setForm(FORM_VACIO); setCurrentView('create'); };

  const producciones = registros.filter(r => r.tipo === 'produccion' && r.estado !== 'anulada');
  const mermas = registros.filter(r => r.tipo === 'merma' && r.estado !== 'anulada');
  const unidadesProducidas = producciones.reduce((a, r) => a + r.cantidad, 0);

  return (
    <div className="space-y-4 font-montserrat w-full">
      {currentView === 'index' && (
        <>
          <BreadcrumbHeader
            icon="fas fa-fire-burner"
            breadcrumbs={[
              { label: 'Operaciones', onClick: () => setActiveTab && setActiveTab('inicio') },
              { label: 'Horno' }
            ]}
            title="Producción del Horno"
            subtitle="Tandas de horneado, mermas y control de producción de la salteñería."
            actionButtonText="Nuevo Registro"
            onActionClick={startCreate}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <KpiCard icon="fas fa-fire-burner" number={producciones.length} title="Producciones" trend={{ text: '+12%', icon: 'fas fa-arrow-up', cls: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50' }} details={[{ icon: 'fas fa-utensils', text: 'Tandas de horno', color: 'text-[#E95A0C]' }]} bubble="bg-[#E95A0C]" border="border-l-[#E95A0C]" />
            <KpiCard icon="fas fa-biohazard" number={mermas.length} title="Mermas" details={[{ icon: 'fas fa-triangle-exclamation', text: 'Pérdidas registradas', color: 'text-red-500' }]} bubble="bg-gradient-to-br from-red-500 to-rose-600" border="border-l-red-500" />
            <KpiCard icon="fas fa-boxes-stacked" number={unidadesProducidas} title="Unidades producidas" trend={{ text: '+15%', icon: 'fas fa-arrow-up', cls: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50' }} details={[{ icon: 'fas fa-shopping-basket', text: 'Al stock', color: 'text-emerald-500' }]} bubble="bg-gradient-to-br from-emerald-500 to-teal-500" border="border-l-emerald-500" />
            <KpiCard icon="fas fa-ban" number={registros.filter(r => r.estado === 'anulada').length} title="Anuladas" details={[{ icon: 'fas fa-circle-xmark', text: 'Canceladas', color: 'text-slate-500' }]} bubble="bg-gradient-to-br from-slate-500 to-slate-600" border="border-l-slate-500" />
          </div>

          <HornoLista
            registrosFiltrados={filtrados}
            paginated={paginated}
            sucursales={sucursales}
            onVer={(r) => { setDetalle(r); setCurrentView('show'); }}
            onEditar={startEdit}
            onAnular={(r) => { const ok = window.confirm(`¿Anular el registro ${r.codigo}? El stock se revertirá.`); if (ok) anular(r.id); }}
            onEliminar={(r) => setAEliminar(r)}
            buscar={buscar}
            setBuscar={setBuscar}
            tipo={tipo}
            setTipo={setTipo}
            sucursal={sucursal}
            setSucursal={setSucursal}
          />

          <div className="bg-white dark:bg-[#040408] rounded-2xl p-5 shadow-xl dark:shadow-black/60 border border-slate-200/60 dark:border-white/5 border-l-4 border-l-[#E95A0C] text-center w-full">
            <Pagination currentPage={currentPage} totalPages={totalPages} totalItems={filtrados.length} itemsPerPage={itemsPerPage} onPageChange={setCurrentPage} itemLabel="registros" />
          </div>
        </>
      )}

      {currentView === 'create' && <HornoCreateView form={form} set={set} onBackToList={volver} onSubmit={handleCreate} productos={productos} sucursales={sucursales} />}
      {currentView === 'edit' && <HornoEditView form={form} set={set} onBackToList={volver} onSubmit={handleEdit} productos={productos} sucursales={sucursales} />}
      {currentView === 'show' && detalle && <HornoShowView registro={detalle} onBackToList={volver} />}

      <DeleteModal
        isOpen={!!aEliminar}
        onClose={() => setAEliminar(null)}
        onConfirm={async () => {
          if (aEliminar) {
            const res = await eliminar(aEliminar.id);
            setAEliminar(null);
            if (res && !res.ok && res.mensaje) alert(res.mensaje);
          }
        }}
        title="¿Eliminar registro del Horno?"
        message="El registro se eliminará del historial de producción."
        itemName={`${aEliminar?.codigo} · ${aEliminar?.producto?.nombre}`}
        itemIcon="fas fa-fire-burner"
      />
    </div>
  );
};

export default Horno;