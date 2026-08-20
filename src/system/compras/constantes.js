// Constantes del módulo Compras e Insumos.

export const ESTADO_OPCIONES = [
  { value: 'todos', label: 'Todos los estados', icon: 'fas fa-border-all' },
  { value: 'registrada', label: 'Registradas', icon: 'fas fa-circle-check' },
  { value: 'anulada', label: 'Anuladas', icon: 'fas fa-circle-xmark' }
];

export const SORT_OPCIONES = [
  { value: 'recientes', label: 'Más recientes', icon: 'fas fa-calendar' },
  { value: 'mayor', label: 'Mayor monto', icon: 'fas fa-arrow-down-9-1' },
  { value: 'menor', label: 'Menor monto', icon: 'fas fa-arrow-down-1-9' }
];

export const estadoClase = (estado) =>
  estado === 'anulada'
    ? 'bg-red-50 text-red-500 border border-red-200'
    : 'bg-emerald-50 text-emerald-600 border border-emerald-200';

export const formatearBs = (n) => `Bs. ${Number(n || 0).toFixed(2)}`;

export const formatearFecha = (ts) =>
  ts ? new Date(ts).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }) : '—';