import React from 'react';

/* ─────────────────────────────────────────────────────────────
   Función para formatear nombres cortos (Primer Nombre y Primer Apellido)
   Mapea de forma inteligente nombres naturales y razones sociales
───────────────────────────────────────────────────────────── */
const formatearNombreCorto = (nombre) => {
  if (!nombre || typeof nombre !== 'string') return '';
  const clean = nombre.trim();
  const lower = clean.toLowerCase();
  
  if (lower.startsWith('colegio') || lower.includes('s.r.l.') || lower.includes('s.a.') || lower.includes('ltda')) {
    const partes = clean.split(/\s+/);
    if (partes.length > 3) return partes.slice(0, 3).join(' ');
    return clean;
  }

  const partes = clean.split(/\s+/);
  if (partes.length <= 2) return clean;
  if (partes.length === 3) return `${partes[0]} ${partes[1]}`;
  if (partes.length >= 4) return `${partes[0]} ${partes[2]}`;
  return clean;
};

/* ─────────────────────────────────────────────────────────────
   Bloque de campo individual (readonly) para las secciones
   Diseño premium, moderno y limpio
───────────────────────────────────────────────────────────── */
const Field = ({ icon, label, value, span = false }) => (
  <div className={`flex flex-col gap-1.5 ${span ? 'md:col-span-2' : ''}`}>
    <span className="text-[9px] font-black uppercase tracking-wider text-[#E95A0C]">{label}</span>
    <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border border-slate-200/60 dark:border-white/5 bg-slate-50 dark:bg-[#070710] min-h-[42px] transition-all hover:border-slate-300 dark:hover:border-slate-700">
      {icon && (
        <div className="w-6 h-6 rounded-lg  text-[#E95A0C] flex items-center justify-center text-xs shrink-0">
          <i className={icon}></i>
        </div>
      )}
      <span className="text-xs font-black text-slate-850 truncate">
        {value || <span className="text-slate-400 font-normal italic">No especificado</span>}
      </span>
    </div>
  </div>
);

/* ─────────────────────────────────────────────────────────────
   Bloque de campo adaptado para la barra lateral izquierda (MiniField)
───────────────────────────────────────────────────────────── */
const MiniField = ({ icon, label, value }) => (
  <div className="flex items-center gap-3 px-3.5 py-2 rounded-xl border border-slate-200/60 dark:border-white/5 bg-slate-50 dark:bg-[#070710] min-h-[42px] transition-all hover:border-slate-350 dark:hover:border-slate-700">
    <div className="w-7 h-7 rounded-lg  text-[#E95A0C] flex items-center justify-center text-xs shrink-0 border border-red-500/10">
      <i className={icon}></i>
    </div>
    <div className="min-w-0 flex-1">
      <span className="block text-[7.5px] font-black text-[#E95A0C] uppercase tracking-widest leading-none mb-0.5">{label}</span>
      <span className="block text-[10px] font-black text-slate-850 truncate uppercase">
        {value || <span className="text-slate-400 font-normal italic">N/A</span>}
      </span>
    </div>
  </div>
);

/* ─────────────────────────────────────────────────────────────
   Vista principal detallada de Colegios
───────────────────────────────────────────────────────────── */
const ColegioShowView = ({ colegio, onBackToList, onEdit }) => {
  if (!colegio) return null;

  const p = colegio.parsed || {};
  const nombreCorto = formatearNombreCorto(colegio.nombre);

  return (
    <div className="space-y-4 font-montserrat w-full">

      {/* ── CABECERA ── */}
      <div className="bg-white dark:bg-[#040408] dark:border-white/8 rounded-2xl p-5 shadow-xl dark:shadow-black/60 border border-slate-200/60 dark:border-white/5 border-l-4 border-l-[#E95A0C] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#E95A0C] text-white flex items-center justify-center text-lg font-black shadow-lg dark:shadow-black/60 shadow-red-900/20 shrink-0 border border-red-500/20">
            <i className="fas fa-school"></i>
          </div>
          <div>
            <div className="flex items-center gap-2 text-[9px] font-black uppercase text-slate-455 tracking-widest mb-1">
              <span>Sistema</span><span>›</span><span>Colegios</span><span>›</span>
              <span className="text-[#E95A0C]">Ficha del Colegio</span>
            </div>
            <h2 className="text-base font-black text-[#4A2E1B] dark:text-white uppercase tracking-wider m-0 leading-none">
              {nombreCorto}
            </h2>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1 m-0">
              Vista de solo lectura — Ficha institucional del colegio.
            </p>
          </div>
        </div>

        {/* Botones de acción de cabecera con clara jerarquía visual */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={onBackToList}
            className="px-5 py-2.5 rounded-xl bg-[#8B4513] hover:bg-slate-900 dark:hover:bg-slate-800/80 text-white text-[10px] font-black uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-2 border border-slate-700 shadow-sm"
          >
            <i className="fas fa-arrow-left text-[9px]"></i>
            <span>Volver al listado</span>
          </button>
          {onEdit && (
            <button
              type="button"
              onClick={() => onEdit(colegio)}
              className="px-5 py-2.5 rounded-xl bg-[#E95A0C] hover:bg-[#cc4a00] text-white text-[10px] font-black uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-2 shadow-md shadow-red-500/10 border-0"
            >
              <i className="fas fa-pen text-[9px]"></i>
              <span>Editar Ficha</span>
            </button>
          )}
        </div>
      </div>

      {/* ── CUERPO DE LA VISTA ── */}
      <div className="flex flex-col lg:flex-row gap-4 items-start w-full relative">

        {/* ── COLUMNA IZQUIERDA STICKY (3 CARD SECTIONS) ── */}
        <div className="w-full lg:w-72 shrink-0 lg:sticky lg:top-4 space-y-4 self-start">

          {/* SECCIÓN 1: Perfil General con Ícono ROJO, Detalles Estéticos y Acciones en Rojo */}
          <div className="bg-white dark:bg-[#040408] dark:border-white/8 rounded-2xl p-5 shadow-xl dark:shadow-black/60 border border-slate-200/60 dark:border-white/5 border-l-4 border-l-[#E95A0C] flex flex-col items-center text-center gap-3">
            
            {/* El código de registro arriba de todo */}
            <div className="w-full">
              <span className="block text-[7px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">CÓDIGO DE REGISTRO</span>
              <span className="text-[10px] font-black text-[#E95A0C] uppercase tracking-widest  px-3.5 py-1.5 rounded-xl border border-orange-500/20 dark:border-orange-500/10 inline-block font-mono shadow-sm">
                {colegio.codigo || 'COL-TEMP'}
              </span>
            </div>

            {/* Ícono de colegio ROJO con contorno cuadrado moderno */}
            <div className="w-16 h-16 rounded-2xl  text-[#E95A0C] flex items-center justify-center text-3xl shrink-0 border border-orange-500/20 dark:border-orange-500/10 shadow-sm mt-1.5 transition-all hover:scale-[1.02]">
              <i className="fas fa-school"></i>
            </div>
            
            <div className="w-full space-y-1.5">
              <h3 className="text-xs font-black text-slate-855 leading-snug uppercase tracking-wide truncate max-w-full m-0 pt-0.5">
                {nombreCorto}
              </h3>
              
              {p.correo && (
                <div className="w-full pt-0.5">
                  <a 
                    href={`mailto:${p.correo}`}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-100 dark:border-white/5 dark:border-white/5  hover: text-[9.5px] font-black text-slate-700 dark:text-slate-300 tracking-wide transition-all shadow-sm max-w-full"
                  >
                    <i className="fas fa-envelope text-[#E95A0C] shrink-0 text-[10px]"></i>
                    <span className="truncate max-w-[180px] lowercase font-semibold">{p.correo}</span>
                  </a>
                </div>
              )}
            </div>

            {/* Separador e información comercial rápida para rellenar */}
            <div className="w-full border-t border-slate-100 my-1"></div>

            {/* Bloques de Tipo de Cuenta y Estado con íconos e identidades de color */}
            <div className="w-full grid grid-cols-2 gap-2 text-left">
              <div className="bg-slate-50 dark:bg-[#070710] p-2.5 rounded-xl border border-slate-200/60 dark:border-white/5 flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg  text-[#E95A0C] flex items-center justify-center text-[10px] shrink-0 border border-red-500/10">
                  <i className="fas fa-building"></i>
                </div>
                <div className="min-w-0 flex-1">
                  <span className="block text-[7px] font-black text-slate-400 uppercase tracking-wider leading-none mb-0.5">TIPO</span>
                  <span className="block text-[9px] font-black text-slate-750 uppercase truncate leading-none mt-0.5">
                    Colegio
                  </span>
                </div>
              </div>
              
              <div className="bg-slate-50 dark:bg-[#070710] p-2.5 rounded-xl border border-slate-200/60 dark:border-white/5 flex items-center gap-2">
                <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-[10px] shrink-0 border ${
                  p.estado === 'Inactivo' 
                    ? ' text-red-500 border-orange-500/20 dark:border-orange-500/10' 
                    : 'bg-emerald-50 dark:bg-emerald-950/400/5 text-[#E95A0C]merald-500 border-emerald-500/15'
                }`}>
                  <i className={p.estado === 'Inactivo' ? "fas fa-circle-xmark" : "fas fa-circle-check"}></i>
                </div>
                <div className="min-w-0 flex-1">
                  <span className="block text-[7px] font-black text-slate-400 uppercase tracking-wider leading-none mb-0.5">ESTADO</span>
                  <span className={`block text-[9px] font-black uppercase truncate leading-none mt-0.5 ${
                    p.estado === 'Inactivo' ? 'text-red-650 dark:text-red-400' : 'text-[#E95A0C]merald-600 dark:text-[#E95A0C]merald-450'
                  }`}>
                    {p.estado || 'Activo'}
                  </span>
                </div>
              </div>
            </div>

            {/* Acciones Rápidas (Imprimir / PDF) en Rojo Oficial de la Web */}
            <div className="w-full flex gap-2 pt-2 border-t border-slate-100">
              <button 
                type="button"
                onClick={() => window.print()}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#E95A0C] to-red-700 hover:from-red-700 hover:to-[#E95A0C] text-white font-black text-[9px] uppercase tracking-widest transition-all cursor-pointer shadow-md shadow-red-500/10 hover:scale-[1.02] active:scale-98 border-0 flex items-center justify-center gap-2"
              >
                <i className="fas fa-print text-[10px] text-white/90"></i>
                <span>Imprimir</span>
              </button>

              <button 
                type="button"
                onClick={() => alert('Función en desarrollo: Generación de reporte PDF.')}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#E95A0C] to-red-700 hover:from-red-700 hover:to-[#E95A0C] text-white font-black text-[9px] uppercase tracking-widest transition-all cursor-pointer shadow-md shadow-red-500/10 hover:scale-[1.02] active:scale-98 border-0 flex items-center justify-center gap-2"
              >
                <i className="fas fa-file-pdf text-[10px] text-white/90"></i>
                <span>PDF</span>
              </button>
            </div>
          </div>

          {/* SECCIÓN 2: Datos Comerciales */}
          <div className="bg-white dark:bg-[#040408] dark:border-white/8 rounded-2xl p-5 shadow-xl dark:shadow-black/60 border border-slate-200/60 dark:border-white/5 border-l-4 border-l-[#E95A0C] flex flex-col gap-2.5">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <i className="fas fa-list-check text-[#E95A0C] text-xs"></i>
              <h4 className="text-[9px] font-black text-[#4A2E1B] dark:text-white uppercase tracking-wider m-0">
                DATOS COMERCIALES
              </h4>
            </div>

            <MiniField label="Teléfono / Celular" icon="fas fa-phone" value={p.telefono} />
            <MiniField label="Ciudad / Dpto" icon="fas fa-city" value={p.ciudad} />
            <MiniField label="Nivel / Actividad" icon="fas fa-graduation-cap" value={p.rubro} />
            <MiniField label="Fecha Registro" icon="fas fa-calendar" value={colegio.created_at ? new Date(colegio.created_at).toLocaleDateString('es-BO') : null} />
          </div>

          {/* SECCIÓN 3: Resumen Financiero y Comercial DINÁMICO */}
          <div className="bg-white dark:bg-[#040408] dark:border-white/8 rounded-2xl p-5 shadow-xl dark:shadow-black/60 border border-slate-200/60 dark:border-white/5 border-l-4 border-l-[#E95A0C] flex flex-col gap-3">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <i className="fas fa-chart-line text-[#E95A0C] text-xs"></i>
              <h4 className="text-[9px] font-black text-[#4A2E1B] dark:text-white uppercase tracking-wider m-0">
                RESUMEN DE ACTIVIDAD
              </h4>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-1">
              <div className="bg-slate-50 dark:bg-[#070710] p-2.5 rounded-xl border border-slate-200/60 dark:border-white/5 text-center">
                <span className="block text-[7px] font-black text-slate-400 uppercase tracking-widest mb-0.5">COMPRAS</span>
                <span className="block text-[11px] font-black text-[#E95A0C]">
                  {colegio.totalCompras ?? 0} Trans.
                </span>
              </div>
              <div className="bg-slate-50 dark:bg-[#070710] p-2.5 rounded-xl border border-slate-200/60 dark:border-white/5 text-center">
                <span className="block text-[7px] font-black text-slate-400 uppercase tracking-widest mb-0.5">GASTADO</span>
                <span className="block text-[11px] font-black text-[#E95A0C]">
                  {Number(colegio.totalGastado ?? 0).toFixed(2)} Bs.
                </span>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-[#070710] p-2 rounded-xl border border-slate-200/60 dark:border-white/5 flex items-center justify-between gap-2">
              <div>
                <span className="block text-[7px] font-black text-slate-400 uppercase tracking-widest">CATEGORÍA DE CONVENIO</span>
                <span className="block text-[9px] font-black text-[#E95A0C] uppercase tracking-wider mt-0.5">
                  {(colegio.totalCompras ?? 0) > 5 ? 'CONVENIO ORO' : 'CONVENIO REGULAR'}
                </span>
              </div>
              <div className="w-7 h-7 rounded-full  text-[#E95A0C] flex items-center justify-center text-xs border border-red-500/10">
                <i className="fas fa-medal"></i>
              </div>
            </div>
          </div>

        </div>

        {/* ── COLUMNA DERECHA (SECCIONES DE DETALLE DETALLADAS Y MODERNAS) ── */}
        <div className="flex-1 space-y-4 min-w-0 w-full">

          {/* SECCIÓN A: Identificación */}
          <div className="bg-white dark:bg-[#040408] dark:border-white/8 rounded-2xl p-5 shadow-xl dark:shadow-black/60 border border-slate-200/60 dark:border-white/5 border-l-4 border-l-[#E95A0C]">
            <div className="flex items-center gap-2.5 pb-2.5 border-b border-slate-100 mb-4">
              <div className="w-7 h-7 rounded-lg bg-[#E95A0C]/10 text-[#E95A0C] flex items-center justify-center text-xs">
                <i className="fas fa-id-card"></i>
              </div>
              <h4 className="text-[11px] font-black text-[#4A2E1B] dark:text-white uppercase tracking-wider m-0">
                Identificación del Colegio
              </h4>
              <span className="ml-auto text-[8px] font-black uppercase tracking-widest text-slate-405 bg-slate-100 dark:bg-[#070710] px-2 py-0.5 rounded-md">
                Solo lectura
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              <Field icon="fas fa-school"   label="Razón Social / Institución"  value={colegio.nombre} span />
              <Field icon="fas fa-graduation-cap" label="Nivel Educativo"       value={p.rubro} />
              <Field icon="fas fa-circle-check" label="Estado de Convenio"      value={p.estado} />
            </div>
          </div>

          {/* SECCIÓN B: Ubicación y Contacto */}
          <div className="bg-white dark:bg-[#040408] dark:border-white/8 rounded-2xl p-5 shadow-xl dark:shadow-black/60 border border-slate-200/60 dark:border-white/5 border-l-4 border-l-[#E95A0C]">
            <div className="flex items-center gap-2.5 pb-2.5 border-b border-slate-100 mb-4">
              <div className="w-7 h-7 rounded-lg bg-[#E95A0C]/10 text-[#E95A0C] flex items-center justify-center text-xs">
                <i className="fas fa-map-location-dot"></i>
              </div>
              <h4 className="text-[11px] font-black text-[#4A2E1B] dark:text-white uppercase tracking-wider m-0">
                Ubicación e Información General
              </h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              <Field icon="fas fa-envelope"   label="Correo Electrónico"             value={p.correo} />
              <Field icon="fas fa-phone"      label="Teléfono / Celular"             value={p.telefono} />
              <Field icon="fas fa-city"       label="Ciudad / Departamento"          value={p.ciudad} />
              <Field icon="fas fa-calendar"   label="Fecha de Registro"              value={colegio.created_at ? new Date(colegio.created_at).toLocaleString('es-BO') : null} />
              <Field icon="fas fa-map-marker-alt" label="Dirección Física"           value={p.direccion} span />
            </div>

            {/* Observaciones */}
            {p.observaciones && (
              <div className="mt-4">
                <span className="text-[9px] font-black uppercase tracking-wider text-[#E95A0C] block mb-1.5">
                  Notas / Observaciones Particulares
                </span>
                <div className="px-4 py-3 rounded-xl border border-slate-200/60 dark:border-white/5 bg-slate-50 dark:bg-[#070710] text-xs text-slate-700 dark:text-slate-300 font-semibold leading-relaxed whitespace-pre-wrap">
                  {p.observaciones}
                </div>
              </div>
            )}

            {/* Fila inferior de advertencia y acciones secundarias */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-4 border-t border-slate-100 mt-5">
              <div className="flex items-center gap-2 text-[9px] text-slate-400 font-black uppercase tracking-wider">
                <i className="fas fa-lock text-[#E95A0C] text-xs"></i>
                <span>Ficha de <b className="text-[#E95A0C]">solo lectura</b> — use "Editar" para modificar</span>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onBackToList}
                  className="px-5 py-2 rounded-xl bg-slate-100 dark:bg-[#070710] hover:bg-slate-200 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-300 border-0 text-[10px] font-black uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Volver
                </button>
                {onEdit && (
                  <button
                    type="button"
                    onClick={() => onEdit(colegio)}
                    className="px-5 py-2 rounded-xl bg-[#E95A0C] hover:bg-[#cc4a00] text-white border-0 text-[10px] font-black uppercase tracking-wider transition-colors cursor-pointer shadow-md hover:scale-[1.02] active:scale-98 flex items-center gap-2"
                  >
                    <i className="fas fa-pen text-[9px]"></i>
                    <span>Editar Ficha</span>
                  </button>
                )}
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default ColegioShowView;






















