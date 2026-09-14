import React, { useEffect } from 'react';
import CircleParticles from '../fondos/ParticulasCirculares';

const TERMS_SECTIONS = [
    {
        title: '1. Servicios y soluciones',
        text: 'HAGAMOSTECH ofrece soluciones digitales y tecnológicas: apoyo académico, servicios para emprendedores y negocios, empleo y desarrollo profesional, diseño gráfico, desarrollo web y e-commerce, software y hardware, automatización e inteligencia artificial, y soluciones a medida. Al contratar cualquiera de estos servicios, el cliente acepta las condiciones aquí descritas.',
    },
    {
        title: '2. Contratación y acceso a servicios',
        text: 'La contratación de un servicio se confirma una vez acordado el alcance y realizado el pago o la primera cuota. El inicio del trabajo o el acceso a la entrega se habilita en un plazo máximo de 24 horas hábiles tras la confirmación.',
    },
    {
        title: '3. Entregables y propiedad intelectual',
        text: 'Los entregables (diseños, documentos, sitios, software, material académico) son para uso del cliente según el alcance acordado. No está permitida su reproducción, distribución o comercialización no autorizada. La propiedad intelectual del código fuente se transfiere al cliente una vez completado el pago del proyecto, salvo acuerdo distinto.',
    },
    {
        title: '4. Desarrollo de software y páginas web',
        text: 'Los proyectos de desarrollo se rigen por una propuesta que detalla alcance, entregables, plazos y condiciones de pago. Los cambios fuera del alcance acordado se cotizan por separado.',
    },
    {
        title: '5. Pagos y facturación',
        text: 'Se aceptan pagos en efectivo, transferencia bancaria, QR y tarjeta de débito/crédito. La facturación se realiza con los datos fiscales proporcionados por el cliente. Los precios pueden variar sin previo aviso, respetando el valor confirmado al momento de la contratación.',
    },
    {
        title: '6. Política de reembolsos y cambios',
        text: 'Los servicios de consultoría tienen un período de retractación de 3 días hábiles después de la contratación. El desarrollo de software a medida no tiene reembolso una vez iniciado el trabajo.',
    },
    {
        title: '7. Datos personales y privacidad',
        text: 'Los datos proporcionados por el cliente se utilizan exclusivamente para fines comerciales y de soporte relacionados con los servicios contratados. No compartimos información personal con terceros sin consentimiento explícito.',
    },
    {
        title: '8. Contacto y soporte',
        text: 'Para consultas sobre términos, pagos, soporte técnico o garantías, contáctanos al WhatsApp +591 61320004 o al correo contacto@hagamostech.bo. Nuestro horario de atención es lunes a sábado de 9:00 a 19:00.',
    },
];

const TerminosModal = ({ isOpen, onClose }) => {
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

    if (!isOpen) return null;

    return (
        <div id="termsModal" className="tyr-modal fixed inset-0 z-[100]" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity duration-300" onClick={onClose}></div>
            <div 
                className="fixed inset-0 z-[101]"
                onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
            >
                <div 
                    className="flex min-h-screen items-center justify-center p-4 text-center sm:p-0"
                    onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
                >
                    <div                      className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto scrollbar-none transform rounded-[2.5rem] bg-[#111827] text-left shadow-2xl transition-all sm:my-8 animate-modal-pop border border-white/10">
                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 z-[200] w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/5 dark:hover:bg-red-950/30 text-slate-400 hover:text-red-500 transition-all focus:outline-none cursor-pointer shadow-sm hover:shadow-md border border-white/10"
                        >
                            <i className="fas fa-times text-xl"></i>
                        </button>
                        <div className="grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
                            <div className="relative hidden lg:flex flex-col justify-center gap-6 p-6 lg:p-8 overflow-hidden bg-[#A3E635]">
                                <div className="absolute inset-0 z-0 pointer-events-none">
                                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#111827]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                                    <div className="absolute bottom-0 left-0 w-[420px] h-[420px] bg-black/30 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4"></div>
                                    <CircleParticles colorScheme="red" />
                                </div>

                                <div className="relative z-10 flex flex-col items-center text-center">
                                    <div className="mb-5 inline-flex items-center justify-center rounded-[2rem] bg-white/20 p-3 shadow-2xl ring-[0.5px] ring-white backdrop-blur-md">
                                        <div className="h-32 w-32 rounded-2xl bg-[#111827] flex items-center justify-center shadow-lg">
                                            <i className="fas fa-file-contract text-5xl text-[#A3E635]"></i>
                                        </div>
                                    </div>

                                    <h2 className="text-3xl font-black text-white leading-tight mb-2 tracking-tight drop-shadow-lg">
                                        Terminos y <br />
                                        <span className="text-[#A3E635] relative inline-block">
                                            Condiciones
                                            <svg className="absolute w-full h-2.5 -bottom-1 left-0 z-[-1] text-lime-400/40" viewBox="0 0 200 12" preserveAspectRatio="none" fill="none"><path d="M8,8 C22,5 38,7.5 55,7.5 C130,7.5 165,7.5 188,7.5 C194,7.5 198,6 196,7.5" stroke="currentColor" strokeWidth="7" strokeLinecap="round"  /></svg>
                                        </span>
                                    </h2>

                                    <p className="text-sm text-white/90 font-medium max-w-sm leading-relaxed mb-5 drop-shadow-md">
                                        Informacion legal para clientes HAGAMOSTECH sobre servicios, pagos, garantias y entregas.
                                    </p>

                                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#111827] border border-[#A3E635]/30 text-[#A3E635] text-[10px] font-black uppercase tracking-widest mb-5 shadow-lg">
                                        <span className="w-2 h-2 rounded-full bg-[#A3E635] animate-ping"></span> Actualizado Junio 2026
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-sm mb-4">
                                        <div className="rounded-xl border border-[#A3E635]/30 bg-[#111827]/40 px-3 py-2 text-left backdrop-blur-sm">
                                            <p className="text-[9px] font-black uppercase tracking-widest text-[#A3E635]"><i className="fas fa-shield-halved mr-1"></i> Garantias</p>
                                            <p className="text-xs font-bold text-white">Cobertura vigente</p>
                                        </div>
                                        <div className="rounded-xl border border-[#A3E635]/30 bg-[#111827]/40 px-3 py-2 text-left backdrop-blur-sm">
                                            <p className="text-[9px] font-black uppercase tracking-widest text-[#A3E635]"><i className="fas fa-credit-card mr-1"></i> Pagos</p>
                                            <p className="text-xs font-bold text-white">Condiciones claras</p>
                                        </div>
                                        <div className="rounded-xl border border-[#A3E635]/30 bg-[#111827]/40 px-3 py-2 text-left backdrop-blur-sm">
                                            <p className="text-[9px] font-black uppercase tracking-widest text-[#A3E635]"><i className="fas fa-lock mr-1"></i> Privacidad</p>
                                            <p className="text-xs font-bold text-white">Datos seguros</p>
                                        </div>
                                        <div className="rounded-xl border border-[#A3E635]/30 bg-[#111827]/40 px-3 py-2 text-left backdrop-blur-sm">
                                            <p className="text-[9px] font-black uppercase tracking-widest text-[#A3E635]"><i className="fas fa-headset mr-1"></i> Soporte</p>
                                            <p className="text-xs font-bold text-white">Post-venta</p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="w-full mt-auto pt-2 flex flex-col items-center">
                                    <p className="text-[9px] font-black text-white/60 uppercase tracking-[0.2em] mb-2">Conecta con HAGAMOSTECH</p>
                                    <div className="flex justify-center gap-3">
                                        {[
                                            { icon: 'fa-facebook-f', link: 'https://www.facebook.com/HagamosTech' },
                                            { icon: 'fa-instagram', link: 'https://www.instagram.com/hagamostech/' },
                                            { icon: 'fa-tiktok', link: 'https://www.tiktok.com/@hagamostech' },
                                            { icon: 'fa-whatsapp', link: 'https://wa.me/59161320004' },
                                        ].map((item, i) => (
                                            <a key={i} href={item.link} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-[#111827] hover:text-[#A3E635] transition-all duration-300 shadow-lg hover:-translate-y-1">
                                                <i className={`fab ${item.icon} text-[13px]`}></i>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="relative flex flex-col justify-center h-full bg-[#111111] p-8 lg:p-10">
                                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                                    <div className="absolute -top-10 -right-10 w-64 h-64 bg-[#A3E635]/10 rounded-full blur-3xl"></div>
                                    <div className="absolute top-1/2 -left-10 w-40 h-40 bg-[#111827]/20 rounded-full blur-2xl"></div>
                                    <div className="absolute bottom-0 right-10 w-56 h-56 bg-[#A3E635]/10 rounded-full blur-3xl"></div>
                                    <CircleParticles colorScheme="light" />
                                </div>

                                <div className="relative z-10 w-full max-w-[560px] mx-auto">
                                    <div className="mb-5 text-center bg-[#111827] p-5 rounded-2xl shadow-sm border border-white/10 relative overflow-hidden">
                                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#A3E635] via-[#d97706] to-[#A3E635]"></div>
                                        <div className="inline-flex items-center gap-2 mb-1.5">
                                            <span className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 text-[#A3E635] flex items-center justify-center">
                                                <i className="fas fa-scale-balanced text-sm"></i>
                                            </span>
                                            <h3 className="text-2xl font-black text-white tracking-tight">Terminos y Condiciones</h3>
                                        </div>
                                        <p className="text-xs text-slate-400 font-bold uppercase tracking-wide">Servicios claros en HAGAMOSTECH</p>
                                    </div>

                                    <div className="rounded-2xl border border-white/10 bg-[#111827] p-4 shadow-sm max-h-[56vh] overflow-y-auto space-y-3">
                                        {TERMS_SECTIONS.map((section) => (
                                            <article key={section.title} className="rounded-xl border border-white/10 bg-[#111827] p-4">
                                                <h4 className="text-sm font-black text-white uppercase tracking-wide mb-1.5">{section.title}</h4>
                                                <p className="text-sm text-slate-300 font-medium leading-relaxed">{section.text}</p>
                                            </article>
                                        ))}
                                    </div>

                                    <div className="mt-4 rounded-xl border border-white/10 bg-[#111827] px-3.5 py-3 text-[11px] text-slate-400 font-semibold leading-relaxed">
                                        <div className="flex items-start gap-2">
                                            <i className="fas fa-circle-info text-[#A3E635] mt-0.5"></i>
                                            <span>Al continuar navegando y contratando servicios en HAGAMOSTECH, aceptas estas condiciones comerciales y legales.</span>
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

export default TerminosModal;
