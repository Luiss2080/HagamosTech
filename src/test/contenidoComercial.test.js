import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';

const leer = (ruta) => readFileSync(new URL(ruta, import.meta.url), 'utf8').toLowerCase();

describe('Contenido comercial veraz', () => {
  it('el catálogo contiene el acompañamiento académico y excluye los servicios no ofrecidos', () => {
    const catalogo = leer('../../docs/catalogo-servicios.md');
    expect(catalogo).toContain('mentorías académicas');
    expect(catalogo).toContain('proyectos socioformativos');
    expect(catalogo).toContain('quedan fuera de la oferta');
    expect(catalogo).toContain('n8n');
    expect(catalogo).toContain('operación/migración de servidores');
  });

  it('los mensajes compartidos no prometen atención continua ni servicios excluidos', () => {
    const mensajes = [
      leer('../../src/pages/Inicio/sections/ServiciosGrid.jsx'),
      leer('../../src/components/Layout/Header.jsx'),
      leer('../../src/components/Modales/ContactoModal.jsx'),
      leer('../../src/components/Modales/TerminosModal.jsx'),
      leer('../../src/chat/data/categorias.jsx'),
      leer('../../src/chat/data/procesamientoLenguaje.js'),
    ].join('\n');
    expect(mensajes).not.toMatch(/soporte.{0,10}24\/7|24\/7.{0,10}soporte/);
    expect(mensajes).toContain('no ofrecemos automatización de procesos');
    expect(mensajes).toContain('no ofrecemos operación de servidores');
    expect(mensajes).toContain('acompañamiento académico');
  });

  it('las promociones no publican precios, descuentos ni tiempos universales', () => {
    const promociones = leer('../../src/pages/Promociones/sections/PromoDestacada.jsx');
    expect(promociones).not.toMatch(/bs\.\s*[0-9]|-[0-9]+%|por tiempo limitado/);
    expect(promociones).toContain('se conversa');
  });
});
