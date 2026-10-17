import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('../servicios/clienteApi', () => ({ default: { get: vi.fn(), put: vi.fn() } }));

import apiClient from '../servicios/clienteApi';
import useAuthStore from './useAutenticacionStore';

describe('actualización del perfil', () => {
  beforeEach(() => {
    sessionStorage.clear();
    localStorage.clear();
    useAuthStore.setState({ user: { id: 5, nombre: 'Ana' }, isAuthenticated: true, isInitialized: true, loading: false, profileStatus: 'ready', profileError: '' });
    vi.clearAllMocks();
  });

  it('informa el fallo de API y conserva el perfil anterior', async () => {
    apiClient.put.mockRejectedValueOnce({ response: { status: 500, data: { error: 'Error al actualizar perfil' } } });
    const result = await useAuthStore.getState().updateProfile({ nombre: 'Ana nueva' });
    expect(result.success).toBe(false);
    expect(result.message).toBe('Error al actualizar perfil');
    expect(useAuthStore.getState().user.nombre).toBe('Ana');
  });

  it('toma la respuesta del servidor como fuente de los datos guardados', async () => {
    apiClient.put.mockResolvedValueOnce({ data: { success: true, data: { id: 5, nombre: 'Ana nueva' } } });
    const result = await useAuthStore.getState().updateProfile({ nombre: 'Ana nueva', bio: 'solo local' });
    expect(result.success).toBe(true);
    expect(useAuthStore.getState().user).toEqual({ id: 5, nombre: 'Ana nueva' });
    expect(JSON.parse(sessionStorage.getItem('hagamostech_user_profile'))).toEqual({ id: 5, nombre: 'Ana nueva' });
  });

  it('distingue un error de carga del perfil y conserva el estado para reintentar', async () => {
    sessionStorage.setItem('hagamostech_token', 'token-valido');
    apiClient.get.mockRejectedValueOnce({ response: { status: 503, data: { error: 'Servicio no disponible' } } });
    await useAuthStore.getState().fetchProfile();
    expect(useAuthStore.getState().profileStatus).toBe('error');
    expect(useAuthStore.getState().profileError).toBe('Servicio no disponible');
    expect(useAuthStore.getState().isAuthenticated).toBe(true);
  });

  it('cierra la sesión cuando el backend confirma que el token no es válido', async () => {
    sessionStorage.setItem('hagamostech_token', 'token-vencido');
    apiClient.get.mockRejectedValueOnce({ response: { status: 401, data: { mensaje: 'No autorizado' } } });
    await useAuthStore.getState().fetchProfile();
    expect(useAuthStore.getState().isAuthenticated).toBe(false);
    expect(useAuthStore.getState().profileStatus).toBe('idle');
  });
});
