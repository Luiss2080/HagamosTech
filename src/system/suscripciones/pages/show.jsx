import React from 'react';

const SuscripcionShowView = ({ suscripcion, onBackToList, onEdit }) => {
  if (!suscripcion) return null;

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { 
      year: 'numeric', month: 'long', day: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  };

  const getStatusBadge = (estado) => {
    const s = String(estado).toLowerCase();
    if (s === 'suscrito') {
      return (
        <span className="px-4 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950/40 text-[#E95A0C]merald-800 text-xs font-black uppercase inline-flex items-center gap-2 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-50 dark:bg-emerald-950/400 animate-pulse"></span> SUSCRITO
        </span>
      );
    }
    if (s === 'invitado') {
      return (
        <span className="px-4 py-1.5 rounded-full bg-amber-100 dark:bg-amber-950/40 text-[#E95A0C]mber-800 text-xs font-black uppercase inline-flex items-center gap-2 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-amber-50 dark:bg-amber-950/400 animate-pulse"></span> INVITADO
        </span>
      );
    }
    return (
      <span className="px-4 py-1.5 rounded-full bg-rose-100 dark:bg-rose-950/40 text-rose-800 text-xs font-black uppercase inline-flex items-center gap-2 shadow-sm">
        <i className="fas fa-ban text-[10px]"></i> VENCIDO
      </span>
    );
  };

  return (
    <div className="space-y-5 font-montserrat w-full">
      <div className="bg-white dark:bg-[#040408] dark:border-white/8 rounded-2xl p-6 shadow-xl dark:shadow-black/60 border border-slate-200/60 dark:border-white/5 border-l-4 border-l-sky-500 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-500 flex items-center justify-center text-xl font-black shadow-sm shrink-0 border border-sky-200">
            <i className="fas fa-file-invoice"></i>
          </div>
          <div>
            <div className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">
              <span>Sistema</span>
              <span>{'>'}</span>
              <span>Suscripciones</span>
              <span>{'>'}</span>
              <span className="text-sky-500">Detalles</span>
            </div>
            <h2 className="text-xl font-black text-[#4A2E1B] dark:text-white uppercase tracking-wider m-0 leading-none">
              Ficha de Suscripción
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider mt-1 m-0">
              Información detallada del estado del plan de acceso del usuario.
            </p>
          </div>
        </div>
 
        <div className="flex items-center gap-3 shrink-0">
          <button onClick={() => onEdit(suscripcion)}
            className="px-5 py-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/400 hover:bg-amber-600 text-white text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md hover:scale-105 border-0">
            <i className="fas fa-pen"></i>
            <span>Editar</span>
          </button>
          <button onClick={onBackToList}
            className="px-5 py-2.5 rounded-xl bg-[#8B4513] hover:bg-[#8B4513] text-white text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md border border-slate-700">
            <i className="fas fa-arrow-left"></i>
            <span>Volver</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* COLUMNA 1: INFO USUARIO */}
        <div className="md:col-span-2 space-y-5">
          <div className="bg-white dark:bg-[#040408] dark:border-white/8 rounded-2xl p-6 shadow-xl dark:shadow-black/60 border border-slate-200/60 dark:border-white/5 border-l-4 border-l-slate-400">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-sm font-black text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-2 m-0">
                <i className="fas fa-user-circle text-slate-400"></i> INFORMACIÓN DEL USUARIO
              </h3>
              {getStatusBadge(suscripcion.estado)}
            </div>
            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-black uppercase text-slate-400 block mb-1">Nombre Completo</span>
                <span className="text-base font-bold text-slate-800 dark:text-slate-200">{suscripcion.nombre}</span>
              </div>
              <div>
                <span className="text-[10px] font-black uppercase text-slate-400 block mb-1">Correo Electrónico</span>
                <span className="text-sm font-bold text-slate-700 dark:text-slate-300 font-mono">{suscripcion.correo}</span>
              </div>
              <div>
                <span className="text-[10px] font-black uppercase text-slate-400 block mb-1">ID del Sistema</span>
                <span className="text-sm font-bold text-slate-700 dark:text-slate-300 font-mono px-2 py-1 bg-slate-100 dark:bg-[#070710] rounded-md">#{suscripcion.usuarioId}</span>
              </div>
            </div>
          </div>
        </div>

        {/* COLUMNA 2: FECHAS */}
        <div className="space-y-5">
          <div className="bg-white dark:bg-[#040408] dark:border-white/8 rounded-2xl p-6 shadow-xl dark:shadow-black/60 border border-slate-200/60 dark:border-white/5 border-l-4 border-l-emerald-500">
            <h3 className="text-sm font-black text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-2 mb-5">
              <i className="fas fa-calendar-check text-[#E95A0C]merald-500"></i> FECHAS DEL PLAN
            </h3>
            <div className="space-y-4">
              <div className="bg-slate-50 dark:bg-[#070710] p-3 rounded-xl border border-slate-100">
                <span className="text-[10px] font-black uppercase text-slate-500 dark:text-slate-400 block mb-1">Inicio de Suscripción / Prueba</span>
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  <i className="fas fa-play text-[10px] text-[#E95A0C]merald-500 mr-2"></i>
                  {formatDate(suscripcion.fechaInicio)}
                </span>
              </div>
              <div className="bg-slate-50 dark:bg-[#070710] p-3 rounded-xl border border-slate-100">
                <span className="text-[10px] font-black uppercase text-slate-500 dark:text-slate-400 block mb-1">Vencimiento / Fin de Prueba</span>
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  <i className="fas fa-stop text-[10px] text-rose-500 mr-2"></i>
                  {formatDate(suscripcion.fechaFinPrueba)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuscripcionShowView;






















