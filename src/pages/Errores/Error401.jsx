import React from 'react';
import ErrorBase from './ErrorBase';

const Error401 = () => (
  <ErrorBase
    code={401}
    title="No autorizado"
    description="Necesitas iniciar sesión en HagamosTech para acceder a esta sección. Tu sesión puede haber expirado o no has iniciado sesión aún."
    icon="fa-lock"
    logs={[
      { type: 'info', text: 'Verificando credenciales de acceso en el sistema...' },
      { type: 'error', text: 'Autenticación fallida: sesión no encontrada o expirada.' },
      { type: 'warn', text: 'Inicia sesión para continuar.' },
    ]}
    action={{ to: '/', label: 'Iniciar Sesión', icon: 'fa-right-to-bracket', onClick: () => window.openModal?.('loginModal') }}
  />
);

export default Error401;
