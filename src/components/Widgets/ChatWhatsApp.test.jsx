import React from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ChatWhatsApp from './ChatWhatsApp';

describe('Contacto por WhatsApp', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('explica el envío externo y abre WhatsApp con la consulta escrita', async () => {
    const user = userEvent.setup();
    const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null);

    render(<ChatWhatsApp />);
    await user.click(screen.getByRole('button', { name: 'Abrir contacto por WhatsApp' }));

    expect(await screen.findByRole('dialog', { name: 'Contacto por WhatsApp' })).toBeInTheDocument();
    expect(screen.getByText(/se abrirá WhatsApp para que revises y envíes el mensaje/i)).toBeInTheDocument();
    expect(screen.queryByText(/en línea|escribiendo/i)).not.toBeInTheDocument();

    await user.type(screen.getByRole('textbox', { name: 'Tu consulta' }), 'Necesito una página web');
    await user.click(screen.getByRole('button', { name: 'Continuar a WhatsApp' }));

    expect(openSpy).toHaveBeenCalledWith(
      'https://api.whatsapp.com/send?phone=59161320004&text=Necesito%20una%20p%C3%A1gina%20web',
      '_blank',
      'noopener,noreferrer'
    );
  });

  it('cierra con Escape y devuelve el foco al botón que abre el panel', async () => {
    const user = userEvent.setup();
    render(<ChatWhatsApp />);

    const trigger = screen.getByRole('button', { name: 'Abrir contacto por WhatsApp' });
    await user.click(trigger);
    expect(await screen.findByRole('dialog', { name: 'Contacto por WhatsApp' })).toBeInTheDocument();

    await user.keyboard('{Escape}');

    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
    await waitFor(() => expect(screen.getByRole('button', { name: 'Abrir contacto por WhatsApp' })).toHaveFocus());
  });
});
