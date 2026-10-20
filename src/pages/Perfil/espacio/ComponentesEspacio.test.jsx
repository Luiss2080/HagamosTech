import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { SelectorFiltro } from './ComponentesEspacio';

describe('SelectorFiltro', () => {
  it('muestra opciones con la paleta de HagamosTech y permite elegirlas', () => {
    const onChange = vi.fn();
    render(<SelectorFiltro label="Etapa" value="todas" onChange={onChange} options={[{ value: 'todas', label: 'Todas las etapas' }, { value: 'progreso', label: 'En progreso' }]} />);

    fireEvent.click(screen.getByRole('button', { name: /Etapa/ }));
    const listbox = screen.getByRole('listbox', { name: 'Etapa' });
    expect(listbox).toHaveClass('bg-[#0b0e09]');
    expect(within(listbox).getByRole('option', { name: 'Todas las etapas' })).toHaveAttribute('aria-selected', 'true');
    fireEvent.click(within(listbox).getByRole('option', { name: 'En progreso' }));

    expect(onChange).toHaveBeenCalledWith('progreso');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('permite cerrar las opciones con Escape', () => {
    render(<SelectorFiltro label="Orden" value="nombre" onChange={() => {}} options={[{ value: 'nombre', label: 'Nombre A-Z' }]} />);
    fireEvent.click(screen.getByRole('button', { name: /Orden/ }));
    fireEvent.keyDown(screen.getByRole('option', { name: 'Nombre A-Z' }), { key: 'Escape' });
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });
});
