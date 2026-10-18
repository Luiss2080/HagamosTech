import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, beforeEach } from 'vitest';
import ServiceCardsCarousel from './ServiceCardsCarousel';

const items = [
  { title: 'Planificación', desc: 'Acordar el objetivo.', image: '/plan.webp' },
  { title: 'Diseño', desc: 'Preparar la propuesta.', image: '/diseno.webp' },
  { title: 'Desarrollo', desc: 'Construir lo acordado.', image: '/desarrollo.webp' },
  { title: 'Entrega', desc: 'Presentar el resultado.', image: '/entrega.webp' },
];

describe('ServiceCardsCarousel', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'innerWidth', { configurable: true, value: 1440 });
  });

  it('mantiene tres tarjetas visibles y permite recorrer las restantes', () => {
    const { container } = render(<ServiceCardsCarousel items={items} label="Etapas del proyecto" />);
    const track = container.querySelector('.flex.items-stretch');

    expect(screen.getByRole('region', { name: 'Etapas del proyecto' })).toBeInTheDocument();
    expect(screen.getAllByRole('img')).toHaveLength(4);
    expect(track.style.width).toBe('133.33333333333334%');
    expect(track.style.transform).toBe('translateX(-0%)');

    fireEvent.click(screen.getByRole('button', { name: 'Ver más tarjetas' }));

    expect(track.style.transform).toBe('translateX(-25%)');
    expect(screen.getByRole('heading', { name: 'Entrega' })).toBeInTheDocument();
  });

  it('muestra imágenes para cada tarjeta de servicio', () => {
    render(<ServiceCardsCarousel items={items} />);

    expect(screen.getAllByRole('img').map((image) => image.getAttribute('src'))).toEqual(
      items.map((item) => item.image)
    );
  });

  it.each([
    { width: 375, trackWidth: '400%', dotCount: 4 },
    { width: 768, trackWidth: '200%', dotCount: 3 },
    { width: 1440, trackWidth: '133.33333333333334%', dotCount: 2 },
  ])('adapta el carrusel a $width px de ancho', ({ width, trackWidth, dotCount }) => {
    Object.defineProperty(window, 'innerWidth', { configurable: true, value: width });
    const { container } = render(<ServiceCardsCarousel items={items} />);

    expect(container.querySelector('.flex.items-stretch').style.width).toBe(trackWidth);
    expect(screen.getAllByRole('group', { name: 'Elegir tarjeta' })[0].querySelectorAll('button')).toHaveLength(dotCount);
  });
});
