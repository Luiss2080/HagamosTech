import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import FormularioContacto from './sections/FormularioContacto';
import ContactoModal from '../../components/Modales/ContactoModal';
import ContactService from '../../servicios/servicioContacto';

vi.mock('../../servicios/servicioContacto', () => ({
  default: { sendEmbeddedContact: vi.fn() },
}));

vi.mock('../../components/fondos/FondoTech', () => ({ default: () => null }));
vi.mock('../../components/fondos/ParticulasCirculares', () => ({ default: () => null }));
vi.mock('../../components/Modales/ModalExito', () => ({
  default: ({ isOpen, title, message, onClose }) => isOpen ? <div role="dialog"><h2>{title}</h2><p>{message}</p><button onClick={onClose}>Aceptar</button></div> : null,
}));
vi.mock('../../components/Modales/ModalError', () => ({
  default: ({ isOpen, title, message }) => isOpen ? <div role="alert"><h2>{title}</h2><p>{message}</p></div> : null,
}));

const completarFormulario = async (user, { phone = '70000000' } = {}) => {
  await user.type(screen.getByLabelText('Nombre completo'), 'Ana Pérez');
  if (phone) await user.type(screen.getByLabelText(/Celular/), phone);
  await user.type(screen.getByLabelText('Correo electrónico'), 'ana@example.com');
  await user.type(screen.getByLabelText('Mensaje'), 'Quiero consultar un proyecto web.');
};

describe('Flujos de contacto UI-4', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(window, 'open').mockImplementation(() => null);
  });
  afterEach(() => vi.restoreAllMocks());

  it('registra la consulta con la API y confirma recepción después de la respuesta', async () => {
    const user = userEvent.setup();
    ContactService.sendEmbeddedContact.mockResolvedValue({ message: 'Consulta recibida.' });
    render(<FormularioContacto />);

    await completarFormulario(user);
    await user.click(screen.getByRole('button', { name: /enviar mensaje/i }));

    await waitFor(() => expect(ContactService.sendEmbeddedContact).toHaveBeenCalledWith({
      name: 'Ana Pérez', phone: '70000000', email: 'ana@example.com', message: 'Quiero consultar un proyecto web.',
    }));
    expect(await screen.findByRole('status')).toHaveTextContent('Consulta recibida.');
    expect(screen.getByLabelText('Nombre completo')).toHaveValue('');
    expect(window.open).not.toHaveBeenCalled();
  });

  it('muestra el error de API y conserva los datos para reintentar', async () => {
    const user = userEvent.setup();
    ContactService.sendEmbeddedContact.mockRejectedValue(new Error('offline'));
    render(<FormularioContacto />);

    await completarFormulario(user, { phone: '' });
    await user.click(screen.getByRole('button', { name: /enviar mensaje/i }));

    expect(await screen.findByRole('alert')).toHaveTextContent(/no pudimos enviar/i);
    expect(screen.getByLabelText('Nombre completo')).toHaveValue('Ana Pérez');
    expect(screen.getByLabelText(/Celular/)).toHaveValue('');
  });

  it('trata como éxito la respuesta real del backend aunque no tenga status', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    ContactService.sendEmbeddedContact.mockResolvedValue({ message: 'Mensaje enviado exitosamente' });
    render(<ContactoModal isOpen onClose={onClose} />);

    const form = document.querySelector('#contactModal form');
    await user.type(form.querySelector('[name="name"]'), 'Ana Pérez');
    await user.type(form.querySelector('[name="phone"]'), '70000000');
    await user.type(form.querySelector('[name="email"]'), 'ana@example.com');
    await user.type(form.querySelector('[name="message"]'), 'Consulta de software');
    fireEvent.submit(form);

    await waitFor(() => expect(ContactService.sendEmbeddedContact).toHaveBeenCalledOnce());
    expect(await screen.findByRole('heading', { name: 'Consulta recibida' })).toBeInTheDocument();
    expect(screen.getByRole('dialog')).toHaveTextContent('Mensaje enviado exitosamente');
    expect(ContactService.sendEmbeddedContact).toHaveBeenCalledOnce();
    expect(onClose).not.toHaveBeenCalled();
  });
});
