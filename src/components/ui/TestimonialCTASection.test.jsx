import React from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import TestimonialCTASection from './TestimonialCTASection';

describe('TestimonialCTASection', () => {
  it('une testimonios con su título, descripción y un CTA con imagen representativa', () => {
    const { container } = render(
      <TestimonialCTASection
        testimonialTitle="Ideas para tu proyecto"
        testimonialDescription="Ejemplos para conversar sobre alcance y objetivos."
        testimonials={[{ name: 'Aplicación web', role: 'Ejemplo orientativo', text: 'Quiero organizar información.' }]}
        cta={{
          title: 'Conversemos sobre tu solución',
          description: 'Revisamos el alcance antes de avanzar.',
          image: '/img/08_Cards/tecnologia-web.webp',
          imageAlt: 'Ejemplo visual de un sitio web',
        }}
      />,
    );

    expect(container.querySelectorAll('section')).toHaveLength(1);
    expect(screen.getByRole('heading', { name: 'Ideas para tu proyecto' })).toBeInTheDocument();
    expect(screen.getByText('Ejemplos para conversar sobre alcance y objetivos.')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Conversemos sobre tu solución' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Ejemplo visual de un sitio web' })).toHaveAttribute('src', '/img/08_Cards/tecnologia-web.webp');
    expect(screen.getByRole('link', { name: /Consultar mi proyecto/i })).toBeInTheDocument();
  });
});
