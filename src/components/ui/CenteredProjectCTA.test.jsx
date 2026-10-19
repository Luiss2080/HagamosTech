import React from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import CenteredProjectCTA from './CenteredProjectCTA';

describe('CenteredProjectCTA', () => {
  it('muestra el CTA compartido verde, compacto y con título y descripción', () => {
    const { container } = render(<CenteredProjectCTA title="Hablemos del proyecto" description="Revisamos el alcance contigo." />);
    const section = container.querySelector('section');

    expect(screen.getByRole('heading', { name: 'Hablemos del proyecto' })).toBeInTheDocument();
    expect(screen.getByText('Revisamos el alcance contigo.')).toBeInTheDocument();
    expect(section).toHaveClass('overflow-hidden');
    expect(section.querySelector('[class*="group/cta"]')).toHaveClass('from-[#B8F34D]');
    expect(section.querySelector('[class*="group/cta"]')).toHaveClass('py-8');
    expect(section.querySelector('svg')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Consultar mi proyecto/i })).toHaveAttribute('href', 'https://wa.me/59161320004');
  });
});
