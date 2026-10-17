import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ProcesoTrabajo from './ProcesoTrabajo';

describe('Proceso de trabajo mostrado en Inicio', () => {
  it('explica los cinco pasos registrados en el Catálogo Maestro', () => {
    render(<ProcesoTrabajo />);

    expect(screen.getByRole('heading', { name: 'De la consulta a la entrega' })).toBeInTheDocument();
    expect(screen.getAllByRole('listitem').map((item) => item.textContent)).toEqual([
      expect.stringContaining('Contanos'),
      expect.stringContaining('Analizamos'),
      expect.stringContaining('Proponemos'),
      expect.stringContaining('Desarrollamos'),
      expect.stringContaining('Entregamos'),
    ]);
  });
});
