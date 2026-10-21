import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import AccionesEspacio from './AccionesEspacio';

describe('AccionesEspacio', () => {
  it('muestra las tres acciones directas y abre el formulario correspondiente', () => {
    const onCrear = vi.fn();
    render(<AccionesEspacio onCrear={onCrear} />);

    fireEvent.click(screen.getByRole('button', { name: 'Nuevo proyecto' }));
    expect(onCrear).toHaveBeenCalledWith('proyecto');

    fireEvent.click(screen.getByRole('button', { name: 'Nueva nota' }));
    expect(onCrear).toHaveBeenCalledWith('nota');

    fireEvent.click(screen.getByRole('button', { name: 'Nuevo recordatorio' }));
    expect(onCrear).toHaveBeenCalledWith('evento');
  });
});
