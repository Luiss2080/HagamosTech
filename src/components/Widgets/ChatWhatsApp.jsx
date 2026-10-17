import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Send, X } from 'lucide-react';

const WHATSAPP_NUMBER = '59161320004';

const ChatWhatsApp = ({ onOpen, onClose }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const widgetRef = useRef(null);
  const inputRef = useRef(null);
  const triggerRef = useRef(null);
  const wasOpenRef = useRef(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (isOpen) {
      onOpen?.();
      window.setTimeout(() => inputRef.current?.focus(), 0);
    } else if (wasOpenRef.current) {
      onClose?.();
      window.setTimeout(() => triggerRef.current?.focus(), 0);
    }
    wasOpenRef.current = isOpen;
  }, [isOpen, onOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    const closeOnOutsideClick = (event) => {
      if (widgetRef.current && !widgetRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', closeOnEscape);
    document.addEventListener('pointerdown', closeOnOutsideClick);
    return () => {
      document.removeEventListener('keydown', closeOnEscape);
      document.removeEventListener('pointerdown', closeOnOutsideClick);
    };
  }, [isOpen]);

  const handleSendMessage = (event) => {
    event.preventDefault();
    const message = inputValue.trim();
    if (!message) return;

    const url = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setInputValue('');
    setIsOpen(false);
  };

  const motionProps = reduceMotion
    ? { initial: false, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0 } }
    : {
      initial: { opacity: 0, y: 24, scale: 0.96 },
      animate: { opacity: 1, y: 0, scale: 1 },
      exit: { opacity: 0, y: 24, scale: 0.96 },
      transition: { duration: 0.2 },
    };

  return (
    <div
      ref={widgetRef}
      className="fixed bottom-3 right-3 z-[90] flex items-end justify-end font-sans sm:bottom-4 sm:right-4"
    >
      <AnimatePresence mode="wait">
        {isOpen ? (
          <motion.section
            key="whatsapp-contact-panel"
            {...motionProps}
            id="whatsapp-contact-panel"
            role="dialog"
            aria-labelledby="whatsapp-contact-title"
            aria-describedby="whatsapp-contact-description"
            className="flex h-[min(400px,75vh)] w-[calc(100vw-1.5rem)] max-w-[350px] flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white text-slate-900 shadow-2xl"
          >
            <header className="flex items-center justify-between gap-3 bg-[#075E54] px-4 py-3 text-white">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#075E54]" aria-hidden="true">
                  <i className="fab fa-whatsapp text-2xl" />
                </span>
                <div>
                  <h2 id="whatsapp-contact-title" className="text-sm font-bold">Contacto por WhatsApp</h2>
                  <p className="text-xs text-white/80">Canal de consulta</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Cerrar panel de WhatsApp"
                className="flex h-9 w-9 items-center justify-center rounded-full text-white/90 transition-colors hover:bg-white/10"
              >
                <X size={20} aria-hidden="true" />
              </button>
            </header>

            <div className="flex flex-1 items-center justify-center bg-[#F5F3EE] px-5 py-6">
              <p id="whatsapp-contact-description" className="max-w-[270px] rounded-2xl bg-white p-4 text-center text-sm leading-relaxed shadow-sm">
                Escribí tu consulta. Al continuar, se abrirá WhatsApp para que revises y envíes el mensaje desde allí.
              </p>
            </div>

            <form onSubmit={handleSendMessage} className="flex items-center gap-2 bg-slate-100 p-3">
              <label className="sr-only" htmlFor="whatsapp-contact-message">Tu consulta</label>
              <input
                ref={inputRef}
                id="whatsapp-contact-message"
                type="text"
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
                placeholder="Escribí tu consulta"
                className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-500"
              />
              <button
                type="submit"
                disabled={!inputValue.trim()}
                aria-label="Continuar a WhatsApp"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#008069] text-white transition-colors hover:bg-[#006b58] disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                <Send size={18} aria-hidden="true" />
              </button>
            </form>
          </motion.section>
        ) : (
          <motion.button
            key="whatsapp-contact-trigger"
            {...motionProps}
            ref={triggerRef}
            type="button"
            onClick={() => setIsOpen(true)}
            aria-label="Abrir contacto por WhatsApp"
            aria-expanded={isOpen}
            aria-controls="whatsapp-contact-panel"
            className="flex h-14 w-14 items-center justify-center rounded-2xl border-none bg-[#25D366] text-white shadow-lg shadow-emerald-900/30 transition-transform hover:scale-105"
          >
            <i className="fab fa-whatsapp text-4xl" aria-hidden="true" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatWhatsApp;
