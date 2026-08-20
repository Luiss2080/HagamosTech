import React, { useState } from 'react';
import CircleParticles from '../../components/fondos/ParticulasCirculares';
import useCarritoStore from '../useCarritoStore';
import ComprobanteModal from './ComprobanteModal';

const PagoModal = ({ isOpen, onClose, onBack }) => {
  const { items, resumen, clearCart } = useCarritoStore();
  const [metodo, setMetodo] = useState('efectivo');
  const [form, setForm] = useState({ nombre: '', telefono: '', ciudad: 'Santa Cruz', direccion: '', notas: '' });
  const [confirmado, setConfirmado] = useState(false);
  const [numeroPedido] = useState(() => 'LC-' + Math.random().toString(36).slice(2, 8).toUpperCase());

  if (!isOpen) return null;

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleConfirmar = (e) => {
    e.preventDefault();
    setConfirmado(true);
  };

  const handleFinalizar = () => {
    clearCart();
    setConfirmado(false);
    setForm({ nombre: '', telefono: '', ciudad: 'Santa Cruz', direccion: '', notas: '' });
    onClose();
  };

  const metodos = [
    { id: 'efectivo', label: 'Efectivo', icon: 'fa-money-bill-wave', desc: 'Pagá al recibir tu pedido' },
    { id: 'qr', label: 'QR Simple', icon: 'fa-qrcode', desc: 'Escaneá el código QR' },
    { id: 'transferencia', label: 'Transferencia', icon: 'fa-building-columns', desc: 'Transferencia bancaria' },
  ];

  return (
    <>
      <div className="fixed inset-0 z-[110]" aria-modal="true">
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity duration-300" onClick={onClose}></div>
        <div className="fixed inset-0 z-[111] overflow-y-auto" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
          <div className="flex min-h-screen items-center justify-center p-4 text-center sm:p-0" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
            <div className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto scrollbar-none transform overflow-hidden rounded-[2.5rem] bg-white text-left shadow-2xl transition-all sm:my-4 animate-modal-pop border border-gray-200">
              <button onClick={onClose} className="absolute top-6 right-6 z-[200] w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-red-50 text-gray-500 hover:text-red-500 transition-all shadow-sm hover:shadow-md border border-gray-200">
                <i className="fas fa-times text-xl"></i>
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
                {/* Left: Resumen del pedido */}
                <div className="relative hidden lg:flex flex-col justify-center gap-6 p-6 lg:p-8 overflow-hidden bg-gradient-to-br from-[#5D3A1F] to-[#452A16]">
                  <div className="absolute inset-0 z-0 pointer-events-none">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FF4D00]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-[420px] h-[420px] bg-black/30 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4"></div>
                    <CircleParticles colorScheme="dark" />
                  </div>

                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                      <button onClick={onBack} className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center transition-colors"><i className="fas fa-arrow-left"></i></button>
                      <div>
                        <p className="text-[9px] font-black text-white/50 uppercase tracking-[0.2em]">Pedido N°</p>
                        <p className="text-white font-black text-lg tracking-wider">{numeroPedido}</p>
                      </div>
                    </div>

                    <h2 className="text-3xl font-black font-heading text-white leading-tight mb-2 drop-shadow-lg">Confirmá tu <span className="text-amber-300">pedido</span></h2>
                    <p className="text-sm text-white/80 font-medium mb-6">Completá tus datos para recibir el mejor sabor de Santa Cruz.</p>

                    <div className="space-y-2 max-h-[240px] overflow-y-auto pr-1 scrollbar-none mb-5">
                      {items.map((item) => (
                        <div key={item.productoId} className="flex items-center gap-3 p-2.5 rounded-xl bg-white/10 border border-white/10">
                          <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0"><img src={item.imagen} alt={item.nombre} className="w-full h-full object-cover" /></div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[12px] font-black text-white truncate">{item.nombre}</p>
                            <p className="text-[9px] text-white/60 font-semibold">x{item.cantidad}</p>
                          </div>
                          <p className="text-[12px] font-black text-amber-300 shrink-0">Bs. {item.precio * item.cantidad}</p>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-white/15 pt-4">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-black text-white/60 uppercase tracking-wider">Subtotal</span>
                        <span className="text-white font-black">Bs. {resumen.total_bs}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black text-white/60 uppercase tracking-wider">Delivery</span>
                        <span className="text-[10px] font-black text-amber-300">A confirmar</span>
                      </div>
                      <div className="border-t border-white/15 my-2"></div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-white uppercase tracking-wider">Total</span>
                        <span className="text-3xl font-black font-heading text-amber-300">Bs. {resumen.total_bs}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Form */}
                <div className="relative flex flex-col justify-center h-full bg-[#FFF6F6] p-5 lg:p-6">
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-10 -right-10 w-64 h-64 bg-[#FF4D00]/10 rounded-full blur-3xl"></div>
                    <CircleParticles colorScheme="light" />
                  </div>

                  <div className="relative z-10 w-full max-w-[540px] mx-auto">
                    <h3 className="text-2xl font-black font-heading text-[#111827] tracking-tight mb-4"><i className="fas fa-truck-fast text-[#FF4D00] mr-2"></i>Datos de Entrega</h3>

                    <form onSubmit={handleConfirmar} className="space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="relative group">
                          <input type="text" name="nombre" value={form.nombre} onChange={handleChange} required className="peer block w-full rounded-xl border-2 border-gray-100 bg-white px-4 pt-5 pb-1.5 pl-12 text-sm font-bold text-[#111827] focus:border-[#FF4D00] focus:ring-4 focus:ring-red-500/10 focus:outline-none transition-all duration-300 placeholder-transparent" placeholder="Nombre" />
                          <label className="absolute top-3.5 left-12 z-10 origin-[0] -translate-y-2.5 scale-75 transform text-[9px] text-gray-400 font-black uppercase tracking-widest duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-[10px] peer-placeholder-shown:font-bold peer-focus:-translate-y-2.5 peer-focus:scale-75 peer-focus:text-[#FF4D00]">Nombre completo</label>
                          <div className="absolute top-0 bottom-0 left-0 flex items-center justify-center w-12 text-gray-400 peer-focus:text-[#FF4D00] transition-colors duration-300"><i className="fas fa-user text-base"></i></div>
                        </div>
                        <div className="relative group">
                          <input type="tel" name="telefono" value={form.telefono} onChange={handleChange} required className="peer block w-full rounded-xl border-2 border-gray-100 bg-white px-4 pt-5 pb-1.5 pl-12 text-sm font-bold text-[#111827] focus:border-[#FF4D00] focus:ring-4 focus:ring-red-500/10 focus:outline-none transition-all duration-300 placeholder-transparent" placeholder="Teléfono" />
                          <label className="absolute top-3.5 left-12 z-10 origin-[0] -translate-y-2.5 scale-75 transform text-[9px] text-gray-400 font-black uppercase tracking-widest duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-[10px] peer-placeholder-shown:font-bold peer-focus:-translate-y-2.5 peer-focus:scale-75 peer-focus:text-[#FF4D00]">Celular</label>
                          <div className="absolute top-0 bottom-0 left-0 flex items-center justify-center w-12 text-gray-400 peer-focus:text-[#FF4D00] transition-colors duration-300"><i className="fas fa-phone-alt text-base"></i></div>
                        </div>
                      </div>

                      <div className="relative group">
                        <input type="text" name="direccion" value={form.direccion} onChange={handleChange} required className="peer block w-full rounded-xl border-2 border-gray-100 bg-white px-4 pt-5 pb-1.5 pl-12 text-sm font-bold text-[#111827] focus:border-[#FF4D00] focus:ring-4 focus:ring-red-500/10 focus:outline-none transition-all duration-300 placeholder-transparent" placeholder="Dirección" />
                        <label className="absolute top-3.5 left-12 z-10 origin-[0] -translate-y-2.5 scale-75 transform text-[9px] text-gray-400 font-black uppercase tracking-widest duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-[10px] peer-placeholder-shown:font-bold peer-focus:-translate-y-2.5 peer-focus:scale-75 peer-focus:text-[#FF4D00]">Dirección de entrega</label>
                        <div className="absolute top-0 bottom-0 left-0 flex items-center justify-center w-12 text-gray-400 peer-focus:text-[#FF4D00] transition-colors duration-300"><i className="fas fa-location-dot text-base"></i></div>
                      </div>

                      <div className="relative group">
                        <textarea name="notas" rows="2" value={form.notas} onChange={handleChange} className="peer block w-full rounded-xl border-2 border-gray-100 bg-white px-4 pt-5 pb-1.5 pl-12 text-sm font-bold text-[#111827] focus:border-[#FF4D00] focus:ring-4 focus:ring-red-500/10 focus:outline-none transition-all duration-300 placeholder-transparent resize-none" placeholder="Notas"></textarea>
                        <label className="absolute top-3.5 left-12 z-10 origin-[0] -translate-y-2.5 scale-75 transform text-[9px] text-gray-400 font-black uppercase tracking-widest duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-[10px] peer-placeholder-shown:font-bold peer-focus:-translate-y-2.5 peer-focus:scale-75 peer-focus:text-[#FF4D00]">Notas (opcional)</label>
                        <div className="absolute top-0 bottom-0 left-0 flex items-center justify-center w-12 text-gray-400 peer-focus:text-[#FF4D00] transition-colors duration-300"><i className="fas fa-pen text-base"></i></div>
                      </div>

                      {/* Métodos de pago */}
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Método de pago</p>
                        <div className="grid grid-cols-3 gap-2">
                          {metodos.map((m) => (
                            <button key={m.id} type="button" onClick={() => setMetodo(m.id)} className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-all ${metodo === m.id ? 'border-[#FF4D00] bg-white shadow-md' : 'border-gray-100 bg-white hover:border-[#FF4D00]/30'}`}>
                              <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-base ${metodo === m.id ? 'bg-[#FF4D00] text-white' : 'bg-[#FFF6F6] text-[#8B4513]'}`}><i className={`fas ${m.icon}`}></i></div>
                              <span className="text-[9px] font-black text-[#111827]">{m.label}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      <button type="submit" className="w-full py-4 rounded-full bg-[#FF4D00] hover:bg-[#CC3D00] text-white font-black text-xs uppercase tracking-[0.15em] shadow-lg shadow-orange-500/20 hover:shadow-xl transition-all flex items-center justify-center gap-3 group">
                        <i className="fas fa-check-circle"></i> Confirmar pedido · Bs. {resumen.total_bs}
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ComprobanteModal
        isOpen={confirmado}
        onClose={handleFinalizar}
        pedido={{
          numero: numeroPedido,
          total: resumen.total_bs,
          nombre: form.nombre,
          metodo: metodos.find(m => m.id === metodo)?.label,
          items: items.length,
        }}
      />
    </>
  );
};

export default PagoModal;
