import React from 'react';
import ErrorBase from './ErrorBase';

const Error404 = () => (
  <ErrorBase
    code={404}
    title="Página no encontrada"
    description="La ruta que buscas no existe en HagamosTech. Es posible que haya sido eliminada, movida o que hayas escrito mal la dirección."
    icon="fa-map-location-dot"
    logs={[
      { type: 'info', text: 'Buscando recurso en el servidor de HagamosTech...' },
      { type: 'error', text: 'URL no coincide con ninguna ruta registrada en el sistema.' },
      { type: 'warn', text: 'Redireccionando al portal de inicio automáticamente.' },
    ]}
    action={{ to: '/', label: 'Volver al Inicio', icon: 'fa-house' }}
  />
);

export default Error404;
