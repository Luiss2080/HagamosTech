import React, { useState, useRef, useEffect } from 'react';
import { ESTADO_OPCIONES, SORT_OPCIONES, formatearBs, calcularDescuento } from '../constantes';

const DropdownSelect = ({ value, onChange, options }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);
  const selected = options.find(o => o.value === value) || options[0];
  return (
    <div className="relative w-full" ref={ref}>
      <button type="button" onClick={() => setOpen(!open)}
        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200/60 dark:border-white/5 bg-slate-50 dark:bg-[#070710] text-slate-800 dark:text-white dark:border-white/8 text-xs font-bold flex items-center justify-between gap-2 focus:ring-2 focus:ring-[#E95A0C]/40 outline-none cursor-pointer transition-all hover:border-[#E95A0C]/40">
        {selected.icon && <i className={`${selected.icon} text-[#E95A0C] text-xs`}></i>}
        <span className="flex-1 text-left">{selected.label}</span>
        <i className={`fas fa-chevron-down text-[9px] text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`}></i>
      </button>
      {open && (
        <div className="absolute z-[100] mt-1 w-full min-w-[180px] rounded-xl border border-slate-200/60 dark:border-white/5 bg-white shadow-2xl dark:shadow-black/80 overflow-hidden">
          {options.map(opt => (
            <button key={opt.value} type="button"
              onClick={() => { onChange(opt.value); setOpen(false); }}
              className={`w-full px-3.5 py-2.5 text-xs font-bold flex items-center gap-2 text-left transition-all cursor-pointer ${opt.value === value ? 'bg-[#8B4513] text-white' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'}`}>
              {opt.icon && <i className={`${opt.icon} text-xs ${opt.value === value ? 'text-white' : 'text-[#E95A0C]'}`}></i>}
              <span>{opt.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const ProductosLista = ({ productosFiltrados, paginated, onVer, onEditar, onEliminar, buscar, setBuscar, estado, setEstado, categoria, setCategoria, categorias, sort, setSort }) => {
  const [filtrosOpen, setFiltrosOpen] = useState(false);

  return (
    <div className="space-y-4 font-montserrat w-full">
      {/* PANEL DE FILTRADO */}
      <div className="bg-white dark:bg-[#040408] dark:border-white/8 rounded-2xl p-5 shadow-xl dark:shadow-black/60 border border-slate-200/60 dark:border-white/5 border-l-4 border-l-[#E95A0C] overflow-visible relative z-20">
        <div className="bg-gradient-to-r from-orange-50/80 to-transparent dark:from-[#E95A0C]/10 dark:to-transparent p-4 rounded-xl border border-orange-200/50 dark:border-[#E95A0C]/20 mb-4 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#E95A0C] text-white flex items-center justify-center text-sm shadow-md shadow-orange-900/5 shrink-0"><i className="fas fa-filter"></i></div>
          <div>
            <h3 className="text-sm font-black text-[#4A2E1B] dark:text-white uppercase tracking-wider m-0">Consulta y Filtrado</h3>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest m-0 mt-0.5">Localiza productos del menú y administra sus precios y existencias.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
          <div className="sm:col-span-5 space-y-1">
            <label className="block text-[9px] font-black uppercase tracking-wider text-[#E95A0C]">BUSCAR PRODUCTO</label>
            <div className="relative">
              <i className="fas fa-search absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
              <input type="text" placeholder="Buscar por nombre, enlace o descripción..." value={buscar}
                onChange={(e) => setBuscar(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200/60 dark:border-white/5 bg-slate-50 dark:bg-[#070710] text-slate-800 dark:text-white dark:border-white/8 text-xs focus:ring-2 focus:ring-[#E95A0C]/40 outline-none font-bold" />
            </div>
          </div>

          <div className="sm:col-span-3 space-y-1">
            <label className="block text-[9px] font-black uppercase tracking-wider text-[#E95A0C]">CATEGORÍA</label>
            <DropdownSelect value={categoria} onChange={setCategoria} options={categorias} />
          </div>

          <div className="sm:col-span-3 space-y-1">
            <label className="block text-[9px] font-black uppercase tracking-wider text-[#E95A0C]">ORDENAR</label>
            <DropdownSelect value={sort} onChange={setSort} options={SORT_OPCIONES} />
          </div>

          <div className="sm:col-span-1">
            <button onClick={() => setFiltrosOpen(!filtrosOpen)}
              className="w-full py-2.5 rounded-xl bg-[#E95A0C] hover:bg-[#8B4513] text-white flex items-center justify-center text-sm shadow-md transition-all cursor-pointer border-0 h-[40px] hover:scale-105"
              title="Ajustar Filtros"><i className="fas fa-filter"></i></button>
          </div>
        </div>

        {filtrosOpen && (
          <div className="mt-4 p-4 rounded-xl border border-slate-200/60 dark:border-white/5 bg-slate-50/60 dark:bg-[#070710]">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1">
                <label className="block text-[9px] font-black uppercase tracking-wider text-[#E95A0C]">ESTADO</label>
                <DropdownSelect value={estado} onChange={setEstado} options={ESTADO_OPCIONES} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* TABLA */}
      <div className="bg-white dark:bg-[#040408] dark:border-white/8 rounded-2xl p-5 shadow-xl dark:shadow-black/60 border border-slate-200/60 dark:border-white/5 border-l-4 border-l-[#E95A0C] overflow-visible relative z-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-5 pb-4 border-b-2 border-slate-100 dark:border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#E95A0C] text-white flex items-center justify-center text-sm shadow-lg shadow-orange-900/5 shrink-0"><i className="fas fa-box-open"></i></div>
            <div>
              <h3 className="text-sm font-black text-[#4A2E1B] dark:text-white uppercase tracking-wider m-0 leading-tight flex items-center gap-2">
                PRODUCTOS DEL MENÚ <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
              </h3>
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest m-0 mt-0.5">Catálogo de salteñas, bebidas y postres</p>
            </div>
          </div>
          <span className="text-[#E95A0C] border border-orange-200/50 text-[10px] px-4 py-1.5 rounded-xl font-black uppercase shadow-sm flex items-center gap-2">
            <i className="fas fa-boxes-stacked text-[10px]"></i><span className="text-xs">{productosFiltrados.length}</span> PRODUCTOS
          </span>
        </div>

        {paginated.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b-2 border-slate-100 dark:border-white/5 text-slate-400 uppercase text-[9px] font-black tracking-widest">
                  <th className="py-2.5 px-3">Producto</th>
                  <th className="py-2.5 px-3">Categoría</th>
                  <th className="py-2.5 px-3 text-right">Precio</th>
                  <th className="py-2.5 px-3 text-center">Stock</th>
                  <th className="py-2.5 px-3 text-center">Estado</th>
                  <th className="py-2.5 px-3 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                {paginated.map(p => {
                  const descuento = calcularDescuento(p.precio, p.precioAnterior);
                  return (
                    <tr key={p.id} className="hover:bg-orange-50/40 dark:hover:bg-red-950/10 transition-colors">
                      <td className="py-2.5 px-3">
                        <div className="flex items-center gap-3 min-w-[220px]">
                          <div className="w-11 h-11 rounded-xl overflow-hidden bg-[#FFF5EC] border border-orange-100 shrink-0">
                            {p.imagen ? <img src={p.imagen} alt={p.nombre} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-[#E95A0C]"><i className="fas fa-utensils text-sm"></i></div>}
                          </div>
                          <div className="min-w-0">
                            <p className="font-extrabold text-[#4A2E1B] dark:text-white text-[12px] truncate">{p.nombre}</p>
                            <p className="text-[9px] font-mono text-slate-400">{p.enlace}</p>
                            {p.insignia && <span className="text-[8px] font-black uppercase text-[#E95A0C]">{p.insignia}</span>}
                          </div>
                        </div>
                      </td>
                      <td className="py-2.5 px-3">
                        <span className="px-2 py-0.5 rounded-full bg-orange-50 dark:bg-orange-950/10 text-[#E95A0C] border border-orange-200/50 text-[9px] font-black uppercase">{p.categoria?.titulo || '—'}</span>
                      </td>
                      <td className="py-2.5 px-3 text-right">
                        <div className="flex flex-col items-end">
                          <span className="font-black text-[#E95A0C]">{formatearBs(p.precio)}</span>
                          {descuento > 0 && <span className="text-[9px] text-slate-400 line-through">{formatearBs(p.precioAnterior)} · -{descuento}%</span>}
                        </div>
                      </td>
                      <td className="py-2.5 px-3 text-center">
                        <span className={`px-2.5 py-1 rounded-lg font-black text-[10px] ${p.stock > 0 ? 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600' : 'bg-red-50 dark:bg-red-950/20 text-red-500'}`}>{p.stock}</span>
                      </td>
                      <td className="py-2.5 px-3 text-center">
                        <span className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase ${p.activo ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-slate-100 text-slate-400 border border-slate-200'}`}>{p.activo ? 'Activo' : 'Inactivo'}</span>
                      </td>
                      <td className="py-2.5 px-3">
                        <div className="flex items-center justify-end gap-1.5">
                          <button onClick={() => onVer(p)} className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white flex items-center justify-center text-[10px] shadow-md transition-all cursor-pointer hover:scale-110" title="Ver ficha"><i className="fas fa-eye"></i></button>
                          <button onClick={() => onEditar(p)} className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-white flex items-center justify-center text-[10px] shadow-md transition-all cursor-pointer hover:scale-110" title="Editar"><i className="fas fa-pen"></i></button>
                          <button onClick={() => onEliminar(p)} className="w-8 h-8 rounded-lg bg-gradient-to-br from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white flex items-center justify-center text-[10px] shadow-md transition-all cursor-pointer hover:scale-110" title="Eliminar"><i className="fas fa-trash-can"></i></button>
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
            <i className="fas fa-box-open text-3xl text-[#E95A0C] block mb-2 opacity-50"></i>
            No se encontraron productos con esos filtros.
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductosLista;