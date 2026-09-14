# Validación — Spec 006 (Funciones de perfil reales)

Fecha: 2026-09-14

| RF | Criterio | Evidencia | Resultado |
|---|---|---|---|
| RF-1 | Cambio de contraseña válido | Test `perfil.test.js` "cambia la contraseña…" → 200 | ✅ |
| RF-2 | Errores de validación | Test "rechaza… actual no coincide" → 400 y sin update | ✅ |
| RF-3 | Exportar sin secretos | Test "exporta los datos…" (sin `contrasena`/`twoFactorSecret`) | ✅ |
| RF-4 | Desactivar cuenta | `desactivarCuenta` fija `activo=false` (código + ruta) | ✅ |
| RF-5 | Sesiones honestas | Test "informa que no hay sesiones…" → `[]` + `alcance` | ✅ |
| RF-6 | Revocar sesión inexistente | `revocarSesion` → 404 | ✅ |
| RF-7 | Certificado en cliente | `BarraLateralPerfil` usa `html2canvas` + `jsPDF`; build OK | ✅ |
| RF-8 | 401 sin token | Test "responde 401 sin token" | ✅ |

## Verificación global
| Comando | Resultado |
|---|---|
| `npm run test:run` (server) | 3 archivos, **10/10** ✅ |
| `npm run test:run` (raíz) | **15/15** ✅ |
| `npm run lint` | 0 errores, 5 warnings |
| `npm run build` | ✅ |

## Deuda de seguridad documentada
Las contraseñas siguen en texto plano (coherente con el login actual). Migrar a hash es una spec
de seguridad aparte.

## Veredicto
**Spec 006 cumplida.** Las funciones de perfil responden con la verdad y están cubiertas por tests.
