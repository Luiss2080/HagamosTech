import { describe, it, expect } from 'vitest';
import { CATEGORIES, SERVICIOS_DATA } from './serviciosData';

// Integridad de la oferta respecto al Catálogo Maestro (Spec 002).
// Fuente documental: docs/catalogo-servicios.md

const CATEGORIAS_ESPERADAS = [
  'estudiantes',
  'emprendedores',
  'empleo',
  'diseno',
  'web',
  'software',
  'ia',
  'personalizado',
];

// Conteos del Catálogo Maestro: 6/6/6/5/5/3/3/1
const CONTEOS_ESPERADOS = {
  estudiantes: 6,
  emprendedores: 6,
  empleo: 6,
  diseno: 5,
  web: 5,
  software: 3,
  ia: 3,
  personalizado: 1,
};

const CAMPOS_OBLIGATORIOS = ['id', 'name', 'icon', 'category', 'shortDesc', 'cta', 'ctaLink'];

// Nombres exactos del Catálogo Maestro (docs/catalogo-servicios.md).
const NOMBRES_ESPERADOS = {
  estudiantes: [
    'Presentaciones PowerPoint e Interactivas',
    'Formato APA 7 y Documentación Técnica',
    'Infografías, Diagramas y Líneas de Tiempo',
    'Mapas Conceptuales y Portadas Académicas',
    'Simuladores Educativos y Proyectos de Redes',
    'Apoyo en Proyectos de Programación',
  ],
  emprendedores: [
    'Creación de Marca y Branding Básico',
    'Manual de Identidad Visual',
    'Menús QR y Catálogos de Productos',
    'Publicidad para Promociones y Ofertas',
    'Publicidad para Fechas Especiales',
    'Gestión de Clientes Inicial',
  ],
  empleo: [
    'Currículum Profesional y CV Optimizado ATS',
    'Optimización de Perfil de LinkedIn',
    'Cartas de Presentación y Traducción de CV',
    'Portafolios Profesionales Digitales',
    'Preparación para Entrevistas y Asesoría Laboral',
    'Certificados Digitales',
  ],
  diseno: [
    'Logos e Identidad Visual (Isologotipos)',
    'Flyers, Banners, Pancartas y Redes Sociales',
    'Packaging, Etiquetas y Catálogos Físicos',
    'Tarjetas de Presentación e Invitaciones',
    'Edición y Retoque Fotográfico',
  ],
  web: [
    'Páginas Web Empresariales',
    'Landing Pages y Portafolios Personales',
    'Tiendas Online Básicas y Sistemas de Pedidos',
    'Catálogos Digitales Online y Blogs',
    'Diseño UI/UX, Formularios y Web Responsive',
  ],
  software: [
    'Desarrollo de Sistemas Web y Software',
    'Diseño y Gestión de Bases de Datos',
    'Soporte Tecnológico y DevOps',
  ],
  ia: [
    'Integración de Soluciones con Inteligencia Artificial',
    'Automatización de Procesos Empresariales',
    'Gestión de Herramientas de Productividad',
  ],
  personalizado: ['Soluciones Personalizadas'],
};

// Términos de un vertical que ya no se ofrece.
const TERMINOS_PROHIBIDOS = [
  'salteña',
  'salteñería',
  'frapuccino',
  'cafetería',
  'arduino',
  'lego',
  'robot builder',
  'robotics academy',
  'libros',
  'tomos',
  'modo invitado',
  'primer pedido',
  'mentoría',
  'headhunting',
  'ciberseguridad',
  'erp',
];

describe('Integridad de la oferta (serviciosData)', () => {
  it('declara exactamente las 8 categorías del catálogo', () => {
    expect(Object.keys(SERVICIOS_DATA).sort()).toEqual([...CATEGORIAS_ESPERADAS].sort());
    expect(CATEGORIES.map((c) => c.id)).toEqual(CATEGORIAS_ESPERADAS);
  });

  it.each(Object.entries(CONTEOS_ESPERADOS))(
    'la categoría "%s" tiene %i servicios',
    (categoria, cantidad) => {
      expect(SERVICIOS_DATA[categoria], `falta la categoría ${categoria}`).toHaveLength(cantidad);
    }
  );

  it('todos los servicios tienen los campos obligatorios', () => {
    for (const [categoria, servicios] of Object.entries(SERVICIOS_DATA)) {
      for (const servicio of servicios) {
        for (const campo of CAMPOS_OBLIGATORIOS) {
          expect(servicio[campo], `${categoria}/${servicio.id} sin "${campo}"`).toBeTruthy();
        }
      }
    }
  });

  it('no repite ids dentro de una categoría', () => {
    for (const [categoria, servicios] of Object.entries(SERVICIOS_DATA)) {
      const ids = servicios.map((s) => s.id);
      expect(new Set(ids).size, `ids duplicados en ${categoria}`).toBe(ids.length);
    }
  });

  it('no contiene términos del vertical restaurante', () => {
    const texto = JSON.stringify(SERVICIOS_DATA).toLowerCase();
    for (const termino of TERMINOS_PROHIBIDOS) {
      expect(texto.includes(termino), `término prohibido encontrado: "${termino}"`).toBe(false);
    }
  });
});
