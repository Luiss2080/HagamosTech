import React from 'react';
import ErrorBase from './ErrorBase';

const Error419 = () => (
  <ErrorBase
    code={419}
    title="Sesión expirada"
    description="Tu sesión en HagamosTech ha caducado por inactividad. Vuelve a iniciar sesión para continuar disfrutando de nuestras salteñas."
    icon="fa-clock-rotate-left"
    logs={[
      { type: 'info', text: 'Verificando validez del token de sesión activa...' },
      { type: 'error', text: 'Token CSRF inválido: la sesión ha expirado por inactividad.' },
      { type: 'warn', text: 'Inicia sesión nuevamente para retomar tu experiencia.' },
    ]}
    action={{ to: '/login', label: 'Iniciar Sesión', icon: 'fa-right-to-bracket' }}
  />
);

export default Error419;
