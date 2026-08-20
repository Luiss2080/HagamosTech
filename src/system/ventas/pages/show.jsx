import React from 'react';
import { estadoClase, metodoIcono, formatearBs, formatearFecha } from '../constantes';

const Field = ({ icon, label, value, span = false }) => (
  <div className={`flex flex-col gap-1.5 ${span ? 'md:col-span-2' : ''}`}>
    <span className="text-[9px] font-black uppercase tracking-wider text-[#E95A0C]">{label}</span>
    <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border border-slate-200/60 dark:border-white/5 bg-slate-50 dark:bg-[#070710] min-h-[42px]">
      {icon && <div className="w-6 h-6 rounded-lg text-[#E95A0C] flex items-center justify-center text-xs shrink-0"><i className={icon}></i></div>}
      <span className="text-xs font-black text-slate-800 truncate">{value || <span className="text-slate-400 font-normal italic">No especificado</span>}</span>
    </div>
  </div>
);

const VentaShowView = ({ venta, onBackToList }) => {
  if (!venta) return null;
  const items = Array.isArray(venta.items) ? venta.items : [];
  const fecha = formatearFecha(venta.creadoEn);

  return (
    <div className="space-y-4 font-montserrat w-full">
      {/* CABECERA */}
      <div className="bg-white dark:bg-[#040408] rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-200 dark:border-white/5 border-l-4 border-l-[#E95A0C] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#E95A0C] text-white flex items-center justify-center text-lg font-black shadow-lg shrink-0 border border-red-500/20"><i className="fas fa-receipt"></i></div>
          <div>
            <div className="flex items-center gap-2 text-[9px] font-black uppercase text-slate-400 tracking-widest mb-1">
              <span>Comercial</span><span>›</span><span>Ventas</span><span>›</span><span className="text-[#E95A0C]">Detalle de la Venta</span>
            </div>
            <h2 className="text-base font-black text-[#4A2E1B] dark:text-white uppercase tracking-wider m-0 leading-none">VENTA: {venta.codigo}</h2>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1 m-0">Comprobante de venta · {fecha}</p>
          </div>
        </div>
        <div className="flex items-center gap-2.5 shrink-0">
          <button onClick={onBackToList} className="px-5 py-2.5 rounded-xl bg-[#8B4513] hover:bg-slate-900 text-white text-[10px] font-black uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-2 border border-slate-700 shadow-sm">
            <i className="fas fa-arrow-left text-[9px]"></i><span>Volver al listado</span>
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 items-start w-full relative">
        {/* COLUMNA IZQUIERDA */}
        <div className="w-full lg:w-72 shrink-0 lg:sticky lg:top-4 space-y-4 self-start">
          <div className="bg-white dark:bg-[#040408] rounded-2xl p-5 shadow-xl dark:shadow-black/60 border border-slate-200/60 dark:border-white/5 border-l-4 border-l-[#E95A0C] flex flex-col items-center text-center gap-3">
            <span className="block text-[7px] font-black text-slate-400 uppercase tracking-widest">CÓDIGO #{venta.id}</span>
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#E95A0C] to-orange-700 text-white flex items-center justify-center text-4xl shadow-lg">
              <i className="fas fa-receipt"></i>
            </div>
            <h3 className="text-base font-black text-[#4A2E1B] dark:text-white uppercase tracking-wide m-0">{venta.codigo}</h3>
            <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase ${estadoClase(venta.estado)}`}>{venta.estado}</span>
            <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500">
              <i className={`${metodoIcono(venta.metodoPago)} text-[#E95A0C]`}></i>{venta.metodoPago}
            </span>
            <div className="w-full border-t border-slate-100 my-1"></div>
            <p className="text-3xl font-black text-[#FF4D00]">{formatearBs(venta.total)}</p>
            <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase ${venta.origen === 'mesa' ? 'bg-sky-50 text-sky-600' : 'bg-orange-50 text-[#E95A0C]'}`}>{venta.origen === 'mesa' ? 'Servicio de mesa' : 'Sistema'}</span>
          </div>
        </div>

        {/* COLUMNA DERECHA */}
        <div className="flex-1 w-full space-y-4">
          <div className="bg-white dark:bg-[#040408] rounded-2xl p-5 shadow-xl dark:shadow-black/60 border border-slate-200/60 dark:border-white/5 border-l-4 border-l-[#E95A0C]">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100 mb-4">
              <i className="fas fa-info-circle text-[#E95A0C] text-sm"></i>
              <h3 className="text-xs font-black text-[#4A2E1B] dark:text-white uppercase tracking-wider m-0">DATOS DE LA VENTA</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field icon="fas fa-barcode" label="Código" value={venta.codigo} />
              <Field icon="fas fa-wallet" label="Método de pago" value={venta.metodoPago} />
              <Field icon="fas fa-user-tie" label="Cliente" value={venta.clienteNombre} />
              <Field icon="fas fa-phone" label="Teléfono" value={venta.telefono} />
              <Field icon="fas fa-chair" label="Mesa" value={venta.mesa ? `Mesa ${venta.mesa}` : null} />
              <Field icon="fas fa-calendar" label="Fecha" value={fecha} />
              <Field icon="fas fa-circle-check" label="Estado" value={venta.estado} />
              <Field icon="fas fa-print" label="Cobrada en" value={formatearFecha(venta.pagadoEn)} />
            </div>
          </div>

          <div className="bg-white dark:bg-[#040408] rounded-2xl p-5 shadow-xl dark:shadow-black/60 border border-slate-200/60 dark:border-white/5 border-l-4 border-l-[#E95A0C]">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100 mb-4">
              <i className="fas fa-list-check text-[#E95A0C] text-sm"></i>
              <h3 className="text-xs font-black text-[#4A2E1B] dark:text-white uppercase tracking-wider m-0">ÍTEMS DE LA VENTA ({items.length})</h3>
            </div>
            <div className="space-y-2">
              {items.map((it, i) => (
                <div key={i} className="flex items-center gap-3 p-2.5 rounded-xl bg-orange-50/40 dark:bg-orange-950/10 border border-orange-100/60">
                  <div className="w-10 h-10 rounded-xl overflow-hidden bg-white border border-gray-200 shrink-0">
                    {it.imagen ? <img src={it.imagen} alt={it.nombre} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-[#E95A0C]"><i className="fas fa-utensils text-sm"></i></div>}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] font-black text-[#111827] truncate">{it.nombre}</p>
                    <p className="text-[9px] font-bold text-gray-400">{it.cantidad} × Bs. {it.precio.toFixed(2)}{it.quitar && it.quitar.length ? ` · Sin: ${it.quitar.join(', ')}` : ''}</p>
                  </div>
                  <span className="text-[13px] font-black text-[#FF4D00] whitespace-nowrap">Bs. {(it.precio * it.cantidad).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between px-3 py-2.5 rounded-xl bg-[#FFF5EC] border border-orange-200/60">
              <span className="text-sm font-black uppercase tracking-wide text-gray-500">TOTAL</span>
              <span className="text-2xl font-black text-[#FF4D00]">{formatearBs(venta.total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VentaShowView;