import React from 'react';

const HistorialInventarioView = ({
  resultadoIntegridad,
  filtrosHistorial,
  setFiltrosHistorial,
  cargarMovimientos,
  loadingMovimientos,
  movimientos,
  paginatedMovimientos,
  onViewDetail,
  onFilter
}) => {
  return (
    <div className="space-y-4 font-montserrat w-full">
      {/* AUDITORÍA RESULTADOS */}
      {resultadoIntegridad && (
        <div className={`p-4 rounded-2xl border text-xs font-bold shadow-md border-l-4 ${
          resultadoIntegridad.integro 
            ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-900/50 text-[#E95A0C]merald-800 border-l-emerald-600' 
            : 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 text-rose-800 border-l-rose-600'
        }`}>
          <h4 className="text-xs font-black uppercase mb-1 flex items-center gap-2 m-0">
            <i className={resultadoIntegridad.integro ? 'fas fa-circle-check text-[#E95A0C]merald-600' : 'fas fa-triangle-exclamation text-rose-600'}></i>
            Auditoría de Almacén Física vs Lógica
          </h4>
          {resultadoIntegridad.integro ? (
            <p className="font-semibold text-[11px] m-0">✓ Todo correcto: El stock reportado en BD coincide exactamente con las transacciones registradas.</p>
          ) : (
            <div>
              <p className="font-bold mb-1 text-[11px] m-0">⚠ Inconsistencias de Almacén Detectadas:</p>
              <ul className="text-[11px] space-y-1 list-disc pl-5 font-semibold m-0">
                {resultadoIntegridad.inconsistencias.map((inc, i) => (
                  <li key={i}>
                    Libro: {inc.titulo} ({inc.codigo}) • En DB: {inc.stockActual} uds. • Calculado por Kardex: {inc.stockCalculado} uds.
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* PANEL DE FILTROS KARDEX */}
      <div className="bg-white dark:bg-[#040408] dark:border-white/8 rounded-2xl p-5 shadow-xl dark:shadow-black/60 border border-slate-200/60 dark:border-white/5 border-l-4 border-l-[#E95A0C]">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1 pb-3 border-b border-slate-100">
            <h3 className="text-xs font-black text-[#4A2E1B] dark:text-white uppercase tracking-wider flex items-center gap-1.5 m-0">
              <i className="fas fa-filter text-[#E95A0C]"></i> FILTROS DE AUDITORÍA
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <div>
              <label className="block text-[10px] font-black uppercase text-[#E95A0C] mb-1">FECHA DESDE:</label>
              <input
                type="date"
                value={filtrosHistorial.desde}
                onChange={(e) => setFiltrosHistorial(prev => ({ ...prev, desde: e.target.value }))}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200/60 dark:border-white/5 bg-slate-50 dark:bg-[#070710] text-slate-800 dark:text-white dark:border-white/8 dark:text-slate-200 text-xs focus:ring-2 focus:ring-[#E95A0C]/40 outline-none font-bold"
              />
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase text-[#E95A0C] mb-1">FECHA HASTA:</label>
              <input
                type="date"
                value={filtrosHistorial.hasta}
                onChange={(e) => setFiltrosHistorial(prev => ({ ...prev, hasta: e.target.value }))}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200/60 dark:border-white/5 bg-slate-50 dark:bg-[#070710] text-slate-800 dark:text-white dark:border-white/8 dark:text-slate-200 text-xs focus:ring-2 focus:ring-[#E95A0C]/40 outline-none font-bold"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-[10px] font-black uppercase text-[#E95A0C] mb-1">BUSCADOR CLIENTE/CÓDIGO:</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Escriba código de libro, cliente o motivo..."
                  value={filtrosHistorial.buscar}
                  onChange={(e) => setFiltrosHistorial(prev => ({ ...prev, buscar: e.target.value }))}
                  className="flex-1 px-3.5 py-2 rounded-xl border border-slate-200/60 dark:border-white/5 bg-slate-50 dark:bg-[#070710] text-slate-800 dark:text-white dark:border-white/8 dark:text-slate-200 text-xs focus:ring-2 focus:ring-[#E95A0C]/40 outline-none font-bold"
                />
                <button
                  onClick={onFilter}
                  className="px-4 py-2 bg-[#E95A0C] hover:bg-[#8B4513] text-white rounded-xl text-xs font-black uppercase tracking-wider cursor-pointer shadow-md shadow-orange-900/5 dark:shadow-none flex items-center gap-1.5"
                >
                  <i className="fas fa-filter text-xs"></i>
                  Filtrar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* LISTADO KARDEX */}
      <div className="bg-white dark:bg-[#040408] dark:border-white/8 rounded-2xl p-5 shadow-xl dark:shadow-black/60 border border-slate-200/60 dark:border-white/5 border-l-4 border-l-[#E95A0C]">
        <div className="flex justify-between items-center mb-5 pb-3 border-b border-slate-150">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 bg-[#E95A0C] text-white rounded-xl flex items-center justify-center text-xs shadow-md shadow-orange-900/5 dark:shadow-none">
              <i className="fas fa-receipt"></i>
            </span>
            <h3 className="text-xs font-black text-[#4A2E1B] dark:text-white uppercase tracking-wider m-0">
              MOVIMIENTOS DEL ALMACÉN
            </h3>
          </div>
          <span className=" text-[#E95A0C] border border-orange-200/50 dark:dark:border-orange-900/50 text-[10px] px-3 py-1 rounded-xl font-black uppercase shadow-sm">
            {movimientos.length} TRANSACCIONES
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b-2 border-slate-100 dark:border-white/5 dark:border-white/5 text-[#E95A0C] uppercase text-[9px] font-black tracking-widest                 <th className="py-3.5 px-4"><i className="fas fa-[#E95A0C] fa-calendar text-[#E95A0C] mr-1.5"></i>FECHA</th>
                <th className="py-3.5 px-4"><i className="fas fa-book text-[#E95A0C] mr-1.5"></i>LIBRO</th>
                <th className="py-3.5 px-4"><i className="fas fa-[#E95A0C] fa-right-left text-[#E95A0C] mr-1.5"></i>TIPO MOVIMIENTO</th>
                <th className="py-3.5 px-4 text-center"><i className="fas fa-cubes text-[#E95A0C] mr-1.5"></i>CANTIDAD</th>
                <th className="py-3.5 px-4"><i className="fas fa-[#E95A0C] fa-comment text-[#E95A0C] mr-1.5"></i>MOTIVO</th>
                <th className="py-3.5 px-4"><i className="fas fa-user text-[#E95A0C] mr-1.5"></i>CLIENTE / CONTACTO</th>
                <th className="py-3.5 px-4 text-center"><i className="fas fa-sliders text-[#E95A0C] mr-1.5"></i>ACCIONES</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5">
              {loadingMovimientos ? (
                <tr>
                  <td colSpan="7" className="text-center py-12 text-slate-400 font-bold">
                    <i className="fas fa-spinner fa-spin text-xl text-[#E95A0C] mb-2 block"></i>
                    Cargando bitácora de almacén...
                  </td>
                </tr>
              ) : paginatedMovimientos.length > 0 ? (
                paginatedMovimientos.map((m, index) => (
                  <tr key={index} className="hover: dark:hover:bg-red-950/20 transition-colors">
                    <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400 font-mono font-bold text-[11px]">
                      {new Date(m.fechaMovimiento).toLocaleDateString()}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-extrabold text-[#4A2E1B] dark:text-white block text-xs">{m.libro?.titulo || 'Libro'}</span>
                      <span className="text-[10px] text-[#E95A0C] font-bold font-mono">{m.libro?.codigo}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase inline-flex items-center gap-1 border ${
                        m.tipoMovimiento === 'ENTRADA' 
                          ? 'bg-emerald-50 dark:bg-emerald-950/40 text-[#E95A0C]merald-700 border-emerald-200 dark:text-[#E95A0C]merald-400' 
                          : 'bg-amber-50 dark:bg-amber-950/40 text-[#E95A0C]mber-800 border-amber-200 dark:text-[#E95A0C]mber-400'
                      }`}>
                        <i className={`fas ${m.tipoMovimiento === 'ENTRADA' ? 'fa-arrow-down' : 'fa-arrow-up'} text-[8px]`}></i>
                        {m.tipoMovimiento}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center font-black text-[#4A2E1B] dark:text-white text-xs">{m.cantidad} u.</td>
                    <td className="py-3.5 px-4 font-bold text-slate-700 dark:text-slate-300 text-xs">{m.motivo}</td>
                    <td className="py-3.5 px-4">
                      {m.clienteNombre ? (
                        <div>
                          <span className="font-bold text-[#4A2E1B] dark:text-white block text-xs">{m.clienteNombre}</span>
                          <span className="text-[9px] text-[#E95A0C] font-mono font-bold">{m.clienteContacto}</span>
                        </div>
                      ) : <span className="text-slate-400 font-mono">N/A</span>}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() => onViewDetail(m)}
                        className="w-9 h-9 rounded-xl bg-[#E95A0C] hover:bg-[#cc4a00] text-white flex items-center justify-center text-xs shadow-md shadow-orange-900/5 dark:shadow-none transition-all cursor-pointer border-0 mx-auto hover:scale-110"
                        title="Ver Detalle Transacción"
                      >
                        <i className="fas fa-file-invoice"></i>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-12 text-slate-400 font-bold">No hay transacciones registradas.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HistorialInventarioView;






















