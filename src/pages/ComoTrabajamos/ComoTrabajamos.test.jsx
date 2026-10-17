import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import ComoTrabajamos from './ComoTrabajamos';

describe('Proceso de consulta UI-4', () => {
  it('explica revisión y acuerdo antes de proponer tiempos, presupuesto o entrega', () => {
    render(<MemoryRouter><ComoTrabajamos /></MemoryRouter>);

    expect(screen.getByText(/revisamos la solicitud, su contexto/i)).toBeInTheDocument();
    expect(screen.getByText(/los tiempos y el presupuesto se estiman después de revisar el proyecto/i)).toBeInTheDocument();
    expect(screen.getByText(/según el alcance acordado/i)).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: /contanos qué necesitás|comenzar ahora/i })).toHaveLength(2);
  });
});
