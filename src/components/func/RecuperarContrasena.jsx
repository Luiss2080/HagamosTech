import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import CircuitBackground from '../fondos/FondoSaltenas';
import CircleParticles from '../fondos/ParticulasCirculares';
import Breadcrumb from './MigasPan';
import useAuthStore from '../../store/useAutenticacionStore';

const RecuperarContrasena = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token') || '';

    const restablecerContrasena = useAuthStore((state) => state.restablecerContrasena);

    const [nuevaContrasena, setNuevaContrasena] = useState('');
    const [confirmarContrasena, setConfirmarContrasena] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [exito, setExito] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (nuevaContrasena.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres.');
            return;
        }
        if (nuevaContrasena !== confirmarContrasena) {
            setError('Las contraseñas no coinciden.');
            return;
        }
        if (!token) {
            setError('El enlace de recuperación es inválido o está incompleto.');
            return;
        }
        setIsSubmitting(true);
        try {
            const result = await restablecerContrasena(token, nuevaContrasena);
            if (result.success) {
                setExito(true);
            } else {
                setError(result.message || 'No se pudo restablecer la contraseña.');
            }
        } catch {
            setError('No se pudo restablecer la contraseña. Intente nuevamente.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="relative overflow-hidden min-h-screen bg-white pt-20 font-montserrat">
            <CircuitBackground />
            <CircleParticles colorScheme="light" />

            <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06] pointer-events-none" style={{
                backgroundImage: 'linear-gradient(to right, #a41e22 1px, transparent 1px), linear-gradient(to bottom, #a41e22 1px, transparent 1px)',
                backgroundSize: '24px 24px'
            }}></div>

            {/* Miga de pan + Título + Descripción */}
            <Breadcrumb
                paths={[{ label: 'Iniciar Sesión', url: '/' }, { label: 'Recuperar Contraseña' }]}
                badgeText="Recuperación de Acceso — LOS CASTORES"
                icon="fa-solid fa-key"
                title="Restablece tu"
                highlight="contraseña"
                description="Ingresa tu nueva contraseña para recuperar el acceso a tu cuenta de LOS CASTORES."
            />

            {/* Cuerpo estilo modal de inicio de sesión */}
            <div className="relative z-10 container mx-auto px-6 pb-16">
                <div className="mx-auto w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 overflow-hidden rounded-[2.5rem] bg-white shadow-2xl border border-gray-200 animate-fade-in-up">

                    {/* Panel Izquierdo (Rojo) */}
                    <div className="relative hidden lg:flex flex-col justify-center gap-6 p-8 overflow-hidden bg-[#a41e22]">
                        <div className="absolute inset-0 z-0 pointer-events-none">
                            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#111827]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                            <div className="absolute bottom-0 left-0 w-[420px] h-[420px] bg-black/30 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4"></div>
                        </div>

                        <div className="relative z-10 flex flex-col items-center text-center">
                            <div className="mb-5 inline-flex items-center justify-center rounded-full bg-white/20 p-2.5 shadow-2xl ring-[0.5px] ring-white backdrop-blur-md">
                                <img
                                    src="/img/02_Icons/04_avatar-whatsapp.png"
                                    alt="LOS CASTORES"
                                    loading="lazy"
                                    decoding="async"
                                    className="h-40 w-40 rounded-full object-contain bg-white"
                                />
                            </div>

                            <h2 className="text-3xl font-black text-white leading-tight mb-2 tracking-tight drop-shadow-lg">
                                Recupera el acceso a <br />
                                <span className="text-[#c5a059] relative inline-block">
                                    tu cuenta LOS CASTORES
                                    <svg className="absolute w-full h-2.5 -bottom-1 left-0 z-[-1] text-amber-500/40" viewBox="0 0 200 12" preserveAspectRatio="none" fill="none"><path d="M8,8 C22,5 38,7.5 55,7.5 C130,7.5 165,7.5 188,7.5 C194,7.5 198,6 196,7.5" stroke="currentColor" strokeWidth="7" strokeLinecap="round"  /></svg>
                                </span>
                            </h2>
                            <p className="text-sm text-white/90 font-medium max-w-sm leading-relaxed mb-6 drop-shadow-md">
                                Crea una contraseña nueva y segura para volver a disfrutar de tus cursos, libros digitales y soluciones de software.
                            </p>

                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#111827] border border-[#c5a059]/30 text-[#c5a059] text-[10px] font-black uppercase tracking-widest mb-6 shadow-lg">
                                <span className="w-2 h-2 rounded-full bg-[#c5a059] animate-ping"></span> Soporte LOS CASTORES 24/7
                            </div>

                            <div className="w-full mt-auto pt-4 flex flex-col items-center">
                                <p className="text-[9px] font-black text-white/60 uppercase tracking-[0.2em] mb-2">Conecta con LOS CASTORES</p>
                                <div className="flex justify-center gap-3">
                                    {[
                                        { icon: 'fa-facebook-f', link: 'https://www.facebook.com/LosCastoresSC' },
                                        { icon: 'fa-instagram', link: 'https://www.instagram.com/castoresscz/' },
                                        { icon: 'fa-tiktok', link: 'https://www.tiktok.com/@castores.scz' },
                                        { icon: 'fa-whatsapp', link: 'https://wa.me/59161320004' },
                                    ].map((item, i) => (
                                        <a key={i} href={item.link} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-[#111827] hover:text-[#c5a059] transition-all duration-300 shadow-lg hover:-translate-y-1">
                                            <i className={`fab ${item.icon} text-[13px]`}></i>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Panel Derecho (Formulario) */}
                    <div className="relative flex flex-col justify-center bg-[#FFF6F6] p-6 lg:p-8">
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                            <div className="absolute -top-10 -right-10 w-64 h-64 bg-[#a41e22]/10 rounded-full blur-3xl"></div>
                            <div className="absolute top-1/2 -left-10 w-40 h-40 bg-[#111827]/20 rounded-full blur-2xl"></div>
                            <div className="absolute bottom-0 right-10 w-56 h-56 bg-[#a41e22]/10 rounded-full blur-3xl"></div>
                        </div>

                        <div className="relative z-10 w-full max-w-[520px] mx-auto">
                            <div className="mb-4 text-center bg-white p-4 rounded-2xl shadow-sm border border-gray-200 relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#a41e22] via-[#c5a059] to-[#a41e22]"></div>
                                <div className="inline-flex items-center gap-2 mb-1.5">
                                    <span className="w-8 h-8 rounded-xl bg-red-50 border border-red-200 text-[#a41e22] flex items-center justify-center">
                                        <i className="fas fa-key text-sm"></i>
                                    </span>
                                    <h3 className="text-2xl font-black text-[#111827] tracking-tight">
                                        {exito ? 'Contraseña actualizada' : 'Restablecer Contraseña'}
                                    </h3>
                                </div>
                                <p className="text-xs text-gray-500 font-bold uppercase tracking-wide">
                                    {exito ? 'Tu acceso ha sido restablecido' : 'Crea tu nueva contraseña'}
                                </p>
                            </div>

                            {exito ? (
                                <div className="text-center py-4">
                                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-green-100 text-green-500 flex items-center justify-center text-3xl">
                                        <i className="fas fa-circle-check"></i>
                                    </div>
                                    <h3 className="text-base font-black text-[#111827] uppercase tracking-wider mb-2">¡Listo!</h3>
                                    <p className="text-xs text-gray-500 font-semibold leading-relaxed mb-6">
                                        Tu contraseña fue restablecida correctamente. Ya puedes iniciar sesión con tu nueva contraseña.
                                    </p>
                                    <button
                                        type="button"
                                        onClick={() => navigate('/', { replace: true })}
                                        className="w-full py-3 px-4 bg-[#a41e22] hover:bg-[#86181b] text-white font-black text-xs uppercase tracking-widest rounded-xl shadow-lg shadow-red-500/20 transition-all cursor-pointer border-0"
                                    >
                                        Ir al inicio de sesión
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="flex flex-col gap-3.5" autoComplete="off">
                                    <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                                        <div className="relative group mb-3">
                                            <input
                                                type="password"
                                                value={nuevaContrasena}
                                                onChange={(e) => { setNuevaContrasena(e.target.value); setError(''); }}
                                                className="peer block w-full rounded-xl border-2 border-gray-100 bg-white px-4 pt-5 pb-1.5 pl-12 text-sm font-bold text-[#111827] focus:border-[#a41e22] focus:ring-4 focus:ring-red-500/10 focus:outline-none transition-all duration-300 placeholder-transparent"
                                                placeholder="Nueva contraseña"
                                                required
                                            />
                                            <label className="absolute top-3.5 left-12 z-10 origin-[0] -translate-y-2.5 scale-75 transform text-[9px] text-gray-400 font-black uppercase tracking-widest duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-[10px] peer-placeholder-shown:font-bold peer-focus:-translate-y-2.5 peer-focus:scale-75 peer-focus:text-[#a41e22]">Nueva contraseña</label>
                                            <div className="absolute top-0 bottom-0 left-0 flex items-center justify-center w-12 text-gray-400 peer-focus:text-[#a41e22] transition-colors duration-300"><i className="fas fa-lock text-base"></i></div>
                                        </div>
                                        <div className="relative group">
                                            <input
                                                type="password"
                                                value={confirmarContrasena}
                                                onChange={(e) => { setConfirmarContrasena(e.target.value); setError(''); }}
                                                className="peer block w-full rounded-xl border-2 border-gray-100 bg-white px-4 pt-5 pb-1.5 pl-12 text-sm font-bold text-[#111827] focus:border-[#a41e22] focus:ring-4 focus:ring-red-500/10 focus:outline-none transition-all duration-300 placeholder-transparent"
                                                placeholder="Confirmar contraseña"
                                                required
                                            />
                                            <label className="absolute top-3.5 left-12 z-10 origin-[0] -translate-y-2.5 scale-75 transform text-[9px] text-gray-400 font-black uppercase tracking-widest duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-[10px] peer-placeholder-shown:font-bold peer-focus:-translate-y-2.5 peer-focus:scale-75 peer-focus:text-[#a41e22]">Confirmar contraseña</label>
                                            <div className="absolute top-0 bottom-0 left-0 flex items-center justify-center w-12 text-gray-400 peer-focus:text-[#a41e22] transition-colors duration-300"><i className="fas fa-check-double text-base"></i></div>
                                        </div>
                                    </div>

                                    {error && (
                                        <div className="rounded-xl px-3.5 py-3 border bg-red-50 border-red-200 text-[11px] font-bold text-red-500 flex items-center gap-2">
                                            <i className="fas fa-circle-exclamation"></i>
                                            <span>{error}</span>
                                        </div>
                                    )}

                                    <div className="rounded-2xl border border-gray-200 bg-white p-3.5 shadow-sm">
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full py-3.5 px-6 bg-[#a41e22] text-white font-black text-base uppercase tracking-widest rounded-xl shadow-lg shadow-[#a41e22]/20 hover:shadow-[#a41e22]/40 hover:-translate-y-0.5 hover:bg-[#86181b] transition-all duration-300 flex items-center justify-center gap-3 group active:scale-[0.96] relative overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed"
                                        >
                                            <span className="relative z-10">{isSubmitting ? 'Guardando...' : 'Restablecer contraseña'}</span>
                                            <div className="w-6 h-6 bg-white/10 rounded-full flex items-center justify-center group-hover:translate-x-1 transition-all duration-300 relative z-10"><i className="fas fa-key text-white text-xs"></i></div>
                                        </button>
                                    </div>

                                    <div className="text-center">
                                        <Link to="/" className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wide text-[#a41e22] hover:text-[#7f1d1d]">
                                            <i className="fas fa-arrow-left text-[10px]"></i> Volver al inicio
                                        </Link>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecuperarContrasena;
