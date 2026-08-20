import React from 'react';

const ModalColegio = ({ institution, onClose }) => {
    if (!institution) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={onClose}>
            <div
                className="relative w-full max-w-md rounded-3xl bg-[#0A0A0A] border border-[#A3E635]/30 p-7 text-center"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 text-white hover:bg-[#A3E635] hover:text-[#0A0A0A] flex items-center justify-center transition-colors"
                >
                    <i className="fas fa-xmark"></i>
                </button>
                <div className="w-16 h-16 mx-auto rounded-2xl bg-[#A3E635]/10 border border-[#A3E635]/30 flex items-center justify-center text-[#A3E635] text-2xl mb-4">
                    <i className="fas fa-graduation-cap"></i>
                </div>
                <h3 className="text-white font-black text-xl mb-2">{institution.name || 'Institución'}</h3>
                <p className="text-white/60 text-sm font-medium mb-6">
                    {institution.desc || 'Contanos tu proyecto y lo resolvemos juntos.'}
                </p>
                <button
                    onClick={onClose}
                    className="w-full h-11 rounded-full bg-[#A3E635] hover:bg-[#84CC16] text-[#0A0A0A] font-black text-[11px] uppercase tracking-[0.14em] transition-colors"
                >
                    Cerrar
                </button>
            </div>
        </div>
    );
};

export default ModalColegio;
