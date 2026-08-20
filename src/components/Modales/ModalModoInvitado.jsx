import React, { useEffect, useState } from 'react';
import apiClient from '../../servicios/clienteApi';
import CircleParticles from '../fondos/ParticulasCirculares';
import useAuthStore from '../../store/useAutenticacionStore';

const INVITADO_KEY = 'lc_invitado';
const INVITADO_FIN_KEY = 'lc_invitado_fin';

const ModalModoInvitado = ({ isOpen, onClose }) => {
    const [step, setStep] = useState('consulta');

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            setStep('consulta');
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const handleAccept = async () => {
        setStep('loading');
        try {
            const token = localStorage.getItem('token');
            const { data } = await apiClient.post('/cupones-sistema/activar', {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (data.success) {
                // Actualizar store y cerrar
                const cuponData = data.cupon;
                useAuthStore.setState((state) => {
                    const usr = state.user;
                    if (!usr) return state;
                    return {
                        user: {
                            ...usr,
                            cupon: {
                                estado: cuponData.estado,
                                fechaExpiracion: cuponData.fechaExpiracion,
                                fechaExpiracionExtendida: cuponData.fechaExpiracionExtendida,
                                extendido: cuponData.extendido,
                                codigo: cuponData.codigo
                            }
                        }
                    };
                });
                
                setStep('confirmacion');
                return;
            }
            setStep('usado');
        } catch (error) {
            if (error.response?.status === 400) {
                setStep('usado');
                return;
            }
            setStep('error');
        }
    };

    const handleReject = () => {
        setStep('rechazo');
        localStorage.setItem('invitado_rechazado', 'true');
        window.dispatchEvent(new Event('invitadoRechazado'));
    };

    const handleClose = () => {
        onClose();
        setTimeout(() => setStep('consulta'), 300);
    };

    if (!isOpen) return null;    return (
        <div id="invitadoModal" className="tyr-modal fixed inset-0 z-[100]" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity duration-300" onClick={handleClose}></div>
            <div className="fixed inset-0 z-[101] overflow-y-auto" onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}>
                <div className="flex min-h-screen items-center justify-center p-4 text-center sm:p-0" onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}>
                    <div className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto scrollbar-none transform overflow-hidden rounded-[2.5rem] bg-white text-left shadow-2xl transition-all sm:my-4 animate-modal-pop border border-gray-200">
                        <button
                            onClick={handleClose}
                            className="absolute top-6 right-6 z-[200] w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-red-50 dark:hover:bg-red-950/30 text-gray-500 hover:text-red-500 transition-all focus:outline-none cursor-pointer shadow-sm hover:shadow-md border border-gray-200"
                        >
                            <i className="fas fa-times text-xl"></i>
                        </button>

                        <div className="grid grid-cols-1 lg:grid-cols-2 overflow-hidden h-full">
                            {/* Panel Izquierdo (Rojo/Naranja) */}
                            <div className="relative hidden lg:flex flex-col justify-center gap-6 p-6 lg:p-8 overflow-hidden bg-gradient-to-br from-[#FF4D00] to-[#D93D00]">
                                <div className="absolute inset-0 z-0 pointer-events-none">
                                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#111827]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                                    <div className="absolute bottom-0 left-0 w-[420px] h-[420px] bg-black/30 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4"></div>
                                    <CircleParticles colorScheme="red" />
                                </div>

                                <div className="relative z-10 flex flex-col items-center text-center">
                                    <div className="mb-5 inline-flex items-center justify-center rounded-full bg-white/20 p-2.5 shadow-2xl ring-[0.5px] ring-white backdrop-blur-md">
                                        <div className="h-24 w-24 rounded-full bg-white flex items-center justify-center">
                                            <i className="fas fa-gift text-[4rem] text-[#FF4D00]"></i>
                                        </div>
                                    </div>

                                    <h2 className="text-3xl font-black text-white leading-tight mb-2 tracking-tight drop-shadow-lg">
                                        Regalo de Bienvenida <br />
                                        <span className="text-white relative inline-block">
                                            LOS CASTORES
                                            <svg className="absolute w-full h-2.5 -bottom-1 left-0 z-[-1] text-amber-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.55)]" viewBox="0 0 200 12" preserveAspectRatio="none" fill="none"><path d="M8,8 C22,5 38,7.5 55,7.5 C130,7.5 165,7.5 188,7.5 C194,7.5 198,6 196,7.5" stroke="currentColor" strokeWidth="7" strokeLinecap="round"  /></svg>
                                        </span>
                                    </h2>
                                    <p className="text-sm text-white/90 font-medium max-w-sm leading-relaxed mb-6 drop-shadow-md">
                                        ¡Gracias por unirte a la familia! Tu correo es ahora un cupón exclusivo de un solo uso para tu primer pedido.
                                    </p>

                                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 border border-white/30 text-white text-[10px] font-black uppercase tracking-widest mb-6 shadow-lg backdrop-blur-sm">
                                        <span className="w-2 h-2 rounded-full bg-white animate-ping"></span> Soporte LOS CASTORES 24/7
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
                                                <a key={i} href={item.link} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-[#111827] hover:text-[#c5a059] transition-all duration-300 shadow-lg hover:-translate-y-1">
                                                    <i className={`fab ${item.icon} text-[13px]`}></i>
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Panel Derecho (Blanco/Oscuro) */}
                            <div className="relative flex flex-col justify-center h-full bg-[#FFF6F6] p-5 lg:p-6">
                                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                                    <div className="absolute -top-10 -right-10 w-64 h-64 bg-[#FF4D00]/10 rounded-full blur-3xl"></div>
                                    <div className="absolute top-1/2 -left-10 w-40 h-40 bg-[#111827]/20 rounded-full blur-2xl"></div>
                                    <div className="absolute bottom-0 right-10 w-56 h-56 bg-[#FF4D00]/10 rounded-full blur-3xl"></div>
                                    <CircleParticles colorScheme="light" />
                                </div>

                                <div className="relative z-10 w-full max-w-[540px] mx-auto">
                                    {step === 'consulta' && (
                                        <div className="flex flex-col animate-fade-in">
                                            <div className="mb-3.5 text-center bg-white p-4 rounded-2xl shadow-sm border border-gray-200 relative overflow-hidden">
                                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FF4D00] via-[#5D3A1F] to-[#FF4D00]"></div>
                                                <div className="inline-flex items-center gap-2 mb-1.5">
                                                    <span className="w-8 h-8 rounded-xl bg-red-50 border border-red-200 text-[#FF4D00] flex items-center justify-center">
                                                        <i className="fas fa-ticket-alt text-sm"></i>
                                                    </span>
                                                    <h3 className="text-2xl font-black text-[#111827] tracking-tight">Cupón de Descuento</h3>
                                                </div>
                                                <p className="text-xs text-gray-500 font-bold uppercase tracking-wide">EXCLUSIVO PARA NUEVOS CASTORES</p>
                                            </div>

                                            <div className="mb-3.5 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                                                <div className="rounded-xl bg-white border border-gray-200 px-3 py-2.5 text-center shadow-sm">
                                                    <div className="w-7 h-7 mx-auto mb-1 rounded-lg bg-red-50 border border-red-200 text-[#FF4D00] flex items-center justify-center">
                                                        <i className="fas fa-percent text-[11px]"></i>
                                                    </div>
                                                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Tipo</p>
                                                    <p className="text-[13px] font-extrabold text-[#111827]">Descuento</p>
                                                </div>
                                                <div className="rounded-xl bg-white border border-gray-200 px-3 py-2.5 text-center shadow-sm">
                                                    <div className="w-7 h-7 mx-auto mb-1 rounded-lg bg-red-50 border border-red-200 text-[#FF4D00] flex items-center justify-center">
                                                        <i className="fas fa-utensils text-[11px]"></i>
                                                    </div>
                                                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Uso</p>
                                                    <p className="text-[13px] font-extrabold text-[#111827]">Primer Pedido</p>
                                                </div>
                                                <div className="rounded-xl bg-white border border-[#5D3A1F]/40 px-3 py-2.5 text-center shadow-sm">
                                                    <div className="w-7 h-7 mx-auto mb-1 rounded-lg bg-gray-100 border border-gray-300 text-gray-600 flex items-center justify-center">
                                                        <i className="fas fa-ticket text-[11px]"></i>
                                                    </div>
                                                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Estado</p>
                                                    <p className="text-[13px] font-extrabold text-[#111827]">Disponible</p>
                                                </div>
                                            </div>

                                            <div className="flex flex-col gap-3.5">
                                                <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                                                    <p className="text-sm font-medium text-gray-600 leading-relaxed mb-5 text-center">
                                                        Por haber validado tu cuenta exitosamente, tu correo está listo para usarse como un cupón de un solo uso. Tienes <strong className="text-[#FF4D00] font-black">72 horas</strong> para reclamarlo.
                                                    </p>
                                                    <div className="bg-[#FFF9E5] border border-[#FFEAB3] rounded-xl px-4 py-3 flex gap-3 items-center justify-center text-center">
                                                        <i className="fas fa-shield-alt text-[#F59E0B] text-lg"></i>
                                                        <p className="text-[11px] text-[#925C0E] font-bold leading-tight">100% seguro. Sin tarjetas ni compromisos ocultos.</p>
                                                    </div>
                                                </div>

                                                <div className="rounded-2xl border border-gray-200 bg-white p-3.5 shadow-sm">
                                                    <button onClick={handleAccept} className="w-full py-3.5 px-6 bg-[#8B4513] text-white font-black text-base uppercase tracking-widest rounded-xl shadow-lg shadow-[#8B4513]/20 hover:shadow-[#8B4513]/40 hover:-translate-y-0.5 hover:bg-[#5D3A1F] transition-all duration-300 flex items-center justify-center gap-3 group active:scale-[0.96] relative overflow-hidden mb-3">
                                                        <span className="relative z-10">RECLAMAR MI CUPÓN AHORA</span>
                                                        <div className="w-6 h-6 bg-white/10 rounded-full flex items-center justify-center group-hover:translate-x-1 transition-all duration-300 relative z-10"><i className="fas fa-ticket-alt text-white text-xs"></i></div>
                                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                                                    </button>
                                                    <button onClick={handleReject} className="w-full py-3.5 px-6 rounded-xl bg-[#FF4D00] text-white font-black uppercase tracking-widest text-xs shadow-lg shadow-[#FF4D00]/20 hover:-translate-y-0.5 hover:bg-[#D93D00] transition-all duration-300">
                                                        Quizás más tarde
                                                    </button>
                                                </div>
                                                
                                                <div className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-[11px] text-gray-500 font-semibold leading-relaxed flex items-center justify-center text-center">
                                                    <div className="flex flex-col items-center gap-1 max-w-sm">
                                                        <i className="fas fa-lightbulb text-[#FF4D00] text-lg mb-1"></i>
                                                        <span className="text-justify">
                                                            Consejo: Al reclamar este regalo, el descuento se aplicará automáticamente en tu primer pedido dentro del catálogo.
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* LOADING */}
                                    {step === 'loading' && (
                                        <div className="text-center flex flex-col items-center animate-fade-in py-16">
                                            <div className="w-20 h-20 rounded-full border-4 border-gray-200 border-t-[#FF4D00] animate-spin mb-6"></div>
                                            <h3 className="text-xl font-black text-[#111827] mb-2">Validando cupón...</h3>
                                            <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">Asegurando tu descuento</p>
                                        </div>
                                    )}

                                    {/* CONFIRMACION */}
                                    {step === 'confirmacion' && (
                                        <div className="text-center flex flex-col items-center animate-fade-in">
                                            <div className="mb-6 text-center bg-white p-6 rounded-2xl shadow-sm border border-gray-200 relative overflow-hidden w-full">
                                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-teal-400"></div>
                                                <div className="w-20 h-20 mx-auto rounded-full bg-emerald-50 border-2 border-emerald-200 text-emerald-500 flex items-center justify-center mb-6 shadow-inner">
                                                    <i className="fas fa-check-double text-4xl"></i>
                                                </div>
                                                <h3 className="text-3xl font-black text-[#111827] tracking-tight mb-4">¡Cupón Activado!</h3>
                                                <p className="text-sm font-medium text-gray-600 leading-relaxed mb-4">
                                                    Tu descuento de bienvenida se ha guardado en tu cuenta. Se aplicará automáticamente al realizar tu primer pedido.
                                                </p>
                                            </div>
                                            <button onClick={handleClose} className="w-full py-4 px-6 bg-[#8B4513] text-white font-black text-sm uppercase tracking-widest rounded-xl shadow-lg shadow-[#8B4513]/20 hover:shadow-[#8B4513]/40 hover:-translate-y-0.5 hover:bg-[#5D3A1F] transition-all flex items-center justify-center gap-2">
                                                <span>Ver el Menú</span>
                                                <i className="fas fa-hamburger"></i>
                                            </button>
                                        </div>
                                    )}

                                    {/* RECHAZO */}
                                    {step === 'rechazo' && (
                                        <div className="text-center flex flex-col items-center animate-fade-in">
                                            <div className="mb-6 text-center bg-white p-6 rounded-2xl shadow-sm border border-gray-200 relative overflow-hidden w-full">
                                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FF4D00] to-red-600"></div>
                                                <div className="w-20 h-20 mx-auto rounded-full bg-red-50 border-2 border-red-200 text-[#FF4D00] flex items-center justify-center mb-6 shadow-inner">
                                                    <i className="fas fa-bookmark text-4xl"></i>
                                                </div>
                                                <h3 className="text-2xl font-black text-[#111827] tracking-tight mb-4">Te guardamos el cupón</h3>
                                                <p className="text-sm font-medium text-gray-600 leading-relaxed">
                                                    Sin presiones. Hemos guardado tu obsequio para cuando estés listo. Lo encontrarás en el <strong className="text-[#FF4D00]">ícono de regalo</strong> antes de que acabe el tiempo.
                                                </p>
                                            </div>
                                            <button onClick={handleClose} className="w-full py-4 px-6 bg-[#FF4D00] text-white font-black text-sm uppercase tracking-widest rounded-xl shadow-lg hover:-translate-y-0.5 transition-all hover:bg-[#D93D00]">
                                                Entendido
                                            </button>
                                        </div>
                                    )}

                                    {/* YA USADO */}
                                    {step === 'usado' && (
                                        <div className="text-center flex flex-col items-center animate-fade-in">
                                            <div className="mb-6 text-center bg-white p-6 rounded-2xl shadow-sm border border-gray-200 relative overflow-hidden w-full">
                                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FF4D00] to-[#8B4513]"></div>
                                                <div className="w-20 h-20 mx-auto rounded-full bg-red-50 border-2 border-red-200 text-[#FF4D00] flex items-center justify-center mb-6 shadow-inner">
                                                    <i className="fas fa-ticket-alt text-4xl opacity-50"></i>
                                                </div>
                                                <h3 className="text-2xl font-black text-[#111827] tracking-tight mb-4">Cupón ya reclamado</h3>
                                                <p className="text-sm font-medium text-gray-600 leading-relaxed">
                                                    Este cupón de bienvenida es de <strong className="text-[#FF4D00]">un solo uso</strong> por cuenta y ya ha sido utilizado en un pedido anterior.
                                                </p>
                                            </div>
                                            <button onClick={handleClose} className="w-full py-4 px-6 bg-[#8B4513] text-white font-black text-sm uppercase tracking-widest rounded-xl shadow-lg shadow-[#8B4513]/20 hover:shadow-[#8B4513]/40 hover:-translate-y-0.5 hover:bg-[#5D3A1F] transition-all">
                                                <span>Entendido</span>
                                            </button>
                                        </div>
                                    )}

                                    {/* ERROR */}
                                    {step === 'error' && (
                                        <div className="text-center flex flex-col items-center animate-fade-in">
                                            <div className="mb-6 text-center bg-white p-6 rounded-2xl shadow-sm border border-gray-200 relative overflow-hidden w-full">
                                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FF4D00] to-red-600"></div>
                                                <div className="w-20 h-20 mx-auto rounded-full bg-red-50 border-2 border-red-200 text-[#FF4D00] flex items-center justify-center mb-6 shadow-inner">
                                                    <i className="fas fa-triangle-exclamation text-4xl"></i>
                                                </div>
                                                <h3 className="text-2xl font-black text-[#111827] tracking-tight mb-4">No pudimos activar el pase</h3>
                                                <p className="text-sm font-medium text-gray-600 leading-relaxed">
                                                    Ocurrió un error inesperado. Intenta nuevamente en unos segundos.
                                                </p>
                                            </div>
                                            <button onClick={handleClose} className="w-full py-4 px-6 bg-[#FF4D00] hover:bg-[#D93D00] text-white font-black text-sm uppercase tracking-widest rounded-xl shadow-lg shadow-[#FF4D00]/20 hover:-translate-y-0.5 transition-all">
                                                Cerrar
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalModoInvitado;
