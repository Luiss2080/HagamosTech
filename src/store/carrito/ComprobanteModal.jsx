import React from 'react';
import CircleParticles from '../../components/fondos/ParticulasCirculares';

const ComprobanteModal = ({ isOpen, onClose, pedido = {} }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[120]" aria-modal="true">
      <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity duration-300" onClick={onClose}></div>
      <div className="fixed inset-0 z-[121] overflow-y-auto" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
        <div className="flex min-h-screen items-center justify-center p-4 text-center sm:p-0" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
          <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto scrollbar-none transform overflow-hidden rounded-[2.5rem] bg-white text-left shadow-2xl transition-all sm:my-4 animate-modal-pop border border-gray-200">
            <div className="grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
              {/* Left: Success panel */}
              <div className="relative hidden lg:flex flex-col justify-center items-center p-8 overflow-hidden bg-gradient-to-br from-[#22c55e] to-[#15803d] text-white text-center">
                <div className="absolute inset-0 z-0 pointer-events-none">
                  <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                  <CircleParticles colorScheme="dark" />
                </div>
                <div className="relative z-10">
                  <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-5 shadow-2xl ring-4 ring-white/30 animate-bounce-slow">
                    <i className="fas fa-check text-5xl text-white"></i>
                  </div>
                  <h2 className="text-3xl font-black font-heading mb-2 drop-shadow-lg">¡Compra Confirmada!</h2>
                  <p className="text-white/85 font-semibold mb-5">Gracias por tu pedido. Te contactaremos para coordinar la entrega.</p>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 border border-white/30 text-white text-[10px] font-black uppercase tracking-widest mb-4">
                    <i className="fas fa-hashtag"></i> {pedido.numero || 'LC-000000'}
                  </div>
                </div>
              </div>

              {/* Right: Detalle */}
              <div className="relative flex flex-col justify-center h-full bg-[#FFF6F6] p-5 lg:p-8">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <div className="absolute -top-10 -right-10 w-64 h-64 bg-[#22c55e]/10 rounded-full blur-3xl"></div>
                  <CircleParticles colorScheme="light" />
                </div>

                <div className="relative z-10 w-full max-w-[440px] mx-auto text-center">
                  <h3 className="text-2xl font-black font-heading text-[#111827] mb-5"><i className="fas fa-check-circle text-[#22c55e] mr-2"></i>Todo listo</h3>

                  <div className="bg-white rounded-2xl border border-orange-100 shadow-sm p-5 mb-5 text-left">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Pedido</span>
                      <span className="text-sm font-black text-[#111827]">{pedido.numero || '—'}</span>
                    </div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Cliente</span>
                      <span className="text-sm font-black text-[#111827]">{pedido.nombre || '—'}</span>
                    </div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Pago</span>
                      <span className="text-sm font-black text-[#111827]">{pedido.metodo || '—'}</span>
                    </div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Productos</span>
                      <span className="text-sm font-black text-[#111827]">{pedido.items || 0} ítems</span>
                    </div>
                    <div className="border-t border-orange-100 pt-3 flex items-center justify-between">
                      <span className="text-xs font-black uppercase tracking-wider text-[#111827]">Total</span>
                      <span className="text-2xl font-black font-heading text-[#22c55e]">Bs. {pedido.total || 0}</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2.5">
                    <a href="https://wa.me/59161320004" target="_blank" rel="noopener noreferrer" className="w-full py-3.5 rounded-full bg-[#25D366] hover:bg-[#1ebd59] text-white font-black text-[11px] uppercase tracking-[0.15em] shadow-lg transition-all flex items-center justify-center gap-2">
                      <i className="fab fa-whatsapp"></i> Confirmar por WhatsApp
                    </a>
                    <button onClick={onClose} className="w-full py-3.5 rounded-full bg-[#FF4D00] hover:bg-[#CC3D00] text-white font-black text-[11px] uppercase tracking-[0.15em] shadow-lg transition-all">
                      Finalizar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComprobanteModal;
