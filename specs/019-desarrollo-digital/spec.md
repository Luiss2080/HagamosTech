# Spec 019 — Presentación del desarrollo digital

## Contexto y objetivo

Las páginas de tecnología y sistemas ofrecían DevOps, servidores, hosting, automatización, infraestructura y métricas/testimonios no confirmados. La oferta vigente se centra en páginas web, sistemas y bases de datos definidos por alcance. Esta spec reemplaza esas promesas por páginas derivadas del Catálogo Maestro.

## Requisitos funcionales

- RF-1: EL SISTEMA mostrará los servicios web definidos en `SERVICIOS_DATA.web`.
- RF-2: EL SISTEMA mostrará los servicios de software definidos en `SERVICIOS_DATA.software`.
- RF-3: EL SISTEMA explicará que cada proyecto se evalúa y acuerda por alcance, entregables, tiempos y presupuesto.
- RF-4: EL SISTEMA no ofrecerá DevOps, servidores, hosting, infraestructura compleja, automatizaciones ni IA aplicada a procesos.
- RF-5: EL SISTEMA enlazará a contacto sin simular cotización automática.
- RF-6: EL SISTEMA quitará pruebas sociales y métricas comerciales no verificadas de las páginas tecnológicas actualizadas.

## Fuera de alcance

- Definir stacks tecnológicos como garantía o comprometer soporte/mantenimiento recurrente.
- Prometer pagos en línea, apps móviles o integraciones hasta confirmar el alcance comercial.
- Implementar funcionalidades de software descritas como servicios.

## Plan técnico

1. Crear una plantilla de presentación reutilizable que renderice servicios del catálogo.
2. Usarla para las rutas de tecnología, páginas web y sistemas.
3. Añadir pruebas que comprueben categorías y exclusiones.
4. Actualizar metadatos SEO.

## Criterios de finalización

- Las tres rutas usan datos del catálogo en vez de listas duplicadas.
- Los textos indican revisión de viabilidad y alcance.
- Pruebas, lint y build en verde.
