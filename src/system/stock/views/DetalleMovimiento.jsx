import React from 'react';
import { tipoMovimientoClase, tipoMovimientoIcono, tipoMovimientoLabel, formatearFecha } from '../constantes';

const Field = ({ icon, label, value, span = false }) => (
  <div className={`flex flex-col gap-1.5 ${span ? 'md:col-span-2' : ''}`}>
    <span className="text-[9px] font-black uppercase tracking-wider text-[#E95A0C]">{label}</span>
    <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border border-slate-200/60 dark:border-white/5 bg-slate-50 dark:bg-[#070710] min-h-[42px]">
      {icon && <div className="w-6 h-6 rounded-lg text-[#E95A0C] flex items-center justify-center text-xs shrink-0"><i className={icon}></i></div>}
      <span className="text-xs font-black text-slate-800 truncate">{value || <span className="text-slate-400 font-normal italic">No especificado</span>}</span>
    </div>
  </div>
);

const DetalleMovimiento = ({ movimiento, onBackToList }) => {
  if (!movimiento) return null;

  return (
    <div className="space-y-4 font-montserrat w-full">
      <div className="bg-white dark:bg-[#040408] rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-200 dark:border-white/5 border-l-4 border-l-[#E95A0C] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#E95A0C] text-white flex items-center justify-center text-lg font-black shadow-lg shrink-0 border border-red-500/20"><i className="fas fa-right-left"></i></div>
          <div>
            <div className="flex items-center gap-2 text-[9px] font-black uppercase text-slate-400 tracking-widest mb-1">
              <span>Comercial</span><span>›</span><span>Stock</span><span>›</span><span className="text-[#E95A0C]">Detalle del Movimiento</span>
            </div>
            <h2 className="text-base font-black text-[#4A2E1B] dark:text-white uppercase tracking-wider m-0 leading-none">MOVIMIENTO #{movimiento.id}</h2>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1 m-0">Kardex de inventario · {formatearFecha(movimiento.creadoEn)}</p>
          </div>
        </div>
        <button onClick={onBackToList} className="px-5 py-2.5 rounded-xl bg-[#8B4513] hover:bg-slate-900 text-white text-[10px] font-black uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-2 border border-slate-700 shadow-sm shrink-0">
          <i className="fas fa-arrow-left text-[9px]"></i><span>Volver</span>
        </button>
      </div>

      <div className="bg-white dark:bg-[#040408] rounded-2xl p-5 shadow-xl dark:shadow-black/60 border border-slate-200/60 dark:border-white/5 border-l-4 border-l-[#E95A0C]">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100 mb-4">
          <i className="fas fa-info-circle text-[#E95A0C] text-sm"></i>
          <h3 className="text-xs font-black text-[#4A2E1B] dark:text-white uppercase tracking-wider m-0">DATOS DEL MOVIMIENTO</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field icon="fas fa-hashtag" label="Identificador" value={`#${movimiento.id}`} />
          <Field icon="fas fa-box-open" label="Producto" value={movimiento.producto?.nombre} />
          <Field icon="fas fa-store" label="Sucursal" value={movimiento.sucursal?.nombre} />
          <Field icon="fas fa-right-left" label="Tipo" value={tipoMovimientoLabel(movimiento.tipo)} />
          <Field icon="fas fa-hashtag" label="Cantidad" value={movimiento.cantidad} />
          <Field icon="fas fa-calendar" label="Fecha" value={formatearFecha(movimiento.creadoEn)} span />
          <Field icon="fas fa-tag" label="Referencia" value={movimiento.referencia} span />
          <Field icon="fas fa-comment-dots" label="Motivo" value={movimiento.motivo} span />
        </div>
        <div className="mt-4 flex items-center justify-center">
          <span className={`px-4 py-2 rounded-full text-[10px] font-black uppercase ${tipoMovimientoClase(movimiento.tipo)}`}>
            <i className={`${tipoMovimientoIcono(movimiento.tipo)} mr-1.5`}></i>{tipoMovimientoLabel(movimiento.tipo)} · {movimiento.cantidad} unidades
          </span>
        </div>
      </div>
    </div>
  );
};

export default DetalleMovimiento;