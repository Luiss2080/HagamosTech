import React, { useState, useMemo, useEffect } from 'react';
import { BreadcrumbHeader } from '../components/layouts/Sidebar';
import Pagination from '../components/Pagination';
import KpiCard from '../components/KpiCard';
import DropdownSelect from '../stock/DropdownSelect';
import PedidosLista from './views/PedidosLista';
import PedidoCreateView from './views/create';
import PedidoEditView from './views/edit';
import PedidoShowView from './views/PedidoShow';
import Zonas from './views/Zonas';
import Repartidores from './views/Repartidores';
import DeleteModal from '../components/mod/delete';
import { ESTADO_PEDIDO_OPCIONES } from './constantes';

const FORM_VACIO = { clienteNombre: '', telefono: '', direccion: '', zonaId: '', repartidorId: '', items: [], tarifa: 0, total: 0, observaciones: '' };

const Delivery = ({ productos = [], setActiveTab, useDelivery, initialView = 'index' }) => {
  const {
    zonas, repartidores, pedidos,
    cargarTodo, cargarPedidos,
    crearZona, editarZona, eliminarZona,
    crearRepartidor, editarRepartidor, eliminarRepartidor,
    crearPedido, editarPedido, cambiarEstado, eliminarPedido
  } = useDelivery();

  const [vista, setVista] = useState('pedidos');
  const [currentView, setCurrentView] = useState(initialView);
  const [form, setForm] = useState(FORM_VACIO);
  const [editando, setEditando] = useState(null);
  const [buscar, setBuscar] = useState('');
  const [estado, setEstado] = useState('todos');
  const [zonaF, setZonaF] = useState('todas');
  const [currentPage, setCurrentPage] = useState(1);
  const [detalle, setDetalle] = useState(null);
  const [aEliminar, setAEliminar] = useState(null);
  const itemsPerPage = 10;

  useEffect(() => {
    cargarTodo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { if (initialView) setCurrentView(initialView); }, [initialView]);
  useEffect(() => { setCurrentPage(1); }, [buscar, estado, zonaF]);

  const set = (campo, valor) => setForm(prev => ({ ...prev, [campo]: valor }));

  const pedidosFiltrados = useMemo(() => {
    let list = [...pedidos];
    const term = buscar.toLowerCase().trim();
    if (term) list = list.filter(p => (p.codigo || '').toLowerCase().includes(term) || (p.clienteNombre || '').toLowerCase().includes(term) || (p.direccion || '').toLowerCase().includes(term));
    if (estado !== 'todos') list = list.filter(p => p.estado === estado);
    if (zonaF !== 'todas') list = list.filter(p => String(p.zonaId) === String(zonaF));
    return list;
  }, [pedidos, buscar, estado, zonaF]);

  const totalPages = Math.ceil(pedidosFiltrados.length / itemsPerPage) || 1;
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return pedidosFiltrados.slice(start, start + itemsPerPage);
  }, [pedidosFiltrados, currentPage]);

  const volver = () => { cargarPedidos(); setCurrentView('index'); setDetalle(null); };

  const handleCreate = async (e) => {
    e.preventDefault();
    const res = await crearPedido(form);
    if (res.ok) { setForm(FORM_VACIO); setVista('pedidos'); volver(); } else alert(res.mensaje || 'No se pudo registrar el pedido');
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    const res = await editarPedido(editando.id, form);
    if (res.ok) { setForm(FORM_VACIO); setEditando(null); volver(); } else alert(res.mensaje || 'No se pudo actualizar');
  };

  const startEdit = (p) => {
    setEditando(p);
    setForm({ id: p.id, clienteNombre: p.clienteNombre || '', telefono: p.telefono || '', direccion: p.direccion || '', zonaId: p.zonaId ? String(p.zonaId) : '', repartidorId: p.repartidorId ? String(p.repartidorId) : '', items: Array.isArray(p.items) ? p.items : [], tarifa: p.tarifa || 0, total: p.total || 0, observaciones: p.observaciones || '' });
    setCurrentView('edit');
  };

  const startCreate = () => { setEditando(null); setForm(FORM_VACIO); setCurrentView('create'); };

  const handleCambiarEstado = async (p, nuevoEstado) => {
    const res = await cambiarEstado(p.id, nuevoEstado, p.repartidorId);
    if (res && !res.ok && res.mensaje) alert(res.mensaje);
  };

  const VISTAS = [
    { value: 'pedidos', label: 'Pedidos', icon: 'fas fa-truck-fast', badge: pedidos.filter(p => p.estado === 'recibido').length },
    { value: 'zonas', label: 'Zonas de reparto', icon: 'fas fa-location-dot', badge: zonas.length },
    { value: 'repartidores', label: 'Repartidores', icon: 'fas fa-motorcycle', badge: repartidores.filter(r => r.disponible).length }
  ];

  const enRuta = pedidos.filter(p => p.estado === 'en_ruta').length;
  const entregados = pedidos.filter(p => p.estado === 'entregado').length;
  const pedidosDia = pedidos.length;

  return (
    <div className="space-y-4 font-montserrat w-full">
      <BreadcrumbHeader
        icon="fas fa-motorcycle"
        breadcrumbs={[
          { label: 'Operaciones', onClick: () => setActiveTab && setActiveTab('inicio') },
          { label: 'Delivery' }
        ]}
        title="Gestión de Delivery"
        subtitle="Zonas de reparto tarifadas, repartidores y seguimiento de pedidos a domicilio."
        actionButtonText="Nuevo Pedido"
        onActionClick={() => { setVista('pedidos'); startCreate(); }}
      />

      {/* KPI */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard icon="fas fa-truck-fast" number={pedidosDia} title="Pedidos del día" trend={{ text: '+10%', icon: 'fas fa-arrow-up', cls: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50' }} details={[{ icon: 'fas fa-calendar', text: 'A domicilio', color: 'text-[#E95A0C]' }]} bubble="bg-[#E95A0C]" border="border-l-[#E95A0C]" />
        <KpiCard icon="fas fa-motorcycle" number={enRuta} title="En ruta" details={[{ icon: 'fas fa-person-running', text: 'Repartos activos', color: 'text-sky-500' }]} bubble="bg-gradient-to-br from-sky-500 to-indigo-500" border="border-l-sky-500" />
        <KpiCard icon="fas fa-circle-check" number={entregados} title="Entregados" trend={{ text: '+15%', icon: 'fas fa-arrow-up', cls: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50' }} details={[{ icon: 'fas fa-flag-checkered', text: 'Completados', color: 'text-emerald-500' }]} bubble="bg-gradient-to-br from-emerald-500 to-teal-500" border="border-l-emerald-500" />
        <KpiCard icon="fas fa-user-tag" number={repartidores.filter(r => r.disponible && r.activo).length} title="Repartidores" details={[{ icon: 'fas fa-circle-info', text: 'disponibles', color: 'text-amber-500' }]} bubble="bg-gradient-to-br from-amber-500 to-orange-500" border="border-l-amber-500" />
      </div>

      {/* SELECTOR DE VISTA */}
      {currentView === 'index' && (
        <div className="flex items-center justify-end">
          <div className="w-64">
            <DropdownSelect value={vista} onChange={setVista} options={VISTAS} placeholder="Seleccione" />
          </div>
        </div>
      )}

      {currentView === 'index' && (
        <>
          {vista === 'pedidos' && (
            <>
              <PedidosLista
                pedidosFiltrados={pedidosFiltrados}
                paginated={paginated}
                zonas={zonas}
                onVer={(p) => { setDetalle(p); setCurrentView('show'); }}
                onEditar={startEdit}
                onCambiarEstado={handleCambiarEstado}
                onEliminar={(p) => setAEliminar(p)}
                buscar={buscar}
                setBuscar={setBuscar}
                estado={estado}
                setEstado={setEstado}
                zona={zonaF}
                setZona={setZonaF}
              />
              <div className="bg-white dark:bg-[#040408] rounded-2xl p-5 shadow-xl dark:shadow-black/60 border border-slate-200/60 dark:border-white/5 border-l-4 border-l-[#E95A0C] text-center w-full">
                <Pagination currentPage={currentPage} totalPages={totalPages} totalItems={pedidosFiltrados.length} itemsPerPage={itemsPerPage} onPageChange={setCurrentPage} itemLabel="pedidos" />
              </div>
            </>
          )}

          {vista === 'zonas' && <Zonas zonas={zonas} crearZona={crearZona} editarZona={editarZona} eliminarZona={eliminarZona} />}
          {vista === 'repartidores' && <Repartidores repartidores={repartidores} crearRepartidor={crearRepartidor} editarRepartidor={editarRepartidor} eliminarRepartidor={eliminarRepartidor} />}
        </>
      )}

      {currentView === 'create' && <PedidoCreateView form={form} set={set} onBackToList={volver} onSubmit={handleCreate} productos={productos} zonas={zonas} repartidores={repartidores} />}
      {currentView === 'edit' && <PedidoEditView form={form} set={set} onBackToList={volver} onSubmit={handleEdit} productos={productos} zonas={zonas} repartidores={repartidores} />}
      {currentView === 'show' && detalle && <PedidoShowView pedido={detalle} onBackToList={volver} onEditar={startEdit} />}

      <DeleteModal
        isOpen={!!aEliminar}
        onClose={() => setAEliminar(null)}
        onConfirm={async () => {
          if (aEliminar) {
            const res = await eliminarPedido(aEliminar.id);
            setAEliminar(null);
            if (res && !res.ok && res.mensaje) alert(res.mensaje);
          }
        }}
        title="¿Eliminar Pedido de Delivery?"
        message="El pedido se eliminará del registro de entregas a domicilio."
        itemName={`${aEliminar?.codigo} · ${aEliminar?.clienteNombre}`}
        itemIcon="fas fa-truck-fast"
      />
    </div>
  );
};

export default Delivery;