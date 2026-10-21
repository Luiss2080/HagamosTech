import { useMemo, useState } from 'react';
import { BookOpenText, Check, CircleHelp, ClipboardList, LayoutGrid, Lightbulb, List, Search, Trash2 } from 'lucide-react';
import { filtrarProyectos, ordenarProyectos } from './espacioPersonalUtils';
import { CampoFiltro, EstadoVacio, IconoEspacio, SelectorFiltro } from './ComponentesEspacio';

const etapas = [
  { id: 'idea', label: 'Idea', icon: Lightbulb },
  { id: 'consulta', label: 'En consulta', icon: CircleHelp },
  { id: 'progreso', label: 'En progreso', icon: ClipboardList },
  { id: 'revision', label: 'Revisión', icon: BookOpenText },
  { id: 'finalizado', label: 'Finalizado', icon: Check },
];

const ProyectosPanel = ({ proyectos, onEditar, onEliminar, onCambiarEtapa, hidden = false }) => {
  const [busqueda, setBusqueda] = useState('');
  const [etapa, setEtapa] = useState('todas');
  const [orden, setOrden] = useState('actualizados');
  const [vista, setVista] = useState('tarjetas');
  const filtrados = useMemo(() => ordenarProyectos(filtrarProyectos(proyectos, busqueda, etapa), orden), [proyectos, busqueda, etapa, orden]);
  const etapasFiltro = [{ value: 'todas', label: 'Todas las etapas' }, ...etapas.map(({ id: value, label }) => ({ value, label }))];
  const ordenes = [{ value: 'actualizados', label: 'Última actualización' }, { value: 'nombre', label: 'Nombre A-Z' }, { value: 'etapa', label: 'Etapa' }];

  return (
    <section id="panel-proyectos" role="tabpanel" tabIndex={0} aria-labelledby="tab-proyectos" hidden={hidden}>
      <div className="mb-5 flex flex-col items-center gap-3 text-center">
        <IconoEspacio><ClipboardList size={21} /></IconoEspacio><div><h3 id="proyectos-titulo" className="font-black">Mis proyectos <span className="text-sm font-bold text-slate-500">{proyectos.length}</span></h3><p className="text-xs text-slate-400">Organizá objetivos y seguí tu propio avance.</p></div>
      </div>
      <div className="mb-3 flex flex-col gap-3 rounded-2xl border border-white/10 bg-black/15 p-3 sm:flex-row sm:items-end">
        <div className="relative flex min-w-0 flex-1 items-end gap-2"><Search size={17} className="mb-3 ml-1 shrink-0 text-slate-500" /><CampoFiltro label="Buscar" type="search" value={busqueda} onChange={(event) => setBusqueda(event.target.value)} placeholder="Título, categoría o descripción" /></div>
        <SelectorFiltro label="Etapa" value={etapa} onChange={setEtapa} options={etapasFiltro} />
        <SelectorFiltro label="Ordenar" value={orden} onChange={setOrden} options={ordenes} />
        {(busqueda || etapa !== 'todas') && <button type="button" onClick={() => { setBusqueda(''); setEtapa('todas'); }} className="mb-0.5 rounded-lg px-3 py-2 text-xs font-bold text-[#A3E635] hover:bg-[#A3E635]/10">Limpiar filtros</button>}
      </div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500"><span>{filtrados.length} de {proyectos.length} proyectos</span><div role="group" aria-label="Personalizar vista de proyectos" className="inline-flex rounded-xl border border-white/10 bg-black/20 p-1"><button type="button" aria-label="Vista de tarjetas" title="Vista de tarjetas" aria-pressed={vista === 'tarjetas'} onClick={() => setVista('tarjetas')} className={`rounded-lg p-2 transition ${vista === 'tarjetas' ? 'bg-[#A3E635] text-black' : 'text-slate-400 hover:text-white'}`}><LayoutGrid size={16} /></button><button type="button" aria-label="Vista de lista" title="Vista de lista" aria-pressed={vista === 'lista'} onClick={() => setVista('lista')} className={`rounded-lg p-2 transition ${vista === 'lista' ? 'bg-[#A3E635] text-black' : 'text-slate-400 hover:text-white'}`}><List size={16} /></button></div></div>
      {proyectos.length === 0 ? <EstadoVacio icon={Lightbulb} titulo="Tu espacio empieza con una idea" descripcion="Usá el botón Nuevo proyecto de arriba para agrupar objetivos, notas y fechas relacionadas." /> : filtrados.length === 0 ? <EstadoVacio icon={Search} titulo="No encontramos proyectos" descripcion="Probá otra palabra o quitá el filtro de etapa." /> : (
        <div className={`grid ${vista === 'lista' ? 'grid-cols-1 gap-3' : 'gap-4 md:grid-cols-2 xl:grid-cols-3'}`}>
          {filtrados.map((project) => {
            const stage = etapas.find((item) => item.id === project.etapa) || etapas[0];
            const StageIcon = stage.icon;
            return <article key={project.id} className="flex flex-col rounded-2xl border border-white/10 bg-[#151912] p-5 transition hover:border-[#A3E635]/35">
              <div className="mb-4 flex items-start justify-between gap-3"><IconoEspacio><StageIcon size={20} /></IconoEspacio><div className="flex gap-1"><button type="button" aria-label={`Editar ${project.titulo}`} onClick={() => onEditar(project)} className="rounded-lg px-3 py-2 text-xs font-bold text-slate-300 hover:bg-white/5">Editar</button><button type="button" aria-label={`Eliminar ${project.titulo}`} onClick={() => onEliminar('proyectos', project)} className="rounded-lg p-2 text-slate-400 hover:bg-rose-500/10 hover:text-rose-300"><Trash2 size={15} /></button></div></div>
              <p className="text-[10px] font-black uppercase tracking-[.18em] text-[#A3E635]">{project.categoria || 'Personal'}</p><h4 className="mt-1 text-lg font-black">{project.titulo}</h4>
              {project.descripcion && <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-400">{project.descripcion}</p>}
              <SelectorFiltro label="Etapa personal" value={project.etapa} onChange={(value) => onCambiarEtapa(project, value)} options={etapas.map(({ id: value, label }) => ({ value, label }))} className="mt-auto pt-5" abrirArriba />
              <div className="mt-4 flex gap-3 border-t border-white/10 pt-3 text-[11px] text-slate-400"><span>{project._count?.notas || 0} notas</span><span>{project._count?.eventos || 0} fechas</span></div>
            </article>;
          })}
        </div>
      )}
    </section>
  );
};

export default ProyectosPanel;
