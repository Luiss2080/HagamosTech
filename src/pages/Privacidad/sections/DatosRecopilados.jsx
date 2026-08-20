import React from 'react';
import CircuitBackground from '../../../components/fondos/FondoSaltenas';

const CATEGORIAS = [
    {
        icon: 'fa-id-card',
        titulo: 'Datos de Identificación',
        ejemplo: 'Nombre, apellido, correo electrónico y número de celular.',
        detalles: 'Los solicitamos al registrarte, al hacer pedidos o al contactarnos. Son necesarios para procesar tus órdenes y mantenerte informado.',
        items: ['Nombre y apellido', 'Correo electrónico', 'Número de celular', 'Preferencias de sabor'],
        color: 'from-[#FF4D00] to-[#CC3D00]',
        badge: 'bg-[#FF4D00]'
    },
    {
        icon: 'fa-location-dot',
        titulo: 'Datos de Ubicación',
        ejemplo: 'Dirección de entrega para el servicio de delivery.',
        detalles: 'Usamos tu dirección solo para coordinar la entrega de tus pedidos. Nunca compartimos tu ubicación con terceros.',
        items: ['Dirección de entrega', 'Referencias de tu zona', 'Zona de cobertura'],
        color: 'from-[#5D3A1F] to-[#452A16]',
        badge: 'bg-[#5D3A1F]'
    },
    {
        icon: 'fa-credit-card',
        titulo: 'Datos de Pago',
        ejemplo: 'Información de facturación y métodos de pago utilizados.',
        detalles: 'Los pagos se procesan a través de plataformas seguras. No almacenamos números de tarjetas en nuestros servidores.',
        items: ['Historial de compras', 'Método de pago utilizado', 'NIT para facturación'],
        color: 'from-[#8B4513] to-[#6B3410]',
        badge: 'bg-[#8B4513]'
    },
    {
        icon: 'fa-mobile-screen-button',
        titulo: 'Datos de Uso',
        ejemplo: 'Cómo interactuás con nuestro sitio y tus preferencias.',
        detalles: 'Analizamos la navegación para mejorar nuestra web y personalizar tu experiencia. Los datos son anónimos y agregados.',
        items: ['Páginas visitadas', 'Productos favoritos', 'Tiempo de visita'],
        color: 'from-[#CC3D00] to-[#AA3000]',
        badge: 'bg-[#CC3D00]'
    },
];

const DatosRecopilados = () => {
    return (
        <div className="relative">
            <section className="relative z-10 py-4">
                <CircuitBackground />
                <div className="container mx-auto px-6 max-w-7xl relative z-20">
                    <div className="text-center mb-4 relative z-10">
                        <span className="inline-block py-1.5 px-4 rounded-full bg-[#5D3A1F]/10 text-[#5D3A1F] text-[10px] font-black tracking-widest uppercase mb-4 border border-[#5D3A1F]/20">
                            <i className="fas fa-database text-[#5D3A1F] mr-1"></i> Qué Recopilamos
                        </span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading text-[#8B4513] mb-3 leading-tight">
                            Datos que <span className="relative inline-block text-[#FF4D00]">
                                recopilamos
                                <svg className="absolute w-full h-3 -bottom-1.5 left-0 z-[-1] text-amber-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.55)]" viewBox="0 0 200 12" preserveAspectRatio="none" fill="none"><path d="M8,8 C22,5 38,7.5 55,7.5 C130,7.5 165,7.5 188,7.5 C194,7.5 198,6 196,7.5" stroke="currentColor" strokeWidth="7" strokeLinecap="round"/></svg>
                            </span>
                        </h2>
                        <p className="text-[#1F2937] font-medium max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
                            Tocá cada categoría para conocer los detalles.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {CATEGORIAS.map((cat, i) => (
                            <details key={i} className="group bg-white rounded-[2rem] border border-orange-50 shadow-md overflow-hidden hover:shadow-lg transition-shadow relative">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FF4D00] via-[#8B4513] to-[#FF4D00] opacity-70"></div>
                                <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-[#FF4D00]/10 blur-2xl animate-float-slow pointer-events-none"></div>
                                <summary className="relative flex items-center gap-4 p-5 cursor-pointer list-none">
                                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-white shrink-0 shadow-lg group-hover:scale-105 transition-transform`}>
                                        <i className={`fas ${cat.icon} text-lg`}></i>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-black text-[#111827] text-sm sm:text-base">{cat.titulo}</h3>
                                        <p className="text-[11px] text-slate-600 font-semibold">{cat.ejemplo}</p>
                                    </div>
                                    <span className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border border-orange-100 ${cat.badge} text-white`}>
                                        <i className="fas fa-chevron-down text-[10px] transition-transform group-open:rotate-180"></i>
                                    </span>
                                </summary>
                                <div className="relative px-5 pb-5 pl-[76px]">
                                    <div className="mb-3 border-t border-dashed border-orange-100 pt-3">
                                        <p className="text-[12px] text-[#374151] font-semibold leading-relaxed">{cat.detalles}</p>
                                    </div>
                                    <div className="flex flex-wrap gap-1.5">
                                        {cat.items.map((item, j) => (
                                            <span key={j} className="px-3 py-1 rounded-full bg-[#FFF6F6] text-[#8B4513] text-[10px] font-black uppercase tracking-wider border border-orange-100">
                                                <i className="fas fa-circle-check text-[#FF4D00] text-[9px] mr-1"></i>{item}
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
