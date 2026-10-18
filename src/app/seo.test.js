import { describe, it, expect } from 'vitest';
import { tituloParaRuta, SEO_POR_DEFECTO } from './seo';

describe('tituloParaRuta (SEO)', () => {
  it('la home usa el título de marca', () => {
    expect(tituloParaRuta('/').title).toMatch(/HagamosTech/);
  });

  it('las rutas conocidas tienen título propio', () => {
    expect(tituloParaRuta('/que-hacemos/tecnologia').title).toMatch(/Tecnología/);
    expect(tituloParaRuta('/servicios/desarrollo-web').title).toMatch(/Desarrollo Web/);
    expect(tituloParaRuta('/contactanos').title).toMatch(/Contacto/);
  });

  it('las rutas hijas coinciden por prefijo', () => {
    expect(tituloParaRuta('/sobre-nosotros/historia').title).toMatch(/Sobre nosotros/);
    expect(tituloParaRuta('/perfil/compras').title).toMatch(/Mi cuenta/);
  });

  it('una ruta desconocida cae al valor por defecto', () => {
    expect(tituloParaRuta('/ruta-inexistente-xyz')).toEqual(SEO_POR_DEFECTO);
  });
});
