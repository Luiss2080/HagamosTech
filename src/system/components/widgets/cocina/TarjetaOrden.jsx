import React from 'react';
import { motion } from 'framer-motion';
import { formatearHora, formatearTiempo } from '../usePedidosStore';

export const FlamaAnimada = () => (
  <div className="relative w-4 h-4 flex items-end justify-center">
    <div className="absolute bottom-0 w-2 h-3 bg-yellow-400 rounded-full animate-[flame_0.6s_infinite_alternate] mix-blend-screen blur-[1px]"></div>
    <div className="absolute bottom-0 w-3 h-4 bg-[#FF4D00] rounded-full animate-[flame_0.8s_infinite_alternate_0.2s] mix-blend-screen blur-[2px] opacity-80"></div>
    <style>{`
      @keyframes flame {
        0% { transform: scale(1, 1) translateY(0); }
        100% { transform: scale(0.9, 1.2) translateY(-2px); }
      }
      .ticket-edge {
        background: radial-gradient(circle at bottom, transparent 4px, white 5px) bottom;
        background-size: 12px 10px;
        background-repeat: repeat-x;
        padding-bottom: 12px;
      }
    `}</style>
  </div>
);

export const VentiladorHorno = () => (
  <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }} className="text-orange-200 opacity-50 flex items-center justify-center">
    <i className="fas fa-fan"></i>
  </motion.div>
);

export const TarjetaOrden = ({ orden, ahora, onPreparar, onListo, onEntregar, onAnular, arrastrando, onDragStart, onDragEnd }) => {
  const segundos = orden.iniciadoEn && orden.estado === 'preparacion'
    ? Math.max(0, Math.floor((ahora - orden.iniciadoEn) / 1000))
    : orden.tiempoPreparacion || 0;

  const pct = orden.estado === 'preparacion' ? Math.min(100, (segundos / 900) * 100) : orden.estado === 'listo' ? 100 : 0;
  
  return (
    <motion.div
      layout
      layoutId={`orden-${orden.codigo}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: arrastrando ? 0.8 : 1, y: 0, scale: arrastrando ? 1.05 : 1, rotate: arrastrando ? 2 : 0 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      className={`group cursor-grab active:cursor-grabbing bg-white rounded-t-[20px] rounded-b-[4px] shadow-sm border-[3px] transition-all overflow-hidden ${arrastrando ? 'z-50 border-[#FF4D00] shadow-xl' : 'border-[#8B4513]/10 hover:border-[#FF4D00]/60 hover:shadow-lg'} relative ticket-edge`}
    >
      <div className={`p-4 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgxMzksNjksMTksMC4wMikiIHN0cm9rZS13aWR0aD0iMSIvPjwvc3ZnPg==')] border-b border-dashed border-[#8B4513]/20`}>
        <div className="flex items-start gap-4">
          <div className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center shadow-inner relative overflow-hidden ${orden.estado === 'pendiente' ? 'bg-[#FF4D00] text-white' : orden.estado === 'preparacion' ? 'bg-[#8B4513] text-white' : 'bg-[#5D3A1F] text-white'}`}>
            <span className="text-[9px] font-black uppercase tracking-widest opacity-80 leading-none mb-1 relative z-10">MESA</span>
            <span className="text-2xl font-black leading-none relative z-10">{orden.mesa}</span>
            {orden.estado === 'preparacion' && <div className="absolute top-0 right-0 opacity-10 scale-150"><VentiladorHorno /></div>}
          </div>
          
          <div className="flex-1 pt-0.5">
            <div className="flex items-start justify-between mb-1.5">
              <p className="text-[15px] font-black text-[#5D3A1F] leading-tight">#{orden.codigo}</p>
              <span className="px-2 py-0.5 rounded border border-[#8B4513]/20 text-[#8B4513] bg-orange-50 text-[9px] font-black uppercase tracking-widest flex items-center gap-1">
                <i className={orden.metodoPago.toLowerCase().includes('efectivo') ? 'fas fa-wallet' : 'fas fa-qrcode'}></i> {orden.metodoPago}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black text-[#FF4D00] flex items-center gap-1 bg-[#FF4D00]/10 px-2 py-0.5 rounded-md border border-[#FF4D00]/20">
                <i className="far fa-clock"></i> {formatearHora(orden.creadoEn)}
              </span>
              <span className="text-[9px] font-black text-gray-500 uppercase bg-gray-100 px-2 py-0.5 rounded-md">
                {orden.items.reduce((a,b)=>a+b.cantidad,0)} Prod.
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-3 space-y-3 bg-white">
        {orden.items.map((it, i) => {
          const isSaltena = it.nombre.toLowerCase().includes('salteña');
          const isBebida = it.nombre.toLowerCase().includes('coca') || it.nombre.toLowerCase().includes('jugo') || it.nombre.toLowerCase().includes('agua');
          const itemIcon = isSaltena ? 'fas fa-cloud-meatball' : isBebida ? 'fas fa-glass-water' : 'fas fa-utensils';
          
          return (
            <div key={i} className="flex items-start gap-3">
              <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-[#8B4513]/10 text-[#8B4513] border border-[#8B4513]/20 font-black text-xs shadow-sm">
                {it.cantidad}
              </div>
              <div className="flex-1 pt-1 border-b border-[#8B4513]/5 pb-2">
                <p className="font-bold text-[#5D3A1F] text-[13px] leading-snug flex items-start gap-2">
                  <i className={`${itemIcon} text-xs w-4 text-center mt-0.5 text-[#FF4D00]`}></i> {it.nombre}
                </p>
                {it.quitar && it.quitar.length > 0 && (
                  <p className="text-[9px] text-white font-black mt-1.5 uppercase bg-[#FF4D00] inline-flex items-center px-1.5 py-0.5 rounded shadow-sm">
                    <i className="fas fa-minus mr-1 text-[8px]"></i> SIN {it.quitar.join(', ')}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-4 pt-2 bg-white relative">
        {orden.estado === 'preparacion' && (
          <div className="mb-4 bg-[#8B4513]/5 p-3 rounded-xl border border-[#8B4513]/10 shadow-sm relative overflow-hidden">
            <div className="relative z-10 flex items-center justify-between mb-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#FF4D00] flex items-center gap-1.5">
                <FlamaAnimada />
                Cocción
              </span>
              <span className="font-mono font-black text-[#5D3A1F] text-[15px] bg-white px-2 rounded border border-[#8B4513]/20 shadow-sm">{formatearTiempo(segundos)}</span>
            </div>
            <div className="relative z-10 h-2.5 rounded-full bg-orange-100 overflow-hidden shadow-inner border border-orange-200">
              <div className="h-full bg-[#FF4D00] transition-all duration-1000 relative" style={{ width: `${pct}%` }}>
                 <div className="absolute top-0 right-0 bottom-0 w-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-[shimmer_1.5s_infinite] skew-x-[-20deg]"></div>
              </div>
            </div>
          </div>
        )}
        
        {orden.estado === 'listo' && (
          <div className="mb-4 flex items-center justify-between bg-[#5D3A1F]/5 rounded-xl py-3 px-3 border border-[#5D3A1F]/10 shadow-sm">
            <span className="text-[11px] font-black uppercase tracking-widest text-[#5D3A1F] flex items-center gap-1.5">
              <i className="fas fa-check-circle text-[#FF4D00]"></i> T. Finalizado
            </span>
            <span className="font-mono font-black text-[#5D3A1F] text-[15px] bg-white px-2 rounded shadow-sm border border-[#5D3A1F]/20">{formatearTiempo(segundos)}</span>
          </div>
        )}

        {orden.estado === 'pendiente' && (
          <div className="flex gap-2">
            <button onClick={() => onPreparar(orden.codigo)}
              className="flex-1 py-3.5 rounded-xl bg-[#FF4D00] hover:bg-[#E64500] text-white text-[11px] font-black uppercase tracking-widest shadow-md flex items-center justify-center gap-2 transition-all active:scale-95">
              <i className="fas fa-fire-burner"></i> Al Horno
            </button>
            <button onClick={() => onAnular(orden.codigo)}
              className="w-12 h-12 rounded-xl bg-white border border-gray-200 text-gray-400 hover:text-white hover:bg-[#5D3A1F] hover:border-[#5D3A1F] flex items-center justify-center transition-all shadow-sm">
              <i className="fas fa-trash-alt"></i>
            </button>
          </div>
        )}

        {orden.estado === 'preparacion' && (
          <button onClick={() => onListo(orden.codigo)}
            className="w-full py-3.5 rounded-xl bg-[#8B4513] hover:bg-[#733910] text-white text-[11px] font-black uppercase tracking-widest shadow-md flex items-center justify-center gap-2 transition-all active:scale-95">
            <i className="fas fa-check-double"></i> Terminado y Listo
          </button>
        )}

        {orden.estado === 'listo' && (
          <button onClick={() => onEntregar(orden.codigo)}
            className="w-full py-3.5 rounded-xl bg-[#5D3A1F] hover:bg-[#3E2723] text-white text-[11px] font-black uppercase tracking-widest shadow-md flex items-center justify-center gap-2 transition-all active:scale-95">
            <i className="fas fa-concierge-bell"></i> Entregado
          </button>
        )}
      </div>
    </motion.div>
  );
};
