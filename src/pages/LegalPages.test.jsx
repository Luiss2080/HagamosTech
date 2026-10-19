import React from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PrivacidadPagina from './Privacidad/PrivacidadPagina';
import TerminosPagina from './Terminos/TerminosPagina';
import CookiesPagina from './Cookies/CookiesPagina';

const renderPage = (Page, path) => render(
  <MemoryRouter initialEntries={[path]}>
    <Page />
  </MemoryRouter>,
);

describe('Vistas legales', () => {
  it('presenta Privacidad con su identidad y contenido legible', () => {
    const { container } = renderPage(PrivacidadPagina, '/privacidad');
    expect(container.querySelector('#privacidad-page')).toHaveClass('legal-page');
    expect(screen.getByRole('heading', { level: 1, name: /Política de Privacidad/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Datos que recopilamos/i })).toBeInTheDocument();
  });

  it('presenta Términos con sus condiciones y navegación por cláusulas', () => {
    const { container } = renderPage(TerminosPagina, '/terminos');
    expect(container.querySelector('#terminos-page')).toHaveClass('legal-page');
    expect(screen.getByRole('heading', { level: 1, name: /Términos de Servicio/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Condiciones generales/i })).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: /Uso del sitio web/i })).toHaveLength(2);
  });

  it('presenta Cookies con su identidad y mantiene los controles de preferencias', () => {
    const { container } = renderPage(CookiesPagina, '/cookies');
    expect(container.querySelector('#cookies-page')).toHaveClass('legal-page');
    expect(screen.getByRole('heading', { level: 1, name: /Política de Cookies/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Gestioná tus cookies/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Toggle Preferencias locales' })).toBeEnabled();
  });
});
