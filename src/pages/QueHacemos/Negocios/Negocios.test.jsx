import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import Negocios from './Negocios';

describe('Ruta para emprendimientos y profesionales', () => {
  it('reúne categorías vigentes del catálogo y conserva consulta a contacto', () => {
    render(<MemoryRouter><Negocios /></MemoryRouter>);

    expect(screen.getByRole('heading', { name: 'Diseño, presencia digital y desarrollo profesional' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Creación de Marca y Branding Básico' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Currículum Profesional y CV Optimizado ATS' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Logos e Identidad Visual (Isologotipos)' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Páginas Web Empresariales' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Consultar este servicio' })).toHaveAttribute('href', '/contactanos');
  });
});
