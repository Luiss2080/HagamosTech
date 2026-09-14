# AGENTS.md — HagamosTech

## Proyecto
Plataforma web de **HagamosTech**, agencia de soluciones digitales y tecnológicas
(estudiantes, emprendedores, empleo, diseño, web, software, IA/automatización y soluciones
a medida). Frontend React 19 + Vite 8 + Tailwind 4 + Zustand; backend Node + Express 5 +
Prisma + MySQL. Agentes (chat) y modales centralizados con Zustand. El alcance es **solo
tecnología**: el vertical de restaurante/e-commerce está en retiro (ver `specs/`).

## Comandos
- Frontend (dev): `npm run dev` → `http://localhost:4000`
- Backend (dev): `npm run dev:server` (o `cd server && npm run dev`) → `http://localhost:4321`
  (el frontend usa el proxy de Vite: llama a `/api`).
- Ambos: `npm run dev:all`
- Build: `npm run build`  (usa `.env.production`)
- Lint: `npm run lint`
- Tests (frontend/backend): `npm run test:run`  · E2E: `npm run test:e2e`
  _(el harness se habilita en la Spec 001; hasta entonces verificar con lint + build)_
- Base de datos: `cd server && npx prisma db push` · seeds: `cd server && npm run db:seed`

> **Puerto del API:** en desarrollo el backend usa `4321` (propio, ver `server/.env`) y el
> frontend llama a `/api` vía proxy de Vite (`VITE_API_PROXY_TARGET`). Ver `docs/diagnostico.md`.

## Estilo y convenciones
- JavaScript/JSX moderno (ESM). Componentes en PascalCase; hooks `useXxx`.
- UI, mensajes y documentación en **español**; identificadores existentes no se renombran
  sin spec.
- Estado global con Zustand; llamadas HTTP con `src/servicios/clienteApi.js`.
- No añadir dependencias ni tocar `prisma/schema.prisma` sin actualizar antes la spec.

## Reglas
- Leer `docs/constitution.md` y la spec activa en `specs/` antes de tocar código.
- **Prohibido** volver a introducir mocks, catch-all o rutas que devuelvan éxito falso en el
  backend.
- **Prohibido** mostrar servicios o copy fuera del Catálogo Maestro (`docs/catalogo-servicios.md`).
- No modificar archivos dentro de `specs/` salvo petición explícita.
- No commitear secretos; respetar `.env` / `.env.production`.

## Al terminar cualquier tarea
- Ejecutar `npm run lint` y `npm run test:run` (o `npm run build` mientras el harness no exista)
  y confirmar el resultado en la respuesta. No avanzar con tests en rojo.
