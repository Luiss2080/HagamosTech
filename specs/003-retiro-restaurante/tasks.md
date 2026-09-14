# Tareas — Spec 003 (Retiro del vertical restaurante y e-commerce)

- [ ] T1. Eliminar `src/pages/Menu/**` y `src/pages/Servicios/restaurante/**`. (RF-2)
      Hecho cuando: las carpetas ya no existen.
- [ ] T2. Eliminar `src/store/catalogo/**`, `src/store/carrito/**` y
      `src/store/useCarritoStore.js`. (RF-2) Hecho cuando: ya no existen.
- [ ] T3. Editar `src/app/App.jsx`: quitar imports/rutas retiradas y `CarritoModal`/`ToastCarrito`.
      (RF-1, RF-3, RF-5) Hecho cuando: el build compila sin esas rutas.
- [ ] T4. Editar `src/app/main.jsx` y `src/components/Layout/Header.jsx`: quitar carrito.
      (RF-3) Hecho cuando: no quedan referencias a `useCarritoStore`.
- [ ] T5. Editar `src/components/func/MigasPan.jsx`: quitar ramas de restaurante, catálogo y
      sucursales. (RF-4) Hecho cuando: no quedan rutas retiradas.
- [ ] T6. Eliminar controladores y rutas de e-commerce en el backend. (RF-7)
      Hecho cuando: los archivos ya no existen.
- [ ] T7. Editar `server/server.js`: quitar imports y `app.use` retirados. (RF-6, RF-8)
      Hecho cuando: arranca y `/api/contacto` sigue disponible.
- [ ] T8. Editar `server/prisma/schema.prisma`: quitar modelos/enums de e-commerce y ejecutar
      `npx prisma generate`. (RF-9, RF-10) Hecho cuando: genera sin error y no se toca la BD.
- [ ] T9. Actualizar `server/README.md` y `src/pages/Inicio/README.md`. (RF-11)
      Hecho cuando: no mencionan el vertical retirado.
- [ ] T10. Verificación: `grep` limpio, `npm run lint`, `npm run build`, `npm run test:run`
      (raíz y server). (RF-12) Hecho cuando: todo verde y `validation.md` escrito.
