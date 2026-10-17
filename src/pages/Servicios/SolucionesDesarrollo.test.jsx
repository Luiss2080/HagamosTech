import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import SolucionesDesarrollo from './SolucionesDesarrollo';

describe('Páginas de desarrollo', () => {
  it('muestra los servicios web del catálogo', () => {
    render(
      <MemoryRouter>
        <SolucionesDesarrollo
          categorias={['web']}
          etiqueta="Desarrollo web"
          titulo="Tu presencia digital"
          descripcion="Creamos páginas y experiencias web."
        />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: 'Páginas Web Empresariales' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Landing Pages y Portafolios Personales' })).toBeInTheDocument();
  });

  it('muestra software y datos sin ofrecer automatización ni servidores', () => {
    const { container } = render(
      <MemoryRouter>
        <SolucionesDesarrollo
          categorias={['software']}
          etiqueta="Desarrollo de software"
          titulo="Software a medida"
          descripcion="Desarrollo según alcance."
        />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: 'Desarrollo de Sistemas Web y Software' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Diseño y Gestión de Bases de Datos' })).toBeInTheDocument();
    expect(container.textContent.toLowerCase()).not.toMatch(/automatiz|n8n|devops|servidores/);
  });

  it('aclara que los pagos en línea y proveedores de tienda requieren evaluación aparte', () => {
    render(
      <MemoryRouter>
        <SolucionesDesarrollo
          categorias={['web']}
          etiqueta="Desarrollo web"
          titulo="Tu presencia digital"
          descripcion="Creamos páginas y experiencias web."
          notaAlcance="Tiendas y pagos se evalúan según alcance."
        />
      </MemoryRouter>
    );

    expect(screen.getByText('Tiendas y pagos se evalúan según alcance.')).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: /consultar/i }).every((link) => link.getAttribute('href') === '/contactanos')).toBe(true);
  });
});
