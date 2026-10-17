# Auditoría de interfaces UI-0 — HagamosTech

Fecha: 2026-10-17  
Alcance: revisión de rutas existentes, renderizado y contenido visible en escritorio (1365 × 900) y móvil (390 × 844). Se inspeccionaron 37 rutas funcionales y la ruta comodín. No se cambió código de producto ni se enviaron formularios.

## Resumen

- Se confirma una base visual reconocible: negro, verde lima, tipografía fuerte, header/footer comunes y páginas construidas con secciones reutilizables.
- En las 38 rutas probadas no se detectó desbordamiento horizontal del documento a 390 px. Esto no sustituye revisión de teclado, zoom, tabletas ni lectores de pantalla.
- Hay problemas de contenido y confianza que deben resolverse antes del rediseño visual: carrusel de tecnologías presentado como “últimas soluciones” con 100% de eficacia, textos legales con condiciones de compra/pago/garantía no confirmadas y términos de cuenta/historial con indicadores de respaldo.
- En `/perfil` se ve el fallback “Usuario Tech” y la navegación de pestañas se corta en pantalla móvil; `/perfil/compras` presenta saldo y pedidos en cero. Durante la revisión, las peticiones de sesiones e historial dieron 502 porque el backend no estaba disponible. No se inferirá que los valores representan datos reales.
- UI-1 retiró la pantalla de carga cronometrada y el componente `PantallaCarga.jsx`; el contenido de Inicio se muestra sin esa espera ficticia.
- La consola mostró 2 avisos de claves duplicadas en React y errores de red 502 en endpoints de perfil/compras. Los errores 502 son limitación del entorno de auditoría; la causa de las claves duplicadas está por revisar.

## Hallazgos por prioridad

### P0 — Veracidad de contenido y confianza

1. **Inicio (`/`)**: el H1 “¿Idea, problema o necesidad? Hagámoslo” y la promesa “cualquier tipo de cliente y cualquier necesidad” exceden el alcance del Catálogo Maestro. Mantener la propuesta amplia, pero delimitarla a desarrollo digital, diseño y acompañamiento académico. La sección “Últimas soluciones disponibles” muestra tecnologías (React, Tailwind CSS, JavaScript, TypeScript), no soluciones o casos; añade estrellas y “Eficacia: 100%” sin evidencia visible. Replantear esa sección como capacidades/áreas confirmadas o mostrar proyectos reales con autorización.
2. **Condiciones (`/condiciones`)**: se promete garantía de defectos y una política de ajustes, sin política aprobada que determine plazos, cobertura y exclusiones.
3. **Términos (`/terminos`)**: se publican QR y transferencias como medios aceptados, factura por servicio, pagos cifrados y cancelaciones. Son condiciones comerciales/operativas no confirmadas.
4. **Privacidad (`/privacidad`)**: fija retención de datos, periodo fiscal, datos de pago/NIT, derechos “garantizados” y fecha de actualización. Requiere cotejo con prácticas reales y revisión responsable antes de conservarlo como política.
5. **Cookies (`/cookies`)**: describe un flujo de dispositivo → servidor → base de datos → análisis anónimo. Debe coincidir con cookies, almacenamiento, analítica y terceros realmente activos.
6. **Páginas de cuenta (`/perfil`, `/configuracion`, `/perfil/compras`)**: al entrar sin sesión aparecen textos de respaldo y resúmenes en cero; las rutas renderizan contenido sin que esta auditoría haya confirmado una guardia de autenticación. Las respuestas del backend fallaron con 502 en este entorno. Antes de rediseñar, decidir si estas funciones siguen en el alcance del sitio y comprobar acceso, datos y estados vacíos/error con backend disponible.

### P1 — Estructura, coherencia y usabilidad

1. **Pantalla global de carga — resuelto en UI-1**: se retiró el overlay con progreso simulado y el componente legado; no se sustituyó por otra espera.
2. **Rutas de componentes sueltos**: `/inicio/hero`, `/contacto/hero`, `/contacto/formulario`, `/contacto/recursos` y `/contacto/ubicacion` renderizan secciones aisladas. Confirmar si son rutas de previsualización o rutas públicas necesarias; prevenir duplicación en navegación e indexación si son solo internas.
3. **Acerca de HagamosTech**: `/sobre-nosotros` y sus subrutas de historia, misión/visión, valores y videos tienen copy institucional y video que requieren confirmar fuente, vigencia y autorización. Las cuatro páginas hijas no muestran un `h1` propio en la lectura automatizada.
4. **Contacto (`/contactanos`)**: la página combina hero, accesos internos, sede, formulario y recursos. Confirmar teléfono, correo, dirección, horarios y mapas antes de conservarlos. El formulario abre WhatsApp externo y limpia los campos; la fase de conversión debe probar ese handoff con consentimiento y estados claros.
5. **Promociones (`/promociones`)**: el contenido visible ahora describe propuestas, no promociones. El contenido es coherente con la oferta, pero el nombre de la ruta y su ubicación en navegación deben revisarse en la fase de conversión.
6. **Cuenta en móvil**: las pestañas de perfil/compras/configuración exceden el espacio visible del control; aunque no generan overflow de página, parte de las etiquetas queda cortada y no todas las opciones se descubren fácilmente.
7. **Widgets globales — base resuelta en UI-1**: se quitaron indicadores ficticios de presencia/notificación, se añadieron etiquetas y cierre por Escape; WhatsApp explica el salto externo. Pendiente en QA/UI-8 comprobar que no cubran controles en más tamaños y páginas.
8. **Error 500 (`/errors/500`)**: afirma que el equipo fue notificado y ya trabaja en resolverlo. Confirmar que exista esa notificación antes de usar el mensaje; redactar el estado según evidencia real.

### P2 — Pulido visual y deuda técnica a revisar

1. La marca negra/verde lima es consistente, pero el fondo de partículas y cuadrícula se repite en muchas secciones; evaluar dónde aporta y dónde compite con lectura.
2. Inicio tiene un hero fuerte y CTAs claros. En móvil se apilan y no hay overflow; el carrusel/imagen y dos widgets fijos ocupan mucho espacio visual en el primer pantallazo.
3. Servicios de software, web y acompañamiento tienen jerarquía legible y descripciones coherentes con el catálogo; el siguiente rediseño puede reutilizar este patrón con mejoras de densidad y ejemplos.
4. El rastreo de componentes fuente detectó un archivo legado no activo `src/pages/Servicios/SistemasApps/RecorridoSistemasApps.jsx` con una tarjeta DevOps/servidores. No se mostró en la ruta activa durante la auditoría, pero debe permanecer fuera del bundle y revisarse como deuda de limpieza en la fase de servicios.
5. Hay un aviso de React por claves duplicadas con el color `#A3E635`; corregirlo cuando se inspeccione el componente dueño, no como parte de este inventario.

## Matriz de rutas

| Grupo | Ruta | Resultado de UI-0 |
|---|---|---|
| Entrada | `/` | Conservar base visual; corregir amplitud de la promesa y reemplazar carrusel/eficacia no sustentados. |
| Entrada | `/que-hacemos/tecnologia` | Se entiende el área; mantener y revisar consistencia con el Catálogo Maestro en UI-2. |
| Entrada | `/que-hacemos/academia` | Página clara y apta para móvil; alinear niveles ofrecidos/disponibilidad con el catálogo. |
| Entrada | `/que-hacemos/negocios` | Ruta coherente; mantener en UI-2/UI-3 y comprobar que su alcance no sugiera otros verticales. |
| Entrada | `/que-hacemos/personalizado` | Flujo Contanos → Revisamos → Proponemos → Desarrollamos claro; conservar como entrada a evaluación. |
| Interna | `/inicio/hero` | Renderiza el hero por separado; confirmar si es ruta técnica o página pública antes de redirigir/retirar. |
| Servicios | `/servicios/desarrollo-web` | Estructura legible y catálogo visible; preservar alcance sujeto a evaluación. |
| Servicios | `/servicios/sistemas-apps` | Página activa sin texto DevOps en el DOM; retirar o aislar el componente legado fuera de alcance. |
| Servicios | `/servicios/para-tu-negocio` | Alineada con recursos de marca y catálogo; mantener. |
| Servicios | `/servicios/apoyo-academico` | Mensaje formativo claro en móvil; mantener y alinear niveles/materias disponibles. |
| Servicios | `/servicios/empleo` | Oferta entendible; revisar que los entregables y capacidades sigan vigentes. |
| Servicios | `/servicios/diseno-grafico` | Oferta entendible; revisar ejemplos y catálogo antes del rediseño. |
| Legal | `/condiciones` | Requiere aprobación de garantías, revisiones, entregas y cancelaciones antes de publicar. |
| Legal | `/privacidad` | Requiere verificación de datos, finalidades y plazos reales de retención. |
| Legal | `/terminos` | Requiere confirmar medios de pago, facturación, seguridad de pagos y políticas de compra. |
| Legal | `/cookies` | Requiere cotejar el texto con cookies, almacenamiento y analítica realmente implementados. |
| Empresa | `/sobre-nosotros` | Revisar afirmaciones institucionales y fuentes; conserva jerarquía base. |
| Empresa | `/sobre-nosotros/historia` | Sin `h1` propio detectado; verificar el relato antes de reorganizar. |
| Empresa | `/sobre-nosotros/mision-vision` | Sin `h1` propio detectado; revisar coherencia con el posicionamiento vigente. |
| Empresa | `/sobre-nosotros/valores` | Sin `h1` propio detectado; conservar solo valores aprobados. |
| Empresa | `/sobre-nosotros/videos` | Sin `h1` propio detectado; verificar videos, derechos y afirmaciones antes de publicar. |
| Conversión | `/promociones` | Contenido actual explica propuestas; revisar URL y navegación, no inventar promociones. |
| Conversión | `/como-trabajamos` | Proceso comprensible; alinear etapas con la forma real de contratación y entrega. |
| Contacto | `/contactanos` | Confirmar canales y ubicación; revisar formulario y el salto a WhatsApp en UI-4. |
| Interna | `/contacto/hero` | Hero aislado; confirmar propósito y si debe indexarse. |
| Interna | `/contacto/formulario` | Formulario aislado; confirmar propósito y acceso; probar envío sin suplantar éxito. |
| Interna | `/contacto/recursos` | Recursos aislados; confirmar si requieren una página propia o solo sección. |
| Interna | `/contacto/ubicacion` | Sección aislada; confirmar dirección, mapa y utilidad de una URL propia. |
| Acceso | `/recuperar-contrasena` | Revisar flujo completo solicitud → enlace/token → nueva contraseña y textos de estado. |
| Cuenta | `/perfil` | No asumir datos de respaldo como perfil real; decidir guardia de sesión y mejorar pestañas móviles. |
| Cuenta | `/configuracion` | Verificar persistencia real de preferencias, sesiones, 2FA y acciones destructivas. |
| Cuenta | `/perfil/compras` | Verificar backend, estados vacío/error y facturas; no mostrar cero como resultado confirmado si falla carga. |
| Errores | `/errors/401` | Conservar propósito; validar que enlaza a inicio de sesión real. |
| Errores | `/errors/403` | Conservar propósito; aclarar una salida y un canal de soporte vigente. |
| Errores | `/errors/404` | Conservar propósito; ofrecer regreso útil a Inicio/catálogo. |
| Errores | `/errors/419` | Validar expiración de sesión y retorno seguro al inicio de sesión. |
| Errores | `/errors/500` | Retirar afirmación de aviso/notificación no comprobada; verificar el texto de error real. |
| Comodín | `*` | Renderiza 404; probar con enlaces y recarga directa en fase de QA. |

## Evidencia y límites de esta revisión

- Capturas visuales: `output/playwright/ui0-home-desktop.png`, `ui0-home-mobile.png`, `ui0-software-desktop.png`, `ui0-academico-mobile.png`, `ui0-contacto-desktop.png`, `ui0-perfil-mobile.png`.
- Recorrido automatizado de las 38 entradas; a 390 px no se detectó desbordamiento horizontal de documento.
- Se inspeccionaron consola y textos visibles, sin autenticarse, modificar perfil, mandar formularios, aceptar cookies ni realizar compras.
- Backend no iniciado/disponible: peticiones `/api/perfil/sessions` y `/api/compras/historial` devolvieron 502. La auditoría no valida flujos de negocio que requieren backend.
- No se realizó revisión legal, de accesibilidad con lector de pantalla, autenticación completa, breakpoints tablet, redirecciones externas ni confirmación de datos corporativos.

## Orden recomendado después de UI-0

1. ✅ UI-1: sistema compartido; loader ficticio retirado, foco visible y acceso por teclado, widgets sin presencia ficticia, Escape y movimiento reducido. La UI-8 todavía revisará cobertura de widgets en todas las páginas/tamaños.
2. Antes de trabajar UI-4/UI-5/UI-6/UI-7, confirmar datos comerciales/corporativos, políticas legales y comportamiento real de cuenta con backend disponible.
3. Siguiente: UI-2, Inicio y arquitectura de información pública.
4. UI-3: páginas de servicio y catálogo.
5. UI-4: conversión y contacto.
6. UI-5: empresa y confianza.
7. UI-6: cuenta y acceso.
8. UI-7: legal y errores.
9. UI-8: QA integral.
