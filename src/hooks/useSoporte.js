import { useState, useCallback } from 'react';
import apiClient from '../servicios/clienteApi';
import Cookies from 'js-cookie';

const getToken = () => sessionStorage.getItem('hagamostech_token') || Cookies.get('hagamostech_token');

export function useTickets() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);

  const listar = useCallback(async () => {
    setLoading(true);
    try {
      const token = getToken();
      const { data } = await apiClient.get('/soporte/tickets', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTickets(data.data || data.tickets || data || []);
      return data.data || data.tickets || data || [];
    } catch {
      setTickets([]);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const crear = useCallback(async (asunto, categoria, prioridad, mensaje) => {
    setLoading(true);
    try {
      const token = getToken();
      const { data } = await apiClient.post('/soporte/tickets', { asunto, categoria, prioridad, mensaje }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const nuevo = data.data || data;
      setTickets(prev => [nuevo, ...prev]);
      return { success: true, ticket: nuevo };
    } catch (error) {
      return { success: false, message: error.response?.data?.mensaje || 'Error al crear ticket' };
    } finally {
      setLoading(false);
    }
  }, []);

  return { tickets, loading, listar, crear };
}

export function useChatTicket() {
  const [isTyping, setIsTyping] = useState(false);

  const enviarMensaje = useCallback(async (ticketId, texto) => {
    try {
      const token = getToken();
      const { data } = await apiClient.post(`/soporte/tickets/${ticketId}/mensaje`, { mensaje: texto }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const msgUser = data.mensaje || { sender: 'user', text: texto, time: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }) };
      return { success: true, mensaje: msgUser };
    } catch {
      return { success: false };
    }
  }, []);

  const simularRespuesta = useCallback((ticketId) => {
    setIsTyping(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        setIsTyping(false);
        const replies = [
          'El equipo de ingeniería ya está revisando las trazas de logs del sistema.',
          'Gracias por la información. He escalado esto al departamento encargado.',
          'Confirmamos que la incidencia ha sido resuelta. Si experimentas algún otro percance, no dudes en escribirnos.',
          'He comprobado el estado de tu pedido y ya se encuentra despachado.'
        ];
        const texto = replies[Math.floor(Math.random() * replies.length)];
        resolve({ sender: 'support', text: texto, time: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }) });
      }, 2000);
    });
  }, []);

  return { isTyping, enviarMensaje, simularRespuesta };
}

export function useCalificarTicket() {
  const calificar = useCallback(async (ticketId, estrellas) => {
    try {
      const token = getToken();
      await apiClient.post(`/soporte/tickets/${ticketId}/calificar`, { estrellas }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return { success: true };
    } catch {
      return { success: false };
    }
  }, []);
  return { calificar };
}
