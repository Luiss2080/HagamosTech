# HagamosTech

Plataforma web de **HagamosTech**, agencia de soluciones digitales y tecnológicas.

## Descripción

HagamosTech transforma problemas, necesidades e ideas en soluciones reales con tecnología,
creatividad y un proceso cercano. La oferta se organiza en ocho categorías:

- **Estudiantes y sector académico**: presentaciones, APA 7, infografías, simuladores, apoyo en programación.
- **Emprendedores y nuevos negocios**: branding, manual de identidad, menús QR, publicidad, gestión de clientes.
- **Empleo y desarrollo profesional**: CV ATS, LinkedIn, cartas, portafolios, entrevistas, certificados.
- **Diseño gráfico integral**: logos, flyers, packaging, tarjetas, retoque fotográfico.
- **Desarrollo web y e-commerce**: páginas empresariales, landing pages, tiendas online, catálogos/blogs, UI/UX.
- **Soluciones tecnológicas, software y hardware**: sistemas a medida, bases de datos, DevOps.
- **Automatización e inteligencia artificial**: integración de IA, automatización de procesos, productividad.
- **Soluciones personalizadas**: "Contanos tu problema, nosotros vemos cómo hacerlo".

El Catálogo Maestro está en [`docs/catalogo-servicios.md`](docs/catalogo-servicios.md) y su espejo
de datos canónico en [`src/data/serviciosData.js`](src/data/serviciosData.js).

## Estructura del proyecto

```
HAGAMOSTECH/
├── src/                    # Frontend React + Vite
│   ├── app/                # Entrada y rutas
│   ├── components/         # Layout, modales, UI, fondos
│   ├── pages/              # Páginas por módulo
│   ├── store/              # Estado global (Zustand)
│   ├── servicios/          # Cliente HTTP y servicios de API
│   ├── data/               # Oferta canónica (serviciosData.js)
│   └── styles/             # Estilos globales (Tailwind)
├── server/                 # Backend Node + Express + Prisma
│   ├── auth/               # Autenticación (controllers, routes, utils)
│   ├── store/              # API pública y contacto
│   ├── models/             # Cliente Prisma
│   └── prisma/             # schema.prisma y seed.js
├── docs/                   # Constitución, catálogo, testing, diagnóstico
├── specs/                  # Especificaciones SDD (spec/plan/tasks)
├── e2e/                    # Tests end-to-end (Playwright)
└── vite.config.js
```

## Entornos

**Requisitos:** Node.js 18+, MySQL 8.0+ (Laragon/XAMPP), puerto 4000 (frontend) y 3000 (backend) libres.

```bash
# Frontend:  http://localhost:4000
npm run dev

# Backend:   http://localhost:3000 (con fallback a 3001/3002 si está ocupado)
npm run dev:server

# Ambos a la vez
npm run dev:all
```

> **Puerto 3000:** si otro proyecto lo ocupa (p. ej. ParqueoYa), el backend elige el siguiente
> puerto libre y lo informa por consola. Ver [`docs/diagnostico.md`](docs/diagnostico.md).

**Base de datos:**

```bash
cd server && npx prisma db push     # Sincroniza el esquema
cd server && npm run db:seed        # Datos semilla
```

## Comandos

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Frontend en desarrollo (`:4000`) |
| `npm run dev:server` | Backend en desarrollo (`:3000`) |
| `npm run dev:all` | Frontend + backend |
| `npm run build` | Build de producción (usa `.env.production`) |
| `npm run lint` | ESLint |
| `npm run test:run` | Tests del frontend (una pasada) |
| `npm run test:coverage` | Cobertura del frontend |
| `npm run test:e2e` | Tests end-to-end (Playwright) |
| `cd server && npm run test:run` | Tests del backend |

Más detalle en [`docs/testing.md`](docs/testing.md).

## Tecnologías

- **Frontend:** React 19, Vite 8, Tailwind CSS 4, Zustand, Framer Motion.
- **Backend:** Node.js, Express 5, Prisma ORM, MySQL 8.
- **Tests:** Vitest, Testing Library, Supertest, Playwright.

## Documentación

- Constitución del proyecto: [`docs/constitution.md`](docs/constitution.md)
- Catálogo de soluciones: [`docs/catalogo-servicios.md`](docs/catalogo-servicios.md)
- Testing: [`docs/testing.md`](docs/testing.md)
- Diagnóstico: [`docs/diagnostico.md`](docs/diagnostico.md)
- Especificaciones: [`specs/`](specs/)
- Guía para agentes: [`AGENTS.md`](AGENTS.md)

---

HagamosTech - 2026
