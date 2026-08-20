import React from 'react';
import { tipoMovimientoClase, tipoMovimientoIcono, tipoMovimientoLabel, formatearFecha } from '../constantes';
import DropdownSelect from '../DropdownSelect';

const MovimientosLista = ({ paginated, tipo, setTipo, buscar, setBuscar, desde, setDesde, hasta, setHasta, vista, setVista, vistaOptions, totalMovs, onVer, onEliminar }) => {
  const tipoOptions = [
    { value: 'todos', label: 'Todos los tipos', icon: 'fas fa-border-all' },
    { value: 'entrada', label: 'Entrada', icon: 'fas fa-arrow-down' },
    { value: 'salida', label: 'Salida', icon: 'fas fa-arrow-up' },
    { value: 'merma', label: 'Merma', icon: 'fas fa-biohazard' },
    { value: 'ajuste', label: 'Ajuste', icon: 'fas fa-sliders' },
    { value: 'transferencia_salida', label: 'Transferencia salida', icon: 'fas fa-arrow-right' },
    { value: 'transferencia_entrada', label: 'Transferencia entrada', icon: 'fas fa-arrow-left' }
  ];

  return (
    <div className="space-y-4 font-montserrat w-full">
      {/* FILTROS */}
      <div className="bg-white dark:bg-[#040408] dark:border-white/8 rounded-2xl p-5 shadow-xl dark:shadow-black/60 border border-slate-200/60 dark:border-white/5 border-l-4 border-l-[#E95A0C] overflow-visible relative z-20">
        <div className="bg-gradient-to-r from-orange-50/80 to-transparent dark:from-[#E95A0C]/10 dark:to-transparent p-4 rounded-xl border border-orange-200/50 dark:border-[#E95A0C]/20 mb-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#E95A0C] text-white flex items-center justify-center text-sm shadow-md shrink-0"><i className="fas fa-right-left"></i></div>
            <div>
              <h3 className="text-sm font-black text-[#4A2E1B] dark:text-white uppercase tracking-wider m-0">Kardex de Movimientos</h3>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest m-0 mt-0.5">Entradas, salidas, mermas, ajustes y transferencias.</p>
            </div>
          </div>
          <span className="text-[#E95A0C] border border-orange-200/50 text-[10px] px-4 py-1.5 rounded-xl font-black uppercase shadow-sm flex items-center gap-2 shrink-0">
            <i className="fas fa-database text-[10px]"></i><span className="text-xs">{totalMovs}</span> MOVIMIENTOS
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
          <div className="sm:col-span-4 space-y-1">
            <label className="block text-[9px] font-black uppercase tracking-wider text-[#E95A0C]"><i className="fas fa-search mr-1"></i>BUSCAR</label>
            <div className="relative">
              <i className="fas fa-search absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
              <input type="text" placeholder="Producto, referencia o motivo..." value={buscar} onChange={(e) => setBuscar(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200/60 dark:border-white/5 bg-slate-50 dark:bg-[#070710] text-slate-800 dark:text-white dark:border-white/8 text-xs focus:ring-2 focus:ring-[#E95A0C]/40 outline-none font-bold" />
            </div>
          </div>
          <div className="sm:col-span-2 space-y-1">
            <label className="block text-[9px] font-black uppercase tracking-wider text-[#E95A0C]"><i className="fas fa-right-left mr-1"></i>TIPO</label>
            <DropdownSelect value={tipo} onChange={setTipo} options={tipoOptions} />
          </div>
          <div className="sm:col-span-2 space-y-1">
            <label className="block text-[9px] font-black uppercase tracking-wider text-[#E95A0C]"><i className="fas fa-calendar mr-1"></i>DESDE</label>
            <input type="date" value={desde} onChange={(e) => setDesde(e.target.value)} className="w-full px-3 py-2.5 rounded-xl border border-slate-200/60 dark:border-white/5 bg-slate-50 dark:bg-[#070710] text-slate-800 dark:text-white dark:border-white/8 text-xs font-bold outline-none" />
          </div>
          <div className="sm:col-span-2 space-y-1">
            <label className="block text-[9px] font-black uppercase tracking-wider text-[#E95A0C]"><i className="fas fa-calendar-check mr-1"></i>HASTA</label>
            <input type="date" value={hasta} onChange={(e) => setHasta(e.target.value)} className="w-full px-3 py-2.5 rounded-xl border border-slate-200/60 dark:border-white/5 bg-slate-50 dark:bg-[#070710] text-slate-800 dark:text-white dark:border-white/8 text-xs font-bold outline-none" />
          </div>
          <div className="sm:col-span-2 space-y-1">
            <label className="block text-[9px] font-black uppercase tracking-wider text-[#E95A0C]"><i className="fas fa-layer-group mr-1"></i>VER</label>
            <DropdownSelect value={vista} onChange={setVista} options={vistaOptions} />
          </div>
        </div>
      </div>

      {/* TABLA */}
      <div className="bg-white dark:bg-[#040408] dark:border-white/8 rounded-2xl p-5 shadow-xl dark:shadow-black/60 border border-slate-200/60 dark:border-white/5 border-l-4 border-l-[#E95A0C] overflow-visible relative z-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-5 pb-4 border-b-2 border-slate-100 dark:border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#E95A0C] text-white flex items-center justify-center text-sm shadow-lg shrink-0"><i className="fas fa-clipboard-list"></i></div>
            <div>
              <h3 className="text-sm font-black text-[#4A2E1B] dark:text-white uppercase tracking-wider m-0 leading-tight">HISTORIAL DEL KARDEX <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse inline-block"></span></h3>
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest m-0 mt-0.5">Trazabilidad de existencias</p>
            </div>
          </div>
          <span className="text-[#E95A0C] border border-orange-200/50 text-[10px] px-4 py-1.5 rounded-xl font-black uppercase shadow-sm flex items-center gap-2">
            <i className="fas fa-database text-[10px]"></i><span className="text-xs">{totalMovs}</span> MOVIMIENTOS
          </span>
        </div>

        {paginated.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b-2 border-slate-100 dark:border-white/5 text-slate-400 uppercase text-[9px] font-black tracking-widest">
                  <th className="py-2.5 px-3">Producto</th>
                  <th className="py-2.5 px-3">Tipo</th>
                  <th className="py-2.5 px-3 text-center">Cant.</th>
                  <th className="py-2.5 px-3">Sucursal</th>
                  <th className="py-2.5 px-3">Motivo / Ref.</th>
                  <th className="py-2.5 px-3">Fecha</th>
                  <th className="py-2.5 px-3 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                {paginated.map(m => (
                  <tr key={m.id} className="hover:bg-orange-50/40 dark:hover:bg-red-950/10 transition-colors">
                    <td className="py-2.5 px-3">
                      <div className="flex items-center gap-2.5 min-w-[160px]">
                        <div className="w-9 h-9 rounded-lg overflow-hidden bg-[#FFF5EC] border border-orange-100 shrink-0">
                          {m.producto?.imagen ? <img src={m.producto.imagen} alt="" className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-[#E95A0C] text-[10px]"><i className="fas fa-utensils"></i></div>}
                        </div>
                        <span className="font-extrabold text-[#4A2E1B] dark:text-white text-[11px] truncate">{m.producto?.nombre}</span>
                      </div>
                    </td>
                    <td className="py-2.5 px-3">
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase ${tipoMovimientoClase(m.tipo)}`}>
                        <i className={`${tipoMovimientoIcono(m.tipo)} mr-1 text-[8px]`}></i>{tipoMovimientoLabel(m.tipo)}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-center font-black text-slate-700">{m.cantidad}</td>
                    <td className="py-2.5 px-3 font-bold text-slate-500">{m.sucursal?.nombre}</td>
                    <td className="py-2.5 px-3">
                      <p className="font-bold text-slate-600 truncate max-w-[180px]">{m.motivo || '—'}</p>
                      {m.referencia && <p className="text-[9px] font-mono text-slate-400">{m.referencia}</p>}
                    </td>
                    <td className="py-2.5 px-3 text-slate-500 font-bold whitespace-nowrap">{formatearFecha(m.creadoEn)}</td>
                    <td className="py-2.5 px-3">
                      <div className="flex items-center justify-end gap-1.5">
                        <button onClick={() => onVer(m)} className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white flex items-center justify-center text-[10px] shadow-md transition-all cursor-pointer hover:scale-110" title="Ver"><i className="fas fa-eye"></i></button>
                        <button onClick={() => onEliminar(m)} className="w-8 h-8 rounded-lg bg-gradient-to-br from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white flex items-center justify-center text-[10px] shadow-md transition-all cursor-pointer hover:scale-110" title="Eliminar"><i className="fas fa-trash-can"></i></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-12 text-center font-bold text-slate-400">
            <i className="fas fa-right-left text-3xl text-[#E95A0C] block mb-2 opacity-50"></i>
            No hay movimientos con esos filtros.
          </div>
        )}
      </div>
    </div>
  );
};

export default MovimientosLista;