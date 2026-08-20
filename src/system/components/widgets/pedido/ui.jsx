import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import CircleParticles from '../../../../components/fondos/ParticulasCirculares';

// ── Fondo de la marca (cálido, orbes suaves) ──
export const FondoSalon = () => (
  <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
    <div className="absolute inset-0 bg-[#FFF5EC]"></div>
    <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[#FF4D00]/10 rounded-full blur-[120px] animate-float-slow"></div>
    <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#8B4513]/10 rounded-full blur-[100px] animate-float-medium"></div>
    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsNzcsMCwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-60"></div>
  </div>
);

export const FondoDecorativo = ({ particles = false }) => (
  <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
    <div className="absolute -top-10 -right-10 w-64 h-64 bg-[#FF4D00]/10 rounded-full blur-3xl"></div>
    <div className="absolute bottom-0 left-10 w-56 h-56 bg-[#8B4513]/10 rounded-full blur-3xl"></div>
  </div>
);

// ── Título Estilo Dashboard ──
export const TituloWeb = ({ titulo, palabra, sub, centrado = true }) => (
  <div className={`${centrado ? 'text-center flex flex-col items-center' : 'text-left'} mb-6`}>
    <h2 className="text-3xl sm:text-4xl font-black text-[#8B4513] leading-tight flex items-center gap-2">
      {titulo}{' '}
      <span className="relative text-[#FF4D00]">
        {palabra}
        <svg className="absolute w-full h-2.5 -bottom-1 left-0 z-[-1] text-orange-300 opacity-60" viewBox="0 0 200 9" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2.00025 6.99997C25.7509 4.50435 65.2536 2.07897 197.994 4.4151" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </h2>
    {sub && <p className={`text-gray-600 font-medium text-sm sm:text-base leading-relaxed mt-2 ${centrado ? 'max-w-xl' : ''}`}>{sub}</p>}
  </div>
);

export const GradienteTexto = ({ children, className = '' }) => (
  <span className={`bg-gradient-to-r from-[#FF4D00] to-[#8B4513] bg-clip-text text-transparent ${className}`}>{children}</span>
);

// ── Tarjeta Premium (Estilo Dashboard Bento Box) ──
export const TarjetaPremium = ({ children, className = '', highlightTop = '' }) => (
  <div className={`relative bg-white rounded-[24px] shadow-sm hover:shadow-lg transition-shadow overflow-hidden border border-orange-900/5 ${className}`}>
    {highlightTop && (
      <div className={`absolute top-0 left-0 w-full h-1.5 ${highlightTop}`}></div>
    )}
    <div className="h-full relative z-10">
      {children}
    </div>
  </div>
);

// ── Contador animado ──
export const AnimatedNumber = ({ value, prefix = '', suffix = '', decimals = 2 }) => {
  const [display, setDisplay] = useState(0);
  const prev = useRef(0);

  useEffect(() => {
    const from = prev.current;
    const to = value || 0;
    prev.current = to;
    if (from === to) { setDisplay(to); return; }
    const start = performance.now();
    const dur = 700;
    let raf;
    const step = (t) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(from + (to - from) * eased);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [value]);

  return <span>{prefix}{Number(display).toFixed(decimals)}{suffix}</span>;
};

// ── Botón Colorido y Redondeado (Estilo Catálogo) ──
export const BotonBrillo = ({ children, onClick, disabled, icon, color = 'naranja', className = '' }) => {
  const bgClass = color === 'naranja' ? 'bg-[#FF4D00] hover:bg-[#E95A0C] text-white shadow-[#FF4D00]/30'
                : color === 'marron' ? 'bg-[#8B4513] hover:bg-[#5D3A1F] text-white shadow-[#8B4513]/30'
                : 'bg-[#5D3A1F] hover:bg-[#3D2513] text-white shadow-[#5D3A1F]/30';

  return (
    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.96 }}
      onClick={onClick} disabled={disabled}
      className={`relative group ${bgClass} font-black text-xs uppercase tracking-widest rounded-full px-6 py-3.5 shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-60 disabled:cursor-not-allowed ${className}`}>
      {icon && <i className={`${icon} text-white`}></i>}
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};

export const BotonPrincipal = ({ children, onClick, disabled, icon, className = '' }) => (
  <BotonBrillo children={children} onClick={onClick} disabled={disabled} icon={icon} className={className} />
);

export const BotonAccion = ({ children, onClick, disabled, icon, variante = 'naranja', className = '' }) => {
  const bgClass = variante === 'naranja' ? 'bg-[#FF4D00] text-white shadow-md shadow-[#FF4D00]/20 hover:bg-[#E95A0C]'
                : variante === 'marronClaro' ? 'bg-[#D97706] text-white shadow-md shadow-[#D97706]/20 hover:bg-[#B45309]'
                : variante === 'marron' ? 'bg-[#8B4513] text-white shadow-md shadow-[#8B4513]/20 hover:bg-[#5D3A1F]'
                : 'bg-[#5D3A1F] text-white shadow-md shadow-[#5D3A1F]/20 hover:bg-[#3D2513]';
                
  return (
    <button onClick={onClick} disabled={disabled}
      className={`px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-105 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed ${bgClass} ${className}`}>
      {icon && <i className={`${icon} text-xs`}></i>}
      {children}
    </button>
  );
};

export const ChipPaso = ({ icon, label, activo, completado }) => (
  <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border-2 text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
    completado ? 'bg-[#8B4513] text-white border-[#8B4513]'
    : activo ? 'bg-[#FF4D00] text-white border-[#FF4D00] shadow-md shadow-[#FF4D00]/20'
    : 'bg-white text-gray-400 border-gray-200'
  }`}>
    <i className={`${icon} ${completado ? 'text-white' : activo ? 'text-white' : ''}`}></i>
    {label}
    {completado && <i className="fas fa-check text-[10px]"></i>}
  </div>
);

export const PanelWeb = ({ children, className = '' }) => (
  <div className={`bg-white rounded-[24px] border border-orange-900/5 shadow-sm ${className}`}>{children}</div>
);

export const CabeceraSeccion = ({ icon, titulo, subtitulo, right, linea = false }) => (
  <div className="mb-4 flex flex-col items-center sm:flex-row sm:justify-between bg-white p-4 rounded-[20px] shadow-sm border border-orange-900/5 gap-3">
    <div className="flex items-center gap-3">
      {icon && (
        <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#FF4D00] flex items-center justify-center">
          <i className={`${icon} text-lg`}></i>
        </div>
      )}
      <div>
        <h3 className="text-xl font-black text-[#8B4513] tracking-tight leading-none">{titulo}</h3>
        {subtitulo && <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wide mt-1">{subtitulo}</p>}
      </div>
    </div>
    {right && <div>{right}</div>}
  </div>
);

export const ChipInfo = ({ icon, label, valor, iconoClase = 'text-[#FF4D00]' }) => (
  <div className="rounded-[20px] bg-white border border-orange-900/5 px-4 py-3 text-center shadow-sm hover:shadow-md transition-shadow">
    <div className={`w-10 h-10 mx-auto mb-2 rounded-full bg-orange-50 border border-orange-100 ${iconoClase} flex items-center justify-center`}>
      <i className={`${icon} text-base`}></i>
    </div>
    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-0.5">{label}</p>
    <p className="text-[13px] font-black text-[#8B4513]">{valor}</p>
  </div>
);

export const Pildora = ({ children, className = '' }) => (
  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${className}`}>{children}</span>
);