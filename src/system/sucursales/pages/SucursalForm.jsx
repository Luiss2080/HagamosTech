import React, { useState, useRef, useEffect } from 'react';
import { CIUDADES } from '../constantes';

const inputCls = "w-full px-3.5 py-2.5 rounded-xl border border-slate-200/60 dark:border-white/5 bg-slate-50 dark:bg-[#070710] text-slate-800 dark:text-white dark:border-white/8 text-xs focus:ring-2 focus:ring-[#E95A0C]/40 outline-none font-bold";

const DropdownSelect = ({ value, onChange, options }) => {
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
      <button type="button" onClick={() => setOpen(!open)} className={`${inputCls} flex items-center justify-between gap-2 cursor-pointer`}>
        {selected?.icon && <i className={`${selected.icon} text-[#E95A0C] text-xs`}></i>}
        <span className={`flex-1 text-left truncate ${selected ? '' : 'text-slate-400'}`}>{selected?.label || 'Seleccione...'}</span>
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

const SucursalForm = ({ form, set, onBackToList, onSubmit, modo, titulo }) => {
  const ciudadOptions = CIUDADES.map(c => ({ value: c, label: c, icon: 'fas fa-city' }));

  return (
    <div className="space-y-5 font-montserrat w-full">
      <div className="bg-white dark:bg-[#040408] rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-200 dark:border-white/5 border-l-4 border-l-[#E95A0C] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl text-[#E95A0C] flex items-center justify-center text-xl font-black shadow-sm shrink-0 border border-orange-200/50"><i className="fas fa-store"></i></div>
          <div>
            <div className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">
              <span>Operaciones</span><span>{'>'}</span><span>Sucursales</span><span>{'>'}</span><span className="text-[#E95A0C]">{modo === 'editar' ? 'Editar Sucursal' : 'Registrar Sucursal'}</span>
            </div>
            <h2 className="text-xl font-black text-[#4A2E1B] dark:text-white uppercase tracking-wider m-0 leading-none">{titulo}</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider mt-1 m-0">Punto de venta de la salteñería con su horario y servicios.</p>
          </div>
        </div>
        <button onClick={onBackToList} className="px-5 py-2.5 rounded-xl bg-[#E95A0C] hover:bg-[#cc4a00] text-white text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 shadow-md border border-red-800/40 shrink-0">
          <i className="fas fa-arrow-left"></i><span>Volver al listado</span>
        </button>
      </div>

      <form onSubmit={onSubmit} className="bg-white dark:bg-[#040408] rounded-2xl p-6 shadow-xl dark:shadow-black/60 border border-slate-200/60 dark:border-white/5 border-l-4 border-l-[#E95A0C] space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="block text-[10px] font-black uppercase tracking-wider text-[#E95A0C]">NOMBRE DE LA SUCURSAL <b className="text-red-500">*</b></label>
            <div className="relative">
              <i className="fas fa-store absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
              <input type="text" required value={form.nombre} onChange={(e) => set('nombre', e.target.value)} placeholder="Ej: HagamosTech Equipetrol" className={`${inputCls} pl-9`} />
            </div>
          </div>
          <div className="space-y-1">
            <label className="block text-[10px] font-black uppercase tracking-wider text-[#E95A0C]">CIUDAD <b className="text-red-500">*</b></label>
            <DropdownSelect value={form.ciudad} onChange={(v) => set('ciudad', v)} options={ciudadOptions} />
          </div>
          <div className="space-y-1">
            <label className="block text-[10px] font-black uppercase tracking-wider text-[#E95A0C]">DIRECCIÓN</label>
            <div className="relative">
              <i className="fas fa-location-dot absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
              <input type="text" value={form.direccion} onChange={(e) => set('direccion', e.target.value)} placeholder="Calle, avenida, referencia..." className={`${inputCls} pl-9`} />
            </div>
          </div>
          <div className="space-y-1">
            <label className="block text-[10px] font-black uppercase tracking-wider text-[#E95A0C]">TELÉFONO</label>
            <div className="relative">
              <i className="fas fa-phone absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
              <input type="text" value={form.telefono} onChange={(e) => set('telefono', e.target.value)} placeholder="3 3430197" className={`${inputCls} pl-9`} />
            </div>
          </div>
          <div className="space-y-1">
            <label className="block text-[10px] font-black uppercase tracking-wider text-[#E95A0C]">HORARIO</label>
            <div className="relative">
              <i className="fas fa-clock absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
              <input type="text" value={form.horario} onChange={(e) => set('horario', e.target.value)} placeholder="Lun a Sáb · Hasta la 1:30 p.m." className={`${inputCls} pl-9`} />
            </div>
          </div>
          <div className="space-y-1">
            <label className="block text-[10px] font-black uppercase tracking-wider text-[#E95A0C]">SERVICIOS</label>
            <div className="relative">
              <i className="fas fa-list-check absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
              <input type="text" value={form.servicios} onChange={(e) => set('servicios', e.target.value)} placeholder="Consumo · Llevar · Delivery · WiFi" className={`${inputCls} pl-9`} />
            </div>
          </div>
          <div className="md:col-span-2">
            <label className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-200/60 dark:border-white/5 bg-slate-50 dark:bg-[#070710] cursor-pointer">
              <input type="checkbox" checked={form.activo} onChange={(e) => set('activo', e.target.checked)} className="w-4 h-4 accent-[#E95A0C]" />
              <span className="text-xs font-black uppercase tracking-wider text-slate-600 dark:text-slate-300"><i className="fas fa-circle-check text-emerald-500 mr-1.5"></i>Sucursal activa (visible en la web y operaciones)</span>
            </label>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
          <button type="button" onClick={onBackToList} className="px-6 py-3 rounded-xl bg-[#8B4513] hover:bg-slate-900 text-white text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-sm border border-slate-700 flex items-center gap-2">
            <i className="fas fa-times"></i> Cancelar
          </button>
          <button type="submit" className="px-8 py-3 rounded-xl bg-[#E95A0C] hover:bg-[#cc4a00] text-white text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-lg flex items-center gap-2 hover:scale-105">
            <i className="fas fa-check"></i><span>{modo === 'editar' ? 'Guardar Cambios' : 'Registrar Sucursal'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default SucursalForm;