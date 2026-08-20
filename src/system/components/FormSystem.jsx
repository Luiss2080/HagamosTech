import React from 'react';

// Kit de vistas del Sistema con el estándar del módulo Seguridad (permisos).
/* eslint-disable react-refresh/only-export-components */

const inputBase = "w-full rounded-xl border border-slate-200/60 dark:border-white/5 bg-slate-50 dark:bg-[#070710] text-slate-800 dark:text-white dark:border-white/8 dark:text-slate-200 text-xs focus:ring-2 focus:ring-[#E95A0C]/40 outline-none font-bold transition-all";

// ── Encabezado de vista (icono + breadcrumb + título + volver) ──
export const HeaderSistema = ({ icon, breadcrumbs = [], titulo, subtitulo, onVolver, volverTexto = 'Volver al listado' }) => (
  <div className="bg-white dark:bg-[#040408] rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-200 dark:border-white/5 border-l-4 border-l-[#E95A0C] flex flex-col md:flex-row md:items-center justify-between gap-4">
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 rounded-2xl text-[#E95A0C] flex items-center justify-center text-xl font-black shadow-sm shrink-0 border border-orange-200/50">
        <i className={icon}></i>
      </div>
      <div>
        <div className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">
          {breadcrumbs.map((c, i) => (
            <React.Fragment key={i}>
              {i > 0 && <span>{'>'}</span>}
              <span className={i === breadcrumbs.length - 1 ? 'text-[#E95A0C]' : ''}>{c}</span>
            </React.Fragment>
          ))}
        </div>
        <h2 className="text-xl font-black text-[#4A2E1B] dark:text-white uppercase tracking-wider m-0 leading-none">{titulo}</h2>
        {subtitulo && <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider mt-1 m-0">{subtitulo}</p>}
      </div>
    </div>
    {onVolver && (
      <button onClick={onVolver} className="px-5 py-2.5 rounded-xl bg-[#E95A0C] hover:bg-[#cc4a00] text-white text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md shadow-red-900/30 border border-red-800/40 shrink-0">
        <i className="fas fa-arrow-left"></i><span>{volverTexto}</span>
      </button>
    )}
  </div>
);

// ── Sección de formulario (tarjeta con borde y título) ──
export const SeccionForm = ({ icon, titulo, children, className = '' }) => (
  <div className={`bg-white dark:bg-[#040408] dark:border-white/8 rounded-2xl p-6 shadow-xl dark:shadow-black/60 border border-slate-200/60 dark:border-white/5 border-l-4 border-l-[#E95A0C] ${className}`}>
    <div className="flex items-center gap-2 pb-3 border-b border-slate-150 mb-4">
      <i className={`${icon} text-[#E95A0C] text-sm`}></i>
      <h4 className="text-xs font-black text-[#4A2E1B] dark:text-white uppercase tracking-wider m-0">{titulo}</h4>
    </div>
    {children}
  </div>
);

// ── Campo con etiqueta e ícono ──
export const Campo = ({ label, icon, children, colSpan = false, obligatorio = false }) => (
  <div className={`space-y-1 ${colSpan ? 'md:col-span-2' : ''}`}>
    <label className="block text-[10px] font-black uppercase tracking-wider text-[#E95A0C]">
      {icon && <i className={`${icon} mr-1.5`}></i>}{label} {obligatorio && <b className="text-red-500">*</b>}
    </label>
    {children}
  </div>
);

// ── Input con ícono ──
export const InputIcono = ({ icon, className = '', ...props }) => (
  <div className="relative">
    {icon && <i className={`${icon} absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs`}></i>}
    <input {...props} className={`${inputBase} ${icon ? 'pl-9' : 'px-3.5'} ${className}`} />
  </div>
);

export const inputCls = inputBase;

// ── Caja informativa ──
export const InfoBox = ({ tipo = 'info', titulo, children }) => (
  <div className={`p-4 rounded-xl border flex items-start gap-3 ${tipo === 'advertencia' ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-900/50' : 'bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-900/50'}`}>
    <i className={`${tipo === 'advertencia' ? 'fas fa-triangle-exclamation text-amber-500' : 'fas fa-circle-info text-blue-500'} mt-0.5`}></i>
    <div className={`text-xs font-medium ${tipo === 'advertencia' ? 'text-amber-700 dark:text-amber-300' : 'text-blue-700 dark:text-blue-300'}`}>
      {titulo && <span className="font-extrabold uppercase text-[9px] tracking-wider block mb-1">{titulo}</span>}
      {children}
    </div>
  </div>
);

// ── Pie de formulario (nota + cancelar + enviar) ──
export const PieForm = ({ onCancelar, submitText = 'Registrar', submitIcon = 'fas fa-check', nota = 'Los campos con * son obligatorios', submitDisabled = false }) => (
  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100 mt-2">
    <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
      <i className="fas fa-shield-halved text-[#E95A0C] text-xs"></i>
      <span>{nota}</span>
    </div>
    <div className="flex items-center gap-3">
      <button type="button" onClick={onCancelar} className="px-6 py-3 rounded-xl bg-[#8B4513] hover:bg-slate-900 dark:hover:bg-slate-800 text-white text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-sm border border-slate-700 flex items-center gap-2 justify-center">
        <i className="fas fa-times"></i> Cancelar
      </button>
      <button type="submit" disabled={submitDisabled} className="px-8 py-3 rounded-xl bg-[#E95A0C] hover:bg-[#cc4a00] text-white text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-lg dark:shadow-black/60 flex items-center gap-2 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed">
        <i className={submitIcon}></i><span>{submitText}</span>
      </button>
    </div>
  </div>
);

// ── Vista Ficha (show): campo de solo lectura ──
export const FieldVer = ({ icon, label, value, span = false }) => (
  <div className={`flex flex-col gap-1.5 ${span ? 'md:col-span-2' : ''}`}>
    <span className="text-[9px] font-black uppercase tracking-wider text-[#E95A0C]">{label}</span>
    <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border border-slate-200/60 dark:border-white/5 bg-slate-50 dark:bg-[#070710] min-h-[42px] transition-all hover:border-slate-300">
      {icon && <div className="w-6 h-6 rounded-lg text-[#E95A0C] flex items-center justify-center text-xs shrink-0"><i className={icon}></i></div>}
      <span className="text-xs font-black text-slate-800 truncate">{value || <span className="text-slate-400 font-normal italic">No especificado</span>}</span>
    </div>
  </div>
);

export const MiniVer = ({ icon, label, value }) => (
  <div className="flex items-center gap-3 px-3.5 py-2 rounded-xl border border-slate-200/60 dark:border-white/5 bg-slate-50 dark:bg-[#070710] min-h-[42px] transition-all hover:border-slate-300">
    <div className="w-7 h-7 rounded-lg text-[#E95A0C] flex items-center justify-center text-xs shrink-0 border border-red-500/10"><i className={icon}></i></div>
    <div className="min-w-0 flex-1">
      <span className="block text-[7.5px] font-black text-[#E95A0C] uppercase tracking-widest leading-none mb-0.5">{label}</span>
      <span className="block text-[10px] font-black text-slate-800 truncate">{value || <span className="text-slate-400 font-normal italic">N/A</span>}</span>
    </div>
  </div>
);

export const TarjetaFicha = ({ children, className = '' }) => (
  <div className={`bg-white dark:bg-[#040408] dark:border-white/8 rounded-2xl p-5 shadow-xl dark:shadow-black/60 border border-slate-200/60 dark:border-white/5 border-l-4 border-l-[#E95A0C] ${className}`}>{children}</div>
);

export const TituloFicha = ({ icon, children }) => (
  <div className="flex items-center gap-2 pb-3 border-b border-slate-100 mb-4">
    <i className={`${icon} text-[#E95A0C] text-sm`}></i>
    <h3 className="text-xs font-black text-[#4A2E1B] dark:text-white uppercase tracking-wider m-0">{children}</h3>
  </div>
);