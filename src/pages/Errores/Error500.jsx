import React from 'react';
import ErrorBase from './ErrorBase';

const Error500 = () => (
  <ErrorBase
    code={500}
    title="Error del servidor"
    description="Algo salió mal en los servidores de HagamosTech. Nuestro equipo técnico ya fue notificado y está trabajando para solucionarlo. ¡Vuelve pronto!"
    icon="fa-server"
    logs={[
      { type: 'info', text: 'Intentando conectar con los servidores de HagamosTech...' },
      { type: 'error', text: 'Error interno del servidor: respuesta inesperada del backend.' },
      { type: 'warn', text: 'El equipo técnico fue notificado. Por favor intenta más tarde.' },
    ]}
    action={{ to: '/', label: 'Volver al Inicio', icon: 'fa-house' }}
  />
);

export default Error500;
