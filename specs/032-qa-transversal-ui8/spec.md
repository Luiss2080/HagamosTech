# Spec 032 — QA transversal UI-8

## Objetivo

Cerrar la actualización de interfaces con una revisión de rutas, enlaces, errores de
consola, responsive y metadatos. La revisión debe conservar las páginas, textos y estilo
visual ya establecidos; las correcciones se limitan a fallos reproducibles.

## Requisitos

- RF-1: Todas las rutas registradas del sitio y la ruta comodín cargan directamente sin
  errores de JavaScript, muestran el shell de HagamosTech y un título coherente.
- RF-2: Los enlaces internos visibles en rutas cubiertas conducen a una ruta declarada o
  a un destino intencional documentado; enlaces rotos se corrigen manteniendo su propósito.
- RF-3: En rutas representativas de inicio, servicios, contacto, cuenta y legal, anchos de
  390, 768 y 1280 px no producen desbordamiento horizontal de documento ni controles
  esenciales tapados por widgets fijos.
- RF-4: El teclado permite abrir/cerrar el menú principal y alcanzar enlaces de navegación;
  foco visible en los elementos interactivos revisados.
- RF-5: Las rutas conocidas definen título y descripción SEO, y las rutas inexistentes
  reciben el fallback definido.
- RF-6: Los defectos encontrados se corrigen en componentes existentes, sin eliminar
  secciones ni cambiar la arquitectura visual o la oferta.
- RF-7: Se ejecutan pruebas frontend, backend, E2E, lint y build; resultados y límites de
  entorno se documentan en esta spec y el roadmap.

## Fuera de alcance

- Reescribir políticas legales, ampliar servicios, cambiar flujos comerciales, APIs, base
  de datos o dependencias.
- Rediseñar páginas completas o retirar rutas por parecer internas sin decisión confirmada.
- Auditoría legal formal, evaluación con lectores de pantalla y pruebas de carga.

## Plan de verificación

1. Ejecutar E2E existente para obtener una línea base y reparar expectativas obsoletas solo
   si el producto y la fuente autorizada confirman la ruta/contenido correcto.
2. Recorrer rutas directas y revisar consola, títulos, responsive y enlaces internos.
3. Comprobar navegación por teclado y superposición de widgets en anchos objetivo.
4. Corregir defectos reproducibles con cambios acotados y añadir cobertura al harness.
5. Ejecutar frontend, backend, E2E, lint y build; documentar rutas excluidas o límites.

## Validación

Pendiente de auditoría.
