import React from 'react';
import FondoTech from '../../../components/fondos/FondoTech';

const CATEGORIAS = [
    {
        icon: 'fa-id-card',
        titulo: 'Datos de Identificación',
        ejemplo: 'Nombre, correo y teléfono; el perfil puede incluir datos adicionales.',
        detalles: 'Al crear una cuenta se solicitan nombre, correo y teléfono. El perfil también permite guardar identificación, fecha de nacimiento, institución educativa y foto.',
        items: ['Nombre y apellido', 'Correo y teléfono', 'Identificación y fecha de nacimiento', 'Institución y foto de perfil'],
        color: 'from-[#A3E635] to-[#84CC16]',
        badge: 'bg-[#A3E635]'
    },
    {
        icon: 'fa-location-dot',
        titulo: 'Datos de Contacto',
        ejemplo: 'Datos que compartís al escribirnos o solicitar atención.',
        detalles: 'El formulario de contacto solicita nombre, correo, teléfono, asunto y mensaje. La consulta se registra en el sistema y se envía al correo de atención configurado.',
        items: ['Nombre', 'Correo y teléfono', 'Asunto', 'Mensaje'],
        color: 'from-[#0A0A0A] to-[#171717]',
        badge: 'bg-[#0A0A0A]'
    },
    {
        icon: 'fa-credit-card',
        titulo: 'Datos de Pago',
        ejemplo: 'Información necesaria para acordar un servicio y su documentación.',
        detalles: 'El sitio no tiene un checkout ni un formulario para ingresar tarjetas. Los medios de pago y los datos de facturación se coordinan para cada proyecto.',
        items: ['Alcance acordado', 'Medio de pago coordinado', 'Datos de facturación si corresponden'],
        color: 'from-[#84CC16] to-[#A3E635]',
        badge: 'bg-[#84CC16]'
    },
    {
        icon: 'fa-mobile-screen-button',
        titulo: 'Datos de Uso',
        ejemplo: 'Datos técnicos que el sitio usa para mantener funciones de cuenta y preferencias.',
        detalles: 'La web usa almacenamiento de sesión para la cuenta y almacenamiento local para algunas preferencias y la foto de perfil. No encontramos herramientas de analítica o publicidad integradas en el código revisado.',
        items: ['Sesión de cuenta', 'Tema y color elegidos', 'Foto de perfil', 'Sin analítica integrada detectada'],
        color: 'from-[#171717] to-[#0A0A0A]',
        badge: 'bg-[#171717]'
    },
];

const DatosRecopilados = () => {
    return (
        <div className="relative">
            <section className="relative z-10 py-4">
                <FondoTech />
                <div className="container mx-auto px-6 max-w-7xl relative z-20">
                    <div className="text-center mb-4 relative z-10">
                        <span className="inline-block py-1.5 px-4 rounded-full bg-[#A3E635]/10 text-[#84CC16] text-[10px] font-black tracking-widest uppercase mb-4 border border-[#A3E635]/20">
                            <i className="fas fa-database text-[#84CC16] mr-1"></i> Qué Recopilamos
                        </span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading text-[#0A0A0A] mb-3 leading-tight">
                            Datos que <span className="relative inline-block text-[#84CC16]">
                                recopilamos
                                <svg className="absolute w-full h-3 -bottom-1.5 left-0 z-[-1] text-[#A3E635] drop-shadow-[0_0_8px_rgba(163,230,53,0.55)]" viewBox="0 0 200 12" preserveAspectRatio="none" fill="none"><path d="M8,8 C22,5 38,7.5 55,7.5 C130,7.5 165,7.5 188,7.5 C194,7.5 198,6 196,7.5" stroke="currentColor" strokeWidth="7" strokeLinecap="round"/></svg>
                            </span>
                        </h2>
                        <p className="text-slate-600 font-medium max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
                            Tocá cada categoría para conocer los detalles.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {CATEGORIAS.map((cat, i) => (
                            <details key={i} className="group bg-white rounded-[2rem] border border-gray-100 shadow-md overflow-hidden hover:shadow-lg transition-shadow relative">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#A3E635] via-[#84CC16] to-[#A3E635] opacity-70"></div>
                                <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-[#A3E635]/10 blur-2xl animate-float-slow pointer-events-none"></div>
                                <summary className="relative flex items-center gap-4 p-5 cursor-pointer list-none">
                                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-white shrink-0 shadow-lg group-hover:scale-105 transition-transform`}>
                                        <i className={`fas ${cat.icon} text-lg`}></i>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-black text-[#111827] text-sm sm:text-base">{cat.titulo}</h3>
                                        <p className="text-[11px] text-slate-600 font-semibold">{cat.ejemplo}</p>
                                    </div>
                                    <span className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border border-gray-100 ${cat.badge} text-white`}>
                                        <i className="fas fa-chevron-down text-[10px] transition-transform group-open:rotate-180"></i>
                                    </span>
                                </summary>
                                <div className="relative px-5 pb-5 pl-[76px]">
                                    <div className="mb-3 border-t border-dashed border-gray-100 pt-3">
                                        <p className="text-[12px] text-slate-600 font-semibold leading-relaxed">{cat.detalles}</p>
                                    </div>
                                    <div className="flex flex-wrap gap-1.5">
                                        {cat.items.map((item, j) => (
                                            <span key={j} className="px-3 py-1 rounded-full bg-[#A3E635]/10 text-[#0A0A0A] text-[10px] font-black uppercase tracking-wider border border-[#A3E635]/20">
                                                <i className="fas fa-circle-check text-[#84CC16] text-[9px] mr-1"></i>{item}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </details>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default DatosRecopilados;
