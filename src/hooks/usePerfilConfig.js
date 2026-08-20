import { useState, useCallback } from 'react';
import apiClient from '../servicios/clienteApi';
import Cookies from 'js-cookie';
import useAuthStore from '../store/useAutenticacionStore';

const getToken = () => sessionStorage.getItem('loscatores_token') || Cookies.get('loscatores_token');

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

export function usePreferencias() {
  const [loading, setLoading] = useState(false);
  const guardar = useCallback(async (preferences) => {
    setLoading(true);
    try {
      const token = getToken();
      await apiClient.put('/perfil/preferences', preferences, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return { success: true };
    } catch {
      return { success: false, message: 'Error al guardar preferencias' };
    } finally {
      setLoading(false);
    }
  }, []);
  return { loading, guardar };
}

export function useSesiones() {
  const [sesiones, setSesiones] = useState([]);
  const [loading, setLoading] = useState(false);

  const listar = useCallback(async () => {
    setLoading(true);
    try {
      const token = getToken();
      const { data } = await apiClient.get('/perfil/sessions', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSesiones(data.data || data || []);
    } catch {
      setSesiones([]);
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

  return { sesiones, loading, listar, revocar };
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
      a.download = `loscatores_backup_${Date.now()}.json`;
      a.click();
      URL.revokeObjectURL(url);
      return { success: true };
    } catch {
      return { success: false, message: 'Error al exportar datos' };
    }
  }, []);
  return { exportar };
}
