import React from 'react';

const AlertasStock = ({ alertas }) => {
  const criticos = alertas.filter(a => a.stock > 0);
  const agotados = alertas.filter(a => a.stock <= 0);

  return (
    <div className="space-y-4 font-montserrat w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-[#040408] rounded-2xl p-5 shadow-xl dark:shadow-black/60 border border-slate-200/60 dark:border-white/5 border-l-4 border-l-amber-500 flex items-center gap-3">
          <span className="w-11 h-11 rounded-xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center text-lg"><i className="fas fa-triangle-exclamation"></i></span>
          <div>
            <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Stock crítico</p>
            <p className="text-2xl font-black text-amber-600">{criticos.length}</p>
          </div>
        </div>
        <div className="bg-white dark:bg-[#040408] rounded-2xl p-5 shadow-xl dark:shadow-black/60 border border-slate-200/60 dark:border-white/5 border-l-4 border-l-red-500 flex items-center gap-3">
          <span className="w-11 h-11 rounded-xl bg-red-50 border border-red-200 text-red-500 flex items-center justify-center text-lg"><i className="fas fa-circle-xmark"></i></span>
          <div>
            <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Agotados</p>
            <p className="text-2xl font-black text-red-500">{agotados.length}</p>
          </div>
        </div>
      </div>

      {alertas.length === 0 ? (
        <div className="bg-white dark:bg-[#040408] rounded-2xl p-10 shadow-xl dark:shadow-black/60 border border-slate-200/60 dark:border-white/5 border-l-4 border-l-emerald-500 text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-500 flex items-center justify-center text-2xl mx-auto mb-3"><i className="fas fa-circle-check"></i></div>
          <h3 className="text-sm font-black text-emerald-600 uppercase tracking-wide mb-1">Todo en orden</h3>
          <p className="text-xs text-slate-400 font-bold">No hay productos con stock crítico ni agotado.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {alertas.map((a, i) => (
            <div key={i} className="bg-white dark:bg-[#040408] rounded-2xl p-4 shadow-xl dark:shadow-black/60 border border-slate-200/60 dark:border-white/5 border-l-4 border-l-amber-500 flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl overflow-hidden bg-[#FFF5EC] border border-orange-100 shrink-0">
                {a.imagen ? <img src={a.imagen} alt="" className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-[#E95A0C]"><i className="fas fa-utensils"></i></div>}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[12px] font-black text-[#4A2E1B] dark:text-white truncate">{a.productoNombre}</p>
                <p className="text-[9px] font-bold text-slate-400 uppercase">{a.categoria} · {a.sucursalNombre}</p>
              </div>
              <div className="text-right shrink-0">
                <p className={`text-lg font-black ${a.stock <= 0 ? 'text-red-500' : 'text-amber-600'}`}>{a.stock}</p>
                <p className="text-[8px] font-black uppercase text-slate-400">min {a.minimo}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AlertasStock;