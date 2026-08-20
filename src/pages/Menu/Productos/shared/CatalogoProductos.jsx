import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CircuitBackground from '../../../../components/fondos/FondoTech';
import PageHero from '../../../../components/func/MigasPan';
import useCarritoStore from '../../../../store/useCarritoStore';
import CATEGORIAS from '../../../../store/catalogo/data/productos';

const colorDefault = 'bg-[#FF4D00]';

const CatalogoProductos = ({ categoriaId, tipo, titulo, resaltado, descripcion }) => {
  const navigate = useNavigate();
  const addItem = useCarritoStore((s) => s.addItem);
  const [agregadoId, setAgregadoId] = useState(null);

  const productos = useMemo(() => {
    const lista = [];
    for (const cat of CATEGORIAS) {
      if (categoriaId && cat.id !== categoriaId) continue;
      for (const prod of cat.productos) {
        if (tipo && prod.tipo !== tipo) continue;
        lista.push({ ...prod, categoria: cat.nombre, categoriaId: cat.id, categoriaIcono: cat.icono, categoriaColor: cat.color });
      }
    }
    return lista;
  }, [categoriaId, tipo]);

  const categoria = categoriaId ? CATEGORIAS.find(c => c.id === categoriaId) : null;

  const handleAgregar = (producto, e) => {
    e.stopPropagation();
    addItem(producto.id, 1, {
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      imagen: producto.imagen,
      tipo: producto.tipo,
      icono: producto.icono || 'fa-star',
      subtitulo: producto.subtitulo,
    });
    setAgregadoId(producto.id);
    setTimeout(() => setAgregadoId(null), 1800);
  };

  const CardProducto = ({ producto }) => {
    const prodColor = producto.categoriaColor || colorDefault;
    const descuento = producto.precioAntes ? Math.round((1 - producto.precio / producto.precioAntes) * 100) : 0;
    const agregado = agregadoId === producto.id;
    return (
      <div
        className="group relative bg-white rounded-[2rem] shadow-lg shadow-orange-100/50 hover:shadow-2xl hover:shadow-orange-500/15 hover:-translate-y-1.5 transition-all duration-500 overflow-hidden border-2 border-orange-50 hover:border-[#FF4D00]/40 cursor-pointer"
        onClick={() => navigate(`/catalogo/${producto.id}`)}
      >
        {/* Línea gradiente superior */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FF4D00] via-[#8B3A13] to-[#FF4D00] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 z-50"></div>
        {/* Blob decorativo */}
        <div className="absolute -top-10 -right-10 w-28 h-28 bg-[#FF4D00]/5 rounded-full blur-2xl pointer-events-none group-hover:bg-[#FF4D00]/15 group-hover:scale-150 transition-all duration-700"></div>

        {/* Imagen */}
        <div className="relative h-44 overflow-hidden bg-[#fef6f2]">
          <img src={producto.imagen} alt={producto.nombre} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent"></div>

          {descuento > 0 && (
            <span className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-full text-[9px] font-black shadow-md animate-pulse">
              -{descuento}%
            </span>
          )}
          <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-full ${prodColor} text-white text-[8px] font-black uppercase tracking-wider shadow-md flex items-center gap-1`}>
            <i className={`fas ${producto.icono || 'fa-star'} text-[7px]`}></i>{producto.tipo}
          </span>

          {/* Precio con rebaja */}
          <div className="absolute bottom-3 right-3 flex flex-col items-end">
            {producto.precioAntes && (
              <span className="text-[10px] font-black text-white/60 line-through bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-t-md">Bs. {producto.precioAntes}</span>
            )}
            <span className="px-3 py-1 rounded-b-md bg-[#FF4D00] text-white text-sm font-black shadow-lg">Bs. {producto.precio}</span>
          </div>

          {/* Overlay hover */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/30">
            <span className="px-5 py-2.5 rounded-full bg-white text-[#FF4D00] font-black text-[10px] uppercase tracking-wider shadow-xl flex items-center gap-2 group-hover:scale-105 transition-transform">
              <i className="fas fa-eye text-xs"></i> Ver detalle
            </span>
          </div>
        </div>

        {/* Contenido */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <i key={i} className={`fas fa-star text-[8px] ${i < 4 ? 'text-amber-400' : 'text-gray-200'}`}></i>
              ))}
              <span className="text-[8px] font-black text-slate-400 ml-0.5">4.9</span>
            </div>
            <span className="text-[8px] font-black text-green-600"><i className="fas fa-circle text-[5px] mr-1"></i>Disponible</span>
          </div>
          <div className="text-center mb-2">
            <span className="inline-block px-2 py-0.5 rounded-full bg-[#FF4D00]/10 text-[#FF4D00] text-[8px] font-black uppercase tracking-[0.15em] border border-[#FF4D00]/15 mb-1">{producto.subtitulo}</span>
            <h3 className="font-black font-heading text-[#8B4513] text-sm leading-tight group-hover:text-[#FF4D00] transition-colors">{producto.nombre}</h3>
          </div>

          {/* Descripción de 2+ líneas */}
          <p className="text-[10px] text-slate-600 font-medium leading-relaxed line-clamp-3 text-center mb-2 min-h-[3.75rem]">{producto.descripcion}</p>

          {producto.incluye && producto.incluye.length > 0 && (
            <div className="flex flex-wrap justify-center gap-1 mb-3">
              {producto.incluye.slice(0, 3).map((inc, i) => (
                <span key={i} className="inline-flex items-center gap-0.5 text-[7px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-[#8B4513]/5 text-[#8B4513] border border-[#8B4513]/10">
                  <i className="fas fa-circle-check text-[#FF4D00] text-[6px]"></i>{inc}
                </span>
              ))}
            </div>
          )}

          {/* Botones */}
          <div className="grid grid-cols-2 gap-1.5">
            <button
              onClick={(e) => handleAgregar(producto, e)}
              className={`flex items-center justify-center gap-1.5 py-2 rounded-lg font-black text-[9px] uppercase tracking-wider transition-all ${agregado ? 'bg-green-500 text-white' : 'bg-[#FF4D00] hover:bg-[#CC3D00] text-white shadow-sm hover:shadow-md hover:-translate-y-0.5'}`}
            >
              <i className={`fas ${agregado ? 'fa-check' : 'fa-cart-plus'} text-[9px]`}></i>
              {agregado ? '¡Agregado!' : 'Agregar'}
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); navigate(`/catalogo/${producto.id}`); }}
              className="flex items-center justify-center gap-1.5 py-2 rounded-lg bg-[#5D3A1F] hover:bg-[#452A16] text-white font-black text-[9px] uppercase tracking-wider transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
            >
              <i className="fas fa-eye text-[9px]"></i> Ver detalle
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="relative">
      <div className="relative z-10">
        <CircuitBackground />
        <PageHero title={titulo} highlight={resaltado} description={descripcion} />
      </div>

      <section className="relative z-10 py-4">
        <div className="container mx-auto px-6 max-w-7xl relative z-20">
          {/* Cabecera de categoría */}
          {categoria && (
            <div className="flex items-center justify-between mb-5 pb-3 border-b border-dashed border-orange-100">
              <div className="flex items-center gap-3">
                <span className={`w-10 h-10 rounded-2xl ${categoria.color} text-white flex items-center justify-center shadow-lg`}>
                  <i className={`fas ${categoria.icono} text-base`}></i>
                </span>
                <div>
                  <h3 className="text-lg font-black font-heading text-[#8B4513] leading-tight">{categoria.nombre}</h3>
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 line-clamp-2">{categoria.descripcion}</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FF4D00]/10 text-[#FF4D00] text-[9px] font-black uppercase tracking-widest border border-[#FF4D00]/20">
                <i className="fas fa-fire text-[9px]"></i>{productos.length} productos
              </span>
            </div>
          )}

          {/* Grid de productos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {productos.map((producto) => (
              <CardProducto key={producto.id} producto={producto} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CatalogoProductos;
