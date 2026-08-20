import React, { useState, useRef, useEffect } from 'react';

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
        <span className={`flex-1 text-left ${selected ? '' : 'text-slate-400'}`}>{selected?.label || placeholder || 'Seleccione...'}</span>
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

const TIPOS = [
  { value: 'entrada', label: 'Entrada (compra / producción)', icon: 'fas fa-arrow-down' },
  { value: 'salida', label: 'Salida (venta / uso)', icon: 'fas fa-arrow-up' },
  { value: 'merma', label: 'Merma (pérdida)', icon: 'fas fa-biohazard' },
  { value: 'ajuste', label: 'Ajuste (valor firmado)', icon: 'fas fa-sliders' }
];

const CrearMovimiento = ({ onBackToList, crearMovimiento, productos, sucursales, preAjustar }) => {
  const [productoId, setProductoId] = useState(preAjustar?.productoId ? String(preAjustar.productoId) : '');
  const [sucursalId, setSucursalId] = useState(preAjustar?.sucursalId ? String(preAjustar.sucursalId) : '');
  const [tipo, setTipo] = useState(preAjustar ? 'ajuste' : 'entrada');
  const [cantidad, setCantidad] = useState('');
  const [motivo, setMotivo] = useState('');
  const [referencia, setReferencia] = useState('');

  const productoOptions = [
    { value: '', label: 'Seleccione un producto', icon: 'fas fa-utensils' },
    ...productos.map(p => ({ value: String(p.id), label: `${p.nombre} — Bs. ${p.precio}`, icon: 'fas fa-tag' }))
  ];
  const sucursalOptions = [
    { value: '', label: 'Seleccione una sucursal', icon: 'fas fa-store' },
    ...sucursales.map(s => ({ value: String(s.id), label: s.nombre, icon: 'fas fa-store' }))
  ];

  const submit = async (e) => {
    e.preventDefault();
    if (!productoId || !sucursalId || !cantidad) { alert('Producto, sucursal y cantidad son obligatorios'); return; }
    const res = await crearMovimiento({ productoId, sucursalId, tipo, cantidad, motivo, referencia });
    if (res.ok) { onBackToList(); } else { alert(res.mensaje || 'No se pudo registrar el movimiento'); }
  };

  return (
    <div className="space-y-5 font-montserrat w-full max-w-3xl mx-auto">
      <div className="bg-white dark:bg-[#040408] rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-200 dark:border-white/5 border-l-4 border-l-[#E95A0C] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl text-[#E95A0C] flex items-center justify-center text-xl font-black shadow-sm shrink-0 border border-orange-200/50"><i className="fas fa-right-left"></i></div>
          <div>
            <div className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">
              <span>Comercial</span><span>{'>'}</span><span>Stock</span><span>{'>'}</span><span className="text-[#E95A0C]">Nuevo Movimiento</span>
            </div>
            <h2 className="text-xl font-black text-[#4A2E1B] dark:text-white uppercase tracking-wider m-0 leading-none">Registrar Movimiento de Stock</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider mt-1 m-0">Entradas, salidas, mermas o ajustes del inventario.</p>
          </div>
        </div>
        <button onClick={onBackToList} className="px-5 py-2.5 rounded-xl bg-[#E95A0C] hover:bg-[#cc4a00] text-white text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 shadow-md border border-red-800/40 shrink-0">
          <i className="fas fa-arrow-left"></i><span>Volver</span>
        </button>
      </div>

      <form onSubmit={submit} className="bg-white dark:bg-[#040408] rounded-2xl p-6 shadow-xl dark:shadow-black/60 border border-slate-200/60 dark:border-white/5 border-l-4 border-l-[#E95A0C] space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1 md:col-span-2">
            <label className="block text-[10px] font-black uppercase tracking-wider text-[#E95A0C]">PRODUCTO <b className="text-red-500">*</b></label>
            <DropdownSelect value={productoId} onChange={setProductoId} options={productoOptions} placeholder="Seleccione un producto" />
          </div>
          <div className="space-y-1">
            <label className="block text-[10px] font-black uppercase tracking-wider text-[#E95A0C]">SUCURSAL <b className="text-red-500">*</b></label>
            <DropdownSelect value={sucursalId} onChange={setSucursalId} options={sucursalOptions} placeholder="Seleccione una sucursal" />
          </div>
          <div className="space-y-1">
            <label className="block text-[10px] font-black uppercase tracking-wider text-[#E95A0C]">TIPO DE MOVIMIENTO <b className="text-red-500">*</b></label>
            <DropdownSelect value={tipo} onChange={setTipo} options={TIPOS} placeholder="Tipo" />
          </div>
          <div className="space-y-1">
            <label className="block text-[10px] font-black uppercase tracking-wider text-[#E95A0C]">CANTIDAD {tipo === 'ajuste' ? '(firmada: + agrega, - resta)' : ''} <b className="text-red-500">*</b></label>
            <input type="number" step="1" value={cantidad} onChange={(e) => setCantidad(e.target.value)} placeholder={tipo === 'ajuste' ? 'Ej: -5 o +10' : 'Cantidad'} className={inputCls} />
          </div>
          <div className="space-y-1">
            <label className="block text-[10px] font-black uppercase tracking-wider text-[#E95A0C]">REFERENCIA</label>
            <input type="text" value={referencia} onChange={(e) => setReferencia(e.target.value)} placeholder="Ej: Compra #123, Venta LC..." className={inputCls} />
          </div>
          <div className="space-y-1 md:col-span-2">
            <label className="block text-[10px] font-black uppercase tracking-wider text-[#E95A0C]">MOTIVO</label>
            <input type="text" value={motivo} onChange={(e) => setMotivo(e.target.value)} placeholder="Detalle del movimiento..." className={inputCls} />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
          <button type="button" onClick={onBackToList} className="px-6 py-3 rounded-xl bg-[#8B4513] hover:bg-slate-900 text-white text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-sm border border-slate-700 flex items-center gap-2">
            <i className="fas fa-times"></i> Cancelar
          </button>
          <button type="submit" className="px-8 py-3 rounded-xl bg-[#E95A0C] hover:bg-[#cc4a00] text-white text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-lg flex items-center gap-2 hover:scale-105">
            <i className="fas fa-check"></i> Registrar Movimiento
          </button>
        </div>
      </form>
    </div>
  );
};

export default CrearMovimiento;