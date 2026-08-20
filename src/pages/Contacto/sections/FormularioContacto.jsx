import React, { useState } from 'react';
import CircleParticles from '../../../components/fondos/ParticulasCirculares';

const WHATSAPP_NUMBER = '59161320004';

const FormularioContacto = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isSubmitting) return;
        setIsSubmitting(true);

        const texto = `*Nuevo mensaje desde HAGAMOSTECH - Contacto*%0A%0A*Nombre:* ${encodeURIComponent(formData.name)}%0A*Celular:* ${encodeURIComponent(formData.phone)}%0A*Email:* ${encodeURIComponent(formData.email)}%0A*Mensaje:* ${encodeURIComponent(formData.message)}`;

        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${texto}`, '_blank');

        setFormData({ name: '', phone: '', email: '', message: '' });
        setIsSubmitting(false);
    };

    return (
        <div id="support" className="relative z-10 py-8">
            <section className="container mx-auto px-4 relative z-10 pt-8">
                <div className="text-center mb-4 max-w-3xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading text-white mb-4 leading-tight">
                        Hablemos de tu <span className="relative inline-block px-2 text-[#84CC16]">próximo proyecto
                            <svg className="absolute w-full h-3 -bottom-1 left-0 z-[-1] text-[#A3E635] opacity-80" viewBox="0 0 200 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.00025 6.99997C25.7509 4.50435 65.2536 2.07897 197.994 4.4151" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </span>
                    </h2>
                    <p className="text-white/70 font-medium max-w-3xl mx-auto text-base sm:text-lg leading-relaxed">
                        Escríbenos para consultas sobre proyectos, soluciones académicas o dudas sobre cómo digitalizar tu negocio. Te responderemos a la brevedad.
                    </p>
                </div>

                <div className="relative max-w-6xl mx-auto overflow-hidden rounded-[2.5rem] bg-white text-left shadow-2xl transition-all border border-gray-200">
                    <div className="grid grid-cols-1 lg:grid-cols-2 overflow-hidden">

                        {/* Left Side */}
                        <div className="relative hidden lg:flex flex-col justify-center gap-6 p-6 lg:p-8 overflow-hidden bg-gradient-to-br from-[#0A0A0A] to-[#171717]">
                            <div className="absolute inset-0 z-0 pointer-events-none">
                                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#A3E635]/15 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                                <div className="absolute bottom-0 left-0 w-[420px] h-[420px] bg-black/30 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4"></div>
                                <CircleParticles colorScheme="dark" />
                            </div>

                            <div className="relative z-10 flex flex-col items-center text-center">
                                <div className="mb-5 inline-flex items-center justify-center rounded-full bg-white/10 p-2.5 shadow-2xl ring-[0.5px] ring-white backdrop-blur-md">
                                    <img
                                        src="/img/02_Logos/LogoModal.png"
                                        alt="HAGAMOSTECH"
                                        loading="lazy"
                                        decoding="async"
                                        className="h-40 w-40 rounded-full object-contain bg-white transition-transform duration-500 hover:scale-105 hover:-translate-y-2 hover:rotate-[5deg]"
                                    />
                                </div>

                                <h2 className="text-3xl font-black font-heading text-white leading-tight mb-2 tracking-tight drop-shadow-lg">
                                    Conéctate con <br />
                                    <span className="text-white relative inline-block">
                                        HAGAMOSTECH
                                        <svg className="absolute w-full h-2.5 -bottom-1 left-0 z-[-1] text-[#A3E635]/60" viewBox="0 0 200 9" fill="none"><path d="M2.00025 6.99997C25.7509 4.50435 65.2536 2.07897 197.994 4.4151" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                    </span>
                                </h2>
                                <p className="text-sm text-white/90 font-medium max-w-sm leading-relaxed mb-6 drop-shadow-md">
                                    Transformamos problemas, necesidades e ideas en soluciones reales usando tecnología, creatividad y conocimiento.
                                </p>

                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#A3E635]/15 border border-[#A3E635]/30 text-[#A3E635] text-[10px] font-black uppercase tracking-widest mb-6 shadow-lg backdrop-blur-sm">
                                    <span className="w-2 h-2 rounded-full bg-[#A3E635] animate-ping"></span> Soluciones HagamosTech
                                </div>

                                <div className="grid grid-cols-2 gap-2 w-full max-w-sm mb-6">
                                    <div className="rounded-xl border border-white/20 bg-black/20 px-3 py-2 text-left backdrop-blur-sm">
                                        <p className="text-[9px] font-black uppercase tracking-widest text-white/70"><i className="fas fa-microchip mr-1"></i> Tecnología</p>
                                        <p className="text-xs font-bold text-white">Web e IA</p>
                                    </div>
                                    <div className="rounded-xl border border-white/20 bg-black/20 px-3 py-2 text-left backdrop-blur-sm">
                                        <p className="text-[9px] font-black uppercase tracking-widest text-white/70"><i className="fas fa-graduation-cap mr-1"></i> Academia</p>
                                        <p className="text-xs font-bold text-white">Proyectos y simulaciones</p>
                                    </div>
                                    <div className="rounded-xl border border-white/20 bg-black/20 px-3 py-2 text-left backdrop-blur-sm">
                                        <p className="text-[9px] font-black uppercase tracking-widest text-white/70"><i className="fas fa-store mr-1"></i> Negocios</p>
                                        <p className="text-xs font-bold text-white">Digitalización</p>
                                    </div>
                                    <div className="rounded-xl border border-white/20 bg-black/20 px-3 py-2 text-left backdrop-blur-sm">
                                        <p className="text-[9px] font-black uppercase tracking-widest text-white/70"><i className="fas fa-lightbulb mr-1"></i> A medida</p>
                                        <p className="text-xs font-bold text-white">Lo que necesites</p>
                                    </div>
                                </div>

                                <div className="w-full mt-auto pt-4 flex flex-col items-center">
                                    <p className="text-[9px] font-black text-white/60 uppercase tracking-[0.2em] mb-2">Conecta con HAGAMOSTECH</p>
                                    <div className="flex justify-center gap-3">
                                        {[
                                            { icon: 'fa-facebook-f', link: 'https://www.facebook.com/HAGAMOSTECH?locale=es_LA' },
                                            { icon: 'fa-instagram', link: 'https://www.instagram.com/hagamostech/' },
                                            { icon: 'fa-tiktok', link: 'https://www.tiktok.com/@hagamostech' },
                                            { icon: 'fa-whatsapp', link: 'https://wa.me/59161320004' },
                                        ].map((item, i) => (
                                            <a key={i} href={item.link} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-[#A3E635] hover:text-[#0A0A0A] transition-all duration-300 shadow-lg hover:-translate-y-1">
                                                <i className={`fab ${item.icon} text-[13px]`}></i>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Side (Form) */}
                        <div className="relative flex flex-col justify-center h-full bg-white p-5 lg:p-6">
                            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                                <div className="absolute -top-10 -right-10 w-64 h-64 bg-[#A3E635]/10 rounded-full blur-3xl"></div>
                                <div className="absolute top-1/2 -left-10 w-40 h-40 bg-[#0A0A0A]/10 rounded-full blur-2xl"></div>
                                <div className="absolute bottom-0 right-10 w-56 h-56 bg-[#A3E635]/10 rounded-full blur-3xl"></div>
                                <CircleParticles colorScheme="light" />
                            </div>

                            <div className="relative z-10 w-full max-w-[540px] mx-auto">
                                <div className="mb-3.5 text-center bg-white p-4 rounded-2xl shadow-sm border border-gray-200 relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#A3E635] via-[#84CC16] to-[#A3E635]"></div>
                                    <div className="inline-flex items-center gap-2 mb-1.5">
                                        <span className="w-8 h-8 rounded-xl bg-[#A3E635]/10 border border-[#A3E635]/20 text-[#84CC16] flex items-center justify-center">
                                            <i className="fas fa-comment-dots text-sm"></i>
                                        </span>
                                        <h3 className="text-2xl font-black font-heading text-[#0A0A0A] tracking-tight">Escríbenos</h3>
                                    </div>
                                    <p className="text-xs text-gray-500 font-bold uppercase tracking-wide">Contáctate con el equipo HagamosTech</p>
                                </div>

                                <div className="mb-3.5 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                                    <div className="rounded-xl bg-white border border-gray-200 px-3 py-2.5 text-center shadow-sm">
                                        <div className="w-7 h-7 mx-auto mb-1 rounded-lg bg-[#A3E635]/10 border border-[#A3E635]/20 text-[#84CC16] flex items-center justify-center">
                                            <i className="fas fa-microchip text-[11px]"></i>
                                        </div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Área</p>
                                        <p className="text-[13px] font-extrabold text-[#0A0A0A]">Tecnología</p>
                                    </div>
                                    <div className="rounded-xl bg-white border border-gray-200 px-3 py-2.5 text-center shadow-sm">
                                        <div className="w-7 h-7 mx-auto mb-1 rounded-lg bg-[#A3E635]/10 border border-[#A3E635]/20 text-[#84CC16] flex items-center justify-center">
                                            <i className="fas fa-lightbulb text-[11px]"></i>
                                        </div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Enfoque</p>
                                        <p className="text-[13px] font-extrabold text-[#0A0A0A]">Tu necesidad</p>
                                    </div>
                                    <div className="rounded-xl bg-white border border-gray-200 px-3 py-2.5 text-center shadow-sm">
                                        <div className="w-7 h-7 mx-auto mb-1 rounded-lg bg-[#A3E635]/10 border border-[#A3E635]/20 text-[#84CC16] flex items-center justify-center">
                                            <i className="fas fa-clock text-[11px]"></i>
                                        </div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Atención</p>
                                        <p className="text-[13px] font-extrabold text-[#0A0A0A]">Rápida</p>
                                    </div>
                                </div>

                                <form onSubmit={handleSubmit} className="flex flex-col gap-3.5" autoComplete="off">
                                    <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                                        <div className="mb-3 flex items-center gap-2">
                                            <span className="w-7 h-7 rounded-lg bg-[#A3E635]/10 border border-[#A3E635]/20 text-[#84CC16] flex items-center justify-center">
                                                <i className="fas fa-id-card text-[11px]"></i>
                                            </span>
                                           
                                           <p className="text-[11px] font-black uppercase tracking-widest text-gray-500">Tus Datos</p>
                                        </div>

                                        <div className="relative group mb-3">
                                            <input type="text" name="name" value={formData.name} onChange={handleChange} className="peer block w-full rounded-xl border-2 border-gray-100 bg-white px-4 pt-5 pb-1.5 pl-12 text-sm font-bold text-[#0A0A0A] focus:border-[#A3E635] focus:ring-4 focus:ring-[#A3E635]/10 focus:outline-none transition-all duration-300 placeholder-transparent" placeholder="Nombre" required />
                                            <label className="absolute top-3.5 left-12 z-10 origin-[0] -translate-y-2.5 scale-75 transform text-[9px] text-gray-400 font-black uppercase tracking-widest duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-[10px] peer-placeholder-shown:font-bold peer-focus:-translate-y-2.5 peer-focus:scale-75 peer-focus:text-[#84CC16]">Nombre completo</label>
                                            <div className="absolute top-0 bottom-0 left-0 flex items-center justify-center w-12 text-gray-400 peer-focus:text-[#84CC16] transition-colors duration-300"><i className="fas fa-user text-base"></i></div>
                                        </div>

                                        <div className="relative group mb-3">
                                            <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="peer block w-full rounded-xl border-2 border-gray-100 bg-white px-4 pt-5 pb-1.5 pl-12 text-sm font-bold text-[#0A0A0A] focus:border-[#A3E635] focus:ring-4 focus:ring-[#A3E635]/10 focus:outline-none transition-all duration-300 placeholder-transparent" placeholder="Celular" required />
                                            <label className="absolute top-3.5 left-12 z-10 origin-[0] -translate-y-2.5 scale-75 transform text-[9px] text-gray-400 font-black uppercase tracking-widest duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-[10px] peer-placeholder-shown:font-bold peer-focus:-translate-y-2.5 peer-focus:scale-75 peer-focus:text-[#84CC16]">Celular</label>
                                            <div className="absolute top-0 bottom-0 left-0 flex items-center justify-center w-12 text-gray-400 peer-focus:text-[#84CC16] transition-colors duration-300"><i className="fas fa-phone-alt text-base"></i></div>
                                        </div>

                                        <div className="relative group mb-3">
                                            <input type="email" name="email" value={formData.email} onChange={handleChange} className="peer block w-full rounded-xl border-2 border-gray-100 bg-white px-4 pt-5 pb-1.5 pl-12 text-sm font-bold text-[#0A0A0A] focus:border-[#A3E635] focus:ring-4 focus:ring-[#A3E635]/10 focus:outline-none transition-all duration-300 placeholder-transparent" placeholder="Email" required />
                                            <label className="absolute top-3.5 left-12 z-10 origin-[0] -translate-y-2.5 scale-75 transform text-[9px] text-gray-400 font-black uppercase tracking-widest duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-[10px] peer-placeholder-shown:font-bold peer-focus:-translate-y-2.5 peer-focus:scale-75 peer-focus:text-[#84CC16]">Correo electrónico</label>
                                            <div className="absolute top-0 bottom-0 left-0 flex items-center justify-center w-12 text-gray-400 peer-focus:text-[#84CC16] transition-colors duration-300"><i className="fas fa-envelope text-base"></i></div>
                                        </div>

                                        <div className="relative group">
                                            <textarea name="message" rows="3" value={formData.message} onChange={handleChange} className="peer block w-full rounded-xl border-2 border-gray-100 bg-white px-4 pt-5 pb-1.5 pl-12 text-sm font-bold text-[#0A0A0A] focus:border-[#A3E635] focus:ring-4 focus:ring-[#A3E635]/10 focus:outline-none transition-all duration-300 placeholder-transparent resize-none" placeholder="Mensaje" required></textarea>
                                            <label className="absolute top-3.5 left-12 z-10 origin-[0] -translate-y-2.5 scale-75 transform text-[9px] text-gray-400 font-black uppercase tracking-widest duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-[10px] peer-placeholder-shown:font-bold peer-focus:-translate-y-2.5 peer-focus:scale-75 peer-focus:text-[#84CC16]">Mensaje</label>
                                            <div className="absolute top-0 bottom-0 left-0 flex items-center justify-center w-12 text-gray-400 peer-focus:text-[#84CC16] transition-colors duration-300"><i className="fas fa-comment-dots text-base"></i></div>
                                        </div>
                                    </div>

                                    <div className="rounded-2xl border border-gray-200 bg-white p-3.5 shadow-sm">
                                        <button type="submit" disabled={isSubmitting} className="w-full py-3.5 px-6 bg-[#A3E635] text-[#0A0A0A] font-black text-base uppercase tracking-widest rounded-xl shadow-lg shadow-[#A3E635]/20 hover:shadow-[#A3E635]/40 hover:-translate-y-0.5 hover:bg-[#84CC16] transition-all duration-300 flex items-center justify-center gap-3 group active:scale-[0.96] relative overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed">
                                            <span className="relative z-10">{isSubmitting ? 'Enviando...' : 'ENVIAR MENSAJE'}</span>
                                            <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center group-hover:translate-x-1 transition-all duration-300 relative z-10"><i className="fas fa-paper-plane text-[#0A0A0A] text-xs"></i></div>
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                                        </button>
                                    </div>

                                    <div className="rounded-xl border border-gray-200 bg-white px-3.5 py-3 text-[11px] text-gray-500 font-semibold leading-relaxed text-center">
                                        <div className="flex items-center justify-center gap-2">
                                            <i className="fas fa-lightbulb text-[#84CC16] flex-shrink-0"></i>
                                            <span>Te responderemos a la brevedad posible a través de WhatsApp.</span>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Ola de cierre (estilo FondoTech) */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] rotate-180 opacity-60 z-0">
                <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-[calc(100%+1.3px)] h-[80px] block">
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-[#A3E635]"></path>
                </svg>
            </div>
        </div>
    );
};

export default FormularioContacto;
