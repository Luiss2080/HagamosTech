import React from 'react';

const NuevaVentaFormView = ({
  ventaForm,
  setVentaForm,
  libros,
  submitVenta,
  ticketVenta,
  descargarTicketPDF,
  libro,
  subtotal,
  descMonto,
  total
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 font-montserrat">
      <form onSubmit={submitVenta} className="lg:col-span-2 space-y-4 bg-white p-6 rounded-2xl border border-slate-200/60 dark:border-white/5 shadow-xl dark:shadow-black/60">
        <div className="pb-2 border-b border-slate-100">
          <h4 className="text-xs font-black text-slate-850 uppercase tracking-wider flex items-center gap-2 m-0">
            <i className="fas fa-barcode text-[#E95A0C]"></i> Datos del Producto y Cliente
          </h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] font-black uppercase text-slate-500 dark:text-slate-400 mb-1.5">Libro / Producto: <b className="text-red-500">*</b></label>
            <select
              required
              value={ventaForm.libroId}
              onChange={(e) => setVentaForm(prev => ({ ...prev, libroId: e.target.value }))}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200/60 dark:border-white/5 bg-slate-50 dark:bg-[#070710] text-slate-800 dark:text-white dark:border-white/8 dark:text-slate-200 text-xs focus:ring-2 focus:ring-[#E95A0C]/40 outline-none font-bold cursor-pointer"
            >
              <option value="">-- Seleccione un libro --</option>
              {libros.map(l => (
                <option key={l.id} value={l.id} disabled={l.stockActual <= 0}>
                  {l.titulo} (Stock: {l.stockActual}) - Bs. {l.precioVenta.toFixed(2)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase text-slate-500 dark:text-slate-400 mb-1.5">Cantidad de Unidades: <b className="text-red-500">*</b></label>
            <input
              type="number"
              required
              min="1"
              value={ventaForm.cantidad}
              onChange={(e) => setVentaForm(prev => ({ ...prev, cantidad: parseInt(e.target.value) || 1 }))}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200/60 dark:border-white/5 bg-slate-50 dark:bg-[#070710] text-slate-800 dark:text-white dark:border-white/8 dark:text-slate-200 text-xs focus:ring-2 focus:ring-[#E95A0C]/40 outline-none font-bold"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] font-black uppercase text-slate-500 dark:text-slate-400 mb-1.5">Nombre del Cliente: <b className="text-red-500">*</b></label>
            <input
              type="text"
              required
              placeholder="Ej: Juan Pérez"
              value={ventaForm.clienteNombre}
              onChange={(e) => setVentaForm(prev => ({ ...prev, clienteNombre: e.target.value }))}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200/60 dark:border-white/5 bg-slate-50 dark:bg-[#070710] text-slate-800 dark:text-white dark:border-white/8 dark:text-slate-200 text-xs focus:ring-2 focus:ring-[#E95A0C]/40 outline-none font-bold"
            />
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase text-slate-500 dark:text-slate-400 mb-1.5">Contacto / Teléfono: <b className="text-red-500">*</b></label>
            <input
              type="text"
              required
              placeholder="Email o Celular"
              value={ventaForm.clienteContacto}
              onChange={(e) => setVentaForm(prev => ({ ...prev, clienteContacto: e.target.value }))}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200/60 dark:border-white/5 bg-slate-50 dark:bg-[#070710] text-slate-800 dark:text-white dark:border-white/8 dark:text-slate-200 text-xs focus:ring-2 focus:ring-[#E95A0C]/40 outline-none font-bold"
            />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#070710] border border-slate-200/60 dark:border-white/5/60">
          <div className="flex justify-between text-xs font-black uppercase text-slate-700 dark:text-slate-300 mb-2">
            <span>Descuento Comercial:</span>
            <span className="text-[#E95A0C] font-black">{ventaForm.descuento}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="50"
            step="5"
            value={ventaForm.descuento}
            onChange={(e) => setVentaForm(prev => ({ ...prev, descuento: parseInt(e.target.value) }))}
            className="w-full h-2 bg-slate-200 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#E95A0C]"
          />
          <div className="flex justify-between text-[9px] text-slate-400 font-bold mt-1">
            <span>0%</span>
            <span>25%</span>
            <span>50% (Max)</span>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#E95A0C] to-red-700 hover:from-red-700 hover:to-[#E95A0C] text-white text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-md shadow-orange-900/5 dark:shadow-none border border-red-500/20"
        >
          ✓ Emitir Venta & Restar Inventario
        </button>
      </form>

      {/* Totales y Comprobante */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/60 dark:border-white/5 shadow-xl dark:shadow-black/60 flex flex-col justify-between">
        <div>
          <h4 className="text-xs font-black text-slate-850 uppercase tracking-wider mb-4 pb-2 border-b border-slate-100 flex items-center gap-2 m-0">
            <i className="fas fa-receipt text-[#E95A0C]"></i> Desglose Financiero
          </h4>
          
          <div className="space-y-3 text-xs">
            <div className="flex justify-between text-slate-500 dark:text-slate-400 font-medium">
              <span>Precio Unitario:</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">Bs. {(libro?.precioVenta || 0).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-500 dark:text-slate-400 font-medium">
              <span>Subtotal:</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">Bs. {subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-rose-600 font-bold">
              <span>Descuento ({ventaForm.descuento}%):</span>
              <span>- Bs. {descMonto.toFixed(2)}</span>
            </div>
            <div className="h-px bg-slate-100 dark:bg-[#070710] my-2"></div>
            <div className="flex justify-between text-slate-850 text-base font-black">
              <span>Total a Pagar:</span>
              <span className="text-[#E95A0C]">Bs. {total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {ticketVenta && (
          <div className="mt-6 p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 rounded-xl text-center">
            <p className="text-xs font-black text-[#E95A0C]merald-700 mb-2.5">✓ Venta registrada correctamente</p>
            <button
              onClick={descargarTicketPDF}
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-black uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20"
            >
              <i className="fas fa-file-pdf"></i>
              Descargar Ticket PDF
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NuevaVentaFormView;






















