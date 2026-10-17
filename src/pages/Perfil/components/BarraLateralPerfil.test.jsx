import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import BarraLateralPerfil from './BarraLateralPerfil';
import useAuthStore from '../../../store/useAutenticacionStore';

describe('Navegación de cuenta', () => {
  it('usa solo los datos de sesión y enlaza perfil y configuración', () => {
    useAuthStore.setState({ user: { id: 3, nombre: 'María', correo: 'maria@example.com' } });
    render(<MemoryRouter><BarraLateralPerfil /></MemoryRouter>);

    expect(screen.getByText('María')).toBeInTheDocument();
    expect(screen.getByText('maria@example.com')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /mi perfil/i })).toHaveAttribute('href', '/perfil');
    expect(screen.getByRole('link', { name: /configuración/i })).toHaveAttribute('href', '/configuracion');
    expect(screen.queryByRole('link', { name: /compras|pedidos/i })).not.toBeInTheDocument();
    expect(screen.queryByText(/club hagamostech|logros académicos|usuario tech|correo@ejemplo/i)).not.toBeInTheDocument();
  });
});
