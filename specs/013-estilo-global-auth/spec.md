# Spec 013 — Estilos claros y autenticación funcional

## Contexto y objetivo
Se intentó unificar la paleta de **todo** `src/` a oscuro, pero eso oscureció botones, tarjetas,
inputs y datos que estaban en **blanco** y debían seguir así. Esta spec **revierte ese oscurecido
global**, conserva la unificación de paleta de `Promociones`/`Novedades` y del hero (Spec 012), y
deja **login y creación de cuenta funcionando** (el frontend no podía alcanzar la API porque
`localhost:3000` estaba ocupado por otro proyecto).

## Usuarios / actores
Visitantes y usuarios autenticados.

## Requisitos funcionales (criterios de aceptación en EARS)
- RF-1: EL SISTEMA conservará en **blanco** las superficies, botones, tarjetas y datos que originalmente eran blancos (perfil, modales, contacto, legales, servicios).
- RF-2: EL SISTEMA mantendrá la paleta de marca (oscuro + `#A3E635`) en `Promociones`, `Novedades` y el hero compartido.
- RF-3: EL SISTEMA conectará el frontend con el backend en desarrollo mediante el proxy de Vite (`/api` → `VITE_API_PROXY_TARGET`, por defecto `http://localhost:4321`).
- RF-4: CUANDO un usuario ingrese credenciales válidas, EL SISTEMA lo autenticará y mostrará su nombre en la interfaz.
- RF-5: CUANDO un usuario complete el registro y el código de verificación, EL SISTEMA creará la cuenta e iniciará sesión.
- RF-6: SI el backend recibe un JSON malformado, ENTONCES EL SISTEMA responderá `400` sin caerse.
- RF-7: EL SISTEMA usará el puerto `4321` para el backend en desarrollo (evita otros proyectos).

## Requisitos no funcionales
- Sin dependencias nuevas.
- Sin pérdida de contraste: texto oscuro sobre superficies blancas; texto claro sobre fondo oscuro.

## Casos límite
- Puertos 3000/3001 ocupados por terceros → backend en 4321 y proxy de Vite.
- Un input blanco con texto oscuro no debe volverse oscuro.

## Fuera de alcance
- Rediseñar el estilo de las páginas que ya usan la marca (Promociones/Novedades/hero) más allá de lo aprobado.
- Entrega real de correos a dominios inexistentes (depende del SMTP/dominio de producción).

## Criterios de finalización
- Elementos blancos restaurados (verificado con capturas).
- Login y registro verificados de punta a punta.
- `npm run lint`, `npm run test:run` (raíz y server), `npm run build` y `npm run test:e2e` en verde.

## Dudas abiertas
- [NECESITA ACLARACIÓN] ¿Se desea, en el futuro, llevar los acentos verdes al resto del sitio **manteniendo** las superficies blancas?
