import React, { useState, useMemo, useEffect } from 'react';
import { BreadcrumbHeader } from '../components/layouts/Sidebar';
import Pagination from '../components/Pagination';
import ResumenStock from './views/ResumenStock';
import MovimientosLista from './views/MovimientosLista';
import CrearMovimiento from './views/CrearMovimiento';
import Transferencia from './views/Transferencia';
import AlertasStock from './views/AlertasStock';
import DetalleMovimiento from './views/DetalleMovimiento';
import DeleteModal from '../components/mod/delete';
import KpiCard from '../components/KpiCard';

const Stock = ({
  productos = [],
  setActiveTab,
  useStock
}) => {
  const {
    resumen, movimientos, alertas, sucursales,
    cargarTodo, crearMovimiento, crearTransferencia, setMinimo, eliminarMovimiento
  } = useStock();

  const [vista, setVista] = useState('resumen');
  const [movDetalle, setMovDetalle] = useState(null);
  const [movToDelete, setMovToDelete] = useState(null);
  const [preAjustar, setPreAjustar] = useState(null);
  const [editMinimo, setEditMinimo] = useState(null);
  const [nuevoMinimo, setNuevoMinimo] = useState(5);

  // Filtros resumen
  const [buscar, setBuscar] = useState('');
  const [sucursalF, setSucursalF] = useState('todas');
  const [estadoF, setEstadoF] = useState('todos');
  const [pageResumen, setPageResumen] = useState(1);

  // Filtros movimientos
  const [mbuscar, setMBuscar] = useState('');
  const [tipoF, setTipoF] = useState('todos');
  const [desde, setDesde] = useState('');
  const [hasta, setHasta] = useState('');
  const [pageMov, setPageMov] = useState(1);

  const itemsPerPage = 10;

  useEffect(() => {
    cargarTodo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const resumenFiltrado = useMemo(() => {
    let list = [...resumen];
    const term = buscar.toLowerCase().trim();
    if (term) list = list.filter(f => (f.productoNombre || '').toLowerCase().includes(term) || (f.enlace || '').toLowerCase().includes(term));
    if (sucursalF !== 'todas') list = list.filter(f => String(f.sucursalId) === String(sucursalF));
    if (estadoF !== 'todos') list = list.filter(f => f.estado === estadoF);
    return list;
  }, [resumen, buscar, sucursalF, estadoF]);

  useEffect(() => { setPageResumen(1); }, [buscar, sucursalF, estadoF]);

  const pagResumen = useMemo(() => {
    const start = (pageResumen - 1) * itemsPerPage;
    return resumenFiltrado.slice(start, start + itemsPerPage);
  }, [resumenFiltrado, pageResumen]);

  const movsFiltrados = useMemo(() => {
    let list = [...movimientos];
    const term = mbuscar.toLowerCase().trim();
    if (term) list = list.filter(m => (m.producto?.nombre || '').toLowerCase().includes(term) || (m.referencia || '').toLowerCase().includes(term) || (m.motivo || '').toLowerCase().includes(term));
    if (tipoF !== 'todos') list = list.filter(m => m.tipo === tipoF);
    if (desde) list = list.filter(m => new Date(m.creadoEn) >= new Date(`${desde}T00:00:00`));
    if (hasta) list = list.filter(m => new Date(m.creadoEn) <= new Date(`${hasta}T23:59:59`));
    return list;
  }, [movimientos, mbuscar, tipoF, desde, hasta]);

  useEffect(() => { setPageMov(1); }, [mbuscar, tipoF, desde, hasta]);

  const pagMov = useMemo(() => {
    const start = (pageMov - 1) * itemsPerPage;
    return movsFiltrados.slice(start, start + itemsPerPage);
  }, [movsFiltrados, pageMov]);

  const TABS = [
    { id: 'resumen', label: 'Stock actual', icon: 'fas fa-boxes-stacked' },
    { id: 'movimientos', label: 'Movimientos', icon: 'fas fa-right-left' },
    { id: 'alertas', label: 'Alertas', icon: 'fas fa-triangle-exclamation', badge: alertas.length },
    { id: 'transferir', label: 'Transferir', icon: 'fas fa-arrow-right-arrow-left' }
  ];

  return (
    <div className="space-y-4 font-montserrat w-full">
      <BreadcrumbHeader
        icon="fas fa-boxes-stacked"
        breadcrumbs={[
          { label: 'Comercial', onClick: () => setActiveTab && setActiveTab('inicio') },
          { label: 'Control de Stock' }
        ]}
        title="Control de Stock e Inventario"
        subtitle="Stock por sucursal, kardex de movimientos, transferencias, mermas y alertas."
        actionButtonText="Nuevo Movimiento"
        onActionClick={() => { setPreAjustar(null); setVista('crear'); }}
      />

      {/* KPI */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          icon="fas fa-boxes-stacked"
          number={resumen.length}
          title="Registros stock"
          trend={{ text: '+5%', icon: 'fas fa-arrow-up', cls: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50' }}
          details={[{ icon: 'fas fa-store', text: 'con existencias', color: 'text-[#E95A0C]' }]}
          bubble="bg-[#E95A0C]"
          border="border-l-[#E95A0C]"
        />
        <KpiCard
          icon="fas fa-triangle-exclamation"
          number={alertas.filter(a => a.stock > 0).length}
          title="Críticos"
          trend={{ text: 'bajo mínimo', icon: 'fas fa-exclamation', cls: 'text-amber-600 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50' }}
          details={[{ icon: 'fas fa-gauge-high', text: 'Reabastecer', color: 'text-amber-500' }]}
          bubble="bg-gradient-to-br from-amber-500 to-orange-500"
          border="border-l-amber-500"
        />
        <KpiCard
          icon="fas fa-circle-xmark"
          number={alertas.filter(a => a.stock <= 0).length}
          title="Agotados"
          details={[{ icon: 'fas fa-box-open', text: 'Sin stock', color: 'text-red-500' }]}
          bubble="bg-gradient-to-br from-red-500 to-rose-600"
          border="border-l-red-500"
        />
        <KpiCard
          icon="fas fa-right-left"
          number={movimientos.length}
          title="Movimientos"
          details={[{ icon: 'fas fa-clipboard-list', text: 'Kardex registrado', color: 'text-sky-500' }]}
          bubble="bg-gradient-to-br from-sky-500 to-indigo-500"
          border="border-l-sky-500"
        />
      </div>

      {/* SELECTOR DE VISTA (desplegable en el encabezado) */}
      <div className="flex items-center justify-end">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          {TABS.find(t => t.id === vista)?.label} · {vista === 'resumen' ? `${resumen.length} registros` : vista === 'movimientos' ? `${movimientos.length} movimientos` : vista === 'alertas' ? `${alertas.length} alertas` : 'Transferencia entre sucursales'}
        </span>
      </div>

      {vista === 'resumen' && (
        <>
          <ResumenStock
            filas={resumenFiltrado}
            paginated={pagResumen}
            buscar={buscar}
            setBuscar={setBuscar}
            sucursal={sucursalF}
            setSucursal={setSucursalF}
            sucursales={sucursales}
            estado={estadoF}
            setEstado={setEstadoF}
            vista={vista}
            setVista={setVista}
            vistaOptions={TABS}
            onAjustar={(f) => { setPreAjustar(f); setVista('crear'); }}
            onEditarMinimo={(f) => { setEditMinimo(f); setNuevoMinimo(f.minimo); }}
          />
          <div className="bg-white dark:bg-[#040408] rounded-2xl p-5 shadow-xl dark:shadow-black/60 border border-slate-200/60 dark:border-white/5 border-l-4 border-l-[#E95A0C] text-center w-full">
            <Pagination currentPage={pageResumen} totalPages={Math.ceil(resumenFiltrado.length / itemsPerPage) || 1} totalItems={resumenFiltrado.length} itemsPerPage={itemsPerPage} onPageChange={setPageResumen} itemLabel="registros" />
          </div>
        </>
      )}

      {vista === 'movimientos' && (
        <>
          <MovimientosLista
            paginated={pagMov}
            tipo={tipoF}
            setTipo={setTipoF}
            buscar={mbuscar}
            setBuscar={setMBuscar}
            desde={desde}
            setDesde={setDesde}
            hasta={hasta}
            setHasta={setHasta}
            vista={vista}
            setVista={setVista}
            vistaOptions={TABS}
            totalMovs={movsFiltrados.length}
            onVer={(m) => { setMovDetalle(m); setVista('detalle'); }}
            onEliminar={(m) => setMovToDelete(m)}
          />
          <div className="bg-white dark:bg-[#040408] rounded-2xl p-5 shadow-xl dark:shadow-black/60 border border-slate-200/60 dark:border-white/5 border-l-4 border-l-[#E95A0C] text-center w-full">
            <Pagination currentPage={pageMov} totalPages={Math.ceil(movsFiltrados.length / itemsPerPage) || 1} totalItems={movsFiltrados.length} itemsPerPage={itemsPerPage} onPageChange={setPageMov} itemLabel="movimientos" />
          </div>
        </>
      )}

      {vista === 'alertas' && <AlertasStock alertas={alertas} />}

      {vista === 'transferir' && (
        <Transferencia onBackToList={() => setVista('resumen')} crearTransferencia={crearTransferencia} productos={productos} sucursales={sucursales} />
      )}

      {vista === 'crear' && (
        <CrearMovimiento onBackToList={() => setVista('resumen')} crearMovimiento={crearMovimiento} productos={productos} sucursales={sucursales} preAjustar={preAjustar} />
      )}

      {vista === 'detalle' && movDetalle && (
        <DetalleMovimiento movimiento={movDetalle} onBackToList={() => setVista('movimientos')} />
      )}

      {/* Modal editar mínimo */}
      {editMinimo && (
        <div className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 font-montserrat">
          <div className="bg-white dark:bg-[#040408] rounded-2xl p-6 max-w-sm w-full border border-slate-200/60 dark:border-white/5 shadow-2xl">
            <h4 className="text-sm font-black text-[#4A2E1B] dark:text-white uppercase tracking-wider mb-3 flex items-center gap-2">
              <i className="fas fa-gauge-high text-[#E95A0C]"></i> Editar stock mínimo
            </h4>
            <p className="text-[11px] text-slate-500 font-bold mb-3">Producto: <span className="text-[#E95A0C]">{editMinimo.productoNombre}</span> · {editMinimo.sucursalNombre}</p>
            <input type="number" min="0" value={nuevoMinimo} onChange={(e) => setNuevoMinimo(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200/60 dark:border-white/5 bg-slate-50 dark:bg-[#070710] text-slate-800 dark:text-white text-xs font-bold outline-none focus:ring-2 focus:ring-[#E95A0C]/40" />
            <div className="flex gap-3 mt-4">
              <button onClick={() => setEditMinimo(null)} className="flex-1 py-2.5 rounded-xl bg-slate-100 dark:bg-[#070710] text-slate-700 dark:text-slate-300 text-xs font-black uppercase tracking-wider cursor-pointer">Cancelar</button>
              <button onClick={async () => {
                const res = await setMinimo({ sucursalId: editMinimo.sucursalId, productoId: editMinimo.productoId, minimo: nuevoMinimo });
                setEditMinimo(null);
                if (res && !res.ok && res.mensaje) alert(res.mensaje);
              }} className="flex-1 py-2.5 rounded-xl bg-[#E95A0C] hover:bg-[#cc4a00] text-white text-xs font-black uppercase tracking-wider cursor-pointer shadow-md">Guardar</button>
            </div>
          </div>
        </div>
      )}

      <DeleteModal
        isOpen={!!movToDelete}
        onClose={() => setMovToDelete(null)}
        onConfirm={async () => {
          if (movToDelete) {
            const res = await eliminarMovimiento(movToDelete.id);
            setMovToDelete(null);
            if (res && !res.ok && res.mensaje) alert(res.mensaje);
          }
        }}
        title="¿Eliminar movimiento?"
        message="El movimiento se eliminará y el stock se revertirá al valor anterior."
        itemName={`${movToDelete?.producto?.nombre} · ${movToDelete?.tipo}`}
        itemIcon="fas fa-right-left"
      />
    </div>
  );
};

export default Stock;