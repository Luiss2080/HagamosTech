# styles/ - Estilos Globales

Configuración de modo oscuro y utilidades CSS personalizadas.

## Archivos

| Archivo | Descripción |
|---------|-------------|
| `darkMode.css` | Reglas CSS para modo oscuro (sobrescribe colores claros) |

## darkMode.css

Este archivo es el **corazón del modo oscuro**. Sobrescribe colores de Tailwind para el tema oscuro.

### Estructura

```css
html.dark body { ... }        /* Fondo del body en modo oscuro */
html.dark .bg-white { ... }   /* Fuerza fondos blancos a negro */
html.dark .text-gray-900 { ... } /* Fuerza textos oscuros a claros */
html.dark .glass-card { ... }  /* Estilos de cards en modo oscuro */
```

### Secciones principales

| Sección | Qué hace |
|---------|----------|
| `BODY` | Fondo negro `#0a0a0a` con grid rojo sutil |
| `SECCIONES` | Fuerza fondo transparente en todas las secciones |
| `FONDOS BLANCOS` | Convierte todos los `bg-white`, `bg-gray-50`, etc. a `#0a0a0a` |
| `TEXTO` | Convierte textos oscuros a claros (`#f1f5f9`) |
| `BORDES` | Cambia bordes a tonos rojos sutiles |
| `INPUTS` | Estiliza formularios en modo oscuro |
| `CARDS` | Estiliza cards y tarjetas |
| `GRADIENTES` | Convierte gradientes blancos a oscuros |
| `SOMBRAS` | Redefine sombras para modo oscuro |
| `IMÁGENES` | Reduce brillo de imágenes en dark mode |
| `MODALES` | Estiliza fondos de modales |
| `CHATBOT` | Estiliza widgets de chat |
| `SCROLLBAR` | Scrollbar rojo en dark mode |
| `PARTICLE BACKGROUND` | Reduce opacidad de partículas en dark mode |

### Importante

- Se importa en `src/index.css` con `@import "./styles/darkMode.css"`
- Usa `!important` en muchas reglas para ganar especificidad
- Las reglas usan `html.dark` como selector (espera que la clase `.dark` esté en `<html>`)
- La clase `.dark` se aplica por `useThemeStore` cuando el usuario activa modo oscuro

## Convenciones

- No modificar directamente sin entender el impacto en todo el sitio
- Si se agrega un nuevo color de fondo claro, agregar su override aquí
- Probar siempre en modo oscuro después de agregar nuevas secciones

---
*Los Castores - 2026*
