import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import CircuitBackground from '../../components/fondos/FondoSaltenas';
import PageHero from '../../components/func/MigasPan';
import ProfileSidebar from './components/BarraLateralPerfil';
import { useHistorialCompras } from '../../hooks/useComprasPerfil';

const HistorialComprasPagina = () => {
    const location = useLocation();
    const [selectedInvoice, setSelectedInvoice] = useState(null);
    const { compras, loading, resumen, listar, descargarFactura } = useHistorialCompras();

    useEffect(() => { listar(); }, [listar]);

    const handleDownloadInvoice = async (invoice) => {
        const result = await descargarFactura(invoice.id);
        if (!result.success) {
            alert('Error al descargar la factura');
        }
    };

    const navItemsMobile = [
        { path: '/perfil', label: 'Mi Perfil', icon: 'fa-user' },
        { path: '/configuracion', label: 'Config', icon: 'fa-gear' },
    ];

    const cachedUser = localStorage.getItem('loscatores_user_profile');
    const userData = cachedUser ? JSON.parse(cachedUser) : {
        nombre: 'Luis',
        apellido: 'Sanders',
        correo: 'luisrochavela@gmail.com'
    };

    return (
        <div id="compras-perfil-page" className="relative overflow-hidden min-h-screen bg-white">
            <CircuitBackground />
            
            {/* Dots grid overlay */}
            <div className="absolute inset-0 opacity-[0.06] dark:opacity-[0.09] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#a41e22 2px, transparent 2px)', backgroundSize: '24px 24px' }}></div>

            <PageHero
                title="Mis compras y"
                highlight="pedidos"
                description="Consulta el historial de tus adquisiciones de kits de robÃ³tica, tomos de libros impresos y descarga las facturas oficiales."
            />

            {/* MAIN GRID LAYOUT (THINNED LEFT COLUMN 340px) */}
            <div className="relative">
            <section className="relative z-10 py-10 max-w-[95rem] mx-auto px-4 sm:px-6">
                <CircuitBackground />
                <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-8 items-stretch">
                    
                    {/* LEFT SIDEBAR */}
                    <div className="rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col h-full">
                        <ProfileSidebar />
                    </div>

                    {/* RIGHT CONTENT */}
                    <div className="flex flex-col gap-8">
                        
                        {/* MOBILE NAVIGATION */}
                        <div className="flex lg:hidden gap-2 bg-[#f8fafc] p-2 rounded-2xl border border-slate-100 overflow-x-auto scrollbar-none">
                            {navItemsMobile.map((item) => {
                                const isActive = location.pathname === item.path;
                                return (
                                    <Link 
                                        key={item.path}
                                        to={item.path}
                                        className={`flex items-center gap-2.5 px-5 py-3 rounded-xl font-black text-xs uppercase tracking-wider transition-all whitespace-nowrap ${isActive ? 'bg-[#a41e22] text-white shadow-md' : 'text-slate-500 hover:bg-[#a41e22]/5 dark:hover:bg-white/5'}`}
                                    >
                                        <i className={`fas ${item.icon}`}></i>
                                        {item.label}
                                    </Link>
                                );
                            })}
                        </div>

                        {/* SUMMARY CARDS */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-xl border border-slate-200 border-l-4 border-l-[#a41e22]">
                                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#a41e22]/10 text-[#a41e22] text-lg shadow-inner">
                                    <i className="fas fa-wallet"></i>
                                </div>
                                <div>
                                    <p className="text-lg font-black text-[#0d1b3e] leading-none">{resumen.total.toLocaleString()} Bs</p>
                                    <p className="text-[9px] font-black uppercase tracking-wider text-slate-400 mt-1">Monto total invertido</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-xl border border-slate-200 border-l-4 border-l-[#a41e22]">
                                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-500 text-lg shadow-inner">
                                    <i className="fas fa-box-open"></i>
                                </div>
                                <div>
                                    <p className="text-lg font-black text-[#0d1b3e] leading-none">{resumen.cantidad} Pedidos</p>
                                    <p className="text-[9px] font-black uppercase tracking-wider text-slate-400 mt-1">Registrados con Ã©xito</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-xl border border-slate-200 border-l-4 border-l-[#a41e22]">
                                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-500 text-lg shadow-inner">
                                    <i className="fas fa-file-invoice-dollar"></i>
                                </div>
                                <div>
                                    <p className="text-lg font-black text-[#0d1b3e] leading-none">{compras.length} Facturas</p>
                                    <p className="text-[9px] font-black uppercase tracking-wider text-slate-400 mt-1">Listas para descarga</p>
                                </div>
                            </div>
                        </div>

                        {/* PURCHASE LIST */}
                        <div className="bg-white rounded-2xl p-5 shadow-xl border border-slate-200 border-l-4 border-l-[#a41e22]">
                            <div className="bg-gradient-to-r from-red-50/90 via-white to-transparent p-3.5 rounded-xl border border-red-100/70 mb-4 flex items-center gap-3">
                                <div className="w-9 h-9 rounded-xl bg-[#a41e22] text-white flex items-center justify-center text-sm shadow-md shadow-red-500/20 shrink-0">
                                    <i className="fas fa-receipt"></i>
                                </div>
                                <div>
                                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider m-0">HISTORIAL DE COMPRAS</h3>
                                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-normal m-0 mt-0.5">PEDIDOS Y FACTURAS</p>
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse text-xs">
                                    <thead>
                                        <tr className="border-b-2 border-red-100 text-[#a41e22] uppercase text-[9px] font-black tracking-widest bg-red-50/30">
                                            <th className="py-3.5 pl-4">ID Pedido</th>
                                            <th className="py-3.5">Fecha</th>
                                            <th className="py-3.5">Detalle</th>
                                            <th className="py-3.5">MÃ©todo</th>
                                            <th className="py-3.5">Monto</th>
                                            <th className="py-3.5">Estado</th>
                                            <th className="py-3.5 pr-4 text-right">Factura</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 font-semibold text-slate-800">
                                        {loading ? (
                                                <tr>
                                                    <td colSpan="7" className="py-8 text-center text-slate-400 font-bold text-xs">
                                                        <i className="fas fa-spinner fa-pulse mr-2"></i>Cargando historial...
                                                    </td>
                                                </tr>
                                            ) : compras.length === 0 ? (
                                                <tr>
                                                    <td colSpan="7" className="py-8 text-center text-slate-400 font-bold text-xs">
                                                        No hay compras registradas
                                                    </td>
                                                </tr>
                                            ) : (compras.map((invoice) => (
                                            <tr key={invoice.id} className="hover:bg-red-50/30 dark:hover:bg-red-950/20 transition-colors">
                                                <td className="py-4 pl-4 font-black text-[#a41e22]">{invoice.id}</td>
                                                <td className="py-4">{invoice.date}</td>
                                                <td className="py-4 font-bold truncate max-w-[180px]" title={invoice.item}>
                                                    <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-md mr-2">{invoice.category}</span>
                                                    {invoice.item}
                                                </td>
                                                <td className="py-4">{invoice.payment}</td>
                                                <td className="py-4 font-black">{invoice.amount}</td>
                                                <td className="py-4">
                                                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider ${invoice.badgeColor}`}>
                                                        {invoice.status}
                                                    </span>
                                                </td>
                                                <td className="py-4 pr-4 text-right">
                                                    <button 
                                                        onClick={() => handleDownloadInvoice(invoice)}
                                                        className="px-3 py-1.5 rounded-xl bg-[#a41e22] hover:bg-red-800 text-white text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer border-0"
                                                    >
                                                        <i className="fas fa-download mr-1"></i> PDF
                                                    </button>
                                                </td>
                                            </tr>
                                        )))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
            </div>

            {/* MOCK INVOICE MODAL POPUP */}
            {selectedInvoice && (
                <div className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 font-montserrat">
                    <div className="bg-white rounded-2xl p-6 max-w-sm w-full border border-slate-200 shadow-2xl relative animate-fade-in">
                        <button
                            onClick={() => setSelectedInvoice(null)}
                            className="absolute top-4 right-4 w-7 h-7 flex items-center justify-center rounded-full bg-slate-100 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition cursor-pointer text-[10px]"
                        >
                            <i className="fas fa-times"></i>
                        </button>

                        <div className="text-center">
                            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-[#a41e22] text-xl mb-3">
                                <i className="fas fa-file-invoice-dollar"></i>
                            </div>
                            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-1">Factura Digital Oficial</h3>
                            <p className="text-[10px] text-slate-400 mb-4 font-bold uppercase tracking-widest">Detalle del Pedido {selectedInvoice.id}</p>
                        </div>

                        {/* Invoice content mockup */}
                        <div className="border border-slate-200 p-4 rounded-xl bg-[#fbfdff] text-slate-800 text-left text-xs font-semibold space-y-3 shadow-inner mb-4">
                            <div className="flex justify-between border-b border-slate-100 pb-3">
                                <div>
                                    <p className="font-black text-[#a41e22] text-sm">Los Castores Robotics</p>
                                    <p className="text-[9px] text-slate-400 mt-0.5">Santa Cruz, Bolivia</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-slate-500 text-[10px] uppercase">FACTURA</p>
                                    <p className="font-black mt-0.5 text-xs">{selectedInvoice.id}</p>
                                </div>
                            </div>

                            <div className="space-y-1">
                                <p className="text-[9px] font-black uppercase text-slate-400 tracking-wider">Cliente:</p>
                                <p className="text-slate-800 font-bold">{userData.nombre} {userData.apellido || ''}</p>
                                <p className="text-[10px] text-slate-500">{userData.correo}</p>
                            </div>

                            <div className="border-t border-b border-slate-100 py-2.5 space-y-2">
                                <div className="flex justify-between font-black uppercase text-[9px] text-slate-400 tracking-wider">
                                    <span>Concepto / AdquisiciÃ³n</span>
                                    <span>Total</span>
                                </div>
                                <div className="flex justify-between text-slate-800">
                                    <span className="max-w-[200px] truncate">{selectedInvoice.item}</span>
                                    <span className="font-black">{selectedInvoice.amount}</span>
                                </div>
                            </div>

                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-[9px] font-black uppercase text-slate-400 tracking-wider">MÃ©todo de Pago:</p>
                                    <p className="font-bold mt-0.5">{selectedInvoice.payment}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[9px] font-black uppercase text-slate-400 tracking-wider">Total Cancelado:</p>
                                    <p className="font-black text-sm text-[#a41e22] mt-0.5">{selectedInvoice.amount}</p>
                                </div>
                            </div>
                        </div>

                        <button 
                            onClick={async () => {
                                await descargarFactura(selectedInvoice.id);
                                setSelectedInvoice(null);
                            }}
                            className="w-full py-2.5 rounded-xl bg-[#a41e22] hover:bg-red-800 text-white text-xs font-black uppercase tracking-wider shadow-md shadow-red-500/30 transition-all cursor-pointer border-0"
                        >
                            Descargar PDF Oficial
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HistorialComprasPagina;
