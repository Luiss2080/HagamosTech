import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import Condiciones from '../Condiciones/CondicionesPagina';
import ComprasPagos from './sections/ComprasPagos';
import TerminosModal from '../../components/Modales/TerminosModal';

describe('Políticas comerciales UI-9', () => {
  it('presenta condiciones flexibles y acordadas por proyecto en los documentos existentes', () => {
    render(<MemoryRouter><>
      <Condiciones />
      <ComprasPagos />
      <TerminosModal isOpen onClose={() => {}} />
    </></MemoryRouter>);

    expect(screen.getByText(/el alcance, el precio y cualquier promoción se detallan en la propuesta/i)).toBeInTheDocument();
    expect(screen.getByText(/los medios de pago, anticipos, cuotas y documentos de facturación se conversan según cada proyecto/i)).toBeInTheDocument();
    expect(screen.getByText(/revisamos contigo el avance y los compromisos de la propuesta/i)).toBeInTheDocument();
    expect(screen.queryByText(/retractación de 3 días hábiles/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/efectivo, transferencia bancaria, QR y tarjeta/i)).not.toBeInTheDocument();
  });
});
