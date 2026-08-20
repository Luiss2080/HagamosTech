import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import ParticulasCirculares from '../../components/fondos/ParticulasCirculares';
import TypingIndicator from './IndicadorEscribiendo';
import { textRenderer } from '../utils/renderizarTexto.jsx';

const ChatMessages = ({ messages, isTyping, activeCategory, onQuestionClick }) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping, activeCategory]);

  return (
    <div className="flex-1 relative flex flex-col bg-[#FFF9F5] overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        <ParticulasCirculares />
      </div>

      <div className="flex-1 overflow-y-auto p-3.5 flex flex-col gap-3 relative z-10 pb-8">
        <div className="flex justify-center mb-1">
          <span className="text-[9px] bg-white/70 text-[#FF4D00] px-2.5 py-0.5 rounded-full font-bold shadow-sm backdrop-blur-md uppercase tracking-wider border border-[#FF4D00]/10">Hoy</span>
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
              {msg.type === 'bot' && (
                <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center mt-1 relative z-10">
                  <img src="/img/02_Logos/NikoAvatar.jpg" alt="Niko Castor" className="w-full h-full object-cover mix-blend-multiply" />
                </div>
              )}

              <div className="flex flex-col relative group">
                <div
                  className={`p-3 text-[13.5px] leading-relaxed shadow-sm relative ${
                    msg.type === 'user'
                      ? 'bg-[#FFF0E6] text-[#8B3A13] rounded-2xl rounded-tr-sm border border-[#FF4D00]/20'
                      : 'bg-white text-[#5C2B0B] rounded-2xl rounded-tl-sm border border-[#FF4D00]/10 shadow-md'
                  }`}
                >
                  {textRenderer(msg.text)}
                </div>
                <span className={`text-[9px] mt-1 font-bold px-1 ${msg.type === 'user' ? 'text-right text-[#FF4D00]/60' : 'text-left text-[#8B3A13]/50'}`}>
                  {msg.time} {msg.type === 'user' && <span className="text-[#FF4D00]/70 ml-0.5">✓✓</span>}
                </span>
              </div>
            </div>
          </motion.div>
        ))}

        {isTyping && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex gap-2">
            <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center mt-1 relative z-10">
              <img src="/img/02_Logos/NikoAvatar.jpg" alt="Niko Castor" className="w-full h-full object-cover mix-blend-multiply" />
            </div>
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
                  className="text-[12.5px] text-left bg-white/95 backdrop-blur-md border border-[#FF4D00]/20 text-[#5C2B0B] p-2.5 rounded-xl shadow-sm hover:bg-[#FF4D00] hover:text-white hover:shadow-md transition-all cursor-pointer font-medium leading-snug"
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
