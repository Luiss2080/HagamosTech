import React, { useState } from 'react';
import HeroServicio from './shared/HeroServicio';
import SeccionServicio from './shared/SeccionServicio';
import BeneficiosServicio from './shared/BeneficiosServicio';
import CtaServicio from './shared/CtaServicio';

const PLANES = [
    { nombre: 'Desayunos Semanales', precio: 'Bs. 350/sem', icon: 'fa-mug-hot', color: 'bg-[#FF4D00]', soft: 'bg-[#FF4D00]/10 text-[#FF4D00] border-[#FF4D00]/25', popular: false, items: ['5 desayunos a la semana', 'Salteña + café + jugo', 'Entrega antes de las 8am', 'Mensualidad flexible'], tags: ['Diario', 'Equipos'] },
    { nombre: 'Lunes de Salteñas', precio: 'Bs. 120/sem', icon: 'fa-fire', color: 'bg-[#5D3A1F]', soft: 'bg-[#5D3A1F]/10 text-[#5D3A1F] border-[#5D3A1F]/25', popular: true, items: ['Salteñas todos los lunes', '10% de descuento', 'Factura mensual', 'Soporte dedicado'], tags: ['Popular', 'Semanal'] },
    { nombre: 'Plan Ejecutivo', precio: 'A medida', icon: 'fa-briefcase', color: 'bg-[#8B4513]', soft: 'bg-[#8B4513]/10 text-[#8B4513] border-[#8B4513]/25', popular: false, items: ['Atención personalizada', 'Pedidos ilimitados', 'Eventos internos', 'Cuenta corporativa'], tags: ['Premium', 'A medida'] },
];

const TAMANOS = [5, 10, 20, 50, 100];

const ServicioCorporativo = () => {
    const [activo, setActivo] = useState(1);
    const [empleados, setEmpleados] = useState(20);

    const costoSaltena = 8;
    const descuentoEmpresa = empleados >= 50 ? 0.2 : empleados >= 20 ? 0.15 : empleados >= 10 ? 0.1 : 0.05;
    const ahorroSemanal = Math.round(empleados * costoSaltena * 5 * descuentoEmpresa);
    const ahorroMensual = ahorroSemanal * 4;

    return (
        <div className="relative overflow-hidden min-h-screen bg-[#fafafa]">
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#FFF6F6] rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-orange-50 rounded-full blur-[100px] pointer-events-none"></div>

            <HeroServicio
                titulo="Servicio"
                resaltado="Corporativo."
                descripcion="Llevá el mejor sabor a tu empresa. Planes de desayunos y pedidos recurrentes para equipos y oficinas, con descuentos por volumen."
            />

            {/* Planes corporativos */}
            <SeccionServicio
                badge="Planes para Empresas"
                badgeIcon="fa-building"
                titulo="Planes"
                resaltado="corporativos"
                descripcion="Tocá cada plan para ver sus beneficios. Elegí el que mejor se adapte a tu equipo."
            >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {PLANES.map((p, i) => {
                        const isActive = activo === i;
                        return (
                            <div key={i} onClick={() => setActivo(i)} className={`relative rounded-[2rem] p-6 sm:p-7 transition-all duration-500 group overflow-hidden border hover:-translate-y-1.5 z-10 text-center cursor-pointer ${isActive ? `${p.color} text-white shadow-2xl scale-[1.02] border-white` : 'bg-white text-[#111827] border-orange-50 shadow-md hover:border-[#FF4D00]/40 hover:shadow-lg'}`}>
                                <div className="absolute top-0 left-0 w-full h-1 bg-white/40" style={{ opacity: isActive ? 1 : 0 }}></div>
                                <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-white/15 blur-2xl animate-float-slow pointer-events-none"></div>
                                <div className="absolute -bottom-12 -left-8 w-36 h-36 rounded-full bg-black/10 blur-2xl animate-float-medium pointer-events-none"></div>
                                {p.popular && (
                                    <div className="absolute -top-0.5 left-1/2 -translate-x-1/2 z-20">
                                        <span className="inline-block bg-[#FF4D00] text-white text-[8px] font-black uppercase tracking-wider px-4 py-1.5 rounded-b-xl shadow-lg">
                                            <i className="fas fa-crown text-[8px] mr-1"></i>Popular
                                        </span>
                                    </div>
                                )}
                                <div className="relative z-10 pt-2">
                                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl mb-4 mx-auto ${isActive ? 'bg-white/20 ring-1 ring-white/40 text-white' : 'bg-[#FFF6F6] text-[#FF4D00] ring-1 ring-orange-100'}`}>
                                        <i className={`fas ${p.icon}`}></i>
                                    </div>
                                    <h3 className={`text-xl font-black mb-1 ${isActive ? 'text-white' : 'text-[#8B4513]'}`}>{p.nombre}</h3>
                                    <p className={`text-2xl font-black font-heading mb-3 ${isActive ? 'text-amber-300' : 'text-[#FF4D00]'}`}>{p.precio}</p>

                                    <div className="flex flex-wrap justify-center gap-1.5 mb-3">
                                        {p.tags.map((tag, j) => (
                                            <span key={j} className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-wider ${isActive ? 'bg-white/15 text-amber-300 border border-white/25' : p.soft}`}>
                                                <i className="fas fa-tag text-[7px] mr-1"></i>{tag}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="space-y-1.5 pt-3 border-t border-dashed" style={{ borderColor: isActive ? 'rgba(255,255,255,0.3)' : 'rgba(255,77,0,0.15)' }}>
                                        {p.items.map((item, j) => (
                                            <p key={j} className={`text-[11px] font-semibold flex items-center justify-center gap-1.5 ${isActive ? 'text-white/85' : 'text-slate-500'}`}>
                                                <i className={`fas fa-check ${isActive ? 'text-amber-300' : 'text-[#FF4D00]'} text-[9px]`}></i>{item}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </SeccionServicio>

            {/* Calculadora de ahorro */}
            <SeccionServicio
                badge="Calculadora de Ahorro"
                badgeIcon="fa-calculator"
                titulo="¿Cuánto puede"
                resaltado="ahorrar?"
                descripcion="Elegí la cantidad de empleados y mirá el ahorro estimado con nuestro servicio corporativo."
            >
                <div className="bg-white rounded-[2rem] ring-1 ring-orange-100 shadow-xl shadow-orange-950/5 p-6 sm:p-8 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FF4D00] via-[#8B4513] to-[#FF4D00]"></div>
                    <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[#FF4D00]/10 blur-3xl animate-float-slow pointer-events-none"></div>

                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                        {/* Selector de empleados */}
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#FF4D00] to-[#CC3D00] text-white flex items-center justify-center shadow-md">
                                    <i className="fas fa-users text-sm"></i>
                                </span>
                                <div>
                                    <p className="text-sm font-black font-heading text-[#8B4513] leading-tight">Tamaño de tu equipo</p>
                                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Deslizá o tocá una opción</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-5 gap-2 mb-4">
                                {TAMANOS.map((n) => (
                                    <button
                                        key={n}
                                        onClick={() => setEmpleados(n)}
                                        className={`relative rounded-xl border-2 py-3 text-center transition-all duration-300 overflow-hidden ${empleados === n ? 'bg-[#FF4D00] border-transparent text-white shadow-md scale-105' : 'bg-[#FFFDF9] border-orange-50 text-[#8B4513] hover:border-[#FF4D00]/40'}`}
                                    >
                                        <p className="text-lg font-black font-heading">{n}</p>
                                        <p className="text-[8px] font-black uppercase tracking-wider opacity-70">empleados</p>
                                    </button>
                                ))}
                            </div>

                            {/* Slider */}
                            <input
                                type="range"
                                min="5"
                                max="100"
                                step="5"
                                value={empleados}
                                onChange={(e) => setEmpleados(parseInt(e.target.value))}
                                className="w-full accent-[#FF4D00]"
                            />
                            <div className="flex justify-between text-[8px] font-black uppercase tracking-widest text-slate-400 mt-1">
                                <span>5</span><span>50</span><span>100+</span>
                            </div>
                        </div>

                        {/* Resultado */}
                        <div className="relative rounded-[1.5rem] overflow-hidden bg-gradient-to-br from-[#5D3A1F] to-[#452A16] p-6 text-white text-center">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FF4D00] via-amber-300 to-[#FF4D00]"></div>
                            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[#FF4D00]/20 blur-3xl animate-float-slow pointer-events-none"></div>
                            <div className="relative z-10">
                                <p className="text-[9px] font-black uppercase tracking-widest text-white/60 mb-1">Tu ahorro estimado con</p>
                                <h3 className="text-2xl font-black font-heading mb-4">{empleados} empleados</h3>

                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 border border-white/25 text-[10px] font-black uppercase tracking-wider mb-4">
                                    <i className="fas fa-bolt text-amber-300"></i>{Math.round(descuentoEmpresa * 100)}% de descuento
                                </div>

                                <div className="grid grid-cols-2 gap-2 mb-5">
                                    <div className="rounded-xl bg-white/10 border border-white/15 p-3">
                                        <p className="text-[8px] font-black uppercase tracking-widest text-white/60">Ahorro / semana</p>
                                        <p className="text-xl font-black font-heading text-amber-300">Bs. {ahorroSemanal}</p>
                                    </div>
                                    <div className="rounded-xl bg-white/10 border border-white/15 p-3">
                                        <p className="text-[8px] font-black uppercase tracking-widest text-white/60">Ahorro / mes</p>
                                        <p className="text-xl font-black font-heading text-amber-300">Bs. {ahorroMensual}</p>
                                    </div>
                                </div>

                                <a href="https://wa.me/59161320004?text=Hola%20Los%20Castores!%20Quiero%20cotizar%20el%20servicio%20corporativo%20para%20mi%20empresa" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF4D00] hover:bg-[#CC3D00] text-white rounded-full font-black text-[10px] uppercase tracking-[0.15em] shadow-lg transition-all hover:-translate-y-0.5 active:scale-95">
                                    <i className="fab fa-whatsapp"></i> Cotizar mi empresa
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </SeccionServicio>

            <BeneficiosServicio
                beneficios={[
                    { icon: 'fa-file-invoice', titulo: 'Facturación', desc: 'Factura mensual con NIT de tu empresa.' },
                    { icon: 'fa-clock', titulo: 'Puntualidad', desc: 'Entregas en el horario que tu equipo necesita.' },
                    { icon: 'fa-user-tie', titulo: 'Ejecutivo de cuenta', desc: 'Un contacto directo para todos tus pedidos.' },
                    { icon: 'fa-chart-line', titulo: 'Crece con nosotros', desc: 'Descuentos escalonados según el volumen.' },
                ]}
                badge="Beneficios Empresariales"
                titulo="Tu equipo"
                resaltado="lo merece"
            />

            <CtaServicio
                frase="Armá un plan a la medida de tu empresa y sorprendé a tu equipo con el mejor sabor de Santa Cruz."
                gradiente="from-[#8B4513] via-[#5D3A1F] to-[#452A16]"
                whatsappTexto="Hola Los Castores! Quiero información del servicio corporativo"
                badges={[
                    { icon: 'fa-building', label: 'Para empresas', color: 'bg-[#FF4D00]' },
                    { icon: 'fa-tag', label: 'Hasta 20% OFF', color: 'bg-[#5D3A1F]' },
                    { icon: 'fa-file-invoice', label: 'Factura con NIT', color: 'bg-[#8B4513]' },
                ]}
            />
        </div>
    );
};

export default ServicioCorporativo;
