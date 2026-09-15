import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import ParticulasCirculares from '../../components/fondos/ParticulasCirculares';
import TypingIndicator from './IndicadorEscribiendo';
import { textRenderer } from '../utils/renderizarTexto.jsx';

const AvatarBot = () => (
  <div className="w-8 h-8 rounded-full bg-[#A3E635] flex items-center justify-center shadow-md flex-shrink-0 mt-1 relative z-10">
    <i className="fas fa-robot text-[#0A0A0A] text-xs"></i>
  </div>
);

const ChatMessages = ({ messages, isTyping, activeCategory, onQuestionClick }) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping, activeCategory]);

  return (
    <div className="flex-1 relative flex flex-col bg-[#0A0A0A] overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        <ParticulasCirculares />
      </div>

      <div className="flex-1 overflow-y-auto p-3.5 flex flex-col gap-3 relative z-10 pb-8">
        <div className="flex justify-center mb-1">
          <span className="text-[9px] bg-white/10 text-[#A3E635] px-2.5 py-0.5 rounded-full font-bold shadow-sm backdrop-blur-md uppercase tracking-wider border border-[#A3E635]/20">Hoy</span>
        </div>

        {messages.map((msg, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.2 }}
            className={`flex flex-col ${msg.type === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div className={`flex gap-2 max-w-[90%] ${msg.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              {msg.type === 'bot' && <AvatarBot />}

              <div className="flex flex-col relative group">
                <div
                  className={`p-3 text-[13.5px] leading-relaxed shadow-sm relative ${
                    msg.type === 'user'
                      ? 'bg-[#A3E635] text-[#0A0A0A] rounded-2xl rounded-tr-sm border border-[#A3E635]'
                      : 'bg-[#111827] text-slate-200 rounded-2xl rounded-tl-sm border border-white/10 shadow-md'
                  }`}
                >
                  {textRenderer(msg.text)}
                </div>
                <span className={`text-[9px] mt-1 font-bold px-1 ${msg.type === 'user' ? 'text-right text-[#A3E635]/70' : 'text-left text-slate-400/80'}`}>
                  {msg.time} {msg.type === 'user' && <span className="text-[#A3E635]/80 ml-0.5">✓✓</span>}
                </span>
              </div>
            </div>
          </motion.div>
        ))}

        {isTyping && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex gap-2">
            <AvatarBot />
            <TypingIndicator />
          </motion.div>
        )}

        {!isTyping && activeCategory && activeCategory !== 'custom' && (
          <motion.div
            initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="mt-1 flex flex-col gap-1.5 relative z-10"
          >
            <div className="flex flex-col gap-1.5">
              {activeCategory.questions && activeCategory.questions.map((qa, i) => (
                <button
                  key={i}
                  onClick={() => onQuestionClick(qa)}
                  className="text-[12.5px] text-left bg-[#111827]/90 backdrop-blur-md border border-white/10 text-slate-200 p-2.5 rounded-xl shadow-sm hover:bg-[#A3E635] hover:text-[#0A0A0A] hover:border-[#A3E635] hover:shadow-md transition-all cursor-pointer font-medium leading-snug"
                >
                  {qa.q}
                </button>
              ))}
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default ChatMessages;
