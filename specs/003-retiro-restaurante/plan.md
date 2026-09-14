# Plan técnico — Spec 003

## Archivos a eliminar
Frontend:
- `src/pages/Menu/**`
- `src/pages/Servicios/restaurante/**`
- `src/store/catalogo/**`
- `src/store/carrito/**`
- `src/store/useCarritoStore.js`

Backend:
- `server/store/routes/catalogoRoutes.js`, `carritoRoutes.js`, `compraRoutes.js`, `pagoRoutes.js`
- `server/store/controllers/CatalogoController.js`, `CarritoController.js`, `CompraController.js`, `PagoController.js`

## Archivos a editar
- `src/app/App.jsx` → quitar imports y rutas retiradas; quitar `CarritoModal` y `ToastCarrito`.
- `src/app/main.jsx` → quitar `useCarritoStore` y su `init()`.
- `src/components/Layout/Header.jsx` → quitar carrito (móvil y escritorio) y `useCarritoStore`.
- `src/components/func/MigasPan.jsx` → quitar ramas de menú, catálogo, sucursales.
- `server/server.js` → quitar imports y `app.use` de catálogo, pagos, carrito y compras.
- `server/prisma/schema.prisma` → quitar modelos y enums de e-commerce.
- `server/README.md` y `src/pages/Inicio/README.md` → actualizar.

## Modelo de datos
Se eliminan del schema los modelos `ClienteUsuario`, `PasosCatalogo`, `categoria`, `producto`,
`carrito_item`, `compra`, `compra_item`, `sucursal`, `InventarioSucursal`, `pago` y los enums
`pago_metodoPago`, `pago_estado`, `compra_metodoPago`, `compra_estado`. Se conservan `Usuario`,
`Rol`, `Permiso`, `DetalleRolPermisos`, `Suscripcion`, `CuponDescuento`, verificación,
recuperación, `RegistroPendiente` y `mensaje`. **No se ejecuta `db push`.**

## Decisiones técnicas
- **Borrar, no archivar.** Es código muerto y contradictorio con el alcance; el historial de git
  conserva la versión anterior. _Alternativa descartada: mover a una carpeta `legacy/` (deja ruido
  y riesgo de uso accidental)._
- **404 en rutas retiradas, sin redirecciones.** La app usa `HashRouter` y el fallback ya es
  `Error404`. Las redirecciones 301/SEO se evalúan en Spec 007. _Alternativa descartada: redirigir
  a `/` (oculta el cambio al usuario)._
- **Prisma: retirar del schema sin migrar.** Aprobado por el usuario para no borrar tablas/datos.
  Se ejecuta solo `prisma generate` para no romper el arranque del backend. _Alternativa descartada:
  `db push` (irreversible sobre datos locales)._
- **`Promociones`/`Novedades` se posponen a Spec 004.** Su contenido completo es del restaurante;
  reescribirlo merece su propia spec. En esta spec se deja el link `/catalogo` del carrusel como
  deuda documentada. _Alternativa descartada: reescribirlas ahora (mezcla borrado con contenido)._

## Estrategia de tests
- `npm run build` como verificación de que no quedan imports rotos.
- `npm run test:run` (integridad de oferta + humo) en verde.
- `grep` de verificación: sin referencias a `useCarritoStore`, `store/catalogo`,
  `store/carrito`, `pages/Menu`, `restaurante/`.
- `npx prisma generate` exitoso.

## Cobertura de RF por parte
| Parte | RF |
|---|---|
| Rutas y páginas frontend | RF-1, RF-2, RF-5 |
| Header/App/main/MigasPan | RF-3, RF-4 |
| server.js + controladores/rutas | RF-6, RF-7, RF-8 |
| Prisma schema | RF-9, RF-10 |
| READMEs | RF-11 |
| Verificación global | RF-12 |
