# Roadmap SDD — actualización de la oferta de HagamosTech

Estado: **borrador de planificación**  
Fecha: 2026-10-17  
Base revisada: Constitución, Catálogo Maestro, Specs 001–015, README y `HagamosTech (2).docx`.

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

Taxonomía inicial propuesta (pendiente de aprobar antes de escribir la nueva spec):

1. **Acompañamiento académico**: mentorías, explicación de temas, apoyo en tareas, informes, monografías, presentaciones y proyectos socioformativos; por nivel y materia cuando se confirme.
2. **Desarrollo web**: landing pages, sitios corporativos, portafolios, catálogos y aplicaciones web.
3. **Desarrollo de software**: sistemas y herramientas a medida, con alcance sujeto a evaluación.
4. **Diseño e identidad digital**: identidad visual, piezas para redes, presentaciones y recursos gráficos/digitales.
5. **Soluciones para empleo y emprendimientos**: conservar solo si el equipo confirma que sigue ofreciendo CV/LinkedIn, branding y recursos para negocios.
6. **Solicitud personalizada**: canal para necesidades digitales que no encajan en las categorías, siempre dentro del alcance anterior.

Tiendas online, aplicaciones móviles, integraciones de pago/WhatsApp, hardware, soporte de productos ajenos, precios, mantenimiento recurrente, planes y suscripciones quedan **por confirmar**. No se anunciarán como servicios definidos hasta decisión explícita.

## 4. Roadmap por fases

| Fase | Resultado | Artefactos SDD previstos | Criterio de salida |
|---|---|---|---|
| 0. Alineación de negocio | Catálogo vigente, exclusiones y límites comerciales aprobados | Actualización del Catálogo Maestro y decisiones de oferta | No quedan categorías contradictorias ni servicios sin confirmar presentados como hechos |
| 1. Arquitectura de contenido | Mapa de páginas, navegación, jerarquía y modelo de datos del catálogo | Spec de arquitectura de contenido; inventario de páginas y componentes | Cada servicio tiene ubicación, público y CTA definidos |
| 2. Academia | Sección académica que explica mentoría, tareas y proyectos por nivel | Spec funcional y de copy académico | Se entiende qué tipo de ayuda se recibe, entregables y límites |
| 3. Desarrollo digital | Reorganizar páginas de web y software en una explicación sencilla, concreta y no inflada | Spec de páginas de desarrollo web/software | No aparecen automatización, n8n, servidores ni promesas de complejidad ilimitada |
| 4. Diseño y servicios complementarios | Alinear diseño, empleo y emprendimientos según confirmación de vigencia | Spec de catálogo y páginas restantes | Todas las secciones coinciden con el catálogo aprobado |
| 5. Conversión y contacto | Formularios, WhatsApp y llamados a la acción coherentes con cada oferta | Spec de flujo de contacto y contenido | Una solicitud llega con contexto suficiente, sin simular cotización automática |
| 6. QA y lanzamiento | Validar contenido, navegación, responsive, accesibilidad y rutas | Validación por requisito; revisión de regresión | Lint, tests, build y E2E aplicables pasan antes de publicar |

Cada fase futura tendrá su propia spec numerada: contexto, actores, historias, requisitos EARS, fuera de alcance, decisiones abiertas, plan técnico y tabla de validación. Las specs aprobadas se implementarán de una en una; no se adelantará copy o funcionalidad que aún no tenga fuente en el Catálogo Maestro.

## 5. Primer backlog para especificaciones

- **Siguiente spec sugerida: 016 — Catálogo vigente y límites de oferta.** Alinear catálogo, `serviciosData.js`, README y pruebas; retirar automatización/IA aplicada a procesos, n8n, DevOps/servidores e infraestructura compleja. Agregar acompañamiento académico solo después de aprobar su redacción y alcance.
- **017 — Arquitectura de información y navegación.** Definir categorías, páginas, etiquetas y CTA sin duplicar contenido.
- **018 — Sección de acompañamiento académico.** Detallar niveles, modalidades, ejemplos y límites de servicio.
- **019 — Secciones de desarrollo web y software.** Aterrizar tipos de proyecto, entregables y evaluación de viabilidad.
- **020 — Diseño y categorías complementarias.** Resolver vigencia de diseño, empleo y emprendimientos.
- **021 — Contacto y conversión por servicio.** Mejorar contexto del mensaje y medición de solicitudes solo si se aprueba el alcance.

Los números son una propuesta: confirmar el estado del repositorio al iniciar cada spec y no reutilizar números existentes.

## 6. Skills y MCP: propuesta de instalación

Skills disponibles actualmente: `playwright`, `playwright-interactive` y herramientas de seguridad ya aparecen instaladas; `skill-installer` es una skill del sistema disponible. La lista curada consultada ofrece skills para Figma, Notion, despliegue y otras tareas, pero no una skill específica de React/Vite o SDD local que justifique instalarla para este roadmap.

Recomendación inicial:

- No añadir MCP de n8n, hosting/servidores, cloud o automatización: quedan fuera del alcance de negocio.
- Mantener Playwright para validación del sitio.
- Añadir Figma solo si el equipo ya diseña allí y desea importar especificaciones de diseño; añadir GitHub MCP solo si quiere gestionar issues/PRs desde Codex. No son requisito para planificar ni editar este repositorio.
- Para documentos de trabajo, usar el repositorio y sus Markdown como fuente de verdad; un MCP de Notion/Drive solo si el equipo confirma que esos espacios son su sistema de documentación.

No se instaló ninguna skill o MCP en este primer paso: la lista de skills no contiene una elección obvia para instalar y los MCP disponibles dependen de conectar cuentas/proveedores. La selección exacta de proveedores debe confirmarse para no vincular servicios innecesarios. El resto del roadmap se puede ejecutar sin esas conexiones.

## 7. Decisiones abiertas para cerrar la Fase 0

1. Confirmar las categorías finales y si empleo, emprendimientos, diseño gráfico, tiendas online, apps móviles e integraciones forman parte de la oferta vigente.
2. Confirmar niveles académicos, tipo de ayuda por servicio y modalidad de atención (presencial/remota, individual/grupal).
3. Definir si se publican precios, pagos únicos, cuotas, planes o cotización por evaluación.
4. Confirmar canales de contacto y zonas/países atendidos.
5. Elegir si se necesita integrar Figma, GitHub, Google Drive/Docs u otro MCP; no se instalará un conector por defecto.

## 8. Fuente revisada y reglas de ejecución

La spec activa al revisar el proyecto es **015 — Plantillas de correo con la paleta de la web**. Este documento es planificación y no cambia `specs/` ni el código. La implementación deberá seguir la Constitución: Catálogo Maestro como fuente de oferta, español, requisitos trazables y pruebas por requisito. Al terminar cada cambio de código se ejecutarán `npm run lint` y `npm run test:run`; usar `npm run build` como verificación adicional cuando corresponda.
