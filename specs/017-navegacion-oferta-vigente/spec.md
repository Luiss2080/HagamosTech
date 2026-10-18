# Spec 017 — Navegación de la oferta vigente

## Contexto y objetivo

La Spec 016 retiró automatización e IA aplicada del catálogo, pero el menú, el enrutador y las novedades aún enlazaban a esas ofertas. Esta spec elimina esos accesos y alinea los textos de navegación/SEO con las siete categorías vigentes para evitar que una oferta retirada siga siendo accesible.

## Historias de usuario

- H1: Como visitante quiero navegar categorías vigentes desde el menú.
- H2: Como visitante quiero que los enlaces de novedades lleven a páginas que existen y describan servicios actuales.
- H3: Como equipo quiero que las rutas retiradas lleguen al fallback 404 en vez de mostrar páginas fuera de la oferta.

## Requisitos funcionales

- RF-1: EL SISTEMA no mostrará Automatización ni Inteligencia Artificial como opciones de menú o rutas de servicio.
- RF-2: EL SISTEMA mantendrá rutas de servicios para web, software, emprendimientos, academia, empleo y diseño gráfico.
- RF-3: EL SISTEMA actualizará las descripciones de navegación y metadatos SEO para eliminar promesas de automatización/IA aplicada.
- RF-4: EL SISTEMA no enlazará novedades a las rutas retiradas y no afirmará hospedaje, alianzas o cifras no confirmadas.
- RF-5: SI un visitante abre una ruta retirada, ENTONCES EL SISTEMA mostrará la página 404 existente.

## Fuera de alcance

- Rediseñar páginas individuales de servicio.
- Eliminar archivos fuente de las páginas retiradas, si su eliminación requiere revisar referencias adicionales.
- Redactar planes/precios, promociones o historias de clientes.

## Plan técnico

1. Retirar imports y rutas de automatización/IA de `App.jsx`.
2. Retirar las dos opciones del menú y limpiar descripciones de audiencia.
3. Eliminar metadata SEO para rutas retiradas y actualizar metadata principal.
4. Actualizar novedades con contenido actual sin afirmaciones comerciales no verificadas.
5. Actualizar el índice de páginas de servicios.
6. Verificar la navegación con pruebas, lint, test y build.

## Criterios de finalización

- Ningún menú o enlace destacado lleva a rutas retiradas.
- Las rutas retiradas caen al 404 global.
- El catálogo de navegación permanece alineado con las categorías confirmadas.
