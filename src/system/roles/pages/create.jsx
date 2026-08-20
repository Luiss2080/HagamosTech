import React, { useState, useRef, useEffect } from 'react';
import PermisosSelector from '../components/PermisosSelector';

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
    <div className="relative w-full" ref={ref}>
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

const RolCreateView = ({
  rolForm,
  setRolForm,
  submitRol,
  onBackToList,
  permisos = []
}) => {
  const [nivelAcceso, setNivelAcceso] = useState('Intermedio');
  const [departamento, setDepartamento] = useState('Ventas');

  const nivelOptions = [
    { value: 'Básico', label: 'Acceso Básico / Consulta', icon: 'fas fa-eye' },
    { value: 'Intermedio', label: 'Acceso Intermedio / Operaciones', icon: 'fas fa-sliders' },
    { value: 'Completo', label: 'Acceso Completo / Administración', icon: 'fas fa-user-gear' },
  ];

  const deptoOptions = [
    { value: 'Administración', label: 'Administración y Finanzas', icon: 'fas fa-building-columns' },
    { value: 'Ventas', label: 'Ventas y Atención Comercial', icon: 'fas fa-wallet' },
    { value: 'Almacenes', label: 'Almacenes y Logística', icon: 'fas fa-boxes-stacked' },
    { value: 'Pruebas', label: 'Soporte y Pruebas de Admisión', icon: 'fas fa-file-signature' },
  ];

  return (
    <div className="space-y-5 font-montserrat w-full">
      {/* CABECERA */}
      <div className="bg-white dark:bg-[#040408] rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-200 dark:border-white/5 border-l-4 border-l-[#E95A0C] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl  text-[#E95A0C] flex items-center justify-center text-xl font-black shadow-sm shrink-0 border border-orange-200/50 dark:dark:border-orange-900/50">
            <i className="fas fa-user-tag"></i>
          </div>
          <div>
            <div className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">
              <span>Sistema</span>
              <span>{'>'}</span>
              <span>Seguridad</span>
              <span>{'>'}</span>
              <span>Roles</span>
              <span>{'>'}</span>
              <span className="text-[#E95A0C]">Registrar Rol</span>
            </div>
            <h2 className="text-xl font-black text-[#4A2E1B] dark:text-white uppercase tracking-wider m-0 leading-none">
              Registrar Nuevo Rol
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider mt-1 m-0">
              Cree un nuevo perfil de seguridad y configure los detalles generales de su alcance comercial.
            </p>
          </div>
        </div>

        <button onClick={onBackToList}
          className="px-5 py-2.5 rounded-xl bg-[#E95A0C] hover:bg-[#cc4a00] text-white text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md shadow-red-900/30 border border-red-800/40 shrink-0">
          <i className="fas fa-arrow-left"></i>
          <span>Volver al listado</span>
        </button>
      </div>

      <form onSubmit={submitRol} className="space-y-5">
        {/* SECCIÓN 1: DATOS GENERALES */}
        <div className="bg-white dark:bg-[#040408] dark:border-white/8 rounded-2xl p-6 shadow-xl dark:shadow-black/60 border border-slate-200/60 dark:border-white/5 border-l-4 border-l-[#E95A0C]">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-150 mb-4">
            <i className="fas fa-shield-halved text-[#E95A0C] text-sm"></i>
            <h4 className="text-xs font-black text-[#4A2E1B] dark:text-white uppercase tracking-wider m-0">
              DATOS PRINCIPALES DE IDENTIFICACIÓN
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1 md:col-span-2">
              <label className="block text-[10px] font-black uppercase tracking-wider text-[#E95A0C]">
                NOMBRE DEL ROL / IDENTIFICADOR <b className="text-red-500">*</b>
              </label>
              <div className="relative">
                <i className="fas fa-tag absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
                <input
                  type="text"
                  placeholder="Ej: VENTAS GENERAL, AUDITOR DE STOCK, etc."
                  required
                  value={rolForm.nombre}
                  onChange={(e) => setRolForm(prev => ({ ...prev, nombre: e.target.value }))}
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200/60 dark:border-white/5 bg-slate-50 dark:bg-[#070710] text-slate-800 dark:text-white dark:border-white/8 dark:text-slate-200 text-xs focus:ring-2 focus:ring-[#E95A0C]/40 outline-none font-bold uppercase"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-[10px] font-black uppercase tracking-wider text-[#E95A0C]">
                NIVEL DE ACCESO SUGERIDO
              </label>
              <DropdownSelect value={nivelAcceso} onChange={setNivelAcceso} options={nivelOptions} />
            </div>

            <div className="space-y-1">
              <label className="block text-[10px] font-black uppercase tracking-wider text-[#E95A0C]">
                ÁREA / DEPARTAMENTO
              </label>
              <DropdownSelect value={departamento} onChange={setDepartamento} options={deptoOptions} />
            </div>
          </div>
        </div>

        {/* SECCIÓN 3: PERMISOS DEL ROL */}
        <PermisosSelector
          permisos={permisos}
          permisoIds={rolForm.permisoIds || []}
          onChange={(ids) => setRolForm(prev => ({ ...prev, permisoIds: ids }))}
        />

        {/* SECCIÓN 2: ALCANCE OPERATIVO */}
        <div className="bg-white dark:bg-[#040408] dark:border-white/8 rounded-2xl p-6 shadow-xl dark:shadow-black/60 border border-slate-200/60 dark:border-white/5 border-l-4 border-l-[#E95A0C]">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-150 mb-4">
            <i className="fas fa-list-check text-[#E95A0C] text-sm"></i>
            <h4 className="text-xs font-black text-[#4A2E1B] dark:text-white uppercase tracking-wider m-0">
              ALCANCE OPERATIVO Y DESCRIPCIÓN
            </h4>
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <label className="block text-[10px] font-black uppercase tracking-wider text-[#E95A0C]">
                DESCRIPCIÓN DE FUNCIONES (NOTAS ADICIONALES)
              </label>
              <textarea
                rows="3"
                placeholder="Detalle brevemente las responsabilidades del rol..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200/60 dark:border-white/5 bg-slate-50 dark:bg-[#070710] text-slate-800 dark:text-white dark:border-white/8 dark:text-slate-200 text-xs focus:ring-2 focus:ring-[#E95A0C]/40 outline-none font-bold resize-none"
              />
            </div>

            <div className="bg-blue-50 dark:bg-blue-950/40 p-4 rounded-xl border border-blue-200 dark:border-blue-900/50 flex items-start gap-3">
              <i className="fas fa-circle-info text-blue-500 mt-0.5"></i>
              <div className="text-xs text-blue-700 font-medium">
                <span className="font-extrabold uppercase text-[9px] tracking-wider block mb-1">PROCESO DE ASIGNACIÓN</span>
                El rol se registrará con la información general y los permisos marcados aquí. Si lo desea, también puede ajustar los accesos posteriormente en la pestaña <b>Matriz de Accesos</b>.
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
                  className="px-8 py-3 rounded-xl bg-[#E95A0C] hover:bg-[#cc4a00] text-white text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-lg dark:shadow-black/60 shadow-orange-900/5 dark:shadow-none flex items-center gap-2 hover:scale-105">
                  <i className="fas fa-check"></i>
                  <span>Registrar Rol</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RolCreateView;






















