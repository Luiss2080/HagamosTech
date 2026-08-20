import React from 'react';
import { estadoClase, estadoIcono, formatearBs, formatearFecha } from '../constantes';

const Field = ({ icon, label, value, span = false }) => (
  <div className={`flex flex-col gap-1.5 ${span ? 'md:col-span-2' : ''}`}>
    <span className="text-[9px] font-black uppercase tracking-wider text-[#E95A0C]">{label}</span>
    <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border border-slate-200/60 dark:border-white/5 bg-slate-50 dark:bg-[#070710] min-h-[42px]">
      {icon && <div className="w-6 h-6 rounded-lg text-[#E95A0C] flex items-center justify-center text-xs shrink-0"><i className={icon}></i></div>}
      <span className="text-xs font-black text-slate-800 truncate">{value || <span className="text-slate-400 font-normal italic">No especificado</span>}</span>
    </div>
  </div>
);

const PedidoShowView = ({ pedido, onBackToList, onEditar }) => {
  if (!pedido) return null;
  const items = Array.isArray(pedido.items) ? pedido.items : [];

  return (
    <div className="space-y-4 font-montserrat w-full">
      <div className="bg-white dark:bg-[#040408] rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-200 dark:border-white/5 border-l-4 border-l-[#E95A0C] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#E95A0C] text-white flex items-center justify-center text-lg font-black shadow-lg shrink-0 border border-red-500/20"><i className="fas fa-truck-fast"></i></div>
          <div>
            <div className="flex items-center gap-2 text-[9px] font-black uppercase text-slate-400 tracking-widest mb-1">
              <span>Operaciones</span><span>›</span><span>Delivery</span><span>›</span><span className="text-[#E95A0C]">Detalle del Pedido</span>
            </div>
            <h2 className="text-base font-black text-[#4A2E1B] dark:text-white uppercase tracking-wider m-0 leading-none">PEDIDO: {pedido.codigo}</h2>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1 m-0">{formatearFecha(pedido.creadoEn)}</p>
          </div>
        </div>
        <div className="flex items-center gap-2.5 shrink-0">
          <button onClick={onBackToList} className="px-5 py-2.5 rounded-xl bg-[#8B4513] hover:bg-slate-900 text-white text-[10px] font-black uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-2 border border-slate-700 shadow-sm">
            <i className="fas fa-arrow-left text-[9px]"></i><span>Volver</span>
          </button>
          {onEditar && <button onClick={() => onEditar(pedido)} className="px-5 py-2.5 rounded-xl bg-[#E95A0C] hover:bg-[#cc4a00] text-white text-[10px] font-black uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-2 shadow-md"><i className="fas fa-pen text-[9px]"></i>Editar</button>}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 items-start w-full">
        <div className="w-full lg:w-72 shrink-0 space-y-4 self-start">
          <div className="bg-white dark:bg-[#040408] rounded-2xl p-5 shadow-xl dark:shadow-black/60 border border-slate-200/60 dark:border-white/5 border-l-4 border-l-[#E95A0C] flex flex-col items-center text-center gap-3">
            <span className="text-[7px] font-black text-slate-400 uppercase tracking-widest">CÓDIGO #{pedido.id}</span>
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#E95A0C] to-orange-700 text-white flex items-center justify-center text-4xl shadow-lg"><i className="fas fa-truck-fast"></i></div>
            <h3 className="text-base font-black text-[#4A2E1B] dark:text-white uppercase tracking-wide m-0">{pedido.clienteNombre}</h3>
            <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase ${estadoClase(pedido.estado)}`}><i className={`${estadoIcono(pedido.estado)} mr-1`}></i>{pedido.estado.replace('_', ' ')}</span>
            {pedido.repartidor && <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-slate-500"><i className="fas fa-motorcycle text-[#E95A0C]"></i>{pedido.repartidor.nombre}</span>}
            <div className="w-full border-t border-slate-100 my-1"></div>
            <p className="text-3xl font-black text-[#FF4D00]">{formatearBs(pedido.total)}</p>
            <p className="text-[10px] font-bold text-slate-400">{formatearBs(pedido.tarifa)} de delivery</p>
          </div>
        </div>

        <div className="flex-1 w-full space-y-4">
          <div className="bg-white dark:bg-[#040408] rounded-2xl p-5 shadow-xl dark:shadow-black/60 border border-slate-200/60 dark:border-white/5 border-l-4 border-l-[#E95A0C]">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100 mb-4">
              <i className="fas fa-info-circle text-[#E95A0C] text-sm"></i>
              <h3 className="text-xs font-black text-[#4A2E1B] dark:text-white uppercase tracking-wider m-0">DATOS DEL ENVÍO</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field icon="fas fa-barcode" label="Código" value={pedido.codigo} />
              <Field icon="fas fa-user-tie" label="Cliente" value={pedido.clienteNombre} />
              <Field icon="fas fa-phone" label="Teléfono" value={pedido.telefono} />
              <Field icon="fas fa-location-dot" label="Dirección" value={pedido.direccion} span />
              <Field icon="fas fa-location-dot" label="Zona" value={pedido.zona?.nombre} />
              <Field icon="fas fa-motorcycle" label="Repartidor" value={pedido.repartidor?.nombre} />
              <Field icon="fas fa-money-bill-wave" label="Delivery" value={formatearBs(pedido.tarifa)} />
              <Field icon="fas fa-sack-dollar" label="Total" value={formatearBs(pedido.total)} />
              <Field icon="fas fa-circle-check" label="Estado" value={pedido.estado.replace('_', ' ')} />
              <Field icon="fas fa-calendar" label="Registrado" value={formatearFecha(pedido.creadoEn)} />
              {pedido.entregadoEn && <Field icon="fas fa-flag-checkered" label="Entregado" value={formatearFecha(pedido.entregadoEn)} />}
              {pedido.observaciones && <Field icon="fas fa-comment-dots" label="Observaciones" value={pedido.observaciones} span />}
            </div>
          </div>

          <div className="bg-white dark:bg-[#040408] rounded-2xl p-5 shadow-xl dark:shadow-black/60 border border-slate-200/60 dark:border-white/5 border-l-4 border-l-[#E95A0C]">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100 mb-4">
              <i className="fas fa-list-check text-[#E95A0C] text-sm"></i>
              <h3 className="text-xs font-black text-[#4A2E1B] dark:text-white uppercase tracking-wider m-0">ÍTEMS DEL PEDIDO ({items.length})</h3>
            </div>
            <div className="space-y-2">
              {items.map((it, i) => (
                <div key={i} className="flex items-center gap-3 p-2.5 rounded-xl bg-orange-50/40 dark:bg-orange-950/10 border border-orange-100/60">
                  <div className="w-10 h-10 rounded-xl overflow-hidden bg-white border border-gray-200 shrink-0">
                    {it.imagen ? <img src={it.imagen} alt="" className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-[#E95A0C]"><i className="fas fa-utensils text-sm"></i></div>}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] font-black text-[#111827] truncate">{it.nombre}</p>
                    <p className="text-[9px] font-bold text-gray-400">{it.cantidad} × Bs. {it.precio.toFixed(2)}</p>
                  </div>
                  <span className="text-[13px] font-black text-[#FF4D00] whitespace-nowrap">Bs. {(it.precio * it.cantidad).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between px-3 py-2.5 rounded-xl bg-[#FFF5EC] border border-orange-200/60">
              <span className="text-sm font-black uppercase tracking-wide text-gray-500">TOTAL CON DELIVERY</span>
              <span className="text-2xl font-black text-[#FF4D00]">{formatearBs(pedido.total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PedidoShowView;