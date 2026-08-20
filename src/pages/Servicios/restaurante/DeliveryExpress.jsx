import React, { useState } from 'react';
import HeroServicio from './shared/HeroServicio';
import SeccionServicio from './shared/SeccionServicio';
import BeneficiosServicio from './shared/BeneficiosServicio';
import CtaServicio from './shared/CtaServicio';

const ZONAS = [
    { nombre: 'Zona 1 · Centro', tiempo: '20-25 min', costo: 'Bs. 10', color: 'bg-[#FF4D00]', desc: 'Centro, Casco Viejo, Prado.' },
    { nombre: 'Zona 2 · Equipetrol', tiempo: '25-30 min', costo: 'Bs. 12', color: 'bg-[#5D3A1F]', desc: 'Equipetrol, Urbarí, Los Sargentos.' },
    { nombre: 'Zona 3 · Norte', tiempo: '30-35 min', costo: 'Bs. 14', color: 'bg-[#8B4513]', desc: 'Av. Banzer, El Trompillo.' },
    { nombre: 'Zona 4 · Sur', tiempo: '35-40 min', costo: 'Bs. 16', color: 'bg-[#CC3D00]', desc: 'Zona Sur, Los Chobis.' },
];

const PASOS = [
    { icon: 'fa-phone', titulo: '1. Hacé tu pedido', desc: 'Llamanos o escribinos por WhatsApp con tu dirección.', color: 'bg-[#FF4D00]' },
    { icon: 'fa-clock', titulo: '2. Confirmamos', desc: 'Te confirmamos el tiempo exacto de entrega.', color: 'bg-[#5D3A1F]' },
    { icon: 'fa-motorcycle', titulo: '3. En camino', desc: 'Nuestro repartidor sale con tus salteñas calentitas.', color: 'bg-[#8B4513]' },
    { icon: 'fa-door-open', titulo: '4. Recibí y disfrutá', desc: 'Recibís en la puerta y disfrutás el mejor sabor.', color: 'bg-[#CC3D00]' },
];

const DeliveryExpress = () => {
    const [zonaActiva, setZonaActiva] = useState(0);

    return (
        <div className="relative overflow-hidden min-h-screen bg-[#fafafa]">
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#FFF6F6] rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-orange-50 rounded-full blur-[100px] pointer-events-none"></div>

            <HeroServicio
                titulo="Delivery"
                resaltado="Express."
                descripcion="Tus salteñas calentitas en la puerta de tu casa. Elegí tu zona y te las llevamos en minutos."
            />

            {/* Zonas de cobertura interactivas */}
            <SeccionServicio
                badge="Zonas de Cobertura"
                badgeIcon="fa-map-location-dot"
                titulo="¿Dónde"
                resaltado="llegamos?"
                descripcion="Tocá cada zona para ver el tiempo y costo de entrega. Cobertura amplia en toda la ciudad."
            >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {ZONAS.map((z, i) => (
                        <button key={i} onClick={() => setZonaActiva(i)} className={`relative rounded-[2rem] p-6 text-left transition-all duration-300 overflow-hidden ${zonaActiva === i ? `${z.color} text-white shadow-xl scale-[1.02] border-2 border-white` : 'bg-white text-[#111827] border-2 border-orange-50 hover:border-[#FF4D00]/30 shadow-md hover:shadow-lg hover:-translate-y-0.5'}`}>
                            <div className="absolute top-0 left-0 w-full h-1 bg-white/40" style={{ opacity: zonaActiva === i ? 1 : 0 }}></div>
                            <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-white/15 blur-2xl animate-float-slow pointer-events-none"></div>
                            <div className="absolute -bottom-12 -left-8 w-36 h-36 rounded-full bg-black/10 blur-2xl animate-float-medium pointer-events-none"></div>
                            <div className="relative z-10">
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl mb-3 ${zonaActiva === i ? 'bg-white/20 ring-1 ring-white/40' : 'bg-[#FFF6F6] text-[#FF4D00] ring-1 ring-orange-100'}`}><i className="fas fa-map-pin"></i></div>
                                <h3 className={`font-black text-sm mb-1 ${zonaActiva === i ? 'text-white' : 'text-[#111827]'}`}>{z.nombre}</h3>
                                <p className={`text-[11px] font-semibold mb-3 ${zonaActiva === i ? 'text-white/80' : 'text-slate-500'}`}>{z.desc}</p>
                                <div className="flex items-center justify-between">
                                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider ${zonaActiva === i ? 'bg-white/20 text-white' : 'bg-[#FF4D00]/10 text-[#FF4D00]'}`}><i className="fas fa-clock"></i>{z.tiempo}</span>
                                    <span className={`font-black text-lg ${zonaActiva === i ? 'text-amber-300' : 'text-[#FF4D00]'}`}>{z.costo}</span>
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </SeccionServicio>

            {/* Cómo funciona - pasos */}
            <SeccionServicio
                badge="Cómo Funciona"
                badgeIcon="fa-route"
                titulo="En 4 simples"
                resaltado="pasos"
                descripcion="Un proceso rápido y simple para que recibas tu pedido sin complicaciones."
            >
                <div className="relative">
                    <div className="absolute top-9 left-0 right-0 hidden md:block h-0.5 bg-gradient-to-r from-[#FF4D00] via-[#5D3A1F] to-[#FF4D00] opacity-30"></div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {PASOS.map((p, i) => (
                            <div key={i} className="relative text-center group">
                                <div className={`relative z-10 w-20 h-20 rounded-full ${p.color} text-white flex items-center justify-center text-2xl mx-auto mb-4 shadow-xl ring-4 ring-white group-hover:scale-110 transition-transform duration-300`}>
                                    <i className={`fas ${p.icon}`}></i>
                                    <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[#111827] text-white text-[10px] font-black flex items-center justify-center border-2 border-white">{i + 1}</span>
                                </div>
                                <div className="bg-white rounded-[1.5rem] p-5 border border-orange-50 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                                    <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-[#FF4D00]/10 blur-2xl animate-float-slow pointer-events-none"></div>
                                    <div className="relative z-10">
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
                    { icon: 'fa-fire', titulo: 'Siempre caliente', desc: 'Termos térmicos que mantienen tus salteñas a la temperatura perfecta.' },
                    { icon: 'fa-bolt', titulo: 'Rápido', desc: 'Entrega promedio de 30 minutos en toda la ciudad.' },
                    { icon: 'fa-location-dot', titulo: 'Seguimiento', desc: 'Te avisamos por WhatsApp cuando tu pedido está en camino.' },
                    { icon: 'fa-shield-halved', titulo: 'Entrega segura', desc: 'Repartidores verificados y empaques a prueba de derrames.' },
                ]}
                badge="Por Qué Elegirnos"
                titulo="Delivery de"
                resaltado="confianza"
            />

            <CtaServicio
                frase="Pedí tu delivery ahora y recibí las salteñas más ricas de Santa Cruz en tu puerta."
                gradiente="from-[#FF4D00] to-[#CC3D00]"
                whatsappTexto="Hola Los Castores! Quiero pedir delivery express"
            />
        </div>
    );
};

export default DeliveryExpress;
