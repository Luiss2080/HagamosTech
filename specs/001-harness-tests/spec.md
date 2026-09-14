# Spec 001 — Harness de tests y CI

## Contexto y objetivo
Hoy HagamosTech no tiene ninguna forma de verificar automáticamente que la web funcione:
cero tests en frontend y backend y `server/package.json` con un `test` que falla a propósito.
Sin este cimiento, cada spec posterior nace sin red de seguridad. Esta spec habilita el
harness (Vitest + Testing Library + Supertest + Playwright), los comandos de ejecución y la
verificación continua en GitHub Actions, para que a partir de la Spec 002 cada tarea termine
con tests en verde.

## Usuarios / actores
- Desarrolladores de HagamosTech (local y en PRs).
- Agentes de IA que implementarán las specs siguientes.

## Historias de usuario
- H1: Como desarrollador quiero ejecutar la suite completa con un comando para saber si mi cambio rompió algo.
- H2: Como desarrollador quiero tests de frontend aislados (sin navegador real) para iterar rápido.
- H3: Como desarrollador quiero tests de backend sin depender de MySQL para correr en cualquier máquina.
- H4: Como revisor quiero que el PR falle si lint o tests fallan, para no mergear código roto.

## Requisitos funcionales (criterios de aceptación en EARS)

### Frontend (Vitest + Testing Library)
- RF-1: CUANDO se ejecute `npm run test:run` en la raíz, EL SISTEMA ejecutará la suite del frontend con Vitest en entorno jsdom y finalizará con código 0 si todos los tests pasan.
- RF-2: EL SISTEMA permitirá testear componentes React con Testing Library y `@testing-library/jest-dom`, incluyendo aserciones sobre el DOM.
- RF-3: SI falla al menos un test del frontend, ENTONCES `npm run test:run` finalizará con código distinto de 0 y mostrará el test fallido.

### Backend (Vitest + Supertest)
- RF-4: CUANDO se ejecute `npm run test:run` dentro de `server/`, EL SISTEMA ejecutará la suite del backend con Vitest y Supertest.
- RF-5: EL SISTEMA ejecutará los tests del backend sin requerir una base de datos MySQL activa (Prisma se sustituye por un doble de prueba).
- RF-6: SI un endpoint bajo test responde un error, ENTONCES el test podrá aseverar el código de estado y el cuerpo de la respuesta.

### E2E (Playwright)
- RF-7: CUANDO se ejecute `npm run test:e2e`, EL SISTEMA levantará frontend y backend en puertos configurables y ejecutará los escenarios Playwright en un navegador Chromium.
- RF-8: EL SISTEMA incluirá al menos un escenario E2E de humo que cargue la home por `http://localhost:4000` y verifique el título/marca HagamosTech sin errores de consola de nivel error.

### Transversal
- RF-9: EL SISTEMA expondrá `npm run test:coverage` y `npm run test` (modo watch), documentados en `AGENTS.md`.
- RF-10: CUANDO se abra o actualice un Pull Request hacia `main`, EL SISTEMA ejecutará en GitHub Actions `npm ci`, `npm run lint` y la suite de tests; si algo falla, el check quedará en rojo.
- RF-11: EL SISTEMA no declarará como cubierta ninguna área que no tenga al menos un test asociado (las áreas se declaran explícitamente en cada spec).
- RF-12: EL SISTEMA dejará el árbol de tests listo para recibir los tests de las specs 002+ sin cambiar de herramienta ni reconfigurar cada vez.

## Requisitos no funcionales
- La suite del frontend debe completarse en menos de 60 s en una máquina de desarrollo modesta.
- Node.js 18+; sin servicios externos para los tests unitarios/integración.
- Los comandos deben funcionar en Windows (PowerShell) y en CI Linux.
- Documentación de uso en `AGENTS.md` y en el `README` del harness.

## Casos límite
- Ejecución en CI sin `.env`: los tests no deben depender de secretos.
- Puerto 3000 ocupado por otro proyecto (ParqueoYa): la config E2E debe permitir elegir puertos por variable de entorno.
- Tests de componentes que usan Zustand/React Router: se provee un helper de render con providers.
- Backend con Prisma: el doble de prueba no debe filtrar llamadas reales a MySQL.

## Fuera de alcance
- Escribir la suite completa de cada vertical (eso pertenece a las specs 002+).
- Umbrales mínimos de cobertura y quality gates numéricos.
- Testing de rendimiento/carga, testing visual y testing de accesibilidad automatizado (se evalúan en Spec 008).
- Pipeline de deploy.

## Criterios de finalización
- `npm run lint`, `npm run test:run` (raíz y `server/`) y `npm run test:e2e` terminan en verde.
- Existe al menos un test de frontend, uno de backend y un E2E de humo que prueban que el harness funciona.
- Demostración de RF-3 y RF-5 mediante un test temporal que falla (código de salida ≠ 0) y luego se elimina.
- El workflow de CI aparece configurado en `.github/workflows/`.

## Dudas abiertas
- [NECESITA ACLARACIÓN] ¿Qué puerto usará el backend para E2E: mantener 3000 (riesgo de choque con ParqueoYa) o pasar a 3001 vía `PORT`?
- [NECESITA ACLARACIÓN] ¿Se acepta mockear Prisma en los tests de backend en lugar de una base de datos de test real, para poder correr en cualquier máquina sin MySQL?
