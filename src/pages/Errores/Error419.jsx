import React from 'react';
import ErrorBase from './ErrorBase';

const Error419 = () => (
  <ErrorBase
    code={419}
    title="Sesión expirada"
    description="No pudimos validar tu sesión. Vuelve a iniciar sesión para continuar."
    icon="fa-clock-rotate-left"
    logs={[
      { type: 'info', text: 'Verificando validez del token de sesión activa...' },
      { type: 'error', text: 'No fue posible validar la sesión actual.' },
      { type: 'warn', text: 'Inicia sesión nuevamente para retomar tu experiencia.' },
    ]}
    action={{ to: '/', label: 'Iniciar Sesión', icon: 'fa-right-to-bracket', onClick: () => window.openModal?.('loginModal') }}
  />
);

export default Error419;
