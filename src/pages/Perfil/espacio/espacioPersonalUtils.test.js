import { describe, expect, it } from 'vitest';
import { fechaLocal, filtrarEventos, filtrarNotas, filtrarProyectos, obtenerDiasDelCalendario } from './espacioPersonalUtils';

describe('filtros del espacio personal', () => {
  it('busca proyectos por título, categoría o descripción sin distinguir acentos ni mayúsculas', () => {
    const projects = [
      { id: 1, titulo: 'Portal Académico', categoria: 'Estudio', descripcion: 'Plan semestral', etapa: 'idea' },
      { id: 2, titulo: 'Sitio personal', categoria: 'Diseño', descripcion: 'Portafolio', etapa: 'progreso' },
    ];
    expect(filtrarProyectos(projects, 'academico', 'todas').map(({ id }) => id)).toEqual([1]);
    expect(filtrarProyectos(projects, '', 'progreso').map(({ id }) => id)).toEqual([2]);
    expect(filtrarProyectos(projects, 'PORTAFOLIO', 'progreso').map(({ id }) => id)).toEqual([2]);
  });

  it('busca notas y permite separar las notas generales de las asociadas a proyectos', () => {
    const notes = [
      { id: 1, titulo: 'Ideas', contenido: 'Aplicación académica', proyectoId: 7 },
      { id: 2, titulo: 'Pendientes', contenido: 'Llamar al equipo', proyectoId: null },
    ];
    expect(filtrarNotas(notes, 'academica', 'todas').map(({ id }) => id)).toEqual([1]);
    expect(filtrarNotas(notes, '', 'generales').map(({ id }) => id)).toEqual([2]);
    expect(filtrarNotas(notes, '', '7').map(({ id }) => id)).toEqual([1]);
  });

  it('filtra recordatorios de hoy y siete días en orden cronológico', () => {
    const hoy = new Date(2026, 9, 20, 10);
    const eventos = [
      { id: 3, inicio: new Date(2026, 9, 24, 9) },
      { id: 2, inicio: new Date(2026, 9, 20, 15) },
      { id: 1, inicio: new Date(2026, 9, 19, 23) },
      { id: 4, inicio: new Date(2026, 9, 28, 9) },
    ];
    expect(filtrarEventos(eventos, 'hoy', hoy).map(({ id }) => id)).toEqual([2]);
    expect(filtrarEventos(eventos, 'semana', hoy).map(({ id }) => id)).toEqual([2, 3]);
    expect(filtrarEventos(eventos, 'todos', hoy).map(({ id }) => id)).toEqual([2, 3, 4]);
  });

  it('construye una cuadrícula mensual completa de seis semanas', () => {
    const days = obtenerDiasDelCalendario(new Date(2026, 9, 1));
    expect(days).toHaveLength(42);
    expect(fechaLocal(days[0])).toBe('2026-09-27');
    expect(fechaLocal(days.at(-1))).toBe('2026-11-07');
  });
});
