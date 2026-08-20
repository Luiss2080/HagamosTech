# HagamosTech

Plataforma web de HagamosTech.

## Descripción

HagamosTech es una plataforma web que ofrece:
- **Pedidos online** de salteñas (pollo, carne, picante, vegetarianas)
- **Delivery y retiro** en sucursales
- **Pedidos al por mayor** para eventos y empresas
- **Gestión de clientes** y panel administrativo completo

## Estructura del Proyecto

```
HAGAMOSTECH/
├── src/                    # Frontend React + Vite
│   ├── components/         # Componentes React
│   ├── pages/              # Páginas de la app
│   ├── servicios/          # Servicios API (axios)
│   ├── store/              # Estado global (Zustand)
│   └── styles/             # Estilos CSS
├── server/                 # Backend Node.js + Prisma
│   ├── store/              # API pública (tienda): controllers + routes
│   ├── system/             # API del panel: controllers + routes + utils
│   ├── prisma/             # Esquema y seed de Prisma
│   └── servidor.js         # Punto de entrada
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
- Puerto 3000 (backend) y 4000 (frontend) libres

**Iniciar:**
```bash
# Opción 1: Doble clic en scripts/01-dev.bat
# Opción 2: Manualmente

cd server && npm run dev    # Backend: http://localhost:3000
cd .. && npm run dev        # Frontend: http://localhost:4000
```

**Base de datos local:**
- Base: `HagamosTech`
- Usuario: `root` (sin password)
- Host: `localhost:3306`
- Esquema: `cd server && npx prisma db push`
- Datos semilla: `cd server && npm run db:seed`

### 2. Producción

**Build:**
```bash
# Doble clic en scripts/02-build.bat
# O manualmente:
npm run build   # Usa automáticamente .env.production
```

**URLs:**
- Frontend: https://hagamostech.bo
- API: https://hagamostech.bo/api

## Configuración de Entornos

### Frontend (.env vs .env.production)

- **`.env`** → Desarrollo local (usa localhost:3000)
- **`.env.production`** → Producción (usa servidor real)

Vite automáticamente:
- `npm run dev` → usa `.env`
- `npm run build` → usa `.env.production`

### Backend (Node.js + Prisma)

- `server/.env` → MySQL local, puerto 3000
- `server/.env.production` → MySQL de producción

## Comandos Útiles

| Comando | Descripción |
|---------|-------------|
| `scripts/01-dev.bat` | Inicia frontend + backend en local |
| `scripts/02-build.bat` | Genera build para producción |
| `cd server && npx prisma db push` | Sincroniza el esquema con la BD |
| `cd server && npm run db:seed` | Llena la BD con datos de prueba (auth) |
| `cd server && npx prisma generate` | Regenera el cliente Prisma |
| `npm run build` | Build del frontend (usa .env.production) |

## Tecnologías

- **Frontend:** React 19, Vite 8, Tailwind CSS v4, Framer Motion
- **Backend:** Node.js, Express, Prisma ORM
- **Base de Datos:** MySQL 8.0
- **Deploy:** FTP manual

## Créditos

HagamosTech - 2026
