import React from 'react';
import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import ToolsMarquee from './ToolsMarquee';

describe('ToolsMarquee', () => {
  it('repite la lista para mantener el desplazamiento continuo sin duplicar anuncios accesibles', () => {
    const { container } = render(<ToolsMarquee items={[{ name: 'React', logo: 'https://example.com/react.svg', tag: 'Frontend' }, { name: 'Figma', tag: 'Diseño' }]} label="Herramientas web" />);
    const groups = container.querySelectorAll('.tech-tools-carousel__track > div');

    expect(screen.getByRole('region', { name: 'Herramientas web' })).toBeInTheDocument();
    expect(screen.getByRole('group', { name: 'Carrusel: Herramientas web' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /Mostrar (elemento anterior|siguiente elemento)/ })).not.toBeInTheDocument();
    expect(screen.getByRole('group', { name: 'Carrusel: Herramientas web' })).toHaveAttribute('tabindex', '0');
    expect(screen.getByRole('heading', { name: 'Herramientas web' })).toBeInTheDocument();
    expect(screen.getByText('Recursos que pueden evaluarse según los objetivos y el alcance acordado.')).toBeInTheDocument();
    expect(groups).toHaveLength(2);
    expect(groups[1]).toHaveAttribute('aria-hidden', 'true');
    fireEvent.click(groups[0].querySelector('button'));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'React' })).toBeInTheDocument();
    expect(screen.getByText('Su uso se define según los requisitos, el alcance y la viabilidad del proyecto.')).toBeInTheDocument();
    expect(screen.getAllByText('React')).toHaveLength(2);
    expect(container.querySelectorAll('img[alt="React logo"]')).toHaveLength(2);
    expect(container.querySelector('.tech-tools-carousel__track').textContent).toContain('Figma');
  });
});
