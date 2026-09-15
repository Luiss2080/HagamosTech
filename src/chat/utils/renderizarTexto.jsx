import React from 'react';

// Renderiza texto con **negritas**, [enlaces](url) y saltos de línea.
// Las negritas/enlaces heredan el color de la burbuja (oscuro o lima) para
// que siempre sean legibles.
const renderizarLinea = (texto, baseKey) => {
  const partes = [];
  const regex = /(\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*)/g;
  let ultimo = 0;
  let coincidencia;
  let i = 0;

  while ((coincidencia = regex.exec(texto)) !== null) {
    if (coincidencia.index > ultimo) {
      partes.push(texto.substring(ultimo, coincidencia.index));
    }

    if (coincidencia[2] && coincidencia[3]) {
      partes.push(
        <a
          key={`${baseKey}-a-${i++}`}
          href={coincidencia[3]}
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold underline hover:opacity-80 transition-opacity"
        >
          {coincidencia[2]}
        </a>
      );
    } else {
      partes.push(
        <strong key={`${baseKey}-b-${i++}`} className="font-extrabold">
          {coincidencia[4]}
        </strong>
      );
    }
    ultimo = regex.lastIndex;
  }

  if (ultimo < texto.length) {
    partes.push(texto.substring(ultimo));
  }

  return partes;
};

export const textRenderer = (text) => {
  if (text === null || text === undefined || text === '') return null;

  const lineas = String(text).split('\n');
  const nodos = [];

  lineas.forEach((linea, indice) => {
    if (indice > 0) nodos.push(<br key={`br-${indice}`} />);
    if (linea.trim() !== '') nodos.push(...renderizarLinea(linea, indice));
  });

  return nodos;
};

export default textRenderer;
