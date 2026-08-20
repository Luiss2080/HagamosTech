import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import CircuitBackground from '../../components/fondos/FondoSaltenas';

const PagoMovil = () => {
    const [searchParams] = useSearchParams();
    const [status, setStatus] = useState('pending'); // pending, success, error
    const [loading, setLoading] = useState(false);

    // Debug: ver en consola del mÃ³vil si llega
    console.log("PagoMovil cargado. Params:", Object.fromEntries(searchParams));

    const orderId = searchParams.get('id'); // Este es el codigo ESP-XXXXXX
    const monto = searchParams.get('monto');
    const compraId = searchParams.get('compraId');

    const handleConfirmar = async () => {
        setLoading(true);
        try {
            // La URL base debe ser la IP del servidor detectada en el mÃ³vil
            const baseUrl = window.location.origin.replace(':5173', ':3000');
            await axios.post(`${baseUrl}/api/pagos/confirmar`, {
                id: orderId,
                monto: monto,
                compraId: compraId
            });
            setStatus('success');
        } catch (error) {
            console.error('Error al confirmar pago:', error);
            setStatus('error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
            <CircuitBackground />
            
            {/* Golden Header */}
            <div className="mb-2 flex justify-center z-10 animate-fade-in">
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-[#c5a059]/40 bg-amber-500/10 text-[9px] font-black uppercase tracking-widest text-[#a88544] shadow-sm leading-none">
                <i className="fa-solid fa-mobile-screen-button"></i> Pago Seguro HAGAMOSTECH
              </span>
            </div>

            {!orderId && <p className="mb-4 text-xs opacity-50">Iniciando sistema de pago...</p>}
            <div className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-xl rounded-[2.5rem] border border-white/20 p-8 shadow-2xl text-center">
                <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-[#a41e22] shadow-lg shadow-red-900/20">
                    <i className={`fas ${status === 'success' ? 'fa-check-circle' : 'fa-mobile-screen-button'} text-4xl text-white`}></i>
                </div>

                {status === 'pending' && (
                    <>
                        <h1 className="text-3xl font-black mb-2">Confirmar Pago</h1>
                        <p className="text-slate-400 text-sm mb-8 font-medium">EstÃ¡s a un paso de completar tu compra en HagamosTech</p>

                        <div className="bg-white/5 rounded-2xl p-6 border border-white/10 mb-8">
                            <p className="text-[10px] font-black uppercase tracking-widest text-[#FFC107] mb-2 text-left">Monto a Pagar</p>
                            <div className="flex justify-between items-end">
                                <span className="text-4xl font-black text-white">Bs. {monto}</span>
                                <span className="text-xs font-bold text-slate-400 mb-1">Orden #{orderId}</span>
                            </div>
                        </div>

                        <button
                            onClick={handleConfirmar}
                            disabled={loading}
                            className="w-full py-4 bg-[#a41e22] text-white font-black text-sm uppercase tracking-widest rounded-2xl shadow-lg shadow-red-900/20 hover:bg-[#8d191d] hover:shadow-red-900/40 hover:-translate-y-1 transition-all disabled:opacity-50"
                        >
                            {loading ? 'Procesando...' : 'Confirmar Transferencia'}
                        </button>
                    </>
                )}

                {status === 'success' && (
                    <div className="animate-fade-in">
                        <h1 className="text-3xl font-black mb-2">Â¡Pago Exitoso!</h1>
                        <p className="text-emerald-400 font-bold mb-8">Tu transacciÃ³n ha sido validada.</p>
                        
                        <div className="bg-emerald-500/10 rounded-2xl p-6 border border-emerald-500/20 mb-8">
                            <p className="text-sm text-slate-300 font-medium">
                                Ya puedes revisar la pantalla de tu computadora para ver el comprobante.
                            </p>
                        </div>
                        
                        <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                            Gracias por elegir HagamosTech
                        </div>
                    </div>
                )}

                {status === 'error' && (
                    <div className="animate-fade-in">
                        <h1 className="text-3xl font-black mb-2 text-red-400">Error de Pago</h1>
                        <p className="text-red-300 font-medium mb-8">No pudimos procesar la confirmaciÃ³n.</p>
                        <button
                            onClick={() => setStatus('pending')}
                            className="w-full py-4 bg-white/10 text-white font-black text-sm uppercase tracking-widest rounded-2xl border border-white/20 hover:bg-white/20 transition-all"
                        >
                            Reintentar
                        </button>
                    </div>
                )}
            </div>
            
            <div className="mt-8 relative z-10 flex items-center gap-3 text-slate-500">
                <div className="inline-flex items-center justify-center rounded-full bg-white/10 p-1.5 ring-[0.5px] ring-white/40">
                    <img src="/img/01_Layout/01_Logo.png" alt="Logo" className="h-8 w-8 rounded-full object-contain" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest">TecnologÃ­a de Vanguardia</span>
            </div>
        </div>
    );
};

export default PagoMovil;
