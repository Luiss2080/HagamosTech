# Validación — Spec 009 (Alineación total al Catálogo Maestro)

Fecha: 2026-09-14

| RF | Criterio | Evidencia | Resultado |
|---|---|---|---|
| RF-1 | Nombres exactos del catálogo | `serviciosData.test.js` "los servicios coinciden exactamente con el Catálogo Maestro" | ✅ |
| RF-2 | Sin términos fuera de catálogo | `contenidoTech.test.js` recorre todo `src/` | ✅ |
| RF-3 | Sin modo invitado/cupón/libros | Modales eliminados; `useAutenticacionStore` sin lógica de libros; Header sin botón de regalo | ✅ |
| RF-4 | Sin marcas no verificadas | `ClientesConfian` con FitCenter/Termeco/EcoPlast/ZoofiPets; `LogosClientes` eliminado | ✅ |
| RF-5 | QueHacemos/Servicios alineados | Academia (cloud/E-Learning/estadística), Negocios (ERP/omnicanal/ciberseguridad), Personalizado (mentoría/headhunting/cloud) reescritos | ✅ |
| RF-6 | Testimonios corregidos | Restaurante/snacks/IoT reemplazados | ✅ |
| RF-7 | Legales al modelo de servicios | `TerminosModal` y `CondicionesPagina` reescritos | ✅ |
| RF-8 | Tests de verdad | `contenidoTech.test.js` + `serviciosData.test.js` | ✅ |
| RF-9 | Backend de cupones retirado | `CuponController`/`cuponRoutes` eliminados; `CuponDescuento` fuera del schema; `/api/cupones-sistema/activar` → 404 (test `api-veraz.test.js`) | ✅ |

## Verificación global
| Comando | Resultado |
|---|---|
| `npm run test:run` (raíz) | 4 archivos, **20/20** ✅ |
| `npm run test:run` (server) | 4 archivos, **12/12** ✅ |
| `npm run lint` | 0 errores, 5 warnings |
| `npm run build` | ✅ sin avisos |
| `npm run test:e2e` | **3/3** ✅ (home, promociones y novedades sin términos fuera de catálogo) |

## Deuda documentada
Ninguna de catálogo. Queda el hashing de contraseñas (Spec de seguridad) y la unificación de paleta
(Spec de diseño).
