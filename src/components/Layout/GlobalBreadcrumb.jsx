import React, { useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation } from 'react-router-dom';

const LABELS = {
  'que-hacemos': 'Qué hacemos',
  tecnologia: 'Tecnología',
  academia: 'Academia',
  negocios: 'Negocios',
  personalizado: 'Soluciones personalizadas',
  servicios: 'Servicios',
  'desarrollo-web': 'Desarrollo web',
  'sistemas-apps': 'Sistemas y aplicaciones',
  'inteligencia-artificial': 'Inteligencia artificial',
  'para-tu-negocio': 'Soluciones para tu negocio',
  'apoyo-academico': 'Apoyo académico',
  empleo: 'Empleo',
  'diseno-grafico': 'Diseño gráfico',
  condiciones: 'Condiciones de uso',
  privacidad: 'Privacidad',
  terminos: 'Términos de servicio',
  cookies: 'Cookies',
  'sobre-nosotros': 'Sobre nosotros',
  historia: 'Historia',
  'mision-vision': 'Misión y visión',
  valores: 'Valores',
  videos: 'Videos',
  promociones: 'Opciones de servicio',
  'como-trabajamos': 'Cómo trabajamos',
  novedades: 'Novedades',
  contactanos: 'Contacto',
  contacto: 'Contacto',
  hero: 'Presentación',
  formulario: 'Formulario',
  recursos: 'Recursos',
  ubicacion: 'Ubicación',
  perfil: 'Mi perfil',
  configuracion: 'Configuración',
  compras: 'Mi espacio',
  espacio: 'Mi espacio',
  'recuperar-contrasena': 'Recuperar contraseña',
};
const NON_LINK_PARENTS = new Set(['que-hacemos', 'servicios']);

const getSegments = (pathname) => {
  const segments = pathname.split('/').filter(Boolean);
  const crumbs = segments.map((segment, index) => ({
    label: LABELS[segment] || segment.replace(/-/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase()),
    url: index < segments.length - 1 && !NON_LINK_PARENTS.has(segment) ? `/${segments.slice(0, index + 1).join('/')}` : null,
  }));

  if (segments[0] === 'contacto' && crumbs.length > 1) {
    crumbs[0] = { label: 'Contacto', url: '/contactanos' };
  }
  if (segments[0] === 'perfil' && ['compras', 'espacio'].includes(segments[1])) {
    crumbs[0] = { label: 'Mi perfil', url: '/perfil' };
  }
  return crumbs;
};

const GlobalBreadcrumb = () => {
  const { pathname } = useLocation();
  const [mountNode, setMountNode] = useState(null);

  useLayoutEffect(() => {
    if (pathname === '/') {
      setMountNode(null);
      return undefined;
    }

    const main = document.querySelector('main');
    if (!main) return undefined;

    let host = null;
    let root = null;
    let originalPosition = '';
    const offset = pathname.startsWith('/perfil') || pathname === '/configuracion' ? 'top-0' : 'top-7';
    const placeBreadcrumb = () => {
      const target = main.querySelector('section') || main;
      if (target === host) return;

      if (host && host !== main) host.style.position = originalPosition;
      root?.remove();
      host = target;
      originalPosition = host === main ? '' : host.style.position;
      if (host !== main && window.getComputedStyle(host).position === 'static') {
        host.style.position = 'relative';
      }
      root = document.createElement('div');
      root.className = `pointer-events-none absolute inset-x-0 ${offset} z-20 flex justify-center px-4`;
      host.prepend(root);
      setMountNode(root);
    };

    placeBreadcrumb();
    const observer = new MutationObserver(placeBreadcrumb);
    observer.observe(main, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      if (host && host !== main) host.style.position = originalPosition;
      root?.remove();
      setMountNode(null);
    };
  }, [pathname]);

  if (pathname === '/' || !mountNode) return null;
  const crumbs = getSegments(pathname);

  return createPortal(
    <nav aria-label="Migas de pan" className="pointer-events-auto">
      <ol className="mx-auto flex w-fit max-w-full items-center gap-2 overflow-x-auto rounded-full border border-white/10 bg-[#0a0d09]/85 px-2 py-1.5 shadow-[0_8px_26px_rgba(0,0,0,.2)]">
        <li className="flex shrink-0 items-center gap-2">
          {crumbs.length ? (
            <Link to="/" aria-label="Ir al inicio" className="flex h-7 w-7 items-center justify-center rounded-full bg-[#A3E635] text-[#0A0A0A] transition hover:bg-[#84CC16]">
              <i className="fa-solid fa-house text-[10px]" aria-hidden="true" />
            </Link>
          ) : (
            <span aria-hidden="true" className="flex h-7 w-7 items-center justify-center rounded-full bg-[#A3E635] text-[#0A0A0A]"><i className="fa-solid fa-house text-[10px]" /></span>
          )}
          {crumbs.length ? <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 sm:text-[10px]">Inicio</span> : <span aria-current="page" className="text-[9px] font-black uppercase tracking-wider text-slate-200 sm:text-[10px]">Inicio</span>}
        </li>
        {crumbs.map((crumb, index) => (
          <li key={`${crumb.label}-${index}`} className="flex shrink-0 items-center gap-2">
            <span aria-hidden="true" className="text-xs text-[#A3E635]/50">/</span>
            {crumb.url ? (
              <Link to={crumb.url} className="text-[9px] font-black uppercase tracking-wider text-[#A3E635] hover:underline sm:text-[10px]">{crumb.label}</Link>
            ) : (
              <span aria-current="page" className="text-[9px] font-black uppercase tracking-wider text-slate-200 sm:text-[10px]">{crumb.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>,
    mountNode,
  );
};

export default GlobalBreadcrumb;
