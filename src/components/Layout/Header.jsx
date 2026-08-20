import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import useAuthStore from '../../store/useAutenticacionStore';
import useModalStore from '../../store/useModalStore';
import useCarritoStore from '../../store/useCarritoStore';

const NAV_ITEMS = [
    {
        id: 'menu',
        label: 'Nuestro Menú',
        icon: 'fa-utensils',
        type: 'dropdown',
        subItems: [
            { id: 'menu-saltenas', label: 'Salteñas', desc: 'Dulce, picante, súper picante.', target: '/menu/saltenas', icon: 'fa-fire' },
            { id: 'menu-cafe', label: 'Cafetería', desc: 'Americano, Capuccino, Mokaccino.', target: '/menu/cafe', icon: 'fa-mug-hot' },
            { id: 'menu-frapuccinos', label: 'Frapuccinos', desc: 'Bebidas heladas y cremosas.', target: '/menu/frapuccinos', icon: 'fa-blender' },
            { id: 'menu-refrescos', label: 'Refrescos', desc: 'Licuados, jugos y tradicionales.', target: '/menu/refrescos', icon: 'fa-leaf' },
            { id: 'menu-postres', label: 'Postres', desc: 'Sundaes y dulces caseros.', target: '/menu/postres', icon: 'fa-ice-cream' },
            { id: 'menu-combos', label: 'Combos', desc: 'Ofertas para compartir y ahorrar.', target: '/menu/combos', icon: 'fa-tags' },
        ]
    },
    { id: 'promociones', label: 'Promociones', icon: 'fa-tags', type: 'route', target: '/promociones' },
    {
        id: 'servicios',
        label: 'Servicios',
        icon: 'fa-concierge-bell',
        type: 'dropdown',
        subItems: [
            { id: 'srv-delivery', label: 'Delivery Express', desc: 'Entrega a domicilio en minutos.', target: '/servicios/delivery', icon: 'fa-motorcycle' },
            { id: 'srv-mayor', label: 'Pedidos por Mayor', desc: 'Precios especiales al por mayor.', target: '/servicios/mayor', icon: 'fa-boxes-stacked' },
            { id: 'srv-eventos', label: 'Eventos y Catering', desc: 'Catering para fiestas y reuniones.', target: '/servicios/eventos', icon: 'fa-glass-cheers' },
            { id: 'srv-corporativo', label: 'Servicio Corporativo', desc: 'Desayunos para empresas y oficinas.', target: '/servicios/corporativo', icon: 'fa-building' },
            { id: 'srv-congeladas', label: 'Salteñas Congeladas', desc: 'Packs para hornear en casa.', target: '/servicios/congeladas', icon: 'fa-snowflake' },
        ]
    },
    {
        id: 'sucursales',
        label: 'Sucursales',
        icon: 'fa-map-marked-alt',
        type: 'dropdown',
        subItems: [
            { id: 'suc-scz', label: 'Santa Cruz', desc: 'Equipetrol, 2do Anillo, Av. Piraí y Café Beni.', target: '/sucursales/santa-cruz', icon: 'fa-map-location-dot', badge: 'PRINCIPAL' },
            { id: 'suc-cbb', label: 'Cochabamba', desc: '6 sucursales en la ciudad.', target: '/sucursales/cochabamba', icon: 'fa-shop', badge: 'COMPLETO' },
            { id: 'suc-oru', label: 'Oruro', desc: 'Franquicia 1 y Centro Oruro.', target: '/sucursales/oruro', icon: 'fa-store', badge: 'NUEVO' },
        ]
    },
    { id: 'novedades', label: 'Novedades', icon: 'fa-star', type: 'route', target: '/novedades' },
    { id: 'sobre-nosotros', label: 'Sobre Nosotros', icon: 'fa-users', type: 'route', target: '/sobre-nosotros' },
    { id: 'contacto', label: 'Contactanos', icon: 'fa-headset', type: 'route', target: '/contactanos' },
];
const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const openModal = useModalStore((state) => state.openModal);
    const openCart = useCarritoStore((s) => s.openCart);
    const cartCount = useCarritoStore((s) => s.resumen.cantidad_total);
    const [isDark, setIsDark] = useState(document.documentElement.classList.contains('dark'));

    const toggleDarkMode = () => {
        const html = document.documentElement;
        if (html.classList.contains('dark')) {
            html.classList.remove('dark');
            localStorage.setItem('lc_theme', 'light');
            setIsDark(false);
        } else {
            html.classList.add('dark');
            localStorage.setItem('lc_theme', 'dark');
            setIsDark(true);
        }
    };

    useEffect(() => {
        const saved = localStorage.getItem('lc_theme');
        if (saved === 'dark' && !document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.add('dark');
            setIsDark(true);
        }
    }, []);

    const userMenuRef = useRef(null);
    const location = useLocation();
    const navigate = useNavigate();
    const user = useAuthStore((state) => state.user);
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const logout = useAuthStore((state) => state.logout);

    const esRolAdmin = user?.rolId === 1;
    const sinPosibilidadInvitado = !!user?.suscripcion?.invitadoActivado && !!user?.suscripcion?.invitadoExtendido;
    const showGiftBtn = isAuthenticated && !sinPosibilidadInvitado;

    const displayName = user?.nombre || user?.correo || 'usuario@correo.com';
    const shortName = user?.nombre || (user?.correo ? user.correo.split('@')[0] : 'usuario');
    const userInitials = shortName
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0])
        .join('')
        .toUpperCase();
    const userAvatar = user?.fotoPerfil || '';

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY >= 60) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (isMenuOpen) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
        return () => document.body.classList.remove('overflow-hidden');
    }, [isMenuOpen]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!userMenuRef.current) return;
            if (!userMenuRef.current.contains(event.target)) {
                setIsUserMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        return () => {};
    }, []);

    const closeMenu = () => setIsMenuOpen(false);

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            closeMenu();
            return;
        }

        navigate('/');
        closeMenu();
        setTimeout(() => {
            document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    };

    const handleNavItemClick = (item) => {
        if (item.type === 'external') {
            window.open(item.target, '_blank', 'noopener,noreferrer');
            closeMenu();
            return;
        }

        if (item.type === 'route') {
            navigate(item.target);
            closeMenu();
            window.scrollTo(0, 0);
            return;
        }

        if (item.type === 'dropdown' && item.target) {
            const [path, hash] = item.target.split('#');

            if (location.pathname !== path) {
                navigate(path);
                closeMenu();
                if (hash) {
                    setTimeout(() => {
                        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }, 120);
                }
                return;
            }

            if (hash) {
                scrollToSection(hash);
            }
            closeMenu();
            return;
        }

        if (location.pathname !== '/') {
            navigate('/');
            closeMenu();
            setTimeout(() => {
                document.getElementById(item.target)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 120);
            return;
        }

        scrollToSection(item.target);
    };

    const handleUserNavigate = (path) => {
        setIsUserMenuOpen(false);
        navigate(path);
        window.scrollTo(0, 0);
    };

    const handleLogout = async () => {
        await logout();
        setIsUserMenuOpen(false);
        navigate('/');
    };

    return (
        <>
            <header
                className={`fixed top-0 left-0 w-full z-[80] transition-all duration-500 animate-slide-down ${
                    isScrolled
                        ? 'bg-[#FFF5EC]/95 backdrop-blur-xl border-b border-[#FF4D00]/15 shadow-lg shadow-[#FF4D00]/5 py-2 sm:py-3'
                        : 'bg-[#FFF5EC]/85 backdrop-blur-lg border-b border-transparent py-3 sm:py-4'
                }`}
                id="main-header"
            >
                {/* Header Background Effects */}
                <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                    <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#FF4D00]/5 rounded-full blur-[80px] -translate-y-1/2"></div>
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#8B4513]/5 rounded-full blur-[60px] -translate-y-1/2"></div>
                </div>

                <div className="mx-auto max-w-[1280px] px-4 lg:px-6 relative z-10">
                        <div
                            className={`h-[60px] flex items-center transition-all duration-300 lg:h-[70px] xl:justify-center xl:gap-2.5`}
                            id="header-container"
                        >
                        <Link
                            to="/"
                            onClick={() => {
                                if (location.pathname === '/') {
                                    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                                }
                                closeMenu();
                            }}
                            className="h-full flex-shrink-0 flex items-center justify-center group relative z-10 animate-fade-in-up delay-100 xl:mr-2"
                            aria-label="Ir al inicio de LOS CASTORES SCZ"
                        >
                            <img
                                src="/img/02_Logos/LogoHeader.png"
                                alt="Logo Los Castores SCZ"
                                className="h-[54px] lg:h-[64px] w-auto object-contain transition-all duration-300 group-hover:scale-[1.03] select-none"
                            />
                        </Link>

                        <div className="ml-auto flex items-center gap-2 xl:hidden">
                            {/* Botón Carrito móvil */}
                            <button
                                type="button"
                                onClick={openCart}
                                className="relative w-[38px] h-[38px] flex items-center justify-center rounded-full bg-[#5D3A1F] text-white shadow-sm hover:shadow-md hover:bg-[#452A16] hover:scale-105 transition-all duration-300 shrink-0 active:scale-95 z-50"
                                aria-label="Abrir carrito"
                            >
                                <i className="fas fa-shopping-cart text-sm"></i>
                                {cartCount > 0 && (
                                    <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-[#FF4D00] text-white text-[9px] font-black flex items-center justify-center border-2 border-white">
                                        {cartCount}
                                    </span>
                                )}
                            </button>

                            <button
                                id="mobile-menu-btn"
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                aria-label={isMenuOpen ? 'Cerrar Menú' : 'Abrir Menú'}
                                aria-expanded={isMenuOpen}
                                aria-controls="navbar-collapse"
                                className="p-2 text-gray-600 hover:text-primary dark:hover:text-primary hover:bg-white dark:hover:bg-slate-800 rounded-xl focus:outline-none transition-all shadow-sm border border-gray-100 active:scale-95 z-50 animate-fade-in-up delay-200 flex items-center gap-2"
                            >
                            {isMenuOpen ? (
                                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2.5"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            ) : (
                                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2.5"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            )}
                        </button>
                        </div>

                        <nav className="hidden xl:flex items-center rounded-full bg-[#FF4D00]/5 border border-[#FF4D00]/10 shadow-sm animate-fade-in-up delay-200 hover:shadow-md transition-shadow duration-300 px-1 h-[46px]">
                            <div className="flex items-center whitespace-nowrap px-1 gap-0.5 h-full">
                                {NAV_ITEMS.map((item) => (
                                    item.type === 'dropdown' ? (
                                        <div key={item.id} className="nav-item-container h-full flex items-center group">
                                            <button
                                                className="text-[11px] font-black uppercase tracking-wider text-[#2b3a55] hover:text-[#FF4D00] dark:hover:text-[#FF4D00] transition-all duration-300 flex items-center gap-1.5 cursor-pointer px-3 py-1.5 h-[32px] rounded-full hover:bg-[#FF4D00]/5 dark:hover:bg-[#FF4D00]/10 hover:-translate-y-0.5 hover:scale-105"
                                            >
                                                <span>{item.label}</span>
                                                <i className="fas fa-chevron-down text-[8px] transition-transform duration-300 group-hover:rotate-180"></i>
                                            </button>
                                            <div className={`nav-dropdown-menu ${item.id === 'soluciones' ? '!min-w-[280px]' : ''}`}>
                                                <div className="flex flex-col gap-1 p-2">
                                                    {item.subItems.map(subItem => (
                                                        <button 
                                                            key={subItem.id}
                                                            onClick={() => handleNavItemClick({ type: 'dropdown', target: subItem.target })}
                                                            className="flex items-start gap-3 w-full text-left p-2.5 rounded-lg hover:bg-orange-100/50 dark:hover:bg-[#FF4D00]/10 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 hover:translate-x-1.5 hover:shadow-md group/sub cursor-pointer"
                                                        >
                                                            <div className="w-7 h-7 rounded-lg bg-[#FF4D00]/5 flex items-center justify-center text-[#FF4D00] text-xs flex-shrink-0 transition-colors group-hover/sub:bg-[#FF4D00]/10 dark:group-hover/sub:bg-[#FF4D00]/20">
                                                                <i className={`fas ${subItem.icon || 'fa-chevron-right'}`}></i>
                                                            </div>
                                                            <div className="flex-grow">
                                                                <div className="flex items-center justify-between gap-2">
                                                                    <p className="text-xs font-black text-slate-800 leading-none group-hover/sub:text-[#FF4D00] transition-colors">{subItem.label}</p>
                                                                    {subItem.badge && (
                                                                        <span className="px-1.5 py-0.5 rounded bg-green-500/10 border border-green-500/20 text-[7px] font-black text-green-600 uppercase tracking-widest leading-none">
                                                                            {subItem.badge}
                                                                        </span>
                                                                    )}
                                                                </div>
                                                                <p className="text-[9px] text-slate-400 mt-1 font-bold leading-tight whitespace-normal">{subItem.desc}</p>
                                                            </div>
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div key={item.id} className="nav-item-container h-full flex items-center">
                                            <button
                                                onClick={() => handleNavItemClick(item)}
                                                className="text-[11px] font-black uppercase tracking-wider text-[#2b3a55] hover:text-[#FF4D00] dark:hover:text-[#FF4D00] transition-all duration-300 px-3 py-1.5 h-[32px] rounded-full hover:bg-[#FF4D00]/5 dark:hover:bg-[#FF4D00]/10 hover:-translate-y-0.5 hover:scale-105 cursor-pointer"
                                            >
                                                {item.label}
                                            </button>
                                        </div>
                                    )
                                ))}
                            </div>
                        </nav>

                        <div className="hidden xl:flex items-center gap-2.5 animate-fade-in-up delay-300">
                            {/* Botón Carrito */}
                            <button
                                type="button"
                                onClick={openCart}
                                className="relative w-[38px] h-[38px] flex items-center justify-center rounded-full bg-[#5D3A1F] text-white shadow-sm hover:shadow-md hover:bg-[#452A16] hover:scale-105 transition-all duration-300 shrink-0"
                                aria-label="Abrir carrito"
                            >
                                <i className="fas fa-shopping-cart text-sm"></i>
                                {cartCount > 0 && (
                                    <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-[#FF4D00] text-white text-[9px] font-black flex items-center justify-center border-2 border-white">
                                        {cartCount}
                                    </span>
                                )}
                            </button>

                            {isAuthenticated ? (
                                <div className="relative flex items-center gap-2.5" ref={userMenuRef}>
                                    {esRolAdmin && (
                                        <button
                                            type="button"
                                            className="w-[38px] h-[38px] flex items-center justify-center rounded-full bg-[#FF4D00] text-white shadow-sm hover:shadow-md hover:bg-[#CC3D00] hover:scale-105 transition-all duration-300 shrink-0"
                                            onClick={() => {
                                                setIsUserMenuOpen(false);
                                                navigate('/store/home');
                                            }}
                                            title="Sistema"
                                        >
                                            <i className="fas fa-laptop text-sm"></i>
                                        </button>
                                    )}

                                    <div className="relative nav-item-container group">
                                          <button
                                               onClick={() => setIsUserMenuOpen((prev) => !prev)}
                                               className="flex items-center gap-2.5 rounded-full bg-[#FF4D00]/5 border border-[#FF4D00]/10 shadow-sm hover:shadow-md transition-all duration-300 px-4 py-1.5 cursor-pointer hover:bg-[#FF4D00]/10 min-h-[44px]"
                                           >
                                               <span className="w-8 h-8 rounded-full bg-white border border-[#FF4D00]/30 text-[#FF4D00] flex items-center justify-center text-sm font-black overflow-hidden shadow-sm shrink-0">
                                                   {userAvatar ? (
                                                       <img src={userAvatar} alt="Perfil" className="w-full h-full object-cover" />
                                                   ) : (
                                                       userInitials || 'U'
                                                   )}
                                               </span>
                                                <span className="text-[12px] font-black tracking-wider text-[#2b3a55] group-hover:text-[#FF4D00] max-w-[140px] truncate transition-colors">
                                                    {displayName}
                                               </span>
                                                <i className={`fas fa-chevron-down text-[9px] text-[#2b3a55] group-hover:text-[#FF4D00] transition-transform duration-300 ${isUserMenuOpen ? 'rotate-180' : 'group-hover:rotate-180'} mr-1`}></i>
                                            </button>
                                          
                                           <div className={`nav-dropdown-menu ${isUserMenuOpen ? '!opacity-100 !visible !translate-y-[4px]' : ''}`}>
                                                 <div className="flex flex-col gap-1 p-2">
                                                     
                                                     <button onClick={() => { setIsUserMenuOpen(false); handleUserNavigate('/perfil'); }} className="flex items-start gap-3 w-full text-left p-2.5 rounded-lg hover:bg-orange-100/50 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 hover:translate-x-1.5 hover:shadow-md group/sub cursor-pointer">
                                                         <div className="w-7 h-7 rounded-lg bg-[#FF4D00]/5 flex items-center justify-center text-[#FF4D00] text-xs flex-shrink-0 transition-colors group-hover/sub:bg-[#FF4D00]/10">
                                                             <i className="fas fa-user"></i>
                                                         </div>
                                                         <div className="flex-grow">
                                                             <div className="flex items-center justify-between gap-2">
                                                                <p className="text-xs font-black text-slate-800 leading-none group-hover/sub:text-[#FF4D00] transition-colors">Mi Perfil</p>
                                                             </div>
                                                             <p className="text-[9px] text-slate-400 mt-1 font-bold leading-tight">Datos personales y foto</p>
                                                         </div>
                                                     </button>

                                                     <button onClick={() => { setIsUserMenuOpen(false); handleUserNavigate('/perfil/compras'); }} className="flex items-start gap-3 w-full text-left p-2.5 rounded-lg hover:bg-orange-100/50 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 hover:translate-x-1.5 hover:shadow-md group/sub cursor-pointer">
                                                         <div className="w-7 h-7 rounded-lg bg-[#FF4D00]/5 flex items-center justify-center text-[#FF4D00] text-xs flex-shrink-0 transition-colors group-hover/sub:bg-[#FF4D00]/10">
                                                             <i className="fas fa-receipt"></i>
                                                         </div>
                                                         <div className="flex-grow">
                                                             <div className="flex items-center justify-between gap-2">
                                                                <p className="text-xs font-black text-slate-800 leading-none group-hover/sub:text-[#FF4D00] transition-colors">Mis Compras</p>
                                                             </div>
                                                             <p className="text-[9px] text-slate-400 mt-1 font-bold leading-tight">Pedidos y facturas</p>
                                                         </div>
                                                     </button>

                                                     <button onClick={() => { setIsUserMenuOpen(false); handleUserNavigate('/configuracion'); }} className="flex items-start gap-3 w-full text-left p-2.5 rounded-lg hover:bg-orange-100/50 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 hover:translate-x-1.5 hover:shadow-md group/sub cursor-pointer">
                                                         <div className="w-7 h-7 rounded-lg bg-[#FF4D00]/5 flex items-center justify-center text-[#FF4D00] text-xs flex-shrink-0 transition-colors group-hover/sub:bg-[#FF4D00]/10">
                                                             <i className="fas fa-gear"></i>
                                                         </div>
                                                         <div className="flex-grow">
                                                             <div className="flex items-center justify-between gap-2">
                                                                <p className="text-xs font-black text-slate-800 leading-none group-hover/sub:text-[#FF4D00] transition-colors">Configuración</p>
                                                             </div>
                                                             <p className="text-[9px] text-slate-400 mt-1 font-bold leading-tight">Preferencias y seguridad</p>
                                                         </div>
                                                     </button>

                                                     <div className="w-full h-px bg-[#FF4D00]/10 my-1"></div>

                                                     <button onClick={() => { setIsUserMenuOpen(false); handleLogout(); }} className="flex items-start gap-3 w-full text-left p-2.5 rounded-lg hover:bg-orange-100/50 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 hover:translate-x-1.5 hover:shadow-md group/sub cursor-pointer">
                                                         <div className="w-7 h-7 rounded-lg bg-red-50 flex items-center justify-center text-red-500 text-xs flex-shrink-0 transition-colors group-hover/sub:bg-red-100">
                                                             <i className="fas fa-arrow-right-from-bracket"></i>
                                                         </div>
                                                         <div className="flex-grow">
                                                             <div className="flex items-center justify-between gap-2">
                                                                <p className="text-xs font-black text-red-600 leading-none group-hover/sub:text-red-700 transition-colors uppercase tracking-wider">Cerrar Sesión</p>
                                                             </div>
                                                             <p className="text-[9px] text-gray-400 mt-1 font-bold leading-tight">Salir de tu cuenta</p>
                                                         </div>
                                                     </button>

                                                 </div>
                                              </div>
                                     </div>

                                    <button
                                        type="button"
                                        className="w-[38px] h-[38px] flex items-center justify-center rounded-full bg-[#FF4D00] text-white shadow-sm hover:shadow-md hover:bg-[#CC3D00] hover:scale-105 transition-all duration-300 shrink-0 relative"
                                        onClick={() => window.dispatchEvent(new Event('abrirModalInvitado'))}
                                        title="Mis Recompensas"
                                    >
                                        <i className="fas fa-gift text-sm animate-pulse"></i>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={toggleDarkMode}
                                        className="w-[38px] h-[38px] flex items-center justify-center rounded-full bg-[#5D3A1F] text-white shadow-sm hover:shadow-md hover:bg-[#452A16] hover:scale-105 transition-all duration-300 shrink-0"
                                        title={isDark ? 'Activar modo claro' : 'Activar modo oscuro'}
                                    >
                                        <i className={`fas ${isDark ? 'fa-sun' : 'fa-moon'} text-sm`}></i>
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <button
                                        onClick={() => openModal('loginModal')}
                                        className="flex items-center justify-center gap-1.5 min-w-0 sm:min-w-[110px] w-full sm:w-auto h-9 px-3 bg-[#FF4D00] hover:bg-[#CC3D00] text-white rounded-full shadow-[0_4px_15px_rgba(164,30,34,0.4)] hover:shadow-[0_6px_20px_rgba(164,30,34,0.6)] hover:-translate-y-0.5 transition-all duration-300 group ring-1 ring-white/10 text-[9px] font-black tracking-[0.12em] whitespace-nowrap"
                                    >
                                        <i className="fas fa-user-lock text-[9px] group-hover:-translate-y-0.5 group-hover:scale-110 group-hover:-translate-y-1 group-hover:rotate-[8deg] transition-transform duration-300"></i>
                                        <span className="uppercase">Iniciar Sesion</span>
                                    </button>
 
                                    <button
                                        onClick={() => openModal('registerModal')}
                                        className="relative overflow-hidden group flex items-center justify-center min-w-0 sm:min-w-[110px] w-full sm:w-auto h-9 px-3 text-white bg-[#5D3A1F] hover:bg-[#452A16] font-black text-[9px] uppercase tracking-[0.12em] rounded-full shadow-md shadow-[#5D3A1F]/30 hover:-translate-y-0.5 transition-all duration-300 active:scale-95 whitespace-nowrap"
                                    >
                                        <span className="relative z-10 flex items-center gap-2">
                                            <i className="fas fa-user-plus text-[9px] group-hover:scale-110 group-hover:-translate-y-1 group-hover:rotate-[8deg] transition-transform"></i>
                                            Crear Cuenta
                                            <i className="fas fa-arrow-right text-[9px] group-hover:translate-x-0.5 transition-transform"></i>
                                        </span>
                                        <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-700 ease-in-out"></div>
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            <div
                id="navbar-collapse"
                className={`fixed inset-0 z-[70] bg-white xl:hidden flex flex-col px-4 sm:px-5 pt-16 pb-8 overflow-y-auto transition-all duration-300 ease-out ${
                    isMenuOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'
                }`}
            >
                <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-end px-2 py-4 shadow-md border-b border-[#FF4D00]/10 border-gray-100">
                        {showGiftBtn && (
                            <button
                                onClick={() => {
                                    closeMenu();
                                    window.dispatchEvent(new Event('abrirModalInvitado'));
                                }}
                                className="w-8 h-8 flex items-center justify-center rounded-full bg-[#FF4D00] text-white shadow-sm hover:shadow-md hover:bg-[#CC3D00]"
                            >
                                <i className="fas fa-gift"></i>
                            </button>
                        )}
                    </div>
                    {NAV_ITEMS.map((item) => (
                        item.type === 'dropdown' ? (
                            <div key={item.id} className="flex flex-col shadow-md border-b border-[#FF4D00]/10 border-gray-50 pb-2">
                                <div className="flex items-center justify-between px-2 py-4 text-[15px] font-semibold text-gray-700">
                                    <span className="flex items-center gap-3">
                                        <i className={`fas ${item.icon} text-[13px] text-[#B33600] opacity-80`}></i>
                                        <span className="text-[#B33600]">{item.label}</span>
                                    </span>
                                    <i className="fas fa-chevron-down text-xs text-gray-400"></i>
                                </div>
                                <div className="flex flex-col gap-1 pl-8">
                                    {item.subItems.map((subItem) => (
                                        <button
                                            key={subItem.id}
                                            onClick={() => handleNavItemClick({ type: 'dropdown', target: subItem.target })}
                                            className="flex items-center justify-between px-4 py-3 text-[14px] font-medium text-slate-600 hover:bg-red-50 dark:hover:bg-slate-800/50 rounded-xl transition-colors"
                                        >
                                            {subItem.label}
                                            <i className="fas fa-arrow-right text-[10px] text-gray-300"></i>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <button
                                key={item.id}
                                onClick={() => handleNavItemClick(item)}
                                className="flex items-center justify-between px-2 py-4 text-[15px] font-semibold text-gray-700 hover:text-[#FF4D00] dark:hover:text-[#FF4D00] transition-colors duration-300 group shadow-md border-b border-[#FF4D00]/10 border-gray-50"
                            >
                                <span className="flex items-center gap-3">
                                    <i className={`fas ${item.icon} text-[13px] text-gray-400 group-hover:text-[#FF4D00] transition-colors`}></i>
                                    {item.label}
                                </span>
                                <i className="fas fa-arrow-right text-xs text-gray-400 group-hover:text-[#FF4D00] transition-all -translate-x-1 group-hover:translate-x-0"></i>
                            </button>
                        )
                    ))}
                </div>

                <div className="mx-auto w-full max-w-md mt-6 pt-5 border-t border-gray-200/60 flex flex-col gap-3">
                    {isAuthenticated ? (
                        <div className="rounded-2xl border border-[#FF4D00]/15 bg-white shadow-sm overflow-hidden">
                            <div className="px-4 py-4 flex items-center gap-3 bg-gradient-to-r from-[#FF4D00]/5 via-white to-[#FF4D00]/5">
                                <span className="w-10 h-10 rounded-full bg-[#FF4D00]/10 border border-[#FF4D00]/20 text-[#FF4D00] flex items-center justify-center text-sm font-black overflow-hidden">
                                    {userAvatar ? (
                                        <img src={userAvatar} alt="Perfil" className="w-full h-full object-cover" />
                                    ) : (
                                        userInitials || 'U'
                                    )}
                                </span>
                                <div>
                                    <p className="text-[11px] uppercase tracking-[0.2em] font-black text-[#FF4D00]/60">Sesion activa</p>
                                    <p className="text-[12px] font-extrabold text-slate-800 break-all">{displayName}</p>
                                    {user?.nombre && user?.correo && (
                                        <p className="text-[10px] text-slate-500 break-all">{user.correo}</p>
                                    )}
                                </div>
                            </div>
                            <div className="border-t border-[#FF4D00]/10">
                                <button
                                    onClick={() => {
                                        closeMenu();
                                        handleUserNavigate('/perfil');
                                    }}
                                    className="w-full px-4 py-2 text-left text-xs font-black uppercase text-slate-700 hover:bg-[#FF4D00]/5 dark:hover:bg-[#FF4D00]/10 flex items-center gap-3 transition-colors rounded-xl"
                                >
                                    <span className="w-8 h-8 rounded-xl bg-[#FF4D00]/10 border border-[#FF4D00]/20 text-[#FF4D00] flex items-center justify-center shrink-0">
                                        <i className="fas fa-user text-xs"></i>
                                    </span>
                                    Mi perfil
                                </button>
                                <button
                                    onClick={() => {
                                        closeMenu();
                                        handleUserNavigate('/perfil/compras');
                                    }}
                                    className="w-full px-4 py-2 text-left text-xs font-black uppercase text-slate-700 hover:bg-[#FF4D00]/5 dark:hover:bg-[#FF4D00]/10 flex items-center gap-3 transition-colors rounded-xl"
                                >
                                    <span className="w-8 h-8 rounded-xl bg-[#FF4D00]/10 border border-[#FF4D00]/20 text-[#FF4D00] flex items-center justify-center shrink-0">
                                        <i className="fas fa-receipt text-xs"></i>
                                    </span>
                                    Mis Compras
                                </button>
                                <button
                                    onClick={() => {
                                        closeMenu();
                                        handleUserNavigate('/configuracion');
                                    }}
                                    className="w-full px-4 py-2 text-left text-xs font-black uppercase text-slate-700 hover:bg-[#FF4D00]/5 dark:hover:bg-[#FF4D00]/10 flex items-center gap-3 transition-colors rounded-xl"
                                >
                                    <span className="w-8 h-8 rounded-xl bg-[#FF4D00]/10 border border-[#FF4D00]/20 text-[#FF4D00] flex items-center justify-center shrink-0">
                                        <i className="fas fa-gear text-xs"></i>
                                    </span>
                                    ConfiguraciÃ³n
                                </button>
                                <button
                                    onClick={async () => {
                                        closeMenu();
                                        await handleLogout();
                                    }}
                                    className="w-full px-4 py-3 text-left text-sm font-semibold text-[#FF4D00] hover:bg-[#FF4D00]/10 dark:hover:bg-[#FF4D00]/20 flex items-center gap-3 transition-colors"
                                >
                                    <span className="w-8 h-8 rounded-xl bg-[#FF4D00]/15 border border-[#FF4D00]/30 text-[#FF4D00] flex items-center justify-center">
                                        <i className="fas fa-arrow-right-from-bracket text-[12px]"></i>
                                    </span>
                                    Cerrar sesion
                                </button>
                            </div>
                        </div>
                    ) : (
                        <>
                            <button
                                onClick={() => {
                                    closeMenu();
                                    openModal('loginModal');
                                }}
                                className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-2xl border border-[#FF4D00]/20 text-slate-700 font-bold hover:border-[#FF4D00]/40 dark:hover:border-[#FF4D00]/40 hover:text-[#FF4D00] dark:hover:text-[#FF4D00] hover:bg-[#FF4D00]/5 dark:hover:bg-[#FF4D00]/10 transition-all group"
                            >
                                <i className="fas fa-user-lock text-sm group-hover:scale-110 group-hover:-translate-y-1 group-hover:rotate-[8deg] transition-transform"></i>
                                <span className="group-hover:scale-105 transition-transform">Iniciar Sesion</span>
                            </button>

                            <button
                                onClick={() => {
                                    closeMenu();
                                    openModal('registerModal');
                                }}
                                className="w-full py-3 bg-[#5D3A1F] hover:bg-[#452A16] text-white font-black text-[15px] uppercase tracking-[0.16em] rounded-2xl shadow-xl shadow-[#5D3A1F]/30 active:scale-95 transition-all relative overflow-hidden group flex items-center justify-center gap-2"
                            >
                                <span className="relative z-10 inline-flex items-center gap-2">
                                    <i className="fas fa-user-plus text-[13px]"></i>
                                    Crear Cuenta
                                </span>
                                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                            </button>
                        </>
                    )}
                </div>
            </div>
            
            {/* Centralized Modals Rendered in App.jsx */}
        </>
    );
};

export default Header;
