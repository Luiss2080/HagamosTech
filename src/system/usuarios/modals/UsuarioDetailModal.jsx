import React from 'react';

const UsuarioDetailModal = ({ user, onClose }) => {
  if (!user) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 font-montserrat">
      <div className="bg-white dark:bg-[#040408] dark:border-white/8 rounded-2xl p-6 max-w-sm w-full border border-slate-200/60 dark:border-white/5 shadow-2xl dark:shadow-black/80">
        <div className="flex justify-between items-center pb-3 border-b border-slate-100 mb-4">
          <h4 className="text-xs font-black text-slate-850 uppercase tracking-wider flex items-center gap-2 m-0">
            <i className="fas fa-user-circle text-[#E95A0C]"></i> Ficha de Usuario
          </h4>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:text-slate-400 font-black cursor-pointer">✕</button>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3  rounded-xl border border-orange-200/50 dark:dark:border-orange-900/50">
            <div className="w-10 h-10 rounded-xl bg-[#E95A0C] text-white flex items-center justify-center font-black text-base uppercase shadow-md shrink-0">
              {user.nombre?.charAt(0) || 'U'}
            </div>
            <div>
              <h3 className="text-sm font-black text-[#4A2E1B] dark:text-white leading-tight">{user.nombre}</h3>
              <span className="text-[10px] text-[#E95A0C] font-mono font-bold block mt-0.5">@{user.usuario}</span>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#070710] border border-slate-200/60 dark:border-white/5/60 flex justify-between items-center">
              <span className="text-[9px] text-slate-400 font-bold uppercase">Correo:</span>
              <span className="font-bold text-slate-800 dark:text-slate-200 font-mono text-[11px]">{user.correo}</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#070710] border border-slate-200/60 dark:border-white/5/60 flex justify-between items-center">
              <span className="text-[9px] text-slate-400 font-bold uppercase">Rol Asignado:</span>
              <span className="font-extrabold text-[#E95A0C]">{user.rolNombre}</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#070710] border border-slate-200/60 dark:border-white/5/60 flex justify-between items-center">
              <span className="text-[9px] text-slate-400 font-bold uppercase">Estado de la cuenta:</span>
              <span className={`font-black text-[9px] uppercase px-2 py-0.5 rounded-lg ${user.activo ? 'bg-emerald-100 dark:bg-emerald-950/40 text-[#E95A0C]merald-700' : 'bg-rose-100 dark:bg-rose-950/40 text-rose-700'}`}>
                {user.activo ? 'Activo' : 'Inactivo'}
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-5 w-full py-2.5 rounded-xl bg-slate-100 dark:bg-[#070710] hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-black text-xs uppercase tracking-wider transition-colors cursor-pointer"
        >
          Cerrar Ficha
        </button>
      </div>
    </div>
  );
};

export default UsuarioDetailModal;






















