import React from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import ComoTrabajamos from './ComoTrabajamos';

describe('ComoTrabajamos', () => {
  it('presenta la metodología obligatoria en cuatro pasos con título y descripción', () => {
    render(<ComoTrabajamos />);

    expect(screen.getByRole('heading', { name: 'En 4 simples pasos' })).toBeInTheDocument();
    expect(screen.getByText('Desde la primera conversación hasta la entrega de lo acordado.')).toBeInTheDocument();

    const steps = screen.getByRole('list', { name: 'Pasos de nuestra metodología' });
    expect(within(steps).getAllByRole('listitem')).toHaveLength(4);
    expect(within(steps).getByRole('heading', { name: 'Contanos qué necesitás' })).toBeInTheDocument();
    expect(within(steps).getByRole('heading', { name: 'Avanzamos según lo acordado' })).toBeInTheDocument();
  });
});
