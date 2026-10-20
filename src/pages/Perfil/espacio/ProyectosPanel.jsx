import { useMemo, useState } from 'react';
import { BookOpenText, Check, CircleHelp, ClipboardList, Lightbulb, Plus, Search, Trash2 } from 'lucide-react';
import { filtrarProyectos } from './espacioPersonalUtils';
import { CampoFiltro, EstadoVacio, IconoEspacio, SelectorFiltro } from './ComponentesEspacio';

const etapas = [
  { id: 'idea', label: 'Idea', icon: Lightbulb },
  { id: 'consulta', label: 'En consulta', icon: CircleHelp },
  { id: 'progreso', label: 'En progreso', icon: ClipboardList },
  { id: 'revision', label: 'Revisión', icon: BookOpenText },
  { id: 'finalizado', label: 'Finalizado', icon: Check },
];

const ProyectosPanel = ({ proyectos, onCrear, onEditar, onEliminar, onCambiarEtapa, hidden = false }) => {
  const [busqueda, setBusqueda] = useState('');
  const [etapa, setEtapa] = useState('todas');
  const filtrados = useMemo(() => filtrarProyectos(proyectos, busqueda, etapa), [proyectos, busqueda, etapa]);

  return (
    <section id="panel-proyectos" role="tabpanel" tabIndex={0} aria-labelledby="tab-proyectos" hidden={hidden}>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3"><IconoEspacio><ClipboardList size={21} /></IconoEspacio><div><h3 id="proyectos-titulo" className="font-black">Mis proyectos <span className="text-sm font-bold text-slate-500">{proyectos.length}</span></h3><p className="text-xs text-slate-400">Organizá objetivos y seguí tu propio avance.</p></div></div>
        <button type="button" onClick={onCrear} className="inline-flex items-center gap-2 rounded-full bg-[#A3E635] px-4 py-2.5 text-xs font-black text-black hover:bg-lime-300"><Plus size={15} /> Nuevo proyecto</button>
      </div>
      <div className="mb-5 flex flex-col gap-3 rounded-2xl border border-white/10 bg-black/15 p-3 sm:flex-row sm:items-end">
        <div className="relative flex min-w-0 flex-1 items-end gap-2"><Search size={17} className="mb-3 ml-1 shrink-0 text-slate-500" /><CampoFiltro label="Buscar" type="search" value={busqueda} onChange={(event) => setBusqueda(event.target.value)} placeholder="Título, categoría o descripción" /></div>
        <SelectorFiltro label="Etapa" value={etapa} onChange={(event) => setEtapa(event.target.value)}><option value="todas">Todas las etapas</option>{etapas.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}</SelectorFiltro>
        {(busqueda || etapa !== 'todas') && <button type="button" onClick={() => { setBusqueda(''); setEtapa('todas'); }} className="mb-0.5 rounded-lg px-3 py-2 text-xs font-bold text-[#A3E635] hover:bg-[#A3E635]/10">Limpiar filtros</button>}
      </div>
      {proyectos.length === 0 ? <EstadoVacio icon={Lightbulb} titulo="Tu espacio empieza con una idea" descripcion="Creá tu primer proyecto para agrupar objetivos, notas y fechas relacionadas." accion="Crear proyecto" onAction={onCrear} /> : filtrados.length === 0 ? <EstadoVacio icon={Search} titulo="No encontramos proyectos" descripcion="Probá otra palabra o quitá el filtro de etapa." /> : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtrados.map((project) => {
            const stage = etapas.find((item) => item.id === project.etapa) || etapas[0];
            const StageIcon = stage.icon;
            return <article key={project.id} className="flex flex-col rounded-2xl border border-white/10 bg-[#151912] p-5 transition hover:border-[#A3E635]/35">
              <div className="mb-4 flex items-start justify-between gap-3"><IconoEspacio><StageIcon size={20} /></IconoEspacio><div className="flex gap-1"><button type="button" aria-label={`Editar ${project.titulo}`} onClick={() => onEditar(project)} className="rounded-lg px-3 py-2 text-xs font-bold text-slate-300 hover:bg-white/5">Editar</button><button type="button" aria-label={`Eliminar ${project.titulo}`} onClick={() => onEliminar('proyectos', project)} className="rounded-lg p-2 text-slate-400 hover:bg-rose-500/10 hover:text-rose-300"><Trash2 size={15} /></button></div></div>
              <p className="text-[10px] font-black uppercase tracking-[.18em] text-[#A3E635]">{project.categoria || 'Personal'}</p><h4 className="mt-1 text-lg font-black">{project.titulo}</h4>
              {project.descripcion && <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-400">{project.descripcion}</p>}
              <label className="mt-auto grid gap-2 pt-5 text-[10px] font-black uppercase tracking-wider text-slate-500">Etapa personal<select aria-label={`Etapa de ${project.titulo}`} value={project.etapa} onChange={(event) => onCambiarEtapa(project, event.target.value)} className="rounded-lg border border-white/10 bg-[#0b0e09] px-3 py-2 text-xs font-bold normal-case tracking-normal text-slate-200">{etapas.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}</select></label>
              <div className="mt-4 flex gap-3 border-t border-white/10 pt-3 text-[11px] text-slate-400"><span>{project._count?.notas || 0} notas</span><span>{project._count?.eventos || 0} fechas</span></div>
            </article>;
          })}
        </div>
      )}
    </section>
  );
};

export default ProyectosPanel;
