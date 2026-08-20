import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { BotonAccion } from './ui';

const ProductoConfigModal = ({ producto, onClose, onAgregar }) => {
  const [cantidad, setCantidad] = useState(1);
  const [ingredientes, setIngredientes] = useState(
    (producto.incluye || []).map(nombre => ({ nombre, activo: true }))
  );
  const quitar = ingredientes.filter(i => !i.activo).map(i => i.nombre);
  const subtotal = producto.precio * cantidad;
  const categoriaColor = producto.categoriaColor || 'bg-[#FF4D00]';
  const descuento = producto.precioAntes ? Math.round((1 - producto.precio / producto.precioAntes) * 100) : 0;

  const agregar = () => onAgregar({
    productoId: producto.id,
    nombre: producto.nombre,
    imagen: producto.imagen,
    precio: producto.precio,
    cantidad,
    tipo: producto.tipo,
    categoriaColor,
    quitar
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[400] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 font-montserrat"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.95 }}
        transition={{ type: 'spring', bounce: 0.25 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg bg-white rounded-[2rem] overflow-hidden shadow-2xl border border-gray-200"
      >
        <div className="relative h-56 overflow-hidden bg-[#FFF5EC]">
          <img src={producto.imagen} alt={producto.nombre} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
          {descuento > 0 && (
            <span className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-full text-[9px] font-black shadow-md">{descuento}% OFF</span>
          )}
          <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-full ${categoriaColor} text-white text-[9px] font-black uppercase tracking-wider shadow-md`}>{producto.tipo}</span>
          <button onClick={onClose} className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-gray-700 flex items-center justify-center shadow-lg cursor-pointer">
            <i className="fas fa-times text-sm"></i>
          </button>
          <div className="absolute bottom-3 left-4 right-4">
            <h3 className="text-white font-black text-xl leading-tight drop-shadow-md font-heading">{producto.nombre}</h3>
            {producto.subtitulo && <p className="text-white/80 text-xs font-bold">{producto.subtitulo}</p>}
          </div>
        </div>

        <div className="p-5 space-y-4">
          {producto.descripcion && (
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1"><i className="fas fa-circle-info text-[#FF4D00] mr-1"></i>Descripción</p>
              <p className="text-[12px] text-gray-600 font-medium leading-relaxed">{producto.descripcion}</p>
            </div>
          )}

          {ingredientes.length > 0 && (
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2 flex items-center gap-1.5">
                <i className="fas fa-sliders text-[#FF4D00]"></i> Personalizar ingredientes
              </p>
              <div className="flex flex-wrap gap-2">
                {ingredientes.map((ing, i) => (
                  <button
                    key={i}
                    onClick={() => setIngredientes(prev => prev.map((x, j) => j === i ? { ...x, activo: !x.activo } : x))}
                    className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wide border transition-all cursor-pointer ${
                      ing.activo
                        ? 'bg-[#FF4D00] text-white border-[#FF4D00] shadow-md'
                        : 'bg-white text-gray-400 border-gray-200 line-through'
                    }`}
                  >
                    {ing.nombre}
                  </button>
                ))}
              </div>
              {quitar.length > 0 && (
                <p className="text-[10px] font-bold text-red-500 mt-2"><i className="fas fa-ban mr-1"></i>Sin: {quitar.join(', ')}</p>
              )}
            </div>
          )}

          <div className="flex items-center justify-between bg-[#FFF5EC] rounded-xl p-3 border border-orange-200/60">
            <div className="flex items-center gap-2.5">
              <button onClick={() => setCantidad(c => Math.max(1, c - 1))} className="w-9 h-9 rounded-xl bg-white border border-gray-200 text-gray-700 font-black shadow-sm hover:border-[#FF4D00] transition-colors cursor-pointer"><i className="fas fa-minus text-xs"></i></button>
              <span className="w-10 text-center text-lg font-black text-[#111827]">{cantidad}</span>
              <button onClick={() => setCantidad(c => c + 1)} className="w-9 h-9 rounded-xl bg-white border border-gray-200 text-gray-700 font-black shadow-sm hover:border-[#FF4D00] transition-colors cursor-pointer"><i className="fas fa-plus text-xs"></i></button>
            </div>
            <div className="text-right">
              <span className="block text-[9px] text-gray-400 font-black uppercase tracking-widest">Total ítem</span>
              <span className="text-lg font-black text-[#FF4D00]">Bs. {subtotal.toFixed(2)}</span>
            </div>
          </div>

          <BotonAccion icon="fas fa-cart-plus" onClick={agregar} className="w-full py-3.5">Agregar al pedido</BotonAccion>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProductoConfigModal;