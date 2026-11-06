import React from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import TestimonialCarousel from './CarruselTestimonios';

describe('CarruselTestimonios', () => {
  it('muestra el título y el contenido del ejemplo sin metadatos repetidos', () => {
    render(
      <TestimonialCarousel
        title="Ejemplos de desarrollo web"
        description="Casos ilustrativos para definir el alcance."
        testimonials={[{ name: 'Sitio corporativo', role: 'Ejemplo orientativo', text: 'Quiero presentar mis servicios.' }]}
      />,
    );

    expect(screen.getByRole('heading', { name: 'Ejemplos de desarrollo web' })).toBeInTheDocument();
    expect(screen.getByText('Casos ilustrativos para definir el alcance.')).toBeInTheDocument();
    expect(screen.getAllByText('Sitio corporativo')).toHaveLength(3);
    expect(screen.getAllByText('Ejemplo orientativo')).toHaveLength(3);
    expect(screen.queryByText('Alcance por definir')).not.toBeInTheDocument();
    expect(screen.queryByText('Contexto del proyecto')).not.toBeInTheDocument();
  });
});
