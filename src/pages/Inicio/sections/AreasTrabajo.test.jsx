import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import AreasTrabajo from './AreasTrabajo';

describe('Áreas de trabajo en Inicio', () => {
  it('ofrece accesos a las cuatro rutas públicas vigentes', () => {
    render(<MemoryRouter><AreasTrabajo /></MemoryRouter>);

    expect(screen.getByRole('link', { name: /desarrollo digital.*explorar/i })).toHaveAttribute('href', '/que-hacemos/tecnologia');
    expect(screen.getByRole('link', { name: /acompañamiento académico.*explorar/i })).toHaveAttribute('href', '/que-hacemos/academia');
    expect(screen.getByRole('link', { name: /emprendimientos y profesionales.*explorar/i })).toHaveAttribute('href', '/que-hacemos/negocios');
    expect(screen.getByRole('link', { name: /solicitud personalizada.*explorar/i })).toHaveAttribute('href', '/que-hacemos/personalizado');
  });

  it('no promete atender cualquier necesidad ni automatizaciones', () => {
    const { container } = render(<MemoryRouter><AreasTrabajo /></MemoryRouter>);
    expect(container.textContent.toLowerCase()).not.toMatch(/cualquier necesidad|automatiz|n8n|servidores|devops/);
  });
});
