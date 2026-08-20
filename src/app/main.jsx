import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import '../styles/index.css'
import { getRandomWhatsApp } from '../utils/whatsapp'
import useCarritoStore from '../store/useCarritoStore'

// Inicializar el carrito desde localStorage
useCarritoStore.getState().init();

// Global WhatsApp Rotator Interceptor
document.addEventListener('click', (e) => {
  const target = e.target.closest('a');
  if (target && target.href && (target.href.includes('61320004') || target.href.includes('wa.me'))) {
      if (target.href.includes('google.com') || target.href.includes('maps')) return; // ignore non-wa links with 61320004 if any
      e.preventDefault();
      const num = getRandomWhatsApp();
      const newHref = target.href.replace(/59161320004|61320004/g, num);
      window.open(newHref, target.target || '_blank');
  }
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
