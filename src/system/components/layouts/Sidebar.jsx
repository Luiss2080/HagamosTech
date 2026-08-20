import React, { useState } from 'react';
import { tieneAccesoTab } from '../../permisos/constantes';

export const BreadcrumbHeader = ({
  icon = 'fas fa-layer-group',
  breadcrumbs = ['Sistema', 'MÃ³dulo'],
  title = 'TÃ­tulo del MÃ³dulo',
  subtitle = 'DescripciÃ³n operativa del mÃ³dulo.',
  actionButtonText,
  onActionClick,
  backButtonText,
  onBackClick
}) => {
  const parsed = breadcrumbs.map(c => typeof c === 'string' ? { label: c } : c);
  return (
    <div className="bg-[#fffcf9] dark:bg-[#040408] dark:border-white/8 rounded-2xl p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-xl dark:shadow-black/60 border border-orange-200/50 font-montserrat w-full">
      <div className="flex items-center gap-4">
        <div className="w-11 h-11 bg-[#E95A0C]/10 text-[#E95A0C] rounded-xl flex items-center justify-center text-xl shadow-sm shrink-0 border border-[#E95A0C]/20">
          <i className={icon}></i>
        </div>
        <div>
          <nav className="flex items-center gap-1.5 text-[10px] text-slate-400 mb-0.5 font-bold uppercase tracking-wider">
            {parsed.map((crumb, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && <i className="fas fa-chevron-right text-[7px] mx-0.5"></i>}
                {crumb.onClick ? (
                  <button type="button" onClick={crumb.onClick}
                    className="hover:text-[#E95A0C] dark:hover:text-orange-400 transition-colors bg-transparent border-0 p-0 font-inherit text-inherit text-[10px] font-bold uppercase tracking-wider cursor-pointer">
                    {crumb.label}
                  </button>
                ) : (
                  <span className={idx < parsed.length - 1 ? '' : 'text-slate-600 dark:text-slate-300'}>{crumb.label}</span>
                )}
              </React.Fragment>
            ))}
          </nav>
          <h2 className="text-base font-black text-[#4A2E1B] dark:text-white uppercase tracking-wider leading-none m-0">{title}</h2>
          <p className="text-[10px] text-slate-400 font-bold m-0 uppercase tracking-widest mt-1">{subtitle}</p>
        </div>
      </div>
      <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
        {backButtonText && (
          <button onClick={onBackClick}
            className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-[#070710] hover:bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-slate-300 text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 border border-orange-200/50">
            <i className="fas fa-arrow-left text-xs"></i><span>{backButtonText}</span>
          </button>
        )}
        {actionButtonText && (
          <button onClick={onActionClick}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#E95A0C] to-orange-700 hover:from-orange-700 hover:to-[#E95A0C] text-white text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-lg shadow-orange-900/5 dark:shadow-black/60 shadow-orange-500/20 dark:shadow-none flex items-center gap-2 border border-orange-500/20">
            <i className="fas fa-plus text-xs"></i><span>{actionButtonText}</span>
          </button>
        )}
      </div>
    </div>
  );
};

export const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm, title = 'Â¿Eliminar registro?', message = 'Â¿EstÃ¡s seguro de realizar esta acciÃ³n? No se podrÃ¡ revertir.' }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 font-montserrat">
      <div className="bg-[#fffcf9] dark:bg-[#040408] dark:border-white/8 rounded-2xl p-6 max-w-sm w-full border border-orange-200/50 shadow-2xl dark:shadow-black/80 text-center">
        <div className="w-12 h-12 rounded-xl  text-orange-600 flex items-center justify-center text-xl mx-auto mb-3 border border-orange-500/20">
          <i className="fas fa-triangle-exclamation"></i>
        </div>
        <h4 className="text-sm font-black text-[#4A2E1B] dark:text-white uppercase tracking-wider mb-1">{title}</h4>
        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mb-5">{message}</p>
        <div className="flex gap-3">
          <button onClick={onClose}
            className="flex-1 py-2.5 rounded-xl bg-slate-100 dark:bg-[#070710] hover:bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-slate-300 font-black text-xs uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-2 justify-center">
            <i className="fas fa-times"></i> Cancelar
          </button>
          <button onClick={onConfirm}
            className="flex-1 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-black text-xs uppercase tracking-wider transition-colors cursor-pointer shadow-lg shadow-orange-900/5 dark:shadow-black/60">
            SÃ­, Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

const Sidebar = ({ activeTab, setActiveTab, user, logout, counts = {}, isDark = false, onToggleDark }) => {
  const [collapsed, setCollapsed] = useState(false);

  const [openSections, setOpenSections] = useState({
    institucional: false,
    comercial: false,
    reportes: false,
    ajustes: false,
    seguridad: false
  });

  // El usuario puede ver la pestaÃ±a si es Admin o tiene alguno de los permisos requeridos del mÃ³dulo.
  const puedeVer = (tab) => tieneAccesoTab(user, tab);
  const seccionVisible = (tabs) => tabs.some(t => puedeVer(t));

  const toggleSection = (section, e) => {
    const target = e ? e.currentTarget : null;
    setOpenSections(prev => {
      const newState = { ...prev, [section]: !prev[section] };
      if (newState[section] && target) {
        setTimeout(() => {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 200);
      }
      return newState;
    });
  };

  const formatCount = (val) => {
    const n = Number(val);
    if (isNaN(n) || n < 0) return '0';
    return n > 99 ? '+99' : String(n);
  };

  const NavItem = ({ tab, icon, label, badge }) => {
    if (!puedeVer(tab)) return null;
    const isActive = activeTab === tab;
    const countVal = counts[tab];
    const resolvedBadge = badge || (countVal !== undefined ? formatCount(countVal) : null);
    return (
      <button
        onClick={() => setActiveTab(tab)}
        title={collapsed ? label : undefined}
        className={`flex items-center justify-center w-full rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-205 cursor-pointer text-left transform hover:translate-x-1 ${
          collapsed ? 'p-2.5' : 'px-3.5 py-2.5'
        } ${
          isActive
            ? 'bg-[#E95A0C] text-white shadow-lg shadow-orange-950/20 scale-[1.02] border-l-4 border-l-white'
            : 'text-slate-700 dark:text-slate-300 hover:bg-[#E95A0C]/10 dark:hover:bg-orange-950/20 hover:-translate-y-0.5 hover:shadow-sm hover:text-[#E95A0C] dark:hover:text-orange-400'
        }`}
      >
        <div className={`${collapsed ? 'w-8 h-8 text-lg' : 'w-6 h-6 text-xs'} rounded-lg flex items-center justify-center transition-colors shrink-0 ${
          isActive 
            ? 'text-white' 
            : 'text-[#E95A0C] dark:text-orange-400'
        }`}>
          <i className={icon}></i>
        </div>
        <span className={`flex-1 truncate text-[11px] font-extrabold ${collapsed ? 'hidden' : ''}`}>{label}</span>
        {resolvedBadge && !collapsed && (
          <span className={`text-[8px] px-1.5 py-0.5 rounded-md font-black shrink-0 ${
            isActive 
              ? 'bg-white/20 text-white' 
              : 'bg-orange-500/10 dark:bg-orange-500/5 text-[#E95A0C] border border-orange-500/20 dark:border-orange-500/10'
          }`}>
            {resolvedBadge}
          </span>
        )}
      </button>
    );
  };

  // BotÃ³n AcordeÃ³n Colapsable con el estilo PREMIUM anterior
  const CollapsibleCategoryCard = ({ label, icon, section, isOpen, onClick }) => (
    <button
      onClick={onClick}
      className="flex items-center justify-between w-full p-3 bg-white/50 dark:bg-white/3 backdrop-blur-2xl border-0 rounded-xl shadow-sm border-l-4 border-l-[#E95A0C] text-xs font-extrabold uppercase tracking-wider text-[#6B442A] dark:text-orange-300/80 hover:bg-white/40 dark:hover:bg-white/5 cursor-pointer transition-all duration-200 hover:scale-[1.01] shrink-0"
    >
      <span className="flex items-center gap-2.5">
        <i className={`${icon} text-sm text-[#E95A0C] dark:text-orange-400`}></i>
        <span>{label}</span>
      </span>
      <i className={`fas fa-chevron-${isOpen ? 'up' : 'down'} text-[10px] text-slate-400 dark:text-slate-500 dark:text-slate-400 transition-transform duration-200`}></i>
    </button>
  );

  return (
    <>
    {/* Mobile: horizontal scrollable pill navigation */}
    <div className="lg:hidden w-full overflow-x-auto scrollbar-none -mx-4 px-4 flex items-center gap-2 pb-1">
      {[
        { tab: 'inicio', icon: 'fas fa-gauge-high', label: 'Inicio' },
        { tab: 'clientes', icon: 'fas fa-user-tie', label: 'Clientes' },
        { tab: 'eventos', icon: 'fas fa-utensils', label: 'Eventos' },
        { tab: 'nueva-venta', icon: 'fas fa-receipt', label: 'POS' },
        { tab: 'catalogo', icon: 'fas fa-box-open', label: 'Productos' },
        { tab: 'compras', icon: 'fas fa-truck-moving', label: 'Compras' },
        { tab: 'stock', icon: 'fas fa-boxes-stacked', label: 'Stock' },
        { tab: 'sucursales', icon: 'fas fa-map-location-dot', label: 'Sucursales' },
        { tab: 'delivery', icon: 'fas fa-motorcycle', label: 'Delivery' },
        { tab: 'horno', icon: 'fas fa-fire-burner', label: 'Horno' },
        { tab: 'nuevo-usuario', icon: 'fas fa-users', label: 'Usuarios' },
        { tab: 'nuevo-rol', icon: 'fas fa-user-tag', label: 'Roles' },
        { tab: 'nuevo-permiso', icon: 'fas fa-key', label: 'Permisos' },
        { tab: 'rol-permisos', icon: 'fas fa-lock', label: 'Matriz' },
        { tab: 'reporte-ventas', icon: 'fas fa-chart-line', label: 'R. Ventas' },
        { tab: 'reporte-compras', icon: 'fas fa-chart-column', label: 'R. Insumos' },
        { tab: 'reporte-clientes', icon: 'fas fa-chart-pie', label: 'R. Clientes' },
        { tab: 'reporte-sucursales', icon: 'fas fa-store', label: 'R. Sucursales' },
        { tab: 'reporte-stock', icon: 'fas fa-boxes-stacked', label: 'R. Stock' },
        { tab: 'reporte-eventos', icon: 'fas fa-utensils', label: 'R. Eventos' },
        { tab: 'configuracion', icon: 'fas fa-cog', label: 'Ajustes' },
        { tab: 'mensajes', icon: 'fas fa-envelope', label: 'Mensajes' },
        { tab: 'perfil', icon: 'fas fa-id-card', label: 'Perfil' },
        { tab: 'sistema', icon: 'fas fa-server', label: 'Sistema' },
      ]
        .filter(({ tab }) => puedeVer(tab))
        .map(({ tab, icon, label }) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-[10px] font-black uppercase tracking-wider whitespace-nowrap shrink-0 transition-all cursor-pointer ${
              activeTab === tab
                ? 'bg-[#E95A0C] text-white shadow-lg shadow-orange-950/20'
                : 'bg-white/50 backdrop-blur-2xl text-slate-700 dark:text-slate-300 border border-orange-200/50 hover:bg-white/60 hover:text-[#E95A0C]'
            }`}
          >
            <i className={`${icon} text-[10px]`}></i>
            <span>{label}</span>
          </button>
        ))}
    </div>

    <aside className={`w-full ${collapsed ? 'lg:w-[72px] border-0' : 'lg:w-[260px]'} shrink-0 bg-[#fffcf9] dark:bg-[#040408] dark:border-white/8 rounded-2xl p-3 hidden lg:flex flex-col shadow-2xl dark:shadow-black/80 self-start sticky top-8 h-[calc(100vh_-_2rem)] z-30 border border-orange-200/50 font-montserrat transition-all duration-300 relative`}>
      
      {/* Ã¢â€â‚¬Ã¢â€â‚¬ ENCABEZADO Ã¢â€â‚¬Ã¢â€â‚¬ */}
      {collapsed ? (
        <div className="flex justify-center mb-4">
          <button
            onClick={() => setCollapsed(false)}
            className="w-10 h-10 rounded-xl bg-[#E95A0C] text-white flex items-center justify-center text-xl shadow-lg shadow-orange-900/5 dark:shadow-black/60 hover:scale-105 transition-all duration-200 cursor-pointer border border-orange-400/20"
            title="Expandir sidebar"
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      ) : (
      <div className="flex items-center justify-between p-3 mb-3 rounded-xl border border-[#E95A0C]/20 dark:border-orange-900/20 bg-gradient-to-r from-[#E95A0C]/5 via-white dark:via-transparent to-[#E95A0C]/5 dark:from-[#E95A0C]/10 dark:via-[#0d0d1a] dark:to-[#0d0d1a] shadow-sm shrink-0 transition-all duration-300">
        <div className="flex items-center gap-3 overflow-hidden">
          <div onClick={() => setActiveTab('inicio')} className="w-11 h-11 rounded-xl bg-[#E95A0C] text-white flex items-center justify-center text-xl shadow-lg shadow-orange-900/5 dark:shadow-black/60 shrink-0 border border-orange-400/20 cursor-pointer">
            <i className="fas fa-fire-burner"></i>
          </div>
          <div className="transition-all duration-300 overflow-hidden whitespace-nowrap">
            <h4 className="text-xs font-black uppercase tracking-wider text-[#4A2E1B] dark:text-white leading-tight">
              HAGAMOSTECH
            </h4>
            <span className="text-[9px] font-bold text-[#E95A0C] block leading-snug">
              SalteÃ±erÃ­a Tradicional
            </span>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/400 animate-pulse shrink-0"></span>
              <span className="text-[7px] font-semibold text-slate-400 tracking-wider">
                Sistema POS &bull; Activo
              </span>
            </div>
          </div>
        </div>
        <button
          onClick={() => setCollapsed(true)}
          className="w-8 h-8 rounded-xl bg-[#E95A0C] text-white flex items-center justify-center text-sm shadow-lg shadow-orange-900/5 dark:shadow-black/60 hover:scale-105 transition-all duration-200 cursor-pointer shrink-0 border border-orange-400/20"
          title="Colapsar sidebar"
        >
          <i className="fas fa-chevron-left"></i>
        </button>
      </div>
      )}

      {/* Ã¢â€â‚¬Ã¢â€â‚¬ NAVEGACIÃ­â€œN PRINCIPAL Ã¢â€â‚¬Ã¢â€â‚¬ */}
      <nav className="flex-1 flex flex-col overflow-y-auto pr-1 min-h-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">

        {collapsed ? (
          <div className="flex flex-col items-center gap-2 mt-2">
            <NavItem tab="clientes" icon="fas fa-user-tie" label="Clientes" />
            <NavItem tab="sucursales" icon="fas fa-store" label="Sucursales" />
            <NavItem tab="delivery" icon="fas fa-motorcycle" label="Delivery" />
            <NavItem tab="horno" icon="fas fa-fire-burner" label="Horno" />
            <NavItem tab="nueva-venta" icon="fas fa-cash-register" label="Ventas" />
            <NavItem tab="catalogo" icon="fas fa-box-open" label="Productos" />
            <NavItem tab="compras" icon="fas fa-truck-moving" label="Compras" />
            <NavItem tab="stock" icon="fas fa-boxes-stacked" label="Stock" />
            <NavItem tab="nuevo-usuario" icon="fas fa-users" label="Usuarios" />
          </div>
        ) : (
          <>
        {/* 1. OPERACIONES */}
        {seccionVisible(['sucursales', 'delivery', 'horno']) && (
        <div className="flex flex-col">
          <div className="px-1.5 mb-1.5 mt-3 shrink-0">
            <span className="text-[8px] text-slate-400 dark:text-slate-600 dark:text-slate-400 uppercase tracking-widest font-extrabold block">
              Sucursales y Delivery
            </span>
          </div>
          <CollapsibleCategoryCard
            label="Operaciones"
            icon="fas fa-store"
            section="institucional"
            isOpen={openSections.institucional}
            onClick={(e) => toggleSection('institucional', e)}
          />
          <div className={`transition-all duration-300 overflow-hidden ${openSections.institucional ? 'max-h-72 opacity-100 mt-2 mb-2' : 'max-h-0 opacity-0'} flex flex-col gap-1 pl-1`}>
            <NavItem tab="sucursales" icon="fas fa-map-location-dot" label="Sucursales" />
            <NavItem tab="delivery" icon="fas fa-motorcycle" label="Delivery" />
            <NavItem tab="horno" icon="fas fa-fire-burner" label="Horno" />
          </div>
        </div>
        )}

        {seccionVisible(['sucursales', 'delivery', 'horno']) && <hr className="border-slate-100 my-2 shrink-0" />}

        {/* 2. COMERCIAL */}
        {seccionVisible(['clientes', 'eventos', 'nueva-venta', 'catalogo', 'compras', 'stock']) && (
        <div className="flex flex-col">
          <div className="px-1.5 mb-1.5 mt-1 shrink-0">
            <span className="text-[8px] text-slate-400 dark:text-slate-600 dark:text-slate-400 uppercase tracking-widest font-extrabold block">
              Ventas, Clientes e Inventario
            </span>
          </div>
          <CollapsibleCategoryCard
            label="Comercial"
            icon="fas fa-cash-register"
            section="comercial"
            isOpen={openSections.comercial}
            onClick={(e) => toggleSection('comercial', e)}
          />
          <div className={`transition-all duration-300 overflow-hidden ${openSections.comercial ? 'max-h-[28rem] opacity-100 mt-2 mb-2' : 'max-h-0 opacity-0'} flex flex-col gap-1 pl-1`}>
            <NavItem tab="clientes" icon="fas fa-user-tie" label="Clientes" />
            <NavItem tab="eventos" icon="fas fa-utensils" label="Eventos y Catering" />
            <NavItem tab="nueva-venta" icon="fas fa-receipt" label="POS Ventas" />
            <NavItem tab="catalogo" icon="fas fa-box-open" label="Productos (MenÃº)" />
            <NavItem tab="compras" icon="fas fa-truck-moving" label="Compras e Insumos" />
            <NavItem tab="stock" icon="fas fa-boxes-stacked" label="Control de Stock" />
          </div>
        </div>
        )}

        {seccionVisible(['clientes', 'eventos', 'nueva-venta', 'catalogo', 'compras', 'stock']) && <hr className="border-slate-100 my-2 shrink-0" />}

        {/* 3. SEGURIDAD */}
        {seccionVisible(['nuevo-usuario', 'nuevo-rol', 'nuevo-permiso', 'rol-permisos']) && (
        <div className="flex flex-col">
          <div className="px-1.5 mb-1.5 mt-1 shrink-0">
            <span className="text-[8px] text-slate-400 dark:text-slate-600 dark:text-slate-400 uppercase tracking-widest font-extrabold block">
              Roles, Usuarios y Permisos
            </span>
          </div>
          <CollapsibleCategoryCard
            label="Seguridad"
            icon="fas fa-shield-halved"
            section="seguridad"
            isOpen={openSections.seguridad}
            onClick={(e) => toggleSection('seguridad', e)}
          />
          <div className={`transition-all duration-300 overflow-hidden ${openSections.seguridad ? 'max-h-72 opacity-100 mt-2 mb-2' : 'max-h-0 opacity-0'} flex flex-col gap-1 pl-1`}>
            <NavItem tab="nuevo-usuario" icon="fas fa-users" label="Usuarios" />
            <NavItem tab="nuevo-rol" icon="fas fa-user-tag" label="Roles" />
            <NavItem tab="nuevo-permiso" icon="fas fa-key" label="Permisos" />
            <NavItem tab="rol-permisos" icon="fas fa-lock" label="Matriz" />
          </div>
        </div>
        )}

        {seccionVisible(['nuevo-usuario', 'nuevo-rol', 'nuevo-permiso', 'rol-permisos']) && <hr className="border-slate-100 my-2 shrink-0" />}

        {/* 4. REPORTES */}
        {seccionVisible(['reporte-ventas', 'reporte-eventos', 'reporte-clientes', 'reporte-compras', 'reporte-sucursales', 'reporte-stock']) && (
        <div className="flex flex-col">
          <div className="px-1.5 mb-1.5 mt-1 shrink-0">
            <span className="text-[8px] text-slate-400 dark:text-slate-600 dark:text-slate-400 uppercase tracking-widest font-extrabold block">
              EstadÃ­sticas, Ventas y MÃ©tricas
            </span>
          </div>
          <CollapsibleCategoryCard
            label="Reportes"
            icon="fas fa-chart-pie"
            section="reportes"
            isOpen={openSections.reportes}
            onClick={(e) => toggleSection('reportes', e)}
          />
          <div className={`transition-all duration-300 overflow-hidden ${openSections.reportes ? 'max-h-96 opacity-100 mt-2 mb-2' : 'max-h-0 opacity-0'} flex flex-col gap-1 pl-1`}>
            <NavItem tab="reporte-ventas" icon="fas fa-chart-line" label="Ventas" />
            <NavItem tab="reporte-eventos" icon="fas fa-utensils" label="Eventos y Catering" />
            <NavItem tab="reporte-clientes" icon="fas fa-user-tie" label="Clientes" />
            <NavItem tab="reporte-compras" icon="fas fa-truck-moving" label="Insumos" />
            <NavItem tab="reporte-stock" icon="fas fa-boxes-stacked" label="Stock" />
            <NavItem tab="reporte-sucursales" icon="fas fa-store" label="Sucursales" />
          </div>
        </div>
        )}

        {seccionVisible(['reporte-ventas', 'reporte-eventos', 'reporte-clientes', 'reporte-compras', 'reporte-sucursales', 'reporte-stock']) && <hr className="border-slate-100 my-2 shrink-0" />}

        {/* 5. AJUSTES */}
        {seccionVisible(['configuracion', 'mensajes', 'perfil', 'sistema']) && (
        <div className="flex flex-col">
          <div className="px-1.5 mb-1.5 mt-1 shrink-0">
            <span className="text-[8px] text-slate-400 dark:text-slate-600 dark:text-slate-400 uppercase tracking-widest font-extrabold block">
              ConfiguraciÃ³n y MensajerÃ­a
            </span>
          </div>
          <CollapsibleCategoryCard
            label="Ajustes"
            icon="fas fa-sliders"
            section="ajustes"
            isOpen={openSections.ajustes}
            onClick={(e) => toggleSection('ajustes', e)}
          />
          <div className={`transition-all duration-300 overflow-hidden ${openSections.ajustes ? 'max-h-72 opacity-100 mt-2 mb-2' : 'max-h-0 opacity-0'} flex flex-col gap-1 pl-1`}>
            <NavItem tab="configuracion" icon="fas fa-cog" label="General" />
            <NavItem tab="mensajes" icon="fas fa-envelope" label="Mensajes" />
            <NavItem tab="perfil" icon="fas fa-id-card" label="Perfil" />
            <NavItem tab="sistema" icon="fas fa-server" label="Sistema" />
          </div>
        </div>
        )}
          </>
        )}

        {/* THEME TOGGLE BUTTON */}
        <div className="mt-auto px-1 mb-2">
          <button
            onClick={onToggleDark}
            className={`flex items-center justify-center w-full rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-200 cursor-pointer ${
              collapsed ? 'p-2.5' : 'px-3.5 py-2.5 gap-2'
            } bg-[#8B4513] text-white hover:bg-[#8B4513] border border-[#4A2E1B]/50 shadow-lg shadow-orange-900/5 dark:shadow-black/60 hover:-translate-y-0.5`}
            title={isDark ? "Cambiar a Modo Claro" : "Cambiar a Modo Oscuro"}
          >
            <i className={isDark ? "fas fa-sun text-lg text-white" : "fas fa-moon text-lg text-white"}></i>
            {!collapsed && <span>{isDark ? 'Modo Claro' : 'Modo Oscuro'}</span>}
          </button>
        </div>

        {/* LOGOUT BUTTON */}
        <div className="mt-4 mb-2 px-1">
          <button
            onClick={logout}
            className={`flex items-center justify-center w-full rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-200 cursor-pointer ${
              collapsed ? 'p-2.5' : 'px-3.5 py-2.5 gap-2'
            } bg-[#E95A0C] text-white shadow-lg shadow-orange-900/5 dark:shadow-black/60 hover:-translate-y-0.5 hover:bg-orange-600 border border-orange-500/20`}
          >
            <i className="fas fa-sign-out-alt text-lg"></i>
            {!collapsed && <span>Cerrar SesiÃ³n</span>}
          </button>
        </div>

      </nav>

    </aside>
    </>
  );
};

export default Sidebar;























