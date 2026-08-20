import React from 'react';

const ErrorModal = ({ isOpen, onClose, title = 'Error', message = 'Ocurrió un error inesperado.' }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 flex items-center justify-center p-4 font-montserrat animate-modal-backdrop">
      
      {/* Outer Card container with high-contrast borders and premium drop shadow */}
      <div className="bg-white dark:bg-[#040408] dark:border-white/8 rounded-2xl border border-slate-200/60 dark:border-white/5/80 shadow-2xl dark:shadow-black/80 max-w-sm w-full overflow-hidden animate-modal-content">
        
        {/* Header Section: Dark Tech themed header */}
        <div className="bg-slate-950 text-white p-5 relative overflow-hidden flex flex-col items-center border-b border-slate-800">
          {/* Subtle tech horizontal line decorations */}
          <div className="absolute top-0 left-0 w-20 h-1 bg-[#E95A0C]"></div>
          <div className="absolute top-0 right-0 w-20 h-1 bg-[#E95A0C]"></div>
          
          {/* Close button */}
          <button 
            type="button" 
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-white/70 hover:text-white hover:bg-[#E95A0C] transition-all bg-white/5 border-0 cursor-pointer text-sm"
            title="Cerrar"
          >
            <i className="fas fa-times"></i>
          </button>

          {/* Icon Badge: Solid, sharp icon inside a clean red circle */}
          <div className="w-12 h-12 rounded-full bg-[#E95A0C] text-white flex items-center justify-center text-lg shadow-lg dark:shadow-black/60 shadow-red-950/50 mb-3 border border-red-500/20">
            <i className="fas fa-circle-exclamation"></i>
          </div>

          {/* Action category tag */}
          <span className="text-[9px] font-black text-[#E95A0C] tracking-widest uppercase mb-1">
            HA OCURRIDO UN ERROR
          </span>
          <h3 className="text-sm font-black text-white uppercase tracking-wider text-center m-0">
            {title}
          </h3>
        </div>

        {/* Body Section: Soft gray/slate background to avoid empty white look */}
        <div className="p-5 bg-slate-50 dark:bg-[#070710]">
          
          {/* Detailed error message */}
          <p className="text-[11px] text-slate-600 dark:text-slate-400 font-bold leading-relaxed text-center mb-5">
            {message}
          </p>

          {/* Action Button: high contrast, solid design button */}
          <button 
            type="button"
            onClick={onClose}
            className="w-full py-3.5 rounded-xl bg-[#E95A0C] hover:bg-[#cc4a00] text-white font-black text-[10px] uppercase tracking-widest transition-colors cursor-pointer shadow-md hover:shadow-lg dark:shadow-black/60 border-0"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;






















