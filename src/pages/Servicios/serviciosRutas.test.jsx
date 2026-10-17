import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import PaginasWeb from './DesarrolloWeb/PaginasWeb';
import SistemasApps from './SistemasApps/SistemasApps';
import Negocio from './Negocio/Negocio';
import Academico from './Academico/Academico';
import Empleo from './Empleo/Empleo';
import DisenoGrafico from './DisenoGrafico/DisenoGrafico';

const paginas = [
  ['desarrollo web', PaginasWeb, 'Tu presencia digital, hecha a la medida', 5],
  ['sistemas y software', SistemasApps, 'Software que responde a una necesidad concreta', 2],
  ['emprendimientos', Negocio, 'Dale forma y presencia a tu negocio', 5],
  ['acompañamiento académico', Academico, 'Acompañamiento académico para avanzar con claridad', 9],
  ['empleo', Empleo, 'Presentá tu experiencia con claridad', 6],
  ['diseño gráfico', DisenoGrafico, 'Diseño para comunicar tus ideas', 5],
];

describe('Rutas de servicios UI-3', () => {
  it.each(paginas)('%s muestra su encabezado, tarjetas del catálogo y consultas', (_nombre, Pagina, titulo, cantidad) => {
    const { container } = render(<MemoryRouter><Pagina /></MemoryRouter>);

    expect(screen.getByRole('heading', { level: 1, name: titulo })).toBeInTheDocument();
    expect(container.querySelectorAll('main article')).toHaveLength(cantidad);
    const enlacesConsulta = screen.getAllByRole('link', { name: /consultar|contanos/i });
    expect(enlacesConsulta.length).toBeGreaterThanOrEqual(2);
    expect(enlacesConsulta.every((enlace) => enlace.getAttribute('href') === '/contactanos')).toBe(true);
  });

  it('hace visible el criterio de viabilidad en web y software', () => {
    const { unmount } = render(<MemoryRouter><PaginasWeb /></MemoryRouter>);
    expect(screen.getByText(/tiendas, pagos en línea y sus proveedores se evalúan por separado/i)).toBeInTheDocument();
    unmount();

    render(<MemoryRouter><SistemasApps /></MemoryRouter>);
    expect(screen.getByText(/los ejemplos orientan la conversación, no son paquetes listos/i)).toBeInTheDocument();
  });
});
