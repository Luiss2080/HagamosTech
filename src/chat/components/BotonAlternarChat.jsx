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
    className="relative flex items-center justify-center w-[60px] h-[60px] bg-[#A3E635] rounded-[1.2rem] shadow-[0_8px_25px_-5px_rgba(163,230,53,0.6)] cursor-pointer border-2 border-[#111111] z-50 group transition-all p-0"
  >
    <div className="w-[95%] h-[95%] rounded-xl overflow-hidden flex items-center justify-center bg-[#A3E635]">
      <i className="fa-solid fa-robot text-[#0A0A0A] text-2xl group-hover:scale-110 transition-transform"></i>
    </div>
    <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 z-[60]">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
      <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 border-2 border-white shadow-sm"></span>
    </span>
  </motion.button>
);

export default ChatToggle;
