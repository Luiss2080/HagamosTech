import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import renderWithProviders from './utils/renderWithProviders';
import MigasPan from '../components/func/MigasPan';

// Test de humo del harness (RF-1, RF-2): prueba que Vitest + jsdom +
// Testing Library + providers funcionan de punta a punta.
describe('Harness de tests (frontend)', () => {
  it('renderiza un componente dentro de los providers', () => {
    renderWithProviders(<div>contenido de prueba</div>, { route: '/' });
    expect(screen.getByText('contenido de prueba')).toBeInTheDocument();
  });

  it('MigasPan muestra el badge de contacto en /contactanos', () => {
    renderWithProviders(<MigasPan />, { route: '/contactanos' });
    expect(screen.getByText(/Contacto Oficial HAGAMOSTECH/i)).toBeInTheDocument();
  });
});
