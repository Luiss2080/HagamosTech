import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlarmClock, ArrowLeft, BookOpenText, CalendarDays, Check, ChevronLeft, ChevronRight, CircleHelp, ClipboardList, Lightbulb, NotebookPen, Plus, Trash2, UserRound, X } from 'lucide-react';
import useAuthStore from '../../store/useAutenticacionStore';
import apiClient from '../../servicios/clienteApi';

const ETAPAS = [
  { id: 'idea', label: 'Idea', icon: Lightbulb },
  { id: 'consulta', label: 'En consulta', icon: CircleHelp },
  { id: 'progreso', label: 'En progreso', icon: ClipboardList },
  { id: 'revision', label: 'Revisión', icon: BookOpenText },
  { id: 'finalizado', label: 'Finalizado', icon: Check },
];
const TABS = [
  { id: 'proyectos', label: 'Proyectos', icon: ClipboardList },
  { id: 'notas', label: 'Notas', icon: NotebookPen },
  { id: 'calendario', label: 'Calendario', icon: CalendarDays },
];
const API = '/perfil/espacio';
const fechaLocal = (date) => {
  const pad = (value) => String(value).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
};
const horaLocal = (date) => `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
const fechaHoraLocal = (value) => {
  const date = new Date(value);
  return `${fechaLocal(date)}T${horaLocal(date)}`;
};

const Icono = ({ children, className = '' }) => (
  <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[#A3E635]/20 bg-[#A3E635]/10 text-[#A3E635] ${className}`}>{children}</span>
);

const Campo = ({ label, ...props }) => (
  <label className="grid gap-2 text-sm font-bold text-slate-200">
    {label}
    {props.as === 'textarea' ? <textarea {...props} className={`min-h-28 resize-y rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-[#A3E635]/60 ${props.className || ''}`} /> : <input {...props} className={`rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-[#A3E635]/60 ${props.className || ''}`} />}
  </label>
);

const EspacioPersonalPagina = () => {
  const user = useAuthStore((state) => state.user);
  const [tab, setTab] = useState('proyectos');
  const [proyectos, setProyectos] = useState([]);
  const [notas, setNotas] = useState([]);
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [modal, setModal] = useState(null);
  const [saving, setSaving] = useState(false);
  const [month, setMonth] = useState(() => new Date(new Date().getFullYear(), new Date().getMonth(), 1));
  const navigate = useNavigate();

  const cargar = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const [projectResponse, noteResponse, eventResponse] = await Promise.all([
        apiClient.get(`${API}/proyectos`), apiClient.get(`${API}/notas`), apiClient.get(`${API}/eventos`),
      ]);
      setProyectos(projectResponse.data.data);
      setNotas(noteResponse.data.data);
      setEventos(eventResponse.data.data);
    } catch (apiError) {
      setError(apiError.response?.data?.mensaje || apiError.response?.data?.error || 'No pudimos cargar tu espacio personal. Intentá nuevamente.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { if (user) cargar(); else setLoading(false); }, [user, cargar]);
  useEffect(() => {
    if (!notice) return undefined;
    const timer = setTimeout(() => setNotice(''), 3200);
    return () => clearTimeout(timer);
  }, [notice]);

  const guardar = async (event) => {
    event.preventDefault();
    if (!modal) return;
    const { tipo, id, ...values } = modal;
    const endpoint = tipo === 'proyecto' ? 'proyectos' : tipo === 'nota' ? 'notas' : 'eventos';
    const payload = { ...values };
    if (payload.proyectoId === '') payload.proyectoId = null;
    if (payload.inicio) payload.inicio = new Date(payload.inicio).toISOString();
    if (payload.fin) payload.fin = new Date(payload.fin).toISOString();
    setSaving(true);
    setError('');
    try {
      if (id) await apiClient.put(`${API}/${endpoint}/${id}`, payload);
      else await apiClient.post(`${API}/${endpoint}`, payload);
      setModal(null);
      setNotice(tipo === 'proyecto' ? 'Proyecto guardado en tu espacio.' : tipo === 'nota' ? 'Nota guardada.' : 'Recordatorio guardado en tu calendario.');
      await cargar();
    } catch (apiError) {
      setError(apiError.response?.data?.mensaje || apiError.response?.data?.error || 'No se pudo guardar. Revisá los datos e intentá de nuevo.');
    } finally {
      setSaving(false);
    }
  };

  const eliminar = async (tipo, item) => {
    const nombre = tipo === 'proyectos' ? 'proyecto' : tipo === 'notas' ? 'nota' : 'recordatorio';
    if (!window.confirm(`¿Eliminar este ${nombre}? Esta acción no se puede deshacer.`)) return;
    try {
      await apiClient.delete(`${API}/${tipo}/${item.id}`);
      setNotice(`${nombre[0].toUpperCase()}${nombre.slice(1)} eliminado.`);
      await cargar();
    } catch (apiError) {
      setError(apiError.response?.data?.error || `No se pudo eliminar el ${nombre}.`);
    }
  };

  const cambiarEtapa = async (project, etapa) => {
    try {
      await apiClient.put(`${API}/proyectos/${project.id}`, { etapa });
      await cargar();
    } catch (apiError) {
      setError(apiError.response?.data?.error || 'No se pudo actualizar la etapa.');
    }
  };

  const calendario = useMemo(() => {
    const firstDay = new Date(month.getFullYear(), month.getMonth(), 1);
    const offset = firstDay.getDay();
    const start = new Date(firstDay);
    start.setDate(1 - offset);
    return Array.from({ length: 42 }, (_, index) => {
      const day = new Date(start);
      day.setDate(start.getDate() + index);
      return day;
    });
  }, [month]);

  const abrirModal = (tipo, initial = {}) => setModal({ tipo, ...initial });
  const abrirEventoDia = (day) => abrirModal('evento', { titulo: '', descripcion: '', proyectoId: '', inicio: `${fechaLocal(day)}T09:00`, fin: '' });

  if (!user) return (
    <main className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-[#070907] px-4 py-20 text-center text-white">
      <div className="max-w-xl rounded-[2rem] border border-[#A3E635]/25 bg-[#10140d] p-8 shadow-2xl sm:p-12">
        <Icono className="mx-auto mb-5 h-14 w-14"><UserRound /></Icono>
        <p className="mb-3 text-xs font-black uppercase tracking-[.22em] text-[#A3E635]">Tu espacio HagamosTech</p>
        <h1 className="text-3xl font-black sm:text-4xl">Organizá tus proyectos</h1>
        <p className="mx-auto mt-4 max-w-md text-slate-300">Iniciá sesión para guardar ideas, notas y recordatorios personales en un espacio privado.</p>
        <button onClick={() => window.openModal?.('modal_login')} className="mt-7 rounded-full bg-[#A3E635] px-7 py-3 font-black text-black transition hover:bg-lime-300">Iniciar sesión</button>
      </div>
    </main>
  );

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#070907] px-4 py-12 text-white sm:px-6 lg:py-16">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-35" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(163,230,53,.2) 1px, transparent 0)', backgroundSize: '38px 38px' }} />
      <div className="relative mx-auto max-w-7xl">
        <button onClick={() => navigate('/')} className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-slate-400 transition hover:text-[#A3E635]"><ArrowLeft size={16} /> Volver al inicio</button>
        <header className="mb-9 text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#A3E635]/30 bg-[#A3E635]/10 px-4 py-2 text-[11px] font-black uppercase tracking-[.2em] text-[#A3E635]"><UserRound size={14} /> Espacio personal</span>
          <h1 className="text-3xl font-black tracking-tight sm:text-5xl">Hola, {user.nombre?.split(' ')[0] || 'bienvenido'}.</h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">Un lugar privado para ordenar tus proyectos, guardar apuntes y planificar fechas importantes.</p>
          <p className="mx-auto mt-3 max-w-2xl text-xs text-slate-500">Las etapas son para tu organización personal. Los recordatorios no reservan citas ni actualizan proyectos internos.</p>
        </header>

        {error && <div role="alert" className="mb-5 flex items-start justify-between gap-4 rounded-2xl border border-rose-400/30 bg-rose-950/40 px-4 py-3 text-sm text-rose-100"><span>{error}</span><button aria-label="Cerrar aviso" onClick={() => setError('')}><X size={16} /></button></div>}
        {notice && <div role="status" className="mb-5 flex items-center gap-2 rounded-2xl border border-[#A3E635]/30 bg-[#A3E635]/10 px-4 py-3 text-sm font-semibold text-lime-100"><Check size={16} className="text-[#A3E635]" />{notice}</div>}

        <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#0e110d]/95 shadow-[0_30px_90px_rgba(0,0,0,.35)]">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 px-5 py-5 sm:px-7">
            <div>
              <h2 className="text-lg font-black sm:text-xl">Tu tablero</h2>
              <p className="mt-1 text-xs text-slate-400">Tus datos son privados y se guardan en tu cuenta.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => abrirModal('proyecto', { titulo: '', categoria: '', descripcion: '', etapa: 'idea' })} className="inline-flex items-center gap-2 rounded-full bg-[#A3E635] px-4 py-2.5 text-xs font-black text-black transition hover:bg-lime-300"><Plus size={15} /> Nuevo proyecto</button>
              <button onClick={() => abrirModal('nota', { titulo: '', contenido: '', proyectoId: '' })} className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-xs font-bold transition hover:border-[#A3E635]/40"><NotebookPen size={15} /> Anotar</button>
              <button onClick={() => abrirEventoDia(new Date())} className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-xs font-bold transition hover:border-[#A3E635]/40"><AlarmClock size={15} /> Recordatorio</button>
            </div>
          </div>

          <div role="tablist" aria-label="Secciones de tu espacio" className="flex gap-2 overflow-x-auto border-b border-white/10 px-4 py-3 sm:px-7">
            {TABS.map(({ id, label, icon: TabIcon }) => <button key={id} role="tab" aria-selected={tab === id} onClick={() => setTab(id)} className={`inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-xs font-black transition ${tab === id ? 'bg-[#A3E635] text-black' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}><TabIcon size={15} />{label}{id === 'proyectos' && proyectos.length > 0 ? ` · ${proyectos.length}` : ''}{id === 'notas' && notas.length > 0 ? ` · ${notas.length}` : ''}</button>)}
          </div>

          <div className="p-4 sm:p-7">
            {loading ? <div className="grid min-h-56 place-items-center text-sm font-bold text-slate-400"><span className="flex items-center gap-3"><span className="h-5 w-5 animate-spin rounded-full border-2 border-[#A3E635]/30 border-t-[#A3E635]" />Cargando tu espacio…</span></div> : <>
              {tab === 'proyectos' && <div>
                <div className="mb-5 flex items-center gap-3"><Icono><ClipboardList size={21} /></Icono><div><h3 className="font-black">Proyectos personales</h3><p className="text-xs text-slate-400">Registrá ideas o seguí por tu cuenta el avance de una iniciativa.</p></div></div>
                {proyectos.length === 0 ? <div className="rounded-2xl border border-dashed border-white/15 bg-black/15 px-5 py-12 text-center"><Icono className="mx-auto mb-4"><Lightbulb size={20} /></Icono><h4 className="font-black">Todavía no agregaste proyectos</h4><p className="mx-auto mt-2 max-w-md text-sm text-slate-400">Creá uno para tener a mano el objetivo, las notas y las fechas relacionadas.</p><button onClick={() => abrirModal('proyecto', { titulo: '', categoria: '', descripcion: '', etapa: 'idea' })} className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#A3E635] px-5 py-2.5 text-xs font-black text-black"><Plus size={15} /> Crear proyecto</button></div> : <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{proyectos.map((project) => { const stage = ETAPAS.find((item) => item.id === project.etapa) || ETAPAS[0]; const StageIcon = stage.icon; return <article key={project.id} className="rounded-2xl border border-white/10 bg-[#151912] p-5 transition hover:border-[#A3E635]/35"><div className="mb-4 flex items-start justify-between gap-3"><Icono><StageIcon size={20} /></Icono><div className="flex gap-1"><button aria-label={`Editar ${project.titulo}`} onClick={() => abrirModal('proyecto', { id: project.id, titulo: project.titulo, categoria: project.categoria, descripcion: project.descripcion || '', etapa: project.etapa })} className="rounded-lg p-2 text-slate-400 hover:bg-white/5 hover:text-white"><i className="fas fa-pen text-xs" /></button><button aria-label={`Eliminar ${project.titulo}`} onClick={() => eliminar('proyectos', project)} className="rounded-lg p-2 text-slate-400 hover:bg-rose-500/10 hover:text-rose-300"><Trash2 size={15} /></button></div></div><p className="text-[10px] font-black uppercase tracking-[.18em] text-[#A3E635]">{project.categoria}</p><h4 className="mt-1 text-lg font-black">{project.titulo}</h4>{project.descripcion && <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-400">{project.descripcion}</p>}<label className="mt-5 grid gap-2 text-[10px] font-black uppercase tracking-wider text-slate-500">Mi etapa personal<select value={project.etapa} onChange={(event) => cambiarEtapa(project, event.target.value)} className="rounded-lg border border-white/10 bg-[#0b0e09] px-3 py-2 text-xs font-bold normal-case tracking-normal text-slate-200">{ETAPAS.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}</select></label><div className="mt-4 flex gap-3 border-t border-white/10 pt-3 text-[11px] text-slate-400"><span>{project._count?.notas || 0} notas</span><span>{project._count?.eventos || 0} fechas</span></div></article>; })}</div>}
              </div>}

              {tab === 'notas' && <div>
                <div className="mb-5 flex items-center gap-3"><Icono><NotebookPen size={21} /></Icono><div><h3 className="font-black">Notas privadas</h3><p className="text-xs text-slate-400">Guardá ideas, pendientes, requisitos o apuntes de estudio.</p></div></div>
                {notas.length === 0 ? <div className="rounded-2xl border border-dashed border-white/15 bg-black/15 px-5 py-12 text-center"><h4 className="font-black">Tu cuaderno está vacío</h4><p className="mt-2 text-sm text-slate-400">Tus notas son visibles solo desde tu cuenta.</p><button onClick={() => abrirModal('nota', { titulo: '', contenido: '', proyectoId: '' })} className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#A3E635] px-5 py-2.5 text-xs font-black text-black"><Plus size={15} /> Nueva nota</button></div> : <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{notas.map((note) => { const project = proyectos.find((item) => item.id === note.proyectoId); return <article key={note.id} className="rounded-2xl border border-white/10 bg-[#151912] p-5"><div className="flex items-start justify-between gap-4"><div><p className="text-[10px] font-black uppercase tracking-[.16em] text-[#A3E635]">{project?.titulo || 'Nota general'}</p><h4 className="mt-1 font-black">{note.titulo}</h4></div><div className="flex"><button aria-label={`Editar ${note.titulo}`} onClick={() => abrirModal('nota', { id: note.id, titulo: note.titulo, contenido: note.contenido, proyectoId: note.proyectoId || '' })} className="rounded-lg p-2 text-slate-400 hover:bg-white/5 hover:text-white"><i className="fas fa-pen text-xs" /></button><button aria-label={`Eliminar ${note.titulo}`} onClick={() => eliminar('notas', note)} className="rounded-lg p-2 text-slate-400 hover:text-rose-300"><Trash2 size={15} /></button></div></div><p className="mt-4 whitespace-pre-wrap break-words text-sm leading-6 text-slate-300">{note.contenido}</p><p className="mt-4 text-[10px] text-slate-500">Actualizada {new Date(note.actualizadoEn).toLocaleDateString('es-BO')}</p></article>; })}</div>}
              </div>}

              {tab === 'calendario' && <div>
                <div className="mb-5 flex flex-wrap items-center justify-between gap-3"><div className="flex items-center gap-3"><Icono><CalendarDays size={21} /></Icono><div><h3 className="font-black">Calendario personal</h3><p className="text-xs text-slate-400">Organizá entregas, reuniones y recordatorios propios.</p></div></div><button onClick={() => abrirEventoDia(new Date())} className="inline-flex items-center gap-2 rounded-full bg-[#A3E635] px-4 py-2.5 text-xs font-black text-black"><Plus size={15} /> Añadir fecha</button></div>
                <div className="grid gap-5 lg:grid-cols-[1.4fr_.8fr]">
                  <section className="rounded-2xl border border-white/10 bg-[#151912] p-4 sm:p-5"><div className="mb-4 flex items-center justify-between"><button aria-label="Mes anterior" onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))} className="rounded-lg p-2 text-slate-300 hover:bg-white/5"><ChevronLeft size={19} /></button><h4 className="font-black capitalize">{month.toLocaleDateString('es-BO', { month: 'long', year: 'numeric' })}</h4><button aria-label="Mes siguiente" onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))} className="rounded-lg p-2 text-slate-300 hover:bg-white/5"><ChevronRight size={19} /></button></div><div className="grid grid-cols-7 gap-1 text-center">{['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'].map((day) => <div key={day} className="py-2 text-[10px] font-black uppercase text-slate-500">{day}</div>)}{calendario.map((day) => { const dayEvents = eventos.filter((item) => fechaLocal(new Date(item.inicio)) === fechaLocal(day)); const isMonth = day.getMonth() === month.getMonth(); const isToday = fechaLocal(day) === fechaLocal(new Date()); return <button key={fechaLocal(day)} onClick={() => abrirEventoDia(day)} className={`relative min-h-12 rounded-xl border p-1 text-xs transition sm:min-h-16 ${isMonth ? 'border-white/5 text-slate-200 hover:border-[#A3E635]/50 hover:bg-[#A3E635]/5' : 'border-transparent text-slate-600'} ${isToday ? 'border-[#A3E635]/50 bg-[#A3E635]/10 text-[#A3E635]' : ''}`}><span className="font-bold">{day.getDate()}</span>{dayEvents.length > 0 && <span className="mt-1 flex justify-center gap-0.5">{dayEvents.slice(0, 3).map((item) => <span key={item.id} className="h-1.5 w-1.5 rounded-full bg-[#A3E635]" />)}</span>}</button>; })}</div><p className="mt-3 text-center text-[10px] text-slate-500">Seleccioná un día para crear un recordatorio.</p></section>
                  <section className="rounded-2xl border border-white/10 bg-[#151912] p-4 sm:p-5"><h4 className="mb-4 flex items-center gap-2 font-black"><AlarmClock size={17} className="text-[#A3E635]" /> Próximos recordatorios</h4>{eventos.filter((item) => new Date(item.inicio) >= new Date(new Date().setHours(0, 0, 0, 0))).sort((a, b) => new Date(a.inicio) - new Date(b.inicio)).slice(0, 8).length === 0 ? <p className="rounded-xl border border-dashed border-white/10 px-4 py-8 text-center text-sm text-slate-500">No hay fechas próximas.</p> : <div className="grid gap-2">{eventos.filter((item) => new Date(item.inicio) >= new Date(new Date().setHours(0, 0, 0, 0))).sort((a, b) => new Date(a.inicio) - new Date(b.inicio)).slice(0, 8).map((event) => { const project = proyectos.find((item) => item.id === event.proyectoId); return <article key={event.id} className="flex items-start justify-between gap-3 rounded-xl border border-white/5 bg-black/20 p-3"><button className="min-w-0 flex-1 text-left" onClick={() => abrirModal('evento', { id: event.id, titulo: event.titulo, descripcion: event.descripcion || '', proyectoId: event.proyectoId || '', inicio: fechaHoraLocal(event.inicio), fin: event.fin ? fechaHoraLocal(event.fin) : '' })}><p className="truncate text-sm font-bold">{event.titulo}</p><p className="mt-1 text-[10px] text-[#A3E635]">{new Date(event.inicio).toLocaleString('es-BO', { dateStyle: 'medium', timeStyle: 'short' })}</p>{project && <p className="mt-1 truncate text-[10px] text-slate-500">{project.titulo}</p>}</button><button aria-label={`Eliminar ${event.titulo}`} onClick={() => eliminar('eventos', event)} className="rounded-lg p-2 text-slate-500 hover:bg-rose-500/10 hover:text-rose-300"><Trash2 size={14} /></button></article>; })}</div>}</section>
                </div>
              </div>}
            </>}
          </div>
        </section>
      </div>

      {modal && <div className="fixed inset-0 z-[300] grid place-items-center overflow-y-auto bg-black/75 p-4 backdrop-blur-sm" onMouseDown={(event) => { if (event.target === event.currentTarget) setModal(null); }}><form onSubmit={guardar} className="my-8 w-full max-w-xl rounded-[1.75rem] border border-[#A3E635]/20 bg-[#10140e] p-5 shadow-2xl sm:p-7"><div className="mb-6 flex items-start justify-between gap-4"><div><p className="text-[10px] font-black uppercase tracking-[.2em] text-[#A3E635]">Espacio privado</p><h3 className="mt-1 text-xl font-black">{modal.tipo === 'proyecto' ? (modal.id ? 'Editar proyecto' : 'Nuevo proyecto') : modal.tipo === 'nota' ? (modal.id ? 'Editar nota' : 'Nueva nota') : (modal.id ? 'Editar recordatorio' : 'Nuevo recordatorio')}</h3></div><button type="button" aria-label="Cerrar" onClick={() => setModal(null)} className="rounded-xl p-2 text-slate-400 hover:bg-white/5 hover:text-white"><X size={18} /></button></div>
        {modal.tipo === 'proyecto' && <div className="grid gap-4"><Campo label="Nombre" name="titulo" maxLength={120} value={modal.titulo} onChange={(event) => setModal({ ...modal, titulo: event.target.value })} placeholder="Ej. Monografía de biología" required /><Campo label="Categoría" name="categoria" maxLength={60} value={modal.categoria} onChange={(event) => setModal({ ...modal, categoria: event.target.value })} placeholder="Académico, web, diseño…" /><Campo as="textarea" label="Descripción u objetivo" name="descripcion" maxLength={4000} value={modal.descripcion} onChange={(event) => setModal({ ...modal, descripcion: event.target.value })} placeholder="Anotá qué querés organizar" /><label className="grid gap-2 text-sm font-bold text-slate-200">Etapa personal<select value={modal.etapa} onChange={(event) => setModal({ ...modal, etapa: event.target.value })} className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white">{ETAPAS.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}</select></label></div>}
        {modal.tipo === 'nota' && <div className="grid gap-4"><Campo label="Título" name="titulo" maxLength={120} value={modal.titulo} onChange={(event) => setModal({ ...modal, titulo: event.target.value })} placeholder="Ej. Ideas para el proyecto" required /><Campo as="textarea" label="Apunte" name="contenido" maxLength={10000} value={modal.contenido} onChange={(event) => setModal({ ...modal, contenido: event.target.value })} placeholder="Escribí lo que quieras recordar…" required /><label className="grid gap-2 text-sm font-bold text-slate-200">Asociar a un proyecto<select value={modal.proyectoId} onChange={(event) => setModal({ ...modal, proyectoId: event.target.value })} className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white"><option value="">Nota general</option>{proyectos.map((project) => <option key={project.id} value={project.id}>{project.titulo}</option>)}</select></label></div>}
        {modal.tipo === 'evento' && <div className="grid gap-4"><Campo label="Qué querés recordar" name="titulo" maxLength={120} value={modal.titulo} onChange={(event) => setModal({ ...modal, titulo: event.target.value })} placeholder="Ej. Entregar avance" required /><Campo label="Fecha y hora" name="inicio" type="datetime-local" value={modal.inicio} onChange={(event) => setModal({ ...modal, inicio: event.target.value })} required /><Campo label="Hasta (opcional)" name="fin" type="datetime-local" value={modal.fin} onChange={(event) => setModal({ ...modal, fin: event.target.value })} /><Campo label="Detalle" name="descripcion" maxLength={500} value={modal.descripcion} onChange={(event) => setModal({ ...modal, descripcion: event.target.value })} placeholder="Un detalle breve" /><label className="grid gap-2 text-sm font-bold text-slate-200">Proyecto asociado<select value={modal.proyectoId} onChange={(event) => setModal({ ...modal, proyectoId: event.target.value })} className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white"><option value="">Sin proyecto</option>{proyectos.map((project) => <option key={project.id} value={project.id}>{project.titulo}</option>)}</select></label></div>}
        <div className="mt-7 flex justify-end gap-3"><button type="button" onClick={() => setModal(null)} className="rounded-full border border-white/15 px-5 py-2.5 text-xs font-bold text-slate-300 hover:bg-white/5">Cancelar</button><button disabled={saving} className="inline-flex items-center gap-2 rounded-full bg-[#A3E635] px-5 py-2.5 text-xs font-black text-black disabled:opacity-60">{saving ? 'Guardando…' : <><Check size={14} /> Guardar</>}</button></div>
      </form></div>}
    </main>
  );
};

export default EspacioPersonalPagina;
