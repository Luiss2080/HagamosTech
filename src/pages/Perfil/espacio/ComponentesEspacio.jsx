import { estilosBoton } from './estilosEspacio';

export const IconoEspacio = ({ children, className = '' }) => (
  <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[#A3E635]/20 bg-[#A3E635]/10 text-[#A3E635] ${className}`}>{children}</span>
);

export const CampoFiltro = ({ label, ...props }) => (
  <label className="grid min-w-0 flex-1 gap-1.5 text-[10px] font-black uppercase tracking-wider text-slate-400">
    {label}
    <input {...props} className="w-full rounded-xl border border-white/10 bg-black/25 px-3.5 py-2.5 text-sm font-semibold normal-case tracking-normal text-white outline-none placeholder:text-slate-600 focus:border-[#A3E635]/60" />
  </label>
);

export const SelectorFiltro = ({ label, children, ...props }) => (
  <label className="grid min-w-[150px] gap-1.5 text-[10px] font-black uppercase tracking-wider text-slate-400">
    {label}
    <select {...props} className="w-full rounded-xl border border-white/10 bg-[#0b0e09] px-3.5 py-2.5 text-sm font-semibold normal-case tracking-normal text-white outline-none focus:border-[#A3E635]/60">{children}</select>
  </label>
);

export const EstadoVacio = ({ icon: EmptyIcon, titulo, descripcion, accion, onAction }) => (
  <div className="rounded-2xl border border-dashed border-white/15 bg-black/15 px-5 py-12 text-center">
    <IconoEspacio className="mx-auto mb-4"><EmptyIcon size={20} /></IconoEspacio>
    <h4 className="font-black">{titulo}</h4>
    <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-400">{descripcion}</p>
    {accion && <button type="button" onClick={onAction} className={`${estilosBoton.principal} mt-5`}><span aria-hidden="true">+</span>{accion}</button>}
  </div>
);
