import React from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import FeatureTimeline from './FeatureTimeline';

describe('FeatureTimeline', () => {
  it('presenta un título, una descripción y características conectadas con su iconografía', () => {
    const { container } = render(
      <FeatureTimeline
        title="Condiciones del proyecto"
        description="Acordamos los detalles antes de comenzar."
        items={[{ label: 'Alcance', value: 'Acordado', icon: <span>Icono</span> }]}
      />,
    );

    expect(screen.getByRole('heading', { name: 'Condiciones del proyecto' })).toBeInTheDocument();
    expect(screen.getByText('Acordamos los detalles antes de comenzar.')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Alcance' })).toBeInTheDocument();
    expect(screen.getByText('Icono')).toBeInTheDocument();
    expect(container.querySelector('[aria-hidden="true"]')).toHaveClass('border-dashed');
  });
});
