import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const getBreadcrumbsAndBadge = (pathname) => {
  if (pathname.includes('/sobre-nosotros')) {
    return { paths: [{ label: 'Sobre Nosotros' }], badgeText: 'Sobre Nosotros — LOS CASTORES', icon: 'fa-solid fa-circle-info' };
  }
  if (pathname.includes('/servicios/delivery')) {
    return { paths: [{ label: 'Servicios', url: '/servicios/delivery' }, { label: 'Delivery Express' }], badgeText: 'Delivery Express — LOS CASTORES', icon: 'fa-solid fa-motorcycle' };
  }
  if (pathname.includes('/servicios/mayor')) {
    return { paths: [{ label: 'Servicios', url: '/servicios/delivery' }, { label: 'Pedidos por Mayor' }], badgeText: 'Pedidos por Mayor — LOS CASTORES', icon: 'fa-solid fa-boxes-stacked' };
  }
  if (pathname.includes('/servicios/eventos')) {
    return { paths: [{ label: 'Servicios', url: '/servicios/delivery' }, { label: 'Eventos y Catering' }], badgeText: 'Eventos y Catering — LOS CASTORES', icon: 'fa-solid fa-glass-cheers' };
  }
  if (pathname.includes('/servicios/corporativo')) {
    return { paths: [{ label: 'Servicios', url: '/servicios/delivery' }, { label: 'Servicio Corporativo' }], badgeText: 'Servicio Corporativo — LOS CASTORES', icon: 'fa-solid fa-building' };
  }
  if (pathname.includes('/servicios/congeladas')) {
    return { paths: [{ label: 'Servicios', url: '/servicios/delivery' }, { label: 'Salteñas Congeladas' }], badgeText: 'Salteñas Congeladas — LOS CASTORES', icon: 'fa-solid fa-snowflake' };
  }
  if (pathname.includes('/contactanos')) {
    return { paths: [{ label: 'Contacto' }], badgeText: 'Contacto Oficial LOS CASTORES', icon: 'fa-solid fa-headset' };
  }
  if (pathname.includes('/sucursales/oruro')) {
    return { paths: [{ label: 'Sucursales', url: '/sucursales/santa-cruz' }, { label: 'Oruro' }], badgeText: 'Sucursales Oruro — LOS CASTORES', icon: 'fa-solid fa-store' };
  }
  if (pathname.includes('/sucursales/cochabamba')) {
    return { paths: [{ label: 'Sucursales', url: '/sucursales/santa-cruz' }, { label: 'Cochabamba' }], badgeText: 'Sucursales Cochabamba — LOS CASTORES', icon: 'fa-solid fa-shop' };
  }
  if (pathname.includes('/sucursales/santa-cruz/equipetrol')) {
    return { paths: [{ label: 'Sucursales', url: '/sucursales/santa-cruz' }, { label: 'Santa Cruz', url: '/sucursales/santa-cruz' }, { label: 'Equipetrol' }], badgeText: 'Los Castores Equipetrol', icon: 'fa-solid fa-store' };
  }
  if (pathname.includes('/sucursales/santa-cruz/2do-anillo')) {
    return { paths: [{ label: 'Sucursales', url: '/sucursales/santa-cruz' }, { label: 'Santa Cruz', url: '/sucursales/santa-cruz' }, { label: '2do Anillo' }], badgeText: 'Los Castores 2do Anillo', icon: 'fa-solid fa-store' };
  }
  if (pathname.includes('/sucursales/santa-cruz/av-pirai')) {
    return { paths: [{ label: 'Sucursales', url: '/sucursales/santa-cruz' }, { label: 'Santa Cruz', url: '/sucursales/santa-cruz' }, { label: 'Av. Piraí' }], badgeText: 'Salteñas Los Castores Av. Piraí', icon: 'fa-solid fa-store' };
  }
  if (pathname.includes('/sucursales/santa-cruz/cafe-beni')) {
    return { paths: [{ label: 'Sucursales', url: '/sucursales/santa-cruz' }, { label: 'Santa Cruz', url: '/sucursales/santa-cruz' }, { label: 'Café Beni' }], badgeText: 'Los Castores Café Beni', icon: 'fa-solid fa-store' };
  }
  if (pathname.includes('/sucursales/santa-cruz')) {
    return { paths: [{ label: 'Sucursales', url: '/sucursales/santa-cruz' }, { label: 'Santa Cruz' }], badgeText: 'Sucursales Santa Cruz — LOS CASTORES', icon: 'fa-solid fa-store' };
  }
  if (pathname.includes('/opiniones')) {
    return { paths: [{ label: 'Opiniones' }], badgeText: 'Opiniones de Clientes LOS CASTORES', icon: 'fa-solid fa-comments' };
  }
  if (pathname.includes('/menu/saltenas')) {
    return { paths: [{ label: 'Menú', url: '/menu/saltenas' }, { label: 'Salteñas' }], badgeText: 'Salteñas Artesanales — LOS CASTORES', icon: 'fa-solid fa-fire' };
  }
  if (pathname.includes('/menu/cafe')) {
    return { paths: [{ label: 'Menú', url: '/menu/saltenas' }, { label: 'Cafetería' }], badgeText: 'Cafetería de Especialidad — LOS CASTORES', icon: 'fa-solid fa-mug-hot' };
  }
  if (pathname.includes('/menu/frapuccinos')) {
    return { paths: [{ label: 'Menú', url: '/menu/saltenas' }, { label: 'Frapuccinos' }], badgeText: 'Frapuccinos Refrescantes — LOS CASTORES', icon: 'fa-solid fa-blender' };
  }
  if (pathname.includes('/menu/refrescos')) {
    return { paths: [{ label: 'Menú', url: '/menu/saltenas' }, { label: 'Refrescos' }], badgeText: 'Refrescos Naturales — LOS CASTORES', icon: 'fa-solid fa-leaf' };
  }
  if (pathname.includes('/menu/postres')) {
    return { paths: [{ label: 'Menú', url: '/menu/saltenas' }, { label: 'Postres' }], badgeText: 'Postres Caseros — LOS CASTORES', icon: 'fa-solid fa-ice-cream' };
  }
  if (pathname.includes('/menu/combos')) {
    return { paths: [{ label: 'Menú', url: '/menu/saltenas' }, { label: 'Combos' }], badgeText: 'Combos Especiales — LOS CASTORES', icon: 'fa-solid fa-tags' };
  }
  if (pathname.includes('/promociones')) {
    return { paths: [{ label: 'Promociones' }], badgeText: 'Promociones Oficiales LOS CASTORES', icon: 'fa-solid fa-tags' };
  }
  if (pathname.includes('/novedades')) {
    return { paths: [{ label: 'Novedades' }], badgeText: 'Novedades Oficiales LOS CASTORES', icon: 'fa-solid fa-star' };
  }
  if (pathname.includes('/condiciones')) {
    return { paths: [{ label: 'Condiciones de Uso' }], badgeText: 'Condiciones Oficiales LOS CASTORES', icon: 'fa-solid fa-file-contract' };
  }
  if (pathname.includes('/privacidad')) {
    return { paths: [{ label: 'Privacidad' }], badgeText: 'Política de Privacidad — LOS CASTORES', icon: 'fa-solid fa-shield-halved' };
  }
  if (pathname.includes('/terminos')) {
    return { paths: [{ label: 'Términos de Servicio' }], badgeText: 'Términos de Servicio — LOS CASTORES', icon: 'fa-solid fa-file-signature' };
  }
  if (pathname.includes('/cookies')) {
    return { paths: [{ label: 'Cookies' }], badgeText: 'Política de Cookies — LOS CASTORES', icon: 'fa-solid fa-cookie-bite' };
  }
  if (pathname.includes('/catalogo') && !pathname.includes('/categoria/')) {
    return { paths: [{ label: 'Catálogo' }], badgeText: 'Catálogo de Productos — LOS CASTORES', icon: 'fa-solid fa-shop' };
  }
  if (pathname.includes('/perfil/compras')) {
    return { paths: [{ label: 'Perfil', url: '/perfil' }, { label: 'Mis Compras' }], badgeText: 'Historial de Compras — LOS CASTORES', icon: 'fa-solid fa-receipt' };
  }
  if (pathname.includes('/perfil') && !pathname.includes('/soporte')) {
    return { paths: [{ label: 'Perfil' }], badgeText: 'Mi Perfil — LOS CASTORES', icon: 'fa-solid fa-user' };
  }
  if (pathname.includes('/configuracion')) {
    return { paths: [{ label: 'Configuración' }], badgeText: 'Preferencias y Seguridad — LOS CASTORES', icon: 'fa-solid fa-gear' };
  }
  return null;
};

const Breadcrumb = ({ paths, badgeText, icon, align = 'center', title, highlight, description, className = '', children }) => {
  const location = useLocation();
  const isCenter = align === 'center';

  const detected = !paths && !badgeText ? getBreadcrumbsAndBadge(location.pathname) : null;
  const resolvedPaths = paths || detected?.paths || [];
  const resolvedBadge = badgeText || detected?.badgeText || null;
  const resolvedIcon = icon || detected?.icon || 'fa-laptop-code';

  const breadcrumbPill = (
    <div className={`flex ${isCenter ? 'justify-center' : 'justify-start'} mb-4`}>
      <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-gray-100 shadow-md">
        <Link to="/" className="w-8 h-8 rounded-full bg-[#FF4D00] text-white flex items-center justify-center hover:bg-[#CC3D00] transition-all shrink-0 shadow-sm">
          <i className="fa-solid fa-house text-xs"></i>
        </Link>
        <span className="text-[10px] font-black text-[#5D3A1F]/70 uppercase tracking-widest">INICIO</span>
        {resolvedPaths.map((p, idx) => (
          <React.Fragment key={idx}>
            <span className="text-[#FF4D00]/40">/</span>
            {p.url ? (
              <Link to={p.url} className="text-[10px] font-black text-[#FF4D00] uppercase tracking-widest hover:underline">
                {p.label}
              </Link>
            ) : (
              <span className="text-[10px] font-black text-[#5D3A1F] uppercase tracking-widest">{p.label}</span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );

  const badgePill = resolvedBadge ? (
    <div className={`flex ${isCenter ? 'justify-center' : 'justify-start'} mb-4`}>
      <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-[#FF4D00]/45 bg-[#FF4D00]/10 text-[9.5px] font-black uppercase tracking-widest text-[#FF4D00] shadow-sm leading-none">
        <i className={`fa-solid ${resolvedIcon}`}></i> {resolvedBadge}
      </span>
    </div>
  ) : null;

  const heroContent = (
    <>
      {title && (
        <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-5xl xl:text-6xl font-black font-heading text-[#8B4513] leading-[1.15] tracking-tight mb-5 sm:mb-6">
          {title}{' '}
          {highlight && (
            <span className="relative inline-block text-[#FF4D00]">
              {highlight}
              <svg className="absolute w-full h-3 -bottom-1.5 left-0 z-[-1] text-amber-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.55)]" viewBox="0 0 200 12" preserveAspectRatio="none" fill="none">
                <path d="M8,8 C22,5 38,7.5 55,7.5 C130,7.5 165,7.5 188,7.5 C194,7.5 198,6 196,7.5" stroke="currentColor" strokeWidth="7" strokeLinecap="round"/>
              </svg>
            </span>
          )}
        </h1>
      )}
      {description && (
        <p className="text-[#1F2937] font-medium max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">{description}</p>
      )}
      {children && <div className="mt-8 sm:mt-10">{children}</div>}
    </>
  );

  if (title || description || children) {
    return (
      <section className={`relative overflow-hidden pt-24 sm:pt-28 lg:pt-32 pb-10 sm:pb-12 ${className}`}>
        <div className="container mx-auto px-6 relative z-10 max-w-5xl text-center flex flex-col items-center">
          {breadcrumbPill}
          {badgePill}
          {heroContent}
        </div>
      </section>
    );
  }

  return (
    <div className={`${className}`}>
      {breadcrumbPill}
      {badgePill}
    </div>
  );
};

export default Breadcrumb;
