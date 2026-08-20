// Constantes del módulo Control de Stock.

export const TIPO_OPCIONES = [
  { value: 'todos', label: 'Todos los tipos', icon: 'fas fa-border-all' },
  { value: 'entrada', label: 'Entrada', icon: 'fas fa-arrow-down' },
  { value: 'salida', label: 'Salida', icon: 'fas fa-arrow-up' },
  { value: 'merma', label: 'Merma', icon: 'fas fa-biohazard' },
  { value: 'ajuste', label: 'Ajuste', icon: 'fas fa-sliders' },
  { value: 'transferencia_salida', label: 'Transferencia salida', icon: 'fas fa-arrow-right-arrow-left' },
  { value: 'transferencia_entrada', label: 'Transferencia entrada', icon: 'fas fa-arrow-right-arrow-left' }
];

export const ESTADO_STOCK = {
  ok: { label: 'OK', cls: 'bg-emerald-50 text-emerald-600 border-emerald-200', icon: 'fas fa-circle-check' },
  critico: { label: 'Crítico', cls: 'bg-amber-50 text-amber-600 border-amber-200', icon: 'fas fa-triangle-exclamation' },
  agotado: { label: 'Agotado', cls: 'bg-red-50 text-red-500 border-red-200', icon: 'fas fa-circle-xmark' }
};

export const tipoMovimientoClase = (tipo) => {
  if (tipo === 'entrada' || tipo === 'transferencia_entrada') return 'bg-emerald-50 text-emerald-600 border border-emerald-200';
  if (tipo === 'salida') return 'bg-amber-50 text-amber-600 border border-amber-200';
  if (tipo === 'merma') return 'bg-red-50 text-red-500 border border-red-200';
  if (tipo === 'ajuste') return 'bg-sky-50 text-sky-600 border border-sky-200';
  return 'bg-slate-100 text-slate-500 border border-slate-200';
};

export const tipoMovimientoIcono = (tipo) => {
  const map = {
    entrada: 'fas fa-arrow-down',
    salida: 'fas fa-arrow-up',
    merma: 'fas fa-biohazard',
    ajuste: 'fas fa-sliders',
    transferencia_salida: 'fas fa-arrow-right',
    transferencia_entrada: 'fas fa-arrow-left'
  };
  return map[tipo] || 'fas fa-right-left';
};

export const tipoMovimientoLabel = (tipo) => {
  const map = {
    entrada: 'Entrada',
    salida: 'Salida',
    merma: 'Merma',
    ajuste: 'Ajuste',
    transferencia_salida: 'Transferencia salida',
    transferencia_entrada: 'Transferencia entrada'
  };
  return map[tipo] || tipo;
};

export const formatearFecha = (ts) => ts ? new Date(ts).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }) : '—';