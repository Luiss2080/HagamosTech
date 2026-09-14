# Plan técnico — Spec 008

## Cambios
- `src/app/App.jsx`:
  - Páginas de ruta con `lazy(() => import(...))`.
  - `<Suspense>` con fallback liviano alrededor de `<Routes>`.
  - `<SeoRuta />` dentro del router.
  - Se eliminan imports muertos (chat no renderizado).
- `src/app/seo.js` (nuevo): mapa de rutas → `{ title, description }`.
- `src/app/seo.test.js` (nuevo).
- `src/components/Layout/Footer.jsx`: enlaces a rutas reales.

## Decisiones técnicas
- **Code-splitting por ruta con `React.lazy`.** Es el mecanismo nativo de React y no añade
  dependencias. _Alternativa descartada: `React.lazy` + manualChunks de Vite (más configuración
  para el mismo objetivo inicial)._
- **Mapa SEO en un módulo aparte (`seo.js`).** Permite testear sin render. _Alternativa descartada:
  lógica embebida en `App.jsx` (difícil de testear)._
- **Fallback de Suspense como contenedor vacío con altura mínima.** Evita saltos de layout.
  _Alternativa descartada: reutilizar la pantalla de carga completa (parpadeo molesto)._
- **Sin unificar paleta en esta spec.** Es un cambio visual amplio y arriesgado; se aísla.

## Estrategia de tests
- `seo.test.js`: títulos de rutas conocidas, prefijos y fallback.
- `npm run build`: comprobar varios chunks y ausencia de aviso > 500 kB.
- E2E existente: home, promociones y novedades siguen cargando sin errores.

## Cobertura de RF
| Parte | RF |
|---|---|
| `React.lazy` + Suspense | RF-1, RF-2 |
| `seo.js` + `SeoRuta` | RF-3, RF-4 |
| Footer | RF-5 |
| Build | RF-6 |
| Fallback 404 | RF-7 |
