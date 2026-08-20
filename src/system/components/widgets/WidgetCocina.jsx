import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion, useAnimation } from 'framer-motion';
import FondoSystem from '../../../components/fondos/FondoSystem';
import { usePedidosStore, formatearTiempo, formatearHora } from './usePedidosStore';
import useAuthStore from '../../../store/useAutenticacionStore';
import InicioSesionModal from '../../../components/Modales/InicioSesionModal';
import CalendarioModal from './shared/CalendarioModal';
import { COLUMNAS } from './cocina/constants';
import { TarjetaOrden, FlamaAnimada, VentiladorHorno } from './cocina/TarjetaOrden';

const EfectoCalor = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[24px] opacity-10 mix-blend-overlay z-0">
    <div className="absolute top-0 left-1/4 w-1/2 h-full bg-gradient-to-t from-transparent via-[#FF4D00] to-transparent animate-[rise_4s_infinite_linear]"></div>
    <style>{`
      @keyframes rise {
        0% { transform: translateY(100%) scale(1); opacity: 0; }
        50% { opacity: 1; }
        100% { transform: translateY(-100%) scale(1.5); opacity: 0; }
      }
    `}</style>
  </div>
);

// --- TOAST COMPONENT ---
const ToastContainer = ({ toasts }) => (
  <div className="fixed top-6 right-6 z-[400] flex flex-col gap-3 pointer-events-none">
    <AnimatePresence>
      {toasts.map(t => (
        <motion.div key={t.id}
          initial={{ opacity: 0, x: 50, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 50, scale: 0.95 }}
          className="bg-white px-4 py-3.5 rounded-2xl shadow-xl flex items-center gap-4 w-[320px] border border-[#8B4513]/10 relative overflow-hidden"
        >
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#FF4D00]"></div>
          <span className="w-10 h-10 rounded-full bg-orange-50 text-[#FF4D00] flex items-center justify-center text-lg shadow-sm border border-orange-100">
            <i className={t.icon}></i>
          </span>
          <div className="flex-1">
            <p className="text-sm font-black text-[#5D3A1F] leading-tight mb-0.5">{t.title}</p>
            <p className="text-xs text-gray-500 font-semibold leading-tight">{t.msg}</p>
          </div>
        </motion.div>
      ))}
    </AnimatePresence>
  </div>
);




// --- VISTA BIENVENIDA (ESTILO PANTALLA CARGA) ---
const StepChip = ({ icon, label }) => (
  <div className="flex flex-col items-center gap-1.5 opacity-100 z-10 relative">
    <div className="w-12 h-12 rounded-2xl flex items-center justify-center border transition-all duration-500 bg-white/80 border-[#FF4D00]/20 shadow-[0_4px_15px_rgba(255,77,0,0.15)] backdrop-blur-sm">
      <i className={`fas ${icon} text-lg text-[#FF4D00] drop-shadow-sm`} />
    </div>
    <span className="text-[9px] font-black uppercase tracking-widest text-[#5D3A1F]">{label}</span>
  </div>
);

const VistaBienvenida = ({ onContinuar }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative z-10 flex flex-col items-center justify-center h-full w-full mx-auto px-4 overflow-hidden">
    
    <style>{`
      @keyframes lcCardIn {
        from{ opacity:0; transform:scale(.94) translateY(20px); }
        to  { opacity:1; transform:scale(1) translateY(0); }
      }
      @keyframes lcSteam {
        0%   { opacity:.6; transform:translateY(0) scaleX(1); }
        50%  { opacity:.3; transform:translateY(-60px) scaleX(1.4); }
        100% { opacity:0;  transform:translateY(-120px) scaleX(.7); }
      }
      @keyframes lcPing {
        0%  { transform:scale(1);   opacity:.75; }
        70% { transform:scale(2.4); opacity:0;   }
        100%{ opacity:0; }
      }
      @keyframes lcLogoFloat {
        0%,100% { transform:translateY(0px); filter:drop-shadow(0 15px 30px rgba(255,77,0,0.3)); }
        50%      { transform:translateY(-15px); filter:drop-shadow(0 25px 40px rgba(255,77,0,0.5)); }
      }
      .lc-logo   { animation:lcLogoFloat 4s ease-in-out infinite; }
      .lc-card-in{ animation:lcCardIn .8s cubic-bezier(.34,1.56,.64,1) both; }
    `}</style>

    {/* Humo animado detrás del logo */}
    <div className="absolute z-0" style={{ left:'50%', top:'35%', transform:'translateX(-50%)', width:300 }}>
      {[10,30,50,70,90].map((x, i) => (
        <div key={i} className="absolute bottom-0 rounded-full blur-[4px]"
          style={{
            left:`${x}%`, width:6, height:120,
            background:'linear-gradient(to top, rgba(255,77,0,0.15), transparent)',
            animation:`lcSteam ${3+i*0.4}s ease-out ${i*0.6}s infinite`,
          }}
        />
      ))}
    </div>

    {/* Live badge "Abriendo la Cocina" */}
    <div className="lc-card-in mb-8 inline-flex items-center gap-3 px-5 py-2.5 rounded-full relative z-10"
      style={{
        background:'rgba(255,255,255,0.85)', backdropFilter:'blur(12px)',
        border:'2px solid rgba(255,77,0,0.25)',
        boxShadow:'0 6px 20px rgba(255,77,0,0.15)',
        animationDelay:'.1s',
      }}
    >
      <span className="relative flex w-3 h-3">
        <span className="absolute inset-0 rounded-full bg-[#FF4D00]" style={{ animation:'lcPing 1.2s cubic-bezier(0,0,.2,1) infinite' }} />
        <span className="relative w-3 h-3 rounded-full bg-[#FF4D00]" />
      </span>
      <i className="fas fa-fire-burner text-[#FF4D00] text-sm" />
      <span className="text-[11px] font-black uppercase tracking-[0.15em] text-[#5D3A1F]">Abriendo el Horno</span>
    </div>

    {/* Logo principal Flotante */}
    <div className="lc-logo lc-card-in mb-10 relative z-10" style={{ animationDelay:'.2s' }}>
      <img
        src="/img/02_Logos/LogoHeader.png"
        alt="HagamosTech"
        className="h-32 sm:h-40 w-auto object-contain"
      />
    </div>

    {/* Descripción Premium */}
    <div className="lc-card-in mb-12 max-w-lg text-center relative z-10" style={{ animationDelay:'.3s' }}>
      <p className="text-lg font-bold text-[#5D3A1F]/80 leading-relaxed mb-5">
        Todo listo para hornear con ingredientes 100% bolivianos,
        <span className="text-[#FF4D00] font-black"> receta artesanal </span>
        y el toque único que nos hace especiales.
      </p>
      
      {/* Indicadores visuales de paso */}
      <div className="flex items-center justify-center gap-2 mt-4 relative">
        <div className="absolute top-1/2 left-4 right-4 h-1 bg-[#FF4D00]/15 -translate-y-1/2 rounded-full z-0"></div>
        <StepChip icon="fa-wheat-awn" label="Masa" />
        <div className="w-12"></div>
        <StepChip icon="fa-mortar-pestle" label="Relleno" />
        <div className="w-12"></div>
        <StepChip icon="fa-fire" label="Horno" />
        <div className="w-12"></div>
        <StepChip icon="fa-star" label="¡Lista!" />
      </div>
    </div>

    {/* Botón de Entrada (Pulsa) */}
    <motion.button 
      whileHover={{ scale: 1.05 }} 
      whileTap={{ scale: 0.95 }} 
      onClick={onContinuar} 
      className="lc-card-in relative z-10 bg-[#FF4D00] text-white px-14 py-5 rounded-full font-black text-sm uppercase tracking-[0.2em] shadow-2xl shadow-[#FF4D00]/50 flex items-center gap-4 transition-colors"
      style={{ animationDelay:'.5s' }}
    >
      Entrar al Panel de Control <i className="fas fa-chevron-right"></i>
    </motion.button>
    
  </motion.div>
);


const WidgetCocina = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [vista, setVista] = useState('welcome'); 
  const [ahora, setAhora] = useState(0);
  const [arrastrando, setArrastrando] = useState(null);
  const [overCol, setOverCol] = useState(null);
  const [toasts, setToasts] = useState([]);
  
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);

  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const user = useAuthStore(state => state.user);

  const ordenes = usePedidosStore(s => s.ordenes);
  const iniciarPreparacion = usePedidosStore(s => s.iniciarPreparacion);
  const marcarListo = usePedidosStore(s => s.marcarListo);
  const marcarEntregado = usePedidosStore(s => s.marcarEntregado);
  const anularOrden = usePedidosStore(s => s.anularOrden);
  const moverEstado = usePedidosStore(s => s.moverEstado);

  const badge = ordenes.filter(o => o.estado === 'pendiente' || o.estado === 'preparacion').length;
  const pendientes = ordenes.filter(o => o.estado === 'pendiente');
  const enPreparacion = ordenes.filter(o => o.estado === 'preparacion');
  const listos = ordenes.filter(o => o.estado === 'listo');

  useEffect(() => {
    if (!isOpen || vista !== 'dashboard') return;
    const tick = () => setAhora(Date.now());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [isOpen, vista]);

  useEffect(() => {
    if (isAuthenticated && showLoginModal) {
      setShowLoginModal(false);
      setIsOpen(true);
      setVista('welcome');
    }
  }, [isAuthenticated, showLoginModal]);

  const addToast = (title, msg, icon) => {
    const id = Date.now();
    setToasts(p => [...p, { id, title, msg, icon }]);
    setTimeout(() => {
      setToasts(p => p.filter(t => t.id !== id));
    }, 4000);
  };

  const onDrop = (estadoDestino) => {
    if (arrastrando) {
      const orden = ordenes.find(o => o.codigo === arrastrando);
      if (orden && orden.estado !== estadoDestino) {
        moverEstado(arrastrando, estadoDestino);
        if (estadoDestino === 'preparacion') {
          addToast(`Al Horno`, `Mesa ${orden.mesa} ingresada.`, 'fas fa-fire-burner');
        } else if (estadoDestino === 'listo') {
          addToast(`¡Listo!`, `Mesa ${orden.mesa} horneada.`, 'fas fa-check-circle');
        }
      }
    }
    setArrastrando(null);
    setOverCol(null);
  };

  const handleOpenClick = () => {
    if (isAuthenticated) {
      setIsOpen(true);
      setVista('welcome'); 
    } else {
      setShowLoginModal(true);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };
  
  const formatFecha = () => {
    const date = new Date();
    const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    const dateStr = date.toLocaleDateString('es-ES', options);
    return dateStr.replace(/\b\w/g, c => c.toUpperCase());
  };

  return (
    <>
      <InicioSesionModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
      
      <AnimatePresence>
        {showCalendar && (
          <CalendarioModal isOpen={showCalendar} onClose={() => setShowCalendar(false)} userId={user?.id} />
        )}
      </AnimatePresence>

      <div className="fixed font-montserrat flex items-end justify-start z-[90]" style={{ bottom: '20px', left: '20px' }}>
        <AnimatePresence>
          {!isOpen && (
            <motion.button
              key="boton-cocina"
              initial={{ opacity: 0, scale: 0.5, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5, y: 20 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOpenClick}
              className="relative flex items-center justify-center w-[64px] h-[64px] bg-[#8B4513] text-white rounded-[20px] shadow-lg cursor-pointer z-50 border-2 border-white"
            >
              <i className="fas fa-fire-burner text-2xl relative z-10"></i>
              {badge > 0 && (
                <span className="absolute -top-2 -right-2 min-w-[24px] h-[24px] px-1 rounded-full bg-[#FF4D00] text-white text-[11px] font-black flex items-center justify-center border-2 border-white shadow-sm z-[60]">
                  {badge > 99 ? '+99' : badge}
                </span>
              )}
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {isOpen && isAuthenticated && (
          <motion.div
            key="cocina-pantalla"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-[300] flex flex-col font-montserrat bg-[#FFF5EC] overflow-hidden"
          >
            <FondoSystem hideWaves={false} />
            
            <AnimatePresence mode="wait">
              {vista === 'welcome' && (
                <VistaBienvenida key="welcome" onContinuar={() => setVista('dashboard')} />
              )}
              
              {vista === 'dashboard' && (
                <motion.div key="dashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col h-full w-full absolute inset-0 z-20">
                  <ToastContainer toasts={toasts} />
                  
                  {/* HEADER REDISEÑADO */}
                  <div className="relative z-20 px-6 pt-6 pb-2 shrink-0">
                    <div className="max-w-[1500px] mx-auto bg-white rounded-2xl shadow-sm px-6 py-4 flex flex-col xl:flex-row xl:items-center justify-between gap-4 border border-gray-100">
                      
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-[#FF4D00] rounded-2xl flex items-center justify-center text-white text-2xl shadow-md border-2 border-white outline outline-1 outline-gray-100">
                          <i className="fas fa-fire-burner"></i>
                        </div>
                        <div>
                          <h2 className="text-[26px] font-black text-[#5D3A1F] tracking-tight leading-tight">
                            ¡¡¡Bienvenido, <span className="text-[#FF4D00]">{user?.nombre || 'Hornero'}</span> !
                          </h2>
                          <p className="text-[13px] font-bold text-gray-500">
                            {formatFecha()}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <div className="relative w-64 hidden md:block">
                          <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-[#FF4D00]"></i>
                          <input 
                            type="text" 
                            placeholder="Buscar en el panel..." 
                            className="w-full bg-orange-50/30 border border-orange-100 rounded-full py-2.5 pl-10 pr-10 text-[13px] font-bold text-[#8B4513] placeholder:text-gray-400 outline-none focus:border-[#FF4D00] focus:bg-white transition-all shadow-inner" 
                          />
                          <i className="fas fa-sliders-h absolute right-4 top-1/2 -translate-y-1/2 text-[#FF4D00] cursor-pointer hover:scale-110 transition-transform"></i>
                        </div>
                        
                        <div className="flex gap-2">
                          <button onClick={() => setShowCalendar(true)} className="w-11 h-11 rounded-full border border-orange-200 text-[#FF4D00] flex items-center justify-center hover:bg-orange-50 transition-all relative">
                            <i className="far fa-calendar-alt"></i>
                          </button>
                          <button className="w-11 h-11 rounded-full border border-orange-200 text-[#FF4D00] flex items-center justify-center hover:bg-orange-50 transition-all relative">
                            <i className="fas fa-star"></i>
                          </button>
                          <button className="w-11 h-11 rounded-full border border-orange-200 text-[#FF4D00] flex items-center justify-center hover:bg-orange-50 transition-all relative">
                            <i className="fas fa-bell"></i>
                            <span className="absolute -top-1 -right-1 w-4 h-4 bg-orange-50 border border-[#FF4D00] text-[#FF4D00] rounded-full text-[10px] font-black flex items-center justify-center shadow-sm">5</span>
                          </button>
                        </div>
                        
                        <button onClick={handleClose} className="w-11 h-11 rounded-[14px] bg-[#FF4D00] text-white flex items-center justify-center hover:bg-[#e64500] transition-all shadow-md ml-1">
                          <i className="fas fa-power-off"></i>
                        </button>
                      </div>

                    </div>
                  </div>

                  {/* Kanban Board con Outlines y Footer */}
                  <div className="relative z-10 flex-1 overflow-hidden p-6 pb-8">
                    <div className="max-w-[1500px] mx-auto h-full grid grid-cols-1 md:grid-cols-3 gap-6">
                      {COLUMNAS.map((col) => {
                        const items = col.estado === 'pendiente' ? pendientes : col.estado === 'preparacion' ? enPreparacion : listos;
                        
                        return (
                          <div key={col.estado}
                            onDragOver={(e) => { e.preventDefault(); setOverCol(col.estado); }}
                            onDragLeave={() => setOverCol(prev => prev === col.estado ? null : prev)}
                            onDrop={() => onDrop(col.estado)}
                            className={`flex flex-col h-full bg-white/80 backdrop-blur-md rounded-[28px] overflow-hidden transition-all duration-300 border-2 ${overCol === col.estado ? 'border-[#FF4D00] shadow-2xl scale-[1.01] outline outline-4 outline-[#FF4D00]/20' : 'border-white shadow-lg shadow-[#8B4513]/5 outline outline-4 outline-[#8B4513]/10'} relative`}>
                            
                            {col.estado === 'preparacion' && <EfectoCalor />}

                            <div className={`px-5 py-4 flex items-center justify-between ${col.bgHeader} shadow-md relative z-10 border-b border-black/10`}>
                              <div className="flex items-center gap-3">
                                <span className={`w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-lg ${col.textHeader} shadow-inner`}>
                                  <i className={col.icono}></i>
                                </span>
                                <h3 className={`text-[13px] font-black uppercase tracking-widest ${col.textHeader}`}>{col.titulo}</h3>
                              </div>
                              <div className="flex items-center gap-3">
                                {col.extraInfo && (
                                  <span className="text-white/90 font-black text-[11px] flex items-center gap-1.5 bg-black/10 px-2 py-0.5 rounded-full"><i className="fas fa-temperature-high"></i> {col.extraInfo}</span>
                                )}
                                <span className="bg-white text-[#8B4513] font-black text-xs w-7 h-7 flex items-center justify-center rounded-full shadow-md">{items.length}</span>
                              </div>
                            </div>
                            
                            <div className="flex-1 overflow-y-auto space-y-5 p-5 relative z-10">
                              <AnimatePresence>
                                {items.map(o => (
                                  <TarjetaOrden
                                    key={o.codigo}
                                    orden={o}
                                    ahora={ahora}
                                    arrastrando={arrastrando === o.codigo}
                                    onDragStart={() => setArrastrando(o.codigo)}
                                    onDragEnd={() => setArrastrando(null)}
                                    onPreparar={() => { iniciarPreparacion(o.codigo); addToast(`Al Horno`, `Mesa ${o.mesa} horneándose.`, 'fas fa-fire-burner'); }}
                                    onListo={() => { marcarListo(o.codigo); addToast(`Terminado`, `Mesa ${o.mesa} lista.`, 'fas fa-check-circle'); }}
                                    onEntregar={marcarEntregado}
                                    onAnular={anularOrden}
                                  />
                                ))}
                              </AnimatePresence>
                              
                              {items.length === 0 && (
                                <div className="h-48 flex flex-col items-center justify-center rounded-[20px] border-2 border-dashed border-[#8B4513]/10 bg-white/60">
                                  <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}>
                                    <div className="w-16 h-16 rounded-full bg-[#8B4513]/5 flex items-center justify-center mb-3">
                                      <i className={`${col.icono} text-3xl text-[#8B4513]/20`}></i>
                                    </div>
                                  </motion.div>
                                  <p className="text-[11px] font-black uppercase tracking-widest text-[#8B4513]/40">Bandeja Vacía</p>
                                </div>
                              )}
                            </div>

                            <div className="px-5 py-3 bg-orange-50/80 border-t border-[#8B4513]/10 relative z-10 flex items-center justify-between shadow-[0_-4px_10px_rgba(139,69,19,0.03)] backdrop-blur-sm">
                               <p className="text-[10px] font-black uppercase tracking-widest text-[#8B4513]/60 flex items-center gap-2">
                                 <i className="fas fa-list-ul"></i> Total Comandas
                               </p>
                               <span className="bg-[#8B4513]/10 text-[#8B4513] font-black text-xs px-2.5 py-1 rounded-md border border-[#8B4513]/10 shadow-inner">
                                 {items.length}
                               </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default WidgetCocina;