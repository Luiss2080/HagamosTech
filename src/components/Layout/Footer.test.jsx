import React from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Footer from './Footer';

const renderFooter = () => render(
  <MemoryRouter>
    <Footer />
  </MemoryRouter>,
);

describe('Footer global', () => {
  it('muestra el mensaje, las áreas solicitadas y sus enlaces', () => {
    renderFooter();

    expect(screen.getByText(/Transformamos problemas, necesidades e ideas en soluciones reales usando tecnología/)).toBeInTheDocument();

    const solutions = screen.getByRole('heading', { name: 'Soluciones' }).parentElement;
    expect(within(solutions).getByRole('link', { name: 'Tecnología' })).toHaveAttribute('href', '/que-hacemos/tecnologia');
    expect(within(solutions).getByRole('link', { name: 'Negocios' })).toHaveAttribute('href', '/que-hacemos/negocios');

    const about = screen.getByRole('heading', { name: 'Nosotros' }).parentElement;
    expect(within(about).getByRole('link', { name: 'Trabajá con nosotros' })).toHaveAttribute('href', '/contactanos');

    expect(screen.getByRole('link', { name: 'contacto@hagamostech.bo' })).toHaveAttribute('href', 'mailto:contacto@hagamostech.bo');
    expect(screen.getByRole('link', { name: '+591 61320004' })).toHaveAttribute('href', 'tel:+59161320004');
    expect(screen.getByRole('link', { name: 'Política de Privacidad' })).toHaveAttribute('href', '/privacidad');
    expect(screen.getByRole('link', { name: 'Términos de Servicio' })).toHaveAttribute('href', '/terminos');
    expect(screen.getByRole('link', { name: 'Cookies' })).toHaveAttribute('href', '/cookies');
  });
});
