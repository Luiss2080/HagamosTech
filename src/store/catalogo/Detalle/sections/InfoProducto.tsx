import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useCarritoStore from '../../../useCarritoStore';

interface InfoProductoProps {
  producto: any;
}

const InfoProducto: React.FC<InfoProductoProps> = ({ producto }) => {
  const addItem = useCarritoStore((s) => s.addItem);
  const openCart = useCarritoStore((s) => s.openCart);
  const [cantidad, setCantidad] = useState(1);
  const [agregado, setAgregado] = useState(false);

  const descuento = producto.precioAntes ? Math.round((1 - producto.precio / producto.precioAntes) * 100) : 0;
  const colorCat = producto.categoriaColor || 'bg-[#FF4D00]';
  const total = producto.precio * cantidad;
  const cuota = (total / 3).toFixed(1);

  const handleAgregar = () => {
    addItem(producto.id, cantidad);
    setAgregado(true);
    setTimeout(() => setAgregado(false), 2000);
  };

  const comprarAhora = () => {
    addItem(producto.id, cantidad);
    openCart();
  };

  const atributos = [
    { icon: 'fa-utensils', label: 'Tipo', valor: producto.tipo },
    { icon: 'fa-layer-group', label: 'Categoría', valor: producto.categoria },
    { icon: 'fa-tag', label: 'Subtítulo', valor: producto.subtitulo },
    { icon: 'fa-fire', label: 'Preparación', valor: 'Artesanal del día' },
  ];

  const pagos = [
    { icon: 'fa-money-bill-wave', label: 'Efectivo', color: 'bg-[#FF4D00]' },
    { icon: 'fa-qrcode', label: 'QR Simple', color: 'bg-[#5D3A1F]' },
    { icon: 'fa-credit-card', label: 'Transferencia', color: 'bg-[#8B4513]' },
  ];

  const ventajas = [
    { icon: 'fa-certificate', label: 'Calidad', valor: 'Certificada', color: 'bg-[#FF4D00]' },
    { icon: 'fa-seedling', label: 'Fresco', valor: 'Del día', color: 'bg-[#5D3A1F]' },
    { icon: 'fa-hand-holding-heart', label: 'Garantía', valor: 'Real', color: 'bg-[#8B4513]' },
  ];

  const entrega = [
    { icon: 'fa-motorcycle', label: 'Delivery', valor: 'A domicilio', color: 'bg-[#FF4D00]' },
    { icon: 'fa-store', label: 'Retiro', valor: 'En local', color: 'bg-[#5D3A1F]' },
    { icon: 'fa-clock', label: 'Listo', valor: 'Al momento', color: 'bg-[#8B4513]' },
  ];

  return (
    <div className="sticky top-24">
      <div className="bg-white rounded-[2rem] ring-2 ring-orange-100 shadow-2xl shadow-orange-950/10 relative overflow-hidden border border-orange-50">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FF4D00] via-[#8B4513] to-[#FF4D00]"></div>
        <div className="absolute -top-12 -right-12 w-44 h-44 rounded-full bg-[#FF4D00]/10 blur-3xl animate-float-slow pointer-events-none"></div>
        <div className="absolute -bottom-12 -left-10 w-44 h-44 rounded-full bg-[#5D3A1F]/10 blur-3xl animate-float-medium pointer-events-none"></div>

        {/* Marco interno */}
        <div className="relative z-10 m-3 rounded-[1.4rem] border-2 border-dashed border-orange-100 overflow-hidden">
          <div className="p-5 sm:p-6">
            {/* Breadcrumb interno */}
            <div className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-slate-400 mb-3">
              <Link to="/catalogo" className="hover:text-[#FF4D00] transition-colors">Catálogo</Link>
              <i className="fas fa-chevron-right text-[7px]"></i>
              <span className="text-[#8B4513]">{producto.categoria}</span>
            </div>

            {/* Título con ficha integrada */}
            <div className="flex items-start gap-3 mb-3">
              <span className={`w-12 h-12 rounded-2xl ${colorCat} text-white flex items-center justify-center text-xl shadow-lg shrink-0 animate-float-slow`}>
                <i className={`fas ${producto.icono || 'fa-star'}`}></i>
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-2xl sm:text-3xl font-black font-heading text-[#111827] leading-tight">{producto.nombre}</h1>
                  {descuento > 0 && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-500 text-white text-[9px] font-black shadow-sm animate-pulse">
                      <i className="fas fa-fire text-[8px]"></i>-{descuento}%
                    </span>
                  )}
                </div>
                <p className="text-[12px] font-bold text-slate-500 mt-0.5">{producto.subtitulo}</p>

                {/* Ficha del producto moderna (chips con iconos) */}
                <div className="flex flex-wrap gap-1.5 mt-2.5">
                  {atributos.map((a, i) => (
                    <span key={i} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FFF6F6] border border-orange-100 text-[9px] font-black uppercase tracking-wider text-[#8B4513] hover:bg-[#FF4D00]/10 hover:border-[#FF4D00]/30 hover:-translate-y-0.5 transition-all">
                      <i className={`fas ${a.icon} text-[#FF4D00] text-[9px]`}></i>
                      <span className="text-slate-400 font-black mr-0.5">{a.label}:</span>
                      {a.valor}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Rating */}
            <div className="flex flex-wrap items-center gap-2 mb-4 pb-3 border-b border-dashed border-orange-100">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <i key={i} className={`fas fa-star text-[11px] ${i < 4 ? 'text-amber-400' : 'text-gray-200'}`}></i>
                ))}
              </div>
              <span className="text-[11px] font-black text-slate-500">4.9</span>
              <span className="text-[11px] font-semibold text-slate-400">· 120+ vendidos</span>
              <span className={`ml-auto inline-flex items-center gap-1 px-2 py-0.5 rounded-full ${colorCat} text-white text-[8px] font-black uppercase tracking-wider`}>
                <i className="fas fa-bolt text-[8px]"></i> En stock
              </span>
            </div>

            {/* Panel de compra */}
            <div className="rounded-2xl border border-orange-100 bg-[#FFFDF9] p-4 shadow-md relative overflow-hidden mb-4">
              <div className={`absolute top-0 left-0 w-full h-1 ${colorCat}`}></div>
              <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-[#FF4D00]/10 blur-2xl animate-float-slow pointer-events-none"></div>

              <div className="relative z-10">
                {/* Cantidad + total */}
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1.5">
                      <i className="fas fa-cart-plus text-[#FF4D00] mr-1"></i>Cantidad
                    </p>
                    <div className="flex items-center gap-2">
                      <button onClick={() => setCantidad(Math.max(1, cantidad - 1))} className="w-11 h-11 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-600 font-black flex items-center justify-center transition-all hover:scale-105 active:scale-95"><i className="fas fa-minus text-sm"></i></button>
                      <span className="w-14 text-center text-2xl font-black text-[#111827]">{cantidad}</span>
                      <button onClick={() => setCantidad(cantidad + 1)} className={`w-11 h-11 rounded-xl ${colorCat} hover:opacity-90 text-white font-black flex items-center justify-center transition-all hover:scale-105 active:scale-95`}><i className="fas fa-plus text-sm"></i></button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Total</p>
                    <div className="flex items-end justify-end gap-1.5">
                      <span className="text-xs font-black text-slate-400 mb-1">Bs.</span>
                      <p className="text-3xl font-black font-heading text-[#FF4D00] leading-none">{total}</p>
                    </div>
                    <p className="text-[9px] font-black text-green-600 mt-0.5">
                      <i className="fas fa-credit-card mr-1"></i>3 cuotas de Bs. {cuota}
                    </p>
                  </div>
                </div>

                {/* Botones en la misma fila */}
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    onClick={handleAgregar}
                    className={`w-full py-3.5 rounded-full font-black text-white text-[10px] uppercase tracking-[0.15em] shadow-lg transition-all flex items-center justify-center gap-2 active:scale-95 ${agregado ? 'bg-green-500 hover:bg-green-600 shadow-green-500/20' : `${colorCat} hover:opacity-90 shadow-orange-500/20 hover:-translate-y-0.5`}`}
                  >
                    {agregado ? (<><i className="fas fa-check"></i> ¡Agregado!</>) : (<><i className="fas fa-cart-plus"></i> Agregar</>)}
                  </button>
                  <button
                    onClick={comprarAhora}
                    className="w-full py-3.5 rounded-full bg-[#5D3A1F] hover:bg-[#452A16] text-white font-black text-[10px] uppercase tracking-[0.15em] shadow-lg transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5 active:scale-95"
                  >
                    <i className="fas fa-bolt"></i> Comprar ahora
                  </button>
                </div>

                {agregado && (
                  <button onClick={openCart} className="w-full mt-2.5 py-3 rounded-full bg-[#111827] hover:bg-black text-white font-black text-[10px] uppercase tracking-[0.15em] transition-all flex items-center justify-center gap-2 animate-fade-in">
                    <i className="fas fa-shopping-cart"></i> Ver carrito
                  </button>
                )}
              </div>
            </div>

            {/* Entrega */}
            <div className="rounded-2xl border border-orange-50 bg-[#FFFDF9] p-4 shadow-sm relative overflow-hidden mb-4">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FF4D00] via-[#8B4513] to-[#FF4D00] opacity-60"></div>
              <div className="flex items-center gap-2 mb-3 pt-1">
                <span className={`w-7 h-7 rounded-lg ${colorCat} text-white flex items-center justify-center`}>
                  <i className="fas fa-truck text-[11px]"></i>
                </span>
                <p className="text-[11px] font-black uppercase tracking-widest text-slate-500">Entrega</p>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {entrega.map((m, i) => (
                  <div key={i} className={`${m.color} flex flex-col items-center text-center gap-1 p-3 rounded-xl text-white shadow-lg hover:-translate-y-1 hover:scale-105 hover:shadow-xl transition-all duration-300 group`}>
                    <i className={`fas ${m.icon} text-lg mb-1 group-hover:scale-110 group-hover:rotate-6 transition-transform`}></i>
                    <p className="text-[8px] font-black uppercase tracking-wider text-white/80">{m.label}</p>
                    <p className="text-[11px] font-black">{m.valor}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Métodos de pago */}
            <div className="rounded-2xl border border-orange-50 bg-[#FFFDF9] p-4 shadow-sm relative overflow-hidden mb-4">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FF4D00] via-[#8B4513] to-[#FF4D00] opacity-60"></div>
              <div className="flex items-center justify-between mb-3 pt-1">
                <div className="flex items-center gap-2">
                  <span className={`w-7 h-7 rounded-lg ${colorCat} text-white flex items-center justify-center`}>
                    <i className="fas fa-wallet text-[11px]"></i>
                  </span>
                  <p className="text-[11px] font-black uppercase tracking-widest text-slate-500">Métodos de pago</p>
                </div>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-[8px] font-black uppercase tracking-wider">
                  <i className="fas fa-lock text-[8px]"></i>Seguro
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {pagos.map((p, i) => (
                  <div key={i} className={`${p.color} flex flex-col items-center text-center gap-1.5 p-3 rounded-xl text-white shadow-lg hover:-translate-y-1 hover:scale-105 transition-all duration-300 group`}>
                    <span className="w-10 h-10 rounded-xl bg-white/20 ring-1 ring-white/40 flex items-center justify-center group-hover:rotate-6 group-hover:scale-110 transition-transform">
                      <i className={`fas ${p.icon} text-base`}></i>
                    </span>
                    <p className="text-[9px] font-black uppercase tracking-wider">{p.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Información rápida */}
            <div className="rounded-2xl border border-orange-50 bg-[#FFFDF9] p-4 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FF4D00] via-[#8B4513] to-[#FF4D00] opacity-60"></div>
              <div className="flex items-center gap-2 mb-3 pt-1">
                <span className={`w-7 h-7 rounded-lg ${colorCat} text-white flex items-center justify-center`}>
                  <i className="fas fa-circle-check text-[11px]"></i>
                </span>
                <p className="text-[11px] font-black uppercase tracking-widest text-slate-500">Información rápida</p>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {ventajas.map((a, i) => (
                  <div key={i} className={`${a.color} flex flex-col items-center text-center gap-1 p-3 rounded-xl text-white shadow-lg hover:-translate-y-1 hover:scale-105 hover:shadow-xl transition-all duration-300 group`}>
                    <span className="w-9 h-9 rounded-lg bg-white/20 ring-1 ring-white/40 flex items-center justify-center group-hover:rotate-6 group-hover:scale-110 transition-transform">
                      <i className={`fas ${a.icon} text-sm`}></i>
                    </span>
                    <p className="text-[8px] font-black uppercase tracking-wider text-white/80">{a.label}</p>
                    <p className="text-[11px] font-black">{a.valor}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoProducto;
