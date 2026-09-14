# Validación — Spec 005 (API veraz)

Fecha: 2026-09-14

| RF | Criterio | Evidencia | Resultado |
|---|---|---|---|
| RF-1 | Sin `mockRouter` | `server.js` no contiene `mockRouter` ni mounts `*-sistema` | ✅ |
| RF-2 | Sin catch-all de éxito | Reemplazado por handler 404 | ✅ |
| RF-3 | Inexistente ⇒ 404 sin `success` | Test `api-veraz.test.js` | ✅ |
| RF-4 | Retirado ⇒ 410 | Test `api-veraz.test.js` | ✅ |
| RF-5 | Endpoints reales vivos | `/api/perfil` → 401; `/api/contacto` → 200 (verificado en vivo) | ✅ |
| RF-6 | `app` exportada sin puerto | `require.main === module`; tests importan sin abrir puerto | ✅ |
| RF-7 | Tests de 404/410/401 | `Tests 5 passed` en `server/` | ✅ |

## Verificación
| Comando | Resultado |
|---|---|
| `npm run test:run` (server) | 2 archivos, **5/5** ✅ |

## Deuda honesta resultante
Los hooks que antes recibían éxito falso ahora reciben `404` y muestran error:
cambio de contraseña, sesiones, exportar datos, certificado e historial/factura de compras.
Se implementan en specs siguientes (no se ocultan detrás de mocks).

## Veredicto
**Spec 005 cumplida.** La API responde con la verdad: datos reales o error explícito.
