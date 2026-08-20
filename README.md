# Los Castores

Plataforma web de Los Castores.

## Descripción

Los Castores es una plataforma web de salteñería que ofrece:
- **Pedidos online** de salteñas (pollo, carne, picante, vegetarianas)
- **Delivery y retiro** en sucursales de Santa Cruz
- **Pedidos al por mayor** para eventos y empresas
- **Gestión de clientes** y panel administrativo completo

## Estructura del Proyecto

```
LOS-CASTORES/
├── src/                    # Frontend React + Vite
│   ├── components/         # Componentes React
│   ├── pages/              # Páginas de la app
│   ├── servicios/          # Servicios API (axios)
│   ├── store/              # Estado global (Zustand)
│   └── styles/             # Estilos CSS
├── server/                 # Backend Node.js + Prisma (solo desarrollo)
│   ├── store/              # API pública (tienda): controllers + routes
│   ├── system/             # API del panel: controllers + routes + utils
│   ├── prisma/             # Esquema y seeds de Prisma
│   └── servidor.js         # Punto de entrada
├── api/                    # Backend PHP (producción en hosting compartido)
│   ├── 01_config.php       # Configuración de BD (dual: local/prod)
│   ├── index.php           # Router principal
│   └── *.php               # Endpoints de API (numerados)
├── database/               # Scripts maestros de base de datos
│   ├── 01_esquema_LosCastoresSCZ.sql
│   ├── 02_datos_LosCastoresSCZ.sql
│   └── runner.cjs          # Herramienta de migración/seed
├── scripts/                # Scripts de automatización
│   ├── 01-dev.bat          # Iniciar desarrollo local
│   └── 02-build.bat        # Build para producción
├── .env                    # Variables de entorno (desarrollo)
├── .env.production         # Variables de entorno (producción)
└── vite.config.js          # Configuración de Vite
```

## Entornos de Trabajo

### 1. Desarrollo Local

**Requisitos:**
- Node.js 18+
- MySQL 8.0+ (Laragon o XAMPP)
- Puerto 3000 (backend) y 4001 (frontend) libres

**Iniciar:**
```bash
# Opción 1: Doble clic en scripts/01-dev.bat
# Opción 2: Manualmente

cd server && npm run dev    # Backend: http://localhost:3000
cd .. && npm run dev        # Frontend: http://localhost:4001
```

**Base de datos local:**
- Base: `LosCastoresSCZ`
- Usuario: `root` (sin password)
- Host: `localhost:3306`
- Esquema: `npm run db:migrate` (aplica `database/01_esquema_LosCastoresSCZ.sql`)
- Datos: `npm run db:seed` (aplica `database/02_datos_LosCastoresSCZ.sql`)

### 2. Producción

**Build:**
```bash
# Doble clic en scripts/02-build.bat
# O manualmente:
npm run build   # Usa automáticamente .env.production
```

**Deploy:**
```bash
# O manualmente con cualquier cliente FTP
```

**URLs:**
- Frontend: https://tudominio.com
- API: https://tudominio.com/api

## Configuración de Entornos

### Frontend (.env vs .env.production)

- **`.env`** → Desarrollo local (usa localhost:3000)
- **`.env.production`** → Producción (usa servidor real)

Vite automáticamente:
- `npm run dev` → usa `.env`
- `npm run build` → usa `.env.production`

### Backend

**Node.js (desarrollo):**
- `server/.env` → MySQL local, puerto 3000

**PHP (producción):**
- `api/01_config.php` → Detecta automáticamente el entorno
  - Local: localhost/root/sin password
  - Producción: credenciales del servidor

## Comandos Útiles

| Comando | Descripción |
|---------|-------------|
| `scripts/01-dev.bat` | Inicia frontend + backend en local |
| `scripts/02-build.bat` | Genera build para producción |
| `cd server && npx prisma db seed` | Llena la BD con datos de prueba |
| `cd server && npx prisma generate` | Regenera el cliente Prisma |
| `npm run build` | Build del frontend (usa .env.production) |

## Tecnologías

- **Frontend:** React 19, Vite 8, Tailwind CSS v4, Framer Motion
- **Backend Local:** Node.js, Express, Prisma ORM
- **Backend Producción:** PHP 8+, MySQL
- **Base de Datos:** MySQL 8.0
- **Deploy:** FTP manual

## Créditos

Los Castores - 2026
