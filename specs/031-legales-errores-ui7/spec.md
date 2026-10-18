# Spec 031 — Documentos legales y recuperación de errores UI-7

## Objetivo

Adaptar las páginas legales y de error existentes para que sean más fáciles de leer,
navegar y usar con teclado, conservando su estructura, contenido, rutas e identidad visual
actual (fondos claros, texto oscuro, acento lima y componentes ya establecidos).

## Requisitos

- RF-1: Mantener las cuatro rutas legales, sus secciones y su contenido existente mientras
  no se confirmen cambios de política con la persona responsable.
- RF-2: Añadir navegación visible entre Condiciones, Privacidad, Términos y Cookies, sin
  reemplazar las secciones existentes.
- RF-3: Los controles interactivos existentes en documentos legales deben tener nombres
  accesibles y poder operarse con teclado; los controles de selección indican su estado.
- RF-4: Las páginas de error conservan el diseño y CTA actuales, respetan movimiento
  reducido, usan salidas que existen y no aseguran notificaciones o reparaciones que el
  sistema no haya confirmado.
- RF-5: Las páginas mantienen ancho adaptable y foco visible, sin cambiar sus rutas.
- RF-6: Pruebas cubren navegación legal, control de estado accesible y lenguaje veraz en
  error 500.

## Fuera de alcance

- Reescribir términos, garantías, privacidad, cookies, retención, derechos o pagos; esos
  textos requieren confirmación del negocio y, cuando aplique, revisión legal.
- Eliminar secciones/componentes, cambiar rutas, servicios, APIs o persistencia.
- Rediseñar el sistema visual general o añadir dependencias.

## Plan

1. Añadir un componente de navegación legal integrado con el estilo actual.
2. Insertarlo en los cuatro documentos, conservando todos los componentes existentes.
3. Hacer accesibles los controles con estado en páginas legales.
4. Corregir afirmaciones no verificadas en los errores y respetar `prefers-reduced-motion`.
5. Añadir pruebas y verificar lint, suite y build.

## Validación

| Requisito | Evidencia | Estado |
|---|---|---|
| RF-1 y RF-2 | Se conservaron las secciones y se añadió navegación a los cuatro documentos; el documento actual se marca con `aria-current`. | ✅ |
| RF-3 | Pestañas y tarjetas seleccionables indican estado y relación con el panel; tarjeta cookie se opera con teclado. | ✅ |
| RF-4 y RF-5 | Error 500 ya no promete aviso técnico; 401/419 abren login en inicio; 404 y 419 usan mensajes comprobables; movimiento reducido desactiva animaciones. | ✅ |
| RF-6 | 3 pruebas nuevas; suite 87/87, lint y build correctos; `git diff --check` limpio. | ✅ |

## Pendientes de contenido

Se conservaron los textos de política existentes. La auditoría previa identificó afirmaciones
que requieren confirmación del negocio (garantías, medios de pago, retención, derechos,
datos tratados y cookies activas). Se revisarán cuando se confirme el contenido real; esta
fase no las borra ni las presenta como contenido jurídicamente validado.

## Estado

Implementación UI-7 completada con alcance de interfaz, navegación y accesibilidad. La
confirmación del contenido legal sigue pendiente del negocio y no bloquea la adaptación
visual realizada en esta fase.
