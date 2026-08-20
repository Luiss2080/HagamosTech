import React, { useState, useRef, useEffect } from 'react';
import { HeaderSistema, SeccionForm, Campo, InputIcono, InfoBox, PieForm, inputCls } from '../../components/FormSystem';

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
      <button type="button" onClick={() => setOpen(!open)} className={`${inputCls} flex items-center justify-between gap-2 cursor-pointer`}>
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

const HornoForm = ({ form, set, onBackToList, onSubmit, productos, sucursales, modo, titulo }) => {
  const productoOptions = [{ value: '', label: 'Seleccione un producto', icon: 'fas fa-utensils' }, ...productos.map(p => ({ value: String(p.id), label: p.nombre, icon: 'fas fa-tag' }))];
  const sucursalOptions = [{ value: '', label: 'Seleccione una sucursal', icon: 'fas fa-store' }, ...sucursales.map(s => ({ value: String(s.id), label: s.nombre, icon: 'fas fa-store' }))];

  return (
    <div className="space-y-5 font-montserrat w-full">
      <HeaderSistema
        icon="fas fa-fire-burner"
        breadcrumbs={['Operaciones', 'Horno', modo === 'editar' ? 'Editar Registro' : 'Registrar Producción']}
        titulo={titulo}
        subtitulo="Registre las tandas de horneado y mermas de la salteñería."
        onVolver={onBackToList}
      />

      <form onSubmit={onSubmit} className="space-y-5">
        {/* SECCIÓN 1: DATOS */}
        <SeccionForm icon="fas fa-fire-burner" titulo="DATOS DE LA PRODUCCIÓN">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-[10px] font-black uppercase tracking-wider text-[#E95A0C] mb-1.5">TIPO DE REGISTRO</label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: 'produccion', label: 'Producción', icon: 'fas fa-fire-burner', cls: 'border-emerald-400 text-emerald-600' },
                  { id: 'merma', label: 'Merma', icon: 'fas fa-biohazard', cls: 'border-red-400 text-red-500' }
                ].map(t => (
                  <button key={t.id} type="button" onClick={() => set('tipo', t.id)}
                    className={`p-3.5 rounded-xl border-2 flex items-center justify-center gap-2 transition-all cursor-pointer ${form.tipo === t.id ? `${t.cls} bg-orange-50 scale-[1.01] shadow-md` : 'border-slate-200 bg-white hover:border-[#E95A0C]/40'}`}>
                    <i className={`${t.icon} ${form.tipo === t.id ? t.cls.split(' ')[1] : 'text-slate-400'}`}></i>
                    <span className="text-xs font-black uppercase text-slate-700 dark:text-slate-200">{t.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <Campo label="Producto" icon="fas fa-box-open" obligatorio>
              <DropdownSelect value={form.productoId} onChange={(v) => set('productoId', v)} options={productoOptions} placeholder="Seleccione un producto" />
            </Campo>
            <Campo label="Sucursal" icon="fas fa-store" obligatorio>
              <DropdownSelect value={form.sucursalId} onChange={(v) => set('sucursalId', v)} options={sucursalOptions} placeholder="Seleccione una sucursal" />
            </Campo>
            <Campo label={form.tipo === 'merma' ? 'Cantidad de merma' : 'Cantidad producida'} icon="fas fa-hashtag" obligatorio>
              <InputIcono icon="fas fa-hashtag" type="number" min="1" required value={form.cantidad} onChange={(e) => set('cantidad', e.target.value)} placeholder="Unidades" />
            </Campo>
            <Campo label="Motivo" icon="fas fa-comment-dots">
              <InputIcono icon="fas fa-comment-dots" value={form.motivo} onChange={(e) => set('motivo', e.target.value)} placeholder={form.tipo === 'merma' ? 'Ej: Se quemó la tanda, se derramó...' : 'Ej: Tanda de la mañana'} />
            </Campo>
            <Campo label="Observaciones" icon="fas fa-align-justify" colSpan>
              <textarea rows="3" value={form.observaciones} onChange={(e) => set('observaciones', e.target.value)} placeholder="Detalles adicionales de la tanda..." className={`${inputCls} px-3.5 resize-none`}></textarea>
            </Campo>
          </div>
        </SeccionForm>

        {/* SECCIÓN 2: IMPACTO */}
        <SeccionForm icon="fas fa-boxes-stacked" titulo="IMPACTO EN EL INVENTARIO">
          <InfoBox
            tipo={form.tipo === 'merma' ? 'advertencia' : 'info'}
            titulo={form.tipo === 'merma' ? 'Registro de Merma' : 'Registro de Producción'}
          >
            {form.tipo === 'merma'
              ? 'La cantidad se restará del stock de la sucursal y quedará registrada en el kardex como movimiento de merma. Utilícelo para pérdidas, quema de tanda o derrames.'
              : 'La cantidad se sumará al stock de la sucursal y quedará registrada en el kardex como entrada de producción del horno. Registre cada tanda horneada al día.'}
          </InfoBox>
        </SeccionForm>

        <PieForm
          onCancelar={onBackToList}
          submitText={modo === 'editar' ? 'Guardar Cambios' : 'Registrar Producción'}
          submitIcon={modo === 'editar' ? 'fas fa-save' : 'fas fa-fire-burner'}
          nota={form.tipo === 'merma' ? 'La merma afectará el stock negativamente.' : 'La producción incrementará el stock disponible.'}
        />
      </form>
    </div>
  );
};

export default HornoForm;