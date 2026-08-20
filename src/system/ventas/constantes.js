// Constantes del módulo Ventas (POS salteñería).

export const METODO_OPCIONES = [
  { value: 'todos', label: 'Todos los métodos', icon: 'fas fa-wallet' },
  { value: 'efectivo', label: 'Efectivo', icon: 'fas fa-money-bill-wave' },
  { value: 'tarjeta', label: 'Tarjeta', icon: 'fas fa-credit-card' },
  { value: 'qr', label: 'QR Simple', icon: 'fas fa-qrcode' },
  { value: 'transferencia', label: 'Transferencia', icon: 'fas fa-building-columns' }
];

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

export const metodoIcono = (metodo) => {
  const map = {
    efectivo: 'fas fa-money-bill-wave',
    tarjeta: 'fas fa-credit-card',
    qr: 'fas fa-qrcode',
    transferencia: 'fas fa-building-columns'
  };
  return map[metodo] || 'fas fa-wallet';
};

export const formatearBs = (n) => `Bs. ${Number(n || 0).toFixed(2)}`;

export const formatearFecha = (ts) =>
  ts ? new Date(ts).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }) : '—';