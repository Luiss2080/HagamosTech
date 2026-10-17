# Spec 027 — Servicios y catálogo UI-3

## Contexto y objetivo

UI-3 cubre seis páginas de servicio: desarrollo web, sistemas/software, emprendimientos, acompañamiento académico, empleo y diseño gráfico. Los componentes leen `SERVICIOS_DATA`, pero varias descripciones cortas contienen ejemplos más específicos que la aplicación práctica publicada en el Catálogo Maestro; además, el README conserva una nota heredada que da a entender que e-commerce fue retirado por completo. La fase alinea la comunicación, mejora el camino de consulta y mantiene una fuente editorial única.

## Historias de usuario

- H1: Como visitante quiero revisar los servicios incluidos en una categoría con descripciones claras y consistentes.
- H2: Como persona que evalúa desarrollo web/software quiero saber qué se revisa antes de acordar el alcance.
- H3: Como estudiante quiero entender qué acompañamiento académico puedo solicitar y quién desarrolla el trabajo.
- H4: Como persona interesada quiero poder consultar el servicio y recibir orientación sobre los siguientes pasos.

## Requisitos funcionales

- RF-1: Las seis rutas `/servicios/*` vigentes conservarán su destino y presentarán los servicios de sus categorías actuales: `web`, `software`, `emprendedores`, `estudiantes`, `empleo` y `diseno`.
- RF-2: Cada tarjeta mostrará el nombre y descripción canónica de `docs/catalogo-servicios.md`; los 33 resúmenes de `src/data/serviciosData.js` coincidirán con la aplicación práctica de su fila en el catálogo.
- RF-3: Las páginas web/software aclararán que funciones, integraciones, pagos/proveedores y viabilidad se revisan según cada proyecto; no presentarán ejemplos como paquetes garantizados ni ofrecerán hosting/operación de servidores.
- RF-4: La página académica cubrirá primaria/colegio, secundaria, instituto y universidad sujetos a disponibilidad, e indicará que el estudiante desarrolla y presenta su trabajo.
- RF-5: Las seis páginas conservarán un CTA funcional hacia `/contactanos` y comunicarán que alcance, tiempos y presupuesto se revisan antes de iniciar.
- RF-6: La presentación de las páginas será legible y utilizable con teclado a 390 px y en escritorio, sin controles falsos ni nuevas dependencias.
- RF-7: Pruebas automatizadas verificarán el mapeo de las seis rutas/categorías, la coincidencia de cada descripción con el Catálogo Maestro, las exclusiones y las CTA.

## Fuera de alcance

- Cambiar rutas, categorías, nombres de servicios, precios, contratos, pagos o datos comerciales.
- Modificar las rutas públicas de UI-2, contacto, páginas legales, cuenta, APIs o base de datos.
- Reintroducir servicios de automatización, n8n, IA aplicada, operación de servidores, DevOps o infraestructura compleja.
- Publicar testimonios, casos de éxito, marcas de clientes o resultados no verificados.
- Cambiar servicios del catálogo sin actualizar antes la fuente editorial correspondiente.

## Decisiones de contenido e interfaz

- Las páginas de web/software tendrán una nota de alcance específica y prudente; las otras cuatro categorías usarán la nota común de evaluación de solicitud.
- Las tarjetas mostrarán solo nombre y resumen canónico del catálogo. No se expondrán estadísticas, disponibilidad, estrellas, resultados, entregables ni niveles que no estén autorizados en la fuente editorial.
- Los CTAs irán a `/contactanos`; la consulta no afirmará que el proyecto fue aceptado ni que una cotización o envío tuvo éxito.
- El README identificará que las tiendas/pedidos online siguen en el catálogo sujetos a evaluación y que el alcance excluye hosting y operación de servidores.

## Plan técnico

1. Alinear los 33 `shortDesc` con las aplicaciones prácticas de las tablas del Catálogo Maestro.
2. Mantener la composición de las seis páginas desde las categorías de `SERVICIOS_DATA` y mejorar la explicación de alcance/CTA en componentes compartidos.
3. Completar el disclaimer académico con los niveles indicados en el catálogo.
4. Actualizar `src/pages/Servicios/README.md` para describir las rutas y alcance vigentes.
5. Añadir pruebas de correspondencia entre catálogo y datos, además de una prueba de render y categoría para las seis rutas.
6. Revisar las seis rutas con Playwright en escritorio y móvil; ejecutar lint, suite y build.

## Validación

| Requisito | Evidencia | Estado |
|---|---|---|
| RF-1 | Prueba de las seis páginas con los conteos de servicios de catálogo | Pendiente |
| RF-2 | Prueba automática que cruza todas las descripciones con el Catálogo Maestro | Pendiente |
| RF-3 y RF-4 | Pruebas de alcance digital y académico, incluidas exclusiones | Pendiente |
| RF-5, RF-6 y RF-7 | Pruebas de CTA, Playwright responsive, suite, lint, build y diff check | Pendiente |
