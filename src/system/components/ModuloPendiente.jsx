import React from 'react';

const ModuloPendiente = ({ icon = 'fas fa-hammer', titulo = 'Módulo', descripcion, funcionalidades = [], pasos = [] }) => {
  return (
    <div className="bg-white dark:bg-[#040408] dark:border-white/8 rounded-2xl p-8 shadow-xl dark:shadow-black/60 border border-slate-200/60 dark:border-white/5 border-l-4 border-l-[#E95A0C] w-full font-montserrat animate-fade-in">
      <div className="flex flex-col items-center text-center mb-6">
        <div className="w-20 h-20 rounded-2xl bg-[#E95A0C]/10 text-[#E95A0C] flex items-center justify-center text-3xl border border-[#E95A0C]/20 shadow-lg dark:shadow-black/60 mb-4">
          <i className={icon}></i>
        </div>
        <span className="text-[9px] font-black uppercase tracking-[0.25em] text-[#E95A0C] bg-orange-500/10 border border-orange-500/20 px-3 py-1 rounded-full mb-3">
          <i className="fas fa-hourglass-half mr-1"></i> Próximamente
        </span>
        <h2 className="text-lg font-black text-[#4A2E1B] dark:text-white uppercase tracking-wider m-0 mb-1">{titulo}</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 font-bold leading-relaxed max-w-xl">
          {descripcion}
        </p>
      </div>

      {funcionalidades.length > 0 && (
        <div className="mb-6">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-[#4A2E1B] dark:text-white mb-3 flex items-center gap-2">
            <i className="fas fa-list-check text-[#E95A0C]"></i> Funcionalidades planificadas
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {funcionalidades.map((f, i) => (
              <div key={i} className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-[#070710] border border-slate-100 dark:border-white/5">
                <span className="w-6 h-6 rounded-lg bg-[#E95A0C] text-white flex items-center justify-center text-[10px] shrink-0">
                  <i className="fas fa-check"></i>
                </span>
                <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300">{f}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {pasos.length > 0 && (
        <div>
          <h3 className="text-[10px] font-black uppercase tracking-widest text-[#4A2E1B] dark:text-white mb-3 flex items-center gap-2">
            <i className="fas fa-route text-[#E95A0C]"></i> Hoja de ruta
          </h3>
          <div className="space-y-2">
            {pasos.map((p, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-orange-50/50 dark:bg-orange-950/10 border border-orange-200/40 dark:border-[#E95A0C]/10">
                <span className="w-7 h-7 rounded-lg bg-[#8B4513] text-white flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <span className="text-[11px] font-bold text-slate-600 dark:text-slate-300 leading-relaxed">{p}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ModuloPendiente;