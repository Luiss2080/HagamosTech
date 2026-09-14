# Constitución — HagamosTech

Principios innegociables. Toda spec, plan y tarea debe cumplirlos. Si una tarea no puede
cumplirlos, se detiene el trabajo y se pregunta antes de continuar.

1. **La spec manda.** Ningún comportamiento, servicio ni texto se muestra o implementa si no
   está en la spec activa. Si falta una decisión, se pregunta y se actualiza la spec primero.

2. **Verdad de contenido (una sola fuente).** La oferta de servicios vive en
   `src/data/serviciosData.js`, derivada del Catálogo Maestro (`docs/catalogo-servicios.md`).
   Prohibido publicar contenido de un vertical no vigente (p. ej. restaurante) o duplicar la
   oferta en componentes. Todo desvío respecto al catálogo se detecta con tests.

3. **API veraz.** Prohibido mockear o usar catch-all que devuelva éxito genérico. Cada
   endpoint responde con datos reales o con un error explícito y honesto (`400/401/404/501`).
   La UI nunca finge una operación que el backend no hizo.

4. **Tests como puerta.** Cada tarea termina con sus tests en verde (Vitest + Testing Library
   + Supertest; Playwright para E2E). Prohibido avanzar con tests en rojo o sin test cuando la
   spec lo exige.

5. **Datos y lógica separados de la UI.** Oferta, catálogo y llamadas a la API viven en
   `src/data` y `src/servicios`. La lógica de negocio no se esconde en componentes de
   presentación.

6. **Stack sobrio.** React 19 + Vite 8 + Tailwind 4 en frontend; Node/Express + Prisma en
   backend. No se añaden dependencias ni se cambia el esquema sin actualizar antes la spec.

7. **Idioma y accesibilidad.** La interfaz, los mensajes al usuario y la documentación van en
   español. El código e identificadores se mantienen consistentes con el existente. Los
   componentes interactivos deben ser accesibles por teclado y con nombres claros.

8. **Trazabilidad.** Cada requisito funcional (RF) tiene al menos un test que lo cubre y una
   entrada en la validación de su spec. Un RF sin test no se considera terminado.
