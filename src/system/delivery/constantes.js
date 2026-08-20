// Constantes del módulo Delivery.

export const ESTADO_PEDIDO_OPCIONES = [
  { value: 'todos', label: 'Todos los estados', icon: 'fas fa-border-all' },
  { value: 'recibido', label: 'Recibido', icon: 'fas fa-inbox' },
  { value: 'en_ruta', label: 'En ruta', icon: 'fas fa-motorcycle' },
  { value: 'entregado', label: 'Entregado', icon: 'fas fa-circle-check' },
  { value: 'anulado', label: 'Anulado', icon: 'fas fa-circle-xmark' }
];

export const estadoClase = (estado) => {
  const map = {
    recibido: 'bg-amber-50 text-amber-600 border-amber-200',
    en_ruta: 'bg-sky-50 text-sky-600 border-sky-200',
    entregado: 'bg-emerald-50 text-emerald-600 border-emerald-200',
    anulado: 'bg-red-50 text-red-500 border-red-200'
  };
  return map[estado] || 'bg-slate-100 text-slate-500 border-slate-200';
};

export const estadoIcono = (estado) => {
  const map = { recibido: 'fas fa-inbox', en_ruta: 'fas fa-motorcycle', entregado: 'fas fa-circle-check', anulado: 'fas fa-circle-xmark' };
  return map[estado] || 'fas fa-clock';
};

export const formatearBs = (n) => `Bs. ${Number(n || 0).toFixed(2)}`;

export const formatearFecha = (ts) =>
  ts ? new Date(ts).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }) : '—';