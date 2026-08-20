# scripts/ - Scripts de Automatización

Scripts para facilitar el desarrollo y deploy del proyecto.

## Archivos

| Archivo | Nombre | Descripción |
|---------|--------|-------------|
| `01-dev.bat` | **Dev** | Inicia el entorno de desarrollo local automáticamente |
| `02-build.bat` | **Build** | Genera el build optimizado para producción |

## Cómo usar

### 1. Desarrollo local

**Doble clic en `01-dev.bat`** (o ejecútalo desde terminal)

```bash
# Equivalente manual:
cd server && npm run dev    # Backend en localhost:3000
cd .. && npm run dev        # Frontend en localhost:4001
```

**Qué hace:**
1. Detecta si Node.js está instalado
2. Detecta si MySQL está corriendo (Laragon)
3. Abre una terminal para el backend Node.js (puerto 3000)
4. Espera 3 segundos
5. Abre otra terminal para el frontend Vite (puerto 4001)
6. Muestra las URLs en pantalla

**Resultado:** Tienes 2 ventanas de terminal abiertas con el servidor corriendo.

### 2. Build para producción

**Doble clic en `02-build.bat`**

```bash
# Equivalente manual:
npm run build   # Genera dist/ listo para producción
```

**Qué hace:**
1. Instala dependencias (`npm install`)
2. Genera el build (`npm run build`)
3. Vite automáticamente usa `.env.production` (apunta al servidor real)
4. Muestra confirmación y sugiere ejecutar deploy

**Resultado:** Carpeta `dist/` con archivos optimizados.

### 3. Deploy al servidor

Sube manualmente la carpeta `dist/` (frontend) y `api/` (backend PHP) mediante cualquier cliente FTP o el panel de tu hosting.

**Requisitos:**
- Tener ejecutado `02-build.bat` primero (para generar `dist/`)

## Flujo de trabajo completo

```
Desarrollo:
  01-dev.bat → Trabajas en código → Guardas → Se recarga automáticamente

Producción:
  02-build.bat → Subes dist/ + api/ por FTP → Sitio actualizado
```

## Notas

- **Windows:** Los scripts `.bat` solo funcionan en Windows. En Linux/Mac usa los comandos manuales.
- **Puertos:** Si el puerto 3000 o 4001 están ocupados, modifica en `server/.env` y `vite.config.js`

---
*Los Castores - 2026*
