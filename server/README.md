# server/ - Backend Node.js

Backend API de HagamosTech construido con **Node.js + Express 5 + Prisma ORM + PostgreSQL**.

## Estructura

```
server/
├── server.js            # Punto de entrada (Express)
├── auth/
│   ├── controllers/     # AuthController
│   ├── routes/          # authRoutes
│   └── utils/           # mailer, totp
├── store/
│   └── routes/          # contacto
├── models/
│   └── prisma.js        # Cliente Prisma
├── prisma/
│   ├── schema.prisma    # Esquema PostgreSQL
│   ├── migrarMysqlPostgresql.js # Migración única desde la base anterior
│   └── seed.js          # Datos semilla (roles, permisos, admin)
├── test/                # Tests (Vitest + Supertest)
├── package.json
└── .env
```

## Arranque

```bash
cd server && npm run dev     # http://localhost:4321
```

Si el puerto está ocupado, el servidor prueba 4322 y 4323 y lo informa por consola.

## Endpoints reales

| Ruta | Descripción |
|------|-------------|
| `POST /api/auth/*` | Login, registro, verificación, recuperación |
| `GET/PUT /api/perfil` | Perfil del usuario (requiere auth) |
| `GET/POST /api/perfil/2fa/*` | Doble factor (TOTP) |
| `PUT /api/perfil/password` | Cambiar contraseña |
| `GET /api/perfil/exportar` | Exportar datos personales |
| `DELETE /api/perfil/cuenta` | Desactivar cuenta |
| `GET /api/perfil/sessions` | Sesiones (sin multisesión persistida) |
| `DELETE /api/perfil/sessions/:id` | Revocar sesión (404 si no existe) |
| `POST /api/contacto` | Enviar mensaje de contacto |
| `GET /api/contacto` | Listar mensajes (solo administrador: 401 sin sesión, 403 sin rol) |
| `PUT /api/contacto/:id/estado` | Cambiar el estado de un mensaje (solo administrador) |

> **API veraz (Spec 005):** no hay mocks ni catch-all con éxito falso. Los endpoints
> inexistentes responden `404` y los del vertical retirado, `410`. Los módulos que el frontend
> aún consulta sin controlador (cambio de contraseña, sesiones, exportar, certificado) quedan
> como pendientes honestos y devuelven `404` hasta implementarse.

## Modelos de Prisma

`Usuario`, `Rol`, `Permiso`, `DetalleRolPermisos`, `Suscripcion`,
`VerificacionCorreo`, `RecuperacionPassword`, `RegistroPendiente`, `mensaje`.

Los modelos de e-commerce (`producto`, `categoria`, `carrito_item`, `compra`, `pago`,
`sucursal`, etc.) fueron retirados en la Spec 003, sin alterar la base de datos.

## PostgreSQL y migración de datos

La aplicación en ejecución usa exclusivamente `DATABASE_URL` con PostgreSQL. La base MySQL
anterior se conserva como respaldo; no se borra ni se consulta desde los endpoints. Para
preparar una base nueva:

```bash
cd server
npm install
npx prisma generate
npm run db:push
npm run db:seed
```

La importación desde MySQL es un paso separado y de una sola vez. Configurá `DATABASE_URL` como
destino PostgreSQL y, temporalmente, `MYSQL_SOURCE_URL` con la conexión a la base anterior. En
PowerShell:

```powershell
$env:MYSQL_SOURCE_URL = 'mysql://usuario:clave@localhost:3306/HagamosTech'
npm run db:migrate:mysql-to-postgres
Remove-Item Env:MYSQL_SOURCE_URL
```

El migrador conserva IDs y relaciones de usuarios, roles, permisos, contacto, autenticación y
espacio personal; no activa las tablas del vertical retirado. Cancela si ya hay cuentas o
proyectos en PostgreSQL y nunca modifica el origen. `mysql2` queda como dependencia de desarrollo
para esa operación, no como dependencia del servidor en producción.

## Comandos

```bash
cd server && npm run dev          # Servidor con nodemon
cd server && npm run test:run     # Tests de API con Prisma espiado
cd server && npx prisma generate  # Regenerar cliente Prisma
cd server && npm run db:push      # Sincronizar esquema con PostgreSQL
cd server && npm run db:seed      # Datos semilla
```

## Configuración (.env)

| Variable | Descripción |
|----------|-------------|
| `DATABASE_URL` | Conexión PostgreSQL (`postgresql://...`) |
| `PORT` | Puerto del servidor (default 4321) |
| `NODE_ENV` | Entorno |
| `JWT_SECRET` | Secret para tokens (obligatorio en producción; el servidor no arranca sin él) |
| `FRONTEND_URL` | URL del frontend (CORS) |
| `CONTACT_EMAIL` | Correo que recibe el formulario de contacto (default `contacto@hagamostech.bo`) |
| `SMTP_*` | Host, puerto, usuario, contraseña y remitente para el envío de correos |

---

*HagamosTech - 2026*
