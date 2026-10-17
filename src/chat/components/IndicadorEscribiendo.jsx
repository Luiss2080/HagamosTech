import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const TypingIndicator = () => {
  const reduceMotion = useReducedMotion();

  return (
    <div className="flex space-x-1.5 p-2.5 rounded-2xl rounded-tl-none bg-[#111827] border border-white/10 shadow-sm w-14 justify-center items-center relative z-10" role="status" aria-live="polite" aria-label="Niko está preparando una respuesta">
      {[0, 0.2, 0.4].map((delay) => (
        <motion.div
          key={delay}
          className="w-1.5 h-1.5 bg-[#A3E635]/60 rounded-full"
          animate={reduceMotion ? undefined : { y: [0, -3, 0] }}
          transition={reduceMotion ? undefined : { duration: 0.6, repeat: Infinity, delay }}
        />
      ))}
    </div>
  );
};

export default TypingIndicator;
