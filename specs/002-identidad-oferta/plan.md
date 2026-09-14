# Plan técnico — Spec 002

## Estructura de módulos
- `src/data/serviciosData.js` → fuente canónica de la oferta (RF-1).
- `src/data/serviciosData.test.js` → test de integridad (RF-2..RF-6).
- `README.md` → descripción real del proyecto (RF-8).
- `src/pages/Servicios/README.md` → descripción real del módulo de servicios (RF-8).
- `docs/catalogo-servicios.md` → espejo legible del catálogo (RF-9).

## Modelo de datos
No aplica (datos estáticos en JS). Se valida la forma:
```
{ id, name, icon, img, category, pillLabel, shortDesc,
  stats: [{ icon, label, value }], includes: [{ icon, label }], cta, ctaLink, price }
```

## Decisiones técnicas
- **Fuente canónica en código, no en Markdown.** `serviciosData.js` es lo que renderiza la UI;
  el Markdown (`docs/catalogo-servicios.md`) se mantiene como espejo legible. _Alternativa
  descartada: parsear el Markdown en build (agrega complejidad y una dependencia para un
  beneficio marginal)._
- **Test de integridad en el frontend con Vitest.** Sin dependencias nuevas gracias a la
  Spec 001. _Alternativa descartada: script de validación aparte (no queda cubierto por `test:run`)._
- **Prohibición de términos por lista explícita**, no por heurística. _Alternativa descartada:
  buscar "restaurante" en general (daría falsos positivos con servicios gastronómicos legítimos)._
- **Alineación manual del copy de páginas individuales** por ahora (ver duda abierta). _Alternativa
  descartada: reescribir todas las páginas para que consuman los datos (mayor alcance; se evalúa
  en una spec posterior)._

## Estrategia de tests
- Test de estructura: 8 categorías y campos obligatorios (RF-2, RF-4).
- Test de conteo exacto 6/6/6/5/5/3/3/1 (RF-3).
- Test de unicidad de `id` por categoría (RF-5).
- Test de términos prohibidos (RF-6).
- Los typos y READMEs no se testean automáticamente; se validan en la revisión manual (RF-7, RF-8, RF-9).

## Cobertura de RF por parte
| Parte | RF |
|---|---|
| `serviciosData.js` + test | RF-1..RF-6 |
| READMEs | RF-8 |
| `docs/catalogo-servicios.md` | RF-9 |
| Correcciones de copy | RF-7 |
