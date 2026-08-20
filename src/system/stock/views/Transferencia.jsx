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

const Transferencia = ({ onBackToList, crearTransferencia, productos, sucursales }) => {
  const [productoId, setProductoId] = useState('');
  const [origen, setOrigen] = useState('');
  const [destino, setDestino] = useState('');
  const [cantidad, setCantidad] = useState('');

  const productoOptions = [{ value: '', label: 'Seleccione un producto', icon: 'fas fa-utensils' }, ...productos.map(p => ({ value: String(p.id), label: p.nombre, icon: 'fas fa-tag' }))];
  const sucursalOptions = [{ value: '', label: 'Seleccione una sucursal', icon: 'fas fa-store' }, ...sucursales.map(s => ({ value: String(s.id), label: s.nombre, icon: 'fas fa-store' }))];

  const submit = async (e) => {
    e.preventDefault();
    if (!productoId || !origen || !destino || !cantidad) { alert('Todos los campos son obligatorios'); return; }
    const res = await crearTransferencia({ productoId, origenSucursalId: origen, destinoSucursalId: destino, cantidad });
    if (res.ok) { onBackToList(); } else { alert(res.mensaje || 'No se pudo transferir'); }
  };

  return (
    <div className="space-y-5 font-montserrat w-full">
      <div className="bg-white dark:bg-[#040408] rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-200 dark:border-white/5 border-l-4 border-l-[#E95A0C] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl text-[#E95A0C] flex items-center justify-center text-xl font-black shadow-sm shrink-0 border border-orange-200/50"><i className="fas fa-arrow-right-arrow-left"></i></div>
          <div>
            <div className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">
              <span>Comercial</span><span>{'>'}</span><span>Stock</span><span>{'>'}</span><span className="text-[#E95A0C]">Transferencia</span>
            </div>
            <h2 className="text-xl font-black text-[#4A2E1B] dark:text-white uppercase tracking-wider m-0 leading-none">Transferir Stock entre Sucursales</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider mt-1 m-0">Mueva existencias de una sucursal a otra.</p>
          </div>
        </div>
        <button onClick={onBackToList} className="px-5 py-2.5 rounded-xl bg-[#E95A0C] hover:bg-[#cc4a00] text-white text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 shadow-md border border-red-800/40 shrink-0">
          <i className="fas fa-arrow-left"></i><span>Volver</span>
        </button>
      </div>

      <form onSubmit={submit} className="bg-white dark:bg-[#040408] rounded-2xl p-6 shadow-xl dark:shadow-black/60 border border-slate-200/60 dark:border-white/5 border-l-4 border-l-[#E95A0C] space-y-6">
        {/* PRODUCTO */}
        <div className="space-y-1">
          <label className="block text-[10px] font-black uppercase tracking-wider text-[#E95A0C]">PRODUCTO A TRANSFERIR <b className="text-red-500">*</b></label>
          <div className="max-w-xl">
            <DropdownSelect value={productoId} onChange={setProductoId} options={productoOptions} placeholder="Seleccione un producto" />
          </div>
        </div>

        {/* ORIGEN → DESTINO */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <div className="rounded-2xl border-2 border-amber-200 bg-amber-50/40 p-5 space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center text-lg shadow-md"><i className="fas fa-arrow-right-to-bracket rotate-180"></i></span>
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-amber-700">Sucursal Origen</h4>
                <p className="text-[9px] font-bold text-amber-600/80 uppercase tracking-widest">Se restará stock</p>
              </div>
            </div>
            <DropdownSelect value={origen} onChange={setOrigen} options={sucursalOptions} placeholder="Seleccione el origen" />
          </div>

          <div className="rounded-2xl border-2 border-emerald-200 bg-emerald-50/40 p-5 space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center text-lg shadow-md"><i className="fas fa-arrow-right-to-bracket"></i></span>
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-emerald-700">Sucursal Destino</h4>
                <p className="text-[9px] font-bold text-emerald-600/80 uppercase tracking-widest">Se sumará stock</p>
              </div>
            </div>
            <DropdownSelect value={destino} onChange={setDestino} options={sucursalOptions} placeholder="Seleccione el destino" />
          </div>
        </div>

        {/* CANTIDAD + ACCIÓN */}
        <div className="flex flex-col md:flex-row items-end gap-4">
          <div className="w-full md:w-64 space-y-1">
            <label className="block text-[10px] font-black uppercase tracking-wider text-[#E95A0C]">CANTIDAD <b className="text-red-500">*</b></label>
            <input type="number" min="1" value={cantidad} onChange={(e) => setCantidad(e.target.value)} placeholder="Unidades a transferir" className={inputCls} />
          </div>
          <button type="submit" className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-[#E95A0C] to-orange-700 text-white text-sm font-black uppercase tracking-widest shadow-lg shadow-orange-500/25 transition-all cursor-pointer hover:scale-[1.01] active:scale-95 flex items-center justify-center gap-3">
            <i className="fas fa-arrow-right-arrow-left text-lg"></i> Transferir Stock
          </button>
        </div>

        <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
          <i className="fas fa-circle-info text-[#E95A0C] text-xs"></i>
          <span>La transferencia quedará registrada en el kardex con sus movimientos de salida y entrada.</span>
        </div>
      </form>
    </div>
  );
};

export default Transferencia;