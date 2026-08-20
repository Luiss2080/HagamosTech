import React, { useState, useMemo } from 'react';
import { BreadcrumbHeader } from '../../components/layouts/Sidebar';
import Pagination from '../../components/Pagination';
import HistorialInventarioView from '../views/HistorialInventarioView';
import MovimientoDetailModal from '../modals/MovimientoDetailModal';

const HistorialInventario = ({
  filtrosHistorial,
  setFiltrosHistorial,
  cargarMovimientos,
  loadingMovimientos,
  movimientos,
  verificarIntegridadInventario,
  verificandoIntegridad,
  resultadoIntegridad
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [movimientoDetail, setMovimientoDetail] = useState(null);

  const totalPages = Math.ceil(movimientos.length / itemsPerPage) || 1;
  const paginatedMovimientos = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return movimientos.slice(start, start + itemsPerPage);
  }, [movimientos, currentPage]);

  return (
    <div className="space-y-4 font-montserrat w-full">
      <BreadcrumbHeader
        icon="fas fa-receipt"
        breadcrumbs={['Sistema', 'Inventario', 'Movimientos']}
        title="Historial de Movimientos"
        subtitle="Consulte las entradas, salidas y ajustes registrados en el inventario."
      />

      <HistorialInventarioView
        filtrosHistorial={filtrosHistorial}
        setFiltrosHistorial={setFiltrosHistorial}
        cargarMovimientos={cargarMovimientos}
        loadingMovimientos={loadingMovimientos}
        movimientos={movimientos}
        paginatedMovimientos={paginatedMovimientos}
        onViewDetail={setMovimientoDetail}
        verificarIntegridadInventario={verificarIntegridadInventario}
        verificandoIntegridad={verificandoIntegridad}
        resultadoIntegridad={resultadoIntegridad}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={movimientos.length}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
        itemLabel="movimientos"
      />

      <MovimientoDetailModal
        movimiento={movimientoDetail}
        onClose={() => setMovimientoDetail(null)}
      />
    </div>
  );
};

export default HistorialInventario;






















