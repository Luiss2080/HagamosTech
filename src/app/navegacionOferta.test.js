import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';

const leer = (ruta) => readFileSync(new URL(ruta, import.meta.url), 'utf8').toLowerCase();

describe('Navegación de la oferta vigente', () => {
  it('no registra rutas de automatización ni inteligencia artificial', () => {
    const app = leer('./App.jsx');
    expect(app).not.toContain('/servicios/automatizacion');
    expect(app).not.toContain('/servicios/inteligencia-artificial');
  });

  it('conserva rutas principales del catálogo vigente', () => {
    const app = leer('./App.jsx');
    for (const ruta of [
      '/servicios/desarrollo-web',
      '/servicios/sistemas-apps',
      '/servicios/para-tu-negocio',
      '/servicios/apoyo-academico',
      '/servicios/empleo',
      '/servicios/diseno-grafico',
    ]) {
      expect(app).toContain(ruta);
    }
  });

  it('el menú y las novedades no enlazan a servicios retirados', () => {
    const header = leer('../components/Layout/Header.jsx');
    const novedades = leer('../pages/Inicio/sections/NovedadesCarrusel.jsx');
    for (const texto of [header, novedades]) {
      expect(texto).not.toContain('/servicios/automatizacion');
      expect(texto).not.toContain('/servicios/inteligencia-artificial');
    }
  });
});
