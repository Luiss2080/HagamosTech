import { create } from 'zustand';
import { buscarProducto } from './catalogo/data/productos';

const STORAGE_KEY = 'loscatores_carrito';

const leerStorage = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const guardarStorage = (items) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // ignore
  }
};

const calcularResumen = (items) => {
  const total = items.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  const cantidad = items.reduce((acc, item) => acc + item.cantidad, 0);
  return { total_bs: total, cantidad_total: cantidad };
};

const useCarritoStore = create((set, get) => ({
  items: [],
  resumen: { total_bs: 0, cantidad_total: 0 },
  isOpen: false,
  ultimoAgregado: null,

  init: () => {
    const items = leerStorage();
    set({ items, resumen: calcularResumen(items) });
  },

  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),

  addItem: (productoId, cantidad = 1, productoDirecto = null) => {
    const producto = productoDirecto || buscarProducto(productoId);
    if (!producto) return;
    const { items } = get();
    const existente = items.find(i => i.productoId === productoId);
    let nuevos;
    if (existente) {
      nuevos = items.map(i => i.productoId === productoId ? { ...i, cantidad: i.cantidad + cantidad } : i);
    } else {
      nuevos = [...items, {
        productoId: producto.id,
        nombre: producto.nombre,
        precio: producto.precio,
        imagen: producto.imagen || producto.coverImg,
        categoria: producto.categoria || '',
        tipo: producto.tipo || producto.type || '',
        cantidad,
        icono: producto.icono || producto.icon || 'fa-star',
        subtitulo: producto.subtitulo || '',
      }];
    }
    guardarStorage(nuevos);
    set({ items: nuevos, resumen: calcularResumen(nuevos) });
    set({
      ultimoAgregado: { nombre: producto.nombre, imagen: producto.imagen || producto.coverImg, cantidad },
      agregadoVisible: true
    });
    setTimeout(() => set({ agregadoVisible: false }), 2500);
  },

  removeItem: (productoId) => {
    const { items } = get();
    const nuevos = items.filter(i => i.productoId !== productoId);
    guardarStorage(nuevos);
    set({ items: nuevos, resumen: calcularResumen(nuevos) });
  },

  updateCantidad: (productoId, cantidad) => {
    const { items } = get();
    if (cantidad <= 0) {
      const nuevos = items.filter(i => i.productoId !== productoId);
      guardarStorage(nuevos);
      set({ items: nuevos, resumen: calcularResumen(nuevos) });
      return;
    }
    const nuevos = items.map(i => i.productoId === productoId ? { ...i, cantidad } : i);
    guardarStorage(nuevos);
    set({ items: nuevos, resumen: calcularResumen(nuevos) });
  },

  clearCart: () => {
    guardarStorage([]);
    set({ items: [], resumen: { total_bs: 0, cantidad_total: 0 } });
  },
}));

export default useCarritoStore;
