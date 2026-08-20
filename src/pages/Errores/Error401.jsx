import React from 'react';
import ErrorBase from './ErrorBase';

const Error401 = () => (
  <ErrorBase
    code={401}
    title="No autorizado"
    description="Necesitas iniciar sesión en Los Castores para acceder a esta sección. Tu sesión puede haber expirado o no has iniciado sesión aún."
    icon="fa-lock"
    logs={[
      { type: 'info', text: 'Verificando credenciales de acceso en el sistema...' },
      { type: 'error', text: 'Autenticación fallida: sesión no encontrada o expirada.' },
      { type: 'warn', text: 'Por favor inicia sesión para continuar con tu pedido.' },
    ]}
    action={{ to: '/login', label: 'Iniciar Sesión', icon: 'fa-right-to-bracket' }}
  />
);

export default Error401;
