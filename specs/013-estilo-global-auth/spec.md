# Spec 013 — Estilo global y autenticación funcional

## Contexto y objetivo
Tras unificar la paleta de Promociones/Novedades, quedaban páginas y componentes con estilos
ajenos a la marca (perfil, modales, legales, etc.). Además, el frontend llamaba a
`localhost:3000`, ocupado por otro proyecto, por lo que **login y registro no funcionaban**. Esta
spec unifica el estilo de todo `src/` a la marca (oscuro + verde lima) y restaura la conectividad
frontend↔backend, dejando login y creación de cuenta operativos.

## Usuarios / actores
Visitantes y usuarios autenticados.

## Requisitos funcionales (criterios de aceptación en EARS)
- RF-1: EL SISTEMA usará la paleta de marca (fondo oscuro + `#A3E635`) en todas las páginas y componentes de `src/`.
- RF-2: EL SISTEMA mostrará texto legible (claro sobre oscuro; oscuro sobre superficies lima), incluidos inputs y tarjetas.
- RF-3: EL SISTEMA conectará el frontend con el backend en desarrollo mediante el proxy de Vite (`/api` → `VITE_API_PROXY_TARGET`, por defecto `http://localhost:4321`).
- RF-4: CUANDO un usuario ingrese credenciales válidas, EL SISTEMA lo autenticará y mostrará su nombre en la interfaz.
- RF-5: CUANDO un usuario complete el registro y el código de verificación, EL SISTEMA creará la cuenta e iniciará sesión.
- RF-6: SI el backend recibe un JSON malformado, ENTONCES EL SISTEMA responderá `400` sin caerse.
- RF-7: EL SISTEMA usará el puerto `4321` para el backend en desarrollo (evita otros proyectos).

## Requisitos no funcionales
- Sin dependencias nuevas.
- El frontend no debe depender de un puerto ocupado por terceros.

## Casos límite
- Puertos 3000/3001 ocupados por otros proyectos → backend en 4321 y proxy.
- `bg-white` sólido convertido a superficie oscura no debe dejar texto oscuro sobre oscuro.

## Fuera de alcance
- Rediseño de layout; solo paleta y conectividad.
- Entrega real de correos a dominios inexistentes (depende del SMTP/dominio de producción).

## Criterios de finalización
- Capturas de varias páginas y del login con la paleta de marca.
- Login UI y registro UI verificados de punta a punta.
- `npm run lint`, `npm run test:run` (raíz y server), `npm run build` y `npm run test:e2e` en verde.

## Dudas abiertas
- Ninguna.
