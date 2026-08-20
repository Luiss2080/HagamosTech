import React from 'react';
import { motion } from 'framer-motion';

const ChatToggle = ({ onClick }) => (
  <motion.button
    key="floating-button"
    initial={{ opacity: 0, scale: 0.5, y: 20 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.5, y: 20 }}
    whileHover={{ scale: 1.05, y: -5 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className="relative flex items-center justify-center w-[60px] h-[60px] bg-[#FFD1B3] rounded-[1.2rem] shadow-[0_8px_25px_-5px_rgba(255,209,179,0.8)] cursor-pointer border-2 border-white z-50 group transition-all p-0"
  >
    <div className="w-[95%] h-[95%] rounded-xl overflow-hidden flex items-center justify-center">
      <img 
        src="/img/02_Logos/NikoAvatar.jpg" 
        alt="Niko HagamosTech" 
        className="w-full h-full object-cover scale-110 group-hover:scale-125 transition-transform mix-blend-multiply"
      />
    </div>
    <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 z-[60]">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
      <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 border-2 border-white shadow-sm"></span>
    </span>
  </motion.button>
);

export default ChatToggle;
