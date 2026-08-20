import React from 'react';
import { estadoClase, formatearBs, formatearFecha } from '../constantes';

const Field = ({ icon, label, value, span = false }) => (
  <div className={`flex flex-col gap-1.5 ${span ? 'md:col-span-2' : ''}`}>
    <span className="text-[9px] font-black uppercase tracking-wider text-[#E95A0C]">{label}</span>
    <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border border-slate-200/60 dark:border-white/5 bg-slate-50 dark:bg-[#070710] min-h-[42px]">
      {icon && <div className="w-6 h-6 rounded-lg text-[#E95A0C] flex items-center justify-center text-xs shrink-0"><i className={icon}></i></div>}
      <span className="text-xs font-black text-slate-800 truncate">{value || <span className="text-slate-400 font-normal italic">No especificado</span>}</span>
    </div>
  </div>
);

const CompraShowView = ({ compra, onBackToList }) => {
  if (!compra) return null;

  return (
    <div className="space-y-4 font-montserrat w-full">
      <div className="bg-white dark:bg-[#040408] rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-200 dark:border-white/5 border-l-4 border-l-[#E95A0C] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#E95A0C] text-white flex items-center justify-center text-lg font-black shadow-lg shrink-0 border border-red-500/20"><i className="fas fa-truck-moving"></i></div>
          <div>
            <div className="flex items-center gap-2 text-[9px] font-black uppercase text-slate-400 tracking-widest mb-1">
              <span>Comercial</span><span>›</span><span>Compras</span><span>›</span><span className="text-[#E95A0C]">Detalle de la Compra</span>
            </div>
            <h2 className="text-base font-black text-[#4A2E1B] dark:text-white uppercase tracking-wider m-0 leading-none">COMPRA: {compra.codigo}</h2>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1 m-0">{formatearFecha(compra.creadoEn)}</p>
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
            <span className="text-[7px] font-black text-slate-400 uppercase tracking-widest">CÓDIGO #{compra.id}</span>
            <div className="w-24 h-24 rounded-2xl overflow-hidden bg-[#FFF5EC] border border-orange-200/60 shadow-md">
              {compra.producto?.imagen ? <img src={compra.producto.imagen} alt="" className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-3xl text-[#E95A0C]"><i className="fas fa-truck-moving"></i></div>}
            </div>
            <h3 className="text-sm font-black text-[#4A2E1B] dark:text-white uppercase tracking-wide m-0">{compra.producto?.nombre}</h3>
            <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase ${estadoClase(compra.estado)}`}>{compra.estado}</span>
            <div className="w-full border-t border-slate-100 my-1"></div>
            <p className="text-3xl font-black text-[#FF4D00]">{formatearBs(compra.total)}</p>
            <p className="text-[10px] font-bold text-slate-400">{compra.cantidad} × {formatearBs(compra.precioUnitario)}</p>
          </div>
        </div>

        <div className="flex-1 w-full space-y-4">
          <div className="bg-white dark:bg-[#040408] rounded-2xl p-5 shadow-xl dark:shadow-black/60 border border-slate-200/60 dark:border-white/5 border-l-4 border-l-[#E95A0C]">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100 mb-4">
              <i className="fas fa-info-circle text-[#E95A0C] text-sm"></i>
              <h3 className="text-xs font-black text-[#4A2E1B] dark:text-white uppercase tracking-wider m-0">DATOS DE LA COMPRA</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field icon="fas fa-barcode" label="Código" value={compra.codigo} />
              <Field icon="fas fa-box-open" label="Producto / Insumo" value={compra.producto?.nombre} />
              <Field icon="fas fa-store" label="Sucursal" value={compra.sucursal?.nombre} />
              <Field icon="fas fa-truck" label="Proveedor" value={compra.proveedorNombre} />
              <Field icon="fas fa-phone" label="Contacto proveedor" value={compra.proveedorContacto} />
              <Field icon="fas fa-hashtag" label="Cantidad" value={compra.cantidad} />
              <Field icon="fas fa-money-bill-wave" label="Precio unitario" value={formatearBs(compra.precioUnitario)} />
              <Field icon="fas fa-sack-dollar" label="Total invertido" value={formatearBs(compra.total)} />
              <Field icon="fas fa-circle-check" label="Estado" value={compra.estado} />
              <Field icon="fas fa-calendar" label="Fecha" value={formatearFecha(compra.creadoEn)} span />
              {compra.observaciones && <Field icon="fas fa-comment-dots" label="Observaciones" value={compra.observaciones} span />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompraShowView;