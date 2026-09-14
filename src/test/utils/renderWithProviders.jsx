import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

// Renderiza un componente envuelto en los providers necesarios
// (React Router). Úsalo en los tests de componentes que usen hooks de router.
export function renderWithProviders(ui, { route = '/', ...options } = {}) {
  return render(
    <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>,
    options
  );
}

export default renderWithProviders;
