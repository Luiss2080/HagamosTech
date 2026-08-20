import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import CATEGORIAS from '../../../../store/catalogo/data/productos';
import { usePedidosStore } from '../usePedidosStore';
import ProductoConfigModal from './ProductoConfigModal';
import Calculadora from './Calculadora';
import PreviaFactura from './PreviaFactura';
import { BotonAccion, AnimatedNumber } from './ui';

const CardProducto = ({ p, onClick }) => {
  const prodColor = p.categoriaColor || 'bg-[#FF4D00]';
  const descuento = p.precioAntes ? Math.round((1 - p.precio / p.precioAntes) * 100) : 0;

  return (
    <motion.div whileHover={{ y: -5 }} onClick={onClick}
      className="group relative bg-white rounded-[1.4rem] overflow-hidden shadow-lg shadow-orange-100/40 hover:shadow-2xl hover:shadow-orange-500/15 border border-orange-50 hover:border-[#FF4D00]/40 cursor-pointer transition-all">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FF4D00] via-[#8B3A13] to-[#FF4D00] scale-x-0 group-hover:scale-x-100 transition-transform duration-700 z-30"></div>
      <div className="relative h-36 overflow-hidden bg-[#FFF5EC]">
        <img src={p.imagen} alt={p.nombre} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
        {descuento > 0 && (
          <span className="absolute top-2.5 right-2.5 bg-red-500 text-white px-2 py-0.5 rounded-full text-[9px] font-black shadow-md animate-pulse">{descuento}% OFF</span>
        )}
        <span className={`absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full ${prodColor} text-white text-[8px] font-black uppercase tracking-wider shadow-md flex items-center gap-1`}>
          <i className="fas fa-tag text-[7px]"></i>{p.tipo}
        </span>
        <div className="absolute bottom-2.5 right-2.5 flex flex-col items-end">
          {p.precioAntes && <span className="text-[10px] font-black text-white/70 line-through bg-black/40 backdrop-blur px-2 py-0.5 rounded-t-md">Bs. {p.precioAntes}</span>}
          <span className="px-3 py-1 rounded-b-md bg-[#FF4D00] text-white text-sm font-black shadow-lg">Bs. {p.precio}</span>
        </div>
      </div>
      <div className="p-3.5">
        <h4 className="font-extrabold text-[#4A2E1B] text-[13px] leading-tight truncate group-hover:text-[#FF4D00] transition-colors">{p.nombre}</h4>
        {p.descripcionCorta || p.subtitulo ? (
          <p className="text-[10px] font-bold text-gray-400 mt-0.5 truncate">{p.descripcionCorta || p.subtitulo}</p>
        ) : (
          <p className="text-[10px] font-bold text-gray-400 mt-0.5 truncate">{p.descripcion || ''}</p>
        )}
        {p.incluye && p.incluye.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {p.incluye.slice(0, 3).map((ing, i) => (
              <span key={i} className="text-[8px] font-black text-[#8B4513] bg-orange-50 border border-orange-100 px-1.5 py-0.5 rounded-md uppercase tracking-wide">
                {ing}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

const MenuPedido = ({ onRevisar }) => {
  const carrito = usePedidosStore(s => s.carrito);
  const mesa = usePedidosStore(s => s.mesaSeleccionada);
  const agregarAlCarrito = usePedidosStore(s => s.agregarAlCarrito);
  const cambiarCantidadItem = usePedidosStore(s => s.cambiarCantidadItem);
  const quitarDelCarrito = usePedidosStore(s => s.quitarDelCarrito);

  const [categoriaActiva, setCategoriaActiva] = useState(CATEGORIAS[0]?.id || 'saltenas');
  const [busqueda, setBusqueda] = useState('');
  const [productoActivo, setProductoActivo] = useState(null);
  const [panelExtra, setPanelExtra] = useState(null); // 'factura' | 'calc' | null

  const categoria = CATEGORIAS.find(c => c.id === categoriaActiva) || CATEGORIAS[0];
  const productos = (categoria.productos || []).filter(p => {
    if (!busqueda.trim()) return true;
    const t = busqueda.toLowerCase();
    return p.nombre.toLowerCase().includes(t) || (p.descripcion || '').toLowerCase().includes(t);
  });

  const total = carrito.reduce((a, i) => a + i.precio * i.cantidad, 0);
  const cant = carrito.reduce((a, i) => a + i.cantidad, 0);

  return (
    <div className="flex flex-col lg:flex-row gap-5 h-full max-w-7xl mx-auto">
      {/* Catálogo */}
      <div className="flex-1 min-w-0">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 mb-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div className="inline-flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl bg-red-50 border border-red-200 text-[#FF4D00] flex items-center justify-center"><i className="fas fa-book-open text-sm"></i></span>
              <h3 className="text-lg font-black font-heading text-[#111827]">Menú del día</h3>
            </div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-gray-200 text-[9px] font-black uppercase tracking-widest text-gray-500">
              <i className="fas fa-chair text-[#FF4D00]"></i> Mesa {mesa}
            </span>
          </div>

          <div className="flex items-center gap-2 mb-4 flex-wrap">
            {CATEGORIAS.map(c => (
              <button key={c.id} onClick={() => setCategoriaActiva(c.id)}
                className={`px-3.5 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider border transition-all cursor-pointer flex items-center gap-2 ${
                  c.id === categoriaActiva
                    ? 'bg-gradient-to-r from-[#FF4D00] to-[#D93D00] text-white border-transparent shadow-lg shadow-[#FF4D00]/25'
                    : 'bg-white text-gray-500 border-gray-200 hover:border-[#FF4D00]/50'
                }`}>
                <i className={`fas ${c.icono || 'fa-store'} text-xs`}></i>
                <span className="hidden sm:inline">{c.nombre}</span>
                <span className="sm:hidden">{c.nombre.split(' ')[0]}</span>
                <span className={`text-[9px] px-1.5 py-0.5 rounded-md ${c.id === categoriaActiva ? 'bg-white/20 text-white' : 'bg-red-50 text-[#FF4D00]'}`}>{c.productos.length}</span>
              </button>
            ))}
          </div>

          <div className="relative mb-4 max-w-sm">
            <i className="fas fa-search absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs"></i>
            <input value={busqueda} onChange={(e) => setBusqueda(e.target.value)} placeholder="Buscar en el menú..."
              className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white border-2 border-gray-100 text-gray-700 text-xs font-bold focus:border-[#FF4D00] focus:ring-4 focus:ring-red-500/10 focus:outline-none" />
          </div>
        </div>

        <div className="grid grid-cols-2 xl:grid-cols-3 gap-4">
          {productos.map(p => <CardProducto key={p.id} p={p} onClick={() => setProductoActivo(p)} />)}
          {productos.length === 0 && (
            <div className="col-span-full py-10 text-center text-gray-400 font-bold text-sm">No se encontraron productos.</div>
          )}
        </div>
      </div>

      {/* Pedido actual — columna completa */}
      <div className="w-full lg:w-[340px] shrink-0">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden lg:sticky lg:top-0 flex flex-col max-h-full">
          <div className="relative overflow-hidden bg-gradient-to-r from-[#FF4D00] to-[#D93D00] px-4 py-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2.5 text-white">
              <span className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center text-base"><i className="fas fa-chair"></i></span>
              <div>
                <p className="font-black uppercase tracking-wider text-xs font-heading">Mesa {mesa}</p>
                <p className="text-[10px] text-white/80 font-bold">{cant} ítems · Bs. {total.toFixed(2)}</p>
              </div>
            </div>
            <span className="bg-white/20 text-white text-[10px] font-black px-2 py-1 rounded-full">{cant}</span>
          </div>

          {/* Ítems */}
          <div className="p-3 space-y-2 overflow-y-auto flex-1 min-h-[180px]">
            {carrito.length === 0 && (
              <div className="text-center py-8 text-gray-400">
                <i className="fas fa-utensils text-2xl block mb-2 opacity-40"></i>
                <p className="text-[11px] font-bold">El pedido está vacío.<br />Toca un producto para agregarlo.</p>
              </div>
            )}
            {carrito.map((item, idx) => (
              <motion.div key={idx} layout initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2.5 p-2 rounded-xl bg-red-50/40 border border-red-100">
                <div className="w-11 h-11 rounded-xl overflow-hidden bg-white border border-gray-200 shrink-0">
                  <img src={item.imagen} alt={item.nombre} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-black text-[#111827] truncate">{item.nombre}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <button onClick={() => cambiarCantidadItem(idx, -1)} className="w-6 h-6 rounded-lg bg-white border border-gray-200 text-[#FF4D00] flex items-center justify-center text-[10px] cursor-pointer"><i className="fas fa-minus"></i></button>
                    <span className="w-6 text-center text-[11px] font-black text-[#111827]">x{item.cantidad}</span>
                    <button onClick={() => cambiarCantidadItem(idx, 1)} className="w-6 h-6 rounded-lg bg-white border border-gray-200 text-[#FF4D00] flex items-center justify-center text-[10px] cursor-pointer"><i className="fas fa-plus"></i></button>
                  </div>
                  {item.quitar && item.quitar.length > 0 && (
                    <p className="text-[8px] text-red-500 font-bold mt-0.5">Sin: {item.quitar.join(', ')}</p>
                  )}
                </div>
                <div className="text-right shrink-0">
                  <p className="text-[11px] font-black text-[#FF4D00]">Bs. {(item.precio * item.cantidad).toFixed(2)}</p>
                  <button onClick={() => quitarDelCarrito(idx)} className="text-red-400 hover:text-red-600 text-xs cursor-pointer mt-1"><i className="fas fa-trash-can"></i></button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Paneles extra: previa de factura / calculadora */}
          <div className="px-3 pb-2 space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => setPanelExtra(panelExtra === 'factura' ? null : 'factura')}
                className={`py-2 rounded-xl text-[9px] font-black uppercase tracking-wider border cursor-pointer transition-all flex items-center justify-center gap-1.5 ${panelExtra === 'factura' ? 'bg-[#8B4513] text-white border-transparent shadow-md' : 'bg-white text-gray-500 border-gray-200 hover:border-[#FF4D00]/50'}`}>
                <i className="fas fa-file-invoice"></i> Previa factura
              </button>
              <button onClick={() => setPanelExtra(panelExtra === 'calc' ? null : 'calc')}
                className={`py-2 rounded-xl text-[9px] font-black uppercase tracking-wider border cursor-pointer transition-all flex items-center justify-center gap-1.5 ${panelExtra === 'calc' ? 'bg-[#8B4513] text-white border-transparent shadow-md' : 'bg-white text-gray-500 border-gray-200 hover:border-[#FF4D00]/50'}`}>
                <i className="fas fa-calculator"></i> Calculadora
              </button>
            </div>

            <AnimatePresence>
              {panelExtra === 'factura' && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                  <PreviaFactura carrito={carrito} mesa={mesa} total={total} />
                </motion.div>
              )}
              {panelExtra === 'calc' && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                  <Calculadora />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Pie */}
          <div className="border-t border-gray-100 p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-black uppercase tracking-widest text-gray-400">Total a pagar</span>
              <span className="text-xl font-black text-[#FF4D00]"><AnimatedNumber value={total} prefix="Bs. " /></span>
            </div>
            <BotonAccion icon="fas fa-arrow-right" onClick={onRevisar} disabled={carrito.length === 0} className="w-full py-3">Revisar y pagar</BotonAccion>
          </div>
        </div>
      </div>

      {productoActivo && (
        <ProductoConfigModal
          producto={productoActivo}
          onClose={() => setProductoActivo(null)}
          onAgregar={(item) => { agregarAlCarrito(item); setProductoActivo(null); }}
        />
      )}
    </div>
  );
};

export default MenuPedido;