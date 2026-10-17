# Spec 018 — Acompañamiento académico

## Contexto y objetivo

La oferta académica estaba presentada como servicios para tesis universitarias y proyectos complejos. HagamosTech también atiende tareas, informes, monografías y proyectos socioformativos de colegio, secundaria y universidad. La página debe explicar el acompañamiento de forma sencilla y respetar los servicios definidos en el Catálogo Maestro.

## Requisitos funcionales

- RF-1: EL SISTEMA presentará acompañamiento para estudiantes de colegio, secundaria y universidad.
- RF-2: EL SISTEMA explicará mentorías, apoyo en tareas, informes, monografías, proyectos socioformativos y el resto de los servicios académicos del catálogo.
- RF-3: EL SISTEMA indicará que el estudiante desarrolla y presenta su propio trabajo, y describirá la labor como explicación, orientación y revisión de avances.
- RF-4: EL SISTEMA mostrará los servicios directamente desde `SERVICIOS_DATA.estudiantes` para mantener una sola fuente de nombres y descripciones.
- RF-5: EL SISTEMA ofrecerá una acción clara para consultar disponibilidad y compartir la consigna.
- RF-6: EL SISTEMA no presentará clientes, testimonios, notas garantizadas ni cifras de éxito no verificadas.

## Fuera de alcance

- Definir precios, modalidad, horarios, materias específicas o tiempo de respuesta.
- Afirmar que se redactan trabajos completos para su entrega como propios.
- Cambiar el resto de categorías o las páginas de desarrollo web/software.

## Plan técnico

1. Crear un componente académico compartido por las rutas de resumen y servicio.
2. Renderizar los nueve servicios desde el catálogo actual.
3. Añadir prueba para niveles, servicios principales, enfoque y enlaces de contacto.
4. Retirar la antigua sección académica que contenía testimonios y clientes no verificados.

## Criterios de finalización

- La página indica con claridad los niveles atendidos y los tipos de acompañamiento.
- Los servicios visibles coinciden con el catálogo.
- Pruebas, lint y build en verde.
