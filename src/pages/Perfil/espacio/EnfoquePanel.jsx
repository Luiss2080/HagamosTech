import { useEffect, useMemo, useRef, useState } from 'react';
import { AlarmClock, BookOpenCheck, Check, CirclePause, CirclePlay, RotateCcw, Trash2 } from 'lucide-react';
import { CampoFiltro, IconoEspacio, SelectorFiltro } from './ComponentesEspacio';
import { DURACIONES_DESCANSO, DURACIONES_ENFOQUE, filtrarSesionesEnfoque, formatearTiempo, resumirEnfoque } from './enfoqueUtils';

const MODOS = [
  { id: 'enfoque', label: 'Enfoque', texto: 'Concentración' },
  { id: 'descansoCorto', label: 'Descanso corto', texto: 'Pausa breve' },
  { id: 'descansoLargo', label: 'Descanso largo', texto: 'Pausa extendida' },
];
const rangos = [
  { value: 'hoy', label: 'Hoy' },
  { value: 'semana', label: 'Últimos 7 días' },
  { value: 'todas', label: 'Todo el historial' },
];
const fechaHora = (valor) => new Date(valor).toLocaleString('es', { dateStyle: 'medium', timeStyle: 'short' });

const EnfoquePanel = ({ sesiones, proyectos, onGuardarSesion, onEliminar, hidden }) => {
  const [modo, setModo] = useState('enfoque');
  const [duraciones, setDuraciones] = useState({ enfoque: 25, descansoCorto: 5, descansoLargo: 15 });
  const [restante, setRestante] = useState(25 * 60);
  const [corriendo, setCorriendo] = useState(false);
  const [titulo, setTitulo] = useState('');
  const [proyectoId, setProyectoId] = useState('');
  const [rango, setRango] = useState('semana');
  const [sesionPendiente, setSesionPendiente] = useState(null);
  const [estado, setEstado] = useState('');
  const inicioRef = useRef(null);

  const modoActual = MODOS.find((item) => item.id === modo);
  const presets = modo === 'enfoque' ? DURACIONES_ENFOQUE : DURACIONES_DESCANSO;
  const sesionesFiltradas = useMemo(() => filtrarSesionesEnfoque(sesiones, rango), [sesiones, rango]);
  const resumen = useMemo(() => resumirEnfoque(sesionesFiltradas), [sesionesFiltradas]);

  useEffect(() => {
    if (!corriendo) return undefined;
    const intervalo = setInterval(() => setRestante((actual) => Math.max(0, actual - 1)), 1000);
    return () => clearInterval(intervalo);
  }, [corriendo]);

  useEffect(() => {
    if (restante !== 0 || !corriendo) return;
    setCorriendo(false);
    if (modo === 'enfoque') {
      const completado = new Date();
      const duracionMinutos = duraciones.enfoque;
      const sesion = {
        titulo: titulo.trim() || 'Sesión de enfoque',
        duracionMinutos,
        iniciadoEn: (inicioRef.current || new Date(completado.getTime() - duracionMinutos * 60000)).toISOString(),
        completadoEn: completado.toISOString(),
        proyectoId: proyectoId || null,
      };
      inicioRef.current = null;
      setSesionPendiente(sesion);
      setEstado('El bloque terminó. Guardando tu sesión…');
      onGuardarSesion(sesion).then((guardada) => {
        if (guardada) {
          setSesionPendiente(null);
          setEstado('Sesión de enfoque guardada en tu historial.');
        } else setEstado('No se pudo guardar. La sesión quedó lista para reintentar.');
      });
    } else setEstado('Descanso finalizado. Cuando quieras, vuelve al enfoque.');
  }, [restante, corriendo, modo, duraciones.enfoque, titulo, proyectoId, onGuardarSesion]);

  const cambiarModo = (nuevoModo) => {
    if (corriendo || sesionPendiente) return;
    setModo(nuevoModo);
    setRestante(duraciones[nuevoModo] * 60);
    inicioRef.current = null;
    setEstado('');
  };

  const cambiarDuracion = (modoDuracion, valor) => {
    const numero = Math.max(1, Math.min(180, Number(valor) || 1));
    setDuraciones((actual) => ({ ...actual, [modoDuracion]: numero }));
    if (!corriendo && modo === modoDuracion) {
      setRestante(numero * 60);
      inicioRef.current = null;
    }
  };

  const iniciar = () => {
    if (restante <= 0) setRestante(duraciones[modo] * 60);
    if (modo === 'enfoque' && !inicioRef.current) inicioRef.current = new Date();
    setEstado('');
    setCorriendo(true);
  };

  const reiniciar = () => {
    setCorriendo(false);
    setRestante(duraciones[modo] * 60);
    inicioRef.current = null;
    setEstado('Temporizador reiniciado.');
  };

  const reintentarGuardado = async () => {
    if (!sesionPendiente) return;
    const guardada = await onGuardarSesion(sesionPendiente);
    if (guardada) {
      setSesionPendiente(null);
      setEstado('Sesión de enfoque guardada en tu historial.');
    }
  };

  return <section id="panel-enfoque" role="tabpanel" aria-labelledby="tab-enfoque" hidden={hidden} className="grid gap-6">
    <header className="flex flex-wrap items-center gap-3"><IconoEspacio><AlarmClock size={20} /></IconoEspacio><div className="flex-1"><h3 className="font-black">Enfoque y descansos</h3><p className="text-xs text-slate-400">Organiza bloques de concentración y lleva el tiempo que completas.</p></div></header>

    <div className="grid gap-5 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,.8fr)]">
      <div className="rounded-3xl border border-[#A3E635]/20 bg-black/20 p-5 sm:p-7">
        <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Tipo de temporizador">
          {MODOS.map((item) => <button key={item.id} type="button" aria-pressed={modo === item.id} disabled={corriendo || Boolean(sesionPendiente)} onClick={() => cambiarModo(item.id)} className={`rounded-full border px-4 py-2 text-xs font-black transition disabled:cursor-not-allowed disabled:opacity-50 ${modo === item.id ? 'border-[#A3E635] bg-[#A3E635] text-black' : 'border-white/10 text-slate-300 hover:border-[#A3E635]/40'}`}>{item.label}</button>)}
        </div>
        <div className="mx-auto my-6 grid h-48 w-48 place-items-center rounded-full border-[7px] border-[#A3E635]/25 bg-[#A3E635]/5 shadow-[0_0_45px_rgba(163,230,53,.12)] sm:h-56 sm:w-56" aria-label={`${modoActual.texto}: ${formatearTiempo(restante)} restantes`}>
          <div className="text-center"><span className="block text-5xl font-black tabular-nums tracking-tight sm:text-6xl">{formatearTiempo(restante)}</span><span className="mt-2 block text-[10px] font-black uppercase tracking-[.2em] text-[#A3E635]">{modoActual.texto}</span></div>
        </div>
        <div className="mx-auto flex max-w-md flex-wrap justify-center gap-3">
          {!corriendo ? <button type="button" onClick={iniciar} disabled={Boolean(sesionPendiente)} className="inline-flex items-center gap-2 rounded-full bg-[#A3E635] px-6 py-3 text-sm font-black text-black disabled:opacity-50"><CirclePlay size={18} />{restante < duraciones[modo] * 60 ? 'Continuar' : 'Comenzar'}</button> : <button type="button" onClick={() => setCorriendo(false)} className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-black"><CirclePause size={18} />Pausar</button>}
          <button type="button" onClick={reiniciar} className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-bold text-slate-300"><RotateCcw size={16} />Reiniciar</button>
        </div>
        {estado && <p role="status" className="mt-4 text-center text-sm text-slate-300">{estado}</p>}
        {sesionPendiente && <button type="button" onClick={reintentarGuardado} className="mx-auto mt-3 block rounded-full border border-[#A3E635]/35 px-4 py-2 text-xs font-bold text-[#A3E635]">Reintentar guardar sesión</button>}
      </div>

      <div className="grid content-start gap-4 rounded-3xl border border-white/10 bg-black/20 p-5 sm:p-6">
        <h4 className="font-black">Personaliza tus bloques</h4>
        {MODOS.map((item) => <label key={item.id} className="grid gap-1.5 text-[10px] font-black uppercase tracking-wider text-slate-400">Minutos · {item.label}<input type="number" min="1" max="180" value={duraciones[item.id]} disabled={corriendo || Boolean(sesionPendiente)} onChange={(event) => cambiarDuracion(item.id, event.target.value)} className="w-full rounded-xl border border-white/10 bg-[#0b0e09] px-3.5 py-2.5 text-sm font-semibold normal-case tracking-normal text-white outline-none focus:border-[#A3E635]/60 disabled:opacity-50" /></label>)}
        <div className="flex flex-wrap gap-2" aria-label="Duraciones sugeridas">
          {presets.map((minutos) => <button key={minutos} type="button" disabled={corriendo || Boolean(sesionPendiente)} aria-pressed={duraciones[modo] === minutos} onClick={() => cambiarDuracion(modo, minutos)} className={`rounded-full border px-3 py-1.5 text-xs font-bold disabled:opacity-50 ${duraciones[modo] === minutos ? 'border-[#A3E635] text-[#A3E635]' : 'border-white/10 text-slate-400 hover:border-[#A3E635]/40'}`}>{minutos} min</button>)}
        </div>
        {modo === 'enfoque' && <>
          <CampoFiltro label="¿En qué vas a enfocarte?" value={titulo} maxLength={120} onChange={(event) => setTitulo(event.target.value)} placeholder="Ej. Preparar el informe" disabled={corriendo || Boolean(sesionPendiente)} />
          <SelectorFiltro label="Proyecto asociado" value={String(proyectoId)} onChange={setProyectoId} options={[{ value: '', label: 'Sin proyecto' }, ...proyectos.map((proyecto) => ({ value: String(proyecto.id), label: proyecto.titulo }))]} className="min-w-full" disabled={corriendo || Boolean(sesionPendiente)} />
        </>}
        <p className="text-xs leading-5 text-slate-400">Solo los bloques de enfoque completados se guardan en el historial. Las pausas no suman tiempo de concentración.</p>
      </div>
    </div>

    <div className="grid gap-4 sm:grid-cols-2">
      <article className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/15 p-4"><IconoEspacio><BookOpenCheck size={18} /></IconoEspacio><div><p className="text-xs font-black uppercase">Bloques completados</p><p className="mt-1 text-xs text-slate-400">En el período seleccionado</p></div><strong className="ml-auto text-2xl text-[#A3E635]">{resumen.cantidad}</strong></article>
      <article className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/15 p-4"><IconoEspacio><AlarmClock size={18} /></IconoEspacio><div><p className="text-xs font-black uppercase">Tiempo de enfoque</p><p className="mt-1 text-xs text-slate-400">Minutos registrados</p></div><strong className="ml-auto text-2xl text-[#A3E635]">{resumen.minutos}<span className="ml-1 text-xs">min</span></strong></article>
    </div>

    <div className="grid gap-4">
      <div className="flex flex-wrap items-end gap-3"><div className="flex-1"><h4 className="font-black">Historial de enfoque</h4><p className="mt-1 text-xs text-slate-400">Tus bloques terminados, con proyecto y hora de registro.</p></div><SelectorFiltro label="Período" value={rango} options={rangos} onChange={setRango} /></div>
      {sesionesFiltradas.length === 0 ? <div className="rounded-2xl border border-dashed border-white/15 px-5 py-8 text-center"><p className="font-bold">Todavía no hay bloques completados</p><p className="mt-1 text-sm text-slate-400">Al terminar un bloque de enfoque quedará registrado aquí.</p></div> : <ul className="grid gap-2">{sesionesFiltradas.map((sesion) => {
        const proyecto = proyectos.find((item) => item.id === sesion.proyectoId);
        return <li key={sesion.id} className="flex flex-wrap items-center gap-3 rounded-2xl border border-white/10 bg-black/15 p-4"><IconoEspacio className="h-9 w-9 rounded-xl"><Check size={16} /></IconoEspacio><div className="min-w-0 flex-1"><p className="truncate text-sm font-bold">{sesion.titulo}</p><p className="mt-1 text-xs text-slate-400">{fechaHora(sesion.completadoEn)}{proyecto ? ` · ${proyecto.titulo}` : ''}</p></div><span className="text-sm font-black text-[#A3E635]">{sesion.duracionMinutos} min</span><button type="button" onClick={() => onEliminar(sesion)} aria-label={`Eliminar sesión ${sesion.titulo}`} className="rounded-lg p-2 text-slate-400 hover:bg-rose-400/10 hover:text-rose-200"><Trash2 size={16} /></button></li>;
      })}</ul>}
    </div>
  </section>;
};

export default EnfoquePanel;
