import React, { useEffect, useState } from 'react';
import apiClient from '../../servicios/clienteApi';
import useAuthStore from '../../store/useAutenticacionStore';

const INVITADO_FIN_KEY = 'lc_invitado_fin';

const ModalFinInvitado = ({ isOpen, onClose }) => {
    const [mensaje, setMensaje] = useState('');

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            setMensaje('');
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    const handleExtend = async () => {
        setMensaje('Procesando...');
        try {
            const token = localStorage.getItem('token');
            const { data } = await apiClient.post('/cupones-sistema/extender', {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (data.success) {
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
                setMensaje('');
                onClose();
                return;
            }
            setMensaje('La extensión del pase solo puede usarse una sola vez por cuenta.');
        } catch (error) {
            if (error.response?.status === 400) {
                setMensaje(error.response?.data?.mensaje || 'La extensión del pase de invitado solo puede usarse una sola vez por cuenta.');
            } else {
                setMensaje('No se pudo procesar la solicitud. Intente nuevamente.');
            }
        }
    };

    if (!isOpen) return null;

    return (
        <div className="tyr-modal fixed inset-0 z-[100]" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-gray-900/80 backdrop-blur-md transition-opacity duration-300" onClick={onClose}></div>
            <div className="fixed inset-0 z-[101] overflow-y-auto" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
                <div className="flex min-h-screen items-center justify-center p-4 text-center sm:p-0" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
                    <div className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto scrollbar-none transform overflow-hidden rounded-[2.5rem] bg-white text-left shadow-2xl transition-all sm:my-4 animate-modal-pop border border-gray-200">
                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 z-[200] w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-red-50 dark:hover:bg-red-950/30 text-gray-500 hover:text-red-500 transition-all focus:outline-none cursor-pointer shadow-sm hover:shadow-md border border-gray-200"
                        >
                            <i className="fas fa-times text-xl"></i>
                        </button>

                        <div className="grid grid-cols-1 lg:grid-cols-2 overflow-hidden h-full">
                            {/* Panel Izquierdo (Rojo) */}
                            <div className="relative hidden lg:flex flex-col justify-center gap-6 p-6 lg:p-8 overflow-hidden bg-gradient-to-br from-[#FF4D00] to-[#D93D00]">
                                <div className="absolute inset-0 z-0 pointer-events-none">
                                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#111827]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                                    <div className="absolute bottom-0 left-0 w-[420px] h-[420px] bg-black/30 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4"></div>
                                </div>

                                <div className="relative z-10 flex flex-col items-center text-center">
                                    <div className="mb-5 inline-flex items-center justify-center rounded-full bg-white/20 p-2.5 shadow-2xl ring-[0.5px] ring-white backdrop-blur-md">
                                        <div className="h-24 w-24 rounded-full bg-white flex items-center justify-center">
                                            <i className="fas fa-lock text-[4rem] text-[#FF4D00]"></i>
                                        </div>
                                    </div>

                                    <h2 className="text-3xl font-black text-white leading-tight mb-2 tracking-tight drop-shadow-lg">
                                        Tu Cupón <br />
                                        <span className="text-white relative inline-block">
                                            HA EXPIRADO
                                            <svg className="absolute w-full h-2.5 -bottom-1 left-0 z-[-1] text-amber-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.55)]" viewBox="0 0 200 12" preserveAspectRatio="none" fill="none"><path d="M8,8 C22,5 38,7.5 55,7.5 C130,7.5 165,7.5 188,7.5 C194,7.5 198,6 196,7.5" stroke="currentColor" strokeWidth="7" strokeLinecap="round"  /></svg>
                                        </span>
                                    </h2>
                                    <p className="text-sm text-white/90 font-medium max-w-sm leading-relaxed mb-6 drop-shadow-md">
                                        El tiempo límite para reclamar tu regalo de bienvenida ha terminado. No dejes pasar esta oportunidad de disfrutar de nuestras delicias con descuento.
                                    </p>

                                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 border border-white/30 text-white text-[10px] font-black uppercase tracking-widest mb-6 shadow-lg backdrop-blur-sm">
                                        <span className="w-2 h-2 rounded-full bg-white animate-ping"></span> Soporte HAGAMOSTECH 24/7
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
                                        <p className="text-[9px] font-black text-white/60 uppercase tracking-[0.2em] mb-2">Conecta con HAGAMOSTECH</p>
                                        <div className="flex justify-center gap-3">
                                            {[
                                                { icon: 'fa-facebook-f', link: 'https://www.facebook.com/LosHagamosTechSC' },
                                                { icon: 'fa-instagram', link: 'https://www.instagram.com/hagamostech/' },
                                                { icon: 'fa-tiktok', link: 'https://www.tiktok.com/@hagamostech' },
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
                                </div>

                                <div className="relative z-10 w-full max-w-[540px] mx-auto">
                                    <div className="mb-3.5 text-center bg-white p-4 rounded-2xl shadow-sm border border-gray-200 relative overflow-hidden">
                                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FF4D00] via-[#5D3A1F] to-[#FF4D00]"></div>
                                        <div className="inline-flex items-center gap-2 mb-1.5">
                                            <span className="w-8 h-8 rounded-xl bg-red-50 border border-red-200 text-[#FF4D00] flex items-center justify-center">
                                                <i className="fas fa-ban text-sm"></i>
                                            </span>
                                            <h3 className="text-2xl font-black text-[#111827] tracking-tight">Periodo Finalizado</h3>
                                        </div>
                                        <p className="text-xs text-gray-500 font-bold uppercase tracking-wide">EL ACCESO INVITADO HA EXPIRADO</p>
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
                                        <div className="rounded-xl bg-white border border-red-500/40 px-3 py-2.5 text-center shadow-sm">
                                            <div className="w-7 h-7 mx-auto mb-1 rounded-lg bg-red-50 border border-red-200 text-[#FF4D00] flex items-center justify-center">
                                                <i className="fas fa-times-circle text-[11px]"></i>
                                            </div>
                                            <p className="text-[10px] font-black uppercase tracking-widest text-red-500">Estado</p>
                                            <p className="text-[13px] font-extrabold text-[#111827]">Inactivo</p>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-3.5">
                                        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm text-center">
                                            <h3 className="text-2xl font-black text-[#111827] mb-2">¿Te perdiste el regalo?</h3>
                                            <p className="text-sm font-medium text-gray-600">
                                                Te damos una oportunidad excepcional. Puedes extender el tiempo para reclamar tu cupón de bienvenida antes de que se pierda para siempre.
                                            </p>
                                        </div>

                                        <div className="rounded-2xl border border-gray-200 bg-white p-3.5 shadow-sm text-center">
                                            <button 
                                                onClick={handleExtend}
                                                disabled={mensaje === 'Procesando...'}
                                                className="w-full py-3 px-4 bg-[#8B4513] hover:bg-[#5D3A1F] text-white font-black uppercase tracking-widest text-sm rounded-xl shadow-lg shadow-[#8B4513]/20 hover:-translate-y-0.5 hover:shadow-[#8B4513]/40 transition-all duration-300 flex items-center justify-center gap-2 group active:scale-[0.97] relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                                            >
                                                <i className="fas fa-calendar-plus text-[13px] group-hover:scale-110 transition-transform"></i>
                                                <span>{mensaje === 'Procesando...' ? 'PROCESANDO...' : 'Extender 3 días más'}</span>
                                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                                            </button>
                                            {mensaje && mensaje !== 'Procesando...' && (
                                                <p className="mt-2.5 text-[10px] font-bold text-[#FF4D00] uppercase tracking-wider leading-snug">
                                                    {mensaje}
                                                </p>
                                            )}
                                        </div>

                                        <div className="rounded-xl border border-gray-200 bg-white px-3.5 py-3 text-[11px] text-gray-500 font-semibold leading-relaxed text-center">
                                            <div className="flex items-center justify-center gap-2">
                                                <i className="fas fa-lightbulb text-[#FF4D00] flex-shrink-0"></i>
                                                <span className="text-justify">
                                                    Consejo: Si solicitas una extensión, tendrás 72 horas adicionales para reclamar tu descuento exclusivo de primer pedido.
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalFinInvitado;
