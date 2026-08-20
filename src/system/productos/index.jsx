import React, { useState, useMemo, useEffect } from 'react';
import { BreadcrumbHeader } from '../components/layouts/Sidebar';
import Pagination from '../components/Pagination';
import ProductosLista from './pages/lista';
import ProductoCreateView from './pages/create';
import ProductoEditView from './pages/edit';
import ProductoShowView from './pages/show';
import DeleteModal from '../components/mod/delete';
import KpiCard from '../components/KpiCard';
import { ESTADO_OPCIONES } from './constantes';

const Productos = ({
  productos = [],
  categorias = [],
  productoForm,
  setProductoForm,
  submitProducto,
  eliminarProducto,
  cargarProductos,
  setActiveTab,
  setProductoEditando,
  initialView = 'index'
}) => {
  const [currentView, setCurrentView] = useState(initialView);
  const [buscar, setBuscar] = useState('');
  const [categoria, setCategoria] = useState('todas');
  const [estado, setEstado] = useState('todos');
  const [sort, setSort] = useState('recientes');
  const [currentPage, setCurrentPage] = useState(1);
  const [productoDetail, setProductoDetail] = useState(null);
  const [productoToDelete, setProductoToDelete] = useState(null);
  const itemsPerPage = 8;

  useEffect(() => { if (initialView) setCurrentView(initialView); }, [initialView]);
  useEffect(() => { setCurrentPage(1); }, [buscar, categoria, estado, sort]);

  const categoriaOptions = [
    { value: 'todas', label: 'Todas las categorías', icon: 'fas fa-border-all' },
    ...categorias.map(c => ({ value: c.id, label: c.titulo, icon: 'fas fa-tag' }))
  ];

  const productosFiltrados = useMemo(() => {
    let list = [...productos];
    const term = buscar.toLowerCase().trim();
    if (term) {
      list = list.filter(p => (p.nombre || '').toLowerCase().includes(term) || (p.enlace || '').toLowerCase().includes(term) || (p.descripcion || '').toLowerCase().includes(term));
    }
    if (categoria !== 'todas') list = list.filter(p => String(p.categoriaId) === String(categoria));
    if (estado === 'activo') list = list.filter(p => p.activo);
    if (estado === 'inactivo') list = list.filter(p => !p.activo);

    if (sort === 'nombre_az') list.sort((a, b) => (a.nombre || '').localeCompare(b.nombre || ''));
    else if (sort === 'precio_menor') list.sort((a, b) => a.precio - b.precio);
    else if (sort === 'precio_mayor') list.sort((a, b) => b.precio - a.precio);
    else list.sort((a, b) => b.id - a.id);

    return list;
  }, [productos, buscar, categoria, estado, sort]);

  const totalPages = Math.ceil(productosFiltrados.length / itemsPerPage) || 1;
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return productosFiltrados.slice(start, start + itemsPerPage);
  }, [productosFiltrados, currentPage]);

  const handleStartCreate = () => {
    setProductoEditando(null);
    setProductoForm({ nombre: '', enlace: '', categoriaId: '', precio: '', precioAnterior: '', descuento: '', calificacion: '', imagen: '', insignia: '', descripcion: '', descripcionCorta: '', disponibilidad: 'En stock', stock: 0, activo: true });
    setCurrentView('create');
  };

  const handleStartEdit = (p) => {
    setProductoEditando(p);
    setProductoForm({
      id: p.id,
      nombre: p.nombre || '',
      enlace: p.enlace || '',
      categoriaId: p.categoriaId || '',
      precio: p.precio ?? '',
      precioAnterior: p.precioAnterior ?? '',
      descuento: p.descuento || '',
      calificacion: p.calificacion || '',
      imagen: p.imagen || '',
      insignia: p.insignia || '',
      descripcion: p.descripcion || '',
      descripcionCorta: p.descripcionCorta || '',
      disponibilidad: p.disponibilidad || 'En stock',
      stock: p.stock ?? 0,
      activo: p.activo !== false
    });
    setCurrentView('edit');
  };

  const handleBackToList = () => {
    if (cargarProductos) cargarProductos();
    setCurrentView('index');
  };

  const handleFormSubmit = async (e) => {
    const ok = await submitProducto(e);
    if (ok) handleBackToList();
  };

  return (
    <div className="space-y-4 font-montserrat w-full">
      {currentView === 'index' && (
        <>
          <BreadcrumbHeader
            icon="fas fa-box-open"
            breadcrumbs={[
              { label: 'Comercial', onClick: () => setActiveTab && setActiveTab('inicio') },
              { label: 'Productos' }
            ]}
            title="Catálogo de Productos (Menú)"
            subtitle="Consulte, registre, edite y administre los productos del menú de la salteñería."
            actionButtonText="Nuevo Producto"
            onActionClick={handleStartCreate}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <KpiCard
              icon="fas fa-box-open"
              number={productosFiltrados.length}
              title="Productos / Menú"
              trend={{ text: '+2 Nuevos', icon: 'fas fa-arrow-up', cls: 'text-amber-600 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50' }}
              details={[{ icon: 'fas fa-circle-check', text: 'Catálogo activo', color: 'text-amber-500' }]}
              bubble="bg-gradient-to-br from-amber-500 to-yellow-500"
              border="border-l-amber-500"
            />
            <KpiCard
              icon="fas fa-utensils"
              number={productos.filter(p => p.categoria?.enlace === 'saltenas' || p.categoriaId === 1).length}
              title="Salteñas"
              details={[{ icon: 'fas fa-crown', text: 'Producto estrella', color: 'text-[#E95A0C]' }]}
              bubble="bg-[#E95A0C]"
              border="border-l-[#E95A0C]"
            />
            <KpiCard
              icon="fas fa-boxes-stacked"
              number={productos.filter(p => (p.stock || 0) > 0).length}
              title="En stock"
              trend={{ text: '+15%', icon: 'fas fa-arrow-up', cls: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50' }}
              details={[{ icon: 'fas fa-circle-info', text: 'Disponibles para venta', color: 'text-emerald-500' }]}
              bubble="bg-gradient-to-br from-emerald-500 to-teal-500"
              border="border-l-emerald-500"
            />
            <KpiCard
              icon="fas fa-tags"
              number={productos.filter(p => p.precioAnterior && p.precio < p.precioAnterior).length}
              title="Con descuento"
              details={[{ icon: 'fas fa-fire', text: 'Ofertas activas', color: 'text-red-500' }]}
              bubble="bg-gradient-to-br from-red-500 to-rose-600"
              border="border-l-red-500"
            />
          </div>

          <ProductosLista
            productosFiltrados={productosFiltrados}
            paginated={paginated}
            onVer={(p) => { setProductoDetail(p); setCurrentView('show'); }}
            onEditar={handleStartEdit}
            onEliminar={(p) => setProductoToDelete(p)}
            buscar={buscar}
            setBuscar={setBuscar}
            estado={estado}
            setEstado={setEstado}
            categoria={categoria}
            setCategoria={setCategoria}
            categorias={categoriaOptions}
            sort={sort}
            setSort={setSort}
          />

          <div className="bg-white dark:bg-[#040408] rounded-2xl p-5 shadow-xl dark:shadow-black/60 border border-slate-200/60 dark:border-white/5 border-l-4 border-l-[#E95A0C] text-center w-full">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={productosFiltrados.length}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
              itemLabel="productos"
            />
          </div>
        </>
      )}

      {currentView === 'create' && (
        <ProductoCreateView
          productoForm={productoForm}
          setProductoForm={setProductoForm}
          submitProducto={handleFormSubmit}
          onBackToList={handleBackToList}
          categorias={categorias}
        />
      )}

      {currentView === 'edit' && (
        <ProductoEditView
          productoForm={productoForm}
          setProductoForm={setProductoForm}
          submitProducto={handleFormSubmit}
          onBackToList={handleBackToList}
          categorias={categorias}
        />
      )}

      {currentView === 'show' && productoDetail && (
        <ProductoShowView
          producto={productoDetail}
          onBackToList={handleBackToList}
          onEdit={handleStartEdit}
        />
      )}

      <DeleteModal
        isOpen={!!productoToDelete}
        onClose={() => setProductoToDelete(null)}
        onConfirm={async () => {
          if (productoToDelete) {
            const ok = await eliminarProducto(productoToDelete.id);
            if (ok) { setProductoToDelete(null); if (cargarProductos) cargarProductos(); }
          }
        }}
        title="¿Eliminar Producto del Menú?"
        message="¿Está completamente seguro de que desea eliminar este producto? Se quitará del catálogo y su stock asociado."
        itemName={productoToDelete?.nombre}
        itemIcon="fas fa-box-open"
      />
    </div>
  );
};

export default Productos;