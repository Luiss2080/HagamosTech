import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import CookiesPagina from '../Cookies/CookiesPagina';
import PrivacidadPagina from '../Privacidad/PrivacidadPagina';

describe('Políticas de privacidad y cookies UI-9', () => {
  it('describe datos y almacenamiento observados sin inventar plazos ni controles de consentimiento', () => {
    render(<MemoryRouter><>
      <PrivacidadPagina />
      <CookiesPagina />
    </></MemoryRouter>);

    expect(screen.getByText(/el formulario de contacto solicita nombre, correo, teléfono, asunto y mensaje/i)).toBeInTheDocument();
    expect(screen.getByText(/el sitio no tiene un checkout ni un formulario para ingresar tarjetas/i)).toBeInTheDocument();
    expect(screen.getByText(/no se publica un plazo automático de borrado/i)).toBeInTheDocument();
    expect(screen.getByText(/no ofrece controles de consentimiento porque no se detectaron categorías opcionales/i)).toBeInTheDocument();
    expect(screen.getByText(/no encontramos herramientas de analítica ni píxeles publicitarios/i)).toBeInTheDocument();
    expect(screen.queryByText(/5 años \(obligación fiscal\)|2 años|30 días/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/¡Preferencias guardadas!/i)).not.toBeInTheDocument();
  });
});
