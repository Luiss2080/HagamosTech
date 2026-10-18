import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import PromocionesPagina from './PromocionesPagina';

describe('Propuesta de proyecto', () => {
  it('explica cómo se acuerdan alcance, tiempos y presupuesto sin inventar precios', () => {
    render(
      <MemoryRouter>
        <PromocionesPagina />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: /una propuesta clara antes de empezar/i })).toBeInTheDocument();
    expect(screen.getByText(/el costo depende del servicio, el alcance y los entregables/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Solicitar propuesta' })).toHaveAttribute('href', '/contactanos');
    expect(screen.queryByText(/Bs\.|suscripción|descuento|plan de soporte/i)).not.toBeInTheDocument();
  });
});
