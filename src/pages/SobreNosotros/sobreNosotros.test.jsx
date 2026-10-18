import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import Nosotros from './Nosotros';
import Historia from './sections/Historia';
import MisionVision from './sections/MisionVision';
import Valores from './sections/Valores';
import AreasTrabajo from './sections/VideosTikTok';

vi.mock('../../components/fondos/FondoTech', () => ({ default: () => null }));
vi.mock('../../components/fondos/ParticulasCirculares', () => ({ default: () => null }));

const secciones = [
  [Historia, 'Nuestro enfoque'],
  [MisionVision, 'Propósito y rumbo'],
  [Valores, 'Principios de trabajo'],
  [AreasTrabajo, 'Áreas que acompañamos'],
];

describe('Empresa y confianza UI-5', () => {
  it.each(secciones)('la ruta directa de %s tiene un h1 propio', (Seccion, titulo) => {
    render(<MemoryRouter><Seccion standalone /></MemoryRouter>);
    expect(screen.getByRole('heading', { level: 1, name: titulo })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /inicio/i })).toHaveAttribute('href', '/');
  });

  it('presenta el alcance general autorizado con la identidad visual de HagamosTech', () => {
    const { container } = render(<MemoryRouter><Nosotros /></MemoryRouter>);
    expect(screen.getByRole('heading', { level: 1, name: 'Somos HagamosTech' })).toBeInTheDocument();
    expect(screen.getAllByText(/desarrollo digital, diseño y acompañamiento académico/i).length).toBeGreaterThan(0);
    expect(container.firstChild).toHaveClass('bg-[#050505]');
  });

  it('muestra principios estáticos sin carrusel automático ni controles sin etiqueta', () => {
    render(<MemoryRouter><Valores /></MemoryRouter>);
    expect(screen.getByText('Claridad')).toBeInTheDocument();
    expect(screen.getByText('Acompañamiento')).toBeInTheDocument();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
    expect(screen.queryByText(/no dejamos tu problema a medias|garantizamos resultados/i)).not.toBeInTheDocument();
  });

  it('reemplaza los videos no documentados por enlaces a áreas vigentes', () => {
    render(<MemoryRouter><AreasTrabajo /></MemoryRouter>);
    expect(screen.queryByRole('iframe')).not.toBeInTheDocument();
    expect(screen.queryByText(/popular|tendencia|destacado/i)).not.toBeInTheDocument();
    const links = screen.getAllByRole('link', { name: /conocer el área/i });
    expect(links).toHaveLength(4);
    expect(links.map((link) => link.getAttribute('href'))).toEqual([
      '/que-hacemos/tecnologia',
      '/que-hacemos/academia',
      '/que-hacemos/negocios',
      '/que-hacemos/personalizado',
    ]);
  });

  it('elimina el relato de origen y las promesas universales', () => {
    render(<MemoryRouter><Historia /></MemoryRouter>);
    expect(screen.queryByText(/dos personas|sin catálogos rígidos|cualquier tipo de personas/i)).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: /contanos tu idea/i })).toHaveAttribute('href', '/contactanos');
  });
});
