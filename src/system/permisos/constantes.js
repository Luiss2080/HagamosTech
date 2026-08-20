// Mapeo de pestañas del panel a códigos de permiso de acceso a módulos del Sistema.
// Un usuario puede ver la pestaña si tiene CUALQUIERA de los códigos listados.
// El rol Administrador (rolId 1) siempre tiene acceso completo (bypass).
export const TAB_PERMISOS = {
  sucursales: ['ACCESO_SUCURSALES'],
  delivery: ['ACCESO_DELIVERY', 'GESTION_PEDIDOS'],
  horno: ['ACCESO_COCINA', 'PREPARAR_PEDIDOS'],
  clientes: ['ACCESO_CLIENTES', 'GESTION_CLIENTES'],
  eventos: ['ACCESO_EVENTOS'],
  'nueva-venta': ['ACCESO_VENTAS', 'NUEVA_VENTA'],
  catalogo: ['ACCESO_CATALOGO', 'GESTIONAR_PRODUCTOS'],
  compras: ['ACCESO_COMPRAS', 'ENTRADA_STOCK', 'ACCESO_INVENTARIO'],
  stock: ['ACCESO_INVENTARIO', 'REGISTRO_STOCK', 'ENTRADA_STOCK', 'HISTORIAL_STOCK'],
  'nuevo-usuario': ['ACCESO_USUARIOS'],
  'nuevo-rol': ['ACCESO_ROLES'],
  'nuevo-permiso': ['ACCESO_PERMISOS'],
  'rol-permisos': ['ACCESO_MATRIZ'],
  'reporte-ventas': ['ACCESO_REPORTE_VENTAS'],
  'reporte-compras': ['ACCESO_REPORTE_COMPRAS'],
  'reporte-clientes': ['ACCESO_REPORTE_CLIENTES'],
  'reporte-sucursales': ['ACCESO_REPORTE_SUCURSALES'],
  'reporte-stock': ['ACCESO_REPORTE_INVENTARIO'],
  'reporte-eventos': ['ACCESO_EVENTOS'],
  configuracion: ['ACCESO_CONFIGURACION'],
  mensajes: ['ACCESO_MENSAJES'],
  perfil: ['ACCESO_PERFIL'],
  sistema: ['ACCESO_SISTEMA'],
};

export const permisosDeTab = (tab) => TAB_PERMISOS[tab] || [];

// True si el usuario puede ver la pestaña (admin bypass o tiene algún permiso requerido).
export const tieneAccesoTab = (user, tab) => {
  if (!user) return false;
  if (user.rolId === 1) return true;
  const codigos = permisosDeTab(tab);
  if (!codigos.length) return true;
  const permisosUsuario = user.permisos || [];
  return codigos.some(c => permisosUsuario.includes(c));
};

// ── Categorías de permisos para el filtro del catálogo ──
// Adaptadas al contexto del negocio de salteñas (ventas, horno, inventario...)
const esHorno = (nombre) => /COCINA|HORNO|PREPARAR|MESA|COMAND/.test(nombre || '');
const esReporte = (nombre) => /REPORTE/.test(nombre || '');
const esSucursal = (nombre) => /SUCURSAL|LOCAL/.test(nombre || '');
const esInventario = (nombre) => /STOCK|INVENTARIO|COMPRA|SUMINISTRO|MATERIA|PRODUCTO|CATALOGO|ENTRADA/.test(nombre || '');
const esSeguridad = (nombre) => /USUARIO|ROL|PERMISO|MATRIZ|SEGURIDAD/.test(nombre || '');
const esVenta = (nombre) => /VENTA|PEDIDO|DELIVERY|CAJA|TICKET|COBRO|PAGO|CLIENTE/.test(nombre || '');
const esAcceso = (nombre) => /ACCESO|CONFIG|PERFIL|MENSAJE/.test(nombre || '');

// Devuelve la categoría de un permiso según su nombre.
export const categoriaPermiso = (nombre) => {
  if (esHorno(nombre)) return 'horno';
  if (esReporte(nombre)) return 'reportes';
  if (esSucursal(nombre)) return 'sucursales';
  if (esInventario(nombre)) return 'inventario';
  if (esSeguridad(nombre)) return 'seguridad';
  if (esVenta(nombre)) return 'ventas';
  if (esAcceso(nombre)) return 'accesos';
  return 'otras';
};

export const CATEGORIAS_PERMISOS = [
  { value: 'todas', label: 'Todas las Categorías', icon: 'fas fa-border-all' },
  { value: 'ventas', label: 'Ventas y Pedidos', icon: 'fas fa-cash-register' },
  { value: 'horno', label: 'Horno y Producción', icon: 'fas fa-kitchen-set' },
  { value: 'inventario', label: 'Inventario y Stock', icon: 'fas fa-boxes-stacked' },
  { value: 'sucursales', label: 'Sucursales', icon: 'fas fa-store' },
  { value: 'reportes', label: 'Reportes', icon: 'fas fa-chart-line' },
  { value: 'seguridad', label: 'Seguridad y Accesos', icon: 'fas fa-shield-halved' },
  { value: 'accesos', label: 'Sistema y Perfil', icon: 'fas fa-server' },
  { value: 'otras', label: 'Otros Permisos', icon: 'fas fa-ellipsis' }
];

export const filtrarPorCategoria = (permisos, categoria) => {
  if (!categoria || categoria === 'todas') return permisos;
  return permisos.filter(p => categoriaPermiso(p.nombre) === categoria);
};
