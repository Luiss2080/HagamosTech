import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('./clienteApi', () => ({
  default: { get: vi.fn(), post: vi.fn(), put: vi.fn(), delete: vi.fn() },
}));

import apiClient from './clienteApi';
import { actualizarEtapaProyecto, eliminarRegistroPersonal, guardarRegistroPersonal, listarEspacioPersonal } from './espacioPersonalApi';

describe('API del espacio personal', () => {
  beforeEach(() => vi.clearAllMocks());

  it('lee las cinco colecciones persistidas desde los endpoints autenticados', async () => {
    apiClient.get.mockResolvedValue({ data: { data: [] } });
    await expect(listarEspacioPersonal()).resolves.toEqual({ proyectos: [], notas: [], eventos: [], tareas: [], recursos: [] });
    expect(apiClient.get).toHaveBeenNthCalledWith(1, '/perfil/espacio/proyectos');
    expect(apiClient.get).toHaveBeenNthCalledWith(2, '/perfil/espacio/notas');
    expect(apiClient.get).toHaveBeenNthCalledWith(3, '/perfil/espacio/eventos');
    expect(apiClient.get).toHaveBeenNthCalledWith(4, '/perfil/espacio/tareas');
    expect(apiClient.get).toHaveBeenNthCalledWith(5, '/perfil/espacio/recursos');
  });

  it('envía recordatorios a PostgreSQL por el endpoint de eventos y limpia fechas opcionales vacías', async () => {
    const values = { titulo: 'Entrega', proyectoId: '', inicio: '2026-11-03T09:30', fin: '' };
    await guardarRegistroPersonal({ tipo: 'evento', values });
    expect(apiClient.post).toHaveBeenCalledWith('/perfil/espacio/eventos', {
      titulo: 'Entrega', proyectoId: null, inicio: new Date('2026-11-03T09:30').toISOString(), fin: null,
    });
  });

  it('actualiza y elimina por el endpoint correspondiente', async () => {
    await guardarRegistroPersonal({ tipo: 'nota', id: 12, values: { titulo: 'Idea', contenido: 'Apunte' } });
    await actualizarEtapaProyecto(4, 'progreso');
    await eliminarRegistroPersonal('eventos', 8);
    expect(apiClient.put).toHaveBeenNthCalledWith(1, '/perfil/espacio/notas/12', { titulo: 'Idea', contenido: 'Apunte' });
    expect(apiClient.put).toHaveBeenNthCalledWith(2, '/perfil/espacio/proyectos/4', { etapa: 'progreso' });
    expect(apiClient.delete).toHaveBeenCalledWith('/perfil/espacio/eventos/8');
  });

  it('crea tareas y enlaces en colecciones separadas', async () => {
    await guardarRegistroPersonal({ tipo: 'tarea', values: { titulo: 'Revisar propuesta', vencimiento: '2026-11-03' } });
    await guardarRegistroPersonal({ tipo: 'recurso', values: { titulo: 'Guía', url: 'https://example.org' } });
    expect(apiClient.post).toHaveBeenNthCalledWith(1, '/perfil/espacio/tareas', { titulo: 'Revisar propuesta', vencimiento: '2026-11-03' });
    expect(apiClient.post).toHaveBeenNthCalledWith(2, '/perfil/espacio/recursos', { titulo: 'Guía', url: 'https://example.org' });
  });
});
