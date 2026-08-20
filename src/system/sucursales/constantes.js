// Constantes del módulo Sucursales.

export const CIUDADES = [
  'Santa Cruz de la Sierra',
  'Cochabamba',
  'Oruro',
  'La Paz',
  'Sucre',
  'Tarija',
  'Potosí',
  'Beni',
  'Pando'
];

export const ESTADO_OPCIONES = [
  { value: 'todos', label: 'Todos los estados', icon: 'fas fa-border-all' },
  { value: 'activo', label: 'Activas', icon: 'fas fa-circle-check' },
  { value: 'inactivo', label: 'Inactivas', icon: 'fas fa-circle-xmark' }
];

export const formatearFecha = (ts) =>
  ts ? new Date(ts).toLocaleDateString() : '—';