import React from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import ToolsMarquee from './ToolsMarquee';

describe('ToolsMarquee', () => {
  it('repite la lista para mantener el desplazamiento continuo sin duplicar anuncios accesibles', () => {
    const { container } = render(<ToolsMarquee items={[{ name: 'React', icon: 'fa-brands fa-react' }, { name: 'Figma', icon: 'fa-brands fa-figma' }]} label="Herramientas web" />);
    const groups = container.querySelectorAll('.tools-marquee__track > div');

    expect(screen.getByRole('region', { name: 'Herramientas web' })).toBeInTheDocument();
    expect(screen.getByRole('group', { name: 'Carrusel de herramientas' })).toBeInTheDocument();
    expect(groups).toHaveLength(2);
    expect(groups[1]).toHaveAttribute('aria-hidden', 'true');
    expect(screen.getAllByText('React')).toHaveLength(1);
    expect(container.querySelector('.tools-marquee__track').textContent).toContain('Figma');
  });
});
