# Spec 003 — Retiro del vertical restaurante y e-commerce

## Contexto y objetivo
La app convive con dos negocios: tecnología (Header, `serviciosData.js`) y restaurante
(`/menu/*`, `/catalogo`, delivery, mayor, catering, congeladas). El alcance decidido es **solo
tecnología**. Esta spec retira el código del vertical restaurante/e-commerce (frontend y
backend) y su esquema Prisma, sin tocar la base de datos en esta iteración, para que el código
deje de ofrecer algo que el negocio ya no brinda.

## Usuarios / actores
- Visitantes (ven solo la oferta tech).
- Desarrolladores y agentes (el árbol deja de tener el vertical muerto).

## Historias de usuario
- H1: Como visitante no quiero encontrar menús ni tienda de salteñería.
- H2: Como desarrollador quiero un árbol sin código del vertical retirado.
- H3: Como responsable de datos quiero que la BD no se altere todavía.

## Requisitos funcionales (criterios de aceptación en EARS)

### Frontend
- RF-1: EL SISTEMA no expondrá las rutas `/menu/*`, `/servicios/delivery`, `/servicios/mayor`, `/servicios/eventos`, `/servicios/corporativo`, `/servicios/congeladas`, `/catalogo`, `/catalogo/:id` ni `/pago-movil`.
- RF-2: EL SISTEMA eliminará las carpetas `src/pages/Menu/**`, `src/pages/Servicios/restaurante/**`, `src/store/catalogo/**`, `src/store/carrito/**` y el archivo `src/store/useCarritoStore.js`.
- RF-3: EL SISTEMA eliminará el carrito de la interfaz: botones en `Header.jsx`, montaje en `App.jsx` y arranque en `main.jsx`.
- RF-4: EL SISTEMA eliminará de `MigasPan.jsx` las ramas de restaurante, catálogo y sucursales.
- RF-5: SI un usuario navega a una ruta retirada, ENTONCES EL SISTEMA mostrará la página 404.

### Backend
- RF-6: EL SISTEMA no expondrá los endpoints `/api/catalogo`, `/api/carrito`, `/api/compras` ni `/api/pagos`.
- RF-7: EL SISTEMA eliminará los controladores y rutas de `catalogo`, `carrito`, `compra` y `pago` del backend.
- RF-8: EL SISTEMA mantendrá operativo el endpoint `/api/contacto` y los de autenticación.
- RF-9: EL SISTEMA retirará del esquema Prisma los modelos y enums de e-commerce (`ClienteUsuario`, `PasosCatalogo`, `categoria`, `producto`, `carrito_item`, `compra`, `compra_item`, `sucursal`, `InventarioSucursal`, `pago` y sus enums).
- RF-10: EL SISTEMA NO ejecutará `prisma db push` ni modificará datos de la base en esta iteración.

### Documentación y verificación
- RF-11: EL SISTEMA actualizará la documentación afectada (`server/README.md`, `src/pages/Inicio/README.md`).
- RF-12: EL SISTEMA dejará `npm run lint`, `npm run build` y `npm run test:run` en verde tras el retiro.

## Requisitos no funcionales
- No romper la navegación tech ni los tests existentes.
- Idioma español.

## Casos límite
- Enlaces residuales a `/catalogo` (p. ej. en carruseles de Promociones) → se resuelven en Spec 004.
- El Prisma Client puede fallar si el esquema cambia sin `prisma generate`; el build del frontend no depende de eso, pero se regenerará en la validación para no dejar el backend roto.
- `seed.js` no siembra productos: no requiere cambios (verificado).

## Fuera de alcance
- Reescribir el contenido de `Promociones` y `Novedades` a tecnología (Spec 004).
- Redirecciones 301 y limpieza de assets de imágenes del restaurante.
- Migración/borrado de tablas en MySQL.
- SEO (Spec 007) y API veraz (Spec 005).

## Criterios de finalización
- No queda ninguna referencia a los módulos retirados (`grep` limpio).
- `npm run lint`, `npm run build`, `npm run test:run` (raíz y server) en verde.
- `server/prisma/schema.prisma` sin modelos de e-commerce y `npx prisma generate` exitoso.

## Dudas abiertas
- Ninguna. (BD: retirar código sin tocar la BD, aprobado.)
