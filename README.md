de datos canónico en [`src/data/serviciosData.js`](src/data/serviciosData.js).
# HagamosTech

<div align="center">

![HagamosTech](public/img/01_Layout/logo.png)

Plataforma web de soluciones digitales, tecnología y crecimiento para estudiantes,
emprendedores, profesionales y negocios.

[Documentación](docs/constitution.md) · [Catálogo de servicios](docs/catalogo-servicios.md) · [Especificaciones](specs/) · [Guía de agentes](AGENTS.md)

</div>

## ¿Qué es HagamosTech?

HagamosTech es una agencia digital orientada a convertir ideas, retos y necesidades en
soluciones útiles, visualmente bien construidas y técnicamente sostenibles. La plataforma
presenta servicios en áreas como:

- Estudiantes y sector académico
- Emprendedores y nuevos negocios
- Empleo y desarrollo profesional
- Diseño gráfico integral
- Desarrollo web y e-commerce
- Software, sistemas y hardware
- Automatización e IA
- Soluciones personalizadas

La oferta oficial y canónica está definida en el catálogo de servicios del proyecto y se
mantiene sincronizada con los datos del frontend para evitar inconsistencias.

## ✅ Objetivo del proyecto

Crear una experiencia web clara, moderna y confiable que permita:

- presentar la oferta de servicios de forma estructurada,
- comunicar la propuesta de valor de la agencia,
- activar flujos de contacto y autenticación,
- soportar operaciones del backend con validación real,
- mantener una base técnica ordenada y verificable con tests.

## 🧩 Stack tecnológico

### Frontend

- React 19
- Vite 8
- Tailwind CSS 4
- Zustand
- Framer Motion

### Backend

- Node.js + Express 5
- Prisma ORM
- MySQL
- JWT / autenticación del proyecto

### Calidad y validación

- Vitest
- Testing Library
- Supertest
- Playwright

## 🏗️ Arquitectura del proyecto

```text
HagamosTech/
├── src/                     # Frontend React + Vite
│   ├── app/                 # enrutamiento y estructura principal
│   ├── components/          # UI, layout, modales, elementos reutilizables
│   ├── data/                # datos canónicos del negocio
│   ├── hooks/               # hooks reutilizables
│   ├── pages/               # vistas de la aplicación
│   ├── servicios/           # cliente HTTP y servicios API
│   ├── store/               # estado global con Zustand
│   ├── styles/              # estilos globales
│   └── utils/               # helpers y utilidades
├── server/                  # API backend
│   ├── auth/                # autenticación y seguridad
│   ├── models/              # acceso a datos y Prisma
│   ├── prisma/              # schema + seed + migraciones
│   ├── store/               # endpoints y controladores de negocio
│   └── test/                # pruebas del backend
├── docs/                    # constitución, catálogo, diagnóstico, testing
├── specs/                   # especificaciones del proyecto (plan/spec/tasks/validation)
├── e2e/                     # pruebas end-to-end
├── public/                  # assets estáticos e imágenes
├── package.json             # scripts del frontend
├── server/package.json      # scripts del backend
├── vite.config.js           # configuración Vite
├── vitest.config.js         # configuración de pruebas frontend
├── playwright.config.js     # configuración de pruebas E2E
├── eslint.config.js         # reglas de lint
├── AGENTS.md                # guía de trabajo para agentes
├── docs/constitution.md     # principios del proyecto
├── docs/catalogo-servicios.md
├── docs/diagnostico.md
├── docs/testing.md
└── README.md
```

## 🚀 Inicio rápido

### Requisitos

- Node.js 18+
- MySQL 8.0+
- Puerto 4000 libre para el frontend
- Puerto 4321 libre para el backend

### 1) Instalar dependencias

```bash
npm install
cd server && npm install
```

### 2) Configurar entorno

Revisa los archivos de entorno y asegúrate de tener la configuración correcta para la base de
datos y la conexión del backend.

```bash
# Frontend
# usa variables de entorno según Vite

# Backend
cd server
# crea o ajusta .env según la configuración local del proyecto
```

### 3) Levantar el proyecto

#### Frontend

```bash
npm run dev
```

Abre: http://localhost:4000

#### Backend

```bash
npm run dev:server
```

El backend queda disponible en: http://localhost:4321

#### Ejecutar ambos a la vez

```bash
npm run dev:all
```

> El frontend consume el backend a través de `/api` usando el proxy de Vite. La referencia de
> configuración y diagnóstico está en [docs/diagnostico.md](docs/diagnostico.md).

## 🗃️ Base de datos

Sincroniza el esquema de Prisma y carga los datos iniciales:

```bash
cd server && npx prisma db push
cd server && npm run db:seed
```

También puedes abrir Prisma Studio para revisar registros locales:

```bash
cd server && npx prisma studio
```

## 📋 Scripts principales

| Comando | Descripción |
|---|---|
| `npm run dev` | Inicia el frontend con Vite en puerto 4000 |
| `npm run dev:server` | Inicia el backend Express |
| `npm run dev:all` | Ejecuta frontend y backend en paralelo |
| `npm run build` | Genera el build de producción |
| `npm run lint` | Verifica estilo y calidad del código |
| `npm run test` | Ejecuta Vitest en modo watch |
| `npm run test:run` | Ejecuta pruebas frontend en una sola pasada |
| `npm run test:coverage` | Genera cobertura de pruebas |
| `npm run test:e2e` | Ejecuta pruebas E2E con Playwright |
| `cd server && npm run test:run` | Ejecuta pruebas del backend |

## 🧪 Validación y pruebas

Se recomienda ejecutar la validación del proyecto antes de considerar una tarea terminada:

```bash
npm run lint
npm run test:run
```

Para pruebas de interfaz y flujo real:

```bash
npm run test:e2e
```

Más información en [docs/testing.md](docs/testing.md).

## 🧭 Flujo recomendado de trabajo

1. Revisar la especificación activa en [specs/](specs/).
2. Leer la constitución del proyecto en [docs/constitution.md](docs/constitution.md).
3. Mantener el catálogo de servicios como fuente única de verdad.
4. Implementar cambios con validación de tests.
5. Usar el backend y frontend con datos reales, nunca con respuestas genéricas o mockeadas.

## 📚 Documentación relevante

- [docs/constitution.md](docs/constitution.md) — principios y reglas del proyecto
- [docs/catalogo-servicios.md](docs/catalogo-servicios.md) — oferta oficial y servicios
- [docs/diagnostico.md](docs/diagnostico.md) — diagnóstico técnico y entorno
- [docs/testing.md](docs/testing.md) — guía de pruebas
- [specs/](specs/) — especificaciones del producto y tareas
- [AGENTS.md](AGENTS.md) — instrucciones para agentes y automatizaciones

## 👤 Perfil del proyecto

HagamosTech combina una presencia comercial clara con una arquitectura técnica ordenada para
apoyar crecimiento, automatización, calidad y experiencia de usuario. El enfoque está en la
tecnología útil, el diseño bien pensado y la ejecución con enfoque realista.

## 🔎 Nota importante

La oferta publicada en la web debe respetar el Catálogo Maestro y no reutilizar contenido de
verticales no vigentes. La documentación y la implementación deben alinearse con la
especificación activa del proyecto.

---

HagamosTech — 2026
