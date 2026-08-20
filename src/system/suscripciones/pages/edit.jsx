import React, { useState, useRef, useEffect } from 'react';

const DropdownSelect = ({ value, onChange, options }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClick = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const selected = options.find(o => o.value === value) || options[0];

  return (
    <div className="relative" ref={ref}>
      <button type="button" onClick={() => setOpen(!open)}
        className="w-full px-4 py-2.5 rounded-xl border border-slate-200/60 dark:border-white/5 bg-slate-50 dark:bg-[#070710] text-slate-800 dark:text-white dark:border-white/8 dark:text-slate-200 text-xs font-bold flex items-center justify-between gap-2 focus:ring-2 focus:ring-[#E95A0C]/40 outline-none cursor-pointer transition-all hover:border-[#E95A0C]/40">
        {selected?.icon && <i className={`${selected.icon} text-[#E95A0C] text-xs`}></i>}
        <span className="flex-1 text-left">{selected?.label || 'Seleccionar...'}</span>
        <i className={`fas fa-chevron-down text-[9px] text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`}></i>
      </button>
      {open && (
        <div className="absolute z-[100] mt-1 w-full min-w-[180px] max-h-60 overflow-y-auto rounded-xl border border-slate-200/60 dark:border-white/5 bg-white shadow-2xl dark:shadow-black/80">
          {options.map(opt => (
            <button key={opt.value} type="button"
              onClick={() => { onChange(opt.value); setOpen(false); }}
              className={`w-full px-4 py-2.5 text-xs font-bold flex items-center gap-2 text-left transition-all cursor-pointer ${
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

const SuscripcionEditView = ({
  suscripcionForm,
  setSuscripcionForm,
  submitSuscripcion,
  onBackToList
}) => {
  
  const estadoOptions = [
    { value: 'invitado', label: 'Invitado (Prueba Gratuita)', icon: 'fas fa-stopwatch' },
    { value: 'suscrito', label: 'Suscrito (Pago Efectivo/Transferencia)', icon: 'fas fa-check-circle' },
    { value: 'vencido', label: 'Vencido / Inactivo', icon: 'fas fa-ban' }
  ];

  const metodosPago = [
    { value: 'EFECTIVO', label: 'Efectivo', icon: 'fas fa-money-bill' },
    { value: 'TRANSFERENCIA', label: 'Transferencia Bancaria', icon: 'fas fa-money-bill-transfer' },
    { value: 'QR', label: 'Pago QR', icon: 'fas fa-qrcode' }
  ];

  const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return '';
    const pad = (n) => n.toString().padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
  };

  return (
    <div className="space-y-5 font-montserrat w-full">
      <div className="bg-white dark:bg-[#040408] dark:border-white/8 rounded-2xl p-6 shadow-xl dark:shadow-black/60 border border-slate-200/60 dark:border-white/5 border-l-4 border-l-amber-500 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-[#E95A0C]mber-500 flex items-center justify-center text-xl font-black shadow-sm shrink-0 border border-amber-200">
            <i className="fas fa-pen"></i>
          </div>
          <div>
            <div className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">
              <span>Sistema</span>
              <span>{'>'}</span>
              <span>Suscripciones</span>
              <span>{'>'}</span>
              <span className="text-[#E95A0C]mber-500">Editar Registro</span>
            </div>
            <h2 className="text-xl font-black text-[#4A2E1B] dark:text-white uppercase tracking-wider m-0 leading-none">
              Editar Suscripción
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider mt-1 m-0">
              Modifique el estado, vigencia o anote los datos del pago.
            </p>
          </div>
        </div>
 
        <button onClick={onBackToList}
          className="px-5 py-2.5 rounded-xl bg-[#8B4513] hover:bg-[#8B4513] text-white text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md border border-slate-700 shrink-0">
          <i className="fas fa-arrow-left"></i>
          <span>Volver al listado</span>
        </button>
      </div>

      <form onSubmit={submitSuscripcion} className="space-y-5">
        
        {/* SECCION 1: USUARIO Y ESTADO */}
        <div className="bg-white dark:bg-[#040408] dark:border-white/8 rounded-2xl p-6 shadow-xl dark:shadow-black/60 border border-slate-200/60 dark:border-white/5 border-l-4 border-l-[#E95A0C]">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-150 mb-4">
            <i className="fas fa-user-gear text-[#E95A0C] text-sm"></i>
            <h4 className="text-xs font-black text-[#4A2E1B] dark:text-white uppercase tracking-wider m-0">
              IDENTIFICACIÓN DEL USUARIO Y ESTADO DEL PLAN
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-[10px] font-black uppercase tracking-wider text-[#E95A0C] mb-1.5">
                USUARIO:
              </label>
              <input type="text" readOnly disabled
                value={`${suscripcionForm.nombre || ''} (${suscripcionForm.correo || ''})`}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200/60 dark:border-white/5 bg-slate-100 dark:bg-[#070710] text-slate-500 dark:text-slate-400 text-xs outline-none font-bold cursor-not-allowed" />
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-wider text-[#E95A0C] mb-1.5">
                ESTADO DEL PLAN: <b className="text-red-500">*</b>
              </label>
              <DropdownSelect 
                value={suscripcionForm.estado || 'invitado'}
                onChange={(val) => setSuscripcionForm(prev => ({ ...prev, estado: val }))}
                options={estadoOptions} 
              />
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-wider text-[#E95A0C] mb-1.5">
                FECHA FIN DE PRUEBA / VENCIMIENTO: <b className="text-red-500">*</b>
              </label>
              <input type="datetime-local" required
                value={formatDateForInput(suscripcionForm.fechaFinPrueba)}
                onChange={(e) => setSuscripcionForm(prev => ({ ...prev, fechaFinPrueba: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200/60 dark:border-white/5 bg-slate-50 dark:bg-[#070710] text-slate-800 dark:text-white dark:border-white/8 dark:text-slate-200 text-xs focus:ring-2 focus:ring-[#E95A0C]/40 outline-none font-bold" />
            </div>
          </div>
        </div>

        {/* SECCION 2: PAGO Y REGISTRO */}
        <div className="bg-white dark:bg-[#040408] dark:border-white/8 rounded-2xl p-6 shadow-xl dark:shadow-black/60 border border-slate-200/60 dark:border-white/5 border-l-4 border-l-[#E95A0C]">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-150 mb-4">
            <i className="fas fa-money-bill-wave text-[#E95A0C] text-sm"></i>
            <h4 className="text-xs font-black text-[#4A2E1B] dark:text-white uppercase tracking-wider m-0">
              REGISTRO DE PAGO (OPCIONAL / MANUAL)
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-wider text-[#E95A0C] mb-1.5">
                MÉTODO DE PAGO:
              </label>
              <DropdownSelect 
                value={suscripcionForm.metodoPago || 'EFECTIVO'}
                onChange={(val) => setSuscripcionForm(prev => ({ ...prev, metodoPago: val }))}
                options={metodosPago} 
              />
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-wider text-[#E95A0C] mb-1.5">
                MONTO PAGADO (Bs):
              </label>
              <input type="number" step="0.01" min="0"
                placeholder="Ej: 150.00"
                value={suscripcionForm.monto || ''}
                onChange={(e) => setSuscripcionForm(prev => ({ ...prev, monto: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200/60 dark:border-white/5 bg-slate-50 dark:bg-[#070710] text-slate-800 dark:text-white dark:border-white/8 dark:text-slate-200 text-xs focus:ring-2 focus:ring-[#E95A0C]/40 outline-none font-bold" />
            </div>

            <div className="md:col-span-2">
              <label className="block text-[10px] font-black uppercase tracking-wider text-[#E95A0C] mb-1.5">
                COMPROBANTE / NOTAS / OBSERVACIONES:
              </label>
              <textarea rows="3" placeholder="Ingrese detalles del pago, comprobante o número de depósito..."
                value={suscripcionForm.observaciones || ''}
                onChange={(e) => setSuscripcionForm(prev => ({ ...prev, observaciones: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200/60 dark:border-white/5 bg-slate-50 dark:bg-[#070710] text-slate-800 dark:text-white dark:border-white/8 dark:text-slate-200 text-xs focus:ring-2 focus:ring-[#E95A0C]/40 outline-none font-bold"></textarea>
            </div>
          </div>
          
          {/* BOTONES ACCION */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-4">
            <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              <i className="fas fa-shield-halved text-[#E95A0C] text-xs"></i>
              <span>Los campos con <b className="text-[#E95A0C]">*</b> son obligatorios</span>
            </div>
            <div className="flex items-center gap-3">
              <button type="button" onClick={onBackToList}
                className="px-6 py-3 rounded-xl bg-[#8B4513] hover:bg-slate-900 dark:hover:bg-slate-800 text-white text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-sm border border-slate-700 flex items-center gap-2 justify-center">
                <i className="fas fa-times"></i> Cancelar
              </button>
              <button type="submit"
                className="px-8 py-3 rounded-xl bg-amber-50 dark:bg-amber-950/400 hover:bg-amber-600 text-white text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-lg dark:shadow-black/60 shadow-amber-500/20 dark:shadow-none flex items-center gap-2 hover:scale-105">
                <i className="fas fa-save"></i>
                <span>Guardar Cambios</span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SuscripcionEditView;






















