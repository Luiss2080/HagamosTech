import { useState, useCallback } from 'react';
import { URL_WHATSAPP, config_CHAT } from '../data/configuracion.js';
import { categories } from '../data/categorias.jsx';
import { analizarMensajeUsuario } from '../data/procesamientoLenguaje.js';

const obtenerHoraActual = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

const crearMensaje = (type, text, extra = {}) => ({
  type,
  text,
  time: obtenerHoraActual(),
  ...extra,
});

export const useChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([
    crearMensaje('bot', config_CHAT.initialMessage),
  ]);

  const toggleChat = useCallback(() => {
    setIsOpen((prev) => {
      const next = !prev;
      if (next && messages.length === 1) {
        setActiveCategory(null);
      }
      if (!next) {
        setIsMenuOpen(false);
      }
      return next;
    });
  }, [messages.length]);

  const addMessage = useCallback((message) => {
    setMessages((prev) => [...prev, message]);
  }, []);

  const simularEscribiendo = useCallback((duration) => new Promise((resolve) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      resolve();
    }, duration);
  }), []);

  const handleSelectCategory = useCallback(async (category) => {
    setIsMenuOpen(false);

    if (category.isLink) {
      window.open(URL_WHATSAPP, '_blank');
      return;
    }

    setActiveCategory(category);
    addMessage(crearMensaje('user', `Consultar sobre: ${category.title}`));
    await simularEscribiendo(config_CHAT.timing.categoryResponse);
    addMessage(crearMensaje('bot', `**${category.title}** — preguntas frecuentes:`));
  }, [addMessage, simularEscribiendo]);

  const handleQuestionClick = useCallback(async (qa) => {
    addMessage(crearMensaje('user', qa.q));
    await simularEscribiendo(config_CHAT.timing.questionResponse);
    addMessage(crearMensaje('bot', qa.a));

    setTimeout(async () => {
      await simularEscribiendo(config_CHAT.timing.typingSimulation);
      addMessage(crearMensaje('bot', config_CHAT.followUpMessages.afterQuestion, { isMenuPrompt: true }));
      setActiveCategory(null);
    }, config_CHAT.timing.followUpDelay);
  }, [addMessage, simularEscribiendo]);

  const handleSendMessage = useCallback(async (e) => {
    e.preventDefault();
    const userText = inputValue.trim();
    if (!userText) return;

    setInputValue('');
    setActiveCategory('custom');
    addMessage(crearMensaje('user', userText));
    await simularEscribiendo(config_CHAT.timing.questionResponse);

    const botReply = analizarMensajeUsuario(userText);
    addMessage(crearMensaje('bot', botReply));

    if (botReply.includes('no capté')) {
      setTimeout(async () => {
        await simularEscribiendo(config_CHAT.timing.typingSimulation);
        addMessage(crearMensaje('bot', config_CHAT.followUpMessages.afterUnknown, { isMenuPrompt: true }));
        setActiveCategory(null);
      }, config_CHAT.timing.unknownFollowUpDelay);
    } else {
      setTimeout(() => {
        setActiveCategory(null);
      }, config_CHAT.timing.followUpDelay);
    }
  }, [inputValue, addMessage, simularEscribiendo]);

  return {
    isOpen,
    isMenuOpen,
    isTyping,
    activeCategory,
    inputValue,
    messages,
    categories: categories,
    setIsMenuOpen,
    setInputValue,
    toggleChat,
    handleSelectCategory,
    handleQuestionClick,
    handleSendMessage,
  };
};
