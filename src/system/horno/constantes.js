// Constantes del módulo Horno (Producción y mermas).

export const TIPO_OPCIONES = [
  { value: 'todos', label: 'Todos los tipos', icon: 'fas fa-border-all' },
  { value: 'produccion', label: 'Producción', icon: 'fas fa-fire-burner' },
  { value: 'merma', label: 'Merma', icon: 'fas fa-biohazard' }
];

export const tipoClase = (tipo) =>
  tipo === 'merma'
    ? 'bg-red-50 text-red-500 border border-red-200'
    : 'bg-emerald-50 text-emerald-600 border border-emerald-200';

export const tipoIcono = (tipo) => (tipo === 'merma' ? 'fas fa-biohazard' : 'fas fa-fire-burner');

export const tipoLabel = (tipo) => (tipo === 'merma' ? 'Merma' : 'Producción');

export const estadoClase = (estado) =>
  estado === 'anulada'
    ? 'bg-slate-100 text-slate-400 border border-slate-200'
    : 'bg-sky-50 text-sky-600 border border-sky-200';

export const formatearFecha = (ts) =>
  ts ? new Date(ts).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }) : '—';