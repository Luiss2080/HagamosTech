# Spec 011 — Tokens de sesión firmados

## Contexto y objetivo
Los tokens que emite el login son `token-user-<id>-<timestamp>`: cualquiera puede forjar el de
otro usuario cambiando el `id`. Esta spec los reemplaza por tokens firmados (HMAC-SHA256, estilo
JWT) usando `JWT_SECRET`, sin dependencias nuevas, manteniendo compatibilidad con los tokens
legados mientras expiran.

## Usuarios / actores
Todos los usuarios autenticados.

## Requisitos funcionales (criterios de aceptación en EARS)
- RF-1: CUANDO un usuario inicie sesión (o verifique 2FA/correo), EL SISTEMA emitirá un token firmado con HMAC-SHA256 que incluye `sub`, `iat` y `exp`.
- RF-2: CUANDO llegue una petición autenticada, EL SISTEMA validará la firma y la expiración del token.
- RF-3: SI la firma no coincide o el token expiró, ENTONCES EL SISTEMA no autenticará (401 en los endpoints protegidos).
- RF-4: SI el token tiene el formato legado `token-user-<id>-<ts>`, ENTONCES EL SISTEMA lo aceptará temporalmente (compatibilidad).
- RF-5: EL SISTEMA comparará las firmas en tiempo constante.
- RF-6: EL SISTEMA incluirá tests de firma, verificación, manipulación y expiración.

## Requisitos no funcionales
- Sin dependencias nuevas (`crypto` de Node).
- La expiración por defecto es de 7 días.

## Casos límite
- Token manipulado (payload alterado) → inválido.
- Token vencido → inválido.
- Token ausente o mal formado → inválido.
- `JWT_SECRET` ausente → se usa un valor de desarrollo (no romper el arranque).

## Fuera de alcance
- Refresh tokens y revocación server-side.
- Cookies httpOnly (hoy se usa sessionStorage/cookie desde el cliente).

## Criterios de finalización
- Login/2FA/registro emiten tokens firmados; el middleware los valida.
- Tests de `token.js` en verde; `/api/perfil` sin token sigue en 401.

## Dudas abiertas
- Ninguna.
