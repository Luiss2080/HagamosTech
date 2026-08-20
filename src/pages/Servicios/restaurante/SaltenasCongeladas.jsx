import React, { useState } from 'react';
import HeroServicio from './shared/HeroServicio';
import SeccionServicio from './shared/SeccionServicio';
import BeneficiosServicio from './shared/BeneficiosServicio';
import CtaServicio from './shared/CtaServicio';

const PACKS = [
    { nombre: 'Pack Precocidas', precio: 'Bs. 40', img: '/img/05_Productos/Salteñas/PrecocidasCongeladas.png', color: 'bg-[#FF4D00]', soft: 'bg-[#FF4D00]/10 text-[#FF4D00] border-[#FF4D00]/25', items: ['6 unidades', 'Precocidas', 'Horneá 25 min', 'Masa crocante'], tags: ['Rápido', 'Listas'] },
    { nombre: 'Pack Crudas', precio: 'Bs. 35', img: '/img/05_Productos/Salteñas/CrudasCongeladas.png', color: 'bg-[#5D3A1F]', soft: 'bg-[#5D3A1F]/10 text-[#5D3A1F] border-[#5D3A1F]/25', items: ['6 unidades', 'Crudas', 'Horneá a tu gusto', 'Sabor original'], tags: ['Artesanal', 'Sabor'] },
    { nombre: 'Pack Mixto', precio: 'Bs. 75', img: '/img/05_Productos/Salteñas/ComboPacata.png', color: 'bg-[#8B4513]', soft: 'bg-[#8B4513]/10 text-[#8B4513] border-[#8B4513]/25', items: ['12 unidades', 'Precocidas + crudas', 'Sabores surtidos', 'Ideal para regalar'], tags: ['Para compartir', 'Regalo'] },
];

const PASOS_HORNEADO = [
    { icon: 'fa-temperature-low', titulo: 'Precalentá', desc: 'Horno a 200°C, esperá 10 minutos.', tiempo: '10 min', color: 'bg-[#FF4D00]' },
    { icon: 'fa-clock', titulo: 'Horneá', desc: '25-30 minutos hasta que estén doradas.', tiempo: '25-30 min', color: 'bg-[#5D3A1F]' },
    { icon: 'fa-fire', titulo: 'Disfrutá', desc: 'Sacalas, esperá 2 minutos y listo.', tiempo: '2 min', color: 'bg-[#8B4513]' },
];

const SaltenasCongeladas = () => {
    const [activo, setActivo] = useState(1);
    const [cantidad, setCantidad] = useState(1);
    const pack = PACKS[activo];
    const packPrecio = parseInt(pack.precio.replace('Bs. ', ''));
    const total = packPrecio * cantidad;

    return (
        <div className="relative overflow-hidden min-h-screen bg-[#fafafa]">
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#FFF6F6] rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-orange-50 rounded-full blur-[100px] pointer-events-none"></div>

            <HeroServicio
                titulo="Salteñas"
                resaltado="Congeladas."
                descripcion="Llevate el auténtico sabor de HagamosTech a casa. Packs congelados para hornear en minutos, en cualquier ciudad."
            />

            {/* Packs */}
            <SeccionServicio
                badge="Packs para Llevar"
                badgeIcon="fa-snowflake"
                titulo="Elegí tu"
                resaltado="pack"
                descripcion="Tocá cada pack para ver su contenido y elegí la cantidad que necesitás."
            >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
                    {/* Selector de packs (7 cols) */}
                    <div className="lg:col-span-7 flex flex-col gap-3">
                        {PACKS.map((p, i) => {
                            const isActive = activo === i;
                            return (
                                <button key={i} onClick={() => setActivo(i)} className={`relative flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all duration-300 overflow-hidden ${isActive ? `${p.color} text-white shadow-lg scale-[1.01] border-white` : 'bg-white text-[#111827] border-orange-50 hover:border-[#FF4D00]/40 shadow-sm hover:shadow-md'}`}>
                                    <div className="absolute top-0 left-0 w-full h-0.5 bg-white/40" style={{ opacity: isActive ? 1 : 0 }}></div>
                                    <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-white/15 blur-2xl animate-float-slow pointer-events-none"></div>
                                    <div className="relative z-10 w-20 h-20 rounded-2xl overflow-hidden shrink-0 border-2 border-white/50">
                                        <img src={p.img} alt={p.nombre} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="relative z-10 flex-1 min-w-0">
                                        <div className="flex items-center gap-2 flex-wrap mb-1">
                                            <h3 className={`font-black text-base ${isActive ? 'text-white' : 'text-[#8B4513]'}`}>{p.nombre}</h3>
                                            <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-wider ${isActive ? 'bg-white/15 text-amber-300 border border-white/25' : p.soft}`}>{p.precio}</span>
                                        </div>
                                        <p className={`text-[10px] font-semibold mb-2 ${isActive ? 'text-white/80' : 'text-slate-500'}`}>{p.items.slice(0, 2).join(' · ')}</p>
                                        <div className="flex flex-wrap gap-1.5">
                                            {p.tags.map((tag, j) => (
                                                <span key={j} className={`px-2 py-0.5 rounded-full text-[7px] font-black uppercase tracking-wider ${isActive ? 'bg-white/15 text-white border border-white/20' : 'bg-[#FFF6F6] text-[#8B4513] border border-orange-100'}`}>
                                                    <i className="fas fa-tag text-[6px] mr-1"></i>{tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <span className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center shrink-0 border ${isActive ? 'bg-white/20 text-white border-white/30' : 'border-orange-100 text-[#FF4D00]'}`}>
                                        <i className={`fas ${isActive ? 'fa-circle-check' : 'fa-circle'} text-sm`}></i>
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Detalle del pack activo (5 cols) */}
                    <div className="lg:col-span-5 relative">
                        <div className={`relative rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white min-h-[320px] flex flex-col justify-center p-7 text-white text-center h-full ${pack.color}`}>
                            <div className="absolute top-0 left-0 w-full h-1 bg-white/40"></div>
                            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/15 blur-3xl animate-float-slow pointer-events-none"></div>
                            <div className="absolute -bottom-12 -left-8 w-44 h-44 rounded-full bg-black/10 blur-3xl animate-float-medium pointer-events-none"></div>
                            <div className="relative z-10">
                                <div className="w-20 h-20 rounded-full bg-white/15 border border-white/25 flex items-center justify-center text-3xl mx-auto mb-4 shadow-xl">
                                    <i className="fas fa-snowflake text-amber-300"></i>
                                </div>
                                <p className="text-[9px] font-black uppercase tracking-widest text-white/70 mb-1">Tu pack seleccionado</p>
                                <h3 className="text-2xl font-black font-heading mb-3">{pack.nombre}</h3>

                                <div className="flex flex-wrap justify-center gap-1.5 mb-4">
                                    {pack.items.map((item, j) => (
                                        <span key={j} className="px-2.5 py-1 rounded-full bg-white/15 border border-white/25 text-[8px] font-black uppercase tracking-wider">
                                            <i className="fas fa-check text-amber-300 text-[7px] mr-1"></i>{item}
                                        </span>
                                    ))}
                                </div>

                                <p className="text-[9px] font-black uppercase tracking-widest text-white/70 mb-1.5">Cantidad</p>
                                <div className="flex items-center justify-center gap-3 mb-4">
                                    <button onClick={() => setCantidad(Math.max(1, cantidad - 1))} className="w-10 h-10 rounded-xl bg-white/15 hover:bg-white/25 border border-white/30 text-white font-black flex items-center justify-center transition-all hover:scale-105 active:scale-95"><i className="fas fa-minus text-sm"></i></button>
                                    <span className="w-12 text-center text-2xl font-black text-white">{cantidad}</span>
                                    <button onClick={() => setCantidad(cantidad + 1)} className="w-10 h-10 rounded-xl bg-white/15 hover:bg-white/25 border border-white/30 text-white font-black flex items-center justify-center transition-all hover:scale-105 active:scale-95"><i className="fas fa-plus text-sm"></i></button>
                                </div>

                                <div className="flex items-center justify-center gap-3 mb-5">
                                    <span className="text-lg font-black text-white/50 line-through">Bs. {packPrecio * 2 * cantidad}</span>
                                    <span className="text-4xl font-black font-heading text-amber-300">Bs. {total}</span>
                                </div>

                                <a href="https://wa.me/59161320004" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#FF4D00] rounded-full font-black text-[10px] uppercase tracking-[0.15em] shadow-lg transition-all hover:-translate-y-0.5 active:scale-95">
                                    <i className="fab fa-whatsapp"></i> Pedir {cantidad} pack{cantidad > 1 ? 's' : ''}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </SeccionServicio>

            {/* Cómo hornear */}
            <SeccionServicio
                badge="Cómo Hornear"
                badgeIcon="fa-fire-burner"
                titulo="Del freezer a tu"
                resaltado="mesa"
                descripcion="Tres pasos simples y en menos de 30 minutos tenés salteñas recién horneadas."
            >
                <div className="relative">
                    <div className="absolute top-9 left-0 right-0 hidden md:block h-0.5 bg-gradient-to-r from-[#FF4D00] via-[#5D3A1F] to-[#FF4D00] opacity-30"></div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                        {PASOS_HORNEADO.map((p, i) => (
                            <div key={i} className="relative text-center group">
                                <div className={`relative z-10 w-20 h-20 rounded-full ${p.color} text-white flex items-center justify-center text-2xl mx-auto mb-4 shadow-xl ring-4 ring-white group-hover:scale-110 transition-transform duration-300`}>
                                    <i className={`fas ${p.icon}`}></i>
                                    <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[#111827] text-white text-[10px] font-black flex items-center justify-center border-2 border-white">{i + 1}</span>
                                </div>
                                <div className="bg-white rounded-[1.5rem] p-5 border border-orange-50 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                                    <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-[#FF4D00]/10 blur-2xl animate-float-slow pointer-events-none"></div>
                                    <div className="relative z-10">
                                        <span className={`inline-block px-2.5 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${p.color} text-white mb-2`}>
                                            <i className="fas fa-hourglass-half mr-1 text-[8px]"></i>{p.tiempo}
                                        </span>
                                        <h4 className="font-black text-[#111827] text-sm mb-1">{p.titulo}</h4>
                                        <p className="text-[11px] text-slate-600 font-semibold leading-relaxed">{p.desc}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </SeccionServicio>

            <BeneficiosServicio
                beneficios={[
                    { icon: 'fa-truck', titulo: 'Envíos a ciudades', desc: 'Enviamos packs a Cochabamba y Oruro.' },
                    { icon: 'fa-snowflake', titulo: 'Cadena de frío', desc: 'Llegan congelados y en perfecto estado.' },
                    { icon: 'fa-clock', titulo: 'Siempre listas', desc: 'Tené salteñas frescas en solo 25 minutos.' },
                    { icon: 'fa-gift', titulo: 'Ideal para regalar', desc: 'El regalo perfecto para los amantes del sabor.' },
                ]}
                badge="Por Qué Elegirlas"
                titulo="Sabor en cualquier"
                resaltado="ciudad"
            />

            <CtaServicio
                frase="Pedí tus packs congelados y llevá el sabor de HagamosTech donde vayas. El horno de tu casa es el secreto."
                gradiente="from-[#8B4513] via-[#5D3A1F] to-[#452A16]"
                whatsappTexto="Hola HagamosTech! Quiero pedir salteñas congeladas"
                badges={[
                    { icon: 'fa-snowflake', label: 'Cadena de frío', color: 'bg-[#FF4D00]' },
                    { icon: 'fa-clock', label: 'Listas en 25 min', color: 'bg-[#5D3A1F]' },
                    { icon: 'fa-truck', label: 'Envíos a ciudades', color: 'bg-[#8B4513]' },
                ]}
            />
        </div>
    );
};

export default SaltenasCongeladas;
