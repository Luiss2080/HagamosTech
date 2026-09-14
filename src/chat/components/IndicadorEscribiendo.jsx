import React from 'react';
import { motion } from 'framer-motion';

const TypingIndicator = () => (
  <div className="flex space-x-1.5 p-2.5 rounded-2xl rounded-tl-none bg-white border border-gray-100 shadow-sm w-14 justify-center items-center relative z-10">
    <motion.div className="w-1.5 h-1.5 bg-[#a41e22]/40 rounded-full" animate={{ y: [0, -3, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0 }} />
    <motion.div className="w-1.5 h-1.5 bg-[#a41e22]/40 rounded-full" animate={{ y: [0, -3, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }} />
    <motion.div className="w-1.5 h-1.5 bg-[#a41e22]/40 rounded-full" animate={{ y: [0, -3, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }} />
  </div>
);

export default TypingIndicator;
