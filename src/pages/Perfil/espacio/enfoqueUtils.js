export const DURACIONES_ENFOQUE = [15, 25, 45, 60];
export const DURACIONES_DESCANSO = [5, 10, 15, 20];

export const filtrarSesionesEnfoque = (sesiones, rango = 'todas', ahora = new Date()) => {
  if (rango === 'todas') return sesiones;
  const inicio = new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate());
  if (rango === 'semana') inicio.setDate(inicio.getDate() - 6);
  return sesiones.filter((sesion) => new Date(sesion.completadoEn) >= inicio && new Date(sesion.completadoEn) <= ahora);
};

export const resumirEnfoque = (sesiones) => ({
  cantidad: sesiones.length,
  minutos: sesiones.reduce((total, sesion) => total + Number(sesion.duracionMinutos || 0), 0),
});

export const formatearTiempo = (segundos) => {
  const minutos = Math.floor(Math.max(0, segundos) / 60);
  const resto = Math.max(0, segundos) % 60;
  return `${String(minutos).padStart(2, '0')}:${String(resto).padStart(2, '0')}`;
};
