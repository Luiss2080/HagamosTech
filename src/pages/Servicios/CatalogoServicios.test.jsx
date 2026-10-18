import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import CatalogoServicios from './CatalogoServicios';

describe('Páginas complementarias del catálogo', () => {
  it('muestra nombres y copy provenientes del catálogo seleccionado', () => {
    render(
      <MemoryRouter>
        <CatalogoServicios
          categorias={['emprendedores']}
          etiqueta="Emprendimientos"
          titulo="Servicios para negocios"
          descripcion="Diseño y recursos digitales."
        />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: 'Servicios para negocios' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Creación de Marca y Branding Básico' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Catálogos Digitales para Emprendimientos' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Consultar este servicio' })).toHaveAttribute('href', '/contactanos');
  });

  it('combina categorías sin duplicar fuentes de servicios', () => {
    render(
      <MemoryRouter>
        <CatalogoServicios
          categorias={['emprendedores', 'web']}
          etiqueta="Emprendimientos"
          titulo="Presencia digital"
          descripcion="Diseño y páginas web."
        />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: 'Publicidad para Fechas Especiales' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Páginas Web Empresariales' })).toBeInTheDocument();
  });
});
