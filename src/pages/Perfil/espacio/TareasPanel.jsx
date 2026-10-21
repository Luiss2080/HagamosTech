import { useMemo, useState } from 'react';
import { CheckCircle2, Circle, ListTodo, Search } from 'lucide-react';
import { CampoFiltro, EstadoVacio, IconoEspacio, SelectorFiltro } from './ComponentesEspacio';

const estados = [
  { value: 'todas', label: 'Todos los estados' },
  { value: 'pendiente', label: 'Pendientes' },
  { value: 'en_progreso', label: 'En curso' },
  { value: 'completada', label: 'Completadas' },
];
const mostrarFecha = (value) => {
  if (!value) return '';
  const [year, month, day] = value.slice(0, 10).split('-').map(Number);
  return new Date(year, month - 1, day).toLocaleDateString('es');
};

const TareasPanel = ({ tareas, proyectos, onEditar, onEliminar, onEstado, hidden }) => {
  const [query, setQuery] = useState('');
  const [estado, setEstado] = useState('todas');
  const visibles = useMemo(() => tareas.filter((item) =>
    (estado === 'todas' || item.estado === estado) && `${item.titulo} ${item.descripcion || ''}`.toLowerCase().includes(query.toLowerCase())), [tareas, estado, query]);
  const nombreProyecto = (id) => proyectos.find((item) => item.id === id)?.titulo;
  return <section id="panel-tareas" role="tabpanel" aria-labelledby="tab-tareas" hidden={hidden} className="grid gap-5">
    <header className="flex flex-wrap items-center gap-3"><IconoEspacio><ListTodo size={20} /></IconoEspacio><div className="flex-1"><h3 className="font-black">Mis tareas <span className="text-[#A3E635]">{tareas.length}</span></h3><p className="text-xs text-slate-400">Planifica próximos pasos y marca tu avance.</p></div></header>
    <div className="flex flex-wrap items-end gap-3 rounded-2xl border border-white/10 p-3"><Search size={16} className="mb-3 text-slate-500" /><CampoFiltro label="Buscar" placeholder="Título o detalle" value={query} onChange={(event) => setQuery(event.target.value)} /><SelectorFiltro label="Estado" value={estado} options={estados} onChange={setEstado} /></div>
    {visibles.length === 0 ? <EstadoVacio icon={ListTodo} titulo={tareas.length ? 'No hay tareas para este filtro' : 'Tu lista está lista para empezar'} descripcion={tareas.length ? 'Cambiá la búsqueda o el estado.' : 'Crea tareas, define prioridades y fechas, y vincúlalas a tus proyectos.'} /> : <div className="grid gap-3 md:grid-cols-2">{visibles.map((task) => <article key={task.id} className="rounded-2xl border border-white/10 bg-black/15 p-4">
      <div className="flex items-start gap-3"><button type="button" onClick={() => onEstado(task, task.estado === 'completada' ? 'pendiente' : 'completada')} aria-label={task.estado === 'completada' ? `Reabrir ${task.titulo}` : `Completar ${task.titulo}`} className="mt-0.5 text-[#A3E635]">{task.estado === 'completada' ? <CheckCircle2 size={20} /> : <Circle size={20} />}</button><div className="min-w-0 flex-1"><h4 className={`font-bold ${task.estado === 'completada' ? 'text-slate-400 line-through' : ''}`}>{task.titulo}</h4>{task.descripcion && <p className="mt-1 whitespace-pre-wrap text-sm text-slate-400">{task.descripcion}</p>}<div className="mt-3 flex flex-wrap gap-2 text-[11px] text-slate-400">{task.vencimiento && <span>Vence {mostrarFecha(task.vencimiento)}</span>}<span className="rounded-full border border-white/10 px-2 py-0.5">Prioridad {task.prioridad}</span>{nombreProyecto(task.proyectoId) && <span className="rounded-full border border-[#A3E635]/20 px-2 py-0.5">{nombreProyecto(task.proyectoId)}</span>}</div></div></div>
      <div className="mt-4 flex justify-end gap-2"><button type="button" onClick={() => onEditar(task)} className="rounded-lg border border-white/10 px-3 py-1.5 text-xs font-bold hover:border-[#A3E635]/50">Editar</button><button type="button" onClick={() => onEliminar('tareas', task)} className="rounded-lg border border-white/10 px-3 py-1.5 text-xs font-bold text-rose-200 hover:border-rose-400/50">Eliminar</button></div>
    </article>)}</div>}
  </section>;
};
export default TareasPanel;
