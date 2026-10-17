# Spec 016 — Catálogo vigente y límites de oferta

## Contexto y objetivo

El Catálogo Maestro todavía ofrecía automatización, integraciones automáticas, IA aplicada a procesos, DevOps y soporte de servidores. El equipo confirma que HagamosTech ofrece desarrollo digital y acompañamiento académico, pero no automatizaciones, n8n, operación de servidores ni infraestructura compleja. Esta spec alinea la fuente editorial, los datos del frontend y su prueba de integridad, e incorpora los servicios académicos solicitados.

## Usuarios / actores

- Visitantes que necesitan entender qué puede contratarse.
- Equipo de HagamosTech que mantiene la oferta.
- Desarrolladores que mantienen catálogo y páginas.

## Historias de usuario

- H1: Como visitante quiero encontrar mentorías y acompañamiento para tareas, informes, monografías y proyectos socioformativos.
- H2: Como cliente quiero que el catálogo describa desarrollo web/software, diseño y servicios complementarios sin prometer servicios que la empresa no brinda.
- H3: Como equipo quiero que una prueba detecte si el catálogo de datos vuelve a incluir automatización, IA aplicada a procesos o infraestructura compleja.

## Requisitos funcionales (criterios de aceptación en EARS)

- RF-1: EL SISTEMA mantendrá `docs/catalogo-servicios.md` como fuente editorial y `src/data/serviciosData.js` como su espejo de datos.
- RF-2: EL SISTEMA mostrará siete categorías: acompañamiento académico, emprendimientos, empleo, diseño, web/e-commerce, software y soluciones personalizadas.
- RF-3: EL SISTEMA incluirá mentorías y apoyo en tareas, acompañamiento en informes/monografías y proyectos socioformativos para niveles escolares y universitarios.
- RF-4: EL SISTEMA excluirá del catálogo publicado automatizaciones, n8n, IA aplicada/automatización de procesos, DevOps, operación de servidores e infraestructura compleja.
- RF-5: EL SISTEMA describirá el apoyo académico como acompañamiento formativo y dejará claro que el estudiante desarrolla y presenta su propio trabajo.
- RF-6: EL SISTEMA conservará los identificadores existentes de categorías/servicios que siguen vigentes; los servicios retirados no se mostrarán en el catálogo.
- RF-7: EL SISTEMA actualizará el README para describir la oferta vigente y su conteo de categorías/servicios.
- RF-8: EL SISTEMA tendrá pruebas que comparen nombres, categorías y conteos exactos contra el catálogo, y fallen si reaparecen los términos excluidos en los datos publicados.

## Requisitos no funcionales

- RNF-1: El contenido visible y la documentación estarán en español.
- RNF-2: No se agregarán dependencias ni se modificarán modelos de base de datos.
- RNF-3: No se cambiarán rutas ni componentes de páginas en esta spec; su retiro o actualización se hará en specs de navegación/contenido posteriores.

## Fuera de alcance

- Reescritura de páginas de servicios, promoción, novedades, SEO y navegación.
- Definir precios, cuotas, suscripciones, mantenimiento recurrente, modalidades o zonas de atención.
- Confirmar integraciones de pago, apps móviles o atención por WhatsApp.
- Instalar skills o MCP externos.

## Plan técnico

1. Actualizar el Catálogo Maestro con siete categorías, alcance académico y exclusiones comerciales.
2. Alinear `SERVICIOS_DATA` y etiquetas de categoría con la fuente editorial.
3. Actualizar la prueba de integridad con nombres, conteos y lista de términos fuera de alcance.
4. Actualizar el resumen de oferta del README.
5. Registrar resultados en `validation.md`.

## Criterios de finalización

- Catálogo, datos y README describen la misma oferta y usan los mismos nombres.
- La prueba de integridad cubre todos los RF de catálogo.
- `npm run lint`, `npm run test:run` y `npm run build` terminan correctamente.
