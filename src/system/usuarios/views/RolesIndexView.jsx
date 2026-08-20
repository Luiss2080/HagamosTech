import React from 'react';

const RolesIndexView = ({
  roles,
  onEditRol,
  onDeleteRol
}) => {
  return (
    <div className="bg-white dark:bg-[#040408] dark:border-white/8 rounded-2xl p-5 shadow-xl dark:shadow-black/60 border border-slate-200/60 dark:border-white/5 font-montserrat">
      <h4 className="text-xs font-black text-slate-850 uppercase tracking-wider mb-4 pb-3 border-b border-slate-100 flex items-center justify-between m-0">
        <span className="flex items-center gap-2">
          <i className="fas fa-user-tag text-purple-600"></i> Catálogo de Roles del Sistema
        </span>
        <span className="bg-purple-600 text-white text-[9px] px-2 py-0.5 rounded-lg font-black uppercase">
          {roles.length} roles
        </span>
      </h4>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b-2 border-slate-200/60 dark:border-white/5 text-slate-500 dark:text-slate-400 uppercase text-[9px] font-black tracking-widest bg-slate-50 dark:bg-[#070710]/50">
              <th className="py-3 px-4">ID</th>
              <th className="py-3 px-4">Nombre del Rol</th>
              <th className="py-3 px-4 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-white/5">
            {roles.map((r, i) => (
              <tr key={i} className="hover:bg-purple-50 dark:bg-purple-950/40/20 dark:hover:bg-purple-950/10 transition-colors">
                <td className="py-3 px-4 font-mono font-bold text-slate-400">#{r.id}</td>
                <td className="py-3 px-4 font-black text-slate-850">{r.nombre}</td>
                <td className="py-3 px-4 text-center">
                  <div className="flex justify-center gap-1.5">
                    <button
                      onClick={() => onEditRol(r)}
                      disabled={r.id === 1}
                      className="w-7 h-7 rounded-lg bg-amber-50 dark:bg-amber-950/400/10 hover:bg-amber-50 dark:bg-amber-950/400 text-[#E95A0C]mber-600 hover:text-white flex items-center justify-center text-xs shadow-sm transition-all cursor-pointer border border-amber-500/20 disabled:opacity-30 disabled:pointer-events-none"
                      title="Editar Rol"
                    >
                      <i className="fas fa-edit text-[9px]"></i>
                    </button>
                    <button
                      onClick={() => onDeleteRol(r.id)}
                      disabled={r.id === 1 || r.id === 4}
                      className="w-7 h-7 rounded-lg bg-rose-50 dark:bg-rose-950/400/10 hover:bg-rose-600 text-rose-600 hover:text-white flex items-center justify-center text-xs shadow-sm transition-all cursor-pointer border border-rose-500/20 disabled:opacity-30 disabled:pointer-events-none"
                      title="Eliminar Rol"
                    >
                      <i className="fas fa-trash text-[9px]"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RolesIndexView;






















