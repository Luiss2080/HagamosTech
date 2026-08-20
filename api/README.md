# api/ - Backend PHP (Producción)

Backend API construido en **PHP puro** para funcionar en hosting compartido (cPanel, Plesk, etc.).

**Este es el backend que se usa en producción.** En desarrollo local se usa Node.js (carpeta `server/`).

## Estructura

```
api/
├── index.php         # Router principal (entry point)
├── .htaccess         # Redirección de URLs para SPA
├── 01_config.php     # Configuración de BD y funciones helper
├── 02_auth.php       # Login, registro, logout
├── 03_catalogo.php   # Endpoints de catálogo (productos, categorías)
├── 04_carrito.php    # Carrito de compras
├── 05_compras.php    # Crear y ver compras
├── 06_pagos.php      # Confirmar pagos
└── 07_contacto.php   # Enviar mensajes de contacto
```

## Archivos clave

| Archivo | Descripción |
|---------|-------------|
| `01_config.php` | **Base de todo.** Configura BD, detecta entorno (local/producción), define funciones helper |
| `index.php` | **Router.** Recibe todas las peticiones y las deriva al archivo correspondiente |
| `.htaccess` | **Rewrite rules.** Todas las URLs `/api/...` llegan a `index.php` |

## Cómo funciona el routing

```
GET /api/catalogo/productos
    ↓
.htaccess redirige a index.php
    ↓
index.php detecta "catalogo" → include 03_catalogo.php
    ↓
03_catalogo.php detecta "productos" → ejecuta SELECT y devuelve JSON
```

## Endpoints disponibles

| Método | Ruta | Archivo | Descripción |
|--------|------|---------|-------------|
| `GET` | `/api/catalogo/categorias` | 03_catalogo.php | Lista categorías |
| `GET` | `/api/catalogo/productos` | 03_catalogo.php | Lista productos |
| `GET` | `/api/catalogo/producto/:id` | 03_catalogo.php | Detalle de producto |
| `GET` | `/api/catalogo/servicios` | 03_catalogo.php | Lista servicios |
| `GET` | `/api/catalogo/flujo` | 03_catalogo.php | Pasos del flujo |
| `POST` | `/api/auth/login` | 02_auth.php | Login |
| `POST` | `/api/auth/registro` | 02_auth.php | Registro |
| `GET` | `/api/auth/perfil` | 02_auth.php | Perfil (auth) |
| `POST` | `/api/auth/logout` | 02_auth.php | Logout |
| `GET` | `/api/carrito` | 04_carrito.php | Ver carrito (auth) |
| `POST` | `/api/carrito` | 04_carrito.php | Agregar item (auth) |
| `DELETE` | `/api/carrito/:id` | 04_carrito.php | Eliminar item (auth) |
| `POST` | `/api/compras/crear` | 05_compras.php | Crear compra (auth) |
| `GET` | `/api/compras/:id` | 05_compras.php | Ver compra (auth) |
| `POST` | `/api/compras/confirmar-pago` | 05_compras.php | Confirmar pago |
| `POST` | `/api/contacto` | 07_contacto.php | Enviar mensaje |
| `GET` | `/api/config` | index.php | Configuración del sistema |
| `GET` | `/api/estado` | index.php | Estado del servidor |

## Configuración de Base de Datos

**Detecta automáticamente el entorno:**

- **Local:** Si `HTTP_HOST` es `localhost`, `127.0.0.1`, o contiene `.test`/`.local`
  - Usa: `root` / `localhost` / `Loshagamostech` / sin password
- **Producción:** Cualquier otro host
  - Usa: Credenciales configuradas en `01_config.php` (debes cambiarlas)

## Variables de entorno

No se usa `.env` en PHP. La configuración está directamente en `01_config.php`:

```php
if ($isLocal) {
    $host = '127.0.0.1';
    $user = 'root';
    $pass = '';
    $db   = 'Loshagamostech';
} else {
    $host = 'localhost'; // Cambiar según hosting
    $user = 'tu_usuario'; // Cambiar
    $pass = 'tu_password'; // Cambiar
    $db   = 'Loshagamostech';
}
```

## Funciones helper

| Función | Uso |
|---------|-----|
| `respond($data, $code)` | Devuelve JSON y termina ejecución |
| `getInput()` | Lee el body JSON de la petición |
| `requireAuth($pdo)` | Verifica token y devuelve usuario |
| `generateCode($prefix)` | Genera código único (ej: `LC-20260115-ABC123`) |
| `sanitize($data)` | Limpia strings de XSS |

## Seguridad

- Uso de **PDO** con prepared statements (previene SQL Injection)
- **Sanitización** de inputs con `htmlspecialchars()` y `strip_tags()`
- **Autenticación** por token en header `Authorization: Bearer {userId}`
- **CORS** habilitado para peticiones cross-origin

## Notas

- Este backend es **stateless** (no mantiene sesiones en el servidor)
- La autenticación se basa en el `userId` como token simple (JWT en producción recomendado)
- Todos los endpoints devuelven **JSON**
- Para debugging, `01_config.php` incluye info del entorno en respuestas de error

---
*HagamosTech - 2026*
