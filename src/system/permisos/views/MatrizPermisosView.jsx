import React from 'react';

const MatrizPermisosView = ({
  permisos,
  matrizPermisos,
  togglePermisoRol
}) => {
  return (
    <div className="bg-white dark:bg-[#040408] dark:border-white/8 rounded-2xl p-5 shadow-xl dark:shadow-black/60 border border-slate-200/60 dark:border-white/5 font-montserrat">
      <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-100">
        <h4 className="text-xs font-black text-slate-850 uppercase tracking-wider flex items-center gap-2 m-0">
          <i className="fas fa-sliders text-[#E95A0C]"></i> Matriz Interactiva de Permisos
        </h4>
        <span className="text-[10px] font-bold text-slate-400 uppercase">
          {matrizPermisos.length} roles • {permisos.length} permisos
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b-2 border-slate-200/60 dark:border-white/5 text-slate-500 dark:text-slate-400 uppercase text-[9px] font-black tracking-widest bg-slate-50 dark:bg-[#070710]/50">
              <th className="py-3.5 px-4 bg-slate-50 dark:bg-[#070710]">Permiso / Código</th>
              {matrizPermisos.map(r => (
                <th key={r.id} className="py-3.5 px-4 text-center font-black text-slate-800 dark:text-slate-200">{r.nombre}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-white/5">
            {permisos.map(p => (
              <tr key={p.id} className="hover: dark:hover:bg-red-950/10 transition-colors">
                <td className="py-3.5 px-4  font-bold font-mono text-[#E95A0C] text-xs">
                  {p.nombre}
                </td>
                {matrizPermisos.map(r => {
                  const tiene = r.detalleRolPermisos.some(drp => drp.fkIdP === p.id);
                  return (
                    <td key={r.id} className="py-3.5 px-4 text-center">
                      <input
                        type="checkbox" 
                        checked={tiene} 
                        disabled={r.id === 1}
                        onChange={() => togglePermisoRol(r.id, p.id, tiene)}
                        className="w-4 h-4 text-[#E95A0C] rounded focus:ring-[#E95A0C]/40 cursor-pointer disabled:opacity-40 accent-[#E95A0C]"
                      />
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MatrizPermisosView;






















