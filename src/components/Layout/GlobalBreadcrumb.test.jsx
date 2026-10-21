import React from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import GlobalBreadcrumb from './GlobalBreadcrumb';

const renderAt = (path) => render(
  <MemoryRouter initialEntries={[path]}>
    <main>
      <section data-testid="primera-seccion" />
      <GlobalBreadcrumb />
    </main>
  </MemoryRouter>,
);

describe('GlobalBreadcrumb', () => {
  it('muestra la ubicación actual al inicio de las vistas y enlaces a rutas superiores válidas', () => {
    renderAt('/sobre-nosotros/mision-vision');

    const section = screen.getByTestId('primera-seccion');
    const navigation = within(section).getByRole('navigation', { name: 'Migas de pan' });
    expect(within(navigation).getByRole('link', { name: 'Ir al inicio' })).toHaveAttribute('href', '/');
    expect(within(navigation).getByRole('link', { name: 'Sobre nosotros' })).toHaveAttribute('href', '/sobre-nosotros');
    expect(within(navigation).getByText('Misión y visión')).toHaveAttribute('aria-current', 'page');
    expect(navigation.parentElement).toHaveClass('relative');
    expect(navigation.parentElement).not.toHaveClass('absolute');
  });

  it.each(['/perfil', '/configuracion'])('deja espacio bajo el encabezado en %s', (path) => {
    renderAt(path);

    const section = screen.getByTestId('primera-seccion');
    const navigation = within(section).getByRole('navigation', { name: 'Migas de pan' });
    expect(navigation.parentElement).toHaveClass('pt-3', 'sm:pt-4');
  });

  it('baja las migas en las vistas públicas', () => {
    renderAt('/sobre-nosotros');

    const section = screen.getByTestId('primera-seccion');
    const navigation = within(section).getByRole('navigation', { name: 'Migas de pan' });
    expect(navigation.parentElement).toHaveClass('pt-16', 'sm:pt-20');
  });

  it('no muestra la miga de pan en la portada', () => {
    renderAt('/');

    expect(screen.queryByRole('navigation', { name: 'Migas de pan' })).not.toBeInTheDocument();
  });
});
