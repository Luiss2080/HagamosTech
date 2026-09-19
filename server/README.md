# server/ - Backend Node.js

Backend API de HagamosTech construido con **Node.js + Express 5 + Prisma ORM + MySQL**.

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
│   ├── schema.prisma    # Esquema de la base de datos
│   └── seed.js          # Datos semilla (roles, permisos, admin)
├── test/                # Tests (Vitest + Supertest)
├── package.json
└── .env
```

## Arranque

```bash
cd server && npm run dev     # http://localhost:3000
```

Si el puerto está ocupado, el servidor prueba 3001 y 3002 y lo informa por consola.

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

## Comandos

```bash
cd server && npm run dev          # Servidor con nodemon
cd server && npm run test:run     # Tests (sin MySQL, Prisma espiado)
cd server && npx prisma generate  # Regenerar cliente Prisma
cd server && npx prisma db push   # Sincronizar esquema con MySQL
cd server && npm run db:seed      # Datos semilla
```

## Configuración (.env)

| Variable | Descripción |
|----------|-------------|
| `DATABASE_URL` | Conexión a MySQL |
| `PORT` | Puerto del servidor (default 3000) |
| `NODE_ENV` | Entorno |
| `JWT_SECRET` | Secret para tokens |
| `FRONTEND_URL` | URL del frontend (CORS) |
| `CONTACT_EMAIL` | Correo que recibe el formulario de contacto (default `contacto@hagamostech.bo`) |
| `SMTP_*` | Host, puerto, usuario, contraseña y remitente para el envío de correos |

---

*HagamosTech - 2026*
