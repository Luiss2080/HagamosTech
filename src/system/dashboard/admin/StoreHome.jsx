import { useState, useEffect } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import FondoSystem from '../../../components/fondos/FondoSystem';
import useAuthStore from '../../../store/useAutenticacionStore';
import Sidebar from '../../components/layouts/Sidebar';
import DashboardHome from './DashboardHome';
import Ventas from '../../ventas';
import Clientes from '../../clientes';
import UsuariosRoles from '../../usuarios';
import Roles from '../../roles';
import Permisos from '../../permisos';
import MatrizPermisos from '../../permisos/matriz';
import Productos from '../../productos';
import Stock from '../../stock';
import useStock from '../../stock/useStock';
import Compras from '../../compras';
import useCompras from '../../compras/useCompras';
import Sucursales from '../../sucursales';
import useSucursales from '../../sucursales/useSucursales';
import Delivery from '../../delivery';
import useDelivery from '../../delivery/useDelivery';
import Horno from '../../horno';
import useHorno from '../../horno/useHorno';
import ModuloPendiente from '../../components/ModuloPendiente';
import useDashboardData from './hooks/useDashboardData';
import useVentas from './hooks/useVentas';
import useClientes from './hooks/useClientes';
import useUsuarios from './hooks/useUsuarios';
import usePermisos from './hooks/usePermisos';
import useProductos from './hooks/useProductos';
import { tieneAccesoTab } from '../../permisos/constantes';

const validTabs = [
  'inicio', 'sucursales', 'delivery', 'horno', 'eventos',
  'clientes', 'registrar-cliente', 'nueva-venta', 'catalogo', 'compras', 'stock',
  'nuevo-usuario', 'nuevo-rol', 'nuevo-permiso', 'rol-permisos',
  'reporte-ventas', 'reporte-compras', 'reporte-clientes', 'reporte-sucursales', 'reporte-stock', 'reporte-eventos',
  'configuracion', 'mensajes', 'perfil', 'sistema'
];

const MODULOS_EN_PROGRESO = {
  eventos: {
    icon: 'fas fa-utensils',
    titulo: 'Eventos y Catering',
    descripcion: 'Pedidos institucionales, corporativos y catering: cotizaciones por persona, factura con NIT y seguimiento de eventos.',
    funcionalidades: ['Cotización de eventos (10–50+ personas)', 'Facturación con NIT/CI', 'Seguimiento del contrato', 'Catálogo corporativo de desayunos'],
    pasos: ['Modelo de evento/cotización', 'Módulo de cotizaciones', 'Facturación y contratos', 'Integración con clientes jurídicos']
  },
  'reporte-ventas': {
    icon: 'fas fa-chart-line',
    titulo: 'Reporte de Ventas',
    descripcion: 'Métricas del POS: ingresos por día y por sucursal, productos más vendidos, ticket promedio y comparativas.',
    funcionalidades: ['Ingresos por período y sucursal', 'Top productos vendidos', 'Ticket promedio', 'Exportación PDF/Excel'],
    pasos: ['Conectar el reporte al POS real', 'Gráficas de ingresos y tendencias', 'Filtros por sucursal y rango', 'Exportación']
  },
  'reporte-compras': {
    icon: 'fas fa-chart-column',
    titulo: 'Reporte de Insumos',
    descripcion: 'Gasto en materia prima, costos por proveedor y margen bruto por producto.',
    funcionalidades: ['Gasto total por período', 'Costos por proveedor e insumo', 'Margen bruto estimado', 'Ventas vs compras'],
    pasos: ['Conectar reporte a compras reales', 'Métricas de costo', 'Filtros y exportación']
  },
  'reporte-clientes': {
    icon: 'fas fa-chart-pie',
    titulo: 'Reporte de Clientes',
    descripcion: 'Clientes frecuentes, top compradores, rotación y el programa "Día del Cliente Frecuente".',
    funcionalidades: ['Top clientes por gasto', 'Historial de compras por cliente', 'Detección de clientes frecuentes', 'Ranking por sucursal'],
    pasos: ['Conectar reporte a clientes y ventas reales', 'Ranking y métricas', 'Filtros y exportación']
  },
  'reporte-sucursales': {
    icon: 'fas fa-store',
    titulo: 'Reporte de Sucursales',
    descripcion: 'Comparativa de desempeño entre locales: ventas, stock y clientes por punto de venta.',
    funcionalidades: ['Desempeño comparativo por sucursal', 'Stock por local', 'Ventas vs meta', 'Ranking de sucursales'],
    pasos: ['Conectar reporte a sucursales reales', 'Métricas comparativas', 'Filtros y exportación']
  },
  'reporte-stock': {
    icon: 'fas fa-boxes-stacked',
    titulo: 'Reporte de Stock',
    descripcion: 'Rotación de inventario, mermas, productos críticos y costos de mercadería por movimiento.',
    funcionalidades: ['Rotación de productos e insumos', 'Mermas por período', 'Productos con stock crítico', 'Valorización del inventario'],
    pasos: ['Conectar reporte a movimientos reales', 'Métricas de rotación y merma', 'Filtros y exportación']
  },
  'reporte-eventos': {
    icon: 'fas fa-utensils',
    titulo: 'Reporte de Eventos',
    descripcion: 'Ingresos y detalle de los eventos y del servicio de catering corporativo.',
    funcionalidades: ['Ingresos por evento', 'Clientes corporativos activos', 'Estado de contratos', 'Métricas de catering'],
    pasos: ['Conectar reporte a eventos reales', 'Métricas y filtros', 'Exportación']
  },
  configuracion: {
    icon: 'fas fa-cog',
    titulo: 'Configuración General',
    descripcion: 'Parámetros del negocio: datos de la empresa, horarios, métodos de pago aceptados, WhatsApp de pedidos e impresión de tickets.',
    funcionalidades: ['Datos de la empresa', 'Horarios de atención', 'Métodos de pago aceptados', 'Números de WhatsApp para pedidos', 'Formato de ticket/impresora'],
    pasos: ['Modelo de configuración', 'Formulario de ajustes', 'Aplicar cambios en tickets y página web', 'Respaldo de parámetros']
  },
  mensajes: {
    icon: 'fas fa-envelope',
    titulo: 'Mensajes y Contacto',
    descripcion: 'Bandeja de mensajes recibidos desde la web: contacto, pedidos, sugerencias y soporte.',
    funcionalidades: ['Bandeja de entrada', 'Filtros por tipo (contacto/pedido/sugerencia)', 'Marcar leído/respondido', 'Responder por WhatsApp'],
    pasos: ['Conectar con la API de contacto real', 'Listado y detalle', 'Estados del mensaje', 'Responder y archivar']
  },
  perfil: {
    icon: 'fas fa-id-card',
    titulo: 'Perfil del Usuario',
    descripcion: 'Datos personales, foto, contraseña y seguridad de la cuenta del operador.',
    funcionalidades: ['Datos de la cuenta', 'Cambio de contraseña', 'Foto de perfil', 'Preferencias del operador'],
    pasos: ['Conectar con el perfil existente', 'Mejoras de experiencia', 'Preferencias del operador']
  },
  sistema: {
    icon: 'fas fa-server',
    titulo: 'Sistema General',
    descripcion: 'Estado del sistema, integridad de inventario, respaldos y registros de actividad.',
    funcionalidades: ['Estado del sistema', 'Integridad de inventario', 'Respaldos de base de datos', 'Registros de actividad'],
    pasos: ['Panel de estado', 'Verificación de integridad', 'Respaldos', 'Auditoría de actividad']
  }
};

const StoreHome = () => {
  const { user, isAuthenticated, logout, fetchProfile } = useAuthStore();
  const { tab: urlTab } = useParams();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState(urlTab || 'inicio');
  const [isDark, setIsDark] = useState(() => localStorage.theme === 'dark');

  const toggleDark = () => {
    setIsDark(prev => {
      const next = !prev;
      localStorage.theme = next ? 'dark' : 'light';
      return next;
    });
  };

  if (urlTab && !validTabs.includes(urlTab)) {
    return <Navigate to="/errors/404" replace />;
  }

  const {
    dashboardData, loadingDashboard, verificandoIntegridad,
    cargarDashboard, verificarIntegridadInventario
  } = useDashboardData();

  const {
    ventas,
    cargarVentas,
    crearVenta,
    anularVenta
  } = useVentas();

  const {
    clientes, buscarCliente, setBuscarCliente, clienteForm, setClienteForm,
    cargarClientes, submitCliente, eliminarCliente
  } = useClientes(user);

  const {
    usuarios, usuarioForm, setUsuarioForm, usuarioEditando, setUsuarioEditando,
    roles, setRoles, rolForm, setRolForm, rolEditando, setRolEditando,
    cargarUsuarios, submitUsuario, cambiarEstadoUsuario, submitRol, eliminarRol
  } = useUsuarios();

  const {
    permisos, permisoForm, setPermisoForm, permisoEditando, setPermisoEditando,
    permisosDisponibles, matrizPermisos,
    cargarPermisos, cargarMatrizPermisos, submitPermiso, eliminarPermiso, togglePermisoRol
  } = usePermisos(user, fetchProfile);

  const {
    productos, categorias, productoForm, setProductoForm, productoEditando, setProductoEditando,
    cargarProductos, cargarCategorias, submitProducto, eliminarProducto
  } = useProductos();



  const tienePermiso = (codigoPermiso) => {
    if (!user) return false;
    if (user?.rolId === 1) return true;
    return user?.permisos && user?.permisos.includes(codigoPermiso);
  };

  const accesoDenegado = activeTab !== 'inicio' && !tieneAccesoTab(user, activeTab);

  useEffect(() => {
    if (isAuthenticated) fetchProfile();
  }, [isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated) return;
    navigate(activeTab === 'inicio' ? '/store/home' : `/store/home/${activeTab}`, { replace: true });
  }, [activeTab, isAuthenticated, navigate]);

  useEffect(() => {
    cargarDashboard();
    cargarMatrizPermisos();
    cargarVentas();
    cargarClientes();
    cargarUsuarios();
    cargarPermisos();
    cargarProductos();
    cargarCategorias();
  }, [isAuthenticated, user?.id]);

  useEffect(() => {
    if (!isAuthenticated) return;
    // Refrescar siempre los contadores del sidebar para que estÃ©n al dÃ­a
    cargarClientes();
    cargarVentas();
    cargarUsuarios();
    cargarPermisos();
    const load = {
      'nueva-venta': () => { cargarVentas(); },
      'gestion-clientes': () => cargarClientes(),
      'registrar-cliente': () => cargarClientes(),
      clientes: () => cargarClientes(),
      'nuevo-usuario': () => cargarUsuarios(),
      'nuevo-rol': () => cargarUsuarios(),
      'nuevo-permiso': () => cargarPermisos(),
      'rol-permisos': () => { cargarPermisos(); cargarMatrizPermisos(); },
      catalogo: () => { cargarProductos(); cargarCategorias(); },
    };
    load[activeTab]?.();
  }, [activeTab, isAuthenticated]);

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <main id="store-home" className="relative min-h-screen pt-4 md:pt-6 lg:pt-8 font-montserrat w-full">
      <FondoSystem transparent hideWaves />
      
      {/* Modern decorative wave at the top */}
      <div className="fixed top-0 left-0 w-full overflow-hidden leading-[0] opacity-20 pointer-events-none z-0">
          <svg relative="true" viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-[calc(100%+1.3px)] h-[80px] block">
              <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-[#FF4D00]"></path>
          </svg>
      </div>

      {/* Modern decorative wave at the bottom */}
      <div className="fixed bottom-0 left-0 w-full overflow-hidden leading-[0] transform rotate-180 opacity-20 pointer-events-none z-0">
          <svg relative="true" viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-[calc(100%+1.3px)] h-[80px] block">
              <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-[#FF4D00]"></path>
          </svg>
      </div>
      {!isAuthenticated ? (
        <Navigate to="/errors/401" replace />
      ) : (
        <div className={`relative z-10 w-full min-h-screen flex flex-col lg:flex-row items-start gap-4 px-4 pb-4 transition-colors duration-300 ${isDark ? 'dark' : ''}`}>
            <Sidebar
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              tienePermiso={tienePermiso}
              user={user}
              logout={handleLogout}
              isDark={isDark}
              onToggleDark={toggleDark}
              showAlert={() => {}}
              counts={{
                clientes: clientes?.length || 0,
                'nueva-venta': ventas?.length || 0,
                'nuevo-usuario': usuarios?.length || 0,
                'nuevo-rol': roles?.length || 0,
                'nuevo-permiso': permisosDisponibles?.length || 0,
              }}
            />
          <div className="flex-1 w-full min-w-0 space-y-4">
            {(activeTab === 'inicio' || activeTab === 'reportes') ? (
              <DashboardHome
                dashboardData={dashboardData}
                loadingDashboard={loadingDashboard}
                user={user}
                setActiveTab={setActiveTab}
                verificarIntegridadInventario={verificarIntegridadInventario}
                verificandoIntegridad={verificandoIntegridad}
                cargarDashboard={cargarDashboard}
                logout={handleLogout}
              />
            ) : accesoDenegado ? (
              <div className="bg-white dark:bg-[#040408] dark:border-white/8 rounded-2xl p-10 shadow-xl dark:shadow-black/60 border border-slate-200/60 dark:border-white/5 border-l-4 border-l-[#E95A0C] text-center w-full animate-fade-in">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl  dark:bg-rose-950/400/10 text-[#E95A0C] flex items-center justify-center text-3xl border border-orange-500/20">
                  <i className="fas fa-lock"></i>
                </div>
                <h3 className="text-base font-black text-slate-900 dark:text-white uppercase tracking-wider mb-2">
                  Acceso Restringido
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-bold leading-relaxed max-w-md mx-auto">
                  Su rol no cuenta con el permiso necesario para acceder a este mÃ³dulo del Sistema.
                  Contacte al administrador para solicitar el acceso correspondiente.
                </p>
              </div>
            ) : (
              <div className="w-full space-y-4">
                {activeTab === 'nuevo-usuario' && (
                  <UsuariosRoles
                    activeTab={activeTab}
                    usuarioForm={usuarioForm}
                    setUsuarioForm={setUsuarioForm}
                    submitUsuario={submitUsuario}
                    rolForm={rolForm}
                    setRolForm={setRolForm}
                    submitRol={submitRol}
                    usuarios={usuarios}
                    roles={roles}
                    cambiarEstadoUsuario={cambiarEstadoUsuario}
                    usuarioEditando={usuarioEditando}
                    setUsuarioEditando={setUsuarioEditando}
                    rolEditando={rolEditando}
                    setRolEditando={setRolEditando}
                    eliminarRol={eliminarRol}
                    cargarUsuarios={cargarUsuarios}
                  />
                )}
                {activeTab === 'nuevo-rol' && (
                  <Roles
                    rolForm={rolForm}
                    setRolForm={setRolForm}
                    submitRol={submitRol}
                    eliminarRol={eliminarRol}
                    roles={roles}
                    cargarRoles={cargarUsuarios}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    rolEditando={rolEditando}
                    setRolEditando={setRolEditando}
                    usuarios={usuarios}
                    permisos={permisos}
                  />
                )}
                {activeTab === 'nuevo-permiso' && (
                  <Permisos
                    permisoForm={permisoForm}
                    setPermisoForm={setPermisoForm}
                    submitPermiso={submitPermiso}
                    eliminarPermiso={eliminarPermiso}
                    permisosDisponibles={permisosDisponibles}
                    cargarPermisos={cargarPermisos}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    permisoEditando={permisoEditando}
                    setPermisoEditando={setPermisoEditando}
                    matrizPermisos={matrizPermisos}
                  />
                )}
                {activeTab === 'rol-permisos' && (
                  <MatrizPermisos
                    permisos={permisos}
                    matrizPermisos={matrizPermisos}
                    togglePermisoRol={togglePermisoRol}
                    setActiveTab={setActiveTab}
                  />
                )}
                {activeTab === 'catalogo' && (
                  <Productos
                    productos={productos}
                    categorias={categorias}
                    productoForm={productoForm}
                    setProductoForm={setProductoForm}
                    submitProducto={submitProducto}
                    eliminarProducto={eliminarProducto}
                    cargarProductos={cargarProductos}
                    productoEditando={productoEditando}
                    setProductoEditando={setProductoEditando}
                    setActiveTab={setActiveTab}
                  />
                )}
                {activeTab === 'stock' && (
                  <Stock
                    productos={productos}
                    setActiveTab={setActiveTab}
                    useStock={useStock}
                  />
                )}
                {activeTab === 'compras' && (
                  <Compras
                    productos={productos}
                    setActiveTab={setActiveTab}
                    useCompras={useCompras}
                  />
                )}
                {activeTab === 'sucursales' && (
                  <Sucursales
                    setActiveTab={setActiveTab}
                    useSucursales={useSucursales}
                  />
                )}
                {activeTab === 'delivery' && (
                  <Delivery
                    productos={productos}
                    setActiveTab={setActiveTab}
                    useDelivery={useDelivery}
                  />
                )}
                {activeTab === 'horno' && (
                  <Horno
                    productos={productos}
                    setActiveTab={setActiveTab}
                    useHorno={useHorno}
                  />
                )}
                {activeTab === 'nueva-venta' && (
                  <Ventas
                    ventas={ventas}
                    cargarVentas={cargarVentas}
                    crearVenta={crearVenta}
                    anularVenta={anularVenta}
                    productos={productos}
                    categorias={categorias}
                    setActiveTab={setActiveTab}
                  />
                )}
                {MODULOS_EN_PROGRESO[activeTab] && (
                  <ModuloPendiente {...MODULOS_EN_PROGRESO[activeTab]} />
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
};

export default StoreHome;
