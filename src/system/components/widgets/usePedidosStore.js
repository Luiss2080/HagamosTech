import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import apiClient from '../../../servicios/clienteApi';

// Registra la venta cobrada en el módulo Ventas del sistema.
const registrarVenta = (orden) => {
  try {
    apiClient.post('/ventas-sistema', {
      codigo: orden.codigo,
      mesa: orden.mesa,
      items: orden.items.map(i => ({
        productoId: i.productoId,
        nombre: i.nombre,
        imagen: i.imagen,
        cantidad: i.cantidad,
        precio: i.precio,
        quitar: i.quitar || []
      })),
      total: orden.total,
      metodoPago: orden.metodoPago || 'efectivo',
      observaciones: orden.observaciones || '',
      origen: 'mesa'
    }).catch(() => {});
  } catch { /* silencioso */ }
};

// Store del sistema de servicio de mesa de la salteñería.
// Flujo: Mesero toma el pedido -> Caja (en_caja) -> Horno (pendiente/preparacion/listo) -> entregado.
// El pedido puede ir directo al horno si el pago se confirma en la mesa (tablet).

const MESAS = Array.from({ length: 12 }, (_, i) => i + 1);
let contador = 1;

const generarCodigo = (mesa) => {
  const hoy = new Date();
  const dd = String(hoy.getDate()).padStart(2, '0');
  const mm = String(hoy.getMonth() + 1).padStart(2, '0');
  const codigo = `LC${dd}${mm}-M${mesa}-${String(contador).padStart(3, '0')}`;
  contador += 1;
  return codigo;
};

export const usePedidosStore = create(persist((set, get) => ({
  ordenes: [],
  carrito: [],
  mesaSeleccionada: null,
  contadorCodigo: 1,

  mesas: MESAS,

  // ── Carrito / pedido en construcción ─────────────────
  seleccionarMesa: (mesa) => set({ mesaSeleccionada: mesa }),

  agregarAlCarrito: (item) => {
    const { carrito } = get();
    const idx = carrito.findIndex(i => i.productoId === item.productoId && JSON.stringify(i.quitar) === JSON.stringify(item.quitar || []));
    if (idx !== -1) {
      const nuevo = [...carrito];
      nuevo[idx] = { ...nuevo[idx], cantidad: nuevo[idx].cantidad + item.cantidad };
      set({ carrito: nuevo });
    } else {
      set({ carrito: [...carrito, item] });
    }
  },

  cambiarCantidadItem: (index, delta) => {
    const nuevo = [...get().carrito];
    nuevo[index] = { ...nuevo[index], cantidad: Math.max(1, nuevo[index].cantidad + delta) };
    set({ carrito: nuevo });
  },

  quitarDelCarrito: (index) => set({ carrito: get().carrito.filter((_, i) => i !== index) }),
  resetearPedido: () => set({ carrito: [], mesaSeleccionada: null }),

  // ── Creación del pedido ──────────────────────────────
  // aCaja = true -> va a la caja a cobrar; false -> se cobra y va directo al horno.
  enviarPedido: ({ metodoPago, aCaja = false, observaciones = '' }) => {
    const { carrito, mesaSeleccionada, contadorCodigo } = get();
    if (!mesaSeleccionada || carrito.length === 0) return null;
    contador = contadorCodigo;
    const codigo = generarCodigo(mesaSeleccionada);
    const items = carrito.map(i => ({ ...i, subtotal: i.precio * i.cantidad }));
    const total = items.reduce((a, i) => a + i.subtotal, 0);
    const orden = {
      codigo,
      mesa: mesaSeleccionada,
      items,
      total,
      metodoPago: metodoPago || 'efectivo',
      observaciones,
      estado: aCaja ? 'en_caja' : 'pendiente',
      pagado: !aCaja,
      pagadoEn: aCaja ? null : Date.now(),
      creadoEn: Date.now(),
      iniciadoEn: null,
      tiempoPreparacion: 0
    };
    set(s => ({
      ordenes: [orden, ...s.ordenes],
      carrito: [],
      mesaSeleccionada: null,
      contadorCodigo: contadorCodigo + 1
    }));
    if (!aCaja) registrarVenta(orden);
    return orden;
  },

  // Caja cobra y envía al horno
  cobrarOrden: (codigo, metodoPago) => {
    const { ordenes } = get();
    const orden = ordenes.find(o => o.codigo === codigo);
    if (orden) {
      const pagada = { ...orden, estado: 'pendiente', pagado: true, pagadoEn: Date.now(), metodoPago: metodoPago || orden.metodoPago };
      registrarVenta(pagada);
    }
    set(s => ({
      ordenes: s.ordenes.map(o => o.codigo === codigo
        ? { ...o, estado: 'pendiente', pagado: true, pagadoEn: Date.now(), metodoPago: metodoPago || o.metodoPago }
        : o)
    }));
  },

  // Horno / cocina
  iniciarPreparacion: (codigo) => set(s => ({
    ordenes: s.ordenes.map(o => o.codigo === codigo ? { ...o, estado: 'preparacion', iniciadoEn: Date.now() } : o)
  })),

  marcarListo: (codigo) => set(s => ({
    ordenes: s.ordenes.map(o => o.codigo === codigo
      ? { ...o, estado: 'listo', tiempoPreparacion: o.iniciadoEn ? Math.round((Date.now() - o.iniciadoEn) / 1000) : o.tiempoPreparacion }
      : o)
  })),

  marcarEntregado: (codigo) => set(s => ({
    ordenes: s.ordenes.map(o => o.codigo === codigo ? { ...o, estado: 'entregado', entregadoEn: Date.now() } : o)
  })),

  // Arrastrar una comanda a otro estado (drag & drop en el tablero del horno)
  moverEstado: (codigo, nuevoEstado) => set(s => ({
    ordenes: s.ordenes.map(o => {
      if (o.codigo !== codigo) return o;
      if (nuevoEstado === 'pendiente') {
        return { ...o, estado: 'pendiente', iniciadoEn: null, tiempoPreparacion: 0 };
      }
      if (nuevoEstado === 'preparacion') {
        return { ...o, estado: 'preparacion', iniciadoEn: o.iniciadoEn || Date.now() };
      }
      if (nuevoEstado === 'listo') {
        return {
          ...o,
          estado: 'listo',
          tiempoPreparacion: o.iniciadoEn ? Math.round((Date.now() - o.iniciadoEn) / 1000) : o.tiempoPreparacion
        };
      }
      return o;
    })
  })),

  anularOrden: (codigo) => set(s => ({ ordenes: s.ordenes.filter(o => o.codigo !== codigo) })),

  // ── Derivados ────────────────────────────────────────
  mesaEstado: (mesa) => {
    const deMesa = get().ordenes.filter(o => o.mesa === mesa && o.estado !== 'entregado');
    if (deMesa.some(o => o.estado === 'en_caja')) return 'en_caja';
    if (deMesa.length > 0) return 'ocupada';
    return 'libre';
  },

  enCaja: () => get().ordenes.filter(o => o.estado === 'en_caja'),
  enHorno: () => get().ordenes.filter(o => ['pendiente', 'preparacion', 'listo'].includes(o.estado)),
  enCocinaActivo: () => get().ordenes.filter(o => o.estado === 'pendiente' || o.estado === 'preparacion').length,
  pedidosActivos: () => get().ordenes.filter(o => o.estado !== 'entregado').length,
  ingresosHoy: () => get().ordenes.filter(o => o.pagado).reduce((a, o) => a + (o.total || 0), 0),
  totalPorCobrar: () => get().ordenes.filter(o => o.estado === 'en_caja').reduce((a, o) => a + (o.total || 0), 0)
}), {
  name: 'hagamostech_pedidos',
  partialize: (state) => ({ ordenes: state.ordenes, contadorCodigo: state.contadorCodigo })
}));

export const formatearTiempo = (segundos) => {
  if (!segundos || segundos < 0) return '00:00';
  const m = Math.floor(segundos / 60);
  const s = segundos % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
};

export const formatearHora = (ts) =>
  ts ? new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--:--';