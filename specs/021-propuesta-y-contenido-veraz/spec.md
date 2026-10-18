# Spec 021 — Propuestas y contenido veraz

## Contexto y objetivo

Promociones mostraba precios, descuentos y planes de mantenimiento sin confirmación. Novedades incluía eventos, premios, alianzas y cifras no verificadas. El chat afirmaba servicios y métodos de pago que no están confirmados. Esta spec presenta un flujo honesto de propuesta y alinea las respuestas del asistente con el catálogo.

## Requisitos funcionales

- RF-1: EL SISTEMA explicará que el presupuesto se define según servicio, alcance y entregables acordados.
- RF-2: EL SISTEMA no presentará precios, descuentos, planes, pagos o tiempos de entrega no confirmados.
- RF-3: EL SISTEMA ofrecerá una acción clara para solicitar una propuesta por contacto.
- RF-4: EL ASISTENTE describirá las áreas y servicios del Catálogo Maestro, incluyendo mentorías y acompañamiento académico.
- RF-5: CUANDO alguien consulte por automatización, n8n, IA aplicada, DevOps, servidores o infraestructura compleja, EL ASISTENTE informará que esos servicios no se ofrecen.
- RF-6: EL SISTEMA no mostrará en rutas activas eventos, premios, alianzas, clientes o cifras de éxito no confirmados.

## Fuera de alcance

- Integración de pasarelas de pago o fijación de precios comerciales.
- Crear noticias reales, promociones o casos de estudio sin información del equipo.
- Cambiar el backend o automatizar presupuestos.

## Plan técnico

1. Reemplazar la página promocional por el proceso de propuesta.
2. Retirar la ruta de Novedades mientras no exista contenido confirmado; conservar el carrusel de servicios vigentes en Inicio.
3. Alinear respuestas rápidas y base de conocimiento de Niko.
4. Añadir pruebas para propuesta y respuestas excluidas.

## Criterios de finalización

- La página de propuesta no contiene precios inventados y deriva a contacto.
- Niko responde con la oferta vigente y aclara las exclusiones.
- Suite, lint y build en verde.
