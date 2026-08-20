import React, { useState, useRef, useEffect } from 'react';

const DropdownSelect = ({ value, onChange, options, label }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClick = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const selected = options.find(o => o.value === value) || options[0];

  return (
    <div className="relative w-full" ref={ref}>
      {label && <label className="block text-[9px] font-black uppercase tracking-wider text-[#E95A0C] mb-1.5">{label}</label>}
      <button type="button" onClick={() => setOpen(!open)}
        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200/60 dark:border-white/5 bg-white dark:bg-[#040408] text-slate-800 dark:text-white dark:border-white/8 dark:text-slate-200 text-xs font-bold flex items-center justify-between gap-2 focus:ring-2 focus:ring-[#E95A0C]/40 outline-none cursor-pointer transition-all hover:border-[#E95A0C]/40 shadow-sm">
        <div className="flex items-center gap-2">
           {selected.icon && <i className={`${selected.icon} text-[#E95A0C] text-xs`}></i>}
           <span className="text-left">{selected.label}</span>
        </div>
        <i className={`fas fa-chevron-down text-[9px] text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`}></i>
      </button>
      {open && (
        <div className="absolute z-[100] mt-1 w-full min-w-[180px] rounded-xl border border-slate-200/60 dark:border-white/5 bg-white shadow-2xl dark:shadow-black/80 overflow-hidden">
          {options.map(opt => (
            <button key={opt.value} type="button"
              onClick={() => { onChange(opt.value); setOpen(false); }}
              className={`w-full px-3.5 py-2.5 text-xs font-bold flex items-center gap-2 text-left transition-all cursor-pointer ${
                opt.value === value ? 'bg-[#8B4513] text-white' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
               }`}>
              {opt.icon && <i className={`${opt.icon} text-xs ${opt.value === value ? 'text-white' : 'text-[#E95A0C]'}`}></i>}
              <span>{opt.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const ReportFilters = ({
  rango, setRango,
  tipoVenta, setTipoVenta,
  sucursal, setSucursal,
  onGenerate
}) => {
  const rangoOptions = [
    { value: 'hoy', label: 'Hoy', icon: 'fas fa-calendar-day' },
    { value: 'semana', label: 'Últimos 7 días', icon: 'fas fa-calendar-week' },
    { value: 'mes', label: 'Este Mes', icon: 'fas fa-calendar-alt' },
    { value: 'anio', label: 'Este Año', icon: 'fas fa-calendar' },
    { value: 'personalizado', label: 'Personalizado', icon: 'fas fa-sliders-h' }
  ];

  const tipoOptions = [
    { value: 'todas', label: 'Todas las Ventas', icon: 'fas fa-border-all' },
    { value: 'productos', label: 'Solo Productos/Kits', icon: 'fas fa-box' },
    { value: 'suscripciones', label: 'Solo Suscripciones', icon: 'fas fa-star' }
  ];

  const sucursalOptions = [
    { value: 'todas', label: 'Todas las Sucursales', icon: 'fas fa-building' },
    { value: 'principal', label: 'Sucursal Principal', icon: 'fas fa-store' },
    { value: 'online', label: 'Tienda Online', icon: 'fas fa-globe' }
  ];

  return (
    <div className="bg-white dark:bg-[#040408] dark:border-white/8 rounded-2xl p-5 shadow-xl dark:shadow-black/60 border border-slate-200/60 dark:border-white/5 border-l-4 border-l-[#E95A0C] relative z-25 mb-5">
      <div className="bg-gradient-to-r from-orange-50/80 to-transparent dark:from-[#E95A0C]/10 dark:to-transparent p-4 rounded-xl border border-orange-200/50 dark:border-[#E95A0C]/20 mb-4 flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-[#E95A0C] text-white flex items-center justify-center text-sm shadow-md shadow-orange-900/5 dark:shadow-none shrink-0">
          <i className="fas fa-filter"></i>
        </div>
        <div>
          <h3 className="text-sm font-black text-[#4A2E1B] dark:text-white uppercase tracking-wider m-0">PARAMETRIZACIÓN DE REPORTE</h3>
          <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest leading-normal m-0 mt-0.5">
            Defina los rangos y filtros para generar las estadísticas analíticas.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-end">
        <div className="sm:col-span-3">
          <DropdownSelect label="Rango de Fechas" value={rango} onChange={setRango} options={rangoOptions} />
        </div>
        <div className="sm:col-span-3">
          <DropdownSelect label="Tipo de Ingreso" value={tipoVenta} onChange={setTipoVenta} options={tipoOptions} />
        </div>
        <div className="sm:col-span-3">
          <DropdownSelect label="Sucursal / Origen" value={sucursal} onChange={setSucursal} options={sucursalOptions} />
        </div>
        <div className="sm:col-span-3 flex gap-2">
           <button onClick={onGenerate} className="flex-1 py-2.5 rounded-xl bg-[#E95A0C] hover:bg-[#8B4513] text-white flex items-center justify-center text-xs font-black tracking-wider shadow-md shadow-orange-900/5 dark:shadow-none transition-all cursor-pointer border-0 h-[40px] uppercase gap-2 hover:scale-[1.02]">
             <i className="fas fa-bolt"></i> Analizar
           </button>
           <button className="w-10 h-[40px] rounded-xl bg-slate-100 dark:bg-[#070710] text-slate-500 dark:text-slate-400 hover:text-[#E95A0C] flex items-center justify-center text-sm transition-all cursor-pointer border-0 shadow-sm" title="Opciones Avanzadas">
             <i className="fas fa-cog"></i>
           </button>
        </div>
      </div>

      {rango === 'personalizado' && (
        <div className="flex items-center gap-4 mt-4 pt-4 border-t border-slate-100 animate-fade-in">
           <div className="flex-1">
             <label className="block text-[9px] font-black uppercase tracking-wider text-[#E95A0C] mb-1.5">FECHA INICIO</label>
             <input type="date" className="w-full px-3.5 py-2 rounded-xl border border-slate-200/60 dark:border-white/5 bg-slate-50 dark:bg-[#070710] text-xs font-bold text-slate-700 dark:text-slate-300 focus:ring-2 focus:ring-[#E95A0C]/40 outline-none" />
           </div>
           <div className="flex-1">
             <label className="block text-[9px] font-black uppercase tracking-wider text-[#E95A0C] mb-1.5">FECHA FIN</label>
             <input type="date" className="w-full px-3.5 py-2 rounded-xl border border-slate-200/60 dark:border-white/5 bg-slate-50 dark:bg-[#070710] text-xs font-bold text-slate-700 dark:text-slate-300 focus:ring-2 focus:ring-[#E95A0C]/40 outline-none" />
           </div>
        </div>
      )}
    </div>
  );
};

export default ReportFilters;






















