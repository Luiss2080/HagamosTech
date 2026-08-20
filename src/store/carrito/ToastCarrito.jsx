import React from 'react';
import useCarritoStore from '../useCarritoStore';

const ToastCarrito = () => {
  const { ultimoAgregado, agregadoVisible, openCart } = useCarritoStore();
  const resumen = useCarritoStore((s) => s.resumen);

  if (!agregadoVisible || !ultimoAgregado) return null;

  return (
    <div className="fixed bottom-6 left-6 z-[200] animate-slide-up">
      <div className="flex items-center gap-4 bg-white rounded-2xl p-3 pr-5 shadow-2xl border border-orange-100 animate-modal-pop">
        <div className="w-14 h-14 rounded-xl overflow-hidden border border-orange-100 shrink-0">
          <img src={ultimoAgregado.imagen} alt={ultimoAgregado.nombre} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 min-w-[180px]">
          <div className="flex items-center gap-1.5 text-green-600 font-black text-[10px] uppercase tracking-wider mb-0.5">
            <i className="fas fa-check-circle"></i> Agregado al carrito
          </div>
          <p className="text-sm font-black text-[#111827] truncate">{ultimoAgregado.nombre}</p>
          <p className="text-[10px] font-bold text-slate-500">{ultimoAgregado.cantidad} unidad(es)</p>
        </div>
        <button onClick={openCart} className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#FF4D00] hover:bg-[#CC3D00] text-white font-black text-[9px] uppercase tracking-wider transition-all shadow-lg shadow-orange-500/20 shrink-0">
          <i className="fas fa-shopping-cart"></i> Ver · Bs. {resumen.total_bs}
        </button>
      </div>
    </div>
  );
};

export default ToastCarrito;
