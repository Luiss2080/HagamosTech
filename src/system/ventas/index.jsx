import React, { useState, useMemo, useEffect } from 'react';
import { BreadcrumbHeader } from '../components/layouts/Sidebar';
import Pagination from '../components/Pagination';
import VentasLista from './pages/lista';
import VentaCreateView from './pages/create';
import VentaShowView from './pages/show';
import DeleteModal from '../components/mod/delete';
import KpiCard from '../components/KpiCard';
import { METODO_OPCIONES, ESTADO_OPCIONES } from './constantes';

const Ventas = ({
  ventas = [],
  cargarVentas,
  crearVenta,
  anularVenta,
  productos = [],
  categorias = [],
  setActiveTab,
  initialView = 'index'
}) => {
  const [currentView, setCurrentView] = useState(initialView);
  const [buscar, setBuscar] = useState('');
  const [metodo, setMetodo] = useState('todos');
  const [estado, setEstado] = useState('todos');
  const [sort, setSort] = useState('recientes');
  const [currentPage, setCurrentPage] = useState(1);
  const [ventaDetail, setVentaDetail] = useState(null);
  const [ventaToDelete, setVentaToDelete] = useState(null);
  const itemsPerPage = 10;

  useEffect(() => { if (initialView) setCurrentView(initialView); }, [initialView]);
  useEffect(() => { setCurrentPage(1); }, [buscar, metodo, estado, sort]);

  const ventasFiltradas = useMemo(() => {
    let list = [...ventas];
    const term = buscar.toLowerCase().trim();
    if (term) {
      list = list.filter(v =>
        (v.codigo || '').toLowerCase().includes(term) ||
        (v.clienteNombre || '').toLowerCase().includes(term) ||
        (Array.isArray(v.items) && v.items.some(i => (i.nombre || '').toLowerCase().includes(term)))
      );
    }
    if (metodo !== 'todos') list = list.filter(v => v.metodoPago === metodo);
    if (estado !== 'todos') list = list.filter(v => v.estado === estado);

    if (sort === 'mayor') list.sort((a, b) => b.total - a.total);
    else if (sort === 'menor') list.sort((a, b) => a.total - b.total);
    else list.sort((a, b) => new Date(b.creadoEn) - new Date(a.creadoEn));

    return list;
  }, [ventas, buscar, metodo, estado, sort]);

  const totalPages = Math.ceil(ventasFiltradas.length / itemsPerPage) || 1;
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return ventasFiltradas.slice(start, start + itemsPerPage);
  }, [ventasFiltradas, currentPage]);

  const handleBackToList = () => {
    if (cargarVentas) cargarVentas();
    setCurrentView('index');
  };

  const handleAnular = async (v) => {
    const res = await anularVenta(v.id);
    setVentaToDelete(null);
    if (res && !res.ok && res.mensaje) alert(res.mensaje);
    if (cargarVentas) cargarVentas();
  };

  const ventasHoy = ventas.filter(v => v.estado !== 'anulada');
  const totalHoy = ventasHoy.reduce((a, v) => a + (v.total || 0), 0);

  return (
    <div className="space-y-4 font-montserrat w-full">
      {currentView === 'index' && (
        <>
          <BreadcrumbHeader
            icon="fas fa-cash-register"
            breadcrumbs={[
              { label: 'Comercial', onClick: () => setActiveTab && setActiveTab('inicio') },
              { label: 'Ventas' }
            ]}
            title="Registro de Ventas (POS)"
            subtitle="Ventas de mesa del widget de pedido y registradas desde el sistema."
            actionButtonText="Nueva Venta"
            onActionClick={() => setCurrentView('create')}
          />

          {/* KPI */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <KpiCard
              icon="fas fa-receipt"
              number={ventasHoy.length}
              title="Ventas del día"
              trend={{ text: '+12%', icon: 'fas fa-arrow-up', cls: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50' }}
              details={[{ icon: 'fas fa-desktop', text: 'POS + Mesa', color: 'text-emerald-500' }]}
              bubble="bg-[#E95A0C]"
              border="border-l-[#E95A0C]"
            />
            <KpiCard
              icon="fas fa-sack-dollar"
              number={`Bs. ${totalHoy.toFixed(2)}`}
              title="Total cobrado"
              trend={{ text: '+15%', icon: 'fas fa-arrow-up', cls: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50' }}
              details={[{ icon: 'fas fa-wallet', text: 'Ingresos de hoy', color: 'text-emerald-500' }]}
              bubble="bg-gradient-to-br from-emerald-500 to-teal-500"
              border="border-l-emerald-500"
            />
            <KpiCard
              icon="fas fa-chair"
              number={ventas.filter(v => v.origen === 'mesa' && v.estado !== 'anulada').length}
              title="De servicio de mesa"
              trend={{ text: 'Nuevo', icon: 'fas fa-star', cls: 'text-sky-600 bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-900/50' }}
              details={[{ icon: 'fas fa-clipboard-list', text: 'Widget de pedido', color: 'text-sky-500' }]}
              bubble="bg-gradient-to-br from-sky-500 to-indigo-500"
              border="border-l-sky-500"
            />
            <KpiCard
              icon="fas fa-ban"
              number={ventas.filter(v => v.estado === 'anulada').length}
              title="Anuladas"
              details={[{ icon: 'fas fa-circle-xmark', text: 'Canceladas', color: 'text-red-500' }]}
              bubble="bg-gradient-to-br from-red-500 to-rose-600"
              border="border-l-red-500"
            />
          </div>

          <VentasLista
            ventasFiltradas={ventasFiltradas}
            paginated={paginated}
            onVer={(v) => { setVentaDetail(v); setCurrentView('show'); }}
            onAnular={(v) => setVentaToDelete(v)}
            buscar={buscar}
            setBuscar={setBuscar}
            metodo={metodo}
            setMetodo={setMetodo}
            estado={estado}
            setEstado={setEstado}
            sort={sort}
            setSort={setSort}
          />

          <div className="bg-white dark:bg-[#040408] rounded-2xl p-5 shadow-xl dark:shadow-black/60 border border-slate-200/60 dark:border-white/5 border-l-4 border-l-[#E95A0C] text-center w-full">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={ventasFiltradas.length}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
              itemLabel="ventas"
            />
          </div>
        </>
      )}

      {currentView === 'create' && (
        <VentaCreateView
          onBackToList={handleBackToList}
          crearVenta={crearVenta}
          productos={productos}
          categorias={categorias}
        />
      )}

      {currentView === 'show' && ventaDetail && (
        <VentaShowView venta={ventaDetail} onBackToList={handleBackToList} />
      )}

      <DeleteModal
        isOpen={!!ventaToDelete}
        onClose={() => setVentaToDelete(null)}
        onConfirm={() => handleAnular(ventaToDelete)}
        title="¿Anular esta Venta?"
        message="La venta quedará registrada con estado ANULADA. No se eliminará el registro."
        itemName={`${ventaToDelete?.codigo} · ${ventaToDelete?.total?.toFixed ? 'Bs. ' + ventaToDelete.total.toFixed(2) : ''}`}
        itemIcon="fas fa-receipt"
      />
    </div>
  );
};

export default Ventas;