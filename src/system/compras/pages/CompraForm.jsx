import React, { useState, useRef, useEffect } from 'react';
import { formatearBs } from '../constantes';

const inputCls = "w-full px-3.5 py-2.5 rounded-xl border border-slate-200/60 dark:border-white/5 bg-slate-50 dark:bg-[#070710] text-slate-800 dark:text-white dark:border-white/8 text-xs focus:ring-2 focus:ring-[#E95A0C]/40 outline-none font-bold";

const DropdownSelect = ({ value, onChange, options, placeholder }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);
  const selected = options.find(o => String(o.value) === String(value));
  return (
    <div className="relative w-full" ref={ref}>
      <button type="button" onClick={() => setOpen(!open)}
        className={`${inputCls} flex items-center justify-between gap-2 cursor-pointer`}>
        {selected?.icon && <i className={`${selected.icon} text-[#E95A0C] text-xs`}></i>}
        <span className={`flex-1 text-left truncate ${selected ? '' : 'text-slate-400'}`}>{selected?.label || placeholder || 'Seleccione...'}</span>
        <i className={`fas fa-chevron-down text-[9px] text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`}></i>
      </button>
      {open && (
        <div className="absolute z-[100] mt-1 w-full min-w-[200px] rounded-xl border border-slate-200/60 dark:border-white/5 bg-white shadow-2xl dark:shadow-black/80 overflow-hidden max-h-64 overflow-y-auto">
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

const CompraForm = ({ form, set, onBackToList, onSubmit, productos, sucursales, modo, titulo }) => {
  const cantidad = parseInt(form.cantidad) || 0;
  const precio = parseFloat(form.precioUnitario) || 0;
  const total = cantidad * precio;

  const productoOptions = [
    { value: '', label: 'Seleccione un insumo/producto', icon: 'fas fa-utensils' },
    ...productos.map(p => ({ value: String(p.id), label: `${p.nombre} — ${formatearBs(p.precio)}`, icon: 'fas fa-tag' }))
  ];
  const sucursalOptions = [
    { value: '', label: 'Seleccione una sucursal', icon: 'fas fa-store' },
    ...sucursales.map(s => ({ value: String(s.id), label: s.nombre, icon: 'fas fa-store' }))
  ];

  return (
    <div className="space-y-5 font-montserrat w-full">
      {/* CABECERA */}
      <div className="bg-white dark:bg-[#040408] rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-200 dark:border-white/5 border-l-4 border-l-[#E95A0C] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl text-[#E95A0C] flex items-center justify-center text-xl font-black shadow-sm shrink-0 border border-orange-200/50"><i className="fas fa-truck-moving"></i></div>
          <div>
            <div className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">
              <span>Comercial</span><span>{'>'}</span><span>Compras</span><span>{'>'}</span><span className="text-[#E95A0C]">{modo === 'editar' ? 'Editar Compra' : 'Registrar Compra'}</span>
            </div>
            <h2 className="text-xl font-black text-[#4A2E1B] dark:text-white uppercase tracking-wider m-0 leading-none">{titulo}</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider mt-1 m-0">Compra de insumos a proveedor · la entrada se registra en el stock.</p>
          </div>
        </div>
        <button onClick={onBackToList} className="px-5 py-2.5 rounded-xl bg-[#E95A0C] hover:bg-[#cc4a00] text-white text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 shadow-md border border-red-800/40 shrink-0">
          <i className="fas fa-arrow-left"></i><span>Volver al listado</span>
        </button>
      </div>

      <form onSubmit={onSubmit} className="bg-white dark:bg-[#040408] rounded-2xl p-6 shadow-xl dark:shadow-black/60 border border-slate-200/60 dark:border-white/5 border-l-4 border-l-[#E95A0C] space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="block text-[10px] font-black uppercase tracking-wider text-[#E95A0C]">PRODUCTO / INSUMO <b className="text-red-500">*</b></label>
            <DropdownSelect value={form.productoId} onChange={(v) => set('productoId', v)} options={productoOptions} placeholder="Seleccione un insumo" />
          </div>
          <div className="space-y-1">
            <label className="block text-[10px] font-black uppercase tracking-wider text-[#E95A0C]">SUCURSAL DESTINO <b className="text-red-500">*</b></label>
            <DropdownSelect value={form.sucursalId} onChange={(v) => set('sucursalId', v)} options={sucursalOptions} placeholder="Seleccione una sucursal" />
          </div>
          <div className="space-y-1">
            <label className="block text-[10px] font-black uppercase tracking-wider text-[#E95A0C]">PROVEEDOR <b className="text-red-500">*</b></label>
            <div className="relative">
              <i className="fas fa-truck absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
              <input type="text" required value={form.proveedorNombre} onChange={(e) => set('proveedorNombre', e.target.value)} placeholder="Nombre del proveedor / distribuidor" className={`${inputCls} pl-9`} />
            </div>
          </div>
          <div className="space-y-1">
            <label className="block text-[10px] font-black uppercase tracking-wider text-[#E95A0C]">CONTACTO DEL PROVEEDOR</label>
            <div className="relative">
              <i className="fas fa-phone absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
              <input type="text" value={form.proveedorContacto} onChange={(e) => set('proveedorContacto', e.target.value)} placeholder="Teléfono o correo" className={`${inputCls} pl-9`} />
            </div>
          </div>
          <div className="space-y-1">
            <label className="block text-[10px] font-black uppercase tracking-wider text-[#E95A0C]">CANTIDAD <b className="text-red-500">*</b></label>
            <input type="number" min="1" required value={form.cantidad} onChange={(e) => set('cantidad', e.target.value)} placeholder="Unidades" className={inputCls} />
          </div>
          <div className="space-y-1">
            <label className="block text-[10px] font-black uppercase tracking-wider text-[#E95A0C]">PRECIO UNITARIO (Bs) <b className="text-red-500">*</b></label>
            <input type="number" step="0.01" min="0" required value={form.precioUnitario} onChange={(e) => set('precioUnitario', e.target.value)} placeholder="Costo por unidad" className={inputCls} />
          </div>
          <div className="space-y-1 md:col-span-2">
            <label className="block text-[10px] font-black uppercase tracking-wider text-[#E95A0C]">OBSERVACIONES</label>
            <textarea rows="2" value={form.observaciones} onChange={(e) => set('observaciones', e.target.value)} placeholder="Facturas vinculadas, estado del envío..." className={`${inputCls} resize-none`}></textarea>
          </div>
        </div>

        <div className="flex items-center justify-between p-4 rounded-xl bg-[#FFF5EC] border border-orange-200/60">
          <div>
            <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Total invertido</p>
            <p className="text-2xl font-black text-[#FF4D00]">{formatearBs(total)}</p>
          </div>
          <span className="text-[10px] font-bold text-slate-500">{cantidad} unidades × {formatearBs(precio)}</span>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
          <button type="button" onClick={onBackToList} className="px-6 py-3 rounded-xl bg-[#8B4513] hover:bg-slate-900 text-white text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-sm border border-slate-700 flex items-center gap-2">
            <i className="fas fa-times"></i> Cancelar
          </button>
          <button type="submit" className="px-8 py-3 rounded-xl bg-[#E95A0C] hover:bg-[#cc4a00] text-white text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-lg flex items-center gap-2 hover:scale-105">
            <i className="fas fa-check"></i><span>{modo === 'editar' ? 'Guardar Cambios' : 'Registrar Compra'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default CompraForm;