import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { beforeEach, describe, expect, it } from 'vitest';
import RutaCuentaProtegida, { RutaComprasHeredada } from './RutaCuentaProtegida';
import useAuthStore from '../store/useAutenticacionStore';
import useModalStore from '../store/useModalStore';

const renderCuenta = () => render(
  <MemoryRouter initialEntries={['/perfil']}>
    <Routes>
      <Route path="/" element={<h1>Inicio público</h1>} />
      <Route path="/perfil" element={<RutaCuentaProtegida><h1>Datos de cuenta</h1></RutaCuentaProtegida>} />
    </Routes>
  </MemoryRouter>,
);

describe('RutaCuentaProtegida', () => {
  beforeEach(() => {
    useAuthStore.setState({ user: null, isAuthenticated: false, isInitialized: true });
    useModalStore.getState().closeAllModals();
  });

  it('redirige a Inicio y abre el acceso si no hay sesión', async () => {
    renderCuenta();
    expect(screen.getByRole('heading', { name: 'Inicio público' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Datos de cuenta' })).not.toBeInTheDocument();
    await waitFor(() => expect(useModalStore.getState().isLoginOpen).toBe(true));
  });

  it('espera a que se restaure la sesión antes de mostrar o redirigir', () => {
    useAuthStore.setState({ isInitialized: false });
    const { container } = renderCuenta();
    expect(container.querySelector('[aria-hidden="true"]')).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Inicio público' })).not.toBeInTheDocument();
    expect(useModalStore.getState().isLoginOpen).toBe(false);
  });

  it('muestra la cuenta solo cuando hay sesión autenticada', () => {
    useAuthStore.setState({ user: { id: 1, nombre: 'Ana' }, isAuthenticated: true });
    renderCuenta();
    expect(screen.getByRole('heading', { name: 'Datos de cuenta' })).toBeInTheDocument();
    expect(useModalStore.getState().isLoginOpen).toBe(false);
  });

  it('redirige la ruta heredada de compras al perfil', () => {
    useAuthStore.setState({ user: { id: 1 }, isAuthenticated: true });
    render(
      <MemoryRouter initialEntries={['/perfil/compras']}>
        <Routes>
          <Route path="/perfil" element={<h1>Mi perfil</h1>} />
          <Route path="/perfil/compras" element={<RutaComprasHeredada />} />
        </Routes>
      </MemoryRouter>,
    );
    expect(screen.getByRole('heading', { name: 'Mi perfil' })).toBeInTheDocument();
  });
});
