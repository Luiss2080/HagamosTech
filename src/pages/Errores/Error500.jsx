import React from 'react';
import ErrorBase from './ErrorBase';

const Error500 = () => (
  <ErrorBase
    code={500}
    title="Error del servidor"
    description="Algo salió mal al procesar tu solicitud. Puedes volver a intentarlo más tarde o regresar al inicio."
    icon="fa-server"
    logs={[
      { type: 'info', text: 'Solicitud recibida por el servidor.' },
      { type: 'error', text: 'No fue posible completar la solicitud.' },
      { type: 'warn', text: 'Puedes volver a intentarlo más tarde.' },
    ]}
    action={{ to: '/', label: 'Volver al Inicio', icon: 'fa-house' }}
  />
);

export default Error500;
