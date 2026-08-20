import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CircleParticles from '../fondos/ParticulasCirculares';
import useAuthStore from '../../store/useAutenticacionStore';
import ModalExito from './ModalExito';
import ModalError from './ModalError';

const INITIAL_FORM = {
    nombre: '',
    correo: '',
    telefono: '',
    contrasena: '',
    confirmarContrasena: '',
    acceptTerms: true,
};

const RegistroModal = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const register = useAuthStore((state) => state.register);
    const verificarCorreo = useAuthStore((state) => state.verificarCorreo);
    const reenviarCorreo = useAuthStore((state) => state.reenviarCorreo);
    const [formData, setFormData] = useState(INITIAL_FORM);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [feedback, setFeedback] = useState(null);

    // â”€â”€ Verificación de correo â”€â”€
    const [verificacion, setVerificacion] = useState(null);
    const [codigo, setCodigo] = useState('');
    const [verifSubmitting, setVerifSubmitting] = useState(false);
    const [verifError, setVerifError] = useState('');
    const [reenviando, setReenviando] = useState(false);
    const [segundosReenvio, setSegundosReenvio] = useState(0);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
            setVerificacion(null);
            setCodigo('');
            setVerifError('');
            setSegundosReenvio(0);
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    useEffect(() => {
        if (segundosReenvio <= 0) return;
        const t = setTimeout(() => setSegundosReenvio((s) => s - 1), 1000);
        return () => clearTimeout(t);
    }, [segundosReenvio]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;

        if (!formData.acceptTerms) {
            setFeedback({
                type: 'error',
                title: 'Falta aceptar condiciones',
                message: 'Debes aceptar los terminos antes de crear tu cuenta.',
            });
            return;
        }

        if (formData.contrasena !== formData.confirmarContrasena) {
            setFeedback({
                type: 'error',
                title: 'Contrasenas distintas',
                message: 'Verifica que ambas contrasenas sean iguales.',
            });
            return;
        }

        setIsSubmitting(true);
        try {
            const result = await register({
                nombre: formData.nombre,
                correo: formData.correo,
                contrasena: formData.contrasena,
            });

            if (result?.requiresVerification) {
                setVerificacion({
                    usuarioId: result.usuarioId,
                    nombre: result.nombre,
                    correo: result.correo,
                });
                setCodigo('');
                setVerifError('');
                setSegundosReenvio(60);
                return;
            }

            if (result?.success) {
                setFeedback({
                    type: 'success',
                    title: 'Cuenta creada',
                    message: 'Tu cuenta de LOS CASTORES fue creada correctamente. A continuación puedes activar tu prueba de invitado o explorar.',
                    afterClose: () => {
                        setFormData(INITIAL_FORM);
                        onClose();
                        navigate('/', { replace: true });
                        setTimeout(() => window.dispatchEvent(new Event('abrirModalInvitado')), 300);
                    },
                });
            } else {
                setFeedback({
                    type: 'error',
                    title: 'Error en el registro',
                    message: result?.message || 'No se pudo crear la cuenta.',
                });
            }
        } catch {
            setFeedback({
                type: 'error',
                title: 'Error en el registro',
                message: 'No se pudo crear la cuenta.',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleVerificarCorreo = async (e) => {
        e.preventDefault();
        if (verifSubmitting || !verificacion) return;
        if (!codigo || codigo.length !== 6) {
            setVerifError('Ingresa el código de 6 dígitos recibido por correo.');
            return;
        }
        setVerifSubmitting(true);
        try {
            const result = await verificarCorreo(verificacion.usuarioId, codigo);
            if (result.success) {
                setVerificacion(null);
                setCodigo('');
                setFeedback({
                    type: 'success',
                    title: 'Correo verificado',
                    message: 'Tu cuenta de LOS CASTORES fue creada y verificada correctamente. A continuación puedes activar tu prueba de invitado o explorar.',
                    afterClose: () => {
                        setFormData(INITIAL_FORM);
                        onClose();
                        navigate('/', { replace: true });
                        setTimeout(() => window.dispatchEvent(new Event('abrirModalInvitado')), 300);
                    },
                });
            } else {
                setVerifError(result.message || 'El código de verificación es incorrecto.');
            }
        } catch {
            setVerifError('No se pudo verificar el código. Intente nuevamente.');
        } finally {
            setVerifSubmitting(false);
        }
    };

    const handleReenviarCorreo = async () => {
        if (reenviando || !verificacion || segundosReenvio > 0) return;
        setReenviando(true);
        try {
            const result = await reenviarCorreo(verificacion.usuarioId);
            if (result.success) {
                setVerifError('');
                setSegundosReenvio(60);
            } else {
                setVerifError(result.message || 'No se pudo reenviar el código.');
            }
        } catch {
            setVerifError('No se pudo reenviar el código.');
        } finally {
            setReenviando(false);
        }
    };

    const handleVolverAlFormulario = () => {
        setVerificacion(null);
        setCodigo('');
        setVerifError('');
    };

    const openTerms = () => {
        window.openModal?.('termsModal');
    };

    const handleCloseFeedback = () => {
        const afterClose = feedback?.afterClose;
        setFeedback(null);
        if (afterClose) afterClose();
    };

    if (!isOpen) return null;

    return (
        <>
            <div id="registerModal" className="tyr-modal fixed inset-0 z-[100]" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity duration-300" onClick={onClose}></div>
                <div 
                    className="fixed inset-0 z-[101] overflow-y-auto"
                    onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
                >
                    <div 
                        className="flex min-h-screen items-center justify-center p-4 text-center sm:p-0"
                        onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
                    >
                        <div className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto scrollbar-none transform overflow-hidden rounded-[2.5rem] bg-white text-left shadow-2xl transition-all sm:my-4 animate-modal-pop border border-gray-200">
                            <button
                                onClick={onClose}
                                className="absolute top-6 right-6 z-[200] w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-red-50 dark:hover:bg-red-950/30 text-gray-500 hover:text-red-500 transition-all focus:outline-none cursor-pointer shadow-sm hover:shadow-md border border-gray-200"
                            >
                                <i className="fas fa-times text-xl"></i>
                            </button>

                        <div className="grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
                            <div className="relative hidden lg:flex flex-col justify-center gap-6 p-6 lg:p-8 overflow-hidden bg-gradient-to-br from-[#FF4D00] to-[#D93D00]">
                                <div className="absolute inset-0 z-0 pointer-events-none">
                                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#111827]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                                    <div className="absolute bottom-0 left-0 w-[420px] h-[420px] bg-black/30 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4"></div>
                                    <CircleParticles colorScheme="red" />
                                </div>

                                <div className="relative z-10 flex flex-col items-center text-center">
                                    <div className="mb-5 inline-flex items-center justify-center rounded-full bg-white/20 p-2.5 shadow-2xl ring-[0.5px] ring-white backdrop-blur-md group">
                                        <div className="h-40 w-40 rounded-full bg-white flex items-center justify-center shadow-lg overflow-hidden group-hover:scale-105 group-hover:-translate-y-2 group-hover:rotate-[5deg] transition-all duration-500">
                                            <img src="/img/02_Logos/LogoModal.png" alt="LOS CASTORES" className="h-full w-full object-contain" />
                                        </div>
                                    </div>

                                    <h2 className="text-3xl font-black font-heading text-white leading-tight mb-2 tracking-tight drop-shadow-lg">
                                        Crea tu cuenta en <br />
                                        <span className="text-white relative inline-block">
                                            LOS CASTORES
                                            <svg className="absolute w-full h-2.5 -bottom-1 left-0 z-[-1] text-amber-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.55)]" viewBox="0 0 200 12" preserveAspectRatio="none" fill="none"><path d="M8,8 C22,5 38,7.5 55,7.5 C130,7.5 165,7.5 188,7.5 C194,7.5 198,6 196,7.5" stroke="currentColor" strokeWidth="7" strokeLinecap="round"  /></svg>
                                        </span>
                                    </h2>

                                    <p className="text-sm text-white/90 font-medium max-w-sm leading-relaxed mb-6 drop-shadow-md">
                                        Registra tu perfil para realizar tus pedidos, ver el catálogo y disfrutar de las mejores salteñas.
                                    </p>

                                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 border border-white/30 text-white text-[10px] font-black uppercase tracking-widest mb-6 shadow-lg backdrop-blur-sm">
                                        <span className="w-2 h-2 rounded-full bg-white animate-ping"></span> Registro LOS CASTORES
                                    </div>

                                    <div className="grid grid-cols-2 gap-2 w-full max-w-sm mb-6">
                                        <div className="rounded-xl border border-white/20 bg-black/20 px-3 py-2 text-left backdrop-blur-sm">
                                            <p className="text-[9px] font-black uppercase tracking-widest text-[#FFF5EC]"><i className="fas fa-utensils mr-1"></i> Menú</p>
                                            <p className="text-xs font-bold text-white">Salteñas</p>
                                        </div>
                                        <div className="rounded-xl border border-white/20 bg-black/20 px-3 py-2 text-left backdrop-blur-sm">
                                            <p className="text-[9px] font-black uppercase tracking-widest text-[#FFF5EC]"><i className="fas fa-cake-candles mr-1"></i> Postres</p>
                                            <p className="text-xs font-bold text-white">Caseros y Helados</p>
                                        </div>
                                        <div className="rounded-xl border border-white/20 bg-black/20 px-3 py-2 text-left backdrop-blur-sm">
                                            <p className="text-[9px] font-black uppercase tracking-widest text-[#FFF5EC]"><i className="fas fa-mug-hot mr-1"></i> Bebidas</p>
                                            <p className="text-xs font-bold text-white">Gaseosas y Jugos</p>
                                        </div>
                                        <div className="rounded-xl border border-white/20 bg-black/20 px-3 py-2 text-left backdrop-blur-sm">
                                            <p className="text-[9px] font-black uppercase tracking-widest text-[#FFF5EC]"><i className="fas fa-martini-glass-citrus mr-1"></i> Refrescos</p>
                                            <p className="text-xs font-bold text-white">Naturales y Cafés</p>
                                        </div>
                                    </div>
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
                                            <a key={i} href={item.link} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-[#111827] hover:text-[#5D3A1F] transition-all duration-300 shadow-lg hover:-translate-y-1">
                                                <i className={`fab ${item.icon} text-[13px]`}></i>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="relative flex flex-col justify-center h-full bg-[#FFF6F6] p-5 lg:p-6">
                                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                                    <div className="absolute -top-10 -right-10 w-64 h-64 bg-[#FF4D00]/10 rounded-full blur-3xl"></div>
                                    <div className="absolute top-1/2 -left-10 w-40 h-40 bg-[#111827]/20 rounded-full blur-2xl"></div>
                                    <div className="absolute bottom-0 right-10 w-56 h-56 bg-[#FF4D00]/10 rounded-full blur-3xl"></div>
                                    <CircleParticles colorScheme="light" />
                                </div>
 
                                <div className="relative z-10 w-full max-w-[540px] mx-auto">
                                    <div className="mb-3.5 text-center bg-white p-4 rounded-2xl shadow-sm border border-gray-200 relative overflow-hidden">
                                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FF4D00] via-[#5D3A1F] to-[#FF4D00]"></div>
                                        <div className="inline-flex items-center gap-2 mb-1.5">
                                            <span className="w-8 h-8 rounded-xl bg-red-50 border border-red-200 text-[#FF4D00] flex items-center justify-center">
                                                <i className="fas fa-user-plus text-sm"></i>
                                            </span>
                                            <h3 className="text-2xl font-black font-heading text-[#111827] tracking-tight">Crear Cuenta</h3>
                                        </div>
                                        <p className="text-xs text-gray-500 font-bold uppercase tracking-wide">Registra tu perfil de compra</p>
                                    </div>

                                    {verificacion ? (
                                    <form onSubmit={handleVerificarCorreo} className="flex flex-col gap-3.5" autoComplete="off">
                                        <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                                            <div className="mb-3 flex items-center gap-2">
                                                <span className="w-7 h-7 rounded-lg bg-red-50 border border-red-200 text-[#FF4D00] flex items-center justify-center">
                                                    <i className="fas fa-envelope-circle-check text-[11px]"></i>
                                                </span>
                                                <div>
                                                    <p className="text-[11px] font-black uppercase tracking-widest text-gray-500">Verificación de correo</p>
                                                    <p className="text-[10px] font-bold text-gray-400 truncate">{verificacion.correo}</p>
                                                </div>
                                            </div>

                                            <p className="text-[12px] text-gray-600 font-medium leading-relaxed mb-3">
                                                {verificacion.nombre ? `${verificacion.nombre}, ` : ''}te enviamos un código de 6 dígitos a <strong className="text-[#FF4D00]">{verificacion.correo}</strong>. Ingresa el código para verificar tu correo.
                                            </p>

                                            <div className="mb-2">
                                                <input
                                                    type="text"
                                                    inputMode="numeric"
                                                    autoComplete="one-time-code"
                                                    maxLength="6"
                                                    value={codigo}
                                                    onChange={(e) => { setCodigo(e.target.value.replace(/\D/g, '')); setVerifError(''); }}
                                                    className="peer block w-full rounded-xl border-2 border-gray-100 bg-white px-4 py-3 text-center text-2xl font-black tracking-[0.5em] text-[#111827] focus:border-[#FF4D00] focus:ring-4 focus:ring-red-500/10 focus:outline-none transition-all duration-300"
                                                    placeholder="______"
                                                    required
                                                />
                                            </div>
                                            {verifError && (
                                                <p className="text-[11px] font-bold text-red-500"><i className="fas fa-circle-exclamation mr-1"></i>{verifError}</p>
                                            )}
                                        </div>

                                        <div className="rounded-2xl border border-gray-200 bg-white p-3.5 shadow-sm">
                                            <button type="submit" disabled={verifSubmitting} className="w-full py-3.5 px-6 bg-[#FF4D00] text-white font-black text-base uppercase tracking-widest rounded-xl shadow-lg shadow-[#FF4D00]/20 hover:shadow-[#FF4D00]/40 hover:-translate-y-0.5 hover:bg-[#E64500] transition-all duration-300 flex items-center justify-center gap-3 group active:scale-[0.96] relative overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed">
                                                <span className="relative z-10">{verifSubmitting ? 'Verificando...' : 'Verificar mi correo'}</span>
                                                <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center group-hover:translate-x-1 transition-all duration-300 relative z-10"><i className="fas fa-shield-halved text-white text-xs"></i></div>
                                            </button>
                                            <button
                                                type="button"
                                                onClick={handleReenviarCorreo}
                                                disabled={reenviando || segundosReenvio > 0}
                                                className="w-full mt-2 py-2.5 px-6 bg-[#8B4513] text-white font-black text-xs uppercase tracking-widest rounded-xl shadow-lg shadow-[#8B4513]/20 hover:shadow-[#8B4513]/40 hover:-translate-y-0.5 hover:bg-[#5D3A1F] transition-all duration-300 cursor-pointer disabled:opacity-50"
                                            >
                                                <i className="fas fa-paper-plane mr-1.5"></i>
                                                {reenviando ? 'Enviando...' : segundosReenvio > 0 ? `Reenviar código (${segundosReenvio}s)` : 'Reenviar código'}
                                            </button>
                                            <button
                                                type="button"
                                                onClick={handleVolverAlFormulario}
                                                className="w-full mt-2 py-2.5 px-6 bg-[#FF4D00] text-white font-black text-xs uppercase tracking-widest rounded-xl shadow-lg shadow-[#FF4D00]/20 hover:shadow-[#FF4D00]/40 hover:-translate-y-0.5 hover:bg-[#E64500] transition-all duration-300 cursor-pointer"
                                            >
                                                <i className="fas fa-arrow-left mr-1.5"></i> Volver al formulario
                                            </button>
                                        </div>
                                    </form>
                                    ) : (
                                    <form onSubmit={handleSubmit} className="flex flex-col gap-3.5" autoComplete="off">
                                        <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                                            <div className="mb-3 flex items-center gap-2">
                                                <span className="w-7 h-7 rounded-lg bg-red-50 border border-red-200 text-[#FF4D00] flex items-center justify-center">
                                                    <i className="fas fa-id-card text-[11px]"></i>
                                                </span>
                                                <p className="text-[11px] font-black uppercase tracking-widest text-gray-500">Datos de registro</p>
                                            </div>
 
                                            <div className="relative group mb-3">
                                                <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} className="peer block w-full rounded-xl border-2 border-gray-100 bg-white px-4 pt-5 pb-1.5 pl-12 text-sm font-bold text-[#111827] focus:border-[#FF4D00] focus:ring-4 focus:ring-red-500/10 focus:outline-none transition-all duration-300 placeholder-transparent" placeholder="Nombre" required />
                                                <label className="absolute top-3.5 left-12 z-10 origin-[0] -translate-y-2.5 scale-75 transform text-[9px] text-gray-400 font-black uppercase tracking-widest duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-[10px] peer-placeholder-shown:font-bold peer-focus:-translate-y-2.5 peer-focus:scale-75 peer-focus:text-[#FF4D00]">Nombre completo</label>
                                                <div className="absolute top-0 bottom-0 left-0 flex items-center justify-center w-12 text-gray-400 peer-focus:text-[#FF4D00] transition-colors duration-300"><i className="fas fa-user text-base"></i></div>
                                            </div>
 
                                            <div className="relative group mb-3">
                                                <input type="email" name="correo" value={formData.correo} onChange={handleChange} className="peer block w-full rounded-xl border-2 border-gray-100 bg-white px-4 pt-5 pb-1.5 pl-12 text-sm font-bold text-[#111827] focus:border-[#FF4D00] focus:ring-4 focus:ring-red-500/10 focus:outline-none transition-all duration-300 placeholder-transparent" placeholder="Correo" required />
                                                <label className="absolute top-3.5 left-12 z-10 origin-[0] -translate-y-2.5 scale-75 transform text-[9px] text-gray-400 font-black uppercase tracking-widest duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-[10px] peer-placeholder-shown:font-bold peer-focus:-translate-y-2.5 peer-focus:scale-75 peer-focus:text-[#FF4D00]">Correo electrónico</label>
                                                <div className="absolute top-0 bottom-0 left-0 flex items-center justify-center w-12 text-gray-400 peer-focus:text-[#FF4D00] transition-colors duration-300"><i className="fas fa-envelope text-base"></i></div>
                                            </div>
 
                                            <div className="relative group mb-3">
                                                <input type="tel" name="telefono" value={formData.telefono} onChange={handleChange} className="peer block w-full rounded-xl border-2 border-gray-100 bg-white px-4 pt-5 pb-1.5 pl-12 text-sm font-bold text-[#111827] focus:border-[#FF4D00] focus:ring-4 focus:ring-red-500/10 focus:outline-none transition-all duration-300 placeholder-transparent" placeholder="Telefono" required />
                                                <label className="absolute top-3.5 left-12 z-10 origin-[0] -translate-y-2.5 scale-75 transform text-[9px] text-gray-400 font-black uppercase tracking-widest duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-[10px] peer-placeholder-shown:font-bold peer-focus:-translate-y-2.5 peer-focus:scale-75 peer-focus:text-[#FF4D00]">Teléfono</label>
                                                <div className="absolute top-0 bottom-0 left-0 flex items-center justify-center w-12 text-gray-400 peer-focus:text-[#FF4D00] transition-colors duration-300"><i className="fas fa-phone text-base"></i></div>
                                            </div>
 
                                            <div className="relative group mb-3">
                                                <input type="password" name="contrasena" value={formData.contrasena} onChange={handleChange} className="peer block w-full rounded-xl border-2 border-gray-100 bg-white px-4 pt-5 pb-1.5 pl-12 text-sm font-bold text-[#111827] focus:border-[#FF4D00] focus:ring-4 focus:ring-red-500/10 focus:outline-none transition-all duration-300 placeholder-transparent" placeholder="Password" required />
                                                <label className="absolute top-3.5 left-12 z-10 origin-[0] -translate-y-2.5 scale-75 transform text-[9px] text-gray-400 font-black uppercase tracking-widest duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-[10px] peer-placeholder-shown:font-bold peer-focus:-translate-y-2.5 peer-focus:scale-75 peer-focus:text-[#FF4D00]">Contraseña</label>
                                                <div className="absolute top-0 bottom-0 left-0 flex items-center justify-center w-12 text-gray-400 peer-focus:text-[#FF4D00] transition-colors duration-300"><i className="fas fa-lock text-base"></i></div>
                                            </div>
 
                                            <div className="relative group">
                                                <input type="password" name="confirmarContrasena" value={formData.confirmarContrasena} onChange={handleChange} className="peer block w-full rounded-xl border-2 border-gray-100 bg-white px-4 pt-5 pb-1.5 pl-12 text-sm font-bold text-[#111827] focus:border-[#FF4D00] focus:ring-4 focus:ring-red-500/10 focus:outline-none transition-all duration-300 placeholder-transparent" placeholder="Confirmar password" required />
                                                <label className="absolute top-3.5 left-12 z-10 origin-[0] -translate-y-2.5 scale-75 transform text-[9px] text-gray-400 font-black uppercase tracking-widest duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-[10px] peer-placeholder-shown:font-bold peer-focus:-translate-y-2.5 peer-focus:scale-75 peer-focus:text-[#FF4D00]">Confirmar contraseña</label>
                                                <div className="absolute top-0 bottom-0 left-0 flex items-center justify-center w-12 text-gray-400 peer-focus:text-[#FF4D00] transition-colors duration-300"><i className="fas fa-check-double text-base"></i></div>
                                            </div>
                                        </div>

                                        <div className="rounded-2xl border border-gray-200 bg-white p-3.5 shadow-sm">
                                            <div className="flex items-center justify-between gap-4 flex-wrap">
                                                <label className="inline-flex items-center gap-2 text-[11px] font-semibold text-gray-600 cursor-pointer select-none">
                                                    <i className="fas fa-shield-halved text-[#FF4D00] text-[11px]"></i>
                                                    <input
                                                        type="checkbox"
                                                        name="acceptTerms"
                                                        checked={formData.acceptTerms}
                                                        onChange={handleChange}
                                                        className="w-4 h-4 rounded border-gray-300 accent-[#FF4D00]"
                                                    />
                                                    Acepto los términos y condiciones
                                                </label>
                                                <button
                                                    type="button"
                                                    onClick={openTerms}
                                                    className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wide text-[#FF4D00] hover:text-[#7f1d1d]"
                                                >
                                                    <i className="fas fa-file-contract text-[10px]"></i>
                                                    Ver términos
                                                </button>
                                            </div>
                                        </div>

                                        <div className="rounded-2xl border border-gray-200 bg-white p-3.5 shadow-sm">
                                            <button type="submit" disabled={isSubmitting} className="w-full py-3.5 px-6 bg-[#8B4513] text-white font-black text-base uppercase tracking-widest rounded-xl shadow-lg shadow-[#8B4513]/20 hover:shadow-[#8B4513]/40 hover:-translate-y-0.5 hover:bg-[#5D3A1F] transition-all duration-300 flex items-center justify-center gap-3 group active:scale-[0.96] relative overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed">
                                                <span className="relative z-10">{isSubmitting ? 'Creando cuenta...' : 'Crear cuenta ahora'}</span>
                                                <div className="w-6 h-6 bg-white/10 rounded-full flex items-center justify-center group-hover:translate-x-1 transition-all duration-300 relative z-10"><i className="fas fa-user-plus text-white text-xs"></i></div>
                                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                                            </button>
                                        </div>

                                    </form>
                                    )}

                                    <div className="mt-3.5 rounded-xl border border-gray-200 bg-white px-3.5 py-3 text-[11px] text-gray-500 font-semibold leading-relaxed text-center">
                                        <div className="flex items-center justify-center gap-2">
                                            <i className="fas fa-lightbulb text-[#FF4D00] flex-shrink-0"></i>
                                            <span>Si tienes dudas, contacta al soporte LOS CASTORES en WhatsApp al +591 61320004.</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            <ModalExito
                isOpen={feedback?.type === 'success'}
                onClose={handleCloseFeedback}
                title={feedback?.title}
                message={feedback?.message}
                buttonText="Aceptar"
            />
            <ModalError
                isOpen={feedback?.type === 'error'}
                onClose={handleCloseFeedback}
                title={feedback?.title}
                message={feedback?.message}
                buttonText="Entendido"
            />
        </>
    );
};

export default RegistroModal;
