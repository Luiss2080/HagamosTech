import React from 'react';
import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import ProjectPlanningSelector from './ProjectPlanningSelector';

describe('ProjectPlanningSelector', () => {
  it('actualiza el contenido al seleccionar un aspecto del proyecto', () => {
    render(<ProjectPlanningSelector />);

    expect(screen.getByRole('tab', { name: /Alcance/ })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Objetivo del proyecto');

    fireEvent.click(screen.getByRole('tab', { name: /Etapas/ }));

    expect(screen.getByRole('tab', { name: /Etapas/ })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Entregas parciales');
  });
});
