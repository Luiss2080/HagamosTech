# Spec 002 — Identidad y oferta veraz

## Contexto y objetivo
La plataforma dice dos cosas distintas a la vez: el `Header.jsx` y
`src/data/serviciosData.js` venden servicios de tecnología, pero el `README.md` y
`src/pages/Servicios/README.md` describen una salteñería. Además hay un typo (`Óóptimo`) y la
oferta no tiene ninguna prueba que la ancle al Catálogo Maestro. Esta spec declara una única
fuente de verdad de la oferta, la blinda con tests y alinea la documentación con lo que el
negocio realmente brinda.

## Usuarios / actores
- Visitantes y clientes que leen la oferta.
- Desarrolladores y agentes que editan el catálogo.

## Historias de usuario
- H1: Como cliente quiero ver la oferta real de tecnología para saber qué me ofrece HagamosTech.
- H2: Como desarrollador quiero que un test falle si la oferta se desvía del Catálogo Maestro.
- H3: Como nuevo integrante quiero leer un README que describa el proyecto real.

## Requisitos funcionales (criterios de aceptación en EARS)

### Fuente única
- RF-1: EL SISTEMA tomará `src/data/serviciosData.js` como única fuente de la oferta publicada.
- RF-2: EL SISTEMA expondrá exactamente 8 categorías: `estudiantes`, `emprendedores`,
  `empleo`, `diseno`, `web`, `software`, `ia`, `personalizado`.
- RF-3: EL SISTEMA mantendrá los conteos del Catálogo Maestro: 6/6/6/5/5/3/3/1 servicios por
  categoría.
- RF-4: EL SISTEMA garantizará que cada servicio tenga los campos obligatorios `id`, `name`,
  `icon`, `category`, `shortDesc`, `cta`, `ctaLink`.
- RF-5: SI dos servicios comparten `id`, ENTONCES el test de integridad fallará.

### Verdad del contenido
- RF-6: EL SISTEMA no incluirá en `serviciosData.js` términos del vertical restaurante
  (`salteña`, `salteñería`, `frapuccino`, `cafetería`).
- RF-7: EL SISTEMA corregirá los errores ortográficos del copy (p. ej. `Óóptimo`).
- RF-8: EL SISTEMA describirá, en `README.md` y `src/pages/Servicios/README.md`, el proyecto
  real (agencia de soluciones tecnológicas) sin referencias al vertical restaurante.

### Documentación
- RF-9: EL SISTEMA mantendrá `docs/catalogo-servicios.md` como espejo legible del Catálogo
  Maestro y documentará el mapeo a las claves de `serviciosData.js`.

## Requisitos no funcionales
- Idioma español.
- El test de integridad debe correr en el harness de la Spec 001 y fallar con mensajes claros.

## Casos límite
- Categoría faltante o con conteo distinto al catálogo → test en rojo.
- Servicio sin `shortDesc` o `ctaLink` → test en rojo.
- `id` duplicado entre categorías → test en rojo.
- Término prohibido en cualquier `name`/`shortDesc` → test en rojo.

## Fuera de alcance
- Rediseño visual de las páginas de servicio.
- Retiro de rutas y páginas del restaurante (Spec 003).
- SEO, títulos y metadatos (Spec 007).
- Reescribir la API documentada en `server/README.md` (Spec 004).

## Criterios de finalización
- Test de integridad en verde y cubriendo RF-2, RF-3, RF-4, RF-5, RF-6.
- Typos corregidos (RF-7) y READMEs alineados (RF-8).
- `npm run lint` y `npm run test:run` en verde.

## Dudas abiertas
- [NECESITA ACLARACIÓN] ¿Las páginas individuales de `src/pages/Servicios/*` deben pasar a
  renderizarse desde `serviciosData.js` (una sola fuente) o basta con alinear su copy
  manualmente? Impacta RF-1.
