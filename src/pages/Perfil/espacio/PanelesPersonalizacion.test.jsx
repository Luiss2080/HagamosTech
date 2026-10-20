import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import ProyectosPanel from './ProyectosPanel';
import NotasPanel from './NotasPanel';

const acciones = { onCrear: vi.fn(), onEditar: vi.fn(), onEliminar: vi.fn(), onCambiarEtapa: vi.fn() };

describe('paneles de organización personal', () => {
  it('mantiene una sola acción para crear proyectos y permite personalizar la vista', () => {
    render(<ProyectosPanel proyectos={[]} {...acciones} />);
    expect(screen.getAllByRole('button', { name: 'Nuevo proyecto' })).toHaveLength(1);
    const lista = screen.getByRole('button', { name: 'Vista de lista' });
    fireEvent.click(lista);
    expect(lista).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('button', { name: 'Vista de tarjetas' })).toHaveAttribute('aria-pressed', 'false');
  });

  it('mantiene una sola acción para crear notas', () => {
    render(<NotasPanel notas={[]} proyectos={[]} onCrear={vi.fn()} onEditar={vi.fn()} onEliminar={vi.fn()} />);
    expect(screen.getAllByRole('button', { name: 'Nueva nota' })).toHaveLength(1);
  });
});
