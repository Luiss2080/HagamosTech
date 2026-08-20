import React, { useState, useEffect } from 'react';
import apiClient from '../../../servicios/clienteApi';
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, 
  PieChart, Pie, Cell
} from 'recharts';

const DashboardHome = ({
  dashboardData,
  loadingDashboard,
  user,
  setActiveTab,
  verificarIntegridadInventario,
  verificandoIntegridad,
  cargarDashboard,
  logout
}) => {
  const [ventasTab, setVentasTab] = useState('ventas');
  const [clientTab, setClientTab] = useState('clientes');
  const [modData, setModData] = useState({ clientes: [], ventas: [], compras: [], usuarios: [], colegios: [] });
  const [loadingMods, setLoadingMods] = useState(true);
  
  // Para la Gráfica 6
  const [activeChart6Tab, setActiveChart6Tab] = useState('Colegios');

  useEffect(() => {
    if (!dashboardData) return;
    const fetchAll = async () => {
      try {
        const [cliRes, venRes, comRes, usuRes, colRes] = await Promise.allSettled([
          apiClient.get('/clientes-sistema/?limite=100'),
          apiClient.get('/ventas-sistema/?limite=100'),
          apiClient.get('/compras-sistema/?limite=100'),
          apiClient.get('/usuarios-sistema/?limite=100'),
          apiClient.get('/colegios-sistema/?limite=100')
        ]);
        setModData({
          clientes: cliRes.value?.data?.clientes || [],
          ventas: venRes.value?.data?.ventas || [],
          compras: comRes.value?.data?.compras || [],
          usuarios: usuRes.value?.data?.usuarios || [],
          colegios: colRes.value?.data?.colegios || []
        });
      } finally {
        setLoadingMods(false);
      }
    };
    fetchAll();
  }, [dashboardData]);

  if (loadingDashboard) {
    return (
      <div className="flex flex-col items-center justify-center py-28 text-slate-400">
        <div className="relative flex items-center justify-center mb-4">
          <div className="w-16 h-16 rounded-2xl border-4 border-t-[#E95A0C] border-r-transparent border-b-orange-200 border-l-transparent animate-spin"></div>
          <i className="fas fa-chart-line text-xl text-[#E95A0C] absolute animate-pulse"></i>
        </div>
        <p className="text-xs font-black uppercase tracking-widest text-slate-600 dark:text-slate-400">Cargando analíticas comerciales...</p>
        <span className="text-[10px] text-slate-400 mt-1 font-mono">Consolidando métricas e inventarios</span>
      </div>
    );
  }

  if (!dashboardData) return null;

  // Cálculos originales adaptados a Salteñería
  const totalUsers = dashboardData.kpis?.totalUsuarios || 24;
  const adminCount = dashboardData.distribucionRoles?.find(r => r.rolNombre === 'Administrador')?.cantidad || 2;
  const teacherCount = dashboardData.distribucionRoles?.filter(r => r.rolNombre.includes('Cajero') || r.rolNombre.includes('Hornero')).reduce((sum, r) => sum + r.cantidad, 0) || 10;
  const sellerCount = dashboardData.distribucionRoles?.find(r => r.rolNombre === 'Repartidor')?.cantidad || 12;
  const guestCount = dashboardData.kpis?.totalEstudiantes || 1500;

  const pctAdmin = Math.round((adminCount / totalUsers) * 100) || 8;
  const pctTeacher = Math.round((teacherCount / totalUsers) * 100) || 42;
  const pctGuest = Math.round((guestCount / (guestCount + totalUsers)) * 100) || 98; // pctGuest represents customers vs staff conceptually
  const pctEmployee = Math.round((teacherCount / totalUsers) * 100) || 42;
  const pctCustomer = Math.round((guestCount / (guestCount + totalUsers)) * 100) || 98;
  const pctDriver = Math.max(0, 100 - pctAdmin - pctEmployee);

  const currentDateFormatted = new Date().toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // DATOS PARA GRí FICAS RECHARTS
  // 1. Usuarios Registrados (Stacked Bar)
  const usersHistoryData = [
    { name: 'Mar', clientes: Math.floor(guestCount * 0.4), empleados: Math.floor(teacherCount * 0.8), admins: 1 },
    { name: 'Abr', clientes: Math.floor(guestCount * 0.5), empleados: Math.floor(teacherCount * 0.8), admins: 2 },
    { name: 'May', clientes: Math.floor(guestCount * 0.6), empleados: Math.floor(teacherCount * 0.9), admins: 2 },
    { name: 'Jun', clientes: Math.floor(guestCount * 0.8), empleados: Math.floor(teacherCount * 1.0), admins: 2 },
    { name: 'Jul', clientes: Math.floor(guestCount * 0.9), empleados: teacherCount, admins: adminCount },
    { name: 'Ago', clientes: guestCount, empleados: teacherCount, admins: adminCount }
  ];

  // 2. Ventas (Line)
  const salesHistoryData = dashboardData?.datosGrafico?.length
    ? dashboardData.datosGrafico.map(d => ({
        name: new Date(d.fecha).toLocaleDateString('es-ES', { weekday: 'short' }),
        ingresos: Math.round(d.total)
      }))
    : [
        { name: 'Lun', ingresos: 1200 }, { name: 'Mar', ingresos: 1800 }, { name: 'Mié', ingresos: 800 },
        { name: 'Jue', ingresos: 2200 }, { name: 'Vie', ingresos: 1500 }, { name: 'Sáb', ingresos: 1000 },
        { name: 'Dom', ingresos: 600 }
      ];

  // 3. Distribución Roles (Donut)
  const distributionData = [
    { name: 'Clientes Frec.', value: guestCount, color: '#3b82f6' }, // Blue
    { name: 'Personal', value: teacherCount, color: '#a855f7' },  // Purple
    { name: 'Admins', value: adminCount, color: '#E95A0C' },      // Red Los Castores
    { name: 'Delivery', value: sellerCount, color: '#f59e0b' }  // Amber
  ].filter(d => d.value > 0);

  // 4. Top Libros/Cursos (Horizontal) -> Ahora Productos
  const topBooksData = [
    { name: 'Salteña de Carne Fricase', value: 8540.50 },
    { name: 'Salteña de Pollo', value: 6220.00 },
    { name: 'Salteña Hoja Carne', value: 4180.30 },
    { name: 'Empanada Queso', value: 3150.80 },
    { name: 'Refresco Mocochinchi', value: 2410.20 }
  ];

  // 5. Ventas vs Compras (Bar Vertical)
  const cashFlowData = [
    { name: 'Lun', Ventas: 400, Compras: 240 },
    { name: 'Mar', Ventas: 300, Compras: 139 },
    { name: 'Mié', Ventas: 200, Compras: 980 },
    { name: 'Jue', Ventas: 278, Compras: 390 },
    { name: 'Vie', Ventas: 189, Compras: 480 },
    { name: 'Sáb', Ventas: 489, Compras: 280 },
  ];

  // 6. Top Clientes vs Colegios (Toggle Horizontal) -> Eventos vs Clientes
  const topColegiosData = modData.colegios?.length ? modData.colegios.slice(0, 5).map(c => ({
    name: c.nombre?.substring(0, 20) || 'Evento Especial',
    value: c.totalGastado || Math.floor(Math.random() * 5000)
  })).sort((a,b) => b.value - a.value) : [
    { name: 'Cumpleaños Juan', value: 4500 },
    { name: 'Kermesse Colegio', value: 3200 },
    { name: 'Reunión Empresa X', value: 2100 }
  ];

  const topClientesData = modData.clientes?.length ? modData.clientes.slice(0, 5).map(c => ({
    name: c.nombre?.substring(0, 20) || 'Cliente',
    value: c.totalGastado || Math.floor(Math.random() * 1000)
  })).sort((a,b) => b.value - a.value) : [
    { name: 'Maria Lopez', value: 850 },
    { name: 'Carlos Sanchez', value: 620 },
    { name: 'Ana Menúdoza', value: 410 }
  ];

  const chart6Data = activeChart6Tab === 'Colegios' ? topColegiosData : topClientesData;

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#fffcf9] dark:bg-[#040408] dark:border-white/5 p-3 border border-orange-200/50 shadow-xl dark:shadow-black/60 rounded-xl">
          <p className="text-xs font-bold text-[#6B442A] dark:text-slate-300 mb-2">{label}</p>
          {payload.map((entry, index) => (
            <div key={`item-${index}`} className="flex items-center justify-between gap-4 text-[10px] font-semibold">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color || entry.fill }}></span>
                <span className="text-slate-500 dark:text-slate-400 capitalize">{entry.name}</span>
              </div>
              <span className="text-[#4A2E1B] dark:text-white">{entry.value}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="relative space-y-5 font-montserrat w-full">
      {/* ——— 1. BARRA SUPERIOR DE ACCIONES RÁPIDAS ——— */}
      <div className="relative z-10 bg-[#fffcf9] dark:bg-[#040408] dark:border-white/8 p-5 rounded-2xl border border-orange-200/50 shadow-lg shadow-orange-900/5 dark:shadow-black/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-gradient-to-br from-[#E95A0C]/10 to-transparent rounded-full blur-3xl pointer-events-none animate-pulse"></div>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-[#E95A0C] text-white rounded-2xl flex items-center justify-center shadow-lg shadow-[#E95A0C]/30 dark:shadow-none">
            <i className="fas fa-home text-2xl"></i>
          </div>
          <div>
            <h1 className="text-3xl font-black text-[#4A2E1B] dark:text-white flex items-center gap-3">
              ¡¡¡Bienvenido, <span className="text-[#E95A0C]">{user?.nombre || 'TheLuiSanders'}</span>!
            </h1>
            <p className="text-sm font-bold text-slate-500 dark:text-slate-400 capitalize">{currentDateFormatted}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto relative z-10">
          <div className="relative flex-[3] md:min-w-[400px]">
            <div className="absolute inset-0 rounded-xl border-l-4 border-l-[#E95A0C] pointer-events-none"></div>
            <i className="fas fa-search absolute left-3.5 top-1/2 -translate-y-1/2 text-[#E95A0C] text-xs"></i>
            <input
              type="text"
              placeholder="Buscar en el panel..."
              className="w-full pl-9 pr-14 py-2.5 rounded-xl border border-orange-200/50 dark:border-white/10 bg-slate-50 dark:bg-[#070710] text-[#6B442A] dark:text-slate-200 text-xs focus:ring-2 focus:ring-[#E95A0C]/40 outline-none font-bold placeholder:text-slate-400 dark:placeholder:text-slate-600 transition-all"
            />
            <div className="absolute right-1.5 top-1/2 -translate-y-1/2 flex items-center gap-1">
              <div className="w-px h-5 bg-slate-200 dark:bg-white/10"></div>
              <button className="w-7 h-7 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-[#E95A0C] flex items-center justify-center transition-all" title="Filtros avanzados">
                <i className="fas fa-sliders-h text-[10px]"></i>
              </button>
            </div>
          </div>
          <button className="w-9 h-9 rounded-xl bg-[#fffcf9] dark:bg-[#040408] dark:border-white/8 border border-[#E95A0C]/40 flex items-center justify-center text-[#E95A0C] hover:bg-orange-50 dark:hover:bg-orange-950/30 transition-all shrink-0 shadow-sm relative" title="Calendario">
            <i className="fas fa-calendar-days text-sm"></i>
            <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] rounded-full bg-amber-50 dark:bg-amber-950/400 text-white text-[8px] font-bold flex items-center justify-center px-1 shadow-lg shadow-orange-900/5 dark:shadow-black/60 border-2 border-white">27</span>
          </button>
          <button className="w-9 h-9 rounded-xl bg-[#fffcf9] dark:bg-[#040408] dark:border-white/8 border border-[#E95A0C]/40 flex items-center justify-center text-[#E95A0C] hover:bg-orange-50 dark:hover:bg-orange-950/30 transition-all shrink-0 shadow-sm relative" title="Favoritos">
            <i className="fas fa-star text-sm"></i>
            <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] rounded-full bg-amber-50 dark:bg-amber-950/400 text-white text-[8px] font-bold flex items-center justify-center px-1 shadow-lg shadow-orange-900/5 dark:shadow-black/60 border-2 border-white">12</span>
          </button>
          <button className="w-9 h-9 rounded-xl bg-[#fffcf9] dark:bg-[#040408] dark:border-white/8 border border-[#E95A0C]/40 flex items-center justify-center text-[#E95A0C] hover:bg-orange-50 dark:hover:bg-orange-950/30 transition-all shrink-0 shadow-sm relative" title="Notificaciones">
            <i className="fas fa-bell text-sm"></i>
            <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] rounded-full bg-amber-50 dark:bg-amber-950/400 text-white text-[8px] font-bold flex items-center justify-center px-1 shadow-lg shadow-orange-900/5 dark:shadow-black/60 border-2 border-white">3</span>
          </button>
          <div className="w-px h-8 bg-slate-200 dark:bg-white/10"></div>
          <button onClick={logout} className="w-9 h-9 rounded-xl bg-[#E95A0C] hover:bg-orange-700 text-white border border-[#E95A0C]/30 flex items-center justify-center transition-all shrink-0 shadow-sm" title="Cerrar Sesión">
            <i className="fas fa-power-off text-sm"></i>
          </button>
        </div>
      </div>

      {/* â”€â”€ 2. CARDS DE Mí‰TRICAS ORIGINALES â”€â”€ */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Usuarios */}
        <div onClick={() => setActiveTab('nuevo-usuario')} className="bg-white dark:bg-[#040408] dark:border-white/8 rounded-2xl shadow-lg shadow-orange-900/5 dark:shadow-black/60 hover:shadow-xl dark:shadow-black/60 hover:shadow-orange-500/15 dark:shadow-none border border-orange-200/50 border-l-4 border-l-[#E95A0C] overflow-hidden group transition-all duration-300 cursor-pointer hover:-translate-y-1 relative">
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-[#E95A0C]/10 to-transparent rounded-full blur-2xl pointer-events-none animate-pulse"></div>
          <div className="p-4 flex items-center justify-between relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-[#E95A0C] text-white flex items-center justify-center text-base shadow-lg shadow-orange-900/5 dark:shadow-black/60 shadow-orange-500/20 dark:shadow-none group-hover:scale-110 group-hover:rotate-3 transition-all duration-300"><i className="fas fa-users"></i></div>
              <div>
                <h3 className="text-2xl font-black text-[#4A2E1B] dark:text-white leading-none">{totalUsers}</h3>
                <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Usuarios</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-px h-10 bg-slate-200 dark:bg-white/10"></div>
              <div className="flex flex-col items-end gap-1">
                <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 px-2 py-1 rounded-lg flex items-center gap-1"><i className="fas fa-arrow-up text-[9px] text-emerald-600"></i> 12%</span>
                <span className="text-[9px] font-bold text-slate-400 flex items-center gap-1"><i className="fas fa-user-shield text-[8px] text-[#E95A0C]"></i> {adminCount} admins</span>
              </div>
            </div>
          </div>
        </div>

        {/* KPI 2: Clientes */}
        <div onClick={() => setActiveTab('clientes')} className="bg-white dark:bg-[#040408] dark:border-white/8 rounded-2xl shadow-lg shadow-orange-900/5 dark:shadow-black/60 hover:shadow-xl dark:shadow-black/60 hover:shadow-blue-500/15 dark:shadow-none border border-orange-200/50 border-l-4 border-l-blue-600 overflow-hidden group transition-all duration-300 cursor-pointer hover:-translate-y-1 relative">
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-transparent rounded-full blur-2xl pointer-events-none animate-pulse"></div>
          <div className="p-4 flex items-center justify-between relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600 to-blue-500 text-white flex items-center justify-center text-base shadow-lg shadow-orange-900/5 dark:shadow-black/60 shadow-blue-500/20 dark:shadow-none group-hover:scale-110 group-hover:rotate-3 transition-all duration-300"><i className="fas fa-user-tie"></i></div>
              <div>
                <h3 className="text-2xl font-black text-[#4A2E1B] dark:text-white leading-none">{guestCount}</h3>
                <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Clientes Frec.</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-px h-10 bg-slate-200 dark:bg-white/10"></div>
              <div className="flex flex-col items-end gap-1">
                <span className="text-[10px] font-black text-blue-600 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/50 px-2 py-1 rounded-lg flex items-center gap-1"><i className="fas fa-arrow-up text-[9px] text-blue-600"></i> +15%</span>
                <span className="text-[9px] font-bold text-slate-400 flex items-center gap-1"><i className="fas fa-star text-[8px] text-blue-500"></i> Fidelidad Alta</span>
              </div>
            </div>
          </div>
        </div>

        {/* KPI 3: Personal */}
        <div onClick={() => setActiveTab('nuevo-usuario')} className="bg-white dark:bg-[#040408] dark:border-white/8 rounded-2xl shadow-lg shadow-orange-900/5 dark:shadow-black/60 hover:shadow-xl dark:shadow-black/60 hover:shadow-purple-500/15 dark:shadow-none border border-orange-200/50 border-l-4 border-l-purple-600 overflow-hidden group transition-all duration-300 cursor-pointer hover:-translate-y-1 relative">
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full blur-2xl pointer-events-none animate-pulse"></div>
          <div className="p-4 flex items-center justify-between relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-purple-600 to-purple-500 text-white flex items-center justify-center text-base shadow-lg shadow-orange-900/5 dark:shadow-black/60 shadow-purple-500/20 dark:shadow-none group-hover:scale-110 group-hover:rotate-3 transition-all duration-300"><i className="fas fa-user-tag"></i></div>
              <div>
                <h3 className="text-2xl font-black text-[#4A2E1B] dark:text-white leading-none">{teacherCount + sellerCount}</h3>
                <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Personal</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-px h-10 bg-slate-200 dark:bg-white/10"></div>
              <div className="flex flex-col items-end gap-1">
                <span className="text-[10px] font-black text-purple-600 bg-purple-50 dark:bg-purple-950/40 border border-purple-200 px-2 py-1 rounded-lg flex items-center gap-1"><i className="fas fa-motorcycle text-[9px] text-purple-600"></i> {sellerCount} Deliv.</span>
                <span className="text-[9px] font-bold text-slate-400 flex items-center gap-1"><i className="fas fa-cash-register text-[8px] text-purple-500"></i> {teacherCount} Local</span>
              </div>
            </div>
          </div>
        </div>

        {/* KPI 4: Productos Activos */}
        <div onClick={() => setActiveTab('catalogo')} className="bg-white dark:bg-[#040408] dark:border-white/8 rounded-2xl shadow-lg shadow-orange-900/5 dark:shadow-black/60 hover:shadow-xl dark:shadow-black/60 hover:shadow-amber-500/15 dark:shadow-none border border-orange-200/50 border-l-4 border-l-amber-500 overflow-hidden group transition-all duration-300 cursor-pointer hover:-translate-y-1 relative">
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-amber-500/10 to-transparent rounded-full blur-2xl pointer-events-none animate-pulse"></div>
          <div className="p-4 flex items-center justify-between relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-500 text-white flex items-center justify-center text-base shadow-lg shadow-orange-900/5 dark:shadow-black/60 shadow-amber-500/20 dark:shadow-none group-hover:scale-110 group-hover:rotate-3 transition-all duration-300"><i className="fas fa-box-open"></i></div>
              <div>
                <h3 className="text-2xl font-black text-[#4A2E1B] dark:text-white leading-none">{dashboardData.kpis?.totalLibrosCatalogo || 12}</h3>
                <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Productos / Menúú</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-px h-10 bg-slate-200 dark:bg-white/10"></div>
              <div className="flex flex-col items-end gap-1">
                <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 px-2 py-1 rounded-lg flex items-center gap-1"><i className="fas fa-arrow-up text-[9px] text-emerald-600"></i> +2 Nuevos</span>
                <span className="text-[9px] font-bold text-slate-400 flex items-center gap-1"><i className="fas fa-circle-check text-[8px] text-amber-500"></i> Menúú Activo</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ——— 3. SECCIONES DE GRí FICAS RECHARTS ——— */}
      {loadingMods ? (
        <div className="flex items-center justify-center py-20 text-slate-400">
          <div className="w-12 h-12 rounded-2xl border-4 border-t-[#E95A0C] border-r-transparent border-b-orange-200 border-l-transparent animate-spin"></div>
          <span className="ml-4 text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Generando métricas visuales...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mt-6">
          
          {/* Chart 1: Crecimiento de Usuarios (lg:col-span-5) */}
          <div className="lg:col-span-5 bg-white dark:bg-[#040408] dark:border-white/8 rounded-2xl shadow-lg shadow-orange-900/5 dark:shadow-black/60 border border-orange-200/50 overflow-hidden flex flex-col relative">
            <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-gradient-to-br from-blue-500/10 to-transparent rounded-full blur-3xl pointer-events-none animate-pulse"></div>
            <div className="px-4 py-3 flex items-center justify-between relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center text-sm shadow-lg shadow-orange-900/5 dark:shadow-black/60 shadow-blue-500/30 dark:shadow-none"><i className="fas fa-users"></i></div>
                <div>
                  <h3 className="text-[11px] font-black text-[#4A2E1B] dark:text-white uppercase tracking-wider">Crecimiento Usuarios</h3>
                  <p className="text-[9px] text-slate-500 dark:text-slate-400 font-bold flex items-center gap-1"><i className="fas fa-calendar-alt text-[8px]"></i> Altas registradas</p>
                </div>
              </div>
              <div className="flex bg-slate-100 dark:bg-[#070710] p-0.5 rounded-lg">
                <button className="px-2 py-1 rounded-md text-[9px] font-bold text-slate-500 dark:text-slate-400 hover:text-blue-600 transition-all"><i className="fas fa-calendar-week mr-1 hidden sm:inline"></i>Week</button>
                <button className="px-2 py-1 rounded-md text-[9px] font-bold text-slate-500 dark:text-slate-400 hover:text-blue-600 transition-all"><i className="fas fa-calendar-day mr-1 hidden sm:inline"></i>Month</button>
                <button className="px-2 py-1 rounded-md text-[9px] font-bold bg-[#E95A0C] text-white shadow-sm"><i className="fas fa-calendar text-[8px] mr-1"></i>Year</button>
              </div>
            </div>
            <div className="px-4 pb-4 flex flex-col w-full">
              <div className="w-full h-[170px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={usersHistoryData} margin={{ top: 10, right: 0, left: -25, bottom: 0 }} style={{ background: "transparent" }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#12121f" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#3d3d5c', fontWeight: 'bold' }} dy={5} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#3d3d5c', fontWeight: 'bold' }} />
                    <RechartsTooltip content={<CustomTooltip />} wrapperStyle={{ background: "transparent", border: "none", boxShadow: "none", outline: "none" }} cursor={{ fill: "rgba(255,255,255,0.03)", stroke: "none" }} />
                    <Bar dataKey="clientes" stackId="a" fill="#3b82f6" radius={[0, 0, 4, 4]} barSize={16} name="Clientes" />
                    <Bar dataKey="empleados" stackId="a" fill="#a855f7" name="Personal" />
                    <Bar dataKey="admins" stackId="a" fill="#E95A0C" radius={[4, 4, 0, 0]} name="Admins" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="border-t border-slate-100 mt-2 pt-2 flex flex-wrap items-center justify-center gap-3">
                <div className="flex items-center gap-1.5 px-2 py-1 bg-blue-50 dark:bg-blue-950/40 rounded-md border border-blue-200 dark:border-blue-900/50">
                  <span className="w-2 h-2 rounded-full bg-blue-600 shadow-sm"></span>
                  <span className="text-[9px] font-black text-blue-500 dark:text-blue-400 uppercase">Clientes</span>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-1 bg-purple-50 dark:bg-purple-950/40 rounded-md border border-purple-200">
                  <span className="w-2 h-2 rounded-full bg-purple-600 shadow-sm"></span>
                  <span className="text-[9px] font-black text-purple-500 dark:text-purple-400 uppercase">Personal</span>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-1  rounded-md border border-orange-200">
                  <span className="w-2 h-2 rounded-full bg-[#E95A0C] shadow-sm"></span>
                  <span className="text-[9px] font-black text-[#E95A0C] dark:text-orange-400 uppercase">Admins</span>
                </div>
              </div>
            </div>
          </div>

          {/* Chart 2: Ventas e Ingresos (lg:col-span-7) */}
          <div className="lg:col-span-7 bg-white dark:bg-[#040408] dark:border-white/8 rounded-3xl shadow-lg shadow-orange-900/5 dark:shadow-black/60 border border-orange-200/50 overflow-hidden flex flex-col relative">
            <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-gradient-to-br from-[#E95A0C]/10 to-transparent rounded-full blur-3xl pointer-events-none animate-pulse"></div>
            <div className="px-4 py-3 flex items-center justify-between relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#E95A0C] text-white flex items-center justify-center text-sm shadow-lg shadow-orange-900/5 dark:shadow-black/60 shadow-orange-500/30"><i className="fas fa-chart-line"></i></div>
                <div>
                  <h3 className="text-[11px] font-black text-[#4A2E1B] dark:text-white uppercase tracking-wider">Ingresos por Ventas</h3>
                  <p className="text-[9px] text-slate-500 dark:text-slate-400 font-bold flex items-center gap-1"><i className="fas fa-arrow-trend-up text-[8px] text-emerald-500"></i> Histórico últimos 7 días</p>
                </div>
              </div>
              <div className="flex bg-slate-100 dark:bg-[#070710] p-0.5 rounded-lg">
                <button className="px-2 py-1 rounded-md text-[9px] font-bold bg-[#E95A0C] text-white shadow-sm"><i className="fas fa-clock text-[8px] mr-1"></i>Semana</button>
                <button className="px-2 py-1 rounded-md text-[9px] font-bold text-slate-500 dark:text-slate-400 hover:text-[#E95A0C] transition-all">Mes</button>
                <button className="px-2 py-1 rounded-md text-[9px] font-bold text-slate-500 dark:text-slate-400 hover:text-[#E95A0C] transition-all">Año</button>
              </div>
            </div>
            <div className="px-4 pb-4 flex flex-col w-full">
              <div className="w-full h-[170px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={salesHistoryData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#12121f" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#3d3d5c', fontWeight: 'bold' }} dy={5} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#3d3d5c', fontWeight: 'bold' }} tickFormatter={(v) => `$${v}`} />
                    <RechartsTooltip content={<CustomTooltip />} wrapperStyle={{ background: "transparent", border: "none", boxShadow: "none", outline: "none" }} cursor={{ fill: "rgba(255,255,255,0.03)", stroke: "none" }} />
                    <Line type="monotone" dataKey="ingresos" stroke="#E95A0C" strokeWidth={3} dot={{ r: 4, fill: '#E95A0C', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6, fill: '#E95A0C', stroke: '#fff', strokeWidth: 2 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="border-t border-slate-100 dark:border-white/5 mt-2 pt-2 flex items-center gap-2 overflow-x-auto custom-scrollbar">
                <button className="px-3 py-1 rounded-lg bg-[#E95A0C] text-white text-[9px] font-black whitespace-nowrap shadow-sm flex items-center gap-1.5"><i className="fas fa-check-circle text-[8px]"></i> Todas</button>
                <button className="px-3 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/50 text-blue-700 text-[9px] font-black whitespace-nowrap hover:bg-blue-100 dark:bg-blue-950/40 transition-colors flex items-center gap-1.5"><i className="fas fa-cookie text-[8px]"></i> Salteñas</button>
                <button className="px-3 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 text-amber-700 text-[9px] font-black whitespace-nowrap hover:bg-amber-100 dark:hover:bg-amber-950/60 transition-colors flex items-center gap-1.5"><i className="fas fa-mug-hot text-[8px]"></i> Bebidas</button>
                <button className="px-3 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 text-emerald-700 text-[9px] font-black whitespace-nowrap hover:bg-emerald-100 dark:bg-emerald-950/40 transition-colors flex items-center gap-1.5"><i className="fas fa-cheese text-[8px]"></i> Extras</button>
              </div>
            </div>
          </div>

          {/* Chart 3: Distribución Roles (lg:col-span-4) */}
          <div className="lg:col-span-4 bg-white dark:bg-[#040408] dark:border-white/8 rounded-2xl shadow-lg shadow-orange-900/5 dark:shadow-black/60 border border-orange-200/50 overflow-hidden flex flex-col relative">
            <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-gradient-to-br from-[#E95A0C]/10 to-transparent rounded-full blur-3xl pointer-events-none animate-pulse"></div>
            <div className="px-4 py-3 flex items-center justify-between relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-purple-600 text-white flex items-center justify-center text-sm shadow-lg shadow-orange-900/5 dark:shadow-black/60 shadow-purple-500/30 dark:shadow-none"><i className="fas fa-chart-pie"></i></div>
                <div>
                  <h3 className="text-[11px] font-black text-[#4A2E1B] dark:text-white uppercase tracking-wider">Tipos de Usuarios</h3>
                  <p className="text-[9px] text-slate-500 dark:text-slate-400 font-bold flex items-center gap-1"><i className="fas fa-percentage text-[8px]"></i> Distribución Global</p>
                </div>
              </div>
              <button className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-[#070710] flex items-center justify-center text-slate-400 hover:text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/30 transition-all">
                <i className="fas fa-arrow-right text-[10px]"></i>
              </button>
            </div>
            <div className="px-4 pb-4 flex flex-col relative w-full">
              <div className="w-full flex items-center justify-center h-[140px] relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={distributionData} innerRadius={50} outerRadius={65} paddingAngle={2} dataKey="value" stroke="none" cx="50%" cy="50%">
                      {distributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <RechartsTooltip content={<CustomTooltip />} wrapperStyle={{ background: "transparent", border: "none", boxShadow: "none", outline: "none" }} cursor={{ fill: "rgba(255,255,255,0.03)", stroke: "none" }} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center pointer-events-none w-[90px] h-[90px] rounded-full bg-[#fffcf9] dark:bg-[#040408] dark:border-white/8 z-10">
                  <span className="text-xl font-black text-[#4A2E1B] dark:text-white leading-none">{totalUsers}</span>
                  <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Total</span>
                </div>
              </div>
              <div className="border-t border-slate-100 mt-2 pt-2 space-y-1">
                {distributionData.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between px-1 py-1 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full shadow-sm" style={{ backgroundColor: item.color }}></span>
                      <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300">{item.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black text-[#4A2E1B] dark:text-white">{item.value}</span>
                      <span className="text-[9px] font-bold text-slate-400 w-6 text-right">{Math.round((item.value/totalUsers)*100)}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Chart 4: Top Libros/Cursos (lg:col-span-4) */}
          <div className="lg:col-span-4 bg-white dark:bg-[#040408] dark:border-white/8 rounded-2xl shadow-lg shadow-orange-900/5 dark:shadow-black/60 border border-orange-200/50 overflow-hidden flex flex-col relative">
            <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-gradient-to-br from-amber-500/10 to-transparent rounded-full blur-3xl pointer-events-none animate-pulse"></div>
            <div className="px-4 py-3 flex items-center justify-between relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-950/400 text-white flex items-center justify-center text-sm shadow-lg shadow-orange-900/5 dark:shadow-black/60 shadow-amber-500/30"><i className="fas fa-book-open"></i></div>
                <div>
                  <h3 className="text-[11px] font-black text-[#4A2E1B] dark:text-white uppercase tracking-wider">Top Productos Vendidos</h3>
                  <p className="text-[9px] text-slate-500 dark:text-slate-400 font-bold flex items-center gap-1"><i className="fas fa-fire text-[8px] text-amber-500"></i> Los más solicitados</p>
                </div>
              </div>
              <button onClick={() => setActiveTab('catalogo')} className="px-2 py-1 rounded-md text-amber-600 hover:bg-amber-50 dark:bg-amber-950/40 text-[9px] font-black uppercase tracking-wider transition-all border border-amber-400 flex items-center gap-1.5">
                Ver Menúú <i className="fas fa-arrow-right text-[8px]"></i>
              </button>
            </div>
            <div className="px-4 pb-4 flex flex-col justify-center space-y-3 relative flex-1">
              {topBooksData.map((book, idx) => (
                <div key={idx} className="flex items-center gap-2 group">
                  <div className="flex items-center gap-1 w-[110px] shrink-0">
                    <span className={`w-5 h-5 rounded-md flex items-center justify-center text-[8px] font-black ${idx === 2 ? 'bg-[#E95A0C] text-white' : 'bg-slate-100 dark:bg-[#070710] text-slate-500 dark:text-slate-400'}`}>{idx + 1}</span>
                    <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300 truncate">{book.name}</span>
                  </div>
                  <div className="flex-1 h-2.5 bg-slate-100 dark:bg-[#070710] rounded-full overflow-hidden flex items-center relative">
                    <div className="h-full rounded-full transition-all duration-1000 ease-out" style={{ width: `${(book.value / topBooksData[0].value) * 100}%`, backgroundColor: idx < 2 ? '#E95A0C' : '#94a3b8' }}></div>
                  </div>
                  <span className="text-[9px] font-black text-[#4A2E1B] dark:text-white w-10 text-right shrink-0">Bs. {book.value.toFixed(0)}</span>
                </div>
              ))}
              <div className="border-t border-slate-100 pt-2 mt-1 flex justify-center">
                 <button className="text-[9px] font-bold text-slate-400 hover:text-[#E95A0C] transition-colors flex items-center gap-1"><i className="fas fa-list-ul"></i> Ver inventario completo</button>
              </div>
            </div>
          </div>

          {/* Chart 5: Toggle Clientes vs Colegios (lg:col-span-4) */}
          <div className="lg:col-span-4 bg-white dark:bg-[#040408] dark:border-white/8 rounded-2xl shadow-lg shadow-orange-900/5 dark:shadow-black/60 border border-orange-200/50 overflow-hidden flex flex-col relative">
            <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-full blur-3xl pointer-events-none animate-pulse"></div>
            <div className="px-4 py-3 flex items-center justify-between relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-cyan-500 text-white flex items-center justify-center text-sm shadow-lg shadow-orange-900/5 dark:shadow-black/60 shadow-cyan-500/30"><i className="fas fa-trophy"></i></div>
                <div>
                  <h3 className="text-[11px] font-black text-[#4A2E1B] dark:text-white uppercase tracking-wider">Top Compradores</h3>
                  <p className="text-[9px] text-slate-500 dark:text-slate-400 font-bold flex items-center gap-1"><i className="fas fa-ranking-star text-[8px] text-cyan-500"></i> Los que más gastan</p>
                </div>
              </div>
              <div className="flex bg-slate-100 dark:bg-[#070710] p-0.5 rounded-lg shrink-0">
                <button onClick={() => setActiveChart6Tab('Colegios')} className={`px-2 py-1 rounded-md text-[9px] font-bold cursor-pointer transition-all flex items-center gap-1 ${activeChart6Tab === 'Colegios' ? 'bg-[#E95A0C] text-white shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-[#E95A0C]'}`}><i className="fas fa-building text-[8px]"></i> Eventos</button>
                <button onClick={() => setActiveChart6Tab('Clientes')} className={`px-2 py-1 rounded-md text-[9px] font-bold cursor-pointer transition-all flex items-center gap-1 ${activeChart6Tab === 'Clientes' ? 'bg-[#E95A0C] text-white shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-[#E95A0C]'}`}><i className="fas fa-user text-[8px]"></i> Clientes</button>
              </div>
            </div>
            <div className="px-4 pb-4 flex flex-col justify-center space-y-3 relative flex-1">
              {chart6Data.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-6 text-slate-400">
                   <i className="fas fa-folder-open text-xl mb-1 opacity-50"></i>
                   <span className="text-[10px] font-bold uppercase tracking-wider">Sin datos</span>
                </div>
              ) : (
                chart6Data.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className={`w-5 h-5 rounded-md flex items-center justify-center text-[8px] font-black shrink-0 ${idx === 0 ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-500 border border-amber-200' : 'bg-cyan-50 text-cyan-500 border border-cyan-100'}`}><i className={`fas ${idx === 0 ? 'fa-medal' : 'fa-hashtag'}`}></i>{idx === 0 ? '' : idx + 1}</span>
                    <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300 w-24 truncate shrink-0">{item.name}</span>
                    <div className="flex-1 h-2.5 bg-slate-100 dark:bg-[#070710] rounded-full overflow-hidden flex items-center relative">
                      <div className="h-full rounded-full" style={{ width: `${(item.value / (chart6Data[0]?.value || 1)) * 100}%`, backgroundColor: idx === 0 ? '#E95A0C' : idx === 1 ? '#3b82f6' : '#94a3b8' }}></div>
                    </div>
                    <span className="text-[9px] font-black text-[#4A2E1B] dark:text-white w-10 text-right shrink-0">Bs. {item.value.toFixed(0)}</span>
                  </div>
                ))
              )}
              <div className="border-t border-slate-100 pt-2 mt-1 flex justify-center">
                 <button className="text-[9px] font-bold text-slate-400 hover:text-cyan-600 transition-colors flex items-center gap-1"><i className="fas fa-file-invoice"></i> Generar reporte {activeChart6Tab}</button>
              </div>
            </div>
          </div>

          {/* Chart 6: Flujo de Caja (lg:col-span-12) */}
          <div className="lg:col-span-12 bg-white dark:bg-[#040408] dark:border-white/8 rounded-2xl shadow-lg shadow-orange-900/5 dark:shadow-black/60 border border-orange-200/50 overflow-hidden flex flex-col relative">
            <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-gradient-to-br from-[#00d1b2]/10 to-transparent rounded-full blur-3xl pointer-events-none animate-pulse"></div>
            <div className="px-5 py-4 flex items-center justify-between relative z-10">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#00d1b2] text-white flex items-center justify-center text-sm shadow-lg shadow-orange-900/5 dark:shadow-black/60 shadow-emerald-500/30"><i className="fas fa-money-bill-transfer"></i></div>
                <div>
                  <h3 className="text-sm font-black text-[#4A2E1B] dark:text-white uppercase tracking-wider">Flujo de Caja Financiero</h3>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold flex items-center gap-1"><i className="fas fa-scale-balanced text-emerald-500"></i> Comparativa de ingresos (Ventas) vs egresos (Compras)</p>
                </div>
              </div>
              <div className="flex gap-2">
                 <button className="px-4 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 text-[10px] font-bold hover:bg-emerald-100 dark:bg-emerald-950/40 transition-all border border-emerald-200 dark:border-emerald-900/50 flex items-center gap-2"><i className="fas fa-download"></i> Exportar</button>
                 <button className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-[#070710] text-slate-400 flex items-center justify-center hover:bg-slate-200 dark:bg-white/10 transition-colors"><i className="fas fa-ellipsis-v"></i></button>
              </div>
            </div>
            <div className="px-6 pb-6">
              <div className="h-[220px] w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={cashFlowData} margin={{ top: 10, right: 0, left: -15, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#12121f" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#3d3d5c', fontWeight: 'bold' }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#3d3d5c', fontWeight: 'bold' }} />
                    <RechartsTooltip cursor={{fill: '#f8fafc'}} content={<CustomTooltip />} />
                    <Bar dataKey="Ventas" fill="#E95A0C" radius={[4, 4, 0, 0]} barSize={20} />
                    <Bar dataKey="Compras" fill="#94a3b8" radius={[4, 4, 0, 0]} barSize={20} />
                  </BarChart>
                </ResponsiveContainer>
                {/* Decoration badge */}
                <div className="absolute top-0 right-10 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 border border-emerald-200 dark:border-emerald-900/50 px-3 py-1.5 rounded-md flex items-center gap-1">
                   <i className="fas fa-arrow-trend-up text-[10px]"></i>
                   <span className="text-[9px] font-black uppercase tracking-widest">+12.5% vs Mes Anterior</span>
                </div>
              </div>
              <div className="border-t border-slate-100 mt-4 pt-3 flex items-center justify-center gap-6">
                <div className="flex items-center gap-2 bg-slate-50 dark:bg-[#070710] px-4 py-1.5 rounded-full border border-slate-100">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#E95A0C]"></span>
                  <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Ingresos (Ventas)</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-50 dark:bg-[#070710] px-4 py-1.5 rounded-full border border-slate-100">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#94a3b8]"></span>
                  <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Egresos (Compras)</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};

export default DashboardHome;























