import { describe, it, expect } from 'vitest';
import {
  analizarMensajeUsuario,
  esRespuestaDesconocida,
  RESPUESTA_DESCONOCIDA,
} from './procesamientoLenguaje.js';

describe('NLU del asistente (Niko)', () => {
  it('responde la consulta general de servicios', () => {
    const r = analizarMensajeUsuario('¿Qué servicios ofrecen?');
    expect(r).toMatch(/áreas de solución/i);
    expect(esRespuestaDesconocida(r)).toBe(false);
  });

  it('reconoce empleo / CV', () => {
    expect(analizarMensajeUsuario('necesito un cv optimizado')).toMatch(/CV optimizado ATS/i);
  });

  it('reconoce diseño / logos', () => {
    expect(analizarMensajeUsuario('hacen logos?')).toMatch(/Logos e identidad/i);
  });

  it('reconoce web / tienda online', () => {
    expect(analizarMensajeUsuario('quiero una tienda online')).toMatch(/Tiendas online/i);
  });

  it('reconoce apoyo académico / tesis', () => {
    expect(analizarMensajeUsuario('ayuda con mi tesis')).toMatch(/Presentaciones PowerPoint|tesis/i);
  });

  it('reconoce IA / automatización', () => {
    expect(analizarMensajeUsuario('quiero automatizar procesos con ia')).toMatch(/automatización e IA/i);
  });

  it('reconoce saludos', () => {
    expect(analizarMensajeUsuario('hola niko')).toMatch(/Hola/i);
  });

  it('cae al fallback y es detectable', () => {
    const r = analizarMensajeUsuario('zxqv plm qwerty');
    expect(esRespuestaDesconocida(r)).toBe(true);
    expect(r).toBe(RESPUESTA_DESCONOCIDA);
  });
});
