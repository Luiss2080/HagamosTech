# Spec 026 — Inicio y arquitectura pública UI-2

## Contexto y objetivo

La auditoría UI-0 observó un mensaje de Inicio demasiado amplio, un carrusel de tecnologías que parecía mostrar casos y afirmaba eficacia del 100%, además de un bloque presentado como “últimas soluciones” aunque no tenía fecha de novedades. UI-2 debe hacer que quien llega a HagamosTech identifique las áreas reales y encuentre el camino adecuado. El Catálogo Maestro sigue siendo la única fuente de la oferta publicada.

## Historias de usuario

- H1: Como visitante quiero entender en la primera pantalla qué áreas atiende HagamosTech y elegir por dónde empezar.
- H2: Como estudiante quiero encontrar acompañamiento académico sin que se prometa suplantar mi trabajo ni garantizar notas.
- H3: Como emprendimiento o profesional quiero localizar diseño, presencia digital y desarrollo de soluciones.
- H4: Como persona con una necesidad distinta quiero conocer cómo solicitar una evaluación de alcance.

## Requisitos funcionales

- RF-1: Inicio, header y footer describirán la oferta como acompañamiento académico, desarrollo digital y diseño; no prometerán resolver cualquier necesidad o atender cualquier tipo de cliente.
- RF-2: Inicio ofrecerá accesos claros a las rutas `/que-hacemos/tecnologia`, `/que-hacemos/academia`, `/que-hacemos/negocios` y `/que-hacemos/personalizado`.
- RF-3: La sección de categorías de Inicio seguirá derivando sus nombres/servicios de `SERVICIOS_DATA` y permitirá explorar las siete categorías vigentes.
- RF-4: La experiencia pública no presentará tecnologías como casos de éxito ni cifras, reseñas, calificaciones, disponibilidad o resultados no verificados; tampoco rotulará oferta vigente como “últimas novedades”.
- RF-5: Las páginas `/que-hacemos/*` explicarán su segmento con lenguaje consistente con el Catálogo Maestro y sus CTA conducirán a rutas existentes.
- RF-6: El recorrido estará disponible con teclado y no producirá desbordamiento horizontal a 390 px.
- RF-7: Las pruebas verificarán la propuesta de Inicio, las cuatro rutas, el origen de categorías y exclusiones de contenido; las pruebas de navegación cubrirán el recorrido público.

## Fuera de alcance

- Modificar páginas `/servicios/*`, contacto, empresa, cuenta, legales o backend.
- Cambiar rutas, catálogo, precios, medios de pago, datos corporativos o el diseño global definido en UI-1.
- Publicar casos de éxito, testimonios, logotipos de clientes o estadísticas sin evidencia aprobada.
- Cambiar estructura/orden de navegación o instalar dependencias; sí se permite alinear el texto existente del menú/footer con la oferta aprobada.

## Decisiones de contenido

- El hero presenta tres áreas: acompañamiento académico, desarrollo digital y diseño; la ruta de emprendimientos y profesionales sirve como recorrido hacia los servicios relacionados del catálogo.
- La portada tendrá cuatro tarjetas de orientación que conducen a las rutas públicas existentes: tecnología, academia, emprendimientos/profesionales y solicitud personalizada.
- El selector de categorías existente se conserva porque ya usa `SERVICIOS_DATA`; sus 7 tabs son la fuente de exploración detallada.
- Se retiran del Inicio el carrusel de stack tecnológico con “EFICACIA: 100%” y el carrusel titulado “Últimas soluciones disponibles”. Se reemplazan por áreas de orientación y un proceso simple basado en el flujo ya registrado en el Catálogo Maestro.
- El acompañamiento académico se formula como tutoría/orientación para que el estudiante realice y presente su propio trabajo; disponibilidad por materia y nivel se confirma al consultar.
- No se publican automatización de procesos, n8n, servidores, DevOps ni infraestructura compleja.

## Plan técnico

1. Actualizar el texto de `HeroHagamosTech.jsx` y mantener su CTA hacia contacto y el proceso.
2. Reemplazar `InstitucionesCarrusel` por un bloque de áreas con enlaces accesibles a las cuatro rutas existentes.
3. Conservar `ServiciosGrid` como explorador del catálogo de 7 categorías.
4. Reemplazar los carruseles de “ventajas”/“novedades” en Inicio por un proceso de cinco pasos alineado con el Catálogo Maestro.
5. Alinear la página de emprendimientos para incluir categorías de emprendimientos, empleo, diseño y desarrollo web; conservar el catálogo como fuente.
6. Añadir pruebas de Inicio y páginas públicas; recorrer rutas y tamaños con Playwright.
7. Alinear las descripciones existentes del header/footer a las áreas y públicos vigentes, preservando sus destinos actuales.

## Validación

| Requisito | Evidencia | Estado |
|---|---|---|
| RF-1 | Prueba del hero; copy del Header/Footer alineado a servicios y públicos vigentes. | ✅ |
| RF-2 y RF-5 | Pruebas de enlaces/segmentos; Playwright confirmó las 4 rutas públicas y sus páginas cargadas. | ✅ |
| RF-3 y RF-4 | `ServiciosGrid.test.jsx`: siete categorías salen de `SERVICIOS_DATA`; Inicio ya no contiene los carruseles/claims retirados. | ✅ |
| RF-6 y RF-7 | Playwright en 390 px verificó Inicio y las cuatro rutas sin overflow; 50/50 tests, lint sin errores, build y `git diff --check` exitosos. | ✅ |

## Estado

Implementada y validada el 2026-10-17. Se mantienen rutas, catálogo, APIs y estructura de datos; los cambios se limitan a presentación, copy y pruebas de las áreas públicas acordadas.
