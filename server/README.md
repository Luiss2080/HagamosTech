# server/ - Backend Node.js

Backend API de HagamosTech construido con **Node.js + Express 5 + Prisma ORM + MySQL**.

## Estructura

```
server/
├── server.js            # Punto de entrada (Express)
├── auth/
│   ├── controllers/     # AuthController, CuponController
│   ├── routes/          # authRoutes, cuponRoutes
│   └── utils/           # mailer, totp
├── store/
│   └── routes/          # contacto
├── models/
│   └── prisma.js        # Cliente Prisma
├── prisma/
│   ├── schema.prisma    # Esquema de la base de datos
│   └── seed.js          # Datos semilla (roles, permisos, admin, cupón)
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
| `POST /api/contacto` | Enviar mensaje de contacto |
| `GET /api/contacto` | Listar mensajes |
| `/api/cupones-sistema` | Cupones / modo invitado |

> **Pendiente (Spec 005):** `server.js` todavía tiene rutas mock y un catch-all que responde
> `{success:true}` a endpoints sin implementar. Se elimina en la spec "API veraz".

## Modelos de Prisma

`Usuario`, `Rol`, `Permiso`, `DetalleRolPermisos`, `Suscripcion`, `CuponDescuento`,
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

---

*HagamosTech - 2026*
