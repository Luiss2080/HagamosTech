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
        {selected.icon && <i className={`${selected.icon} text-[#E95A0C] text-xs`}></i>}
        <span className="flex-1 text-left">{selected.label}</span>
        <i className={`fas fa-chevron-down text-[9px] text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`}></i>
      </button>
      {open && (
        <div className="absolute z-[100] mt-1 w-full min-w-[180px] rounded-xl border border-slate-200/60 dark:border-white/5 bg-white shadow-2xl dark:shadow-black/80 overflow-hidden">
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

const ColegioEditView = ({
  colegioForm,
  setColegioForm,
  submitColegio,
  onBackToList
}) => {
  const ciudadOptions = [
    { value: 'Santa Cruz', label: 'Santa Cruz', icon: 'fas fa-map-location-dot' },
    { value: 'La Paz', label: 'La Paz', icon: 'fas fa-map-location-dot' },
    { value: 'Cochabamba', label: 'Cochabamba', icon: 'fas fa-map-location-dot' },
    { value: 'Tarija', label: 'Tarija', icon: 'fas fa-map-location-dot' },
    { value: 'Oruro', label: 'Oruro', icon: 'fas fa-map-location-dot' },
    { value: 'Potosi', label: 'Potosí', icon: 'fas fa-map-location-dot' },
    { value: 'Sucre', label: 'Sucre (Chuquisaca)', icon: 'fas fa-map-location-dot' },
    { value: 'Beni', label: 'Beni', icon: 'fas fa-map-location-dot' },
    { value: 'Pando', label: 'Pando', icon: 'fas fa-map-location-dot' },
  ];

  const rubroOptions = [
    { value: 'Educación Regular', label: 'Educación Regular / Primaria-Secundaria', icon: 'fas fa-school' },
    { value: 'Técnico Tecnológico', label: 'Técnico Tecnológico / Alternativa', icon: 'fas fa-graduation-cap' },
    { value: 'Convenio Robótica', label: 'Convenio de Robótica / LC', icon: 'fas fa-robot' },
    { value: 'Particular', label: 'Colegio Particular', icon: 'fas fa-building' },
  ];

  const estadoOptions = [
    { value: 'Activo', label: 'Activo / Vigente', icon: 'fas fa-circle-check' },
    { value: 'Inactivo', label: 'Inactivo / Baja temporal', icon: 'fas fa-circle-xmark' },
  ];

  return (
    <div className="space-y-5 font-montserrat w-full">
      <div className="bg-white dark:bg-[#040408] dark:border-white/8 rounded-2xl p-6 shadow-xl dark:shadow-black/60 border border-slate-200/60 dark:border-white/5 border-l-4 border-l-[#E95A0C] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-[#E95A0C]mber-600 flex items-center justify-center text-xl font-black shadow-sm shrink-0 border border-amber-250">
            <i className="fas fa-school"></i>
          </div>
          <div>
            <div className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">
              <span>Sistema</span>
              <span>{'>'}</span>
              <span>Colegios</span>
              <span>{'>'}</span>
              <span className="text-[#E95A0C]">Editar Ficha</span>
            </div>
            <h2 className="text-xl font-black text-[#4A2E1B] dark:text-white uppercase tracking-wider m-0 leading-none">
              Editar Ficha del Colegio: {colegioForm.nombre}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider mt-1 m-0">
              Modifique los datos registrados del colegio o institución asociada.
            </p>
          </div>
        </div>
 
        <button onClick={onBackToList}
          className="px-5 py-2.5 rounded-xl bg-[#8B4513] hover:bg-[#8B4513] text-white text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md border border-slate-700 shrink-0">
          <i className="fas fa-arrow-left"></i>
          <span>Volver al listado</span>
        </button>
      </div>

      <form onSubmit={submitColegio} className="space-y-5">

        {/* SECCION 1: TIPO Y DOCUMENTO */}
        <div className="bg-white dark:bg-[#040408] dark:border-white/8 rounded-2xl p-6 shadow-xl dark:shadow-black/60 border border-slate-200/60 dark:border-white/5 border-l-4 border-l-[#E95A0C]">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-150 mb-4">
            <i className="fas fa-id-card text-[#E95A0C] text-sm"></i>
            <h4 className="text-xs font-black text-[#4A2E1B] dark:text-white uppercase tracking-wider m-0">
              INFORMACIÓN INSTITUCIONAL
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block text-[10px] font-black uppercase tracking-wider text-[#E95A0C]">TIPO DE CLIENTE</label>
              <div className="px-4 py-2.5 rounded-xl border border-red-255  text-[#E95A0C] text-xs font-bold flex items-center gap-2 min-h-[40px]">
                <i className="fas fa-building text-xs"></i>
                <span>Persona Jurídica / Colegio</span>
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-[10px] font-black uppercase tracking-wider text-[#E95A0C]">NIVEL / ACTIVIDAD <b className="text-red-550">*</b></label>
              <DropdownSelect value={colegioForm.rubro} onChange={(val) => setColegioForm(prev => ({ ...prev, rubro: val }))} options={rubroOptions} />
            </div>
          </div>
        </div>

        {/* SECCION 2: DATOS DEL COLEGIO */}
        <div className="bg-white dark:bg-[#040408] dark:border-white/8 rounded-2xl p-6 shadow-xl dark:shadow-black/60 border border-slate-200/60 dark:border-white/5 border-l-4 border-l-[#E95A0C]">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-150 mb-4">
            <i className="fas fa-school text-[#E95A0C] text-sm"></i>
            <h4 className="text-xs font-black text-[#4A2E1B] dark:text-white uppercase tracking-wider m-0">
              DATOS DE CONTACTO Y UBICACIÓN
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1 md:col-span-2">
              <label className="block text-[10px] font-black uppercase tracking-wider text-[#E95A0C]">NOMBRE DEL COLEGIO / RAZÓN SOCIAL <b className="text-red-555">*</b></label>
              <div className="relative">
                <i className="fas fa-school absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
                <input type="text" placeholder="Ej. Colegio San Agustín" required value={colegioForm.nombre}
                  onChange={(e) => setColegioForm(prev => ({ ...prev, nombre: e.target.value }))}
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200/60 dark:border-white/5 bg-slate-50 dark:bg-[#070710] text-slate-850 text-xs focus:ring-2 focus:ring-[#E95A0C]/40 outline-none font-bold uppercase" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-[10px] font-black uppercase tracking-wider text-[#E95A0C]">CORREO ELECTRÓNICO INSTITUCIONAL</label>
              <div className="relative">
                <i className="fas fa-envelope absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
                <input type="email" placeholder="Ej. info@colegiosanagustin.edu" value={colegioForm.correo}
                  onChange={(e) => setColegioForm(prev => ({ ...prev, correo: e.target.value }))}
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200/60 dark:border-white/5 bg-slate-50 dark:bg-[#070710] text-slate-800 dark:text-white dark:border-white/8 dark:text-slate-200 text-xs focus:ring-2 focus:ring-[#E95A0C]/40 outline-none font-bold" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-[10px] font-black uppercase tracking-wider text-[#E95A0C]">TELÉFONO DE CONTACTO</label>
              <div className="relative">
                <i className="fas fa-phone absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
                <input type="text" placeholder="Ej. 76023412" value={colegioForm.telefono}
                  onChange={(e) => setColegioForm(prev => ({ ...prev, telefono: e.target.value }))}
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200/60 dark:border-white/5 bg-slate-50 dark:bg-[#070710] text-slate-800 dark:text-white dark:border-white/8 dark:text-slate-200 text-xs focus:ring-2 focus:ring-[#E95A0C]/40 outline-none font-bold" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-[10px] font-black uppercase tracking-wider text-[#E95A0C]">DEPARTAMENTO / CIUDAD <b className="text-red-500">*</b></label>
              <DropdownSelect value={colegioForm.ciudad} onChange={(val) => setColegioForm(prev => ({ ...prev, ciudad: val }))} options={ciudadOptions} />
            </div>

            <div className="space-y-1">
              <label className="block text-[10px] font-black uppercase tracking-wider text-[#E95A0C]">ESTADO <b className="text-red-500">*</b></label>
              <DropdownSelect value={colegioForm.estado} onChange={(val) => setColegioForm(prev => ({ ...prev, estado: val }))} options={estadoOptions} />
            </div>

            <div className="space-y-1 md:col-span-2">
              <label className="block text-[10px] font-black uppercase tracking-wider text-[#E95A0C]">DIRECCIÓN FÍSICA</label>
              <div className="relative">
                <i className="fas fa-map-marker-alt absolute left-3.5 top-4 text-slate-400 text-xs"></i>
                <textarea rows="2" placeholder="Ingrese la dirección completa del colegio..." value={colegioForm.direccion}
                  onChange={(e) => setColegioForm(prev => ({ ...prev, direccion: e.target.value }))}
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200/60 dark:border-white/5 bg-slate-50 dark:bg-[#070710] text-slate-800 dark:text-white dark:border-white/8 dark:text-slate-200 text-xs focus:ring-2 focus:ring-[#E95A0C]/40 outline-none font-bold resize-none" />
            </div>
          </div>
        </div>
      </div>

      {/* SECCION 3: OBSERVACIONES */}
      <div className="bg-white dark:bg-[#040408] dark:border-white/8 rounded-2xl p-6 shadow-xl dark:shadow-black/60 border border-slate-200/60 dark:border-white/5 border-l-4 border-l-[#E95A0C]">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-150 mb-4">
          <i className="fas fa-comment-dots text-[#E95A0C] text-sm"></i>
          <h4 className="text-xs font-black text-[#4A2E1B] dark:text-white uppercase tracking-wider m-0">
            OBSERVACIONES ADICIONALES
          </h4>
        </div>

        <div className="space-y-4">
          <div className="space-y-1">
            <textarea rows="3" placeholder="Detalles de convenios, cantidad de alumnos, etc..." value={colegioForm.observaciones}
              onChange={(e) => setColegioForm(prev => ({ ...prev, observaciones: e.target.value }))}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200/60 dark:border-white/5 bg-slate-50 dark:bg-[#070710] text-slate-800 dark:text-white dark:border-white/8 dark:text-slate-200 text-xs focus:ring-2 focus:ring-[#E95A0C]/40 outline-none font-bold resize-none" />
          </div>

          {/* BOTONES ACCION + DETALLE VISUAL */}
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
                className="px-8 py-3 rounded-xl bg-[#E95A0C] hover:bg-[#cc4a00] text-white text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-lg dark:shadow-black/60 shadow-orange-900/5 dark:shadow-none flex items-center gap-2 hover:scale-105">
                <i className="fas fa-check"></i>
                <span>Guardar Cambios</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      </form>
    </div>
  );
};

export default ColegioEditView;






















