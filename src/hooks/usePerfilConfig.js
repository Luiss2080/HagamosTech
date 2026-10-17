import { useState, useCallback } from 'react';
import apiClient from '../servicios/clienteApi';
import Cookies from 'js-cookie';
import useAuthStore from '../store/useAutenticacionStore';

const getToken = () => sessionStorage.getItem('hagamostech_token') || Cookies.get('hagamostech_token');

export function useCambioPassword() {
  const [loading, setLoading] = useState(false);
  const cambiar = useCallback(async (current, nueva, confirm) => {
    setLoading(true);
    try {
      const token = getToken();
      const { data } = await apiClient.put('/perfil/password', { current, nueva, confirm }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return { success: true, message: data.mensaje || 'Contraseña cambiada con éxito' };
    } catch (error) {
      return { success: false, message: error.response?.data?.mensaje || 'Error al cambiar contraseña' };
    } finally {
      setLoading(false);
    }
  }, []);
  return { loading, cambiar };
}

export function useSesiones() {
  const [sesiones, setSesiones] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alcance, setAlcance] = useState(null);
  const [error, setError] = useState('');

  const listar = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const token = getToken();
      const { data } = await apiClient.get('/perfil/sessions', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSesiones(data.data || data || []);
      setAlcance(data.alcance || null);
    } catch (error) {
      setSesiones([]);
      setAlcance(null);
      setError(error.response?.data?.mensaje || 'No se pudieron consultar las sesiones. Inténtalo nuevamente.');
    } finally {
      setLoading(false);
    }
  }, []);

  const revocar = useCallback(async (id) => {
    try {
      const token = getToken();
      await apiClient.delete(`/perfil/sessions/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSesiones(prev => prev.filter(s => s.id !== id));
      return { success: true };
    } catch {
      return { success: false };
    }
  }, []);

  return { sesiones, loading, alcance, error, listar, revocar };
}

export function useDosFA() {
  const [loading, setLoading] = useState(false);
  const setup = useCallback(async () => {
    setLoading(true);
    try {
      const token = getToken();
      const { data } = await apiClient.get('/perfil/2fa/setup', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (data.success) {
        return { success: true, secret: data.secret, otpauthUrl: data.otpauthUrl, enabled: !!data.enabled };
      }
      return { success: false, message: 'No se pudo generar la configuración 2FA' };
    } catch (error) {
      return { success: false, message: error.response?.data?.mensaje || 'Error al generar la configuración 2FA' };
    } finally {
      setLoading(false);
    }
  }, []);
  const toggle = useCallback(async (habilitar, codigo) => {
    setLoading(true);
    try {
      const token = getToken();
      if (habilitar) {
        await apiClient.post('/perfil/2fa/enable', { codigo }, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await apiClient.post('/perfil/2fa/disable', {}, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.mensaje || 'Error al configurar 2FA' };
    } finally {
      setLoading(false);
    }
  }, []);
  return { loading, toggle, setup };
}

export function useDesactivarCuenta() {
  const [loading, setLoading] = useState(false);
  const desactivar = useCallback(async () => {
    setLoading(true);
    try {
      const token = getToken();
      await apiClient.delete('/perfil/cuenta', {
        headers: { Authorization: `Bearer ${token}` }
      });
      useAuthStore.getState()._destroySession();
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.mensaje || 'Error al desactivar cuenta' };
    } finally {
      setLoading(false);
    }
  }, []);
  return { loading, desactivar };
}

export function useExportarDatos() {
  const exportar = useCallback(async () => {
    try {
      const token = getToken();
      const { data } = await apiClient.get('/perfil/exportar', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const json = JSON.stringify(data.data || data, null, 2);
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `hagamostech_backup_${Date.now()}.json`;
      a.click();
      URL.revokeObjectURL(url);
      return { success: true };
    } catch {
      return { success: false, message: 'Error al exportar datos' };
    }
  }, []);
  return { exportar };
}
