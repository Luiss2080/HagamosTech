import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import ProyectosPanel from './ProyectosPanel';
import NotasPanel from './NotasPanel';

const acciones = { onEditar: vi.fn(), onEliminar: vi.fn(), onCambiarEtapa: vi.fn() };

describe('paneles de organización personal', () => {
  it('deja la creación en el menú central y permite personalizar la vista de proyectos', () => {
    render(<ProyectosPanel proyectos={[]} {...acciones} />);
    expect(screen.queryByRole('button', { name: 'Nuevo proyecto' })).not.toBeInTheDocument();
    const lista = screen.getByRole('button', { name: 'Vista de lista' });
    fireEvent.click(lista);
    expect(lista).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('button', { name: 'Vista de tarjetas' })).toHaveAttribute('aria-pressed', 'false');
  });

  it('evita duplicar la acción para crear notas dentro del panel', () => {
    render(<NotasPanel notas={[]} proyectos={[]} onEditar={vi.fn()} onEliminar={vi.fn()} />);
    expect(screen.queryByRole('button', { name: 'Nueva nota' })).not.toBeInTheDocument();
  });
});
