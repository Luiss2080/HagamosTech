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
      <span className="text-xs font-black text-slate-850 truncate uppercase">
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

const RolShowView = ({ rol, onBackToList, onEdit, usuarios = [], permisos = [] }) => {
  if (!rol) return null;

  // Filtrar los usuarios vinculados a este rol
  const usuariosVinculados = usuarios.filter(u => Number(u.rolId) === Number(rol.id));

  // Filtrar los permisos asignados a este rol
  const permisosAsignados = permisos.filter(p => 
    rol.id === 1 || (rol.detalleRolPermisos && rol.detalleRolPermisos.some(drp => drp.fkIdP === p.id))
  );

  // Descripción dinámica basada en el rol
  const getRolDescription = () => {
    if (rol.id === 1) return 'Rol supremo del sistema con bypass automático de todos los permisos y configuraciones.';
    if (rol.id === 4) return 'Rol asignado por defecto para visitantes y clientes externos sin permisos administrativos.';
    if (rol.nombre?.toLowerCase().includes('venta')) return 'Rol comercial enfocado en el registro de facturas, cotizaciones, y atención a clientes naturales y jurídicos.';
    if (rol.nombre?.toLowerCase().includes('almacen') || rol.nombre?.toLowerCase().includes('stock')) return 'Rol operativo enfocado en el control de stock, ingresos, salidas y movimientos de mercadería en almacenes.';
    return 'Rol personalizado para la delimitación de accesos operativos y de seguridad en el sistema.';
  };

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
              <span>Sistema</span><span>›</span><span>Seguridad</span><span>›</span><span>Roles</span><span>›</span>
              <span className="text-[#E95A0C]">Ficha del Rol</span>
            </div>
            <h2 className="text-base font-black text-[#4A2E1B] dark:text-white uppercase tracking-wider m-0 leading-none">
              ROL: {rol.nombre}
            </h2>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1 m-0">
              Vista de solo lectura — Ficha técnica de perfil de acceso.
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
          {onEdit && rol.id !== 1 && (
            <button
              type="button"
              onClick={() => onEdit(rol)}
              className="px-5 py-2.5 rounded-xl bg-[#E95A0C] hover:bg-[#cc4a00] text-white text-[10px] font-black uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-2 shadow-md shadow-red-500/10 border-0"
            >
              <i className="fas fa-pen text-[9px]"></i>
              <span>Editar Rol</span>
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
                #{rol.id}
              </span>
            </div>

            <div className="w-16 h-16 rounded-2xl  text-[#E95A0C] flex items-center justify-center text-3xl shrink-0 border border-orange-500/20 dark:border-orange-500/10 shadow-sm mt-1.5 transition-all hover:scale-[1.02]">
              <i className="fas fa-user-tag"></i>
            </div>

            <div className="w-full space-y-1.5">
              <h3 className="text-xs font-black text-slate-800 dark:text-slate-200 leading-snug uppercase tracking-wide truncate max-w-full m-0 pt-0.5">
                {rol.nombre}
              </h3>
            </div>

            <div className="w-full border-t border-slate-100 my-1"></div>

            <div className="w-full grid grid-cols-1 gap-2 text-left">
              <div className="bg-slate-50 dark:bg-[#070710] p-2.5 rounded-xl border border-slate-200/60 dark:border-white/5 flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-emerald-50 dark:bg-emerald-950/400/5 text-[#E95A0C]merald-500 flex items-center justify-center text-[10px] shrink-0 border border-emerald-500/10">
                  <i className="fas fa-circle-check"></i>
                </div>
                <div className="min-w-0 flex-1">
                  <span className="block text-[7px] font-black text-slate-400 uppercase tracking-wider leading-none mb-0.5">ESTADO</span>
                  <span className="block text-[9px] font-black text-[#E95A0C]merald-600 uppercase truncate leading-none mt-0.5">
                    Activo
                  </span>
                </div>
              </div>
            </div>

            {/* Acciones de reporte */}
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
                RESUMEN DE SEGURIDAD
              </h4>
            </div>

            <MiniField label="Permisos Habilitados" icon="fas fa-key" value={`${permisosAsignados.length} Permisos`} />
            <MiniField label="Usuarios Vinculados" icon="fas fa-users" value={`${usuariosVinculados.length} Usuarios`} />
          </div>
        </div>

        {/* COLUMNA DERECHA (Detalles y Tablas) */}
        <div className="flex-1 w-full space-y-4">
          <div className="bg-white dark:bg-[#040408] dark:border-white/8 rounded-2xl p-5 shadow-xl dark:shadow-black/60 border border-slate-200/60 dark:border-white/5 border-l-4 border-l-[#E95A0C] flex flex-col gap-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <i className="fas fa-info-circle text-[#E95A0C] text-sm"></i>
              <h3 className="text-xs font-black text-[#4A2E1B] dark:text-white uppercase tracking-wider m-0">
                FICHA TÉCNICA DEL ROL
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field icon="fas fa-hashtag" label="Identificador Único" value={`#${rol.id}`} />
              <Field icon="fas fa-user-tag" label="Nombre del Rol" value={rol.nombre} />
              <Field icon="fas fa-shield-halved" label="Nivel de Acceso" value={rol.id === 1 ? 'Acceso Total / Bypass' : 'Restringido por Matriz'} span={true} />
              <Field icon="fas fa-comment-dots" label="Descripción de Funciones" value={getRolDescription()} span={true} />
            </div>
          </div>

          {/* SECCIÓN DE PERMISOS HABILITADOS */}
          <div className="bg-white dark:bg-[#040408] dark:border-white/8 rounded-2xl p-5 shadow-xl dark:shadow-black/60 border border-slate-200/60 dark:border-white/5 border-l-4 border-l-[#E95A0C] flex flex-col gap-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <i className="fas fa-key text-[#E95A0C] text-sm"></i>
              <h3 className="text-xs font-black text-[#4A2E1B] dark:text-white uppercase tracking-wider m-0">
                PERMISOS HABILITADOS ({permisosAsignados.length})
              </h3>
            </div>

            {permisosAsignados.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {permisosAsignados.map((p, idx) => (
                  <div key={idx} className="flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/400/5 border border-emerald-500/15">
                    <i className="fas fa-check-circle text-[#E95A0C]merald-500 text-xs shrink-0"></i>
                    <span className="text-[10px] font-black font-mono text-slate-700 dark:text-slate-300 uppercase truncate">{p.nombre}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-slate-400 font-bold text-xs bg-slate-50 dark:bg-[#070710] rounded-xl border border-dashed border-slate-200/60 dark:border-white/5">
                Este rol no tiene ningún permiso de seguridad habilitado.
              </div>
            )}
          </div>

          {/* SECCIÓN DE USUARIOS VINCULADOS */}
          <div className="bg-white dark:bg-[#040408] dark:border-white/8 rounded-2xl p-5 shadow-xl dark:shadow-black/60 border border-slate-200/60 dark:border-white/5 border-l-4 border-l-[#E95A0C] flex flex-col gap-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <i className="fas fa-users text-[#E95A0C] text-sm"></i>
              <h3 className="text-xs font-black text-[#4A2E1B] dark:text-white uppercase tracking-wider m-0">
                USUARIOS VINCULADOS ({usuariosVinculados.length})
              </h3>
            </div>

            {usuariosVinculados.length > 0 ? (
              <div className="overflow-x-auto no-scrollbar">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200/60 dark:border-white/5 text-[#E95A0C] uppercase text-[9px] font-black tracking-widest">
                      <th className="py-2.5 px-3">Usuario</th>
                      <th className="py-2.5 px-3">CI / Documento</th>
                      <th className="py-2.5 px-3">Contacto</th>
                      <th className="py-2.5 px-3 text-center">Estado</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                    {usuariosVinculados.map((u, idx) => (
                      <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-950/30 transition-colors">
                        <td className="py-2.5 px-3 font-bold text-slate-850 uppercase">
                          {u.nombre} {u.apellido}
                          <span className="block text-[8px] font-mono font-normal text-slate-400 mt-0.5">@{u.usuario}</span>
                        </td>
                        <td className="py-2.5 px-3 font-mono font-bold text-slate-600 dark:text-slate-400">
                          {u.numci || 'N/A'}
                        </td>
                        <td className="py-2.5 px-3 font-semibold text-slate-600 dark:text-slate-400">
                          {u.correo}
                          <span className="block text-[8px] font-normal text-slate-400 mt-0.5">{u.numtel || 'S/T'}</span>
                        </td>
                        <td className="py-2.5 px-3 text-center">
                          <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase ${
                            u.activo 
                              ? 'bg-emerald-100 dark:bg-emerald-950/40 text-[#E95A0C]merald-800 dark:text-[#E95A0C]merald-400' 
                              : 'bg-rose-100 dark:bg-rose-950/40 text-rose-800 dark:text-rose-400'
                          }`}>
                            {u.activo ? 'Activo' : 'Inactivo'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-6 text-slate-400 font-bold text-xs bg-slate-50 dark:bg-[#070710] rounded-xl border border-dashed border-slate-200/60 dark:border-white/5">
                Ningún usuario está asignado a este rol actualmente.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RolShowView;






















