import { useEffect, useId, useRef, useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';

export const IconoEspacio = ({ children, className = '' }) => (
  <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[#A3E635]/20 bg-[#A3E635]/10 text-[#A3E635] ${className}`}>{children}</span>
);

export const CampoFiltro = ({ label, ...props }) => (
  <label className="grid min-w-0 flex-1 gap-1.5 text-[10px] font-black uppercase tracking-wider text-slate-400">
    {label}
    <input {...props} className="w-full rounded-xl border border-white/10 bg-black/25 px-3.5 py-2.5 text-sm font-semibold normal-case tracking-normal text-white outline-none placeholder:text-slate-600 focus:border-[#A3E635]/60" />
  </label>
);

export const SelectorFiltro = ({ label, value, options, onChange, className = '', abrirArriba = false }) => {
  const [open, setOpen] = useState(false);
  const id = useId();
  const rootRef = useRef(null);
  const buttonRef = useRef(null);
  const selectedIndex = Math.max(0, options.findIndex((option) => option.value === value));
  const selected = options[selectedIndex];

  useEffect(() => {
    if (!open) return undefined;
    const cerrarAlHacerClickAfuera = (event) => {
      if (!rootRef.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener('pointerdown', cerrarAlHacerClickAfuera);
    return () => document.removeEventListener('pointerdown', cerrarAlHacerClickAfuera);
  }, [open]);

  const abrirYEnfocar = () => {
    setOpen(true);
    requestAnimationFrame(() => rootRef.current?.querySelector(`[data-option-index="${selectedIndex}"]`)?.focus());
  };

  const manejarTeclaOpcion = (event, index) => {
    let next = index;
    if (event.key === 'ArrowDown') next = (index + 1) % options.length;
    else if (event.key === 'ArrowUp') next = (index - 1 + options.length) % options.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = options.length - 1;
    else if (event.key === 'Escape') {
      setOpen(false);
      buttonRef.current?.focus();
      event.preventDefault();
      return;
    } else return;
    event.preventDefault();
    rootRef.current?.querySelector(`[data-option-index="${next}"]`)?.focus();
  };

  const elegir = (nextValue) => {
    onChange(nextValue);
    setOpen(false);
    buttonRef.current?.focus();
  };

  return (
    <div ref={rootRef} className={`relative grid min-w-[150px] gap-1.5 ${className}`}>
      <span id={`${id}-label`} className="text-[10px] font-black uppercase tracking-wider text-slate-400">{label}</span>
      <button ref={buttonRef} type="button" aria-haspopup="listbox" aria-expanded={open} aria-labelledby={`${id}-label ${id}-value`} aria-controls={`${id}-list`} onClick={() => (open ? setOpen(false) : abrirYEnfocar())} onKeyDown={(event) => { if (event.key === 'ArrowDown' || event.key === 'ArrowUp') { event.preventDefault(); abrirYEnfocar(); } }} className="flex w-full items-center justify-between gap-3 rounded-xl border border-white/10 bg-[#0b0e09] px-3.5 py-2.5 text-left text-sm font-semibold text-white outline-none transition hover:border-[#A3E635]/50 focus-visible:ring-2 focus-visible:ring-[#A3E635]/60">
        <span id={`${id}-value`} className="truncate">{selected?.label}</span><ChevronDown size={16} aria-hidden="true" className={`shrink-0 text-[#A3E635] transition ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && <div id={`${id}-list`} role="listbox" aria-labelledby={`${id}-label`} className={`absolute left-0 z-50 max-h-64 w-full min-w-48 overflow-y-auto rounded-xl border border-[#A3E635]/30 bg-[#0b0e09] p-1.5 shadow-[0_16px_40px_rgba(0,0,0,.65)] ${abrirArriba ? 'bottom-full mb-1.5' : 'top-full mt-1.5'}`}>
        {options.map((option, index) => <button key={option.value} type="button" role="option" aria-selected={option.value === value} data-option-index={index} onKeyDown={(event) => manejarTeclaOpcion(event, index)} onClick={() => elegir(option.value)} className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A3E635]/70 ${option.value === value ? 'bg-[#A3E635]/15 text-[#A3E635]' : 'text-slate-200 hover:bg-white/5 hover:text-white'}`}>
          <span>{option.label}</span>{option.value === value && <Check size={15} aria-hidden="true" />}
        </button>)}
      </div>}
    </div>
  );
};

export const EstadoVacio = ({ icon: EmptyIcon, titulo, descripcion }) => (
  <div className="rounded-2xl border border-dashed border-white/15 bg-black/15 px-5 py-12 text-center">
    <IconoEspacio className="mx-auto mb-4"><EmptyIcon size={20} /></IconoEspacio>
    <h4 className="font-black">{titulo}</h4>
    <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-400">{descripcion}</p>
  </div>
);
