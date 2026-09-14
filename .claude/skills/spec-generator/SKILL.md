---
name: spec-generator
description: Genera o actualiza una especificación SDD (spec.md) para HagamosTech. Úsala cuando haya que definir una nueva funcionalidad o vertical antes de tocar código, entrevistando al usuario y produciendo requisitos funcionales en notación EARS. Trigger: crear/actualizar spec, nuevo requisito, /spec.
---

# spec-generator

Genera especificaciones para HagamosTech siguiendo el flujo SDD
(Constitución → Spec → Clarificación → Plan → Tareas → Implementación → Validación).

## Reglas
- **No escribas código** durante la entrevista ni en la spec.
- Antes de empezar, lee `docs/constitution.md` y `docs/catalogo-servicios.md`.
- Escribe **solo el QUÉ y el POR QUÉ**, nunca el cómo (eso es el `plan.md`).
- Una spec = una funcionalidad/vertical acotado. No mezcles temas.
- Toda salida va en español.

## Entrevista (máximo 6 preguntas, de una en una)
Pregunta de a una, esperando respuesta, sobre:
1. Problema y objetivo real (¿qué duele hoy?).
2. Usuarios/actores.
3. Alcance mínimo y qué queda **fuera**.
4. Casos límite y estados de error.
5. Reglas de negocio y restricciones.
6. Criterios de finalización verificables.

Si una respuesta contradice la constitución o el catálogo, señálalo antes de continuar.

## Salida
Crea `specs/NNN-<slug>/spec.md` con esta plantilla:

```markdown
# Spec NNN — <Nombre de la funcionalidad>

## Contexto y objetivo
<Qué problema resuelve y por qué. Un párrafo.>

## Usuarios / actores
<Quién lo usa.>

## Historias de usuario
- H1: Como <rol> quiero <acción> para <beneficio>.

## Requisitos funcionales (criterios de aceptación en EARS)
- RF-1: CUANDO <evento>, EL SISTEMA <respuesta> (salida/resultado esperado).
- RF-2: SI <condición no deseada>, ENTONCES EL SISTEMA <respuesta>.
- RF-3: MIENTRAS <estado>, EL SISTEMA <respuesta>.
- RF-4: EL SISTEMA <comportamiento permanente>.

## Requisitos no funcionales
<Solo los que apliquen: rendimiento, seguridad, plataformas, idioma...>

## Casos límite
<Vacíos, duplicados, datos corruptos, límites, concurrencia...>

## Fuera de alcance
<Lo que explícitamente NO se hace en esta iteración.>

## Criterios de finalización
<Ej.: todos los RF con test en verde + demo manual del flujo principal.>

## Dudas abiertas
- [NECESITA ACLARACIÓN] <duda>
```

## Después de generar
1. Ofrece una **clarificación** (revisión como QA: ambigüedades, contradicciones, casos
   límite ausentes, conflictos con la constitución). Solo detecta, no resuelvas.
2. Si el usuario aprueba, continúa con `plan.md` (módulos, modelo de datos, decisiones con su
   alternativa descartada, estrategia de tests y qué RF cubre cada parte) y luego `tasks.md`
   (tareas < 30 min, ordenadas por dependencia, cada una con sus RF y un "Hecho cuando:"
   verificable, con checkboxes).
