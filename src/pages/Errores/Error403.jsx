import React from 'react';
import ErrorBase from './ErrorBase';

const Error403 = () => (
  <ErrorBase
    code={403}
    title="Acceso denegado"
    description="No tienes los permisos necesarios para acceder a esta sección de HagamosTech. Contacta al administrador si crees que es un error."
    icon="fa-shield-halved"
    logs={[
      { type: 'info', text: 'Validando permisos del usuario en la plataforma...' },
      { type: 'error', text: 'Acceso denegado: privilegios insuficientes para esta ruta.' },
      { type: 'warn', text: 'Comunícate con soporte si necesitas acceder a esta sección.' },
    ]}
    action={{ to: '/', label: 'Volver al Inicio', icon: 'fa-house' }}
  />
);

export default Error403;
