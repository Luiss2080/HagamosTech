import React from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import TestimonialCarousel from './CarruselTestimonios';

describe('CarruselTestimonios', () => {
  it('muestra el título, la descripción, el usuario y los datos contextuales en la sección', () => {
    render(
      <TestimonialCarousel
        title="Ejemplos de desarrollo web"
        description="Casos ilustrativos para definir el alcance."
        testimonials={[{ name: 'Sitio corporativo', role: 'Ejemplo orientativo', text: 'Quiero presentar mis servicios.' }]}
      />,
    );

    expect(screen.getByRole('heading', { name: 'Ejemplos de desarrollo web' })).toBeInTheDocument();
    expect(screen.getByText('Casos ilustrativos para definir el alcance.')).toBeInTheDocument();
    expect(screen.getAllByLabelText('Datos orientativos del proyecto')).toHaveLength(3);
    expect(screen.getAllByLabelText('Fecha: a coordinar')).toHaveLength(3);
    expect(screen.getAllByLabelText('Hora: a coordinar')).toHaveLength(3);
    expect(screen.getAllByLabelText('Lugar o modalidad: a definir')).toHaveLength(3);
    expect(screen.getAllByRole('img', { name: 'Usuario del proyecto' })).toHaveLength(3);
    expect(screen.getAllByText('Contexto del proyecto')).toHaveLength(3);
  });
});
