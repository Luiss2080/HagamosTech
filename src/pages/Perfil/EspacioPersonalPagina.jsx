import { useCallback, useEffect, useMemo, useState } from 'react';
import { AlarmClock, ArrowRight, CalendarDays, Check, ClipboardList, NotebookPen, Plus, UserRound, X } from 'lucide-react';
import useAuthStore from '../../store/useAutenticacionStore';
import FondoTech from '../../components/fondos/FondoTech';
import { actualizarEtapaProyecto, eliminarRegistroPersonal, guardarRegistroPersonal, listarEspacioPersonal } from '../../servicios/espacioPersonalApi';
import CalendarioPanel from './espacio/CalendarioPanel';
import FormularioEspacioPersonal from './espacio/FormularioEspacioPersonal';
import NotasPanel from './espacio/NotasPanel';
import ProyectosPanel from './espacio/ProyectosPanel';
import { IconoEspacio } from './espacio/ComponentesEspacio';
import { estilosBoton } from './espacio/estilosEspacio';
import { fechaHoraLocal, fechaLocal, filtrarEventos } from './espacio/espacioPersonalUtils';

const secciones = [
  { id: 'proyectos', label: 'Proyectos', acceso: 'Mis proyectos', singular: 'proyecto', icon: ClipboardList },
  { id: 'notas', label: 'Notas', acceso: 'Mis notas', singular: 'nota', icon: NotebookPen },
  { id: 'calendario', label: 'Calendario', acceso: 'Calendario', singular: 'recordatorio', icon: CalendarDays },
];

const mensajeError = (error, fallback) => error.response?.data?.mensaje || error.response?.data?.error || fallback;

const EspacioPersonalPagina = () => {
  const user = useAuthStore((state) => state.user);
  const [tab, setTab] = useState('proyectos');
  const [datos, setDatos] = useState({ proyectos: [], notas: [], eventos: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [modal, setModal] = useState(null);
  const [saving, setSaving] = useState(false);
  const [month, setMonth] = useState(() => new Date(new Date().getFullYear(), new Date().getMonth(), 1));
  const [agendaRange, setAgendaRange] = useState('semana');
  const { proyectos, notas, eventos } = datos;

  const cargar = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      setDatos(await listarEspacioPersonal());
    } catch (apiError) {
      setError(mensajeError(apiError, 'No pudimos cargar tu espacio personal. Intentá nuevamente.'));
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

  const eventosSemana = useMemo(() => filtrarEventos(eventos, 'semana'), [eventos]);
  const abrirModal = (tipo, initial = {}) => setModal({ tipo, ...initial });
  const abrirProyecto = (project) => abrirModal('proyecto', project ? {
    id: project.id, titulo: project.titulo, categoria: project.categoria || '', descripcion: project.descripcion || '', etapa: project.etapa,
  } : { titulo: '', categoria: '', descripcion: '', etapa: 'idea' });
  const abrirNota = (note) => abrirModal('nota', note ? {
    id: note.id, titulo: note.titulo, contenido: note.contenido, proyectoId: note.proyectoId || '',
  } : { titulo: '', contenido: '', proyectoId: '' });
  const abrirEvento = (event) => abrirModal('evento', event ? {
    id: event.id, titulo: event.titulo, descripcion: event.descripcion || '', proyectoId: event.proyectoId || '',
    inicio: fechaHoraLocal(event.inicio),
    fin: event.fin ? fechaHoraLocal(event.fin) : '',
  } : { titulo: '', descripcion: '', proyectoId: '', inicio: `${fechaLocal(new Date())}T09:00`, fin: '' });
  const abrirEventoDia = (day) => abrirModal('evento', { titulo: '', descripcion: '', proyectoId: '', inicio: `${fechaLocal(day)}T09:00`, fin: '' });

  const guardar = async (event) => {
    event.preventDefault();
    if (!modal) return;
    const { tipo, id, ...values } = modal;
    setSaving(true);
    setError('');
    try {
      await guardarRegistroPersonal({ tipo, id, values });
      setModal(null);
      setNotice(tipo === 'proyecto' ? 'Proyecto guardado en tu cuenta.' : tipo === 'nota' ? 'Nota guardada en tu cuenta.' : 'Recordatorio guardado en tu calendario.');
      await cargar();
    } catch (apiError) {
      setError(mensajeError(apiError, 'No se pudo guardar. Revisá los datos e intentá de nuevo.'));
    } finally {
      setSaving(false);
    }
  };

  const eliminar = async (tipo, item) => {
    const nombre = tipo === 'proyectos' ? 'proyecto' : tipo === 'notas' ? 'nota' : 'recordatorio';
    if (!window.confirm(`¿Eliminar este ${nombre}? Esta acción no se puede deshacer.`)) return;
    setError('');
    try {
      await eliminarRegistroPersonal(tipo, item.id);
      setNotice(`${nombre[0].toUpperCase()}${nombre.slice(1)} eliminado de tu cuenta.`);
      await cargar();
    } catch (apiError) {
      setError(mensajeError(apiError, `No se pudo eliminar el ${nombre}.`));
    }
  };

  const cambiarEtapa = async (project, etapa) => {
    setError('');
    try {
      await actualizarEtapaProyecto(project.id, etapa);
      setNotice('Etapa del proyecto actualizada.');
      await cargar();
    } catch (apiError) {
      setError(mensajeError(apiError, 'No se pudo actualizar la etapa.'));
    }
  };

  const irASeccion = (nextTab) => {
    setTab(nextTab);
    requestAnimationFrame(() => document.getElementById('espacio-tablero')?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  };
  const cambiarCampo = (campo, valor) => setModal((actual) => ({ ...actual, [campo]: valor }));

  if (!user) return (
    <div className="relative min-h-screen overflow-hidden bg-[#050505] text-white"><FondoTech />
      <section className="relative z-10 mx-auto max-w-7xl px-4 pb-12 pt-6 text-center sm:px-6 lg:pt-8">
        <header className="mx-auto max-w-5xl border-b border-[#A3E635]/15 pb-10 sm:pb-12">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#A3E635]/35 bg-[#A3E635]/10 px-4 py-2 text-[10px] font-black uppercase tracking-[.2em] text-[#A3E635]"><UserRound size={14} /> Espacio personal HagamosTech</span>
          <h1 className="text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">Tus ideas, proyectos y fechas<br className="hidden sm:block" /> <span className="text-[#A3E635]">en un solo lugar.</span></h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">Organizá proyectos, guardá notas y planificá tus recordatorios. Todo queda asociado a tu cuenta.</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">{secciones.map(({ id, label, icon: SectionIcon }) => <span key={id} className="inline-flex items-center gap-2 rounded-full border border-[#A3E635]/25 bg-[#A3E635]/10 px-4 py-2.5 text-[10px] font-black uppercase tracking-[.14em] text-[#A3E635]"><SectionIcon size={14} />{label}</span>)}</div>
        </header>
        <div className="mx-auto grid max-w-5xl gap-4 py-10 text-left sm:grid-cols-3">{secciones.map(({ id, label, singular, icon: SectionIcon }) => <article key={id} className="rounded-2xl border border-white/10 bg-[#0e110d]/85 p-5"><IconoEspacio><SectionIcon size={20} /></IconoEspacio><h2 className="mt-4 font-black">{label}</h2><p className="mt-1 text-sm text-slate-400">Tu {singular} se guarda de forma privada en tu cuenta.</p></article>)}</div>
        <div className="mx-auto flex max-w-xl flex-col justify-center gap-3 sm:flex-row"><button type="button" onClick={() => window.openModal?.('modal_register')} className={estilosBoton.principal}>Crear cuenta <Plus size={16} /></button><button type="button" onClick={() => window.openModal?.('modal_login')} className={estilosBoton.secundario}>Iniciar sesión <ArrowRight size={16} /></button></div>
        <p className="mt-5 text-center text-[11px] text-white/45">Los recordatorios son personales y no reservan citas con HagamosTech.</p>
      </section>
    </div>
  );

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050505] text-white"><FondoTech />
      <section className="relative z-10 mx-auto max-w-7xl px-4 pb-12 pt-6 sm:px-6 lg:pb-16 lg:pt-8">
        <header className="mx-auto max-w-5xl border-b border-[#A3E635]/15 pb-8 text-center sm:pb-10">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#A3E635]/30 bg-[#A3E635]/10 px-4 py-2 text-[10px] font-black uppercase tracking-[.2em] text-[#A3E635]"><UserRound size={14} /> Espacio personal HagamosTech</span>
          <h1 className="text-4xl font-black leading-tight tracking-tight sm:text-5xl">Hola, {user.nombre?.split(' ')[0] || 'bienvenido'}.<br /><span className="text-[#A3E635]">Organicemos tus ideas.</span></h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/70">Proyectos, notas privadas y recordatorios organizados desde tu cuenta.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">{secciones.map(({ id, acceso, icon: SectionIcon }) => <button key={id} type="button" onClick={() => irASeccion(id)} className="inline-flex items-center gap-2 rounded-full border border-[#A3E635]/25 bg-[#A3E635]/10 px-4 py-2.5 text-[10px] font-black uppercase tracking-[.14em] text-[#A3E635] transition hover:border-[#A3E635]/60 hover:bg-[#A3E635]/20"><SectionIcon size={14} /> {acceso}</button>)}</div>
        </header>

        {!loading && !error && <div aria-label="Resumen de tu espacio personal" className="my-6 grid gap-3 sm:grid-cols-3">{[
          { id: 'proyectos', label: 'Proyectos', detalle: 'Ideas en seguimiento', cantidad: proyectos.length, icon: ClipboardList },
          { id: 'notas', label: 'Notas privadas', detalle: 'Apuntes guardados', cantidad: notas.length, icon: NotebookPen },
          { id: 'calendario', label: 'Próximos 7 días', detalle: 'Recordatorios próximos', cantidad: eventosSemana.length, icon: CalendarDays },
        ].map(({ id, label, detalle, cantidad, icon: SummaryIcon }) => <button key={id} type="button" onClick={() => irASeccion(id)} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-[#0e110d]/85 p-4 text-left transition hover:border-[#A3E635]/40 hover:bg-[#151912]"><IconoEspacio><SummaryIcon size={20} /></IconoEspacio><span className="min-w-0 flex-1"><span className="block text-xs font-black uppercase tracking-wide">{label}</span><span className="mt-1 block text-[11px] text-slate-400">{detalle}</span></span><span className="text-2xl font-black text-[#A3E635]">{cantidad}</span></button>)}</div>}

        {error && <div role="alert" className="mb-5 flex items-start justify-between gap-4 rounded-2xl border border-rose-400/30 bg-rose-950/40 px-4 py-3 text-sm text-rose-100"><span>{error}</span><button type="button" aria-label="Cerrar aviso" onClick={() => setError('')}><X size={16} /></button></div>}
        {notice && <div role="status" className="mb-5 flex items-center gap-2 rounded-2xl border border-[#A3E635]/30 bg-[#A3E635]/10 px-4 py-3 text-sm font-semibold text-lime-100"><Check size={16} className="text-[#A3E635]" />{notice}</div>}

        <div id="espacio-tablero" aria-labelledby="espacio-tablero-titulo" className="relative mt-8 scroll-mt-24 overflow-hidden rounded-[2rem] border border-[#A3E635]/25 bg-[#0e110d]/95 shadow-[0_30px_90px_rgba(0,0,0,.45)] sm:mt-10 sm:rounded-[2.5rem]">
          <div className="border-b border-white/10 px-5 py-5 text-center sm:px-7 sm:py-7"><span className="text-[10px] font-black uppercase tracking-[.22em] text-[#A3E635]">Tu organización personal</span><h2 id="espacio-tablero-titulo" className="mt-2 text-2xl font-black sm:text-3xl">Todo lo que estás organizando</h2><p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-white/60">Cada elemento es privado y se guarda en tu cuenta. Las etapas son personales; los recordatorios no crean citas con el equipo.</p></div>
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 px-5 py-5 sm:px-7"><div><h3 className="text-lg font-black sm:text-xl">Tu espacio</h3><p className="mt-1 text-xs text-slate-400">Elegí una sección o creá un elemento nuevo.</p></div><div className="flex flex-wrap gap-2"><button type="button" onClick={() => abrirProyecto()} className={estilosBoton.principal}><Plus size={15} /> Nuevo proyecto</button><button type="button" onClick={() => abrirNota()} className={estilosBoton.secundario}><NotebookPen size={15} /> Anotar</button><button type="button" onClick={() => abrirEventoDia(new Date())} className={estilosBoton.secundario}><AlarmClock size={15} /> Recordatorio</button></div></div>

          <div role="tablist" aria-label="Secciones de tu espacio" className="flex gap-2 overflow-x-auto border-b border-white/10 px-4 py-3 sm:px-7">{secciones.map(({ id, label, icon: SectionIcon }) => <button key={id} id={`tab-${id}`} type="button" role="tab" aria-controls={`panel-${id}`} aria-selected={tab === id} onClick={() => setTab(id)} className={`inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-xs font-black transition ${tab === id ? 'bg-[#A3E635] text-black' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}><SectionIcon size={15} />{label}{id === 'proyectos' && proyectos.length > 0 ? ` · ${proyectos.length}` : ''}{id === 'notas' && notas.length > 0 ? ` · ${notas.length}` : ''}</button>)}</div>
          <div className="p-4 sm:p-7">{loading ? <div className="grid min-h-56 place-items-center text-sm font-bold text-slate-400"><span className="flex items-center gap-3"><span className="h-5 w-5 animate-spin rounded-full border-2 border-[#A3E635]/30 border-t-[#A3E635]" />Cargando tus datos guardados…</span></div> : <>
            <ProyectosPanel proyectos={proyectos} onCrear={() => abrirProyecto()} onEditar={abrirProyecto} onEliminar={eliminar} onCambiarEtapa={cambiarEtapa} hidden={tab !== 'proyectos'} />
            <NotasPanel notas={notas} proyectos={proyectos} onCrear={() => abrirNota()} onEditar={abrirNota} onEliminar={eliminar} hidden={tab !== 'notas'} />
            <CalendarioPanel eventos={eventos} proyectos={proyectos} month={month} setMonth={setMonth} range={agendaRange} setRange={setAgendaRange} onCrear={abrirEventoDia} onEditar={abrirEvento} onEliminar={eliminar} hidden={tab !== 'calendario'} />
          </>}</div>
        </div>
      </section>
      {modal && <FormularioEspacioPersonal modal={modal} proyectos={proyectos} saving={saving} onChange={cambiarCampo} onClose={() => setModal(null)} onSubmit={guardar} />}
    </div>
  );
};

export default EspacioPersonalPagina;
