import React from 'react';
import { motion } from 'framer-motion';
import { usePedidosStore } from '../usePedidosStore';
import { TituloWeb, TarjetaPremium, Pildora } from './ui';

const estadosMesa = {
  libre: { label: 'Mesa Libre', cls: 'bg-gray-100 text-gray-500', dot: 'text-gray-400', topBar: 'bg-gray-300' },
  ocupada: { label: 'Ocupada', cls: 'bg-orange-50 text-[#FF4D00]', dot: 'text-[#FF4D00]', topBar: 'bg-[#FF4D00]' },
  en_caja: { label: 'En caja', cls: 'bg-[#8B4513]/10 text-[#8B4513]', dot: 'text-[#8B4513]', topBar: 'bg-[#8B4513]' }
};

const VistaMesas = ({ onTomarPedido }) => {
  const mesas = usePedidosStore(s => s.mesas);
  const mesaEstado = usePedidosStore(s => s.mesaEstado);
  const ordenes = usePedidosStore(s => s.ordenes);

  return (
    <div className="max-w-7xl mx-auto pt-6">
      <div className="mb-8">
        <TituloWeb titulo="Ubica al cliente en su" palabra="mesa" sub="Selecciona la mesa donde está sentado el cliente para empezar a armar su pedido o ver la comanda actual." />
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-5">
        {mesas.map((m, i) => {
          const estado = mesaEstado(m);
          const conf = estadosMesa[estado] || estadosMesa.libre;
          const orden = ordenes.find(o => o.mesa === m && o.estado !== 'entregado');
          
          return (
            <motion.div key={m} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <TarjetaPremium highlightTop={conf.topBar} className={`group cursor-pointer border-2 transition-all shadow-[0_10px_30px_rgba(139,69,19,0.05)] ${estado === 'ocupada' ? 'border-[#FF4D00]/20 hover:border-[#FF4D00] hover:shadow-[0_10px_40px_rgba(255,77,0,0.15)]' : estado === 'en_caja' ? 'border-[#8B4513]/20 hover:border-[#8B4513] hover:shadow-[0_10px_40px_rgba(139,69,19,0.15)]' : 'border-transparent hover:border-gray-200'} rounded-[32px]`}>
                <button onClick={() => onTomarPedido(m)} className="w-full text-left p-6 flex flex-col h-full relative">
                  
                  {/* Etiqueta Superior */}
                  <div className="flex justify-end mb-4">
                    <Pildora className={`${conf.cls}`}><i className={`fas fa-circle text-[8px] ${conf.dot} ${estado === 'ocupada' ? 'animate-pulse' : ''}`}></i>{conf.label}</Pildora>
                  </div>

                  {/* Icono y Número */}
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-12 h-12 rounded-[14px] bg-[#FF4D00]/10 text-[#FF4D00] flex items-center justify-center text-xl group-hover:bg-[#FF4D00] group-hover:text-white transition-colors">
                      <i className="fas fa-chair"></i>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Mesa</p>
                      <p className="text-2xl font-black text-[#8B4513] leading-none">{m}</p>
                    </div>
                  </div>

                  {/* Resumen del Pedido (si hay) */}
                  <div className="flex-1">
                    {orden ? (
                      <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                        <p className="text-[10px] font-black text-gray-500 uppercase tracking-wider mb-1">{orden.codigo}</p>
                        <p className="text-lg font-black text-[#111827]">Bs. {orden.total.toFixed(2)}</p>
                      </div>
                    ) : (
                      <div className="bg-orange-50/50 rounded-xl p-3 border border-orange-50 border-dashed h-[66px] flex items-center justify-center">
                        <p className="text-[10px] font-black text-orange-300 uppercase tracking-widest text-center">Sin pedidos<br/>en curso</p>
                      </div>
                    )}
                  </div>

                  {/* Acción Hover */}
                  <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-[9px] font-black uppercase tracking-widest text-gray-400 group-hover:text-[#FF4D00] transition-colors">
                      {estado === 'libre' ? 'Nuevo Pedido' : 'Ver Comanda'}
                    </span>
                    <i className="fas fa-arrow-right text-[#FF4D00] opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-xs"></i>
                  </div>
                </button>
              </TarjetaPremium>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default VistaMesas;