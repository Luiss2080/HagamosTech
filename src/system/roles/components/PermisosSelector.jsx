import React, { useState, useMemo } from 'react';

const PermisosSelector = ({ permisos = [], permisoIds = [], onChange }) => {
  const [buscarPermiso, setBuscarPermiso] = useState('');

  const permisosFiltrados = useMemo(() => {
    if (!permisos || !Array.isArray(permisos)) return [];
    if (!buscarPermiso.trim()) return permisos;
    const term = buscarPermiso.toLowerCase();
    return permisos.filter(p => p.nombre && p.nombre.toLowerCase().includes(term));
  }, [permisos, buscarPermiso]);

  const togglePermiso = (id) => {
    const actuales = Array.isArray(permisoIds) ? [...permisoIds] : [];
    const existe = actuales.includes(id);
    onChange(existe ? actuales.filter(pid => pid !== id) : [...actuales, id]);
  };

  const todosSeleccionados = permisosFiltrados.length > 0 && permisosFiltrados.every(p => permisoIds.includes(p.id));

  const toggleTodos = () => {
    const actuales = new Set(Array.isArray(permisoIds) ? permisoIds : []);
    if (todosSeleccionados) {
      permisosFiltrados.forEach(p => actuales.delete(p.id));
    } else {
      permisosFiltrados.forEach(p => actuales.add(p.id));
    }
    onChange([...actuales]);
  };

  return (
    <div className="bg-white dark:bg-[#040408] dark:border-white/8 rounded-2xl p-6 shadow-xl dark:shadow-black/60 border border-slate-200/60 dark:border-white/5 border-l-4 border-l-[#E95A0C]">
      <div className="flex items-center gap-2 pb-3 border-b border-slate-150 mb-4">
        <i className="fas fa-key text-[#E95A0C] text-sm"></i>
        <h4 className="text-xs font-black text-[#4A2E1B] dark:text-white uppercase tracking-wider m-0">
          PERMISOS DEL ROL
        </h4>
        <span className="ml-auto  text-[#E95A0C] border border-orange-200/50 dark:dark:border-orange-900/50 text-[10px] px-3 py-1 rounded-xl font-black uppercase shadow-sm flex items-center gap-2">
          <i className="fas fa-check-double text-[9px]"></i>
          <span className="text-xs">{permisoIds.length}/{permisos.length}</span>
          SELECCIONADOS
        </span>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 mb-4">
        <div className="flex-1 w-full space-y-1">
          <label className="block text-[9px] font-black uppercase tracking-wider text-[#E95A0C]">
            BUSCAR PERMISO
          </label>
          <div className="relative md:max-w-md">
            <i className="fas fa-search absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
            <input
              type="text"
              placeholder="Filtrar permisos por nombre..."
              value={buscarPermiso}
              onChange={(e) => setBuscarPermiso(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200/60 dark:border-white/5 bg-slate-50 dark:bg-[#070710] text-slate-800 dark:text-white dark:border-white/8 dark:text-slate-200 text-xs focus:ring-2 focus:ring-[#E95A0C]/40 outline-none font-bold"
            />
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0 w-full md:w-auto">
          <button
            type="button"
            onClick={toggleTodos}
            className="flex-1 md:flex-none px-5 py-2.5 rounded-xl bg-[#8B4513] hover:bg-slate-900 dark:hover:bg-slate-800 text-white text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 border border-slate-700 shadow-sm hover:scale-105"
          >
            <i className="fas fa-list-check"></i>
            <span>{todosSeleccionados ? 'Quitar todos' : 'Marcar todos'}</span>
          </button>
        </div>
      </div>

      {permisosFiltrados.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 max-h-[420px] overflow-y-auto pr-1">
          {permisosFiltrados.map(p => {
            const activo = permisoIds.includes(p.id);
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => togglePermiso(p.id)}
                className={`flex items-center gap-2.5 w-full px-3 py-2.5 rounded-xl border text-left transition-all duration-200 cursor-pointer group ${
                  activo
                    ? 'bg-[#E95A0C]/5 border-[#E95A0C]/40 shadow-sm'
                    : 'bg-slate-50 dark:bg-[#070710] border-slate-200/60 dark:border-white/5 hover:border-[#E95A0C]/40 hover:bg-white dark:hover:bg-slate-800'
                }`}
              >
                <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-[10px] shrink-0 border transition-colors ${
                  activo
                    ? 'bg-[#E95A0C] border-[#E95A0C] text-white shadow-sm shadow-orange-900/5 dark:shadow-none'
                    : 'bg-white border-slate-300 text-transparent group-hover:text-[#E95A0C]/40'
                }`}>
                  <i className="fas fa-check"></i>
                </div>
                <div className="min-w-0 flex-1">
                  <span className={`block text-[10px] font-black uppercase tracking-wider truncate leading-tight ${
                    activo ? 'text-[#E95A0C] dark:text-red-400' : 'text-slate-700 dark:text-slate-300 dark:text-slate-300'
                  }`}>
                    {p.nombre}
                  </span>
                  <span className="block text-[8px] font-mono font-bold text-slate-400 mt-0.5">
                    <i className="fas fa-hashtag text-[7px] mr-0.5"></i>{p.id}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-10 text-slate-400 font-bold text-xs bg-slate-50 dark:bg-[#070710] rounded-xl border border-dashed border-slate-200/60 dark:border-white/5">
          <i className="fas fa-key text-[#E95A0C]xl text-[#E95A0C] block mb-2 opacity-50"></i>
          No hay permisos disponibles con ese filtro.
        </div>
      )}
    </div>
  );
};

export default PermisosSelector;






















