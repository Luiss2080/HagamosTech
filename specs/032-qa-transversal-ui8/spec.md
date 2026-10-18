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

| Requisito | Evidencia | Estado |
|---|---|---|
| RF-1 y RF-5 | 38 rutas con carga directa, título HagamosTech y meta descripción; sin errores JavaScript. | ✅ |
| RF-2 | Enlaces internos de Inicio, servicio web, Contacto, Privacidad y Cookies apuntan a rutas registradas. | ✅ |
| RF-3 | Inicio, servicio web, Contacto, Cookies y error 500 revisados a 390, 768 y 1280 px; sin overflow horizontal. | ✅ |
| RF-4 | El menú móvil se abre con Enter y se cierra con Escape; menú cerrado se marca `aria-hidden` y `inert`. | ✅ |
| RF-6 | Cambios limitados a QA/configuración E2E y accesibilidad del menú; páginas y secciones existentes conservadas. | ✅ |
| RF-7 | Frontend 88/88, backend 36/36, E2E 9/9; lint, build y `git diff --check` correctos. | ✅ |

## Límites de la revisión

El recorrido E2E corre en Chromium. La revisión manual de teclado no sustituye pruebas con
lector de pantalla. No se ejecutó una auditoría formal de accesibilidad ni una prueba de
carga/Lighthouse. Los textos de políticas que requieren confirmación se documentaron en
Spec 031 y siguen pendientes del negocio.

## Estado

UI-8 completada. No se encontraron errores de JavaScript ni desbordamientos en las rutas y
anchos cubiertos. El harness E2E usa puertos aislados (4401 y 44321) para evitar reutilizar
por accidente otro servidor local.
