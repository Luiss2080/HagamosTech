# Roadmap SDD — actualización de la oferta de HagamosTech

Estado: **fases 0–6 completadas**  
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
6. **Solicitud personalizada**: canal para necesidades digitales que no encajan en las categorías, siempre dentro del alcance anterior.

Tiendas online siguen en el catálogo como desarrollo sujeto a evaluación. Aplicaciones móviles, integraciones específicas de pago/WhatsApp, hardware, soporte de productos ajenos, precios, mantenimiento recurrente, planes y suscripciones quedan **por confirmar** y no se publicarán como servicios concretos hasta decisión explícita.

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

Cada fase futura tendrá su propia spec numerada: contexto, actores, historias, requisitos EARS, fuera de alcance, decisiones abiertas, plan técnico y tabla de validación. Las specs aprobadas se implementarán de una en una; no se adelantará copy o funcionalidad que aún no tenga fuente en el Catálogo Maestro.

## 5. Primer backlog para especificaciones

- **016 — Catálogo vigente y límites de oferta: completada.** Catálogo, datos, README y pruebas alineados; se retiraron categorías de automatización/IA y soporte DevOps/servidores, y se añadieron los servicios de acompañamiento académico indicados.
- **017 — Navegación de la oferta vigente: completada.** Menú y SEO actualizados; rutas retiradas van al 404.
- **018 — Acompañamiento académico: completada.** Página derivada del catálogo y con límites formativos claros.
- **019 — Desarrollo digital: completada.** Páginas web/software reutilizan el catálogo.
- **020 — Diseño y servicios complementarios: completada.** Páginas de emprendimiento, empleo y diseño alineadas.
- **021 — Propuesta y contenido veraz: completada.** Cotización clara y respuestas actualizadas del asistente.

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
