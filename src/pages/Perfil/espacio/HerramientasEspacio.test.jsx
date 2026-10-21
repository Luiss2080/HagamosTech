import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import TareasPanel from './TareasPanel';
import BibliotecaPanel from './BibliotecaPanel';

describe('herramientas nuevas del espacio personal', () => {
  it('muestra tareas y permite completar una desde su fila', () => {
    const onEstado = vi.fn();
    const onCrear = vi.fn();
    render(<TareasPanel tareas={[{ id: 1, titulo: 'Preparar entrega', prioridad: 'alta', estado: 'pendiente' }]} proyectos={[]} onCrear={onCrear} onEditar={() => {}} onEliminar={() => {}} onEstado={onEstado} />);
    fireEvent.click(screen.getByRole('button', { name: 'Nueva tarea' }));
    expect(onCrear).toHaveBeenCalledOnce();
    fireEvent.click(screen.getByRole('button', { name: 'Completar Preparar entrega' }));
    expect(onEstado).toHaveBeenCalledWith(expect.objectContaining({ id: 1 }), 'completada');
  });

  it('ofrece guardar enlaces y abre los recursos en una pestaña segura', () => {
    const onCrear = vi.fn();
    render(<BibliotecaPanel recursos={[{ id: 2, titulo: 'Documentación', url: 'https://example.org', etiquetas: 'web, docs' }]} onCrear={onCrear} onEditar={() => {}} onEliminar={() => {}} />);
    expect(screen.getByRole('link', { name: 'Abrir Documentación en otra pestaña' })).toHaveAttribute('rel', 'noreferrer');
    fireEvent.click(screen.getByRole('button', { name: 'Guardar enlace' }));
    expect(onCrear).toHaveBeenCalledOnce();
  });
});
