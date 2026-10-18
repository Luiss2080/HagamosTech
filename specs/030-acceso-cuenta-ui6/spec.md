# Spec 030 — Acceso y cuenta UI-6

## Contexto y objetivo

La auditoría UI-0 encontró que las rutas de perfil se renderizan sin sesión confirmada, que el perfil y el historial muestran datos de respaldo, y que el acceso móvil a secciones de cuenta es incompleto. También se confirmó que el catálogo vigente vende servicios mediante consulta y propuesta; no existe una tienda con pedidos ni una ruta backend de compras. Esta fase ordena acceso, perfil y configuración alrededor de las operaciones que sí existen, sin ampliar APIs ni cambiar el esquema de datos.

## Historias de usuario

- H1: Como visitante quiero iniciar sesión o registrarme con mensajes claros cuando ocurra un error o se requiera verificación.
- H2: Como usuario autenticado quiero consultar y editar mi perfil y distinguir datos cargados, vacíos y errores.
- H3: Como usuario quiero encontrar con facilidad las opciones de cuenta en móvil y escritorio.
- H4: Como usuario quiero que el sitio explique con honestidad qué opciones de cuenta están disponibles.

## Requisitos funcionales

- RF-1: CUANDO una persona no autenticada abra `/perfil` o `/configuracion`, EL SISTEMA no mostrará datos privados y la llevará al inicio con el modal de inicio de sesión disponible.
- RF-2: CUANDO falle la carga o actualización del perfil en la API, EL SISTEMA mostrará un error recuperable; nunca afirmará éxito ni presentará cambios solo locales como persistidos.
- RF-3: La vista de perfil no usará nombres, correos, proyectos, estadísticas o datos de respaldo como información del usuario. Mostrará datos devueltos por el servidor y estados de carga/error/vacío diferenciados.
- RF-4: Configuración solo ofrecerá operaciones respaldadas por rutas reales (`PUT /api/perfil/password`, `/api/perfil/2fa/*`, `/api/perfil/sessions`, exportación y desactivación). Las preferencias sin endpoint persistente no se mostrarán como guardadas en la cuenta; la ausencia de registro multisesión se explicará con alcance explícito.
- RF-5: La ruta heredada `/perfil/compras` no presentará pedidos, importes ni facturas ficticios. Se retirará de la navegación de cuenta y se conservará como redirección hacia `/perfil` por compatibilidad.
- RF-6: La navegación de cuenta ofrecerá nombres completos y destinos claros en escritorio y móvil, sin etiquetas cortadas.
- RF-7: La experiencia conservará el diseño establecido en cuenta (superficies blancas, texto oscuro, acento lima), tipografía, componentes de navegación y responsive del sitio.
- RF-8: Las pruebas cubrirán protección de rutas, ausencia de datos de respaldo, estados reales de perfil, fallo de persistencia, funciones soportadas y redirección de la ruta heredada.

## Fuera de alcance

- Cambiar endpoints, autenticación, autorización de backend, contratos de API, modelo Prisma o base de datos.
- Añadir historial de servicios/solicitudes, compras, pagos, facturas u otras capacidades comerciales no existentes.
- Rediseñar el flujo validado de login, registro, verificación de correo/2FA o recuperación; solo se corregirán defectos que bloqueen el acceso definido en esta spec.
- Cambiar políticas legales o almacenar preferencias sin una API persistente aprobada.

## Decisiones de interfaz

- Las rutas del perfil y configuración requerirán sesión en la aplicación; el backend seguirá siendo quien autoriza cada operación protegida.
- Se conserva la ruta `/perfil/compras` solo como compatibilidad y se redirige a `/perfil`, dado que el catálogo vigente no ofrece compras en línea.
- Las preferencias sin persistencia y el historial comercial se omiten hasta que haya una función real y aprobada.
- Los estados de carga, error de API y datos vacíos no se mezclarán ni mostrarán contadores por defecto.

## Plan técnico

1. Auditar pantallas, hooks, store de autenticación y rutas server existentes contra este alcance.
2. Proteger rutas de cuenta y definir el estado de acceso sin desplazar innecesariamente el flujo público.
3. Retirar valores de respaldo y falsos éxitos del perfil; representar estados de API.
4. Simplificar configuración a funciones soportadas y retirar controles de persistencia inexistente.
5. Redirigir la ruta heredada de compras y corregir navegación móvil.
6. Añadir pruebas específicas, revisar en Playwright a 390 px y escritorio, ejecutar lint, suite y build.

## Validación

| Requisito | Evidencia | Estado |
|---|---|---|
| RF-1 a RF-3 | Tests de protección y restauración de sesión; rechazo 401; pruebas de error y persistencia del perfil. | ✅ |
| RF-4 y RF-5 | Se retiraron preferencias sin endpoint y vistas de compras; test de redirección heredada; sesiones declaran `sin_registro_multisesion`. | ✅ |
| RF-6 y RF-7 | Enlaces de cuenta prueban perfil/configuración; Playwright verificó protección/login y ancho sin overflow a 390/1280 px. Se mantiene superficie blanca con acento lima. | ✅ |
| RF-8 | 9 pruebas nuevas; suite 84/84, lint, build y `git diff --check`. | ✅ |

## Estado

Completada. Las rutas de cuenta requieren sesión, la API determina el resultado de cambios, las cargas diferencian errores y datos guardados, y se retiraron controles/contadores sin persistencia o respaldo comercial.
