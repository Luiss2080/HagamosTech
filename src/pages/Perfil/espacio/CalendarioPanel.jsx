import { useMemo } from 'react';
import { AlarmClock, CalendarDays, ChevronLeft, ChevronRight, Trash2 } from 'lucide-react';
import { fechaLocal, filtrarEventos, obtenerDiasDelCalendario } from './espacioPersonalUtils';
import { IconoEspacio } from './ComponentesEspacio';

const periodos = [{ id: 'hoy', label: 'Hoy' }, { id: 'semana', label: '7 días' }, { id: 'todos', label: 'Todos' }];

const CalendarioPanel = ({ eventos, proyectos, month, setMonth, range, setRange, onCrear, onEditar, onEliminar, hidden = false }) => {
  const dias = useMemo(() => obtenerDiasDelCalendario(month), [month]);
  const agenda = useMemo(() => filtrarEventos(eventos, range), [eventos, range]);
  const hoy = fechaLocal(new Date());

  return (
    <section id="panel-calendario" role="tabpanel" tabIndex={0} aria-labelledby="tab-calendario" hidden={hidden}>
      <div className="mb-5 flex flex-col items-center gap-3 text-center"><IconoEspacio><CalendarDays size={21} /></IconoEspacio><div><h3 id="calendario-titulo" className="font-black">Calendario personal <span className="text-sm font-bold text-slate-500">{eventos.length}</span></h3><p className="text-xs text-slate-400">Organizá entregas, fechas y recordatorios propios.</p></div></div>
      <div className="grid gap-5 lg:grid-cols-[1.4fr_.8fr]">
        <section aria-label="Vista mensual" className="rounded-2xl border border-white/10 bg-[#151912] p-4 sm:p-5">
          <div className="mb-4 flex items-center justify-between"><button type="button" aria-label="Mes anterior" onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))} className="rounded-lg p-2 text-slate-300 hover:bg-white/5"><ChevronLeft size={19} /></button><h4 className="font-black capitalize">{month.toLocaleDateString('es-BO', { month: 'long', year: 'numeric' })}</h4><div className="flex items-center gap-1"><button type="button" onClick={() => setMonth(new Date())} className="rounded-lg px-2.5 py-2 text-xs font-bold text-[#A3E635] hover:bg-[#A3E635]/10">Hoy</button><button type="button" aria-label="Mes siguiente" onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))} className="rounded-lg p-2 text-slate-300 hover:bg-white/5"><ChevronRight size={19} /></button></div></div>
          <div className="grid grid-cols-7 gap-1 text-center">{['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'].map((day) => <div key={day} className="py-2 text-[10px] font-black uppercase text-slate-500">{day}</div>)}{dias.map((day) => { const dayEvents = eventos.filter((item) => fechaLocal(new Date(item.inicio)) === fechaLocal(day)); const isMonth = day.getMonth() === month.getMonth(); const isToday = fechaLocal(day) === hoy; return <button key={fechaLocal(day)} type="button" aria-label={`${day.toLocaleDateString('es-BO', { dateStyle: 'full' })}${dayEvents.length ? `, ${dayEvents.length} recordatorios` : ''}`} onClick={() => onCrear(day)} className={`relative min-h-12 rounded-xl border p-1 text-xs transition sm:min-h-16 ${isMonth ? 'border-white/5 text-slate-200 hover:border-[#A3E635]/50 hover:bg-[#A3E635]/5' : 'border-transparent text-slate-600'} ${isToday ? 'border-[#A3E635]/50 bg-[#A3E635]/10 text-[#A3E635]' : ''}`}><span className="font-bold">{day.getDate()}</span>{dayEvents.length > 0 && <span className="mt-1 flex justify-center gap-0.5" aria-hidden="true">{dayEvents.slice(0, 3).map((item) => <span key={item.id} className="h-1.5 w-1.5 rounded-full bg-[#A3E635]" />)}</span>}</button>; })}</div>
          <p className="mt-3 text-center text-[10px] text-slate-500">Seleccioná un día para crear un recordatorio.</p>
        </section>
        <section aria-label="Agenda de recordatorios" className="rounded-2xl border border-white/10 bg-[#151912] p-4 sm:p-5">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3"><h4 className="flex items-center gap-2 font-black"><AlarmClock size={17} className="text-[#A3E635]" /> Agenda</h4><div role="group" aria-label="Filtrar recordatorios" className="flex flex-wrap gap-1 rounded-xl border border-white/10 bg-black/20 p-1">{periodos.map((periodo) => <button key={periodo.id} type="button" aria-pressed={range === periodo.id} onClick={() => setRange(periodo.id)} className={`rounded-lg px-2.5 py-1.5 text-[10px] font-black transition ${range === periodo.id ? 'bg-[#A3E635] text-black' : 'text-slate-400 hover:text-white'}`}>{periodo.label}</button>)}</div></div>
          {agenda.length === 0 ? <p className="rounded-xl border border-dashed border-white/10 px-4 py-8 text-center text-sm text-slate-500">No hay recordatorios en este período.</p> : <div className="grid gap-2">{agenda.slice(0, range === 'todos' ? 20 : 8).map((event) => { const project = proyectos.find((item) => item.id === event.proyectoId); return <article key={event.id} className="flex items-start justify-between gap-3 rounded-xl border border-white/5 bg-black/20 p-3"><button type="button" className="min-w-0 flex-1 text-left" onClick={() => onEditar(event)}><p className="truncate text-sm font-bold">{event.titulo}</p><p className="mt-1 text-[10px] text-[#A3E635]">{new Date(event.inicio).toLocaleString('es-BO', { dateStyle: 'medium', timeStyle: 'short' })}</p>{project && <p className="mt-1 truncate text-[10px] text-slate-500">{project.titulo}</p>}</button><button type="button" aria-label={`Eliminar ${event.titulo}`} onClick={() => onEliminar('eventos', event)} className="rounded-lg p-2 text-slate-500 hover:bg-rose-500/10 hover:text-rose-300"><Trash2 size={14} /></button></article>; })}</div>}
          {agenda.length > 0 && <p className="mt-3 text-center text-[10px] text-slate-500">Mostrando {Math.min(agenda.length, range === 'todos' ? 20 : 8)} de {agenda.length}</p>}
        </section>
      </div>
    </section>
  );
};

export default CalendarioPanel;
