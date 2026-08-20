import React, { useState, useMemo, useEffect } from 'react';
import { BreadcrumbHeader } from '../components/layouts/Sidebar';
import Pagination from '../components/Pagination';
import ComprasLista from './pages/lista';
import CompraCreateView from './pages/create';
import CompraEditView from './pages/edit';
import CompraShowView from './pages/show';
import DeleteModal from '../components/mod/delete';
import KpiCard from '../components/KpiCard';
import { formatearBs } from './constantes';

const FORM_VACIO = { productoId: '', sucursalId: '', proveedorNombre: '', proveedorContacto: '', cantidad: '', precioUnitario: '', observaciones: '' };

const Compras = ({ productos = [], setActiveTab, useCompras, initialView = 'index' }) => {
  const {
    compras, sucursales, cargarCompras, cargarSucursales,
    crearCompra, editarCompra, anularCompra
  } = useCompras();

  const [currentView, setCurrentView] = useState(initialView);
  const [form, setForm] = useState(FORM_VACIO);
  const [editando, setEditando] = useState(null);
  const [buscar, setBuscar] = useState('');
  const [estado, setEstado] = useState('todos');
  const [sort, setSort] = useState('recientes');
  const [currentPage, setCurrentPage] = useState(1);
  const [compraDetail, setCompraDetail] = useState(null);
  const [compraToDelete, setCompraToDelete] = useState(null);
  const itemsPerPage = 10;

  useEffect(() => {
    cargarCompras();
    cargarSucursales();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => { if (initialView) setCurrentView(initialView); }, [initialView]);
  useEffect(() => { setCurrentPage(1); }, [buscar, estado, sort]);

  const set = (campo, valor) => setForm(prev => ({ ...prev, [campo]: valor }));

  const comprasFiltradas = useMemo(() => {
    let list = [...compras];
    const term = buscar.toLowerCase().trim();
    if (term) {
      list = list.filter(c =>
        (c.codigo || '').toLowerCase().includes(term) ||
        (c.proveedorNombre || '').toLowerCase().includes(term) ||
        (c.producto?.nombre || '').toLowerCase().includes(term)
      );
    }
    if (estado !== 'todos') list = list.filter(c => c.estado === estado);
    if (sort === 'mayor') list.sort((a, b) => b.total - a.total);
    else if (sort === 'menor') list.sort((a, b) => a.total - b.total);
    else list.sort((a, b) => new Date(b.creadoEn) - new Date(a.creadoEn));
    return list;
  }, [compras, buscar, estado, sort]);

  const totalPages = Math.ceil(comprasFiltradas.length / itemsPerPage) || 1;
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return comprasFiltradas.slice(start, start + itemsPerPage);
  }, [comprasFiltradas, currentPage]);

  const handleBackToList = () => { cargarCompras(); setCurrentView('index'); };

  const handleCreate = async (e) => {
    e.preventDefault();
    const res = await crearCompra(form);
    if (res.ok) { setForm(FORM_VACIO); handleBackToList(); }
    else alert(res.mensaje || 'No se pudo registrar la compra');
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    const res = await editarCompra(editando.id, form);
    if (res.ok) { setForm(FORM_VACIO); setEditando(null); handleBackToList(); }
    else alert(res.mensaje || 'No se pudo actualizar la compra');
  };

  const handleStartEdit = (c) => {
    setEditando(c);
    setForm({
      id: c.id,
      productoId: String(c.productoId),
      sucursalId: String(c.sucursalId),
      proveedorNombre: c.proveedorNombre || '',
      proveedorContacto: c.proveedorContacto || '',
      cantidad: c.cantidad,
      precioUnitario: c.precioUnitario,
      observaciones: c.observaciones || ''
    });
    setCurrentView('edit');
  };

  const handleStartCreate = () => {
    setEditando(null);
    setForm(FORM_VACIO);
    setCurrentView('create');
  };

  const totalInvertido = compras.filter(c => c.estado !== 'anulada').reduce((a, c) => a + c.total, 0);

  return (
    <div className="space-y-4 font-montserrat w-full">
      {currentView === 'index' && (
        <>
          <BreadcrumbHeader
            icon="fas fa-truck-moving"
            breadcrumbs={[
              { label: 'Comercial', onClick: () => setActiveTab && setActiveTab('inicio') },
              { label: 'Compras e Insumos' }
            ]}
            title="Compras e Insumos"
            subtitle="Compras de materia prima e insumos a proveedores, con entrada automática al stock."
            actionButtonText="Nueva Compra"
            onActionClick={handleStartCreate}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <KpiCard
              icon="fas fa-truck-moving"
              number={comprasFiltradas.length}
              title="Compras registradas"
              trend={{ text: '+8%', icon: 'fas fa-arrow-up', cls: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50' }}
              details={[{ icon: 'fas fa-calendar', text: 'En el período', color: 'text-[#E95A0C]' }]}
              bubble="bg-[#E95A0C]"
              border="border-l-[#E95A0C]"
            />
            <KpiCard
              icon="fas fa-sack-dollar"
              number={formatearBs(totalInvertido)}
              title="Total invertido"
              trend={{ text: '+12%', icon: 'fas fa-arrow-up', cls: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50' }}
              details={[{ icon: 'fas fa-boxes-stacked', text: 'Costos de insumos', color: 'text-emerald-500' }]}
              bubble="bg-gradient-to-br from-emerald-500 to-teal-500"
              border="border-l-emerald-500"
            />
            <KpiCard
              icon="fas fa-warehouse"
              number={[...new Set(compras.map(c => c.proveedorNombre))].length}
              title="Proveedores"
              details={[{ icon: 'fas fa-handshake', text: 'Distribuidores activos', color: 'text-sky-500' }]}
              bubble="bg-gradient-to-br from-sky-500 to-indigo-500"
              border="border-l-sky-500"
            />
            <KpiCard
              icon="fas fa-ban"
              number={compras.filter(c => c.estado === 'anulada').length}
              title="Anuladas"
              details={[{ icon: 'fas fa-circle-xmark', text: 'Canceladas', color: 'text-red-500' }]}
              bubble="bg-gradient-to-br from-red-500 to-rose-600"
              border="border-l-red-500"
            />
          </div>

          <ComprasLista
            comprasFiltradas={comprasFiltradas}
            paginated={paginated}
            onVer={(c) => { setCompraDetail(c); setCurrentView('show'); }}
            onEditar={handleStartEdit}
            onAnular={(c) => setCompraToDelete(c)}
            buscar={buscar}
            setBuscar={setBuscar}
            estado={estado}
            setEstado={setEstado}
            sort={sort}
            setSort={setSort}
          />

          <div className="bg-white dark:bg-[#040408] rounded-2xl p-5 shadow-xl dark:shadow-black/60 border border-slate-200/60 dark:border-white/5 border-l-4 border-l-[#E95A0C] text-center w-full">
            <Pagination currentPage={currentPage} totalPages={totalPages} totalItems={comprasFiltradas.length} itemsPerPage={itemsPerPage} onPageChange={setCurrentPage} itemLabel="compras" />
          </div>
        </>
      )}

      {currentView === 'create' && (
        <CompraCreateView form={form} set={set} onBackToList={handleBackToList} onSubmit={handleCreate} productos={productos} sucursales={sucursales} />
      )}

      {currentView === 'edit' && (
        <CompraEditView form={form} set={set} onBackToList={handleBackToList} onSubmit={handleEdit} productos={productos} sucursales={sucursales} />
      )}

      {currentView === 'show' && compraDetail && (
        <CompraShowView compra={compraDetail} onBackToList={handleBackToList} />
      )}

      <DeleteModal
        isOpen={!!compraToDelete}
        onClose={() => setCompraToDelete(null)}
        onConfirm={async () => {
          if (compraToDelete) {
            const res = await anularCompra(compraToDelete.id);
            setCompraToDelete(null);
            if (res && !res.ok && res.mensaje) alert(res.mensaje);
          }
        }}
        title="¿Anular esta Compra?"
        message="La compra quedará ANULADA y el stock ingresado se restará del inventario."
        itemName={`${compraToDelete?.codigo} · ${compraToDelete?.proveedorNombre}`}
        itemIcon="fas fa-truck-moving"
      />
    </div>
  );
};

export default Compras;