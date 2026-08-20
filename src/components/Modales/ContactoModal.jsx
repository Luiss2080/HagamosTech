import React, { useEffect, useState } from 'react';
import CircleParticles from '../fondos/ParticulasCirculares';
import ApiService from '../../servicios/servicioContacto';
import ModalExito from './ModalExito';
import ModalError from './ModalError';

const ContactoModal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [feedback, setFeedback] = useState(null);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;

        setIsSubmitting(true);
        try {
            const resp = await ApiService.sendEmbeddedContact({
                name: formData.name,
                phone: formData.phone,
                email: formData.email,
                message: formData.message,
            });

            if (resp?.status) {
                setFeedback({
                    type: 'success',
                    title: 'Mensaje enviado',
                    message: resp?.message || 'Gracias por contactarnos. Responderemos lo antes posible.',
                    afterClose: () => {
                        setFormData({ name: '', phone: '', email: '', message: '' });
                        onClose();
                    },
                });
            } else {
                setFeedback({
                    type: 'error',
                    title: 'Error',
                    message: resp?.message || 'No se pudo enviar el mensaje. IntÃ©ntalo de nuevo.',
                });
            }
        } catch {
            setFeedback({
                type: 'error',
                title: 'Error',
                message: 'OcurriÃ³ un error al enviar el mensaje. IntÃ©ntalo de nuevo.',
            });
        } finally {
            setIsSubmitting(false);
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
            <div id="contactModal" className="tyr-modal fixed inset-0 z-[100]" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity duration-300" onClick={onClose}></div>
                <div 
                    className="fixed inset-0 z-[101] overflow-y-auto"
                    onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
                >
                    <div 
                        className="flex min-h-screen items-center justify-center p-4 text-center sm:p-0"
                        onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
                    >
                        <div className="relative w-full max-w-6xl transform overflow-hidden rounded-[2.5rem] bg-white text-left shadow-2xl transition-all sm:my-8 animate-modal-pop border border-gray-200">
                            <button
                                onClick={onClose}
                                className="absolute top-6 right-6 z-[200] w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-red-50 dark:hover:bg-red-950/30 text-gray-500 hover:text-red-500 transition-all focus:outline-none cursor-pointer shadow-sm hover:shadow-md border border-gray-200"
                            >
                                <i className="fas fa-times text-xl"></i>
                            </button>

                            <div className="grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
                                {/* Left Brand Panel */}
                                <div className="relative hidden lg:flex flex-col justify-between p-10 overflow-hidden bg-[#a41e22]">
                                    <div className="absolute inset-0 z-0 pointer-events-none">
                                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#111827]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                                        <div className="absolute bottom-0 left-0 w-[420px] h-[420px] bg-black/30 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4"></div>
                                        <CircleParticles colorScheme="red" />
                                    </div>

                                    <div className="relative z-10 flex flex-col h-full justify-center text-center items-center">
                                        <div className="flex flex-col items-center">
                                            <div className="mb-7 inline-flex items-center justify-center rounded-full bg-white/20 p-3 shadow-2xl ring-[0.5px] ring-white backdrop-blur-md">
                                                <img
                                                    src="/img/01_Layout/01_Logo.png"
                                                    alt="HAGAMOSTECH"
                                                    loading="lazy"
                                                    decoding="async"
                                                    className="h-36 w-36 rounded-full object-contain"
                                                />
                                            </div>

                                            <h2 className="text-4xl font-black text-white leading-tight mb-3 tracking-tight drop-shadow-lg">
                                                ConÃ©ctate con <br />
                                                <span className="text-[#c5a059] relative inline-block">
                                                    HAGAMOSTECH
                                                    <svg className="absolute w-full h-3 -bottom-1 left-0 z-[-1] text-[#c5a059]/40" viewBox="0 0 200 9" fill="none"><path d="M2.00025 6.99997C25.7509 4.50435 65.2536 2.07897 197.994 4.4151" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                                </span>
                                            </h2>
                                            <p className="text-base text-white/90 font-medium max-w-sm leading-relaxed mb-7 drop-shadow-md">
                                                El instituto lÃ­der en educaciÃ³n tecnolÃ³gica y desarrollo de software profesional con el respaldo de nuestros expertos.
                                            </p>

                                            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#111827] border border-[#c5a059]/30 text-[#c5a059] text-xs font-black uppercase tracking-widest mb-8 shadow-lg">
                                                <span className="w-2 h-2 rounded-full bg-[#c5a059] animate-ping"></span> Soporte HAGAMOSTECH
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full max-w-sm mb-8">
                                                <div className="rounded-xl border border-[#c5a059]/30 bg-[#111827]/40 px-3 py-2 text-left backdrop-blur-sm">
                                                    <p className="text-[10px] font-black uppercase tracking-widest text-[#c5a059]">Cursos</p>
                                                    <p className="text-sm font-bold text-white">RobÃ³tica & LMS</p>
                                                </div>
                                                <div className="rounded-xl border border-[#c5a059]/30 bg-[#111827]/40 px-3 py-2 text-left backdrop-blur-sm">
                                                    <p className="text-[10px] font-black uppercase tracking-widest text-[#c5a059]">Software</p>
                                                    <p className="text-sm font-bold text-white">A medida y Web</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="w-full max-w-xs">
                                            <p className="text-[10px] font-bold text-white/80 uppercase tracking-widest mb-3">Redes HAGAMOSTECH</p>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                                {[
                                                    { label: 'TikTok', icon: 'fa-tiktok', link: 'https://www.tiktok.com/@hagamostech' },
                                                    { label: 'Facebook', icon: 'fa-facebook-f', link: 'https://www.facebook.com/LOSHAGAMOSTECH?locale=es_LA' },
                                                    { label: 'Instagram', icon: 'fa-instagram', link: 'https://www.instagram.com/hagamostech/' },
                                                    { label: 'WhatsApp', icon: 'fa-whatsapp', link: 'https://wa.me/59161320004' },
                                                ].map((item) => (
                                                    <a
                                                        key={item.label}
                                                        href={item.link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="group cursor-pointer flex items-center justify-center gap-2 rounded-lg border border-[#c5a059]/20 bg-[#111827]/30 px-2 py-2.5 hover:bg-[#c5a059] transition-all duration-300 hover:border-[#c5a059] hover:shadow-xl hover:-translate-y-1"
                                                    >
                                                        <div className="w-6 h-6 rounded bg-white/10 flex items-center justify-center transition-colors group-hover:bg-[#111827]">
                                                            <i className={`fab ${item.icon} text-white group-hover:text-[#c5a059] text-xs transition-colors`}></i>
                                                        </div>
                                                        <span className="font-bold text-white text-xs group-hover:text-[#111827] transition-colors">{item.label}</span>
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Form Panel */}
                                <div className="relative flex flex-col justify-center h-full bg-[#FFF6F6] p-8 lg:p-10">
                                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                                        <div className="absolute -top-10 -right-10 w-64 h-64 bg-[#a41e22]/10 rounded-full blur-3xl"></div>
                                        <div className="absolute top-1/2 -left-10 w-40 h-40 bg-[#111827]/20 rounded-full blur-2xl"></div>
                                        <div className="absolute bottom-0 right-10 w-56 h-56 bg-[#a41e22]/10 rounded-full blur-3xl"></div>
                                        <CircleParticles colorScheme="light" />
                                    </div>

                                    <div className="relative z-10 w-full max-w-[540px] mx-auto">
                                        <div className="mb-5 text-center bg-white p-5 rounded-2xl shadow-sm border border-gray-200 relative overflow-hidden">
                                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#a41e22] via-[#c5a059] to-[#a41e22]"></div>
                                            <div className="inline-flex items-center gap-2 mb-1.5">
                                                <span className="w-8 h-8 rounded-xl bg-red-50 border border-red-200 text-[#a41e22] flex items-center justify-center">
                                                    <i className="fas fa-envelope-open-text text-sm"></i>
                                                </span>
                                                <h3 className="text-2xl font-black text-[#111827] tracking-tight">Contacto</h3>
                                            </div>
                                            <p className="text-xs text-gray-500 font-bold uppercase tracking-wide">EscrÃ­benos tu mensaje y te responderemos</p>
                                        </div>

                                        <div className="mb-4 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                                            <div className="rounded-xl bg-white border border-gray-200 px-3 py-2.5 text-center shadow-sm">
                                                <div className="w-7 h-7 mx-auto mb-1 rounded-lg bg-red-50 border border-red-200 text-[#a41e22] flex items-center justify-center">
                                                    <i className="fas fa-graduation-cap text-[11px]"></i>
                                                </div>
                                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">LÃ­nea</p>
                                                <p className="text-[13px] font-extrabold text-[#111827]">Cursos</p>
                                            </div>
                                            <div className="rounded-xl bg-white border border-gray-200 px-3 py-2.5 text-center shadow-sm">
                                                <div className="w-7 h-7 mx-auto mb-1 rounded-lg bg-red-50 border border-red-200 text-[#a41e22] flex items-center justify-center">
                                                    <i className="fas fa-laptop-code text-[11px]"></i>
                                                </div>
                                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">LÃ­nea</p>
                                                <p className="text-[13px] font-extrabold text-[#111827]">Software</p>
                                            </div>
                                            <div className="rounded-xl bg-white border border-[#c5a059]/40 px-3 py-2.5 text-center shadow-sm">
                                                <div className="w-7 h-7 mx-auto mb-1 rounded-lg bg-gray-100 border border-gray-300 text-gray-650 flex items-center justify-center">
                                                    <i className="fas fa-signal text-[11px]"></i>
                                                </div>
                                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Estado</p>
                                                <p className="text-[13px] font-extrabold text-[#111827]">Activo</p>
                                            </div>
                                        </div>

                                        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5" autoComplete="off">
                                            <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                                                <div className="mb-3 flex items-center gap-2">
                                                    <span className="w-7 h-7 rounded-lg bg-red-50 border border-red-200 text-[#a41e22] flex items-center justify-center">
                                                        <i className="fas fa-id-card text-[11px]"></i>
                                                    </span>
                                                    <p className="text-[11px] font-black uppercase tracking-widest text-gray-500">Datos de contacto</p>
                                                </div>

                                                <div className="grid md:grid-cols-2 gap-4">
                                                    <div className="relative group">
                                                        <input
                                                            type="text"
                                                            name="name"
                                                            value={formData.name}
                                                            onChange={handleChange}
                                                            className="peer block w-full rounded-xl border-2 border-gray-100 bg-white px-4 pt-5 pb-1.5 pl-12 text-sm font-bold text-[#111827] focus:border-[#a41e22] dark:focus:border-[#c5a059] focus:ring-4 focus:ring-red-500/10 focus:outline-none transition-all duration-300 placeholder-transparent shadow-[0_2px_8px_rgb(0,0,0,0.02)] hover:shadow-md"
                                                            placeholder="Nombre completo"
                                                            required
                                                        />
                                                        <label className="absolute top-3.5 left-12 z-10 origin-[0] -translate-y-2.5 scale-75 transform text-[9px] text-gray-400 font-black uppercase tracking-widest duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-[10px] peer-placeholder-shown:font-bold peer-focus:-translate-y-2.5 peer-focus:scale-75 peer-focus:text-[#a41e22] dark:peer-focus:text-[#c5a059]">Nombre completo</label>
                                                        <div className="absolute top-0 bottom-0 left-0 flex items-center justify-center w-12 text-gray-400 peer-focus:text-[#a41e22] dark:peer-focus:text-[#c5a059] transition-colors duration-300"><i className="fas fa-user text-base"></i></div>
                                                    </div>

                                                    <div className="relative group">
                                                        <input
                                                            type="text"
                                                            name="phone"
                                                            value={formData.phone}
                                                            onChange={handleChange}
                                                            className="peer block w-full rounded-xl border-2 border-gray-100 bg-white px-4 pt-5 pb-1.5 pl-12 text-sm font-bold text-[#111827] focus:border-[#a41e22] dark:focus:border-[#c5a059] focus:ring-4 focus:ring-red-500/10 focus:outline-none transition-all duration-300 placeholder-transparent shadow-[0_2px_8px_rgb(0,0,0,0.02)] hover:shadow-md"
                                                            placeholder="Celular"
                                                            required
                                                        />
                                                        <label className="absolute top-3.5 left-12 z-10 origin-[0] -translate-y-2.5 scale-75 transform text-[9px] text-gray-400 font-black uppercase tracking-widest duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-[10px] peer-placeholder-shown:font-bold peer-focus:-translate-y-2.5 peer-focus:scale-75 peer-focus:text-[#a41e22] dark:peer-focus:text-[#c5a059]">Celular</label>
                                                        <div className="absolute top-0 bottom-0 left-0 flex items-center justify-center w-12 text-gray-400 peer-focus:text-[#a41e22] dark:peer-focus:text-[#c5a059] transition-colors duration-300"><i className="fas fa-phone-alt text-base"></i></div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                                                <div className="relative group mb-4">
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        value={formData.email}
                                                        onChange={handleChange}
                                                        className="peer block w-full rounded-xl border-2 border-gray-100 bg-white px-4 pt-5 pb-1.5 pl-12 text-sm font-bold text-[#111827] focus:border-[#a41e22] dark:focus:border-[#c5a059] focus:ring-4 focus:ring-red-500/10 focus:outline-none transition-all duration-300 placeholder-transparent shadow-[0_2px_8px_rgb(0,0,0,0.02)] hover:shadow-md"
                                                        placeholder="Email"
                                                        required
                                                    />
                                                    <label className="absolute top-3.5 left-12 z-10 origin-[0] -translate-y-2.5 scale-75 transform text-[9px] text-gray-400 font-black uppercase tracking-widest duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-[10px] peer-placeholder-shown:font-bold peer-focus:-translate-y-2.5 peer-focus:scale-75 peer-focus:text-[#a41e22] dark:peer-focus:text-[#c5a059]">Correo electrÃ³nico</label>
                                                    <div className="absolute top-0 bottom-0 left-0 flex items-center justify-center w-12 text-gray-400 peer-focus:text-[#a41e22] dark:peer-focus:text-[#c5a059] transition-colors duration-300"><i className="fas fa-envelope text-base"></i></div>
                                                </div>

                                                <div className="relative group">
                                                    <textarea
                                                        name="message"
                                                        rows="4"
                                                        value={formData.message}
                                                        onChange={handleChange}
                                                        className="peer block w-full rounded-xl border-2 border-gray-100 bg-white px-4 pt-5 pb-1.5 pl-12 text-sm font-bold text-[#111827] focus:border-[#a41e22] dark:focus:border-[#c5a059] focus:ring-4 focus:ring-red-500/10 focus:outline-none transition-all duration-300 placeholder-transparent shadow-[0_2px_8px_rgb(0,0,0,0.02)] hover:shadow-md resize-none"
                                                        placeholder="Mensaje"
                                                        required
                                                    ></textarea>
                                                    <label className="absolute top-3.5 left-12 z-10 origin-[0] -translate-y-2.5 scale-75 transform text-[9px] text-gray-400 font-black uppercase tracking-widest duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-[10px] peer-placeholder-shown:font-bold peer-focus:-translate-y-2.5 peer-focus:scale-75 peer-focus:text-[#a41e22] dark:peer-focus:text-[#c5a059]">Mensaje</label>
                                                    <div className="absolute top-0 h-12 left-0 flex items-center justify-center w-12 text-gray-400 peer-focus:text-[#a41e22] dark:peer-focus:text-[#c5a059] transition-colors duration-300"><i className="fas fa-comment-dots text-base"></i></div>
                                                </div>
                                            </div>

                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="mt-1 w-full py-4 bg-[#c5a059] text-[#111827] font-black text-base uppercase tracking-widest rounded-xl shadow-lg shadow-[#c5a059]/20 hover:shadow-gray-900/40 hover:-translate-y-0.5 hover:bg-[#a88544] hover:text-white transition-all duration-300 flex items-center justify-center gap-3 group active:scale-[0.96] relative overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed"
                                            >
                                                <span className="relative z-10">{isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}</span>
                                                <div className="w-6 h-6 bg-white/30 rounded-full flex items-center justify-center group-hover:translate-x-1 transition-all duration-300 relative z-10">
                                                    <i className="fas fa-paper-plane text-[#111827] group-hover:text-white text-xs"></i>
                                                </div>
                                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                                            </button>
                                        </form>
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
            />

            <ModalError
                isOpen={feedback?.type === 'error'}
                onClose={handleCloseFeedback}
                title={feedback?.title}
                message={feedback?.message}
            />
        </>
    );
};

export default ContactoModal;
