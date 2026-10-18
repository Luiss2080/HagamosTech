import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import CircuitBackground from '../../../components/fondos/FondoTech';
import useAuthStore from '../../../store/useAutenticacionStore';

const ENLACES_CUENTA = [
    { path: '/perfil', label: 'Mi perfil', detail: 'Datos personales', icon: 'fa-user' },
    { path: '/configuracion', label: 'Configuración', detail: 'Seguridad y cuenta', icon: 'fa-gear' },
];

const BarraLateralPerfil = () => {
    const { pathname } = useLocation();
    const user = useAuthStore((state) => state.user);
    const nombre = [user?.nombre, user?.apellido].filter(Boolean).join(' ');
    const iniciales = nombre.split(/\s+/).filter(Boolean).map((parte) => parte[0]).join('').slice(0, 2).toUpperCase();

    return (
        <aside className="relative hidden h-full w-full flex-col overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#0A0A0A] via-[#111827] to-[#0A0A0A] p-6 shadow-xl lg:flex" aria-label="Navegación de cuenta">
            <div className="pointer-events-none absolute inset-0 opacity-60"><CircuitBackground /></div>
            <div className="relative z-10 flex flex-col items-center gap-5">
                <div className="w-full border-b border-white/10 pb-4 text-left">
                    <p className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-white">
                        <i className="fas fa-microchip text-[#A3E635]" aria-hidden="true"></i> HagamosTech
                    </p>
                    <p className="mt-1 text-[9px] font-bold uppercase tracking-widest text-white/50">Cuenta personal</p>
                </div>

                <div className="flex w-full flex-col items-center gap-2 text-center">
                    <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border-2 border-white/20 bg-white text-xl font-black text-[#0A0A0A]">
                        {user?.fotoPerfil ? <img src={user.fotoPerfil} alt="" className="h-full w-full object-cover" /> : (iniciales || <i className="fas fa-user" aria-hidden="true"></i>)}
                    </div>
                    <h2 className="max-w-full truncate text-sm font-black text-white">{nombre || 'Mi cuenta'}</h2>
                    {user?.correo && <p className="max-w-full truncate text-[10px] font-bold text-white/60">{user.correo}</p>}
                </div>

                <nav className="flex w-full flex-col gap-2 border-t border-white/10 pt-4">
                    {ENLACES_CUENTA.map((enlace) => {
                        const activo = pathname === enlace.path;
                        return (
                            <Link
                                key={enlace.path}
                                to={enlace.path}
                                aria-current={activo ? 'page' : undefined}
                                className={`flex items-center gap-3 rounded-xl border px-3 py-3 transition-colors ${activo ? 'border-[#A3E635] bg-white text-[#111827]' : 'border-white/10 bg-white/5 text-white hover:bg-white/10'}`}
                            >
                                <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${activo ? 'bg-[#A3E635]/20 text-[#365314]' : 'bg-white/10 text-[#A3E635]'}`}>
                                    <i className={`fas ${enlace.icon}`} aria-hidden="true"></i>
                                </span>
                                <span className="min-w-0 text-left">
                                    <span className="block text-xs font-black">{enlace.label}</span>
                                    <span className={`mt-0.5 block text-[9px] font-bold ${activo ? 'text-slate-500' : 'text-white/50'}`}>{enlace.detail}</span>
                                </span>
                            </Link>
                        );
                    })}
                </nav>
            </div>
        </aside>
    );
};

export default BarraLateralPerfil;
