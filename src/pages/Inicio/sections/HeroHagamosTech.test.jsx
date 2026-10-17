import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import HeroHagamosTech from './HeroHagamosTech';

describe('Hero de Inicio', () => {
  it('presenta las áreas reales y evita promesas abiertas', () => {
    const { container } = render(<MemoryRouter><HeroHagamosTech /></MemoryRouter>);

    expect(screen.getByRole('heading', { level: 1, name: /soluciones digitales y acompañamiento/i })).toBeInTheDocument();
    expect(screen.getByText(/sitios web y software a medida.*recursos de diseño.*procesos académicos/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Contanos qué necesitás' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Explorar áreas' })).toBeInTheDocument();
    expect(container.textContent.toLowerCase()).not.toMatch(/cualquier tipo de cliente|cualquier necesidad|eficacia: 100%/);
  });
});
