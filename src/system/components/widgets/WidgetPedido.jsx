import React from 'react';
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from 'framer-motion';
import FondoSystem from '../../../components/fondos/FondoSystem';
import { usePedidosStore } from './usePedidosStore';
import ServicioSalon from './pedido/ServicioSalon';

const WidgetPedido = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const ordenes = usePedidosStore(s => s.ordenes);

  const badge = ordenes.filter(o => o.estado !== 'entregado').length;

  return (
    <>
      <div className="fixed font-montserrat flex items-end justify-end z-[90]" style={{ bottom: '20px', right: '20px' }}>
        <AnimatePresence>
          {!isOpen && (
            <motion.button
              key="boton-pedido"
              initial={{ opacity: 0, scale: 0.5, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5, y: 20 }}
              whileHover={{ scale: 1.06, y: -4 }}
              whileTap={{ scale: 0.94 }}
              onClick={() => setIsOpen(true)}
              className="relative flex items-center justify-center w-[62px] h-[62px] bg-gradient-to-br from-[#E95A0C] to-orange-700 text-white rounded-[1.3rem] shadow-[0_10px_30px_-5px_rgba(233,90,12,0.55)] cursor-pointer border-none z-50 group transition-all"
              title="Servicio de Mesa"
            >
              <i className="fas fa-utensils text-[26px] group-hover:scale-110 transition-transform"></i>
              {badge > 0 && (
                <span className="absolute -top-2 -right-2 min-w-[24px] h-[24px] px-1.5 rounded-full bg-red-600 text-white text-[12px] font-black flex items-center justify-center border-2 border-white shadow-lg z-[60]">
                  {badge > 99 ? '+99' : badge}
                </span>
              )}
              {badge > 0 && (
                <span className="absolute -top-2 -right-2 h-6 w-6">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-60"></span>
                </span>
              )}
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="servicio-pantalla"
            initial={{ opacity: 0, scale: 0.96, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 30 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[300] bg-[#FFF6F6] dark:bg-[#05050a] flex flex-col font-montserrat overflow-hidden"
          >
            <FondoSystem hideWaves={false} />
            <div className="relative z-10 flex-1 flex flex-col min-h-0">
              <ServicioSalon onClose={() => setIsOpen(false)} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default WidgetPedido;