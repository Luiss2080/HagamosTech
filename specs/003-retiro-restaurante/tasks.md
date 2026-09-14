# Tareas — Spec 003 (Retiro del vertical restaurante y e-commerce)

- [x] T1. Eliminar `src/pages/Menu/**` y `src/pages/Servicios/restaurante/**`. (RF-2)
- [x] T2. Eliminar `src/store/catalogo/**`, `src/store/carrito/**` y
      `src/store/useCarritoStore.js`. (RF-2)
- [x] T3. Editar `src/app/App.jsx`: quitar imports/rutas retiradas y `CarritoModal`/`ToastCarrito`.
      (RF-1, RF-3, RF-5)
- [x] T4. Editar `src/app/main.jsx` y `src/components/Layout/Header.jsx`: quitar carrito.
      (RF-3)
- [x] T5. Editar `src/components/func/MigasPan.jsx`: quitar ramas de restaurante, catálogo y
      sucursales. (RF-4)
- [x] T6. Eliminar controladores y rutas de e-commerce en el backend. (RF-7)
- [x] T7. Editar `server/server.js`: quitar imports y `app.use` retirados; añadir 410 para los
      endpoints retirados. (RF-6, RF-8)
- [x] T8. Editar `server/prisma/schema.prisma` y ejecutar `npx prisma generate` (sin `db push`).
      (RF-9, RF-10)
- [x] T9. Actualizar `server/README.md` y `src/pages/Inicio/README.md`. (RF-11)
- [x] T10. Verificación: `grep`, `npm run lint`, `npm run build`, `npm run test:run` (raíz y
      server) y E2E. (RF-12)
