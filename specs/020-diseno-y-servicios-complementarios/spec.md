# Spec 020 — Diseño y servicios complementarios

## Contexto y objetivo

Las páginas de emprendimientos, empleo y diseño contenían métricas animadas, marcas/testimonios no verificados y promesas de automatización. Se reemplazan por vistas basadas en el Catálogo Maestro para explicar de manera ordenada diseño, presencia digital, recursos para emprendimientos y apoyo profesional.

## Requisitos funcionales

- RF-1: EL SISTEMA mostrará los servicios de emprendimientos, empleo y diseño desde `SERVICIOS_DATA`.
- RF-2: EL SISTEMA presentará catálogos digitales y recursos gráficos sin respuestas automáticas ni administración de clientes.
- RF-3: EL SISTEMA incluirá servicios de empleo y desarrollo profesional definidos en el catálogo.
- RF-4: EL SISTEMA ofrecerá una página de diseño para los servicios gráficos listados en el catálogo.
- RF-5: EL SISTEMA enlazará la consulta a contacto y no inventará precios, resultados, clientes ni cifras.
- RF-6: EL SISTEMA explicará que el presupuesto y el alcance se acuerdan antes de iniciar.

## Fuera de alcance

- Definir precios, promociones, descuentos, pagos recurrentes o tiempos de entrega.
- Confirmar resultados profesionales o inserción laboral.
- Publicar marcas o testimonios no verificados.

## Plan técnico

1. Crear plantilla reutilizable para categorías informativas.
2. Aplicarla a emprendimientos, empleo, diseño y resumen de negocios.
3. Probar categorías, servicios y enlace de contacto.

## Criterios de finalización

- Las páginas reflejan exactamente la oferta del catálogo.
- No hay afirmaciones de resultados, cifras o automatización.
- Suite, lint y build en verde.
