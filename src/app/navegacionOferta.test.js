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

  it('el menú y las áreas públicas no enlazan a servicios retirados', () => {
    const header = leer('../components/Layout/Header.jsx');
    const areas = leer('../pages/Inicio/sections/AreasTrabajo.jsx');
    for (const texto of [header, areas]) {
      expect(texto).not.toContain('/servicios/automatizacion');
      expect(texto).not.toContain('/servicios/inteligencia-artificial');
    }
  });

  it('Inicio no carga carruseles de tecnologías presentados como casos o novedades', () => {
    const inicio = leer('../pages/Inicio/Inicio.jsx');
    expect(inicio).not.toContain('institucionescarrusel');
    expect(inicio).not.toContain('novedadescarrusel');
  });

  it('las cuatro áreas públicas corresponden a rutas declaradas y el copy no promete alcance ilimitado', () => {
    const app = leer('./App.jsx');
    const header = leer('../components/Layout/Header.jsx');
    const footer = leer('../components/Layout/Footer.jsx');
    const areas = leer('../pages/Inicio/sections/AreasTrabajo.jsx');

    for (const ruta of [
      '/que-hacemos/tecnologia',
      '/que-hacemos/academia',
      '/que-hacemos/negocios',
      '/que-hacemos/personalizado',
    ]) {
      expect(areas).toContain(ruta);
      expect(app).toContain(ruta);
    }
    for (const texto of [header, footer, areas]) {
      expect(texto).not.toMatch(/cualquier cliente|cualquier proyecto|cualquier necesidad/);
    }
  });
});
