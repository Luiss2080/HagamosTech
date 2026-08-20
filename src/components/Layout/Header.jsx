import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import useAuthStore from '../../store/useAutenticacionStore';
import useModalStore from '../../store/useModalStore';
import useCarritoStore from '../../store/useCarritoStore';

const NAV_ITEMS = [
    {
        id: 'que-hacemos',
        label: '¿Qué hacemos?',
        icon: 'fa-layer-group',
        type: 'dropdown',
        subItems: [
            { id: 'cat-tecnologia', label: 'Tecnología', desc: 'Desarrollo, sistemas, automatización e IA.', target: '/#tecnologia', icon: 'fa-microchip' },
            { id: 'cat-academia', label: 'Academia', desc: 'Proyectos, simulaciones y recursos educativos.', target: '/#academia', icon: 'fa-graduation-cap' },
            { id: 'cat-negocios', label: 'Negocios', desc: 'Digitalización, páginas web y automatización.', target: '/#negocios', icon: 'fa-store' },
            { id: 'cat-personalizado', label: 'Soluciones personalizadas', desc: '¿No sabés qué necesitás? Contanos el problema.', target: '/#personalizado', icon: 'fa-lightbulb' },
        ]
    },
    { id: 'flujo', label: 'Cómo trabajamos', icon: 'fa-diagram-project', type: 'scroll', target: 'flujo' },
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
                        ? 'bg-[#0A0A0A]/95 backdrop-blur-xl border-b border-[#A3E635]/20 shadow-lg shadow-black/30 py-2 sm:py-3'
                        : 'bg-[#0A0A0A]/85 backdrop-blur-lg border-b border-transparent py-3 sm:py-4'
                }`}
                id="main-header"
            >
                {/* Header Background Effects */}
                <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                    <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#A3E635]/10 rounded-full blur-[80px] -translate-y-1/2"></div>
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#A3E635]/5 rounded-full blur-[60px] -translate-y-1/2"></div>
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
                            aria-label="Ir al inicio de HagamosTech"
                        >
                            <img
                                src="/img/02_Logos/LogoHeader.png"
                                alt="Logo HagamosTech"
                                className="h-[54px] lg:h-[64px] w-auto object-contain transition-all duration-300 group-hover:scale-[1.03] select-none"
                            />
                        </Link>

                        <div className="ml-auto flex items-center gap-2 xl:hidden">
                            {/* Botón Carrito móvil */}
                            <button
                                type="button"
                                onClick={openCart}
                                className="relative w-[38px] h-[38px] flex items-center justify-center rounded-full bg-[#A3E635] text-[#0A0A0A] shadow-sm hover:shadow-md hover:bg-[#84CC16] hover:scale-105 transition-all duration-300 shrink-0 active:scale-95 z-50"
                                aria-label="Abrir carrito"
                            >
                                <i className="fas fa-shopping-cart text-sm"></i>
                                {cartCount > 0 && (
                                    <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-[#0A0A0A] text-[#A3E635] text-[9px] font-black flex items-center justify-center border-2 border-white">
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
                                className="p-2 text-white hover:text-[#A3E635] dark:hover:text-[#A3E635] hover:bg-white/10 rounded-xl focus:outline-none transition-all shadow-sm border border-white/10 active:scale-95 z-50 animate-fade-in-up delay-200 flex items-center gap-2"
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

                        <nav className="hidden xl:flex items-center rounded-full bg-[#0A0A0A]/60 border border-[#A3E635]/20 shadow-sm animate-fade-in-up delay-200 hover:shadow-md hover:shadow-[#A3E635]/10 transition-shadow duration-300 px-1 h-[46px]">
                            <div className="flex items-center whitespace-nowrap px-1 gap-0.5 h-full">
                                {NAV_ITEMS.map((item) => (
                                    item.type === 'dropdown' ? (
                                        <div key={item.id} className="nav-item-container h-full flex items-center group">
                                            <button
                                                className="text-[11px] font-black uppercase tracking-wider text-white/80 hover:text-[#A3E635] dark:hover:text-[#A3E635] transition-all duration-300 flex items-center gap-1.5 cursor-pointer px-3 py-1.5 h-[32px] rounded-full hover:bg-[#A3E635]/10 dark:hover:bg-[#A3E635]/10 hover:-translate-y-0.5 hover:scale-105"
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
                                                            className="flex items-start gap-3 w-full text-left p-2.5 rounded-lg hover:bg-[#A3E635]/10 dark:hover:bg-[#A3E635]/10 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 hover:translate-x-1.5 hover:shadow-md group/sub cursor-pointer"
                                                        >
                                                            <div className="w-7 h-7 rounded-lg bg-[#A3E635]/10 flex items-center justify-center text-[#A3E635] text-xs flex-shrink-0 transition-colors group-hover/sub:bg-[#A3E635] dark:group-hover/sub:bg-[#A3E635] group-hover/sub:text-[#0A0A0A]">
                                                                <i className={`fas ${subItem.icon || 'fa-chevron-right'}`}></i>
                                                            </div>
                                                            <div className="flex-grow">
                                                                <div className="flex items-center justify-between gap-2">
                                                                    <p className="text-xs font-black text-white leading-none group-hover/sub:text-[#A3E635] transition-colors">{subItem.label}</p>
                                                                </div>
                                                                <p className="text-[9px] text-white/50 mt-1 font-bold leading-tight whitespace-normal">{subItem.desc}</p>
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
                                                className="text-[11px] font-black uppercase tracking-wider text-white/80 hover:text-[#A3E635] dark:hover:text-[#A3E635] transition-all duration-300 px-3 py-1.5 h-[32px] rounded-full hover:bg-[#A3E635]/10 dark:hover:bg-[#A3E635]/10 hover:-translate-y-0.5 hover:scale-105 cursor-pointer"
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
                                className="relative w-[38px] h-[38px] flex items-center justify-center rounded-full bg-[#A3E635] text-[#0A0A0A] shadow-sm hover:shadow-md hover:bg-[#84CC16] hover:scale-105 transition-all duration-300 shrink-0"
                                aria-label="Abrir carrito"
                            >
                                <i className="fas fa-shopping-cart text-sm"></i>
                                {cartCount > 0 && (
                                    <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-[#0A0A0A] text-[#A3E635] text-[9px] font-black flex items-center justify-center border-2 border-white">
                                        {cartCount}
                                    </span>
                                )}
                            </button>

                            {isAuthenticated ? (
                                <div className="relative flex items-center gap-2.5" ref={userMenuRef}>
                                    {esRolAdmin && (
                                        <button
                                            type="button"
                                            className="w-[38px] h-[38px] flex items-center justify-center rounded-full bg-[#A3E635] text-[#0A0A0A] shadow-sm hover:shadow-md hover:bg-[#84CC16] hover:scale-105 transition-all duration-300 shrink-0"
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
                                                className="flex items-center gap-2.5 rounded-full bg-[#A3E635]/10 border border-[#A3E635]/20 shadow-sm hover:shadow-md transition-all duration-300 px-4 py-1.5 cursor-pointer hover:bg-[#A3E635]/20 min-h-[44px]"
                                            >
                                                <span className="w-8 h-8 rounded-full bg-[#0A0A0A] border border-[#A3E635]/40 text-[#A3E635] flex items-center justify-center text-sm font-black overflow-hidden shadow-sm shrink-0">
                                                    {userAvatar ? (
                                                        <img src={userAvatar} alt="Perfil" className="w-full h-full object-cover" />
                                                    ) : (
                                                        userInitials || 'U'
                                                    )}
                                                </span>
                                                 <span className="text-[12px] font-black tracking-wider text-white group-hover:text-[#A3E635] max-w-[140px] truncate transition-colors">
                                                     {displayName}
                                                </span>
                                                 <i className={`fas fa-chevron-down text-[9px] text-white group-hover:text-[#A3E635] transition-transform duration-300 ${isUserMenuOpen ? 'rotate-180' : 'group-hover:rotate-180'} mr-1`}></i>
                                             </button>

                                            <div className={`nav-dropdown-menu ${isUserMenuOpen ? '!opacity-100 !visible !translate-y-[4px]' : ''}`}>
                                                  <div className="flex flex-col gap-1 p-2">

                                                      <button onClick={() => { setIsUserMenuOpen(false); handleUserNavigate('/perfil'); }} className="flex items-start gap-3 w-full text-left p-2.5 rounded-lg hover:bg-[#A3E635]/10 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 hover:translate-x-1.5 hover:shadow-md group/sub cursor-pointer">
                                                          <div className="w-7 h-7 rounded-lg bg-[#A3E635]/10 flex items-center justify-center text-[#A3E635] text-xs flex-shrink-0 transition-colors group-hover/sub:bg-[#A3E635] group-hover/sub:text-[#0A0A0A]">
                                                              <i className="fas fa-user"></i>
                                                          </div>
                                                          <div className="flex-grow">
                                                              <div className="flex items-center justify-between gap-2">
                                                                 <p className="text-xs font-black text-white leading-none group-hover/sub:text-[#A3E635] transition-colors">Mi Perfil</p>
                                                              </div>
                                                              <p className="text-[9px] text-white/50 mt-1 font-bold leading-tight">Datos personales y foto</p>
                                                          </div>
                                                      </button>

                                                      <button onClick={() => { setIsUserMenuOpen(false); handleUserNavigate('/perfil/compras'); }} className="flex items-start gap-3 w-full text-left p-2.5 rounded-lg hover:bg-[#A3E635]/10 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 hover:translate-x-1.5 hover:shadow-md group/sub cursor-pointer">
                                                          <div className="w-7 h-7 rounded-lg bg-[#A3E635]/10 flex items-center justify-center text-[#A3E635] text-xs flex-shrink-0 transition-colors group-hover/sub:bg-[#A3E635] group-hover/sub:text-[#0A0A0A]">
                                                              <i className="fas fa-receipt"></i>
                                                          </div>
                                                          <div className="flex-grow">
                                                              <div className="flex items-center justify-between gap-2">
                                                                 <p className="text-xs font-black text-white leading-none group-hover/sub:text-[#A3E635] transition-colors">Mis Compras</p>
                                                              </div>
                                                              <p className="text-[9px] text-white/50 mt-1 font-bold leading-tight">Pedidos y facturas</p>
                                                          </div>
                                                      </button>

                                                      <button onClick={() => { setIsUserMenuOpen(false); handleUserNavigate('/configuracion'); }} className="flex items-start gap-3 w-full text-left p-2.5 rounded-lg hover:bg-[#A3E635]/10 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 hover:translate-x-1.5 hover:shadow-md group/sub cursor-pointer">
                                                          <div className="w-7 h-7 rounded-lg bg-[#A3E635]/10 flex items-center justify-center text-[#A3E635] text-xs flex-shrink-0 transition-colors group-hover/sub:bg-[#A3E635] group-hover/sub:text-[#0A0A0A]">
                                                              <i className="fas fa-gear"></i>
                                                          </div>
                                                          <div className="flex-grow">
                                                              <div className="flex items-center justify-between gap-2">
                                                                 <p className="text-xs font-black text-white leading-none group-hover/sub:text-[#A3E635] transition-colors">Configuración</p>
                                                              </div>
                                                              <p className="text-[9px] text-white/50 mt-1 font-bold leading-tight">Preferencias y seguridad</p>
                                                          </div>
                                                      </button>

                                                      <div className="w-full h-px bg-[#A3E635]/15 my-1"></div>

                                                      <button onClick={() => { setIsUserMenuOpen(false); handleLogout(); }} className="flex items-start gap-3 w-full text-left p-2.5 rounded-lg hover:bg-red-500/10 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 hover:translate-x-1.5 hover:shadow-md group/sub cursor-pointer">
                                                          <div className="w-7 h-7 rounded-lg bg-red-500/10 flex items-center justify-center text-red-500 text-xs flex-shrink-0 transition-colors group-hover/sub:bg-red-500/20">
                                                              <i className="fas fa-arrow-right-from-bracket"></i>
                                                          </div>
                                                          <div className="flex-grow">
                                                              <div className="flex items-center justify-between gap-2">
                                                                 <p className="text-xs font-black text-red-400 leading-none group-hover/sub:text-red-500 transition-colors uppercase tracking-wider">Cerrar Sesión</p>
                                                              </div>
                                                              <p className="text-[9px] text-white/40 mt-1 font-bold leading-tight">Salir de tu cuenta</p>
                                                          </div>
                                                      </button>

                                                  </div>
                                               </div>
                                      </div>

                                    <button
                                        type="button"
                                        className="w-[38px] h-[38px] flex items-center justify-center rounded-full bg-[#A3E635] text-[#0A0A0A] shadow-sm hover:shadow-md hover:bg-[#84CC16] hover:scale-105 transition-all duration-300 shrink-0 relative"
                                        onClick={() => window.dispatchEvent(new Event('abrirModalInvitado'))}
                                        title="Mis Recompensas"
                                    >
                                        <i className="fas fa-gift text-sm animate-pulse"></i>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={toggleDarkMode}
                                        className="w-[38px] h-[38px] flex items-center justify-center rounded-full bg-[#0A0A0A] text-[#A3E635] shadow-sm hover:shadow-md hover:bg-[#171717] hover:scale-105 transition-all duration-300 shrink-0 border border-[#A3E635]/30"
                                        title={isDark ? 'Activar modo claro' : 'Activar modo oscuro'}
                                    >
                                        <i className={`fas ${isDark ? 'fa-sun' : 'fa-moon'} text-sm`}></i>
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <button
                                        onClick={() => openModal('loginModal')}
                                        className="flex items-center justify-center gap-1.5 min-w-0 sm:min-w-[110px] w-full sm:w-auto h-9 px-3 bg-[#A3E635] hover:bg-[#84CC16] text-[#0A0A0A] rounded-full shadow-[0_4px_15px_rgba(163,230,53,0.4)] hover:shadow-[0_6px_20px_rgba(163,230,53,0.6)] hover:-translate-y-0.5 transition-all duration-300 group ring-1 ring-white/10 text-[9px] font-black tracking-[0.12em] whitespace-nowrap"
                                    >
                                        <i className="fas fa-user-lock text-[9px] group-hover:-translate-y-0.5 group-hover:scale-110 group-hover:-translate-y-1 group-hover:rotate-[8deg] transition-transform duration-300"></i>
                                        <span className="uppercase">Iniciar Sesion</span>
                                    </button>

                                    <button
                                        onClick={() => openModal('registerModal')}
                                        className="relative overflow-hidden group flex items-center justify-center min-w-0 sm:min-w-[110px] w-full sm:w-auto h-9 px-3 text-[#A3E635] bg-transparent border border-[#A3E635]/50 hover:bg-[#A3E635]/10 font-black text-[9px] uppercase tracking-[0.12em] rounded-full shadow-md hover:-translate-y-0.5 transition-all duration-300 active:scale-95 whitespace-nowrap"
                                    >
                                        <span className="relative z-10 flex items-center gap-2">
                                            <i className="fas fa-user-plus text-[9px] group-hover:scale-110 group-hover:-translate-y-1 group-hover:rotate-[8deg] transition-transform"></i>
                                            Crear Cuenta
                                            <i className="fas fa-arrow-right text-[9px] group-hover:translate-x-0.5 transition-transform"></i>
                                        </span>
                                        <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] bg-gradient-to-r from-transparent via-[#A3E635]/20 to-transparent transition-transform duration-700 ease-in-out"></div>
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            <div
                id="navbar-collapse"
                className={`fixed inset-0 z-[70] bg-[#0A0A0A] xl:hidden flex flex-col px-4 sm:px-5 pt-16 pb-8 overflow-y-auto transition-all duration-300 ease-out ${
                    isMenuOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'
                }`}
            >
                <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-end px-2 py-4 shadow-md border-b border-[#A3E635]/15 border-gray-100">
                        {showGiftBtn && (
                            <button
                                onClick={() => {
                                    closeMenu();
                                    window.dispatchEvent(new Event('abrirModalInvitado'));
                                }}
                                className="w-8 h-8 flex items-center justify-center rounded-full bg-[#A3E635] text-[#0A0A0A] shadow-sm hover:shadow-md hover:bg-[#84CC16]"
                            >
                                <i className="fas fa-gift"></i>
                            </button>
                        )}
                    </div>
                    {NAV_ITEMS.map((item) => (
                        item.type === 'dropdown' ? (
                            <div key={item.id} className="flex flex-col shadow-md border-b border-[#A3E635]/10 border-gray-50 pb-2">
                                <div className="flex items-center justify-between px-2 py-4 text-[15px] font-semibold text-white">
                                    <span className="flex items-center gap-3">
                                        <i className={`fas ${item.icon} text-[13px] text-[#A3E635] opacity-80`}></i>
                                        <span className="text-[#A3E635]">{item.label}</span>
                                    </span>
                                    <i className="fas fa-chevron-down text-xs text-gray-400"></i>
                                </div>
                                <div className="flex flex-col gap-1 pl-8">
                                    {item.subItems.map((subItem) => (
                                        <button
                                            key={subItem.id}
                                            onClick={() => handleNavItemClick({ type: 'dropdown', target: subItem.target })}
                                            className="flex items-center justify-between px-4 py-3 text-[14px] font-medium text-white/70 hover:bg-[#A3E635]/10 rounded-xl transition-colors"
                                        >
                                            {subItem.label}
                                            <i className="fas fa-arrow-right text-[10px] text-[#A3E635]/50"></i>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <button
                                key={item.id}
                                onClick={() => handleNavItemClick(item)}
                                className="flex items-center justify-between px-2 py-4 text-[15px] font-semibold text-white hover:text-[#A3E635] dark:hover:text-[#A3E635] transition-colors duration-300 group shadow-md border-b border-[#A3E635]/10 border-gray-50"
                            >
                                <span className="flex items-center gap-3">
                                    <i className={`fas ${item.icon} text-[13px] text-gray-400 group-hover:text-[#A3E635] transition-colors`}></i>
                                    {item.label}
                                </span>
                                <i className="fas fa-arrow-right text-xs text-gray-400 group-hover:text-[#A3E635] transition-all -translate-x-1 group-hover:translate-x-0"></i>
                            </button>
                        )
                    ))}
                </div>

                <div className="mx-auto w-full max-w-md mt-6 pt-5 border-t border-white/10 flex flex-col gap-3">
                    {isAuthenticated ? (
                        <div className="rounded-2xl border border-[#A3E635]/15 bg-[#0A0A0A] shadow-sm overflow-hidden">
                            <div className="px-4 py-4 flex items-center gap-3 bg-gradient-to-r from-[#A3E635]/10 via-[#0A0A0A] to-[#A3E635]/10">
                                <span className="w-10 h-10 rounded-full bg-[#A3E635]/10 border border-[#A3E635]/20 text-[#A3E635] flex items-center justify-center text-sm font-black overflow-hidden">
                                    {userAvatar ? (
                                        <img src={userAvatar} alt="Perfil" className="w-full h-full object-cover" />
                                    ) : (
                                        userInitials || 'U'
                                    )}
                                </span>
                                <div>
                                    <p className="text-[11px] uppercase tracking-[0.2em] font-black text-[#A3E635]/70">Sesion activa</p>
                                    <p className="text-[12px] font-extrabold text-white break-all">{displayName}</p>
                                    {user?.nombre && user?.correo && (
                                        <p className="text-[10px] text-white/50 break-all">{user.correo}</p>
                                    )}
                                </div>
                            </div>
                            <div className="border-t border-[#A3E635]/10">
                                <button
                                    onClick={() => {
                                        closeMenu();
                                        handleUserNavigate('/perfil');
                                    }}
                                    className="w-full px-4 py-2 text-left text-xs font-black uppercase text-white hover:bg-[#A3E635]/10 flex items-center gap-3 transition-colors rounded-xl"
                                >
                                    <span className="w-8 h-8 rounded-xl bg-[#A3E635]/10 border border-[#A3E635]/20 text-[#A3E635] flex items-center justify-center shrink-0">
                                        <i className="fas fa-user text-xs"></i>
                                    </span>
                                    Mi perfil
                                </button>
                                <button
                                    onClick={() => {
                                        closeMenu();
                                        handleUserNavigate('/perfil/compras');
                                    }}
                                    className="w-full px-4 py-2 text-left text-xs font-black uppercase text-white hover:bg-[#A3E635]/10 flex items-center justify-center gap-3 transition-colors rounded-xl"
                                >
                                    <span className="w-8 h-8 rounded-xl bg-[#A3E635]/10 border border-[#A3E635]/20 text-[#A3E635] flex items-center justify-center shrink-0">
                                        <i className="fas fa-receipt text-xs"></i>
                                    </span>
                                    Mis Compras
                                </button>
                                <button
                                    onClick={() => {
                                        closeMenu();
                                        handleUserNavigate('/configuracion');
                                    }}
                                    className="w-full px-4 py-2 text-left text-xs font-black uppercase text-white hover:bg-[#A3E635]/10 flex items-center justify-center gap-3 transition-colors rounded-xl"
                                >
                                    <span className="w-8 h-8 rounded-xl bg-[#A3E635]/10 border border-[#A3E635]/20 text-[#A3E635] flex items-center justify-center shrink-0">
                                        <i className="fas fa-gear text-xs"></i>
                                    </span>
                                    Configuración
                                </button>
                                <button
                                    onClick={async () => {
                                        closeMenu();
                                        await handleLogout();
                                    }}
                                    className="w-full px-4 py-3 text-left text-sm font-semibold text-[#A3E635] hover:bg-[#A3E635]/10 flex items-center gap-3 transition-colors"
                                >
                                    <span className="w-8 h-8 rounded-xl bg-[#A3E635]/15 border border-[#A3E635]/30 text-[#A3E635] flex items-center justify-center">
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
                                className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-2xl border border-[#A3E635]/30 text-white font-bold hover:border-[#A3E635]/60 dark:hover:border-[#A3E635]/60 hover:text-[#A3E635] dark:hover:text-[#A3E635] hover:bg-[#A3E635]/10 dark:hover:bg-[#A3E635]/10 transition-all group"
                            >
                                <i className="fas fa-user-lock text-sm group-hover:scale-110 group-hover:-translate-y-1 group-hover:rotate-[8deg] transition-transform"></i>
                                <span className="group-hover:scale-105 transition-transform">Iniciar Sesion</span>
                            </button>

                            <button
                                onClick={() => {
                                    closeMenu();
                                    openModal('registerModal');
                                }}
                                className="w-full py-3 bg-[#A3E635] hover:bg-[#84CC16] text-[#0A0A0A] font-black text-[15px] uppercase tracking-[0.16em] rounded-2xl shadow-xl shadow-[#A3E635]/30 active:scale-95 transition-all relative overflow-hidden group flex items-center justify-center gap-2"
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
