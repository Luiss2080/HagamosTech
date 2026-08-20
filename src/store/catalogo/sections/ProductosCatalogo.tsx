import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CircuitBackground from '../../../components/fondos/FondoTech';
import useCarritoStore from '../../useCarritoStore';
import CATEGORIAS from '../data/productos';

interface Producto {
  id: string;
  nombre: string;
  tipo: string;
  subtitulo: string;
  precio: number;
  precioAntes?: number;
  imagen: string;
  descripcion: string;
  incluye?: string[];
  icono: string;
  categoria: string;
  categoriaId: string;
  categoriaIcono: string;
  categoriaColor: string;
}

interface ProductosProps {
  categoriaActiva: string;
  setCategoriaActiva: (id: string) => void;
  busqueda: string;
  setBusqueda: (b: string) => void;
  vista: 'grid' | 'list';
  setVista: (v: 'grid' | 'list') => void;
}

const ProductosCatalogo: React.FC<ProductosProps> = ({
  categoriaActiva, setCategoriaActiva, busqueda, setBusqueda, vista, setVista
}) => {
  const navigate = useNavigate();
  const addItem = useCarritoStore((s) => s.addItem);
  const [orden, setOrden] = useState<'relevancia' | 'menor' | 'mayor'>('relevancia');
  const [agregadoId, setAgregadoId] = useState<string | null>(null);
  const categoria = categoriaActiva === 'todos' ? null : (CATEGORIAS.find(c => c.id === categoriaActiva) || null);

  const todosLosProductos = useMemo(() => {
    const todos: Producto[] = [];
    for (const cat of CATEGORIAS) {
      for (const prod of cat.productos) {
        todos.push({ ...prod, categoria: cat.nombre, categoriaId: cat.id, categoriaIcono: cat.icono, categoriaColor: cat.color });
      }
    }
    return todos;
  }, []);

  const productosBase = categoria ? (categoria.productos as unknown as Producto[]) : todosLosProductos;

  let productosFiltrados = productosBase.filter(p => {
    const coincideBusqueda = p.nombre.toLowerCase().includes(busqueda.toLowerCase()) || (p.descripcion || '').toLowerCase().includes(busqueda.toLowerCase());
    return coincideBusqueda;
  });

  if (orden === 'menor') productosFiltrados = [...productosFiltrados].sort((a, b) => a.precio - b.precio);
  if (orden === 'mayor') productosFiltrados = [...productosFiltrados].sort((a, b) => b.precio - a.precio);

  const totalProductos = todosLosProductos.length;
  const colorDefault = 'bg-[#FF4D00]';

  const handleAgregar = (producto: Producto, e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(producto.id, 1);
    setAgregadoId(producto.id);
    setTimeout(() => setAgregadoId(null), 1800);
  };

  const CardProducto = ({ producto }: { producto: Producto }) => {
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

          {/* Badge descuento */}
          {descuento > 0 && (
            <span className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-full text-[9px] font-black shadow-md animate-pulse">
              -{descuento}%
            </span>
          )}
          {/* Badge tipo */}
          <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-full ${prodColor} text-white text-[8px] font-black uppercase tracking-wider shadow-md flex items-center gap-1`}>
            <i className="fas fa-tag text-[7px]"></i>{producto.tipo}
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

          {/* Descripción corta */}
          <p className="text-[10px] text-slate-500 font-medium leading-relaxed line-clamp-2 text-center mb-2">{producto.descripcion}</p>

          {/* Tags de ingredientes */}
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
      <section id="seccion-productos" className="relative z-10 py-4 scroll-mt-28">
        <CircuitBackground />
        <div className="container mx-auto px-6 max-w-7xl relative z-20">
          {/* Título + descripción */}
          <div className="text-center mb-6 relative z-10">
            <span className="inline-block py-1.5 px-4 rounded-full bg-[#FF4D00]/10 text-[#FF4D00] text-[10px] font-black tracking-widest uppercase mb-4 border border-[#FF4D00]/20">
              <i className="fas fa-layer-group text-[#FF4D00] mr-1"></i> Categorías
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading text-[#8B4513] mb-2 leading-tight">
              ¿Qué querés <span className="relative inline-block px-2 text-[#FF4D00]">
                pedir?
                <svg className="absolute w-full h-3 -bottom-1.5 left-0 z-[-1] text-amber-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.55)]" viewBox="0 0 200 12" preserveAspectRatio="none" fill="none"><path d="M8,8 C22,5 38,7.5 55,7.5 C130,7.5 165,7.5 188,7.5 C194,7.5 198,6 196,7.5" stroke="currentColor" strokeWidth="7" strokeLinecap="round"/></svg>
              </span>
            </h2>
            <p className="text-[#1F2937] font-medium max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
              Elegí una categoría para explorar todos sus sabores y encontrar tu favorito.
            </p>
          </div>

          {/* Categorías en una fila */}
          <div className="flex flex-wrap justify-center gap-2.5 mb-6">
            <button
              onClick={() => { setCategoriaActiva('todos'); }}
              className={`group relative flex items-center gap-2 px-5 py-3 rounded-[1.2rem] text-[11px] font-black uppercase tracking-wider transition-all duration-300 border-2 overflow-hidden ${categoriaActiva === 'todos'
                ? 'bg-gradient-to-r from-[#FF4D00] to-[#CC3D00] text-white border-[#FF4D00] shadow-lg shadow-orange-500/25 scale-105'
                : 'bg-white text-[#8B4513] border-orange-200 hover:border-[#FF4D00]/50 hover:-translate-y-0.5 hover:shadow-md'}`}
            >
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors"></div>
              <span className="relative z-10 flex items-center gap-2">
                <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-[11px] ${categoriaActiva === 'todos' ? 'bg-white/20 text-white' : 'bg-[#FF4D00]/10 text-[#FF4D00]'}`}><i className="fas fa-box-open"></i></span>
                Todos
              </span>
              <span className={`relative z-10 px-2 py-0.5 rounded-full text-[9px] ${categoriaActiva === 'todos' ? 'bg-white/20 text-white' : 'bg-[#FF4D00]/10 text-[#FF4D00]'}`}>{totalProductos}</span>
            </button>
            {CATEGORIAS.map((cat) => (
              <button
                key={cat.id}
                onClick={() => { setCategoriaActiva(cat.id); }}
                className={`group relative flex items-center gap-2 px-5 py-3 rounded-[1.2rem] text-[11px] font-black uppercase tracking-wider transition-all duration-300 border-2 overflow-hidden ${categoriaActiva === cat.id
                  ? `${cat.color} text-white border-white shadow-lg scale-105`
                  : 'bg-white text-[#8B4513] border-orange-200 hover:border-[#FF4D00]/50 hover:-translate-y-0.5 hover:shadow-md'}`}
              >
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors"></div>
                <span className="relative z-10 flex items-center gap-2">
                  <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-[11px] ${categoriaActiva === cat.id ? 'bg-white/20 text-white' : 'bg-[#FF4D00]/10 text-[#FF4D00]'}`}><i className={`fas ${cat.icono}`}></i></span>
                  {cat.nombre}
                </span>
                <span className={`relative z-10 px-2 py-0.5 rounded-full text-[9px] ${categoriaActiva === cat.id ? 'bg-white/20 text-white' : 'bg-[#FF4D00]/10 text-[#FF4D00]'}`}>{cat.productos.length}</span>
              </button>
            ))}
          </div>

          {/* Buscador mejorado */}
          <div className="relative rounded-[2rem] p-5 shadow-lg shadow-orange-100/40 border-2 border-orange-100 bg-white overflow-hidden mb-6">
            {/* Decoración de fondo */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FF4D00] via-[#8B3A13] to-[#FF4D00]"></div>
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#FF4D00]/5 rounded-full blur-2xl pointer-events-none"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-orange-50 rounded-full blur-2xl pointer-events-none"></div>

            <div className="relative z-10 flex flex-col lg:flex-row gap-3 items-stretch lg:items-center">
              {/* Búsqueda */}
              <div className="relative flex-1 group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-[#FF4D00]/10 text-[#FF4D00] flex items-center justify-center group-focus-within:bg-[#FF4D00] group-focus-within:text-white transition-all duration-300">
                  <i className="fas fa-search text-sm"></i>
                </div>
                <input
                  type="text"
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  placeholder="Buscá tu producto favorito..."
                  className="w-full pl-14 pr-4 py-3 rounded-xl bg-[#FFFDFC] focus:ring-2 focus:ring-orange-100 outline-none transition-all text-sm font-semibold text-[#111827] border border-transparent"
                />
                {busqueda && (
                  <button onClick={() => setBusqueda('')} className="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-gray-100 hover:bg-red-50 text-gray-400 hover:text-red-500 flex items-center justify-center transition-all">
                    <i className="fas fa-times text-[10px]"></i>
                  </button>
                )}
              </div>
              {/* Ordenar */}
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 pl-1"><i className="fas fa-arrow-down-wide-short text-[#FF4D00] mr-1"></i>Ordenar</span>
                <button onClick={() => setOrden('relevancia')} className={`px-3 py-2 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all ${orden === 'relevancia' ? 'bg-[#5D3A1F] text-white shadow-sm' : 'bg-[#FFF6F6] text-[#8B4513] border border-orange-100 hover:bg-[#FF4D00]/10'}`}>Relevancia</button>
                <button onClick={() => setOrden('menor')} className={`px-3 py-2 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all ${orden === 'menor' ? 'bg-[#5D3A1F] text-white shadow-sm' : 'bg-[#FFF6F6] text-[#8B4513] border border-orange-100 hover:bg-[#FF4D00]/10'}`}>Precio ↑</button>
                <button onClick={() => setOrden('mayor')} className={`px-3 py-2 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all ${orden === 'mayor' ? 'bg-[#5D3A1F] text-white shadow-sm' : 'bg-[#FFF6F6] text-[#8B4513] border border-orange-100 hover:bg-[#FF4D00]/10'}`}>Precio ↓</button>
              </div>
              {/* Selector de vista */}
              <div className="flex items-center gap-1 bg-[#FFF6F6] rounded-xl p-1 border border-orange-100 shrink-0">
                <button onClick={() => setVista('grid')} className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${vista === 'grid' ? 'bg-gradient-to-r from-[#FF4D00] to-[#CC3D00] text-white shadow-md' : 'text-slate-400 hover:text-[#FF4D00]'}`} aria-label="Vista grilla"><i className="fas fa-grip text-sm"></i></button>
                <button onClick={() => setVista('list')} className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${vista === 'list' ? 'bg-gradient-to-r from-[#FF4D00] to-[#CC3D00] text-white shadow-md' : 'text-slate-400 hover:text-[#FF4D00]'}`} aria-label="Vista lista"><i className="fas fa-list text-sm"></i></button>
              </div>
            </div>
          </div>

          {/* Grid de productos */}
          {productosFiltrados.length === 0 ? (
            <div className="bg-white rounded-[2rem] p-16 text-center shadow-md border border-gray-100 mb-10">
              <i className="fas fa-search-minus text-5xl text-gray-300 mb-4"></i>
              <p className="text-xl font-black font-heading text-[#8B4513]">No encontramos productos</p>
              <p className="text-slate-500 font-semibold mt-1">Probá con otro nombre o categoría.</p>
            </div>
          ) : vista === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-16">
              {productosFiltrados.map((producto) => (
                <CardProducto key={producto.id} producto={producto} />
              ))}
            </div>
          ) : (
            <div className="space-y-5 pb-16">
              {productosFiltrados.map((producto) => {
                const prodColor = producto.categoriaColor || colorDefault;
                const descuento = producto.precioAntes ? Math.round((1 - producto.precio / producto.precioAntes) * 100) : 0;
                const agregado = agregadoId === producto.id;
                return (
                  <div
                    key={producto.id}
                    onClick={() => navigate(`/catalogo/${producto.id}`)}
                    className="group relative bg-white rounded-[2rem] shadow-lg shadow-orange-100/50 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col sm:flex-row border-2 border-orange-50 hover:border-[#FF4D00]/40 cursor-pointer"
                  >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FF4D00] via-[#8B3A13] to-[#FF4D00] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 z-50"></div>
                    <div className="relative w-full sm:w-44 h-40 sm:h-auto overflow-hidden shrink-0 bg-[#fef6f2]">
                      <img src={producto.imagen} alt={producto.nombre} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      <span className={`absolute top-2 left-2 px-2 py-0.5 rounded-full ${prodColor} text-white text-[8px] font-black uppercase tracking-wider shadow-md`}>{producto.tipo}</span>
                      {descuento > 0 && <span className="absolute top-2 right-2 bg-red-500 text-white px-1.5 py-0.5 rounded-full text-[8px] font-black shadow-md animate-pulse">-{descuento}%</span>}
                    </div>
                    <div className="flex-1 p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-1 mb-1">
                          {[...Array(5)].map((_, i) => (
                            <i key={i} className={`fas fa-star text-[8px] ${i < 4 ? 'text-amber-400' : 'text-gray-200'}`}></i>
                          ))}
                        </div>
                        <span className="inline-block px-2 py-0.5 rounded-full bg-[#FF4D00]/10 text-[#FF4D00] text-[8px] font-black uppercase tracking-[0.15em] border border-[#FF4D00]/15 mb-1">{producto.subtitulo}</span>
                        <h3 className="font-black font-heading text-[#8B4513] text-sm leading-tight group-hover:text-[#FF4D00] transition-colors">{producto.nombre}</h3>
                        <p className="text-[11px] text-slate-500 font-medium mt-1 line-clamp-2">{producto.descripcion}</p>
                      </div>
                      <div className="text-right shrink-0">
                        {producto.precioAntes && <p className="text-[11px] font-black text-slate-400 line-through">Bs. {producto.precioAntes}</p>}
                        <p className="text-xl font-black font-heading text-[#FF4D00]">Bs. {producto.precio}</p>
                        <div className="flex items-center gap-1.5 mt-2 justify-end">
                          <button
                            onClick={(e) => handleAgregar(producto, e)}
                            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg font-black text-[9px] uppercase tracking-wider transition-all ${agregado ? 'bg-green-500 text-white' : 'bg-[#FF4D00] text-white hover:bg-[#CC3D00]'}`}
                          >
                            <i className={`fas ${agregado ? 'fa-check' : 'fa-cart-plus'} text-[9px]`}></i>{agregado ? 'Agregado' : 'Agregar'}
                          </button>
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FF4D00]/10 text-[#FF4D00] text-[9px] font-black uppercase tracking-wider group-hover:bg-[#5D3A1F] group-hover:text-white transition-colors">
                            <i className="fas fa-eye text-[9px]"></i> Ver
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ProductosCatalogo;
