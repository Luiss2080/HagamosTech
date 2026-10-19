import React from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import GlobalBreadcrumb from './GlobalBreadcrumb';

const renderAt = (path) => render(
  <MemoryRouter initialEntries={[path]}>
    <GlobalBreadcrumb />
  </MemoryRouter>,
);

describe('GlobalBreadcrumb', () => {
  it('muestra la ubicación actual al inicio de las vistas y enlaces a rutas superiores válidas', () => {
    renderAt('/sobre-nosotros/mision-vision');

    const navigation = screen.getByRole('navigation', { name: 'Migas de pan' });
    expect(navigation).toHaveClass('border-b', 'h-[142px]', 'sm:h-[150px]', 'lg:h-[160px]');
    expect(within(navigation).getByRole('link', { name: 'Ir al inicio' })).toHaveAttribute('href', '/');
    expect(within(navigation).getByRole('link', { name: 'Sobre nosotros' })).toHaveAttribute('href', '/sobre-nosotros');
    expect(within(navigation).getByText('Misión y visión')).toHaveAttribute('aria-current', 'page');
  });

  it('marca Inicio como ubicación actual en la portada', () => {
    renderAt('/');

    const navigation = screen.getByRole('navigation', { name: 'Migas de pan' });
    expect(within(navigation).getByText('Inicio')).toHaveAttribute('aria-current', 'page');
  });
});
