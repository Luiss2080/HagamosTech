# server/ - Backend Node.js (Desarrollo)

Backend API construido con **Node.js + Express + Prisma ORM**.

**Solo se usa en desarrollo local.** En producción el hosting usa PHP (carpeta `api/`).

## Estructura

```
server/
├── servidor.js          # Punto de entrada (Express)
├── models/
│   └── prisma.js        # Cliente Prisma
├── store/               # Backend público (tienda)
│   ├── controllers/     # 01_Catalogo, 02_Carrito, 03_Compra, 04_Pago
│   └── routes/          # 01_catalogo, 02_carrito, 03_compra, 04_pago, 05_contacto
├── system/              # Backend del panel administrativo
│   ├── controllers/     # 01_Auth, 02_Cliente, 03_Usuario, 04_Rol, 05_Permiso, 06_System
│   ├── routes/          # 01_auth, 02_cliente, 03_usuario, 04_rol, 05_permiso
│   └── utils/           # 01_mailer, 02_totp
├── prisma/
│   ├── esquema.prisma   # Esquema de la base de datos
│   ├── semilla.js       # Ejecuta los seeds en orden
│   └── seeds/           # 01_categorias, 02_productos, 03_catalogo_flujo, 04_sucursales
├── package.json         # Dependencias
└── .env                 # Configuración local
```

## Archivos clave

| Archivo | Descripción |
|---------|-------------|
| `servidor.js` | Inicializa Express, registra rutas, inicia servidor en puerto 3000 |
| `prisma/esquema.prisma` | Define todos los modelos de la base de datos (MySQL) |
| `prisma/semilla.js` | Script que ejecuta todos los seeds en orden |
| `.env` | Variables de entorno: `DATABASE_URL=mysql://root:@localhost:3306/HagamosTech` |

## API Endpoints

| Ruta | Controlador | Descripción |
|------|-------------|-------------|
| `GET /api/catalogo/productos` | CatalogoController | Lista todos los productos |
| `GET /api/catalogo/categorias` | CatalogoController | Lista todas las categorías |
| `GET /api/catalogo/config` | CatalogoController | Flujo de pasos del catálogo |
| `POST /api/auth/login` | AuthController | Login de usuario |
| `POST /api/auth/registro` | AuthController | Registro de usuario |
| `GET /api/auth/perfil` | AuthController | Obtener perfil (requiere auth) |
| `POST /api/carrito` | CarritoController | Agregar item al carrito |
| `GET /api/carrito` | CarritoController | Ver carrito del usuario |
| `DELETE /api/carrito/:id` | CarritoController | Eliminar item del carrito |
| `POST /api/compras/crear` | CompraController | Crear nueva compra |
| `GET /api/compras/:id` | CompraController | Ver detalle de compra |
| `POST /api/pagos/confirmar` | PagoController | Confirmar pago |
| `POST /api/contacto` | ContactoRoutes | Enviar mensaje de contacto |
| `GET /api/config` | SystemController | Configuración del sistema |
| `GET /api/estado` | SystemController | Estado del servidor |
| `GET /api/usuarios-sistema` | UsuarioController | Usuarios del sistema |
| `GET /api/roles-sistema` | RolController | Roles del sistema |
| `GET /api/permisos-sistema` | PermisoController | Permisos del sistema |
| `GET /api/clientes-sistema` | ClienteController | Clientes registrados |

## Modelos de Prisma

| Modelo | Tabla MySQL | Descripción |
|--------|-------------|-------------|
| `Categoria` | `categoria` | Categorías de productos |
| `Producto` | `producto` | Productos del catálogo |
| `Usuario` | `usuario` | Usuarios registrados |
| `CarritoItem` | `carrito_item` | Items en carrito |
| `Compra` | `compra` | Órdenes de compra |
| `CompraItem` | `compra_item` | Items de cada compra |
| `Pago` | `pago` | Registros de pago |
| `Sucursal` | `sucursal` | Sucursales físicas |
| `DetalleSucursalProduct` | `detalle_sucursal_product` | Stock por sucursal |
| `Servicio` | `servicio` | Servicios de la empresa |
| `CatalogoFlujoPaso` | `catalogo_flujo_paso` | Pasos del flujo de compra |
| `Mensaje` | `mensaje` | Mensajes de contacto |
| `Roles` | `roles` | Roles de usuarios |
| `Permisos` | `permisos` | Permisos del sistema |
| `DetalleRolPermisos` | `detalle_rol_permisos` | Matriz rol-permiso |
| `Suscripcion` | `suscripciones` | Suscripciones / estado invitado |
| `ClienteUsuario` | `usuario` | Clientes del store público |

## Comandos útiles

```bash
# Iniciar servidor
cd server && npm run dev

# Regenerar cliente Prisma (después de cambiar esquema)
cd server && npx prisma generate

# Ejecutar seeds (datos de prueba)
cd server && npx prisma db seed

# Verificar conexión a BD
cd server && npx prisma studio
```

## Configuración

| Variable | Valor local | Descripción |
|----------|-------------|-------------|
| `DATABASE_URL` | `mysql://root:@localhost:3306/HagamosTech` | Conexión a MySQL |
| `PORT` | `3000` | Puerto del servidor |
| `NODE_ENV` | `development` | Entorno |
| `JWT_SECRET` | `hagamostech_dev_secret_key_2026` | Secret para tokens |
| `FRONTEND_URL` | `http://localhost:4001` | URL del frontend (CORS) |

## Notas

- El servidor usa `cors()` para permitir peticiones del frontend
- La autenticación usa JWT almacenado en cookies (`hagamostech_token`)
- En producción se usa el backend PHP (`api/`) en lugar de este Node.js

---
*HagamosTech - 2026*
