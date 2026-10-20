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
- RF-8: EL ESPACIO PERSONAL usará el hero, encabezados, fondo y panel de dos columnas de la estructura de Contáctanos, respetando el tema oscuro, acento lima, contraste e iconografía del sitio.
- RF-9: EL REGISTRO y el inicio de sesión usarán la base PostgreSQL configurada en el backend; el frontend mostrará errores reales cuando la API o la base no estén disponibles.
- RF-10: CUANDO un usuario autenticado abra Mi perfil, Mi espacio o Configuración, EL SISTEMA mostrará una estructura visual coherente con la web: fondo tecnológico, hero centrado con título y descripción, secciones con encabezados claros, paneles legibles, iconografía de marca y acento lima.
- RF-11: EL REDISEÑO de las vistas del módulo Perfil conservará sus formularios, navegación, preferencias y acciones existentes sin cambiar su alcance ni presentar controles visuales como persistidos si no lo están.
- RF-12: CUANDO un usuario abra Mi perfil, Mi espacio o Configuración, EL SISTEMA mostrará la miga de pan dentro de la sección principal, antes del hero; título, descripción y contenido pertenecerán a una sola sección de página.
- RF-13: CUANDO un usuario autenticado cambie sus datos de perfil, preferencias de apariencia, privacidad o notificaciones, EL SISTEMA guardará los cambios en PostgreSQL y mostrará confirmación solo tras una respuesta exitosa del backend.
- RF-14: SI la API o PostgreSQL no están disponibles al leer o guardar datos del perfil, EL SISTEMA conservará el contenido anterior, mostrará un error explícito y no simulará una persistencia local exitosa.
- RF-15: CUANDO el usuario gestione proyectos, notas y recordatorios desde Mi espacio, EL SISTEMA leerá y modificará sus registros asociados a la cuenta autenticada mediante los endpoints reales del backend.

## Requisitos no funcionales
- Sin dependencias nuevas.
- Sin pérdida de contraste: texto oscuro sobre superficies blancas; texto claro sobre fondo oscuro.

## Casos límite
- Puertos 3000/3001 ocupados por terceros → backend en 4321 y proxy de Vite.
- Un input blanco con texto oscuro no debe volverse oscuro.
- El diseño debe adaptarse a escritorio y móvil; ninguna vista del módulo puede quedar sin título o descripción de contexto.

## Fuera de alcance
- Rediseñar el estilo de las páginas que ya usan la marca (Promociones/Novedades/hero) más allá de lo aprobado.
- Entrega real de correos a dominios inexistentes (depende del SMTP/dominio de producción).
- Funcionalidades de multisesión: el backend no persiste sesiones por dispositivo y la interfaz debe declarar esa limitación.

## Criterios de finalización
- Elementos blancos restaurados (verificado con capturas).
- Las vistas Mi perfil, Mi espacio y Configuración comparten la composición de la web, conservan contraste y sus flujos actuales.
- Login y registro verificados de punta a punta.
- Preferencias de apariencia, privacidad y notificaciones persistidas por usuario en PostgreSQL y errores de API visibles.
- La miga de pan aparece dentro de la única sección principal de Mi perfil, Mi espacio y Configuración, separada del hero.
- `npm run lint`, `npm run test:run` (raíz y server), `npm run build` y `npm run test:e2e` en verde.

## Dudas abiertas
- [NECESITA ACLARACIÓN] ¿Se desea, en el futuro, llevar los acentos verdes al resto del sitio **manteniendo** las superficies blancas?
