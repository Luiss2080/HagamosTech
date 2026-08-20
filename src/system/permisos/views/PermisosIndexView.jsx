import React from 'react';

const PermisosIndexView = ({
  permisoForm,
  setPermisoForm,
  submitPermiso,
  permisosDisponibles
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 font-montserrat">
      {/* Formulario */}
      <form onSubmit={submitPermiso} className="md:col-span-1 bg-white p-5 rounded-2xl border border-slate-200/60 dark:border-white/5 shadow-xl dark:shadow-black/60 space-y-4">
        <h4 className="text-xs font-black uppercase text-slate-850 pb-3 border-b border-slate-100 flex items-center gap-2 m-0">
          <i className="fas fa-plus-circle text-[#E95A0C]"></i> Registrar Nuevo Permiso
        </h4>
        <div>
          <label className="block text-[10px] font-black uppercase text-slate-500 dark:text-slate-400 mb-1">Nombre del Código: <b className="text-red-500">*</b></label>
          <input
            type="text" required placeholder="Ej: REPORTE_COMPRAS"
            value={permisoForm.nombre}
            onChange={(e) => setPermisoForm({ nombre: e.target.value.toUpperCase() })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200/60 dark:border-white/5 bg-slate-50 dark:bg-[#070710] text-slate-800 dark:text-white dark:border-white/8 dark:text-slate-200 text-xs focus:ring-2 focus:ring-[#E95A0C]/40 outline-none font-bold"
          />
        </div>
        <button type="submit" className="w-full py-3 bg-gradient-to-r from-[#E95A0C] to-red-700 hover:from-red-700 hover:to-[#E95A0C] text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-md shadow-orange-900/5 dark:shadow-none border border-red-500/20">
          ✓ Guardar Permiso
        </button>
      </form>

      {/* Listado */}
      <div className="md:col-span-2 bg-white p-5 rounded-2xl border border-slate-200/60 dark:border-white/5 shadow-xl dark:shadow-black/60">
        <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-100">
          <h4 className="text-xs font-black text-slate-850 uppercase tracking-wider flex items-center gap-2 m-0">
            <i className="fas fa-list-check text-[#E95A0C]"></i> Permisos Registrados
          </h4>
          <span className="bg-[#E95A0C] text-white text-[9px] px-2.5 py-0.5 rounded-lg font-black uppercase">
            {permisosDisponibles.length} activos
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {[...permisosDisponibles].sort((a, b) => (a.nombre || '').localeCompare(b.nombre || '')).map(p => (
            <div key={p.id} className="p-3  rounded-xl border border-orange-200/50 dark:dark:border-orange-900/50/60 font-mono text-[11px] font-black text-center text-[#E95A0C] shadow-sm flex items-center justify-center gap-1.5 hover:border-[#E95A0C]/40 hover:shadow-md transition-all">
              <i className="fas fa-shield-halved text-[9px]"></i>
              <span className="truncate">{p.nombre}</span>
            </div>
          ))}
          {permisosDisponibles.length === 0 && (
            <div className="col-span-full py-6 text-center text-slate-400 font-bold text-xs">
              <i className="fas fa-shield-slash block text-lg mb-1 opacity-50"></i>
              No hay permisos registrados
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PermisosIndexView;






















