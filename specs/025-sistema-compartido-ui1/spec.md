# Spec 025 — Sistema compartido UI-1

## Contexto y objetivo

UI-0 encontró una espera inicial fija de más de tres segundos con porcentaje simulado y copy de robótica/servidores, menús de escritorio que dependen de hover, y un widget de WhatsApp que simula presencia, escritura, notificaciones y controles sin acción. Esta fase corrige el shell compartido y la accesibilidad base sin rediseñar páginas ni cambiar la arquitectura de navegación.

## Historias de usuario

- H1: Como visitante quiero llegar al contenido sin esperar una barra de carga ficticia.
- H2: Como persona que navega con teclado quiero ver el foco y abrir los submenús sin usar mouse.
- H3: Como visitante quiero saber que el widget de WhatsApp abre una consulta externa, sin que finja que alguien está en línea.
- H4: Como persona con sensibilidad al movimiento quiero que la interfaz respete la preferencia del sistema.

## Requisitos funcionales

- RF-1: EL SISTEMA no bloqueará el contenido con una pantalla que mida un progreso simulado ni muestre mensajes de servidor, robótica o nivel de calidad no confirmado.
- RF-2: CUANDO un enlace, botón o campo recibe foco visible por teclado, EL SISTEMA mostrará un indicador de foco reconocible sobre fondos claros y oscuros.
- RF-3: CUANDO una persona navegue por teclado, EL SISTEMA permitirá entrar a los submenús del header usando foco, y cerrar el menú móvil con Escape.
- RF-4: LOS WIDGETS globales de contacto/asistencia no mostrarán presencia o notificaciones ficticias; el de WhatsApp explicará que la acción abre WhatsApp para enviar una consulta.
- RF-5: LOS WIDGETS expondrán nombres accesibles en los controles, cerrarán con Escape y no ofrecerán controles decorativos sin función.
- RF-6: CUANDO el sistema operativo prefiera movimiento reducido, EL SISTEMA reducirá animaciones CSS y el movimiento de los widgets globales.
- RF-7: EL SISTEMA conservará la identidad existente y no modificará enlaces de navegación, catálogo, datos de contacto, APIs ni esquema de base de datos.
- RF-8: Las pruebas cubrirán la ausencia del cargador bloqueante, el texto veraz del widget y el comportamiento accesible previsto.

## Fuera de alcance

- Rediseñar Inicio, servicios, contacto, empresa, cuenta o páginas legales.
- Cambiar las rutas, el orden de navegación, datos corporativos o términos comerciales.
- Corregir las políticas legales, sesión/cuenta o el 502 del backend detectados en UI-0.
- Instalar dependencias.

## Plan técnico

1. Quitar de `App.jsx` el overlay de carga cronometrado y su fundido inicial; conservar la carga diferida con `Suspense`.
2. Retirar el componente `PantallaCarga.jsx` si no quedan referencias, evitando mantener copy obsoleto sin uso.
3. En `src/styles/index.css`, agregar estilos globales de `:focus-visible`, soporte `prefers-reduced-motion` y visibilidad de dropdown por `:focus-within`.
4. En `Header.jsx`, cerrar menú móvil con Escape y devolver foco al control; preservar el contrato aria existente del botón móvil.
5. Simplificar `ChatWhatsApp.jsx`: bienvenida estática y veraz, estado neutro, nombres accesibles, Escape/foco, eliminar falsa presencia y controles inactivos.
6. Añadir pruebas de los requisitos comportamentales y verificar navegación por teclado/responsive en navegador.

## Decisiones de interfaz

- Mantener la paleta negra y verde lima existente; el indicador de foco usará borde de contraste doble para verse en claro y oscuro.
- El widget seguirá abriendo un enlace externo a WhatsApp solo por acción explícita; no se enviará nada automáticamente.
- La experiencia inicial mostrará la app directamente, usando `Suspense` para la carga real de módulos por ruta.

## Validación

| Requisito | Evidencia | Estado |
|---|---|---|
| RF-1 | `App.jsx` renderiza sin temporizador; `PantallaCarga.jsx` retirado. En navegador no aparece el copy del loader al abrir Inicio. | ✅ |
| RF-2, RF-3 y RF-6 | Playwright: foco visible con outline, submenú visible al enfocar, Escape cierra menú móvil y devuelve foco; móvil 390 px sin overflow. CSS/widgets respetan movimiento reducido. | ✅ |
| RF-4 y RF-5 | `ChatWhatsApp.test.jsx`: 2 pruebas pasan; suite completa confirma 42/42. WhatsApp abre con mensaje escrito, copy veraz, Escape y retorno de foco. Widgets sin presencia/avisos ficticios ni controles inactivos. | ✅ |
| RF-7 y RF-8 | `npm run lint` sin errores (2 warnings preexistentes), `npm run test:run` 42/42, `npm run build` exitoso y `git diff --check` limpio. | ✅ |

## Estado

Implementada y validada el 2026-10-17. No se alteraron rutas, catálogo, API ni base de datos.
