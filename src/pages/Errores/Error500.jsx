import React from 'react';
import ErrorBase from './ErrorBase';

const Error500 = () => (
  <ErrorBase
    code={500}
    title="Error del servidor"
    description="No pudimos completar esta solicitud. Intentá nuevamente más tarde o contactanos si el problema continúa."
    icon="fa-server"
    logs={[
      { type: 'info', text: 'Revisá tu conexión e intentá nuevamente.' },
      { type: 'error', text: 'No se pudo completar la solicitud.' },
      { type: 'warn', text: 'El equipo técnico fue notificado. Por favor intenta más tarde.' },
    ]}
    action={{ to: '/', label: 'Volver al Inicio', icon: 'fa-house' }}
  />
);

export default Error500;
