import React, { useState, useRef, useEffect } from 'react';
import { HeaderSistema, SeccionForm, Campo, InputIcono, InfoBox, PieForm, inputCls } from '../../components/FormSystem';
import { DISPONIBILIDAD_OPCIONES, INSIGNIA_OPCIONES, formatearBs } from '../constantes';

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

const ProductoForm = ({ form, set, onBackToList, onSubmit, categorias, modo, titulo }) => {
  const [vistaPrevia, setVistaPrevia] = useState(true);
  const precio = parseFloat(form.precio) || 0;
  const anterior = parseFloat(form.precioAnterior) || 0;
  const descuento = anterior && precio < anterior ? Math.round((1 - precio / anterior) * 100) : 0;

  const slugify = (str) => str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  const categoriaOptions = [{ value: '', label: 'Seleccione una categoría', icon: 'fas fa-layer-group' }, ...categorias.map(c => ({ value: c.id, label: c.titulo, icon: 'fas fa-tag' }))];

  return (
    <div className="space-y-5 font-montserrat w-full">
      <HeaderSistema
        icon="fas fa-box-open"
        breadcrumbs={['Comercial', 'Productos', modo === 'editar' ? 'Editar Producto' : 'Registrar Producto']}
        titulo={titulo}
        subtitulo={modo === 'editar' ? 'Actualice los datos del ítem del menú seleccionado.' : 'Agregue un nuevo ítem al menú de la salteñería.'}
        onVolver={onBackToList}
      />

      <form onSubmit={onSubmit} className="space-y-5">
        {/* SECCIÓN 1 */}
        <SeccionForm icon="fas fa-box-open" titulo={modo === 'editar' ? `DATOS DEL PRODUCTO #${form.id}` : 'DATOS DEL PRODUCTO'}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Campo label="Nombre del producto" icon="fas fa-tag" obligatorio>
              <InputIcono icon="fas fa-tag" required value={form.nombre} onChange={(e) => { const n = e.target.value; set('nombre', n); if (!form.enlace) set('enlace', slugify(n)); }} placeholder="Ej: Salteña de Carne Dulce" />
            </Campo>
            <Campo label="Enlace (slug único)" icon="fas fa-link">
              <InputIcono icon="fas fa-link" value={form.enlace} onChange={(e) => set('enlace', e.target.value.toLowerCase())} placeholder="Ej: saltena-de-carne-dulce" className="font-mono" />
            </Campo>
            <Campo label="Categoría" icon="fas fa-layer-group" obligatorio>
              <DropdownSelect value={form.categoriaId} onChange={(v) => set('categoriaId', v)} options={categoriaOptions} placeholder="Seleccione una categoría" />
            </Campo>
            <Campo label="Insignia" icon="fas fa-crown">
              <DropdownSelect value={form.insignia} onChange={(v) => set('insignia', v)} options={INSIGNIA_OPCIONES} placeholder="Sin insignia" />
            </Campo>
            <Campo label="Disponibilidad" icon="fas fa-circle-info">
              <DropdownSelect value={form.disponibilidad} onChange={(v) => set('disponibilidad', v)} options={DISPONIBILIDAD_OPCIONES} />
            </Campo>
            <Campo label="Stock (unidades)" icon="fas fa-boxes-stacked">
              <InputIcono icon="fas fa-boxes-stacked" type="number" min="0" value={form.stock} onChange={(e) => set('stock', e.target.value)} />
            </Campo>
            <div className="md:col-span-2">
              <label className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-200/60 dark:border-white/5 bg-slate-50 dark:bg-[#070710] cursor-pointer">
                <input type="checkbox" checked={form.activo} onChange={(e) => set('activo', e.target.checked)} className="w-4 h-4 accent-[#E95A0C]" />
                <span className="text-xs font-black uppercase tracking-wider text-slate-600 dark:text-slate-300"><i className="fas fa-circle-check text-emerald-500 mr-1.5"></i>Producto activo (visible en el catálogo web y menú)</span>
              </label>
            </div>
          </div>
        </SeccionForm>

        {/* SECCIÓN 2 */}
        <SeccionForm icon="fas fa-tags" titulo="PRECIO Y COMERCIALIZACIÓN">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Campo label="Precio de venta (Bs)" icon="fas fa-money-bill-wave" obligatorio>
              <InputIcono icon="fas fa-money-bill-wave" type="number" step="0.01" min="0" required value={form.precio} onChange={(e) => set('precio', e.target.value)} />
            </Campo>
            <Campo label="Precio anterior (Bs)" icon="fas fa-arrow-trend-down">
              <InputIcono icon="fas fa-arrow-trend-down" type="number" step="0.01" min="0" value={form.precioAnterior} onChange={(e) => set('precioAnterior', e.target.value)} />
            </Campo>
            <Campo label="Calificación (0-5)" icon="fas fa-star">
              <InputIcono icon="fas fa-star" type="number" step="0.1" min="0" max="5" value={form.calificacion} onChange={(e) => set('calificacion', e.target.value)} />
            </Campo>
          </div>
          <InfoBox tipo="info" titulo="Resumen comercial">
            Precio de venta: <b className="text-[#E95A0C]">{formatearBs(precio)}</b>
            {descuento > 0 && <span className="ml-2 text-slate-400 line-through">{formatearBs(anterior)}</span>}
            {descuento > 0 && <span className="ml-2 px-2 py-0.5 rounded-full bg-red-500 text-white text-[9px]">{descuento}% OFF</span>}
          </InfoBox>
        </SeccionForm>

        {/* SECCIÓN 3 */}
        <SeccionForm icon="fas fa-image" titulo="DESCRIPCIÓN E IMAGEN">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <Campo label="URL de la imagen" icon="fas fa-image">
                <div className="flex items-center gap-3">
                  <div className="flex-1"><InputIcono icon="fas fa-image" value={form.imagen} onChange={(e) => set('imagen', e.target.value)} placeholder="/img/05_Productos/Salteñas/Salteñas.png" /></div>
                  <button type="button" onClick={() => setVistaPrevia(!vistaPrevia)} className="px-3 py-2.5 rounded-xl bg-slate-100 dark:bg-[#070710] text-slate-600 dark:text-slate-300 text-xs font-black cursor-pointer hover:text-[#E95A0C] shrink-0">{vistaPrevia ? 'Ocultar' : 'Previa'}</button>
                </div>
              </Campo>
              {vistaPrevia && form.imagen && (
                <div className="mt-3 flex justify-center p-3 rounded-xl bg-[#FFF5EC] border border-orange-200/60">
                  <img src={form.imagen} alt="Previa" className="h-28 w-28 rounded-xl object-cover shadow-md" onError={(e) => { e.target.style.display = 'none'; }} />
                </div>
              )}
            </div>
            <Campo label="Descripción corta" icon="fas fa-align-left">
              <InputIcono icon="fas fa-align-left" value={form.descripcionCorta} onChange={(e) => set('descripcionCorta', e.target.value)} placeholder="Ej: La Clásica - jugosa y equilibrada" />
            </Campo>
            <Campo label="Insignia de descuento (texto)" icon="fas fa-badge-percent">
              <InputIcono icon="fas fa-badge-percent" value={form.descuento} onChange={(e) => set('descuento', e.target.value)} placeholder="Ej: 20% OFF" />
            </Campo>
            <Campo label="Descripción completa" icon="fas fa-align-justify" colSpan>
              <textarea rows="3" value={form.descripcion} onChange={(e) => set('descripcion', e.target.value)} placeholder="Jugosa y equilibrada, con el dulzor justo que resalta la carne de primera..." className={`${inputCls} px-3.5 resize-none`}></textarea>
            </Campo>
          </div>
        </SeccionForm>

        <PieForm
          onCancelar={onBackToList}
          submitText={modo === 'editar' ? 'Guardar Cambios' : 'Registrar Producto'}
          submitIcon={modo === 'editar' ? 'fas fa-save' : 'fas fa-check'}
        />
      </form>
    </div>
  );
};

export default ProductoForm;