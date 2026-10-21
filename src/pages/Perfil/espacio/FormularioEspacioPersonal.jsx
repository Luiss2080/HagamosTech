import { createPortal } from 'react-dom';
import { Check, X } from 'lucide-react';
import { estilosBoton } from './estilosEspacio';
import { SelectorFiltro } from './ComponentesEspacio';

const ETAPAS_OPCIONES = [
  { value: 'idea', label: 'Idea' },
  { value: 'consulta', label: 'En consulta' },
  { value: 'progreso', label: 'En progreso' },
  { value: 'revision', label: 'Revisión' },
  { value: 'finalizado', label: 'Finalizado' },
];

const Campo = ({ label, as: Element = 'input', className = '', ...props }) => (
  <label className="grid gap-2 text-sm font-bold text-slate-200">{label}
    <Element {...props} className={`w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-[#A3E635]/60 ${Element === 'textarea' ? 'min-h-28 resize-y' : ''} ${className}`} />
  </label>
);

const FormularioEspacioPersonal = ({ modal, proyectos, saving, onChange, onClose, onSubmit }) => {
  const tipoLabel = ({ proyecto: 'proyecto', nota: 'nota privada', evento: 'recordatorio', tarea: 'tarea', recurso: 'enlace de biblioteca' })[modal.tipo];
  const titulo = modal.id ? `Editar ${tipoLabel}` : `Nuevo ${tipoLabel}`;
  return createPortal((
    <div className="fixed inset-0 z-[300] grid place-items-center overflow-y-auto bg-black/75 p-4 backdrop-blur-sm" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <form role="dialog" aria-modal="true" aria-labelledby="formulario-espacio-titulo" onSubmit={onSubmit} className="my-8 w-full max-w-xl rounded-[1.75rem] border border-[#A3E635]/20 bg-[#10140e] p-5 shadow-2xl sm:p-7">
        <div className="mb-6 flex items-start justify-between gap-4"><div><p className="text-[10px] font-black uppercase tracking-[.2em] text-[#A3E635]">Espacio privado · {tipoLabel}</p><h3 id="formulario-espacio-titulo" className="mt-1 text-xl font-black">{titulo}</h3></div><button type="button" aria-label="Cerrar" onClick={onClose} className="rounded-xl p-2 text-slate-400 hover:bg-white/5 hover:text-white"><X size={18} /></button></div>
        {modal.tipo === 'proyecto' && <div className="grid gap-4"><Campo label="Nombre del proyecto" name="titulo" maxLength={120} value={modal.titulo} onChange={(event) => onChange('titulo', event.target.value)} placeholder="Ej. Monografía de biología" required autoFocus /><Campo label="Categoría" name="categoria" maxLength={60} value={modal.categoria} onChange={(event) => onChange('categoria', event.target.value)} placeholder="Académico, web, diseño…" /><Campo as="textarea" label="Descripción u objetivo" name="descripcion" maxLength={4000} value={modal.descripcion} onChange={(event) => onChange('descripcion', event.target.value)} placeholder="¿Qué querés lograr?" /><SelectorFiltro label="Etapa personal" value={modal.etapa} onChange={(value) => onChange('etapa', value)} options={ETAPAS_OPCIONES} className="min-w-full" abrirArriba /></div>}
        {modal.tipo === 'nota' && <div className="grid gap-4"><Campo label="Título" name="titulo" maxLength={120} value={modal.titulo} onChange={(event) => onChange('titulo', event.target.value)} placeholder="Ej. Ideas para el proyecto" required autoFocus /><Campo as="textarea" label="Apunte" name="contenido" maxLength={10000} value={modal.contenido} onChange={(event) => onChange('contenido', event.target.value)} placeholder="Escribí lo que quieras recordar…" required /><SelectorFiltro label="Asociar a un proyecto" value={String(modal.proyectoId || '')} onChange={(value) => onChange('proyectoId', value)} options={[{ value: '', label: 'Nota general' }, ...proyectos.map((project) => ({ value: String(project.id), label: project.titulo }))]} className="min-w-full" abrirArriba /></div>}
        {modal.tipo === 'evento' && <div className="grid gap-4"><Campo label="Qué querés recordar" name="titulo" maxLength={120} value={modal.titulo} onChange={(event) => onChange('titulo', event.target.value)} placeholder="Ej. Entregar avance" required autoFocus /><Campo label="Fecha y hora" name="inicio" type="datetime-local" value={modal.inicio} onChange={(event) => onChange('inicio', event.target.value)} required /><Campo label="Hasta (opcional)" name="fin" type="datetime-local" value={modal.fin} onChange={(event) => onChange('fin', event.target.value)} /><Campo as="textarea" label="Detalle" name="descripcion" maxLength={500} value={modal.descripcion} onChange={(event) => onChange('descripcion', event.target.value)} placeholder="Un detalle breve" /><SelectorFiltro label="Proyecto asociado" value={String(modal.proyectoId || '')} onChange={(value) => onChange('proyectoId', value)} options={[{ value: '', label: 'Sin proyecto' }, ...proyectos.map((project) => ({ value: String(project.id), label: project.titulo }))]} className="min-w-full" abrirArriba /></div>}
        {modal.tipo === 'tarea' && <div className="grid gap-4"><Campo label="Título" name="titulo" maxLength={120} value={modal.titulo} onChange={(event) => onChange('titulo', event.target.value)} placeholder="Ej. Preparar el primer borrador" required autoFocus /><Campo as="textarea" label="Detalle" name="descripcion" maxLength={4000} value={modal.descripcion} onChange={(event) => onChange('descripcion', event.target.value)} placeholder="Próximas acciones o contexto" /><Campo label="Fecha límite (opcional)" name="vencimiento" type="date" value={modal.vencimiento} onChange={(event) => onChange('vencimiento', event.target.value)} /><SelectorFiltro label="Prioridad" value={modal.prioridad} onChange={(value) => onChange('prioridad', value)} options={[{ value: 'baja', label: 'Baja' }, { value: 'media', label: 'Media' }, { value: 'alta', label: 'Alta' }]} className="min-w-full" /><SelectorFiltro label="Estado" value={modal.estado} onChange={(value) => onChange('estado', value)} options={[{ value: 'pendiente', label: 'Pendiente' }, { value: 'en_progreso', label: 'En curso' }, { value: 'completada', label: 'Completada' }]} className="min-w-full" /><SelectorFiltro label="Proyecto asociado" value={String(modal.proyectoId || '')} onChange={(value) => onChange('proyectoId', value)} options={[{ value: '', label: 'Sin proyecto' }, ...proyectos.map((project) => ({ value: String(project.id), label: project.titulo }))]} className="min-w-full" /></div>}
        {modal.tipo === 'recurso' && <div className="grid gap-4"><Campo label="Título del recurso" name="titulo" maxLength={120} value={modal.titulo} onChange={(event) => onChange('titulo', event.target.value)} placeholder="Ej. Documentación de React" required autoFocus /><Campo label="Enlace" name="url" type="url" maxLength={2048} value={modal.url} onChange={(event) => onChange('url', event.target.value)} placeholder="https://…" required /><Campo as="textarea" label="Descripción (opcional)" name="descripcion" maxLength={500} value={modal.descripcion} onChange={(event) => onChange('descripcion', event.target.value)} placeholder="Qué quieres recordar de este enlace" /><Campo label="Etiquetas, separadas por coma" name="etiquetas" maxLength={300} value={modal.etiquetas} onChange={(event) => onChange('etiquetas', event.target.value)} placeholder="diseño, tutorial, inspiración" /></div>}
        <div className="mt-7 flex justify-end gap-3"><button type="button" onClick={onClose} className={estilosBoton.secundario}>Cancelar</button><button type="submit" disabled={saving} className={`${estilosBoton.principal} disabled:opacity-60`}>{saving ? 'Guardando…' : <><Check size={14} /> Guardar {tipoLabel}</>}</button></div>
      </form>
    </div>
  ), document.body);
};

export default FormularioEspacioPersonal;
