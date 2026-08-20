import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import CircleParticles from '../fondos/ParticulasCirculares';
import useAuthStore from '../../store/useAutenticacionStore';
import ModalExito from './ModalExito';
import ModalError from './ModalError';

const INITIAL_FORM = {
    correo: 'admin@loscatores.com',
    contrasena: 'password123',
    rememberMe: true,
};

const InicioSesionModal = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const login = useAuthStore((state) => state.login);
    const verificar2fa = useAuthStore((state) => state.verificar2fa);
    const regenerarQR2FA = useAuthStore((state) => state.regenerarQR2FA);
    const [formData, setFormData] = useState(INITIAL_FORM);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [feedback, setFeedback] = useState(null);

    // Ã¢â€â‚¬Ã¢â€â‚¬ Doble Factor (Google Authenticator) Ã¢â€â‚¬Ã¢â€â‚¬
    const [paso2FA, setPaso2FA] = useState(null);
    const [codigo2FA, setCodigo2FA] = useState('');
    const [faSubmitting, setFaSubmitting] = useState(false);
    const [qrRegenerating, setQrRegenerating] = useState(false);
    const [faError, setFaError] = useState('');

    // Ã¢â€â‚¬Ã¢â€â‚¬ Recuperación de contraseña Ã¢â€â‚¬Ã¢â€â‚¬
    const solicitarRecuperacion = useAuthStore((state) => state.solicitarRecuperacion);
    const [mostrarRecuperacion, setMostrarRecuperacion] = useState(false);
    const [correoRecuperacion, setCorreoRecuperacion] = useState('');
    const [recuperacionSubmitting, setRecuperacionSubmitting] = useState(false);
    const [recuperacionError, setRecuperacionError] = useState('');

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
            setPaso2FA(null);
            setCodigo2FA('');
            setFaError('');
            setQrRegenerating(false);
            setMostrarRecuperacion(false);
            setCorreoRecuperacion('');
            setRecuperacionError('');
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

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

        setIsSubmitting(true);
        try {
            const result = await login({
                correo: formData.correo,
                contrasena: formData.contrasena,
            });

            if (result?.requires2fa) {
                setPaso2FA({
                    usuarioId: result.usuarioId,
                    primerUso: !!result.primerUso,
                    nombre: result.nombre,
                    secret: result.secret,
                    otpauthUrl: result.otpauthUrl,
                });
                setCodigo2FA('');
                setFaError('');
                return;
            }

            if (result?.success) {
                setFeedback({
                    type: 'success',
                    title: 'Inicio de sesion exitoso',
                    message: 'Bienvenido a LOS CASTORES.',
                    afterClose: () => {
                        setFormData(INITIAL_FORM);
                        onClose();
                        navigate('/', { replace: true });
                    },
                });
            } else {
                setFeedback({
                    type: 'error',
                    title: 'Error',
                    message: result?.message || 'No se pudo iniciar sesion.',
                });
            }
                } catch {
            setFeedback({
                type: 'error',
                title: 'Error',
                message: 'No se pudo iniciar sesion.',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSubmit2FA = async (e) => {
        e.preventDefault();
        if (faSubmitting || !paso2FA) return;
        if (!codigo2FA || codigo2FA.length !== 6) {
            setFaError('Ingresa el código de 6 dÃƒÂ­gitos de tu autenticador.');
            return;
        }
        setFaSubmitting(true);
        try {
            const result = await verificar2fa(paso2FA.usuarioId, codigo2FA);
            if (result.success) {
                setPaso2FA(null);
                setCodigo2FA('');
                setFaError('');
                setFeedback({
                    type: 'success',
                    title: 'Inicio de sesión exitoso',
                    message: 'Bienvenido a LOS CASTORES.',
                    afterClose: () => {
                        setFormData(INITIAL_FORM);
                        onClose();
                        navigate('/', { replace: true });
                    },
                });
            } else {
                setFaError(result.message || 'El código de autenticación es incorrecto.');
            }
        } catch {
            setFaError('No se pudo verificar el código. Intente nuevamente.');
        } finally {
            setFaSubmitting(false);
        }
    };

    const handleBackToCredentials = () => {
        setPaso2FA(null);
        setCodigo2FA('');
        setFaError('');
    };

const handleRegenerateQR = async () => {
        if (qrRegenerating || !paso2FA) return;
        setQrRegenerating(true);
        setFaError('');
        try {
            const result = await regenerarQR2FA(paso2FA.usuarioId, {
                correo: formData.correo,
                contrasena: formData.contrasena,
            });
            if (result.success) {
                setPaso2FA((prev) => ({ ...prev, primerUso: true, secret: result.secret, otpauthUrl: result.otpauthUrl }));
                setCodigo2FA('');
            } else {
                setFaError(result.message);
            }
        } finally {
            setQrRegenerating(false);
        }
    };

    const handleForgotPassword = () => {
        setMostrarRecuperacion(true);
        setCorreoRecuperacion(formData.correo || '');
        setRecuperacionError('');
    };

    const handleEnviarRecuperacion = async (e) => {
        e.preventDefault();
        if (recuperacionSubmitting) return;
        if (!correoRecuperacion || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(correoRecuperacion)) {
            setRecuperacionError('Ingresa un correo electrónico vÃƒÂ¡lido.');
            return;
        }
        setRecuperacionSubmitting(true);
        try {
            const result = await solicitarRecuperacion(correoRecuperacion);
            if (result.success) {
                setMostrarRecuperacion(false);
                setFeedback({
                    type: 'success',
                    title: 'Revisa tu correo',
                    message: result.mensaje || 'Te enviamos un enlace para restablecer tu contraseña. Revisa tu bandeja de entrada.',
                    afterClose: () => setFormData(INITIAL_FORM),
                });
            } else {
                setRecuperacionError(result.message || 'No se pudo enviar el enlace de recuperación.');
            }
        } catch {
            setRecuperacionError('No se pudo enviar el enlace de recuperación.');
        } finally {
            setRecuperacionSubmitting(false);
        }
    };

    const handleCloseFeedback = () => {
        const afterClose = feedback?.afterClose;
        setFeedback(null);
        if (afterClose) afterClose();
    };

    if (!isOpen) return null;

    return (
        <>
            <div id="loginModal" className="tyr-modal fixed inset-0 z-[100]" aria-labelledby="modal-title" role="dialog" aria-modal="true">
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
                        <div className="mb-5 inline-flex items-center justify-center rounded-full bg-white/20 p-2.5 shadow-2xl ring-[0.5px] ring-white backdrop-blur-md">
                            <img
                                src="/img/02_Logos/LogoModal.png"
                                alt="LOS CASTORES"
                                loading="lazy"
                                decoding="async"
                                className="h-40 w-40 rounded-full object-contain bg-white transition-transform duration-500 hover:scale-105 hover:-translate-y-2 hover:rotate-[5deg]"
                            />
                        </div>

                        <h2 className="text-3xl font-black font-heading text-white leading-tight mb-2 tracking-tight drop-shadow-lg">
                            Iniciar Sesión en <br />
                            <span className="text-white relative inline-block">
                                LOS CASTORES
                                <svg className="absolute w-full h-2.5 -bottom-1 left-0 z-[-1] text-amber-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.55)]" viewBox="0 0 200 12" preserveAspectRatio="none" fill="none"><path d="M8,8 C22,5 38,7.5 55,7.5 C130,7.5 165,7.5 188,7.5 C194,7.5 198,6 196,7.5" stroke="currentColor" strokeWidth="7" strokeLinecap="round"  /></svg>
                            </span>
                        </h2>
                        <p className="text-sm text-white/90 font-medium max-w-sm leading-relaxed mb-6 drop-shadow-md">
                            Ingresa a tu cuenta de LOS CASTORES para realizar tus pedidos, ver el catálogo y disfrutar de las mejores salteñas.
                        </p>

                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 border border-white/30 text-white text-[10px] font-black uppercase tracking-widest mb-6 shadow-lg backdrop-blur-sm">
                            <span className="w-2 h-2 rounded-full bg-white animate-ping"></span> Pedidos LOS CASTORES
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
                                    <i className="fas fa-user-shield text-sm"></i>
                                </span>
                                <h3 className="text-2xl font-black font-heading text-[#111827] tracking-tight">Iniciar Sesión</h3>
                            </div>
                            <p className="text-xs text-gray-500 font-bold uppercase tracking-wide">Accede a tu panel LOS CASTORES</p>
                        </div>
 
                        {(!paso2FA?.primerUso) && !mostrarRecuperacion && (
                        <div className="mb-3.5 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                            <div className="rounded-xl bg-white border border-gray-200 px-3 py-2.5 text-center shadow-sm">
                                <div className="w-7 h-7 mx-auto mb-1 rounded-lg bg-red-50 border border-red-200 text-[#FF4D00] flex items-center justify-center">
                                    <i className="fas fa-box-open text-[11px]"></i>
                                </div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Modulo</p>
                                <p className="text-[13px] font-extrabold text-[#111827]">Catalogo</p>
                            </div>
                            <div className="rounded-xl bg-white border border-gray-200 px-3 py-2.5 text-center shadow-sm">
                                <div className="w-7 h-7 mx-auto mb-1 rounded-lg bg-red-50 border border-red-200 text-[#FF4D00] flex items-center justify-center">
                                    <i className="fas fa-receipt text-[11px]"></i>
                                </div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Modulo</p>
                                <p className="text-[13px] font-extrabold text-[#111827]">Pedidos</p>
                            </div>
                            <div className="rounded-xl bg-white border border-[#5D3A1F]/40 px-3 py-2.5 text-center shadow-sm">
                                <div className="w-7 h-7 mx-auto mb-1 rounded-lg bg-gray-100 border border-gray-300 text-gray-600 flex items-center justify-center">
                                    <i className="fas fa-signal text-[11px]"></i>
                                </div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Estado</p>
                                <p className="text-[13px] font-extrabold text-[#111827]">Activo</p>
                            </div>
                        </div>
                        )}

                        {paso2FA ? (
                        <form onSubmit={handleSubmit2FA} className="flex flex-col gap-3.5" autoComplete="off">
                            <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                                <div className="mb-3 flex items-center gap-2">
                                    <span className="w-7 h-7 rounded-lg bg-red-50 border border-red-200 text-[#FF4D00] flex items-center justify-center">
                                        <i className="fas fa-shield-halved text-[11px]"></i>
                                    </span>
                                    <div>
                                        <p className="text-[11px] font-black uppercase tracking-widest text-gray-500">Verificación en dos pasos</p>
                                        <p className="text-[10px] font-bold text-gray-400">{paso2FA.nombre}</p>
                                    </div>
                                </div>

                                 {paso2FA.primerUso && (
                                    <div className="mb-3 text-center rounded-xl border border-gray-100 bg-gray-50 p-4">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">
                                            Escanea este código con Google Authenticator
                                        </p>
                                         <div className="mx-auto w-44 h-44 bg-white p-2.5 rounded-2xl flex items-center justify-center mb-3 shadow-md">
                                             <QRCodeSVG value={paso2FA.otpauthUrl} size={150} />
                                         </div>
                                         <button
                                             type="button"
                                             onClick={handleRegenerateQR}
                                             disabled={qrRegenerating || faSubmitting}
                                             className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#8B4513] px-3 py-2 text-[10px] font-black uppercase tracking-wide text-white shadow-md shadow-[#8B4513]/20 transition-all hover:bg-[#5D3A1F] hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                                         >
                                             <i className={`fas fa-rotate-right ${qrRegenerating ? 'animate-spin' : ''}`}></i>
                                             {qrRegenerating ? 'Generando...' : 'Generar QR nuevamente'}
                                         </button>
                                         <p className="text-[9px] text-gray-400 font-bold break-all">Secret: {paso2FA.secret}</p>
                                     </div>
                                 )}

                                 {!paso2FA.primerUso && (
                                     <button
                                         type="button"
                                         onClick={handleRegenerateQR}
                                         disabled={qrRegenerating || faSubmitting}
                                         className="mb-3 inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-[#8B4513] px-3 py-2.5 text-[10px] font-black uppercase tracking-wide text-[#8B4513] transition-all hover:bg-[#8B4513] hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
                                     >
                                         <i className={`fas fa-qrcode ${qrRegenerating ? 'animate-pulse' : ''}`}></i>
                                         {qrRegenerating ? 'Generando QR...' : 'Volver a generar QR de autenticación'}
                                     </button>
                                 )}

                                 <div className="mb-2">
                                    <input
                                        type="text"
                                        inputMode="numeric"
                                        autoComplete="one-time-code"
                                        maxLength="6"
                                        value={codigo2FA}
                                        onChange={(e) => { setCodigo2FA(e.target.value.replace(/\D/g, '')); setFaError(''); }}
                                        className="peer block w-full rounded-xl border-2 border-gray-100 bg-white px-4 py-3 text-center text-2xl font-black tracking-[0.5em] text-[#111827] focus:border-[#FF4D00] focus:ring-4 focus:ring-red-500/10 focus:outline-none transition-all duration-300"
                                        placeholder="______"
                                        required
                                    />
                                </div>
                                {faError && (
                                    <p className="text-[11px] font-bold text-red-500"><i className="fas fa-circle-exclamation mr-1"></i>{faError}</p>
                                )}
                            </div>

                            <div className="rounded-2xl border border-gray-200 bg-white p-3.5 shadow-sm">
                                 <button type="submit" disabled={faSubmitting} className="w-full py-3.5 px-6 bg-[#FF4D00] text-white font-black text-base uppercase tracking-widest rounded-xl shadow-lg shadow-[#FF4D00]/20 hover:shadow-[#FF4D00]/40 hover:-translate-y-0.5 hover:bg-[#D93D00] transition-all duration-300 flex items-center justify-center gap-3 group active:scale-[0.96] relative overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed">
                                    <span className="relative z-10">{faSubmitting ? 'Verificando...' : 'Verificar código'}</span>
                                    <div className="w-6 h-6 bg-white/10 rounded-full flex items-center justify-center group-hover:translate-x-1 transition-all duration-300 relative z-10"><i className="fas fa-shield-halved text-white text-xs"></i></div>
                                </button>
                                <button
                                    type="button"
                                    onClick={handleBackToCredentials}
                                    disabled={faSubmitting}
                                    className="w-full mt-2 py-2.5 px-6 bg-[#8B4513] text-white font-black text-xs uppercase tracking-widest rounded-xl shadow-lg shadow-[#8B4513]/20 hover:shadow-[#8B4513]/40 hover:-translate-y-0.5 hover:bg-[#5D3A1F] transition-all duration-300 cursor-pointer disabled:opacity-50"
                                >
                                    <i className="fas fa-arrow-left mr-1.5"></i> Volver a las credenciales
                                </button>
                            </div>
                                    </form>
                                    ) : mostrarRecuperacion ? (
                                    <form onSubmit={handleEnviarRecuperacion} className="flex flex-col gap-3.5" autoComplete="off">
                                        <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                                            <div className="mb-3 flex items-center gap-2">
                                                <span className="w-7 h-7 rounded-lg bg-red-50 border border-red-200 text-[#FF4D00] flex items-center justify-center">
                                                    <i className="fas fa-key text-[11px]"></i>
                                                </span>
                                                <div>
                                                    <p className="text-[11px] font-black uppercase tracking-widest text-gray-500">Recuperar contraseña</p>
                                                </div>
                                            </div>
                                            <p className="text-[12px] text-gray-600 font-medium leading-relaxed mb-3">
                                                Escribe el correo de tu cuenta y te enviaremos un enlace para restablecer tu contraseña.
                                            </p>
                                            <div className="relative group mb-2">
                                                <input type="email" value={correoRecuperacion} onChange={(e) => { setCorreoRecuperacion(e.target.value); setRecuperacionError(''); }} className="peer block w-full rounded-xl border-2 border-gray-100 bg-white px-4 pt-5 pb-1.5 pl-12 text-sm font-bold text-[#111827] focus:border-[#FF4D00] focus:ring-4 focus:ring-red-500/10 focus:outline-none transition-all duration-300 placeholder-transparent" placeholder="Correo" required />
                                                <label className="absolute top-3.5 left-12 z-10 origin-[0] -translate-y-2.5 scale-75 transform text-[9px] text-gray-400 font-black uppercase tracking-widest duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-[10px] peer-placeholder-shown:font-bold peer-focus:-translate-y-2.5 peer-focus:scale-75 peer-focus:text-[#FF4D00]">Correo electrónico</label>
                                                <div className="absolute top-0 bottom-0 left-0 flex items-center justify-center w-12 text-gray-400 peer-focus:text-[#FF4D00] transition-colors duration-300"><i className="fas fa-envelope text-base"></i></div>
                                            </div>
                                            {recuperacionError && (
                                                <p className="text-[11px] font-bold text-red-500"><i className="fas fa-circle-exclamation mr-1"></i>{recuperacionError}</p>
                                            )}
                                        </div>
                                        <div className="rounded-2xl border border-gray-200 bg-white p-3.5 shadow-sm">
                                            <button type="submit" disabled={recuperacionSubmitting} className="w-full py-3.5 px-6 bg-[#8B4513] text-white font-black text-base uppercase tracking-widest rounded-xl shadow-lg shadow-[#8B4513]/20 hover:shadow-[#8B4513]/40 hover:-translate-y-0.5 hover:bg-[#5D3A1F] transition-all duration-300 flex items-center justify-center gap-3 group active:scale-[0.96] relative overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed">
                                                <span className="relative z-10">{recuperacionSubmitting ? 'Enviando...' : 'Enviar enlace de recuperación'}</span>
                                                <div className="w-6 h-6 bg-white/10 rounded-full flex items-center justify-center group-hover:translate-x-1 transition-all duration-300 relative z-10"><i className="fas fa-paper-plane text-white text-xs"></i></div>
                                            </button>
                                            <button type="button" onClick={() => { setMostrarRecuperacion(false); setRecuperacionError(''); }} className="w-full mt-2 py-2.5 px-6 bg-[#8B4513] text-white font-black text-xs uppercase tracking-widest rounded-xl shadow-lg shadow-[#8B4513]/20 hover:shadow-[#8B4513]/40 hover:-translate-y-0.5 hover:bg-[#5D3A1F] transition-all duration-300 cursor-pointer">
                                                <i className="fas fa-arrow-left mr-1.5"></i> Volver a iniciar sesión
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
                                    <p className="text-[11px] font-black uppercase tracking-widest text-gray-500">Credenciales</p>
                                </div>

                                <div className="relative group mb-3">
                                    <input type="email" name="correo" value={formData.correo} onChange={handleChange} className="peer block w-full rounded-xl border-2 border-gray-100 bg-white px-4 pt-5 pb-1.5 pl-12 text-sm font-bold text-[#111827] focus:border-[#FF4D00] focus:ring-4 focus:ring-red-500/10 focus:outline-none transition-all duration-300 placeholder-transparent" placeholder="Correo" required />
                                    <label className="absolute top-3.5 left-12 z-10 origin-[0] -translate-y-2.5 scale-75 transform text-[9px] text-gray-400 font-black uppercase tracking-widest duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-[10px] peer-placeholder-shown:font-bold peer-focus:-translate-y-2.5 peer-focus:scale-75 peer-focus:text-[#FF4D00]">Correo electrónico</label>
                                    <div className="absolute top-0 bottom-0 left-0 flex items-center justify-center w-12 text-gray-400 peer-focus:text-[#FF4D00] transition-colors duration-300"><i className="fas fa-envelope text-base"></i></div>
                                </div>

                                <div className="relative group">
                                    <input type="password" name="contrasena" value={formData.contrasena} onChange={handleChange} className="peer block w-full rounded-xl border-2 border-gray-100 bg-white px-4 pt-5 pb-1.5 pl-12 text-sm font-bold text-[#111827] focus:border-[#FF4D00] focus:ring-4 focus:ring-red-500/10 focus:outline-none transition-all duration-300 placeholder-transparent" placeholder="Password" required />
                                    <label className="absolute top-3.5 left-12 z-10 origin-[0] -translate-y-2.5 scale-75 transform text-[9px] text-gray-400 font-black uppercase tracking-widest duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-[10px] peer-placeholder-shown:font-bold peer-focus:-translate-y-2.5 peer-focus:scale-75 peer-focus:text-[#FF4D00]">Contraseña</label>
                                    <div className="absolute top-0 bottom-0 left-0 flex items-center justify-center w-12 text-gray-400 peer-focus:text-[#FF4D00] transition-colors duration-300"><i className="fas fa-lock text-base"></i></div>
                                </div>
                            </div>

                            <div className="rounded-2xl border border-gray-200 bg-white p-3.5 shadow-sm">
                                <div className="flex items-center justify-between">
                                    <label className="inline-flex items-center gap-2 text-[11px] font-semibold text-gray-600 cursor-pointer select-none">
                                        <i className="fas fa-shield-halved text-[#FF4D00] text-[11px]"></i>
                                        <input
                                            type="checkbox"
                                            name="rememberMe"
                                            checked={formData.rememberMe}
                                            onChange={handleChange}
                                            className="w-4 h-4 rounded border-gray-300 accent-[#FF4D00]"
                                        />
                                        Recordarme
                                    </label>
                                    <button
                                        type="button"
                                        onClick={handleForgotPassword}
                                        className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wide text-[#FF4D00] hover:text-[#7f1d1d]"
                                    >
                                        <i className="fas fa-key text-[10px]"></i>
                                        Recuperar acceso
                                    </button>
                                </div>
                            </div>

                            <div className="rounded-2xl border border-gray-200 bg-white p-3.5 shadow-sm">
                                 <button type="submit" disabled={isSubmitting} className="w-full py-3.5 px-6 bg-[#FF4D00] text-white font-black text-base uppercase tracking-widest rounded-xl shadow-lg shadow-[#FF4D00]/20 hover:shadow-[#FF4D00]/40 hover:-translate-y-0.5 hover:bg-[#D93D00] transition-all duration-300 flex items-center justify-center gap-3 group active:scale-[0.96] relative overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed">
                                    <span className="relative z-10">{isSubmitting ? 'Ingresando...' : 'Entrar a Iniciar Sesion'}</span>
                                    <div className="w-6 h-6 bg-white/10 rounded-full flex items-center justify-center group-hover:translate-x-1 transition-all duration-300 relative z-10"><i className="fas fa-arrow-right text-white text-xs"></i></div>
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                                </button>
                            </div>

                            <div className="rounded-xl border border-gray-200 bg-white px-3.5 py-3 text-[11px] text-gray-500 font-semibold leading-relaxed text-center">
                                <div className="flex items-center justify-center gap-2">
                                    <i className="fas fa-lightbulb text-[#FF4D00] flex-shrink-0"></i>
                                    <span>Consejo: si no recuerdas tu acceso, usa la opcion Recuperar acceso o contacta al soporte oficial de LOS CASTORES en WhatsApp al +591 61320004.</span>
                                </div>
                            </div>
                        </form>
                        )}
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

export default InicioSesionModal;
