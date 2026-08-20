import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { usePedidosStore, formatearHora } from '../usePedidosStore';
import { PanelWeb, BotonPrincipal, BotonAccion, Pildora } from './ui';

const METODOS = [
  { id: 'efectivo', label: 'Efectivo', icon: 'fas fa-money-bill-wave' },
  { id: 'tarjeta', label: 'Tarjeta', icon: 'fas fa-credit-card' },
  { id: 'qr', label: 'QR Simple', icon: 'fas fa-qrcode' }
];

const RevisarPago = ({ total, onVolver, onIrCaja }) => {
  const carrito = usePedidosStore(s => s.carrito);
  const mesa = usePedidosStore(s => s.mesaSeleccionada);
  const enviarPedido = usePedidosStore(s => s.enviarPedido);
  const resetearPedido = usePedidosStore(s => s.resetearPedido);

  const [metodoPago, setMetodoPago] = useState('efectivo');
  const [enviado, setEnviado] = useState(null);

  const aHorno = () => setEnviado({ orden: enviarPedido({ metodoPago, aCaja: false }), aCaja: false });
  const aCaja = () => setEnviado({ orden: enviarPedido({ metodoPago, aCaja: true }), aCaja: true });

  const nuevoPedido = () => {
    resetearPedido();
    setMetodoPago('efectivo');
    setEnviado(null);
    onVolver();
  };

  if (enviado) {
    const orden = enviado.orden;
    return (
      <div className="min-h-[420px] flex items-center justify-center py-8">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center text-center max-w-md mx-auto">
          <div className={`w-24 h-24 rounded-full ${enviado.aCaja ? 'bg-[#8B4513]' : 'bg-[#FF4D00]'} text-white flex items-center justify-center text-4xl shadow-2xl mb-5`}>
            <i className={enviado.aCaja ? 'fas fa-wallet' : 'fas fa-check'}></i>
          </div>
          <h2 className="text-2xl font-black font-heading text-[#8B4513] uppercase tracking-wide mb-2">
            {enviado.aCaja ? 'Enviado a caja' : 'Enviado al horno'}
          </h2>
          <p className="text-gray-500 font-medium text-sm mb-6">
            {enviado.aCaja ? 'El pedido está en caja esperando el cobro.' : 'La comanda ya está en la pantalla del horno.'}
          </p>

          <div className="grid grid-cols-3 gap-3 w-full max-w-sm mb-6">
            {[
              { label: 'Pedido', val: orden?.codigo, cls: 'text-[#FF4D00]' },
              { label: 'Mesa', val: `Mesa ${orden?.mesa}`, cls: 'text-[#111827]' },
              { label: 'Hora', val: formatearHora(orden?.creadoEn), cls: 'text-[#111827]' }
            ].map(c => (
              <div key={c.label} className="rounded-xl bg-white border border-gray-200 px-2 py-3 text-center shadow-sm">
                <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-1">{c.label}</p>
                <p className={`text-sm font-black ${c.cls}`}>{c.val}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2.5 mb-6">
            <Pildora className="bg-orange-50 text-[#FF4D00] border-orange-200"><i className="fas fa-circle text-[6px] text-[#FF4D00]"></i> Pendiente en cocina</Pildora>
            <Pildora className="bg-white text-gray-500 border-gray-200"><i className="fas fa-money-bill-wave text-[10px] text-[#FF4D00]"></i> {orden?.metodoPago}</Pildora>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <BotonAccion icon="fas fa-chair" variante="marron" onClick={nuevoPedido}>Nuevo pedido</BotonAccion>
            {enviado.aCaja && (
              <BotonAccion icon="fas fa-cash-register" variante="naranja" onClick={onIrCaja}>Ir a caja</BotonAccion>
            )}
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      <PanelWeb>
        <div className="relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FF4D00] via-[#5D3A1F] to-[#FF4D00]"></div>
          <div className="p-4 sm:p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="inline-flex items-center gap-2">
                <span className="w-8 h-8 rounded-xl bg-red-50 border border-red-200 text-[#FF4D00] flex items-center justify-center"><i className="fas fa-list-check text-sm"></i></span>
                <h3 className="text-lg font-black font-heading text-[#111827]">Revisar pedido</h3>
              </div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-gray-200 text-[9px] font-black uppercase tracking-widest text-gray-500">
                <i className="fas fa-chair text-[#FF4D00]"></i> Mesa {mesa}
              </span>
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-4"></div>

            <div className="space-y-2">
              {carrito.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between gap-3 p-2.5 rounded-xl bg-red-50/40 border border-red-100">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-10 h-10 rounded-xl overflow-hidden bg-white border border-gray-200 shrink-0">
                      <img src={item.imagen} alt={item.nombre} className="w-full h-full object-cover" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[12px] font-black text-[#111827] truncate">{item.nombre} <span className="text-gray-400 font-bold">×{item.cantidad}</span></p>
                      {item.quitar && item.quitar.length > 0 && <p className="text-[9px] text-red-500 font-bold">Sin: {item.quitar.join(', ')}</p>}
                    </div>
                  </div>
                  <span className="text-[13px] font-black text-[#FF4D00] whitespace-nowrap">Bs. {(item.precio * item.cantidad).toFixed(2)}</span>
                </div>
              ))}
              <div className="flex items-center justify-between px-2.5 py-2 rounded-xl bg-[#FFF5EC] border border-orange-200/60">
                <span className="text-sm font-black uppercase tracking-wide text-gray-500">TOTAL</span>
                <span className="text-2xl font-black text-[#FF4D00]">Bs. {total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </PanelWeb>

      <PanelWeb>
        <div className="relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FF4D00] via-[#5D3A1F] to-[#FF4D00]"></div>
          <div className="p-4 sm:p-5">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-8 h-8 rounded-xl bg-red-50 border border-red-200 text-[#FF4D00] flex items-center justify-center"><i className="fas fa-wallet text-sm"></i></span>
              <h3 className="text-lg font-black font-heading text-[#111827]">Método de pago</h3>
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-4"></div>
            <div className="grid grid-cols-3 gap-3">
              {METODOS.map(m => (
                <button key={m.id} onClick={() => setMetodoPago(m.id)}
                  className={`p-3 rounded-xl border-2 flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                    metodoPago === m.id ? 'border-[#FF4D00] bg-orange-50 shadow-md scale-[1.02]' : 'border-gray-200 bg-white hover:border-[#FF4D00]/40'
                  }`}>
                  <i className={`${m.icon} text-xl ${metodoPago === m.id ? 'text-[#FF4D00]' : 'text-gray-400'}`}></i>
                  <span className={`text-[10px] font-black uppercase tracking-wide ${metodoPago === m.id ? 'text-[#111827]' : 'text-gray-500'}`}>{m.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </PanelWeb>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <BotonAccion icon="fas fa-fire-burner" variante="marronClaro" onClick={aHorno} className="py-4">Cobrar y enviar a horno</BotonAccion>
        <BotonAccion icon="fas fa-cash-register" variante="naranja" onClick={aCaja} className="py-4">Enviar a caja</BotonAccion>
      </div>
      <button onClick={onVolver} className="w-full py-2.5 text-[10px] font-black uppercase tracking-wider text-gray-400 hover:text-[#FF4D00] cursor-pointer">
        <i className="fas fa-arrow-left mr-1.5"></i> Volver al menú
      </button>
    </div>
  );
};

export default RevisarPago;