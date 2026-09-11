import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CircleParticles from '../../components/fondos/ParticulasCirculares';
import useCarritoStore from '../useCarritoStore';
import PagoModal from './PagoModal';

const CarritoModal = () => {
  const { items, resumen, isOpen, closeCart, removeItem, updateCantidad, clearCart } = useCarritoStore();
  const [showPago, setShowPago] = useState(false);

  if (!isOpen) return null;

  const handleCheckout = () => {
    if (items.length === 0) return;
    setShowPago(true);
  };

  return (
    <>
      <div id="carritoModal" className="tyr-modal fixed inset-0 z-[100]" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity duration-300" onClick={closeCart}></div>
        <div
          className="fixed inset-0 z-[101] overflow-y-auto"
          onClick={(e) => { if (e.target === e.currentTarget) closeCart(); }}
        >
          <div
            className="flex min-h-screen items-center justify-center p-4 text-center sm:p-0"
            onClick={(e) => { if (e.target === e.currentTarget) closeCart(); }}
          >
            <div className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto scrollbar-none transform overflow-hidden rounded-[2.5rem] bg-white text-left shadow-2xl transition-all sm:my-4 animate-modal-pop border border-gray-200">
              <button
                onClick={closeCart}
                className="absolute top-6 right-6 z-[200] w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-[#A3E635]/10 dark:hover:bg-red-950/30 text-gray-500 hover:text-red-500 transition-all focus:outline-none cursor-pointer shadow-sm hover:shadow-md border border-gray-200"
              >
                <i className="fas fa-times text-xl"></i>
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
                {/* Left: Brand Panel */}
                <div className="relative hidden lg:flex flex-col justify-center gap-6 p-6 lg:p-8 overflow-hidden bg-gradient-to-br from-[#050505] via-[#121212] to-[#0a0a0a] border-r border-[#A3E635]/10">
                  <div className="absolute inset-0 z-0 pointer-events-none">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#111827]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-[420px] h-[420px] bg-black/30 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4"></div>
                    <CircleParticles colorScheme="dark" />
                  </div>

                  <div className="relative z-10 flex flex-col items-center text-center">
                    <div className="mb-5 inline-flex items-center justify-center rounded-full bg-white/20 p-2.5 shadow-2xl ring-[0.5px] ring-white backdrop-blur-md">
                      <div className="h-40 w-40 rounded-full bg-white flex items-center justify-center shadow-lg transition-transform duration-500 hover:scale-105 hover:-translate-y-2 hover:rotate-[5deg]">
                        <i className="fas fa-cart-shopping text-[#050505]" style={{ fontSize: '70px' }}></i>
                      </div>
                    </div>

                    <h2 className="text-3xl font-black font-heading text-white leading-tight mb-2 tracking-tight drop-shadow-lg">
                      Tu Carrito de <br />
                      <span className="text-white relative inline-block">
                        HAGAMOSTECH
                        <svg className="absolute w-full h-2.5 -bottom-1 left-0 z-[-1] text-[#A3E635] drop-shadow-[0_0_8px_rgba(163,230,53,0.55)]" viewBox="0 0 200 12" preserveAspectRatio="none" fill="none"><path d="M8,8 C22,5 38,7.5 55,7.5 C130,7.5 165,7.5 188,7.5 C194,7.5 198,6 196,7.5" stroke="currentColor" strokeWidth="7" strokeLinecap="round" /></svg>
                      </span>
                    </h2>
                    <p className="text-sm text-white/90 font-medium max-w-sm leading-relaxed mb-6 drop-shadow-md">
                      Revisá tus productos, ajustá las cantidades y confirmá tu pedido. Todo con la calidad de siempre.
                    </p>

                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 border border-white/30 text-white text-[10px] font-black uppercase tracking-widest mb-6 shadow-lg backdrop-blur-sm">
                      <span className="w-2 h-2 rounded-full bg-white animate-ping"></span> {resumen.cantidad_total} {resumen.cantidad_total === 1 ? 'producto' : 'productos'}
                    </div>

                    <div className="grid grid-cols-2 gap-2 w-full max-w-sm mb-6">
                      <div className="rounded-xl border border-white/20 bg-black/20 px-3 py-2 text-left backdrop-blur-sm">
                        <p className="text-[9px] font-black uppercase tracking-widest text-[#FFF5EC]"><i className="fas fa-box-open mr-1"></i> Productos</p>
                        <p className="text-xs font-bold text-white">{resumen.cantidad_total}</p>
                      </div>
                      <div className="rounded-xl border border-white/20 bg-black/20 px-3 py-2 text-left backdrop-blur-sm">
                        <p className="text-[9px] font-black uppercase tracking-widest text-[#FFF5EC]"><i className="fas fa-truck-fast mr-1"></i> Delivery</p>
                        <p className="text-xs font-bold text-white">A confirmar</p>
                      </div>
                      <div className="rounded-xl border border-white/20 bg-black/20 px-3 py-2 text-left backdrop-blur-sm">
                        <p className="text-[9px] font-black uppercase tracking-widest text-[#FFF5EC]"><i className="fas fa-receipt mr-1"></i> Subtotal</p>
                        <p className="text-xs font-bold text-white">Bs. {resumen.total_bs}</p>
                      </div>
                      <div className="rounded-xl border border-white/20 bg-black/20 px-3 py-2 text-left backdrop-blur-sm">
                        <p className="text-[9px] font-black uppercase tracking-widest text-[#FFF5EC]"><i className="fas fa-hand-holding-dollar mr-1"></i> Total</p>
                        <p className="text-xs font-bold text-[#A3E635]">Bs. {resumen.total_bs}</p>
                      </div>
                    </div>

                    <div className="w-full mt-auto pt-4 flex flex-col items-center">
                      <p className="text-[9px] font-black text-white/60 uppercase tracking-[0.2em] mb-1">Total a pagar</p>
                      <p className="text-5xl font-black font-heading text-[#A3E635] leading-none">Bs. {resumen.total_bs}</p>
                    </div>

                    <div className="w-full pt-4 mt-3 flex flex-col items-center border-t border-white/20">
                      <p className="text-[9px] font-black text-white/60 uppercase tracking-[0.2em] mb-2">Conecta con HAGAMOSTECH</p>
                      <div className="flex justify-center gap-3">
                        {[
                          { icon: 'fa-facebook-f', link: 'https://www.facebook.com/HagamosTech' },
                          { icon: 'fa-instagram', link: 'https://www.instagram.com/hagamostech/' },
                          { icon: 'fa-tiktok', link: 'https://www.tiktok.com/@hagamostech' },
                          { icon: 'fa-whatsapp', link: 'https://wa.me/59161320004' },
                        ].map((item, i) => (
                          <a key={i} href={item.link} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-[#111827] hover:text-[#84CC16] transition-all duration-300 shadow-lg hover:-translate-y-1">
                            <i className={`fab ${item.icon} text-[13px]`}></i>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Cart items */}
                <div className="relative flex flex-col justify-center h-full bg-[#F9F9F9] p-5 lg:p-6">
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-10 -right-10 w-64 h-64 bg-[#A3E635]/10 rounded-full blur-3xl"></div>
                    <div className="absolute top-1/2 -left-10 w-40 h-40 bg-[#111827]/20 rounded-full blur-2xl"></div>
                    <div className="absolute bottom-0 right-10 w-56 h-56 bg-[#A3E635]/10 rounded-full blur-3xl"></div>
                    <CircleParticles colorScheme="light" />
                  </div>

                  <div className="relative z-10 w-full max-w-[540px] mx-auto">
                    <div className="mb-3.5 text-center bg-white p-4 rounded-2xl shadow-sm border border-gray-200 relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#A3E635] via-[#84CC16] to-[#A3E635]"></div>
                      <div className="inline-flex items-center gap-2 mb-1.5">
                        <span className="w-8 h-8 rounded-xl bg-[#A3E635]/10 border border-[#A3E635]/30 text-[#84CC16] flex items-center justify-center">
                          <i className="fas fa-shopping-cart text-sm"></i>
                        </span>
                        <h3 className="text-2xl font-black font-heading text-[#111827] tracking-tight">Detalle de Compra</h3>
                      </div>
                      <p className="text-xs text-gray-500 font-bold uppercase tracking-wide">Revisá tu pedido HAGAMOSTECH</p>
                    </div>

                    {items.length === 0 ? (
                      <div className="text-center py-16">
                        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-[#A3E635]/10 border border-[#A3E635]/20 flex items-center justify-center">
                          <i className="fas fa-shopping-basket text-3xl text-[#84CC16]"></i>
                        </div>
                        <p className="text-xl font-black font-heading text-[#111827]">Tu carrito está vacío</p>
                        <p className="text-slate-500 font-semibold mt-1 mb-6">Agregá productos para empezar tu pedido.</p>
                        <Link to="/catalogo" onClick={closeCart} className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#A3E635] hover:bg-[#84CC16] text-black font-black text-[10px] uppercase tracking-wider shadow-lg transition-all">
                          <i className="fas fa-utensils"></i> Ver catálogo
                        </Link>
                      </div>
                    ) : (
                      <>
                        {/* Cabecera del listado */}
                        <div className="flex items-center justify-center gap-2 mb-3 px-1 flex-wrap">
                          <button onClick={clearCart} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-50 border border-red-100 text-red-500 text-[8px] font-black uppercase tracking-wider hover:bg-red-100 hover:text-red-600 transition-all">
                            <i className="fas fa-trash-can text-[8px]"></i> Vaciar carrito
                          </button>
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#111827]/5 text-[#111827] text-[8px] font-black uppercase tracking-wider border border-[#111827]/10">
                            <i className="fas fa-box-open text-[8px]"></i> Productos ({resumen.cantidad_total})
                          </span>
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#A3E635]/10 text-[#84CC16] text-[8px] font-black uppercase tracking-wider border border-[#A3E635]/20">
                            <i className="fas fa-truck-fast text-[8px]"></i> Delivery
                          </span>
                        </div>

                        {/* Listado de productos */}
                        <div className="space-y-2.5 mb-4 max-h-[320px] overflow-y-auto pr-1 scrollbar-none">
                          {items.map((item) => (
                            <div key={item.productoId} className="relative flex items-center gap-3 p-3 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-md hover:border-[#A3E635]/40 transition-all overflow-hidden">
                              <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#A3E635] via-[#84CC16] to-[#A3E635] opacity-50"></div>
                              <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-gray-200">
                                <img src={item.imagen} alt={item.nombre} className="w-full h-full object-cover" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-[13px] font-black text-[#111827] truncate">{item.nombre}</p>
                                <p className="text-[9px] font-black uppercase tracking-wider text-[#84CC16]">{item.categoria} · {item.tipo}</p>
                                <div className="flex items-center gap-1.5 mt-1.5">
                                  <button onClick={() => updateCantidad(item.productoId, item.cantidad - 1)} className="w-6 h-6 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-600 font-black flex items-center justify-center transition-all hover:scale-110 active:scale-95"><i className="fas fa-minus text-[8px]"></i></button>
                                  <span className="w-8 text-center text-xs font-black text-[#111827]">{item.cantidad}</span>
                                  <button onClick={() => updateCantidad(item.productoId, item.cantidad + 1)} className="w-6 h-6 rounded-md bg-[#A3E635] hover:bg-[#84CC16] text-black font-black flex items-center justify-center transition-all hover:scale-110 active:scale-95"><i className="fas fa-plus text-[8px]"></i></button>
                                </div>
                              </div>
                              <div className="text-right shrink-0">
                                <p className="text-sm font-black font-heading text-[#84CC16]">Bs. {item.precio * item.cantidad}</p>
                                <button onClick={() => removeItem(item.productoId)} className="text-[10px] text-gray-400 hover:text-red-500 transition-colors mt-1"><i className="fas fa-trash-can"></i></button>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Resumen del pedido */}
                        <div className="relative bg-white rounded-2xl p-4 border border-gray-200 shadow-sm overflow-hidden mb-4">
                          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#A3E635] via-[#84CC16] to-[#A3E635]"></div>
                          <div className="flex items-center gap-2 mb-3">
                            <span className="w-7 h-7 rounded-lg bg-[#A3E635]/10 border border-[#A3E635]/30 text-[#84CC16] flex items-center justify-center">
                              <i className="fas fa-receipt text-[11px]"></i>
                            </span>
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Resumen del pedido</p>
                          </div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                              <i className="fas fa-cube text-[#84CC16] mr-1"></i>Subtotal
                            </span>
                            <span className="text-sm font-black text-[#111827]">Bs. {resumen.total_bs}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                              <i className="fas fa-truck-fast text-[#84CC16] mr-1"></i>Delivery
                            </span>
                            <span className="text-[10px] font-black text-green-600">A confirmar</span>
                          </div>
                          <div className="border-t border-dashed border-gray-200 my-2"></div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-black uppercase tracking-wider text-[#111827]">
                              <i className="fas fa-hand-holding-dollar text-[#84CC16] mr-1"></i>Total
                            </span>
                            <span className="text-2xl font-black font-heading text-[#84CC16]">Bs. {resumen.total_bs}</span>
                          </div>
                        </div>

                        <button onClick={handleCheckout} className="relative w-full py-3.5 px-6 bg-[#A3E635] text-black font-black text-base uppercase tracking-widest rounded-xl shadow-lg shadow-[#A3E635]/20 hover:shadow-[#A3E635]/40 hover:-translate-y-0.5 hover:bg-[#84CC16] transition-all duration-300 flex items-center justify-center gap-3 group active:scale-[0.96] relative overflow-hidden">
                          <span className="relative z-10">Ir a pagar</span>
                          <div className="w-6 h-6 bg-white/10 rounded-full flex items-center justify-center group-hover:translate-x-1 transition-all duration-300 relative z-10"><i className="fas fa-arrow-right text-black text-xs"></i></div>
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                        </button>

                        <div className="rounded-xl border border-gray-200 bg-white px-3.5 py-3 mt-3 text-[11px] text-gray-500 font-semibold leading-relaxed text-center">
                          <div className="flex items-center justify-center gap-2">
                            <i className="fas fa-lightbulb text-[#84CC16] flex-shrink-0"></i>
                            <span>Podés ajustar cantidades o quitar productos antes de confirmar tu pedido.</span>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <PagoModal isOpen={showPago} onClose={() => setShowPago(false)} onBack={() => setShowPago(false)} />
    </>
  );
};

export default CarritoModal;