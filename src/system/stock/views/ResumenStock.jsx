import React from 'react';
import { ESTADO_STOCK } from '../constantes';
import DropdownSelect from '../DropdownSelect';

const ResumenStock = ({ filas, paginated, buscar, setBuscar, sucursal, setSucursal, sucursales, estado, setEstado, vista, setVista, vistaOptions, onAjustar, onEditarMinimo }) => {
  const sucursalOptions = [
    { value: 'todas', label: 'Todas las sucursales', icon: 'fas fa-border-all' },
    ...sucursales.map(s => ({ value: String(s.id), label: s.nombre, icon: 'fas fa-store' }))
  ];
  const estadoOptions = [
    { value: 'todos', label: 'Todos los estados', icon: 'fas fa-border-all' },
    { value: 'ok', label: 'OK', icon: 'fas fa-circle-check' },
    { value: 'critico', label: 'Crítico', icon: 'fas fa-triangle-exclamation' },
    { value: 'agotado', label: 'Agotado', icon: 'fas fa-circle-xmark' }
  ];

  return (
    <div className="space-y-4 font-montserrat w-full">
      {/* FILTROS */}
      <div className="bg-white dark:bg-[#040408] dark:border-white/8 rounded-2xl p-5 shadow-xl dark:shadow-black/60 border border-slate-200/60 dark:border-white/5 border-l-4 border-l-[#E95A0C] overflow-visible relative z-20">
        <div className="bg-gradient-to-r from-orange-50/80 to-transparent dark:from-[#E95A0C]/10 dark:to-transparent p-4 rounded-xl border border-orange-200/50 dark:border-[#E95A0C]/20 mb-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#E95A0C] text-white flex items-center justify-center text-sm shadow-md shrink-0"><i className="fas fa-filter"></i></div>
            <div>
              <h3 className="text-sm font-black text-[#4A2E1B] dark:text-white uppercase tracking-wider m-0">Consulta de Stock</h3>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest m-0 mt-0.5">Existencias por sucursal, mínimos y estado.</p>
            </div>
          </div>
          <span className="text-[#E95A0C] border border-orange-200/50 text-[10px] px-4 py-1.5 rounded-xl font-black uppercase shadow-sm flex items-center gap-2 shrink-0">
            <i className="fas fa-boxes-stacked text-[10px]"></i><span className="text-xs">{filas.length}</span> REGISTROS
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
          <div className="sm:col-span-4 space-y-1">
            <label className="block text-[9px] font-black uppercase tracking-wider text-[#E95A0C]"><i className="fas fa-search mr-1"></i>BUSCAR PRODUCTO</label>
            <div className="relative">
              <i className="fas fa-search absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
              <input type="text" placeholder="Nombre o enlace..." value={buscar} onChange={(e) => setBuscar(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200/60 dark:border-white/5 bg-slate-50 dark:bg-[#070710] text-slate-800 dark:text-white dark:border-white/8 text-xs focus:ring-2 focus:ring-[#E95A0C]/40 outline-none font-bold" />
            </div>
          </div>
          <div className="sm:col-span-3 space-y-1">
            <label className="block text-[9px] font-black uppercase tracking-wider text-[#E95A0C]"><i className="fas fa-store mr-1"></i>SUCURSAL</label>
            <DropdownSelect value={sucursal} onChange={setSucursal} options={sucursalOptions} />
          </div>
          <div className="sm:col-span-2 space-y-1">
            <label className="block text-[9px] font-black uppercase tracking-wider text-[#E95A0C]"><i className="fas fa-circle-info mr-1"></i>ESTADO</label>
            <DropdownSelect value={estado} onChange={setEstado} options={estadoOptions} />
          </div>
          <div className="sm:col-span-3 space-y-1">
            <label className="block text-[9px] font-black uppercase tracking-wider text-[#E95A0C]"><i className="fas fa-layer-group mr-1"></i>VER</label>
            <DropdownSelect value={vista} onChange={setVista} options={vistaOptions} />
          </div>
        </div>
      </div>

      {/* TABLA */}
      <div className="bg-white dark:bg-[#040408] dark:border-white/8 rounded-2xl p-5 shadow-xl dark:shadow-black/60 border border-slate-200/60 dark:border-white/5 border-l-4 border-l-[#E95A0C] overflow-visible relative z-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-5 pb-4 border-b-2 border-slate-100 dark:border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#E95A0C] text-white flex items-center justify-center text-sm shadow-lg shrink-0"><i className="fas fa-boxes-stacked"></i></div>
            <div>
              <h3 className="text-sm font-black text-[#4A2E1B] dark:text-white uppercase tracking-wider m-0 leading-tight">STOCK POR SUCURSAL <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse inline-block"></span></h3>
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest m-0 mt-0.5">Existencias, mínimos y alertas</p>
            </div>
          </div>
          <span className="text-[#E95A0C] border border-orange-200/50 text-[10px] px-4 py-1.5 rounded-xl font-black uppercase shadow-sm flex items-center gap-2">
            <i className="fas fa-database text-[10px]"></i><span className="text-xs">{filas.length}</span> REGISTROS
          </span>
        </div>

        {paginated.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b-2 border-slate-100 dark:border-white/5 text-slate-400 uppercase text-[9px] font-black tracking-widest">
                  <th className="py-2.5 px-3">Producto</th>
                  <th className="py-2.5 px-3">Categoría</th>
                  <th className="py-2.5 px-3">Sucursal</th>
                  <th className="py-2.5 px-3 text-center">Stock</th>
                  <th className="py-2.5 px-3 text-center">Mínimo</th>
                  <th className="py-2.5 px-3 text-center">Estado</th>
                  <th className="py-2.5 px-3 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                {paginated.map(f => {
                  const conf = ESTADO_STOCK[f.estado] || ESTADO_STOCK.ok;
                  return (
                    <tr key={f.id} className="hover:bg-orange-50/40 dark:hover:bg-red-950/10 transition-colors">
                      <td className="py-2.5 px-3">
                        <div className="flex items-center gap-3 min-w-[180px]">
                          <div className="w-10 h-10 rounded-xl overflow-hidden bg-[#FFF5EC] border border-orange-100 shrink-0">
                            {f.imagen ? <img src={f.imagen} alt={f.productoNombre} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-[#E95A0C]"><i className="fas fa-utensils text-sm"></i></div>}
                          </div>
                          <div className="min-w-0">
                            <p className="font-extrabold text-[#4A2E1B] dark:text-white text-[12px] truncate">{f.productoNombre}</p>
                            <p className="text-[9px] font-mono text-slate-400">{f.enlace}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-2.5 px-3"><span className="px-2 py-0.5 rounded-full bg-orange-50 dark:bg-orange-950/10 text-[#E95A0C] border border-orange-200/50 text-[9px] font-black uppercase">{f.categoria}</span></td>
                      <td className="py-2.5 px-3 font-bold text-slate-600">{f.sucursalNombre}</td>
                      <td className="py-2.5 px-3 text-center">
                        <span className={`px-2.5 py-1 rounded-lg font-black text-[11px] ${f.stock <= 0 ? 'bg-red-50 text-red-500' : 'bg-slate-100 text-slate-700'}`}>{f.stock}</span>
                      </td>
                      <td className="py-2.5 px-3 text-center text-slate-500 font-bold">{f.minimo}</td>
                      <td className="py-2.5 px-3 text-center">
                        <span className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase ${conf.cls}`}><i className={`${conf.icon} mr-1 text-[8px]`}></i>{conf.label}</span>
                      </td>
                      <td className="py-2.5 px-3">
                        <div className="flex items-center justify-end gap-1.5">
                          <button onClick={() => onAjustar(f)} className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white text-[9px] font-black uppercase tracking-wide shadow-md transition-all cursor-pointer hover:scale-105"><i className="fas fa-sliders mr-1"></i>Ajustar</button>
                          <button onClick={() => onEditarMinimo(f)} className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-white flex items-center justify-center text-[10px] shadow-md transition-all cursor-pointer hover:scale-110" title="Editar mínimo"><i className="fas fa-gauge-high"></i></button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-12 text-center font-bold text-slate-400">
            <i className="fas fa-boxes-stacked text-3xl text-[#E95A0C] block mb-2 opacity-50"></i>
            No se encontraron registros de stock con esos filtros.
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumenStock;