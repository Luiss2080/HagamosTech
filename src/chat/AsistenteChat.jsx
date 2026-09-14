import React, { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useChatAssistant } from './hooks/useAsistenteChat';
import { config_CHAT } from './data/configuracion.js';
import ChatHeader from './components/EncabezadoChat';
import ChatMenu from './components/MenuChat';
import ChatMessages from './components/MensajesChat';
import ChatInput from './components/EntradaChat';
import ChatToggle from './components/BotonAlternarChat';
import CircleParticles from '../components/fondos/ParticulasCirculares';

const ChatAssistant = ({ onOpen, onClose }) => {
  const {
    isOpen,
    isMenuOpen,
    isTyping,
    activeCategory,
    inputValue,
    messages,
    categories,
    setIsMenuOpen,
    setInputValue,
    toggleChat,
    handleSelectCategory,
    handleQuestionClick,
    handleSendMessage,
  } = useChatAssistant();

  const widgetRef = useRef(null);
  const prevIsOpen = useRef(isOpen);

  useEffect(() => {
    if (isOpen && !prevIsOpen.current && onOpen) onOpen();
    if (!isOpen && prevIsOpen.current && onClose) onClose();
    prevIsOpen.current = isOpen;
  }, [isOpen, onOpen, onClose]);

  // Click outside to close assistant
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && widgetRef.current && !widgetRef.current.contains(event.target)) {
        toggleChat();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, toggleChat]);

  return (
    <div ref={widgetRef} className="fixed bottom-3 left-3 sm:bottom-4 sm:left-4 z-[90] font-montserrat flex items-end">
      <AnimatePresence mode="wait">
        {isOpen ? (
          <motion.div
            key="chat-window"
            initial={{ opacity: 0, y: 50, scale: 0.9, transformOrigin: 'bottom left' }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3, type: "spring", bounce: 0.2 }}
            className="relative w-[calc(100vw-1.5rem)] max-w-[350px] bg-white rounded-3xl shadow-[0_20px_40px_-10px_rgba(255,77,0,0.2)] overflow-hidden flex flex-col border border-[#FF4D00]/10"
            style={{ height: '560px', maxHeight: '85vh' }}
          >
            {/* Orange accent line at top */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FF4D00] via-[#FFB088] to-[#FF4D00] z-30"></div>

            <CircleParticles count={12} colorScheme="light" />

            <ChatHeader
              botName={config_CHAT.botName}
              botRole={config_CHAT.botRole}
              onToggle={toggleChat}
              onToggleMenu={() => setIsMenuOpen((prev) => !prev)}
            />

            <ChatMenu
              isOpen={isMenuOpen}
              categories={categories}
              onSelectCategory={handleSelectCategory}
            />

            <ChatMessages
              messages={messages}
              isTyping={isTyping}
              activeCategory={activeCategory}
              onQuestionClick={handleQuestionClick}
            />

            <ChatInput
              value={inputValue}
              onChange={setInputValue}
              onSubmit={handleSendMessage}
              disabled={!inputValue.trim() || isTyping}
              placeholder="Escribe tu consulta..."
            />
          </motion.div>
        ) : (
          <ChatToggle onClick={toggleChat} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatAssistant;
