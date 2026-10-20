# Validación — Spec 006 (Funciones de perfil reales)

Fecha: 2026-10-19

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
| RF-9..RF-14 | Privacidad, validación y alcance del espacio personal | `server/test/espacioPersonal.test.js` y `server/test/perfil.test.js` | ✅ |
| RF-15 | PostgreSQL como única base activa | `DATABASE_URL` conecta como rol de aplicación a `hagamostech`; Prisma consulta las 12 tablas activas | ✅ |
| RF-16 | Registro, verificación e inicio de sesión | `server/test/registroPostgresql.test.js` + smoke real HTTP contra PostgreSQL: 201 → 200 → 200, token válido; cuenta de prueba eliminada | ✅ |
| RF-17 | Importación de datos activos y relaciones | Migrador ejecutado: roles=4, permisos=3, detalle_rol_permisos=3, usuarios=2, registros_pendientes=4, mensajes=2; tablas restantes=0; IDs conservados | ✅ |
| RF-18 | Composición visual como Contáctanos | `EspacioPersonalPagina.jsx` con hero centrado, fondo de marca y panel amplio en dos columnas; build de producción correcto | ✅ |

## Verificación global
| Comando | Resultado |
|---|---|
| `npm run test:run` (server) | 9 archivos, **46/46** ✅ |
| `npm run test:run` (raíz) | 18 archivos, **56/56** ✅ |
| `npm run lint` | ✅ sin errores |
| `npm run build` | ✅ Vite compiló 2170 módulos |

## Deuda de seguridad documentada
Las cuentas existentes usan el soporte de migración transparente de contraseña al iniciar sesión;
el alta nueva almacena el hash durante la verificación. La importación conserva los valores
históricos para permitir ese primer acceso.

## Veredicto
**Verificación funcional PostgreSQL completada.** La conformidad final de esta spec se confirma
después de ejecutar la tabla de comandos globales de esta tarea.
