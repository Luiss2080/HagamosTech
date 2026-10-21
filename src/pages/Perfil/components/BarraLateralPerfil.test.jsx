import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ProfileSidebar from './BarraLateralPerfil';

describe('BarraLateralPerfil', () => {
  it('agrupa los accesos de configuración en un desplegable cerrado inicialmente', () => {
    render(<MemoryRouter initialEntries={['/configuracion']}><ProfileSidebar /></MemoryRouter>);

    const summary = screen.getByText('Ir a configuración').closest('summary');
    const details = summary.closest('details');
    expect(details).not.toHaveAttribute('open');

    fireEvent.click(summary);

    expect(details).toHaveAttribute('open');
    const navigation = within(details).getByRole('navigation', { name: 'Accesos directos de configuración' });
    expect(within(navigation).getAllByRole('link')).toHaveLength(5);
  });
});
