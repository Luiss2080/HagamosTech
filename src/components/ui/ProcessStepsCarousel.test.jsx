import React from 'react';
import { beforeEach, describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import ProcessStepsCarousel from './ProcessStepsCarousel';

const items = [
  { title: 'Conversamos', desc: 'Escuchamos el objetivo.', image: '/conversamos.webp' },
  { title: 'Analizamos', desc: 'Revisamos el alcance.', image: '/analizamos.webp' },
  { title: 'Proponemos', desc: 'Acordamos los entregables.', image: '/proponemos.webp' },
  { title: 'Entregamos', desc: 'Presentamos el resultado.', image: '/entregamos.webp' },
];

describe('ProcessStepsCarousel', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'innerWidth', { configurable: true, value: 1440 });
  });

  it('conecta los pasos y permite recorrer los que no caben en escritorio', () => {
    const { container } = render(<ProcessStepsCarousel items={items} label="Camino del proyecto" />);
    const track = container.querySelector('.flex.items-stretch.transition-transform');

    expect(screen.getByRole('region', { name: 'Camino del proyecto' })).toBeInTheDocument();
    expect(container.querySelector('polyline').getAttribute('points')).toBe('16.666666666666664,21 50,79 83.33333333333334,21');
    expect(screen.getAllByRole('img')).toHaveLength(3);

    fireEvent.click(screen.getByRole('button', { name: 'Ver más pasos' }));

    expect(track.style.transform).toBe('translateX(-25%)');
    expect(screen.getByRole('heading', { name: 'Entregamos' })).toBeInTheDocument();
  });

  it('muestra un paso por vez en móvil y conserva controles accesibles', () => {
    Object.defineProperty(window, 'innerWidth', { configurable: true, value: 375 });
    const { container } = render(<ProcessStepsCarousel items={items} />);

    expect(screen.getAllByRole('img')).toHaveLength(1);
    expect(screen.getByRole('button', { name: 'Ver más pasos' })).toBeEnabled();
    expect(container.querySelector('.flex.items-stretch.transition-transform').style.width).toBe('400%');
  });
});
