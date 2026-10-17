import React from 'react';
import { motion } from 'framer-motion';

const ChatToggle = ({ onClick, reduceMotion = false, buttonRef }) => (
  <motion.button
    key="floating-button"
    initial={reduceMotion ? false : { opacity: 0, scale: 0.5, y: 20 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    exit={reduceMotion ? undefined : { opacity: 0, scale: 0.5, y: 20 }}
    whileHover={reduceMotion ? undefined : { scale: 1.05, y: -5 }}
    whileTap={reduceMotion ? undefined : { scale: 0.95 }}
    onClick={onClick}
    ref={buttonRef}
    type="button"
    aria-label="Abrir asistente Niko"
    className="relative flex items-center justify-center w-[60px] h-[60px] bg-[#A3E635] rounded-[1.2rem] shadow-[0_8px_25px_-5px_rgba(163,230,53,0.6)] cursor-pointer border-2 border-[#111111] z-50 group transition-all p-0"
  >
    <div className="w-[95%] h-[95%] rounded-xl overflow-hidden flex items-center justify-center bg-[#A3E635]">
      <i className="fa-solid fa-robot text-[#0A0A0A] text-2xl group-hover:scale-110 transition-transform"></i>
    </div>
  </motion.button>
);

export default ChatToggle;
