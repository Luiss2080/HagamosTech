import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import ServiciosGrid from './ServiciosGrid';
import { CATEGORIES, SERVICIOS_DATA } from '../../../data/serviciosData';

describe('Explorador de servicios en Inicio', () => {
  it('expone las siete categorías del catálogo y permite explorar cada una', () => {
    render(<MemoryRouter><ServiciosGrid /></MemoryRouter>);

    expect(CATEGORIES).toHaveLength(7);
    const grupo = screen.getByRole('group', { name: 'Categorías de servicios' });
    expect(grupo.querySelectorAll('button')).toHaveLength(7);

    for (const category of CATEGORIES) {
      const button = screen.getByRole('button', { name: category.label });
      fireEvent.click(button);
      expect(button).toHaveAttribute('aria-pressed', 'true');
      expect(screen.getByRole('heading', { name: SERVICIOS_DATA[category.id][0].name })).toBeInTheDocument();
    }
  });
});
