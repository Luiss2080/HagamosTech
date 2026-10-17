# Spec 022 — Alcance y ejemplos de servicios

## Contexto y objetivo

La oferta anterior agrupaba servicios en nombres amplios y dejaba poco claro qué tipos de proyectos podían consultarse. Esta fase complementa las descripciones con ejemplos concretos de desarrollo web y software, amplía el contexto del acompañamiento académico y precisa cómo se evalúan pedidos personalizados. El Catálogo Maestro continúa siendo la fuente editorial.

## Historias de usuario

- H1: Como visitante quiero reconocer mi tipo de proyecto en ejemplos concretos, aunque no sea un paquete cerrado.
- H2: Como estudiante quiero entender qué clases de acompañamiento académico puedo consultar y cuáles son sus límites.
- H3: Como equipo quiero explicar el alcance de manera amplia sin prometer funciones, precios, tecnologías o infraestructura que no fueron acordados.

## Requisitos funcionales

- RF-1: EL SISTEMA presentará ejemplos de sitios web corporativos, institucionales, educativos y especializados, además de landing pages, tiendas, catálogos, blogs, directorios, comunidades y plataformas de contenido.
- RF-2: EL SISTEMA describirá ejemplos de software empresarial y sectorial, incluyendo inventario, ventas, facturación, CRM, gestión académica y operaciones.
- RF-3: EL SISTEMA podrá mencionar aplicaciones web/móviles e integración técnica entre plataformas como posibilidades sujetas a evaluación, sin presentarlas como paquetes o capacidades confirmadas para todo proyecto.
- RF-4: EL SISTEMA describirá mentorías, tareas guiadas, informes, monografías y proyectos socioformativos como acompañamiento formativo; el estudiante desarrolla y presenta su propio trabajo.
- RF-5: EL SISTEMA no ofrecerá automatización de procesos, n8n, operación/migración de servidores, DevOps ni infraestructura compleja.
- RF-6: EL SISTEMA no prometerá hosting, pagos integrados, métricas, resultados, precios o modalidades comerciales que no estén confirmados.
- RF-7: EL SISTEMA mantendrá los nombres, categorías e identificadores existentes; no añadirá dependencias ni modificará backend o base de datos.
- RF-8: Una prueba verificará la presencia de ejemplos representativos en los datos de servicios y la prueba existente seguirá comprobando categorías, nombres y exclusiones.

## Fuera de alcance

- Añadir rutas, páginas o nuevos servicios categóricos.
- Definir tarifas, contratos, soporte recurrente o medios de pago.
- Confirmar tecnologías, pasarelas, proveedores externos, disponibilidad por materia o modalidad académica.
- Automatización de procesos, n8n, operación de servidores, DevOps o infraestructura compleja.

## Plan técnico

1. Precisar el alcance y ejemplos en `docs/catalogo-servicios.md`.
2. Reflejar descripciones resumidas y entregables prudentes en `src/data/serviciosData.js`.
3. Añadir aserciones de ejemplos al test de integridad del catálogo.
4. Actualizar el roadmap y registrar resultados.

## Validación

| Requisito | Evidencia | Estado |
|---|---|---|
| RF-1, RF-2, RF-3 y RF-4 | Catálogo Maestro y prueba de ejemplos de `serviciosData` | ✅ |
| RF-5 y RF-6 | Revisión de exclusiones y descripciones; pruebas de páginas/catálogo | ✅ |
| RF-7 y RF-8 | Conteos/nombres existentes y prueba de integridad | ✅ |
| Lint | `npm run lint` | ✅ 0 errores; 2 advertencias preexistentes en carruseles de Inicio |
| Suite | `npm run test:run` | ✅ 10 archivos, 40 pruebas |
| Build | `npm run build` | ✅ compilación de producción exitosa |
