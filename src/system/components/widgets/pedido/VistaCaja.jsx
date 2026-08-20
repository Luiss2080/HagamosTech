import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { usePedidosStore } from '../usePedidosStore';
import imprimirTicket from './TicketPedido';
import { TituloWeb, Pildora, PanelWeb, BotonAccion, AnimatedNumber, TarjetaPremium } from './ui';

const VistaCaja = ({ onVerMenu }) => {
  const ordenes = usePedidosStore(s => s.ordenes);
  const cobrarOrden = usePedidosStore(s => s.cobrarOrden);
  const enCaja = ordenes.filter(o => o.estado === 'en_caja');
  const pagados = ordenes.filter(o => o.pagado);
  const totalPorCobrar = enCaja.reduce((a, o) => a + o.total, 0);
  const ingresosHoy = pagados.reduce((a, o) => a + o.total, 0);
  const [metodo, setMetodo] = useState('efectivo');

  const metodos = [
    { id: 'efectivo', label: 'Efectivo', icon: 'fas fa-money-bill-wave', cls: 'border-emerald-400 text-emerald-600' },
    { id: 'tarjeta', label: 'Tarjeta', icon: 'fas fa-credit-card', cls: 'border-sky-400 text-sky-600' },
    { id: 'qr', label: 'QR Simple', icon: 'fas fa-qrcode', cls: 'border-slate-400 text-slate-600' }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-5">
      <TituloWeb titulo="Caja y" palabra="cobros" sub="Cobra los pedidos enviados por el mesero, imprime el comprobante y envía la comanda al horno." />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <TarjetaPremium gradiente="from-[#D97706] to-[#B45309]">
          <div className="rounded-[14px] p-4 text-center bg-white border border-[#D97706]/10">
            <div className="w-9 h-9 mx-auto mb-1.5 rounded-xl bg-orange-50 border border-orange-200 text-[#D97706] flex items-center justify-center"><i className="fas fa-hand-holding-dollar"></i></div>
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Por cobrar</p>
            <p className="text-lg font-black text-[#111827]"><AnimatedNumber value={totalPorCobrar} prefix="Bs. " /></p>
          </div>
        </TarjetaPremium>
        <TarjetaPremium gradiente="from-[#8B4513] to-[#5D3A1F]">
          <div className="rounded-[14px] p-4 text-center bg-white border border-[#8B4513]/10">
            <div className="w-9 h-9 mx-auto mb-1.5 rounded-xl bg-[#8B4513]/10 border border-[#8B4513]/20 text-[#8B4513] flex items-center justify-center"><i className="fas fa-sack-dollar"></i></div>
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Ingresos hoy</p>
            <p className="text-lg font-black text-[#111827]"><AnimatedNumber value={ingresosHoy} prefix="Bs. " /></p>
          </div>
        </TarjetaPremium>
        <TarjetaPremium gradiente="from-[#FF4D00] to-[#D93D00]">
          <div className="rounded-[14px] p-4 text-center bg-white border border-[#FF4D00]/10">
            <div className="w-9 h-9 mx-auto mb-1.5 rounded-xl bg-red-50 border border-red-200 text-[#FF4D00] flex items-center justify-center"><i className="fas fa-receipt"></i></div>
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">En caja</p>
            <p className="text-lg font-black text-[#111827]">{enCaja.length} pedidos</p>
          </div>
        </TarjetaPremium>
      </div>

      <div className="bg-white/40 backdrop-blur rounded-[24px] border-2 border-dashed border-gray-200 shadow-sm p-4 sm:p-5 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FF4D00] via-[#5D3A1F] to-[#FF4D00]"></div>
        <div className="flex items-center gap-2 mb-4">
          <span className="w-8 h-8 rounded-xl bg-orange-50 border border-orange-200 text-[#FF4D00] flex items-center justify-center"><i className="fas fa-wallet text-sm"></i></span>
          <h3 className="text-lg font-black font-heading text-[#111827]">Pedidos por cobrar</h3>
          <span className="ml-auto min-w-[22px] h-[22px] px-1.5 rounded-full bg-gradient-to-r from-[#FF4D00] to-[#D93D00] text-white text-[11px] font-black flex items-center justify-center shadow-md">{enCaja.length}</span>
        </div>
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-5"></div>

        {enCaja.length === 0 ? (
          <div className="py-12 text-center text-gray-400 bg-white/50 rounded-xl">
            <i className="fas fa-cash-register text-4xl block mb-3 opacity-40"></i>
            <p className="text-xs font-bold mb-4">No hay pedidos esperando cobro.</p>
            <BotonAccion icon="fas fa-plus" onClick={onVerMenu}>Tomar pedido</BotonAccion>
          </div>
        ) : (
          <div className="space-y-4">
            {enCaja.map(o => (
              <motion.div key={o.codigo} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} className="relative bg-white rounded-2xl border border-gray-200 p-4 shadow-sm hover:shadow-lg transition-shadow overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FF4D00] via-[#5D3A1F] to-[#FF4D00]"></div>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2.5 mb-1.5">
                      <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF4D00] to-[#D93D00] text-white flex items-center justify-center font-black text-sm shadow-md">{o.mesa}</span>
                      <div>
                        <p className="text-sm font-black text-[#111827] leading-tight">{o.codigo}</p>
                        <p className="text-[9px] font-black uppercase tracking-widest text-gray-400">Mesa {o.mesa}</p>
                      </div>
                    </div>
                    <div className="mt-2 space-y-0.5">
                      {o.items.map((it, i) => (
                        <p key={i} className="text-[11px] font-bold text-gray-600">
                          <span className="text-[#FF4D00] font-black">{it.cantidad}×</span> {it.nombre}
                          {it.quitar && it.quitar.length > 0 && <span className="text-red-500 font-bold"> (sin {it.quitar.join(', ')})</span>}
                        </p>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col items-start md:items-end gap-2 shrink-0">
                    <p className="text-2xl font-black text-[#FF4D00]"><AnimatedNumber value={o.total} prefix="Bs. " /></p>
                    <div className="flex items-center gap-2">
                      {metodos.map(mt => (
                        <button key={mt.id} onClick={() => setMetodo(mt.id)}
                          className={`px-2.5 py-1.5 rounded-lg border-2 text-[9px] font-black uppercase tracking-wide cursor-pointer transition-all ${metodo === mt.id ? `${mt.cls} bg-white scale-105 shadow-md` : 'border-gray-200 text-gray-400 hover:border-gray-300'}`}>
                          <i className={`${mt.icon} mr-1`}></i>{mt.label}
                        </button>
                      ))}
                    </div>
                    <div className="flex gap-2 w-full mt-1">
                      <BotonAccion icon="fas fa-print" variante="marron" onClick={() => imprimirTicket(o)}>Imprimir</BotonAccion>
                      <BotonAccion icon="fas fa-fire-burner" variante="marronClaro" onClick={() => cobrarOrden(o.codigo, metodo)}>Cobrar y horno</BotonAccion>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {pagados.length > 0 && (
        <div className="bg-white/40 backdrop-blur rounded-[24px] border-2 border-dashed border-gray-200 shadow-sm p-4 sm:p-5 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#8B4513] via-[#5D3A1F] to-[#8B4513]"></div>
          <div className="flex items-center gap-2 mb-4">
            <span className="w-8 h-8 rounded-xl bg-orange-50 border border-orange-200 text-[#8B4513] flex items-center justify-center"><i className="fas fa-check-double text-sm"></i></span>
            <h3 className="text-lg font-black font-heading text-[#111827]">Cobros registrados hoy</h3>
          </div>
          <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-4"></div>
          <div className="overflow-x-auto bg-white rounded-xl border border-gray-200 shadow-sm p-1">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-gray-100 text-gray-400 uppercase text-[9px] font-black tracking-widest bg-gray-50/50">
                  <th className="px-4 py-3 rounded-tl-lg">Pedido</th>
                  <th className="px-4 py-3">Mesa</th>
                  <th className="px-4 py-3">Método</th>
                  <th className="px-4 py-3 text-right">Total</th>
                  <th className="px-4 py-3 text-right rounded-tr-lg">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {pagados.slice(0, 10).map(o => (
                  <tr key={o.codigo} className="font-bold text-gray-700 hover:bg-orange-50/40 transition-colors">
                    <td className="px-4 py-3">{o.codigo}</td>
                    <td className="px-4 py-3">Mesa {o.mesa}</td>
                    <td className="px-4 py-3 uppercase text-[10px]">{o.metodoPago}</td>
                    <td className="px-4 py-3 text-right text-[#FF4D00] font-black">Bs. {o.total.toFixed(2)}</td>
                    <td className="px-4 py-3 text-right"><Pildora className="bg-[#8B4513]/10 text-[#8B4513] border-[#8B4513]/20">{o.estado}</Pildora></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default VistaCaja;