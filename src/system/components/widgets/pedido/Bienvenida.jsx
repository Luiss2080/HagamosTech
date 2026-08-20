import React from 'react';
import { motion } from 'framer-motion';

const lcCardIn = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.2, 0.8, 0.2, 1] } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.3 } }
};

const lcSteam = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: [0, 0.6, 0], 
    y: [-10, -50],
    transition: { duration: 2.5, repeat: Infinity, ease: 'linear' }
  }
};

const Bienvenida = ({ onComenzar }) => (
  <div className="absolute inset-0 flex items-center justify-center p-6 sm:p-12 z-50 bg-[#FFF5EC] overflow-hidden font-montserrat">
    
    {/* Fondo inmersivo */}
    <div className="absolute inset-0 z-0">
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#FF4D00]/5 rounded-full blur-[100px] animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#8B4513]/5 rounded-full blur-[80px]"></div>
    </div>

    <motion.div variants={lcCardIn} initial="hidden" animate="visible" exit="exit" className="relative z-10 w-full max-w-2xl flex flex-col items-center text-center">
      
      {/* Insignia Animada Superior */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-8 flex flex-col items-center gap-3">
         <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white shadow-lg border-2 border-orange-100 text-[#FF4D00] text-[11px] font-black uppercase tracking-widest relative overflow-hidden group">
           <span className="w-2.5 h-2.5 rounded-full bg-[#FF4D00] animate-ping absolute"></span>
           <span className="w-2.5 h-2.5 rounded-full bg-[#FF4D00] relative z-10"></span> 
           Sistema POS · Sala
           <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
         </span>
      </motion.div>

      {/* Logo Central Gigante y Efecto Humo */}
      <div className="relative mb-12">
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 flex gap-8 z-0">
           <motion.div variants={lcSteam} className="w-1 h-24 bg-gradient-to-t from-white/40 to-transparent blur-md"></motion.div>
           <motion.div variants={lcSteam} transition={{ delay: 0.8, duration: 2.5, repeat: Infinity }} className="w-2 h-32 bg-gradient-to-t from-white/30 to-transparent blur-lg"></motion.div>
           <motion.div variants={lcSteam} transition={{ delay: 1.5, duration: 2.2, repeat: Infinity }} className="w-1 h-20 bg-gradient-to-t from-white/40 to-transparent blur-md"></motion.div>
        </div>
        <motion.div animate={{ y: [-8, 8, -8] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="relative z-10 w-40 h-40 sm:w-48 sm:h-48 rounded-[40px] bg-white shadow-[0_20px_60px_-15px_rgba(255,77,0,0.4)] border-4 border-white flex items-center justify-center p-6">
          <img src="/img/02_Logos/LogoModal.png" alt="Los Castores" className="w-full h-full object-contain filter drop-shadow-xl" />
        </motion.div>
      </div>

      {/* Título Principal */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mb-10">
        <h1 className="text-4xl sm:text-5xl font-black text-[#8B4513] tracking-tight leading-none mb-4">
          Toma el pedido de <br/><span className="text-[#FF4D00] drop-shadow-sm">cada mesa</span>
        </h1>
        <p className="text-gray-500 font-bold max-w-md mx-auto text-sm">
          Selecciona la mesa del cliente, arma su pedido con todo el menú y envíalo directo a la caja o al horno.
        </p>
      </motion.div>

      {/* Chips de Flujo */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="flex flex-wrap items-center justify-center gap-3 mb-12">
        {[
          { text: 'Mesa', icon: 'fas fa-chair', active: true },
          { text: 'Menú', icon: 'fas fa-utensils', active: false },
          { text: 'Caja', icon: 'fas fa-cash-register', active: false },
          { text: 'Horno', icon: 'fas fa-fire-burner', active: false }
        ].map((paso, idx) => (
          <React.Fragment key={idx}>
            <div className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 border-2 transition-all ${paso.active ? 'bg-[#FF4D00] text-white border-[#FF4D00] shadow-lg shadow-[#FF4D00]/30 scale-105' : 'bg-white text-gray-400 border-gray-100'}`}>
              <i className={paso.icon}></i> {paso.text}
            </div>
            {idx < 3 && <i className="fas fa-chevron-right text-gray-300 text-xs"></i>}
          </React.Fragment>
        ))}
      </motion.div>

      {/* Botón de Entrada */}
      <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.9, type: 'spring' }}>
        <button onClick={onComenzar} className="group relative overflow-hidden px-10 py-5 rounded-2xl bg-[#FF4D00] text-white font-black text-sm uppercase tracking-widest shadow-[0_15px_30px_-5px_rgba(255,77,0,0.4)] hover:shadow-[0_20px_40px_-5px_rgba(255,77,0,0.6)] hover:-translate-y-1 transition-all flex items-center gap-4">
          <span className="relative z-10">Comenzar Turno</span>
          <i className="fas fa-arrow-right relative z-10 group-hover:translate-x-2 transition-transform"></i>
          <div className="absolute inset-0 bg-gradient-to-r from-[#FF4D00] to-[#E95A0C] opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </button>
      </motion.div>

    </motion.div>
  </div>
);

export default Bienvenida;