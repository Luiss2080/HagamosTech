import React, { useEffect } from 'react';
import CircuitBackground from '../../components/fondos/FondoTech';
import Breadcrumb from '../../components/func/MigasPan';

const TERMS_SECTIONS = [
    {
        title: '1. Alcance y aceptacion',
        text: 'Al contratar servicios con HagamosTech, el cliente acepta estas condiciones sobre el alcance del servicio, los pagos, las garantias y el uso de la plataforma web.',
    },
    {
        title: '2. Servicios y disponibilidad',
        text: 'Las descripciones de los servicios son referenciales. La disponibilidad y el alcance final pueden variar segun la demanda y la propuesta acordada con el cliente.',
    },
    {
        title: '3. Precios y promociones',
        text: 'Los precios publicados pueden cambiar sin previo aviso. Las promociones aplican bajo vigencia, condiciones y alcance detallados en cada oferta.',
    },
    {
        title: '4. Pagos y facturacion',
        text: 'Se aceptan los medios de pago habilitados por HagamosTech. La emision de factura se realiza con los datos proporcionados por el cliente.',
    },
    {
        title: '5. Entregas y plazos',
        text: 'Los entregables se coordinan segun el alcance y los plazos acordados. Los tiempos estimados son referenciales y pueden variar por complejidad del proyecto.',
    },
    {
        title: '6. Garantia y ajustes',
        text: 'La garantia cubre los defectos tecnicos de lo entregado dentro del alcance acordado. Los ajustes y cambios se procesan previa revision y segun la politica de servicio.',
    },
    {
        title: '7. Uso de la plataforma',
        text: 'El cliente es responsable del uso correcto de su cuenta y de proporcionar datos de contacto y facturacion veridicos y actualizados.',
    },
    {
        title: '8. Modificaciones',
        text: 'HagamosTech se reserva el derecho de modificar estas condiciones en cualquier momento para adaptar cambios legales o comerciales.',
    }
];

const Condiciones = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }, []);

    return (
        <main className="relative min-h-screen overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[-10rem] left-[-8rem] h-[26rem] w-[26rem] rounded-full bg-[#A3E635]/10 blur-3xl"></div>
                <div className="absolute right-[-9rem] top-[12rem] h-[24rem] w-[24rem] rounded-full bg-[#111827]/10 blur-3xl"></div>
                <div className="absolute bottom-[-10rem] left-[20%] h-[22rem] w-[22rem] rounded-full bg-[#0d1b3e]/10 blur-3xl"></div>
            </div>

            <CircuitBackground />

            <section className="relative mx-auto flex min-h-screen w-full max-w-7xl items-center px-4 py-8 sm:px-6 lg:px-8">
                <div className="grid w-full gap-6 lg:grid-cols-[1.05fr_1.35fr]">
                    <aside className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#0A0A0A] via-[#A3E635] to-[#0d1b3e] p-8 text-white shadow-2xl ring-1 ring-white/15 sm:p-10">
                        <div className="absolute inset-0 opacity-30">
                            <div className="absolute -top-10 right-0 h-56 w-56 rounded-full bg-[#111827]/30 blur-3xl"></div>
                            <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>
                        </div>

                        <div className="relative z-10 flex h-full flex-col justify-between gap-4">
                            <div>
                                <Breadcrumb
                                    paths={[{ label: 'Condiciones' }]}
                                    badgeText="Condiciones Oficiales — HAGAMOSTECH"
                                    icon="fa-file-contract"
                                    align="start"
                                />
                                <h1 className="mt-5 text-2xl font-black leading-tight tracking-tight sm:text-3xl">
                                    Terminos y
                                    <span className="block text-white">Condiciones</span>
                                </h1>

                                <p className="mt-4 max-w-xl text-sm leading-6 text-blue-50 sm:text-base">
                                    Consulta las reglas de compra, entrega, garantia y uso de HagamosTech en una pagina clara, compacta y pensada para clientes.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
                                    <p className="text-[10px] font-black uppercase tracking-[0.24em] text-white/70">Cobertura</p>
                                    <p className="mt-1 text-lg font-black">Compras seguras</p>
                                </div>
                                <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
                                    <p className="text-[10px] font-black uppercase tracking-[0.24em] text-white/70">Soporte</p>
                                    <p className="mt-1 text-lg font-black">Atencion directa</p>
                                </div>
                            </div>

                            <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
                                <p className="text-[10px] font-black uppercase tracking-[0.24em] text-white/70">Ultima actualizacion</p>
                                <p className="mt-1 text-sm font-semibold text-white">Abril 2026</p>
                            </div>
                        </div>
                    </aside>

                    <section className="relative overflow-hidden rounded-[2rem] border border-[#111111] bg-[#111827] p-5 shadow-xl sm:p-6 lg:p-8">
                        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#A3E635] via-[#111827] to-[#A3E635]"></div>

                        <div className="flex flex-col gap-4 border-b border-[#edf2fb] pb-5 sm:flex-row sm:items-end sm:justify-between">
                            <div>
                                <span className="inline-flex items-center gap-2 rounded-full bg-[#111111] px-3 py-1 text-[10px] font-black uppercase tracking-[0.22em] text-[#A3E635] ring-1 ring-[#fca5a5]">
                                    <i className="fas fa-file-contract"></i>
HagamosTech
                                </span>
                                <h2 className="mt-3 text-2xl font-black text-[#0d1b3e] sm:text-3xl">Condiciones de uso</h2>
                            </div>

                            <button
                                type="button"
                                onClick={() => window.openModal?.('termsModal')}
                                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[#ffd86e] bg-[#111827] px-4 py-2.5 text-xs font-black uppercase tracking-[0.16em] text-[#0d1b3e] shadow-[0_10px_24px_rgba(255,193,7,0.22)] transition hover:brightness-95"
                            >
                                <i className="fas fa-eye"></i>
                                Ver modal completo
                            </button>
                        </div>

                        <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-2">
                            {TERMS_SECTIONS.map((section) => (
                                <article key={section.title} className="rounded-2xl border border-[#e5eefb] bg-[#111111] p-4 shadow-sm">
                                    <h3 className="text-sm font-black uppercase tracking-wide text-[#0d1b3e]">{section.title}</h3>
                                    <p className="mt-2 text-sm leading-6 text-[#3d5677]">{section.text}</p>
                                </article>
                            ))}
                        </div>

                        <div className="mt-5 rounded-2xl border border-[#111111] bg-[#fff5f5] p-4 text-sm leading-6 text-[#2b4566]">
                            <div className="flex items-start gap-3">
                                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#111111] text-[#A3E635] ring-1 ring-[#fca5a5]">
                                    <i className="fas fa-circle-info"></i>
                                </span>
                                <p>
                                    Al continuar navegando y comprando en HagamosTech, aceptas estas condiciones comerciales y legales. Si necesitas revisar el detalle visual completo, usa el modal de Términos y Condiciones desde cualquier parte del sitio.
                                </p>
                            </div>
                        </div>

                        <div className="mt-4 flex flex-wrap gap-3">
                            <a href="/" className="inline-flex items-center gap-2 rounded-2xl border border-[#111111] bg-[#111827] px-4 py-2.5 text-xs font-black uppercase tracking-[0.16em] text-[#0d1b3e] transition hover:border-[#A3E635] hover:text-[#A3E635]">
                                <i className="fas fa-house"></i>
                                Volver al inicio
                            </a>
                            <a href="/contactanos" className="inline-flex items-center gap-2 rounded-2xl border border-[#111111] bg-[#111827] px-4 py-2.5 text-xs font-black uppercase tracking-[0.16em] text-[#0d1b3e] transition hover:border-[#A3E635] hover:text-[#A3E635]">
                                <i className="fas fa-circle-question"></i>
                                Contactar soporte
                            </a>
                        </div>
                    </section>
                </div>
            </section>
        </main>
    );
};

export default Condiciones;