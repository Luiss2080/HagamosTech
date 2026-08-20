import React from 'react';
import { formatearFecha } from '../constantes';

const Field = ({ icon, label, value, span = false }) => (
  <div className={`flex flex-col gap-1.5 ${span ? 'md:col-span-2' : ''}`}>
    <span className="text-[9px] font-black uppercase tracking-wider text-[#E95A0C]">{label}</span>
    <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border border-slate-200/60 dark:border-white/5 bg-slate-50 dark:bg-[#070710] min-h-[42px]">
      {icon && <div className="w-6 h-6 rounded-lg text-[#E95A0C] flex items-center justify-center text-xs shrink-0"><i className={icon}></i></div>}
      <span className="text-xs font-black text-slate-800 truncate">{value || <span className="text-slate-400 font-normal italic">No especificado</span>}</span>
    </div>
  </div>
);

const SucursalShowView = ({ sucursal, onBackToList }) => {
  if (!sucursal) return null;

  return (
    <div className="space-y-4 font-montserrat w-full">
      <div className="bg-white dark:bg-[#040408] rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-200 dark:border-white/5 border-l-4 border-l-[#E95A0C] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#E95A0C] text-white flex items-center justify-center text-lg font-black shadow-lg shrink-0 border border-red-500/20"><i className="fas fa-store"></i></div>
          <div>
            <div className="flex items-center gap-2 text-[9px] font-black uppercase text-slate-400 tracking-widest mb-1">
              <span>Operaciones</span><span>›</span><span>Sucursales</span><span>›</span><span className="text-[#E95A0C]">Detalle de la Sucursal</span>
            </div>
            <h2 className="text-base font-black text-[#4A2E1B] dark:text-white uppercase tracking-wider m-0 leading-none">{sucursal.nombre}</h2>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1 m-0">Registrada el {formatearFecha(sucursal.fechaCreacion)}</p>
          </div>
        </div>
        <div className="flex items-center gap-2.5 shrink-0">
          <button onClick={onBackToList} className="px-5 py-2.5 rounded-xl bg-[#8B4513] hover:bg-slate-900 text-white text-[10px] font-black uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-2 border border-slate-700 shadow-sm">
            <i className="fas fa-arrow-left text-[9px]"></i><span>Volver al listado</span>
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 items-start w-full">
        <div className="w-full lg:w-72 shrink-0 space-y-4 self-start">
          <div className="bg-white dark:bg-[#040408] rounded-2xl p-5 shadow-xl dark:shadow-black/60 border border-slate-200/60 dark:border-white/5 border-l-4 border-l-[#E95A0C] flex flex-col items-center text-center gap-3">
            <span className="text-[7px] font-black text-slate-400 uppercase tracking-widest">CÓDIGO #{sucursal.id}</span>
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#E95A0C]/10 to-[#8B4513]/10 text-[#E95A0C] flex items-center justify-center text-4xl border border-orange-200/60 shadow-md"><i className="fas fa-store"></i></div>
            <h3 className="text-sm font-black text-[#4A2E1B] dark:text-white uppercase tracking-wide m-0">{sucursal.nombre}</h3>
            <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase ${sucursal.activo ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-slate-100 text-slate-400 border border-slate-200'}`}>{sucursal.activo ? 'Activa' : 'Inactiva'}</span>
            <span className="px-3 py-1 rounded-full bg-orange-50 text-[#E95A0C] border border-orange-200 text-[9px] font-black uppercase">{sucursal.ciudad}</span>
            {sucursal.horario && <p className="text-[10px] font-bold text-slate-500"><i className="fas fa-clock text-[#E95A0C] mr-1"></i>{sucursal.horario}</p>}
          </div>
        </div>

        <div className="flex-1 w-full space-y-4">
          <div className="bg-white dark:bg-[#040408] rounded-2xl p-5 shadow-xl dark:shadow-black/60 border border-slate-200/60 dark:border-white/5 border-l-4 border-l-[#E95A0C]">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100 mb-4">
              <i className="fas fa-info-circle text-[#E95A0C] text-sm"></i>
              <h3 className="text-xs font-black text-[#4A2E1B] dark:text-white uppercase tracking-wider m-0">FICHA DE LA SUCURSAL</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field icon="fas fa-hashtag" label="Identificador" value={`#${sucursal.id}`} />
              <Field icon="fas fa-store" label="Nombre" value={sucursal.nombre} />
              <Field icon="fas fa-city" label="Ciudad" value={sucursal.ciudad} />
              <Field icon="fas fa-location-dot" label="Dirección" value={sucursal.direccion} />
              <Field icon="fas fa-phone" label="Teléfono" value={sucursal.telefono} />
              <Field icon="fas fa-clock" label="Horario" value={sucursal.horario} />
              <Field icon="fas fa-list-check" label="Servicios" value={sucursal.servicios} span />
              <Field icon="fas fa-power-off" label="Estado" value={sucursal.activo ? 'Activa' : 'Inactiva'} />
              <Field icon="fas fa-calendar" label="Registrada" value={formatearFecha(sucursal.fechaCreacion)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SucursalShowView;