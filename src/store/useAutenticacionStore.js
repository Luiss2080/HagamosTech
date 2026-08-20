import { create } from 'zustand';
import Cookies from 'js-cookie';
import apiClient from '../servicios/clienteApi';

const SESSION_TIMEOUT_MS = 60 * 60 * 1000;

const SS_TOKEN = 'loscatores_token';
const SS_ACTIVITY = 'loscatores_last_activity';
const SS_PROFILE = 'loscatores_user_profile';

const getToken = () => sessionStorage.getItem(SS_TOKEN);
const setToken = (t) => {
  if (t) { sessionStorage.setItem(SS_TOKEN, t); Cookies.set('loscatores_token', t); }
  else { sessionStorage.removeItem(SS_TOKEN); Cookies.remove('loscatores_token'); }
};
const getActivity = () => {
  const v = sessionStorage.getItem(SS_ACTIVITY);
  return v ? parseInt(v, 10) : 0;
};
const setActivity = () => sessionStorage.setItem(SS_ACTIVITY, Date.now().toString());

const LS_FOTO_BASE = 'loscatores_foto_perfil';
const LS_FOTO_LEGACY = 'loscatores_foto_perfil';
const INVITADO_KEY = 'lc_invitado';
const INVITADO_FIN_KEY = 'lc_invitado_fin';

const fotoKey = (userId) => `${LS_FOTO_BASE}_${userId}`;

const restoreFoto = (userObj) => {
  if (!userObj) return userObj;
  // La foto del servidor (cuenta) es la fuente de verdad
  if (userObj.fotoPerfil) return userObj;

  const perUserFoto = userObj.id ? localStorage.getItem(fotoKey(userObj.id)) : null;
  if (perUserFoto) return { ...userObj, fotoPerfil: perUserFoto };

  // Migración única: fotos guardadas con la clave global antigua (antes de la corrección)
  // Se "consume" la clave para que no se filtre a otro usuario que inicie sesión.
  const legacyFoto = localStorage.getItem(LS_FOTO_LEGACY);
  if (legacyFoto && userObj.id) {
    localStorage.setItem(fotoKey(userObj.id), legacyFoto);
    localStorage.removeItem(LS_FOTO_LEGACY);
    return { ...userObj, fotoPerfil: legacyFoto };
  }
  return userObj;
};

const esAccesoTotal = (user) => {
  if (!user) return false;
  if (user.rolId === 1) return true;
  const rolNombre = (user.rolNombre || '').toLowerCase();
  return /profesor|docente|profes/.test(rolNombre);
};

const useAuthStore = create((set, get) => ({
    user: null,
    isAuthenticated: false,
    loading: false,

    initSession: () => {
      const ssToken = getToken();
      const cookieToken = Cookies.get('loscatores_token');
      const token = ssToken || cookieToken;
      const lastActivity = getActivity();

      if (!token) {
      set({ user: null, isAuthenticated: false });
        return false;
      }

      const cached = sessionStorage.getItem(SS_PROFILE);
      let userFromCache = null;
      if (cached) {
        try { userFromCache = JSON.parse(cached); } catch { /* ignore parse errors */ }
      }

      if (ssToken && lastActivity) {
        const elapsed = Date.now() - lastActivity;
        if (elapsed < SESSION_TIMEOUT_MS) {
          Cookies.set('loscatores_token', token);
          setActivity();
          set({ user: restoreFoto(userFromCache), isAuthenticated: true });
          return true;
        }
        get()._destroySession();
        return false;
      }

      if (!ssToken && cookieToken) {
        setToken(cookieToken);
        setActivity();
        set({ user: restoreFoto(userFromCache), isAuthenticated: true });
        return true;
      }

      get()._destroySession();
      return false;
    },

    checkSessionTimeout: () => {
      const { isAuthenticated } = get();
      if (!isAuthenticated) return false;
      const lastActivity = getActivity();
      if (lastActivity && Date.now() - lastActivity >= SESSION_TIMEOUT_MS) {
        get()._destroySession();
        return true;
      }
      return false;
    },

    touchActivity: () => {
      setActivity();
    },
    _destroySession: () => {
      sessionStorage.removeItem(SS_TOKEN);
      sessionStorage.removeItem(SS_ACTIVITY);
      sessionStorage.removeItem(SS_PROFILE);
      Cookies.remove('loscatores_token');
      set({ user: null, isAuthenticated: false });
    },

    login: async (datos) => {
        set({ loading: true });
        try {
            const { data } = await apiClient.post('/auth/login', datos);
            if (data.requiere2fa) {
                set({ loading: false });
                return {
                    success: true,
                    requires2fa: true,
                    usuarioId: data.usuarioId,
                    primerUso: !!data.primerUso,
                    nombre: data.nombre,
                    correo: data.correo,
                    secret: data.secret || null,
                    otpauthUrl: data.otpauthUrl || null
                };
            }
            setToken(data.token_acceso);
            setActivity();
            const userData = data.usuario;
            sessionStorage.setItem(SS_PROFILE, JSON.stringify(userData));
            set({ user: restoreFoto(userData), isAuthenticated: true, loading: false });
            return { success: true };
        } catch (error) {
            set({ loading: false });
            return {
                success: false,
                message: error.response?.data?.mensaje || error.response?.data?.error || 'Error al iniciar sesión'
            };
        }
    },

    verificar2fa: async (usuarioId, codigo) => {
        set({ loading: true });
        try {
            const { data } = await apiClient.post('/auth/2fa/verificar', { usuarioId, codigo });
            setToken(data.token_acceso);
            setActivity();
            const userData = data.usuario;
            sessionStorage.setItem(SS_PROFILE, JSON.stringify(userData));
            set({ user: restoreFoto(userData), isAuthenticated: true, loading: false });
            return { success: true };
        } catch (error) {
            set({ loading: false });
            return {
                success: false,
                message: error.response?.data?.mensaje || 'El código de autenticación es incorrecto'
            };
        }
    },

    regenerarQR2FA: async (usuarioId, datos) => {
        try {
            const { data } = await apiClient.post('/auth/2fa/regenerar-qr', { usuarioId, ...datos });
            return {
                success: true,
                secret: data.secret,
                otpauthUrl: data.otpauthUrl
            };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.mensaje || error.response?.data?.error || 'No se pudo regenerar el código QR'
            };
        }
    },

    register: async (datosUsuario) => {
        set({ loading: true });
        try {
            const { data } = await apiClient.post('/auth/registro', datosUsuario);
            if (data.requiereVerificacion) {
                set({ loading: false });
                return {
                    success: true,
                    requiresVerification: true,
                    usuarioId: data.usuarioId,
                    nombre: data.nombre,
                    correo: data.correo
                };
            }
            setToken(data.token_acceso);
            setActivity();
            const userData = data.usuario;
            sessionStorage.setItem(SS_PROFILE, JSON.stringify(userData));
            set({ user: restoreFoto(userData), isAuthenticated: true, loading: false });
            return { success: true };
        } catch (error) {
            set({ loading: false });
            return {
                success: false,
                message: error.response?.data?.mensaje || error.response?.data?.error || 'Error en el registro'
            };
        }
    },

    verificarCorreo: async (usuarioId, codigo) => {
        set({ loading: true });
        try {
            const { data } = await apiClient.post('/auth/verificar-correo', { usuarioId, codigo });
            setToken(data.token_acceso);
            setActivity();
            const userData = data.usuario;
            sessionStorage.setItem(SS_PROFILE, JSON.stringify(userData));
            set({ user: restoreFoto(userData), isAuthenticated: true, loading: false });
            return { success: true };
        } catch (error) {
            set({ loading: false });
            return {
                success: false,
                message: error.response?.data?.mensaje || 'El código de verificación es incorrecto'
            };
        }
    },

    reenviarCorreo: async (usuarioId) => {
        try {
            const { data } = await apiClient.post('/auth/reenviar-correo', { usuarioId });
            return { success: true, mensaje: data.mensaje };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.mensaje || 'No se pudo reenviar el código'
            };
        }
    },

    solicitarRecuperacion: async (correo) => {
        try {
            const { data } = await apiClient.post('/auth/solicitar-recuperacion', { correo });
            return { success: true, mensaje: data.mensaje };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.mensaje || 'No se pudo enviar el enlace de recuperación'
            };
        }
    },

    restablecerContrasena: async (token, nuevaContrasena) => {
        try {
            const { data } = await apiClient.post('/auth/restablecer-contrasena', { token, nuevaContrasena });
            return { success: true, mensaje: data.mensaje };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.mensaje || 'No se pudo restablecer la contraseña'
            };
        }
    },

    logout: async () => {
        try {
            await apiClient.post('/logout');
        } catch {
            // ignore
        } finally {
            get()._destroySession();
        }
    },

    updateProfile: async (datos) => {
        set({ loading: true });
        if (datos.fotoPerfil && get().user?.id) {
            localStorage.setItem(fotoKey(get().user.id), datos.fotoPerfil);
        }
        try {
            const token = getToken() || Cookies.get('loscatores_token');
            const { data } = await apiClient.put('/perfil', datos, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (data.success) {
                const updatedUser = { ...data.data, ...datos };
                sessionStorage.setItem(SS_PROFILE, JSON.stringify(updatedUser));
                set({ user: updatedUser, loading: false });
                return { success: true };
            }
        } catch (error) {
            console.warn('API /perfil update failed, falling back to local state only.', error);
        }
        set((state) => {
            const updatedUser = { ...state.user, ...datos };
            sessionStorage.setItem(SS_PROFILE, JSON.stringify(updatedUser));
            return { user: updatedUser, loading: false };
        });
        return { success: true, message: 'Perfil actualizado localmente' };
    },

    fetchProfile: async () => {
        const cached = sessionStorage.getItem(SS_PROFILE);
        if (cached) {
            try {
                set({ user: JSON.parse(cached), isAuthenticated: true });
            } catch (e) {
                console.error('Error parsing cached profile:', e);
            }
        }
        const token = getToken() || Cookies.get('loscatores_token');
        if (!token) {
            get()._destroySession();
            return;
        }
        try {
            const { data } = await apiClient.get('/perfil');
            let finalUser = data.data;
            if (cached) {
                try {
                    const parsed = JSON.parse(cached);
                    if (parsed.id === data.data.id || parsed.correo === data.data.correo) {
                        finalUser = { ...parsed, ...data.data };
                    }
                } catch { /* ignore */ }
            }

            // Si la cuenta aún no tiene foto en el servidor pero existe una local (caché/migración),
            // se sube automáticamente para que quede guardada permanentemente en la cuenta.
            if (!finalUser.fotoPerfil && finalUser.id) {
                const localFoto = localStorage.getItem(fotoKey(finalUser.id));
                if (localFoto) {
                    try {
                        await apiClient.put('/perfil', { fotoPerfil: localFoto }, {
                            headers: { Authorization: `Bearer ${token}` }
                        });
                        finalUser = { ...finalUser, fotoPerfil: localFoto };
                    } catch (e) {
                        console.warn('No se pudo subir la foto local al servidor:', e);
                    }
                }
            }

            // Si el sistema extendió el modo invitado, reflejar la nueva fecha de vencimiento
            const finBackend = finalUser.suscripcion?.fechaFinPrueba;
            if (finBackend && localStorage.getItem(INVITADO_KEY) === 'activo') {
                const finLocal = localStorage.getItem(INVITADO_FIN_KEY);
                if (!finLocal || new Date(finBackend) > new Date(finLocal)) {
                    localStorage.setItem(INVITADO_FIN_KEY, new Date(finBackend).toISOString());
                }
            }

            set({ user: restoreFoto(finalUser), isAuthenticated: true });
            sessionStorage.setItem(SS_PROFILE, JSON.stringify(finalUser));
        } catch {
            if (!cached) {
                get()._destroySession();
            }
        }
    },

    verificarAccesoLibros: () => {
        const { user } = get();
        if (esAccesoTotal(user)) {
            return { acceso: true, razon: 'acceso_total' };
        }

        const invitado = localStorage.getItem(INVITADO_KEY);
        const finStr = localStorage.getItem(INVITADO_FIN_KEY);

        if (invitado !== 'activo' || !finStr) {
            return { acceso: false, razon: 'sin_suscripcion' };
        }

        const fin = new Date(finStr);
        const hoy = new Date();
        const diffDays = Math.ceil((fin - hoy) / (1000 * 60 * 60 * 24));

        if (isNaN(diffDays)) return { acceso: false, razon: 'sin_suscripcion' };
        if (diffDays > 0) return { acceso: true, razon: 'invitado_vigente' };
        return { acceso: false, razon: 'invitado_vencido' };
    },

    tieneAccesoLibro: (nivel, tomoNum) => {
        const { user } = get();
        if (!user) return false;

        // Admin y Docentes tienen acceso a todos los libros
        if (esAccesoTotal(user)) return true;

        // Invitado con pase activo (3 días)
        const accesoInvitado = get().verificarAccesoLibros();
        if (accesoInvitado.acceso) return true;

        // Verificar permisos específicos asignados desde el sistema
        const nivelLower = nivel.toLowerCase();
        if (nivelLower.includes('arduino')) {
            return user.permisos && user.permisos.some(p =>
                p.startsWith('Secundaria_Original_') || p.startsWith('Secundaria_Consultas_') || p.startsWith('Secundaria_Solucionario_')
            );
        }

        const prefix = nivelLower.includes('primaria') ? 'Primaria' : 'Secundaria';
        const variants = ['Original', 'Consultas', 'Solucionario'];
        return user.permisos && variants.some(v =>
            user.permisos.includes(`${prefix}_${v}_${tomoNum}`)
        );
    }
}));

export default useAuthStore;
