# chat/ - Asistente Virtual Niko

Sistema de chat con asistente virtual y procesamiento de lenguaje natural.

## Estructura

| Carpeta / Archivo | Descripción |
|-------------------|-------------|
| `AsistenteChat.jsx` | Componente principal del asistente virtual |
| `index.js` | Punto de entrada y exportaciones del módulo |
| `components/` | Sub-componentes de la interfaz de chat |
| `data/` | Base de conocimiento y configuración del asistente |
| `hooks/` | Lógica de estado y comportamiento del chat |
| `utils/` | Utilidades de renderizado y formato de texto |

### components/

| Archivo | Descripción |
|---------|-------------|
| `BotonAlternarChat.jsx` | Botón flotante para abrir/cerrar el chat |
| `EncabezadoChat.jsx` | Barra superior del panel de chat |
| `EntradaChat.jsx` | Campo de entrada de texto para mensajes |
| `IndicadorEscribiendo.jsx` | Animación de "escribiendo..." del asistente |
| `MensajesChat.jsx` | Lista de mensajes de la conversación |
| `MenuChat.jsx` | Menú de opciones rápidas del chat |

### data/

| Archivo | Descripción |
|---------|-------------|
| `categorias.jsx` | Categorías de respuestas y temas del asistente |
| `configuracion.js` | Configuración general del chat (límites, tiempos) |
| `procesamientoLenguaje.js` | Lógica de procesamiento de lenguaje natural |

### hooks/

| Archivo | Descripción |
|---------|-------------|
| `useAsistenteChat.js` | Hook principal con lógica de mensajes y respuestas |

### utils/

| Archivo | Descripción |
|---------|-------------|
| `renderizarTexto.jsx` | Funciones para renderizar texto enriquecido en mensajes |
