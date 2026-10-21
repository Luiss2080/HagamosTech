import { describe, expect, it } from 'vitest';
import { filtrarSesionesEnfoque, formatearTiempo, resumirEnfoque } from './enfoqueUtils';

describe('estadísticas y rangos del temporizador', () => {
  const sesiones = [
    { duracionMinutos: 25, completadoEn: '2026-10-21T10:00:00.000Z' },
    { duracionMinutos: 45, completadoEn: '2026-10-10T10:00:00.000Z' },
  ];

  it('resume minutos y cantidad y filtra sesiones de los últimos siete días', () => {
    expect(resumirEnfoque(sesiones)).toEqual({ cantidad: 2, minutos: 70 });
    expect(filtrarSesionesEnfoque(sesiones, 'semana', new Date('2026-10-21T18:00:00.000Z'))).toHaveLength(1);
    expect(filtrarSesionesEnfoque(sesiones, 'hoy', new Date('2026-10-21T18:00:00.000Z'))).toHaveLength(1);
  });

  it('formatea el temporizador y limita valores negativos a cero', () => {
    expect(formatearTiempo(65)).toBe('01:05');
    expect(formatearTiempo(-3)).toBe('00:00');
  });
});
