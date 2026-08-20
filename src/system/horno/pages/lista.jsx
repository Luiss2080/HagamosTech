import React, { useState, useRef, useEffect } from 'react';
import { TIPO_OPCIONES, tipoClase, tipoIcono, tipoLabel, estadoClase, formatearFecha } from '../constantes';

const DropdownSelect = ({ value, onChange, options }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);
  const selected = options.find(o => String(o.value) === String(value)) || options[0];
  return (
    <div className="relative w-full" ref={ref}>
      <button type="button" onClick={() => setOpen(!open)}
        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200/60 dark:border-white/5 bg-slate-50 dark:bg-[#070710] text-slate-800 dark:text-white dark:border-white/8 text-xs font-bold flex items-center justify-between gap-2 focus:ring-2 focus:ring-[#E95A0C]/40 outline-none cursor-pointer transition-all hover:border-[#E95A0C]/40">
        {selected.icon && <i className={`${selected.icon} text-[#E95A0C] text-xs`}></i>}
        <span className="flex-1 text-left truncate">{selected.label}</span>
        <i className={`fas fa-chevron-down text-[9px] text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`}></i>
      </button>
      {open && (
        <div className="absolute z-[100] mt-1 w-full min-w-[190px] rounded-xl border border-slate-200/60 dark:border-white/5 bg-white shadow-2xl dark:shadow-black/80 overflow-hidden max-h-64 overflow-y-auto">
          {options.map(opt => (
            <button key={opt.value} type="button"
              onClick={() => { onChange(opt.value); setOpen(false); }}
              className={`w-full px-3.5 py-2.5 text-xs font-bold flex items-center gap-2 text-left transition-all cursor-pointer ${String(opt.value) === String(value) ? 'bg-[#8B4513] text-white' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'}`}>
              {opt.icon && <i className={`${opt.icon} text-xs ${String(opt.value) === String(value) ? 'text-white' : 'text-[#E95A0C]'}`}></i>}
              <span className="truncate">{opt.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const HornoLista = ({ registrosFiltrados, paginated, sucursales, onVer, onEditar, onAnular, onEliminar, buscar, setBuscar, tipo, setTipo, sucursal, setSucursal }) => {
  const sucursalOptions = [
    { value: 'todas', label: 'Todas las sucursales', icon: 'fas fa-border-all' },
    ...sucursales.map(s => ({ value: String(s.id), label: s.nombre, icon: 'fas fa-store' }))
  ];

  return (
    <div className="space-y-4 font-montserrat w-full">
      <div className="bg-white dark:bg-[#040408] dark:border-white/8 rounded-2xl p-5 shadow-xl dark:shadow-black/60 border border-slate-200/60 dark:border-white/5 border-l-4 border-l-[#E95A0C] overflow-visible relative z-20">
        <div className="bg-gradient-to-r from-orange-50/80 to-transparent dark:from-[#E95A0C]/10 dark:to-transparent p-4 rounded-xl border border-orange-200/50 dark:border-[#E95A0C]/20 mb-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#E95A0C] text-white flex items-center justify-center text-sm shadow-md shrink-0"><i className="fas fa-fire-burner"></i></div>
            <div>
              <h3 className="text-sm font-black text-[#4A2E1B] dark:text-white uppercase tracking-wider m-0">Consulta de Producción del Horno</h3>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest m-0 mt-0.5">Tandas de horneado y mermas registradas.</p>
            </div>
          </div>
          <span className="text-[#E95A0C] border border-orange-200/50 text-[10px] px-4 py-1.5 rounded-xl font-black uppercase shadow-sm flex items-center gap-2 shrink-0">
            <i className="fas fa-fire-burner text-[10px]"></i><span className="text-xs">{registrosFiltrados.length}</span> REGISTROS
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
          <div className="sm:col-span-5 space-y-1">
            <label className="block text-[9px] font-black uppercase tracking-wider text-[#E95A0C]">BUSCAR</label>
            <div className="relative">
              <i className="fas fa-search absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
              <input type="text" placeholder="Código, producto o motivo..." value={buscar} onChange={(e) => setBuscar(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200/60 dark:border-white/5 bg-slate-50 dark:bg-[#070710] text-slate-800 dark:text-white dark:border-white/8 text-xs focus:ring-2 focus:ring-[#E95A0C]/40 outline-none font-bold" />
            </div>
          </div>
          <div className="sm:col-span-3 space-y-1">
            <label className="block text-[9px] font-black uppercase tracking-wider text-[#E95A0C]">TIPO</label>
            <DropdownSelect value={tipo} onChange={setTipo} options={TIPO_OPCIONES} />
          </div>
          <div className="sm:col-span-2 space-y-1">
            <label className="block text-[9px] font-black uppercase tracking-wider text-[#E95A0C]">SUCURSAL</label>
            <DropdownSelect value={sucursal} onChange={setSucursal} options={sucursalOptions} />
          </div>
          <div className="sm:col-span-2 space-y-1">
            <label className="block text-[9px] font-black uppercase tracking-wider text-[#E95A0C]">TOTAL</label>
            <div className="text-[#E95A0C] border border-orange-200/50 px-3 py-2.5 rounded-xl font-black uppercase shadow-sm flex items-center gap-2 justify-center text-xs">{registrosFiltrados.length}</div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-[#040408] dark:border-white/8 rounded-2xl p-5 shadow-xl dark:shadow-black/60 border border-slate-200/60 dark:border-white/5 border-l-4 border-l-[#E95A0C] overflow-visible relative z-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-5 pb-4 border-b-2 border-slate-100 dark:border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#E95A0C] text-white flex items-center justify-center text-sm shadow-lg shrink-0"><i className="fas fa-fire-burner"></i></div>
            <div>
              <h3 className="text-sm font-black text-[#4A2E1B] dark:text-white uppercase tracking-wider m-0 leading-tight">PRODUCCIÓN Y MERMAS <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse inline-block"></span></h3>
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest m-0 mt-0.5">El horno de la salteñería</p>
            </div>
          </div>
        </div>

        {paginated.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b-2 border-slate-100 dark:border-white/5 text-slate-400 uppercase text-[9px] font-black tracking-widest">
                  <th className="py-2.5 px-3">Registro</th>
                  <th className="py-2.5 px-3">Tipo</th>
                  <th className="py-2.5 px-3">Producto</th>
                  <th className="py-2.5 px-3">Sucursal</th>
                  <th className="py-2.5 px-3 text-center">Cant.</th>
                  <th className="py-2.5 px-3">Motivo</th>
                  <th className="py-2.5 px-3 text-center">Estado</th>
                  <th className="py-2.5 px-3 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                {paginated.map(r => (
                  <tr key={r.id} className="hover:bg-orange-50/40 dark:hover:bg-red-950/10 transition-colors">
                    <td className="py-2.5 px-3">
                      <p className="font-extrabold text-[#4A2E1B] dark:text-white text-[12px]">{r.codigo}</p>
                      <p className="text-[9px] font-bold text-slate-400">{formatearFecha(r.creadoEn)}</p>
                    </td>
                    <td className="py-2.5 px-3">
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase ${tipoClase(r.tipo)}`}><i className={`${tipoIcono(r.tipo)} mr-1 text-[8px]`}></i>{tipoLabel(r.tipo)}</span>
                    </td>
                    <td className="py-2.5 px-3">
                      <div className="flex items-center gap-2.5 min-w-[150px]">
                        <div className="w-9 h-9 rounded-lg overflow-hidden bg-[#FFF5EC] border border-orange-100 shrink-0">
                          {r.producto?.imagen ? <img src={r.producto.imagen} alt="" className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-[#E95A0C] text-[10px]"><i className="fas fa-utensils"></i></div>}
                        </div>
                        <span className="font-bold text-slate-600 text-[11px] truncate">{r.producto?.nombre}</span>
                      </div>
                    </td>
                    <td className="py-2.5 px-3 font-bold text-slate-500">{r.sucursal?.nombre}</td>
                    <td className="py-2.5 px-3 text-center font-black text-slate-700">{r.cantidad}</td>
                    <td className="py-2.5 px-3 font-bold text-slate-500 truncate max-w-[160px]">{r.motivo || '—'}</td>
                    <td className="py-2.5 px-3 text-center">
                      <span className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase ${estadoClase(r.estado)}`}>{r.estado}</span>
                    </td>
                    <td className="py-2.5 px-3">
                      <div className="flex items-center justify-end gap-1.5">
                        <button onClick={() => onVer(r)} className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white flex items-center justify-center text-[10px] shadow-md transition-all cursor-pointer hover:scale-110" title="Ver"><i className="fas fa-eye"></i></button>
                        <button onClick={() => onEditar(r)} disabled={r.estado === 'anulada'} className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-white flex items-center justify-center text-[10px] shadow-md transition-all cursor-pointer hover:scale-110 disabled:opacity-30" title="Editar"><i className="fas fa-pen"></i></button>
                        <button onClick={() => onAnular(r)} disabled={r.estado === 'anulada'} className="w-8 h-8 rounded-lg bg-gradient-to-br from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white flex items-center justify-center text-[10px] shadow-md transition-all cursor-pointer hover:scale-110 disabled:opacity-30" title="Anular"><i className="fas fa-ban"></i></button>
                        <button onClick={() => onEliminar(r)} className="w-8 h-8 rounded-lg bg-gradient-to-br from-slate-500 to-slate-600 hover:from-slate-600 hover:to-slate-700 text-white flex items-center justify-center text-[10px] shadow-md transition-all cursor-pointer hover:scale-110" title="Eliminar"><i className="fas fa-trash-can"></i></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-12 text-center font-bold text-slate-400">
            <i className="fas fa-fire-burner text-3xl text-[#E95A0C] block mb-2 opacity-50"></i>
            No hay registros del horno con esos filtros.
          </div>
        )}
      </div>
    </div>
  );
};

export default HornoLista;