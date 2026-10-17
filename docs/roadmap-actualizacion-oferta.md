# Roadmap SDD — actualización de la oferta de HagamosTech

Estado: **oferta, fases 0–7 completadas; UI-0 a UI-6 completadas; UI-7 siguiente**
Fecha: 2026-10-17  
Base revisada: Constitución, Catálogo Maestro, Specs 001–021, README y `HagamosTech (2).docx`.

## 1. Objetivo

Actualizar el sitio para explicar de forma clara y honesta todo lo que HagamosTech ofrece: soluciones digitales y desarrollo, diseño, y acompañamiento académico. La oferta debe reflejar el trabajo real del equipo y organizarse en categorías que un cliente pueda entender.

## 2. Decisión de alcance registrada desde el pedido

La oferta **no incluirá** automatizaciones, n8n, operación o migración de servidores ni servicios de infraestructura compleja. Se quitarán de la comunicación comercial las promesas de automatización e IA aplicada a procesos, DevOps/servidores y servicios equivalentes. Desarrollo de software y páginas web sigue dentro del alcance; la complejidad y viabilidad de cada proyecto se evalúan antes de cotizar.

El apoyo académico se comunicará como tutoría, mentoría, orientación, revisión y acompañamiento para tareas, informes, monografías y proyectos socioformativos de colegio, secundaria y universidad. La redacción final debe explicar el acompañamiento con claridad y no prometer resultados académicos ni suplantar al estudiante.

## 3. Arquitectura actual y arquitectura de contenido objetivo

### Arquitectura técnica que ya existe

- Frontend: React 19, Vite 8, Tailwind 4, React Router y Zustand.
- Backend: Node.js, Express 5, Prisma y MySQL. En esta actualización de oferta no se requiere ampliar el backend salvo que una spec futura descubra una necesidad concreta.
- Datos de catálogo: `src/data/serviciosData.js`, con `docs/catalogo-servicios.md` como fuente editorial, según la Constitución.
- Llamadas HTTP: `src/servicios/clienteApi.js`; estado global en stores Zustand.
- SDD existente: specs numeradas en `specs/`, cada una con requisitos y validación.

### Modelo objetivo para presentar la oferta

Una sola fuente editorial versionada alimenta el catálogo de datos y las páginas. La interfaz organiza cada categoría con: para quién es, qué necesidad resuelve, ejemplos concretos, entregables, modalidad de trabajo y cómo solicitar una evaluación. No se publican precios ni modalidades de pago hasta que el negocio los defina.

Taxonomía base aprobada por el pedido del usuario y aplicada a la Spec 016:

1. **Acompañamiento académico**: mentorías, explicación de temas, apoyo en tareas, informes, monografías, presentaciones y proyectos socioformativos; por nivel y materia cuando se confirme.
2. **Desarrollo web**: landing pages, sitios corporativos, portafolios, catálogos y aplicaciones web.
3. **Desarrollo de software**: sistemas y herramientas a medida, con alcance sujeto a evaluación.
4. **Diseño e identidad digital**: identidad visual, piezas para redes, presentaciones y recursos gráficos/digitales.
5. **Emprendimientos y empleo**: mantener branding, catálogos digitales, piezas promocionales, CV/LinkedIn y orientación profesional que ya estaban en la oferta.
6. **Solicitud personalizada**: canal para necesidades digitales que no encajan en las categorías, siempre dentro del alcance anterior. Se pueden evaluar prototipos, paneles, dashboards, herramientas internas y aplicaciones web/móviles.

Tiendas online siguen en el catálogo como desarrollo sujeto a evaluación; los pagos en línea dependen de revisar alcance y proveedor. Aplicaciones móviles e integración técnica entre plataformas se mencionan como posibilidades sujetas a evaluación, no como paquetes confirmados. Automatización de procesos, hardware, soporte de productos ajenos, precios, mantenimiento recurrente, planes y suscripciones no se ofrecen ni se publican hasta una decisión explícita.

## 4. Roadmap por fases

| Fase | Resultado | Artefactos SDD previstos | Criterio de salida |
|---|---|---|---|
| 0. Alineación de negocio | Catálogo vigente, exclusiones y límites comerciales aprobados | [Spec 016](../specs/016-catalogo-vigente/spec.md), Catálogo Maestro y decisiones de oferta | ✅ Catálogo y datos alineados; pruebas cubren los límites definidos |
| 1. Arquitectura de contenido | Menú y rutas alineados; rutas de automatización/IA retiradas | [Spec 017](../specs/017-navegacion-oferta-vigente/spec.md) | ✅ Menú, rutas y SEO alineados |
| 2. Academia | Página común para mentorías, tareas, informes, monografías y proyectos socioformativos | [Spec 018](../specs/018-acompanamiento-academico/spec.md) | ✅ Nueve servicios académicos visibles con su alcance |
| 3. Desarrollo digital | Páginas simples de web, software y bases de datos | [Spec 019](../specs/019-desarrollo-digital/spec.md) | ✅ Datos del catálogo; sin promesas de infraestructura |
| 4. Diseño y complementarios | Emprendimientos, empleo y diseño conectados al catálogo | [Spec 020](../specs/020-diseno-y-servicios-complementarios/spec.md) | ✅ Catálogo único y contacto claro |
| 5. Conversión y contacto | Proceso de propuesta y asistente alineados con la oferta | [Spec 021](../specs/021-propuesta-y-contenido-veraz/spec.md) | ✅ Sin tarifas ni promociones inventadas |
| 6. QA | Validar contenido, navegación, pruebas y build | Validaciones de Specs 016–021 | ✅ 39/39 tests, lint sin errores y build exitoso |
| 7. Alcance y ejemplos | Completar ejemplos concretos de desarrollo web/software y acompañamiento académico sin ampliar promesas comerciales | [Spec 022](../specs/022-alcance-y-ejemplos-de-servicios/spec.md) | ✅ 40/40 tests; build exitoso; lint sin errores |

Cada fase futura tendrá su propia spec numerada: contexto, actores, historias, requisitos EARS, fuera de alcance, decisiones abiertas, plan técnico y tabla de validación. Las specs aprobadas se implementarán de una en una; no se adelantará copy o funcionalidad que aún no tenga fuente en el Catálogo Maestro.

## 5. Primer backlog para especificaciones

- **016 — Catálogo vigente y límites de oferta: completada.** Catálogo, datos, README y pruebas alineados; se retiraron categorías de automatización/IA y soporte DevOps/servidores, y se añadieron los servicios de acompañamiento académico indicados.
- **017 — Navegación de la oferta vigente: completada.** Menú y SEO actualizados; rutas retiradas van al 404.
- **018 — Acompañamiento académico: completada.** Página derivada del catálogo y con límites formativos claros.
- **019 — Desarrollo digital: completada.** Páginas web/software reutilizan el catálogo.
- **020 — Diseño y servicios complementarios: completada.** Páginas de emprendimiento, empleo y diseño alineadas.
- **021 — Propuesta y contenido veraz: completada.** Cotización clara y respuestas actualizadas del asistente.
- **022 — Alcance y ejemplos de servicios: completada.** El Catálogo Maestro y las tarjetas ahora explican tipos de proyectos web, sistemas empresariales/sectoriales, integraciones técnicas evaluables y el alcance formativo académico.

Los números son una propuesta: confirmar el estado del repositorio al iniciar cada spec y no reutilizar números existentes.

## 6. Skills y MCP: propuesta de instalación

Skills disponibles: `playwright`, `playwright-interactive`, herramientas de seguridad y ahora `figma` (instalada para apoyar el trabajo de diseño de interfaz en las próximas fases). `skill-installer` es una skill del sistema. No hay una skill curada específica de React/Vite o SDD local que justifique instalarla.

Recomendación inicial:

- No añadir MCP de n8n, hosting/servidores, cloud o automatización: quedan fuera del alcance de negocio.
- Mantener Playwright para validación del sitio.
- GitHub MCP ya está instalado. Figma se recomendó y está pendiente de que el usuario conecte su cuenta para usar el MCP; la skill `figma` quedó instalada y estará disponible en el próximo turno.
- Para documentos de trabajo, usar el repositorio y sus Markdown como fuente de verdad; un MCP de Notion/Drive solo si el equipo confirma que esos espacios son su sistema de documentación.

Se instaló la skill `figma` en Codex. GitHub MCP ya estaba instalado; Figma MCP está pendiente de conexión. No se añadieron conectores de automatización, hosting o servidores.

## 7. Decisiones comerciales pendientes (no bloquean la oferta informativa)

1. Confirmar si las tiendas online incluirán cobro en línea además del desarrollo sujeto a evaluación.
2. Decidir si apps móviles o integraciones de pago/WhatsApp se incorporan en una fase futura.
3. Acordar modalidad y zona de atención para mentorías académicas.
4. Definir tarifas, anticipos, medios de pago y mantenimiento antes de publicar esas condiciones.
5. Figma MCP está pendiente de conexión; GitHub MCP ya está instalado.

## 8. Fuente revisada y reglas de ejecución

La spec activa al iniciar el trabajo era **015 — Plantillas de correo con la paleta de la web**; la Spec 016 ya registra el primer cambio. Se seguirá la Constitución: Catálogo Maestro como fuente de oferta, español, requisitos trazables y pruebas por requisito. Al terminar cada cambio de código se ejecutarán `npm run lint`, `npm run test:run` y `npm run build` según la validación de la spec.

## 9. Plan de actualización de interfaces

La planificación por interfaces está formalizada en [Spec 023](../specs/023-plan-interfaces-fase-a-fase/spec.md). UI-0 ya se ejecutó y sus hallazgos están en [Auditoría de interfaces](auditoria-interfaces-ui0.md) y [Spec 024](../specs/024-auditoria-interfaces-ui0/spec.md). La actualización de la oferta y UI-1 a UI-6 están terminadas; UI-7 es la fase siguiente.

La actualización visual y de experiencia se realizará por grupos pequeños. Cada fase tendrá una spec propia antes de tocar componentes; se revisará en móvil y escritorio, y no se empezará la siguiente fase hasta validar la actual.

### Inventario de interfaces existentes

El router declara 37 rutas funcionales, más la ruta comodín de error 404. Las rutas internas como `/inicio/hero` o `/contacto/formulario` parecen secciones expuestas como páginas independientes; se revisará su propósito y acceso antes de decidir si siguen siendo navegables.

| Grupo | Rutas declaradas | Enfoque |
|---|---|---|
| Entrada y navegación | `/`, `/inicio/hero`, `/que-hacemos/tecnologia`, `/que-hacemos/academia`, `/que-hacemos/negocios`, `/que-hacemos/personalizado` | Propuesta de valor, navegación y derivación a cada necesidad |
| Servicios | `/servicios/desarrollo-web`, `/servicios/sistemas-apps`, `/servicios/para-tu-negocio`, `/servicios/apoyo-academico`, `/servicios/empleo`, `/servicios/diseno-grafico` | Casos de uso, alcance del Catálogo Maestro y solicitud de propuesta |
| Empresa y proceso | `/sobre-nosotros`, `/sobre-nosotros/historia`, `/sobre-nosotros/mision-vision`, `/sobre-nosotros/valores`, `/sobre-nosotros/videos`, `/como-trabajamos`, `/promociones` | Confianza, información verificable y revisión de vigencia de promociones |
| Contacto | `/contactanos`, `/contacto/hero`, `/contacto/formulario`, `/contacto/recursos`, `/contacto/ubicacion` | Canales, formulario, información de contacto y estados reales de envío |
| Cuenta y acceso | `/recuperar-contrasena`, `/perfil`, `/configuracion`, `/perfil/compras`, más modales de inicio de sesión y registro | Acceso, recuperación, perfil y funciones ligadas a datos reales |
| Legal | `/condiciones`, `/privacidad`, `/terminos`, `/cookies`, además del modal de términos | Documentos coherentes, legibles y conectados entre sí |
| Errores | `/errors/401`, `/errors/403`, `/errors/404`, `/errors/419`, `/errors/500`, `*` | Explicar el problema y ofrecer una salida útil |
| Elementos globales | Header, menú móvil, footer, botones, modales, chat/WhatsApp, estados de carga | Consistencia, accesibilidad y funcionamiento transversal |

### Fases de interfaz propuestas

| Fase | Grupo de trabajo | Resultado verificable | Criterio para avanzar |
|---|---|---|---|
| UI-0. Auditoría y decisiones | Capturas/estado actual por ruta, mapa de enlaces, componentes compartidos, contenido dudoso y deuda responsive/accesible | Matriz por pantalla: conservar, reorganizar, corregir o retirar; decisiones abiertas asignadas | Sin servicios o afirmaciones sin fuente; alcance firmado en spec |
| UI-1. Sistema visual compartido | Colores, tipografía, espaciado, botones, tarjetas, formularios, navegación, footer, foco, modales y comportamiento móvil | Base visual reutilizable que respeta identidad existente | ✅ Loader ficticio retirado; foco, submenú por teclado, Escape y movimiento reducido comprobados; widgets globales corregidos; lint, 42/42 tests y build en verde. UI-8 ampliará cobertura visual |
| UI-2. Inicio y arquitectura pública | Inicio, header/footer y páginas `/que-hacemos/*` | Visitante entiende qué hace HagamosTech y encuentra su camino | ✅ Hero alineado, cuatro rutas de orientación, siete categorías del catálogo, proceso de cinco pasos, header/footer sin alcance ilimitado; 50 tests, lint y build en verde; móvil sin overflow |
| UI-3. Servicios y catálogo | Seis páginas `/servicios/*` y tarjetas/listados compartidos | Oferta organizada por necesidad, ejemplos y alcance | ✅ Seis rutas muestran 32 servicios; los 33 resúmenes coinciden con Catálogo Maestro; aclaraciones web/software/académica, CTA a contacto; lint, 60/60 tests y build en verde; móvil/escritorio sin overflow |
| UI-4. Conversión y proceso | Contacto, formulario, recursos, canales, `/como-trabajamos`, modales de contacto/WhatsApp | Camino de consulta claro y estados de envío veraces | ✅ Dos formularios envían al endpoint real, estados de éxito/error veraces, CTA al formulario; dirección/horario sin confirmar retirados; lint, 67/67 tests, build y responsive en verde. [Spec 028](../specs/028-contacto-proceso-ui4/spec.md) |
| UI-5. Empresa y confianza | Sobre nosotros, historia, misión/visión, valores y videos | Información institucional ordenada y comprobable | ✅ Propósito/rumbo, principios, enfoque y áreas; se retiraron datos no verificados y embeds; lint, 75/75 tests, build y responsive en verde. [Spec 029](../specs/029-empresa-confianza-ui5/spec.md) |
| UI-6. Acceso y cuenta | Registro, inicio, recuperación, perfil, configuración e historial | Flujos consistentes con autenticación y datos reales del backend | ✅ Cuenta protegida, perfil sin falsos éxitos, ajustes sin preferencias inventadas y compras retiradas de la navegación; 9 pruebas nuevas, 84/84 suite, lint y build en verde. [Spec 030](../specs/030-acceso-cuenta-ui6/spec.md) |
| UI-7. Legal y errores | Términos, privacidad, cookies, condiciones y errores | Páginas legibles, navegables y con rutas de recuperación | Enlaces, responsive y navegación por teclado revisados |
| UI-8. QA transversal | Todas las rutas, tamaños de pantalla, accesibilidad, SEO y rendimiento | Matriz final de cobertura y defectos cerrados | Suite, lint, build y recorrido E2E acordado en verde |

### Forma de trabajo para cada fase

1. Crear o revisar la spec de la fase y su contenido autorizado.
2. Inspeccionar todas las pantallas del grupo en móvil y escritorio.
3. Acordar mapa, jerarquía de contenido y estados antes de implementar.
4. Actualizar componentes y pruebas del grupo sin adelantar páginas de otra fase.
5. Validar links, accesibilidad por teclado, contenido, lint, suite y build.
6. Registrar decisiones, resultado y pendientes; recién entonces iniciar la siguiente fase.

**UI-0 completada:** se documentaron pantallas, rutas internas y decisiones abiertas (por ejemplo, qué hacer con `/promociones` y las rutas de secciones sueltas de contacto/inicio). **UI-1 completada:** se retiró la carga ficticia, se mejoró el acceso por teclado del menú, foco y widgets globales, y se respetó movimiento reducido. Validación: lint limpio, 42/42 tests y build exitoso. **UI-2 completada:** Inicio presenta el alcance real, cuatro rutas de orientación y siete categorías enlazadas al catálogo; se retiraron los carruseles de stack/eficacia no verificada y “últimas soluciones”, y se mostró el flujo de consulta a entrega. Header/footer quedaron alineados a públicos y servicios vigentes. Validación: Playwright en Inicio y cuatro rutas a 390 px sin overflow; lint sin errores, 50/50 tests y build exitoso. **UI-3 completada:** las seis páginas muestran sus 32 tarjetas; los 33 resúmenes coinciden con el Catálogo Maestro y web/software/académico aclaran su alcance. Las seis consultas conducen a Contacto. Playwright a 390/1365 px sin overflow; lint limpio, 60/60 tests y build exitoso. **UI-4 completada:** ambos formularios usan el endpoint real; la página no abre WhatsApp ni descarta los datos sin registrar la consulta. Se corrigió la respuesta del modal, los CTA al formulario, la metodología y los canales; se retiraron dirección, mapa y horario pendientes de confirmación. Playwright a 390/1280 px sin overflow y salto probado a `#/contactanos#support`; lint limpio, 67/67 tests y build exitoso. **UI-5 completada:** Sobre nosotros conserva la identidad visual negra, lima y blanca y sus rutas directas; propósito/rumbo evita declaraciones corporativas no confirmadas, los valores quedan estáticos y la ruta de videos orienta a cuatro áreas sin iframes ni métricas. Playwright a 390/1280 px sin overflow; 8 pruebas nuevas y 75/75 suite, lint y build exitosos. [Spec 029](../specs/029-empresa-confianza-ui5/spec.md). **UI-6 completada:** las rutas `/perfil` y `/configuracion` requieren sesión; los errores 401 cierran la sesión, los fallos de carga del perfil se muestran con reintento, y los cambios solo se confirman cuando el servidor los devuelve. Se retiraron contadores/logros y preferencias sin respaldo, se reemplazó la navegación móvil por enlaces completos y `/perfil/compras` redirige a `/perfil`. Playwright verificó el acceso sin sesión a 390/1280 px; 9 pruebas nuevas, 84/84 suite, lint y build en verde. [Spec 030](../specs/030-acceso-cuenta-ui6/spec.md). **Siguiente fase: UI-7**, legal y errores.
