# Spec 009 — Alineación total al Catálogo Maestro

## Contexto y objetivo
Una auditoría de todo el texto visible del frontend (Fases A–E) detectó contenido que no
pertenece al Catálogo Maestro: resto de restaurante, libros escolares, Arduino/LEGO, "modo
invitado", cupones de "primer pedido", servicios fuera de catálogo (cloud, ciberseguridad, ERP,
mentoría, headhunting, E-Learning, estadística) y clientes/marcas no verificados. Esta spec
corrige todo y blinda la alineación con tests.

## Usuarios / actores
Visitantes, y el equipo que mantiene la oferta.

## Requisitos funcionales (criterios de aceptación en EARS)
- RF-1: EL SISTEMA mostrará en `serviciosData.js` los nombres exactos de los servicios del Catálogo Maestro.
- RF-2: EL SISTEMA no incluirá en el frontend términos fuera del catálogo (restaurante, libros, Arduino, LEGO, "robotics academy", "modo invitado", "primer pedido", mentoría, headhunting, ciberseguridad).
- RF-3: EL SISTEMA eliminará la funcionalidad de "modo invitado"/cupón de primer pedido (modales, botones y lógica de acceso a libros).
- RF-4: EL SISTEMA eliminará la sección de clientes con marcas reales no verificadas y la reemplazará por ejemplos de soluciones con los clientes de referencia del catálogo.
- RF-5: EL SISTEMA alineará los servicios mostrados en `QueHacemos/*` y `Servicios/*` a la oferta real.
- RF-6: EL SISTEMA corregirá los testimonios y ejemplos con rubros fuera de catálogo (restaurantes, snacks, IoT).
- RF-7: EL SISTEMA corregirá los términos legales (Términos, Condiciones) al modelo de servicios.
- RF-8: EL SISTEMA incluirá tests que verifiquen (a) los nombres exactos del catálogo y (b) la ausencia de términos prohibidos en todo `src/`.
- RF-9: EL SISTEMA retirará el backend de cupones (`/api/cupones-sistema`, `CuponController`/`cuponRoutes`, modelo `CuponDescuento` y su creación en el registro), que no corresponde al catálogo.

## Requisitos no funcionales
- Sin cambios de diseño; solo contenido.
- Mensajes en español.

## Casos límite
- Términos que son subcadenas de palabras válidas (p. ej. "erp" en "PowerPoint") → no se usan como filtro.
- "robótica educativa" y "esquemas anatómicos"/"ciencias de la salud" SÍ están en el catálogo → se permiten.
- Nombres de variables internas no disparan el test de términos.

## Fuera de alcance
- Retirar el modelo/endpoint backend de cupones (sigue existiendo pero ya no se ofrece en la UI).
- Unificación de paleta de diseño (Spec de diseño aparte).
- Hashing de contraseñas.

## Criterios de finalización
- `contenidoTech.test.js` recorre todo `src/` sin términos prohibidos.
- `serviciosData.test.js` valida nombres exactos por categoría.
- `npm run lint`, `npm run test:run` (raíz y server), `npm run build` y `npm run test:e2e` en verde.

## Dudas abiertas
- Ninguna. (Se retiró también el backend de cupones, RF-9.)
