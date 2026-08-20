import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Send, MoreVertical, Paperclip, Smile } from 'lucide-react';
import { getRandomWhatsApp } from '../../utils/whatsapp';

const ChatWhatsApp = ({ onOpen, onClose }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [showWelcome, setShowWelcome] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  
  const widgetRef = useRef(null);
  const prevIsOpen = useRef(isOpen);

  useEffect(() => {
    if (isOpen && !prevIsOpen.current && onOpen) onOpen();
    if (!isOpen && prevIsOpen.current && onClose) onClose();
    prevIsOpen.current = isOpen;
  }, [isOpen, onOpen, onClose]);

  // Handle opening simulation
  useEffect(() => {
    if (isOpen && !hasOpened) {
      setHasOpened(true);
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setShowWelcome(true);
      }, 1500);
    }
  }, [isOpen, hasOpened]);

  // Click outside to close widget
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && widgetRef.current && !widgetRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const phoneNumber = "59161320004";
  const toggleChat = () => setIsOpen((prev) => !prev);

  const handleSendMessage = (e) => {
    e.preventDefault();
    const text = inputValue.trim() ? encodeURIComponent(inputValue.trim()) : encodeURIComponent('Hola, necesito ayuda con...');
    window.open(`https://api.whatsapp.com/send?phone=${phoneNumber}&text=${text}`, '_blank');
    setInputValue('');
    setIsOpen(false);
  };

  return (
    <div ref={widgetRef} className="fixed bottom-3 right-3 sm:bottom-4 sm:right-4 z-[90] font-sans flex items-end justify-end transition-all duration-300">
      <AnimatePresence mode="wait">
        {isOpen ? (
          <motion.div
            key="wa-chat-window"
            initial={{ opacity: 0, y: 50, scale: 0.9, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3, type: "spring", bounce: 0.2 }}
            className="relative w-[calc(100vw-1.5rem)] max-w-[350px] bg-white rounded-[24px] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] overflow-hidden flex flex-col border border-gray-200"
            style={{ height: '480px', maxHeight: '85vh' }}
          >
            {/* Custom WhatsApp Scrollbar Styles */}
            <style dangerouslySetInnerHTML={{__html: `
              .whatsapp-scrollbar::-webkit-scrollbar {
                width: 5px;
              }
              .whatsapp-scrollbar::-webkit-scrollbar-track {
                background: transparent;
              }
              .whatsapp-scrollbar::-webkit-scrollbar-thumb {
                background: rgba(0,0,0,0.15);
                border-radius: 10px;
              }
            `}} />

            {/* Header: Modern WhatsApp Green */}
            <div className="bg-[#008069] p-3 flex items-center justify-between relative z-20 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center p-1 overflow-hidden">
                    <img src="/img/02_Logos/LogoModal.png" alt="HAGAMOSTECH" className="w-full h-full object-contain" />
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-[#25d366] rounded-full border-2 border-[#008069]"></div>
                </div>
                <div className="flex flex-col">
                  <h3 className="font-semibold text-white text-[15px] leading-tight tracking-wide">HAGAMOSTECH</h3>
                  <div className="text-[11px] text-emerald-100 font-normal">
                    {isTyping ? 'escribiendo...' : 'en línea'}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 relative z-10">
                <button className="w-8 h-8 flex items-center justify-center text-white/90 hover:bg-white/10 rounded-full transition-all cursor-pointer">
                  <MoreVertical size={20} />
                </button>
                <button 
                  onClick={toggleChat}
                  className="w-8 h-8 flex items-center justify-center text-white/90 hover:bg-white/10 rounded-full transition-all cursor-pointer"
                >
                  <X size={22} />
                </button>
              </div>
            </div>

            {/* Chat Body: Modern WA Background */}
            <div className="flex-1 relative flex flex-col bg-[#EFEAE2] overflow-hidden">
              <div className="absolute inset-0 z-0 opacity-40 pointer-events-none" style={{ backgroundImage: 'url("https://web.whatsapp.com/img/bg-chat-tile-dark_a4be512e7195b6b733d9110b408f075d.png")', backgroundSize: '400px' }}></div>

              <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 relative z-10 whatsapp-scrollbar">
                <div className="flex justify-center mb-3 mt-1">
                  <span className="text-[11px] bg-[#E1F3FB] text-slate-600 px-3 py-1 rounded-md shadow-sm uppercase tracking-wide">Hoy</span>
                </div>

                {/* Secure message badge */}
                <div className="flex justify-center mb-2">
                  <div className="bg-[#FFEECD] text-[#544837] text-[10.5px] px-3 py-1.5 rounded-lg text-center max-w-[90%] shadow-sm leading-snug">
                    <span className="font-medium">🔒 Los mensajes y llamadas están cifrados de extremo a extremo.</span>
                  </div>
                </div>

                {/* WhatsApp Chat bubbles */}
                <AnimatePresence>
                  {showWelcome && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95, originX: 0, originY: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2 }}
                      className="flex flex-col items-start w-full mt-2 pl-2"
                    >
                      <div className="flex flex-col relative max-w-[90%]">
                        {/* Pure CSS Tail for 100% native look without gap issues */}
                        <div className="absolute -left-[8px] top-0 w-0 h-0 border-r-[8px] border-r-white border-b-[10px] border-b-transparent z-10 filter drop-shadow-[-1px_0_1px_rgba(0,0,0,0.06)]"></div>
                        
                        <div className="p-2.5 pb-1.5 text-[14.5px] leading-relaxed relative bg-white text-[#111B21] rounded-lg rounded-tl-none z-20 shadow-[0_1px_1px_rgba(0,0,0,0.1)]">
                          <span className="font-semibold text-[#008069] text-[12.5px] block mb-1">HagamosTech</span>
                          ¡Hola! 👋 Bienvenido al canal oficial de HAGAMOSTECH.
                          <br/><br/>
                          Escríbenos tu consulta y un asesor te atenderá al instante. 👇
                          
                          <div className="flex items-center justify-end gap-1 mt-1 float-right ml-3">
                            <span className="text-[10px] font-medium text-slate-500">
                              {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  
                  {isTyping && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95, originX: 0, originY: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="flex flex-col items-start w-full mt-2 pl-2"
                    >
                      <div className="flex flex-col relative max-w-[90%]">
                        {/* Pure CSS Tail */}
                        <div className="absolute -left-[8px] top-0 w-0 h-0 border-r-[8px] border-r-white border-b-[10px] border-b-transparent z-10 filter drop-shadow-[-1px_0_1px_rgba(0,0,0,0.06)]"></div>
                        
                        <div className="px-4 py-3 relative bg-white rounded-lg rounded-tl-none flex items-center gap-1 z-20 shadow-[0_1px_1px_rgba(0,0,0,0.1)]">
                          <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></span>
                          <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></span>
                          <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
            
            {/* Input Form: Modern WhatsApp */}
            <form onSubmit={handleSendMessage} className="bg-[#F0F2F5] p-2.5 flex items-center gap-2 relative z-20">
              <button type="button" className="w-9 h-9 flex items-center justify-center text-slate-500 hover:text-slate-700 transition-colors shrink-0">
                <Smile size={24} />
              </button>
              <button type="button" className="w-9 h-9 flex items-center justify-center text-slate-500 hover:text-slate-700 transition-colors shrink-0 mr-1">
                <Paperclip size={24} />
              </button>
              
              <div className="flex-1 bg-white rounded-xl flex items-center shadow-sm">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Escribe un mensaje"
                  className="w-full bg-transparent border-none text-[#111B21] text-[15px] px-3 py-2.5 outline-none placeholder-slate-500"
                />
              </div>

              {inputValue.trim() ? (
                <button
                  type="submit"
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all shrink-0 bg-[#00A884] text-white hover:bg-[#008F6F]"
                >
                  <Send size={18} className="ml-0.5" />
                </button>
              ) : (
                <button
                  type="button"
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all shrink-0 text-slate-500 hover:text-slate-700"
                >
                  <svg viewBox="0 0 24 24" width="24" height="24" className="fill-current"><path d="M11.999 14.942c2.001 0 3.531-1.53 3.531-3.531V4.35c0-2.001-1.53-3.531-3.531-3.531S8.469 2.35 8.469 4.35v7.061c0 2.001 1.53 3.531 3.53 3.531zm6.238-3.53c0 3.531-2.942 6.002-6.237 6.002s-6.237-2.471-6.237-6.002H3.761c0 4.001 3.178 7.297 7.061 7.885v3.884h2.354v-3.884c3.884-.588 7.061-3.884 7.061-7.885h-2.002z"></path></svg>
                </button>
              )}
            </form>
          </motion.div>
        ) : (
          <motion.button 
            key="wa-floating-button"
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleChat}
            className="relative flex items-center justify-center w-[60px] h-[60px] bg-[#25D366] text-white rounded-[1.2rem] shadow-[0_8px_25px_-5px_rgba(37,211,102,0.5)] cursor-pointer border-none z-50 group transition-all"
          >
            <div className="relative flex items-center justify-center w-full h-full">
              <i className="fab fa-whatsapp text-[42px] text-white group-hover:scale-110 transition-transform"></i>
              <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 z-[60]">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 border-2 border-white shadow-sm"></span>
              </span>
            </div>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatWhatsApp;
