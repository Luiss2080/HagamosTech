import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import CircuitBackground from '../../../../components/fondos/FondoSaltenas';
import useCarritoStore from '../../../useCarritoStore';
import CATEGORIAS from '../../data/productos';

interface RelacionadosProps {
  producto: any;
}

const colorDefault = 'bg-[#FF4D00]';
const AUTOPLAY_MS = 4000;
const VISIBLE = 4;

const repetirMinimo = (productos: any[], min: number) => {
  const lista = [...productos];
  let i = 0;
  while (lista.length < min) {
    lista.push({ ...productos[i % productos.length], _rep: i });
    i++;
  }
  return lista;
};

const Relacionados: React.FC<RelacionadosProps> = ({ producto }) => {
  const navigate = useNavigate();
  const addItem = useCarritoStore((s) => s.addItem);
  const [agregadoId, setAgregadoId] = useState<string | null>(null);

  const otrasCategorias = CATEGORIAS.filter(c => c.id !== producto.categoriaId).slice(0, 2);
  const filas = otrasCategorias.map(cat => ({
    categoria: cat,
    productos: repetirMinimo(cat.productos, 6),
  }));

  const [pausado, setPausado] = useState(false);
  // posiciones reales en el track triple (empieza en el centro)
  const [posiciones, setPosiciones] = useState<number[]>(() => filas.map(f => f.productos.length));
  const [animando, setAnimando] = useState<boolean[]>(() => filas.map(() => true));

  const avanzar = useCallback((i: number) => {
    setPosiciones(prev => prev.map((pos, j) => {
      if (j !== i) return pos;
      const total = filas[i].productos.length;
      const limite = total * 2;
      const nuevo = pos + 1;
      if (nuevo >= limite) {
        // resetear sin transición (misma visual)
        setAnimando(an => an.map((v, k) => k === i ? false : v));
        setTimeout(() => setAnimando(an => an.map((v, k) => k === i ? true : v)), 50);
        return total;
      }
      return nuevo;
    }));
  }, [filas]);

  const anterior = useCallback((i: number) => {
    setPosiciones(prev => prev.map((pos, j) => {
      if (j !== i) return pos;
      const total = filas[i].productos.length;
      const limite = total * 2;
      const nuevo = pos - 1;
      if (nuevo < total) {
        // saltar al final sin transición (misma visual)
        setAnimando(an => an.map((v, k) => k === i ? false : v));
        setTimeout(() => setAnimando(an => an.map((v, k) => k === i ? true : v)), 50);
        return limite - 1;
      }
      return nuevo;
    }));
  }, [filas]);

  useEffect(() => {
    if (pausado) return;
    const timers = filas.map((_, i) => window.setInterval(() => avanzar(i), AUTOPLAY_MS));
    return () => timers.forEach(t => clearInterval(t));
  }, [pausado, filas, avanzar]);

  if (filas.length === 0) return null;

  const handleAgregar = (prod: any, e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(prod.id, 1);
    setAgregadoId(prod.id);
    setTimeout(() => setAgregadoId(null), 1800);
  };

  const irA = (i: number, target: number) => {
    const total = filas[i].productos.length;
    const base = total;
    const dest = base + ((target % total) + total) % total;
    setPosiciones(prev => prev.map((p, j) => j === i ? dest : p));
  };

  const CardProducto = ({ prod, cat }: { prod: any; cat: any }) => {
    const prodColor = cat.color || colorDefault;
    const descuento = prod.precioAntes ? Math.round((1 - prod.precio / prod.precioAntes) * 100) : 0;
    const agregado = agregadoId === prod.id;
    return (
      <div
        className="group relative bg-white rounded-[2rem] shadow-lg shadow-orange-100/50 hover:shadow-2xl hover:shadow-orange-500/15 hover:-translate-y-1.5 transition-all duration-500 overflow-hidden border-2 border-orange-50 hover:border-[#FF4D00]/40 cursor-pointer"
        onClick={() => navigate(`/catalogo/${prod.id}`)}
      >
        {/* Línea gradiente superior */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FF4D00] via-[#8B3A13] to-[#FF4D00] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 z-50"></div>
        {/* Blob decorativo */}
        <div className="absolute -top-10 -right-10 w-28 h-28 bg-[#FF4D00]/5 rounded-full blur-2xl pointer-events-none group-hover:bg-[#FF4D00]/15 group-hover:scale-150 transition-all duration-700"></div>

        {/* Imagen */}
        <div className="relative h-44 overflow-hidden bg-[#fef6f2]">
          <img src={prod.imagen} alt={prod.nombre} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent"></div>

          {descuento > 0 && (
            <span className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-full text-[9px] font-black shadow-md animate-pulse">
              -{descuento}%
            </span>
          )}
          <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-full ${prodColor} text-white text-[8px] font-black uppercase tracking-wider shadow-md flex items-center gap-1`}>
            <i className={`fas ${cat.icono} text-[7px]`}></i>{prod.tipo}
          </span>

          {/* Precio con rebaja */}
          <div className="absolute bottom-3 right-3 flex flex-col items-end">
            {prod.precioAntes && (
              <span className="text-[10px] font-black text-white/60 line-through bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-t-md">Bs. {prod.precioAntes}</span>
            )}
            <span className="px-3 py-1 rounded-b-md bg-[#FF4D00] text-white text-sm font-black shadow-lg">Bs. {prod.precio}</span>
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
            <span className="inline-block px-2 py-0.5 rounded-full bg-[#FF4D00]/10 text-[#FF4D00] text-[8px] font-black uppercase tracking-[0.15em] border border-[#FF4D00]/15 mb-1">{prod.subtitulo}</span>
            <h3 className="font-black font-heading text-[#8B4513] text-sm leading-tight group-hover:text-[#FF4D00] transition-colors">{prod.nombre}</h3>
          </div>

          {/* Descripción de 2+ líneas */}
          <p className="text-[10px] text-slate-600 font-medium leading-relaxed line-clamp-3 text-center mb-2 min-h-[3.75rem]">{prod.descripcion}</p>

          {prod.incluye && prod.incluye.length > 0 && (
            <div className="flex flex-wrap justify-center gap-1 mb-3">
              {prod.incluye.slice(0, 3).map((inc: string, i: number) => (
                <span key={i} className="inline-flex items-center gap-0.5 text-[7px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-[#8B4513]/5 text-[#8B4513] border border-[#8B4513]/10">
                  <i className="fas fa-circle-check text-[#FF4D00] text-[6px]"></i>{inc}
                </span>
              ))}
            </div>
          )}

          {/* Botones */}
          <div className="grid grid-cols-2 gap-1.5">
            <button
              onClick={(e) => handleAgregar(prod, e)}
              className={`flex items-center justify-center gap-1.5 py-2 rounded-lg font-black text-[9px] uppercase tracking-wider transition-all ${agregado ? 'bg-green-500 text-white' : 'bg-[#FF4D00] hover:bg-[#CC3D00] text-white shadow-sm hover:shadow-md hover:-translate-y-0.5'}`}
            >
              <i className={`fas ${agregado ? 'fa-check' : 'fa-cart-plus'} text-[9px]`}></i>
              {agregado ? '¡Agregado!' : 'Agregar'}
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); navigate(`/catalogo/${prod.id}`); }}
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
      <section className="relative z-10 py-4">
        <CircuitBackground />
        <div className="container mx-auto px-6 max-w-7xl relative z-20">
          <div className="text-center mb-4 relative z-10">
            <span className="inline-block py-1.5 px-4 rounded-full bg-[#5D3A1F]/10 text-[#5D3A1F] text-[10px] font-black tracking-widest uppercase mb-4 border border-[#5D3A1F]/20">
              <i className="fas fa-link text-[#5D3A1F] mr-1"></i> También te puede gustar
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading text-[#8B4513] mb-3 leading-tight">
              Otras <span className="relative inline-block text-[#FF4D00]">
                categorías
                <svg className="absolute w-full h-3 -bottom-1.5 left-0 z-[-1] text-amber-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.55)]" viewBox="0 0 200 12" preserveAspectRatio="none" fill="none"><path d="M8,8 C22,5 38,7.5 55,7.5 C130,7.5 165,7.5 188,7.5 C194,7.5 198,6 196,7.5" stroke="currentColor" strokeWidth="7" strokeLinecap="round"/></svg>
              </span>
            </h2>
            <p className="text-[#1F2937] font-medium max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
              Explorá más sabores de nuestra casa: nuevas opciones para combinar, sorprender y disfrutar en cada pedido. Elegí entre lo más pedido de cada familia de productos.
            </p>
          </div>

          {filas.map((fila, idx) => {
            const total = fila.productos.length;
            const tripled = [...fila.productos, ...fila.productos, ...fila.productos];
            const pos = posiciones[idx];
            const conTransicion = animando[idx];
            const indiceReal = (pos - total + total) % total;
            const mostrarDots = total;

            return (
              <div key={fila.categoria.id} className={idx < filas.length - 1 ? 'mb-8' : ''}>
                {/* Encabezado de fila mejorado */}
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-dashed border-orange-100">
                  <div className="flex items-center gap-3">
                    <span className={`w-10 h-10 rounded-2xl ${fila.categoria.color} text-white flex items-center justify-center shadow-lg`}>
                      <i className={`fas ${fila.categoria.icono} text-base`}></i>
                    </span>
                    <div>
                      <h3 className="text-lg font-black font-heading text-[#8B4513] leading-tight">{fila.categoria.nombre}</h3>
                      <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 line-clamp-2">{fila.categoria.descripcion}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FFF6F6] border border-orange-100 text-[9px] font-black uppercase tracking-widest text-[#5D3A1F]">
                      <i className="fas fa-fire text-[#FF4D00] text-[9px]"></i>{total} productos
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FF4D00]/10 text-[#FF4D00] text-[9px] font-black uppercase tracking-widest border border-[#FF4D00]/20">
                      <i className="fas fa-star text-[9px]"></i>Recomendados
                    </span>
                  </div>
                </div>

                {/* Carousel infinito de la fila */}
                <div className="relative" onMouseEnter={() => setPausado(true)} onMouseLeave={() => setPausado(false)}>
                  {/* Flechas */}
                  <button
                    onClick={() => anterior(idx)}
                    aria-label="Anterior"
                    className="absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white shadow-xl shadow-black/10 border border-orange-100 text-[#8B4513] hover:bg-[#FF4D00] hover:text-white hover:border-[#FF4D00] hover:scale-110 active:scale-95 flex items-center justify-center transition-all duration-300 cursor-pointer group"
                  >
                    <i className="fas fa-chevron-left text-sm group-hover:-translate-x-0.5 transition-transform"></i>
                  </button>
                  <button
                    onClick={() => avanzar(idx)}
                    aria-label="Siguiente"
                    className="absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white shadow-xl shadow-black/10 border border-orange-100 text-[#8B4513] hover:bg-[#FF4D00] hover:text-white hover:border-[#FF4D00] hover:scale-110 active:scale-95 flex items-center justify-center transition-all duration-300 cursor-pointer group"
                  >
                    <i className="fas fa-chevron-right text-sm group-hover:translate-x-0.5 transition-transform"></i>
                  </button>

                  {/* Track con copias para movimiento infinito */}
                  <div className="overflow-hidden rounded-[2rem]">
                    <div
                      className={`flex ${conTransicion ? 'transition-transform duration-700 ease-out' : ''}`}
                      style={{ transform: `translateX(-${pos * (100 / VISIBLE)}%)` }}
                    >
                      {tripled.map((prod, i) => (
                        <div key={`${prod.id}-${i}`} className="w-1/4 shrink-0 px-2">
                          <CardProducto prod={prod} cat={fila.categoria} />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Dots */}
                  <div className="flex justify-center gap-1.5 mt-3">
                    {Array.from({ length: mostrarDots }).map((_, i) => (
                      <button
                        key={i}
                        onClick={() => irA(idx, i)}
                        aria-label={`Ir a ${i + 1}`}
                        className={`h-1.5 rounded-full transition-all duration-300 ${i === indiceReal ? 'w-5 bg-[#FF4D00]' : 'w-1.5 bg-[#5D3A1F]/25 hover:bg-[#5D3A1F]/50'}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Relacionados;
