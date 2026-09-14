# Spec 010 — Contraseñas hasheadas

## Contexto y objetivo
Las contraseñas se guardan y comparan en texto plano (`server/auth/controllers/AuthController.js`,
`prisma/seed.js`). Es un riesgo de seguridad señalado en la Spec 006. Esta spec introduce hashing
con `crypto.scrypt` (nativo de Node, sin dependencias), manteniendo compatibilidad con las cuentas
existentes.

## Usuarios / actores
Todos los usuarios registrados; el equipo de mantenimiento.

## Requisitos funcionales (criterios de aceptación en EARS)
- RF-1: CUANDO un usuario complete su registro (verificación de correo), EL SISTEMA almacenará la contraseña hasheada con scrypt + salt aleatoria.
- RF-2: CUANDO el usuario restablezca o cambie su contraseña, EL SISTEMA la almacenará hasheada.
- RF-3: CUANDO el usuario inicie sesión, EL SISTEMA validará la contraseña comparando contra el hash con comparación en tiempo constante.
- RF-4: SI la contraseña almacenada está en texto plano (dato previo), ENTONCES EL SISTEMA aceptará la coincidencia exacta y migrará esa contraseña a hash tras un inicio de sesión exitoso.
- RF-5: EL SISTEMA comparará la contraseña de forma segura también en `regenerarQR2FA`.
- RF-6: EL SISTEMA creará la cuenta administrador del seed con la contraseña ya hasheada.
- RF-7: EL SISTEMA incluirá tests que verifiquen hash, verificación y compatibilidad con texto plano.

## Requisitos no funcionales
- `crypto.scrypt` nativo de Node (sin dependencias nuevas).
- El login debe seguir funcionando para las cuentas existentes.

## Casos límite
- Contraseña en texto plano que empiece con `scrypt$` → se trata como hash (baja probabilidad); se documenta.
- Contraseña vacía/ausente → no se hashea y se rechaza.
- Parámetros scrypt por defecto de Node (N=16384, r=8, p=1) y salt de 16 bytes.

## Fuera de alcance
- Migración forzada de todos los usuarios en un batch.
- Políticas de complejidad y bloqueo por intentos (ya existe `intentosFallidos`).
- Tokens JWT firmados reales (hoy el token es `token-user-<id>-<ts>`).

## Criterios de finalización
- Registro, login, recuperación y cambio de contraseña usan hash.
- Seed con hash.
- `npm run test:run` (server) en verde con tests de RF-7.

## Dudas abiertas
- Ninguna.
