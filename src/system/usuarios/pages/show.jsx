import React from 'react';

/* ─────────────────────────────────────────────────────────────
   Función para formatear nombres cortos (Primer Nombre y Primer Apellido)
───────────────────────────────────────────────────────────── */
const formatearNombreCorto = (nombre, apellido) => {
  const nombreLimpio = (nombre || '').trim();
  const apellidoLimpio = (apellido || '').trim();

  const primNombre = nombreLimpio.split(/\s+/)[0] || '';
  const primApellido = apellidoLimpio.split(/\s+/)[0] || '';

  if (primNombre && primApellido) {
    return `${primNombre} ${primApellido}`;
  }
  return nombreLimpio || 'Usuario';
};

/* ─────────────────────────────────────────────────────────────
   Bloque de campo individual (readonly) para las secciones
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
      <span className="text-xs font-black text-slate-855 truncate">
        {value || <span className="text-slate-400 font-normal italic">No especificado</span>}
      </span>
    </div>
  </div>
);

/* ─────────────────────────────────────────────────────────────
   Bloque de campo adaptado para la barra lateral izquierda (MiniField)
───────────────────────────────────────────────────────────── */
const MiniField = ({ icon, label, value }) => (
  <div className="flex items-center gap-3 px-3.5 py-2 rounded-xl border border-slate-200/60 dark:border-white/5 bg-slate-50 dark:bg-[#070710] min-h-[42px] transition-all hover:border-slate-350 dark:hover:border-slate-750">
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
   Vista detallada del Usuario
───────────────────────────────────────────────────────────── */
const UsuarioShowView = ({ user, onBackToList, onEdit }) => {
  if (!user) return null;

  const nombreCorto = formatearNombreCorto(user.nombre, user.apellido);

  return (
    <div className="space-y-4 font-montserrat w-full">
      {/* CABECERA */}
      <div className="bg-white dark:bg-[#040408] rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-200 dark:border-white/5 border-l-4 border-l-[#E95A0C] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#E95A0C] text-white flex items-center justify-center text-lg font-black shadow-lg dark:shadow-black/60 shadow-red-900/20 shrink-0 border border-red-500/20">
            <i className="fas fa-user-shield"></i>
          </div>
          <div>
            <div className="flex items-center gap-2 text-[9px] font-black uppercase text-slate-400 tracking-widest mb-1">
              <span>Sistema</span><span>›</span><span>Usuarios</span><span>›</span>
              <span className="text-[#E95A0C]">Ficha del Usuario</span>
            </div>
            <h2 className="text-base font-black text-[#4A2E1B] dark:text-white uppercase tracking-wider m-0 leading-none">
              {nombreCorto}
            </h2>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1 m-0">
              Vista de solo lectura — Perfil interno y accesos.
            </p>
          </div>
        </div>

        {/* Botones */}
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
              onClick={() => onEdit(user)}
              className="px-5 py-2.5 rounded-xl bg-[#E95A0C] hover:bg-[#cc4a00] text-white text-[10px] font-black uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-2 shadow-md border-0"
            >
              <i className="fas fa-pen text-[9px]"></i>
              <span>Editar Ficha</span>
            </button>
          )}
        </div>
      </div>

      {/* CUERPO */}
      <div className="flex flex-col lg:flex-row gap-4 items-start w-full relative">

        {/* COLUMNA IZQUIERDA STICKY */}
        <div className="w-full lg:w-72 shrink-0 lg:sticky lg:top-4 space-y-4 self-start">
          
          {/* Perfil card */}
          <div className="bg-white dark:bg-[#040408] dark:border-white/8 rounded-2xl p-5 shadow-xl dark:shadow-black/60 border border-slate-200/60 dark:border-white/5 border-l-4 border-l-[#E95A0C] flex flex-col items-center text-center gap-3">
            
            <div className="w-full">
              <span className="block text-[7px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">IDENTIFICADOR DE CUENTA</span>
              <span className="text-[10px] font-black text-[#E95A0C] uppercase tracking-widest  px-3.5 py-1.5 rounded-xl border border-orange-500/20 dark:border-orange-500/10 inline-block font-mono shadow-sm">
                USR-{user.id ? String(user.id).padStart(3, '0') : 'TEMP'}
              </span>
            </div>

            {/* Avatar contorno cuadrado rojo */}
            <div className="w-16 h-16 rounded-2xl  text-[#E95A0C] flex items-center justify-center text-3xl shrink-0 border border-orange-500/20 dark:border-orange-500/10 shadow-sm mt-1.5">
              <i className={user.rolNombre === 'Administrador' ? "fas fa-user-shield" : "fas fa-user-gear"}></i>
            </div>

            <div className="w-full space-y-1.5">
              <h3 className="text-xs font-black text-slate-855 leading-snug uppercase tracking-wide truncate max-w-full m-0 pt-0.5">
                {user.nombre} {user.apellido}
              </h3>
              
              {user.correo && (
                <div className="w-full pt-0.5">
                  <a 
                    href={`mailto:${user.correo}`}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-100 dark:border-white/5 dark:border-white/5  hover: text-[9.5px] font-black text-slate-700 dark:text-slate-300 tracking-wide transition-all shadow-sm max-w-full"
                  >
                    <i className="fas fa-envelope text-[#E95A0C] shrink-0 text-[10px]"></i>
                    <span className="truncate max-w-[180px] lowercase font-semibold">{user.correo}</span>
                  </a>
                </div>
              )}
            </div>

            <div className="w-full border-t border-slate-100 my-1"></div>

            <div className="w-full grid grid-cols-2 gap-2 text-left">
              <div className="bg-slate-50 dark:bg-[#070710] p-2.5 rounded-xl border border-slate-200/60 dark:border-white/5 flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg  text-[#E95A0C] flex items-center justify-center text-[10px] shrink-0 border border-red-500/10">
                  <i className="fas fa-shield-halved"></i>
                </div>
                <div className="min-w-0 flex-1">
                  <span className="block text-[7px] font-black text-slate-400 uppercase tracking-wider leading-none mb-0.5">ROL</span>
                  <span className="block text-[8px] font-black text-slate-750 uppercase truncate leading-none mt-0.5">
                    {user.rolNombre}
                  </span>
                </div>
              </div>
              
              <div className="bg-slate-50 dark:bg-[#070710] p-2.5 rounded-xl border border-slate-200/60 dark:border-white/5 flex items-center gap-2">
                <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-[10px] shrink-0 border ${
                  !user.activo 
                    ? ' text-red-500 border-orange-500/20 dark:border-orange-500/10' 
                    : 'bg-emerald-50 dark:bg-emerald-950/400/5 text-[#E95A0C]merald-500 border-emerald-500/15'
                }`}>
                  <i className={!user.activo ? "fas fa-circle-xmark" : "fas fa-circle-check"}></i>
                </div>
                <div className="min-w-0 flex-1">
                  <span className="block text-[7px] font-black text-slate-400 uppercase tracking-wider leading-none mb-0.5">ESTADO</span>
                  <span className={`block text-[8px] font-black uppercase truncate leading-none mt-0.5 ${
                    !user.activo ? 'text-red-650 dark:text-red-400' : 'text-[#E95A0C]merald-600 dark:text-[#E95A0C]merald-450'
                  }`}>
                    {user.activo ? 'Activo' : 'Inactivo'}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick print actions */}
            <div className="w-full flex gap-2 pt-2 border-t border-slate-100">
              <button 
                type="button"
                onClick={() => window.print()}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#E95A0C] to-red-700 hover:from-red-700 hover:to-[#E95A0C] text-white font-black text-[9px] uppercase tracking-widest transition-all cursor-pointer shadow-md hover:scale-[1.02] border-0 flex items-center justify-center gap-2"
              >
                <i className="fas fa-print text-[10px] text-white/90"></i>
                <span>Imprimir</span>
              </button>
            </div>
          </div>

          {/* Mini info card */}
          <div className="bg-white dark:bg-[#040408] dark:border-white/8 rounded-2xl p-5 shadow-xl dark:shadow-black/60 border border-slate-200/60 dark:border-white/5 border-l-4 border-l-[#E95A0C] flex flex-col gap-2.5">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <i className="fas fa-list-check text-[#E95A0C] text-xs"></i>
              <h4 className="text-[9px] font-black text-[#4A2E1B] dark:text-white uppercase tracking-wider m-0">
                DATOS DE CUENTA
              </h4>
            </div>

            <MiniField label="Nombre de Usuario" icon="fas fa-at" value={user.usuario ? `@${user.usuario}` : null} />
            <MiniField label="Cédula de Identidad" icon="fas fa-id-card" value={user.numci} />
            <MiniField label="Teléfono" icon="fas fa-phone" value={user.numtel} />
            <MiniField label="Fecha Nacimiento" icon="fas fa-cake-candles" value={user.fenac ? new Date(user.fenac).toLocaleDateString('es-BO') : null} />
          </div>

        </div>

        {/* COLUMNA DERECHA */}
        <div className="flex-1 space-y-4 min-w-0 w-full">
          
          {/* Identificación */}
          <div className="bg-white dark:bg-[#040408] dark:border-white/8 rounded-2xl p-5 shadow-xl dark:shadow-black/60 border border-slate-200/60 dark:border-white/5 border-l-4 border-l-[#E95A0C]">
            <div className="flex items-center gap-2.5 pb-2.5 border-b border-slate-100 mb-4">
              <div className="w-7 h-7 rounded-lg bg-[#E95A0C]/10 text-[#E95A0C] flex items-center justify-center text-xs">
                <i className="fas fa-address-card"></i>
              </div>
              <h4 className="text-[11px] font-black text-[#4A2E1B] dark:text-white uppercase tracking-wider m-0">
                Información Personal de Identidad
              </h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              <Field icon="fas fa-font" label="Nombres" value={user.nombre} />
              <Field icon="fas fa-font" label="Apellidos" value={user.apellido} />
              <Field icon="fas fa-id-card" label="Cédula de Identidad (CI)" value={user.numci} />
              <Field icon="fas fa-cake-candles" label="Fecha de Nacimiento" value={user.fenac ? new Date(user.fenac).toLocaleDateString('es-BO') : null} />
            </div>
          </div>

          {/* Contacto y Afiliación */}
          <div className="bg-white dark:bg-[#040408] dark:border-white/8 rounded-2xl p-5 shadow-xl dark:shadow-black/60 border border-slate-200/60 dark:border-white/5 border-l-4 border-l-[#E95A0C]">
            <div className="flex items-center gap-2.5 pb-2.5 border-b border-slate-100 mb-4">
              <div className="w-7 h-7 rounded-lg bg-[#E95A0C]/10 text-[#E95A0C] flex items-center justify-center text-xs">
                <i className="fas fa-phone"></i>
              </div>
              <h4 className="text-[11px] font-black text-[#4A2E1B] dark:text-white uppercase tracking-wider m-0">
                Datos de Contacto y Vínculos
              </h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              <Field icon="fas fa-envelope" label="Correo Electrónico" value={user.correo} />
              <Field icon="fas fa-mobile-screen" label="Número Teléfono / Celular" value={user.numtel} />
              <Field icon="fas fa-school" label="Colegio / Institución Vinculada" value={user.nomcol} span />
            </div>

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
                    onClick={() => onEdit(user)}
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

export default UsuarioShowView;






















