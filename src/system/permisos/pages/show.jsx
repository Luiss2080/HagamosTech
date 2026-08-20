import React from 'react';

const Field = ({ icon, label, value, span = false }) => (
  <div className={`flex flex-col gap-1.5 ${span ? 'md:col-span-2' : ''}`}>
    <span className="text-[9px] font-black uppercase tracking-wider text-[#E95A0C]">{label}</span>
    <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border border-slate-200/60 dark:border-white/5 bg-slate-50 dark:bg-[#070710] min-h-[42px] transition-all hover:border-slate-300 dark:hover:border-slate-700">
      {icon && (
        <div className="w-6 h-6 rounded-lg  text-[#E95A0C] flex items-center justify-center text-xs shrink-0">
          <i className={icon}></i>
        </div>
      )}
      <span className="text-xs font-black text-slate-855 truncate uppercase">
        {value || <span className="text-slate-400 font-normal italic">No especificado</span>}
      </span>
    </div>
  </div>
);

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

const PermisoShowView = ({ permiso, onBackToList, onEdit, matrizPermisos = [] }) => {
  if (!permiso) return null;

  // Filtrar los roles que tienen asignado este permiso
  const rolesVinculados = matrizPermisos.filter(r => 
    r.id === 1 || (r.detalleRolPermisos && r.detalleRolPermisos.some(drp => drp.fkIdP === permiso.id))
  );

  // Módulo estimado basado en el código
  const getModuloName = () => {
    const name = permiso.nombre?.toLowerCase() || '';
    if (name.includes('venta')) return 'Ventas y Comercial';
    if (name.includes('stock') || name.includes('inventario') || name.includes('libro')) return 'Almacenes e Inventario';
    if (name.includes('usuario') || name.includes('rol') || name.includes('permiso')) return 'Seguridad y Accesos';
    return 'General / Operaciones';
  };

  // Descripción estimada basada en el código
  const getPermisoDescription = () => {
    const name = permiso.nombre?.toLowerCase() || '';
    if (name.includes('venta')) return 'Controla accesos sobre transacciones comerciales, facturación, cotizaciones o reportes de caja.';
    if (name.includes('stock') || name.includes('inventario')) return 'Permite la modificación de existencias físicas, movimientos y entradas de mercadería.';
    if (name.includes('usuario') || name.includes('rol')) return 'Acceso administrativo a la creación y edición de perfiles y usuarios del sistema.';
    return 'Código de autorización operativa utilizado para restringir o conceder acceso a vistas o botones.';
  };

  return (
    <div className="space-y-4 font-montserrat w-full">
      {/* CABECERA */}
      <div className="bg-white dark:bg-[#040408] rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-200 dark:border-white/5 border-l-4 border-l-[#E95A0C] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#E95A0C] text-white flex items-center justify-center text-lg font-black shadow-lg dark:shadow-black/60 shadow-red-900/20 shrink-0 border border-red-500/20">
            <i className="fas fa-key"></i>
          </div>
          <div>
            <div className="flex items-center gap-2 text-[9px] font-black uppercase text-slate-400 tracking-widest mb-1">
              <span>Sistema</span><span>›</span><span>Seguridad</span><span>›</span><span>Permisos</span><span>›</span>
              <span className="text-[#E95A0C]">Detalle del Permiso</span>
            </div>
            <h2 className="text-base font-black text-[#4A2E1B] dark:text-white uppercase tracking-wider m-0 leading-none">
              PERMISO: {permiso.nombre}
            </h2>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1 m-0">
              Vista de solo lectura — Llave de autorización del sistema.
            </p>
          </div>
        </div>

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
              onClick={() => onEdit(permiso)}
              className="px-5 py-2.5 rounded-xl bg-[#E95A0C] hover:bg-[#cc4a00] text-white text-[10px] font-black uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-2 shadow-md shadow-red-500/10 border-0"
            >
              <i className="fas fa-pen text-[9px]"></i>
              <span>Editar Código</span>
            </button>
          )}
        </div>
      </div>

      {/* CUERPO DE LA VISTA */}
      <div className="flex flex-col lg:flex-row gap-4 items-start w-full relative">
        {/* COLUMNA IZQUIERDA (Mini Perfil) */}
        <div className="w-full lg:w-72 shrink-0 lg:sticky lg:top-4 space-y-4 self-start">
          <div className="bg-white dark:bg-[#040408] dark:border-white/8 rounded-2xl p-5 shadow-xl dark:shadow-black/60 border border-slate-200/60 dark:border-white/5 border-l-4 border-l-[#E95A0C] flex flex-col items-center text-center gap-3">
            <div>
              <span className="block text-[7px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">CÓDIGO ID</span>
              <span className="text-[10px] font-black text-[#E95A0C] uppercase tracking-widest  px-3.5 py-1.5 rounded-xl border border-orange-500/20 dark:border-orange-500/10 inline-block font-mono shadow-sm">
                #{permiso.id}
              </span>
            </div>

            <div className="w-16 h-16 rounded-2xl  text-[#E95A0C] flex items-center justify-center text-3xl shrink-0 border border-orange-500/20 dark:border-orange-500/10 shadow-sm mt-1.5 transition-all hover:scale-[1.02]">
              <i className="fas fa-shield-halved"></i>
            </div>

            <div className="w-full space-y-1.5">
              <h3 className="text-xs font-mono font-black text-slate-800 dark:text-slate-200 leading-snug uppercase tracking-wide truncate max-w-full m-0 pt-0.5">
                {permiso.nombre}
              </h3>
            </div>

            <div className="w-full border-t border-slate-100 my-1"></div>

            <div className="w-full grid grid-cols-1 gap-2 text-left">
              <div className="bg-slate-50 dark:bg-[#070710] p-2.5 rounded-xl border border-slate-200/60 dark:border-white/5 flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-emerald-50 dark:bg-emerald-950/400/5 text-[#E95A0C]merald-500 flex items-center justify-center text-[10px] shrink-0 border border-emerald-500/10">
                  <i className="fas fa-circle-check"></i>
                </div>
                <div className="min-w-0 flex-1">
                  <span className="block text-[7px] font-black text-slate-400 uppercase tracking-wider leading-none mb-0.5">TIPO REGISTRO</span>
                  <span className="block text-[9px] font-black text-slate-750 uppercase truncate leading-none mt-0.5">
                    Autorización
                  </span>
                </div>
              </div>
            </div>

            {/* Acciones */}
            <div className="w-full flex gap-2 pt-2 border-t border-slate-100">
              <button 
                type="button"
                onClick={() => window.print()}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#E95A0C] to-red-700 hover:from-red-700 hover:to-[#E95A0C] text-white font-black text-[9px] uppercase tracking-widest transition-all cursor-pointer shadow-md shadow-red-500/10 hover:scale-[1.02] border-0 flex items-center justify-center gap-2"
              >
                <i className="fas fa-print text-[10px] text-white/90"></i>
                <span>Imprimir</span>
              </button>
            </div>
          </div>

          {/* DATOS COMERCIALES / RESUMEN */}
          <div className="bg-white dark:bg-[#040408] dark:border-white/8 rounded-2xl p-5 shadow-xl dark:shadow-black/60 border border-slate-200/60 dark:border-white/5 border-l-4 border-l-[#E95A0C] flex flex-col gap-2.5">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <i className="fas fa-chart-pie text-[#E95A0C] text-xs"></i>
              <h4 className="text-[9px] font-black text-[#4A2E1B] dark:text-white uppercase tracking-wider m-0">
                ALCANCE DE LA LLAVE
              </h4>
            </div>

            <MiniField label="Roles Vinculados" icon="fas fa-user-tag" value={`${rolesVinculados.length} Roles`} />
            <MiniField label="Módulo Operativo" icon="fas fa-folder-open" value={getModuloName()} />
          </div>
        </div>

        {/* COLUMNA DERECHA (Detalles y Tablas) */}
        <div className="flex-1 w-full space-y-4">
          <div className="bg-white dark:bg-[#040408] dark:border-white/8 rounded-2xl p-5 shadow-xl dark:shadow-black/60 border border-slate-200/60 dark:border-white/5 border-l-4 border-l-[#E95A0C] flex flex-col gap-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <i className="fas fa-info-circle text-[#E95A0C] text-sm"></i>
              <h3 className="text-xs font-black text-[#4A2E1B] dark:text-white uppercase tracking-wider m-0">
                FICHA TÉCNICA DEL PERMISO
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field icon="fas fa-hashtag" label="Identificador Único" value={`#${permiso.id}`} />
              <Field icon="fas fa-key" label="Código del Permiso" value={permiso.nombre} />
              <Field icon="fas fa-folder-tree" label="Módulo Asociado" value={getModuloName()} span={true} />
              <Field icon="fas fa-comment-dots" label="Descripción Funcional" value={getPermisoDescription()} span={true} />
            </div>
          </div>

          {/* SECCIÓN DE ROLES VINCULADOS */}
          <div className="bg-white dark:bg-[#040408] dark:border-white/8 rounded-2xl p-5 shadow-xl dark:shadow-black/60 border border-slate-200/60 dark:border-white/5 border-l-4 border-l-[#E95A0C] flex flex-col gap-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <i className="fas fa-user-shield text-[#E95A0C] text-sm"></i>
              <h3 className="text-xs font-black text-[#4A2E1B] dark:text-white uppercase tracking-wider m-0">
                ROLES CON ESTE PERMISO HABILITADO ({rolesVinculados.length})
              </h3>
            </div>

            {rolesVinculados.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {rolesVinculados.map((r, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/400/5 border border-emerald-500/15">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg  text-[#E95A0C] flex items-center justify-center text-xs border border-red-500/10">
                        <i className="fas fa-user-tag"></i>
                      </div>
                      <div>
                        <span className="font-extrabold text-slate-800 dark:text-slate-200 text-xs block leading-tight uppercase">{r.nombre}</span>
                        <span className="text-[8.5px] font-mono text-slate-450 mt-0.5 block">Rol ID: #{r.id}</span>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/40 text-[#E95A0C]merald-800 text-[8px] font-black uppercase">
                      Concedido
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-slate-400 font-bold text-xs bg-slate-50 dark:bg-[#070710] rounded-xl border border-dashed border-slate-200/60 dark:border-white/5">
                Ningún rol tiene este permiso habilitado actualmente.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PermisoShowView;






















