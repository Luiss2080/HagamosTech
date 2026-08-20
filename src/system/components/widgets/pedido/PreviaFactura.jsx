import React from 'react';

const PreviaFactura = ({ carrito, mesa, total }) => {
  const hoy = new Date().toLocaleString([], { dateStyle: 'short', timeStyle: 'short' });
  const cant = carrito.reduce((a, i) => a + i.cantidad, 0);

  return (
    <div className="rounded-xl border border-dashed border-gray-300 bg-[#FFFDF9] p-4 font-mono text-[11px] text-gray-700">
      <div className="text-center pb-2 mb-2 border-b border-dashed border-gray-300">
        <p className="font-black text-[#FF4D00] text-sm tracking-widest">HAGAMOSTECH</p>
        <p className="text-[9px] uppercase tracking-widest text-gray-400">Salteñería Tradicional</p>
      </div>

      <div className="flex justify-between mb-1">
        <span className="text-gray-400 uppercase text-[9px]">Pedido</span>
        <span className="font-bold">Pre-vista · Mesa {mesa}</span>
      </div>
      <div className="flex justify-between mb-2">
        <span className="text-gray-400 uppercase text-[9px]">Fecha</span>
        <span>{hoy}</span>
      </div>

      <div className="my-2 border-t border-dashed border-gray-300"></div>

      <div className="space-y-1 mb-2">
        {carrito.map((it, i) => (
          <div key={i} className="flex justify-between gap-2">
            <span className="leading-tight">
              {it.cantidad}× {it.nombre}
              {it.quitar && it.quitar.length > 0 && (
                <span className="text-red-500 block text-[9px]">sin {it.quitar.join(', ')}</span>
              )}
            </span>
            <span className="whitespace-nowrap">Bs. {(it.precio * it.cantidad).toFixed(2)}</span>
          </div>
        ))}
        {carrito.length === 0 && <p className="text-center text-gray-400 py-2">Sin ítems todavía</p>}
      </div>

      <div className="my-2 border-t border-dashed border-gray-300"></div>

      <div className="flex justify-between items-center">
        <span className="uppercase tracking-widest text-[9px] text-gray-400">Total · {cant} ítems</span>
        <span className="font-black text-base text-[#FF4D00]">Bs. {total.toFixed(2)}</span>
      </div>

      <div className="mt-3 pt-2 border-t border-dashed border-gray-300 text-center">
        <p className="text-[9px] text-gray-400">* Este es un previsualización del comprobante que se imprimirá en caja.</p>
      </div>
    </div>
  );
};

export default PreviaFactura;