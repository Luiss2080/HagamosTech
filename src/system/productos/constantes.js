// Constantes del módulo Productos / Menú (salteñería).

export const ESTADO_OPCIONES = [
  { value: 'todos', label: 'Todos los estados', icon: 'fas fa-border-all' },
  { value: 'activo', label: 'Activos', icon: 'fas fa-circle-check' },
  { value: 'inactivo', label: 'Inactivos', icon: 'fas fa-circle-xmark' }
];

export const DISPONIBILIDAD_OPCIONES = [
  { value: 'En stock', label: 'En stock', icon: 'fas fa-boxes-stacked' },
  { value: 'Agotado', label: 'Agotado', icon: 'fas fa-box-open' },
  { value: 'Próximamente', label: 'Próximamente', icon: 'fas fa-hourglass-half' }
];

export const INSIGNIA_OPCIONES = [
  { value: '', label: 'Sin insignia', icon: 'fas fa-tag' },
  { value: 'Más vendida', label: 'Más vendida', icon: 'fas fa-crown' },
  { value: 'Nuevo', label: 'Nuevo', icon: 'fas fa-star' },
  { value: 'Picante', label: 'Picante', icon: 'fas fa-pepper-hot' },
  { value: 'Oferta', label: 'Oferta', icon: 'fas fa-fire' }
];

export const SORT_OPCIONES = [
  { value: 'recientes', label: 'Más recientes', icon: 'fas fa-calendar' },
  { value: 'nombre_az', label: 'Nombre A-Z', icon: 'fas fa-sort-alpha-down' },
  { value: 'precio_menor', label: 'Precio menor', icon: 'fas fa-arrow-down-1-9' },
  { value: 'precio_mayor', label: 'Precio mayor', icon: 'fas fa-arrow-down-9-1' }
];

export const formatearBs = (n) => `Bs. ${Number(n || 0).toFixed(2)}`;

export const calcularDescuento = (precio, anterior) =>
  anterior && precio < anterior ? Math.round((1 - precio / anterior) * 100) : 0;