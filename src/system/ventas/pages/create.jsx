import React, { useState, useMemo } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { formatearBs } from '../constantes';

const inputCls = "w-full px-3.5 py-2.5 rounded-xl border border-slate-200/60 dark:border-white/5 bg-slate-50 dark:bg-[#070710] text-slate-800 dark:text-white dark:border-white/8 text-xs focus:ring-2 focus:ring-[#E95A0C]/40 outline-none font-bold";

const VentaCreateView = ({ onBackToList, crearVenta, productos, categorias }) => {
  const [categoriaId, setCategoriaId] = useState('todas');
  const [buscar, setBuscar] = useState('');
  const [items, setItems] = useState([]);
  const [clienteNombre, setClienteNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [mesa, setMesa] = useState('');
  const [metodoPago, setMetodoPago] = useState('efectivo');
  const [descuento, setDescuento] = useState(0);
  const [enviando, setEnviando] = useState(false);
  const [resultado, setResultado] = useState(null);

  const agrupado = useMemo(() => {
    const catSel = categoriaId === 'todas' ? null : categorias.find(c => String(c.id) === String(categoriaId));
    let list = catSel ? productos.filter(p => String(p.categoriaId) === String(categoriaId)) : productos;
    const term = buscar.toLowerCase().trim();
    if (term) list = list.filter(p => (p.nombre || '').toLowerCase().includes(term));
    return { catSel, list };
  }, [productos, categorias, categoriaId, buscar]);

  const subtotal = items.reduce((a, i) => a + i.precio * i.cantidad, 0);
  const descMonto = subtotal * (Number(descuento) || 0) / 100;
  const total = Math.max(0, subtotal - descMonto);

  const agregar = (p) => {
    setItems(prev => {
      const idx = prev.findIndex(i => i.productoId === p.id);
      if (idx !== -1) {
        const nuevo = [...prev];
        nuevo[idx] = { ...nuevo[idx], cantidad: nuevo[idx].cantidad + 1 };
        return nuevo;
      }
      return [...prev, { productoId: p.id, nombre: p.nombre, imagen: p.imagen, precio: p.precio, cantidad: 1 }];
    });
  };

  const cambiarCantidad = (idx, delta) => {
    setItems(prev => {
      const nuevo = [...prev];
      nuevo[idx] = { ...nuevo[idx], cantidad: Math.max(1, nuevo[idx].cantidad + delta) };
      return nuevo;
    });
  };

  const quitar = (idx) => setItems(prev => prev.filter((_, i) => i !== idx));

  const submit = async (e) => {
    e.preventDefault();
    if (items.length === 0) return;
    setEnviando(true);
    const res = await crearVenta({
      mesa: mesa ? parseInt(mesa) : null,
      clienteNombre: clienteNombre || null,
      telefono: telefono || null,
      items,
      total,
      metodoPago,
      observaciones: '',
      origen: 'sistema'
    });
    setEnviando(false);
    if (res.ok) {
      setResultado(res.venta);
    } else {
      alert(res.mensaje || 'No se pudo registrar la venta');
    }
  };

  const nuevoRegistro = () => {
    setItems([]); setClienteNombre(''); setTelefono(''); setMesa(''); setDescuento(0); setResultado(null);
  };

  if (resultado) {
    return (
      <div className="space-y-5 font-montserrat w-full">
        <div className="bg-white dark:bg-[#040408] rounded-2xl p-8 shadow-xl dark:shadow-black/60 border border-slate-200/60 dark:border-white/5 border-l-4 border-l-emerald-500 text-center">
          <div className="w-20 h-20 rounded-full bg-emerald-500 text-white flex items-center justify-center text-4xl shadow-2xl shadow-emerald-500/30 mx-auto mb-4">
            <i className="fas fa-check"></i>
          </div>
          <h2 className="text-xl font-black text-[#4A2E1B] dark:text-white uppercase tracking-wide mb-1">Venta registrada</h2>
          <p className="text-slate-500 font-bold text-sm mb-5">Comprobante <span className="text-[#E95A0C] font-black">{resultado.codigo}</span> · {formatearBs(resultado.total)}</p>
          <div className="flex items-center justify-center gap-3">
            <button onClick={() => { onBackToList(); }} className="px-6 py-3 rounded-xl bg-[#8B4513] hover:bg-[#5D3A1F] text-white text-xs font-black uppercase tracking-wider cursor-pointer">Ir al listado</button>
            <button onClick={nuevoRegistro} className="px-6 py-3 rounded-xl bg-[#E95A0C] hover:bg-[#cc4a00] text-white text-xs font-black uppercase tracking-wider cursor-pointer"><i className="fas fa-plus mr-2"></i>Nueva venta</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5 font-montserrat w-full">
      {/* CABECERA */}
      <div className="bg-white dark:bg-[#040408] rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-200 dark:border-white/5 border-l-4 border-l-[#E95A0C] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl text-[#E95A0C] flex items-center justify-center text-xl font-black shadow-sm shrink-0 border border-orange-200/50"><i className="fas fa-cash-register"></i></div>
          <div>
            <div className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">
              <span>Comercial</span><span>{'>'}</span><span>Ventas</span><span>{'>'}</span><span className="text-[#E95A0C]">Registrar Venta</span>
            </div>
            <h2 className="text-xl font-black text-[#4A2E1B] dark:text-white uppercase tracking-wider m-0 leading-none">Registrar Nueva Venta</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider mt-1 m-0">POS del sistema · seleccione productos del menú y confirme el cobro.</p>
          </div>
        </div>
        <button onClick={onBackToList} className="px-5 py-2.5 rounded-xl bg-[#E95A0C] hover:bg-[#cc4a00] text-white text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md border border-red-800/40 shrink-0">
          <i className="fas fa-arrow-left"></i><span>Volver al listado</span>
        </button>
      </div>

      <form onSubmit={submit} className="flex flex-col lg:flex-row gap-5 items-start">
        {/* CATÁLOGO */}
        <div className="flex-1 w-full bg-white dark:bg-[#040408] rounded-2xl p-5 shadow-xl dark:shadow-black/60 border border-slate-200/60 dark:border-white/5 border-l-4 border-l-[#E95A0C]">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <button type="button" onClick={() => setCategoriaId('todas')}
              className={`px-3.5 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider border transition-all cursor-pointer ${categoriaId === 'todas' ? 'bg-[#E95A0C] text-white border-transparent shadow-md' : 'bg-white text-gray-500 border-gray-200 hover:border-[#E95A0C]/50'}`}>
              <i className="fas fa-border-all mr-1.5"></i>Todo
            </button>
            {categorias.map(c => (
              <button key={c.id} type="button" onClick={() => setCategoriaId(String(c.id))}
                className={`px-3.5 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider border transition-all cursor-pointer ${String(categoriaId) === String(c.id) ? 'bg-[#E95A0C] text-white border-transparent shadow-md' : 'bg-white text-gray-500 border-gray-200 hover:border-[#E95A0C]/50'}`}>
                <i className={`fas ${c.icono || 'fa-tag'} mr-1.5`}></i>{c.titulo}
              </button>
            ))}
          </div>

          <div className="relative mb-4 max-w-sm">
            <i className="fas fa-search absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs"></i>
            <input value={buscar} onChange={(e) => setBuscar(e.target.value)} placeholder="Buscar producto..." className={`${inputCls} pl-9`} />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3 max-h-[520px] overflow-y-auto pr-1">
            {agrupado.list.map(p => (
              <motion.button key={p.id} type="button" whileHover={{ y: -3 }} onClick={() => agregar(p)}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-lg hover:border-[#FF4D00]/40 cursor-pointer transition-all text-left">
                <div className="relative h-20 overflow-hidden bg-[#FFF5EC]">
                  {p.imagen ? <img src={p.imagen} alt={p.nombre} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" /> : <div className="w-full h-full flex items-center justify-center text-[#E95A0C]"><i className="fas fa-utensils"></i></div>}
                  <span className="absolute bottom-1 right-1 px-2 py-0.5 rounded-md bg-[#FF4D00] text-white text-[10px] font-black shadow">Bs. {p.precio}</span>
                </div>
                <div className="p-2">
                  <p className="text-[10px] font-extrabold text-[#4A2E1B] truncate">{p.nombre}</p>
                  <p className="text-[8px] font-bold text-gray-400 truncate">{p.categoria?.titulo || ''}</p>
                </div>
              </motion.button>
            ))}
            {agrupado.list.length === 0 && <div className="col-span-full py-8 text-center text-gray-400 text-xs font-bold">Sin productos</div>}
          </div>
        </div>

        {/* RESUMEN DE LA VENTA */}
        <div className="w-full lg:w-[340px] shrink-0 bg-white dark:bg-[#040408] rounded-2xl shadow-xl dark:shadow-black/60 border border-slate-200/60 dark:border-white/5 border-l-4 border-l-[#8B4513] overflow-hidden">
          <div className="bg-gradient-to-r from-[#8B4513] to-[#5D3A1F] px-4 py-3 flex items-center justify-between">
            <span className="text-white font-black uppercase tracking-wider text-xs font-heading"><i className="fas fa-basket-shopping mr-2"></i>Venta actual</span>
            <span className="bg-white/20 text-white text-[10px] font-black px-2 py-0.5 rounded-full">{items.length} ítems</span>
          </div>

          <div className="p-4 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[9px] font-black uppercase tracking-wider text-[#E95A0C] mb-1">Cliente</label>
                <input value={clienteNombre} onChange={(e) => setClienteNombre(e.target.value)} placeholder="Nombre" className={inputCls} />
              </div>
              <div>
                <label className="block text-[9px] font-black uppercase tracking-wider text-[#E95A0C] mb-1">Teléfono</label>
                <input value={telefono} onChange={(e) => setTelefono(e.target.value)} placeholder="Celular" className={inputCls} />
              </div>
              <div>
                <label className="block text-[9px] font-black uppercase tracking-wider text-[#E95A0C] mb-1">Mesa (opcional)</label>
                <input type="number" min="1" value={mesa} onChange={(e) => setMesa(e.target.value)} placeholder="—" className={inputCls} />
              </div>
              <div>
                <label className="block text-[9px] font-black uppercase tracking-wider text-[#E95A0C] mb-1">Descuento %</label>
                <input type="number" min="0" max="100" value={descuento} onChange={(e) => setDescuento(e.target.value)} className={inputCls} />
              </div>
            </div>

            <div>
              <label className="block text-[9px] font-black uppercase tracking-wider text-[#E95A0C] mb-1">Método de pago</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'efectivo', label: 'Efectivo', icon: 'fas fa-money-bill-wave' },
                  { id: 'tarjeta', label: 'Tarjeta', icon: 'fas fa-credit-card' },
                  { id: 'qr', label: 'QR Simple', icon: 'fas fa-qrcode' }
                ].map(m => (
                  <button key={m.id} type="button" onClick={() => setMetodoPago(m.id)}
                    className={`p-2 rounded-xl border-2 flex flex-col items-center gap-1 transition-all cursor-pointer ${metodoPago === m.id ? 'border-[#E95A0C] bg-orange-50 scale-[1.02]' : 'border-gray-200 bg-white hover:border-[#E95A0C]/40'}`}>
                    <i className={`${m.icon} text-base ${metodoPago === m.id ? 'text-[#E95A0C]' : 'text-gray-400'}`}></i>
                    <span className="text-[9px] font-black uppercase text-gray-500">{m.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Ítems */}
            <div className="max-h-56 overflow-y-auto space-y-2">
              {items.length === 0 && (
                <div className="text-center py-6 text-gray-400">
                  <i className="fas fa-basket-shopping text-2xl block mb-2 opacity-40"></i>
                  <p className="text-[11px] font-bold">Toca un producto para agregarlo.</p>
                </div>
              )}
              <AnimatePresence>
                {items.map((it, idx) => (
                  <motion.div key={idx} layout initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="p-2 rounded-xl bg-red-50/40 border border-red-100">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-black text-[#111827] truncate">{it.nombre}</span>
                      <span className="text-[11px] font-black text-[#FF4D00] whitespace-nowrap">Bs. {(it.precio * it.cantidad).toFixed(2)}</span>
                    </div>
                    <div className="flex items-center justify-between mt-1.5">
                      <div className="flex items-center gap-1">
                        <button type="button" onClick={() => cambiarCantidad(idx, -1)} className="w-6 h-6 rounded-lg bg-white border border-gray-200 text-[#FF4D00] flex items-center justify-center text-[10px] cursor-pointer"><i className="fas fa-minus"></i></button>
                        <span className="w-6 text-center text-[11px] font-black text-[#111827]">x{it.cantidad}</span>
                        <button type="button" onClick={() => cambiarCantidad(idx, 1)} className="w-6 h-6 rounded-lg bg-white border border-gray-200 text-[#FF4D00] flex items-center justify-center text-[10px] cursor-pointer"><i className="fas fa-plus"></i></button>
                      </div>
                      <button type="button" onClick={() => quitar(idx)} className="text-red-400 hover:text-red-600 text-xs cursor-pointer"><i className="fas fa-trash-can"></i></button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Totales */}
            <div className="border-t border-gray-100 pt-3 space-y-1">
              <div className="flex justify-between text-[11px] font-bold text-gray-500">
                <span>Subtotal</span><span>{formatearBs(subtotal)}</span>
              </div>
              {descMonto > 0 && (
                <div className="flex justify-between text-[11px] font-bold text-red-500">
                  <span>Descuento ({descuento}%)</span><span>-{formatearBs(descMonto)}</span>
                </div>
              )}
              <div className="flex justify-between items-center pt-1">
                <span className="text-[12px] font-black uppercase tracking-wide text-gray-500">TOTAL</span>
                <span className="text-xl font-black text-[#FF4D00]">{formatearBs(total)}</span>
              </div>
            </div>

            <button type="submit" disabled={items.length === 0 || enviando}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#E95A0C] to-orange-700 text-white text-xs font-black uppercase tracking-widest shadow-lg shadow-orange-500/25 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
              <i className="fas fa-check-circle"></i>{enviando ? 'Registrando...' : 'Registrar Venta'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default VentaCreateView;