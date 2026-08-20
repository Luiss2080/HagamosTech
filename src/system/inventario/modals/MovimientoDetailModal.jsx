import React from 'react';

const MovimientoDetailModal = ({ movimiento, onClose }) => {
  if (!movimiento) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 font-montserrat">
      <div className="bg-white dark:bg-[#040408] dark:border-white/8 rounded-2xl p-6 max-w-sm w-full border border-slate-200/60 dark:border-white/5 shadow-2xl dark:shadow-black/80">
        <div className="flex justify-between items-center pb-3 border-b border-slate-100 mb-4">
          <h4 className="text-xs font-black text-slate-850 uppercase tracking-wider flex items-center gap-2 m-0">
            <i className="fas fa-file-invoice text-[#E95A0C]"></i> Transacción #{movimiento.id}
          </h4>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:text-slate-400 font-black cursor-pointer">✕</button>
        </div>

        <div className="space-y-2.5 text-xs">
          <div className="p-3  rounded-xl border border-orange-200/50 dark:dark:border-orange-900/50">
            <span className="text-[9px] text-[#E95A0C] font-black uppercase block">Libro Afectado:</span>
            <p className="font-extrabold text-[#4A2E1B] dark:text-white text-sm m-0">{movimiento.libro?.titulo}</p>
            <span className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400">{movimiento.libro?.codigo}</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="p-2 rounded-xl bg-slate-50 dark:bg-[#070710] border border-slate-200/60 dark:border-white/5/60">
              <span className="text-[8px] text-slate-400 font-bold uppercase block">Tipo:</span>
              <span className="font-extrabold text-slate-800 dark:text-slate-200">{movimiento.tipoMovimiento}</span>
            </div>
            <div className="p-2 rounded-xl bg-slate-50 dark:bg-[#070710] border border-slate-200/60 dark:border-white/5/60">
              <span className="text-[8px] text-slate-400 font-bold uppercase block">Cantidad:</span>
              <span className="font-extrabold text-[#E95A0C]">{movimiento.cantidad} unidades</span>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#070710] border border-slate-200/60 dark:border-white/5/60">
            <span className="text-[8px] text-slate-400 font-bold uppercase block">Operador / Usuario:</span>
            <span className="font-bold text-slate-800 dark:text-slate-200">{movimiento.usuario?.nombre || movimiento.usuario?.usuario}</span>
          </div>

          {movimiento.observaciones && (
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#070710] border border-slate-200/60 dark:border-white/5/60">
              <span className="text-[8px] text-slate-400 font-bold uppercase block mb-1">Observaciones:</span>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 font-medium m-0">{movimiento.observaciones}</p>
            </div>
          )}
        </div>

        <button
          onClick={onClose}
          className="mt-5 w-full py-2.5 rounded-xl bg-slate-100 dark:bg-[#070710] hover:bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-slate-300 font-black text-xs uppercase tracking-wider transition-colors cursor-pointer"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default MovimientoDetailModal;






















