import React from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import BreadcrumbContext from '../../components/func/BreadcrumbContext';
import Nosotros from './Nosotros';

describe('Sobre nosotros', () => {
  it('integra la presentación, misión y visión dentro de una sola sección', () => {
    render(
      <MemoryRouter initialEntries={['/sobre-nosotros']}>
        <BreadcrumbContext.Provider value>
          <Nosotros />
        </BreadcrumbContext.Provider>
      </MemoryRouter>,
    );

    const presentation = screen.getByRole('heading', { name: /Somos HagamosTech/i }).closest('section');
    expect(presentation).toBeInTheDocument();
    expect(within(presentation).getByText('Nuestra misión')).toBeInTheDocument();
    expect(within(presentation).getByText('Nuestra visión')).toBeInTheDocument();
    expect(presentation.querySelectorAll(':scope > section')).toHaveLength(0);
  });
});
