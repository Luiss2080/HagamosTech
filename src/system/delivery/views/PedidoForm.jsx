import React, { useState, useRef, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { formatearBs } from '../constantes';

const inputCls = "w-full px-3.5 py-2.5 rounded-xl border border-slate-200/60 dark:border-white/5 bg-slate-50 dark:bg-[#070710] text-slate-800 dark:text-white dark:border-white/8 text-xs focus:ring-2 focus:ring-[#E95A0C]/40 outline-none font-bold";

const DropdownSelect = ({ value, onChange, options, placeholder }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);
  const selected = options.find(o => String(o.value) === String(value));
  return (
    <div className="relative w-full" ref={ref}>
      <button type="button" onClick={() => setOpen(!open)} className={`${inputCls} flex items-center justify-between gap-2 cursor-pointer`}>
        {selected?.icon && <i className={`${selected.icon} text-[#E95A0C] text-xs`}></i>}
        <span className={`flex-1 text-left truncate ${selected ? '' : 'text-slate-400'}`}>{selected?.label || placeholder || 'Seleccione...'}</span>
        <i className={`fas fa-chevron-down text-[9px] text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`}></i>
      </button>
      {open && (
        <div className="absolute z-[100] mt-1 w-full min-w-[200px] rounded-xl border border-slate-200/60 dark:border-white/5 bg-white shadow-2xl dark:shadow-black/80 overflow-hidden max-h-64 overflow-y-auto">
          {options.map(opt => (
            <button key={opt.value} type="button"
              onClick={() => { onChange(opt.value); setOpen(false); }}
              className={`w-full px-3.5 py-2.5 text-xs font-bold flex items-center gap-2 text-left transition-all cursor-pointer ${String(opt.value) === String(value) ? 'bg-[#8B4513] text-white' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'}`}>
              {opt.icon && <i className={`${opt.icon} text-xs ${String(opt.value) === String(value) ? 'text-white' : 'text-[#E95A0C]'}`}></i>}
              <span className="truncate">{opt.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const PedidoForm = ({ form, set, onBackToList, onSubmit, productos, zonas, repartidores, modo, titulo }) => {
  const [categoriaId, setCategoriaId] = useState('todas');
  const [buscar, setBuscar] = useState('');

  const categoriaSel = categoriaId === 'todas' ? null : (categoriasDeProductos(productos).find(c => String(c.id) === String(categoriaId)) || null);
  const categorias = categoriasDeProductos(productos);
  const lista = categoriaSel ? productos.filter(p => String(p.categoriaId) === String(categoriaId)) : productos;

  const term = buscar.toLowerCase().trim();
  const listaFiltrada = term ? lista.filter(p => (p.nombre || '').toLowerCase().includes(term)) : lista;

  const items = form.items || [];
  const subtotal = items.reduce((a, i) => a + i.precio * i.cantidad, 0);
  const tarifa = parseFloat(form.tarifa) || 0;
  const total = subtotal + tarifa;

  const agregar = (p) => {
    const nuevo = [...items];
    const idx = nuevo.findIndex(i => i.productoId === p.id);
    if (idx !== -1) nuevo[idx] = { ...nuevo[idx], cantidad: nuevo[idx].cantidad + 1 };
    else nuevo.push({ productoId: p.id, nombre: p.nombre, imagen: p.imagen, precio: p.precio, cantidad: 1 });
    set('items', nuevo);
  };
  const cambiarCantidad = (idx, delta) => {
    const nuevo = [...items];
    nuevo[idx] = { ...nuevo[idx], cantidad: Math.max(1, nuevo[idx].cantidad + delta) };
    set('items', nuevo);
  };
  const quitar = (idx) => set('items', items.filter((_, i) => i !== idx));

  const zonaOptions = [{ value: '', label: 'Sin zona (recojo en local)', icon: 'fas fa-store' }, ...zonas.map(z => ({ value: String(z.id), label: `${z.nombre} · ${formatearBs(z.tarifa)}`, icon: 'fas fa-location-dot' }))];
  const repartidorOptions = [{ value: '', label: 'Sin repartidor asignado', icon: 'fas fa-user' }, ...repartidores.filter(r => r.activo).map(r => ({ value: String(r.id), label: `${r.nombre}${r.disponible ? ' · Disponible' : ''}`, icon: 'fas fa-motorcycle' }))];

  return (
    <div className="space-y-5 font-montserrat w-full">
      <div className="bg-white dark:bg-[#040408] rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-200 dark:border-white/5 border-l-4 border-l-[#E95A0C] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl text-[#E95A0C] flex items-center justify-center text-xl font-black shadow-sm shrink-0 border border-orange-200/50"><i className="fas fa-truck-fast"></i></div>
          <div>
            <div className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">
              <span>Operaciones</span><span>{'>'}</span><span>Delivery</span><span>{'>'}</span><span className="text-[#E95A0C]">{modo === 'editar' ? 'Editar Pedido' : 'Registrar Pedido'}</span>
            </div>
            <h2 className="text-xl font-black text-[#4A2E1B] dark:text-white uppercase tracking-wider m-0 leading-none">{titulo}</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider mt-1 m-0">Pedido a domicilio · zona tarifada y asignación de repartidor.</p>
          </div>
        </div>
        <button onClick={onBackToList} className="px-5 py-2.5 rounded-xl bg-[#E95A0C] hover:bg-[#cc4a00] text-white text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 shadow-md border border-red-800/40 shrink-0">
          <i className="fas fa-arrow-left"></i><span>Volver</span>
        </button>
      </div>

      <form onSubmit={onSubmit} className="flex flex-col lg:flex-row gap-5 items-start">
        {/* CATÁLOGO */}
        <div className="flex-1 w-full bg-white dark:bg-[#040408] rounded-2xl p-5 shadow-xl dark:shadow-black/60 border border-slate-200/60 dark:border-white/5 border-l-4 border-l-[#E95A0C]">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <button type="button" onClick={() => setCategoriaId('todas')} className={`px-3.5 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider border transition-all cursor-pointer ${categoriaId === 'todas' ? 'bg-[#E95A0C] text-white border-transparent shadow-md' : 'bg-white text-gray-500 border-gray-200 hover:border-[#E95A0C]/50'}`}><i className="fas fa-border-all mr-1.5"></i>Todo</button>
            {categorias.map(c => (
              <button key={c.id} type="button" onClick={() => setCategoriaId(String(c.id))} className={`px-3.5 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider border transition-all cursor-pointer ${String(categoriaId) === String(c.id) ? 'bg-[#E95A0C] text-white border-transparent shadow-md' : 'bg-white text-gray-500 border-gray-200 hover:border-[#E95A0C]/50'}`}>{c.titulo}</button>
            ))}
          </div>
          <div className="relative mb-4 max-w-sm">
            <i className="fas fa-search absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs"></i>
            <input value={buscar} onChange={(e) => setBuscar(e.target.value)} placeholder="Buscar producto..." className={`${inputCls} pl-9`} />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3 max-h-[360px] overflow-y-auto pr-1">
            {listaFiltrada.map(p => (
              <motion.button key={p.id} type="button" whileHover={{ y: -3 }} onClick={() => agregar(p)}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-lg hover:border-[#FF4D00]/40 cursor-pointer transition-all text-left">
                <div className="relative h-20 overflow-hidden bg-[#FFF5EC]">
                  {p.imagen ? <img src={p.imagen} alt={p.nombre} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" /> : <div className="w-full h-full flex items-center justify-center text-[#E95A0C]"><i className="fas fa-utensils"></i></div>}
                  <span className="absolute bottom-1 right-1 px-2 py-0.5 rounded-md bg-[#FF4D00] text-white text-[10px] font-black shadow">Bs. {p.precio}</span>
                </div>
                <div className="p-2"><p className="text-[10px] font-extrabold text-[#4A2E1B] truncate">{p.nombre}</p></div>
              </motion.button>
            ))}
            {listaFiltrada.length === 0 && <div className="col-span-full py-8 text-center text-gray-400 text-xs font-bold">Sin productos</div>}
          </div>
        </div>

        {/* DATOS DEL ENVÍO */}
        <div className="w-full lg:w-[340px] shrink-0 bg-white dark:bg-[#040408] rounded-2xl shadow-xl dark:shadow-black/60 border border-slate-200/60 dark:border-white/5 border-l-4 border-l-[#8B4513] overflow-hidden">
          <div className="bg-gradient-to-r from-[#8B4513] to-[#5D3A1F] px-4 py-3 flex items-center justify-between">
            <span className="text-white font-black uppercase tracking-wider text-xs font-heading"><i className="fas fa-truck-fast mr-2"></i>Envío</span>
            <span className="bg-white/20 text-white text-[10px] font-black px-2 py-0.5 rounded-full">{items.length} ítems</span>
          </div>
          <div className="p-4 space-y-3">
            <div className="grid grid-cols-1 gap-3">
              <div>
                <label className="block text-[9px] font-black uppercase tracking-wider text-[#E95A0C] mb-1">CLIENTE *</label>
                <input required value={form.clienteNombre} onChange={(e) => set('clienteNombre', e.target.value)} placeholder="Nombre del cliente" className={inputCls} />
              </div>
              <div>
                <label className="block text-[9px] font-black uppercase tracking-wider text-[#E95A0C] mb-1">TELÉFONO</label>
                <input value={form.telefono} onChange={(e) => set('telefono', e.target.value)} placeholder="Celular" className={inputCls} />
              </div>
              <div>
                <label className="block text-[9px] font-black uppercase tracking-wider text-[#E95A0C] mb-1">DIRECCIÓN *</label>
                <input required value={form.direccion} onChange={(e) => set('direccion', e.target.value)} placeholder="Calle, zona, referencia..." className={inputCls} />
              </div>
              <div>
                <label className="block text-[9px] font-black uppercase tracking-wider text-[#E95A0C] mb-1">ZONA DE REPARTO</label>
                <DropdownSelect value={form.zonaId} onChange={(v) => { set('zonaId', v); const z = zonas.find(z => String(z.id) === String(v)); set('tarifa', z ? z.tarifa : 0); }} options={zonaOptions} placeholder="Seleccione una zona" />
              </div>
              <div>
                <label className="block text-[9px] font-black uppercase tracking-wider text-[#E95A0C] mb-1">REPARTIDOR</label>
                <DropdownSelect value={form.repartidorId} onChange={(v) => set('repartidorId', v)} options={repartidorOptions} placeholder="Sin asignar" />
              </div>
              <div>
                <label className="block text-[9px] font-black uppercase tracking-wider text-[#E95A0C] mb-1">OBSERVACIONES</label>
                <textarea rows="2" value={form.observaciones} onChange={(e) => set('observaciones', e.target.value)} placeholder="Notas de entrega..." className={`${inputCls} resize-none`}></textarea>
              </div>
            </div>

            {/* Ítems */}
            <div className="max-h-40 overflow-y-auto space-y-1.5">
              <AnimatePresence>
                {items.map((it, idx) => (
                  <motion.div key={idx} layout initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="p-2 rounded-xl bg-red-50/40 border border-red-100">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-black text-[#111827] truncate">{it.nombre}</span>
                      <span className="text-[10px] font-black text-[#FF4D00] whitespace-nowrap">Bs. {(it.precio * it.cantidad).toFixed(2)}</span>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <div className="flex items-center gap-1">
                        <button type="button" onClick={() => cambiarCantidad(idx, -1)} className="w-5 h-5 rounded bg-white border border-gray-200 text-[#FF4D00] text-[9px] cursor-pointer"><i className="fas fa-minus"></i></button>
                        <span className="w-5 text-center text-[10px] font-black">x{it.cantidad}</span>
                        <button type="button" onClick={() => cambiarCantidad(idx, 1)} className="w-5 h-5 rounded bg-white border border-gray-200 text-[#FF4D00] text-[9px] cursor-pointer"><i className="fas fa-plus"></i></button>
                      </div>
                      <button type="button" onClick={() => quitar(idx)} className="text-red-400 text-[10px] cursor-pointer"><i className="fas fa-trash-can"></i></button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {items.length === 0 && <p className="text-center text-[10px] font-bold text-gray-400 py-2">Toca un producto para agregarlo.</p>}
            </div>

            {/* Totales */}
            <div className="border-t border-gray-100 pt-2 space-y-1">
              <div className="flex justify-between text-[11px] font-bold text-gray-500"><span>Subtotal</span><span>{formatearBs(subtotal)}</span></div>
              <div className="flex justify-between text-[11px] font-bold text-gray-500"><span>Delivery</span><span>{formatearBs(tarifa)}</span></div>
              <div className="flex justify-between items-center pt-1">
                <span className="text-[12px] font-black uppercase tracking-wide text-gray-500">TOTAL</span>
                <span className="text-xl font-black text-[#FF4D00]">{formatearBs(total)}</span>
              </div>
            </div>

            <button type="submit" disabled={items.length === 0} className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#E95A0C] to-orange-700 text-white text-xs font-black uppercase tracking-widest shadow-lg shadow-orange-500/25 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
              <i className="fas fa-motorcycle"></i>{modo === 'editar' ? 'Guardar Pedido' : 'Registrar Pedido a Domicilio'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

const categoriasDeProductos = (productos) => {
  const map = {};
  productos.forEach(p => {
    const cat = p.categoria || {};
    if (cat.id && !map[cat.id]) map[cat.id] = cat;
  });
  return Object.values(map);
};

export default PedidoForm;