# Spec 034 — Contenido comercial veraz

## Objetivo

Alinear todo el texto visible de HagamosTech con el catálogo vigente y con las decisiones
confirmadas por el negocio, sin cambiar rutas, estilos, secciones, componentes ni imágenes.

## Decisiones confirmadas

- HagamosTech ofrece desarrollo web y de software, diseño gráfico, recursos profesionales,
  soluciones digitales a medida y acompañamiento académico (incluye mentorías, tareas
  guiadas, informes, monografías y proyectos socioformativos).
- No ofrece automatizaciones de procesos, n8n, operación de servidores, DevOps ni
  infraestructura compleja.
- Precio, alcance, modalidad de pago, anticipos, calendario, garantía y ajustes se conversan
  con cada cliente; se presentan alternativas según su proyecto y posibilidades. No hay una
  tarifa, plazo, garantía ni modalidad universal confirmada.
- El acompañamiento académico ayuda al estudiante a comprender, desarrollar y presentar su
  propio trabajo; no promete calificaciones ni sustituye su autoría.

## Requisitos

- RF-1: El texto de oferta pública coincide con `docs/catalogo-servicios.md` y
  `src/data/serviciosData.js`.
- RF-2: No se publican testimonios, clientes, cifras, premios, alianzas, eventos, resultados,
  tiempos de entrega, descuentos, precios, soporte, certificaciones o garantías que no estén
  confirmados.
- RF-3: Ninguna página, navegación, modal, chat, promoción, novedad o perfil ofrece
  automatización de procesos, n8n, operación de servidores, DevOps o infraestructura compleja.
- RF-4: Se mantienen todas las rutas, secciones, tarjetas, carruseles y su diseño; solo se
  corrige el contenido textual y se aclaran los alcances sujetos a evaluación.
- RF-5: El sitio explica que el precio, plan, entregables y tiempos se acuerdan en una
  propuesta según el caso, y que el negocio escucha distintas posibilidades del cliente.
- RF-6: El contenido académico presenta tutoría y orientación, sin ofrecer suplantación ni
  resultados académicos garantizados.
- RF-7: Una prueba automatizada detecta términos y afirmaciones fuera de alcance en los
  archivos de contenido público.

## Fuera de alcance

- Cambiar estilos, componentes, estructura de página, navegación, funciones o backend.
- Inventar prácticas de privacidad, cobertura legal, proveedores o condiciones contractuales.
- Añadir precios, garantías, referencias de clientes o datos de rendimiento sin respaldo.

## Validación

Pendiente de ejecución al implementar esta spec.
