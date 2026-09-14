import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const ChatMenu = ({ isOpen, categories, onSelectCategory }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0, y: -10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -10, scale: 0.95 }}
        transition={{ duration: 0.15 }}
        className="absolute top-[68px] right-3 z-[100] w-60 bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-[#FF4D00]/10 overflow-hidden"
      >
        <div className="flex flex-col">
          <div className="px-4 py-2.5 bg-[#FF4D00]/5 border-b border-[#FF4D00]/10">
            <span className="text-[10px] font-black text-[#FF4D00] uppercase tracking-wider">Temas</span>
          </div>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat)}
              className="flex items-center gap-3 px-4 py-3 hover:bg-[#FF4D00]/5 border-b border-[#FF4D00]/5 last:border-0 text-left cursor-pointer transition-colors group"
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${cat.color} group-hover:scale-110 transition-transform duration-300`}>
                {cat.icon}
              </div>
              <span className="text-[12.5px] font-semibold text-slate-700">{cat.title}</span>
            </button>
          ))}
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

export default ChatMenu;
