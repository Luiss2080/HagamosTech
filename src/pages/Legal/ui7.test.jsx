import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import Error500 from '../Errores/Error500';
import Error401 from '../Errores/Error401';
import NavigationDocumentosLegales from './NavigationDocumentosLegales';
import TiposCookies from '../Cookies/sections/TiposCookies';

vi.mock('../../components/fondos/FondoTech', () => ({ default: () => null }));

describe('UI-7: documentos legales y errores', () => {
    it('conserva los cuatro destinos legales e identifica el documento actual', () => {
        render(
            <MemoryRouter initialEntries={['/privacidad']}>
                <Routes>
                    <Route path="*" element={<NavigationDocumentosLegales />} />
                </Routes>
            </MemoryRouter>,
        );

        expect(screen.getByRole('navigation', { name: 'Documentos legales' })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: 'Condiciones' })).toHaveAttribute('href', '/condiciones');
        expect(screen.getByRole('link', { name: 'Privacidad' })).toHaveAttribute('aria-current', 'page');
        expect(screen.getByRole('link', { name: 'Términos' })).toHaveAttribute('href', '/terminos');
        expect(screen.getByRole('link', { name: 'Cookies' })).toHaveAttribute('href', '/cookies');
    });

    it('permite activar por teclado la tarjeta de tipos de cookies', async () => {
        const user = userEvent.setup();
        render(<MemoryRouter><TiposCookies /></MemoryRouter>);

        const tarjeta = screen.getByRole('button', { name: 'Esenciales: mostrar detalle' });
        tarjeta.focus();
        await user.keyboard('{Enter}');

        expect(screen.getByRole('button', { name: 'Esenciales: ocultar detalle' })).toHaveAttribute('aria-pressed', 'true');
    });

    it('el error 500 ofrece una explicación y recuperación sin afirmar acciones no verificadas', () => {
        render(<MemoryRouter><Error500 /></MemoryRouter>);

        expect(screen.getByRole('heading', { level: 1, name: 'Error del servidor' })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /volver al inicio/i })).toHaveAttribute('href', '/');
        expect(screen.queryByText(/equipo técnico.*notificado|está trabajando/i)).not.toBeInTheDocument();
    });

    it('el CTA de error 401 abre el modal de acceso desde una ruta válida', async () => {
        const abrirModal = vi.fn();
        window.openModal = abrirModal;
        const user = userEvent.setup();
        render(<MemoryRouter><Error401 /></MemoryRouter>);

        await user.click(screen.getByRole('link', { name: /iniciar sesión/i }));

        expect(abrirModal).toHaveBeenCalledWith('loginModal');
        expect(screen.getByRole('link', { name: /iniciar sesión/i })).toHaveAttribute('href', '/');
        delete window.openModal;
    });
});
