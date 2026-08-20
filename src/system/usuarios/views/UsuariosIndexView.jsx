import React from 'react';

const UsuariosIndexView = ({
  usuarios,
  paginatedUsuarios,
  cambiarEstadoUsuario,
  onViewDetail,
  onEdit,
  onDelete
}) => {
  return (
    <div className="bg-white dark:bg-[#040408] dark:border-white/8 rounded-2xl p-5 shadow-xl dark:shadow-black/60 border border-slate-200/60 dark:border-white/5 border-l-4 border-l-[#E95A0C] font-montserrat">
      <div className="flex justify-between items-center mb-5 pb-3 border-b border-slate-150">
        <h3 className="text-xs font-black text-[#4A2E1B] dark:text-white uppercase tracking-wider m-0 flex items-center gap-2">
          DIRECTORIO DE USUARIOS DEL SISTEMA
        </h3>
        <span className=" text-[#E95A0C] border border-orange-200/50 dark:dark:border-orange-900/50 text-[10px] px-3 py-1 rounded-xl font-black uppercase shadow-sm flex items-center gap-1.5">
          <i className="fas fa-users text-[10px]"></i>
          {usuarios.length} USUARIOS ACTIVOS
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b-2 border-slate-100 dark:border-white/5 dark:border-white/5 text-[#E95A0C] uppercase text-[9px] font-black tracking-widest               <th className="py-3.5 px-4"><i className="fas fa-user-gear text-[#E95A0C] mr-1.5"></i>USUARIO</th>
              <th className="py-3.5 px-4"><i className="fas fa-[#E95A0C] fa-signature text-[#E95A0C] mr-1.5"></i>NOMBRE COMPLETO</th>
              <th className="py-3.5 px-4"><i className="fas fa-envelope text-[#E95A0C] mr-1.5"></i>CORREO</th>
              <th className="py-3.5 px-4"><i className="fas fa-user-shield text-[#E95A0C] mr-1.5"></i>ROL</th>
              <th className="py-3.5 px-4 text-center"><i className="fas fa-bolt text-[#E95A0C] mr-1.5"></i>ESTADO</th>
              <th className="py-3.5 px-4 text-center"><i className="fas fa-sliders text-[#E95A0C] mr-1.5"></i>ACCIONES</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-white/5">
            {paginatedUsuarios.length > 0 ? (
              paginatedUsuarios.map((u, i) => (
                <tr key={i} className="hover: dark:hover:bg-red-950/20 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-[#E95A0C]">{u.usuario}</td>
                  <td className="py-3.5 px-4 font-black text-[#4A2E1B] dark:text-white text-xs">{u.nombre}</td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400 font-mono text-xs">{u.correo}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-1 rounded-lg  text-[#E95A0C] text-[9px] font-black uppercase border border-orange-200/50 dark:dark:border-orange-900/50">
                      {u.rol?.nombre || 'SIN ROL'}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <button
                      onClick={() => cambiarEstadoUsuario(u.id, u.activo)}
                      className={`px-3 py-1 rounded-full text-[9px] font-black uppercase transition-all cursor-pointer inline-flex items-center gap-1.5 shadow-sm ${
                        u.activo 
                          ? 'bg-emerald-100 dark:bg-emerald-950/40 text-[#E95A0C]merald-800 hover:bg-emerald-200 dark:text-[#E95A0C]merald-400' 
                          : 'bg-rose-100 dark:bg-rose-950/40 text-rose-800 hover:bg-rose-200 dark:text-rose-400'
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${u.activo ? 'bg-emerald-50 dark:bg-emerald-950/400 animate-pulse' : 'bg-rose-50 dark:bg-rose-950/400'}`}></span>
                      {u.activo ? 'ACTIVO' : 'INACTIVO'}
                    </button>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => onViewDetail(u)}
                        className="w-9 h-9 rounded-xl bg-[#E95A0C] hover:bg-[#cc4a00] text-white flex items-center justify-center text-xs shadow-md shadow-orange-900/5 dark:shadow-none transition-all cursor-pointer border-0 hover:scale-110"
                        title="Ver Ficha Cuenta"
                      >
                        <i className="fas fa-file-invoice"></i>
                      </button>
                      <button
                        onClick={() => onEdit(u)}
                        className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-950/400 hover:bg-amber-600 text-white flex items-center justify-center text-xs shadow-md shadow-amber-500/20 dark:shadow-none transition-all cursor-pointer border-0 hover:scale-110"
                        title="Editar Cuenta"
                      >
                        <i className="fas fa-pen"></i>
                      </button>
                      <button
                        onClick={() => onDelete(u)}
                        className="w-9 h-9 rounded-xl bg-rose-600 hover:bg-rose-700 text-white flex items-center justify-center text-xs shadow-md shadow-rose-500/20 transition-all cursor-pointer border-0 hover:scale-110"
                        title="Dar de baja"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-12 text-slate-400 font-bold">No hay usuarios registrados.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsuariosIndexView;






















