# Contribuir a HagamosTech

¡Gracias por tu interés en mejorar **HagamosTech**! Esta guía resume cómo proponer cambios.

## 🧭 Antes de empezar

- Revisá los [issues abiertos](../../issues) para no duplicar trabajo.
- Para cambios grandes, abrí primero un issue y conversemos el enfoque.

## 🛠️ Entorno local

```bash
npm install
cd server && npm install && cd ..
cp .env.example .env
cp server/.env.example server/.env   # completá las variables
npm run dev:all
```

Los detalles (requisitos y variables de entorno) están en el [README](README.md).

## 🌿 Flujo de trabajo

1. Creá una rama desde `main`: `feat/nombre-corto`, `fix/nombre-corto` o `docs/nombre-corto`.
2. Hacé commits pequeños con [Conventional Commits](https://www.conventionalcommits.org/es/v1.0.0/):
   - `feat:` nueva funcionalidad · `fix:` corrección · `docs:` documentación
   - `refactor:` · `test:` · `chore:` · `ci:`
3. Antes de abrir el PR, verificá:

```bash
npm run lint
npm run test:run
npm run build
```

4. Abrí el Pull Request completando la plantilla y enlazá el issue (`Closes #123`).

## ✅ Qué revisamos en un PR

- Que el cambio resuelva un solo problema y esté bien descrito.
- Que no rompa el build ni los tests existentes.
- Que no incluya credenciales, archivos `.env` ni datos personales.

## 💬 Código de conducta

Al participar aceptás el [Código de Conducta](CODE_OF_CONDUCT.md).
