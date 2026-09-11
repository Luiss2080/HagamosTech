# server/ - Backend Node.js (Desarrollo)

Backend API construido con **Node.js + Express + Prisma ORM**.

**Solo se usa en desarrollo local.** En producción el hosting usa PHP (carpeta `api/`).

## Estructura

```
server/
├── server.js            # Punto de entrada (Express)
├── auth/
│   ├── controllers/     # AuthController, CuponController
│   ├── routes/          # authRoutes, cuponRoutes
│   └── utils/           # mailer, totp
├── store/               # Backend público (tienda)
│   ├── controllers/     # Catalogo, Carrito, Compra, Pago
│   └── routes/          # catalogo, carrito, compra, pago, contacto
├── models/
│   └── prisma.js        # Cliente Prisma
├── prisma/
│   ├── schema.prisma    # Esquema de la base de datos
│   └── seed.js          # Ejecuta los seeds
├── package.json         # Dependencias
└── .env                 # Configuración local
```

## Archivos clave

| Archivo | Descripción |
|---------|-------------|
| `server.js` | Inicializa Express, registra rutas, inicia servidor en puerto 3000 |
| `prisma/schema.prisma` | Define todos los modelos de la base de datos (MySQL) |
| `prisma/seed.js` | Script que ejecuta los seeds |
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
