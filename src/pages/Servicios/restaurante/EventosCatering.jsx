import React, { useState } from 'react';
import HeroServicio from './shared/HeroServicio';
import SeccionServicio from './shared/SeccionServicio';
import BeneficiosServicio from './shared/BeneficiosServicio';
import CtaServicio from './shared/CtaServicio';

const PAQUETES = [
    { nombre: 'Cumpleaños', personas: '10-20', precio: 'Desde Bs. 180', icon: 'fa-birthday-cake', color: 'bg-[#FF4D00]', soft: 'bg-[#FF4D00]/10 text-[#FF4D00] border-[#FF4D00]/25', items: ['Salteñas surtidas', 'Refrescos', 'Postres', 'Servilletas temáticas'], tags: ['Familiar', 'Íntimo'] },
    { nombre: 'Corporativo', personas: '20-50', precio: 'Desde Bs. 420', icon: 'fa-briefcase', color: 'bg-[#5D3A1F]', soft: 'bg-[#5D3A1F]/10 text-[#5D3A1F] border-[#5D3A1F]/25', items: ['Salteñas variadas', 'Bebidas calientes', 'Jugos', 'Montaje buffet'], tags: ['Empresas', 'Oficinas'] },
    { nombre: 'Boda / Evento', personas: '50+', precio: 'A medida', icon: 'fa-rings-wedding', color: 'bg-[#8B4513]', soft: 'bg-[#8B4513]/10 text-[#8B4513] border-[#8B4513]/25', items: ['Catering completo', 'Personal de servicio', 'Decoración', 'Coordinación'], tags: ['Gran escala', 'Premium'] },
];

const GALERIA = [
    { img: '/img/10_sucursales/SantaCruz/01_Sucursal.png', nombre: 'Cumpleaños', tag: 'Fiesta' },
    { img: '/img/10_sucursales/SantaCruz/02_Sucursal.png', nombre: 'Corporativo', tag: 'Empresa' },
    { img: '/img/05_Productos/Combos/Desayuno.png', nombre: 'Desayunos', tag: 'Mañana' },
    { img: '/img/10_sucursales/Cochabamba/01_Sucursal.png', nombre: 'Reuniones', tag: 'Social' },
    { img: '/img/10_sucursales/Cochabamba/04_Sucursal.png', nombre: 'Cenas', tag: 'Noche' },
    { img: '/img/05_Productos/Postres/SundaeVainilla.png', nombre: 'Postres', tag: 'Dulce' },
];

const EventosCatering = () => {
    const [activo, setActivo] = useState(1);

    return (
        <div className="relative overflow-hidden min-h-screen bg-[#fafafa]">
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#FFF6F6] rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-orange-50 rounded-full blur-[100px] pointer-events-none"></div>

            <HeroServicio
                titulo="Eventos y"
                resaltado="Catering."
                descripcion="Hacé de tu evento un momento inolvidable con el mejor sabor. Salteñas para cumpleaños, eventos corporativos y celebraciones."
            />

            {/* Paquetes de eventos */}
            <SeccionServicio
                badge="Paquetes"
                badgeIcon="fa-glass-cheers"
                titulo="Elegí tu"
                resaltado="evento"
                descripcion="Tocá cada paquete para ver todo lo que incluye. Cada opción se adapta al tamaño de tu celebración."
            >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {PAQUETES.map((p, i) => {
                        const isActive = activo === i;
                        return (
                            <button key={i} onClick={() => setActivo(i)} className={`relative rounded-[2rem] p-6 sm:p-7 transition-all duration-500 group overflow-hidden border hover:-translate-y-1.5 z-10 text-center ${isActive ? `${p.color} text-white shadow-2xl scale-[1.02] border-white` : 'bg-white text-[#111827] border-orange-50 shadow-md hover:border-[#FF4D00]/40 hover:shadow-lg'}`}>
                                <div className="absolute top-0 left-0 w-full h-1 bg-white/40" style={{ opacity: isActive ? 1 : 0 }}></div>
                                <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-white/15 blur-2xl animate-float-slow pointer-events-none"></div>
                                <div className="absolute -bottom-12 -left-8 w-36 h-36 rounded-full bg-black/10 blur-2xl animate-float-medium pointer-events-none"></div>
                                <div className="relative z-10">
                                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl mb-4 mx-auto ${isActive ? 'bg-white/20 ring-1 ring-white/40 text-white' : 'bg-[#FFF6F6] text-[#FF4D00] ring-1 ring-orange-100'}`}>
                                        <i className={`fas ${p.icon}`}></i>
                                    </div>
                                    <h3 className={`text-xl font-black mb-1 ${isActive ? 'text-white' : 'text-[#8B4513]'}`}>{p.nombre}</h3>
                                    <p className={`text-[11px] font-black uppercase tracking-wider mb-2 ${isActive ? 'text-white/70' : 'text-slate-400'}`}>
                                        <i className="fas fa-users text-[9px] mr-1"></i>Para {p.personas} personas
                                    </p>
                                    <p className={`text-2xl font-black font-heading mb-3 ${isActive ? 'text-amber-300' : 'text-[#FF4D00]'}`}>{p.precio}</p>

                                    {/* Tags */}
                                    <div className="flex flex-wrap justify-center gap-1.5 mb-3">
                                        {p.tags.map((tag, j) => (
                                            <span key={j} className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-wider ${isActive ? 'bg-white/15 text-amber-300 border border-white/25' : p.soft}`}>
                                                <i className="fas fa-tag text-[7px] mr-1"></i>{tag}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Items */}
                                    <div className="space-y-1.5 pt-3 border-t border-dashed" style={{ borderColor: isActive ? 'rgba(255,255,255,0.3)' : 'rgba(255,77,0,0.15)' }}>
                                        {p.items.map((item, j) => (
                                            <p key={j} className={`text-[11px] font-semibold flex items-center justify-center gap-1.5 ${isActive ? 'text-white/85' : 'text-slate-500'}`}>
                                                <i className={`fas fa-check ${isActive ? 'text-amber-300' : 'text-[#FF4D00]'} text-[9px]`}></i>{item}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </SeccionServicio>

            {/* Galería de eventos */}
            <SeccionServicio
                badge="Nuestros Eventos"
                badgeIcon="fa-images"
                titulo="Momentos"
                resaltado="especiales"
                descripcion="Así se viven nuestros eventos: ambiente, sabor y atención de primera en cada celebración."
            >
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {GALERIA.map((g, i) => (
                        <div key={i} className="group relative rounded-[2rem] overflow-hidden shadow-lg border-2 border-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                            <img src={g.img} alt={g.nombre} className="w-full h-36 sm:h-44 object-cover group-hover:scale-110 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent"></div>
                            <span className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-[#FF4D00] text-white text-[8px] font-black uppercase tracking-wider shadow-md">{g.tag}</span>
                            <p className="absolute bottom-3 left-3 text-white font-black text-xs">{g.nombre}</p>
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40">
                                <span className="px-4 py-2 rounded-full bg-white text-[#FF4D00] font-black text-[9px] uppercase tracking-wider shadow-xl flex items-center gap-1.5">
                                    <i className="fas fa-eye text-[9px]"></i> Ver
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </SeccionServicio>

            <BeneficiosServicio
                beneficios={[
                    { icon: 'fa-users', titulo: 'Personal dedicado', desc: 'Equipo de servicio que se encarga de todo.' },
                    { icon: 'fa-clock', titulo: 'Puntualidad', desc: 'Todo listo en la hora acordada para tu evento.' },
                    { icon: 'fa-star', titulo: 'Sabor que impresiona', desc: 'La misma calidad que nos hace famosos.' },
                    { icon: 'fa-gift', titulo: 'Detalles extra', desc: 'Decoración y presentación de nivel profesional.' },
                ]}
                badge="Por Qué Elegirnos"
                titulo="Hacé de tu evento"
                resaltado="algo especial"
            />

            <CtaServicio
                frase="Contanos sobre tu evento y te armamos una propuesta a medida, con el mejor sabor de Santa Cruz."
                gradiente="from-[#8B4513] via-[#5D3A1F] to-[#452A16]"
                whatsappTexto="Hola HagamosTech! Quiero cotizar catering para mi evento"
                badges={[
                    { icon: 'fa-users', label: '10 a 100+ personas', color: 'bg-[#FF4D00]' },
                    { icon: 'fa-gift', label: 'Catering completo', color: 'bg-[#5D3A1F]' },
                    { icon: 'fa-star', label: 'Sabor que impresiona', color: 'bg-[#8B4513]' },
                ]}
            />
        </div>
    );
};

export default EventosCatering;
