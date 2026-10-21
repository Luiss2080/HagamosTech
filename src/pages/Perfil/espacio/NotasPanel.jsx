import { useMemo, useState } from 'react';
import { LayoutGrid, List, NotebookPen, Search, Trash2 } from 'lucide-react';
import { filtrarNotas, ordenarNotas } from './espacioPersonalUtils';
import { CampoFiltro, EstadoVacio, IconoEspacio, SelectorFiltro } from './ComponentesEspacio';

const NotasPanel = ({ notas, proyectos, onEditar, onEliminar, hidden = false }) => {
  const [busqueda, setBusqueda] = useState('');
  const [proyectoId, setProyectoId] = useState('todas');
  const [orden, setOrden] = useState('actualizadas');
  const [vista, setVista] = useState('tarjetas');
  const filtradas = useMemo(() => ordenarNotas(filtrarNotas(notas, busqueda, proyectoId), orden), [notas, busqueda, proyectoId, orden]);
  const proyectosFiltro = [{ value: 'todas', label: 'Todos los proyectos' }, { value: 'generales', label: 'Notas generales' }, ...proyectos.map((project) => ({ value: String(project.id), label: project.titulo }))];
  const ordenes = [{ value: 'actualizadas', label: 'Última actualización' }, { value: 'nombre', label: 'Nombre A-Z' }];

  return (
    <section id="panel-notas" role="tabpanel" tabIndex={0} aria-labelledby="tab-notas" hidden={hidden}>
      <div className="mb-5 flex flex-col items-center gap-3 text-center">
        <IconoEspacio><NotebookPen size={21} /></IconoEspacio><div><h3 id="notas-titulo" className="font-black">Notas privadas <span className="text-sm font-bold text-slate-500">{notas.length}</span></h3><p className="text-xs text-slate-400">Apuntes vinculados a tus proyectos o notas generales.</p></div>
      </div>
      <div className="mb-3 flex flex-col gap-3 rounded-2xl border border-white/10 bg-black/15 p-3 sm:flex-row sm:items-end">
        <div className="relative flex min-w-0 flex-1 items-end gap-2"><Search size={17} className="mb-3 ml-1 shrink-0 text-slate-500" /><CampoFiltro label="Buscar en notas" type="search" value={busqueda} onChange={(event) => setBusqueda(event.target.value)} placeholder="Título o contenido" /></div>
        <SelectorFiltro label="Proyecto" value={proyectoId} onChange={setProyectoId} options={proyectosFiltro} />
        <SelectorFiltro label="Ordenar" value={orden} onChange={setOrden} options={ordenes} />
        {(busqueda || proyectoId !== 'todas') && <button type="button" onClick={() => { setBusqueda(''); setProyectoId('todas'); }} className="mb-0.5 rounded-lg px-3 py-2 text-xs font-bold text-[#A3E635] hover:bg-[#A3E635]/10">Limpiar filtros</button>}
      </div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500"><span>{filtradas.length} de {notas.length} notas</span><div role="group" aria-label="Personalizar vista de notas" className="inline-flex rounded-xl border border-white/10 bg-black/20 p-1"><button type="button" aria-label="Vista de tarjetas" title="Vista de tarjetas" aria-pressed={vista === 'tarjetas'} onClick={() => setVista('tarjetas')} className={`rounded-lg p-2 transition ${vista === 'tarjetas' ? 'bg-[#A3E635] text-black' : 'text-slate-400 hover:text-white'}`}><LayoutGrid size={16} /></button><button type="button" aria-label="Vista de lista" title="Vista de lista" aria-pressed={vista === 'lista'} onClick={() => setVista('lista')} className={`rounded-lg p-2 transition ${vista === 'lista' ? 'bg-[#A3E635] text-black' : 'text-slate-400 hover:text-white'}`}><List size={16} /></button></div></div>
      {notas.length === 0 ? <EstadoVacio icon={NotebookPen} titulo="Tu cuaderno está listo" descripcion="Usá el botón Nueva nota de arriba para guardar apuntes y asociarlos a un proyecto." /> : filtradas.length === 0 ? <EstadoVacio icon={Search} titulo="No encontramos notas" descripcion="Probá otro término o seleccioná otro proyecto." /> : (
        <div className={`grid ${vista === 'lista' ? 'grid-cols-1 gap-3' : 'gap-4 md:grid-cols-2 xl:grid-cols-3'}`}>
          {filtradas.map((note) => {
            const project = proyectos.find((item) => item.id === note.proyectoId);
            return <article key={note.id} className="flex flex-col rounded-2xl border border-white/10 bg-[#151912] p-5">
              <div className="flex items-start justify-between gap-4"><div className="min-w-0"><p className="truncate text-[10px] font-black uppercase tracking-[.16em] text-[#A3E635]">{project?.titulo || 'Nota general'}</p><h4 className="mt-1 break-words font-black">{note.titulo}</h4></div><div className="flex shrink-0 gap-1"><button type="button" onClick={() => onEditar(note)} className="rounded-lg px-3 py-2 text-xs font-bold text-slate-300 hover:bg-white/5">Editar</button><button type="button" aria-label={`Eliminar ${note.titulo}`} onClick={() => onEliminar('notas', note)} className="rounded-lg p-2 text-slate-400 hover:text-rose-300"><Trash2 size={15} /></button></div></div>
              <p className="mt-4 flex-1 whitespace-pre-wrap break-words text-sm leading-6 text-slate-300">{note.contenido}</p><p className="mt-4 border-t border-white/10 pt-3 text-[10px] text-slate-500">Actualizada {new Date(note.actualizadoEn).toLocaleDateString('es-BO')}</p>
            </article>;
          })}
        </div>
      )}
    </section>
  );
};

export default NotasPanel;
