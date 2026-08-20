import React from 'react';
import useCarritoStore from '../../useCarritoStore';

const CarritoFlotante = () => {
  const openCart = useCarritoStore((s) => s.openCart);
  const resumen = useCarritoStore((s) => s.resumen);
  const items = useCarritoStore((s) => s.items);

  return (
    <div className="fixed bottom-6 right-6 z-[90] group">
      <button onClick={openCart} className="relative flex items-center gap-3 bg-gradient-to-r from-[#FF4D00] to-[#CC3D00] text-white rounded-full py-3.5 px-5 shadow-2xl shadow-orange-500/30 transition-all hover:scale-105 hover:-translate-y-1">
        <i className="fas fa-shopping-cart text-lg"></i>
        <span className="text-sm font-black">Bs. {resumen.total_bs}</span>
        {resumen.cantidad_total > 0 && (
          <span className="w-6 h-6 rounded-full bg-white text-[#FF4D00] text-xs font-black flex items-center justify-center animate-pulse">{resumen.cantidad_total}</span>
        )}
      </button>
      {resumen.cantidad_total > 0 && (
        <div className="absolute bottom-full right-0 mb-3 w-72 bg-white rounded-2xl shadow-2xl border border-orange-100 p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Tu pedido</p>
            <button onClick={openCart} className="text-[9px] font-black text-[#FF4D00] hover:underline">Ver todo</button>
          </div>
          <div className="space-y-1.5 max-h-[180px] overflow-y-auto scrollbar-none">
            {items.map((item) => (
              <div key={item.productoId} className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg overflow-hidden border border-orange-100 shrink-0"><img src={item.imagen} alt={item.nombre} className="w-full h-full object-cover" /></div>
                <p className="flex-1 text-[11px] font-black text-[#111827] truncate">{item.nombre}</p>
                <span className="text-[10px] font-black text-slate-400">x{item.cantidad}</span>
                <span className="text-[10px] font-black text-[#FF4D00]">Bs. {item.precio * item.cantidad}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-orange-100 mt-2 pt-2 flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Total</span>
            <span className="text-lg font-black font-heading text-[#FF4D00]">Bs. {resumen.total_bs}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarritoFlotante;
