import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from 'framer-motion';
import { usePedidosStore } from '../usePedidosStore';
import useAuthStore from '../../../../store/useAutenticacionStore';
import FondoSystem from "../../../../components/fondos/FondoSystem";
import Bienvenida from './Bienvenida';
import VistaMesas from './VistaMesas';
import VistaCaja from './VistaCaja';
import MenuPedido from './MenuPedido';
import RevisarPago from './RevisarPago';
import CalendarioModal from '../shared/CalendarioModal';

const PantallaPedido = ({ onIrCaja }) => {
  const [vista, setVista] = useState('menu');
  const carrito = usePedidosStore(s => s.carrito);
  const total = carrito.reduce((a, i) => a + i.precio * i.cantidad, 0);

  return (
    <AnimatePresence mode="wait">
      <motion.div key={vista} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25 }}>
        {vista === 'menu' ? (
          <MenuPedido onRevisar={() => setVista('revisar')} />
        ) : (
          <RevisarPago total={total} onVolver={() => setVista('menu')} onIrCaja={onIrCaja} />
        )}
      </motion.div>
    </AnimatePresence>
  );
};

const ServicioSalon = ({ onClose }) => {
  const [vista, setVista] = useState('bienvenida');
  const [tab, setTab] = useState('mesas');
  const [isOpenCalendario, setIsOpenCalendario] = useState(false);
  const user = useAuthStore(s => s.user);
  
  const mesaSeleccionada = usePedidosStore(s => s.mesaSeleccionada);
  const ordenes = usePedidosStore(s => s.ordenes);
  const mesas = usePedidosStore(s => s.mesas);
  const mesaEstado = usePedidosStore(s => s.mesaEstado);

  const enCaja = ordenes.filter(o => o.estado === 'en_caja');
  const enCocina = ordenes.filter(o => ['pendiente', 'preparacion'].includes(o.estado));
  const libres = mesas.filter(m => mesaEstado(m) === 'libre').length;
  const ocupadas = mesas.length - libres;
  void ocupadas;

  const TABS = [
    { id: 'mesas', label: 'Mesas', icon: 'fas fa-chair' },
    { id: 'menu', label: 'Tomar Pedido', icon: 'fas fa-clipboard-list' },
    { id: 'caja', label: 'Caja', icon: 'fas fa-cash-register', badge: enCaja.length }
  ];

  const tomarPedido = (mesa) => {
    usePedidosStore.getState().seleccionarMesa(mesa);
    setTab('menu');
  };

  if (vista === 'bienvenida') {
    return (
      <div className="relative flex-1 overflow-y-auto">
        <FondoSystem hideWaves={false} />
        <div className="relative z-10 p-4 sm:p-6 min-h-full flex flex-col">
          <Bienvenida onComenzar={() => { setVista('salon'); setTab('mesas'); }} />
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col h-full overflow-hidden bg-[#FFF6F6] dark:bg-[#05050a] font-montserrat">
      <FondoSystem hideWaves={false} />

      {/* Cabecera Premium (Estilo Horno) */}
      <div className="relative bg-gradient-to-r from-[#8B4513] to-[#5D3A1F] px-4 sm:px-6 py-4 shrink-0 z-20 shadow-lg">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-black/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#111827]/20 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4"></div>
        </div>
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-3 max-w-7xl mx-auto">
          
          <div className="flex items-center gap-3">
            <span className="w-12 h-12 rounded-2xl bg-white/15 border border-white/30 backdrop-blur text-white flex items-center justify-center text-2xl shadow-lg">
              <i className="fas fa-utensils"></i>
            </span>
            <div>
              <h2 className="text-white font-black text-lg uppercase tracking-wide leading-tight font-heading">Servicio de Mesa</h2>
              <p className="text-white/85 text-[11px] font-bold">Gestión de Órdenes · {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Tabs estilo glassmorphism segmentados */}
            <div className="flex items-center gap-1 p-1 bg-white/10 rounded-[16px] border border-white/20 backdrop-blur mr-2">
              {TABS.map(t => (
                <button key={t.id} onClick={() => setTab(t.id)}
                  className={`relative px-3 py-1.5 rounded-[12px] text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer flex items-center gap-2 ${
                    tab === t.id ? 'bg-white text-[#8B4513] shadow-md' : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}>
                  <i className={`${t.icon} text-sm`}></i>
                  <span className="hidden sm:inline">{t.label}</span>
                  {t.badge > 0 && (
                    <span className="min-w-[18px] h-[18px] px-1 rounded-full bg-[#FF4D00] text-white text-[9px] flex items-center justify-center ml-1">
                      {t.badge}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Badges de estado en glassmorphism */}
            <span className="flex items-center gap-2 text-white bg-white/15 border border-white/30 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider backdrop-blur">
              <i className="fas fa-chair text-white/70 text-sm"></i> {libres} Libres
            </span>
            <span className="flex items-center gap-2 text-white bg-white/15 border border-white/30 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider backdrop-blur">
              <i className="fas fa-fire-burner text-[#FF4D00] text-sm"></i> {enCocina.length} Horno
            </span>
            
            <button onClick={() => setIsOpenCalendario(true)} className="w-10 h-10 rounded-xl bg-white/15 hover:bg-white/25 text-white border border-white/30 text-base transition-colors cursor-pointer flex items-center justify-center backdrop-blur shadow-sm ml-2">
              <i className="far fa-calendar-alt"></i>
            </button>
            <button onClick={onClose} className="w-10 h-10 rounded-xl bg-white/15 hover:bg-red-500 text-white border border-white/30 text-base transition-colors cursor-pointer flex items-center justify-center backdrop-blur shadow-sm">
              <i className="fas fa-times"></i>
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpenCalendario && <CalendarioModal isOpen={isOpenCalendario} onClose={() => setIsOpenCalendario(false)} userId={user?.id} />}
      </AnimatePresence>

      {/* Contenido principal de las pestañas */}
      <div className="relative z-10 flex-1 overflow-y-auto px-4 sm:px-6 pb-8">
        <div className="max-w-7xl mx-auto h-full">
          <AnimatePresence mode="wait">
            <motion.div key={tab} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.25 }}>
              {tab === 'mesas' && <VistaMesas onTomarPedido={tomarPedido} />}

              {tab === 'menu' && (
                !mesaSeleccionada ? (
                  <div className="min-h-[400px] flex flex-col items-center justify-center text-center py-16 bg-white/50 backdrop-blur rounded-[32px] mt-4 border border-white">
                    <span className="w-24 h-24 rounded-full bg-orange-50 text-[#FF4D00] flex items-center justify-center text-4xl mb-6 shadow-xl shadow-[#FF4D00]/10 border border-orange-100">
                      <i className="fas fa-chair"></i>
                    </span>
                    <h2 className="text-3xl font-black text-[#8B4513] leading-tight mb-3">Primero elige una <span className="text-[#FF4D00]">mesa</span></h2>
                    <p className="text-gray-500 font-medium text-base mb-8 max-w-md">Selecciona la mesa del cliente en la pestaña de Mesas para empezar a armar su pedido de forma rápida.</p>
                    <button onClick={() => setTab('mesas')} className="px-8 py-4 rounded-full bg-gradient-to-r from-[#FF4D00] to-[#E95A0C] text-white font-black text-xs uppercase tracking-widest shadow-lg shadow-[#FF4D00]/30 flex items-center gap-3 hover:scale-105 transition-all">
                      <i className="fas fa-th-large text-sm"></i> Ver mesas disponibles
                    </button>
                  </div>
                ) : (
                  <div className="mt-4"><PantallaPedido onIrCaja={() => setTab('caja')} /></div>
                )
              )}

              {tab === 'caja' && <div className="mt-4"><VistaCaja onVerMenu={() => setTab('menu')} /></div>}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ServicioSalon;